var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');
/* GET home page. 
Si la personne est connectée alors elle est redirigée vers la page principale*/
router.get('/', function(req, res, next) {
  if(req.session.user)
    {
        res.render('index',{ title:'Mytwr', session : req.session });
    }
  else
    {        
        res.render('pageAcceuil', { title: 'Acceuil Mytwr' });
    }
});

//Envoi à la page principale + afficher tous les tweets
router.get('/index', function(req, res, next) {
        res.render('index', { title: 'Mytwr',session : req.session });
        
});

//Envoi au profil
router.get('/profil', function(req,res){
    res.render('profil',{title:'Profil', session : req.session });
});
router.get('/modifierprofil',function(req, res, next) {
        res.render('index', { title: 'Mytwr',session : req.session });
});
//Envoi sur la fiche d'inscription
router.get('/ficheInscription', function(req,res){
    res.render('ficheInscription',{title:'Inscription'});
});
//Se connecter en tant que visiteur
router.post('/EntrerVisiteur', function(req,res,next){
    mongoose.connect('mongodb://localhost:27017/Mytwr');
    var db = mongoose.connection; //la base de donnée
    db.on('error',console.error);
    db.once('open', function(){ console.log("Connected")});
    req.session.user={};
    req.session.user.nom = req.body.nom;
    req.session.user.prenom = req.body.prenom;
    req.session.user.nomUtilisateur = req.body.nom +' ' + req.body.prenom;
    TweetM.find(function(err,tweets) {
        if (!err) console.log(tweets);
            req.session.Tweets=tweets;
            res.render('index', { title: 'Mytwr',session : req.session });
            mongoose.connection.close(function(){console.log("Disconnected")});
                
    });
});
//créer un nouveau utilisateur
router.post('/ficheInscription',function(req,res)
{

    mongoose.connect('mongodb://localhost:27017/Mytwr');
    var db = mongoose.connection; //la base de donnée
    db.on('error',console.error);
    db.once('open', function(){ console.log("Connected")});
    UtilisateurM.findOne({'nomUtilisateur' : req.body.Utilisateur}, function(err, Utilisateur){
            if(Utilisateur==null)
                {
                    var NewUtilisateur = new UtilisateurM;
                    NewUtilisateur.email = req.body.Email;
                    NewUtilisateur.mdp = req.body.Mdp;
                    NewUtilisateur.nom = req.body.Nom;
                    NewUtilisateur.prenom = req.body.Prenom;
                    NewUtilisateur.age = req.body.Age;
                    NewUtilisateur.messageProfil = req.body.Message;
                    NewUtilisateur.fonction = req.body.Fonction;  
                    NewUtilisateur.nomUtilisateur = req.body.Utilisateur;
                    NewUtilisateur.save(function(err,doc){
                    console.log(doc);
                    });
                    mongoose.connection.close(function(){console.log("Disconnected")});
                    res.redirect('/',301);
                }
            else
                {
                    res.render('ficheInscription', {err:'Nom déjà utilisé'});
                    console.log('bug');
                    mongoose.connection.close(function(){console.log("Disconnected")});
                }

    });
    
});
//Envoyer un tweet
router.post('/envoyerTweet',function(req,res,err)
{
    if(err) console.log(err);
    if(req.body.titre.value!=''&&req.body.message.value!='')
    {
    var d = new Date();h = 
    d.getHours();
    var min = d.getMinutes();
	var s = d.getSeconds();
    var j = d.getDate();
    var m = d.getMonth();
    var newTweet = new TweetM;
    var tmp;
    if (j<10) j='0'+j;
    if (m<10) m ='0' + m;
    if (h<10) h='0'+h;
    if (min<10) min = '0'+min;
    if (s<10) s = '0'+s;
    mongoose.connect('mongodb://localhost:27017/Mytwr');
    var db = mongoose.connection; //la base de donnée
    db.on('error',console.error);
    db.once('open', function(){ console.log("Connected")});
    if(req.session.user.nomUtilisateur == req.session.user.nom+' '+req.session.user.prenom)
        tmp=req.session.user.nomUtilisateur+'(Invité)'; 
    else 
        tmp=req.session.user.nomUtilisateur;
    newTweet.auteur =tmp;
    newTweet.titre = req.body.titre;
    newTweet.texte = req.body.message;
    newTweet.date = h+': '+ min +': ' + s + ' le ' + j + '/' + m + '/' + d.getFullYear();
    newTweet.save(function(err,doc){
        TweetM.find(function(err,tweets) {
                    if (!err) console.log(tweets);
                    req.session.Tweets=tweets;
                    res.render('index', { title: 'Mytwr',session : req.session });
                    mongoose.connection.close(function(){console.log("Disconnected")});
                });
    });
    }
    else
        res.render('index', { title: 'Mytwr',session : req.session });
    
});
//Modifier le profil
router.post('/modifierprofil',function(req,res,err)
{
    if(err) console.log(err);
    mongoose.connect('mongodb://localhost:27017/Mytwr');
    var db = mongoose.connection; //la base de donnée
    db.on('error',console.error);
    db.once('open', function(){ console.log("Connected")});
    if (req.body.Verification!=req.session.user.mdp)
        {
            res.render('profil',{err:'Mot de passe incorect', session:req.session } );
            mongoose.connection.close(function(){console.log("Disconnected")});
        }
    else
        {
            if(req.body.Email!="") req.session.user.email = req.body.Email;
            if(req.body.Mdp!="") req.session.user.mdp =req.body.Mdp;
            console.log(req.session.user.mdp);
            if(req.body.Nom!="") req.session.user.nom = req.body.Nom;
            if(req.body.Prenom!="") req.session.user.prenom = req.body.Prenom;
            if(req.body.Age!="") req.session.user.age = req.body.Age;
            if(req.body.Message!="") req.session.user.messageProfil = req.body.Message;
            if(req.body.Fonction!="") req.session.user.fonction = req.body.Fonction;
            UtilisateurM.findOne({nomUtilisateur : req.session.user.nomUtilisateur},function(err,Utilisateur){
                if(err) console.log(err);
                Utilisateur.email = req.session.user.email;
                Utilisateur.mdp = req.session.user.mdp;
                Utilisateur.nom = req.session.user.nom;
                Utilisateur.prenom = req.session.user.prenom;
                Utilisateur.age = req.session.user.age;
                Utilisateur.messageProfil = req.session.user.messageProfil;
                Utilisateur.fonction = req.session.user.fonction;
                Utilisateur.save(function(err) { 
                    if(err) console.log(err); 
                    else console.log('yea');
                    res.render('index', {title :'Mytwr', session : req.session});
                    mongoose.connection.close(function(){console.log("Disconnected")});
                    });
                });
        }
});
//Connexion

router.post('/connecter',function(req,res,err)
{
    if(err) console.log(err);
    mongoose.connect('mongodb://localhost:27017/Mytwr');
    var db = mongoose.connection; //la base de donnée
    db.on('error',console.error);
    db.once('open', function(){ console.log("Connected")});
    UtilisateurM.findOne({'nomUtilisateur' : req.body.NomUtilisateur}, function(err, Utilisateur)
    {
        if(Utilisateur==null)
            {   
                res.render('pageAcceuil', {err:'L\'utilisateur n\'existe pas'});
                mongoose.connection.close(function(){console.log("Disconnected")});
            }
        else if(Utilisateur.mdp!=req.body.Mdp)
            {
                res.render('pageAcceuil', {err:'Mot de passe invalide'});
                mongoose.connection.close(function(){console.log("Disconnected")});
            }
        else
            {
                req.session.user = Utilisateur;
                TweetM.find(function(err,tweets) {
                    if (!err) console.log(tweets);
                    req.session.Tweets=tweets;
                    res.render('index', { title: 'Mytwr',session : req.session });
                    mongoose.connection.close(function(){console.log("Disconnected")});
                });
            }
    });
});

//Se déconnecter

router.get('/deconnecter',function(req,res, next)
{
    req.session.destroy(function(err){
    console.log(err)});
    res.render('pageAcceuil',{err:'',session:req.session});
});



module.exports = router;
