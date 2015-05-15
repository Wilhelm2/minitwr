var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var UtilisateurS = new Schema
    ({
        email:String,
        mdp:String,
        nom:String,
        prenom:String,
        nomUtilisateur:String,
        age:String,
        messageProfil:String,
        fonction:String
    });
var UtilisateurM = mongoose.model('UtilisateurM',UtilisateurS);
module.exports = UtilisateurM;
