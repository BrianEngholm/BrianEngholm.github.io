function refill() {
    calcScore();
    var txt = "";
    var numTiles = 7 - $('div.rack img').length;
    for (var i = 0; i < numTiles; i++) {
        letter = tiles.pop();
        txt += "<img class='tile' src='./images/"+letter+".jpg'></img>";
        vals[letter][1]--;
    }
    $("div.rack").html($("div.rack").html()+txt);
    
    $(".tile").draggable({
        snap: $('td span'),
        revert: "invalid",
        helper: 'clone',
        start: function(event, ui) {
            $(ui.helper).css('height', $(this).height());
        }
    });

    $(".rack").droppable();

    $("#board td").droppable({
        accept: $(".tile"),
        drop: function(event, ui) {
            var x_coord = $(this).index(),
                y_coord = $(this).closest('tr').index();
            if (row !== undefined || col !== undefined) {
                if (x_coord != row && y_coord != col) return;
            }
            if (!checkAdjacency(x_coord, y_coord)) return;
            var target = $(event.target);
            if (target.html()[0] != '<') {
                target.html(ui.draggable[0].outerHTML);
                ui.draggable[0].outerHTML = "";
            }
            var tile = ui.draggable.attr('src').slice(9, -4);
            tileHelper(x_coord, y_coord, tile);
        }
    });
    row = undefined;
    col = undefined;
    firstChar = [];
    word = "";
    newTiles = [];
    //$("#score").text("Word: "+word+" Score: "+score);
}

function checkAdjacency(x, y) {
    if (firstChar.length <= 0) return true;
    var leftIndex = x-1+y*15;
    var rightIndex = x+1+y*15;
    var topIndex = x+(y+1)*15;
    var bottomIndex = x+(y-1)*15;
    if (x > 0) {
        // check left
        if ($('table td:eq('+leftIndex+')').html()[0] == '<') return true;
    }
    if (x < 14) {
        // check right
        if ($('table td:eq('+rightIndex+')').html()[0] == '<') return true;
    }
    if (y > 0) {
        // check top
        if ($('table td:eq('+topIndex+')').html()[0] == '<') return true;
    }
    if (y < 14) {
        // check bottom
        if ($('table td:eq('+bottomIndex+')').html()[0] == '<') return true;
    }
}

refill();
