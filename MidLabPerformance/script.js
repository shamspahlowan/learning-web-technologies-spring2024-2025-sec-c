const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

let current = '';
let previous = '';
let operator = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');

    // If it's a number or a dot
    if (!isNaN(value) || value === '.') {
      current += value;
      display.value = current;
    }
    // If it's an operator
    else if (['+', '-', '*', '/', '%'].includes(value)) {
      if (current === '') return;
      operator = value;
      previous = current;
      current = '';
    }
    // If equals is pressed
    else if (value === '=') {
      if (previous === '' || current === '' || operator === '') return;

      const a = parseFloat(previous);
      const b = parseFloat(current);
      let result = 0;

      if (operator === '+') result = a + b;
      else if (operator === '-') result = a - b;
      else if (operator === '*') result = a * b;
      else if (operator === '/') result = b !== 0 ? a / b : 'Error';
      else if (operator === '%') result = a % b;

      display.value = result;
      current = result.toString();
      previous = '';
      operator = '';
    }
    else if (value === 'AC') {
      current = '';
      previous = '';
      operator = '';
      display.value = '';
    }
    else if (value === 'DEL') {
      current = current.slice(0, -1);
      display.value = current;
    }
  });
});
