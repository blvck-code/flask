from flask import Blueprint, request, make_response, jsonify
from flask.views import MethodView
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt_header
from flask_cors import cross_origin
from server.utils import verify_token

dashboard_blueprint = Blueprint('dashboard', __name__)

class DashboardAPI(MethodView):
  @cross_origin()
  @jwt_required()
  def get(self):
    return make_response(jsonify({'data': 123}))

dashboard_view = DashboardAPI.as_view('dashboard_view_api')

dashboard_blueprint.add_url_rule(
  '/api/dashboard',
  view_func=dashboard_view,
  methods=['GET']
)
