import engine from 'myth/node_modules/engine.io'
import http_server from './http_server'
import console_to_socket_server from './console'

let socket_server = engine.attach(http_server)
console_to_socket_server(socket_server)
http_server.listen('3000')
console.log('http://127.0.0.1:3000/')