/**
 * Created by eugeny.horoshilov on 25.01.15.
 */

var http = require('http');
var fs = require('fs');
var path = require('path');

var colors = require('colors');
var info = console.info;

var config = require('./config.json');
var paths = config.paths;

//
// express config
var express = require('express');
var routes = require('./routes');
var app = express();
app.set('view engine', 'ejs');
//using non-default folder
//app.set('views', __dirname + '/customFolder');

//
// locals
app.locals = {
    version : "0.1",
    port : config.port,
    cssPath : paths.css.out,

    name : "app"
};

//
// router
app.get('/', routes.index);
app.get('/section', routes.section);

app.get('/css/:file?', function(req, res){
    res.sendFile(__dirname + paths.css.out + '/' + req.params.file);
});

app.get('*', function (req, res){
   res.send('Bad route!');
});

//
// SERVER
//

var server = app.listen(config.port, function(){
    info('App is running on port'.green + ' ' + colors.yellow(config.port));
});