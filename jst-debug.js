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
 * Depends on jst-core, jst-parser, jst-kernel.
 *  
 */

jst.currentJsFile = "jst-debug";

jst.Object.subclass("ContextPart", "sender args sendIndex", "", "", "Kernel-Methods");

jst.ContextPart.subclass("MethodContext", "method receiver", "", "", "Kernel-Methods");

jst.ContextPart.subclass("BlockContext", "home block", "", "", "Kernel-Methods");

jst.Error.subclass("BreakPoint", "", "", "", "Exceptions-Kernel");

jst.thisContext = jst.nil;

jst.skipDebugger = false;

//Behavior

jst.Behavior.addMethod("new", "", "instance creation", function (){
    var obj = this.basicNew();
    if (obj.initialize)
    	jst.snd(obj, "initialize");
    return obj;
}, "_new", "2013-12-29T22:27:26Z", "mp");

//MessageSend

jst.MessageSend.addMethod("markSenderIn:", "editor", "*kernel-parser", 
	"\teditor markText: self sendString with: 'jst-highlight' from: selEditPos firstMatch: true",
	null, "2013-10-17T21:32:57Z", "mp");

//UndefinedObject

jst.UndefinedObject.addMethod("handleSignal:", "exception", "exceptions", function(exception) { 
	throw exception;
}, null, "2011-10-22T20:57:59Z", "mp");

// Object

jst.Object.addMethod("nonlocalReturnOf:", "aBlock", "system primitives", function(aBlock) {
	//debug version
	//z vnitrku funkce aBlock lze kdykoliv vyskocit zavolanim jst.BlockReturn.result_(...) 
	try {
		return aBlock.call(this);
	} 
	catch (e) {
		if (e._isSmalltalkError && e.isBlockReturn())
			return e.result();
		//console.log(e);
		return jst.thisContext.handleSignal_(e);
	};
});

/* tato verze zda se neprinasi nic noveho, zatim ponechavam puvodni verzi
jst.Object.addMethod("nonlocalReturnOf:", "aBlock", "system primitives", 
	function (aBlock){
	//debug version
	//z vnitrku funkce aBlock lze kdykoliv vyskocit zavolanim jst.BlockReturn.result_(...) 
	try {
		return aBlock.call(this);
	} 
	catch (e) {
		if (e._isSmalltalkError) {
			if (e.isBlockReturn())
				return e.result();
			//console.log(e);
			return jst.thisContext.handleSignal_(e);
		};
		//console.log(jst.thisContext);
		throw e;
	};
},
	null, "2012-04-19T08:51:36Z", "mp"); //jst-debug
*/

// Error

jst.Object.subclass("Error", "messageText receiver signalContext isSmalltalkError", "", "", "Exceptions-Kernel");

jst.Error.addMethod("initialize", "", "initialization", 
	"\tisSmalltalkError := true",
	null, "2011-10-27T15:30:59Z", "mp");

jst.Error.addMethod("signal", "", "signaling", function(){
	//debug version
	this._signalContext = jst.thisContext; 
	return jst.thisContext.handleSignal_(this);
});

jst.Error.addMethod("wrap:", "exception", "accessing", function (exception){
	//debug version
	this._messageText = exception.message;
	this._signalContext = jst.thisContext;
	return this;
},
	null, "2012-04-19T17:29:40Z", "mp");

// BlockReturn

jst.BlockReturn.constructor.prototype.signal = function(){
	throw this;
};
jst.BlockReturn.addMethod("signal", "", "signaling");

// BlockClosure

jst.BlockClosure._class.addMethod("initialize", "", "class initialization", function (){
	this.addInstVarName_("homeContext");
	return this;
},
	null, "2013-11-01T07:27:53Z", "mp");

jst.initializeClass(jst.BlockClosure);

/*
jst.BlockClosure.addMethod("on:do:", "exception handlerAction", "exceptions", 
	function (exception,handlerAction){
	//debug version
	try {
		jst.skipDebugger = true;
		return jst.snd(this, "value");
	}
	catch(ex) {
		jst.skipDebugger = false;
		if (ex._isSmalltalkError == true && ex instanceof exception.constructor)
			//JSmalltalk error
			return jst.sndw(handlerAction, "value_", ex);
		else if (exception == jst.Error  && ex instanceof Error)
			//Javascript error
			return jst.sndw(handlerAction, "value_", jst.Error.wrap_(ex));
		return jst.thisContext.handleSignal_(ex);
	}
	finally {
		jst.skipDebugger = false;
	};
});
*/

jst.BlockClosure.addMethod("on:do:", "exception handlerAction", "exceptions", 
	function (exception, handlerAction){
	//debug version
	try {
		jst.skipDebugger = true;
		var context = jst.thisContext = jst.BlockContext.sender_arguments_(jst.thisContext);
		var result = this.value();
		jst.thisContext = context.sender();
		return result;
	}
	catch(ex) {
		jst.skipDebugger = false;
		if (ex._isSmalltalkError == true && ex instanceof exception.constructor)
			//JSmalltalk error
			return jst.sndw(handlerAction, "value_", ex);
		else if (exception == jst.Error  && ex instanceof Error)
			//Javascript error
			return jst.sndw(handlerAction, "value_", jst.Error.wrap_(ex));
		return jst.thisContext.ifNil_(context).handleSignal_(ex);
	}
	finally {
		jst.skipDebugger = false;
	};
});

/*
jst.BlockClosure.constructor.prototype.printOn_ = function(aStream){
	if (jst.thisContext != jst.nil && jst.thisContext.method() != jst.nil) {
		var id = this.toString().substr(this.toString().indexOf("block = ")+8, 1);
		aStream.nextPut_();xxx
	}
	else
		aStream.nextPut_(this.toString());
	return this;
};
jst.BlockClosure.addMethod("printOn:", "aStream", "printing");
*/
jst.BlockClosure.addMethod("printOn:", "aStream", "printing", 
	"\thomeContext ifNil: [" +
	"\n\t\taStream nextPutAll: self printSource]" +
	"\n\tifNotNil: [" +
	"\n\t\taStream nextPutAll: '[] in '." +
	"\n\t\thomeContext printOn: aStream." +
	"\n\t\taStream nextPutAll: ' {';" +
	"\n\t\t\tnextPutAll: (self printSource truncateWithElipsisTo: 80);" +
	"\n\t\t\tnextPutAll: '}'" +
	"\n\t]",
	null, "2013-11-01T08:57:41Z", "mp");

// *** ContextPart ***

jst.ContextPart.addMethod("handleSignal:", "exception", "exceptions", function (exception){ 
	if (exception._isSmalltalkError != true)
		exception = jst.Error.wrap_(exception);
		//return jst.Error._new().signal_(exception);
	//console.log(exception.description());
	if (!jst.skipDebugger) {
		try {
			//console.log(["1", exception._signalContext]);
			var ctx = exception._signalContext;
			while (ctx != jst.nil) {
				console.log(ctx); // + " | " + ctx._args
				ctx = ctx._sender;
			};
		} catch(ex) {
			console.log([exception, ex]);
		}
	};
	jst.thisContext = jst.nil;
	throw exception;
},
	null, "2011-10-27T15:34:14Z", "mp");

jst.ContextPart.addMethod("method", "", "accessing", 
	"\t\"Answer the method of this context.\"" +
	"\n\tself subclassResponsibility: #method",
	null, "2011-10-23T19:41:15Z", "mp");

jst.ContextPart.addMethod("sender", "", "accessing", 
	"\t^ sender",
	null, "2011-11-01T21:52:47Z", "mp");

jst.ContextPart.addMethod("selector", "", "debugger access", 
	"\t\"Answer the selector of the method that created the receiver.\"" +
	"\n\t^ self method selector",
	null, "2011-10-23T19:43:49Z", "mp");

jst.ContextPart.addMethod("methodClass", "", "debugger access", 
	"\t\"Answer the class in which the receiver's method was found.\"" +
	"\n\t" +
	"\n\t^self method methodClass ifNil: [self receiver class]",
	null, "2011-10-23T19:52:45Z", "mp");
/*
jst.ContextPart.addMethod("printOn:", "aStream", "printing", 
	"\t| selector cls mclass |" +
	"\n\tself method ifNil: [" +
	"\n\t\t^ super printOn: aStream]." +
	"\n\tcls := self receiver class." +
	"\n\tmclass := self methodClass." +
	"\n\tselector := self selector." +
	"\n\taStream nextPutAll: cls name." +
	"\n\tmclass == cls ifFalse: [" +
	"\n\t\taStream nextPut: $(." +
	"\n\t\taStream nextPutAll: mclass name." +
	"\n\t\taStream nextPut: $)]." +
	"\n\taStream nextPutAll: '>>'." +
	"\n\taStream nextPutAll: selector",
	null, "2011-10-23T19:58:59Z", "mp");
*/
jst.ContextPart.addMethod("printOn:", "aStream", "printing", 
	"\t| selector cls mclass |" +
	"\n\tself method ifNil: [" +
	"\n\t\t^ super printOn: aStream]." +
	"\n\tcls := self receiver class." +
	"\n\tmclass := self methodClass." +
	"\n\tcls == BlockContext ifTrue: [" +
	"\n\t\t\"BlockEvaluatingError sets receiver to BlockContext, but receiver is still BlockClosure\"" +
	"\n\t\tcls := mclass]." +
	"\n\tselector := self selector." +
	"\n\taStream nextPutAll: cls name." +
	"\n\tmclass == cls ifFalse: [" +
	"\n\t\taStream nextPut: $(." +
	"\n\t\taStream nextPutAll: mclass name." +
	"\n\t\taStream nextPut: $)]." +
	"\n\taStream nextPutAll: '>>'." +
	"\n\taStream nextPutAll: selector",
	null, "2012-02-08T09:36:56Z", "mp");

jst.ContextPart.addMethod("home", "", "accessing", 
	"\t\"Answer the context in which the receiver was defined.\"" +
	"\n\tself subclassResponsibility: #home",
	null, "2011-11-03T20:58:11Z", "mp");

jst.ContextPart.addMethod("receiver", "", "accessing", 
	"\t\"Answer the receiver of the message that created this context.\"" +
	"\n\tself subclassResponsibility: #receiver",
	null, "2011-11-04T11:18:11Z", "mp");
/*
jst.ContextPart.addMethod("methodSource", "", "printing", 
	"\t^ self method printSource",
	null, "2011-12-19T14:11:25Z", "mp");
*/
jst.ContextPart.addMethod("methodSource", "", "printing", 
	"\t^ self method " +
	"\n\t\tifNotNilDo: [:m | m printSource] " +
	"\n\t\tifNil: ['empty context']",
	null, "2012-01-06T13:37:28Z", "mp");

jst.ContextPart.addMethod("tempNames", "", "accessing", 
	"\t^ self method tempNames",
	null, "2012-01-05T15:30:44Z", "mp");

/*
jst.ContextPart.addMethod("tempAt:", "index", "accessing", 
	"\t\"Answer the value of the temporary variable whose index is the " +
	"\n\targument, index.\"" +
	"\n\t^ args at: index",
	null, "2012-01-06T08:31:08Z", "mp");
*/
jst.ContextPart.addMethod("tempAt:", "index", "accessing", 
	function (index){
		//Answer the value of the temporary variable whose index is the argument, index.
		return (this._args[index-1].hasOwnProperty("x")) ? this._args[index-1].x : this._args[index-1];
	},
	null, "2013-10-10T12:13:18Z", "mp");

/*
jst.ContextPart.addMethod("numTemps", "", "accessing", 
	"\t\"Answer the number of temporary variables.\"" +
	"\n\t^ args asCollection size",
	null, "2012-01-06T08:32:59Z", "mp");
*/
jst.ContextPart.addMethod("numTemps", "", "accessing", 
	"\t\"Answer the number of temporary variables.\"" +
	"\n\t^ self tempNames size",
	null, "2012-01-06T19:49:50Z", "mp");

jst.ContextPart.addMethod("tempsAndValues", "", "debugger access", 
	"\t\"Return a string of the temporary variabls and their current values\"" +
	"\n\t| aStream |" +
	"\n\taStream := (Smalltalk classNamed: #WriteStream) on: (String new: 100)." +
	"\n\tself tempNames withIndexDo: [:title :index |" +
	"\n\t\taStream nextPutAll: title; nextPut: $:; space; tab." +
	"\n\t\t(self tempAt: index) printOn: aStream." +
	"\n\t\taStream lf]." +
	"\n\t^ aStream contents",
	null, "2012-01-06T08:38:21Z", "mp");

/*
jst.ContextPart.addMethod("markSenderIn:", "editor", "util", 
	"\t(sendIndex > 0 and: [self method isNative not]) ifTrue: [" +
	"\n\t\t(self method code select: [:exp | exp sendIndex = sendIndex]) first markSenderIn: editor]",
	null, "2013-10-15T21:01:47Z", "mp"); //jst-debug
*/
jst.ContextPart.addMethod("markSenderIn:", "editor", "util", 
	"\t(sendIndex > 0 and: [self method notNil] and: [self method isNative not]) ifTrue: [" +
	"\n\t\t(self method code select: [:exp | exp sendIndex = sendIndex]) ifNotEmptyDo: [:exp |" +
	"\n\t\t\texp first markSenderIn: editor]]",
	null, "2013-10-23T14:32:05Z", "mp"); //jst-debug

// Method extensions for debugging

jst.Method.addMethod("findBlock:", "id", "debugging", 
	"\t^ nil",
	null, "2012-04-19T12:29:57Z", "mp");

jst.SmalltalkMethod.addMethod("findBlock:", "id", "debugging", 
	"\t^ code findBlock: id",
	null, "2012-04-19T12:30:45Z", "mp");

//*** BlockContext ***

jst.BlockContext.addMethod("home", "", "accessing", 
	"\t\"Answer the context in which the receiver was defined.\"" +
	"\n\t^ home",
	null, "2011-11-03T20:58:54Z", "mp");
/*
jst.BlockContext.addMethod("method", "", "accessing", 
	"\t\"Answer the method in which the receiver was defined.\"" +
	"\n\t^ home method",
	null, "2011-11-03T21:29:02Z", "mp");
*/
jst.BlockContext.addMethod("method", "", "accessing", function (){
	//Answer the method in which the receiver was defined.
	return (this._home != jst.nil) ? this._home.method() : jst.nil;
}, null, "2012-01-06T13:27:53Z", "mp");
/*
jst.BlockContext.addMethod("methodSource", "", "printing", 
	"\t^ self home " +
	"\n\t\tifNotNil: [super methodSource] " +
	"\n\t\tifNil: ['empty context']",
	null, "2011-12-19T14:13:42Z", "mp");
*/
jst.BlockContext.addMethod("receiver", "", "accessing", 
	"\t^ home ifNotNil: [home receiver]",
	null, "2012-02-07T13:14:40Z", "mp");
/*
jst.BlockContext.sender_arguments_ = function (aContextPart, argsArray){
	//mp 2011-11-04T10:52:16Z
	var ctx = this._new();
	ctx._sender = aContextPart;
	ctx._args = argsArray || [];
	if (aContextPart != jst.nil)
		ctx._home = aContextPart.home();
	ctx._sendIndex = 0;
	return ctx;
}; 
jst.BlockContext._class.addMethod("sender:arguments:", "aContextPart argsArray", "instance creation");
*/
jst.BlockContext.addMethod("setSender:arguments:home:", "aContextPart argsArray homeCtx", "initialization", function (aContextPart,argsArray,homeCtx){
	this._sender = aContextPart;
	this._args = argsArray || [];
	if (homeCtx && homeCtx != jst.nil)
		this._home = homeCtx
	else if (aContextPart != jst.nil)
		this._home = aContextPart.home();
	this._sendIndex = 0;
	return this;
},
	null, "2013-11-01T09:35:13Z", "mp");

jst.BlockContext._class.addMethod("sender:arguments:", "aContextPart argsArray", "instance creation", function (aContextPart,argsArray){
	return this._new().setSender_arguments_home_(aContextPart, argsArray);
},
	null, "2013-11-01T09:46:33Z", "mp");

jst.BlockContext.addMethod("printSource", "", "printing", function(){ 
	//return this.method().source().substring(this._i1-1, this._i2-1);
	/*var self = this;
	var str = "???";
	self.method()._code.do_(function(exp){
		if (exp.isBlock() && exp._id == self._block) {
			//console.log(exp);
			str = exp._code.printSource();
		};
	});
	return str;*/
	return (this.block() != jst.nil) ? this._block.printSource() : "[...]";
},
	null, "2011-11-04T14:58:43Z", "mp");

/* crashes for a native method, when code is function, not parsed code
jst.BlockContext.addMethod("block", "", "accessing", function (){ 
	if (this._block.isNumber()) {
		var self = this;
		if (this.method() != jst.nil)
			this.method()._code.do_(function(exp){
				if (exp.isBlock() && exp._id == self._block) {
					//console.log(jst.x = jst.thisContext);
					self._block = exp;
				};
			});
		if (this._block.isNumber())
			this._block = jst.nil;
	};
	return this._block;
}, null, "2012-01-06T10:14:21Z", "mp");
*/

/*
jst.BlockContext.addMethod("block", "", "accessing", 
	"\tblock isNumber ifTrue: [" +
	"\n\t\tblock := self method ifNotNilDo: [:m | m findBlock: block]]." +
	"\n\t^ block",
	null, "2012-04-19T12:34:41Z", "mp");
*/
jst.BlockContext.addMethod("block", "", "accessing", 
	"\tblock isNumber ifTrue: [ | ctx idx |" +
	"\n\t\tctx := self." +
	"\n\t\tidx := block." +
	"\n\t\t[block := ctx method ifNotNilDo: [:m | m findBlock: idx]] doWhileTrue: [" +
	"\n\t\t\tblock isNil and: [(ctx := ctx sender) notNil]]." +
	"\n\t\t(block notNil and: [ctx ~= self]) ifTrue: [" +
	"\n\t\t\thome := ctx home]" +
	"\n\t]." +
	"\n\t^ block",
	null, "2013-10-23T14:08:12Z", "mp"); //jst-debug

/*
jst.BlockContext.addMethod("printOn:", "aStream", "printing", 
	"\thome ifNil: [" +
	"\n\t\taStream nextPutAll: 'a BlockContext with home=nil'." +
	"\n\t\t^ self]." +
	"\n\taStream nextPutAll: '[] in '." +
	"\n\tsuper printOn: aStream." +
	"\n\taStream nextPutAll: ' {'." +
	"\n\t(self printSource truncateWithElipsisTo: 80) do: [:ch | " +
	"\n\t\tch = String lf | (ch = String tab) " +
	"\n\t\t\tifTrue: [aStream space] ifFalse: [aStream nextPut: ch]" +
	"\n\t]." +
	"\n\taStream nextPutAll: '}'",
	null, "2012-01-11T17:38:34Z", "mp");
*/
jst.BlockContext.addMethod("printOn:", "aStream", "printing", 
	"\t| src |" +
	"\n\tsrc := self printSource. \"has to be first, finding block can change the home\"" +
	"\n\thome ifNil: [" +
	"\n\t\taStream nextPutAll: 'a BlockContext with home=nil'." +
	"\n\t\t^ self]." +
	"\n\taStream nextPutAll: '[] in '." +
	"\n\tsuper printOn: aStream." +
	"\n\taStream nextPutAll: ' {'." +
	"\n\t(src truncateWithElipsisTo: 80) do: [:ch | " +
	"\n\t\tch = String lf | (ch = String tab) " +
	"\n\t\t\tifTrue: [aStream space] ifFalse: [aStream nextPut: ch]" +
	"\n\t]." +
	"\n\taStream nextPutAll: '}'",
	null, "2013-10-23T14:15:56Z", "mp"); //jst-debug

/*
jst.BlockContext.addMethod("tempNames", "", "accessing", function() {
	//"\t^ home ifNotNil: [home tempNames, self block tempNames] ifNil: [self block tempNames]",
	var names = (this._home != jst.nil) ? this._home.tempNames() : [];
	if (this._sender != jst.nil && this.method() != jst.nil && this.method() == this._sender.method())
		names = names.concat(this._sender.tempNames());
	if (this.block() != jst.nil)
		names = names.concat(this._block.tempNames());
	return names;
}, null, "2012-01-06T10:20:36Z", "mp");
*/
jst.BlockContext.addMethod("tempNames", "", "accessing", function (){
	//"\t^ home ifNotNil: [home tempNames, self block tempNames] ifNil: [self block tempNames]",
	var names = [];
	if (this._sender != jst.nil && this.method() != jst.nil && this.method() == this._sender.method())
		names = names.concat(this._sender.tempNames());
	else if (this._home != jst.nil) 
		names = names.concat(this._home.tempNames());
	if (this.block() != jst.nil)
		names = names.concat(this._block.tempNames());
	return names;
}, null, "2012-01-06T15:43:10Z", "mp", 1);

jst.BlockContext.addMethod("tempNames", "", "accessing", function (){
	var names = [];
	if (this._sender != jst.nil && this.method() != jst.nil && this.method() == this._sender.method())
		names = names.concat(this._sender.tempNames());
	else if (this._home != jst.nil) 
		names = names.concat(this._home.tempNames());
	if (this.block() != jst.nil)
		names = names.concat(this._block.tempNames());
	if (names.length > this._args.length && this._args.length == 1 && this._args[0].length)
		//fix for #valueWithPossibleArgs:
		this._args = this._args[0];
	return names;
},
	null, "2013-11-05T12:42:09Z", "mp");

/*
jst.BlockContext.addMethod("tempAt:", "index", "accessing", 
	"\t^ (home notNil and: [index <= home numTemps])" +
	"\n\t\tifTrue: [home tempAt: index]" +
	"\n\t\tifFalse: [args at: (index - home numTemps)]",
	null, "2012-01-06T08:36:24Z", "mp");
*/

jst.BlockContext.addMethod("tempAt:", "index", "accessing", 
	function (index){
	var dist = 0;
	if (this._sender != jst.nil && this.method() != jst.nil && this.method() == this._sender.method()) {
		if (index <= (dist = this._sender.numTemps()))
			return this._sender.tempAt_(index);
	} else if (this._home != jst.nil) {
		if (index <= (dist = this._home.numTemps()))
			return this._home.tempAt_(index);
	};
	//todo: Jak to, ze _args muze byt undefined ???
	//if (this._args && this._args.notNil() && index - dist <= this._args.size())
	if (this._args.notNil() && index - dist <= this._args.size())
		return (this._args[index - dist-1].hasOwnProperty("x")) ? this._args[index - dist-1].x : this._args[index - dist-1]; //this._args.at_(index - dist);
	return jst.nil;
},
	null, "2012-01-11T22:46:25Z", "mp");

jst.UndefinedObject.addMethod("suppressContext", "", "testing", function(){
	return true;
}, null, "2011-12-30T23:21:28Z", "mp");

jst.BlockClosure.addMethod("suppressContext", "", "testing", function(){
	return this._method.suppressContext();
});

jst.Method.addMethod("suppressContext", "", "testing", function(){
	return this._suppressContext == true;
}, null, "2011-12-30T23:21:28Z", "mp");

//jst.x_setters = 0;
//jst.x_getters = 0;

jst.SmalltalkMethod.addMethod("suppressContext", "", "testing", function (){
	/*if (this._code.isGetter())
		jst.x_getters++;
	if (this._code.isSetter())
		jst.x_setters++;*/
	if (this._suppressContext == jst.nil) {
		this._suppressContext = this._code.isGetter() || this._code.isSetter();
	};
	return this._suppressContext == true;
}, null, "2011-12-30T23:26:58Z", "mp");

// doesNotUnderstand

jst.Object.addMethod("doesNotUnderstand:", "aMessage", "system primitives", function(aMessage) {
	//debug version
	jst.thisContext = jst.MethodContext.sender_receiver_method_arguments_(
		jst.thisContext, this, this.doesNotUnderstand_._method, [aMessage._selector]);
	var m = jst.MessageNotUnderstood._new();
	m._receiver = this;
	m._message = aMessage;
	m.signal_(this.className() + ">>" + aMessage._selector);
	//jst.sndw(m, "signal_", this.className() + ">>" + aMessage._selector);
});

//*** MethodContext ***

/*
jst.MethodContext._class.addMethod("initialize", "", "class initialization", function() {
	jst.Method.addInstVarName_("suppressContext");
	jst.Method.addInstVarName_("createBlockContext");
	jst.BlockClosure.methodDict().valuesDo_(function(m){
		if (m.selector().startsWith_("value"))
			m._createBlockContext = true;
		else if (m.selector().startsWith_("while") || m.selector().startsWith_("doWhile")
			|| m.selector().startsWith_("if") || m.selector().startsWith_("on:") 
			|| m.selector().startsWith_("ensure"))
			m._suppressContext = true;
	});
	jst.Boolean.methodDict().valuesDo_(function(m){
		if (m.selector().startsWith_("if"))
			m._suppressContext = true;
	});
	jst.Object.methodDict().valuesDo_(function(m){
		if (m.selector().startsWith_("ifN"))
			m._suppressContext = true;
	});
	jst.UndefinedObject.methodDict().valuesDo_(function(m){
		if (m.selector().startsWith_("ifN"))
			m._suppressContext = true;
	});
});
*/
jst.MethodContext._class.addMethod("initialize", "", "class initialization", 
	function (){
	jst.Method.addInstVarName_("suppressContext");
	jst.Method.addInstVarName_("createBlockContext");
	jst.Method.addInstVarName_("sent");
	jst.BlockClosure.methodDict().valuesDo_(function(m){
		if (m.selector().startsWith_("value"))
			m._createBlockContext = true;
		else if (m.selector().startsWith_("while") || m.selector().startsWith_("doWhile")
			|| m.selector().startsWith_("if") || m.selector().startsWith_("on:") 
			|| m.selector().startsWith_("ensure"))
			m._suppressContext = true;
	});
	jst.Boolean.methodDict().valuesDo_(function(m){
		if (m.selector().startsWith_("if") 
			|| m.selector().startsWith_("and:") || m.selector().startsWith_("or:"))
			m._suppressContext = true;
	});
	jst.Object.methodDict().valuesDo_(function(m){
		if (m.selector().startsWith_("ifN"))
			m._suppressContext = true;
	});
	jst.UndefinedObject.methodDict().valuesDo_(function(m){
		if (m.selector().startsWith_("ifN"))
			m._suppressContext = true;
	});
	//recompiling kernel methods
	jst.recompiled = 0;
	jst.Smalltalk.allClassesDo_(function(cls){
		cls._class.methodDict().values().copyWithAll_(cls.methodDict().values()).do_(function(m){
			if (!m.isNative() && (m.jsFile() == 'jst-kernel' || m.jsFile() == 'jst-collections')) {
				m.compile();
				jst.recompiled++};});});
},
	null, "2013-10-29T10:44:15Z", "mp");

jst.MethodContext.addMethod("home", "", "accessing", 
	"\t^ self",
	null, "2011-11-03T20:59:20Z", "mp");

jst.MethodContext.addMethod("method", "", "accessing", 
	"\t^ method",
	null, "2011-11-01T21:44:55Z", "mp");

jst.MethodContext.addMethod("receiver", "", "accessing", 
	"\t^ receiver",
	null, "2011-11-01T21:49:05Z", "mp");

jst.MethodContext.addMethod("printOn:", "aStream", "printing", 
	"\tsuper printOn: aStream." +
	"\n\tmethod selector = 'doesNotUnderstand:' ifTrue: [" +
	"\n\t\taStream space; " +
	"\n\t\t\tnextPut: $#;" +
	"\n\t\t\tnextPutAll: args first]",
	null, "2011-11-01T22:48:14Z", "mp");
/*
jst.MethodContext.addMethod("printOn:", "aStream", "printing", 
	"\taStream nextPutAll: 'xxx'",
	null, "2011-11-01T22:48:14Z", "mp");
*/
jst.MethodContext.addMethod("setSender:receiver:method:arguments:", "s r m argsArray", "private", function(s, r, m, argsArray) { 
	this._sender = s || jst.nil;
	this._receiver = r || jst.nil;
	this._method = m || jst.nil;
	this._args = argsArray || [];
	this._sendIndex = 0;
	if (this._method._sent) {
		if (this._method._sent == jst.nil)
			this._method._sent = 0;
		this._method._sent++;
	};
	return this;
}, null, "2011-10-21T18:27:40Z", "mp");

/*
jst.MethodContext.addMethod("setSender:receiver:method:arguments:", "s r m argsArray", "private", 
	function (s,r,m,argsArray){ 
	this._sender = s || jst.nil;
	this._receiver = r || jst.nil;
	this._method = m || jst.nil;
	this._args = argsArray || [];
	this._sendIndex = 0;
	if (this._args.length == 1 && this._args[0] && this._args[0]._homeContext == jst.nil  
		&& this._sender != jst.nil) {
		this._args[0]._homeContext = this._sender.home();
		jst.blockContexts++;
	};
	return this;
},
	null, "2013-11-01T07:59:06Z", "mp");
*/

/*
jst.MethodContext._class.addMethod("sender:receiver:method:arguments:", "s r m args", "instance creation", function(s, r, m, args) { 
	if (m._createBlockContext == true) {
		//Answer an instance of BlockContext with attributes set to the arguments
		return jst.BlockContext.sender_arguments_(s, args);
	};
	//Answer an instance of me with attributes set to the arguments
	return this.basicNew().setSender_receiver_method_arguments_(s, r, m, args);
}, null, "2011-12-29T23:24:00Z", "mp");
*/
jst.MethodContext._class.addMethod("sender:receiver:method:arguments:", "s r m args", "instance creation", function (s,r,m,args){ 
	if (m._createBlockContext == true) {
		//Answer an instance of BlockContext with attributes set to the arguments
		return jst.BlockContext._new().setSender_arguments_home_(s, args, r._homeContext);
	};
	//Answer an instance of me with attributes set to the arguments
	return this.basicNew().setSender_receiver_method_arguments_(s, r, m, args);
},
	null, "2013-11-01T09:36:02Z", "mp");

// Message

/*
jst.MethodContext._class.addMethod("sendTo:selector:withArguments:", "receiver selector args", "system primitives", 
function(receiver, selector, args) {
	//debug version with arguments
	if (receiver == null)
		receiver = jst.nil;
	else if (receiver.jstProxy)
		receiver = receiver.jstProxy;
	if (!receiver[selector]) 
		//if (typeof receiver[selector] != "function") 
		return jst.receiver_doesNotUnderstand_with_(receiver, selector, args);
	if (receiver[selector].suppressContext() == true)
		return receiver[selector].apply(receiver, args);
	var context = jst.thisContext = this.sender_receiver_method_arguments_(
		jst.thisContext, receiver, receiver[selector]._method, args);
	var result = receiver[selector].apply(receiver, args);
	jst.thisContext = context.sender();
	return result;
}, "send");

jst.Message._class.addMethod("sendTo:selector:withArguments:", "receiver selector args", "debug primitives", 
function(receiver, selector, args) {
	//debug version with arguments
	if (receiver == null)
		receiver = jst.nil;
	else if (receiver.jstProxy)
		receiver = receiver.jstProxy;
	var fce;
	if (!(fce = receiver[selector])) 
		//if (typeof receiver[selector] != "function") 
		return jst.receiver_doesNotUnderstand_with_(receiver, selector, args);
	if (fce._method && fce.suppressContext() == true)
		return fce.apply(receiver, args);
	var context = jst.thisContext = jst.MethodContext.sender_receiver_method_arguments_(
		jst.thisContext, receiver, fce._method, args);
	var result = fce.apply(receiver, args);
	jst.thisContext = context.sender();
	return result;
});
*/
jst.blockContexts = 0;

jst.return = function (arg){
	if (arg && arg._homeContext == jst.nil && jst.thisContext != jst.nil) { 
		arg._homeContext = jst.thisContext.home();
		jst.blockContexts++;
	};
	return arg;
};
jst.Message._class.addMethod("return:", "arg", "debug primitives", jst.return,
	null, "2013-11-02T21:19:18Z", "mp");

jst.assign = function (obj,attName,arg){
	if (arg && arg._homeContext == jst.nil && jst.thisContext != jst.nil) { 
		arg._homeContext = jst.thisContext.home();
		jst.blockContexts++;
	};
	return obj[attName] = arg;
};
jst.Message._class.addMethod("assign:to:argument:", "obj attName arg", "debug primitives", 
	jst.assign, null, "2013-11-02T23:06:42Z", "mp");

jst.Message._class.addMethod("sendTo:selector:withArguments:", "receiver selector args", "debug primitives", 
	function (receiver,selector,args){
	//debug version with arguments
	if (receiver == null)
		receiver = jst.nil;
	else if (receiver.jstProxy)
		receiver = receiver.jstProxy;
	var fce;
	if (!(fce = receiver[selector])) 
		//if (typeof receiver[selector] != "function") 
		return jst.receiver_doesNotUnderstand_with_(receiver, selector, args);
	if (fce._method && args && args.length > 0 && jst.thisContext != jst.nil) { 
		for (var i = 0; i < args.length; i++) {
			if (args[i] && args[i]._homeContext == jst.nil) {
				args[i]._homeContext = jst.thisContext.home();
				jst.blockContexts++;
			};
		};
	};
	if (fce._method && fce.suppressContext() == true)
		return fce.apply(receiver, args);
	var context = jst.thisContext = jst.MethodContext.sender_receiver_method_arguments_(
		jst.thisContext, receiver, fce._method, args);
	var result = fce.apply(receiver, args);
	jst.thisContext = context.sender();
	return result;
},
	null, "2013-11-01T11:02:50Z", "mp", 1);

jst.Message._class.addMethod("sendTo:selector:withArguments:", "receiver selector args", "debug primitives", 
	function (receiver,selector,args){
	//debug version with arguments
	if (receiver == null)
		receiver = jst.nil;
	else if (receiver.jstProxy)
		receiver = receiver.jstProxy;
	var fce;
	if (!(fce = receiver[selector])) 
		//if (typeof receiver[selector] != "function") 
		return jst.receiver_doesNotUnderstand_with_(receiver, selector, args);
	if (fce._method && args && args.length > 0 && jst.thisContext != jst.nil) { 
		for (var i = 0; i < args.length; i++) {
			if (args[i] && args[i]._homeContext == jst.nil) {
				args[i]._homeContext = jst.thisContext.home();
				jst.blockContexts++;
			};
		};
	};
	if (!fce.suppressContext || fce.suppressContext() == true)
		return fce.apply(receiver, args);
	var context = jst.thisContext = jst.MethodContext.sender_receiver_method_arguments_(
		jst.thisContext, receiver, fce._method, args);
	var result = fce.apply(receiver, args);
	jst.thisContext = context.sender();
	return result;
},
	null, "2014-01-04T21:40:51Z", "mp"); //jst-debug

/*
jst.MethodContext._class.addMethod("superSendTo:selector:with:inClass:", "receiver selector args aClass", "system primitives", 
function(receiver, selector, args, aClass) {
	//debug version
	if (receiver == null)
		receiver = jst.nil;
	//musim najit super protokol, ktery implementuje stejnojmennou metodu
	var protocol = (aClass || receiver.class()).superclass().protocol();
	if (!protocol[selector])
		//if (typeof protocol[selector] != "function")
		return protocol.doesNotUnderstand_with_(selector.asSelector(), args);
	var context = jst.thisContext = this.sender_receiver_method_arguments_(
		jst.thisContext, receiver, protocol[selector]._method, args);
	var result = protocol[selector].apply(receiver, args);
	jst.thisContext = context.sender();
	return result;
}, "superSend");
*/
jst.Message._class.addMethod("superSendTo:selector:with:inClass:", "receiver selector args aClass", "debug primitives", 
function(receiver, selector, args, aClass) {
	//debug version
	if (receiver == null)
		receiver = jst.nil;
	//we have to find the superclass protocol
	var protocol = (aClass || receiver.klass()).superclass().protocol();
	if (!(fce = protocol[selector]))
		//if (typeof protocol[selector] != "function")
		return protocol.doesNotUnderstand_with_(selector.asSelector(), args);
	var context = jst.thisContext = jst.MethodContext.sender_receiver_method_arguments_(
		jst.thisContext, receiver, fce._method, args);
	var result = fce.apply(receiver, args);
	jst.thisContext = context.sender();
	return result;
});

/*
jst.MethodContext._class.addMethod("sendTo:selector:", "receiver selector", "system primitives", 
function(receiver, selector) {
	//debug version without arguments
	if (receiver == null)
		receiver = jst.nil;
	else if (receiver.jstProxy)
		receiver = receiver.jstProxy;
	if (!receiver[selector])
		//if (typeof receiver[selector] != "function")
		return jst.receiver_doesNotUnderstand_with_(receiver, selector, []);
	if (receiver[selector].suppressContext() == true)
		return receiver[selector]();
	var context = jst.thisContext = this.sender_receiver_method_arguments_(
		jst.thisContext, receiver, receiver[selector]._method);
	var result = receiver[selector]();
	jst.thisContext = context.sender();
	return result;
}, "snd");
*/
jst.Message._class.addMethod("sendTo:selector:", "receiver selector", "debug primitives", 
	function(receiver, selector) {
	//debug version without arguments
	if (receiver == null)
		receiver = jst.nil;
	else if (receiver.jstProxy)
		receiver = receiver.jstProxy;
	var fce;
	if (!(fce = receiver[selector]))
		//if (typeof receiver[selector] != "function")
		return jst.receiver_doesNotUnderstand_with_(receiver, selector, []);
	if (fce.suppressContext() == true)
		return fce.call(receiver);
	var context = jst.thisContext = jst.MethodContext.sender_receiver_method_arguments_(
		jst.thisContext, receiver, fce._method);
	var result = fce.call(receiver);
	jst.thisContext = context.sender();
	return result;
},
	null, "2013-11-01T11:02:50Z", "mp", 1);

jst.Message._class.addMethod("sendTo:selector:", "receiver selector", "debug primitives", 
	function (receiver,selector){
	//debug version without arguments
	if (receiver == null)
		receiver = jst.nil;
	else if (receiver.jstProxy)
		receiver = receiver.jstProxy;
	var fce;
	if (!(fce = receiver[selector]))
		//if (typeof receiver[selector] != "function")
		return jst.receiver_doesNotUnderstand_with_(receiver, selector, []);
	if (!fce.suppressContext || fce.suppressContext() == true)
		return fce.call(receiver);
	var context = jst.thisContext = jst.MethodContext.sender_receiver_method_arguments_(
		jst.thisContext, receiver, fce._method);
	var result = fce.call(receiver);
	jst.thisContext = context.sender();
	return result;
},
	null, "2014-01-04T21:35:04Z", "mp"); //jst-debug

jst.x_send1 = 0;
jst.x_send2 = 0;

jst.send = function(receiver, selector, args, index) {
	//debug version with arguments
	if (jst.thisContext.notNil()) {
		jst.x_send1 += 1;
		if (index) 
			jst.thisContext._sendIndex = index;
		return jst.Message.sendTo_selector_withArguments_(receiver, selector, args);
	};
	try {
		jst.x_send2 += 1;
		return jst.Message.sendTo_selector_withArguments_(receiver, selector, args);
	}
	catch (error) {
		// Reset the context stack in any case
		return jst.thisContext.handleSignal_(error);
	}
};
jst.Message._class.addMethod("sendTo:selector:withArguments:index:", "receiver selector args index", "debug primitives", jst.send);

jst.snd = function(receiver, selector, index) {
	//debug version without arguments
	if (jst.thisContext.notNil()) {
		jst.x_send1 += 1;
		if (index) 
			jst.thisContext._sendIndex = index;
		return jst.Message.sendTo_selector_(receiver, selector);
	};
	try {
		jst.x_send2 += 1;
		return jst.Message.sendTo_selector_(receiver, selector);
	}
	 catch(error) {
		// Reset the context stack in any case
		return jst.thisContext.handleSignal_(error);
	}
};
jst.Message._class.addMethod("sendTo:selector:index:", "receiver selector index", "debug primitives", jst.snd);

jst.superSend = function(receiver, selector, args, aClass, index) {
	//debug version
	if (jst.thisContext.notNil()) {
		jst.x_send1 += 1;
		if (index) 
			jst.thisContext._sendIndex = index;
		return jst.Message.superSendTo_selector_with_inClass_(receiver, selector, args, aClass);
	};
	try {
		jst.x_send2 += 1;
		return jst.Message.superSendTo_selector_with_inClass_(receiver, selector, args, aClass);
	}
	catch(error) {
		// Reset the context stack in any case
		return jst.thisContext.handleSignal_(error);
	}
};
jst.Message._class.addMethod("superSendTo:selector:with:inClass:index:", 
	"receiver selector args aClass index", "debug primitives", jst.superSend);

jst.sndw = function(receiver, selector, arg, index) {
	//debug version
	return jst.send(receiver, selector, [arg], index);
};
jst.Message._class.addMethod("sendTo:selector:with:index:", "receiver selector arg index", "debug primitives", jst.sndw);

jst.sndww = function(receiver, selector, arg1, arg2, index) {
	//debug version
	return jst.send(receiver, selector, [arg1, arg2], index);
};
jst.Message._class.addMethod("sendTo:selector:with:with:index:", "receiver selector arg1 arg2 index", "debug primitives", jst.sndww);

jst.sndwww = function(receiver, selector, arg1, arg2, arg3, index) {
	//debug version
	return jst.send(receiver, selector, [arg1, arg2, arg3], index);
};
jst.Message._class.addMethod("sendTo:selector:with:with:with:index:", "receiver selector arg1 arg2 arg3 index", "debug primitives", jst.sndwww);

//Error

jst.Error.addMethod("signalerContext", "", "accessing", 
	"\t^ signalContext",
	null, "2011-12-17T21:52:39Z", "mp");

// *** BreakPoint ***

jst.Object.addMethod("break", "", "error handling", 
	"\tBreakPoint signalOn: self",
	null, "2012-01-07T17:53:09Z", "mp");

// doIt

/*
jst.SystemDictionary.constructor.prototype.doIt_ = function(code) {
	//v javascriptu lze volat jako jst.doIt("...")
	//ve Smalltalku jako Smalltalk doIt: '...'
	var p = jst.Parser.on_("DoIt\n\t" + code);
	var m = p.parseMethod();
	var context = jst.thisContext = jst.MethodContext.sender_receiver_method_arguments_(
		jst.thisContext, jst.nil, m, []);
	var result = jst.Parser.parseCode_(code).doIt();
	jst.thisContext = context.sender();
	return result;
};

jst.SystemDictionary.addMethod("doIt:", "code", "utils");

jst.SystemDictionary.constructor.prototype.printIt_ = function(code) {
	//v javascriptu lze volat jako jst.printIt("...")
	//ve Smalltalku jako Smalltalk printIt: '...'
	var result = jst.doIt(code);
	return (result != null) ? result.toString() : "nil";
};
jst.SystemDictionary.addMethod("printIt:", "code", "utils");
*/

/*
jst.SystemDictionary.constructor.prototype.doIt_ = function(code) {
	//debug version
	//v javascriptu lze volat jako jst.doIt("...")
	//ve Smalltalku jako Smalltalk doIt: '...'
	return jst.MethodContext.snd(jst.MethodContext.send(jst.Parser, "parseCode:", [code]), "doIt");
};
*/

jst.Object.addMethod("doIt:", "aString", "*kernel-parser", function (aString){
	//debug version
	var m = jst.Parser.parseMethod_of_("DoIt\n\t" + aString, this.klass());
	if (m.code().expressions().size() > 0 && !m.code().expressions().last().isReturn()) {
		var exp = m.code().expressions().pop();
		m.code().expressions().add_(jst.Return._new().expression_(exp));
	};
	var result = jst.snd(m, "parseCode");
	result = jst.snd(result, "doIt");
	var context = jst.thisContext = jst.MethodContext.sender_receiver_method_arguments_(
		jst.thisContext, this, m, []);
	result = result.call(this);
	jst.thisContext = context.sender();
	return result;
}, null, "2012-01-11T08:34:41Z", "mp");

jst.Object.addMethod("doIt:", "aString", "*kernel-parser", function (aString){
	//debug version
	var m = jst.Parser.parseMethod_of_("DoIt\n\t" + aString, 
		this.isBehavior() ? this.classSide() : this.klass());
	if (m.code().expressions().size() > 0 && !m.code().expressions().last().isReturn()) {
		var exp = m.code().expressions().pop();
		m.code().expressions().add_(jst.Return._new().expression_(exp));
	};
	var result = jst.snd(m, "parseCode");
	result = jst.snd(result, "doIt");
	var context = jst.thisContext = jst.MethodContext.sender_receiver_method_arguments_(
		jst.thisContext, this.isBehavior() ? this.instanceSide() : this, m, []);
	result = result.call(context.receiver());
	jst.thisContext = context.sender();
	return result;
},
	null, "2013-11-06T15:39:04Z", "mp"); //jst-debug

/*
jst.BlockEvaluatingError.block_calledWith_ = function(aBlock, numArgs){
	//debug version
	//blok se nevyhodnocuje, id bloku tedy nactu z kodu a nastavim rucne
	var src = aBlock.toString();
	jst.thisContext._block = src.substr(src.indexOf("_block =")+9, 1).asNumber();
	this.signal_on_("This block accepts {1} argument{2}, but was called with {3}.".format_(
		[aBlock.numArgs(), (aBlock.numArgs() == 1) ? "" : "s", numArgs]), aBlock);
};
jst.BlockEvaluatingError._class.addMethod("block:calledWith:", "aBlock numArgs", "instance creation");

jst.BlockEvaluatingError.block_evaluatedBy_with_ = function(aBlock, aSymbol, args){
	//debug version
	if (jst.thisContext._block && jst.thisContext._block == jst.nil) {
		//blok se nevyhodnocuje, id bloku tedy nactu z kodu a nastavim rucne
		var src = aBlock.toString();
		jst.thisContext._block = src.substr(src.indexOf("_block =")+9, 1).asNumber();
	}; 
	jst.thisContext = jst.MethodContext._new().setSender_receiver_method_arguments_(
		jst.thisContext, aBlock, jst.BlockClosure.methodDict().at_(aSymbol), args);
	this.signal_on_("This block accepts {1} argument{2}, but was called with {3}.".format_(
		[aBlock.numArgs(), (aBlock.numArgs() == 1) ? "" : "s", args.length]), aBlock);
};
jst.BlockEvaluatingError._class.addMethod("block:evaluatedBy:with:", "aBlock aSymbol args", "instance creation");
*/

jst.BlockEvaluatingError._class.addMethod("block:evaluatedBy:with:", "aBlock aSymbol args", "instance creation", 
	function (aBlock,aSymbol,args){
	//debug version
	if (jst.thisContext._block && jst.thisContext._block == jst.nil) {
		//blok se nevyhodnocuje, id bloku tedy nactu z kodu a nastavim rucne
		var src = aBlock.toString();
		jst.thisContext._block = src.substr(src.indexOf("_block =")+9, 1).asNumber();
		jst.thisContext._args = args;
		jst.thisContext = jst.MethodContext._new().setSender_receiver_method_arguments_(
			jst.thisContext.sender(), jst.thisContext, jst.BlockClosure.methodDict().at_(aSymbol), args);
	} else
		jst.thisContext = jst.MethodContext._new().setSender_receiver_method_arguments_(
			jst.thisContext.sender(), aBlock, jst.BlockClosure.methodDict().at_(aSymbol), args);
	this.signal_on_("This block accepts {1} argument{2}, but was called with {3}.".format_(
		[aBlock.numArgs(), (aBlock.numArgs() == 1) ? "" : "s", args.length]), aBlock);
},
	null, "2012-02-08T09:02:41Z", "mp");

//SequenceableCollection
/*
jst.SequenceableCollection.constructor.prototype.do_ = function (aBlock){
	//debug version
	var args = [jst.nil];
	var context = jst.thisContext = jst.BlockContext.sender_arguments_(jst.thisContext, args);
	if (this.forEach) {
		this.forEach(function (ea){
			aBlock.value_(args[0] = ea);});
		jst.thisContext = context.sender();
		return this;
	};
	for (var i = 1; i <= this.size(); i++)
		aBlock.value_(args[0] = this.at_(i));
	jst.thisContext = context.sender();
	return this.yourself(); //String needs yourself
};
jst.SequenceableCollection.addMethod("do:", "aBlock", "enumerating");
*/

/* very experimental - trying to create a block context for native method - asi nanic, zatim se nijak neprojevuje
jst.JSObjectProxy.addMethod("doesNotUnderstand:with:", "selector args", "system primitives", 
	function (selector,args){
	//debug version
	var fce = this._jsObject[selector];
	if (fce && fce.apply) {
		//fce is function of js object
		var context = jst.thisContext = jst.BlockContext.sender_arguments_(jst.thisContext, args);
		context._block = fce;
		var result = fce.apply(this._jsObject, args);
		jst.thisContext = context.sender();
		return result;
	};
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
	return this.doesNotUnderstand_(jst.Message.selector_arguments_(selector, jst.Array.adopt_(args)));
},
	null, "2013-10-04T11:46:58Z", "mp");
*/

// Block

jst.Block.addMethod("printOn:", "aStream", "printing", 
	"\taStream nextPutAll: code printSource",
	null, "2013-10-11T12:42:15Z", "mp");

/*
jst.Block.constructor.prototype.initContextString = function() {
	//debug version
	var src = "";
	if (this._home != jst.nil && this._home._selector != "DoIt" 
		&& this._home._code._expressions.size() == 1
		&& this._home._code._expressions.first().isReturn()
		&& this._home._code._expressions.first()._expression == this)
		//src = "; if (jst.thisContext._home == jst.nil) jst.thisContext._method = jst."
		//	+ this._home._receiver.name() + ".methodDict().at_('" + this._home._selector + "')";
		src = "; if (jst.thisContext._home == jst.nil) jst.thisContext._home = "
			+ "jst.MethodContext.sender_receiver_method_arguments_(jst.nil, self, jst."
			+ this._home._receiver.name() + ".methodDict().at_('" + this._home._selector + "'), [])";
	return "if (jst.thisContext != jst.nil) {jst.thisContext._block = " + this._id + src + "}; ";
};
*/
jst.Block.addMethod("initContextString", "", "private", function() {
	//debug version
	var str = "";
	var self = this;
	/* po zavedeni jst.return neni potreba
	if (this._home != jst.nil && this._home._selector != "DoIt") {
		this._home._code.do_(function(exp){
			if ((exp.isReturn() && exp._expression == self) 
				|| (exp.isAssignment() && exp._expression == self && !exp._variable.isTempVar())
				|| (exp.asMessage() === exp && exp.selector() == "on:do:" //only events 
					&& exp.arguments().first().isConstant() && exp.arguments().second() === self)) {
				str = "if (jst.thisContext._home == jst.nil) jst.thisContext._home = "
					+ "jst.MethodContext.sender_receiver_method_arguments_(jst.nil, self, "
					+ self._home._receiver.javascriptName() + ".methodDict().at_('" + self._home._selector + "'), []); ";
			}
		});
	};*/
	if (this._id == jst.nil)
		return str; 
	str = "if (jst.thisContext._class == jst.BlockContext) {" + str + "jst.thisContext._block = " + this._id;
	if (this._code._tempVars.length > 0) {
		str += "; jst.thisContext._args = jst.thisContext._args.concat([" + this._code._tempVars[0];
		for (var i = 1; i < this._code._tempVars.length; i++)
			str += "," + this._code._tempVars[i];
		str += "])";
	};
	return str + "}; "
});
jst.Block.addMethod("initContextString", "", "private");

jst.Method.constructor.prototype.initContextString = function() {
	//debug version
	var str = "";
	if (this._code._tempVars.length > 0) {
		//str = "if (arguments.length > 0 && arguments[arguments.length-1]._args) {arguments[arguments.length-1]._args = arguments[arguments.length-1]._args.concat([" + this._code._tempVars[0];
		str = "if (jst.thisContext._class == jst.MethodContext) {jst.thisContext._args = jst.thisContext._args.concat([" + this._code._tempVars[0];
		for (var i = 1; i < this._code._tempVars.length; i++)
			str += "," + this._code._tempVars[i];
		str += "])}; ";
	};
	return str;
};
jst.Method.addMethod("initContextString", "", "private");

// *** Debug versions of selected core methods ***

//Object

jst.Object.addMethod("ifNotNil:", "notNilBlock", "testing", function (notNilBlock){
	return jst.snd(notNilBlock, "value");
},
	null, "2013-10-24T06:19:58Z", "mp");

jst.Object.addMethod("ifNil:ifNotNil:", "nilBlock notNilBlock", "testing", function (nilBlock,notNilBlock){
	return jst.snd(notNilBlock, "value");
},
	null, "2013-10-24T06:18:55Z", "mp");

jst.Object.addMethod("ifNotNil:ifNil:", "notNilBlock nilBlock", "testing", function (notNilBlock,nilBlock){
	return jst.snd(notNilBlock, "value");
},
	null, "2013-10-24T06:20:13Z", "mp");

jst.Object.addMethod("ifNotNilDo:", "aBlock", "testing", function (aBlock){
	//String needs yourself
	return jst.sndw(aBlock, "value_", this.yourself());
},
	null, "2013-10-24T06:20:56Z", "mp");

jst.Object.addMethod("ifNil:ifNotNilDo:", "nilBlock aBlock", "testing", function (nilBlock,aBlock){
	//String needs yourself
	return jst.sndw(aBlock, "value_", this.yourself());
},
	null, "2013-10-24T06:21:12Z", "mp");

//UndefinedObject

jst.UndefinedObject.addMethod("ifNil:", "nilBlock", "testing", function (nilBlock){
	return jst.snd(nilBlock, "value");
},
	null, "2013-10-24T06:25:55Z", "mp");

jst.UndefinedObject.addMethod("ifNil:ifNotNil:", "nilBlock notNilBlock", "testing", function (nilBlock,notNilBlock){
	return jst.snd(nilBlock, "value");
},
	null, "2013-10-24T06:26:14Z", "mp");

jst.UndefinedObject.addMethod("ifNil:ifNotNilDo:", "nilBlock aBlock", "testing", function (nilBlock,aBlock){
	return jst.snd(nilBlock, "value");
},
	null, "2013-10-24T06:26:33Z", "mp");

jst.UndefinedObject.addMethod("ifNotNil:ifNil:", "notNilBlock nilBlock", "testing", function (notNilBlock,nilBlock){
	return jst.snd(nilBlock, "value");
},
	null, "2013-10-24T06:26:52Z", "mp");

jst.UndefinedObject.addMethod("ifNotNilDo:ifNil:", "aBlock nilBlock", "testing", function (aBlock,nilBlock){
	return jst.snd(nilBlock, "value");
},
	null, "2013-10-24T06:27:09Z", "mp");

//Boolean

jst.Boolean.addMethod("ifTrue:", "aBlock", "controlling", function (aBlock){
	return (this == true) ? jst.snd(aBlock,"value") : jst.nil;
},
	null, "2013-10-24T21:32:22Z", "mp");

jst.Boolean.addMethod("ifFalse:", "aBlock", "controlling", function (aBlock){
	return (this == false) ? jst.snd(aBlock,"value") : jst.nil;
},
	null, "2013-10-24T06:32:28Z", "mp");

jst.Boolean.addMethod("ifFalse:ifTrue:", "falseBlock trueBlock", "controlling", function (falseBlock,trueBlock){
	return (this == true) ? jst.snd(trueBlock,"value") : jst.snd(falseBlock,"value");
},
	null, "2013-10-24T06:33:01Z", "mp");

jst.Boolean.addMethod("ifTrue:ifFalse:", "trueBlock falseBlock", "controlling", function (trueBlock,falseBlock){
	return (this == true) ? jst.snd(trueBlock,"value") : jst.snd(falseBlock,"value");
},
	null, "2013-10-24T06:33:22Z", "mp");

jst.Boolean.addMethod("and:", "aBlock", "controlling", function (aBlock){
	//debug version
	return (this == true) && (jst.snd(aBlock, "value") == true);
},
	null, "2013-10-24T06:30:02Z", "mp");

jst.Boolean.addMethod("and:and:", "block1 block2", "controlling", function (block1,block2){
	//debug version
	return (this == true) && (jst.snd(block1, "value") == true) && (jst.snd(block2, "value") == true);
},
	null, "2013-10-24T06:30:34Z", "mp");

jst.Boolean.addMethod("and:and:and:", "block1 block2 block3", "controlling", function (block1,block2,block3){
	//debug version
	return (this == true) && (jst.snd(block1,"value") == true) && (jst.snd(block2,"value") == true) && (jst.snd(block3,"value") == true);
},
	null, "2013-10-24T06:31:15Z", "mp");

jst.Boolean.addMethod("and:and:and:and:", "block1 block2 block3 block4", "controlling", function (block1,block2,block3,block4){
	//debug version
	return (this == true) && (jst.snd(block1,"value") == true) && (jst.snd(block2,"value") == true) && (jst.snd(block3,"value") == true) && (jst.snd(block4,"value") == true);
},
	null, "2013-10-24T06:32:10Z", "mp");

jst.Boolean.addMethod("or:", "aBlock", "controlling", function (aBlock){
	//debug version
	return (this == true) || (jst.snd(aBlock,"value") == true);
},
	null, "2013-10-24T06:33:45Z", "mp");

jst.Boolean.addMethod("or:or:", "block1 block2", "controlling", function (block1,block2){
	//debug version
	return (this == true) || (jst.snd(block1,"value") == true) || (jst.snd(block2,"value") == true);
},
	null, "2013-10-24T06:34:09Z", "mp");

jst.Boolean.addMethod("or:or:or:", "block1 block2 block3", "controlling", function (block1,block2,block3){
	//debug version
	return (this == true) || (jst.snd(block1,"value") == true) || (jst.snd(block2,"value") == true) || (jst.snd(block3,"value") == true);
},
	null, "2013-10-24T06:35:01Z", "mp");

jst.Boolean.addMethod("or:or:or:or:", "block1 block2 block3 block4", "controlling", function (block1,block2,block3,block4){
	//debug version
	return (this == true) || (jst.snd(block1,"value") == true) || (jst.snd(block2,"value") == true) || (jst.snd(block3,"value") == true) || (jst.snd(block4,"value") == true);
},
	null, "2013-10-24T06:36:01Z", "mp");

//BlockClosure

/*
jst.BlockClosure.addMethod("whileTrue:", "aBlock", "controlling", function (aBlock){
	while (jst.snd(this, "value") == true)
		jst.snd(aBlock,"value");
	return jst.nil;
},
	null, "2013-10-24T13:16:33Z", "mp");

jst.BlockClosure.addMethod("whileTrue", "", "controlling", function (){
	while (jst.snd(this,"value") == true)
		;
	return jst.nil;
},
	null, "2013-10-24T13:59:31Z", "mp");

jst.BlockClosure.addMethod("doWhileTrue:", "conditionBlock", "controlling", function (conditionBlock){
	var result = jst.snd(this,"value");
	while (jst.snd(conditionBlock, "value") == true)
		result = jst.snd(this,"value");
	return result;
},
	null, "2013-10-24T14:01:51Z", "mp");

jst.BlockClosure.addMethod("whileFalse:", "aBlock", "controlling", function (aBlock){
	while (jst.snd(this,"value") == false)
		jst.snd(aBlock,"value");
	return jst.nil;
},
	null, "2013-10-24T14:00:20Z", "mp");

jst.BlockClosure.addMethod("whileFalse", "", "controlling", function (){
	while (jst.snd(this,"value") == false)
		;
	return jst.nil;
},
	null, "2013-10-24T14:00:40Z", "mp");

jst.BlockClosure.addMethod("doWhileFalse:", "conditionBlock", "controlling", function (conditionBlock){
	var result = jst.snd(this,"value");
	while (jst.snd(conditionBlock, "value") == false)
		result = jst.snd(this,"value");
	return result;
},
	null, "2013-10-24T14:02:33Z", "mp");
*/
jst.BlockClosure.addMethod("whileTrue", "", "controlling", function () {
	var context = jst.thisContext = jst.BlockContext.sender_arguments_(jst.thisContext);
	while (this.call(this) == true)
		;
	jst.thisContext = context.sender();
	return jst.nil;
},
	null, "2013-10-25T10:16:01Z", "mp");

jst.BlockClosure.addMethod("whileTrue:", "aBlock", "controlling", function (aBlock) {
	var context = jst.thisContext = jst.BlockContext.sender_arguments_(jst.thisContext);
	while (this.call(this) == true)
		aBlock.value();
	jst.thisContext = context.sender();
	return jst.nil;
},
	null, "2013-10-25T18:29:21Z", "mp");

jst.BlockClosure.addMethod("whileFalse:", "aBlock", "controlling", function (aBlock) {
	var context = jst.thisContext = jst.BlockContext.sender_arguments_(jst.thisContext);
	while (this.call(this) == false)
		aBlock.value();
	jst.thisContext = context.sender();
	return jst.nil;
},
	null, "2013-10-25T18:33:59Z", "mp");

jst.BlockClosure.addMethod("whileFalse", "", "controlling", function () {
	var context = jst.thisContext = jst.BlockContext.sender_arguments_(jst.thisContext);
	while (this.call(this) == false)
		;
	jst.thisContext = context.sender();
	return jst.nil;
},
	null, "2013-10-25T18:34:47Z", "mp");

jst.BlockClosure.addMethod("doWhileTrue:", "conditionBlock", "controlling", function (conditionBlock) {
	var context = jst.thisContext = jst.BlockContext.sender_arguments_(jst.thisContext);
	var result = this.call(this);
	while (conditionBlock.value() == true)
		result = this.call(this);
	jst.thisContext = context.sender();
	return result;
},
	null, "2013-10-25T18:36:55Z", "mp");

jst.BlockClosure.addMethod("doWhileFalse:", "conditionBlock", "controlling", function (conditionBlock){
	var context = jst.thisContext = jst.BlockContext.sender_arguments_(jst.thisContext);
	var result = this.call(this);
	while (conditionBlock.value() == false)
		result = this.call(this);
	jst.thisContext = context.sender();
	return result;
},
	null, "2013-10-25T18:38:06Z", "mp");

jst.BlockClosure.addMethod("ensure:", "aBlock", "exceptions", function (aBlock){
	var ctx = jst.thisContext;
	var result;
	try {
		result = jst.snd(this,"value");
		var b = aBlock;
		aBlock = null;
		jst.snd(b,"value");
	} catch(ex) {
		jst.thisContext = ctx;
		if (aBlock)
			jst.snd(aBlock,"value");
		throw ex;
	};
	return result;
},
	null, "2013-10-29T10:28:24Z", "mp"); //jst-debug

//Collection

jst.Collection.addMethod("asSortedCollection:", "aSortBlock", "converting", function (aSortBlock){
	var c = jst.SortedCollection.sortBlock_(aSortBlock);
	jst.sndw(c, "addAll_", this);
	return c;
},
	null, "2013-10-26T20:44:27Z", "mp");

//Dictionary

jst.Dictionary.addMethod("at:ifAbsent:", "key aBlock", "accessing", function (key,aBlock){
	//in a native javascript code can by used without the second parameter, in that case returns null
	if (this._map.hasOwnProperty(key))
		return this._map[key];
	return (aBlock != null) ? jst.snd(aBlock,"value") : null;
},
	null, "2013-10-24T08:06:09Z", "mp");

jst.Dictionary.addMethod("at:ifAbsentPut:", "key aBlock", "accessing", function (key,aBlock){
	var self = this;
	return self.at_ifAbsent_(key, function(){
		return self.at_put_(key, jst.snd(aBlock, "value"));
	});
},
	null, "2013-10-24T08:06:42Z", "mp");

jst.Dictionary.addMethod("at:ifAbsentPut:", "key aBlock", "accessing", function (key,aBlock){
	var self = this;
	return self.at_ifAbsent_(key, function(){
		return self.at_put_(key, jst.snd(aBlock, "value"));
	});
},
	null, "2013-10-24T08:06:49Z", "mp");

jst.Dictionary.addMethod("at:ifPresent:", "key aBlock", "accessing", function (key,aBlock){
	if (this._map.hasOwnProperty(key))
		return jst.sndw(aBlock,"value_",this.at_(key));
	return jst.nil;
},
	null, "2013-10-24T08:07:26Z", "mp");

jst.Dictionary.addMethod("removeKey:ifAbsent:", "key aBlock", "removing", function (key,aBlock){
	if (key in this._map) {
		var result = this.at_(key);
		delete this._map[key];
		return result;
	};
	return jst.snd(aBlock,"value");
},
	null, "2013-10-24T11:22:00Z", "mp");

/*
jst.Dictionary.addMethod("keysAndValuesDo:", "aBlock", "enumerating", function (aBlock){
	for (var key in this._map) {
		jst.sndww(aBlock, "value_value_", key, this._map[key]);
	};
	return this;
},
	null, "2013-10-24T14:09:48Z", "mp"); //jst-core

jst.Dictionary.addMethod("keysDo:", "aBlock", "enumerating", function (aBlock){
	return this.keysAndValuesDo_(function(key, value){
		jst.sndw(aBlock, "value_", key);
	});
},
	null, "2013-10-24T14:10:31Z", "mp"); //jst-core

jst.Dictionary.addMethod("valuesDo:", "aBlock", "enumerating", function (aBlock){
	return this.keysAndValuesDo_(function(key, value){
		jst.sndw(aBlock, "value_", value);
	});
},
	null, "2013-10-24T14:10:55Z", "mp"); //jst-core
*/
jst.Dictionary.addMethod("keysAndValuesDo:", "aBlock", "enumerating", function (aBlock){
	var args = [jst.nil, jst.nil];
	var context = jst.thisContext = jst.BlockContext.sender_arguments_(jst.thisContext, args);
	for (var key in this._map)
		aBlock.value_value_(args[0] = key, args[1] = this._map[key]);
	jst.thisContext = context.sender();
	return this;
},
	null, "2013-10-25T07:33:03Z", "mp");

jst.Dictionary.addMethod("detect:ifNone:", "aBlock exceptionBlock", "enumerating", function (aBlock,exceptionBlock){
	var args = [jst.nil];
	var context = jst.thisContext = jst.BlockContext.sender_arguments_(jst.thisContext, args);
	for (var key in this._map) {
		if (aBlock.value_(args[0] = this._map[key]) == true) {
			jst.thisContext = context.sender();
			return args[0];
		};
	};
	jst.thisContext = context.sender();
	return jst.snd(exceptionBlock,"value");
},
	null, "2013-10-26T20:05:39Z", "mp");

//SequenceableCollection

jst.SequenceableCollection.addMethod("at:ifAbsent:", "index exceptionBlock", "accessing", function (index,exceptionBlock){
	if (index > 0 && index <= this.size())
		return this.at_(index);
	return (exceptionBlock != null) ? jst.snd(exceptionBlock, "value") : null;
},
	null, "2013-10-24T14:40:28Z", "mp");

/*
jst.SequenceableCollection.addMethod("do:", "aBlock", "enumerating", function (aBlock){
	for (var i = 1; i <= this.size(); i++)
		jst.sndw(aBlock, "value_", this.at_(i));
	return this.yourself(); //String needs yourself
},
	null, "2013-10-24T14:27:23Z", "mp");

jst.SequenceableCollection.addMethod("detect:ifNone:", "aBlock exceptionBlock", "enumerating", function (aBlock,exceptionBlock){
	for (var i = 1; i <= this.size(); i++)
		if (jst.sndw(aBlock, "value_", this.at_(i)) == true)
			return this.at_(i);
	return jst.snd(exceptionBlock, "value");
},
	null, "2013-10-24T14:29:11Z", "mp");

jst.SequenceableCollection.addMethod("withIndexDo:", "elementAndIndexBlock", "enumerating", function (elementAndIndexBlock){
	for (var i = 1; i <= this.size(); i++)
		jst.sndww(elementAndIndexBlock, "value_value_", this.at_(i), i);
	return this.yourself(); //String needs yourself
},
	null, "2013-10-24T14:30:16Z", "mp");
*/


jst.SequenceableCollection.addMethod("do:", "aBlock", "enumerating", function (aBlock){
	var args = [jst.nil];
	var context = jst.thisContext = jst.BlockContext.sender_arguments_(jst.thisContext, args);
	for (var i = 1; i <= this.size(); i++) {
		aBlock.value_(args[0] = this.at_(i));
	};
	jst.thisContext = context.sender();
	return this.yourself(); //String needs yourself
},
	null, "2013-10-24T22:01:23Z", "mp");

jst.SequenceableCollection.addMethod("withIndexDo:", "elementAndIndexBlock", "enumerating", function (elementAndIndexBlock){
	var args = [jst.nil, jst.nil];
	var context = jst.thisContext = jst.BlockContext.sender_arguments_(jst.thisContext, args);
	for (var i = 1; i <= this.size(); i++)
		elementAndIndexBlock.value_value_(args[0] = this.at_(i), args[1] = i);
	jst.thisContext = context.sender();
	return this.yourself(); //String needs yourself
},
	null, "2013-10-25T08:39:08Z", "mp");

jst.SequenceableCollection.addMethod("pairsDo:", "aBlock", "enumerating", function (aBlock){
	//Evaluate aBlock with my elements taken two at a time.  If there's an odd number of items, ignore the last one.  
	//Allows use of a flattened array for things that naturally group into pairs.  See also pairsCollect:
	var args = [jst.nil, jst.nil];
	var context = jst.thisContext = jst.BlockContext.sender_arguments_(jst.thisContext, args);
	var max = Math.floor(this.size() / 2);
	for (var index = 1; index <= max; index++)
		aBlock.value_value_(args[0] = this.at_(2 * index - 1), args[1] = this.at_(2 * index));
	jst.thisContext = context.sender();
	return this;
},
	null, "2013-10-25T08:38:13Z", "mp");

jst.SequenceableCollection.addMethod("select:", "aBlock", "enumerating", function (aBlock){
	var result = this.species()._new();
	var args = [jst.nil];
	var context = jst.thisContext = jst.BlockContext.sender_arguments_(jst.thisContext, args);
	this.forEach(function(ea){
		if (aBlock.value_(args[0] = ea) == true) 
			result.push(ea);
	});
	jst.thisContext = context.sender();
	return result;
},
	null, "2013-10-25T08:40:44Z", "mp");

jst.SequenceableCollection.addMethod("collect:", "aBlock", "enumerating", function (aBlock){
	var result = this.species().new_(this.size());
	var args = [jst.nil];
	var context = jst.thisContext = jst.BlockContext.sender_arguments_(jst.thisContext, args);
	for(var i = 1; i <= this.size(); i++)
		result.at_put_(i, aBlock.value_(args[0] = this.at_(i)));
	jst.thisContext = context.sender();
	return result;
},
	null, "2013-10-25T08:26:29Z", "mp");

jst.SequenceableCollection.addMethod("detect:ifNone:", "aBlock exceptionBlock", "enumerating", function (aBlock,exceptionBlock){
	var args = [jst.nil];
	var context = jst.thisContext = jst.BlockContext.sender_arguments_(jst.thisContext, args);
	for (var i = 1; i <= this.size(); i++)
		if (aBlock.value_(args[0] = this.at_(i)) == true) {
			jst.thisContext = context.sender();
			return this.at_(i);
		};
	jst.thisContext = context.sender();
	return jst.snd(exceptionBlock, "value");
},
	null, "2013-10-25T08:29:29Z", "mp");

jst.SequenceableCollection.addMethod("findLast:", "aBlock", "enumerating", function (aBlock){
	//Return the index of my last element for which aBlock evaluates as true.
	var args = [jst.nil];
	var context = jst.thisContext = jst.BlockContext.sender_arguments_(jst.thisContext, args);
	for (var index = this.size(); index > 0; index--)
		if (aBlock.value_(args[0] = this.at_(index))) {
			jst.thisContext = context.sender();
			return index;
		};
	jst.thisContext = context.sender();
	return  0;
},
	null, "2013-10-25T08:41:46Z", "mp");

//String

jst.String.addMethod("select:", "aBlock", "enumerating", function (aBlock){
	var result = "";
	var args = [jst.nil];
	var context = jst.thisContext = jst.BlockContext.sender_arguments_(jst.thisContext, args);
	for (var i = 1; i <= this.size(); i++) {
		if (aBlock.value_(args[0] = this.at_(i)) == true)
			result += args[0];
	};
	jst.thisContext = context.sender();
	return result;
},
	null, "2013-10-25T22:03:00Z", "mp");

jst.String.addMethod("collect:", "aBlock", "enumerating", function (aBlock){
	var result = "";
	var args = [jst.nil];
	var context = jst.thisContext = jst.BlockContext.sender_arguments_(jst.thisContext, args);
	for (var i = 1; i <= this.size(); i++)
		result += aBlock.value_(args[0] = this.at_(i));
	jst.thisContext = context.sender();
	return result;
},
	null, "2013-10-25T22:03:58Z", "mp");

//SortedCollection

jst.SortedCollection.addMethod("collect:", "aBlock", "enumerating", function (aBlock){
	var result = jst.OrderedCollection._new();
	var args = [jst.nil];
	var context = jst.thisContext = jst.BlockContext.sender_arguments_(jst.thisContext, args);
	for(var i = 1; i <= this.size(); i++)
		result.push(aBlock.value_(args[0] = this.at_(i)));
	jst.thisContext = context.sender();
	return result;
},
	null, "2013-10-26T20:33:12Z", "mp");

jst.SortedCollection.addMethod("indexForInserting:", "newObject", "private", function (newObject){
	var self = this;
	var low = 1;
	var high = self.size();
	var index;
	if (self._sortBlock.isNil()) {
	 	while (low <= high) {
			index = Math.floor((high + low) / 2);
			if (jst.sndw(self.at_(index), "<=", newObject)) 
				low = index + 1;
			else
				high = index - 1;
		}
	} else {
		var args = [jst.nil, jst.nil];
		var context = jst.thisContext = jst.BlockContext.sender_arguments_(jst.thisContext, args);
	 	while (low <= high) {
			index = Math.floor((high + low) / 2);
			if (self._sortBlock.value_value_(args[0] = self.at_(index), args[1] = newObject)) 
				low = index + 1;
			else
				high = index - 1;
		}
		jst.thisContext = context.sender();
	};
	return low;
},
	null, "2013-10-26T20:37:00Z", "mp");

jst.SortedCollection.addMethod("reSort", "", "private", function (){
	//function sort() needs -1, 0 or 1 as the result
	if (this._sortBlock.notNil()) {
		var self = this;
		this.sort(function(a, b) {
			return (jst.sndww(self._sortBlock, "value_value_", a, b) == true) ? -1 : 1;});
	} else
		this.sort(function(a, b) {
			return (jst.sndw(a, "<=", b) == true) ? -1 : 1;});
	return this;
},
	null, "2013-10-26T20:49:03Z", "mp");

jst.SortedCollection.addMethod("addAll:", "aCollection", "adding", function (aCollection){
	var self = this;
	jst.sndw(aCollection, "do_", function(obj){
		self.addLast_(obj);
	});
	jst.snd(this, "reSort");
	return aCollection;
},
	null, "2013-10-26T20:50:17Z", "mp");

//Number

jst.Number.addMethod("to:do:", "stop aBlock", "intervals", function (stop,aBlock){
	var args = [jst.nil];
	var context = jst.thisContext = jst.BlockContext.sender_arguments_(jst.thisContext, args);
	for (var i = this; i <= stop; i++)
		aBlock.value_(args[0] = i);
	jst.thisContext = context.sender();
	return this.yourself();
},
	null, "2013-10-30T22:14:25Z", "mp");

jst.Number.addMethod("to:by:do:", "stop step aBlock", "intervals", function (stop,step,aBlock){
	if (step == 0) 
		this.error_("step must be non-zero");
	var args = [jst.nil];
	var context = jst.thisContext = jst.BlockContext.sender_arguments_(jst.thisContext, args);
	if (step < 0)
		for (var i = this; i >= stop; i += step)
			aBlock.value_(args[0] = i);
	else
		for (var i = this; i <= stop; i += step)
			aBlock.value_(args[0] = i);
	jst.thisContext = context.sender();
	return this.yourself();
},
	null, "2013-10-30T22:15:41Z", "mp");

jst.Number.addMethod("timesRepeat:", "aBlock", "enumerating", function (aBlock){
	var context = jst.thisContext = jst.BlockContext.sender_arguments_(jst.thisContext);
	for (var i = 1; i <= this; i++)
		aBlock.value();
	jst.thisContext = context.sender();
	return this.yourself();
},
	null, "2013-10-30T22:16:46Z", "mp");


//MethodContext initialization

jst.MethodContext.initialize();

jst.SmalltalkCode.addMethod("tempVarsString", "", "private", function() {
	//debug version
	var str = "";
	if (!jst.deploying) {
		for (var i = 0; i < this._tempVars.length; i++)
			str += "var " + this._tempVars[i] + " = {x: jst.nil}; ";
	} else {
		for (var i = 0; i < this._tempVars.length; i++)
			str += "var " + this._tempVars[i] + " = jst.nil; ";
	};
	return str;
});

jst.Return.addMethod("asJavascript", "", "converting", function (){
	//debug version
	var arg = this._expression.asJavascript();
	//if (!jst.deploying)
	if (!jst.deploying && (this._expression.isBlock() || this._expression.isVariable()))
		arg = "jst.return(" + arg + ")";
	return (this._isNonlocal) ? "jst.BlockReturn.result_(" + arg + ")" : "return " + arg;
},
	null, "2013-11-02T21:27:07Z", "mp");

jst.Variable.addMethod("asJavascript", "", "converting", function() {
	// debug version
	if (this.isInstVar()) 
		return "self._" + this._name;
	else if (jst.deploying && this.isClassVar())
		return "self." + ((this._isClassSide) ? "" : "_class.") + "classVarNamed_(\"" + this._name + "\")";
	else if (this.isClassVar())
		return "self." + ((this._isClassSide) ? "" : "_class.") + "__" + this._name;
	else if (this.isClassName())
		return "jst." + this._name;
	else if (!jst.deploying && this.isTempVar())
		return this._name + ".x";
	return this._name;
});

jst.Variable.addMethod("assign:", "exp", "converting", function (exp){
	var str;
	if (this.isInstVar()) 
		str = "self,'_" + this._name;
	//else if (this.isClassVar())
	//	str = "self" + ((this._isClassSide) ? "" : "._class") + ",\"__" + this._name;
	else if (this.isTempVar())
		str = this._name + ",'x";
	else
		return this.asJavascript() + " = " + exp.asJavascript();
	return "jst.assign(" + str + "'," + exp.asJavascript() + ")";
},
	null, "2013-11-02T22:56:38Z", "mp");

/*
jst.Assignment.addMethod("asJavascript", "", "converting", function (){
	if (!jst.deploying)
		return this._variable.assign_(this._expression.asJavascript());
	else if (this._variable.isClassVar())
		return "self." + ((this._variable._isClassSide) ? "" : "_class.") 
			+ "classVarNamed_put_(\"" + this._variable.name() + "\", " + this._expression.asJavascript() + ")";
	else
		return this._variable.asJavascript() + " = " + this._expression.asJavascript();
},
	null, "2013-11-02T23:14:10Z", "mp");
*/
jst.Assignment.addMethod("asJavascript", "", "converting", function (){
	if (this._variable.isClassVar()) {
		var str = "self";
		if (!this._variable._isClassSide)
			str += "._class";
		if (jst.deploying)
			return str + ".classVarNamed_put_('" + this._variable.name() + "', " + this._expression.asJavascript() + ")";
		else
			return "jst.sndww(" + str + ",'classVarNamed_put_','" + this._variable.name() + "'," + this._expression.asJavascript() + ")";
	} 
	//else if (!jst.deploying)
	else if (!jst.deploying && (this._expression.isBlock() || this._expression.isVariable()))
		return this._variable.assign_(this._expression);
	else
		return this._variable.asJavascript() + " = " + this._expression.asJavascript();
},
	null, "2013-11-03T22:24:10Z", "mp");
