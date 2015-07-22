var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

function server () {
    var app = require('./app');
    var server = app.listen(3001, '0.0.0.0');
    console.log('Server running at http://127.0.0.1:3001/');
}

gulp.task('server', server);

gulp.task('mocha', function () {
   return gulp.src('./test/*')
       .pipe(plugins.mocha());
           //.once('end', function () {
           //    process.exit();
           //});
});
gulp.task('test', ['mocha']);
gulp.task('default', ['server']);