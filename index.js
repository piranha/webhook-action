var core = require('@actions/core');
var https = require('https');


function request(input) {
  return new Promise((resolve, reject) => {
    core.debug('Sending request: ' + JSON.stringify(input));

    var req = https.request(
      input.url, {method:  input.method,
                  headers: input.headers},
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
    if (input.body) {
      req.write(input.body);
    }
    req.on('error', reject);
    req.end();
  });
}


function main() {
  var input = {url:     core.getInput('url'),
               method:  core.getInput('method') || 'POST',
               headers: core.getInput('headers') || {},
               body:    core.getInput('body')};

  if (!input.url) {
    throw new Error('`url` is required');
  }

  if (!input.headers['Content-Type'])
    input.headers['Content-Type'] = 'application/json';

  return request(input)
    .catch((err) => core.setFailed('status: ' + err.status + ', body: ' + err.body))
    .then(() => core.debug(`done in ${process.uptime()}s`));
}

main();
