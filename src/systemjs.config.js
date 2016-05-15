(function(global) {
  // map tells the System loader where to look for things
  var map = {
    'app':                        '/app', // 'dist',
    'rxjs':                       '/vendor/rxjs',
    'angular2-in-memory-web-api': '/vendor/angular2-in-memory-web-api',
    '@angular':                   '/vendor/@angular',
    'firebase':                   '/vendor/firebase/lib/firebase-web.js',
    'angularfire2':               '/vendor/angularfire2',
  };
  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { app: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { defaultExtension: 'js' },
    'angularfire2':               { main: 'angularfire2.js', defaultExtension: 'js' }
  };
  var packageNames = [
    '@angular/common',
    '@angular/compiler',
    '@angular/core',
    '@angular/http',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    '@angular/router',
    '@angular/router-deprecated',
    '@angular/testing',
    '@angular/upgrade',
  ];
  // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
  packageNames.forEach(function(pkgName) {
    packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
  });
  var config = {
    map: map,
    packages: packages
  }
  // filterSystemConfig - index.html's chance to modify config before we register it.
  if (global.filterSystemConfig) { global.filterSystemConfig(config); }
  System.config(config);
})(this);