module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      dist: {
        files: {
          'public/stylesheets/main.css': 'sass/main.scss'
        }
      }
    },
    concat: {
      dest: {
        src: ['angular/*.js', 'angular/**/*.js'],
        dest: "public/javascript/angular.min.js"
      }
    },
    uglify: {
      js: {
        src: ["public/javascript/angular.min.js"],
        dest: "public/javascript/angular.min.js"
      }
    },
    watch: {
      source: {
        files: ['sass/**/*.scss', 'views/**/*.jade', 'angular/**/*.js', "angular/*.js"],
        tasks: ['sass', 'concat', 'uglify'],
        options: {
          livereload: true, // needed to run LiveReload
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-sass');
  grunt.registerTask('default', ['sass']);
  grunt.registerTask('default', ['concat', 'uglify'])
  grunt.registerTask('build', []);
};