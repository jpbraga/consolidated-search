# consolidated-search
A serverless project for AWS that uses step functions to query multiple microservices in parallel and return it's aggregated result via WebSockets 

# Objective
The objective of this repository is to address the need for orchestrating multiple microservices without altering them or make the overall architecture tight coupled.
This orchestration will develop a "business service" that will be consumed synchronously by the end consumer.

**There are redundancies in this project. They are abstractions to the real thing, and they are there on purpose to prove a point.**

# Serverless framework
This project uses the Serverless framework for IaaC deployment on AWS. Make sure you have the Serverless framework and all its dependencies installed - plugins are specified in the package.json in the project's root directory.

# Solution Overview
Architecture diagram: https://csearch-readme-file-image.s3.amazonaws.com/StepFunction+(1).jpeg

This project uses step functions for microservices orchestration. Since it doesn't provide a synchronous response when invoked, a WebSocket connection will be used to archive the nearest of a synch response as possible.

The client application connects to the WebSocket server and, once connected, it queries the route $getconnid to get the connectionId needed to receive the result produced by the step function's state machine.

Once in possession of the connectionId, the client app makes a post request to the API gateway endpoint that will be responsible for the state machine startup passing along the connectionId and query parameters.

# State Machine
The State Machine fires up a request for microservices in parallel. For each microservice, when it returns with a response, it will parse its response payload into JSON. Once they all resolve their requests, it will consolidate it into a single array and pass it along to the lambda function that will invoke the API Gateway WebSocket server along with the connectionId of the open connection to the client and will send the response payload through it.

# OBS:
To make it more resilient, in a production-level State Machine, I strongly advise taking into account develop the error handling steps for a service like that and use the WebSocket notification structure to notify the client if something wrong happens to the request.

I also advise implementing a timeout to the WebSocket wait time on the client-side.

# Angular client project
There is an angular client in this repository ready to consume the back-end service once it's in place.

You can check it out here: http://csearchclient-20201029235539-hostingbucket-dev.s3-website-us-east-1.amazonaws.com/home

# DynamoDB Seeding
This project has JSON files with content to be loaded into the DynamoDB tables to get the POC running in no time. To load the content into the databases, after a successful execution of a "$ serverless deploy" run the following:

**$ sls dynamodb:seed**

The content of the directory seed will be loaded into the dynamodb databases.
