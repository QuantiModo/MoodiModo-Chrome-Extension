chrome.runtime.onInstalled.addListener(function() 
{
	console.log("Installed");
	
	var notificationInterval = parseInt(localStorage["notificationInterval"] || "180");
	
	if(notificationInterval == -1)
	{
		chrome.alarms.clear("moodReportAlarm");
		console.log("Alarm cancelled");
	}
	else
	{
		var alarmInfo = {periodInMinutes: notificationInterval}
		chrome.alarms.create("moodReportAlarm", alarmInfo)
		console.log("Alarm set, every " + notificationInterval + " minutes");
	}
});

chrome.alarms.onAlarm.addListener(function(alarm)
{
	var showNotification = (localStorage["showNotification"] || "true") == "true" ? true : false;
	if(showNotification)
	{
		var notificationParams = {
			type: "basic",
			title: "How are you?",
			message: "It's time to report your mood!",
			iconUrl: "images/icon_full.png",
			priority: 2
		}
		chrome.notifications.create("moodReportNotification", notificationParams, function(id){});
	}
	
	var showBadge = (localStorage["showBadge"] || "true") == "true" ? true : false;
	if(showBadge)
	{
		var badgeParams = {text:"?"};
		chrome.browserAction.setBadgeText(badgeParams);
	}
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