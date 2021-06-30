from flask import request, make_response,jsonify
from flask_jwt_extended import get_jwt_identity, verify_jwt_in_request

from server.models import Auth


def verify_token():
  auth_headers = request.headers.get('Authorization')
  if auth_headers:
    try:
      auth_token = auth_headers.split(' ')[1]
    except IndexError:
      responseObject = {
        'status': 'fail',
        'message': 'Bearer token malformed'
      }
      return make_response(jsonify(responseObject)), 401
  else:
    auth_token = ''

  if auth_token:
    print(verify_jwt_in_request())
