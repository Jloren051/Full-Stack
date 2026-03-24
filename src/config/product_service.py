from src.Infrastructure.Model.product_model import ProductModel
from src.config.data_base import db

class ProductService:

    @staticmethod
    def create(data, seller_id):
        product = ProductModel(
            nome=data["nome"],
            preco=data["preco"],
            quantidade=data["quantidade"],
            status="ativo",
            imagem=data.get("imagem"),
            seller_id=seller_id
        )
        db.session.add(product)
        db.session.commit()
        return product

    @staticmethod
    def list(seller_id):
        return ProductModel.query.filter_by(seller_id=seller_id).all()

    @staticmethod
    def get(product_id, seller_id):
        return ProductModel.query.filter_by(id=product_id, seller_id=seller_id).first()

    @staticmethod
    def update(product, data):
        product.nome = data.get("nome", product.nome)
        product.preco = data.get("preco", product.preco)
        product.quantidade = data.get("quantidade", product.quantidade)
        product.imagem = data.get("imagem", product.imagem)
        db.session.commit()
        return product

    @staticmethod
    def inactivate(product):
        product.status = "inativo"
        db.session.commit()
        return product