"use strict";
const AWS = require("aws-sdk");
AWS.config.update({
  region: process.env.AWS_REGION,
});
const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
  console.log(`The query param received for this function is ${event}`);

  let data = [];
  let params = {
    TableName: process.env.DDB_TABLE,
  };

  if (event && event.length > 0) {
    params.IndexName = "titleIndex";
    params.KeyConditionExpression = "title = :title";
    params.ExpressionAttributeValues = {
      ":title": event ? event : "",
    };
    data = await documentClient.query(params).promise();
  } else data = await documentClient.scan(params).promise();
  
  console.log(data.Items);
  return {
    statusCode: 200,
    body: JSON.stringify(data.Items),
  };
};
