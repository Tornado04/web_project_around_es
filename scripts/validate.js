//DECLARACION DE FUNCIONES
const showInputError = (form, inputElement, errorMessage) => {
  const errorElement = form.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__error_visible");
};

const hideInputError = (form, inputElement) => {
  const errorElement = form.querySelector(`#${inputElement.id}-error`);
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

export function setEventListeners(form, inputs, submitButton) {
  inputs.forEach((input) => {
    input.addEventListener("input", function () {
      if (!input.validity.valid) {
        showInputError(form, input, input.validationMessage);
      } else {
        hideInputError(form, input);
      }
      toggleButtonState(inputs, submitButton);
    });
  });
}

export function resetValidationForm(inputs) {
  inputs.forEach((input) => {
    hideInputError(input);
  });
}

/*form.addEventListener("submit", (event) => {
  let formValid = true;

  inputs.forEach((input) => {
    if (!input.validity.valid) {
      showInputError(input, input.validationMessage);
      formValid = false;
    }
  });

  if (!formValid) {
    event.preventDefault();
  }
});*/
