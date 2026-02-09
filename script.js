const character = document.getElementById("character");
const gifts = Array.from(document.querySelectorAll(".gift"));
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modalImage");
const modalIcon = document.getElementById("modalIcon");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const closeButton = document.querySelector(".close");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");
const actionBtn = document.getElementById("actionBtn");

const pathY = (xPercent) => 65 - xPercent * 0.5;
let position = 6;

const giftsData = {
  1: {
    title: "Our first hello",
    text: "A memory that still makes me smile.",
    icon: "🌸",
    image: "assets/memory-1.svg",
  },
  2: {
    title: "Late-night talks",
    text: "Every word felt like starlight.",
    icon: "✨",
    image: "assets/memory-2.svg",
  },
  3: {
    title: "The tiny surprises",
    text: "Little moments that mean everything.",
    icon: "🎁",
    image: "assets/memory-3.svg",
  },
  4: {
    title: "The future",
    text: "Ready for every step up the hill together.",
    icon: "💌",
    image: "assets/memory-4.svg",
  },
};

function updateCharacter() {
  const clamped = Math.min(95, Math.max(5, position));
  position = clamped;
  const y = pathY(clamped);
  character.style.left = `${clamped}%`;
  character.style.bottom = `${y}%`;
}

function findNearbyGift() {
  return gifts.find((gift) => {
    const giftLeft = parseFloat(gift.style.left);
    return Math.abs(giftLeft - position) < 6;
  });
}

function openGift(gift) {
  const data = giftsData[gift.dataset.gift];
  modalImage.src = data.image;
  modalImage.alt = data.title;
  modalIcon.textContent = data.icon;
  modalTitle.textContent = data.title;
  modalText.textContent = data.text;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
}

function handleAction() {
  const gift = findNearbyGift();
  if (gift) {
    openGift(gift);
  }
}

function move(delta) {
  position += delta;
  updateCharacter();
}

updateCharacter();

document.querySelector(".scene").addEventListener("mousemove", (event) => {
  const bounds = event.currentTarget.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width - 0.5;
  const y = (event.clientY - bounds.top) / bounds.height - 0.5;
  event.currentTarget.style.transform = `rotateY(${x * 6}deg) rotateX(${y * -4}deg)`;
});

document.querySelector(".scene").addEventListener("mouseleave", (event) => {
  event.currentTarget.style.transform = "";
});

gifts.forEach((gift) => {
  const giftLeft = parseFloat(gift.style.left);
  gift.style.bottom = `${pathY(giftLeft)}%`;
  gift.addEventListener("click", () => openGift(gift));
});

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    move(2.5);
  }
  if (event.key === "ArrowLeft") {
    move(-2.5);
  }
  if (event.key.toLowerCase() === "e") {
    handleAction();
  }
  if (event.key === "Escape") {
    closeModal();
  }
});

leftBtn.addEventListener("click", () => move(-2.5));
rightBtn.addEventListener("click", () => move(2.5));
actionBtn.addEventListener("click", handleAction);

closeButton.addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});
