module.exports = async function(context, targetingId, targeting) {
  const { targets } = targeting[0];
  return targets;
};
