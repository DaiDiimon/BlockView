var skipCheck = false;

var prevUrl = "";

chrome.tabs.onUpdated.addListener(function(tabId, changedInfo, tab) {
	var currentUrl = tab.url.replace(/^\/|\/$/g, '');

	if(prevUrl !== currentUrl && changedInfo.status == "loading"){
		console.log(prevUrl);
		console.log(currentUrl);
		// First loading update call
		checkPage(tabId, tab);
		prevUrl = currentUrl;
	}
});

function checkPage(tabId, tab){
	if(skipCheck){
		skipCheck = false;
	}
	else{
		var parser=document.createElement('a');
		parser.href=tab.url;
		if(parser.href == "chrome://extensions/"){
			chrome.tabs.remove(tabId);
			return;
		}
		if(parser.hostname == "www.youtube.com" || parser.hostname == "www.reddit.com" || parser.hostname == "twitter.com"){
			chrome.storage.local.set({"url": tab.url}, function(){
				chrome.tabs.update(tabId, {"url" : "blocked.html"});
			});
		}
	}
	
}