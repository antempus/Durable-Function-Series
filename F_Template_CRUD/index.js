module.exports = async function(context, request, templateItem) {
  const { method, body: templateInput } = request;
  const template = templateItem[0];
  switch (method) {
    case "PUT":
      context.bindings.templateItemOut = templateInput;
      // ensure we don't overwrite state if we update
      // TODO ensure state is not null
      const { state } = template;
      context.res = { body: { ...templateInput, state }, status: 201 };
      context.res;
      break;
    case "DELETE":
      if (template) {
        context.res.body = template;
        const deletedItem = { ...template, ttl: 60 };
        context.bindings.templateItemOut = deletedItem;
        context.res = { body: deletedItem, status: 201 };
      } else context.res = { status: 404 };
      break;
    case "GET":
      if (template) context.res.body = template;
      else context.res = { status: 404 };
      break;
    default:
      context.res = { status: 404 };
      break;
  }
};
