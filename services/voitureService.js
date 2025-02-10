const { Voiture } = require("../models");

const getAllCars = async () => {
    return await Voiture.findAll();
};

const getCarsByUserId = async (userId) => {
    return await Voiture.findAll({
        where: { userId },
    });
};

module.exports = {
    getAllCars,
    getCarsByUserId,
};
