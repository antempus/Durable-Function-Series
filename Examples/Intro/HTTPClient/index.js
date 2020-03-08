const df = require("durable-functions");

module.exports = async function(context, req) {
  const client = df.getClient(context);
  const {
    params: { name }
  } = req;

  // Passing in the parameters as a object helps for using in later functions
  const instanceId = await client.startNew("HTTPOrchestrator", undefined, {
    name
  });

  //implicitly return the value from the orchestration
  return client.waitForCompletionOrCreateCheckStatusResponse(
    context.bindingData.req,
    instanceId
  );
};
