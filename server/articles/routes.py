import os
import uuid
import datetime
from flask import make_response, jsonify, Blueprint, request
from flask.views import MethodView
from server.models import Article
from server import ma, pagination, app, storage, db
from werkzeug.utils import secure_filename
from flask_cors import cross_origin

articles_blueprint = Blueprint('articles', __name__)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}


def allowed_files(filename):
  return '.' in filename and filename.split('.', 1)[1].lower() in ALLOWED_EXTENSIONS


class ArticlesSchema(ma.Schema):
  class Meta:
    fields = ('id', 'title', 'cover', 'timestamp', 'slug')


articles_schema = ArticlesSchema(many=True)


class ListArticlesAPI(MethodView):
  def get(self):
    res = pagination.paginate(
      Article,
      articles_schema,
      True,
      pagination_schema_hook=lambda current_page, page_obj: {
        'next': page_obj.has_next,
        'prev': page_obj.has_prev,
        'current': current_page,
        'pages': page_obj.pages,
        'per_page': page_obj.per_page,
        'total': page_obj.total
      },
    )
    return res

class DetailArticleAPI(MethodView):
  def get(self, article_id):
    try:
      article = Article.query.filter_by(id=article_id).first()
      responseObject = {
        'id': article.id,
        'title': article.title,
        'body': article.body,
        'cover': article.cover,
        'covername': article.covername,
        'timestamp': article.timestamp
      }
      return make_response(jsonify(responseObject)), 200

    except Exception as e:
      responseObject = {
        'status': 'fail',
        'message': 'That article does not exist.'
      }
      return make_response(jsonify(responseObject)), 404

class AddArticleAPI(MethodView):
  @cross_origin()
  def post(self):
    post_data = request.form

    title = post_data.get('title')
    body = post_data.get('body')
    cover = request.files['cover']

    print(cover)

    if cover and allowed_files(cover.filename):
      filename = str(uuid.uuid4())
      filename += "."
      filename += cover.filename.split('.')[1]

      # create secure name
      filename_secure = secure_filename(filename)

      # save the file inside upload folder
      cover.save(os.path.join(app.config['UPLOAD_FOLDER'], filename_secure))

      # local file
      local_filename = "./uploads/"
      local_filename += filename_secure

      # firebase filename
      firebase_filename = "uploads/"
      firebase_filename += filename_secure

      # upload file
      storage.child(firebase_filename).put(local_filename)

      # get the url of the file
      cover_image = storage.child(firebase_filename).get_url(None)

      article = Article(title=title, body=body, cover=cover_image, covername=filename_secure, id=uuid.uuid4(),
                        timestamp=datetime.datetime.utcnow())

      db.session.add(article)
      db.session.commit()

      # delete the local file
      os.remove(os.path.join(app.config['UPLOAD_FOLDER'], filename_secure))

    return make_response(jsonify({
      'id': article.id,
      'title': article.title,
      'body': article.body,
      'cover': article.cover,
      'covername': article.covername,
      'timestamp': article.timestamp
    }))


articles_list_api_view = ListArticlesAPI.as_view('articles_list_api')
article_detail_api_view = DetailArticleAPI.as_view('articles_detail_api')
article_create_api_view = AddArticleAPI.as_view('articles_create_api')

articles_blueprint.add_url_rule(
  '/api/articles/create',
  view_func=article_create_api_view,
  methods=['POST']
)

articles_blueprint.add_url_rule(
  '/api/articles/list',
  view_func=articles_list_api_view,
  methods=['GET']
)

articles_blueprint.add_url_rule(
  '/api/articles/<article_id>',
  view_func=article_detail_api_view,
  methods=['GET']
)
