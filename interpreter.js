/* globals */
var CMDSTR_LEN = 5;
var EOF = 'eof'; 
var REGISTERS;
var STACK;
var WAITING;
var LINE_NUM;
var lines;
var PARSE_REGS;
var PARSE_FN;


/*
TRAY 0 FUNCTIONS: Numerical operations
*/
{
//0
var inc = function(regs){
    for(var i in regs) REGISTERS[regs[i]]+=1;
};
//1
var dec = function(regs){
    for(var i in regs) REGISTERS[regs[i]]-=1;
};
//2
var add = function(regs){
    var sum = 0;
    for(var i in regs) sum+= REGISTERS[regs[i]];
    REGISTERS[0] = sum;
};
//3
var sub = function(regs){
    REGISTERS[0] = REGISTERS[regs[0]] - REGISTERS[regs[1]];
};
//4
var mul = function(regs){
    var prod = 1;
    for(var i in regs) prod*= REGISTERS[regs[i]];
    REGISTERS[0] = prod;
};
//5
var div = function(regs){
    REGISTERS[0] = REGISTERS[regs[0]] / REGISTERS[regs[1]];
};
//6
var and_f =function(regs){
    var out = REGISTERS[regs[0]];
    for (var i in regs) out = out && REGISTERS[regs[i]];
    REGISTERS[0] = out;
};
//7
var or_f =function(regs){
    var out = REGISTERS[regs[0]];
    for (var i in regs) out = out || REGISTERS[regs[i]];
    REGISTERS[0] = out;
};
//8
var not_f = function(regs){
    for(var i in regs) REGISTERS[regs[i]] = ~REGISTERS[regs[i]];
};
//9
var xor_f =function(regs){
    var out = REGISTERS[regs[0]];
    for (var i in regs) out = out ^ REGISTERS[regs[i]];
    REGISTERS[0] = out;
};
//10
var mov = function(regs){
    for(var i in regs) REGISTERS[regs[i]] = REGISTERS[0];
};
//11
var push_f = function(regs){
    for(var i in regs) STACK.push(REGISTERS[regs[i]]);
};
//12
var pop_f = function(regs){
    if(regs.length == 0) REGISTERS[0] = STACK.pop();
    for(var i in regs){
        if (STACK.length == 0){
            REGISTERS[1] = 0;
            return;
        }
        var popped_val = STACK.pop();
        if(popped_val == EOF){
            REGISTERS[1] = 0;
            return;
        }
        REGISTERS[regs[i]] = popped_val;
    }
    //successfully popped into all requested registers
    REGISTERS[1] = 1;
};
//13
var shiftl = function(regs){
    REGISTERS[0] = REGISTERS[regs[0]] << REGISTERS[regs[1]];
};
//14
var shiftr = function(regs){
    REGISTERS[0] = REGISTERS[regs[0]] >> REGISTERS[regs[1]];
};
//15
var zero = function(regs){
    for(var i in regs) REGISTERS[regs[i]] = 0;  
};
}
/*
TRAY 1 FUNCTIONS: I/O and control
*/
{
//16
var asASCII = function(regs){
    var outstr = "";
    for(var i in regs) outstr += String.fromCharCode(REGISTERS[regs[i]]);
    write_to_cout(outstr);

};

//17
var fromASCIIParse = function(regs){
    var cmdtext = $("#cmdline").val();
    $("#cmdline").val("");
    //add a null terminator
    STACK.push(EOF);
    //push the contents of the string in reverse order
    for(var i = cmdtext.length -1; i >= 0; i--) STACK.push(cmdtext.charAt(i));
};

var fromASCII = function(regs){
    WAITING = true;
    PARSE_REGS = regs;
    PARSE_FN = fromASCIIParse;
    return -1;
};

//18
var asInt = function(regs){
    var outstr = "";
    for(var i in regs) outstr += " " + REGISTERS[regs[i]];
    write_to_cout(outstr);
};

//19
var fromIntParse = function(regs){
    var cmdtext = $("#cmdline").val().split(" ");
    STACK.push(EOF);
    $("#cmdline").val(""); 
    for(var i=cmdtext.length-1;i>=0;i--)STACK.push(parseInt(cmdtext[i]));
};

var fromInt = function(regs){
    WAITING = true;
    PARSE_REGS = regs;
    PARSE_FN = fromIntParse;
    return -1;    
};

//20
var while_f = function(regs){
    //use OR
    var has_true = false;
    for(var i in regs){
        var to_alert = "";
        has_true = has_true || REGISTERS[regs[i]] != 0;
        to_alert += " " +REGISTERS[regs[i]];
    }
    if(!has_true){
        //scan forward through the source code looking for an end_f
        var indent_level = 0;
        for (var line = LINE_NUM; line < lines.length; line++){
            var cmd_num = parseStr(lines[line])[0];
            if(cmd_num ==20) indent_level +=1;
            if(cmd_num ==21) indent_level -=1;
            if(indent_level ==0){
                return line+1;
            }
        }
        return line+1;
    }
};

//21
var end_f = function(regs){
    //scan backwards through the source code looking for a while_f
    var indent_level = 0;
    for (var line = LINE_NUM; line >=0; line--){
        var cmd_num = parseStr(lines[line])[0];
        if(cmd_num ==20) indent_level +=1;
        if(cmd_num ==21) indent_level -=1;
        if(indent_level == 0) return line - 1;
    }
    return line - 1;
};

//More math that will eventually be moved up
//23
var eq_f = function(regs){
    REGISTERS[0] = REGISTERS[regs[0]] == REGISTERS[regs[1]];
};
var lt_f = function(regs){
    REGISTERS[0] = REGISTERS[regs[0]] < REGISTERS[regs[1]];
};
var gt_f = function(regs){
    REGISTERS[0] = REGISTERS[regs[0]] > REGISTERS[regs[1]];
};
}

var parseStr = function(inStr){
    var cmdstr = inStr.substring(0,CMDSTR_LEN);
    var regstr = inStr.substring(CMDSTR_LEN,inStr.length);
    var cmd = 0;
    var reg_i = new Array();
    for(var i = 0; i < cmdstr.length; i++){
        if(cmdstr.charAt(i) == '.') cmd+= Math.pow(2,i);
    }
    for(i = 0; i < regstr.length; i++){
        if(regstr.charAt(i) == '.') reg_i.push(i);
    }
    var out = [cmd,reg_i];
    return out;
};

var parseCMD = function(cmd, regs){
    var commands = [inc, dec, add,sub,mul,div,and_f,or_f,not_f,xor_f,mov,
                    push_f,pop_f,shiftl,shiftr,zero,asASCII,fromASCII,
                    asInt,fromInt,while_f,end_f];
    return commands[cmd](regs);
};

var parse_line = function(line){
    var parsed_str = parseStr(line);
    return parseCMD(parsed_str[0],parsed_str[1]);
};


var main = function(){
    var outVal;
    for (var line = LINE_NUM; line < lines.length; line++){
        LINE_NUM = line;
        outVal = parse_line(lines[line]);
        if(outVal == -1){
            LINE_NUM+=1;
            return;
        }
        if(typeof outVal === 'number'){
            line = outVal;
            LINE_NUM = outVal;
        }
    }
    $("#cout").html($("#cout").html() + "Finished.");
};

var write_to_cout = function(str){
        $("#cout").html($("#cout").html()+str);
        $("#cout").scrollTop($("#cout")[0].scrollHeight - $("#cout").height());
};
/*global $*/
$(document).ready(function(){
    $("#run_button").click(function(){
        REGISTERS = [0,0,0, 0,0,0,0,2,4,8,16];
        STACK = [];
        WAITING = false;
        LINE_NUM = 0;
        $("#cout").html("Running..."+"\n");
        lines = $("#text").val().split(/\n/g);
        main();
    });
    $("#cmdline").keypress(function(key) {
        if (key.which == 13 & WAITING){
            $("#cout").html($("#cout").html()+"\n" + $(this).val() + "\n");
            WAITING = false;
            PARSE_FN(PARSE_REGS);
            main();
        }
    });
})
