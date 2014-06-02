/*
 * Configuration SERVER params
 */
var express = require('express')
  , routes = require('./routes')
  , path = require('path')
  , nlpquery = require('./lib/nlpquery');
var corr = require("./lib/correctorteacher");
var server =  express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var exec = require('child_process').exec;
var sys = require('sys');

// all environments
server.set('port', process.env.PORT || 2185);
server.set('views', __dirname + '/views');
server.set('view engine', 'jade');
server.use(bodyParser()); // Necesario para los form!!!!
server.use(methodOverride());
server.use(express.static(path.join(__dirname, 'public')));

/*if ('development' == server.get('env')) {
	server.use(express.errorHandler());
}*/

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
server.use(allowCrossDomain);

// REST GENERALES
server.get('/', routes.index);
// similar a server.get('/ioe/addType', routes.ioe_type_add); 

server.set('title', 'Application Title');

server.get('/superbuscador/:name', function(req, res) {
  res.type('application/json');
  var cadena = req.params.name;
  console.log("Parameter: " + cadena);
 
  respuesta = new Object();
  respuesta.sentencia = cadena;

  var command = "./freeling.sh "
  console.log("\ncandena entrada: " + cadena)

  corr.corregir(cadena,function (resultado){
    console.log("cadena corregida: " + resultado)
    respuesta.correccion=resultado
    //Para ejecutar freeling con la cadena que me mandan...
    //./freeling.sh 'blabla blabala'
    child = exec(command + "'"+resultado+"'", function (error, stdout, stderr) {
      if (error !== null) {
        console.log('exec error: ' + error);
        respuesta.intencion = stderr;
        sys.print('stderr: ' + stderr);
      }
      else {
        // no error:
        // Aquí debería sacar los Verbos y los sustantivos
        stdout = stdout.replace('\n','').trim()
        sys.print('stdout: ' + stdout + 'acabado');
        respuesta.intencion= stdout;
      }
      res.type('application/json');
      //res.send(stdout);
      res.json(respuesta);
    });
  });


});

server.post('/', nlpquery.query);

module.exports = server;
