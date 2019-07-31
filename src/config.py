import os
# import pymysql
# pymysql.install_as_MySQLdb()

UPLOAD_FOLDER = "/home/ubuntu/itlize_demo/images"


class Config:
    # SECRET_KEY = '5791628bb0b13ce0c676dfde280ba245'
    # SQLALCHEMY_DATABASE_URI = 'mysql://root:123456@localhost:3306/users'
    # MAIL_SERVER = 'smtp.googlemail.com'
    # MAIL_PORT = 587
    # app.config[‘UPLOAD_FOLDER’]
    MAIL_USE_TLS = True
    MAIL_USERNAME = os.environ.get('EMAIL_USER')
    MAIL_PASSWORD = os.environ.get('EMAIL_PASS')
    ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
    UPLOAD_FOLDER = "/home/ubuntu/itlize_demo/images"
