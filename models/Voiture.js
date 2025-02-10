const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./User");

const Voiture = sequelize.define("Voiture", {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }

});

User.hasMany(Voiture, { foreignKey: "userId", onDelete: "CASCADE" });
Voiture.belongsTo(User, { foreignKey: "userId" });

module.exports = Voiture;
