import axios from 'axios'

import {MessageBox} from 'element-ui'
import { Message } from 'element-ui';

import qs from 'qs'
import store from "@/store";

// 创建axios实例
const service = axios.create({
    validateStatus(status) {
        return status >= 200 && status < 504 // 设置默认的合法的状态
    },
    baseURL: process.env.BASE_API, // api 的 base_url
    timeout: 15000, // 请求超时时间
})
service.defaults.retry = 3 // 请求重试次数
service.defaults.retryDelay = 1000 // 请求重试时间间隔
service.defaults.shouldRetry = true // 是否重试

// request拦截器
service.interceptors.request.use(
    config => {
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        config.headers['Accept-Language'] = 'zh-CN'
        config.headers['Authorization'] = 'Bearer ' + localStorage.getItem("token")
        config.headers['id'] = localStorage.getItem('id')
        if (config.method === 'post' || config.method === 'put') {
            if (!config.data) { // 没有参数时，config.data为null，需要转下类型
                config.data = {}
            }
            config.data = qs.stringify(config.data) // qs序列化参数
        }
        return config
    },
    error => {
        Promise.reject(error)
    }
)

// response 拦截器
service.interceptors.response.use(
    response => {
        const token = localStorage.getItem("token")
        const user = localStorage.getItem("user")

        if (response.status !== 200) {
            if (response.status === 402) {
                localStorage.clear()
                store.commit("setUser", "")
                store.commit('setToken', "")
                store.commit("setStatus", false)
            }
            Message({
                message: response.data.error
            });
            return Promise.reject(response.data)
        } else {
            store.commit("setUser", user)
            store.commit('setToken', token)
            store.commit("setStatus", true)
            return response
        }
    },
    err => {
        var config = err.config
        MessageBox.confirm('程序开小差啦，请点击重试按钮更新信息~', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            // 重试次数自增
            config.__retryCount += 1
            // 延时处理
            var backoff = new Promise(function (resolve) {
                resolve()
            })
            // 重新发起axios请求
            return backoff.then(function () {
                return service(config)
            })
        }).catch(() => {
            return Promise.reject(err)
        })
    }
)

export default service

