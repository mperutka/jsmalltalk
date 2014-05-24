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
 * More core methods and classes, methods can be written in Smalltalk henceforth.
 * Depends on jst-core, jst-parser, jst-core-ext, jst-collections
 */

jst.currentJsFile = "jst-kernel";

// *** CLASSES ***

jst.Array.subclass("DependentsArray", "", "", "", "Kernel-Objects");
jst.Object.subclass("Model", "dependents", "", "", "Kernel-Objects");

jst.Object.subclass("Point", "x y", "", "", "Kernel-Objects");
jst.Object.subclass("Rectangle", "origin corner", "", "", "Kernel-Objects");

jst.Magnitude.subclass("Timespan", "start duration", "", "", "Kernel-Chronology");
jst.Magnitude.subclass("Duration", "nanos seconds", "", "", "Kernel-Chronology");

jst.Timespan.subclass("Date", "", "", "", "Kernel-Chronology");

jst.Object.subclass("RegExp", "obj pattern global ignoreCase multiline replacement", "", "", "Kernel-Objects");

// *** METHODS ***

//Class

jst.Class.addMethod("comment", "", "accessing", 
	"\t^ comment",
	null, "2012-02-21T15:53:46Z", "mp");

jst.Class.addMethod("comment:", "aString", "accessing", 
	"\tcomment := aString",
	null, "2012-02-21T15:54:04Z", "mp");

jst.Class.addMethod("jsFile", "", "accessing", 
	"\t^ jsFile",
	null, "2012-04-11T11:11:49Z", "mp");

jst.Class.addMethod("javascriptName", "", "accessing", 
	"\t^ 'jst.', name",
	null, "2012-04-04T08:52:02Z", "mp");

// Metaclass

jst.Metaclass.addMethod("category", "", "accessing", "\t^ thisClass category");

jst.Metaclass.addMethod("comment", "", "accessing", 
	"\t^ thisClass comment",
	null, "2012-02-22T21:56:54Z", "mp");

jst.Metaclass.addMethod("jsFile", "", "accessing", 
	"\t^ thisClass jsFile",
	null, "2012-03-01T20:07:54Z", "mp");

jst.Metaclass.addMethod("jsFile:", "anObject", "accessing", 
	"\tthisClass jsFile: anObject",
	null, "2012-04-11T11:46:33Z", "mp");

jst.Metaclass.addMethod("javascriptName", "", "accessing", 
	"\t^ thisClass javascriptName, '._class'",
	null, "2012-04-04T08:54:38Z", "mp");

//MethodCategory

jst.MethodCategory.addMethod("subject", "", "accessing", "\t^ subject");

jst.MethodCategory.addMethod("<=", "otherCat", "comparing", "\t^ name <= otherCat name");

// DateAndTime

jst.DateAndTime._class.addMethod("now", "", "ansi protocol", function(){
	return new Date();
});

jst.DateAndTime._class.addMethod("new", "", "instance creation", function (){
	//Answer a DateAndTime representing the Unix epoch:  1 January 1970
	return new Date("1/1/1970");
});

jst.DateAndTime._class.addMethod("year:month:day:", "y m d", "ansi protocol", function(y, m, d){
	return new Date(y, m-1, d);
});

jst.DateAndTime._class.addMethod("year:month:day:hour:minute:second:millisecond:", "y m d h n s ms", "ansi protocol", 
function(y, m, d, h, n, s, ms){
	return new Date(y, m-1, d, h, n, s, ms);
});

jst.DateAndTime._class.addMethod("fromString:", "aString", "squeak protocol", 
	"\t^ ((aString indexOf: $,) > 0 or: [(aString indexOf: $-) > 0])" +
	"\n\t\tifTrue: [self parse: aString]" +
	"\n\t\tifFalse: [self readFrom: (ReadStream on: aString)]");
	
jst.DateAndTime._class.addMethod("readFrom:", "stream", "squeak protocol", 
	"\t\"reads only Czech format, e.g. '28.7.2011 10:35:00.000' (with milliseconds after dot)\"" +
	"\n\t| d m y h min s ms|" +
	"\n\td := stream upTo: $.." +
	"\n\tm := stream upTo: $.." +
	"\n\ty := stream upTo: Character space." +
	"\n\ty asNumber < 100 ifTrue: [y := 2000 + y asNumber]." +
	"\n\tstream atEnd ifTrue: [" +
	"\n\t\t^ self year: y month: m day: d]." +
	"\n\th := stream upTo: $:." +
	"\n\tmin := (stream upTo: $:) ifNil: [0]." +
	"\n\ts := (stream upTo: $.) ifNil: [0]." +
	"\n\tms := ((stream upTo: Character space) ifNil: [0]) asString paddedRightTo: 3 with: $0." +
	"\n\t^ self year: y month: m day: d hour: h minute: min second: s millisecond: ms");

// BlockClosure

jst.BlockClosure.addMethod("printSource", "", "printing", function (){
	//zdrojovy kod bloku mam ulozeny v komentari - genialni:)
	var src = this.toString();
	var i = src.indexOf("{"); 
	//12.1.2012: akceptuji pouze prvni komentar, dal mohou byt vnorene bloky
	return (src.length > i+3 && src[i+1] == '/' && src[i+2] == '*') ? src.substring(i+3, src.indexOf("*/")) : src;
},
	null, "2013-11-01T08:50:30Z", "mp");

jst.BlockClosure.addMethod("printOn:", "aStream", "printing", 
	"\taStream nextPutAll: self printSource",
	null, "2013-11-01T08:51:17Z", "mp");

jst.BlockClosure.constructor.prototype.asString = function(){
	return this.printString();
};
jst.BlockClosure.addMethod("asString", "", "converting");

jst.BlockClosure.addMethod("ifError:", "errorHandlerBlock", "exceptions", "\t^ self on: Error do: [:ex |" +
	"\n\t\terrorHandlerBlock valueWithPossibleArgs: {ex description. ex receiver}]");

jst.BlockClosure.addMethod("ensure:", "aBlock", "exceptions", 
	function (aBlock){
	var result;
	try {
		result = this.value();
		var b = aBlock;
		aBlock = null;
		b.value();
	} catch(ex) {
		if (aBlock)
			aBlock.value();
		throw ex;
	};
	return result;
});

jst.BlockClosure.addMethod("at:", "key", "accessing", function (key){
	return this[key] || jst.nil;
},
	null, "2013-11-22T13:16:19Z", "mp");

// *** DependentsArray ***

jst.DependentsArray.addMethod("size", "", "copying", 
	"\t^ self inject: 0 into: [:count :dep | dep ifNil: [count] ifNotNil: [count + 1]]");

jst.DependentsArray.constructor.prototype.do_ = function (aBlock){
	for (var i = 1; i <= this.length; i++) {
		var it = this.at_(i);
		if (it != null && it != jst.nil) 
			aBlock.value_(it);
	};
	return this;
};
jst.DependentsArray.addMethod("do:", "aBlock", "enumerating");

jst.DependentsArray.constructor.prototype.copyWith_ = function(newElement) {
	//Re-implemented to not copy any niled out dependents.
	var copy = this._class.new_(this.size() + 1);
	var i = 0;
	this.do_(function(item){copy.at_put_(++i, item);});
	copy.at_put_(++i, newElement);
	return copy;
};
jst.DependentsArray.addMethod("copyWith:", "newElement", "copying");

jst.DependentsArray.constructor.prototype.select_ = function(aBlock) {
	var result = this.species().new_(this.size());
	this.do_(function(obj){
		if (aBlock.value_(obj))
			result.push(obj);
	});
	return result;
};
jst.DependentsArray.addMethod("select:", "aBlock", "enumerating");

jst.DependentsArray.constructor.prototype.detect_ifNone_ = function (aBlock,exceptionBlock){
	for (var i = 1; i <= this.length; i++) {
		var it = this.at_(i);
		if (it != null && it != jst.nil && aBlock.value_(it) == true)
			return it;
	};
	return exceptionBlock.value();
};
jst.DependentsArray.addMethod("detect:ifNone:", "aBlock exceptionBlock", "enumerating");

// *** Model ***

jst.Model.addMethod("myDependents", "", "dependents access", "\t^ dependents");

jst.Model.addMethod("myDependents:", "aCollectionOrNil", "dependents access", "\tdependents := aCollectionOrNil");

// Object

jst.Object._class.addMethod("initialize", "", "class initialization", 
	"\tDependentsFields ifNil: [DependentsFields := Dictionary new]");
//console.log("START: " + "new".asFunctionName());
jst.initializeClass(jst.Object);

jst.Object.constructor.prototype.species = function() {
	return this._class;
};
jst.Object.addMethod("species", "", "accessing");

jst.Object.constructor.prototype.asJsObject = function() {
	//default implementation
	return this.yourself();
};
jst.Object.addMethod("asJsObject", "", "converting");

jst.Object.addMethod("printOn:", "aStream", "printing", 
	"\t\"Append to the argument, aStream, a sequence of characters that identifies the receiver.\"" +
	"\n\t| title |" +
	"\n\ttitle := self class name." +
	"\n\taStream" +
	"\n\t\tnextPutAll: (title first isVowel ifTrue: ['an '] ifFalse: ['a ']);" +
	"\n\t\tnextPutAll: title", null, 
	"2011-09-08T20:50:47Z", "mp");
/*
jst.Object.addMethod("printStringLimitedTo:", "limit", "printing", 
	"\t\"Answer a String whose characters are a description of the receiver." +
	"\n\tIf you want to print without a character limit, use fullPrintString.\"" +
	"\n\t| limitedString |" +
	"\n\tlimitedString := String streamContents: [:s | self printOn: s] limitedTo: limit." +
	"\n\t^ limitedString size < limit " +
	"\n\t\tifTrue: [limitedString] " +
	"\n\t\tifFalse: [limitedString, '...etc...' translated]", null, 
	"2011-09-09T19:38:45Z", "mp");
*/
jst.Object.addMethod("printStringLimitedTo:", "limit", "printing", function (limit){
	//Answer a String whose characters are a description of the receiver. For efficiency as native function.
	var self = this;
	var limitedString = jst.String.streamContents_limitedTo_(
		function(s){/*[:s | self printOn: s]*/self.printOn_(s);}, limit);
	return (limitedString.size() < limit) ? limitedString : limitedString + '...etc...'.translated();
}, null, "2012-01-13T15:42:16Z", "mp");

jst.Object.addMethod("printString", "", "printing", function(){
	//for efficiency as native function
	return this.printStringLimitedTo_(50000);
}, null, "2012-01-13T15:29:56Z", "mp");

jst.Object.addMethod("myDependents", "", "dependents access", "\t^ DependentsFields at: self ifAbsent: []");

jst.Object.addMethod("myDependents:", "aCollectionOrNil", "dependents access", 
	"\tDependentsFields at: self put: aCollectionOrNil");

jst.Object.addMethod("dependents", "", "dependents access", "\t^ self myDependents ifNil: [#()]");

jst.Object.addMethod("addDependent:", "anObject", "dependents access", "\t| dependents |" +
	"\n\tdependents := self dependents." +
	"\n\t(dependents includes: anObject) ifFalse: [" +
	"\n\t\tself myDependents: (dependents copyWithDependent: anObject)]." +
	"\n\t^ anObject");

jst.Object.addMethod("update:", "aParameter", "updating", "\t^ self");

jst.Object.addMethod("update:with:", "anAspect anObject", "updating", "\t^ self update: anAspect");

jst.Object.addMethod("changed:with:", "anAspect anObject", "updating", 
	"\tself dependents do: [:aDependent | aDependent update: anAspect with: anObject]");
/*
jst.Object.addMethod("sendEvent:with:", "anEventSelector anObject", "events", 
	"\t(anEventSelector indexOf: $:) < anEventSelector size " +
	"\n\t\tifTrue: [self dependents do: [:aDependent | (aDependent class canUnderstand: anEventSelector) ifTrue: [" +
	"\n\t\t\taDependent perform: anEventSelector withArguments: anObject]]]" +
	"\n\t\tifFalse: [self dependents do: [:aDependent | (aDependent class canUnderstand: anEventSelector) ifTrue: [ " +
	"\n\t\t\taDependent perform: anEventSelector with: anObject]]]",
	null, "2011-09-30T20:24:03Z", "mp");
*/
jst.Object.addMethod("sendEvent:with:", "eventSelector anObject", "system events", 
	"\tself dependents do: [:ea | " +
	"\n\t\tea triggerEvent: eventSelector with: anObject]",
	null, "2012-08-17T08:45:44Z", "mp");

jst.Object.addMethod("triggerEvent:with:", "eventSelector anObject", "system events", 
	"\t\"default implementation\"" +
	"\n\t(self class canUnderstand: eventSelector) ifTrue: [" +
	"\n\t\tanObject isDictionary " +
	"\n\t\t\tifTrue: [self perform: eventSelector with: anObject] " +
	"\n\t\t\tifFalse: [self perform: eventSelector withArguments: anObject asCollection]]",
	null, "2012-12-20T08:40:14Z", "mp");

jst.Object.addMethod("changed:", "aParameter", "updating",
	"\tself dependents do: [:aDependent | aDependent update: aParameter]");

jst.Object.addMethod("changed", "", "updating", "\tself changed: self");

jst.Object.addMethod("isStream", "", "testing", function(){
	return false;
});

jst.Object.addMethod("asCollection", "", "converting", "\t^ OrderedCollection with: self");

jst.Object.addMethod("->", "anObject", "converting", 
	"\t\"Answer an Association between self and anObject\"" +
	"\n\t^Association key: self value: anObject");

jst.Object.constructor.prototype.instVarAt_ = function (index){
	//return this["_" + this._class.allInstVarNames()[index-1]];
	return this["_" + this._class.instVarNameAt_(index)]; 
};
jst.Object.addMethod("instVarAt:", "index", "system primitives");

jst.Object.constructor.prototype.instVarAt_put_ = function (index, anObject){
	//this["_" + this._class.allInstVarNames()[index-1]] = anObject;
	return this["_" + this._class.instVarNameAt_(index)] = anObject;
};
jst.Object.addMethod("instVarAt:put:", "index anObject", "system primitives");

jst.Object.constructor.prototype.instVarNamed_ = function (aString){
	return this["_" + aString];
};
jst.Object.addMethod("instVarNamed:", "aString", "system primitives");

/*
jst.Object.constructor.prototype.hasInstVarNamed_ = function (name){
	return this.klass().hasInstVarNamed_(name);
};
jst.Object.addMethod("hasInstVarNamed:", "name", "system primitives");

jst.Object.constructor.prototype.hasClassVarNamed_ = function (aSymbol){
	return this.klass().hasClassVarNamed_(aSymbol);
};
jst.Object.addMethod("hasClassVarNamed:", "aSymbol", "system primitives"); 
*/

jst.Object.constructor.prototype.instVarNamed_put_ = function (aString, anObject){
	return this["_" + aString] = anObject;
};
jst.Object.addMethod("instVarNamed:put:", "aString anObject", "system primitives");

jst.Object.constructor.prototype.printInstVarNamed_limitedTo_ = function(aString, limit) {
	var instVar = this.instVarNamed_(aString);
	if (instVar.printStringLimitedTo_) 
		return instVar.printStringLimitedTo_(limit);
	//instVar is native js object, see #map in Dictionary
	var str = instVar.toString().substr(0, limit);
	return (str.length < limit) ? str : str + "...etc...".translated();
};
jst.Object.addMethod("printInstVarNamed:limitedTo:", "aString limit", "system primitives");

jst.Object.addMethod("longPrintOn:limitedTo:indent:", "aStream sizeLimit indent", "printing", 
	"\t\"Append to the argument, aStream, the names and values of all of the receiver's instance variables.  " +
	"\n\tLimit is the length limit for each inst var.\"" +
	"\n\tself class allInstVarNames withIndexDo: [:name :index |" +
	"\n\t\tindent timesRepeat: [aStream tab]." +
	"\n\t\taStream nextPutAll: name;" +
	"\n\t\t\tnextPut: $:;" +
	"\n\t\t\tspace;" +
	"\n\t\t\ttab;" +
	"\n\t\t\tnextPutAll: (self printInstVarNamed: name limitedTo: (sizeLimit -3 - name size max: 1));" +
	"\n\t\t\tlf]");

jst.Object.addMethod("longPrintStringLimitedTo:", "aLimitValue", "printing", 
	"\t\"Answer a String whose characters are a description of the receiver.\"" +
	"\n\t| str |" +
	"\n\tstr := String streamContents: [:aStream | " +
	"\n\t\tself longPrintOn: aStream limitedTo: aLimitValue indent: 0]." +
	"\n\t\"Objects without inst vars should return something\"" +
	"\n\t^ str isEmpty ifTrue: [self printString, String lf] ifFalse: [str]");

jst.Object.addMethod("isInterval", "", "testing", "\t^ false");

jst.Object.addMethod("isDictionary", "", "testing", 
	"\t^ false",
	null, "2012-12-20T08:34:51Z", "mp");

jst.Object.addMethod("asDictionary", "", "converting", 
	"\t^ self class allInstVarNames inject: Dictionary new into: [:dict :n |" +
	"\n\t\tdict at: n put: (self instVarNamed: n); yourself]",
	null, "2012-08-01T06:41:45Z", "mp");

jst.Object.addMethod("respondsTo:", "aSymbol", "testing", 
	"\t\"Answer whether the method dictionary of the receiver's class " +
	"\n\tcontains aSymbol as a message selector.\"" +
	"\n\t^ self class canUnderstand: aSymbol",
	null, "2012-10-11T18:40:40Z", "mp");

//tato verze zlobila pri ladeni, volani ifNotString se nechtelo zazlutit, zjevne kvuli pouziti #valueWithPossibleArgument: 
//TODO: mozna by to chtelo #valueWithPossibleArgument: prozkoumat, zda jeste nekde nezlobit - nemelo by se treba jinak implementovat?
jst.Object.addMethod("ifNotString:", "aBlock", "testing", 
	"\t^ aBlock valueWithPossibleArgument: self",
	null, "2013-04-16T15:23:08Z", "mp", 1);

jst.Object.addMethod("ifNotString:", "aBlock", "testing", 
	"\t^ aBlock value",
	null, "2014-02-28T14:37:32Z", "mp"); //jst-kernel

jst.Object.addMethod("values:", "values", "accessing", 
	"\t\"See also #asDictionary\"" +
	"\n\tvalues asDictionary keysAndValuesDo: [:key :value |" +
	"\n\t\t(self respondsTo: key asMutator) ifTrue: [" +
	"\n\t\t\tself perform: key asMutator with: value]]",
	null, "2013-06-25T14:08:44Z", "mp");

// Number

jst.Number.addMethod("printString", "", "printing", function (){
	return this.toString();
}, null, "2011-09-09T13:25:27Z", "mp");

jst.Number.addMethod("printOn:", "aStream", "printing", 
	"\taStream nextPutAll: self printString", null, 
	"2011-09-09T13:27:22Z", "mp");

jst.Number.constructor.prototype["<"] = function(aNumber) {
	return this < aNumber;
};
jst.Number.addMethod("<", "aNumber", "comparing");

jst.Number.constructor.prototype["<="] = function(aNumber) {
	return this <= aNumber;
};
jst.Number.addMethod("<=", "aNumber", "comparing");

jst.Number.constructor.prototype[">="] = function(aNumber) {
	return this >= aNumber;
};
jst.Number.addMethod(">=", "aNumber", "comparing");

jst.Number.constructor.prototype.to_do_ = function(stop, aBlock) {
	for (var i = this; i <= stop; i++)
		aBlock.value_(i);
	return this.yourself();
};
jst.Number.addMethod("to:do:", "stop aBlock", "intervals");

jst.Number.constructor.prototype.to_by_do_ = function(stop, step, aBlock) {
	if (step == 0) 
		this.error_("step must be non-zero");
	if (step < 0)
		for (var i = this; i >= stop; i += step)
			aBlock.value_(i);
	else
		for (var i = this; i <= stop; i += step)
			aBlock.value_(i);
	return this.yourself();
};
jst.Number.addMethod("to:by:do:", "stop step aBlock", "intervals");

jst.Number.addMethod("timesRepeat:", "aBlock", "enumerating", function(aBlock){
	for (var i = 1; i <= this; i++)
		aBlock.value();
	return this.yourself();
});

jst.Number.addMethod("max:", "aNumber", "arithmetic", function(aNumber){
	return Math.max(this, aNumber);
});

jst.Number.addMethod("min:", "aNumber", "arithmetic", function(aNumber){
	return Math.min(this, aNumber);
});

jst.Number.addMethod("//", "aNumber", "arithmetic", function(aNumber){
	//Integer quotient defined by division with truncation toward negative infinity.
	return Math.floor(this / aNumber);
});

/* zlobi
jst.Number.addMethod("\\\\", "aNumber", "arithmetic", function(aNumber){
	//modulo
	return this % aNumber;
}, "\\");
*/

jst.Number.addMethod("%", "aNumber", "arithmetic", function (aNumber){
	//modulo
	return this % aNumber;
},
	null, "2012-11-23T14:57:04Z", "mp");

jst.Number.addMethod("abs", "", "arithmetic", function() {
	return Math.abs(this);
});

jst.Number.addMethod("to:by:", "stop step", "intervals", 
	"\t\"Answer an Interval from the receiver up to the argument, stop, incrementing by step.\"" +
	"\n\t^ Interval from: self to: stop by: step",
	null, "2011-12-30T14:09:26Z", "mp");

jst.Number.addMethod("to:", "stop", "intervals", 
	"\t\"Answer an Interval from the receiver up to the argument, stop, incrementing by 1.\"" +
	"\n\t^ Interval from: self to: stop by: 1",
	null, "2011-12-30T14:09:35Z", "mp");

jst.Number.constructor.prototype.printStringBase_ = function (base){
	return this.toString(base);
}; 
jst.Number.addMethod("printStringBase:", "base", "printing");

jst.Number.addMethod("printStringHex", "", "printing", 
	"\t^ self printStringBase: 16",
	null, "2012-05-14T20:26:27Z", "mp");

jst.Number.addMethod("truncated", "", "truncation and round", function (){
	//Answer an integer nearest the receiver toward zero.
	return (this > 0) ? Math.floor(this) : Math.ceil(this);
},
	null, "2012-10-10T21:11:22Z", "mp");

jst.Number.addMethod("quo:", "aNumber", "arithmetic", function (aNumber){
	/* Integer quotient defined by division with truncation toward zero. -9 quo: 
	4 = -2, -0.9 quo: 0.4 = -2. rem: answers the remainder from this division.*/
	return (this / aNumber).truncated();
},
	null, "2012-10-10T21:19:29Z", "mp");

jst.Number.addMethod("rem:", "aNumber", "arithmetic", function (aNumber){
	/*Remainder defined in terms of quo:. Answer a Number with the same 
	sign as self. e.g. 9 rem: 4 = 1, -9 rem: 4 = -1. 0.9 rem: 0.4 = 0.1.*/
	return this - (this.quo_(aNumber) * aNumber);
},
	null, "2012-10-10T21:34:06Z", "mp");

jst.Number.addMethod("fractionPart", "", "truncation and round", function (){
	//Answer the fractional part of the receiver.
	return this - this.truncated();
},
	null, "2012-10-10T21:39:48Z", "mp");

jst.Number.addMethod("rounded", "", "truncation and round", function (){
	//Answer the integer nearest the receiver
	return Math.round(this);
},
	null, "2012-10-10T21:44:32Z", "mp");

jst.Number.addMethod("days", "", "converting", 
	"\t^ Duration days: self",
	null, "2012-10-11T20:44:26Z", "mp");

jst.Number.addMethod("hours", "", "converting", 
	"\t^ Duration hours: self",
	null, "2012-10-11T20:45:56Z", "mp");

jst.Number.addMethod("minutes", "", "converting", 
	"\t^ Duration minutes: self",
	null, "2012-10-11T20:46:17Z", "mp");

jst.Number.addMethod("seconds", "", "converting", 
	"\t^ Duration seconds: self",
	null, "2012-10-11T20:46:26Z", "mp");

jst.Number.addMethod("milliSeconds", "", "converting", 
	"\t^ Duration milliSeconds: self",
	null, "2012-10-11T20:49:45Z", "mp");

jst.Number.addMethod("asMilliSeconds", "", "converting", 
	"\t^ self",
	null, "2012-12-10T22:13:11Z", "mp");

jst.Number.addMethod("positive", "", "testing", function (){
	//Answer whether the receiver is positive or equal to 0. (ST-80 protocol). See also strictlyPositive
	return this >= 0;
},
	null, "2012-10-11T21:00:25Z", "mp");

jst.Number.addMethod("negated", "", "arithmetic", function (){
	//Answer a Number that is the negation of the receiver
	return 0 - this;
},
	null, "2012-10-12T08:26:27Z", "mp");

jst.Number.addMethod("asNumber", "", "converting", 
	"\t^ self yourself",
	null, "2013-05-28T07:29:40Z", "mp");

jst.Number.addMethod("bitAnd:", "n", "bit manipulation", function (n){
	//Answer an Integer whose bits are the logical AND of the receiver's bits  and those of the argument, n
	return (this + 0) & n;
},
	null, "2013-05-31T12:25:02Z", "mp");

jst.Number.addMethod("printFileSize", "", "printing", function (){
	var fileSize = this + 0;
	if (fileSize > 1024 * 1024)
		return (Math.round(fileSize * 100 / (1024 * 1024)) / 100).toString() + ' MB';
	else
		return (Math.round(fileSize * 100 / 1024) / 100).toString() + ' KB';
},
	null, "2013-06-06T20:34:27Z", "mp");

jst.Number.addMethod("@", "y", "converting", 
	"\t\"Answer a Point whose x value is the receiver and whose y value is the argument\"" +
	"\n\t^ Point x: self y: y",
	null, "2013-06-20T13:12:17Z", "mp");

jst.Number.addMethod("randomIntTo:", "max", "util", function (max){
	return Math.floor(Math.random() * (max - this + 1)) + this;
 },
	null, "2014-04-19T14:54:10Z", "mp");

jst.Number._class.addMethod("random", "", "util", function (){
	/*Returns a floating-point, pseudo-random number in the range [0, 1) that is, 
	from 0 (inclusive) up to but not including 1 (exclusive), which you can then scale to your desired range.
	The random number generator is seeded from the current time, as in Java.*/
	return Math.random();
},
	null, "2014-04-19T14:34:46Z", "mp");

jst.Number.addMethod("even", "", "testing", function (){
	//Answer whether the receiver is an even number.
	return this % 2 == 0;
},
	null, "2014-04-30T14:56:10Z", "mp");

jst.Number.addMethod("odd", "", "testing", function (){
	//Answer whether the receiver is an odd number.
	return this % 2 != 0;
},
	null, "2014-04-30T14:57:49Z", "mp");

//*** Point ***

jst.Point._class.addMethod("x:y:", "xInteger yInteger", "instance-creation", 
	"\t^ self basicNew setX: xInteger setY: yInteger");	

jst.Point._class.addMethod("on:", "aCollection", "instance-creation", 
	"\t^ self basicNew setX: aCollection first setY: aCollection second");	

jst.Point.addMethod("setX:setY:", "xInteger yInteger", "accessing", 
	"\tx := xInteger.\n\ty := yInteger");	

jst.Point.addMethod("x", "", "accessing", "\t^ x");	

jst.Point.addMethod("y", "", "accessing", "\t^ y");		

//jst.Point.addMethod("printString", "", "printing", "\t^ '{1}@{2}' format: {x. y}");

jst.Point.addMethod("asJsObject", "", "converting", "\t^ {x. y}");		

jst.Point.addMethod("+", "arg", "arithmetic", 
	"\t\"Answer a Point that is the sum of the receiver and arg.\"" +
	"\n\t^ (x + arg x) @ (y + arg y)",
	null, "2013-06-20T13:31:27Z", "mp");

jst.Point.addMethod("-", "arg", "arithmetic", 
	"\t\"Answer a Point that is the difference of the receiver and arg.\"" +
	"\n\t^ (x - arg x) @ (y - arg y)",
	null, "2013-06-20T17:05:08Z", "mp"); //jst-kernel

jst.Point.addMethod("printOn:", "aStream", "printing", 
	"\tx printOn: aStream." +
	"\n\taStream nextPut: $@." +
	"\n\ty printOn: aStream",
	null, "2013-06-20T13:52:14Z", "mp");

// *** Rectangle ***

jst.Rectangle.addMethod("setOrigin:corner:", "topLeft bottomRight", "private", 
	"\torigin := topLeft." +
	"\n\tcorner := bottomRight",
	null, "2013-06-20T13:26:59Z", "mp");

jst.Rectangle.addMethod("origin", "", "accessing", 
	"\t\"Answer the point at the top left corner of the receiver.\"" +
	"\n\t^ origin",
	null, "2013-06-20T13:32:50Z", "mp");

jst.Rectangle.addMethod("corner", "", "accessing", 
	"\t\"Answer the point at the bottom right corner of the receiver.\"" +
	"\n\t^ corner",
	null, "2013-06-20T13:33:17Z", "mp");

jst.Rectangle.addMethod("extent", "", "accessing", 
	"\t\"Answer with a rectangle with origin 0@0 and corner the receiver's width @ the receiver's height.\"" +
	"\n\t^ corner - origin",
	null, "2013-06-20T17:04:05Z", "mp");

jst.Rectangle.addMethod("bottom", "", "accessing", 
	"\t\"Answer the position of the receiver's bottom horizontal line.\"" +
	"\n\t^ corner y",
	null, "2013-06-20T13:33:54Z", "mp");

jst.Rectangle.addMethod("left", "", "accessing", 
	"\t\"Answer the position of the receiver's left vertical line.\"" +
	"\n\t^ origin x",
	null, "2013-06-20T13:35:09Z", "mp");

jst.Rectangle.addMethod("right", "", "accessing", 
	"\t\"Answer the position of the receiver's right vertical line.\"" +
	"\n\t^ corner x",
	null, "2013-06-20T13:35:38Z", "mp");

jst.Rectangle.addMethod("top", "", "accessing", 
	"\t\"Answer the position of the receiver's top horizontal line.\"" +
	"\n\t^ origin y",
	null, "2013-06-20T13:35:58Z", "mp");

jst.Rectangle.addMethod("width", "", "accessing", 
	"\t\"Answer the width of the receiver.\"" +
	"\n\t^ corner x - origin x",
	null, "2013-06-20T13:36:47Z", "mp");

jst.Rectangle.addMethod("height", "", "accessing", 
	"\t\"Answer the height of the receiver.\"" +
	"\n\t^ corner y - origin y",
	null, "2013-06-20T13:37:25Z", "mp");

jst.Rectangle.addMethod("scaleToFit:center:", "rect aBoolean", "converting", 
	"\t| trgAR srcAR x y w h |" +
	"\n\ttrgAR := rect width / rect height." +
	"\n\tsrcAR := self width / self height." +
	"\n\tx := rect left." +
	"\n\ty := rect top." +
	"\n\ttrgAR > srcAR ifTrue: [" +
	"\n\t\th := rect height." +
	"\n\t\tw := srcAR * rect height." +
	"\n\t\taBoolean ifTrue: [" +
	"\n\t\t\tx := x + (rect width - w / 2) rounded]" +
	"\n\t] ifFalse: [" +
	"\n\t\th := rect width / srcAR." +
	"\n\t\tw := rect width." +
	"\n\t\taBoolean ifTrue: [" +
	"\n\t\t\ty := y + (rect height - h / 2) rounded]" +
	"\n\t]." +
	"\n\t^ Rectangle origin: x @ y extent: w @ h",
	null, "2013-06-20T13:49:37Z", "mp");

jst.Rectangle.addMethod("printOn:", "aStream", "printing", 
	"\torigin printOn: aStream." +
	"\n\taStream nextPutAll: ' corner: '." +
	"\n\tcorner printOn: aStream",
	null, "2013-06-20T13:54:23Z", "mp");

jst.Rectangle._class.addMethod("origin:corner:", "originPoint cornerPoint", "instance creation", 
	"\t\"Answer an instance of me whose corners (top left and bottom right) are " +
	"\n\tdetermined by the arguments.\"" +
	"\n\t^ self basicNew setOrigin: originPoint corner: cornerPoint",
	null, "2013-06-20T13:27:33Z", "mp");

jst.Rectangle._class.addMethod("left:right:top:bottom:", "leftNumber rightNumber topNumber bottomNumber", "instance creation", 
	"\t\"Answer an instance of me whose left, right, top, and bottom coordinates " +
	"\n\tare determined by the arguments.\"" +
	"\n\t^ self basicNew setOrigin: leftNumber @ topNumber corner: rightNumber @ bottomNumber",
	null, "2013-06-20T13:28:20Z", "mp");

jst.Rectangle._class.addMethod("origin:extent:", "originPoint extentPoint", "instance creation", 
	"\t\"Answer an instance of me whose top left corner is originPoint and width by height is extentPoint.\"" +
	"\n\t^ self basicNew setOrigin: originPoint corner: originPoint + extentPoint",
	null, "2013-06-20T13:48:49Z", "mp");

jst.Rectangle._class.addMethod("extent:", "aPoint", "instance creation", 
	"\t\"Answer an instance of me whose top left corner is 0 and width by height is aPoint.\"" +
	"\n\t^ self basicNew setOrigin: 0@0 corner: aPoint",
	null, "2013-06-20T16:39:03Z", "mp");

jst.Rectangle.addMethod("asDictionary", "", "converting", 
	"\t^ Dictionary new" +
	"\n\t\tat: #x put: origin x;" +
	"\n\t\tat: #y put: origin y;" +
	"\n\t\tat: #width put: corner x;" +
	"\n\t\tat: #height put: corner y;" +
	"\n\t\tyourself",
	null, "2014-01-13T20:06:30Z", "mp");

// MethodVersion, part II

/* muselo by se zparsovat a prevest na funkci pomoci eval
jst.MethodVersion.addMethod("asBlock", "", "converting", 
	"\t\"only string\"" +
	"\n\t^ code",
	null, "2013-11-04T13:14:26Z", "mp");
*/

jst.MethodVersion.addMethod("receiver", "", "accessing", 
	"\t^ category subject",
	null, "2013-11-04T14:26:45Z", "mp");

jst.MethodVersion.addMethod("selector", "", "accessing", 
	"\t^ String streamContents: [:s | | str |" +
	"\n\t\tstr := code copyUpTo: Character lf." +
	"\n\t\t(str includes: $:) " +
	"\n\t\t\tifFalse: [s nextPutAll: (str copyUpTo: String space)]" +
	"\n\t\t\tifTrue: [(str findTokens: ': ') pairsDo: [:a :b |" +
	"\n\t\t\t\ts nextPutAll: a, ':']]" +
	"\n\t]",
	null, "2013-06-01T22:31:18Z", "mp");

jst.MethodVersion.addMethod("printDescriptionOn:", "aStream", "printing", 
	"\taStream nextPutAll: self receiver name;" +
	"\n\t\tnextPutAll: '>>';" +
	"\n\t\tnextPutAll: self selector;" +
	"\n\t\tnextPutAll: ' {';" +
	"\n\t\tnextPutAll: category name;" +
	"\n\t\tnextPut: $}",
	null, "2013-11-04T14:36:08Z", "mp");

// Method

jst.Method.addMethod("printOn:", "aStream", "printing", 
	"\taStream nextPutAll: receiver name;" +
	"\n\t\tnextPutAll: '>>';" +
	"\n\t\tnextPutAll: selector;" +
	"\n\t\tnextPutAll: ' {';" +
	"\n\t\tnextPutAll: category name;" +
	"\n\t\tnextPut: $}",
	null, "2011-09-23T12:46:01Z", "mp", 1);

jst.Method.addMethod("printOn:", "aStream", "printing", 
	"\tself printDescriptionOn: aStream",
	null, "2013-11-04T14:37:45Z", "mp");

/*
jst.Method.addMethod("classNames", "", "accessing", function (){
	var arr = jst.Array.adopt_(this._receiver.protocol()[this.functionName()].toString().split(/[\){}", '=;\n\t]|\((?!\))/));
	var result = jst.SortedCollection._new();
	arr.do_(function(s){
		if (s.startsWith_("jst.") && s.at_(5).isUppercase()) {
			var cn = s.allButFirst_(4);
			var i = cn.indexOf_(".");
			if (i > 0)
				cn = cn.copyFrom_to_(1, i-1);
			if (cn == "Smalltalk")
				cn = "SystemDictionary";
			if (!result.includes_(cn))
				result.add_(cn);
		};
	});
	return result;
},
	null, "2012-09-13T16:22:44Z", "mp");
*/
jst.Method.addMethod("classNames", "", "accessing", function (){
	var arr = this.asBlock().toString().split(/[\){}", '=;\n\t]|\((?!\))/);
	var result = jst.SortedCollection._new();
	arr.do_(function(s){
		if (s.size() > 4 && s.startsWith_("jst.") && s.at_(5).isUppercase()) {
			var cn = s.allButFirst_(4);
			var i = cn.indexOf_(".");
			if (i > 0)
				cn = cn.copyFrom_to_(1, i-1);
			if (cn == "Smalltalk")
				cn = "SystemDictionary";
			result.addUnique_(cn);
		};
	});
	return result;
},
	null, "2013-10-22T12:04:47Z", "mp");

/*
jst.Method.constructor.prototype.selectors = function() {
	var arr = jst.Array.adopt_(this._receiver.protocol()[this.functionName()].toString().split(/[.\){}"\n\t]|\((?!\))/));
	arr = arr.select_(function(s){
		return (s.includes_("_") || s.includes_("(")) && !s.includes_("/") && !s.includes_(" ");});
	arr = arr.collect_(function(s){
		return (s.includes_("(")) ? s.allButLast().trim() : s;});
	var result = jst.SortedCollection._new();
	var self = this;
	arr.do_(function(s){
		var selector = (self._class.__ReservedNames)
			? self._class.__ReservedNames.keyAtValue_ifAbsent_(s, jst.nil)
			: self._class.classVarNamed_("ReservedNames").keyAtValue_ifAbsent_(s, jst.nil);
		if (selector.isNil()) {
			if (s.first() != "_" && s.toLocaleLowerCase() != "function") 
				selector = s.copyReplaceAll_with_("_", ":");
		};
		if (selector.notNil() && selector.size() > 0 && !result.includes_(selector))
			result.add_(selector);
	});
	return result;
};
*/
jst.Method.constructor.prototype.selectors = function (){
	var arr = this.asBlock().toString().split(/[.\){}"\n\t]|\((?!\))/);
	arr = arr.select_(function(s){
		return s.size() > 0 && (s.includes_("_") || s.includes_("(")) && !s.includes_("/") && !s.includes_(" ");});
	arr = arr.collect_(function(s){
		return (s.includes_("(")) ? s.allButLast().trim() : s;});
	var result = jst.SortedCollection._new();
	var self = this;
	arr.do_(function(s){
		var selector = (self._class.__ReservedNames)
			? self._class.__ReservedNames.keyAtValue_ifAbsent_(s, jst.nil)
			: self._class.classVarNamed_("ReservedNames").keyAtValue_ifAbsent_(s, jst.nil);
		if (selector.isNil()) {
			if (s.size() > 0 && s.first() != "_" && s.toLocaleLowerCase() != "function") 
				selector = s.copyReplaceAll_with_("_", ":");
		};
		if (selector.notNil() && selector.size() > 0)
			result.addUnique_(selector);
	});
	return result;
};
jst.Method.addMethod("selectors", "", "accessing");

/*
jst.Method.constructor.prototype.callsSymbol_ = function(aSymbol) {
	var src = this._receiver.protocol()[this.functionName()];
	if (!src)
		return false;
	src = src.toString();
	var selector = aSymbol.asFunctionName();
	if (src.indexOf("\""+selector+"\"") >= 0 || src.indexOf("'"+selector+"'") >= 0)
		//napr. ve volani jst.superSend...
		return true;
	//druha podminka hleda aSymbol jako nazev tridy
	return src.indexOf("."+selector+"(") >= 0 || (selector == aSymbol && src.indexOf("jst."+selector) >= 0);
};
*/
jst.Method.constructor.prototype.callsSymbol_ = function (aSymbol){
	//2012-02-16
	var src = this.asBlock();
	if (!src)
		return false;
	src = src.toString();
	if (aSymbol.last() == ":" && src.indexOf("'"+aSymbol+"'") > 0)
		//symbol can be used directly as the message argument, e.g. in #sendEvent:with:
		return true;
	var selector = aSymbol.asFunctionName();
	var i1 = 0;
	var i = src.indexOf(selector, i1);
	while (i > 0) {
		if ((src[i-1] == "\"" && src[i+selector.length] == "\"") || 
		    (src[i-1] == "'" && src[i+selector.length] == "'") || 
		    (src[i-1] == "." && src[i+selector.length] == "(") ||
		    (src[i-1] == "." && src[i+selector.length] == ".") || //followed by call or apply
		    //aSymbol is a class name
		    (selector == aSymbol && src.substr(i-4, 4) == "jst.") && !/\w/.test(src.substr(i+selector.length, 1)))
		    return true;
		i1 = i + selector.length;
		i = src.indexOf(selector, i1);
	};
	return false;
};
jst.Method.addMethod("callsSymbol:", "aSymbol", "testing");

jst.Method.addMethod("printJavascriptSourceOn:", "aStream", "printing", "\taStream nextPutAll: self body");

jst.Method.addMethod("<=", "otherMethod", "comparing", 
	"\t^ receiver name < otherMethod receiver name or: [receiver = otherMethod receiver & (selector <= otherMethod selector)]",
	null, "2011-09-23T12:53:18Z", "mp");

jst.Method.addMethod("species", "", "private", "\t^ Method");

jst.Method.addMethod("=", "otherMethod", "comparing", 
	"\t^ self species = otherMethod species and: [selector = otherMethod selector] and: [receiver = otherMethod receiver]");

jst.Method.addMethod("methodClass", "", "accessing", "\t^ receiver", null, "2011-10-23T19:52:28Z", "mp");

jst.Method.addMethod("tempNames", "", "accessing", function (){
	return this._args.asCollection();
}, null, "2012-01-05T15:01:34Z", "mp");

jst.Method.addMethod("asJavascript", "", "converting", 
	"\t^ self body",
	null, "2012-09-14T10:23:42Z", "mp");

jst.Method.addMethod("versions", "", "accessing", 
	"\t| coll met |" +
	"\n\tcoll := OrderedCollection new." +
	"\n\tmet := self." +
	"\n\t[met notNil] whileTrue: [" +
	"\n\t\tcoll add: met." +
	"\n\t\tmet := met priorVersion]." +
	"\n\t^ coll",
	null, "2013-06-03T19:32:49Z", "mp");

// SmalltalkMethod

// jst.SmalltalkMethod.addMethod("asJavascriptSource", "", "printing", "\t^ '\"', self source asJavascriptSource, '\"'");

jst.SmalltalkMethod.addMethod("printJavascriptSourceOn:", "aStream", "printing", "\t| lines |" +
	"\n\tlines := self body findTokens: String lf." +
	"\n\taStream nextPut: '\"'." +
	"\n\tlines do: [:str | str printJavascriptSourceOn: aStream] separatedBy: [" +
	"\n\t\taStream nextPutAll: '\" +'; nextPut: Character lf; nextPut: Character tab; nextPut: '\"'." +
	"\n\tString lf printJavascriptSourceOn: aStream]." +
	"\n\taStream nextPut: '\"'");

/*
jst.SmalltalkMethod.addMethod("selectors", "", "accessing", "\t| result |" +
	"\n\tcode isString ifTrue: [" +
	"\n\t\tself parseCode." +
	"\n\t\tself compile]." +
	"\n\tresult := SortedCollection new." +
	"\n\tcode do: [:exp | | selector |" +
	"\n\t\tselector := exp isMessageSend ifTrue: [exp asMessage selector] ifFalse: [" +
	"\n\t\t\t(exp isConstant and: [exp isSymbol]) ifTrue: ['#', exp asString]]." +
	"\n\t\t(selector isNil or: [result includes: selector]) ifFalse: [" +
	"\n\t\t\tresult add: selector]" +
	"\n\t]." +
	"\n\t^ result");
*/
jst.SmalltalkMethod.addMethod("selectors", "", "accessing", 
	"\t| result |" +
	"\n\tcode isString ifTrue: [" +
	"\n\t\tself parseCode." +
	"\n\t\tself compile]." +
	"\n\tresult := SortedCollection new." +
	"\n\tcode do: [:exp |" +
	"\n\t\texp isMessageSend ifTrue: [" +
	"\n\t\t\tresult addUnique: exp selector" +
	"\n\t\t] ifFalse: [(exp isConstant and: [exp isSymbol] and: [selector ~= exp asString]) ifTrue: [" +
	"\n\t\t\t(result includes: exp asString) ifFalse: [" +
	"\n\t\t\t\tresult addUnique: '#', exp asString]]]" +
	"\n\t]." +
	"\n\t^ result",
	null, "2013-10-22T09:45:31Z", "mp", 1);

jst.SmalltalkMethod.addMethod("selectors", "", "accessing", 
	"\t| result |" +
	"\n\tresult := SortedCollection new." +
	"\n\tcode do: [:exp |" +
	"\n\t\texp isMessageSend ifTrue: [" +
	"\n\t\t\tresult addUnique: exp selector" +
	"\n\t\t] ifFalse: [(exp isConstant and: [exp isSymbol] and: [selector ~= exp asString]) ifTrue: [" +
	"\n\t\t\t(result includes: exp asString) ifFalse: [" +
	"\n\t\t\t\tresult addUnique: '#', exp asString]]]" +
	"\n\t]." +
	"\n\t^ result",
	null, "2013-11-05T16:35:47Z", "mp"); //jst-kernel

/*
 * puvodni verze
jst.SmalltalkMethod.addMethod("callsSymbol:", "aSymbol", "testing", 
	"\tcode isString ifTrue: [" +
	"\n\t\tself parseCode." +
	"\n\t\tself compile]." +
	"\n\tcode do: [:exp | exp isMessageSend ifTrue: [exp asMessage selector = aSymbol ifTrue: [^ true]] ifFalse: [" +
	"\n\t\t(exp isConstant and: [exp isSymbol] and: [exp asString = aSymbol]) ifTrue: [^ true]]]." + 
	"\n\t^ false");
*/
/*
 * zlobi - nenajde treba EditorAction a taky je asi pomalejsi 
jst.SmalltalkMethod.addMethod("callsSymbol:", "aSymbol", "testing", 
	"\tcode isString ifTrue: [" +
	"\n\t\tself parseCode." +
	"\n\t\tself compile]." +
	"\n\tcode do: [:exp | " +
	"\n\t\texp asMessage ifNotNilDo: [:m | m selector = aSymbol ifTrue: [^ true]]." +
	"\n\t\t(exp isConstant and: [exp isSymbol] and: [exp asString = aSymbol]) ifTrue: [^ true]." +
	"\n\t\t(exp isVariable and: [exp isClassName] and: [exp name = aSymbol]) ifTrue: [^ true]." +
	"\n\t]." +
	"\n\t^ false");
*/
jst.SmalltalkMethod.addMethod("tempNames", "", "accessing", 
	"\t^ super tempNames, code tempNames",
	null, "2012-01-05T15:08:35Z", "mp");

jst.SmalltalkMethod.addMethod("callsSymbol:", "aSymbol", "testing", 
	"\tcode isString ifTrue: [" +
	"\n\t\tself compile]." +
	"\n\t^ code usesSymbol: aSymbol",
	null, "2012-03-29T10:05:40Z", "mp");

jst.SmalltalkMethod.addMethod("asBlock", "", "converting", function (){
	return this._receiver.protocol()[this.functionName()];
},
	null, "2013-11-05T13:52:45Z", "mp");

//*** Magnitude ***

with (jst.Magnitude) {
	
	addMethod("<", "aMagnitude", "comparing", "\tself subclassResponsibility: '<'");
	
	addMethod("<=", "aMagnitude", "comparing", function(aMagnitude){
		return !this[">"](aMagnitude);
	});
	
	addMethod("=", "aMagnitude", "comparing", "\tself subclassResponsibility: '='");

	addMethod(">", "aMagnitude", "comparing", function(aMagnitude){
		return jst.send(aMagnitude, "<", [this]);
	});
	
	addMethod(">=", "aMagnitude", "comparing", function(aMagnitude){
		return !this["<"](aMagnitude);
	});
	
	addMethod("between:and:", "min max", "comparing", function(min, max){
		return this[">="](min) && this["<="](max);
	});

};

// DateAndTime, part II

jst.DateAndTime._class.addMethod("fromMilliSeconds:", "aNumber", "native protocol", function (aNumber){
	return new Date(aNumber);
});

jst.DateAndTime.addMethod("=", "comparand", "native protocol", function (comparand){
	return this.getTime() == comparand.asDateAndTime().getTime();
},
	null, "2012-10-11T20:32:46Z", "mp");

jst.DateAndTime.addMethod("<", "comparand", "native protocol", function (comparand){
	return this.getTime() < comparand.asDateAndTime().getTime();
},
	null, "2012-10-11T20:33:11Z", "mp");

jst.DateAndTime.addMethod("+", "operand", "native protocol", function (operand){
	//operand conforms to protocol Duration
	return new Date(this.getTime() + operand.asDuration().asMilliSeconds());
},
	null, "2012-10-12T07:40:05Z", "mp");

jst.DateAndTime.addMethod("-", "operand", "native protocol", function (operand){
	//operand conforms to protocol DateAndTime or protocol Duration"
	if (operand.respondsTo_("asDateAndTime"))
		return jst.Duration.milliSeconds_(this.getTime() - operand.asDateAndTime().getTime());
	else	
		return new Date(this.getTime() - operand.asDuration().asMilliSeconds());
},
	null, "2012-10-12T07:53:01Z", "mp");

jst.DateAndTime._class.addMethod("midnight", "", "squeak protocol", 
	"\t^ self now midnight",
	null, "2012-10-12T07:44:03Z", "mp");

jst.DateAndTime._class.addMethod("noon", "", "squeak protocol", 
	"\t^ self now noon",
	null, "2012-10-12T07:44:03Z", "mp");

jst.DateAndTime.addMethod("year", "", "ansi protocol", function(){
	return this.getFullYear();
});

jst.DateAndTime.addMethod("month", "", "ansi protocol", function(){
	return this.getMonth()+1;
});

jst.DateAndTime.addMethod("dayOfMonth", "", "ansi protocol", function(){
	return this.getDate();
});

jst.DateAndTime.addMethod("dayOfWeek", "", "ansi protocol", function(){
	return this.getDay()+1;
});
	
jst.DateAndTime.addMethod("hour", "", "ansi protocol", function(){
	return this.getHours();
});

jst.DateAndTime.addMethod("minute", "", "ansi protocol", function(){
	return this.getMinutes();
});

jst.DateAndTime.addMethod("second", "", "ansi protocol", function(){
	return this.getSeconds();
});

jst.DateAndTime.addMethod("millisecond", "", "ansi protocol", function(){
	return this.getMilliseconds();
});
	
jst.DateAndTime.addMethod("dayMonthYearDo:", "aBlock", "squeak protocol", 
	"\t^ self dayMonthYearHMSDo: aBlock asUTC: false");

jst.DateAndTime.addMethod("dayMonthYearHMSDo:asUTC:", "aBlock aBoolean", "private", function(aBlock, aBoolean){
	return aBoolean ? aBlock(this.getUTCDate(), this.getUTCMonth()+1, this.getUTCFullYear(), 
		this.getUTCHours(), this.getUTCMinutes(), this.getUTCSeconds()) :
		aBlock(this.getDate(), this.getMonth()+1, this.getFullYear(), this.getHours(), this.getMinutes(), this.getSeconds());
});
	
jst.DateAndTime.addMethod("midnight", "", "squeak protocol", 
	"\t^ self dayMonthYearDo: [:d :m :y |" +
	"\n\t\tself class year: y month: m day: d]");

jst.DateAndTime.addMethod("noon", "", "squeak protocol", 
	"\t^ self dayMonthYearDo: [:d :m :y |" +
	"\n\t\tself class year: y month: m day: d hour: 12 minute: 0 second: 0 millisecond: 0]");
	
jst.DateAndTime.addMethod("printTime", "", "printing", 
	"\t^ '{1}:{2}:{3}' format: {" +
	"\n\t\tself hour asString paddedTo: 2 with: $0." +
	"\n\t\tself minute asString paddedTo: 2 with: $0." +
	"\n\t\tself second asString paddedTo: 2 with: $0}");
	
jst.DateAndTime.addMethod("yyyymmdd", "", "printing", "\t^ self dayMonthYearDo: [:d :m :y |" +
	"\n\t\t'{1}-{2}-{3}' format: {y. m asString paddedTo: 2 with: $0. d asString paddedTo: 2 with: $0}]");

jst.DateAndTime.addMethod("printCzechString", "", "printing", "\t^ self dayMonthYearDo: [:d :m :y |" +
	"\n\t\t'{1}.{2}.{3} {4}' format: {d. m. y. self printTime}]");

jst.DateAndTime.addMethod("asISOString", "", "printing", "\t^ self dayMonthYearHMSDo: [:d :m :y :h :min :s |" +
	"\n\t\t'{1}-{2}-{3}T{4}:{5}:{6}Z' format: {y. m asString paddedTo: 2 with: $0. d asString paddedTo: 2 with: $0." +
	"\n\t\t\th asString paddedTo: 2 with: $0. min asString paddedTo: 2 with: $0. s asString paddedTo: 2 with: $0}] asUTC: true");

/*
jst.DateAndTime.constructor.prototype.printString = function() {
	//for efficiency
	return (jst.Smalltalk.userLanguage() == 'cs') ? this.printCzechString() : this.printNative();	
};
jst.DateAndTime.addMethod("printString", "", "printing"); 

jst.DateAndTime.addMethod("printOn:", "aStream", "printing", 
	"\taStream nextPutAll: self printString");
*/

jst.DateAndTime.addMethod("printOn:", "aStream", "printing", function (aStream){
	//for efficiency
	aStream.nextPutAll_((jst.Smalltalk.userLanguage() == 'cs')  ? this.printCzechString() : this.printNative());
	return this;
},
	null, "2012-10-11T18:04:05Z", "mp");

jst.DateAndTime.addMethod("asDateAndTime", "", "squeak protocol", 
	"\t^ self",
	null, "2012-10-11T15:32:05Z", "mp");

jst.DateAndTime.addMethod("asNanoSeconds", "", "squeak protocol", 
	"\t\"Answer the number of nanoseconds since midnight\"" +
	"\n\t^ self asDuration asNanoSeconds",
	null, "2012-10-11T19:28:50Z", "mp");

jst.DateAndTime.addMethod("asDuration", "", "squeak protocol", function (){
	//Answer the duration since midnight.
	return jst.Duration.seconds_nanoSeconds_(
		this.getHours() * 3600 + this.getMinutes() * 60 + this.getSeconds(), 
		this.getMilliseconds() * 1000000);
},
	null, "2012-10-11T19:42:28Z", "mp");

jst.DateAndTime.addMethod("asDate", "", "squeak protocol", 
	"\t^ Date starting: self",
	null, "2012-12-05T21:45:30Z", "mp");

//Behavior

jst.Behavior.addMethod("printOn:", "aStream", "printing", 
	"\taStream nextPutAll: self name",
	null, "2011-10-24T13:51:55Z", "mp");

jst.Behavior.constructor.prototype.instSize = function(){
	//Answer the number of named instance variables of the receiver
	return (this.superclass() != jst.nil) ? this.superclass().instSize() + this._instanceVariables.size() : this._instanceVariables.size();
};
jst.Behavior.addMethod("instSize", "", "testing");

jst.Behavior.constructor.prototype.instVarNameAt_ = function (index){
	var d = this.instSize() - this._instanceVariables.size();
	return (index > d) 
		? this._instanceVariables[index-d-1] 
		: this.superclass().instVarNameAt_(index); 
};
jst.Behavior.addMethod("instVarNameAt:", "index", "accessing instances and variables");

jst.Behavior.constructor.prototype.methodTemplate = function() { 
	//Answer an expression to be edited and evaluated in order to define methods in this class or trait.
	return "messageSelectorAndArgumentNames" +
		"\n\t\"comment stating purpose of message\"" +
		"\n" +
		"\n\t| temporary variable names |" +
		"\n\tstatements";};
jst.Behavior.addMethod("methodTemplate", "", "compiling"); 

jst.Behavior.constructor.prototype.addMethod_categorize_ = function(source, category) {
	//compiles and installs a method from the source code, e.g. 'isString\n^true',
	//the source can be the parsed method too
	var m = (source.isString()) ? jst.Parser.parseMethod_of_(source, this) : source;
	//(m._args.notNil()) ? m._args.join(" ") : ""
	return this.addMethod(m._selector, null, category, m, null, jst.DateAndTime.now(), jst.Smalltalk.at_ifAbsent_("user", jst.nil));
};
jst.Behavior.addMethod("addMethod:categorize:", "source category", "adding/removing methods");

/* moved to jst-core
jst.Behavior.addMethod("includesSelector:", "aSymbol", "testing method dictionary", 
	"\t^self methodDict includesKey: aSymbol");

jst.Behavior.addMethod("canUnderstand:", "selector", "testing method dictionary", 
	"\t(self includesSelector: selector) ifTrue: [^true]." +
	"\n\tself superclass ifNil: [^false]." +
	"\n\t^self superclass canUnderstand: selector");
*/

jst.Behavior.addMethod("methodDictionary", "", "accessing method dictionary", 
	"\t^ self methodDict");

jst.Behavior.addMethod("allSuperclasses", "", "accessing class hierarchy", 
	"\t\"Answer an OrderedCollection of the receiver's and the receiver's  " +
	"\n\tancestor's superclasses. The first element is the receiver's immediate  " +
	"\n\tsuperclass, followed by its superclass; the last element is Object.\"" +
	"\n\t| temp |" +
	"\n\t^ self superclass == nil" +
	"\n\t\tifTrue: [OrderedCollection new]" +
	"\n\t\tifFalse: [temp := self superclass allSuperclasses." +
	"\n\t\t\ttemp addFirst: self superclass." +
	"\n\t\t\ttemp]");

jst.Behavior.addMethod("withAllSuperclasses", "", "accessing class hierarchy", 
	"\t\"Answer an OrderedCollection of the receiver and the receiver's " +
	"\n\tsuperclasses. The first element is the receiver, " +
	"\n\tfollowed by its superclass; the last element is Object.\"" +
	"\n\t| temp |" +
	"\n\ttemp := self allSuperclasses." +
	"\n\ttemp addFirst: self." +
	"\n\t^ temp");

jst.Behavior.addMethod("allSuperclassesDo:", "aBlock", "enumerating", 
	"\t\"Evaluate the argument, aBlock, for each of the receiver's superclasses.\"" +
	"\n\tself superclass ifNotNil: [" +
	"\n\t\taBlock value: self superclass." +
	"\n\t\tself superclass allSuperclassesDo: aBlock]",
	null, "2011-10-17T20:25:03Z", "mp");

jst.Behavior.addMethod("withAllSuperclassesDo:", "aBlock", "enumerating", 
	"\t\"Evaluate the argument, aBlock, for each of the receiver's superclasses.\"" +
	"\n\taBlock value: self." +
	"\n\tself superclass ifNotNil: [" +
	"\n\t\tself superclass withAllSuperclassesDo: aBlock]",
	null, "2011-10-17T20:37:21Z", "mp");

jst.Behavior.addMethod("withAllSubclassesDo:", "aBlock", "enumerating", 
	"\t\"Evaluate the argument, aBlock, for the receiver and each of its subclasses.\"" +
	"\n\taBlock value: self." +
	"\n\tself allSubclassesDo: aBlock",
	null, "2011-10-17T20:38:43Z", "mp");

jst.Behavior.addMethod("withAllSubclasses", "", "accessing class hierarchy", 
	"\t\"Answer a Set of the receiver, the receiver's descendent's, and the  " +
	"\n\treceiver's descendent's subclasses.\"" +
	"\n\t^ self allSubclasses add: self;" +
	"\n\t\t yourself",
	null, "2013-06-22T08:53:13Z", "mp");

jst.Behavior.addMethod("withAllSubAndSuperclassesDo:", "aBlock", "enumerating", 
	"\tself withAllSubclassesDo: aBlock." +
	"\n\tself allSuperclassesDo: aBlock.",
	null, "2011-10-17T20:39:46Z", "mp");

jst.Behavior.addMethod("environment", "", "accessing", 
	"\t\"Return the environment in which the receiver is visible\"" +
	"\n\t^ Smalltalk");

jst.Behavior.addMethod("whichMethodsAccess:", "varName", "testing method dictionary", 
	"\t\"instance or class var. name\"" +
	"\n\t| str |" +
	"\n\tstr := '_', varName." +
	"\n\t(self classPool includesKey: varName) ifTrue: [ | list |" +
	"\n\t\tstr := '_', str." +
	"\n\t\tlist := self theNonMetaClass methodDict values select: [:m | " +
	"\n\t\t\tm asBlock asString includesSubString: str]." +
	"\n\t\tself theMetaClass methodDict values do: [:m | " +
	"\n\t\t\t(m asBlock asString includesSubString: str) ifTrue: [list add: m]]." +
	"\n\t\t^ list]." +
	"\n\t^ methodDict values select: [:m | " +
	"\n\t\tm asBlock asString includesSubString: str]",
	null, "2011-10-24T10:06:42Z", "mp");
/*
jst.Behavior.addMethod("removeDefaultCategoryIfEmpty", "", "removing method categories", 
	"\tcategories at: MethodCategory defaultName ifPresent: [:cat |" +
	"\n\t\tcat methods ifEmpty: [" +
	"\n\t\t\tcategories removeKey: cat name]]",
	null, "2012-02-07T07:56:07Z", "mp");
*/
jst.Behavior.addMethod("removeEmptyCategories", "", "removing method categories", 
	"\tself methodCategories do: [:cat |" +
	"\n\t\tcat methods ifEmpty: [" +
	"\n\t\t\tcategories removeKey: cat name]]",
	null, "2012-02-07T10:26:51Z", "mp");

jst.Behavior.addMethod("allSelectors", "", "accessing method dictionary", 
	"\t\"Answer all selectors understood by instances of the receiver\"" +
	"\n\t| coll |" +
	"\n\tcoll := SortedCollection new." +
	"\n\tself withAllSuperclasses do: [:aClass | " +
	"\n\t\taClass selectors do: [:sel |" +
	"\n\t\t\tcoll addUnique: sel]]." +
	"\n\t^ coll",
	null, "2012-02-08T12:38:01Z", "mp");

jst.Behavior.addMethod("lookupSelector:", "selector", "accessing method dictionary", 
	"\t\"Look up the given selector in my methodDictionary." +
	"\n\tReturn the corresponding method if found." +
	"\n\tOtherwise chase the superclass chain and try again." +
	"\n\tReturn nil if no method is found.\"" +
	"\n\t^ methodDict at: selector ifAbsent: [" +
	"\n\t \tself superclass ifNotNil: [" +
	"\n\t\t\tself superclass lookupSelector: selector]]",
	null, "2012-02-08T12:43:18Z", "mp");

jst.Behavior.addMethod("overrideMethod:by:", "name selector", "javascript methods", function (name,selector){
	var cls = this.asJsObject();
	if (typeof cls == "function")
		cls = cls.prototype;
	//the original version is saved with prefix
	var fce = cls[name];
	var xName = "x" + name;
	cls[xName] = fce;
	//the original version is called, if the object (this) is not wrapped yet
	switch (fce.length) {
		case 0:
			fce = function(){
				return (this.jstProxy) ? jst.snd(this.jstProxy.jstWrapper(), selector) : this[xName]();};
			break;
		case 1:
			fce = function(a){
				return (this.jstProxy) ? jst.sndw(this.jstProxy.jstWrapper(), selector, a) : this[xName](a);};
			break;
		case 2:
			fce = function(a, b){
				return (this.jstProxy) ? jst.sndww(this.jstProxy.jstWrapper(), selector, a, b) : this[xName](a, b);};
			break;
		case 3:
			fce = function(a, b, c){
				return (this.jstProxy) ? jst.sndwww(this.jstProxy.jstWrapper(), selector, a, b, c) : this[xName](a, b, c);};
			break;
		default:
			this.error_("Cannot override method " + name + ": it has too many arguments!");
	};
	cls[name] = fce;
	return this;
},
	null, "2014-01-15T13:04:00Z", "mp");

jst.Behavior.addMethod("overrideMethod:", "name", "javascript methods", function (name){
	return this.overrideMethod_by_(name, name);
},
	null, "2014-01-15T13:18:19Z", "mp");

//SystemDictionary

jst.SystemDictionary.constructor.prototype.classNames = function (){
	//Answer a SortedCollection of all class names
	var names = jst.SortedCollection._new();
	this.allClassesDo_(function(cls) {
		names.add_(cls.name());
	});
	return names;
};
jst.SystemDictionary.addMethod("classNames", "", "class names");

jst.SystemDictionary.constructor.prototype.allClassesDo_ = function(aBlock) { 
	//Evaluate the argument, aBlock, for each class in the system
	return this.valuesDo_(function(cls) {
		if (cls._classPool) 
			aBlock.value_(cls);
	});
};
jst.SystemDictionary.addMethod("allClassesDo:", "aBlock", "retrieving");

/* prekonano, nove reseni viz jst-parser a jst-debug

jst.SystemDictionary.constructor.prototype.doIt_ = function(code) {
	//v javascriptu lze volat jako jst.doIt("...")
	//ve Smalltalku jako Smalltalk doIt: '...'
	return jst.Parser.parseCode_(code).doIt();
};
jst.SystemDictionary.addMethod("doIt:", "code", "utils");

jst.doIt = function(code) {
	return jst.Smalltalk.doIt_(code);
};

jst.SystemDictionary.constructor.prototype.printIt_ = function(code) {
	//v javascriptu lze volat jako jst.printIt("...")
	//ve Smalltalku jako Smalltalk printIt: '...'
	//var result = jst.Block.code_params_(jst.Parser.parseCode_(code), []).doIt();
	var result = this.doIt_(code);
	return (result != null) ? result.toString() : "nil";
};
jst.SystemDictionary.addMethod("printIt:", "code", "utils");

jst.printIt = function(code) {
	return jst.Smalltalk.printIt_(code);
};
 */
jst.SystemDictionary.constructor.prototype.userLanguage = function(){
	return window.navigator.language;
};
jst.SystemDictionary.addMethod("userLanguage", "", "system");

jst.SystemDictionary.addMethod("isRuntime", "", "testing", 
	"\t^ self at: #runtime",
	null, "2014-01-06T10:35:12Z", "mp");


// UndefinedObject

jst.UndefinedObject.addMethod("printOn:", "aStream", "printing", 
	"\taStream nextPutAll: 'nil'",
	null, "2012-01-03T08:23:20Z", "mp");

jst.UndefinedObject.addMethod("asJsObject", "", "converting", function() {
	return null;
});

jst.UndefinedObject.addMethod("asCollection", "", "converting", "\t^ #()");

jst.UndefinedObject.addMethod("size", "", "accessing", function() {
	//see Behavior>>instVarNameAt:
	return 0;
});

jst.UndefinedObject.addMethod("toString", "", "printing", 
	"\t^ ''",
	null, "2012-08-01T08:21:47Z", "mp");

jst.UndefinedObject.addMethod("asTextualList:separator:", "aSelectorSymbol aSeparator", "converting", 
	"\t^ ''",
	null, "2012-08-01T14:06:46Z", "mp");

jst.UndefinedObject.addMethod("asCSVString", "", "converting", 
	"\t^ ''",
	null, "2014-03-12T09:44:27Z", "mp");

jst.UndefinedObject.addMethod("<=", "anObject", "comparing", 
	"\t^ true",
	null, "2013-05-06T10:28:48Z", "mp");

//Boolean

jst.Boolean.addMethod("printString", "", "printing", function (){
	return this.toString();
}, null, "2011-09-09T13:32:31Z", "mp");

jst.Boolean.addMethod("printOn:", "aStream", "printing", 
	"\taStream nextPutAll: self printString", null, 
	"2011-09-09T13:32:14Z", "mp");

/*
jst.Array.addMethod("copyWithDependent:", "newElement", "copying", 
	"\tself size = 0 ifTrue: [^ DependentsArray with: newElement]." +
	"\n\t^ self copyWith: newElement");
*/
jst.Array.addMethod("copyWithDependent:", "newElement", "copying", 
	"\t^ self size = 0 " +
	"\n\t\tifTrue: [DependentsArray with: newElement]" +
	"\n\t\tifFalse: [self copyWith: newElement]",
	null, "2013-06-17T07:03:33Z", "mp");

// *** Duration ***

jst.Duration.addMethod("seconds:nanoSeconds:", "secondCount nanoCount", "private", 
	"\t\"Private - only used by Duration class\"" +
	"\n\tseconds := secondCount." +
	"\n\tnanos := nanoCount rounded",
	null, "2012-10-10T21:41:58Z", "mp");

jst.Duration._class.addMethod("seconds:nanoSeconds:", "seconds nanos", "squeak protocol", 
	"\t^ self basicNew" +
	"\n\t\tseconds: seconds truncated" +
	"\n\t\tnanoSeconds: seconds fractionPart * 1000000000 + nanos",
	null, "2012-10-10T21:47:28Z", "mp");

jst.Duration._class.addMethod("seconds:", "seconds", "ansi protocol", 
	"\t^ self seconds: seconds nanoSeconds: 0",
	null, "2012-10-10T21:49:24Z", "mp");

jst.Duration._class.addMethod("hours:", "aNumber", "squeak protocol", 
	"\t^ self seconds: aNumber * 3600 nanoSeconds: 0",
	null, "2012-10-10T21:49:19Z", "mp");

jst.Duration._class.addMethod("minutes:", "aNumber", "squeak protocol", 
	"\t^ self seconds: aNumber * 60 nanoSeconds: 0",
	null, "2012-10-10T21:49:55Z", "mp");

jst.Duration._class.addMethod("days:", "aNumber", "squeak protocol", 
	"\t^ self seconds: aNumber * 86400 nanoSeconds: 0",
	null, "2012-10-10T21:52:47Z", "mp");
/*
jst.Duration._class.addMethod("milliSeconds:", "milliCount", "squeak protocol", 
	"\t\"Since seconds is 0 we can call the instance directly.\"" +
	"\n\t^ self basicNew seconds: 0 nanoSeconds: milliCount * 1000000",
	null, "2012-10-11T20:49:03Z", "mp");
*/

jst.Duration._class.addMethod("milliSeconds:", "milliCount", "squeak protocol", function (milliCount){
	var quo = milliCount.quo_(1000);
	return this.basicNew().seconds_nanoSeconds_(quo, (milliCount - quo * 1000) * 1000000);
},
	null, "2012-10-12T08:07:12Z", "mp");

jst.Duration._class.addMethod("nanoSeconds:", "nanos", "squeak protocol", function (nanos){
	var quo = nanos.quo_(1000000000);
	return this.basicNew().seconds_nanoSeconds_(quo, nanos - quo * 1000000000);
},
	null, "2012-10-12T08:09:58Z", "mp");

jst.Duration.addMethod("initialize", "", "initialization", 
	"\tself seconds: 0 nanoSeconds: 0",
	null, "2012-10-11T15:24:36Z", "mp");

jst.Duration._class.addMethod("zero", "", "ansi protocol", 
	"\t^ self basicNew seconds: 0 nanoSeconds: 0",
	null, "2012-10-11T15:29:13Z", "mp");

jst.Duration.addMethod("asNanoSeconds", "", "squeak protocol", function (){
	return this._seconds * 1000000000 + this._nanos;
},
	null, "2012-10-11T19:27:56Z", "mp");

jst.Duration.addMethod("asDuration", "", "ansi protocol", 
	"\t^ self",
	null, "2012-10-11T19:30:28Z", "mp");

jst.Duration.addMethod("hours", "", "ansi protocol", 
	"\t\"Answer the number of hours the receiver represents.\"" +
	"\n\t^ (seconds rem: 86400) quo: 3600",
	null, "2012-10-11T19:46:23Z", "mp");

jst.Duration.addMethod("minutes", "", "ansi protocol", 
	"\t\"Answer the number of minutes the receiver represents.\"" +
	"\n\t^ (seconds rem: 3600) quo: 60",
	null, "2012-10-11T19:47:32Z", "mp");

jst.Duration.addMethod("seconds", "", "ansi protocol", 
	"\t\"Answer the number of seconds the receiver represents.\"" +
	"\n\t^ seconds rem: 60",
	null, "2012-10-11T19:50:12Z", "mp");

jst.Duration.addMethod("days", "", "ansi protocol", 
	"\t\"Answer the number of days the receiver represents.\"" +
	"\n\t^ seconds quo: 86400",
	null, "2012-10-11T19:51:14Z", "mp");

jst.Duration.addMethod("=", "comparand", "ansi protocol", function (comparand){
	//Answer whether the argument is a Duration representing the same period of time as the receiver.
	if (this === comparand)
		return true;
	else if (this.species() == comparand.species())
		return this.asNanoSeconds() == comparand.asNanoSeconds();
	else
		return false;
},
	null, "2012-10-11T20:01:52Z", "mp");

jst.Duration.addMethod("asMilliSeconds", "", "ansi protocol", function (){
	return  Math.floor((this._seconds * 1000000000 + this._nanos) / 1000000);
},
	null, "2012-10-11T20:17:24Z", "mp");

jst.Duration.addMethod("positive", "", "ansi protocol", function (){
	return (this._seconds == 0) ? this._nanos >= 0 : this._seconds >= 0;
},
	null, "2012-10-11T21:05:18Z", "mp");

jst.Duration.addMethod("printOn:", "aStream", "squeak protocol", 
	"\t\"Format as per ANSI 5.8.2.16: [-]D:HH:MM:SS[.S]\"" +
	"\n\tself positive ifFalse: [" +
	"\n\t\taStream nextPut: $-]." +
	"\n\tself days abs printOn: aStream." +
	"\n\t{ self hours. self minutes. self seconds} do: [:c | " +
	"\n\t\taStream " +
	"\n\t\t\tnextPut: $:; " +
	"\n\t\t\tnextPutAll: (c abs asString paddedTo: 2 with: $0)]." +
	"\n\tnanos > 0 ifTrue: [ | z ps |" +
	"\n\t\taStream nextPut: $.." +
	"\n\t\tps := nanos printString paddedTo: 9 with: $0. " +
	"\n\t\tz := ps findLast: [ :c | c charCode > $0 charCode]." +
	"\n\t\tps from: 1 to: z do: [ :c | aStream nextPut: c ]" +
	"\n\t]",
	null, "2012-10-11T21:46:40Z", "mp");

jst.Duration.addMethod("negated", "", "ansi protocol", function (){
	return this._class.basicNew().seconds_nanoSeconds_(-this._seconds, -this._nanos);
},
	null, "2012-10-12T08:30:27Z", "mp");

jst.Duration.addMethod("<", "comparand", "ansi protocol", 
	"\t^ self asNanoSeconds < comparand asNanoSeconds",
	null, "2013-04-28T19:55:06Z", "mp");

jst.Duration.addMethod("+", "operand", "ansi protocol", 
	"\t\"operand is a Duration\"" +
	"\n \t^ self class nanoSeconds: self asNanoSeconds + operand asNanoSeconds",
	null, "2013-04-28T20:01:42Z", "mp");

jst.Duration.addMethod("-", "operand", "ansi protocol", 
	"\t\"operand is a Duration\"" +
	"\n \t^ self + operand negated",
	null, "2013-04-28T19:59:06Z", "mp");

jst.Duration.addMethod("*", "operand", "ansi protocol", 
	"\t\"operand is a Number\"" +
	"\n \t^ self class nanoSeconds: self asNanoSeconds * operand",
	null, "2013-04-28T20:01:31Z", "mp");

// *** Timespan ***

jst.Timespan.addMethod("start", "", "squeak protocol", 
	"\t\"Answer the start DateAndTime of this timespan\"" +
	"\n\t^ start",
	null, "2012-10-11T18:47:01Z", "mp");

jst.Timespan.addMethod("duration", "", "squeak protocol", 
	"\t\"Answer the Duration of this timespan\"" +
	"\n\t^ duration",
	null, "2012-10-11T18:47:22Z", "mp");

jst.Timespan.addMethod("duration:", "aDuration", "private", 
	"\t\"Set the Duration of this timespan\"" +
	"\n\tduration := aDuration",
	null, "2012-10-11T15:30:26Z", "mp");

jst.Timespan.addMethod("start:", "aDateAndTime", "squeak protocol", 
	"\t\"Store the start DateAndTime of this timespan\"" +
	"\n\tstart := aDateAndTime asDateAndTime",
	null, "2012-10-11T15:31:10Z", "mp");

jst.Timespan.addMethod("asDateAndTime", "", "squeak protocol", 
	"\t^ start",
	null, "2012-10-11T15:32:39Z", "mp");

jst.Timespan._class.addMethod("starting:duration:", "aDateAndTime aDuration", "squeak protocol", 
	"\t^ self basicNew" +
	"\n \t\tstart: aDateAndTime asDateAndTime;" +
	"\n\t\tduration: aDuration;" +
	"\n\t\tyourself",
	null, "2012-10-11T15:41:45Z", "mp");

jst.Timespan._class.addMethod("starting:", "aDateAndTime", "squeak protocol", 
	"\t^ self starting: aDateAndTime duration: Duration zero",
	null, "2012-10-11T15:42:19Z", "mp");

jst.Timespan._class.addMethod("current", "", "squeak protocol", 
	"\t^ self starting: DateAndTime now",
	null, "2012-10-11T15:43:18Z", "mp");

jst.Timespan._class.addMethod("new", "", "instance creation", 
	"\t^ self starting: DateAndTime new",
	null, "2012-10-11T15:51:10Z", "mp");

jst.Timespan.addMethod("+", "operand", "ansi protocol", 
	"\t\"operand conforms to protocol Duration\"" +
	"\n\t^ self class starting: (self start + operand) duration: self duration",
	null, "2012-10-11T18:36:36Z", "mp");

jst.Timespan.addMethod("-", "operand", "ansi protocol", 
	"\t\"operand conforms to protocol DateAndTime or protocol Duration\"" +
	"\n\t^ (operand respondsTo: #asDateAndTime)" +
	"\n\t \tifTrue: [self start - operand]" +
	"\n\t\tifFalse: [self + operand negated]",
	null, "2012-10-11T18:39:48Z", "mp");

jst.Timespan.addMethod("<", "comparand", "ansi protocol", 
	"\t^ self start < comparand",
	null, "2012-10-11T18:41:54Z", "mp");

jst.Timespan.addMethod("=", "comparand", "ansi protocol", 
	function (comparand){
	return this.klass() == comparand.klass() 
		&& this._start["="](comparand.start()) 
		&& this.duration()["="](comparand.duration());
},
	null, "2012-10-11T18:45:36Z", "mp");

jst.Timespan.addMethod("asDuration", "", "squeak protocol", 
	"\t^ self duration",
	null, "2012-10-11T19:30:00Z", "mp");

jst.Timespan.addMethod("asDate", "", "squeak protocol", 
	"\t^ start asDate",
	null, "2012-12-05T21:46:52Z", "mp");

// *** Date ***

jst.Date.addMethod("yyyymmdd", "", "printing", 
	"\t^ start yyyymmdd",
	null, "2012-10-11T16:45:27Z", "mp");

jst.Date._class.addMethod("starting:", "aDateAndTime", "squeak protocol", 
	"\t^ super starting: aDateAndTime midnight duration: (Duration days: 1)",
	null, "2012-10-11T16:36:59Z", "mp");

jst.Date._class.addMethod("today", "", "smalltalk-80", 
	"\t^ self current",
	null, "2012-10-11T16:37:38Z", "mp");

jst.Date.addMethod("printNative", "", "printing", 
	function (){
	return this._start.toDateString();
},
	null, "2012-10-11T18:19:01Z", "mp");

jst.Date.addMethod("printCzechString", "", "printing", 
	"\t^ start dayMonthYearDo: [:d :m :y |" +
	"\n\t\t'{1}.{2}.{3}' format: {d. m. y}]",
	null, "2012-10-11T18:20:23Z", "mp");

jst.Date.addMethod("printOn:", "aStream", "printing", function (aStream){
	//for efficiency
	aStream.nextPutAll_((jst.Smalltalk.userLanguage() == 'cs')  ? this.printCzechString() : this.printNative());
	return this;
},
	null, "2012-10-11T18:24:05Z", "mp");

jst.Date._class.addMethod("fromString:", "aString", "squeak protocol", 
	"\t^ self starting: (DateAndTime fromString: aString)",
	null, "2012-10-11T18:33:31Z", "mp");

jst.Date.addMethod("asDate", "", "squeak protocol", 
	"\t^ self",
	null, "2012-12-05T21:46:06Z", "mp");

jst.Date.addMethod("asJsObject", "", "converting", 
	"\t^ start",
	null, "2013-03-15T18:47:58Z", "mp");

// *** RegExp ***

jst.RegExp.addMethod("pattern", "", "accessing", 
	"\t^ pattern",
	null, "2012-10-18T20:04:33Z", "mp");

jst.RegExp.addMethod("pattern:", "aString", "accessing", 
	"\t\"The text of the regular expression.\"" +
	"\n\tobj := nil." +
	"\n\tpattern := aString\t",
	null, "2013-04-11T09:08:33Z", "mp");

jst.RegExp.addMethod("searchPattern:", "anObject", "accessing", 
	"\tself pattern: (anObject asCollection asTextualList: #asSearchPattern separator: '|')",
	null, "2014-04-14T12:11:53Z", "mp");

/*
jst.RegExp.addMethod("substring:", "aString", "accessing", function (aString){
	//Special characters \^$*+?.():=!|{},[] have to be interpreted literally
	var spec = /[\\\^\$\*\+\?\.\(\)\:\=\!\|\{\}\,\[\]]/;
	var pattern = "";
	for (var i = 0; i < aString.length; i++) {
		if (spec.test(aString.charAt(i)))
			pattern += "\\";
		pattern += aString.charAt(i);
	};
	this.pattern_(pattern);
	return this;
},
	null, "2013-04-11T09:11:40Z", "mp");
*/
jst.RegExp.addMethod("substring:", "aString", "accessing", 
	"\tself pattern: aString asSearchPattern",
	null, "2013-04-11T10:10:51Z", "mp");

jst.RegExp.addMethod("flags", "", "accessing", 
	"\t| flags |" +
	"\n\tflags := ''." +
	"\n\t{global. 'g'. ignoreCase. 'i'. multiline. 'm'} pairsDo: [:flag :s |" +
	"\n\t\tflag = true ifTrue: [flags := flags, s]]." +
	"\n\t^ flags",
	null, "2012-10-18T15:01:52Z", "mp");

jst.RegExp.addMethod("global", "", "accessing", 
	"\t^ global ifNil: false",
	null, "2012-10-18T20:04:00Z", "mp");

jst.RegExp.addMethod("global:", "aBoolean", "accessing", 
	"\t\"Whether to test the regular expression against all possible matches in a string, or only against the first.\"" +
	"\n\tobj := nil." +
	"\n\tglobal := aBoolean",
	null, "2012-10-18T15:35:32Z", "mp");

jst.RegExp.addMethod("ignoreCase", "", "accessing", 
	"\t^ ignoreCase ifNil: false",
	null, "2012-10-18T20:03:00Z", "mp");

jst.RegExp.addMethod("ignoreCase:", "aBoolean", "accessing", 
	"\t\"Whether to ignore case while attempting a match in a string.\"" +
	"\n\tobj := nil." +
	"\n\tignoreCase := aBoolean",
	null, "2012-10-18T15:36:44Z", "mp");

jst.RegExp.addMethod("multiline", "", "accessing", 
	"\t^ multiline ifNil: false",
	null, "2012-10-18T20:04:23Z", "mp");

jst.RegExp.addMethod("multiline:", "aBoolean", "accessing", 
	"\t\"Whether or not to search in strings across multiple lines.\"" +
	"\n\tobj := nil." +
	"\n\tmultiline := aBoolean",
	null, "2012-10-18T15:37:19Z", "mp");

jst.RegExp.addMethod("replaceWith:", "stringOrBlock", "accessing", 
	"\treplacement := stringOrBlock",
	null, "2014-03-27T20:18:46Z", "mp");

jst.RegExp.addMethod("asJsObject", "", "converting", function (){
	if (this._obj == jst.nil)
		this._obj = new RegExp(this._pattern, this.flags());
	return this._obj;
},
	null, "2012-10-18T15:36:08Z", "mp");

jst.RegExp.addMethod("match:", "aString", "processing", function (aString){
	//Executes the search for a match between a regular expression and a specified string. Returns true or false.
	if (this._obj.lastIndex && this._obj.lastIndex > 0)
		this._obj.lastIndex = 0;
	return this.asJsObject().test(aString);
},
	null, "2012-10-18T19:57:14Z", "mp");

jst.RegExp.addMethod("execOn:", "aString", "processing", function (aString){
	/*
	If the match succeeds, the exec method returns an array and updates properties of the regular expression object. 
	The returned array has the matched text as the first item, and then one item for each capturing parenthesis 
	that matched containing the text that was captured.  If the match fails, the exec method returns null.
	 */
	if (this._obj.lastIndex && this._obj.lastIndex > 0)
		this._obj.lastIndex = 0;
	return this.asJsObject().exec(aString);
},
	null, "2012-10-18T19:52:02Z", "mp", 1);

jst.RegExp.addMethod("execOn:", "aString", "processing", function (aString){
	/*
	If the match succeeds, the exec method returns an array and updates properties of the regular expression object. 
	The returned array has the matched text as the first item, and then one item for each capturing parenthesis 
	that matched containing the text that was captured.  If the match fails, the exec method returns null.
	 */
	if (this._obj.lastIndex && this._obj.lastIndex > 0)
		this._obj.lastIndex = 0;
	if (this._replacement != jst.nil) 
		return aString.replace(this.asJsObject(), this._replacement);
	else
		return this.asJsObject().exec(aString);
},
	null, "2014-03-27T20:24:09Z", "mp"); //jst-kernel

jst.RegExp.addMethod("value:", "anObject", "processing", 
	"\t^ self execOn: anObject",
	null, "2014-03-27T20:54:32Z", "mp");

jst.RegExp.addMethod("replace:with:", "aString newSubstringOrBlock", "processing", 
	function (aString,newSubstringOrBlock){
	//The first argument supplied to the block is matched substring
	if (this._obj.lastIndex && this._obj.lastIndex > 0)
		this._obj.lastIndex = 0;
	return aString.replace(this.asJsObject(), newSubstringOrBlock);
},
	null, "2014-03-27T16:34:41Z", "mp");

// Error

jst.Error.addMethod("type", "", "accessing", 
	"\t^ self className",
	null, "2012-12-19T09:44:22Z", "mp");

// ClassBuilder
/*
jst.ClassBuilder.addMethod("tooDangerousClasses", "", "private", 
	"\t\"Return a list of class names which will not be modified in the public interface (copied fromSqueak)\"" +
	"\n\t^ #(" +
	"\n\t\t\"Object will break immediately\"" +
	"\n\t\tProtoObject Object" +
	"\n\t\t\"Contexts and their superclasses\"" +
	"\n\t\tInstructionStream ContextPart BlockContext MethodContext" +
	"\n\t\t\"Superclasses of basic collections\"" +
	"\n\t\tCollection SequenceableCollection ArrayedCollection" +
	"\n\t\t\"Collections known to the VM\"" +
	"\n\t\tArray Bitmap String Symbol ByteArray CompiledMethod TranslatedMethod" +
	"\n\t\t\"Basic Numbers\"" +
	"\n\t\tMagnitude Number SmallInteger Float" +
	"\n\t\t\"Misc other\"" +
	"\n\t\tLookupKey Association Link Point Rectangle PositionableStream UndefinedObject" +
	"\n\t)",
	null, "2011-10-14T21:00:09Z", "mp");
*/

//Parser extensions

jst.Assignment.addMethod("printOn:", "aStream", "printing", 
	"\tvariable printOn: aStream." +
	"\n\taStream nextPutAll: ' := '." +
	"\n\texpression printOn: aStream",
	null, "2013-10-12T21:49:21Z", "mp");

jst.SmalltalkCode.addMethod("printOn:", "aStream", "printing", 
	"\towner isMethod ifTrue: [" +
	"\n\t\taStream nextPutAll: owner printMessagePattern; lf]." +
	"\n\taStream nextPutAll: self  printSource",
	null, "2013-10-12T22:25:50Z", "mp");

jst.Return.addMethod("printOn:", "aStream", "printing", 
	"\taStream nextPutAll: '^ '." +
	"\n\texpression printOn: aStream",
	null, "2013-10-12T22:01:06Z", "mp");

jst.MessageSend.addMethod("printOn:", "aStream", "printing", 
	"\tsuper printOn: aStream." +
	"\n\taStream nextPutAll: ' #'; nextPutAll: selector",
	null, "2013-10-22T20:09:11Z", "mp");
