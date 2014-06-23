var natural = require('natural'),
	utils = require("./utils"),
	alg = require("./algorithms"),
	//dictionary = require("./dictionary"),
	//clasificador = require("./clasifintencion"),
	sys = require('sys'),
	exec = require('child_process').exec;

var corr = require("./correctorteacher");


/*
*  Métodos que procesan la QUERY desde API REST/llamada interna 
*/
exports.querySearch = function(query, callback_http){
	var child;
	var queryOk="";
	var command = "./freeling.sh "
	console.log("\ncandena entrada: " + query)
	var numpalabras = query.trim().split(" ");
	corr.corregir(query,function (resultado){
		console.log("cadena corregida: " + resultado)
		//Para ejecutar freeling con la cadena que me mandan...
		//./freeling.sh 'blabla blabala'
		child = exec(command + "'"+resultado+"'", function (error, stdout, stderr) {
		sys.print('stdout: ' + stdout);
		sys.print('stderr: ' + stderr);
			if (error !== null) {
				console.log('exec error: ' + error);
				callback_http(true,  error);
			}
			else {
				// no error:
				// Aquí debería sacar los Verbos y los sustantivos
				callback_http(false, stdout);
			}
		});
	});

 	
	
};

// Comunicación REST
exports.query = function(request, response){

	console.log("\n----------------------------");

	var query = request.body.query;

	if (query != ''){
		//Formateando cadena
		//var querysinacentos = utils.omitirAcentos(query);
		//querysinacentos = querysinacentos.toLowerCase();

		exports.querySearch(query, function(error, info){
			if(error == true){
				console.log("\n Error!? " + error);
				//response.send(500, info);
				response.render('index', { title: 'Superbuscador BBVA', information: info, aux: "Intencion: "});
			} else {
				//response.send(200, info);
				response.render('index', { title: 'Superbuscador BBVA', information: info, aux: "Intencion: "});
			}
		});
	}
	else {
		console.log("\n Query empty! Suggest an example.");
		response.render('index', { title: 'BBVA', information: 'E.g.: "consultar transferencias"'});
	}
};


/*exports.queryDistance = function(query, callback_http){
	var resultadosAmbiguos = [];
	var resultadosExactos = [];
	console.log("\nCADENA=" + query)
	var numpalabras = query.trim().split(" ");
	var tokens = tokenizer.tokenize(query);
 	console.log('tokens:'+ tokens);

 	var frasesCompletas = [];
	for(var j = 0; j < frasesCompanias.length; j++){
		for (var i = 0; i < companyList.length; i++){
			frasesCompletas.push(frasesCompanias[j]+companyList[i]);
		}
	}

	for(var j = 0; j < frasesCompletasReservaSalas.length; j++){
		frasesCompletas.push(frasesCompletasReservaSalas[j]);
	}
*/

	//if(numpalabras.length < 3){
		//Distancia entre PALABRAS
		//Jaro–Winkler string distance
		/*alg.jarowinklerDistanceWord(query, companyList, function(error, resultado){
			if(error == 0){
				resultadosAmbiguos.push(resultado);
			}
			else{
				if(error == 2){
					resultadosExactos.push(resultado);
				}
			}
		});

		//Levenshtein distance
		alg.levenshteinDistanceWord(query, companyList, function(error, resultado){
			if(error == 0){
				resultadosAmbiguos.push(resultado);
			}
			else{
				if(error == 2){
					resultadosExactos.push(resultado);
				}
			}
		});

		//Dice's co-efficient:
		alg.dicesDistanceWord(query, companyList, function(error, resultado){
			if(error == 0){
				resultadosAmbiguos.push(resultado);
			}
			else{
				if(error == 2){
					resultadosExactos.push(resultado);
				}
			}
		});*/
	//}
	//else {
		//Distancia entre FRASES
		//Ej.: "Como es :company"
		//Jaro–Winkler string distance
/*		alg.jarowinklerDistanceSentence(query, frasesCompletas, function(error, resultado){
			if(error == 0){
				resultadosAmbiguos.push(resultado);
			}
			else{
				if(error == 2){
					resultadosExactos.push(resultado);
				}
			}
		});

		//Levenshtein distance
		alg.levenshteinDistanceSentence(query, frasesCompletas, function(error, resultado){
			if(error == 0){
				resultadosAmbiguos.push(resultado);
			}
			else{
				if(error == 2){
					resultadosExactos.push(resultado);
				}
			}
		});

		//Dice's co-efficient:
		alg.dicesDistanceSentence(query, frasesCompletas, function(error, resultado){
			if(error == 0){
				resultadosAmbiguos.push(resultado);
			}
			else{
				if(error == 2){
					resultadosExactos.push(resultado);
				}
			}
		});	
	//}
	console.log('\n\nresultadosExactos:');
	console.log(resultadosExactos);
	console.log('resultadosAmbiguos:');
	console.log(resultadosAmbiguos);

	if(resultadosExactos.length > 0){ // E O && A O
		callback_http(false, "'"+query +"'' está dentro del diccionario.");
	}
	else{
		if(resultadosAmbiguos.length > 0){ // E . && A O
			if(resultadosAmbiguos.length == 1) {
				var resul = resultadosAmbiguos[0];
				callback_http(false, "¿Quisiste decir '"+resul[0]+"'?");
			}
			else {
				// Eliminar repetidossss!!!

				resultadosAmbiguos

				
				var texto = "";
				// COGER EL QUE TENGA 0<p<1 (JW||D) antes que el que sea p >= 1 (L)
				for(var i = 0; i < resultadosAmbiguos.length; i++){
					var cosa = resultadosAmbiguos[i];
					texto = texto + "'"+ cosa[0] + "', ";
				}

				callback_http(false, "¿Quisiste decir "+texto+"?");
			}
		}
		else { // E . && A .
			callback_http(false, "'"+query +"'' NO está dentro del diccionario.");
		}
	}

	//APLICAR ESTOS ALGORTIMOS SOBRE las palabras clave!!! 80/20 :)
	
};*/