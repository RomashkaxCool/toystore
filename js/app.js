document.addEventListener("DOMContentLoaded", function () {
  let products = [];

  // Завантаження товарів з JSON
  fetch('data/products.json')
    .then(response => response.json())
    .then(data => {
      products = data;
      const productList = document.getElementById("product-list");
      const ageFilter = document.getElementById("ageFilter");
      const searchInput = document.getElementById("searchInput");

      // Отримуємо унікальні вікові категорії
      const uniqueAges = [...new Set(products.map(product => product.ageCategory))];

      // Додаємо опції у фільтр
      uniqueAges.forEach(age => {
        const option = document.createElement("option");
        option.value = age;
        option.textContent = age;
        ageFilter.appendChild(option);
      });

      // Функція для рендерингу товарів
      function renderProducts(filteredProducts) {
        productList.innerHTML = ""; // Очищаємо список товарів
        filteredProducts.forEach(product => {
          const productDiv = document.createElement("div");
          productDiv.classList.add("product");
          productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Ціна: ${product.price} грн</p>
            <p>Вік: ${product.ageCategory}</p>
            <button class="button_cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">Додати в кошик</button>
          `;
          productList.appendChild(productDiv);
        });
      }

      // Викликаємо рендеринг для всіх товарів
      renderProducts(products);

      // Фільтрація за віком
      ageFilter.addEventListener("change", function () {
        const selectedAge = ageFilter.value;
        const filteredByAge = selectedAge === "all"
          ? products
          : products.filter(product => product.ageCategory === selectedAge);

        const searchTerm = searchInput.value.toLowerCase();
        const filteredProducts = filteredByAge.filter(product =>
          product.name.toLowerCase().includes(searchTerm)
        );

        renderProducts(filteredProducts);
      });

      // Пошук за назвою
      searchInput.addEventListener("input", function () {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredByAge = ageFilter.value === "all"
          ? products
          : products.filter(product => product.ageCategory === ageFilter.value);

        const filteredProducts = filteredByAge.filter(product =>
          product.name.toLowerCase().includes(searchTerm)
        );

        renderProducts(filteredProducts);
      });
    })
    .catch(error => console.error('Помилка завантаження товарів', error));

  // Обробка натискання кнопки "Додати в кошик"
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("button_cart")) {
      const productId = event.target.getAttribute("data-id");
      const productName = event.target.getAttribute("data-name");
      const productPrice = event.target.getAttribute("data-price");
      addToCart(productId, productName, productPrice);
      showAddedMessage();
    }
  });

  // Повідомлення про додавання товару
  function showAddedMessage() {
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
