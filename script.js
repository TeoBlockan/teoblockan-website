document.addEventListener("DOMContentLoaded", function() {
    const serverIP = "TU_IP_AQUÍ"; // Reemplaza con la IP de tu servidor

    fetch(`https://api.mcstatus.io/v2/status/java/${serverIP}`)
        .then(response => response.json())
        .then(data => {
            if (data.online) {
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
