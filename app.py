# backend/app.py

from flask import Flask
from flask_cors import CORS
from extensions import db
from views.routes import routes_bp


app = Flask(__name__)

# Configuração do banco de dados
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///dieta.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inicializa o banco de dados
db.init_app(app)

# Configura CORS para permitir requisições do frontend
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:3000"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Registra as rotas
app.register_blueprint(routes_bp)

# Cria as tabelas do banco de dados
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True, port=5000)