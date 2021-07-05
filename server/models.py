import uuid
from server import db, login_manager, bcrypt
from datetime import datetime
from flask_login import UserMixin

@login_manager.user_loader
def load_user(user_id):
    return Auth.query.get(user_id)

class Auth(db.Model, UserMixin):
  __tablename__ = 'auth'

  id = db.Column(db.Integer, primary_key=True)
  first_name = db.Column(db.String(120), nullable=True)
  last_name = db.Column(db.String(120), nullable=True)
  phone = db.Column(db.String(120), nullable=True)
  country = db.Column(db.String(120), nullable=True)
  date_of_birth = db.Column(db.String(120), nullable=True)
  website_url = db.Column(db.String(120), nullable=True)
  bio = db.Column(db.String(120), nullable=True)
  email = db.Column(db.String(120), unique=True, nullable=False)
  image_file = db.Column(db.String(20), nullable=True, default='default.jpg')
  password = db.Column(db.String(60), nullable=False)
  facebook = db.Column(db.String(120), nullable=True)
  twitter = db.Column(db.String(120), nullable=True)
  linkedin = db.Column(db.String(120), nullable=True)
  instagram = db.Column(db.String(120), nullable=True)


  def __init__(self, email, image_file, password):
    self.email = email
    self.image_file = image_file
    self.password = bcrypt.generate_password_hash(password)

  def __repr__(self):
    return f"User ('{self.email}', '{self.image_file}')"

class Article(db.Model):
  __tablename__ = 'articles'

  id = db.Column(db.String(255), default=str(uuid.uuid4()), primary_key=True)
  title = db.Column(db.String(255), nullable=False)
  body = db.Column(db.Text, nullable=False)
  cover = db.Column(db.String(255), nullable=False)
  covername = db.Column(db.String(255), nullable=False)
  timestamp = db.Column(db.DateTime, default=datetime.utcnow(), nullable=True)

  def __init__(self, id, title, body, cover, covername, timestamp):
    self.id = str(uuid.uuid4())
    self.title = title
    self.body = body
    self.cover = cover
    self.covername = covername
    self.timestamp = timestamp

  def __repr__(self):
    return f'Article ({self.title} on {self.timestamp})'

class Experience(db.Model):
  __tablename__ = 'experiences'

  id = db.Column(db.Integer, primary_key=True)
  company = db.Column(db.String(255), nullable=False)
  position = db.Column(db.String(255), nullable=False)
  start = db.Column(db.String(255), nullable=False)
  end = db.Column(db.String(255), nullable=False)
  desc = db.Column(db.String(255), nullable=False)

  def __init__(self, company, position, start, end, desc):
    self.company = company
    self.position = position
    self.start = start
    self.end = end
    self.desc = desc

  def __repr__(self):
    return f'Experience ({self.position} at {self.company})'

class Project(db.Model):
  __tablename__ = 'projects'

  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(255), nullable=False)
  desc = db.Column(db.String(255), nullable=False)
  date = db.Column(db.String(255), nullable=False)
  tools = db.Column(db.String(255), nullable=False)
  code = db.Column(db.String(255), nullable=False)
  link = db.Column(db.String(255), nullable=False)
  thumb = db.Column(db.String(255), nullable=False)
  thumb_name = db.Column(db.String(255), nullable=False)
  bg = db.Column(db.String(255), nullable=False)
  bg_name = db.Column(db.String(255), nullable=False)

  def __init__(self, title, desc, date, tools, code, link, thumb, thumb_name, bg, bg_name):
    self.title = title
    self.desc = desc
    self.date = date
    self.tools = tools
    self.code = code
    self.link = link
    self.thumb = thumb
    self.thumb_name = thumb_name
    self.bg = bg
    self.bg_name = bg_name

  def __repr__(self):
    return f'Project ({self.title})'

class Message(db.Model):
  __tablename__ = 'messages'

  id = db.Column(db.Integer, primary_key=True)
  category = db.Column(db.String(255), default='inbox', nullable=True)
  read = db.Column(db.Boolean, default=False, nullable=False)
  sender_name = db.Column(db.String(255), nullable=False)
  sender_email = db.Column(db.String(255), nullable=False)
  timestamp = db.Column(db.DateTime, default=datetime.utcnow(), nullable=False)
  subject = db.Column(db.String(255), nullable=False)
  message = db.Column(db.String(255), nullable=False)

  def __init__(self, category, read, sender_name, sender_email, timestamp, subject, message):
    self.category = category
    self.read = read
    self.sender_name = sender_name
    self.sender_email = sender_email
    self.timestamp = timestamp
    self.subject = subject
    self.message = message

  def __repr__(self):
    return f'Message from ({self.sender_name}, {self.sender_email})'
