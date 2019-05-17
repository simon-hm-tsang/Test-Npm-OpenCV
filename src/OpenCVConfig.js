const OpenCVConfig = {
    // Webcam capture
    // rtsp example: "rtsp://admin:P@ssword654321@192.168.1.20:554/h264/1/main/av_stream"
    cameraConnectionString: 0, // 0 = device cam, could be a rtsp (above example)
    
    // Face recognition for static picture
    imageFileName: '1080pCrowd', // any image file name in ./TestFace
    imageFileExtension: 'jpg', // depends on the extension of the image
    minNeighbors: 10 // OpenCV minNeighbors
};

module.exports = OpenCVConfig;