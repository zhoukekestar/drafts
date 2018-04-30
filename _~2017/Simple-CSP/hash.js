const crypto = require('crypto');

const getHashByCode = (code, algorithm = 'sha256') => {
  return algorithm + '-' + crypto.createHash(algorithm).update(code, 'utf8').digest("base64");
}

console.log(getHashByCode('alert("hello world");'));
// 'sha256-wxWy1+9LmiuOeDwtQyZNmWpT0jqCUikqaqVlJdtdh/0='
