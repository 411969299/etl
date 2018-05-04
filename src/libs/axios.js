import axios from 'axios'

//if(process.env.NODE_ENV && process.env.NODE_ENV == 'production'){
//    //axios.defaults.baseURL = 'http://172.31.30.34:8081/personas/';  //打包
//}else{
//    //axios.defaults.baseURL = 'http://172.31.30.34:8081/personas/'; //测试  13512344321
//}
//console.log(process)
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
//axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';
//axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

// 添加一个请求拦截器
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    //console.log(config)
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// 添加一个响应拦截器

axios.interceptors.response.use(function (response) {
    // Do something with response data  403 未登录
    //if(response.data.code !== 0){
    //
    //  if(response.data.code == 403){  // 放过403  有可能是坑
    //    return response.data;
    //  }else{
    //    console.log(response.data)
    //  }
    //}else{
    //  return response.data;
    //}
    return response.data;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

export default axios

