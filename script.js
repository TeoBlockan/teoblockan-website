document.addEventListener("DOMContentLoaded", function() {
    const serverIP = "mc.hypixel.net"; // IP de prueba

    // URL de la API para obtener el estado del servidor
    const apiURL = `https://api.mcstatus.io/v2/status/java/${serverIP}`;

    // Mostrar en consola para depuración
    console.log("Consultando estado del servidor:", apiURL);

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            console.log("Respuesta de la API:", data); // Ver en consola la respuesta

            if (data.online && data.players) {
                document.getElementById("jugadores").textContent = `${data.players.online} / ${data.players.max}`;
            } else {
                document.getElementById("jugadores").textContent = "Servidor offline";
            }
        })
        .catch(error => {
            console.error("Error al obtener el estado del servidor:", error);
            document.getElementById("jugadores").textContent = "No disponible";
        });
});
