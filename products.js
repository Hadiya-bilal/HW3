const productGrid = document.querySelector(".product-grid");
const PrevBtn = document.querySelector("#Previous");
const NextBtn = document.querySelector("#Next");

let currentPage = 1;
const productsPerPage = 10;
let allProducts = [];

//fetching products and using async function
async function fetchProducts () {
    try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        allProducts = data.products;
        displayProducts(currentPage);
    } catch (error) {
     console.error("Failed to fetch products", error);
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

//Next button function to go to next page if thare are more than 10 products on one page to show
NextBtn.addEventListener("click", () => {
    currentPage++;
    displayProducts(currentPage);
});   

//Previous button function to go back to previous page 
// if there are more than one pages and have more products to show 
PrevBtn.addEventListener("click", () => {

if (currentPage > 1) {

    currentPage--;
    displayProducts(currentPage);
} 
else {
    //if the current page is only 1 then previous button wiill not work and it will stay on smae page
    currentPage = 1;
}       
}
);
