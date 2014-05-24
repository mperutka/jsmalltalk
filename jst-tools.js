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
 *  Depends on jst-core, jst-parser, jst-kernel, jst-system, jst-codemirror, jst-ext, jst-files
 *  
 */

jst.currentJsFile = "jst-tools";

jst.Object.subclass("StandardToolSet", "", "", "", "Tools-Base");
jst.AppRegistry.subclass("SystemBrowser", "", "", "", "Tools-Base");

jst.ExtPanel.subclass("BrowserCodePanel", 
	"codeEditor toolBar commentPanel browseAction sendersAction implAction verAction inherAction hierAction instVarsAction classVarsAction srcBtn lastSelection theClass", 
	"", "", "Tools-Browser");
		
jst.ExtTreePanel.subclass("BrowserTreePanel", "lastSelection activeEditor", "", "", "Tools-Browser");

jst.BrowserTreePanel.subclass("ClassCategoryPanel", "", "", "", "Tools-Browser");
jst.BrowserTreePanel.subclass("ClassTreePanel", "", "", "", "Tools-Browser");
jst.BrowserTreePanel.subclass("MethodCategoryPanel", "", "", "", "Tools-Browser");
jst.BrowserTreePanel.subclass("MessageSetPanel", "verAction removeAction", "", "", "Tools-Browser");

jst.MessageSetPanel.subclass("MethodPanel", "theClass", "", "", "Tools-Browser");

jst.ExtPanel.subclass("ClassPanel", "tree instBtn helpBtn classBtn lastSelection hierarchyMode", "", "", "Tools-Browser");

jst.ExtWindow.subclass("BrowserWindow", "methodPanel codePanel", "", "", "Tools-Browser");

jst.BrowserWindow.subclass("MessageSet", "autoSelectString", "", "", "Tools-Browser");

jst.BrowserWindow.subclass("ClassBrowser", "defaultTitle classPanel methodCategoryPanel lastSelection", "", "", "Tools-Browser");

jst.ExtTreePanel.subclass("MessageNamesPanel", "", "", "", "Tools-Browser");

jst.BrowserWindow.subclass("MessageNames", "searchField searchPanel selectorsPanel selection", "", "", "Tools-Browser");

jst.MessageSet.subclass("VersionsBrowser", "diffs compare revert", "", "", "Tools-Browser");

jst.ClassBrowser.subclass("HierarchyBrowser", "catPanel", "", "", "Tools-Browser");

jst.ClassBrowser.subclass("JSTSystemBrowser", "classCategoryPanel", "", "", "Tools-Browser");

//jst.ExtPanel.subclass("CodeEditorX", "editing menu el mode silent startValue", "", "", "Tools-Base");

//CodeEditor zavisi na jst-codemirror
jst.ExtPanel.subclass("CodeEditor", "editing ed object", "", "", "Tools-Base");

jst.CodeEditor.subclass("BrowserCodeEditor", 
	"lastSelection theClass methodCategory changedMethod autoselect", "", "", "Tools-Browser");

jst.Object.subclass("Inspector", "object selectionIndex contents baseFieldList", "", "", "Tools-Inspector");

jst.Inspector.subclass("CollectionInspector", "size", "", "", "Tools-Inspector");

jst.Inspector.subclass("DictionaryInspector", "keyArray", "", "", "Tools-Inspector");

jst.DictionaryInspector.subclass("ProxyInspector", "", "", "", "Tools-Inspector");

jst.CodeEditor.subclass("InspectorEditor", "", "", "", "Tools-Inspector");

jst.ExtTreePanel.subclass("InspectorFieldPanel", "", "", "", "Tools-Inspector");

jst.ExtPanel.subclass("InspectorPanel", "model fieldPanel valuePanel", "", "", "Tools-Inspector");

jst.ExtWindow.subclass("InspectorBrowser", "inspectPanel evalPanel updater", "", "", "Tools-Inspector");

jst.ExtWindow.subclass("ChangesViewer", "editor resetBtn rebuildBtn", "", "", "Tools-Base");
/*
jst.ExtMenu.subclass("BrowserMenu", "panel", "ItemLabels Icons", "", "Tools-Base");

jst.ExtMenu.subclass("VarMenu", "theClass action", "", "", "Tools-Base");
*/
jst.ExtAction.subclass("BrowseAction", "", "", "", "Tools-Actions");
jst.ExtAction.subclass("BrowseHierarchyAction", "", "", "", "Tools-Actions");
jst.ExtAction.subclass("InspectAction", "", "", "", "Tools-Actions");
jst.ExtAction.subclass("ClassRefsAction", "", "", "", "Tools-Actions");
jst.ExtAction.subclass("AddClassCategoryAction", "", "", "", "Tools-Actions");
jst.ExtAction.subclass("FindClassAction", "", "", "", "Tools-Actions");
jst.ExtAction.subclass("CopyClassAction", "", "", "", "Tools-Actions");
jst.ExtAction.subclass("AddMethodCategoryAction", "", "", "", "Tools-Actions");
jst.ExtAction.subclass("BrowseSendersAction", "", "", "", "Tools-Actions");
jst.BrowseSendersAction.subclass("BrowseImplementorsAction", "", "", "", "Tools-Actions");
jst.ExtAction.subclass("InheritanceAction", "", "", "", "Tools-Actions");
jst.ExtAction.subclass("MethodVersionsAction", "", "", "", "Tools-Actions");

jst.ExtAction.subclass("ClassInstancesAction", "", "", "", "Tools-Actions");
jst.ClassInstancesAction.subclass("ClassSubInstAction", "", "", "", "Tools-Actions");

jst.ExtAction.subclass("InstVarRefsAction", "action", "", "", "Tools-Actions");
jst.InstVarRefsAction.subclass("ClassVarRefsAction", "", "", "", "Tools-Actions");
jst.ExtAction.subclass("ClassVariablesAction", "", "", "", "Tools-Actions");

jst.ExtAction.subclass("RemoveAction", "", "", "", "Tools-Actions");
jst.RemoveAction.subclass("RemoveClassCategoryAction", "", "", "", "Tools-Actions");
jst.RemoveAction.subclass("RemoveClassAction", "", "", "", "Tools-Actions");
jst.RemoveAction.subclass("RemoveMethodCategoryAction", "", "", "", "Tools-Actions");
jst.RemoveAction.subclass("RemoveMethodAction", "", "", "", "Tools-Actions");

jst.ExtAction.subclass("RenameAction", "", "", "", "Tools-Actions");
jst.RenameAction.subclass("RenameClassCategoryAction", "", "", "", "Tools-Actions");
jst.RenameAction.subclass("RenameClassAction", "", "", "", "Tools-Actions");
jst.RenameAction.subclass("RenameMethodCategoryAction", "", "", "", "Tools-Actions");

jst.ExtAction.subclass("CategorizeMethodAction", "", "", "", "Tools-Actions");
jst.ExtAction.subclass("RemoveEmptyCategoriesAction", "", "", "", "Tools-Actions");

jst.ExtAction.subclass("OverrideMethodAction", "", "", "", "Tools-Actions");

jst.SimpleAction.subclass("EditorAction", "", "", "", "Tools-Base");

jst.ExtAction.subclass("WinMgrAction", "", "", "", "Tools-Actions");

jst.Object.subclass("EditorActions", "editor menu ok cancel find findNext findPrev undo redo doIt printIt inspectIt", "", "", "Tools-Base");

jst.ExtWindow.subclass("Workspace", "editor closing", "", "", "Tools-Base");

jst.Object.subclass("WorkspaceVars", "", "", "", "Tools-Base");

jst.Object.subclass("JSmalltalkIDE", "startBtn", "", "", "Tools-Base");

jst.Object.subclass("AppDeployer", "classes selectors methods classMethods fileStream classScan packages basePackages skipPackages", "SkipFiles", "", "Tools-Base");

// extensions

jst.Class.addMethod("packageName", "", "*tools", 
	"\t^ category name",
	null, "2013-11-07T07:46:06Z", "mp");

jst.Metaclass.addMethod("packageName", "", "*tools", 
	"\t^ thisClass packageName",
	null, "2013-11-07T08:00:23Z", "mp");

jst.Method.addMethod("packageName", "", "*tools", 
	"\t^ category name first = $* " +
	"\n\t\tifTrue: [category name allButFirst]" +
	"\n\t\tifFalse: [receiver packageName]",
	null, "2013-11-07T07:48:05Z", "mp");

//*** StandardToolSet ***

jst.StandardToolSet._class.addMethod("browse:", "anObject", "browsing", 
	"\t\"Open a browser\"" +
	"\n\t^ SystemBrowser default openOn: anObject",
	null, "2011-09-22T09:17:10Z", "mp");

jst.StandardToolSet._class.addMethod("initialize", "", "class initialization", 
	"\tToolSet register: self",
	null, "2011-09-22T09:49:25Z", "mp");

jst.StandardToolSet._class.addMethod("browseMessageSet:name:autoSelect:", "messageList title autoSelectString", "browsing", 
	"\t\"Open a message set browser\"" +
	"\n\t^ MessageSet" +
	"\n\t\topenMessageList: messageList " +
	"\n\t\tname: title " +
	"\n\t\tautoSelect: autoSelectString",
	null, "2011-09-26T21:45:16Z", "mp");

jst.StandardToolSet._class.addMethod("browseHierarchy:", "anObject", "browsing", 
	"\t\"Open a hierarchy browser\"" +
	"\n\tanObject ifNotNil: [" +
	"\n\t\tHierarchyBrowser openOn: anObject]",
	null, "2011-10-13T08:44:22Z", "mp");

jst.StandardToolSet._class.addMethod("inspect:", "anObject", "inspecting", 
	"\t\"Open an inspector on the given object.\"" +
	"\n\t^ InspectorBrowser openOn: anObject",
	null, "2012-01-01T17:11:05Z", "mp");

jst.StandardToolSet._class.addMethod("inspect:label:", "anObject aString", "inspecting", 
	"\t^ InspectorBrowser openOn: anObject withLabel: aString",
	null, "2012-01-23T20:20:18Z", "mp");

jst.StandardToolSet._class.addMethod("browseVersionsForClass:selector:", "aClass aSelector", "browsing", 
	"\t^ (VersionsBrowser " +
	"\n\t\topenMessageList: (aClass lookupSelector: aSelector) versions" +
	"\n\t\tname: 'Recent versions of ' , aClass name, '>>', aSelector" +
	"\n\t\tautoSelect: nil) ifNotNilDo: [:win |" +
	"\n\t\t\twin saveAs: 'browseVersionsForClass:selector:' with: {aClass. aSelector}]",
	null, "2013-06-03T19:33:59Z", "mp");

jst.initializeClass(jst.StandardToolSet);

// *** BrowserTreePanel ***

jst.BrowserTreePanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tself autoScroll: true;" +
	"\n\t\tanimate: false;" +
	"\n\t\tcontainerScroll: true;" +
	"\n\t\tborder: true;" +
	"\n\t\trootVisible: false;" +
	"\n\t\troot: self defaultRoot",
	null, "2012-02-14T10:45:28Z", "mp");

jst.BrowserTreePanel.addMethod("defaultRoot", "", "accessing", 
	"\t^ ExtTreeNode new \"text: 'root';\" children: #()",
	null, "2011-11-07T21:35:54Z", "mp");
	
jst.BrowserTreePanel.addMethod("reset", "", "initialization", "\tself root: self defaultRoot");
	
jst.BrowserTreePanel.addMethod("codeEditing:", "editor", "updating", 
	"\t\"editor notNil -> start of editing, editor isNil -> end of editing\"" +
	"\n\tactiveEditor := editor." +
	"\n\tself isDisabled: editor notNil");

//*** ClassCategoryPanel ***

//	jst.ClassCategoryPanel.addMethod("initialize", "", "init", "\tsuper initialize. self on: #click do: [:node | self rootContainer classPanel category: node link]");

jst.ClassCategoryPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tactions := {" +
	"\n\t\tFindClassAction on: #rootContainer of: self." +
	"\n\t\tnil." +
	"\n\t\tBrowseAction on: #selectedItem of: self." +
	"\n\t\tnil." +
	"\n\t\tAddClassCategoryAction target: self." +
	"\n\t\tRenameClassCategoryAction on: #selectedItem of: self." +
	"\n\t\tRemoveClassCategoryAction on: #selectedItem of: self" +
	"\n\t}",
	null, "2012-01-30T16:00:45Z", "mp");

jst.ClassCategoryPanel.addMethod("defaultRoot", "", "accessing", 
	"\t^ ExtTreeNode new \"text: 'Category';\" children: self categoryNodes",
	null, "2011-11-07T21:40:38Z", "mp");

jst.ClassCategoryPanel.addMethod("categoryNodes", "", "accessing", 
	"\t| catNodes |" +
	"\n\tcatNodes := SortedCollection new." +
	"\n\t(Smalltalk at: #categories) do: [:cat |" +
	"\n\t\tcatNodes add: (ExtTreeNode new text: cat name; leaf: true; iconCls: #package; link: cat)]." +
	"\n\t^ catNodes",
	null, "2012-02-14T14:17:01Z", "mp");

jst.ClassCategoryPanel.addMethod("clickEvent", "", "events", 
	"\t^ [:node :ev | self changed: #classCategory with: node link]"); 

jst.ClassCategoryPanel.addMethod("nodeselectionchangeEvent", "", "events", 
	"\t^ [:model :node | self changed: #classCategory with: node link]"); 

//*** ClassTreePanel ***

jst.ClassTreePanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tactions := {" +
	"\n\t\tBrowseAction on: #selectedItem of: self." +
	"\n\t\tBrowseHierarchyAction on: #selectedItem of: self." +
	"\n\t\tnil." +
	"\n\t\tInstVarRefsAction on: #selectedItem of: self." +
	"\n\t\tClassVarRefsAction on: #selectedItem of: self." +
	"\n\t\tClassVariablesAction on: #selectedItem of: self." +
	"\n\t\tClassRefsAction on: #selectedItem of: self." +
	"\n\t\tnil." +
	"\n\t\tRenameClassAction on: #selectedItem of: self." +
	"\n\t\tCopyClassAction on: #selectedItem of: self." +
	"\n\t\tRemoveClassAction on: #selectedItem of: self." +
	"\n\t\tnil." +
	"\n\t\tClassInstancesAction on: #selectedItem of: self." +
	"\n\t\tClassSubInstAction on: #selectedItem of: self." +
	"\n\t}",
	null, "2013-02-21T08:54:56Z", "mp");

//*** ClassPanel ***

jst.ClassPanel.addMethod("initialize", "", "initialization", 
	"\t| groupId |" +
	"\n\tsuper initialize." +
	"\n\thierarchyMode := false." +
	"\n\tgroupId := Ext nextId." +
	"\n\tself border: false; withBorderLayout;" +
	"\n\t\tadd: (tree := ClassTreePanel new region: ExtRegion center; withFitLayout);" +
	"\n\t\tadd: (ExtPanel new region: ExtRegion south; height: 30; layout: (ExtHBoxLayout new withStretchAlign; padding: 3);" +
	"\n\t\t\tadd: (instBtn := ExtButton new flex: 2; text: 'Instance' translated; toggleGroup: groupId; allowDepress: false; bePressed);" +
	"\n\t\t\tadd: (helpBtn := ExtButton new flex: 1; text: '?'; toggleGroup: groupId; allowDepress: false; beDisabled);" +
	"\n\t\t\tadd: (classBtn := ExtButton new flex: 2; text: 'Class' translated; toggleGroup: groupId; allowDepress: false);" +
	"\n\t\t\tyourself)",
	null, "2012-04-12T15:01:30Z", "mp"); //jst-tools

jst.ClassPanel.addMethod("installListeners", "", "private", 
	"\tsuper installListeners." +
	"\n\ttree on: #click do: [:node :ev | self nodeSelected: node]." +
	"\n\ttree selectionModel on: #selectionchange do: [:model :node | self nodeSelected: node]." +
	"\n\t{instBtn. helpBtn. classBtn} do: [:btn |" +
	"\n\t\tself installListenersOn: btn prefix: #btn]");

jst.ClassPanel.addMethod("setHierarchyOn:selectNode:", "aClass aBlock", "accessing", 
	"\t| buildNode rootNode nodeClass selNode |" +
	"\n\thierarchyMode := true." +
	"\n\tbuildNode := [:cls | | ch | " +
	"\n\t\tch := SortedCollection new." +
	"\n\t\tcls == Class ifFalse: [" +
	"\n\t\t\tcls subclassesDo: [:c | ch add: (buildNode value: c)]]." +
	"\n\t\tExtTreeNode new text: cls name; leaf: ch isEmpty; link: cls; children: ch; iconCls: 'jst-class'" +
	"\n\t]." +
	"\n\trootNode := buildNode value: aClass theNonMetaClass." +
	"\n\tselNode := rootNode." +
	"\n\tnodeClass := aClass theNonMetaClass." +
	"\n\t[(nodeClass := nodeClass superclass) notNil] whileTrue: [" +
	"\n\t\trootNode := ExtTreeNode new text: nodeClass name; link: nodeClass; children: {rootNode}; iconCls: 'jst-class']." +
	"\n\ttree root: rootNode." +
	"\n\taClass isMeta ifTrue: [" +
	"\n\t\tclassBtn pressSilently]." +
	"\n\tselNode parentNode " +
	"\n\t\tifNotNil: [selNode parentNode addListener: (ExtDefaultListener new " +
	"\n\t\t\teventName: #expand; single: true; handler: [:rec | aBlock value: selNode])]" +
	"\n\t\tifNil: [aBlock value: selNode]." +
	"\n\ttree root expandAll." +
	"\n\tlastSelection := nodeClass",
	null, "2012-02-14T14:13:31Z", "mp");

jst.ClassPanel.addMethod("setCategory:", "category", "accessing", 
	"\t| classNodes |" +
	"\n\tclassNodes := SortedCollection new." +
	"\n\tcategory classes do: [:c |" +
	"\n\t\tclassNodes add: (ExtTreeNode new text: c name; leaf: true; iconCls: 'jst-class'; link: c)]." +
	"\n\ttree root: (ExtTreeNode new text: category name; children: classNodes)." +
	"\n\tlastSelection := category",
	null, "2012-02-14T14:09:21Z", "mp");

jst.ClassPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tlastSelection = anObject ifTrue: [" +
	"\n\t\t^ tree selectionModel clearSelections]." +
	"\n\tlastSelection := anObject." +
	"\n\tanAspect = #classCategory ifTrue: [" +
	"\n\t\tself setCategory: anObject]",
	null, "2011-10-08T20:15:53Z", "mp");

jst.ClassPanel.addMethod("nodeSelected:", "node", "action", 
	"\tself changed: #class with: (classBtn isPressed ifFalse: [node link] ifTrue: [node link class])",
	null, "2011-10-21T11:54:29Z", "mp");

jst.ClassPanel.addMethod("btntoggleEvent", "", "events", 
	"\t^ [:btn :pressed | tree selectionModel selectedNode ifNotNilDo: [:n | self nodeSelected: n]]", null, 
	"2011-09-14T15:10:13Z", "mp");

jst.ClassPanel.addMethod("btnclickEvent", "", "events", 
	"\t^ [:btn :ev | tree selectionModel selectedNode ifNotNilDo: [:n | " +
	"\n\t\tlastSelection := nil." +
	"\n\t\tself nodeSelected: n]].", null, 
	"2011-09-14T15:11:09Z", "mp");

jst.ClassPanel.addMethod("tree", "", "accessing", 
	"\t^ tree", null, 
	"2011-09-15T08:34:09Z", "mp");

jst.ClassPanel.addMethod("selectItem:", "anObject", "accessing", 
	"\ttree selectItem: anObject theNonMetaClass." +
	"\n\tclassBtn togglePressed: anObject isMeta",
	null, "2011-09-22T12:58:28Z", "mp");

jst.ClassPanel.addMethod("selectedItem", "", "accessing", 
	"\t^ tree selectedItem",
	null, "2012-02-06T16:07:02Z", "mp");

jst.ClassPanel.addMethod("codeEditing:", "editor", "updating", "\tself isDisabled: editor notNil");

jst.ClassPanel.addMethod("classModified:usingEditor:", "aClass ed", "updating", 
	"\t(hierarchyMode and: [lastSelection = aClass] and: [" +
	"\n\t\ttree selectionModel selectedNode parentNode link ~= aClass superclass ]) ifTrue: [" +
	"\n\t\t\"the superclass has been changed\"" +
	"\n\t\tself setHierarchyOn: aClass selectNode: [:node | " +
	"\n\t\t\tnode ensureVisible." +
	"\n\t\t\tnode selectSilently]]",
	null, "2011-10-14T22:27:26Z", "mp");

//*** MethodCategoryPanel ***

jst.MethodCategoryPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tactions := {" +
	"\n\t\tBrowseAction on: #selectedItem of: self." +
	"\n\t\tnil." +
	"\n\t\tAddMethodCategoryAction target: self." +
	"\n\t\tRenameMethodCategoryAction on: #selectedItem of: self." +
	"\n\t\tnil." +
	"\n\t\tRemoveMethodCategoryAction on: #selectedItem of: self." +
	"\n\t\tRemoveEmptyCategoriesAction target: [lastSelection]." +
	"\n\t\tnil." +
	"\n\t\tOverrideMethodAction target: self" +
	"\n\t}",
	null, "2012-02-08T13:50:13Z", "mp");

/*
jst.MethodCategoryPanel.addMethod("defaultRoot", "", "accessing", 
	"\t^ ExtTreeNode new text: '(select class)'; children: #()");
 */

jst.MethodCategoryPanel.addMethod("setClass:", "aClass", "accessing", 
	"\t| root |" +
	"\n\troot := ExtTreeNode new children: OrderedCollection new." +
	"\n\troot children add: (ExtTreeNode new text: '-- all --' translated; leaf: true; iconCls: #category)." +
	"\n\taClass methodCategories asSortedCollection do: [:mcat |" +
	"\n\t\troot children add: (ExtTreeNode new text: mcat name; iconCls: #category; link: mcat; leaf: true)]." +
	"\n\troot children size = 1 ifTrue: [" +
	"\n\t\troot children add: (ExtTreeNode new text: 'no messages' translated; leaf: true; iconCls: #category)]." +
	"\n\tself root: root." +
	"\n\tlastSelection := aClass",
	null, "2012-02-14T14:05:36Z", "mp");

jst.MethodCategoryPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tlastSelection = anObject ifTrue: [" +
	"\n\t\t^ self selectionModel clearSelections]." +
	"\n\tlastSelection := anObject." +
	"\n\tanAspect = #classCategory ifTrue: [" +
	"\n\t\t^ self reset]." +
	"\n\tanAspect = #class ifTrue: [" +
	"\n\t\tself setClass: anObject]",
	null, "2011-10-09T21:05:52Z", "mp");
/*
jst.MethodCategoryPanel.addMethod("methodAdded:usingEditor:", "m editor", "updating", 
	"\t| catNode |" +
	"\n\tactiveEditor ~= editor & self isDisabled ifTrue: [" +
	"\n\t\tsuspendedEvents add: #methodAdded:usingEditor: -> {m. editor}." +
	"\n\t\t^ self]." +
	"\n\tlastSelection = m receiver ifFalse: [" +
	"\n\t\t^ self]." +
	"\n\tcatNode := self root children" +
	"\n\t\tdetect: [:ch | ch link = m category]" +
	"\n\t\tifNone: [self root appendChild: (ExtTreeNode new text: m category name; link: m category; leaf: true)]." +
	"\n\tactiveEditor = editor ifTrue: [" +
	"\n\t\tself selectionModel " +
	"\n\t\t\tsuspendEvents; " +
	"\n\t\t\tselectNode: catNode; " +
	"\n\t\t\tresumeEvents]",
	null, "2011-10-05T08:07:12Z", "mp");
 */
jst.MethodCategoryPanel.addMethod("methodAdded:usingEditor:", "m editor", "updating", 
	"\t| cat |" +
	"\n\tlastSelection = m receiver ifFalse: [" +
	"\n\t\t^ self]." +
	"\n\tcat := activeEditor = editor ifTrue: [m category] ifFalse: [self selectedItem]." +
	"\n\tself root children detect: [:ch | ch link = m category] ifNone: [" +
	"\n\t\tself setClass: m receiver]." +
	"\n\tself selectItem: cat silently: true",
	null, "2011-10-09T21:11:01Z", "mp");

jst.MethodCategoryPanel.addMethod("clickEvent", "", "events", 
	"\t^ [:node :ev | self changed: #methodCategoryFocused with: node link]", null, 
	"2011-09-15T10:06:18Z", "mp");

jst.MethodCategoryPanel.addMethod("nodeselectionchangeEvent", "", "events", "\t^ [:model :node | self changed: #methodCategory with: node link]");

jst.MethodCategoryPanel.addMethod("menuItems", "", "accessing", 
	"\t^ {#browse. '-'. #newCategory. #rename. #remove}",
	null, "2012-01-24T16:12:47Z", "mp");

//*** MessageSetPanel ***

jst.MessageSetPanel.addMethod("selectedMethod", "", "accessing", 
	"\t^ self selectedItem",
	null, "2012-01-30T12:42:48Z", "mp");

jst.MessageSetPanel.addMethod("currentClass", "", "accessing", 
	"\t^ self selectedItem ifNotNilDo: [:item | item receiver]",
	null, "2012-02-06T21:09:04Z", "mp");
/*
jst.MessageSetPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tactions := {" +
	"\n\t\tBrowseAction on: #selectedMethod of: self." +
	"\n\t\tBrowseHierarchyAction on: #selectedMethod of: self." +
	"\n\t\tnil." +
	"\n\t\tBrowseSendersAction on: #selectedMethod of: self." +
	"\n\t\tBrowseImplementorsAction on: #selectedMethod of: self." +
	"\n\t\tInheritanceAction on: #selectedMethod of: self." +
	"\n\t\tverAction := MethodVersionsAction on: #selectedMethod of: self." +
	"\n\t\tnil." +
	"\n\t\tInstVarRefsAction on: #currentClass of: self." +
	"\n\t\tClassVarRefsAction on: #currentClass of: self." +
	"\n\t\tClassVariablesAction on: #currentClass of: self." +
	"\n\t\tClassRefsAction on: #currentClass of: self." +
	"\n\t\tnil." +
	"\n\t\tRemoveMethodAction on: #selectedMethod of: self." +
	"\n\t\tnil." +
	"\n\t\tInspectAction new on: #selectedMethod of: self; label: 'inspect method'; hotKey: nil." +
	"\n\t\tnil." +
	"\n\t\tClassInstancesAction on: #currentClass of: self." +
	"\n\t\tClassSubInstAction on: #currentClass of: self." +
	"\n\t}",
	null, "2013-06-05T19:13:47Z", "mp");

jst.MessageSetPanel.addMethod("defaultRoot", "", "private", 
	"\t^ ExtTreeNode new children: #()");
 */

jst.MessageSetPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tself buildActions",
	null, "2013-06-06T10:20:32Z", "mp");

jst.MessageSetPanel.addMethod("buildActions", "", "initialization", 
	"\tactions := {" +
	"\n\t\tBrowseAction on: #selectedMethod of: self." +
	"\n\t\tBrowseHierarchyAction on: #selectedMethod of: self." +
	"\n\t\tnil." +
	"\n\t\tBrowseSendersAction on: #selectedMethod of: self." +
	"\n\t\tBrowseImplementorsAction on: #selectedMethod of: self." +
	"\n\t\tInheritanceAction on: #selectedMethod of: self." +
	"\n\t\tverAction := MethodVersionsAction on: #selectedMethod of: self." +
	"\n\t\tnil." +
	"\n\t\tInstVarRefsAction on: #currentClass of: self." +
	"\n\t\tClassVarRefsAction on: #currentClass of: self." +
	"\n\t\tClassVariablesAction on: #currentClass of: self." +
	"\n\t\tClassRefsAction on: #currentClass of: self." +
	"\n\t\tnil." +
	"\n\t\tremoveAction := RemoveMethodAction on: #selectedMethod of: self." +
	"\n\t\tnil." +
	"\n\t\tInspectAction new on: #selectedMethod of: self; label: 'inspect method'; hotKey: nil." +
	"\n\t\tClassInstancesAction on: #currentClass of: self." +
	"\n\t\tClassSubInstAction on: #currentClass of: self." +
	"\n\t}",
	null, "2013-06-06T10:20:17Z", "mp");

jst.MessageSetPanel.addMethod("clickEvent", "", "events", 
	"\t^ [:node | self itemSelected: node link]",
	null, "2013-06-06T09:57:29Z", "mp");

jst.MessageSetPanel.addMethod("nodeselectionchangeEvent", "", "events", 
	"\t^ [:model :node | self itemSelected: node link]",
	null, "2013-06-06T09:02:24Z", "mp");

jst.MessageSetPanel.addMethod("itemSelected:", "aMethod", "updating", 
	"\tself changed: #method with: aMethod." +
	"\n\tverAction isDisabled: aMethod priorVersion isNil",
	null, "2013-06-06T09:01:30Z", "mp");

/*
jst.MessageSetPanel.addMethod("methodModified:usingEditor:", "m editor", "updating", 
	"\t(self root children detect: [:ch | ch link = m] ifNone: []) " +
	"\n\t\tifNotNilDo: [:ch | ch link: m]",
	null, "2011-10-03T19:58:22Z", "mp");

jst.MessageSetPanel.addMethod("methodModified:usingEditor:", "m editor", "updating", 
	"\t(self root children detect: [:ch | ch link = m] ifNone: []) ifNotNilDo: [:ch | " +
	"\n\t\t(self isDisabled and: [activeEditor ~= editor] and: [self selectedItem = m])" +
	"\n\t\t\tifTrue: [suspendedEvents add: #methodModified:usingEditor: -> {m. editor}]" +
	"\n\t\t\tifFalse: [ch link: m]" +
	"\n\t]",
	null, "2011-10-04T14:48:32Z", "mp");
*/

jst.MessageSetPanel.addMethod("methodModified:usingEditor:", "m editor", "updating", 
	"\t(self root children detect: [:ch | ch link = m] ifNone: nil) ifNotNilDo: [:ch | " +
	"\n\t\tch iconCls: (m isNative ifTrue: #javascript ifFalse: #method)." +
	"\n\t\tch link: m]",
	null, "2012-02-16T08:22:11Z", "mp");

jst.MessageSetPanel.addMethod("methodCategoryChanged:on:", "oldCat aMethod", "updating", 
	"\t(self root children detect: [:ch | ch link = aMethod] ifNone: nil) ifNotNilDo: [:ch | " +
	"\n\t\tch text: aMethod asString]",
	null, "2013-03-05T09:34:24Z", "mp");

jst.MessageSetPanel.addMethod("initializeFrom:with:selectFirst:", "aCollection textSelector aBoolean", "private", 
	"\tsuper " +
	"\n\t\tinitializeFrom: aCollection " +
	"\n\t\twith: [:m | ExtTreeNode new text: (m perform: textSelector); leaf: true; link: m; " +
	"\n\t\t\ticonCls: (m isNative ifTrue: #javascript ifFalse: #method)]" +
	"\n\t\tselectFirst: aBoolean ",
	null, "2012-02-16T08:18:55Z", "mp");

//*** MethodPanel ***

jst.MethodPanel.addMethod("buildActions", "", "initialization", 
	"\tsuper buildActions." +
	"\n\tactions := actions copyWithAll: {" +
	"\n\t\tnil. CategorizeMethodAction on: #selectedMethod of: self}.",
	null, "2013-06-06T10:23:45Z", "mp");

/*
jst.MethodPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tactions := actions copyWithAll: {" +
	"\n\t\tCategorizeMethodAction on: #selectedMethod of: self}.",
	null, "2012-02-03T20:01:44Z", "mp");
	
jst.MethodPanel.addMethod("defaultRoot", "", "private", 
	"\t^ ExtTreeNode new text: '(select protocol)'; children: #()");
 */

jst.MethodPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tlastSelection = anObject ifTrue: [" +
	"\n\t\t^ self selectionModel clearSelections]." +
	"\n\tlastSelection := anObject." +
	"\n\tanAspect = #classCategory ifTrue: [" +
	"\n\t\t^ self reset]." +
	"\n\tanAspect = #class ifTrue: [" +
	"\n\t\ttheClass := anObject." +
	"\n\t\t^ self showAllMethods]." +
	"\n\t(anAspect startsWith: #methodCategory) ifTrue: [" +
	"\n\t\tself showMethodsInCategory: anObject]", 
	null, "2011-09-16T22:31:52Z", "mp");
/*
jst.MethodPanel.addMethod("showMethodsInCategory:", "aCategory", "private", "\t| root |" +
	"\n\taCategory ifNil: [" +
	"\n\t\t^ self showAllMethods]." +
	"\n\troot := ExtTreeNode new text: theClass name, ' - ', aCategory name; children: OrderedCollection new." +
	"\n\t(theClass methodsInCategory: aCategory name) asSortedCollection do: [:m |" +
	"\n\t\troot children add: (ExtTreeNode new text: m selector; leaf: true; link: m)]." +
	"\n\tself root: root");
*/

jst.MethodPanel.addMethod("showAllMethods", "", "private", 
	"\tself initializeFrom: theClass methodDict asSortedCollection with: #selector selectFirst: false",
	null, "2012-02-15T14:39:56Z", "mp");

jst.MethodPanel.addMethod("showMethodsInCategory:", "aCategory", "private", 
	"\tlastSelection := aCategory." +
	"\n\taCategory ifNil: [" +
	"\n\t\t^ self showAllMethods]." +
	"\n\tself initializeFrom: (theClass methodsInCategory: aCategory name) asSortedCollection with: #selector selectFirst: false",
	null, "2012-02-15T14:41:08Z", "mp");

/*
jst.MethodPanel.addMethod("methodAdded:usingEditor:", "m editor", "updating", 
	"\t| catNode |" +
	"\n\tactiveEditor ~= editor & self isDisabled ifTrue: [" +
	"\n\t\tsuspendedEvents add: #methodAdded:usingEditor: -> {m. editor}." +
	"\n\t\t^ self]." +
	"\n\ttheClass = m receiver ifFalse: [" +
	"\n\t\t^ self]." +
	"\n\tcatNode := self root children" +
	"\n\t\tdetect: [:ch | ch link = m]" +
	"\n\t\tifNone: [self root appendChild: (ExtTreeNode new text: m selector; link: m; leaf: true)]." +
	"\n\tactiveEditor = editor ifTrue: [" +
	"\n\t\tlastSelection := m category." +
	"\n\t\tself selectionModel " +
	"\n\t\t\tsuspendEvents; " +
	"\n\t\t\tselectNode: catNode; " +
	"\n\t\t\tresumeEvents]",
	null, "2011-10-05T19:21:35Z", "mp");


jst.MethodPanel.addMethod("methodAdded:usingEditor:", "m editor", "updating", 
	"\t| catNode |" +
	"\n\tactiveEditor ~= editor & self isDisabled ifTrue: [" +
	"\n\t\tsuspendedEvents add: #methodAdded:usingEditor: -> {m. editor}." +
	"\n\t\t^ self]." +
	"\n\ttheClass = m receiver ifFalse: [" +
	"\n\t\t^ self]." +
	"\n\tactiveEditor = editor " +
	"\n\t\tifTrue: [lastSelection := m category." +
	"\n\t\t\tself showMethodsInCategory: m category." +
	"\n\t\t\tself selectNodeWithContents: m silently: true]",
	null, "2011-10-05T21:48:08Z", "mp");

jst.MethodPanel.addMethod("methodAdded:usingEditor:", "m editor", "updating", 
	"\tactiveEditor ~= editor & self isDisabled ifTrue: [" +
	"\n\t\tsuspendedEvents add: #methodAdded:usingEditor: -> {m. editor}." +
	"\n\t\t^ self]." +
	"\n\ttheClass = m receiver ifFalse: [" +
	"\n\t\t^ self]." +
	"\n\tactiveEditor = editor ifTrue: [" +
	"\n\t\tlastSelection := m category." +
	"\n\t\tself showMethodsInCategory: m category." +
	"\n\t\tself selectItem: m silently: true." +
	"\n\t\t^ self]." +
	"\n\t(lastSelection = m category or: [(lastSelection isKindOf: MethodCategory) not]) ifTrue: [ | mm |" +
	"\n\t\tmm := self selectedItem." +
	"\n\t\tself showMethodsInCategory: (lastSelection = m category ifTrue: [lastSelection])." +
	"\n\t\tself selectItem: mm silently: true]",
	null, "2011-10-06T21:07:52Z", "mp");

jst.MethodPanel.addMethod("methodAdded:usingEditor:", "m editor", "updating", 
	"\ttheClass = m receiver ifFalse: [" +
	"\n\t\t^ self]." +
	"\n\tactiveEditor = editor ifTrue: [" +
	"\n\t\tlastSelection := m category." +
	"\n\t\tself showMethodsInCategory: m category." +
	"\n\t\tself selectItem: m silently: true." +
	"\n\t\t^ self]." +
	"\n\t(lastSelection = m category or: [(lastSelection isKindOf: MethodCategory) not]) ifTrue: [ | mm |" +
	"\n\t\tmm := self selectedItem." +
	"\n\t\tself showMethodsInCategory: (lastSelection = m category ifTrue: [lastSelection])." +
	"\n\t\tself selectItem: mm silently: true]",
	null, "2011-10-10T15:48:55Z", "mp");
*/

jst.MethodPanel.addMethod("methodAdded:usingEditor:", "m editor", "updating", 
	"\ttheClass = m receiver ifFalse: [" +
	"\n\t\t^ self]." +
	"\n\tactiveEditor = editor ifTrue: [" +
	"\n\t\tself showMethodsInCategory: m category." +
	"\n\t\tself selectItem: m silently: true." +
	"\n\t\t^ self]." +
	"\n\t(lastSelection = m category or: [(lastSelection isKindOf: MethodCategory) not]) ifTrue: [ | mm |" +
	"\n\t\tmm := self selectedItem." +
	"\n\t\tself showMethodsInCategory: (lastSelection = m category ifTrue: [lastSelection])." +
	"\n\t\tself selectItem: mm silently: true]",
	null, "2012-02-06T15:26:24Z", "mp");

/*
jst.MethodPanel.addMethod("methodCategoryChanged:on:", "oldCat aMethod", "updating", 
	"\t| m |" +
	"\n\t(m := self selectedItem) ~= aMethod & (lastSelection isKindOf: MethodCategory) ifTrue: [" +
	"\n\t\tlastSelection name = oldCat ifTrue: [" +
	"\n\t\t\t\"disable a method in old category\"" +
	"\n\t\t\t(self root detectChild: [:node | node link = aMethod]) ifNotNilDo: [:node |" +
	"\n\t\t\t\tself root children remove: node]]." +
	"\n\t\t lastSelection name = aMethod category name ifTrue: [" +
	"\n\t\t \t\"show a method in new category\"" +
	"\n\t\t \tself showMethodsInCategory: lastSelection." +
	"\n\t\t\tm ifNotNil: [" +
	"\n\t\t\t\tself selectItem: m silently: true]]" +
	"\n\t]",
	null, "2012-02-04T22:46:42Z", "mp");

jst.MethodPanel.addMethod("methodCategoryChanged:on:", "oldCat aMethod", "updating", 
	"\t(lastSelection isKindOf: MethodCategory) ifTrue: [" +
	"\n\t\tself selectedItem == aMethod ifTrue: [" +
	"\n\t\t\tlastSelection := aMethod category." +
	"\n\t\t\tself showMethodsInCategory: lastSelection." +
	"\n\t\t\tself selectItem: aMethod silently: true." +
	"\n\t\t\t^ self]." +
	"\n\t\tlastSelection name = oldCat ifTrue: [" +
	"\n\t\t\t\"disable a method in old category\"" +
	"\n\t\t\t(self root detectChild: [:node | node link = aMethod]) ifNotNilDo: [:node |" +
	"\n\t\t\t\tself root children remove: node]]." +
	"\n\t\t lastSelection name = aMethod category name ifTrue: [ | m |" +
	"\n\t\t \t\"show a method in new category\"" +
	"\n\t\t\tm := self selectedItem." +
	"\n\t\t \tself showMethodsInCategory: lastSelection." +
	"\n\t\t\tm ifNotNil: [" +
	"\n\t\t\t\tself selectItem: m silently: true]]" +
	"\n\t]",
	null, "2012-02-05T21:24:45Z", "mp");
*/

//*** BrowserCodeEditor ***

jst.BrowserCodeEditor.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tautoselect := false",
	null, "2011-11-01T09:52:14Z", "mp");

jst.BrowserCodeEditor.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tlastSelection = anObject ifTrue: [" +
	"\n\t\t^ self]." +
	"\n\tlastSelection := anObject." +
	"\n\tmethodCategory := nil." +
	"\n\ted mode: ((anAspect = #method and: [lastSelection isNative]) ifTrue: [#javascript] ifFalse: [#smalltalk])." +
	"\n\tautoselect := anAspect = #methodCategoryFocused." +
	"\n\tanAspect = #classCategory ifTrue: [" +
	"\n\t\tobject := nil." +
	"\n\t\ttheClass := nil." +
	"\n\t\t^ self resetContents: (Class template: anObject name)]." +
	"\n\tanAspect = #class ifTrue: [" +
	"\n\t\tobject := anObject." +
	"\n\t\ttheClass := anObject." +
	"\n\t\t^ self resetContents: anObject definitionST80]." +
	"\n\t(anAspect asString startsWith: #methodCategory) ifTrue: [" +
	"\n\t\tobject := anObject ifNotNil: [anObject subject]." +
	"\n\t\tmethodCategory := anObject ifNotNil: [anObject name] ifNil: [MethodCategory defaultName]." +
	"\n\t\tself resetContents: Class methodTemplate." +
	"\n\t\t^ self]." +
	"\n\tanAspect = #method ifTrue: [" +
	"\n\t\tobject := anObject receiver." +
	"\n\t\ttheClass := anObject receiver. \"nutne, pokud je editor soucasti neuplneho browseru, napr. MessageSet\"" +
	"\n\t\tmethodCategory := anObject category name." +
	"\n\t\tself resetContents: anObject printSource]",
	null, "2012-01-12T17:19:50Z", "mp", 1);

jst.BrowserCodeEditor.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tlastSelection = anObject ifTrue: [" +
	"\n\t\t^ self]." +
	"\n\tlastSelection := anObject." +
	"\n\tmethodCategory := nil." +
	"\n\ted mode: ((anAspect = #method and: [lastSelection isNative]) ifTrue: [#javascript] ifFalse: [#smalltalk])." +
	"\n\tautoselect := anAspect = #methodCategoryFocused." +
	"\n\tanAspect = #classCategory ifTrue: [" +
	"\n\t\tobject := nil." +
	"\n\t\ttheClass := nil." +
	"\n\t\t^ self resetContents: (Class template: anObject name)]." +
	"\n\tanAspect = #class ifTrue: [" +
	"\n\t\tobject := anObject." +
	"\n\t\ttheClass := anObject." +
	"\n\t\t^ self resetContents: anObject definitionST80]." +
	"\n\t(anAspect asString startsWith: #methodCategory) ifTrue: [" +
	"\n\t\tobject := anObject ifNotNil: [anObject subject]." +
	"\n\t\tmethodCategory := anObject ifNotNil: [anObject name] ifNil: [MethodCategory defaultName]." +
	"\n\t\tself resetContents: Class methodTemplate." +
	"\n\t\t^ self]." +
	"\n\tanAspect = #method ifTrue: [" +
	"\n\t\tself setMethod: anObject." +
	"\n\t\tself resetContents: anObject printSource]",
	null, "2013-06-03T14:56:29Z", "mp"); //jst-tools

jst.BrowserCodeEditor.addMethod("setMethod:", "aMethod", "updating", 
	"\t\"volam i z venku, musim proto nastavit i lastSelection\"" +
	"\n\tlastSelection := aMethod." +
	"\n\tobject := aMethod receiver." +
	"\n\t\"nutne, pokud je editor soucasti neuplneho browseru, napr. MessageSet\"" +
	"\n\ttheClass := aMethod receiver." +
	"\n\tmethodCategory := aMethod category name.",
	null, "2013-06-03T14:55:44Z", "mp");

/*
	jst.BrowserCodeEditor.addMethod("saveCode", "", "private", 
		"\t| code msg newClass oldCat |" +
		"\n\tmethodCategory ifNotNil: [" +
		"\n\t\t^ self saveMethod]." +
		"\n\tcode := (Parser on: self value) parseCode." +
		"\n\tcode do: [:ex | (ex isMessageSend and: [ex selector includesSubString: 'instanceVariableNames:']) ifTrue: [" +
		"\n\t\tmsg ifNotNil: [" +
		"\n\t\t\tself error: 'Unexpected code in editor']." +
		"\n\t\tmsg := ex]" +
		"\n\t]." +
		"\n\ttheClass ifNotNil: [oldCat := theClass category]." +
		"\n\t(newClass := code doIt) isInstanceSide ifTrue: [" +
		"\n\t\tnewClass = theClass " +
		"\n\t\t\tifFalse: [self changed: #newClass with: newClass]" +
		"\n\t\t\tifTrue: [newClass category = oldCat ifFalse: [" +
		"\n\t\t\t\tself changed: #classCategoryName with: newClass]]." +
		"\n\t]." +
		"\n\tself resetContents: self value." +
		"\n\tChangeSet current addCode: msg",
		null, "2011-09-29T20:34:10Z", "mp");
*/

jst.BrowserCodeEditor.addMethod("saveCode", "", "private", 
	"\t| code msg |" +
	"\n\tmethodCategory ifNotNil: [" +
	"\n\t\t^ self saveMethod]." +
	"\n\tcode := (Parser on: self value) parseCode." +
	"\n\tcode expressions size = 0 ifTrue: [" +
	"\n\t\tself error: 'No code in editor']." +
	"\n\tmsg := code expressions first." +
	"\n\t(code expressions size > 1 or: [msg isMessageSend not] " +
	"\n\t\tor: [(msg selector includesSubString: 'instanceVariableNames:') not]) ifTrue: [" +
	"\n\t\tself error: 'Unexpected code in editor']." +
	"\n\t((msg selector startsWith: #subclass:) and: [msg arguments first name ~= theClass name] " +
	"\n\t\tand: [(Smalltalk classNamed: msg arguments first asString) notNil]) ifTrue: [" +
	"\n\t\tUIManager default " +
	"\n\t\t\tconfirm: msg arguments first asString, ' is en existing class in the system. Redefinig it might cause serious problems. Is this really what you want to do?'" +
	"\n\t\t\tthenDo: [self saveParsedCode: code]" +
	"\n\t] ifFalse: [" +
	"\n\t\tself saveParsedCode: code]",
	null, "2012-04-05T18:06:00Z", "mp");

jst.BrowserCodeEditor.addMethod("saveParsedCode:", "code", "private", 
	"\t| oldCat newClass |" +
	"\n\ttheClass ifNotNil: [oldCat := theClass category]." +
	"\n\t(newClass := code doIt) isInstanceSide ifTrue: [" +
	"\n\t\tnewClass = theClass " +
	"\n\t\t\tifFalse: [self broadcastEvent: #'classAdded:usingEditor:' with: {newClass. self}]" +
	"\n\t\t\tifTrue: [newClass category = oldCat " +
	"\n\t\t\t\tifFalse: [self broadcastEvent: #'class:recategorizedFrom:usingEditor:' with: {newClass. oldCat. self}]" +
	"\n\t\t\t\tifTrue: [self broadcastEvent: #'classModified:usingEditor:' with: {newClass. self}]]." +
	"\n\t] ifFalse: [" +
	"\n\t\tself broadcastEvent: #'classModified:usingEditor:' with: {newClass. self}]." +
	"\n\t\"self sendEvent: #codeEditing: with: nil. - duplicita?\"" +
	"\n\tself resetContents: self value." +
	"\n\tChangeSet current addCode: code expressions first",
	null, "2012-08-17T11:11:40Z", "mp", 1);

jst.BrowserCodeEditor.addMethod("saveParsedCode:", "code", "private", 
	"\t| oldCat newClass event params |" +
	"\n\ttheClass ifNotNil: [oldCat := theClass category]." +
	"\n\tnewClass := code doIt." +
	"\n\tevent := #'classModified:usingEditor:'." +
	"\n\tparams := {newClass. self}." +
	"\n\tnewClass isInstanceSide ifTrue: [newClass = theClass " +
	"\n\t\tifFalse: [event := #'classAdded:usingEditor:']" +
	"\n\t\tifTrue: [newClass category = oldCat ifFalse: [" +
	"\n\t\t\tevent := #'class:recategorizedFrom:usingEditor:'." +
	"\n\t\t\tparams := {newClass. oldCat. self}]]]." +
	"\n\tself broadcastEvent: event with: params async: false." +
	"\n\t\"self sendEvent: #codeEditing: with: nil. - duplicita?\"" +
	"\n\tself resetContents: self value." +
	"\n\tChangeSet current addCode: code expressions first",
	null, "2013-06-26T06:45:59Z", "mp");

jst.BrowserCodeEditor.addMethod("save", "", "actions", 
	"\t(Smalltalk at: #user ifAbsent: nil) ifNotNil: [self saveCode] ifNil: [" +
	"\n\t\tExtMessageBox new " +
	"\n\t\t\ttitle: 'User name' translated; " +
	"\n\t\t\ttext: 'Type yours initials, please:' translated;" +
	"\n\t\t\tcallback: [:btn :str | btn = #ok ifTrue: [" +
	"\n\t\t\t\tSmalltalk at: #user put: str." +
	"\n\t\t\t\tChangeSet current append: ('jst.Smalltalk.at_put_(\"user\", \"{1}\");' format: {str})." +
	"\n\t\t\t\tself saveCode]]; " +
	"\n\t\t\tbePrompt; " +
	"\n\t\t\tshow]",
	null, "2012-04-05T22:10:06Z", "mp");
	
jst.BrowserCodeEditor.addMethod("cancel", "", "actions", 
	"\tchangedMethod " +
	"\n\t\tifNotNil: [self resetContents: changedMethod printSource]" +
	"\n\t\tifNil: [self reset]",
	null, "2011-10-10T20:26:05Z", "mp");
/*
jst.BrowserCodeEditor.addMethod("saveMethod", "", "private", 
	"\t| m selectors |" +
	"\n\tselectors := theClass selectors." +
	"\n\t[\tm := Parser parseMethod: self value of: theClass." +
	"\n\t\t(changedMethod notNil and: [changedMethod receiver = theClass] and: [changedMethod selector = m selector]) ifTrue: [" +
	"\n\t\t\tExtMessageBox new " +
	"\n\t\t\t\ttext: 'The method has been edited in another editor. Do you want to save the current code?' translated; " +
	"\n\t\t\t\tbeWarning; " +
	"\n\t\t\t\tbtnYesNo; " +
	"\n\t\t\t\tcallback: [:btn | btn = #yes ifTrue: [changedMethod := nil. self saveMethod]];" +
	"\n\t\t\t\tshow." +
	"\n\t\t\t^ self]." +
	"\n\t\tm := theClass addMethod: m categorize: methodCategory." +
	"\n\t\tChangeSet current addMethod: m." +
	"\n\t\t(selectors includes: m selector)" +
	"\n\t\t\tifFalse: [self componentMgr sendEvent: #methodAdded:usingEditor: with: {m. self}]" +
	"\n\t\t\tifTrue: [self componentMgr sendEvent: #methodModified:usingEditor: with: {m. self}]." +
	"\n\t\tself sendEvent: #codeEditing: with: nil." +
	"\n\t\t\"duplicita -> self resetContents: self value.\"" +
	"\n\t\tlastSelection := m" +
	"\n\t] on: ParserError do: [:err |" +
	"\n\t\tself rawValue: (self value copyUpTo: String lf), String lf, err messageText]",
	null, "2011-11-07T22:38:44Z", "mp");
*/

jst.BrowserCodeEditor.addMethod("saveMethod:", "newMethod", "private", 
	"\t| m selectors |" +
	"\n\tselectors := theClass selectors." +
	"\n\tm := theClass addMethod: newMethod categorize: methodCategory." +
	"\n\tChangeSet current addMethod: m." +
	"\n\t(selectors includes: m selector)" +
	"\n\t\tifFalse: [self broadcastEvent: #'methodAdded:usingEditor:' with: {m. self}]" +
	"\n\t\tifTrue: [self broadcastEvent: #'methodModified:usingEditor:' with: {m. self}]." +
	"\n\tself sendEvent: #codeEditing: with: nil." +
	"\n\tself resetContents: self value." +
	"\n\tlastSelection := m",
	null, "2012-08-17T11:12:31Z", "mp", 1);

jst.BrowserCodeEditor.addMethod("saveMethod:", "newMethod", "private", 
	"\t| m selectors event |" +
	"\n\tselectors := theClass selectors." +
	"\n\tm := theClass addMethod: newMethod categorize: methodCategory." +
	"\n\tChangeSet current addMethod: m." +
	"\n\tevent := (selectors includes: m selector)" +
	"\n\t\tifFalse: #'methodAdded:usingEditor:'" +
	"\n\t\tifTrue: #'methodModified:usingEditor:'." +
	"\n\tself broadcastEvent: event with: {m. self} async: false." +
	"\n\tself sendEvent: #codeEditing: with: nil." +
	"\n\tself resetContents: self value." +
	"\n\tlastSelection := m",
	null, "2013-06-23T20:49:19Z", "mp"); //jst-tools

jst.BrowserCodeEditor.addMethod("saveMethod", "", "private", 
	"\t| m |" +
	"\n\t[\tm := Parser parseMethod: self value of: theClass." +
	"\n\t\t((changedMethod notNil and: [changedMethod selector = m selector]) or: [" +
	"\n\t\t\tlastSelection isMethod and: [m selector ~= lastSelection selector] and: [theClass methodDict includesKey: m selector]]) ifTrue: [" +
	"\n\t\t\tExtMessageBox new " +
	"\n\t\t\t\ttext: 'The method was modified in another editor. Do you want to save the current code?' translated; " +
	"\n\t\t\t\tbeWarning; " +
	"\n\t\t\t\tbtnYesNo; " +
	"\n\t\t\t\tcallback: [:btn | btn = #yes ifTrue: [self saveMethod: m]];" +
	"\n\t\t\t\tshow" +
	"\n\t\t] ifFalse: [" +
	"\n\t\t\tself saveMethod: m]" +
	"\n\t] on: ParserError do: [:err |" +
	"\n\t\tself rawValue: (self value copyUpTo: String lf), String lf, err messageText]",
	null, "2012-01-09T15:01:09Z", "mp", 1);
	
jst.BrowserCodeEditor.addMethod("saveMethod", "", "private", 
	"\t| m |" +
	"\n\t[\tm := Parser parseMethod: self value of: theClass." +
	"\n\t\t((changedMethod notNil and: [changedMethod selector = m selector]) or: [" +
	"\n\t\t\tlastSelection isMethod and: [m selector ~= lastSelection selector] and: [theClass methodDict includesKey: m selector]]) ifTrue: [" +
	"\n\t\t\tExtMessageBox new " +
	"\n\t\t\t\ttext: 'The method was modified in another editor. Do you want to save the current code?' translated; " +
	"\n\t\t\t\tbeWarning; " +
	"\n\t\t\t\tbtnYesNo; " +
	"\n\t\t\t\tcallback: [:btn | btn = #yes ifTrue: [self saveMethod: m]];" +
	"\n\t\t\t\tshow" +
	"\n\t\t] ifFalse: [" +
	"\n\t\t\tself saveMethod: m]" +
	"\n\t] on: ParserError do: [:err |" +
	"\n\t\tself rawValue: (self value copyUpTo: String lf), String lf, err code." +
	"\n\t\ted markText: err errorText with: 'jst-code-error']",
	null, "2013-10-09T12:22:31Z", "mp"); //jst-tools

jst.BrowserCodeEditor.addMethod("methodModified:usingEditor:", "m editor", "updating", 
	"\tself ~= editor & editing & (m = lastSelection) ifTrue: [" +
	"\n\t\t\"the method changed in another editor\"" +
	"\n\t\tchangedMethod := m]",
	null, "2012-01-07T22:27:55Z", "mp");

jst.BrowserCodeEditor.addMethod("toggleEditing", "", "private", 
	"\tsuper toggleEditing." +
	"\n\tediting ifFalse: [" +
	"\n\t\tchangedMethod := nil]",
	null, "2011-10-09T20:39:41Z", "mp");

jst.BrowserCodeEditor.addMethod("elementclickEvent", "", "events", 
	"\t^ [autoselect ifTrue: [self selectText. autoselect := false]]",
	null, "2011-11-01T10:12:30Z", "mp");

jst.BrowserCodeEditor.addMethod("selectText", "", "actions", function (){
	//provizorní 
	this._ed.asJsObject().setSelection({line: 0, ch: 0}, {line: 5, ch: 0});
	this._ed.focus();
},
	null, "2011-10-29T22:24:56Z", "mp");

jst.BrowserCodeEditor.addMethod("currentClass", "", "accessing", 
	"\t^ theClass",
	null, "2012-02-08T13:12:04Z", "mp");

//*** BrowserCodePanel ***

jst.BrowserCodePanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tbrowseAction := BrowseAction new target: [lastSelection ifNil: [theClass]]; beEnabled." +
	"\n\thierAction := BrowseHierarchyAction new target: [lastSelection ifNil: [theClass]]." +
	"\n\tsendersAction := BrowseSendersAction new target: [lastSelection]." +
	"\n\timplAction := BrowseImplementorsAction new target: [lastSelection]." +
	"\n\tverAction := MethodVersionsAction new target: [lastSelection]." +
	"\n\tinherAction := InheritanceAction new target: [lastSelection]." +
	"\n\tinstVarsAction := InstVarRefsAction new target: [theClass]." +
	"\n\tclassVarsAction := ClassVarRefsAction new target: [theClass]." +
	"\n\tself border: false; withBorderLayout;" +
	"\n\t\tadd: (codeEditor := BrowserCodeEditor new region: ExtRegion center);" +
	"\n\t\tadd: (toolBar := ExtPanel new region: ExtRegion north; height: 30; layout: (ExtHBoxLayout new padding: 3);" +
	"\n\t\t\tadd: (browseAction asButton width: 60);" +
	"\n\t\t\tadd: (sendersAction asSplitButton width: 70);" +
	"\n\t\t\tadd: (implAction asSplitButton width: 95);" +
	"\n\t\t\tadd: (verAction asButton width: 70);" +
	"\n\t\t\tadd: (inherAction asButton width: 70);" +
	"\n\t\t\tadd: (hierAction asButton width: 60);" +
	"\n\t\t\tadd: (instVarsAction asButton width: 60);" +
	"\n\t\t\tadd: (classVarsAction asButton width: 60);" +
	"\n\t\t\tadd: (srcBtn := ExtButton new text: 'source' translated; width: 50; beDisabled);" +
	"\n\t\t\tyourself);" +
	"\n\t\tadd: (commentPanel := ExtPanel new region: ExtRegion south; height: 42; autoScroll: true; padding: '0 3'; hide)",
	null, "2012-04-10T09:46:40Z", "mp");
//"\n\t\tadd: (commentPanel := CodeEditor new region: ExtRegion south; height: 42; lineNumbers: false; mode: #javascript; hide)",

jst.BrowserCodePanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tlastSelection = anObject ifTrue: [" +
	"\n\t\t^ self]." +
	"\n\tlastSelection := anObject." +
	"\n\tsendersAction menu: nil; beDisabled." +
	"\n\timplAction menu: nil; beDisabled." +
	"\n\tverAction beDisabled." +
	"\n\tinherAction isEnabled: anAspect = #method." +
	"\n\tbrowseAction isDisabled: anAspect = #selector." +
	"\n\t(#(class method) includes: anAspect) = commentPanel isVisible ifFalse: [" +
	"\n\t\tcommentPanel isVisible: commentPanel isVisible not." +
	"\n\t\tself syncSize]." +
	"\n\tcommentPanel isVisible ifTrue: [" +
	"\n\t\tcommentPanel height: (anAspect = #method ifTrue: 21 ifFalse: 42)." +
	"\n\t\tself syncSize]." +
	"\n\tanAspect = #classCategory | (anAspect = #selector) ifTrue: [" +
	"\n\t\thierAction beDisabled." +
	"\n\t\tinstVarsAction menu: nil; beDisabled." +
	"\n\t\tclassVarsAction menu: nil; beDisabled." +
	"\n\t\t^ theClass := nil]." +
	"\n\thierAction isEnabled: anObject notNil | theClass notNil." +
	"\n\tanAspect = #class ifTrue: [" +
	"\n\t\ttheClass := lastSelection." +
	"\n\t\t^ self classChanged]." +
	"\n\tanAspect = #method ifTrue: [" +
	"\n\t\tself methodChanged].",
	null, "2012-04-10T09:45:40Z", "mp");

/*
jst.BrowserCodePanel.addMethod("classChanged", "", "updating", 
	"\tinstVarsAction beEnabled; rebuildMenu." +
	"\n\tclassVarsAction beEnabled; rebuildMenu." +
	"\n\tcommentPanel contents: (theClass comment ifNil: ['This class has no comment.' translated])",
	null, "2012-02-22T21:55:33Z", "mp");

jst.BrowserCodePanel.addMethod("classChanged", "", "updating", 
	"\tinstVarsAction beEnabled; rebuildMenu." +
	"\n\tclassVarsAction beEnabled; rebuildMenu." +
	"\n\tcommentPanel contents: (String streamContents: [:s |" +
	"\n\t\ttheClass jsFile ifNotNil: [" +
	"\n\t\t\ts nextPutAll: 'This class is defined in ' translated;" +
	"\n\t\t\t\tnextPut: theClass jsFile;" +
	"\n\t\t\t\tnextPutAll: '.js';" +
	"\n\t\t\t\tnextPutAll: '<br/>']." +
	"\n\t\ttheClass comment ifNil: [" +
	"\n\t\t\ts nextPutAll: 'This class has no comment.' translated]])",
	null, "2012-03-01T20:29:14Z", "mp");
*/

jst.BrowserCodePanel.addMethod("classChanged", "", "updating", 
	"\tinstVarsAction beEnabled; rebuildMenu." +
	"\n\tclassVarsAction beEnabled; rebuildMenu." +
	"\n\tcommentPanel contents: theClass printComment",
	null, "2012-04-10T14:57:02Z", "mp");

jst.BrowserCodePanel.addMethod("methodChanged", "", "updating", 
	"\tcodeEditor resetContents: lastSelection printSource." +
	"\n\tverAction isDisabled: lastSelection priorVersion isNil." +
	"\n\tsendersAction rebuildMenu; beEnabled." +
	"\n\timplAction rebuildMenu; beEnabled." +
	"\n\ttheClass = lastSelection receiver ifFalse: [" +
	"\n\t\ttheClass := lastSelection receiver." +
	"\n\t\tself classChanged]." +
	"\n\tcommentPanel contents: lastSelection printComment",
	null, "2012-05-05T18:29:04Z", "mp");

/*
jst.BrowserCodePanel.addMethod("methodModified:usingEditor:", "m editor", "updating", 
	"\tlastSelection = m ifFalse: [" +
	"\n\t\t^ self]." +
	"\n\tcodeEditor = editor | codeEditor editing not ifTrue: [" +
	"\n\t\tlastSelection := m." +
	"\n\t\tself methodChanged]",
	null, "2011-10-10T15:54:08Z", "mp");
*/
jst.BrowserCodePanel.addMethod("methodModified:usingEditor:", "m editor", "updating", 
	"\t(lastSelection = m and: [codeEditor == editor | codeEditor editing not]) ifTrue: [" +
	"\n\t\tlastSelection := m." +
	"\n\t\tself methodChanged]",
	null, "2013-03-02T20:59:48Z", "mp");

jst.BrowserCodePanel.addMethod("methodAdded:usingEditor:", "m editor", "updating", 
	"\tcodeEditor = editor ifTrue: [" +
	"\n\t\tlastSelection := m." +
	"\n\t\tself methodChanged]",
	null, "2011-10-29T21:33:11Z", "mp");

jst.BrowserCodePanel.addMethod("classModified:usingEditor:", "aClass ed", "updating", 
	"\ttheClass = aClass ifTrue: [" +
	"\n\t\tcodeEditor ~= ed & (theClass = lastSelection) ifTrue: [" +
	"\n\t\t\tcodeEditor resetContents: aClass definitionST80]." +
	"\n\t\tself classChanged]",
	null, "2011-10-17T19:03:09Z", "mp");

jst.BrowserCodePanel.addMethod("editor", "", "accessing", "\t^ codeEditor");

//*** BrowserWindow ***

jst.BrowserWindow._class.addMethod("openOn:", "anObject", "instance creation", 
	"\tself openOn: anObject relativeTo: (Point x: 50 y: 30)");

jst.BrowserWindow._class.addMethod("openOn:relativeTo:", "anObject origin", "instance creation", 
	"\t| win |" +
	"\n\twin := self openRelativeTo: origin." +
	"\n\tanObject ifNotNil: [win selectObject: anObject]");

jst.BrowserWindow.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\tminimizable: true." +
	"\n\tself buildPanels." +
	"\n\tself installDependents",
	null, "2012-06-21T10:31:36Z", "mp"); //jst-tools

jst.BrowserWindow.addMethod("buildPanels", "", "initialization", "");

jst.BrowserWindow.addMethod("panels", "", "private", 
	"\t^ {methodPanel. codePanel}",
	null, "2011-10-13T12:46:10Z", "mp");

jst.BrowserWindow.addMethod("installDependents", "", "initialization", 
	"\tmethodPanel" +
	"\n\t\taddDependent: codePanel;" +
	"\n\t\taddDependent: codePanel editor." +
	"\n\tcodePanel editor" +
	"\n\t\taddDependent: self." +
	"\n\tself panels do: [:p |" +
	"\n\t\tcodePanel editor addDependent: p]",
	null, "2011-10-13T12:48:46Z", "mp");

jst.BrowserWindow.addMethod("methodPanel", "", "accessing", "\t^ methodPanel");

jst.BrowserWindow.addMethod("codePanel", "", "accessing", "\t^ codePanel",
	null, "2011-09-28T16:02:24Z", "mp");

jst.BrowserWindow.addMethod("beforecloseEvent", "", "events", 
	"\t^ [:w | codePanel editor editing ifTrue: [" +
	"\n\t\t\tself inform: 'Please finish editing first.' translated." +
	"\n\t\t\tfalse \"stops the event\"]]",
	null, "2012-01-24T08:53:56Z", "mp");

jst.BrowserWindow.addMethod("minimizeEvent", "", "events", 
	"\t^ [:w | w hide]",
	null, "2012-06-21T10:34:46Z", "mp");

//*** MessageSet ***

jst.MessageSet.klass().instanceVariableNames_("nextStateId");

jst.MessageSet._class.addMethod("openMessageList:name:autoSelect:", "messageList labelString autoSelectString", "instance creation", 
	"\t\"Open a system view for a MessageSet on messageList. \"" +
	"\n\t| win orig |" +
	"\n\twin := self new show" +
	"\n\t\ttitle: labelString; " +
	"\n\t\tautoSelectString: autoSelectString;" +
	"\n\t\tinitializeMessageList: messageList." +
	"\n\torig := ExtEventObject current getXY." +
	"\n\twin moveRelativeTo: (Point x: orig x y: (orig y - win height max: 5))." +
	"\n\t^ win",
	null, "2011-11-16T15:37:19Z", "mp", 1);

jst.MessageSet._class.addMethod("openMessageList:name:autoSelect:", "messageList labelString autoSelectString", "instance creation", 
	"\t\"Open a system view for a MessageSet on messageList. \"" +
	"\n\t| win orig |" +
	"\n\twin := self new " +
	"\n\t\tstateful: nextStateId notNil;" +
	"\n\t\tstateId: nextStateId;" +
	"\n\t\ttitle: labelString; " +
	"\n\t\tautoSelectString: autoSelectString." +
	"\n\tnextStateId := nil.\t" +
	"\n\torig := ExtEventObject current getXY." +
	"\n\twin " +
	"\n\t\tmoveRelativeTo: (Point x: orig x y: (orig y - win height max: 5));" +
	"\n\t\tshow." +
	"\n\twin initializeMessageList: messageList." +
	"\n\t^ win",
	null, "2012-04-20T12:59:03Z", "mp", 1);

jst.MessageSet._class.addMethod("openMessageList:name:autoSelect:", "messageList labelString autoSelectString", "instance creation", 
	"\t\"Open a system view for a MessageSet on messageList. \"" +
	"\n\t| win restoring |" +
	"\n\twin := self new " +
	"\n\t\ttitle: labelString; " +
	"\n\t\tautoSelectString: autoSelectString." +
	"\n\trestoring := win stateful & nextStateId notNil." +
	"\n\twin stateful ifTrue: [" +
	"\n\t\twin stateId: (nextStateId ifNil: [JSmalltalkIDE nextId])]." +
	"\n\tnextStateId := nil." +
	"\n\trestoring ifFalse: [ | orig |" +
	"\n\t\torig := ExtEventObject current getXY." +
	"\n\t\twin moveRelativeTo: (Point x: orig x y: (orig y - win height max: 5))]." +
	"\n\t^ win " +
	"\n\t\tshow; " +
	"\n\t\tinitializeMessageList: messageList",
	null, "2012-04-27T10:04:29Z", "mp", 1);

jst.MessageSet._class.addMethod("openMessageList:name:autoSelect:", "messageList labelString autoSelectString", "instance creation", 
	"\t\"Open a system view for a MessageSet on messageList. \"" +
	"\n\t| win restoring |" +
	"\n\twin := self new " +
	"\n\t\ttitle: labelString; " +
	"\n\t\tautoSelectString: autoSelectString." +
	"\n\trestoring := win stateful & nextStateId notNil." +
	"\n\twin stateful ifTrue: [" +
	"\n\t\twin stateId: (nextStateId ifNil: [JSmalltalkIDE nextId])]." +
	"\n\tnextStateId := nil." +
	"\n\trestoring ifFalse: [ | orig |" +
	"\n\t\torig := ExtEventObject current getXY." +
	"\n\t\torig x + win width >  Browser window pageWidth ifTrue: [" +
	"\n\t\t\torig := Point x: orig x - win width y: orig y]." +
	"\n\t\twin moveRelativeTo: (Point x: orig x y: (orig y - win height max: 5))]." +
	"\n\t^ win " +
	"\n\t\tshow; " +
	"\n\t\tinitializeMessageList: messageList",
	null, "2013-06-03T06:34:55Z", "mp"); //jst-tools

jst.MessageSet._class.addMethod("restore:with:", "key params", "instance creation", 
	"\tnextStateId := (key copyUpTo: $-)." +
	"\n\tself systemNavigation perform: (key copyAfter: $-) withArguments: params asCollection",
	null, "2012-04-27T08:13:44Z", "mp");

jst.MessageSet.addMethod("saveAs:with:", "selector params", "state", 
	"\tself stateId ifNotNil: [" +
	"\n\t\tExtManager default provider set: self stateId, '-', selector value: params]",
	null, "2012-04-27T10:11:35Z", "mp");

jst.MessageSet.addMethod("buildPanels", "", "initialization", 
	"\tself closable: true;" +
	"\n\t\tstateful: true;" +
	"\n\t\tborder: false;" +
	"\n\t\twidth: 650;" +
	"\n\t\tminWidth: 500;" +
	"\n\t\theight: 450;" +
	"\n\t\tminHeight: 300;" +
	"\n\t\tplain: true;" +
	"\n\t\twithBorderLayout;" +
	"\n\t\tadd: (methodPanel := MessageSetPanel new region: ExtSplitRegion center);" +
	"\n\t\tadd: (ExtPanel new border: false; height: 250; region: (ExtSplitRegion south minHeight: 150); withFitLayout;" +
	"\n\t\t\tadd: (codePanel := BrowserCodePanel new);" +
	"\n\t\t\tyourself)",
	null, "2012-04-27T07:43:10Z", "mp"); //jst-tools

jst.MessageSet.addMethod("autoSelectString:", "aString", "accessing", 
	"\t\"Set the string to be highlighted when making new selections\"" +
	"\n\tautoSelectString := aString",
	null, "2011-09-27T07:38:51Z", "mp");

jst.MessageSet.addMethod("installDependents", "", "initialization", 
	"\tsuper installDependents." +
	"\n\tmethodPanel " +
	"\n\t\taddDependent: self",
	null, "2011-11-16T15:33:56Z", "mp");

jst.MessageSet.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #method & autoSelectString isEmptyOrNil not ifTrue: [" +
	"\n\t\tcodePanel editor highlightText: (anObject isNative " +
	"\n\t\t\tifTrue: [autoSelectString asFunctionName]" +
	"\n\t\t\tifFalse: [autoSelectString])" +
	"\n\t]",
	null, "2011-12-01T15:35:52Z", "mp");

jst.MessageSet.addMethod("initializeMessageList:", "anArray", "initialization", 
	"\tmethodPanel" +
	"\n\t\tinitializeFrom: anArray " +
	"\n\t\twith: self nameSelector " +
	"\n\t\tselectFirst: true",
	null, "2013-05-31T18:38:28Z", "mp");

jst.MessageSet.addMethod("nameSelector", "", "private", 
	"\t^ #printString",
	null, "2013-05-31T18:38:48Z", "mp");

// *** ClassBrowser ***

jst.ClassBrowser.addMethod("panels", "", "private", 
	"\t^ {classPanel. methodCategoryPanel. methodPanel. codePanel}",
	null, "2011-10-13T12:37:52Z", "mp");

jst.ClassBrowser.addMethod("buildPanels", "", "initialization", 
	"\tself closable: true;" +
	"\n\t\tstateful: true;" +
	"\n\t\twithoutBorder;" +
	"\n\t\tplain: true;" +
	"\n\t\twithBorderLayout;" +
	"\n\t\tadd: (classPanel := ClassPanel new region: (ExtRegion center minWidth: 145); border: false);" +
	"\n\t\tadd: (ExtPanel new width: 385; border: false; region: (ExtSplitRegion east minWidth: 290); withBorderLayout;" +
	"\n\t\t\tadd: (ExtPanel new region: (ExtRegion center minWidth: 145); border: false; withFitLayout;" +
	"\n\t\t\t\tadd: (methodCategoryPanel := MethodCategoryPanel new);" +
	"\n\t\t\t\tyourself);" +
	"\n\t\t\tadd: (methodPanel := MethodPanel new width: 190; region: (ExtSplitRegion east minWidth: 145));" +
	"\n\t\t\tyourself);" +
	"\n\t\tadd: (codePanel := BrowserCodePanel new height: 220; border: false; region: (ExtSplitRegion south minHeight: 150))",
	null, "2012-04-24T11:17:32Z", "mp");

jst.ClassBrowser.addMethod("installDependents", "", "initialization", 
	"\tclassPanel" +
	"\n\t\taddDependent: self;" +
	"\n\t\taddDependent: methodCategoryPanel;" +
	"\n\t\taddDependent: methodPanel;" +
	"\n\t\taddDependent: codePanel;" +
	"\n\t\taddDependent: codePanel editor." +
	"\n\tmethodCategoryPanel" +
	"\n\t\taddDependent: self;" +
	"\n\t\taddDependent: methodPanel;" +
	"\n\t\taddDependent: codePanel;" +
	"\n\t\taddDependent: codePanel editor." +
	"\n\tmethodPanel" +
	"\n\t\taddDependent: self." +
	"\n\tsuper installDependents",
	null, "2012-04-24T11:54:32Z", "mp");

jst.ClassBrowser.addMethod("classPanel", "", "accessing", 
	"\t^ classPanel",
	null, "2011-10-11T20:45:32Z", "mp");

jst.ClassBrowser.addMethod("methodCategoryPanel", "", "accessing", 
	"\t^ methodCategoryPanel",
	null, "2011-10-11T20:45:58Z", "mp");

jst.ClassBrowser.addMethod("methodCategoryChanged:on:", "oldCat aMethod", "events", 
	"\t| mcat |" +
	"\n\t(classPanel selectedItem isNil or: [" +
	"\n\t\tclassPanel selectedItem theNonMetaClass ~= aMethod receiver theNonMetaClass]) ifTrue: [" +
	"\n\t\t\"another or no class is selected\"" +
	"\n\t\t^ self]." +
	"\n\tmcat := methodPanel selectedItem == aMethod " +
	"\n\t\tifTrue: [aMethod category] " +
	"\n\t\tifFalse: [methodCategoryPanel selectedItem]." +
	"\n\t\"update method category list\"" +
	"\n\tmethodCategoryPanel setClass: aMethod receiver." +
	"\n\tmethodCategoryPanel selectItem: mcat silently: true." +
	"\n\tmcat ifNotNil: [" +
	"\n\t\t\"some method category is selected\"" +
	"\n\t\tmethodPanel selectedItem == aMethod ifTrue: [" +
	"\n\t\t\tmethodPanel showMethodsInCategory: aMethod category." +
	"\n\t\t\tmethodPanel selectItem: aMethod silently: true." +
	"\n\t\t\t^ self]." +
	"\n\t\tmcat name = oldCat ifTrue: [" +
	"\n\t\t\t\"disable a method in the old category\"" +
	"\n\t\t\t(methodPanel root detectChild: [:node | node link = aMethod]) ifNotNilDo: [:node |" +
	"\n\t\t\t\tmethodPanel root children remove: node]]." +
	"\n\t]." +
	"\n\t(mcat isNil or: [mcat = aMethod category]) ifTrue: [ | m |" +
	"\n\t \t\"show methods in the new category\"" +
	"\n\t\tm := methodPanel selectedItem." +
	"\n\t \tmethodPanel showMethodsInCategory: mcat." +
	"\n\t\tmethodPanel selectItem: m silently: true]",
	null, "2012-11-06T10:12:06Z", "mp");

jst.ClassBrowser.addMethod("selectionChanged", "", "events", 
	"\tself stateful & self stateId notNil ifTrue: [" +
	"\n\t\tExtManager default provider set: self stateId, '-selection' value: lastSelection]",
	null, "2012-05-02T08:45:52Z", "mp");

jst.ClassBrowser.addMethod("staterestoreEvent", "", "events", 
	"\t^ [:comp :state | " +
	"\n\t\tself addListener: (ExtDefaultListener new eventName: #show; single: true; handler: [:comp |" +
	"\n\t\t\t(ExtManager default provider get: self stateId, '-selection' default: nil) ifNotNilDo: [:obj |" +
	"\n\t\t\t\tself selectObject: obj]" +
	"\n\t\t])." +
	"\n\t]",
	null, "2012-04-24T12:13:10Z", "mp", 1);

jst.ClassBrowser.addMethod("staterestoreEvent", "", "events", 
	"\t^ [:comp :state | " +
	"\n\t\tself addListener: (ExtDefaultListener new eventName: #show; single: true; handler: [:c |" +
	"\n\t\t\t(ExtManager default provider get: self stateId, '-selection' default: nil) ifNotNilDo: [:o |" +
	"\n\t\t\t\tself selectObject: o]" +
	"\n\t\t])." +
	"\n\t]",
	null, "2013-10-11T23:18:48Z", "mp"); //jst-tools

// *** HierarchyBrowser ***

jst.HierarchyBrowser.addMethod("buildPanels", "", "initialization", 
	"\tsuper buildPanels." +
	"\n\tclassPanel tree rootVisible: true." +
	"\n\tself title: (defaultTitle := 'Hierarchy Browser');" +
	"\n\t\twidth: 650;" +
	"\n\t\tminWidth: 500;" +
	"\n\t\theight: 500;" +
	"\n\t\tminHeight: 400;" +
	"\n\t\tadd: (catPanel := ExtPanel new height: 25; region: ExtRegion north; border: true; padding: '3 5')",
	null, "2011-10-17T07:31:58Z", "mp");
/*
jst.HierarchyBrowser.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #class ifTrue: [" +
	"\n\t\tself title: defaultTitle, ': ', anObject name." +
	"\n\t\tcatPanel contents: anObject category name]",
	null, "2011-10-17T07:29:47Z", "mp");
*/
jst.HierarchyBrowser.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tlastSelection = anObject ifTrue: [" +
	"\n\t\t^ self]." +
	"\n\tlastSelection := anObject." +
	"\n\tself selectionChanged." +
	"\n\tanAspect = #class ifTrue: [" +
	"\n\t\tself title: defaultTitle, ': ', anObject name." +
	"\n\t\tcatPanel contents: anObject category name]",
	null, "2012-04-24T12:04:12Z", "mp");

jst.HierarchyBrowser.addMethod("selectObject:", "anObject", "accessing", 
	"\t| aClass |" +
	"\n\taClass := anObject class = MethodCategory ifTrue: [anObject subject] ifFalse: [" +
	"\n\t\t(anObject isKindOf: Method) ifTrue: [anObject receiver] ifFalse: [" +
	"\n\t\t\tanObject isBehavior " +
	"\n\t\t\t\tifTrue: [anObject] " +
	"\n\t\t\t\tifFalse: [anObject class]]]." +
	"\n\tclassPanel setHierarchyOn: aClass selectNode: [:node |" +
	"\n\t\tnode ensureVisible." +
	"\n\t\tnode select." +
	"\n\t\tanObject class = MethodCategory " +
	"\n\t\t\tifTrue: [methodCategoryPanel selectItem: anObject]" +
	"\n\t\t\tifFalse: [(anObject isKindOf: Method) ifTrue: [" +
	"\n\t\t\t\tmethodCategoryPanel selectItem: anObject category." +
	"\n\t\t\t\tmethodPanel selectItem: anObject]]." +
	"\n\t]",
	null, "2011-10-21T09:30:11Z", "mp");

//*** JSTSystemBrowser ***

jst.JSTSystemBrowser._class.addMethod("initialize", "", "class initialization", "\tSystemBrowser register: self");

jst.JSTSystemBrowser.addMethod("classCategoryPanel", "", "accessing", "\t^ classCategoryPanel",
	null, "2011-09-18T20:03:15Z", "mp");

jst.JSTSystemBrowser.addMethod("buildPanels", "", "initialization", 
	"\tsuper buildPanels." +
	"\n\tself title: (defaultTitle := 'JST System Browser');" +
	"\n\t\tonEscape: [];" +
	"\n\t\ticonCls: #tree;" +
	"\n\t\twidth: 800;" +
	"\n\t\tminWidth: 620;" +
	"\n\t\theight: 600;" +
	"\n\t\tminHeight: 450;" +
	"\n\t\tadd: (classCategoryPanel := ClassCategoryPanel new width: 195; region: (ExtSplitRegion west minWidth: 145))." +
	"\n\tcodePanel height: 300",
	null, "2012-04-23T18:44:00Z", "mp"); //jst-tools

jst.JSTSystemBrowser.addMethod("panels", "", "private", 
	"\t^ {classCategoryPanel}, super panels",
	null, "2011-10-13T13:52:43Z", "mp");

jst.JSTSystemBrowser.addMethod("installDependents", "", "initialization", 
	"\tclassCategoryPanel" +
	"\n\t\taddDependent: self;" +
	"\n\t\taddDependent: classPanel;" +
	"\n\t\taddDependent: methodCategoryPanel;" +
	"\n\t\taddDependent: methodPanel;" +
	"\n\t\taddDependent: codePanel;" +
	"\n\t\taddDependent: codePanel editor." +
	"\n\tsuper installDependents",
	null, "2011-10-13T13:54:05Z", "mp");

jst.JSTSystemBrowser.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tlastSelection = anObject ifTrue: [" +
	"\n\t\t^ self]." +
	"\n\tlastSelection := anObject." +
	"\n\tself selectionChanged." +
	"\n\tanAspect = #classCategory ifTrue: [" +
	"\n\t\t^ self title: defaultTitle]." +
	"\n\tanAspect = #class ifTrue: [" +
	"\n\t\tself title: defaultTitle, ': ', anObject name]",
	null, "2012-04-24T11:21:07Z", "mp"); //jst-tools

jst.JSTSystemBrowser.addMethod("classAdded:usingEditor:", "newClass ed", "updating", 
	"\t| cat cls |" +
	"\n\tcat := ed = codePanel editor ifTrue: [newClass category] ifFalse: [classCategoryPanel selectedItem]." +
	"\n\t(classCategoryPanel root children detect: [:n | " +
	"\n\t\tn link = newClass category] ifNone: nil) ifNil: [" +
	"\n\t\tclassCategoryPanel reset]." +
	"\n\tclassCategoryPanel selectItem: cat silently: true." +
	"\n\tcat = newClass category ifFalse: [" +
	"\n\t\t^ self].\t" +
	"\n\tcls := ed = codePanel editor ifTrue: [newClass] ifFalse: [classPanel tree selectedItem]." +
	"\n\tclassPanel setCategory: cat." +
	"\n\tclassPanel tree selectItem: cls silently: ed ~= codePanel editor",
	null, "2011-10-08T20:24:34Z", "mp");

jst.JSTSystemBrowser.addMethod("class:recategorizedFrom:usingEditor:", "aClass oldCat ed", "updating", 
	"\t| cat |" +
	"\n\tcat := (ed = codePanel editor or: [classPanel tree selectedItem = aClass]) " +
	"\n\t\tifTrue: [aClass category] " +
	"\n\t\tifFalse: [classCategoryPanel selectedItem]." +
	"\n\t(classCategoryPanel root children detect: [:n | " +
	"\n\t\tn link = aClass category] ifNone: nil) ifNil: [" +
	"\n\t\tclassCategoryPanel reset]." +
	"\n\tclassCategoryPanel selectItem: cat silently: true." +
	"\n\tcat = aClass category ifFalse: [" +
	"\n\t\t^ self].\t" +
	"\n\tclassPanel setCategory: cat." +
	"\n\tclassPanel tree selectItem: aClass silently: ed ~= codePanel editor",
	null, "2011-10-08T21:16:41Z", "mp");

jst.JSTSystemBrowser.addMethod("selectObject:", "anObject", "accessing", 
	"\t| aClass |" +
	"\n\tanObject class = ClassCategory ifTrue: [" +
	"\n\t\tclassCategoryPanel selectItem: anObject." +
	"\n\t\t^ self]." +
	"\n\tanObject class = MethodCategory ifTrue: [" +
	"\n\t\tclassCategoryPanel selectItem: anObject subject category." +
	"\n\t\tclassPanel selectItem: anObject subject." +
	"\n\t\tmethodCategoryPanel selectItem: anObject." +
	"\n\t\t^ self]." +
	"\n\t(anObject isKindOf: Method) ifTrue: [" +
	"\n\t\tclassCategoryPanel selectItem: anObject receiver category." +
	"\n\t\tclassPanel selectItem: anObject receiver." +
	"\n\t\tmethodCategoryPanel selectItem: anObject category." +
	"\n\t\tmethodPanel selectItem: anObject." +
	"\n\t\t^ self]." +
	"\n\taClass := anObject isBehavior ifTrue: [anObject] ifFalse: [anObject class]." +
	"\n\tclassCategoryPanel selectItem: aClass category." +
	"\n\tclassPanel selectItem: aClass",
	null, "2011-09-22T13:01:45Z", "mp");

jst.initializeClass(jst.JSTSystemBrowser);

//*** ChangesViewer ***

/*
jst.ChangesViewer.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tself title: 'JSmalltalk Changes';" +
	"\n\t\ticonCls: #javascript;" +
	"\n\t\twithoutBorder;" +
	"\n\t\tclosable: true;" +
	"\n\t\twidth: 680;" +
	"\n\t\tminWidth: 620;" +
	"\n\t\theight: 500;" +
	"\n\t\tminHeight: 450;" +
	"\n\t\tplain: true;" +
	"\n\t\twithBorderLayout;" +
	"\n\t\tadd: (ExtPanel new region: ExtRegion north; height: 30; layout: (ExtHBoxLayout new padding: 3; defaultMargins: '0 3 0 0');" +
	"\n\t\t\tadd: (ExtButton new text: 'Refresh' translated; width: 60; on: #click do: self refreshClick);" +
	"\n\t\t\tadd: (resetBtn := ExtButton new text: 'Reset' translated; width: 60; on: #click do: self resetClick; isDisabled: true);" +
	"\n\t\t\tadd: (rebuildBtn := ExtButton new text: 'Rebuild' translated; width: 60; on: #click do: [:btn :ev | self rebuild]);" +
	"\n\t\t\tyourself);" +
	"\n\t\tadd: (editor := ChangesEditor new region: ExtRegion center)." +
	"\n\teditor addDependent: self." +
	"\n\tChangeSet current contents ifNotEmptyDo: [:str |" +
	"\n\t\teditor resetContents: str." +
	"\n\t\tresetBtn isDisabled: str isEmpty]",
	null, "2012-03-31T16:18:26Z", "mp");
*/

jst.ChangesViewer.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tself title: 'JSmalltalk Changes';" +
	"\n\t\ticonCls: #javascript;" +
	"\n\t\twithoutBorder;" +
	"\n\t\tclosable: true;" +
	"\n\t\twidth: 680;" +
	"\n\t\tminWidth: 620;" +
	"\n\t\theight: 500;" +
	"\n\t\tminHeight: 450;" +
	"\n\t\tplain: true;" +
	"\n\t\twithBorderLayout;" +
	"\n\t\tadd: (ExtPanel new region: ExtRegion north; height: 30; layout: (ExtHBoxLayout new padding: 3; defaultMargins: '0 3 0 0');" +
	"\n\t\t\tadd: (ExtButton new text: 'Refresh' translated; width: 60; on: #click do: self refreshClick);" +
	"\n\t\t\tadd: (resetBtn := ExtButton new text: 'Reset' translated; width: 60; on: #click do: self resetClick);" +
	"\n\t\t\tadd: (rebuildBtn := ExtButton new text: 'Rebuild' translated; width: 60; on: #click do: [:btn :ev | self rebuild]);" +
	"\n\t\t\tyourself);" +
	"\n\t\tadd: (editor := CodeEditor new region: ExtRegion center)." +
	"\n\teditor mode: #javascript; addDependent: self." +
	"\n\tChangeSet current contents ifNotEmptyDo: [:str |" +
	"\n\t\teditor resetContents: str]." +
	"\n\trebuildBtn isDisabled: ChangeSet current isModified", // | editor contents isEmptyOrNil.
	null, "2012-04-06T07:49:06Z", "mp");

jst.ChangesViewer.addMethod("refreshClick", "", "events", 
	"\t^ [:btn :ev | editor resetContents: ChangeSet current contents. " +
	"\n\t\tresetBtn isDisabled: ChangeSet current contents isEmpty]", null, 
	"2011-08-30T07:33:38Z", "mp");
/*
jst.ChangesViewer.addMethod("resetClick", "", "events", 
	"\t^ [:btn :ev | UIManager default " +
	"\n\t\tconfirm: 'Your changes will be lost. Are you sure?' translated" +
	"\n\t\tthenDo: [ChangeSet current reset: [" +
	"\n\t\t\teditor resetContents: ChangeSet current contents." +
	"\n\t\t\tbtn beDisabled." +
	"\n\t\t\trebuildBtn beEnabled]]]",
	null, "2012-04-03T08:24:36Z", "mp");
*/

jst.ChangesViewer.addMethod("resetClick", "", "events", 
	"\t^ [:btn :ev | UIManager default " +
	"\n\t\tconfirm: 'Your changes will be lost. Are you sure?' translated" +
	"\n\t\tthenDo: [" +
	"\n\t\t\teditor resetContents: ''." +
	"\n\t\t\tbtn beDisabled." +
	"\n\t\t\trebuildBtn beEnabled." +
	"\n\t\t\tChangeSet current reset]]",
	null, "2012-04-05T15:39:16Z", "mp");

jst.ChangesViewer.addMethod("codeSaved:", "ed", "events", 
	"\tresetBtn isDisabled: editor contents isEmpty." +
	"\n\trebuildBtn isDisabled: true." +
	"\n\tChangeSet current contents: editor value",
	null, "2012-04-06T07:49:52Z", "mp");

jst.ChangesViewer.addMethod("beforecloseEvent", "", "events", 
	"\t^ [:w | editor editing ifTrue: [" +
	"\n\t\tself inform: 'Please finish editing first.' translated." +
	"\n\t\tfalse \"stops the event\"]]",
	null, "2012-02-01T10:25:00Z", "mp");

jst.ChangesViewer.addMethod("rebuild", "", "events", 
	"\tresetBtn beEnabled." +
	"\n\tChangeSet current rebuild." +
	"\n\teditor resetContents: ChangeSet current contents",
	null, "2012-04-05T15:40:15Z", "mp");

// *** CodeEditor ***

jst.CodeEditor.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tself autoScroll: true;" +
	"\n\t\tadd: (ExtPanel new " +
	"\n\t\t\twithoutBorder; withFitLayout;" +
	"\n\t\t\taddListener: self editorrenderEvent; " +
	"\n\t\t\tyourself)." +
	"\n\tediting := false." +
	"\n\ted := self createCodeMirror." +
	"\n\tEditorActions new on: self",
	null, "2012-01-31T21:35:37Z", "mp");

jst.CodeEditor.addMethod("bodyresizeEvent", "", "events", 
	"\t^ [:p :w :h | ed refresh]",
	null, "2012-02-22T08:56:56Z", "mp");

jst.CodeEditor.addMethod("contextMenu", "", "private", 
	"\t^ actions asMenu",
	null, "2012-01-31T21:38:28Z", "mp");

jst.CodeEditor.addMethod("object:", "anObject", "accessing", 
	"\tobject := anObject",
	null, "2012-01-12T10:35:16Z", "mp");

jst.CodeEditor.addMethod("object", "", "accessing", 
	"\t^ object",
	null, "2012-03-19T14:24:40Z", "mp");

jst.CodeEditor.addMethod("createCodeMirror", "", "initialization", 
	"\t^ CodeMirror new" +
	"\n\t\tmode: #smalltalk;" +
	"\n\t\ttheme: #jst;" +
	"\n\t\tlineNumbers: true;" +
	"\n\t\tmatchBrackets: true;" +
	"\n\t\tindentUnit: 0;" +
	"\n\t\tindentWithTabs: true;" +
	"\n\t\telectricChars: false;" +
	"\n\t\tenterMode: #keep;" +
	"\n\t\tonChange: [:edt | edt isDirty ~= editing ifTrue: [self toggleEditing]]",
	null, "2012-02-08T15:13:19Z", "mp");

jst.CodeEditor.addMethod("editorrenderEvent", "", "events", 
	"\t^ ExtDefaultListener new eventName: #afterrender; single: true; handler: [:p |" +
	"\n\t\ted replace: p element]",
	null, "2011-10-31T21:17:19Z", "mp");

jst.CodeEditor.addMethod("editing", "", "accessing", 
	"\t^ editing",
	null, "2011-10-30T21:00:54Z", "mp");

jst.CodeEditor.addMethod("contents", "", "accessing", 
	"\t^ ed value",
	null, "2011-10-30T21:02:09Z", "mp");

jst.CodeEditor.addMethod("contents:", "aString", "accessing", 
	"\tself resetContents: aString ",
	null, "2012-01-06T21:48:03Z", "mp");

jst.CodeEditor.addMethod("value", "", "accessing", 
	"\t^ ed value",
	null, "2011-10-30T21:02:09Z", "mp");

jst.CodeEditor.addMethod("value:", "anObject", "accessing", 
	"\ted value: anObject",
	null, "2011-10-30T21:06:49Z", "mp");

jst.CodeEditor.addMethod("rawValue:", "anObject", "accessing", 
	"\ted value: anObject",
	null, "2011-10-30T21:06:49Z", "mp", 1);

jst.CodeEditor.addMethod("rawValue:", "anObject", "accessing", 
	"\ted value: anObject; " +
	"\n\t\tclearHistory",
	null, "2013-10-09T13:01:03Z", "mp"); //jst-tools

jst.CodeEditor.addMethod("cancel", "", "actions", 
	"\tself reset",
	null, "2011-10-30T20:30:12Z", "mp");

jst.CodeEditor.addMethod("save", "", "actions", 
	"\tself resetContents: ed value." +
	"\n\tself sendEvent: #codeSaved: with: self",
	null, "2012-03-28T20:40:20Z", "mp");

jst.CodeEditor.addMethod("toggleEditing", "", "private", 
	"\t(editing := editing not) " +
	"\n\t\tifTrue: [self addCssClass: #editing] " +
	"\n\t\tifFalse: [self removeCssClass: #editing]." +
	"\n\tself sendEvent: #codeEditing: with: (editing ifTrue: [self])",
	null, "2011-10-31T23:08:33Z", "mp");

jst.CodeEditor.addMethod("resetContents:", "aString", "initialization", 
	"\ted resetContents: aString." +
	"\n\tediting ifTrue: [" +
	"\n\t\tself toggleEditing]",
	null, "2011-10-30T21:34:03Z", "mp", 1);

jst.CodeEditor.addMethod("resetContents:", "aString", "initialization", 
	"\ted resetContents: ''. \"jinak #highlightText: blbne\"" +
	"\n\ted resetContents: aString." +
	"\n\tediting ifTrue: [" +
	"\n\t\tself toggleEditing]",
	null, "2011-11-17T21:18:46Z", "mp", 1);

jst.CodeEditor.addMethod("resetContents:", "aString", "initialization", 
	"\ted resetContents: ''. \"jinak #highlightText: blbne\"" +
	"\n\ted resetContents: (aString ifNil: '')." +
	"\n\tediting ifTrue: [" +
	"\n\t\tself toggleEditing]",
	null, "2012-01-09T15:22:20Z", "mp", 1);

jst.CodeEditor.addMethod("resetContents:", "aString", "initialization", 
	"\t| cr |" +
	"\n\tcr := ed getCursor." +
	"\n\ted resetContents: ''. \"jinak #highlightText: blbne\"" +
	"\n\ted resetContents: (aString ifNil: '')." +
	"\n\tediting ifTrue: [" +
	"\n\t\tself toggleEditing]." +
	"\n\tcr ifNotNil: [" +
	"\n\t\ted setCursorAt: cr]",
	null, "2013-05-30T21:22:48Z", "mp"); //jst-tools

jst.CodeEditor.addMethod("reset", "", "initialization", 
	"\tself resetContents: ed startValue",
	null, "2011-10-30T21:34:03Z", "mp");

jst.CodeEditor.addMethod("highlightText:", "aString", "actions", 
	"\ted markText: aString with: 'jst-highlight'",
	null, "2011-11-16T15:40:55Z", "mp");

jst.CodeEditor.addMethod("focus", "", "rendering", 
	"\ted focus",
	null, "2011-11-18T14:52:13Z", "mp");

jst.CodeEditor.addMethod("refresh", "", "rendering", 
	"\tself ownerContainer asJsObject syncSize." +
	"\n\ted refresh",
	null, "2012-02-22T15:01:52Z", "mp");

jst.CodeEditor.addMethod("find:", "aString", "text selection", 
	"\ted focus." +
	"\n\t^ ed find: aString",
	null, "2011-11-18T14:57:39Z", "mp");

jst.CodeEditor.addMethod("findNext", "", "text selection", 
	"\ted focus." +
	"\n\t^ ed findNext",
	null, "2011-11-18T14:58:15Z", "mp");

jst.CodeEditor.addMethod("findPrevious", "", "text selection", 
	"\ted focus." +
	"\n\t^ ed findPrevious",
	null, "2011-11-18T14:58:29Z", "mp");

jst.CodeEditor.addMethod("selection", "", "text selection", 
	"\t^ ed selection",
	null, "2012-01-10T15:37:53Z", "mp");

jst.CodeEditor.addMethod("replaceSelection:", "aString", "text selection", 
	"\ted replaceSelection: aString",
	null, "2012-01-10T15:38:12Z", "mp");

jst.CodeEditor.addMethod("somethingSelected", "", "text selection", 
	"\t^ ed somethingSelected",
	null, "2012-01-10T15:38:33Z", "mp");

jst.CodeEditor.addMethod("markText:with:from:firstMatch:", "aString cssClass lineChar aBoolean", "text selection", 
	"\t^ ed markText: aString with: cssClass from: lineChar firstMatch: aBoolean",
	null, "2013-10-15T19:53:26Z", "mp"); //jst-tools

jst.CodeEditor.addMethod("redo", "", "history", 
	"\ted redo",
	null, "2011-11-23T12:53:08Z", "mp");

jst.CodeEditor.addMethod("redoSize", "", "history", 
	"\t^ ed historySize at: #redo",
	null, "2011-11-23T12:53:30Z", "mp");

jst.CodeEditor.addMethod("undoSize", "", "history", 
	"\t^ ed historySize at: #undo",
	null, "2011-11-23T12:53:40Z", "mp");
/*
jst.CodeEditor.addMethod("undo", "", "history", 
	"\ted undo",
	null, "2011-11-23T12:55:49Z", "mp");
*/
jst.CodeEditor.addMethod("undo", "", "history", 
	"\ted undo." +
	"\n\tself undoSize = 0 & editing ifTrue: [" +
	"\n\t\tself toggleEditing]",
	null, "2011-11-23T15:16:18Z", "mp");

jst.CodeEditor.addMethod("mode:", "anObject", "accessing", 
	"\ted mode: anObject",
	null, "2011-12-19T20:21:57Z", "mp");

jst.CodeEditor.addMethod("mode:", "anObject", "accessing", 
	"\ted mode: (anObject isMethod " +
	"\n\t\tifTrue: [anObject isNative ifTrue: #javascript ifFalse: #smalltalk]" +
	"\n\t\tifFalse: anObject).",
	null, "2011-12-19T21:36:31Z", "mp");

jst.CodeEditor.addMethod("lines", "", "accessing", 
	"\t^ ed lines",
	null, "2012-02-08T14:49:37Z", "mp");

jst.CodeEditor.addMethod("setCursorAt:", "position", "accessing cursor", 
	"\ted setCursorAt: position ",
	null, "2012-02-08T22:45:52Z", "mp");

jst.CodeEditor.addMethod("doIt", "", "actions", 
	"\t^ ed somethingSelected ifTrue: [" +
	"\n\t\tobject doIt: ed selection]",
	null, "2012-01-12T08:56:37Z", "mp");

/*
jst.CodeEditor.addMethod("printIt", "", "actions", 
	"\t^ ed somethingSelected ifTrue: [" +
	"\n\t\ted replaceSelection: ed selection, ' ', (object printIt: ed selection)]",
	null, "2012-01-12T10:20:52Z", "mp");
*/

jst.CodeEditor.addMethod("printIt", "", "actions", 
	"\t^ ed somethingSelected ifTrue: [ | c sel |" +
	"\n\t\tc := ed asJsObject perform: #getCursor with: true. \"start of selection?\"" +
	"\n\t\tsel := ed selection." +
	"\n\t\ted replaceSelection: ' ', (object printIt: ed selection)." +
	"\n\t\ted asJsObject perform: #replaceRange with: sel with: c." +
	"\n\t\ted focus]",
	null, "2012-01-12T17:30:07Z", "mp");

jst.CodeEditor.addMethod("inspectIt", "", "actions", 
	"\t^ ed somethingSelected ifTrue: [" +
	"\n\t\t(object doIt: ed selection) inspect]",
	null, "2012-01-12T08:57:55Z", "mp");

jst.CodeEditor.addMethod("readOnly:", "aBoolean", "accessing", 
	"\ted readOnly: aBoolean",
	null, "2012-02-15T22:39:10Z", "mp");

jst.CodeEditor.addMethod("readOnly", "", "accessing", 
	"\t^ ed readOnly",
	null, "2012-02-15T22:39:18Z", "mp");

jst.CodeEditor.addMethod("lineNumbers:", "aBoolean", "accessing", 
	"\ted lineNumbers: aBoolean",
	null, "2012-02-21T22:04:45Z", "mp");

/*
jst.CodeEditor.addMethod("displayPatchFrom:of:", "diffBuilder aMethod", "accessing", 
	"\tself contents: (String streamContents: [:s |" +
	"\n\t\ts nextPutAll: aMethod printMessagePattern; crlf." +
	"\n\t\tdiffBuilder buildPatchSequence do: [:line | " +
	"\n\t\t\ts nextPutAll: line value first, line value second; " +
	"\n\t\t\t\tcrlf]])." +
	"\n\t[diffBuilder displayPatchOn: ed] delayed: 10",
	null, "2013-05-30T21:57:42Z", "mp", 1);

jst.CodeEditor.addMethod("displayPatchFrom:of:", "diffBuilder aMethod", "accessing", 
	"\tself contents: (String streamContents: [:s |" +
	"\n\t\tdiffBuilder buildPatchSequence do: [:line | " +
	"\n\t\t\ts nextPutAll: line value first, line value second; " +
	"\n\t\t\t\tcrlf]])." +
	"\n\t[diffBuilder displayPatchOn: ed] delayed: 10",
	null, "2013-06-01T12:08:47Z", "mp");
*/

jst.CodeEditor.addMethod("displayPatchFrom:", "diffBuilder", "accessing", 
	"\tself contents: (String streamContents: [:s |" +
	"\n\t\tdiffBuilder buildPatchSequence do: [:line | " +
	"\n\t\t\ts nextPutAll: line value first, line value second] " +
	"\n\t\t\t\tseparatedBy: [s crlf]])." +
	"\n\t[diffBuilder displayPatchOn: ed] delayed: 10",
	null, "2013-06-03T13:33:33Z", "mp");

//Inspector - extensions

jst.Object.addMethod("inspectorClass", "", "*tools-inspector", 
	"\t^ Inspector",
	null, "2011-12-30T11:24:07Z", "mp");

jst.Object.addMethod("inspectWithLabel:", "aLabel", "*tools-inspector", 
	"\t^ ToolSet inspect: self label: aLabel",
	null, "2012-01-23T19:58:28Z", "mp");

jst.Object.addMethod("inspect", "", "*tools-inspector", 
	"\t\"Create and schedule an Inspector in which the user can examine the receiver's variables.\"" +
	"\n\t^ ToolSet inspect: self",
	null, "2012-01-23T19:59:06Z", "mp");

jst.Dictionary.addMethod("inspectorClass", "", "*tools-inspector", 
	"\t^ DictionaryInspector",
	null, "2011-12-30T11:23:34Z", "mp");

jst.Collection.addMethod("inspectorClass", "", "*tools-inspector", 
	"\t^ CollectionInspector",
	null, "2011-12-30T11:24:38Z", "mp");

jst.Interval.addMethod("inspectorClass", "", "*tools-inspector", 
	"\t^ Inspector",
	null, "2012-02-12T14:57:59Z", "mp");

jst.JSObjectProxy.addMethod("inspectorClass", "", "*tools-inspector", 
	"\t^ DictionaryInspector",
	null, "2012-01-23T10:08:55Z", "mp");

jst.Object.addMethod("defaultLabelForInspector", "", "*tools-inspector", 
	"\t\"Answer the default label to be used for an Inspector window on the receiver.\"" +
	"\n\t^ self class name",
	null, "2012-01-09T15:13:14Z", "mp");

jst.Number.addMethod("defaultLabelForInspector", "", "*tools-inspector", 
	"\t^ super defaultLabelForInspector, ': ', self printString",
	null, "2012-01-09T15:14:31Z", "mp");
/*
jst.Method.addMethod("defaultLabelForInspector", "", "*tools-inspector", 
	"\t^ super defaultLabelForInspector, ': #', selector",
	null, "2012-02-18T20:12:51Z", "mp");
*/
jst.Method.addMethod("defaultLabelForInspector", "", "*tools-inspector", 
	"\t^ receiver name, '>>', selector",
	null, "2012-04-19T07:12:52Z", "mp");

jst.Behavior.addMethod("inspectClassVars", "", "*tools-inspector", 
	"\t^ self classPool inspectWithLabel: 'Class variables in ', self theNonMetaClass name",
	null, "2012-01-23T22:08:26Z", "mp");

jst.Object.addMethod("inspectClassVars", "", "*tools-inspector", 
	"\t^ self class inspectClassVars",
	null, "2012-01-24T12:21:23Z", "mp");

jst.WrapperObject.addMethod("inspectorClass", "", "*tools-inspector", 
	"\t^ ProxyInspector",
	null, "2012-03-17T22:20:11Z", "mp");

jst.Object.addMethod("keys", "", "*tools-inspector", 
	"\t^ #()",
	null, "2012-03-26T10:17:19Z", "mp");

// *** Inspector ***

jst.Inspector.addMethod("initialize", "", "initialization", 
	"\tselectionIndex := 0",
	null, "2012-01-23T10:04:53Z", "mp");

jst.Inspector.addMethod("contents", "", "accessing", 
	"\t(JSObjectProxy isNeededOn: contents) ifTrue: [" +
	"\n\t\t^ JSObjectProxy new jsObject: contents]." +
	"\n\t^ contents",
	null, "2012-01-23T10:06:40Z", "mp");

jst.Inspector.addMethod("contents", "", "accessing", 
	"\t(JSObjectProxy isNeededOn: contents) ifTrue: [" +
	"\n\t\t^ JSObjectProxy new jsObject: contents]." +
	"\n\t^ object == contents jstWrapper | contents jstWrapper isNil" +
	"\n\t\tifTrue: [contents]" +
	"\n\t\tifFalse: [contents jstWrapper]",
	null, "2012-05-09T20:22:01Z", "mp");
/*
jst.Inspector.addMethod("contentString", "", "accessing", 
	"\t\"contents can be a native js object too\"" +
	"\n\t^ String streamContents: [:s | s print: contents]",
	null, "2012-01-13T21:09:33Z", "mp");

jst.Inspector.addMethod("contentString", "", "accessing", 
	"\t\"contents can be a native js object too\"" +
	"\n\t^ String streamContents: [:s | " +
	"\n\t\t((JSObjectProxy isNeededOn: contents) or: [" +
	"\n\t\t\tobject == contents jstWrapper | contents jstWrapper isNil])" +
	"\n\t\t\t\tifTrue: [s print: contents] " +
	"\n\t\t\t\tifFalse: [contents jstWrapper printOn: s]]",
	null, "2012-05-09T20:23:29Z", "mp");
*/
jst.Inspector.addMethod("contentString", "", "accessing", 
	"\t\"contents can be a native js object too\"" +
	"\n\t^ String streamContents: [:s | " +
	"\n\t\t((JSObjectProxy isNeededOn: contents) or: [" +
	"\n\t\t\tobject == contents jstWrapper | contents jstWrapper isNil])" +
	"\n\t\t\t\tifTrue: [s print: contents] " +
	"\n\t\t\t\tifFalse: [contents jstWrapper printOn: s]] limitedTo: 1000",
	null, "2012-06-08T13:38:38Z", "mp");

jst.Inspector.addMethod("baseFieldList", "", "accessing", 
	"\t\"Answer an Array consisting of 'self' and the instance variable names of the inspected object.\"" +
	"\n\t^ baseFieldList ifNil: [" +
	"\n\t\tbaseFieldList := {'self'. 'all inst vars'}, object class allInstVarNames]",
	null, "2012-02-11T09:38:19Z", "mp");

jst.Inspector.addMethod("fieldList", "", "accessing", 
	"\t^ self baseFieldList",
	null, "2011-12-30T10:50:54Z", "mp");

jst.Inspector.addMethod("i1", "", "accessing", 
	"\t\"This is the max index shown before skipping to the last i2 elements of very long arrays\"" +
	"\n\t^ 100",
	null, "2011-12-30T10:55:31Z", "mp");

jst.Inspector.addMethod("i2", "", "accessing", 
	"\t\"This is the number of elements to show at the end of very long arrays\"" +
	"\n\t^ 10",
	null, "2011-12-30T10:55:58Z", "mp");

jst.Inspector._class.addMethod("inspect:", "anObject", "instance creation", 
	"\t\"Answer an instance of me to provide an inspector for anObject.\"" +
	"\n\t" +
	"\n\t\"We call basicNew to avoid a premature initialization; the instance method " +
	"\n\tinspect: anObject will do a self initialize.\"" +
	"\n\t^ anObject inspectorClass basicNew inspect: anObject",
	null, "2011-12-30T11:29:15Z", "mp");

jst.Inspector.addMethod("inspect:", "anObject", "initialization", 
	"\t\"Set 'object' before sending the initialize message, because some implementations" +
	"\n\tof initialize (e.g., in DictionaryInspector) require 'object' to be non-nil.\"" +
	"\n\tobject := anObject." +
	"\n\tbaseFieldList := nil." +
	"\n\tself initialize",
	null, "2012-02-11T09:38:43Z", "mp");

/*
jst.Inspector.addMethod("selection", "", "selecting", 
	"\t\"The receiver has a list of variables of its inspected object." +
	"\n\tOne of these is selected. Answer the value of the selected variable.\"" +
	"\n\t| basicIndex |" +
	"\n\tselectionIndex = 0 ifTrue: [" +
	"\n\t\t^ '']." +
	"\n\tselectionIndex = 1 ifTrue: [" +
	"\n\t\t^ object]." +
	"\n\tselectionIndex = 2 ifTrue: [" +
	"\n\t\t^ object longPrintStringLimitedTo: 20000]." +
	"\n\t(selectionIndex - 2) <= object class instSize ifTrue: [" +
	"\n\t\t^ object instVarAt: selectionIndex - 2]." +
	"\n\tbasicIndex := selectionIndex - 2 - object class instSize." +
	"\n\t^ (object basicSize <= (self i1 + self i2)  or: [basicIndex <= self i1])" +
	"\n\t\tifTrue: [object basicAt: basicIndex]" +
	"\n\t\tifFalse: [object basicAt: object basicSize - (self i1 + self i2) + basicIndex]",
	null, "2012-01-01T20:57:02Z", "mp");
*/

jst.Inspector.addMethod("selection", "", "selecting", 
	"\t\"The receiver has a list of variables of its inspected object." +
	"\n\tOne of these is selected. Answer the value of the selected variable.\"" +
	"\n\t| basicIndex |" +
	"\n\tselectionIndex = 0 ifTrue: [" +
	"\n\t\t^ '']." +
	"\n\tselectionIndex = 1 ifTrue: [" +
	"\n\t\t\"self\"" +
	"\n\t\t^ object]." +
	"\n\tselectionIndex = 2 ifTrue: [" +
	"\n\t\t\"all inst vars\"" +
	"\n\t\t^ object longPrintStringLimitedTo: 1000]." +
	"\n\t^ object instVarAt: selectionIndex - 2",
	null, "2012-06-08T13:47:35Z", "mp");

jst.Inspector.addMethod("toggleIndex:", "anInteger", "selecting", 
	"\t\"The receiver has a list of variables of its inspected object. One of these is selected.\"" +
	"\n\tselectionIndex = anInteger ifFalse: [" +
	"\n\t\t\"different index, new selection\"" +
	"\n\t\tselectionIndex := anInteger." +
	"\n\t\tcontents := self selection].",
	null, "2012-01-01T22:12:22Z", "mp");

jst.Inspector.addMethod("object", "", "accessing", 
	"\t^ object",
	null, "2012-01-12T19:47:16Z", "mp");

jst.Inspector.addMethod("fieldListChanged", "", "testing", 
	"\t| list |" +
	"\n\tlist := baseFieldList." +
	"\n\tbaseFieldList := nil." +
	"\n\t^ list ~= self baseFieldList",
	null, "2012-02-11T09:43:49Z", "mp");

jst.Inspector.addMethod("update", "", "updating", 
	"\tcontents := self selection",
	null, "2012-02-11T20:51:42Z", "mp");

// *** CollectionInspector ***

jst.CollectionInspector.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tsize := object size",
	null, "2012-02-12T14:27:03Z", "mp");

jst.CollectionInspector.addMethod("fieldListChanged", "", "testing", 
	"\t^ super fieldListChanged ifFalse: [ | s |" +
	"\n\t\ts := size." +
	"\n\t\tsize := object size." +
	"\n\t\ts ~= size]",
	null, "2012-02-12T14:28:45Z", "mp", 1);

jst.CollectionInspector.addMethod("fieldListChanged", "", "testing", 
	"\t^ super fieldListChanged or: [" +
	"\n\t\t| s |" +
	"\n\t\ts := size." +
	"\n\t\tsize := object size." +
	"\n\t\ts ~= size]",
	null, "2014-03-06T11:07:14Z", "mp"); //jst-tools

jst.CollectionInspector.addMethod("fieldList", "", "accessing", 
	"\tobject ifNil: [" +
	"\n\t\t^ OrderedCollection new]." +
	"\n\t^ self baseFieldList ," +
	"\n\t\t(object size <= (self i1 + self i2)" +
	"\n\t\t\tifTrue: [(1 to: object size)" +
	"\n\t\t\t\t\t\tcollect: [:i | i printString]]" +
	"\n\t\t\tifFalse: [(1 to: self i1) , (object size-(self i2-1) to: object size)" +
	"\n\t\t\t\t\t\tcollect: [:i | i printString]])",
	null, "2011-12-30T10:57:28Z", "mp");

jst.CollectionInspector.addMethod("selectedObjectIndex", "", "selecting", 
	"\t\"Answer the index of the inspectee's collection that the current selection refers to.\"" +
	"\n\t| basicIndex |" +
	"\n\tbasicIndex := selectionIndex - 2 - object class instSize." +
	"\n\t^ (object size <= (self i1 + self i2)  or: [basicIndex <= self i1])" +
	"\n\t\tifTrue: [basicIndex]" +
	"\n\t\tifFalse: [object size - (self i1 + self i2) + basicIndex]",
	null, "2012-01-01T19:59:55Z", "mp");

jst.CollectionInspector.addMethod("selection", "", "selecting", 
	"\t\"The receiver has a list of variables of its inspected object." +
	"\n\tOne of these is selected. Answer the value of the selected variable.\"" +
	"\n\t(selectionIndex - 2) <= object class instSize ifTrue: [" +
	"\n\t\t^ super selection]." +
	"\n\t^ object at: self selectedObjectIndex",
	null, "2012-01-01T20:02:30Z", "mp");

// *** DictionaryInspector ***

jst.DictionaryInspector.addMethod("fieldList", "", "accessing", 
	"\t^ self baseFieldList, (keyArray collect: [:key | key printString])",
	null, "2011-12-30T11:01:15Z", "mp");

jst.DictionaryInspector.addMethod("calculateKeyArray", "", "selecting", 
	"\t\"Recalculate the KeyArray from the object being inspected\"" +
	"\n\tkeyArray := object keys asSortedCollection",
	null, "2011-12-30T19:20:19Z", "mp");

jst.DictionaryInspector.addMethod("numberOfFixedFields", "", "private", 
	"\t^ 2 + object class instSize",
	null, "2012-01-01T20:07:03Z", "mp");

jst.DictionaryInspector.addMethod("selection", "", "selecting", 
	"\tselectionIndex <= (self numberOfFixedFields) ifTrue: [" +
	"\n\t\t^ super selection]." +
	"\n\t^ object at: (keyArray at: selectionIndex - self numberOfFixedFields) ifAbsent: nil",
	null, "2012-01-01T20:08:03Z", "mp");

jst.DictionaryInspector.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tself calculateKeyArray",
	null, "2011-12-30T19:20:45Z", "mp");

jst.DictionaryInspector.addMethod("fieldListChanged", "", "testing", 
	"\t^ super fieldListChanged ifFalse: [ | arr |" +
	"\n\t\tarr := keyArray." +
	"\n\t\tself calculateKeyArray." +
	"\n\t\tarr ~= keyArray]",
	null, "2012-02-11T21:06:24Z", "mp", 1);

jst.DictionaryInspector.addMethod("fieldListChanged", "", "testing", 
	"\t^ super fieldListChanged or: [" +
	"\n\t\t| arr |" +
	"\n\t\tarr := keyArray." +
	"\n\t\tself calculateKeyArray." +
	"\n\t\tarr ~= keyArray]",
	null, "2014-03-06T11:07:19Z", "mp"); //jst-tools

//*** ProxyInspector ***

jst.ProxyInspector.addMethod("calculateKeyArray", "", "selecting", 
	"\tkeyArray := object asJsObject keys asSortedCollection",
	null, "2012-01-18T08:11:06Z", "mp");

jst.ProxyInspector.addMethod("selection", "", "selecting", 
	"\tselectionIndex <= (self numberOfFixedFields) ifTrue: [" +
	"\n\t\t^ super selection]." +
	"\n\t^ object asJsObject at: (keyArray at: selectionIndex - self numberOfFixedFields)",
	null, "2012-01-18T08:11:20Z", "mp");

// extensions

jst.ExtObjectWrapper.addMethod("inspectorClass", "", "*tools-inspector", 
	"\t^ DictionaryInspector",
	null, "2012-03-15T14:11:44Z", "mp");

jst.ExtWindowGroup.addMethod("inspectorClass", "", "*tools-inspector", 
	"\t^ ProxyInspector",
	null, "2012-01-20T13:31:08Z", "mp");

jst.ExtEventObject.addMethod("inspectorClass", "", "*tools-inspector", 
	"\t^ ProxyInspector",
	null, "2013-11-15T15:09:50Z", "mp"); //jst-ext-core

// *** InspectorEditor ***

/*
jst.InspectorEditor.addMethod("createCodeMirror", "", "initialization", 
	"\t^ CodeMirror new" +
	"\n\t\tmode: 'text/plain';" +
	"\n\t\ttheme: #default;" +
	"\n\t\tindentUnit: 1;" +
	"\n\t\tindentWithTabs: true;" +
	"\n\t\tlineWrapping: true;" +
	"\n\t\ttabSize: 2",
	null, "2012-01-07T15:34:42Z", "mp");
*/
jst.InspectorEditor.addMethod("createCodeMirror", "", "initialization", 
	"\t^ CodeMirror new" +
	"\n\t\tmode: #javascript;" +
	"\n\t\ttheme: #default.",
	null, "2012-01-07T17:41:14Z", "mp");

// *** InspectorFieldPanel ***

jst.InspectorFieldPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tself " +
	"\n\t\tautoScroll: true;" +
	"\n\t\tcontainerScroll: true;" +
	"\n\t\trootVisible: false;" +
	"\n\t\troot: (ExtTreeNode new children: #())." +
	"\n\tactions := {" +
	"\n\t\tInspectAction on: #selectedValue of: self." +
	"\n\t\tnil." +
	"\n\t\tBrowseAction on: #selectedValue of: self." +
	"\n\t\tBrowseHierarchyAction on: #selectedValue of: self." +
	"\n\t\tnil." +
	"\n\t\tInstVarRefsAction on: #selectedClass of: self." +
	"\n\t\tClassVarRefsAction on: #selectedClass of: self." +
	"\n\t\tClassVariablesAction on: #selectedClass of: self." +
	"\n\t\tClassRefsAction on: #selectedClass of: self." +
	"\n\t\tnil." +
	"\n\t\tClassInstancesAction on: #selectedClass of: self." +
	"\n\t\tClassSubInstAction on: #selectedClass of: self." +
	"\n\t}",
	null, "2013-02-21T09:21:19Z", "mp");

jst.InspectorFieldPanel.addMethod("selectedValue", "", "accessing", 
	"\t^ self ownerContainer model contents",
	null, "2012-01-30T15:01:20Z", "mp");

jst.InspectorFieldPanel.addMethod("selectedClass", "", "accessing", 
	"\t^ self selectedValue class",
	null, "2012-01-30T15:06:28Z", "mp");

// *** InspectorPanel ***

jst.InspectorPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tself border: false;" +
	"\n\t\twithBorderLayout;" +
	"\n\t\tadd: (fieldPanel := InspectorFieldPanel new " +
	"\n\t\t\tregion: (ExtSplitRegion west minWidth: 80); " +
	"\n\t\t\twidth: 150);" +
	"\n\t\tadd: (valuePanel := InspectorEditor new region: (ExtRegion center minWidth: 80))",
	null, "2012-01-21T21:53:33Z", "mp");

jst.InspectorPanel.addMethod("model", "", "accessing", 
	"\t^ model",
	null, "2012-01-30T15:01:35Z", "mp");

jst.InspectorPanel.addMethod("installListeners", "", "initialization", 
	"\tsuper installListeners." +
	"\n\tself installListenersOn: fieldPanel prefix: #field." +
	"\n\tself installListenersOn: fieldPanel selectionModel prefix: #node.",
	null, "2012-01-02T14:08:31Z", "mp");

jst.InspectorPanel.addMethod("fieldclickEvent", "", "events", 
	"\t^ [:node :ev | self fieldChanged: node link]",
	null, "2012-01-01T17:36:39Z", "mp");

jst.InspectorPanel.addMethod("nodeselectionchangeEvent", "", "events", 
	"\t^ [:m :node | self fieldChanged: node link]",
	null, "2012-01-01T17:37:39Z", "mp");

jst.InspectorPanel.addMethod("fieldChanged:", "index", "private", 
	"\tmodel toggleIndex: index." +
	"\n\tvaluePanel contents: model contentString" +
	"\n\t",
	null, "2012-01-13T21:09:49Z", "mp");

jst.InspectorPanel.addMethod("setModel:", "anInspector", "accessing", 
	"\t| nodeList |" +
	"\n\tmodel := anInspector." +
	"\n\tnodeList := OrderedCollection new." +
	"\n\tmodel fieldList withIndexDo: [:n :i |" +
	"\n\t\tnodeList add: (ExtTreeNode new  text: n; leaf: true; link: i)]." +
	"\n\tfieldPanel root: (ExtTreeNode new children: nodeList)." +
	"\n\tvaluePanel object: anInspector object." +
	"\n\tvaluePanel contents: ''",
	null, "2012-01-12T19:47:49Z", "mp");
/*
 * TODO: nefungovalo, asi je jeste 'zakopany pes' v localreturn
jst.InspectorPanel.addMethod("update", "", "updating", 
	"\tmodel fieldListChanged ifTrue: [" +
	"\n\t\t^ self setModel: model]." +
	"\n\t(fieldPanel selectionModel selectedNode notNil and: [valuePanel editing not]) ifTrue: [" +
	"\n\t\tmodel update." +
	"\n\t\tvaluePanel contents ~= model contentString ifTrue: [" +
	"\n\t\t\tvaluePanel contents: model contentString]" +
	"\n\t]" +
	"\n\t",
	null, "2012-02-11T21:09:05Z", "mp");
*/
jst.InspectorPanel.addMethod("update", "", "updating", 
	"\tmodel fieldListChanged ifTrue: [" +
	"\n\t\tself setModel: model" +
	"\n\t] ifFalse: [" +
	"\n\t\t(fieldPanel selectionModel selectedNode notNil and: [valuePanel editing not]) ifTrue: [" +
	"\n\t\t\tmodel update." +
	"\n\t\t\tvaluePanel contents ~= model contentString ifTrue: [" +
	"\n\t\t\t\tvaluePanel contents: model contentString]" +
	"\n\t\t]" +
	"\n\t]" +
	"\n\t",
	null, "2012-04-09T20:25:17Z", "mp");

// *** InspectorBrowser ***

jst.InspectorBrowser.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tself closable: true;" +
	"\n\t\twidth: 350;" +
	"\n\t\tminWidth: 200;" +
	"\n\t\theight: 300;" +
	"\n\t\tminHeight: 200;" +
	"\n\t\tplain: true;" +
	"\n\t\twithBorderLayout;" +
	"\n\t\tborder: false;" +
	"\n\t\tadd: (inspectPanel := InspectorPanel new region: ExtSplitRegion center);" +
	"\n\t\tadd: (evalPanel := CodeEditor new region: (ExtSplitRegion south minHeight: 50); height: 80)",
	null, "2012-01-08T21:42:02Z", "mp");

jst.InspectorBrowser.addMethod("inspect:", "anObject", "initialization", 
	"\tinspectPanel setModel: (Inspector inspect: anObject)." +
	"\n\tevalPanel object: anObject." +
	"\n\tself title: anObject defaultLabelForInspector",
	null, "2012-01-12T19:52:16Z", "mp");

jst.InspectorBrowser._class.addMethod("openOn:withLabel:", "anObject aString", "instance creation", 
	"\t| win |" +
	"\n\twin := self openRelativeTo: (Point x: 50 y: 30)." +
	"\n\twin inspect: anObject." +
	"\n\twin title: aString." +
	"\n\t^ win",
	null, "2012-01-23T20:39:56Z", "mp");

jst.InspectorBrowser._class.addMethod("openOn:", "anObject", "instance creation", 
	"\t^ self openOn: anObject withLabel: anObject defaultLabelForInspector",
	null, "2012-01-23T20:41:39Z", "mp");

jst.InspectorBrowser.addMethod("inspect:", "anObject", "initialization", 
	"\tinspectPanel setModel: (Inspector inspect: anObject)." +
	"\n\tevalPanel object: anObject." +
	"\n\tself title: anObject defaultLabelForInspector." +
	"\n\tupdater ifNil: [" +
	"\n\t\tupdater := TaskRunner new" +
	"\n\t\t\tinterval: 1500;" +
	"\n\t\t\ton: #update of: inspectPanel;" +
	"\n\t\t\tstart]",
	null, "2012-02-11T08:36:16Z", "mp");

jst.InspectorBrowser.addMethod("beforecloseEvent", "", "events", 
	"\t^ [:w | updater ifNotNil: [updater stop]]",
	null, "2012-02-10T21:24:40Z", "mp");

// *** BrowseAction ***

jst.BrowseAction.addMethod("execute", "", "execution", 
	"\tself target browse",
	null, "2012-01-26T14:50:21Z", "mp");

jst.BrowseAction.addMethod("initialize", "", "initialization", 
	"\tlabel := 'browse'." +
	"\n\thotKey := 'b'." +
	"\n\ticon := 'tree'",
	null, "2012-01-26T14:52:55Z", "mp");

// *** BrowseHierarchyAction ***

jst.BrowseHierarchyAction.addMethod("initialize", "", "initialization", 
	"\tlabel := 'browse hierarchy'",
	null, "2012-01-27T15:05:27Z", "mp");

jst.BrowseHierarchyAction.addMethod("execute", "", "execution", 
	"\tself target browseHierarchy",
	null, "2012-01-27T15:05:41Z", "mp");

jst.BrowseHierarchyAction.addMethod("buttonLabel", "", "accessing", 
	"\t^ 'hierarchy' translated",
	null, "2012-01-28T22:46:23Z", "mp");

// *** BrowseSendersAction ***

jst.BrowseSendersAction.addMethod("initialize", "", "initialization", 
	"\tlabel := 'senders'." +
	"\n\thotKey := 'n'",
	null, "2012-01-27T15:10:47Z", "mp");

jst.BrowseSendersAction.addMethod("buildMenuItems", "", "private", 
	"\tmenu" +
	"\n\t\tadd: (ExtMenuItem new text: self target selector); " +
	"\n\t\taddSeparator." +
	"\n\tself target selectors do: [:sel |" +
	"\n\t\tmenu add: (ExtMenuItem new text: sel)]." +
	"\n\tmenu on: #itemclick do: [:it :ev | self executeOn: it]",
	null, "2012-01-27T19:51:57Z", "mp");

jst.BrowseSendersAction.addMethod("executeOn:", "item", "executing", 
	"\tself systemNavigation browseAllCallsOn: (item text first = $# ifTrue: [item text allButFirst] ifFalse: [item text])",
	null, "2012-01-27T19:56:11Z", "mp");

jst.BrowseSendersAction.addMethod("execute", "", "executing", 
	"\tself systemNavigation browseAllCallsOn: self target selector",
	null, "2012-01-27T21:17:18Z", "mp");

// *** BrowseImplementorsAction ***

jst.BrowseImplementorsAction.addMethod("initialize", "", "initialization", 
	"\tlabel := 'implementors'." +
	"\n\thotKey := 'm'",
	null, "2012-01-27T20:09:28Z", "mp");

jst.BrowseImplementorsAction.addMethod("executeOn:", "item", "executing", 
	"\tself systemNavigation browseAllImplementorsOf: (item text first = $# ifTrue: [item text allButFirst] ifFalse: [item text])",
	null, "2012-01-27T20:10:25Z", "mp");

jst.BrowseImplementorsAction.addMethod("execute", "", "executing", 
	"\tself systemNavigation browseAllImplementorsOf: self target selector",
	null, "2012-01-27T21:18:26Z", "mp");

// *** MethodVersionsAction ***

jst.MethodVersionsAction.addMethod("initialize", "", "initialization", 
	"\tlabel := 'versions'",
	null, "2012-01-28T21:59:21Z", "mp");

jst.MethodVersionsAction.addMethod("execute", "", "actions", 
	"\tToolSet browseVersionsForClass: self target receiver selector: self target selector",
	null, "2013-06-03T06:27:08Z", "mp");

// *** InheritanceAction ***

jst.InheritanceAction.addMethod("execute", "", "execution", 
	"\tself systemNavigation " +
	"\n\t\tmethodHierarchyBrowserForClass: self target receiver " +
	"\n\t\tselector: self target selector",
	null, "2012-01-28T22:31:31Z", "mp");

jst.InheritanceAction.addMethod("initialize", "", "initialization", 
	"\tlabel := 'inheritance'." +
	"\n\thotKey := 'i'",
	null, "2012-01-28T22:33:24Z", "mp");

// *** InstVarRefsAction ***

jst.InstVarRefsAction.addMethod("initialize", "", "initialization", 
	"\tlabel := 'inst var refs'." +
	"\n\taction := #allInstVarNames",
	null, "2012-01-29T21:00:43Z", "mp", 1);

jst.InstVarRefsAction.addMethod("initialize", "", "initialization", 
	"\tlabel := 'inst var refs'." +
	"\n\taction := #instVarNames",
	null, "2013-06-10T12:37:21Z", "mp"); //jst-tools

jst.InstVarRefsAction.addMethod("executeOn:", "item", "execution", 
	"\tself systemNavigation browseAllAccessesTo: item text from: self target",
	null, "2012-01-29T21:07:58Z", "mp");

jst.InstVarRefsAction.addMethod("buildMenuItems", "", "private", 
	"\t(self target perform: action) asSortedCollection do: [:sel |" +
	"\n\t\tmenu add: (ExtMenuItem new text: sel)]." +
	"\n\tmenu items size > 0 " +
	"\n\t\tifTrue: [menu on: #itemclick do: [:item :ev | self executeOn: item]]" +
	"\n\t\tifFalse: [menu add: (ExtMenuItem new text: '- empty -' translated)]",
	null, "2012-01-29T21:18:21Z", "mp", 1);

jst.InstVarRefsAction.addMethod("buildMenuItems", "", "private", 
	"\tself target withAllSuperclasses reverseDo: [:cls |" +
	"\n\t\t(cls perform: action) ifNotEmptyDo: [:coll |" +
	"\n\t\t\tmenu items size > 0 ifTrue: [" +
	"\n\t\t\t\tmenu addSeparator]." +
	"\n\t\t\tcoll do: [:sel | " +
	"\n\t\t\t\tmenu add: (ExtMenuItem new text: sel)]" +
	"\n\t\t]" +
	"\n\t]." +
	"\n\tmenu items size > 0 " +
	"\n\t\tifTrue: [menu on: #itemclick do: [:item :ev | self executeOn: item]]" +
	"\n\t\tifFalse: [menu add: (ExtMenuItem new text: '- empty -' translated)] ",
	null, "2013-06-10T13:55:50Z", "mp", 1);

jst.InstVarRefsAction.addMethod("buildMenuItems", "", "private", 
	"\tself target withAllSuperclasses reverseDo: [:cls |" +
	"\n\t\t(cls perform: action) ifNotEmptyDo: [:coll |" +
	"\n\t\t\tmenu items size > 0 ifTrue: [" +
	"\n\t\t\t\tmenu addSeparator]." +
	"\n\t\t\tcoll do: [:sel | " +
	"\n\t\t\t\tmenu add: (ExtMenuItem new text: sel)]" +
	"\n\t\t]" +
	"\n\t]." +
	"\n\tmenu items size > 0 " +
	"\n\t\tifTrue: [menu on: #itemclick do: [:item :ev | " +
	"\n\t\t\titem isSeparator ifFalse: [" +
	"\n\t\t\t\tself executeOn: item]]]" +
	"\n\t\tifFalse: [menu add: (ExtMenuItem new text: '- empty -' translated)] ",
	null, "2013-12-18T21:06:28Z", "mp"); //jst-tools

jst.InstVarRefsAction.addMethod("buttonLabel", "", "accessing", 
	"\t^ 'inst vars' translated",
	null, "2012-01-29T21:21:24Z", "mp");

// *** ClassVarRefsAction ***

jst.ClassVarRefsAction.addMethod("initialize", "", "initialization", 
	"\tlabel := 'class var refs'." +
	"\n\taction := #allClassVarNames",
	null, "2012-01-29T21:01:39Z", "mp", 1);

jst.ClassVarRefsAction.addMethod("initialize", "", "initialization", 
	"\tlabel := 'class var refs'." +
	"\n\taction := #classVarNames",
	null, "2013-06-10T12:37:35Z", "mp"); //jst-tools

jst.ClassVarRefsAction.addMethod("target", "", "accessing", 
	"\t^ super target ifNotNilDo: [:cls | " +
	"\n\t\tcls theNonMetaClass]",
	null, "2013-06-10T12:49:46Z", "mp");

jst.ClassVarRefsAction.addMethod("buttonLabel", "", "accessing", 
	"\t^ 'class vars' translated",
	null, "2012-01-29T21:23:22Z", "mp");

// *** ClassRefsAction ***

jst.ClassRefsAction.addMethod("initialize", "", "initialization", 
	"\tlabel := 'class refs'",
	null, "2012-01-30T10:52:03Z", "mp");

jst.ClassRefsAction.addMethod("execute", "", "executing", 
	"\tself systemNavigation browseAllCallsOnClass: self target",
	null, "2012-01-30T11:00:13Z", "mp");

// *** ClassInstancesAction ***

jst.ClassInstancesAction.addMethod("initialize", "", "initialization", 
	"\tlabel := 'inspect instances'",
	null, "2013-02-21T08:43:51Z", "mp");

jst.ClassInstancesAction.addMethod("isEnabled", "", "testing", 
	"\t^ self target == ExtComponent or: [self target inheritsFrom: ExtComponent]",
	null, "2013-02-21T08:56:59Z", "mp", 1);

jst.ClassInstancesAction.addMethod("isEnabled", "", "testing", 
	"\t^ super isEnabled and: [" +
	"\n\t\tself target == ExtComponent or: [self target inheritsFrom: ExtComponent ]]",
	null, "2013-06-23T09:32:44Z", "mp"); //jst-tools

jst.ClassInstancesAction.addMethod("execute", "", "executing", 
	"\tself target allInstances " +
	"\n\t\tifEmpty: [" +
	"\n\t\t\tself inform: self target name -> 'There are no instances of the class'] " +
	"\n\t\tifNotEmptyDo: [:arr |" +
	"\n\t\t\tToolSet inspect: arr label: ('The {2} instances of {1}' format: {self target name. arr size})]",
	null, "2013-02-21T09:09:09Z", "mp");

// *** ClassSubInstAction ***

jst.ClassSubInstAction.addMethod("initialize", "", "initialization", 
	"\tlabel := 'inspect subinstances'",
	null, "2013-02-21T08:54:34Z", "mp");

jst.ClassSubInstAction.addMethod("execute", "", "executing", 
	"\tself target allSubInstances " +
	"\n\t\tifEmpty: [" +
	"\n\t\t\tself inform: self target name -> 'There are no subinstances of the class'] " +
	"\n\t\tifNotEmptyDo: [:arr |" +
	"\n\t\t\tToolSet inspect: arr label: ('The {2} instances of {1} & its subclasses' format: {self target name. arr size})]",
	null, "2013-02-21T09:14:05Z", "mp");

// *** ClassVariablesAction ***

jst.ClassVariablesAction.addMethod("initialize", "", "initialization", 
	"\tlabel := 'class variables'",
	null, "2012-01-30T10:52:03Z", "mp");

jst.ClassVariablesAction.addMethod("execute", "", "executing", 
	"\tself target inspectClassVars",
	null, "2012-01-30T10:56:31Z", "mp");

// *** RemoveMethodAction ***

jst.RemoveMethodAction.addMethod("initialize", "", "initialization", 
	"\tlabel := 'remove method'." +
	"\n\thotKey := 'x'." +
	"\n\ticon := 'trash'",
	null, "2012-01-30T12:49:20Z", "mp");

// *** InspectAction ***

jst.InspectAction.addMethod("initialize", "", "initialization", 
	"\tlabel := 'inspect'." +
	"\n\thotKey := 'i'",
	null, "2012-01-30T14:44:44Z", "mp");

jst.InspectAction.addMethod("execute", "", "executing", 
	"\tself target inspect",
	null, "2012-01-30T14:45:43Z", "mp");

// *** RenameAction ***

jst.RenameAction.addMethod("initialize", "", "initialization", 
	"\tlabel := 'rename ...'",
	null, "2012-01-30T15:49:33Z", "mp");

// *** RenameClassAction ***

jst.RenameClassAction.addMethod("initialize", "", "initialization", 
	"\tlabel := 'rename class...'",
	null, "2012-01-30T15:41:18Z", "mp");

// *** CopyClassAction ***

jst.CopyClassAction.addMethod("initialize", "", "initialization", 
	"\tlabel := 'copy class'",
	null, "2012-01-30T15:41:42Z", "mp");

// *** RemoveAction ***

jst.RemoveAction.addMethod("initialize", "", "initialization", 
	"\tlabel := 'remove'." +
	"\n\thotKey := 'x'." +
	"\n\ticon := 'trash'",
	null, "2012-01-30T15:50:11Z", "mp");

// *** FindClassAction ***

jst.FindClassAction.addMethod("initialize", "", "initialization", 
	"\tlabel := 'find class ...'." +
	"\n\ticon := 'edit-find'",
	null, "2012-01-30T15:47:29Z", "mp");

// *** AddClassCategoryAction ***

jst.AddClassCategoryAction.addMethod("initialize", "", "initialization", 
	"\tlabel := 'add item ...'." +
	"\n\ticon := 'plus'",
	null, "2012-01-30T15:48:50Z", "mp");

//*** AddMethodCategoryAction ***

jst.AddMethodCategoryAction.addMethod("initialize", "", "initialization", 
	"\tlabel := 'new category ...'." +
	"\n\ticon := 'plus'",
	null, "2012-01-30T16:04:57Z", "mp");

//Class>>defaultMethodCategories

jst.Class.addMethod("defaultMethodCategories", "", "accessing", 
	"\t^ {'initialization'. 'accessing'. 'comparing'. 'converting'. 'printing'. 'private'. 'rendering'. 'testing'. 'updating'}",
	null, "2013-01-07T11:48:40Z", "mp");

//Metaclass>>defaultMethodCategories

jst.Metaclass.addMethod("defaultMethodCategories", "", "accessing", 
	"\t^ {'instance creation'. 'accessing'}",
	null, "2013-01-14T10:09:07Z", "mp");

//*** CategorizeMethodAction ***

jst.CategorizeMethodAction.addMethod("initialize", "", "initialization", 
	"\tlabel := 'categorize method'",
	null, "2012-02-03T13:39:07Z", "mp");

jst.CategorizeMethodAction.addMethod("buildMenuItems", "", "private", 
	"\t| list |" +
	"\n\tlist := SortedCollection new addAll: self target receiver defaultMethodCategories; yourself." +
	"\n\tself target receiver withAllSuperclassesDo: [:cls | cls = Object | (cls = Behavior) ifFalse: [" +
	"\n\t\tcls methodCategories do: [:cat | cat isDefault ifFalse: [" +
	"\n\t\t\tlist addUnique: cat name]]]]." +
	"\n\tlist do: [:n | | item |" +
	"\n\t\titem := ExtMenuItem new text: n." +
	"\n\t\tn = self target category name ifTrue: [" +
	"\n\t\t\titem icon: 'check']." +
	"\n\t\tmenu add: item]." +
	"\n\tmenu on: #itemclick do: [:it :ev | self executeOn: it]",
	null, "2012-04-10T08:57:20Z", "mp");

/*
jst.CategorizeMethodAction.addMethod("executeOn:", "item", "executing", 
	"\t| oldCat |" +
	"\n\t(oldCat := self target category name) = item text ifFalse: [" +
	"\n\t\tself target categorize: item text." +
	"\n\t\tChangeSet current add: (String streamContents: [:s | " +
	"\n\t\t\ts nextPutAll: 'jst.'; " +
	"\n\t\t\t\tnextPutAll: self target receiver name; " +
	"\n\t\t\t\tnextPutAll: '.methodDict().at_(\"';" +
	"\n\t\t\t\tnextPutAll: self target selector;" +
	"\n\t\t\t\tnextPutAll: '\").categorize_(\"';" +
	"\n\t\t\t\tnextPutAll: item text;" +
	"\n\t\t\t\tnextPutAll: '\");'" +
	"\n\t\t\t])." +
	"\n\t\tExtComponentMgr default sendEvent: #methodCategoryChanged:on: with: {oldCat. self target}]",
	null, "2012-02-04T17:21:40Z", "mp");

jst.CategorizeMethodAction.addMethod("executeOn:", "item", "executing", 
	"\t| oldCat |" +
	"\n\t(oldCat := self target category name) = item text ifFalse: [" +
	"\n\t\tself target categorize: item text." +
	"\n\t\tChangeSet current append: (String streamContents: [:s | | cls |" +
	"\n\t\t\tcls := self target receiver javascriptName." +
	"\n\t\t\ts nextPutAll: cls; " +
	"\n\t\t\t\tnextPutAll: '.methodDict().at_(\"';" +
	"\n\t\t\t\tnextPutAll: self target selector;" +
	"\n\t\t\t\tnextPutAll: '\").categorize_(\"';" +
	"\n\t\t\t\tnextPutAll: item text;" +
	"\n\t\t\t\tnextPutAll: '\");'." +
	"\n\t\t\titem text = MethodCategory defaultName ifFalse: [" +
	"\n\t\t\t\tself target receiver removeDefaultCategoryIfEmpty." +
	"\n\t\t\t\ts nextPutAll: String crlf; " +
	"\n\t\t\t\t\tnextPutAll: cls; " +
	"\n\t\t\t\t\tnextPutAll: '.removeDefaultCategoryIfEmpty();']" +
	"\n\t\t])." +
	"\n\t\tExtComponentMgr default sendEvent: #methodCategoryChanged:on: with: {oldCat. self target}]",
	null, "2012-04-08T19:15:03Z", "mp");
*/

jst.CategorizeMethodAction.addMethod("executeOn:", "item", "executing", 
	"\t| oldCat |" +
	"\n\t(oldCat := self target category name) = item text ifFalse: [" +
	"\n\t\tself target categorize: item text." +
	"\n\t\tChangeSet current append: (String streamContents: [:s |" +
	"\n\t\t\ts nextPutAll: self target receiver javascriptName; " +
	"\n\t\t\t\tnextPutAll: '.methodDict().at_(\"';" +
	"\n\t\t\t\tnextPutAll: self target selector;" +
	"\n\t\t\t\tnextPutAll: '\").categorize_(\"';" +
	"\n\t\t\t\tnextPutAll: item text;" +
	"\n\t\t\t\tnextPutAll: '\");'." +
	"\n\t\t])." +
	"\n\t\tself broadcastEvent: #'methodCategoryChanged:on:' with: {oldCat. self target}]",
	null, "2012-08-17T11:09:57Z", "mp"); //jst-tools

// *** RemoveEmptyCategoriesAction ***

jst.RemoveEmptyCategoriesAction.addMethod("initialize", "", "initialization", 
	"\tlabel := 'remove empty categories'",
	null, "2012-02-07T10:56:19Z", "mp");

//*** EditorAction ***

jst.EditorAction.addMethod("initialize", "", "initialization", 
	"\tenabled := false",
	null, "2012-01-31T19:25:51Z", "mp");

//*** EditorActions ***

jst.EditorActions.addMethod("on:", "aCodeEditor", "accessing", 
	"\teditor := aCodeEditor." +
	"\n\teditor actions: self." +
	"\n\teditor addDependent: self." +
	"\n\tself codeEditing: (editor editing ifTrue: [editor])",
	null, "2012-01-31T19:58:06Z", "mp");

jst.EditorActions.addMethod("asMenu", "", "accessing", 
	"\t^ editor createMenu on: #beforeshow do: [:m | " +
	"\n\t\tdoIt isEnabled: editor somethingSelected." +
	"\n\t\tprintIt isEnabled: editor somethingSelected." +
	"\n\t\tinspectIt isEnabled: editor somethingSelected]",
	null, "2012-01-31T21:24:39Z", "mp", 1);

jst.EditorActions.addMethod("asMenu", "", "accessing", 
	"\t^ editor createMenu on: #beforeshow do: [:m | " +
	"\n\t\tredo isDisabled: editor redoSize = 0. " +
	"\n\t\tundo isDisabled: editor undoSize = 0." +
	"\n\t\tdoIt isEnabled: editor somethingSelected." +
	"\n\t\tprintIt isEnabled: editor somethingSelected." +
	"\n\t\tinspectIt isEnabled: editor somethingSelected]",
	null, "2013-10-09T13:06:10Z", "mp"); //jst-tools

jst.EditorActions.addMethod("initialize", "", "initialization", 
	"\tfind := EditorAction new on: #find of: self; label: 'find...'; icon: 'edit-find'; beEnabled." +
	"\n\tfindNext := EditorAction new on: #findNext of: self; label: 'find next'; hotKey: 'g'." +
	"\n\tfindPrev := EditorAction new on: #findPrevious of: self; label: 'find previous'." +
	"\n\tundo := EditorAction new on: #undo of: self; label: 'undo'; icon: 'edit-undo'." +
	"\n\tredo := EditorAction new on: #redo of: self; label: 'redo'; icon: 'edit-redo'." +
	"\n\tdoIt := EditorAction new on: #doIt of: [editor]; label: 'do it'; hotKey: 'd'." +
	"\n\tprintIt := EditorAction new on: #printIt of: [editor]; label: 'print it'; hotKey: 'p'." +
	"\n\tinspectIt := EditorAction new on: #inspectIt of: [editor]; label: 'Inspect it'; hotKey: 'i'." +
	"\n\tok := EditorAction new on: #save of: [editor]; label: 'accept'; hotKey: 's'; icon: 'yes'." +
	"\n\tcancel := EditorAction new on: #cancel of: [editor]; label: 'cancel'; icon: 'cancel'.",
	null, "2012-02-01T07:45:59Z", "mp", 1);

jst.EditorActions.addMethod("initialize", "", "initialization", 
	"\tfind := EditorAction new on: #find of: self; label: 'find...'; icon: 'edit-find'; beEnabled." +
	"\n\tfindNext := EditorAction new on: #findNext of: self; label: 'find next'; hotKey: 'g'." +
	"\n\tfindPrev := EditorAction new on: #findPrevious of: self; label: 'find previous'." +
	"\n\tundo := EditorAction new on: #undo of: [editor]; label: 'undo'; icon: 'edit-undo'." +
	"\n\tredo := EditorAction new on: #redo of: [editor]; label: 'redo'; icon: 'edit-redo'." +
	"\n\tdoIt := EditorAction new on: #doIt of: [editor]; label: 'do it'; hotKey: 'd'." +
	"\n\tprintIt := EditorAction new on: #printIt of: [editor]; label: 'print it'; hotKey: 'p'." +
	"\n\tinspectIt := EditorAction new on: #inspectIt of: [editor]; label: 'Inspect it'; hotKey: 'i'." +
	"\n\tok := EditorAction new on: #save of: [editor]; label: 'accept'; hotKey: 's'; icon: 'yes'." +
	"\n\tcancel := EditorAction new on: #cancel of: [editor]; label: 'cancel'; icon: 'cancel'.",
	null, "2013-10-09T13:06:55Z", "mp"); //jst-tools

jst.EditorActions.addMethod("actions", "", "accessing", 
	"\t^ {find. findNext. findPrev. nil. undo. redo. nil. doIt. printIt. inspectIt. nil. ok. cancel}",
	null, "2012-01-31T19:33:34Z", "mp");

jst.EditorActions.addMethod("do:", "aBlock", "enumerating", 
	"\tself actions do: aBlock",
	null, "2012-01-31T19:40:20Z", "mp");

jst.EditorActions.addMethod("find", "", "actions", 
	"\tUIManager default request: 'Find what?' translated thenDo: [:text | " +
	"\n\t\tfindNext isDisabled: (editor find: text) not." +
	"\n\t\tfindPrev isDisabled: true]",
	null, "2012-01-31T19:34:23Z", "mp");

jst.EditorActions.addMethod("codeEditing:", "ed", "updating", 
	"\tok isEnabled: editor = ed." +
	"\n\tcancel isEnabled: editor = ed." +
	"\n\tundo isEnabled: editor = ed.\t" +
	"\n\tredo isEnabled: editor = ed.",
	null, "2012-01-31T19:43:41Z", "mp");

jst.EditorActions.addMethod("findNext", "", "actions", 
	"\teditor findNext " +
	"\n\t\tifTrue: [findPrev beEnabled] " +
	"\n\t\tifFalse: [findNext beDisabled]",
	null, "2012-01-31T19:45:00Z", "mp");

jst.EditorActions.addMethod("findPrevious", "", "actions", 
	"\teditor findPrevious " +
	"\n\t\tifTrue: [findNext beEnabled] " +
	"\n\t\tifFalse: [findPrev beDisabled]",
	null, "2012-01-31T19:45:47Z", "mp");

/*
jst.EditorActions.addMethod("undo", "", "actions", 
	"\teditor undo. " +
	"\n\tredo isDisabled: editor redoSize = 0. " +
	"\n\tundo isDisabled: editor undoSize = 0",
	null, "2012-01-31T19:46:30Z", "mp");

jst.EditorActions.addMethod("redo", "", "actions", 
	"\teditor redo. " +
	"\n\tredo isDisabled: editor redoSize = 0. " +
	"\n\tundo isDisabled: editor undoSize = 0",
	null, "2012-01-31T19:46:56Z", "mp");
*/

// *** OverrideMethodAction ***

jst.OverrideMethodAction.addMethod("initialize", "", "initialization", 
	"\tlabel := 'override method'",
	null, "2012-02-09T21:32:36Z", "mp");

jst.OverrideMethodAction.addMethod("editor", "", "accessing", 
	"\t^ self target ownerContainer ownerContainer ownerContainer codePanel editor",
	null, "2012-02-08T13:50:50Z", "mp");

jst.OverrideMethodAction.addMethod("isEnabled", "", "testing", 
	"\t^ self target selectionModel selectedNode notNil",
	null, "2012-02-08T13:52:08Z", "mp", 1);

jst.OverrideMethodAction.addMethod("isEnabled", "", "testing", 
	"\t^ super isEnabled and: [self target selectionModel selectedNode notNil]",
	null, "2013-06-23T09:33:14Z", "mp"); //jst-tools

/*
jst.OverrideMethodAction.addMethod("buildMenuItems", "", "private", 
	"\t| coll |" +
	"\n\tcoll := SortedCollection new." +
	"\n\tself editor currentClass withAllSuperclasses do: [:aClass | " +
	"\n\t\t(({ Object. Class. Behavior. Metaclass } includes: aClass) " +
	"\n\t\t\tifTrue: [#(asJsObject printOn: species value)] " +
	"\n\t\t\tifFalse: [aClass selectors]) do: [:sel |" +
	"\n\t\t\t\tcoll addUnique: sel]]." +
	"\n\tcoll do: [:sel |" +
	"\n\t\tmenu add: (ExtMenuItem new text: sel)]." +
	"\n\tmenu on: #itemclick do: [:item :ev | self executeOn: item]" +
	"\n\t",
	null, "2012-02-09T21:39:34Z", "mp");

jst.OverrideMethodAction.addMethod("buildMenuItems", "", "private", 
	"\t| dict |" +
	"\n\tdict := Dictionary new." +
	"\n\tself editor currentClass withAllSuperclasses do: [:aClass | " +
	"\n\t\taClass methodDict valuesDo: [:m |" +
	"\n\t\t\t(dict at: m category name ifAbsentPut: [SortedCollection new]) addUnique: m selector]]." +
	"\n\tdict keys asSortedCollection do: [:cat | | subm |" +
	"\n\t\tsubm := ExtMenu new" +
	"\n\t\t\ton: #itemclick do: [:item :ev | self executeOn: item]." +
	"\n\t\t(dict at: cat) do: [:sel |" +
	"\n\t\t\tsubm add: (ExtMenuItem new text: sel)]." +
	"\n\t\tmenu add: (ExtMenuItem new " +
	"\n\t\t\ttext: cat; " +
	"\n\t\t\tmenu: subm)]." +
	"\n\t",
	null, "2012-02-20T14:05:53Z", "mp");
 */

jst.OverrideMethodAction.addMethod("buildMenuItems", "", "private", 
	"\t| coll poc m |" +
	"\n\tcoll := SortedCollection new." +
	"\n\tself editor currentClass withAllSuperclasses do: [:aClass | " +
	"\n\t\t(({ Object. Class. Behavior. Metaclass } includes: aClass) " +
	"\n\t\t\tifTrue: [#(asJsObject printOn: species value)] " +
	"\n\t\t\tifFalse: [aClass selectors]) do: [:sel |" +
	"\n\t\t\t\tcoll addUnique: sel]]." +
	"\n\tm := menu" +
	"\n\t\ton: #itemclick do: [:item :ev | self executeOn: item]." +
	"\n\tpoc := 0." +
	"\n\tcoll withIndexDo: [:sel :i |" +
	"\n\t\tpoc := poc + 1." +
	"\n\t\tm add: (ExtMenuItem new text: sel)." +
	"\n\t\t(poc = 15 and: [i < (coll size - 5)]) ifTrue: [ | nextm |" +
	"\n\t\t\tnextm := ExtMenu new " +
	"\n\t\t\t\ton: #itemclick do: [:item :ev | self executeOn: item]." +
	"\n\t\t\tm addSeparator; add: (ExtMenuItem new text: 'more...' translated; menu: nextm)." +
	"\n\t\t\tm := nextm." +
	"\n\t\t\tpoc := 0]].",
	null, "2012-02-20T14:32:19Z", "mp");

jst.OverrideMethodAction.addMethod("executeOn:", "item", "executing", 
	"\t| m |" +
	"\n\tm := self editor currentClass lookupSelector: item text." +
	"\n\tself editor " +
	"\n\t\tmode: #smalltalk;" +
	"\n\t\tvalue: ('{1}{2}{3}super {1}.{2}{3}' format: {m printMessagePattern. String lf. String tab});" +
	"\n\t\tfocus." +
	"\n\tself editor setCursorAt: {2. 2}",
	null, "2012-02-08T22:17:29Z", "mp");

//*** MessageNamesPanel ***

jst.MessageNamesPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tself " +
	"\n\t\troot: ExtTreeNode new;" +
	"\n\t\trootVisible: false;" +
	"\n\t\tautoScroll: true; " +
	"\n\t\tcontainerScroll: true." +
	"\n\tactions := {" +
	"\n\t\tBrowseSendersAction asSimpleAction on: #browseSenders of: self}",
	null, "2012-02-15T14:00:46Z", "mp");

jst.MessageNamesPanel.addMethod("clickEvent", "", "events", 
	"\t^ [:node :ev | self changed: #selector with: node text]",
	null, "2012-02-15T07:38:04Z", "mp");

jst.MessageNamesPanel.addMethod("nodeselectionchangeEvent", "", "events", 
	"\t^ [:model :node | self changed: #selector with: node text]",
	null, "2012-02-15T07:38:23Z", "mp");

jst.MessageNamesPanel.addMethod("browseSenders", "", "actions", 
	"\tself selectionModel selectedNode ifNotNilDo: [:n | " +
	"\n\t\tself systemNavigation browseAllCallsOn: n text]",
	null, "2012-02-15T13:57:06Z", "mp");

// *** MessageNames ***

jst.MessageNames.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tself " +
	"\n\t\ttitle: self title; " +
	"\n\t\ticonCls: #symbol;" +
	"\n\t\tonEscape: []." +
	"\n\tcodePanel editor readOnly: true." +
	"\n\tsearchField " +
	"\n\t\ton: #specialkey do: [:f :ev | " +
	"\n\t\t\tev enterPressed ifTrue: [self search]]",
	null, "2012-04-23T18:48:01Z", "mp"); //jst-tools

jst.MessageNames.addMethod("title", "", "accessing", 
	"\t^ 'Message names containing \"{1}\"' translated format: {searchField value ifNil: ''}",
	null, "2012-02-15T08:23:11Z", "mp");

jst.MessageNames.addMethod("buildPanels", "", "initialization", 
	"\tself" +
	"\n\t\tclosable: true;" +
	"\n\t\tborder: false;" +
	"\n\t\tstateful: true;" +
	"\n\t\twidth: 650;" +
	"\n\t\tminWidth: 500;" +
	"\n\t\theight: 500;" +
	"\n\t\tminHeight: 300;" +
	"\n\t\tplain: true;" +
	"\n\t\twithBorderLayout;" +
	"\n\t\tadd: (searchPanel := ExtPanel new border: false; width: 250; region: (ExtSplitRegion west minWidth: 200); withBorderLayout;" +
	"\n\t\t\tadd: (ExtFormPanel new height: 30; region: ExtRegion north; layout: (ExtHBoxLayout new withStretchAlign; padding: 3);" +
	"\n\t\t\t\tadd: (ExtButton new text: 'Search' translated; flex: 1; margins: '0 3 0 0'; on: #click do: [:btn :ev | self search]);" +
	"\n\t\t\t\tadd: (searchField := ExtFormField new flex: 4);" +
	"\n\t\t\t\tyourself);" +
	"\n\t\t\tadd: (selectorsPanel := MessageNamesPanel new region: ExtRegion center);" +
	"\n\t\t\tyourself);" +
	"\n\t\tadd: (methodPanel := MessageSetPanel new region: ExtSplitRegion center);" +
	"\n\t\tadd: (codePanel := BrowserCodePanel new height: 250; region: (ExtSplitRegion south minHeight: 150))" +
	"\n\t\t",
	null, "2012-04-17T14:01:48Z", "mp");

jst.MessageNames.addMethod("search", "", "private", 
	"\t| selectors |" +
	"\n\tself title: self title." +
	"\n\tselectors := SortedCollection new." +
	"\n\tsearchField value ifNotEmptyDo: [:str |" +
	"\n\t\tself systemNavigation allBehaviorsDo: [:cls | cls methodDict do: [:m |" +
	"\n\t\t\t (m selector includesSubString: str caseSensitive: false) ifTrue: [" +
	"\n\t\t\t\tselectors addUnique: m selector]]]]." +
	"\n\tselectorsPanel " +
	"\n\t\tinitializeFrom: selectors" +
	"\n\t\twith: [:str | ExtTreeNode new text: str; leaf: true; iconCls: #symbol]" +
	"\n\t\tselectFirst: true." +
	"\n\tselectorsPanel root children size = 0 ifTrue: [" +
	"\n\t\tself update: #selector with: nil]." +
	"\n\tself stateful & self stateId notNil ifTrue: [" +
	"\n\t\tExtManager default provider set: self stateId, '-search' value: searchField value]",
	null, "2012-05-02T08:46:39Z", "mp");

jst.MessageNames.addMethod("staterestoreEvent", "", "events", 
	"\t^ [:comp :state | " +
	"\n\t\tself addListener: (ExtDefaultListener new eventName: #show; single: true; handler: [:comp |" +
	"\n\t\t\tsearchField value: (ExtManager default provider get: self stateId, '-search' default: '')." +
	"\n\t\t\tself search])." +
	"\n\t]",
	null, "2012-04-18T14:50:08Z", "mp", 1);

jst.MessageNames.addMethod("staterestoreEvent", "", "events", 
	"\t^ [:comp :state | " +
	"\n\t\tself addListener: (ExtDefaultListener new eventName: #show; single: true; handler: [:c |" +
	"\n\t\t\tsearchField value: (ExtManager default provider get: self stateId, '-search' default: '')." +
	"\n\t\t\tself search])." +
	"\n\t]",
	null, "2013-10-12T07:21:33Z", "mp"); //jst-tools

jst.MessageNames.addMethod("codeEditing:", "editor", "updating", 
	"\tsearchPanel isDisabled: editor notNil",
	null, "2012-02-16T07:50:34Z", "mp");

jst.MessageNames.addMethod("installDependents", "", "initialization", 
	"\tsuper installDependents." +
	"\n\tselectorsPanel " +
	"\n\t\taddDependent: self;" +
	"\n\t\taddDependent: codePanel." +
	"\n\tmethodPanel addDependent: self.",
	null, "2012-04-10T09:28:28Z", "mp");

jst.MessageNames.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tselection = anObject ifTrue: [" +
	"\n\t\t^ self]." +
	"\n\tselection := anObject." +
	"\n\tanAspect = #method ifTrue: [" +
	"\n\t\tcodePanel editor readOnly ifTrue: [" +
	"\n\t\t\tcodePanel editor readOnly: false]." +
	"\n\t\t^ self]." +
	"\n\tanAspect = #selector ifTrue: [" +
	"\n\t\tcodePanel editor" +
	"\n\t\t\tcontents: '';" +
	"\n\t\t\treadOnly: true." +
	"\n\t\tmethodPanel " +
	"\n\t\t\tinitializeFrom: (anObject ifNotNil: [self systemNavigation allImplementorsOf: anObject] ifNil: #()) " +
	"\n\t\t\twith: #printString " +
	"\n\t\t\tselectFirst: false]",
	null, "2012-04-10T09:37:13Z", "mp");

// *** WinMgrAction ***

jst.WinMgrAction.addMethod("asSplitButton", "", "converting", 
	"\t^ super asSplitButton" +
	"\n\t\ton: #arrowclick do: [:b :ev | self rebuildMenu. b showMenu]",
	null, "2012-02-16T20:48:27Z", "mp");

jst.WinMgrAction.addMethod("openNew", "", "executing", 
	"\tself target openRelativeTo: (Point x: 30 y: 33)." +
	"\n\tself rebuildMenu",
	null, "2012-02-17T07:58:34Z", "mp");

jst.WinMgrAction.addMethod("rebuildMenu", "", "public", 
	"\tmenu := ExtMenu new." +
	"\n\tself buildMenuItems." +
	"\n\telm menu: menu",
	null, "2012-02-17T08:19:25Z", "mp");
/*
jst.WinMgrAction.addMethod("buildMenuItems", "", "private", 
	"\tmenu" +
	"\n\t\tadd: (ExtMenuItem new text: 'open new' translated); " +
	"\n\t\taddSeparator." +
	"\n\tExtWindowGroup default do: [:w | w class = self target ifTrue: [" +
	"\n\t\tmenu add: (ExtMenuItem new text: w title; link: w id)]]." +
	"\n\tmenu on: #itemclick do: [:it :ev | self executeOn: it]",
	null, "2012-02-17T12:58:30Z", "mp");

jst.WinMgrAction.addMethod("executeOn:", "item", "executing", 
	"\titem link " +
	"\n\t\tifNil: [self openNew] " +
	"\n\t\tifNotNil: [ExtWindowGroup default bringToFront: item link]",
	null, "2012-02-17T12:59:50Z", "mp");

jst.WinMgrAction.addMethod("execute", "", "executing", 
	"\tmenu ifNotNil: [" +
	"\n\t\t(menu items select: [:it | (ExtWindowGroup default getById: it jstWrapper link) notNil]) ifNotEmptyDo: [:arr |" +
	"\n\t\t\t^ ExtWindowGroup default bringToFront: arr last jstWrapper link]]." +
	"\n\tself openNew",
	null, "2012-02-17T14:19:40Z", "mp");
*/

jst.WinMgrAction.addMethod("executeOn:", "item", "executing", 
	"\titem link isBehavior" +
	"\n\t\tifTrue: [target := item link. self openNew] " +
	"\n\t\tifFalse: [item link ifNotNil: [" +
	"\n\t\t\t(ExtWindowGroup default getById: item link) show." +
	"\n\t\t\tExtWindowGroup default bringToFront: item link]]",
	null, "2012-06-21T10:40:21Z", "mp");

jst.WinMgrAction.addMethod("execute", "", "executing", 
	"\t| first activate | " +
	"\n\tactivate := false." +
	"\n\tExtWindowGroup default do: [:w |" +
	"\n\t\tfirst ifNil: [first := w]." +
	"\n\t\tactivate ifTrue: [" +
	"\n\t\t\t^ w toFront]." +
	"\n\t\tw == ExtWindowGroup default activeWindow ifTrue: [" +
	"\n\t\t\tactivate := true]" +
	"\n\t]." +
	"\n\tfirst ifNotNil: [" +
	"\n\t\t^ first toFront]." +
	"\n\tSystemBrowser default open",
	null, "2012-02-17T21:09:07Z", "mp");

jst.WinMgrAction.addMethod("buildMenuItems", "", "private", 
	"\tmenu" +
	"\n\t\taddText: 'Open new:' translated; " +
	"\n\t\tadd: (ExtMenuItem new text: 'System Browser' translated; icon: 'tree'; link: SystemBrowser default); " +
	"\n\t\tadd: (ExtMenuItem new text: 'Workspace' translated; icon: 'method'; link: Workspace); " +
	"\n\t\tadd: (ExtMenuItem new text: 'Message Names' translated; icon: 'symbol'; link: MessageNames); " +
	"\n\t\tadd: (ExtMenuItem new text: 'Changes Viewer' translated; icon: 'javascript'; link: ChangesViewer); " +
	"\n\t\taddSeparator;" +
	"\n\t\taddText: 'Bring to front:'." +
	"\n\tExtWindowGroup default do: [:w | | it |" +
	"\n\t\tit := menu add: (ExtMenuItem new text: w title; link: w id)." +
	"\n\t\tw == ExtWindowGroup default activeWindow ifTrue: [" +
	"\n\t\t\tit iconCls: #lightbulb]]." +
	"\n\tmenu on: #itemclick do: [:it :ev | self executeOn: it]",
	null, "2012-03-19T15:49:15Z", "mp");

// *** WorkspaceVars ***

jst.WorkspaceVars._class.addMethod("hasInstVarNamed:", "aSymbol", "testing", 
	"\t| ok |" +
	"\n\tok := super hasInstVarNamed: aSymbol." +
	"\n\t(ok not and: [aSymbol first isLowercase]) ifTrue: [" +
	"\n\t\tself addInstVarName: aSymbol." +
	"\n\t\tok := true]." +
	"\n\t^ ok",
	null, "2012-03-19T15:45:45Z", "mp");

// *** Workspace ***

jst.Workspace.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tself title: 'Workspace';" +
	"\n\t\tminimizable: true;" +
	"\n\t\tonEscape: [];" +
	"\n\t\ticonCls: #method;" +
	"\n\t\twithoutBorder;" +
	"\n\t\tclosable: true;" +
	"\n\t\tstateful: true;" +
	"\n\t\twidth: 480;" +
	"\n\t\tminWidth: 200;" +
	"\n\t\theight: 360;" +
	"\n\t\tminHeight: 150;" +
	"\n\t\tplain: true;" +
	"\n\t\twithFitLayout;" +
	"\n\t\tadd: (editor := CodeEditor new)." +
	"\n\teditor " +
	"\n\t\tobject: WorkspaceVars new;" +
	"\n\t\taddDependent: self." +
	"\n\tclosing := false",
	null, "2012-07-17T12:45:53Z", "mp");

jst.Workspace.addMethod("minimizeEvent", "", "events", 
	"\t^ [:w | w hide]",
	null, "2012-06-21T10:43:35Z", "mp");

jst.Workspace.addMethod("contentEl:", "elementId", "accessing", 
	"\teditor contents: (Document current elementById: elementId) textContent",
	null, "2012-04-30T12:54:50Z", "mp");

jst.Workspace.addMethod("beforecloseEvent", "", "events", 
	"\t^ [:w | editor editing " +
	"\n\t\tifTrue: [" +
	"\n\t\t\tself inform: 'Please finish editing first.' translated." +
	"\n\t\t\tfalse \"stops the event\"]" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tclosing not & editor value isEmpty not ifTrue: [" +
	"\n\t\t\t\tUIManager default confirm: 'Close the workspace? Your code will be lost.' translated " +
	"\n\t\t\t\t\tthenDo: [closing := true. self close]." +
	"\n\t\t\t\tfalse]]]",
	null, "2012-07-17T12:59:40Z", "mp");

jst.Workspace.addMethod("fileName", "", "accessing", 
	"\t^ String streamContents: [:s |" +
	"\n\t\ts nextPutAll: 'workspace:'." +
	"\n\t\t{self x. self y. self width. self height} " +
	"\n\t\t\tdo: [:i | i printOn: s] separatedBy: [s nextPut: $:]]",
	null, "2012-03-27T20:33:33Z", "mp");

jst.Workspace.addMethod("codeSaved:", "ed", "events", 
	"\tself stateful & self stateId notNil ifTrue: [" +
	"\n\t\tExtManager default provider set: self stateId, '-contents' value: ed contents]",
	null, "2012-05-02T08:45:27Z", "mp");

jst.Workspace.addMethod("staterestoreEvent", "", "events", 
	"\t^ [:comp :state | " +
	"\n\t\teditor value: (ExtManager default provider get: self stateId, '-contents' default: '')]",
	null, "2012-04-19T08:47:50Z", "mp");

// *** JSmalltalkIDE ***

jst.JSmalltalkIDE.klass().instanceVariableNames_("current prefix beforeShow afterShow");

jst.JSmalltalkIDE.klass().addMethod("current", "", "accessing", 
	"\t^ current",
	null, "2012-04-13T20:24:20Z", "mp");

jst.JSmalltalkIDE.addMethod("initialize", "", "initialization", 
	"\tstartBtn := (WinMgrAction new label: 'JSmalltalk Start'; target: SystemBrowser default) asSplitButton" +
	"\n\t\theight: 27; " +
	"\n\t\trenderTo: 'startbtn'." +
	"\n\tdesktop := ExtViewport new." +
	"\n\tDocument html body htmlContents: [:html | " +
	"\n\t\thtml div " +
	"\n\t\t\tid: 'startbtn';" +
	"\n\t\t\tstyle: 'left: 5; top: 3; position: fixed']." +
	"\n\tstartBtn show." +
	"\n\tdesktop show." +
	"\n\tExtManager default provider: LocalStorageProvider new." +
	"\n\tExtComponentMgr default onCreate: self createEvent." +
	"\n\tDelayedTask new delay: 10; task: [self restore]; run",
	null, "2012-04-30T09:07:09Z", "mp", 1);

jst.JSmalltalkIDE.addMethod("initialize", "", "initialization", 
	"\tstartBtn := (WinMgrAction new label: 'JSmalltalk Start'; target: SystemBrowser default) asSplitButton" +
	"\n\t\theight: 27; " +
	"\n\t\trenderTo: 'startbtn'." +
	"\n\tdesktop := ExtViewport new." +
	"\n\tDocument html body htmlContents: [:html | " +
	"\n\t\thtml div " +
	"\n\t\t\tid: 'startbtn';" +
	"\n\t\t\tstyle: 'left: 5; top: 3; position: fixed']." +
	"\n\tstartBtn show." +
	"\n\tdesktop show." +
	"\n\tExtManager default provider: LocalStorageProvider new." +
	"\n\tExtComponentMgr default onCreate: self createEvent." +
	"\n\tDelayedTask new delay: 10; task: [self restore]; run." +
	"\n\tExtWindow new " +
	"\n\t\twidth: 400; height: 500; " +
	"\n\t\tautoScroll: true;" +
	"\n\t\ttitle: 'JSmalltalk Welcome'; " +
	"\n\t\tbodyStyle: 'background-color: #FFFBF9; padding: 5px'; " +
	"\n\t\tcontentEl: #welcome; " +
	"\n\t\tmoveRelativeTo: (Point x: 5 y: 35);" +
	"\n\t\tshow",
	null, "2012-05-03T20:36:30Z", "mp", 1);

jst.JSmalltalkIDE.addMethod("initialize", "", "initialization", 
	"\t(Document current elementById: #startbtn) ifNil: [" +
	"\n\t\tDocument current body htmlContents: [:html |" +
	"\n\t\t\thtml div" +
	"\n\t\t\t\tid: #startbtn;" +
	"\n\t\t\t\tstyle: 'left: 5; top: 3; position: fixed']" +
	"\n\t]." +
	"\n\tstartBtn := (WinMgrAction new label: 'JSmalltalk IDE'; target: SystemBrowser default) asSplitButton" +
	"\n\t\theight: 27; " +
	"\n\t\trenderTo: #startbtn;" +
	"\n\t\tshow." +
	"\n\tExtManager default provider: LocalStorageProvider new." +
	"\n\tExtComponentMgr default onCreate: self createEvent." +
	"\n\tDelayedTask new delay: 10; task: [self restore]; run.",
	null, "2012-09-19T21:20:02Z", "mp");

jst.JSmalltalkIDE.addMethod("initialize", "", "initialization", 
	"\t(Document current elementById: #startbtn) ifNil: [" +
	"\n\t\tDocument current body htmlContents: [:html |" +
	"\n\t\t\thtml div" +
	"\n\t\t\t\tid: #startbtn;" +
	"\n\t\t\t\tstyle: 'left: 5; top: 3; position: fixed']" +
	"\n\t]." +
	"\n\tstartBtn := (WinMgrAction new label: 'JSmalltalk IDE'; target: SystemBrowser default) asSplitButton" +
	"\n\t\theight: 27; " +
	"\n\t\trenderTo: #startbtn;" +
	"\n\t\tshow." +
	"\n\tExtManager default provider: LocalStorageProvider new." +
	"\n\tExtComponentMgr default onCreate: self createEvent." +
	"\n\tself restore",
	null, "2013-09-03T06:53:43Z", "mp", 1);

jst.JSmalltalkIDE.addMethod("initialize", "", "initialization", 
	"\t(Document current elementById: #startbtn) ifNil: [" +
	"\n\t\tDocument current body htmlContents: [:html |" +
	"\n\t\t\thtml div" +
	"\n\t\t\t\tid: #startbtn;" +
	"\n\t\t\t\tstyle: 'left: 5; top: 3; position: fixed']" +
	"\n\t]." +
	"\n\tstartBtn := (WinMgrAction new label: 'JSmalltalk IDE'; target: SystemBrowser default) asSplitButton" +
	"\n\t\theight: 27; " +
	"\n\t\trenderTo: #startbtn;" +
	"\n\t\tshow." +
	"\n\tExtManager default provider: LocalStorageProvider new." +
	"\n\tExtComponentMgr default onCreate: self createEvent." +
	"\n\t[self restore] delayed: 200",
	null, "2013-09-03T07:04:49Z", "mp", 1);

jst.JSmalltalkIDE.addMethod("initialize", "", "initialization", 
	"\t(HTMLDocument current elementById: #startbtn) ifNil: [" +
	"\n\t\tHTMLDocument current body htmlContents: [:html |" +
	"\n\t\t\thtml div" +
	"\n\t\t\t\tid: #startbtn;" +
	"\n\t\t\t\tstyle: 'left: 5; top: 3; position: fixed']" +
	"\n\t]." +
	"\n\tstartBtn := (WinMgrAction new label: 'JSmalltalk IDE'; target: SystemBrowser default) asSplitButton" +
	"\n\t\theight: 27; " +
	"\n\t\trenderTo: #startbtn;" +
	"\n\t\tshow." +
	"\n\tExtManager default provider: LocalStorageProvider new." +
	"\n\tExtComponentMgr default onCreate: self createEvent." +
	"\n\t[self restore] delayed: 200",
	null, "2014-01-02T22:44:20Z", "mp"); //jst-tools

jst.JSmalltalkIDE.addMethod("createEvent", "", "events", 
	"\t^ [:comp | comp stateful ifTrue: [" +
	"\n\t\tcomp stateId ifNil: [" +
	"\n\t\t\tcomp stateId: self class nextId." +
	"\n\t\t\tExtManager default provider set: comp stateId, '-class' value: comp className]." +
	"\n\t\tcomp on: #destroy do: [:cmp |" +
	"\n\t\t\tExtManager default provider state keys do: [:key |" +
	"\n\t\t\t\t(key startsWith: cmp stateId) ifTrue: [ExtManager default provider clear: key]]" +
	"\n\t\t]" +
	"\n\t]]",
	null, "2012-04-18T21:12:43Z", "mp");

jst.JSmalltalkIDE.addMethod("restore:withId:", "className id", "private", 
	"\t^ (Smalltalk classNamed: className) ifNotNilDo: [:cls |" +
	"\n\t\t| win |" +
	"\n\t\twin := cls new." +
	"\n\t\twin stateId: id." +
	"\n\t\twin show]",
	null, "2013-01-28T20:40:43Z", "mp");

jst.JSmalltalkIDE.addMethod("restore", "", "private", 
	"\tExtManager default provider state keysAndValuesDo: [:key :state |" +
	"\n\t\t(key endsWith: '-class') ifTrue: [ | win |" +
	"\n\t\t\twin := (Smalltalk classNamed: state) new." +
	"\n\t\t\twin stateId: (key copyUpTo: $-)." +
	"\n\t\t\twin show]]",
	null, "2012-04-17T09:27:05Z", "mp", 1);

jst.JSmalltalkIDE.addMethod("restore", "", "private", 
	"\tExtManager default provider state keysAndValuesDo: [:key :state |" +
	"\n\t\t(key endsWith: '-class') ifTrue: [DelayedTask new delay: 10; task: [ | win |" +
	"\n\t\t\twin := (Smalltalk classNamed: state) new." +
	"\n\t\t\twin stateId: (key copyUpTo: $-)." +
	"\n\t\t\twin show]; run]]",
	null, "2012-04-19T18:38:53Z", "mp", 1);

jst.JSmalltalkIDE.addMethod("restore", "", "private", 
	"\tExtManager default provider state keysAndValuesDo: [:key :state |" +
	"\n\t\t(key endsWith: '-class') ifTrue: [" +
	"\n\t\t\tself restore: state withId: (key copyUpTo: $-)]]",
	null, "2012-04-20T13:30:46Z", "mp", 1);

jst.JSmalltalkIDE.addMethod("restore", "", "private", 
	"\tExtManager default provider state keysAndValuesDo: [:key :state |" +
	"\n\t\t(key endsWith: '-class') " +
	"\n\t\t\tifTrue: [self restore: state withId: (key copyUpTo: $-)] " +
	"\n\t\t\tifFalse: [(key includesSubString: '-browse') ifTrue: [" +
	"\n\t\t\t\tMessageSet restore: key with: state]]]",
	null, "2012-04-27T08:14:17Z", "mp", 1);

jst.JSmalltalkIDE.addMethod("restore", "", "private", 
	"\tExtManager default provider state keysAndValuesDo: [:key :state |" +
	"\n\t\t(key startsWith: self class prefix) ifTrue: [(key endsWith: '-class') " +
	"\n\t\t\tifTrue: [self restore: state withId: (key copyUpTo: $-)] " +
	"\n\t\t\tifFalse: [(key includesSubString: '-browse') ifTrue: [" +
	"\n\t\t\t\tMessageSet restore: key with: state]]]]",
	null, "2012-06-05T14:30:40Z", "mp", 1);

jst.JSmalltalkIDE.addMethod("restore", "", "private", 
	"\tExtManager default provider state keysAndValuesDo: [:key :state |" +
	"\n\t\t(key startsWith: self class prefix) ifTrue: [(key endsWith: '-class') " +
	"\n\t\t\tifTrue: [ [self restore: state withId: (key copyUpTo: $-)] delayed: 10] " +
	"\n\t\t\tifFalse: [(key includesSubString: '-browse') ifTrue: [" +
	"\n\t\t\t\t[MessageSet restore: key with: state] delayed: 10]]]]",
	null, "2013-01-28T08:52:05Z", "mp");

jst.JSmalltalkIDE._class.addMethod("welcome", "", "welcome", 
	"\tExtWindow new " +
	"\n\t\twidth: 400; height: 500; " +
	"\n\t\tautoScroll: true;" +
	"\n\t\ttitle: 'JSmalltalk Welcome'; " +
	"\n\t\tbodyStyle: 'background-color: #FFFBF9; padding: 5px'; " +
	"\n\t\tcontentEl: #welcome; " +
	"\n\t\tmoveRelativeTo: (Point x: 5 y: 35);" +
	"\n\t\tshow",
	null, "2012-06-05T10:29:35Z", "mp");

jst.JSmalltalkIDE._class.addMethod("beforeShow:", "aBlock", "accessing", 
	"\tbeforeShow := aBlock",
	null, "2012-06-05T21:04:45Z", "mp");

jst.JSmalltalkIDE._class.addMethod("afterShow:", "aBlock", "accessing", 
	"\tafterShow := aBlock",
	null, "2012-06-05T21:04:57Z", "mp");

jst.JSmalltalkIDE._class.addMethod("start", "", "instance creation", 
	"\tprefix ifNil: [" +
	"\n\t\tprefix := 'ide']." +
	"\n\t[Smalltalk loadChangesAndDo: [" +
	"\n\t\tbeforeShow ifNotNil: [beforeShow value]." +
	"\n\t\tcurrent := self basicNew initialize." +
	"\n\t\tafterShow ifNotNil: [afterShow value]]" +
	"\n\t] ifError: [" +
	"\n\t\tbeforeShow ifNotNil: [beforeShow value]." +
	"\n\t\tcurrent := self basicNew initialize." +
	"\n\t\tafterShow ifNotNil: [afterShow value]]",
	null, "2012-06-05T21:07:21Z", "mp", 1); //jst-tools

jst.JSmalltalkIDE._class.addMethod("start", "", "instance creation", 
	"\tprefix ifNil: [" +
	"\n\t\tprefix := 'ide']." +
	"\n\t[Smalltalk loadChangesAndDo: [" +
	"\n\t\tbeforeShow value." +
	"\n\t\tcurrent := self basicNew initialize." +
	"\n\t\tafterShow value]" +
	"\n\t] ifError: [" +
	"\n\t\tbeforeShow value." +
	"\n\t\tcurrent := self basicNew initialize." +
	"\n\t\tafterShow value]",
	null, "2013-09-03T06:51:28Z", "mp"); //jst-tools

jst.JSmalltalkIDE._class.addMethod("prefix", "", "accessing", 
	"\t^ prefix",
	null, "2012-06-05T14:30:50Z", "mp");

jst.JSmalltalkIDE._class.addMethod("prefix:", "aString", "accessing", 
	"\tprefix := aString",
	null, "2012-06-05T14:04:08Z", "mp");

jst.JSmalltalkIDE._class.addMethod("nextId", "", "accessing", 
	"\t^ ExtCore current nextIdPrefixed: prefix",
	null, "2012-06-05T14:04:32Z", "mp");

//*** AppDeployer ***

jst.AppDeployer._class.addMethod("initialize", "", "class initialization", 
	"\tSkipFiles := {" +
	"\n\t\tObject jsFileName. " +
	"\n\t\tJSObjectProxy jsFileName. " +
	"\n\t\tParser jsFileName." +
	"\n\t\tContextPart jsFileName}",
	null, "2013-11-06T10:17:07Z", "mp");

jst.initializeClass(jst.AppDeployer);

jst.AppDeployer.addMethod("initialize", "", "initialization", 
	"\tfileStream := FileDirectory default forceNewFileNamed: 'app-deploy.js'." +
	"\n\tselectors := SortedCollection new." +
	"\n\tclasses := Dictionary new." +
	"\n\tmethods := Dictionary new." +
	"\n\tclassMethods := Dictionary new." +
	"\n\tbasePackages := {'Applications'. 'Collections'. 'DOM'. 'Exceptions'. 'Kernel'. 'System'}",
	null, "2012-07-17T11:29:51Z", "mp");

jst.AppDeployer.addMethod("initialize", "", "initialization", 
	"\tfileStream := FileDirectory default forceNewFileNamed: 'app-deploy.js'." +
	"\n\tselectors := SortedCollection new." +
	"\n\tclasses := Dictionary new." +
	"\n\tclassScan := OrderedCollection new." +
	"\n\tmethods := Dictionary new." +
	"\n\tclassMethods := Dictionary new." +
	"\n\tbasePackages := {'Applications'. 'Collections'. 'DOM'. 'Exceptions'. 'Kernel'. 'System'}",
	null, "2013-07-09T09:06:25Z", "mp", 1);

jst.AppDeployer.addMethod("initialize", "", "initialization", 
	"\tfileStream := FileDirectory default forceNewFileNamed: 'app-deploy.js'." +
	"\n\tselectors := SortedCollection new." +
	"\n\tclasses := Dictionary new." +
	"\n\tclassScan := OrderedCollection new." +
	"\n\tmethods := Dictionary new." +
	"\n\tclassMethods := Dictionary new." +
	"\n\tbasePackages := {'Applications'. 'Collections'. 'DOM'. 'Exceptions'. 'Kernel'. 'System'}." +
	"\n\tskipPackages := {}",
	null, "2014-01-16T12:24:46Z", "mp"); //jst-tools

jst.AppDeployer.addMethod("packages:", "anArray", "accessing", 
	"\tpackages := anArray asCollection",
	null, "2012-07-16T15:08:49Z", "mp");

jst.AppDeployer.addMethod("basePackages:", "aCollection", "accessing", 
	"\tbasePackages := aCollection",
	null, "2012-07-17T11:36:13Z", "mp");

jst.AppDeployer.addMethod("log:", "aString", "private", 
	"\tConsole log: aString" +
	"\n\t",
	null, "2012-07-16T15:09:43Z", "mp", 1);

jst.AppDeployer.addMethod("log:", "aString", "private", 
	"\tConsole log: DateAndTime now printTime, ' ', aString" +
	"\n\t",
	null, "2013-11-06T10:23:32Z", "mp"); //jst-tools

jst.AppDeployer.addMethod("deploy", "", "processing", 
	"\t| names |" +
	"\n\tself log: 'Deployment process started'." +
	"\n\tnames := (Smalltalk at: #categories) keys asSortedCollection." +
	"\n\tpackages do: [:name |" +
	"\n\t\tnames do: [:cat | " +
	"\n\t\t\t(cat = name or: [cat startsWith: name, '-']) ifTrue: [" +
	"\n\t\t\t\tself deployPackage: ((Smalltalk at: #categories) at: cat)]]]." +
	"\n\tself deploySelectors." +
	"\n\tself log: 'Deployment process finished'.",
	null, "2012-07-17T08:41:02Z", "mp", 1);

jst.AppDeployer.addMethod("deploy", "", "processing", 
	"\tself log: 'Deploying \"', packages first, '\", wait...'." +
	"\n\tSmalltalk at: #deploying put: true." +
	"\n\t[(Smalltalk at: #categories) keys asSortedCollection do: [:cat | " +
	"\n\t\t(cat startsWith: packages first) ifTrue: [" +
	"\n\t\t\tself deployPackage: ((Smalltalk at: #categories) at: cat)]]." +
	"\n\tself deploySelectors." +
	"\n\t\"generovani js souboru\"" +
	"\n\tfileStream resetContents: ''." +
	"\n\tself exportClasses." +
	"\n\tself exportMethods] ensure: [" +
	"\n\t\tSmalltalk at: #deploying put: false]." +
	"\n\tself log: 'Done'.",
	null, "2012-07-17T09:25:00Z", "mp", 1);

jst.AppDeployer.addMethod("deploy", "", "processing", 
	"\tself log: 'Deploying \"', packages first, '\", wait...'." +
	"\n\tSmalltalk at: #deploying put: true." +
	"\n\t[(Smalltalk at: #categories) keys asSortedCollection do: [:cat | " +
	"\n\t\t(cat startsWith: packages first) ifTrue: [" +
	"\n\t\t\tself deployPackage: ((Smalltalk at: #categories) at: cat)]]." +
	"\n\tself deploySelectors." +
	"\n\t\"generovani js souboru\"" +
	"\n\tfileStream resetContents: ''." +
	"\n\tself exportClasses." +
	"\n\tself exportMethods] ensure: [" +
	"\n\t\tSmalltalk at: #deploying put: false]." +
	"\n\tfileStream append: String crlf, '//', DateAndTime now asString." +
	"\n\tself log: 'Done'.",
	null, "2013-07-09T09:09:49Z", "mp", 1);

jst.AppDeployer.addMethod("deploy", "", "processing", 
	"\tself log: 'Deploying \"', packages first, '\", wait...'." +
	"\n\tSmalltalk at: #deploying put: true." +
	"\n\t[(Smalltalk at: #categories) keys asSortedCollection do: [:cat | " +
	"\n\t\t(cat startsWith: packages first) ifTrue: [" +
	"\n\t\t\tself deployPackage: ((Smalltalk at: #categories) at: cat)]]." +
	"\n\tself deploySelectors." +
	"\n\t\"generovani js souboru\"" +
	"\n\tself log: '.exporting classes and methods'." +
	"\n\tfileStream resetContents: ''." +
	"\n\tself exportClasses." +
	"\n\tself exportMethods] ensure: [" +
	"\n\t\tSmalltalk at: #deploying put: false]." +
	"\n\tfileStream append: String crlf, '//', DateAndTime now asString." +
	"\n\tself log: 'Done'.",
	null, "2013-11-06T10:59:35Z", "mp", 1);

jst.AppDeployer.addMethod("deploy", "", "processing", 
	"\tself log: 'Deploying \"', self mainPackage, '\", wait...'." +
	"\n\tSmalltalk at: #deploying put: true." +
	"\n\t[(Smalltalk at: #categories) keys asSortedCollection do: [:cat | " +
	"\n\t\t((cat startsWith: self mainPackage) and: [(skipPackages includes: cat) not]) ifTrue: [" +
	"\n\t\t\tself deployPackage: ((Smalltalk at: #categories) at: cat)]]." +
	"\n\tself deploySelectors." +
	"\n\t\"generovani js souboru\"" +
	"\n\tself log: '.exporting classes and methods'." +
	"\n\tfileStream resetContents: ''." +
	"\n\tself exportClasses." +
	"\n\tself exportMethods] ensure: [" +
	"\n\t\tSmalltalk at: #deploying put: false]." +
	"\n\tfileStream append: String crlf, '//', DateAndTime now asString." +
	"\n\tself log: 'Done'.",
	null, "2014-01-16T12:23:42Z", "mp", 1);

jst.AppDeployer.addMethod("deploy", "", "processing", 
	"\tself log: 'Deploying \"', self mainPackage, '\", wait...'." +
	"\n\tSmalltalk at: #deploying put: true." +
	"\n\t[(Smalltalk at: #categories) keys asSortedCollection do: [:cat | " +
	"\n\t\t((cat startsWith: self mainPackage) and: [(skipPackages includes: cat) not]) ifTrue: [" +
	"\n\t\t\tself deployPackage: ((Smalltalk at: #categories) at: cat)]]." +
	"\n\tself deploySelectors." +
	"\n\t\"generovani js souboru\"" +
	"\n\tself log: '.exporting classes and methods'." +
	"\n\tfileStream resetContents: ''." +
	"\n\tself exportClasses." +
	"\n\tself exportMethods] ensure: [" +
	"\n\t\tSmalltalk at: #deploying put: false]." +
	"\n\tfileStream append: String crlf, 'jst.appVersion = \"', DateAndTime now asString, '\";'." +
	"\n\tself log: 'Done'.",
	null, "2014-05-06T13:12:34Z", "mp"); //jst-tools

jst.AppDeployer.addMethod("deployTo:named:", "couchDBDoc aString", "processing", 
	"\t(couchDBDoc server userRoles includes: #'_admin') ifFalse: [" +
	"\n\t\t^ self inform: 'Canceled' -> 'Log as CouchDB  administrator first!']." +
	"\n\tUIManager default " +
	"\n\t\tinformUser: 'Deploying ', aString, '...'" +
	"\n\t\tduring: [" +
	"\n\t\t\tself deploy." +
	"\n\t\t\tfileStream contentsDo: [:str |" +
	"\n\t\t\t\tcouchDBDoc attachData: (FSBlob on: str) name: aString type: 'application/javascript'." +
	"\n\t\t\t\tself inform: 'Success!' -> ('File ', aString, ' deployed to ', couchDBDoc url asString)]" +
	"\n\t\t].",
	null, "2013-07-09T13:16:03Z", "mp");

jst.AppDeployer.addMethod("deployPackage:", "aClassCategory", "private", 
	"\taClassCategory classes do: [:cls |" +
	"\n\t\tcls methodDict do: [:m |" +
	"\n\t\t\tselectors addUnique: m selector]]",
	null, "2012-07-17T09:23:57Z", "mp", 1);

jst.AppDeployer.addMethod("deployPackage:", "aClassCategory", "private", 
	"\taClassCategory classes do: [:cls |" +
	"\n\t\tcls methodDict do: [:m |" +
	"\n\t\t\t(self packageOk: m packageName) ifTrue: [" +
	"\n\t\t\t\tselectors addUnique: m selector]]]",
	null, "2013-11-07T07:50:36Z", "mp"); //jst-tools

jst.AppDeployer.addMethod("deployMethod:", "aMethod", "private", 
	"\t| coll |" +
	"\n\t\"trida\"" +
	"\n\t(#('jst-core' 'jst-core-proxy' 'jst-debug') includes: aMethod receiver jsFileName) ifFalse: [" +
	"\n\t\tclasses at: aMethod receiver theNonMetaClass name ifAbsentPut: [" +
	"\n\t\t\taMethod receiver theNonMetaClass]]." +
	"\n\t\"metoda\"" +
	"\n\tcoll := (aMethod receiver isMeta ifFalse: [methods] ifTrue: [classMethods])  " +
	"\n\t\tat: aMethod selector ifAbsentPut: [OrderedCollection new]." +
	"\n\t(coll includes: aMethod receiver) ifFalse: [" +
	"\n\t\tcoll add: aMethod receiver]." +
	"\n\t\"selektory v kodu metody\"" +
	"\n\taMethod selectors do: [:s | | sel |" +
	"\n\t\tsel := s first = $# ifTrue: [s allButFirst] ifFalse: s." +
	"\n\t\t(sel ~= aMethod selector and: [(methods includesKey: sel) not] " +
	"\n\t\t\tand: [(classMethods includesKey: sel) not]) ifTrue: [" +
	"\n\t\t\tselectors addUnique: sel]]." +
	"\n\t\"tridy v kodu metody\"" +
	"\n\taMethod classNames do: [:cn | | cls |" +
	"\n\t\tcls := Smalltalk classNamed: cn." +
	"\n\t\t(cls jsFileName startsWith: 'jst-core') ifFalse: [" +
	"\n\t\t\tclasses at: cn ifAbsentPut: cls]]",
	null, "2012-09-17T11:40:47Z", "mp", 1);

jst.AppDeployer.addMethod("deployMethod:", "aMethod", "private", 
	"\t| coll |" +
	"\n\t\"trida\"" +
	"\n\t(#('jst-core' 'jst-core-proxy' 'jst-debug') includes: aMethod receiver jsFileName) ifFalse: [" +
	"\n\t\tclasses at: aMethod receiver theNonMetaClass name ifAbsentPut: [" +
	"\n\t\t\taMethod receiver theNonMetaClass]]." +
	"\n\t\"metoda\"" +
	"\n\tcoll := (aMethod receiver isMeta ifFalse: [methods] ifTrue: [classMethods])  " +
	"\n\t\tat: aMethod selector ifAbsentPut: [OrderedCollection new]." +
	"\n\t(coll includes: aMethod receiver) ifFalse: [" +
	"\n\t\tcoll add: aMethod receiver]." +
	"\n\t\"selektory v kodu metody\"" +
	"\n\taMethod selectors do: [:s | | sel |" +
	"\n\t\tsel := s first = $# ifTrue: [s allButFirst] ifFalse: s." +
	"\n\t\t(sel ~= aMethod selector and: [(methods includesKey: sel) not] " +
	"\n\t\t\tand: [(classMethods includesKey: sel) not]) ifTrue: [" +
	"\n\t\t\tselectors addUnique: sel]]." +
	"\n\t\"tridy v kodu metody\"" +
	"\n\taMethod classNames do: [:cn | | cls |" +
	"\n\t\tcls := Smalltalk classNamed: cn." +
	"\n\t\t(cls jsFileName startsWith: 'jst-core') ifFalse: [" +
	"\n\t\t\tclasses at: cn ifAbsentPut: [" +
	"\n\t\t\t\tclassScan add: cls." +
	"\n\t\t\t\tcls deploySelectors do: [:sel |" +
	"\n\t\t\t\t\tselectors addUnique: sel]." +
	"\n\t\t\t\tcls]]]",
	null, "2013-07-09T09:07:23Z", "mp", 1);

jst.AppDeployer.addMethod("deployMethod:", "aMethod", "private", 
	"\t| coll |" +
	"\n\t\"trida\"" +
	"\n\t({ Object jsFile. JSObjectProxy jsFile. #'jst-debug'} includes: aMethod receiver jsFileName) ifFalse: [" +
	"\n\t\tclasses at: aMethod receiver theNonMetaClass name ifAbsentPut: [" +
	"\n\t\t\taMethod receiver theNonMetaClass]]." +
	"\n\t\"metoda\"" +
	"\n\tcoll := (aMethod receiver isMeta ifFalse: [methods] ifTrue: [classMethods])  " +
	"\n\t\tat: aMethod selector ifAbsentPut: [OrderedCollection new]." +
	"\n\t(coll includes: aMethod receiver) ifFalse: [" +
	"\n\t\tcoll add: aMethod receiver]." +
	"\n\t\"selektory v kodu metody\"" +
	"\n\taMethod selectors do: [:s | | sel |" +
	"\n\t\tsel := s first = $# ifTrue: [s allButFirst] ifFalse: s." +
	"\n\t\t(sel ~= aMethod selector and: [(methods includesKey: sel) not] " +
	"\n\t\t\tand: [(classMethods includesKey: sel) not]) ifTrue: [" +
	"\n\t\t\tselectors addUnique: sel]]." +
	"\n\t\"tridy v kodu metody\"" +
	"\n\taMethod classNames do: [:cn | | cls |" +
	"\n\t\tcls := Smalltalk classNamed: cn." +
	"\n\t\t(cls jsFileName startsWith: Object jsFile) ifFalse: [" +
	"\n\t\t\tclasses at: cn ifAbsentPut: [" +
	"\n\t\t\t\tclassScan add: cls." +
	"\n\t\t\t\tcls deploySelectors do: [:sel |" +
	"\n\t\t\t\t\tselectors addUnique: sel]." +
	"\n\t\t\t\tcls]]]",
	null, "2013-10-22T13:29:23Z", "mp", 1);

jst.AppDeployer.addMethod("deployMethod:", "aMethod", "private", 
	"\t| coll |" +
	"\n\t\"trida\"" +
	"\n\t({ Object jsFile. JSObjectProxy jsFile. #'jst-debug'} includes: aMethod receiver jsFileName) ifFalse: [" +
	"\n\t\tclasses at: aMethod receiver theNonMetaClass name ifAbsentPut: [" +
	"\n\t\t\taMethod receiver theNonMetaClass]]." +
	"\n\t\"metoda\"" +
	"\n\tcoll := (aMethod receiver isMeta ifFalse: [methods] ifTrue: [classMethods])  " +
	"\n\t\tat: aMethod selector ifAbsentPut: [OrderedCollection new]." +
	"\n\t(coll includes: aMethod receiver) ifFalse: [" +
	"\n\t\tcoll add: aMethod receiver]." +
	"\n\t\"selektory v kodu metody, mimo doIt/doIt:\"" +
	"\n\taMethod selectors do: [:s | | sel |" +
	"\n\t\tsel := s first = $# ifTrue: [s allButFirst] ifFalse: s." +
	"\n\t\t(sel ~= aMethod selector " +
	"\n\t\t\tand: [(methods includesKey: sel) not] " +
	"\n\t\t\tand: [(classMethods includesKey: sel) not] " +
	"\n\t\t\tand: [(sel startsWith: #doIt) not]) ifTrue: [" +
	"\n\t\t\tselectors addUnique: sel]]." +
	"\n\t\"tridy v kodu metody\"" +
	"\n\taMethod classNames do: [:cn | | cls |" +
	"\n\t\tcls := Smalltalk classNamed: cn." +
	"\n\t\t((cls jsFileName startsWith: Object jsFile) not and: [cls category ~= Parser category]) ifTrue: [" +
	"\n\t\t\tclasses at: cn ifAbsentPut: [" +
	"\n\t\t\t\tclassScan add: cls." +
	"\n\t\t\t\tcls deploySelectors do: [:sel |" +
	"\n\t\t\t\t\tselectors addUnique: sel]." +
	"\n\t\t\t\tcls]]]",
	null, "2013-11-04T08:57:06Z", "mp", 1);

jst.AppDeployer.addMethod("deployMethod:", "aMethod", "private", 
	"\t| coll |" +
	"\n\t\"trida\"" +
	"\n\t(SkipFiles includes: aMethod receiver jsFileName) ifFalse: [" +
	"\n\t\tclasses at: aMethod receiver theNonMetaClass name ifAbsentPut: [" +
	"\n\t\t\taMethod receiver theNonMetaClass]]." +
	"\n\t\"metoda\"" +
	"\n\tcoll := (aMethod receiver isMeta ifFalse: [methods] ifTrue: [classMethods])  " +
	"\n\t\tat: aMethod selector ifAbsentPut: [OrderedCollection new]." +
	"\n\t(coll includes: aMethod receiver) ifFalse: [" +
	"\n\t\tcoll add: aMethod receiver]." +
	"\n\t\"selektory v kodu metody, mimo doIt/doIt:\"" +
	"\n\taMethod selectors do: [:s | | sel |" +
	"\n\t\tsel := s first = $# ifTrue: [s allButFirst] ifFalse: s." +
	"\n\t\t(sel ~= aMethod selector " +
	"\n\t\t\tand: [(methods includesKey: sel) not] " +
	"\n\t\t\tand: [(classMethods includesKey: sel) not] " +
	"\n\t\t\tand: [(sel startsWith: #doIt) not]) ifTrue: [" +
	"\n\t\t\tselectors addUnique: sel]]." +
	"\n\t\"tridy v kodu metody\"" +
	"\n\taMethod classNames do: [:cn | | cls |" +
	"\n\t\tcls := Smalltalk classNamed: cn." +
	"\n\t\t(SkipFiles includes: cls jsFileName) ifFalse: [" +
	"\n\t\t\tclasses at: cn ifAbsentPut: [" +
	"\n\t\t\t\tclassScan add: cls." +
	"\n\t\t\t\tcls deploySelectors do: [:sel |" +
	"\n\t\t\t\t\tselectors addUnique: sel]." +
	"\n\t\t\t\tcls]]]",
	null, "2013-11-06T10:27:40Z", "mp", 1);

jst.AppDeployer.addMethod("deployMethod:", "aMethod", "private", 
	"\t| coll |" +
	"\n\t\"trida\"" +
	"\n\tclasses at: aMethod receiver theNonMetaClass name ifAbsentPut: [" +
	"\n\t\taMethod receiver theNonMetaClass]." +
	"\n\t\"metoda\"" +
	"\n\tcoll := (aMethod receiver isMeta ifFalse: [methods] ifTrue: [classMethods])  " +
	"\n\t\tat: aMethod selector ifAbsentPut: [OrderedCollection new]." +
	"\n\t(coll includes: aMethod receiver) ifFalse: [" +
	"\n\t\tcoll add: aMethod receiver]." +
	"\n\t\"selektory v kodu metody, mimo doIt/doIt:\"" +
	"\n\taMethod selectors do: [:s | | sel |" +
	"\n\t\tsel := s first = $# ifTrue: [s allButFirst] ifFalse: s." +
	"\n\t\t(sel ~= aMethod selector " +
	"\n\t\t\tand: [(methods includesKey: sel) not] " +
	"\n\t\t\tand: [(classMethods includesKey: sel) not] " +
	"\n\t\t\tand: [(sel startsWith: #doIt) not]) ifTrue: [" +
	"\n\t\t\tselectors addUnique: sel]]." +
	"\n\t\"tridy v kodu metody\"" +
	"\n\taMethod classNames do: [:cn | | cls |" +
	"\n\t\tcls := Smalltalk classNamed: cn." +
	"\n\t\t(SkipFiles includes: cls jsFileName) ifFalse: [" +
	"\n\t\t\tclasses at: cn ifAbsentPut: [" +
	"\n\t\t\t\tclassScan add: cls." +
	"\n\t\t\t\tcls deploySelectors do: [:sel |" +
	"\n\t\t\t\t\tselectors addUnique: sel]." +
	"\n\t\t\t\tcls]]]",
	null, "2013-11-06T21:58:41Z", "mp"); //jst-tools

jst.AppDeployer.addMethod("deploySelectors", "", "private", 
	"\t| pckgs classScan |" +
	"\n\tself log: ' collecting methods...'." +
	"\n\tpckgs := basePackages, packages." +
	"\n\tclassScan := OrderedCollection new." +
	"\n\tSmalltalk allClassesDo: [:cls | " +
	"\n\t\t(cls jsFileName ~= 'jst-debug' and: [pckgs anySatisfy: [:n | cls category name startsWith: n]]) ifTrue: [" +
	"\n\t\t\tclassScan add: cls; add: cls class]]." +
	"\n\t[selectors size > 0] whileTrue: [ | sel |" +
	"\n\t\tsel := selectors removeFirst." +
	"\n\t\tclassScan do: [:cls | " +
	"\n\t\t\tcls methodDict at: sel ifPresent: [:m |" +
	"\n\t\t\t\tself deployMethod: m]]].",
	null, "2012-09-15T07:56:28Z", "mp", 1);

jst.AppDeployer.addMethod("deploySelectors", "", "private", 
	"\t| pckgs classScan |" +
	"\n\tself log: ' collecting methods...'." +
	"\n\tpckgs := basePackages, packages." +
	"\n\tclassScan := OrderedCollection new." +
	"\n\tSmalltalk allClassesDo: [:cls | " +
	"\n\t\t(cls jsFileName ~= 'jst-debug' and: [pckgs anySatisfy: [:n | cls category name startsWith: n]]) ifTrue: [" +
	"\n\t\t\tclassScan add: cls; add: cls class." +
	"\n\t\t\tcls deploySelectors do: [:sel |" +
	"\n\t\t\t\tselectors addUnique: sel]]]." +
	"\n\t[selectors size > 0] whileTrue: [ | sel |" +
	"\n\t\tsel := selectors removeFirst." +
	"\n\t\tclassScan do: [:cls | " +
	"\n\t\t\tcls methodDict at: sel ifPresent: [:m |" +
	"\n\t\t\t\tself deployMethod: m]]].",
	null, "2012-10-18T13:47:25Z", "mp", 1);

jst.AppDeployer.addMethod("deploySelectors", "", "private", 
	"\t| pckgs |" +
	"\n\tself log: ' collecting methods...'." +
	"\n\tpckgs := basePackages, packages." +
	"\n\tSmalltalk allClassesDo: [:cls | " +
	"\n\t\t(cls jsFileName ~= 'jst-debug' and: [pckgs anySatisfy: [:n | cls category name startsWith: n]]) ifTrue: [" +
	"\n\t\t\tclassScan add: cls; add: cls class." +
	"\n\t\t\tcls deploySelectors do: [:sel |" +
	"\n\t\t\t\tselectors addUnique: sel]]]." +
	"\n\t[selectors size > 0] whileTrue: [ | sel |" +
	"\n\t\tsel := selectors removeFirst." +
	"\n\t\tclassScan do: [:cls | cls methodDict at: sel ifPresent: [:m | " +
	"\n\t\t\t(m jsFileName = 'jst-debug') ifFalse: [" +
	"\n\t\t\t\tself deployMethod: m]]]]",
	null, "2013-07-09T09:06:43Z", "mp", 1);

jst.AppDeployer.addMethod("deploySelectors", "", "private", 
	"\t| pckgs |" +
	"\n\tself log: ' collecting methods...'." +
	"\n\tpckgs := basePackages, packages." +
	"\n\tSmalltalk allClassesDo: [:cls | " +
	"\n\t\t(cls jsFileName ~= #'jst-debug' and: [cls category ~= Parser category] " +
	"\n\t\tand: [pckgs anySatisfy: [:n | cls category name startsWith: n]]) ifTrue: [" +
	"\n\t\t\tclassScan add: cls; add: cls class." +
	"\n\t\t\tcls deploySelectors do: [:sel |" +
	"\n\t\t\t\tselectors addUnique: sel]]]." +
	"\n\t[selectors size > 0] whileTrue: [ | sel |" +
	"\n\t\tsel := selectors removeFirst." +
	"\n\t\tclassScan do: [:cls | cls methodDict at: sel ifPresent: [:m | " +
	"\n\t\t\t(m jsFileName = #'jst-debug') ifFalse: [" +
	"\n\t\t\t\tself deployMethod: m]]]]",
	null, "2013-10-22T15:13:54Z", "mp", 1);

jst.AppDeployer.addMethod("deploySelectors", "", "private", 
	"\t| pckgs |" +
	"\n\tself log: ' collecting methods...'." +
	"\n\tpckgs := basePackages, packages." +
	"\n\tSmalltalk allClassesDo: [:cls | " +
	"\n\t\t(cls jsFileName ~= #'jst-debug' and: [cls category ~= Parser category] " +
	"\n\t\tand: [pckgs anySatisfy: [:n | cls category name startsWith: n]]) ifTrue: [" +
	"\n\t\t\tclassScan add: cls; add: cls class." +
	"\n\t\t\tcls deploySelectors do: [:sel |" +
	"\n\t\t\t\tselectors addUnique: sel]]]." +
	"\n\t[selectors size > 0] whileTrue: [ | sel |" +
	"\n\t\tsel := selectors removeFirst." +
	"\n\t\tclassScan do: [:cls | cls methodDict at: sel ifPresent: [:m | " +
	"\n\t\t\tself deployMethod: m]]]",
	null, "2013-11-04T08:33:27Z", "mp", 1);

jst.AppDeployer.addMethod("deploySelectors", "", "private", 
	"\t| pckgs skip |" +
	"\n\tself log: '.collecting classes and methods'." +
	"\n\tpckgs := basePackages, packages." +
	"\n\tskip := { ContextPart jsFileName. Parser jsFileName}." +
	"\n\tSmalltalk allClassesDo: [:cls | " +
	"\n\t\t((skip includes: cls jsFileName) not" +
	"\n\t\tand: [pckgs anySatisfy: [:n | cls category name startsWith: n]]) ifTrue: [" +
	"\n\t\t\tclassScan add: cls; add: cls class." +
	"\n\t\t\tcls deploySelectors do: [:sel |" +
	"\n\t\t\t\tselectors addUnique: sel]]]." +
	"\n\t[selectors size > 0] whileTrue: [ | sel |" +
	"\n\t\tsel := selectors removeFirst." +
	"\n\t\tclassScan do: [:cls | cls methodDict at: sel ifPresent: [:m | " +
	"\n\t\t\tself deployMethod: m]]]",
	null, "2013-11-06T11:35:00Z", "mp", 1);

jst.AppDeployer.addMethod("deploySelectors", "", "private", 
	"\t| skip |" +
	"\n\tself log: '.collecting classes and methods'." +
	"\n\tskip := { ContextPart jsFileName. Parser jsFileName}." +
	"\n\tSmalltalk allClassesDo: [:cls | " +
	"\n\t\t((self packageOk: cls packageName) and: [(skip includes: cls jsFileName) not]) ifTrue: [" +
	"\n\t\t\tclassScan add: cls; add: cls class." +
	"\n\t\t\tcls deploySelectors do: [:sel |" +
	"\n\t\t\t\tselectors addUnique: sel]]]." +
	"\n\t[selectors size > 0] whileTrue: [ | sel |" +
	"\n\t\tsel := selectors removeFirst." +
	"\n\t\tclassScan do: [:cls | cls methodDict at: sel ifPresent: [:m | " +
	"\n\t\t\t(m packageName startsWith: #tools) ifFalse: [" +
	"\n\t\t\t\tself deployMethod: m]]]]",
	null, "2013-11-07T07:55:10Z", "mp", 1);

jst.AppDeployer.addMethod("deploySelectors", "", "private", 
	"\t| skip skipMethodPackages |" +
	"\n\tself log: '.collecting classes and methods'." +
	"\n\tskip := { ContextPart jsFileName. Parser jsFileName}." +
	"\n\tSmalltalk allClassesDo: [:cls | \t((self packageOk: cls packageName) " +
	"\n\t\tand: [(skipPackages includes: cls packageName) not] " +
	"\n\t\tand: [(skip includes: cls jsFileName) not]) ifTrue: [" +
	"\n\t\t\tclassScan add: cls; add: cls class." +
	"\n\t\t\tcls deploySelectors do: [:sel |" +
	"\n\t\t\t\tselectors addUnique: sel]]]." +
	"\n\tskipMethodPackages := skipPackages collect: [:n | n asLowercase]." +
	"\n\t[selectors size > 0] whileTrue: [ | sel |" +
	"\n\t\tsel := selectors removeFirst." +
	"\n\t\tclassScan do: [:cls | cls methodDict at: sel ifPresent: [:m | ((m packageName startsWith: #tools) " +
	"\n\t\t\tor: [m category name first = $* and: [skipMethodPackages includes: m packageName]]) ifFalse: [" +
	"\n\t\t\t\tself deployMethod: m]]]]",
	null, "2014-01-16T14:53:00Z", "mp"); //jst-tools

jst.AppDeployer.addMethod("exportClasses", "", "private", 
	"\t| list |" +
	"\n\tlist := OrderedCollection new." +
	"\n\tclasses do: [:cls | | clsList i |" +
	"\n\t\tclsList := cls allSuperclasses reversed allButFirst." +
	"\n\t\tclsList add: cls." +
	"\n\t\t(packages anySatisfy: [:n | cls category name startsWith: n]) ifTrue: [ | coll |" +
	"\n\t\t\t\"an attempt to add classes without methods\"" +
	"\n\t\t\tcoll := cls allSubclasses select: [:c | c methodDict isEmpty]." +
	"\n\t\t\t[coll size > 0] whileTrue: [" +
	"\n\t\t\t\tcoll removeLast withAllSuperclasses reversed allButFirst do: [:c |" +
	"\n\t\t\t\t\t(clsList includes: c) ifFalse: [" +
	"\n\t\t\t\t\t\tclsList add: c]]]" +
	"\n\t\t]." +
	"\n\t\ti := 1." +
	"\n\t\t[clsList isEmpty] whileFalse: [" +
	"\n\t\t\t[i <= list size and: [clsList first ~= (list at: i)]] whileTrue: [" +
	"\n\t\t\t\ti := i + 1]." +
	"\n\t\t\ti > list size " +
	"\n\t\t\t\tifTrue: [\"trida neni v seznamu, pridam vsechny\"" +
	"\n\t\t\t\t\t[list add: clsList removeFirst] doWhileTrue: [" +
	"\n\t\t\t\t\t\tclsList size > 0]]" +
	"\n\t\t\t\tifFalse: [\"tridu jsem nasel\"" +
	"\n\t\t\t\t\tclsList removeFirst." +
	"\n\t\t\t\t\ti := i + 1]" +
	"\n\t\t]" +
	"\n\t]." +
	"\n\t(list select: [:c | (c jsFileName startsWith: 'jst-core') not and: [c category name ~= 'JSTParser']]) do: [:cls |" +
	"\n\t\tfileStream " +
	"\n\t\t\tappend: String crlf;" +
	"\n\t\t\tappend: cls javascriptDefinition;" +
	"\n\t\t\tappend: String crlf" +
	"\n\t]",
	null, "2012-11-16T20:39:41Z", "mp", 1);

jst.AppDeployer.addMethod("exportClasses", "", "private", 
	"\t| list |" +
	"\n\tlist := OrderedCollection new." +
	"\n\tclasses do: [:cls | | clsList i |" +
	"\n\t\tclsList := cls allSuperclasses reversed allButFirst." +
	"\n\t\tclsList add: cls." +
	"\n\t\t(packages anySatisfy: [:n | cls category name startsWith: n]) ifTrue: [ | coll |" +
	"\n\t\t\t\"an attempt to add classes without methods\"" +
	"\n\t\t\tcoll := cls allSubclasses select: [:c | c methodDict isEmpty]." +
	"\n\t\t\t[coll size > 0] whileTrue: [" +
	"\n\t\t\t\tcoll removeLast withAllSuperclasses reversed allButFirst do: [:c |" +
	"\n\t\t\t\t\t(clsList includes: c) ifFalse: [" +
	"\n\t\t\t\t\t\tclsList add: c]]]" +
	"\n\t\t]." +
	"\n\t\ti := 1." +
	"\n\t\t[clsList isEmpty] whileFalse: [" +
	"\n\t\t\t[i <= list size and: [clsList first ~= (list at: i)]] whileTrue: [" +
	"\n\t\t\t\ti := i + 1]." +
	"\n\t\t\ti > list size " +
	"\n\t\t\t\tifTrue: [\"trida neni v seznamu, pridam vsechny\"" +
	"\n\t\t\t\t\t[list add: clsList removeFirst] doWhileTrue: [" +
	"\n\t\t\t\t\t\tclsList size > 0]]" +
	"\n\t\t\t\tifFalse: [\"tridu jsem nasel\"" +
	"\n\t\t\t\t\tclsList removeFirst." +
	"\n\t\t\t\t\ti := i + 1]" +
	"\n\t\t]" +
	"\n\t]." +
	"\n\t(list select: [:c | (c jsFileName startsWith: Object jsFile) not]) do: [:cls |" +
	"\n\t\tfileStream " +
	"\n\t\t\tappend: String crlf;" +
	"\n\t\t\tappend: cls javascriptDefinition;" +
	"\n\t\t\tappend: String crlf" +
	"\n\t]",
	null, "2013-10-22T15:16:26Z", "mp", 1);

jst.AppDeployer.addMethod("exportClasses", "", "private", 
	"\t| list |" +
	"\n\tlist := OrderedCollection new." +
	"\n\tclasses do: [:cls | | clsList i |" +
	"\n\t\tclsList := cls allSuperclasses reversed allButFirst." +
	"\n\t\tclsList add: cls." +
	"\n\t\t(packages anySatisfy: [:n | cls category name startsWith: n]) ifTrue: [ | coll |" +
	"\n\t\t\t\"an attempt to add classes without methods\"" +
	"\n\t\t\tcoll := cls allSubclasses select: [:c | c methodDict isEmpty]." +
	"\n\t\t\t[coll size > 0] whileTrue: [" +
	"\n\t\t\t\tcoll removeLast withAllSuperclasses reversed allButFirst do: [:c |" +
	"\n\t\t\t\t\t(clsList includes: c) ifFalse: [" +
	"\n\t\t\t\t\t\tclsList add: c]]]" +
	"\n\t\t]." +
	"\n\t\ti := 1." +
	"\n\t\t[clsList isEmpty] whileFalse: [" +
	"\n\t\t\t[i <= list size and: [clsList first ~= (list at: i)]] whileTrue: [" +
	"\n\t\t\t\ti := i + 1]." +
	"\n\t\t\ti > list size " +
	"\n\t\t\t\tifTrue: [\"trida neni v seznamu, pridam vsechny\"" +
	"\n\t\t\t\t\t[list add: clsList removeFirst] doWhileTrue: [" +
	"\n\t\t\t\t\t\tclsList size > 0]]" +
	"\n\t\t\t\tifFalse: [\"tridu jsem nasel\"" +
	"\n\t\t\t\t\tclsList removeFirst." +
	"\n\t\t\t\t\ti := i + 1]" +
	"\n\t\t]" +
	"\n\t]." +
	"\n\tlist select: [:c | (c jsFileName asString startsWith: Object jsFile) not] thenDo: [:cls |" +
	"\n\t\tfileStream " +
	"\n\t\t\tappend: String crlf;" +
	"\n\t\t\tappend: cls javascriptDefinition;" +
	"\n\t\t\tappend: String crlf" +
	"\n\t]",
	null, "2013-11-04T07:40:13Z", "mp", 1);

jst.AppDeployer.addMethod("exportClasses", "", "private", 
	"\t| list |" +
	"\n\tlist := OrderedCollection new." +
	"\n\tclasses do: [:cls | | clsList i |" +
	"\n\t\tclsList := cls allSuperclasses reversed allButFirst." +
	"\n\t\tclsList add: cls." +
	"\n\t\t(packages anySatisfy: [:n | cls category name startsWith: n]) ifTrue: [ | coll |" +
	"\n\t\t\t\"an attempt to add classes without methods\"" +
	"\n\t\t\tcoll := cls allSubclasses select: [:c | " +
	"\n\t\t\t\tc methodDict isEmpty and: [self packageOk: c packageName]]." +
	"\n\t\t\t[coll size > 0] whileTrue: [" +
	"\n\t\t\t\tcoll removeLast withAllSuperclasses reversed allButFirst do: [:c |" +
	"\n\t\t\t\t\t(clsList includes: c) ifFalse: [" +
	"\n\t\t\t\t\t\tclsList add: c]]]" +
	"\n\t\t]." +
	"\n\t\ti := 1." +
	"\n\t\t[clsList isEmpty] whileFalse: [" +
	"\n\t\t\t[i <= list size and: [clsList first ~= (list at: i)]] whileTrue: [" +
	"\n\t\t\t\ti := i + 1]." +
	"\n\t\t\ti > list size " +
	"\n\t\t\t\tifTrue: [\"trida neni v seznamu, pridam vsechny\"" +
	"\n\t\t\t\t\t[list add: clsList removeFirst] doWhileTrue: [" +
	"\n\t\t\t\t\t\tclsList size > 0]]" +
	"\n\t\t\t\tifFalse: [\"tridu jsem nasel\"" +
	"\n\t\t\t\t\tclsList removeFirst." +
	"\n\t\t\t\t\ti := i + 1]" +
	"\n\t\t]" +
	"\n\t]." +
	"\n\tlist select: [:c | (SkipFiles includes: c jsFileName) not] thenDo: [:cls |" +
	"\n\t\tfileStream " +
	"\n\t\t\tappend: String crlf;" +
	"\n\t\t\tappend: cls javascriptDefinition;" +
	"\n\t\t\tappend: String crlf" +
	"\n\t]",
	null, "2013-11-07T07:55:49Z", "mp", 1);

jst.AppDeployer.addMethod("exportClasses", "", "private", 
	"\t| list |" +
	"\n\tlist := OrderedCollection new." +
	"\n\tclasses do: [:cls | | clsList i |" +
	"\n\t\tclsList := cls allSuperclasses reversed allButFirst." +
	"\n\t\tclsList add: cls." +
	"\n\t\t(packages anySatisfy: [:n | (cls packageName startsWith: n) " +
	"\n\t\t\tand: [(skipPackages includes: cls packageName) not]]) ifTrue: [ | coll |" +
	"\n\t\t\t\"an attempt to add classes without methods\"" +
	"\n\t\t\tcoll := cls allSubclasses select: [:c | " +
	"\n\t\t\t\tc methodDict isEmpty and: [self packageOk: c packageName]]." +
	"\n\t\t\t[coll size > 0] whileTrue: [" +
	"\n\t\t\t\tcoll removeLast withAllSuperclasses reversed allButFirst do: [:c |" +
	"\n\t\t\t\t\t(clsList includes: c) ifFalse: [" +
	"\n\t\t\t\t\t\tclsList add: c]]]" +
	"\n\t\t]." +
	"\n\t\ti := 1." +
	"\n\t\t[clsList isEmpty] whileFalse: [" +
	"\n\t\t\t[i <= list size and: [clsList first ~= (list at: i)]] whileTrue: [" +
	"\n\t\t\t\ti := i + 1]." +
	"\n\t\t\ti > list size " +
	"\n\t\t\t\tifTrue: [\"trida neni v seznamu, pridam vsechny\"" +
	"\n\t\t\t\t\t[list add: clsList removeFirst] doWhileTrue: [" +
	"\n\t\t\t\t\t\tclsList size > 0]]" +
	"\n\t\t\t\tifFalse: [\"tridu jsem nasel\"" +
	"\n\t\t\t\t\tclsList removeFirst." +
	"\n\t\t\t\t\ti := i + 1]" +
	"\n\t\t]" +
	"\n\t]." +
	"\n\tlist select: [:c | (SkipFiles includes: c jsFileName) not] thenDo: [:cls |" +
	"\n\t\tfileStream " +
	"\n\t\t\tappend: String crlf;" +
	"\n\t\t\tappend: cls javascriptDefinition;" +
	"\n\t\t\tappend: String crlf" +
	"\n\t]",
	null, "2014-01-16T12:29:56Z", "mp"); //jst-tools

jst.AppDeployer.addMethod("packageOk:", "name", "private", function (name){
	var test = function(n){return name.startsWith_(n);};
	return (this._packages.anySatisfy_(test) || this._basePackages.anySatisfy_(test)) 
		&& !name.asLowercase().startsWith_('tools');
},
	null, "2013-11-06T22:24:42Z", "mp", 1);

jst.AppDeployer.addMethod("packageOk:", "name", "private", function (name){
	var self = this;
	var test = function(n){
		return name.startsWith_(n) && !self._skipPackages.includes_(n);};
	return (this._packages.anySatisfy_(test) || this._basePackages.anySatisfy_(test)) 
		&& !name.asLowercase().startsWith_('tools');
},
	null, "2014-01-16T12:37:27Z", "mp"); //jst-tools

jst.AppDeployer.addMethod("mainPackage", "", "accessing", 
	"\t^ packages first",
	null, "2014-01-16T12:15:49Z", "mp");

jst.AppDeployer.addMethod("skipPackages:", "aCollection", "accessing", 
	"\t\"full package names to skip\"" +
	"\n\tskipPackages := aCollection",
	null, "2014-01-16T12:22:33Z", "mp");

/*
jst.AppDeployer.addMethod("exportMethods", "", "private", 
	"\tclassMethods keysAndValuesDo: [:msel :clsList |" +
	"\n\t\tclsList do: [:cls |" +
	"\n\t\t\tfileStream append: ('jst.{1}[\"{2}\"] = {3};{4}' format: {" +
	"\n\t\t\t\tcls theNonMetaClass name. " +
	"\n\t\t\t\tmsel asFunctionName. " +
	"\n\t\t\t\t(cls methodDict at: msel) asJavascript." +
	"\n\t\t\t\tString crlf})]" +
	"\n\t]." +
	"\n\tmethods keysAndValuesDo: [:msel :clsList |" +
	"\n\t\tclsList do: [:cls |" +
	"\n\t\t\tfileStream append: ('jst.{1}.constructor.prototype[\"{2}\"] = {3}{4};' format: {" +
	"\n\t\t\t\tcls name. " +
	"\n\t\t\t\tmsel asFunctionName. " +
	"\n\t\t\t\t(cls methodDict at: msel) asJavascript." +
	"\n\t\t\t\tString crlf})]" +
	"\n\t]." +
	"\n\t\"inicializace trid uplne nakonec\"" +
	"\n\t((classMethods at: #initialize) asSortedCollection: [:a :b | b isKindOf: a]) do: [:cls |" +
	"\n\t\tfileStream append: ('jst.{1}.initialize();{2}' format: {" +
	"\n\t\t\tcls theNonMetaClass name. " +
	"\n\t\t\tString crlf})].",
	null, "2012-09-14T20:45:05Z", "mp");
*/
jst.AppDeployer.addMethod("exportMethod:of:", "name aClass", "private", function (name,aClass){
	var m = aClass.methodDict().at_(name);
	if (m.jsFileName().isNil())
		this.error_("Sorry, cannot deploy the method!");
	if (!m.jsFileName().startsWith_("jst-core") && m.jsFileName() != "jst-parser"
		&& (m.jsFileName() != "jst-debug" || (m.priorVersion().notNil() && !m.priorVersion().jsFileName().startsWith_("jst-core")))) 
		this.exportMethod_(m);
	return this;
},
	null, "2012-11-01T15:02:01Z", "mp", 1);

jst.AppDeployer.addMethod("exportMethod:of:", "name aClass", "private", 
	function (name,aClass){
	var m = aClass.methodDict().at_(name);
	if (m.jsFileName().isNil())
		this.exportMethod_(m); //new added method
	else if (!m.jsFileName().startsWith_("jst-core") && m.jsFileName() != "jst-parser"
		&& (m.jsFileName() != "jst-debug" || (m.priorVersion().notNil() && !m.priorVersion().jsFileName().startsWith_("jst-core")))) 
		this.exportMethod_(m);
	return this;
},
	null, "2012-11-18T22:25:31Z", "mp", 1);

jst.AppDeployer.addMethod("exportMethod:of:", "name aClass", "private", 
	"\t| m fname |" +
	"\n\tm := aClass methodDict at: name." +
	"\n\tfname := m jsFileName." +
	"\n\t((fname = ContextPart jsFile and: [m priorVersion notNil] and: [(SkipFiles includes: m priorVersion jsFileName) not])" +
	"\n\t\tor: [(SkipFiles includes: fname) not]) ifTrue: [" +
	"\n\t\tself exportMethod: m]",
	null, "2013-11-06T12:05:08Z", "mp"); //jst-tools

jst.AppDeployer.addMethod("exportMethod:", "m", "private", 
	"\t| fn |" +
	"\n\tm jsFileName = 'jst-debug'  ifTrue: [" +
	"\n\t\tfn := m priorVersion source." +
	"\n\t\t(fn startsWith: 'function') ifFalse: [" +
	"\n\t\t\tfn := (Parser parseMethod: fn of: m receiver) asJavascript]" +
	"\n\t] ifFalse: [" +
	"\n\t\tfn := m asJavascript." +
	"\n\t\t(m fnName notNil and: [fn includesSubString: '[native code]']) ifTrue: [" +
	"\n\t\t\tfn := 'null']" +
	"\n\t]." +
	"\n\tfileStream append: ('{1}.addMethod(\"{2}\",\"{3}\",\"{4}\",{5}{6});{7}' format: {" +
	"\n\t\tm receiver javascriptName. " +
	"\n\t\tm selector. " +
	"\n\t\tm argumentsSeparatedBy: String space." +
	"\n\t\tm category name." +
	"\n\t\tfn ifNil: [m asJavascript]." +
	"\n\t\tm fnName ifNil: '' ifNotNil: [',\"', m fnName, '\"']." +
	"\n\t\tString crlf})",
	null, "2012-09-17T15:57:29Z", "mp", 1);

jst.AppDeployer.addMethod("exportMethod:", "m", "private", 
	"\t| fn |" +
	"\n\tm jsFileName = #'jst-debug'  ifTrue: [" +
	"\n\t\tfn := m priorVersion source." +
	"\n\t\t(fn startsWith: 'function') ifFalse: [" +
	"\n\t\t\tfn := (Parser parseMethod: fn of: m receiver) asJavascript]" +
	"\n\t] ifFalse: [" +
	"\n\t\tfn := m asJavascript." +
	"\n\t\t(m fnName notNil and: [fn includesSubString: '[native code]']) ifTrue: [" +
	"\n\t\t\tfn := 'null']" +
	"\n\t]." +
	"\n\tfileStream append: ('{1}.addMethod(\"{2}\",\"{3}\",\"{4}\",{5}{6});{7}' format: {" +
	"\n\t\tm receiver javascriptName. " +
	"\n\t\tm selector. " +
	"\n\t\tm argumentsSeparatedBy: String space." +
	"\n\t\tm category name." +
	"\n\t\tfn ifNil: [m asJavascript]." +
	"\n\t\tm fnName ifNil: '' ifNotNil: [',\"', m fnName, '\"']." +
	"\n\t\tString crlf})",
	null, "2013-10-22T13:30:26Z", "mp", 1);

jst.AppDeployer.addMethod("exportMethod:", "m", "private", 
	"\t| fn |" +
	"\n\tm jsFileName = #'jst-debug'  ifTrue: [" +
	"\n\t\tfn := m priorVersion source." +
	"\n\t\tm priorVersion isNative " +
	"\n\t\t\tifTrue: [fn := fn copyAfter: Character lf]" +
	"\n\t\t\tifFalse: [fn := (Parser parseMethod: fn of: m receiver) asJavascript]" +
	"\n\t] ifFalse: [" +
	"\n\t\tfn := m asJavascript." +
	"\n\t\t(m fnName notNil and: [fn includesSubString: '[native code]']) ifTrue: [" +
	"\n\t\t\tfn := 'null']" +
	"\n\t]." +
	"\n\tfileStream append: ('{1}.addMethod(\"{2}\",\"{3}\",\"{4}\",{5}{6});{7}' format: {" +
	"\n\t\tm receiver javascriptName. " +
	"\n\t\tm selector. " +
	"\n\t\tm argumentsSeparatedBy: String space." +
	"\n\t\tm category name." +
	"\n\t\tfn ifNil: [m asJavascript]." +
	"\n\t\tm fnName ifNil: '' ifNotNil: [',\"', m fnName, '\"']." +
	"\n\t\tString crlf})",
	null, "2013-11-04T08:10:09Z", "mp", 1);

jst.AppDeployer.addMethod("exportMethod:", "m", "private", 
	"\t| fn |" +
	"\n\tm jsFileName = #'jst-debug'  ifTrue: [" +
	"\n\t\tfn := m priorVersion asJavascript" +
	"\n\t] ifFalse: [" +
	"\n\t\tfn := m asJavascript." +
	"\n\t\t(m fnName notNil and: [fn includesSubString: '[native code]']) ifTrue: [" +
	"\n\t\t\tfn := 'null']" +
	"\n\t]." +
	"\n\tfileStream append: ('{1}.addMethod(\"{2}\",\"{3}\",\"{4}\",{5}{6});{7}' format: {" +
	"\n\t\tm receiver javascriptName. " +
	"\n\t\tm selector. " +
	"\n\t\tm argumentsSeparatedBy: String space." +
	"\n\t\tm category name." +
	"\n\t\tfn ifNil: [m asJavascript]." +
	"\n\t\tm fnName ifNil: '' ifNotNil: [',\"', m fnName, '\"']." +
	"\n\t\tString crlf})",
	null, "2013-11-05T15:09:50Z", "mp"); //jst-tools

jst.AppDeployer.addMethod("exportMethods", "", "private", 
	"\tclassMethods keysAndValuesDo: [:msel :clsList |" +
	"\n\t\tclsList do: [:cls |" +
	"\n\t\t\tself exportMethod: msel of: cls]" +
	"\n\t]." +
	"\n\tmethods keysAndValuesDo: [:msel :clsList |" +
	"\n\t\tclsList do: [:cls |" +
	"\n\t\t\tself exportMethod: msel of: cls]" +
	"\n\t]." +
	"\n\t\"inicializace trid uplne nakonec\"" +
	"\n\t((classMethods at: #initialize) asSortedCollection: [:a :b | " +
	"\n\t\ta theNonMetaClass initOrder < b theNonMetaClass initOrder]) do: [:cls |" +
	"\n\t\tfileStream append: ('jst.{1}.initialize();{2}' format: {" +
	"\n\t\t\tcls theNonMetaClass name. " +
	"\n\t\t\tString crlf})]",
	null, "2012-09-16T14:57:35Z", "mp", 1);

jst.AppDeployer.addMethod("exportMethods", "", "private", 
	"\tclassMethods keysAndValuesDo: [:msel :clsList |" +
	"\n\t\tclsList do: [:cls |" +
	"\n\t\t\tself exportMethod: msel of: cls]" +
	"\n\t]." +
	"\n\tmethods keysAndValuesDo: [:msel :clsList |" +
	"\n\t\tclsList do: [:cls |" +
	"\n\t\t\tself exportMethod: msel of: cls]" +
	"\n\t]." +
	"\n\t\"inicializace trid uplne nakonec\"" +
	"\n\t((classMethods at: #initialize) asSortedCollection: [:a :b | " +
	"\n\t\ta theNonMetaClass initOrder < b theNonMetaClass initOrder]) do: [:cls |" +
	"\n\t\t((cls methodDict at: #initialize) jsFileName startsWith: Object jsFile) ifFalse: [" +
	"\n\t\t\tfileStream append: ('jst.{1}.initialize();{2}' format: {" +
	"\n\t\t\t\tcls theNonMetaClass name. " +
	"\n\t\t\t\tString crlf})]]",
	null, "2013-10-22T15:46:36Z", "mp"); //jst-tools

jst.AppDeployer.addMethod("openWindow", "", "processing", 
	"\t^ Window new url: fileStream url; open",
	null, "2012-11-02T14:37:06Z", "mp");

// jst-core extensions

jst.Behavior.addMethod("deploySelectors", "", "*tools", 
	"\t^ #()",
	null, "2012-10-18T13:41:43Z", "mp");

//jst-files extensions

jst.FSFileList._class.addMethod("deploySelectors", "", "*tools", 
	"\t^ self methodDict keys",
	null, "2013-07-06T22:05:30Z", "mp");

//jst-couchdb extensions

jst.CouchDBDocument._class.addMethod("deploySelectors", "", "*tools", 
	"\t^ self methodDict keys select: [:str | str endsWith: 'Wrapper']",
	null, "2013-09-03T11:30:42Z", "mp");

// jst-ext extensions

/*
jst.ExtListener._class.addMethod("deploySelectors", "", "*tools", 
	"\t^ self events collect: [:e | e, 'Event']",
	null, "2012-10-18T13:44:43Z", "mp");

jst.ExtElement._class.addMethod("deploySelectors", "", "*tools", 
	"\t^ Events collect: [:e | e, 'Event']",
	null, "2012-10-18T13:43:21Z", "mp");
*/

jst.ExtListener._class.addMethod("deploySelectors", "", "*tools", 
	"\t^ self methodDict keys select: [:s | s endsWith: 'Handler']",
	null, "2013-07-06T20:42:43Z", "mp");

jst.ExtObservable._class.addMethod("deploySelectors", "", "*tools", 
	"\t^ self methodDict keys select: [:s | s endsWith: 'Event']",
	null, "2012-11-18T22:45:47Z", "mp");

jst.ExtComponentMgr._class.addMethod("deploySelectors", "", "*tools", 
	"\t^ #(getById:)",
	null, "2014-05-22T06:50:48Z", "mp");

// MethodVersion extensions

jst.MethodVersion.addMethod("versionDescription", "", "*tools", 
	"\t^ String streamContents: [:s |" +
	"\n\t\tself printFileInfoOn: s." +
	"\n\t\ts nextPutAll: (createdBy ifNil: 'mp'); " +
	"\n\t\t\tspace;" +
	"\n\t\t\tnextPutAll: (createdOn ifNil: '2011-12') asString;" +
	"\n\t\t\tspace]",
	null, "2013-06-01T20:23:35Z", "mp", 1);

jst.MethodVersion.addMethod("versionDescription", "", "*tools", 
	"\t^ String streamContents: [:s |" +
	"\n\t\tself printFileInfoOn: s." +
	"\n\t\ts nextPutAll: (createdBy ifNil: 'mp'); " +
	"\n\t\t\tspace;" +
	"\n\t\t\tnextPutAll: (createdOn ifNil: '2011-12') asString;" +
	"\n\t\t\tspace." +
	"\n\t\tself printDescriptionOn: s]",
	null, "2013-11-04T14:46:50Z", "mp"); //jst-tools

jst.MethodVersion.addMethod("printOn:", "s", "*tools", 
	"\ts nextPutAll: self versionDescription",
	null, "2013-11-04T15:03:56Z", "mp"); //jst-core

jst.MethodVersion.addMethod("body", "", "*tools", 
	"\t^ code copyAfter: Character lf",
	null, "2013-11-05T14:19:06Z", "mp"); //jst-kernel

jst.MethodVersion.addMethod("asJavascript", "", "*tools", 
	"\t^ self isNative " +
	"\n\t\tifTrue: [self body]" +
	"\n\t\tifFalse: [(Parser parseMethod: code of: self receiver) asJavascript]",
	null, "2013-11-05T15:07:52Z", "mp"); //jst-core

/* / Method extensions

jst.Method.addMethod("versionDescription", "", "*tools", 
	"\t^ String streamContents: [:s |" +
	"\n\t\tself printFileInfoOn: s." +
	"\n\t\ts nextPutAll: (createdBy ifNil: 'mp'); " +
	"\n\t\t\tspace;" +
	"\n\t\t\tnextPutAll: (createdOn ifNil: '2011-12') asString;" +
	"\n\t\t\tspace." +
	"\n\t\tself printOn: s]",
	null, "2013-06-01T18:57:32Z", "mp", 1);

jst.Method.addMethod("versionDescription", "", "*tools", 
	"\t^ super versionDescription, self printString",
	null, "2013-11-04T13:13:21Z", "mp"); //jst-tools
*/

//*** VersionsBrowser ***

jst.VersionsBrowser.addMethod("initialize", "", "initialization", 
	"\tcompare := SimpleAction new" +
	"\n\t\tlabel: 'compare to current';" +
	"\n\t\t tooltip: 'Open a separate window which shows the text differences'," +
	"\n\t\t\t' between the selected version and the current version.';" +
	"\n\t\ton: #compare of: self." +
	"\n\trevert := SimpleAction new" +
	"\n\t\tlabel: 'revert';" +
	"\n\t\ttooltip: 'Reverts the method to the version selected.';" +
	"\n\t\ton: #revert of: self." +
	"\n\tsuper initialize." +
	"\n\tmethodPanel actions: {" +
	"\n\t\tBrowseAction on: #method of: self." +
	"\n\t\tBrowseHierarchyAction on: #method of: self." +
	"\n\t\tnil." +
	"\n\t\tBrowseSendersAction on: #method of: self." +
	"\n\t\tBrowseImplementorsAction on: #method of: self." +
	"\n\t\tInheritanceAction on: #method of: self." +
	"\n\t\tnil." +
	"\n\t\tInstVarRefsAction on: #receiver of: self." +
	"\n\t\tClassVarRefsAction on: #receiver of: self." +
	"\n\t\tClassVariablesAction on: #receiver of: self." +
	"\n\t\tClassRefsAction on: #receiver of: self." +
	"\n\t\tnil." +
	"\n\t\tInspectAction new on: #method of: self; label: 'inspect method'; hotKey: nil." +
	"\n\t\tcompare." +
	"\n\t\trevert" +
	"\n\t}",
	null, "2013-06-03T13:08:29Z", "mp");

jst.VersionsBrowser.addMethod("buildPanels", "", "initialization", 
	"\tself closable: true;" +
	"\n\t\tstateful: true;" +
	"\n\t\tborder: false;" +
	"\n\t\twidth: 600;" +
	"\n\t\tminWidth: 450;" +
	"\n\t\theight: 450;" +
	"\n\t\tminHeight: 300;" +
	"\n\t\tplain: true;" +
	"\n\t\twithBorderLayout;" +
	"\n\t\tadd: (methodPanel := MessageSetPanel new region: (ExtSplitRegion north minHeight: 100); height: 170);" +
	"\n\t\tadd: (ExtPanel new border: false; region: (ExtRegion center minHeight: 150); withBorderLayout;" +
	"\n\t\t\tadd: (ExtToolbar new region: #north; height: 27;" +
	"\n\t\t\t\tadd: compare asButton;" +
	"\n\t\t\t\taddSeparator;" +
	"\n\t\t\t\tadd: revert asButton;" +
	"\n\t\t\t\taddFill;" +
	"\n\t\t\t\tadd: (diffs := ExtCheckbox new boxLabel: 'diffs'; checked: true;" +
	"\n\t\t\t\t\ton: #check do: [:box :checked | self update: #method with: methodPanel selectedItem]);" +
	"\n\t\t\t\taddSpace: 10;" +
	"\n\t\t\t\tyourself);" +
	"\n\t\t\tadd: (codePanel := BrowserCodeEditor new region: #center; readOnly: true);" +
	"\n\t\t\tyourself)",
	null, "2013-06-04T08:38:40Z", "mp");

jst.VersionsBrowser.addMethod("beforecloseEvent", "", "events", 
	"",
	null, "2013-05-31T15:09:04Z", "mp");

jst.VersionsBrowser.addMethod("installDependents", "", "initialization", 
	"\tmethodPanel" +
	"\n\t\taddDependent: self." +
	"\n\tcodePanel" +
	"\n\t\taddDependent: methodPanel;" +
	"\n\t\taddDependent: self",
	null, "2013-06-04T08:59:27Z", "mp");

jst.VersionsBrowser.addMethod("nameSelector", "", "private", 
	"\t^ #versionDescription",
	null, "2013-05-31T21:58:34Z", "mp");

jst.VersionsBrowser.addMethod("method", "", "accessing", 
	"\t^ methodPanel root hasChildNodes ifTrue: [" +
	"\n\t\tmethodPanel root children first link]",
	null, "2013-06-01T07:02:33Z", "mp");

jst.VersionsBrowser.addMethod("receiver", "", "accessing", 
	"\t^ self method receiver",
	null, "2013-06-01T22:08:58Z", "mp");

jst.VersionsBrowser.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #method ifTrue: [" +
	"\n\t\tcodePanel mode: (anObject isNative ifTrue: #javascript ifFalse: #smalltalk)." +
	"\n\t\tanObject priorVersion " +
	"\n\t\t\tifNotNil: [codePanel " +
	"\n\t\t\t\tdisplayPatchFrom: (TextDiffBuilder new from: anObject priorVersion source to: anObject source)" +
	"\n\t\t\t\tof: self method] " +
	"\n\t\t\tifNil: [codePanel contents: self method printMessagePattern, String crlf, anObject source]]",
	null, "2013-06-01T07:11:39Z", "mp", 1);

jst.VersionsBrowser.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #method ifTrue: [" +
	"\n\t\tcodePanel mode: (anObject isNative ifTrue: #javascript ifFalse: #smalltalk)." +
	"\n\t\tanObject priorVersion " +
	"\n\t\t\tifNotNil: [codePanel " +
	"\n\t\t\t\tdisplayPatchFrom: (TextDiffBuilder new " +
	"\n\t\t\t\t\tfrom: anObject priorVersion sourceCode " +
	"\n\t\t\t\t\tto: anObject sourceCode)" +
	"\n\t\t\t\tof: self method] " +
	"\n\t\t\tifNil: [codePanel contents: anObject sourceCode]]",
	null, "2013-06-01T12:20:35Z", "mp", 1);

jst.VersionsBrowser.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #method ifTrue: [" +
	"\n\t\tcompare isEnabled: anObject isMethod not." +
	"\n\t\trevert isEnabled: compare isEnabled." +
	"\n\t\tcodePanel mode: (anObject isNative ifTrue: #javascript ifFalse: #smalltalk)." +
	"\n\t\tanObject priorVersion " +
	"\n\t\t\tifNotNil: [codePanel displayPatchFrom: (" +
	"\n\t\t\t\tTextDiffBuilder new " +
	"\n\t\t\t\t\tfrom: anObject priorVersion sourceCode " +
	"\n\t\t\t\t\tto: anObject sourceCode)] " +
	"\n\t\t\tifNil: [codePanel contents: anObject sourceCode]]",
	null, "2013-06-03T13:14:28Z", "mp", 1);

jst.VersionsBrowser.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #method ifTrue: [" +
	"\n\t\tcompare isEnabled: anObject isMethod not." +
	"\n\t\trevert isEnabled: compare isEnabled." +
	"\n\t\tcodePanel " +
	"\n\t\t\tmode: (anObject isNative ifTrue: #javascript ifFalse: #smalltalk);" +
	"\n\t\t\treadOnly: anObject isMethod not;" +
	"\n\t\t\tsetMethod: self method." +
	"\n\t\tanObject priorVersion " +
	"\n\t\t\tifNotNil: [codePanel displayPatchFrom: (" +
	"\n\t\t\t\tTextDiffBuilder new " +
	"\n\t\t\t\t\tfrom: anObject priorVersion sourceCode " +
	"\n\t\t\t\t\tto: anObject sourceCode)] " +
	"\n\t\t\tifNil: [codePanel contents: anObject sourceCode]]",
	null, "2013-06-03T15:25:24Z", "mp", 1);

jst.VersionsBrowser.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #method ifTrue: [" +
	"\n\t\tcompare isEnabled: anObject isMethod not." +
	"\n\t\trevert isEnabled: compare isEnabled." +
	"\n\t\tcodePanel " +
	"\n\t\t\tmode: (anObject isNative ifTrue: #javascript ifFalse: #smalltalk);" +
	"\n\t\t\treadOnly: (anObject isMethod not or: [diffs checked]);" +
	"\n\t\t\tsetMethod: self method." +
	"\n\t\t(anObject priorVersion notNil and: [diffs checked])" +
	"\n\t\t\tifTrue: [codePanel displayPatchFrom: (" +
	"\n\t\t\t\tTextDiffBuilder new " +
	"\n\t\t\t\t\tfrom: anObject priorVersion sourceCode " +
	"\n\t\t\t\t\tto: anObject sourceCode)] " +
	"\n\t\t\tifFalse: [codePanel contents: anObject sourceCode]]",
	null, "2013-06-04T08:57:48Z", "mp");

jst.VersionsBrowser.addMethod("compare", "", "actions", 
	"\tExtWindow new" +
	"\n\t\ttitle: 'Comparison to Current Version' translated;" +
	"\n\t\tautoScroll: true;" +
	"\n\t\twidth: 600;" +
	"\n\t\theight: 400;" +
	"\n\t\tadd: (CodeEditor new border: false; readOnly: true;" +
	"\n\t\t\tdisplayPatchFrom: (TextDiffBuilder new " +
	"\n\t\t\t\tfrom:  self method sourceCode" +
	"\n\t\t\t\tto: methodPanel selectedItem sourceCode));" +
	"\n\t\tshow",
	null, "2013-06-03T14:11:26Z", "mp");

/*
jst.VersionsBrowser.addMethod("compare", "", "actions", 
	"\tExtWindow new" +
	"\n\t\ttitle: 'Comparison to Current Version' translated;" +
	"\n\t\tautoScroll: true;" +
	"\n\t\twidth: 600;" +
	"\n\t\theight: 400;" +
	"\n\t\tadd: (CodeEditor new border: false; readOnly: true;" +
	"\n\t\t\tdisplayPatchFrom: (TextDiffBuilder new " +
	"\n\t\t\t\tfrom:  methodPanel selectedItem sourceCode" +
	"\n\t\t\t\tto: self method sourceCode));" +
	"\n\t\tshow",
	null, "2013-06-04T07:57:18Z", "mp");
*/

jst.VersionsBrowser.addMethod("revert", "", "actions", 
	"\tself inform: 'Not yet implemented'",
	null, "2013-06-03T13:23:16Z", "mp");

jst.VersionsBrowser.addMethod("methodModified:usingEditor:", "m editor", "updating", 
	"\t(self method = m and: [codePanel == editor | codePanel editing not]) ifTrue: [ | sel |" +
	"\n\t\tsel := methodPanel selectedItem createdOn." +
	"\n\t\tmethodPanel clearSelections." +
	"\n\t\tmethodPanel" +
	"\n\t\t\tinitializeFrom: m versions " +
	"\n\t\t\twith: self nameSelector " +
	"\n\t\t\tselectFirst: false." +
	"\n\t\t(methodPanel selectNodeBy: [:n | n link createdOn = sel] silently: false) ifNil: [" +
	"\n\t\t\tmethodPanel selectionModel selectNode: methodPanel root children first]" +
	"\n\t]",
	null, "2013-06-03T21:27:47Z", "mp");

jst.VersionsBrowser.addMethod("codeEditing:", "editor", "updating", 
	"\tdiffs isDisabled: codePanel == editor",
	null, "2013-06-04T09:01:54Z", "mp");
