# project/server/config.py

import os
basedir = os.path.abspath(os.path.dirname(__file__))


class BaseConfig:
    """ Base configuration."""
    SECRET_KEY = 'bf13b0dbb018ff4c5f905d3329996c3e'
    JWT_SECRET_KEY = 'bf13b0dbb018ff4c5f905d3329996c3e'
    CORS_HEADERS = 'Content-Type'
    DEBUG = False
    BCRYPT_LOG_ROUNDS = 13
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class DevelopmentConfig(BaseConfig):
    """ Development configuration."""
    DEBUG = True
    BCRYPT_LOG_ROUNDS = 4
    SQLALCHEMY_DATABASE_URI = 'sqlite:///site.db'


class TestingConfig(BaseConfig):
    """ Testing configuration."""
    DEBUG = True
    TESTING = True
    BCRYPT_LOG_ROUNDS = 4
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    PRESERVE_CONTEXT_ON_EXCEPTION = False


class ProductionConfig(BaseConfig):
    """ Production configuration."""
    SECRET_KEY = 'bf13b0dbb018ff4c5f905d3329996c3e'
    DEBUG = False
