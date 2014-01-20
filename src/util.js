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

  Util.cartesianToPolar = function(from, r, angle) {

    var v_dir, h_dir;
    if (angle >= 0 && angle <= 90) {
      h_dir = 1;
      v_dir = -1;
    } else if (angle > 90 && angle <= 180) {
      v_dir = 1;
      h_dir = -1;
    } else if (angle > 180 && angle <= 270) {
      v_dir = -1;
      h_dir = 1;
    } else if (angle > 270 && angle < 360) {
      v_dir = 1;
      h_dir = -1;
    }

    angle = angle * (Math.PI / 180);

    return {
      x : from.x + (h_dir * (r * Math.cos(angle))),
      y : from.y + (v_dir * (r * Math.sin(angle)))
    };
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

  Util.nextPoint = function(from, rule, previousAngle) {

    previousAngle = previousAngle || 0;

    var angleBounds = (rule === "L" ?
      { start : 180, end: 360 } :
      { start: 0   , end: 180 });

    var newAngle = Util.randomBetween(angleBounds.start, angleBounds.end);
    
    // if (newAngle > 180 && previousAngle < 180) {
    //   newAngle = newAngle - previousAngle;
    // } else {
    newAngle = (newAngle + previousAngle) % 360;
    //}
    // console.log("resulting angle", newAngle);

    var r = Util.randomBetween(Spec.minLength, Spec.maxLength);
    var newPoint = Util.cartesianToPolar(from, r, newAngle);

    var p;
    // if (previousAngle) {
    //   // adjust angle, rotate 90d back
    //   // previousAngle = ((360 - previousAngle) - 90) % 360;
    //   var prevAngle = previousAngle * (Math.PI/180);

    //   p = {
    //     x : Math.cos(prevAngle) * newPoint.x + Math.sin(prevAngle * newPoint.y),
    //     y : -Math.sin(prevAngle) * newPoint.x + Math.cos(prevAngle) * newPoint.y
    //   };
    // } else {
      p = newPoint;
    // }

    p.angle = newAngle;
    console.log(rule, p);
    return p;
  };
  
  return Util;
});