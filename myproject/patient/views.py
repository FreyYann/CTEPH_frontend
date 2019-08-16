from flask import Blueprint, render_template, redirect, url_for, jsonify
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

# for debuggin in python
# pdb.set_trace()
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


@patient_blueprint.route('/sendFile', methods=['POST'])
def upload_file():
    files = request.files.getlist('photo')
    # NICHOLAUS: YOU SHOULD CLEAR THE FILE FOR DIFFENT ENTRIES
    # pdb.set_trace()
    # os.system("mkdir %s/*" % IMAGE_FOLDER)
    # os.system("mkdir %s/*" % UPLOAD_FOLDER)
    # print "to_dict "
    # print request.files.getlist('photo')
    # print request.files.to_dict(flat=False)['pho']

    for file in files:
        # print file
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(UPLOAD_FOLDER, filename))

    # turn dcm to png
    transormation(UPLOAD_FOLDER, IMAGE_FOLDER)
    print os.listdir(IMAGE_FOLDER)
    # dirlist = os.listdir(IMAGE_FOLDER)
    # dummylist = ['' for x in dirlist]

    return jsonify({'success': 'file has been successfully uploaded'}), 201


@patient_blueprint.route('/algorithm', methods=['GET'])
def inference():
    # os.system("mkdir %s/*" % IMAGE_FOLDER)
    # os.system("mkdir %s/*" % RESULT_FOLDER)
    import os
    dirlist = os.listdir(IMAGE_FOLDER)
    if dirlist:
        os.system("/home/ItDev_Billy/.conda/envs/p36/bin/python\
            /home/ItDev_Billy/CTEPH_mrcnn/Mask_RCNN/tools/demo_mrcnn.py")

    result_path = "/home/ItDev_Billy/itlize_demo/myproject/static/result"
    result = [x for x in os.listdir(result_path)]

    rangeX=range(len(dirlist))
    dirlist=[x for x in dirlist if 'png' in x]
    print "Hello look at your self and tell me that you can do it dont tell me i am not good en"
    print result[0]
    print "***********"
    print "***********"
    print "***********"
    print "***********"
    dirlist=sorted(dirlist, key=lambda x: int(re.findall(r'[0-9]+', x)[0]))
    print "***********"
    print "***********"
    print "***********"
    print "***********"
    result=sorted(result)

    print "***********"
    print "***********"
    print "***********"
    print "***********"
    # print rangeX
    # print dirlist
    # print result
    return jsonify({
    'origin' : dirlist,
    'result' : result,
    'success': 'algorithm has been successfully'
    }), 201
    # return render_template('result.html', rangeX=range(len(dirlist)),
    #                        dirlist=sorted(dirlist, key=lambda x: int(''.join(re.findall(r'\d+', x)))),
    #                        result=sorted(result),
    #                        originalImage=sorted(dirlist, key=lambda x: int(''.join(re.findall(r'\d+', x))))[0],
    #                        createImage=sorted(result)[0]
    #                        )



@patient_blueprint.route('removefiles', methods=['DELETE'])
def removefiles():
    # METHOD IS TO CLEAR THE FILES
    print "CLEAR THE UPLOAD FOLDER FROM THE SERVER"
    os.system('rm -rf %s' % UPLOAD_FOLDER)
    os.system('mkdir -p %s' % UPLOAD_FOLDER)
    return jsonify({'success': 'file has been successfully remove : removefiles route'}), 200


@patient_blueprint.route('clearfiles', methods=['DELETE'])
def clearfiles():
    # METHOD IS TO CLEAR THE FILES
    print "CLEAR THE FILES "
    os.system('rm -rf %s' % UPLOAD_FOLDER)
    os.system("rm -rf %s" % IMAGE_FOLDER)
    os.system("rm -rf %s" % RESULT_FOLDER)

    os.system('mkdir -p %s' % UPLOAD_FOLDER)
    os.system("mkdir -p %s" % IMAGE_FOLDER)
    os.system("mkdir -p %s" % RESULT_FOLDER)
    return jsonify({'success': 'file has been successfully cleared : clearfiles route'}), 200


#cath all routes routes
@patient_blueprint.route('/', defaults={'path': ''})
@patient_blueprint.route('/<path:path>')
def catch_all(path):
    print request.path
    print "got catch all"
    return render_template("./index.html")
