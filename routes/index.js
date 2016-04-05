var express = require('express');
var router = express.Router();

//var mongoose = require('mongoose');
//var user = require('../models/user').user;
//mongoose.connect('mongodb://localhost/lnyxDB');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*login*/
router.get('/login', function(req, res) {
  res.render('login', { title: 'login' });
});

/*logout*/
router.get('/logout', function(req, res) {
  res.render('index', { title: 'logout' });
});

/*hompage*/
router.post('/homepage', function(req, res) {
  var query_doc = {userid: req.body.userid, password: req.body.password};
  (function(){
    user.count(query_doc, function(err, doc){
      if(doc == 1){
        var obj ={};
        obj.userid = query_doc.userid;
        obj.title = 'homepage';
        console.log(query_doc.userid + ": login success in " + new Date());
        console.log(obj);
        res.render('homepage', obj);
      }else{
        console.log(query_doc.userid + ": login failed in " + new Date());
        res.redirect('/');
      }
    });
  })(query_doc);
});

router.get('/a', function(req, res) {
  res.render('article', { title: 'login' });
});



module.exports = router;
