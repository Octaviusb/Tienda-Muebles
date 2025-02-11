document.addEventListener("DOMContentLoaded", function () {
    const loginIcon = document.getElementById("login-icon");
    const heartIcon = document.getElementById("heart-icon");
    const cartIcon = document.getElementById("cart-icon");

    const loginPopup = document.getElementById("login-popup");
    const heartPopup = document.getElementById("heart-popup");
    const cartPopup = document.getElementById("cart-popup");

    // Función para mostrar popups
    function mostrarPopup(popup) {
        if (popup) {
            popup.style.display = "flex";
        }
    }

    // Función para ocultar popups
    function ocultarPopup(popup) {
        if (popup) {
            popup.style.display = "none";
        }
    }

    // Mostrar popups al pasar el mouse
    if (loginIcon) {
        loginIcon.addEventListener("mouseenter", function () {
            mostrarPopup(loginPopup);
        });
    }

    if (heartIcon) {
        heartIcon.addEventListener("mouseenter", function () {
            mostrarPopup(heartPopup);
        });
    }

    if (cartIcon) {
        cartIcon.addEventListener("mouseenter", function () {
            mostrarPopup(cartPopup);
        });
    }

    // Ocultar popups cuando el mouse salga
    if (loginPopup) {
        loginPopup.addEventListener("mouseleave", function () {
            ocultarPopup(loginPopup);
        });
    }

    if (heartPopup) {
        heartPopup.addEventListener("mouseleave", function () {
            ocultarPopup(heartPopup);
        });
    }

    if (cartPopup) {
        cartPopup.addEventListener("mouseleave", function () {
            ocultarPopup(cartPopup);
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const icons = document.querySelectorAll(".user-icon");

    icons.forEach(icon => {
        icon.addEventListener("mouseenter", function () {
            cerrarPopups(); // Cierra otros popups
            const popupId = icon.id.replace("-icon", "-popup");
            const popup = document.getElementById(popupId);
            popup.classList.add("active");
        });

        icon.addEventListener("mouseleave", function () {
            setTimeout(() => {
                const popupId = icon.id.replace("-icon", "-popup");
                const popup = document.getElementById(popupId);
                popup.classList.remove("active");
            }, 300); // Pequeño retraso para evitar cierre instantáneo
        });
    });

    function cerrarPopups() {
        document.querySelectorAll(".popup").forEach(popup => popup.classList.remove("active"));
    }
});
