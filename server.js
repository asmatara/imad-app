var express = require('express');
var morgan = require('morgan');
var path = require('path');
// Module P10: Connecting your webapp to your database & SQL Injection
var Pool = require('pg').Pool;
var config = {
    user:'asmatcareer',
    database: 'asmatcareer',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
}


//Module P11: Introduction to authentication, hashing, curl & sessions
var crypto = require('crypto');
var bodyParser = require('body-parser');  //Module P11: Introduction to authentication, hashing, curl & sessions
var session = require('express-session');

function createTemplate(data){
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    // While creating template use quotes with `` not with normal '' or ""
    
    var htmlTemplate = `<html>
    <head>
    <title>
   ${title}
    </title>
    <meta name = "viewport" content ="width-device-width, initial-scale=1"/>
<link href= "/ui/style.css" rel = "stylesheet"/>
</head>
<body>
<div class = "container">
<div>
<a href = "/">Home </a>
</div>
<hr/>
<h3>
${heading}
</h3>
<div>
${date.toDateString()}
</div>
<div>
${content}
</div>
</div>
</body>
</html>`;
return htmlTemplate;
}
//End Module P10: Connecting your webapp to your database & SQL Injection
var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
//Module P11: Introduction to authentication, hashing, curl & sessions
app.use(session({
    secret
}));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


//Module P11: Introduction to authentication, hashing, curl & sessions
function hash(input,salt)
{ // how do we create a hash https://nodejs.org/api/crypto//.html#crypto_crypto_pbkdf2_password_salt_iterations_keylen_digest_callback
var hashed = crypto.pbkdf2Sync(input,salt,10000,512,'sha512'); // crypto.pbkdf2Sync(password, salt, iterations, keylen, digest)
//return hashed.toString('hex');  
return["pbkdf2", "10000", salt, hashed.toString('hex')].join('$');
}



app.get('/hash/:input', function (req, res){
    var hashedString = hash(req.params.input,'this-is-some-random-string');
res.send(hashedString);
});

app.post('/create-user', function(req,res)
{ //username, password
// JSON
var username =req.body.username;
var password = req.body.password;
var salt= crypto.randomBytes(128).toString('hex');
var dbString = hash(password,salt);
pool.query('INSERT INTO "user" (username,password) VALUES ($1,$2)', [username,dbString], function (err,result) {
if (err) {
res.status(500).send (err.toString());
} else {
res.send('User successfully created: ' + username);
}
});
});

app.post('/login', function(req,res) { //username, password
// JSON
var username =req.body.username;
var password = req.body.password;

pool.query('SELECT * FROM "user" WHERE username = $1', [username], function (err,result) {
if (err) {
res.status(500).send (err.toString());
} else {
if (result.rows.length === 0 ) {
res.send(403).send('username/password is invalid');
} else {
var dbString = result.rows[0].password;
var salt = dbString.split('$')[2];
var hashedPassword = hash(password, salt); // Creating a hash based on the password submitted and the orignal salt
if (hashedPassword === dbString) {
res.send('User'+username+'credentials are correct');
//res.send('Authorized Person to Access ');
} else {
res.send(403).send('credentials are not correct');
}
}
}
});
});



// Module P10: Connecting your webapp to your database & SQL Injection
var pool = new Pool(config);
app.get('/test-db', function (req, res) {
// make a select request
// return response with results
pool.query('SELECT * FROM test', function(err,result){
    if (err) {
        res.status(500).send(err.toString());
    }
    else
    {
        res.send(JSON.stringify(result.rows));  // to get array of objects use result.rows instead of result
    }
});
});


app.get('/articles/:articleName', function (req, res) {
    // sometimes user gives in link delete condition so its better to use / or $ consider whole thing as parameter rather //than  sql string example : http://xxxxx.imad.hasura-app.io/articles/;delete from articles it will delete all the //data from table 
    // pool.query("SELECT * FROM article WHERE title = '" + req.params.articleName+"'", function(err,result){
    //comment and so for safer side use $ for paramters a below
pool.query("SELECT * FROM article WHERE title = $1" , [req.params.articleName], function(err,result){
     if (err) {
        res.status(500).send(err.toString());
    }
    else {
        if (result.rows.length === 0){
            res.status(404).send('Article Not Found');
        }
        else {
            var articleData = result.rows[0];
            res.send(createTemplate(articleData));
        }
    }
    
 });
});
// End Module P10: Connecting your webapp to your database & SQL Injection
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
