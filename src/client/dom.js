import m from 'myth/node_modules/mithril-myth'

window.socket = require('./socket') // import syntax hoists erg ...
let modules = require('./tmp_modules')
let select_view = require('./select_view')

document.addEventListener( "DOMContentLoaded", () => {

  // Preserve style
  let s = Array.prototype.slice.call(document.getElementsByTagName('style'))
    .map((i)=>i.innerHTML).join('\n')

  m.mount(document, {
    controller(){},
    view(ctrl){
      return m('html',{

        // Use m.route for href clicks by default
        onclick(e){
          let $t = e.target
          for(let i in $t.attributes){
            if($t.attributes[i].name === 'href'){
              m.route(e)
            }
          }
        }

      },[
        m('head',m('style',s)),

        // User controlled view
        select_view,

        // The console
        m.component(modules.console)

      ])
    }
  })
})