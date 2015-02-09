var express = require('express');
var router = express.Router();

//
// home
router.get('/', function(req, res, next) {
    res.render('index', {
        name : "app"
    });
});

//
// section
router.get('/section', function(req, res, next) {
    res.render('section', {
        name : "section"
    });
});

module.exports = router;