import numpy as np
import pydicom
import SimpleITK as sitk
import dicom
from PIL import Image
# import matplotlib.pyplot as plt


class Adjustor:
    """
    Adjust the window of the dicom to show different aspects
    of the patients' CT scans.
    https://hackmd.io/79XSd45AQ-aOI5R1LYpn9Q?view
    """

    def __init__(self):
        # window width window center
        self.diction = {
            "Mask": [100, -20],
            "Lung1": [1650, -500],
            "Lung2": [1500, -700],
            "Lung3": [1200, -300],
            'Mediastinal1': [300, 40],
            'Mediastinal2': [400, 40],
            "Bone": [1200, 300],
            "Tissue": [400, 50]
        }

    def get_pixeldata(self, dicom_path, windowName):
        """If NumPy is available, return an ndarray of the Pixel Data.
        Raises
        ------
        AttributeError
            if the decoded amount of data does not match the expected amount
        Returns
        -------
        numpy.ndarray
           The contents of the Pixel Data element (7FE0,0010) as an ndarray.
        """
        try:
            dicom_dataset = pydicom.read_file(dicom_path)
            #             pixel_bytes= dicom_dataset.PixelData
            #             pixel_array = np.frombuffer(pixel_bytes, dtype=np.int16)

            image = sitk.ReadImage(dicom_path)
            image_array = sitk.GetArrayFromImage(image)  # z, y, x
            pixel_array = np.squeeze(image_array, axis=0)

            #             expected_length = dicom_dataset.Rows * dicom_dataset.Columns
            #             assert pixel_array.shape[0]==expected_length
            #             if dicom_dataset.Modality.lower().find('ct') >= 0:
            pixel_array = pixel_array * dicom_dataset.RescaleSlope + dicom_dataset.RescaleIntercept
            #             pixel_array=pixel_array.reshape((512,512))
            return self.setDicomWinWidthWinCenter(pixel_array, windowName, dicom_dataset.Rows, dicom_dataset.Columns), \
                dicom_dataset.Rows, dicom_dataset.Columns

        except AssertionError:
            # print(AssertionError, dicom_path)
            print(dicom_path,'is not good')

    def needs_to_convert_to_RGB(dicom_dataset):
        return False

    def should_change_PhotometricInterpretation_to_RGB(dicom_dataset):
        return False

    def setDicomWinWidthWinCenter(self, img_data, windowName, rows, cols):
        winwidth, wincenter = self.diction[windowName]
        img_temp = img_data
        img_temp.flags.writeable = True
        min = (2 * wincenter - winwidth) / 2.0 + 0.5
        max = (2 * wincenter + winwidth) / 2.0 + 0.5
        dFactor = 255.0 / (max - min)

        for i in np.arange(rows):
            for j in np.arange(cols):
                img_temp[i, j] = int((img_temp[i, j] - min) * dFactor)

        min_index = img_temp < 0
        img_temp[min_index] = 0
        max_index = img_temp > 255
        img_temp[max_index] = 255

        return img_temp  # .astype(int)


if __name__ == '__main__':
    import os
    path='/Users/yanxinzhou/train/work/itlize_demo/data'
    for f in os.listdir(path):
        if 'dcm' in f:
            prefix = f.split('.')[0]
            a = Adjustor()
            print(f)
            arr = a.get_pixeldata(f, 'Lung2')[0]

            # print(type(arr), np.max(arr), np.min(arr))
            img = Image.fromarray(np.array(arr).astype('uint8'))
            img.save(os.path.join(path,'%s.png' % prefix))
