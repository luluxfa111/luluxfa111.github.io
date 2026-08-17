// After Effects ExtendScript — XL Hero Card Fan / 1920x1080 / 25fps / 6s
// Run with: File > Scripts > Run Script File. Replace placeholder solids with project screenshots.
(function () {
  app.beginUndoGroup("Build XL Hero Card Fan");
  var comp = app.project.items.addComp("XL_Hero_Card_Fan", 1920, 1080, 1, 6, 25);
  comp.bgColor = [0.957, 0.953, 0.937];
  var names = ["WEEKEND MEET", "JOB SYSTEM", "BLUEKING LITE", "JOBPILOT", "AGENT DELIVERY"];
  var colors = [[0.25,0.36,0.27],[0.5,0.42,1],[0.08,0.08,0.08],[0.87,1,0.31],[0.2,0.4,0.95]];
  var x = [620,780,960,1140,1300], y = [665,625,590,625,665], rot = [-13,-7,0,7,13];
  for (var i=0;i<5;i++) {
    var card = comp.layers.addSolid(colors[i], names[i], 420, 285, 1, 6);
    card.property("Anchor Point").setValue([210,350]);
    var p=card.property("Position"), s=card.property("Scale"), r=card.property("Rotation"), o=card.property("Opacity");
    var t=.7+i*.13;
    p.setValueAtTime(t,[960,760]); p.setValueAtTime(t+.75,[x[i],y[i]]);
    s.setValueAtTime(t,[55,55]); s.setValueAtTime(t+.75,[100,100]);
    r.setValueAtTime(t,0); r.setValueAtTime(t+.75,rot[i]);
    o.setValueAtTime(t,0); o.setValueAtTime(t+.18,100);
    var text=comp.layers.addText(names[i]); text.name="LABEL_"+names[i];
    var doc=text.property("Source Text").value; doc.fontSize=28; doc.fillColor=[1,1,1]; doc.justification=ParagraphJustification.CENTER_JUSTIFY; text.property("Source Text").setValue(doc);
    text.parent=card; text.property("Position").setValue([210,220]);
  }
  app.endUndoGroup();
})();
