document.addEventListener("DOMContentLoaded", function() {
    if (typeof paypal === "undefined") {
        console.error("El SDK de PayPal no está cargando correctamente.");
        return;
    }

    function renderizarBotonPago(idElemento, descripcion, precio) {
        const elemento = document.querySelector(idElemento);
        if (!elemento) {
            console.error("Elemento no encontrado:", idElemento);
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
                return actions.order.capture().then(function(details) {
                    alert("Pago exitoso: " + details.payer.name.given_name);
                });
            },
            onError: function(err) {
                console.error("Error en el pago:", err);
                alert("Hubo un problema con el pago.");
            }
        }).render(idElemento);
    }

    setTimeout(() => {
        renderizarBotonPago("#pago-guerrero-azteca", "Rango Guerrero Azteca", "10.00");
        renderizarBotonPago("#pago-sumo-sacerdote", "Rango Sumo Sacerdote", "20.00");
    }, 1500); // Espera 1.5 segundos para evitar problemas de carga
});
