"use strict";

define(function(require) {

  var DatGui = require("dat.GUI");
  var d3 = require("d3");

  var opts = {

    dispatch: d3.dispatch("repaint"),

    el: "#lines",

    height: 800,
    width: 800,

    maxLength : 100,
    minLength : 1,

    strokeWidth: 1.5,
    opacity: 0.3,
    color: "black",
    segments: 10,
    iterations: 100,

    angleFactor: 1,

    // higher, more left, lower, more rights.
    chance: 0.5
  };

  var gui = new DatGui();

  var h = gui.addFolder("Options");

  var repaint = function() {
    opts.dispatch.repaint();
  };

  h.add(opts, "height", 10, 1000).step(100).onChange(repaint);
  h.add(opts, "width", 10, 1000).step(100).onChange(repaint);
  
  h.add(opts, "maxLength", 1, 100).step(5).onChange(repaint);
  h.add(opts, "minLength", 1, 100).step(5).onChange(repaint);

  h.add(opts, "strokeWidth", 1, 10).step(0.5).onChange(repaint);
  h.add(opts, "opacity", 0, 1).step(0.1).onChange(repaint);

  h.add(opts, "angleFactor", 0, 1.0).step(0.1).onChange(repaint);
  h.add(opts, "segments", 1, 50).step(1).onChange(repaint);
  h.add(opts, "iterations", 10, 1000).step(25).onChange(repaint);

  h.open();

  return opts;
});