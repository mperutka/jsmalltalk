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
 * Depends on jst-core, jst-core-proxy, jst-parser, jst-kernel, jst-dom, jst-files
 */

jst.currentJsFile = "jst-applications";

//*** CLASSES ***

jst.Dictionary.subclass("ApplicationState", "prefix userInfo", "", "", "Applications");

//jst.Object.subclass("AppPath", "id entries activeEntry activeExit value label compId onForceStop", "", "", "Applications");
jst.Object.subclass("AppPath", "id entries activeEntry activeExit value label component onForceStop suppressLabel", "", "", "Applications");
jst.AppPath.subclass("AppCrossroad", "exits onEnter link skipHistory", "", "", "Applications");
jst.AppCrossroad.subclass("AppPathStart", "currentStop onStopChange savedStop lastId trackHistory", "", "", "Applications");

jst.Object.subclass("AppPathToken", "paths", "", "", "Applications");

//*** AppPath ***

jst.AppPath.addMethod("initialize", "", "initialization", 
	"\tentries := #()",
	null, "2012-06-25T21:33:21Z", "mp");

jst.AppPath.addMethod("id", "", "accessing", 
	"\t^ id",
	null, "2013-08-09T13:13:28Z", "mp");

jst.AppPath.addMethod("id:", "anObject", "accessing", 
	"\tid := anObject",
	null, "2013-08-08T15:06:55Z", "mp");

jst.AppPath.addMethod("exits", "", "accessing", 
	"\t^ {activeExit}",
	null, "2013-08-08T15:09:14Z", "mp");

jst.AppPath.addMethod("allPaths", "", "accessing", 
	"\t| scan scanTop |" +
	"\n\tscan := OrderedCollection withAll: self exits." +
	"\n\tscanTop := 1." +
	"\n\t[scanTop <= scan size] whileTrue: [" +
	"\n\t\tscan addAll: (scan at: scanTop) exits." +
	"\n\t\tscanTop := scanTop + 1]." +
	"\n\t^ scan",
	null, "2013-08-08T22:08:28Z", "mp");

jst.AppPath.addMethod("addEntry:", "anAppPath", "accessing", 
	"\tentries := entries copyWith: anAppPath",
	null, "2012-06-25T21:34:22Z", "mp");

jst.AppPath.addMethod("addExit:", "anAppPath", "accessing", 
	"\tactiveExit := anAppPath addEntry: self",
	null, "2012-06-25T21:35:10Z", "mp");

jst.AppPath.addMethod("start", "", "accessing", 
	"\t\"no matter what entry is used\"" +
	"\n\t^ entries first start",
	null, "2012-06-25T21:39:14Z", "mp");

jst.AppPath.addMethod("currentStop", "", "accessing", 
	"\t^ self start currentStop",
	null, "2012-06-25T21:40:17Z", "mp");

jst.AppPath.addMethod("label:", "aString", "accessing", 
	"\tlabel := aString",
	null, "2012-06-22T20:18:08Z", "mp");

jst.AppPath.addMethod("value:", "anObject", "accessing", 
	"\tvalue := anObject",
	null, "2012-06-22T20:18:31Z", "mp");

jst.AppPath.addMethod("value", "", "accessing", 
	"\t^ value",
	null, "2012-06-28T13:03:19Z", "mp");

jst.AppPath.addMethod("activeExit:", "anAppPath", "private", 
	"\t\"use #addExit\"",
	null, "2012-06-25T07:55:28Z", "mp");

jst.AppPath.addMethod("printOn:", "stream", "printing", 
	"\tlabel " +
	"\n\t\tifNotNil: [stream nextPutAll: label]" +
	"\n\t\tifNil: [super printOn: stream]",
	null, "2012-11-08T14:03:04Z", "mp");

jst.AppPath.addMethod("printActivePath", "", "printing", 
	"\t^ String streamContents: [:s |" +
	"\n\t\tself start printPathOn: s]",
	null, "2012-06-22T22:00:15Z", "mp");

jst.AppPath.addMethod("printPathOn:", "stream", "printing", 
	"\tlabel ifNotNil: [" +
	"\n\t\tstream isEmpty ifFalse: [" +
	"\n\t\t\tstream nextPutAll: ' > ']." +
	"\n\t\tstream nextPutAll: label." +
	"\n\t]." +
	"\n\tactiveExit ifNotNil: [" +
	"\n\t\tactiveExit printPathOn: stream]",
	null, "2012-06-22T21:57:25Z", "mp", 1);

/*
jst.AppPath.addMethod("printPathOn:", "stream", "printing", 
	"\tlabel isEmptyOrNil ifFalse: [" +
	"\n\t\tstream isEmpty ifFalse: [" +
	"\n\t\t\tstream nextPutAll: ' > ']." +
	"\n\t\tstream nextPutAll: label." +
	"\n\t]." +
	"\n\tactiveExit ifNotNil: [" +
	"\n\t\tactiveExit printPathOn: stream]",
	null, "2013-08-28T08:06:33Z", "mp", 1); //jst-applications
*/

jst.AppPath.addMethod("printPathOn:", "stream", "printing", 
	"\t(label notNil and: [suppressLabel isNil or: [(suppressLabel match: label) not]]) ifTrue: [" +
	"\n\t\tstream isEmpty ifFalse: [" +
	"\n\t\t\tstream nextPutAll: ' > ']." +
	"\n\t\tstream nextPutAll: label." +
	"\n\t]." +
	"\n\tactiveExit ifNotNil: [" +
	"\n\t\tactiveExit printPathOn: stream]",
	null, "2014-04-17T12:17:21Z", "mp"); //jst-applications

jst.AppPath.addMethod("activatePath", "", "processing", 
	"\tself activeEntry" +
	"\n\t\tactiveExit: self;" +
	"\n\t\tactivatePath",
	null, "2012-06-27T09:58:54Z", "mp");

jst.AppPath.addMethod("activeEntry", "", "accessing", 
	"\t^ activeEntry ifNil: [entries first]",
	null, "2012-06-27T09:58:36Z", "mp");

jst.AppPath.addMethod("activeEntry:", "anAppPath", "private", 
	"\tentries size > 1 ifTrue: [" +
	"\n\t\tactiveEntry := anAppPath]",
	null, "2012-06-27T09:32:09Z", "mp");

jst.AppPath.addMethod("enterNode:", "aNode", "processing", 
	"\t\"entering node with #id and #text\"" +
	"\n\tself enter: aNode value: aNode id label: aNode text",
	null, "2012-06-24T14:31:27Z", "mp");
/*
jst.AppPath.addMethod("enterNode:", "aNode", "processing", 
	"\t\"entering node with #id and #text\"" +
	"\n\taNode " +
	"\n\t\tifNotNil: [self enter: aNode value: aNode id label: aNode text]" +
	"\n\t\tifNil: [self enter: nil labeled: nil]",
	null, "2013-08-27T21:55:39Z", "mp");

jst.AppPath.addMethod("enterNode:", "aNode", "processing", 
	"\t\"entering node with #id and #text\"" +
	"\n\taNode " +
	"\n\t\tifNotNil: [self enter: aNode value: aNode id label: aNode text]" +
	"\n\t\tifNil: [self enter: nil labeled: '']",
	null, "2013-08-28T08:05:01Z", "mp"); //jst-applications
*/

jst.AppPath.addMethod("enter:labeled:", "anObject aString", "processing", 
	"\tself enter: anObject value: anObject label: aString",
	null, "2012-06-23T22:13:25Z", "mp");

jst.AppPath.addMethod("enter:", "anObject", "processing", 
	"\tself enter: anObject value: anObject label: nil",
	null, "2012-06-23T22:12:58Z", "mp");

jst.AppPath.addMethod("enter:value:label:", "anObject newValue aString", "processing", 
	"\tvalue := newValue." +
	"\n\taString ifNotNil: [" +
	"\n\t\tlabel := aString]",
	null, "2012-06-24T16:04:49Z", "mp", 1);

jst.AppPath.addMethod("enter:value:label:", "anObject newValue aString", "processing", 
	"\tvalue := newValue." +
	"\n\tlabel := aString",
	null, "2014-04-17T11:47:45Z", "mp"); //jst-applications

jst.AppPath.addMethod("suppressLabel:", "aRegExp", "accessing", 
	"\t\"Matched labels will not be printed on the path\"" +
	"\n\tsuppressLabel := aRegExp",
	null, "2014-04-17T12:17:04Z", "mp");

/*
jst.AppPath.addMethod("reset", "", "processing", 
	"\tvalue := nil." +
	"\n\tlabel := nil",
	null, "2012-06-24T16:05:25Z", "mp");
*/

jst.AppPath.addMethod("reset", "", "processing", 
	"\tactiveExit ifNotNil: [" +
	"\n\t\tactiveExit reset]",
	null, "2012-06-25T08:30:01Z", "mp");

/*
jst.AppPath.addMethod("reset", "", "processing", 
	"\tvalue := nil." +
	"\n\tactiveExit ifNotNil: [" +
	"\n\t\tactiveExit reset]",
	null, "2012-11-08T15:21:20Z", "mp");
*/

jst.AppPath.addMethod("isCurrentStop", "", "testing", 
	"\t^ self = self start currentStop",
	null, "2012-06-25T11:29:22Z", "mp");

jst.AppPath.addMethod("label", "", "accessing", 
	"\t^ label",
	null, "2012-06-26T21:01:27Z", "mp");

jst.AppPath.addMethod("activeExit", "", "accessing", 
	"\t^ activeExit",
	null, "2013-01-07T08:12:14Z", "mp");

jst.AppPath.addMethod("isActivePath", "", "testing", 
	"\t^ self activeEntry activeExit = self",
	null, "2013-01-07T08:13:31Z", "mp");

jst.AppPath.addMethod("component:", "aComponent", "accessing", 
	"\tcompId := aComponent id",
	null, "2012-06-23T20:34:43Z", "mp", 1);

jst.AppPath.addMethod("component:", "aComponent", "accessing", 
	"\tcomponent := aComponent",
	null, "2013-09-23T08:47:26Z", "mp"); //jst-applications

jst.AppPath.addMethod("component", "", "accessing", 
	"\t^ compId " +
	"\n\t\tifNotNil: [self findComponent]" +
	"\n\t\tifNil: [entries size = 1 ifTrue: [" +
	"\n\t\t\tentries first component]]",
	null, "2013-04-30T09:04:36Z", "mp", 1);

jst.AppPath.addMethod("component", "", "accessing", 
	"\t^ component ifNil: [entries size = 1 ifTrue: [" +
	"\n\t\tentries first component]]",
	null, "2013-09-23T08:48:17Z", "mp"); //jst-applications

/* zruseno
jst.AppPath.addMethod("componentId", "", "accessing", 
	"\t^ compId ifNil: [entries size = 1 ifTrue: [" +
	"\n\t\tentries first componentId]]",
	null, "2013-08-08T09:28:17Z", "mp");

jst.AppPath.addMethod("findComponent", "", "private", 
	"\t^ nil",
	null, "2013-04-30T09:06:36Z", "mp");
*/

jst.AppPath.addMethod("pathActivated", "", "private", 
	"\t\"informs all components on the active path\"" +
	"\n\tcompId ifNotNil: [" +
	"\n\t\tself findComponent ifNotNilDo: [:cp |" +
	"\n\t\t\t(cp activeItem ifNil: [cp]) pathActivated: self]]." +
	"\n\tself activeEntry pathActivated",
	null, "2013-04-30T17:51:34Z", "mp", 1);

jst.AppPath.addMethod("pathActivated", "", "private", 
	"\t\"informs all components on the active path\"" +
	"\n\tcompId ifNotNil: [" +
	"\n\t\tself component ifNotNilDo: [:cp |" +
	"\n\t\t\t(cp activeItem ifNil: [cp]) pathActivated: self]]." +
	"\n\tself activeEntry pathActivated",
	null, "2013-08-18T22:36:19Z", "mp", 1);

jst.AppPath.addMethod("pathActivated", "", "private", 
	"\t\"informs all components on the active path\"" +
	"\n\tcomponent ifNotNil: [" +
	"\n\t\tcomponent pathActivated: self]." +
	"\n\tself activeEntry pathActivated",
	null, "2013-09-23T08:58:00Z", "mp"); //jst-applications

jst.AppPath.addMethod("trackHistory:", "aBlock", "processing", 
	"\tself start changeHistory: aBlock with: self",
	null, "2013-08-10T08:39:08Z", "mp");

jst.AppPath.addMethod("forceStop:last:ifAsync:", "aString aBoolean aBlock", "private", 
	"",
	null, "2013-08-14T21:49:50Z", "mp");

jst.AppPath.addMethod("onForceStop:", "aBlock", "processing", 
	"\tonForceStop := aBlock",
	null, "2013-08-14T21:53:53Z", "mp");

jst.AppPath.addMethod("isStop", "", "testing", 
	"\t^ false",
	null, "2013-08-18T20:15:35Z", "mp");

//*** AppCrossroad ***

jst.AppCrossroad.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\texits := #()",
	null, "2012-06-27T09:41:13Z", "mp", 1);

jst.AppCrossroad.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\texits := #()." +
	"\n\tskipHistory := false",
	null, "2013-08-22T15:01:54Z", "mp"); //jst-applications

jst.AppCrossroad.addMethod("skipHistory", "", "accessing", 
	"\t^ skipHistory",
	null, "2013-08-22T15:02:09Z", "mp");

jst.AppCrossroad.addMethod("skipHistory:", "aBoolean", "accessing", 
	"\tskipHistory := aBoolean",
	null, "2013-08-22T15:02:23Z", "mp");

jst.AppCrossroad.addMethod("exits", "", "accessing", 
	"\t^ exits",
	null, "2013-01-19T22:25:55Z", "mp");

jst.AppCrossroad.addMethod("enter:value:label:", "anObject newValue aString", "processing", 
	"\t| valueChanged |" +
	"\n\t(valueChanged := value ~= newValue)" +
	"\n\t\tifTrue: [" +
	"\n\t\t\tvalue := newValue." +
	"\n\t\t\taString ifNotNil: [" +
	"\n\t\t\t\tlabel := aString]." +
	"\n\t\t\texits do: [:ex | ex reset]]" +
	"\n\t\tifFalse: [self start currentStop = self ifTrue: [" +
	"\n\t\t\t\"nothing changed\"" +
	"\n\t\t\t^ self]]." +
	"\n\tactiveExit := nil." +
	"\n\tself activatePath." +
	"\n\tonEnter ifNotNil: [" +
	"\n\t\tonEnter valueWithPossibleArgs: { self. anObject. valueChanged}]." +
	"\n\tself start currentStop: self",
	null, "2012-10-03T08:12:58Z", "mp", 1);

jst.AppCrossroad.addMethod("enter:value:label:", "anObject newValue aString", "processing", 
	"\t| valueChanged |" +
	"\n\t(valueChanged := value ~= newValue)" +
	"\n\t\tifTrue: [" +
	"\n\t\t\tvalue := newValue." +
	"\n\t\t\taString ifNotNil: [" +
	"\n\t\t\t\tlabel := aString]." +
	"\n\t\t\texits do: [:ex | ex reset]]" +
	"\n\t\tifFalse: [self start currentStop = self ifTrue: [" +
	"\n\t\t\t\"nothing changed\"" +
	"\n\t\t\t^ self]]." +
	"\n\tactiveExit := nil." +
	"\n\tself start currentStop: self activatePath." +
	"\n\tonEnter ifNotNil: [" +
	"\n\t\tonEnter valueWithPossibleArgs: { self. anObject. valueChanged}]",
	null, "2014-02-12T19:52:28Z", "mp", 1);

/*
jst.AppCrossroad.addMethod("enter:value:label:", "anObject newValue aString", "processing", 
	"\t| valueChanged |" +
	"\n\t(valueChanged := value ~= newValue)" +
	"\n\t\tifTrue: [" +
	"\n\t\t\tvalue := newValue." +
	"\n\t\t\taString ifNotNil: [" +
	"\n\t\t\t\tlabel := aString]." +
	"\n\t\t\texits do: [:ex | ex reset]]" +
	"\n\t\tifFalse: [self start currentStop = self ifTrue: [" +
	"\n\t\t\t\"nothing changed\"" +
	"\n\t\t\t^ self]]." +
	"\n\tactiveExit := nil." +
	"\n\tself activatePath." +
	"\n\tonEnter ifNotNil: [" +
	"\n\t\tonEnter valueWithPossibleArgs: { self. anObject. valueChanged}]." +
	"\n\tself start" +
	"\n\t\ttrackHistory;" +
	"\n\t\tcurrentStop: self",
	null, "2013-08-09T17:45:33Z", "mp", 1); //jst-applications
*/

jst.AppCrossroad.addMethod("enter:value:label:", "anObject newValue aString", "processing", 
	"\t| valueChanged |" +
	"\n\t(valueChanged := value ~= newValue)" +
	"\n\t\tifTrue: [" +
	"\n\t\t\tvalue := newValue." +
	"\n\t\t\tlabel := aString." +
	"\n\t\t\texits do: [:ex | ex reset]]" +
	"\n\t\tifFalse: [self start currentStop = self ifTrue: [" +
	"\n\t\t\t\"nothing changed\"" +
	"\n\t\t\t^ self]]." +
	"\n\tactiveExit := nil." +
	"\n\tself start currentStop: self activatePath." +
	"\n\tonEnter ifNotNil: [" +
	"\n\t\tonEnter valueWithPossibleArgs: { self. anObject. valueChanged}]",
	null, "2014-04-17T11:46:57Z", "mp"); //jst-applications

/*
jst.AppCrossroad.addMethod("toggle", "", "processing", 
	"\t| current |" +
	"\n\tself activeEntry == self start ifFalse: [" +
	"\n\t\t\"#toggle can be used only for the first level of crossroads\"" +
	"\n\t\t^ self]." +
	"\n\tcurrent := self currentStop." +
	"\n\t[current notNil and: [current activeEntry ~= self start]] whileTrue: [" +
	"\n\t\tcurrent := current activeEntry]." +
	"\n\tself == current ifTrue: [" +
	"\n\t\t^ self]." +
	"\n\t\"saving the current stop\"" +
	"\n\tcurrent ifNotNil: [" +
	"\n\t\tcurrent value: self currentStop]." +
	"\n\t\"activate self\"" +
	"\n\tself start activeExit: self." +
	"\n\tonEnter ifNotNil: [" +
	"\n\t\tonEnter valueWithPossibleArgument: self]." +
	"\n\tself start currentStop: (value ifNil: [self])");

jst.AppCrossroad.addMethod("toggle", "", "processing", 
	"\t| current |" +
	"\n\tself activeEntry == self start ifFalse: [" +
	"\n\t\t\"#toggle can be used only for the first level of crossroads\"" +
	"\n\t\t^ self]." +
	"\n\tcurrent := self currentStop." +
	"\n\t[current notNil and: [current activeEntry ~= self start]] whileTrue: [" +
	"\n\t\tcurrent := current activeEntry]." +
	"\n\tself == current ifTrue: [" +
	"\n\t\t^ self]." +
	"\n\t\"saving the current stop\"" +
	"\n\tcurrent ifNotNil: [" +
	"\n\t\tcurrent value: self currentStop]." +
	"\n\t\"activate self\"" +
	"\n\tself start activeExit: self." +
	"\n\tonEnter ifNotNil: [" +
	"\n\t\tonEnter valueWithPossibleArgument: self]." +
	"\n\tself start currentStop: (value ifNil: [self])." +
	"\n\tvalue ifNotNil: [" +
	"\n\t\t[value pathActivated] delayed: 10]",
	null, "2013-04-30T09:50:21Z", "mp");
*/

jst.AppCrossroad.addMethod("switchPath", "", "processing", 
	"\t| p |" +
	"\n\tentries size = 1 ifFalse: [" +
	"\n\t\tself error: 'Cannot switch path.']." +
	"\n\tentries first" +
	"\n\t\tactiveExit: self." +
	"\n\tp := self." +
	"\n\t[p activeExit notNil] whileTrue: [" +
	"\n\t\tp := p activeExit]." +
	"\n\tself start currentStop: p activatePath",
	null, "2013-01-20T21:20:06Z", "mp", 1);

jst.AppCrossroad.addMethod("switchPath", "", "processing", 
	"\tentries size = 1 ifFalse: [" +
	"\n\t\tself error: 'Cannot switch path.']." +
	"\n\tentries first activeExit = self ifFalse: [" +
	"\n\t\t| p |" +
	"\n\t\tentries first activeExit: self." +
	"\n\t\tp := self." +
	"\n\t\t[p activeExit notNil] whileTrue: [" +
	"\n\t\t\tp := p activeExit]." +
	"\n\t\tself start currentStop: p activatePath]",
	null, "2013-01-20T22:25:33Z", "mp", 1);

jst.AppCrossroad.addMethod("switchPath", "", "processing", 
	"\tentries size = 1 ifFalse: [" +
	"\n\t\tself error: 'Cannot switch path.']." +
	"\n\tentries first activeExit = self ifFalse: [" +
	"\n\t\t| p |" +
	"\n\t\tentries first activeExit: self." +
	"\n\t\tp := self." +
	"\n\t\t[p activeExit notNil] whileTrue: [" +
	"\n\t\t\tp := p activeExit]." +
	"\n\t\tself start currentStop: p activatePath." +
	"\n\t\t[p pathActivated] delayed: 10]",
	null, "2013-04-30T09:50:38Z", "mp", 1);

jst.AppCrossroad.addMethod("switchPath", "", "processing", 
	"\tentries size = 1 ifFalse: [" +
	"\n\t\tself error: 'Cannot switch path.']." +
	"\n\tentries first activeExit = self ifFalse: [" +
	"\n\t\t| p |" +
	"\n\t\tentries first activeExit: self." +
	"\n\t\tp := self." +
	"\n\t\t[p activeExit notNil] whileTrue: [" +
	"\n\t\t\tp := p activeExit]." +
	"\n\t\tp activeExit: nil. \"see #enter:value:label:, but is it neccessary?\"" +
	"\n\t\tp activatePath." +
	"\n\t\tonEnter ifNotNil: [" +
	"\n\t\t\tonEnter valueWithPossibleArgument: { self. nil. false}]." +
	"\n\t\tself start currentStop: p." +
	"\n\t\t[p pathActivated] delayed: 10]",
	null, "2013-08-28T11:55:36Z", "mp", 1);

jst.AppCrossroad.addMethod("switchPath", "", "processing", 
	"\tself switchPathOn: nil",
	null, "2013-09-02T19:23:29Z", "mp"); //jst-applications

jst.AppCrossroad.addMethod("switchPathOn:", "anObject", "processing", 
	"\tentries size = 1 ifFalse: [" +
	"\n\t\tself error: 'Cannot switch path.']." +
	"\n\tentries first activeExit = self ifFalse: [" +
	"\n\t\t| p |" +
	"\n\t\tentries first activeExit: self." +
	"\n\t\tp := self." +
	"\n\t\t[p activeExit notNil] whileTrue: [" +
	"\n\t\t\tp := p activeExit]." +
	"\n\t\tp activatePath." +
	"\n\t\t(anObject notNil & onEnter notNil) ifTrue: [" +
	"\n\t\t\tonEnter valueWithPossibleArgument: { self. anObject. false}]." +
	"\n\t\tself start currentStop: p." +
	"\n\t\t[p pathActivated] delayed: 10]",
	null, "2013-09-02T19:37:53Z", "mp", 1);

jst.AppCrossroad.addMethod("switchPathOn:", "anObject", "processing", 
	"\tentries size = 1 ifFalse: [" +
	"\n\t\tself error: 'Cannot switch path.']." +
	"\n\tentries first activeExit = self ifFalse: [" +
	"\n\t\t| p |" +
	"\n\t\tentries first activeExit: self." +
	"\n\t\tp := self." +
	"\n\t\t[p activeExit notNil] whileTrue: [" +
	"\n\t\t\tp := p activeExit]." +
	"\n\t\tself start currentStop: p activatePath." +
	"\n\t\t[p pathActivated] delayed: 10]." +
	"\n\t\t(anObject notNil & onEnter notNil) ifTrue: [" +
	"\n\t\t\tonEnter valueWithPossibleArgument: { self. anObject. false}]",
	null, "2014-02-12T19:53:01Z", "mp"); //jst-applications

jst.AppCrossroad.addMethod("activatePath", "", "processing", 
	"\tsuper activatePath." +
	"\n\texits do: [:en | en activeEntry: self]",
	null, "2012-06-27T09:41:29Z", "mp");

jst.AppCrossroad.addMethod("activeExit:", "anAppPath", "private", 
	"\tactiveExit := anAppPath",
	null, "2012-06-25T07:56:20Z", "mp");

/*
jst.AppCrossroad.addMethod("reset", "", "processing", 
	"\tactiveExit := nil." +
	"\n\texits do: [:ex | ex reset]",
	null, "2012-06-27T09:42:37Z", "mp");
*/
jst.AppCrossroad.addMethod("reset", "", "processing", 
	"\tvalue := nil." +
	"\n\tactiveExit := nil." +
	"\n\texits do: [:ex | ex reset]",
	null, "2012-11-08T15:21:37Z", "mp");

jst.AppCrossroad.addMethod("addExit:", "anAppPath", "adding", 
	"\texits := exits copyWith: (anAppPath addEntry: self)",
	null, "2012-06-27T09:42:01Z", "mp");

jst.AppCrossroad.addMethod("onEnter:", "aBlock", "accessing", 
	"\tonEnter := aBlock",
	null, "2012-06-23T21:35:37Z", "mp");

jst.AppCrossroad.addMethod("link", "", "accessing", 
	"\t^ link",
	null, "2013-01-29T13:39:23Z", "mp");

jst.AppCrossroad.addMethod("link:", "anObject", "accessing", 
	"\tlink := anObject",
	null, "2013-01-29T13:39:48Z", "mp");

jst.AppCrossroad.addMethod("isStop", "", "testing", 
	"\t^ true",
	null, "2013-08-18T20:16:03Z", "mp");

//*** AppPathStart ***

jst.AppPathStart.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tlastId := 0." +
	"\n\ttrackHistory := false",
	null, "2013-08-10T08:41:46Z", "mp");

jst.AppPathStart.addMethod("addExit:", "anAppPath", "accessing", 
	"\tsuper addExit: anAppPath." +
	"\n\t(anAppPath allPaths add: anAppPath; yourself) do: [:ea |" +
	"\n\t\tlastId := lastId + 1." +
	"\n\t\tea id: lastId]",
	null, "2013-08-08T22:25:38Z", "mp", 1);

jst.AppPathStart.addMethod("addExit:", "anAppPath", "accessing", 
	"\tsuper addExit: anAppPath." +
	"\n\t(anAppPath allPaths add: anAppPath; yourself) select: [:ea | ea id isNil] thenDo: [:ea |" +
	"\n\t\tlastId := lastId + 1." +
	"\n\t\tea id: lastId]",
	null, "2013-09-06T15:10:28Z", "mp"); //jst-applications

jst.AppPathStart.addMethod("start", "", "accessing", 
	"\t^ self",
	null, "2012-06-22T20:29:39Z", "mp");

jst.AppPathStart.addMethod("activatePath", "", "processing", 
	"",
	null, "2012-06-27T09:34:16Z", "mp");

jst.AppPathStart.addMethod("currentStop", "", "accessing", 
	"\t^ currentStop",
	null, "2012-06-24T09:30:35Z", "mp");

jst.AppPathStart.addMethod("currentStop:", "anAppCrossroad", "accessing", 
	"\tcurrentStop := anAppCrossroad." +
	"\n\tonStopChange ifNotNil: [" +
	"\n\t\tonStopChange value: self]",
	null, "2012-06-25T06:54:04Z", "mp", 1);

jst.AppPathStart.addMethod("currentStop:", "anAppCrossroad", "accessing", 
	"\tcurrentStop := anAppCrossroad." +
	"\n\ttrackHistory ifTrue: [" +
	"\n\t\tself trackHistory]." +
	"\n\tonStopChange ifNotNil: [" +
	"\n\t\tonStopChange value: self]",
	null, "2013-08-10T14:10:14Z", "mp", 2);

jst.AppPathStart.addMethod("currentStop:", "anAppCrossroad", "accessing", 
	"\tcurrentStop := anAppCrossroad." +
	"\n\ttrackHistory & skipHistory not ifTrue: [" +
	"\n\t\tself trackHistory]." +
	"\n\tonStopChange ifNotNil: [" +
	"\n\t\tonStopChange value: self]",
	null, "2013-08-20T11:30:56Z", "mp", 3);

jst.AppPathStart.addMethod("currentStop:", "anAppCrossroad", "accessing", 
	"\tcurrentStop := anAppCrossroad." +
	"\n\ttrackHistory & skipHistory not ifTrue: [" +
	"\n\t\tself trackHistory]." +
	"\n\tonStopChange ifNotNil: [" +
	"\n\t\tonStopChange valueWithPossibleArgs: { self. skipHistory}]",
	null, "2013-08-22T13:58:16Z", "mp", 4);

jst.AppPathStart.addMethod("currentStop:", "pathStop", "accessing", 
	"\tcurrentStop := pathStop." +
	"\n\ttrackHistory & skipHistory not & pathStop skipHistory not ifTrue: [" +
	"\n\t\tself trackHistory]." +
	"\n\tonStopChange ifNotNil: [" +
	"\n\t\tonStopChange valueWithPossibleArgs: { self. skipHistory | pathStop skipHistory}]",
	null, "2013-08-22T15:07:09Z", "mp", 5);

jst.AppPathStart.addMethod("currentStop:", "pathStop", "accessing", 
	"\tcurrentStop := pathStop." +
	"\n\ttrackHistory & skipHistory not & pathStop skipHistory not " +
	"\n\t\tifTrue: [self trackHistory]" +
	"\n\t\tifFalse: [self stopChanged]",
	null, "2013-08-22T21:07:43Z", "mp", 6);

jst.AppPathStart.addMethod("currentStop:", "pathStop", "accessing", 
	"\tcurrentStop := pathStop." +
	"\n\ttrackHistory ifFalse: [" +
	"\n\t\tself stopChanged]",
	null, "2014-02-12T20:34:22Z", "mp"); //jst-applications

jst.AppPathStart.addMethod("onStopChange:", "aBlock", "accessing", 
	"\tonStopChange := aBlock",
	null, "2012-06-25T06:53:07Z", "mp");

jst.AppPathStart.addMethod("stopChanged", "", "private", 
	"\tonStopChange ifNotNil: [" +
	"\n\t\tonStopChange valueWithPossibleArgument: self]",
	null, "2013-08-22T21:05:42Z", "mp");

jst.AppPathStart.addMethod("reset", "", "processing", 
	"\tsuper reset." +
	"\n\tself currentStop: self",
	null, "2012-06-26T11:31:33Z", "mp");

jst.AppPathStart.addMethod("savePath", "", "processing", 
	"\tsavedStop := currentStop",
	null, "2013-01-16T09:54:04Z", "mp");

/*
jst.AppPathStart.addMethod("restorePath", "", "processing", 
	"\tself currentStop: savedStop activatePath." +
	"\n\tsavedStop := nil",
	null, "2013-01-16T09:58:03Z", "mp");
*/
jst.AppPathStart.addMethod("restorePath", "", "processing", 
	"\tself currentStop: savedStop activatePath." +
	"\n\tsavedStop := nil." +
	"\n\t[self currentStop pathActivated] delayed: 10",
	null, "2013-04-30T09:49:54Z", "mp");

jst.AppPathStart.addMethod("pathActivated", "", "private", 
	"",
	null, "2013-04-30T09:20:10Z", "mp");

jst.AppPathStart.addMethod("changeHistory:with:", "aBlock path", "private", 
	"\ttrackHistory := true." +
	"\n\taBlock valueWithPossibleArgument: path." +
	"\n\ttrackHistory := false.",
	null, "2013-08-10T08:41:33Z", "mp", 1);

jst.AppPathStart.addMethod("changeHistory:with:", "aBlock path", "private", 
	"\ttrackHistory := skipHistory not & path skipHistory not." +
	"\n\taBlock valueWithPossibleArgument: path." +
	"\n\ttrackHistory ifTrue: [" +
	"\n\t\ttrackHistory := false." +
	"\n\t\tself trackHistory]",
	null, "2014-02-12T20:38:25Z", "mp"); //jst-applications

jst.AppPathStart.addMethod("trackHistory", "", "processing", 
	"\tself stopChanged",
	null, "2013-08-22T21:46:00Z", "mp");

/* viz AppPathToken class>>on:
jst.AppPathStart.addMethod("activePathToken", "", "accessing", 
	"\t| next |" +
	"\n\tnext := self activeExit." +
	"\n\t^ String streamContents: [:s |" +
	"\n\t\t[next notNil] whileTrue: [" +
	"\n\t\t\ts isEmpty ifFalse: [" +
	"\n\t\t\t\ts nextPut: $|]." +
	"\n\t\t\ts nextPutAll: next id asString." +
	"\n\t\t\tnext value ifString: [" +
	"\n\t\t\t\ts nextPut: $:; nextPutAll: next value]." +
	"\n\t\t\tnext := next activeExit" +
	"\n\t\t]" +
	"\n\t]",
	null, "2013-08-09T13:28:48Z", "mp", 1);

jst.AppPathStart.addMethod("activePathToken", "", "accessing", 
	"\t| next |" +
	"\n\tnext := self activeExit." +
	"\n\t^ String streamContents: [:s |" +
	"\n\t\t[next notNil] whileTrue: [" +
	"\n\t\t\ts isEmpty ifFalse: [" +
	"\n\t\t\t\ts nextPut: $|]." +
	"\n\t\t\ts nextPutAll: next id asString." +
	"\n\t\t\tnext value isString | next value isNumber ifTrue: [" +
	"\n\t\t\t\ts nextPut: $:; nextPutAll: next value asString]." +
	"\n\t\t\tnext := next activeExit" +
	"\n\t\t]" +
	"\n\t]",
	null, "2013-08-20T15:17:36Z", "mp"); //jst-applications
*/

jst.AppPathStart.addMethod("forcePath:", "pathToken", "processing", 
	"\t| stops i p |" +
	"\n\tstops := pathToken findTokens: '|'." +
	"\n\ti := 1." +
	"\n\tp := self." +
	"\n\t[i <= stops size & p notNil] whileTrue: [ | id next |" +
	"\n\t\tid := (stops at: i) copyUpTo: $:." +
	"\n\t\tnext := p exits detect: [:ea | ea id asString = id] ifNone: [p := nil]." +
	"\n\t\tnext ifNotNil: [ | val |" +
	"\n\t\t\tval := (stops at: i) copyAfter: $:." +
	"\n\t\t\tval ifEmpty: [val := nil]." +
	"\n\t\t\tnext forceStop: val." +
	"\n\t\t\tp := p activeExit]." +
	"\n\t\ti := i + 1" +
	"\n\t]",
	null, "2013-08-15T21:07:32Z", "mp", 1);

jst.AppPathStart.addMethod("forcePath:", "pathToken", "processing", 
	"\t| stops i p |" +
	"\n\tstops := pathToken findTokens: '|'." +
	"\n\ti := 1." +
	"\n\tp := self." +
	"\n\t[i <= stops size & p notNil] whileTrue: [ | id next |" +
	"\n\t\tid := (stops at: i) copyUpTo: $:." +
	"\n\t\tnext := p exits detect: [:ea | ea id asString = id] ifNone: [p := nil]." +
	"\n\t\tnext ifNotNil: [ | val |" +
	"\n\t\t\tval := (stops at: i) copyAfter: $:." +
	"\n\t\t\tval ifEmpty: [val := nil]." +
	"\n\t\t\tnext forceStop: val last: i = stops size ifAsync: [self forcePath: pathToken]." +
	"\n\t\t\tp := p activeExit]." +
	"\n\t\ti := i + 1" +
	"\n\t]",
	null, "2013-08-19T09:58:19Z", "mp", 2);

jst.AppPathStart.addMethod("forcePath:", "pathToken", "processing", 
	"\t| stops i p |" +
	"\n\tskipHistory := true." +
	"\n\t[" +
	"\n\t\tstops := pathToken findTokens: '|'." +
	"\n\t\ti := 1." +
	"\n\t\tp := self." +
	"\n\t\t[i <= stops size & p notNil] whileTrue: [ | id next |" +
	"\n\t\t\tid := (stops at: i) copyUpTo: $:." +
	"\n\t\t\tnext := p exits detect: [:ea | ea id asString = id] ifNone: [p := nil]." +
	"\n\t\t\tnext ifNotNil: [ | val |" +
	"\n\t\t\t\tval := (stops at: i) copyAfter: $:." +
	"\n\t\t\t\tval ifEmpty: [val := nil]." +
	"\n\t\t\t\tnext forceStop: val last: i = stops size ifAsync: [" +
	"\n\t\t\t\t\tself forcePath: pathToken]." +
	"\n\t\t\t\tp := p activeExit]." +
	"\n\t\t\ti := i + 1" +
	"\n\t\t]" +
	"\n\t] ensure: [skipHistory := false]",
	null, "2013-08-20T14:15:06Z", "mp", 3);

jst.AppPathStart.addMethod("forcePath:", "pathToken", "processing", 
	"\t| stops i p |" +
	"\n\tskipHistory := true." +
	"\n\t[" +
	"\n\t\tstops := pathToken findTokens: '|'." +
	"\n\t\ti := 1." +
	"\n\t\tp := self." +
	"\n\t\t[i <= stops size & p notNil] whileTrue: [ | nextId next |" +
	"\n\t\t\tnextId := (stops at: i) copyUpTo: $:." +
	"\n\t\t\tnext := p exits detect: [:ea | ea id asString = nextId] ifNone: [p := nil]." +
	"\n\t\t\tnext ifNotNil: [ | val |" +
	"\n\t\t\t\tval := (stops at: i) copyAfter: $:." +
	"\n\t\t\t\tval ifEmpty: [val := nil]." +
	"\n\t\t\t\tnext forceStop: val last: i = stops size ifAsync: [" +
	"\n\t\t\t\t\tself forcePath: pathToken]." +
	"\n\t\t\t\tp := p activeExit]." +
	"\n\t\t\ti := i + 1" +
	"\n\t\t]" +
	"\n\t] ensure: [" +
	"\n\t\tskipHistory := false." +
	"\n\t\tself pathForced]",
	null, "2013-08-22T21:31:37Z", "mp"); //jst-applications

jst.AppPathStart.addMethod("pathForced", "", "private", 
	"",
	null, "2013-08-22T21:45:00Z", "mp");

/*
jst.AppPathStart.addMethod("skipHistory", "", "accessing", 
	"\t^ skipHistory",
	null, "2014-02-12T17:06:57Z", "mp");
*/

jst.AppPathStart.addMethod("skipHistoryDuring:", "aBlock", "processing", 
	"\tskipHistory := true." +
	"\n\t[aBlock value] ensure: [" +
	"\n\t\tskipHistory := false]",
	null, "2013-08-21T14:54:21Z", "mp", 1);

jst.AppPathStart.addMethod("skipHistoryDuring:", "aBlock", "processing", 
	"\tskipHistory " +
	"\n\t\tifTrue: aBlock" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tskipHistory := true." +
	"\n\t\t\t[aBlock value] ensure: [" +
	"\n\t\t\t\tskipHistory := false]]",
	null, "2013-09-19T22:07:41Z", "mp"); //jst-applications

jst.AppPathStart.addMethod("stopTrackingHistory", "", "processing", 
	"\ttrackHistory := false",
	null, "2014-02-13T09:31:36Z", "mp");

//*** ApplicationState ***

jst.ApplicationState.addMethod("prefix:", "aString", "accessing", 
	"\tprefix := aString",
	null, "2012-06-13T10:54:30Z", "mp");

jst.ApplicationState.addMethod("prefix:", "aString", "accessing", 
	"\tprefix := aString." +
	"\n\t(prefix endsWith: $-) ifFalse: [" +
	"\n\t\tprefix := prefix, '-']",
	null, "2012-12-12T09:23:44Z", "mp");

jst.ApplicationState.addMethod("checkSelection:value:ifChanged:", "key value aBlock", "as yet unclassified", 
	"\t(self at: #selection) = value ifFalse: [" +
	"\n\t\tself at: #selection put: value." +
	"\n\t\tself at: key put: value." +
	"\n\t\taBlock value]",
	null, "2012-06-22T08:28:52Z", "mp");

jst.ApplicationState.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tself at: #selection put: nil",
	null, "2012-06-22T08:32:21Z", "mp");

/*
jst.ApplicationState.addMethod("userInfo:", "anObject", "accessing", 
	"\tuserInfo := anObject ifNotNil: [" +
	"\n\t\tanObject asDictionary" +
	"\n\t\t\tat: #timestamp put: DateAndTime now;" +
	"\n\t\t\tyourself]." +
	"\n\tuserInfo " +
	"\n\t\tifNotNil: [WebStorage session at: prefix, 'user-info' put: (JSON default encode: userInfo)]" +
	"\n\t\tifNil: [WebStorage session removeKey: prefix, 'user-info' ifAbsent: nil]",
	null, "2012-12-12T09:23:05Z", "mp");

jst.ApplicationState.addMethod("userInfo", "", "accessing", 
	"\t^ userInfo ifNil: [" +
	"\n\t\tWebStorage session at: prefix, 'user-info' ifPresent: [:u |" +
	"\n\t\t\tuserInfo := JSON default decode: u]]",
	null, "2012-12-12T09:15:58Z", "mp");
*/

// *** AppPathToken ***

jst.AppPathToken._class.addMethod("on:", "path", "instance creation", 
	"\t| token next |" +
	"\n\t\"token on active path\"" +
	"\n\ttoken := self new." +
	"\n\tnext := path start activeExit." +
	"\n\t[next notNil] whileTrue: [" +
	"\n\t\ttoken addPath: next with: next value." +
	"\n\t\tnext := next activeExit]." +
	"\n\t^ token",
	null, "2014-03-17T13:14:56Z", "mp");

jst.AppPathToken.addMethod("initialize", "", "initialization", 
	"\tpaths := OrderedCollection new",
	null, "2014-03-17T13:00:06Z", "mp");

jst.AppPathToken.addMethod("isEmpty", "", "testing", 
	"\t^ paths isEmpty",
	null, "2014-03-17T13:00:11Z", "mp");

jst.AppPathToken.addMethod("addPath:with:", "path value", "accessing", 
	"\tpaths add: path id -> value",
	null, "2014-03-17T13:00:46Z", "mp");

jst.AppPathToken.addMethod("printOn:", "aStream", "printing", 
	"\tpaths do: [:asc |" +
	"\n\t\taStream isEmpty ifFalse: [" +
	"\n\t\t\taStream nextPut: $|]." +
	"\n\t\taStream nextPutAll: asc key asString." +
	"\n\t\tasc value isString | asc value isNumber ifTrue: [" +
	"\n\t\t\taStream " +
	"\n\t\t\t\tnextPut: $:; " +
	"\n\t\t\t\tnextPutAll: asc value asString]]",
	null, "2014-03-17T13:04:17Z", "mp");

jst.AppPathToken.addMethod("asUrl", "", "converting", 
	"\t^ Url new " +
	"\n\t\tfragment: self asString",
	null, "2014-03-17T13:08:03Z", "mp");

jst.AppPathToken.addMethod("add:", "path", "accessing", 
	"\tself addPath: path",
	null, "2014-03-17T13:33:57Z", "mp");

jst.AppPathToken.addMethod("addPath:", "path", "accessing", 
	"\tself addPath: path with: path value",
	null, "2014-03-17T13:28:56Z", "mp");
