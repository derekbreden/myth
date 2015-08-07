import gulp from 'gulp'
import browserify from 'browserify'
import babelify from 'babelify'
import del from 'del'
import source from 'vinyl-source-stream'

gulp.task("build_js",(cb)=>{

  gulp.src([
    "./node_modules/myth/src/**/*.js",
    "!./node_modules/myth/src/**/server.js",
    "!./node_modules/myth/src/gulpfile/**/*.js"
  ])
    .pipe(gulp.dest("./build/"))
    .on('end',()=>{
      browserify({
        entries: ['./build/entry/client.js']
      })
      .transform(babelify)
      .bundle()
      .on('error', (err)=>{
        console.warn(err.toString())
        if(err.filename){
          console.error(err.filename)
          console.error(err.loc)
          console.error(err.codeFrame)
        }
      })
      .pipe(source('entry/client.js'))
      .pipe(gulp.dest("./build"))
      .on('end', () => {
        del([
          "./build/**/*.js",
          "!./build/**/server.js",
          "!./build/entry/client.js",
          "./build/socket",
          "./build/m"
        ],()=>{})
        if(cb)cb()
      })
    })
})
