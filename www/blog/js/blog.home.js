/**
 * Created by lvdw on 16/1/28.
 */
if(typeof blog == 'undefined' || !blog) blog = {};

blog.home = {
    initEvents: function () {
        $("#blog_btn").addClass('animated tada');
    }
};

$(function () {
    blog.home.initEvents();
});