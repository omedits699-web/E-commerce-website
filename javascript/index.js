let cart = [];
let studentDiscountApplied = false;
function addToCart(productName, price) {
    cart.push({ name: productName, price: price, id: Date.now() });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(productName + " added to cart!");
    window.location.href = 'cart.html';
}
function displayCart() {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsDiv = document.getElementById('cart-items');
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        updateTotals(0);
    } else {
        let cartHTML = '<div class="cart-items-list">';
        let subtotal = 0;
        
        cart.forEach((item, index) => {
            cartHTML += `
                <div class="cart-item">
                    <span class="item-name">${item.name}</span>
                    <span class="item-price">$${item.price.toFixed(2)}</span>
                    <button class="remove-btn" onclick="removeFromCart(${index})">remove</button>
                </div>
            `;
            subtotal += item.price;
        });
        
        cartHTML += '</div>';
        cartItemsDiv.innerHTML = cartHTML;
        updateTotals(subtotal);
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function applyStudentDiscount() {
    const studentId = document.getElementById('student-id').value;
    if (studentId.trim() !== '') {
        studentDiscountApplied = true;
        alert('Student discount applied! You get 50% off!');
        displayCart();
    } else {
        alert('Please enter your student ID');
    }
}

function updateTotals(subtotal) {
    let discount = 0;
    if (studentDiscountApplied) {
        discount = subtotal * 0.50;
    }
    const total = subtotal - discount;
    
    document.getElementById('subtotal').textContent = '$' + subtotal.toFixed(2);
    document.getElementById('discount').textContent = '-$' + discount.toFixed(2);
    document.getElementById('total').textContent = '$' + total.toFixed(2);
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Proceeding to checkout...');
}

function clearCart() {
    cart = [];
    studentDiscountApplied = false;
    localStorage.removeItem('cart');
    displayCart();
}
