from flask import Blueprint, make_response, jsonify, request
from flask.views import MethodView
from flask_jwt_extended import jwt_required
from flask_cors import cross_origin

from server.models import Experience
from server import db, ma

experience_blueprint = Blueprint('experience', __name__)

class ExperienceSchema(ma.Schema):
  class Meta:
    fields = ('id', 'company', 'position', 'start', 'end', 'desc')

experience_schema = ExperienceSchema()
experiences_schema = ExperienceSchema(many=True)

# Experience List
class ListExperienceAPI(MethodView):
  def get(self):
      try:
        all_experiences = Experience.query.order_by(Experience.id.desc())
        result = experiences_schema.dump(all_experiences)
        responseObject = {
          'status': 'success',
          'data': result
        }
        return make_response(jsonify(responseObject)), 200
      except Exception as e:
        responseObject = {
          'status': 'fail',
          'message': 'Could not find experience. Please try again'
        }
        return make_response(jsonify(responseObject)), 404

# Create Experience Item
class CreateExperienceAPI(MethodView):
  @cross_origin()
  @jwt_required()
  def post(self):
    post_data = request.get_json()

    company = post_data.get('company', None)
    position = post_data.get('job', None)
    start = post_data.get('start', None)
    end = post_data.get('end', None)
    desc = post_data.get('desc', None)

    if company is not None and position is not None and start is not None and end is not None and desc is not None:

      experience = Experience(
        company=company,
        position=position,
        start=start,
        end=end,
        desc=desc
      )

      db.session.add(experience)
      db.session.commit()

      responseObject = {
        'status': 'success',
        'data': {
          'id': experience.id,
          'company': experience.company,
          'position': experience.position,
          'start': experience.start,
          'end': experience.end,
          'desc': experience.desc
        }
      }
      return make_response(jsonify(responseObject)), 201

    else:
      responseObject = {
        'status': 'fail',
        'message': 'Could not add experience. Please try again.'
      }
      return make_response(jsonify(responseObject)), 400

# Delete Experience Item
class DeleteExperienceAPI(MethodView):
  @cross_origin()
  @jwt_required()
  def delete(self, expe_id):
    experience = Experience.query.filter_by(id=expe_id).first()

    if experience:
      db.session.delete(experience)
      db.session.commit()

      responseObject = {
        'status': 'success',
        'message': 'Experience deleted successfully'
      }
      return make_response(jsonify(responseObject)), 200

    else:
      responseObject = {
        'status': 'fail',
        'message': 'Could not delete the experience'
      }
      return make_response(jsonify(responseObject)), 400

# Update Experience Item
class UpdateExperienceAPI(MethodView):
  @cross_origin()
  @jwt_required()
  def put(self, expe_id):
    experience = Experience.query.filter_by(id=expe_id).first()
    if experience:
      updated_data = request.get_json()
      company = updated_data.get('company')
      position = updated_data.get('position')
      start = updated_data.get('start')
      end = updated_data.get('end')
      desc = updated_data.get('desc')

      # Update fields
      if company:
        experience.company = company

      if position:
        experience.position = position

      if start:
        experience.start = start

      if end:
        experience.end = end

      if desc:
        experience.desc = desc

      db.session.commit()

      responseObject = {
        'status': 'success',
        'data': {
          'id': experience.id,
          'company': experience.company,
          'position': experience.position,
          'start': experience.start,
          'end': experience.end,
          'desc': experience.desc
        }
      }
      return make_response(jsonify(responseObject)), 200

    else:
      responseObject = {
        'status': 'fail',
        'message': 'Experience item does not exist'
      }
      return make_response(jsonify(responseObject)), 404

# Detail Experience Item
class DetailExperienceAPI(MethodView):
  def get(self, expe_id):
    experience = Experience.query.filter_by(id=expe_id).first()
    if experience:
      result = experience_schema.dump(experience)
      responseObject = {
        'status': 'success',
        'data': result
      }
      return make_response(jsonify(responseObject)), 200
    else:
      responseObject = {
        'status': 'fail',
        'message': 'Could not find that experience.'
      }
      return make_response(jsonify(responseObject)), 404

experience_list_api_view = ListExperienceAPI.as_view('experience_list_api')
experience_create_api_view = CreateExperienceAPI.as_view('experience_create_api')
experience_detail_api_view = DetailExperienceAPI.as_view('experience_detail_api')
experience_update_api_view = UpdateExperienceAPI.as_view('experience_update_api')
experience_delete_api_view = DeleteExperienceAPI.as_view('experience_delete_api')

experience_blueprint.add_url_rule(
  '/api/experience/list',
  view_func=experience_list_api_view,
  methods=['GET']
)

experience_blueprint.add_url_rule(
  '/api/experience/create',
  view_func=experience_create_api_view,
  methods=['POST']
)

experience_blueprint.add_url_rule(
  '/api/experience/<int:expe_id>/detail',
  view_func=experience_detail_api_view,
  methods=['GET']
)

experience_blueprint.add_url_rule(
  '/api/experience/<int:expe_id>/update',
  view_func=experience_update_api_view,
  methods=['PUT']
)

experience_blueprint.add_url_rule(
  '/api/experience/<int:expe_id>/delete',
  view_func=experience_delete_api_view,
  methods=['DELETE']
)
