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
 * Depends on jst-ext-core, jst-ext-data
 */

// *** CLASSES ***

jst.currentJsFile = "jst-ext-grid";

jst.ExtObservable.subclass("ExtColumn", "model", "", "", "Ext-grid");
jst.ExtObservable.subclass("ExtColumnModel", "", "", "", "Ext-grid");

jst.ExtColumn.subclass("ExtActionColumn", "", "", "", "Ext-grid");
jst.ExtColumn.subclass("ExtBooleanColumn", "", "", "", "Ext-grid");
jst.ExtColumn.subclass("ExtDateColumn", "", "", "", "Ext-grid");
jst.ExtColumn.subclass("ExtNumberColumn", "", "", "", "Ext-grid");
jst.ExtColumn.subclass("ExtTemplateColumn", "", "", "", "Ext-grid");

//needs ext-3.4.0/examples/ux/CheckColumn.js
jst.ExtColumn.subclass("ExtCheckColumn", "", "", "", "Ext-grid");

//needs ext-3.4.0/examples/ux/RowExpander.js
jst.ExtObservable.subclass("ExtRowExpander", "", "", "", "Ext-grid");

jst.ExtObservable.subclass("ExtAbstractSelectionModel", "", "", "", "Ext-grid");

jst.ExtAbstractSelectionModel.subclass("ExtCellSelectionModel", "", "", "", "Ext-grid");
jst.ExtAbstractSelectionModel.subclass("ExtRowSelectionModel", "", "", "", "Ext-grid");
jst.ExtRowSelectionModel.subclass("ExtCheckboxSelectionModel", "", "", "", "Ext-grid");

jst.ExtObservable.subclass("ExtGridView", "", "", "", "Ext-grid");

jst.ExtPanel.subclass("ExtGridPanel", "origTitle filterHint", "", "", "Ext-grid");
jst.ExtGridPanel.subclass("ExtEditorGridPanel", "", "", "", "Ext-grid");
jst.ExtEditorGridPanel.subclass("ExtPropertyGrid", "", "", "", "Ext-grid");

jst.ExtListener.subclass("ExtColumnListener", "", "", "", "Ext-event");

// *** METHODS ***

//Extensions

jst.ExtFormat._class.addMethod("cellRenderer:", "aBlock", "*ext-grid", 
	"\t\"The render function is called with the following parameters:\"" +
	"\n\t^ [:value :metadata :record :rowIndex :colIndex :store | aBlock valueWithPossibleArgs: {" +
	"\n\t\tvalue. \"Object / The data value for the cell.\"" +
	"\n\t\tDictionary on: metadata. \"An object in which you may set the following attributes:" +
	"\n\t\t\t#css : A CSS class name to add to the cell's TD element." +
	"\n\t\t\t#attr : An HTML attribute definition string to apply to the data container element within the table cell " +
	"\n\t\t\t\t(e.g. 'style=\"\"color:red;\"\"').\"" +
	"\n\t\tExtRecord wrap: record. \"The ExtRecord from which the data was extracted.\"" +
	"\n\t\trowIndex + 1. \"Number / Row index\"" +
	"\n\t\tcolIndex + 1. \"Number / Column index\"" +
	"\n\t\tstore jsWrapper \"The ExtStore object from which the Record was extracted.\"}]",
	null, "2013-11-22T08:53:50Z", "mp");

//*** ExtColumn ***

/*
jst.ExtColumn._class.addMethod("defaultListenerClass", "", "accessing", 
	"\t^ ExtColumnListener",
	null, "2012-08-18T19:24:30Z", "mp");

jst.ExtColumn._class.addMethod("listenerClasses", "", "accessing", 
	"\t^ { ExtColumnListener }",
	null, "2012-09-25T17:41:21Z", "mp");
*/

jst.ExtColumn._class.addMethod("listenerClass", "", "accessing", 
	"\t^ ExtColumnListener",
	null, "2013-06-22T19:45:44Z", "mp");

jst.ExtColumn.addMethod("at:get:default:", "optionName fceName anObject", "private", 
	"\t^ obj" +
	"\n\t\tifNil: [config at: optionName ifAbsent: anObject]" +
	"\n\t\tifNotNil: [model asJsObject perform: fceName with: (model indexOf: self) - 1]",
	null, "2012-03-13T12:31:04Z", "mp");

jst.ExtColumn.addMethod("at:by:put:", "optionName fceName anObject", "private", 
	"\tobj" +
	"\n\t\tifNil: [config at: optionName put: anObject]" +
	"\n\t\tifNotNil: [model asJsObject perform: fceName with: (model indexOf: self) - 1 with: anObject asJsObject]",
	null, "2012-03-13T08:45:47Z", "mp");

jst.ExtColumn.addMethod("align:", "aString", "accessing-config", 
	"\t\"Optional. Set the CSS text-align property of the column.\"" +
	"\n\tself configAt: #align put: aString",
	null, "2012-03-11T22:27:54Z", "mp");

jst.ExtColumn.addMethod("align", "", "accessing-config", 
	"\t^ self at: #align",
	null, "2012-03-11T22:29:19Z", "mp");

jst.ExtColumn.addMethod("css:", "aString", "accessing-config", 
	"\t\"Optional. An inline style definition string which is applied to all table cells in the column (excluding headers).\"" +
	"\n\tself configAt: #css put: aString",
	null, "2012-03-12T16:25:57Z", "mp");

jst.ExtColumn.addMethod("css", "", "accessing-config", 
	"\t^ self at: #css",
	null, "2012-03-12T16:26:09Z", "mp");

jst.ExtColumn.addMethod("id:", "aString", "accessing-config", 
	"\t\"Optional. A name which identifies this column (defaults to the column's initial ordinal position.) " +
	"\n\tThe id is used to create a CSS class name which is applied to all table cells (including headers) in that column " +
	"\n\t(in this context the id does not need to be unique). The class name takes the form of" +
	"\n\t\tx-grid3-td-id" +
	"\n\tHeader cells will also receive this class name, but will also have the class" +
	"\n\t\tx-grid3-hd" +
	"\n\tSo, to target header cells, use CSS selectors such as:" +
	"\n\t\t.x-grid3-hd-row .x-grid3-td-id" +
	"\n\tThe Ext.grid.GridPanel.autoExpandColumn grid config option references the column via this unique identifier.\"" +
	"\n\tself configAt: #id put: aString",
	null, "2012-03-12T20:02:11Z", "mp");

jst.ExtColumn.addMethod("id", "", "accessing-config", 
	"\t^ self at: #id",
	null, "2012-03-12T20:02:35Z", "mp");

jst.ExtColumn.addMethod("isResizable:", "aBoolean", "accessing-config", 
	"\t\"Optional. false to disable column resizing.\"" +
	"\n\tself configAt: #resizable put: aBoolean",
	null, "2012-03-12T20:12:58Z", "mp");

jst.ExtColumn.addMethod("isResizable", "", "accessing-config", 
	"\t^ self at: #resizable get: #isResizable default: true",
	null, "2012-03-21T15:01:44Z", "mp");

jst.ExtColumn.addMethod("isSortable:", "aBoolean", "accessing-config", 
	"\t\"Optional. true if sorting is to be allowed on this column. Defaults to the value of the ExtColumnModel>>defaultSortable " +
	"\n\tproperty. Whether local/remote sorting is used is specified in ExtStore>>remoteSort.\"" +
	"\n\tself configAt: #sortable put: aBoolean",
	null, "2012-03-12T20:21:46Z", "mp");

jst.ExtColumn.addMethod("isSortable", "", "accessing-config", 
	"\t^ self at: #sortable get: #isSortable default: false",
	null, "2012-03-21T15:00:57Z", "mp");

jst.ExtColumn.addMethod("isHideable:", "aBoolean", "accessing-config", 
	"\t\"Optional. Specify as false to prevent the user from hiding this column. To disallow column hiding globally " +
	"\n\tfor all columns in the grid, use ExtGridPanel>>enableColumnHide instead.\"" +
	"\n\tself configAt: #hideable put: aBoolean",
	null, "2012-03-12T20:23:39Z", "mp");

jst.ExtColumn.addMethod("isHideable", "", "accessing-config", 
	"\t^ self at: #hideable default: true",
	null, "2012-03-12T20:24:00Z", "mp");

jst.ExtColumn.addMethod("editor:", "anObject", "accessing", 
	"\t\"Optional. The ExtEditor/ExtFormField to use when editing values in this column if editing is supported by the grid. " +
	"\n\tSee editable also.\"" +
	"\n\tself at: #editor by: #setEditor put: anObject",
	null, "2012-03-12T20:39:59Z", "mp");

jst.ExtColumn.addMethod("editor", "", "accessing", 
	"\t^ (self at: #editor) jstWrapper",
	null, "2012-03-13T15:12:34Z", "mp");

jst.ExtColumn.addMethod("header", "", "accessing", 
	"\t^ self at: #header",
	null, "2012-03-12T19:57:13Z", "mp");

jst.ExtColumn.addMethod("header:", "aString", "accessing", 
	"\t\"Optional. The header text to be used as innerHTML (html tags are accepted) to display in the Grid view. " +
	"\n\tNote: to have a clickable header with no text displayed use '&#160;'.\"" +
	"\n\tself at: #header by: #setColumnHeader put: aString",
	null, "2012-03-13T08:47:17Z", "mp");

jst.ExtColumn.addMethod("dataIndex", "", "accessing", 
	"\t^ self at: #dataIndex",
	null, "2012-03-12T16:27:25Z", "mp");

jst.ExtColumn.addMethod("dataIndex:", "aString", "accessing", 
	"\t\"Required. The name of the field in the grid's ExtStore's ExtRecord definition from which to draw the column's value.\"" +
	"\n\tself at: #dataIndex by: #setDataIndex put: aString",
	null, "2012-03-13T08:48:57Z", "mp");

jst.ExtColumn.addMethod("tooltip:", "aString", "accessing", 
	"\t\"Optional. A text string to use as the column header's tooltip. If Quicktips are enabled, this value will be used as the text " +
	"\n\tof the quick tip, otherwise it will be set as the header's HTML title attribute.\"" +
	"\n\tself at: #tooltip by: #setColumnTooltip put: aString",
	null, "2012-03-13T08:49:25Z", "mp");

jst.ExtColumn.addMethod("tooltip", "", "accessing", 
	"\t^ self at: #tooltip default: ''",
	null, "2012-03-12T20:30:29Z", "mp");

jst.ExtColumn.addMethod("width", "", "accessing", 
	"\t^ self at: #width",
	null, "2012-03-12T20:34:30Z", "mp");

jst.ExtColumn.addMethod("width:", "aNumber", "accessing", 
	"\t\"Optional. The initial width in pixels of the column. The width of each column can also be affected " +
	"\n\tif any of the following are configured:" +
	"\n\t\tExtGridPanel>>autoExpandColumn" +
	"\n\t\tExtGridView>>forceFit" +
	"\n\tBy specifying forceFit: true, non-fixed width columns will be re-proportioned (based on the relative initial widths) " +
	"\n\tto fill the width of the grid so that no horizontal scrollbar is shown." +
	"\n\t\tExtGridView>>autoFill" +
	"\n\t\tExtGridPanel>>minColumnWidth" +
	"\n\tNote: when the width of each column is determined, a space on the right side is reserved for the vertical scrollbar. " +
	"\n\tThe ExtGridView>>scrollOffset can be modified to reduce or eliminate the reserved offset.\"" +
	"\n\tself at: #width by: #setColumnWidth put: aNumber",
	null, "2012-03-13T08:49:57Z", "mp");

jst.ExtColumn.addMethod("setWidth:suppressEvent:", "aNumber aBoolean", "accessing", 
	"\t\"True to suppress firing the model's widthchange event\"" +
	"\n\tmodel perform: #setColumnWidth with: (model indexOf: self) - 1 with: aNumber with: aBoolean",
	null, "2012-03-13T08:52:27Z", "mp");

jst.ExtColumn.addMethod("isEditable", "", "accessing", 
	"\t^ self at: #editable get: #isCellEditable default: true",
	null, "2012-03-21T15:05:34Z", "mp");

jst.ExtColumn.addMethod("isEditable:", "aBoolean", "accessing", 
	"\t\"Optional. Defaults to true, enabling the configured editor. Set to false to initially disable editing on this column. " +
	"\n\tThe initial configuration can be dynamically altered\"" +
	"\n\tself at: #editable by: #setEditable put: aBoolean",
	null, "2012-03-13T08:54:35Z", "mp");

jst.ExtColumn.addMethod("isHidden:", "aBoolean", "accessing", 
	"\t\"Optional. true to initially hide this column. A hidden column may be shown via the header row menu. " +
	"\n\tIf a column is never to be shown, simply do not include this column in the Column Model at all.\"" +
	"\n\tself at: #hidden by: #setHidden put: aBoolean",
	null, "2012-03-13T08:58:26Z", "mp");

jst.ExtColumn.addMethod("isHidden", "", "accessing", 
	"\t^ self at: #hidden default: false",
	null, "2012-03-13T08:58:46Z", "mp");

jst.ExtColumn.addMethod("model:", "anExtColumnModel", "accessing", 
	"\tmodel := anExtColumnModel",
	null, "2012-03-13T09:48:46Z", "mp");

jst.ExtColumn.addMethod("model", "", "accessing", 
	"\t^ model",
	null, "2012-03-13T09:53:41Z", "mp");

jst.ExtColumn.addMethod("isFixed:", "aBoolean", "accessing-config", 
	"\t\"Optional. true if the column width cannot be changed.\"" +
	"\n\tself configAt: #fixed put: aBoolean",
	null, "2012-03-13T10:36:17Z", "mp");

jst.ExtColumn.addMethod("isFixed", "", "accessing-config", 
	"\t^ self at: #fixed get: #isFixed default: false",
	null, "2012-03-21T15:01:57Z", "mp");

jst.ExtColumn.addMethod("isMenuDisabled:", "aBoolean", "accessing-config", 
	"\t\"Optional. true to disable the column menu.\"" +
	"\n\tself configAt: #menuDisabled put: aBoolean",
	null, "2012-03-13T10:39:45Z", "mp");

jst.ExtColumn.addMethod("isMenuDisabled", "", "accessing-config", 
	"\t^ self at: #menuDisabled get: #isMenuDisabled default: false",
	null, "2012-03-21T15:06:30Z", "mp");

jst.ExtColumn.addMethod("renderer:", "anObject", "accessing", 
	"\t\"Optional. A renderer is an 'interceptor' method which can be used transform data (value, appearance, etc.) " +
	"\n\tbefore it is rendered). This may be specified in either of three ways:" +
	"\n\t\t- A renderer function used to return HTML markup for a cell given the cell's data value." +
	"\n\t\t- A string which references a property name of the ExtFormat class which provides a renderer function." +
	"\n\tIf not specified, the default renderer uses the raw data value." +
	"\n\tThe function to use to process the cell's raw data to return HTML markup for the grid view. " +
	"\n\tThe render function is called with the following parameters:" +
	"\n\t\t#value : Object / The data value for the cell." +
	"\n\t\t#metadata : Object / An object in which you may set the following attributes:" +
	"\n\t\t\t#css : String / A CSS class name to add to the cell's TD element." +
	"\n\t\t\t#attr : String / An HTML attribute definition string to apply to the data container element within the table cell " +
	"\n\t\t\t\t(e.g. 'style=\"\"color:red;\"\"')." +
	"\n\t\t#record : Ext.data.record / The Ext.data.Record from which the data was extracted." +
	"\n\t\t#rowIndex : Number / Row index" +
	"\n\t\t#colIndex : Number / Column index" +
	"\n\t\t#store : Ext.data.Store / The Ext.data.Store object from which the Record was extracted.\"" +
	"\n\tself at: #renderer by: #setRenderer put: anObject",
	null, "2012-03-13T12:19:52Z", "mp", 1);

jst.ExtColumn.addMethod("renderer:", "aBlockOrString", "accessing", 
	"\t\"Optional. A renderer is an 'interceptor' method which can be used transform data (value, appearance, etc.) " +
	"\n\tbefore it is rendered). This may be specified in either of two ways:" +
	"\n\t\t- A renderer function used to return HTML markup for a cell given the cell's data value." +
	"\n\t\t- A string which references a property name of the ExtFormat class which provides a renderer function." +
	"\n\tIf not specified, the default renderer uses the raw data value.\"" +
	"\n\tself at: #renderer by: #setRenderer put: (aBlockOrString ifNotString: [ExtFormat cellRenderer: aBlockOrString])",
	null, "2013-11-22T08:51:56Z", "mp"); //jst-ext-grid

jst.ExtColumn.addMethod("renderer", "", "accessing", 
	"\t^ self at: #renderer get: #getRenderer default: ['Ext.grid.ColumnModel.defaultRenderer' eval]",
	null, "2012-03-13T12:53:34Z", "mp", 1);

jst.ExtColumn.addMethod("renderer", "", "accessing", 
	"\t^ self at: #renderer get: #getRenderer default: ExtColumnModel defaultRenderer",
	null, "2013-11-22T13:19:34Z", "mp"); //jst-ext-grid

jst.ExtColumn.addMethod("printOn:", "aStream", "printing", 
	"\taStream " +
	"\n\t\tnextPutAll: self className;" +
	"\n\t\tnextPutAll: ': '." +
	"\n\tself dataIndex printOn: aStream",
	null, "2012-03-13T14:50:12Z", "mp");

/*
jst.ExtColumn.addMethod("columnclickEvent", "", "events", 
	"\t\"Fires when this Column is clicked." +
	"\n\tReturned handler block or instance of ExtColumnListener is installed on initialization\"",
	null, "2012-08-18T20:18:16Z", "mp");
*/

jst.ExtColumn.addMethod("clickEvent", "", "events", 
	"\t\"Fires when this Column is clicked." +
	"\n\tReturned handler block or instance of ExtColumnListener is installed on initialization\"",
	null, "2012-08-19T21:15:02Z", "mp");

// *** ExtBooleanColumn ***

jst.ExtBooleanColumn.addMethod("falseText:", "aString", "accessing-config", 
	"\t\"The string returned by the renderer when the column value is falsy (but not undefined)\"" +
	"\n\tself configAt: #falseText put: aString",
	null, "2012-03-13T17:25:35Z", "mp");

jst.ExtBooleanColumn.addMethod("falseText", "", "accessing-config", 
	"\t^ self at: #falseText default: 'false'",
	null, "2012-03-13T17:27:01Z", "mp");

jst.ExtBooleanColumn.addMethod("trueText:", "aString", "accessing-config", 
	"\t\"The string returned by the renderer when the column value is not falsy.\"" +
	"\n\tself configAt: #trueText put: aString",
	null, "2012-03-13T17:26:26Z", "mp");

jst.ExtBooleanColumn.addMethod("trueText", "", "accessing-config", 
	"\t^ self at: #trueText default: 'true'",
	null, "2012-03-13T17:27:54Z", "mp");

jst.ExtBooleanColumn.addMethod("undefinedText:", "aString", "accessing-config", 
	"\t\"The string returned by the renderer when the column value is undefined.\"" +
	"\n\tself configAt: #undefinedText put: aString",
	null, "2012-03-13T17:29:08Z", "mp");

jst.ExtBooleanColumn.addMethod("undefinedText", "", "accessing-config", 
	"\t^ self at: #undefinedText default: '&#160;'",
	null, "2012-03-13T17:29:35Z", "mp");

// *** ExtNumberColumn ***

jst.ExtNumberColumn.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tSmalltalk userLanguage = #cs ifTrue: [" +
	"\n\t\tself format: '0,00/i']",
	null, "2012-03-13T21:29:58Z", "mp");

jst.ExtNumberColumn.addMethod("format:", "aString", "accessing-config", 
	"\t\"A formatting string as used by ExtFormat>>number to format a numeric value for this column.\"" +
	"\n\tself configAt: #format put: aString",
	null, "2012-03-13T21:02:54Z", "mp");

jst.ExtNumberColumn.addMethod("format", "", "accessing-config", 
	"\t^ self at: #format default: '0,000.00'",
	null, "2012-03-13T21:04:35Z", "mp");

// *** ExtDateColumn ***

jst.ExtDateColumn.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tSmalltalk userLanguage = #cs ifTrue: [" +
	"\n\t\tself format: 'd.m.Y']",
	null, "2012-03-13T21:31:13Z", "mp");

jst.ExtDateColumn.addMethod("format:", "aString", "accessing-config", 
	"\t\"A formatting string as used by Date.format to format a Date for this Column.\"" +
	"\n\tself configAt: #format put: aString",
	null, "2012-03-13T21:41:51Z", "mp");

jst.ExtDateColumn.addMethod("format", "", "accessing-config", 
	"\t^ self at: #format default: 'm/d/Y'",
	null, "2012-03-13T21:42:21Z", "mp");

// *** ExtColumnModel ***

jst.ExtColumnModel._class.addMethod("defaultRenderer", "", "accessing", 
	"\t\"Returns default rendering (formatting) function defined for a column.\"" +
	"\n\t^ self asJsObject at: #defaultRenderer",
	null, "2013-11-22T13:18:27Z", "mp");

jst.ExtColumnModel.addMethod("columns:", "aCollection", "accessing", 
	"\t\"A collection of ExtColumn object instances. After setting on the configured model you have to call #reconfigure\"" +
	"\n\taCollection do: [:c |" +
	"\n\t\tc model: self]." +
	"\n\tconfig at: #columns put: aCollection",
	null, "2012-03-13T14:37:22Z", "mp");

jst.ExtColumnModel.addMethod("columns", "", "accessing", 
	"\t^ config at: #columns ifAbsent: #()",
	null, "2012-03-13T14:38:04Z", "mp");

jst.ExtColumnModel.addMethod("indexOf:", "anExtColumn", "accessing", 
	"\tself columns withIndexDo: [:col :index | " +
	"\n\t\tcol dataIndex = anExtColumn dataIndex ifTrue: [" +
	"\n\t\t\t^ index]]." +
	"\n\tself columns errorNotFound: anExtColumn",
	null, "2012-03-13T14:38:26Z", "mp");

jst.ExtColumnModel.addMethod("defaults:", "anExtColumn", "accessing", 
	"\t\"Configuration options of anExtColumn will be applied  to all columns. " +
	"\n\tConfiguration options specified with individual column will supersede these defaults.\"" +
	"\n\tself configAt: #defaults put: anExtColumn",
	null, "2012-03-13T10:08:59Z", "mp");

jst.ExtColumnModel.addMethod("defaults", "", "accessing", 
	"\t^ config at: #defaults ifPresent: [:d | d jstWrapper]",
	null, "2012-03-13T10:11:03Z", "mp");

jst.ExtColumnModel.addMethod("defaults:", "anExtColumn", "accessing", 
	"\t\"Configuration options of anExtColumn will be applied  to all columns. " +
	"\n\tConfiguration options specified with individual column will supersede these defaults." +
	"\n\t After setting on the configured model you have to call #reconfigure\"" +
	"\n\t(anExtColumn isKindOf: ExtColumn) ifFalse: [" +
	"\n\t\tself error: 'An instance of ExtColumn was expected.' translated]." +
	"\n\tself configAt: #defaults put: anExtColumn",
	null, "2012-03-21T15:12:18Z", "mp");

jst.ExtColumnModel.addMethod("reconfigure", "", "public", 
	"\t\"Reconfigures this column model according to the passed #columns and/or #defaults objects. " +
	"\n\tCauses the configchange event to be fired. A GridPanel using this ColumnModel will listen for this event " +
	"\n\tand refresh its UI automatically.\"" +
	"\n\tobj perform: #setConfig with: config asJsObject",
	null, "2012-03-13T11:59:19Z", "mp");

jst.ExtColumnModel.addMethod("moveColumnFrom:to:", "oldIndex newIndex", "public", 
	"\t\"Moves a column from one position to another.\"" +
	"\n\tobj perform: #moveColumn with: oldIndex-1 with: newIndex-1." +
	"\n\tconfig at: #columns put: (obj config collect: [:c | c jstWrapper])",
	null, "2012-03-13T14:39:18Z", "mp");

// *** ExtAbstractSelectionModel ***

jst.ExtAbstractSelectionModel.addMethod("grid", "", "accessing", 
	"\t\"The GridPanel for which this SelectionModel is handling selection. Read-only.\"" +
	"\n\t^ self at: #grid",
	null, "2012-03-13T22:01:58Z", "mp");

jst.ExtAbstractSelectionModel.addMethod("isLocked", "", "testing", 
	"\t\"Returns true if the selections are locked.\"" +
	"\n\t^ self at: #locked get: #isLocked default: false",
	null, "2012-03-13T22:05:14Z", "mp");

jst.ExtAbstractSelectionModel.addMethod("lock", "", "public", 
	"\t\"Locks the selections.\"" +
	"\n\tobj lock",
	null, "2012-03-13T22:05:53Z", "mp");

jst.ExtAbstractSelectionModel.addMethod("unlock", "", "public", 
	"\t\"Unlocks the selections.\"" +
	"\n\tobj unlock",
	null, "2012-03-13T22:06:25Z", "mp");

//*** ExtRowSelectionModel ***

jst.ExtRowSelectionModel.addMethod("singleSelect:", "aBoolean", "accessing", 
	"\t\"true to allow selection of only one row at a time (defaults to false allowing multiple selections)\"" +
	"\n\tself at: #singleSelect put: aBoolean",
	null, "2013-09-11T20:32:29Z", "mp");

jst.ExtRowSelectionModel.addMethod("selectRecords:keepExisting:", "aCollection aBoolean", "processing", 
	"\t\"Select records, true to keep existing selections\"" +
	"\n\tobj perform: #selectRecords with: aCollection with: aBoolean",
	null, "2013-09-11T20:52:53Z", "mp");

jst.ExtRowSelectionModel.addMethod("selectRecords:", "aCollection", "processing", 
	"\tself selectRecords: aCollection keepExisting: false",
	null, "2013-09-11T20:43:10Z", "mp");

jst.ExtRowSelectionModel.addMethod("selectAll", "", "processing", 
	"\t\"Selects all rows if the selection model is not locked.\"" +
	"\n\tobj perform: #selectAll",
	null, "2013-09-11T21:34:25Z", "mp");

jst.ExtRowSelectionModel.addMethod("clearSelectionsFast:", "aBoolean", "processing", 
	"\t\"Clears all selections if the selection model is not locked, " +
	"\n\ttrue to bypass the conditional checks and events described in deselectRow.\"" +
	"\n\tobj perform: #clearSelections with: aBoolean",
	null, "2013-09-11T21:38:58Z", "mp");

jst.ExtRowSelectionModel.addMethod("clearSelections", "", "processing", 
	"\tself clearSelectionsFast: true",
	null, "2013-09-11T21:39:23Z", "mp");

// *** ExtGridView ***

jst.ExtGridView.addMethod("autoFill:", "aBoolean", "accessing-config", 
	"\t\"Specify true to have the column widths re-proportioned when the grid is initially rendered. " +
	"\n\tThe initially configured width of each column will be adjusted to fit the grid width and prevent horizontal scrolling. " +
	"\n\tIf columns are later resized (manually or programmatically), the other columns in the grid will not be resized " +
	"\n\tto fit the grid width. See forceFit also.\"" +
	"\n\tself configAt: #autoFill put: aBoolean",
	null, "2012-03-20T20:02:08Z", "mp");

jst.ExtGridView.addMethod("autoFill", "", "accessing-config", 
	"\t^ self at: #autoFill default: false",
	null, "2012-03-20T20:02:32Z", "mp");

jst.ExtGridView.addMethod("refreshData", "", "updating", 
	"\t\"Refreshs the grid UI (without the headers)\"" +
	"\n\tobj perform: #refresh",
	null, "2012-08-12T16:28:02Z", "mp");

jst.ExtGridView.addMethod("refresh", "", "updating", 
	"\t\"Refreshs the grid UI (the headers too)\"" +
	"\n\tobj perform: #refresh with: true",
	null, "2012-08-12T16:28:39Z", "mp");

jst.ExtGridView.addMethod("columnsText:", "aString", "accessing-config", 
	"\t\"The text displayed in the 'Columns' menu item\"" +
	"\n\tself configAt: #columnsText put: aString",
	null, "2014-05-14T07:51:55Z", "mp");

jst.ExtGridView.addMethod("emptyText:", "aString", "accessing-config", 
	"\t\"Default text (html tags are accepted) to display in the grid body when no rows are available (defaults to '').\"" +
	"\n\tself configAt: #emptyText put: aString",
	null, "2014-05-14T07:57:12Z", "mp");

jst.ExtGridView.addMethod("deferEmptyText:", "aBoolean", "accessing-config", 
	"\t\"True to defer emptyText being applied until the store's first load (defaults to true).\"" +
	"\n\tself configAt: #deferEmptyText put: aBoolean",
	null, "2014-05-14T09:55:37Z", "mp");

jst.ExtGridView.addMethod("sortAscText:", "aString", "accessing-config", 
	"\t\"The text displayed in the 'Sort Ascending' menu item.\"" +
	"\n\tself configAt: #sortAscText put: aString",
	null, "2014-05-14T07:58:13Z", "mp");

jst.ExtGridView.addMethod("sortDescText:", "aString", "accessing-config", 
	"\t\"The text displayed in the 'Sort Descending' menu item.\"" +
	"\n\tself configAt: #sortDescText put: aString",
	null, "2014-05-14T07:58:28Z", "mp");

// *** ExtGridPanel ***

jst.ExtGridPanel._class.addMethod("xtype", "", "accessing", 
	"\t^ #grid",
	null, "2012-03-20T15:54:39Z", "mp");

jst.ExtGridPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\t\"default models\"" +
	"\n\tconfig at: #colModel put: ExtColumnModel new.\t" +
	"\n\tconfig at: #selModel put: ExtRowSelectionModel new.",
	null, "2013-12-10T13:03:14Z", "mp");

jst.ExtGridPanel.addMethod("createJsObject", "", "private", 
	"\tself installListenersOn: self selectionModel asJsObject jstWrapper prefix: #sm." +
	"\n\tself selectionModel installListeners." +
	"\n\tsuper createJsObject",
	null, "2013-09-11T20:07:08Z", "mp", 1);

jst.ExtGridPanel.addMethod("createJsObject", "", "private", 
	"\tsuper createJsObject." +
	"\n\t\"column model\"" +
	"\n\tself columnModel wrap: (obj perform: #getColumnModel)." +
	"\n\tself installListenersOn: self columnModel prefix: #cm." +
	"\n\tself columnModel installListeners." +
	"\n\t\"selection model\"" +
	"\n\tself selectionModel wrap: (obj perform: #getSelectionModel)." +
	"\n\tself installListenersOn: self selectionModel prefix: #sm." +
	"\n\tself selectionModel installListeners.",
	null, "2013-12-10T13:47:23Z", "mp"); //jst-ext-grid

jst.ExtGridPanel.addMethod("columnModel:", "anExtColumnModel", "accessing", 
	"\t\"A model to use when rendering the grid (required). After setting on a configured grid you have to call #reconfigure\"" +
	"\n\tconfig at: #colModel put: anExtColumnModel",
	null, "2012-03-13T15:17:37Z", "mp");

jst.ExtGridPanel.addMethod("columnModel", "", "accessing", 
	"\t^ (self at: #colModel by: #getColumnModel) jstWrapper",
	null, "2012-03-13T15:18:19Z", "mp", 1);

jst.ExtGridPanel.addMethod("columnModel", "", "accessing", 
	"\t^ config at: #colModel",
	null, "2013-12-10T13:07:53Z", "mp"); //jst-ext-grid

jst.ExtGridPanel.addMethod("selectionModel", "", "accessing", 
	"\t^ obj " +
	"\n\t\tifNil: [config at: #selModel ifAbsentPut: [ExtRowSelectionModel new]]" +
	"\n\t\tifNotNil: [(obj perform: #getSelectionModel) jstWrapper]",
	null, "2013-09-11T19:47:21Z", "mp", 1);

jst.ExtGridPanel.addMethod("selectionModel", "", "accessing", 
	"\t^ config at: #selModel",
	null, "2013-12-10T13:07:40Z", "mp"); //jst-ext-grid

jst.ExtGridPanel.addMethod("selectionModel:", "selModel", "accessing", 
	"\t\"Any subclass of ExtAbstractSelectionModel that will provide the selection model for the grid.\"" +
	"\n\tconfig at: #selModel put: selModel",
	null, "2013-12-10T14:07:59Z", "mp");

jst.ExtGridPanel.addMethod("columns:", "aCollection", "accessing-config", 
	"\t\"A collection of columns to auto create a ExtColumnModel. The ColumnModel may be explicitly created " +
	"\n\tvia the #columnModel configuration property.\"" +
	"\n\tself configAt: 'columns' put: aCollection",
	null, "2012-08-03T21:49:58Z", "mp", 1);

jst.ExtGridPanel.addMethod("columns:", "aCollection", "accessing-config", 
	"\tself columnModel columns: aCollection",
	null, "2013-12-10T13:26:20Z", "mp"); //jst-ext-grid

jst.ExtGridPanel.addMethod("columns", "", "accessing-config", 
	"\t^ self at: 'columns' default: (self columnModel ifNotNilDo: [:m | m columns])",
	null, "2012-08-03T21:51:46Z", "mp");

jst.ExtGridPanel.addMethod("columnLines:", "aBoolean", "accessing-config", 
	"\t\"true to add css for column separation lines.\"" +
	"\n\tself configAt: #columnLines put: aBoolean",
	null, "2013-05-17T09:28:56Z", "mp");

jst.ExtGridPanel.addMethod("columnLines", "", "accessing-config", 
	"\t^ self at: #columnLines default: false",
	null, "2013-05-17T09:29:19Z", "mp");

jst.ExtGridPanel.addMethod("store:", "anExtStore", "accessing", 
	"\t\"A store the grid should use as its data source (required). After setting on a configured grid you have to call #reconfigure\"" +
	"\n\tconfig at: #store put: anExtStore",
	null, "2012-03-13T15:21:49Z", "mp");

jst.ExtGridPanel.addMethod("store", "", "accessing", 
	"\t^ (self at: #store get: #getStore) jstWrapper",
	null, "2012-03-21T14:49:53Z", "mp");

jst.ExtGridPanel.addMethod("view:", "anExtGridView", "accessing", 
	"\t\"The ExtGridView used by the grid. This can be set before a call to #render\"" +
	"\n\tself configAt: #view put: anExtGridView",
	null, "2012-03-20T20:05:34Z", "mp");

jst.ExtGridPanel.addMethod("view", "", "accessing", 
	"\t^ ExtGridView wrap: (self at: #view get: #getView)",
	null, "2012-08-12T16:31:01Z", "mp");

jst.ExtGridPanel.addMethod("viewConfig:", "anObject", "accessing-config", 
	"\t\"A config object that will be applied to the grid's UI view. Any of the config options available for ExtGridView" +
	"\n\tcan be specified here. This option is ignored if view is specified.\"" +
	"\n\tself configAt: #viewConfig put: anObject asDictionary",
	null, "2014-05-14T07:42:09Z", "mp");

jst.ExtGridPanel.addMethod("viewConfig", "", "accessing-config", 
	"\t^ obj " +
	"\n\t\tifNil: [config at: #viewConfig ifAbsentPut: [Dictionary new]]" +
	"\n\t\tifNotNil: [obj at: #viewConfig]",
	null, "2014-05-14T09:36:18Z", "mp");

jst.ExtGridPanel.addMethod("reconfigure", "", "public", 
	"\t\"Reconfigures the grid to use a different Store and Column Model and fires the 'reconfigure' event. " +
	"\n\tThe View will be bound to the new objects and refreshed. Be aware that upon reconfiguring a GridPanel, " +
	"\n\tcertain existing settings may become invalidated. For example the configured autoExpandColumn may no longer exist " +
	"\n\tin the new ColumnModel. Also, an existing PagingToolbar will still be bound to the old Store, and will need rebinding. " +
	"\n\tAny plugins might also need reconfiguring with the new data.\"" +
	"\n\tobj perform: #reconfigure " +
	"\n\t\twith: (config at: #store) asJsObject " +
	"\n\t\twith: (config at: #colModel) asJsObject",
	null, "2012-03-13T15:26:12Z", "mp");

jst.ExtGridPanel.addMethod("loadMask:", "anObject", "accessing-config", 
	"\t\"An ExtLoadMask config or true to mask the grid while loading. Defaults to false.\"" +
	"\n\tself configAt: 'loadMask' put: anObject",
	null, "2012-09-01T20:45:41Z", "mp");

jst.ExtGridPanel.addMethod("loadData:", "anObject", "public", 
	"\t\"See ExtStore>>loadData:\"" +
	"\n\tself store loadData: anObject",
	null, "2013-06-10T09:42:18Z", "mp");

jst.ExtGridPanel.addMethod("on:do:", "eventName aBlock", "event handling", 
	"\t(self class canUnderstand: #sm, eventName, 'Event') " +
	"\n\t\tifTrue: [self selectionModel on: eventName do: aBlock]" +
	"\n\t\tifFalse: [super on: eventName do: aBlock]",
	null, "2013-09-11T20:06:53Z", "mp", 1);

jst.ExtGridPanel.addMethod("on:do:", "eventName aBlock", "event handling", 
	"\t(self class canUnderstand: #sm, eventName, 'Event') " +
	"\n\t\tifTrue: [self selectionModel on: eventName do: aBlock] " +
	"\n\t\tifFalse: [(self class canUnderstand: #cm, eventName, 'Event') " +
	"\n\t\t\tifTrue: [self columnModel on: eventName do: aBlock] " +
	"\n\t\t\tifFalse: [super on: eventName do: aBlock]" +
	"\n\t\t]",
	null, "2013-12-10T13:45:06Z", "mp"); //jst-ext-grid

jst.ExtGridPanel.addMethod("keypressFilter:", "aBlock", "helpers", 
	"\t| bezFiltru |" +
	"\n\torigTitle := self title." +
	"\n\tbezFiltru := ' <span class=\"jst-filter-desc\">(lze filtrovat stiskem klávesy)</span>'." +
	"\n\tself title: origTitle, bezFiltru." +
	"\n\tself on: #keypress do: [:ev :elm |" +
	"\n\t\tev keyChar = '*' ifTrue: [" +
	"\n\t\t\tself store clearFilter." +
	"\n\t\t\tself title: origTitle, bezFiltru." +
	"\n\t\t] ifFalse: [self title: (" +
	"\n\t\t\t'{1} <span class=\"jst-filter-desc\">({2}, zrušte stiskem ''<span class=\"jst-filter-char\">*</span>'')</span>' format: {" +
	"\n\t\t\t\torigTitle. " +
	"\n\t\t\t\t(aBlock valueWithPossibleArgs: {ev. self. elm}) ifNotString: [" +
	"\n\t\t\t\t\t'filtrováno podle ''<span class=\"jst-filter-char\">', ev keyChar, '</span>''']})" +
	"\n\t\t]" +
	"\n\t]",
	null, "2013-09-12T15:33:50Z", "mp", 1);

jst.ExtGridPanel.addMethod("keypressFilter:", "aBlock", "helpers", 
	"\torigTitle := self title." +
	"\n\tfilterHint := ' <span class=\"jst-filter-desc\">(lze filtrovat stiskem klávesy)</span>'." +
	"\n\tself title: origTitle, filterHint." +
	"\n\tself on: #keypress do: [:ev :elm |" +
	"\n\t\tev keyChar = '*' ifTrue: [" +
	"\n\t\t\tself clearKeypressFilter" +
	"\n\t\t] ifFalse: [self title: (" +
	"\n\t\t\t'{1} <span class=\"jst-filter-desc\">({2}, zrušte stiskem ''<span class=\"jst-filter-char\">*</span>'')</span>' format: {" +
	"\n\t\t\t\torigTitle. " +
	"\n\t\t\t\t(aBlock valueWithPossibleArgs: {ev. self. elm}) ifNotString: [" +
	"\n\t\t\t\t\t'filtrováno podle ''<span class=\"jst-filter-char\">', ev keyChar, '</span>''']})" +
	"\n\t\t]" +
	"\n\t]",
	null, "2013-11-12T10:16:00Z", "mp"); //jst-ext-grid

jst.ExtGridPanel.addMethod("clearKeypressFilter", "", "helpers", 
	"\tself store clearFilter." +
	"\n\tself title: origTitle, filterHint",
	null, "2013-11-12T09:59:14Z", "mp"); //jst-ext-grid

// *** ExtEditorGridPanel ***

jst.ExtEditorGridPanel._class.addMethod("xtype", "", "accessing", 
	"\t^ #editorgrid",
	null, "2012-07-04T13:57:31Z", "mp");

// *** ExtPropertyGrid ***

jst.ExtPropertyGrid._class.addMethod("xtype", "", "accessing", 
	"\t^ #propertygrid",
	null, "2012-07-04T13:57:48Z", "mp");

jst.ExtPropertyGrid.addMethod("source:", "aDictionary", "accessing", 
	"\t\"Sets the source data object containing the property data. The data object can contain one or more name/value pairs " +
	"\n\trepresenting all of the properties of an object to display in the grid, and this data will automatically be loaded " +
	"\n\tinto the grid's store. The values should be supplied in the proper data type if needed, otherwise string type will be assumed. " +
	"\n\tIf the grid already contains data, this method will replace any existing data. \"" +
	"\n\tself at: 'source' by: 'setSource' put: aDictionary",
	null, "2012-07-04T14:06:18Z", "mp");

jst.ExtPropertyGrid.addMethod("source", "", "accessing", 
	"\t^ self at: 'source'",
	null, "2012-07-04T14:06:59Z", "mp");

//*** ExtColumnListener ***

jst.ExtColumnListener.addMethod("handler", "", "accessing", 
	"\t^ [:column :grid :rowIndex |" +
	"\n\t\tself handlerBlock valueWithPossibleArgs: {" +
	"\n\t\t\tcolumn jstWrapper. " +
	"\n\t\t\tgrid jstWrapper. \"owning GridPanel\"" +
	"\n\t\t\trowIndex + 1." +
	"\n\t\t\tExtEventObject current}]",
	null, "2012-08-18T18:50:45Z", "mp");

/*
jst.ExtColumnListener._class.addMethod("classNamePrefix", "", "accessing", 
	"\t^ 'extcolumn'",
	null, "2012-08-18T18:45:06Z", "mp");

jst.ExtColumnListener._class.addMethod("events", "", "accessing", 
	"\t^ #(click dblclick mousedown contextmenu)",
	null, "2012-08-19T21:18:04Z", "mp");
*/

// *** ExtRowExpander ***

jst.ExtRowExpander.addMethod("tpl:", "anObject", "accessing-config", 
	"\t\"An ExtTemplate, ExtXTemplate or an string to form an ExtTemplate.\"" +
	"\n\tself configAt: #tpl put: anObject",
	null, "2013-05-01T21:21:42Z", "mp");

jst.ExtRowExpander.addMethod("expandOnEnter:", "aBoolean", "accessing-config", 
	"\t\"true to toggle selected row(s) between expanded/collapsed when the enter key is pressed\"" +
	"\n\tself configAt: #expandOnEnter put: aBoolean",
	null, "2013-05-01T20:56:07Z", "mp");

jst.ExtRowExpander.addMethod("expandOnEnter", "", "accessing-config", 
	"\t^ self at: #expandOnEnter default: true",
	null, "2013-05-01T20:57:13Z", "mp");

jst.ExtRowExpander.addMethod("expandOnDblClick:", "aBoolean", "accessing-config", 
	"\t\"true to toggle a row between expanded/collapsed when double clicked\"" +
	"\n\tself configAt: #expandOnDblClick put: aBoolean",
	null, "2013-05-01T20:58:42Z", "mp");

jst.ExtRowExpander.addMethod("expandOnDblClick", "", "accessing-config", 
	"\t^ self at: #expandOnDblClick default: true",
	null, "2013-05-01T20:58:59Z", "mp");

jst.ExtRowExpander._class.addMethod("xtype", "", "accessing", 
	"\t^ #rowexpander",
	null, "2013-05-01T20:54:42Z", "mp");

jst.ExtRowExpander.addMethod("model:", "selModel", "accessing", 
	"\t\"see ExtColumnModel>>columns:\"",
	null, "2013-12-10T14:31:46Z", "mp");
