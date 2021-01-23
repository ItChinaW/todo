// import Vue from 'vue';
// import axios from "axios";
// import Cache from 'axios-request-cache'
//
// let config = {};
//
// const _axios = axios.create(config);
//
// let cache = new Cache(axios)
// cache.use({
//     expire: 30000,
//     storage: true,
//     _axios, // 如果有自定义axios实例 需要将其传入 没有则不传
//     requestConfigFn: config => {
//         // 请求拦截自定义操作
//         // 需要将config对象通过 Promise 返回 cache 中 也可以使用new Promise的写法
//         return Promise.resolve(config)
//     },
//     responseConfigFn: res => {
//         // 响应拦截的自定义操作
//         if (!res.data.code) {
//             // 需要将 res 通过 Promise 返回
//             return Promise.resolve(res)
//         }
//     }
// })
//
// Plugin.install = function (Vue) {
//     Vue.axios = _axios;
//     window.axios = _axios;
//     Object.defineProperties(Vue.prototype, {
//         axios: {
//             get() {
//                 return _axios;
//             }
//         },
//         $axios: {
//             get() {
//                 return _axios;
//             }
//         },
//     });
// };
//
// Vue.use(Plugin)
//
// export default Plugin;
