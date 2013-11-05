function pushMeasurement(measurements, onDoneListener)
{
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "https://quantimo.do/api/measurements", true);
	xhr.onreadystatechange = function() 
		{
			if (xhr.readyState == 4) 
			{
				onDoneListener(xhr.responseText);
			}
		};
	xhr.send(JSON.stringify(measurements));
}

function setIconBadge()
{
	var object = {text:"!"};
	chrome.browserAction.setBadgeText(object);
}

function setMoodButtonListeners()
{
	document.getElementById('buttonMoodDepressed').onclick=onMoodButtonClicked;
	document.getElementById('buttonMoodSad').onclick=onMoodButtonClicked;
	document.getElementById('buttonMoodOk').onclick=onMoodButtonClicked;
	document.getElementById('buttonMoodHappy').onclick=onMoodButtonClicked;
	document.getElementById('buttonMoodEcstatic').onclick=onMoodButtonClicked;
}

var onMoodButtonClicked = function()
{
	var buttonId = this.id;
	if(buttonId == "buttonMoodDepressed")
	{
		var moodValue = 1;
	}
	else if(buttonId == "buttonMoodSad")
	{
		var moodValue = 2;
	}
	else if(buttonId == "buttonMoodOk")
	{
		var moodValue = 3;
	}
	else if(buttonId == "buttonMoodHappy")
	{
		var moodValue = 4;
	}
	else if(buttonId == "buttonMoodEcstatic")
	{
		var moodValue = 5;
	}
	
	var measurement = 	[{
							source:		"MoodiModo",
							variable:	"Overall Mood",
							timestamp: 	Math.floor(Date.now() / 1000), 
							value: 		moodValue, 
							unit:		"/5"
						}];
	
	var sectionRateMood = document.getElementById("sectionRateMood");
	var sectionSendingMood = document.getElementById("sectionSendingMood");
	sectionRateMood.style.opacity = "0";
	sectionSendingMood.style.display = "block";
	sectionSendingMood.style.opacity = "1";
	sectionSendingMood.innerText = "Sending mood";
	pushMeasurement(measurement, function(response) 
		{
			sectionSendingMood.style.opacity = "0";
			setTimeout(function()
			{
				sectionSendingMood.style.opacity = "1";
				sectionSendingMood.innerText = "Done!";
			}, 300);
		});
}

document.addEventListener('DOMContentLoaded', function () 
{
	setMoodButtonListeners();
});