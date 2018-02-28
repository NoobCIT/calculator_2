const buttons = document.forms["calculator"].getElementsByTagName("input");
const screen = document.getElementById("screen");
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-1", "-2", "-3", "-4", "-5", "-6", "-7", "-8", "-9", "."];
const operations = ["+", "-", "x", "/"];

let display = "";
let isNumHere = false;
let maxLength = false;
let isOpsHere = false;

[...buttons].forEach(function(button) {
  button.addEventListener("click", pushButton);
});

function pushButton() {
  const userInput = this.value;
  clear(userInput);
  checkLength();
  if (numbers.includes(userInput)) {
    allowNum(userInput);
  } else {
    allowOps(userInput);
  }
}

function isValid() {
  var numContainer = [];
  var answer = [];
  var ops = [];
  if (display[0] == "-") {
    temp = display.slice(0, 2);
    display = display.slice(2, display.length).split("");
    display.unshift(temp);
  } else {
      display = display.split("");
  }
  while (display.length > 0) {
    if (numbers.includes(display[0])) {
      numContainer.push(display.shift());
    } else if (["x", "-", "/", "+"].includes(display[0])) {
      answer.push(numContainer);
      numContainer = [];
      ops.push(display.shift());
    }
  }
  answer.push(numContainer);
  var first;
  var second;
  while (ops.length > 0) {
    first = parseFloat(answer.shift().join(""));
    second = parseFloat(answer.shift().join(""));
    operation = ops.shift();
    switch (operation) {
      case "x":
        first *= second;
        break;
      case "+":
        first += second;
        break;
      case "-":
        first -= second;
        break;
      case "/":
        first /= second;
        break;
    }
    answer.unshift([first]);
  }
  display = answer.pop().join("");
  screen.innerHTML = display;
}

function allowNum(input) {
    if (!maxLength) {
      isNumHere = true;
      isOpsHere = false;
      display += input;
      screen.innerHTML = display;
    }
};

function allowOps(input) {
  if (input == "=" && isNumHere) {
    isValid();
    return;
  }
  if (isNumHere && !isOpsHere) {
    isOpsHere = true;
    display += input;
    screen.innerHTML = display;
  }
}

function checkLength() {
  if (display.length == 16) {
    maxLength = true;
    return;
  }
}

function clear(input) {
  if (input == "c") {
    display = "";
    isNumHere = false;
    isOpsHere = false;
    maxLength = false;
    screen.innerHTML = display;
    return;
  }
}
