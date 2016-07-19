var source = 
`
A basic Hello World! program
All non period characters are comments
_____---____----
  .          . .
 . .    .
  .         .  .
 . .     .
 .      .. 
 . .     .
 .  ............
_____---____----
`;
var source2 = 
`
Count down from user input
        ........ increment everything 
 .      ........ sum everything (=8)
 . .     .       move result into 1
 .       ...     sum 1-3(=10)
 . .     .       move result into 1
..  .            read user input as int
  ..    .        move into 0
  . .   .        while(0){
 .  .   .           printf(%d, 0)
    .    .          prinft(%s, 1)(newline)
.       .           decrement 0
. . .            }
Press Run, then enter a number:
`;

var source3 = 
`
sum user input
`;
/*global $*/
$(document).ready(function(){
    $("#text").html(source);
});
