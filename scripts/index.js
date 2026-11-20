import initialCards from "./data.js";
import { setEventListeners, resetValidationForm } from "./validate.js";

//DECLARACIÓN DE  VARIABLES QUE REF NODOS DE ELEMENTOS DEL DOM

const profileEditBtn = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileDesc = document.querySelector(".profile__description");

const profileModal = document.querySelector("#edit-popup");
const profileModalCloseBtn = profileModal.querySelector(".popup__close");
const profileModalInputName = profileModal.querySelector(
  ".popup__input_type_name",
);
const profileModalInputDesc = profileModal.querySelector(
  ".popup__input_type_description",
);

const newCardAddBtn = document.querySelector(".profile__add-button");
const newCardModal = document.querySelector("#new-card-popup");
const newCardModalCloseBtn = newCardModal.querySelector(".popup__close");
const newCardModalSaveBtn = newCardModal.querySelector(".popup__button");
const newCardModalForm = newCardModal.querySelector("#new-card-form");
const newCardUrlInput = newCardModal.querySelector(".popup__input_type_url");
const newCardNameInput = newCardModal.querySelector(
  ".popup__input_type_card-name",
);

const viewModal = document.querySelector("#image-popup");
const viewModalImage = viewModal.querySelector(".popup__image");
const viewModalCaption = viewModal.querySelector(".popup__caption");
const viewModalCloseBtn = viewModal.querySelector(".popup__close");

const cardsListContainer = document.querySelector(".cards__list");
const cardListTemplate = document
  .querySelector("#card-list-templeate")
  .content.querySelector(".card");

// DECLARACIÓN DE FUNCIONES

function openModal(modalElement) {
  modalElement.classList.add("popup_is-opened");
  document.addEventListener("keydown", addKeydowEvent(modalElement));
  document.addEventListener("click", addClickEvent());
}

function closeModal(modalElement) {
  modalElement.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", addKeydowEvent());
  document.removeEventListener("click", addClickEvent());
  resetValidationForm(modalElement);
}

function addKeydowEvent(modal) {
  return function (event) {
    if (event.key === "Escape") {
      closeModal(modal);
    }
  };
}

function addClickEvent() {
  return function (event) {
    if (event.target.classList.contains("popup")) {
      closeModal(event.target);
    }
  };
}

function handleOpenEditModal() {
  fillProfileForm();
  setEventListeners(profileModal);
  openModal(profileModal);
}

function fillProfileForm() {
  profileModalInputName.value = profileTitle.textContent;
  profileModalInputDesc.value = profileDesc.textContent;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileModalInputName.value;
  profileDesc.textContent = profileModalInputDesc.value;
}

function showImage(name, link) {
  viewModalCaption.textContent = name;
  viewModalImage.src = link;
  viewModalImage.alt = name;
  openModal(viewModal);
}

function getCardElement(
  name = "Sin título",
  link = "./images/placeholder.jpg",
) {
  const cardElement = cardListTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");
  const cardLikeBtn = cardElement.querySelector(".card__like-button");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");
  cardImageElement.src = link;
  cardImageElement.alt = name;
  cardTitleElement.textContent = name;
  cardImageElement.addEventListener("click", () => showImage(name, link));
  cardDeleteBtn.addEventListener("click", () => cardElement.remove());
  cardLikeBtn.addEventListener("click", () =>
    cardLikeBtn.classList.toggle("card__like-button_is-active"),
  );
  return cardElement;
}

function renderCard(name, link, cardListContainer) {
  cardListContainer.prepend(getCardElement(name, link));
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderCard(newCardNameInput.value, newCardUrlInput.value, cardsListContainer);
}

//DETECTORES y MANEJADORES DE EVENTOS

profileEditBtn.addEventListener("click", handleOpenEditModal);
profileModalCloseBtn.addEventListener("click", () => closeModal(profileModal));
profileModal.addEventListener("submit", function (event) {
  handleProfileFormSubmit(event);
  closeModal(profileModal);
});

newCardModalCloseBtn.addEventListener("click", () => closeModal(newCardModal));
newCardAddBtn.addEventListener("click", () => {
  newCardModalForm.reset();
  newCardModalSaveBtn.classList.add("popup__button_disabled");
  newCardModalSaveBtn.disabled = true;
  setEventListeners(newCardModal);
  openModal(newCardModal);
});

viewModalCloseBtn.addEventListener("click", () => closeModal(viewModal));
newCardModalForm.addEventListener("submit", function (event) {
  handleCardFormSubmit(event);
  closeModal(newCardModal);
});

// INSTRUCCIONES - MAIN

initialCards.forEach((cardDataObject) => {
  renderCard(cardDataObject.name, cardDataObject.link, cardsListContainer);
});
