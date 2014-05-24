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
 * Depends on jst-core, jst-core-proxy, jst-parser, jst-kernel
 */

jst.currentJsFile = "jst-dom";

// *** CLASSES ***

jst.WrapperObject.subclass("DOMEventTarget", "", "", "", "DOM");

jst.DOMEventTarget.subclass("DOMNode", "", "", "", "DOM");

jst.DOMNode.subclass("Document", "mimeType", "", "", "DOM");

jst.DOMNode.subclass("DOMElement", "", "", "", "DOM");

jst.DOMNode.subclass("DOMCharacterData", "", "", "", "DOM");

jst.DOMCharacterData.subclass("DOMText", "", "", "", "DOM");

jst.DOMNode.subclass("DocumentFragment", "", "", "", "DOM");

jst.SequenceableCollection.subclass("NodeList", "nodeList", "", "", "DOM");

jst.WrapperObject.subclass("DOMEvent", "type initDict", "", "", "DOM");
jst.DOMEvent._class.instanceVariableNames_("types");

jst.DOMEvent.subclass("DOMProgressEvent", "", "", "", "DOM");
jst.DOMEvent.subclass("DOMCustomEvent", "", "", "", "DOM");
jst.DOMEvent.subclass("DOMMouseEvent", "", "", "", "DOM");

jst.Object.subclass("DOMEventListener", "type callback capture", "", "", "DOM");

// jst.Object.subclass("HostEnvironment", "", "", "", "DOM-Browser");

jst.Object.subclass("JSON", "rawObjectClass", "", "", "DOM-Util");

// *** METHODS ***

//*** NodeList ***

jst.NodeList.addMethod("replaceFrom:to:with:startingAt:", "start stop replacement repStart", "private", 
	"\tself shouldNotImplement",
	null, "2012-03-17T21:56:22Z", "mp");

jst.NodeList.addMethod("at:put:", "index anObject", "accessing", 
	"\tself shouldNotImplement",
	null, "2012-03-17T22:00:53Z", "mp");

jst.NodeList.addMethod("at:", "index", "accessing", 
	"\t^ DOMNode on: (nodeList perform: #item with: index - 1)",
	null, "2012-03-17T22:04:14Z", "mp");

jst.NodeList.addMethod("size", "", "accessing", 
	"\t^ nodeList at: #length",
	null, "2012-03-17T22:05:03Z", "mp");

jst.NodeList.addMethod("wrap:", "jsObject", "accessing", 
	"\tsuper wrap: (nodeList := jsObject)",
	null, "2012-03-17T22:11:12Z", "mp");
/*
jst.NodeList.addMethod("wrap:", "jsObject", "accessing", 
	"\tJSObjectProxy on: (nodeList := jsObject)",
	null, "2012-09-19T20:31:14Z", "mp");
*/
// *** DOMNode ***

jst.DOMNode._class.addMethod("detectClassOf:", "jsNode", "private", 
	function (jsNode){
	switch (jsNode.nodeType) {
		case Node.ELEMENT_NODE:
			return jst.DOMElement;
		case Node.TEXT_NODE:
			return jst.DOMText;
		case Node.DOCUMENT_NODE:
			return jst.Document;
		case Node.DOCUMENT_FRAGMENT_NODE:
			return jst.DocumentFragment;
	};
	return this;
},
	null, "2012-04-29T21:53:17Z", "mp"); //jst-dom

jst.DOMNode._class.addMethod("on:", "jsNode", "instance creation", function (jsNode){
	return this.detectClassOf_(jsNode).wrap_(jsNode);
},
	null, "2011-12-12T14:20:23Z", "mp");

jst.DOMNode.addMethod("parent", "", "accessing", 
	"\t| n |" +
	"\n\t^ nil = (n := obj perform: #parentNode) ifFalse: [" +
	"\n\t\tself class on: n]",
	null, "2011-12-12T14:23:13Z", "mp");

jst.DOMNode.addMethod("appendChild:", "aNode", "children", 
	"\tobj perform: #appendChild with: aNode asJsObject." +
	"\n\t^ aNode",
	null, "2011-12-09T14:19:46Z", "mp");

jst.DOMNode.addMethod("hasChildNodes", "", "children", 
	"\t^ obj perform: #hasChildNodes",
	null, "2011-12-12T14:49:18Z", "mp");

jst.DOMNode.addMethod("removeChild:", "aNode", "children", 
	"\tobj perform: #removeChild with: aNode asJsObject." +
	"\n\t^ aNode",
	null, "2011-12-12T14:59:23Z", "mp");

jst.DOMNode.addMethod("childNodes", "", "children", 
	"\t^ NodeList wrap: obj childNodes",
	null, "2012-03-17T22:10:50Z", "mp");

jst.DOMNode.addMethod("firstChild", "", "children", 
	"\t^ obj at: #firstChild ifPresent: [:ch | DOMNode on: ch]",
	null, "2012-12-10T15:58:05Z", "mp", 1);

jst.DOMNode.addMethod("firstChild", "", "children", 
	"\t^ obj at: #firstChild ifPresent: [:ch | " +
	"\n\t\tself species on: ch]",
	null, "2013-06-26T13:11:45Z", "mp"); //jst-dom

jst.DOMNode.addMethod("lastChild", "", "children", 
	"\t^ obj at: #lastChild ifPresent: [:ch | DOMNode on: ch]",
	null, "2012-12-10T15:58:50Z", "mp", 1);

jst.DOMNode.addMethod("lastChild", "", "children", 
	"\t^ obj at: #lastChild ifPresent: [:ch | " +
	"\n\t\tself species on: ch]",
	null, "2013-06-26T13:12:37Z", "mp"); //jst-dom

jst.DOMNode.addMethod("printHtmlOn:", "aStream", "printing", 
	"\taStream nextPutAll: (obj at: #textContent)",
	null, "2012-03-18T10:36:23Z", "mp");

jst.DOMNode.addMethod("printHtml", "", "printing", 
	"\t^ String streamContents: [:s | " +
	"\n\t\tself printHtmlOn: s ]",
	null, "2012-03-18T20:24:29Z", "mp");

jst.DOMNode.addMethod("textContent", "", "accessing", 
	"\t^ obj at: #textContent",
	null, "2012-04-30T12:54:32Z", "mp");

// *** Document ***

jst.Document._class.addMethod("current", "", "accessing", function (){
	return this.on_(window.document);
},
	null, "2011-12-09T15:59:47Z", "mp", 1);

jst.Document._class.addMethod("current", "", "accessing", function (){
	return this.wrap_(window.document);
},
	null, "2014-01-03T08:45:45Z", "mp"); //jst-dom

jst.Document.addMethod("createDocumentFragment", "", "public", 
	"\t^ DocumentFragment wrap: obj createDocumentFragment",
	null, "2012-03-16T21:15:06Z", "mp");

jst.Document.addMethod("elementById:", "aString", "accessing", 
	"\t| elm |" +
	"\n\t^ nil = (elm := obj perform: #getElementById with: aString) ifFalse: [" +
	"\n\t\tDOMElement on: elm]",
	null, "2011-12-09T16:34:44Z", "mp");

jst.Document.addMethod("elementsByName:", "aString", "accessing", 
	"\t^ NodeList wrap: (obj perform: #getElementsByTagName with: aString)",
	null, "2012-04-12T19:11:20Z", "mp");

jst.Document.addMethod("mimeType:", "aString", "accessing", 
	"\tmimeType := aString",
	null, "2012-11-01T16:08:43Z", "mp");

jst.Document.addMethod("open", "", "output stream", 
	"\t\"The method opens an output stream to collect the output from any write or writeln methods." +
	"\n\tOnce all the writes are performed, the close method causes any output written to the output stream to be displayed." +
	"\n\tNote: If a document already exists in the target, it will be cleared. If this method has no arguments, " +
	"\n\ta new window (about:blank) is displayed.\"" +
	"\n\tobj perform: #open with: (mimeType ifNil: '')",
	null, "2012-11-01T16:12:38Z", "mp");

jst.Document.addMethod("close", "", "output stream", 
	"\t\"Closes the output stream previously opened with the open method, and displays the collected data in this process.\"" +
	"\n\tobj perform: #close",
	null, "2012-11-01T16:10:40Z", "mp");

jst.Document.addMethod("write:", "aString", "output stream", 
	"\t\"The method writes HTML expressions or JavaScript code to a document.\"" +
	"\n\tobj perform: #write with: aString",
	null, "2012-11-01T16:14:17Z", "mp");

/* moved to HTMLDocument

jst.Document.addMethod("elementById:", "aString", "accessing", 
	"\t| elm |" +
	"\n\t^ nil = (elm := obj perform: #getElementById with: aString) ifFalse: [" +
	"\n\t\tHTMLElement on: elm]",
	null, "2013-06-19T07:38:06Z", "mp"); //jst-dom

jst.Document.addMethod("body", "", "accessing", 
	"\t^ DOMNode on: (obj at: 'body')",
	null, "2012-09-19T21:04:51Z", "mp", 1);

jst.Document.addMethod("body", "", "accessing", 
	"\t^ HTMLElement on: (obj at: 'body')",
	null, "2013-06-26T13:13:46Z", "mp"); //jst-dom

jst.Document._class.addMethod("html", "", "accessing", 
	"\t^ (self current elementsByName: #html) first",
	null, "2012-04-28T21:38:59Z", "mp");

jst.Document.addMethod("title", "", "accessing", 
	"\t^ obj at: #title",
	null, "2013-08-07T21:14:02Z", "mp");

jst.Document.addMethod("title:", "aString", "accessing", 
	"\tobj at: #title put: aString",
	null, "2013-08-07T21:14:28Z", "mp");
*/

// *** DOMElement ***

jst.DOMElement.addMethod("tag", "", "accessing", 
	"\t^ obj perform: #tagName",
	null, "2011-12-12T14:24:57Z", "mp");

jst.DOMElement._class.addMethod("new", "", "instance creation", 
	"\tself error: 'Should not create Elements with #new. Use #tag: instead.'",
	null, "2013-06-18T09:15:23Z", "mp");

jst.DOMElement._class.addMethod("tag:", "aString", "instance creation", 
	function (aString){
	return this.on_(window.document.createElement(aString));
},
	null, "2011-12-01T09:00:33Z", "mp");

/*
jst.DOMElement._class.addMethod("tag:", "aString", "instance creation", function (aString){
	return (aString.asLowercase() == "img") ? jst.HTMLImageElement._new() : this.on_(window.document.createElement(aString));
},
	null, "2013-06-18T09:16:21Z", "mp");
*/

jst.DOMElement.addMethod("append:", "anObject", "children", 
	"\tanObject appendToElement: self",
	null, "2011-12-09T22:18:13Z", "mp");

jst.DOMElement.addMethod("empty", "", "children", 
	function (){
	while (this._obj.childNodes.length > 0) {
		this._obj.removeChild(this._obj.childNodes.item(0));
	};
	return this;
},
	null, "2011-12-12T15:04:31Z", "mp");

jst.DOMElement.addMethod("attributeAt:put:", "name value", "accessing-attributes", 
	"\tobj perform: #setAttribute with: name with: value",
	null, "2011-12-10T22:45:45Z", "mp", 1);

jst.DOMElement.addMethod("attributeAt:put:", "name value", "accessing-attributes", 
	"\tvalue ifNotNil: [" +
	"\n\t\tobj perform: #setAttribute with: name with: value]",
	null, "2014-02-26T20:20:30Z", "mp"); //jst-dom

jst.DOMElement.addMethod("hasAttribute:", "name", "testing", 
	"\t^ obj perform: #hasAttribute with: name",
	null, "2011-12-11T19:57:57Z", "mp");

jst.DOMElement.addMethod("hasAttribute:", "name", "testing", function (name){
	//The hasAttribute method is supported in Internet Explorer from version 8
	return (this._obj.hasAttribute && this._obj.hasAttribute(name)) || this._obj.getAttribute(name) != null;
},
	null, "2012-11-27T11:18:07Z", "mp");

jst.DOMElement.addMethod("attributeAt:", "name", "accessing-attributes", 
	"\t^ obj perform: #getAttribute with: name",
	null, "2011-12-11T20:01:12Z", "mp");

jst.DOMElement.addMethod("attributeAt:append:separator:", "aKey aValue aString", "accessing-attributes", 
	"\t\"Append aValue to the attribute aKey. If already present, concatenate it with aString.\"" +
	"\n\t^ self attributeAt: aKey put: (String streamContents: [:stream |" +
	"\n\t\t(self hasAttribute: aKey) ifTrue: [" +
	"\n\t\t\tstream nextPutAll: (self attributeAt: aKey)." +
	"\n\t\t\tstream nextPutAll: aString ]." +
	"\n\t\tstream nextPutAll: aValue])",
	null, "2011-12-12T15:44:27Z", "mp");

jst.DOMElement.addMethod("printHtmlOn:", "aStream", "printing", 
	"\taStream nextPutAll: (obj at: #outerHTML)",
	null, "2012-03-18T10:27:28Z", "mp");

jst.DOMElement.addMethod("contents:", "aString", "accessing", 
	"\tobj at: #innerHTML put: aString",
	null, "2013-02-18T10:14:00Z", "mp");

jst.DOMElement.addMethod("elementsByName:", "aString", "accessing", 
	"\t^ NodeList wrap: (obj perform: #getElementsByTagName with: aString)",
	null, "2012-04-28T21:35:45Z", "mp");

// *** DOMText ***

jst.DOMText._class.addMethod("data:", "aString", "instance creation", 
	function (aString){
	return this.on_(window.document.createTextNode(aString));
},
	null, "2011-12-01T22:05:05Z", "mp");

// *** DocumentFragment ***

jst.DocumentFragment.addMethod("printHtmlOn:", "aStream", "printing", 
	"\tself childNodes do: [:n |" +
	"\n\t\tn printHtmlOn: aStream]",
	null, "2012-03-18T10:23:38Z", "mp");

/* ** HostEnvironment ***

jst.HostEnvironment._class.instanceVariableNames_("current");

jst.HostEnvironment._class.addMethod("current", "", "accessing", 
	"\t^ current",
	null, "2012-03-23T19:54:34Z", "mp");

jst.HostEnvironment._class.addMethod("initialize", "", "class initialization", 
	"\tcurrent := self new",
	null, "2012-03-23T19:56:39Z", "mp");

jst.initializeClass(jst.HostEnvironment);

jst.HostEnvironment.addMethod("window", "", "browser objects", function (){
	return jst.Window.wrap_(window);
},
	null, "2012-03-23T20:19:02Z", "mp");

jst.HostEnvironment.addMethod("navigator", "", "browser objects", 
	"\t^ self window navigator",
	null, "2012-03-25T07:41:30Z", "mp");

jst.HostEnvironment.addMethod("location", "", "browser objects", 
	"\t^ self window location",
	null, "2012-03-25T20:23:55Z", "mp");

jst.HostEnvironment.addMethod("screen", "", "browser objects", 
	"\t^ self window screen",
	null, "2012-03-25T20:50:45Z", "mp");

jst.HostEnvironment.addMethod("history", "", "browser objects", 
	"\t^ self window history",
	null, "2012-03-25T21:00:30Z", "mp");

jst.HostEnvironment.addMethod("localStorage", "", "browser storage", 
	"\t^ WebStorage local",
	null, "2012-03-28T12:53:50Z", "mp");

jst.HostEnvironment.addMethod("sessionStorage", "", "browser storage", 
	"\t^ WebStorage session",
	null, "2012-03-28T12:54:03Z", "mp");

jst.HostEnvironment.addMethod("at:", "key", "accessing", function (key){
	return window[key];
},
	null, "2012-09-18T19:06:57Z", "mp");

//SystemDictionary extension

jst.SystemDictionary.addMethod("host", "", "accessing", 
	"\t^ HostEnvironment current",
	null, "2012-03-25T21:03:15Z", "mp");
*/

// *** DOMEvent ***

jst.DOMEvent._class.addMethod("types", "", "accessing", 
	"\t^ types",
	null, "2012-12-06T07:19:12Z", "mp");

jst.DOMEvent.addMethod("initialize", "", "initialization", 
	"\tinitDict := Dictionary new",
	null, "2012-12-05T20:30:32Z", "mp");

jst.DOMEvent.addMethod("asJsObject", "", "converting", 
	"\tobj ifNil: [" +
	"\n\t\tself wrap: self createJsObject]." +
	"\n\t^ obj",
	null, "2012-12-05T21:17:02Z", "mp");

jst.DOMEvent.addMethod("type:", "aString", "accessing", 
	"\ttype := aString",
	null, "2012-12-05T20:45:57Z", "mp");

jst.DOMEvent.addMethod("type", "", "accessing", 
	"\t\"Returns the type of event, e.g. #click, #hashchange, or #submit\"" +
	"\n\t^ obj ifNotNil: [obj at: #type] ifNil: type",
	null, "2012-12-05T22:18:15Z", "mp");

jst.DOMEvent.addMethod("createJsObject", "", "private", function (){
	return eval("new " + this.className().allButFirst_(3) + "(this._type, this._initDict.asJsObject())");
},
	null, "2012-12-05T21:51:49Z", "mp");

jst.DOMEvent.addMethod("target:", "anObject", "accessing", 
	"\tinitDict at: #target put: anObject",
	null, "2012-12-18T22:05:25Z", "mp");

jst.DOMEvent.addMethod("target", "", "accessing", 
	"\t\"Returns the object event is dispatched to.\"" +
	"\n\t^ obj target jstWrapper",
	null, "2012-03-26T20:21:50Z", "mp");

jst.DOMEvent.addMethod("currentTarget", "", "accessing", 
	"\t\"Returns the object whose event listener's callback is invoked.\"" +
	"\n\t^ obj currentTarget jstWrapper",
	null, "2012-03-26T20:22:44Z", "mp");

jst.DOMEvent.addMethod("timeStamp", "", "accessing", 
	"\t\"obj returns the creation time of event in the number of milliseconds that passed since 00:00:00 UTC on 1 January 1970.\"" +
	"\n\t^ DateAndTime fromMilliSeconds: obj timeStamp",
	null, "2012-03-26T20:27:15Z", "mp");

// *** DOMProgressEvent ***

jst.DOMProgressEvent._class.addMethod("initialize", "", "class initialization", 
	"\ttypes := #(loadstart progress abort error load timeout loadend)",
	null, "2012-12-06T07:20:48Z", "mp");

jst.initializeClass(jst.DOMProgressEvent);

jst.DOMProgressEvent.addMethod("lengthComputable", "", "accessing", 
	"\t\"The  attribute must return the value it was initialized to. When an event is created the attribute must be initialized to false.\"" +
	"\n\t^ obj at: #lengthComputable",
	null, "2013-06-07T11:34:29Z", "mp");

jst.DOMProgressEvent.addMethod("loaded", "", "accessing", 
	"\t\"The loaded and total attributes must return the value they were initialized to. " +
	"\n\tWhen an event is created the attributes must be initialized to 0.\"" +
	"\n\t^ obj at: #loaded",
	null, "2013-06-07T11:37:46Z", "mp");

jst.DOMProgressEvent.addMethod("total", "", "accessing", 
	"\t^ obj at: #total",
	null, "2013-06-07T11:38:03Z", "mp");

// *** DOMMouseEvent ***

jst.DOMMouseEvent._class.addMethod("initialize", "", "class initialization", 
	"\ttypes := #(click dblclick contextmenu mousedown mouseenter mouseleave mousemove mouseout mouseover mouseup)",
	null, "2014-04-02T20:17:20Z", "mp");

jst.initializeClass(jst.DOMMouseEvent);

jst.DOMMouseEvent.addMethod("layerX", "", "accessing", 
	"\t^ obj at: #layerX",
	null, "2014-04-02T20:08:07Z", "mp");

jst.DOMMouseEvent.addMethod("layerY", "", "accessing", 
	"\t^ obj at: #layerY",
	null, "2014-04-02T20:08:01Z", "mp");

// *** DOMEventListener ***

jst.DOMEventListener._class.addMethod("on:do:", "eventType aBlock", "instance creation", 
	"\t^ self new on: eventType do: aBlock",
	null, "2012-12-06T08:54:54Z", "mp");

jst.DOMEventListener.addMethod("initialize", "", "initialization", 
	"\tcapture := false",
	null, "2012-12-06T07:35:34Z", "mp");

jst.DOMEventListener.addMethod("type", "", "accessing", 
	"\t^ type",
	null, "2012-12-06T08:08:16Z", "mp");

jst.DOMEventListener.addMethod("callback", "", "accessing", 
	"\t^ callback",
	null, "2012-12-06T08:08:24Z", "mp");

jst.DOMEventListener.addMethod("capture", "", "accessing", 
	"\t^ capture",
	null, "2012-12-06T08:08:34Z", "mp");

jst.DOMEventListener.addMethod("capture:", "aBoolean", "accessing", 
	"\t\"When set to true, the capture argument ensures callback is only invoked " +
	"\n\twhen the event's eventPhase attribute value is CAPTURING_PHASE.\"" +
	"\n\tcapture := aBoolean",
	null, "2012-12-06T07:37:13Z", "mp");

jst.DOMEventListener.addMethod("on:do:", "aString aBlock", "event handling", 
	"\t| eventClass |" +
	"\n\ttype := aString." +
	"\n\teventClass := DOMEvent allSubclasses reversed detect: [:cls | " +
	"\n\t\tcls types isEmptyOrNil not and: [cls types includes: type]] ifNone: DOMEvent." +
	"\n\tcallback := [:ev | aBlock valueWithPossibleArgument: (eventClass wrap: ev)]",
	null, "2012-12-06T07:35:17Z", "mp");

// *** DOMEventTarget ***

jst.DOMEventTarget.addMethod("addEventListener:", "aListener", "accessing", 
	"\t\"Appends an event listener for events whose type attribute value is type. " +
	"\n\tThe callback argument sets the callback that will be invoked when the event is dispatched.\"" +
	"\n\tobj perform: 'addEventListener' with: aListener type with: aListener callback with: aListener capture",
	null, "2012-12-06T08:07:06Z", "mp");

jst.DOMEventTarget.addMethod("removeEventListener:", "aListener", "accessing", 
	"\t\"Remove the event listener in target's list of event listeners with the same type, callback, and capture.\"" +
	"\n\tobj perform: 'removeEventListener' with: aListener type with: aListener callback with: aListener capture",
	null, "2012-12-06T08:07:57Z", "mp");

jst.DOMEventTarget.addMethod("dispatchEvent:", "anEvent", "event handling", 
	"\t\"Dispatches a synthetic event event to target and returns true " +
	"\n\tif either event's cancelable attribute value is false or it's #preventDefault method was not invoked, or false otherwise.\"" +
	"\n\t^ obj perform: 'dispatchEvent' with: anEvent asJsObject",
	null, "2012-12-06T08:05:46Z", "mp");

jst.DOMEventTarget.addMethod("on:do:", "eventType aBlock", "event handling", 
	"\tself addEventListener: (DOMEventListener on: eventType do: aBlock)",
	null, "2012-12-06T08:55:23Z", "mp");

// *** JSON ***

jst.JSON.klass().instanceVariableNames_("default full");

jst.JSON.addMethod("asJsObject", "", "converting", 
	"\t^ self class asJsObject",
	null, "2012-04-20T06:45:56Z", "mp");

jst.JSON._class.addMethod("asJsObject", "", "converting", function (){
	return JSON;
},
	null, "2012-04-20T06:43:04Z", "mp");

jst.JSON._class.addMethod("deploySelectors", "", "*tools", 
	"\t^ #(asJsonObject convertToJson:atKey:)",
	null, "2014-01-17T20:12:59Z", "mp");

jst.JSON.addMethod("rawObjectClass:", "aClass", "accessing", 
	"\trawObjectClass := aClass",
	null, "2012-06-08T15:30:42Z", "mp");

jst.JSON.addMethod("rawObjectClass", "", "accessing", 
	"\t^ rawObjectClass",
	null, "2012-06-08T15:30:50Z", "mp");

jst.JSON._class.addMethod("initialize", "", "class initialization", 
	"\tdefault := self wrap: self asJsObject." +
	"\n\tfull := self new rawObjectClass: Dictionary",
	null, "2012-06-08T15:44:14Z", "mp");

jst.initializeClass(jst.JSON);

jst.JSON._class.addMethod("default", "", "accessing", 
	"\t^ default",
	 "__default", "2012-04-20T06:45:09Z", "mp");

jst.JSON._class.addMethod("full", "", "accessing", 
	"\t^ full",
	null, "2012-06-08T15:42:03Z", "mp");

/*
jst.JSON.addMethod("encode:", "anObject", "converting", 
	"\t^ self asJsObject perform: #stringify " +
	"\n\t\twith: anObject " +
	"\n\t\twith: [:k :v | " +
	"\n\t\t\t\"Console log: k->v.\"" +
	"\n\t\t\t(k isEmpty | (k startsWith: '_'))" +
	"\n\t\t\t\tifTrue: [self encodeJsonObject: v]" +
	"\n\t\t\t\tifFalse: [v]]",
	null, "2012-04-21T13:02:30Z", "mp");
*/

jst.JSON.addMethod("encode:", "anObject", "converting", 
	"\t^ self asJsObject perform: #stringify with: (self convertToJson: anObject atKey: nil)",
	null, "2013-01-11T15:42:59Z", "mp");

jst.JSON.addMethod("decode:", "jsonString", "converting", 
	"\t^ self asJsObject perform: #parse " +
	"\n\t\twith: jsonString " +
	"\n\t\twith: [:k :v | k isEmpty" +
	"\n\t\t\tifTrue: [self convertFromJson: v]" +
	"\n\t\t\tifFalse: [v]]",
	null, "2012-04-22T20:56:44Z", "mp");

jst.JSON.addMethod("decodeDict:", "jsonString", "converting", 
	"\t\"return a dictionary or nil\"" +
	"\n\t| dict |" +
	"\n\tdict := self asJsObject perform: #parse with: jsonString." +
	"\n\t^ (JSObjectProxy isNeededOn: dict) ifTrue: [" +
	"\n\t\tDictionary on: dict]",
	null, "2012-05-18T13:48:46Z", "mp");

jst.JSON.addMethod("convertFromJson:", "jsonObject", "private", function (jsonObject){
	var obj = jst.Object.convertFromJson_.call(this, jsonObject);
	if (this._rawObjectClass != jst.nil && obj === jsonObject && jst.JSObjectProxy.isNeededOn_(jsonObject))
		return jst.sndw(this._rawObjectClass, "constructFromJson_", jsonObject);
	return obj;
},
	null, "2012-11-07T13:21:21Z", "mp");

// JSON extensions

jst.Object.addMethod("jsonKeys", "", "*dom", 
	"\t^ self class allInstVarNames" +
	"\n\t",
	null, "2012-04-21T18:15:50Z", "mp");
/*
jst.Object.addMethod("convertToJsonObject:", "anObject", "*dom", 
	function (anObject){
	//console.log(anObject);
	if (jst.JSObjectProxy.isNeededOn_(anObject))
		//native object 
		return anObject;
	if (anObject.jstProxy)
		return anObject.jstProxy.asJsonObject();
	return anObject.asJsonObject();
},
	null, "2012-04-21T20:47:33Z", "mp");

puvodni verze bez key:
jst.Object.addMethod("convertToJson:", "anObject", "*dom", function (anObject){
	//console.log(anObject);
	if (anObject.asJsonObject)
		return jst.snd(anObject, "asJsonObject");
	//native object 
	return anObject;
},
	null, "2012-05-16T06:38:37Z", "mp");
*/

jst.Object.addMethod("convertToJson:atKey:", "anObject aString", "*dom", 
	function (anObject,aString){
	//console.log(anObject);
	if (anObject.asJsonObject)
		return jst.snd(anObject, "asJsonObject");
	//native object 
	return anObject;
},
	null, "2013-01-11T15:41:16Z", "mp", 1);

jst.Object.addMethod("convertToJson:atKey:", "anObject aString", "*dom", 
	function (anObject,aString){
	if (anObject === "")
		//see a note in Object>>asJsonObject
		return null;
	if (anObject.asJsonObject)
		return jst.snd(anObject, "asJsonObject");
	//native object 
	return anObject;
},
	null, "2014-01-15T14:53:45Z", "mp", 2);

jst.Object.addMethod("convertToJson:atKey:", "anObject aString", "*dom", 
	function (anObject,aString){
	if (anObject === "")
		//see a note in Object>>asJsonObject
		return null;
	if (anObject && anObject.asJsonObject)
		return jst.snd(anObject, "asJsonObject");
	//native object 
	return anObject;
},
	null, "2014-03-03T11:02:42Z", "mp"); //jst-dom

jst.Object.addMethod("asJsonObject", "", "*dom", 
	function (){
	var obj = {'@class': this.className()};
	var self = this;
	this.jsonKeys().do_(function(key){
		var value = self['_'+key];
		if (value != jst.nil)
			obj[key] = jst.sndw(self, "convertToJson_atKey_", value, key);});
	return obj;		
},
	null, "2013-01-11T15:43:26Z", "mp", 1);

jst.Object.addMethod("asJsonObject", "", "*dom", 
	function (){
	var obj = {'@class': this.className()};
	var self = this;
	this.jsonKeys().do_(function(key){
		var value = jst.sndww(self, "convertToJson_atKey_", self['_'+key], key);
		//value is a native object here and therefore can be null 
		if (value != null && value != jst.nil)
			obj[key] = value;});
	return obj;		
},
	null, "2013-03-05T09:26:31Z", "mp", 1);

jst.Object.addMethod("asJsonObject", "", "*dom", 
	function (){
	var obj = {'@class': this.className()};
	var self = this;
	this.jsonKeys().do_(function(key){
		var value = jst.sndww(self, "convertToJson_atKey_", self['_'+key], key);
		//value is a native object here and therefore can be null 
		if (value !== null && value !== jst.nil)
			//an empty string or false is now accepted
			obj[key] = value;});
	return obj;		
},
	null, "2014-01-15T14:51:02Z", "mp"); //jst-dom

jst.Object.addMethod("convertFromJson:", "jsonObject", "*dom", function (jsonObject){
	if (!jsonObject || jsonObject == jst.nil)
		return jst.nil;
	if (jsonObject['@block'])
		return this.doIt_(jsonObject['@block']);
	if (jsonObject['@Class'])
		return jst.Smalltalk.classNamed_(jsonObject['@Class']);
	if (jsonObject['@class'])
		return jst.sndw(
			jst.Smalltalk.classNamed_(jsonObject['@class']),
			"constructFromJson_",
			jst.Dictionary.on_(jsonObject));
	return jsonObject;
},
	null, "2012-04-24T11:27:49Z", "mp", 1);

jst.Object.addMethod("convertFromJson:", "jsonObject", "*dom", 
	function (jsonObject){
	if (!jsonObject || jsonObject == jst.nil)
		return jst.nil;
	if (jsonObject['@block'])
		return this.doIt_(jsonObject['@block']);
	if (jsonObject['@Class'])
		return jst.Smalltalk.classNamed_(jsonObject['@Class']);
	if (jsonObject['@class'])
		return jst.sndw(
			jst.Smalltalk.classNamed_(jsonObject['@class']),
			"constructFromJson_", jsonObject);
	if (jsonObject['@DT'])
		return jst.DateAndTime.fromString_(jsonObject['@DT']);
	if (jsonObject['@Date'])
		return jst.Date.fromString_(jsonObject['@Date']);
	if (jsonObject._class == jst.SequenceableCollection) {
		//raw javascript array
		var self = this;
		return jst.sndw(jsonObject, "collect_", function(ea){
			return jst.sndw(self, "convertFromJson_", ea);});
	};
	return jsonObject;
},
	null, "2012-11-07T14:32:43Z", "mp", 1);

jst.Object.addMethod("convertFromJson:", "jsonObject", "*dom", 
	function (jsonObject){
	if (jsonObject == null || jsonObject === jst.nil)
		return jst.nil;
	if (jsonObject['@block'])
		return this.doIt_(jsonObject['@block']);
	if (jsonObject['@Class'])
		return jst.Smalltalk.classNamed_(jsonObject['@Class']);
	if (jsonObject['@class'])
		return jst.sndw(
			jst.Smalltalk.classNamed_(jsonObject['@class']),
			"constructFromJson_", jsonObject);
	if (jsonObject['@DT'])
		return jst.DateAndTime.fromString_(jsonObject['@DT']);
	if (jsonObject['@Date'])
		return jst.Date.fromString_(jsonObject['@Date']);
	if (jsonObject._class == jst.SequenceableCollection) {
		//raw javascript array
		var self = this;
		return jst.sndw(jsonObject, "collect_", function(ea){
			return jst.sndw(self, "convertFromJson_", ea);});
	};
	return jsonObject;
},
	null, "2014-01-15T20:35:28Z", "mp"); //jst-dom

/*
jst.Object._class.addMethod("constructFromJson:", "jsonDict", "*dom", 
	function (jsonDict){
	var obj = this._new();
	obj.jsonKeys().do_(function(key){
		if (jsonDict.includesKey_('_'+key))
			obj.instVarNamed_put_(key,
				obj.convertFromJson_(jsonDict.at_('_'+key)));
		else if (jsonDict.includesKey_(key))
			obj.instVarNamed_put_(key,
				obj.convertFromJson_(jsonDict.at_(key)));
	});
	return obj;		
},
	null, "2012-05-15T18:55:11Z", "mp");
*/

jst.Object.addMethod("convertFromJson:instVar:", "jsonObject aString", "*dom", 
	function (jsonObject,aString){
	return this.instVarNamed_put_(aString, 
		this.convertFromJson_(jsonObject));
},
	null, "2014-02-28T11:35:06Z", "mp"); //jst-core

jst.Object._class.addMethod("constructFromJson:", "jsonObject", "*dom", function (jsonObject){
	var obj = this._new();
	obj.jsonKeys().do_(function(key){
		if (key in jsonObject)
			obj.instVarNamed_put_(key,
				obj.convertFromJson_(jsonObject[key]));
		else if ("_"+key in jsonObject)
			obj.instVarNamed_put_(key,
				obj.convertFromJson_(jsonObject["_"+key]));
	});
	return obj;		
},
	null, "2012-11-07T13:51:15Z", "mp", 1);

jst.Object._class.addMethod("constructFromJson:", "jsonObject", "*dom", 
	function (jsonObject){
	var obj = this._new();
	obj.jsonKeys().do_(function(key){
		if (key in jsonObject)
			obj.convertFromJson_instVar_(jsonObject[key], key);
		else if ("_"+key in jsonObject)
			obj.convertFromJson_instVar_(jsonObject["_"+key], key);
	});
	return obj;		
},
	null, "2014-02-28T11:36:07Z", "mp"); //jst-dom

/* nema smysl - Url s parametry nic nedela
jst.Object.addMethod("asUrlParameter", "", "*dom", 
	"\t^ String streamContents: [:s | " +
	"\n\t\tUrl encodeParameter: self on: s]",
	null, "2013-04-04T21:13:44Z", "mp");

jst.Dictionary.addMethod("asJsonObject", "", "*dom", function (){
	return jst.Object.constructor.prototype.asJsonObject.call(this);
},
	null, "2012-04-21T19:48:51Z", "mp");
*/

jst.Dictionary.addMethod("asJsonObject", "", "*dom", 
	"\t| newMap |" +
	"\n\tnewMap := Dictionary new." +
	"\n\tself keysAndValuesDo: [:key :value |" +
	"\n\t\tnewMap at: key put: (self convertToJson: value atKey: key)]." +
	"\n\t^ (Dictionary on: super asJsonObject)" +
	"\n\t\tat: 'map' put: newMap asJsObject;" +
	"\n\t\tasJsObject",
	null, "2013-01-11T15:42:13Z", "mp");

/*
jst.Dictionary.addMethod("convertFromJson:", "jsonObject", "*dom", 
	function (jsonObject){
	var obj = jst.Object.convertFromJson_.call(this, jsonObject);
	if (obj === jsonObject && jst.JSObjectProxy.isNeededOn_(jsonObject))
		return this.klass().constructFromJson_(obj);
	return obj;
},
	null, "2012-05-27T14:12:01Z", "mp");
*/

jst.Dictionary.addMethod("convertFromJson:", "jsonObject", "*dom", function (jsonObject){
	var obj = jst.Object.convertFromJson_.call(this, jsonObject);
	if (obj === jsonObject && jst.JSObjectProxy.isNeededOn_(jsonObject))
		return this.klass().constructFromJson_(jsonObject);
	return obj;
},
	null, "2012-11-05T13:07:40Z", "mp");

jst.Dictionary.addMethod("convertFromJson:atKey:", "jsonObject aString", "*dom", 
	"\t^ self convertFromJson: jsonObject",
	null, "2012-06-10T18:54:32Z", "mp");

/*

jst.Dictionary._class.addMethod("constructFromJson:", "jsonDict", "*dom", 
	"\t| dict |" +
	"\n\tdict := super constructFromJson: jsonDict." +
	"\n\tdict instVarNamed: 'map' put: (jsonDict at: 'map')." +
	"\n\tdict keysAndValuesDo: [:key :val |" +
	"\n\t\tdict at: key put: (dict convertFromJson: val atKey: key)]." +
	"\n\t^ dict",
	null, "2012-11-05T13:03:40Z", "mp");
*/

jst.Dictionary.addMethod("jsonKeys", "", "*dom", 
	"\t^ super jsonKeys copyWithout: #map",
	null, "2012-11-05T12:58:20Z", "mp");

jst.Dictionary._class.addMethod("constructFromJson:", "jsonObject", "*dom", function (jsonObject){
	var dict;
	if (jsonObject["@class"] && jsonObject.map) {
		dict = jst.Object.constructFromJson_.call(this, jsonObject);
		dict._map = jsonObject.map;
	} 
	else
		dict = this.on_(jsonObject);
	dict.keysAndValuesDo_(function(key, value) {
		dict.at_put_(key, jst.sndww(dict, "convertFromJson_atKey_", value, key));});
	return dict;
},
	null, "2012-11-07T15:55:35Z", "mp");

jst.Behavior.addMethod("asJsonObject", "", "*dom", 
	"\t^ Dictionary new" +
	"\n\t\tat: '@Class' put: self name;" +
	"\n\t\tasJsObject",
	null, "2012-04-21T21:30:17Z", "mp");

/*
jst.SequenceableCollection.addMethod("asJsonObject", "", "*dom", 
	"\t^ (Dictionary on: super asJsonObject)" +
	"\n\t\tat: '@data' put: (self collect: [:o | o asJsonObject]);" +
	"\n\t\tasJsObject",
	null, "2012-04-21T19:06:51Z", "mp");

jst.SequenceableCollection.addMethod("asJsonObject", "", "*dom", 
	"\tself class == SequenceableCollection ifTrue: [" +
	"\n\t\t^ self]." +
	"\n\t^ (Dictionary on: super asJsonObject)" +
	"\n\t\tat: '@data' put: (self collect: [:o | o asJsonObject]);" +
	"\n\t\tasJsObject",
	null, "2012-06-07T08:20:38Z", "mp");

jst.SequenceableCollection.addMethod("asJsonObject", "", "*dom", 
	"\tself class == SequenceableCollection | (self class == Array) ifTrue: [" +
	"\n\t\t^ self]." +
	"\n\t^ (Dictionary on: super asJsonObject)" +
	"\n\t\tat: '@data' put: (self collect: [:o | o asJsonObject]);" +
	"\n\t\tasJsObject",
	null, "2012-08-03T11:53:03Z", "mp"); //jst-dom
*/

jst.SequenceableCollection.addMethod("asJsonObject", "", "*dom", 
	"\t^ self class == SequenceableCollection | (self class == Array) " +
	"\n\t\tifTrue: [(self collect: [:o | o asJsonObject]) asJsArray]" +
	"\n\t\tifFalse: [(Dictionary on: super asJsonObject)" +
	"\n\t\t\tat: '@data' put: (self collect: [:o | o asJsonObject]);" +
	"\n\t\t\tasJsObject]",
	null, "2012-08-03T20:31:21Z", "mp");

jst.SequenceableCollection._class.addMethod("constructFromJson:", "jsonObject", "*dom", 
	function (jsonObject){
	var coll = jst.Object.constructFromJson_.call(this, jsonObject);
	var stream = jst.WriteStream.on_(coll);
	(jsonObject["@data"]).do_(function(ea) {
		stream.nextPut_(jst.sndw(coll, "convertFromJson_", ea));});
	return stream.contents();
},
	null, "2012-11-07T14:40:05Z", "mp");

jst.SortedCollection._class.addMethod("constructFromJson:", "jsonObject", "*dom", 
	function (jsonObject){
	var coll = jst.Object.constructFromJson_.call(this, jsonObject);
	(jsonObject["@data"]).do_(function(ea) {
		coll.add_(jst.sndw(coll, "convertFromJson_", ea));});
	return coll;
},
	null, "2012-11-07T14:40:22Z", "mp");

jst.UndefinedObject.addMethod("asJsonObject", "", "*dom", 
	"\t\"return null\"" +
	"\n\t^ self asJsObject",
	null, "2012-04-21T19:54:25Z", "mp");

jst.String.addMethod("asJsonObject", "", "*dom", 
	"\t^ self yourself",
	null, "2012-04-21T19:13:14Z", "mp");

jst.Number.addMethod("asJsonObject", "", "*dom", 
	"\t^ self yourself",
	null, "2012-04-21T19:15:08Z", "mp");

jst.Boolean.addMethod("asJsonObject", "", "*dom", 
	"\t^ self yourself",
	null, "2012-04-21T19:12:30Z", "mp");

jst.JSObjectProxy.addMethod("asJsonObject", "", "*dom", 
	"\t\"return null\"" +
	"\n\t^ nil asJsObject",
	null, "2012-04-21T19:56:02Z", "mp");

jst.DateAndTime.addMethod("asJsonObject", "", "*dom", 
	"\t^ (Dictionary on: super asJsonObject)" +
	"\n\t\tat: '@ISOString' put: self asISOString;" +
	"\n\t\tasJsObject",
	null, "2012-04-21T21:03:07Z", "mp");

jst.DateAndTime._class.addMethod("constructFromJson:", "jsonObject", "*dom", function (jsonObject){
	return this.fromString_(jsonObject["@ISOString"]);
},
	null, "2012-11-07T13:56:24Z", "mp");

jst.Date.addMethod("asJsonObject", "", "*dom", 
	"\t^ Dictionary new" +
	"\n\t\tat: '@Date' put: self yyyymmdd;" +
	"\n\t\tasJsObject",
	null, "2013-03-28T09:07:24Z", "mp");

jst.BlockClosure.addMethod("asJsonObject", "", "*dom", 
	"\t^ Dictionary new" +
	"\n\t\tat: '@block' put: self printString;" +
	"\n\t\tasJsObject",
	null, "2012-04-21T21:56:42Z", "mp");

jst.Method.addMethod("jsonKeys", "", "*dom", 
	"\t^ #(receiver selector)",
	null, "2012-05-15T20:46:28Z", "mp");

jst.Method._class.addMethod("constructFromJson:", "jsonObject", "*dom", 
	"\t| tmp |" +
	"\n\ttmp := super constructFromJson: jsonObject." +
	"\n\t^ tmp receiver lookupSelector: tmp selector",
	null, "2012-11-07T13:57:51Z", "mp");

jst.ClassCategory._class.addMethod("constructFromJson:", "jsonObject", "*dom", 
	"\t| cat |" +
	"\n\tcat := super constructFromJson: jsonObject." +
	"\n\t^ (Smalltalk at: #categories) " +
	"\n\t\tdetect: [:c | c name = cat name] " +
	"\n\t\tifNone: cat" +
	"\n\t",
	null, "2012-11-07T13:55:16Z", "mp");

jst.MethodCategory._class.addMethod("constructFromJson:", "jsonObject", "*dom", 
	"\t| cat |" +
	"\n\tcat := super constructFromJson: jsonObject." +
	"\n\t^ cat subject methodCategories " +
	"\n\t\tdetect: [:c | c name = cat name] " +
	"\n\t\tifNone: cat" +
	"\n\t",
	null, "2012-11-07T13:58:04Z", "mp");

jst.Model.addMethod("jsonKeys", "", "*dom", 
	"\t^ super jsonKeys copyWithout: #dependents",
	null, "2012-04-26T13:51:07Z", "mp");
