// パッケージの定義
const gulp = require("gulp");
const rename = require("gulp-rename");
const tap = require("gulp-tap");
const webp = require("gulp-webp");

// webpに画像ファイルを変換
gulp.task("webp", function () {
    return gulp.src("script/input/*.{jpg,jpeg,png}")
		.pipe(tap(function(file,t){
            // 処理中のファイルの拡張子取得
			const en = file.extname;
            return gulp.src(file.path, {base: 'script/input/'})
            // クオリティ80%でwebp生成
			.pipe(webp({
				quality: 80
            }))
            //ファイル名の末尾に元の拡張子を付ける
			.pipe(rename({
				suffix: en
			}))
			.pipe(gulp.dest('script/output/'));
		}));
});

// inputファイル下の画像を監視
gulp.task("watch-imgs", done => {
    gulp.watch("script/input/*.{jpg,jpeg,png}", gulp.task("webp"));

    done();
    console.log("gulp watch started");
});

// inputファイル下の画像を監視、変更されたらwebpタスクを実行する
gulp.task("convert", gulp.series("watch-imgs", "webp", done => {
    done();
    console.log("Ready for convert");
}));