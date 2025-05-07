'use strict';

function main() {
  // DOM elements
  const [previousOperandElement, currentOperandElement] = [
    ...document.querySelectorAll('.__display-element'),
  ];
  //   const [clearBtn, deleteBtn, signBtn, equalsBtn] = [
  //     ...document.querySelectorAll('.__action'),
  //   ];
  //   const operands = [...document.querySelectorAll('.operand')];
  //   const operators = [...document.querySelectorAll('.operator')];
  const calculatorElement = document.querySelector('.calculator');

  // Handles state
  const state = {
    previousOperand: '',
    currentOperand: '',
    operation: undefined,
  };

  // Clears state
  function clear() {
    state.previousOperand = '';
    state.currentOperand = '';
    state.operation = undefined;
    previousOperandElement.innerText = '';
    currentOperandElement.innerText = '';
    updateDisplay();
  }

  // Deletes last number in the current operand
  function del() {
    state.currentOperand = state.currentOperand.toString().slice(0, -1);
    currentOperandElement.innerText = state.currentOperand;
    updateDisplay();
  }

  // Toggles the sign of the current operand
  function toggleSign() {
    if (state.currentOperand === '') return;
    state.currentOperand = (parseFloat(state.currentOperand) * -1).toString();
    updateDisplay();
  }

  // Appends a number to the current operand
  function append(num) {
    if (num === '.' && state.currentOperand.includes('.')) return;
    state.currentOperand += num;
    currentOperandElement.innerText = state.currentOperand;
    updateDisplay();
  }

  // Sets the operation and moves the current operand to the previous operand
  function operate(operation) {
    if (state.currentOperand === '') return;
    if (state.previousOperand !== '') compute();

    state.operation = operation;
    state.previousOperand = state.currentOperand;
    state.currentOperand = '';
    updateDisplay();
  }

  // Handles computation
  function compute() {
    let computation;
    const prev = parseFloat(state.previousOperand);
    const curr = parseFloat(state.currentOperand);

    if (isNaN(prev) || isNaN(curr)) return;

    if (curr === 0 && state.operation === '/') {
      alert('Cannot divide by 0');
      clear();
      return;
    }

    switch (state.operation) {
      case '+':
        computation = prev + curr;
        break;
      case '-':
        computation = prev - curr;
        break;
      case '*':
        computation = prev * curr;
        break;
      case '/':
        computation = prev / curr;
        break;
      default:
        return;
    }

    state.currentOperand = round(computation).toString();
    state.previousOperand = '';
    state.operation = undefined;
    updateDisplay();
  }

  // Rounds a number
  function round(num) {
    return Math.round(num * 1000) / 1000;
  }

  // Formats a number with commas
  function separate(num) {
    const stringNumber = num.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];

    let integerDisplay = isNaN(integerDigits)
      ? ''
      : integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });

    if (decimalDigits !== undefined)
      return `${integerDisplay}.${decimalDigits}`;
    else return integerDisplay;
  }

  // Updates the display
  function updateDisplay() {
    currentOperandElement.innerText = separate(state.currentOperand);
    previousOperandElement.innerText = state.operation
      ? `${separate(state.previousOperand)} ${state.operation}`
      : '';
  }

  // Delegate events
  function delegateEvents() {
    calculatorElement.addEventListener('click', event => {
      let target = event.target;

      if (target.classList.contains('clear')) {
        clear();
      } else if (target.classList.contains('delete')) {
        del();
      } else if (target.classList.contains('sign')) {
        compute();
      } else if (target.id === 'equals') {
        compute();
      } else if (target.classList.contains('operand')) {
        append(target.innerText);
      } else if (target.classList.contains('operator')) {
        operate(target.innerText);
      }
    });
  }

  delegateEvents();

  // ...
}

main();
