// Retrieve product data from localStorage
const products = JSON.parse(localStorage.getItem("products")) || [];

// Display product data
const productList = document.getElementById("productList");
let totalPrice = 0;

function displayProducts() {
  productList.innerHTML = ""; // Clear existing product list
  totalPrice = 0; // Reset total price

  products.forEach((product, index) => {
    const productCard = document.createElement("div");
    productCard.classList.add("col");
    productCard.innerHTML = `
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">Price: $${product.price}</p>
          <div class="d-flex align-items-center">
            <button class="btn btn-secondary me-2" onclick="updateQuantity(${index}, -1)">-</button>
            <span id="quantity${index}" class="me-2">${product.quantity}</span>
            <button class="btn btn-secondary me-2" onclick="updateQuantity(${index}, 1)">+</button>
            <span id="total${index}" class="flex-grow-1">Price: $${(product.price * product.quantity).toFixed(2)}</span>
            <button class="btn btn-danger" onclick="removeProduct(${index})">Remove</button>
          </div>
        </div>
      </div>
    `;
    productList.appendChild(productCard);
    totalPrice += product.price * product.quantity;
  });

  // Display total price
  const totalPriceElement = document.getElementById("totalPrice");
  totalPriceElement.textContent = "$" + totalPrice.toFixed(2); // Ensure total price is displayed with 2 decimal places
}

displayProducts();

// Function to update quantity and total price
function updateQuantity(index, change) {
  const quantityElement = document.getElementById(`quantity${index}`);
  const totalElement = document.getElementById(`total${index}`);
  const product = products[index];

  product.quantity += change;

  // Ensure quantity is at least 0
  if (product.quantity < 0) {
    product.quantity = 0;
  }

  // If quantity becomes 0, remove the item from the list
  if (product.quantity === 0) {
    removeProduct(index);
    return;
  }

  quantityElement.textContent = product.quantity;
  totalElement.textContent = `Price: $${(product.price * product.quantity).toFixed(2)}`;

  // Update total price
  totalPrice += change * product.price;
  const totalPriceElement = document.getElementById("totalPrice");
  totalPriceElement.textContent = "$" + totalPrice.toFixed(2);

  // Update localStorage with updated product data
  localStorage.setItem("products", JSON.stringify(products));
}


// Function to remove product from list
function removeProduct(index) {
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));

  // If there are no products left, clear the localStorage entirely
  if (products.length === 0) {
    localStorage.removeItem("products");
    localStorage.removeItem("productCounter");
  }

  displayProducts();
}
