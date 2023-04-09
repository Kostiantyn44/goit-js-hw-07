import { galleryItems } from "./gallery-items.js";

// Change code below this line

function createGalleryCard(items) {
  return items
    .map(({ preview, original, description }) => {
      return `
            <li class="gallery__item">
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

  const galleryImage = event.target.parentNode;
  const originalImageSrc = galleryImage.getAttribute("href");
  const imageAlt = galleryImage.querySelector("img").getAttribute("alt");

  const modal = basicLightbox.create(`
      <div class="modal">
        <img src="${originalImageSrc}" alt="${imageAlt}" />
        <button type="button" class="modal__close">Close</button>
      </div>
    `);

  modal.show();

  const modalCloseBtn = modal.element().querySelector(".modal__close");
  modalCloseBtn.addEventListener("click", modal.close);

  modal.element().addEventListener("click", (event) => {
    if (event.target === modal.element()) {
      modal.close();
    }
  });

  const modalImage = modal.element().querySelector("img");
  modalImage.addEventListener("click", modal.close);
}
