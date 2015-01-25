/**
 * Created by eugeny.horoshilov on 25.01.15.
 */

var http = require('http');
var fs = require('fs');
var path = require('path');

var colors = require('colors');

var express = require('express');
var app = express();
app.set('view engine', 'ejs');
//app.set('views', __dirname + '/customFolder');

var port = 3000;
var info = console.info;


app.get('/', function(req, res) {
    res.send('<h1>Home</h1>');
});

app.get('/section', function(req, res) {
    res.render('section', {port : port});
});

app.get('/pages/:page?', function(req, res) {
    var page = req.params.page;
    res.send('<h1>Page: ' + page + '</h1>');
});

app.get('*', function (req, res){
   res.send('Bad route!');
});

var server = app.listen(port, function(){
    info('App is running on port'.green + ' ' + colors.yellow(port));
});