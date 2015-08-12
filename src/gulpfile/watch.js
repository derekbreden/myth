import gulp from 'gulp'
import run_sequence from 'run-sequence'

gulp.task("watch", (cb) => {
  gulp.watch([
    './src/**/*.html',
    './node_modules/myth/src/**/*.html',
    './node_modules/myth/src/**/*.js'
  ], () => {
    run_sequence("build_client","build_app","reload_client")
  })
  cb()
})
