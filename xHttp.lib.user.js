// ==UserScript==
// @name         My CrossDomain Request
// @namespace    org.jixun.xHost
// @run-at       document-start
// @version      1.0
// @description  Allow cross domain request from given domain.
// @author       Jixun
// @include      *
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// ==/UserScript==

unsafeWindow.jx_xHost = true;
var ask  = confirm.bind(null),
	host = location.hostname;

var wl = {
	add: function (host) {
		GM_setValue(host, '1');
	},
	rm: function (host) {
		GM_deleteValue(host);
	},
	check: function (host) {
		return GM_getValue(host) === '1';
	}
};

document.addEventListener ('jx-xHost', function (e) {
	var req = JSON.parse(e.detail);
	var success = req.onload,
		fail    = req.onerror;
	
	var isAllowed = wl.check(host);
	if (!isAllowed && !ask('是否允许 [' + host + '] 发出跨域请求?')) {
		if (unsafeWindow[fail]) unsafeWindow[fail](false);
		return ;
	}

	// Store for future usage.
	if (!isAllowed) wl.add (host);

	if (req.checkOnly) {
		unsafeWindow[success](true);
		return ;
	}

	req.onload = function (r) {
		unsafeWindow[success](JSON.stringify(r));
	};
	req.onerror = function (r) {
		unsafeWindow[fail](JSON.stringify(r));
	};

	if (req.hasOwnProperty('synchronous'))
		delete req.synchronous;

	GM_xmlhttpRequest (req);
});