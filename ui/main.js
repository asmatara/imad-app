console.log('Loaded!');
// Change the text of content
var element = document.getElementById('main-text');
element.innerHTML = 'Modified to New Data';
// Moving the Image
var img = document.getElementById('madi-move');
img.onclick = function () {
    img.style.marginLeft = '100px';
}