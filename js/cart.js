const cartSidebar = document.getElementById('cartSidebar');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotalElement = document.getElementById('cartTotal');
let cartTotal = 0;

document.addEventListener('DOMContentLoaded', () => {
  const savedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
  const savedTotal = parseFloat(localStorage.getItem('cartTotal')) || 0;

  savedCart.forEach((item) => {
    addCartItemToDOM(item.name, item.price, item.img, false); 
  });

  cartTotal = savedTotal;
  cartTotalElement.innerText = cartTotal.toFixed(2);
});

function toggleCart() {
  cartSidebar.classList.toggle('active');
}

function addToCart(name, price, img) {
  const cartItem = { name, price, img };

  addCartItemToDOM(name, price, img);

  cartTotal += price;
  cartTotalElement.innerText = cartTotal.toFixed(2);

  saveCartToLocalStorage(cartItem);

  toastr.success(`${name} added to cart!`, 'Success');
}

function addCartItemToDOM(name, price, img, updateStorage = true) {
  const cartItem = document.createElement('div');
  cartItem.className = 'cart-item';
  cartItem.innerHTML = `
    <img src="${img}" alt="${name}">
    <div class="cart-item-details">
      <h5>${name}</h5>
      <p>PHP ${price.toFixed(2)}</p>
    </div>
  `;
  cartItemsContainer.appendChild(cartItem);

  if (updateStorage) saveCartToLocalStorage({ name, price, img });
}

function saveCartToLocalStorage(item) {
  const savedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
  savedCart.push(item);
  localStorage.setItem('cartItems', JSON.stringify(savedCart));
  localStorage.setItem('cartTotal', cartTotal.toFixed(2));
}

function clearCart() {

  cartItemsContainer.innerHTML = '';
  cartTotal = 0;
  cartTotalElement.innerText = cartTotal.toFixed(2);

  localStorage.removeItem('cartItems');
  localStorage.removeItem('cartTotal');

  toastr.info('Cart cleared successfully!', 'Info');
}

function checkout() {
  toastr.success(`Checkout successful! PHP ${cartTotal.toFixed(2)}`, 'Success');
  clearCart();
}

const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdown = document.querySelector('.dropdown');

dropdownToggle.addEventListener('click', (e) => {
  e.preventDefault();
  dropdown.classList.toggle('open');
});