document.addEventListener("DOMContentLoaded", async () => {
    const reservationsTable = document.getElementById("reservations-table");

    try {
        // Récupérez les réservations depuis votre API
        const response = await fetch("http://localhost:8081/rsv");
        const data = await response.json();

        // Affichez les réservations dans le tableau en utilisant map
        const rows = data.reservations.map(reservation => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${reservation.id}</td>
                <td>${reservation.nom}</td>
                <td>${reservation.prenom}</td>
                <td>${reservation.cvts}</td>
                <td>${reservation.heure}</td>
                <td><button class="delete-button"> X </button></td>
            `;

            const deleteButton = row.querySelector(".delete-button");
            deleteButton.addEventListener("click", async () => {
                try {
                    // Envoyez une requête pour supprimer la réservation correspondante
                    const deleteResponse = await fetch(`http://localhost:8081/rsv/${reservation.id}`, {
                        method: "DELETE"
                    });

                    if (deleteResponse.ok) {
                        // Si la suppression est réussie, supprimez la ligne du tableau
                        row.remove();
                    } else {
                        console.error("Erreur lors de la suppression de la réservation.");
                    }
                } catch (error) {
                    console.error("Erreur lors de la suppression de la réservation :", error);
                }
            });

            return row;
        });

        // Ajoutez toutes les lignes au tableau
        rows.forEach(row => {
            reservationsTable.appendChild(row);
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des réservations :", error);
    }
});
