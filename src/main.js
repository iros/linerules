"use strict";

define(function(require) {

  var d3 = require("d3");
  var Spec = require("src/spec");
  var Util = require("src/util");
  var Rules = require("src/rules");

  Spec._drawWidth  = Spec.width - 2 * Spec.maxLength;
  Spec._drawHeight = Spec.height - 2 * Spec.maxLength;

  // make container
  var base = d3.select(Spec.el)
    .append("svg")
    .attr("height", Spec.height)
    .attr("width", Spec.width)
    .append("g")
      .attr("width", Spec._drawWidth)
      .attr("height", Spec._drawHeight)
      .attr("transform", "translate(" + Spec.maxLength+","+Spec.maxLength+")");

  var rules = Rules.generateRules(Spec.iterations, Spec.chance);
  d3.select("#rules").html(rules.join(", "));


  // find arbitrary center
  var center = {
    x : Spec._drawWidth  / 2,
    y : Spec._drawHeight / 2,
    angle : Math.PI/2 //start by driving up
  };

  var draw = function() {
    // base.selectAll("path").style("opacity", 0.05);
    base.selectAll("path").remove();
    base.selectAll("circle").remove();
    base.selectAll("g").remove();

    // draw circle there
    base.append("circle")
      .classed("start", true)
      .attr({
        r : 5,
        cx: center.x,
        cy: center.y,
        fill:"steelblue"
      });

    for(var j = 0; j < Spec.iterations; j++) {
      var points = [center];
      for(var i = 0; i <= Spec.segments-1; i++) {
        var point = Util.nextPoint(points[points.length-1], rules[i], i+1);
        points.push(point);
      }
      Util.drawPath(base, points);
    }
  };

  var keepGoing = true;
  var c = function() {
    setTimeout(function() {
      draw();

      if (keepGoing) c();
    }, 100);
  }
  c();

  d3.select("button#stop").on("click", function() {
    keepGoing = false;
  });
  // draw();

  // Spec.dispatch.on("repaint", draw);

});