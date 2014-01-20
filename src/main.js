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
    x : Spec._drawWidth * Math.random(),
    y : Spec._drawHeight * Math.random(),
    angle : Math.PI/2 //start by driving up
  };

  // draw circle there
  base.append("circle")
    .classed("start", true)
    .attr({
      r : 5, cx: center.x, cy: center.y, fill:'green'
    });

  var rules = Rules.generateRules(Spec.iterations, Spec.chance);
  
  var r = Util.randomBetween(Spec.minLength, Spec.maxLength);
  // var angle = Util.randomBetween(0, 360, true);
  //var coords = Util.cartesianToPolar(center, r, angle);

  var points = [center], angle;
  for(var i = 0; i <= Spec.iterations-1; i++) {
    var point = Util.nextPoint(points[points.length-1], rules[i]);
    points.push(point);
  }

  Util.drawPath(base, points);

  var lastPoint = points[points.length-1];

  base.append("circle")
    .classed("stop", true)
    .attr({
      r : 5, cx: lastPoint.x, cy: lastPoint.y, fill:'red'
    });

});