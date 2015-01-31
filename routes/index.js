exports.index = function(req,res){
    res.render('default', {
        name : "app"
    });
};

exports.section = function(req,res){
    res.render('section', {
        name : "section"
    });
};