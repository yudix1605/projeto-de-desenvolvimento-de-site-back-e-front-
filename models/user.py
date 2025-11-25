from extensions import db
from datetime import datetime

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    senha = db.Column(db.String(255), nullable=False)
    altura = db.Column(db.Float)  # Altura em metros
    peso = db.Column(db.Float)    # Peso em kg
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'nome': self.nome,
            'email': self.email,
            'altura': self.altura,
            'peso': self.peso,
        }
    
    def calcular_imc(self):
        """Calcula o IMC do usuário"""
        if self.altura and self.peso and self.altura > 0:
            return round(self.peso / (self.altura ** 2), 2)
        return None
    
    def classificar_imc(self):
        """Classifica o IMC do usuário"""
        imc = self.calcular_imc()
        if not imc:
            return None
            
        if imc < 18.5:
            return "Abaixo do peso"
        elif imc < 25:
            return "Peso normal"
        elif imc < 30:
            return "Sobrepeso"
        elif imc < 35:
            return "Obesidade Grau I"
        elif imc < 40:
            return "Obesidade Grau II"
        else:
            return "Obesidade Grau III"
    
    def __repr__(self):
        return f'<User {self.nome}>'