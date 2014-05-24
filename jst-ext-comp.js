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
 * Depends on jst-ext-core
 *
 */

// *** CLASSES ***

jst.currentJsFile = "jst-ext-comp";

jst.ExtBoxComponent.subclass("ExtButton", "", "", "", "Ext");
jst.ExtButton.subclass("ExtSplitButton", "", "", "", "Ext");

jst.ExtContainer.subclass("ExtPanel", "title", "", "", "Ext");
jst.ExtContainer.subclass("ExtViewport", "", "", "", "Ext");
jst.ExtPanel.subclass("ExtTabPanel", "hiddenItems", "", "", "Ext");
jst.ExtPanel.subclass("ExtWindow", "savedState animTarget", "", "", "Ext");
jst.ExtPanel.subclass("ExtButtonGroup", "", "", "", "Ext");

jst.ExtContainer.subclass("ExtMenu", "", "", "", "Ext-menu");
jst.ExtComponent.subclass("ExtMenuBaseItem", "", "", "", "Ext-menu");
jst.ExtMenuBaseItem.subclass("ExtMenuItem", "link", "", "", "Ext-menu");
jst.ExtMenuBaseItem.subclass("ExtMenuSeparator", "", "", "", "Ext-menu");
jst.ExtMenuBaseItem.subclass("ExtMenuTextItem", "", "", "", "Ext-menu");

jst.Collection.subclass("ExtWindowGroup", "gr", "Default", "", "Ext");

jst.ExtObservable.subclass("ExtNode", "attributes childNodes link", "", "", "Ext-data");
jst.ExtNode.subclass("ExtTreeNode", "", "", "", "Ext-tree");

jst.Collection.subclass("ChildNodes", "parent", "", "", "Ext-data");

jst.ExtObservable.subclass("ExtDefaultSelectionModel", "clearBlock", "", "", "Ext-tree");
jst.ExtPanel.subclass("ExtTreePanel", "", "", "", "Ext-tree");

jst.ExtTreeNode.subclass("ExtAsyncTreeNode", "", "", "", "Ext-tree");

jst.ExtObservable.subclass("ExtTreeLoader", "superProcessResponse superCreateNode responseDataExtractor nodeCreator urlType", "", "", "Ext-tree");

jst.ExtListener.subclass("ExtTreeLoaderListener", "", "", "", "Ext-event");
jst.ExtListener.subclass("ExtSelectionModelListener", "", "", "", "Ext-event");

jst.ExtDefaultListener.subclass("ExtWindowListener", "", "", "", "Ext-event");
jst.ExtDefaultListener.subclass("ExtTabPanelListener", "", "", "", "Ext-event");
jst.ExtDefaultListener.subclass("ExtMenuListener", "", "", "", "Ext-event");
jst.ExtDefaultListener.subclass("ExtNodeListener", "", "", "", "Ext-event");

//jst.ExtListener.subclass("ExtBeforeLoadListener", "", "", "", "Ext-event");
//jst.ExtListener.subclass("ExtLoadListener", "", "", "", "Ext-event");

//jst.ExtListener.subclass("ExtBeforeExpandListener", "", "", "", "Ext-event-tree");

//jst.ExtListener.subclass("ExtStateChangeListener", "", "", "", "Ext-event");
//jst.ExtListener.subclass("ExtBeforeTabChangeListener", "", "", "", "Ext-event-panel");
//jst.ExtListener.subclass("ExtTabChangeListener", "", "", "", "Ext-event-panel");

jst.Object.subclass("ExtManager", "", "", "", "Ext-state");

jst.ExtManager.klass().instanceVariableNames_("default");

jst.ExtObservable.subclass("ExtProvider", "state", "", "", "Ext-state");
jst.ExtProvider.subclass("ExtCookieProvider", "", "", "", "Ext-state");
jst.ExtProvider.subclass("LocalStorageProvider", "prefix", "", "", "Ext-state");

jst.ExtContainer.subclass("ExtToolbar", "", "", "", "Ext");

jst.ExtPanel.subclass("ExtTip", "", "", "", "Ext");
jst.ExtTip.subclass("ExtToolTip", "", "", "", "Ext");

// *** class comments ***

jst.ExtViewport.comment_(
	"A specialized container representing the viewable application area (the browser viewport)." +
	"<p>The Viewport renders itself to the document body, and automatically sizes itself to the size of the browser viewport and manages window resizing. There may only be one Viewport created in a page. Inner layouts are available by virtue of the fact that all Panels added to the Viewport, either through its items, or through the items, or the add method of any of its child Panels may themselves have a layout.</p>" +
	"<p>The Viewport does not provide scrolling, so child Panels within the Viewport should provide for scrolling if needed using the autoScroll config.</p>");

//*** METHODS ***

// *** ExtMenuListener ***

jst.ExtMenuListener.addMethod("clickHandler", "", "handlers", 
	"\t^ [:menu :item :event |" +
	"\n\t\tself handlerBlock valueWithPossibleArgs: {" +
	"\n\t\t\tmenu jstWrapper." +
	"\n\t\t\titem jstWrapper." +
	"\n\t\t\tExtEventObject current}]",
	null, "2013-06-22T13:31:30Z", "mp");

jst.ExtMenuListener.addMethod("mouseoutHandler", "", "handlers", 
	"\t^ [:menu :event :item |" +
	"\n\t\tself handlerBlock valueWithPossibleArgs: {" +
	"\n\t\t\tmenu jstWrapper." +
	"\n\t\t\titem jstWrapper." +
	"\n\t\t\tExtEventObject current}]",
	null, "2013-06-22T13:39:25Z", "mp");

jst.ExtMenuListener.addMethod("mouseoverHandler", "", "handlers", 
	"\t^ self mouseoutHandler",
	null, "2013-06-22T13:39:44Z", "mp");

//*** ExtMenu ***

jst.ExtMenu._class.addMethod("xtype", "", "accessing", "\t^ #menu");

jst.ExtMenu._class.addMethod("listenerClass", "", "accessing", 
	"\t^ ExtMenuListener",
	null, "2013-06-22T13:40:10Z", "mp");

jst.ExtMenu.addMethod("showSeparator:", "aBoolean", "accessing-config", "\tself configAt: #showSeparator put: aBoolean");
/*
jst.ExtMenu.addMethod("add:", "anItem", "adding items", 
	"\tobj\n\t\tifNil: [(config at: #items) add: anItem asJsObject]" +
	"\n\t\tifNotNil: [obj perform: #addItem with: anItem asJsObject]." +
	"\n\t^anItem");
jst.ExtMenu.addMethod("addSeparator", "", "adding items", "\t^ obj ifNil: [self add: '-'] ifNotNil: [obj addSeparator]"); 
*/

jst.ExtMenu.addMethod("add:", "anItem", "adding items", 
	"\tanItem isString ifTrue: [" +
	"\n\t\tanItem = '-' | (anItem = 'separator') ifTrue: [" +
	"\n\t\t\t^ self addSeparator]." +
	"\n\t\t^ self addText: anItem]." +
	"\n\tobj" +
	"\n\t\tifNil: [(config at: #items) add: anItem asJsObject]" +
	"\n\t\tifNotNil: [obj perform: #addItem with: anItem asJsObject]." +
	"\n\t^ anItem",
	null, "2012-02-17T15:58:49Z", "mp");

jst.ExtMenu.addMethod("addSeparator", "", "adding items", 
	"\t^ self add: ExtMenuSeparator new",
	null, "2012-02-17T15:37:41Z", "mp");

jst.ExtMenu.addMethod("addText:", "aString", "adding items", 
	"\t^ self add: (ExtMenuTextItem new text: aString)",
	null, "2012-02-17T15:56:27Z", "mp");

jst.ExtMenu.addMethod("showAt:", "aPoint", "rendering", "\tself asJsObject perform: #showAt with: aPoint asJsObject"); 

jst.ExtMenu.addMethod("clickEvent", "", "events", 
	"\t\"Fires when this menu is clicked (or when the enter key is pressed while it is active)\"",
	null, "2013-06-22T13:35:24Z", "mp"); //jst-ext-comp

jst.ExtMenu.addMethod("itemclickEvent", "", "events", 
	"\t\"Fires when a menu item contained in this menu is clicked\"",
	null, "2013-06-22T13:42:15Z", "mp"); //jst-ext-comp

jst.ExtMenu.addMethod("mouseoutEvent", "", "events", 
	"\t\"Fires when the mouse exits this menu\"",
	null, "2013-06-22T13:41:54Z", "mp"); //jst-ext-comp

jst.ExtMenu.addMethod("mouseoverEvent", "", "events", 
	"\t\"Fires when the mouse is hovering over this menu\"",
	null, "2013-06-22T13:42:43Z", "mp"); //jst-ext-comp

// *** ExtBoxComponent extensions ***

jst.ExtBoxComponent.addMethod("createMenu", "", "private", 
	"\tmenu " +
	"\n\t\tifNil: [self on: #beforedestroy do: [:c | menu destroy] \"only at the first time\"]" +
	"\n\t\tifNotNil: [menu destroy \"before creating a new menu\"]." +
	"\n\tmenu := ExtMenu new." +
	"\n\tactions do: [:act |" +
	"\n\t\tact ifNotNil: [menu add: act asMenuItem] ifNil: [menu addSeparator]]." +
	//"\n\tmenu actions: actions." +
	"\n\t^ menu",
	null, "2012-01-31T21:21:21Z", "mp");

//*** ExtMenuBaseItem ***

jst.ExtMenuBaseItem._class.addMethod("xtype", "", "accessing", "\t^ #menubaseitem");

jst.ExtMenuBaseItem.addMethod("parentMenu", "", "accessing", "\t^ (obj at: #parentMenu) jstWrapper");	

jst.ExtMenuBaseItem.addMethod("activateEvent", "", "events", 
	"\t\"returned handler block or instance of ExtDefaultListener is installed on initialization\"");

jst.ExtMenuBaseItem.addMethod("deactivateEvent", "", "events", 
	"\t\"returned handler block or instance of ExtDefaultListener is installed on initialization\"");

jst.ExtMenuBaseItem.addMethod("clickEvent", "", "events", 
	"\t\"vraceny handler nebo ExtClickListener bude automaticky nainstalovan pri inicializaci\"");

jst.ExtMenuBaseItem.addMethod("link", "", "accessing", 
	"\t^ nil",
	null, "2012-02-19T22:19:51Z", "mp");

jst.ExtMenuBaseItem.addMethod("isSeparator", "", "testing", 
	"\t^ false",
	null, "2013-12-18T21:05:18Z", "mp");

//*** ExtMenuItem ***

jst.ExtMenuItem._class.addMethod("xtype", "", "accessing", "\t^ #menuitem");

jst.ExtMenuItem.addMethod("menu", "", "accessing-config", "\t^ self at: #menu");	

jst.ExtMenuItem.addMethod("menu:", "anExtMenu", "accessing-config", 
	"\tself configAt: #menu put: anExtMenu",
	null, "2011-11-22T15:17:46Z", "mp");

jst.ExtMenuItem.addMethod("icon:", "pathString", "accessing-config", 
	"\tself configAt: #icon put: pathString",
	null, "2011-11-22T15:22:15Z", "mp");

jst.ExtMenuItem.addMethod("icon:", "aString", "accessing-config", 
	"\t| path |" +
	"\n\tpath := aString." +
	"\n\t(aString includes: $/) ifFalse: [" +
	"\n\t\tpath := 'images/', path]." +
	"\n\t(aString includes: $.) ifFalse: [" +
	"\n\t\tpath := path, '.png']." +
	"\n\tself configAt: #icon put: path",
	null, "2012-05-02T08:31:21Z", "mp");

jst.ExtMenuItem.addMethod("iconCls:", "aString", "accessing", 
	"\t\"A CSS class that specifies a background image that will be used as the icon for this item (defaults to ''). " +
	"\n\tIf iconCls is specified icon should not be.\"" +
	"\n\tself at: #iconCls by: #setIconClass put: aString",
	null, "2012-02-17T22:02:40Z", "mp");

jst.ExtMenuItem.addMethod("iconCls", "", "accessing", 
	"\t^ self at: #iconCls",
	null, "2012-02-17T22:03:42Z", "mp");

jst.ExtMenuItem.addMethod("text", "", "accessing", "\t^ self at: #text");
jst.ExtMenuItem.addMethod("text:", "aString", "accessing", "\tself at: #text by: #setText put: aString");

jst.ExtMenuItem.addMethod("link", "", "accessing", 
	"\t^ link",
	null, "2012-02-16T15:50:26Z", "mp");

jst.ExtMenuItem.addMethod("link:", "anObject", "accessing", 
	"\tlink := anObject",
	null, "2012-02-16T15:50:39Z", "mp");

//*** ExtMenuSeparator ***

jst.ExtMenuSeparator._class.addMethod("xtype", "", "accessing", 
	"\t^ #menuseparator",
	null, "2012-02-17T15:08:18Z", "mp");

jst.ExtMenuSeparator.addMethod("isSeparator", "", "testing", 
	"\t^ true",
	null, "2013-12-18T21:05:30Z", "mp");

//*** ExtMenuTextItem ***

jst.ExtMenuTextItem._class.addMethod("xtype", "", "accessing", 
	"\t^ #menutextitem",
	null, "2012-02-17T15:48:33Z", "mp");

jst.ExtMenuTextItem.addMethod("text:", "aString", "accessing-config", 
	"\tself configAt: #text put: aString",
	null, "2012-02-17T20:36:03Z", "mp");

jst.ExtMenuTextItem.addMethod("text", "", "accessing-config", 
	"\t^ config at: #text ifAbsent: ''",
	null, "2012-02-17T20:40:58Z", "mp");

//*** ExtButton ***

jst.ExtButton._class.addMethod("xtype", "", "accessing", "\t^ #button");

jst.ExtButton.addMethod("allowDepress:", "aBoolean", "accessing-config", "\tself configAt: #allowDepress put: aBoolean");
jst.ExtButton.addMethod("enableToggle:", "aBoolean", "accessing-config", "\tself configAt: #enableToggle put: aBoolean");
jst.ExtButton.addMethod("toggleGroup:", "aSymbol", "accessing-config", "\tself configAt: #toggleGroup put: aSymbol");
jst.ExtButton.addMethod("text", "", "accessing", "\t^ self at: #text get: #getText");
jst.ExtButton.addMethod("text:", "aString", "accessing", "\tself at: #text by: #setText put: aString");

//jst.ExtButton.addMethod("pressed:", "aBoolean", "accessing-config", "\tself configAt: #pressed put: aBoolean");
//jst.ExtButton.addMethod("pressed", "", "accessing", "\t^ self at: #pressed get: #pressed");
jst.ExtButton.addMethod("isPressed", "", "accessing", "\t^ self at: #pressed", null, "2011-10-21T11:52:22Z", "mp");
jst.ExtButton.addMethod("bePressed", "", "accessing-config", "\tself configAt: #pressed put: true", null, "2011-10-21T11:52:43Z", "mp");

jst.ExtButton.addMethod("clickEvent", "", "events", "\t\"vraceny handler nebo listener bude automaticky nainstalovan pri inicializaci\"");
jst.ExtButton.addMethod("toggleEvent", "", "events", "\t\"vraceny handler nebo listener bude automaticky nainstalovan pri inicializaci\"");
jst.ExtButton.addMethod("toggleHandler:", "aBlock", "accessing", "\tself on: #toggle do: aBlock");

jst.ExtButton.addMethod("menu", "", "accessing", "\t^ (self at: #menu) ifNotNilDo: [:m | m jstWrapper]");	

jst.ExtButton.addMethod("menu:", "anExtMenu", "accessing", 
	"\t| oldMenu |" +
	"\n\toldMenu := self menu." +
	"\n\tself at: #menu by: #menu put: anExtMenu." +
	"\n\tobj notNil & oldMenu notNil & (anExtMenu == oldMenu) not ifTrue: [" +
	"\n\t\t\"the old menu is not automatically destroyed - a bug in ExtJs 3.3?\"" +
	"\n\t\toldMenu destroy].",
	null, "2011-10-12T08:59:08Z", "mp");

jst.ExtButton.addMethod("togglePressed:silently:", "state suppressEvents", "actions", 
	"\tobj perform: #toggle with: state with: suppressEvents",
	null, "2011-10-21T09:51:04Z", "mp");

jst.ExtButton.addMethod("togglePressed:", "aBoolean", "actions", 
	"\tself togglePressed: aBoolean silently: false",
	null, "2011-10-21T11:51:34Z", "mp");

jst.ExtButton.addMethod("press", "", "actions", 
	"\tself togglePressed: true",
	null, "2011-10-21T09:49:22Z", "mp");

jst.ExtButton.addMethod("pressSilently", "", "actions", 
	"\tself togglePressed: true silently: true",
	null, "2011-10-21T09:50:01Z", "mp");

jst.ExtButton.addMethod("toggleGroup", "", "accessing-config", 
	"\tself config at: #toggleGroup ifAbsent: nil",
	null, "2011-10-21T09:40:45Z", "mp");

jst.ExtButton.addMethod("togglePressed:silently:", "state suppressEvents", "actions", 
	"\tstate & self isPressed not ifTrue: [" +
	"\n\t\tself pressedInGroup ifNotNilDo: [:btn |" +
	"\n\t\t\tbtn togglePressed: false silently: suppressEvents]]." +
	"\n\tobj perform: #toggle with: state with: suppressEvents",
	null, "2011-10-21T10:05:54Z", "mp");

jst.ExtButton.addMethod("pressedInGroup", "", "accessing", function (){
	return this._config.at_ifPresent_("toggleGroup" , function(id) {
		var btn = Ext.ButtonToggleMgr.getPressed(id);
		return (btn) ? jst.snd(btn, "jstWrapper") : jst.nil;});
}, null, "2011-10-21T12:04:45Z", "mp");

jst.ExtButton.addMethod("showMenu", "", "actions", 
	"\t\"Show this button's menu (if it has one)\"" +
	"\n\tobj showMenu",
	null, "2012-02-16T16:13:51Z", "mp");

jst.ExtButton.addMethod("formBind:", "aBoolean", "accessing-config", 
	"\t\"See ExtFormPanel>>monitorValid:\"" +
	"\n\tself configAt: 'formBind' put: aBoolean",
	null, "2012-08-02T13:50:49Z", "mp");

jst.ExtButton.addMethod("formBind", "", "accessing-config", 
	"\t^ self at: 'formBind' default: false",
	null, "2012-08-02T13:51:03Z", "mp");

jst.ExtButton.addMethod("scale:", "aString", "accessing-config", 
	"\t\"(Optional) The size of the Button.\"" +
	"\n\tself configAt: #scale put: aString",
	null);

jst.ExtButton.addMethod("small", "", "accessing-config", 
	"\t\"Results in the button element being 16px high.\"" +
	"\n\tself scale: #small",
	null);

jst.ExtButton.addMethod("medium", "", "accessing-config", 
	"\t\"Results in the button element being 24px high.\"" +
	"\n\tself scale: #medium",
	null);

jst.ExtButton.addMethod("large", "", "accessing-config", 
	"\t\"Results in the button element being 32px high.\"" +
	"\n\tself scale: #large",
	null);

jst.ExtButton.addMethod("scale", "", "accessing-config", 
	"\t^ self at: #scale default: #small",
	null);

jst.ExtButton.addMethod("tooltip", "", "accessing", 
	"\t^ self at: #tooltip",
	null, "2013-06-03T09:19:41Z", "mp");

jst.ExtButton.addMethod("tooltip:", "anObject", "accessing", 
	"\t\"The tooltip for the button - can be a string to be used as innerHTML (html tags are accepted) or QuickTips config object\"" +
	"\n\tself at: #tooltip by: #setTooltip put: anObject",
	null, "2013-06-03T09:16:56Z", "mp");

jst.ExtButton.addMethod("tooltipType:", "aString", "accessing-config", 
	"\t\"The type of tooltip to use. Either 'qtip' (default) for QuickTips or 'title' for title attribute.\"" +
	"\n\tself configAt: #tooltipType put: aString",
	null, "2013-06-03T09:18:20Z", "mp");

jst.ExtButton.addMethod("tooltipType", "", "accessing-config", 
	"\t^ self at: #tooltipType default: #qtip",
	null, "2013-06-03T09:19:09Z", "mp");

jst.ExtButton.addMethod("iconCls:", "aString", "accessing", 
	"\t\"A css class which sets a background image to be used as the icon for this button\"" +
	"\n\tself at: #iconCls by: #setIconClass put: aString",
	null, "2013-06-07T21:08:29Z", "mp");

jst.ExtButton.addMethod("iconCls", "", "accessing", 
	"\t^ self at: #iconCls",
	null, "2013-06-07T21:06:20Z", "mp");

//*** ExtSplitButton ***

jst.ExtSplitButton._class.addMethod("xtype", "", "accessing", "\t^ #splitbutton");	

jst.ExtSplitButton.addMethod("arrowclickEvent", "", "events", 
	"\t\"vraceny handler nebo listener bude automaticky nainstalovan pri inicializaci\"",
	null, "2012-02-16T15:45:31Z", "mp");

//*** ExtPanel ***

jst.ExtPanel._class.addMethod("xtype", "", "accessing", "\t^ #panel");

jst.ExtPanel.addMethod("printOn:", "aStream", "printing", 
	"\tsuper printOn: aStream." +
	"\n\tself title ifNotNilDo: [:tit |" +
	"\n\t\taStream space." +
	"\n\t\ttit printOn: aStream]",
	null, "2013-01-25T21:55:04Z", "mp");

jst.ExtPanel.addMethod("title", "", "accessing", 
	"\t^ self at: #title",
	null, "2011-10-19T20:50:20Z", "mp", 1);

jst.ExtPanel.addMethod("title", "", "accessing", 
	"\t^ title ifNil: [" +
	"\n\t\tself at: #title]",
	null, "2014-01-25T20:55:40Z", "mp"); //jst-ext-comp

jst.ExtPanel.addMethod("title:", "aString", "accessing", 
	"\tself at: #title by: #setTitle put: aString",
	null, "2011-10-19T20:55:40Z", "mp", 1);

jst.ExtPanel.addMethod("title:", "aString", "accessing", 
	"\t| tit |" +
	"\n\ttitle := aString." +
	"\n\ttit := aString." +
	"\n\t(Smalltalk isRuntime not and: [self respondsTo: #inspect]) ifTrue: [ | url |" +
	"\n\t\tself id ifNil: [" +
	"\n\t\t\tself id: Ext nextId]." +
	"\n\t\turl  := 'jst.ExtComponentMgr.default().getById_(\"{1}\").inspect()' format: { self id}." +
	"\n\t\ttit := aString, ' ', (DocumentFragment htmlContents: [:html |" +
	"\n\t\t\thtml bold class: 'comp-inspect'; attributeAt: 'onclick' put: url; with: '[+]']) printHtml]." +
	"\n\tself at: #title by: #setTitle put: tit",
	null, "2014-01-25T20:54:52Z", "mp", 1);

jst.ExtPanel.addMethod("title:", "aString", "accessing", 
	"\t| tit |" +
	"\n\ttitle := aString withoutHtmlTags." +
	"\n\ttit := aString." +
	"\n\t(Smalltalk isRuntime not and: [self respondsTo: #inspect]) ifTrue: [ | url |" +
	"\n\t\tself id ifNil: [" +
	"\n\t\t\tself id: Ext nextId]." +
	"\n\t\turl  := 'jst.ExtComponentMgr.default().getById_(\"{1}\").inspect()' format: { self id}." +
	"\n\t\ttit := aString, ' ', (DocumentFragment htmlContents: [:html |" +
	"\n\t\t\thtml bold class: 'comp-inspect'; attributeAt: 'onclick' put: url; with: '[+]']) printHtml]." +
	"\n\tself at: #title by: #setTitle put: tit",
	null, "2014-05-21T14:12:48Z", "mp"); //jst-ext-comp

jst.ExtPanel.addMethod("border", "", "accessing-config", "\t^ config at: #border ifAbsent: true");
jst.ExtPanel.addMethod("border:", "aBoolean", "accessing-config", "\tself configAt: #border put: aBoolean");

jst.ExtPanel.addMethod("frame:", "aBoolean", "accessing-config", "\tself configAt: #frame put: aBoolean");

jst.ExtPanel.addMethod("frame", "", "accessing-config", 
	"\t^ config at: #frame ifAbsent: [false]",
	null, "2011-10-19T10:11:27Z", "mp");

jst.ExtPanel.addMethod("padding:", "aNumberOrString", "accessing-config", "\tself configAt: #padding put: aNumberOrString");

jst.ExtPanel.addMethod("padding", "", "accessing-config", 
	"\t^ self config at: #padding ifAbsent: nil",
	null, "2011-10-19T10:12:42Z", "mp");

jst.ExtPanel.addMethod("withFrame", "", "accessing-config", 
	"\tself frame: true",
	null, "2011-10-19T13:13:41Z", "mp");

jst.ExtPanel.addMethod("withoutBorder", "", "accessing-config", 
	"\tself border: false",
	null, "2011-10-19T13:14:26Z", "mp");

jst.ExtPanel.addMethod("bodyBorder", "", "accessing-config", 
	"\t^ config at: #bodyBorder ifAbsent: true",
	null, "2011-10-19T13:16:05Z", "mp");

jst.ExtPanel.addMethod("bodyBorder:", "aBoolean", "accessing-config", 
	"\tself configAt: #bodyBorder put: aBoolean",
	null, "2011-10-19T13:16:25Z", "mp");

jst.ExtPanel.addMethod("withoutBodyBorder", "", "accessing-config", 
	"\tself bodyBorder: false",
	null, "2011-10-19T13:16:37Z", "mp");

jst.ExtPanel.addMethod("bodyStyle:", "anObject", "accessing-config", 
	"\t\"A style specification string, e.g. 'width: 100px', or object in the form {width: '100px'}, " +
	"\n\tor a block which returns such a specification.\"" +
	"\n\tself configAt: #bodyStyle put: anObject",
	null, "2012-12-07T09:55:53Z", "mp");

jst.ExtPanel.addMethod("bodyStyle", "", "accessing-config", 
	"\t^ config at: #bodyStyle ifAbsent: nil",
	null, "2012-04-30T14:21:05Z", "mp");

jst.ExtPanel.addMethod("bodyCssClass:", "anObject", "accessing-config", 
	"\t\"Additional css class selector to be applied to the body element in the format expected by ExtElement>>addCssClass. " +
	"\n\tSee bodyCfg.\"" +
	"\n\tself configAt: #bodyCssClass put: anObject",
	null, "2013-12-20T14:35:15Z", "mp");

jst.ExtPanel.addMethod("bodyCssClass", "", "accessing-config", 
	"\t^ self at: #bodyCssClass",
	null, "2013-12-20T14:38:50Z", "mp");

jst.ExtPanel.addMethod("bodyresizeEvent", "", "events", 
	"\t\"returned handler block or instance of ExtBodyResizeListener is installed on initialization\"",
	null, "2011-10-11T18:40:56Z", "mp");

jst.ExtPanel.addMethod("beforecloseEvent", "", "events", 
	"\t\"Returned handler block or instance of ExtDefaultListener is installed on initialization. " +
	"\n\tNote that Panels do not directly support being closed, but some ExtPanel subclasses do (like ExtWindow) " +
	"\n\tor a ExtPanel within a ExtTabPanel. This event only applies to such subclasses. A handler can return false to cancel the close.\"",
	null, "2012-01-24T08:38:23Z", "mp");

jst.ExtPanel.addMethod("activateEvent", "", "events", 
	"\t\"Returned handler block or instance of ExtDefaultListener is installed on initialization. " +
	"\n\tFires after the Panel has been visually activated. Note that Panels do not directly support being activated, " +
	"\n\tbut some Panel subclasses do (like ExtWindow). Panels which are child Components of a TabPanel " +
	"\n\tfire the activate and deactivate events under the control of the TabPanel.\"",
	null, "2012-06-13T19:45:20Z", "mp");

jst.ExtPanel.addMethod("deactivateEvent", "", "events", 
	"\t\"Returned handler block or instance of ExtDefaultListener is installed on initialization. " +
	"\n\tFires after the Panel has been visually deactivated. Note that Panels do not directly support being deactivated, " +
	"\n\tbut some Panel subclasses do (like ExtWindow). Panels which are child Components of a TabPanel " +
	"\n\tfire the activate and deactivate events under the control of the TabPanel.\"",
	null, "2012-06-13T19:47:24Z", "mp");

jst.ExtPanel.addMethod("iconCls:", "aString", "accessing", 
	"\t\"Sets the CSS class selector that specifies a background image to be used as the header icon for this panel. " +
	"\n\tThis method will replace any existing icon class if one has already been set and fire the iconchange event after completion.\"" +
	"\n\tself at: #iconCls by: #setIconClass put: aString",
	null, "2012-02-20T07:48:09Z", "mp");

jst.ExtPanel.addMethod("iconCls", "", "accessing", 
	"\t^ self at: #iconCls",
	null, "2012-02-20T07:53:42Z", "mp");

jst.ExtPanel.addMethod("buttonAlign:", "aString", "accessing-config", 
	"\t\"The alignment of any buttons added to this panel. Valid values are 'right', 'left' and 'center' (defaults to 'right').\"" +
	"\n\tself configAt: 'buttonAlign' put: aString",
	null, "2012-06-29T08:45:00Z", "mp");

jst.ExtPanel.addMethod("buttonAlign", "", "accessing-config", 
	"\t^ self at: 'buttonAlign' default: #right",
	null, "2012-06-29T08:45:18Z", "mp");

jst.ExtPanel.addMethod("buttons:", "aCollection", "accessing-config", 
	"\t\"Buttons will be used as items for the toolbar in the footer (fbar). Typically the value of this configuration property " +
	"\n\twill be an array of ExtButton objects. If an item is configured with minWidth or the Panel is configured " +
	"\n\twith minButtonWidth, that width will be applied to the item.\"" +
	"\n\tself configAt: 'buttons' put: aCollection",
	null, "2012-06-29T08:47:20Z", "mp");

jst.ExtPanel.addMethod("buttons", "", "accessing-config", 
	"\t^ self at: 'buttons' default: #()",
	null, "2012-06-29T08:39:16Z", "mp");

jst.ExtPanel.addMethod("columnWidth:", "aNumber", "accessing-config", 
	"\t\"The ColumnLayout will use the columnWidth (if present) or width of each panel during layout to determine " +
	"\n\thow to size each panel. If width or columnWidth is not specified for a given panel, its width will default " +
	"\n\tto the panel's width (or auto).  The columnWidth property is always evaluated as a percentage, " +
	"\n\tand must be a decimal value greater than 0 and less than 1 (e.g., 0.25).\"" +
	"\n\tself configAt: 'columnWidth' put: aNumber",
	null, "2012-06-29T09:28:52Z", "mp");

jst.ExtPanel.addMethod("columnWidth", "", "accessing-config", 
	"\t^ self at: 'columnWidth'",
	null, "2012-06-29T09:29:15Z", "mp");

jst.ExtPanel.addMethod("body", "", "accessing", 
	"\t\"The Panel's body Element which may be used to contain HTML content. The content may be specified " +
	"\n\tin the html config, or it may be loaded using the autoLoad config, or through the Panel's Updater. Read-only." +
	"\n\tIf this is used to load visible HTML elements in either way, then the Panel may not be used as a Layout " +
	"\n\tfor hosting nested Panels. If this Panel is intended to be used as the host of a Layout (See layout) " +
	"\n\tthen the body Element must not be loaded or changed - it is under the control of the Panel's Layout. \"" +
	"\n\t^ ExtElement wrap: (obj at: #body)",
	null, "2013-02-04T21:43:29Z", "mp");

jst.ExtPanel.addMethod("beforeexpandEvent", "", "events", 
	"\t\"Fires before the Panel is expanded. A handler can return false to cancel the expand." +
	"\n\tListeners will be called with the following arguments:" +
	"\n\t\tp : Ext.Panel" +
	"\n\t\t\tThe Panel being expanded." +
	"\n\t\tanimate : Boolean" +
	"\n\t\t\tTrue if the expand is animated, else false.\"",
	null, "2013-06-22T10:00:29Z", "mp");

jst.ExtPanel.addMethod("beforecollapseEvent", "", "events", 
	"\t\"Fires before the Panel is collapsed. A handler can return false to cancel the collapse. See also #beforeexpandEvent\"",
	null, "2013-06-22T10:18:36Z", "mp");

//*** ExtTabPanelListener ***

jst.ExtTabPanelListener.addMethod("beforetabchangeHandler", "", "handlers", 
	"\t^ [:receiver :newTab :currentTab |" +
	"\n\t\tself handlerBlock valueWithPossibleArgs: {" +
	"\n\t\t\treceiver jstWrapper." +
	"\n\t\t\tnewTab jstWrapper. \"The tab being activated\"" +
	"\n\t\t\tcurrentTab jstWrapper \"The current active tab\"}]",
	null, "2013-06-22T20:00:05Z", "mp");

jst.ExtTabPanelListener.addMethod("tabchangeHandler", "", "handlers", 
	"\t^ [:receiver :panel | self handlerBlock " +
	"\n\t\tvalue: receiver jstWrapper " +
	"\n\t\tvalue: panel jstWrapper \"The new active tab\"]",
	null, "2013-06-22T20:03:16Z", "mp");

jst.ExtTabPanelListener.addMethod("contextmenuHandler", "", "handlers", 
	"\t\"Relays the contextmenu event from a tab selector element in the tab strip.\"" +
	"\n\t^ [:receiver :panel | self handlerBlock valueWithPossibleArgs: {" +
	"\n\t\treceiver jstWrapper." +
	"\n\t\tpanel jstWrapper. \"The new active tab\"" +
	"\n\t\tExtEventObject current}]",
	null, "2013-06-22T20:07:45Z", "mp");

//*** ExtTabPanel ***

jst.ExtTabPanel._class.addMethod("listenerClass", "", "accessing", 
	"\t^ ExtTabPanelListener",
	null, "2013-06-22T20:14:01Z", "mp"); //jst-ext-comp

jst.ExtTabPanel._class.addMethod("xtype", "", "accessing", 
	"\t^ #tabpanel",
	null, "2012-02-27T08:52:36Z", "mp");

jst.ExtTabPanel.addMethod("activeTab:", "aNumberOrString", "accessing", 
	"\t\"A string id or the numeric index (from 1) of the tab that should be initially activated on render (defaults to nil)." +
	"\n\tAfter render sets the specified tab as the active tab and fires the beforetabchange event " +
	"\n\twhich can return false to cancel the tab change.\"" +
	"\n\tself at: #activeTab by: #setActiveTab put: (aNumberOrString isNumber " +
	"\n\t\tifTrue: [aNumberOrString - 1] " +
	"\n\t\tifFalse: aNumberOrString)",
	null, "2012-02-27T09:03:01Z", "mp");

jst.ExtTabPanel.addMethod("plain:", "aBoolean", "accessing-config", 
	"\t\"true to render the tab strip without a background container image (defaults to false).\"" +
	"\n\tself configAt: #plain put: aBoolean",
	null, "2012-06-13T06:41:36Z", "mp");

jst.ExtTabPanel.addMethod("plain", "", "accessing-config", 
	"\t^ self at: #plain default: false",
	null, "2012-06-13T06:42:06Z", "mp");

jst.ExtTabPanel.addMethod("activeTab", "", "accessing", 
	"\t\"Returns the Component which is the currently active tab. " +
	"\n\tNote that before the TabPanel first activates a child Component, this method will return " +
	"\n\twhatever was configured in the activeTab config option.\"" +
	"\n\t^ (self at: #activeTab get: #getActiveTab) jstWrapper",
	null, "2012-06-12T19:18:32Z", "mp");

jst.ExtTabPanel.addMethod("activeTabIndex", "", "accessing", 
	"\t^ self items asCollection indexOf: self activeTab asJsObject",
	null, "2013-01-02T14:37:33Z", "mp");

jst.ExtTabPanel.addMethod("activeItem:", "aNumberOrString", "accessing", 
	"\tself activeTab: aNumberOrString",
	null, "2013-01-11T10:18:10Z", "mp");

jst.ExtTabPanel.addMethod("activeItem", "", "accessing", 
	"\t^ self activeTab",
	null, "2013-01-11T10:18:21Z", "mp");

jst.ExtTabPanel.addMethod("tabchangeEvent", "", "events", 
	"\t\"Fires after the active tab has changed." +
	"\n\tReturned handler block or instance of ExtTabChangeListener is installed on initialization\"",
	null, "2012-06-12T19:25:39Z", "mp");

jst.ExtTabPanel.addMethod("beforetabchangeEvent", "", "events", 
	"\t\"Fires before the active tab changes. Handlers can return false to cancel the tab change." +
	"\n\tReturned handler block or instance of ExtBeforeTabChangeListener is installed on initialization\"",
	null, "2012-06-12T19:41:33Z", "mp");

jst.ExtTabPanel.addMethod("tabPosition:", "aString", "accessing-config", 
	"\t\"The position where the tab strip should be rendered (defaults to #top). The only other supported value is #bottom. " +
	"\n\tNote: tab scrolling is only supported for tabPosition: #top.\"" +
	"\n\tself configAt: #tabPosition put: aString");

jst.ExtTabPanel.addMethod("tabPosition", "", "accessing-config", 
	"\t^ self at: #tabPosition default: #top");

/*
jst.ExtTabPanel.addMethod("hideTabStripItem:", "item", "visibility", 
	"\t\"Hides the tab strip item for the passed tab" +
	"\n\titem : Number/String/Panel - The tab index, id or item\"" +
	"\n\tobj perform: #hideTabStripItem with: (item isNumber ifTrue: [item - 1] ifFalse: [item asJsObject])",
	null, "2012-12-10T10:03:18Z", "mp");

jst.ExtTabPanel.addMethod("unhideTabStripItem:", "item", "visibility", 
	"\t\"Unhides the tab strip item for the passed tab" +
	"\n\titem : Number/String/Panel - The tab index, id or item\"" +
	"\n\tobj perform: #unhideTabStripItem with: (item isNumber ifTrue: [item - 1] ifFalse: [item asJsObject])",
	null, "2012-12-10T10:03:06Z", "mp");
*/

jst.ExtTabPanel.addMethod("installListeners", "", "private", 
	"\thiddenItems isEmptyOrNil ifFalse: [" +
	"\n\t\tself addListener: (ExtDefaultListener new eventName: #render; single: true; " +
	"\n\t\t\thandler: [hiddenItems do: [:item | self hideTabStripItem: item]])]." +
	"\n\tsuper installListeners",
	null, "2013-01-02T13:43:18Z", "mp");

jst.ExtTabPanel.addMethod("hideTabStripItem:", "item", "visibility", 
	"\t\"Hides the tab strip item for the passed tab" +
	"\n\titem : Number/String/Panel - The tab index, id or item\"" +
	"\n\tobj ifNil: [" +
	"\n\t\thiddenItems ifNil: [" +
	"\n\t\t\thiddenItems := OrderedCollection new]." +
	"\n\t\thiddenItems add: item" +
	"\n\t] ifNotNil: [" +
	"\n\t\tobj perform: #hideTabStripItem " +
	"\n\t\t\twith: (item isNumber ifTrue: [item - 1] ifFalse: [item asJsObject])]",
	null, "2013-01-02T13:41:55Z", "mp");

jst.ExtTabPanel.addMethod("unhideTabStripItem:", "item", "visibility", 
	"\t\"Unhides the tab strip item for the passed tab" +
	"\n\titem : Number/String/Panel - The tab index, id or item\"" +
	"\n\tobj ifNil: [" +
	"\n\t\thiddenItems ifNotNil: [" +
	"\n\t\t\thiddenItems remove: item ifAbsent: nil]" +
	"\n\t] ifNotNil: [" +
	"\n\t\tobj perform: #unhideTabStripItem " +
	"\n\t\t\twith: (item isNumber ifTrue: [item - 1] ifFalse: [item asJsObject])]",
	null, "2013-01-02T13:19:59Z", "mp");

jst.ExtTabPanel.addMethod("hideTabStrip", "", "visibility", 
	"\tself border " +
	"\n\t\tifTrue: [self element addCssClass: 'x-tab-panel-no-header']" +
	"\n\t\tifFalse: [self element firstChild applyStyles: 'display: none']." +
	"\n\tself doLayout",
	null, "2012-12-10T22:20:47Z", "mp");

jst.ExtTabPanel.addMethod("unhideTabStrip", "", "visibility", 
	"\tself border " +
	"\n\t\tifTrue: [self element removeCssClass: 'x-tab-panel-no-header']" +
	"\n\t\tifFalse: [self element firstChild applyStyles: 'display: block']." +
	"\n\tself doLayout",
	null, "2012-12-10T22:20:15Z", "mp");

/* ** ExtTabChangeListener ***

jst.ExtTabChangeListener.addMethod("handler", "", "accessing", 
	"\t^ [:receiver :panel |" +
	"\n\t\tself handlerBlock value: receiver jstWrapper value: panel jstWrapper]",
	null, "2012-06-12T19:28:36Z", "mp");

//*** ExtBeforeTabChangeListener ***

jst.ExtBeforeTabChangeListener.addMethod("handler", "", "accessing", 
	"\t^ [:receiver :newTab :currentTab |" +
	"\n\t\tself handlerBlock value: receiver jstWrapper value: newTab jstWrapper value: currentTab jstWrapper]",
	null, "2012-06-12T19:42:42Z", "mp");
*/

//*** ExtWindowListener ***

jst.ExtWindowListener.addMethod("resizeHandler", "", "handlers", 
	"\t^ self bodyresizeHandler",
	null, "2013-06-22T17:48:38Z", "mp");

//*** ExtWindow ***

jst.ExtWindow._class.addMethod("initialize", "", "class initialization", 
	"\tself overrideMethod: #getState by: #state",
	null, "2014-01-14T15:04:14Z", "mp");

jst.initializeClass(jst.ExtWindow);

jst.ExtWindow._class.addMethod("listenerClass", "", "accessing", 
	"\t^ ExtWindowListener",
	null, "2013-06-22T17:52:27Z", "mp");

jst.ExtWindow._class.addMethod("xtype", "", "accessing", "\t^ #window");	

jst.ExtWindow._class.addMethod("open", "", "instance creation", "\t^ self new show");

jst.ExtWindow.addMethod("minHeight", "", "accessing-config", "\t^ config at: #minHeight ifAbsent: 100");
jst.ExtWindow.addMethod("minHeight:", "aNumber", "accessing-config", "\tself configAt: #minHeight put: aNumber");

jst.ExtWindow.addMethod("minWidth", "", "accessing-config", "\t^ config at: #minWidth ifAbsent: 200");
jst.ExtWindow.addMethod("minWidth:", "aNumber", "accessing-config", "\tself configAt: #minWidth put: aNumber");

jst.ExtWindow.addMethod("closable", "", "accessing-config", "\t^ config at: #closable ifAbsent: true");
jst.ExtWindow.addMethod("closable:", "aBoolean", "accessing-config", "\tself configAt: #closable put: aBoolean");

jst.ExtWindow.addMethod("resizable", "", "accessing-config", "\t^ config at: #resizable ifAbsent: true");
jst.ExtWindow.addMethod("resizable:", "aBoolean", "accessing-config", "\tself configAt: #resizable put: aBoolean");

jst.ExtWindow.addMethod("minimizable:", "aBoolean", "accessing-config", 
	"\t\"True to display the 'minimize' tool button and allow the user to minimize the window, " +
	"\n\tfalse to hide the button and disallow minimizing the window (defaults to false). " +
	"\n\tNote that this button provides no implementation -- the behavior of minimizing a window is implementation-specific, " +
	"\n\tso the minimize event must be handled and a custom minimize behavior implemented for this option to be useful.\"" +
	"\n\tself configAt: #minimizable put: aBoolean",
	null, "2012-06-21T10:30:12Z", "mp");

jst.ExtWindow.addMethod("minimizable", "", "accessing-config", 
	"\t^ self at: #minimizable default: false",
	null, "2012-06-21T10:30:33Z", "mp");

jst.ExtWindow.addMethod("plain", "", "accessing-config", "\t^ config at: #plain ifAbsent: false");

jst.ExtWindow.addMethod("plain:", "aBoolean", "accessing-config", 
	"\t\"True to render the window body with a transparent background so that it will blend " +
	"\n\tinto the framing elements, false to add a lighter background color to visually highlight " +
	"\n\tthe body element and separate it more distinctly from the surrounding frame.\"" +
	"\n\tself configAt: #plain put: aBoolean",
	null, "2012-06-29T08:22:23Z", "mp");

jst.ExtWindow.addMethod("show", "", "rendering", 
	"\tsuper show." +
	"\n\tself x < 0 | (self y < 0) ifTrue: [" +
	"\n\t\t\"keeps the window's left top edge visible\"" +
	"\n\t\tself position: (Point x: (5 max: self x) y: (5 max: self y))]",
	null, "2011-10-13T15:10:06Z", "mp");

jst.ExtWindow.addMethod("moveRelativeTo:", "aPoint", "windows arrangement", 
	"\t| x y win closeTo |" +
	"\n\tx := aPoint x." +
	"\n\ty := aPoint y." +
	"\n\tcloseTo := [:a :b | (a - b) abs < 5]." +
	"\n\t[(win := ExtWindowGroup default detect: [:w |" +
	"\n\t\t(closeTo value: w y value: y) or: [closeTo value: w x value: x]] ifNone: nil) isNil]" +
	"\n\t\twhileFalse: [" +
	"\n\t\t\t(closeTo value: win x value: x) ifTrue: [x := x + 50]. " +
	"\n\t\t\t(closeTo value: win y value: y) ifTrue: [y := y + 30]]." +
	"\n\tself x: x; y: y",
	null, "2011-09-27T11:56:19Z", "mp");

jst.ExtWindow._class.addMethod("openRelativeTo:", "aPoint", "instance creation", 
	"\t^ self new " +
	"\n\t\tmoveRelativeTo: aPoint; " +
	"\n\t\tshow",
	null, "2011-09-27T07:55:21Z", "mp");

/*
jst.ExtWindow._class.addMethod("listenerClasses", "", "accessing", 
	"\t^ { ExtResizeListener }",
	null, "2013-02-14T21:10:01Z", "mp");

jst.ExtWindow.addMethod("resizeEvent", "", "events", 
	"\t\"returned handler block or instance of ExtResizeListener is installed on initialization\"",
	null, "2011-10-11T14:18:35Z", "mp");
*/

jst.ExtWindow.addMethod("minimizeEvent", "", "events", 
	"\t\"Fires after the window has been minimized." +
	"\n\tReturned handler block or instance of ExtDefaultListener is installed on initialization\"",
	null, "2012-06-21T10:33:40Z", "mp");

jst.ExtWindow.addMethod("maximizeEvent", "", "events", 
	"\t\"Fires after the window has been maximized." +
	"\n\tReturned handler block or instance of ExtDefaultListener is installed on initialization\"",
	null, "2012-06-21T10:34:03Z", "mp");

jst.ExtWindow.addMethod("manager", "", "accessing", 
	"\t\"A reference to the WindowGroup that should manage this window (defaults to ExtWindowMgr default).\"" +
	"\n\t^ (obj at: #manager) jstWrapper",
	null, "2013-02-07T13:03:14Z", "mp");

jst.ExtWindow.addMethod("isActive", "", "testing", 
	"\t^ self manager activeWindow == self",
	null, "2013-02-07T13:03:54Z", "mp");

jst.ExtWindow.addMethod("toFront", "", "windows arrangement", 
	"\t\"Brings this window to the front of any other visible windows\"" +
	"\n\tobj toFront",
	null, "2012-02-17T12:56:41Z", "mp");

jst.ExtWindow.addMethod("toBack", "", "windows arrangement", 
	"\t\"Sends this window to the back of (lower z-index than) any other visible windows\"" +
	"\n\tobj toBack",
	null, "2012-02-17T12:57:10Z", "mp");

jst.ExtWindow.addMethod("onEscape:", "aBlock", "accessing-config", 
	"\t\"Allows override of the built-in processing for the escape key. Default action is to close the Window " +
	"\n\t(performing whatever action is specified in closeAction). To prevent the Window closing when the escape key is pressed, " +
	"\n\tspecify this as an empty block.\"" +
	"\n\tself configAt: #onEsc put: aBlock",
	null, "2012-04-23T18:46:17Z", "mp");

jst.ExtWindow.addMethod("center", "", "windows arrangement", 
	"\t\"Centers this window in the viewport\"" +
	"\n\tobj perform: #center",
	null, "2012-06-29T08:25:19Z", "mp");

jst.ExtWindow.addMethod("modal:", "aBoolean", "accessing-config", 
	"\t\"True to make the window modal and mask everything behind it when displayed, " +
	"\n\tfalse to display it without restricting access to other UI elements (defaults to false).\"" +
	"\n\tself configAt: #modal put: aBoolean",
	null, "2012-06-29T08:28:18Z", "mp");

jst.ExtWindow.addMethod("modal", "", "accessing-config", 
	"\t^ self at: #modal default: false",
	null, "2012-06-29T08:28:37Z", "mp");

jst.ExtWindow.addMethod("close", "", "rendering", 
	"\t\"Closes the Window, removes it from the DOM, destroys the Window object " +
	"\n\tand all its descendant Components. The beforeclose event is fired before the close happens " +
	"\n\tand will cancel the close action if it returns false." +
	"\n\tTo hide the Window without destroying it, call hide.\"" +
	"\n\tobj close",
	null, "2012-07-17T12:57:41Z", "mp");

jst.ExtWindow.addMethod("state", "", "accessing", 
	"\t| state |" +
	"\n\tstate := super state." +
	"\n\tsavedState ifNotNil: [" +
	"\n\t\tsavedState keysAndValuesDo: [:k :v |" +
	"\n\t\t\t(k asString includes: '@') ifTrue: [" +
	"\n\t\t\t\tstate at: k put: v]]]." +
	"\n\tstate " +
	"\n\t\tat: (Browser screen width @ Browser screen height) asString " +
	"\n\t\tput: self box asDictionary asJsObject." +
	"\n\t^ state",
	null, "2014-01-13T22:00:14Z", "mp", 1);

jst.ExtWindow.addMethod("state", "", "accessing", 
	"\t| state |" +
	"\n\tstate := Dictionary on: super state." +
	"\n\tsavedState ifNotNil: [" +
	"\n\t\tsavedState keysAndValuesDo: [:k :v |" +
	"\n\t\t\t(k asString includes: '@') ifTrue: [" +
	"\n\t\t\t\tstate at: k put: v]]]." +
	"\n\tstate " +
	"\n\t\tat: (Browser screen width @ Browser screen height) asString " +
	"\n\t\tput: self box asDictionary asJsObject." +
	"\n\t\"return type has to be a native object as the method is called by Ext\"" +
	"\n\t^ state asJsObject",
	null, "2014-01-14T16:15:22Z", "mp"); //jst-ext-comp
/*
jst.ExtWindow.addMethod("applyState:", "state", "private", 
	"\tsavedState := state copy." +
	"\n\tstate at: (Browser screen width @ Browser screen height) asString ifPresent: [:st2 |" +
	"\n\t\t(Dictionary on: st2) keysAndValuesDo: [:k :v |" +
	"\n\t\t\tstate at: k put: v]]." +
	"\n\tstate keys do: [:k |" +
	"\n\t\t(k asString includes: '@') ifTrue: [" +
	"\n\t\t\tstate removeKey: k]]." +
	"\n\tsuper applyState: state",
	null, "2014-01-13T22:06:50Z", "mp", 1);

jst.ExtWindow.addMethod("applyState:", "st", "private", 
	"\t| state |" +
	"\n\tstate := Dictionary on: st." +
	"\n\tsavedState := state copy." +
	"\n\tstate at: (Browser screen width @ Browser screen height) asString ifPresent: [:st2 |" +
	"\n\t\t(Dictionary on: st2) keysAndValuesDo: [:k :v |" +
	"\n\t\t\tstate at: k put: v]]." +
	"\n\tstate keys do: [:k |" +
	"\n\t\t(k asString includes: '@') ifTrue: [" +
	"\n\t\t\tstate removeKey: k]]." +
	"\n\tsuper applyState: st",
	null, "2014-01-14T16:51:29Z", "mp"); //jst-ext-comp
*/

jst.ExtWindow.addMethod("beforestaterestoreEvent", "", "events", 
	"\t^ [:w :st | | state |" +
	"\n\t\tstate := Dictionary on: st." +
	"\n\t\tsavedState := state copy." +
	"\n\t\tstate at: (Browser screen width @ Browser screen height) asString ifPresent: [:st2 |" +
	"\n\t\t\t(Dictionary on: st2) keysAndValuesDo: [:k :v |" +
	"\n\t\t\t\tstate at: k put: v]]." +
	"\n\t\tstate keys do: [:k |" +
	"\n\t\t\t(k asString includes: '@') ifTrue: [" +
	"\n\t\t\t\tstate removeKey: k]]." +
	"\n\t\ttrue]",
	null, "2014-01-14T21:02:16Z", "mp");

jst.ExtWindow.addMethod("animateTarget:", "anObject", "accessing", 
	"\t\"Id or element from which the window should animate while opening (defaults to null with no animation).\"" +
	"\n\tanimTarget := anObject." +
	"\n\tself at: #animateTarget by: #setAnimateTarget put: anObject asJsObject",
	null, "2014-02-26T20:10:38Z", "mp");

jst.ExtWindow.addMethod("animateTarget", "", "accessing", 
	"\t^ animTarget",
	null, "2014-02-26T20:10:51Z", "mp");

jst.ExtWindow.addMethod("constrainHeader:", "aBoolean", "accessing-config", 
	"\t\"True to constrain the window header within its containing element (allowing the window body " +
	"\n\tto fall outside of its containing element) or false to allow the header to fall outside its containing element . " +
	"\n\tOptionally the entire window can be constrained using constrain.\"" +
	"\n\tself configAt: #constrainHeader put: aBoolean",
	null, "2014-02-27T13:32:19Z", "mp");

jst.ExtWindow.addMethod("constrainHeader", "", "accessing-config", 
	"\t^ config at: #constrainHeader ifAbsent: false",
	null, "2014-02-27T13:33:05Z", "mp");

//*** ExtWindowGroup ***

jst.ExtWindowGroup.addMethod("wrap:", "jsObject", "accessing", 
	"\tsuper wrap: (gr := jsObject)",
	null, "2012-09-18T20:28:33Z", "mp");

jst.ExtWindowGroup._class.addMethod("default", "", "accessing", "\t^ Default", "__default");

jst.ExtWindowGroup.addMethod("initialize", "", "initialization", function (){
	this.wrap_(new Ext.WindowGroup());
	return this;
},
	null, "2012-09-18T20:29:13Z", "mp");

jst.ExtWindowGroup.addMethod("asJsObject", "", "converting", "\t^ gr");

jst.ExtWindowGroup.addMethod("activeWindow", "", "accessing", 
	"\t^ (gr perform: #getActive) jstWrapper",
	null, "2013-02-07T12:57:14Z", "mp");

jst.ExtWindowGroup.addMethod("do:", "aBlock", "enumerating", function(aBlock) { 
	this._gr.each(function(ea) {
		if (ea.jstProxy && ea.jstProxy.jstWrapper() != jst.nil) 
			aBlock.value_(ea.jstProxy.jstWrapper());});
	return this;
}, null, "2011-09-26T09:57:54Z", "mp");
/*
jst.ExtWindowGroup.addMethod("detect:ifNone:", "aBlock exceptionBlock", "enumerating", function (aBlock,exceptionBlock){ 
	var arr = this._gr.getBy(function(ea) {
		return ea.jstProxy && ea.jstProxy.jstWrapper() != jst.nil && aBlock.value_(ea.jstProxy.jstWrapper()) == true;});
	return (arr.length > 0) ? arr[0].jstProxy.jstWrapper() : exceptionBlock.value();
},
	null, "2013-02-16T21:40:10Z", "mp");
*/
jst.ExtWindowGroup.addMethod("detect:ifNone:", "aBlock exceptionBlock", "enumerating", 
	"\t^ (self select: aBlock) " +
	"\n\t\tifNotEmptyDo: [:coll | coll first]" +
	"\n\t\tifEmpty: exceptionBlock",
	null, "2013-02-20T12:04:41Z", "mp");

jst.ExtWindowGroup.addMethod("species", "", "private", 
	"\t^ OrderedCollection",
	null, "2013-02-07T12:39:31Z", "mp");

jst.ExtWindowGroup.addMethod("errorNotFound:", "anObject", "private", 
	"\tself error: 'Window not found in the group.'",
	null, "2013-02-07T12:48:44Z", "mp");

jst.ExtWindowGroup._class.addMethod("initialize", "", "class initialization", 
	"\t\"vychozi skupinou je WindowMgr\"" +
	"\n\tDefault := self basicNew wrap: (ExtCore current asJsObject at: 'WindowMgr')",
	null, "2012-09-18T20:31:22Z", "mp");

jst.initializeClass(jst.ExtWindowGroup);

jst.ExtWindowGroup.addMethod("bringToFront:", "anObject", "windows arrangement", 
	"\t\"Brings the specified window to the front of any other active windows in this WindowGroup." +
	"\n\tanObject is the id of the window or a ExtWindow instance\"" +
	"\n\tself asJsObject perform: #bringToFront with: anObject asJsObject",
	null, "2012-02-16T16:08:22Z", "mp");

jst.ExtWindowGroup.addMethod("sendToBack:", "anObject", "windows arrangement", 
	"\t\"Sends the specified window to the back of other active windows in this WindowGroup." +
	"\n\tanObject is the id of the window or a ExtWindow instance\"" +
	"\n\tself asJsObject perform: #sendToBack with: anObject asJsObject",
	null, "2012-02-16T21:31:38Z", "mp");

jst.ExtWindowGroup.addMethod("getById:", "aString", "accessing", 
	"\t^ (gr perform: #get with: aString) jstWrapper",
	null, "2013-02-07T12:57:36Z", "mp");

// *** ExtSelectionModelListener ***

jst.ExtSelectionModelListener.addMethod("beforeselectHandler", "", "handlers", 
	"\t^ [:selectionModel :newNode :selectedNode |" +
	"\n\t\tself handlerBlock valueWithPossibleArgs: {" +
	"\n\t\t\tselectionModel jstWrapper. " +
	"\n\t\t\tnewNode jstWrapper. " +
	"\n\t\t\tselectedNode jstWrapper}]",
	null, "2013-06-22T13:07:22Z", "mp");

jst.ExtSelectionModelListener.addMethod("selectionchangeHandler", "", "handlers", 
	"\t^ [:selectionModel :node |" +
	"\n\t\tself handlerBlock value: selectionModel jstWrapper value: node jstWrapper]",
	null, "2013-06-22T13:10:39Z", "mp");

//*** ExtDefaultSelectionModel ***

jst.ExtDefaultSelectionModel._class.addMethod("listenerClass", "", "accessing", 
	"\t^ ExtSelectionModelListener",
	null, "2013-06-22T13:11:21Z", "mp");

jst.ExtDefaultSelectionModel.addMethod("selectedNode", "", "accessing", 
	"\t^ obj ifNotNil: [" +
	"\n\t\t(obj perform: #getSelectedNode) jstWrapper]",
	null, "2013-04-12T07:18:59Z", "mp");

jst.ExtDefaultSelectionModel.addMethod("selectNode:", "anExtTreeNode", "navigation", 
	"\tobj perform: #select with: anExtTreeNode asJsObject." +
	"\n\t^ anExtTreeNode");

jst.ExtDefaultSelectionModel.addMethod("clearSelections", "", "navigation", 
	"\t\"Clear all selections. Stops the selectionchange event from firing.\"" +
	"\n\tobj perform: #clearSelections with: true",
	null, "2013-01-28T21:17:23Z", "mp", 1);

jst.ExtDefaultSelectionModel.addMethod("clearSelections", "", "navigation", 
	"\t\"Clear all selections. Stops the selectionchange event from firing.\"" +
	"\n\tself clearSelectionsSilently: true",
	null, "2014-02-22T13:44:34Z", "mp"); //jst-ext-comp

jst.ExtDefaultSelectionModel.addMethod("clearSelectionsSilently:", "aBoolean", "navigation", 
	"\t\"Clear all selections. True to stop the selectionchange event from firing.\"" +
	"\n\tobj perform: #clearSelections with: aBoolean",
	null, "2013-08-17T20:09:02Z", "mp", 1);

jst.ExtDefaultSelectionModel.addMethod("clearSelectionsSilently:", "aBoolean", "navigation", 
	"\t\"Clear all selections. True to stop the selectionchange event from firing.\"" +
	"\n\tclearBlock ifNotNil: [" +
	"\n\t\tclearBlock value]." +
	"\n\tobj perform: #clearSelections with: aBoolean",
	null, "2014-02-22T13:47:53Z", "mp"); //jst-ext-comp

jst.ExtDefaultSelectionModel.addMethod("clearBlock:", "aBlock", "accessing", 
	"\tclearBlock := aBlock",
	null, "2014-02-22T13:43:53Z", "mp");

jst.ExtDefaultSelectionModel.addMethod("selectNext", "", "navigation", 
	"\t\"Selects the node above the selected node in the tree, intelligently walking the nodes\"" +
	"\n\t^ (obj perform: #selectNext) jstWrapper",
	null, "2013-01-28T21:14:35Z", "mp");

jst.ExtDefaultSelectionModel.addMethod("selectPrevious", "", "navigation", 
	"\t\"Selects the node above the selected node in the tree, intelligently walking the nodes\"" +
	"\n\t^ (obj perform: #selectPrevious) jstWrapper",
	null, "2013-01-28T21:15:30Z", "mp");

jst.ExtDefaultSelectionModel.addMethod("selectNode:silently:", "anExtTreeNode aBoolean", "navigation", 
	"\taBoolean ifTrue: [self suspendEvents]." +
	"\n\tself selectNode: anExtTreeNode." +
	"\n\taBoolean ifTrue: [self resumeEvents]." +
	"\n\t^ anExtTreeNode",
	null, "2013-01-11T23:23:26Z", "mp");

jst.ExtDefaultSelectionModel.addMethod("unselectNode:silently:", "anExtTreeNode aBoolean", "navigation", 
	"\t\"Deselect a node, optionally stops the selectionchange event from firing.\"" +
	"\n\tobj perform: #unselect with: anExtTreeNode asJsObject with: aBoolean",
	null, "2013-01-09T16:14:54Z", "mp");

//*** ExtTreePanel ***

jst.ExtTreePanel._class.addMethod("xtype", "", "accessing", "\t^ #treepanel");

jst.ExtTreePanel.addMethod("containerScroll", "", "accessing-config", "\t^ config at: #containerScroll ifAbsent: false");
jst.ExtTreePanel.addMethod("containerScroll:", "aBoolean", "accessing-config", "\tself configAt: #containerScroll put: aBoolean");

jst.ExtTreePanel.addMethod("rootVisible", "", "accessing-config", "\t^ config at: #rootVisible ifAbsent: true");
jst.ExtTreePanel.addMethod("rootVisible:", "aBoolean", "accessing-config", "\tself configAt: #rootVisible put: aBoolean");

jst.ExtTreePanel.addMethod("root", "", "accessing", "\t^ (self at: #root get: #getRootNode) jstWrapper");

jst.ExtTreePanel.addMethod("root:", "aTreeNode", "accessing", 
	"\t\"Sets the root node for this tree. If the TreePanel has already rendered a root node, the previous root node " +
	"\n\t(and all of its descendants) are destroyed before the new root node is rendered.\"" +
	"\n\tself at: #root by: #setRootNode put: aTreeNode",
	null, "2011-10-12T08:51:34Z", "mp");

jst.ExtTreePanel.addMethod("clickEvent", "", "events", "\t\"vraceny handler nebo listener bude automaticky nainstalovan pri inicializaci\"");
jst.ExtTreePanel.addMethod("dblclickEvent", "", "events", "\t\"vraceny handler nebo listener bude automaticky nainstalovan pri inicializaci\"");
jst.ExtTreePanel.addMethod("nodebeforeselectEvent", "", "events", "\t\"vraceny handler nebo listener bude automaticky nainstalovan pri inicializaci\"");
jst.ExtTreePanel.addMethod("nodeselectionchangeEvent", "", "events", "\t\"vraceny handler nebo listener bude automaticky nainstalovan pri inicializaci\"");

jst.ExtTreePanel.addMethod("selectionModel", "", "accessing", 
	"\t^ obj " +
	"\n\t\tifNil: [config at: #selModel ifAbsentPut: [ExtDefaultSelectionModel new]]" +
	"\n\t\tifNotNil: [(obj perform: #getSelectionModel) jstWrapper]",
	null, "2013-04-12T07:20:27Z", "mp");

jst.ExtTreePanel.addMethod("selectionModel:", "aModel", "accessing-config", 
	"\tself configAt: #selModel put: aModel",
	null, "2011-10-12T10:01:48Z", "mp");

jst.ExtTreePanel.addMethod("createJsObject", "", "private", 
	"\tself installListenersOn: (config at: #selModel ifAbsentPut: [ExtDefaultSelectionModel new asJsObject]) jstWrapper" +
	"\n\t\tprefix: 'node'." +
	"\n\tsuper createJsObject",
	null, "2012-03-24T20:58:27Z", "mp", 1);

jst.ExtTreePanel.addMethod("createJsObject", "", "private", 
	"\tself installListenersOn: self selectionModel asJsObject jstWrapper prefix: 'node'." +
	"\n\tsuper createJsObject",
	null, "2012-06-14T22:29:11Z", "mp", 1);

jst.ExtTreePanel.addMethod("createJsObject", "", "private", 
	"\tself installListenersOn: self selectionModel asJsObject jstWrapper prefix: 'node'." +
	"\n\tself selectionModel installListeners." +
	"\n\tsuper createJsObject",
	null, "2012-06-14T21:09:31Z", "mp");

/*	
jst.ExtTreePanel.addMethod("selectNode:", "aBlock", "navigation", 
	"\t^ (self root children detect: [:n | aBlock value: n jstWrapper] ifNone: []) ifNotNilDo: [:node |" +
	"\n\t\tself selectionModel selectNode: node]");

jst.ExtTreePanel.addMethod("selectItem:silently:", "anObject aBoolean", "navigation", 
	"\t(self root detectChild: [:node | node link = anObject]) ifNotNilDo: [:node |" +
	"\n\t\taBoolean ifTrue: [self selectionModel suspendEvents]." +
	"\n\t\tself selectionModel selectNode: node." +
	"\n\t\taBoolean ifTrue: [self selectionModel resumeEvents]]",
	null, "2011-10-12T15:32:59Z", "mp");
*/

jst.ExtTreePanel.addMethod("selectNodeBy:silently:", "aBlock aBoolean", "navigation", 
	"\t^ (self root detectChild: aBlock) ifNotNilDo: [:node |" +
	"\n\t\tself selectionModel selectNode: node silently: aBoolean]",
	null, "2013-01-11T23:54:32Z", "mp");

jst.ExtTreePanel.addMethod("selectItem:silently:", "anObject aBoolean", "navigation", 
	"\tself selectNodeBy: [:node | node link = anObject] silently: aBoolean",
	null, "2013-01-11T23:55:57Z", "mp");

jst.ExtTreePanel.addMethod("selectItem:", "anObject", "navigation", 
	"\tself selectItem: anObject silently: false",
	null, "2011-10-12T15:33:05Z", "mp");

jst.ExtTreePanel.addMethod("selectNode:", "node", "navigation", 
	"\t^ self selectionModel selectNode: node",
	null, "2013-12-04T10:29:07Z", "mp");

jst.ExtTreePanel.addMethod("selectNode:silently:", "node aBoolean", "navigation", 
	"\t^ self selectionModel selectNode: node silently: aBoolean",
	null, "2013-12-04T10:30:13Z", "mp");

jst.ExtTreePanel.addMethod("selectedNode", "", "accessing", 
	"\t^ self selectionModel selectedNode",
	null, "2013-04-12T07:22:11Z", "mp");

jst.ExtTreePanel.addMethod("selectedItem", "", "accessing", 
	"\t^ self selectionModel selectedNode ifNotNilDo: [:n | n link]",
	null, "2011-10-04T14:06:31Z", "mp");

jst.ExtTreePanel.addMethod("animate:", "aBoolean", "accessing-config", 
	"\tself configAt: #animate put: aBoolean",
	null, "2012-02-14T10:46:15Z", "mp");

jst.ExtTreePanel.addMethod("animate", "", "accessing-config", 
	"\t\"true to enable animated expand/collapse\"" +
	"\n\t^ self at: #animate default: [Ext enableFx]",
	null, "2012-06-11T14:08:35Z", "mp");

jst.ExtTreePanel.addMethod("singleExpand:", "aBoolean", "accessing-config", 
	"\t\"true if only 1 node per branch may be expanded\"" +
	"\n\tself configAt: #singleExpand put: aBoolean",
	null, "2012-06-11T14:10:29Z", "mp");

jst.ExtTreePanel.addMethod("singleExpand", "", "accessing-config", 
	"\t^ self at: #singleExpand default: false",
	null, "2012-06-11T14:10:47Z", "mp");

jst.ExtTreePanel.addMethod("initializeFrom:with:selectFirst:", "aCollection nodeBlock aBoolean", "utils", 
	"\t| root |" +
	"\n\troot := ExtTreeNode new children: OrderedCollection new." +
	"\n\taCollection do: [:m |" +
	"\n\t\troot children add: (nodeBlock value: m)]." +
	"\n\tself root: root." +
	"\n\troot children size > 0 & aBoolean ifTrue: [" +
	"\n\t\tself selectionModel selectNode: root children first]",
	null, "2012-02-15T15:09:01Z", "mp");

/*
jst.ExtTreePanel.constructor.prototype.selectionModel = function() {
	if (this._obj.isNil())
		return jst.nil;
	return (this._obj.getSelectionModel()._jstWrapper) ? this._obj.getSelectionModel()._jstWrapper 
		: jst.ExtDefaultSelectionModel._new().wrap_(this._obj.getSelectionModel());
};
jst.ExtTreePanel.addMethod("selectionModel", "", "accessing");

jst.ExtTreePanel.constructor.prototype.selectedNode = function() {
	return (this._obj.notNil() && this._obj.getSelectionModel().getSelectedNode()) 
		? this._obj.getSelectionModel().getSelectedNode().jstWrapper() : jst.nil;
};
jst.ExtTreePanel.addMethod("selectedNode", "", "accessing");
*/

jst.ExtTreePanel.addMethod("loader:", "anExtTreeLoader", "accessing-config", 
	"\t\"A ExtTreeLoader for use with this ExtTreePanel\"" +
	"\n\tself configAt: #loader put: anExtTreeLoader",
	null, "2012-08-25T20:16:52Z", "mp");

jst.ExtTreePanel.addMethod("loader", "", "accessing", 
	"\t^ ExtTreeLoader wrap: (self at: #loader get: #getLoader)",
	null, "2012-06-11T13:16:48Z", "mp");

jst.ExtTreePanel.addMethod("lines:", "aBoolean", "accessing-config", 
	"\t\"false to disable tree lines (defaults to true)\"" +
	"\n\tself configAt: #lines put: aBoolean",
	null, "2012-06-15T09:49:10Z", "mp");

jst.ExtTreePanel.addMethod("lines", "", "accessing-config", 
	"\t^ self at: #lines default: true",
	null, "2012-06-15T09:49:27Z", "mp");

jst.ExtTreePanel.addMethod("on:do:", "eventName aBlock", "event handling", 
	"\t(self class canUnderstand: 'node', eventName, 'Event') " +
	"\n\t\tifTrue: [self selectionModel on: eventName do: aBlock]" +
	"\n\t\tifFalse: [super on: eventName do: aBlock]",
	null, "2012-10-02T15:34:07Z", "mp");

jst.ExtTreePanel.addMethod("clearSelections", "", "navigation", 
	"\tself selectionModel clearSelections",
	null, "2013-01-24T22:40:05Z", "mp");

jst.ExtTreePanel.addMethod("clearSelectionsSilently:", "aBoolean", "navigation", 
	"\tself selectionModel clearSelectionsSilently: aBoolean",
	null, "2013-08-19T09:52:59Z", "mp"); //jst-ext-comp

jst.ExtTreePanel.addMethod("keepSelectedDuring:silently:ifFail:", "aBlock aBoolean failBlock", "utils", 
	"\t| node |" +
	"\n\tnode := self selectedNode." +
	"\n\taBoolean ifTrue: [" +
	"\n\t\tself clearSelections]." +
	"\n\taBlock valueWithPossibleArgument: self." +
	"\n\tnode ifNotNil: [" +
	"\n\t\t(self selectNodeBy: [:n | n id = node id] silently: aBoolean) ifNil: failBlock]",
	null, "2013-04-27T10:09:07Z", "mp");

jst.ExtTreePanel.addMethod("keepSelectedDuring:", "aBlock", "utils", 
	"\tself keepSelectedDuring: aBlock silently: true ifFail: nil",
	null, "2013-04-27T10:03:08Z", "mp");

jst.ExtTreePanel.addMethod("expandPath:thenDo:", "pathString aBlock", "utils", 
	"\tself expandPath: pathString by: nil asJsObject thenDo: aBlock ",
	null, "2013-06-28T14:09:26Z", "mp");

jst.ExtTreePanel.addMethod("expandPath:by:thenDo:", "pathString attName aBlock", "utils", 
	"\t\"Expands a specified path in this TreePanel. A path can be retrieved from a node with ExtNode>>path\"" +
	"\n\tobj perform: #expandPath " +
	"\n\t\twith: pathString" +
	"\n\t\twith: attName \" The attribute used in the path (see ExtNode>>pathBy: for more info)\"" +
	"\n\t\twith: [:success :lastNode | " +
	"\n\t\t\t\"The callback to call when the expand is complete. Success is if the expand was successful " +
	"\n\t\t\tand lastNode is the last node that was expanded.\"" +
	"\n\t\t\taBlock value: success value: lastNode jstWrapper]",
	null, "2013-06-28T14:04:10Z", "mp");

/*
jst.ExtTreePanel.addMethod("forcePathStop:on:", "path aString", "updating", 
	"\t\"default implementation\"" +
	"\n\tself selectNodeBy: [:n | n id asString = aString] silently: false",
	null, "2013-08-15T20:12:32Z", "mp", 1);

jst.ExtTreePanel.addMethod("forcePathStop:on:", "path aString", "updating", 
	"\t\"default implementation\"" +
	"\n\taString isEmptyOrNil " +
	"\n\t\tifFalse: [self selectNodeBy: [:n | n id asString = aString] silently: false]" +
	"\n\t\tifTrue: [self selectionModel clearSelectionsSilently: false]",
	null, "2013-08-17T20:09:42Z", "mp", 1);

jst.ExtTreePanel.addMethod("forcePathStop:on:", "path aString", "updating", 
	"\t\"default implementation\"" +
	"\n\taString isEmptyOrNil " +
	"\n\t\tifFalse: [ | n |" +
	"\n\t\t\tn := self selectNodeBy: [:n | n id asString = aString] silently: false." +
	"\n\t\t\tpath isStop not & n notNil ifTrue: [" +
	"\n\t\t\t\tn expand]]" +
	"\n\t\tifTrue: [self selectionModel clearSelectionsSilently: false]",
	null, "2013-08-18T21:11:39Z", "mp"); //jst-ext-comp
*/
jst.ExtTreePanel.addMethod("forcePathStop:on:last:ifAsync:", "path aString aBoolean aBlock", "updating", 
	"\t\"default implementation\"" +
	"\n\taString isEmptyOrNil " +
	"\n\t\tifFalse: [ | n |" +
	"\n\t\t\tself clearSelectionsSilently: true." +
	"\n\t\t\tn := self selectNodeBy: [:n | n id asString = aString] silently: false." +
	"\n\t\t\tpath isStop not & n notNil ifTrue: [" +
	"\n\t\t\t\t(n isAsync and: [n isLoaded not])" +
	"\n\t\t\t\t\tifTrue: [n expandDeep: false anim: false thenDo: aBlock]" +
	"\n\t\t\t\t\tifFalse: [n expand]]]" +
	"\n\t\tifTrue: [self clearSelectionsSilently: false]",
	null, "2013-08-19T10:23:41Z", "mp", 1);

jst.ExtTreePanel.addMethod("forcePathStop:on:last:ifAsync:", "path aString aBoolean aBlock", "updating", 
	"\t\"default implementation\"" +
	"\n\taString isEmptyOrNil ifFalse: [" +
	"\n\t\t| n |" +
	"\n\t\tself clearSelectionsSilently: true." +
	"\n\t\tn := self selectNodeBy: [:n | n id asString = aString] silently: false." +
	"\n\t\tpath isStop not & n notNil ifTrue: [" +
	"\n\t\t\t(n isAsync and: [n isLoaded not])" +
	"\n\t\t\t\tifTrue: [n expandDeep: false anim: false thenDo: aBlock]" +
	"\n\t\t\t\tifFalse: [n expand]]" +
	"\n\t]",
	null, "2013-08-19T15:40:03Z", "mp", 1);

jst.ExtTreePanel.addMethod("forcePathStop:on:last:ifAsync:", "path aString aBoolean aBlock", "updating", 
	"\t\"default implementation\"" +
	"\n\taString isEmptyOrNil ifFalse: [" +
	"\n\t\t| n |" +
	"\n\t\tself clearSelectionsSilently: true." +
	"\n\t\tn := self selectNodeBy: [:n | n id asString = aString] silently: false." +
	"\n\t\tpath isStop not & n notNil ifTrue: [" +
	"\n\t\t\tpath activatePath." +
	"\n\t\t\t(n isAsync and: [n isLoaded not])" +
	"\n\t\t\t\tifTrue: [n expandDeep: false anim: false thenDo: aBlock]" +
	"\n\t\t\t\tifFalse: [n expand]]" +
	"\n\t]",
	null, "2013-08-20T13:57:16Z", "mp", 1);

jst.ExtTreePanel.addMethod("forcePathStop:on:last:ifAsync:", "path aString aBoolean aBlock", "updating", 
	"\t\"default implementation\"" +
	"\n\taString isEmptyOrNil ifFalse: [" +
	"\n\t\t| n |" +
	"\n\t\t(self ownerContainer isKindOf: ExtTabPanel ) ifTrue: [" +
	"\n\t\t\tself activate]." +
	"\n\t\tself clearSelectionsSilently: true." +
	"\n\t\tn := self selectNodeBy: [:n | n id asString = aString] silently: false." +
	"\n\t\tpath isStop not & n notNil ifTrue: [" +
	"\n\t\t\tpath activatePath." +
	"\n\t\t\t(n isAsync and: [n isLoaded not])" +
	"\n\t\t\t\tifTrue: [n expandDeep: false anim: false thenDo: aBlock]" +
	"\n\t\t\t\tifFalse: [n expand]]." +
	"\n\t]",
	null, "2013-08-23T07:27:10Z", "mp", 1);

jst.ExtTreePanel.addMethod("forcePathStop:on:last:ifAsync:", "path aString aBoolean aBlock", "updating", 
	"\t\"default implementation\"" +
	"\n\taString isEmptyOrNil ifFalse: [" +
	"\n\t\t| n |" +
	"\n\t\t(self ownerContainer isKindOf: ExtTabPanel ) ifTrue: [" +
	"\n\t\t\tself activate]." +
	"\n\t\tself clearSelectionsSilently: true." +
	"\n\t\tn := self selectNodeBy: [:n | n id asString = aString] silently: false." +
	"\n\t\tn ifNotNil: [" +
	"\n\t\t\tpath isStop ifFalse: [" +
	"\n\t\t\t\tpath activatePath]." +
	"\n\t\t\t(n isAsync and: [n isLoaded not])" +
	"\n\t\t\t\tifTrue: [n expandDeep: false anim: false thenDo: aBlock]" +
	"\n\t\t\t\tifFalse: [n expand]" +
	"\n\t\t]" +
	"\n\t]",
	null, "2013-09-20T21:04:46Z", "mp", 1);

jst.ExtTreePanel.addMethod("forcePathStop:on:last:ifAsync:", "path aString aBoolean aBlock", "updating", 
	"\t\"default implementation\"" +
	"\n\taString isEmptyOrNil ifFalse: [" +
	"\n\t\t| n |" +
	"\n\t\t(self ownerContainer isKindOf: ExtTabPanel ) ifTrue: [" +
	"\n\t\t\tself activate]." +
	"\n\t\tself clearSelectionsSilently: true." +
	"\n\t\tn := self selectNodeBy: [:n | n id asString = aString] silently: false." +
	"\n\t\tn ifNotNil: [" +
	"\n\t\t\tpath isStop ifFalse: [" +
	"\n\t\t\t\tpath activatePath]." +
	"\n\t\t\taBoolean ifFalse: [(n isAsync and: [n isLoaded not])" +
	"\n\t\t\t\tifTrue: [n expandDeep: false anim: false thenDo: aBlock]" +
	"\n\t\t\t\tifFalse: [n expand]]" +
	"\n\t\t]" +
	"\n\t]",
	null, "2013-09-23T09:38:09Z", "mp", 1);

jst.ExtTreePanel.addMethod("forcePathStop:on:last:ifAsync:", "path aString aBoolean aBlock", "updating", 
	"\t\"default implementation\"" +
	"\n\taString isEmptyOrNil ifFalse: [" +
	"\n\t\t(self ownerContainer isKindOf: ExtTabPanel ) ifTrue: [" +
	"\n\t\t\tself activate]." +
	"\n\t\tself clearSelectionsSilently: true." +
	"\n\t\t(self selectNodeBy: [:n | n id asString = aString] silently: false) ifNotNilDo: [:n |" +
	"\n\t\t\tpath isStop ifFalse: [" +
	"\n\t\t\t\tpath activatePath]." +
	"\n\t\t\taBoolean ifFalse: [(n isAsync and: [n isLoaded not])" +
	"\n\t\t\t\tifTrue: [n expandDeep: false anim: false thenDo: aBlock]" +
	"\n\t\t\t\tifFalse: [n expand]]" +
	"\n\t\t]" +
	"\n\t]",
	null, "2013-10-11T23:06:04Z", "mp", 1);

jst.ExtTreePanel.addMethod("forcePathStop:on:last:ifAsync:", "path aString aBoolean aBlock", "updating", 
	"\t\"default implementation\"" +
	"\n\taString isEmptyOrNil ifFalse: [" +
	"\n\t\t(self ownerContainer isKindOf: ExtTabPanel ) ifTrue: [" +
	"\n\t\t\tself activate]." +
	"\n\t\tself clearSelectionsSilently: true." +
	"\n\t\t(self root detectChild: [:n | n id asString = aString]) ifNotNilDo: [:n |" +
	"\n\t\t\tn parentNode = self root ifFalse: [" +
	"\n\t\t\t\tn parentNode expand]." +
	"\n\t\t\tself selectionModel selectNode: n." +
	"\n\t\t\tpath isStop ifFalse: [" +
	"\n\t\t\t\tpath activatePath]." +
	"\n\t\t\taBoolean ifFalse: [(n isAsync and: [n isLoaded not])" +
	"\n\t\t\t\tifTrue: [n expandDeep: false anim: false thenDo: aBlock]" +
	"\n\t\t\t\tifFalse: [n expand]]" +
	"\n\t\t]" +
	"\n\t]",
	null, "2013-12-04T09:05:04Z", "mp", 1);

jst.ExtTreePanel.addMethod("forcePathStop:on:last:ifAsync:", "path aString aBoolean aBlock", "updating", 
	"\t\"default implementation\"" +
	"\n\taString isEmptyOrNil ifFalse: [" +
	"\n\t\t(self ownerContainer isKindOf: ExtTabPanel ) ifTrue: [" +
	"\n\t\t\tself activate]." +
	"\n\t\tself clearSelectionsSilently: true." +
	"\n\t\t(self root detectChild: [:n | n id asString = aString]) ifNotNilDo: [:n |" +
	"\n\t\t\tn parentNode = self root ifFalse: [" +
	"\n\t\t\t\tn ensureVisible]." +
	"\n\t\t\tself selectionModel selectNode: n." +
	"\n\t\t\tpath isStop ifFalse: [" +
	"\n\t\t\t\tpath activatePath]." +
	"\n\t\t\taBoolean ifFalse: [(n isAsync and: [n isLoaded not])" +
	"\n\t\t\t\tifTrue: [n expandDeep: false anim: false thenDo: aBlock]" +
	"\n\t\t\t\tifFalse: [n expand]]" +
	"\n\t\t]" +
	"\n\t]",
	null, "2014-04-17T07:39:26Z", "mp"); //jst-ext-comp

//*** ChildNodes ***

jst.ChildNodes.addMethod("parent:", "aNode", "accessing", 
	"\tparent := aNode",
	null, "2011-10-17T14:01:23Z", "mp");

jst.ChildNodes.addMethod("parent", "", "accessing", 
	"\t^ parent",
	null, "2011-10-17T14:01:34Z", "mp");

jst.ChildNodes.addMethod("do:", "aBlock", "enumerating", 
	"\tparent asJsObject perform: #eachChild with: [:ch | aBlock value: ch jstWrapper]",
	null, "2011-10-17T14:07:25Z", "mp");

jst.ChildNodes.addMethod("add:", "aNode", "adding", 
	"\tparent asJsObject perform: #appendChild with: aNode asJsObject." +
	"\n\t^ aNode",
	null, "2011-10-17T14:12:18Z", "mp");

jst.ChildNodes.addMethod("species", "", "private", 
	"\t^ OrderedCollection",
	null, "2011-10-17T14:13:57Z", "mp");

jst.ChildNodes.addMethod("detect:ifNone:", "aBlock exceptionBlock", "enumerating", 
	"\t^ (parent asJsObject perform: #findChildBy with: [:n | aBlock value: n jstWrapper]) " +
	"\n\t\tifNotNilDo: [:n | n jstWrapper] " +
	"\n\t\tifNil: exceptionBlock",
	null, "2013-03-02T20:56:04Z", "mp");

jst.ChildNodes.addMethod("remove:", "aNode", "removing", 
	"\t^ (parent asJsObject perform: #removeChild with: aNode asJsObject) jstWrapper",
	null, "2013-04-12T09:37:09Z", "mp");

jst.ChildNodes.addMethod("remove:ifAbsent:", "aNode absentBlock", "removing", 
	"\t^ (self remove: aNode) ifNil: absentBlock",
	null, "2013-04-12T09:36:52Z", "mp");

jst.ChildNodes.addMethod("removeAll", "", "removing", 
	"\t\"Removes all child nodes from parent node, destroys them upon removal.\"" +
	"\n\tparent asJsObject perform: #removeAll with: true",
	null, "2013-04-29T12:42:44Z", "mp");

jst.ChildNodes.addMethod("first", "", "accessing", 
	"\t^ (parent asJsObject at: #firstChild) jstWrapper",
	null, "2011-10-17T14:33:44Z", "mp");

jst.ChildNodes.addMethod("last", "", "accessing", 
	"\t^ (parent asJsObject at: #lastChild) jstWrapper",
	null, "2011-10-17T14:34:48Z", "mp");

jst.ChildNodes.addMethod("asJsObject", "", "converting", 
	"\t^ parent asJsObject at: #childNodes",
	null, "2011-10-17T15:21:54Z", "mp");

jst.ChildNodes.addMethod("size", "", "accessing", 
	"\t^ (parent asJsObject at: #childNodes) size",
	null, "2013-04-12T09:08:00Z", "mp");

jst.ChildNodes.addMethod("at:", "index", "accessing", 
	"\t^ ((parent asJsObject at: #childNodes) at: index) jstWrapper",
	null, "2012-01-17T15:37:37Z", "mp");

jst.ChildNodes.addMethod("insert:before:", "node refNode", "adding", 
	"\t^ parent insert: node before: refNode",
	null, "2013-04-12T07:41:55Z", "mp");

//*** ExtNode ***

jst.ExtNode._class.addMethod("listenerClass", "", "accessing", 
	"\t^ ExtNodeListener",
	null, "2013-06-22T10:05:41Z", "mp");

/*
jst.ExtNode.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tattributes := ExtConfig new." +
	"\n\tchildNodes := ChildNodes new parent: self",
	null, "2012-08-26T09:51:20Z", "mp");
*/
jst.ExtNode.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tattributes := Dictionary new." +
	"\n\tchildNodes := ChildNodes new parent: self",
	null, "2013-06-28T13:55:05Z", "mp");

jst.ExtNode.addMethod("postCopy", "", "copying", 
	"\tsuper postCopy." +
	"\n\tattributes := attributes copy." +
	"\n\tchildNodes := ChildNodes new parent: self",
	null, "2013-04-12T09:27:59Z", "mp");

jst.ExtNode.addMethod("id", "", "accessing", "\t^ self at: #id");
jst.ExtNode.addMethod("id:", "aString", "accessing", "\tself at: #id by: #setId put: aString");

jst.ExtNode.addMethod("children", "", "accessing", 
	"\t^ obj" +
	"\n\t\tifNil: [config at: #children ifAbsentPut: [OrderedCollection new]] " +
	"\n\t\tifNotNil: childNodes",
	null, "2013-04-12T09:03:39Z", "mp");

// jst.ExtNode.addMethod("children:", "anArray", "accessing-config", "\tself configAt: #children put: anArray");

jst.ExtNode.addMethod("children:", "anArray", "accessing-config", 
	"\tself configAt: #children put: anArray",
	null, "2013-07-03T09:40:04Z", "mp");

/*
jst.ExtNode.addMethod("contents", "", "accessing", "\t^ contents");
jst.ExtNode.addMethod("contents:", "anObject", "accessing", "\tcontents := anObject");
*/
jst.ExtNode.addMethod("link:", "anObject", "accessing", 
	"\tlink := anObject",
	null, "2013-01-09T07:39:28Z", "mp");

jst.ExtNode.addMethod("link", "", "accessing", 
	"\t^ link",
	null, "2013-01-09T07:40:16Z", "mp");

jst.ExtNode.addMethod("attributes", "", "accessing", 
	"\t\"The attributes supplied for the node. You can use this property to access any custom attributes you supplied.\"" +
	"\n\t^ attributes",
	null, "2013-06-28T13:42:52Z", "mp");

jst.ExtNode.addMethod("attributeAt:put:", "attName anObject", "accessing", 
	"\tattributes at: attName put: anObject",
	null, "2013-06-28T13:39:59Z", "mp");

jst.ExtNode.addMethod("createJsObject", "", "private", 
	"\tsuper createJsObject." +
	"\n\tconfig at: #children ifPresent: [:ch |" +
	"\n\t\tch do: [:node |" +
	"\n\t\t\tobj perform: #appendChild with: node asJsObject]]." +
	"\n\tobj at: #attributes put: attributes asJsObject",
	null, "2012-08-26T09:50:41Z", "mp", 1);

jst.ExtNode.addMethod("createJsObject", "", "private", 
	"\t| dict |" +
	"\n\tsuper createJsObject." +
	"\n\tconfig at: #children ifPresent: [:ch |" +
	"\n\t\tch do: [:node |" +
	"\n\t\t\tobj perform: #appendChild with: node asJsObject]]." +
	"\n\tdict := Dictionary on: (obj at: #attributes)." +
	"\n\tattributes keysAndValuesDo: [:k :v |" +
	"\n\t\tdict at: k put: v asJsObject]." +
	"\n\tattributes := dict",
	null, "2013-06-29T21:47:00Z", "mp");

jst.ExtNode.addMethod("isLeaf", "", "accessing", 
	"\t^ self at: #leaf get: #isLeaf default: false");

jst.ExtNode.addMethod("leaf:", "aBoolean", "accessing-config", 
	"\tself configAt: #leaf put: aBoolean");

jst.ExtNode.addMethod("parentNode", "", "accessing", 
	"\t^ (obj at: #parentNode) jstWrapper");

jst.ExtNode.addMethod("nextSibling", "", "accessing", 
	"\t^ (obj at: #nextSibling) jstWrapper");

jst.ExtNode.addMethod("previousSibling", "", "accessing", 
	"\t^ (obj at: #previousSibling) jstWrapper");

jst.ExtNode.addMethod("nextLeaf", "", "accessing", 
	"\t^ self nextSibling ifNotNilDo: [:n |" +
	"\n\t\tn isLeaf " +
	"\n\t\t\tifTrue: [n] " +
	"\n\t\t\tifFalse: [n nextLeaf]]",
	null, "2014-02-24T20:50:42Z", "mp");

jst.ExtNode.addMethod("previousLeaf", "", "accessing", 
	"\t^ self previousSibling ifNotNilDo: [:n |" +
	"\n\t\tn isLeaf " +
	"\n\t\t\tifTrue: [n] " +
	"\n\t\t\tifFalse: [n previousLeaf]]",
	null, "2014-02-24T20:51:03Z", "mp");

jst.ExtNode.addMethod("detectChild:", "aBlock", "enumerating", 
	"\t\"detects the child node in any depth\"" +
	"\n\t^ (obj perform: #findChildBy with: [:ch | aBlock value: ch jstWrapper] with: self with: true) jstWrapper",
	null, "2013-01-29T15:43:18Z", "mp");

jst.ExtNode.addMethod("detectParent:", "aBlock", "enumerating", 
	"\t| n |" +
	"\n\tn := self parentNode." +
	"\n\t[n isNil or: [aBlock value: n]] whileFalse: [" +
	"\n\t\tn := n parentNode]." +
	"\n\t^ n",
	null, "2012-08-26T19:24:50Z", "mp");

jst.ExtNode.addMethod("attributeAt:by:put:", "optionName fceName anObject", "private", 
	"\tobj" +
	"\n\t\tifNil: [attributes at: optionName put: anObject]" +
	"\n\t\tifNotNil: [obj perform: fceName with: anObject asJsObject]",
	null, "2012-08-26T09:52:01Z", "mp");

jst.ExtNode.addMethod("hasChildNodes", "", "testing", 
	"\t\"Returns true if this node has one or more child nodes, else false.\"" +
	"\n\t^ obj notNil and: [obj perform: #hasChildNodes]",
	null, "2013-01-17T15:42:41Z", "mp", 1);

jst.ExtNode.addMethod("hasChildNodes", "", "testing", 
	"\t\"Returns true if this node has one or more child nodes, else false.\"" +
	"\n\t^ obj " +
	"\n\t\tifNil: [self children isEmpty not]" +
	"\n\t\tifNotNil: [obj perform: #hasChildNodes]",
	null, "2014-01-29T09:26:57Z", "mp"); //jst-ext-comp

jst.ExtNode.addMethod("replaceChild:with:", "oldNode newNode", "utils", 
	"\t\"Replaces one child node in this node with another.\"" +
	"\n\tobj perform: #replaceChild with: newNode asJsObject with: oldNode asJsObject." +
	"\n\t^ newNode",
	null, "2013-04-29T13:41:17Z", "mp");

jst.ExtNode.addMethod("insert:before:", "node refNode", "utils", 
	"\t\"Inserts the first node before the second node in this nodes childNodes collection.\"" +
	"\n\tobj perform: #insertBefore with: node asJsObject with: refNode asJsObject",
	null, "2013-04-11T20:03:52Z", "mp");

jst.ExtNode.addMethod("path", "", "accessing", 
	"\t\"Returns the path for this node. The path can be used to expand or select this node programmatically.\"" +
	"\n\t^ obj perform: #getPath",
	null, "2013-06-28T12:58:05Z", "mp");

jst.ExtNode.addMethod("pathBy:", "attName", "accessing", 
	"\t\"Returns the path for this node. The path can be used to expand or select this node programmatically." +
	"\n\tattName: The attr to use for the path (defaults to the node's id)\"" +
	"\n\t^ obj perform: #getPath with: attName",
	null, "2013-06-28T13:23:28Z", "mp");

jst.ExtNode.addMethod("isAsync", "", "testing", 
	"\t^ false",
	null, "2013-08-19T09:44:33Z", "mp");

jst.ExtNode.addMethod("allChildrenDo:", "aBlock", "enumerating", 
	"\tchildNodes do: [:n |" +
	"\n\t\taBlock value: n." +
	"\n\t\tn ifNotNil: [n allChildrenDo: aBlock]" +
	"\n\t]",
	null, "2013-09-09T11:23:19Z", "mp", 1);

jst.ExtNode.addMethod("allChildrenDo:", "aBlock", "enumerating", 
	"\tself children do: [:n |" +
	"\n\t\taBlock value: n." +
	"\n\t\tn ifNotNil: [n allChildrenDo: aBlock]]",
	null, "2014-01-29T09:38:44Z", "mp"); //jst-ext-comp

jst.ExtNode.addMethod("calcDepth", "", "utils", 
	"\t\"Returns depth of this node (the root node has a depth of 0)\"" +
	"\n\t^ obj perform: 'getDepth'",
	null, "2014-04-17T07:48:02Z", "mp");

//*** ExtNodeListener ***

jst.ExtNodeListener.addMethod("beforeexpandHandler", "", "handlers", 
	"\t^ [:receiver :deep :anim |" +
	"\n\t\t^ self handlerBlock valueWithPossibleArgs: {receiver jstWrapper. deep. anim}]",
	null, "2013-06-22T10:02:10Z", "mp");

jst.ExtNodeListener.addMethod("beforecollapseHandler", "", "handlers", 
	"\t^ self beforeexpandHandler",
	null, "2013-06-22T10:02:39Z", "mp");

/* ** ExtBeforeExpandListener ***

jst.ExtBeforeExpandListener.addMethod("handler", "", "accessing", 
	"\t^ [:receiver :deep :anim |" +
	"\n\t\t^ self handlerBlock valueWithPossibleArgs: {receiver jstWrapper. deep. anim}]",
	null, "2013-01-07T20:32:50Z", "mp");

jst.ExtBeforeExpandListener._class.addMethod("events", "", "accessing", 
	"\t^ #(beforeexpand beforecollapse)",
	null, "2013-01-07T20:20:37Z", "mp");
*/

//*** ExtTreeNode ***

jst.ExtTreeNode.addMethod("printOn:", "aStream", "printing", 
	"\tself text " +
	"\n\t\tifNotNilDo: [:str | " +
	"\n\t\t\taStream print: str; " +
	"\n\t\t\t\tnextPutAll: ' -> '; " +
	"\n\t\t\t\tprint: self id]" +
	"\n\t\tifNil: [super printOn: aStream]",
	null, "2014-01-29T20:34:06Z", "mp", 1);

jst.ExtTreeNode.addMethod("printOn:", "aStream", "printing", 
	"\tsuper printOn: aStream." +
	"\n\tself text ifNotNilDo: [:str | " +
	"\n\t\taStream " +
	"\n\t\t\tnextPutAll: ': ';" +
	"\n\t\t\tprint: str; " +
	"\n\t\t\tnextPutAll: ' -> '; " +
	"\n\t\t\tprint: self id]",
	null, "2014-01-30T13:46:47Z", "mp"); //jst-ext-comp

jst.ExtTreeNode.addMethod("text", "", "accessing", 
	"\t^ self at: #text");

jst.ExtTreeNode.addMethod("text:", "aString", "accessing", 
	"\tself at: #text by: #setText put: aString");

jst.ExtTreeNode.addMethod("=", "node", "comparing", 
	"\t^ self id = node id",
	null, "2014-01-30T14:54:30Z", "mp");

jst.ExtTreeNode.addMethod("<=", "node", "comparing", 
	"\t^ self text <= node text");

jst.ExtTreeNode.addMethod("ensureVisible", "", "actions", 
	"\t\"Ensures all parent nodes are expanded, and if necessary, scrolls the node into view.\"" +
	"\n\tobj perform: #ensureVisible",
	null, "2013-08-18T22:43:55Z", "mp");

jst.ExtTreeNode.addMethod("ensureVisibleThenDo:", "aBlock", "actions", 
	"\t\"A block to call when the node has been made visible\"" +
	"\n\tobj perform: #ensureVisible with: aBlock",
	null, "2013-08-18T22:45:15Z", "mp");

jst.ExtTreeNode.addMethod("expand", "", "expand/collapse", 
	"\t\"Expand this node or start the node expanded.\"" +
	"\n\tobj" +
	"\n\t\tifNil: [config at: #expanded put: true] " +
	"\n\t\tifNotNil: [obj perform: #expand]",
	null, "2013-07-03T08:11:22Z", "mp");

jst.ExtTreeNode.addMethod("expandAll", "", "expand/collapse", 
	"\tobj " +
	"\n\t\tifNil: [config at: #expanded put: true." +
	"\n\t\t\tself children do: [:n | n expandAll]]" +
	"\n\t\tifNotNil: [obj perform: #expand with: true with: false]",
	null, "2013-01-14T14:44:29Z", "mp");

jst.ExtTreeNode.addMethod("expandDeep:anim:thenDo:", "deep anim aBlock", "expand/collapse", 
	"\t\"Expand this node. Parameters:" +
	"\n\t\tdeep : Boolean (optional) True to expand all children as well" +
	"\n\t\tanim : Boolean (optional) false to cancel the default animation" +
	"\n\t\taBlock : Function (optional) A callback to be called when expanding this node completes " +
	"\n\t\t(does not wait for deep expand to complete). Called with 1 parameter, this node.\"" +
	"\n\tobj perform: #expand with: deep with: anim with: aBlock asJsObject \"nil is converted to null\"",
	null, "2013-08-19T09:42:57Z", "mp");

jst.ExtTreeNode.addMethod("select", "", "actions", 
	"\t\"Triggers selection of this node\"" +
	"\n\tobj perform: #select",
	null, "2013-01-23T15:26:46Z", "mp");

jst.ExtTreeNode.addMethod("selectSilently", "", "actions", 
	"\tself suspendEvents." +
	"\n\tself select." +
	"\n\tself resumeEvents",
	null, "2011-10-13T09:31:16Z", "mp");

jst.ExtTreeNode.addMethod("icon", "", "accessing", 
	"\t^ attributes at: #icon ifAbsent: nil",
	null, "2012-02-14T10:23:49Z", "mp");

jst.ExtTreeNode.addMethod("icon:", "aString", "accessing", 
	"\t\"The path to an icon for the node. The preferred way to do this is to use the cls or iconCls attributes " +
	"\n\tand add the icon via a CSS background image.\"" +
	"\n\tself attributeAt: #icon by: #setIcon put: aString",
	null, "2012-02-14T10:26:20Z", "mp");

jst.ExtTreeNode.addMethod("iconCls", "", "accessing", 
	"\t^ attributes at: #iconCls ifAbsent: nil",
	null, "2012-02-14T10:24:00Z", "mp");

jst.ExtTreeNode.addMethod("iconCls:", "aString", "accessing", 
	"\t\"A css class to be added to the nodes icon element for applying css background images\"" +
	"\n\tself attributeAt: #iconCls by: #setIconCls put: aString",
	null, "2012-02-14T10:26:00Z", "mp");

jst.ExtTreeNode.addMethod("cls", "", "accessing", 
	"\t^ attributes at: #cls ifAbsent: nil",
	null, "2012-02-14T10:28:08Z", "mp");

jst.ExtTreeNode.addMethod("cls:", "aString", "accessing", 
	"\t\"A css class to be added to the node\"" +
	"\n\tself attributeAt: #cls by: #setCls put: aString",
	null, "2012-02-14T10:27:08Z", "mp");

jst.ExtTreeNode.addMethod("checked:", "aBoolean", "accessing", 
	"\t\"True to render a checked checkbox for this node, false to render an unchecked checkbox " +
	"\n\t(defaults to undefined with no checkbox rendered)\"" +
	"\n\tattributes at: #checked put: aBoolean",
	null, "2012-11-09T22:01:12Z", "mp");

jst.ExtTreeNode.addMethod("checked", "", "accessing", 
	"\t^ attributes at: #checked ifAbsent: nil",
	null, "2012-11-09T22:00:56Z", "mp");

jst.ExtTreeNode.addMethod("checkchangeEvent", "", "events", 
	"\t\"Returned handler block or instance of ExtToggleListener is installed on initialization. " +
	"\n\tFires when a node with a checkbox's checked property changes\"",
	null, "2012-11-09T20:41:49Z", "mp");

jst.ExtTreeNode.addMethod("expandEvent", "", "events", 
	"\t\"returned handler block or instance of ExtDefaultListener is installed on initialization." +
	"\n\tFires when this node is expanded\"",
	null, "2013-01-07T20:07:34Z", "mp");

jst.ExtTreeNode.addMethod("beforeexpandEvent", "", "events", 
	"\t\"returned handler block or instance of ExtBeforeExpandListener is installed on initialization." +
	"\n\tFires before this node is expanded, return false to cancel.\"",
	null, "2013-01-07T20:32:22Z", "mp");

jst.ExtTreeNode.addMethod("beforecollapseEvent", "", "events", 
	"\t\"returned handler block or instance of ExtBeforeExpandListener is installed on initialization." +
	"\n\tFires before this node is collapsed, return false to cancel.\"",
	null, "2013-01-07T21:13:40Z", "mp");

jst.ExtTreeNode.addMethod("collapseEvent", "", "events", 
	"\t\"returned handler block or instance of ExtDefaultListener is installed on initialization." +
	"\n\tFires when this node is collapsed\"",
	null, "2013-01-07T21:15:25Z", "mp");

jst.ExtTreeNode.addMethod("disable", "", "actions", 
	"\t\"Disables this node\"" +
	"\n\tself at: #disabled by: #disable put: true",
	null, "2013-04-05T21:04:00Z", "mp");

jst.ExtTreeNode.addMethod("enable", "", "actions", 
	"\t\"Enables this node\"" +
	"\n\tself at: #disabled by: #enable put: false",
	null, "2013-04-05T21:04:26Z", "mp");

jst.ExtTreeNode.addMethod("isEnabled:", "aBoolean", "accessing", 
	"\taBoolean ifTrue: [self enable] ifFalse: [self disable]",
	null, "2013-04-19T19:53:38Z", "mp");

jst.ExtTreeNode.addMethod("isDisabled:", "aBoolean", "accessing", 
	"\taBoolean ifTrue: [self disable] ifFalse: [self enable]",
	null, "2013-04-19T19:54:24Z", "mp");

jst.ExtTreeNode.addMethod("isExpanded", "", "testing", 
	"\t^ obj perform: #isExpanded",
	null, "2013-09-05T21:20:10Z", "mp");

//*** ExtButtonGroup ***

jst.ExtButtonGroup._class.addMethod("xtype", "", "accessing", "\t^ #buttongroup");
jst.ExtButtonGroup.addMethod("columns:", "anInteger", "accessing-config", "\tself configAt: #columns put: anInteger");

//*** ExtAction extensions ***

jst.ExtAction.addMethod("menu:", "aMenu", "accessing", 
	"\tmenu := aMenu." +
	"\n\telm ifNotNil: [" +
	"\n\t\telm menu: aMenu]",
	null, "2012-01-26T13:10:22Z", "mp");

jst.ExtAction.addMethod("menu", "", "accessing", 
	"\t^ menu",
	null, "2012-04-13T11:31:58Z", "mp");

jst.ExtAction.addMethod("asSplitButton", "", "converting", 
	"\t^ elm := ExtSplitButton new " +
	"\n\t\tmenu: menu; " +
	"\n\t\ton: #click do: [:btn :ev | self execute];" +
	"\n\t\ttext: self buttonLabel; " +
	"\n\t\tisEnabled: self isEnabled",
	null, "2012-01-27T18:17:44Z", "mp", 1);

jst.ExtAction.addMethod("asSplitButton", "", "converting", 
	"\t^ elm := ExtSplitButton new " +
	"\n\t\tmenu: menu; " +
	"\n\t\ton: #click do: [:btn :ev | self execute];" +
	"\n\t\ttext: self buttonLabel; " +
	"\n\t\tisEnabled: self isEnabled;" +
	"\n\t\ttooltip: tooltip",
	null, "2013-06-03T13:26:58Z", "mp", 1);

jst.ExtAction.addMethod("asSplitButton", "", "converting", 
	"\t^ elm := ExtSplitButton new " +
	"\n\t\tmenu: menu; " +
	"\n\t\ton: #click do: [:btn :ev | self execute];" +
	"\n\t\ttext: self buttonLabel; " +
	"\n\t\tisEnabled: self isEnabled;" +
	"\n\t\ttooltip: tooltip;" +
	"\n\t\ticonCls: iconCls",
	null, "2014-05-12T14:18:33Z", "mp"); //jst-ext-comp

jst.ExtAction.addMethod("asButton", "", "converting", 
	"\telm := ExtButton new " +
	"\n\t\ttext: self buttonLabel; " +
	"\n\t\tmenu: menu; " +
	"\n\t\tisEnabled: self isEnabled." +
	"\n\tself hasMenu ifFalse: [" +
	"\n\t\telm on: #click do: [:btn :ev | self execute]]." +
	"\n\t^ elm",
	null, "2012-01-30T09:25:06Z", "mp", 1);

jst.ExtAction.addMethod("asButton", "", "converting", 
	"\telm := ExtButton new " +
	"\n\t\ttext: self buttonLabel; " +
	"\n\t\tmenu: menu; " +
	"\n\t\tisEnabled: self isEnabled;" +
	"\n\t\ttooltip: tooltip." +
	"\n\tself hasMenu ifFalse: [" +
	"\n\t\telm on: #click do: [:btn :ev | self execute]]." +
	"\n\t^ elm",
	null, "2013-06-03T13:05:29Z", "mp", 1);

jst.ExtAction.addMethod("asButton", "", "converting", 
	"\telm := ExtButton new " +
	"\n\t\ttext: self buttonLabel; " +
	"\n\t\tmenu: menu; " +
	"\n\t\tisEnabled: self isEnabled;" +
	"\n\t\ttooltip: tooltip;" +
	"\n\t\ticonCls: iconCls." +
	"\n\tself hasMenu ifFalse: [" +
	"\n\t\telm on: #click do: [:btn :ev | self execute]]." +
	"\n\t^ elm",
	null, "2014-05-12T14:16:43Z", "mp"); //jst-ext-comp

jst.ExtAction.addMethod("asMenuItem", "", "converting", 
	"\telm := ExtMenuItem new " +
	"\n\t\ttext: self itemLabel; " +
	"\n\t\tisEnabled: self isEnabled." +
	"\n\ticon ifNotNil: [" +
	"\n\t\telm icon: icon]." +
	"\n\tself hasMenu " +
	"\n\t\tifTrue: [self rebuildMenu]" +
	"\n\t\tifFalse: [elm on: #click do: [:it :ev | self execute]]." +
	"\n\t^ elm",
	null, "2012-01-30T09:21:00Z", "mp", 1);

jst.ExtAction.addMethod("asMenuItem", "", "converting", 
	"\telm := ExtMenuItem new " +
	"\n\t\ttext: self itemLabel; " +
	"\n\t\tisEnabled: self isEnabled;" +
	"\n\t\ticonCls: iconCls." +
	"\n\ticon ifNotNil: [" +
	"\n\t\telm icon: icon]." +
	"\n\tself hasMenu " +
	"\n\t\tifTrue: [self rebuildMenu]" +
	"\n\t\tifFalse: [elm on: #click do: [:it :ev | self execute]]." +
	"\n\t^ elm",
	null, "2014-05-12T14:17:03Z", "mp"); //jst-ext-comp

jst.ExtAction.addMethod("rebuildMenu", "", "public", 
	"\tmenu := ExtMenu new " +
	"\n\t\ton: #beforerender do: [:m | self buildMenuItems]." +
	"\n\telm menu: menu",
	null, "2012-01-27T18:42:40Z", "mp", 1);

jst.ExtAction.addMethod("rebuildMenu", "", "public", 
	"\tmenu := self menuEnabled ifTrue: [" +
	"\n\t\tExtMenu new" +
	"\n\t\t\ton: #beforerender do: [:m | self buildMenuItems];" +
	"\n\t\t\tyourself]." +
	"\n\telm menu: menu",
	null, "2012-02-06T22:25:40Z", "mp", 1);

jst.ExtAction.addMethod("rebuildMenu", "", "public", 
	"\tmenu := self menuEnabled ifTrue: [" +
	"\n\t\tExtMenu new" +
	"\n\t\t\ton: #beforerender do: [:m | self buildMenuItems];" +
	"\n\t\t\tyourself]." +
	"\n\telm menu: menu." +
	"\n\t^ menu",
	null, "2012-04-13T11:31:22Z", "mp"); //jst-ext-comp

jst.ExtAction.addMethod("buildMenuItems", "", "private", 
	"",
	null, "2012-01-27T18:42:56Z", "mp");

jst.ExtAction.addMethod("hasMenu", "", "private", 
	"\tself class withAllSuperclassesDo: [:cl |" +
	"\n\t\tcl == ExtAction ifTrue: [" +
	"\n\t\t\t^ false]." +
	"\n\t\tcl methodDict at: #buildMenuItems ifPresent: [:m |" +
	"\n\t\t\t^ true]]." +
	"\n\t^ false",
	null, "2012-01-30T08:47:06Z", "mp");

jst.ExtAction.addMethod("menuEnabled", "", "testing", 
	"\t^ self hasMenu and: [self target notNil]",
	null, "2012-02-06T21:52:51Z", "mp");

// *** ExtManager ***

jst.ExtManager.addMethod("asJsObject", "", "converting", function (){
	return Ext.state.Manager;
},
	null, "2012-04-08T19:03:31Z", "mp");

jst.ExtManager._class.addMethod("default", "", "accessing", 
	"\t^ default",
	 "__default", "2012-04-08T19:07:39Z", "mp");

jst.ExtManager._class.addMethod("initialize", "", "class initialization", 
	"\tdefault := self new." +
	"\n\tdefault wrap: default asJsObject",
	null, "2012-04-08T20:05:33Z", "mp");

jst.initializeClass(jst.ExtManager);

jst.ExtManager.addMethod("provider:", "anExtProvider", "accessing", 
	"\t\"Configures the default state provider for your application\"" +
	"\n\tself asJsObject perform: #setProvider with: anExtProvider asJsObject",
	null, "2012-04-08T20:01:28Z", "mp");

jst.ExtManager.addMethod("provider", "", "accessing", 
	"\t\"Gets the currently configured state provider\"" +
	"\n\t^ ExtProvider wrap: (self asJsObject perform: #getProvider)",
	null, "2012-04-08T20:11:57Z", "mp");

/* ** ExtStateChangeListener ***

jst.ExtStateChangeListener.addMethod("handler", "", "accessing", 
	"\t^ [:provider :key :value |" +
	"\n\t\tself handlerBlock value: provider jstWrapper value: key value: value]",
	null, "2012-04-09T16:37:03Z", "mp");
*/

// *** ExtProvider ***

jst.ExtProvider.addMethod("wrap:", "jsObject", "accessing", 
	"\tsuper wrap: jsObject." +
	"\n\tstate := Dictionary on: (obj at: #state)" +
	"\n\t",
	null, "2012-04-03T08:19:10Z", "mp");

jst.ExtProvider.addMethod("state", "", "accessing", 
	"\t^ state",
	null, "2012-04-17T09:20:18Z", "mp");

jst.ExtProvider.addMethod("encodeValue:", "anObject", "private", 
	"\t\"Encodes a value including type information. Decode with decodeValue.\"" +
	"\n\t^ obj perform: #encodeValue with: anObject",
	null, "2012-04-12T15:56:16Z", "mp");

jst.ExtProvider.addMethod("decodeValue:", "aString", "private", 
	"\t\"Decodes a string previously encoded with encodeValue.\"" +
	"\n\t^ obj perform: #decodeValue with: aString",
	null, "2012-04-08T21:35:52Z", "mp");

jst.ExtProvider.addMethod("set:value:", "name anObject", "private", 
	"\t\"Sets the value for a key\"" +
	"\n\tobj perform: #set with: name with: anObject",
	null, "2012-04-09T14:23:18Z", "mp");

jst.ExtProvider.addMethod("get:default:", "name anObject", "private", 
	"\t\"Returns the current value for a key\"" +
	"\n\t^ obj perform: #get with: name with: anObject",
	null, "2012-04-09T14:25:47Z", "mp");

jst.ExtProvider.addMethod("clear:", "name", "private", 
	"\t\"Clears a value from the state\"" +
	"\n\tobj perform: #clear with: name",
	null, "2012-04-09T14:28:16Z", "mp");

jst.ExtProvider.addMethod("statechangeEvent", "", "events", 
	"\t\"Fires when a state change occurs\"" +
	"\n\t",
	null, "2013-06-22T13:58:57Z", "mp");

// *** LocalStorageProvider ***

jst.LocalStorageProvider.addMethod("decodeValue:", "aString", "private", 
	"\t^ JSON default decode: aString",
	null, "2012-04-24T11:38:55Z", "mp");

jst.LocalStorageProvider.addMethod("encodeValue:", "anObject", "private", 
	"\t^ JSON default encode: anObject",
	null, "2012-04-24T11:38:42Z", "mp");

jst.LocalStorageProvider.addMethod("createJsObject", "", "private", function (){
	return this.wrap_(new Ext.state.Provider());
},
	null, "2012-04-03T08:11:31Z", "mp");

jst.LocalStorageProvider.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tprefix := 'jst-'." +
	"\n\tself createJsObject." +
	"\n\tself installListeners." +
	"\n\tself load.",
	null, "2012-04-09T19:23:45Z", "mp");

jst.LocalStorageProvider.addMethod("load", "", "private", 
	"\tWebStorage local keysAndValuesDo: [:key :value |" +
	"\n\t\t(key startsWith: prefix) ifTrue: [" +
	"\n\t\t\tstate at: (key allButFirst: prefix size) put: (self decodeValue: value)]]",
	null, "2012-04-09T19:24:28Z", "mp");

jst.LocalStorageProvider.addMethod("load", "", "private", 
	"\tWebStorage local keysAndValuesDo: [:key :value |" +
	"\n\t\t(key startsWith: prefix) ifTrue: [" +
	"\n\t\t\t[state at: (key allButFirst: prefix size) put: (self decodeValue: value)] ifError: [" +
	"\n\t\t\t\tConsole log: 'Couldn''t load from local storage: ', key, ' : ', value]]]",
	null, "2012-11-10T20:32:59Z", "mp");

jst.LocalStorageProvider.addMethod("statechangeEvent", "", "events", 
	"\t\"value will mostly be a native js object, is must not be a JSObjectProxy instance\"" +
	"\n\t^ [:provider :key :value | nil = value " +
	"\n\t\tifFalse: [WebStorage local at: prefix, key put: (self encodeValue: value)] " +
	"\n\t\tifTrue: [WebStorage local removeKey: prefix, key ifAbsent: nil]]",
	null, "2012-04-12T18:51:22Z", "mp");

// *** ExtViewport ***

jst.ExtViewport.addMethod("createWrappedObject", "", "private", function (){
	return this.wrap_(new Ext.Viewport(this._config.asJsObject()));
},
	null, "2012-06-05T12:36:22Z", "mp");

//*** ExtTreeLoaderListener ***

jst.ExtTreeLoaderListener.addMethod("beforeloadHandler", "", "handlers", 
	"\t^ [:aTreeLoader :aTreeNode :aBlock |" +
	"\n\t\tself handlerBlock valueWithPossibleArgs: {" +
	"\n\t\t\taTreeLoader jstWrapper. " +
	"\n\t\t\taTreeNode jstWrapper. " +
	"\n\t\t\taBlock}]",
	null, "2013-06-22T10:34:22Z", "mp");

jst.ExtTreeLoaderListener.addMethod("loadHandler", "", "handlers", 
	"\t^ [:aTreeLoader :aTreeNode :response |" +
	"\n\t\tself handlerBlock valueWithPossibleArgs: {" +
	"\n\t\t\taTreeLoader jstWrapper. " +
	"\n\t\t\taTreeNode jstWrapper. " +
	"\n\t\t\tDictionary on: response}]",
	null, "2013-06-22T10:35:15Z", "mp");

jst.ExtTreeLoaderListener.addMethod("loadexceptionHandler", "", "handlers", 
	"\t^ self loadHandler",
	null, "2013-06-22T10:35:33Z", "mp");

//*** ExtTreeLoader ***

jst.ExtTreeLoader._class.addMethod("listenerClass", "", "accessing", 
	"\t^ ExtTreeLoaderListener",
	null, "2013-06-22T10:38:58Z", "mp");

jst.ExtTreeLoader.addMethod("dataUrl:", "anObject", "accessing-config", 
	"\t\"The URL from which to request a Json string which specifies an array of node definition objects " +
	"\n\trepresenting the child nodes to be loaded.\"" +
	"\n\tself configAt: #dataUrl put: anObject asString",
	null, "2012-06-12T12:49:39Z", "mp", 1);

jst.ExtTreeLoader.addMethod("dataUrl:", "anObject", "accessing-config", 
	"\t\"The URL from which to request a Json string which specifies an array of node definition objects " +
	"\n\trepresenting the child nodes to be loaded.\"" +
	"\n\turlType := anObject isString " +
	"\n\t\tifFalse: [anObject class] " +
	"\n\t\tifTrue: [Url new]." +
	"\n\tself configAt: #dataUrl put: anObject asString",
	null, "2013-07-04T13:31:10Z", "mp"); //jst-ext-comp

jst.ExtTreeLoader.addMethod("nodeParameter:", "aString", "accessing-config", 
	"\t\"The name of the parameter sent to the server which contains the identifier of the node. Defaults to 'node'.\"" +
	"\n\tself configAt: #nodeParameter put: aString",
	null, "2012-06-07T21:36:16Z", "mp");

jst.ExtTreeLoader.addMethod("nodeParameter", "", "accessing-config", 
	"\t^ self at: #nodeParameter default: 'node'",
	null, "2012-06-07T21:37:22Z", "mp");

jst.ExtTreeLoader.addMethod("dataUrl", "", "accessing-config", 
	"\t^ self at: #dataUrl",
	null, "2012-06-07T21:37:57Z", "mp");

jst.ExtTreeLoader.addMethod("requestMethod:", "aString", "accessing-config", 
	"\t\"The HTTP request method for loading data.  Note that this is case-sensitive and should be all caps " +
	"\n\t(defaults to undefined; if not set but params are present will use POST, otherwise will use GET.)\"" +
	"\n\tself configAt: #requestMethod put: aString",
	null, "2013-04-12T08:38:13Z", "mp");

/*
jst.ExtTreeLoader.addMethod("createJsObject", "", "private", function (){
	this.wrap_(new Ext.tree.TreeLoader(this._config.asJsObject()));
	this._superProcessResponse = this._obj.processResponse;
	this._superCreateNode = this._obj.createNode;
	var self = this;
	this._obj.processResponse = function(response, node, callback, scope) {
		if (!response.responseData && self._responseDataExtractor.notNil())
			response.responseData = self._responseDataExtractor.value_(jst.Dictionary.on_(response)).asJsObject();
		self._superProcessResponse.call(self._obj, response, node, callback, scope);
	};
	this._obj.createNode = function (attr) {
		return jst.sndw(self, "createNode_", jst.Dictionary.on_(attr));
	};
},
	null, "2012-08-25T19:56:06Z", "mp");

jst.ExtTreeLoader.addMethod("createJsObject", "", "private", function (){
	this.wrap_(new Ext.tree.TreeLoader(this._config.asJsObject()));
	this._superProcessResponse = this._obj.processResponse;
	this._superCreateNode = this._obj.createNode;
	var self = this;
	this._obj.processResponse = function(response, node, callback, scope) {
		if (!response.responseData && self._responseDataExtractor.notNil())
			response.responseData = self._responseDataExtractor(
				self, node._jstWrapper, jst.Dictionary.on_(response)).asJsObject();
		self._superProcessResponse.call(self._obj, response, node, callback, scope);
	};
	this._obj.createNode = function (attr) {
		return jst.sndw(self, "createNode_", jst.Dictionary.on_(attr));
	};
	return this;
},
	null, "2013-01-08T14:36:19Z", "mp");
*/

jst.ExtTreeLoader.addMethod("createJsObject", "", "private", function (){
	this.wrap_(new Ext.tree.TreeLoader(this._config.asJsObject()));
	this._superProcessResponse = this._obj.processResponse;
	this._superCreateNode = this._obj.createNode;
	var self = this;
	this._obj.processResponse = function(response, node, callback, scope) {
		if (self._responseDataExtractor.notNil())
			response.responseData = self._responseDataExtractor(
				self, node.jstProxy._jstWrapper, jst.sndw(jst.Dictionary, "on_", response)).asCollection();
		self._superProcessResponse.call(self._obj, response, node, callback, scope);
	};
	this._obj.createNode = function (attr) {
		return jst.sndw(self, "createNode_", attr);
	};
	return this;
},
	null, "2013-01-08T16:56:15Z", "mp");

jst.ExtTreeLoader.addMethod("createNode:", "attr", "private", function (attr){
	if (this._nodeCreator.notNil())
		return this._nodeCreator.value_(attr).asJsObject();
	return this._superCreateNode.call(this._obj, attr.asJsObject());
},
	null, "2012-08-25T19:56:55Z", "mp");

jst.ExtTreeLoader.addMethod("responseDataExtractor:", "aBlockWithOneArg", "accessing", 
	"\tresponseDataExtractor := aBlockWithOneArg",
	null, "2012-06-08T11:31:34Z", "mp");

jst.ExtTreeLoader.addMethod("nodeCreator:", "aBlockWithOneArg", "accessing", 
	"\tnodeCreator := aBlockWithOneArg",
	null, "2012-06-08T17:54:32Z", "mp");

jst.ExtTreeLoader.addMethod("baseParams", "", "accessing", 
	"\t\"An object containing properties which specify HTTP parameters to be passed to each request for child nodes.\"" +
	"\n\t^ config at: #baseParams ifAbsentPut: [" +
	"\n\t\tobj ifNil: [Dictionary new] ifNotNil: [Dictionary on: (obj at: #baseParams)]]",
	null, "2012-06-08T22:01:17Z", "mp");

jst.ExtTreeLoader.addMethod("parameterAt:put:", "aString anObject", "accessing", 
	"\tself baseParams at: aString put: anObject asUrlParameter",
	null, "2013-04-04T21:13:58Z", "mp", 1);

jst.ExtTreeLoader.addMethod("parameterAt:put:", "aString anObject", "accessing", 
	"\tself baseParams at: aString put: (urlType encodeParameter: anObject)",
	null, "2013-07-04T13:31:53Z", "mp"); //jst-ext-comp

jst.ExtTreeLoader.addMethod("baseAttrs", "", "accessing", 
	"\t\"An object containing attributes to be added to all nodes created by this loader. " +
	"\n\tIf the attributes sent by the server have an attribute in this object, they take priority.\"" +
	"\n\t^ config at: #baseAttrs ifAbsentPut: [" +
	"\n\t\tobj ifNil: [Dictionary new] ifNotNil: [Dictionary on: (obj at: #baseAttrs)]]",
	null, "2012-06-08T22:04:17Z", "mp");

jst.ExtTreeLoader.addMethod("attributeAt:put:", "aString anObject", "accessing", 
	"\tself baseAttrs at: aString put: anObject",
	null, "2012-06-08T22:04:53Z", "mp");

jst.ExtTreeLoader.addMethod("loadNode:thenDo:", "anExtTreeNode aBlock", "public", 
	"\t\"Load an ExtTreeNode from the specified URL. This is called automatically when a node is expanded, " +
	"\n\tbut may be used to reload a node (or append new children if the clearOnLoad option is false.)" +
	"\n\tA block is called after the node has been loaded. The block is passed the TreeNode which was requested to be loaded.\"" +
	"\n\tself asJsObject perform: #load with: anExtTreeNode asJsObject with: aBlock",
	null, "2012-06-09T18:54:07Z", "mp");

jst.ExtTreeLoader.addMethod("loadNode:", "anExtTreeNode", "public", 
	"\tself asJsObject perform: #load with: anExtTreeNode asJsObject",
	null, "2012-06-09T18:55:27Z", "mp");

jst.ExtTreeLoader.addMethod("loadEvent", "", "events", 
	"\t\"Returned handler block or instance of ExtLoadListener is installed on initialization." +
	"\n\tFires when the node has been successfuly loaded.\"",
	null, "2012-06-09T19:20:30Z", "mp");

jst.ExtTreeLoader.addMethod("beforeloadEvent", "", "events", 
	"\t\"Returned handler block or instance of ExtBeforeLoadListener is installed on initialization." +
	"\n\tFires before a network request is made to retrieve the Json text which specifies a node's children.\"",
	null, "2012-06-09T19:18:26Z", "mp");

jst.ExtTreeLoader.addMethod("loadexceptionEvent", "", "events", 
	"\t\"Returned handler block or instance of ExtLoadExceptionListener is installed on initialization." +
	"\n\tFires if the network request failed.\"",
	null, "2012-06-09T19:22:53Z", "mp");

/*
jst.ExtTreeLoader._class.addMethod("couchdb", "", "instance creation", 
	"\t^ self new" +
	"\n\t\trequestMethod: 'GET';" +
	"\n\t\tresponseDataExtractor: [:respDict | " +
	"\n\t\t\t(JSON full decode: (respDict at: 'responseText')) at: #rows];" +
	"\n\t\tnodeParameter: '';" +
	"\n\t\ton: #beforeload do: [:loader :node | " +
	"\n\t\t\tloader parameterAt: 'key' put: (node id isString ifTrue: ['\"', node id, '\"'] ifFalse: [node id asJsObject])];" +
	"\n\t\tyourself",
	null, "2012-06-09T22:23:29Z", "mp");

jst.ExtTreeLoader._class.addMethod("couchdb", "", "instance creation", 
	"\t^ self new" +
	"\n\t\trequestMethod: 'GET';" +
	"\n\t\tresponseDataExtractor: [:loader :node :respDict | " +
	"\n\t\t\t(JSON full decode: (respDict at: 'responseText')) at: #rows];" +
	"\n\t\tnodeParameter: '';" +
	"\n\t\ton: #beforeload do: [:loader :node | " +
	"\n\t\t\tloader parameterAt: 'key' put: (node id isString ifTrue: ['\"', node id, '\"'] ifFalse: [node id asJsObject])];" +
	"\n\t\tyourself",
	null, "2013-01-08T14:37:37Z", "mp");

jst.ExtTreeLoader._class.addMethod("couchdb", "", "instance creation", 
	"\t^ self new" +
	"\n\t\trequestMethod: 'GET';" +
	"\n\t\tresponseDataExtractor: [:loader :node :respDict | " +
	"\n\t\t\t(JSON full decode: (respDict at: 'responseText')) at: #rows];" +
	"\n\t\tnodeParameter: '';" +
	"\n\t\ton: #beforeload do: [:loader :node | (node id startsWith: 'xnode') ifFalse: [" +
	"\n\t\t\t\"xnode-... is default node id, we do not expect it to be a parameter for request\"" +
	"\n\t\t\tloader parameterAt: 'key' put: (node id isString ifTrue: ['\"', node id, '\"'] ifFalse: [node id asJsObject])]];" +
	"\n\t\tyourself",
	null, "2013-04-03T09:39:47Z", "mp");

jst.ExtTreeLoader._class.addMethod("couchdb", "", "instance creation", 
	"\t^ self new" +
	"\n\t\trequestMethod: 'GET';" +
	"\n\t\tresponseDataExtractor: [:loader :node :respDict | " +
	"\n\t\t\t(JSON full decode: (respDict at: 'responseText')) at: #rows];" +
	"\n\t\tnodeParameter: '';" +
	"\n\t\ton: #beforeload do: [:loader :node | (node id startsWith: 'xnode') ifFalse: [" +
	"\n\t\t\t\"xnode-... is default node id, we do not expect it to be a parameter for request\"" +
	"\n\t\t\tloader parameterAt: 'key' put: node id]];" +
	"\n\t\tyourself",
	null, "2013-04-04T21:17:09Z", "mp");
*/
jst.ExtTreeLoader._class.addMethod("couchdb", "", "instance creation", 
	"\t^ self new" +
	"\n\t\trequestMethod: 'GET';" +
	"\n\t\tresponseDataExtractor: [:loader :node :respDict | " +
	"\n\t\t\t(JSON full decode: (respDict at: 'responseText')) at: #rows];" +
	"\n\t\tnodeParameter: nil;" +
	"\n\t\ton: #beforeload do: [:loader :node | (node id startsWith: 'xnode') ifFalse: [" +
	"\n\t\t\t\"xnode-... is default node id, we do not expect it to be a parameter for request\"" +
	"\n\t\t\tloader parameterAt: 'key' put: node id]];" +
	"\n\t\tyourself",
	null, "2013-05-13T08:36:03Z", "mp");

/* zatim nevim, jak funkci pouzit ...
jst.ExtTreeLoader.addMethod("directFn:", "aBlock", "accessing-config", 
	"\t\"Function to call when executing a request.\"" +
	"\n\tself configAt: #directFn put: aBlock",
	null, "2013-04-03T13:22:16Z", "mp");
*/

/* ** ExtBeforeLoadListener ***

jst.ExtBeforeLoadListener.addMethod("handler", "", "accessing", 
	"\t^ [:aTreeLoader :aTreeNode :aBlock |" +
	"\n\t\tself handlerBlock valueWithPossibleArgs: {aTreeLoader jstWrapper. aTreeNode jstWrapper. aBlock}]",
	null, "2012-06-09T20:58:01Z", "mp");

//*** ExtLoadListener ***

jst.ExtLoadListener.addMethod("handler", "", "accessing", 
	"\t^ [:aTreeLoader :aTreeNode :response |" +
	"\n\t\tself handlerBlock valueWithPossibleArgs: {aTreeLoader jstWrapper. aTreeNode jstWrapper. Dictionary on: response}]",
	null, "2012-06-09T20:59:55Z", "mp");

jst.ExtLoadListener._class.addMethod("events", "", "accessing", 
	"\t^ #(load loadexception)",
	null, "2012-09-25T20:25:27Z", "mp");
*/

// *** ExtAsyncTreeNode ***

jst.ExtAsyncTreeNode.addMethod("loader:", "anExtTreeLoader", "accessing-config", 
	"\t\"A TreeLoader to be used by this node (defaults to the loader defined on the tree)\"" +
	"\n\tattributes at: #loader put: anExtTreeLoader",
	null, "2012-08-26T10:07:15Z", "mp");

jst.ExtAsyncTreeNode.addMethod("loader", "", "accessing", 
	"\t^ attributes at: 'loader' ifAbsent: [" +
	"\n\t\tExtTreeLoader wrap: (obj perform: #getLoader)]",
	null, "2012-08-26T10:10:02Z", "mp");

jst.ExtAsyncTreeNode.addMethod("reload", "", "utils", 
	"\t\"Trigger a reload for this node\"" +
	"\n\tobj perform: #reload",
	null, "2013-04-04T14:38:49Z", "mp");

jst.ExtAsyncTreeNode.addMethod("reloadThenDo:", "aBlock", "utils", 
	"\t\"Trigger a reload for this node\"" +
	"\n\tobj perform: #reload with: aBlock",
	null, "2013-09-09T11:53:49Z", "mp");

jst.ExtAsyncTreeNode.addMethod("isAsync", "", "testing", 
	"\t^ true",
	null, "2013-08-19T09:44:47Z", "mp");

jst.ExtAsyncTreeNode.addMethod("isLoaded", "", "testing", 
	"\t\"Returns true if this node has been loaded\"" +
	"\n\t^ obj perform: #isLoaded",
	null, "2013-08-19T10:22:25Z", "mp");

/* asi nefunguje - zmizi ikona + - slo by resit nahrazenim uzlu jeho kopii?
jst.ExtAsyncTreeNode.addMethod("reset", "", "utils", 
	"\t\"see http://localhost/ext-3.4.0/docs/source/AsyncTreeNode.html#method-Ext.tree.AsyncTreeNode-reload\"" +
	"\n\tobj perform: #collapse with: false with: false." +
	"\n\tchildNodes removeAll." +
	"\n\tobj at: #loaded put: false." +
	"\n\tobj at: #childrenRendered put: false \"je to k necemu?\"",
	null, "2013-04-29T12:55:39Z", "mp");
*/

// *** ExtToolbar ***

jst.ExtToolbar._class.addMethod("xtype", "", "accessing", 
	"\t^ #toolbar",
	null, "2012-10-01T14:42:36Z", "mp");

jst.ExtToolbar.addMethod("buttonAlign:", "aString", "accessing-config", 
	"\t\"The default position at which to align child items. Defaults to #left" +
	"\n\tMay be specified as #center to cause items added before a Fill (A '->') item to be centered in the Toolbar. " +
	"\n\tItems added after a Fill are still right-aligned. Specify as #right to right align all child items.\"" +
	"\n\tself configAt: #buttonAlign put: aString",
	null, "2012-10-01T14:48:23Z", "mp");

jst.ExtToolbar.addMethod("buttonAlign", "", "accessing-config", 
	"\t^ self at: #buttonAlign default: #left",
	null, "2012-10-01T14:48:42Z", "mp");

jst.ExtToolbar.addMethod("addSpacer", "", "adding items", 
	"\t\"Adds a spacer element, default width is 2px \"" +
	"\n\t^ self add: (Dictionary new " +
	"\n\t\tat: #xtype put: #tbspacer;" +
	"\n\t\tyourself)",
	null, "2013-02-27T21:41:00Z", "mp");

jst.ExtToolbar.addMethod("addSpace:", "aNumber", "adding items", 
	"\t\"Adds a spacer element with specified width in pixels\"" +
	"\n\t^ self add: (Dictionary new " +
	"\n\t\tat: #xtype put: #tbspacer; " +
	"\n\t\tat: #width put: aNumber; " +
	"\n\t\tyourself)",
	null, "2013-02-27T21:42:22Z", "mp");

jst.ExtToolbar.addMethod("addSeparator", "", "adding items", 
	"\t^ self add: (Dictionary new " +
	"\n\t\tat: #xtype put: #tbseparator;" +
	"\n\t\tyourself)",
	null, "2013-02-27T22:19:15Z", "mp");

jst.ExtToolbar.addMethod("addFill", "", "adding items", 
	"\t\"Forces subsequent additions into the float:right toolbar\"" +
	"\n\t^ self add: (Dictionary new " +
	"\n\t\tat: #xtype put: #tbfill;" +
	"\n\t\tyourself)",
	null, "2013-06-04T08:20:30Z", "mp");

jst.ExtToolbar.addMethod("addText:", "aString", "adding items", 
	"\t\"Adds text to the toolbar \"" +
	"\n\t^ self add: (Dictionary new " +
	"\n\t\tat: #xtype put: #tbtext; " +
	"\n\t\tat: #text put: aString; " +
	"\n\t\tyourself)",
	null, "2014-01-28T22:47:20Z", "mp");

jst.ExtToolbar.addMethod("insertAt:item:", "index anObject", "adding items", 
	"\t\"Inserts any Ext.Toolbar.Item/Ext.Button at the specified index.\"" +
	"\n\tobj perform: #insertButton with: index-1 with: anObject asJsObject",
	null, "2014-03-11T10:23:53Z", "mp");

//*** ExtTip ***

jst.ExtTip.addMethod("createWrappedObject", "", "private", function (){
	return this.wrap_(eval("new " + this._class.jsClassName() + "(this._config.asJsObject())"));
},
	null, "2013-05-09T20:19:30Z", "mp");

jst.ExtTip.addMethod("showBy:", "anObject", "rendering", 
	"\t\"Experimental. Shows this tip at a position relative to another element using a standard Ext.Element.alignTo anchor position value.\"" +
	"\n\tself asJsObject perform: #showBy with: anObject asJsObject",
	null, "2013-05-09T19:47:57Z", "mp");

jst.ExtTip.addMethod("closable:", "aBoolean", "accessing-config", 
	"\t\"True to render a close tool button into the tooltip header.\"" +
	"\n\tself configAt: #closable put: aBoolean",
	null, "2013-05-09T19:54:48Z", "mp");

jst.ExtTip.addMethod("closable", "", "accessing-config", 
	"\t^ self at: #closable default: false",
	null, "2013-05-09T19:55:16Z", "mp");

jst.ExtTip.addMethod("showAt:", "aPointOrArray", "rendering", 
	"\t\"Shows this tip at the specified XY position\"" +
	"\n\tself asJsObject perform: #showAt with: aPointOrArray asJsObject",
	null, "2013-05-10T06:28:18Z", "mp");
