from src.config.data_base import db

class SellerModel(db.Model):
    __tablename__ = "sellers"

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(120), nullable=False)
    cnpj = db.Column(db.String(20), nullable=False, unique=True)
    email = db.Column(db.String(120), nullable=False, unique=True)
    senha = db.Column(db.String(120), nullable=False)
    celular = db.Column(db.String(20), nullable=False, unique=True)
    status = db.Column(db.String(20), default="pendente")
    codigo_ativacao = db.Column(db.String(10), nullable=True)

    # Removido relationship temporariamente para evitar erro de import
    # products = db.relationship("ProductModel", backref="seller", lazy=True)
    # sales = db.relationship("SaleModel", backref="seller", lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "cnpj": self.cnpj,
            "email": self.email,
            "celular": self.celular,
            "status": self.status
        }