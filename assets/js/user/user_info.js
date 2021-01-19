$(function () {
    var form = layui.form
    //1.定义昵称校验规则
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称长度为1-6之间"
            }

        }
    });
    //2.获取和渲染用户信息
    initUserInfo();
    //导出layer
    var layer = layui.layer
    function initUserInfo() {
        $.ajax({
            method: "GET",
            url: '/my/userinfo',
            success: function (res) {
                // console.log(res)
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                form.val('formUserInfo', res.data);
            }
        })
    }
    // 3重置：给form表单绑定reset事件，给按钮绑点击事件
    $("#btnRest").on("click", function (e) {
        //阻止重置
        e.preventDefault();
        //从新用户渲染
        initUserInfo();
    })
    //4.修改用户信息
    $('.layui-form').on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                layer.msg("恭喜你，用户信息修改成功")
                window.parent.getUserInfo();
            }
        })
    })
})