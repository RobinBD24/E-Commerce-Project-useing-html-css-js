document.addEventListener('DOMContentLoaded', function () {
  // Initialize cart button on page load
  initializeCartButton();

  // Add event listener to "Add to Cart" buttons
  const addToCartButtons = document.querySelectorAll('.btn.btn-primary');
  addToCartButtons.forEach(button => {
      button.addEventListener('click', function () {

          const productName = button.parentNode.querySelector('.card-title').textContent;
          const productPriceElement = button.parentNode.querySelector('.card-text');
          const productPrice = parseInt(productPriceElement.textContent.trim().replace('Price:', '').replace('=/=', '')); // Extracting and parsing the price from the productPriceElement
          const productQuantity = 1;

          addToCart(productName, productPrice, productQuantity);
      });
  });

  // Add event listener to the cart button for navigation
  const cartButton = document.getElementById('cartButton');
  cartButton.addEventListener('click', goToProductsPage);
});

// Function to update cart button with the product counter
function updateCartButton(counter) {
  const cartButton = document.getElementById('cartButton');
  if (counter > 0) {
      cartButton.innerHTML = `
          <i class="fa-solid fa-cart-shopping login_card_li"></i>
          <span class="badge bg-danger">${counter}</span>
      `;
  } else {
      cartButton.innerHTML = `
          <i class="fa-solid fa-cart-shopping login_card_li"></i>
      `;
  }
}

// Function to increment product counter and update cart button
function addToCart(name, price, quantity) {
  // Increment product counter
  let productCounter = localStorage.getItem('productCounter');
  productCounter = productCounter ? parseInt(productCounter) : 0;
  productCounter++;

  // Update localStorage with new counter value
  localStorage.setItem('productCounter', productCounter);

  // Retrieve or initialize products array from localStorage
  const products = JSON.parse(localStorage.getItem('products')) || [];

  // Add product information to products array
  const productInfo = {
      name: name,
      price: price,
      quantity: quantity
  };
  products.push(productInfo);

  // Store updated products array in localStorage
  localStorage.setItem('products', JSON.stringify(products));

  // Update cart button with the updated product counter
  updateCartButton(productCounter);
}

// Function to handle navigation to products.html
function goToProductsPage() {
  window.location.href = 'products.html';
}

// Function to initialize cart button with saved product counter on page load
function initializeCartButton() {
  let productCounter = localStorage.getItem('productCounter');
  productCounter = productCounter ? parseInt(productCounter) : 0;


  updateCartButton(productCounter);
}
