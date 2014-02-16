define(function(require){

  "use strict";

  var d3 = require("d3");
  var Spec = require("src/spec");
  var colorbrewer = require("colorbrewer");

  var Util = {};

  // var colors = d3.scale.linear()
  //   .domain([0, Spec.segments])
  //   .range(["green", "red"]);

  var colors = d3.scale.ordinal()
    .domain([0, Spec.segments])
    .range(colorbrewer.PRGn[Spec.segments]);

  Util.randomBetween = function(lower,upper, round) {
    var f = round ?
      function(n) { return Math.floor(n); } :
      function(n) { return n; };

    return f((Math.random() * (upper - lower)) + lower);
  };

  Util.drawPath = function(base, points) {
    var line = d3.svg.line()
      .x(function(d) { return d.x; })
      .y(function(d) { return d.y; })
      .interpolate("linear");

    return base
        .append("path")
        .style({
          stroke: Spec.color,
          "stroke-width": Spec.strokeWidth,
          opacity: Spec.opacity
        })
        .attr("d", line(points));
  };

  Util.nextPoint = function(from, rule, i) {

    from.angle = (from.angle || 0);

    var tau = Math.PI * 2,
      randAngle = (Math.random() * (Math.PI * Spec.angleFactor)),
      modifier =  rule === "L" ? 1 : -1,
      newAngleS1 = from.angle + (randAngle*modifier) ,
      newAngleS2 = newAngleS1 + tau,
      newAngle = newAngleS2 % tau,
      distance = ((Spec.maxLength - Spec.minLength) * Math.random()) + Spec.minLength,
      newPoint = {
        x: from.x + (Math.cos(newAngle) * distance),
        //y axis is inverted in d3
        y: from.y - (Math.sin(newAngle) * distance),
        angle: newAngle,
        S1:newAngleS1,
        randAngle : randAngle,
        distance: distance
      };
    return newPoint;
  };

  return Util;
});