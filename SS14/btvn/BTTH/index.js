// 1. DỮ LIỆU SẢN PHẨM
const products = [
    { id: 1, name: "Bánh Chưng Tranh Khúc", price: 150000, img: "./img/banhchung.webp" },
    { id: 2, name: "Giò Lụa Ước Lễ", price: 180000, img: "./img/giolua.jpg" },
    { id: 3, name: "Cành Đào Nhật Tân", price: 500000, img: "./img/canhdao.webp" },
    { id: 4, name: "Mứt Tết Thập Cẩm", price: 120000, img: "./img/muttet.webp" },
    { id: 5, name: "Lì Xì May Mắn", price: 20000, img: "./img/lixi.webp" },
    { id: 6, name: "Dưa Hấu Khắc Chữ", price: 60000, img: "./img/duahau.jpg" }
];

let currentTotal = 0;

const productContainer = document.getElementById("product-list");
const cartContainer = document.getElementById("cart-list");
const totalDisplay = document.getElementById("total-price");

// FORMAT TIỀN
function formatMoney(value) {
    return value.toLocaleString("vi-VN") + " đ";
}

// RENDER SẢN PHẨM
function renderProducts() {

    products.forEach(function (item) {

        const wrapper = document.createElement("div");
        wrapper.className = "product-card";

        wrapper.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p class="price">${formatMoney(item.price)}</p>
            <button class="btn-add">Thêm vào giỏ</button>
        `;

        productContainer.appendChild(wrapper);

        const addButton = wrapper.querySelector(".btn-add");

        addButton.onclick = function () {
            addToCart(item);
        };
    });
}

// THÊM VÀO GIỎ + XOÁ
function addToCart(product) {

    const emptyMsg = cartContainer.querySelector(".empty-msg");
    if (emptyMsg) {
        emptyMsg.remove();
    }

    const li = document.createElement("li");

    li.innerHTML = `
        <span class="cart-item-name">${product.name}</span>
        <div>
            <span class="cart-item-price">${formatMoney(product.price)}</span>
            <button class="btn-remove">X</button>
        </div>
    `;

    cartContainer.appendChild(li);

    // Cộng tiền
    currentTotal += product.price;
    totalDisplay.textContent = formatMoney(currentTotal);

    // SỰ KIỆN XOÁ
    const removeBtn = li.querySelector(".btn-remove");

    removeBtn.onclick = function () {

        currentTotal -= product.price;
        totalDisplay.textContent = formatMoney(currentTotal);

        li.remove();

        // Nếu giỏ trống
        if (cartContainer.children.length === 0) {
            const empty = document.createElement("p");
            empty.classList.add("empty-msg");
            empty.innerText = "Chưa có món nào trong giỏ.";
            cartContainer.appendChild(empty);
        }
    };
}

renderProducts();