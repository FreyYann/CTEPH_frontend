from flask import Flask
# from flask_sqlalchemy import SQLAlchemy
# from flask_bcrypt import Bcrypt
# from flask_login import LoginManager
# from flask_mail import Mail
from src.config import Config

# db = SQLAlchemy()
# bcrypt = Bcrypt()
# login_manager = LoginManager()
# login_manager.login_view = 'users.login'
# login_manager.login_message_category = 'info'
# mail = Mail()


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(Config)
    app.config['UPLOAD_FOLDER'] = "/home/ubuntu/itlize_demo/images"
    # db.init_app(app)
    # from blog.models import User, Post
    # db.create_all()
    # bcrypt.init_app(app)
    # login_manager.init_app(app)
    # mail.init_app(app)

    # from blog.users.route import users
    # from blog.posts.route import posts

    # from src.main.route import main
    from src.main.route import main
    from src.errors.handlers import errors
    # app.register_blueprint(users)
    # app.register_blueprint(posts)
    app.register_blueprint(main)
    # app.register_blueprint(main)
    # app.register_blueprint(errors)

    return app
