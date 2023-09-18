// Assignment code here


// Get references to the #generate element
var generateBtn = document.querySelector("#generate");
var password_array = ["","","","",""];
var randnum = [0,0,0]
var passwordfinal = "";
var passwordmiddle = "";

//Write HTML to remember Checkbox input
 


// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  var passlength = [];
  var passextra = [""]; //These are extra random alphanumerics to add onto the end of my password
  var coin = [];




  function generatePassword(){

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
      console.log("Number is checked")
    } else {
      password_array[3] = "";
    };

    if (special.checked == true){
      password_array[4] = chararray[Math.floor(Math.random()*chararray.length)];
      console.log("Special is checked")
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
      console.log(passextra);
      passwordmiddle = passwordmiddle + passextra;
    }

    //Time to select based on Lower and Upper Case criteria
    if (lowercase.checked == true && uppercase.checked == false){
      passwordmiddle = passwordmiddle.toLowerCase();
      console.log("Only Lowercase"); // Only allow lowercase
    } 
    else if (lowercase.checked == false && uppercase.checked == true){
      passwordmiddle = passwordmiddle.toUpperCase();
      console.log ("Only Uppercase");
    } //only allow uppercase
    else if (lowercase.checked == true && uppercase.checked == true){
      for (let i = 0; i< passwordmiddle.length; i++){
        coin = Math.floor(Math.random()*2); //Make a simple coin flip to simulate a 50/50 chance of upper or lower
        if (coin === 0){
        passwordmiddle = passwordmiddle.replace(passwordmiddle.charAt(i),passwordmiddle.charAt(i).toLowerCase());
        console.log("Heads");
        }
        else {
          passwordmiddle = passwordmiddle.replace(passwordmiddle.charAt(i),passwordmiddle.charAt(i).toUpperCase());
          console.log("Tails");
        }  
      }
    } // Do the coin flip for each character in the string
    
    else if (lowercase.checked == false && uppercase.checked == false){
      passwordmiddle = ["Invalid Selection Criteria, Please Try Again"]; //You have to pick something
    }
    

    passwordfinal = passwordmiddle; //the final conversion to string

    // The Code below is just to double check for undefined values
    /*for (var i = 0; i < password_array.length; i++) {
      if (typeof password_array[i] === 'undefined') {
        console.log("password_array"+[i] + " is undefined")
      }
    };

    if (typeof passwordfinal === 'undefined') {
      console.log("password is undefined")
    }
      else{
      console.log(typeof passwordfinal);
    };*/
  }


  console.log(passwordfinal);
  passwordText.value = passwordfinal;
  passwordText.textContent = passwordfinal;

};

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

var slider = document.getElementById("passlength");
var output = document.getElementById("passlengthout");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
};


