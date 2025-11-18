from flask import Blueprint, request
from controllers.user_controller import create_user, list_users, get_user, update_user, delete_user
from controllers.food_controller import create_food, list_foods, get_food, update_food, delete_food

main_bp = Blueprint("main", __name__)

# ---------------------------
# Usuários
# ---------------------------

@main_bp.route("/users", methods=["POST"])
def route_create_user():
    return create_user(request.get_json())


@main_bp.route("/users", methods=["GET"])
def route_list_users():
    return list_users()


@main_bp.route("/users/<int:user_id>", methods=["GET"])
def route_get_user(user_id):
    return get_user(user_id)


@main_bp.route("/users/<int:user_id>", methods=["PUT"])
def route_update_user(user_id):
    return update_user(user_id, request.get_json())


@main_bp.route("/users/<int:user_id>", methods=["DELETE"])
def route_delete_user(user_id):
    return delete_user(user_id)


# ---------------------------
# Alimentos
# ---------------------------

@main_bp.route("/alimentos", methods=["POST"])
def route_create_food():
    return create_food(request.get_json())


@main_bp.route("/alimentos", methods=["GET"])
def route_list_foods():
    return list_foods()


@main_bp.route("/alimentos/<int:food_id>", methods=["GET"])
def route_get_food(food_id):
    return get_food(food_id)


@main_bp.route("/alimentos/<int:food_id>", methods=["PUT"])
def route_update_food(food_id):
    return update_food(food_id, request.get_json())


@main_bp.route("/alimentos/<int:food_id>", methods=["DELETE"])
def route_delete_food(food_id):
    return delete_food(food_id)
