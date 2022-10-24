
const routes = [
  { path: '/', component: () => import('pages/Login.vue') },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/products', component: () => import('src/pages/Products.vue') },
      { path: '/customers', component: () => import('src/pages/Customers.vue') },
      { path: '/orders', component: () => import('src/pages/Orders.vue') },
      { path: '/detail', component: () => import('src/pages/Detail.vue') },
      { path: '/test', component: () => import('src/pages/Test.vue') }, 
      
    ]
    
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
