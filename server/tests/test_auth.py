import json
import unittest

from server.tests.base import BaseTestCase


def register(self, email, password):
  return self.client.post(
    '/auth/register',
    data=json.dumps(dict(
      email=email,
      password=password
    )),
    content_type='application/json',
  )

def login(self, email, password):
  return self.client.post(
    '/auth/login',
    data=json.dumps(dict(
      email=email,
      password=password
    )),
    content_type='application/json',
  )

class TestAuthBlueprint(BaseTestCase):
  def test_registration(self):
    """ Test for user registration """
    with self.client:
      response = register(self, 'joe@email.com', '123456')
      data = json.loads(response)
      self.assertTrue(data['status'] == 'success')
      self.assertTrue(data['message'] == 'Successfully registered')
      self.assertTrue(data['auth_token'])
      self.assertTrue(response.content_type == 'application/json')
      self.assertEqual(response.status_code, 201)


if __name__ == '__main__':
    unittest.main()
