const cartContainer = document.querySelector('.cart-container');
const subtotalEl = document.querySelector('.total-box p:first-child strong');
const discountEl = document.querySelector('.total-box p:nth-child(3) strong');
const cartTotalPriceEl = document.querySelector('.total-box .fs-5').querySelectorAll('strong')[1];
const applyCouponBtn = document.querySelectorAll('.apply-btn')[1];
const couponInput = document.querySelectorAll('.form-control')[1];

let discountAmount = 0;
let cartItems = [];

function updateItemTotal(item) {
    const qtyEl = item.querySelector('.vvvvvvvvvv');
    const totalEl = item.querySelector('.llllllll');
    const qty = parseInt(qtyEl.textContent);

    const priceText = item.querySelector('.ffffffffff').textContent;
    const price = parseFloat(priceText.replace('$', ''));

    const total = price * qty;
    totalEl.textContent = `$${total.toFixed(2)}`;
}

function updateCartTotal() {
    let subtotal = 0;
    cartItems.forEach(item => {
        const totalEl = item.querySelector('.llllllll');
        const itemTotal = parseFloat(totalEl.textContent.replace('$', ''));
        subtotal += itemTotal;
    });

    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;

    const total = subtotal - discountAmount;
    cartTotalPriceEl.textContent = `$${total.toFixed(2)}`;
}

function loadCart() {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
        cartContainer.innerHTML = '<p>Please log in to view your cart.</p>';
        return;
    }

    fetch(`../backend/cart.php?show_cart=1&user_id=${userId}`)
        .then(response => response.json())
        .then(data => {
            if (data.status) {
                cartContainer.innerHTML = '';
                data.data.forEach(item => {
                    const cartItemHTML = `
                        <div class="d-flex cart-item">
                            <img src="../assets/imgs/HQ8708_00_plp_standard.avif" class="product-img" alt="${item.name}">
                            <div class="ms-3 flex-grow-1">
                                <small class="text-muted">MEN</small>
                                <h6 class="mt-1 bbbbbb">${item.name}</h6>
                                <p class="mb-1 ccccc">
                                    <strong class="ttttt">Color:</strong> ${item.color}<br>
                                    <strong class="ttttt">Size:</strong> ${item.size}
                                </p>
                            </div>
                            <div class="text-end">
                                <p class="fw-bold ffffffffff">$${item.price}</p>
                                <div class="d-flex align-items-center">
                                    <div class="xxxxxx qty-btn">-</div>
                                    <span class="mx-2 vvvvvvvvvv fw-bold">${item.quantity}</span>
                                    <div class="xxxxxx qty-btn">+</div>
                                </div>
                                <p class="fw-bold text-primary mt-2 llllllll">$${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        </div>
                        <div class="divider"></div>
                    `;
                    cartContainer.insertAdjacentHTML('beforeend', cartItemHTML);
                });
                cartItems = document.querySelectorAll('.cart-item');
                cartItems.forEach(item => updateItemTotal(item));
                updateCartTotal();
                attachQtyListeners();
            } else {
                cartContainer.innerHTML = '<p>Your cart is empty.</p>';
            }
        })
        .catch(err => {
            console.error('Error loading cart:', err);
            cartContainer.innerHTML = '<p>Error loading cart.</p>';
        });
}

function attachQtyListeners() {
    const qtyButtons = document.querySelectorAll('.qty-btn');
    qtyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.cart-item');
            const qtyEl = item.querySelector('.vvvvvvvvvv');
            let qty = parseInt(qtyEl.textContent);

            if (qty < 5) {
                if (btn.textContent === '+') qty++;
            }
            if (btn.textContent === '-' && qty > 1) qty--;

            qtyEl.textContent = qty;
            updateItemTotal(item);
            updateCartTotal();
        });
    });
}

applyCouponBtn.addEventListener('click', () => {
    const code = couponInput.value.trim().toLowerCase();

    if (code === 'discount10') {
        discountAmount = 10;
        discountEl.textContent = `- $${discountAmount.toFixed(2)}`;
        alert('Coupon applied successfully! $10 discount added.');
    } else {
        discountAmount = 0;
        discountEl.textContent = '- $0.00';
        alert('Invalid coupon code!');
    }

    updateCartTotal();
});

document.addEventListener('DOMContentLoaded', function() {
    loadCart();
});
