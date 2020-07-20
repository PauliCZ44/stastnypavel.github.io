function rotx(str, n) {
  let newStr2 = []
 str.split("") //split str to array of single strings
  .forEach(x => {
  if (x.charCodeAt(0)>=64 && x.charCodeAt(0) <= 90){
    newStr2.push(String.fromCharCode((x.charCodeAt(0)+ n -65) %26+65 ))
  } else if (x.charCodeAt(0)>=97 && x.charCodeAt(0) <= 122) {
    newStr2.push(String.fromCharCode((x.charCodeAt(0)+ n -97) %26+97 )) 
  } else newStr2.push(x)          //for non letter chars do nothing
    })
  //console.log(newStr2.join(""))
  return newStr2.join("");
}
      // test cases
//rotx("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.", 1)
//rotx("ABCD EFGH IJKLM NOPQR STUV WXYZ A.", 17)
//rotx("abcd efgh ijklm nopqr stuv wxyz +�����.", 13)


function rotxBack(str, n) {
  let newStr2 = []
 str.split("") //split str to array of single strings
  .forEach(x => {
  if (x.charCodeAt(0)>=64 && x.charCodeAt(0) <= 90){
    newStr2.push(String.fromCharCode((x.charCodeAt(0) -65 - n + 26) %26+65 +n))
  } else if (x.charCodeAt(0)>=97 && x.charCodeAt(0) <= 122) {
    newStr2.push(String.fromCharCode((x.charCodeAt(0)-97 - n  + 26) %26+97 +n)) 
  } else newStr2.push(x)          //for non letter chars do nothing
    })
  //console.log(newStr2.join(""))
  return newStr2.join("");
}
//console.log("-**********-")
//rotxBack("HVS EIWQY PFCKB TCL XIADG CJSF HVS ZONM RCU.", 1)
//rotxBack("RSTU VWXY ZABCD EFGHI JKLM NOPQ R", 17)
//end of ciphre


function convertStr(str) {
document.getElementById("result").style.visibility = "visible"
let convertStr = document.getElementById("StrToConvert").value;
//let keyToMove = document.getElementById("keyToMove").valueAsNumber;
let keyToMove = document.getElementsByName("keyToMove")[0].valueAsNumber;
let result = document.getElementById("result");
let resultWord = document.getElementById("resultWord");


let errorMsg = document.getElementById("error") 

if (isNaN(keyToMove)){
console.log("NAN")
errorMsg.style.display = "block";
errorMsg.innerText  = "Prosím zadejte číslo do položky \"klíč\" !";
result.style.display = "none";
}
if (rotx(convertStr, keyToMove) == "") {
	errorMsg.style.display = "block";
	errorMsg.innerText  = "Prosím zadejte zprávu !";
  result.style.display = "none";
  console.log("Eror!!!")
} else if (str != "" && !isNaN(keyToMove)) {
	errorMsg.style.display = "none";
	result.style.display = "block";
  console.log("Shifre converted");   
  console.log(convertStr)
  resultWord.textContent =  rotx(convertStr, keyToMove);
  //console.log(document.getElementById("keyToMove").value, document.getElementById("keyToMove").valueAsNumber, rotx(convertStr, keyToMove))

}  /*else {
	// not a palindrom
	errorMsg.style.display = "none";
	result.style.display = "block"
	resultWord.textContent =  "\""+palindrome(convertStr)[2] + "\"";
	resultState.textContent = " IS NOT";
	resultState.style.color = "red";
	resultWordBacwards.textContent = "\""+palindrome(convertStr)[1] + "\"";
	}*/
}


function deconvertStr(str) {
  document.getElementById("result").style.visibility = "visible"
  let convertStr = document.getElementById("StrToConvert").value;
  //let keyToMove = document.getElementById("keyToMove").valueAsNumber;
  let keyToMove = document.getElementsByName("keyToMove")[0].valueAsNumber;
  let result = document.getElementById("result");
  let resultWord = document.getElementById("resultWord");
  
  
  let errorMsg = document.getElementById("error") 
  
  if (isNaN(keyToMove)){
  console.log("NAN")
  errorMsg.style.display = "block";
  errorMsg.innerText  = "Prosím zadejte číslo do položky \"klíč\" !";
  result.style.display = "none";
  }
  if (rotxBack(convertStr, keyToMove) == "") {
    errorMsg.style.display = "block";
    errorMsg.innerText  = "Prosím zadejte zprávu !";
    result.style.display = "none";
    console.log("Eror!!!")
  } else if (str != "" && !isNaN(keyToMove)) {
    errorMsg.style.display = "none";
    result.style.display = "block";
    console.log("Shifre converted");   
    console.log(convertStr)
    resultWord.textContent =  rotxBack(convertStr, keyToMove);
    //console.log(document.getElementById("keyToMove").value, document.getElementById("keyToMove").valueAsNumber, rotx(convertStr, keyToMove))
  
  }
}