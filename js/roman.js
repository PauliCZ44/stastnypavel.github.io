function convertToRoman(num) {

let str = ""+num+""  //conver num to string
let nums = []

for (let i = 0; i < str.length; i++){
 	nums.unshift(Math.pow(10,i)*parseInt(str[str.length-i-1],10))
//console.log(str[i])
} 

// Conver nums to their roman equivalent //
let convertNumToRoman = function (num) {
  if (num <= 9) {
    if (num === 1) return "I"
    if (num === 2) return "II"
    if (num === 3) return "III"
    if (num === 4) return "IV"
    if (num === 5) return "V"
    if (num === 6) return "VI"
    if (num === 7) return "VII"
    if (num === 8) return "VIII"
    if (num === 9) return "IX"
  } else if (num <= 90){
    if (num === 10) return "X"
    if (num === 20) return "XX"
    if (num === 30) return "XXX"
    if (num === 40) return "XL"
    if (num === 50) return "L"
    if (num === 60) return "LX"
    if (num === 70) return "LXX"
    if (num === 80) return "LXXX"
    if (num === 90) return "XC"
  } else if (num <= 900) {
    if (num === 100) return "C"
    if (num === 200) return "CC"
    if (num === 300) return "CCC"
    if (num === 400) return "CD"
    if (num === 500) return "D"
    if (num === 600) return "DC"
    if (num === 700) return "DCC"
    if (num === 800) return "DCCC"
    if (num === 900) return "CM"
  } else if (num <= 9000) {
    if (num === 1000) return "M"
    if (num === 2000) return "MM"
    if (num === 3000) return "MMM"
    if (num === 4000) return "MMMM"
    if (num === 5000) return "MMMMM"
    if (num === 6000) return "MMMMMM"
    if (num === 7000) return "MMMMMMM"
    if (num === 8000) return "MMMMMMMM"
    if (num === 9000) return "MMMMMMMMM"
  } else  return "FAILED";
};
let newArr = nums.map( x => (convertNumToRoman(x)));
console.log("Nums are", newArr)
// pokud některý prvek v newArr == FAILED return false
if (newArr.some(x => x== "FAILED")) {
  return false
} else {
return newArr.join("");
}
}

console.log("Sript Convert to Roman loaded");


//For Enter press

document.getElementById("numToConvert")
    .addEventListener("keydown", function(event) {
    
    if (event.keyCode === 13) {
        document.getElementById("checkBtn").click();
        event.preventDefault();
    }
});

function convertNum(num) {
  let numToConvert = document.getElementById("numToConvert").value;
  console.log(convertToRoman(numToConvert))
  let convertedNum = convertToRoman(numToConvert);
  console.log("Converted num is:", convertedNum)
  let result = document.getElementById("result");
  let resultNum = document.getElementById("resultNum");
  let errorMsg = document.getElementById("error")  
  if (convertToRoman(numToConvert) == false) {
    errorMsg.style.display = "block";
    errorMsg.innerText  = "You should provide a whole number between 1 and 9999 !";
    result.style.display = "none";
    console.log("Errur", convertToRoman(numToConvert))
  } else {
    errorMsg.style.display = "none";
    result.style.display = "block"
    result.style.visibility = "visible"
    resultNum.textContent = convertedNum;
    resultNum.style.color = "green";
 
  console.log("convertToNum function")
  }
}
