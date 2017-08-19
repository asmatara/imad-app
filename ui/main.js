console.log('Loaded!');
// Change the text of content
var element = document.getElementById('main-text');
element.innerHTML = 'Modified to New Data';
// Moving the Image
var img = document.getElementById('madi-move');
var marginLeft = 0;
function moveRight(){
    marginLeft = marginLeft + 1;
    img.style.marginLeft = marginLeft + 'px';
}
img.onclick = function () {
    var Interval = setInterval(moveRight,25);
    //img.style.marginLeft = '100px'; // Setting margin Left on Click
}

// Counter Code for Module P6: Practical: APIs and mobile apps use web-servers
var button = document.getElementById('counter');
//var counter = 0;

button.onclick = function () {
    // Make a Request object to the counter end point
    var request = new XMLHttprequest();
    
    //Capture the Response and store it in a variable
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttprequest.DONE)
        {//Take some action
            if (request.status === 200) 
            {
                var counter = request.responseText;
                 var span = document.getElementById('count');
    span.innerHTML = counter.toString();
            }
        }
        // not 
    }
    // Render the variable in a correct span counter = counter + 1;
   // var span = document.getElementById('count');
   // span.innerHTML = counter.toString();
   
   // Make the Request
    request.open('GET','http://asmatcareer.imad.hasura-app.io/counter',true);
    request.send(null);
}