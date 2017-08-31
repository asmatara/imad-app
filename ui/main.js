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

// Submit username password

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
    //to caputure and render as a list 
    var names = request.responseText;
    names = JSON.parse(names);
    var list = '';
    for (var i=0; i<names.length; i++){
        list += '<li>' + names[i] + '</li>';
    }
    var ul =document.getElementById('namelist');
    ul.innerHTML = list;
} 
} 
    // Not ready yet.
    };    
var nameInput = document.getElementById('name');
var name = nameInput.value;
request.open('GET', 'http://asmatcareer.imad.hasura-app.io/submit-name?name=' + name, true);
request.send();
};

