const display = document.getElementById("display");
const expression = document.getElementById("expression");
const buttons = document.querySelectorAll("button");

let current = "0";
let previous = null;
let operator = null;

function updateDisplay() {
  display.textContent = current;
}

function updateExpression() {
  if (previous !== null && operator !== null) {
    expression.textContent = `${previous} ${symbol(operator)}`;
  } else {
    expression.textContent = "";
  }
}

function symbol(op) {
  return {
    "+": "+",
    "-": "−",
    "*": "×",
    "/": "÷"
  }[op];
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.action;
    const op = button.dataset.operator;

    if (button.classList.contains("number")) {
      inputNumber(button.textContent);
    }

    if (button.classList.contains("dot")) {
      inputDot();
    }

    if (action === "clear") clearAll();
    if (action === "sign") toggleSign();
    if (action === "percent") percent();

    if (op) setOperator(op);
    if (button.classList.contains("equal")) calculate();
  });
});

function inputNumber(num) {
  current = current === "0" ? num : current + num;
  updateDisplay();
}

function inputDot() {
  if (!current.includes(".")) {
    current += ".";
    updateDisplay();
  }
}

function clearAll() {
  current = "0";
  previous = null;
  operator = null;
  updateDisplay();
  expression.textContent = "";
}

function toggleSign() {
  current = (parseFloat(current) * -1).toString();
  updateDisplay();
}

function percent() {
  current = (parseFloat(current) / 100).toString();
  updateDisplay();
}

function setOperator(op) {
  previous = current;
  operator = op;
  current = "0";
  updateExpression();
}

function calculate() {
  if (!operator || previous === null) return;

  const a = parseFloat(previous);
  const b = parseFloat(current);
  let result;

  switch (operator) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "*":
      result = a * b;
      break;
    case "/":
      result = a / b;
      break;
  }

  expression.textContent = `${previous} ${symbol(operator)} ${current}`;
  current = result.toString();
  previous = null;
  operator = null;
  updateDisplay();
}