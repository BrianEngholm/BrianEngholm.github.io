// Create the board's html
var line = "<tr>" + "<td></td>".repeat(15) + "</tr>";
line = line.repeat(15);
$('#board').append(line);

// Arrays of special square indices
var tws_list = [0, 7, 14, 105, 119, 210, 217, 224];
var dls_list = [3, 11, 45, 52, 59, 92, 96, 98, 102, 108, 116, 122, 126, 128, 132, 165, 172, 179, 186, 188, 213, 220];
var dws_list = [16, 28, 32, 42, 48, 56, 64, 70, 154, 160, 168, 176, 182, 192, 196, 208];
var tls_list = [20, 24, 76, 80, 84, 88, 136, 140, 144, 148, 200, 204];
var mid = 112;

// Add triple word score spaces
$('table td').filter(function(i) {
    return $.inArray(i, tws_list) > -1;
}).addClass('tws');

// Add double letter score spaces
$('table td').filter(function(i) {
    return $.inArray(i, dls_list) > -1;
}).addClass('dls');

// Add double word score spaces
$('table td').filter(function(i) {
    return $.inArray(i, dws_list) > -1;
}).addClass('dws');

// Add triple letter score spaces
$('table td').filter(function(i) {
    return $.inArray(i, tls_list) > -1;
}).addClass('tls');

// Add middle square
$('table td:eq(112)').addClass('mid').html('★');
