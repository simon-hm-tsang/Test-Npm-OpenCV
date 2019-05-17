const OpenCV = require('opencv4nodejs');
const OpenCVConfig = require('./OpenCVConfig');

class StaticFaceRecognition {
    constructor(imageFileName = OpenCVConfig.imageFileName, imageFileExtension = OpenCVConfig.imageFileExtension, minNeighbors = OpenCVConfig.minNeighbors){
        this.classifier = new OpenCV.CascadeClassifier(OpenCV.HAAR_FRONTALFACE_DEFAULT);
        this.imageFile = `${imageFileName}.${imageFileExtension}`;
        this.minNeighbors = minNeighbors;
    }

    _GetImageFilePath() {
        return `./src/TestFace/${this.imageFile}`;
    }
    _GetMostUsedScreenResolution(){
        // 1366 x 768 (Most used screen resolution)
        return { rows: 768, cols: 1366 };
    }

    _DrawDetection(imgMatrix = new OpenCV.Mat()) {
        const { objects } = this.classifier.detectMultiScale(imgMatrix, { minNeighbors: this.minNeighbors });

        for (let i = 0; i < objects.length; i++) {
            OpenCV.drawDetection(imgMatrix, objects[i]);
        }
    }

    Recognize() {
        const { rows, cols } = this._GetMostUsedScreenResolution();
        console.log(this._GetImageFilePath());
        const frame = OpenCV.imread(this._GetImageFilePath()).resize(rows, cols);
    
        this._DrawDetection(frame);
    
        OpenCV.imshowWait('cap', frame);
    }

    Run() {
        this.Recognize();
    }
}

module.exports = StaticFaceRecognition;