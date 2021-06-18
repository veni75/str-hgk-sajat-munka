const Logger = require('./Logger')
const logger = new Logger()
const { createReadStream, createWriteStream } = require('fs')
const { Transform } = require('stream');

class TitleCaseStream extends Transform {
    constructor() {
        super();
    }


    _transform(chunk, enc, done) {
        const output = chunk.toString('utf8').split(' ')
            .map(word => {
                return `${word[0].toUpperCase()}${word.slice(1)}`;
            })
            .join(' ');
        this.push(output);
        done();
    };
}
const readableStream = createReadStream('./szamar.txt', {
    encoding: 'utf8',
    highWaterMark: 1024
})

/* const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1)

readableStream.on('data', (chunck) => {
    const result = chunck.split(' ')
        .map(item => capitalize(item))
        .join(' ')
}) */

const writeableStream = createWriteStream('./szamarCopy.txt')
readableStream.pipe(writeableStream)

writeableStream.on('finish', () => {
    //console.log('File transform successful.');
    logger.success('File transform successful')
});

try {
    readableStream.pipe(new TitleCaseStream()).pipe(writeableStream);
} catch (err) {
    logger.error(err)
}