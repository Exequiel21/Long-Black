
//carrito de Compras
const addToShoppingCart = document.querySelectorAll('.btn__addCart');

addToShoppingCart.forEach(addToCartButton => {
    addToCartButton.addEventListener('click', addToCartClicked);
});

const shoppingCartItemsContainer = document.querySelector('.cart-products');

function addToCartClicked (event) {
    const buttom = event.target;
    const item = buttom.closest('.item')
    
    const itemTitle = item.querySelector('.item-title').textContent;
    const itemPrice = item.querySelector('.item-price').textContent;
    const itemImage = item.querySelector('.item-image').src;
    
    addItemToShoppingCart(itemTitle, itemPrice, itemImage);
    

}

function addItemToShoppingCart(itemTitle,itemPrice, itemImage) {
    const shoppingCartHeader = document.createElement('div');
    const shoppingCartContent = `

    <div class="grid-flex shoppingCartItem ">
        <div class="contenedor-flex-1 shopping-cart-item">
            <img class="image-product shopping-cart-image" src="${itemImage}" alt="">
            <h5 class="shopping-cart-item-title shoppingCartItem">${itemTitle}</h5>
        </div>
        <div class="contenedor-flex-2 shopping-cart-item-price">
            <h5 class="shopingCartItemPrice item-price">${itemPrice}</h5>
        </div>
        <div class="contenedor-flex-3 shopping-cart-quantity">
            <input class="input shoppingCartItemQuatity shopping-cart-quantity-input" type="number" name="cantidad" id="1" value="1">
            <button class="delete">X</button>
        </div>
    </div>
    `;

    shoppingCartHeader.innerHTML = shoppingCartContent;
    shoppingCartItemsContainer.append(shoppingCartHeader);

    shoppingCartHeader.querySelector('delete').addEventListener('click', removeShoppingCart);

    updateShoppingCartTotal();
}

function updateShoppingCartTotal() {
    let total = 0;
    const shoppingTotalCart = document.querySelector('.shoppingCartTotal');

    const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

    shoppingCartItems.forEach((shoppingCartItem) => {
        const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
            '.shoppingCartItemPrice'
        );

        const shoppingCartItemPrice = Number(
            shoppingCartItemPriceElement.textContent.replace('$', '')
        );

        const shoppingCartItemQuatityElement = shoppingCartItem.querySelector(
            '.shoppingCartItemQuatity'
        );
        
        const shoppingCartItemQuatity = Number(
            shoppingCartItemQuatityElement.value
            );
        
        total = total + shoppingCartItemPrice * shoppingCartItemQuatity
    });
    shoppingTotalCart.innerHTML = `
        ${total}
    `;
}

function removeShoppingCart (event) {
    const buttonDelete = event.target; 
    buttonDelete.closest('.shoppingCartitem').remove();
}


//END OF CARRITO//




const menu = document.getElementById('menu');
const indicador = document.getElementById('indicador');
const secciones = document.querySelectorAll('.seccion');

let tamañoIndicador = menu.querySelector('a').offsetWidth;
indicador.style.width = tamañoIndicador + 'px';

let indexSeccionActiva;

// Observer
const observer = new IntersectionObserver((entradas, observer) => {
	entradas.forEach(entrada => {
		if(entrada.isIntersecting){
			// Obtenemos cual es la seccion que esta entrando en pantalla.
			// console.log(`La entrada ${entrada.target.id} esta intersectando`);

			// Creamos un arreglo con las secciones y luego obtenemos el index del la seccion que esta en pantalla.
			indexSeccionActiva = [...secciones].indexOf(entrada.target);
			indicador.style.transform = `translateX(${tamañoIndicador * indexSeccionActiva}px)`;
		}
	});
}, {
	rootMargin: '-80px 0px 0px 0px',
	threshold: 0.2
});

// Agregamos un observador para el hero.
observer.observe(document.getElementById('hero'));

// Asignamos un observador a cada una de las secciones
secciones.forEach(seccion => observer.observe(seccion));

// Evento para cuando la pantalla cambie de tamaño.
const onResize = () => {
	// Calculamos el nuevo tamaño que deberia tener el indicador.
	tamañoIndicador = menu.querySelector('a').offsetWidth;

	// Cambiamos el tamaño del indicador.
	indicador.style.width = `${tamañoIndicador}px`;

	// Volvemos a posicionar el indicador.
	indicador.style.transform = `translateX(${tamañoIndicador * indexSeccionActiva}px)`;
}

window.addEventListener('resize', onResize);

//DARK MODE


const bdark = document.querySelector("#btn__darkmode");
const body = document.querySelector("body");

load();

btn__darkmode.addEventListener("click", e => {
	body.classList.toggle("darkmode");
	store(body.classList.contains("darkmode"));
});


function load(){
	const darkM = localStorage.getItem("darkmode");

	if(!darkM){
		store("false");
	}else if(darkM == "true") {
		body.classList.add("darkmode");
	}
};


function store(value){
	localStorage.setItem("darkmode", value);
};


