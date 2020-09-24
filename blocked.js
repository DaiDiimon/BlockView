window.onload = async function(){
	document.getElementById("URL").innerHTML = await fetchURL();
}

async function fetchURL() {
    var p = new Promise(function(resolve){
        chrome.storage.local.get(function(data){
			resolve(data.url);
		});
    });

    return p;
}