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

var tagMap = [
    [".com.au", "interior0016b-22"],  // Australia must be checked before US, because .com is a substring of .com.au
    [".com", "interior0d3-20"],
	[".co.uk", "interior02-21"],
	[".de", "interior065-21"],
	[".fr", "interior04-21"],
	[".es", "interior03-21"],
	[".ca", "interior04e-20"],
	[".in", "interior0b65-21"],
	[".it", "interior0b3-21"]
	// I don't think Japan will work
	// Brazil and Mexico will not accept US address
];

function getTag(url){
	for (var i=0; i < tagMap.length; i++){
		var values = tagMap[i];

		var tld = values[0];
		var tag = values[1];

		if (url.indexOf(tld) != -1){
			return tag;
		}
	}
	
	return "";
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
			"*://www.amazon.co.jp/*",
			"*://amazon.ca/*",
			"*://www.amazon.ca/*",
			"*://amazon.in/*",
			"*://www.amazon.in/*",
			"*://amazon.com.au/*",
			"*://www.amazon.com.au/*"
        ],
        types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
    },
    ["blocking"]
);



	
	

