const cartItems = document.querySelectorAll('.cart-item');
const subtotalEl = document.querySelector('.total-box p:first-child strong');
const discountEl = document.querySelector('.total-box p:nth-child(3) strong');
const cartTotalPriceEl = document.querySelector('.total-box .fs-5').querySelectorAll('strong')[1];
const applyCouponBtn = document.querySelectorAll('.apply-btn')[1];
const couponInput = document.querySelectorAll('.form-control')[1];

let discountAmount = 0;

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
    // تحديث سعر Cart Total فقط
    cartTotalPriceEl.textContent = `$${total.toFixed(2)}`;
}

const qtyButtons = document.querySelectorAll('.qty-btn');
qtyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.closest('.cart-item');
        const qtyEl = item.querySelector('.vvvvvvvvvv');
        let qty = parseInt(qtyEl.textContent);

        if(qty < 5){
        if (btn.textContent === '+') qty++;

        }
            if (btn.textContent === '-' && qty > 1) qty--;

        qtyEl.textContent = qty;
        updateItemTotal(item);
        updateCartTotal();
    });
});

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
    cartItems.forEach(item => updateItemTotal(item));
    updateCartTotal();
});