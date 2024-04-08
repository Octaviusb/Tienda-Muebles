// Datos de los productos
const productos = [
    { id: 1, nombre: 'Sala Moderna', precio: 1220000, imagen: 'img/producto1.jpg', descripcion: 'Sofa 2 poltronas y mesa de centro forrado en cuero blanco'},
    { id: 2, nombre: 'Madera Maciza', precio: 1550000, imagen: 'img/producto2.jpg', descripcion: 'La madera maciza ennoblece tus estancias y da larga vida a los muebles,' },
    { id: 3, nombre: 'Nuevo Estilo', precio: 1550000, imagen: 'img/producto3.jpg', descripcion: 'Eje sobre el que gira la vida en la zona de estar' },
    { id: 4, nombre: 'Producto 4', precio: 24.99, imagen: 'img/producto4.jpg' },
    { id: 5, nombre: 'Producto 5', precio: 9.99, imagen: 'img/producto5.jpg' },
    { id: 6, nombre: 'Producto 6', precio: 39.99, imagen: 'img/producto6.jpg' },
    { id: 7, nombre: 'Producto 7', precio: 17.99, imagen: 'img/producto7.jpg' },
    { id: 8, nombre: 'Producto 8', precio: 29.99, imagen: 'img/producto8.jpg' },
    { id: 9, nombre: 'Producto 9', precio: 22.99, imagen: 'img/producto9.jpg' },
    { id: 10, nombre: 'Producto 10', precio: 12.99, imagen: 'img/producto10.jpg' },
    { id: 11, nombre: 'Producto 11', precio: 34.99, imagen: 'img/producto11.jpg' },
    { id: 12, nombre: 'Producto 12', precio: 19.99, imagen: 'img/producto12.jpg' },
    { id: 13, nombre: 'Producto 13', precio: 27.99, imagen: 'img/producto13.jpg' },
    { id: 14, nombre: 'Producto 14', precio: 18.99, imagen: 'img/producto14.jpg' },
    { id: 15, nombre: 'Producto 15', precio: 31.99, imagen: 'img/producto15.jpg' },
  ];
  
  // Elementos del DOM
  const productosContainer = document.querySelector('.productos');
  const carritoItems = document.querySelector('.carrito-items');
  const total = document.querySelector('.total');
  const procederPagoBtn = document.querySelector('.proceder-pago');
  const procederPagoTarjetaBtn = document.querySelector('.proceder-pago-tarjeta');
  const procederPagoEfectivoBtn = document.querySelector('.proceder-pago-efectivo');
  const formularioPago = document.querySelector('.formulario-pago');
  
  // Carrito de compras
  let carrito = [];
  
  // Función para renderizar los productos
  function renderizarProductos() {
    productosContainer.innerHTML = ''; // Limpiar el contenedor antes de renderizar
    productos.forEach(producto => {
      const productoElement = document.createElement('div');
      productoElement.classList.add('producto');
      productoElement.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>Precio: $${producto.precio.toFixed(2)}</p>
        <p>Descripcion: ${producto.descripcion || 'No disponible'}</p>
        <button data-id="${producto.id}">Agregar al Carrito</button>
      `;
      productoElement.querySelector('button').addEventListener('click', agregarAlCarrito);
      productosContainer.appendChild(productoElement);
    });
  }
  
  // Función para agregar un producto al carrito
  function agregarAlCarrito(event) {
    const productId = parseInt(event.target.dataset.id);
    const producto = productos.find(item => item.id === productId);
    if (producto) {
      const itemExistente = carrito.find(item => item.id === productId);
      if (itemExistente) {
        itemExistente.cantidad++;
      } else {
        carrito.push({ ...producto, cantidad: 1 });
      }
      renderizarCarrito();
    }
  }
  
  // Función para renderizar el carrito de compras
  function renderizarCarrito() {
    carritoItems.innerHTML = '';
    carrito.forEach(item => {
      const carritoItem = document.createElement('li');
      carritoItem.classList.add('carrito-item');
      carritoItem.innerHTML = `
        ${item.nombre} - Cantidad: ${item.cantidad} - Precio: $${(item.precio * item.cantidad).toFixed(2)}
        <button data-id="${item.id}">Eliminar</button>
      `;
      carritoItem.querySelector('button').addEventListener('click', eliminarDelCarrito);
      carritoItems.appendChild(carritoItem);
    });
    calcularTotal();
  }
  
  // Función para eliminar un producto del carrito
  function eliminarDelCarrito(event) {
    const itemId = parseInt(event.target.dataset.id);
    carrito = carrito.filter(item => item.id !== itemId);
    renderizarCarrito();
  }
  
  // Función para calcular el total a pagar
  function calcularTotal() {
    const totalPagar = carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
    total.textContent = `$${totalPagar.toFixed(2)}`;
  }
  
  function validarFormularioPago() {
    const formaPago = document.querySelector('input[name="formaPago"]:checked').value;
    const nombre = document.getElementById('nombre').value;
    const codigoPostal = document.getElementById('codigoPostal').value;
  
    // Expresiones regulares para validación
    const regexNombre = /^[a-zA-Z\s]+$/;
    const regexCodigoPostal = /^\d{5}$/;
  
    // Si se seleccionó "efectivo", validar solo los campos necesarios
    if (formaPago === 'efectivo') {
  
      // Validar solo los campos necesarios para el pago en efectivo (nombre, código postal, etc.)
      if (!regexNombre.test(nombre)) {
        alert('Por favor, ingrese un nombre válido.');
        return false;
      }
  
      if (!regexCodigoPostal.test(codigoPostal)) {
        alert('Por favor, ingrese un código postal válido (5 dígitos).');
        return false;
      }
  
      // Si todas las validaciones son exitosas, retornar true
      return true;
    }
  
    // Si se seleccionó "tarjeta", realizar la validación completa
    const tarjeta = document.getElementById('tarjeta').value;
    const fechaVencimiento = document.getElementById('fechaVencimiento').value;
    const codigoSeguridad = document.getElementById('codigoSeguridad').value;
  
    const regexTarjeta = /^[0-9]{16}$/;
    const regexFechaVencimiento = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const regexCodigoSeguridad = /^[0-9]{3,4}$/;
  
    if (!regexNombre.test(nombre)) {
      alert('Por favor, ingrese un nombre válido.');
      return false;
    }
  
    if (!regexTarjeta.test(tarjeta)) {
      alert('Por favor, ingrese un número de tarjeta válido (16 dígitos).');
      return false;
    }
  
    if (!regexFechaVencimiento.test(fechaVencimiento)) {
      alert('Por favor, ingrese una fecha de vencimiento válida (MM/AA).');
      return false;
    }
  
    if (!regexCodigoSeguridad.test(codigoSeguridad)) {
      alert('Por favor, ingrese un código de seguridad válido (3 o 4 dígitos).');
      return false;
    }
  
    if (!regexCodigoPostal.test(codigoPostal)) {
      alert('Por favor, ingrese un código postal válido (5 dígitos).');
      return false;
    }
  
    // Si todas las validaciones son exitosas, retornar true
    return true;
  }
  
  // Eventos
  procederPagoBtn.addEventListener('click', () => {
    if (carrito.length > 0) {
      procederPago();
    } else {
      alert('El carrito está vacío. Agregue productos antes de proceder al pago.');
    }
  });
  
  // Evento para el botón "Proceder al Pago con Tarjeta"
  procederPagoTarjetaBtn.addEventListener('click', () => {
    if (validarFormularioPago()) {
      procederPagoConTarjeta();
    } else {
      alert('Por favor, complete correctamente el formulario de pago.');
    }
  });
  
  // Evento para el botón "Proceder al Pago en Efectivo"
  procederPagoEfectivoBtn.addEventListener('click', () => {
    if (validarFormularioPago()) {
      procederPagoEnEfectivo();
    } else {
      alert('Por favor, complete correctamente el formulario de pago.');
    }
  });
  
  // Inicializar la tienda
  renderizarProductos();