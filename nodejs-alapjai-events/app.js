const Logger = require('./Logger')
const logger = new Logger()
const { createReadStream, createWriteStream } = require('fs')
const readableStream = createReadStream('./szamar.txt', {
    encoding: 'utf8',
    highWaterMark: 1024
})

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1)

readableStream.on('data', (chunck) => {
    const result = chunck.split(' ')
        .map(item => capitalize(item))
        .join(' ')
})

const writeableStream = createWriteStream('./szamarCopy.txt')
readableStream.pipe(writeableStream)
