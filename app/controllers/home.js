var express = require('express'),
  router = express.Router(),
  Article = require('../models/article');
var exphbs  = require('express-handlebars');
var Handlebars = require('handlebars');

    var fs = require("fs");

  var hbs = exphbs.create({
    // Specify helpers which are only registered on this instance.
    helpers: {
        linkmenu: function (text, descrip) {

            text = Handlebars.Utils.escapeExpression(text);
            url = Handlebars.Utils.escapeExpression(descrip);

            var result = '<span class="text-muted">' + text + ': ' + descrip + '</span>';

            return new Handlebars.SafeString(result);
        }
    }
});

module.exports = function (app) {

  app.use('/', router);
  router.get('/paginauno', function(req,res){

    res.send('Estas en la pagina uno..');
});

};

var datospersonales=[
            {
                descrip: "Empresa",
                text: "HanSoloEstrellado.sl"
            },
            {
                descrip: "Calle",
                text: "Cita 33, local Izquierdo"
            },
            {
                descrip: "Ciudad",
                text: "Zaragoza"
            },
            {
                descrip: "Telefono",
                text: "976112233"
            },
            {
                descrip: "Manejando Handlebars@",
                text: "2017"
            }];


router.get('/', function (req, res, next) {
  var articles = [new Article(), new Article()];
    res.render('index', {
      title: 'Generator-Express MVC',
      articles: articles,
      datospersonales:datospersonales,
      helpers: {
            list: function (context, options) {
            var ret = "<ol>";

            for (var i = 0, j = context.length; i < j; i++) {
                ret = ret + "<li>" + options.fn(context[i]) + "</li>";
            }

            return ret + "</ol>";
            },
            linkmenu: function (text, descrip) {

            text = Handlebars.Utils.escapeExpression(text);
            url = Handlebars.Utils.escapeExpression(descrip);

            var result = '<span class="text-muted">' + text + ': ' + descrip + '</span>';

            return new Handlebars.SafeString(result);
        }
        }
    });
});



router.get('/json', function(req,res){
    fs.readFile(  "public/js/" + "principal.json", 'utf8', function (err, data) {


        var obj = JSON.parse(data);
        console.log("objeto: "+ obj.datospersonales[0].descrip);

//        res.end( obj.titulo);
        res.end( data);
    });
});

router.get('/users/:name', function(req, res) {
    // the user was found and is available in req.user
    res.send('El nombre es: ' + req.params.name + '!');
});

router.get('/peliculas', function(req,res){
    fs.readFile(  "public/js/" + "pelis.json", 'utf8', function (err, data) {
        var obj = JSON.parse(data);
//        res.end( obj.titulo);
        res.render(
            'pelis',{
                title: 'VideoClub con express',
                peliculas: obj
            }
        );
    });
});
router.get('/peliculas/:id', function(req,res){
    var id = req.params.id;
    var pelicula ={};
    fs.readFile(  "public/js/" + "pelis.json", 'utf8', function (err, data) {
        var obj = JSON.parse(data);
        for(var i = 0; i< obj.length; i++){
            if(obj[i].id === id){
               pelicula.title = obj[i].title;
               pelicula.year = obj[i].year;
               pelicula.director = obj[i].director;
               pelicula.poster = obj[i].poster;
               pelicula.rented = obj[i].rented;
               pelicula.synopsis = obj[i].synopsis;

            }
        }

        res.render(
            'showpeli',{
                title: 'VideoClub con express',
                pelicula: pelicula
            }
        );
    });
});
