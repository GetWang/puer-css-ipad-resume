const { src, dest, watch, series } = require("gulp");
const less = require("gulp-less");

/* 编译 less 文件 */
function compileLess(cb) {
  src("src/less/*.less").pipe(less()).pipe(dest("src/css"));
  cb();
}

/* 监听 less 文件的变动 */
function lessWatch(cb) {
  watch(["src/less/*.less"], compileLess);
  cb();
}

exports.default = series(compileLess, lessWatch);
