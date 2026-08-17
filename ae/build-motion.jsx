// After Effects ExtendScript: generate the IDEA → PRODUCT typography animation.
(function () {
  app.beginUndoGroup("Build Xiaolu Portfolio Motion");
  var comp = app.project.items.addComp("XL_Idea_To_Product", 1920, 1080, 1, 5, 25);
  comp.bgColor = [0.04, 0.04, 0.04];
  var words = ["IDEA", "STRUCTURE", "EXPERIENCE", "PRODUCT."];
  var x = [280, 650, 1120, 1510];
  for (var i = 0; i < words.length; i++) {
    var layer = comp.layers.addText(words[i]);
    layer.name = "TYPE_" + words[i];
    var source = layer.property("Source Text");
    var doc = source.value;
    doc.fontSize = i === 3 ? 92 : 64;
    doc.fillColor = i === 3 ? [0.91, 1, 0.34] : [1, 1, 1];
    doc.justification = ParagraphJustification.CENTER_JUSTIFY;
    source.setValue(doc);
    layer.property("Position").setValue([x[i], 540]);
    var opacity = layer.property("Opacity");
    var start = 0.4 + i * 0.85;
    opacity.setValueAtTime(start, 0);
    opacity.setValueAtTime(start + 0.35, 100);
    var scale = layer.property("Scale");
    scale.setValueAtTime(start, [86, 86]);
    scale.setValueAtTime(start + 0.5, [100, 100]);
  }
  app.endUndoGroup();
})();
