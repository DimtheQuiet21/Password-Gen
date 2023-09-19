// Assignment code here


// Get references to the #generate element
var selectionBtn = document.querySelector("#selection");
var generateBtn = document.querySelector("#generate");
var password_array = ["","","","",""];
var randnum = [0,0,0]
var passwordmiddle = "";
var slider = document.getElementById("passlength");
var output = document.getElementById("passlengthout");

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
};

//Select the Password Criteria

function validatelength(userLength){
  if (passstartlen < 8 || passstartlen > 128){
    alert("Please select a password length between 8 and 128 characters");
    return '';
    
  } else {
    return true;
  }
}

function validatecriteria(userCriteria){
  if (lowertoggle === true || uppertoggle === true || numbertoggle === true|| specialtoggle === true){
    return true;}
  else {
    alert("Please select at least one valid criteria");
    return '';
  }
}

function selectCriteria(){

  passstartlen = prompt("Please select a password length between 8 and 128 characters");
  lowertoggle = confirm("Would you like to include lowercase letters?")
  uppertoggle =  confirm("Would you like to include uppercase letters?");
  numbertoggle = confirm("Would you like to include numbers?");
  specialtoggle = confirm("Would you like to include special characters?");

  if (validatelength() && validatecriteria()){
    output.innerHTML= passstartlen;
    document.getElementById("passlength").value = passstartlen;
    document.getElementById("generate").style.display = "inline-block";
    document.getElementById("selection").style.display = "none";
    document.getElementById("criteriablock").setAttribute("style", "display:flex");
    lowercase.checked = lowertoggle;
    uppercase.checked = uppertoggle;
    special.checked = specialtoggle;
    numbers.checked = numbertoggle;
  }
  
  

}


// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  var passlength = [];
  var passextra = ''; //These are extra random alphanumerics to add onto the end of my password
  var coin = [];
  ; // Always reset the passwordmiddle to blank before generating a new password

  function generatePassword(){
  passwordmiddle = ''; // reset the password to blank
    // First Let's cover the Odd Cases of ONLY numbers/special characters
    if (lowercase.checked == false && uppercase.checked == false){
      if (numbers.checked == true && special.checked == true){
        for (let i = 0; i< slider.value; i++){
        coin = Math.floor(Math.random()*2); //Make a simple coin flip to simulate a 50/50 chance of number or character;
        if (coin === 0){
          passwordmiddle = passwordmiddle + (Math.floor(Math.random()*10));
          //console.log("Heads"); // Heads is a number
          }
          else {
            passwordmiddle = passwordmiddle + chararray[Math.floor(Math.random()*chararray.length)];
            //console.log("Tails"); //Tails is a character
          }  
        }
      } else if (numbers.checked == false && special.checked == true) {
        for (let i = 0; i< slider.value; i++){
        passwordmiddle = passwordmiddle + chararray[Math.floor(Math.random()*chararray.length)];
        }
      } else if (numbers.checked == true && special.checked == false) {
        for (let i = 0; i< slider.value; i++){
        passwordmiddle = passwordmiddle + (Math.floor(Math.random()*10));
        }
      }
    }

    // Now we cover the cases where we have letters
    if (lowercase.checked == true || uppercase.checked == true){
      password_array[0] = adjarray[Math.floor(Math.random()*adjarray.length)];
      password_array[1] = animalarray[Math.floor(Math.random()*animalarray.length)];
      password_array[2] = verbarray[Math.floor(Math.random()*verbarray.length)];
      if (password_array[2].charAt(password_array[2].length -1) === "e"){
        password_array[2] = password_array[2].slice(0,-1);
      }
      password_array[2] = password_array[2] + "ing";

      // This section of the function checks for the criteria boxes

      if (numbers.checked == true){
        password_array[3] = (Math.floor(Math.random()*100));
        //console.log("Number is checked")
      } else {
        password_array[3] = "";
      };

      if (special.checked == true){
        password_array[4] = chararray[Math.floor(Math.random()*chararray.length)];
        //console.log("Special is checked")
      } else {
          password_array[4] = "";
        }
      
      passwordmiddle = password_array[0]+password_array[1]+password_array[2]+password_array[3]+password_array[4]; 

      passlength = passwordmiddle.length;
      if (passlength > slider.value){
        passwordmiddle = passwordmiddle.slice((passlength-slider.value),passlength); // slice off the front of the string to match the length of the password. automatically keep any applied numbers and letters
      } else if (passlength < slider.value){
        passextra = randarray[Math.floor(Math.random()*randarray.length)]; //starting value for the extra characters
        for (let i = 0; i< (slider.value - passlength -1); i++){
        passextra = passextra + randarray[Math.floor(Math.random()*randarray.length)];
        }
        //console.log(passextra);
        passwordmiddle = passwordmiddle + passextra;
      }

      //Time to select based on Lower and Upper Case criteria
      if (lowercase.checked == true && uppercase.checked == false){
        passwordmiddle = passwordmiddle.toLowerCase();
        //console.log("Only Lowercase"); // Only allow lowercase
      } 
      else if (lowercase.checked == false && uppercase.checked == true){
        passwordmiddle = passwordmiddle.toUpperCase();
        //console.log ("Only Uppercase");
      } //only allow uppercase
      else if (lowercase.checked == true && uppercase.checked == true){
        for (let i = 0; i< passwordmiddle.length; i++){
          coin = Math.floor(Math.random()*2); //Make a simple coin flip to simulate a 50/50 chance of upper or lower for each letter
          if (coin === 0){
          passwordmiddle = passwordmiddle.replace(passwordmiddle.charAt(i),passwordmiddle.charAt(i).toLowerCase());
          //console.log("Heads");
          }
          else {
            passwordmiddle = passwordmiddle.replace(passwordmiddle.charAt(i),passwordmiddle.charAt(i).toUpperCase());
            //console.log("Tails");
          }  
        }
      }
    }


    if (lowercase.checked == false && uppercase.checked == false && numbers.checked == false && special.checked == false){
      passwordmiddle = ["Invalid Selection Criteria, Please Try Again"]; //You have to pick something
    }

    return passwordmiddle;

  }
  
  console.log(password);
  passwordText.value = password;
  passwordText.textContent = password;
 
};


// Add event listener to generate button
selectionBtn.addEventListener("click", selectCriteria);
generateBtn.addEventListener("click", writePassword);
output.innerHTML = slider.value; // Display the default slider value




