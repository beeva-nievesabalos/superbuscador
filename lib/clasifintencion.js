//Clasificador de intenciones
var natural = require('natural'),
   dictionary = require("./dictionary");  //<--- frasesBanca
   //utils = require('./lib/utils'),  <---- aqui está la funcion de omitir Acentos, ahora los quito en el excel.

// OJO! natural tiene Naive Bayes and logistic regression. 
var classifierIntencion = new natural.BayesClassifier();
var classifierFile = './data/classifier.json';



//Clasificador de intencion : producto + funcionalidad
for(var i = 0; i < frasesBanca.length; i++){

	var label = ''+frasesBanca[i][1]+' '+frasesBanca[i][2];
	console.log("label: "+ label);
	var observation = frasesBanca[i][0];
	console.log("observation: "+ observation);
	classifierIntencion.addDocument(observation, label);
}

classifierIntencion.train();
classifierIntencion.save(classifierFile, function(err, classifier) {
    // the classifier is saved to the classifier.json file!
    if(err){
    	console.log('\nError al guardar classifier.json');
    }
    else {
    	console.log('\nSaved file!'); //+ JSON.stringify(classifier)
    }
});


console.log('\n¿ver las transferencias?');
console.log(classifierIntencion.classify('ver las transferencias'));
console.log(classifierIntencion.getClassifications('ver las transferencias'));

console.log('\n¿quiero ayuda para transferencias?');
console.log(classifierIntencion.classify('quiero ayuda para transferencias'));
console.log(classifierIntencion.getClassifications('quiero ayuda para transferencias'));

console.log('\n¿necesito mirar mis transferencias de ayer por la noche?');
console.log(classifierIntencion.classify('necesito mirar mis transferencias de ayer por la noche'));
console.log(classifierIntencion.getClassifications("necesito mirar mis transferencias de ayer por la noche"));

console.log('\n¿observar mis transferencias?');
console.log(classifierIntencion.classify('observar mis transferencias'));
console.log(classifierIntencion.getClassifications("observar mis transferencias"));

console.log('\n¿necesito mis transferencias?');
console.log(classifierIntencion.classify('necesito mis transferencias'));
console.log(classifierIntencion.getClassifications("necesito mis transferencias"));

console.log('\n¿necesito mirar mis traspasos de ayer por la noche?');
console.log(classifierIntencion.classify('necesito mirar mis traspasos de ayer por la noche'));
console.log(classifierIntencion.getClassifications('necesito mirar mis traspasos de ayer por la noche'));


classifierIntencion.events.on('trainedWithDocument', function (obj) {
	console.log("EVENTO trainedWithDocument:");
    console.log(obj);
   /* {
   *   total: 23 // There are 23 total documents being trained against
   *   index: 12 // The index/number of the document that's just been trained against
   *   doc: {...} // The document that has just been indexed
   * }
   */
});



/* paracuando las frasesBanca estén en un CSV separadas, utilizar esto:
var fs = require("fs");
var training_file = "./data/train.txt";
fs.readFile(training_file, {"encoding":"ascii"}, function (err, data) {
	if (err) throw err;
 
  var sentences = data.split("\n");
  var chunks = data.split("\t");
  var size = data.replace("\n", "").trim().length;

});
*/




/*
//Carga el casificador entrenado: 

natural.BayesClassifier.load('classifier.json', null, function(err, classifier) {
    console.log(classifier.classify('long SUNW'));
    console.log(classifier.classify('short SUNW'));
});
*/