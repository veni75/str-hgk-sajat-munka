const http = require('http')
const SiteRouter = require('./routers/site.router')

const port = 8080

const logger = (url, method) => {
  if (url) {
    let now = new Date()
    console.log(`Date: ${now.toLocaleDateString('hu')}, Url: ${url}, Method: ${method}`)
  }
}

http.createServer((req, res) => {
  logger(req.url,req.method)
  
  SiteRouter[req.url]
    ? SiteRouter[req.url](res)
    : SiteRouter['/404'](res)
}).listen(port)

console.log(`Server is running at http://127.0.0.1:${port}`)