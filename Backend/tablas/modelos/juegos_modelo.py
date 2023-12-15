from app import db,ma,app

class Juegos(db.Model):   
    id=db.Column(db.Integer, primary_key=True)  
    nombre=db.Column(db.String(100))
    anio=db.Column(db.Date)
    genero=db.Column(db.Integer, db.ForeignKey('generos.id'))
    consola=db.Column(db.Integer, db.ForeignKey('consolas.id'))
    imagen=db.Column(db.String(400))
    def __init__(self,nombre,anio,genero,consola,imagen):   
        self.nombre=nombre 
        self.anio=anio
        self.genero=genero
        self.consola=consola
        self.imagen=imagen

with app.app_context():
    db.create_all() 
class JuegosSchema(ma.Schema):
    class Meta:
        fields=('id','nombre','anio','nombreg','nombrec','imagen','consola','genero')

juego_schema=JuegosSchema()         
juegos_schema=JuegosSchema(many=True)  
