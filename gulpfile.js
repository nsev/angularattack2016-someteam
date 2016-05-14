var gulp = require('gulp');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var del = require('del');
var surge = require('gulp-surge');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

var surgeDomain = 'someteam.2016.angularattack.io';

var src = "src";
var noderoot = "node_modules";

var paths = {
  js: [src + '/**/*.js'],
  vendorjs: [
    noderoot + "/**"
    // noderoot + '/rxjs',
  ],
  ts: [src + '/**/*.ts'],
  jade: [src + '/**/*.jade'],
  styl: [src + '/styles.styl']
};

var webroot = 'www';
var dests = {
  js: webroot,
  vendorjs: webroot + '/' + noderoot ,
  html: webroot,
  styl: webroot
};

gulp.task('clean', function() {
  return del([webroot]);
});

gulp.task('copy-vendor-js', [], function() {
  return gulp.src(paths.vendorjs)
    .pipe(gulp.dest(dests.vendorjs));
});

gulp.task('copy-js', [], function() {
  return gulp.src(paths.js)
    .pipe(gulp.dest(dests.js));
});

gulp.task('build-stylus', [], function() {
  return gulp.src(paths.styl)
    .pipe(stylus())
    .pipe(gulp.dest(dests.styl));
});

gulp.task('build-jade', [], function() {
  return gulp.src(paths.jade)
    .pipe(jade())
    .pipe(gulp.dest(dests.html));
});

gulp.task('build-typescript', [], function() {
  var tsResult = tsProject.src()
    .pipe(ts(tsProject));

  return tsResult.js.pipe(gulp.dest(dests.js));
});

gulp.task('dev', ['build'], function() {
  gulp.watch(paths.js, ['copy-js']);
  gulp.watch(paths.ts, ['build-typescript']);
  gulp.watch(paths.jade, ['build-jade']);
  gulp.watch(paths.styl, ['build-stylus']);
});

gulp.task('deploy', ['build'], function() {
  return surge({
    project: './' + webroot,
    domain: surgeDomain
  })
})

gulp.task('build', ['copy-js', 'copy-vendor-js', 'build-jade', 'build-typescript', 'build-stylus']);

gulp.task('default', ['dev']);
