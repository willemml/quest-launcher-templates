const http = require('http')
const fs = require('fs')
const fsPromises = fs.promises
const url = require('url')
const path = require('path')

const hostname = 'localhost'
const port = 8000

var htmlfile
var cssfile
var jsfile

function uptodate() {
  fs.readFile('./index.html', function(err, html) {
    if (err) {
      throw err
    }
    htmlfile = html
  })
  // should read css from the disk for css
  fs.readFile('./assets/css/bootstrap.min.css', function(err, html) {
    if (err) {
      throw err
    }
    cssfile = html
  })
  // should read css from the disk for css
  fs.readFile('./assets/css/style.css', function(err, html) {
    if (err) {
      throw err
    }
    cssfile += html
  })

  // should read js file from the disk
  fs.readFile('./assets/js/index.js', function(err, html) {
    if (err) {
      throw err
    }
    jsfile = html
  })
  setTimeout(function() {
    uptodate()
  }, 1000)
}
uptodate()
const server = http.createServer((req, res) => {
  res.statusCode = 200

  // should send css and js
  if (req.url.indexOf('.css') != -1) { //req.url has the pathname, check if it conatins '.js'
    res.writeHead(200, {
      'Content-Type': 'text/css'
    })
    res.write(cssfile)
    res.end()
    return
  }
  if (req.url.indexOf('.js') != -1) { //req.url has the pathname, check if it conatins '.js'
    res.writeHead(200, {
      'Content-Type': 'text/javascript'
    })
    res.write(jsfile)
    res.end()
    return
  }
  // should send html file via request
  res.writeHeader(200, {
    "Content-Type": "text/html"
  });
  res.write(htmlfile)
  res.end()
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
