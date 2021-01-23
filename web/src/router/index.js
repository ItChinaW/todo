import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'index',
        component: Index,
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>import('../views/Login'),
    },
    {
        path: '/register',
        name: 'Register',
        component: () =>import('../views/Register'),
    }
]

const router = new VueRouter({
    routes,
})

export default router
