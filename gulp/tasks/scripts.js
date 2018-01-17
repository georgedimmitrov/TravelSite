const gulp = require('gulp');
const webpack = require('webpack');

gulp.task('scripts', (callback) => {
  webpack(require('../../webpack.config.js'), (error, stats) => {
    if (error) {
      console.log(err.toString());
    }
    
    console.log(stats.toString());
    callback();
  });
});