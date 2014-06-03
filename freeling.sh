export FREELING_PYTHON=/home/ira/Desktop/myfreeling
echo $* |analyzer_client localhost:50005 > ../extractorIntencionSuperbuscador/analisis_freeling.txt 
python3 ../extractorIntencionSuperbuscador/intencion.py