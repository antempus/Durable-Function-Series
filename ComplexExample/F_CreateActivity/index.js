module.exports = async function(context, input) {
  const { template, target } = input;
  const { title, description, id } = template;
  const { employeeId, firstName, lastName } = target;
  const item = {
    id: `${id}-${employeeId}`,
    title,
    description,
    firstName,
    lastName
  };
  context.bindings = { item };
};
