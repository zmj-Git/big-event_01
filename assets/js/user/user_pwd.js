$(function () {
    var form = layui.form;
    form.verify({
        //1.密码
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6-12位，且不能出现空格'
        ],
        // 2.新旧不充复
        samePwd: function (value) {
            if (value == $("[name=oldPwd]").val()) {
                return "原密码不能喝新密码相同！";
            }
        },
        rePwd: function (value) {
            if (value !== $("[name=newPwd]").val()) {
                return "两次输入不能不同！";
            }
        },
    })
    //2.表单提交
    $(".layui-form").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            method: "post",
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.staus !== 0) {
                    return layui.layer.msg(res.message);
                }
                layui.layer.msg("修改密码成功！");
                $(".layui-form")[0].reset()
            }

        })
    })
})