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
    
    update(req, res) {
        const id = req.params.id;
        const updatedData = req.body;
    
        CarModel.findByIdAndUpdate(id, updatedData, { new: true })
            .then(updatedCar => {
                if (!updatedCar) {
                    return res.status(404).json({ error: 'La voiture n\'a pas été trouvée' });
                }
                res.json(updatedCar);
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: 'Erreur lors de la mise à jour de la voiture' });
            });
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