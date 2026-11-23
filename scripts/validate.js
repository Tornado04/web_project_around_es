//DECLARACIONE Y FUNCIONES

const showInputError = (inputElement, errorMessage, modal) => {
  const errorElement = modal.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__error_visible");
};

const hideInputError = (inputElement, modal) => {
  const errorElement = modal.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.textContent = "";
  errorElement.classList.remove("popup__error_visible");
};

function hasInvalidInput(inputList) {
  return Array.from(inputList).some((input) => !input.validity.valid);
}

function toggleButtonState(inputs, submitButton) {
  const isInvalid = hasInvalidInput(inputs);
  submitButton.classList.toggle("popup__button_disabled", isInvalid);
  submitButton.disabled = isInvalid;
}

function getInputElements(modal) {
  return modal.querySelectorAll(".popup__input");
}

function getBtnElement(modal) {
  return modal.querySelector(".popup__button");
}

export function setEventListeners(modal) {
  const inputs = getInputElements(modal);
  inputs.forEach((input) => {
    input.addEventListener("input", function () {
      if (!input.validity.valid) {
        showInputError(input, input.validationMessage, modal);
      } else {
        hideInputError(input, modal);
      }
      toggleButtonState(inputs, getBtnElement(modal));
    });
  });
}

export function resetValidationForm(modal) {
  const inputs = getInputElements(modal);
  inputs.forEach((input) => hideInputError(input, modal));
  toggleButtonState(inputs, getBtnElement(modal));
}
