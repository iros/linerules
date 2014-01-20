module.exports = function(grunt) {
  grunt.initConfig({
     meta: {
      pkg: grunt.file.readJSON("package.json")
    },

    jshint: {
      options: {
        curly: true,
        unused: false,
        undef: true,
        quotmark: "double",
        trailing: false
      },
      src: {
        options: {
          devel: true,
          globalstrict: true,
          globals: {
            d3: true,
            require: true,
            define: true
          }
        },
        files: {
          src: ["src/**/*.js"]
        }
      },
      grunt: {
        options: {
          node: true
        },
        files: {
          src: ["Gruntfile.js"]
        }
      }
    },

    connect: {
      dev: {
        options: {
          port: 8000,
          hostname: "localhost",
          base: ".",
          keepalive: true
        }
      }
    },

    watch: {
      js: {
        files: ["src/**/*.js"],
        tasks: ["jshint"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.registerTask("default", ["jshint", "connect", "watch"]);
};
