// rsv.js

export async function fetchReservations() {
    try {
        const response = await fetch("http://localhost:8081/rsv");
        if (response.ok) {
            const reservations = await response.json();
            return reservations;
        } else {
            // Gérer les erreurs ici, par exemple : throw new Error("Erreur lors de la récupération des réservations.");
            console.error("Erreur lors de la récupération des réservations.");
            return [];
        }
    } catch (error) {
        // Gérer les erreurs de requête ici
        console.error(error);
        throw error;
    }
}

export async function addReservation(reservation) {
    try {
        const response = await fetch("http://localhost:8081/rsv", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reservation)
        });

        if (response.ok) {
            // La réservation a été ajoutée avec succès
            return response.json(); // Si vous voulez retourner des données de la réservation ajoutée
        } else {
            // Gérer les erreurs ici, par exemple : throw new Error("Erreur lors de l'ajout de la réservation.");
            console.error("Erreur lors de l'ajout de la réservation.");
            return null;
        }
    } catch (error) {
        // Gérer les erreurs de requête ici
        console.error(error);
        throw error;
    }
}

document.getElementById("form-rsv").addEventListener("submit", async function (event) {
    event.preventDefault();

    // Récupérez les données du formulaire
    const id = document.querySelector('input[name="id"]').value;
    const nom = document.querySelector('input[name="nom"]').value;
    const prenom = document.querySelector('input[name="prenom"]').value;
    const cvts = parseInt(document.querySelector('input[name="cvts"]').value);
    const heure = document.querySelector('input[name="heure"]').value;

    // Vérifiez que toutes les données sont remplies
    if (!id || !nom || !prenom || isNaN(cvts) || !heure) {
        console.error("Tous les champs doivent être remplis.");
        return;
    }

    // Créez un objet réservation avec les données du formulaire
    const reservation = {
        id: id,
        nom: nom,
        prenom: prenom,
        cvts: cvts,
        heure: heure
    };

    // Ajoutez la réservation en appelant la fonction addReservation
    try {
        const addedReservation = await addReservation(reservation);
        if (addedReservation) {
            // La réservation a été ajoutée avec succès, vous pouvez effectuer des actions supplémentaires si nécessaire
            console.log("Réservation ajoutée avec succès :", addedReservation);
        } else {
            console.error("Erreur lors de l'ajout de la réservation.");
        }
    } catch (error) {
        console.error("Erreur lors de l'ajout de la réservation :", error);
    }
});
	
