from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_marshmallow import Marshmallow
from server.config import DevelopmentConfig

app = Flask(__name__)
app.config.from_object(DevelopmentConfig)
CORS(app, origins="*", headers=['Content-Type', 'Authorization'], expose_headers='Authorization')

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SECRET_KEY'] = 'bf13b0dbb018ff4c5f905d3329996c3e'
app.config['JWT_SECRET_KEY'] = 'bf13b0dbb018ff4c5f905d3329996c3e'
app.config['CORS_HEADERS'] = 'Content-Type'

login_manager = LoginManager(app)
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
ma = Marshmallow(app)

from server.auth.routes import auth_blueprint
from server.dashboard.routes import dashboard_blueprint
from server.experience.routes import experience_blueprint
from server.messages.routes import messages_blueprint

app.register_blueprint(auth_blueprint)
app.register_blueprint(dashboard_blueprint)
app.register_blueprint(experience_blueprint)
app.register_blueprint(messages_blueprint)


# def create_app(config_class=DevelopmentConfig):
#   app = Flask(__name__)
#   app.config.from_object(DevelopmentConfig)
#   CORS(app, origins="*", headers=['Content-Type', 'Authorization'], expose_headers='Authorization')
#
#   db.init_app(app)
#   login_manager.init_app(app)
#   bcrypt.init_app(app)
#   jwt.init_app(app)
#   ma.init_app(app)
#
#   from server.auth.routes import auth_blueprint
#   from server.dashboard.routes import dashboard_blueprint
#   from server.experience.routes import experience_blueprint
#
#   app.register_blueprint(auth_blueprint)
#   app.register_blueprint(dashboard_blueprint)
#   app.register_blueprint(experience_blueprint)
#
#   return app

