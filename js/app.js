$(document).ready(function () {
  $.getJSON('data/products.json', function (products) {
    const $productList = $("#product-list");
    products.forEach(product => {
      const productDiv = $(`
                <div class="product">
                    <img src="${product.img}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.price}</p>
                    <button class="button_cart">Додати в кошик</button>
                </div>
            `);
      $productList.append(productDiv);
    });
  }).fail(function () {
    console.error('Помилка завантаження товарів');
  });

  $(document).on("click", ".button_cart", function () {
    let message = $("<div class='custom-alert'>Товар додано в кошик!</div>");
    $("body").append(message);

    message.fadeIn(300);

    setTimeout(() => {
      message.fadeOut(500, function () { $(this).remove(); });
    }, 2000);
  });
});
