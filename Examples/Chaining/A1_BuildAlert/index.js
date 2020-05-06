async function generateAlert(context, input) {
  const { store, threshold } = input;
  const warning = `store ${store.id} is below the ratings threshold ${threshold}`;
  return { warning, ...input };
}

module.exports = generateAlert;
