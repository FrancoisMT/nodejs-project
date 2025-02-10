const voitureService = require("../services/voitureService");
const { Voiture } = require("../models");

const getAllCars = async (req, res) => {

    try {
        const cars = await voitureService.getAllCars();
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des voitures", error });
    }

};

const getCarsByUserId = async (req, res) => {

    try {
        const cars = await voitureService.getCarsByUserId(req.params.userId);
        if (!cars) {
            return res.status(404).json({ message: "Aucune voiture trouvée pour cet utilisateur" });
        }
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des voitures", error });
    }

};

const createVoiture = async (req, res) => {
    
    try {
        const { description, userId } = req.body; 

        if (!description || !userId) {
            return res.status(400).json({ message: "La description et l'ID de l'utilisateur sont requis" });
        }

        const voiture = await Voiture.create({
            description,
            userId
        });

        res.status(201).json(voiture);
    } catch (error) {
        console.error("Erreur lors de la création de la voiture", error);
        res.status(500).json({
            message: "Erreur lors de la création de la voiture",
            error: error.message,
        });
    }
    
};

module.exports = {
    getAllCars,
    getCarsByUserId,
    createVoiture
};
