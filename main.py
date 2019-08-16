"""
The app runs on AWS EC2: 18.222.252.237
The app runs on AWS EC2: http://192.168.1.217:5000/
"""

from myproject import app
from flask import render_template, flash
from myproject.user.user import UserForm
from myproject.config import *
import os


@app.route('/', methods=['GET', 'POST'])
def index():
    os.system('mkdir %s/*' % UPLOAD_FOLDER)
    os.system("mkdir %s/*" % IMAGE_FOLDER)
    os.system("mkdir %s/*" % RESULT_FOLDER)
    return render_template("./index.html")


if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)
    # name = False
    # form = UserForm()

    # if form.validate_on_submit():
    #     # flash('bung~bung~bung~bung')
    #     name = form.name.data
    #     # Reset the form's breed data to be False
    #     form.name.data = ''
    #     import os
    #     path = os.path.join(UPLOAD_FOLDER, name)
    #     # os.system("mkdir %s" % path)
    #     os.system("rm %s/*" % UPLOAD_FOLDER)
    #     os.system("rm %s/*" % IMAGE_FOLDER)
    #     os.system("rm %s/*" % RESULT_FOLDER)
    #     # todo current user
    # return render_template('home.html', form=form, name=name)
