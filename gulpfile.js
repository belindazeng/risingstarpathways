var gulp = require('gulp')
 ,  less = require('gulp-less')
 , concat = require('gulp-concat')
 , browserSync = require('browser-sync').create()
 , header = require('gulp-header')
 , cleanCSS = require('gulp-clean-css')
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

var baseDir = path.join(__dirname, 'public');

// Compile LESS files from /less into /css
gulp.task('less', function() {
    return gulp.src('less/creative.less')
        .pipe(less())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(gulp.dest(path.join(baseDir, "css")))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify compiled CSS
gulp.task('minify-css', ['less'], function() {
    return gulp.src('css/creative.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(path.join(baseDir, "css")))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify JS
gulp.task('minify-js', function() {
    return gulp.src(['js/creative.js', "js/blueberry.js"])
        .pipe(uglify())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(path.join(baseDir, "js")))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Copy vendor libraries from /node_modules into /vendor
gulp.task('copy', function() {
    // copy images
    gulp.src(['img/**'])
        .pipe(gulp.dest(path.join(baseDir, "vendor", "bootstrap")))
    // copy sources
    gulp.src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
        .pipe(gulp.dest(path.join(baseDir, "vendor", "bootstrap")))

    gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest(path.join(baseDir, "vendor", "jquery")))

    gulp.src(['node_modules/magnific-popup/dist/*'])
        .pipe(gulp.dest(path.join(baseDir, "vendor", "magnific-popup")))

    gulp.src(['node_modules/scrollreveal/dist/*.js'])
        .pipe(gulp.dest(path.join(baseDir, "vendor", 'scrollreveal')))

    gulp.src([
            'node_modules/font-awesome/**',
            '!node_modules/font-awesome/**/*.map',
            '!node_modules/font-awesome/.npmignore',
            '!node_modules/font-awesome/*.txt',
            '!node_modules/font-awesome/*.md',
            '!node_modules/font-awesome/*.json'
        ])
        .pipe(gulp.dest(path.join(baseDir, "vendor", "font-awesome")))
})

// Our personal framework
gulp.task('index', function() {
    return gulp.src([
        'html/common/header.html',
        'html/index.html',
        'html/common/footer.html'
    ])
    .pipe(concat('index.html'))
    .pipe(gulp.dest(baseDir));
});

// Build all the HTML pages.
gulp.task('build-html', ['index']);

// Run everything
gulp.task('default', ['build-html', 'less', 'minify-css', 'minify-js', 'copy']);

// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: baseDir
        },
    })
})

// Dev task with browserSync
gulp.task('dev', ['browserSync', 'build-html', 'less', 'minify-css', 'minify-js'], function() {
    gulp.watch('less/*.less', ['less']);
    gulp.watch('css/*.css', ['minify-css']);
    gulp.watch('js/*.js', ['minify-js']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('js/**/*.js', browserSync.reload);
});
