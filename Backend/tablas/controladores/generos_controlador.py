from app import *
from flask import jsonify ,request
from tablas.modelos.generos_modelo import *

@app.route('/generos',methods=['GET'])
def get_Generos():
    all_generos=Generos.query.all()      
    result=generos_schema.dump(all_generos)  
    return jsonify(result)  


@app.route('/generos/<id>',methods=['GET'])
def get_genero(id):
    genero=Generos.query.get(id)
    return genero_schema.jsonify(genero)  


@app.route('/generos/<id>',methods=['DELETE'])
def delete_genero(id):
    genero=Generos.query.get(id)
    db.session.delete(genero)
    db.session.commit()               
    return genero_schema.jsonify(genero) 

@app.route('/generos', methods=['POST'])
def create_genero():
    id=request.json['id']
    nombreg=request.json['nombreg']
    new_genero=Generos(id,nombreg)
    db.session.add(new_genero)
    db.session.commit()
    return genero_schema.jsonify(new_genero)

@app.route('/generos/<id>' ,methods=['PUT'])
def update_genero(id):
    genero=Generos.query.get(id)
    genero.nombreg=request.json['nombreg']
    db.session.commit()   
    return genero_schema.jsonify(genero)  
