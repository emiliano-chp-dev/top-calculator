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

  function clear() {
    state.previousOperand = '';
    state.currentOperand = '';
    state.operation = undefined;
    previousOperandElement.innerText = '';
    currentOperandElement.innerText = '';
  }

  function del() {
    state.currentOperand = state.currentOperand.toString().slice(0, -1);
    currentOperandElement.innerText = state.currentOperand;
  }

  function toggleSide() {
    if (state.currentOperand === '') return;
    state.currentOperand = (parseFloat(state.currentOperand) * -1).toString();
  }

  function append(num) {
    if (num === '.' && state.currentOperand.includes('.')) return;
    state.currentOperand += num;
    currentOperandElement.innerText = state.currentOperand;
  }

  // ...
}

main();
