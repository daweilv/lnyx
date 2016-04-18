var logic = {
    goIndex: function (req, res, next) {
        res.render('home/index', {title: 'Express'});
    },
    goArticle: function (req, res, next) {
        res.render('home/article', {title: 'login'});
    }

};

module.exports = logic;