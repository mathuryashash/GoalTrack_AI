from flask import Flask
from .models import db
import os

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///goaltrack.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    db.init_app(app)
    
    from .routes import tasks_bp
    app.register_blueprint(tasks_bp)
    
    return app
