document.addEventListener("DOMContentLoaded", () => {
    const fetchProducts = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products'); //fetching dummy shopping data
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            
            //for the shop and details container
            const shopItems = document.querySelector(".shop-items");
            const detailsContainer = document.querySelector(".detail-container");
            const detailsBackButton = document.querySelector(".back-button");
            const productDetails = document.querySelector(".item-detail");
            
            //for the cart page or container
            const cartContainer = document.querySelector(".cart-container");
            const headerCartIcon = document.querySelector(".cart-icon");
            const cartBackButton = document.querySelector(".cart-back-button");
            const cartListContainer = document.querySelector(".cart-items-container")
            const cartTotalDiv = document.querySelector(".cart-total");
            
            let cartList = [];

            //to search for item in the shop
            const searchInput =  document.querySelector(".search-input");

            //function to render the individual items
            const renderShopItem = (product) => {
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
                    cartContainer.style.display = "none";
                
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
                    itemDetailTitle.innerText = product.title.split(" ").slice(0, 5).join(" ");
                    itemDetailInfo.appendChild(itemDetailTitle);

                    const itemPrice = document.createElement("h3");
                    itemPrice.innerHTML = `Price: $${product.price}`;
                    itemDetailInfo.appendChild(itemPrice);

                    //buttons to add to cart
                    const cartDetailsButtonsDiv = document.createElement("div");
                    cartDetailsButtonsDiv.classList.add("buttons");
                    itemDetailInfo.appendChild(cartDetailsButtonsDiv);

                    const itemCountDiv = document.createElement("div");
                    itemCountDiv.classList.add("item-count");
                    cartDetailsButtonsDiv.appendChild(itemCountDiv);


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
                    cartDetailsButtonsDiv.appendChild(addToCartButton);
                    
                    addToCartButton.addEventListener("click", () => {
                        if (count > 0) {
                            const existingItemIndex = cartList.findIndex(item => item.name === product.title);
                            
                            if (existingItemIndex !== -1) {
                                cartList[existingItemIndex].quantity += count;
                            } else {
                                cartList.push({
                                    title: product.title,
                                    price: product.price,
                                    quantity: count,
                                    image: product.image
                                });
                            }
                            
                            updateHeaderCount();
                            updateTotalPrice();
                            renderCartItem(product, count);
                        } else {
                            alert("Please select at least one item to add to the cart.");
                        }
                    })
                })
            }
            
            //function to render the cart items
            const renderCartItem = (product, quantity) => {
                const cartItemDiv = document.createElement("div");
                cartItemDiv.classList.add("cart-item");
                cartListContainer.appendChild(cartItemDiv);
                
                const ulTag = document.createElement("ul");
                cartItemDiv.appendChild(ulTag);
                
                const imageLi = document.createElement("li");
                imageLi.innerText = product.title.split(" ").slice(0, 5).join(" ");
                ulTag.appendChild(imageLi);
                
                const cartItemImageTag = document.createElement("img");
                cartItemImageTag.classList.add("cart-image");
                cartItemImageTag.setAttribute("src", product.image);
                cartItemImageTag.setAttribute("alt", "cart-image");
                imageLi.appendChild(cartItemImageTag);
                
                const priceLi = document.createElement("li");
                priceLi.innerHTML = `$ ${product.price}`;
                ulTag.appendChild(priceLi);
                
                const quantityLi = document.createElement("li");
                quantityLi.innerText = quantity;
                ulTag.appendChild(quantityLi);

                
                const subTotalLi = document.createElement("li");
                let subTotal = (quantity * product.price).toFixed(2);
                subTotalLi.innerHTML = `$ ${subTotal}`;
                ulTag.appendChild(subTotalLi);

                const deleteItem = document.createElement("p");
                deleteItem.classList.add("delete-item");
                cartItemDiv.appendChild(deleteItem);

                const deleteImage = document.createElement("i");
                deleteImage.classList.add("fa-solid", "fa-trash");
                deleteItem.appendChild(deleteImage);
                
                
                deleteImage.addEventListener("click", () => {
                    const index = cartList.findIndex(item => item.title === product.title);
                    if (index !== -1) {
                        cartList.splice(index, 1);//to delete the item in focus from the cart array
                    }
                    updateHeaderCount();
                    updateTotalPrice();
                    cartListContainer.removeChild(cartItemDiv);//delete it from the ui
                });
            };
            
            
            const updateHeaderCount = () => {
                let headerCartCount = document.querySelector(".cart-count");
                if (!headerCartCount) {
                    headerCartCount = document.createElement("p");
                    headerCartCount.classList.add("cart-count");
                    headerCartIcon.appendChild(headerCartCount);
                }
                headerCartCount.innerText = cartList.length;
            }

            const updateTotalPrice = () => {
                let cartTotal = document.querySelector('.cart-total p');

                if (!cartTotal) {
                    cartTotal = document.createElement("p");
                    cartTotalDiv.appendChild(cartTotal);
                }
                const totalPrice = cartList.reduce((total, item) => total + item.price * item.quantity, 0);
                cartTotal.innerHTML = `$ ${totalPrice.toFixed(2)}`;
            };

            data.forEach(product => {
                //populating the shop-items container using js
                renderShopItem(product);
            });

            //searching for items based on their names
            searchInput.addEventListener("input", (e) => {
                const searchValue = e.target.value.toLowerCase();

                shopItems.innerHTML = "";
                detailsContainer.style.display = "none";
                cartContainer.style.display = "none";

                const filteredData = data.filter(item => item.title.toLowerCase().includes(searchValue));

                filteredData.forEach(product => {
                    renderShopItem(product);
                })
                if(filteredData.length === 0){
                    shopItems.innerHTML = `<p>No Items match your search.</p>`;
                }
            })

            detailsBackButton.addEventListener("click", () => {
                shopItems.style.display = "grid";
                detailsContainer.style.display = "none";
                cartContainer.style.display = "none";
            })

            cartBackButton.addEventListener("click", () => {
                shopItems.style.display = "grid";
                detailsContainer.style.display = "none";
                cartContainer.style.display = "none";
            })

            //render the cart container when the cart image at the header is clicked
            headerCartIcon.addEventListener("click", () => {
                shopItems.style.display = "none";
                detailsContainer.style.display = "none";
                cartContainer.style.display = "block";
                cartListContainer.innerHTML = "";

                cartList.forEach(cartProduct => {
                    renderCartItem(cartProduct, cartProduct.quantity);
                })
            })
        } catch (err) {
            console.log("Error encountered during fetch:", err.message);
            shopItems.innerHTML = `<p>Failed to load products. Please try again later.</p>`;
        }
    };

    fetchProducts();
});
