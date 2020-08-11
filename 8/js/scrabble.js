

var tiles = ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'j', 's', 's', 's', 's', 'b', 'b', 'k', 't', 't', 't', 't', 't', 't', 'c', 'c', 'l', 'l', 'l', 'l', 'u', 'u', 'u', 'u', 'd', 'd', 'd', 'd', 'm', 'm', 'v', 'v', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'n', 'n', 'n', 'n', 'n', 'n', 'w', 'w', 'f', 'f', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'x', 'g', 'g', 'g', 'p', 'p', 'y', 'y', 'h', 'h', 'q', 'z', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'r', 'r', 'r', 'r', 'r', 'r', 'blank', 'blank'];
var vals = [];
vals['a'] = [1, 9];
vals['b'] = [3, 2];
vals['c'] = [3, 2];
vals['d'] = [2, 4];
vals['e'] = [1, 12];
vals['f'] = [4, 2];
vals['g'] = [2, 3];
vals['h'] = [4, 2];
vals['i'] = [1, 9];
vals['j'] = [8, 1];
vals['k'] = [5, 1];
vals['l'] = [1, 4];
vals['m'] = [3, 2];
vals['n'] = [1, 6];
vals['o'] = [1, 8];
vals['p'] = [3, 2];
vals['q'] = [10, 1];
vals['r'] = [1, 6];
vals['s'] = [1, 4];
vals['t'] = [1, 6];
vals['u'] = [1, 4];
vals['v'] = [4, 2];
vals['w'] = [4, 2];
vals['x'] = [8, 1];
vals['y'] = [4, 2];
vals['z'] = [10, 1];
vals['blank'] = [0, 2];

// Fisher-Yates shuffle, https://en.wikipedia.org/wiki/Fisher–Yates_shuffle
function shuffle(arr) {
    var i = 0, j = 0, temp = null;
    for (i = arr.length  - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i+1))
        temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
    }
}

shuffle(tiles);
var txt = "<ul id='sortable'>";
for (var i = 0; i < 7; i++) {
    letter = tiles.pop();
    txt += "<li class='ui-sortable'><img src='./images/"+letter+".jpg' style='width:50px;'></li>";
    vals[letter][1]--;
}
txt += "</ul>";

$("div.changeme").html(txt);

$(function() {
    $("sortable").sortable();
    $("sortable").disableSelection();
});