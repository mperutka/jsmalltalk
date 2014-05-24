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
 */

// *** CLASSES ***

jst.currentJsFile = "jst-ext-data";

jst.ExtObjectWrapper.subclass("ExtField", "", "", "", "Ext-data");

jst.Object.subclass("ExtSortTypes", "", "", "", "Ext-data");
jst.JSObjectProxy.subclass("ExtFieldType", "", "", "", "Ext-data");

jst.ExtObject.subclass("ExtDataReader", "", "", "", "Ext-data");
jst.ExtDataReader.subclass("ExtJsonReader", "", "", "", "Ext-data");
jst.ExtDataReader.subclass("ExtXmlReader", "", "", "", "Ext-data");
jst.ExtJsonReader.subclass("ExtArrayReader", "", "", "", "Ext-data");

jst.ExtObservable.subclass("ExtStore", "", "", "", "Ext-data");
jst.ExtStore.subclass("ExtArrayStore", "", "", "", "Ext-data");
jst.ExtStore.subclass("ExtJsonStore", "urlType", "", "", "Ext-data");
jst.ExtStore.subclass("ExtXmlStore", "", "", "", "Ext-data");

jst.WrapperObject.subclass("ExtRecord", "data modified", "", "", "Ext-data");

jst.ExtDefaultListener.subclass("ExtStoreListener", "", "", "", "Ext-event");

jst.ExtObservable.subclass("ExtConnection", "", "", "", "Ext-data");
jst.ExtConnection.subclass("ExtAjax", "", "Current", "", "Ext");

// *** METHODS ***

// *** ExtField ***

jst.ExtField.addMethod("allowBlank:", "aBoolean", "accessing-config", 
	"\t\"Used for validating a record, defaults to true. An empty value here will cause ExtRecord>>isValid to evaluate to false\"" +
	"\n\tself configAt: #allowBlank put: aBoolean",
	null, "2012-03-07T22:03:21Z", "mp");

jst.ExtField.addMethod("allowBlank", "", "accessing", 
	"\t^ self at: #allowBlank ifAbsent: true",
	null, "2012-03-07T22:03:43Z", "mp");

jst.ExtField.addMethod("beSortAsc", "", "accessing-config", 
	"\t\"Initial direction to sort\"" +
	"\n\tself configAt: #sortDir put: #ASC",
	null, "2012-03-07T22:13:59Z", "mp");

jst.ExtField.addMethod("beSortDesc", "", "accessing-config", 
	"\t\"Initial direction to sort\"" +
	"\n\tself configAt: #sortDir put: #DESC",
	null, "2012-03-07T22:14:11Z", "mp");

jst.ExtField.addMethod("sortDir", "", "accessing", 
	"\t^ self configAt: #sortDir ifAbsent: #ASC",
	null, "2012-03-07T22:14:38Z", "mp");

jst.ExtField.addMethod("defaultValue:", "anObject", "accessing-config", 
	"\t\"The default value used when a Record is being created by a Reader " +
	"\n\twhen the item referenced by the mapping does not exist in the data object (i.e. undefined)\"" +
	"\n\tself configAt: #defaultValue put: anObject",
	null, "2012-03-08T07:16:12Z", "mp");

jst.ExtField.addMethod("defaultValue", "", "accessing", 
	"\t^ self at: #defaultValue ifAbsent: ''",
	null, "2012-03-08T07:16:45Z", "mp");

jst.ExtField.addMethod("name:", "aString", "accessing-config", 
	"\t\"The name by which the field is referenced within the Record. " +
	"\n\tThis is referenced by, for example, the dataIndex property in column definition objects passed to ExtColumnModel\"" +
	"\n\tself configAt: #name put: aString",
	null, "2012-03-08T07:48:51Z", "mp");

jst.ExtField.addMethod("name", "", "accessing", 
	"\t^ self at: #name",
	null, "2012-03-08T07:49:50Z", "mp");

jst.ExtField.addMethod("convert:", "aBlock", "accessing-config", 
	"\t\"A block which converts the value provided by the Reader into an object that will be stored in the Record. " +
	"\n\tIt is passed the following parameters:" +
	"\n\t\tv: anObject - the data value as read by the Reader, if undefined will use the configured defaultValue." +
	"\n\t\trec: anObject - the data object containing the row as read by the Reader. Depending on the Reader type, " +
	"\n\t\t\tthis could be an Array (ArrayReader), an object (JsonReader), or an XML element (XMLReader).\"" +
	"\n\tself configAt: #convert put: aBlock",
	null, "2012-03-08T14:43:28Z", "mp");

jst.ExtField.addMethod("convert", "", "accessing", 
	"\t^ self at: #convert",
	null, "2012-03-08T14:44:09Z", "mp");

jst.ExtField.addMethod("useNil:", "aBoolean", "accessing-config", 
	"\t\"(Optional) Use when converting received data into a Number type (either int or float). If the value cannot be parsed, " +
	"\n\tnil will be used if useNil is true, otherwise the value will be 0. Defaults to false\"" +
	"\n\tself configAt: #useNull put: aBoolean",
	null, "2012-03-08T14:51:22Z", "mp");

jst.ExtField.addMethod("useNil", "", "accessing", 
	"\t^ self at: #useNull ifAbsent: false",
	null, "2012-03-08T14:51:45Z", "mp");

jst.ExtField.addMethod("mapping:", "aStringOrNumber", "accessing-config", 
	"\t\"(Optional) A path expression for use by the ExtDataReader implementation that is creating the Record to extract " +
	"\n\tthe Field value from the data object. If the path expression is the same as the field name, the mapping may be omitted." +
	"\n\tThe form of the mapping expression depends on the Reader being used:" +
	"\n\t\tJsonReader - the mapping is a string containing the javascript expression to reference the data " +
	"\n\t\t\tfrom an element of the data item's root Array. Defaults to the field name." +
	"\n\t\tXmlReader - the mapping is an ExtDomQuery path to the data item relative to the DOM element " +
	"\n\t\t\tthat represents the record. Defaults to the field name." +
	"\n\t\tArrayReader - the mapping is a number indicating the Array index of the field's value. Defaults to " +
	"\n\t\t\tthe field specification's Array position." +
	"\n\tIf a more complex value extraction strategy is required, then configure the Field with a convert function.\"" +
	"\n\tself configAt: #mapping put: (aStringOrNumber ifNotString: [aStringOrNumber-1])",
	null, "2012-11-13T20:17:52Z", "mp");

jst.ExtField.addMethod("mapping", "", "accessing", 
	"\t^ self at: #mapping ifAbsent: [self name]",
	null, "2012-03-08T15:00:19Z", "mp");

jst.ExtField.addMethod("sortType:", "aBlock", "sorting-config", 
	"\t\"A block which converts a Field's value to a comparable value in order to ensure correct sort ordering. " +
	"\n\tPredefined blocks are provided in ExtSortTypes.\"" +
	"\n\tself configAt: #sortType put: aBlock",
	null, "2012-03-08T15:08:55Z", "mp");

jst.ExtField.addMethod("sortType", "", "accessing", 
	"\t^ self at: #sortType",
	null, "2012-03-08T15:09:16Z", "mp");

jst.ExtField.addMethod("type:", "anObject", "accessing-config", 
	"\t\"The data type for automatic conversion from received data to the stored value if #convert has not been specified. " +
	"\n\tThis may be specified as a string value. Possible values are:" +
	"\n\t\t#auto (Default, implies no conversion)" +
	"\n\t\t#string" +
	"\n\t\t#int" +
	"\n\t\t#float" +
	"\n\t\t#boolean" +
	"\n\t\t#date" +
	"\n\tThis may also be specified by referencing a member of the ExtTypes class. Developers may create " +
	"\n\ttheir own application-specific data types by defining new members of the ExtTypes class.\"" +
	"\n\tself configAt: #type put: anObject asJsObject",
	null, "2012-03-08T15:13:49Z", "mp");

jst.ExtField.addMethod("type", "", "accessing", 
	"\t^ self at: #type ifAbsent: #auto",
	null, "2012-03-08T15:14:15Z", "mp");

// *** ExtSortTypes ***

jst.ExtSortTypes._class.addMethod("asJsObject", "", "converting", 
	function (){
	return jst.JSObjectProxy.on_(Ext.data.SortTypes);
},
	null, "2012-03-08T15:28:59Z", "mp");

jst.ExtSortTypes._class.addMethod("asFloat", "", "converting", 
	"\t\"Float sorting\"" +
	"\n\t^ self asJsObject at: #asFloat",
	null, "2012-03-08T15:37:12Z", "mp");

jst.ExtSortTypes._class.addMethod("asInt", "", "converting", 
	"\t\"Integer sorting\"" +
	"\n\t^ self asJsObject at: #asInt",
	null, "2012-03-08T15:37:36Z", "mp");

jst.ExtSortTypes._class.addMethod("asText", "", "converting", 
	"\t\"Strips all HTML tags to sort on text only\"" +
	"\n\t^ self asJsObject at: #asText",
	null, "2012-03-08T15:37:55Z", "mp");

jst.ExtSortTypes._class.addMethod("asUCString", "", "converting", 
	"\t\"Case insensitive string\"" +
	"\n\t^ self asJsObject at: #asUCString",
	null, "2012-03-08T15:38:48Z", "mp");

jst.ExtSortTypes._class.addMethod("asUCText", "", "converting", 
	"\t\"Strips all HTML tags to sort on text only - Case insensitive\"" +
	"\n\t^ self asJsObject at: #asUCText",
	null, "2012-03-08T15:39:10Z", "mp");

jst.ExtSortTypes._class.addMethod("none", "", "converting", 
	"\t\"Default sort that does nothing\"" +
	"\n\t^ self asJsObject at: #none",
	null, "2012-03-08T15:39:37Z", "mp");

jst.ExtSortTypes._class.addMethod("asDate", "", "converting", 
	function (){
	//Date sorting
	return function(anObject) {
		if (!anObject)
			return 0;
		if (Ext.isDate(anObject))
			return anObject.getTime();
		return jst.DateAndTime.fromString_(String(anObject)).getTime();	
	};
},
	null, "2012-03-08T16:08:21Z", "mp");

// *** ExtFieldType ***

jst.ExtFieldType.addMethod("type:", "aString", "accessing", 
	"\t\"A textual data type name.\"" +
	"\n\tjsObject at: #type put: aString",
	null, "2012-03-08T21:20:20Z", "mp");

jst.ExtFieldType.addMethod("type", "", "accessing", 
	"\t\"A textual data type name.\"" +
	"\n\t^ jsObject at: #type",
	null, "2012-03-08T21:20:38Z", "mp");

jst.ExtFieldType.addMethod("sortType:", "aBlock", "accessing", 
	"\t\"A function to convert the stored data into comparable form, as defined by ExtSortTypes.\"" +
	"\n\tjsObject at: #sortType put: aBlock",
	null, "2012-03-08T21:22:26Z", "mp");

jst.ExtFieldType.addMethod("sortType", "", "accessing", 
	"\t^ jsObject at: #sortType",
	null, "2012-03-08T21:22:39Z", "mp");

jst.ExtFieldType.addMethod("convert:", "aBlock", "accessing", 
	"\t\"see ExtField>>convert:\"" +
	"\n\tjsObject at: #convert put: aBlock",
	null, "2012-03-08T21:24:18Z", "mp");

jst.ExtFieldType.addMethod("convert", "", "accessing", 
	"\t^ jsObject at: #convert",
	null, "2012-03-08T21:24:31Z", "mp");

// class side

jst.ExtFieldType._class.instanceVariableNames_("defaultTypes");

jst.ExtFieldType._class.addMethod("date", "", "instance creation", 
	"\t\"This data type means that the raw data is converted into a Date before it is placed into a Record. " +
	"\n\tThe date format is specified in the constructor of the ExtField to which this type is being applied.\"" +
	"\n\t^ self on: (defaultTypes at: #DATE)",
	null, "2012-03-08T20:34:22Z", "mp");

jst.ExtFieldType._class.addMethod("auto", "", "instance creation", 
	"\t\"This data type means that no conversion is applied to the raw data before it is placed into a Record.\"" +
	"\n\t^ self on: (defaultTypes at: #AUTO)",
	null, "2012-03-08T20:31:57Z", "mp");

jst.ExtFieldType._class.addMethod("boolean", "", "instance creation", 
	"\t\"This data type means that the raw data is converted into a boolean before it is placed into a Record. " +
	"\n\tThe string 'true' and the number 1 are converted to boolean true.\"" +
	"\n\t^ self on: (defaultTypes at: #BOOL)",
	null, "2012-03-08T20:33:36Z", "mp");

jst.ExtFieldType._class.addMethod("float", "", "instance creation", 
	"\t\"This data type means that the raw data is converted into a number before it is placed into a Record." +
	"\n\tThe method #number is equivalent.\"" +
	"\n\t^ self on: (defaultTypes at: #FLOAT)",
	null, "2012-03-08T20:35:59Z", "mp");

jst.ExtFieldType._class.addMethod("integer", "", "instance creation", 
	"\t\"This data type means that the raw data is converted into an integer before it is placed into a Record.\"" +
	"\n\t^ self on: (defaultTypes at: #INT)",
	null, "2012-03-08T20:36:29Z", "mp");

jst.ExtFieldType._class.addMethod("number", "", "instance creation", 
	"\t\"see #float\"" +
	"\n\t^ self on: (defaultTypes at: #NUMBER)",
	null, "2012-03-08T20:36:44Z", "mp");

jst.ExtFieldType._class.addMethod("string", "", "instance creation", 
	"\t\"This data type means that the raw data is converted into a String before it is placed into a Record.\"" +
	"\n\t^ self on: (defaultTypes at: #STRING)",
	null, "2012-03-08T20:37:04Z", "mp");

jst.ExtFieldType._class.addMethod("initialize", "", "class initialization", 
	"\t| conv |" +
	"\n\tdefaultTypes := JSObjectProxy on: 'Ext.data.Types' eval." +
	"\n\t\"replaces original Ext convert function\"" +
	"\n\tconv := self date convert." +
	"\n\tself date convert: [:v | v isString ifTrue: [DateAndTime fromString: v] ifFalse: [conv value: v]]",
	null, "2012-03-09T08:19:13Z", "mp");

jst.initializeClass(jst.ExtFieldType);

// *** ExtDataReader ***

/*
jst.ExtDataReader.addMethod("fields:", "aCollection", "accessing-config", 
	"\t\"A collection of ExtField definition objects which will be passed to ExtRecord>>create\"" +
	"\n\tself configAt: #fields put: aCollection asJsObject",
	null, "2012-03-09T15:40:44Z", "mp");
*/

jst.ExtDataReader.addMethod("fields:", "aCollection", "accessing-config", 
	"\t\"A collection of ExtField definition objects which will be passed to ExtRecord>>create\"" +
	"\n\tself configAt: #fields put: aCollection",
	null, "2012-09-01T21:37:29Z", "mp"); //jst-ext-data

jst.ExtDataReader.addMethod("messageProperty:", "aString", "accessing-config", 
	"\t\"Optional name of a property within a server-response that represents a user-feedback message.\"" +
	"\n\tself configAt: #messageProperty put: aString",
	null, "2012-03-09T20:14:42Z", "mp");

jst.ExtDataReader.addMethod("messageProperty", "", "accessing", 
	"\t^ self at: #messageProperty",
	null, "2012-03-09T20:15:15Z", "mp");

jst.ExtDataReader.addMethod("successProperty:", "aString", "accessing-config", 
	"\t\"Name of the property from which to retrieve the success attribute " +
	"\n\tor the ExtDomQuery path to the success attribute used by forms on ExtXmlReader.\"" +
	"\n\tself configAt: #successProperty put: aString",
	null, "2012-03-09T20:39:55Z", "mp");

jst.ExtDataReader.addMethod("successProperty", "", "accessing", 
	"\t^ self at: #successProperty",
	null, "2012-03-09T20:19:57Z", "mp");

jst.ExtDataReader.addMethod("totalProperty:", "aString", "accessing-config", 
	"\t\"Name of the property (or the ExtDomQuery path on ExtXmlReader) from which to retrieve " +
	"\n\tthe total number of records in the dataset. This is only needed if the whole dataset is not passed in one go, " +
	"\n\tbut is being paged from the remote server.\"" +
	"\n\tself configAt: #totalProperty put: aString",
	null, "2012-03-09T20:39:29Z", "mp");

jst.ExtDataReader.addMethod("totalProperty", "", "accessing", 
	"\t^ self at: #totalProperty",
	null, "2012-03-09T20:33:08Z", "mp");

jst.ExtDataReader.addMethod("meta", "", "accessing", 
	"\t\"It is possible to change a JsonReader's metadata at any time by including a metaData property in the JSON data object. " +
	"\n\tIf the JSON data object has a metaData property, a Store object using this Reader will reconfigure itself " +
	"\n\tto use the newly provided field definition and fire its metachange event. The metachange event handler " +
	"\n\tmay interrogate the metaData property to perform any configuration required." +
	"\n\tNote that reconfiguring a Store potentially invalidates objects which may refer to Fields or Records which no longer exist.\"" +
	"\n\t^ obj ifNil: [config] ifNotNil: [Dictionary on: obj meta]",
	null, "2012-03-09T21:26:43Z", "mp");

jst.ExtDataReader.addMethod("readRecords:", "anObject", "testing", 
	"\t\"Create a data block containing Ext.data.Records from a JSON object/ an Array/ a XML document.\"" +
	"\n\t^ JSObjectProxy on: (self asJsObject perform: #readRecords with: anObject)",
	null, "2012-03-09T22:21:06Z", "mp");

//*** ExtXmlReader ***

jst.ExtXmlReader.addMethod("record:", "aString", "accessing-config", 
	"\t\"The DomQuery path to the repeated element which contains record information.\"" +
	"\n\tself configAt: #record put: aString",
	null, "2013-03-19T19:33:36Z", "mp");

jst.ExtXmlReader.addMethod("idPath:", "aString", "accessing-config", 
	"\t\"The DomQuery path relative from the record element to the element that contains a record identifier value.\"" +
	"\n\tself configAt: #idPath put: aString",
	null, "2013-03-19T19:35:29Z", "mp");

jst.ExtXmlReader.addMethod("xmlData", "", "accessing", 
	"\t\"After any data loads/reads, the raw XML Document is available for further custom processing.\"" +
	"\n\t^ DOMNode on: (obj at: #xmlData)",
	null, "2013-03-19T22:01:29Z", "mp");

// *** ExtJsonReader ***

jst.ExtJsonReader.addMethod("successProperty", "", "accessing-config", 
	"\t^ self at: #successProperty ifAbsent: #success",
	null, "2012-03-09T20:26:23Z", "mp");

jst.ExtJsonReader.addMethod("totalProperty", "", "accessing-config", 
	"\t^ self at: #totalProperty ifAbsent: #total",
	null, "2012-03-09T20:27:05Z", "mp");

jst.ExtJsonReader.addMethod("idProperty:", "aString", "accessing-config", 
	"\t\"Name of the property within a row object that contains a record identifier value.\"" +
	"\n\tself configAt: #idProperty put: aString",
	null, "2012-03-09T20:46:47Z", "mp");

jst.ExtJsonReader.addMethod("idProperty", "", "accessing", 
	"\t^ self at: #idProperty ifAbsent: #id",
	null, "2012-03-09T20:47:13Z", "mp");

jst.ExtJsonReader.addMethod("root:", "aString", "accessing-config", 
	"\t\"Required. The name of the property which contains the Array of row objects. An exception will be thrown " +
	"\n\tif the root property is undefined. The data packet value for this property should be an empty array " +
	"\n\tto clear the data or show no data.\"" +
	"\n\tself configAt: #root put: aString",
	null, "2012-03-09T20:49:17Z", "mp");

jst.ExtJsonReader.addMethod("root", "", "accessing", 
	"\t^ self at: #root",
	null, "2012-03-09T20:49:56Z", "mp");

jst.ExtJsonReader.addMethod("jsonData", "", "accessing", 
	"\t\"After any data loads, the raw JSON data is available for further custom processing. If no data is loaded " +
	"\n\tor there is a load exception this property will be undefined.\"" +
	"\n\t^ obj at: #jsonData",
	null, "2012-03-09T20:55:32Z", "mp");

// *** ExtArrayReader ***

jst.ExtArrayReader.addMethod("idIndex:", "aNumber", "accessing-config", 
	"\t\"The subscript within row Array that provides an ID for the Record.\"" +
	"\n\tself configAt: #idIndex put: aNumber - 1",
	null, "2012-08-03T08:37:53Z", "mp");

jst.ExtArrayReader.addMethod("idIndex", "", "accessing", 
	"\t^ config at: #idIndex ifPresent: [:ix | ix + 1]",
	null, "2012-08-03T08:39:16Z", "mp");

// *** ExtStore ***

jst.ExtStore._class.addMethod("xtype", "", "accessing", 
	"\t^ #store",
	null, "2012-03-10T11:01:01Z", "mp");
/*
jst.ExtStore.addMethod("initialize", "", "initialization", 
	"\tconfig := Dictionary new",
	null, "2012-03-10T21:27:36Z", "mp");
*/

jst.ExtStore._class.addMethod("listenerClass", "", "accessing", 
	"\t^ ExtStoreListener",
	null, "2013-06-22T07:01:27Z", "mp");

jst.ExtStore.addMethod("reader:", "anExtDataReader", "accessing-config", 
	"\t\"The Reader object which processes the data object and returns an Array of ExtRecord objects " +
	"\n\twhich are cached keyed by their id property.\"" +
	"\n\tself configAt: #reader put: anExtDataReader",
	null, "2012-06-18T22:03:04Z", "mp");

jst.ExtStore.addMethod("reader", "", "accessing", 
	"\t^ self at: #reader",
	null, "2012-03-10T11:09:38Z", "mp");

jst.ExtStore.addMethod("autoDestroy:", "aBoolean", "accessing-config", 
	"\t\"true to destroy the store when the component the store is bound to is destroyed." +
	"\n\tNote: this should be set to true when using stores that are bound to only 1 component.\"" +
	"\n\tself configAt: #autoDestroy put: aBoolean",
	null, "2012-03-10T13:18:15Z", "mp");

jst.ExtStore.addMethod("autoDestroy", "", "accessing", 
	"\t^ self at: #autoDestroy default: false",
	null, "2012-03-10T13:20:01Z", "mp");

jst.ExtStore.addMethod("autoLoad", "", "accessing", 
	"\t^ self at: #autoLoad default: false",
	null, "2012-03-10T13:46:01Z", "mp");

jst.ExtStore.addMethod("autoLoad:", "booleanOrObject", "accessing-config", 
	"\t\"If data is not specified, and if autoLoad is true or an Object, this store's load method is automatically called after creation. " +
	"\n\tIf the value of autoLoad is an Object, this Object will be passed to the store's load method.\"" +
	"\n\tself configAt: #autoLoad put: booleanOrObject",
	null, "2012-03-10T17:08:56Z", "mp");

jst.ExtStore.addMethod("fields:", "aCollection", "reader-config", 
	"\tself configAt: #fields put: aCollection",
	null, "2012-06-18T22:02:28Z", "mp");
/*
jst.ExtStore.addMethod("fields", "", "reader config", 
	"\t\"A MixedCollection containing the defined Fields for the Records stored in this Store.\"" +
	"\n\t^ obj" +
	"\n\t\tifNil: [self at: #fields default: #()]" +
	"\n\t\tifNotNil: [ExtMixedCollection wrap: obj fields]",
	null, "2012-06-19T07:10:41Z", "mp");
*/
jst.ExtStore.addMethod("messageProperty:", "aString", "reader-config", 
	"\tself configAt: #messageProperty put: aString",
	null, "2012-03-10T20:43:01Z", "mp");

jst.ExtStore.addMethod("successProperty:", "aString", "reader-config", 
	"\tself configAt: #successProperty put: aString",
	null, "2012-03-10T20:45:59Z", "mp");

jst.ExtStore.addMethod("totalProperty:", "aString", "reader-config", 
	"\tself configAt: #totalProperty put: aString",
	null, "2012-03-10T20:46:23Z", "mp");

jst.ExtStore.addMethod("data:", "anArray", "accessing-config", 
	"\t\"An inline data object readable by the reader. Typically this option, or the url option will be specified.\"" +
	"\n\tself configAt: #data put: anArray",
	null, "2012-03-10T22:19:12Z", "mp");

jst.ExtStore.addMethod("data", "", "accessing", 
	"\t^ obj" +
	"\n\t\tifNil: [config at: 'data' ifAbsent: nil] " +
	"\n\t\tifNotNil: [obj at: 'data' ifPresent: [:d | " +
	"\n\t\t\tExtMixedCollection wrap: d]]",
	null, "2012-08-12T12:33:28Z", "mp");

jst.ExtStore.addMethod("dataDo:", "aBlock", "enumerating", 
	"\t| dict |" +
	"\n\tdict := Dictionary new." +
	"\n\tobj perform: 'each' with: [:d | " +
	"\n\t\tdict instVarNamed: #map put: d." +
	"\n\t\tdict instVarNamed: #map put: (dict at: #data)." +
	"\n\t\taBlock value: dict]",
	null, "2012-08-12T16:08:49Z", "mp");

jst.ExtStore.addMethod("url:", "anUrl", "accessing-config", 
	"\t\"If a proxy is not specified the url will be used to implicitly configure a HttpProxy if an url is specified. " +
	"\n\tTypically this option, or the data option will be specified.\"" +
	"\n\tself configAt: #url put: anUrl asString",
	null, "2012-06-18T22:03:56Z", "mp");

jst.ExtStore.addMethod("url", "", "accessing", 
	"\t^ self at: #url",
	null, "2012-03-10T22:59:52Z", "mp");

jst.ExtStore.addMethod("baseParams", "", "accessing-config", 
	"\t\"An object containing properties which are to be sent as parameters for every HTTP request.\"" +
	"\n\t^ config at: #baseParams ifAbsentPut: [" +
	"\n\t\tobj ifNil: [Dictionary new] ifNotNil: [Dictionary on: (obj at: #baseParams)]]",
	null, "2012-06-18T19:30:30Z", "mp");

/*
jst.ExtStore.addMethod("parameterAt:put:", "aString anObject", "accessing", 
	"\t\"Set the value for a property name in this store's baseParams\"" +
	"\n\tobj ifNotNil: [" +
	"\n\t\tobj perform: #setBaseParam with: aString with: anObject asJsObject]." +
	"\n\tself baseParams at: aString ifAbsentPut: anObject",
	null, "2012-06-18T19:37:10Z", "mp");
*/
jst.ExtStore.addMethod("parameterAt:put:", "aString anObject", "accessing", 
	"\t\"Set the value for a property name in this store's baseParams\"" +
	"\n\tobj ifNotNil: [" +
	"\n\t\tobj perform: #setBaseParam with: aString with: anObject asUrlParameter]." +
	"\n\tself baseParams at: aString ifAbsentPut: anObject asUrlParameter",
	null, "2013-04-04T21:54:14Z", "mp", 1);

jst.ExtStore.addMethod("parameterAt:put:", "aString anObject", "accessing", 
	"\t\"Set the value for a property name in this store's baseParams\"" +
	"\n\tobj ifNotNil: [" +
	"\n\t\tobj perform: #setBaseParam with: aString with: anObject]." +
	"\n\tself baseParams at: aString ifAbsentPut: anObject",
	null, "2013-07-04T13:35:39Z", "mp"); //jst-ext-data

jst.ExtStore.addMethod("loadData:", "anObject", "initialization", 
	"\t\"Loads data from a passed data block (replacing the existing cache) and fires the load event." +
	"\n\tA Reader which understands the format of the data must have been configured in the constructor.\"" +
	"\n\tself asJsObject perform: #loadData with: anObject",
	null, "2012-06-18T21:22:31Z", "mp");

jst.ExtStore.addMethod("load", "", "initialization", 
	"\t\"Loads the Record cache from the configured proxy using the configured reader." +
	"\n\tImportant: loading is asynchronous! This call will return before the new data has been loaded. " +
	"\n\tTo perform any post-processing where information from the load call is required, use a a 'load' event handler.\"" +
	"\n\tself asJsObject perform: #load",
	null, "2012-06-18T21:22:22Z", "mp");

jst.ExtStore.addMethod("reload", "", "initialization", 
	"\t\"Reloads the Record cache from the configured Proxy using the configured Reader " +
	"\n\tand the options from the last load operation performed.\"" +
	"\n\tself asJsObject perform: #reload",
	null, "2013-09-16T14:32:10Z", "mp");

jst.ExtStore.addMethod("restful:", "aBoolean", "accessing-config", 
	"\t\"Defaults to false. Set to true to have the Store and the set Proxy operate in a RESTful manner. " +
	"\n\tThe store will automatically generate GET, POST, PUT and DELETE requests to the server.\"" +
	"\n\tself configAt: #restful put: aBoolean",
	null, "2012-06-18T21:51:13Z", "mp");

jst.ExtStore.addMethod("restful", "", "accessing", 
	"\t^ self at: #restful default: false",
	null, "2012-06-18T21:51:36Z", "mp");

jst.ExtStore.addMethod("recordsFrom:to:", "index1 index2", "querying", 
	"\t\"Returns a range of Records between specified indices.\"" +
	"\n\t^ obj perform: #getRange with: index1 - 1 with: index2 - 1",
	null, "2012-07-03T13:00:48Z", "mp", 1);

jst.ExtStore.addMethod("recordsFrom:to:", "index1 index2", "querying", 
	"\t\"Returns a range of Records between specified indices.\"" +
	"\n\t^ (obj perform: #getRange with: index1 - 1 with: index2 - 1) collect: [:ea | ExtRecord wrap: ea]",
	null, "2013-07-01T14:35:06Z", "mp"); //jst-ext-data

jst.ExtStore.addMethod("addRecords:", "aCollection", "adding", 
	"\t\"Add Records to the Store and fires the add event.\"" +
	"\n\tobj perform: #add with: aCollection asCollection",
	null, "2012-07-03T14:14:43Z", "mp", 1);

jst.ExtStore.addMethod("addRecords:", "aCollection", "adding", 
	"\t\"Add Records to the Store and fires the add event.\"" +
	"\n\tobj perform: #add with: aCollection asCollection asJsObject",
	null, "2013-07-01T14:35:28Z", "mp"); //jst-ext-data

jst.ExtStore.addMethod("removeAllRecords", "", "removing", 
	"\t\"Remove all Records from the Store and fires the clear event.\"" +
	"\n\tobj perform: #removeAll",
	null, "2012-07-03T14:19:12Z", "mp");

jst.ExtStore.addMethod("removeAllSilently:", "aBoolean", "removing", 
	"\t\"Remove all Records from the Store and eventually fires the clear event.\"" +
	"\n\tobj perform: #removeAll with: aBoolean",
	null, "2013-11-15T21:03:12Z", "mp");

jst.ExtStore.addMethod("queryField:startsWith:caseSensitive:", "fieldName aString aBoolean", "querying", 
	"\t\"Query the records by a specified property.\"" +
	"\n\t^ ExtMixedCollection wrap: (obj perform: #query withArguments: {fieldName. aString. false. aBoolean}).",
	null, "2012-07-03T14:04:50Z", "mp");

jst.ExtStore.addMethod("queryField:startsWith:", "fieldName aString", "querying", 
	"\t^ self queryField: fieldName startsWith: aString caseSensitive: true",
	null, "2012-07-03T14:10:48Z", "mp");

jst.ExtStore.addMethod("defaultSortBy:asc:", "columnName aBoolean", "accessing", 
	"\t\"Sets the default sort column and order to be used by the next load operation.\"" +
	"\n\t| dir |" +
	"\n\tdir := aBoolean ifTrue: 'ASC' ifFalse: 'DESC'." +
	"\n\tobj " +
	"\n\t\tifNil: [self configAt: 'sortInfo' put: (Dictionary new " +
	"\n\t\t\tat: 'field' put: columnName; " +
	"\n\t\t\tat: 'direction' put: dir;" +
	"\n\t\t\tyourself)]" +
	"\n\t\tifNotNil: [obj perform: 'setDefaultSort' with: columnName with: dir]",
	null, "2012-08-12T18:35:08Z", "mp");

jst.ExtStore.addMethod("sortBy:asc:", "columnName aBoolean", "accessing", 
	"\t\"Sorts the store contents by a single field and direction.\"" +
	"\n\tobj perform: 'sort' with: columnName with: (aBoolean ifTrue: 'ASC' ifFalse: 'DESC')",
	null, "2013-01-11T16:00:12Z", "mp");

jst.ExtStore.addMethod("updateEvent", "", "events", 
	"\t\"Returned handler block or instance of ExtStoreListener is installed on initialization." +
	"\n\tFires when a Record has been updated.\"",
	null, "2012-08-20T19:50:07Z", "mp");

jst.ExtStore.addMethod("loadEvent", "", "events", 
	"\t\"Returned handler block or instance of ExtStoreListener is installed on initialization." +
	"\n\tFires after a new set of Records has been loaded.\"",
	null, "2013-06-21T14:14:07Z", "mp");

jst.ExtStore.addMethod("addEvent", "", "events", 
	"\t\"Returned handler block or instance of ExtStoreListener is installed on initialization." +
	"\n\tFires when Records have been added to the Store\"",
	null, "2013-06-21T20:53:11Z", "mp");

jst.ExtStore.addMethod("clearEvent", "", "events", 
	"\t\"Returned handler block or instance of ExtStoreListener is installed on initialization." +
	"\n\tFires when the data cache has been cleared.\"",
	null, "2013-06-21T21:30:56Z", "mp");

jst.ExtStore.addMethod("commitChanges", "", "changes", 
	"\t\"Commit all Records with outstanding changes. To handle updates for changes, subscribe to the Store's update event, " +
	"\n\tand perform updating when the third parameter is Ext.data.Record.COMMIT.\"" +
	"\n\tobj perform: 'commitChanges'",
	null, "2012-08-28T08:00:17Z", "mp");

jst.ExtStore.addMethod("rejectChanges", "", "changes", 
	"\t\"Reject outstanding changes on all modified records.\"" +
	"\n\tobj perform: 'rejectChanges'",
	null, "2012-08-28T08:01:05Z", "mp");

jst.ExtStore.addMethod("cacheSize", "", "accessing", 
	"\t\"Gets the number of cached records. If using paging, this may not be the total size of the dataset. " +
	"\n\tIf the data object used by the Reader contains the dataset size, then the #totalSize method returns the dataset size.\"" +
	"\n\t^ obj perform: #getCount",
	null, "2013-01-11T10:49:56Z", "mp");

jst.ExtStore.addMethod("totalSize", "", "accessing", 
	"\t\"Gets the total number of records in the dataset as returned by the server. If using paging, for this to be accurate, " +
	"\n\tthe data object used by the Reader must contain the dataset size. For remote data sources, the value for this property " +
	"\n\t(totalProperty for JsonReader, totalRecords for XmlReader) shall be returned by a query on the server.\"" +
	"\n\t^ obj perform: #getTotalCount",
	null, "2013-01-11T10:50:50Z", "mp");

jst.ExtStore.addMethod("modifiedRecords", "", "accessing", 
	"\t\"Gets all records modified since the last commit. Modified records are persisted across load operations " +
	"\n\t(e.g., during paging). Note: deleted records are not included. See also pruneModifiedRecords and Ext.data.RecordmarkDirty.\"" +
	"\n\t^ (obj perform: #getModifiedRecords) collect: [:ea | ExtRecord wrap: ea]",
	null, "2013-01-11T21:34:12Z", "mp");

jst.ExtStore.addMethod("detect:ifNone:", "aBlock exceptionBlock", "enumerating", 
	"\t| index |" +
	"\n\t\"Find the index of the first matching Record in this Store by a function. If the function returns true it is considered a match.\"" +
	"\n\tindex := obj perform: #findBy with: [:rec | aBlock value: (ExtRecord wrap: rec)]." +
	"\n\t^ index > -1 " +
	"\n\t\tifTrue: [self recordAt: index+1]" +
	"\n\t\tifFalse: exceptionBlock",
	null, "2013-01-25T15:36:12Z", "mp");

jst.ExtStore.addMethod("detect:", "aBlock", "enumerating", 
	"\t^ self detect: aBlock ifNone: [self error: 'Record is not in the store.']",
	null, "2013-01-25T14:14:47Z", "mp");

jst.ExtStore.addMethod("recordAt:", "anInteger", "accessing", 
	"\t\"Get the Record at the specified index.\"" +
	"\n\t^ ExtRecord wrap: (obj perform: #getAt with: anInteger-1)",
	null, "2013-01-25T15:35:38Z", "mp");

jst.ExtStore.addMethod("recordById:", "aString", "accessing", 
	"\t| rec |" +
	"\n\t\"Get the Record with the specified id.\"" +
	"\n\t^ nil = (rec := obj perform: #getById with: aString) ifFalse: [" +
	"\n\t\tExtRecord wrap: rec]",
	null, "2013-07-03T22:35:03Z", "mp");

jst.ExtStore.addMethod("filterBy:", "aBlock", "filtering", 
	"\t\"Filter by a block. The specified block will be called for each Record in this Store. " +
	"\n\tIf the block returns true the Record is included, otherwise it is filtered out." +
	"\n\tThe block will be passed the following parameters:" +
	"\n\t\trecord : Ext.data.Record" +
	"\n\t\t\tThe record to test for filtering. Access field values using Ext.data.Record.get." +
	"\n\t\tid : Object" +
	"\n\t\t\tThe ID of the Record passed.\"" +
	"\n\tobj perform: #filterBy with: [:rec :id | " +
	"\n\t\taBlock valueWithPossibleArgs: {ExtRecord wrap: rec. id}]",
	null, "2013-09-11T21:12:25Z", "mp"); //jst-ext-data

jst.ExtStore.addMethod("clearFilterSilently:", "aBoolean", "filtering", 
	"\t\"Revert to a view of the Record cache with no filtering applied." +
	"\n\tIf true the filter is cleared silently without firing the datachanged event.\"" +
	"\n\tobj perform: #clearFilter with: aBoolean",
	null, "2013-09-11T21:14:30Z", "mp"); //jst-ext-data

jst.ExtStore.addMethod("clearFilter", "", "filtering", 
	"\tself clearFilterSilently: false",
	null, "2013-09-11T21:14:57Z", "mp"); //jst-ext-data

// *** ExtArrayStore ***

jst.ExtArrayStore._class.addMethod("xtype", "", "accessing", 
	"\t^ #arraystore",
	null, "2012-03-10T11:07:56Z", "mp");

jst.ExtArrayStore.addMethod("reader", "", "accessing-config", 
	"\t^ ExtArrayReader wrap: super reader",
	null, "2012-03-10T11:14:08Z", "mp");

jst.ExtArrayStore.addMethod("idIndex:", "aNumber", "reader config", 
	"\tself configAt: #idIndex put: aNumber - 1",
	null, "2012-08-02T20:10:09Z", "mp");

// *** ExtJsonStore ***

jst.ExtJsonStore._class.addMethod("xtype", "", "accessing", 
	"\t^ #jsonstore",
	null, "2012-03-10T13:01:12Z", "mp");

jst.ExtJsonStore.addMethod("reader", "", "accessing", 
	"\t^ ExtJsonReader wrap: super reader",
	null, "2012-03-10T12:58:17Z", "mp");

jst.ExtJsonStore.addMethod("root:", "aString", "reader-config", 
	"\tself configAt: #root put: aString",
	null, "2012-03-10T17:07:54Z", "mp");

jst.ExtJsonStore.addMethod("idProperty:", "aString", "reader-config", 
	"\tself configAt: #idProperty put: aString",
	null, "2012-03-10T20:48:04Z", "mp");

jst.ExtJsonStore.addMethod("url:", "anObject", "accessing-config", 
	"\turlType := anObject isString " +
	"\n\t\tifFalse: [anObject class] " +
	"\n\t\tifTrue: [Url new]." +
	"\n\tsuper url: anObject",
	null, "2013-07-04T13:33:59Z", "mp", 1);

jst.ExtJsonStore.addMethod("url:", "anObject", "accessing-config", 
	"\turlType := anObject isString " +
	"\n\t\tifFalse: [anObject class] " +
	"\n\t\tifTrue: [Url]." +
	"\n\tsuper url: anObject",
	null, "2014-02-22T21:21:41Z", "mp"); //jst-ext-data

jst.ExtJsonStore.addMethod("parameterAt:put:", "aString anObject", "accessing", 
	"\tsuper parameterAt: aString put: (urlType encodeParameter: anObject)",
	null, "2013-07-04T13:35:10Z", "mp");

//*** ExtXmlStore ***

jst.ExtXmlStore._class.addMethod("xtype", "", "accessing", 
	"\t^ #xmlstore",
	null, "2012-03-10T13:12:02Z", "mp");

jst.ExtXmlStore.addMethod("reader", "", "accessing", 
	"\t^ ExtXmlReader wrap: super reader",
	null, "2012-03-10T13:11:30Z", "mp");

jst.ExtXmlStore.addMethod("record:", "aString", "accessing-config", 
	"\t\"The DomQuery path to the repeated element which contains record information.\"" +
	"\n\tself configAt: #record put: aString",
	null, "2013-03-19T20:29:47Z", "mp");

jst.ExtXmlStore.addMethod("idPath:", "aString", "accessing-config", 
	"\t\"The DomQuery path relative from the record element to the element that contains a record identifier value.\"" +
	"\n\tself configAt: #idPath put: aString",
	null, "2013-03-19T20:31:22Z", "mp");

//*** ExtRecord ***

/*
jst.ExtRecord.addMethod("wrap:", "jsObject", "accessing", 
	"\tsuper wrap: jsObject." +
	"\n\tdata := Dictionary on: (obj at: #data)." +
	"\n\tmodified := obj at: #modified ifPresent: [:m | Dictionary on: m]",
	null, "2013-01-11T21:21:38Z", "mp");

jst.ExtRecord.addMethod("data", "", "accessing", 
	"\t\"An object hash representing the data for this Record. Every field name in the Record definition" +
	"\n\tis represented by a property of that name in this object. Note that unless you specified a field" +
	"\n\twith name #id in the Record definition, this will not contain an id property.\"" +
	"\n\t^ data",
	null, "2013-01-11T21:28:28Z", "mp");

jst.ExtRecord.addMethod("modified", "", "accessing", 
	"\t\"This object contains a key and value storing the original values of all modified fields or is null if no fields have been modified.\"" +
	"\n\t^ modified",
	null, "2013-01-11T21:22:17Z", "mp");
*/

jst.ExtRecord.addMethod("data", "", "accessing", 
	"\t\"An object hash representing the data for this Record. Every field name in the Record definition" +
	"\n\tis represented by a property of that name in this object. Note that unless you specified a field" +
	"\n\twith name #id in the Record definition, this will not contain an id property.\"" +
	"\n\t^ data ifNil: [" +
	"\n\t\tdata := Dictionary on: (obj at: #data)]",
	null, "2013-01-25T21:32:21Z", "mp");

jst.ExtRecord.addMethod("json", "", "accessing", 
	"\t\"Only present if this Record was created by an ArrayReader or a JsonReader." +
	"\n\tThe Array or object which was the source of the data for this Record.\"" +
	"\n\t^ obj at: #json",
	null, "2013-05-10T07:29:16Z", "mp");

jst.ExtRecord.addMethod("modified", "", "accessing", 
	"\t\"This object contains a key and value storing the original values of all modified fields or is null if no fields have been modified.\"" +
	"\n\t^ modified ifNil: [" +
	"\n\t\tobj at: #modified ifPresent: [:m | " +
	"\n\t\t\tmodified := Dictionary on: m]]",
	null, "2013-01-25T22:17:02Z", "mp");

jst.ExtRecord.addMethod("isDirty", "", "testing", 
	"\t\"Readonly flag - true if this Record has been modified.\"" +
	"\n\t^ obj at: #dirty",
	null, "2013-01-11T21:30:33Z", "mp");

jst.ExtRecord.addMethod("store", "", "accessing", 
	"\t^ (obj at: 'store') jstWrapper",
	null, "2012-08-20T20:28:03Z", "mp");

jst.ExtRecord.addMethod("at:put:", "aSymbol anObject", "accessing", 
	"\t\"Set the named field to the specified value. Notes:" +
	"\n\t  - If the store has a writer and autoSave=true, each set() will execute an XHR to the server." +
	"\n\t  - Use #beginEdit to prevent the store's update event firing while using set()." +
	"\n\t  - Use #endEdit to have the store's update event fire.\"" +
	"\n\tobj perform: #set with: aSymbol with: anObject",
	null, "2013-01-25T13:59:28Z", "mp");

jst.ExtRecord.addMethod("id", "", "accessing", 
	"\t^ obj at: #id",
	null, "2013-01-25T14:11:16Z", "mp");

jst.ExtRecord.addMethod("commitSilently:", "aBoolean", "editing", 
	"\t\"Usually called by the ExtStore which owns the Record. Commits all changes " +
	"\n\tmade to the Record since either creation, or the last commit operation." +
	"\n\taBoolean: true to skip notification of the owning store of the change.\"" +
	"\n\tobj perform: #commit with: aBoolean",
	null, "2013-01-25T15:41:23Z", "mp");

jst.ExtRecord.addMethod("commit", "", "editing", 
	"\tself commitSilently: false",
	null, "2013-01-25T15:42:33Z", "mp");

//*** ExtStoreListener ***

jst.ExtStoreListener.addMethod("updateHandler", "", "handlers", 
	"\t\"Fires when a Record has been updated. An operation can be #edit, #reject or #commit\"" +
	"\n\t^ [:aStore :aRecord :operation | " +
	"\n\t\tself handlerBlock valueWithPossibleArgs: {" +
	"\n\t\t\taStore jstWrapper. " +
	"\n\t\t\tExtRecord wrap: aRecord. " +
	"\n\t\t\toperation}]",
	null, "2013-06-22T06:49:14Z", "mp");

jst.ExtStoreListener.addMethod("loadHandler", "", "handlers", 
	"\t\"records : Ext.data.Record[] - The Records that were loaded" +
	"\n\toptions : Object - The loading options that were specified (see load for details)\"" +
	"\n\t^ [:aStore :records :options | " +
	"\n\t\tself handlerBlock valueWithPossibleArgs: {" +
	"\n\t\t\taStore jstWrapper. " +
	"\n\t\t\tself convertRecords: records. " +
	"\n\t\t\tDictionary on: options}]",
	null, "2013-07-03T14:46:19Z", "mp");

jst.ExtStoreListener.addMethod("clearHandler", "", "handlers", 
	"\t\"records : Ext.data.Record[] - The Records that were cleared\"" +
	"\n\t^ [:aStore :records | " +
	"\n\t\tself handlerBlock valueWithPossibleArgs: {" +
	"\n\t\t\taStore jstWrapper. " +
	"\n\t\t\tself convertRecords: records}]",
	null, "2013-07-03T14:47:36Z", "mp");

jst.ExtStoreListener.addMethod("addHandler", "", "handlers", 
	"\t\"records : Ext.data.Record[] - The array of Records added" +
	"\n\tindex : Number - The index at which the record(s) were added\"" +
	"\n\t^ [:aStore :records :index | " +
	"\n\t\tself handlerBlock valueWithPossibleArgs: {" +
	"\n\t\t\taStore jstWrapper. " +
	"\n\t\t\tself convertRecords: records. " +
	"\n\t\t\tindex + 1}]",
	null, "2013-07-03T14:47:26Z", "mp");

jst.ExtStoreListener.addMethod("convertRecords:", "anArray", "private", 
	"\t^ self handlerBlock numArgs > 1 " +
	"\n\t\tifFalse: anArray" +
	"\n\t\tifTrue: [anArray collect: [:ea | ExtRecord wrap: ea]]",
	null, "2013-07-03T14:47:04Z", "mp");

//*** ExtAjax ***

jst.ExtAjax._class.addMethod("initialize", "", "class initialization", 
	"\tCurrent := self wrap: (ExtCore current asJsObject at: 'Ajax')",
	null, "2013-05-13T09:36:37Z", "mp");

jst.initializeClass(jst.ExtAjax);

jst.ExtAjax._class.addMethod("current", "", "accessing", 
	"\t^ Current",
	null, "2013-05-13T09:36:51Z", "mp");

jst.ExtAjax.addMethod("asJsObject", "", "converting", function (){
	return Ext.Ajax;
},
	null, "2013-05-13T09:30:29Z", "mp");

jst.ExtAjax.addMethod("disableCaching:", "aBoolean", "accessing", 
	"\t\"True to add a unique cache-buster param to GET requests.\"" +
	"\n\tobj at: #disableCaching put: aBoolean",
	null, "2013-05-13T12:31:55Z", "mp");

jst.ExtAjax.addMethod("disableCaching", "", "accessing", 
	"\t^ obj at: #disableCaching ifAbsent: true",
	null, "2013-05-13T12:33:05Z", "mp");
