// Counter Code for Module P6: Practical: APIs and mobile apps use web-servers
var button = document.getElementById('counter');

button.onclick = function () {
    // Create a Request object to the counter end point
    var request = XMLHttpRequest();
    
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