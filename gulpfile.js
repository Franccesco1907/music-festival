// function task(done) {
//   console.log('My first task');
  
//   done();
// }

// exports.task = task;

const { src, dest, watch, parallel } = require('gulp')
// CSS
const sass = require('gulp-sass')(require('sass'))
const plumber = require('gulp-plumber')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const postcss = require('gulp-postcss')
const sourcemaps = require('gulp-sourcemaps')

// Javascript

const terser = require('gulp-terser-js')

// Imágenes
const cache = require('gulp-cache')
const imagemin = require('gulp-imagemin')
const webp = require('gulp-webp')
const avif = require('gulp-avif')

function css(done) {
  src('src/scss/**/*.scss') // Identificar el archivo SASS
  .pipe( sourcemaps.init() )
  .pipe( plumber() ) // Si tiene problemas, no detiene el workflow
  .pipe( sass() ) // Compilarlo
  .pipe( postcss([autoprefixer(), cssnano()]))
  .pipe( sourcemaps.write('.') )
  .pipe( dest('build/css') ); // Almacenarla en el disco duro


  done(); // Callback que avisa a gulp cuando llegamos al final
}

function images(done) {
  const options = {
    optimizationLevel: 3
  }
  src('src/img/**/*.{jpg,png}')
  .pipe( cache( imagemin(options) ) )
  .pipe( dest('build/img') )

  done();
}

function versionWebp(done) {
  const options = {
    quality: 50
  }
  src('src/img/**/*.{jpg,png}')
  .pipe( webp(options) )
  .pipe( dest('build/img') )
  done();
}

function versionAvif(done) {
  const options = {
    quality: 50
  }
  src('src/img/**/*.{jpg,png}')
  .pipe( avif(options) )
  .pipe( dest('build/img') )
  done();
}

function javascript( done ) {
  src('src/js/**/*.js')
    .pipe( sourcemaps.init() )
    .pipe( terser() )
    .pipe( sourcemaps.write('.') )
    .pipe( dest('build/js') );

  done();
}

function dev(done) {
  watch('src/scss/**/*.scss', css);
  watch('src/js/**/*.js', javascript);

  done();
}


function prod(done) {
  src('src/scss/**/*.scss') // Identificar el archivo SASS
  .pipe( sass() ) // Compilarlo
  .pipe( dest('build/css') ); // Almacenarla en el disco duro

  done();
}

exports.css = css;
exports.js = javascript;
exports.versionWebp = versionWebp;
exports.images = images;
exports.dev = parallel(images, versionWebp, versionAvif, javascript, dev);
exports.prod = parallel(images, versionWebp, versionAvif, javascript, prod);