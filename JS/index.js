const calculator = {
  displayValue: "0",
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue =
      displayValue === "0" ? digit : displayValue + digit;
  }
}

function inputDecimal(dot) {
  if (calculator.waitingForSecondOperand === true) {
    calculator.displayValue = "0.";
    calculator.waitingForSecondOperand = false;
    return;
  }

  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}

function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    return;
  }

  if (firstOperand == null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);

    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
}

function calculate(firstOperand, secondOperand, operator) {
  if (operator === "+") {
    return firstOperand + secondOperand;
  } else if (operator === "-") {
    return firstOperand - secondOperand;
  } else if (operator === "*") {
    return firstOperand * secondOperand;
  } else if (operator === "/") {
    return firstOperand / secondOperand;
  }

  return secondOperand;
}

function resetCalculator() {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
}

function updateDisplay() {
  const display = document.querySelector(".calculator-screen");
  display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector(".calculator-keys");
keys.addEventListener("click", (event) => {
  const { target } = event;
  const { value } = target;
  if (!target.matches("button")) {
    return;
  }

  switch (value) {
    case "+":
    case "-":
    case "*":
    case "/":
    case "=":
      handleOperator(value);
      break;
    case ".":
      inputDecimal(value);
      break;
    case "all-clear":
      resetCalculator();
      break;
    default:
      if (Number.isInteger(parseFloat(value))) {
        inputDigit(value);
      }
  }

  updateDisplay();
});

//history________________________________________________________________________

const calculatorLog = {
  displayValue: "-",
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

function inputDigitToLog(digit) {
  const { displayValue, waitingForSecondOperand } = calculatorLog;

  if (waitingForSecondOperand === true) {
    calculatorLog.displayValue = digit;
    calculatorLog.waitingForSecondOperand = false;
  } else {
    calculatorLog.displayValue =
      displayValue === "-" ? digit : displayValue + digit;
  }
}

function inputDecimalToLog(dot) {
  if (calculatorLog.waitingForSecondOperand === true) {
    calculatorLog.displayValue = "0.";
    calculatorLog.waitingForSecondOperand = false;
    return;
  }
  if (!calculatorLog.displayValue.includes(dot)) {
    calculatorLog.displayValue += dot;
  }
}

function handleOperatorToLog(nextOperator) {
  const { firstOperand, displayValue, operator } = calculatorLog;
  const inputValue = parseFloat(displayValue);

  if (operator && calculatorLog.waitingForSecondOperand) {
    calculatorLog.operator = nextOperator;
    return;
  }

  if (firstOperand == null && !isNaN(inputValue)) {
    calculatorLog.firstOperand = inputValue;
  } else if (operator) {
    const resultLog = calculateLog(firstOperand, inputValue, operator);

    calculatorLog.displayValue = `${parseFloat(resultLog.toFixed(7))}`;
    calculatorLog.firstOperand = resultLog;
  }

  calculatorLog.waitingForSecondOperand = true;
  calculatorLog.operator = nextOperator;
}

function calculateLog(firstOperand, secondOperand, operator) {
  if (operator === "+") {
    return firstOperand + secondOperand;
  } else if (operator === "-") {
    return firstOperand - secondOperand;
  } else if (operator === "*") {
    return firstOperand * secondOperand;
  } else if (operator === "/") {
    return firstOperand / secondOperand;
  }

  return secondOperand;
}

function resetCalculatorLog() {
  calculatorLog.displayValue = "-";
  calculatorLog.firstOperand = null;
  calculatorLog.waitingForSecondOperand = false;
  calculatorLog.operator = null;
}

function updateLogDisplay() {
  const displayLog = document.querySelector(".history-screen");
  displayLog.value = calculatorLog.displayValue;
}

updateLogDisplay();

const keysToLog = document.querySelector(".calculator-keys");
keysToLog.addEventListener("click", (event) => {
  const { target } = event;
  const { value } = target;
  if (!target.matches("button")) {
    return;
  }

  switch (value) {
    case "+":
    case "-":
    case "*":
    case "/":
    case "=":
      handleOperatorToLog(value);
      break;
    case ".":
      inputDecimalToLog(value);
      break;
    case "log-clear":
      resetCalculatorLog();
      break;
    default:
      if (Number.isInteger(parseFloat(value))) {
        inputDigitToLog(value);
      }
  }
  updateLogDisplay();
});
