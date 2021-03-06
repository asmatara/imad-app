// Counter Code for Module P6: Practical: APIs and mobile apps use web-servers
var button = document.getElementById('counter');

button.onclick = function () {
    // Create a Request object to the counter end point
    var request =new XMLHttpRequest();
    
    //Capture the Response and store it in a variable
    request.onreadystatechange = function(){
    // Process the server response here.
    if (request.readyState === XMLHttpRequest.DONE) {
    // Everything is good, the response was received.
    if (request.status === 200) {
    // Perfect!
    var counter = request.responseText;
    var span = document.getElementById('count');
   span.innerHTML = counter.toString();
} else {
    // There was a problem with the request.
    // For example, the response may have a 404 (Not Found)
    // or 500 (Internal Server Error) response code.
}
} else {
    // Not ready yet.
}
};
  // Make the Request
  request.open('GET', 'http://asmatcareer.imad.hasura-app.io/counter', true);
request.send();
};

// Submit username name password changes are made as part of Module P11 Introduction to authentication, hashing, curl

var submit = document.getElementById('submit_btn');
submit.onclick = function(){
     var request =new XMLHttpRequest();
    
    //Capture the Response and store it in a variable
    request.onreadystatechange = function(){
    // Process the server response here.
    if (request.readyState === XMLHttpRequest.DONE) {
    // Everything is good, the response was received.
    if (request.status === 200) {
    // Perfect!
   //Make a request to server and send the name 
    //to caputure and render as a list this task is deleted as part of P11 
    console.log ('user id Logged Success ');
    alert ('Logged in successfully');
} else if (request.status === 403) {
     alert ('Logged Details Incorrect');
} else if (request.status === 500) {
     alert ('Server Interrupted ');
}
} 
    // Not ready yet.
    };    
var username = document.getElementById('username').value;
var password = document.getElementById('password').value;
console.log(username);
console.log(password);
// var name = nameInput.value; P11
//request.open('GET', 'http://asmatcareer.imad.hasura-app.io/submit-name?name=' + name, true); P11
request.open('POST', 'http://asmatcareer.imad.hasura-app.io/login', true);
request.setRequestHeader('Content-Type','application/json');
//request.send(); P11
request.send(JSON.stringify({username: username,password: password}));
};

