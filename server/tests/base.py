from flask_testing import TestCase
from server import create_app, db

app = create_app()

class BaseTestCase(TestCase):
  ''' Base Tests '''
  def create_app(self):
    app.config.from_object('server.config.TestingConfig')

  def setUp(self) -> None:
    db.create_all()
    db.session.commit()

  def tearDown(self) -> None:
    db.session.remove()
    db.drop_all()
