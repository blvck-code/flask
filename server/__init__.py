import pyrebase
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_marshmallow import Marshmallow
from server.config import DevelopmentConfig
from flask_rest_paginate import Pagination
from flask_restful import Api


app = Flask(__name__)
UPLOAD_FOLDER = './uploads'

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SECRET_KEY'] = 'bf13b0dbb018ff4c5f905d3329996c3e'
app.config['JWT_SECRET_KEY'] = 'bf13b0dbb018ff4c5f905d3329996c3e'
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['PAGINATE_PAGINATION_OBJECT_KEY'] = None
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

config = {
  "apiKey": "AIzaSyACQIVjk7HzgsBmVsHrJvXPpVQrnf9cRJw",
  "authDomain": "portfolio-bd187.firebaseapp.com",
  "databaseURL": "https://portfolio-bd187.firebaseio.com",
  "projectId": "portfolio-bd187",
  "storageBucket": "portfolio-bd187.appspot.com",
  "messagingSenderId": "234999340512",
  "appId": "1:234999340512:web:98d494e6cd624744c95f85",
  "measurementId": "G-ZCJFNMGLE0",
  "serviceAccount": "./keyfile.json"
}

#init firebase app

# @todo ====> update firebase
# firebase = pyrebase.initialize_app(config)
#firebase storage
# storage = firebase.storage()


login_manager = LoginManager()
db = SQLAlchemy()
bcrypt = Bcrypt()
jwt = JWTManager()
ma = Marshmallow()
pagination = Pagination()
api = Api()

# from server.auth.routes import auth_blueprint
# from server.dashboard.routes import dashboard_blueprint
# from server.experience.routes import experience_blueprint
# from server.messages.routes import messages_blueprint
# from server.articles.routes import articles_blueprint
#
# app.register_blueprint(auth_blueprint)
# app.register_blueprint(dashboard_blueprint)
# app.register_blueprint(experience_blueprint)
# app.register_blueprint(messages_blueprint)
# app.register_blueprint(articles_blueprint)


def create_app(config_class=DevelopmentConfig):
  app = Flask(__name__)
  app.config.from_object(DevelopmentConfig)
  CORS(app, origins="*", headers=['Content-Type', 'Authorization'], expose_headers='Authorization')

  db.init_app(app)
  login_manager.init_app(app)
  bcrypt.init_app(app)
  jwt.init_app(app)
  ma.init_app(app)
  api.init_app(app)
  pagination.init_app(app, db)

  from server.auth.routes import auth_blueprint
  from server.dashboard.routes import dashboard_blueprint
  from server.experience.routes import experience_blueprint
  from server.messages.routes import messages_blueprint
  from server.articles.routes import articles_blueprint

  app.register_blueprint(auth_blueprint)
  app.register_blueprint(dashboard_blueprint)
  app.register_blueprint(experience_blueprint)
  app.register_blueprint(messages_blueprint)
  app.register_blueprint(articles_blueprint)

  return app


