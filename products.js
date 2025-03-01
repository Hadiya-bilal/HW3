const productGrid = document.querySelector(".product-grid");

async function fetchProducts () {
    try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        productGrid.innerHTML = "";

        data.products.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("card");

            productCard.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.thumbnail}">
        <h3>${product.title}</h3>
        <p>${product.price}</p>
        <button>Add to Cart</button>
            `;
            productGrid.appendChild(productCard);
        })
    } catch (error) {
     console.error("Falied to fetch products", error);
    }
}
fetchProducts();

console.log(productGrid);
