
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('components/ListPedidos.vue') }
    ]
  },
  {
    path: '/pedidos',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('components/ListPedidos.vue') }
    ]
  },
  {
    path: '/pedidos/new',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('components/OrderComponent.vue') }
    ]
  },
  {
    path: '/pedidos/edit',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('components/EditOrderComponent.vue') }
    ]
  },
  {
    path: '/produtos',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('components/ProductComponent.vue') }
    ]
  },
  {
    path: '/clientes',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('components/ClientComponent.vue') }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
