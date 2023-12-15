from app import *
from flask import jsonify ,request
from tablas.modelos.juegos_modelo import *
from tablas.modelos.consolas_modelo import *
from tablas.modelos.generos_modelo import *

@app.route('/juegos',methods=['GET'])
def get_Juegos():
    all_juegos=Juegos.query\
        .join(Consolas, Juegos.consola == Consolas.id, isouter=True).join(Generos, Juegos.genero== Generos.id)\
            .add_columns(Juegos.id, Juegos.nombre, Juegos.anio, Consolas.nombrec, Generos.nombreg, Juegos.imagen)\
            .filter(Juegos.consola == Consolas.id)\
            .filter(Juegos.genero == Generos.id)   
    result=juegos_schema.dump(all_juegos)
    return jsonify(result)        

@app.route('/juegos/<id>',methods=['GET'])
def get_juego(id):
    juego=Juegos.query.get(id)
    return juego_schema.jsonify(juego)  


@app.route('/juegos/<id>',methods=['DELETE'])
def delete_juego(id):
    juego=Juegos.query.get(id)
    db.session.delete(juego)
    db.session.commit()               
    return juego_schema.jsonify(juego) 

@app.route('/juegos', methods=['POST'])
def create_juego():
    nombre=request.json['nombre']
    anio=request.json['anio']
    genero=request.json['genero']
    consola=request.json['consola']
    imagen=request.json['imagen']
    new_juego=Juegos(nombre,anio,genero,consola,imagen)
    db.session.add(new_juego)
    db.session.commit()
    return juego_schema.jsonify(new_juego)

@app.route('/juegos/<id>' ,methods=['PUT'])
def update_juego(id):
    juego=Juegos.query.get(id)
    juego.nombre=request.json['nombre']
    juego.anio=request.json['anio']
    juego.genero=request.json['genero']
    juego.consola=request.json['consola']
    juego.imagen=request.json['imagen']
    db.session.commit()   
    return juego_schema.jsonify(juego)  