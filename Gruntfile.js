'use strict';
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    clean: ['doc'],
    jsdoc2md: {
        oneOutputFile: {
            src: ['src/*.js', 'src/*/*.js'],
            dest: 'doc/documentation.md'
        }
    }
  });


  grunt.loadNpmTasks('grunt-jsdoc-to-markdown');
  grunt.loadNpmTasks('grunt-contrib-clean');
};
