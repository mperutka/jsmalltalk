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
 * Depends on jst-core, jst-parser, jst-kernel, jst-files
 */

jst.currentJsFile = "jst-system";

// *** CLASSES ***

//System-Support
jst.Object.subclass("UIManager", "", "Default", "", "System");
jst.Object.subclass("SystemNavigation", "", "Default", "", "System");

//System-Applications
jst.Object.subclass("AppRegistry", "", "", "", "System");
jst.AppRegistry.subclass("ToolSet", "", "", "", "System");

//System-Changes
jst.Object.subclass("ChangeSet", "fileStream stream changedClasses modified", "", "", "System");

jst.Object.subclass("TextDiffBuilder", "src dst patchSequence", "", "", "System");

// Object

/*
jst.Object.addMethod("inform:", "aString", "*system", 
	"\t\"Display a message for the user to read and then dismiss\"" +
	"\n\taString isEmptyOrNil ifFalse: [UIManager default inform: aString]",
	null, "2011-09-21T20:18:08Z", "mp");
*/

jst.Object.addMethod("inform:", "anObject", "*system", 
	"\t\"Display a message for the user to read and then dismiss\"" +
	"\n\tUIManager default inform: anObject",
	null, "2013-02-19T10:48:27Z", "mp");

jst.Object.addMethod("systemNavigation", "", "*system", 
	"\t^ SystemNavigation default",
	null, "2011-09-23T09:20:34Z", "mp");

jst.Object.addMethod("browse", "", "*system", 
	"\tself systemNavigation browse: self",
	null, "2011-09-26T10:13:19Z", "mp");

jst.Object.addMethod("browseHierarchy", "", "*system", 
	"\tself systemNavigation browseHierarchy: self",
	null, "2011-10-13T08:39:55Z", "mp");

jst.Object.addMethod("broadcastEvent:with:async:", "eventName anObject aBoolean", "*system", 
	"\tUIManager default broadcastEvent: eventName with: anObject async: aBoolean",
	null, "2013-06-23T20:46:37Z", "mp");

jst.Object.addMethod("broadcastEvent:with:", "eventName anObject", "*system", 
	"\tself broadcastEvent: eventName with: anObject async: true",
	null, "2013-04-12T06:23:34Z", "mp");

jst.Object.addMethod("broadcastEvent:", "anObject", "*system", 
	"\tself broadcastEvent: anObject with: nil",
	null, "2013-04-12T06:31:03Z", "mp");

//Behavior

jst.Behavior.addMethod("allCallsOn", "", "*system", 
	"\t^ self systemNavigation allCallsOn: self theNonMetaClass name",
	null, "2011-10-20T07:05:12Z", "mp");

jst.Behavior.addMethod("javascriptDefinition", "", "*system", 
	"\t^ (Parser parseCode: self definitionST80) " +
	"\n\t\texpressions first javascriptDefinition",
	null, "2012-09-13T21:01:36Z", "mp");

// *** UIManager ***

jst.UIManager._class.addMethod("default", "", "accessing", 
	"\t^ Default ifNil:[ | mgrClass |" +
	"\n\t\t\"Note: The way the following is phrased ensures that you can always make 'more specific' managers merely by subclassing a tool builder and implementing a more specific way of reacting to #isActiveManager. For example, a BobsUIManager can subclass MorphicUIManager and (if enabled, say Preferences useBobsUI) will be considered before the parent (generic MorphicUIManager).\"" +
	"\n\t\tmgrClass := self allSubclasses detect: [:any | " +
	"\n\t\t\tany isActiveManager and: [any subclasses noneSatisfy:[:sub| sub isActiveManager]]] ifNone: []." +
	"\n\t\tmgrClass ifNotNil: [mgrClass new]" +
	"\n\t]",
	"__default", "2011-09-21T17:56:36Z", "mp");

jst.UIManager._class.addMethod("default:", "anUIManager", "accessing", 
	"\tDefault := anUIManager",
	null, "2011-09-21T17:57:59Z", "mp");

jst.UIManager._class.addMethod("isActiveManager", "", "testing", 
	"\t\"Answer whether I should act as the active ui manager\"" +
	"\n\t^ false",
	null, "2011-09-21T17:58:34Z", "mp");

jst.UIManager.addMethod("inform:", "anObject", "ui requests", 
	"\t\"Display a message for the user to read and then dismiss\"" +
	"\n\tself subclassResponsibility",
	null, "2011-09-21T17:51:25Z", "mp");

jst.UIManager.addMethod("confirm:thenDo:", "aString aBlock", "ui requests", 
	"\tself subclassResponsibility", 
	null, "2011-09-22T15:35:00Z", "mp"); 

jst.UIManager.addMethod("request:thenDo:", "queryString aBlock", "ui requests", 
	"\tself subclassResponsibility",
	null, "2011-11-18T11:42:38Z", "mp");

jst.UIManager.addMethod("informUser:during:", "aString aBlock", "ui requests", 
	"\t\"Display a message during execution of the given block.\"" +
	"\n\tself subclassResponsibility",
	null, "2012-08-30T13:57:24Z", "mp");

jst.UIManager.addMethod("showErrorInfo:", "anError", "ui requests", 
	"\t\"Display an error message for the user to read and then dismiss\"" +
	"\n\tself subclassResponsibility",
	null, "2012-12-19T09:34:12Z", "mp");

jst.UIManager.addMethod("broadcastEvent:with:async:", "eventName anObject aBoolean", "system events", 
	"\t\"sends the event to all UI components\"" +
	"\n\tself subclassResponsibility",
	null, "2013-06-23T20:44:39Z", "mp");
/*
jst.UIManager.addMethod("broadcastEvent:with:", "eventName anObject", "system events", 
	"\t\"sends the event to all UI components\"" +
	"\n\tself subclassResponsibility",
	null, "2012-12-19T14:13:19Z", "mp", 1);

jst.UIManager.addMethod("broadcastEvent:with:", "eventName anObject", "system events", 
	"\tself broadcastEvent: anObject with: nil async: true",
	null, "2013-06-23T20:47:54Z", "mp");

jst.UIManager.addMethod("broadcastEvent:", "anObject", "system events", 
	"\tself broadcastEvent: anObject with: nil",
	null, "2012-12-19T14:13:50Z", "mp", 1);

jst.UIManager.addMethod("broadcastEvent:", "anObject", "system events", 
	"\tself broadcastEvent: anObject with: nil async: true",
	null, "2013-06-23T20:48:14Z", "mp");
*/

//*** AppRegistry ***

with (jst.AppRegistry._class) {
	instanceVariableNames_("registeredClasses default");

	addMethod("appName", "", "accessing", 
		"\t\"Defaults to the class name, which is probably good enough, but you could override this in subclasses if you want to.\"" +
		"\n\t^ self name",
		null, "2011-09-21T13:23:52Z", "mp");

	addMethod("askForDefault", "", "accessing", 
		"\t| menu |" +
		"\n\tself registeredClasses isEmpty ifTrue: [" +
		"\n\t\tself inform: ('There are no {1} applications registered.' translated format: {self appName})." +
		"\n\t\t^ default := nil]." +
		"\n\tself registeredClasses size = 1 ifTrue: [" +
		"\n\t\t^ default := self registeredClasses anyOne]." +
		"\n\tdefault := UIManager default " +
		"\n\t\tchooseFrom: (self registeredClasses collect:[:each | each name printString])" +
		"\n\t\tvalues: self registeredClasses" +
		"\n\t\ttitle: ('Which {1} would you prefer?' translated format: {self appName})." +
		"\n\t^default",
		null, "2011-09-21T21:25:35Z", "mp");
	
	addMethod("registeredClasses", "", "accessing", 
		"\t^ registeredClasses ifNil: [registeredClasses := OrderedCollection new]",
		null, "2011-09-21T15:20:49Z", "mp");
	
	addMethod("defaultOrNil", "", "accessing", 
		"\t^ default",
		null, "2011-09-21T20:36:52Z", "mp");

	addMethod("default", "", "accessing", 
		"\t^ default ifNil: [self askForDefault]",
		 "__default", "2011-09-21T20:35:17Z", "mp");

	addMethod("default:", "aClassOrNil", "accessing", 
		"\t\"Sets my default to aClassOrNil. Answers the old default.\"" +
		"\n\t| oldDefault |" +
		"\n\toldDefault := default." +
		"\n\taClassOrNil ifNotNil: [ self register: aClassOrNil ]." +
		"\n\tdefault := aClassOrNil." +
		"\n\t^ oldDefault",
		null, "2011-09-21T20:36:28Z", "mp");

	addMethod("register:", "aProviderClass", "registration", 
		"\t(self registeredClasses includes: aProviderClass) ifFalse: [" +
		"\n\t\tdefault := nil.  \"so it'll ask for a new default, since if you're registering a new app you probably want to use it\"" +
		"\n\t\tself registeredClasses add: aProviderClass].",
		null, "2011-09-21T20:37:58Z", "mp");

	addMethod("unregister:", "aProviderClass", "registration", 
		"\t(default = aProviderClass) ifTrue: [default := nil]." +
		"\n\tself registeredClasses remove: aProviderClass ifAbsent: [].",
		null, "2011-09-21T20:38:58Z", "mp");

};

//*** ToolSet ***

jst.ToolSet._class.addMethod("browse:", "anObject", "browsing", 
	"\t\"Open a browser\"" +
	"\n\tself default ifNil: [" +
	"\n\t\t^self inform: 'Cannot open Browser' translated]." +
	"\n\t^ self default browse: anObject",
	null, "2011-09-21T21:44:55Z", "mp");

jst.ToolSet._class.addMethod("browseMessageSet:name:autoSelect:", "messageList title autoSelectString", "browsing", 
	"\t\"Open a message set browser\"" +
	"\n\tself default ifNil:[" +
	"\n\t\t^ self inform: 'Cannot open MessageSet' translated]." +
	"\n\t^ self default browseMessageSet: messageList name: title autoSelect: autoSelectString",
	null, "2011-09-26T21:44:26Z", "mp");

jst.ToolSet._class.addMethod("browseHierarchy:", "anObject", "browsing", 
	"\t\"Open a browser\"" +
	"\n\tself default ifNil:[" +
	"\n\t\t^ self inform: 'No hierarchy browser present' translated]." +
	"\n\t^ self default browseHierarchy: anObject",
	null, "2011-10-12T21:21:55Z", "mp");

jst.ToolSet._class.addMethod("browseVersionsForClass:selector:", "aClass aSelector", "browsing", 
	"\t\"Open a method versions browser\"" +
	"\n\tself default ifNil:[" +
	"\n\t\t^ self inform: 'Cannot open VersionsBrowser' translated]." +
	"\n\t^ self default browseVersionsForClass: aClass selector: aSelector",
	null, "2013-05-31T20:41:19Z", "mp");

jst.ToolSet._class.addMethod("inspect:", "anObject", "inspecting", 
	"\t\"Open an inspector on the given object. The tool set must know which inspector type to use for which object" +
	"\n\t- the object cannot possibly know what kind of inspectors the toolset provides.\"" +
	"\n\tself default ifNil:[" +
	"\n\t\t^ self inform: 'Cannot inspect - no ToolSet present']." +
	"\n\t^ self default inspect: anObject",
	null, "2012-01-01T16:51:24Z", "mp");

jst.ToolSet._class.addMethod("inspect:label:", "anObject aString", "inspecting", 
	"\tself default ifNil:[" +
	"\n\t\t^self inform: 'Cannot inspect - no ToolSet present']." +
	"\n\t^ self default inspect: anObject label: aString",
	null, "2012-01-23T20:01:33Z", "mp");

// *** SystemNavigation ***

jst.SystemNavigation._class.addMethod("default", "", "accessing", 
	"\t^ Default ifNil: [" +
	"\n\t\tDefault := self new]",
	"__default", "2011-09-23T09:19:16Z", "mp");

jst.SystemNavigation.addMethod("allBehaviorsDo:", "aBlock", "query", 
	"\t\"Evaluate the argument, aBlock, for each kind of Behavior in the system (that is, Object and its subclasses)\"" +
	"\n\tSmalltalk allClassesDo: aBlock." +
	"\n\tClass allSubclassesDo: aBlock.",
	null, "2011-09-23T10:38:08Z", "mp");

jst.SystemNavigation.addMethod("browse:", "anObject", "browse", 
	"\tToolSet browse: anObject",
	null, "2011-09-26T10:08:27Z", "mp");

jst.SystemNavigation.addMethod("browseHierarchy:", "anObject", "browse", 
	"\t^ ToolSet browseHierarchy: anObject",
	null, "2012-04-19T21:31:34Z", "mp"); //jst-system

/*
jst.SystemNavigation.addMethod("browseAllCallsOn:", "aLiteral", "browse", 
	"\t\"Open a message browser on each method that refers to aLiteral. " +
	"\n\tFor example, SystemNavigation new browseAllCallsOn: #open:label:.\"" +
	"\n\t(aLiteral isKindOf: LookupKey) ifTrue: [" +
	"\n\t\t^ self" +
	"\n\t\t\tbrowseMessageList: (self allCallsOn: aLiteral)" +
	"\n\t\t\tname: ('Users of {1}' translated format: {aLiteral key})" +
	"\n\t\t\tautoSelect: aLiteral key]." +
	"\n\tself" +
	"\n\t\tbrowseMessageList: (self allCallsOn: aLiteral)" +
	"\n\t\tname: ('Senders of {1}' translated format: {aLiteral})" +
	"\n\t\tautoSelect: aLiteral",
	null, "2011-09-26T21:38:54Z", "mp");

jst.SystemNavigation.addMethod("browseAllCallsOn:", "aLiteral", "browse", 
	"\t\"Open a message browser on each method that refers to aLiteral. " +
	"\n\tFor example, SystemNavigation new browseAllCallsOn: #open:label:.\"" +
	"\n\t^ self" +
	"\n\t\tbrowseMessageList: (self allCallsOn: aLiteral)" +
	"\n\t\tname: ('Senders of {1}' translated format: {aLiteral})" +
	"\n\t\tautoSelect: aLiteral keywords first",
	null, "2012-04-19T21:18:21Z", "mp");
*/

jst.SystemNavigation.addMethod("browseAllCallsOn:", "aLiteral", "browse", 
	"\t\"Open a message browser on each method that refers to aLiteral. " +
	"\n\tFor example, SystemNavigation new browseAllCallsOn: #open:label:.\"" +
	"\n\t^ (self" +
	"\n\t\tbrowseMessageList: (self allCallsOn: aLiteral)" +
	"\n\t\tname: ('Senders of {1}' translated format: {aLiteral})" +
	"\n\t\tautoSelect: aLiteral keywords first) " +
	"\n\t\tifNotNilDo: [:win |" +
	"\n\t\t\twin saveAs: 'browseAllCallsOn:' with: aLiteral.]",
	null, "2012-04-27T10:11:27Z", "mp");

jst.SystemNavigation.addMethod("browseAllCallsOnClass:", "aClass", "browse", 
	"\t\"Create and schedule a message browser on each method that refers to aClass. " +
	"\n\tFor example, SystemNavigation new browseAllCallsOnClass: Object.\"" +
	"\n\t^ (self" +
	"\n\t\tbrowseMessageList: aClass allCallsOn" +
	"\n\t\tname: 'Users of class ' , aClass theNonMetaClass name" +
	"\n\t\tautoSelect: aClass theNonMetaClass name)" +
	"\n\t\tifNotNilDo: [:win |" +
	"\n\t\t\twin saveAs: 'browseAllCallsOnClass:' with: aClass]",
	null, "2012-04-27T10:18:31Z", "mp");

jst.SystemNavigation.addMethod("browseMessageList:name:autoSelect:", "messageList labelString autoSelectString", "browse", 
	"\t| title aSize |" +
	"\n\t\"Open a MessageSet browser on the message list.\"" +
	"\n\tmessageList size = 0 ifTrue: [" +
	"\n\t\tself inform: 'There are no ' , labelString." +
	"\n\t\t^ nil]." +
	"\n\ttitle := (aSize := messageList size) > 1" +
	"\n\t\tifFalse: [labelString]" +
	"\n\t\tifTrue: [labelString, ' [', aSize printString, ']']." +
	"\n\t^ ToolSet " +
	"\n\t\tbrowseMessageSet: messageList " +
	"\n\t\tname: title " +
	"\n\t\tautoSelect: autoSelectString",
	null, "2012-04-27T08:47:28Z", "mp");

jst.SystemNavigation.addMethod("browseAllImplementorsOf:", "selector", "browse", 
	"\t\"Open a message browser on each method that implements " +
	"\n\tthe message whose selector is the argument, selector. For example,  " +
	"\n\tSmalltalk systemNavigation browseAllImplementorsOf: #at:put:.\"" +
	"\n\t^ (self" +
	"\n\t\tbrowseMessageList: (self allImplementorsOf: selector)" +
	"\n\t\tname: ('Implementors of {1}' translated format: {selector}))" +
	"\n\t\tifNotNilDo: [:win |" +
	"\n\t\t\twin saveAs: 'browseAllImplementorsOf:' with: selector]",
	null, "2012-04-27T10:17:37Z", "mp");

jst.SystemNavigation.addMethod("browseMessageList:name:", "messageList label", "browse", 
	"\t\"Open a MessageSet browser on messageList.\"" +
	"\n\t^ self   " +
	"\n\t\tbrowseMessageList: messageList " +
	"\n\t\tname: label " +
	"\n\t\tautoSelect: nil",
	null, "2011-09-27T06:37:49Z", "mp");

/* podminka byla spatne, zatim jsem ji uplne vymazal - nemela by se preformulovat?
jst.SystemNavigation.addMethod("browseAllAccessesTo:from:", "varName aClass", "browse", 
	"\t\"Create and schedule a Message Set browser for all the receiver's methods " +
	"\n\tor any methods of a subclass/superclass that refer to the instance/class variable name.\"" +
	"\n\t| coll |" +
	"\n\tcoll := OrderedCollection new." +
	"\n\taClass == Object " +
	"\n\t\tifTrue: [Smalltalk allClassesDo: [:cls | " +
	"\n\t\t\t(cls whichMethodsAccess: varName) do: [:m |" +
	"\n\t\t\t\tcoll add: m]]] " +
	"\n\t\tifFalse: [aClass withAllSubAndSuperclassesDo: [:cls | " +
	"\n\t\t\taClass theMetaClass == cls ifFalse: [" +
	"\n\t\t\t\t\"we need skip Object as it is superclass of Object class\"" +
	"\n\t\t\t\t(cls whichMethodsAccess: varName) do: [:m |" +
	"\n\t\t\t\t\tcoll add: m]]]]." +
	"\n\t^ self " +
	"\n\t\tbrowseMessageList: coll " +
	"\n\t\tname: ('Accesses to {1}' translated format: {varName})" +
	"\n\t\tautoSelect: varName",
	null, "2011-10-24T20:19:15Z", "mp");
*/

jst.SystemNavigation.addMethod("browseAllAccessesTo:from:", "varName aClass", "browse", 
	"\t\"Create and schedule a Message Set browser for all the receiver's methods " +
	"\n\tor any methods of a subclass/superclass that refer to the instance/class variable name.\"" +
	"\n\t| coll |" +
	"\n\tcoll := OrderedCollection new." +
	"\n\taClass == Object " +
	"\n\t\tifTrue: [Smalltalk allClassesDo: [:cls | " +
	"\n\t\t\t(cls whichMethodsAccess: varName) do: [:m |" +
	"\n\t\t\t\tcoll add: m]]] " +
	"\n\t\tifFalse: [aClass withAllSubAndSuperclassesDo: [:cls | " +
	"\n\t\t\t(cls whichMethodsAccess: varName) do: [:m |" +
	"\n\t\t\t\tcoll add: m]]]." +
	"\n\t^ (self " +
	"\n\t\tbrowseMessageList: coll " +
	"\n\t\tname: ('Accesses to {1}' translated format: {varName})" +
	"\n\t\tautoSelect: varName)" +
	"\n\t\tifNotNilDo: [:win |" +
	"\n\t\t\twin saveAs: 'browseAllAccessesTo:from:' with: {varName. aClass}]",
	null, "2012-04-27T10:21:44Z", "mp");

jst.SystemNavigation.addMethod("methodHierarchyBrowserForClass:selector:", "aClass sel", "browse", 
	"\t| list |" +
	"\n\tlist := OrderedCollection new." +
	"\n\taClass withAllSuperclassesDo: [:cl |" +
	"\n\t\tcl methodDict at: sel ifPresent: [:m |" +
	"\n\t\t\tlist addFirst: m]]." +
	"\n\t^ (self " +
	"\n\t\tbrowseMessageList: list " +
	"\n\t\tname: ('Inheritance of {1}' translated format: {sel})) " +
	"\n\t\tifNotNilDo: [:win |" +
	"\n\t\t\twin saveAs: 'methodHierarchyBrowserForClass:selector:' with: {aClass. sel}]",
	null, "2012-04-27T10:24:30Z", "mp");

jst.SystemNavigation.addMethod("allCallsOn:", "aLiteral", "query", 
	"\t\"Answer a Collection of all the methods that call on aLiteral even deeply embedded in literal array.\"" +
	"\n\t| aCollection |" +
	"\n\taCollection := SortedCollection new." +
	"\n\tself allBehaviorsDo: [:cls | cls methodDict do: [:m |" +
	"\n\t\t (m callsSymbol: aLiteral) ifTrue: [" +
	"\n\t\t\taCollection add: m]]]." +
	"\n\t^ aCollection",
	null, "2012-02-01T20:33:10Z", "mp");

jst.SystemNavigation.addMethod("allImplementorsOf:", "aSelector", "query", 
	"\t\"Answer a SortedCollection of all the methods that implement the message aSelector.\"" +
	"\n\t| aCollection |" +
	"\n\taCollection := SortedCollection new." +
	"\n\tself allBehaviorsDo: [:cls | " +
	"\n\t\tcls methodDict at: aSelector ifPresent: [:m |" +
	"\n\t\t\taCollection add: m]]." +
	"\n\t^ aCollection",
	null, "2012-02-01T20:36:35Z", "mp");

jst.SystemNavigation.addMethod("browseVersionsForClass:selector:", "aClass aSelector", "browse", 
	"\t^ ToolSet browseVersionsForClass: aClass selector: aSelector",
	null, "2013-05-31T22:19:07Z", "mp");

//SystemDictionary extension
/*
jst.SystemDictionary.addMethod("loadChanges", "", "system", function (){
	jst.currentJsFile = jst.ChangeSet.current();
	jst.ChangeSet.current().loaded_(function(str){eval(str);});
},
	null, "2012-03-02T14:24:24Z", "mp");

jst.SystemDictionary.addMethod("loadChangesAndDo:", "aBlock", "system", function (aBlock){
	jst.currentJsFile = jst.ChangeSet.current();
	jst.ChangeSet.current().loaded_(function(str){
		console.log('changes loaded');
		eval(str);
		aBlock.value();
	});
},
	null, "2012-04-13T12:40:28Z", "mp");
*/

jst.SystemDictionary.addMethod("loadChangesAndDo:", "aBlock", "system", 
	"\tSmalltalk at: #currentJsFile put: ChangeSet current." +
	"\n\tChangeSet current loaded: [:str |" +
	"\n\t\tConsole log: 'changes loaded'." +
	"\n\t\tstr eval." +
	"\n\t\taBlock value]",
	null, "2012-04-13T18:54:17Z", "mp"); //jst-system

//*** ChangeSet ***

jst.ChangeSet._class.instanceVariableNames_("current");

jst.ChangeSet._class.addMethod("current", "", "accessing", "\t^ current ifNil: [current := self new]");

jst.ChangeSet.addMethod("initialize", "", "initialization", 
	"\tfileStream := FileDirectory default forceNewFileNamed: 'jstchanges.js'." +
	"\n\tchangedClasses := SortedCollection new." +
	"\n\tmodified := false." +
	"\n\tstream := '' writeStream",
	null, "2012-04-06T13:27:48Z", "mp");

jst.ChangeSet.addMethod("temporary:", "aBoolean", "accessing", 
	"\tfileStream fileSystem isTemporary: aBoolean",
	null, "2012-04-05T22:11:28Z", "mp");
	
jst.ChangeSet.addMethod("contents", "", "accessing", 
	"\t^ stream contents",
	null, "2012-04-05T21:57:32Z", "mp");

jst.ChangeSet.addMethod("isModified", "", "testing", 
	"\t^ modified",
	null, "2012-04-05T15:00:57Z", "mp");

/*
jst.ChangeSet.addMethod("rebuild", "", "initialization", 
	"\t| printMethods |" +
	"\n\tstream := '' writeStream." +
	"\n\tSmalltalk at: #user ifPresent: [:u | stream " +
	"\n\t\tnextPutAll: 'jst.Smalltalk.at_put_(\"user\", \"'; " +
	"\n\t\tnextPutAll: u; " +
	"\n\t\tnextPutAll: '\");'; " +
	"\n\t\tcrlf]." +
	"\n\t\"classes\"" +
	"\n\tchangedClasses do: [:n |" +
	"\n\t\t(Smalltalk classNamed: n) ifNotNilDo: [:c |" +
	"\n\t\t\tstream crlf; nextPutAll: c javascriptDefinition; crlf]]." +
	"\n\t\"methods\"" +
	"\n\tprintMethods:= [:c | c methodDict valuesDo: [:m |" +
	"\n\t\tm jsFile value == self ifTrue: [" +
	"\n\t\t\tstream crlf; nextPutAll: m javascriptDefinition; crlf." +
	"\n\t\t\tm selector = #initialize & (m receiver isClassSide) ifTrue: [" +
	"\n\t\t\t\t\"adding class initialization\"" +
	"\n\t\t\t\tstream crlf;" +
	"\n\t\t\t\t\tnextPutAll: 'jst.initializeClass(';" +
	"\n\t\t\t\t\tnextPutAll: m receiver theNonMetaClass javascriptName;" +
	"\n\t\t\t\t\tnextPutAll: ');'; crlf]]]]." +
	"\n\tSmalltalk allClassesDo: [:c |" +
	"\n\t\tprintMethods value: c theNonMetaClass." +
	"\n\t\tprintMethods value: c theMetaClass]." +
	"\n\tfileStream resetContents: stream contents",
	null, "2012-09-16T13:44:59Z", "mp");
*/
jst.ChangeSet.addMethod("rebuild", "", "initialization", 
	"\t| printMethods |" +
	"\n\tstream := '' writeStream." +
	"\n\tSmalltalk at: #user ifPresent: [:u | stream " +
	"\n\t\tnextPutAll: 'jst.Smalltalk.at_put_(\"user\", \"'; " +
	"\n\t\tnextPutAll: u; " +
	"\n\t\tnextPutAll: '\");'; " +
	"\n\t\tcrlf]." +
	"\n\t\"classes\"" +
	"\n\t(((changedClasses collect: [:n | Smalltalk classNamed: n]) select: [:c | c notNil]) " +
	"\n\t\tasSortedCollection: [:a :b | b inheritsFrom: a]) do: [:c |" +
	"\n\t\t\tstream crlf; nextPutAll: c javascriptDefinition; crlf]." +
	"\n\t\"methods\"" +
	"\n\tprintMethods:= [:c | c methodDict valuesDo: [:m |" +
	"\n\t\tm jsFile value == self ifTrue: [" +
	"\n\t\t\tstream crlf; nextPutAll: m javascriptDefinition; crlf." +
	"\n\t\t\tm selector = #initialize & (m receiver isClassSide) ifTrue: [" +
	"\n\t\t\t\t\"adding class initialization\"" +
	"\n\t\t\t\tstream crlf;" +
	"\n\t\t\t\t\tnextPutAll: 'jst.initializeClass(';" +
	"\n\t\t\t\t\tnextPutAll: m receiver theNonMetaClass javascriptName;" +
	"\n\t\t\t\t\tnextPutAll: ');'; crlf]]]]." +
	"\n\tSmalltalk allClassesDo: [:c |" +
	"\n\t\tprintMethods value: c theNonMetaClass." +
	"\n\t\tprintMethods value: c theMetaClass]." +
	"\n\tfileStream resetContents: stream contents",
	null, "2013-05-20T12:59:50Z", "mp");

jst.ChangeSet.addMethod("contents:", "aString", "accessing", 
	"\tstream := '' writeStream." +
	"\n\tstream nextPutAll: aString." +
	"\n\tmodified := true." +
	"\n\tfileStream resetContents: aString",
	null, "2012-04-05T14:53:10Z", "mp");

jst.ChangeSet.addMethod("loaded:", "aBlock", "initialization", 
	"\tfileStream fileSystem notFoundErrorHandler: [" +
	"\n\t\t\"if the file does not yet exist\"" +
	"\n\t\taBlock valueWithPossibleArgument: '']." +
	"\n\tfileStream contentsDo: [:str |" +
	"\n\t\tstream := '' writeStream." +
	"\n\t\tstream nextPutAll: str." +
	"\n\t\taBlock valueWithPossibleArgument: str]",
	null, "2012-05-02T08:21:46Z", "mp");

jst.ChangeSet.addMethod("append:", "aString", "adding", 
	"\tstream isEmpty ifFalse: [" +
	"\n\t\tfileStream append: (stream nextPutAll: String crlf)]." +
	"\n\tfileStream append: (stream nextPutAll: aString)." +
	"\n\t(aString isEmpty not and: [aString last ~= Character cr & (aString last ~= Character lf)]) ifTrue: [" +
	"\n\t\tfileStream append: (stream nextPutAll: String crlf)]",
	null, "2012-04-05T21:43:36Z", "mp");

jst.ChangeSet.addMethod("addMethod:", "aMethod", "adding", 
	"\tself append: aMethod javascriptDefinition." +
	"\n\taMethod selector = #initialize & (aMethod receiver isClassSide) ifTrue: [" +
	"\n\t\tself append: ('jst.initializeClass({1});' format: {aMethod receiver theNonMetaClass javascriptName})." +
	"\n\t\taMethod receiver theNonMetaClass initialize]",
	null, "2012-09-16T13:48:35Z", "mp");

jst.ChangeSet.addMethod("addCode:", "aCode", "adding", 
	"\tself append: aCode javascriptDefinition",
	null, "2012-04-05T21:50:18Z", "mp");

jst.ChangeSet.addMethod("classChanged:", "aClass", "accessing", 
	"\taClass jsFile value == self ifFalse: [" +
	"\n\t\t\"see Class>>jsFileName\"" +
	"\n\t\taClass jsFile: aClass jsFile -> self]." +
	"\n\tchangedClasses addUnique: aClass name",
	null, "2012-04-11T11:11:17Z", "mp");

jst.ChangeSet.addMethod("reset", "", "initialization", 
	"\tstream := '' writeStream." +
	"\n\tchangedClasses := SortedCollection new." +
	"\n\t\"methods\"" +
	"\n\tDelayedTask new delay: 100; task: [" +
	"\n\t\tself systemNavigation allBehaviorsDo: [:c | c methodDict valuesDo: [:m |" +
	"\n\t\t\tm jsFile value == self ifTrue: [" +
	"\n\t\t\t\tm jsFile: m jsFileName]]]];" +
	"\n\t\trun." +
	"\n\tmodified := false." +
	"\n\tfileStream resetContents: ''",
	null, "2012-04-24T09:55:45Z", "mp");

//Class extensions

jst.Class.addMethod("jsFileName", "", "*system", 
	"\t\"name of javascript source file or nil, see ChangeSet>>classChanged:\"" +
	"\n\t^ jsFile == jsFile value " +
	"\n\t\tifTrue: [jsFile]" +
	"\n\t\tifFalse: [jsFile key]",
	null, "2012-04-11T11:13:45Z", "mp");

jst.Class.addMethod("printComment", "", "*system", 
	"\t^ String streamContents: [:s |" +
	"\n\t\tjsFile ifNotNil: [" +
	"\n\t\t\ts nextPut: $[." +
	"\n\t\t\tjsFile isString " +
	"\n\t\t\t\tifTrue: [s nextPutAll: jsFile]" +
	"\n\t\t\t\tifFalse: [self jsFileName " +
	"\n\t\t\t\t\tifNil: [s nextPutAll: 'new class']" +
	"\n\t\t\t\t\tifNotNilDo: [:n | s nextPutAll: n; nextPut: $*]]." +
	"\n\t\t\ts nextPutAll: '] ']." +
	"\n\t\ts nextPutAll: (comment ifNil: [" +
	"\n\t\t\t'This class has no comment.']) translated]",
	null, "2012-04-11T11:19:34Z", "mp");

// Metaclass extensions

jst.Metaclass.addMethod("printComment", "", "*system", 
	"\t^ thisClass printComment",
	null, "2012-04-10T21:08:05Z", "mp");

jst.Metaclass.addMethod("jsFileName", "", "*system", 
	"\t^ thisClass jsFileName",
	null, "2012-09-15T12:21:00Z", "mp");

// MethodVersion extensions

jst.MethodVersion.addMethod("jsFileName", "", "*system", 
	"\t\"name of javascript source file or nil\"" +
	"\n\t^ jsFile isString" +
	"\n\t\tifTrue: [jsFile]" +
	"\n\t\tifFalse: [priorVersion ifNotNil: [" +
	"\n\t\t\tpriorVersion jsFileName]]",
	null, "2012-04-11T11:50:30Z", "mp");

jst.MethodVersion.addMethod("printFileInfoOn:", "s", "*system", 
	"\tjsFile ifNotNil: [" +
	"\n\t\ts nextPut: $[." +
	"\n\t\tjsFile isString " +
	"\n\t\t\tifTrue: [s nextPutAll: jsFile]" +
	"\n\t\t\tifFalse: [self jsFileName " +
	"\n\t\t\t\tifNil: [s nextPutAll: 'new method']" +
	"\n\t\t\t\tifNotNilDo: [:name | s nextPutAll: name; nextPut: $*]]." +
	"\n\t\ts nextPutAll: '] ']",
	null, "2013-06-01T18:56:14Z", "mp");

jst.MethodVersion.addMethod("printComment", "", "*system", 
	"\t^ String streamContents: [:s |" +
	"\n\t\tself printFileInfoOn: s." +
	"\n\t\tcreatedBy ifNotNil: [" +
	"\n\t\t\ts nextPutAll: createdBy; space]." +
	"\n\t\tcreatedOn ifNotNil: [" +
	"\n\t\t\ts nextPutAll: createdOn asString]." +
	"\n\t\ts nextPutAll: ' - '; nextPutAll: category name]",
	null, "2013-06-01T18:55:33Z", "mp");

// Method extensions

jst.Method.addMethod("javascriptDefinition", "", "*system", 
	"\t^ String streamContents: [:s | | fceName |" +
	"\n\t\tself jsFileName ifNotNilDo: [:n |" +
	"\n\t\t\ts nextPutAll: '//', n, String crlf]." +
	"\n\t\ts nextPutAll: receiver javascriptName." +
	"\n\t\ts nextPutAll: '.addMethod(\"'; nextPutAll: selector; nextPutAll: '\", \"';" +
	"\n\t\t\tnextPutAll: (self argumentsSeparatedBy: String space); nextPutAll: '\", \"';" +
	"\n\t\t\tnextPutAll: category name; nextPutAll: '\", '; nextPutAll: String crlf; nextPut: Character tab." +
	"\n\t\tself printJavascriptSourceOn: s." +
	"\n\t\tcreatedOn notNil | createdBy notNil | (fceName := ReservedNames at: selector ifAbsent: []) notNil ifTrue: [" +
	"\n\t\t\ts nextPut: $,;  nextPutAll: String crlf; nextPut: Character tab." +
	"\n\t\t\tfceName ifNil: [s nextPutAll: 'null'] ifNotNil: [" +
	"\n\t\t\t\ts nextPutAll: ' \"'; nextPutAll: fceName; nextPut: '\"']." +
	"\n\t\t\tcreatedOn ifNotNil: [" +
	"\n\t\t\t\ts nextPutAll: ', \"'; nextPutAll: createdOn asISOString; nextPut: '\"']." +
	"\n\t\t\tcreatedBy ifNotNil: [" +
	"\n\t\t\t\ts nextPutAll: ', \"'; nextPutAll: createdBy; nextPut: '\"']" +
	"\n\t\t]." +
	"\n\t\ts nextPutAll: ');']",
	null, "2012-04-11T11:54:41Z", "mp", 1);

jst.Method.addMethod("javascriptDefinition", "", "*system", 
	"\t^ String streamContents: [:s | | fceName |" +
	"\n\t\ts nextPutAll: receiver javascriptName." +
	"\n\t\ts nextPutAll: '.addMethod(\"'; nextPutAll: selector; nextPutAll: '\", \"';" +
	"\n\t\t\tnextPutAll: (self argumentsSeparatedBy: String space); nextPutAll: '\", \"';" +
	"\n\t\t\tnextPutAll: category name; nextPutAll: '\", '; nextPutAll: String crlf; nextPut: Character tab." +
	"\n\t\tself printJavascriptSourceOn: s." +
	"\n\t\tcreatedOn notNil | createdBy notNil | (fceName := ReservedNames at: selector ifAbsent: []) notNil ifTrue: [" +
	"\n\t\t\ts nextPut: $,;  nextPutAll: String crlf; nextPut: Character tab." +
	"\n\t\t\tfceName ifNil: [s nextPutAll: 'null'] ifNotNil: [" +
	"\n\t\t\t\ts nextPutAll: ' \"'; nextPutAll: fceName; nextPut: '\"']." +
	"\n\t\t\tcreatedOn ifNotNil: [" +
	"\n\t\t\t\ts nextPutAll: ', \"'; nextPutAll: createdOn asISOString; nextPut: '\"']." +
	"\n\t\t\tcreatedBy ifNotNil: [" +
	"\n\t\t\t\ts nextPutAll: ', \"'; nextPutAll: createdBy; nextPut: '\"']" +
	"\n\t\t]." +
	"\n\t\ts nextPutAll: ');'." +
	"\n\t\t(self jsFileName ifNil: [receiver jsFileName]) ifNotNilDo: [:n |" +
	"\n\t\t\ts nextPutAll: ' //', n]." +
	"\n]",
	null, "2013-01-17T22:21:38Z", "mp");

jst.Method.addMethod("fnName", "", "*system", 
	"\t^ fnName",
	null, "2012-09-15T19:56:49Z", "mp");

//JSTParser extensions

jst.Expression.addMethod("javascriptDefinition", "", "*system", 
	"\t^ self asJavascript, ';'",
	null, "2012-04-02T14:09:31Z", "mp");

jst.MessageSend.addMethod("javascriptDefinition", "", "*system", 
	"\t^ String streamContents: [:s |" +
	"\n\t\ts nextPutAll: receiver javascriptDefinition allButLast;" +
	"\n\t\t\tnextPut: $.." +
	"\n\t\ts nextPutAll: (Method selectorToJsName: selector);" +
	"\n\t\t\t\"selector asFunctionName;\"" +
	"\n\t\t\tnextPut: $(." +
	"\n\t\targs " +
	"\n\t\t\tdo: [:arg | s nextPutAll: (arg asJavascript copyReplaceAll: $' with: $\")] " +
	"\n\t\t\tseparatedBy: [s nextPutAll: ', ']." +
	"\n\t\ts nextPutAll: ');']",
	null, "2012-04-08T19:48:00Z", "mp");

//*** TextDiffBuilder ***

jst.TextDiffBuilder.addMethod("from:to:", "sourceString destString", "initialization", 
	"\t| fmtSrc ix ix1 |" +
	"\n\tsrc := sourceString findTokens: String crlf." +
	"\n\tdst := destString findTokens: String crlf." +
	"\n\tfmtSrc := src collect: [:line | line withBlanksTrimmed]." +
	"\n\tix := 0." +
	"\n\tix1 := 1." +
	"\n\tdst := dst collect: [:line |" +
	"\n\t\tix := fmtSrc indexOf: line withBlanksTrimmed startingAt: ix1 ifAbsent: 0." +
	"\n\t\tix > 0 ifTrue: [" +
	"\n\t\t\tix1 := ix+1]." +
	"\n\t\tline -> ix]",
	null, "2013-06-02T20:08:58Z", "mp");

jst.TextDiffBuilder.addMethod("splitLine:", "aString", "private", 
	"\t| tabs |" +
	"\n\ttabs := 0." +
	"\n\t[tabs+1 <= aString size and: [(aString at: tabs+1) = Character tab]] whileTrue: [" +
	"\n\t\ttabs := tabs + 1]." +
	"\n\t^ {aString copyFrom: 1 to: tabs. aString allButFirst: tabs}",
	null, "2013-05-30T21:54:17Z", "mp");

jst.TextDiffBuilder.addMethod("buildPatchSequence", "", "processing", 
	"\t| ix |" +
	"\n\tix := 1." +
	"\n\tpatchSequence := OrderedCollection new." +
	"\n\tdst do: [:line | line value = 0" +
	"\n\t\tifTrue: [" +
	"\n\t\t\t\"a new line\"" +
	"\n\t\t\tpatchSequence add: '+' -> (self splitLine: line key)]" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tix to: line value - 1 do: [:i |" +
	"\n\t\t\t\t\"deleted lines\"" +
	"\n\t\t\t\tpatchSequence add: '-' -> (self splitLine: (src at: i))]." +
	"\n\t\t\tix := line value + 1." +
	"\n\t\t\t\"an existed line\"" +
	"\n\t\t\tpatchSequence add: '=' -> (self splitLine: line key)]" +
	"\n\t]." +
	"\n\t^ patchSequence",
	null, "2013-05-30T21:56:20Z", "mp", 1);

jst.TextDiffBuilder.addMethod("buildPatchSequence", "", "processing", 
	"\t| ix |" +
	"\n\tix := 0." +
	"\n\tpatchSequence := OrderedCollection new." +
	"\n\tdst do: [:line | line value = 0" +
	"\n\t\tifTrue: [" +
	"\n\t\t\t\"a new line\"" +
	"\n\t\t\tpatchSequence add: '+' -> (self splitLine: line key)]" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tix + 1 to: line value - 1 do: [:i |" +
	"\n\t\t\t\t\"deleted lines\"" +
	"\n\t\t\t\tpatchSequence add: '-' -> (self splitLine: (src at: i))]." +
	"\n\t\t\tix := line value." +
	"\n\t\t\t\"an existed line\"" +
	"\n\t\t\tpatchSequence add: '=' -> (self splitLine: line key)]" +
	"\n\t]." +
	"\n\tix > 0 ifTrue: [ix+1 to: src size do: [:i |" +
	"\n\t\t\"deleted lines at the end of src\"" +
	"\n\t\tpatchSequence add: '-' -> (self splitLine: (src at: i))]]." +
	"\n\t^ patchSequence",
	null, "2013-06-01T13:12:32Z", "mp", 1);

jst.TextDiffBuilder.addMethod("buildPatchSequence", "", "processing", 
	"\t| ix |" +
	"\n\tix := 0." +
	"\n\tpatchSequence := OrderedCollection new." +
	"\n\tdst do: [:line | line value = 0" +
	"\n\t\tifTrue: [" +
	"\n\t\t\t\"a new line\"" +
	"\n\t\t\tpatchSequence add: '+' -> (self splitLine: line key)]" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tix + 1 to: line value - 1 do: [:i |" +
	"\n\t\t\t\t\"deleted lines\"" +
	"\n\t\t\t\tpatchSequence add: '-' -> (self splitLine: (src at: i))]." +
	"\n\t\t\tix := line value." +
	"\n\t\t\t\"an existed line\"" +
	"\n\t\t\tpatchSequence add: '=' -> (self splitLine: line key)]" +
	"\n\t]." +
	"\n\tix+1 to: src size do: [:i |" +
	"\n\t\t\"deleted lines at the end of src\"" +
	"\n\t\tpatchSequence add: '-' -> (self splitLine: (src at: i))]." +
	"\n\t^ patchSequence",
	null, "2013-06-02T15:25:01Z", "mp"); //jst-system

jst.TextDiffBuilder.addMethod("buildDisplayPatch", "", "processing", 
	"\t^ DocumentFragment htmlContents: [:html | html div style: 'white-space: pre'; with: [" +
	"\n\t\tself buildPatchSequence do: [:line | " +
	"\n\t\t\tline key = '+' ifTrue: [" +
	"\n\t\t\t\t\"new line\"" +
	"\n\t\t\t\thtml div class: 'text-diff-added'; with: line value first, line value second]." +
	"\n\t\t\tline key = '-' ifTrue: [" +
	"\n\t\t\t\t\"deleted line\"" +
	"\n\t\t\t\thtml div: [" +
	"\n\t\t\t\t\tline value first size > 0 ifTrue: [" +
	"\n\t\t\t\t\t\thtml text: line value first]." +
	"\n\t\t\t\t\thtml span class: 'text-diff-deleted'; with: line value second]." +
	"\n\t\t\t]." +
	"\n\t\t\tline key = '=' ifTrue: [" +
	"\n\t\t\t\thtml div: line value first, line value second]" +
	"\n\t\t]" +
	"\n\t]]",
	null, "2013-05-30T21:58:26Z", "mp");

jst.TextDiffBuilder.addMethod("displayPatchOn:", "codeMirror", "processing", 
	"\t| marks |" +
	"\n\tmarks := {'+'. 'text-diff-added'. '-'. 'text-diff-deleted'} asDictionary." +
	"\n\tpatchSequence withIndexDo: [:line :ix | " +
	"\n\t\tmarks at: line key ifPresent: [:m |" +
	"\n\t\t\tcodeMirror markText: line value second" +
	"\n\t\t\t\twith: m" +
	"\n\t\t\t\tfrom: ix @ 1" +
	"\n\t\t\t\tfirstMatch: true]" +
	"\n\t]",
	null, "2013-06-01T12:47:24Z", "mp");
