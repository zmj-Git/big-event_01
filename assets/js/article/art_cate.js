$(function () {
    //1.初始化文章分类
    initArtCateList();
    function initArtCateList() {
        $.ajax({
            method: "GET",
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                //模板引擎  传对象  用属性
                var str = template("tpl-art-cate", res)
                $("tbody").html(str);
            }
        });
    }
    //2.显示添加文章类别列表

    var indexAdd = null;
    $("#btnAddcate").on("click", function () {
        indexAdd = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '250px'],
            content: $("#dialog-add").html(),
        })
    })
    //因为 当点击了添加按钮  才会生成弹出框 所以不能直接给form添加submit事件
    //3.所以通过代理的形式  为form-add 表单添加绑定 submit 事件
    var layer = layui.layer;
    $('body').on("submit", '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                initArtCateList();
                layui.layer.msg("恭喜您，文章类别添加成功")
                layer.close(indexAdd);
            }
        });
    })
    //4.修改 -展示表单
    var indexEdit = null;
    var form = layui.form;
    $("tbody").on("click", ".btn-edit", function () {
        indexEdit = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '250px'],
            content: $("#dialog-edit").html(),
        })
        // 4.2获取Id，发送ajax获取数据，渲染到页面
        var Id = $(this).attr("data-id");
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + Id,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                form.val("form-edit", res.data);
            }
        })
    })
    //4.修改 -提交
    $('body').on("submit", '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                initArtCateList();
                layer.msg("恭喜您，文章类别更新成功")
                layer.close(indexEdit);
            }
        });
    })
    //5.删除
    $("tbody").on("click", ".btn-delete", function () {
        var Id = $(this).attr("data-id");
        layer.confirm('是否确认删除', { icon: 3, title: '提示' },
            function (index) {
                $.ajax({
                    method: 'GET',
                    url: '/my/article/deletecate/' + Id,
                    success: function (res) {
                        if (res.status !== 0) {
                            return layer.msg(res.message)
                        }
                        initArtCateList();
                        layer.msg("恭喜您，文章类别删除成功")
                        layer.close(index);
                    }
                })
            })
    })

})