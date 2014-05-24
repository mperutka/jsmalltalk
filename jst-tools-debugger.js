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
 * Depends on jst-debug, jst-tools
 *  
 */

jst.currentJsFile = "jst-tools-debugger";

jst.BrowserWindow.subclass("Debugger", "selfPanel ctxPanel lastSelection", "", "", "Tools-Debugger");

jst.Inspector.subclass("ContextVariablesInspector", "", "", "", "Tools-Debugger");

jst.MessageSetPanel.subclass("DebuggerMsgPanel", "", "", "", "Tools-Debugger");

jst.ExtPanel.subclass("DebuggerCodePanel", "editor lastSelection", "", "", "Tools-Debugger");

// AppDeployer

jst.AppDeployer._class.addMethod("initialize", "", "class initialization", 
	"\tSkipFiles := {" +
	"\n\t\tObject jsFileName. " +
	"\n\t\tJSObjectProxy jsFileName. " +
	"\n\t\tParser jsFileName." +
	"\n\t\tContextPart jsFileName. " +
	"\n\t\tDebugger jsFileName}",
	null, "2013-11-06T10:17:07Z", "mp");

jst.initializeClass(jst.AppDeployer);

// ToolSet

jst.ToolSet._class.addMethod("debugError:", "anError", "debugging", 
	"\t\"Handle an otherwise unhandled error\"" +
	"\n\tself default ifNil: [" +
	"\n\t\t^self inform: 'Cannot open Debugger' translated]." +
	"\n\t^ self default debugError: anError",
	null, "2011-12-14T15:31:30Z", "mp");


// StandardToolSet

jst.StandardToolSet._class.addMethod("debugError:", "anError", "debugging", 
	"\t\"Handle an otherwise unhandled error\"" +
	"\n\tDebugger openOn: anError",
	null, "2011-12-17T23:01:11Z", "mp");

// ContextPart

/*
 * nefukcni: vyjimka mimo jst kod zpusobuje zacykleni v prvnim vyrazu 
jst.ContextPart.addMethod("handleSignal:", "exception", "exceptions", function (exception){ 
	if (exception._isSmalltalkError != true)
		return jst.Error._new().signal_(exception);
	try {
		jst.ToolSet.debugError_(exception);
	} catch(ex) {
		console.log([exception, ex]);
	};
	jst.thisContext = jst.nil;
	throw exception;
},
	null, "2011-12-14T17:15:00Z", "mp");
*/

jst.ContextPart.addMethod("handleSignal:", "exception", "exceptions", function (exception){ 
	if (exception._isSmalltalkError != true) {
		exception = jst.Error.wrap_(exception);
		//zatim se zda nutne jako pojistka proti zacykleni v pripade js vyjimky
		jst.thisContext = jst.nil;
	};
	if (!jst.skipDebugger) {
		try {
			jst.ToolSet.debugError_(exception);
		} catch(ex) {
			//something went wrong
			console.log([exception, ex]);
			jst.thisContext = jst.nil;
			throw ex;
		}
	};
	jst.thisContext = jst.nil;
	throw exception;
},
	null, "2012-04-19T17:39:23Z", "mp", 1);

jst.ContextPart.addMethod("handleSignal:", "exception", "exceptions", function (exception){ 
	if (exception._isSmalltalkError != true)
		exception = jst.Error.wrap_(exception);
	jst.thisContext = jst.nil;
	if (!jst.skipDebugger) {
		try {
			jst.ToolSet.debugError_(exception);
			jst.thisContext = jst.nil;
		} catch(ex) {
			//something went wrong
			console.log([exception, ex]);
			jst.thisContext = jst.nil;
			throw ex;
		}
	};
	throw exception;
},
	null, "2013-10-16T08:04:33Z", "mp"); //jst-tools-debugger

//*** ContextVariablesInspector ***

jst.ContextVariablesInspector._class.addMethod("inspect:", "anObject", "instance creation", 
	"\t^ self basicNew inspect: anObject",
	null, "2012-01-11T22:25:19Z", "mp");

jst.ContextVariablesInspector.addMethod("fieldList", "", "accessing", 
	"\t^ object " +
	"\n\t\tifNil: [Array with: 'thisContext']" +
	"\n\t\tifNotNil: [{'thisContext'. 'all temp vars'}, object tempNames]",
	null, "2012-01-05T07:51:57Z", "mp");

jst.ContextVariablesInspector.addMethod("selection", "", "selecting", 
	"\tselectionIndex = 0 ifTrue:[" +
	"\n\t\t^ '']." +
	"\n\tselectionIndex = 1 ifTrue: [" +
	"\n\t\t^ object]." +
	"\n\tselectionIndex = 2 ifTrue: [" +
	"\n\t\t^ object tempsAndValues]." +
	"\n\t^ object tempAt: selectionIndex - 2",
	null, "2012-01-06T08:42:46Z", "mp");

//*** DebuggerMsgPanel ***

jst.DebuggerMsgPanel.addMethod("buildActions", "", "initialization", 
	"\tsuper buildActions." +
	"\n\tremoveAction isDisabled: true",
	null, "2013-06-06T10:22:20Z", "mp");

/*
jst.DebuggerMsgPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tactions := actions copyUpToLast: nil",
	null, "2012-01-30T13:08:10Z", "mp");
*/

jst.DebuggerMsgPanel.addMethod("selectedMethod", "", "accessing", 
	"\t^ self selectedItem method",
	null, "2012-01-30T10:45:52Z", "mp");

jst.DebuggerMsgPanel.addMethod("currentClass", "", "accessing", 
	"\t^ self selectedItem method ifNotNilDo: [:m | m receiver]",
	null, "2012-02-07T13:29:38Z", "mp");

/*
jst.DebuggerMsgPanel.addMethod("clickEvent", "", "events", 
	"\t^ [:node :ev | self changed: #context with: node link]",
	null, "2011-12-15T20:56:07Z", "mp");

jst.DebuggerMsgPanel.addMethod("nodeselectionchangeEvent", "", "events", 
	"\t^ [:model :node | self changed: #context with: node link]",
	null, "2011-12-15T20:56:59Z", "mp");
*/

jst.DebuggerMsgPanel.addMethod("itemSelected:", "ctx", "updating", 
	"\tself changed: #context with: ctx." +
	"\n\tverAction isDisabled: (ctx method isNil or: [ctx method priorVersion isNil])",
	null, "2013-06-06T10:14:27Z", "mp");

// *** DebuggerCodePanel ***

jst.DebuggerCodePanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tself " +
	"\n\t\twithFitLayout;" +
	"\n\t\tadd: (editor := CodeEditor new border: false)",
	null, "2012-01-03T22:05:35Z", "mp");

/*
jst.DebuggerCodePanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tlastSelection = anObject ifTrue: [" +
	"\n\t\t^ self]." +
	"\n\tlastSelection := anObject." +
	"\n\tanAspect = #context ifTrue: [" +
	"\n\t\teditor mode: (lastSelection method ifNil: #smalltalk)." +
	"\n\t\teditor resetContents: lastSelection methodSource]",
	null, "2012-01-06T14:07:23Z", "mp");

jst.DebuggerCodePanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tlastSelection = anObject ifTrue: [" +
	"\n\t\t^ self]." +
	"\n\tlastSelection := anObject." +
	"\n\tanAspect = #context ifTrue: [" +
	"\n\t\teditor mode: (anObject method ifNil: #smalltalk)." +
	"\n\t\teditor resetContents: anObject methodSource." +
	"\n\t\t(anObject class == BlockContext and: [anObject block notNil]) ifTrue: [" +
	"\n\t\t\teditor highlightText: anObject block asString]]",
	null, "2013-10-11T14:25:11Z", "mp"); //jst-tools-debugger
*/
jst.DebuggerCodePanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tlastSelection = anObject ifTrue: [" +
	"\n\t\t^ self]." +
	"\n\tlastSelection := anObject." +
	"\n\tanAspect = #context ifTrue: [" +
	"\n\t\teditor mode: (anObject method ifNil: #smalltalk)." +
	"\n\t\teditor resetContents: anObject methodSource." +
	"\n\t\t[anObject markSenderIn: editor] on: Error do: [:err | " +
	"\n\t\t\tConsole log: err]]",
	null, "2013-10-15T21:03:48Z", "mp");

jst.DebuggerCodePanel.addMethod("editor", "", "accessing", 
	"\t^ editor",
	null, "2012-01-24T09:09:34Z", "mp");

// *** Debugger ***

/*
jst.Debugger.addMethod("buildPanels", "", "initialization", 
	"\tself closable: true;" +
	"\n\t\twidth: 700;" +
	"\n\t\tminWidth: 500;" +
	"\n\t\theight: 500;" +
	"\n\t\tminHeight: 300;" +
	"\n\t\tplain: true;" +
	"\n\t\twithBorderLayout;" +
	"\n\t\tadd: (methodPanel := DebuggerMsgPanel new border: false; height: 200; region: (ExtSplitRegion north minHeight: 120));" +
	"\n\t\tadd: (ExtPanel new border: false; region: ExtSplitRegion center; withFitLayout;" +
	"\n\t\t\tadd: (codePanel := DebuggerCodePanel new);" +
	"\n\t\t\tyourself)",
	null, "2011-12-19T09:42:05Z", "mp");

jst.Debugger.addMethod("buildPanels", "", "initialization", 
	"\tself closable: true;" +
	"\n\t\twidth: 700;" +
	"\n\t\tminWidth: 500;" +
	"\n\t\theight: 500;" +
	"\n\t\tminHeight: 300;" +
	"\n\t\tplain: true;" +
	"\n\t\twithBorderLayout;" +
	"\n\t\tadd: (methodPanel := DebuggerMsgPanel new border: false; height: 180; region: (ExtSplitRegion north minHeight: 120));" +
	"\n\t\tadd: (codePanel := DebuggerCodePanel new region: (ExtSplitRegion center minHeight: 120));" +
	"\n\t\tadd: (inspectorPanel := ExtPanel new height: 100; region: (ExtSplitRegion south minHeight: 80); border: false; withBorderLayout;" +
	"\n\t\t\tadd: (ExtPanel new width: 345; region: (ExtSplitRegion west minWidth: 200); border: false);" +
	"\n\t\t\tadd: (ExtPanel new region: (ExtSplitRegion center minWidth: 200); border: false);" +
	"\n\t\t\tyourself)",
	null, "2011-12-30T09:55:45Z", "mp");
*/
jst.Debugger.addMethod("buildPanels", "", "initialization", 
	"\tself closable: true;" +
	"\n\t\twidth: 700;" +
	"\n\t\tminWidth: 500;" +
	"\n\t\theight: 500;" +
	"\n\t\tminHeight: 300;" +
	"\n\t\tplain: true;" +
	"\n\t\twithBorderLayout;" +
	"\n\t\tborder: false;" +
	"\n\t\tadd: (methodPanel := DebuggerMsgPanel new height: 180; region: (ExtSplitRegion north minHeight: 120));" +
	"\n\t\tadd: (codePanel := DebuggerCodePanel new region: (ExtSplitRegion center minHeight: 120));" +
	"\n\t\tadd: (ExtPanel new height: 100; region: (ExtSplitRegion south minHeight: 80); border: false; withBorderLayout;" +
	"\n\t\t\tadd: (selfPanel := InspectorPanel new width: 345; region: (ExtSplitRegion west minWidth: 200));" +
	"\n\t\t\tadd: (ctxPanel := InspectorPanel new region: (ExtSplitRegion center minWidth: 200));" +
	"\n\t\t\tyourself)",
	null, "2012-01-03T22:05:13Z", "mp");

jst.Debugger.addMethod("installDependents", "", "initialization", 
	"\tmethodPanel" +
	"\n\t\taddDependent: codePanel",
	null, "2011-12-16T21:40:32Z", "mp");

jst.Debugger.addMethod("selectObject:", "anError", "initialization", 
	"\t| nodes ctx |" +
	"\n\tself title: anError description." +
	"\n\tnodes := OrderedCollection new." +
	"\n\tctx := anError signalerContext." +
	"\n\t[ctx notNil] whileTrue: [" +
	"\n\t\tnodes add: (ExtTreeNode new text: ctx printString; leaf: true; link: ctx)." +
	//"\n\t\tConsole log: ctx printString." +
	"\n\t\tctx := ctx sender]." +
	"\n\tmethodPanel root: (ExtTreeNode new children: nodes)." +
	"\n\tmethodPanel selectionModel selectNode: nodes first" +
	"\n\t",
	null, "2011-12-19T09:27:13Z", "mp");

jst.Debugger.addMethod("installDependents", "", "initialization", 
	"\tmethodPanel" +
	"\n\t\taddDependent: codePanel;" +
	"\n\t\taddDependent: self",
	null, "2012-01-04T22:05:30Z", "mp");

jst.Debugger.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tlastSelection = anObject ifTrue: [" +
	"\n\t\t^ self]." +
	"\n\tlastSelection := anObject." +
	"\n\tanAspect = #context ifTrue: [" +
	"\n\t\tselfPanel setModel: (Inspector inspect: anObject receiver)." +
	"\n\t\tctxPanel setModel: (ContextVariablesInspector inspect: anObject)]",
	null, "2012-01-11T22:25:45Z", "mp");
