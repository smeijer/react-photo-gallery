var gulp = require('gulp'),
  initGulpTasks = require('react-component-gulp-tasks');

var COMPONENT_NAME = 'Gallery';
var pkg = JSON.parse(require('fs').readFileSync('./package.json'));

var taskConfig = {
  component: {
    name: COMPONENT_NAME,
    file: './index.js',
    src: './src',
    dist: './dist',
    pkgName: pkg.name,
    dependencies: Object.keys(pkg.dependencies),
  },

  example: {
    src: 'examples/src',
    dist: 'examples/dist',
    standalone: true,
    files: ['.gitignore', '.npmignore', 'favicon.ico', 'index.html'],
    scripts: ['app.js'],
    less: ['example.less'],
  },
};

initGulpTasks(gulp, taskConfig);
