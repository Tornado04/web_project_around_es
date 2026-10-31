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

const profileModal = document.querySelector("#edit-popup");
const profileModalCloseBtn = profileModal.querySelector(".popup__close");
const newCardAddBtn = document.querySelector(".profile__add-button");
const profileEditBtn = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileDesc = document.querySelector(".profile__description");
const newCardModal = document.querySelector("#new-card-popup");
const newCardModalCloseBtn = newCardModal.querySelector(".popup__close");
const newCardModalForm = newCardModal.querySelector("#new-card-form");
const viewModal = document.querySelector("#image-popup");
const viewModalImage = viewModal.querySelector(".popup__image");
const viewModalCaption = viewModal.querySelector(".popup__caption");
const viewModalCloseBtn = viewModal.querySelector(".popup__close");

const profileModalInputName = profileModal.querySelector(
  ".popup__input_type_name",
);
const profileModalInputDesc = profileModal.querySelector(
  ".popup__input_type_description",
);

const cardListTemplate = document
  .querySelector("#card-list-templeate")
  .content.querySelector(".card");

// DECLARACIÓN DE FUNCIONES

function openModal(element) {
  element.classList.add("popup_is-opened");
}

function closeModal(element) {
  element.classList.remove("popup_is-opened");
}

function handleOpenEditModal() {
  fillProfileForm();
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
  renderCard(
    newCardModal.querySelector(".popup__input_type_card-name").value,
    newCardModal.querySelector(".popup__input_type_url").value,
    document.querySelector(".cards__list"),
  );
}

//DETECTORES y MANEJADORES DE EVENTOS

profileEditBtn.addEventListener("click", handleOpenEditModal);
profileModalCloseBtn.addEventListener("click", () => closeModal(profileModal));
profileModal.addEventListener("submit", function (event) {
  handleProfileFormSubmit(event);
  closeModal(profileModal);
});

newCardAddBtn.addEventListener("click", () => openModal(newCardModal));
newCardModalCloseBtn.addEventListener("click", () => closeModal(newCardModal));
viewModalCloseBtn.addEventListener("click", () => closeModal(viewModal));
newCardModalForm.addEventListener("submit", function (event) {
  handleCardFormSubmit(event);
  closeModal(newCardModal);
});

// INSTRUCCIONES - MAIN

initialCards.forEach((cardDataObject) => {
  renderCard(
    cardDataObject.name,
    cardDataObject.link,
    document.querySelector(".cards__list"),
  );
});
