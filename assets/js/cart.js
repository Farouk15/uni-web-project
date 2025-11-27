const cartItems = document.querySelectorAll('.cart-item');
const cartSubtotalElem = document.querySelector('.total-box .qqqqqqqq + strong');
const cartTotalElem = document.querySelectorAll('.total-box p strong')[3];
const discountElem = document.querySelector('.total-box .text-danger');
const couponInput = document.querySelector('.side-card input[placeholder="Coupon Code"]');
const applyCouponBtn = document.querySelectorAll('.apply-btn')[1];

cartItems.forEach(item => {
    const qtyBtns = item.querySelectorAll('.xxxxxx');
    const qtyDisplay = item.querySelector('.vvvvvvvvvv');
    const pricePerItemElem = item.querySelector('.ffffffffff');
    const totalPriceElem = item.querySelector('.llllllll');

    let qty = parseInt(qtyDisplay.textContent);
    let pricePerItem = parseFloat(pricePerItemElem.textContent.replace('$',''));

    qtyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if(btn.textContent === '-' && qty > 1) qty--;
            if(btn.textContent === '+') qty++;

            qtyDisplay.textContent = qty;
            const totalPrice = qty * pricePerItem;
            totalPriceElem.textContent = `$${totalPrice.toFixed(2)}`;
            updateCartTotal();
        });
    });
});

function updateCartTotal(){
    let subtotal = 0;
    cartItems.forEach(item => {
        const totalPriceElem = item.querySelector('.llllllll');
        subtotal += parseFloat(totalPriceElem.textContent.replace('$',''));
    });
    cartSubtotalElem.textContent = `$${subtotal.toFixed(2)}`;

    let discount = parseFloat(discountElem.textContent.replace('- $','')) || 0;
    cartTotalElem.textContent = `$${(subtotal - discount).toFixed(2)}`;
}

applyCouponBtn.addEventListener('click', () => {
    const code = couponInput.value.trim();
    if(code === 'SAVE10'){
        discountElem.textContent = '- $10.00';
    } else {
        discountElem.textContent = '- $0.00';
    }
    updateCartTotal();
});
