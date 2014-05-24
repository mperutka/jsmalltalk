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
 * Depends on jst-core, written in pure javascript.
 */

jst.currentJsFile = "jst-core-proxy";

jst.Object.subclass("JSObjectProxy", "jsObject jstWrapper", "", "", "Kernel-Objects");
jst.Object.subclass("WrapperObject", "obj", "", "", "Kernel-Objects");

//mp 19.1.2012 

// Object extensions

jst.Object.constructor.prototype.wrap_ = function(jsObject) {
	jst.JSObjectProxy.on_(jsObject).jstWrapper_(this);
	return this;
};
jst.Object.addMethod("wrap:", "jsObject", "converting");

jst.Object.constructor.prototype.jstWrapper = function (){
	return this;
};
jst.Object.addMethod("jstWrapper", "", "converting");

/*
jst.Object.wrap_ = function (jsObject) {
	if (!jsObject.jstProxy || jsObject.jstProxy.jstWrapper() == jst.nil)
		//novou instanci vyrobi jen poprve
		this._new().wrap_(jsObject);
	else if (!jsObject.jstProxy.jstWrapper().isKindOf_(this))
		this.error_("The wrapper " + jsObject.jstProxy.jstWrapper().asString() + " is not an instance of " + this.name());
	return jsObject.jstProxy.jstWrapper();
};
*/

jst.Object.wrap_ = function (jsObject) {
	//19.9.2012
	//console.log(this);
	var proxy = (jsObject._jsObject) ? jsObject : jsObject.jstProxy; 
	if (!proxy || proxy.jstWrapper() == jst.nil)
		//creates the new instance only once
		//return this._new().wrap_(jsObject); 
		return this.basicNew().wrap_(jsObject); //mp 2013-06-18
	if (!proxy.jstWrapper().isKindOf_(this)) {
		this.error_("The wrapper " + proxy.jstWrapper().asString() + " is not an instance of " + this.name());
	};
	return proxy.jstWrapper();
};
jst.Object._class.addMethod("wrap:", "jsObject", "instance creation");

//*** JSObjectProxy ***

/*
jst.JSObjectProxy.on_ = function (jsObject){
	if (jsObject._class == this)
		return jsObject; // 19.9.2012
	if (jsObject.jstProxy) {
		if (!(jsObject.jstProxy instanceof this.constructor))
			this.error_("Some foreign instance of jstProxy object.");
		return jsObject.jstProxy; //already proxied
	};
	if (typeof jsObject != "object" || jsObject instanceof jst.Object.constructor)
		this.error_("Only the instance of javascript object can be proxied.");
	return this._new().wrap_(jsObject);
}; 
*/
jst.JSObjectProxy.on_ = function (jsObject){
	//19.9.2012
	var proxy = (jsObject._jsObject) ? jsObject : jsObject.jstProxy; 
	if (proxy) {
		// jsObject is already proxied or it is the proxy object itself
		if (!proxy.isKindOf_(this))
			this.error_("Some foreign instance of jstProxy object.");
		return proxy;
	};
	if (typeof jsObject != "object" || jsObject instanceof jst.Object.constructor)
		this.error_("Only the instance of javascript object can be proxied.");
	return this._new().wrap_(jsObject);
}; 
jst.JSObjectProxy._class.addMethod("on:", "jsObject", "instance creation");

jst.JSObjectProxy.constructor.prototype.wrap_ = function (jsObject){
	this._jsObject = jsObject;
	try {
		jsObject.jstProxy = this;
	} catch (ex) {
		//console.log("Couldn't set proxy on ", jsObject);
	};
	return this;
}; 
jst.JSObjectProxy.addMethod("wrap:", "jsObject", "converting");

jst.JSObjectProxy.constructor.prototype.asJsObject = function() {
	return this._jsObject;
};
jst.JSObjectProxy.addMethod("asJsObject", "", "converting");

jst.JSObjectProxy.constructor.prototype.jsObject_ = function(anObject) {
	this._jsObject = anObject;
	return this;
};
jst.JSObjectProxy.addMethod("jsObject:", "anObject", "accessing");

jst.JSObjectProxy.isNeededOn_ = function (jsObject){
	/*mp 2012-05-07T09:49:41Z
	return jsObject != null
		&& (typeof jsObject == "object" || (typeof jsObject == 'function' &&  !(jsObject instanceof jst.BlockClosure.constructor))) 
		&& !(jsObject instanceof jst.Object.constructor) && jsObject.jstProxy == null;*/
	//mp 2012-06-10T09:23:24Z
	return jsObject != null && !jsObject._class;
};
jst.JSObjectProxy._class.addMethod("isNeededOn:", "jsObject", "testing");

jst.JSObjectProxy.adopt_ = function(jsObject) {
	return this.on_(jsObject);
};
jst.JSObjectProxy._class.addMethod("adopt:", "jsObject", "converting");

jst.JSObjectProxy.constructor.prototype.jstWrapper = function (){
	return this._jstWrapper;
};
jst.JSObjectProxy.addMethod("jstWrapper", "", "accessing");

jst.JSObjectProxy.constructor.prototype.jstWrapper_ = function (anObject){
	this._jstWrapper = anObject;
	return this;
};
jst.JSObjectProxy.addMethod("jstWrapper:", "anObject", "accessing");

/*
jst.JSObjectProxy.constructor.prototype.keys = function (){
	var keys = jst.OrderedCollection._new();
	for (var key in this._jsObject) {
	 	if (this._jsObject.hasOwnProperty(key) && key != "jstProxy")
			keys.add_(key);
	};
	return keys;
};
jst.JSObjectProxy.addMethod("keys", "", "accessing");

jst.JSObjectProxy.constructor.prototype.includesKey_ = function (key){
	return key in this._jsObject;
};
jst.JSObjectProxy.addMethod("includesKey:", "key", "testing");

jst.JSObjectProxy.constructor.prototype.at_ifAbsent_ = function (key,aBlock){
	if (key in this._jsObject)
		return this._jsObject[key];
	return aBlock.value();
};
jst.JSObjectProxy.addMethod("at:ifAbsent:", "key aBlock", "accessing");

jst.JSObjectProxy.constructor.prototype.at_ifPresent_ = function (key,aBlock){
	if (this._jsObject.hasOwnProperty(key))
		return aBlock.value_(this._jsObject[key]);
	return jst.nil;
}; 
jst.JSObjectProxy.addMethod("at:ifPresent:", "key aBlock", "accessing"); 

jst.JSObjectProxy.constructor.prototype.at_ = function (key){
	return (key in this._jsObject) ? this._jsObject[key] : jst.nil;
};
jst.JSObjectProxy.addMethod("at:", "key", "accessing");

*/

jst.JSObjectProxy.constructor.prototype.keys = function (){
	var keys = jst.OrderedCollection._new();
	for (var key in this._jsObject) {
	 	if (key != "jstProxy" && typeof this._jsObject[key] != "function")
			keys.add_(key);
	};
	return keys;
};
jst.JSObjectProxy.addMethod("keys", "", "accessing");

jst.JSObjectProxy.constructor.prototype.includesKey_ = function (key){
	return this._jsObject[key] != undefined;
};
jst.JSObjectProxy.addMethod("includesKey:", "key", "testing");

jst.JSObjectProxy.constructor.prototype.at_ifAbsent_ = function (key,aBlock){
	return (this.includesKey_(key)) ? this._jsObject[key] : aBlock.value();
};
jst.JSObjectProxy.addMethod("at:ifAbsent:", "key aBlock", "accessing");

jst.JSObjectProxy.constructor.prototype.at_ifPresent_ = function (key,aBlock){
	return (this.includesKey_(key)) ? aBlock.value_(this._jsObject[key]) : jst.nil;
}; 
jst.JSObjectProxy.addMethod("at:ifPresent:", "key aBlock", "accessing"); 

jst.JSObjectProxy.constructor.prototype.at_ = function (key){
	return (this.includesKey_(key)) ? this._jsObject[key] : jst.nil;
};
jst.JSObjectProxy.addMethod("at:", "key", "accessing");

jst.JSObjectProxy.constructor.prototype.at_put_ = function (key,anObject){
	return this._jsObject[key] = anObject;
};
jst.JSObjectProxy.addMethod("at:put:", "key anObject", "accessing");

/*
jst.JSObjectProxy.addMethod("perform:", "aSymbol", "message handling", function (aSymbol){
	if (this._class.canUnderstand_(aSymbol))
		return this[aSymbol.asFunctionName()]();
	var fce = this._jsObject[aSymbol];
	return (typeof fce == 'function') ? fce.apply(this._jsObject) : ((fce != null) ? fce : jst.nil);
},
	null, "2012-01-19T16:15:13Z", "mp");

jst.JSObjectProxy.addMethod("perform:with:", "aSymbol anObject", "message handling", 
	function (aSymbol,anObject){
	if (this._class.canUnderstand_(aSymbol))
		return this[aSymbol.asFunctionName()](anObject);
	var fce = this._jsObject[aSymbol];
	return (typeof fce == 'function') ? fce.apply(this._jsObject, [anObject]) : this._jsObject[aSymbol] = anObject;
},
	null, "2012-01-19T16:31:16Z", "mp");
*/
/*
jst.JSObjectProxy.constructor.prototype.doesNotUnderstand_with_ = function (selector,args){
	var fce = this._jsObject[selector];
	if (typeof fce != 'function') {
		//Is it a good idea? But my Ext wrappers often use this behavior...
		if (args.size() == 0)
			//get inst var
			return (fce != null) ? fce : jst.nil;
		else if (args.size() == 1) {
			//set inst var, return self
			this._jsObject[selector] = args[0];
			return this;
		}
		else
			this.error_("'" + selector + "' is not a function with " + args.size() + " arguments.");
	} 
	else if (fce != null)
		//call method of js object
		return fce.apply(this._jsObject, args);
	return this.doesNotUnderstand_(jst.Message.selector_arguments_(selector, jst.Array.adopt_(args)));
};

jst.JSObjectProxy.constructor.prototype.doesNotUnderstand_with_ = function (selector,args){
	//20.9.2012
	var fce = this._jsObject[selector];
	if (fce && fce.apply)
		//fce is function of js object
		return fce.apply(this._jsObject, args);
	//Is it a good idea? But my Ext wrappers often use this behavior...
	if (args.size() == 0)
		//get the object property
		return (fce != null) ? fce : jst.nil;
	if (args.size() == 1) {
		//set the object property, return self
		this._jsObject[selector] = args[0];
		return this;
	};
	if (fce)
		this.error_("'" + selector + "' is not a function with " + args.size() + " arguments.");
	return this.doesNotUnderstand_(jst.Message.selector_arguments_(selector, jst.Array.adopt_(args)));
};
*/

jst.JSObjectProxy.constructor.prototype.doesNotUnderstand_with_ = function (selector,args) {
	//2.3.2013
	var fce = this._jsObject[selector];
	if (fce && fce.apply)
		//fce is function of js object
		return fce.apply(this._jsObject, args);
	//Is it a good idea? But my Ext wrappers often use this behavior...
	if (args.size() == 0)
		//get the object property
		return (fce != null) ? fce : jst.nil;
	if (args.size() == 1 && selector.last() != ":") {
		//set the object property, return self
		this._jsObject[selector] = args[0];
		return this;
	};
	if (fce)
		this.error_("'" + selector + "' is not a function with " + args.size() + " arguments.");
	return this.doesNotUnderstand_(jst.Message.selector_arguments_(selector, [args]));
};
jst.JSObjectProxy.addMethod("doesNotUnderstand:with:", "selector args", "system primitives");

jst.JSObjectProxy.constructor.prototype.printString = function (){
	//mp 2012-05-09T20:42:32Z
	return this._jsObject.toString();
}; 
jst.JSObjectProxy.addMethod("printString", "", "printing");

jst.JSObjectProxy.constructor.prototype.printOn_ = function(aStream) {
	//mp 2012-05-09T20:34:39Z
	//only if used with jst-kernel
	aStream.print_(this._jsObject);
	return this;
};
jst.JSObjectProxy.addMethod("printOn:", "aStream", "printing");

//*** WrapperObject ***

//mp 26.3.2012 

jst.WrapperObject.constructor.prototype.wrap_ = function(jsObject){
	jst.JSObjectProxy.on_(jsObject).jstWrapper_(this);
	this._obj = jsObject;
	return this;
};
jst.WrapperObject.addMethod("wrap:", "jsObject", "private");

jst.WrapperObject.constructor.prototype.asJsObject = function(){
	return this._obj;
};
jst.WrapperObject.addMethod("asJsObject", "", "converting");

//mp 4.1.2013

jst.WrapperObject.constructor.prototype.resetProxy = function (){
	this._obj.jstProxy = null;
	return this;
};
jst.WrapperObject.addMethod("resetProxy", "", "initialization");
