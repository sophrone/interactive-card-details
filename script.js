const cardForm = document.querySelector("#card-form");
const numberInput = document.querySelector("#card-number-input");
const number = document.querySelector("#card-number");
const nameInput = document.querySelector("#card-name-input");
const cardHolderName = document.querySelector("#name");
const monthInput = document.querySelector("#month-input");
const yearInput = document.querySelector("#year-input");
const expMonth = document.querySelector("#exp-month");
const expYear = document.querySelector("#exp-year");
const cvcInput = document.querySelector("#cvc-input");
const cvc = document.querySelector("#cvc");
const confirmBtn = document.querySelector("#confirm");
const continueBtn = document.querySelector("#continue");
const inputError = document.querySelectorAll(".input-error");
const inputArr = document.querySelectorAll("input");

let isValid = [false];
let isEmpty = true;

const format = (num) => {
  try {
    let newNum = num.match(/.{1,4}/g).join(" ");
    return newNum;
  } catch (e) {
    console.error("empty number");
  }
};

cardForm.addEventListener("submit", (e) => {
  for (let i = 0; i < inputArr.length; i++) {
    if (validateNotEmpty(inputArr[i], inputError[i])) {
      isValid[i] = false;
      isEmpty = true;
    } else {
      validateNotEmpty(inputArr[i], inputError[i]);
      isEmpty = false;
    }
  }
  isValid.forEach((el) => {
    console.log(`isValid=${el}`);
  });
  if (!isValid.includes(false)) {
    console.log(`all data valid ${!isValid.includes(false)}`);
    cardForm.classList.toggle("hidden");
    confirmBtn.classList.toggle("hidden");
  }
});

numberInput.addEventListener("input", (e) => {
  validateCardNumber(numberInput, inputError[1]);
  number.textContent = format(numberInput.value);
});

nameInput.addEventListener("input", (e) => {
  validateName(nameInput, inputError[0]);
  cardHolderName.textContent = nameInput.value;
});

monthInput.addEventListener("input", (e) => {
  validateMonth(monthInput, inputError[2]);
  expMonth.textContent = monthInput.value;
});

yearInput.addEventListener("input", (e) => {
  validateYear(yearInput, inputError[3]);
  expYear.textContent = yearInput.value;
});

cvcInput.addEventListener("input", (e) => {
  validateCVC(cvcInput, inputError[4]);
  cvc.textContent = cvcInput.value;
});

continueBtn.addEventListener("click", (e) => {
  reset();
  cardForm.classList.toggle("hidden");
  confirmBtn.classList.toggle("hidden");
});

const reset = () => {
  inputArr.forEach((input) => {
    input.classList.remove("valid");
  });
  numberInput.value = "";
  nameInput.value = "";
  monthInput.value = "";
  yearInput.value = "";
  cvcInput.value = "";
};

const invalidData = (input, error) => {
  error.classList.add("visible");
  input.classList.add("error");
};

const validData = (input, error) => {
  error.classList.remove("visible");
  input.classList.remove("error");
  input.classList.add("valid");
};

const validateNotEmpty = (input, error) => {
  if (!input.value) {
    invalidData(input, error);
    input.placeholder = "";
    isEmpty = true;
  } else {
    isEmpty = false;
  }
  return isEmpty;
};

const validateName = (input, error) => {
  const regName = new RegExp("^[a-zA-Z]+ [a-zA-Z]+$");
  if (!regName.test(input.value)) {
    error.textContent = "Please enter your full name (first & last name).";
    invalidData(input, error);
    isValid[0] = false;
  } else {
    validData(input, error);
    isValid[0] = true;
  }
  return isValid[0];
};

const validateCardNumber = (input, error) => {
  const regCard = new RegExp("^[0-9]{13,19}$");
  if (!regCard.test(input.value)) {
    error.textContent = "Wrong format, numbers only.";
    invalidData(input, error);
    isValid[1] = false;
  } else {
    validData(input, error);
    isValid[1] = true;
  }
  return isValid[1];
};

const validateMonth = (input, error) => {
  const regMonth = new RegExp("^0[1-9]|1[0-2]$");
  if (!regMonth.test(input.value)) {
    error.textContent = "Invalid month, number should be between 1-12";
    invalidData(input, error);
    isValid[2] = false;
  } else {
    validData(input, error);
    isValid[2] = true;
  }
  return isValid[2];
};

const validateYear = (input, error) => {
  const regYear = new RegExp("^[2-9][0-9]$");
  if (!regYear.test(input.value)) {
    error.textContent = "Invalid year, number > 20";
    invalidData(input, error);
    isValid[3] = false;
  } else {
    validData(input, error);
    isValid[3] = true;
  }
  return isValid[3];
};

const validateCVC = (input, error) => {
  const regCVC = new RegExp("^[0-9][0-9][0-9]$");
  if (!regCVC.test(input.value)) {
    error.textContent = "3 numbers only!";
    invalidData(input, error);
    isValid[4] = false;
  } else {
    validData(input, error);
    isValid[4] = true;
  }
  return isValid[4];
};
