let num1        = null;
let num2        = null;
let operator    = null;
let expression  = null;


let keypadContainer     = document.querySelector('.keypad');
let digitsContainer     = document.querySelector('.digits');
let operationContainer  = document.querySelector('.operation > .sign');
let expressionContainer = document.querySelector('.operation > .expression');
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
        case 'x':
            result = multiply();
            break;
        case '÷':
            result = divide()
            break;
    }

    let formatted = Number.parseFloat(result).toFixed(2);

    return Number.parseFloat( formatted );
}

function decimalPlacePresentInText( text ) {

    if( text.indexOf( '.' ) > -1 ) {
        return true;
    }

    return false;
}

function updateDisplayDigits( number ) {

    let currentContent  = digitsContainer.textContent;

    if( number === '.' && decimalPlacePresentInText( currentContent ) ) {
        return;
    }

    digitsContainer.textContent = currentContent + number;
}

function updateDisplayOperator( sign ) {
    operationContainer.textContent = sign;
}

function updateDisplayExpression() {

}

function clearDisplayAndVariables() {

    operationContainer.textContent  = '';
    digitsContainer.textContent     = '';

    num1        = null;
    num2        = null;
    operator    = null;

}

function clearDigitsContainer() {
    digitsContainer.textContent = '';
}

function hanldeOperatorButtonClicks( element ) {

    if( operator !== null && num1 !== null && num2 !== null ) {

        if( num2 === 0 && operator === '÷' ) {
            clearDisplayAndVariables();
            updateDisplayDigits( 'Just Whyy!' );
            operator = element.textContent;
            return;
        }

        let result = operate( num1, num2, operator );
        num1 = result;
        num2 = null;
        clearDigitsContainer();
        updateDisplayDigits( result );

    }

    operator = element.textContent;

}

function hanldeNumberButtonClicks( element ) {

    if( operator === null ) {
        updateDisplayDigits( element.textContent );
        num1 = Number( digitsContainer.textContent );
        return;
    }

    if( operator === '=' ) {
        clearDisplayAndVariables();
        hanldeNumberButtonClicks( element );
    }

    if( operator !== null && num2 === null ) {
        clearDigitsContainer();
        updateDisplayDigits( element.textContent );
        num2 = Number( digitsContainer.textContent );
        return;
    }

    if( operator !== null && num2 !== null ) {
        updateDisplayDigits( element.textContent );
        num2 = Number( digitsContainer.textContent );
    }

}

keypadContainer.addEventListener( 'click', ( event ) => {

    if( event.target.className === 'number' ) {
        hanldeNumberButtonClicks( event.target );
    }

    if( event.target.className === 'operator' ) {
        updateDisplayOperator( event.target.textContent );
        hanldeOperatorButtonClicks( event.target );
    }


} );

clearButton.addEventListener( 'click', ( event ) => {
    clearDisplayAndVariables();
} );