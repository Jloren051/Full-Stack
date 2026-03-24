from flask import request, jsonify, make_response
from flask_jwt_extended import create_access_token
from src.Application.Service.seller_service import SellerService
from src.Infrastructure.Model.seller_model import SellerModel
from src.Application.Controllers.twilio_utils import enviar_codigo_whatsapp
from src.config.data_base import db
import random


class SellerController:

    @staticmethod
    def register_seller():
        data = request.get_json()

        name = data.get('nome')
        cnpj = data.get('cnpj')
        email = data.get('email')
        password = data.get('senha')
        cell = data.get('celular')

        # Validação
        if not name or not cnpj or not email or not password or not cell:
            return make_response(jsonify({"erro": "Campos obrigatórios"}), 400)

        # Cria seller
        seller = SellerService.create_seller(name, cnpj, email, password, cell)

        # Gera código
        codigo = str(random.randint(1000, 9999))
        seller.codigo_ativacao = codigo

        # Salva código no banco
        db.session.commit()

        # Envia WhatsApp
        enviar_codigo_whatsapp(cell, codigo)

        return make_response(jsonify({
            "mensagem": "Seller salvo com sucesso! Código enviado via WhatsApp.",
            "seller": seller.to_dict()
        }), 200)

    # -----------------------------

    @staticmethod
    def activate_seller():
        data = request.get_json()

        celular = data.get("celular")
        codigo = data.get("codigo")

        if not celular or not codigo:
            return make_response(jsonify({"erro": "Dados obrigatórios"}), 400)

        seller = SellerService.get_by_cell(celular)

        if not seller:
            return make_response(jsonify({"erro": "Seller não encontrado"}), 404)

        if seller.codigo_ativacao != codigo:
            return make_response(jsonify({"erro": "Código inválido"}), 400)

        # Ativa seller
        seller.status = "ativo"

        db.session.commit()

        return make_response(jsonify({
            "mensagem": "Seller ativado com sucesso!"
        }), 200)

    # -----------------------------

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