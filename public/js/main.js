document.addEventListener("DOMContentLoaded", function () {
    const productList = document.getElementById("product-list");
    const cartContainer = document.getElementById("cart-items");

    // Cargar los productos desde el archivo CSV (esta parte se mantiene igual)
    Papa.parse('/data/productos.csv', {
        // ... (código existente de Papa.parse)
    });

    // Obtener carrito desde localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Función para agregar productos al carrito
    window.addToCart = function (nombre, precio, imagen) {
        const existingProduct = cart.find(item => item.nombre === nombre);
        
        if (existingProduct) {
            existingProduct.cantidad++;
        } else {
            cart.push({
                nombre: nombre,
                precio: precio,
                imagen: imagen,
                cantidad: 1
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }

    // Función para eliminar producto del carrito
    window.removeFromCart = function(nombre) {
        cart = cart.filter(item => item.nombre !== nombre);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }

    // Función para actualizar cantidad
    window.updateQuantity = function(nombre, newQuantity) {
        const item = cart.find(item => item.nombre === nombre);
        if (item) {
            item.cantidad = parseInt(newQuantity) || 1;
            if (item.cantidad < 1) item.cantidad = 1;
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCart();
        }
    }

    // Función para mostrar los productos del carrito
    function displayCart() {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const tableBody = document.querySelector('#cart-items tbody');
        
        if (!tableBody) {
            console.error('No se encontró el elemento tbody en la tabla del carrito');
            return;
        }

        tableBody.innerHTML = '';

        if (cartItems.length === 0) {
            const emptyRow = document.createElement('tr');
            emptyRow.innerHTML = '<td colspan="5" class="text-center">No hay productos en el carrito.</td>';
            tableBody.appendChild(emptyRow);
            return;
        }

        cartItems.forEach(item => {
            const row = document.createElement('tr');
            const total = item.precio * item.cantidad;
            
            row.innerHTML = `
                <td>
                    <img src="${item.imagen}" alt="${item.nombre}" style="width: 50px; height: 50px; object-fit: cover;">
                </td>
                <td>${item.nombre}</td>
                <td>$${item.precio}</td>
                <td>
                    <input type="number" 
                           value="${item.cantidad}" 
                           min="1" 
                           onchange="updateQuantity('${item.nombre}', this.value)"
                           class="form-control" 
                           style="width: 80px;">
                </td>
                <td>$${total.toFixed(2)}</td>
                <td>
                    <button onclick="removeFromCart('${item.nombre}')" 
                            class="btn btn-danger btn-sm">
                        Eliminar
                    </button>
                </td>
            `;
            
            tableBody.appendChild(row);
        });

        // Actualizar el total del carrito
        const total = cartItems.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
        const totalElement = document.getElementById('cart-total');
        if (totalElement) {
            totalElement.textContent = `$${total.toFixed(2)}`;
        }
    }

    // Llamar a displayCart al cargar la página
    displayCart();
});

// Añadir al final de tu archivo main.js
document.getElementById('clear-cart').addEventListener('click', function() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
});

document.getElementById('checkout').addEventListener('click', function() {
    // Aquí puedes añadir la lógica para proceder al pago
    if (cart.length === 0) {
        alert('El carrito está vacío');
        return;
    }
    // Redirigir a la página de pago o mostrar un modal de pago
    alert('Redirigiendo al proceso de pago...');
});