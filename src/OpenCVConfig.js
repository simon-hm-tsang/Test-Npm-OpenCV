const OpenCVConfig = {
    // Webcam capture
    // rtsp example: "rtsp://admin:P@ssword654321@192.168.1.20:554/h264/1/main/av_stream"
    cameraConnectionString: "rtsp://admin:P@ssword654321@192.168.1.20:554/h264/1/main/av_stream", // 0 = device cam, could be a rtsp (above example)
    screenshotInterval: 1000, // in ms
    // Face recognition for static picture
    imageFileName: '1080pCrowd', // any image file name in ./TestFace
    imageFileExtension: 'jpg', // depends on the extension of the image
    minNeighbors: 10 // OpenCV minNeighbors
};

module.exports = OpenCVConfig;