console.log('Loaded!');
// Change the text of content
var element = document.getElementById('main-text');
element.innerHTML = 'Modified to New Data';
// Moving the Image
var img = document.getElementById('madi-move');
var marginLeft = 0;
function moveRight(){
    marginLeft = marginLeft + 10;
    img.style.marginLeft = marginLeft + 'px';
}
img.onclick = function () {
    var Interval = setInterval(moveRight,100);
    //img.style.marginLeft = '100px'; // Setting margin Left on Click
}