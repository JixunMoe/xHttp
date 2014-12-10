(function (window) {
	if (!window.jx_xHost) return ;

	var namespace = 'xHttp_';
	var getTmpName = function () { return namespace + Math.random().toString().slice(2); };
	var nop = function () {};

	window.xHttp = function (reqObj) {
		var cbSuccess = reqObj.onload  || nop,
			cbFail    = reqObj.onerror || nop;

		var g_cbSuccess = getTmpName (),
			g_cbFail    = getTmpName ();

		reqObj.onload  = g_cbSuccess;
		reqObj.onerror = g_cbFail;

		var f_cleanup = function () {
			delete window[g_cbSuccess];
			delete window[g_cbFail];
		};

		window [g_cbSuccess] = function (r) {
			f_cleanup();
			cbSuccess(JSON.parse(r));
		};
		window [g_cbFail]    = function (r) {
			f_cleanup();
			cbFail(JSON.parse(r));
		};

		document.dispatchEvent(new CustomEvent('jx-xHost', {detail: JSON.stringify (reqObj)}));
	};
})(window);