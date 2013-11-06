chrome.runtime.onInstalled.addListener(function() 
{
	console.log("Installed");
	
	var alarmInfo = {periodInMinutes: 0.1}
	chrome.alarms.create("moodReportAlarm", alarmInfo)
	
	console.log("Alarm set");
});

chrome.alarms.onAlarm.addListener(function(alarm)
{
	var options = {
			type: "basic",
			title: "How are you?",
			message: "It's time to report your mood!",
			iconUrl: "images/icon.png",
			priority: 2
		}

	chrome.notifications.create("moodReportNotification", options, function(id){});
	
	var badgeParams = {text:"?"};
	chrome.browserAction.setBadgeText(badgeParams);
});

chrome.notifications.onClicked.addListener(function(notificationId)
{
	if(notificationId == "moodReportNotification")
	{
		var windowParams = {url: "popup.html", 
							type: 'panel',
							width: 346,
							height: 70,
							top: screen.height,
							left: screen.width
						   };
		chrome.windows.create(windowParams);
	}
});