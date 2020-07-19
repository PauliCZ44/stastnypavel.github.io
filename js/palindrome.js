function palindrome(str) {
let newStr = str.replace(/[^A-Za-z0-9]/gi, "").toLowerCase()
let palindrom = []
for (let i=newStr.length-1; i >= 0; i--) {
	palindrom.push(newStr[i])
	//console.log(newStr[i])
}
let palString = palindrom.join("")

if (palString == newStr && str!="") {
	return [true, palString, str]
	} else if (str == "") {
		return "NotAString"
	}
	else return [false, palString, str]
//end of function
}


function checkStr(str) {
	document.getElementById("result").style.visibility = "visible"
let checkString = document.getElementById("palidromeCheck").value;
console.log(palindrome(checkString)); 
let result = document.getElementById("result");
let resultWord = document.getElementById("resultWord");
let resultState = document.getElementById("resultState");
let resultWordBacwards = document.getElementById("resultWordBacwards")   ;
console.log(resultWord, resultState, resultWordBacwards, str); 
let errorMsg = document.getElementById("error")  
if (palindrome(checkString) == "NotAString") {
	errorMsg.style.display = "block";
	errorMsg.innerText  = "Please provide a valid string !";
	result.style.display = "none";
} else if (palindrome(checkString)[0]===true && str != "") {
	errorMsg.style.display = "none";
	result.style.display = "block"
   console.log("Palindrom");   
   resultWord.textContent = "\""+palindrome(checkString)[2] + "\"";
   resultState.textContent = " IS";
   resultState.style.color = "green";
   resultWordBacwards.textContent = "\""+palindrome(checkString)[1] + "\"";

}  else {
	// not a palindrom
	errorMsg.style.display = "none";
	result.style.display = "block"
	resultWord.textContent =  "\""+palindrome(checkString)[2] + "\"";
	resultState.textContent = " IS NOT";
	resultState.style.color = "red";
	resultWordBacwards.textContent = "\""+palindrome(checkString)[1] + "\"";
	}
}