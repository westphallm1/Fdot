var source = 
`
A basic Hello World! program
All non period characters are comments
        ........ increment all registers
 .      ........ sum all registers (=8)
 . .    ........ copy sum back into regs
 .      ........ sum all registers (=64)
 . .    .....    copy back into first 5
 .           ..  sum reg 6 & 7 (=16)
 . .         ..  copy sum back into 6 & 7
 .           ..  sum 6 & 7 again (=32)
 . .         .   copy sum into 6
        .....    increment 1-5
 .      .    .   sum 1 & 6 (=97)
 . .     ....    copy sum into 2-5
 .      .      . sum 1 & 8 (=73)
 . .    .        copy sum into 1
 .       .     . et cetera
 . .     ....   
 .         .   .
 . .        .   
          .. . .
.       ..  .    decrement by 1
.        .  .   
.        .      
.        .      
          ..   .    
          ..    
.   .       
    .   ...... .
 .  .   ........
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
    $("#text").html(source2);
});
