'use strict';
const AWS = require('aws-sdk');
AWS.config.update({
  region: process.env.AWS_REGION
});

module.exports.handler = async event  => {
  console.log(event);
  var body = {};
  if( typeof event.body === "string") body = JSON.parse(event.body);
  else body = event.body;
  
  var params = {
    stateMachineArn: process.env.statemachine_arn,
    input: JSON.stringify(body.input)
  }
  var response = await startSM(params);
  return response;
}

function startSM (params) {
  return new Promise((resolve, reject) => {
    var stepfunctions = new AWS.StepFunctions()
    stepfunctions.startExecution(params, function (err, data) {
      console.log(err);
      console.log(data);
      let response = {};
      if (err) {
        response = {
              statusCode: 500,
              body: JSON.stringify(err),
              headers:{ 'Access-Control-Allow-Origin' : '*' }
          };
      } else {
        response = {
              statusCode: 200,
              body: JSON.stringify(data),
              headers:{ 'Access-Control-Allow-Origin' : '*' }
          };
      }
      resolve(response);
    })
  });
}