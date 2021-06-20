const ProductsService = (productsApi) => {
  
  const sum = async () => {
    const productsList = await productsApi.get()
    let productPrice = productsList.map(item => item.price * item.count)
    return productPrice.reduce((acc, current) => acc + current)
  }

  const avg = async () => {
    const productsList = await productsApi.get()
    const priceAll = productsList.reduce((acc, current) => acc + current.price, 0)
    return priceAll / productsList.length
  }

  const lessthan = async (param) => {
    const productsList = await productsApi.get()
    return productsList.filter(item => item.count < param)
  }

  return {
    sum,
    avg,
    lessthan
  }
}

module.exports = ProductsService