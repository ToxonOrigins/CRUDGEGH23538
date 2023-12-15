from app import db,ma,app


class Consolas(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    nombrec= db.Column(db.String(10))
    def __init__(self,id,nombrec): 
        self.id=id
        self.nombrec=nombrec   

with app.app_context():
    db.create_all() 
class ConsolasSchema(ma.Schema):
    class Meta:
        fields=('id','nombrec')

consola_schema=ConsolasSchema()          
consolas_schema=ConsolasSchema(many=True) 
