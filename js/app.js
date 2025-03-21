document.addEventListener("DOMContentLoaded", function () {
  fetch('data/products.json')
    .then(response => response.json())
    .then(products => {
      const productList = document.getElementById("product-list");
      products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
                    <img src="${product.img}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.price}</p>
                    <button class="button_cart">Додати в кошик</button>
                `;
        productList.appendChild(productDiv);
      });
    })
    .catch(error => console.error('Помилка завантаження товарів', error));

  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("button_cart")) {
      const message = document.createElement("div");
      message.classList.add("custom-alert");
      message.textContent = "Товар додано в кошик!";
      document.body.appendChild(message);

      message.style.opacity = "1";
      setTimeout(() => {
        message.style.transition = "opacity 0.5s";
        message.style.opacity = "0";
        setTimeout(() => message.remove(), 500);
      }, 2000);
    }
  });
});
