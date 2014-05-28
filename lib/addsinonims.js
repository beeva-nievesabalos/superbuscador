//var utils = require('./lib/utils'),  <---- aqui está la funcion de omitir Acentos, ahora los quito en el excel.
var fs = require("fs");
var sinonims_file = "./data/sinonims.txt";

fs.readFile(sinonims_file, {"encoding":"utf8"}, function (err, data) {
	if (err) throw err;
 	else {
 		var rows = data.split("\n");
		//console.log("Num palabras: " + rows.length);

		var columns = [];
		for(var i = 0; i < rows.length; i++){
		  	var col = rows[i].trim().split("\t");
		  	var word = col[0].trim();
		  	if(col.length > 1){
		  		var sinonims_space = col[1].replace(/ /g, "");   
		  		var sinonim_raw = sinonims_space.replace(/_/g, " ");   
		  		var sinonims  = sinonim_raw.split(",");
		  	
		  		columns.push([word, sinonims]);
		  		//console.log("Num sinonimos: " + sinonims.length);
		  	}
		  	else {
		  		columns.push(word);
		  	}
		}
		//console.log(rows);
		//console.log(columns);
		console.log("Loaded sinonims from "+sinonims_file);
 	}
});
