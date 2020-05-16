var path = require('path');
var express = require('express');
Promise = require("bluebird");
mongoose = Promise.promisifyAll(require('mongoose'));
logLib = require('./app/lib/log');

var bodyParser = require('body-parser');

//config
app = express();

mongoose.connect('mongodb://database:27017/TodosDB');


mongoose.set('debug', true);
 
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

//models
Task = require('./app/models/task');
Todo = require('./app/models/todo');


require('./app/routing/index');

//Static path to dist
app.use(express.static(path.join(__dirname, 'angular/dist/angular/')));
 
//Catch all other routes and return to the index file
app.get('*', (req, res) =>{
   res.sendFile(path.join(__dirname, 'angular/dist/angular/index.html'));
})


app.listen(8080);