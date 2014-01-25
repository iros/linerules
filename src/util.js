"use strict";

define(function(require){
  
  var d3 = require("d3");
  var Spec = require("src/spec");

  var Util = {};
  
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

    var tau = Math.PI * 2 / i,
      randAngle = (Math.random() * Math.PI),
      modifier =  ((rule === 'L') ? 1 : -1),
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