module.exports = async function(context) {
  /** note that while the bindings.name also matches the orchestration parameter,
   * the name of the parameter is defined in the function.json for this function
   */
  return `Hello ${context.bindings.name}!`;
};
