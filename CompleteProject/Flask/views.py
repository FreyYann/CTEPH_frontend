from flask import render_template, Blueprint, request, jsonify
from flask_cors import CORS
from subprocess import check_output
import os
import pdb
from user.user import UserForm
from config import *
from transformer import Adjustor

router = Blueprint('router',__name__)
CORS(router)

ALLOWED_EXTENSIONS = set(['dcm'])
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def transormation(dir1, dir2):
    a = Adjustor()
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


@router.route('/')
def index():
    return render_template("./index.html")


@router.route('/api/sendFile', methods=['POST'])
def sendFile():

    # GET THE FILES FOR YOU TO RUN THE ALGORIGHT
    print "SEND THE FILES TO BE STORE IN A FOLDER"
    os.system('mkdir %s' % UPLOAD_FOLDER)
    files = request.files.getlist('photos')
    print files;
    for file in files:
        # print file
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(UPLOAD_FOLDER, filename))

        transormation(UPLOAD_FOLDER, IMAGE_FOLDER)
    return jsonify({'success': 'file has been successfully uploaded'}), 201


@router.route('/api/removefiles', methods=['DELETE'])
def removefiles():
    # METHOD IS TO CLEAR THE FILES
    print "CLEAR THE UPLOAD FOLDER FROM THE SERVER"
    os.system('rm -rf %s' % UPLOAD_FOLDER)
    return jsonify({'success': 'file has been successfully remove : removefiles route'}), 200

@router.route('/api/algorithm', methods=['GET'])
def algorithm():
    os.system("mkdir %s" % IMAGE_FOLDER)
    os.system("mkdir %s" % RESULT_FOLDER)
    # GET THE FILES FOR YOU TO RUN THE ALGORIGHT
    print "RUN THE ALGORITHM AND SEND THE INFORMATION BACK TO THE USER"

    origin = sorted([x for x in os.listdir(IMAGE_FOLDER)])
    result = sorted([x for x in os.listdir(RESULT_FOLDER)])
    # print request.files
    return jsonify({
    'origin' : origin,
    'result' : result,
    'success': 'algorithm has been successfully'
    }), 201

@router.route('/api/clearfiles', methods=['DELETE'])
def clearfiles():
    # METHOD IS TO CLEAR THE FILES
    print "CLEAR THE FILES "
    os.system('rm -rf %s' % UPLOAD_FOLDER)
    os.system("rm -rf %s" % IMAGE_FOLDER)
    os.system("rm -rf %s" % RESULT_FOLDER)
    return jsonify({'success': 'file has been successfully cleared : clearfiles route'}), 200


#cath all routes routes
@router.route('/', defaults={'path': ''})
@router.route('/<path:path>')
def catch_all(path):
    print request.path
    print "got catch all"
    return render_template("./index.html")


# origin = sorted([x for x in os.listdir(IMAGE_FOLDER) if 'png' in x],key=lambda:int(re.findall('[0-9]+',x)[0]))
# result =sorted([x for x in os.listdir(RESULT_FOLDER) if 'png' in x],key=lambda:int(re.findall('[0-9]+',x)[0]))
