/**
 * @file kitty.js
 * @author zengjialuo(zengjialuo@gmail.com)
 */

(function(global, document) {

  // Current Work Directory 当前工作目录
  var cwd = dirName(location.pathname);

  /*
  一个配置样例
  require.config({
    baseUrl: './libs'
    paths: {
      foo: 'foo/1.1.3'
    },
    packages: [
      "cart",
      {
        name: "store",
        main: "store"
      }
    ],
    map: {
      'some/newmodule': {
          'foo': 'foo1.2'
      },
      'some/oldmodule': {
          'foo': 'foo1.0'
      }
    },
    shim: {
      'backbone': {
          deps: ['underscore', 'jquery'],
          exports: 'Backbone'
      },
      'underscore': {
          exports: '_'
      },
      'foo': {
          deps: ['bar'],
          exports: 'Foo',
          init: function (bar) {
              return this.Foo.noConflict();
          }
      }
    },
  });
  */

  var config = {
    baseUrl: cwd,
    paths: {},
    packages: [],
    map: {},
    shim: {}
  };
  var mapList = [];
  var pathsList = [];

  // Cached Modules
  var cachedMod = {};

  var STATUS = {
    UNFETCH: 0,   // 未加载
    FETCHING: 1,  // 正在请求模块资源
    FETCHED: 2,   // 模块资源请求完成
    LOADING: 3,   // 正在请求资源的依赖模块
    LOADED: 4,    // 模块和模块的依赖都已加载完成
    EXECUTED: 5   // 已执行完毕
  };

  var blank = function() {};

  // 创建随机的模块ID
  var _cid = 0;
  function cid() {
    return './async-' + _cid++;
  }

  /**
   * 通过一个属性字符串获取全局变量，添加 '.' 字符获取内嵌对象
   * @param  {String} prop - 属性字符串
   * @return {Object | Bool} - 返回对象，如果对象不存在，返回 false
   */
  function getGlobalVar(prop) {
    var object = global;
    var segment = prop.split('.');
    each(segment, function(part) {
      object = object[part];
      if (!object) {
        return false;
      }
    });
    return object;
  }

  /**
   * 判断对象类型
   */
  var toString = Object.prototype.toString;
  function isType(obj, type) {
    return toString.call(obj) === '[object ' + type + ']';
  }

  /**
   * 遍历函数
   */
  function each(source, iterator) {
    if (isType(source, 'Array')) {
      for (var i = 0, len = source.length; i < len; i++) {
        if (iterator(source[i], i) === false) {
          break;
        }
      }
    }
  }

  /**
   * 是否为内置模块
   * @param  {String}  id - 模块id
   * @return {Boolean} - 是否为内置模块
   */
  function isBuiltinModule(id) {
    var builtinMOdule = {
      'require': 1,
      'exports': 1,
      'module': 1
    };
    return !!builtinMOdule[id];
  }

  var interactiveScript;
  var currentlyAddingScript;

  /**
   * 获取当前 script 元素
   * @return {Element} - Script 元素
   */
  function getCurrentScript() {
    if (document.currentScript) {
      return document.currentScript;
    }

    if (currentlyAddingScript) {
      return currentlyAddingScript;
    }

    if (interactiveScript && interactiveScript.readyState === 'interactive') {
      return interactiveScript;
    }
    // For IE6-9 browsers, the script onload event may not fire right
    // after the script is evaluated. Kris Zyp found that it
    // could query the script nodes and the one that is in "interactive"
    // mode indicates the current script
    // ref: http://goo.gl/JHfFW
    var scripts = document.getElementsByTagName('script');

    each(scripts, function(script) {
      if (script.readyState === 'interactive') {
        interactiveScript = script;
        return false;
      }
    });
    return interactiveScript;
  }

  /**
   * 模块对象，所有的模块都会被封装成这个对象
   */
  function Module(id) {
    var mod = this;
    mod.id = id;
    mod.uri = id2uri(id); // 转换成 uri
    mod.isDepsDec = true;
    mod.deps = [];
    mod.factory = blank;
    mod.exports = {};

    // 资源未加载
    mod.state = STATUS.UNFETCH;

    // 当有模块依赖当前模块的，在 listeners 中添加回调监听
    // 以便在当前模块加载完成时，通知父模块
    mod.listeners = [];

    mod.require = requireFactory(mod.id);

    mod.require.toUrl = function(id) {
      var absId = resolveId(id, mod.id);
      return id2uri(absId);
    };

    mod.normalize = function(name) {
      return resolveId(name, mod.id);
    };

    mod.requireModule = function(id) {
      return cachedMod[resolveId(id, mod.id)];
    };

    mod.config = function() {
      return mod._config;
    };

    mod._config = (config.config && config.config[id]) || {};
  }

  /**
   * 获取依赖的输出变量名称
   * @return {Array} - 输出对象数组
   */
  Module.prototype.getDepsExport = function() {
    var mod = this;
    if (mod.state < STATUS.LOADED) {
      throw new Error('getDepsExport before loaded');
    }

    var exports = [];

    if (!mod.isDepsDec) {
      exports = [mod.require, mod.exports, mod];
    } else {
      var deps = mod.deps || [];
      var argsLen = mod.factory.length < deps.length ?
        mod.factory.length :
        deps.length;
      for (var i = 0; i < argsLen; i++) {
        switch (deps[i]) {
          case 'require':
            exports.push(mod.require);
            break;
          case 'exports':
            exports.push(mod.exports);
            break;
          case 'module':
            exports.push(mod);
            break;
          default:
            exports.push(mod.require(deps[i]));
        }
      }
    }
    return exports;
  };

  /**
   * 加载模块
   * @param  {Function} callback - 模块加载成功的回调
   */
  Module.prototype.load = function(callback) {
    var mod = this;

    // 资源正在加载
    // 当资源加载完成后，会再次调用当前 load 函数
    if (mod.state === STATUS.FETCHING) {
      return;
    }

    // 资源未加载的，加载资源
    if (mod.state <= STATUS.UNFETCH) {
      // 当资源加载完成后，会再次调用当前 load 函数
      mod.fetch();
      return;
    }

    // 资源加载完成，并调用 load 函数，状态为 LOADING
    mod.state = STATUS.LOADING;

    var deps = mod.deps || [];

    mod.remain = deps.length;

    // 当前模块的依赖加载完成时，会调用该函数
    function callback() {
      // 依赖模块加载完成后，仍需要加载的模块数量减 1
      mod.remain--;
      // 子依赖模块都加载完成后，就能执行 onload 函数
      if (mod.remain === 0) {
        mod.onload();
      }
    }

    each(deps, function(dep) {
      if (isBuiltinModule(dep)) {
        mod.remain--;
        return;
      }

      // 加载插件模块
      if (dep.indexOf('!') > -1) {
        // plugin dependence
        loadPlugin(mod, dep, callback);

      } else {
        var absId = resolveId(dep, mod.id);

        // 依赖模块
        var m = getModule(absId);
        if (m.state >= STATUS.LOADED || (m.state === STATUS.LOADING && !mod.isForce)) {
          //  equal situation is for circle dependency
          mod.remain--;
          return;
        }

        // 依赖模块中的回调，添加当前模块的监听函数
        // 以便在依赖模块加载完成时，当前的模块能执行
        m.listeners.push(callback);

        if (m.state < STATUS.LOADING) {
          m.load();
        }
      }
    });

    // 所有依赖都加载完
    if (mod.remain === 0) {
      mod.onload();
    }
  };

  /**
   * 当模块自身和模块依赖的子模块都加载完成时，执行此函数
   *   通知当前模块的监听数组，说明当前模块加载完成了
   */
  Module.prototype.onload = function() {
    var mod = this;
    if (mod.state >= STATUS.LOADED) {
      return;
    }
    mod.state = STATUS.LOADED;

    // 通知当前模块的监听数组
    // 如果有父模块依赖当前模块，就会通知到父模块
    var listeners = mod.listeners;
    each(listeners, function(listener) {
      listener();
    });

    mod.callback && mod.callback();
  };

  /**
   * 执行模块代码
   */
  Module.prototype.exec = function() {
    var mod = this;
    if (mod.state >= STATUS.EXECUTED) {
      return mod.exports;
    }

    // 获取模块依赖的输出
    var args = mod.getDepsExport();
    if (isType(mod.factory, 'Function')) {
      // 执行 factory，并将回调结果设置到 exports 中
      var ret = mod.factory.apply(null, args);
      mod.exports = ret || mod.exports;
    } else {
      mod.exports = mod.factory;
    }
    mod.state = STATUS.EXECUTED;
    return mod.exports;
  };


  /**
   * 获取模块资源
   *   设置状态为 FETCHING
   *   加载 script
   *   加载完 script 后，设置状态为 FETCHED，执行 load 函数
   */
  Module.prototype.fetch = function() {
    var mod = this;
    mod.state = STATUS.FETCHING;

    function onloadListener() {
      var readyState = script.readyState;
      if (
        typeof readyState === 'undefined' ||
        /^(loaded|complete)$/.test(readyState)
      ) {

        mod.state = STATUS.FETCHED;
        mod.load();
        interactiveScript = null;
      }
    }

    // 创建 Script 元素
    var uri = mod.uri;
    var script = document.createElement('script');

    // 添加监听事件
    if (script.readyState) {
      script.onreadystatechange = onloadListener;
    } else {
      script.onload = onloadListener;
    }

    // 设置 script 属性并加载
    script.src = uri + '.js';
    script.setAttribute('data-module-id', mod.id);
    script.async = true;
    appendScript(script);
  };


  var headElement = document.getElementsByTagName('head')[0];
  var baseElement = document.getElementsByTagName('base')[0];

  if (baseElement) {
    headElement = baseElement.parentNode;
  }

  /**
   * 添加 Script 元素到 document，用于加载 script
   * @param  {Element} script - script 元素
   */
  function appendScript(script) {
    currentlyAddingScript = script;

    // If BASE tag is in play, using appendChild is a problem for IE6.
    // See: http://dev.jquery.com/ticket/2709
    baseElement
      ?
      headElement.insertBefore(script, baseElement) :
      headElement.appendChild(script);

    currentlyAddingScript = null;
  }

  /**
   * 为模块加载插件
   * @param  {[type]}   module            [description]
   * @param  {[type]}   pluginAndResource [description]
   * @param  {Function} callback          [description]
   * @return {[type]}                     [description]
   */
  function loadPlugin(module, pluginAndResource, callback) {
    var parsedId = parseId(pluginAndResource);
    var pluginId = parsedId.pluginId;
    var resourceId = parsedId.resourceId;

    function onload(value) {
      var cacheId = normalizeResourceId(module, pluginAndResource);
      cachedMod[cacheId] = {
        exports: value
      };
      callback();
    }

    module.require([pluginId], function(plugin) {
      if (!plugin.normalize) {
        plugin.normalize = function(name, normalize) {
          return normalize(name);
        };
      }
      var cacheId = normalizeResourceId(module, pluginAndResource);
      if (cachedMod[cacheId]) {
        callback();
      } else {
        plugin.load(resourceId, module.require, onload, module.requireModule(pluginId).config());
      }
    }, 1);
  }

  function execPlugin(cacheId) {
    var m = cachedMod[cacheId];
    // FIXME
    return m.factory || m.exports;
  }

  function normalizeResourceId(module, pluginAndResource) {
    var parsedId = parseId(pluginAndResource);
    var pluginId = parsedId.pluginId;
    var resourceId = parsedId.resourceId;
    var pluginAbsId = resolveId(pluginId, module.id);
    var plugin = getModule(pluginAbsId).exec();

    return pluginAbsId + '!' + plugin.normalize(resourceId, module.normalize);
  }

  /**
   * define 函数
   * @param  {String} id - 模块ID
   * @param  {Array} deps - 模块依赖数组
   * @param  {[type]} factory [description]
   * @return {[type]}         [description]
   */
  function define(id, deps, factory) {
    if (factory == null) {
      // define(factory);
      if (deps == null) {
        factory = id;
        id = null;
      } else {
        // define(id, factory)
        // define(deps, factory)
        factory = deps;
        deps = null;
        if (isType(id, 'Array')) {
          deps = id;
          id = null;
        }
      }
    }

    var isDepsDec = true;
    if (!isType(deps, 'Array') && isType(factory, 'Function')) {
      deps = [];

      // 获取 CommonJS 格式的依赖
      factory.toString()
        .replace(/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg, '')
        .replace(/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g, function(match, dep) {
          deps.push(dep);
        });
      isDepsDec = false;
    }

    if (!id) {
      var script = getCurrentScript();
      id = script && script.getAttribute('data-module-id');
    }

    if (!id) {
      return;
    }
    var mod = getModule(id);

    mod.id = id;
    mod.deps = deps || [];
    mod.isDepsDec = isDepsDec;
    mod.factory = factory;
    mod.state = STATUS.FETCHED;

  }

  define.amd = {};

  /**
   * require函数
   * @param {Array} deps - 模块依赖数组
   * @param {Function} callback - 回调函数
   * @param {Bool} isForce - 设置为 Force 为 true 的话，无论依赖资源是否加载完成，都直接执行
   */
  var require = requireFactory(cid());

  function requireFactory(base) {
    return function(deps, callback, isForce) {
      if (!isType(deps, 'Array')) {
        // require( 'a' ) or require( 'a!./b' )
        var parsedId = parseId(deps);
        if (parsedId.resourceId) {
          var module = getModule(base);
          var cacheId = normalizeResourceId(module, deps);
          return execPlugin(cacheId);
        } else {
          var id = resolveId(parsedId.pluginId, base);
          return getModule(id).exec();
        }

      } else {
        var randomId = resolveId(cid(), base);
        var mod = new Module(randomId);
        mod.deps = deps;

        // 用户的回调函数
        mod.factory = callback || blank;

        // 模块的回调
        //   加载子模块
        //   执行模块代码
        mod.callback = function() {
          each(mod.deps, function(dep) {
            if (dep.indexOf('!') === -1 && !isBuiltinModule(dep)) {
              mod.require(dep);
            }
          });
          mod.exec();
        };

        // 当前模块已经在执行了，所以，一开始就是资源已加载完成的状态
        mod.state = STATUS.FETCHED;
        mod.isForce = isForce;

        // 执行模块
        mod.load();
      }
    };
  }

  /**
   * 获取模块 ID 对应的模块对象
   * @param  {String} id - 模块ID
   * @return {Module} 模块对象
   */
  function getModule(id) {
    return cachedMod[id] || (cachedMod[id] = new Module(id));
  }

  /**
   * 将 uri 转换成基于 base 的一个合法可用路径
   * @param  {String} uri - 目标路径
   * @param  {String} base - 根路径
   * @return {String} - 合法路径
   */
  function relativeUri(uri, base) {
    var segment = base.split('/').concat(uri.split('/'));
    var path = [];

    each(segment, function(part) {

      // 去除 /a//./b/c.js 中多余的 '/' 和 '.' ==> /a/b/c.js
      if (!part || part === '.') {
        return;
      }

      // 将 /a/b/../c.js 转换为 /a/c.js
      if (part === '..') {
        path.pop();
      } else {
        path.push(part);
      }
    });

    return path.join('/');
  }

  /**
   * 将模块 ID 转换成 uri
   * 通过配置中的 path 对象，将模块 ID 转换成 uri 路径，
   * @param  {String} id - 模块id
   * @return {String} 模块的实际路径
   */
  function id2uri(id) {
    each(pathsList, function(pathConf) {
      if (hasPrefix(id, pathConf.k)) {
        id = id.replace(pathConf.k, pathConf.v);
        return;
      }
    });

    if (id.charAt(0) === '/' || id.indexOf('http') === 0) {
      return id;
    } else {
      // 此处可以看到，但设置 baseUrl 为其他域名的时候，将无法解析
      // 所以，baseUrl 只能设置当前域名下的路径才可以
      return '/' + relativeUri(id, (config.baseUrl || cwd));
    }
  }

  /**
   * str 字符串中是否含有 prefix 前缀
   * @param  {String}  str - 目标字符串
   * @param  {String}  prefix - 前缀字符串
   * @return {Boolean}
   */
  function hasPrefix(str, prefix) {
    return (str + '/').indexOf(prefix + '/') === 0;
  }

  /**
   * 获取一个 js 文件的目录名称
   * dirName('/a/b/c.js') => '/a/b'
   * @param  {String} uri - js文件的路径
   * @return {String} js文件目录名称
   */
  function dirName(uri) {
    var dir = uri.match(/([^?#]*)(\/[^$])/);
    return (dir && dir[1]) || '';
  }

  /**
   * 根据模块 ID 和 base 根路径，获取模块uri
   * @param  {String} id - 模块 id
   * @param  {String} base - 根路径
   * @return {String} 模块 uri
   */
  function resolveId(id, base) {

    id = packagedId(id);
    id = mappedId(id, base);

    if (id.indexOf('.') === 0) {
      id = relativeUri(id, dirName(base));
    }

    id = packagedId(id);
    return id;
  }

  function parseId(id) {
    var segment = id.split('!');
    return {
      pluginId: segment[0],
      resourceId: segment[1]
    };
  }

  /**
   * 根据map 中的配置，将id转换成 uri
   *
   * requirejs.config({
   *   map: {
   *     'some/newmodule': {
   *       'foo': 'foo1.2'
   *     },
   *     'some/oldmodule': {
   *       'foo': 'foo1.0'
   *     }
   *   }
   * });
   *
   * @param  {String} id - 模块 ID
   * @param  {String} base - 模块路径
   * @return {String} 模块 uri
   */
  function mappedId(id, base) {
    each(mapList, function(map) {
      if (hasPrefix(base, map.k) || map.k === '*') {
        each(map.v, function(key) {
          if (hasPrefix(id, key.k)) {
            id = id.replace(key.k, key.v);
            return false;
          }
        });

        return false;
      }
    });

    return id;
  }

  /**
   * 如果 packages 中有设置，则将模块 ID 转换成对应的 URI
   *
   * require.config({
   *   packages: [
   *     "cart",
   *     {
   *       name: "store",
   *       main: "store"
   *     }
   *   ]
   * });
   *
   * @param  {String} id - 模块 ID
   * @return {String} - 模块 uri
   */
  function packagedId(id) {
    each(config.packages, function(packageConf) {
      if (id === packageConf.name) {
        id = packageConf.name + '/' + (packageConf.main || 'main');
        return false;
      }
    });

    return id;
  }

  /**
   * 合并 source 对象至 object 对象，递归合并
   * @param  {Object} object - 目标对象
   * @param  {Object} source - 需要合并的源对象
   */
  function extend(object, source) {
    for (var key in source) {
      if (!object[key] || isType(object[key], 'String')) {
        object[key] = source[key];
      } else {
        extend(object[key], source[key]);
      }
    }
  }

  /**
   * 将 Map对象转换成 list 对象，并对 List 对象进行排序
   * mapToSortedList({"key": "value"}) => [{k: 'key', v: 'value'}]
   * @param  {Map} object - 路径映射map
   * @return {List}
   */
  function mapToSortedList(object) {
    var list = [];

    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        list.push({
          k: key,
          v: object[key]
        });
      }
    }
    list.sort(function(a, b) {
      if (b.k === '*') {
        return -1;
      }
      if (a.k === '*') {
        return 1;
      }
      return b.k.length - a.k.length;
    });
    return list;
  }

  /**
   * 生成 shim 配置
   *   覆盖 factory 方法
   *   覆盖 fetch 方法
   * @param  {Module} m - 模块对象
   */
  function buildShimConf(m) {
    var shim = m.shim;
    m.deps = shim.deps || [];

    /**
     * 覆盖 Module 的 factory 方法
     * 将依赖中的变量进行指定导出
     */
    m.factory = function() {
      var t;
      var depsExport = [];

      // 获取所有依赖的 export 变量
      each(m.deps, function(dep) {
        depsExport.push(m.require(dep));
      });

      // 根据 shim.exports, 从全局对象中获取需要导出的变量
      var exports = depsExport;
      m.shim.exports && (exports = getGlobalVar(m.shim.exports));

      // 如果指定 init 方法的，执行并替换输出
      if (m.shim.init && (t = m.shim.init.apply(global, depsExport))) {
        exports = t;
      }

      // 导出变量
      m.exports = exports;
    };

    m.state = STATUS.UNFETCH;

    /**
     * 覆盖 Module 的 fetch 方法
     */
    m.fetch = function() {
      if (m.state >= STATUS.FETCHING) {
        return;
      }

      m.state = STATUS.FETCHING;

      // 如果有依赖的，需要先执行依赖下载，才能继续进行
      if (m.deps && m.deps.length !== 0) {
        m.require(m.deps, function() {
          Module.prototype.fetch.call(m);
        });
      // 没有依赖的，直接进行下载操作
      } else {
        Module.prototype.fetch.call(m);
      }
    };
  }

  /**
   * 配置模块入口
   * @param  {Object} object - 配置参数对象
   */
  require.config = function(object) {
    extend(config, object);

    if (object.baseUrl) {
      if (object.baseUrl.charAt(0) === '.') {
        config.baseUrl = relativeUri(object.baseUrl, cwd);
      } else {
        config.baseUrl = object.baseUrl;
      }
    }

    // 参考 http://requirejs.org/docs/api.html#packages
    each(config.packages, function(packageConf, i) {
      if (isType(packageConf, 'String')) {
        var segment = packageConf.split('/');
        config.packages[i] = {
          name: segment[0],
          location: packageConf,
          main: 'main'
        };
      }

      packageConf.main && (packageConf.main = packageConf.main.replace('.js', ''));

      // package的处理方式 和 指定paths 的方式类似
      if (packageConf.location) {
        config.paths[packageConf.name] = packageConf.location;
      }
    });

    // 将 map 也转换成 list
    mapList = mapToSortedList(config.map);
    each(mapList, function(map) {
      map.v = mapToSortedList(map.v);
    });

    // 将 paths 转换成 list
    pathsList = mapToSortedList(config.paths);

    var shims = config.shim;
    for (var key in shims) {
      var shim = shims[key];
      if (isType(shim, 'Array')) {
        shims[key] = shim = {
          deps: shim
        };
      }
      // 获取 key 所对应的模块对象，并设置模块的 shim 依赖
      var m = getModule(key);
      m.shim = shim;
      buildShimConf(m);
    }
  };

  if (!global.define) {
    global.define = define;
    global.require = require;
    global.cachedMod = cachedMod;
  }

})(window, document);
