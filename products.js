const productGrid = document.querySelector(".product-grid");
const PrevBtn = document.querySelector("#Previous");
const NextBtn = document.querySelector("#Next");

const priceSort = document.querySelector("#price-sort");

let currentPage = 1;
const productsPerPage = 10;
let allProducts = [];
let sortedProducts = [];


// Fetch products from the API
async function fetchProducts() {
  try {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    allProducts = data.products;
    sortedProducts = [...allProducts]; // Initialize sortedProducts with allProducts
    displayProducts(currentPage); // Display the first 10 products

    // Log fetched products for debugging
    console.log("Fetched Products:", allProducts);
  } catch (error) {
    console.error("Failed to fetch products", error);
  }
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

//Displaying 10 elements per page
function displayProducts(page) {
  productGrid.innerHTML = "";

  const start = (page - 1) * productsPerPage;
  const end = start + productsPerPage;
  const pageProducts = sortedProducts.slice(start, end); // Use sortedProducts instead of allProducts


  pageProducts.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("card");

    productCard.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>$${product.price}</p>
      <button>Add to Cart</button>
    `;
    productGrid.appendChild(productCard);
  });
}

// Sort products by price (low to high or high to low)  and re-render the products  
function sortProducts(sortOrder) {
  if (sortOrder === "price-low") {
    // Sort from low to high of the price
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "price-high") {
    // Sort from high to low     of the price
    sortedProducts.sort((a, b) => b.price - a.price);
  }
  displayProducts(currentPage); 
}

// Event listener for DOMContentLoaded even to fetch products
window.addEventListener("DOMContentLoaded", async () => {
  // Fetch and display  products    
  await fetchProducts();

  // Adding event listener to the price-sort dropdown filter   
  if (priceSort) {
    priceSort.addEventListener("change", (event) => {
      const sortOrder = event.target.value; 
      // Geting the selected sort order
      sortProducts(sortOrder); 
      
    });
  }
});

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

