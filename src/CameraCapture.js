const OpenCV = require('opencv4nodejs');
const OpenCVConfig = require('./OpenCVConfig');

class CameraCapture {
    constructor(cameraConnectionString = OpenCVConfig.cameraConnectionString){
        this.webcamCapture = new OpenCV.VideoCapture(cameraConnectionString);
        this.fps =  this.webcamCapture.get(OpenCV.CAP_PROP_FPS);
        this.frame = null;
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
        
        const promise = new Promise((resolve, reject) => {
            fileSystem.exists(folderName, (exists) => {
                if(!exists){
                    fileSystem.mkdir(folderName, (err) => {
                        if(err) {
                            console.log(err);
                            reject(err);
                        }

                        resolve(true);
                    });
                }else{
                    resolve(true);
                }
            });
        });

        return promise;
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
    
    _Read(){
        return this.webcamCapture.read().bgrToGray();
    }

    _Stream() {
        let interval = 0;

        while(true){
            let whileStart = Date.now();

            this.frame = this._Read();
            if(this.frame.empty){
                console.log("empty");
                this.webcamCapture.reset();
                this.frame = this._Read();
            }
        
            OpenCV.imshow("cap", this.frame);
            OpenCV.waitKey(1);

            interval += Date.now() - whileStart;
            if(interval >= OpenCVConfig.screenshotInterval){
                this._ScreenShot();
                interval = 0;
            }
        }
    }

    _ScreenShot() {
        this._SaveImage(this.frame);
    }
    
    async Start() {
        this._ScreenLog();
        await this._CreateLocalWebcamCaptureFolder();
        
        // Recursive with 1s timer
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