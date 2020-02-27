var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    //Looking for any scss files, plus the bootstrap.scss file in the node_modules
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass())
        //takes the .scss file, turns into a css file, and puts it into the css folder when it is ran.
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

// Move the javascript files into our /src/js folder
gulp.task('js', function() {
    //Looking for the bootstrap.min.js, jquery.min.js, and popper.js files from the node_modules, and sending them to the src/js folder we have created. 
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest("src/js"))
        .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', gulp.series('sass', function() {

    //Loads the files onto localhost:3000
    browserSync.init({
        server: "./src"  
    });

    //Watches the files. What it is saying is that it is looking at all .scss files in the src/scss folder
    //Also is watching the bootstrap.scss file in the node_modules
    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], gulp.series('sass'));
    //Looking for any html file we have, and when found it loads it into the browser.
    gulp.watch("src/*.html").on('change', browserSync.reload);
}));

//Makes it to where the command "gulp" allows the user to run the code in a browser at localhost: 3000
gulp.task('default', gulp.parallel('js','serve'));
