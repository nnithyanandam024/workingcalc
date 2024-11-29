const display = document.getElementById("display");

let currentInput = "";

document.querySelector(".grid").addEventListener("click", (event) => {
  const btn = event.target;
  const value = btn.textContent;

  if (
    !btn.classList.contains("number") &&
    !btn.classList.contains("Operator") &&
    !btn.classList.contains("equal")
  ) {
    return;
  }

  if (btn.classList.contains("number")) {
    if (value === "." && currentInput.includes(".")) {
      return;
    }
    currentInput += value;
  } else if (btn.classList.contains("Operator")) {
    if (value === "AC") {
      currentInput = "";
    } else if (value === "←") {
      currentInput = currentInput.slice(0, -1);
    } else if (value === "%") {
      currentInput += "/100";
    } else {
      if (
        currentInput !== "" &&
        !["+", "-", "*", "/"].includes(currentInput.slice(-1))
      ) {
        currentInput += ` ${value} `;
      }
    }
  } else if (btn.classList.contains("equal")) {
    try {
      currentInput = calculateResult(currentInput);
    } catch (error) {
      currentInput = "Error";
    }
  }

  updateDisplay(currentInput);
});

function updateDisplay(input) {
  display.textContent = input || "0";
}

function calculateResult(input) {
  try {
    return eval(input);
  } catch (error) {
    return "Error";
  }
}
