const yargs = require('yargs')
const { count } = require('./option')
const ProductsApi = require('./products.api')
const ProductsService = require('./products.service')
const { dbFilePath, propName } = require('./config')

const productsApi = ProductsApi(dbFilePath, propName)
const {
  sum,
  avg,
  lessthan
} = ProductsService(productsApi)

yargs
  .version('1.0.0')
  .usage('Usage: <command> [options]')
  .command({
    command: 'sum',
    describe: 'Get all Products price',
    handler: async () => console.log(await sum())
  })
  .command({
    command: 'avg',
    describe: 'Average price',    
    handler: async () => console.log(await avg())
  })
  .command({
    command: 'lessthan',
    describe: 'Products less than parameter',
    builder: { count },
    handler: async (args) => {
      console.log(await lessthan(args.count))
    }
  })
  
  .locale('en')
  .strict()
  .help()
  .parse() 