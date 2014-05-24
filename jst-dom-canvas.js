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
 * Depends on jst-dom
 */

jst.currentJsFile = "jst-dom-canvas";

// CLASSES

jst.Object.subclass("TagBrush", "canvas parent element", "", "", "DOM-Canvas");

jst.TagBrush.subclass("GenericTag", "", "", "", "DOM-Canvas");
jst.TagBrush.subclass("AnchorTag", "", "", "", "DOM-Canvas");
jst.TagBrush.subclass("ImageTag", "", "", "", "DOM-Canvas");
jst.TagBrush.subclass("IframeTag", "", "", "", "DOM-Canvas");
jst.TagBrush.subclass("FormTag", "", "", "", "DOM-Canvas");
jst.TagBrush.subclass("CanvasTag", "", "", "", "DOM-Canvas");

jst.TagBrush.subclass("FormInputTag", "", "", "", "DOM-Canvas");

jst.TagBrush.subclass("TableTag", "", "", "", "DOM-Canvas");
jst.TagBrush.subclass("TableCellTag", "", "", "", "DOM-Canvas");

jst.TagBrush.subclass("ExtTplTag", "", "", "", "DOM-Canvas");

jst.TableCellTag.subclass("TableDataTag", "", "", "", "DOM-Canvas");
jst.TableCellTag.subclass("TableHeadingTag", "", "", "", "DOM-Canvas");

jst.Object.subclass("HtmlCanvas", "currentBrush parentBrush", "", "", "DOM-Canvas");

jst.Object.subclass("Widget", "", "", "", "DOM-Canvas");

// *** Extensions ***

jst.BlockClosure.addMethod("renderOn:", "html", "*dom-canvas", 
	"\tself numArgs = 0" +
	"\n\t\tifTrue: [self value]" +
	"\n\t\tifFalse: [self value: html]",
	null, "2011-12-09T15:10:55Z", "mp");

jst.Collection.addMethod("renderOn:", "html", "*dom-canvas", 
	"\tself do: [:each | each renderOn: html ]",
	null, "2011-12-10T20:01:16Z", "mp");

jst.Object.addMethod("renderOn:", "html", "*dom-canvas", 
	"\t\"Override this method to customize how objects (not components) are rendered when passed as an argument to #render:. " +
	"\n\tThe default is the return value of #displayString\"" +
	"\n\thtml text: self",
	null, "2011-12-10T20:03:50Z", "mp");

jst.String.addMethod("renderOn:", "html", "*dom-canvas", 
	"\thtml text: self",
	null, "2011-12-10T21:13:07Z", "mp");

jst.UndefinedObject.addMethod("renderOn:", "html", "*dom-canvas", 
	"",
	null, "2011-12-10T20:05:16Z", "mp");

jst.DocumentFragment._class.addMethod("htmlContents:", "blockWithArg", "*dom-canvas", //instance creation 
	"\t| df |" +
	"\n\tdf := Document current createDocumentFragment." +
	"\n\tblockWithArg value: (HtmlCanvas new on: df)." +
	"\n\t^ df",
	null, "2012-03-16T20:46:51Z", "mp");

jst.DOMElement.addMethod("htmlContents:", "blockWithArg", "*dom-canvas", //accessing 
	"\t\"call #empty first, if you want to replace the whole contents of this element\"" +
	"\n\tblockWithArg value: (HtmlCanvas new on: self)",
	null, "2012-04-12T19:42:25Z", "mp");

//*** TagBrush ***

jst.TagBrush.addMethod("parent", "", "accessing", 
	"\t^ parent",
	null, "2011-12-09T13:53:19Z", "mp");

jst.TagBrush.addMethod("setParent:canvas:", "aBrush aCanvas", "accessing", 
	"\tparent := aBrush." +
	"\n\tcanvas := aCanvas." +
	"\n\tparent element appendChild: self element",
	null, "2011-12-09T14:16:52Z", "mp");

jst.TagBrush.addMethod("with:", "aBlock", "public", 
	"\tcanvas nest: aBlock",
	null, "2011-12-09T14:30:16Z", "mp");

jst.TagBrush.addMethod("on:", "anElement", "initialization", 
	"\telement := anElement",
	null, "2011-12-09T22:08:28Z", "mp");

jst.TagBrush._class.addMethod("on:", "anElement", "instance-creation", 
	"\t^ self basicNew on: anElement",
	null, "2011-12-10T23:08:00Z", "mp");

jst.TagBrush.addMethod("element", "", "accessing", 
	"\t^ element",
	null, "2011-12-10T20:40:53Z", "mp");

jst.TagBrush.addMethod("tag", "", "private", 
	"\tself subclassResponsibility",
	null, "2011-12-10T22:52:19Z", "mp");

jst.TagBrush.addMethod("initialize", "", "initialization", 
	"\telement := DOMElement tag: self tag",
	null, "2011-12-10T22:54:35Z", "mp", 1);

jst.TagBrush.addMethod("initialize", "", "initialization", 
	"\telement := HTMLElement tag: self tag",
	null, "2013-06-18T13:17:10Z", "mp");

jst.TagBrush.addMethod("attributeAt:put:", "name value", "attributes", 
	"\telement attributeAt: name put: value ",
	null, "2011-12-11T22:53:23Z", "mp");

jst.TagBrush.addMethod("class:", "aString", "attributes", 
	"\telement attributeAt: 'class' append: aString separator: ' '",
	null, "2011-12-12T15:47:52Z", "mp");

jst.TagBrush.addMethod("title:", "aString", "attributes", 
	"\telement attributeAt: 'title' put: aString",
	null, "2011-12-12T15:58:01Z", "mp");

jst.TagBrush.addMethod("style:", "aString", "attributes", 
	"\telement attributeAt: 'style' put: aString",
	null, "2012-04-13T11:26:33Z", "mp");

jst.TagBrush.addMethod("id:", "aString", "attributes", 
	"\telement attributeAt: 'id' put: aString",
	null, "2012-04-13T11:55:29Z", "mp");

jst.TagBrush.addMethod("on:do:", "eventType aBlock", "event handling", 
	"\telement on: eventType do: aBlock ",
	null, "2013-05-11T22:15:13Z", "mp");

//*** GenericTag ***

jst.GenericTag.addMethod("initializeWithTag:", "aString", "initialization", 
	"\telement := DOMElement tag: aString",
	null, "2011-12-09T15:26:22Z", "mp", 1);

jst.GenericTag.addMethod("initializeWithTag:", "aString", "initialization", 
	"\telement := HTMLElement tag: aString",
	null, "2013-06-18T13:17:29Z", "mp"); //jst-dom-canvas

jst.GenericTag._class.addMethod("tag:", "aString", "instance-creation", 
	"\t^ self basicNew initializeWithTag: aString",
	null, "2011-12-09T15:27:08Z", "mp");

// *** AnchorTag ***

jst.AnchorTag.addMethod("tag", "", "private", 
	"\t^ 'a'",
	null, "2011-12-11T19:39:49Z", "mp");

jst.AnchorTag.addMethod("with:", "aBlock", "public", 
	"\t((element hasAttribute: 'href') or: [element hasAttribute: 'name' ])" +
	"\n\t\tifFalse: [self href: 'javascript:void(0)']." +
	"\n\tsuper with: aBlock",
	null, "2011-12-11T20:11:56Z", "mp");

jst.AnchorTag.addMethod("href:", "aString", "attributes", 
	"\telement attributeAt: 'href' put: aString",
	null, "2011-12-11T20:12:36Z", "mp");

jst.AnchorTag.addMethod("name:", "aString", "attributes", 
	"\telement attributeAt: 'name' put: aString",
	null, "2011-12-11T20:15:43Z", "mp");

jst.AnchorTag.addMethod("target:", "aString", "attributes", 
	"\telement attributeAt: 'target' put: aString",
	null, "2011-12-11T21:07:31Z", "mp");

// *** ImageTag ***

jst.ImageTag.addMethod("tag", "", "private", 
	"\t^ 'img'",
	null, "2012-06-07T19:12:42Z", "mp");

jst.ImageTag.addMethod("src:", "aString", "attributes", 
	"\tself attributeAt: 'src' put: aString",
	null, "2012-06-29T11:26:52Z", "mp", 1);

jst.ImageTag.addMethod("src:", "anObject", "attributes", 
	"\tself attributeAt: 'src' put: anObject asString",
	null, "2014-02-11T13:21:37Z", "mp"); //jst-dom-canvas

jst.ImageTag.addMethod("width:", "aString", "attributes", 
	"\tself attributeAt: 'width' put: aString",
	null, "2012-06-29T11:26:57Z", "mp");

jst.ImageTag.addMethod("height:", "aString", "attributes", 
	"\tself attributeAt: 'height' put: aString",
	null, "2012-06-29T11:26:47Z", "mp");

jst.ImageTag.addMethod("alt:", "anObject", "attributes", 
	"\tself attributeAt: 'alt' put: anObject asString",
	null, "2014-02-26T16:51:29Z", "mp");

//*** IframeTag ***

jst.IframeTag.addMethod("tag", "", "accessing", 
	"\t^ 'iframe'",
	null, "2013-08-24T21:47:16Z", "mp");

//*** FormTag ***

jst.FormTag.addMethod("tag", "", "accessing", 
	"\t^ 'form'",
	null, "2013-08-24T22:12:16Z", "mp");

//*** FormInputTag ***

jst.FormInputTag.addMethod("tag", "", "accessing", 
	"\t^ 'input'",
	null, "2013-08-24T22:12:35Z", "mp");

jst.FormInputTag.addMethod("type:", "aString", "attributes", 
	"\tself attributeAt: 'type' put: aString",
	null, "2013-08-25T09:15:45Z", "mp");

//*** TableTag ***

jst.TableTag.addMethod("tag", "", "accessing", 
	"\t^ 'table'",
	null, "2012-06-29T11:38:12Z", "mp");

jst.TableTag.addMethod("cellpadding:", "anInteger", "attributes", 
	"\tself attributeAt: 'cellpadding' put: anInteger",
	null, "2012-06-29T11:45:29Z", "mp");

jst.TableTag.addMethod("cellspacing:", "anInteger", "attributes", 
	"\tself attributeAt: 'cellspacing' put: anInteger",
	null, "2012-06-29T11:45:40Z", "mp");

jst.TableTag.addMethod("border:", "anInteger", "attributes", 
	"\tself attributeAt: 'border' put: anInteger",
	null, "2013-05-10T11:38:53Z", "mp");

jst.TableTag.addMethod("width:", "aString", "attributes", 
	"\tself attributeAt: 'width' put: aString",
	null, "2014-04-30T08:50:11Z", "mp");

// *** TableCellTag ***

jst.TableCellTag.addMethod("align:", "aString", "attributes", 
	"\tself attributeAt: 'align' put: aString",
	null, "2012-06-29T11:26:42Z", "mp");

jst.TableCellTag.addMethod("colspan:", "anInteger", "attributes", 
	"\tself attributeAt: 'colspan' put: anInteger",
	null, "2012-06-29T11:26:36Z", "mp");

jst.TableCellTag.addMethod("rowspan:", "anInteger", "attributes", 
	"\tself attributeAt: 'rowspan' put: anInteger",
	null, "2012-06-29T11:27:31Z", "mp");

jst.TableCellTag.addMethod("verticalAlign:", "aString", "attributes", 
	"\tself attributeAt: 'valign' put: aString",
	null, "2012-06-29T11:28:00Z", "mp");

// *** TableDataTag ***

jst.TableDataTag.addMethod("tag", "", "accessing", 
	"\t^ 'td'",
	null, "2012-06-29T11:30:58Z", "mp");

// *** TableHeadingTag ***

jst.TableHeadingTag.addMethod("tag", "", "accessing", 
	"\t^ 'th'",
	null, "2012-06-29T11:30:13Z", "mp");

// *** ExtTplTag ***

jst.ExtTplTag.addMethod("tag", "", "accessing", 
	"\t^ 'tpl'",
	null, "2012-08-15T12:14:08Z", "mp");

jst.ExtTplTag.addMethod("if:", "aString", "attributes", 
	"\t\"The tpl tag and the if operator are used to provide conditional checks for deciding whether or not to render " +
	"\n\tspecific parts of the template. Notes:" +
	"\n\t- Double quotes must be encoded if used within the conditional" +
	"\n\t- There is no else operator — if needed, two opposite if statements should be used.\"" +
	"\n\tself attributeAt: 'if' put: aString",
	null, "2012-08-15T12:08:28Z", "mp");

jst.ExtTplTag.addMethod("for:", "aString", "attributes", 
	"\t\"The tpl tag and the for operator are used to process the provided data object:" +
	"\n\tIf the value specified in for is an array, it will auto-fill, repeating the template block inside the tpl tag for each item in the array." +
	"\n\tIf for='.' is specified, the data object provided is examined." +
	"\n\tWhile processing an array, the special variable {#} will provide the current array index + 1 (starts at 1, not 0).\"" +
	"\n\tself attributeAt: 'for' put: aString",
	null, "2012-08-15T12:38:51Z", "mp");

/*
jst.TagBrush.subclass("ExtTplTag", "", "IfMask", "", "DOM-Canvas");

jst.ExtTplTag.addMethod("if:", "aString", "attributes", 
	"\t\"The tpl tag and the if operator are used to provide conditional checks for deciding whether or not to render " +
	"\n\tspecific parts of the template. Notes:" +
	"\n\t- Double quotes must be encoded if used within the conditional" +
	"\n\t- There is no else operator — if needed, two opposite if statements should be used.\"" +
	"\n\tself attributeAt: 'if' put: (aString mask: IfMask)",
	null, "2012-09-24T10:19:18Z", "mp"); //jst-dom-canvas

jst.ExtTplTag._class.addMethod("initialize", "", "class initialization", 
	"\tIfMask := #($< '&lt;' $> '&gt;') asDictionary",
	null, "2012-09-24T10:18:44Z", "mp");

jst.initializeClass(jst.ExtTplTag);
 */

//*** CanvasTag ***

jst.CanvasTag.addMethod("tag", "", "private", 
	"\t^ 'canvas'",
	null, "2014-02-25T07:46:31Z", "mp");

jst.CanvasTag.addMethod("height:", "aString", "attributes", 
	"\tself attributeAt: 'height' put: aString",
	null, "2014-02-25T07:47:11Z", "mp");

jst.CanvasTag.addMethod("width:", "aString", "attributes", 
	"\tself attributeAt: 'width' put: aString",
	null, "2014-02-25T07:47:26Z", "mp");

//*** HtmlCanvas ***

jst.HtmlCanvas.addMethod("render:", "anObject", "public", 
	"\tanObject renderOn: self",
	null, "2011-12-08T15:49:07Z", "mp");

jst.HtmlCanvas.addMethod("nest:", "aBlock", "private", 
	"\tparentBrush := currentBrush." +
	"\n\tcurrentBrush := nil." +
	"\n\taBlock renderOn: self." +
	"\n\tparentBrush := parentBrush parent",
	null, "2011-12-09T13:19:01Z", "mp");

jst.HtmlCanvas.addMethod("brush:", "aBrush", "public", 
	"\tcurrentBrush := aBrush." +
	"\n\taBrush setParent: parentBrush canvas: self." +
	"\n\t^ aBrush",
	null, "2011-12-09T13:56:13Z", "mp");

jst.HtmlCanvas.addMethod("tag:", "aString", "public", 
	"\t\"Defines a generic tag with the name aString.\"" +
	"\n\t^ self brush: (GenericTag tag: aString)",
	null, "2011-12-09T15:29:02Z", "mp");

jst.HtmlCanvas.addMethod("on:", "anElement", "initialization", 
	"\tparentBrush := GenericTag on: anElement",
	null, "2011-12-12T15:13:16Z", "mp");

jst.HtmlCanvas.addMethod("empty", "", "public", 
	"\tparentBrush element empty",
	null, "2011-12-12T15:06:37Z", "mp");

jst.HtmlCanvas.addMethod("text:", "aString", "public", 
	"\tparentBrush element appendChild: (DOMText data: aString)",
	null, "2011-12-10T20:31:56Z", "mp");

jst.HtmlCanvas.addMethod("html:", "aString", "public", 
	"\tparentBrush element contents: aString",
	null, "2013-02-18T10:09:16Z", "mp");

jst.HtmlCanvas.addMethod("p", "", "tags", 
	"\t\"Defines a paragraph.\"" +
	"\n\t^ self tag: 'p'",
	null, "2011-12-11T19:21:37Z", "mp");

jst.HtmlCanvas.addMethod("p:", "aBlock", "tags", 
	"\tself p with: aBlock",
	null, "2011-12-11T19:22:22Z", "mp");

jst.HtmlCanvas.addMethod("br", "", "tags", 
	"\t^ self tag: 'br'",
	null, "2011-12-11T19:27:58Z", "mp");

jst.HtmlCanvas.addMethod("anchor", "", "tags", 
	"\t^ self brush: AnchorTag new",
	null, "2012-11-23T10:15:02Z", "mp");

jst.HtmlCanvas.addMethod("h1", "", "tags-heading", 
	"\t^ self tag: 'h1'",
	null, "2011-12-11T21:52:33Z", "mp");

jst.HtmlCanvas.addMethod("h1:", "aBlock", "tags-heading", 
	"\tself h1 with: aBlock",
	null, "2011-12-11T21:53:46Z", "mp");

jst.HtmlCanvas.addMethod("h2", "", "tags-heading", 
	"\t^ self tag: 'h2'",
	null, "2011-12-11T21:55:18Z", "mp");

jst.HtmlCanvas.addMethod("h3", "", "tags-heading", 
	"\t^ self tag: 'h3'",
	null, "2011-12-11T21:55:29Z", "mp");

jst.HtmlCanvas.addMethod("h4", "", "tags-heading", 
	"\t^ self tag: 'h4'",
	null, "2011-12-11T21:56:44Z", "mp");

jst.HtmlCanvas.addMethod("h5", "", "tags-heading", 
	"\t^ self tag: 'h5'",
	null, "2011-12-11T21:56:52Z", "mp");

jst.HtmlCanvas.addMethod("h6", "", "tags-heading", 
	"\t^ self tag: 'h6'",
	null, "2011-12-11T21:57:00Z", "mp");

jst.HtmlCanvas.addMethod("h2:", "aBlock", "tags-heading", 
	"\tself h2 with: aBlock",
	null, "2011-12-11T21:57:14Z", "mp");

jst.HtmlCanvas.addMethod("h3:", "aBlock", "tags-heading", 
	"\tself h3 with: aBlock",
	null, "2011-12-11T21:57:25Z", "mp");

jst.HtmlCanvas.addMethod("h4:", "aBlock", "tags-heading", 
	"\tself h4 with: aBlock",
	null, "2011-12-11T21:57:34Z", "mp");

jst.HtmlCanvas.addMethod("h5:", "aBlock", "tags-heading", 
	"\tself h5 with: aBlock",
	null, "2011-12-11T21:57:41Z", "mp");

jst.HtmlCanvas.addMethod("h6:", "aBlock", "tags-heading", 
	"\tself h6 with: aBlock",
	null, "2011-12-11T21:57:48Z", "mp");

jst.HtmlCanvas.addMethod("span", "", "tags", 
	"\t\"Defines a section in a document.\"" +
	"\n\t^ self tag: 'span'",
	null, "2011-12-12T16:06:12Z", "mp");

jst.HtmlCanvas.addMethod("span:", "aBlock", "tags", 
	"\tself span with: aBlock",
	null, "2011-12-12T16:06:27Z", "mp");

jst.HtmlCanvas.addMethod("div", "", "tags", 
	"\t\"Defines a section in a document.\"" +
	"\n\t^ self tag: 'div'",
	null, "2011-12-12T16:09:20Z", "mp");

jst.HtmlCanvas.addMethod("div:", "aBlock", "tags", 
	"\tself div with: aBlock",
	null, "2011-12-12T16:09:30Z", "mp");

jst.HtmlCanvas.addMethod("img", "", "tags", 
	"\t^ self brush: ImageTag new",
	null, "2012-06-07T19:04:57Z", "mp");

jst.HtmlCanvas.addMethod("table", "", "tags-tables", 
	"\t^ self brush: TableTag new",
	null, "2012-06-29T11:39:08Z", "mp");

jst.HtmlCanvas.addMethod("table:", "aBlock", "tags-tables", 
	"\tself table with: aBlock",
	null, "2012-06-29T11:39:21Z", "mp");

jst.HtmlCanvas.addMethod("tableRow", "", "tags-tables", 
	"\t^ self tag: 'tr'",
	null, "2012-06-29T11:22:50Z", "mp");

jst.HtmlCanvas.addMethod("tableRow:", "aBlock", "tags-tables", 
	"\tself tableRow with: aBlock",
	null, "2012-06-29T11:23:21Z", "mp");

jst.HtmlCanvas.addMethod("tableHeading", "", "tags-tables", 
	"\t^ self brush: TableHeadingTag new",
	null, "2012-06-29T11:36:11Z", "mp");

jst.HtmlCanvas.addMethod("tableHeading:", "aBlock", "tags-tables", 
	"\tself tableHeading with: aBlock",
	null, "2012-06-29T11:36:45Z", "mp");

jst.HtmlCanvas.addMethod("tableData", "", "tags-tables", 
	"\t^ self brush: TableDataTag new",
	null, "2012-06-29T11:37:03Z", "mp");

jst.HtmlCanvas.addMethod("tableData:", "aBlock", "tags-tables", 
	"\tself tableData with: aBlock",
	null, "2012-06-29T11:37:15Z", "mp");

jst.HtmlCanvas.addMethod("tableBody:", "aBlock", "tags-tables", 
	"\tself tableBody with: aBlock",
	null, "2012-11-21T16:04:54Z", "mp");

jst.HtmlCanvas.addMethod("tableBody", "", "tags-tables", 
	"\t^ self tag: 'tbody'",
	null, "2012-11-21T16:05:10Z", "mp");

jst.HtmlCanvas.addMethod("tableHead", "", "tags-tables", 
	"\t^ self tag: 'thead'",
	null, "2012-11-23T09:15:35Z", "mp");

jst.HtmlCanvas.addMethod("tableHead:", "aBlock", "tags-tables", 
	"\tself tableHead with: aBlock",
	null, "2012-11-23T09:15:58Z", "mp");

jst.HtmlCanvas.addMethod("bold", "", "tags", 
	"\t^ self tag: 'b'",
	null, "2012-08-15T11:13:16Z", "mp");

jst.HtmlCanvas.addMethod("bold:", "aBlock", "tags", 
	"\tself bold with: aBlock",
	null, "2012-08-15T11:13:58Z", "mp");

jst.HtmlCanvas.addMethod("italic", "", "tags", 
	"\t^ self tag: 'i'",
	null, "2014-01-16T22:38:55Z", "mp");

jst.HtmlCanvas.addMethod("italic:", "aBlock", "tags", 
	"\tself italic with: aBlock",
	null, "2014-01-16T22:39:07Z", "mp");

jst.HtmlCanvas.addMethod("strong:", "aBlock", "tags", 
	"\tself strong with: aBlock",
	null, "2012-08-15T11:15:25Z", "mp");

jst.HtmlCanvas.addMethod("strong", "", "tags", 
	"\t^ self tag: 'strong'",
	null, "2012-08-15T11:15:36Z", "mp");

jst.HtmlCanvas.addMethod("tpl", "", "tags", 
	"\t^ self brush: ExtTplTag new",
	null, "2012-08-15T12:04:46Z", "mp");

jst.HtmlCanvas.addMethod("tpl:", "aBlock", "tags", 
	"\tself tpl for: '.'; with: aBlock",
	null, "2012-08-15T12:39:03Z", "mp");

jst.HtmlCanvas.addMethod("space:", "anInteger", "convenience", 
	"\tanInteger timesRepeat: [self space]",
	null, "2012-08-15T11:09:59Z", "mp");

jst.HtmlCanvas.addMethod("space", "", "convenience", function (){
	//nefunguje
	window.document.createEntityReference("nbsp");
	return this;
},
	null, "2012-08-16T13:44:19Z", "mp");

jst.HtmlCanvas.addMethod("iframe", "", "tags", 
	"\t^ self brush: IframeTag new",
	null, "2013-08-24T21:50:40Z", "mp");

jst.HtmlCanvas.addMethod("form", "", "tags-form", 
	"\t^ self brush: FormTag new",
	null, "2013-08-24T22:19:36Z", "mp");

jst.HtmlCanvas.addMethod("form:", "aBlock", "tags-form", 
	"\tself form with: aBlock",
	null, "2013-08-24T22:02:16Z", "mp");

jst.HtmlCanvas.addMethod("hiddenInput", "", "tags-form", 
	"\t^ self brush: (FormInputTag new type: 'hidden')",
	null, "2013-08-25T09:49:06Z", "mp");

jst.HtmlCanvas.addMethod("canvas", "", "tags", 
	"\t^ self brush: CanvasTag new",
	null, "2014-02-25T07:48:42Z", "mp");

//*** Widget ***

jst.Widget.addMethod("renderContentOn:", "html", "rendering", 
	"",
	null, "2011-12-09T19:59:59Z", "mp");

jst.Widget.addMethod("appendToElement:", "anElement", "adding", 
	"\tself renderContentOn: (HtmlCanvas new on: anElement)",
	null, "2011-12-09T22:42:02Z", "mp");

jst.Widget._class.addMethod("on:", "anObject", "instance creation", 
	"\t\"id or DOM element\"" +
	"\n\t^ self new appendToElement: (anObject ifString: [Document current elementById: anObject])",
	null, "2012-11-23T09:59:33Z", "mp");
