var mongoose = require('mongoose');
var Schema=mongoose.Schema;
var Twt = new Schema 
    ({
        user:String;
        texte:String;
        categorie:String;
    });
module.exports = mongoose.model("Twt",Twt);
