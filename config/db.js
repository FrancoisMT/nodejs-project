const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("nodeproject_db", "root", "my-db-password", {
    host: "localhost",
    dialect: "mariadb",
    port: 3306, 
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
