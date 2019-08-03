My views settings are Like this
********************************************
from flask import Blueprint, render_template, redirect, url_for
from flask import Flask, flash, request, redirect, url_for
# from myproject import db
import os
# todo create folders for differents users
from myproject.config import UPLOAD_FOLDER
# from myproject.models import Owner
# from myproject.owners.forms import AddForm
from werkzeug.utils import secure_filename

ALLOWED_EXTENSIONS = set(['dcm'])

*******************************************
Your New Current views settings are
********************************************

from flask import Blueprint, render_template, redirect, url_for
from flask import Flask, flash, request, redirect, url_for
# from myproject import db
import os
import sys
sys.path.append('/home/ItDev_Billy/itlize_demo/myproject')

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
*********************************************
IM LEAVING IT WITH YUOR NEW ADDITION

So incase your own doesn't run you can change it to the first views to make it work.
