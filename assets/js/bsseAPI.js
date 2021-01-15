//1.开发环境服务器地址
var baseURL = "http://api-breakingnews-web.itheima.net"
// //1.测试环境服务器地址
// var baseURL = "http://api-breakingnews-web.itheima.net"
// //1.生产环境服务器地址
// var baseURL = "http://api-breakingnews-web.itheima.net"

//拦截所有ajax请求：get/post/ajsx/
$.ajaxPrefilter(function (params) {
    //拼接服务器地址
    params.url = baseURL + params.url;
})