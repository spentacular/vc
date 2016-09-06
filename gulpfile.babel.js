const gulp = require('gulp')
const fileinclude = require('gulp-file-include')
const autoprefixer = require('gulp-autoprefixer')
const browserify = require('browserify')
const babelify = require('babelify')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const plumber = require('gulp-plumber')

/**
 * Paths
 */

const paths = {
  src: {
    html: 'src/index.html',
    css: 'src/style.css',
    js: 'src/script.js'
  },
  dist: 'dist'
}

/**
 * Inline SVGs
 */

gulp.task('include', () => {
  return gulp.src(paths.src.html)
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(paths.dist));
})

/**
 * Autoprefix CSS
 */

gulp.task('css', () => {
  return gulp.src(paths.src.css)
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(paths.dist))
})

/**
 * Compile JavaScript with Babel
 */

gulp.task('js', () => {
  let sources = browserify({
    entries: paths.src.js,
    debug: false
  })
  .transform(babelify.configure({
    compact: true,
    presets: ['es2015']
  }))

  return sources.bundle()
    .pipe(plumber())
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulp.dest('dist'))
})

/**
 * Watch files
 */

gulp.task('watch', ['default'], () => {
  gulp.watch(paths.src.html, ['include'])
  gulp.watch(paths.src.css, ['css'])
  gulp.watch(paths.src.js, ['js'])
})

/**
 * Default
 */

gulp.task('default', ['include', 'js', 'css'])
