var express = require('express');
var morgan = require('morgan');
var path = require('path');
// Module P10: Connecting your webapp to your database & SQL Injection
var Pool = require('pg').Pool;
var config = {
    user:'asmatcareer',
    databse: 'asmatcareer',
    host: 'http://db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
}

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


// Module P10: Connecting your webapp to your database & SQL Injection
var Pool = new Pool(config);
app.get('/test-db', function (req, res) {
// make a select request
// return response with results
pool.query('SELECT * FROM test', function(err,result){
    if (err) {
        res.status(500).send(err.toString());
    }
    else
    {
        res.send(JSON.stringify(result));
    }
});
});

var counter=0;
app.get('/counter', function (req, res) {
  counter = counter + 1;
  res.send(counter.toString());
});


app.get('/articleone', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'articleone.html'));
});

app.get('/articletwo', function (req, res) {
  res.send('Article 2 is Requested and will be served here');
});

app.get('/article3', function (req, res) {
  res.send('Article 3 is Requested and will be served here');
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

var names=[];
app.get('/submit-name', function (req, res) { // URL: /submit-name?name=xxxx
 var name=req.query.name; // Get the name of the request
 names.push(name);
 // JSON : Java Script Object notation converts javascript object into strings
 res.send(JSON.stringify(names)); // JSON converts array into srting
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
