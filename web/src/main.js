import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store/index'

// 导入element
import '@/plugins/element'

// rem适配导入
import "@/plugins/flexible"

// 路由拦截
import "@/permission"

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
