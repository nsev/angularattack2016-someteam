var gulp = require('gulp');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var del = require('del');
var surge = require('gulp-surge');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

var surgeDomain = 'someteam.2016.angularattack.io';

var src = "src";

var paths = {
  ts: [src + '/**/*.ts'],
  jade: [src + '/**/*.jade'],
  indexTpl: 'index.jade',
  styl: [src + 'assets/styles/main.styl']
};

var webroot = 'www';
var dests = {
  js: webroot,
  html: webroot
};


gulp.task('clean', function() {
  return del([webroot]);
});

gulp.task('build-stylus', [], function() {
  return gulp.src(paths.styl)
    .pipe(stylus())
    .pipe(gulp.dest(webroot));
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
  // return gulp.src(paths.ts)
  //   .pipe(ts({
  //     noImplicitAny: true,
  //     noExternalResolve: true
  //   }))
  //   .pipe(gulp.dest(dests.js));
});

gulp.task('dev', ['build'], function() {
  gulp.watch(paths.ts, ['build-typescript']);
  gulp.watch(paths.jade, ['build-jade']);
  gulp.watch(paths.styl, ['build-stylus']);
});

gulp.task('deploy', ['build'], function () {
  return surge({
    project: './' + webroot,         
    domain: surgeDomain  
  })
})

gulp.task('build', ['build-jade', 'build-typescript', 'build-stylus']);

gulp.task('default', ['dev']);
