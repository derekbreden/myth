import htmlparser from 'htmlparser2-myth'
import gutil from 'gulp-util'
import parse_node from './parse_node'
import parse_css from './parse_css'

export default function(file, callback, class_iterator){
  let final_css = ''
  let final_js = ''
  let handler = new htmlparser.DomHandler((error, dom)=>{
    let top_level_class = `ms-${class_iterator}`
    let built = {
      html_css: '',
      ctrl_css: '',
      window_js: '',
      ctrl_js: '',
      server_js: '',
      views: [],
      final_css: ''
    }
    for(let i in dom){
      built = parse_node(dom[i], built, top_level_class)
    }

    let built_views = built.views[0]
    if(built.views.length > 1)
      built_views = `m('div',[${built.views.join(',\n')}])`

    // Local CSS
    final_css += parse_css(built.ctrl_css, top_level_class)
    // Global CSS
    final_css += built.html_css
    
    // Server JS
    final_js += built.server_js

    // Local JS
    this.push(new gutil.File({
      path: file.relative,
      contents:new Buffer(`
  ${built.window_js}
  module.exports["${file.relative.replace(/\..*$/,'')}"] = {
    is_body(){
      return ${!!(built.views[0] && built.views[0].match(/^m\('body'/))}
    },
    controller(args, name){
      if(typeof(args) === 'object')
        for(let i in args){
          this[i] = args[i]
        }
      this.children = []
      this.name = name

      ${built.ctrl_js}

      m.root = m.root || {}
      m.root[name] = this
      if(this.parent && this.parent.children){
        this.parent.children.push(this)
      }
    },
    view(ctrl){
      return ${built_views}
    }
  }
  `)      }))
    callback()
  })
  let parser = new htmlparser.Parser(handler)
  parser.write(file.contents)
  parser.done()
  return {
    css: final_css,
    js: final_js
  }
}