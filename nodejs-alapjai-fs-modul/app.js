
//fs 1. feladat
const createStarterTemplate = require('./utils')
const folders = ['controllers', 'routers', 'views']

const files = [
  './controllers/site.controller.js',
  './routers/site.router.js',
  './views/index.html',
  './app.js'
]
createStarterTemplate(folders,files) 

//fs 2.feladat
const { copyFileWrapper, unlinkWrapper } = require('./utils2')

const path = require('path')
const { createReadStream, createWriteStream } = require('fs')
const { createGzip } = require('zlib')
const filePath = './app.js'
const copyPath = path.join(__dirname, './app.bak')

copyFileWrapper({
    src: filePath,
    dest: copyPath
})
const createCompressedFile = createWriteStream('./app.bak.gz')
const readableStream = createReadStream('./app.bak', {
    encoding: 'utf8',
    highWaterMark: 1024
})
readableStream
    .pipe(createGzip())
    .pipe(createCompressedFile)

unlinkWrapper(filePath)
unlinkWrapper(copyPath) 
