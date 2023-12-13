const acc = document.querySelectorAll('.acordeon-button');

acc.forEach(button => {
	button.addEventListener('click', function () {
		const icon = this.querySelector('i');
		if (icon.classList.contains('fa-plus')) {
			icon.classList.remove('fa-plus');
			icon.classList.add('fa-minus');
		} else {
			icon.classList.remove('fa-minus');
			icon.classList.add('fa-plus');
		}

		this.classList.toggle('active');
		const content = this.nextElementSibling;
		if (content.style.height) {
			content.style.height = null;
			content.style.padding = '0px';
		} else {
			const padding = 20;
			content.style.height =
				content.scrollHeight + padding * 2 + 'px';
			content.style.padding = `${padding}px`;
		}
	});
});

const sizeButtons = document.querySelectorAll('.btn-size');
const valueSize = document.querySelector('#value-size');

sizeButtons.forEach(button => {
	button.addEventListener('click', e => {
		sizeButtons.forEach(btn => btn.classList.remove('selected'));
		e.currentTarget.classList.add('selected');
		const size = e.target.textContent;
		valueSize.innerText = size;
	});
});

const colorButtons = document.querySelectorAll('.container-color');
const valueColor = document.querySelector('#value-color');

colorButtons.forEach(button => {
	button.addEventListener('click', e => {
		colorButtons.forEach(btn => btn.classList.remove('selected'));
		e.currentTarget.classList.add('selected');
		const color = e.target.dataset.color;
		valueColor.innerText = color;
	});
});

const btnIncrement = document.querySelector('#btn-increment');
const btnDecrement = document.querySelector('#btn-decrement');
const countProduct = document.querySelector('#count-product');
const totalProductsCart = document.querySelector(
	'.count-products-cart'
);
const btnAddToCart = document.querySelector('.btn-add-to-cart');

const priceElement = document.querySelector('.price-value');
const quantityProduct = document.querySelector('#quantity-product');
const totalValue = document
	.querySelector('.value')
	.querySelector('p');
const totalPrice = document.querySelector('.price-total');




const priceText = priceElement.textContent.trim();
console.log('Precio extraído:', priceText); 
const price = parseFloat(priceText.replace('$', ''));
console.log('Precio convertido:', price); 



// Verificar 
if (!isNaN(price)) {
    let quantity = parseInt(countProduct.textContent);
    let total = `$${(quantity * price).toFixed(2)}`; //2decimales
    quantityProduct.textContent = quantity;
    totalValue.textContent = total;
    totalPrice.textContent = total;
} else {
    console.error('El precio no es válido.');
}


const updateButtonState = () => {
	if (parseInt(countProduct.textContent) <= 1) {
		btnDecrement.disabled = true;
	} else {
		btnDecrement.disabled = false;
	}
};

const updateValueQuantity = () => {
	let quantity = parseInt(countProduct.textContent);
	let price = parseInt(priceElement.textContent.replace('$', ''));
	let total = `$${quantity * price}.00`;
	quantityProduct.textContent = quantity;
	totalValue.textContent = total;
	totalPrice.textContent = total;
};

btnIncrement.addEventListener('click', () => {
	countProduct.textContent = parseInt(countProduct.textContent) + 1;
	updateValueQuantity();
	updateButtonState();
});

btnDecrement.addEventListener('click', () => {
	countProduct.textContent = parseInt(countProduct.textContent) - 1;
	updateValueQuantity();
	updateButtonState();
});

/* btnAddToCart.addEventListener('click', () => {
	totalProductsCart.textContent =
		parseInt(totalProductsCart.textContent) +
		parseInt(countProduct.textContent);
	countProduct.textContent = 1;
	updateValueQuantity();
}); */

/*           MENU RESPONSIVE          */

let overlay = document.querySelector('#overlay');
let menuHamburger = document.querySelector('.menu-hamburger');
let menuResponsive = document.querySelector('.menu-responsive');
let menuClose = document.querySelector('.btn-close-responsive');

menuHamburger.addEventListener('click', () => {
	menuResponsive.classList.add('active');
	overlay.style.display = 'block';
	document.body.style.overflow = 'hidden'; 
});

    /* Scroll */
menuClose.addEventListener('click', () => {
	menuResponsive.classList.remove('active');
	overlay.style.display = 'none';
	document.body.style.overflow = 'auto'; 
});

updateButtonState();



function mostrarCarrito() {
    var carritoCompras = document.querySelector('.carrito-compras');
    if (carritoCompras.style.display === 'none' || carritoCompras.style.display === '') {
        carritoCompras.style.display = 'block';
    } else {
        carritoCompras.style.display = 'none';
    }

    /* var carritoCompras = document.querySelector('.carrito-compras');
    if (carritoCompras.style.display === 'none' || carritoCompras.style.display === '') {
        carritoCompras.style.display = 'block';
        document.body.style.overflowX = 'hidden'; 
    } else {
        carritoCompras.style.display = 'none';
        document.body.style.overflowX = 'auto'; tal
    } */

    const cuerpoTabla = document.getElementById('cuerpo-tabla-carrito');
    cuerpoTabla.innerHTML = ''; 

    let totalCarrito = 0;

    // Recorrer merca
    Object.keys(carrito).forEach((producto) => {
        const fila = document.createElement('tr');

        const columnaProducto = document.createElement('td');
        columnaProducto.textContent = producto;

        const cantidad = carrito[producto].cantidad;

        const columnaCantidad = document.createElement('td');
        columnaCantidad.textContent = cantidad;

        const precioUnitario = carrito[producto].precio;

        const columnaPrecio = document.createElement('td');
        columnaPrecio.textContent = `$${precioUnitario}.00`;

        const totalProducto = cantidad * precioUnitario;
        const columnaTotal = document.createElement('td');
        columnaTotal.textContent = `$${totalProducto}.00`;

        fila.appendChild(columnaProducto);
        fila.appendChild(columnaCantidad);
        fila.appendChild(columnaPrecio);
        fila.appendChild(columnaTotal);

        cuerpoTabla.appendChild(fila);

        totalCarrito += totalProducto;
    });

    const totalCarritoElement = document.getElementById('total-carrito');
    totalCarritoElement.textContent = `$${totalCarrito}.00`;
}



const carrito = {};




btnAddToCart.addEventListener('click', () => {
    const nombreProducto = document.getElementById('NOMBRE_Produc').textContent;
    const precioElement = document.querySelector('.price-value');
    const precioUnitario = parseFloat(precioElement.textContent);

    console.log('Nombre del producto:', nombreProducto);
    console.log('Precio unitario:', precioUnitario);

    if (nombreProducto !== '#NOMBRE_Produc' && !isNaN(precioUnitario) && precioUnitario !== 0) {
        if (carrito.hasOwnProperty(nombreProducto)) {
            carrito[nombreProducto].cantidad += parseInt(countProduct.textContent);
        } else {
            carrito[nombreProducto] = {
                cantidad: parseInt(countProduct.textContent),
                precio: precioUnitario
            };
        }

        const cantidadActual = parseInt(totalProductsCart.textContent);
        const cantidadNueva = cantidadActual + parseInt(countProduct.textContent);
        totalProductsCart.textContent = cantidadNueva;

        actualizarTablaCarrito();
    } else {
        console.error('Error al obtener los datos del producto o precio.');
    }
});



//#region img




document.addEventListener('DOMContentLoaded', function() {
    
	const imagenes = document.querySelectorAll('.imagen-producto img');
	const modal = document.querySelector('.modal');
	const modalImagen = document.querySelector('.modal-imagen');
	const cerrarModal = document.querySelector('.cerrar');
	
	imagenes.forEach(imagen => {		
		imagen.addEventListener('click', () => {
			
			console.log('Clic en la imagen');
			
			modal.style.display = 'flex';
			modalImagen.src = imagen.src;
			document.body.classList.add('modal-open'); 
			modalImagen.classList.add('imagen-producto-clicked');
	
			console.log('Clase agregada al modal ');
		});
	});
	
	cerrarModal.addEventListener('click', () => {
	
		console.log('Cerrando modal');
	
		modal.style.display = 'none';
		document.body.classList.remove('modal-open'); 
		modalImagen.classList.remove('imagen-producto-clicked'); 
		
		console.log('Clase removida del modal');
	
	
	});
	
	window.addEventListener('click', (event) => {
		if (event.target === modal) {
	
			console.log('Clic fuera del modal');
	
			modal.style.display = 'none';
			document.body.classList.remove('modal-open');
			modalImagen.classList.remove('imagen-producto-clicked'); 
	
			console.log('Clase removida del modal: imagen-producto-clicked');
	
		}
	});
	
	});


//#endregion


















































//#region Casi_peroNO


/* const carrito = {};

function actualizarTablaCarrito() {
    const cuerpoTabla = document.getElementById('cuerpo-tabla-carrito');
    cuerpoTabla.innerHTML = '';

    let totalCarrito = 0;

    Object.keys(carrito).forEach((producto, index) => {
        const fila = document.createElement('tr');
        
        const columnaProducto = document.createElement('td');
        columnaProducto.textContent = producto;
        
        const cantidad = carrito[producto].cantidad;
        const precioUnitario = carrito[producto].precio;
        const totalProducto = cantidad * precioUnitario;

        const columnaCantidad = document.createElement('td');
        columnaCantidad.textContent = cantidad;

        const columnaPrecio = document.createElement('td');
        columnaPrecio.textContent = `$${precioUnitario}.00`;

        const columnaTotal = document.createElement('td');
        columnaTotal.textContent = `$${totalProducto}.00`;

        fila.appendChild(columnaProducto);
        fila.appendChild(columnaCantidad);
        fila.appendChild(columnaPrecio);
        fila.appendChild(columnaTotal);

        cuerpoTabla.appendChild(fila);

        totalCarrito += totalProducto;
    });

    const filaTotalCarrito = document.createElement('tr');
    filaTotalCarrito.innerHTML = `<td colspan="3">Total Carrito:</td><td>$${totalCarrito}.00</td>`;
    cuerpoTabla.appendChild(filaTotalCarrito);
}

btnAddToCart.addEventListener('click', () => {
    const nombreProducto = 'Producto Ejemplo'; 
    const cantidadActual = parseInt(countProduct.textContent);
    const precioUnitario = 50;
    
    // Si el producto ya está en el carrito, actualiza la cantidad
    if (carrito.hasOwnProperty(nombreProducto)) {
        carrito[nombreProducto].cantidad += cantidadActual;
    } else {
        carrito[nombreProducto] = {
            cantidad: cantidadActual,
            precio: precioUnitario
        };
    }

    // Actualiza la tabla del carrito
    actualizarTablaCarrito();
}); */
//#endregion


//#region  xd1
/* function actualizarTablaCarrito(cantidadProductos) {
    const cuerpoTabla = document.getElementById('cuerpo-tabla-carrito');
    const productosExistentes = cuerpoTabla.querySelectorAll('tr').length; 

    for (let i = productosExistentes + 1; i <= cantidadProductos; i++) {
        const fila = document.createElement('tr');
        const columnaProducto = document.createElement('td');
        const columnaCantidad = document.createElement('td');

        columnaProducto.textContent = `Producto ${i}`;
        columnaCantidad.textContent = i;

        fila.appendChild(columnaProducto);
        fila.appendChild(columnaCantidad);

        cuerpoTabla.appendChild(fila);
    }
}


btnAddToCart.addEventListener('click', () => {
    const cantidadActual = parseInt(countProduct.textContent);
    totalProductsCart.textContent = cantidadActual; 
    countProduct.textContent = 1;
    updateValueQuantity();
    
    const cantidadProductosCarrito = parseInt(totalProductsCart.textContent);
    actualizarTablaCarrito(cantidadProductosCarrito);
}); */

//#endregion

//#region casicasi
/* function actualizarTablaCarrito() {
    const cuerpoTabla = document.querySelector('#cuerpo-tabla-carrito tbody');
    cuerpoTabla.innerHTML = ''; 

    let totalCarrito = 0;

    Object.keys(carrito).forEach((producto) => {
        const fila = document.createElement('tr');

        const columnaProducto = document.createElement('td');
        columnaProducto.textContent = producto;

        const cantidad = carrito[producto].cantidad;
        const precioUnitario = carrito[producto].precio;

        const columnaCantidad = document.createElement('td');
        columnaCantidad.textContent = cantidad;

        const columnaPrecio = document.createElement('td');
        columnaPrecio.textContent = `$${precioUnitario}.00`;

        const totalProducto = cantidad * precioUnitario;
        const columnaTotal = document.createElement('td');
        columnaTotal.textContent = `$${totalProducto}.00`;

        fila.appendChild(columnaProducto);
        fila.appendChild(columnaCantidad);
        fila.appendChild(columnaPrecio);
        fila.appendChild(columnaTotal);

        cuerpoTabla.appendChild(fila);

        totalCarrito += totalProducto;
    });

    const totalCarritoElement = document.getElementById('total-carrito');
    totalCarritoElement.textContent = `$${totalCarrito}.00`;
}
 */

/*_____________________________________________*/ 

/* btnAddToCart.addEventListener('click', () => {
    const nombreProducto = document.getElementById('NOMBRE_Produc').textContent;
    const precioElement = document.querySelector('.price-value');
    const precioUnitario = parseFloat(precioElement.textContent);

    console.log('Nombre del producto:', nombreProducto);
    console.log('Precio unitario:', precioUnitario);

    if (nombreProducto !== '#NOMBRE_Produc' && !isNaN(precioUnitario) && precioUnitario !== 0) {
        if (carrito.hasOwnProperty(nombreProducto)) {
            carrito[nombreProducto].cantidad += parseInt(countProduct.textContent);
        } else {
            carrito[nombreProducto] = {
                cantidad: parseInt(countProduct.textContent),
                precio: precioUnitario
            };
        }

        actualizarTablaCarrito();
    } else {
        console.error('Error al obtener los datos del producto o precio.');
    }
}); */

//#endregion