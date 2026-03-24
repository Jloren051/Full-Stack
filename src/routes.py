# src/routes.py
from flask import jsonify, make_response
from src.Application.Controllers.user_controller import UserController
from src.Application.Controllers.seller_controller import SellerController
from src.Application.Controllers.product_controller import ProductController
from src.Application.Controllers.sale_controller import SaleController

def init_routes(app):
    # ===================== Health Check =====================
    @app.route('/api', methods=['GET'])
    def health():
        return make_response(jsonify({"mensagem": "API - OK; Docker - Up"}), 200)

    # ===================== Usuário =====================
    @app.route('/user', methods=['POST'])
    def register_user():
        controller = UserController()
        return controller.register_user()

    # ===================== Seller =====================
    @app.route('/api/sellers', methods=['POST'])
    def register_seller():
        controller = SellerController()
        return controller.register_seller()

    @app.route('/api/sellers/activate', methods=['POST'])
    def activate_seller():
        controller = SellerController()
        return controller.activate_seller()

    @app.route('/api/sellers/login', methods=['POST'])
    def login_seller():
        controller = SellerController()
        return controller.login_seller()

    # ===================== Produtos =====================
    @app.route('/api/products', methods=['POST'])
    def create_product():
        controller = ProductController()
        return controller.create_product()

    @app.route('/api/products', methods=['GET'])
    def list_products():
        controller = ProductController()
        return controller.list_products()

    @app.route('/api/products/<int:product_id>', methods=['GET'])
    def get_product(product_id):
        controller = ProductController()
        return controller.get_product(product_id)

    @app.route('/api/products/<int:product_id>', methods=['PUT'])
    def update_product(product_id):
        controller = ProductController()
        return controller.update_product(product_id)

    @app.route('/api/products/<int:product_id>/inactivate', methods=['PATCH'])
    def inactivate_product(product_id):
        controller = ProductController()
        return controller.inactivate_product(product_id)

    # ===================== Vendas =====================
    @app.route("/api/sales", methods=["POST"])
    def create_sale():
        controller = SaleController()
        return controller.create()