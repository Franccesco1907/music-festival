// function task(done) {
//   console.log('My first task');
  
//   done();
// }

// exports.task = task;

const { src, dest, watch, parallel } = require('gulp')
// CSS
const sass = require('gulp-sass')(require('sass'))
const plumber = require('gulp-plumber')

// Imágenes
const cache = require('gulp-cache')
const imagemin = require('gulp-imagemin')
const webp = require('gulp-webp')
const avif = require('gulp-avif')

function css(done) {
  src('src/scss/**/*.scss') // Identificar el archivo SASS
  .pipe( plumber() ) // Si tiene problemas, no detiene el workflow
  .pipe( sass() ) // Compilarlo
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

function dev(done) {
  watch('src/scss/**/*.scss', css);

  done();
}

function prod(done) {
  src('src/scss/**/*.scss') // Identificar el archivo SASS
  .pipe( sass() ) // Compilarlo
  .pipe( dest('build/css') ); // Almacenarla en el disco duro

  done();
}

exports.css = css;
exports.versionWebp = versionWebp;
exports.images = images;
exports.dev = parallel(images, versionWebp, versionAvif, dev);
exports.prod = parallel(images, versionWebp, versionAvif, prod);