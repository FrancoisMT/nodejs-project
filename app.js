const express = require("express");
const app = express();
const PORT = 3000;
const { DBConnection, sequelize } = require("./config/db");

const userRoutes = require("./routes/userRoute");
const voitureRoutes = require("./routes/voitureRoutes");

const User = require("./models/User");
const Voiture = require("./models/Voiture");

async function insertTestData() {

    const users = [
        { nom: "Dupont", prenom: "Jean", creationDate: new Date() },
        { nom: "Durand", prenom: "Claire", creationDate: new Date() },
        { nom: "Martin", prenom: "Luc", creationDate: new Date() },
    ];

    const cars = [
        { description: "Voiture de sport rouge", creationDate: new Date(), userId: 1 },
        { description: "Voiture citadine bleue", creationDate: new Date(), userId: 1 },
        { description: "Voiture familiale grise", creationDate: new Date(), userId: 2 },
        { description: "Voiture électrique blanche", creationDate: new Date(), userId: 3 },
    ];

    const countUsers = await User.count();
    if (countUsers === 0) {
        await User.bulkCreate(users); 
        console.log("✅ Utilisateurs de test insérés");
    }

    const countCars = await Voiture.count();
    if (countCars === 0) {
        await Voiture.bulkCreate(cars);  
        console.log("✅ Voitures de test insérées");
    }
}

app.use(express.json());  
app.use("/api/users", userRoutes);  
app.use("/api/voitures", voitureRoutes);

if (process.env.NODE_ENV !== "test") {

    async function startServer() {
        await DBConnection(); 
        await sequelize.sync({ alter: true });
        console.log("✅ Base de données synchronisée avec Sequelize");

        await insertTestData();

        app.listen(PORT, () => {
            console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
        });
    }

    startServer();
}


module.exports = app; 
