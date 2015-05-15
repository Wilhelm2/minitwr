var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var Utilisateur= new Schema
    ({
        nom:String;
        mdp:String;
        email:String;
    });
module.exports = mongoose.model('Utilisateur',Utilisateur);
