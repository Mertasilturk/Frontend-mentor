const shoppingCartIcon = document.querySelector(".cart");
const shoppingCart = document.querySelector(".cart-box");
const lightBox = document.querySelector(".click-img");
const mainImage = document.querySelector(".main-img");
const lightBoxCloser = document.querySelector(".close-slider");
const lightBoxImage = document.querySelector(".click-image-src");
const next = document.querySelector(".next");
const previous = document.querySelector(".previous");
const thumbImage = document.querySelectorAll(".preview-img");
const plus = document.querySelector(".plus");
const minus = document.querySelector(".minus");
const amount = document.querySelector(".amount");
const amountButton = document.querySelector(".buttons");
const addToCart = document.querySelector(".add-cart-btn");
const indicator = document.querySelector(".indicator");
const cartContent = document.querySelector(".cart-content");
const mobileNext = document.querySelector(".mobile-next");
const mobilePrevious = document.querySelector(".mobile-previous");
const mobileImage = document.querySelector(".main-img");
const mobileMenu = document.querySelector(".nav-menu");
const mobileMenuClose = document.querySelector(".close-btn");
const mobileNav = document.querySelector(".nav-links");
const navOverlay = document.querySelector(".overlay");

let imageCount = 1;
let amountCount = 0;
let currentCartValue = 0;

function cartUpdate() {
  indicator.classList.remove("hidden");
  currentCartValue += amountCount;
  indicator.innerHTML = currentCartValue;
  if (amountCount > 0) {
    cartContent.innerHTML = "";
    const total = 125.0 * currentCartValue;

    cartContent.innerHTML = `<div class="product">
                  <div class="product-container">
                    <img src="./images/image-product-1-thumbnail.jpg" class="product-img" alt="product" >
                    <div class="product-info">
                      <p class="product-title">Fall Limited Edition Sneakers</p>
                      <p class="product-price"><span>$125.00</span> × <span class="number">${currentCartValue}</span> <b>$${total}</b></p>
                    </div>
                    <button class="delete-btn" onclick="deleteCart()">
                    <img src="./images/icon-delete.svg" alt="delete" class="delete-img">
                    </button>
                  </div>
                  <button class="checkout-btn">Checkout</button>
                </div>`;
  }
}

function deleteCart() {
  cartContent.innerHTML = "";
  cartContent.innerHTML = ` <p class="cart-empty margin-top" >Your cart is empty</p>`;
  indicator.classList.add("hidden");
  currentCartValue = 0;
}

function updateAmount() {
  amountCount += this;
  amountCount = Math.max(amountCount, 0);
  amount.innerHTML = amountCount;
}

function mobileNavUpdate() {
  this.classList.toggle("mobile-overlay");
}

function mobileNavMenu() {
  this.classList.toggle("mobile-nav");
}

function togglelist() {
  this.classList.toggle("hidden");
}

thumbImage.forEach((e) => {
  e.addEventListener("click", function () {
    const imageId = e.dataset.id;
    const targetImage = lightBox.classList.contains("hidden")
      ? mainImage
      : lightBoxImage;
    targetImage.src = `./images/image-product-${imageId}.jpg`;
  });
});

function nextImage() {
  imageCount = imageCount === 4 ? 1 : imageCount + 1;
  lightBoxImage.src = `./images/image-product-${imageCount}.jpg`;
  mobileImage.src = `./images/image-product-${imageCount}.jpg`;
}

function prevImage() {
  imageCount = imageCount === 1 ? 4 : imageCount - 1;
  lightBoxImage.src = `./images/image-product-${imageCount}.jpg`;
  mobileImage.src = `./images/image-product-${imageCount}.jpg`;
}

mobileMenuClose.addEventListener("click", mobileNavMenu.bind(mobileNav));
mobileMenu.addEventListener("click", mobileNavMenu.bind(mobileNav));
mobilePrevious.addEventListener("click", prevImage);
mobileNext.addEventListener("click", nextImage);
previous.addEventListener("click", prevImage);
next.addEventListener("click", nextImage);
shoppingCartIcon.addEventListener("click", togglelist.bind(shoppingCart));
mainImage.addEventListener("click", togglelist.bind(lightBox));
lightBoxCloser.addEventListener("click", togglelist.bind(lightBox));
minus.addEventListener("click", updateAmount.bind(-1));
plus.addEventListener("click", updateAmount.bind(1));
addToCart.addEventListener("click", cartUpdate);
mobileMenu.addEventListener("click", mobileNavUpdate.bind(navOverlay));
mobileMenuClose.addEventListener("click", mobileNavUpdate.bind(navOverlay));
