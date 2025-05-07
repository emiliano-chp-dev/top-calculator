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

  // ...
}

main();
