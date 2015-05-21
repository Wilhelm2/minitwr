var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/Mytwr');
var db = mongoose.connection; //la base de donnée
db.on('error',console.error);
db.once('open', function(){ console.log("Connected")});
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
mongoose.connection.close(function(){console.log("Disconnected")});
module.exports = UtilisateurM;
