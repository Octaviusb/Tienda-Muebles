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