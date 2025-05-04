let num1        = null;
let num2        = null;
let operator    = null;


let keypadContainer     = document.querySelector('.keypad');
let digitsContainer     = document.querySelector('.digits');
let operationContainer  = document.querySelector('.operation');
let clearButton         = document.querySelector('.clear > button');

function add() {
    return num1 + num2;
}

function substract() {
    return num1 - num2;
}

function multiply() {
    return num1 * num2;
}

function divide() {

    if( num2 === 0 ) return 'Undefined';
    return num1 / num2;
}

function operate( number1, number2, operator ) {
    num1 = number1;
    num2 = number2;
    operator = operator;
    let result = 0;

    switch( operator ) {
        case '+':
            result = add();
            break;
        case '-':
            result = substract();
            break;
        case '*':
            result = multiply();
            break;
        case '/':
            result = divide()
            break;
    }

    return result;
}

function updateDisplayDigits( element ) {

    let currentContent = digitsContainer.textContent;
    digitsContainer.textContent = currentContent + element.textContent;
}

function updateDisplayOperation( element ) {
    operationContainer.textContent = element.textContent;
}

function clearDisplayAndVariables() {

    operationContainer.textContent  = '';
    digitsContainer.textContent     = '';

    num1        = null;
    num2        = null;
    operator    = null;

}

keypadContainer.addEventListener( 'click', ( event ) => {

    if( event.target.className === 'number' ) {
        updateDisplayDigits( event.target );
    }

    if( event.target.className === 'operator' ) {
        updateDisplayOperation( event.target );
    }


} );

clearButton.addEventListener( 'click', ( event ) => {
    clearDisplayAndVariables();
} );