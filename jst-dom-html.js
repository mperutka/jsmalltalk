/*
 * Copyright (c) 2012-2014 Michal Perutka <michal.perutka@gmail.com>
 * 
 * This file is part of JSmalltalk, an implementation of the Smalltalk language 
 * that runs on top of the JavaScript runtime.
 * 
 * JSmalltalk is free software: you can redistribute it and/or modify it under the terms 
 * of the GNU General Public License as published by the Free Software Foundation, 
 * either version 3 of the License, or (at your option) any later version.
 *
 * JSmalltalk is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; 
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with JSmalltalk. 
 * If not, see <http://www.gnu.org/licenses/>.
 * --------------------------------------------------------------------------------------
 *
 * DOM Core Level 3/4, Browser Objects, WebStorage, JSON
 * Depends on jst-core, jst-core-proxy, jst-parser, jst-kernel, jst-dom
 */

jst.currentJsFile = "jst-dom-html";

// *** CLASSES ***

//browser
jst.WrapperObject.subclass("Window", "url name config", "", "", "DOM-Browser");
jst.WrapperObject.subclass("Screen", "", "", "", "DOM-Browser");
jst.WrapperObject.subclass("Location", "", "", "", "DOM-Browser");
jst.WrapperObject.subclass("History", "", "", "", "DOM-Browser");
jst.WrapperObject.subclass("Browser", "", "", "", "DOM-Browser");

jst.Dictionary.subclass("WebStorage", "", "", "", "DOM-Browser");

// HTML
jst.Document.subclass("HTMLDocument", "", "", "", "DOM-HTML");

jst.DOMElement.subclass("HTMLElement", "", "", "", "DOM-HTML");

jst.HTMLElement.subclass("HTMLImageElement", "", "", "", "DOM-HTML");
jst.HTMLElement.subclass("HTMLCanvasElement", "type quality", "", "", "DOM-HTML");
jst.HTMLElement.subclass("HTMLAnchorElement", "", "", "", "DOM-HTML");
jst.HTMLElement.subclass("HTMLLinkElement", "", "", "", "DOM-HTML");
jst.HTMLElement.subclass("HTMLFormElement", "", "", "", "DOM-HTML");
jst.HTMLElement.subclass("HTMLBodyElement", "", "", "", "DOM-HTML");

jst.WrapperObject.subclass("CanvasRenderingContext2D", "", "", "", "DOM-HTML");

//utils
jst.DOMEventTarget.subclass("XMLHttpRequestEventTarget", "", "", "", "DOM-Util");

jst.XMLHttpRequestEventTarget.subclass("XMLHttpRequest", "method url async user password headerDict", "", "", "DOM-Util");

jst.Object.subclass("DelayedTask", "id call delay task", "", "", "DOM-Util");

jst.Object.subclass("Url", "scheme username password hostname port path parameters fragment", "", "", "DOM-Util");

jst.Object.subclass("Animation", "duration requestId startTime next animate", "", "", "DOM-Util");

jst.Dictionary.subclass("ConfigDict", "", "", "", "DOM-Util");

jst.WrapperObject.subclass("DynamicTable", "options elm", "", "", "DOM-Util");

// *** METHODS ***

//*** DelayedTask ***

jst.DelayedTask.addMethod("initialize", "", "initialization", function (){
	var self = this;
	this._call = function(){
		clearInterval(self._id);
		self._id = jst.nil;
		self._task.value();
	};
	return this;
},
	null, "2012-04-03T13:58:19Z", "mp");

jst.DelayedTask.addMethod("delay:", "millis", "accessing", 
	"\t\"Set the milliseconds to delay\"" +
	"\n\tself cancel." +
	"\n\tdelay := millis asMilliSeconds",
	null, "2012-12-10T22:14:38Z", "mp");

jst.DelayedTask.addMethod("task:", "aBlock", "accessing", 
	"\t\"Set the block to call.\"" +
	"\n\tself cancel." +
	"\n\ttask := aBlock",
	null, "2012-04-03T14:12:36Z", "mp");

jst.DelayedTask.addMethod("cancel", "", "running", function (){
	//Cancel the last queued timeout
	if (this._id != jst.nil) {
		clearInterval(this._id);
		this._id = jst.nil;
	};
	return this;
},
	null, "2012-04-03T14:13:00Z", "mp");

jst.DelayedTask.addMethod("run", "", "running", function (){
	//Cancels any pending timeout and queues a new one
	this.cancel();
	this._id = setInterval(this._call, this._delay);
	return this;
},
	null, "2012-04-03T14:13:35Z", "mp");

//DelayedTask extension
jst.BlockClosure.addMethod("delayed:", "millis", "*dom", 
	"\t^ DelayedTask new" +
	"\n\t\tdelay: millis;" +
	"\n\t\ttask: self;" +
	"\n\t\trun",
	null, "2012-12-10T22:02:54Z", "mp", 1);

jst.BlockClosure.addMethod("delayed:", "millis", "*dom", function (millis){
	window.setTimeout(this, millis);
	return this;
},
	null, "2013-11-28T14:42:48Z", "mp"); //jst-dom

// *** Url ***

jst.Url.addMethod("postCopy", "", "copying", 
	"\tscheme := scheme copy." +
	"\n\tusername := username copy." +
	"\n\tpassword := password copy." +
	"\n\thostname := hostname copy." +
	"\n\tport := port copy." +
	"\n\tpath := path copy." +
	"\n\tparameters := parameters copy." +
	"\n\tfragment := fragment copy",
	null, "2012-06-28T09:39:46Z", "mp");

jst.Url.addMethod("path", "", "accessing", 
	"\t^ path ifNil: [path := OrderedCollection new]",
	null, "2012-05-27T20:54:24Z", "mp");

jst.Url.addMethod("path:", "aCollection", "accessing", 
	"\tpath := aCollection",
	null, "2012-05-27T20:54:56Z", "mp");

jst.Url.addMethod("addToPath:", "aString", "adding", 
	"\tself path addAll: (aString findTokens: '/')",
	null, "2012-05-27T21:02:14Z", "mp");

jst.Url.addMethod("addParameter:value:", "keyString valueString", "adding", 
	"\tself parameters at: keyString put: valueString",
	null, "2012-05-27T21:02:58Z", "mp");

jst.Url.addMethod("initialize", "", "initialization", 
	"\tscheme := 'http'",
	null, "2012-05-27T21:03:22Z", "mp");

jst.Url.addMethod("parameters:", "aDictionary", "accessing", 
	"\tparameters := aDictionary",
	null, "2012-05-27T21:09:47Z", "mp");

jst.Url.addMethod("parameters", "", "accessing", 
	"\t^ parameters ifNil: [parameters := Dictionary new]",
	null, "2012-05-27T21:10:09Z", "mp");

jst.Url.addMethod("removeParameters", "", "private", 
	"\tparameters := nil",
	null, "2012-05-27T21:11:37Z", "mp");

jst.Url.addMethod("encodeServerOn:", "aStream", "encoding", 
	"\thostname ifNotNil: [" +
	"\n\t\taStream nextPutAll: scheme; nextPutAll: '://'." +
	"\n\t\tusername ifNotNil: [" +
	"\n\t\t\tself class encode: username on: aStream." +
	"\n\t\t\tpassword ifNotNil: [" +
	"\n\t\t\t\taStream nextPut: $:." +
	"\n\t\t\t\tself class encode: password on: aStream]." +
	"\n\t\t\taStream nextPut: $@ ]." +
	"\n\t\tself class encode: hostname on: aStream." +
	"\n\t\tport ifNotNil: [" +
	"\n\t\t\t(scheme = 'http' & (port = 80) or: [" +
	"\n\t\t\tscheme = 'https' & (port = 443)])" +
	"\n\t\t\t\tifFalse: [aStream nextPut: $:; print: port]" +
	"\n\t\t]" +
	"\n\t]",
	null, "2012-05-27T21:31:55Z", "mp");

jst.Url._class.addMethod("encode:on:", "aString aStream", "encoding", function (aString,aStream){
	aStream.nextPutAll_(encodeURIComponent(aString));
	return this;
},
	null, "2012-05-30T09:24:38Z", "mp");

jst.Url.addMethod("encodePathOn:", "aStream", "encoding", 
	"\tpath ifNotNil: [" +
	"\n\t\taStream nextPut: $/." +
	"\n\t\tpath " +
	"\n\t\t\tdo: [ :each | self class encode: each on: aStream] " +
	"\n\t\t\tseparatedBy: [aStream nextPut: $/]" +
	"\n\t]",
	null, "2012-05-27T21:34:45Z", "mp");

jst.Url.addMethod("encodeParametersOn:", "aStream", "encoding", 
	"\tparameters ifNotNil: [ | first |" +
	"\n\t\tfirst := true." +
	"\n\t\tparameters keysAndValuesDo: [:key :value |" +
	"\n\t\t\taStream nextPutAll: (first" +
	"\n\t\t\t\tifTrue: [first := false. '?']" +
	"\n\t\t\t\tifFalse: [ '&'])." +
	"\n\t\t\tself class encode: key on: aStream." +
	"\n\t\t\tvalue ifNotNil: [" +
	"\n\t\t\t\taStream nextPut: $=." +
	"\n\t\t\t\tself class encodeParameter: value on: aStream" +
	"\n\t\t\t]" +
	"\n\t\t]" +
	"\n\t]",
	null, "2012-06-13T17:43:45Z", "mp");

jst.Url._class.addMethod("encodeParameter:on:", "anObject aStream", "encoding", 
	"\tanObject isString ifTrue: [" +
	"\n\t\taStream nextPut: '\"'." +
	"\n\t\tself encode: anObject on: aStream." +
	"\n\t\taStream nextPut: '\"'" +
	"\n\t] ifFalse: [" +
	"\n\t\t(anObject class canUnderstand: #do:) ifTrue: [" +
	"\n\t\t\taStream nextPut: '['." +
	"\n\t\t\tanObject do: [:ea | self encodeParameter: ea on: aStream] " +
	"\n\t\t\t\tseparatedBy: [aStream nextPut: $,]." +
	"\n\t\t\taStream nextPut: ']'" +
	"\n\t\t] ifFalse: [" +
	"\n\t\t\tself encode: anObject on: aStream]" +
	"\n\t]",
	null, "2012-06-13T17:42:29Z", "mp", 1);

jst.Url._class.addMethod("encodeParameter:on:", "anObject aStream", "encoding", 
	"\tanObject isString ifTrue: [" +
	"\n\t\taStream " +
	"\n\t\t\tnextPut: '\"'; " +
	"\n\t\t\tnextPutAll: anObject; " +
	"\n\t\t\tnextPut: '\"'" +
	"\n\t] ifFalse: [" +
	"\n\t\t(anObject class canUnderstand: #do:) ifTrue: [" +
	"\n\t\t\taStream nextPut: '['." +
	"\n\t\t\tanObject do: [:ea | self encodeParameter: ea on: aStream] " +
	"\n\t\t\t\tseparatedBy: [aStream nextPut: $,]." +
	"\n\t\t\taStream nextPut: ']'" +
	"\n\t\t] ifFalse: [" +
	"\n\t\t\tself encode: anObject on: aStream]" +
	"\n\t]",
	null, "2013-06-29T21:15:32Z", "mp", 1);

jst.Url._class.addMethod("encodeParameter:on:", "anObject aStream", "encoding", 
	"\tself encode: anObject on: aStream",
	null, "2013-07-04T12:22:36Z", "mp");

jst.Url._class.addMethod("encodeParameter:", "anObject", "encoding", 
	"\t^ String streamContents: [:s | " +
	"\n\t\tself encodeParameter: anObject on: s]",
	null, "2013-07-04T13:30:42Z", "mp");

jst.Url.addMethod("encodeFragmentOn:", "aStream", "encoding", 
	"\tfragment ifNotNil: [" +
	"\n\t\taStream nextPut: $#." +
	"\n\t\tself class encode: fragment on: aStream" +
	"\n\t]",
	null, "2012-05-27T21:38:48Z", "mp");

jst.Url.addMethod("printOn:", "aStream", "printing", 
	"\tself encodeServerOn: aStream." +
	"\n\tself encodePathOn: aStream." +
	"\n\tself encodeParametersOn: aStream." +
	"\n\tself encodeFragmentOn: aStream",
	null, "2012-05-27T21:42:42Z", "mp");

jst.Url.addMethod("asJsObject", "", "converting", 
	"\t^ self printString",
	null, "2013-03-15T21:42:27Z", "mp");

jst.Url.addMethod("with:", "pathString", "copying", 
	"\t^ self copy" +
	"\n\t\taddToPath: pathString;" +
	"\n\t\tyourself",
	null, "2012-05-27T21:51:30Z", "mp");

jst.Url.addMethod("withParameter:value:", "aString valueString", "copying", 
	"\t^ self copy" +
	"\n\t\taddParameter: aString value: valueString;" +
	"\n\t\tyourself",
	null, "2012-05-27T21:52:10Z", "mp");

jst.Url.addMethod("withoutParameters", "", "copying", 
	"\t^self copy" +
	"\n\t\tremoveParameters;" +
	"\n\t\tyourself",
	null, "2012-05-27T21:52:24Z", "mp");

jst.Url.addMethod(",", "pathString", "copying", 
	"\t^ self with: pathString",
	null, "2012-05-28T22:00:36Z", "mp");

jst.Url.addMethod("hostname:", "aString", "accessing", 
	"\thostname := aString",
	null, "2012-05-29T06:23:55Z", "mp");

jst.Url.addMethod("hostname", "", "accessing", 
	"\t^ hostname",
	null, "2012-05-29T06:24:06Z", "mp");

jst.Url.addMethod("port:", "aNumber", "accessing", 
	"\tport := aNumber",
	null, "2012-05-29T06:25:00Z", "mp");

jst.Url.addMethod("port", "", "accessing", 
	"\t^ port",
	null, "2012-05-29T06:25:09Z", "mp");

jst.Url.addMethod("username:", "aString", "accessing", 
	"\tusername := aString",
	null, "2012-05-29T06:25:30Z", "mp");

jst.Url.addMethod("username", "", "accessing", 
	"\t^ username",
	null, "2012-05-29T06:25:37Z", "mp");

jst.Url.addMethod("password:", "aString", "accessing", 
	"\tpassword := aString",
	null, "2012-05-29T06:25:45Z", "mp");

jst.Url.addMethod("password", "", "accessing", 
	"\t^ password",
	null, "2012-05-29T06:25:53Z", "mp");

jst.Url.addMethod("scheme:", "aString", "accessing", 
	"\tscheme := aString",
	null, "2012-05-29T06:26:20Z", "mp");

jst.Url.addMethod("scheme", "", "accessing", 
	"\t^ scheme",
	null, "2012-05-29T06:26:29Z", "mp");

jst.Url.addMethod("fragment:", "aString", "accessing", 
	"\tfragment := aString",
	null, "2012-05-29T06:26:47Z", "mp");

jst.Url.addMethod("fragment", "", "accessing", 
	"\t^ fragment",
	null, "2012-05-29T06:26:54Z", "mp");

jst.Url.addMethod("resetPath", "", "initialization", 
	"\tpath := nil." +
	"\n\tfragment := nil",
	null, "2012-12-08T21:12:32Z", "mp");

jst.Url.addMethod("beSecure", "", "converting", 
	"\thostname ifNil: [" +
	"\n\t\thostname := Browser location hostname." +
	"\n\t\tport := Browser location port]." +
	"\n\tscheme := 'https'",
	null, "2012-12-09T16:49:11Z", "mp");

//*** XMLHttpRequestEventTarget ***

jst.XMLHttpRequestEventTarget.addMethod("onLoad:", "aBlock", "accessing", 
	"\t\"When the request has successfully completed.\"" +
	"\n\tobj at: #onload put: (DOMEventListener on: #load do: aBlock) callback",
	null, "2012-12-06T14:15:32Z", "mp");

jst.XMLHttpRequestEventTarget.addMethod("onLoadEnd:", "aBlock", "accessing", 
	"\t\"When the request has completed (either in success or failure).\"" +
	"\n\tobj at: #onloadend put: (DOMEventListener on: #loadend do: aBlock) callback",
	null, "2012-12-06T14:16:06Z", "mp");

jst.XMLHttpRequestEventTarget.addMethod("onLoadStart:", "aBlock", "accessing", 
	"\t\"When the request starts.\"" +
	"\n\tobj at: #onloadstart put: (DOMEventListener on: #loadstart do: aBlock) callback",
	null, "2012-12-06T14:14:15Z", "mp");

jst.XMLHttpRequestEventTarget.addMethod("onProgress:", "aBlock", "accessing", 
	"\t\"While sending and loading data.\"" +
	"\n\tobj at: #onprogress put: (DOMEventListener on: #progress do: aBlock) callback",
	null, "2012-12-06T14:14:34Z", "mp");

jst.XMLHttpRequestEventTarget.addMethod("onAbort:", "aBlock", "accessing", 
	"\t\"When the request has been aborted. For instance, by invoking the #abort method.\"" +
	"\n\tobj at: #onabort put: (DOMEventListener on: #abort do: aBlock) callback",
	null, "2012-12-06T14:15:03Z", "mp");

jst.XMLHttpRequestEventTarget.addMethod("onError:", "aBlock", "accessing", 
	"\t\"When the request has failed.\"" +
	"\n\tobj at: #onerror put: (DOMEventListener on: #error do: aBlock) callback",
	null, "2012-12-06T14:15:18Z", "mp");

jst.XMLHttpRequestEventTarget.addMethod("onTimeout:", "aBlock", "accessing", 
	"\t\"When the author specified timeout has passed before the request could complete.\"" +
	"\n\tobj at: #ontimeout put: (DOMEventListener on: #timeout do: aBlock) callback",
	null, "2012-12-06T14:15:49Z", "mp");

// *** XMLHttpRequest ***

jst.XMLHttpRequest.addMethod("initialize", "", "initialization", 
	"\tasync := false." +
	"\n\tself resetHeader." +
	"\n\tself wrap: self createJsObject",
	null, "2012-11-23T09:31:46Z", "mp");

jst.XMLHttpRequest.addMethod("resetHeader", "", "initialization", 
	"\theaderDict := Dictionary new",
	null, "2012-11-23T09:31:30Z", "mp");
/*
jst.XMLHttpRequest.addMethod("asJsObject", "", "converting", function (){
	if (this._obj == jst.nil)
		this.wrap_(new XMLHttpRequest());
	return this._obj;
},
	null, "2012-11-22T21:26:33Z", "mp");
*/
jst.XMLHttpRequest.addMethod("createJsObject", "", "private", function (){
	return new XMLHttpRequest();
},
	null, "2012-11-23T09:23:06Z", "mp");

jst.XMLHttpRequest.addMethod("url", "", "accessing", 
	"\t^ url",
	null, "2012-12-19T11:04:14Z", "mp");

jst.XMLHttpRequest.addMethod("url:", "anUrl", "accessing", 
	"\turl := anUrl",
	null, "2012-11-22T21:49:41Z", "mp");

jst.XMLHttpRequest.addMethod("method:", "aString", "accessing", 
	"\tmethod := aString",
	null, "2012-11-22T22:17:33Z", "mp");

jst.XMLHttpRequest.addMethod("user:", "aString", "accessing", 
	"\tuser := aString",
	null, "2012-12-05T10:44:23Z", "mp");

jst.XMLHttpRequest.addMethod("password:", "aString", "accessing", 
	"\tpassword := aString",
	null, "2012-12-05T10:44:54Z", "mp");

jst.XMLHttpRequest.addMethod("readyState", "", "accessing", 
	"\t^ obj at: 'readyState'",
	null, "2012-12-05T10:08:12Z", "mp");

jst.XMLHttpRequest.addMethod("isOpened", "", "testing", 
	"\t^ self readyState = 1",
	null, "2012-12-05T10:09:25Z", "mp");

jst.XMLHttpRequest.addMethod("async:", "aBoolean", "accessing", 
	"\tasync := aBoolean",
	null, "2013-04-21T20:46:10Z", "mp");

jst.XMLHttpRequest.addMethod("async", "", "accessing", 
	"\t^ async",
	null, "2013-04-21T21:25:47Z", "mp");

/*
jst.XMLHttpRequest.addMethod("withCredentials:", "aBoolean", "request", 
	"\t\"True when user credentials are to be included in a cross-origin request. " +
	"\n\tFalse when they are to be excluded in a cross-origin request and when cookies are to be ignored in its response. " +
	"\n\tInitially false.\"" +
	"\n\tobj at: #withCredentials put: aBoolean",
	null, "2012-12-05T10:15:34Z", "mp");
*/
jst.XMLHttpRequest.addMethod("withCredentials:", "aBoolean", "request", 
	"\t\"True when user credentials are to be included in a cross-origin request. False when they are" +
	"\n\tto be excluded in a cross-origin request and when cookies are to be ignored in its response. " +
	"\n\tInitially false." +
	"\n\tNote: Starting with Gecko 11.0 (Firefox 11.0 / Thunderbird 11.0 / SeaMonkey 2.8), Gecko no longer " +
	"\n\tlets you use the withCredentials attribute when performing synchronous requests.\"" +
	"\n\t(obj at: #withCredentials) = aBoolean ifFalse: [" +
	"\n\t\tobj at: #withCredentials put: aBoolean]",
	null, "2013-04-16T13:01:40Z", "mp");

jst.XMLHttpRequest.addMethod("headerAt:put:", "key value", "accessing", 
	"\theaderDict at: key put: value." +
	"\n\tself isOpened ifTrue: [" +
	"\n\t\tobj perform: #setRequestHeader with: key with: value]",
	null, "2012-12-05T10:11:07Z", "mp");

jst.XMLHttpRequest.addMethod("removeHeader:", "key", "accessing", 
	"\theaderDict removeKey: key",
	null, "2014-03-21T11:14:14Z", "mp");

jst.XMLHttpRequest.addMethod("responseHeaders", "", "response", 
	"\t\"Returns all headers from the response, with the exception of those whose field name is Set-Cookie or Set-Cookie2.\"" +
	"\n\t^ ((obj perform: 'getAllResponseHeaders') findTokens: String crlf) " +
	"\n\t\tinject: Dictionary new" +
	"\n\t\tinto: [:dict :ea | | key |" +
	"\n\t\t\tkey := ea copyUpTo: $:." +
	"\n\t\t\tdict at: key put: (ea allButFirst: key size+2); " +
	"\n\t\t\t\tyourself]",
	null, "2012-12-05T10:32:27Z", "mp");

jst.XMLHttpRequest.addMethod("responseHeaderNamed:", "name", "response", 
	"\t^ obj perform: #getResponseHeader with: name",
	null, "2012-12-05T10:33:56Z", "mp");

/*
jst.XMLHttpRequest.addMethod("open", "", "request", 
	"\tobj := nil." +
	"\n\tuser " +
	"\n\t\tifNil: [self asJsObject perform: #open with: method with: url asString with: async]" +
	"\n\t\tifNotNil: [self asJsObject perform: #open withArguments: {method. url asString. async. user. password}]." +
	"\n\theaderDict isEmpty ifFalse: [" +
	"\n\t\theaderDict pairsDo: [:key :val |" +
	"\n\t\t\tobj perform: #setRequestHeader with: key with: val]." +
	"\n\t\theaderDict := Dictionary new].",
	null, "2012-11-22T22:34:21Z", "mp");
 */

jst.XMLHttpRequest.addMethod("open", "", "request", 
	"\tuser " +
	"\n\t\tifNil: [obj perform: #open with: method with: url asString with: async]" +
	"\n\t\tifNotNil: [obj perform: #open withArguments: {method. url asString. async. user. password}]." +
	"\n\tself withCredentials: user notNil." +
	"\n\theaderDict isEmpty ifFalse: [" +
	"\n\t\theaderDict pairsDo: [:key :val |" +
	"\n\t\t\tobj perform: #setRequestHeader with: key with: val]]",
	null, "2012-12-05T10:50:04Z", "mp");

/*
jst.XMLHttpRequest.addMethod("fixIEEvent:", "type", "private", 
	"\t(Browser navigator isIE7 | Browser navigator isIE8 and: [(obj at: 'on', type) notNil]) ifTrue: [" +
	"\n\t\t(obj at: 'on', type) value: (DOMProgressEvent new type: type; target: self; asJsObject)]." +
	"\n\t\"Browser navigator isIE9 ifTrue: [" +
	"\n\t\tself dispatchEvent: (DOMProgressEvent new type: type)]\"",
	null, "2012-12-18T22:06:47Z", "mp");
*/
jst.XMLHttpRequest.addMethod("fixIEEvent:", "type", "private", 
	"\t(async not and: [Browser navigator isIE7 | Browser navigator isIE8] and: [(obj at: 'on', type) notNil]) ifTrue: [" +
	"\n\t\t(obj at: 'on', type) value: (DOMProgressEvent new type: type; target: self; asJsObject)]." +
	"\n\t\"Browser navigator isIE9 ifTrue: [" +
	"\n\t\tself dispatchEvent: (DOMProgressEvent new type: type)]\"",
	null, "2013-04-21T20:44:47Z", "mp");

jst.XMLHttpRequest.addMethod("send", "", "request", 
	"\tobj perform: #send." +
	"\n\tself fixIEEvent: #load",
	null, "2012-12-18T20:03:41Z", "mp");

jst.XMLHttpRequest.addMethod("sendData:", "anObject", "request", 
	"\tobj perform: #send with: anObject asJsObject." +
	"\n\tself fixIEEvent: #load",
	null, "2012-12-18T20:03:55Z", "mp");

jst.XMLHttpRequest.addMethod("sendFormData:", "anObject", "request", 
	"\t| data |" +
	"\n\tdata := String streamContents: [:s | | first |" +
	"\n\t\tfirst := true." +
	"\n\t\tanObject pairsDo: [:key :value |" +
	"\n\t\t\tfirst ifTrue: [first := false] ifFalse: [s nextPut: $&]." +
	"\n\t\t\ts nextPutAll: key asString; " +
	"\n\t\t\t\tnextPut: $=; " +
	"\n\t\t\t\tnextPutAll: value asString]]." +
	"\n\theaderDict at: 'Content-type' ifAbsent: [" +
	"\n\t\tself headerAt: 'Content-type' put: 'application/x-www-form-urlencoded']." +
	"\n\tobj perform: #send with: data." +
	"\n\theaderDict removeKey: 'Content-type'." +
	"\n\tself fixIEEvent: #load",
	null, "2012-12-18T20:04:07Z", "mp", 1);

jst.XMLHttpRequest.addMethod("sendFormData:", "anObject", "request", 
	"\t| data |" +
	"\n\tdata := String streamContents: [:s | | first |" +
	"\n\t\tfirst := true." +
	"\n\t\tanObject pairsDo: [:key :value |" +
	"\n\t\t\tfirst ifTrue: [first := false] ifFalse: [s nextPut: $&]." +
	"\n\t\t\ts nextPutAll: key asString; " +
	"\n\t\t\t\tnextPut: $=; " +
	"\n\t\t\t\tnextPutAll: value asString]]." +
	"\n\theaderDict at: 'Content-type' ifAbsent: [" +
	"\n\t\tself headerAt: 'Content-type' put: 'application/x-www-form-urlencoded; charset=utf-8']." +
	"\n\tobj perform: #send with: data." +
	"\n\theaderDict removeKey: 'Content-type'." +
	"\n\tself fixIEEvent: #load",
	null, "2013-11-22T14:27:05Z", "mp");

jst.XMLHttpRequest.addMethod("get:", "anUrl", "response", 
	"\tmethod := 'GET'." +
	"\n\turl := anUrl." +
	"\n\t^ self open; " +
	"\n\t\tsend; " +
	"\n\t\tresponse",
	null, "2012-11-22T22:37:16Z", "mp");

jst.XMLHttpRequest.addMethod("response", "", "response", 
	"\t^ obj at: #response",
	null, "2012-11-22T22:37:51Z", "mp");

jst.XMLHttpRequest.addMethod("responseText", "", "response", 
	"\t^ obj at: #responseText",
	null, "2012-11-27T08:36:18Z", "mp");

jst.XMLHttpRequest.addMethod("status", "", "accessing", 
	"\t^ obj at: 'status'",
	null, "2013-04-11T14:45:48Z", "mp");

jst.XMLHttpRequest.addMethod("abort", "", "processing", 
	"\t\"Cancels any network activity.\"" +
	"\n\tobj perform: #abort",
	null, "2013-06-10T21:46:15Z", "mp");

// *** Window ***

jst.Window.addMethod("at:", "key", "accessing", function (key) {
	return this._obj[key];
},
	null, "2012-11-02T10:55:04Z", "mp");
/*
jst.Window.addMethod("navigator", "", "browser objects", 
	"\t^ Browser wrap: obj navigator",
	null, "2012-03-25T07:40:30Z", "mp");

jst.Window.addMethod("screen", "", "browser objects", 
	"\t^ Screen wrap: obj screen",
	null, "2012-03-25T20:49:44Z", "mp");
*/

jst.Window.addMethod("initialize", "", "initialization", 
	"\turl := ''." +
	"\n\tname := ''." +
	"\n\tconfig := Dictionary new",
	null, "2012-11-02T14:19:11Z", "mp");

jst.Window.addMethod("name", "", "accessing", 
	"\t^ obj " +
	"\n\t\tifNotNil: [obj at: #name]" +
	"\n\t\tifNil: name",
	null, "2012-11-02T14:19:59Z", "mp");

jst.Window.addMethod("name:", "aString", "config", 
	"\t\"Optional. Specifies the target attribute or the name of the window. The following values are supported:" +
	"\n\t\t_blank - URL is loaded into a new window. This is default" +
	"\n\t\t_parent - URL is loaded into the parent frame" +
	"\n\t\t_self - URL replaces the current page" +
	"\n\t\t_top - URL replaces any framesets that may be loaded\"" +
	"\n\tname := aString",
	null, "2012-11-02T14:26:44Z", "mp");

jst.Window.addMethod("document", "", "browser objects", 
	"\t^ Document wrap: (obj at: #document)",
	null, "2012-11-02T07:30:23Z", "mp", 1);

jst.Window.addMethod("document", "", "browser objects", 
	"\t^ HTMLDocument wrap: (obj at: #document)",
	null, "2014-01-02T22:34:00Z", "mp"); //jst-dom

jst.Window.addMethod("location", "", "browser objects", 
	"\t^ Location wrap: obj location",
	null, "2012-03-25T20:22:56Z", "mp");

jst.Window.addMethod("history", "", "browser objects", 
	"\t^ History wrap: obj history",
	null, "2012-03-25T20:24:41Z", "mp");

jst.Window.addMethod("url", "", "accessing", 
	"\t^ obj " +
	"\n\t\tifNotNil: [self location href]" +
	"\n\t\tifNil: url",
	null, "2012-11-02T14:16:45Z", "mp");

jst.Window.addMethod("url:", "anUrl", "config", 
	"\t\"Optional. Specifies the URL of the page to open. If no URL is specified, a new window with about:blank is opened.\"" +
	"\n\turl := anUrl asString",
	null, "2012-11-02T14:44:16Z", "mp");

jst.Window.addMethod("config", "", "accessing", 
	"\t| convert |" +
	"\n\tconvert := [:val | val class == Boolean " +
	"\n\t\tifTrue: [val == false ifTrue: '0' ifFalse: '1'] " +
	"\n\t\tifFalse: [val asString]]." +
	"\n\t^ String streamContents: [:s | config keys " +
	"\n\t\tdo: [:key | s nextPutAll: key; " +
	"\n\t\t\tnextPut: $=; " +
	"\n\t\t\tnextPutAll: (convert value: (config at: key))] " +
	"\n\t\tseparatedBy: [s nextPut: $,]]",
	null, "2012-11-02T15:12:52Z", "mp");
/*
jst.Window.addMethod("replaceHistory:", "aBoolean", "accessing", 
	"\t\"Optional. Specifies whether the URL creates a new entry or replaces the current entry in the history list. " +
	"\n\tThe following values are supported:" +
	"\n\t\ttrue - URL replaces the current document in the history list" +
	"\n\t\tfalse - URL creates a new entry in the history list\"" +
	"\n\treplace := aBoolean",
	null, "2012-11-02T14:25:18Z", "mp");
*/
jst.Window.addMethod("open", "", "browser windows", 
	"\t\"Opens a new browser window. If no URL is specified, a new window with about:blank is opened.\"" +
	"\n\tself isClosed ifTrue: [" +
	"\n\t\tobj := nil]." +
	"\n\tobj ifNotNil: [" +
	"\n\t\tself error: 'A window has been already opened.']." +
	"\n\tself wrap: (Browser window asJsObject perform: #open withArguments: { self url. self name. self config})",
	null, "2012-11-02T22:26:48Z", "mp");

jst.Window.addMethod("close", "", "browser windows", 
	"\t\"Closes the current window\"" +
	"\n\tobj perform: #close",
	null, "2012-11-02T22:32:04Z", "mp");

jst.Window.addMethod("isClosed", "", "testing", 
	"\t\"Returns a Boolean value indicating whether a window has been closed or not.\"" +
	"\n\t^ obj notNil and: [obj at: #closed ifAbsent: false]",
	null, "2012-11-02T22:22:19Z", "mp");

jst.Window.addMethod("height:", "aNumber", "config", 
	"\t\"The height of the window. Min. value is 100\"" +
	"\n\tconfig at: #height put: aNumber",
	null, "2012-11-02T14:49:41Z", "mp");

jst.Window.addMethod("width:", "aNumber", "config", 
	"\t\"The width of the window. Min. value is 100\"" +
	"\n\tconfig at: #width put: aNumber",
	null, "2012-11-02T14:49:54Z", "mp");

jst.Window.addMethod("left:", "aNumber", "config", 
	"\t\"The left position of the window\"" +
	"\n\tconfig at: #left put: aNumber",
	null, "2012-11-02T21:57:36Z", "mp");

jst.Window.addMethod("top:", "aNumber", "config", 
	"\t\"The top position of the window\"" +
	"\n\tconfig at: #top put: aNumber",
	null, "2012-11-02T21:57:48Z", "mp");

jst.Window.addMethod("location:", "aBoolean", "config", 
	"\t\"Whether or not to display the address field. Default is yes\"" +
	"\n\tconfig at: #location put: aBoolean",
	null, "2012-11-02T15:13:01Z", "mp");

jst.Window.addMethod("resizable:", "aBoolean", "config", 
	"\t\"Whether or not the window is resizable. Default is yes\"" +
	"\n\tconfig at: #resizable put: aBoolean",
	null, "2012-11-02T15:13:44Z", "mp");

jst.Window.addMethod("scrollbars:", "aBoolean", "config", 
	"\t\"Whether or not to display scroll bars. Default is yes\"" +
	"\n\tconfig at: #scrollbars put: aBoolean",
	null, "2012-11-02T21:54:57Z", "mp");

jst.Window.addMethod("alert:", "aString", "util", 
	"\t\"standard JS alert function\"" +
	"\n\tobj perform: #alert with: aString",
	null, "2012-12-19T09:23:17Z", "mp");

jst.Window.addMethod("position", "", "accessing", 
	"\t^ Point x: self x y: self y",
	null, "2013-05-10T08:43:50Z", "mp");

jst.Window.addMethod("x", "", "accessing", 
	"\t^ (obj at: #screenX) ifNil: [obj at: #screenLeft]",
	null, "2013-05-10T08:43:14Z", "mp");

jst.Window.addMethod("y", "", "accessing", 
	"\t^ (obj at: #screenY) ifNil: [obj at: #screenTop]",
	null, "2013-05-10T08:43:34Z", "mp");

jst.Window.addMethod("height", "", "accessing", 
	"\t\"Returns the outer height of a window, including toolbars/scrollbars. Not supported in IE8 and earlier.\"" +
	"\n\t^ obj at: #outerHeight",
	null, "2013-05-10T10:52:01Z", "mp");

jst.Window.addMethod("width", "", "accessing", 
	"\t\"Returns the outer width of a window, including toolbars/scrollbars. Not supported in IE8 and earlier.\"" +
	"\n\t^ obj at: #outerWidth ifAbsent: 0",
	null, "2013-05-10T10:52:16Z", "mp");

jst.Window.addMethod("pageHeight", "", "accessing", 
	"\t\"Returns the inner height of a window's content area. Not supported in IE8 and earlier.\"" +
	"\n\t^ obj at: #innerHeight ifAbsent: 0",
	null, "2013-05-10T10:52:06Z", "mp");

jst.Window.addMethod("pageWidth", "", "accessing", 
	"\t\"Returns the inner width of a window's content area. Not supported in IE8 and earlier.\"" +
	"\n\t^ obj at: #innerWidth ifAbsent: 0",
	null, "2013-05-10T10:52:10Z", "mp");

jst.Window.addMethod("print", "", "util", 
	"\t\"The method opens the Print Dialog Box, which lets the user to select preferred printing options.\"" +
	"\n\tobj perform: #print",
	null, "2014-05-12T14:19:47Z", "mp");

// *** Browser ***

jst.Browser._class.addMethod("window", "", "accessing", function (){
	return jst.Window.wrap_(window);
},
	null, "2012-11-02T10:40:03Z", "mp");

jst.Browser._class.addMethod("navigator", "", "accessing", function (){
	return this.wrap_(window.navigator);
},
	null, "2012-11-02T11:29:16Z", "mp");

jst.Browser._class.addMethod("screen", "", "accessing", function (){
	return jst.Screen.wrap_(window.screen);
},
	null, "2012-11-02T11:31:03Z", "mp");

jst.Browser._class.addMethod("location", "", "accessing", 
	"\t^ self window location",
	null, "2012-12-08T21:43:18Z", "mp");

jst.Browser._class.addMethod("document", "", "accessing", 
	"\t^ self window document",
	null, "2014-01-03T08:38:59Z", "mp");

jst.Browser.addMethod("userAgent", "", "accessing", 
	"\t^ obj at: #userAgent",
	null, "2012-04-30T11:54:40Z", "mp");

jst.Browser.addMethod("isWebKit", "", "testing", 
	"\t^ self userAgent includesSubString: 'webkit' caseSensitive: false",
	null, "2012-04-30T11:59:19Z", "mp");

jst.Browser.addMethod("isChrome", "", "testing", 
	"\t^ self userAgent includesSubString: '\\bchrome\\b' caseSensitive: false",
	null, "2012-04-30T12:04:46Z", "mp", 1);

jst.Browser.addMethod("isChrome", "", "testing", 
	"\t^ self userAgent includesSubString: 'chrome' caseSensitive: false",
	null, "2014-01-05T16:03:03Z", "mp"); //jst-dom

jst.Browser.addMethod("isIE", "", "testing", 
	"\t^ self userAgent includesSubString: 'MSIE'",
	null, "2012-12-18T19:07:13Z", "mp");

jst.Browser.addMethod("isIE7", "", "testing", 
	"\t^ self userAgent includesSubString: 'MSIE 7'",
	null, "2012-12-18T19:07:22Z", "mp");

jst.Browser.addMethod("isIE8", "", "testing", 
	"\t^ self userAgent includesSubString: 'MSIE 8'",
	null, "2012-12-18T19:07:33Z", "mp");

jst.Browser.addMethod("isIE9", "", "testing", 
	"\t^ self userAgent includesSubString: 'MSIE 9'",
	null, "2012-12-18T19:09:38Z", "mp");

// *** Screen ***

jst.Screen.addMethod("width", "", "accessing", 
	"\t^ obj at: #width",
	null, "2013-02-20T17:40:48Z", "mp");

jst.Screen.addMethod("height", "", "accessing", 
	"\t^ obj at: #height",
	null, "2013-02-20T17:41:22Z", "mp");

// *** Location ***

jst.Location.addMethod("protocol", "", "accessing", 
	"\t\"Returns the protocol of the current URL, including the first colon (:).\"" +
	"\n\t^ obj at: #protocol",
	null, "2012-11-01T13:38:00Z", "mp");

jst.Location.addMethod("port", "", "accessing", 
	"\t\"Returns the port number the server uses for a URL.\"" +
	"\n\t^ (obj at: #port) ifNotEmptyDo: [:p | p asNumber]",
	null, "2012-11-01T13:37:30Z", "mp");

jst.Location.addMethod("href", "", "accessing", 
	"\t\"Returns the entire URL of the current page.\"\t" +
	"\n\t^ obj at: #href",
	null, "2012-11-01T13:36:17Z", "mp");

jst.Location.addMethod("asUrl", "", "converting", 
	"\t| url |" +
	"\n\turl := Url new" +
	"\n\t\tscheme: self scheme;" +
	"\n\t\thostname: self hostname;" +
	"\n\t\tport: self port;" +
	"\n\t\tfragment: self fragment;" +
	"\n\t\taddToPath: self pathname." +
	"\n\t(self search findTokens: '?=&') pairsDo: [:k :v |" +
	"\n\t\turl addParameter: k value: v]." +
	"\n\t^ url",
	null, "2012-11-01T13:33:15Z", "mp");

jst.Location.addMethod("search", "", "accessing", 
	"\t\"Returns the query portion of a URL, including the question mark (?).\"" +
	"\n\t^ obj at: #search",
	null, "2012-11-01T13:38:32Z", "mp");

jst.Location.addMethod("scheme", "", "accessing", 
	"\t^ self protocol allButLast",
	null, "2012-11-01T13:29:59Z", "mp");

jst.Location.addMethod("hash", "", "accessing", 
	"\t\"Returns the anchor portion of a URL, including the hash sign (#).\"" +
	"\n\t^ obj at: #hash",
	null, "2012-11-01T13:32:32Z", "mp");

jst.Location.addMethod("hostname", "", "accessing", 
	"\t^ obj at: #hostname",
	null, "2012-11-01T13:33:24Z", "mp");

jst.Location.addMethod("pathname", "", "accessing", 
	"\t^ obj at: #pathname",
	null, "2012-11-01T13:33:37Z", "mp");

jst.Location.addMethod("fragment", "", "accessing", 
	"\t^ self hash allButFirst",
	null, "2012-11-01T13:35:41Z", "mp");

jst.Location.addMethod("host", "", "accessing", 
	"\t\"Returns the hostname and port of a URL.\"" +
	"\n\t^ obj at: #host",
	null, "2012-11-01T14:09:39Z", "mp");

jst.Location.addMethod("isPublic", "", "testing", 
	"\t^ self pathname includesSubString: 'public' caseSensitive: false",
	null, "2014-01-14T21:20:33Z", "mp");

jst.Location.addMethod("assignUrl:", "anUrl", "navigation", 
	"\t\"The method loads a new document. The difference between this method and #replaceUrl, " +
	"\n\tis that #replaceUrl removes the URL of the current document from the document history, " +
	"\n\tmeaning that it is not possible to use the back button to navigate back to the original document.\"" +
	"\n\tobj perform: 'assign' with: anUrl asString",
	null, "2014-02-14T12:39:31Z", "mp");

jst.Location.addMethod("replaceUrl:", "anUrl", "navigation", 
	"\t\"The method replaces the current document with a new one. The difference between this method and #assignUrl, " +
	"\n\tis that #replaceUrl removes the URL of the current document from the document history, " +
	"\n\tmeaning that it is not possible to use the back button to navigate back to the original document.\"" +
	"\n\tobj perform: 'replace' with: anUrl asString",
	null, "2014-02-14T12:40:44Z", "mp");

jst.Location.addMethod("reload", "", "navigation", 
	"\t\"The method is used to reload the current document. It does the same as the reload button in your browser.\"" +
	"\n\tobj perform: #reload",
	null, "2014-02-14T12:42:30Z", "mp");

jst.Location.addMethod("reloadFromServer", "", "navigation", 
	"\t\"The method forces the reload to get the page from server, not from the cache.\"" +
	"\n\tobj perform: #reload with: true",
	null, "2014-02-14T12:45:27Z", "mp");


// *** HTMLDocument ***

jst.HTMLDocument._class.addMethod("initialize", "", "class initialization", 
	"\tself current",
	null, "2014-04-26T20:41:17Z", "mp");

jst.initializeClass(jst.HTMLDocument);

jst.HTMLDocument.addMethod("body", "", "accessing", 
	"\t^ HTMLElement wrap: (obj at: 'body')",
	null, "2014-01-03T09:37:02Z", "mp", 1);

jst.HTMLDocument.addMethod("body", "", "accessing", 
	"\t^ HTMLElement on: (obj at: 'body')",
	null, "2014-02-11T08:22:18Z", "mp"); //jst-dom

jst.HTMLDocument.addMethod("elementById:", "aString", "accessing", 
	"\t| elm |" +
	"\n\t^ nil = (elm := obj perform: #getElementById with: aString) ifFalse: [" +
	"\n\t\tHTMLElement wrap: elm]",
	null, "2014-01-03T09:42:32Z", "mp", 1);

jst.HTMLDocument.addMethod("elementById:", "aString", "accessing", 
	"\t| elm |" +
	"\n\t^ nil = (elm := obj perform: #getElementById with: aString) ifFalse: [" +
	"\n\t\tHTMLElement on: elm]",
	null, "2014-02-11T08:24:53Z", "mp"); //jst-dom

jst.HTMLDocument.addMethod("title", "", "accessing", 
	"\t^ obj at: #title",
	null, "2014-01-03T09:43:10Z", "mp");

jst.HTMLDocument.addMethod("title:", "aString", "accessing", 
	"\tobj at: #title put: aString",
	null, "2014-01-03T09:43:22Z", "mp");

jst.HTMLDocument.addMethod("head", "", "accessing", 
	"\t^ HTMLElement wrap: (obj at: 'head')",
	null, "2014-01-03T09:43:39Z", "mp", 1);

jst.HTMLDocument.addMethod("head", "", "accessing", 
	"\t^ HTMLElement on: (obj at: 'head')",
	null, "2014-02-11T08:25:02Z", "mp"); //jst-dom

//*** HTMLElement ***

jst.HTMLElement._class.addMethod("tag", "", "accessing", 
	"\t^ (self name copyFrom: 5 to: self name size - 7) asLowercase",
	null, "2013-06-18T14:10:37Z", "mp");

jst.HTMLElement._class.addMethod("on:", "jsNode", "instance creation", 
	function (jsNode){
	return this.allSubclasses().detect_ifNone_(
		function(cls){return cls.tag() == jsNode.tagName.asLowercase();}, this).wrap_(jsNode);
},
	null, "2013-06-18T14:09:00Z", "mp");

jst.HTMLElement._class.addMethod("new", "", "instance creation", function (){
	return this.wrap_(window.document.createElement(this.tag()));
},
	 "_new", "2013-06-18T14:14:36Z", "mp");

// *** HTMLLinkElement ***

jst.HTMLLinkElement._class.addMethod("tag", "", "accessing", 
	"\t^ 'link'",
	null, "2014-01-03T10:28:19Z", "mp");

jst.HTMLLinkElement.addMethod("href:", "anObject", "accessing", 
	"\t\"Sets the URI for the target resource.\"" +
	"\n\tobj at: #href put: anObject asString",
	null, "2014-01-03T10:31:11Z", "mp");

jst.HTMLLinkElement.addMethod("rel:", "aString", "accessing", 
	"\t\"Sets the forward relationship of the linked resource from the document to the resource.\"" +
	"\n\tobj at: #rel put: aString",
	null, "2014-01-03T10:32:21Z", "mp");

jst.HTMLLinkElement.addMethod("type:", "aString", "accessing", 
	"\t\"Sets the MIME type of the linked resource.\"" +
	"\n\tobj at: #type put: aString",
	null, "2014-01-03T10:33:14Z", "mp");

//*** HTMLImageElement ***

jst.HTMLImageElement._class.addMethod("tag", "", "accessing", 
	"\t^ 'img'",
	null, "2013-06-18T14:00:26Z", "mp");

jst.HTMLImageElement.addMethod("src", "", "accessing", 
	"\t^ obj at: #src",
	null, "2013-06-18T11:16:34Z", "mp");

jst.HTMLImageElement.addMethod("src:", "anObject", "accessing", 
	"\tobj at: #src put: anObject asJsObject",
	null, "2013-06-18T11:17:07Z", "mp", 1);

jst.HTMLImageElement.addMethod("src:", "anObject", "accessing", 
	"\tobj at: #src put: anObject asString",
	null, "2014-02-11T13:21:19Z", "mp"); //jst-dom

jst.HTMLImageElement.addMethod("isComplete", "", "testing", 
	"\t\"True if the browser has fetched the image, and it is in a supported image type that was decoded without errors.\"" +
	"\n\t^ obj at: #complete",
	null, "2013-06-18T11:42:41Z", "mp");

jst.HTMLImageElement.addMethod("height", "", "accessing", 
	"\t\"Reflects the height HTML attribute, indicating the rendered height of the image in CSS pixels.\"" +
	"\n\t^ obj at: #height",
	null, "2013-06-18T11:43:20Z", "mp");

jst.HTMLImageElement.addMethod("height:", "anObject", "accessing", 
	"\tobj at: #height put: anObject",
	null, "2013-06-18T11:46:39Z", "mp");

jst.HTMLImageElement.addMethod("width", "", "accessing", 
	"\t\"Reflects the width HTML attribute, indicating the rendered width of the image in CSS pixels.\"" +
	"\n\t^ obj at: #width",
	null, "2013-06-18T11:43:57Z", "mp");

jst.HTMLImageElement.addMethod("width:", "anObject", "accessing", 
	"\tobj at: #width put: anObject",
	null, "2013-06-18T11:46:49Z", "mp");

jst.HTMLImageElement.addMethod("naturalHeight", "", "accessing", 
	"\t\"Intrinsic height of the image in CSS pixels, if it is available; otherwise, 0.\"" +
	"\n\t^ obj at: #naturalHeight",
	null, "2013-06-18T11:45:07Z", "mp");

jst.HTMLImageElement.addMethod("naturalWidth", "", "accessing", 
	"\t\"Intrinsic width of the image in CSS pixels, if it is available; otherwise, 0.\"" +
	"\n\t^ obj at: #naturalWidth",
	null, "2013-06-18T11:46:18Z", "mp");

jst.HTMLImageElement.addMethod("alt", "", "accessing", 
	"\t\"Reflects the alt HTML attribute, indicating fallback context for the image.\"" +
	"\n\t^ obj at: #alt",
	null, "2013-06-18T11:48:24Z", "mp");

jst.HTMLImageElement.addMethod("alt:", "aString", "accessing", 
	"\tobj at: #alt put: aString",
	null, "2013-06-18T11:48:43Z", "mp");

jst.HTMLImageElement.addMethod("extent", "", "accessing", 
	"\t^  Rectangle extent: self naturalWidth @ self naturalHeight.",
	null, "2013-06-28T07:10:57Z", "mp");

// *** HTMLCanvasElement ***

jst.HTMLCanvasElement.addMethod("height", "", "accessing", 
	"\t\"Reflects the height HTML attribute, specifying the height of the coordinate space in CSS pixels\"" +
	"\n\t^ obj at: #height",
	null, "2013-06-18T21:21:25Z", "mp");

jst.HTMLCanvasElement.addMethod("width", "", "accessing", 
	"\t\"Reflects the width HTML attribute, specifying the width of the coordinate space in CSS pixels\"" +
	"\n\t^ obj at: #width",
	null, "2013-06-18T21:22:13Z", "mp");

jst.HTMLCanvasElement.addMethod("height:", "aNumber", "accessing", 
	"\tobj at: #height put: aNumber",
	null, "2013-06-18T21:25:15Z", "mp");

jst.HTMLCanvasElement.addMethod("width:", "aNumber", "accessing", 
	"\tobj at: #width put: aNumber",
	null, "2013-06-18T21:25:35Z", "mp");

jst.HTMLCanvasElement.addMethod("context2D", "", "accessing", 
	"\t^ CanvasRenderingContext2D wrap: (obj perform: #getContext with: '2d')",
	null, "2013-06-19T19:22:14Z", "mp");

jst.HTMLCanvasElement.addMethod("asUrl", "", "converting", 
	"\t^ obj perform: #toDataURL with: self type with: quality asJsObject",
	null, "2013-06-20T09:39:24Z", "mp");

jst.HTMLCanvasElement.addMethod("beJPEGWithQuality:", "aNumber", "converting", 
	"\ttype := 'image/jpeg'." +
	"\n\tquality := aNumber",
	null, "2013-06-20T09:36:47Z", "mp");

jst.HTMLCanvasElement.addMethod("beJPEG", "", "converting", 
	"\tself beJPEGWithQuality: 0.9",
	null, "2013-06-27T09:16:17Z", "mp");

jst.HTMLCanvasElement.addMethod("type", "", "accessing", 
	"\t^ type ifNil: 'image/png'",
	null, "2013-06-20T09:38:10Z", "mp");

// *** HTMLAnchorElement ***

jst.HTMLAnchorElement._class.addMethod("tag", "", "accessing", 
	"\t^ 'a'",
	null, "2013-08-19T13:30:13Z", "mp");

jst.HTMLAnchorElement.addMethod("hash", "", "accessing", 
	"\t\"The fragment identifier, including the leading hash mark ('#'), if any, in the referenced URL.\"" +
	"\n\t^ obj at: #hash",
	null, "2013-08-19T13:31:39Z", "mp");

jst.HTMLAnchorElement.addMethod("hash:", "aString", "accessing", 
	"\tobj at: #hash put: aString",
	null, "2013-08-19T13:32:08Z", "mp");

// *** WebStorage ***

jst.WebStorage._class.instanceVariableNames_("local session");

jst.WebStorage._class.addMethod("initialize", "", "initialization", 
	"\tlocal := self on: (Browser window at: #localStorage)." +
	"\n\tsession := self on: (Browser window at: #sessionStorage).",
	null, "2012-11-02T11:00:09Z", "mp");

jst.initializeClass(jst.WebStorage);

/* duplicita
jst.WebStorage.addMethod("at:", "key", "accessing", 
	"\t^ self at: key ifAbsent: [self errorKeyNotFound]",
	null, "2012-03-28T12:49:26Z", "mp");
*/

jst.WebStorage._class.addMethod("local", "", "accessing", 
	"\t^ local",
	null, "2012-03-28T13:22:42Z", "mp");

jst.WebStorage._class.addMethod("session", "", "accessing", 
	"\t^ session",
	null, "2012-03-28T13:22:50Z", "mp");

jst.WebStorage.addMethod("clear", "", "removing", function (){
	this._map.clear();
	return this;
},
	null, "2012-03-28T13:25:48Z", "mp");

jst.WebStorage.addMethod("size", "", "accessing", function (){
	//Returns the number of key/value pairs currently present in the list associated with the object.
	return this._map.length;
},
	null, "2012-03-28T13:35:02Z", "mp");

jst.WebStorage.addMethod("at:ifPresent:", "key aBlock", "accessing", function (key,aBlock){
	var value = this._map.getItem(key);
	return (value != null) ? aBlock.value_(value) : jst.nil;
},
	null, "2012-03-28T13:36:50Z", "mp");

/*
jst.WebStorage.addMethod("at:ifAbsent:", "key aBlock", "accessing", function (key,aBlock){
	var value = this._map.getItem(key);
	return value ? value : aBlock.value();
},
	null, "2012-03-28T13:19:45Z", "mp");
*/

jst.WebStorage.addMethod("at:ifAbsent:", "key aBlock", "accessing", function (key,aBlock){
	var value = this._map.getItem(key);
	return (value != null) ? value : aBlock.value();
},
	null, "2012-03-28T13:37:04Z", "mp");

jst.WebStorage.addMethod("at:put:", "key anObject", "accessing", function (key,anObject){
	this._map.setItem(key, anObject);
	return anObject;
},
	null, "2012-03-28T13:38:02Z", "mp");

jst.WebStorage.addMethod("removeKey:ifAbsent:", "key aBlock", "removing", function (key,aBlock){
	var value = this._map.getItem(key);
	if (value != null)
		this._map.removeItem(key);
	else
		return aBlock.value();
	return value;
},
	null, "2012-03-28T13:43:07Z", "mp");

jst.WebStorage.addMethod("keysAndValuesDo:", "aBlock", "enumerating", function (aBlock){
	for (var i = 0; i < this._map.length; i++) {
		var key = this._map.key(i);
		aBlock.value_value_(key, this._map.getItem(key));
	};
	return this;
},
	null, "2012-03-28T13:48:38Z", "mp");

jst.WebStorage.addMethod("detect:ifNone:", "aBlock exceptionBlock", "enumerating", 
function (aBlock,exceptionBlock){
	for (var i = 0; i < this._map.length; i++) {
		var key = this._map.key(i);
		if (aBlock(this._map.getItem(key), key) == true)
			return this._map.getItem(key);
	};
	return exceptionBlock.value();
},
	null, "2012-09-20T20:00:03Z", "mp");

jst.WebStorage.addMethod("hasEqualValues:", "aStorage", "private", function (aStorage){
	for (var i = 0; i < this._map.length; i++) {
		var key = this._map.key(i);
		if (this._map.getItem(key) == aStorage._map.getItem(key))
			return false;
	};
	return true;
},
	null, "2012-03-28T16:50:00Z", "mp");

jst.WebStorage.addMethod("keyAtValue:ifAbsent:", "value exceptionBlock", "accessing", function (value,exceptionBlock){
	for (var i = 0; i < this._map.length; i++) {
		var key = this._map.key(i);
		if (value == this._map.getItem(key))
			return key;
	};
	return exceptionBlock.value();
},
	null, "2012-03-28T16:52:57Z", "mp");

// *** CanvasRenderingContext2D ***

jst.CanvasRenderingContext2D.addMethod("canvas", "", "accessing", 
	"\t\" back-reference to the canvas\"" +
	"\n\t^ (obj at: #canvas) jstWrapper",
	null, "2013-06-19T19:39:05Z", "mp");

jst.CanvasRenderingContext2D.addMethod("width", "", "accessing", 
	"\t^ self canvas width",
	null, "2013-06-19T19:50:27Z", "mp");

jst.CanvasRenderingContext2D.addMethod("height", "", "accessing", 
	"\t^ self canvas height",
	null, "2013-06-19T19:50:17Z", "mp");

jst.CanvasRenderingContext2D.addMethod("drawImage:origin:extent:", "elm origPoint extPoint", "images", 
	"\t\"An element to draw into the context; the specification permits any image element (that is, <img>, <canvas>, and <video>). " +
	"\n\tSome browsers, including Firefox, let you use any arbitrary element." +
	"\n\torigPoint: The coordinates in the destination canvas at which to place the top-left corner of the source image;" +
	"\n\textPoint: The width and height to draw the image in the destination canvas. This allows scaling of the drawn image. " +
	"\n\tIf not specified, the image is not scaled when drawn.\"" +
	"\n\tobj perform: #drawImage withArguments: {elm asJsObject. origPoint x. origPoint y. extPoint x. extPoint y}",
	null, "2013-06-19T19:46:29Z", "mp");

jst.CanvasRenderingContext2D.addMethod("drawImage:", "elm", "images", 
	"\t| rect |" +
	"\n\trect := (Rectangle extent: elm width @ elm height) " +
	"\n\t\tscaleToFit: (Rectangle extent: self width @ self height) center: true." +
	"\n\tself drawImage: elm origin: rect origin extent: rect extent",
	null, "2013-06-20T17:05:34Z", "mp");

jst.CanvasRenderingContext2D.addMethod("drawImage:origin:", "elm aPoint", "images", 
	"\tobj perform: #drawImage with: elm asJsObject with: aPoint x with: aPoint y",
	null, "2013-06-19T20:14:29Z", "mp");

/*
jst.CanvasRenderingContext2D.addMethod("drawImage:x:y:", "elm x y", "images", 
	"\tobj perform: #drawImage with: elm asJsObject with: x with: y",
	null, "2013-06-19T20:15:09Z", "mp");
*/

jst.CanvasRenderingContext2D.addMethod("drawImage:clip:on:", "elm clipRect rect", "images", 
	"\tobj perform: #drawImage withArguments: {" +
	"\n\t\telm asJsObject. " +
	"\n\t\tclipRect origin left." +
	"\n\t\tclipRect origin top." +
	"\n\t\tclipRect width." +
	"\n\t\tclipRect height." +
	"\n\t\trect origin left. " +
	"\n\t\trect origin top." +
	"\n\t\trect width. " +
	"\n\t\trect height}",
	null, "2013-06-20T19:49:33Z", "mp");

jst.CanvasRenderingContext2D.addMethod("clear", "", "rectangles", 
	"\tobj perform: #clearRect withArguments: { 0. 0. self width. self height}",
	null, "2013-06-19T20:47:40Z", "mp");

jst.CanvasRenderingContext2D.addMethod("globalAlpha:", "float", "accessing", 
	"\t\"Alpha value that is applied to shapes and images before they are composited onto the canvas. Default 1.0 (opaque).\"" +
	"\n\tobj at: #globalAlpha put: float",
	null, "2014-02-25T21:41:48Z", "mp");

jst.CanvasRenderingContext2D.addMethod("globalAlpha", "", "accessing", 
	"\t^ obj at: #globalAlpha",
	null, "2014-02-25T21:42:03Z", "mp");

//*** Animation ***

jst.Animation._class.addMethod("initialize", "", "class initialization", 
	function (){
	window.requestAnimationFrame = window.requestAnimationFrame 
		|| window.mozRequestAnimationFrame 
		|| window.webkitRequestAnimationFrame 
		|| window.msRequestAnimationFrame 
		|| (function() {
			var startTime = window.performance.now();
			return function(callback) {
				var time = window.performance.now();
				var dTime = time - startTime;
				window.setTimeout(callback.bind(callback,dTime),17);
				return;
			};
		}());
},
	null, "2014-02-25T20:44:28Z", "mp", 1);

jst.Animation._class.addMethod("initialize", "", "class initialization", 
	function (){
	window.requestAnimationFrame = window.requestAnimationFrame 
		|| window.mozRequestAnimationFrame 
		|| window.webkitRequestAnimationFrame 
		|| window.msRequestAnimationFrame 
		|| (function() {
			return function(callback) {
				var time = Date.now();
				window.setTimeout(callback.bind(callback,time),17);
				return 0; "animation cannot be canceled"
			};
		}());
},
	null, "2014-02-27T10:05:13Z", "mp"); //jst-dom

jst.initializeClass(jst.Animation);

jst.Animation.addMethod("initialize", "", "initialization", 
	"\tduration := 0." +
	"\n\trequestId := 0",
	null, "2014-02-25T20:52:21Z", "mp");

jst.Animation.addMethod("duration:", "millis", "accessing", 
	"\tduration := millis asMilliSeconds",
	null, "2014-02-25T20:50:08Z", "mp");

jst.Animation.addMethod("start", "", "processing", 
	function (){
	var self = this;
	var nextAnim =  function(time) {
		var dTime = time - self._startTime;
		self._animate(dTime);
		if (self._duration == 0 || dTime < self._duration)
			self._requestId = window.requestAnimationFrame(nextAnim);
	};
	this._startTime = window.performance.now();
	this._requestId = window.requestAnimationFrame(nextAnim);
	return this;
},
	null, "2014-02-25T21:53:53Z", "mp", 1);

jst.Animation.addMethod("start", "", "processing", 
	function (){
	var self = this;
	var nextAnim =  function(time) {
		var dTime = time - self._startTime;
		self._animate(dTime);
		if (self._duration == 0 || dTime < self._duration)
			self._requestId = window.requestAnimationFrame(nextAnim);
	};
	"performace.now() cannot be used in IE9"
	this._startTime = (window.performance.now) ? window.performance.now() : Date.now();
	this._requestId = window.requestAnimationFrame(nextAnim);
	return this;
},
	null, "2014-02-27T09:41:59Z", "mp"); //jst-dom

jst.Animation.addMethod("stop", "", "processing", 
	function (){
	if (this._requestId)
		window.cancelAnimationFrame(this._requestId);
	this._requestId = 0;
	return this;
},
	null, "2014-02-25T20:39:42Z", "mp");

jst.Animation.addMethod("fadeIn:", "aBlock", "processing", 
	function (aBlock){
	this.stop();
	var self = this;
	this._animate = function (dTime) {
		var alpha = 1 / self._duration * dTime;  
		 if (alpha > 1) 
		 	alpha = 1;
		jst.sndw(aBlock, "value_", alpha);
	};
	return this.start();
},
	null, "2014-02-25T22:02:57Z", "mp");

// *** ConfigDict ***

jst.ConfigDict.addMethod("asJsObject", "", "converting", 
	"\t^ (self keys inject: Dictionary new into: [:dict :key | " +
	"\n\t\tdict at: key put: (self at: key) asJsObject; yourself]" +
	"\n\t) asJsObject",
	null, "2012-11-21T14:21:39Z", "mp");

// *** DynamicTable ***

jst.DynamicTable.addMethod("initialize", "", "initialization", 
	"\toptions := ConfigDict new",
	null, "2012-11-21T14:22:43Z", "mp");

jst.DynamicTable.addMethod("colTypes:", "aCollection", "accessing", 
	"\t| custom i |" +
	"\n\t\"#alpha: alphanumeric using current locale" +
	"\n\t #number: by numbers" +
	"\n\t #czdate: czech date format (dd.mm.yyyy)" +
	"\n\t #date: english date format (yyyy-mm-dd)" +
	"\n\t or a sort block\"" +
	"\n\t i := 0." +
	"\n\t custom := Dictionary new." +
	"\n\t options at: #colTypes put: (aCollection collect: [:ea |" +
	"\n\t \tea isBlock ifFalse: ea ifTrue: [" +
	"\n\t\t\ti := i + 1. " +
	"\n\t\t\tcustom at: i put: ea. " +
	"\n\t\t\ti]])." +
	"\n\tcustom size > 0 ifTrue: [" +
	"\n\t\toptions at: #customTypes put: custom]",
	null, "2012-11-21T14:00:45Z", "mp");

jst.DynamicTable.addMethod("renderTo:", "anObject", "initialization", function (anObject){
	//Pass HTML table element string ID or pass HTML table element directly. 
	//Call this method as the last statement."
	this._elm = anObject;
	this.wrap_(new DynamicTable(anObject.asJsObject(), this._options.asJsObject()));
	return this;
},
	null, "2012-11-21T14:48:14Z", "mp");

jst.DynamicTable.addMethod("colTypes", "", "accessing", 
	"\t^ options at: #colTypes ifAbsent: #()",
	null, "2012-11-21T14:50:25Z", "mp");

jst.DynamicTable.addMethod("element", "", "accessing", 
	"\t^ elm ifString: [" +
	"\n\t\telm := Document current elementById: elm]",
	null, "2012-11-21T14:53:21Z", "mp");

jst.DynamicTable.addMethod("pager", "", "accessing", 
	"\t^ options at: #pager ifAbsentPut: [Dictionary new]",
	null, "2012-11-21T15:21:10Z", "mp");

jst.DynamicTable.addMethod("rowsCount:", "aNumber", "accessing", 
	"\tself pager at: #rowsCount put: aNumber",
	null, "2012-11-21T15:21:36Z", "mp");

jst.DynamicTable.addMethod("rowsCount", "", "accessing", 
	"\t^ self pager at: #rowsCount ifAbsent: nil",
	null, "2012-11-21T15:22:03Z", "mp");

jst.DynamicTable.addMethod("currentPage:", "aNumber", "accessing", 
	"\tself pager at: #currentPage put: aNumber",
	null, "2012-11-21T15:22:23Z", "mp");

jst.DynamicTable.addMethod("filter:", "aBlock", "accessing", 
	"\t\"Filter function must return -1 when not found, something else otherwise." +
	"\n\te.g. function(a, b) { return a.search(b); }\"" +
	"\n\toptions at: #filterFunction put: aBlock",
	null, "2012-11-21T15:28:56Z", "mp");

/*
jst.DynamicTable.addMethod("filter", "", "accessing", 
	"\t^ options at: #filterFunction ifAbsent: ['DynamicTable.prototype.filterFunction' eval]",
	null, "2012-11-21T15:30:45Z", "mp");
*/

jst.DynamicTable.addMethod("filter", "", "accessing", function (){
	return this._options.at_ifAbsent_("filterFunction", function(){return DynamicTable.prototype.filterFunction;});
},
	null, "2012-11-21T15:39:38Z", "mp");

jst.DynamicTable.addMethod("rowClass:", "anArray", "accessing", 
	"\t\"an array of classes for odd and even rows, \te.g. #(odd even)\"" +
	"\n\toptions at: #rowClass put: anArray",
	null, "2012-11-23T21:48:06Z", "mp");
