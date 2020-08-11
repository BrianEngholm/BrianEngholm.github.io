/*     File: BrianEngholm.github.io/7/js/table.js
       91.461 Assignment: Using the jQuery UI Slider and Tab Widgets
       Brian Engholm, UMass Lowell Computer Science, Brian_Engholm@student.uml.edu
       Copyright (c) 2020 by Brian Engholm. All rights reserved.
       updated by Brian Engholm on 2020-08-11 at 01:58 */

var x = 1;
var one = 0;
var two = 0;
var three = 0;
var four = 0;


// Close button copied from https://jqueryui.com/tabs/#manipulation
$("#tabs").tabs().on( "click", "span.ui-icon-close", function() {
    var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
    $( "#" + panelId ).remove();
    $("#tabs").tabs().tabs( "refresh" );
});
$(document).on( "keyup", function( event ) {
    if ( event.altKey && event.keyCode === $.ui.keyCode.BACKSPACE ) {
        var n = $("[aria-controls^=tabs-]").length
        for (var i = 0; i < n; i++) {
        var panelId = $("#tabs").tabs().find( ".ui-tabs-tab" ).remove().attr( "aria-controls" );
        $( "#" + panelId ).remove();
        $("#tabs").tabs().tabs( "refresh" );
        }
        $(".ui-tabs-panel").remove();
    }
});

// Function to create a new tab with the current table
function add_table() {
    if (!$("#tabForm").valid()) return false;
    // Close button copied from https://jqueryui.com/tabs/#manipulation
    var title = '<li><a href="#tabs-'+x+'">'+one+" to "+two+" by "+three+" to "+four+"</a><span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>"
    console.log("Adding"+title);
    $("#tabs ul").append(title);
    $("#tabs").append('<div class="tabs" id="tabs-' + x++ + '">' + $("#tab").html() + '</div>');
    $("#tabs").tabs("refresh");
}

// Intialize sliders and bind to inputs
$(".slider").slider({
    min: -50,
    max: 50,
    slide: function(event, ui) {
        $("input:eq("+$(this).attr('name')+")").val(ui.value);
        genTable();
    }
});

// Bind inputs to sliders
$(".floating-input").change(function() {
    $(this).nextAll(".slider").slider("value", this.value);
    genTable();
});

//jQuery validation plugin function
$('#tabForm').validate({
    submitHandler: function() {
        genTable();
    }
});


function genTable() {
    
    if (!$("#tabForm").valid()) return false;
    
    // Get the form values
    one = document.getElementById('rowstart').value;
    two = document.getElementById('rowend').value;
    three = document.getElementById('colstart').value;
    four = document.getElementById('colend').value;

    var el;
    var error = 0;

    

    one = Number(one);
    two = Number(two);
    three = Number(three);
    four = Number(four);

    numcols = Math.abs(four - three) + 1;
    numrows = Math.abs(two - one) + 1;
    rowdelta = (four - three) > 0 ? 1 : -1;
    coldelta = (two - one) > 0 ? 1 : -1;

    var content = "<table class='table table-responsive table-striped table-bordered'><tr><th></th>";

    // Populate the table with values based on the user input
    for (var i = 0; i < numcols; i++) {
        var colnum = three + rowdelta * i;
        content += "<th style='position: sticky; top: 0; z-index: 10'>" + colnum + "</th>";
    }
    for (var i = 0; i < numrows; i++) {
        var rownum = one + coldelta * i;
        content += "<tr><th style='position: sticky; left: 0;'>" + rownum + "</th>";
        for (var j = 0; j < numcols; j++) {
            var colnum = three + rowdelta * j;
            content += "<td>" + rownum * colnum + "</td>";
        }
        content += "</tr>";
    }
    content += "</table>";

    var el = document.getElementById('tab');
    el.innerHTML = content;
}