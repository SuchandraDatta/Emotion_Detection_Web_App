**Emotion Detection Web App**



A web app that predicts emotion from images uploaded to it. Tech used: Python, Keras API, Tensorflowjs, JavaScript and Firebase.
Based on different Convolutional Neural Network architectures, a model is trained using Python, Keras API, with fer2013 dataset on Google Colaboratory GPU's. The Keras SavedModel is converted to tfjs layers format, loaded and infered in browser using Tensorflow.js and this entire thing is hosted on Firebase. Tfjs converter doesnt work in Colab if input model path is in Drive as the space in "My Drive" part of filepath seems to be causing some problem(refer tfjs issues #3618, uploading model via file upload into local drive works)


Sample predictions and output


![screenshot_1](public/images/screenshot_1.png)
![screenshot_2](public/images/screenshot_2.png)
![screenshot_3](public/images/screenshot_3.png)

