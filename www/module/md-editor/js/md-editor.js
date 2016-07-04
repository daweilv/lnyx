var mdEditor = {
    target: 'content_md',
    uploadCallback: function (rs) {
        var that = this;
        if (rs.status) {
            if (rs.data.type == '1') {
                that.doPicture(rs.data.file.path);
            } else {
                that.doAttachment(rs.data.file.path);
            }
            $('#mdUploadModal').modal('hide');
        } else {
            alert(rs.msg)
        }
    },
    autoResizeHeight: function () {

        //todo: 高度自适应
    },
    doBold: function () {
        var that = this;
        var textarea = document.getElementById(that.target);
        var selectionStart = textarea.selectionStart;
        var selectionEnd = textarea.selectionEnd;
        var afterText;
        var bolded;
        if (selectionStart == selectionEnd) {
            bolded = textarea.value.slice(selectionStart - 2, selectionEnd + 2) == '****';
            if (!bolded) {
                afterText = textarea.value.slice(0, selectionStart) + '****' + textarea.value.slice(selectionEnd);
                textarea.value = afterText;
                textarea.setSelectionRange(selectionStart + 2, selectionStart + 2);
            } else {
                afterText = textarea.value.slice(0, selectionStart - 2) + textarea.value.slice(selectionEnd + 2);
                textarea.value = afterText;
                textarea.setSelectionRange(selectionStart - 2, selectionStart - 2);
            }
        } else {
            var selectedText = textarea.value.slice(selectionStart, selectionEnd);
            var prefix = textarea.value.slice(selectionStart - 2, selectionStart);
            var suffix = textarea.value.slice(selectionEnd, selectionEnd + 2);
            bolded = prefix == '**' && suffix == '**';
            if (!bolded) {
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
        }
        textarea.focus();
    },
    doItalic: function () {
        var that = this;
        var textarea = document.getElementById(that.target);
        var selectionStart = textarea.selectionStart;
        var selectionEnd = textarea.selectionEnd;
        var afterText;
        var italiced;
        if (selectionStart == selectionEnd) {
            italiced = textarea.value.slice(selectionStart - 2, selectionEnd + 2) == '____';
            if (!italiced) {
                afterText = textarea.value.slice(0, selectionStart) + '____' + textarea.value.slice(selectionEnd);
                textarea.value = afterText;
                textarea.setSelectionRange(selectionStart + 2, selectionStart + 2);
            } else {
                afterText = textarea.value.slice(0, selectionStart - 2) + textarea.value.slice(selectionEnd + 2);
                textarea.value = afterText;
                textarea.setSelectionRange(selectionStart - 2, selectionStart - 2);
            }
        } else {
            var selectedText = textarea.value.slice(selectionStart, selectionEnd);
            var prefix = textarea.value.slice(selectionStart - 2, selectionStart);
            var suffix = textarea.value.slice(selectionEnd, selectionEnd + 2);
            italiced = prefix == '__' && suffix == '__';
            if (!italiced) {
                afterText = textarea.value.slice(0, selectionStart) + '__' + selectedText + '__' + textarea.value.slice(selectionEnd);
                textarea.value = afterText;
                textarea.setSelectionRange(selectionStart + 2, selectionEnd + 2);
            } else {
                afterText = textarea.value.slice(0, selectionStart - 2) + selectedText + textarea.value.slice(selectionEnd + 2);
                textarea.value = afterText;
                textarea.setSelectionRange(selectionStart - 2, selectionEnd - 2);
            }
        }
        textarea.focus();
    },
    doPicture: function (filePath) {
        var that = this;
        var textarea = document.getElementById(that.target);
        var selectionStart = textarea.selectionStart;
        var selectionEnd = textarea.selectionEnd;
        var afterText;
        afterText = textarea.value.slice(0, selectionStart) + '![-](' + filePath + ')' + textarea.value.slice(selectionEnd);
        textarea.value = afterText;
        textarea.setSelectionRange(selectionStart + 2, selectionEnd + 2);
        textarea.focus();
    },
    doLink: function () {
        var that = this;
        var textarea = document.getElementById(that.target);
        var selectionStart = textarea.selectionStart;
        var selectionEnd = textarea.selectionEnd;
        var afterText;
        var selectedText = textarea.value.slice(selectionStart, selectionEnd);
        afterText = textarea.value.slice(0, selectionStart) + '[' + selectedText + '](url)' + textarea.value.slice(selectionEnd);
        textarea.value = afterText;
        textarea.setSelectionRange(selectionStart + selectedText.length + 3, selectionEnd + 6)
        textarea.focus();
    },
    doCode: function () {
        var that = this;
        var textarea = document.getElementById(that.target);
        var selectionStart = textarea.selectionStart;
        var selectionEnd = textarea.selectionEnd;
        var afterText;
        var selectedText = textarea.value.slice(selectionStart, selectionEnd);
        var beginLineBreakLength = selectedText.length - selectedText.replace(/^\n*/g, '').length;
        var endLineBreakLength = selectedText.length - selectedText.replace(/\n*$/g, '').length;
        selectedText = selectedText.replace(/^\n*|\n*$/g, '');
        var multiline = selectedText.indexOf('\n') != -1;
        if (multiline) {
            afterText = textarea.value.slice(0, selectionStart + beginLineBreakLength) + '\n```\n' + selectedText + '\n```\n' + textarea.value.slice(selectionEnd - endLineBreakLength);
            textarea.value = afterText;
            textarea.setSelectionRange(selectionStart + beginLineBreakLength + 5, selectionEnd - endLineBreakLength + 5)
        } else {
            afterText = textarea.value.slice(0, selectionStart) + '`' + selectedText + '`' + textarea.value.slice(selectionEnd);
            textarea.value = afterText;
            textarea.setSelectionRange(selectionStart + 1, selectionEnd + 1);
        }
        textarea.focus();
    },
    doAttachment: function (filePath) {
        var that = this;
        var textarea = document.getElementById(that.target);
        var selectionStart = textarea.selectionStart;
        var selectionEnd = textarea.selectionEnd;
        var afterText;
        afterText = textarea.value.slice(0, selectionStart) + '[-](' + filePath + ')' + textarea.value.slice(selectionEnd);
        textarea.value = afterText;
        textarea.setSelectionRange(selectionStart + 2, selectionEnd + 2);
        textarea.focus();
    },
    doQuoteleft: function () {
        var that = this;
        var textarea = document.getElementById(that.target);
        var selectionStart = textarea.selectionStart;
        var selectionEnd = textarea.selectionEnd;
        var afterText;
        var selectedText = textarea.value.slice(selectionStart, selectionEnd);
        var multiline = selectedText.indexOf('\n') != -1;
        if (multiline) {
            var i = 0;
            afterText = selectedText.split('\n').map(function (partText) {
                    i++;
                    return '\n> ' + partText;
                }).toString() + '\n';
            textarea.value = textarea.value.slice(0, selectionStart) + afterText + textarea.value.slice(selectionEnd);
            textarea.setSelectionRange(selectionStart + 1, selectionEnd + 3 * i);
        } else {
            afterText = '\n> ' + selectedText + '\n';
            textarea.value = textarea.value.slice(0, selectionStart) + afterText + textarea.value.slice(selectionEnd);
            textarea.setSelectionRange(selectionStart + 3, selectionEnd + 3);
        }

        textarea.focus();
    },
    doListol: function () {

    },
    doListul: function () {

    },
    doListalt: function () {

    },
    doFullscreen: function () {

    },
    initEvent: function () {
        var that = this;

        $('.md-btn-bold').click(function () {
            that.doBold()
        });
        $('.md-btn-italic').click(function () {
            that.doItalic()
        });
        $('.md-btn-picture').click(function () {
            $('#mdUploadModal').modal('show')
        });
        $('.md-btn-link').click(function () {
            that.doLink()
        });
        $('.md-btn-code').click(function () {
            that.doCode()
        });
        $('.md-btn-paperclip').click(function () {
            $('#mdUploadModal').modal('show')
        });
        $('.md-btn-quoteleft').click(function () {
            that.doQuoteleft()
        });
        $('.md-btn-listol').click(function () {
            that.doListol()
        });
        $('.md-btn-listul').click(function () {
            that.doListul()
        });
        $('.md-btn-listalt').click(function () {
            that.doListalt()
        });
        $('.md-btn-fullscreen').click(function () {
            that.doFullscreen()
        });
        $('#mdUploadFile').change(function () {
            $('#mdUploadForm')[0].submit();
        });
        $('#mdUploadBtn').click(function () {
            $('#mdUploadFile').click();
        });
        $('.data-tooltip').tooltip();
    }
};

$(function () {
    mdEditor.initEvent();
});