const df = require("durable-functions");

module.exports = df.orchestrator(function*(context) {
  // destructure the name input by the client function
  const { name } = context.df.getInput();
  // pass the property to the activity
  const output = yield context.df.callActivity("HTTPActivity", name);
  return output;
});
