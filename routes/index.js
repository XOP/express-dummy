var express = require('express');
var router = express.Router();
var appdata = require('../data.json');

//
// home
router.get('/', function(req, res) {
    res.render('index', {
        name : "app"
    });
});

//
// section
router.get('/section', function(req, res) {
    res.redirect('section/0');
});

router.get('/section/:id', function(req, res) {

    var id = req.params.id;
    var sectionData = appdata.data[id];

    res.render('section', {
        name : "section",

        company : sectionData.company,
        address : sectionData.address,
        about : sectionData.about
    });

});

module.exports = router;