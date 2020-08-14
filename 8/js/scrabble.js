var row, col;
firstChar = [];
var word = "";
var score = 0;

function tileHelper(x, y, ch) {
    if (firstChar.length == 0) {
        firstChar.push(x, y);
    }
    if (row === undefined && col === undefined) {
        row = x;
        col = y;
    }
    if (x == row && y != col) {
        col = undefined;
    }
    else if (x != row && y == col) {
        row = undefined;
    }
    if (x < firstChar[0]) {
        firstChar[0] = x;
        word = ch + word;
    }
    else if (y < firstChar[1]) {
        firstChar[1] = y;
        word = ch + word;
    }
    else {
        word += ch;
    }
}

// Dictionary code copied from http://ejohn.org/blog/dictionary-lookups-in-javascript/
var dict = {}
$.get("dict/dict.txt", function(txt) {
    var words = txt.split("\n");
    for (var i = 0; i < words.length; i++) {
        dict[words[i]] = true;
    }
});

function calcScore() {
    if (row === undefined && col === undefined) return;
    var tmp_score = 0;
    var index = firstChar[0] + firstChar[1] * 15;
    var index_delta = (row !== undefined ? 15 : 1)
    var tmp_index;
    // Repeatedly check if there is still a tile to the left/top of the current first tile to find the true start
    if (index_delta == 15) {
        // Find first vertical tile of word
        while (index >= 14 && $('table td:eq('+(index-15)+')').html()[0] == '<') {
            index -= 15;
            //word = $('table td:eq('+index+')').find('img').attr('src').slice(9, -4)) + word;
        }
        
        // Construct word by going through vertical tiles
        tmp_index = index;
        word = $('table td:eq('+(tmp_index)+')').find('img').attr('src').slice(9, -4);
        while (tmp_index <= 210 && $('table td:eq('+(tmp_index+15)+')').html()[0] == '<') {
            word += $('table td:eq('+(tmp_index+15)+')').find('img').attr('src').slice(9, -4);
            tmp_index += 15;
        }
    } else {
        // Find first horizontal tile of word
        while (index % 15 > 0 && $('table td:eq('+(index-1)+')').html()[0] == '<') {
            index -= 1;
        }
        
        // Construct word by going through horizontal tiles
        tmp_index = index;
        word = $('table td:eq('+(tmp_index)+')').find('img').attr('src').slice(9, -4);
        while (tmp_index % 15 <= 14 && $('table td:eq('+(tmp_index+1)+')').html()[0] == '<') {
            word += $('table td:eq('+(tmp_index+1)+')').find('img').attr('src').slice(9, -4);
            tmp_index += 1;
        }
    }
    
    // Check if the word is valid
    if (!dict[word]) return;
    
    var multiplier = 1;
    for (i = 0; i < word.length; i++) {
        var letter_score = vals[word[i]][0];
        if (tws_list.indexOf(index) != -1) {
            multiplier *= 3;
        }
        if (dls_list.indexOf(index) != -1) {
            letter_score *= 2;
        }
        if (dws_list.indexOf(index) != -1) {
            multiplier *= 2;
        }
        if (tls_list.indexOf(index) != -1) {
            letter_score *= 3;
        }
        tmp_score += letter_score;
        index += index_delta;
    }
    tmp_score *= multiplier;
    score += tmp_score;
    $("#score").text("Word: "+word+" Score: "+score);
    //$(".score").text(Number($("score").html())+score);
    //document.write(score);
}