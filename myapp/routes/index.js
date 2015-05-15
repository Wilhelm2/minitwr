var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pageAcceuil', { title: 'Mytwr' });
});
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Mytwr' });
});
router.get('/profil', function(req,res){
    res.render('profil',{title:'Profil'});
});
router.get('/ficheInscription', function(req,res){
    res.render('ficheInscription',{title:'Inscription'});
});

//créer un nouveau utilisateur
router.post('/ficheInscription',function(req,res)
{
   /* var mongoose=require('mongoose');
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
module.exports = UtilisateurM;*/
    var NewUtilisateur = new UtilisateurM;
    NewUtilisateur.email = req.body.email;
    NewUtilisateur.mdp = req.body.mdp;
    NewUtilisateur.nom = req.body.nom;
    NewUtilisateur.prenom = req.body.prenom;
    NewUtilisateur.age = req.body.age;
    NewUtilisateur.messageProfil = req.body.messageProfil;
    NewUtilisateur.fonction = req.body.fonction;  
    NewUtilisateur.nomUtilisateur = req.body.nomUtilisateur;
    NewUtilisateur.save(function(err){
        if(!err){ 
                    return console.log("created");
                }
        else { return console.log(err);
                }
    });
    res.redirect('/index',301);
});

//chercher les utilisateurs
router.get('/Utilisateur', function(req,res){
    return UtilisateurM.find(function (err, Utilisateurs) {
        if(!err){
                res.render('Utilisateurs_liste'),{
                        Utilisateurs : Utilisateurs,
                        title:'Utilisateur'
                    };
        }
        else {
                return console.log(err);
             }
        });
});

//chercher un utilisateur
router.get('/Utilisateur/:name',function(req,res){
        return UtilisateurM.findOne(req.params.nom, function(err, Utilisateur){
            if(!err){
                res.render('Utilisateur',{ 
                    title:'Utilisateur',
                    Utilisateur:Utilisateur
                    });
            }
    });
});


module.exports = router;
