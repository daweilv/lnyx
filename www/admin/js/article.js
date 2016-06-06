var o = {
    save: function () {
        $('#brief').val(ue.getContentTxt().substring(0,150));
        $.ajax({
            url: '/admin/article',
            type: 'post',
            data: {
                _model: $('form').serialize()
            },
            success: function (rs) {
                $('.alert').hide();
                if (rs.status) {
                    $('.alert.alert-success').show().text('保存成功！');
                    location.href = '/admin/articles/';
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
    uploadCallback: function (rs) {
        console.log(rs);
        if(rs.status){
            $('.upload-operate').addClass('hidden');
            $('.upload-img').removeClass('hidden').attr('src',rs.data.imgPath)
            $('#cover').val(rs.data.imgPath)
        }else{
            alert(rs.msg)
        }

    },
    initUploadImg: function () {
        $('.upload-operate').click(function () {
            $('.upload-file').click();
        });

        $('.upload-img').click(function () {
            $('.upload-file').click();
        });

        $('.upload-file').change(function () {
            $('#imgForm')[0].submit()
        })

        if(data.cover){
            $('.upload-operate').addClass('hidden');
            $('.upload-img').removeClass('hidden').attr('src',data.cover)
        }
    },
    init: function () {
        for (var key in data) {
            var $key = $('#dataForm [name=' + key + ']');
            if ($key.length) {
                var tagName = $key.get(0).tagName;
                var type = $key.attr('type');
                if (tagName == 'INPUT') {
                    if (type == 'text' || type == 'password' || type == 'hidden') {
                        $key.val(data[key])
                    }
                    if (type == 'checkbox') {
                        if(data[key] == 1 || data[key] == true){
                            $key.prop('checked',true)
                        }
                    }
                } else if (tagName == 'SELECT') {
                    $key.val(data[key])
                }
            }
        }

        this.initUploadImg()
    }
};

$(function () {
    o.init();
})


