define(function(require) {

  return {
    generateRules: function(n, prob) {
      var rules = [], r;

      // equal change
      if (typeof prob === "undefined") {
        prob = 0.5;
      }

      for(var i = 0; i < n; i++) {
        r = Math.random();
        if (r < prob) {
          rules.push("L");
        } else {
          rules.push("R");
        }
      }
      return rules;
    }
  };
});