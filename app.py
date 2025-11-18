from flask import Flask, jsonify
from flasgger import Swagger
from extensions import db 
from config import Config
import os

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)

    swagger_config = {
        "headers": [],
        "specs": [
            {
                "endpoint": 'apispec',
                "route": '/apispec.json',
                "rule_filter": lambda rule: True,
                "model_filter": lambda tag: True,
            }
        ],
        "static_url_path": "/flasgger_static",
        "swagger_ui": True,
        "specs_route": "/apidocs/"
    }
    Swagger(app, config=swagger_config)

    with app.app_context():
        # import models to register with SQLAlchemy
        from models import user, food    # <-- CORRIGIDO!!
        db.create_all()

    # Register routes
    from views.routes import main_bp
    app.register_blueprint(main_bp)

    @app.route("/", methods=["GET"])
    def home():
        return jsonify({"message": "Bem-vindo à API! Acesse /apidocs para a documentação."})

    @app.errorhandler(404)
    def handle_404(e):
        return jsonify({"error": "Rota não encontrada"}), 404

    return app

if __name__ == "__main__":
    app = create_app()
    port = int(os.getenv("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
