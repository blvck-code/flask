import unittest

from flask import current_app
from flask_testing import TestCase
from server import create_app

app = create_app()

class TestDevelopmentConfig(TestCase):
  def create_app(self):
    app.config.from_object('server.config.DevelopmentConfig')
    return app

  def test_app_is_development(self):
    self.assertFalse(app.config.get('SECRET_KEY') == 'secret key')
    self.assertTrue(app.config['DEBUG'] is True)
    self.assertFalse(current_app is None)


class TestProductionConfig(TestCase):
  def create_app(self):
    app.config.from_object('server.config.ProductionConfig')
    return app

  def test_app_is_production(self):
    self.assertTrue(app.config['DEBUG'] is False)

class TestTestingConfig(TestCase):
  def create_app(self):
    app.config.from_object('server.config.TestingConfig')
    return app

  def test_app_is_testing(self):
    self.assertFalse(app.config['SECRET_KEY'] == 'secret key')
    self.assertTrue(app.config['DEBUG'])
    self.assertTrue(
      app.config['SQLALCHEMY_DATABASE_URI'] == 'sqlite:///:memory:'
    )

if __name__ == '__main__':
    unittest.main()
