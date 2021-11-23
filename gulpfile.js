const { src, dest, watch, parallel, series }  = require('gulp');

const scss          = require('gulp-sass');
const concat        = require('gulp-concat');
const browserSync   = require('browser-sync').create();
const uglify        = require('gulp-uglify-es').default;
const autoprefixer  = require('gulp-autoprefixer');
const imagemin      = require('gulp-imagemin');
const del           = require('del');

function browsersync() {
  browserSync.init({
    server : {
      baseDir: './'
    }
  });
}

function cleanDist() {
  return del('dist')
}

function images() {
  return src('app/images/**/*')
    .pipe(imagemin(
      [
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 80, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [
            { removeViewBox: true },
            { cleanupIDs: false }
          ]
        })
      ], {verbose: true}
    ))
    .pipe(dest('dist/images'))
}

function copyImages() {
  return src('./app/images/**/*').pipe(dest('./dist/images/'))
}

function scripts() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'app/js/main.js'
  ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream())
}


function styles() {
  return src('app/scss/style.scss')
      .pipe(scss({outputStyle: 'compressed'}))
      .pipe(concat('style.min.css'))
      .pipe(autoprefixer({
        overrideBrowserslist: ['last 10 version'],
        grid: true
      }))
      .pipe(dest('dist/css'))
      .pipe(browserSync.stream())
}

// function build() {
//   return src([
//     'app/css/style.min.css',
//     'app/fonts/**/*',
//     'app/js/main.min.js',
//     'app/*.html'
//   ], {base: 'app'})
//     .pipe(dest('dist'))
// }

function watching() {
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/images/**/*'], copyImages);
  watch(['app/images/**/*']).on('change', copyImages);
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
  watch(['./*.html']).on('change', browserSync.reload);
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.copyImages = copyImages;
exports.cleanDist = cleanDist;


exports.build = series(cleanDist, images, scripts, styles);
exports.default = parallel(styles ,scripts ,browsersync, copyImages, watching);


