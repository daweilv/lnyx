var o = {
    save: function () {
        var id = $('#id').val();
        if (!id || id == '') {
            id = 0
        }
        $.ajax({
            url: '/admin/user',
            type: 'post',
            data: {data: $('form').serialize()},
            success: function (rs) {
                console.log(rs)
            },
            error: function (err) {
                console.log(err)
            },
            complete: function (e) {
                console.log(e)
            }
        })

    },
    init: function () {
        for (var key in data) {
            var $key = $('[name=' + key + ']');
            if ($key.length) {
                var tagName = $key.get(0).tagName
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


