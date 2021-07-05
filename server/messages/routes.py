import datetime
from flask.views import MethodView
from flask_jwt_extended import jwt_required
from flask import Blueprint, make_response, jsonify, request
from flask_cors import cross_origin

from server import ma, db
from server.models import Message

messages_blueprint = Blueprint('messages', __name__)

class MessagesSchema(ma.Schema):
  class Meta:
    fields = ('id', 'category', 'read', 'sender_name', 'sender_email', 'timestamp', 'subject', 'message')

messages_schema = MessagesSchema(many=True)
# Messages List
class ListMessageAPI(MethodView):
  decorators = [cross_origin()]
  # @jwt_required()
  def get(self):
    category = request.args.get('category', None)

    try:
      messages_category = Message.query.filter_by(category=category)
      result = messages_schema.dump(messages_category)
        
      return make_response(jsonify(result)), 200
    except Exception as e:
      responseObject = {
        'status': 'fail',
        'message': 'Could not retrieve messages. Please try again'
      }
      return make_response(jsonify(responseObject)), 400

  def post(self):
    post_data = request.get_json()

    sender_name_raw = post_data.get('sender_name', None)
    sender_email_raw = post_data.get('sender_email', None)
    timestamp = datetime.datetime.utcnow()
    subject_raw = post_data.get('subject', None)
    message_raw = post_data.get('message', None)
    

    try:
      sender_name = sender_name_raw.lower()
      sender_email = sender_email_raw.lower()
      subject = subject_raw.lower()
      message = message_raw.lower()

      message = Message(
        sender_name=sender_name,
        sender_email=sender_email,
        timestamp=timestamp,
        subject=subject,
        message=message,
        category = 'inbox',
        read = False
      )

      db.session.add(message)
      db.session.commit()

      responseObject = {
        'id': message.id,
        'category': message.category,
        'sender_name': message.sender_name,
        'sender_email': message.sender_email,
        'timestamp': message.timestamp,
        'subject': message.subject,
        'message': message.message
      }
      return make_response(jsonify(responseObject)), 200

    except Exception as e:
      responseObject = {
        'status': 'fail',
        'message': 'Your message was not received. Please try again.'
      }
    return make_response(jsonify(responseObject)), 400

messages_list_api_view = ListMessageAPI.as_view('messages_list_api')

messages_blueprint.add_url_rule(
  '/api/messages',
  view_func=messages_list_api_view,
  methods=['GET']
)

messages_blueprint.add_url_rule(
  '/api/messages',
  view_func=messages_list_api_view,
  methods=['POST']
)
