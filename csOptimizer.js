chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if(request.action == "loadURL") {
	 console.log ('once');
			var url = 'http://gettocode.com';
			var newTab = window.open(url, '_blank');
			newTab.focus();
		}
});

chrome.runtime.sendMessage({action: "show"});

var s = document.createElement('script');
s.src = chrome.extension.getURL('script.js');
(document.head||document.documentElement).appendChild(s);
s.onload = function() {
    s.parentNode.removeChild(s);
};



