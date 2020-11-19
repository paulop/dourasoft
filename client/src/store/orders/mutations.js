export function setOrders (state, orders) {
  if (Array.isArray(orders)) {
    state.orders = orders
  }
}

export function deleteOrder (state, id) {
  const index = state.orders.findIndex(order => order.id === id)
  if (index >= 0) {
    state.orders.splice(index, 1)
  }
}

export function updateOrderList (state, { order, id }) {
  if (!order) {
    return
  }
  const index = state.orders.findIndex(order => order.id === id)
  if (index >= 0) {
    state.orders.splice(index, 1, order)
  } else {
    state.orders.splice(0, 0, order)
  }
}
