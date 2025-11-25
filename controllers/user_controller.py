from extensions import db
from models.user import User
from flask import jsonify, request

def create_user(data):
    if not data or not all(key in data for key in ["nome", "email"]):
        return jsonify({"error": "Campos 'nome' e 'email' são obrigatórios."}), 400
    
    # Verifica se o email já existe
    existing_user = User.query.filter_by(email=data["email"].strip()).first()
    if existing_user:
        return jsonify({"error": "Email já cadastrado."}), 400
    
    user = User(
        nome=data["nome"].strip(), 
        email=data["email"].strip(),
        altura=data.get("altura"),
        peso=data.get("peso")
    )
    db.session.add(user)
    db.session.commit()
    return jsonify(user.to_dict()), 201

def list_users():
    users = User.query.all()
    return jsonify([u.to_dict() for u in users]), 200

def get_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "Usuário não encontrado."}), 404
    return jsonify(user.to_dict()), 200

def update_user(user_id, data):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "Usuário não encontrado."}), 404
    
    if "nome" in data:
        user.nome = data["nome"].strip()
    if "email" in data:
        # Verifica se o email já existe em outro usuário
        if data["email"] != user.email:
            existing_user = User.query.filter_by(email=data["email"].strip()).first()
            if existing_user:
                return jsonify({"error": "Email já está em uso."}), 400
        user.email = data["email"].strip()
    if "altura" in data:
        user.altura = data["altura"]
    if "peso" in data:
        user.peso = data["peso"]
    
    db.session.commit()
    return jsonify(user.to_dict()), 200

def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "Usuário não encontrado."}), 404
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "Usuário excluído com sucesso"}), 200