from flask import Blueprint, render_template, redirect, url_for
from flask import Flask, flash, request, redirect, url_for
# from myproject import db
import os
import sys
sys.path.append('/home/ItDev_Billy/itlize_demo/myproject')
import pdb
import re
import SimpleITK as sitk
from config import *
from werkzeug.utils import secure_filename
from patient import transformer
from PIL import Image
# import matplotlib as mpl
# if os.environ.get('DISPLAY','') == '':
#     print('no display found. Using non-interactive Agg backend')
#     mpl.use('Agg')
# import matplotlib.pyplot as plt
import numpy as np

ALLOWED_EXTENSIONS = set(['dcm'])
patient_blueprint = Blueprint('patient',
                              __name__,
                              template_folder='templates/patient')


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def transormation(dir1, dir2):
    a = transformer.Adjustor()
    for f in os.listdir(dir1):
        path = os.path.join(dir1, f)
        if 'dcm' in f:
            prefix = f.split('.')[0]
            # plt.figure(figsize=(30,30))
            arr = a.get_pixeldata(os.path.join(dir1, f), 'Tissue')[0]
            # plt.imshow(np.array(arr),cmap='gray')

            img = Image.fromarray(np.array(arr).astype('uint8'))
            img.save(os.path.join(dir2, '%s.png' % prefix))

            # plt.savefig(os.path.join(dir2,'%s1.png' % prefix))


@patient_blueprint.route('/upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        files = request.files.getlist('photos')
        # print('debug')
        # pdb.set_trace()
        for file in files:
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                file.save(os.path.join(UPLOAD_FOLDER, filename))
        # turn dcm to png
        transormation(UPLOAD_FOLDER, IMAGE_FOLDER)
        dirlist = os.listdir(IMAGE_FOLDER)
        dummylist = ['' for x in dirlist]

        return render_template('inference.html', rangeX=range(len(dirlist)),
                               dirlist=dirlist, result=dummylist)

    return render_template('upload.html')


@patient_blueprint.route('/inference', methods=['GET', 'POST'])
def inference():
    import os
    dirlist = os.listdir(IMAGE_FOLDER)
    if dirlist:
        os.system("/home/ItDev_Billy/.conda/envs/p36/bin/python\
            /home/ItDev_Billy/CTEPH_mrcnn/Mask_RCNN/tools/demo_mrcnn.py")

    result_path = "/home/ItDev_Billy/itlize_demo/myproject/static/result"
    result = [x for x in os.listdir(result_path)]
    return render_template('inference.html', rangeX=range(len(dirlist)),
                           dirlist=sorted(dirlist, key=lambda x: int(''.join(re.findall(r'\d+', x)))),
                           result=sorted(result))


@patient_blueprint.route('/QA', methods=['GET', 'POST'])
def QA():
    return render_template('QA.html')
