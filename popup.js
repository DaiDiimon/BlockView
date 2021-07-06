document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("entered").focus();

    document.getElementById('unblock').onsubmit=function(){
        var link = "";
        var value = document.getElementById('entered').value;
		var parser = document.createElement('a');
        parser.href = value;

        var load = false;

        if(parser.hostname == "twitter.com"){
            var split = parser.pathname.split("/");

            if(split.length > 1 && (split[2] == "status")){
                load = true;
                link = parser.href;
            }
        }
        else if(parser.hostname == "www.youtube.com"){
            var split = parser.pathname.split("/");

            if(split.length > 1 && (split[1] == "watch")){
                load = true;
                link = parser.href;
            }
            
        }
        else if(parser.hostname == "www.reddit.com"){
            var split = parser.pathname.split("/");
            
            if(split.length > 5 && split[3] == "comments"){
                //check if its a post
                load = true;
                link = parser.href;
            }
            
        }
        
        if(load){
            chrome.extension.getBackgroundPage().skipCheck = true;
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.update(tabs[0].id, { url: link}); 
            });
            
        }
        window.close(); // Note: window.close(), not this.close()
    }
});

