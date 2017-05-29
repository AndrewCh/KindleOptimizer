/*The MIT License (MIT)

Copyright (c) 2013 Cosmin Cimpoi

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.*/

/*  Adjustments of this script made by 
    Copyright (c) 2017 Andrei Cheremskoy,
	https://GetToCode.com      */

(function () {

var w = null;
var kDoc = null;
var kObj = null;

/*if (typeof window.KindleReaderContextMenu !== 'undefined') {
    w = window;
} else if (window.length) {
    for (var i=0;i<window.length;i++) {
        if (typeof window[i].KindleReaderContextMenu !== 'undefined') {
            w = window[i];
            break;
        }
    }
}*/

w = window;

if (typeof w === 'object') {
    kObj = w.KindleReaderContextMenu;
    kDoc = w.document;
   // if (typeof kObj.ACRExtensions === 'undefined') {
        kObj.ACRExtensions = true;
        var oldMethod = kObj.show;
        kObj.show = function () {
            var res = oldMethod.apply(kObj, arguments);
            var txtDoc = null;
            var r = null;

            if (typeof (arguments[3]) !== 'undefined' && typeof (arguments[3]['start']) !== 'undefined') {
                var sId = arguments[3]['start'];
                var eId = arguments[3]['end'];

                $('iframe', kDoc).each(function (j, textIframe) {
                    var textIFrameDoc = $(textIframe).contents().get(0);
                    if ($('#'+sId, textIFrameDoc).get(0)) {
                        txtDoc = textIFrameDoc;
                        return false;
                    }
                });

                if (txtDoc) {
                    r = txtDoc.createRange();
                    r.setStartBefore($('#'+sId, txtDoc).get(0));
                    r.setEndAfter($('#'+eId, txtDoc).get(0));
                }
            }
			
	        $('#ACRExtensions_searchB_sep', kDoc).remove();
            $('#ACRExtensions_searchB', kDoc).remove();
            var sepEl = $('<div id="ACRExtensions_searchB_sep" class="kindle_menu_separator"></div>');
            var searchB = $('<div id="ACRExtensions_searchB" class="kindle_menu_button button_enabled ui-corner-left">Search</div>');
            $('#kindle_menu_border', kDoc).append(sepEl).append(searchB);
            setTimeout(function(){
                sepEl.show();
                searchB.removeClass('button_hidden');
            }, 1);
            $('#ACRExtensions_searchB', kDoc).click(function (evt) {
                if (r) {
				
					var content = r.cloneContents(); 
					var text = content.textContent;
					var url = 'https://www.google.com/?gfe_rd=cr&ei=ogkeWeD0NvTJXpeog4gK&gws_rd=cr&fg=1#q=';
                    var newTab = window.open(url + text, '_blank');
					newTab.focus();
                }
            });
			
			$('#ACRExtensions_translateB_sep', kDoc).remove();
            $('#ACRExtensions_translateB', kDoc).remove();
            var sepEl = $('<div id="ACRExtensions_translateB_sep" class="kindle_menu_separator"></div>');
            var translateB = $('<div id="ACRExtensions_translateB" class="kindle_menu_button button_enabled ui-corner-left">Translate</div>');
            $('#kindle_menu_border', kDoc).append(sepEl).append(translateB);
            setTimeout(function(){
                sepEl.show();
                translateB.removeClass('button_hidden');
            }, 1);
            $('#ACRExtensions_translateB', kDoc).click(function (evt) {
                if (r) {
				
					var content = r.cloneContents(); 
					var text = content.textContent;
					var url = 'https://translate.google.com/?hl=en#en/fr/';
                    var newTab = window.open(url + text, '_blank');
					newTab.focus();
                }
            });

  	    $('#ACRExtensions_copyB_sep', kDoc).remove();
            $('#ACRExtensions_copyB', kDoc).remove();
            var sepEl = $('<div id="ACRExtensions_copyB_sep" class="kindle_menu_separator"></div>');
            var copyB = $('<div id="ACRExtensions_copyB" class="kindle_menu_button button_enabled ui-corner-left">Copy</div>');
            $('#kindle_menu_border', kDoc).append(sepEl).append(copyB);
            setTimeout(function(){
                sepEl.show();
                copyB.removeClass('button_hidden');
            }, 1);
            $('#ACRExtensions_copyB', kDoc).click(function (evt) {
                if (r) {
                    var newW = window.open('', 'ACRExtensions', "height=400,width=400,location=0,menubar=0,scrollbars=1,toolbar=0");
                    newW.document.body.appendChild(r.cloneContents());
                }
            });

            return res;
        };

        //alert('Kindle Optimizer is now active.');
   /* } else {
        alert('Kindle Optimizer is already active.');
    }*/
} else {
    alert('Error: Kindle Optimizer is not active. The Amazon Cloud Reader window could not be found.');
}
})();
