from flask import Flask
from flask_cors import CORS
from .models import db
import os

def create_app():
    app = Flask(__name__)
    CORS(app) # Enable CORS for all routes
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///goaltrack.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    db.init_app(app)
    
    with app.app_context():
        db.create_all()
    
    from .routes import tasks_bp
    app.register_blueprint(tasks_bp)
    
    return app
