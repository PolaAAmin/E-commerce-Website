(function () {
    const productsContainer = document.getElementById("products");

    if (!productsContainer) {
        return;
    }

    const escapeHtml = (value) =>
        String(value).replace(/[&<>"']/g, (char) => {
            const chars = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
            };
            return chars[char];
        });

    const productCard = (product) => {
        const name = escapeHtml(product.name || "Product");
        const category = escapeHtml(product.product_category?.name || "Category");
        const manufacturer = escapeHtml(product.manufacturer || "Brand");
        const price = Number(product.price) || 0;
        const image = escapeHtml(product.image || "assets/images/products/product-img-1.jpg");

        return `
            <div class="relative rounded-lg break-words border bg-white border-gray-300 card-product">
                <div class="flex-auto p-4">
                    <div class="text-center relative flex justify-center">
                        <a href="#!">
                            <img src="${image}" alt="${name}" class="w-full h-auto" />
                        </a>
                    </div>
                    <div class="flex flex-col gap-3 mt-3">
                        <a href="#!" class="text-decoration-none text-gray-500"><small>${category}</small></a>
                        <h3 class="text-base truncate"><a href="#!">${name}</a></h3>
                        <div class="flex items-center justify-between gap-2">
                            <div>
                                <span class="text-gray-900 font-semibold">$${price.toFixed(2)}</span>
                                <p class="text-xs text-gray-500 mt-1 truncate">${manufacturer}</p>
                            </div>
                            <button type="button"
                                class="btn inline-flex items-center gap-x-1 bg-green-600 text-white border-green-600 disabled:opacity-50 disabled:pointer-events-none hover:text-white hover:bg-green-700 hover:border-green-700 active:bg-green-700 active:border-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 btn-sm">
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    };

    const renderProducts = (products) => {
        productsContainer.innerHTML = products.map(productCard).join("");
    };

    const renderError = () => {
        productsContainer.innerHTML = `
            <p class="text-red-600">Unable to load products right now. Please try again later.</p>
        `;
    };

    fetch("https://jsonfakery.com/products")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Products request failed");
            }
            return response.json();
        })
        .then((products) => {
            renderProducts(products.slice(0, 20));
        })
        .catch(() => {
            renderError();
        });
})();
