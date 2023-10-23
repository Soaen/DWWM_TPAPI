const CarController = require('../controllers/car')

module.exports = server => {
    server.get("/", (req, res) => {
        res.send("bienvenue sur la page d'accueil");
    })

    server.get("/cars", (req, res) => {
        CarController.getAll(req, res);
    })

    server.get("/cars/:id", (req,res) => {
        CarController.get(req, res);
    })

    server.post("/cars", (req, res) =>{
        CarController.create(req,res);
    })
    server.put("/cars/:carId", (req, res) =>{
        CarController.update(req,res);
    })

    server.delete("/cars/:id", (req, res) => {
        CarController.delete(req,res);
    })
}