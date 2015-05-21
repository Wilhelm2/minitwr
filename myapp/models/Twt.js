var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Mytwr');
var db = mongoose.connection; //la base de donnée
db.on('error',console.error);
db.once('open', function(){ console.log("Connected")});
var Schema=mongoose.Schema;
var Twt = new Schema 
    ({
        auteur:String,
        titre:String,
        texte:String,
        date:String,
    });

mongoose.connection.close(function(){console.log("Disconnected")});
module.exports = mongoose.model('Twt',Twt);
