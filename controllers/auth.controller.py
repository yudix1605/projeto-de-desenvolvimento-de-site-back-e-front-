# backend/controllers/auth_controller.py

from extensions import db
from models.user import User
from flask import jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
from functools import wraps

SECRET_KEY = "sua_chave_secreta_aqui_mude_em_producao"

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        
        if not token:
            return jsonify({"error": "Token não fornecido"}), 401
        
        try:
            if token.startswith('Bearer '):
                token = token.split(' ')[1]
            data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            current_user = User.query.get(data['user_id'])
            if not current_user:
                return jsonify({"error": "Usuário não encontrado"}), 401
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token expirado"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Token inválido"}), 401
        
        return f(current_user, *args, **kwargs)
    
    return decorated

def register_user(data):
    """Registra um novo usuário"""
    if not data or not all(key in data for key in ["nome", "email", "senha"]):
        return jsonify({"error": "Campos 'nome', 'email' e 'senha' são obrigatórios."}), 400
    
    # Verifica se o email já existe
    if User.query.filter_by(email=data["email"].strip()).first():
        return jsonify({"error": "Email já cadastrado."}), 400
    
    # Cria o hash da senha
    hashed_password = generate_password_hash(data["senha"])
    
    user = User(
        nome=data["nome"].strip(),
        email=data["email"].strip(),
        senha=hashed_password
    )
    
    db.session.add(user)
    db.session.commit()
    
    return jsonify({
        "message": "Usuário cadastrado com sucesso!",
        "user": {"id": user.id, "nome": user.nome, "email": user.email}
    }), 201

def login_user(data):
    """Faz login e retorna um token JWT"""
    if not data or not all(key in data for key in ["email", "senha"]):
        return jsonify({"error": "Campos 'email' e 'senha' são obrigatórios."}), 400
    
    user = User.query.filter_by(email=data["email"].strip()).first()
    
    if not user or not check_password_hash(user.senha, data["senha"]):
        return jsonify({"error": "Email ou senha incorretos."}), 401
    
    # Gera o token JWT
    token = jwt.encode(
        {"user_id": user.id, "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)},
        SECRET_KEY,
        algorithm="HS256"
    )
    
    return jsonify({
        "message": "Login realizado com sucesso!",
        "token": token,
        "user": {"id": user.id, "nome": user.nome, "email": user.email}
    }), 200

def get_current_user_info(current_user):
    """Retorna informações do usuário autenticado"""
    return jsonify(current_user.to_dict()), 200