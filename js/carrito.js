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




//CARITO DE COMPRAS

//VARIABLES
let contenedoresCarrito = document.querySelector(".productos");
let containerBuyCart = document.querySelector(".card-items");
let priceTotal = document.querySelector('.total-price');
let amountProduct = document.querySelector('.count-product')

let  buyThings = [];
let totalCard = 0; 
let countProduct = 0;


//FUNCIONES
loadEventListeners();
function loadEventListeners(){
    contenedoresCarrito.addEventListener('click', addProduct);

    containerBuyCart.addEventListener('click', deleteProduct)
}

//AGREGAR PRODUCTOS
function addProduct(e){
    e.preventDefault();
    if (e.target.classList.contains('btn__carrito')){
        const selectProduct = e.target.parentElement;
        readTheContent(selectProduct);   
    }   
}

//BORRAR PRODUCTOS
function deleteProduct(e) {
    if (e.target.classList.contains('delete-product')){
        const deleteId = e.target.getAttribute('data-id');

        buyThings.forEach(value => {
            if (value.id == deleteId) {
                let priceReduce = parseInt(value.price) * parseInt(value.amount);
                totalCard = totalCard - priceReduce;
            } 
        })

        buyThings = buyThings.filter(product => product.id !== deleteId);

        countProduct--;
        }
        loadHtml();
}

//INFO PRODUCTOS
function readTheContent(product) {
    const infoProduct = {
        title : product.querySelector('.title').textContent,
        price : product.querySelector('.price').textContent,
        id : product.querySelector('button').getAttribute('data-id'),
        amount : 1
    }

//SUMAMOS TOTAL DE PRODUCTOS
totalCard =   parseInt(totalCard) + parseInt(infoProduct.price);   



// SI EXTISTE, ENTONCES NO LO REPITAS, SINO QUE LO SUMES     
    const exist = buyThings.some(product => product.id === infoProduct.id);
    if (exist) {
        const pro = buyThings.map(product => {
            if (product.id === infoProduct.id) {
                product.amount++;
                return product;
            } else {
                return product
            }
        });
        buyThings = [...pro];
    } else {
        buyThings = [...buyThings, infoProduct]
        countProduct++;
    }
    loadHtml();
    //console.log(infoProduct);
}
    

function loadHtml(){
    clearHtml();
    buyThings.forEach(product => {
        const {title,price,id,amount} = product;
        const row = document.createElement('div');
        row.classList.add('item');
        row.innerHTML = `
        <div class="item-content">
            <h5>${title}</h5>
            <h5 class="cart-price"> ${price}</h5>
            <h6>Cantidad: ${amount}</h6>
        </div>
        <span class="delete-product" data-id="${id}">X</span>
        `;

        containerBuyCart.appendChild(row);

        priceTotal.innerHTML = totalCard;
        
        amountProduct.innerHTML = countProduct;
    })
}

function clearHtml(){
    containerBuyCart.innerHTML = '';
}

