document.addEventListener("DOMContentLoaded", function() {
    function renderizarBotonPago(idElemento, descripcion, precio) {
        const elemento = document.querySelector(idElemento);
        if (!elemento) {
            console.error("Elemento no encontrado:", idElemento);
            return;
        }

        if (typeof paypal === "undefined") {
            console.error("El SDK de PayPal no está cargando correctamente.");
            return;
        }

        paypal.Buttons({
            style: {
                layout: 'vertical',
                color: 'gold',
                shape: 'rect',
                label: 'pay',
            },
            createOrder: function(data, actions) {
                console.log(`Creando orden para: ${descripcion} - ${precio} USD`);
                return actions.order.create({
                    purchase_units: [{
                        description: descripcion,
                        amount: {
                            currency_code: "USD",
                            value: precio
                        }
                    }]
                });
            },
            onApprove: function(data, actions) {
                console.log("Pago aprobado, capturando orden...");
                return actions.order.capture().then(function(details) {
                    alert(`Pago exitoso, gracias ${details.payer.name.given_name}!`);
                    console.log("Detalles de la transacción:", details);
                });
            },
            onError: function(err) {
                console.error("Error en el pago:", err);
                alert("Hubo un problema con el pago. Inténtalo de nuevo.");
            }
        }).render(idElemento);
    }

    setTimeout(() => {
        console.log("Renderizando botones de PayPal...");
        renderizarBotonPago("#pago-guerrero-azteca", "Rango Guerrero Azteca", "5.00");
        renderizarBotonPago("#pago-guerrero-aguila", "Rango Guerrero Águila", "10.00");
        renderizarBotonPago("#pago-guerrero-jaguar", "Rango Guerrero Jaguar", "15.00");
        renderizarBotonPago("#pago-sumo-sacerdote", "Rango Sumo Sacerdote", "20.00");
        renderizarBotonPago("#pago-tlatoani-supremo", "Rango Tlatoani Supremo", "30.00");
    }, 2000);
});
