var gulp = require('gulp');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var merge = require('merge-stream');
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
    noderoot + "/@angular/**/*.js",
    noderoot + "/rxjs/**/*.js",
    noderoot + "/font-awesome/**/*.js"
    // noderoot + '/rxjs',
  ],
  ts: [src + '/**/*.ts'],
  jade: [src + '/**/*.jade'],
  styl: [src + '/styles.styl']
};

var folders = [
  // {name : '@angular', path: noderoot + "/@angular/**/*.js"},
  {name : 'rxjs', path: noderoot + "/rxjs/**/*.js"},
  {name : 'font-awesome', path: noderoot + "/font-awesome/**/*"}
];

var webroot = 'www';
var dests = {
  js: webroot,
  vendorjs: webroot + '/vendor',
  html: webroot,
  styl: webroot
};

function copyAngular(){
  return copyVendorJsFolder(noderoot + "/@angular/**/*.js", dests.vendorjs + "/@angular");
}

function copyAngularFire(){
  return copyVendorJsFolder(noderoot + "/angularfire2/**/*.js", dests.vendorjs + "/angularfire2");
}

function copyRxjs(){
  return copyVendorJsFolder(noderoot + "/rxjs/**/*.js", dests.vendorjs + "/rxjs");
}

function copyFA(){
  return copyVendorJsFolder(noderoot + "/font-awesome/**/*", dests.vendorjs + "/font-awesome");
}

function copyFB(){
  return copyVendorJsFolder(noderoot + "/firebase/**/*", dests.vendorjs + "/firebase");
}

function copyVendorJsFolder(path, dest) {
  return gulp.src(path, {baseDir: "./"})
    .pipe(gulp.dest(dest));
}

//for some reason, copying failed if useing loop, probably userfail, but done liek this now....
gulp.task('copy-vendor-js', [], function() {
  var result = copyAngular();
  var merged = merge(result, copyRxjs());
  merged.add(copyFA());
  merged.add(copyFB());
  merged.add(copyAngularFire());

  return merged;
});

gulp.task('clean', function() {
  return del([webroot]);
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
