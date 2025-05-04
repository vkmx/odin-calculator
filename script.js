let num1 = 0;
let num2 = 0;
let operator = null;

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