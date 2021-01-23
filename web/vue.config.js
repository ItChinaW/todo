module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    devServer: {
        open: true,
        host: 'localhost',
        port: 8080,
        //以上的ip和端口是我们本机的;下面为需要跨域的
        proxy: {//配置跨域
            '/v1': {
                target: 'http://localhost:3333/',
                changOrigin: true,//允许跨域
                pathRewrite: {
                    '^/v1': ''
                }
            }
        }
    }
}
