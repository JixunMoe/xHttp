xHttp
=====

A browser cross-domain request plugin (UserScript)

To use this script in your website, you need to include SDK to your page:

```text
<script src="https://raw.githubusercontent.com/JixunMoe/xHttp/master/xHttp.SDK.min.js" defer async><script>
```

Then, in your script use `window.xHttp` as [GM_xmlhttpRequest](http://wiki.greasespot.net/GM_xmlhttpRequest).  
Please note, `onabort`, `onprogress`, `onreadystatechange` and `ontimeout` has not been implemented yet, don't use it.  
