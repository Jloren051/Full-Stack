from src.Infrastructure.Model.seller_model import SellerModel
from src.config.data_base import db

class SellerService:

    @staticmethod
    def create_seller(nome, cnpj, email, senha, celular):
        seller = SellerModel(
            nome=nome,
            cnpj=cnpj,
            email=email,
            senha=senha,
            celular=celular
        )
        db.session.add(seller)
        db.session.commit()
        return seller

    @staticmethod
    def authenticate_seller(email, senha):
        return SellerModel.query.filter_by(email=email, senha=senha).first()

    # 🔹 Adicione este método
    @staticmethod
    def get_by_cell(celular):
        return SellerModel.query.filter_by(celular=celular).first()