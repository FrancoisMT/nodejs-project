require("dotenv").config();

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mariadb",
    port: process.env.DB_PORT,
    logging: console.log,
});

async function DBConnection() {
    try {
        await sequelize.authenticate();
        console.log("✅ Connecté à la base de données MariaDB avec Sequelize");
    } catch (error) {
        console.error("❌ Erreur de connexion :", error);
        process.exit(1);
    }
}

module.exports = { sequelize, DBConnection };
