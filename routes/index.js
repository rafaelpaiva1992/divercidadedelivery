var conn = require('./../inc/db');
var express = require('express');
var menus = require('./../inc/menus');
var reservations = require('./../inc/reservations');
var contacts = require('./../inc/contacts');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {


        menus.getMenus().then(results =>{
            
            res.render('index', {      // titulo da aba do navegador
            title: 'Diversidade Delivery!',
            menus: results,  //retorna um json da conexao com os dados do banco
            ishome: true
        }); 

      });
});

router.get('/contacts', function(req, res, next) {

   contacts.render(req, res);

});

router.post('/contacts', function(req, res, next) {


   if(!req.body.name){
      contacts.render(req, res, "Digite o nome.");
   }else if(!req.body.email){
      contacts.render(req, res, "Digite o email.");
   }else if(!req.body.message){
      contacts.render(req, res, "Digite a menssagem.");
   }else{

      contacts.save(req.body).then(results =>{


         req.body = {};
         
         contacts.render(req, res, null, "Contato enviado com sucesso!");

         

     }).catch(err => {

         //erro da tabela ele não esta mostrando procurar o porque depois
        contacts.render(req, res, err.message);
        

     });
   }
});

router.get('/menus', function(req, res, next) {
    
    
        menus.getMenus().then(results =>{

            res.render('menus', {      // titulo da aba do navegador
            title: 'Menus - Divercidade Delivery!',
            background: 'images/img_bg_1.jpg',
            h1: 'Saboreie o nosso menu!',
            menus: results

        }); 

     });
});

router.get('/reservations', function(req, res, next) {

      reservations.render(req, res);
});

router.post('/reservations', function(req, res, next) {


     if(!req.body.name){
        reservations.render(req, res, "Digite o nome.");
     }else if(!req.body.email){
        reservations.render(req, res, "Digite o email.");
     }else if(!req.body.people){
        reservations.render(req, res, "Selecione o numero de pessoas.");
     }else if(!req.body.date){
        reservations.render(req, res, "Selecione a data.");
     }else if(!req.body.time){
        reservations.render(req, res, "Selecione a hora");
     }else{
        
        reservations.save(req.body).then(results =>{


            req.body = {};
            reservations.render(req, res, null, "Reserva realizada com sucesso!");

            

        }).catch(err => {
            //erro da tabela ele não esta mostrando procurar o porque depois
            reservations.render(req, res, err.message || err);

            console.log(req.body.name);

        });
     }

});

router.get('/services', function(req, res, next) {

      res.render('services', {      // titulo da aba do navegador
         title: 'Serviços - Divercidade Delivery!',
         background: 'images/img_bg_1.jpg',
         h1: 'É um prazer poder servir!'
     }); 

  });

module.exports = router;
