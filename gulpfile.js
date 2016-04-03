//Include paths
var paths = require('./gulp-paths');

// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Lint Task
gulp.task('lint', function() {
    return gulp.src(paths.javascripts.src + '**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src(paths.styles.src + '**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(paths.styles.dest));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(paths.javascripts.src + '**/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.javascripts.dest));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(paths.javascripts.src + '**/*.js', ['lint', 'scripts']);
    gulp.watch(paths.images.src + '**/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);