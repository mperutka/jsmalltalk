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
 * WebServices
 * Depends on jst-core, jst-core-proxy, jst-parser, jst-kernel, jst-dom
 */

jst.currentJsFile = "jst-ws";

// *** CLASSES ***

jst.WrapperObject.subclass("SOAPClient", "params", "Types", "", "WS");

// *** METHODS ***

// *** SOAPClient ***

jst.SOAPClient._class.addMethod("initialize", "", "class initialization", function (){
	this.classVarNamed_put_("Types", jst.Dictionary._new());
	if (window.SOAPClient) {
		var self = this;
		window.SOAPClient._getObjectConverter = function(type){
			return self.perform_with_("objectConverterOn_", type);};
	};
	return this;
},
	null, "2013-03-17T14:56:06Z", "mp");

jst.initializeClass(jst.SOAPClient);

jst.SOAPClient._class.addMethod("objectConverterOn:", "type", "private", 
	"\t| cls |" +
	"\n\tcls := Types at: type ifAbsent: Dictionary." +
	"\n\t^ [:obj | cls newFrom: obj]",
	null, "2013-03-17T22:58:39Z", "mp");

jst.SOAPClient.addMethod("initialize", "", "initialization", function (){
	if (window.SOAPClient)
		this.wrap_(new window.SOAPClient());
	return this;
},
	null, "2013-03-17T13:50:58Z", "mp");

jst.SOAPClient.addMethod("username:", "aString", "accessing", 
	"\tobj at: #username put: aString",
	null, "2013-03-18T08:46:35Z", "mp");

jst.SOAPClient.addMethod("password:", "aString", "accessing", 
	"\tobj at: #password put: aString",
	null, "2013-03-18T08:46:53Z", "mp");

jst.SOAPClient.addMethod("objectConverter:", "aBlock", "accessing", 
	"\t\"aBlock has to return an appropriate converter for given data type - see a default implementation on the class side\"" +
	"\n\tobj at: '_getObjectConverter' put: aBlock",
	null, "2013-03-18T09:02:01Z", "mp");

jst.SOAPClient.addMethod("url:", "aUrl", "accessing", 
	"\t\"Web Service URL (pls note that many browsers do not allow cross-domain calls for security reasons)\"" +
	"\n\tobj at: #url put: aUrl asString",
	null, "2013-03-17T14:37:29Z", "mp");

jst.SOAPClient.addMethod("method:", "aString", "accessing", 
	"\t\"Web method name\"" +
	"\n\tobj at: #method put: aString",
	null, "2013-03-17T13:54:29Z", "mp");

jst.SOAPClient.addMethod("parameters:", "anObject", "accessing", function (anObject){
	//Web method parameters
	this._params = anObject.asDictionary();
	this._obj.parameters._pl = this._params._map;
	return this;
},
	null, "2013-03-17T16:19:54Z", "mp");

jst.SOAPClient.addMethod("async:", "aBoolean", "accessing", 
	"\t\"Call mode\"" +
	"\n\tobj at: #async put: aBoolean",
	null, "2013-03-17T13:54:17Z", "mp");

jst.SOAPClient.addMethod("callback:", "aBlock", "accessing", 
	"\t\"CallBack method invoked upon response reception (optional for sync calls)\"" +
	"\n\tobj at: #callback put: aBlock asJsObject",
	null, "2013-03-17T14:57:39Z", "mp");

jst.SOAPClient.addMethod("invoke", "", "public", 
	"\t^ obj perform: #invoke",
	null, "2013-03-17T16:11:44Z", "mp");

jst.SOAPClient.addMethod("wsdlTypes", "", "public", function (){
	var types = window.SOAPClient._cacheWsdlTypes[this._obj.url];
	return (types) ? jst.Dictionary.on_(types) : jst.nil;
},
	null, "2013-03-17T16:10:56Z", "mp");

jst.SOAPClient.addMethod("wsdlDocument", "", "public", function (){
	var wsdl = window.SOAPClient._cacheWsdl[this._obj.url];
	return (wsdl) ? jst.DOMNode.on_(wsdl) : jst.nil;
},
	null, "2013-03-17T16:09:39Z", "mp");

jst.SOAPClient._class.addMethod("base64Encode:", "aString", "utils", function (aString){
	return window.SOAPClient._toBase64(aString);
},
	null, "2013-03-18T08:44:20Z", "mp");

jst.SOAPClient._class.addMethod("typesMapping", "", "accessing", 
	"\t^ Types",
	null, "2013-03-18T09:11:39Z", "mp");

jst.SOAPClient.addMethod("xmlData", "", "accessing", 
	"\t\"After any invoke, the raw XML Document is available for further custom processing.\"" +
	"\n\t^ DOMNode on: (obj at: #xmlData)",
	null, "2013-03-19T21:48:19Z", "mp");

// SOAPClient extensions

jst.Behavior.addMethod("registerAsSOAPType:", "aString", "*dom", 
	"\t(SOAPClient typesMapping includesKey: aString) " +
	"\n\t\tifTrue: [ [self error: 'Duplicite registration of SOAP type: ', aString] delayed: 100]" +
	"\n\t\tifFalse: [SOAPClient typesMapping at: aString put: self]",
	null, "2013-03-18T14:51:29Z", "mp");
