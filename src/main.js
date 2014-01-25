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

  var draw = function() {
    base.selectAll("path").remove();
    base.selectAll("circle").remove();

    // find arbitrary center
    var center = {
      x : Spec._drawWidth * Math.random(),
      y : Spec._drawHeight * Math.random(),
      angle : Math.PI/2 //start by driving up
    };

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

  draw();

  Spec.dispatch.on("repaint", draw);

});