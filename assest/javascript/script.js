
const passwordDisplay = document.getElementById("passwordDisplay");
const copyBtn = document.getElementById("copyBtn");
const copyFlag = document.getElementById("copyFlag");

const rangeSlider = document.getElementById("rangeSlider");
const rangeValue = document.getElementById("rangeValue");

const upper = document.getElementById("upper");
const lower = document.getElementById("lower");
const number = document.getElementById("number");
const symbole = document.getElementById("symbole");

const strength = document.getElementById("strength");
const genBtn = document.getElementById("genBtn");



//password length show
var passwordLength = rangeSlider.value;
rangeValue.innerText = rangeSlider.value;
rangeSlider.addEventListener("input", () => {
    rangeValue.innerText = rangeSlider.value;
    passwordLength = rangeSlider.value;
})


//strength Check
function setStrength(color) {
    strength.style.backgroundColor = color;
    strength.style.boxShadow = "0 0 20px " + color;
}

function checkStrength() {
    let hasUpper = upper.checked ? true : false;
    let hasLower = lower.checked ? true : false;
    let hasNumber = number.checked ? true : false;
    let hasSymbole = symbole.checked ? true : false;

    if (hasUpper && hasLower && (hasNumber || hasSymbole) && passwordLength >= 8) {
        setStrength("rgb(0, 255, 0)");
    }
    else if ((hasUpper || hasLower) && (hasNumber || hasSymbole) && passwordLength >= 6) {
        setStrength("rgb(255, 184, 52)");
    }
    else {
        setStrength("rgb(255, 53, 53)");
    }
}

//password Generater
const upperLetter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetter = "abcdefghijklmnopqrstuvwxyz";
const numbersLetter = "0123456789";
const symbolesLetter = "!@#$%^&*_-[]{}()<>,.?\|/";


function randomPassword(passwordLength) {
    let passwordLetters = "";
    let password = "";

    passwordLetters += upper.checked ? upperLetter : "";
    passwordLetters += lower.checked ? lowerLetter : "";
    passwordLetters += number.checked ? numbersLetter : "";
    passwordLetters += symbole.checked ? symbolesLetter : "";

    for (let a = 0; a < passwordLength; a++) {
        password += passwordLetters.charAt(Math.round(Math.random() * passwordLetters.length));
    }
    return password;
}

// copyBtn.addEventListener("click", () => {
//     if (passwordDisplay.value != "" || passwordDisplay.length > 0) {
//         copyFlag.innerText = "Copied";
//         copyBtn.innerText = "check";
//     }
//     else{
//         copyFlag.innerText = "failed";
//     }

//     if (copyFlag.style.display == "block") {
//         copyFlag.style.display = "none";
//     }
//     else {
//         copyFlag.style.display = "block";
//     }

//     if (copyFlag.style.display == "block") {
//         setTimeout(() => {
//             copyFlag.style.display = "none";
//             copyBtn.innerText = "content_copy";
//         }, 1000);
//     }


// });

async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e) {
        copyMsg.innerText = "Failed";
    }
    //to make copy wala span visible
    copyMsg.classList.add("active");

    setTimeout( () => {
        copyMsg.classList.remove("active");
    },2000);

}

genBtn.addEventListener("click", () => {
    checkStrength();

    let upperPass = randomPassword(passwordLength);
    passwordDisplay.value = upperPass;
})