const path = require('path')
const config = {
    dbFilePath: path.join(__dirname, './database/products.json'),
    propName: 'products'
  }
  
  module.exports = Object.freeze(config)