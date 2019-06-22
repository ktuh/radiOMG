module.exports = function () {
  return {
    visitor: {
      CallExpression(path) {
        if (path.node.callee.property
          && path.node.callee.property.name === 'defineLocale'
          && !path.node.arguments[0].value !== 'en') {
          path.parentPath.parentPath.remove();
        }
      }
    }
  };
};
