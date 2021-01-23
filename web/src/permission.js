import router from "./router"
import store from "@/store";

router.beforeEach((to, from, next) => {
    const user = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    const whileList = ['/login', '/register']
    if (user && token && store.state.statusCode) {
        if (whileList.indexOf(to.path) !== -1) {
            next("/")
        } else
            next()
    } else {
        localStorage.clear()
        if (whileList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`/login?redirect=${to.path}`)
        }
    }

})
