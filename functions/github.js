'use strict';

var request = require("request");
var userDetails;

function initialize() {
    // Setting URL and headers for request
    var options = {
        url: 'https://api.github.com/users/lopezm1',
        headers: {
            'User-Agent': 'request'
        }
    };
    // Return new promise 
    return new Promise(function(resolve, reject) {
     // Do async job
        request.get(options, function(err, resp, body) {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body));
            }
        })
    })
}

function generateResponse(event, details) {
    var response = {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Go Serverless v1.0! Your function executed successfully!',
          input: event,
          output: details
        }),
      };

    return new Promise(function(resolve, reject) {
        if (event) {
            resolve(response);  // fulfilled successfully
         }
         else {
            reject("failed");  // error, rejected
         }
      
       })
}

var errHandler = function(err) {
    console.log(err);
}

module.exports.helloGithub = (event, context, callback) => {

    var initializePromise = initialize();
    initializePromise.then(function(result) {
        userDetails = result;
        return generateResponse(event, userDetails) // return another promise
    })
    .then(function(result) {
        callback(null, result)
    })
    .catch(errHandler)

}