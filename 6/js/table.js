/*     File: BrianEngholm.github.io/6/js/table.js
       91.461 Assignment: Using the jQuery Validation Plugin with Your Dynamic Table
       Brian Engholm, UMass Lowell Computer Science, Brian_Engholm@student.uml.edu
       Copyright (c) 2020 by Brian Engholm. All rights reserved.
       updated by Brian Engholm on 2020-08-05 at 16:55 */

$('#tabForm').validate({
    submitHandler: function() {
        genTable();
    },
    errorElement: 'div'
});

function genTable() {

    // Get the form values
    var one = document.getElementById('rowstart').value;
    var two = document.getElementById('rowend').value;
    var three = document.getElementById('colstart').value;
    var four = document.getElementById('colend').value;

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
