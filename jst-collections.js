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
 * Depends on jst-core, jst-parser
 */

jst.currentJsFile = "jst-collections";

// *** CLASSES ***

jst.Object.subclass("Character", "", "Untypeable", "", "Collections");

jst.Magnitude.subclass("LookupKey", "key", "", "", "Collections-Support");

jst.LookupKey.subclass("Association", "value", "", "", "Collections-Support");

jst.Object.subclass("Stream", "", "", "", "Collections-Streams");

jst.Stream.subclass("PositionableStream", "collection position readLimit", "", "", "Collections-Streams");
jst.PositionableStream.subclass("ReadStream", "", "", "", "Collections-Streams");
jst.PositionableStream.subclass("WriteStream", "writeLimit isStringStream", "", "", "Collections-Streams");

jst.WriteStream.subclass("LimitedWriteStream", "limit limitBlock", "", "", "Collections-Streams");

jst.SequenceableCollection.subclass("Interval", "start stop step", "", "", "Collections");

jst.Dictionary.subclass("IdentityDictionary", "", "", "", "Collections");

// *** METHODS ***

//*** Character ***

jst.Character._class.addMethod("cr", "", "accessing untypeable", 
function(){
	return "\r";
});

jst.Character._class.addMethod("lf", "", "accessing untypeable", 
function(){
	return "\n";
});

jst.Character._class.addMethod("tab", "", "accessing untypeable", 
function(){
	return "\t";
});

jst.Character._class.addMethod("space", "", "accessing untypeable", 
function(){
	return " ";
});

jst.Character._class.addMethod("initialize", "", "class initialization", "\tUntypeable := Dictionary new" +
	"\n\t\tat: self cr put: '\\\\r';" +
	"\n\t\tat: self lf put: '\\\\n';" +
	"\n\t\tat: self tab put: '\\\\t';" +
	"\n\t\tat: '\"' put: '\\\\\"';" +
	"\n\t\tyourself");

jst.initializeClass(jst.Character);

jst.Character._class.addMethod("untypeable", "", "accessing", "\t^ Untypeable");

// Collection

jst.Collection._class.addMethod("with:", "anObject", "instance creation", "\t^ self new add: anObject; yourself");

jst.Collection._class.addMethod("with:with:", "firstObject secondObject", "instance creation", 
	"\t^ self new" +
	"\n\t\tadd: firstObject;" +
	"\n\t\tadd: secondObject;" +
	"\n\t\tyourself");

jst.Collection.addMethod(",", "aCollection", "copying", "\t^self copyWithAll: aCollection");

jst.Collection._class.addMethod("withAll:", "aCollection", "instance creation", 
	"\t\"Create a new collection containing all the elements from aCollection.\"" +
	"\n\t^ (self new: aCollection size)" +
	"\n\t\taddAll: aCollection;" +
	"\n\t\tyourself",
	null, "2012-05-13T19:38:20Z", "mp");

jst.Collection.constructor.prototype.copyWithAll_ = function(aCollection) {
	var result = this.copy();
	jst.sndw(aCollection, "do_",
		function(each){result.push(each);}); //funguje i pro pole
	return result;
};
jst.Collection.addMethod("copyWithAll:", "aCollection", "copying");

jst.Collection.addMethod("copyWithDependent:", "newElement", "copying",	"\t^ self copyWith: newElement");

jst.Collection.addMethod("select:", "aBlock", "enumerating", 
	"\t| newCollection |" +
	"\n\tnewCollection := self species new." +
	"\n\tself do: [:each | (aBlock value: each) ifTrue: [newCollection add: each]]." +
	"\n\t^newCollection");

jst.Collection.addMethod("reject:", "aBlock", "enumerating", 
	"\t\"Evaluate aBlock with each of the receiver's elements as the argument. " +
	"\n\tCollect into a new collection like the receiver only those elements for " +
	"\n\twhich aBlock evaluates to false. Answer the new collection.\"" +
	"\n\t^ self select: [:element | (aBlock value: element) == false]",
	null, "2012-04-26T11:04:32Z", "mp");

jst.Collection.addMethod("copyWithout:", "oldElement", "copying", 
	"\t\"Answer a copy of the receiver that does not contain any elements equal to oldElement.\"" +
	"\n\t^ self reject: [:each | each = oldElement]",
	null, "2012-04-26T11:05:47Z", "mp");

jst.Collection.addMethod("copyWithoutAll:", "aCollection", "copying", 
	"\t\"Answer a copy of the receiver that does not contain any elements equal to those in aCollection.\"" +
	"\n\t^ self reject: [:each | aCollection includes: each]",
	null, "2012-04-26T18:55:16Z", "mp");

jst.Collection.addMethod("collect:", "aBlock", "enumerating", 
	"\t| newCollection |" +
	"\n\tnewCollection := self species new." +
	"\n\tself do: [:each | newCollection add: (aBlock value: each)]." +
	"\n\t^newCollection");

jst.Collection.addMethod("errorNotFound:", "anObject", "private", "\tself error: 'Object is not in the collection.'");

jst.Collection.addMethod("detect:", "aBlock", "enumerating", "\t^ self detect: aBlock ifNone: [self errorNotFound: aBlock]");

jst.Collection.addMethod("asJsObject", "", "converting", "\t^self collect: [:each | each asJsObject]");

/*jst.Collection.addMethod("isEmpty", "", "testing", "\t^self size = 0"); implementuje uz jst-core
jst.Collection.addMethod("ifEmpty:", "aBlock", "testing", 
	"\t^ self isEmpty ifTrue: aBlock");
*/
jst.Collection.addMethod("ifEmpty:", "aBlock", "testing", 
	"\t^ self isEmpty " +
	"\n\t\tifTrue: aBlock" +
	"\n\t\tifFalse: [self]",
	null, "2013-09-12T08:28:51Z", "mp");

jst.Collection.addMethod("ifNotEmptyDo:", "aBlock", "testing", 
	"\t^ self isEmpty ifFalse: [aBlock value: self]");

jst.Collection.addMethod("ifEmpty:ifNotEmptyDo:", "emptyBlock notEmptyBlock", "testing", 
	"\t\"Evaluate emptyBlock if I'm empty, notEmptyBlock otherwise\"" +
	"\n\t\"Evaluate the notEmptyBlock with the receiver as its argument\"" +
	"\n\t^ self isEmpty ifTrue: emptyBlock ifFalse: [notEmptyBlock value: self]");

jst.Collection.addMethod("ifNotEmptyDo:ifEmpty:", "notEmptyBlock emptyBlock", "testing", 
	"\t\"Evaluate emptyBlock if I'm empty, notEmptyBlock otherwise" +
	"\n\tEvaluate the notEmptyBlock with the receiver as its argument\"" +
	"\n\t^ self isEmpty ifFalse: [notEmptyBlock value: self] ifTrue: emptyBlock");

jst.Collection.addMethod("inject:into:", "thisValue binaryBlock", "enumerating", "\t| nextValue |" +
	"\n\tnextValue := thisValue." +
	"\n\tself do: [:each | nextValue := binaryBlock value: nextValue value: each]." +
	"\n\t^ nextValue");

jst.Collection.addMethod("printNameOn:", "aStream", "printing", 
	"\tsuper printOn: aStream");

/*
jst.Collection.addMethod("printElementsOn:", "aStream", "printing", 
	"\taStream nextPut: $(." +
	"\n\tself do: [:element | aStream print: element] separatedBy: [aStream space]." +
	"\n\taStream nextPut: $)");
*/
jst.Collection.addMethod("printElementsOn:", "aStream", "printing", 
	"\taStream nextPut: $(." +
	"\n\tself do: [:element | aStream cr; print: element]." +
	"\n\taStream nextPut: $)",
	null, "2013-10-01T07:46:58Z", "mp"); //jst-kernel

jst.Collection.addMethod("printOn:", "aStream", "printing", 
	"\t\"Append a sequence of characters that identify the receiver to aStream.\"" +
	"\n\tself printNameOn: aStream." +
	"\n\tself printElementsOn: aStream");

jst.Collection.addMethod("errorEmptyCollection", "", "private", 
	"\tself error: 'This collection is empty'");

jst.Collection.addMethod("emptyCheck", "", "private", 
	"\tself isEmpty ifTrue: [self errorEmptyCollection]");

jst.Collection.addMethod("anyOne", "", "accessing", 
	"\t\"Answer a representative sample of the receiver. This method can" +
	"\n\tbe helpful when needing to preinfer the nature of the contents of " +
	"\n\tsemi-homogeneous collections.\"" +
	"\n\tself emptyCheck." +
	"\n\tself do: [:each | ^ each]");

jst.Collection.addMethod("noneSatisfy:", "aBlock", "enumerating", function (aBlock){
	/*Evaluate aBlock with the elements of the receiver.
	  If aBlock returns false for all elements return true.
	  Otherwise return false*/
	return this.anySatisfy_(aBlock) == false;
},
	null, "2013-02-07T10:21:16Z", "mp");

jst.Collection.addMethod("allSatisfy:", "aBlock", "enumerating", function (aBlock){
	/*Evaluate aBlock with the elements of the receiver.
	  If aBlock returns false for any element return false.
	  Otherwise return true.*/
	return this.anySatisfy_(function(ea){return aBlock.value_(ea) == false;}) == false;
},
	null, "2013-02-07T15:33:08Z", "mp");

jst.Collection.addMethod("asCollection", "", "converting", "\t^ self");

jst.Collection.addMethod("do:separatedBy:", "elementBlock separatorBlock", "enumerating", 
	"\t\"Evaluate the elementBlock for all elements in the receiver," +
	"\n\tand evaluate the separatorBlock between.\"" +
	"\n\t| beforeFirst | " +
	"\n\tbeforeFirst := true." +
	"\n\tself do: [:each |" +
	"\n\t\tbeforeFirst" +
	"\n\t\t\tifTrue: [beforeFirst := false]" +
	"\n\t\t\tifFalse: [separatorBlock value]." +
	"\n\t\telementBlock value: each]");

jst.Collection.addMethod("remove:", "oldObject", "removing", 
	"\t\"Remove oldObject from the receiver's elements. Answer oldObject " +
	"\n\tunless no element is equal to oldObject, in which case, raise an error." +
	"\n\tArrayedCollections cannot respond to this message.\"" +
	"\n\t^ self remove: oldObject ifAbsent: [self errorNotFound: oldObject]");

jst.Collection.addMethod("asArray", "", "converting", 
	"\t\"Answer an Array whose elements are the elements of the receiver.\"" +
	"\n\t^ Array withAll: self",
	null, "2012-05-13T20:05:40Z", "mp");

jst.Collection.addMethod("asTextualList:separator:", "aSelectorSymbol aSeparator", "converting", 
function (aSelectorSymbol,aSeparator){
	return this.collect_(function(ea){return ea.perform_(aSelectorSymbol).toString(); }).join(aSeparator);
},
	null, "2012-07-31T14:43:21Z", "mp");

jst.Collection.addMethod("asCSVString", "", "converting", 
	"\t^ self asTextualList: #asString separator: ', '",
	null, "2014-03-10T20:55:10Z", "mp");

jst.Collection.addMethod("mask:", "aDictionary", "enumerating", 
	"\t^ self collect: [:ea |" +
	"\n\t\taDictionary at: ea ifAbsent: ea]",
	null, "2012-09-24T10:13:50Z", "mp");

jst.Collection.addMethod("select:thenCollect:", "selectBlock collectBlock", "enumerating", 
	"\t\"Utility method to improve readability.\"" +
	"\n\t^ (self select: selectBlock) collect: collectBlock",
	null, "2013-03-01T14:14:43Z", "mp");

jst.Collection.addMethod("select:thenDo:", "selectBlock doBlock", "enumerating", 
	"\t\"Utility method to improve readability.\"" +
	"\n\t^ (self select: selectBlock) do: doBlock",
	null, "2013-04-18T13:11:43Z", "mp");

jst.Collection.addMethod("collect:thenDo:", "collectBlock doBlock", "enumerating", 
	"\t\"Utility method to improve readability.\"" +
	"\n\t^ (self collect: collectBlock) do: doBlock",
	null, "2013-04-18T09:23:14Z", "mp");

jst.Collection.addMethod("collect:thenSelect:", "collectBlock selectBlock", "enumerating", 
	"\t\"Utility method to improve readability.\"" +
	"\n\t^ (self collect: collectBlock) select: selectBlock",
	null, "2013-04-18T09:23:31Z", "mp");

//Array

jst.Array.new_ = function(sizeRequested) {
	//prvky pole jsou ovsem undefined
	return this.adopt_(new Array(sizeRequested));
};
jst.Array._class.addMethod("new:", "sizeRequested", "instance creation");

jst.Array._class.addMethod("withAll:", "aCollection", "instance creation", 
	"\t\"Create a new collection containing all the elements from aCollection.\"" +
	"\n\t^ (self new: aCollection size) replaceFrom: 1 to: aCollection size with: aCollection startingAt: 1",
	null, "2012-05-13T19:35:30Z", "mp");

jst.Array.addMethod("asArray", "", "converting", 
	"\t\"Answer with the receiver itself.\"" +
	"\n\t^ self",
	null, "2012-05-13T20:04:42Z", "mp");

jst.Array.constructor.prototype.asJsArray = function() {
	return this.inject_into_([], function(result, ea){result.push(ea); return result;});
};
jst.Array.addMethod("asJsArray", "", "converting");

jst.Array.addMethod("printOn:", "aStream", "printing", 
	"\taStream nextPut: $#." +
	"\n\tself printElementsOn: aStream", null, 
	"2011-09-09T13:40:33Z", "mp");

// SequenceableCollection, part II

jst.SequenceableCollection.constructor.prototype.species = function() {
	return (this._class == jst.SequenceableCollection) ? jst.Array : this._class;
};
jst.SequenceableCollection.addMethod("species", "", "private");

jst.SequenceableCollection._class.addMethod("with:", "anObject", "instance creation", 
	"\t| newCollection |" +
	"\n\tnewCollection := self new: 1." +
	"\n\tnewCollection at: 1 put: anObject." +
	"\n\t^ newCollection");

jst.SequenceableCollection._class.addMethod("with:with:", "firstObject secondObject", "instance creation", 
	"\t| newCollection |" +
	"\n\tnewCollection := self new: 2." +
	"\n\tnewCollection at: 1 put: firstObject." +
	"\n\tnewCollection at: 2 put: secondObject." +
	"\n\t^ newCollection");

jst.SequenceableCollection.constructor.prototype.at_put_ = function(index, anObject) {
	return this[index-1] = anObject;
};
jst.SequenceableCollection.addMethod("at:put:", "index anObject", "accessing");

jst.SequenceableCollection.addMethod("errorNoSuchElement", "", "private", 
	"\tself error: 'Attempt to index non-existent element'");

jst.SequenceableCollection.constructor.prototype.copyFrom_to_ = function(start, stop) {
	if (start < 1 || stop > this.size())
		this.errorNoSuchElement();
	var result = this.species()._new();
	for(var i = start; i <= stop; i++)
		//push() funguje i pro pole
		result.push(this.at_(i));
	return result;
};
jst.SequenceableCollection.addMethod("copyFrom:to:", "start stop", "copying");

jst.SequenceableCollection.addMethod("first:", "n", "accessing", "^ self copyFrom: 1 to: n");

jst.SequenceableCollection.addMethod("allButLast:", "n", "accessing", "\t^ self copyFrom: 1 to: self size - n");
jst.SequenceableCollection.addMethod("allButLast", "", "accessing", "\t^ self allButLast: 1");

jst.SequenceableCollection.constructor.prototype.select_ = function(aBlock) {
	var result = this.species()._new();
	this.forEach(function(ea){
		if (aBlock.value_(ea)) 
			result.push(ea);
	});
	/*for(var i = 1; i <= this.size(); i++) {
		if (aBlock.value_(this.at_(i)))
			//push funguje i pro pole
			result.push(this.at_(i));
	};*/
	return result;
};
jst.SequenceableCollection.addMethod("select:", "aBlock", "enumerating");

jst.SequenceableCollection.constructor.prototype.collect_ = function(aBlock) {
	var result = this.species().new_(this.size());
	for(var i = 1; i <= this.size(); i++)
		result.at_put_(i, aBlock.value_(this.at_(i)));
	return result;
};
jst.SequenceableCollection.addMethod("collect:", "aBlock", "enumerating");

jst.SequenceableCollection.addMethod("shallowCopy", "", "copying", "\t^self copyFrom: 1 to: self size");

jst.SequenceableCollection.addMethod("allButFirst:", "n", "copying", 
	"\t\"Answer a copy of the receiver containing all but the first n" +
	"\n\t elements. Raise an error if there are not enough elements.\"" +
	"\n\t^ self copyFrom: n + 1 to: self size");

jst.SequenceableCollection.addMethod("allButFirst", "", "copying", "\t^ self allButFirst: 1");
/*		
jst.SequenceableCollection.addMethod("replaceFrom:to:with:startingAt:", "start stop replacement repStart", "accessing", 
	"\t\"This destructively replaces elements from start to stop in the receiver " +
	"\n\tstarting at index, repStart, in the sequenceable collection, " +
	"\n\treplacementCollection. Answer the receiver. No range checks are performed.\"" +
	"\n\t| index repOff |" + 
	"\n\trepOff := repStart - start." +
	"\n\tindex := start - 1." +
	"\n\t[(index := index + 1) <= stop]" +
	"\n\t\twhileTrue: [self at: index put: (replacement at: repOff + index)]");
*/

jst.SequenceableCollection.addMethod("second", "", "accessing", function(){
	return this.at_(2);
});

jst.SequenceableCollection.addMethod("third", "", "accessing", function(){
	return this.at_(3);
});

jst.SequenceableCollection.addMethod("fourth", "", "accessing", function(){
	return this.at_(4);
});

jst.SequenceableCollection.addMethod("fifth", "", "accessing", function(){
	return this.at_(5);
});

jst.SequenceableCollection.addMethod("sixth", "", "accessing", function(){
	return this.at_(6);
});

jst.SequenceableCollection.addMethod("seventh", "", "accessing", function(){
	return this.at_(7);
});

jst.SequenceableCollection.addMethod("eighth", "", "accessing", function(){
	return this.at_(8);
});

jst.SequenceableCollection.addMethod("ninth", "", "accessing", function(){
	return this.at_(9);
});

jst.SequenceableCollection.addMethod("indexOf:startingAt:", "anElement start", "accessing", 
function(anElement, start){
	return this.indexOf_startingAt_ifAbsent_(anElement, start, 0);
});

jst.SequenceableCollection.addMethod("indexOf:ifAbsent:", "anElement exceptionBlock", "accessing", 
function(anElement, exceptionBlock){
	return this.indexOf_startingAt_ifAbsent_(anElement, 1, exceptionBlock);
});

jst.SequenceableCollection.addMethod("lastIndexOf:startingAt:ifAbsent:", "anElement start exceptionBlock", "accessing", 
function (anElement,start,exceptionBlock){
	var i = this.lastIndexOf(anElement, start);
	return (i >= 0) ? i+1 : jst.snd(exceptionBlock,"value");
});

jst.SequenceableCollection.addMethod("lastIndexOf:ifAbsent:", "anElement exceptionBlock", "accessing", 
function (anElement,exceptionBlock){
	return this.lastIndexOf_startingAt_ifAbsent_(anElement, this.size(), exceptionBlock);
});

jst.SequenceableCollection.addMethod("copyUpToLast:", "anElement", "copying", 
	"\t\"Answer a copy of the receiver from index 1 to the last occurrence of " +
	"\n\tanElement, not including anElement.\"" +
	"\n\t^ self first: (self lastIndexOf: anElement ifAbsent: [^ self copy]) - 1",
	null, "2012-01-29T20:19:47Z", "mp", 1);

jst.SequenceableCollection.addMethod("copyUpToLast:", "anElement", "copying", 
	"\t\"Answer a copy of the receiver from index 1 to the last occurrence of " +
	"\n\tanElement, not including anElement.\"" +
	"\n\t^ self first: (self lastIndexOf: anElement ifAbsent: [self size + 1]) - 1",
	null, "2013-10-22T20:05:23Z", "mp"); //jst-kernel

jst.SequenceableCollection.addMethod("copyUpTo:", "anElement", "copying", 
	"\t\"Answer all elements up to but not including anObject. If there is no such object, answer a copy of the receiver.\"" +
	"\n\t^ self first: (self indexOf: anElement ifAbsent: [^ self copy]) - 1",
	null, "2012-01-29T20:19:47Z", "mp", 1);

jst.SequenceableCollection.addMethod("copyUpTo:", "anElement", "copying", 
	"\t\"Answer all elements up to but not including anObject. If there is no such object, answer a copy of the receiver.\"" +
	"\n\t^ self first: (self indexOf: anElement ifAbsent: [self size + 1]) - 1",
	null, "2013-10-22T19:49:58Z", "mp"); //jst-kernel

jst.SequenceableCollection.addMethod("replaceFrom:to:with:startingAt:", "start stop replacement repStart", "private",
function(start, stop, replacement, repStart) {
	//Primitive. This destructively replaces elements from start to stop in the receiver starting at index, repStart, 
	//in the collection, replacement. Answer the receiver. No range checks are performed.
	var repOff = repStart - start;
	var index = start - 1;
	while (++index <= stop)
		//musi fungovat i pro SortedCollection, nelze pouzit #at:put:
		this[index-1] = replacement.at_(repOff + index);
	return this;
});

jst.SequenceableCollection._class.addMethod("streamContents:", "blockWithArg", "stream creation", "\t| stream |" +
	"\n\tstream := WriteStream on: (self new: 100)." +
	"\n\tblockWithArg value: stream." +
	"\n\t^ stream contents");

jst.SequenceableCollection._class.addMethod("streamContents:limitedTo:", "blockWithArg sizeLimit", "stream creation", 
	"\t| stream |" +
	"\n\tstream := LimitedWriteStream on: (self new: (100 min: sizeLimit))." +
	"\n\tstream setLimit: sizeLimit limitBlock: [^ stream contents]." +
	"\n\tblockWithArg value: stream." +
	"\n\t^ stream contents");

jst.SequenceableCollection.addMethod("writeStream", "", "converting", "\t^ WriteStream on: self");

jst.SequenceableCollection.addMethod("readStream", "", "converting", "\t^ ReadStream on: self");

jst.SequenceableCollection.addMethod("do:separatedBy:", "elementBlock separatorBlock", "enumerating", 
	"\t1 to: self size do: [:index |" +
	"\n\t\tindex = 1 ifFalse: [separatorBlock value]." +
	"\n\t\telementBlock value: (self at: index)]");

jst.SequenceableCollection.addMethod("anyOne", "", "accessing", "\t^ self first");

jst.SequenceableCollection.addMethod("reverseDo:", "aBlock", "enumerating", 
	"\t\"Evaluate aBlock with each of the receiver's elements as the argument, " +
	"\n\tstarting with the last element and taking each in sequence up to the " +
	"\n\tfirst. For SequenceableCollections, this is the reverse of the enumeration " +
	"\n\tfor do:.\"" +
	"\n\tself size to: 1 by: -1 do: [:index | aBlock value: (self at: index)]",
	null, "2011-10-20T08:56:36Z", "mp");


jst.SequenceableCollection.constructor.prototype.pairsDo_ = function (aBlock){
	//mp 2012-05-14T19:29:27Z
	//Evaluate aBlock with my elements taken two at a time.  If there's an odd number of items, ignore the last one.  
	//Allows use of a flattened array for things that naturally group into pairs.  See also pairsCollect:
	var max = Math.floor(this.size() / 2);
	for (var index = 1; index <= max; index++)
		jst.sndww(aBlock, "value_value_", this.at_(2 * index - 1), this.at_(2 * index));
	return this;
};
jst.SequenceableCollection.addMethod("pairsDo:", "aBlock", "enumerating");

jst.SequenceableCollection.constructor.prototype.hasEqualElements_ = function (otherCollection){
	//Answer whether the receiver's size is the same as otherCollection's
	//size, and each of the receiver's elements equal the corresponding 
	//element of otherCollection
	if (!otherCollection.isKindOf_(jst.SequenceableCollection)) 
		return false;
	if (this.size() != otherCollection.size())
		return false;
	for (var index = 1; index <= this.size(); index++)
		if (!jst.sndw(this.at_(index), "=", otherCollection.at_(index)))
			return false;
	return true;
};
jst.SequenceableCollection.addMethod("hasEqualElements:", "otherCollection", "comparing");

jst.SequenceableCollection.addMethod("=", "otherCollection", "comparing", 
	function (otherCollection){
	//Answer true if the receiver is equivalent to the otherCollection.
	//First test for identity, then rule out different species and sizes of
	//collections. As a last resort, examine each element of the receiver
	//and the otherCollection.
	if (this["=="](otherCollection)) 
		return true;
	if (!this.species()["=="](otherCollection.species()))
		return false;
	return this.hasEqualElements_(otherCollection);
});

jst.SequenceableCollection.addMethod("remove:ifAbsent:", "oldObject anExceptionBlock", "removing", 
	"\t\"SequencableCollections cannot implement removing.\"" +
	"\n\tself shouldNotImplement");

jst.SequenceableCollection.addMethod("copyAfter:", "anElement", "copying", 
	"\t\"Answer a copy of the receiver from after the first occurence of anElement up to the end. " +
	"\n\tIf no such element exists, answer an empty copy.\"" +
	"\n\t^ self allButFirst: (self indexOf: anElement ifAbsent: [self size])",
	null, "2012-04-27T07:03:21Z", "mp");

jst.SequenceableCollection.addMethod("copyAfterLast:", "anElement", "copying", 
	"\t\"Answer a copy of the receiver from after the last occurence of anElement up to the end. " +
	"\n\tIf no such element exists, answer an empty copy.\"" +
	"\n\t^ self allButFirst: (self lastIndexOf: anElement ifAbsent: [self size])",
	null, "2012-04-27T07:05:00Z", "mp");

jst.SequenceableCollection.addMethod("printOn:", "aStream", "printing", 
	"\tself class == SequenceableCollection " +
	"\n\t\tifTrue: [" +
	"\n\t\t\taStream nextPut: $[." +
	"\n\t\t\tself do: [:element | aStream print: element] separatedBy: [aStream nextPutAll: ', ']." +
	"\n\t\t\taStream nextPut: $]]" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tsuper printOn: aStream]" +
	"\n\t",
	null, "2012-06-07T08:26:03Z", "mp");

jst.SequenceableCollection.addMethod("asDictionary", "", "converting", 
	"\t| dict |" +
	"\n\tdict := Dictionary new." +
	"\n\tself pairsDo: [:key :val | (dict includesKey: key) " +
	"\n\t\tifTrue: [dict error: 'Duplicate key: ', key printString]" +
	"\n\t\tifFalse: [dict at: key put: val]]." +
	"\n\t^ dict",
	null, "2013-03-18T07:42:59Z", "mp");

jst.SequenceableCollection.addMethod("findLast:", "aBlock", "enumerating", function (aBlock){
	//Return the index of my last element for which aBlock evaluates as true.
	for (var index = this.size(); index > 0; index--)
		if (aBlock.value_(this.at_(index)))
			return index;
	return  0;
},
	null, "2012-10-11T21:37:05Z", "mp");

jst.SequenceableCollection.addMethod("from:to:do:", "start stop aBlock", "enumerating", 
	"\t\"Evaluate aBlock for all elements between start and stop (inclusive).\"" +
	"\n\tstart to: stop do: [:index | aBlock value: (self at: index)]",
	null, "2012-10-11T21:41:10Z", "mp");

jst.SequenceableCollection.addMethod("copyWithFirst:", "newElement", "copying", function (newElement){
	//Answer a copy of the receiver that is 1 bigger than the receiver with newElement as the first element.
	var result = this.copy();
	result.unshift(newElement);
	return result;
},
	null, "2014-01-30T13:56:47Z", "mp");

// OrderedCollection

/* kontraproduktivni - nefungovalo pak napr. Collection class>>withAll:
jst.OrderedCollection.new_ = function(sizeRequested) {
	//prvky kolekce jsou ovsem undefined
	return this.adopt_(new Array(sizeRequested));
};
jst.OrderedCollection._class.addMethod("new:", "sizeRequested", "instance creation");
*/
jst.OrderedCollection._class.addMethod("new:", "sizeRequested", "instance creation", 
	"\t^ self new",
	null, "2013-04-08T08:31:52Z", "mp");

jst.OrderedCollection.constructor.prototype.removeFirst = function(){
	return this.shift();
};
jst.OrderedCollection.addMethod("removeFirst", "", "removing");

jst.OrderedCollection.addMethod("removeIndex:", "removedIndex", "private", 
	"\t\"The method for public use is #removeAt: \"" +
	"\n\tself " +
	"\n\t\treplaceFrom: removedIndex " +
	"\n\t\tto: self size - 1 " +
	"\n\t\twith: self" +
	"\n\t\tstartingAt: removedIndex + 1." +
	"\n\tself removeLast");

jst.OrderedCollection.addMethod("removeAt:", "index", "removing", 
	"\t| removed |" +
	"\n\tremoved := self at: index." +
	"\n\tself removeIndex: index." +
	"\n\t^ removed");

jst.OrderedCollection.addMethod("remove:ifAbsent:", "oldObject absentBlock", "removing", 
	function (oldObject,absentBlock){
	var index = 1;
	while (index <= this.size()) {
		//if (oldObject["="](this.at_(index))) {
		if (jst.sndw(oldObject,"=",this.at_(index)) == true) {
			this.removeIndex_(index);
			return oldObject;
		} else
			index++;
	};
	return jst.snd(absentBlock,"value");
});

jst.OrderedCollection.addMethod("addFirst:", "newObject", "adding", 
function (newObject) {
	this.unshift(newObject); 
	return newObject;
});

jst.OrderedCollection.addMethod("insert:before:", "anObject index", "private", 
function(anObject, index) {
	if (index == 1) {
		this.unshift(anObject);
		return anObject;
	};
	this.unshift(null);
	this.replaceFrom_to_with_startingAt_(1, index - 1, this, 2);
	//musi fungovat i pro OrderedCollection, nelze pouzit #at:put:
	this[index-1] = anObject;
	return anObject;
});

jst.OrderedCollection.addMethod("asJsArray", "", "converting", 
	function (){
	return this.inject_into_([], function(result, ea){result.push(ea); return result;});
},
	null, "2012-08-01T15:33:16Z", "mp");

// SortedCollection

jst.SortedCollection.addMethod("at:put:", "anInteger anObject", "accessing", "\tself shouldNotImplement");

jst.SortedCollection.addMethod("addFirst:", "newObject", "adding", "\tself shouldNotImplement");

jst.SortedCollection.addMethod("copy", "", "copying", 
	"\t| newCollection |" +
	"\n\tnewCollection := self species sortBlock: sortBlock." +
	"\n\tnewCollection addAll: self." +
	"\n\t^newCollection");

jst.SortedCollection.constructor.prototype.collect_ = function(aBlock) {
	var result = jst.OrderedCollection._new();
	for(var i = 1; i <= this.size(); i++)
		result.addLast_(aBlock.value_(this.at_(i)));
	return result;
};
jst.SortedCollection.addMethod("collect:", "aBlock", "enumerating");

/*
jst.SortedCollection.addMethod("indexForInserting:", "newObject", "private", 
function(newObject) {
	var self = this;
	var low = 1;
	var high = self.size();
	var index;
	if (self._sortBlock.isNil()) {
		(function(){index = Math.floor((high + low) / 2);  return low > high;}).whileFalse_(
			function(){return (self.at_(index) <= newObject) ? low = index + 1 : high = index - 1;});
	} else {
		(function(){index = Math.floor((high + low) / 2); return low > high;}).whileFalse_( 
			function(){return (self._sortBlock.value_value_(self.at_(index), newObject)) ? low = index + 1 : high = index - 1;});
	};
	return low;
});
*/
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
	 	while (low <= high) {
			index = Math.floor((high + low) / 2);
			if (self._sortBlock.value_value_(self.at_(index), newObject)) 
				low = index + 1;
			else
				high = index - 1;
		}
	};
	return low;
});

jst.SortedCollection.addMethod("insert:before:", "anObject index", "private", 
	"\tself shouldNotImplement");
/*
jst.SortedCollection.addMethod("add:", "newObject", "adding", 
	"\t^ super insert: newObject before: (self indexForInserting: newObject)");
*/

jst.SortedCollection.addMethod("add:", "newObject", "adding", function (newObject){
	//efficiency reasons
	return jst.OrderedCollection.protocol().insert_before_.call(this, newObject, this.indexForInserting_(newObject));
});

/*
jst.SortedCollection.constructor.prototype.addUnique_ = function (newObject){
	//adds the same object only once
	var i = this.indexForInserting_(newObject);
	if (this.size() == 0 || i == 1 || !jst.sndw(this.at_(i-1), "=", newObject))
		jst.OrderedCollection.protocol().insert_before_.call(this, newObject, i);
	return newObject;
};
jst.SortedCollection.addMethod("addUnique:", "newObject", "adding");
*/
jst.SortedCollection.addMethod("addUnique:", "newObject", "adding", function (newObject){
	//adds the same object only once
	var i = this.indexForInserting_(newObject);
	if (this.size() == 0 || i == 1 || !jst.sndw(this.at_(i-1), "=", newObject))
		return jst.OrderedCollection.protocol().insert_before_.call(this, newObject, i);
	//returns the object found
	return this.at_(i-1);
},
	null, "2013-04-18T13:08:21Z", "mp");

// String

jst.String._class.addMethod("new:", "sizeRequested", "instance creation", "\t^ self new");

jst.String.addMethod("asJsObject", "", "converting", 
function(){
	//nutne takto primo, implementace v Object pomoci #yourself nefugnuje
	return this.toString();
});

jst.String._class.addMethod("with:", "anObject", "instance creation", "\t^ self new , anObject");

jst.String.constructor.prototype.copyWithAll_ = function (aCollection) {
	return aCollection.isString() ? this + aCollection : this + aCollection.join('');
};
jst.String.addMethod("copyWithAll:", "aCollection", "copying");

jst.String.constructor.prototype.copyWith_ = function(newElement) {
	return this + newElement;
};
jst.String.addMethod("copyWith:", "newElement", "copying");

jst.String.addMethod("copyWithFirst:", "newElement", "copying", function (newElement){
	return newElement + this;
},
	null, "2014-01-30T13:53:59Z", "mp");

jst.String.constructor.prototype.copyFrom_to_ = function(start, stop) {
	if (start < 1 || stop > this.size())
		this.errorNoSuchElement();
	return this.slice(start-1, stop);
};
jst.String.addMethod("copyFrom:to:", "start stop", "copying");

jst.String.addMethod("replaceFrom:to:with:startingAt:", "start stop replacement repStart", "private", "\tself shouldNotImplement");

jst.String.addMethod("copyReplaceFrom:to:with:startingAt:", "start stop replacement repStart", "private", 
function(start, stop, replacement, repStart){
	return this.substr(0, start-1) + replacement.slice(repStart-1) + this.toString().slice(start+replacement.length-repStart);
});

/*
jst.String.constructor.prototype.asRegExp_literally_ = function (flags, aBoolean){
	if (!aBoolean)
		return new RegExp(this, flags);
	var spec = "\^$*+?.():=!|{},[]";
	var pattern = "";
	for (var i = 0; i < this.length; i++) {
		if (spec.includes_(this.charAt(i)))
			pattern += "\\";
		pattern += this.charAt(i);
	};
	return new RegExp(pattern, flags);
};
jst.String.addMethod("asRegExp:literally:", "flags aBoolean", "converting");

jst.String.addMethod("asRegExp:literally:", "flags aBoolean", "converting", function (flags,aBoolean){
	if (!aBoolean)
		return new RegExp(this, flags);
	//Special characters \^$*+?.():=!|{},[] have to be interpreted literally
	var spec = /[\\\^\$\*\+\?\.\(\)\:\=\!\|\{\}\,\[\]]/;
	var pattern = "";
	for (var i = 0; i < this.length; i++) {
		if (spec.test(this.charAt(i)))
			pattern += "\\";
		pattern += this.charAt(i);
	};
	return new RegExp(pattern, flags);
},
	null, "2012-10-18T20:44:16Z", "mp");

jst.String.addMethod("asJsRegExp:", "flags", "converting", function (flags){
	//Special characters \^$*+?.():=!|{},[] have to be interpreted literally
	var spec = /[\\\^\$\*\+\?\.\(\)\:\=\!\|\{\}\,\[\]]/;
	var pattern = "";
	for (var i = 0; i < this.length; i++) {
		if (spec.test(this.charAt(i)))
			pattern += "\\";
		pattern += this.charAt(i);
	};
	return new RegExp(pattern, flags);
},
	null, "2012-10-22T14:42:50Z", "mp");
*/

jst.String.addMethod("asSearchPattern", "", "converting", function (){
	//Special characters \^$*+?.():=!|{},[] have to be interpreted literally
	var spec = /[\\\^\$\*\+\?\.\(\)\:\=\!\|\{\}\,\[\]]/;
	var pattern = "";
	for (var i = 0; i < this.length; i++) {
		if (spec.test(this.charAt(i)))
			pattern += "\\";
		pattern += this.charAt(i);
	};
	return pattern;
},
	null, "2013-04-11T10:09:51Z", "mp");

/*
jst.String.constructor.prototype.includesSubString_caseSensitive_ = function (subString,caseSensitive){
	return this.search(subString.asJsRegExp_(caseSensitive ? "" : "i")) >= 0;
};
jst.String.addMethod("includesSubString:caseSensitive:", "subString caseSensitive", "testing");

jst.String.addMethod("includesSubString:caseSensitive:", "subString caseSensitive", "testing", 
	function (subString,caseSensitive){
	if (!caseSensitive)
		return this.search(subString.asJsRegExp_("i")) >= 0;
	return this.indexOf(subString) >= 0;
},
	null, "2012-10-22T15:16:29Z", "mp"); //jst-kernel
*/

jst.String.addMethod("includesSubString:caseSensitive:", "subString caseSensitive", "testing", 
	function (subString,caseSensitive){
	if (!caseSensitive)
		return this.search(new RegExp(subString.asSearchPattern(), "i")) >= 0;
	return this.indexOf(subString) >= 0;
},
	null, "2013-04-11T10:13:34Z", "mp");

/*
jst.String.constructor.prototype.copyReplaceAll_with_ = function(oldSubstring, newSubstring) {
	return this.replace(oldSubstring.asJsRegExp_("g"), newSubstring);
};
jst.String.addMethod("copyReplaceAll:with:", "oldSubstring newSubstring", "copying"); 
*/
jst.String.addMethod("copyReplaceAll:with:", "oldSubstring newSubstring", "copying", 
	function (oldSubstring,newSubstring){
	return this.replace(new RegExp(oldSubstring.asSearchPattern(), "g"), newSubstring);
},
	null, "2013-04-11T10:12:58Z", "mp", 1);

jst.String.addMethod("copyReplaceAll:with:", "oldSubstring newSubstringOrBlock", "copying", 
	function (oldSubstring,newSubstringOrBlock){
	//The first argument supplied to the block is matched substring
	return this.replace(new RegExp(oldSubstring.asSearchPattern(), "g"), newSubstringOrBlock);
},
	null, "2014-03-27T16:19:02Z", "mp"); //jst-kernel

jst.String.addMethod("copyReplaceAll:with:caseSensitive:", "oldSubstring newSubstringOrBlock caseSensitive", "copying", 
	function (oldSubstring,newSubstringOrBlock,caseSensitive){
	//The first argument supplied to the block is matched substring
	return this.replace(new RegExp(oldSubstring.asSearchPattern(), 
		(caseSensitive == true) ? "g" : "ig"), newSubstringOrBlock);
},
	null, "2014-03-27T16:19:07Z", "mp");

jst.String.addMethod("asLowercase", "", "converting", null, "toLocaleLowerCase");
jst.String.addMethod("asUppercase", "", "converting", null, "toLocaleUpperCase");


jst.String.constructor.prototype.isLowercase = function (){
	return this.length > 0 && this.asLowercase() == this.toString();
};
jst.String.addMethod("isLowercase", "", "testing");

jst.String.constructor.prototype.isUppercase = function (){
	return this.length > 0 && this.asUppercase() == this.toString();
};
jst.String.addMethod("isUppercase", "", "testing");

jst.String.constructor.prototype.select_ = function(aBlock) {
	var result = "";
	for (var i = 1; i <= this.size(); i++) {
		if (aBlock.value_(this.at_(i)) == true)
			result += this.at_(i);
	};
	return result;
};
jst.String.addMethod("select:", "aBlock", "enumerating");

jst.String.constructor.prototype.collect_ = function(aBlock) {
	var result = "";
	for (var i = 1; i <= this.size(); i++)
		result += aBlock.value_(this.at_(i));
	return result;
};
jst.String.addMethod("collect:", "aBlock", "enumerating");

/*
jst.String.addMethod("findTokens:", "delimiters", "accessing", function (delimiters){
	return jst.Array.adopt_(this.split(new RegExp("["+delimiters+"]"))).select_(
		function(str){return str.size() > 0;});
});

jst.String.addMethod("findTokens:", "delimiters", "accessing", function (delimiters){
	//delimiters can be a RegExp or String
	return jst.Array.adopt_(this.split(
		(typeof delimiters == "string") ? new RegExp("["+delimiters+"]") : delimiters)).select_(
		function(str){return str.size() > 0;});
},
	null, "2012-10-17T14:13:59Z", "mp");
*/

jst.String.addMethod("findTokens:", "delimiters", "accessing", function (delimiters){
	//delimiters can be a RegExp or String
	return jst.OrderedCollection.adopt_(this.split(
		(typeof delimiters == "string") ? new RegExp("["+delimiters+"]") : delimiters)).select_(
		function(str){return str.size() > 0;});
},
	null, "2013-09-30T08:17:04Z", "mp"); //jst-kernel

jst.String._class.addMethod("cr", "", "instance creation", "^ Character cr");
jst.String._class.addMethod("lf", "", "instance creation", "^ Character lf");
jst.String._class.addMethod("crlf", "", "instance creation", "^ Character cr, Character lf");
jst.String._class.addMethod("tab", "", "instance creation", "^ Character tab");
jst.String._class.addMethod("space", "", "instance creation", "^ Character space");

jst.String.addMethod("printJavascriptSourceOn:", "aStream", "printing", 
	"\tself do: [:ch |" +
	"\n\t\taStream nextPut: (Character untypeable at: ch ifAbsent: [ch])]");
/*
jst.String._class.addMethod("streamContents:", "blockWithArg", "stream creation", "\t| stream |" +
	"\n\tstream := StringWriteStream new." +
	"\n\tblockWithArg value: stream." +
	"\n\t^ stream contents");
*/
jst.String.addMethod("paddedTo:with:", "length char", "copying", function(length, char){
	var str = "";
	while (length > str.length + this.length)
		str += char.charAt(0);
	return str + this;
});

jst.String.addMethod("isVowel", "", "testing", function(){
	return this.size() == 1 && /[AEIOU]/i.test(this);
});

jst.String.addMethod("isDigit", "", "testing", function (){
	return this.size() == 1 && /\d/.test(this);
},
	null, "2014-03-19T10:35:54Z", "mp");

jst.String.addMethod("findString:startingAt:", "subString start", "accessing", 
	function (subString,start){
	//Answer the index of subString within the receiver, starting at start. If the receiver does not contain subString, answer 0.
	return this.indexOf(subString, start-1) + 1;
	});

/*
jst.String.addMethod("includesSubString:", "subString", "accessing", 
	"\t^ (self findString: subString startingAt: 1) > 0");
*/

jst.String.addMethod("includesSubString:", "subString", "testing", function (subString){
	return this.indexOf(subString) >= 0;
},
	null, "2012-10-22T14:58:32Z", "mp");

jst.String.addMethod("includes:", "anObject", "testing", function (anObject){
	return anObject.length == 1 && this.indexOf(anObject) >= 0;
},
	null, "2012-10-22T15:04:12Z", "mp");

/*
jst.String.addMethod("endsWith:", "suffix", "comparing", 
	"\t\"Answer whether the tail end of the receiver is the same as suffix.\"" +
	"\n\t| extra |" +
	"\n\t(extra := self size - suffix size) < 0 ifTrue: [^ false]." +
	"\n\t^ (self findString: suffix startingAt: extra + 1) > 0");
*/
jst.String.addMethod("endsWith:", "suffix", "comparing", 
	"\t\"Answer whether the tail end of the receiver is the same as suffix.\"" +
	"\n\t| extra |" +
	"\n\t^ (extra := self size - suffix size) < 0 " +
	"\n\t\tifTrue: [false]" +
	"\n\t\tifFalse: [(self findString: suffix startingAt: extra + 1) > 0]",
	null, "2013-10-03T11:08:55Z", "mp"); //jst-kernel

jst.String.addMethod("asCollection", "", "converting", "\t^ OrderedCollection with: self");

jst.String.constructor.prototype.eval = function (){
	//mp 2012-03-09T08:12:45Z
	return eval(this.toString());
}; 
jst.String.addMethod("eval", "", "evaluating");

jst.String.constructor.prototype.charCode = function (){
	//mp 2012-05-14T20:44:34Z
	return this.charCodeAt(0);
}; 
jst.String.addMethod("charCode", "", "accessing");

jst.String.addMethod("truncateWithElipsisTo:", "maxLength", "converting", 
	"\t\"Return myself or a copy suitably shortened but with elipsis added\"" +
	"\n\t^ self size <= maxLength " +
	"\n\t\tifTrue: [self]" +
	"\n\t\tifFalse: [(self copyFrom: 1 to: (maxLength - 3)), '...']" +
	"\n\t\"'truncateWithElipsisTo:' truncateWithElipsisTo: 20\"",
	null, "2011-11-11T13:21:40Z", "mp");

jst.String.addMethod("keywords", "", "converting", 
	"\t| result str |" +
	"\n\tresult := OrderedCollection new." +
	"\n\tstr := '' writeStream." +
	"\n\tself do: [:ch | " +
	"\n\t\tstr nextPut: ch." +
	"\n\t\tch = $: ifTrue: [" +
	"\n\t\t\tresult add: str contents." +
	"\n\t\t\tstr := '' writeStream]" +
	"\n\t]." +
	"\n\tresult ifEmpty: [result add: str contents]." +
	"\n\t^ result",
	null, "2011-11-17T21:02:32Z", "mp");

jst.String._class.addMethod("withAll:", "aCollection", "instance creation", 
	"\t\"Create a new collection containing all the elements from aCollection.\"" +
	"\n\t^ self new copyWithAll: aCollection",
	null, "2012-05-13T19:54:41Z", "mp");

jst.String.addMethod("asDateAndTime", "", "converting", 
	"\t\"Convert from UTC format\" " +
	"\n\t^ DateAndTime fromString: self",
	null, "2012-10-11T15:33:16Z", "mp");

jst.String.addMethod("asMutator", "", "converting", function (){
	//Return a setter message from a getter message.
	//For example #name asMutator returns #name:"
	return this + ':';
},
	null, "2013-01-23T22:08:53Z", "mp");

jst.String.addMethod("ifNotString:", "aBlock", "testing", 
	"\t^ self",
	null, "2012-11-13T13:22:49Z", "mp");

jst.String.addMethod("alike:", "aString", "comparing", 
	"\t\"Answer some indication of how alike the receiver is to the argument, 0 is no match, twice aString size is best score. Case is ignored.\"" +
	"\n\t| i j k minSize bonus |" +
	"\n\tminSize := (j := self size) min: (k := aString size)." +
	"\n\tbonus := (j - k) abs < 2 ifTrue: 1 ifFalse: 0." +
	"\n\ti := 1." +
	"\n\t[(i <= minSize) and: [(self at: i) asLowercase  = (aString at: i) asLowercase]] whileTrue: [" +
	"\n\t\ti := i + 1]." +
	"\n\t[(j > 0) and: [k > 0] and: [(self at: j) asLowercase = (aString at: k) asLowercase]] whileTrue: [" +
	"\n\t\tj := j - 1." +
	"\n\t\tk := k - 1]." +
	"\n\t^ i - 1 + self size - j + bonus",
	null, "2013-05-31T12:35:49Z", "mp");

jst.String.addMethod("withoutHtmlTags", "", "converting", 
	function (){
	//This line is optional, it replaces escaped brackets with real ones, i.e. &lt; is replaced with < and &gt; is replaced with >
	var strInputCode = this.replace(/&(lt|gt);/g, function (strMatch, p1){
		return (p1 == "lt")? "<" : ">";
	});
	return strInputCode.replace(/<\/?[^>]+(>|$)/g, "");
},
	null, "2014-03-27T10:06:28Z", "mp");

/*
jst.String.addMethod("printOn:", "aStream", "printing", 
	"\t\"Print inside string quotes, doubling inbedded quotes.\"" +
	"\n\t| x |" +
	"\n\taStream nextPut: $'." +
	"\n\t1 to: self size do: [:i |" +
	"\n\t\taStream nextPut: (x := self at: i)." +
	"\n\t\tx = $' ifTrue: [aStream nextPut: x]]." +
	"\n\taStream nextPut: $'", null, 
	"2011-09-09T11:47:34Z", "mp");
*/
jst.String.addMethod("printOn:", "aStream", "printing", function(aStream){
	var x;
	aStream.nextPut_("'");
	for (var i = 1; i <= this.length; i++) {
		aStream.nextPut_(x = this.at_(i));
		if (x == "'")
			aStream.nextPut_(x);
	};
	aStream.nextPut_("'");
	return this;
}, null, "2012-09-08T21:26:00Z", "");

// Dictionary

jst.Dictionary._class.addMethod("on:", "jsObject", "instance creation", function(jsObject){
	if (jsObject instanceof jst.Object.constructor)
		this.error_("jsObject is not a native object.");
	var dict = this._new();
	dict._map = jsObject;
	return dict;
});

jst.Dictionary._class.addMethod("newFrom:", "aDict", "instance creation", function (aDict){
	return this.on_((aDict.asDictionary) ? aDict.asDictionary()._map : aDict);
},
	null, "2013-03-17T22:53:46Z", "mp");

jst.Dictionary.constructor.prototype.asJsObject = function() {
	return this._map;
};
jst.Dictionary.addMethod("asJsObject", "", "converting");

jst.Dictionary.addMethod("do:", "aBlock", "enumerating", "\tself valuesDo: aBlock");

/*
jst.Dictionary.addMethod("detect:ifNone:", "aBlock exceptionBlock", "enumerating", 
	"\tself keysAndValuesDo: [:key :value |" +
	"\n\t\t(aBlock valueWithPossibleArgs: {value. key}) ifTrue: [^ value]]." +
	"\n\t^ exceptionBlock value");
*/

jst.Dictionary.addMethod("detect:ifNone:", "aBlock exceptionBlock", "enumerating", 
function (aBlock,exceptionBlock){
	for (var key in this._map) {
		if (aBlock.value_(this._map[key]) == true)
			return this._map[key];
	};
	return jst.snd(exceptionBlock,"value");
},
	null, "2012-09-20T19:56:57Z", "mp");

/*
jst.Dictionary.addMethod("keyAtValue:ifAbsent:", "value exceptionBlock", "accessing", 
	"\tself keysAndValuesDo: [:k :v | v = value ifTrue: [^ k]]." +
	"\n\t^ exceptionBlock value");

jst.Dictionary.addMethod("printElementsOn:", "aStream", "printing", 
	"\taStream nextPut: $(." +
	"\n\tself size > 100" +
	"\n\t\tifTrue: [aStream nextPutAll: 'size '." +
	"\n\t\t\tself size printOn: aStream]" +
	"\n\t\tifFalse: [self keysSortedSafely do: [:key | " +
	"\n\t\t\taStream print: key;" +
	"\n\t\t\t\t nextPutAll: '->';" +
	"\n\t\t\t\t print: (self at: key)" +
	"\n\t\t\t] separatedBy: [aStream space]" +
	"\n\t\t]." +
	"\n\taStream nextPut: $)",
	null, "2012-05-17T20:35:30Z", "mp");
*/

jst.Dictionary.addMethod("printElementsOn:", "aStream", "printing", 
	"\taStream nextPut: $(." +
	"\n\tself size > 100" +
	"\n\t\tifTrue: [aStream nextPutAll: 'size '." +
	"\n\t\t\tself size printOn: aStream]" +
	"\n\t\tifFalse: [self keysSortedSafely do: [:key | " +
	"\n\t\t\taStream cr; print: key;" +
	"\n\t\t\t\t nextPutAll: '->';" +
	"\n\t\t\t\t print: (self at: key)" +
	"\n\t\t\t]" +
	"\n\t\t]." +
	"\n\taStream nextPut: $)",
	null, "2013-10-01T08:12:38Z", "mp"); //jst-kernel

jst.Dictionary.addMethod("keysSortedSafely", "", "accessing", 
	"\t\"Answer a SortedCollection containing the receiver's keys.\"" +
	"\n\t| sortedKeys |" +
	"\n\tsortedKeys := SortedCollection sortBlock: [:x :y | " +
	"\n\t\t((x isString and: [y isString])" +
	"\n\t\t\tor: [x isNumber and: [y isNumber]])" +
	"\n\t\t\tifTrue: [x < y]" +
	"\n\t\t\tifFalse: [x class == y class" +
	"\n\t\t\t\tifTrue: [x printString < y printString]" +
	"\n\t\t\t\tifFalse: [x class name < y class name]]]." +
	"\n\tself keysDo: [:each | sortedKeys addLast: each]." +
	"\n\t^ sortedKeys reSort",
	null, "2012-05-17T20:37:12Z", "mp");

jst.Dictionary.addMethod("asCollection", "", "converting", "\t^ self values");

jst.Dictionary.addMethod("remove:ifAbsent:", "oldObject anExceptionBlock", "removing", 
	"\tself shouldNotImplement");

jst.Dictionary.constructor.prototype.size = function (){
	var size = 0;
	for (var i in this._map)
		size++;
	return size;
}; 
jst.Dictionary.addMethod("size", "", "accessing");

/*
jst.Dictionary.constructor.prototype.hasEqualValues_ = function (aDictionary){
	//uses #= message for comparison
	for (var key in this._map) {
		if (!aDictionary.includesKey_(key) || !jst.sndw(this._map[key], "=", aDictionary._map[key]))
			return false;
	};
	return true;
};
jst.Dictionary.addMethod("hasEqualValues:", "aDictionary", "private");
*/
jst.Dictionary.addMethod("hasEqualValues:", "aDictionary", "private", 
	function (aDictionary){
	//uses #= message for comparison
	for (var key in this._map) {
		if (!aDictionary.includesKey_(key) || !this._map[key]["="](aDictionary._map[key]))
			return false;
	};
	return true;
},
	null, "2012-05-27T18:30:01Z", "mp");

jst.Dictionary.addMethod("=", "aDictionary", "comparing", function (aDictionary){
	//Two dictionaries are equal if
	// (a) they are the same 'kind' of thing.
	// (b) they have the same set of keys.
	// (c) for each (common) key, they have the same value"
	if (this["=="](aDictionary))
		return true;
	if (!aDictionary.isKindOf_(jst.Dictionary))
		return false;
	if (this.size() != aDictionary.size())
		return false;
	return this.hasEqualValues_(aDictionary);
});

jst.Dictionary.addMethod("copy", "", "copying", 
	"\t\"Must copy the associations, or later store will affect both the original and the copy\"" +
	"\n\t| tmp |" +
	"\n\ttmp := Dictionary new." +
	"\n\tself keysAndValuesDo: [:k :v |" +
	"\n\t\ttmp at: k put: v]." +
	"\n\t^ self shallowCopy " +
	"\n\t\tinstVarNamed: #map put: (tmp instVarNamed: #map);" +
	"\n\t\tyourself",
	null, "2012-06-28T09:46:11Z", "mp");

/*
jst.Dictionary.addMethod("printInstVarAt:limitedTo:", "index limit", "printing", 
	"\t^ index = 1" +
	"\n\t\tifTrue: [map asString] " +
	"\n\t\tifFalse: [super printInstVarAt: index limitedTo: limit]");
*/

jst.Dictionary.addMethod("pairsDo:", "aBlock", "enumerating", 
	"\t^ self keysAndValuesDo: aBlock",
	null, "2012-05-14T19:38:59Z", "mp");

jst.Dictionary.addMethod("asDictionary", "", "converting", 
	"\t^ self",
	null, "2012-08-01T06:38:31Z", "mp");

jst.Dictionary.addMethod("isDictionary", "", "testing", 
	"\t^ true",
	null, "2012-12-20T08:35:40Z", "mp");

/*
jst.Dictionary.addMethod("copyEmpty", "", "copying", 
	"\t^ self shallowCopy" +
	"\n\t\tinstVarNamed: #map put: Dictionary new asJsObject;" +
	"\n\t\tyourself",
	null, "2013-02-01T23:16:42Z", "mp");
*/

jst.Dictionary.addMethod("associations", "", "accessing", 
	"\t\"Answer a Collection containing the receiver's associations.\"" +
	"\n\t| out |" +
	"\n\tout := OrderedCollection new." +
	"\n\tself keysAndValuesDo: [:k :v | " +
	"\n\t\tout add: (Association key: k value: v)]." +
	"\n\t^ out",
	null, "2013-11-08T10:47:41Z", "mp");

jst.Dictionary.addMethod("associationAt:ifAbsent:", "key aBlock", "accessing", 
	"\t\"Answer the association with the given key." +
	"\n\tIf key is not found, return the result of evaluating aBlock.\"" +
	"\n\t^ (self at: key ifPresent: [:val | " +
	"\n\t\tAssociation key: key value: val]) " +
	"\n\t\t\tifNil: [aBlock value]",
	null, "2011-09-26T21:24:38Z", "mp");

jst.Dictionary.addMethod("associationAt:", "key", "accessing", 
	"\t^ self associationAt: key ifAbsent: [self errorKeyNotFound]",
	null, "2011-09-26T21:25:03Z", "mp");

// *** IdentityDictionary ***

jst.IdentityDictionary.constructor.prototype.keyAtValue_ifAbsent_ = function (value,exceptionBlock){
	for (var key in this._map) {
		if (value === this._map[key])
			return key;
	};
	return exceptionBlock.value();
};
jst.IdentityDictionary.addMethod("keyAtValue:ifAbsent:", "value exceptionBlock", "accessing");

jst.IdentityDictionary.constructor.prototype.hasEqualValues_ = function (aDictionary){
	for (var key in this._map) {
		if (!aDictionary.includesKey_(key) || this._map[key] !== aDictionary._map[key])
			return false;
	};
	return true;
};
jst.IdentityDictionary.addMethod("hasEqualValues:", "aDictionary", "private");

//*** LookupKey ***

jst.LookupKey.addMethod("=", "aLookupKey", "comparing", 
	"\t^ self species = aLookupKey species & (key = aLookupKey key)",
	null, "2011-09-26T20:31:16Z", "mp");

jst.LookupKey.addMethod("<", "aLookupKey", "comparing", 
	"\t\"Refer to the comment in Magnitude>><\"" +
	"\n\t^ key < aLookupKey key",
	null, "2011-09-26T20:31:55Z", "mp");

jst.LookupKey.addMethod("key", "", "accessing", 
	"\t^key",
	null, "2011-09-26T20:32:40Z", "mp");

jst.LookupKey.addMethod("key:", "anObject", "accessing", 
	"\tkey := anObject",
	null, "2011-09-26T20:32:56Z", "mp");

jst.LookupKey.addMethod("name", "", "accessing", 
	"\t^ key asString",
	null, "2011-09-26T20:33:26Z", "mp");

jst.LookupKey.addMethod("printOn:", "aStream", "printing", 
	"\tkey printOn: aStream",
	null, "2011-09-26T20:33:50Z", "mp");

jst.LookupKey._class.addMethod("key:", "aKey", "instance creation", 
	"\t\"Answer an instance of me with the argument as the lookup up.\"" +
	"\n\t^ self basicNew key: aKey",
	null, "2011-09-26T20:34:20Z", "mp");

//*** Association ***

jst.Association.addMethod("=", "anAssociation", "comparing", 
	"\t^ super = anAssociation and: [value = anAssociation value]",
	null, "2011-09-26T20:46:09Z", "mp");

jst.Association.addMethod("value", "", "accessing", 
	"\t^ value",
	null, "2011-09-26T20:46:51Z", "mp");

jst.Association.addMethod("value:", "anObject", "accessing", 
	"\tvalue := anObject",
	null, "2011-09-26T20:47:08Z", "mp");

jst.Association.addMethod("printOn:", "aStream", "printing", 
	"\tsuper printOn: aStream." +
	"\n\taStream nextPutAll: '->'." +
	"\n\tvalue printOn: aStream",
	null, "2011-09-26T20:47:56Z", "mp");

jst.Association._class.addMethod("key:value:", "aKey aValue", "instance creation", 
	"\t\"Answer an instance of me with the arguments as the key and value of the association.\"" +
	"\n\t^ self basicNew key: aKey; value: aValue",
	null, "2011-09-26T20:52:29Z", "mp");

jst.Association.addMethod("asDictionary", "", "converting", 
	"\t^ Dictionary new" +
	"\n\t\tat: key put: value;" +
	"\n\t\tyourself",
	null, "2013-05-17T09:22:45Z", "mp");

jst.Association.addMethod("pairsDo:", "aBlock", "enumerating", 
	"\taBlock value: key value: value",
	null, "2014-03-21T10:07:49Z", "mp");

// *** Stream ***

jst.Stream._class.addMethod("new", "", "instance creation", "\tself error: 'Streams are created with on: and with:'");
	
jst.Stream.addMethod("isStream", "", "testing", function(){
	return true;
});

jst.Stream.addMethod("atEnd", "", "testing", "\tself subclassResponsibility");

jst.Stream.addMethod("contents", "", "accessing", "\tself subclassResponsibility");

jst.Stream.addMethod("next", "", "accessing", "\tself subclassResponsibility");
	
jst.Stream.addMethod("do:", "aBlock", "enumerating", 
	"\t[self atEnd] whileFalse: [" +
	"\n\t\taBlock value: self next]");

jst.Stream.addMethod("nextPut:", "anObject", "accessing", "\tself subclassResponsibility");	

jst.Stream.addMethod("nextPutAll:", "aCollection", "accessing", function(aCollection){
	var self = this;
	jst.sndw(aCollection, "do_", function(v){self.nextPut_(v);});
	return aCollection;
});

jst.Stream.addMethod("upToEnd", "", "accessing", "\t\"answer the remaining elements in the string\"" +
	"\n\t| elements |" +
	"\n\telements := OrderedCollection new." +
	"\n\t[self atEnd] whileFalse: [" +
	"\n\t\telements add: self next]." +
	"\n\t^elements");
/*	
jst.Stream.addMethod("print:", "anObject", "printing", 
	"\t\"Have anObject print itself on the receiver.\"" +
	"\n\tanObject printOn: self");
*/

jst.Stream.addMethod("print:", "anObject", "printing", function (anObject){
	//Have anObject print itself on the receiver
	if (anObject == null)
		this.nextPut_("null");
	else if (anObject.printOn_)
		anObject.printOn_(this);
	else
		this.nextPut_(anObject.toString());		
	return this;
},
	null, "2012-05-07T09:50:56Z", "mp"); //jst-kernel

// *** PositionableStream ***

with (jst.PositionableStream) {
	
	_class.addMethod("on:", "aCollection", "instance creation", "\t^ self basicNew on: aCollection");
	
	addMethod("on:", "aCollection", "private", 
		"\tcollection := aCollection." +
		"\n\treadLimit := aCollection size." +
		"\n\tposition := 0." +
		"\n\tself reset");
	
	addMethod("position", "", "positioning", "\t^ position");
	addMethod("position:", "anInteger", "positioning", "\t(anInteger >= 0 and: [anInteger <= readLimit])" +
		"\n\t\tifTrue: [position := anInteger]" +
		"\n\t\tifFalse: [self error: 'Attempt to set the position of a PositionableStream out of bounds']");
	
	addMethod("reset", "", "positioning", "\tposition := 0");
	addMethod("resetContents", "", "positioning", "\tposition := 0." +
		"\n\treadLimit := 0");
	addMethod("skip:", "anInteger", "positioning", "\tself position: position + anInteger");
	addMethod("skipTo:", "anObject", "positioning", "\t[self atEnd] whileFalse: [" +
		"\n\t\tself next = anObject ifTrue: [^true]]." +
		"\n\t^false");
	
	addMethod("atEnd", "", "testing", "\t^ position >= readLimit");
	addMethod("isEmpty", "", "testing", "\t^ self atEnd and: [position = 0]");
	
	addMethod("contents", "", "accessing", "\t^ collection copyFrom: 1 to: readLimit");
	addMethod("originalContents", "", "accessing", "\t^ collection");
	
	addMethod("peek", "", "accessing", "\t\"Answer what would be returned if the message next were sent to the" +
		" receiver. If the receiver is at the end, answer nil.\"" +
		"\n\t| nextObject |" +
		"\n\tself atEnd ifTrue: [^ nil]." +
		"\n\tnextObject := self next." +
		"\n\tposition := position - 1." +
		"\n\t^ nextObject");
	
	addMethod("upTo:", "anObject", "accessing", "\t\"Answer a subcollection from the current access position to the" +
		" occurrence (if any, but not inclusive) of anObject in the receiver. If" +
		" anObject is not in the collection, answer the entire rest of the receiver.\"" +
		"\n\t| newStream element |" +
		"\n\tnewStream := WriteStream on: (collection species new: 100)." +
		"\n\t[self atEnd or: [(element := self next) = anObject]]" +
		"\n\t\twhileFalse: [newStream nextPut: element]." +
		"\n\t^ newStream contents");
	
	addMethod("upToEnd", "", "accessing", "\t\"Answer a subcollection from the current access position through" +
		" the last element of the receiver.\"" +
		"\n\t| newStream |" +
		"\n\tnewStream := WriteStream on: (collection species new: 100)." +
		"\n\t[self atEnd] whileFalse: [newStream nextPut: self next]." +
		"\n\t^ newStream contents");
	
	addMethod("next:", "anInteger", "accessing", "\t\"Answer the next anInteger elements of my collection. Must override" +
		" because default uses self contents species, which might involve a large collection.\"" +
		"\n\t| newArray |" +
		"\n\tnewArray := collection species new: anInteger." +
		"\n\t1 to: anInteger do: [:index | newArray at: index put: self next]." +
		"\n\t^ newArray");
	
	addMethod("setToEnd", "", "positioning", "\tposition := readLimit");

};

// *** WriteStream ***

with (jst.WriteStream) {
	
	_class.addMethod("with:", "aCollection", "instance creation", 
		"\t^ self basicNew with: aCollection");

	addMethod("with:", "aCollection", "private", 
		"\tsuper on: aCollection." +
		"\n\tisStringStream := aCollection isString." +
		"\n\tposition := aCollection size." +
		"\n\treadLimit := position." +
		"\n\twriteLimit := position");
	
	addMethod("next", "", "accessing", "\tself shouldNotImplement");
	
	addMethod("contents", "", "accessing", 
		"\treadLimit := readLimit max: position." +
		"\n\t^ isStringStream & (position = collection size)" +
		"\n\t\tifTrue: [collection]" +
		"\n\t\tifFalse: [collection copyFrom: 1 to: position]");
	
	addMethod("growTo:", "anInteger", "private", function(anInteger){
		//anInteger is the required minimal new size of the collection
		this._collection.length = this._writeLimit = anInteger;
		return this;
	});

	addMethod("nextPut:", "anObject", "accessing", function(anObject){
		//primitive
		if (this._isStringStream) {
			if (this._position < this._collection.size())
				this._collection = this._collection.copyFrom_to_(1, this._position);
			this._collection += anObject.toString();
			this._position = this._collection.size(); 
		}
		else if (this._position >= this._writeLimit)
			this.pastEndPut_(anObject);
		else 
			this._collection.at_put_(++this._position, anObject);
		return anObject;
	});
	/* prevzato se Squeaku
	addMethod("pastEndPut:", "anObject", "private", "\t| oldSize grownCollection |" +
		"\n\toldSize := collection size." +
		"\n\tgrownCollection := collection class new: oldSize + ((oldSize max: 20) min: 1000000)." +
		"\n\tcollection := grownCollection replaceFrom: 1 to: oldSize with: collection startingAt: 1." +
		"\n\twriteLimit := collection size." +
		"\n\tcollection at: (position := position + 1) put: anObject." +
		"\n\t^ anObject");
	*/
	addMethod("pastEndPut:", "anObject", "private",	"\tself growTo: collection size + 10." +
		"\n\t^ collection at: (position := position + 1) put: anObject");
	/*
	addMethod("nextPutAll:", "aCollection", "accessing", 
		"\tisStringStream" +
		"\n\t\tifTrue: [self nextPut: aCollection]" +
		"\n\t\tifFalse: [ | newEnd |" +
		"\n\t\t\tnewEnd := position + aCollection size." +
		"\n\t\t\tnewEnd > writeLimit ifTrue: [" +
		"\n\t\t\t\tself growTo: newEnd + 10]." +
		"\n\t\t\tcollection replaceFrom: position+1 to: newEnd with: aCollection startingAt: 1." +
		"\n\t\t\tposition := newEnd]." +
		"\n\t^ aCollection");
	*/
	addMethod("nextPutAllFast:", "aCollection", "private", 
		"\tisStringStream" +
		"\n\t\tifTrue: [self nextPut: aCollection]" +
		"\n\t\tifFalse: [ | newEnd |" +
		"\n\t\t\tnewEnd := position + aCollection size." +
		"\n\t\t\tnewEnd > writeLimit ifTrue: [" +
		"\n\t\t\t\tself growTo: newEnd + 10]." +
		"\n\t\t\tcollection replaceFrom: position+1 to: newEnd with: aCollection startingAt: 1." +
		"\n\t\t\tposition := newEnd]." +
		"\n\t^ aCollection");

	addMethod("nextPutAll:", "aCollection", "accessing", 
		"\t^ collection class == aCollection class " +
		"\n\t\tifTrue: [self nextPutAllFast: aCollection] " +
		"\n\t\tifFalse: [super nextPutAll: aCollection]");
	
	addMethod("position:", "anInteger", "positioning", 
		"\treadLimit := readLimit max: position." +
		"\n\tsuper position: anInteger");
	
	addMethod("reset", "", "positioning", 
		"\treadLimit := readLimit max: position." +
		"\n\tposition := 0");

	addMethod("setToEnd", "", "positioning", 
		"\treadLimit := readLimit max: position." +
		"\n\tsuper setToEnd");

	addMethod("size", "", "accessing", "\t^ readLimit := readLimit max: position");

	addMethod("space", "", "character writing", 
		"\t\"Append a space character to the receiver.\"" +
		"\n\tself nextPut: Character space");
	
	addMethod("tab", "", "character writing", 
		"\t\"Append a tab character to the receiver.\"" +
		"\n\tself nextPut: Character tab");
	
	addMethod("cr", "", "character writing", 
		"\t\"Append a return character to the receiver.\"" +
		"\n\tself nextPut: Character cr");
	
};

jst.WriteStream.addMethod("lf", "", "character writing", 
	"\tself nextPut: Character lf",
	null, "2012-01-06T20:09:02Z", "mp");

jst.WriteStream.addMethod("crlf", "", "character writing", 
	"\tself nextPutAll: String crlf",
	null, "2012-03-31T21:05:49Z", "mp");

jst.WriteStream.addMethod("on:", "aCollection", "private", 
	"\t\"stejne jako ve Squeaku predanou kolekci 'zapomene' (Squeak ji ovsem prepise)\"" +
	"\n\tsuper on: (aCollection ifString: '')." +
	"\n\tisStringStream := aCollection isString." +
	"\n\treadLimit := 0." +
	"\n\twriteLimit := collection size",
	null, "2012-10-03T09:14:58Z", "mp");

//*** LimitedWriteStream ***

jst.LimitedWriteStream.constructor.prototype.nextPut_ = function(anObject){
	//Ensure that the limit is not exceeded
	return (this._position >= this._limit) 
		? this._limitBlock.value() 
		: jst.superSend(this, "nextPut_", [anObject], jst.LimitedWriteStream);
};
jst.LimitedWriteStream.addMethod("nextPut:", "anObject", "accessing");
/*
jst.LimitedWriteStream.addMethod("nextPutAllFast:", "aCollection", "private", 
	"\t| newEnd |" +
	"\n\tnewEnd := position + aCollection size." +
	"\n\tnewEnd > limit ifTrue: [" +
	"\n\t\tsuper nextPutAllFast: (aCollection copyFrom: 1 to: (limit - position max: 0))." +
	"\n\t\t^ limitBlock value" +
	"\n\t]." +
	"\n\tisStringStream" +
	"\n\t\tifTrue: [self nextPut: aCollection]" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tnewEnd > writeLimit ifTrue: [" +
	"\n\t\t\t\tself growTo: newEnd + 10]." +
	"\n\t\t\tcollection replaceFrom: position+1 to: newEnd with: aCollection startingAt: 1." +
	"\n\t\t\tposition := newEnd]." +
	"\n\t^ aCollection");

jst.LimitedWriteStream.addMethod("pastEndPut:", "anObject", "private", 
	"\tcollection size >= limit ifTrue: [limitBlock value].  \"Exceptional return\"" +
	"\n\t^ super pastEndPut: anObject");
*/
jst.LimitedWriteStream.addMethod("nextPutAllFast:", "aCollection", "private", 
	function (aCollection){
	var newEnd = this._position + aCollection.size();
	if (newEnd > this._limit) {
		jst.superSend(this, "nextPutAllFast_", [aCollection.copyFrom_to_(1, this._limit - this._position.max_(0))], 
			jst.LimitedWriteStream);
		return this._limitBlock.value();
	};
	if (this._isStringStream)
		this.nextPut_(aCollection);
	else {
		if (newEnd > this._writeLimit)
			this.growTo_(newEnd + 10);
		this._collection.replaceFrom_to_with_startingAt_(this._position+1, newEnd, aCollection,  1);
		this._position = newEnd;
	};
	return aCollection;
},
	null, "2012-06-10T21:29:09Z", "mp");

jst.LimitedWriteStream.addMethod("pastEndPut:", "anObject", "private", 
	function (anObject){
	if (this._collection.size() >= this._limit)
		return this._limitBlock.value();  //Exceptional return
	return jst.superSend(this, "pastEndPut_", [anObject], jst.LimitedWriteStream);
},
	null, "2012-06-10T21:17:07Z", "mp");

jst.LimitedWriteStream.addMethod("setLimit:limitBlock:", "sizeLimit aBlock", "accessing", 
	"\t\"Limit the number of elements this stream will write...\"" +
	"\n\tlimit := sizeLimit." +
	"\n\t\"Execute this (typically ^ contents) when that limit is exceded\"" +
	"\n\tlimitBlock := aBlock");

//*** ReadStream ***

with (jst.ReadStream) {

	addMethod("readStream", "", "accessing", "\t^ self");
	
	addMethod("next", "", "accessing", function(){
		//native version for efficiency
		return (this._position >= this._readLimit) ? jst.nil : this._collection.at_(++this._position);
	});
	
	addMethod("nextPut:", "anObject", "accessing", "\tself shouldNotImplement");

	addMethod("size", "", "accessing", "\t^ readLimit");
	
	addMethod("next:", "anInteger", "accessing", function(anInteger){
		//native version for efficiency
		var endPosition = this._readLimit.min_(this._position + anInteger);
		var ans = this._collection.copyFrom_to_(this._position+1, endPosition);
		this._position = endPosition;
		return ans;
	});
	
	addMethod("upToEnd", "", "accessing", function(){
		//native version for efficiency
		var start = this._position+1;
		this._position = this._collection.size();
		return this._collection.copyFrom_to_(start, this._position);
	});
	
	addMethod("upTo:", "anObject", "accessing", function(anObject){
		//native version for efficiency
		var start = this._position + 1;
		var end = this._collection.indexOf_startingAt_(anObject, start);
		//not present--return rest of the collection"	
		if (end == 0) 
			return this.upToEnd();
		//skip to the end and return the data passed over"
		this._position = end;
		return this._collection.copyFrom_to_(start, end-1);
	});

};

//*** Interval ***

jst.Interval.constructor.prototype.isInterval = function() {
	return true;
};
jst.Interval.addMethod("isInterval", "", "testing");

jst.Interval.addMethod("=", "anObject", "comparing", function (anObject){
	if (this["=="](anObject))
		return true;
	if (anObject.isInterval())
		return this._start == anObject.first() 
			&& this._step == anObject.increment()
			&& this.last() == anObject.last();
	return jst.superSend(this, "=", [anObject]);
},
	null, "2012-02-11T12:05:14Z", "mp");

jst.Interval._class.addMethod("from:to:by:", "startInteger stopInteger stepInteger", "instance creation", 
	"\t\"Answer an instance of me, starting at startNumber, ending at " +
	"\n\tstopNumber, and with an interval increment of stepNumber.\"" +
	"\n\t^ self new" +
	"\n\t\tsetFrom: startInteger" +
	"\n\t\tto: stopInteger" +
	"\n\t\tby: stepInteger",
	null, "2011-12-30T14:12:23Z", "mp");

jst.Interval.addMethod("setFrom:to:by:", "startInteger stopInteger stepInteger", "private", 
	"\tstart := startInteger." +
	"\n\tstop := stopInteger." +
	"\n\tstep := stepInteger",
	null, "2011-12-30T14:13:04Z", "mp");

jst.Interval.addMethod("species", "", "private", 
	"\t^ Array",
	null, "2011-12-30T14:13:16Z", "mp");

jst.Interval.addMethod("+", "number", "arithmetics", 
	"\t^ start + number to: stop + number by: step",
	null, "2011-12-30T14:14:50Z", "mp");

jst.Interval.addMethod("-", "number", "arithmetics", 
	"\t^ start - number to: stop - number by: step",
	null, "2011-12-30T14:15:09Z", "mp");

jst.Interval.addMethod("add:", "newObject", "adding", 
	"\t\"Adding to an Interval is not allowed.\"" +
	"\n\tself shouldNotImplement",
	null, "2011-12-30T14:16:44Z", "mp");

jst.Interval.addMethod("remove:", "newObject", "removing", 
	"\t\"Removing from an Interval is not allowed.\"" +
	"\n\tself error: 'elements cannot be removed from an Interval'",
	null, "2011-12-30T14:22:21Z", "mp");

jst.Interval.addMethod("shallowCopy", "", "copying", 
	"\t\"Without this method, #copy would return an array instead of a new interval\"" +
	"\n\t^ self class from: start to: stop by: step",
	null, "2011-12-30T14:20:40Z", "mp");

jst.Interval.addMethod("at:", "anInteger", "accessing", 
	"\t\"Answer the anInteger'th element.\"" +
	"\n\tanInteger < 1 | (anInteger > self size) ifTrue: [" +
	"\n\t\tself errorSubscriptBounds: anInteger]." +
	"\n\t^ start + (step * (anInteger - 1))",
	null, "2011-12-30T14:31:23Z", "mp");

jst.Interval.addMethod("at:put:", "anInteger anObject", "accessing", 
	"\t\"Storing into an Interval is not allowed.\"" +
	"\n\tself error: 'you can not store into an interval'",
	null, "2011-12-30T14:31:42Z", "mp");

jst.Interval.addMethod("first", "", "accessing", 
	"\t^ start",
	null, "2011-12-30T14:32:31Z", "mp");

jst.Interval.addMethod("last", "", "accessing", 
	"\t^ stop - (stop - start % step)",
	null, "2011-12-30T14:32:52Z", "mp");

jst.Interval.addMethod("size", "", "accessing", 
	"\t\"Answer how many elements the receiver contains.\"" +
	"\n\t^ step < 0" +
	"\n\t\tifTrue: [start < stop " +
	"\n\t\t\tifTrue: [0] " +
	"\n\t\t\tifFalse: [stop - start // step + 1]]" +
	"\n\t\tifFalse: [stop < start " +
	"\n\t\t\tifTrue: [0] " +
	"\n\t\t\tifFalse: [stop - start // step + 1]]",
	null, "2011-12-30T14:34:39Z", "mp");

jst.Interval.addMethod("increment", "", "accessing", 
	"\t\"Answer the receiver's interval increment.\"" +
	"\n\t^ step",
	null, "2011-12-30T14:35:08Z", "mp");

jst.Interval.addMethod("collect:", "aBlock", "enumerating", 
	"\t| nextValue result |" +
	"\n\tresult := self species new: self size." +
	"\n\tnextValue := start." +
	"\n\t1 to: result size do: [:i |" +
	"\n\t\tresult at: i put: (aBlock value: nextValue)." +
	"\n\t\tnextValue := nextValue + step]." +
	"\n\t^ result",
	null, "2011-12-30T19:36:57Z", "mp");

jst.Interval.addMethod("do:", "aBlock", "enumerating", 
	"\t| aValue |" +
	"\n\taValue := start." +
	"\n\tstep < 0" +
	"\n\t\tifTrue: [[stop <= aValue] whileTrue: [" +
	"\n\t\t\taBlock value: aValue." +
	"\n\t\t\taValue := aValue + step]]" +
	"\n\t\tifFalse: [[stop >= aValue] whileTrue: [" +
	"\n\t\t\taBlock value: aValue." +
	"\n\t\t\taValue := aValue + step]]",
	null, "2011-12-30T19:41:09Z", "mp");

jst.Interval.addMethod("reverseDo:", "aBlock", "enumerating", 
	"\t\"Evaluate aBlock for each element of my interval, in reverse order.\"" +
	"\n\t| aValue |" +
	"\n\taValue := self last." +
	"\n\tstep < 0" +
	"\n\t\tifTrue: [[start >= aValue]" +
	"\n\t\t\twhileTrue: [aBlock value: aValue." +
	"\n\t\t\t\taValue := aValue - step]]" +
	"\n\t\tifFalse: [[start <= aValue]" +
	"\n\t\t\twhileTrue: [aBlock value: aValue." +
	"\n\t\t\t\taValue := aValue - step]]",
	null, "2011-12-30T19:45:03Z", "mp");

jst.Interval.addMethod("copyWithAll:", "aCollection", "copying", 
	"\t| result |" +
	"\n\tresult := self species new: self size + aCollection size." +
	"\n\tresult replaceFrom: 1 to: self size with: self startingAt: 1." +
	"\n\tresult replaceFrom: self size + 1 to: result size with: aCollection startingAt: 1." +
	"\n\t^ result",
	null, "2012-01-07T18:34:54Z", "mp");

jst.Interval.addMethod("printOn:", "aStream", "printing", 
	"\taStream nextPut: $(;" +
	"\n\t\tprint: start;" +
	"\n\t\tnextPutAll: ' to: ';" +
	"\n\t\tprint: stop." +
	"\n\tstep ~= 1 ifTrue: [aStream nextPutAll: ' by: '; print: step]." +
	"\n\taStream nextPut: $)",
	null, "2012-02-12T15:01:32Z", "mp");
