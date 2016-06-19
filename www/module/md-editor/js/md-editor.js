var mdEditor = {
    target: 'content_md',
    uploadCallback: function(rs) {
        var that = this;
        if (rs.status) {
            $('#mdUploadImgModal').modal('hide');
            that.doPicture(rs.data.file.path);
        } else {
            alert(rs.msg)
        }
    },
    autoResizeHeight: function() {

        //todo: 高度自适应
    },
    doBold: function() {
        var that = this;
        var textarea = document.getElementById(that.target);
        var selectionStart = textarea.selectionStart;
        var selectionEnd = textarea.selectionEnd;
        var reg;
        var afterText;
        var isBolded;
        if (selectionStart == selectionEnd) {
            reg = new RegExp('\\*{4}');
            isBolded = reg.test(textarea.value.slice(selectionStart - 2, selectionEnd + 2));
            if (!isBolded) {
                afterText = textarea.value.slice(0, selectionStart) + '****' + textarea.value.slice(selectionEnd);
                textarea.value = afterText;
                setCaretPosition(that.target, selectionStart + 2);
            } else {
                afterText = textarea.value.slice(0, selectionStart - 2) + textarea.value.slice(selectionEnd + 2);
                textarea.value = afterText;
                setCaretPosition(that.target, selectionStart - 2);
            }
        } else {
            var selectedText = textarea.value.slice(selectionStart, selectionEnd);
            reg = new RegExp('\\*\\*' + selectedText + '\\*\\*');
            isBolded = reg.test(textarea.value.slice(selectionStart - 2, selectionEnd + 2));
            if (!isBolded) {
                afterText = textarea.value.slice(0, selectionStart) + '**' + selectedText + '**' + textarea.value.slice(selectionEnd);
                textarea.value = afterText;
                textarea.selectionStart = selectionStart + 2;
                textarea.selectionEnd = selectionEnd + 2;
            } else {
                afterText = textarea.value.slice(0, selectionStart - 2) + selectedText + textarea.value.slice(selectionEnd + 2);
                textarea.value = afterText;
                textarea.selectionStart = selectionStart - 2;
                textarea.selectionEnd = selectionEnd - 2;
            }
            textarea.focus();
        }
    },
    doItalic: function() {
        var that = this;
        var textarea = document.getElementById(that.target);
        var selectionStart = textarea.selectionStart;
        var selectionEnd = textarea.selectionEnd;
        var reg;
        var afterText;
        var isItaliced;
        if (selectionStart == selectionEnd) {
            reg = new RegExp('_{4}');
            isItaliced = reg.test(textarea.value.slice(selectionStart - 2, selectionEnd + 2));
            if (!isItaliced) {
                afterText = textarea.value.slice(0, selectionStart) + '____' + textarea.value.slice(selectionEnd);
                textarea.value = afterText;
                setCaretPosition(that.target, selectionStart + 2);
            } else {
                afterText = textarea.value.slice(0, selectionStart - 2) + textarea.value.slice(selectionEnd + 2);
                textarea.value = afterText;
                setCaretPosition(that.target, selectionStart - 2);
            }
        } else {
            var selectedText = textarea.value.slice(selectionStart, selectionEnd);
            reg = new RegExp('__' + selectedText + '__');
            isItaliced = reg.test(textarea.value.slice(selectionStart - 2, selectionEnd + 2));
            if (!isItaliced) {
                afterText = textarea.value.slice(0, selectionStart) + '__' + selectedText + '__' + textarea.value.slice(selectionEnd);
                textarea.value = afterText;
                textarea.selectionStart = selectionStart + 2;
                textarea.selectionEnd = selectionEnd + 2;
            } else {
                afterText = textarea.value.slice(0, selectionStart - 2) + selectedText + textarea.value.slice(selectionEnd + 2);
                textarea.value = afterText;
                textarea.selectionStart = selectionStart - 2;
                textarea.selectionEnd = selectionEnd - 2;
            }
            textarea.focus();
        }
    },
    doPicture: function(imgPath) {
        var that = this;
        var textarea = document.getElementById(that.target);
        var selectionStart = textarea.selectionStart;
        var selectionEnd = textarea.selectionEnd;
        var reg;
        var afterText;
        afterText = textarea.value.slice(0, selectionStart) + '![-](' + imgPath + ')' + textarea.value.slice(selectionEnd);
        textarea.value = afterText;
        textarea.selectionStart = selectionStart + 2;
        textarea.selectionEnd = selectionEnd + 2;
        textarea.focus();



    },
    doLink: function() {

    },
    doCode: function() {

    },
    doPaperclip: function() {

    },
    doQuoteleft: function() {

    },
    doListol: function() {

    },
    doListul: function() {

    },
    doFullscreen: function() {

    },
    initEvent: function() {
        var that = this;

        $('.md-btn-bold').click(function() {
            that.doBold()
        });
        $('.md-btn-italic').click(function() {
            that.doItalic()
        });
        $('.md-btn-picture').click(function() {
            $('#mdUploadImgModal').modal('show')
        });
        $('.md-btn-link').click(function() {
            that.doLink()
        });
        $('.md-btn-code').click(function() {
            that.doCode()
        });
        $('.md-btn-paperclip').click(function() {
            that.doPaperclip()
        });
        $('.md-btn-quoteleft').click(function() {
            that.doQuoteleft()
        });
        $('.md-btn-listol').click(function() {
            that.doListol()
        });
        $('.md-btn-listul').click(function() {
            that.doListul()
        });
        $('.md-btn-fullscreen').click(function() {
            that.doFullscreen()
        });
        $('#mdUploadImg').change(function() {
            $('#mdUploadForm')[0].submit();
        });

        $('#mdUploadImgBtn').click(function () {
            $('#mdUploadImg').click()
        })
    }
};


function setCaretPosition(elemId, caretPos) {
    var el = document.getElementById(elemId);

    el.value = el.value;
    // ^ this is used to not only get "focus", but
    // to make sure we don't have it everything -selected-
    // (it causes an issue in chrome, and having it doesn't hurt any other browser)

    if (el !== null) {

        if (el.createTextRange) {
            var range = el.createTextRange();
            range.move('character', caretPos);
            range.select();
            return true;
        } else {
            // (el.selectionStart === 0 added for Firefox bug)
            if (el.selectionStart || el.selectionStart === 0) {
                el.focus();
                el.setSelectionRange(caretPos, caretPos);
                return true;
            } else { // fail city, fortunately this never happens (as far as I've tested) :)
                el.focus();
                return false;
            }
        }
    }
}


$(function() {
    mdEditor.initEvent();
});