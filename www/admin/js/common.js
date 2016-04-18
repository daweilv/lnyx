var common = {
    login: function (user) {
            $.ajax({
                url:'/admin/login',
                type:'post',
                data:user,
                beforeSend: function () {
                    $('.alert').hide();
                    $('button.btn').attr('disabled','disabled');
                },
                success: function (rs) {
                    if(rs.status){
                        $('.alert.alert-success .msg').text(rs.msg);
                        $('.alert.alert-success').show();

                        location.href = rs.data.href;
                    }else{
                        $('.alert.alert-danger .msg').text(rs.msg);
                        $('.alert.alert-danger').show();

                    }
                },
                error: function (rs) {
                    $('.alert.alert-danger .msg').text('网络异常');
                    $('.alert.alert-danger').show();

                },
                complete: function () {
                    $('button.btn').removeAttr('disabled');
                }
            })

    },
    logout: function () {
        $.get('/admin/logout', function (rs) {
            location.href = rs.data.href;
        })
    }
};

