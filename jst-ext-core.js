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
 * Wrapper classes for Ext JS 3.x framework (http://www.sencha.com/products/extjs3), part I
 * Required files are:
 * /resources/css/ext-all(-debug).css 
 * /adapter/ext/ext-base(-debug).js
 * /ext-all.js
 * 
 * Depends on jst-core, jst-parser, jst-kernel, jst-applications, jst-dom
 */

// *** CLASSES ***

jst.currentJsFile = "jst-ext-core";

jst.Dictionary.subclass("ExtConfig", "", "", "", "Ext-util");

jst.Model.subclass("ExtObjectWrapper", "config", "Ext", "", "Ext-util");
jst.ExtObjectWrapper.subclass("ExtObject", "obj", "", "", "Ext-util");
jst.ExtObject.subclass("ExtObservable", "listeners", "", "", "Ext-util");

jst.WrapperObject.subclass("ExtCore", "", "Current", "", "Ext-util");

jst.Object.subclass("ExtEventObject", "", "Current", "", "Ext-event");
jst.Object.subclass("ExtListener", "eventName params", "", "", "Ext-event");

jst.ExtListener.subclass("ExtDefaultListener", "", "", "", "Ext-event");
//jst.ExtListener.subclass("ExtClickListener", "", "", "", "Ext-event");

jst.ExtListener.subclass("ExtElementListener", "", "", "", "Ext-event");

//jst.ExtListener.subclass("ExtMenuClickListener", "", "", "", "Ext-event");
//jst.ExtListener.subclass("ExtToggleListener", "", "", "", "Ext-event"); //Ext-event-button
//jst.ExtListener.subclass("ExtSelectionChangeListener", "", "", "", "Ext-event");
//jst.ExtListener.subclass("ExtBeforeSelectListener", "", "", "", "Ext-event");

//jst.ExtListener.subclass("ExtBoxResizeListener", "", "", "", "Ext-event-component");
//jst.ExtListener.subclass("ExtResizeListener", "", "", "", "Ext-event-component");
//jst.ExtListener.subclass("ExtMoveListener", "", "", "", "Ext-event-window"); see ExtResizeListener
//jst.ExtListener.subclass("ExtCreateListener", "", "", "", "Ext-event-component");
//jst.ExtListener.subclass("ExtStateListener", "", "", "", "Ext-event-component");
/*
jst.ExtStateListener.subclass("ExtStateRestoreListener", "", "", "", "Ext-event-component");
jst.ExtStateListener.subclass("ExtStateSaveListener", "", "", "", "Ext-event-component");
jst.ExtStateListener.subclass("ExtBeforeStateRestoreListener", "", "", "", "Ext-event-component");
jst.ExtStateListener.subclass("ExtBeforeStateSaveListener", "", "", "", "Ext-event-component");
*/
//jst.ExtListener.subclass("ExtViewClickListener", "", "", "", "Ext-event");

jst.ExtDefaultListener.subclass("ExtDataViewListener", "", "", "", "Ext-event");
jst.ExtListener.subclass("ExtMixedCollectionListener", "", "", "", "Ext-event");

jst.WrapperObject.subclass("ExtElement", "listeners", "Events", "", "Ext");

jst.ExtObservable.subclass("ExtMixedCollection", "", "", "", "Ext-util");

jst.JSObjectProxy.subclass("ExtKeyMap", "elm config eventName", "", "", "Ext");

jst.ExtObjectWrapper.subclass("ExtRegion", "", "", "", "Ext-layout");
jst.ExtRegion.subclass("ExtSplitRegion", "", "", "", "Ext-layout");

jst.ExtObservable.subclass("ExtComponent", "element pathActivatedBlock", "", "", "Ext");
jst.ExtComponent.subclass("ExtBoxComponent", "actions menu", "", "", "Ext");
jst.ExtBoxComponent.subclass("ExtContainer", "layout centerLayout", "", "", "Ext");
jst.ExtBoxComponent.subclass("ExtDataView", "", "", "", "Ext");

jst.ExtObjectWrapper.subclass("ExtMessageBox", "", "", "", "Ext");

jst.UIManager.subclass("ExtUIManager", "", "", "", "Ext-util");

jst.Object.subclass("TaskRunner", "task", "TaskMgr", "", "Ext-util");
jst.WrapperObject.subclass("ExtComponentMgr", "", "Default", "", "Ext");

jst.ExtObjectWrapper.subclass("ExtContainerLayout", "obj", "", "", "Ext-layout");
jst.ExtContainerLayout.subclass("ExtBorderLayout", "", "", "", "Ext-layout");
jst.ExtContainerLayout.subclass("ExtFitLayout", "", "", "", "Ext-layout");
jst.ExtFitLayout.subclass("ExtAccordionLayout", "", "", "", "Ext-layout");
//jst.ExtFitLayout.subclass("ExtCardLayout", "", "", "", "Ext-layout");
jst.ExtContainerLayout.subclass("ExtBoxLayout", "", "", "", "Ext-layout");
jst.ExtBoxLayout.subclass("ExtHBoxLayout", "", "", "", "Ext-layout");
jst.ExtBoxLayout.subclass("ExtVBoxLayout", "", "", "", "Ext-layout");
jst.ExtContainerLayout.subclass("ExtTableLayout", "", "", "", "Ext-layout");
//jst.ExtContainerLayout.subclass("ExtCenterLayout", "", "", "", "Ext-layout");

jst.Object.subclass("ExtAction", "target selector label icon iconCls hotKey menu enabled elm tooltip", "", "", "Ext-util");
jst.ExtAction.subclass("SimpleAction", "", "", "", "Ext-util");

jst.Object.subclass("ExtJson", "", "", "", "Ext-util");

jst.ExtObjectWrapper.subclass("ExtTemplate", "obj html", "", "", "Ext");
jst.ExtTemplate.subclass("ExtXTemplate", "", "", "", "Ext");

jst.Object.subclass("ExtQuickTips", "", "", "", "Ext");
jst.ExtObject.subclass("ExtLoadMask", "", "", "", "Ext");

jst.ExtObservable.subclass("ExtHistory", "adding tokenName", "", "", "Ext");
jst.ExtListener.subclass("ExtHistoryListener", "", "", "", "Ext-event");

jst.Object.subclass("ExtFormat", "", "", "", "Ext-util");

// *** METHODS ***

// *** ExtCore ***

jst.ExtCore._class.addMethod("initialize", "", "class initialization", 
	"\tCurrent := self wrap: (Browser window at: 'Ext')",
	null, "2012-11-02T10:55:55Z", "mp");

jst.initializeClass(jst.ExtCore);

jst.ExtCore._class.addMethod("current", "", "accessing", "\t^ Current");

jst.ExtCore.addMethod("version", "", "accessing", 
	"\t^ obj at: #version",
	null, "2012-01-20T23:03:45Z", "mp");

jst.ExtCore.addMethod("nextId", "", "accessing", 
	"\t^ obj perform: #id",
	null, "2012-04-12T14:57:14Z", "mp");

jst.ExtCore.addMethod("nextIdPrefixed:", "aString", "accessing", 
	"\t^ obj perform: #id with: nil asJsObject with: aString",
	null, "2012-04-12T15:00:00Z", "mp");

jst.ExtCore.addMethod("enableFx", "", "accessing", 
	"\t\"True if the Ext.Fx Class is available\"" +
	"\n\t^ obj at: #enableFx",
	null, "2012-06-11T14:07:36Z", "mp");

jst.ExtCore.addMethod("isGecko", "", "testing", 
	"\t^ obj at: #isGecko",
	null, "2012-10-17T13:51:29Z", "mp");

jst.ExtCore.addMethod("isIE", "", "testing", 
	"\t^ obj at: #isIE",
	null, "2012-10-17T13:52:34Z", "mp");

jst.ExtCore.addMethod("isIE:", "aBoolean", "accessing", 
	"\tobj at: #isIE put: aBoolean",
	null, "2013-08-26T08:21:45Z", "mp");

jst.ExtCore.addMethod("isIE6", "", "testing", 
	"\t^ obj at: #isIE6",
	null, "2013-08-26T08:33:32Z", "mp");

jst.ExtCore.addMethod("isIE7", "", "testing", 
	"\t^ obj at: #isIE7",
	null, "2013-08-26T08:33:38Z", "mp");

jst.ExtCore.addMethod("isIE8", "", "testing", 
	"\t^ obj at: #isIE8",
	null, "2013-08-26T08:33:44Z", "mp");

jst.ExtCore.addMethod("isIE9", "", "testing", 
	"\t^ obj at: #isIE9",
	null, "2013-08-26T08:33:50Z", "mp");

jst.ExtCore.addMethod("isOldIE", "", "testing", 
	"\t^ self isIE6 | self isIE7 | self isIE8",
	null, "2013-08-26T09:23:50Z", "mp");

jst.ExtCore.addMethod("suppressIE9PlusDuring:", "aBlock", "fixes", 
	"\t(self isIE and: [self isOldIE not]) " +
	"\n\t\tifTrue: [self isIE: false." +
	"\n\t\t\taBlock ensure: [self isIE: true]]" +
	"\n\t\tifFalse: aBlock",
	null, "2013-08-26T09:29:53Z", "mp");

jst.ExtCore.addMethod("isWebKit", "", "testing", 
	"\t^ obj at: #isWebKit",
	null, "2012-10-17T13:55:08Z", "mp");

//*** ExtEventObject ***

jst.ExtEventObject._class.addMethod("current", "", "accessing", "\t^Current");

jst.ExtEventObject.addMethod("asJsObject", "", "converting", function(){
	return Ext.EventObject;
});
jst.ExtEventObject.addMethod("charCode", "", "accessing", "\t^ self asJsObject getCharCode");
jst.ExtEventObject.addMethod("keyCode", "", "accessing", "\t^ self asJsObject getKey");

/*
jst.ExtEventObject.addMethod("pageX", "", "accessing", "\t^ self asJsObject getPageX");
jst.ExtEventObject.addMethod("pageY", "", "accessing", "\t^ self asJsObject getPageY");
jst.ExtEventObject.addMethod("getXY", "", "accessing", "\t^ Point on: (self asJsObject getXY)");
*/
jst.ExtEventObject.addMethod("getXY", "", "accessing", 
	"\t\"Gets the page coordinates of the event.\"" +
	"\n\t^ Point on: (self asJsObject getXY)",
	null, "2013-05-10T08:29:00Z", "mp");

jst.ExtEventObject.addMethod("x", "", "accessing", 
	"\t\"Gets the x coordinate of the event.\"" +
	"\n\t^ self asJsObject getPageX",
	null, "2013-05-10T08:29:58Z", "mp");

jst.ExtEventObject.addMethod("y", "", "accessing", 
	"\t\"Gets the y coordinate of the event.\"" +
	"\n\t^ self asJsObject getPageY",
	null, "2013-05-10T08:30:11Z", "mp");

jst.ExtEventObject.addMethod("preventDefault", "", "processing", "\tself asJsObject preventDefault");
jst.ExtEventObject.addMethod("stopEvent", "", "processing", "\tself asJsObject stopEvent");
jst.ExtEventObject.addMethod("stopPropagation", "", "processing", "\tself asJsObject stopPropagation");

/*
jst.ExtEventObject._class.addMethod("initialize", "", "class initialization", function (){
	this.classVarNamed_put_("Current", this.wrap_(Ext.EventObject));
	this.__Keys = "0123456789abcdefghijklmnopqrstuvwxyz";
	this.__Codes = jst.Array.adopt_(
		[48,49,50,51,52,53,54,55,56,57,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90]);
	return this;
}, null, "2012-01-26T15:22:42Z", "mp");

jst.ExtEventObject._class.addMethod("initialize", "", "class initialization", 
	"\tCurrent := self wrap: (ExtCore current asJsObject at: 'EventObject')." +
	"\n\tKeys := '0123456789abcdefghijklmnopqrstuvwxyz'." +
	"\n\tCodes := #(48 49 50 51 52 53 54 55 56 57 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 90)",
	null, "2012-09-18T19:20:16Z", "mp");
*/
jst.ExtEventObject._class.addMethod("initialize", "", "class initialization", 
	"\tCurrent := self wrap: (ExtCore current asJsObject at: 'EventObject')",
	null, "2013-09-12T06:55:12Z", "mp");

jst.initializeClass(jst.ExtEventObject);

jst.ExtEventObject.addMethod("keyChar", "", "accessing", 
	"\t| c |" +
	"\n\tc := self keyCode." +
	"\n\tCodes withIndexDo: [:ea :i | " +
	"\n\t\tea = c ifTrue: [" +
	"\n\t\t\t^ Keys at: i]]." +
	"\n\t^ nil" +
	"\n\t",
	null, "2012-01-26T15:35:00Z", "mp", 1);

jst.ExtEventObject.addMethod("keyChar", "", "accessing", 
	"\t| ix |" +
	"\n\tix := self keyCode." +
	"\n\t^ ix > 90 " +
	"\n\t\tifTrue: [" +
	"\n\t\t\tix := Codes indexOf: ix - 32." +
	"\n\t\t\tix > 0 ifTrue: [Keys at: ix]] " +
	"\n\t\tifFalse: [" +
	"\n\t\t\tix := Codes indexOf: ix." +
	"\n\t\t\tix > 0 ifTrue: [(Keys at: ix) asUppercase]]",
	null, "2013-09-11T16:11:42Z", "mp", 1);

jst.ExtEventObject.addMethod("keyChar", "", "accessing", function (){
	return String.fromCharCode(this.keyCode()).ifEmpty_(jst.nil);
},
	null, "2013-09-12T08:30:50Z", "mp"); //jst-ext-core

jst.ExtEventObject.addMethod("enterPressed", "", "special keys", 
	"\t^ self keyCode = (self asJsObject at: #ENTER)",
	null, "2012-02-15T08:37:47Z", "mp");

jst.ExtEventObject.addMethod("target", "", "accessing", 
	"\t^ DOMElement on: (self asJsObject at: #target)",
	null, "2012-06-30T21:19:29Z", "mp", 1);

jst.ExtEventObject.addMethod("target", "", "accessing", 
	"\t^ HTMLElement on: (self asJsObject at: #target)",
	null, "2013-06-19T07:37:58Z", "mp"); //jst-ext-core

jst.ExtEventObject.addMethod("ifPressed:do:", "code aBlock", "testing", 
	"\tself keyCode = (self asJsObject at: code) ifTrue: aBlock",
	null, "2013-11-15T15:13:45Z", "mp");

// *** ExtListener ***

/*
jst.ExtListener._class.addMethod("events", "", "accessing", 
	"\t^ #()",
	null, "2012-08-19T19:54:13Z", "mp");

jst.ExtListener._class.addMethod("events", "", "accessing", 
	"\t\"zatim kvuli zpetne kompatibilite\"" +
	"\n\t^ self allSelectors select: [:n |" +
	"\n\t\tn endsWith: 'Handler'] thenCollect: [:n | n allButLast: 7]",
	null, "2013-06-22T06:56:48Z", "mp");

jst.ExtListener._class.addMethod("classNamePrefix", "", "accessing", 
	"\t^ 'ext'",
	null, "2012-01-26T20:57:12Z", "mp");

-- uz se nepouziva 
jst.ExtListener._class.addMethod("eventPrefix", "", "accessing", 
	"\t^ self classNamePrefix allButFirst: 3",
	null, "2012-07-01T08:48:50Z", "mp");
	
jst.ExtListener._class.addMethod("on:do:", "eventName aBlock", "instance creation", 
	"\t| listenerClass |" +
	"\n\tlistenerClass := self classNamePrefix, eventName asLowercase, 'listener'." +
	"\n\tlistenerClass := Smalltalk detect: [:aClass :name |" +
	"\n\t\tname asLowercase = listenerClass] ifNone: nil." +
	"\n\t^ listenerClass " +
	"\n\t\tifNotNil: [listenerClass new eventName: eventName; handler: aBlock]" +
	"\n\t\tifNil: [" +
	"\n\t\t\t\"instaluje pouze zakladni tridu, pri volani handleru se neprovadi konverze parametru na JST objekty\"" +
	"\n\t\t\tself new eventName: eventName; handler: aBlock]",
	null, "2012-01-26T20:56:56Z", "mp");

jst.ExtListener._class.addMethod("on:do:", "eventName aBlock", "instance creation", 
	"\t| listenerClass |" +
	"\n\tlistenerClass := self classNamePrefix, eventName asLowercase, 'listener'." +
	"\n\tlistenerClass := ExtListener allSubclasses " +
	"\n\t\tdetect: [:aClass | aClass name asLowercase = listenerClass or: [" +
	"\n\t\t\t(aClass events includes: eventName) and: [self classNamePrefix = aClass classNamePrefix]]" +
	"\n\t\t] ifNone: nil." +
	"\n\t^ listenerClass " +
	"\n\t\tifNotNil: [listenerClass new eventName: eventName; handler: aBlock]" +
	"\n\t\tifNil: [" +
	"\n\t\t\t\"instaluje pouze zakladni tridu, pri volani handleru se neprovadi konverze parametru na JST objekty\"" +
	"\n\t\t\tself new eventName: eventName; handler: aBlock]",
	null, "2012-09-25T15:19:05Z", "mp");
*/

jst.ExtListener.addMethod("initialize", "", "initialization", "\tparams := Dictionary new");	

jst.ExtListener.addMethod("asJsObject", "", "converting", "\t^ params asJsObject");	

/*
jst.ExtListener.addMethod("eventName", "", "accessing", "\t^ eventName ifNil: [" +
	"\n\t\t\"nazev tridy musi byt ve formatu ExtXyzListener, napr. ExtClickListener\"" +
	"\n\t\t(self className copyFrom: self class classNamePrefix size + 1 to: self className size - 8) asLowercase]");	
*/
jst.ExtListener.addMethod("eventName", "", "accessing", 
	"\t^ eventName",
	null, "2013-06-22T21:22:10Z", "mp");

jst.ExtListener.addMethod("eventName:", "aString", "accessing", 
	"\teventName := aString");	

jst.ExtListener.addMethod("handlerBlock", "", "accessing", 
	"\t^ params at: #fn ifAbsent: nil",
	null, "2012-01-26T21:36:19Z", "mp");

/*
jst.ExtListener.addMethod("handler", "", "accessing", 
	"\t^ self handlerBlock",
	null, "2012-01-26T21:40:20Z", "mp", 1);
*/
jst.ExtListener.addMethod("handler", "", "accessing", 
	"\t^ (self class lookupSelector: eventName, 'Handler')" +
	"\n\t\tifNotNilDo: [:m | self perform: m selector]" +
	"\n\t\tifNil: [\"default handler\"" +
	"\n\t\t\t[:receiver | self handlerBlock  valueWithPossibleArgs: {" +
	"\n\t\t\t\treceiver jstWrapper. " +
	"\n\t\t\t\tExtEventObject current}] ]",
	null, "2013-06-22T07:11:37Z", "mp");

jst.ExtListener.addMethod("handler:", "aBlock", "accessing", "\tparams at: #fn put: aBlock");	

jst.ExtListener.addMethod("scope:", "anObject", "accessing", "\tparams at: #scope put: anObject");	
jst.ExtListener.addMethod("delay:", "aNumber", "accessing", "\tparams at: #delay put: aNumber");	
jst.ExtListener.addMethod("single:", "aBoolean", "accessing", "\tparams at: #single put: aBoolean");	
jst.ExtListener.addMethod("buffer:", "aNumber", "accessing", "\tparams at: #buffer put: aNumber");	
jst.ExtListener.addMethod("target:", "anExtObservable", "accessing", "\tparams at: #target put: anExtObservable asJsObject");

jst.ExtListener.addMethod("target:", "anExtObservable", "accessing", 
	"\tparams at: #target put: anExtObservable",
	null, "2011-10-12T10:00:48Z", "mp");

jst.ExtListener.addMethod("optionNames", "", "accessing", "\t^ #(scope delay single buffer target)");

jst.ExtListener.addMethod("options", "", "accessing", "\t| opts |\n\topts := Dictionary new." +
	"\n\tself optionNames do: [:key |" +
	"\n\t\tparams at: key ifPresent: [:opt |" +
	"\n\t\t\topts at: key put: opt]]." +
	"\n\t^ opts");	

jst.ExtListener.addMethod("arguments", "", "accessing", "\t| args |" +
	"\n\t(args := OrderedCollection new)" +
	"\n\t\tadd: self eventName;" +
	"\n\t\tadd: self handler." +
	"\n\tself options ifNotEmptyDo: [:opts |" +
	"\n\t\targs add: opts asJsObject]." +
	"\n\t^ args");	

//*** ExtElementListener ***

/*
jst.ExtElementListener._class.addMethod("classNamePrefix", "", "accessing", 
	"\t^ 'extelement'",
	null, "2012-01-26T20:57:57Z", "mp");

jst.ExtElementListener.addMethod("handler", "", "accessing", "\t^ [:event :htmlElement :options |" +
	"\n\t\t\"volani 'htmlElement jstWrapper' vraci element, ktery udalost vyvolal'\"" +
	"\n\t\tself handlerBlock value: ExtEventObject current value: htmlElement jstWrapper value: (Dictionary on: options)]");	
*/

jst.ExtElementListener.addMethod("handler", "", "accessing", 
	"\t^ [:event :htmlElement :options | " +
	"\n\t\tself handlerBlock valueWithPossibleArgs: {" +
	"\n\t\t\tExtEventObject current. " +
	"\n\t\t\tExtElement wrap: htmlElement. " +
	"\n\t\t\tDictionary on: options}]",
	null, "2012-10-04T19:02:07Z", "mp", 1);

jst.ExtElementListener.addMethod("handler", "", "accessing", 
	"\t^ [:event :htmlElement :options | " +
	"\n\t\tself handlerBlock valueWithPossibleArgs: {" +
	"\n\t\t\tExtEventObject current. " +
	"\n\t\t\tHTMLElement on: htmlElement. " +
	"\n\t\t\tDictionary on: options}]",
	null, "2013-08-19T13:21:40Z", "mp"); //jst-ext-core

jst.ExtElementListener.addMethod("optionNames", "", "accessing", 
	"\t^ super optionNames, #(delegate stopEvent preventDefault stopPropagation)");

jst.ExtElementListener.addMethod("delegate:", "aString", "accessing", 
	"\t\"A simple selector to filter the target or look for a descendant of the target.\"" +
	"\n\tparams at: #delegate put: aString");

jst.ExtElementListener.addMethod("stopEvent:", "aBoolean", "accessing",
	"\"True to stop the event. That is stop propagation, and prevent the default action.\"" +
	"\n\tparams at: #stopEvent put: aBoolean");

jst.ExtElementListener.addMethod("preventDefault:", "aBoolean", "accessing",
	"\"True to prevent the default action.\"" +
	"\n\tparams at: #preventDefault put: aBoolean");

jst.ExtElementListener.addMethod("stopPropagation:", "aBoolean", "accessing",
	"\"True to prevent event propagation.\"" +
	"\n\tparams at: #stopPropagation put: aBoolean");

//*** ExtConfig ***
/*
jst.ExtConfig.addMethod("wrapper:", "anObject", "accessing", 
	"\twrapper := anObject",
	null, "2012-04-16T18:59:27Z", "mp");

jst.ExtConfig.addMethod("asJsObject", "", "converting", 
	"\t^ (self keys " +
	"\n\t\tinject: (Dictionary new" +
	"\n\t\t\tat: #jstProxy put: (JSObjectProxy new jstWrapper: wrapper); " +
	"\n\t\t\tyourself)" +
	"\n\t\tinto: [:dict :key | dict at: key put: (self at: key) asJsObject; yourself]" +
	"\n\t) asJsObject",
	null, "2012-04-16T19:02:37Z", "mp");
*/
jst.ExtConfig.addMethod("asJsObject", "", "converting", 
	"\t^ (self keys inject: Dictionary new into: [:dict :key | " +
	"\n\t\tdict at: key put: (self at: key) asJsObject; yourself]" +
	"\n\t) asJsObject",
	null, "2011-10-12T09:22:28Z", "mp");
/* asi k nicemu
jst.ExtConfig.addMethod("asJsObject", "", "converting", 
	"\t| dict |" +
	"\n\tdict := Dictionary new." +
	"\n\t(self removeKey: #jstProxy ifAbsent: nil) ifNotNilDo: [:v |" +
	"\n\t\tdict at: #jstProxy put: v]." +
	"\n\tself keysAndValuesDo: [:k :v |" +
	"\n\t\tdict at: k put: v asJsObject]." +
	"\n\t^ dict asJsObject",
	null, "2014-01-14T20:10:22Z", "mp"); //jst-ext-core
*/

//*** ExtObjectWrapper ***

jst.ExtObjectWrapper._class.addMethod("initialize", "", "class initialization", "\tExt := ExtCore current");	

jst.initializeClass(jst.ExtObjectWrapper);

jst.ExtObjectWrapper._class.addMethod("jsClassName", "", "accessing", 
	"\t^(self category name copyReplaceAll: '-' with: '.'), '.', (self name allButFirst: 3)");	

jst.ExtObjectWrapper.addMethod("initialize", "", "initialization", 
	"\tconfig := Dictionary new",
	null, "2011-10-13T14:36:13Z", "mp");

jst.ExtObjectWrapper.addMethod("config", "", "accessing", "\t^ config");

jst.ExtObjectWrapper.addMethod("asJsObject", "", "converting", "\t^ config asJsObject"); 

jst.ExtObjectWrapper.addMethod("configAt:put:", "optionName anObject", "accessing", "\tconfig at: optionName put: anObject");	

/*
jst.ExtObjectWrapper._class.addMethod("overrideMethod:by:", "name selector", "class initialization", function (name,selector){
	var cls = this.asJsObject().prototype;
	//the original version is saved with prefix
	var fce = cls[name];
	var xName = "x" + name;
	cls[xName] = fce;
	//the original version is called, if the object (this) is not wrapped yet
	switch (fce.length) {
		case 0:
			fce = function(){
				return (this.jstProxy) ? jst.snd(this.jstProxy.jstWrapper(), selector) : this[xName]();};
			break;
		case 1:
			fce = function(a){
				return (this.jstProxy) ? jst.sndw(this.jstProxy.jstWrapper(), selector, a) : this[xName](a);};
			break;
		case 2:
			fce = function(a, b){
				return (this.jstProxy) ? jst.sndww(this.jstProxy.jstWrapper(), selector, a, b) : this[xName](a, b);};
			break;
		case 3:
			fce = function(a, b, c){
				return (this.jstProxy) ? jst.sndwww(this.jstProxy.jstWrapper(), selector, a, b, c) : this[xName](a, b, c);};
			break;
		default:
			this.error_("Cannot override method " + name + ": it has too many arguments!");
	};
	cls[name] = fce;
	return this;
},
	null, "2014-01-14T15:26:32Z", "mp");

jst.ExtObjectWrapper._class.addMethod("overrideMethod:", "name", "class initialization", 
	"\tself overrideMethod: name by: name",
	null, "2014-01-14T14:19:56Z", "mp");
*/

jst.ExtObjectWrapper.addMethod("postCopy", "", "copying", 
	"\tconfig := config copy",
	null, "2012-06-28T09:38:44Z", "mp");

jst.ExtObjectWrapper.addMethod("createJsObject", "", "private", function (){
	return this.wrap_(eval("new " + this._class.jsClassName() + "(this._config.asJsObject())"));
},
	null, "2012-03-24T20:35:45Z", "mp");

jst.ExtObjectWrapper.addMethod("keys", "", "accessing", 
	"\t\"My inspector uses this method\"" +
	"\n\t^ config keys",
	null, "2012-03-15T13:54:17Z", "mp");

jst.ExtObjectWrapper.addMethod("at:ifAbsent:", "key aBlock", "accessing", 
	"\t\"My inspector uses this method\"" +
	"\n\t^ config at: key ifAbsent: aBlock",
	null, "2012-03-15T14:59:17Z", "mp");

jst.ExtObjectWrapper._class.addMethod("asJsObject", "", "converting", function (){
	return Ext[this.category().name().copyAfter_("-")][this.name().allButFirst_(3)];
},
	null, "2013-11-22T13:11:10Z", "mp", 1);

jst.ExtObjectWrapper._class.addMethod("asJsObject", "", "converting", function (){
	var parts = this.jsClassName().findTokens_(".");
	var result = Ext;
	for (var i = 1; i < parts.length; i++)
		result = result[parts[i]];
	return result;
},
	null, "2014-01-14T13:02:10Z", "mp"); //jst-ext-core

//*** ExtElement ***

jst.ExtElement._class.addMethod("initialize", "", "class initialization", 
	"\tEvents := #(abort blur change click contextmenu dblclick error focus keydown keypress keyup load" +
	"\n\t\tmousedown mouseenter mouseleave mousemove mouseout mouseover mouseup reset resize scroll select submit unload)");

jst.initializeClass(jst.ExtElement);

jst.ExtElement.addMethod("eventNames", "", "accessing", "\t^ Events"); 

jst.ExtElement.addMethod("eventNamesDo:", "aBlock", "enumerating", "\tEvents do: aBlock");

/*
jst.ExtElement._class.addMethod("on:", "jsElement", "accessing", function(jsElement){
	if (!jsElement._jstWrapper) {
		//novou instanci vyrobi jen poprve
		this._new().wrap_(jsElement)._jstWrapper._el = jsElement;
		//zatim pro HTMLElement
		jsElement._jstWrapper.wrap_(jsElement.dom);
	};
	return jsElement.jstWrapper();
});
*/
jst.ExtElement._class.addMethod("on:", "anObject", "instance creation", 
	function (anObject){
	//Create a new Element directly from String/HTMLElement element.  
	//Checks to see if there is already an instance of this element in the cache and if there is it returns the same instance. 
	return this.wrap_(new Ext.Element(anObject));
},
	null, "2012-12-10T15:38:37Z", "mp");

/*
jst.ExtElement.addMethod("addListener:", "anExtListener", "accessing", 
	"\tel perform: #addListener withArguments: anExtListener arguments." +
	"\n\t^ anExtListener");
*/
jst.ExtElement.addMethod("addListener:", "anExtListener", "accessing", 
	"\tobj" +
	"\n\t\tifNotNil: [obj perform: #addListener withArguments: anExtListener arguments]" +
	"\n\t\tifNil: [" +
	"\n\t\t\tlisteners ifNil: [" +
	"\n\t\t\t\tlisteners := OrderedCollection new]." +
	"\n\t\t\tlisteners add: anExtListener]." +
	"\n\t^ anExtListener",
	null);

jst.ExtElement.addMethod("installListeners", "", "private", 
	"\tlisteners ifNotNil: [listeners do: [:l |" +
	"\n\t\tself addListener: l]].",
	null);

jst.ExtElement.addMethod("appendChild:", "anElement", "child elements", 
	"\tobj perform: #appendChild with: anElement asJsObject." +
	"\n\t^ anElement",
	null, "2011-10-25T21:29:36Z", "mp");

jst.ExtElement.addMethod("replaceWith:", "anElement", "child elements", 
	"\tobj perform: #replaceWith with: anElement asJsObject." +
	"\n\t^ anElement",
	null, "2011-10-26T08:06:47Z", "mp");

jst.ExtElement.addMethod("parent", "", "accessing", 
	"\t^ obj parent",
	null, "2011-10-27T07:25:18Z", "mp");

jst.ExtElement.addMethod("addCssClass:", "aString", "accessing-styles", 
	"\tobj perform: #addClass with: aString",
	null, "2011-10-27T19:10:59Z", "mp", 1);

jst.ExtElement.addMethod("addCssClass:", "aStringOrArray", "accessing-styles", 
	"\t\"Adds one or more CSS classes to the element. Duplicate classes are automatically filtered out.\"" +
	"\n\tobj perform: #addClass with: aStringOrArray",
	null, "2013-12-20T14:34:49Z", "mp"); //jst-ext-core

jst.ExtElement.addMethod("removeCssClass:", "aString", "accessing-styles", 
	"\tobj perform: #removeClass with: aString",
	null, "2011-10-27T19:11:36Z", "mp", 1);

jst.ExtElement.addMethod("removeCssClass:", "aStringOrArray", "accessing-styles", 
	"\t\"Removes one or more CSS classes from the element.\"" +
	"\n\tobj perform: #removeClass with: aStringOrArray",
	null, "2013-12-20T14:34:11Z", "mp"); //jst-ext-core

jst.ExtElement.addMethod("on:do:", "eventName aBlock", "event handling", 
	"\tself addListener: (ExtElementListener new eventName: eventName; handler: aBlock)",
	null, "2012-01-26T21:03:11Z", "mp");

jst.ExtElement.addMethod("dom", "", "accessing", 
	"\t^ DOMElement on: (obj at: #dom)",
	null, "2012-03-16T14:18:05Z", "mp", 1);

jst.ExtElement.addMethod("dom", "", "accessing", 
	"\t^ HTMLElement on: (obj at: #dom)",
	null, "2013-06-19T07:37:13Z", "mp", 2);

jst.ExtElement.addMethod("dom", "", "accessing", 
	"\t^ obj ifNotNil: [" +
	"\n\t\tHTMLElement on: (obj at: #dom)]",
	null, "2014-03-03T21:25:23Z", "mp"); //jst-ext-core

jst.ExtElement.addMethod("id", "", "accessing", 
	"\t^ obj at: #id",
	null, "2012-12-10T15:04:04Z", "mp");

jst.ExtElement.addMethod("applyStyles:", "anObject", "accessing-styles", 
	"\t\"More flexible version of setStyle for setting style properties." +
	"\n\tstyles : String/Object/Function A style specification string, e.g. 'width:100px', or object in the form {width: '100px'}, " +
	"\n\tor a function which returns such a specification.\"" +
	"\n\tobj perform: #applyStyles with: anObject asJsObject",
	null, "2012-12-10T15:17:00Z", "mp");

//nefunguje
jst.ExtElement.addMethod("detectChild:", "aString", "enumerating", 
	"\t\"Selects a single child at any depth below this element based on the passed CSS selector " +
	"\n\t(the selector should not contain an id).\"" +
	"\n\t^ (obj perform: #child with: aString) ifNotNilDo: [:ch |" +
	"\n\t\tExtElement wrap: ch]",
	null, "2012-12-10T15:20:19Z", "mp");

jst.ExtElement.addMethod("firstChild", "", "child elements", function (){
	if (this._obj.dom.firstChild)
		return this.klass().on_(this._obj.dom.firstChild);
	else
		return jst.nil;
},
	null, "2012-12-10T16:06:22Z", "mp");

jst.ExtElement.addMethod("lastChild", "", "child elements", function (){
	if (this._obj.dom.lastChild)
		return this.klass().on_(this._obj.dom.lastChild);
	else
		return jst.nil;
},
	null, "2012-12-10T16:04:37Z", "mp");

/* nefunguje
jst.ExtElement.addMethod("selectChildren:", "aString", "enumerating", 
	"\t^ obj perform: #select with: aString with: true with: self id",
	null, "2012-12-10T15:04:19Z", "mp");
*/

jst.ExtElement.addMethod("scrollIntoView:hscroll:", "aContainer aBoolean", "as yet unclassified", 
	"\t\"Scrolls this element into view within the passed container." +
	"\n\taContainer: the container element to scroll (defaults to document.body). Should be a string (id), dom node, or Ext.Element." +
	"\n\taBoolean: False to disable horizontal scroll (defaults to true)\"" +
	"\n\t^ obj perform: #scrollIntoView with: aContainer asJsObject with: aBoolean",
	null, "2013-06-23T16:57:19Z", "mp");

jst.ExtElement.addMethod("scroll:distance:animate:", "aString anInteger anObject", "as yet unclassified", 
	"\t\"Scrolls this element the specified direction. Does bounds checking to make sure " +
	"\n\tthe scroll is within this element's scrollable range." +
	"\n\t\tdirection: Possible values are: #l (or #left), #r (or #right), #t (or #top, or #up), #b (or #bottom, or #down)." +
	"\n\t\tdistance : How far to scroll the element in pixels" +
	"\n\t\tanimate : Boolean/Object (optional) true for the default animation or a standard Element animation config object" +
	"\n\tReturns true if a scroll was triggered or false if the element was scrolled as far as it could go.\"" +
	"\n\t^ obj perform: #scroll with: aString with: anInteger with: anObject",
	null, "2014-04-03T06:24:38Z", "mp");

jst.ExtElement.addMethod("isScrollable", "", "testing", 
	"\t\"Returns true if this element is scrollable.\"" +
	"\n\t^ obj isScrollable",
	null, "2014-04-03T06:49:42Z", "mp");

//*** ExtObject ***

jst.ExtObject.addMethod("wrap:", "jsObject", "accessing", 
	"\tsuper wrap: (obj := jsObject)",
	null, "2012-09-01T21:05:16Z", "mp");

jst.ExtObject.addMethod("asJsObject", "", "converting", 
	"\tobj ifNil: [" +
	"\n\t\tself createJsObject]." +
	"\n\t^ obj",
	null, "2012-09-01T21:05:48Z", "mp");

jst.ExtObject.addMethod("configAt:put:", "optionName anObject", "private", 
	"\tobj ifNotNil: [" +
	"\n\t\tConsole log: ('Warning: Setting the config option on an initialized {1} object has no effect ({2}: {3}).' " +
	"\n\t\t\tformat: { self className. optionName. anObject})]." +
	"\n\tconfig at: optionName put: anObject",
	null, "2012-09-01T21:07:44Z", "mp");

jst.ExtObject.addMethod("initialize", "", "initialization", 
	"\tconfig := ExtConfig new",
	null, "2011-10-13T14:36:34Z", "mp");

jst.ExtObject.addMethod("at:put:", "optionName anObject", "private", 
	"\tobj" +
	"\n\t\tifNil: [config at: optionName put: anObject]" +
	"\n\t\tifNotNil: [obj at: optionName put: anObject asJsObject]",
	null, "2012-08-16T13:21:10Z", "mp");

jst.ExtObject.addMethod("at:by:put:", "optionName fceName anObject", "private", 
	"\tobj" +
	"\n\t\tifNil: [config at: optionName put: anObject]" +
	"\n\t\tifNotNil: [obj perform: fceName with: anObject asJsObject]",
	null, "2011-10-12T09:25:26Z", "mp");

jst.ExtObject.addMethod("at:", "optionName", "private", 
	"\t^ obj" +
	"\n\t\tifNil: [config at: optionName ifAbsent: nil] " +
	"\n\t\tifNotNil: [obj at: optionName]",
	null, "2012-03-10T22:49:03Z", "mp");

jst.ExtObject.addMethod("at:default:", "optionName anObject", "private", 
	"\t^ obj" +
	"\n\t\tifNil: [config at: optionName ifAbsent: anObject]" +
	"\n\t\tifNotNil: [obj at: optionName ifAbsent: anObject]",
	null, "2013-02-17T20:14:04Z", "mp");

jst.ExtObject.addMethod("at:get:default:", "optionName fceName anObject", "private", 
	"\t^ obj" +
	"\n\t\tifNil: [config at: optionName ifAbsent: anObject]" +
	"\n\t\tifNotNil: [obj perform: fceName]",
	null, "2012-02-17T21:23:42Z", "mp");

jst.ExtObject.addMethod("at:get:", "optionName fceName", "private", 
	"\t^ self at: optionName get: fceName default: nil",
	null, "2012-03-13T13:05:27Z", "mp");

jst.ExtObject.addMethod("keys", "", "accessing", 
	"\t^ obj ifNotNil: [obj keys] ifNil: [config keys]",
	null, "2012-03-15T13:54:40Z", "mp");

jst.ExtObject.addMethod("at:ifAbsent:", "key aBlock", "accessing", 
	"\t\"My inspector uses this method\"" +
	"\n\t^ obj " +
	"\n\t\tifNotNil: [obj at: key ifAbsent: aBlock] " +
	"\n\t\tifNil: [config at: key ifAbsent: aBlock]",
	null, "2012-03-15T15:04:50Z", "mp");

jst.ExtObject.addMethod("postCopy", "", "copying", 
	"\tsuper postCopy." +
	"\n\tobj := nil",
	null, "2012-09-01T21:37:59Z", "mp");

//*** ExtObservable ***

/*
jst.ExtObservable.addMethod("postCopy", "", "copying", 
	"\tsuper postCopy." +
	"\n\tobj := nil." +
	"\n\tlisteners := listeners copy",
	null, "2012-06-28T10:11:18Z", "mp");
*/

jst.ExtObservable.addMethod("postCopy", "", "copying", 
	"\tsuper postCopy." +
	"\n\tlisteners := listeners copy",
	null, "2012-09-01T21:37:50Z", "mp");

jst.ExtObservable.addMethod("asJsObject", "", "converting", 
	"\tobj ifNil: [" +
	"\n\t\tself createJsObject." +
	"\n\t\tself installListeners]." +
	"\n\t^ obj",
	null, "2011-12-01T10:18:30Z", "mp");

jst.ExtObservable.addMethod("eventNames", "", "accessing", "\t| list |" +
	"\n\tlist := OrderedCollection new." +
	"\n\tself eventNamesDo: [:e | list add: e]." +
	"\n\t^ list");

jst.ExtObservable.addMethod("resumeEvents", "", "event handling", "\tobj resumeEvents");
jst.ExtObservable.addMethod("suspendEvents", "", "event handling", "\tobj perform: #suspendEvents with: false");
jst.ExtObservable.addMethod("suspendEventQueue", "", "event handling", 
	"\t\"suspended events will be fired after the resumeEvents call instead of discarding all suspended events\"" +
	"\n\tobj perform: #suspendEvents with: true");

jst.ExtObservable.addMethod("fireEvent:withParams:", "name params", "event handling", 
	"\tobj perform: #fireEvent withArguments: ({name. self}, params asCollection) asJsObject",
	null, "2012-04-09T17:25:24Z", "mp", 1);

jst.ExtObservable.addMethod("fireEvent:withParams:", "name params", "event handling", 
	"\t\"Fires the specified event with the passed parameters (minus the event name)." +
	"\n\tAn event may be set to bubble up an Observable parent hierarchy " +
	"\n\t(See Ext.Component.getBubbleTarget) by calling enableBubble.\"" +
	"\n\tobj perform: #fireEvent withArguments: ({name. self}, params asCollection) asJsObject",
	null, "2013-06-23T11:53:53Z", "mp"); //jst-ext-core

/*
jst.ExtObservable.addMethod("on:do:", "eventName aBlock", "event handling", 
	"\tself addListener: (ExtDefaultListener on: eventName do: aBlock)",
	null, "2012-01-26T21:02:29Z", "mp",1 );

jst.ExtObservable.addMethod("on:do:", "eventName aBlock", "event handling", 
	"\t| pref |" +
	"\n\tpref := self class defaultListenerClass eventPrefix." +
	"\n\t(pref isEmpty not and: [eventName startsWith: pref])" +
	"\n\t\tifTrue: [self addListener: (self class defaultListenerClass " +
	"\n\t\t\ton: (eventName allButFirst: pref size) do: aBlock)]" +
	"\n\t\tifFalse: [self addListener: (ExtDefaultListener on: eventName do: aBlock)]",
	null, "2012-08-18T19:23:28Z", "mp", 1);

jst.ExtObservable.addMethod("on:do:", "eventName aBlock", "event handling", 
	"\t(self class defaultListenerClass events includes: eventName) " +
	"\n\t\tifTrue: [self addListener: (self class defaultListenerClass on: eventName do: aBlock)]" +
	"\n\t\tifFalse: [self addListener: (ExtDefaultListener on: eventName do: aBlock)]",
	null, "2012-08-19T21:13:25Z", "mp", 1);

jst.ExtObservable.addMethod("on:do:", "eventName aBlock", "event handling", 
	"\t(self class listenerClasses detect: [:cls | cls events includes: eventName] ifNone: nil)" +
	"\n\t\tifNotNilDo: [:cls | " +
	"\n\t\t\tself addListener: (cls new eventName: eventName; handler: aBlock)]" +
	"\n\t\tifNil: [self addListener: (ExtDefaultListener on: eventName do: aBlock)]",
	null, "2012-09-25T17:49:41Z", "mp", 1);
*/
jst.ExtObservable.addMethod("on:do:", "eventName aBlock", "event handling", 
	"\tself addListener: (self class listenerClass new " +
	"\n\t\teventName: eventName; " +
	"\n\t\thandler: aBlock)",
	null, "2013-06-22T20:59:03Z", "mp");

/* neni dobry napad - po prepsani metody by v handleru zustala stara verze 
jst.ExtObservable.addMethod("on:call:of:", "eventName methodName anObject", "event handling", 
	"\t| listener block |" +
	"\n\tblock := (anObject class lookupSelector: methodName) asBlock." +
	"\n\tlistener := (self class listenerClasses detect: [:cls | cls events includes: eventName] ifNone: nil)" +
	"\n\t\tifNotNilDo: [:cls | " +
	"\n\t\t\tcls new eventName: eventName; handler: block]" +
	"\n\t\tifNil: [ExtDefaultListener on: eventName do: block]." +
	"\n\tlistener scope: anObject." +
	"\n\tself addListener: listener",
	null, "2013-05-19T13:09:33Z", "mp");

jst.ExtObservable._class.addMethod("defaultListenerClass", "", "accessing", 
	"\t^ ExtDefaultListener",
	null, "2012-08-18T18:58:23Z", "mp");
*/

jst.ExtObservable._class.addMethod("listenerClass", "", "accessing", 
	"\t^ nil",
	null, "2013-06-22T10:04:43Z", "mp", 1);

jst.ExtObservable._class.addMethod("listenerClass", "", "accessing", 
	"\t^ ExtDefaultListener",
	null, "2013-06-22T20:57:04Z", "mp"); //jst-ext-core

/*
jst.ExtObservable._class.addMethod("listenerClasses", "", "accessing", 
	"\t^ #()",
	null, "2012-09-25T17:33:19Z", "mp", 1);

jst.ExtObservable._class.addMethod("listenerClasses", "", "accessing", 
	"\t\"zatim kvuli zpetne kompatibilite\"" +
	"\n\t^ self listenerClass asCollection",
	null, "2013-06-22T10:05:20Z", "mp");
*/

jst.ExtObservable.constructor.prototype.eventNamesDo_ = function(aBlock) {
	for (var i in this._obj.events)
		aBlock.value_(i);
};
jst.ExtObservable.addMethod("eventNamesDo:", "aBlock", "enumerating");

jst.ExtObservable.addMethod("addListener:", "anExtListener", "accessing", function(anExtListener) {
	if (this._obj != jst.nil)
		//call of the original ext function
		this._obj.addListener(anExtListener.eventName(), 
			anExtListener.handler(), this._obj, anExtListener.options().asJsObject());
	else {
		if (this._listeners == jst.nil)
			this._listeners = jst.OrderedCollection._new();
		this._listeners.add_(anExtListener);
	};
	return anExtListener;
},
null, "2012-04-18T15:34:00Z", "mp");

jst.ExtObservable.addMethod("installListener:on:prefix:", "eventName targetObject prefix", "private", 
function (eventName,targetObject,prefix){
	var l = (this[prefix+eventName+"Event"]) ? this[prefix+eventName+"Event"]() : this;
	if (l == this)
		;//nothing to do, the method is not implemented
	else if (l.isBlock())
		targetObject.on_do_(eventName, l); //handler
	else 
		targetObject.addListener_(l.eventName_(eventName)); //listener
	return this;
},
	null, "2012-04-18T12:35:34Z", "mp", 1);

jst.ExtObservable.addMethod("installListener:on:prefix:", "eventName targetObject prefix", "private", 
function (eventName,targetObject,prefix){
	var l = (this[prefix+eventName+"Event"]) ? this[prefix+eventName+"Event"]() : this;
	if (l == this)
		;//nothing to do, the method is not implemented
	else if (l.isBlock())
		jst.sndww(targetObject, "on_do_", eventName, l); //handler
	else 
		jst.sndw(targetObject, "addListener_", l.eventName_(eventName)); //listener
	return this;
},
	null, "2014-02-26T09:42:47Z", "mp"); //jst-ext-core

jst.ExtObservable.addMethod("installListenersOn:prefix:", "targetObject prefix", "private", 
function (targetObject,prefix){
	var self = this;
	targetObject.eventNamesDo_(function(n){
		self.installListener_on_prefix_(n, targetObject, prefix);
	});
	return this;
},
	null, "2012-04-18T12:52:39Z", "mp", 1);

jst.ExtObservable.addMethod("installListenersOn:prefix:", "targetObject prefix", "private", 
function (targetObject,prefix){
	var self = this;
	targetObject.eventNamesDo_(function(n){
		jst.sndwww(self, "installListener_on_prefix_", n, targetObject, prefix);
	});
	return this;
},
	null, "2014-02-26T09:41:20Z", "mp"); //jst-ext-core

/*
jst.ExtObservable.addMethod("installListeners", "", "private", 
	"\tself installListenersOn: self prefix: ''." +
	"\n\tlisteners ifNotNil: [listeners do: [:l |" +
	"\n\t\tself addListener: l]].");

jst.ExtObservable.addMethod("installListeners", "", "private", 
	"\tself installListenersOn: self prefix: ''." +
	"\n\tself class defaultListenerClass eventPrefix isEmpty ifFalse: [" +
	"\n\t\tself installListenersOn: self prefix: self class defaultListenerClass eventPrefix]." +
	"\n\tlisteners ifNotNil: [listeners do: [:l |" +
	"\n\t\tself addListener: l]].",
	null, "2012-08-18T19:46:56Z", "mp");
*/

jst.ExtObservable.addMethod("installListeners", "", "private", 
	"\tself installListenersOn: self prefix: ''." +
	"\n\tlisteners ifNotNil: [listeners do: [:l |" +
	"\n\t\tself addListener: l]].",
	null, "2012-08-19T21:10:09Z", "mp");

jst.ExtObservable.addMethod("addEvents:", "anCollection", "accessing", 
	"\t\"Adds the specified events to the list of events which this Observable may fire.\"" +
	"\n\tobj perform: #addEvents with: (anCollection inject: Dictionary new into: [:dict :name | " +
	"\n\t\tdict at: name put: true; yourself]) asJsObject",
	null, "2012-04-16T20:35:58Z", "mp");

jst.ExtObservable.addMethod("jsonKeys", "", "private", 
	"\t| cls keys |" +
	"\n\tkeys := SortedCollection new." +
	"\n\tcls := self class." +
	"\n\t[cls == ExtObservable] whileFalse: [cls methodDict keysAndValuesDo: [:k :m | " +
	"\n\t\t((m category name startsWith: 'accessing') and: [(k indexOf: $:) = k size]) ifTrue: [" +
	"\n\t\t\tkeys addUnique: k allButLast]]." +
	"\n\t\tcls := cls superclass]." +
	"\n\t^ keys",
	null, "2014-01-28T20:42:58Z", "mp");

jst.ExtObservable._class.addMethod("constructFromJson:", "jsonObject", "instance creation", 
	function (jsonObject){
	var obj = this._new();
	obj.jsonKeys().do_(function(key){if (key in jsonObject)
		jst.sndw(obj, key + "_", obj.convertFromJson_(jsonObject[key]));
	});
	return obj;		
},
	null, "2014-01-28T20:49:21Z", "mp");

// *** ExtKeyMap ***

jst.ExtKeyMap.addMethod("initialize", "", "initialization", 
	"\tconfig := Dictionary new",
	null, "2012-02-02T13:42:36Z", "mp");

jst.ExtKeyMap.addMethod("asJsObject", "", "converting", function (){
	if (this._jsObject == jst.nil)
		this.wrap_(new Ext.KeyMap(this._elm.asJsObject(), this._config.asJsObject, this.eventName()));
	return this._jsObject;	
},
	null, "2012-02-02T13:48:11Z", "mp");

jst.ExtKeyMap.addMethod("eventName", "", "accessing", 
	"\t^ eventName ifNil: #keydown",
	null, "2012-02-02T13:49:29Z", "mp");

jst.ExtKeyMap.addMethod("eventName:", "aString", "accessing", 
	"\teventName := aString",
	null, "2012-02-02T13:49:47Z", "mp");

jst.ExtKeyMap.addMethod("element:", "anObject", "accessing", 
	"\telm := anObject",
	null, "2012-02-02T13:50:13Z", "mp");

jst.ExtKeyMap.addMethod("bindKey:ctrl:shift:alt:handler:stopEvent:", "key ctrlBool shiftBool altBool aBlock aBoolean", "accessing", 
	"\t\"key is a single keycode or string or an array of keycodes to handle\"" +
	"\n\t| conf |" +
	"\n\tconf := Dictionary new" +
	"\n\t\tat: #key put: key;" +
	"\n\t\tat: #ctrl put: ctrlBool;" +
	"\n\t\tat: #shift put: shiftBool;" +
	"\n\t\tat: #alt put: altBool;" +
	"\n\t\tat: #handler put: aBlock;" +
	"\n\t\tat: #stopEvent put: aBoolean;" +
	"\n\t\tyourself." +
	"\n\tself asJsObject perform: #addBinding with: conf asJsObject",
	null, "2012-02-02T14:38:35Z", "mp");

jst.ExtKeyMap._class.addMethod("on:", "anElement", "instance creation", 
	"\t^ self new element: anElement",
	null, "2012-02-02T15:15:11Z", "mp");

//*** ExtComponent ***

jst.ExtComponent._class.addMethod("xtype", "", "accessing", "\t^ #component");

/*
jst.ExtComponent._class.addMethod("initialize", "", "class initialization", 
	"\tself overrideMethod: #applyState",
	null, "2014-01-14T15:03:30Z", "mp");

jst.initializeClass(jst.ExtComponent);
*/

jst.ExtComponent._class.addMethod("allInstances", "", "accessing", 
	"\t\"Answer a collection of all current instances of the receiver.\"" +
	"\n\t^ ExtComponentMgr default components select: [:c | " +
	"\n\t\tc class == self]",
	null, "2013-02-21T07:53:25Z", "mp");

jst.ExtComponent._class.addMethod("allSubInstances", "", "accessing", 
	"\t\"Answer a list of all current instances of the receiver and all of its subclasses.\"" +
	"\n\t^ ExtComponentMgr default components select: [:c | " +
	"\n\t\tc isKindOf: self]",
	null, "2013-02-21T07:53:04Z", "mp");

/*
jst.ExtComponent.addMethod("createJsObject", "", "private", 
	"\tself wrap: (Ext asJsObject perform: #create with: config asJsObject with: self class xtype)",
	null, "2012-03-24T20:55:22Z", "mp");

jst.ExtComponent.addMethod("createJsObject", "", "private", 
	"\tself wrap: (Ext asJsObject perform: #create with: config asJsObject with: self class xtype)." +
	"\n\tself componentMgr all fireEvent: #create withParams: self",
	null, "2012-04-16T21:06:35Z", "mp");

jst.ExtComponent.addMethod("createJsObject", "", "private", 
	"\tself stateful ifTrue: [" +
	"\n\t\t\"these listeners needs to be istalled before creating the wrapped object\"" +
	"\n\t\tself installListener: #beforestaterestore on: self prefix: ''." +
	"\n\t\tself installListener: #staterestore on: self prefix: '']." +
	"\n\tself wrap: (self componentMgr asJsObject perform: #create with: config asJsObject with: self class xtype)." +
	"\n\tself componentMgr all fireEvent: #create withParams: self",
	null, "2012-04-18T14:30:51Z", "mp");
*/
jst.ExtComponent.addMethod("createWrappedObject", "", "private", 
	"\t^ self wrap: (self componentMgr asJsObject perform: #create with: config asJsObject with: self class xtype)",
	null, "2012-06-05T12:34:26Z", "mp");

jst.ExtComponent.addMethod("state", "", "accessing", 
	"\t\"calling the original method\"" +
	"\n\t| st |" +
	"\n\t^ nil == (st := obj xgetState) ifFalse: [Dictionary on: st]",
	null, "2014-01-13T21:40:09Z", "mp", 1);

jst.ExtComponent.addMethod("state", "", "accessing", 
	"\t\"calling the original method\"" +
	"\n\t^ obj xgetState",
	null, "2014-01-14T16:05:13Z", "mp"); //jst-ext-core

/*
jst.ExtComponent.addMethod("applyState:", "state", "private", 
	"\t\"calling the original method\"" +
	"\n\tobj perform: #xapplyState with: state",
	null, "2014-01-13T22:04:24Z", "mp");
*/

jst.ExtComponent.addMethod("createJsObject", "", "private", 
	"\tself stateful ifTrue: [" +
	"\n\t\t\"these listeners needs to be istalled before creating the wrapped object\"" +
	"\n\t\tself installListener: #beforestaterestore on: self prefix: ''." +
	"\n\t\tself installListener: #staterestore on: self prefix: '']." +
	"\n\tself createWrappedObject." +
	"\n\tself componentMgr all fireEvent: #create withParams: self",
	null, "2012-06-05T12:34:43Z", "mp");

jst.ExtComponent.addMethod("addListener:", "anExtListener", "accessing", 
	"\t(obj isNil & self stateful and: [anExtListener eventName includesSubString: 'staterestore']) " +
	"\n\t\tifTrue: [" +
	"\n\t\t\t\"these events need to be setup via config object\"" +
	"\n\t\t\t(config at: #listeners ifAbsentPut: [ExtConfig new]) " +
	"\n\t\t\t\tat: anExtListener eventName " +
	"\n\t\t\t\tput: anExtListener] " +
	"\n\t\tifFalse: [" +
	"\n\t\t\tsuper addListener: anExtListener].\t" +
	"\n\t^ anExtListener" +
	"\n\t",
	null, "2012-04-18T14:20:35Z", "mp");

jst.ExtComponent.addMethod("contentEl:", "anObject", "accessing-config", 
	"\t\"Optional. Specify an existing HTML element (as ExtElement instance), or the id of an existing HTML element to use as the content for this component.\"" +
	"\n\tself configAt: #contentEl put: anObject asJsObject",
	null, "2012-04-30T12:26:23Z", "mp");

jst.ExtComponent.addMethod("componentMgr", "", "accessing", "\t^ ExtComponentMgr default",
	null, "2011-09-29T08:10:44Z", "mp");

jst.ExtComponent.addMethod("ownerContainer", "", "accessing", "\t^ (obj at: #ownerCt) jstWrapper");
jst.ExtComponent.addMethod("rootContainer", "", "accessing", "\t^ self ownerContainer ifNotNilDo: [:c | c rootContainer]");

jst.ExtComponent.addMethod("addCssClass:", "aString", "accessing-styles", "\tself at: #cls by: #addClass put: aString");
jst.ExtComponent.addMethod("removeCssClass:", "aString", "accessing-styles", "\tobj ifNotNil: [obj perform: #removeClass with: aString]");

jst.ExtComponent.addMethod("isDisabled", "", "accessing", "\t^ self at: #disabled default: false");

jst.ExtComponent.addMethod("isDisabled:", "aBoolean", "accessing", 
	"\tobj" +
	"\n\t\tifNil: [config at: #disabled put: aBoolean]" +
	"\n\t\tifNotNil: [obj perform: (aBoolean ifTrue: #disable ifFalse: #enable)]",
	null, "2013-06-03T08:48:30Z", "mp");


jst.ExtComponent.addMethod("beEnabled", "", "accessing", "\tself isDisabled: false");
jst.ExtComponent.addMethod("beDisabled", "", "accessing", "\tself isDisabled: true");

jst.ExtComponent.addMethod("isEnabled", "", "accessing", "\t^ self isDisabled not", null, "2011-10-20T14:04:08Z", "mp");
jst.ExtComponent.addMethod("isEnabled:", "aBoolean", "accessing", "\tself isDisabled: aBoolean not", null, "2011-11-23T15:24:20Z", "mp");

//jst.ExtComponent.addMethod("asItem", "", "converting", "\t^obj ifNil: [\n\t\t\config at: #xtype ifAbsentPut: self class xtype.\n\t\tconfig asJsObject]");

jst.ExtComponent.addMethod("contents", "", "rendering", 
	"\t\"An HTML fragment, or a DomHelper specification to use as the layout element content. " +
	"\n\tThe HTML content is added after the component is rendered, so the document will not contain this HTML at the time " +
	"\n\tthe render event is fired. This content is inserted into the body before any configured contentEl is appended.\"" +
	"\n\t^ self at: #html default: ''",
	null, "2013-02-15T14:18:25Z", "mp");

jst.ExtComponent.addMethod("htmlContents:", "blockWithArg", "rendering", 
	"\tself contents: (DocumentFragment htmlContents: blockWithArg) printHtml",
	null, "2012-03-18T21:15:33Z", "mp", 1);

jst.ExtComponent.addMethod("htmlContents:", "blockWithArg", "rendering", 
	"\tself body dom ifNotNilDo: [:elm |" +
	"\n\t\tblockWithArg value: (HtmlCanvas new on: elm empty)" +
	"\n\t] ifNil: [\"fix it\"" +
	"\n\t\tself contents: (DocumentFragment htmlContents: blockWithArg) printHtml]",
	null, "2014-02-26T20:25:18Z", "mp", 1);

jst.ExtComponent.addMethod("htmlContents:", "blockWithArg", "rendering", 
	"\t(obj notNil and: [self body dom notNil]) ifTrue: [" +
	"\n\t\tblockWithArg value: (HtmlCanvas new on: self body dom empty)" +
	"\n\t] ifFalse: [" +
	"\n\t\tself contents: (DocumentFragment htmlContents: blockWithArg) printHtml]",
	null, "2014-03-08T21:19:10Z", "mp"); //jst-ext-core

jst.ExtComponent.addMethod("body", "", "accessing", 
	"\t\"see rendering\"" +
	"\n\t^ self element",
	null, "2014-02-26T18:44:49Z", "mp");

jst.ExtComponent.addMethod("renderTo:", "anObject", "rendering", 
	"\t\"Specify the id of the element, a DOM element or an existing Element that this component " +
	"\n\twill be rendered into. " +
	"\n\tNotes: Do not use this option if the Component is to be a child item of a Container. " +
	"\n\tIt is the responsibility of the Container's layout manager to render and manage its child items.\"" +
	"\n\tself at: #renderTo by: #render put: anObject",
	null, "2013-04-20T10:51:31Z", "mp");

jst.ExtComponent.addMethod("renderOn:", "html", "rendering", 
	"\tself renderTo: html div element",
	null, "2013-04-20T10:56:43Z", "mp");

jst.ExtComponent.addMethod("renderContentOn:", "html", "rendering", 
	"\t\"see refreshContent\"",
	null, "2013-02-05T13:22:52Z", "mp");

jst.ExtComponent.addMethod("refreshContent", "", "rendering", 
	"\tself htmlContents: [:html |" +
	"\n\t\tself renderContentOn: html]" +
	"\n\t",
	null, "2013-02-05T13:26:06Z", "mp");

/*
jst.ExtComponent.addMethod("element", "", "accessing", "\t^ ExtElement wrap: obj getEl");

jst.ExtComponent.addMethod("element", "", "accessing", 
	"\t^ element ifNil: [" +
	"\n\t\telement := obj ifNil: [ExtElement new] ifNotNil: [ExtElement wrap: obj getEl]]");
*/

jst.ExtComponent.addMethod("element", "", "accessing", 
	function (){
	if (this._element != jst.nil)
		return this._element;
	if (this._obj != jst.nil && this._obj.getEl())
		return this._element = jst.ExtElement.wrap_(this._obj.getEl());
	return this._element = jst.ExtElement._new();
},
	null, "2012-10-04T21:05:47Z", "mp"); //jst-ext-core

/*
jst.ExtComponent.addMethod("installListeners", "", "private", 
	"\t\"pridana jednorazova udalost nainstaluje pripadne listenery do elementu\"" +
	"\n\tself addListener: (ExtDefaultListener new eventName: #render; single: true; handler: [:comp |" +
	"\n\t\tcomp installListenersOn: comp element prefix: #element])." +
	"\n\tsuper installListeners");
*/
jst.ExtComponent.addMethod("installListeners", "", "private", 
	"\t\"pridana jednorazova udalost nainstaluje pripadne listenery do elementu\"" +
	"\n\tself addListener: (ExtDefaultListener new eventName: #render; single: true; handler: [" +
	"\n\t\telement ifNotNil: [" +
	"\n\t\t\telement wrap: obj getEl]." +
	"\n\t\tself installListenersOn: self element prefix: #element." +
	"\n\t\telement installListeners])." +
	"\n\tsuper installListeners");

jst.ExtComponent.addMethod("on:do:", "eventName aBlock", "event handling", 
	"\t(self class canUnderstand: eventName, 'Event') " +
	"\n\t\tifTrue: [super on: eventName do: aBlock]" +
	"\n\t\tifFalse: [self element on: eventName do: aBlock]",
	null, "2012-10-02T14:17:14Z", "mp");

jst.ExtComponent.addMethod("destroy", "", "private", 
	"\t\"Destroys this component by purging any event listeners, removing the component's element " +
	"\n\tfrom the DOM, removing the component from its ExtContainer (if applicable) " +
	"\n\tand unregistering it from ExtComponentMgr. Destruction is generally handled " +
	"\n\tautomatically by the framework and this method should usually not need to be called directly.\"" +
	"\n\tobj ifNotNil: [" +
	"\n\t\tobj perform: #destroy. " +
	"\n\t\tobj := nil]",
	null, "2013-05-09T20:00:38Z", "mp");

jst.ExtComponent.addMethod("renderEvent", "", "events", 
	"\t\"returned handler block or instance of ExtDefaultListener is installed on initialization\"");

jst.ExtComponent.addMethod("beforerenderEvent", "", "events", 
	"\t\"returned handler block or instance of ExtDefaultListener is installed on initialization\"");

jst.ExtComponent.addMethod("afterrenderEvent", "", "events", 
	"\t\"returned handler block or instance of ExtDefaultListener is installed on initialization\"");

jst.ExtComponent.addMethod("beforedestroyEvent", "", "events", 
	"\t\"returned handler block or instance of ExtDefaultListener is installed on initialization\"");

jst.ExtComponent.addMethod("destroyEvent", "", "events", 
	"\t\"returned handler block or instance of ExtDefaultListener is installed on initialization\"",
	null, "2011-09-27T18:53:49Z", "mp");

jst.ExtComponent.addMethod("unregister", "", "registration", 
	"\tself componentMgr unregister: self",
	null, "2011-10-13T15:18:17Z", "mp");

jst.ExtComponent.addMethod("hide", "", "rendering", 
	"\t\"Render this component hidden (default is false) or hide it if it is visible. " +
	"\n\tListen to the 'beforehide' event and return false to cancel hiding the component. " +
	"\n\tFires the 'hide' event after hiding the component.\"" +
	"\n\tself at: #hidden by: #hide put: true",
	null, "2012-02-21T20:47:17Z", "mp");

jst.ExtComponent.addMethod("show", "", "rendering", 
	"\tself asJsObject perform: #show",
	null, "2013-04-20T12:44:22Z", "mp");

jst.ExtComponent.addMethod("isVisible:", "aBoolean", "accessing", 
	"\tobj " +
	"\n\t\tifNil: [aBoolean ifFalse: [" +
	"\n\t\t\tconfig at: #hidden put: true]]" +
	"\n\t\tifNotNil: [obj perform: #setVisible with: aBoolean]",
	null, "2012-02-22T15:46:34Z", "mp");

jst.ExtComponent.addMethod("isVisible", "", "accessing", 
	"\t^ obj ifNil: [true] ifNotNil: [obj isVisible]",
	null, "2012-02-22T15:48:06Z", "mp", 1);

jst.ExtComponent.addMethod("isVisible", "", "accessing", 
	"\t^ obj notNil and: [obj perform: #isVisible]",
	null, "2013-08-21T08:52:42Z", "mp"); //jst-ext-core

jst.ExtComponent.addMethod("elementclickEvent", "", "events", 
	"\t\"returned handler block or instance of ExtElementListener is installed on initialization\"",
	null, "2011-11-01T10:19:12Z", "mp");

jst.ExtComponent.addMethod("elementcontextmenuEvent", "", "events", 
	"\t\"returned handler block or instance of ExtElementListener is installed on initialization\"",
	null, "2011-11-09T12:19:09Z", "mp");

jst.ExtComponent.addMethod("elementkeydownEvent", "", "events", 
	"\t\"returned handler block or instance of ExtElementKeyDownListener is installed automatically\"",
	null, "2012-01-27T08:38:08Z", "mp");

jst.ExtComponent.addMethod("elementkeyupEvent", "", "events", 
	"\t\"returned handler block or instance of ExtElementKeyUpListener is installed automatically\"",
	null, "2012-01-27T08:38:21Z", "mp");

jst.ExtComponent.addMethod("showEvent", "", "events", 
	"\t\"Fires after the component is shown when calling the show method." +
	"\n\tReturned handler block or instance of ExtDefaultListener is installed on initialization\"",
	null, "2012-12-12T16:49:47Z", "mp");

jst.ExtComponent.addMethod("beforeshowEvent", "", "events", 
	"\t\"returned handler block or instance of ExtDefaultListener is installed on initialization\"",
	null, "2012-01-10T15:36:07Z", "mp");

jst.ExtComponent.addMethod("focus", "", "rendering", 
	"\tobj perform: #focus with: false with: 100",
	null, "2012-02-15T15:26:08Z", "mp");

jst.ExtComponent.addMethod("id", "", "accessing-config", "\t^ self at: #id get: #getId");

jst.ExtComponent.addMethod("id:", "aString", "accessing-config", 
	"\t\"The unique id of this component (defaults to an auto-assigned id). You should assign an id if you need to be able " +
	"\n\tto access the component later and you do not have an object reference available (e.g., using Ext.getCmp)." +
	"\n\tNote that this id will also be used as the element id for the containing HTML element that is rendered to the page " +
	"\n\tfor this component. This allows you to write id-based CSS rules to style the specific instance of this component uniquely, " +
	"\n\tand also to select sub-elements using this component's id as the parent.\"" +
	"\n\tself configAt: #id put: aString",
	null, "2012-04-11T20:18:19Z", "mp");

jst.ExtComponent.addMethod("stateId:", "aString", "accessing", 
	"\t\"The unique id for this component to use for state management purposes " +
	"\n\t(defaults to the component id if one was set, otherwise null if the component is using a generated id). " +
	"\n\tSee stateful for an explanation of saving and restoring Component state.\"" +
	"\n\tobj" +
	"\n\t\tifNil: [config at: #stateId put: aString]" +
	"\n\t\tifNotNil: [obj at: #stateId put: aString]",
	null, "2012-04-17T08:55:00Z", "mp");

jst.ExtComponent.addMethod("stateId", "", "accessing", 
	"\t^ self at: #stateId get: #getStateId",
	null, "2012-04-17T09:03:21Z", "mp");

jst.ExtComponent.addMethod("stateful:", "aBoolean", "accessing-config", 
	"\t\"A flag which causes the Component to attempt to restore the state of internal properties from a saved state on startup\"" +
	"\n\tself configAt: #stateful put: aBoolean",
	null, "2012-04-11T21:04:29Z", "mp");

jst.ExtComponent.addMethod("stateful", "", "accessing-config", 
	"\t^ config at: #stateful ifAbsent: false",
	null, "2012-04-11T21:06:42Z", "mp");

jst.ExtComponent.addMethod("stateEvents:", "anArray", "accessing-config", 
	"\t\"An array of events that, when fired, should trigger this component to save its state (defaults to none). " +
	"\n\tstateEvents may be any type of event supported by this component, including browser or custom events " +
	"\n\t(e.g., {'click'. 'customerchange'}). See stateful for an explanation of saving and restoring Component state.\"" +
	"\n\tself configAt: #stateEvents put: anArray",
	null, "2012-04-11T21:14:36Z", "mp");

jst.ExtComponent.addMethod("stateEvents", "", "accessing-config", 
	"\t^ config at: #stateEvents ifAbsent: #()",
	null, "2012-04-11T21:15:18Z", "mp");

jst.ExtComponent.addMethod("beforestaterestoreEvent", "", "events", 
	"\t\"Fires before the state of the component is restored. Return false from an event handler to stop the restore." +
	"\n\tReturned handler block or instance of ExtStateListener is installed on initialization\"",
	null, "2012-04-11T21:29:08Z", "mp");

jst.ExtComponent.addMethod("beforestatesaveEvent", "", "events", 
	"\t\"Fires before the state of the component is saved to the configured state provider. Return false to stop the save." +
	"\n\tReturned handler block or instance of ExtStateListener is installed on initialization\"",
	null, "2012-04-11T21:32:01Z", "mp");

jst.ExtComponent.addMethod("staterestoreEvent", "", "events", 
	"\t\"Fires after the state of the component is restored." +
	"\n\tReturned handler block or instance of ExtStateListener is installed on initialization\"",
	null, "2012-04-11T21:33:12Z", "mp");

jst.ExtComponent.addMethod("statesaveEvent", "", "events", 
	"\t\"Fires after the state of the component is saved to the configured state provider." +
	"\n\tReturned handler block or instance of ExtStateListener is installed on initialization\"",
	null, "2012-04-11T21:33:41Z", "mp");

jst.ExtComponent.addMethod("data:", "anObject", "accessing-tpl", 
	"\t\"The initial set of data to apply to the tpl to update the content area of the Component.\"" +
	"\n\tself configAt: #data put: anObject",
	null, "2012-06-12T12:15:18Z", "mp");

jst.ExtComponent.addMethod("tpl:", "anObject", "accessing-tpl", 
	"\t\"An ExtTemplate, ExtXTemplate or an array of strings to form an ExtXTemplate. " +
	"\n\tUsed in conjunction with the data and tplWriteMode configurations.\"" +
	"\n\tself configAt: #tpl put: anObject",
	null, "2012-06-12T12:18:12Z", "mp");

jst.ExtComponent.addMethod("tplWriteMode:", "aString", "accessing-tpl", 
	"\t\"The ExtTemplate method to use when updating the content area of the Component. " +
	"\n\tDefaults to 'overwrite' (see ExtXTemplate>>overwrite).\"" +
	"\n\tself configAt: #tplWriteMode put: aString",
	null, "2012-06-12T12:19:26Z", "mp");

jst.ExtComponent.addMethod("tplWriteMode", "", "accessing-tpl", 
	"\t^ self at: #tplWriteMode default: 'overwrite'",
	null, "2012-06-12T12:19:53Z", "mp");

jst.ExtComponent.addMethod("cls:", "aString", "accessing-config", 
	"\t\"An optional extra CSS class that will be added to this component's Element (defaults to ''). " +
	"\n\tThis can be useful for adding customized styles to the component or any of its children using standard CSS rules.\"" +
	"\n\tself configAt: #cls put: aString",
	null, "2012-06-20T21:14:09Z", "mp");

jst.ExtComponent.addMethod("cls", "", "accessing-config", 
	"\t^ self at: #cls default: ''",
	null, "2012-06-20T21:14:27Z", "mp");

jst.ExtComponent.addMethod("fieldLabel:", "aString", "accessing-config", 
	"\t\"The label text to display next to this Component (defaults to '')." +
	"\n\tNote: this config is only used when this Component is rendered by a Container which has been configured " +
	"\n\tto use the FormLayout layout manager (e.g. Ext.form.FormPanel or specifying layout:'form').\"" +
	"\n\tself configAt: #fieldLabel put: aString" +
	"\n\t",
	null, "2012-06-21T21:16:44Z", "mp");

jst.ExtComponent.addMethod("fieldLabel", "", "accessing-config", 
	"\t^ self at: #fieldLabel default: ''" +
	"\n\t",
	null, "2012-06-21T21:17:11Z", "mp");

jst.ExtComponent.addMethod("labelStyle:", "aString", "accessing-config", 
	"\t\"A CSS style specification string to apply directly to this field's label.\"" +
	"\n\tself configAt: #labelStyle put: aString",
	null, "2013-02-19T15:05:55Z", "mp");

jst.ExtComponent.addMethod("labelStyle", "", "accessing-config", 
	"\t\"Defaults to the container's labelStyle value if set (e.g., Ext.layout.FormLayout.labelStyle , or '').\"" +
	"\n\t^ self at: #labelStyle default: ''",
	null, "2013-02-19T15:06:25Z", "mp");

jst.ExtComponent.addMethod("hideLabel:", "aBoolean", "accessing-config", 
	"\t\"true to completely hide the label element (label and separator). Defaults to false. By default, even if you do not specify " +
	"\n\ta fieldLabel the space will still be reserved so that the field will line up with other fields that do have labels. " +
	"\n\tSetting this to true will cause the field to not reserve that space. Note: see the note for clearCls.\"" +
	"\n\tself configAt: 'hideLabel' put: aBoolean",
	null, "2012-08-14T20:04:43Z", "mp");

jst.ExtComponent.addMethod("hideLabel", "", "accessing-config", 
	"\t^ self at: 'hideLabel'",
	null, "2012-08-14T20:04:34Z", "mp");

jst.ExtComponent.addMethod("isRendered", "", "rendering", 
	"\t\"True if this component has been rendered.\"" +
	"\n\t^ self at: 'rendered' default: false",
	null, "2012-08-15T17:30:32Z", "mp");

/* moved to Object class
jst.ExtComponent.addMethod("broadcastEvent:with:", "eventName anObject", "system events", 
	"\t\"sends the event to all components\"" +
	"\n\tself componentMgr sendEvent: eventName with: anObject",
	null, "2012-08-17T09:42:26Z", "mp");

jst.ExtComponent.addMethod("broadcastEvent:", "eventName", "system events", 
	"\tself broadcastEvent: eventName with: nil",
	null, "2012-12-10T10:53:30Z", "mp");
*/

jst.ExtComponent.addMethod("autoEl:", "anObject", "accessing-config", 
	"\t\"A tag name or DomHelper spec (a dictionary) used to create the Element which will encapsulate this Component. " +
	"\n\tYou do not normally need to specify this. For the base classes ExtComponent, ExtBoxComponent, and ExtContainer, " +
	"\n\tthis defaults to 'div'. The more complex Ext classes use a more complex DOM structure created by their own onRender methods." +
	"\n\tThis is intended to allow the developer to create application-specific utility Components encapsulated by different DOM elements.\"" +
	"\n\tself configAt: 'autoEl' put: (anObject isString ifTrue: anObject ifFalse: [anObject asDictionary])");

jst.ExtComponent.addMethod("rowspan:", "aNumber", "accessing-config", 
	"\t\"Applied to the table cell containing the item.\"" +
	"\n\tself configAt: 'rowspan' put: aNumber",
	null, "2012-09-29T20:46:31Z", "mp");

jst.ExtComponent.addMethod("colspan:", "aNumber", "accessing-config", 
	"\t\"Applied to the table cell containing the item.\"" +
	"\n\tself configAt: 'colspan' put: aNumber",
	null, "2012-09-29T20:47:54Z", "mp");

jst.ExtComponent.addMethod("cellId:", "aString", "accessing-config", 
	"\t\" An id applied to the table cell containing the item.\"" +
	"\n\tself configAt: 'cellId' put: aString",
	null, "2012-09-29T20:50:27Z", "mp");

jst.ExtComponent.addMethod("cellCls:", "aString", "accessing-config", 
	"\t\"A CSS class name added to the table cell containing the item.\"" +
	"\n\tself configAt: 'cellCls' put: aString",
	null, "2012-09-29T20:51:15Z", "mp");

jst.ExtComponent.addMethod("style:", "anObject", "accessing-config", 
	"\t\"A custom style specification to be applied to this component's Element. " +
	"\n\tShould be a valid argument to ExtElement>>applyStyles.\"" +
	"\n\tself configAt: #style put: anObject",
	null, "2012-12-07T09:56:02Z", "mp");

jst.ExtComponent.addMethod("activate", "", "rendering", 
	"\tself ownerContainer centerLayout " +
	"\n\t\tifFalse: [self ownerContainer activeItem: self id]" +
	"\n\t\tifTrue: [self ownerContainer activate]",
	null, "2013-02-17T23:11:06Z", "mp");

jst.ExtComponent.addMethod("isActive", "", "testing", 
	"\t^ self ownerContainer activeItem == self or: [" +
	"\n\t\tself ownerContainer centerLayout and: [self ownerContainer isActive]]",
	null, "2013-02-17T23:12:44Z", "mp");

jst.ExtComponent.addMethod("renderedAt:get:default:", "optionName fceName anObject", "private", 
	"\t^ (obj notNil and: [self isRendered])" +
	"\n\t\tifTrue: [obj perform: fceName]" +
	"\n\t\tifFalse: [config at: optionName ifAbsent: anObject]",
	null, "2013-02-17T15:33:50Z", "mp");

jst.ExtComponent.addMethod("renderedAt:by:put:", "optionName fceName anObject", "private", 
	"\tobj" +
	"\n\t\tifNil: [config at: optionName put: anObject]" +
	"\n\t\tifNotNil: [self isRendered " +
	"\n\t\t\tifTrue: [obj perform: fceName with: anObject asJsObject]" +
	"\n\t\t\tifFalse: [obj at: optionName put: anObject asJsObject]]",
	null, "2013-02-17T15:52:52Z", "mp");

jst.ExtComponent.addMethod("contents:", "anObject", "rendering", 
	"\tself renderedAt: #html by: #update put: anObject",
	null, "2013-02-17T15:42:41Z", "mp");

jst.ExtComponent.addMethod("plugins:", "anObject", "accessing-config", 
	"\t\"An object or array of objects that will provide custom functionality for this component. " +
	"\n\tThe only requirement for a valid plugin is that it contain an init method that accepts a reference " +
	"\n\tof type ExtComponent. When a component is created, if any plugins are available, the component " +
	"\n\twill call the init method on each plugin, passing a reference to itself. Each plugin can then call " +
	"\n\tmethods or respond to events on the component as needed to provide its functionality.\"" +
	"\n\tself configAt: #plugins put: anObject",
	null, "2013-05-01T20:49:09Z", "mp");

jst.ExtComponent.addMethod("plugins", "", "accessing-config", 
	"\t^ self at: #plugins default: #()",
	null, "2013-05-01T20:50:44Z", "mp");

jst.ExtComponent.addMethod("activeItem", "", "accessing", 
	"\t^ nil",
	null, "2013-04-30T09:24:52Z", "mp");

jst.ExtComponent.addMethod("pathActivated:", "aPath", "updating", 
	"\tpathActivatedBlock ifNotNil: [" +
	"\n\t\tpathActivatedBlock valueWithPossibleArgs: { self. aPath }]",
	null, "2013-04-30T17:50:50Z", "mp", 1);

jst.ExtComponent.addMethod("pathActivated:", "aPath", "updating", 
	"\tpathActivatedBlock " +
	"\n\t\tifNotNil: [" +
	"\n\t\t\tpathActivatedBlock valueWithPossibleArgs: { self. aPath }]" +
	"\n\t\tifNil: [self activeItem ifNotNilDo: [:item |" +
	"\n\t\t\titem pathActivated: aPath]]",
	null, "2013-09-23T08:57:40Z", "mp"); //jst-ext-core

jst.ExtComponent.addMethod("onPathActivated:", "aBlock", "accessing", 
	"\tpathActivatedBlock := aBlock",
	null, "2013-04-30T17:47:23Z", "mp");

jst.ExtComponent.addMethod("forcePathStop:on:last:ifAsync:", "path aString aBoolean aBlock", "updating", 
	"",
	null, "2013-08-19T09:35:49Z", "mp");

jst.ExtComponent.addMethod("forcePathStop:on:", "path aString", "updating", 
	"\tself forcePathStop: path on: aString last: true ifAsync: nil",
	null, "2013-08-20T15:37:47Z", "mp");

//*** ExtRegion ***

jst.ExtRegion._class.addMethod("west", "", "instance creation", "\t^ self new configAt: #region put: #west; yourself");
jst.ExtRegion._class.addMethod("north", "", "instance creation", "\t^ self new configAt: #region put: #north; yourself");
jst.ExtRegion._class.addMethod("east", "", "instance creation", "\t^ self new configAt: #region put: #east; yourself");
jst.ExtRegion._class.addMethod("south", "", "instance creation", "\t^ self new configAt: #region put: #south; yourself");
jst.ExtRegion._class.addMethod("center", "", "instance creation", "\t^ self new configAt: #region put: #center; yourself");

//jst.ExtRegion.addMethod("beNorth", "", "accessing-config", "\tconfig at: #region put: #north");
//jst.ExtRegion.addMethod("beEast", "", "accessing-config", "\tconfig at: #region put: #east");
//jst.ExtRegion.addMethod("beSouth", "", "accessing-config", "\tconfig at: #region put: #south");
//jst.ExtRegion.addMethod("beCenter", "", "accessing-config", "\tconfig at: #region put: #center");

jst.ExtRegion.addMethod("position", "", "accessing", "\t^ config at: #region ifAbsent: nil");
jst.ExtRegion.addMethod("split", "", "accessing", "\t^ false");

jst.ExtRegion.addMethod("minHeight", "", "accessing-config", "\t^ config at: #minHeight ifAbsent: 50");
jst.ExtRegion.addMethod("minHeight:", "aNumber", "accessing-config", "\tself configAt: #minHeight put: aNumber");

jst.ExtRegion.addMethod("minWidth", "", "accessing-config", "\t^ config at: #minWidth ifAbsent: 50");
jst.ExtRegion.addMethod("minWidth:", "aNumber", "accessing-config", "\tself configAt: #minWidth put: aNumber");

//*** ExtSplitRegion ***

jst.ExtSplitRegion.addMethod("initialize", "", "initialization", "\tsuper initialize.\n\tconfig at: #split put: true");
jst.ExtSplitRegion.addMethod("split", "", "accessing", "\t^ true");

//*** ExtBoxComponent ***

jst.ExtBoxComponent._class.addMethod("xtype", "", "accessing", "\t^ #box");

/*
jst.ExtBoxComponent.addMethod("height", "", "accessing", 
	"\t^ self at: 'height' get: 'getHeight' default: #auto",
	null, "2012-06-29T09:33:13Z", "mp");

jst.ExtBoxComponent.addMethod("height:", "anObject", "accessing", 
	"\t\"The height of this component in pixels (defaults to auto). " +
	"\n\tNote to express this dimension as a percentage or offset see ExtComponent>>anchor.\"" +
	"\n\tself at: #height by: #setHeight put: anObject",
	null, "2012-06-29T09:32:28Z", "mp");

jst.ExtBoxComponent.addMethod("width", "", "accessing", 
	"\t^ self at: 'width' get: 'getWidth' default: #auto",
	null, "2012-06-29T09:34:59Z", "mp");

jst.ExtBoxComponent.addMethod("width:", "anObject", "accessing", 
	"\t\"The width of this component in pixels (defaults to auto). " +
	"\n\tNote to express this dimension as a percentage or offset see ExtComponent>>anchor.\"" +
	"\n\tself at: #width by: #setWidth put: anObject",
	null, "2012-06-29T09:31:35Z", "mp");
*/
jst.ExtBoxComponent.addMethod("height", "", "accessing", 
	"\t^ self renderedAt: 'height' get: 'getHeight' default: #auto",
	null, "2013-02-17T15:36:51Z", "mp");

jst.ExtBoxComponent.addMethod("height:", "anObject", "accessing", 
	"\t\"The height of this component in pixels (defaults to auto). " +
	"\n\tNote to express this dimension as a percentage or offset see ExtComponent>>anchor.\"" +
	"\n\tself renderedAt: #height by: #setHeight put: anObject",
	null, "2013-02-17T15:57:34Z", "mp");

jst.ExtBoxComponent.addMethod("width", "", "accessing", 
	"\t^ self renderedAt: 'width' get: 'getWidth' default: #auto",
	null, "2013-02-17T15:36:36Z", "mp");

jst.ExtBoxComponent.addMethod("width:", "anObject", "accessing", 
	"\t\"The width of this component in pixels (defaults to auto). " +
	"\n\tNote to express this dimension as a percentage or offset see ExtComponent>>anchor.\"" +
	"\n\tself renderedAt: #width by: #setWidth put: anObject",
	null, "2013-02-17T15:56:34Z", "mp");

jst.ExtBoxComponent.addMethod("box", "", "accessing", 
	"\t| d |" +
	"\n\td := Dictionary on: obj getBox." +
	"\n\t^ Rectangle " +
	"\n\t\tleft: (d at: #x)" +
	"\n\t\tright: (d at: #width)" +
	"\n\t\ttop: (d at: #y)" +
	"\n\t\tbottom: (d at: #height)",
	null, "2014-01-13T19:57:18Z", "mp");

jst.ExtBoxComponent.addMethod("extent", "", "accessing", 
	"\t^ Rectangle extent: self width @ self height",
	null, "2013-06-28T07:39:37Z", "mp");

jst.ExtBoxComponent.addMethod("autoScroll", "", "accessing", "\t^ config at: #autoScroll ifAbsent: false \"=default\"");	
jst.ExtBoxComponent.addMethod("autoScroll:", "aBoolean", "accessing", "\tself at: #autoScroll by: #setAutoScroll put: aBoolean");	

//jst.ExtBoxComponent.addMethod("beWest", "", "accessing-config", "\tconfig at: #region put: #west");
//jst.ExtBoxComponent.addMethod("beNorth", "", "accessing-config", "\tconfig at: #region put: #north");
//jst.ExtBoxComponent.addMethod("beEast", "", "accessing-config", "\tconfig at: #region put: #east");
//jst.ExtBoxComponent.addMethod("beSouth", "", "accessing-config", "\tconfig at: #region put: #south");
//jst.ExtBoxComponent.addMethod("beCenter", "", "accessing-config", "\tconfig at: #region put: #center");

jst.ExtBoxComponent.addMethod("flex:", "aNumber", "accessing-config", "\tself configAt: #flex put: aNumber");

jst.ExtBoxComponent.addMethod("region:", "aRegion", "accessing-config", 
	"\taRegion ifString: [" +
	"\n\t\t^ self region: (ExtRegion perform: aRegion)]." +
	"\n\t(aRegion isKindOf: ExtRegion) ifFalse: [" +
	"\n\t\tself error: 'Invalid region class: ', aRegion className]." +
	"\n\taRegion config keysAndValuesDo: [:k :v |" +
	"\n\t\tself configAt: k put: v]",
	null, "2012-06-05T18:21:53Z", "mp");

jst.ExtBoxComponent.addMethod("margins:", "anObject", "accessing-config", 
	"\t\"Note: this config is only used when this BoxComponent is rendered by a Container " +
	"\n\twhich has been configured to use the BorderLayout or one of the two BoxLayout subclasses.\"" +
	"\n\tself configAt: #margins put: anObject",
	null, "2012-02-14T15:46:21Z", "mp");

jst.ExtBoxComponent.addMethod("x", "", "accessing", "\t^ obj at: #x");
jst.ExtBoxComponent.addMethod("x:", "anInteger", "accessing", "\tobj" +
	"\n\t\tifNil: [config at: #x put: anInteger]" +
	"\n\t\tifNotNil: [self position: (Point x: anInteger y: self y)]");

jst.ExtBoxComponent.addMethod("y", "", "accessing", "\t^ obj at: #y");
jst.ExtBoxComponent.addMethod("y:", "anInteger", "accessing", "\tobj" +
		"\n\t\tifNil: [config at: #y put: anInteger]" +
		"\n\t\tifNotNil: [self position: (Point x: self x y: anInteger)]");

jst.ExtBoxComponent.addMethod("position", "", "accessing", 
	"\t^ obj" +
	"\n\t\tifNil: [config at: #x ifPresent: [:x |" +
	"\n\t\t\tPoint x: x y: (config at: #y)]]" +
	"\n\t\tifNotNil: [self isRendered ifTrue: [" +
	"\n\t\t\tPoint on: (obj perform: #getPosition with: true)]]",
	null, "2013-02-19T15:39:22Z", "mp");

/* zda se, ze neni potreba
jst.ExtBoxComponent.addMethod("position:", "aPoint", "accessing", 
	"\tobj" +
	"\n\t\tifNil: [config at: #x put: aPoint x; at: #y put: aPoint y]" +
	"\n\t\tifNotNil: [self isRendered " +
	"\n\t\t\tifTrue: [obj perform: #setPosition with: aPoint x with: aPoint y]" +
	"\n\t\t\tifFalse: [" +
	"\n\t\t\t\tobj at: #x put: aPoint x." +
	"\n\t\t\t\tobj at: #y put: aPoint y]]",
	null, "2013-02-19T15:53:24Z", "mp"); //jst-ext-core
*/
jst.ExtBoxComponent.addMethod("position:", "aPoint", "accessing", 
	"\tobj" +
	"\n\t\tifNotNil: [\"x or y could be nil, we need convert it to null\"" +
	"\n\t\t\tobj perform: #setPosition with: aPoint x asJsObject with: aPoint y asJsObject]" +
	"\n\t\tifNil: [config at: #x put: aPoint x; at: #y put: aPoint y]",
	null, "2013-03-07T21:24:22Z", "mp");

jst.ExtBoxComponent.addMethod("pagePosition", "", "accessing", 
	"\t^ obj" +
	"\n\t\tifNotNil: [Point on: (obj getPosition)]" +
	"\n\t\tifNil: [config at: #pageX ifPresent: [:x |" +
	"\n\t\t\tPoint x: x y: (config at: #pageY)]]",
	null, "2011-11-22T13:21:55Z", "mp");

jst.ExtBoxComponent.addMethod("pagePosition:", "aPoint", "accessing", 
	"\tobj" +
	"\n\t\tifNotNil: [obj perform: #setPagePosition with: aPoint x asJsObject with: aPoint y asJsObject]" +
	"\n\t\tifNil: [config at: #pageX put: aPoint x; at: #pageY put: aPoint y]",
	null, "2013-03-07T21:24:33Z", "mp");

jst.ExtBoxComponent.addMethod("syncSize", "", "rendering", 
	"\t\"Force the component's size to recalculate based on the underlying element's current height and width.\"" +
	"\n\tobj syncSize",
	null, "2012-02-22T15:37:21Z", "mp");

jst.ExtBoxComponent.addMethod("actions:", "aCollection", "accessing", 
	"\tactions := aCollection",
	null, "2012-01-26T13:52:19Z", "mp");

jst.ExtBoxComponent.addMethod("contextMenu", "", "private", 
	"\t^ self createMenu",
	null, "2012-01-31T21:21:38Z", "mp");

jst.ExtBoxComponent.addMethod("initActions", "", "private", 
	"\t| map |" +
	"\n\tself element on: #contextmenu do: [:ev :el :opt |" +
	"\n\t\tev stopEvent." +
	"\n\t\tself contextMenu showAt: ev getXY]." +
	"\n\tmap := ExtKeyMap on: self element." +
	"\n\tactions do: [:act | act ifNotNil: [" +
	"\n\t\tact bindTo: map]].",
	null, "2012-02-02T15:15:28Z", "mp");

jst.ExtBoxComponent.addMethod("installListenersOn:prefix:", "targetObject prefix", "private", 
	"\tprefix = #element & actions notNil ifTrue: [" +
	"\n\t\tself initActions]." +
	"\n\tsuper installListenersOn: targetObject prefix: prefix.",
	null, "2012-01-26T16:14:30Z", "mp");

jst.ExtBoxComponent.addMethod("autoWidth:", "aBoolean", "accessing-config", 
	"\t\"True to use width:'auto', false to use fixed width (or allow it to be managed by its parent Container's layout manager.\"" +
	"\n\tself configAt: 'autoWidth' put: aBoolean",
	null, "2012-06-20T20:19:16Z", "mp");

jst.ExtBoxComponent.addMethod("autoWidth", "", "accessing-config", 
	"\t^ self at: 'autoWidth' default: false",
	null, "2012-06-20T20:19:35Z", "mp");

jst.ExtBoxComponent.addMethod("autoHeight", "", "accessing-config", 
	"\t^ self at: 'autoHeight' default: false",
	null, "2012-06-20T20:19:50Z", "mp");

jst.ExtBoxComponent.addMethod("autoHeight:", "aBoolean", "accessing-config", 
	"\t\"True to use height:'auto', false to use fixed height (or allow it to be managed by its parent Container's layout manager. \"" +
	"\n\tself configAt: 'autoHeight' put: aBoolean",
	null, "2012-06-20T20:20:38Z", "mp");

jst.ExtBoxComponent.addMethod("minWidth:", "aNumber", "accessing-config", 
	"\t\"The minimum value in pixels which this BoxComponent will set its width to." +
	"\n\tWarning: This will override any size management applied by layout managers.\"" +
	"\n\tself configAt: 'boxMinWidth' put: aNumber",
	null, "2012-07-09T12:30:45Z", "mp");

jst.ExtBoxComponent.addMethod("minHeight:", "aNumber", "accessing-config", 
	"\t\"The minimum value in pixels which this BoxComponent will set its height to." +
	"\n\tWarning: This will override any size management applied by layout managers.\"" +
	"\n\tself configAt: 'boxMinHeight' put: aNumber",
	null, "2012-07-09T12:31:35Z", "mp");

jst.ExtBoxComponent.addMethod("minHeight", "", "accessing-config", 
	"\t^ self at: 'boxMinHeight'",
	null, "2012-07-09T12:32:25Z", "mp");

jst.ExtBoxComponent.addMethod("minWidth", "", "accessing-config", 
	"\t^ self at: 'boxMinWidth'",
	null, "2012-07-09T12:32:46Z", "mp");

jst.ExtBoxComponent.addMethod("anchor:", "aString", "accessing-config", 
	"\t\"Note: this config is only used when this Component is rendered by a Container which has been configured " +
	"\n\tto use an AnchorLayout (or subclass thereof) based layout manager, for example:" +
	"\n\t\tExt.form.FormPanel" +
	"\n\t\tspecifying layout: 'anchor' // or 'form', or 'absolute'\"" +
	"\n\tself configAt: 'anchor' put: aString",
	null, "2012-07-31T21:24:04Z", "mp");

jst.ExtBoxComponent.addMethod("anchor", "", "accessing-config", 
	"\t^ self at: 'anchor'",
	null, "2012-07-31T21:24:16Z", "mp");

jst.ExtBoxComponent.addMethod("resizeEvent", "", "events", 
	"\t\"Returned handler block or instance of ExtBoxResizeListener is installed on initialization." +
	"\n\tFires after the component is resized.\"",
	null, "2013-02-14T21:07:14Z", "mp");

jst.ExtBoxComponent.addMethod("moveEvent", "", "events", 
	"\t\"Returned handler block or instance of ExtResizeListener is installed on initialization\"",
	null, "2012-03-29T07:36:10Z", "mp");

/*
jst.ExtBoxComponent._class.addMethod("listenerClass", "", "accessing", 
	"\t^ ExtBoxResizeListener",
	null, "2013-02-14T21:04:51Z", "mp");
*/

//*** ExtMixedCollectionListener ***

jst.ExtMixedCollectionListener.addMethod("createHandler", "", "handlers", 
	"\t\"Fires when a component is created and added to ExtComponentMgr - see onCreate:\"" +
	"\n\t^ [:all :comp | " +
	"\n\t\tself handlerBlock value: comp jstWrapper]",
	null, "2013-07-04T07:56:48Z", "mp");

//*** ExtMixedCollection ***

/*
jst.ExtMixedCollection._class.addMethod("on:", "jsMixedCollection", "instance creation", function (jsMixedCollection){
	if (!jsMixedCollection.jstProxy || jsMixedCollection.jstProxy.jstWrapper() == jst.nil)
		//novou instanci vyrobi jen poprve
		this.basicNew().initialize().wrap_(jsMixedCollection);
	return jsMixedCollection.jstProxy.jstWrapper();
}, null, "2011-12-01T09:39:15Z", "mp");
	
jst.ExtMixedCollection._class.addMethod("new", "", "instance creation", function(){
	return this.on_(new Ext.util.MixedCollection);
});
*/

jst.ExtMixedCollection._class.addMethod("listenerClass", "", "accessing", 
	"\t^ ExtMixedCollectionListener",
	null, "2013-06-22T18:13:03Z", "mp");

jst.ExtMixedCollection.addMethod("asCollection", "", "converting", 
	"\t^ self items",
	null, "2012-07-03T14:06:14Z", "mp");

jst.ExtMixedCollection.addMethod("items", "", "accessing", 
	"\t^ obj at: #items",
	null, "2012-01-20T23:04:59Z", "mp");

jst.ExtMixedCollection.addMethod("itemKeys", "", "accessing", 
	"\t\"Methods #keys are used by inspectors\"" +
	"\n\t^ obj at: #keys",
	null, "2012-08-12T09:18:29Z", "mp");

jst.ExtMixedCollection.addMethod("at:", "key", "accessing", 
	"\t^ self items at: (self itemKeys indexOf: key)",
	null, "2013-09-16T07:56:41Z", "mp");

jst.ExtMixedCollection.addMethod("removeAll", "", "removing", "\tobj clear");

jst.ExtMixedCollection.addMethod("size", "", "accessing", 
	"\t^ obj getCount",
	null, "2011-09-29T15:17:57Z", "mp");

jst.ExtMixedCollection.addMethod("do:", "aBlock", "enumerating", 
	"\tobj perform: #each with: [:ea | aBlock value: ea jstWrapper]",
	null, "2011-09-30T06:29:25Z", "mp");

jst.ExtMixedCollection.addMethod("first", "", "accessing", 
	"\t^ self items first jstWrapper",
	null, "2011-09-30T06:36:13Z", "mp");

jst.ExtMixedCollection.addMethod("second", "", "accessing", 
	"\t^ self items second jstWrapper",
	null, "2013-02-16T21:10:12Z", "mp");

jst.ExtMixedCollection.addMethod("third", "", "accessing", 
	"\t^ self items third jstWrapper",
	null, "2013-02-16T21:10:31Z", "mp");

jst.ExtMixedCollection.addMethod("last", "", "accessing", 
	"\t^ self items last jstWrapper",
	null, "2011-09-30T06:36:37Z", "mp");
/*
jst.ExtMixedCollection.addMethod("on:do:", "eventName aBlock", "event handling", 
	"\t\"not ExtDefaultListener\"" +
	"\n\tself addListener: (ExtListener on: eventName do: aBlock)",
	null, "2012-04-17T08:15:21Z", "mp");

jst.ExtMixedCollection.addMethod("addEvent", "", "events", 
	"\t\"returned handler block or instance of ExtAddListener is installed on initialization\"",
	null, "2012-04-15T21:01:32Z", "mp");
*/

//*** ExtContainerLayout ***

jst.ExtContainerLayout._class.addMethod("layoutType", "", "accessing", 
	"\t^ (self name copyFrom: 4 to: self name size - 6) asLowercase");

jst.ExtContainerLayout.addMethod("wrap:", "jsObject", "accessing", 
	"\tobj ifNil: [" +
	"\n\t\tsuper wrap: (obj := jsObject)]",
	null, "2012-03-15T15:23:02Z", "mp");

jst.ExtContainerLayout.addMethod("at:ifAbsent:", "key aBlock", "accessing", 
	"\t\"My inspector uses this method\"" +
	"\n\t^ obj " +
	"\n\t\tifNotNil: [obj at: key ifAbsent: aBlock] " +
	"\n\t\tifNil: [config at: key ifAbsent: aBlock]",
	null, "2012-03-15T15:24:19Z", "mp");

jst.ExtContainerLayout.addMethod("keys", "", "accessing", 
	"\t\"My inspector uses this method\"" +
	"\n\t^ obj ifNotNil: [obj keys] ifNil: [config keys]",
	null, "2012-03-15T15:25:23Z", "mp");

jst.ExtContainerLayout.addMethod("at:by:put:", "optionName fceName anObject", "private", 
	"\tobj" +
	"\n\t\tifNil: [config at: optionName put: anObject]" +
	"\n\t\tifNotNil: [obj perform: fceName with: anObject asJsObject]",
	null, "2012-03-15T15:40:09Z", "mp");

jst.ExtContainerLayout.addMethod("container", "", "accessing", 
	"\t^ (obj at: #container) jstWrapper",
	null, "2012-03-15T20:17:55Z", "mp");

jst.ExtContainerLayout.addMethod("activeItem", "", "accessing", 
	"\t^ (obj at: #activeItem) jstWrapper",
	null, "2013-02-05T16:17:20Z", "mp");

jst.ExtContainerLayout.addMethod("activeItem:", "indexOrId", "accessing", 
	"\t\"ExtAccordionLayout and ExtCardLayout only\"" +
	"\n\tobj perform: #setActiveItem with: (" +
	"\n\t\tindexOrId isNumber ifTrue: [indexOrId-1] ifFalse: indexOrId)",
	null, "2012-06-11T19:51:42Z", "mp", 1);

jst.ExtContainerLayout.addMethod("activeItem:", "anObject", "accessing", 
	"\t\"ExtAccordionLayout and ExtCardLayout only\"" +
	"\n\tobj perform: #setActiveItem with: (" +
	"\n\t\tanObject isNumber ifTrue: [anObject - 1] ifFalse: [anObject asJsObject])",
	null, "2014-02-09T21:43:48Z", "mp"); //jst-ext-core

//*** ExtBorderLayout ***
//*** ExtFitLayout ***

//*** ExtAccordionLayout ***
/*
jst.ExtAccordionLayout.addMethod("activeItem:", "idOrIndex", "accessing", 
	"\tself at: #activeItem by: #setActiveItem put: (" +
	"\n\t\tidOrIndex isNumber ifTrue: [idOrIndex-1] ifFalse: [idOrIndex])",
	null, "2012-03-15T15:42:40Z", "mp");
*/
//*** ExtCardLayout ***
//*** ExtBoxLayout ***

jst.ExtBoxLayout.addMethod("defaultMargins:", "anObject", "accessing-config", 
	"\t\"If the individual contained items do not have a margins property specified, " +
	"\n\tthe default margins from this property will be applied to each item.\"" +
	"\n\tself configAt: #defaultMargins put: anObject",
	null, "2012-02-14T15:21:34Z", "mp");

jst.ExtBoxLayout.addMethod("padding:", "aString", "accessing-config", 
	"\t\"Sets the padding to be applied to all child items managed by this layout. This property must be specified " +
	"\n\tas a string containing space-separated, numeric padding values. The order of the sides associated with each value " +
	"\n\tmatches the way CSS processes padding values\"" +
	"\n\tself configAt: #padding put: aString",
	null, "2013-02-27T22:02:22Z", "mp");

jst.ExtBoxLayout.addMethod("withStretchAlign", "", "accessing-config", 
	"\t\"Child items are stretched horizontally or vertically to fill the width or height of the container\"" +
	"\n\tself configAt: #align put: #stretch",
	null, "2013-02-27T22:00:23Z", "mp");

jst.ExtBoxLayout.addMethod("withStretchMaxAlign", "", "accessing-config", 
	"\t\"Child items are stretched horizontally or vertically to the width or height of the largest item.\"" +
	"\n\tself configAt: #align put: #stretchmax",
	null, "2013-02-27T22:01:19Z", "mp");

jst.ExtBoxLayout.addMethod("flex:", "aNumber", "accessing-config", 
	"\t\"This configuation option is to be applied to child items of the container managed by this layout. " +
	"\n\tEach child item with a flex property will be flexed horizontally or vertically according to each item's relative flex value " +
	"\n\tcompared to the sum of all items with a flex value specified. Any child items that have either a flex = 0 " +
	"\n\tor flex = undefined will not be 'flexed' (the initial size will not be changed).\"" +
	"\n\tself configAt: #flex put: aNumber",
	null, "2013-02-27T21:51:01Z", "mp");

//*** ExtHBoxLayout ***

jst.ExtHBoxLayout.addMethod("withTopAlign", "", "accessing-config", 
	"\t\"Child items are aligned vertically at the top of the container (default)\"" +
	"\n\tself configAt: #align put: #top",
	null, "2013-02-27T21:58:09Z", "mp");

jst.ExtHBoxLayout.addMethod("withMiddleAlign", "", "accessing-config", 
	"\t\"Child items are aligned vertically in the middle of the container\"" +
	"\n\tself configAt: #align put: #middle",
	null, "2013-02-27T21:57:39Z", "mp");

//*** ExtVBoxLayout ***

jst.ExtVBoxLayout.addMethod("withLeftAlign", "", "accessing-config", 
	"\t\"Child items are aligned horizontally at the left side of the container (default)\"" +
	"\n\tself configAt: #align put: #left",
	null, "2013-02-27T21:58:49Z", "mp");

jst.ExtVBoxLayout.addMethod("withCenterAlign", "", "accessing-config", 
	"\t\"Child items are aligned horizontally at the mid-width of the container\"" +
	"\n\tself configAt: #align put: #center",
	null, "2013-02-27T21:59:09Z", "mp");

//*** ExtTableLayout ***

jst.ExtTableLayout.addMethod("columns:", "aNumber", "accessing-config", 
	"\t\"The total number of columns to create in the table for this layout. If not specified, " +
	"\n\tall Components added to this layout will be rendered into a single row using one column per Component.\"" +
	"\n\tself configAt: 'columns' put: aNumber",
	null, "2012-09-29T16:38:09Z", "mp");

jst.ExtTableLayout.addMethod("tableAttrs:", "anObject", "accessing-config", 
	"\t\"An object containing properties which are added to the DomHelper specification used to create the layout's table element.\"" +
	"\n\tself configAt: 'tableAttrs' put: anObject asDictionary asJsObject",
	null, "2012-09-29T21:53:39Z", "mp");

/* ** ExtCenterLayout ***

nefunguje dobre, vyresil jsem jinak
jst.ExtCenterLayout._class.addMethod("layoutType", "", "accessing", 
	"\t^ 'ux.center'",
	null, "2013-02-14T14:52:15Z", "mp");
*/

//*** ExtContainer ***

jst.ExtContainer._class.addMethod("xtype", "", "accessing", "\t^ #container");

//jst.ExtContainer._class.addMethod("initialize", "", "class initialization", 
//	"\tLayoutTypes := #(absolute accordion anchor auto border card column fit form hbox menu table toolbar vbox)");	
//jst.ExtContainer.initialize();

jst.ExtContainer.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tconfig at: #items put: OrderedCollection new." +
	"\n\tcenterLayout := false",
	null, "2013-02-17T23:03:29Z", "mp");

jst.ExtContainer.addMethod("rootContainer", "", "accessing", "\t^ self ownerContainer ifNil: [self] ifNotNilDo: [:c | c rootContainer]");

jst.ExtContainer.addMethod("items", "", "accessing", 
	"\t^ obj" +
	"\n\t\tifNil: [config at: #items]" +
	"\n\t\tifNotNil: [ExtMixedCollection wrap: obj items]",
	null, "2011-09-29T09:55:19Z", "mp");

jst.ExtContainer.addMethod("items:", "aCollection", "accessing", 
	"\tobj" +
	"\n\t\tifNil: [config at: #items put: aCollection]" +
	"\n\t\tifNotNil: [obj perform: #items with: aCollection asJsObject." +
	"\n\t\t\tobj doLayout]",
	null, "2011-10-12T09:59:45Z", "mp");

jst.ExtContainer.addMethod("layout:", "anObject", "accessing-config", 
	"\t(anObject isKindOf: ExtContainerLayout) ifFalse: [" +
	"\n\t\tself error: 'Invalid layout class: ', anObject className]." +
	"\n\tlayout := anObject." +
	"\n\tself configAt: #layout put: anObject class layoutType." +
	"\n\tself configAt: #layoutConfig put: anObject config",
	null, "2012-03-15T11:02:25Z", "mp");
/*
jst.ExtContainer.addMethod("layout", "", "accessing", 
	"\t(JSObjectProxy isNeededOn: obj getLayout) ifTrue: [" +
	"\n\t\t(layout ifNil: [layout := ExtContainerLayout new \"default layout\"])" +
	"\n\t\t\twrap: obj getLayout]." +
	"\n\t^ layout",
	null, "2012-03-15T21:13:33Z", "mp");

jst.ExtContainer.addMethod("layout", "", "accessing", 
	"\t(JSObjectProxy isNeededOn: obj layout) ifTrue: [" +
	"\n\t\t(layout ifNil: [layout := ExtContainerLayout new \"default layout\"])" +
	"\n\t\t\twrap: obj layout]." +
	"\n\t^ layout",
	null, "2012-06-11T19:45:50Z", "mp");
*/
jst.ExtContainer.addMethod("layout", "", "accessing", 
	"\t(JSObjectProxy isNeededOn: (obj at: #layout)) ifTrue: [" +
	"\n\t\t(layout ifNil: [layout := ExtContainerLayout new \"default layout\"])" +
	"\n\t\t\twrap: (obj at: #layout)]." +
	"\n\t^ layout",
	null, "2013-05-06T14:00:20Z", "mp");

jst.ExtContainer.addMethod("withAbsoluteLayout", "", "accessing-config", "\tself configAt: #layout put: #absolute");
jst.ExtContainer.addMethod("withAccordionLayout", "", "accessing-config", "\tself configAt: #layout put: #accordion");
jst.ExtContainer.addMethod("withAnchorLayout", "", "accessing-config", "\tself configAt: #layout put: #anchor");
jst.ExtContainer.addMethod("withAutoLayout", "", "accessing-config", "\tself configAt: #layout put: #auto");
jst.ExtContainer.addMethod("withBorderLayout", "", "accessing-config", "\tself configAt: #layout put: #border");
jst.ExtContainer.addMethod("withCardLayout", "", "accessing-config", "\tself configAt: #layout put: #card");
jst.ExtContainer.addMethod("withColumnLayout", "", "accessing-config", "\tself configAt: #layout put: #column");
jst.ExtContainer.addMethod("withFitLayout", "", "accessing-config", "\tself configAt: #layout put: #fit");
jst.ExtContainer.addMethod("withFormLayout", "", "accessing-config", "\tself configAt: #layout put: #form");
jst.ExtContainer.addMethod("withHBoxLayout", "", "accessing-config", "\tself configAt: #layout put: #hbox");
jst.ExtContainer.addMethod("withMenuLayout", "", "accessing-config", "\tself configAt: #layout put: #menu");
jst.ExtContainer.addMethod("withTableLayout", "", "accessing-config", "\tself configAt: #layout put: #table");
jst.ExtContainer.addMethod("withToolbarLayout", "", "accessing-config", "\tself configAt: #layout put: #toolbar");
jst.ExtContainer.addMethod("withVBoxLayout", "", "accessing-config", "\tself configAt: #layout put: #vbox");

/*
jst.ExtContainer.addMethod("withCenterLayout", "", "accessing-config", 
	"\tself configAt: #layout put: 'ux.center'",
	null, "2013-02-14T14:51:55Z", "mp");
*/

jst.ExtContainer.addMethod("centerLayout", "", "testing", 
	"\t^ centerLayout",
	null, "2013-02-17T23:06:34Z", "mp");

/*
jst.ExtContainer.addMethod("add:", "aComponent", "adding items", 
	"\tobj" +
	"\n\t\tifNil: [(config at: #items) add: aComponent]" +
	"\n\t\tifNotNil: [" +
	"\n\t\t\tobj perform: #add with: aComponent asJsObject." +
	"\n\t\t\tobj doLayout]." +
	"\n\t^ aComponent",
	null, "2011-10-12T12:43:14Z", "mp"); 
 */
jst.ExtContainer.addMethod("add:", "aComponent", "adding items", 
	"\tobj" +
	"\n\t\tifNil: [(config at: #items) add: aComponent." +
	"\n\t\t\t(centerLayout and: [aComponent respondsTo: #doLayout]) ifTrue: [" +
	"\n\t\t\t\taComponent on: #afterrender do: [:p | p doLayout]]]" +
	"\n\t\tifNotNil: [" +
	"\n\t\t\tobj perform: #add with: aComponent asJsObject." +
	"\n\t\t\tobj doLayout]." +
	"\n\t^ aComponent",
	null, "2013-02-19T14:30:40Z", "mp");
/*
jst.ExtContainer.addMethod("withCenterLayout", "", "accessing-config", 
	"\t| pb |" +
	"\n\tself withAbsoluteLayout;" +
	"\n\t\tcls: 'x-panel-mc';" +
	"\n\t\tstyle: 'padding-top: 0px';" +
	"\n\t\tautoScroll: true;" +
	"\n\t\tadd: (pb := ExtBoxComponent new style: 'background-color: white');" +
	"\n\t\ton: #resize do: [:p :w :h | | page |" +
	"\n\t\t\tpage := self items second." +
	"\n\t\t\tpage x: ((w - page width / 2) max: 0)." +
	"\n\t\t\tpb x: page x." +
	"\n\t\t\tpb width: page width." +
	"\n\t\t\tpb height: h." +
	"\n\t\t\t((page config includesKey: #height) and: [page height isNumber]) ifTrue: [" +
	"\n\t\t\t\t(page config includesKey: #y) ifFalse: [" +
	"\n\t\t\t\t\tpage y: ((h - page height / 2) max: 0)." +
	"\n\t\t\t\t\tpb y: page y]." +
	"\n\t\t\t\tpb height: page height]." +
	"\n\t\t\tpage autoHeight ifTrue: [" +
	"\n\t\t\t\tpage y: 0; height: h.]" +
	"\n\t\t]." +
	"\n\tcenterLayout := true.",
	null, "2013-02-19T14:24:39Z", "mp");

jst.ExtContainer.addMethod("withCenterLayout", "", "accessing-config", 
	"\t| pb |" +
	"\n\tself withAbsoluteLayout;" +
	"\n\t\tcls: 'x-panel-mc';" +
	"\n\t\tstyle: 'padding-top: 0px';" +
	"\n\t\tautoScroll: true;" +
	"\n\t\tadd: (pb := ExtBoxComponent new style: 'background-color: white');" +
	"\n\t\ton: #resize do: [:p :w :h | | page |" +
	"\n\t\t\tpage := self items second." +
	"\n\t\t\tpage x: ((w - page width / 2) max: 0)." +
	"\n\t\t\tpb x: page x." +
	"\n\t\t\tpb width: page width." +
	"\n\t\t\tpb height: h." +
	"\n\t\t\t((page config includesKey: #height) and: [page height isNumber]) ifTrue: [" +
	"\n\t\t\t\t(page config includesKey: #y) ifFalse: [" +
	"\n\t\t\t\t\tpage y: ((h - page height / 2) max: 0)]." +
	"\n\t\t\t\tpb y: page y." +
	"\n\t\t\t\tpb height: page height]." +
	"\n\t\t\tpage autoHeight ifTrue: [" +
	"\n\t\t\t\tpage y: 0; height: h.]" +
	"\n\t\t]." +
	"\n\tcenterLayout := true.",
	null, "2013-02-19T15:50:32Z", "mp");
*/

/* Kdyz nastavuji jen x nebo y, stejne se vola setPosition a druhy rozmer muze byt null, coz bohuzel IE8 nesnese :( 
 * Metodu jsem tedy vylepsil tak, ze vzdy spocitam x i y a volam jen #position:
 * Navic je lepsi i v tom, ze napred vypocitam vsechny potrebne hodnoty a pak je naraz nastavim!
**/
jst.ExtContainer.addMethod("withCenterLayout", "", "accessing-config", 
	"\t| pb |" +
	"\n\tself withAbsoluteLayout;" +
	"\n\t\tcls: 'x-panel-mc';" +
	"\n\t\tstyle: 'padding-top: 0px';" +
	"\n\t\tautoScroll: true;" +
	"\n\t\tadd: (pb := ExtBoxComponent new style: 'background-color: white');" +
	"\n\t\ton: #resize do: [:p :w :h | | page x y pbh pos |" +
	"\n\t\t\tpage := self items second." +
	"\n\t\t\tx := (w - page width / 2) max: 0." +
	"\n\t\t\ty := 0." +
	"\n\t\t\tpbh := h." +
	"\n\t\t\t((page config includesKey: #height) and: [page height isNumber] and: [page autoHeight not]) ifTrue: [" +
	"\n\t\t\t\ty := page config at: #y ifAbsent: [" +
	"\n\t\t\t\t\t(h - page height / 2) max: 0]." +
	"\n\t\t\t\tpbh := page height]." +
	"\n\t\t\tpage position: (pos := Point x: x y: y)." +
	"\n\t\t\tpb position: pos." +
	"\n\t\t\tpb width: page width." +
	"\n\t\t\tpb height: pbh." +
	"\n\t\t\tpage autoHeight ifTrue: [" +
	"\n\t\t\t\tpage height: h]" +
	"\n\t\t]." +
	"\n\tcenterLayout := true.",
	null, "2013-03-07T21:58:01Z", "mp"); //jst-ext-core

jst.ExtContainer.addMethod("activeItem:", "idOrIndex", "accessing", 
	"\t\"A string component id or the numeric index of the component that should be initially activated " +
	"\n\twithin the container's layout on render (index 0 = the first item in the container's collection). " +
	"\n\tThe activeItem only applies to layout styles that can display items one at a time " +
	"\n\t(like ExtAccordionLayout, ExtCardLayout and ExtFitLayout). Related to ExtContainerLayout.activeItem.\"" +
	"\n\tobj ifNil: [" +
	"\n\t\tconfig at: #activeItem put: (idOrIndex isNumber ifTrue: [idOrIndex-1] ifFalse: idOrIndex)" +
	"\n\t] ifNotNil: [self layout activeItem: idOrIndex]",
	null, "2013-01-10T08:13:40Z", "mp", 1);

jst.ExtContainer.addMethod("activeItem:", "anObject", "accessing", 
	"\t\"A string component id or the numeric index of the component that should be initially activated " +
	"\n\twithin the container's layout on render (index 0 = the first item in the container's collection). " +
	"\n\tThe activeItem only applies to layout styles that can display items one at a time " +
	"\n\t(like ExtAccordionLayout, ExtCardLayout and ExtFitLayout). Related to ExtContainerLayout.activeItem.\"" +
	"\n\tobj ifNil: [config at: #activeItem put: " +
	"\n\t\t(anObject isNumber ifTrue: [anObject - 1] ifFalse: [anObject asJsObject])" +
	"\n\t] ifNotNil: [self layout activeItem: anObject]",
	null, "2014-02-09T21:44:36Z", "mp"); //jst-ext-core

jst.ExtContainer.addMethod("activeItem", "", "accessing", 
	"\t^ obj" +
	"\n\t\tifNil: [config at: #activeItem ifAbsent: nil]" +
	"\n\t\tifNotNil: [self layout activeItem]",
	null, "2012-06-11T19:44:55Z", "mp", 1);

jst.ExtContainer.addMethod("activeItem", "", "accessing", 
	"\t^ centerLayout " +
	"\n\t\tifTrue: [self items last]" +
	"\n\t\tifFalse: [\tobj" +
	"\n\t\t\tifNil: [config at: #activeItem ifAbsent: nil]" +
	"\n\t\t\tifNotNil: [self layout activeItem]]",
	null, "2013-02-19T21:10:08Z", "mp", 1);

jst.ExtContainer.addMethod("activeItem", "", "accessing", 
	"\t^ centerLayout " +
	"\n\t\tifTrue: [self items last]" +
	"\n\t\tifFalse: [\tobj" +
	"\n\t\t\tifNil: [config at: #activeItem ifAbsent: nil]" +
	"\n\t\t\tifNotNil: [self layout ifNotNilDo: [:lt | lt activeItem]]]",
	null, "2013-05-06T13:55:58Z", "mp");

jst.ExtContainer.addMethod("doLayout", "", "layout", 
	"\t\"Force this container's layout to be recalculated. A call to this function is required after adding a new component " +
	"\n\tto an already rendered container, or possibly after changing sizing/position properties of child components." +
	"\n\tCalls doLayout recursively for each subcontainer\"" +
	"\n\tobj perform: #doLayout",
	null, "2012-06-14T15:28:19Z", "mp");

jst.ExtContainer.addMethod("doShallowLayout", "", "layout", 
	"\t\"Only calc the layout of this component, and let child components auto calc layouts as required\"" +
	"\n\tobj perform: #doLayout with: true",
	null, "2012-06-14T15:29:16Z", "mp");

jst.ExtContainer.addMethod("forceLayout", "", "layout", 
	"\t\"Force a layout to occur, even if the item is hidden.\"" +
	"\n\tobj perform: #doLayout with: false with: true",
	null, "2012-06-14T15:30:06Z", "mp");

jst.ExtContainer.addMethod("defaults:", "dictionaryOrBlock", "accessing-config", 
	"\t\"This option is a means of applying default settings to all added items whether added through the items config" +
	"\n\tor via the add or insert methods. If an added item is a config object, and not an instantiated Component, " +
	"\n\tthen the default properties are unconditionally applied. If the added item is an instantiated Component, " +
	"\n\tthen the default properties are applied conditionally so as not to override existing properties in the item." +
	"\n\tIf the defaults option is specified as a function, then the function will be called using this Container as the scope " +
	"\n\t(this reference) and passing the added item as the first parameter. Any resulting object from that call is then " +
	"\n\tapplied to the item as default properties. For example, to automatically apply padding to the body of each of a set " +
	"\n\tof contained Ext.Panel items, you could pass: defaults: {bodyStyle:'padding:15px'}.\"" +
	"\n\tself configAt: 'defaults' put: dictionaryOrBlock",
	null, "2012-08-18T14:22:54Z", "mp");

jst.ExtContainer.addMethod("defaults", "", "accessing-config", 
	"\t^ config at: 'defaults' ifAbsentPut: [Dictionary new]",
	null, "2012-08-18T14:26:13Z", "mp");

jst.ExtContainer.addMethod("defaultAt:put:", "key anObject", "accessing-config", 
	"\tself defaults at: key put: anObject",
	null, "2012-08-18T14:27:11Z", "mp");

//*** ExtMessageBox ***

with (jst.ExtMessageBox) {

	addMethod("initialize", "", "initialization", 
		"\tsuper initialize." +
		"\n\tself asJsObject jstWrapper: self",
		null, "2011-10-17T14:50:01Z", "mp");

	addMethod("title:", "aString", "config", "\tconfig at: #title put: aString");
	addMethod("text:", "aString", "config", "\tconfig at: #msg put: aString");

	addMethod("width:", "aNumber", "config", "\tconfig at: #width put: aNumber");
	addMethod("height:", "aNumber", "config", "\tconfig at: #msg put: aNumber");

	addMethod("callback:", "aBlock", "config", "\tconfig at: #fn put: aBlock");

	addMethod("bePrompt", "", "config-prompt", 
		"\tconfig at: #buttons ifAbsent: [self btnOkCancel]." +
		"\n\tconfig at: #prompt put: true",
		null, "2011-10-12T10:01:16Z", "mp");
	
	addMethod("beMultiline", "", "config-prompt", "\tconfig at: #multiline put: true");
	
	addMethod("value:", "aString", "config-prompt", "\tconfig at: #value put: aString");
	
	addMethod("textHeight:", "aNumber", "config-prompt", 
		"\tself beMultiline." +
		"\n\tconfig at: #defaultTextHeight put: aNumber");

	addMethod("btnOk", "", "config-buttons", "\tconfig at: #buttons put: (self asJsObject at: #OK)");
	addMethod("btnCancel", "", "config-buttons", "\tconfig at: #buttons put: (self asJsObject at: #CANCEL)");
	addMethod("btnOkCancel", "", "config-buttons", "\tconfig at: #buttons put: (self asJsObject at: #OKCANCEL)");
	addMethod("btnYesNo", "", "config-buttons", "\tconfig at: #buttons put: (self asJsObject at: #YESNO)");
	addMethod("btnYesNoCancel", "", "config-buttons", "\tconfig at: #buttons put: (self asJsObject at: #YESNOCANCEL)");
	
	addMethod("beInfo", "", "config-icon", "\tconfig at: #icon put: (self asJsObject at: #INFO)");	
	addMethod("beError", "", "config-icon", "\tconfig at: #icon put: (self asJsObject at: #ERROR)");	
	addMethod("beQuestion", "", "config-icon", "\tconfig at: #icon put: (self asJsObject at: #QUESTION)");	
	addMethod("beWarning", "", "config-icon", "\tconfig at: #icon put: (self asJsObject at: #WARNING)");	

	addMethod("show", "", "processing", "\tself asJsObject perform: #show with: config asJsObject");

	_class.addMethod("alert:", "aString", "processing", "\tself new text: aString; btnOk; show");
	
};

jst.ExtMessageBox.addMethod("icon:", "aString", "config", 
	"\t\"Adds the specified icon to the dialog. By default, the class 'ext-mb-icon' is applied for default styling, " +
	"\n\tand the class passed in is expected to supply the background image url.\"" +
	"\n\tconfig at: #icon put: aString",
	null, "2012-08-30T19:56:08Z", "mp");

jst.ExtMessageBox.addMethod("closable:", "aBoolean", "config", 
	"\t\"False to hide the top-right close button (defaults to true). Note that progress and wait dialogs will ignore " +
	"\n\tthis property and always hide the close button as they can only be closed programmatically.\"" +
	"\n\tconfig at: 'closable' put: aBoolean",
	null, "2012-08-30T20:03:15Z", "mp");

jst.ExtMessageBox.initialize = function() {
	//set proxy
	jst.JSObjectProxy.on_(Ext.MessageBox);
	if (jst.Smalltalk.userLanguage() == 'cs')
		Ext.MessageBox.buttonText = {ok: 'OK', cancel: 'Storno', yes: 'Ano', no: 'Ne'};
	return this;
};
jst.ExtMessageBox._class.addMethod("initialize", "", "class initialization");

jst.initializeClass(jst.ExtMessageBox);

jst.ExtMessageBox.addMethod("asJsObject", "", "converting", 
	"\t^ self class asJsObject",
	null, "2012-08-30T07:13:56Z", "mp");

jst.ExtMessageBox.addMethod("hide", "", "processing", 
	"\t\"Hides the message box if it is displayed\"" +
	"\n\tself asJsObject perform: #hide",
	null, "2012-08-30T06:59:04Z", "mp");

jst.ExtMessageBox._class.addMethod("wait:", "aString", "processing", 
	"\tself asJsObject perform: 'wait' with: aString",
	null, "2012-08-30T07:14:56Z", "mp");

jst.ExtMessageBox._class.addMethod("asJsObject", "", "converting", function (){
	return Ext.MessageBox;
},
	null, "2012-08-30T07:12:55Z", "mp");

jst.ExtMessageBox._class.addMethod("hide", "", "processing", 
	"\t^ self asJsObject perform: #hide",
	null, "2012-08-30T07:15:53Z", "mp");

jst.ExtMessageBox._class.instanceVariableNames_("msgCt");

jst.ExtMessageBox._class.addMethod("inform:", "msg", "processing", function (msg){
    //msg can be a String or an Association
    if (!this.msgCt){
        this.msgCt = Ext.DomHelper.insertFirst(document.body, {id:'msg-div'}, true);
    }
    this.msgCt.alignTo(document, 't-t');
    var title = msg._key || '';
    var box = ['<div class="msg">',
        '<div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div>',
        '<div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc"><h3>', title, '</h3>', msg.value(), '</div></div></div>',
        '<div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div>',
        '</div>'].join('');
    var m = Ext.DomHelper.append(this.msgCt, {html: box}, true);
    m.slideIn('t').pause(5).ghost("t", {remove:true});
},
	null, "2013-02-19T10:26:42Z", "mp");

// *** ExtUIManager ***

jst.ExtUIManager._class.addMethod("isActiveManager", "", "testing", 
	"\t^ true",
	null, "2011-09-21T19:13:29Z", "mp");

jst.ExtUIManager.addMethod("request:thenDo:", "queryString aBlock", "ui requests", 
	"\tExtMessageBox new " +
	"\n\t\ttext: queryString; " +
	"\n\t\tbePrompt; " +
	"\n\t\tcallback: [:btn :text | btn = #ok ifTrue: [" +
	"\n\t\t\taBlock value: text]]; " +
	"\n\t\tshow",
	null, "2011-11-18T11:55:19Z", "mp");

jst.ExtUIManager.addMethod("confirm:thenDo:", "aString aBlock", "ui requests", 
	"\tExtMessageBox new " +
	"\n\t\ttext: aString; " +
	"\n\t\tbeQuestion; " +
	"\n\t\tbtnOkCancel;" +
	"\n\t\tcallback: [:btn | btn = #ok ifTrue: aBlock]; " +
	"\n\t\tshow",
	null, "2011-09-22T13:54:48Z", "mp", 1);

jst.ExtUIManager.addMethod("confirm:thenDo:", "msg aBlock", "ui requests", 
	"\t\"msg is a string or an association or even a block\"" +
	"\n\tExtMessageBox new " +
	"\n\t\ttitle: ((msg respondsTo: #key) ifTrue: [msg key] ifFalse: '');" +
	"\n\t\ttext: msg value asString; " +
	"\n\t\tbeQuestion; " +
	"\n\t\tbtnOkCancel;" +
	"\n\t\tcallback: [:btn | btn = #ok ifTrue: aBlock]; " +
	"\n\t\tshow",
	null, "2013-05-15T08:47:59Z", "mp");

jst.ExtUIManager.addMethod("inform:", "aString", "ui requests", 
	"\tExtMessageBox new " +
	"\n\t\ttext: aString; " +
	"\n\t\tbtnOk; " +
	"\n\t\tshow",
	null, "2011-09-21T19:14:16Z", "mp", 1);

jst.ExtUIManager.addMethod("inform:", "anObject", "ui requests", 
	"\tExtMessageBox inform: anObject",
	null, "2013-02-19T10:30:03Z", "mp", 1);

jst.ExtUIManager.addMethod("inform:", "anObject", "ui requests", 
	"\tExtMessageBox " +
	"\n\t\thide;" +
	"\n\t\tinform: anObject",
	null, "2013-07-04T09:38:22Z", "mp"); //jst-ext-core

jst.ExtUIManager.addMethod("informUser:during:", "aString aBlock", "ui requests", 
	"\tExtMessageBox new" +
	"\n\t\tclosable: false;" +
	"\n\t\ticon: 'mbox-loading';" +
	"\n\t\ttext: aString;" +
	"\n\t\tshow." +
	"\n\tDelayedTask new " +
	"\n\t\tdelay: 200; " +
	"\n\t\ttask: [" +
	"\n\t\t\t[aBlock value] ensure: [" +
	"\n\t\t\t\tExtMessageBox hide]];" +
	"\n\t\trun",
	null, "2012-08-30T20:58:31Z", "mp");

jst.ExtUIManager.addMethod("showErrorInfo:", "anError", "ui requests", 
	"\tExtMessageBox new " +
	"\n\t\tbeError;" +
	"\n\t\ttitle: anError type;" +
	"\n\t\ttext: anError messageText; " +
	"\n\t\tbtnOk;" +
	"\n\t\tshow",
	null, "2012-12-19T09:45:08Z", "mp", 1);

jst.ExtUIManager.addMethod("showErrorInfo:", "anError", "ui requests", 
	"\tExtMessageBox new " +
	"\n\t\tbeError;" +
	"\n\t\ttitle: (anError isString ifTrue: ['Chyba'] ifFalse: [anError type]);" +
	"\n\t\ttext: (anError ifNotString: [anError messageText]); " +
	"\n\t\tbtnOk;" +
	"\n\t\tshow",
	null, "2013-09-16T09:47:46Z", "mp"); //jst-ext-core

/*
jst.ExtUIManager.addMethod("broadcastEvent:with:", "eventName anObject", "system events", 
	"\t\"sends the event to all ext components\"" +
	"\n\tExtComponentMgr default sendEvent: eventName with: anObject",
	null, "2012-12-19T14:14:19Z", "mp");

zpožděné zasílání může zlobit, asi nelze nasazovat takhle plošně - 
např. v #saveMethod: se následně volaná sendEvent: provedla dřív, takže kód přestal fungovat
 
jst.ExtUIManager.addMethod("broadcastEvent:with:", "eventName anObject", "system events", 
	"\t\"sends the event to all ext components\"" +
	"\n\t[ExtComponentMgr default sendEvent: eventName with: anObject] delayed: 10",
	null, "2013-04-12T06:25:15Z", "mp");
*/
jst.ExtUIManager.addMethod("broadcastEvent:with:async:", "eventName anObject aBoolean", "system events", 
	"\t\"sends the event to all ext components\"" +
	"\n\taBoolean ifTrue: [ " +
	"\n\t\t[ExtComponentMgr default sendEvent: eventName with: anObject] delayed: 10" +
	"\n\t] ifFalse: [" +
	"\n\t\tExtComponentMgr default sendEvent: eventName with: anObject]",
	null, "2013-06-23T20:40:34Z", "mp");

// *** TaskRunner ***

/*
jst.TaskRunner._class.addMethod("initialize", "", "class initialization", function (){
	this.__TaskMgr = jst.JSObjectProxy.on_(Ext.TaskMgr);
	return this;
},
	null, "2012-02-09T21:44:20Z", "mp");
*/
jst.TaskRunner._class.addMethod("initialize", "", "class initialization", 
	"\tTaskMgr := JSObjectProxy on: (ExtCore current asJsObject at: 'TaskMgr')",
	null, "2012-09-18T19:23:49Z", "mp");

jst.initializeClass(jst.TaskRunner);

jst.TaskRunner.addMethod("initialize", "", "initialization", 
	"\ttask := Dictionary new." +
	"\n\tself interval: 1000",
	null, "2012-02-10T09:01:11Z", "mp");

jst.TaskRunner.addMethod("start", "", "running", 
	"\ttask at: #run ifAbsent: [" +
	"\n\t\tself on: #run of: self]." +
	"\n\tTaskMgr perform: #start with: task asJsObject",
	null, "2012-02-10T10:09:45Z", "mp");

jst.TaskRunner.addMethod("stop", "", "running", 
	"\tTaskMgr perform: #stop with: task asJsObject",
	null, "2012-02-10T09:08:28Z", "mp");

jst.TaskRunner.addMethod("interval:", "aNumber", "accessing", 
	"\t\"The frequency in milliseconds with which the task should be invoked.\"" +
	"\n\ttask at: #interval put: aNumber",
	null, "2012-02-10T09:10:19Z", "mp");

jst.TaskRunner.addMethod("interval", "", "accessing", 
	"\t^ task at: #interval ifAbsent: nil",
	null, "2012-02-10T09:12:29Z", "mp");

jst.TaskRunner.addMethod("duration:", "aNumber", "accessing", 
	"\t\"(optional) The length of time in milliseconds to invoke the task before stopping automatically (defaults to indefinite).\"" +
	"\n\ttask at: #duration put: aNumber",
	null, "2012-02-10T09:19:58Z", "mp");

jst.TaskRunner.addMethod("duration", "", "accessing", 
	"\t^ task at: #duration ifAbsent: nil",
	null, "2012-02-10T09:20:19Z", "mp");

jst.TaskRunner.addMethod("repeat:", "aNumber", "accessing", 
	"\t\"(optional) The number of times to invoke the task before stopping automatically (defaults to indefinite).\"" +
	"\n\ttask at: #repeat put: aNumber",
	null, "2012-02-10T09:34:02Z", "mp");

jst.TaskRunner.addMethod("repeat", "", "accessing", 
	"\t^ task at: #repeat ifAbsent: nil",
	null, "2012-02-10T09:34:22Z", "mp");

jst.TaskRunner.addMethod("run", "", "running", 
	"\t\"The method to execute each time the task is invoked if #runBlock is not setup (see #start)." +
	"\n\tOverride this method to do something usefull. Return false from this method to terminate the task.\"" +
	"\n\tConsole log: 'An empty task is running at: ', self runCount asString." +
	"\n\t^ self runCount < 5",
	null, "2012-02-13T14:30:30Z", "mp");

jst.TaskRunner.addMethod("runBlock", "", "accessing", 
	"\t^ task at: #run ifAbsent: nil",
	null, "2012-02-10T10:06:58Z", "mp");

jst.TaskRunner.addMethod("runBlock:", "aBlock", "accessing", 
	"\t\"The block to execute each time the task is invoked." +
	"\n\tReturn false from this block to terminate the task.\"" +
	"\n\ttask at: #run put: aBlock." +
	"\n\ttask removeKey: #scope ifAbsent: nil",
	null, "2012-02-10T10:08:27Z", "mp");

jst.TaskRunner.addMethod("on:of:", "aSymbol anObject", "accessing", 
	"\ttask at: #run put: [anObject perform: aSymbol]." +
	"\n\ttask at: #scope put: anObject.",
	null, "2012-02-10T21:55:37Z", "mp");

jst.TaskRunner.addMethod("runCount", "", "running", 
	"\t^ task at: #taskRunCount ifAbsent: 0",
	null, "2012-02-13T13:54:56Z", "mp");

jst.TaskRunner.addMethod("startTime", "", "running", 
	"\t^ task at: #taskStartTime ifPresent: [:msc | DateAndTime fromMilliSeconds: msc]",
	null, "2012-02-13T14:02:10Z", "mp");

jst.TaskRunner.addMethod("runTime", "", "running", 
	"\t^ task at: #taskRunTime ifPresent: [:msc | DateAndTime fromMilliSeconds: msc]",
	null, "2012-02-13T14:04:00Z", "mp");

//*** ExtComponentMgr ***

jst.ExtComponentMgr._class.addMethod("default", "", "accessing", "\t^ Default", "__default");

jst.ExtComponentMgr.addMethod("isRegistered:", "xtype", "testing", 
	"\t^ obj perform: #isRegistered with: xtype");

jst.ExtComponentMgr.addMethod("register:", "anExtComponent", "registration", 
	"\t^ obj perform: #register with: anExtComponent asJsObject");

jst.ExtComponentMgr.addMethod("unregister:", "anExtComponent", "registration", 
	"\t^ anExtComponent ifNotNil: [obj perform: #unregister with: anExtComponent asJsObject]");

jst.ExtComponentMgr.addMethod("all", "", "accessing", 
	"\t^ ExtMixedCollection wrap: (obj at: #all)",
	null, "2011-09-29T15:15:56Z", "mp");

jst.ExtComponentMgr.addMethod("getById:", "aString", "accessing", 
	"\t\"Returns a component by id.\"" +
	"\n\t^ (obj perform: #get with: aString) jstWrapper",
	null, "2012-06-24T14:14:14Z", "mp");

jst.ExtComponentMgr.addMethod("dependents", "", "dependents access", 
	"\t^ self components",
	null, "2011-09-29T18:21:50Z", "mp");

jst.ExtComponentMgr.addMethod("components", "", "accessing", function (){
	var result = jst.OrderedCollection._new();
	this.all().items().do_(function(c){
		if (c.jstProxy && c.jstProxy.jstWrapper() != jst.nil) 
			result.add_(c.jstProxy.jstWrapper());
	});
	return result;
},
	null, "2011-09-30T08:27:19Z", "mp");

jst.ExtComponentMgr.addMethod("onCreate:", "aBlock", "events", 
	"\t(self all eventNames includes: #create) ifFalse: [" +
	"\n\t\tself all addEvents: #(create)]." +
	"\n\tself all on: #create do: aBlock",
	null, "2012-04-17T08:11:51Z", "mp");

jst.ExtComponentMgr._class.addMethod("initialize", "", "class initialization", 
	"\tDefault := self wrap: (ExtCore current asJsObject at: 'ComponentMgr')",
	null, "2012-09-18T19:25:50Z", "mp");

jst.initializeClass(jst.ExtComponentMgr);

//*** ExtAction ***

jst.ExtAction._class.addMethod("target:", "objectOrBlock", "instance creation", 
	"\t^ self new target: objectOrBlock",
	null, "2012-01-27T10:39:43Z", "mp");

jst.ExtAction._class.addMethod("on:of:", "aSymbol anObject", "instance creation", 
	"\t^ self new on: aSymbol of: anObject ",
	null, "2012-01-30T14:54:49Z", "mp");

jst.ExtAction._class.addMethod("asSimpleAction", "", "instance creation", 
	"\t^ self new asSimpleAction",
	null, "2012-02-15T14:13:12Z", "mp");

jst.ExtAction.addMethod("execute", "", "executing", 
	"\tself inform: label -> 'Not yet implemented.' translated",
	null, "2013-02-19T10:46:44Z", "mp");

jst.ExtAction.addMethod("executeOn:", "item", "executing", 
	"\tself inform: item text -> 'Not yet implemented.' translated",
	null, "2013-02-19T10:39:54Z", "mp");

/*
jst.ExtAction.addMethod("target", "", "accessing", 
	"\t^ selector " +
	"\n\t\tifNil: [\"target can be a block\"" +
	"\n\t\t\ttarget value]" +
	"\n\t\tifNotNil: [target perform: selector]",
	null, "2012-01-29T20:12:05Z", "mp");
*/
jst.ExtAction.addMethod("target", "", "accessing", 
	"\ttarget isBlock ifTrue: [" +
	"\n\t\t^ target value]." +
	"\n\tselector ifNotNil: [" +
	"\n\t\t^ target perform: selector]." +
	"\n\t^ target",
	null, "2012-01-29T21:51:51Z", "mp");

jst.ExtAction.addMethod("target:", "objectOrBlock", "accessing", 
	"\ttarget := objectOrBlock",
	null, "2012-01-26T14:18:35Z", "mp");
/*
jst.ExtAction.addMethod("on:of:", "aSymbol anObject", "accessing", 
	"\ttarget := [anObject perform: aSymbol]",
	null, "2012-01-26T14:44:57Z", "mp");
*/
jst.ExtAction.addMethod("on:of:", "aSymbol anObject", "accessing", 
	"\tselector := aSymbol." +
	"\n\ttarget := anObject",
	null, "2012-01-29T20:10:07Z", "mp");

jst.ExtAction.addMethod("icon", "", "accessing", 
	"\t^ icon",
	null, "2012-02-15T14:11:54Z", "mp");

jst.ExtAction.addMethod("icon:", "anObject", "accessing", 
	"\ticon := anObject",
	null, "2012-01-26T13:10:22Z", "mp");

jst.ExtAction.addMethod("iconCls:", "aString", "accessing", 
	"\ticonCls := aString",
	null, "2014-05-12T14:16:02Z", "mp");

jst.ExtAction.addMethod("iconCls", "", "accessing", 
	"\t^ iconCls",
	null, "2014-05-12T14:16:10Z", "mp");

jst.ExtAction.addMethod("label", "", "accessing", 
	"\t^ label",
	null, "2012-01-27T15:13:39Z", "mp");

jst.ExtAction.addMethod("label:", "aString", "accessing", 
	"\tlabel := aString",
	null, "2012-01-26T13:10:22Z", "mp");

jst.ExtAction.addMethod("hotKey:", "anObject", "accessing", 
	"\thotKey := anObject",
	null, "2012-01-26T13:10:22Z", "mp");

jst.ExtAction.addMethod("hotKey", "", "accessing", 
	"\t^ hotKey",
	null, "2012-01-26T13:10:22Z", "mp");

jst.ExtAction.addMethod("itemLabel", "", "accessing", 
	"\t^ hotKey " +
	"\n\t\tifNil: [label asString translated] " +
	"\n\t\tifNotNil: [label asString translated, ' (', hotKey asString, ')']",
	null, "2012-01-26T13:03:24Z", "mp");

jst.ExtAction.addMethod("buttonLabel", "", "accessing", 
	"\t^ label asString translated",
	null, "2012-01-27T15:20:40Z", "mp");

jst.ExtAction.addMethod("isEnabled:", "aBoolean", "accessing", 
	"\tenabled := aBoolean." +
	"\n\telm ifNotNil: [" +
	"\n\t\telm isEnabled: aBoolean]",
	null, "2012-01-27T16:36:32Z", "mp");

/*
jst.ExtAction.addMethod("isEnabled", "", "accessing", 
	"\t^ enabled ifNil: [enabled := true]",
	null, "2012-01-26T14:33:42Z", "mp");
*/

jst.ExtAction.addMethod("isEnabled", "", "accessing", 
	"\t^ enabled ifNil: [self target notNil]",
	null, "2012-02-07T11:26:34Z", "mp");

jst.ExtAction.addMethod("isDisabled:", "aBoolean", "accessing", 
	"\tenabled := aBoolean not." +
	"\n\telm ifNotNil: [" +
	"\n\t\telm isDisabled: aBoolean]",
	null, "2012-01-27T16:36:32Z", "mp");

jst.ExtAction.addMethod("beEnabled", "", "accessing", 
	"\tself isEnabled: true",
	null, "2012-01-27T18:45:39Z", "mp");

jst.ExtAction.addMethod("beDisabled", "", "accessing", 
	"\tself isEnabled: false",
	null, "2012-01-27T18:45:54Z", "mp");

jst.ExtAction.addMethod("asSimpleAction", "", "converting", 
	"\t^ SimpleAction new" +
	"\n\t\tlabel: label;" +
	"\n\t\thotKey: hotKey;" +
	"\n\t\ticon: icon",
	null, "2012-02-15T14:12:38Z", "mp", 1);

jst.ExtAction.addMethod("asSimpleAction", "", "converting", 
	"\t^ SimpleAction new" +
	"\n\t\tlabel: label;" +
	"\n\t\thotKey: hotKey;" +
	"\n\t\ticon: icon;" +
	"\n\t\ticonCls: iconCls",
	null, "2014-05-12T14:18:43Z", "mp"); //jst-ext-core

jst.ExtAction.addMethod("bindTo:", "keyMap", "public", 
	"\thotKey ifNotNil: [ | k |" +
	"\n\t\tk := hotKey asLowercase." +
	"\n\t\tkeyMap bindKey: k ctrl: true shift: k ~= hotKey alt: false handler: [self execute] stopEvent: true." +
	"\n\t\tkeyMap bindKey: k ctrl: false shift: k ~= hotKey alt: true handler: [self execute] stopEvent: true]");

jst.ExtAction.addMethod("tooltip:", "anObject", "accessing", 
	"\ttooltip := anObject",
	null, "2013-06-03T13:04:54Z", "mp");

jst.ExtAction.addMethod("tooltip", "", "accessing", 
	"\t^ tooltip",
	null, "2013-06-03T13:05:08Z", "mp");

/* moved to Object class
jst.ExtAction.addMethod("broadcastEvent:with:", "eventName anObject", "system events", 
	"\t\"sens the event to all ext components\"" +
	"\n\tExtComponentMgr default sendEvent: eventName with: anObject",
	null, "2012-08-17T09:43:03Z", "mp");
*/

//*** SimpleAction ***

jst.SimpleAction.addMethod("target", "", "accessing", 
	"\t^ target value",
	null, "2012-02-01T07:46:19Z", "mp");

jst.SimpleAction.addMethod("execute", "", "executing", 
	"\tself target perform: selector",
	null, "2012-02-01T07:46:26Z", "mp");

//*** ExtDefaultListener ***

/*
jst.ExtDefaultListener.addMethod("handler", "", "accessing", 
	"\t^ [:receiver |" +
	"\n\t\tself handlerBlock valueWithPossibleArgument: receiver jstWrapper]",
	null, "2012-08-15T16:26:08Z", "mp", 1);
*/

jst.ExtDefaultListener.addMethod("checkHandler", "", "handlers", 
	"\t^ [:receiver :aBoolean |" +
	"\n\t\tself handlerBlock value: receiver jstWrapper value: aBoolean]",
	null, "2013-06-22T09:34:32Z", "mp");

jst.ExtDefaultListener.addMethod("checkchangeHandler", "", "handlers", 
	"\t^ self checkHandler",
	null, "2013-06-22T09:34:40Z", "mp");

jst.ExtDefaultListener.addMethod("toggleHandler", "", "handlers", 
	"\t^ self checkHandler",
	null, "2013-06-22T09:34:25Z", "mp");

jst.ExtDefaultListener.addMethod("beforeexpandHandler", "", "handlers", 
	"\t^ self checkHandler",
	null, "2013-06-22T09:57:32Z", "mp");

jst.ExtDefaultListener.addMethod("beforecollapseHandler", "", "handlers", 
	"\t^ self checkHandler",
	null, "2013-06-22T10:15:44Z", "mp");

jst.ExtDefaultListener.addMethod("statechangeHandler", "", "handlers", 
	"\t\"Fires when a state change occurs." +
	"\n\t\tkey : String - The state key which was changed" +
	"\n\t\tvalue : String - The encoded value for the state\"" +
	"\n\t^ [:provider :key :value |" +
	"\n\t\tself handlerBlock value: provider jstWrapper value: key value: value]",
	null, "2013-06-22T14:01:18Z", "mp");

jst.ExtDefaultListener.addMethod("resizeHandler", "", "handlers", 
	"\t^ [:receiver :adjWidth :adjHeight :rawWidth :rawHeight|" +
	"\n\t\tself handlerBlock valueWithPossibleArgs: {" +
	"\n\t\t\treceiver jstWrapper. " +
	"\n\t\t\tadjWidth. \"The box-adjusted width that was set\"" +
	"\n\t\t\tadjHeight. \"The box-adjusted height that was set\"" +
	"\n\t\t\trawWidth. \"The width that was originally specified\"" +
	"\n\t\t\trawHeight \"The height that was originally specified\"" +
	"\n\t\t}]",
	null, "2013-06-22T17:40:51Z", "mp");

jst.ExtDefaultListener.addMethod("bodyresizeHandler", "", "handlers", 
	"\t^ [:receiver :width :height | self handlerBlock " +
	"\n\t\tvalue: receiver jstWrapper " +
	"\n\t\tvalue: width \"The receiver's new width\"" +
	"\n\t\tvalue: height \"The receiver's new height\" ]",
	null, "2013-06-22T17:48:15Z", "mp");

jst.ExtDefaultListener.addMethod("moveHandler", "", "handlers", 
	"\t^ [:receiver :x :y | self handlerBlock " +
	"\n\t\tvalue: receiver jstWrapper " +
	"\n\t\tvalue: x \"The new x position\"" +
	"\n\t\tvalue: y \"The new y position\" ]",
	null, "2013-06-22T17:50:47Z", "mp");

jst.ExtDefaultListener.addMethod("statesaveHandler", "", "handlers-state", 
	"\t\"state : Object - The hash of state values. This is determined by calling getState() on the Component. " +
	"\n\tThis method must be provided by the developer to return whetever representation of state is required, " +
	"\n\tby default, Ext.Component has a null implementation.\"" +
	"\n\t^ [:comp :state |" +
	"\n\t\tself handlerBlock value: comp jstWrapper value: state]",
	null, "2013-06-22T18:35:59Z", "mp");

jst.ExtDefaultListener.addMethod("staterestoreHandler", "", "handlers-state", 
	"\t^ self statesaveHandler",
	null, "2013-06-22T18:38:40Z", "mp");

jst.ExtDefaultListener.addMethod("beforestaterestoreHandler", "", "handlers-state", 
	"\t^ self statesaveHandler",
	null, "2013-06-22T18:38:48Z", "mp");

jst.ExtDefaultListener.addMethod("beforestatesaveHandler", "", "handlers-state", 
	"\t^ self statesaveHandler",
	null, "2013-06-22T18:38:56Z", "mp");

/* ** ExtClickListener ***

jst.ExtClickListener.addMethod("handler", "", "accessing", 
	"\t^ [:receiver |" +
	"\n\t\tself handlerBlock valueWithPossibleArgs: {receiver jstWrapper. ExtEventObject current}]",
	null, "2012-08-01T12:37:08Z", "mp");

jst.ExtClickListener._class.addMethod("events", "", "accessing", 
	"\t^ #(click dblclick arrowclick itemclick specialkey)",
	null, "2012-09-25T15:28:04Z", "mp");
*/

/* ** ExtMenuClickListener ***

jst.ExtMenuClickListener.addMethod("handler", "", "accessing", "\t^ [:menu :item :event |" +
	"\n\t\tself handlerBlock value: menu jstWrapper value: item jstWrapper value: ExtEventObject current]");	
*/

/* ** ExtToggleListener ***

jst.ExtToggleListener.addMethod("handler", "", "accessing", "\t^ [:button :pressed |" +
	"\n\t\tself handlerBlock value: button jstWrapper value: pressed]");	

jst.ExtToggleListener._class.addMethod("events", "", "accessing", 
	"\t^ #(toggle checkchange check)",
	null, "2013-01-04T14:43:38Z", "mp");
*/

/* ** ExtSelectionChangeListener ***

jst.ExtSelectionChangeListener.addMethod("handler", "", "accessing", "\t^ [:selectionModel :node |" +
	"\n\t\tself handlerBlock value: selectionModel jstWrapper value: node jstWrapper]");	

//*** ExtBeforeSelectListener ***

jst.ExtBeforeSelectListener.addMethod("handler", "", "accessing", "\t^ [:selectionModel :newNode :selectedNode |" +
	"\n\t\tself handlerBlock value: selectionModel jstWrapper value: newNode jstWrapper value: (selectedNode ifNotNil: [selectedNode jstWrapper])]");	
*/

/* ** ExtBoxResizeListener ***

jst.ExtBoxResizeListener.addMethod("handler", "", "accessing", 
	"\t\"adjWidth: The box-adjusted width that was set" +
	"\n\tadjHeight: The box-adjusted height that was set" +
	"\n\trawWidth: The width that was originally specified" +
	"\n\trawHeight: The height that was originally specified\"" +
	"\n\t^ [:receiver :adjWidth :adjHeight :rawWidth :rawHeight|" +
	"\n\t\tself handlerBlock valueWithPossibleArgs: {receiver jstWrapper. adjWidth. adjHeight. rawWidth. rawHeight}]",
	null, "2013-02-14T21:03:29Z", "mp");

jst.ExtBoxResizeListener._class.addMethod("events", "", "accessing", 
	"\t^ #(resize)",
	null, "2013-02-14T20:58:01Z", "mp");

//*** ExtResizeListener ***

jst.ExtResizeListener.addMethod("handler", "", "accessing", 
	"\t^ [:receiver :width :height |" +
	"\n\t\tself handlerBlock value: receiver jstWrapper value: width value: height]",
	null, "2011-10-11T14:16:50Z", "mp");

jst.ExtResizeListener._class.addMethod("events", "", "accessing", 
	"\t^ #(resize bodyresize move)",
	null, "2012-11-09T20:46:17Z", "mp");

/* ExtMoveListener

jst.ExtMoveListener.addMethod("handler", "", "accessing", 
	"\t^ [:receiver :x :y |" +
	"\n\t\tself handlerBlock value: receiver jstWrapper value: x value: y]",
	null, "2012-03-29T07:35:07Z", "mp");
*/

/* ** ExtStateListener ***

jst.ExtStateListener.addMethod("handler", "", "accessing", "\t^ [:comp :state |" +
	"\n\t\tself handlerBlock value: comp jstWrapper value: state]");	

jst.ExtStateListener._class.addMethod("events", "", "accessing", 
	"\t^ #(state beforestaterestore beforestatesave staterestore statesave)",
	null, "2012-09-25T20:27:24Z", "mp");

//*** ExtCreateListener ***

jst.ExtCreateListener.addMethod("handler", "", "accessing", 
	"\t\"Fires when a component is created and added to ComponentMgr\"" +
	"\n\t^ [:all :comp | " +
	"\n\t\tself handlerBlock value: comp jstWrapper]",
	null, "2012-04-16T15:11:44Z", "mp");
/*
jst.ExtAddListener.addMethod("handler", "", "accessing", function(){
	//Fires when an item is added to the MixedCollection. Listeners will be called with the following arguments:
	//index : Number - The index at which the item was added.
	//anObject : Object - The item added.
	//key : String - The key associated with the added item.
	var self = this;
	return function(index, anObject, key){
		console.log(anObject.jstProxy);
		if (anObject.jstProxy)
			self.handlerBlock().value_value_value(
				index, 
				(anObject.jstProxy._jstWrapper) ? anObject.jstProxy._jstWrapper: anObject.jstProxy, 
				key);
	};
},
	null, "2012-04-16T15:11:44Z", "mp");
*/

//*** ExtDataViewListener ***

jst.ExtDataViewListener.addMethod("clickHandler", "", "handlers", 
	"\t^ [:aDataView :index :aHTMLElement |" +
	"\n\t\tself handlerBlock valueWithPossibleArgs: {" +
	"\n\t\t\taDataView jstWrapper. " +
	"\n\t\t\tindex + 1. \"The index of the target node\"" +
	"\n\t\t\tHTMLElement on: aHTMLElement. \"The target node\"" +
	"\n\t\t\tExtEventObject current}]",
	null, "2013-06-22T14:08:13Z", "mp");

jst.ExtDataViewListener.addMethod("dblclickHandler", "", "handlers", 
	"\t^ self clickHandler",
	null, "2013-06-22T14:09:39Z", "mp");

jst.ExtDataViewListener.addMethod("beforeclickHandler", "", "handlers", 
	"\t^ self clickHandler",
	null, "2013-06-22T14:09:51Z", "mp");

jst.ExtDataViewListener.addMethod("contextmenuHandler", "", "handlers", 
	"\t^ self clickHandler",
	null, "2013-06-22T14:10:02Z", "mp");

jst.ExtDataViewListener.addMethod("mouseenterHandler", "", "handlers", 
	"\t^ self clickHandler",
	null, "2013-06-22T14:10:09Z", "mp");

jst.ExtDataViewListener.addMethod("mouseleaveHandler", "", "handlers", 
	"\t^ self clickHandler",
	null, "2013-06-22T14:10:14Z", "mp");

jst.ExtDataViewListener.addMethod("selectionchangeHandler", "", "handlers", 
	"\t^ [:aDataView :anArray |" +
	"\n\t\tself handlerBlock valueWithPossibleArgs: {" +
	"\n\t\t\taDataView jstWrapper. " +
	"\n\t\t\tanArray collect: [:ea | HTMLElement on: ea] \"Array of the selected nodes\"}]",
	null, "2013-07-01T13:08:24Z", "mp");

jst.ExtDataViewListener.addMethod("beforeselectHandler", "", "handlers", 
	"\t^ [:aDataView :aHTMLElement :anArray |" +
	"\n\t\tself handlerBlock valueWithPossibleArgs: {" +
	"\n\t\t\taDataView jstWrapper. " +
	"\n\t\t\tHTMLElement on: aHTMLElement. \"The node to be selected\"" +
	"\n\t\t\tanArray collect: [:ea | HTMLElement on: ea] \"Array of currently selected nodes\"}]",
	null, "2013-07-01T13:08:37Z", "mp");

/* ** ExtViewClickListener ***

jst.ExtViewClickListener._class.addMethod("classNamePrefix", "", "accessing", 
	"\t^ #extview",
	null, "2012-09-25T17:36:13Z", "mp");

jst.ExtViewClickListener._class.addMethod("events", "", "accessing", 
	"\t^ #(click dblclick beforeclick contextmenu mouseenter mouseleave)",
	null, "2012-09-25T17:38:23Z", "mp");

jst.ExtViewClickListener.addMethod("handler", "", "accessing", 
	"\t^ [:aDataView :index :aHTMLElement |" +
	"\n\t\tself handlerBlock valueWithPossibleArgs: {" +
	"\n\t\t\taDataView jstWrapper. " +
	"\n\t\t\tindex + 1. \"The index of the target node\"" +
	"\n\t\t\tDOMElement on: aHTMLElement. \"The target node\"" +
	"\n\t\t\tExtEventObject current}]",
	null, "2012-07-03T14:29:27Z", "mp", 1);

jst.ExtViewClickListener.addMethod("handler", "", "accessing", 
	"\t^ [:aDataView :index :aHTMLElement |" +
	"\n\t\tself handlerBlock valueWithPossibleArgs: {" +
	"\n\t\t\taDataView jstWrapper. " +
	"\n\t\t\tindex + 1. \"The index of the target node\"" +
	"\n\t\t\tHTMLElement on: aHTMLElement. \"The target node\"" +
	"\n\t\t\tExtEventObject current}]",
	null, "2013-06-19T07:37:51Z", "mp"); //jst-ext-core
*/

// *** ExtJson ***

jst.ExtJson.klass().instanceVariableNames_("default");

jst.ExtJson.addMethod("asJsObject", "", "converting", 
	"\t^ self class asJsObject",
	null, "2012-04-20T06:45:56Z", "mp");

jst.ExtJson.addMethod("encode:", "anObject", "converting", 
	"\t^ self asJsObject perform: #encode with: anObject",
	null, "2012-04-20T06:47:46Z", "mp");

jst.ExtJson.addMethod("decode:", "aString", "converting", 
	"\t^ self asJsObject perform: #decode with: aString",
	null, "2012-04-20T06:49:45Z", "mp");

jst.ExtJson._class.addMethod("asJsObject", "", "converting", function (){
	return Ext.util.JSON;
},
	null, "2012-04-20T06:43:04Z", "mp");

jst.ExtJson._class.addMethod("initialize", "", "class initialization", 
	"\tdefault := self wrap: self asJsObject",
	null, "2012-04-20T06:44:37Z", "mp");

jst.initializeClass(jst.ExtJson);

jst.ExtJson._class.addMethod("default", "", "accessing", 
	"\t^ default",
	 "__default", "2012-04-20T06:45:09Z", "mp");

// *** ExtDataView ***

jst.ExtDataView._class.addMethod("xtype", "", "accessing", 
	"\t^ #dataview",
	null, "2012-06-18T15:22:48Z", "mp");

jst.ExtDataView._class.addMethod("listenerClass", "", "accessing", 
	"\t^ ExtDataViewListener",
	null, "2013-06-22T14:13:01Z", "mp");

/*
jst.ExtDataView._class.addMethod("listenerClasses", "", "accessing", 
	"\t^ { ExtDataViewListener }",
	null, "2012-09-25T17:34:30Z", "mp");

jst.ExtDataView._class.addMethod("defaultListenerClass", "", "accessing", 
	"\t^ ExtDataViewListener",
	null, "2012-08-18T19:26:04Z", "mp");

jst.ExtDataView.addMethod("on:do:", "eventName aBlock", "event handling", 
	"\t(eventName startsWith: ExtDataViewListener eventPrefix)" +
	"\n\t\tifTrue: [self addListener: (ExtDataViewListener  " +
	"\n\t\t\ton: (eventName allButFirst: ExtDataViewListener eventPrefix size) do: aBlock)]" +
	"\n\t\tifFalse: [super on: eventName do: aBlock]",
	null, "2012-07-01T09:01:16Z", "mp");

jst.ExtDataView.addMethod("installListeners", "", "private", 
	"\tself installListenersOn: self prefix: 'view'." +
	"\n\tsuper installListeners",
	null, "2012-06-30T20:39:19Z", "mp");
*/

jst.ExtDataView.addMethod("store:", "anExtStore", "accessing", 
	"\t\"Changes the data store bound to this view and refreshes it.\"" +
	"\n\tself at: #store by: #bindStore put: anExtStore",
	null, "2012-06-18T15:26:30Z", "mp");

jst.ExtDataView.addMethod("store", "", "accessing", 
	"\t^ (self at: #store get: #getStore) jstWrapper",
	null, "2012-06-18T15:39:41Z", "mp");

jst.ExtDataView.addMethod("itemSelector:", "aString", "accessing-config", 
	"\t\"This is a required setting!" +
	"\n\tA simple CSS selector (e.g. div.some-class or span:first-child) that will be used to determine " +
	"\n\twhat nodes this DataView will be working with.\"" +
	"\n\tself configAt: #itemSelector put: aString",
	null, "2012-06-18T15:29:59Z", "mp");

jst.ExtDataView.addMethod("itemSelector", "", "accessing-config", 
	"\t^ self at: #itemSelector",
	null, "2012-06-18T15:30:32Z", "mp");

jst.ExtDataView.addMethod("loadingText:", "aString", "accessing-config", 
	"\t\"A string to display during data load operations (defaults to undefined). If specified, this text will be displayed " +
	"\n\tin a loading div and the view's contents will be cleared while loading, otherwise the view's contents" +
	"\n\twill continue to display normally until the new data is loaded and the contents are replaced.\"" +
	"\n\tself configAt: #loadingText put: aString",
	null, "2012-06-18T15:33:42Z", "mp");

jst.ExtDataView.addMethod("loadingText", "", "accessing-config", 
	"\t^ self at: #loadingText default: ''",
	null, "2012-06-18T15:34:07Z", "mp");

jst.ExtDataView.addMethod("emptyText:", "aString", "accessing-config", 
	"\t\"The text to display in the view when there is no data to display (defaults to '').\"" +
	"\n\tself configAt: #emptyText put: aString",
	null, "2012-06-20T18:18:28Z", "mp");

jst.ExtDataView.addMethod("emptyText", "", "accessing-config", 
	"\t^ self at: #emptyText default: ''",
	null, "2012-06-20T18:18:47Z", "mp");

jst.ExtDataView.addMethod("overClass:", "aString", "accessing-config", 
	"\t\"A CSS class to apply to each item in the view on mouseover (defaults to undefined).\"" +
	"\n\tself configAt: #overClass put: aString",
	null, "2012-06-20T18:20:06Z", "mp");

jst.ExtDataView.addMethod("overClass", "", "accessing-config", 
	"\t^ self at: #overClass",
	null, "2012-06-20T18:20:23Z", "mp");

jst.ExtDataView.addMethod("singleSelect:", "aBoolean", "accessing-config", 
	"\t\"True to allow selection of exactly one item at a time, false to allow no selection at all (defaults to false). " +
	"\n\tNote that if multiSelect = true, this value will be ignored.\"" +
	"\n\tself configAt: #singleSelect put: aBoolean",
	null, "2012-06-20T21:34:30Z", "mp");

jst.ExtDataView.addMethod("singleSelect", "", "accessing-config", 
	"\t^ self at: #singleSelect default: false",
	null, "2012-06-20T21:34:51Z", "mp");

jst.ExtDataView.addMethod("refresh", "", "updating", 
	"\t\"Refreshes the view by reloading the data from the store and re-rendering the template.\"" +
	"\n\tobj perform: #refresh",
	null, "2012-06-21T07:00:33Z", "mp");

/*
jst.ExtDataView.addMethod("selectNode:", "anObject", "selecting nodes", 
	"\t\"Selects a node. An object is an HTMLElement template node, index of a template node, " +
	"\n\tid of a template node or record associated with a node  to select\"" +
	"\n\tobj perform: #select with: (anObject isNumber ifTrue: [anObject - 1] ifFalse: [anObject asJsObject])",
	null, "2012-07-04T11:43:57Z", "mp");
*/
jst.ExtDataView.addMethod("selectNodes:keepExisting:silently:", "anObject keep silently", "selecting nodes", 
	"\t\"Selects a set of nodes. An object is an HTMLElement template node, index of a template node, " +
	"\n\tid of a template node, record associated with a node or an array of any of those to select\"" +
	"\n\tobj perform: #select " +
	"\n\t\twith: (anObject isNumber ifTrue: [anObject - 1] ifFalse: [anObject asJsObject])" +
	"\n\t\twith: keep \"true to keep existing selections\"" +
	"\n\t\twith: silently \"true to skip firing of the selectionchange vent\"",
	null, "2013-07-01T12:29:15Z", "mp");

jst.ExtDataView.addMethod("selectNodes:silently:", "anObject aBoolean", "selecting nodes", 
	"\tself selectNodes: anObject keepExisting: false silently: aBoolean",
	null, "2013-07-01T12:30:14Z", "mp");

jst.ExtDataView.addMethod("selectedNodes", "", "accessing", 
	"\t\"Gets the currently selected nodes.\"" +
	"\n\t^ obj perform: #getSelectedNodes",
	null, "2013-11-15T16:10:36Z", "mp");

jst.ExtDataView.addMethod("selectedIndexes", "", "accessing", 
	"\t\"Gets the indexes of the selected nodes.\"" +
	"\n\t^ (obj perform: #getSelectedIndexes) collect: [:ix | ix + 1]",
	null, "2014-04-02T20:56:18Z", "mp");

jst.ExtDataView.addMethod("selectNext", "", "selecting nodes", 
	"\t^ self selectedIndexes ifNotEmptyDo: [:ixs |" +
	"\n\t\tixs first < self store totalSize ifTrue: [" +
	"\n\t\t\tself selectNodes: ixs first + 1 silently: false." +
	"\n\t\t\tixs first + 1]]",
	null, "2014-04-02T21:41:55Z", "mp");

jst.ExtDataView.addMethod("selectPrevious", "", "selecting nodes", 
	"\t^ self selectedIndexes ifNotEmptyDo: [:ixs | " +
	"\n\t\tixs first > 1 ifTrue: [" +
	"\n\t\t\tself selectNodes: ixs first - 1 silently: false." +
	"\n\t\t\tixs first - 1]]",
	null, "2014-04-02T21:43:13Z", "mp");

jst.ExtDataView.addMethod("clickEvent", "", "events", 
	"\t\"Fires when a template node is clicked.\"",
	null, "2013-07-01T12:48:56Z", "mp");

jst.ExtDataView.addMethod("selectionchangeEvent", "", "events", 
	"\t\"Fires when the selected nodes change.\"",
	null, "2013-07-01T12:43:12Z", "mp");

jst.ExtDataView.addMethod("beforeselectEvent", "", "events", 
	"\t\"Fires before a selection is made. If any handlers return false, the selection is cancelled.\"",
	null, "2013-07-01T12:44:10Z", "mp");

jst.ExtDataView.addMethod("beforeclickEvent", "", "events", 
	"\t\"Fires before a click is processed. Returns false to cancel the default action.\"",
	null, "2013-07-01T12:47:01Z", "mp");

jst.ExtDataView.addMethod("containerclickEvent", "", "events", 
	"\t\"Fires when a click occurs and it is not on a template node.\"",
	null, "2013-07-01T12:47:28Z", "mp");

jst.ExtDataView.addMethod("containercontextmenuEvent", "", "events", 
	"\t\"Fires when a right click occurs that is not on a template node.\"",
	null, "2013-07-01T12:47:52Z", "mp");

jst.ExtDataView.addMethod("contextmenuEvent", "", "events", 
	"\t\"Fires when a template node is right clicked.\"",
	null, "2013-07-01T12:48:22Z", "mp");

jst.ExtDataView.addMethod("dblclickEvent", "", "events", 
	"\t\"Fires when a template node is double clicked.\"",
	null, "2013-07-01T12:48:46Z", "mp");

jst.ExtDataView.addMethod("mouseenterEvent", "", "events", 
	"\t\"Fires when the mouse enters a template node. trackOver:true or an overClass must be set to enable this event.\"",
	null, "2013-07-01T12:49:54Z", "mp");

jst.ExtDataView.addMethod("mouseleaveEvent", "", "events", 
	"\t\"Fires when the mouse leaves a template node. trackOver:true or an overClass must be set to enable this event.\"",
	null, "2013-07-01T12:50:13Z", "mp");

// *** ExtTemplate ***

jst.ExtTemplate.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\thtml := ''",
	null, "2012-06-19T19:29:33Z", "mp");

jst.ExtTemplate.addMethod("wrap:", "jsObject", "accessing", 
	"\tsuper wrap: (obj := jsObject)",
	null, "2012-06-19T18:53:02Z", "mp");

jst.ExtTemplate.addMethod("asJsObject", "", "converting", 
	"\tobj ifNil: [" +
	"\n\t\tself createJsObject]." +
	"\n\t^ obj",
	null, "2012-06-19T18:55:56Z", "mp");

jst.ExtTemplate.addMethod("createJsObject", "", "private", 
	function (){
	return this.wrap_(eval("new " + this._class.jsClassName() + "(this._html, this._config.asJsObject())"));
},
	null, "2012-06-19T19:23:51Z", "mp");

jst.ExtTemplate.addMethod("compiled:", "aBoolean", "accessing-config", 
	"\t\"Specify true to compile the template immediately (see compile). Defaults to false.\"" +
	"\n\tconfig at: #compiled put: aBoolean" +
	"\n\t",
	null, "2012-06-19T20:28:47Z", "mp");

jst.ExtTemplate.addMethod("compiled", "", "accessing-config", 
	"\t^ config at: #compiled ifAbsent: false" +
	"\n\t",
	null, "2012-06-19T20:27:33Z", "mp");

jst.ExtTemplate.addMethod("disableFormats:", "aBoolean", "accessing-config", 
	"\t\"Specify true to disable format functions in the template. If the template does not contain format functions, " +
	"\n\tsetting disableFormats to true will reduce apply time. Defaults to false.\"" +
	"\n\tself configAt: #disableFormats put: aBoolean",
	null, "2012-06-19T19:43:11Z", "mp");

jst.ExtTemplate.addMethod("disableFormats", "", "accessing-config", 
	"\t^ self at: #disableFormats default: false",
	null, "2012-06-19T19:43:28Z", "mp");

jst.ExtTemplate.addMethod("htmlContents:", "blockWithArg", "accessing-config", 
	"\tself html: (DocumentFragment htmlContents: blockWithArg) printHtml",
	null, "2012-06-19T20:32:23Z", "mp"); //jst-ext-core

jst.ExtTemplate.addMethod("html:", "aStringOrArray", "accessing-config", 
	"\tobj " +
	"\n\t\tifNil: [html := aStringOrArray]" +
	"\n\t\tifNotNil: [obj perform: #set with: aStringOrArray with: self compiled]",
	null, "2012-06-19T20:29:45Z", "mp"); //jst-ext-core

jst.ExtTemplate.addMethod("html", "", "accessing-config", 
	"\t^ obj " +
	"\n\t\tifNil: html" +
	"\n\t\tifNotNil: [obj at: #html]",
	null, "2012-06-19T20:31:28Z", "mp");

// *** ExtXTemplate ***

/*
jst.ExtXTemplate.addMethod("htmlContents:", "blockWithArg", "accessing-config", 
	"\t| str |" +
	"\n\tstr := (DocumentFragment htmlContents: blockWithArg) printHtml." +
	"\n\t\"Fix - Firefox escapes { and } in attributes with url, e.g. src, href \"" +
	"\n\tstr := (str copyReplaceAll: '%7B' with: '{') copyReplaceAll: '%7D' with: '}'." +
	"\n\tself html: str",
	null, "2012-06-22T08:10:55Z", "mp");
*/

jst.ExtXTemplate.addMethod("htmlContents:", "blockWithArg", "accessing-config", 
	"\t| str |" +
	"\n\tstr := (DocumentFragment htmlContents: blockWithArg) printHtml." +
	"\n\tExt isWebKit ifFalse: [" +
	"\n\t\t\"Fix - Firefox escapes { and } in attributes with url, e.g. src, href \"" +
	"\n\t\tstr := (str copyReplaceAll: '%7B' with: '{') copyReplaceAll: '%7D' with: '}'." +
	"\n\t\t\"Another Fix - Firefox, IE, ...(?) - sorry, not very elegant, the spaces should not be significant!\"" +
	"\n\t\tstr := (str copyReplaceAll: ' > ' with: '&gt;') copyReplaceAll: ' < ' with: '&lt;'.]." +
	"\n\tself html: str",
	null, "2012-10-17T14:48:22Z", "mp");

jst.ExtXTemplate.addMethod("overwrite:with:", "anElement anObject", "updating", 
	"\t\"Applies the supplied object to the template and overwrites the content of the element with the new node(s)." +
	"\n\tThe object can be an array if your params are numeric (i.e. {0}) or a dictionary (i.e. {foo: 'bar'})\"" +
	"\n\tself asJsObject perform: #overwrite with: anElement asJsObject with: anObject asJsObject",
	null, "2013-02-04T21:53:39Z", "mp");

// AppPath Extensions

/* 
- zruseno
jst.AppPath.addMethod("findComponent", "", "*ext", 
	"\t^ ExtComponentMgr default getById: compId",
	null, "2013-04-30T09:06:36Z", "mp");

- nahrazeno metodou s vice parametry
jst.AppPath.addMethod("forceStop:", "aString", "*ext", 
	"\t(self isActivePath and: [value asString = aString asString]) ifFalse: [" +
	"\n\t\tonForceStop " +
	"\n\t\t\tifNotNil: [onForceStop valueWithPossibleArgs: { self. aString}]" +
	"\n\t\t\tifNil: [self findComponent ifNotNilDo: [:c |" +
	"\n\t\t\t\tc forcePathStop: self on: aString]]" +
	"\n\t]",
	null, "2013-08-17T13:47:22Z", "mp", 1);

jst.AppPath.addMethod("forceStop:", "aString", "*ext", 
	"\t(self isActivePath and: [value asString = aString asString]) ifFalse: [" +
	"\n\t\tonForceStop " +
	"\n\t\t\tifNotNil: [onForceStop valueWithPossibleArgs: { self. aString}]" +
	"\n\t\t\tifNil: [self component ifNotNilDo: [:c |" +
	"\n\t\t\t\tc forcePathStop: self on: aString]]" +
	"\n\t]",
	null, "2013-08-18T22:35:45Z", "mp"); //jst-ext-core
*/

jst.AppPath.addMethod("forceStop:last:ifAsync:", "aString aBoolean aBlock", "*ext", 
	"\t(aBoolean or: [self isActivePath not] or: [value asString ~= aString asString]) ifTrue: [" +
	"\n\t\tonForceStop " +
	"\n\t\t\tifNotNil: [onForceStop valueWithPossibleArgs: { self. aString. aBoolean. aBlock}]" +
	"\n\t\t\tifNil: [self component ifNotNilDo: [:c |" +
	"\n\t\t\t\tc forcePathStop: self on: aString last: aBoolean ifAsync: aBlock]]" +
	"\n\t]",
	null, "2013-08-19T09:35:05Z", "mp");

jst.AppCrossroad.addMethod("installStandardTreeListenersWith:", "aBlock", "*ext", 
	"\t| comp |" +
	"\n\tcomp := self component." +
	"\n\tcomp on: #click do: [:node :ev | " +
	"\n\t\t(aBlock value: node) ifTrue: [" +
	"\n\t\t\tself enterNode: node]]." +
	"\n\tcomp selectionModel on: #selectionchange do: [:m :node | " +
	"\n\t\t(aBlock value: node) ifTrue: [" +
	"\n\t\t\tself enterNode: node]].",
	null, "2012-08-26T19:46:04Z", "mp", 1);

jst.AppCrossroad.addMethod("installStandardTreeListenersWith:", "aBlock", "*ext", 
	"\t| comp |" +
	"\n\tcomp := self component." +
	"\n\tcomp on: #click do: [:node :ev | " +
	"\n\t\t(aBlock value: node) ifTrue: [" +
	"\n\t\t\tself trackHistory: [self enterNode: node]]]." +
	"\n\tcomp selectionModel on: #selectionchange do: [:m :node | " +
	"\n\t\t(aBlock value: node) ifTrue: [" +
	"\n\t\t\tself trackHistory: [self enterNode: node]]]",
	null, "2013-08-10T09:11:13Z", "mp", 1);

jst.AppCrossroad.addMethod("installStandardTreeListenersWith:", "aBlock", "*ext", 
	"\t| comp prevNode |" +
	"\n\tcomp := self component." +
	"\n\tcomp on: #click do: [:node :ev |" +
	"\n\t\t(aBlock value: node) ifTrue: [" +
	"\n\t\t\tprevNode := node." +
	"\n\t\t\tself trackHistory: [self enterNode: node]]]." +
	"\n\tcomp selectionModel on: #selectionchange do: [:m :node |" +
	"\n\t\t(prevNode ~= node and: [aBlock value: node]) ifTrue: [" +
	"\n\t\t\tprevNode := nil." +
	"\n\t\t\tself trackHistory: [self enterNode: node]]]",
	null, "2014-02-13T08:55:16Z", "mp", 1);

jst.AppCrossroad.addMethod("installStandardTreeListenersWith:", "aBlock", "*ext", 
	"\t| comp prevNode |" +
	"\n\tcomp := self component." +
	"\n\tcomp on: #click do: [:node :ev |" +
	"\n\t\t(aBlock value: node) ifTrue: [" +
	"\n\t\t\tprevNode := node." +
	"\n\t\t\tself trackHistory: [self enterNode: node]]]." +
	"\n\tcomp selectionModel " +
	"\n\t\tclearBlock: [prevNode := nil];" +
	"\n\t\ton: #selectionchange do: [:m :node |" +
	"\n\t\t\t(prevNode ~= node and: [aBlock value: node]) ifTrue: [" +
	"\n\t\t\t\tprevNode := nil." +
	"\n\t\t\t\tself trackHistory: [self enterNode: node]]]",
	null, "2014-02-22T13:51:19Z", "mp"); //jst-ext-core

jst.AppCrossroad.addMethod("installStandardTreeListeners", "", "*ext", 
	"\tself installStandardTreeListenersWith: [:n | n isLeaf]",
	null, "2012-08-26T19:48:00Z", "mp");
/*
jst.AppCrossroad.addMethod("installStandardTreeListeners", "", "*ext", 
	"\tself installStandardTreeListenersWith: [:n | " +
	"\n\t\t\"clearSelectionsSilently: false sends nil\"" +
	"\n\t\tn isNil or: [n isLeaf]]",
	null, "2013-08-27T21:48:30Z", "mp"); //jst-ext-core
*/

jst.AppCrossroad.addMethod("installStandardTreeListenersWith:delayed:", "aBlock millis", "*ext", 
	"\t| comp |" +
	"\n\tcomp := self component." +
	"\n\tmillis < 200 ifTrue: [" +
	"\n\t\tcomp on: #click do: [:node :ev | " +
	"\n\t\t\t(aBlock value: node) ifTrue: [" +
	"\n\t\t\t\t[self trackHistory: [self enterNode: node]] delayed: millis]]." +
	"\n\t\tcomp selectionModel on: #selectionchange do: [:m :node | " +
	"\n\t\t\t(aBlock value: node) ifTrue: [" +
	"\n\t\t\t\t[self trackHistory: [self enterNode: node]] delayed: millis]]" +
	"\n\t] ifFalse: [ | task node |" +
	"\n\t\ttask := DelayedTask new" +
	"\n\t\t\tdelay: millis;" +
	"\n\t\t\ttask: [self trackHistory: [self enterNode: node]]." +
	"\n\t\tcomp on: #click do: [:n :ev | " +
	"\n\t\t\t(aBlock value: n) ifTrue: [" +
	"\n\t\t\t\tnode := n." +
	"\n\t\t\t\ttask run]]." +
	"\n\t\tcomp selectionModel on: #selectionchange do: [:m :n | " +
	"\n\t\t\tnode := n." +
	"\n\t\t\t(aBlock value: n) ifTrue: [" +
	"\n\t\t\t\tnode := n." +
	"\n\t\t\t\ttask run]]" +
	"\n\t]",
	null, "2013-12-31T16:36:23Z", "mp", 1);

jst.AppCrossroad.addMethod("installStandardTreeListenersWith:delayed:", "aBlock millis", "*ext", 
	"\t| task node skipHist |" +
	"\n\ttask := DelayedTask new delay: millis; task: [" +
	"\n\t\tself start skipHistory: skipHist." +
	"\n\t\t[self trackHistory: [self enterNode: node]] ensure: [" +
	"\n\t\t\tself start skipHistory: false]]." +
	"\n\tself component on: #click do: [:n :ev | " +
	"\n\t\t(aBlock value: n) ifTrue: [" +
	"\n\t\t\tnode := n." +
	"\n\t\t\tskipHist := self start skipHistory." +
	"\n\t\t\tself start stopTrackingHistory." +
	"\n\t\t\ttask run]]." +
	"\n\tself component selectionModel on: #selectionchange do: [:m :n | " +
	"\n\t\tnode := n." +
	"\n\t\t(aBlock value: n) ifTrue: [" +
	"\n\t\t\tnode := n." +
	"\n\t\t\tskipHist := self start skipHistory." +
	"\n\t\t\tself start stopTrackingHistory." +
	"\n\t\t\ttask run]]",
	null, "2014-02-13T09:32:39Z", "mp"); //jst-ext-core

//*** ExtQuickTips ***

jst.ExtQuickTips._class.addMethod("initialize", "", "class initialization", function (){
	//set proxy
	jst.JSObjectProxy.on_(Ext.QuickTips);
	return this;
},
	null, "2012-08-30T11:03:32Z", "mp");

jst.initializeClass(jst.ExtQuickTips);

jst.ExtQuickTips._class.addMethod("asJsObject", "", "converting", function (){
	return Ext.QuickTips;
},
	null, "2012-08-30T11:03:55Z", "mp");

jst.ExtQuickTips._class.addMethod("init", "", "initialization", 
	"\t\"Initialize the global QuickTips instance and prepare any quick tips.\"" +
	"\n\tself asJsObject perform: 'init'",
	null, "2012-08-30T11:05:18Z", "mp");

//*** ExtLoadMask ***

jst.ExtLoadMask.addMethod("msg:", "aString", "accessing", 
	"\t\"The text to display in a centered loading message box\"" +
	"\n\tself configAt: 'msg' put: aString",
	null, "2012-09-01T21:24:29Z", "mp");

jst.ExtLoadMask.addMethod("msg", "", "accessing", 
	"\t^ self at: 'msg' default: 'Loading...'",
	null, "2012-09-01T21:24:48Z", "mp");

//*** ExtHistory ***

jst.ExtHistory.klass().instanceVariableNames_("current");

jst.ExtHistory._class.addMethod("initialize", "", "class initialization", 
	"\tcurrent := self basicNew",
	null, "2013-08-07T19:31:35Z", "mp");

jst.initializeClass(jst.ExtHistory);

jst.ExtHistory._class.addMethod("current", "", "accessing", 
	"\t^ current",
	null, "2013-08-07T19:31:10Z", "mp");

jst.ExtHistory.addMethod("createJsObject", "", "private", function (){
	return this.wrap_(Ext.History);
},
	null, "2013-08-07T14:18:27Z", "mp");

jst.ExtHistory.addMethod("addToken:preventDuplicates:", "aString aBoolean", "processing", 
	"\t\"Add a new token to the history stack. This can be any arbitrary value, " +
	"\n\talthough it would commonly be the concatenation of a component id and another id " +
	"\n\tmarking the specific history state of that component.\"" +
	"\n\tself asJsObject perform: #add with: aString with: aBoolean",
	null, "2013-08-07T20:18:37Z", "mp", 1);

jst.ExtHistory.addMethod("addToken:preventDuplicates:", "aString aBoolean", "processing", 
	"\t\"Add a new token to the history stack. This can be any arbitrary value, " +
	"\n\talthough it would commonly be the concatenation of a component id and another id " +
	"\n\tmarking the specific history state of that component.\"" +
	"\n\tobj perform: #add with: aString with: aBoolean",
	null, "2013-08-17T19:35:58Z", "mp", 1);

jst.ExtHistory.addMethod("addToken:preventDuplicates:", "aString aBoolean", "processing", 
	"\t\"Add a new token to the history stack. This can be any arbitrary value, " +
	"\n\talthough it would commonly be the concatenation of a component id and another id " +
	"\n\tmarking the specific history state of that component.\"" +
	"\n\tadding := aString." +
	"\n\tobj perform: #add with: aString with: aBoolean",
	null, "2013-08-19T21:21:00Z", "mp", 1);

jst.ExtHistory.addMethod("addToken:preventDuplicates:", "aString aBoolean", "processing", 
	"\t\"Add a new token to the history stack. This can be any arbitrary value, " +
	"\n\talthough it would commonly be the concatenation of a component id and another id " +
	"\n\tmarking the specific history state of that component.\"" +
	"\n\tadding := aString." +
	"\n\ttokenName ifNotNil: [" +
	"\n\t\t| tit |" +
	"\n\t\ttit := Document current title." +
	"\n\t\tDocument current title: tokenName." +
	"\n\t\tobj perform: #add with: aString with: aBoolean." +
	"\n\t\tDocument current title: tit." +
	"\n\t\ttokenName := nil" +
	"\n\t] ifNil: [" +
	"\n\t\tobj perform: #add with: aString with: aBoolean]",
	null, "2013-08-22T20:20:26Z", "mp", 1);

jst.ExtHistory.addMethod("addToken:preventDuplicates:", "aString aBoolean", "processing", 
	"\t\"Add a new token to the history stack. This can be any arbitrary value, " +
	"\n\talthough it would commonly be the concatenation of a component id and another id " +
	"\n\tmarking the specific history state of that component.\"" +
	"\n\tadding := aString." +
	"\n\ttokenName ifNotNil: [" +
	"\n\t\t| tit |" +
	"\n\t\ttit := Document current title." +
	"\n\t\tDocument current title: tokenName." +
	"\n\t\tExt suppressIE9PlusDuring: [" +
	"\n\t\t\tobj perform: #add with: aString with: aBoolean]." +
	"\n\t\tDocument current title: tit." +
	"\n\t\ttokenName := nil" +
	"\n\t] ifNil: [Ext suppressIE9PlusDuring: [" +
	"\n\t\tobj perform: #add with: aString with: aBoolean]]",
	null, "2013-08-26T09:30:30Z", "mp", 1);

jst.ExtHistory.addMethod("addToken:preventDuplicates:", "aString aBoolean", "processing", 
	"\t\"Add a new token to the history stack. This can be any arbitrary value, " +
	"\n\talthough it would commonly be the concatenation of a component id and another id " +
	"\n\tmarking the specific history state of that component.\"" +
	"\n\tadding := aString." +
	"\n\ttokenName ifNotNil: [" +
	"\n\t\t| tit |" +
	"\n\t\ttit := HTMLDocument current title." +
	"\n\t\tHTMLDocument current title: tokenName." +
	"\n\t\tExt suppressIE9PlusDuring: [" +
	"\n\t\t\tobj perform: #add with: aString with: aBoolean]." +
	"\n\t\tHTMLDocument current title: tit." +
	"\n\t\ttokenName := nil" +
	"\n\t] ifNil: [Ext suppressIE9PlusDuring: [" +
	"\n\t\tobj perform: #add with: aString with: aBoolean]]",
	null, "2014-01-02T22:43:20Z", "mp"); //jst-ext-core

jst.ExtHistory.addMethod("addToken:", "aString", "processing", 
	"\tself addToken: aString preventDuplicates: true",
	null, "2013-08-07T21:31:22Z", "mp");

jst.ExtHistory.addMethod("tokenName:", "aString", "accessing", 
	"\t\"will be used as the name of the active token\"" +
	"\n\ttokenName := aString" +
	"\n\t",
	null, "2013-08-22T19:58:00Z", "mp");

jst.ExtHistory.addMethod("onChange:", "aBlockWithOneArgument", "accessing", 
	"\tself on: #change do: aBlockWithOneArgument",
	null, "2013-08-07T20:54:08Z", "mp", 1);

jst.ExtHistory.addMethod("onChange:", "aBlockWithOneArgument", "accessing", 
	"\tself on: #change do: [:token |" +
	"\n\t\tadding = token ifFalse: [" +
	"\n\t\t\tadding := nil." +
	"\n\t\t\taBlockWithOneArgument value: token]]",
	null, "2013-08-19T21:22:21Z", "mp", 1);
/*
jst.ExtHistory.addMethod("onChange:", "aBlockWithOneArgument", "accessing", 
	"\tself on: #change do: [:token |" +
	"\n\t\tadding = token ifFalse: [" +
	"\n\t\t\taBlockWithOneArgument value: token." +
	"\n\t\t\tadding := nil]]",
	null, "2013-08-19T22:06:51Z", "mp"); //jst-ext-core
*/
jst.ExtHistory.addMethod("onChange:", "aBlockWithOneArgument", "accessing", 
	"\tself on: #change do: [:token |" +
	"\n\t\t(adding isNil or: [adding ~= token]) ifTrue: [" +
	"\n\t\t\tadding := nil." +
	"\n\t\t\taBlockWithOneArgument value: token]]",
	null, "2013-08-28T08:43:05Z", "mp"); //jst-ext-core

jst.ExtHistory._class.addMethod("listenerClass", "", "accessing", 
	"\t^ ExtHistoryListener",
	null, "2013-08-07T20:57:11Z", "mp");

jst.ExtHistory.addMethod("changeEvent", "", "events", 
	"\t\"Fires when navigation back or forwards within the local page's history occurs.\"",
	null, "2013-08-15T20:40:34Z", "mp");

jst.ExtHistory.addMethod("activeToken", "", "accessing", 
	"\t\"Retrieves the currently-active history token.\"" +
	"\n\t^ obj perform: #getToken",
	null, "2013-08-17T08:51:11Z", "mp", 1);

jst.ExtHistory.addMethod("activeToken", "", "accessing", 
	"\t| token |" +
	"\n\t\"Retrieves the currently-active history token.\"" +
	"\n\ttoken :=  obj perform: #getToken." +
	"\n\t\"Firefox 23 fix\"" +
	"\n\t^ token = 'null' ifFalse: [token]",
	null, "2013-09-06T07:49:04Z", "mp"); //jst-ext-core

jst.ExtHistory.addMethod("init", "", "initialization", 
	"\t\"Initialize the global History instance.\"" +
	"\n\tself asJsObject perform: #init",
	null, "2013-08-17T08:57:55Z", "mp", 1);

jst.ExtHistory.addMethod("init", "", "initialization", 
	"\t\"Initialize the global History instance.\"" +
	"\n\t(Document current elementById: 'history-form') ifNil: [" +
	"\n\t\t\"Adding fields required for history management\"" +
	"\n\t\tDocument current body htmlContents: [:html |" +
	"\n\t\t\thtml form id: 'history-form'; class: 'x-hidden'; with: [" +
	"\n\t\t\t\thtml hiddenInput id: 'x-history-field'." +
	"\n\t\t\t\thtml iframe id: 'x-history-frame']]]." +
	"\n\tself asJsObject perform: #init",
	null, "2013-08-24T22:21:47Z", "mp", 1);

jst.ExtHistory.addMethod("init", "", "initialization", 
	"\t\"Initialize the global History instance.\"" +
	"\n\t(Document current elementById: 'history-form') ifNil: [" +
	"\n\t\t\"Adding fields required for history management\"" +
	"\n\t\tDocument current body htmlContents: [:html |" +
	"\n\t\t\thtml form id: 'history-form'; class: 'x-hidden'; with: [" +
	"\n\t\t\t\thtml hiddenInput id: 'x-history-field'." +
	"\n\t\t\t\tExt isOldIE ifTrue: [" +
	"\n\t\t\t\t\thtml iframe id: 'x-history-frame']]]]." +
	"\n\tExt suppressIE9PlusDuring: [" +
	"\n\t\tself asJsObject perform: #init]",
	null, "2013-08-26T15:01:15Z", "mp", 1);

jst.ExtHistory.addMethod("init", "", "initialization", 
	"\t\"Initialize the global History instance.\"" +
	"\n\t(HTMLDocument current elementById: 'history-form') ifNil: [" +
	"\n\t\t\"Adding fields required for history management\"" +
	"\n\t\tHTMLDocument current body htmlContents: [:html |" +
	"\n\t\t\thtml form id: 'history-form'; class: 'x-hidden'; with: [" +
	"\n\t\t\t\thtml hiddenInput id: 'x-history-field'." +
	"\n\t\t\t\tExt isOldIE ifTrue: [" +
	"\n\t\t\t\t\thtml iframe id: 'x-history-frame']]]]." +
	"\n\tExt suppressIE9PlusDuring: [" +
	"\n\t\tself asJsObject perform: #init]",
	null, "2014-01-02T22:43:38Z", "mp"); //jst-ext-core

jst.ExtHistory.addMethod("back", "", "processing", 
	"\t\"Programmatically steps back one step in browser history (equivalent to the user pressing the Back button).\"" +
	"\n\tobj perform: #back",
	null, "2013-08-17T19:35:45Z", "mp");

jst.ExtHistory.addMethod("forward", "", "processing", 
	"\t\"Programmatically steps forward one step in browser history (equivalent to the user pressing the Forward button).\"" +
	"\n\tobj perform: #forward",
	null, "2013-08-17T19:36:47Z", "mp");

// extensions

jst.AppPathStart.addMethod("trackHistory", "", "*ext", 
	"\tself activePathToken ifNotEmptyDo: [:str |" +
	"\n\t\tExtHistory current addToken: str]",
	null, "2013-08-09T18:04:58Z", "mp", 1);

jst.AppPathStart.addMethod("trackHistory", "", "*ext", 
	"\tself activePathToken ifNotEmptyDo: [:str |" +
	"\n\t\tExtHistory current addToken: str." +
	"\n\t\tself stopChanged." +
	"\n\t\tExtHistory current tokenName: Document current title" +
	"\n\t] ifEmpty: [" +
	"\n\t\tself stopChanged]",
	null, "2013-08-22T21:06:57Z", "mp", 2);

jst.AppPathStart.addMethod("trackHistory", "", "*ext", 
	"\tself activePathToken ifNotEmptyDo: [:str |" +
	"\n\t\tExtHistory current addToken: str." +
	"\n\t\tself stopChanged." +
	"\n\t\tExtHistory current tokenName: HTMLDocument current title" +
	"\n\t] ifEmpty: [" +
	"\n\t\tself stopChanged]",
	null, "2014-01-02T22:42:18Z", "mp", 3);

jst.AppPathStart.addMethod("trackHistory", "", "*ext", 
	"\t| token |" +
	"\n\ttoken := AppPathToken on: self." +
	"\n\ttoken isEmpty ifFalse: [" +
	"\n\t\tExtHistory current addToken: token asString." +
	"\n\t\tself stopChanged." +
	"\n\t\tExtHistory current tokenName: HTMLDocument current title" +
	"\n\t] ifTrue: [" +
	"\n\t\tself stopChanged]",
	null, "2014-03-17T13:19:39Z", "mp"); //jst-ext-core

jst.AppPathStart.addMethod("pathForced", "", "*ext", 
	"\tExtHistory current tokenName: Document current title",
	null, "2013-08-22T21:32:25Z", "mp", 1);

jst.AppPathStart.addMethod("pathForced", "", "*ext", 
	"\tExtHistory current tokenName: HTMLDocument current title",
	null, "2014-01-02T22:39:51Z", "mp"); //jst-ext-core

//*** ExtHistoryListener ***

jst.ExtHistoryListener.addMethod("changeHandler", "", "handlers", 
	"\t\"Fires when navigation back or forwards within the local page's history occurs.\"" +
	"\n\t^ self handlerBlock",
	null, "2013-08-07T20:56:19Z", "mp");

/*
jst.ExtHistoryListener.addMethod("changeHandler", "", "handlers", 
	"\t\"Fires when navigation back or forwards within the local page's history occurs.\"" +
	"\n\t^ [:token | self inform: token." +
	"\n\t\tself handlerBlock value: token]",
	null, "2013-08-16T20:09:14Z", "mp");
*/

//*** ExtFormat ***

jst.ExtFormat.klass().instanceVariableNames_("default");

jst.ExtFormat._class.addMethod("asJsObject", "", "converting", function (){
	return Ext.util.Format;
},
	null, "2013-11-22T08:31:43Z", "mp");

jst.ExtFormat._class.addMethod("initialize", "", "class initialization", 
	"\tdefault := self wrap: self asJsObject",
	null, "2013-11-22T08:32:01Z", "mp");

jst.initializeClass(jst.ExtFormat);

jst.ExtFormat._class.addMethod("default", "", "accessing", 
	"\t^ default",
	 "__default", "2013-11-22T08:41:02Z", "mp");

jst.ExtFormat.addMethod("asJsObject", "", "converting", 
	"\t^ self class asJsObject",
	null, "2013-11-22T08:42:53Z", "mp");

jst.ExtFormat.addMethod("stripTagsFrom:", "aString", "converting", 
	"\t\"Strips all HTML tags\"" +
	"\n\t^ self asJsObject perform: #stripTags with: aString",
	null, "2013-11-22T13:38:02Z", "mp");
