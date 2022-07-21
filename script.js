const ac = document.getElementById("AC");
const display = document.getElementById("display");
const digits = document.querySelectorAll(".digit");
const backBtn = document.getElementById("backspace");
const operands = document.querySelectorAll('.operand');
const equalBtn = document.querySelector('.evaluate');
const plusMinusBtn = document.getElementById("plus-minus");


let displayValue = 0;
let op1 = 0;
let op2 = 0;
let secondOperand = false;
let operand = "";
let negValue = false;
let startFresh = false;


display.textContent = displayValue;

//clear button
ac.addEventListener("click", clearBtn);

// display digit 
digits.forEach(btn => {
    btn.addEventListener("click", displayDigit);
});

//backspace 
backBtn.addEventListener("click", removeDigit);

//operate
operands.forEach(opBtn => {
    opBtn.addEventListener("click",
        function () {
            setOperand(opBtn.innerHTML);
        });
});

function setOperand(op) {
    // changeDisplay();
    display.textContent = "";
    //displayValue =0;
    negValue = false;

    secondOperand = true;
    if (op === 'x<sup>y</sup>') operand = "^";
    else operand = op;

}

//evaluate 
equalBtn.addEventListener("click",
    function () {
        evaluate();
    });

function evaluate() {
    if (op1 !== 0 && op2 !== 0 && operand !== "" && secondOperand === true) {
        let res = operate(operand, op1, op2);
        let op = [op1, operand, op2, res];
        clearBtn();
        display.textContent = `${op[0]} ${op[1]} ${op[2]} = ${op[3]}`
        displayValue = res;
        op1 = res;
    }
}

plusMinusBtn.onclick = function () {
    display.textContent *= -1;
    displayValue = display.textContent;

    negValue = true;
    changeExpression();
};

function changeDisplay() {
    display.textContent = "";
    displayValue = 0;
}
function removeDigit() {
    let displayContent = displayValue.toString();
    displayContent = displayContent.slice(0, -1);
    displayValue = displayContent;
    display.textContent = displayValue;

    changeExpression(); // chnage operators 

}

function addDigit(digit) {
    // for overflow of text
    if ((document.getElementById('display').scrollWidth) > (document.getElementById('display').offsetWidth)) {
        return;
    }

    if ((display.textContent.includes('='))) display.textContent = ""; //clear display before evaluating next expression
    if (display.textContent === "0") {
        console.log("zero");
        display.textContent = "";
        displayValue = 0;
    }

    if ((display.textContent).includes('.') === false) {
        display.textContent += digit;
    }
    else if (display.textContent.includes('.') === true && digit !== '.')
        display.textContent += digit;

    displayValue = display.textContent;

    // for overflow of text
    if ((document.getElementById('display').scrollWidth) > (document.getElementById('display').offsetWidth)) {
        removeDigit();
    }

}
function displayDigit(e) {
    addDigit(e.target.innerHTML);
    changeExpression(); // chnage operators 
}

function changeExpression() {
    if (secondOperand === false) {
        op1 = display.textContent;
    }
    if (op1 !== 0 && secondOperand === true) {
        op2 = display.textContent;
    }
}
function clearBtn() {
    display.textContent = "0";
    op1 = 0;
    op2 = 0;
    operand = "";
    secondOperand = false;
    displayValue = 0;
    negValue = false;
    startFresh = true;
}

function onKeyPress(e) {
    var keynum;

    if (window.event) { // IE                  
        keynum = e.keyCode;
    } else if (e.which) { // Netscape/Firefox/Opera                 
        keynum = e.which;
    }

    if (e.key === 'Backspace') removeDigit(); // backspace 
    else if (e.key === '+' || e.key === '-' || e.key === '/' || e.key === '*' || e.key === '^') setOperand(e.key);
    else if (e.key === '=' || e.key === 'Enter') evaluate();
    else {
        let pressedKey = String.fromCharCode(keynum);
        if (pressedKey >= 0 && pressedKey <= 9) addDigit(pressedKey);
    }
    changeExpression(); // chnage operators 
}

window.addEventListener('keydown', onKeyPress);

function add(a, b) {
    return (Number(a) + Number(b)).toFixed(2);
}
function subtract(a, b) {
    return (Number(a) - Number(b)).toFixed(2);
}
function multiply(a, b) {
    return (Number(a) * Number(b)).toFixed(2);
}
function divide(a, b) {
    return (Number(a) / Number(b)).toFixed(2);;
}

function operate(operator, operand1 = 0, operand2 = 0) {
    let result = 0;
    switch (operator) {
        case "+":
            result = add(operand1, operand2);
            break;
        case "-":
            result = subtract(operand1, operand2);
            break;
        case "*":
            result = multiply(operand1, operand2);
            break;
        case "/":
            if (operand2 == 0) result = "Math Error";
            else result = divide(operand1, operand2);
            break;
        case "^":
            result = Math.pow(operand1, operand2);
            break;
        default:
            break;
    }
    return result;
}

