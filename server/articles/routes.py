from flask import make_response, jsonify, Blueprint, request
from flask.views import MethodView
from server.models import Article
from server import ma, pagination

articles_blueprint = Blueprint('articles', __name__)

class ArticlesSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'cover', 'timestamp', 'slug')

articles_schema = ArticlesSchema(many= True)


class ListArticlesAPI(MethodView):
    def get(self):
        res = pagination.paginate(
          Article,
          articles_schema,
          True,
          pagination_schema_hook = lambda current_page, page_obj : {
            'next': page_obj.has_next,
            'prev': page_obj.has_prev,
            'current': current_page,
            'pages': page_obj.pages,
            'per_page': page_obj.per_page,
            'total': page_obj.total
          },
        )
        print('====> ', res)
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


articles_list_api_view = ListArticlesAPI.as_view('articles_list_api')
article_detail_api_view = DetailArticleAPI.as_view('articles_detail_api')


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