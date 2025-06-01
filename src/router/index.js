import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Sucursales from '../views/Sucursales.vue';
import NewSucursal from '@/components/Sucursales/NewSucursal.vue';
import EditarSucursal from '@/components/Sucursales/EditarSucursal.vue';
import Clients from '../views/Clients.vue';
import NewCliente from '@/components/Clients/NewCliente.vue';
import EditarCliente from '@/components/Clients/EditarCliente.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/sucursales',
    name: 'Sucursales',
    component: Sucursales
    
  },
  {
    path: '/nueva-sucursal',
    name: 'NuevaSucursal',
    component: NewSucursal
    
  },
  {
    path: '/editar-sucursal/:id',
    name: 'EditarSucursal',
    component: EditarSucursal
    
  },
  {
    path: '/Clients',
    name: 'Clients',
    component: Clients
    
  },
  {
    path: '/nuevo-cliente',
    name: 'NuevoCliente',
    component: NewCliente
    
  },
   {
    path: '/editar-cliente/:id',
    name: 'EditarCliente',
    component: EditarCliente
    
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
