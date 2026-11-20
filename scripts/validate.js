//DECLARACIONE Y FUNCIONES
let activeModalElement;
const showInputError = (inputElement, errorMessage) => {
  const errorElement = activeModalElement.querySelector(
    `#${inputElement.id}-error`,
  );
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__error_visible");
};

const hideInputError = (inputElement) => {
  const errorElement = activeModalElement.querySelector(
    `#${inputElement.id}-error`,
  );
  inputElement.classList.remove("popup__input_type_error");
  errorElement.textContent = "";
  errorElement.classList.remove("popup__error_visible");
};

function hasInvalidInput(inputList) {
  return Array.from(inputList).every((input) => input.validity.valid);
}

function toggleButtonState(inputs, submitButton) {
  const allValid = hasInvalidInput(inputs);
  if (!allValid) {
    submitButton.classList.add("popup__button_disabled");
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove("popup__button_disabled");
    submitButton.disabled = false;
  }
}

function getInputElements(modal) {
  return modal.querySelectorAll(".popup__input");
}

function getBtnElement(modal) {
  return modal.querySelector(".popup__button");
}

export function setEventListeners(modal) {
  activeModalElement = modal;
  const inputs = getInputElements(modal);
  inputs.forEach((input) => {
    input.addEventListener("input", function () {
      if (!input.validity.valid) {
        showInputError(input, input.validationMessage);
      } else {
        hideInputError(input);
      }
      toggleButtonState(inputs, getBtnElement(modal));
    });
  });
}

export function resetValidationForm(modal) {
  activeModalElement = modal;
  getInputElements(modal).forEach((input) => {
    hideInputError(input);
  });
}
