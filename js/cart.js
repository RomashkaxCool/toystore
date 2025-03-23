let cart = [];

// Відкриття та закриття модального вікна кошика
const modal = document.getElementById("cartModal");
const openBtn = document.getElementById("openCart");
const closeBtn = document.querySelector(".close");
const checkoutBtn = document.getElementById("checkout"); // Кнопка оформлення замовлення


openBtn.onclick = function () {
  modal.style.display = "block";
  updateCartUI();
};

closeBtn.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// Додавання товару в кошик
function addToCart(productId, productName, productPrice) {
  const existingProduct = cart.find(item => item.id === productId);
  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({ id: productId, name: productName, price: parseFloat(productPrice), quantity: 1 });
  }
  updateCartUI();
}

// Оновлення кошика
function updateCartUI() {
  const cartItems = document.getElementById("cartItems");
  const totalPriceElement = document.getElementById("totalPrice"); // Елемент для суми
  cartItems.innerHTML = "";
  let totalPrice = 0;

  cart.forEach(item => {
    totalPrice += item.price * item.quantity; // Додаємо вартість товару до загальної суми
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - ${item.price} грн (x${item.quantity})
      <button class="decrease-quantity" data-id="${item.id}">➖</button>
      <button class="increase-quantity" data-id="${item.id}">➕</button>
      <button class="remove-item" data-id="${item.id}">❌</button>
    `;
    cartItems.appendChild(li);
  });

  // Оновлення суми
  totalPriceElement.textContent = `Загальна сума: ${totalPrice.toFixed(2)} грн`;
}

// Обробка кліків по кнопкам у кошику
document.getElementById("cartItems").addEventListener("click", function (event) {
  const productId = event.target.getAttribute("data-id");

  if (event.target.classList.contains("remove-item")) {
    cart = cart.filter(item => item.id !== productId);
  }
  else if (event.target.classList.contains("increase-quantity")) {
    const product = cart.find(item => item.id === productId);
    if (product) product.quantity++;
  }
  else if (event.target.classList.contains("decrease-quantity")) {
    const product = cart.find(item => item.id === productId);
    if (product) {
      product.quantity--;
      if (product.quantity <= 0) {
        cart = cart.filter(item => item.id !== productId);
      }
    }
  }
  updateCartUI();
});
function showAlert(message) {
  const alertBox = document.createElement("div");
  alertBox.classList.add("custom-alert");
  alertBox.textContent = message;
  document.body.appendChild(alertBox);

  alertBox.style.opacity = "1";
  setTimeout(() => {
    alertBox.style.transition = "opacity 0.5s";
    alertBox.style.opacity = "0";
    setTimeout(() => alertBox.remove(), 500);
  }, 2000);
}

// Обробник натискання на "Оформити замовлення"
checkoutBtn.onclick = function () {
  if (cart.length === 0) {
    showAlert("Кошик порожній! Додайте товари.");
  } else {
    showAlert("Замовлення оформлено!");
    cart = []; // Очищаємо кошик після замовлення
    updateCartUI();
    modal.style.display = "none"; // Закриваємо модальне вікно
  }
};
