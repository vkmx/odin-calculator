let num1        = null;
let num2        = null;
let operator    = null;
let expression  = [];
let calculated  = false;


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

    if( calculated ) return;

    operationContainer.textContent = sign;
}

function updateDisplayExpression() {

    if( calculated ) return;

    let currentDigits = digitsContainer.textContent;

    if( expression.length > 1 ) {
        let lastItem = expression.pop();

        if( digitsContainer.dataset.isCalculated && num2 === null ) {
            expression.push( operator );
        } else {
            expression.push( lastItem );
            expression.push( currentDigits );
            expression.push( operator );
        }

    }

    if( expression.length === 0 ) {
        expression.push( currentDigits );
        expression.push( operator );
    }

    if( operator === '=' ) expression.pop();

    expressionContainer.textContent = expression.join('');;
}

function clearDisplayAndVariables() {

    operationContainer.textContent  = '';
    digitsContainer.textContent     = '';
    expressionContainer.textContent = '';

    num1        = null;
    num2        = null;
    operator    = null;
    expression  = [];

}

function clearDigitsContainer() {
    digitsContainer.textContent = '';
}

function hanldeOperatorButtonClicks( op ) {

    if( calculated ) return;

    let currentOperator = operator;

    operator = op;

    updateDisplayExpression();

    if( currentOperator !== null && num1 !== null && num2 !== null ) {

        if( num2 === 0 && currentOperator === '÷' ) {
            clearDisplayAndVariables();
            updateDisplayDigits( 'Just Whyy!' );
            //operator = op;
            return;
        }

        let result = operate( num1, num2, currentOperator );
        num1 = result;
        num2 = null;
        clearDigitsContainer();
        updateDisplayDigits( result );
        if( operator === '=' ) calculated = true;
        digitsContainer.setAttribute( 'data-is-calculated', true );

    }



}

function hanldeNumberButtonClicks( element ) {

    if( operator === null ) {
        updateDisplayDigits( element.textContent );
        num1 = Number( digitsContainer.textContent );
        calculated = false;
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
        digitsContainer.removeAttribute( 'data-is-calculated ');
    }

}

function handleKeyboardEntries( event ) {

    let id              = '';
    let key             = event.key;
    let operatorKeys    = [ '+', '-', '*', '/', '=', 'Enter' ];

    if( parseInt( key ) ) {
        id = `#num${key}`;
    }

    if( key === '.' ) {
        id = '#num-decimal';
    }

    if( operatorKeys.includes( key ) ) {

        event.preventDefault();

        if( key === '+' ) id = '#op-add';
        if( key === '-' ) id = '#op-sub';
        if( key === '*' ) id = '#op-mlt';
        if( key === '/' ) id = '#op-div';
        if( key === '=' ) id = '#op-eql';
        if( key === 'Enter' ) id = '#op-eql';

    }

    if( id !== '' ) {

        let button = document.querySelector(id);
        if( button ) button.click();
    }

}

keypadContainer.addEventListener( 'click', ( event ) => {

    if( event.target.className === 'number' ) {
        hanldeNumberButtonClicks( event.target );
    }

    if( event.target.className === 'operator' ) {
        updateDisplayOperator( event.target.textContent );
        hanldeOperatorButtonClicks( event.target.textContent );
    }


} );

clearButton.addEventListener( 'click', ( event ) => {
    clearDisplayAndVariables();
} );


document.body.addEventListener( 'keydown', ( event ) => {
    handleKeyboardEntries( event );
} )