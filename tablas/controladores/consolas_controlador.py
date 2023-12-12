from app import *
from flask import jsonify ,request
from tablas.modelos.consolas_modelo import *

@app.route('/consolas',methods=['GET'])
def get_Consolas():
    all_consolas=Consolas.query.all()      
    result=consolas_schema.dump(all_consolas)  
    return jsonify(result)     


@app.route('/consolas/<id>',methods=['GET'])
def get_consola(id):
    consola=Consolas.query.get(id)
    return consola_schema.jsonify(consola)  


@app.route('/consolas/<id>',methods=['DELETE'])
def delete_consola(id):
    consola=Consolas.query.get(id)
    db.session.delete(consola)
    db.session.commit()               
    return consola_schema.jsonify(consola) 

@app.route('/consolas', methods=['POST'])
def create_consola():
    nombrec=request.json['nombrec']
    new_consola=Consolas(nombrec)
    db.session.add(new_consola)
    db.session.commit()
    return consola_schema.jsonify(new_consola)

@app.route('/consolas/<id>' ,methods=['PUT'])
def update_consola(id):
    consola=Consolas.query.get(id)
    consola.nombre=request.json['nombrec']
    db.session.commit()   
    return consola_schema.jsonify(consola)  
