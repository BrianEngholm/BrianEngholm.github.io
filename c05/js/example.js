var el = document.getElementById('one').parentElement;

// ADD NEW ITEM TO END OF LIST
var node = document.createElement('li');
var textnode = document.createTextNode('cream');
node.appendChild(textnode);
el.appendChild(node);

// ADD NEW ITEM START OF LIST
node = document.createElement('li');
textnode = document.createTextNode('kale');
node.appendChild(textnode);
el.insertBefore(node, el.childNodes[0]);

// ADD A CLASS OF COOL TO ALL LIST ITEMS
el.childNodes.forEach(function (el) {el.className = "cool"});

// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
var header = document.getElementById('header').nextElementSibling;
header.innerHTML += "<span>" + el.childElementCount + "</span";
