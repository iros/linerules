"use strict";

define(function(require) {
  return {

    el: "#lines",

    height: 400,
    width: 400,

    maxLength : 100,
    minLength : 50,

    strokeWidth: 1,
    opacity:1,
    color: "black",
    iterations: 20,

    // higher, more left, lower, more rights.
    chance: 0.5
  };
});