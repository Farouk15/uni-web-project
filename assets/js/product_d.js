
const addToCartBtn = document.querySelector('.product-right button');
const productName = document.querySelector('.product-right h2').textContent;
const productPriceElem = document.querySelector('.produ-price');
const productPrice = parseFloat(productPriceElem.textContent.replace('$', ''));
const productImg = document.querySelector('.img-prodd img');


if(productPrice < 130){  
    const bestPriceTag = document.createElement('span');
    bestPriceTag.textContent = "Best Price!";
    bestPriceTag.style.color = "red";
    bestPriceTag.style.fontWeight = "bold";
    bestPriceTag.style.marginLeft = "10px";
    productPriceElem.appendChild(bestPriceTag);
}


addToCartBtn.addEventListener('click', () => {
    alert(`Added to cart:\n${productName} - $${productPrice.toFixed(2)}`);
});


productImg.addEventListener('mouseenter', () => {
    productImg.style.transform = "scale(1.1)";
    productImg.style.transition = "transform 0.3s ease";
});

productImg.addEventListener('mouseleave', () => {
    productImg.style.transform = "scale(1)";
});
