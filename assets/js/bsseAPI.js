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
    if (params.url.indexOf("/my/") !== -1) {
        params.headers = {
            Authorization: localStorage.getItem("token") || ""
        }
    }

    //3.拦截所有的响应，判断身份认证信息
    params.complete = function (res) {
        console.log(res)
        console.log(res.responseJSON)
        var obj = res.responseJSON;
        if (obj.status == 1 && obj.message == '身份认证失败！') {
            //1.清空本地token
            localStorage.removeItem("token");
            location.href = "/login.html"
        }
    }
});