const OpenCVConfig = {
    // Webcam capture
    // rtsp example: "rtsp://admin:P@ssword654321@210.3.200.151:554/h264/1/main/av_stream" [Ubuntu version, latest]
    // local example: 0 [Local camera, latest]
    cameraConnectionString: "rtsp://admin:P@ssword654321@210.3.200.151:554/h264/1/main/av_stream",
    
    // Face recognition for static picture
    imageFileName: '1080pCrowd', // any image file name in ./TestFace
    imageFileExtension: 'jpg', // depends on the extension of the image
    minNeighbors: 10 // OpenCV minNeighbors
};

module.exports = OpenCVConfig;