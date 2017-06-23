"use strict";

var gulp = require("gulp"),
    minifyJs = require("gulp-uglify"),
    minifyCss = require("gulp-minify-css"),
    jshint = require("gulp-jshint"),
    stylish = require("jshint-stylish"),
    rename = require("gulp-rename");

gulp.task("jsHint", function () {
    return gulp.src("js/jqk-slider/jquery.jqk-slider.js")
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
});

gulp.task("minifyJs", ["jsHint"], function () {
    return gulp.src("js/jqk-slider/jquery.jqk-slider.js")
        .pipe(minifyJs())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest("dist"));
});

gulp.task("minifyCss", function () {
    return gulp.src("css/jqk-slider/jqk-slider.css")
        .pipe(minifyCss())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest("dist"))
});

gulp.task("watch", function () {
    gulp.watch("css/jqk-slider/jqk-slider.css", ["minifyCss"]);
    gulp.watch("js/jqk-slider/jquery.jqk-slider.js", ["minifyJs"]);
});

gulp.task("default", ["minifyJs", "minifyCss", "watch"], function (e) {
    console.log("running...");
});
