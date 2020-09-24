var allowed = false;

chrome.tabs.onUpdated.addListener(function(tabId, changedInfo, tab) {
	if(changedInfo.status == "complete"){
		if(allowed){
			allowed = false;
		}
	}
	else if(changedInfo.status == "loading"){
		if(!allowed){
			var parser=document.createElement('a');
			parser.href=tab.url;
			if(parser.hostname == "www.youtube.com" || parser.hostname == "www.reddit.com"){
				chrome.storage.local.set({"url": tab.url}, function(){
					chrome.tabs.update(tabId, {"url" : "blocked.html"});
				});
			}
		}
	}
});