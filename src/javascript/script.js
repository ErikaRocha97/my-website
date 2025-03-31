// ! Funções

function createElement(name, elements = [], attributes = null) {
  if (!Array.isArray(elements) && typeof elements !== "string") {
    [elements, attributes] = [attributes, elements];
    if (elements === null) {
      elements = "";
    }
  }
  const el = document.createElement(name);
  for (const prop in attributes) {
    const attr = attributes[prop];
    if (prop === "style") {
      for (const stl in attr) {
        el.style[stl] = attr[stl];
      }
    } else {
      el.setAttribute(prop, attr);
    }
  }
  // array of elements
  if (Array.isArray(elements) && elements.at(0) instanceof HTMLElement) {
    el.append(...elements);
    // raw HTML
  } else if (typeof elements === "string") {
    el.innerHTML = elements;
    // single element
  } else if (elements instanceof HTMLElement) {
    el.append(elements);
  }
  return el;
}

const giftForm = document.querySelector("#add__gift");
const addGiftButton = document.querySelector("#add__giftButton");
const giftNameInput = document.querySelector("#gift-name");
const giftImageInput = document.querySelector("#gift-image");
const giftStoreInput = document.querySelector("#gift-store");
const giftPriceInput = document.querySelector("#gift-price");
const giftContainer = document.querySelector("#gift__container");

let gifts = [];

addGiftButton.addEventListener("click", (event) => {
  console.log("Executou");

  event.preventDefault();

  // Pegar informações do formulário
  const giftName = giftNameInput.value;
  const giftImage = giftImageInput.value;
  const giftStore = giftStoreInput.value;
  const giftPrice = giftPriceInput.value;

  // Adicionar card no HTML
  const cE = createElement;

  const card = cE("div", { class: "gift-card" }, [
    cE("img", { src: giftImage, class: "gift-image" }),
    cE("div", { class: "gift-info" }, [
      cE("a", { href: giftStore }, [
        cE("span", { class: "gift-name" }, giftName),
      ]),
      cE("span", { class: "gift-price" }, giftPrice),
    ]),
    cE("button", { class: "btn-default" }, "Presentear"),
  ]);

  giftContainer.appendChild(card);

  gifts.push({
    name: giftName,
    image: giftImage,
    store: giftStore,
    price: giftPrice,
  });

  localStorage.setItem("gifts", JSON.stringify(gifts));

  giftNameInput.value = "";
  giftImageInput.value = "";
  giftStoreInput.value = "";
  giftPriceInput.value = "";
});

window.onload = () => {
  const giftsOnLocalStorage = localStorage.getItem("gifts");
  if (!giftsOnLocalStorage) return;

  // converte String em objeto. Conteúdo do locastorage colocado no array.
  gifts = JSON.parse(giftsOnLocalStorage);

  gifts.forEach((t) => {
    const cE = createElement;
    const card = cE("div", { class: "gift-card" }, [
      cE("img", { src: t.image, class: "gift-image" }),
      cE("div", { class: "gift-info" }, [
        cE("a", { href: t.store }, [
          cE("span", { class: "gift-name" }, t.name),
        ]),
        cE("span", { class: "gift-price" }, t.price),
      ]),
      cE("button", { class: "btn-default" }, "Presentear"),
    ]);

    giftContainer.appendChild(card);
  });
};
