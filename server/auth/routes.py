import jwt
import datetime
from flask import request, make_response, jsonify, Blueprint
from flask.views import MethodView
from flask_jwt_extended import (
create_access_token,
decode_token,
jwt_required,
get_jwt_identity
)
from flask_cors import cross_origin
from server import bcrypt, db, app
from server.models import Auth

auth_blueprint = Blueprint('auth', __name__)

class RegisterAPI(MethodView):
  def post(self):
    post_data = request.get_json()
    email = post_data.get('email')
    password = post_data.get('password')

    user = Auth.query.filter_by(email=email).first()

    if not user:
      try:
        user = Auth(
          email=email,
          password=password,
          image_file='default.jpg'
        )
        db.session.add(user)
        db.session.commit()

        # generate auth token
        auth_token = create_access_token(user.id)
        responseObject = {
          'status': 'success',
          'message': 'Successfully registered',
          'auth_token': auth_token
        }
        return make_response(jsonify(responseObject)), 201
      except Exception as e:
        responseObject = {
          'status': 'fail',
          'message': 'Some error occurred. Please try again.'
        }
        return make_response(jsonify(responseObject)), 401
    else:
      responseObject = {
        'status': 'fail',
        'message': 'User already exist. Please try again'
      }
      return make_response(jsonify(responseObject)), 202

class LoginAPI(MethodView):
  @cross_origin()
  def post(self):
    post_data = request.get_json()
    email = post_data.get('email', None)
    password = post_data.get('password', None)

    try:
      user = Auth.query.filter_by(email=email).first()
      if user and bcrypt.check_password_hash(user.password, password):
        auth_token = create_access_token(user.id)
        responseObject = {
          'status': 'success',
          'message': 'Successfully logged in',
          'auth_token': auth_token
        }
        return make_response(jsonify(responseObject))
      else:
        responseObject = {
          'status': 'fail',
          'message': 'Invalid credentials'
        }
        return make_response(jsonify(responseObject)), 401
    except Exception as e:
      responseObject = {
        'status': 'fail',
        'message': 'Invalid credentials'
      }
      return make_response(jsonify(responseObject)), 401

class UserAPI(MethodView): 
  def get(self):
    return make_response(jsonify({'msg': 123}))
    # auth_header = request.headers.get('Authorization')
    # if auth_header:
    #   try:
    #     auth_token = auth_header.split(" ")[1]
    #   except IndexError:
    #     responseObject = {
    #       'status': 'fail',
    #       'message': 'Bearer token malformed'
    #     }
    #     return make_response(jsonify(responseObject)), 401
    # else:
    #   auth_token = ''
    # if auth_token:
    #   resp = decode_token(auth_token)
    #   print(resp)
    #   if not isinstance(resp, str):
    #     user = Auth.query.filter_by(id=resp['sub']).first()
    #     responseObject= {
    #       'status': 'success',
    #       'data': {
    #         'user_id': user.id,
    #         'email': user.email,
    #         'first_name': user.first_name,
    #         'last_name': user.last_name,
    #         'phone': user.phone,
    #         'country': user.country,
    #         'date_of_birth': user.date_of_birth,
    #         'website_url': user.website_url,
    #         'bio': user.bio,
    #         'image_file': user.image_file,
    #         'facebook': user.facebook,
    #         'twitter': user.twitter,
    #         'linkedin': user.linkedin,
    #         'instagram': user.instagram,
    #       }
    #     }
    #     return make_response(jsonify(responseObject)), 200
    #   else:
    #     responseObject= {
    #       'status': 'fail',
    #       'message': resp
    #     }
    #     return make_response(jsonify(responseObject)), 401
    # else:
    #   responseObject= {
    #     'status': 'fail',
    #     'message': 'Provide a valid auth token'
    #   }
    #   return make_response(jsonify(responseObject)), 401

class UpdateProfile(MethodView):
  @cross_origin()
  @jwt_required()
  def put(self, *args, **kwargs):
    user_id = get_jwt_identity()
    if user_id:
      user = Auth.query.filter_by(id=user_id).first()

      if user:
        update_data = request.get_json()
        print(update_data)

        first_name = update_data.get('firstName', None)
        last_name = update_data.get('lastName', None)
        email = update_data.get('email', None)
        phone = update_data.get('phone', None)
        country = update_data.get('country', None)
        date_of_birth = update_data.get('dateOfBirth', None)
        website_url = update_data.get('websiteURL', None)
        bio = update_data.get('bio', None)
        facebook = update_data.get('facebook', None)
        linkedin = update_data.get('linkedIn', None)
        instagram = update_data.get('instagram', None)
        twitter = update_data.get('twitter', None)

        # Update fields
        if first_name:
          user.first_name = first_name
        if last_name:
          user.last_name = last_name
        if email:
          user.email = email
        if phone:
          user.phone = phone
        if country:
          user.country = country
        if date_of_birth:
          user.date_of_birth = date_of_birth
        if website_url:
          user.website_url = website_url
        if bio:
          user.bio = bio
        if facebook:
          user.facebook = facebook
        if linkedin:
          user.linkedin = linkedin
        if instagram:
          user.instagram = instagram
        if twitter:
          user.twitter = twitter

        # Save data to database
        db.session.commit()

        responseObject = {
          'status': 'success',
          'data': {
            'id': user.id,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'phone': user.phone,
            'country': user.country,
            'date_of_birth': user.date_of_birth,
            'website_url': user.website_url,
            'bio': user.bio,
            'facebook': user.facebook,
            'linkedIn': user.linkedin,
            'instagram': user.instagram,
            'twitter': user.twitter,
          }
        }
        return make_response(jsonify(responseObject)), 200
      else:
        responseObject = {
          'status': 'fail',
          'message': 'User not found. Please login again.'
        }
        return make_response(jsonify(responseObject)), 401
    else:
      responseObject= {
        'status': 'fail',
        'message': 'User not found. Please login again.'
      }
      return make_response(jsonify(responseObject)), 401

class ProfileAPI(MethodView):
  @cross_origin()
  def get(self):
    user = Auth.query.filter_by(id=1).first()
    if user:
      responseObject = {
          'user_id': user.id,
          'email': user.email,
          'first_name': user.first_name,
          'last_name': user.last_name,
          'phone': user.phone,
          'country': user.country,
          'date_of_birth': user.date_of_birth,
          'website_url': user.website_url,
          'bio': user.bio,
          'image_file': user.image_file,
          'facebook': user.facebook,
          'twitter': user.twitter,
          'linkedin': user.linkedin,
          'instagram': user.instagram,
      }
      return make_response(jsonify(responseObject)), 200
    else:
      responseObject = {
        'status': 'fail',
        'message': 'Could not get user profile. Please try again'
      }
      return make_response(jsonify(responseObject)), 404


login_api_view = LoginAPI.as_view('login_api')
register_api_view = RegisterAPI.as_view('register_api')
user_api_view = UserAPI.as_view('user_api')
update_api_view = UpdateProfile.as_view('update_api')
profile_api_view = ProfileAPI.as_view('profile_api')

auth_blueprint.add_url_rule(
  '/api/login',
  view_func=login_api_view,
  methods=['POST']
)

auth_blueprint.add_url_rule(
  '/auth/register',
  view_func=register_api_view,
  methods=['POST']
)

auth_blueprint.add_url_rule(
  '/api/user',
  view_func=user_api_view,
  methods=['GET']
)

auth_blueprint.add_url_rule(
  '/api/profile',
  view_func=profile_api_view,
  methods=['GET']
)


auth_blueprint.add_url_rule(
  '/api/profile/update',
  view_func=update_api_view,
  methods=['PUT']
)
