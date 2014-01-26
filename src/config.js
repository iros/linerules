require.config({
  baseUrl: ".",
  paths: {
    d3: "node_modules/d3/d3",
    "dat.GUI": "libs/dat-gui/src/dat/gui/GUI",
    "dat": "libs/dat-gui/src/dat",
    "text": "libs/text",
    "colorbrewer": "libs/colorbrewer"
  },
  shim: {
    d3: {
      exports: "d3"
    },

    colorbrewer: {
      exports: "colorbrewer"
    }
  },
  deps: ["src/main"]
});