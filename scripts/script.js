/*Constants*/
URL_SAD = "https://animechan.vercel.app/api/quotes/anime?title=Nichijou"
URL_HAPPY = "https://animechan.vercel.app/api/quotes/anime?title=Bakuman"
URL_NEUTRAL = "https://animechan.vercel.app/api/quotes/anime?title=naruto"
URL_ANGRY = "https://animechan.vercel.app/api/quotes/anime?title=Monster"
URL_DISGUST = "https://animechan.vercel.app/api/quotes/anime?title=Death Note"
URL_FEAR = "https://animechan.vercel.app/api/quotes/anime?title=Shirobako"
URL_SURPRISE = "https://animechan.vercel.app/api/quotes/anime?title=Dragon Ball Z"
URL_LIST = [URL_ANGRY, URL_DISGUST, URL_FEAR, URL_HAPPY, URL_SAD, URL_SURPRISE, URL_NEUTRAL]
//This array is encoded with index i = corresponding emotion. In dataset, 0 = Angry, 1 = Disgust, 2 = Fear, 3 = Happy, 4 = Sad, 5 = Surprise and 6 = Neutral
		emotions = ["Angry", "Disgust", "Fear", "Happy", "Sad", "Surprise", "Neutral"]
model = null
async function load_model()
{
	model = await tf.loadLayersModel('model.json');
}
model = load_model()//Load only once per page load

function display(event)
	{
		let input_image = document.getElementById("input_image")
		input_image.src = URL.createObjectURL(event.target.files[0]);
		document.getElementById("input_image_container").style.display = "block";
	}
async function predict_emotion()
	{
		pleasewait = document.getElementById("pleasewait").style.display="flex";
		window.scrollBy(0, 100)
		output_screen = document.getElementsByClassName("output_screen")[0]
		output_screen.style.display = "None"
		quotes_screen = document.getElementsByClassName("quotes_screen")[0]
		quotes_screen.style.display = "None"		   
		let input = document.getElementById("input_image");
		//Preprocessing steps 
		/*
		(1)Resize to 48*48
		(2)Convert to grayscale using simple mean
		(3)Convert to float
		(4)Reshape to (1,48,48,1)
		(5)Normalize by dividing by 255.0
		*/
		try
		{
			let step1 = tf.browser.fromPixels(input).resizeNearestNeighbor([48,48]).toFloat().mean(2).expandDims(0).expandDims(-1).div(255.0)						
			pred = model.predict(step1)
			pred.print()
		}
		catch(err)
		{
			document.getElementById("pleasewait").innerHTML="Error occurred please try again later"
		}
		
		//At which index in tensor we get the largest value ?
		pred.data()
		    .then((data) => {console.log(data)
		    	output = document.getElementById("output_chart")
		    	output.innerHTML = ""
		    	max_val = -1
		    	max_val_index = -1
				for(let i=0;i<data.length;i++)
				{
					style_text = "width: "+data[i]*150+"px; height: 25px; position:relative; margin-top: 3.5vh; background-color: violet; "
					output.innerHTML+="<div style = '" +style_text+ "'></div>"
					if(data[i] > max_val)
					{
						max_val = data[i]
						max_val_index = i
					}
				}
				EMOTION_DETECTED = emotions[max_val_index]
				document.getElementById("pleasewait").style.display="None";
				document.getElementsByClassName("output_screen")[0].style.display="flex";
				document.getElementById("output_text").innerHTML=""
				document.getElementById("output_text").innerHTML = "<p>Emotions and corresponding scaled up probability</p><p>Emotion detected: " + EMOTION_DETECTED + "(" + (max_val*100).toFixed(2) + "% probability)</p>"
				window.scrollBy(0, 100)
				//Now display quotes depending on detected emotion
				fetch(URL_LIST[max_val_index])
				.then(response => response.json())
				.then((data) =>{
				innerHTMLtext = ""
				for(let i=0;i<data.length;i++)
				{
					if(data[i]["quote"].length<=200)
					{
						innerHTMLtext+="<div class='quotes_pane'><div class='quote'>"+data[i]["quote"]+"</div></div>"
					}
				}
				quotes_screen = document.getElementsByClassName("quotes_screen")[0]
				quotes_screen.innerHTML = innerHTMLtext
				quotes_screen.style.display = "flex"
				window.scrollBy(0, 100)

			}).catch(()=>{document.getElementById("pleasewait").innerHTML="Error occurred please try again later"})
		}).catch((err)=>{document.getElementById("pleasewait").innerHTML="Error occurred please try again later"})
	pred.dispose()

	}