const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importez le module cors
const fs = require('fs'); // Importez le module de système de fichiers

const app = express();
const port = 8081;

app.use(cors()); // Activez CORS pour toutes les routes
app.use(bodyParser.json()); // Middleware pour parser les données JSON

// Endpoint pour récupérer les réservations depuis le fichier db.json
app.get('/rsv', (req, res) => {
    try {
        // Lisez le fichier db.json et parsez son contenu en tant que JSON
        const data = fs.readFileSync('db.json', 'utf8');
        const reservations = JSON.parse(data).rsv;

        // Envoie la réponse avec les réservations
        res.json({ reservations: reservations });
    } catch (error) {
        // En cas d'erreur, envoyez un message d'erreur
        console.error('Erreur lors de la récupération des réservations :', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des réservations.' });
    }
});

// Endpoint pour ajouter une nouvelle réservation dans le fichier db.json
app.post('/rsv', (req, res) => {
    try {
        // Lisez le fichier db.json et parsez son contenu en tant que JSON
        const data = fs.readFileSync('db.json', 'utf8');
        const jsonData = JSON.parse(data);

        // Récupérez la nouvelle réservation à partir du corps de la requête
        const nouvelleReservation = req.body;

        // Ajoutez la nouvelle réservation aux réservations existantes dans le fichier
        jsonData.rsv.push(nouvelleReservation);

        // Écrivez les données mises à jour dans le fichier db.json
        fs.writeFileSync('db.json', JSON.stringify(jsonData, null, 2), 'utf8');

        // Répondre avec un message de succès
        res.json({ message: 'Réservation ajoutée avec succès !' });
    } catch (error) {
        // En cas d'erreur, envoyez un message d'erreur
        console.error('Erreur lors de l\'ajout de la réservation :', error);
        res.status(500).json({ message: 'Erreur lors de l\'ajout de la réservation.' });
    }
});

// Endpoint pour supprimer une réservation par son ID depuis le fichier db.json
app.delete('/rsv/:id', (req, res) => {
    try {
        // Lisez le fichier db.json et parsez son contenu en tant que JSON
        const data = fs.readFileSync('db.json', 'utf8');
        const jsonData = JSON.parse(data);

        // Récupérez l'ID de la réservation à supprimer depuis les paramètres de l'URL
        const reservationId = req.params.id;

        // Recherchez l'index de la réservation dans le tableau des réservations
        const index = jsonData.rsv.findIndex(reservation => reservation.id === reservationId);

        // Si trouvé, supprimez la réservation du tableau
        if (index !== -1) {
            jsonData.rsv.splice(index, 1);

            // Écrivez les données mises à jour dans le fichier db.json
            fs.writeFileSync('db.json', JSON.stringify(jsonData, null, 2), 'utf8');

            // Répondre avec un message de succès
            res.json({ message: 'Réservation supprimée avec succès !' });
        } else {
            // Si non trouvé, envoyez un message d'erreur
            res.status(404).json({ message: 'Réservation non trouvée.' });
        }
    } catch (error) {
        // En cas d'erreur, envoyez un message d'erreur
        console.error('Erreur lors de la suppression de la réservation :', error);
        res.status(500).json({ message: 'Erreur lors de la suppression de la réservation.' });
    }
});

app.listen(port, () => {
    console.log(`Serveur en écoute sur le port ${port}`);
});
