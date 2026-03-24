from src.Infrastructure.Model.seller_model import SellerModel
from src.config.data_base import db
from src.Domain.seller import SellerDomain

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

   
    @staticmethod
    def get_by_cell(celular):
        return SellerModel.query.filter_by(celular=celular).first()
    @staticmethod
    def update_seller(seller_id, data):
        seller = SellerModel.query.get(seller_id)

        if not seller:
            return None

        seller.nome = data.get('nome', seller.nome)
        seller.email = data.get('email', seller.email)
        seller.telefone = data.get('celular', seller.telefone)
        db.session.commit()

        return SellerDomain(
            seller.id, 
            seller.nome, 
            seller.cnpj, 
            seller.email, 
            seller.password, 
            seller.cell, 
            seller.status
        )