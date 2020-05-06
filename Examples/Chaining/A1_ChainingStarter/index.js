const df = require('durable-functions');

/**
 *
 * @param {Object} context - durable function context object
 * @param {Object} req -  req object
 * @param {Object} req.params.store - id of store to be evaluated
 * @param {Object} req.query.threshold - id of store to be evaluated

 */
async function clientFunc(context, req) {
  const client = df.getClient(context);
  const { param: { id, threshold } } = req;
  const instanceId = await client.startNew('A1_ChainingOrchestrator', undefined, { id, threshold });
  context.log(`Started A1_ChainingOrchestrator with ID: '${instanceId}'`);
  return client.createCheckStatusResponse(context.bindingData.req, instanceId);
}

module.exports = clientFunc;
