from flask import request, jsonify, make_response
from flask_jwt_extended import create_access_token
from src.Application.Service.seller_service import SellerService

class SellerController:
    @staticmethod
    def register_seller():
        data = request.get_json()
        name = data.get('nome')
        cnpj = data.get('cnpj')
        email = data.get('email')
        password = data.get('senha')
        cell = data.get('celular')

        if not name or not cnpj or not email or not password or not cell:
            return make_response(jsonify({"erro": "Missing required fields"}), 400)

        seller = SellerService.create_seller(name, cnpj, email, password, cell)
        return make_response(jsonify({
            "mensagem": "Seller salvo com sucesso",
            "Seller": seller.to_dict()
        }), 200)


    @staticmethod
    def login_seller():
        data = request.get_json()

        email = data.get("email")
        password = data.get("senha")

        if not email or not password:
            return make_response(jsonify({"erro": "Email e senha são obrigatórios"}), 400)

        seller = SellerService.authenticate_seller(email, password)

        if not seller:
            return make_response(jsonify({"erro": "Email ou senha inválidos"}), 401)

        if seller.status != "ativo":
            return make_response(jsonify({"erro": "Seller ainda não ativado"}), 403)

        token = create_access_token(identity=seller.id)

        return make_response(jsonify({
            "mensagem": "Login realizado com sucesso",
            "token": token,
            "seller": seller.to_dict()
        }), 200)