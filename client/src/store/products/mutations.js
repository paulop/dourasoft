export function setProducts (state, products) {
  if (Array.isArray(products)) {
    state.products = products
  }
}

export function deleteProduct (state, id) {
  const index = state.products.findIndex(product => product.id === id)
  if (index >= 0) {
    state.products.splice(index, 1)
  }
}

export function updateProductList (state, { product, id }) {
  if (!product) {
    return
  }
  const index = state.products.findIndex(product => product.id === id)
  if (index >= 0) {
    state.products.splice(index, 1, product)
  } else {
    state.products.splice(0, 0, product)
  }
}
