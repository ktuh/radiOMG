Tinytest.addAsync(
'ReactLayout - generating root node with props',
function(test, done) {
  var className = "the-class";
  ReactLayout.setRootProps({className});
  var elHtml = ReactLayout._buildRootNode();
  test.equal(/className="the-class"/.test(elHtml), true);
  done();
});