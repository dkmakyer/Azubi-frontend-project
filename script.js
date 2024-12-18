document.addEventListener("DOMContentLoaded", () => {
    const fetchProducts = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products'); 
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);

            const shopItems = document.querySelector(".shop-items");
            const detailsContainer = document.querySelector(".detail-container");
            const backButton = document.querySelector(".back-button");
            const productDetails = document.querySelector(".item-detail");

            data.forEach(product => {
                //creating the shop-items container using js
                const itemDiv = document.createElement("div");
                itemDiv.classList.add("item");

                const itemImage = document.createElement("img");
                itemImage.setAttribute("src", product.image);
                itemImage.setAttribute("alt", "item-image");
                itemDiv.appendChild(itemImage);

                const itemName = document.createElement("h3");
                const newTitle = product.title.split(" ").slice(0, 5).join(" ");
                itemName.innerText = newTitle;
                itemDiv.appendChild(itemName);

                const itemButton = document.createElement("button");
                itemButton.innerText = "Item Detail";
                itemDiv.appendChild(itemButton);

                shopItems.appendChild(itemDiv);

                //make the entire item container route to the item detail page when clicked
                itemButton.addEventListener("click", () => {
                    shopItems.style.display = "none";
                    detailsContainer.style.display = "block";
                
                    productDetails.innerHTML = "";//to clear any previous item detail
                
                    //creating the necessary part of the item detail page using js

                    const itemImageDiv = document.createElement("div");
                    itemImageDiv.classList.add("item-image-container");
                    productDetails.appendChild(itemImageDiv);

                    //item image container
                    const itemImageTag =  document.createElement("img");
                    itemImageTag.classList.add("item-detail-image");
                    itemImageTag.setAttribute("src", product.image);
                    itemImageTag.setAttribute("alt", "item-image");
                    itemImageDiv.appendChild(itemImageTag);

                    const itemDescription = document.createElement("p");
                    itemDescription.innerText = product.description;
                    itemImageDiv.appendChild(itemDescription);

                    //item detail info
                    const itemDetailInfo = document.createElement("div");
                    itemDetailInfo.classList.add("item-detail-info");
                    productDetails.appendChild(itemDetailInfo);


                    const itemDetailTitle = document.createElement("h2");
                    itemDetailTitle.innerText = product.title;
                    itemDetailInfo.appendChild(itemDetailTitle);

                    const itemPrice = document.createElement("h3");
                    itemPrice.innerHTML = `Price: $${product.price}`;
                    itemDetailInfo.appendChild(itemPrice);

                    //buttons to add to cart
                    const cartButtonsDiv = document.createElement("div");
                    cartButtonsDiv.classList.add("buttons");
                    itemDetailInfo.appendChild(cartButtonsDiv);

                    const itemCountDiv = document.createElement("div");
                    itemCountDiv.classList.add("item-count");
                    cartButtonsDiv.appendChild(itemCountDiv);


                    let count = 0;

                    const subtractButton = document.createElement("button");
                    subtractButton.classList.add("subtract-item");
                    subtractButton.innerText = "-";
                    itemCountDiv.appendChild(subtractButton);

                    subtractButton.addEventListener("click", () => {
                        if(count > 0){
                            count--;
                            counter.innerText = count;
                        }
                    });

                    const counter = document.createElement("p");
                    counter.innerText = count;
                    itemCountDiv.appendChild(counter);

                    const addButton = document.createElement("button");
                    addButton.classList.add("add-item");
                    addButton.innerText = "+";
                    itemCountDiv.appendChild(addButton);
                    addButton.addEventListener("click", () => {
                        count++;
                        counter.innerText = count;
                    });



                    const addToCartButton = document.createElement("button");
                    addToCartButton.classList.add("buy-button");
                    addToCartButton.innerText = "Add to Cart";
                    cartButtonsDiv.appendChild(addToCartButton);
                })
            });

            backButton.addEventListener("click", () => {
                shopItems.style.display = "grid";
                detailsContainer.style.display = "none";
            })

        } catch (err) {
            console.log("Error encountered during fetch:", err.message);
        }
    };

    fetchProducts();
});
