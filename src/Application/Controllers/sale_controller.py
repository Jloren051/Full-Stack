from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from src.Application.Service.sale_service import SaleService
from src.Infrastructure.Model.seller_model import SellerModel

class SaleController:

    @staticmethod
    @jwt_required()
    def create():
        seller_id = get_jwt_identity()
        data = request.get_json()

        if not data.get("produtoId") or not data.get("quantidade"):
            return jsonify({"erro": "Campos obrigatórios: produtoId, quantidade"}), 400

        try:
            sale = SaleService.create(data, seller_id)
            return jsonify({
                "mensagem": "Venda realizada com sucesso",
                "id": sale.id,
                "produtoId": sale.product_id,
                "quantidade": sale.quantidade,
                "preco_venda": sale.preco_venda
            }), 201
        except Exception as e:
            return jsonify({"erro": str(e)}), 400