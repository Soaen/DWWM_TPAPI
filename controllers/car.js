const CarModel = require("../models/car");

module.exports = {
    getAll(req, res){
        CarModel.find().then(cars => {
            res.send(cars)
        });
    },

    get(req, res){
        const id = req.params.id;
        console.log("Récupération de la voiture avec l'id " , id);

        CarModel.findById(id).then(car => {
            res.send(car)
        })
    },

    create(req,res){
        const car = new CarModel({...req.body});

        car.save().then(() => {
            res.send({
                response: `Création de la voiture ${car.name} effectuée avec succès`
            });
        })
    },

    update(req,res){
    const carId = req.params.carId; // Supposons que vous avez l'identifiant du véhicule que vous souhaitez mettre à jour dans les paramètres de la requête.

    const updatedData = req.body; // Les nouvelles données que vous souhaitez utiliser pour la mise à jour.

    CarModel.findOneAndUpdate({ _id: carId }, updatedData, { new: true }, (err, car) => {
        if (err) {
            return res.status(500).json({ error: "Erreur lors de la mise à jour de la voiture" });
        }

        if (!car) {
            return res.status(404).json({ error: "Voiture non trouvée" });
        }

        res.json({
            response: `Mise à jour de la voiture ${car.name} effectuée avec succès`,
            updatedCar: car
        });
    });
    },

    create(req,res){
        const car = new CarModel({...req.body});

        CarModel.find

        car.find().then(() => {
            res.send({
                response: `Création de la voiture ${car.name} effectuée avec succès`
            });
        })
    },

    delete(req,res){
        const id = req.params.id;

        //if(!id){
        //    res.status(400).json({message: "Paramètre id invalide"})
        //}

        CarModel.findByIdAndDelete(id).then(car => {
            res.send({
                response: `Suppression de la voiture ${car.name} avec l'id ${car.id}`
            })
        });
    }
}