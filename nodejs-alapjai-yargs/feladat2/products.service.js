const ProductsService = (productsApi) => {
  let products = productsApi.get()

  const sum = () => {
    let productPrice = products.map(item => item.price * item.count)
    return productPrice.reduce((acc, current) => acc + current)
  }

  const avg = () => {
    const priceAll= products.reduce((acc, current) => acc + current.price,0)
    return priceAll/products.length
  }

  const lessthan = (param) => {
    return products.filter(item => item.count < param)
  }

  return {
    sum,
    avg,
    lessthan
  }
}

module.exports = ProductsService