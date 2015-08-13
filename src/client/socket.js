import eio from 'myth/node_modules/engine.io-client'
let socket = new eio.Socket('ws://'+window.location.hostname+':'+window.location.port+'/')
socket.on('open', () => {
  if(!socket.opened){
    socket.opened = true
    socket.on('close', () => {
      setTimeout(()=>socket.open(), 1000)
    })
  }
})

export default socket