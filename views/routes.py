# backend/views/routes.py

from flask import Blueprint, request, jsonify
from controllers.user_controller import create_user, list_users, get_user, update_user, delete_user
from controllers.food_controller import create_food, list_foods, get_food, update_food, delete_food
from controllers.auth_controller import register_user, login_user

routes_bp = Blueprint('routes', __name__)

# ===== ROTAS DE AUTENTICAÇÃO =====
@routes_bp.route('/auth/register', methods=['POST'])
def register():
    """Registra um novo usuário"""
    return register_user(request.get_json())

@routes_bp.route('/auth/login', methods=['POST'])
def login():
    """Faz login de um usuário"""
    return login_user(request.get_json())

@routes_bp.route('/auth/me', methods=['GET'])
def get_me():
    """Retorna informações do usuário logado"""
    # Para versão sem autenticação, vamos retornar erro
    return jsonify({"error": "Funcionalidade desabilitada"}), 401

# ===== ROTAS DE USUÁRIOS =====
@routes_bp.route('/users', methods=['POST'])
def add_user():
    return create_user(request.get_json())

@routes_bp.route('/users', methods=['GET'])
def get_users():
    return list_users()

@routes_bp.route('/users/<int:user_id>', methods=['GET'])
def get_user_by_id(user_id):
    return get_user(user_id)

@routes_bp.route('/users/<int:user_id>', methods=['PUT'])
def modify_user(user_id):
    return update_user(user_id, request.get_json())

@routes_bp.route('/users/<int:user_id>', methods=['DELETE'])
def remove_user(user_id):
    return delete_user(user_id)

# ===== ROTAS DE ALIMENTOS (SEM AUTENTICAÇÃO) =====
@routes_bp.route('/alimentos', methods=['POST'])
def add_food():
    """Cria um novo alimento"""
    return create_food(request.get_json())

@routes_bp.route('/alimentos', methods=['GET'])
def get_foods():
    """Lista todos os alimentos"""
    return list_foods()

@routes_bp.route('/alimentos/<int:food_id>', methods=['GET'])
def get_food_by_id(food_id):
    """Obtém um alimento específico"""
    return get_food(food_id)

@routes_bp.route('/alimentos/<int:food_id>', methods=['PUT'])
def modify_food(food_id):
    """Atualiza um alimento"""
    return update_food(food_id, request.get_json())

@routes_bp.route('/alimentos/<int:food_id>', methods=['DELETE'])
def remove_food(food_id):
    """Remove um alimento"""
    return delete_food(food_id)

# ===== ROTA INICIAL =====
@routes_bp.route('/', methods=['GET'])
def home():
    return {
        "message": "API de Gerenciamento de Alimentos",
        "endpoints": {
            "auth": {
                "register": "POST /auth/register",
                "login": "POST /auth/login"
            },
            "alimentos": {
                "list": "GET /alimentos",
                "create": "POST /alimentos",
                "get": "GET /alimentos/<id>",
                "update": "PUT /alimentos/<id>",
                "delete": "DELETE /alimentos/<id>"
            }
        }
    }, 200