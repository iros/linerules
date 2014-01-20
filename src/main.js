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

  // find arbitrary center
  var center = {
    x : Util.randomBetween(0, Spec._drawWidth, true),
    y : Util.randomBetween(0, Spec._drawHeight, true)
  };

  // draw circle there
  base.append("circle")
    .classed("start", true)
    .attr({
      r : 5, cx: center.x, cy: center.y
    });

  var rules = Rules.generateRules(Spec.iterations, Spec.chance);
  
  var r = Util.randomBetween(Spec.minLength, Spec.maxLength);
  // var angle = Util.randomBetween(0, 360, true);
  //var coords = Util.cartesianToPolar(center, r, angle);

  var points = [center], angle;
  for(var i = 1; i <= Spec.iterations; i++) {
    var point = Util.nextPoint(points[i-1], rules[i-1], angle);
    angle = point.angle;
    points.push(point);
  }

  Util.drawPath(base, points);

});