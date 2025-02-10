const request = require("supertest");
const app = require("../app");
const { Voiture } = require("../models"); 
const voitureService = require("../services/voitureService");

jest.mock("../services/voitureService"); 

describe("Tests de l'API Voiture", () => {

    it("devrait récupérer toutes les voitures", async () => {

        voitureService.getAllCars.mockResolvedValue([
            { id: 1, description: "Voiture de sport rouge", userId: 1 },
            { id: 2, description: "Voiture citadine bleue", userId: 1 }
        ]);

        const response = await request(app).get("/api/voitures");

        expect(response.status).toBe(200);  
        expect(response.body.length).toBe(2);  
        expect(response.body[0].description).toBe("Voiture de sport rouge");
    });

    it("devrait récupérer les voitures d'un utilisateur", async () => {
        const userId = 1;

        voitureService.getCarsByUserId.mockResolvedValue([
            { id: 1, description: "Voiture de sport rouge", userId: 1 },
            { id: 2, description: "Voiture citadine bleue", userId: 1 }
        ]);

        const response = await request(app).get(`/api/voitures/user/${userId}`);

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
        expect(response.body[0].description).toBe("Voiture de sport rouge");
    });

    it("devrait ajouter une voiture", async () => {
        const voitureData = { description: "Voiture électrique blanche", userId: 2 };
        const mockCreatedVoiture = { ...voitureData, id: 1 };

        Voiture.create = jest.fn().mockResolvedValue(mockCreatedVoiture); 

        const response = await request(app).post("/api/voitures")
            .send(voitureData);

        expect(response.status).toBe(201);
        expect(response.body.description).toBe("Voiture électrique blanche");
        expect(response.body.userId).toBe(2);
    });

    it("devrait retourner une erreur 400 si des données sont manquantes", async () => {
        const response = await request(app).post("/api/voitures").send({});

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("La description et l'ID de l'utilisateur sont requis");
    });


});
