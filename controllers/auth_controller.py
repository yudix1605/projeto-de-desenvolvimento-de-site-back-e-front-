from extensions import db
from models.user import User
from flask import jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash

def register_user(data):
    """Registra um novo usuário"""
    if not data or not all(key in data for key in ["nome", "email", "senha"]):
        return jsonify({"error": "Campos 'nome', 'email' e 'senha' são obrigatórios."}), 400
    
    # Verifica se o email já existe
    existing_user = User.query.filter_by(email=data["email"].strip()).first()
    if existing_user:
        return jsonify({"error": "Email já cadastrado."}), 400
    
    # Cria o hash da senha
    hashed_password = generate_password_hash(data["senha"])
    
    user = User(
        nome=data["nome"].strip(),
        email=data["email"].strip(),
        senha=hashed_password,
        altura=data.get("altura"),  # Novo campo opcional
        peso=data.get("peso")       # Novo campo opcional
    )
    
    db.session.add(user)
    db.session.commit()
    
    return jsonify({
        "message": "Usuário cadastrado com sucesso!",
        "user": {
            "id": user.id, 
            "nome": user.nome, 
            "email": user.email,
            "altura": user.altura,
            "peso": user.peso
        }
    }), 201

def login_user(data):
    """Faz login de um usuário"""
    if not data or not all(key in data for key in ["email", "senha"]):
        return jsonify({"error": "Campos 'email' e 'senha' são obrigatórios."}), 400
    
    user = User.query.filter_by(email=data["email"].strip()).first()
    
    if not user or not check_password_hash(user.senha, data["senha"]):
        return jsonify({"error": "Email ou senha incorretos."}), 401
    
    return jsonify({
        "message": "Login realizado com sucesso!",
        "user": {
            "id": user.id, 
            "nome": user.nome, 
            "email": user.email,
            "altura": user.altura,
            "peso": user.peso
        }
    }), 200