//? Storing all elements
//! Password-copy-section
let pwdTextbox = document.getElementById('pwd-textbox')
let pwdCopyBtn = document.getElementById('copy-pwd-btn')

//! Copy Password -> msg
let copyMsg = document.querySelector('.copy-msg')

//! Password-creation-section
let pwdLength = document.getElementById('pwd-length-num')
let pwdSlider = document.getElementById('slider')

//! Checkboxes
let lowercase = document.getElementById('pwd-lowercase')
let uppercase = document.getElementById('pwd-uppercase')
let number = document.getElementById('pwd-number')
let symbol = document.getElementById('pwd-symbol')

//! Generate Button
let pwdStrengthColor = document.getElementById('pwd-strength-num')
let submitBtn = document.getElementById('submit-btn')
let submitQuestionMark = document.getElementById('submit-btn-question-mark')
let symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/'


let min = pwdSlider.getAttribute('min')
let max = pwdSlider.getAttribute('max')

let passwordLength = 1
let pwdSuccessful  = false

let checkedBoxes = 0
let tempStrengthColor = '#C5C5C5'

function main() {
    passwordLength = pwdSlider.value = pwdLength.textContent = min

    pwdSlider.addEventListener('input', function() {
        passwordLength = pwdLength.textContent = pwdSlider.value
        makeSlideChanges()
    })

    lowercase.addEventListener('click', function() {
        checkedBoxes += lowercase.checked ? +1 : -1;
        makeSlideChanges()
    })

    uppercase.addEventListener('click', function() {
        checkedBoxes += uppercase.checked ? +1 : -1;
        makeSlideChanges()
    })

    number.addEventListener('click', function() {
        checkedBoxes += number.checked ? +1 : -1;
        makeSlideChanges()
    })
    
    symbol.addEventListener('click', function() {
        checkedBoxes += symbol.checked ? +1 : -1;
        makeSlideChanges()
    })

    submitBtn.addEventListener('click', function() {
        if(tempStrengthColor != '#C5C5C5') {
            submitBtnMain()
            pwdSuccessful = true
        }
        else {  
            pwdTextbox.removeAttribute('value')
            pwdSuccessful = false
        }

        console.log(checkedBoxes)
    })

    pwdCopyBtn.addEventListener('click', copyMessage)
}

async function copyMessage() {
    if(pwdSuccessful) 
    {
        try {
            await navigator.clipboard.writeText(pwdTextbox.value)
            copyMsg.textContent = "Text Copied"
        }
        catch {
            copyMsg.textContent = "Failed"
        }
    }
    else
    {
        copyMsg.textContent = "No Content"
    }
    copyMsg.classList.add('copy-active')
    
    if(copyMsg.classList.contains('copy-active')) {
        setTimeout(function() {
            copyMsg.classList.remove('copy-active')
        }, 1000)
    }
}

function makeSlideChanges() {
    if(pwdSlider.value < checkedBoxes) {
        pwdSlider.value = checkedBoxes
        passwordLength = checkedBoxes
        pwdLength.textContent = checkedBoxes
    }

    strengthColor()
}

function randomGenerator(lower, upper) {
    return Math.floor(Math.random() * (upper - lower)) + lower
}

function getRandomNumber() {
    return randomGenerator(0, 9)
}

function getRandomLowercase() {
    let random = randomGenerator(97, 123)
    return String.fromCharCode(random)
}

function getRandomUppercase() {
    let random = randomGenerator(65, 91)
    return String.fromCharCode(random)
}

function getRandomSymbol() {
    let random = randomGenerator(0, symbols.length)
    return symbols.charAt(random)
}

function setColor(color) {
    pwdStrengthColor.style.backgroundColor = color
    pwdStrengthColor.style.boxShadow = `0px 0px 12px 1px ${color}`

    return color
}

function strengthColor() {
    let lowerCase = lowercase.checked
    let upperCase = uppercase.checked
    let pwdNumber = number.checked
    let pwdSymbol = symbol.checked

    if((lowerCase && upperCase && pwdNumber && pwdSymbol && passwordLength >= 8))             //! For green color
    {            
        tempStrengthColor = setColor("#0f0")
    }
    else if((lowerCase || upperCase) && (pwdNumber || pwdSymbol) && passwordLength >= 8)    //! For green color
    {
        tempStrengthColor = setColor('#0f0')
    }
    else if((lowerCase || upperCase) && (pwdNumber || pwdSymbol) && passwordLength >= 6)    //! For Yellow color
    {
        tempStrengthColor = setColor('#ff0')
    }
    else if(!lowerCase && !upperCase && !pwdNumber && !pwdSymbol)                           //! For Grey color
    {
        tempStrengthColor = setColor('#C5C5C5')
    }
    else if(passwordLength <= 4 || (lowerCase || upperCase || pwdNumber || pwdSymbol))      //! For Red color
    {
        tempStrengthColor = setColor('#f00')
    }
}  

function generatePassword() {
    let collection = []
    let len = passwordLength
    let temp = 0

    for(let i = 0; i < 4 * len; i++) 
    {
        if(lowercase.checked) {
            temp = getRandomLowercase()
            collection.push(temp)
        }

        if(uppercase.checked) {
            temp = getRandomUppercase()
            collection.push(temp)
        }

        if(number.checked) {
            temp = getRandomNumber()
            collection.push(temp)
        }

        if(symbol.checked) {
            temp = getRandomSymbol()
            collection.push(temp)
        }
    }

    return collection
}

function submitBtnMain() {
    let collection = generatePassword()
    let password = ""
    let len = passwordLength

    for(let i = 0; i < len; i++)
    {
        let index = randomGenerator(0, passwordLength)
        password += collection[index]
    }

    pwdTextbox.defaultValue = password
}

main()          //! Main Function call

