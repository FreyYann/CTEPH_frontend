from flask import Flask
from setup import DevelopmentConfig
from views import router
from flask_cors import CORS


app = Flask(__name__,
 static_folder ='./static',
 template_folder='./templates')
CORS(app)

app.config.from_object(DevelopmentConfig)
app.register_blueprint(router)

if __name__ == '__main__':
 app.run()
