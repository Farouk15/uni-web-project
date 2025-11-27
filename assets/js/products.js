
const addButtons = document.querySelectorAll('.price-bu button');

addButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault(); 
        const card = btn.closest('.card');
        const productName = card.querySelector('.product-name h3').textContent;
        const productPrice = card.querySelector('.price-bu h4').textContent;
        alert(`Added to cart:\n${productName} - ${productPrice}`);
    });
});


const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('mouseenter', () => card.style.boxShadow = "0 10px 20px rgba(0,0,0,0.2)");
    card.addEventListener('mouseleave', () => card.style.boxShadow = "none");
});

let bestPrice = Infinity;
let bestCard = null;

cards.forEach(card => {
    const priceText = card.querySelector('.price-bu h4').textContent;
    const price = parseFloat(priceText.replace('$', ''));

    if(price < bestPrice){
        bestPrice = price;
        bestCard = card;
    }
});

if(bestCard){
    const saleTag = bestCard.querySelector('.product-img .sale');
    if(saleTag){
        saleTag.textContent = "Best Price!";
        saleTag.style.background = 'red'; 
    }
}
