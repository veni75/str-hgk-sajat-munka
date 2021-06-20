const { readFile, writeFile } = require('fs').promises

const MoviesApi = (path, prop) => ({
     get() {
        const dataString = readFile(path)
        const data = JSON.parse(dataString)[prop]
        return data
    },

     save(data) {
        writeFile(path, JSON.stringify({ [prop]: data }))
    }
})

module.exports = MoviesApi