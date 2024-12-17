document.addEventListener("DOMContentLoaded", () => {
    const fetchProducts = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products'); 
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);

            let shopItems = document.querySelector(".shop-items");
            let detailsContainer = document.querySelector(".details-container");
            let backButton = document.getElementById("back-button");
            let productDetails = document.getElementById("product-details");

            data.forEach(product => {
                const itemDiv = document.createElement("div");
                itemDiv.classList.add("item");

                // itemDiv.addEventListener("click", () => {
                //     shopItems.style.display = "none";
                //     detailsContainer.style.display = "block";

                //     productDetails.
                // })

                const itemImage = document.createElement("img");
                itemImage.setAttribute("src", product.image);
                itemImage.setAttribute("alt", "item-image");
                itemDiv.appendChild(itemImage);

                const itemName = document.createElement("h3");
                let newTitle = product.title.split(" ").slice(0, 5).join(" ");
                itemName.innerHTML = newTitle;
                itemDiv.appendChild(itemName);

                const itemButton = document.createElement("button");
                itemButton.innerHTML = "Add to Cart";
                itemDiv.appendChild(itemButton);

                shopItems.appendChild(itemDiv);

            });

        } catch (err) {
            console.log("Error encountered during fetch:", err.message);
        }
    };

    fetchProducts();
});
