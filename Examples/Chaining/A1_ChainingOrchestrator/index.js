const df = require('durable-functions');

function* chainingOrchestrator(context) {
  // RetryOptions object are used for callActivityWithRetry or callSuborchestratorWithRetry
  const retryOpts = new df.RetryOptions(1000, 3);
  const input = context.getInput();
  const { id: storeLocation, threshold } = input;
  /**  A1_GetStoreInfo will look for store based on some input
   *   and return the object representation of the store
   */
  const store = yield context.df.callActivity('A1_GetStoreInfo', storeLocation);
  // A1_GetUsers will look for employees of a given store and return a store ratin
  const rating = yield context.df.callActivity('A1_GetRating', store);

  // If the stores at or below the threshold, create alert and send to queue
  if (rating <= threshold) {
    const alert = yield context.df.callActivity('A1_BuildAlert', { store, rating, threshold });

    // Since we don't require the output of the activity,
    // we do not need to store the response, if there is one
    yield context.df.callActivityWithRetry('A1_QueueAlert', retryOpts, alert);
  }
}

module.exports = df.orchestrator(chainingOrchestrator);
