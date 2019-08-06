from flask import Blueprint, render_template, redirect, url_for,  jsonify
from flask import Flask, flash, request, redirect, url_for,jsonify
# from myproject import db
import pdb
import os
# todo create folders for differents users
from myproject.config import UPLOAD_FOLDER
# from myproject.models import Owner
# from myproject.owners.forms import AddForm
from werkzeug.utils import secure_filename

ALLOWED_EXTENSIONS = set(['dcm'])
patient_blueprint = Blueprint('patient',
                              __name__,
                              template_folder='templates/patient')


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@patient_blueprint.route('/upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        files = request.files.getlist('photos')

        for file in files:
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                file.save(os.path.join(UPLOAD_FOLDER, filename))

            # return redirect(url_for('main.upload',
            #                 filename=filename))
        # return 'Successfully uploaded to %s!' % UPLOAD_FOLDER
        dirlist = os.listdir(UPLOAD_FOLDER)
        dummylist = ['' for x in dirlist]
        return render_template('inference.html', rangeX=range(len(dirlist)),
                               dirlist=dirlist, result=dummylist)

    return render_template('upload.html')


@patient_blueprint.route('/inference', methods=['GET', 'POST'])
def inference():
    if request.method == 'POST':
        import os
        dirlist = os.listdir(UPLOAD_FOLDER)
        # os.system("echo 'hello world'>> /home/ubuntu/1.txt")
        # os.system('source activate p36')
        if dirlist:
            os.system("/home/ItDev_Billy/.conda/envs/p36/bin/python\
                /home/ItDev_Billy/CTEPH_mrcnn/Mask_RCNN/tools/demo_mrcnn.py")

        # dirlist = [os.path.join(UPLOAD_FOLDER, x) for x in dirlist]
        # do inference
        # show the result
        # remove files in the folder
        result_path = "/home/ItDev_Billy/itlize_demo/myproject/static/result"
        result = [x for x in os.listdir(result_path)]
        return render_template('result.html', rangeX=range(len(dirlist)),
                               dirlist=dirlist, result=result)
    return render_template('result.html',
    originalImage="medical.png",
    createImage="medical.png")


@patient_blueprint.route('/about', methods=['GET', 'POST'])
def about():
    if request.method == 'POST':
        # pdb.set_trace()
        # print request.form
        print(request.files.getlist('photos'))
        # print(request.values)
        print("TEST. HELLO FILE SENT HERE")
        return jsonify({'success': 'remove the document item'}), 201
    return render_template('about.html')


# passing the selected images to the backend with a get request
@patient_blueprint.route('/image', methods=['GET'])
def getImage():
    oImage=request.args["originalImage"]
    cImage=request.args["createImage"]
    # print oImage
    # print cImage
    return render_template('result.html',
             originalImage=oImage,
             createImage=cImage)
    # return jsonify({'success': 'remove the document item'}), 201

@patient_blueprint.route('/some', methods=['GET'])
def getSomething():
    # print oImage
    print "something hit here"
    return render_template('result.html',
             originalImage="anima.jpg",
             createImage="heart.jpg")
    # return jsonify({'success': 'remove the document item'}), 201
