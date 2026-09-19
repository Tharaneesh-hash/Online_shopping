let products = [
    {
        id: 1,
        name: "iPhone 13",
        category: "Electronics",
        price: 38000,
        condition: "Good",
        location: "Erode",
        description: "iPhone 13 128GB in good condition.",
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 2,
        name: "Dell Laptop",
        category: "Electronics",
        price: 28000,
        condition: "Good",
        location: "Coimbatore",
        description: "Dell laptop suitable for students.",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 3,
        name: "Mountain Bicycle",
        category: "Vehicles",
        price: 8500,
        condition: "Good",
        location: "Erode",
        description: "Well-maintained mountain bicycle.",
        image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 4,
        name: "Wooden Study Table",
        category: "Furniture",
        price: 4500,
        condition: "Used",
        location: "Salem",
        description: "Wooden study table with storage drawer.",
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 5,
        name: "Office Chair",
        category: "Furniture",
        price: 3200,
        condition: "Good",
        location: "Erode",
        description: "Comfortable office chair for study.",
        image: "https://images.unsplash.com/photo-1505843490701-5be4b3f1f1d7?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 6,
        name: "Denim Jacket",
        category: "Fashion",
        price: 900,
        condition: "Like New",
        location: "Coimbatore",
        description: "Stylish denim jacket.",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 7,
        name: "Data Structures Book",
        category: "Books",
        price: 450,
        condition: "Good",
        location: "Erode",
        description: "Useful textbook for computer science students.",
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 8,
        name: "Canon Camera",
        category: "Electronics",
        price: 24000,
        condition: "Good",
        location: "Chennai",
        description: "Canon camera for photography.",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 9,
        name: "Harry Potter",
        category: "Books",
        price: 200,
        condition: "Like New",
        location: "Erode",
        description: "Interesting Harry Potter book.",
        image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7b?auto=format&fit=crop&w=700&q=80"
    },
    {
        id: 10,
        name: "Gaming Headphones",
        category: "Electronics",
        price: 2500,
        condition: "Good",
        location: "Bangalore",
        description: "Gaming headphones with excellent sound.",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80"
    }
];
let favorites =JSON.parse(localStorage.getItem("favorites")) || [];
let myListings =JSON.parse(localStorage.getItem("myListings")) || [];
function showPage(pageId) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add("active");
    }
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    if (pageId === "browse") {
        displayProducts(products);
    }
    if (pageId === "favorites") {
        displayFavorites();
    }
    if (pageId === "listings") {
        displayListings();
    }
}
function displayProducts(productList) {
    const grid = document.getElementById("productGrid");
    grid.innerHTML = "";
    if (productList.length === 0) {
        grid.innerHTML = `
            <div style="
                grid-column:1/-1;
                text-align:center;
                padding:50px;
            ">
                <h2>No products found 😔</h2>
                <p>Try another search.</p>
            </div>
        `;
        return;
    }
    productList.forEach(product => {
        const isFavorite =favorites.includes(product.id);
        grid.innerHTML += createProductCard(
            product,
            isFavorite
        );
    });
}
function createProductCard(product, isFavorite) {
    return `
        <div class="product-card">
            <div style="position:relative">
                <img
                    src="${product.image}"
                    class="product-image"
                    alt="${product.name}"
                >
                <button
                    class="favorite ${isFavorite ? "active" : ""}"
                    onclick="toggleFavorite(${product.id})"
                    style="
                        position:absolute;
                        top:12px;
                        right:12px;
                        width:40px;
                        height:40px;
                        border-radius:50%;
                    "
                >
                    ${isFavorite ? "❤️" : "♡"}
                </button>
            </div>
            <div class="product-body">
                <div class="product-category">
                    ${product.category}
                </div>
                <h3 class="product-title">
                    ${product.name}
                </h3>
                <p class="product-description">
                    ${product.description}
                </p>
                <div class="price">
                    ₹${Number(product.price).toLocaleString("en-IN")}
                </div>
                <div class="product-info">
                    <span>
                        📍 ${product.location}
                    </span>
                    <span>
                        ${product.condition}
                    </span>
                </div>
                <button
                    class="contact-btn"
                    onclick="openContact('${product.name}')">
                    Contact Seller
                </button>
            </div>
        </div>
    `;
}
function searchProducts() {
    const search =
        document
        .getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();
    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search) ||
        product.location.toLowerCase().includes(search)
    );
    displayProducts(filtered);
}
function filterProducts(category, button) {
    document.querySelectorAll(".category").forEach(btn => {
        btn.classList.remove("active-category");
    });
    button.classList.add("active-category");
    if (category === "All") {
        displayProducts(products);
        return;
    }
    const filtered =
        products.filter(product =>
            product.category === category
        );
    displayProducts(filtered);
}
function toggleFavorite(id) {
    if (favorites.includes(id)) {
        favorites =
            favorites.filter(item => item !== id);
    } else {
        favorites.push(id);
    }
    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );
    displayProducts(products);
}
function displayFavorites() {
    const grid =document.getElementById("favoriteGrid");
    const favoriteProducts =
        products.filter(product =>
              favorites.includes(product.id)
        );
    if (favoriteProducts.length === 0) {
        grid.innerHTML = `
            <div style="
                grid-column:1/-1;
                text-align:center;
                padding:60px;
            ">
                <h2>No favorites yet ❤️</h2>
                <p>Click the heart icon on a product.</p>
            </div>
        `;
        return;
    }
    grid.innerHTML = "";
    favoriteProducts.forEach(product => {
        grid.innerHTML += createProductCard(product, true);
    });
}
function openContact(productName) {
    document.getElementById(
        "sellerProduct"
    ).innerHTML =
        `You are contacting the seller of <b>${productName}</b>.`;
    document.getElementById(
        "contactModal"
    ).style.display = "flex";
}
function closeModal() {
    document.getElementById(
        "contactModal"
    ).style.display = "none";
}
function sendMessage() {
    const name =document.getElementById("buyerName").value;
    const phone =document.getElementById("buyerPhone").value;
    if (!name || !phone) {
        alert("Please enter your name and phone number.");
        return;
    }
    alert(
        "Message sent successfully! ✅"
    );
    closeModal();
}
function previewImage(event) {
    const file =
        event.target.files[0];
    const preview =
        document.getElementById("imagePreview");
    if (file) {
        const reader =
            new FileReader();
        reader.onload = function(e) {
            preview.src =
                e.target.result;
            preview.style.display =
                "block";
        };
        reader.readAsDataURL(file);
    }
}
document
.getElementById("sellForm")
.addEventListener("submit", function(event) {
    event.preventDefault();
    const name =document.getElementById("productName").value;
    const category =document.getElementById("productCategory").value;
    const price =document.getElementById("productPrice").value;
    const condition =document.getElementById("productCondition").value;
    const location =document.getElementById("productLocation").value;
    const description =document.getElementById("productDescription").value;
    const imageFile =document.getElementById("productImage").files[0];
    const createListing = function(image) {
        const newProduct = {
            id: Date.now(),
            name: name,
            category: category,
            price: Number(price),
            condition: condition,
            location: location,
            description: description,
            image:
                image ||
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80"
        };
        products.push(newProduct);
        myListings.push(newProduct);
        localStorage.setItem(
            "myListings",
            JSON.stringify(myListings)
        );
        alert(
            "Your product has been published successfully! 🎉"
        );
        document.getElementById(
            "sellForm"
        ).reset();
        document.getElementById(
            "imagePreview"
        ).style.display = "none";
        showPage("listings");
    };
    if (imageFile) {
        const reader =new FileReader();
        reader.onload = function(e) {
            createListing(e.target.result);
        };
        reader.readAsDataURL(imageFile);
    } else {
        createListing();
    }
});
function displayListings() {
    const grid =document.getElementById("listingGrid");
    if (myListings.length === 0) {
        grid.innerHTML = `
            <div style="
                grid-column:1/-1;
                text-align:center;
                padding:60px;
            ">
                <h2>You haven't listed anything yet.</h2>
                <br>
                <button
                    class="primary-btn"
                    onclick="showPage('sell')">
                    + Sell Your First Item
                </button>
            </div>
        `;
        return;
    }
    grid.innerHTML = "";
    myListings.forEach(product => {
        grid.innerHTML +=
            createProductCard(
                product,
                favorites.includes(product.id)
            );
    });
}
window.onclick = function(event) {
    const modal =document.getElementById("contactModal");
    if (event.target === modal) {
        closeModal();
    }
};
displayProducts(products);