Make sure "windows-build-tools" is installed globally with npm for Windows OS

StaticFaceRecognition.js
===============================================
*   To see if faces in pictures of ./TestFace can be recognized
CameraCapture.js
===============================================
*   To capture the camera in every 1 second
OpenCVConfig.js
===============================================
*   To set default values for constructor of StaticFaceRecognition.js and CameraCapture.js, usages are described in it
Run.js
===============================================
*   To run StaticFaceRecognition.js or CameraCapture.js with command "node run <className>" (e.g. node run StaticFaceRecognition). It is developed just because creating an instance at the end of class script would be a bad practice if it is to use in other scripts.