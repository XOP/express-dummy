var express = require('express');
var router = express.Router();
var appdata = require('../data.json');

//
// Sections
//

router.get('/', function(req, res) {

    if(req.query.id){
        renderSection(res, req.query.id);
    } else {
        res.redirect('/section/0');
    }

});

router.get('/:id', function(req, res) {
    renderSection(res, req.params.id);
});

function renderSection(res, id){
    var sectionData = appdata.data[id];

    res.render('section', {
        name : "section",

        company : sectionData.company,
        address : sectionData.address,
        about : sectionData.about
    });
}


module.exports = router;