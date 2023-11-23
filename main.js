const cambiaColor = document.getElementById("toggle");
const label_toggle = document.getElementById("label-toggle");
cambiaColor.addEventListener("change", (event) => {
  let cheched = event.target.cheched;
  document.body.classList.toggle("oscuro");

  if (cheched == true) {
    label_toggle.style.color = "black";
  } else {
    label_toggle.style.color = "Black";
  }

  //guardamos el modo oscuro en localstorage

  if (document.body.classList.contains("oscuro")) {
    localStorage.setItem("modoOscuro", "true");
  } else {
    localStorage.setItem("modoOscuro", "false");
  }
});

//Obtenemos el modo actual.

if (localStorage.getItem("modoOscuro") === "true") {
  document.body.classList.add("oscuro");
} else {
  document.body.classList.remove("oscuro");
}

/*Añadir al carritom un producto

const productos = [];

const productoElegido = {
  nombre: "camiseta",
  precio: "1500",
  categoria: "Deportes",
  marca: "NIKE",
};

const aniadirAlcarrito = document.querySelector("#agregar");

aniadirAlcarrito.onclick = () => {
  productos.push(productoElegido);
  console.log(productos);
  document.querySelector(
    ".confirmar-carrito"
  ).innerHTML = `<h2>Agregastes a tu carrito ${productoElegido.nombre}</h2>`;
};

console.log(productos);

*/

/*CARRITO DE COMPRA*/

const botonCarrito = document.querySelector(".container-icon-cart");

const contenedorProductoCarrito = document.querySelector(
  ".container-cart-products"
);

botonCarrito.addEventListener("click", () => {
  contenedorProductoCarrito.classList.toggle("hidden-cart");
});

/*añadir producto al carrito*/
const cartInfo = document.querySelector(".cart-product");
const rowProduct = document.querySelector(".carrito-producto");

// Lista de todos los contenedores de productos
const productsList = document.querySelector(".container-items");

let allProducts = [];

let valorTotal = document.querySelector(".total-pagar");

const countProducts = document.querySelector("#contador-productos");

productsList.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-add-cart")) {
    const product = e.target.parentElement;

    const infoProduct = {
      quantity: 1,
      title: product.querySelector("h2").textContent,
      price: product.querySelector("p").textContent,
    };

    const exits = allProducts.some(
      (product) => product.title === infoProduct.title
    );

    if (exits) {
      const products = allProducts.map((product) => {
        if (product.title === infoProduct.title) {
          product.quantity++;
          return product;
        } else {
          return product;
        }
      });
      allProducts = [...products];
    } else {
      allProducts = [...allProducts, infoProduct];
    }

    showHTML();
  }
});

rowProduct.addEventListener("click", (e) => {
  if (e.target.classList.contains("icon-close")) {
    const product = e.target.parentElement;
    const title = product.querySelector("p").textContent;

    allProducts = allProducts.filter((product) => product.title !== title);

    console.log(allProducts);
    showHTML();
  }
});

// funcion para mostrar HTML

const showHTML = () => {
  if (!allProducts.length) {
    contenedorProductoCarrito.innerHTML = `
    <p class="carrito-vacio">El carrito esta vacio</p>
    `;
  }

  //limpiar HTML
  rowProduct.innerHTML = ``;

  let total = 0;
  let totalofProducts = 0;

  allProducts.forEach((product) => {
    const containerProduct = document.createElement("div");
    containerProduct.classList.add("cart-product");

    containerProduct.innerHTML = `

              <div class="info-cart-product">
                        <span class="cantidad-producto-carrito">${product.quantity}</span>
                        <p class="titulo-producto-carrito">${product.title}</p>
                        <span class="precio-producto-carrito">${product.price}</span>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="icon-close"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
    
    `;

    rowProduct.append(containerProduct);

    total = total + parseInt(product.quantity * product.price.slice(1));
    totalofProducts = totalofProducts + product.quantity;
  });

  valorTotal.innerText = `${total}`;
  countProducts.innerText = totalofProducts;
};
