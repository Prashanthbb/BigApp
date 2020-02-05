a = {
"op": "equal",
"lhs": {
    "op": "add",
    "lhs": 1,
    "rhs": {
        "op": "multiply",
        "rhs": "x",
        "lhs": 10
    }
},
"rhs": 21
}
//initialize result
var result = "";
//getting type
function getexp(child,type){
    if(typeof child.rhs == "object" ){
      getexp(child.rhs,"r")
      result = child.lhs + " " + child.op + " " + result;
    }else if(typeof child.lhs == "object"){
      getexp(child.lhs,"l")
      if(child.op == "multiply"){
         result = "("+result + " " +child.op + " " + child.rhs+")";
      }else{
         result = result + " " +child.op + " " + child.rhs;
      }
    }else{
         if(child.op == "multiply"){
             if(type == "r"){
                result = "("+ result + child.rhs + child.op + child.lhs +")"
             }else{
                result = "("+ result + child.lhs + child.op + child.rhs +")"
             }
         }else{
             if(type == "r"){
                result = result + child.rhs + child.op + child.lhs
             }else{
                result = result + child.lhs + child.op + child.rhs
             }
         }
    }
}

if(typeof a.lhs == "object"){
    getexp(a.lhs)
    result = result +" "+ a.op +" "+ a.rhs;
}else if(typeof a.rhs=="object"){
    getexp(a.rhs)
    result=result+ " " + a.op +" "+a.lhs
}else{
  result = a.lhs + a.op + a.rhs;
}
result = result.replace("equal"," = ")
result = result.replace("add"," + ")
result = result.replace("multiply"," * ")
result = result.replace("devide"," / ")
console.log(result)
var lhs = result.split('=')[0];
var rhs = result.split('=')[1].trim();
result = lhs;
result = result.split(' ').join(",").replace(/[\s''x()]/g,'').split(",");

for(var i = result.length-1; i >= 0; i--) {
    if(result[i].length ===0) {
       result.splice(i, 1);
    }
}
console.log("final result is"+ " "+ result);

var final = [];
if(result.length>3){

        for (let i = 1; i < result.length; i++) {
            // check if symbol is operator
            console.log("chedck"+i);

            if (isOperator(result[i]) && isOperator(result[i+1])) {
                final.push(OppOperator(result[i])+result[i-1]+")"+OppOperator(result[i+1]));
                i++
            }else if(isOperator(result[i])){
                final.push(OppOperator(result[i])+result[i-1]);

            }
            else {
                final.push(result[i]);
            }
            function isOperator(op){
                switch (op) {
                case '+':
                case '-':
                case '/':
                case '*':
                case '=':
                    return true;
                }
                return false;
            }
            function OppOperator(opp){
                switch(opp) {
                    case "+":  return "-";
                                  break;
                    case "-": return "+";
                                 break;
                    case "*": return "/";
                                     break;
                    case "/" : return "*";
                                    break;
                    default: return opp
                }
            }
            console.log("expression final " + result);
        }
        final_value = "("+rhs+final.join('') ;
        console.log("final value = " + final_value);
        console.log("calculated final value "+ eval(final_value));
    }
