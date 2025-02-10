const userService = require("../services/userService");

const getAllUsers = async (req, res) => {

    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs", error });
    }

};

const getUserById = async (req, res) => {

    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de l'utilisateur", error });
    }
    
};

module.exports = {
    getAllUsers,
    getUserById,
};
