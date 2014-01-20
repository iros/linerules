require.config({
  baseUrl: ".",
  paths: {
    d3: "node_modules/d3/d3",
  },
  shim: {
    d3: {
      exports: "d3"
    },
  },
  deps: ["src/main"]
});