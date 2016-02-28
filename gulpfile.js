"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect');

var localPort = 5555;

gulp.task('default', function() {
  console.log( "\nStarting local server at https://localhost:" + localPort + "/\n" );

  connect.server({
    root: 'app/public/',
    port: localPort,
    https: true
  });
});