const gulp = require('gulp');
const ts = require('gulp-typescript');
const server = require('gulp-develop-server');
const clean = require('gulp-clean');
const runSequence = require('run-sequence');
const JSON_FILES = ['src/*.json', 'src/**/*.json'];

// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json');

gulp.task('build-scripts', () => {
  const tsResult = tsProject.src()
  .pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('assets', function() {
  return gulp.src(JSON_FILES)
  .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
return gulp.src('dist/**', {read: false})
    .pipe(clean());
});

gulp.task('watch', () => {
    gulp.watch('src/**/*.ts', ['build-scripts', server.restart]);
    gulp.watch(JSON_FILES, ['assets', server.restart]);
});

gulp.task('serve', () => {
    runSequence('clean', ['build-scripts', 'assets'], 'watch', () => {
        server.listen({ path: 'dist/index.js' });
    });
});

gulp.task('build', () => {
    runSequence('clean', ['build-scripts', 'assets']);
});