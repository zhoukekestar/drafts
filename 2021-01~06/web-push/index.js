const HTTPS_PORT = 3000;
const HTTP2_PORT = 3001;

/**
 * create a normal https server
 */
const https = require("https");
const fs = require("fs");
const mime = require("mime");

const serverOptions = {
  key: fs.readFileSync(__dirname + "/secret/key.pem"),
  cert: fs.readFileSync(__dirname + "/secret/cert.pem")
};

const httpsHandler = (req, res) => {
  console.log(req.url);
  // send emty response for favicon.ico
  if (req.url === "/favicon.ico") {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.url === "/") {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <h1>index</h1>
      <script>
        (async () => {
          const start = Date.now();
          for (let i = 0; i < 1000; i++)  import('/script-' + i + '.js')
          console.log('cost :', Date.now() - start);
        })();
      </script>
    `);
  }

  if (/^\/script/.test(req.url)) {
    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    res.end(`console.log('${req.url}');`);
  }
};

https
  .createServer(serverOptions, httpsHandler)
  .listen(HTTPS_PORT, () =>
    console.log("https server started on port", HTTPS_PORT)
  );

/**
 * create an http2 server
 */
const http2 = require("http2");

// handle requests
const http2Handlers = (req, res) => {
  console.log(req.url);
  if (req.url === "/") {
    const stream = res.stream;

    stream.respond({ ':status': 200 });

    for (let i = 0; i < 1000; i ++) {
      stream.pushStream({ ':path': `/script-${i}.js` }, (err, pushStream, headers) => {
        if (err) throw err;
        pushStream.respond({ ':status': 200, 'content-type': 'text/javascript'});
        pushStream.end(`console.log('/script-${i}.js');`);
      });
    }

    stream.end(`
    <h1>index</h1>
    <script>
      (async () => {
        const start = Date.now();
        for (let i = 0; i < 1000; i++)  import('/script-' + i + '.js')
        console.log('cost :', Date.now() - start);
      })();
    </script>`);
  } else {
    res.writeHead(404);
    res.end('404');
  }
};

http2
  .createSecureServer(serverOptions, http2Handlers)
  .listen(HTTP2_PORT, () => {
    console.log("http2 server started on port", HTTP2_PORT);
  });
