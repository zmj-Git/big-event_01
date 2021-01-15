$(function () {
    //1.点击注册账号，隐藏登录区域，显示注册区域
    $("#link_reg").on("click", function () {
        $(".login-box").hide();
        $(".reg-box").show();
    })
    //2.点击去登录，显示登录区域
    $("#link_login").on("click", function () {
        $(".login-box").show();
        $(".reg-box").hide();
    })
    // 3.自定义验证规则
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,16}$/,
            "密码必须是6-16位，且不能输入空格"
        ],
        repwd: function (value) {
            var pwd = $(".reg-box [name=password]").val();
            if (value !== pwd) {
                return "两次密码输入不一致";
            }
        }
    });
    // 4.注册功能
    var layer = layui.layer;
    $("#form_reg").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $(".reg-box [name=username]").val(),
                password: $(".reg-box [name=password]").val(),
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg("注册成功！");
                //条转到登录
                $("#link_login").click();
                //重置form
                $("#form_reg")[0].reset();
            }
        })
    })
    //5.登录功能
    $("#form_login").submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: '/api/login',
            data: $(this).serialize(),
            //校验返回状态
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                //提示信息，保存token，跳转页面
                layer.msg("恭喜您，登录成功");
                //保存token，未来接口要使用token
                localStorage.setItem("token", res.token);
                //跳转
                location.href = "/index.html"
            }
        })
    })
})