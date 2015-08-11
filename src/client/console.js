let types = ['error','log','info','warn']
import m from 'myth/node_modules/mithril-myth'
  
export default function(socket){

  let logs = m.prop([])

  let console_view = m.component({
    controller(){
      this.tab = m.prop('Console')
      this.logs = logs
      this.tabItem = (which)=>
        m('console-header-item',{
          class:this.tab()===which?'active':'',
          onclick:()=>{this.tab(which)}
        },which)
    },
    view(ctrl){
      return m('console',
        m('console-header',[
          ctrl.tabItem('Inspector'),
          ctrl.tabItem('Editor'),
          ctrl.tabItem('Console')
        ]),
        ctrl.tab()==='Console'
          ?m('console-inner',{
              config(el,initted){
                if(!initted){
                  el.scrollTop = el.scrollHeight
                  logs.on('change',()=>{
                    setTimeout(()=>{
                      el.scrollTop = el.scrollHeight
                    },100)
                  })
                }
              }
            },
            logs().map((log)=>{
              return m('console-item',m.trust(
                log()
                .replace(/#00A/g,'#59F')
                .replace(/#A00/g,'#F55')
                .replace(/#A50/g,'#CC0')
              ))
            })
          )
        :ctrl.tab()==='Inspector'
          ?m('console-inner','Inspector')
        :ctrl.tab()==='Editor'
          ?m('console-inner','Editor')
          :[]
      )
    }
  })

  for(let i in types){
    let original = console[types[i]]
    console[types[i]] = function(data){
      original.apply(console,arguments)
      logs.push('<s1>client:</s1> '+Array.prototype.slice.call(arguments).join(' '))
    }
  }

  socket.on('message', (msg) => {
    msg = JSON.parse(msg)
    if(msg && msg.action && msg.action === "reload-client")
      window.location.reload()
    if(msg && msg.console){
      logs.push('<s1>server:</s1> '+msg.console)
    }
  })
  
  return console_view
}