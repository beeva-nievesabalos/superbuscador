/**
 * Dependencies.
 */
var teacher = require('teacher');

exports.corregir =function(oracion, callback){

	var teach = new teacher.Teacher('es', null);
  
	teach.check(oracion, function(err, data) {
		//console.log("ORACION:  " +oracion)
		// si he encontrado errores y la palabra no empieza por mayúsculas
    //los sustituyo en la oracion
		if(data!=null) {
			for (var i = 0; i < data.length; i++){
        //si la palabra no empieza por mayusculas
        //console.log("DATAS: " + data)
				// si hay mas de una alternativa
				origen=data[i].string;
				ini=0
				fin=0
    		if(data[i].suggestions.option[0].length>1){
					//console.log("entrada: "+ data[i].string + " , salidas: " +data[i].suggestions.option );
					pal = data[i].suggestions.option[0]
    		}
    		else{
					//console.log("entrada: "+ data[i].string + " , salida: " +data[i].suggestions.option );
					pal=data[i].suggestions.option
    		}  	
   			//console.log(origen + " sustituir por: " +pal );
   			oracion = oracion.replace(origen,pal)
			}
		}
		//else{
		  	 //console.log(" No hay errores ");
		//}
   		//Poner en mayuscula la primera letra de la oración
   		//Si la oración tiene más de una palabra
   		pos=oracion.indexOf(' ')
   		//console.log("ORA:" + oracion + ", pos: " +pos)
   		if(pos>=0){
   			primera = oracion.substring(0,1)
   			primera= primera.toUpperCase()
   			oracion= primera + oracion.substring(1,oracion.length)
   		}
   		else{
   			primera = oracion.substring(0,1)
   			primera= primera.toLowerCase()
   			oracion= primera + oracion.substring(1,oracion.length)
   		}

      //Si la oracion no acaba en punto se lo añado.
      longitud = oracion.length
      ult=oracion.substring(longitud-1,longitud)
      if(ult!="."){
        oracion= oracion + "."
        //console.log("final: " + ult)        
      }
   		//console.log("ORACION CORREGIDA:  " +oracion)
   		callback(oracion);
	});  	
};