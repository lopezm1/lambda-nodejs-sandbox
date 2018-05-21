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
        if (details) {
            resolve(response);  // fulfilled successfully
         }
         else {
            reject(/* reason */);  // error, rejected
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
        console.log("Initialized user details");
        // Use user details from here
        console.log(userDetails)
        return userDetails
    }, errHandler)
    .then(function(result) {
        // Print the code activity. Prints 110
        console.log("Total # of repos: ", result.public_gists + result.public_repos);
        return generateResponse(event, result)
    }, errHandler )
    .then(function(response){
        callback(null, response)
    })
    .catch(errHandler)

}