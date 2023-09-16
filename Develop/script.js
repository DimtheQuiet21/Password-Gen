// Assignment code here


// Get references to the #generate element
var generateBtn = document.querySelector("#generate");
var password_array = [];
var randnum = [0,0,0]
var passwordfinal = "";

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  
  function generatePassword(){

    password_array[0] = adjarray[Math.floor(Math.random()*adjarray.length)];
    password_array[1] = animalarray[Math.floor(Math.random()*animalarray.length)];
    password_array[2] = verbarray[Math.floor(Math.random()*verbarray.length)];
    if (password_array[2].charAt(password_array[2].length -1) === "e"){
      password_array[2] = password_array[2].slice(0,-1);
    }
    password_array[2] = password_array[2] + "ing";
    password_array[3] = (Math.floor(Math.random()*100));

    password_array[4] = chararray[Math.floor(Math.random()*chararray.length)];

    passwordfinal = password_array[0]+password_array[1]+password_array[2]+password_array[3]+password_array[4];

    for (var i = 0; i < password_array.length; i++) {
      if (typeof password_array[i] === 'undefined') {
        console.log("password_array"+[i] + " is undefined")
      }
    };

    if (typeof passwordfinal === 'undefined') {
      console.log("password is undefined")
    }
      else{
      console.log(typeof passwordfinal);
    };
  }

  console.log(passwordfinal);
  passwordText.value = passwordfinal;
  passwordText.textContent = passwordfinal;

};

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
