"use strict";

let gulp = require("gulp"),
	rename = require("gulp-rename"),
	cleanCSS = require("gulp-clean-css"),
	uglify = require("gulp-uglify");

gulp.task("minify-css", function () {
	return gulp.src("src/*.css").pipe(cleanCSS()).pipe(rename(function (path) {
		path.extname = ".min.css";

		return path;
	})).pipe(gulp.dest("out"));
});

gulp.task("minify-js", function () {
	return gulp.src("src/*.js").pipe(uglify()).pipe(rename(function (path) {
		path.extname = ".min.js";

		return path;
	})).pipe(gulp.dest("out"));
});

gulp.task("release", ["minify-css", "minify-js"]);