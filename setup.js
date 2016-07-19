var source = 
`
A basic Hello World! program
All non period characters are comments
_____---____----
  .          . . mul 16 * 4 = 64
 . .    .        mov -> @1
  .         .  . mul 16 * 2 = 32 
 . .     .       mov -> @2
 .      ..       add @1 + @2 = 96
 . .     .       mov -> @2
 .      .     .  add @1 + 8 = 72
 . .      .      mov  -> @3 
 .       .   .   etc
 . .       .
           .
    .     ..     print "He"
 .         .  . 
 . .     ...
.         ..     
    .     ..     print "ll"
 .        .  .
 . .      .
  .         .  .
 . .       .
.         .
    .     ..     print "o "
 .      .   .. . 
 . .       .
           .
    .      .     print "W"
    .     .      print "o"
 .       .  ..
 . .      .
 .       .
 . .       .     
.         ..
    .     ..     print "rl"
..         .  .
 . .      .
  .         .  .
 . .       . 
           .
    .     ..     print "d!"
 .          . .
 . .       .
    .      .     print "\\n"
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
    $("#text").val(source);
});
