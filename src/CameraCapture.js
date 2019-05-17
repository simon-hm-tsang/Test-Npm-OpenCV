const OpenCV = require('opencv4nodejs');
const OpenCVConfig = require('./OpenCVConfig');

class CameraCapture {
    constructor(cameraConnectionString = OpenCVConfig.cameraConnectionString){
        this.webcamCapture = new OpenCV.VideoCapture(cameraConnectionString);
        this.fps =  this.webcamCapture.get(OpenCV.CAP_PROP_FPS);
    }
    
    static GetLocalImageFolderName(withFileName = false) {
        const today = new Date();
        // Folder path
        let completePath = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}/`;
        console.log(`Folder: \"${completePath}\"`)
        
        if(withFileName){
            // File path
            completePath += `${today.getHours()}h${today.getMinutes()}m${today.getSeconds()}s${today.getMilliseconds()}ms.jpg`;
            console.log(`File: \"${completePath}\"`);
        }
        
        return `./WebcamShot/${completePath}`;
    }
    // Could be overrided to void return if saving images to an external storage 
    _CreateLocalWebcamCaptureFolder() {
        const fileSystem = require('fs');
        const folderName = CameraCapture.GetLocalImageFolderName();
        
        fileSystem.exists('./WebcamShot', (exists) => {
            if(!exists){
                fileSystem.mkdir('./WebcamShot');
            }
        });

        fileSystem.exists(folderName, (exists) => {
            if(!exists){
                fileSystem.mkdir(CameraCapture.GetLocalImageFolderName());
            }
        });
    }
    
    _ScreenLog() {
        const width = this.webcamCapture.get(OpenCV.CAP_PROP_FRAME_WIDTH);
        const height = this.webcamCapture.get(OpenCV.CAP_PROP_FRAME_HEIGHT);
    
        console.log(`Video fps: ${this.fps}, width: ${width}, height: ${height}`);
    }

    // This method may be overrided for saving image to an external storage
    _SaveImage(imgMatrix){
        OpenCV.imwrite(`${CameraCapture.GetLocalImageFolderName(true)}`, imgMatrix);
    }
    
    _Stream() {
        const beingTime = Date.now();

        const frame = this.webcamCapture.read().bgrToGray();
        if(frame.empty){
            return;
        }
        
        // OpenCV.imshow("cap", frame);
        this._SaveImage(frame);
        OpenCV.waitKey(this.fps);

        // Recursive with 1s timer
        setTimeout(
            () => {
                this._Stream();
            }, 
            1000 - (Date.now() - beingTime)
        );
    }
    
    Start() {
        this._ScreenLog();
        this._CreateLocalWebcamCaptureFolder();
        this._Stream();

        // .release() would be automatically called by destructor
        //webcamCapture.release();
    }

    // Interface for Run.js
    Run() {
        this.Start();
    }
}

module.exports = CameraCapture;