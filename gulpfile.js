var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');

function reload() {
  browserSync.reload({ stream: false });
};

gulp.task('browsersync', function() {
  browserSync.init({
    files: ['public/**/*.*', 'views/**/*.*'],
    proxy: 'http://localhost:3000',
    port: 4000,
    open: true
  });
});

gulp.task('serve', ['browsersync'], function () {
  nodemon({
    script: './bin/www',
    ext: 'js html css',
    ignore: [
      'node_modules',
      'bin',
      'views',
      'public',
      'test'
    ],
    env: {
      'NODE_ENV': 'development'
    },
    stdout: false
  }).on('readable', function() {
  this.stdout.on('data', function(chunk) {
  if (/^Express\ server\ listening/.test(chunk)) {
        reload();
      }
      process.stdout.write(chunk);
    });
    this.stderr.on('data', function(chunk) {
      process.stderr.write(chunk);
    });
  });
});

gulp.task('default', ['serve']);