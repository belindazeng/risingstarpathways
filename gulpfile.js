var gulp = require('gulp')
 ,  less = require('gulp-less')
 , concat = require('gulp-concat')
 , browserSync = require('browser-sync').create()
 , header = require('gulp-header')
 , cleanCSS = require('gulp-clean-css')
 , gulpFn = require('gulp-fn')
 , rename = require("gulp-rename")
 , uglify = require('gulp-uglify')
 , path = require("path")
 , pkg = require('./package.json');

// Set the banner content
var banner = ['/*!\n',
    ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2016-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
    ' */\n',
    ''
].join('');

var outDir = path.join(__dirname, 'public');

// Compile LESS files from /less into /css
gulp.task('less', function() {
    return gulp.src('less/custom.less')
        .pipe(less())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(gulp.dest(path.join(outDir, "css")))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify compiled CSS
gulp.task('minify-css', ['less'], function() {
    return gulp.src(path.join(outDir, 'css', 'custom.css'))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(path.join(outDir, "css")))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify JS
gulp.task('minify-js', function() {
    return gulp.src(['js/creative.js', "js/blueberry.js"])
        .pipe(gulp.dest(path.join(outDir, "js")))
        .pipe(uglify())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(path.join(outDir, "js")))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Copy images
gulp.task('img', function(){
      gulp.src(['img/**'])
         .pipe(gulp.dest(path.join(outDir, "img")))

});
// Copy vendor libraries from /node_modules into /vendor
gulp.task('copy', function() {
    // copy sources
    gulp.src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
        .pipe(gulp.dest(path.join(outDir, "vendor", "bootstrap")))

    gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest(path.join(outDir, "vendor", "jquery")))

    gulp.src(['node_modules/magnific-popup/dist/*'])
        .pipe(gulp.dest(path.join(outDir, "vendor", "magnific-popup")))

    gulp.src(['node_modules/scrollreveal/dist/*.js'])
        .pipe(gulp.dest(path.join(outDir, "vendor", 'scrollreveal')))

    gulp.src([
            'node_modules/font-awesome/**',
            '!node_modules/font-awesome/**/*.map',
            '!node_modules/font-awesome/.npmignore',
            '!node_modules/font-awesome/*.txt',
            '!node_modules/font-awesome/*.md',
            '!node_modules/font-awesome/*.json'
        ])
        .pipe(gulp.dest(path.join(outDir, "vendor", "font-awesome")))
})

// Our personal framework
gulp.task('build', function() {
    gulp.src(['html/*.html'])
        .pipe(gulpFn(function(file){
            gulp.src([
                path.join(__dirname, 'html', 'common', 'header.html'),
                file.path,
                path.join(__dirname, 'html', 'common', 'footer.html')
            ])
                .pipe(concat(path.basename(file.path)))
                .pipe(gulp.dest(outDir))
                .pipe(browserSync.reload({
                    stream: true
                }));
        }))
});

// Base set-up
gulp.task('base', ['build', 'less', 'minify-css', 'minify-js', 'img']);

// Run everything
gulp.task('default', ['base', 'copy']);

// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: outDir
        },
    })
})

// Dev task with browserSync
gulp.task('dev', ['browserSync', 'base'], function() {
    gulp.watch('less/*.less', ['less', 'minify-css']);
    gulp.watch('img/*', ['img']);
    gulp.watch('js/*.js', ['minify-js']);
    gulp.watch('html/*.html', ['build']);
    gulp.watch('html/common/*.html', ['build']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('html/**/*.html', browserSync.reload);
    gulp.watch('js/**/*.js', browserSync.reload);
});
