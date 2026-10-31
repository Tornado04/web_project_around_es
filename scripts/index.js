const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

initialCards.forEach((card) => console.log(card.name));

//DECLARACIÓN DE  VARIABLES QUE REF NODOS DE ELEMENTOS DEL DOM
const profileEditBtn = document.querySelector(".profile__edit-button");
const profileModal = document.querySelector("#edit-popup");
const profileModalCloseBtn = profileModal.querySelector(".popup__close");

const profileModalInputName = profileModal.querySelector(
  ".popup__input_type_name",
);
const profileModalInputDesc = profileModal.querySelector(
  ".popup__input_type_description",
);
const profileTitle = document.querySelector(".profile__title");
const profileDesc = document.querySelector(".profile__description");

const cardListContainer = document.querySelector(".cards__list");
const cardTemplate = document
  .querySelector("#cardTempleate")
  .content.querySelector(".card");

const profileAddCardBtn = document.querySelector(".profile__add-button");
const cardModal = document.querySelector("#new-card-popup");
const cardModalCloseBtn = cardModal.querySelector(".popup__close");
const newCardModalForm = cardModal.querySelector("#new-card-form");
// DECLARACIÓN DE FUNCIONES

function openModal(element) {
  element.classList.add("popup_is-opened");
}

function closeModal(element) {
  element.classList.remove("popup_is-opened");
}

function fillProfileForm() {
  profileModalInputName.value = profileTitle.textContent;
  profileModalInputDesc.value = profileDesc.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(profileModal);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileModalInputName.value;
  profileDesc.textContent = profileModalInputDesc.value;
}

function getCardElement(
  name = "Sin título",
  link = "./images/placeholder.jpg",
) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;
  return cardElement;
}

function renderCard(name, link, container) {
  container.prepend(getCardElement(name, link));
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const cardInputName = cardModal.querySelector(".popup__input_type_card-name");
  const cardInputLink = cardModal.querySelector(".popup__input_type_url");
  renderCard(cardInputName.value, cardInputLink.value, cardListContainer);
}

//DETECTORES DE EVENTOS CON MANEJADORES

profileEditBtn.addEventListener("click", handleOpenEditModal);

profileModalCloseBtn.addEventListener("click", () => closeModal(profileModal));

profileModal.addEventListener("submit", function (event) {
  handleProfileFormSubmit(event);
  closeModal(profileModal);
});

profileAddCardBtn.addEventListener("click", () => openModal(cardModal));
cardModalCloseBtn.addEventListener("click", () => closeModal(cardModal));

newCardModalForm.addEventListener("submit", function (event) {
  handleCardFormSubmit(event);
  closeModal(cardModal);
});

// INSTRUCCIONES - MAIN

initialCards.forEach((cardData) => {
  renderCard(cardData.name, cardData.link, cardListContainer);
});
