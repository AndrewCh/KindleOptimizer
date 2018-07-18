chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if(request.action == "show") {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
			chrome.pageAction.show(tabs[0].id);
		});
	}
});

function replaceUrlParam(url, paramName, paramValue)
{
    if (paramValue == null) {
        paramValue = '';
    }
    var pattern = new RegExp('\\b('+paramName+'=).*?(&|$)');
    if (url.search(pattern)>=0) {
        return url.replace(pattern,'$1' + paramValue + '$2');
    }
    url = url.replace(/\?$/,'');
    return url + (url.indexOf('?')>0 ? '&' : '?') + paramName + '=' + paramValue;
}

var tagMap = {
    ".com": "doggozon-20",
	".co.uk": "doggozon-21",
	".de": "doggozon0a-21",
	".fr": "doggozon05-21",
	".es": "doggozon03-21",
	".it": "doggozon0d-21",
	".co.jp": "doggozon-22"
};

function getTag(url){
	for (var tld in tagMap) {
		if (tagMap.hasOwnProperty(tld)) {
			if (url.indexOf(tld) != -1){
				return tagMap[tld];
			}
		}
	}
	
	return tagMap[".com"];
}

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
		 if (details.url.indexOf("/dp/") != -1 || details.url.indexOf("/gp/") != -1){
			 return {
				 redirectUrl: replaceUrlParam(details.url, "tag", getTag(details.url))
			 }
		 }
		 
         return {
			 redirectUrl: details.url
	     };
    },
    {
        urls: [
			"*://amazon.com/*",
			"*://www.amazon.com/*",
			"*://smile.amazon.com/*",
			"*://amazon.co.uk/*",
			"*://www.amazon.co.uk/*",
			"*://smile.amazon.co.uk/*",	
			"*://amazon.de/*",
			"*://www.amazon.de/*",
			"*://smile.amazon.de/*",
			"*://amazon.fr/*",
			"*://www.amazon.fr/*",		
			"*://amazon.es/*",
			"*://www.amazon.es/*",
			"*://amazon.it/*",
			"*://www.amazon.it/*",	
			"*://amazon.co.jp/*",
			"*://www.amazon.co.jp/*" 
        ],
        types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
    },
    ["blocking"]
);



	
	

