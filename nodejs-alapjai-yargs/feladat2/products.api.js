const { readFileSync } = require('fs')

const ProductsApi = (path, prop) => ({
    get() {
        const dataString = readFileSync(path)
        return JSON.parse(dataString)[prop]
    }
})

module.exports = ProductsApi