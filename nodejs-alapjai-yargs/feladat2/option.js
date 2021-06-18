const Option = ({ alias, describe, type , demandOption = true } = {}) => ({
    alias, describe, type, demandOption
  })
  
  
  const count = Option({
    alias: 'c',
    describe: 'Product count',
    type: 'number'
  })
  
  module.exports = Object.freeze({
    count
  })