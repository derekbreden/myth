import http from 'http'
import fs from 'fs'

let http_server = http.createServer()
http_server.on('request',(req,res) => {
  res.setHeader('Content-type','text/html')
  res.end(`<!doctype html>
    <head>
      <style>${fs.readFileSync('./build/client/index.css')}</style>
      <script>${fs.readFileSync('./build/client/index.js')}</script>
    </head>`)
})

export default http_server