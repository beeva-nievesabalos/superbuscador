SUPERBUSCADOR
=============

Para arrancar el servicio:
- ejecutar script 'server.js'
- levantar el servidor de freeling para la ejecución de análisis sintácticos: 
    análisis sintáctico: analyze -f es.cfg --outf dep --sense all --server --port 50005

Para la invocación de los servicios del superbuscador se han desarrollado dos interfaces:
- Pagina web: http://79.125.61.253:2185/
- API: http://79.125.61.253:2185/superbuscador/”frase_a_analizar”
 

CORRECTOR ORTOGRÁFICO
---------------------
Primeramente, se comprueba si la oración escrita por el usuario es correcta y en caso contrario se corrige.
Para facilitar la corrección de las frases se ha utilizado el módulo 'Teacher' como corrector ortográfico, al cúal se le pasa una palabra y en caso de que sea incorrecta devuelve un conjunto de opciones de palabras alternativas.


ANALIZADOR SINTÁCTICO Y SEMÁNTICO
---------------------------------
Se realiza un análisis sintáctico de la oración, mediante el cual se distinguen las distintas partes de la oración introducida al usuario. Para ello se usa el módulo de freeling 'Part-of-Speech Tagger Module'.
Así mismo se realiza una análisis semántico de cada una de las palabras incluidas en la oración. Como resultado de dicho análisis se le asocia una etiqueta a cada palabra. El significado de dichas etiquetas se puede consultar en: http://nlp.lsi.upc.edu/freeling/doc/tagsets/tagset-es.html

Adicionalmente, se incluyen todos los sentidos que freeling tiene asociados a la distintas palabras. Para ello se utiliza el modulo 'Sense Labelling Module'


