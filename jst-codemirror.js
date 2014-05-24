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
 * Wrapper classes for CodeMirror editor (version 2.12), see http://codemirror.net/
 * 
 * Required CodeMirror files: 
 * /lib/codemirror.js
 * /lib/codemirror.css
 * /mode/javascript/javascript.js
 * /theme/default.css
 *
 * codemirror-jsmalltalk.js is used instead of original theme /mode/smalltalk/smalltalk.js
 * (it is a slightly modified version of the original file)
 * JSmalltalk specific theme for CodeMirror is part of jst-styles.css file
 * 
 * Depends on jst-core, jst-core-proxy, jst-parser, jst-kernel
 */

// *** CodeMirrorLines ***

jst.currentJsFile = "jst-codemirror";

// CLASSES

jst.Model.subclass("CodeMirror", "config obj silent elementEvents searchCursor lines", "", "", "DOM-Util");

jst.Object.subclass("CodeMirrorLines", "obj", "", "", "DOM-Util");

// METHODS

// *** CodeMirrorLines ***

jst.CodeMirrorLines.addMethod("on:", "jsObject", "accessing", 
	"\tobj := jsObject",
	null, "2012-02-08T14:27:54Z", "mp");

jst.CodeMirrorLines.addMethod("size", "", "accessing", 
	"\t^ obj lineCount",
	null, "2012-02-08T14:28:07Z", "mp");

jst.CodeMirrorLines.addMethod("at:", "index", "accessing", 
	"\t^ obj perform: #getLine with: index",
	null, "2012-02-08T14:50:47Z", "mp");

jst.CodeMirrorLines.addMethod("at:put:", "index aString", "accessing", 
	"\t^ obj perform: #setLine with: index with: aString",
	null, "2012-02-08T14:51:33Z", "mp");

jst.CodeMirrorLines.addMethod("removeAt:", "index", "accessing", 
	"\t^ obj perform: #removeLine with: index",
	null, "2012-02-08T14:52:26Z", "mp");

// *** CodeMirror ***

jst.CodeMirror.addMethod("asJsObject", "", "conversion", "\t^ obj");

jst.CodeMirror.addMethod("initialize", "", "initialization", 
	"\tconfig := Dictionary new." +
	"\n\tsilent := false",
	null, "2011-10-27T13:26:49Z", "mp");

jst.CodeMirror.addMethod("optionAt:put:", "optionName anObject", "private", 
	"\tobj " +
	"\n\t\tifNil: [config at: optionName put: anObject]" +
	"\n\t\tifNotNil: [obj perform: #setOption with: optionName with: anObject]",
	null, "2011-10-27T12:25:00Z", "mp");

jst.CodeMirror.addMethod("at:get:", "optionName fceName", "private", 
	"\t^ obj" +
	"\n\t\tifNil: [config at: optionName ifAbsent: nil] " +
	"\n\t\tifNotNil: [obj perform: fceName]",
	null, "2011-10-27T13:47:40Z", "mp");

jst.CodeMirror.addMethod("startValue", "", "accessing-options", 
	"\t^ config at: #value ifAbsent: nil",
	null, "2011-10-27T13:49:22Z", "mp");

jst.CodeMirror.addMethod("at:by:put:", "optionName fceName anObject", "private", 
	"\tobj" +
	"\n\t\tifNil: [config at: optionName put: anObject]" +
	"\n\t\tifNotNil: [obj perform: fceName with: anObject asJsObject]",
	null, "2011-10-27T12:46:45Z", "mp");

jst.CodeMirror.addMethod("value", "", "accessing", 
	"\t^ self at: #value get: #getValue",
	null, "2011-10-27T12:51:50Z", "mp");

jst.CodeMirror.addMethod("value:", "anObject", "accessing", 
	"\tself at: #value by: #setValue put: anObject." +
	"\n\tsearchCursor := nil",
	null, "2011-11-16T15:18:24Z", "mp");
/*
jst.CodeMirror.addMethod("get:default:", "attName anObject", "private", 
	"\t^ obj " +
	"\n\t\tifNotNil: [obj perform: attName] " +
	"\n\t\tifNil: [anObject value \"anObject can be a block too\"]",
	null, "2011-10-27T12:56:55Z", "mp");
*/
jst.CodeMirror.addMethod("get:default:", "attName anObject", "private", 
	"\t^ obj " +
	"\n\t\tifNotNil: [obj at: attName] " +
	"\n\t\tifNil: [anObject value \"anObject can be a block too\"]",
	null, "2012-02-22T13:14:40Z", "mp");

jst.CodeMirror.addMethod("onChange:", "aBlock", "events", 
	"\tself " +
	"\n\t\toptionAt: #onChange " +
	"\n\t\tput: [silent ifFalse: [aBlock value: self]]",
	null, "2011-10-27T13:42:38Z", "mp");

jst.CodeMirror.addMethod("isDirty", "", "testing", 
	"\t^ self startValue ~= self value",
	null, "2011-10-27T13:45:06Z", "mp");

jst.CodeMirror.addMethod("resetContents:", "anObject", "initialization", 
	"\tconfig at: #value put: anObject." +
	"\n\tobj ifNotNil: [" +
	"\n\t\tsilent := true." +
	"\n\t \t[self value: anObject] ensure: [" +
	"\n\t\t\tsilent := false]]",
	null, "2011-10-27T14:51:02Z", "mp");

jst.CodeMirror.addMethod("reset", "", "initialization", 
	"\tself resetContents: self startValue",
	null, "2011-10-27T14:31:43Z", "mp");

jst.CodeMirror.addMethod("optionAt:default:", "optionName anObject", "private", 
	"\t^ obj " +
	"\n\t\tifNil: [config at: optionName ifAbsent: [anObject value]]" +
	"\n\t\tifNotNil: [obj perform: #getOption with: optionName]",
	null, "2011-10-27T22:05:27Z", "mp");

jst.CodeMirror.addMethod("mode", "", "accessing-options", 
	"\t^ self optionAt: #mode default: nil",
	null, "2011-10-27T22:08:19Z", "mp");

jst.CodeMirror.addMethod("mode:", "anObject", "accessing-options", 
	"\tself optionAt: #mode put: anObject",
	null, "2011-10-27T22:09:06Z", "mp");

jst.CodeMirror.addMethod("theme:", "aSymbol", "accessing-options", 
	"\tself optionAt: #theme put: aSymbol",
	null, "2011-10-27T22:10:18Z", "mp");

jst.CodeMirror.addMethod("theme", "", "accessing-options", 
	"\t^ self optionAt: #theme",
	null, "2011-10-27T22:11:24Z", "mp");

jst.CodeMirror.addMethod("indentUnit", "", "accessing-options", 
	"\t^ self optionAt: #indentUnit default: 2",
	null, "2011-10-27T22:13:02Z", "mp");

jst.CodeMirror.addMethod("indentUnit:", "anInteger", "accessing-options", 
	"\tself optionAt: #indentUnit put: anInteger",
	null, "2011-10-27T22:13:19Z", "mp");

jst.CodeMirror.addMethod("indentWithTabs", "", "accessing-options", 
	"\t^ self optionAt: #indentWithTabs default: false",
	null, "2011-10-27T22:16:43Z", "mp");

jst.CodeMirror.addMethod("indentWithTabs:", "aBoolean", "accessing-options", 
	"\tself optionAt: #indentWithTabs put: aBoolean",
	null, "2011-10-27T22:17:31Z", "mp");

jst.CodeMirror.addMethod("lineNumbers", "", "accessing-options", 
	"\t^ self optionAt: #lineNumbers default: false",
	null, "2011-10-27T22:16:43Z", "mp");

jst.CodeMirror.addMethod("lineNumbers:", "aBoolean", "accessing-options", 
	"\t\"Whether to show line numbers to the left of the editor.\"" +
	"\n\tself optionAt: #lineNumbers put: aBoolean",
	null, "2012-02-08T15:15:31Z", "mp");

jst.CodeMirror.addMethod("electricChars:", "aBoolean", "accessing-options", 
	"\t\"Configures whether the editor should re-indent the current line" +
	"\n\twhen a character is typed that might change its proper indentation" +
	"\n\t(only works if the mode supports indentation)\"" +
	"\n\tself optionAt: #electricChars put: aBoolean",
	null, "2012-02-08T15:12:18Z", "mp");

jst.CodeMirror.addMethod("electricChars", "", "accessing-options", 
	"\t^ self optionAt: #electricChars default: true",
	null, "2012-02-08T15:12:51Z", "mp");

jst.CodeMirror.addMethod("matchBrackets", "", "accessing-options", 
	"\t^ self optionAt: #matchBrackets default: false",
	null, "2011-10-27T22:16:43Z", "mp");

jst.CodeMirror.addMethod("matchBrackets:", "aBoolean", "accessing-options", 
	"\tself optionAt: #matchBrackets put: aBoolean",
	null, "2011-10-27T22:17:31Z", "mp");

jst.CodeMirror.addMethod("element", "", "accessing", 
	"\t^ obj getWrapperElement",
	null, "2011-10-28T21:45:17Z", "mp");

jst.CodeMirror.addMethod("replace:", "anElement", "initialization", 
	function (anElement){
	var self = this;
	self.wrap_(self._obj = CodeMirror(
		function(elt) {
			//anElement.asJsObject().jstProxy.perform_with_("replaceWith", elt);
			anElement.asJsObject().replaceWith(elt);
			if (self._elementEvents != jst.nil)
				self._elementEvents.keysAndValuesDo_(function(eventName, aBlock){
					elt[eventName] = aBlock;
				});
		}, 
		self._config.asJsObject()));
	self._lines = jst.CodeMirrorLines._new().on_(self._obj);
	return self;
},
	null, "2012-03-24T07:00:57Z", "mp");

jst.CodeMirror.addMethod("lines", "", "accessing", 
	"\t^ lines",
	null, "2012-02-08T14:49:20Z", "mp");

jst.CodeMirror.addMethod("tabMode:", "aSymbol", "accessing-options", 
	"\t\"#classic (default) #shift #indent #default\"" +
	"\n\tself optionAt: #tabMode put: aSymbol",
	null, "2011-10-29T19:03:27Z", "mp");

jst.CodeMirror.addMethod("tabMode", "", "accessing-options", 
	"\t^ self get: #tabMode default: #classic",
	null, "2011-10-29T19:04:41Z", "mp");

jst.CodeMirror.addMethod("tabSize:", "anInteger", "accessing-options", 
	"\tself optionAt: #tabSize put: anInteger",
	null, "2012-01-06T22:24:41Z", "mp");

jst.CodeMirror.addMethod("tabSize", "", "accessing-options", 
	"\t^ self get: #tabSize default: 4",
	null, "2012-01-06T22:25:18Z", "mp");

jst.CodeMirror.addMethod("enterMode:", "aSymbol", "accessing-options", 
	"\t\"#indent (default) #keep #flat\"" +
	"\n\tself optionAt: #enterMode put: aSymbol",
	null, "2011-10-29T19:07:56Z", "mp");

jst.CodeMirror.addMethod("enterMode", "", "accessing-options", 
	"\t^ self optionAt: #enterMode default: #indent",
	null, "2011-10-29T21:35:11Z", "mp");

jst.CodeMirror.addMethod("lineWrapping", "", "accessing-options", 
	"\t^ self get: #lineWrapping default: false",
	null, "2012-01-07T15:25:51Z", "mp");

jst.CodeMirror.addMethod("lineWrapping:", "aBoolean", "accessing-options", 
	"\tself optionAt: #lineWrapping put: aBoolean",
	null, "2012-01-07T15:26:04Z", "mp");

jst.CodeMirror.addMethod("elementEventAt:put:", "name aBlock", "private", 
	"\tobj ifNotNil: [" +
	"\n\t\tself element perform: name with: aBlock]." +
	"\n\telementEvents ifNil: [" +
	"\n\t\telementEvents := Dictionary new]." +
	"\n\telementEvents at: name put: aBlock");

jst.CodeMirror.addMethod("onContextMenu:", "aBlock", "events", 
	"\tself elementEventAt: #oncontextmenu put: [:ev | aBlock value: ev]",
	null, "2011-10-29T22:11:55Z", "mp");

jst.CodeMirror.addMethod("onFocus:", "aBlock", "events", 
	"\tself " +
	"\n\t\toptionAt: #onFocus" +
	"\n\t\tput: [silent ifFalse: [aBlock value: self]]",
	null, "2011-11-01T09:22:52Z", "mp");

jst.CodeMirror.addMethod("focus", "", "rendering", 
	"\tsilent := true." +
	"\n \t[obj focus] ensure: [" +
	"\n\t\tsilent := false]",
	null, "2011-11-01T09:25:29Z", "mp");

jst.CodeMirror.addMethod("onClick:", "aBlock", "events", 
	"\tself elementEventAt: #onclick put: [:ev | aBlock value: ev]",
	null, "2011-11-01T09:38:20Z", "mp");

jst.CodeMirror.addMethod("find:", "aString", "text selection", 
	function (aString){
	this._searchCursor = this._obj.getSearchCursor(aString, {line: 0, ch: 0}, true);
	if (this._searchCursor.findNext()) {
		this._obj.setSelection(this._searchCursor.from(), this._searchCursor.to());
		return true;
	};
	return false;
},
	null, "2011-11-16T14:53:52Z", "mp");

jst.CodeMirror.addMethod("findNext", "", "text selection", 
	function (){
	if (this._searchCursor != jst.nil && this._searchCursor.findNext()) {
		this._obj.setSelection(this._searchCursor.from(), this._searchCursor.to());
		return true;
	};
	return false;
},
	null, "2011-11-16T14:59:26Z", "mp");

jst.CodeMirror.addMethod("findPrevious", "", "text selection", function (){
	if (this._searchCursor != jst.nil && this._searchCursor.findPrevious()) {
		this._obj.setSelection(this._searchCursor.from(), this._searchCursor.to());
		return true;
	};
	return false;
},
	null, "2011-11-16T15:00:29Z", "mp");

jst.CodeMirror.addMethod("somethingSelected", "", "text selection", 
	"\t^ obj somethingSelected",
	null, "2012-01-10T15:21:03Z", "mp");

jst.CodeMirror.addMethod("selection", "", "text selection", 
	"\t^ obj getSelection",
	null, "2012-01-10T15:21:52Z", "mp");

jst.CodeMirror.addMethod("replaceSelection:", "aString", "text selection", 
	"\tobj perform: #replaceSelection with: aString",
	null, "2012-01-10T15:22:35Z", "mp");

jst.CodeMirror.addMethod("markText:with:from:firstMatch:", "aString cssClass lineChar aBoolean", "text selection", 
function (aString,cssClass,lineChar,aBoolean){
	var start = lineChar.asJsObject(); //can be a point or an collection
	var c = this._obj.getSearchCursor(aString, {line: start[0]-1, ch: start[1]-1}, true);
	while (c.findNext()) {
		this._obj.markText(c.from(), c.to(), cssClass);
		if (aBoolean)
			break;
	};
	return this;
},
	null, "2013-05-30T20:34:29Z", "mp"); //jst-codemirror

/*
jst.CodeMirror.addMethod("markText:with:", "aString cssClass", "text selection", function (aString,cssClass){
	var c = this._obj.getSearchCursor(aString, {line: 0, ch: 0}, true);
	while (c.findNext())
		this._obj.markText(c.from(), c.to(), cssClass);
	return this;
},
	null, "2011-11-21T19:18:55Z", "mp");
*/
jst.CodeMirror.addMethod("markText:with:", "aString cssClass", "text selection", 
	"\t^ self markText: aString with: cssClass from: 1 @ 1 firstMatch: false",
	null, "2013-05-30T20:35:20Z", "mp");

jst.CodeMirror.addMethod("cursorCoords", "", "accessing cursor", 
	"\t| d |" +
	"\n\td := Dictionary on: (obj perform: #cursorCoords with: false)." +
	"\n\t^ Point x: (d at: #x) y: (d at: #y)",
	null, "2011-11-23T12:10:54Z", "mp");

jst.CodeMirror.addMethod("getCursor", "", "accessing cursor", 
	"\t^ obj ifNotNil: [" +
	"\n\t\t(Dictionary on: (obj perform: #getCursor)) values]",
	null, "2013-05-30T21:22:10Z", "mp");

jst.CodeMirror.addMethod("setCursorAt:", "position", "accessing cursor", 
	"\t\"Set the cursor position. You can pass the line and the character as instance of Point or Array\"" +
	"\n\t| arr |" +
	"\n\tarr := position asJsObject." +
	"\n\tobj perform: #setCursor with: (Dictionary new" +
	"\n\t\tat: #line put: arr first;" +
	"\n\t\tat: #ch put: arr second;" +
	"\n\t\tyourself) asJsObject",
	null, "2012-02-08T22:40:48Z", "mp");

jst.CodeMirror.addMethod("undo", "", "history", 
	"\tobj undo",
	null, "2011-11-23T12:46:14Z", "mp");

jst.CodeMirror.addMethod("redo", "", "history", 
	"\tobj redo",
	null, "2011-11-23T12:46:41Z", "mp");

jst.CodeMirror.addMethod("historySize", "", "history", 
	"\t^ Dictionary on: obj historySize",
	null, "2011-11-23T12:48:32Z", "mp");

jst.CodeMirror.addMethod("clearHistory", "", "history", 
	"\tobj clearHistory",
	null, "2011-11-23T12:49:07Z", "mp");

jst.CodeMirror.addMethod("readOnly:", "aBoolean", "accessing-options", 
	"\tself optionAt: #readOnly put: aBoolean",
	null, "2012-02-15T21:34:07Z", "mp");

jst.CodeMirror.addMethod("readOnly", "", "accessing-options", 
	"\t^ self optionAt: #readOnly default: false",
	null, "2012-02-15T21:36:01Z", "mp");

jst.CodeMirror.addMethod("refresh", "", "rendering", 
	"\tobj refresh",
	null, "2012-02-22T08:56:17Z", "mp");
