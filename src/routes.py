from src.Application.Controllers.user_controller import UserController
from src.Application.Controllers.seller_controller import SellerController
from flask import jsonify, make_response

def init_routes(app):    
    @app.route('/api', methods=['GET'])
    def health():
        return make_response(jsonify({
            "mensagem": "API - OK; Docker - Up",
        }), 200)
    
    @app.route('/user', methods=['POST'])
    def register_user():
        return UserController.register_user()
    
    @app.route('/api/sellers', methods=['POST'])
    def register_seller():
        return SellerController.register_seller()

    # LOGIN DO SELLER (AUTENTICAÇÃO JWT)
    @app.route('/api/sellers/login', methods=['POST'])
    def login_seller():
        return SellerController.login_seller()