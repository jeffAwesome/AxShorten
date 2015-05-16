// Gruntfile.js
module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Mocha
    mocha: {
      all: {
        src: ['tests/testrunner.html'],
      },
      options: {
        run: true,
        require: './define-chai'
      }
    }
  });

/* global chai, expect */
  chai = require('chai');
  expect = chai.expect;

  // Load grunt mocha task
  grunt.loadNpmTasks('grunt-mocha');
  grunt.registerTask('default', ['mocha']);
};
