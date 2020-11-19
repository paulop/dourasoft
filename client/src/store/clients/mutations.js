export function setClients (state, clients) {
  if (Array.isArray(clients)) {
    state.clients = clients
  }
}

export function deleteClient (state, id) {
  const index = state.clients.findIndex(client => client.id === id)
  if (index >= 0) {
    state.clients.splice(index, 1)
  }
}

export function updateClientList (state, { client, id }) {
  if (!client) {
    return
  }
  const index = state.clients.findIndex(client => client.id === id)
  if (index >= 0) {
    state.clients.splice(index, 1, client)
  } else {
    state.clients.splice(0, 0, client)
  }
}
