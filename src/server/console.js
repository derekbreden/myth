import Convert from 'myth/node_modules/ansi-to-html'

let convert = new Convert()
let types = ['error','log','info','warn']
let last_10_console = []
let pending_action = false

export default function(socket_server){

  // Capture sockets from server
  let sockets = {}
  socket_server.on('connection', (socket) => {
    for(let i in last_10_console)
      socket.send(last_10_console[i])
    sockets[socket.id] = socket
    socket.on('close',()=>{
      delete sockets[socket.id]
    })
    if(pending_action){
      process_msg(pending_action)
      pending_action = false
    }
  })

  // Pass messages through those sockets
  let process_msg = (msg)=>{
    if(msg.action){
      if(Object.keys(sockets).length === 0){
        pending_action = msg
      }
      for(let i in sockets){
        sockets[i].send(JSON.stringify(msg))
      }
    }
    if(msg.console){
      let str = (typeof msg.console === 'string')
        ?convert.toHtml(msg.console)
        :JSON.stringify(msg.console)
      let final_str = JSON.stringify({"console":str})
      for(let i in sockets)
        sockets[i].send(final_str)
      last_10_console.push(final_str)
      if(last_10_console.length>10) last_10_console.unshift()
    }
  }

  // Capture messages from gulp
  process.on('message', process_msg)

  // Capture console messages from self
  for(let i in types){
    let original = console[types[i]]
    console[types[i]] = function(data){
      original.apply(console,arguments)
      process_msg({"console":data})
    }  
  }
}