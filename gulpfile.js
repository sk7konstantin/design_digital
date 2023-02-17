'use strict'
const {src, dest} = require('gulp');
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cssbeautify = require('gulp-cssbeautify');
const removeComments = require('gulp-strip-css-comments');
const removeCommentsHtml = require('gulp-remove-html-comments');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const plumber = require('gulp-plumber');
// const imagemin = require('gulp-imagemin');
const nunjucks = require('gulp-nunjucks');
const del = require('del');
const notify = require('gulp-notify');
const browserSync = require('browser-sync').create();

const srcPath = 'src/';
const distPath = 'dist/';

const path = {
    build: {
        html: distPath,
        css: distPath + 'css',
        js: distPath + 'js',
        images: distPath + 'img',
        fonts: distPath +'fonts'
    },
    src: {
        html: srcPath + '*.html',
        css: srcPath + 'scss/*.scss',
        js: srcPath + 'js/**/*.js',
        images: srcPath + 'img/**/*.{jpg,png,svg,webp}',
        fonts: srcPath + 'fonts/**/*.{eot,woff,woff2,ttf,svg}'
    },
    watch: {
        html: srcPath + '**/*.html',
        css: srcPath + 'scss/**/*.scss',
        js: srcPath + 'js/**/*.js',
        images: srcPath + 'img/**/*.{jpg, png, svg, webp}',
        fonts: srcPath + 'fonts/**/*.{eot, woff, woff2, ttf, svg}'
    },
    clean: './' + distPath
}


function server() {
    browserSync.init({
        server: {
            baseDir: './' + distPath ,
            notify: false
        }
    })
}

function html() {
    return src(path.src.html, {base: srcPath})
        .pipe(plumber())
        .pipe(nunjucks.compile())
        .pipe(removeCommentsHtml())
        .pipe(dest(path.build.html))
        .pipe(browserSync.reload({stream: true}))
}

function css() {
    return src(path.src.css, {base: srcPath + 'scss/'})
        .pipe(plumber({
            errorHandler: function(err) {
                notify.onError({
                    title: 'SCSS Error',
                    message: 'Error <%= error.message %>'
                })(err);
                this.emit('end')
            }
        }))
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssbeautify())
        .pipe(dest(path.build.css))
        .pipe(cssnano({
            zindex: false,
            discardComments: {
                removeAll: true
            }
        }))
        .pipe(removeComments())
        .pipe(rename({
            suffix: '.min',
            extname: '.css'
        }))
        .pipe(dest(path.build.css))
        .pipe(browserSync.reload({stream: true}))
}

function js() {
    return src(path.src.js, {base: srcPath+'js'})
        .pipe(plumber({
            errorHandler: function(err) {
                notify.onError({
                    title: 'JS Error',
                    message: 'Error <%= error.message %>'
                })(err);
                this.emit('end')
            }
        }))
        .pipe(dest(path.build.js))
        .pipe(browserSync.reload({stream: true}))
}

function images() {
    return src(path.src.images, {base: srcPath + 'img'})
        .pipe(dest(path.build.images))
}

function fonts() {
    return src(path.src.fonts, {base: srcPath + 'fonts'})
        .pipe(dest(path.build.fonts))
}

function clean() {
    return del(path.clean)
}


function watchFiles() {
    gulp.watch([path.watch.html], html)
    gulp.watch([path.watch.css], css)
    gulp.watch([path.watch.js], js)
    gulp.watch([path.watch.images], images)
    gulp.watch([path.watch.fonts], fonts)
}


const build = gulp.series(clean, gulp.parallel(html, css, js, images, fonts));
const watch = gulp.parallel(build, watchFiles, server);


exports.build = build;
exports.default = watch;
exports.clean = clean;
exports.watch = watchFiles;