
var http = require('http'), EventEmitter = require('events').EventEmitter;

/* Configuración GLOBAL */
app = new EventEmitter(); 
app["server"] = require("./config"); //crea una variable que configura el server (express)
app["name"] = "Superbuscador!";

/* START server http*/
http.createServer(app.server).listen(app.server.get('port'), function(){
      console.log("\n\n"+app["name"]+" - listening on port " + app.server.get('port'));
});
