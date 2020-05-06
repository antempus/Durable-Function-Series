
/**
 * The function.json for this activity doesn't use the context bindings,
 * rather `$return` for the named output. The associated documentation for $return behavior
 * https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-return-value?tabs=javascript
 */
async function queueAlert(context, alert) {
  return alert;
}
module.exports = queueAlert;
