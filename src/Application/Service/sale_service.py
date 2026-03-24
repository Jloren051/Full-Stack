from src.Infrastructure.Model.sale_model import SaleModel
from src.Infrastructure.Model.product_model import ProductModel

from src.Infrastructure.Model.seller_model import SellerModel
from src.config.data_base import db

class SaleService:

    @staticmethod
    def create(data, seller_id):
        """
        Cria uma nova venda para o seller autenticado.
        Valida seller ativo, produto ativo e estoque suficiente.
        """
        # --- Validação do seller ---
        seller = SellerModel.query.get(seller_id)
        if not seller or seller.status != "ativo":
            raise Exception("Seller inativo ou não encontrado")

        # --- Validação do produto ---
        product = ProductModel.query.get(data["produtoId"])
        if not product:
            raise Exception("Produto não encontrado")
        if product.seller_id != seller_id:
            raise Exception("Produto não pertence ao seller")
        if product.status != "ativo":
            raise Exception("Produto inativo")
        if data["quantidade"] > product.quantidade:
            raise Exception("Quantidade maior que o estoque disponível")

        # --- Criação da venda ---
        sale = SaleModel(
            product_id=product.id,
            seller_id=seller_id,
            quantidade=data["quantidade"],
            preco_venda=product.preco
        )

        # --- Atualiza estoque ---
        product.quantidade -= data["quantidade"]

        # --- Salva no banco ---
        db.session.add(sale)
        db.session.commit()

        return sale