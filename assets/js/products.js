
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


const products_fetch = document.getElementById('products_fetch');

fetch("http://localhost/web%20project/uni-web-project/backend/app.php?show=1").then((data)=>{return data.json()}).then((data)=>{
    console.log(data.count);
    console.log(data);


    for (var C =0; C < data.count  ; C++ ){
        
        products_fetch.innerHTML += `
                    <div class="col-md-4 py-5" data-aos="fade-up">
                <a href="./product_d.html">
                    <div class="card">
                        <div>
                            <div class="product-img">
                                <p class="sale">
                                    sale
                                </p>              
                                <img src="../assets/imgs/HQ8708_00_plp_standard.avif" alt="">

                            </div>
                            <div class="product-name">
                                <h3>
                                    ${data.data[C].name}
                                </h3>
                                <p>
                                    Experience ultimate comfort and style with these iconic Nike Air Max sneakers.
                                </p>
                            </div>

                        </div>
                        <div class="price-bu">
                            <h4>
                            ${data.data[C].price}

                            </h4>
                            <a href="">
                                <button>
                                    Add to cart
                                </button>
                            </a>
                        </div>
                    </div>
                </a>

            </div>
     `
 
    }
})
