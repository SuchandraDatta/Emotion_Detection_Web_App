**Emotion Detection Web App**
A web app that predicts emotion from images uploaded to it. Tech used: Python, Keras API, Tensorflowjs, JavaScript and Firebase.
Based on different Convolutional Neural Network architectures, a model is trained using Python, Keras API, with fer2013 dataset on Google Colaboratory GPU's. The Keras SavedModel is converted to tfjs layers format, loaded and infered in browser using Tensorflow.js and this entire thing is hosted on Firebase. Tfjs converter doesnt work in Colab if input model path is in Drive as the space in "My Drive" part of filepath seems to be causing some problem(refer tfjs issues #3618, uploading model via file upload into local drive works)


Sample predictions and output
![screenshot_1](https://user-images.githubusercontent.com/41965125/117990120-7a95d380-b35a-11eb-9ba5-b405c00057a6.png)
![screenshot_2](https://user-images.githubusercontent.com/41965125/117990123-7bc70080-b35a-11eb-8a38-1f9d10e1c963.png)
![screenshot_3](https://user-images.githubusercontent.com/41965125/117990128-7cf82d80-b35a-11eb-8ad9-7ff879846812.png)