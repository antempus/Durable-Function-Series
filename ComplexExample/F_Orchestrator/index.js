const df = require("durable-functions");

module.exports = df.orchestrator(function*(context) {
  const template = context.df.getInput();
  const { targets } = template;
  const targetActivities = targets.map(target =>
    context.df.callActivity("F_TargetsActivity", target)
  );
  const targetResults = yield context.df.Task.all(targetActivities);

  const createActivites = [];
  targetResults.forEach(targetResult =>
    targetResult.forEach(target =>
      createActivites.push(
        context.df.callActivity("F_CreateActivity", { target, template })
      )
    )
  );
  const result = yield context.df.Task.all(createActivites);
  return result;
});
