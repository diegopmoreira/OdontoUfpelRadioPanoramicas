// Load plugins
const autoprefixer = require('autoprefixer');
const browsersync = require('browser-sync').create();
const cssnano = require('cssnano');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const minify = require('gulp-minify');
const babel = require('gulp-babel');

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: './dist/',
    },
    port: 3000,
  });
  done();
}

// CSS task
function css() {
  return gulp
    .src('lib/scss/*.scss')
    .pipe(plumber())
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(browsersync.stream());
}

// Transpile, concatenate and minify scripts
function scripts() {
  return gulp
    .src(['lib/js/*.js'])
    .pipe(plumber())
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(minify())
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(browsersync.stream());
}

// Watch files
function watchFiles() {
  gulp.watch('lib/scss/*.scss', css);
  gulp.watch('lib/js/*.js', scripts);
}

// Tasks
gulp.task('css', css);
gulp.task('js', scripts);
gulp.task('default', gulp.parallel(watchFiles, browserSync));
