var DBInstance = require('../../common/db/DBInstance');

var ArticleController = {

    queryBySeoURL : function (seo_url ,callback) {
        DBInstance.query('select * from f_article where is_publish = 1 and delete_by is null and seo_url = ?', seo_url, function (err, rows) {
            callback(err, rows);
        });
    },

    queryAll: function (callback) {
        DBInstance.query('select a.id, a.article_category_id, a.name, a.author, a.brief, a.cover, a.tag, a.seo_url, a.publish_at, c.seo_url article_category_seo_url, c.name article_category_name from f_article a left join f_article_category c on a.article_category_id = c.id where a.is_publish = 1 and a.is_show = 1 and a.delete_by is null order by publish_at desc', function (err, rows) {
            callback(err, rows);
        });
    },

    queryAllByCategorySeoUrl: function (category_seo_url, callback) {
        DBInstance.query('select a.id, a.article_category_id, a.name, a.author, a.brief, a.cover, a.tag, a.seo_url, a.publish_at, c.seo_url article_category_seo_url, c.name article_category_name from f_article a left join f_article_category c on a.article_category_id = c.id where c.seo_url = ? and a.is_publish = 1 and a.is_show = 1 and a.delete_by is null order by publish_at desc', category_seo_url, function (err, rows) {
            callback(err, rows);
        });
    },

    getLatestArticle: function (limit, callback) {
        DBInstance.query('select id,seo_url,name from f_article where is_publish = 1 and is_show = 1 and delete_by is null order by publish_at desc limit ?', limit, function (err, rows) {
            callback(err, rows);
        });
    }
};

module.exports = ArticleController;
