from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from src.config.data_base import init_db
from src.routes import init_routes
import os
from dotenv import load_dotenv

load_dotenv()

def create_app():

    app = Flask(__name__)

    # Chave JWT com 64+ caracteres (segura conforme RFC 7518)
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "sua-chave-secreta-muito-segura-com-mais-de-32-caracteres-aleatorios")

    CORS(app)

    jwt = JWTManager(app)

    init_db(app)

    init_routes(app)

    return app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)
