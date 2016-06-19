var o = {
    save: function () {
        $.ajax({
            url: '/admin/user',
            type: 'post',
            data: {_model: $('#dataForm').serialize()},
            success: function (rs) {
                $('.alert').hide();
                if (rs.status) {
                    $('.alert.alert-success').show().text('保存成功！');
                    location.href = '/admin/users/';
                } else {
                    console.log(rs.error);
                    $('.alert.alert-danger').show().text(rs.error.toString());
                }
            },
            error: function (err) {
                $('.alert').hide();
                $('.alert.alert-warning').show().text('网络异常！');
            }
        })

    },
    init: function () {
        for (var key in data) {
            var $key = $('form [name=' + key + ']');
            if ($key.length) {
                var tagName = $key.get(0).tagName;
                var type = $key.attr('type');
                if (tagName == 'INPUT') {
                    if (type == 'text' || type == 'password' || type == 'hidden') {
                        $key.val(data[key])
                    }
                } else if (tagName == 'SELECT') {
                    $key.val(data[key])
                }
            }
        }
    }
};

$(function () {
    o.init();
})


