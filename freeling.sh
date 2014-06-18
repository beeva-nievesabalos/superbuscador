echo $* |analyzer_client localhost:50005 > ../extractorIntencionSuperbuscador/analisis_freeling.txt 
var=$(python3 ../extractorIntencionSuperbuscador/intencion.py)
python3 ../extractorIntencionSuperbuscador/proyector.py $var
