exports.handler = async (event) => {
  const response = {
      statusCode: 200,
      body: JSON.stringify({connectionId: event.requestContext.connectionId}),
  };
  return response;
};