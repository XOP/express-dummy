/**
 * Created by eugeny.horoshilov on 25.01.15.
 */

var http = require('http');
var fs = require('fs');
var path = require('path');

var colors = require('colors');
var info = console.info;

var config = require('./config.json');

//
// express config
var express = require('express');
var routes = require('./routes/index');

var app = express();

app.set('view engine', 'ejs');
//using non-default folder
//app.set('views', __dirname + '/customFolder');

//
// locals
app.locals = {
    version : "0.1",
    title : "Express Dummy",

    port : config.port,

    name : "app"
};

/*
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
*/

//
// serve static
app.use(express.static(path.join(__dirname, 'public')));

//
// router
app.use('/', routes);
app.use('/section', routes);

// catch 404 and forward to error handler
app.use(function(req, res) {
    var err = new Error('Not Found');
    err.status = 404;
    res.send('404: NOT FOUND');
});

//
// SERVER
//

var server = app.listen(config.port, function(){
    info('App is running on port'.green + ' ' + colors.yellow(config.port));
});