var core = require('@actions/core');
var https = require('https');


function post(url, method, headers, body) {
  if (!headers) headers = {};
  if (!headers['Content-Type']) headers['Content-Type'] = 'application/json';

  return new Promise((resolve, reject) => {
    var req = https.request(
      url,
      {method: method || 'POST',
       headers: headers || {'Content-Type': 'application/json'}},
      (response) => {
        var data = [];
        response.on('data', (chunk) => data.push(chunk));
        response.on('end', () => {
          var result = {status: response.statusCode, body: data.join('')};
          if (response.statusCode < 200 || response.statusCode > 299) {
            reject(result);
          } else {
            resolve(result);
          }
        });
      });
    req.write(body);
    req.on('error', reject);
    req.end();
  });
}


function main() {
  var url = core.getInput('url');
  var method = core.getInput('method');
  var headers = core.getInput('headers');
  var data = core.getInput('data');

  if (!url) {
    throw new Error('`url` is required');
  }

  return post(url, method, headers, data)
    .catch((err) => core.setFailed('status: ' + err.status + ', body: ' + err.body))
    .then(() => core.debug(`done in ${process.uptime()}s`));
}

main();
