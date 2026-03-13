from src.Domain.seller import SellerDomain
from src.Infrastructure.Model.seller import Seller
from src.config.data_base import db
import bcrypt

class SellerService:

    @staticmethod
    def create_seller(name, cnpj, email, password, cell):
        seller = Seller(name=name, cnpj=cnpj, email=email, password=password, cell=cell)

        db.session.add(seller)
        db.session.commit()

        return SellerDomain(seller.id, seller.name, seller.cnpj, seller.email, seller.password, seller.cell)


    @staticmethod
    def authenticate_seller(email, password):

        seller = Seller.query.filter_by(email=email).first()

        if not seller:
            return None

        if not bcrypt.checkpw(password.encode('utf-8'), seller.password.encode('utf-8')):
            return None

        return seller


    @staticmethod
    def active_seller():
        pass