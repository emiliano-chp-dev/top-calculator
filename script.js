'use strict';

function main() {
  // DOM elements
  const [previousOperandElement, currentOperandElement] = [
    ...document.querySelectorAll('.__display-element'),
  ];
  const [clearBtn, deleteBtn, signBtn, equalsBtn] = [
    ...document.querySelectorAll('.__action'),
  ];
  const operands = [...document.querySelectorAll('.operand')];
  const operators = [...document.querySelectorAll('.operator')];

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
  }

  // Deletes last number in the current operand
  function del() {
    state.currentOperand = state.currentOperand.toString().slice(0, -1);
    currentOperandElement.innerText = state.currentOperand;
  }

  // Toggles the sign of the current operand
  function toggleSign() {
    if (state.currentOperand === '') return;
    state.currentOperand = (parseFloat(state.currentOperand) * -1).toString();
  }

  // Appends a number to the current operand
  function append(num) {
    if (num === '.' && state.currentOperand.includes('.')) return;
    state.currentOperand += num;
    currentOperandElement.innerText = state.currentOperand;
  }

  // Sets the operation and moves the current operand to the previous operand
  function operate(operation) {
    if (state.currentOperand === '') return;
    if (state.previousOperand !== '') compute();

    state.operation = operation;
    state.previousOperand = state.currentOperand;
    state.currentOperand = '';
  }

  // ...
}

main();
