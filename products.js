const productGrid = document.querySelector(".product-grid");
const PrevBtn = document.querySelector("#Previous");
const NextBtn = document.querySelector("#Next");


let currentPage = 1;
const productsPerPage = 10;
let allProducts = [];

//fetching products and using async funtion

async function fetchProducts () {
    try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        allProducts = data.products;
        displayProducts(currentPage);
        
    } catch (error) {
     console.error("Falied to fetch products", error);
    }
}
fetchProducts();


//Displaying 10 elements per page
function displayProducts(page) {
    productGrid.innerHTML = "";

    const start = (page -1) * productsPerPage;
    const end = start + productsPerPage;
    const pageProducts = allProducts.slice(start, end);

        pageProducts.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("card");

            productCard.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.thumbnail}">
        <h3>${product.title}</h3>
        <p>${product.price}</p>
        <button>Add to Cart</button>
            `;
            productGrid.appendChild(productCard);
        });
}

//console.log(productGrid);




