import axios from "axios";
// import NProgress  from 'nprogress'
// import 'nprogress/nprogress.css'
// 创建一个axios的app
let baseURL = 'http://120.77.238.45:6008/qs_vito/'
if(process.env.NODE_ENV == "development") {
    // baseURL = 'http://172.16.10.7:9873/ps/'
    baseURL = 'http://106.14.171.72:6008/qs/'
}

const request = axios.create({
    // baseURL:'http://106.14.171.72:6008/ps/',
    baseURL: baseURL,
})


// // 请求拦截器
// request.interceptors.request.use(
//     // ts写法 config:any
//     (config)=>{
//         NProgress.start()
//         return config

//     },
//     (error)=>{
//         Promise.reject(error)

//     }
// )

// // 响应拦截器
// request.interceptors.response.use(
//     config=>{
//         NProgress.done
//         return config
//     }
// )



// 暴露 
export default request
