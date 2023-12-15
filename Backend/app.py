from flask import Flask 
from flask_cors import CORS       
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
app=Flask(__name__)  
CORS(app) 
app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://root@localhost/juegos'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False 
db= SQLAlchemy(app)  
ma=Marshmallow(app)  
from tablas.controladores.consolas_controlador import *
from tablas.controladores.generos_controlador import *
from tablas.controladores.juegos_controlador import *
from tablas.controladores.usuarios_controlador import *
if __name__=='__main__':  
    app.run(debug=True, port=5000) 
