var o = {
    save: function() {
        var htmlContent = marked($('#content_md').val());
        $('#content').val(htmlContent);
        $('#brief').val($(htmlContent).text().substring(0, 150));
        $.ajax({
            url: '/admin/article',
            type: 'post',
            data: {
                _model: $('#dataForm').serialize()
            },
            success: function(rs) {
                $('.alert').hide();
                if (rs.status) {
                    $('.alert.alert-success').show().text('保存成功！');
                    location.href = '/admin/articles/';
                } else {
                    console.log(rs.error);
                    $('.alert.alert-danger').show().text(rs.error.toString());
                }
            },
            error: function(err) {
                $('.alert').hide();
                $('.alert.alert-warning').show().text('网络异常！');
            }
        })
    },
    uploadCallback: function(rs) {
        if (rs.status) {
            $('.upload-operate').addClass('hidden');
            $('.upload-img').removeClass('hidden').attr('src', rs.data.file.path)
            $('#cover').val(rs.data.file.path)
        } else {
            alert(rs.msg)
        }

    },
    initUploadImg: function() {
        $('.upload-operate').click(function() {
            $('.upload-file').click();
        });

        $('.upload-img').click(function() {
            $('.upload-file').click();
        });

        $('.upload-file').change(function() {
            $('#imgForm')[0].submit()
        })

        if (data.cover) {
            $('.upload-operate').addClass('hidden');
            $('.upload-img').removeClass('hidden').attr('src', data.cover)
        }
    },
    showMDPreview: function() {
        var mk = $('#content_md').val();
        $('.md-content').html(marked(mk))
    },
    showMDPreviewEvent: function() {
        var that = this;
        $('a[href="#md-preview"]').on('shown.bs.tab', function(e) {
            that.showMDPreview();
        })
    },
    init: function() {
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
                        if (data[key] == 1 || data[key] == true) {
                            $key.prop('checked', true)
                        }
                    }
                } else if (tagName == 'SELECT') {
                    $key.val(data[key])
                } else if (tagName == 'TEXTAREA') {
                    $key.html(data[key]);
                }
            }
        }
        this.initUploadImg();
        this.showMDPreviewEvent();
    }
};

$(function() {
    o.init();
})