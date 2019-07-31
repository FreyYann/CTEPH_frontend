from flask import render_template, request, Blueprint
from flask import Flask, flash, request, redirect, url_for
from werkzeug.utils import secure_filename
from flask import send_from_directory
from src.config import UPLOAD_FOLDER
import os
# from src.models import Post
# from src.config import Config
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
main = Blueprint('main', __name__)


@main.route("/")
@main.route("/home")
def home():
    # page = request.args.get('page', 1, type=int)
    # posts = Post.query.order_by(Post.date_posted.desc()).paginate(page=page, per_page=5)
    # return render_template('home.html', posts=posts)
    return render_template('home.html', main=main)


@main.route("/about")
def about():
    return render_template('about.html', title='About')


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# @main.route('/', methods=['GET', 'POST'])
# def upload_file():
#     if request.method == 'POST':
#         files = request.files.getlist('photos')
#         print(files)
#         for file in files:
#             if file and allowed_file(file.filename):
#                 filename = secure_filename(file.filename)
#                 file.save(os.path.join(UPLOAD_FOLDER, filename))

#             # return redirect(url_for('main.upload',
#             #                 filename=filename))
#         return 'Successfully uploaded to %s!' % UPLOAD_FOLDER

#     return render_template('upload.html')


# @main.route('/uploads/<filename>')
# def uploaded_file(filename):
#     send_from_directory(UPLOAD_FOLDER,
#                                filename)
#     return "All good!"
