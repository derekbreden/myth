import server from 'gulp-develop-server'
import gulp from 'gulp'
import babel from 'gulp-babel'
import plumber from 'gulp-plumber'

gulp.task("build_app", (cb) => {
  gulp.src([
    "./node_modules/myth/src/server/**/*.js",
    "./build/server/tmp_modules.js"
  ])
    .pipe(plumber())
    .pipe(babel())
    .on('error', (err) => {
      console.error(err.fileName)
      console.error(err.loc)
      console.error(err.codeFrame)
      server.kill()
    })
    .pipe(gulp.dest("./build/server"))
    .on('end', () => {
      let server_ready = () => {
        if(cb)cb()
      }
      if(!server.child)
        server.listen({ path: './build/server/index.js' }, server_ready)
      else
        server.restart(server_ready)
    })
})