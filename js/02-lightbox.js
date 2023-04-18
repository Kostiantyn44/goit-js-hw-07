import { galleryItems } from "./gallery-items.js";

function createGalleryCard(items) {
  return items
    .map(({ preview, original, description }) => {
      return `
        <li class="gallery__item simple-lightbox">
          <a class="gallery__link" href="${original}">
            <img
              class="gallery__image"
              src="${preview}"
              data-source="${original}"
              alt="${description}"
            />
          </a>
        </li>`;
    })
    .join("");
}

const cardsContainer = document.querySelector("ul.gallery");
const cardsMarkup = createGalleryCard(galleryItems);
cardsContainer.insertAdjacentHTML("beforeend", cardsMarkup);

cardsContainer.addEventListener("click", onGalleryItemClick);

function onGalleryItemClick(event) {
  event.preventDefault();

  const isGalleryItem =
    event.target.classList.contains("gallery__image") ||
    event.target.parentNode.classList.contains("gallery__image");
  if (!isGalleryItem) {
    return;
  }

  const gallery = new SimpleLightbox(".gallery a", {
    elementsSelector: ".gallery__item:not(.simple-lightbox)",
    docClose: false,
    history: false,
    fadeSpeed: 100,
    disableScroll: false,
    captionsData: "alt",
    captionDelay: 250,
  });
}
