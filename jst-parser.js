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
 * ---------------------------------------------------------------------------------------
 * 
 * JSmalltalk parser written in pure javascript.
 * Depends on jst-core
 */

//*** ParserError ***

jst.currentJsFile = "jst-parser";

jst.deploying = false;
jst.sendIndex = 0;
jst.blockIndex = 0;

jst.Error.subclass("ParserError", "code", "", "", "Kernel-Parser");

jst.ParserError.constructor.prototype.code_ = function (aString) {
	this._code = aString;
	return this;
};
jst.ParserError.addMethod("code:", "aString", "accessing");

jst.ParserError.constructor.prototype.code = function (){
	return this._code.format_(
	  ["{1}","{2}","{3}","{4}","{5}","{6}","{7}","{8}", this.errorText()]);
};
jst.ParserError.addMethod("code", "", "accessing");
			  
jst.ParserError.constructor.prototype.errorText = function (){
	return "<- " + this._messageText;
};
jst.ParserError.addMethod("errorText", "", "accessing");
			  
//*** Expression ***

jst.Object.subclass("Expression", "source iStart iStop lineFrom lineTo inParentheses", "", "", "Kernel-Parser");

jst.Expression.constructor.prototype.setStart_stop_from_to_source_ = function (i1, i2, line1, line2, aString) {
	this._iStart = i1;
	this._iStop = i2;
	this._lineFrom = line1;
	this._lineTo = line2;
	this._source = aString;
	return this;
};
jst.Expression.addMethod("setStart:stop:from:to:source:", "", "accessing");

jst.Expression.constructor.prototype.setStart_line_source_ = function (index, line, aString) {
	this._iStart = index;
	this._lineFrom = line;
	this._source = aString;
	return this;
};
jst.Expression.addMethod("setStart:line:source:", "", "accessing");

jst.Expression.constructor.prototype.setStop_line_source_ = function (index, line, aString) {
	this._iStop = index;
	this._lineTo = line;
	this._source = aString;
	return this;
};
jst.Expression.addMethod("setStop:line:source:", "", "private");

jst.Expression.constructor.prototype.setStart = function () {
	return this;
};
jst.Expression.addMethod("setStart", "", "private");

jst.Expression.constructor.prototype.setStop = function () {
	return this;
};
jst.Expression.addMethod("setStop", "", "private");

jst.Expression.constructor.prototype.setStartFrom_ = function (exp) {
	if (exp._iStart == jst.nil)
		exp.setStart();
	this._iStart = exp._iStart;
	this._lineFrom = exp._lineFrom;
	if (exp._source != jst.nil)
		this._source = exp._source;
	return this;
};
jst.Expression.addMethod("setStartFrom:", "exp", "private");

jst.Expression.constructor.prototype.setStopFrom_ = function (exp) {
	if (exp._iStop == jst.nil)
		exp.setStop();
	this._iStop = exp._iStop;
	this._lineTo = exp._lineTo;
	if (exp._source != jst.nil)
		this._source = exp._source;
	return this;
};
jst.Expression.addMethod("setStopFrom:", "exp", "private");

jst.Expression.constructor.prototype.printSource = function () {
	if (this._iStart == jst.nil)
		this.setStart();
	if (this._iStop == jst.nil)
		this.setStop();
	return this._source.substring(this._iStart, this._iStop);
};
jst.Expression.addMethod("printSource", "", "printing");

jst.Expression.constructor.prototype.initialize = function() {
	this._inParentheses = false;
	return this;
};
jst.Expression.addMethod("initialize", "", "initialization");

jst.Expression.constructor.prototype.beInParentheses = function() {
	this._inParentheses = true;
	return this;
};
jst.Expression.addMethod("beInParentheses", "", "accessing");

jst.Expression.constructor.prototype.isInParentheses = function() {
	return this._inParentheses == true; //pozor, muze byt nil, pokud naslednik nevola initialize
};
jst.Expression.addMethod("isInParentheses", "", "testing");

jst.Expression.constructor.prototype.asJavascript = function() {
	this.subclassResponsibility_("asJavascript");
};
jst.Expression.addMethod("asJavascript", "", "converting");

jst.Expression.constructor.prototype.doIt = function() {
	return eval(this.asJavascript());
};
jst.Expression.addMethod("doIt", "", "converting");

/*
jst.Expression.constructor.prototype.printIt = function() {
	return eval("(function(result){return (result != null) ? result.toString() : 'nil'}).value_(" +
		"(function(){" + this.asJavascript() + "})())");
};
jst.Expression.addMethod("printIt", "", "converting");
*/
jst.Expression.constructor.prototype.isConstant = function() {
	return false; 
};
jst.Expression.addMethod("isConstant", "", "testing");
/*
jst.Expression.constructor.prototype.isSymbol = function() {
	return false; 
};
jst.Expression.addMethod("isSymbol", "", "testing");
*/
jst.Expression.constructor.prototype.isVariable = function() {
	return false; 
};
jst.Expression.addMethod("isVariable", "", "testing");

jst.Expression.constructor.prototype.isAssignment = function() {
	return false; 
};
jst.Expression.addMethod("isAssignment", "", "testing");

jst.Expression.constructor.prototype.isBlock = function() {
	return false; 
};
jst.Expression.addMethod("isBlock", "", "testing");

jst.Expression.constructor.prototype.isArray = function() {
	return false; 
};
jst.Expression.addMethod("isArray", "", "testing");

jst.Expression.constructor.prototype.isReturn = function() {
	return false; 
};
jst.Expression.addMethod("isReturn", "", "testing");

jst.Expression.constructor.prototype.asMessage = function() {
	return jst.nil; 
};
jst.Expression.addMethod("asMessage", "", "converting");

jst.Expression.constructor.prototype.isMessageSend = function() {
	return false; //this.asMessage().notNil(); 
};
jst.Expression.addMethod("isMessageSend", "", "testing");

jst.Expression.constructor.prototype.isBinaryMessage = function() {
	return this.asMessage().notNil() && this.asMessage().isBinaryMessage();
};
jst.Expression.addMethod("isBinaryMessage", "", "testing");

jst.Expression.constructor.prototype.isUnaryMessage = function() { 
	return this.asMessage().notNil() && this.asMessage().isUnaryMessage();
};
jst.Expression.addMethod("isUnaryMessage", "", "testing");

jst.Expression.constructor.prototype.isKeywordMessage = function() { 
	return this.asMessage().notNil() && this.asMessage().isKeywordMessage();
};
jst.Expression.addMethod("isKeywordMessage", "", "testing");

jst.Expression.constructor.prototype.needsSelector = function() {
	return false;
};
jst.Expression.addMethod("needsSelector", "", "testing");

jst.Expression.constructor.prototype.addSelector_binary_ = function(aSymbol, aBoolean) { 
	this.subclassResponsibility_("addSelector:binary:");
};
jst.Expression.addMethod("addSelector:binary:", "aSymbol aBoolean", "accessing");

jst.Expression.constructor.prototype.needsArgument = function() {
	return false;
};
jst.Expression.addMethod("needsArgument", "", "testing");

jst.Expression.constructor.prototype.addArgument_ = function(anObject) {
	this.subclassResponsibility_("addArgument:");
};
jst.Expression.addMethod("addArgument:", "anObject", "accessing");

jst.Expression.constructor.prototype.needsSelf = function() {
	return false;
};
jst.Expression.addMethod("needsSelf", "", "testing");

jst.Expression.constructor.prototype.do_withOwner_andRoot_ = function(aBlock, ownerExp, rootExp) {
	aBlock.valueWithPossibleArgs_([this, ownerExp, rootExp]);
	return this;
};
jst.Expression.addMethod("do:withOwner:andRoot:", "aBlock ownerExp rootExp", "enumerating");

jst.Expression.constructor.prototype.do_ = function(aBlock) {
	return this.do_withOwner_andRoot_(aBlock, jst.nil, jst.nil);
};
jst.Expression.addMethod("do:", "aBlock", "enumerating");

jst.Expression.constructor.prototype.select_ = function (aBlock){
	var result = [];
	this.do_(function(exp){
		if (aBlock.value_(exp) == true)
			result.push(exp);
	});
	return result;
};
jst.Expression.addMethod("select:", "aBlock", "enumerating");

jst.Expression.constructor.prototype.asArray = function() {
	var arr = [];
	this.do_(function(ex){arr.push(ex);});
	return jst.Array.adopt_(arr);
};
jst.Expression.addMethod("asArray", "", "converting");

jst.Expression.constructor.prototype.anySatisfy_ = function(aBlock) {
	return this.nonlocalReturnOf_(
		function(){
			this.do_(
				function(each){
					if (aBlock.value_(each) == true)
						jst.BlockReturn.result_(true);
				}
			);		
			return false;
		}
	);
};
jst.Expression.addMethod("anySatisfy:", "aBlock", "testing");

jst.Expression.constructor.prototype.isGetter = function(){
	return false;
};
jst.Expression.addMethod("isGetter", "", "testing");

jst.Expression.constructor.prototype.isSetter = function(){
	return false;
};
jst.Expression.addMethod("isSetter", "", "testing");

jst.Expression.constructor.prototype.usesSymbol_ = function (aSymbol){
	return false;
}; 
jst.Expression.addMethod("usesSymbol:", "aSymbol", "testing");

jst.Expression.constructor.prototype.findBlock_ = function(id){
	var result = jst.nil;
	this.do_(function(exp){
		if (exp.isBlock() && exp._id == id) {
			result = exp;
		};
	});
	return result;
};
jst.Expression.addMethod("findBlock:", "id", "accessing");

jst.Expression.constructor.prototype.sendIndex = function() {
	return 0;
};
jst.Expression.addMethod("sendIndex", "", "initialization");

// *** Variable ***

jst.Expression.subclass("Variable", "name type isParam isClassSide targetClass", "", "", "Kernel-Parser");

jst.Variable.name_ = function(aString) {
	var v = this._new();
	v._name = aString;
	return v;
};
jst.Variable._class.addMethod("name:", "aString", "instance creation");

jst.Variable.constructor.prototype.initialize = function(){
	this._isParam = false;
	this._isClassSide = false;
	return this;
};
jst.Variable.addMethod("initialize", "", "initialization");

jst.Variable.constructor.prototype.targetClass_ = function(aClass) {
	this._targetClass = aClass;
	return this;
};
jst.Variable.addMethod("targetClass:", "aClass", "accessing");

jst.Variable.constructor.prototype.targetClass = function() {
	return this._targetClass;
};
jst.Variable.addMethod("targetClass", "", "accessing");

jst.Variable.constructor.prototype.name = function(){
	return this._name;
};
jst.Variable.addMethod("name", "", "accessing");

jst.Variable.constructor.prototype.isVariable = function() {
	return true; 
};
jst.Variable.addMethod("isVariable", "", "testing");

jst.Variable.constructor.prototype.isSuper = function() {
	return this._name == "super"; 
};
jst.Variable.addMethod("isSuper", "", "testing");

jst.Variable.constructor.prototype.isSelf = function() {
	return this._name == "self"; 
};
jst.Variable.addMethod("isSelf", "", "testing");

jst.Variable.constructor.prototype.needsSelf = function() {
	return this.isInstVar() || this.isClassVar() || this.isSelf() || this.isSuper();
};
jst.Variable.addMethod("needsSelf", "", "testing");

jst.Variable.constructor.prototype.usesSymbol_ = function (aSymbol){
	return this.isClassName() && this._name == aSymbol;
}; 
jst.Variable.addMethod("usesSymbol:", "aSymbol", "testing");

jst.Variable.constructor.prototype.asJavascript = function() {
	if (this.isInstVar()) 
		return "self._" + this._name;
	else if (jst.deploying && this.isClassVar())
		return "self." + ((this._isClassSide) ? "" : "_class.") + "classVarNamed_(\"" + this._name + "\")";
	else if (this.isClassVar())
		return "self." + ((this._isClassSide) ? "" : "_class.") + "__" + this._name;
	else if (this.isClassName())
		return "jst." + this._name;
//	else if (this.isSelf() && this._targetClass == jst.String)
		//nutna konverze
//		return "self.toString()";
	return this._name;
};
jst.Variable.addMethod("asJavascript", "", "converting");

jst.Variable.constructor.prototype.isParam = function() {
	return this._isParam == true;
};
jst.Variable.addMethod("isParam", "", "testing");

jst.Variable.constructor.prototype.beParam = function() {
	this._isParam = true;
	return this;
};
jst.Variable.addMethod("beParam", "", "accessing");

jst.Variable.constructor.prototype.isInstVar = function() {
	return this._type == "instVar";
};
jst.Variable.addMethod("isInstVar", "", "testing");

jst.Variable.constructor.prototype.beInstVar = function() {
	this._type = "instVar";
	return this;
};
jst.Variable.addMethod("beInstVar", "", "accessing");

jst.Variable.constructor.prototype.isClassVar = function() {
	return this._type == "classVar";
};
jst.Variable.addMethod("isClassVar", "", "testing");

jst.Variable.constructor.prototype.beClassVarOf_ = function(aClass) {
	this._type = "classVar";
	this._isClassSide = aClass.isClassSide();
	return this;
};
jst.Variable.addMethod("beClassVarOf:", "aClass", "accessing");

jst.Variable.constructor.prototype.isClassName = function() {
	return this._type == "className";
};
jst.Variable.addMethod("isClassName", "", "testing");

jst.Variable.constructor.prototype.beClassName = function() {
	this._type = "className";
	return this;
};
jst.Variable.addMethod("beClassName", "", "accessing");

jst.Variable.constructor.prototype.isTempVar = function() {
	return this._type.isNil() && !this.isParam() && !this.isSelf() && !this.isSuper() && this._name[0] != "_";
};
jst.Variable.addMethod("isTempVar", "", "testing");

/* ** VariableSuper ***

jst.Variable.subclass("VariableSuper", "targetClass", "", "", "Kernel-Parser");

jst.VariableSuper.targetClass_ = function(aClass) {
	var v = this._new();
	v._targetClass = aClass;
	return v;
};
jst.VariableSuper._class.addMethod("targetClass:", "aClass", "instance creation");

jst.VariableSuper.constructor.prototype.isSuper = function() {
	return true; 
};
jst.VariableSuper.addMethod("isSuper", "", "testing");
*/

//*** Constant ***

jst.Expression.subclass("Constant", "value type", "", "", "Kernel-Parser");

jst.Constant.nil = function() {
	var c = this._new();
	c._value = "jst.nil";
	return c;
};
jst.Constant._class.addMethod("nil", "", "instance creation");

jst.Constant.string_ = function(aString) {
	var c = this._new();
	c._value = aString;
	c._type = "String";
	return c;
};
jst.Constant._class.addMethod("string:", "aString", "instance creation");

jst.Constant.number_ = function(aString) {
	var c = this._new();
	c._value = aString;
	c._type = "Number";
	return c;
};
jst.Constant._class.addMethod("number:", "aString", "instance creation");

jst.Constant.char_ = function(aString) {
	var c = this._new();
	c._value = aString;
	c._type = "Char";
	return c;
};
jst.Constant._class.addMethod("char:", "aString", "instance creation");

jst.Constant.symbol_ = function(aString) {
	var c = this._new();
	c._value = aString;
	c._type = "Symbol";
	return c;
};
jst.Constant._class.addMethod("symbol:", "aString", "instance creation");

jst.Constant.array_ = function(aString) {
	var c = this._new();
	c._value = aString;
	c._type = "Array";
	return c;
};
jst.Constant._class.addMethod("array:", "aString", "instance creation");

jst.Constant.boolean_ = function(aString) {
	var c = this._new();
	c._value = aString;
	c._type = "Boolean";
	return c;
};
jst.Constant._class.addMethod("boolean:", "aString", "instance creation");

jst.Constant.constructor.prototype.asJavascript = function() {
	if (this.isArray())
		//zatim ponecham
		return "jst." + this._type + ".adopt_(" + this._value + ")";
	else
		return this.printSource();
};
jst.Constant.addMethod("asJavascript", "", "converting");

jst.Constant.constructor.prototype.printString = function() {
	return this._value;
};
jst.Constant.addMethod("printString", "", "printing");

jst.Constant.constructor.prototype.isConstant = function() {
	return true; 
};
jst.Constant.addMethod("isConstant", "", "testing");

jst.Constant.constructor.prototype.isNil = function() {
	return this._type.isNil(); 
};
jst.Constant.addMethod("isNil", "", "testing");

jst.Constant.constructor.prototype.isArray = function() {
	return this._type == "Array"; 
};
jst.Constant.addMethod("isArray", "", "testing");

jst.Constant.constructor.prototype.isNumber = function() {
	return this._type == "Number"; 
};
jst.Constant.addMethod("isNumber", "", "testing");

jst.Constant.constructor.prototype.isString = function() {
	return this._type == "String"; 
};
jst.Constant.addMethod("isString", "", "testing");

jst.Constant.constructor.prototype.isChar = function() {
	return this._type == "Char"; 
};
jst.Constant.addMethod("isChar", "", "testing");

jst.Constant.constructor.prototype.isSymbol = function() {
	return this._type == "Symbol"; 
};
jst.Constant.addMethod("isSymbol", "", "testing");

jst.Constant.constructor.prototype.isBoolean = function() {
	return this._type == "Boolean"; 
};
jst.Constant.addMethod("isBoolean", "", "testing");

jst.Constant.constructor.prototype.printSource = function() {
	if (this.isChar() && this._value == "'")
		return "'\\''";
	else
		return (this.isArray() || this.isNumber() || this.isBoolean() || this.isNil()) ? this._value : "'" + this._value + "'";
};
jst.Constant.addMethod("printSource", "", "printing");

jst.Constant.constructor.prototype.usesSymbol_ = function (aSymbol){
	return this.isSymbol() && this._value == aSymbol; 
}; 
jst.Constant.addMethod("usesSymbol:", "aSymbol", "testing");

//*** Assignment ***

jst.Expression.subclass("Assignment", "variable expression argumentOk", "", "", "Kernel-Parser");

jst.Assignment.variable_ = function (aVariable) {
	var a = this._new();
	a._variable = aVariable;
	return a;
};
jst.Assignment._class.addMethod("variable:", "aVariable", "instance creation");

jst.Assignment.constructor.prototype.isAssignment = function() {
	return true; 
};
jst.Assignment.addMethod("isAssignment", "", "testing");

jst.Assignment.constructor.prototype.needsArgument = function() {
	return this._argumentOk.isNil() || this._expression.needsArgument();
};
jst.Assignment.addMethod("needsArgument", "", "testing");

jst.Assignment.constructor.prototype.argument = function() {
	return this._expression;
};
jst.Assignment.addMethod("argument", "", "accessing");

jst.Assignment.constructor.prototype.addArgument_ = function(anExpression) {
	//predpoklada predchozi pouziti #needsArgument
	if (this._expression.notNil() && this._expression.needsArgument()) 
		this._expression.addArgument_(anExpression);
	else 
		//pripadne prepise puvodni
		this._expression = anExpression;
	this._argumentOk = true;
	return anExpression;
};
jst.Assignment.addMethod("addArgument:", "anExpression", "accessing");

jst.Assignment.constructor.prototype.needsSelf = function() {
	return this._variable.needsSelf() || this._expression.needsSelf();
};
jst.Assignment.addMethod("needsSelf", "", "testing");

jst.Assignment.constructor.prototype.usesSymbol_ = function (aSymbol){
	return this._expression.usesSymbol_(aSymbol);
}; 
jst.Assignment.addMethod("usesSymbol:", "aSymbol", "testing");

jst.Assignment.constructor.prototype.asMessage = function() { 
	return (this._expression.notNil()) ? this._expression.asMessage() : jst.nil;
};
jst.Assignment.addMethod("asMessage", "", "converting");

jst.Assignment.constructor.prototype.needsSelector = function() {
	return this._expression.notNil() && this._expression.needsSelector();
};
jst.Assignment.addMethod("needsSelector", "", "testing");

jst.Assignment.constructor.prototype.addSelector_binary_ = function(aSymbol, aBoolean) { 
	if (this._expression.notNil()) 
		return this._expression.addSelector_binary_(aSymbol, aBoolean);
	return jst.nil;
};
jst.Assignment.addMethod("addSelector:binary:", "aSymbol aBoolean", "accessing");

jst.Assignment.constructor.prototype.asJavascript = function() {
	if (jst.deploying && this._variable.isClassVar())
		return "self." + ((this._variable._isClassSide) ? "" : "_class.") 
			+ "classVarNamed_put_(\"" + this._variable.name() + "\", " + this._expression.asJavascript() + ")";
	else
		return this._variable.asJavascript() + " = " + this._expression.asJavascript();
};
jst.Assignment.addMethod("asJavascript", "", "converting");

jst.Assignment.constructor.prototype.do_withOwner_andRoot_ = function(aBlock, ownerExp, rootExp) {
	aBlock.valueWithPossibleArgs_([this, ownerExp, rootExp]);
	aBlock.valueWithPossibleArgs_([this._variable, this, rootExp]);
	this._expression.do_withOwner_andRoot_(aBlock, this, rootExp);
	return this;
};
jst.Assignment.addMethod("do:withOwner:andRoot:", "aBlock ownerExp rootExp", "enumerating");

jst.Assignment.constructor.prototype.isSetter = function(){
	return this._expression.isVariable() && this._variable.isVariable(); 
};
jst.Assignment.addMethod("isSetter", "", "testing");

jst.Assignment.constructor.prototype.setStart = function () {
	this.setStartFrom_(this._variable);
	return this;
};
jst.Assignment.addMethod("setStart", "", "private");

jst.Assignment.constructor.prototype.setStop = function () {
	this.setStopFrom_(this._expression);
	return this;
};
jst.Assignment.addMethod("setStop", "", "private");

// *** SmalltalkCode ***

jst.Expression.subclass("SmalltalkCode", "expressions tempVars owner", "", "", "Kernel-Parser"); 

jst.SmalltalkCode.constructor.prototype.initialize = function() {
	//this.super().initialize.call(this);
	jst.superSend(this, "initialize", []);
	this._tempVars = jst.OrderedCollection._new(); 
	this._expressions = jst.OrderedCollection._new(); 
};
jst.SmalltalkCode.addMethod("initialize", "", "initialization");

jst.SmalltalkCode.constructor.prototype.setSource_from_to_vars_ = function (src,iStart,iStop,aCollection){
	this._source = src;
	this._iStart = iStart;
	this._iStop = iStop;
	this._tempVars = aCollection;
	return this;
};
jst.SmalltalkCode.addMethod("setSource:from:to:vars:", "src iStart iStop aCollection", "initialization");

jst.SmalltalkCode.constructor.prototype.addExpression_ = function (exp){
	return this._expressions.add_(exp);
};
jst.SmalltalkCode.addMethod("addExpression:", "exp", "accessing");

jst.SmalltalkCode.constructor.prototype.owner_ = function (anObject){
	this._owner = anObject;
	return this;
};
jst.SmalltalkCode.addMethod("owner:", "anObject", "accessing");

jst.SmalltalkCode.constructor.prototype.do_withOwner_andRoot_ = function(aBlock, ownerExp, rootExp) {
	aBlock.valueWithPossibleArgs_([this, ownerExp, rootExp]);
	var self = this;
	this._expressions.do_(
		function(ex){
			ex.do_withOwner_andRoot_(aBlock, self._owner, rootExp);
		}
	);
	return this;
};
jst.SmalltalkCode.addMethod("do:withOwner:andRoot:", "aBlock ownerExp rootExp", "enumerating");

jst.SmalltalkCode.constructor.prototype.do_ = function(aBlock) {
	return this.do_withOwner_andRoot_(aBlock, this._owner, this._owner);
};
jst.SmalltalkCode.addMethod("do:", "aBlock", "enumerating");

jst.SmalltalkCode.constructor.prototype.needsSelf = function() {
	return this._expressions.anySatisfy_(function(ex){return ex.needsSelf();});
};
jst.SmalltalkCode.addMethod("needsSelf", "", "testing");

jst.SmalltalkCode.constructor.prototype.usesSymbol_ = function (aSymbol){
	return this._expressions.anySatisfy_(function(ex){return ex.usesSymbol_(aSymbol);});
}; 
jst.SmalltalkCode.addMethod("usesSymbol:", "aSymbol", "testing");

/*
jst.SmalltalkCode.constructor.prototype.needsNonlocalReturn = function() {
	//true vraci pouze pri prvni zavolani, proto nastavuje _isNonlocal
	return this.nonlocalReturnOf_(function(){
		var topReturn = jst.nil;
		var needsNonlocalReturn = false;
		var nonlocalReturnFound = false;
		this.do_(function(ex, owner, root){
			//13.1.2012: added !owner.isMethod()
			if (root.isMethod() && ex.isBlock() && !owner.isMethod() && owner.isMessageSend() 
				&& topReturn.notNil() && topReturn._expression == owner) {
				//spec.pripad: blok je argumentem (receiverem) zpravy, pripadny nonLocalReturn bude az uvnitr
				jst.BlockReturn.result_(false);
			};
			if (!nonlocalReturnFound && ex.isMessageSend() && ex._selector == "nonlocalReturnOf:")
				//metoda #nonLocalReturnOf: je uz soucasti kodu, nebude se tedy pridavat 
				nonlocalReturnFound = true;
			if (ex.isReturn()) {
				if (topReturn.isNil())
					topReturn = ex;
				if ((root.isBlock() || root.isMethod()) && root != owner && !ex._isNonlocal) {
					ex._isNonlocal = true;
					if (!needsNonlocalReturn && !nonlocalReturnFound)
						needsNonlocalReturn = true;
				}
			}
		});
		return needsNonlocalReturn;
	});
};
*/
//2013-10-04T19:43:46Z
jst.SmalltalkCode.constructor.prototype.needsNonlocalReturn = function() {
	//4.10.2013 - nova verze, vola se jen jednou v metode
	//resetuji isNonLocal
	this.do_(function(ex, owner, root){
		if (ex.isReturn())
			ex._isNonlocal = false;
	});
	var rets = 0;
	var nonlocalReturnFound = false;
	this.do_(function(ex, owner, root){
		if (rets == 0 && ex.isMessageSend() && ex._selector == "nonlocalReturnOf:")
			//metoda #nonLocalReturnOf: je uz soucasti kodu, nebude se tedy pridavat 
			rets = -1000;
		if (ex.isReturn() && !owner.isMethod()) {
			//jakykoliv vnoreny return
			ex._isNonlocal = true;
			if (!nonlocalReturnFound)
				rets ++;
		}
	});
	return rets > 0;
};
jst.SmalltalkCode.addMethod("needsNonlocalReturn", "", "testing");

/*
jst.SmalltalkCode.constructor.prototype.asJavascript = function() {
	if (this._owner.isMethod() && this.isGetter())
		return "function(){" + this._expressions.first().asJavascript().replace(/self/g, "this") + ";}";
	var result = "";
	var defaultReturn = "";
	var isMethod = false;
	if (this._owner.isBlock()) {
		if (this._expressions.length == 1 && this._owner._params.length == 0 && 
			this._expressions[0].isConstant() && !this._expressions[0].isArray()) {
			//optimalization, mp 2013-07-10
			//console.log(this._source);
			return this._expressions[0].asJavascript();
		};
		result = "function(" + this._owner._params.join(",") + "){";
		if (!jst.deploying) {
			//zdrojovy kod bloku do komentare, usporne vse za sebou - tab a linefeed nahrazeny mezerou
			result += "/*" + this.printSource().replace(/\t+|\n+/g, " ") + "* /";
			//viz jst-debug
			result += this._owner.initContextString();
		};
		defaultReturn = "jst.nil";
	}
	else if (this._owner.isMethod()) {
		isMethod = true;
		result = "function(";
		if (this._owner._args.notNil())
			result += this._owner._args.join(",");
		if (this.isSetter()) {
			//console.log(result + "){" + this._expressions.first().asJavascript().replace("self", "this") + "; return this;}");
			return result + "){" + this._expressions.first().asJavascript().replace(/self/g, "this") + "; return this;}";
		};
		result += "){";
		defaultReturn = "this";
	};
	var resultEnd = "";
	//non-local return ?
	if (defaultReturn.length > 0) {
		//only block or method
		if (isMethod)
			//17.9.2012: resetuji isNonLocal, jinak Method>>asJavascript nefunguje opakovane
			this.do_(function(ex, owner, root){
				if (ex.isReturn())
					ex._isNonlocal = false;
			});
		var needsNonlocalReturn = this.needsNonlocalReturn();
		if (isMethod && (this.needsSelf() || needsNonlocalReturn)) {
			result += "var self = this";
			if (this._owner._receiver == jst.String || this._owner._receiver == jst.Number)
				//nutna konverze
				result += ".yourself()";
			result += "; ";
			defaultReturn = "self";
		};
		if (needsNonlocalReturn) {
			result += "return ";
			result += (isMethod) ? "this" : "jst.nil";
			result += ".nonlocalReturnOf_(function(){";
			resultEnd += "})";
		};
		resultEnd += ";}";
	};
	//temporary variables
	for (var i = 0; i < this._tempVars.length; i++) {
		result += "var " + this._tempVars[i] + " = jst.nil; ";
	};
	//body
	for (var i = 0; i < this._expressions.length-1; i++) {
		if (i > 0)
			result += "; ";
		result += this._expressions[i].asJavascript();
	};
	if (this._expressions.length > 1)
		result += "; ";
	//result
	var last = (this._expressions.length > 0) ? this._expressions.last() : null;
	if (isMethod && last && !last.isReturn() && this._owner.selector() != "DoIt")
		//metoda vraci defaultne self, mimo specialni metodu DoIt
		return result + last.asJavascript() + "; return " + defaultReturn + resultEnd;
	if ((isMethod || this._owner.isBlock()) && (!last || !last.isReturn()))
		result += "return ";
	//result += (last) ? last.asJavascript() : defaultReturn;	
	//return (this._owner.isBlock()) ? this.blockCopy_(result + resultEnd) : result + resultEnd;
	return result + ((last) ? last.asJavascript() : defaultReturn) + resultEnd;	
};
*/

//2013-10-04T19:26:14Z
jst.SmalltalkCode.constructor.prototype.asJavascript = function (){
	if (this._owner.isMethod() && this.isGetter())
		return "function(){" + this._expressions.first().asJavascript().replace(/self/g, "this") + ";}";
	var result = "";
	var defaultReturn = "";
	var isMethod = false;
	if (this._owner.isBlock()) {
		result = "function(" + this._owner._params.join(",") + "){";
		if (!jst.deploying) {
			//zdrojovy kod bloku do komentare, usporne vse za sebou - tab a linefeed nahrazeny mezerou
			result += "/*" + this.printSource().replace(/\t+|\n+/g, " ") + "*/";
		};
		defaultReturn = "jst.nil";
	}
	else if (this._owner.isMethod()) {
		isMethod = true;
		result = "function(";
		if (this._owner._args.notNil())
			result += this._owner._args.join(",");
		if (this.isSetter()) {
			//console.log(result + "){" + this._expressions.first().asJavascript().replace("self", "this") + "; return this;}");
			return result + "){" + this._expressions.first().asJavascript().replace(/self/g, "this") + "; return this;}";
		};
		result += "){";
		defaultReturn = "this";
	};
	var resultEnd = "";
	//non-local return ?
	if (defaultReturn.length > 0) {
		//only block or method
		var needsNonlocalReturn = isMethod && this.needsNonlocalReturn();
		if (isMethod && (this.needsSelf() || needsNonlocalReturn)) {
			result += "var self = this";
			if (this._owner._receiver == jst.String || this._owner._receiver == jst.Number)
				//nutna konverze
				result += ".yourself()";
			result += "; ";
			defaultReturn = "self";
		};
		if (needsNonlocalReturn) {
			result += "return ";
			result += (isMethod) ? "this" : "jst.nil";
			result += ".nonlocalReturnOf_(function(){";
			resultEnd += "})";
		};
		resultEnd += ";}";
	};
	//temporary variables
	if (this._tempVars.length > 0)
		result += this.tempVarsString();
	if (!jst.deploying && this._owner != jst.nil)
		//viz jst-debug
		result += this._owner.initContextString();
	//body
	for (var i = 0; i < this._expressions.length-1; i++) {
		if (i > 0)
			result += "; ";
		result += this._expressions[i].asJavascript();
	};
	if (this._expressions.length > 1)
		result += "; ";
	//result
	var last = (this._expressions.length > 0) ? this._expressions.last() : null;
	if (isMethod && last && !last.isReturn() && this._owner.selector() != "DoIt")
		//metoda vraci defaultne self, mimo specialni metodu DoIt
		return result + last.asJavascript() + "; return " + defaultReturn + resultEnd;
	if ((isMethod || this._owner.isBlock()) && (!last || !last.isReturn()))
		result += "return ";
	//result += (last) ? last.asJavascript() : defaultReturn;	
	//return (this._owner.isBlock()) ? this.blockCopy_(result + resultEnd) : result + resultEnd;
	return result + ((last) ? last.asJavascript() : defaultReturn) + resultEnd;	
};
jst.SmalltalkCode.addMethod("asJavascript", "", "converting");

jst.SmalltalkCode.constructor.prototype.tempVarsString = function() {
	var str = "";
	for (var i = 0; i < this._tempVars.length; i++)
		str += "var " + this._tempVars[i] + " = jst.nil; ";
	return str;
};
jst.SmalltalkCode.addMethod("tempVarsString", "", "private");

jst.SmalltalkCode.constructor.prototype.doIt = function() {
	var src = this.asJavascript();
	return (src.indexOf("function") == 0) ? eval("("+src+")") : eval(src);
};
jst.SmalltalkCode.addMethod("doIt", "", "converting");

jst.SmalltalkCode.constructor.prototype.printSource = function(){
	return (this._owner.isBlock()) ? 
		"[" + this._source.substring(this._iStart, this._iStop) + "]" : 
		this._source.substring(this._iStart, this._iStop);
};
jst.SmalltalkCode.addMethod("printSource", "", "printing");

jst.SmalltalkCode.constructor.prototype.isGetter = function(){
	return this._expressions.size() == 1 && this._expressions.first().isGetter();
};
jst.SmalltalkCode.addMethod("isGetter", "", "testing");

jst.SmalltalkCode.constructor.prototype.isSetter = function(){
	return this._expressions.size() == 1 && this._expressions.first().isSetter();	
};
jst.SmalltalkCode.addMethod("isSetter", "", "testing");

jst.SmalltalkCode.constructor.prototype.tempNames = function (){
	return this._tempVars.asCollection();
}; 
jst.SmalltalkCode.addMethod("tempNames", "", "accessing");

jst.SmalltalkCode.constructor.prototype.expressions = function(){
	return this._expressions;	
};
jst.SmalltalkCode.addMethod("expressions", "", "accessing");

// *** Block ***

jst.Expression.subclass("Block", "code params home id", "", "", "Kernel-Parser");

jst.Block.constructor.prototype.setCode_params_home_ = function (aSmalltalkCode, anArray, aMethod){
	this._code = aSmalltalkCode;
	this._code.owner_(this);
	this._params = anArray;
	this._home = aMethod;
	return this;
};
jst.Block.addMethod("setCode:params:home:", "aSmalltalkCode anArray aMethod", "accessing");

jst.Block.constructor.prototype.hasParams = function (){
	return this._params != jst.nil && this._params.length > 0; 
};
jst.Block.addMethod("hasParams", "", "testing");

jst.Block.constructor.prototype.isBlock = function() {
	return true; 
};
jst.Block.addMethod("isBlock", "", "testing");

jst.Block.constructor.prototype.asJavascript = function() {
	//optimalization, mp 2013-07-10 / 2013-10-11
	if (this._code._expressions.length == 0 && !this.hasParams())
		return "jst.nil"; //an empty block
	if (this._code._expressions.length == 1 && this._params.length == 0 && 
		this._code._expressions[0].isConstant() && !this._code._expressions[0].isArray())
		return this._code._expressions[0].asJavascript();
	return this._code.asJavascript();
};
jst.Block.addMethod("asJavascript", "", "converting");

jst.Block.constructor.prototype.doIt = function() {
	return eval("(" + this.asJavascript() + ")()");
};
jst.Block.addMethod("doIt", "", "converting");

jst.Block.constructor.prototype.do_withOwner_andRoot_ = function(aBlock, ownerExp, rootExp) {
	aBlock.valueWithPossibleArgs_([this, ownerExp, rootExp]);
	//this._code.do_withOwner_andRoot_(aBlock, this); block obsahuje vzdy code, zkusim jej v iteraci preskocit
	var self = this;
	this._code._expressions.do_(
		function(ex){
			ex.do_withOwner_andRoot_(aBlock, self, rootExp);
		}
	);
	//this._params.do_(aBlock); parametry jsou jen nazvy, ne objekty - je to OK?
	return this;
};
jst.Block.addMethod("do:withOwner:andRoot:", "aBlock ownerExp rootExp", "enumerating");

jst.Block.constructor.prototype.needsSelf = function() {
	return this._code.needsSelf();
};
jst.Block.addMethod("needsSelf", "", "testing");

jst.Block.constructor.prototype.usesSymbol_ = function (aSymbol){
	return this._code.usesSymbol_(aSymbol);
}; 
jst.Block.addMethod("usesSymbol:", "aSymbol", "testing");

jst.Block.constructor.prototype.initContextString = function() {
	return "";
};
jst.Block.addMethod("initContextString", "", "private");

jst.Block.constructor.prototype.tempNames = function (){
	return this._params.concat(this._code.tempNames());
}; 
jst.Block.addMethod("tempNames", "", "accessing");

jst.Block.constructor.prototype.printSource = function (){
	return this._code.printSource();
};
jst.Block.addMethod("printSource", "", "printing");

//Method

jst.Method.constructor.prototype.arguments = function (){
	return this._args;
};
jst.Method.addMethod("arguments", "", "accessing");

jst.Method.constructor.prototype.initContextString = function() {
	return "";
};
jst.Method.addMethod("initContextString", "", "private");

// *** DynamicArray ***

jst.Expression.subclass("DynamicArray", "expressions", "", "", "Kernel-Parser");

jst.DynamicArray.constructor.prototype.initialize = function() {
	//this.super().initialize.call(this);
	jst.superSend(this, "initialize", []);
	this._expressions = jst.OrderedCollection._new(); 
};
jst.DynamicArray.addMethod("initialize", "", "initialization");

jst.DynamicArray.constructor.prototype.isArray = function() {
	return true; 
};
jst.DynamicArray.addMethod("isArray", "", "testing");

jst.DynamicArray.constructor.prototype.asJavascript = function() {
	var result = "jst.Array.adopt_([";
	for (var i = 0; i < this._expressions.length; i++) {
		if (i > 0)
			result += ", ";
		result += this._expressions[i].asJavascript();
	};
	return result + "])";
};
jst.DynamicArray.addMethod("asJavascript", "", "converting");

jst.DynamicArray.constructor.prototype.do_withOwner_andRoot_ = function(aBlock, ownerExp, rootExp) {
	aBlock.valueWithPossibleArgs_([this, ownerExp, rootExp]);
	var self = this;
	this._expressions.do_(
		function(ex){
			ex.do_withOwner_andRoot_(aBlock, self, rootExp);
		}
	);
	return this;
};
jst.DynamicArray.addMethod("do:withOwner:andRoot:", "aBlock ownerExp rootExp", "enumerating");

jst.DynamicArray.constructor.prototype.needsSelf = function() {
	return this._expressions.anySatisfy_(function(ex){return ex.needsSelf();});
};
jst.DynamicArray.addMethod("needsSelf", "", "testing");

jst.DynamicArray.constructor.prototype.usesSymbol_ = function (aSymbol){
	return this._expressions.anySatisfy_(function(ex){return ex.usesSymbol_(aSymbol);});
}; 
jst.DynamicArray.addMethod("usesSymbol:", "aSymbol", "testing");

// *** Return ***

jst.Expression.subclass("Return", "expression isNonlocal", "", "", "Kernel-Parser");

jst.Return.constructor.prototype.expression_ = function (anExpression) {
	this._expression = anExpression;
	return this;
};
jst.Return.addMethod("expression:", "anExpression", "accessing");

jst.Return.constructor.prototype.initialize = function() {
	//this.super().initialize.call(this);
	jst.superSend(this, "initialize", []);
	this._isNonlocal = false; 
};
jst.Return.addMethod("initialize", "", "initialization");

jst.Return.constructor.prototype.asJavascript = function() {
	return (this._isNonlocal) 
		? "jst.BlockReturn.result_(" + this._expression.asJavascript() + ")"
		: "return " + this._expression.asJavascript();
};
jst.Return.addMethod("asJavascript", "", "converting");

jst.Return.constructor.prototype.isReturn = function() {
	return true; 
};
jst.Return.addMethod("isReturn", "", "testing");

jst.Return.constructor.prototype.do_withOwner_andRoot_ = function(aBlock, ownerExp, rootExp) {
	aBlock.valueWithPossibleArgs_([this, ownerExp, rootExp]);
	this._expression.do_withOwner_andRoot_(aBlock, this, rootExp);
	return this;
};
jst.Return.addMethod("do:withOwner:andRoot:", "aBlock ownerExp rootExp", "enumerating");

jst.Return.constructor.prototype.needsSelf = function() {
	return this._expression.needsSelf();
};
jst.Return.addMethod("needsSelf", "", "testing");

jst.Return.constructor.prototype.usesSymbol_ = function (aSymbol){
	return this._expression.usesSymbol_(aSymbol);
}; 
jst.Return.addMethod("usesSymbol:", "aSymbol", "testing");

jst.Return.constructor.prototype.isGetter = function(){
	return this._expression.isVariable() || this._expression.isConstant();
};
jst.Return.addMethod("isGetter", "", "testing");

jst.Return.constructor.prototype.setStop = function () {
	this.setStopFrom_(this._expression);
	return this;
};
jst.Return.addMethod("setStop", "", "private");

//*** MessageSend ***

jst.Expression.subclass("MessageSend", 
	"receiver selector args isBinary selStart selEditPos sendIndex", "", "", "Kernel-Parser");

jst.MessageSend.constructor.prototype.initialize = function () {
	//this.super().initialize.call(this);
	jst.superSend(this, "initialize", []);
	this._args = jst.OrderedCollection._new();
	this._isBinary = false;
	this._sendIndex = ++jst.sendIndex;
};
jst.MessageSend.addMethod("initialize", "", "initialization");

jst.MessageSend.constructor.prototype.sendIndex = function() {
	return this._sendIndex;
};
jst.MessageSend.addMethod("sendIndex", "", "initialization");

jst.MessageSend.constructor.prototype.setSelStart_line_from_source_ = function(pos, line, lineStart, aString) {
	this._selStart = pos;
	this._selEditPos = [line, pos - lineStart]; // pos - lineStart + 1
	this._source = aString;
	return this;
};
jst.MessageSend.addMethod("setSelStart:line:from:source:", "pos line lineStart aString", "accessing");

jst.MessageSend.constructor.prototype.sendString = function () {
	var last = (this._args.length > 0) ? this._args.last() : this;
	if (last._iStop == jst.nil)
		last.setStop();
	return this._source.substring(this._selStart, last._iStop);
};
jst.MessageSend.addMethod("sendString", "", "accessing");

jst.MessageSend.receiver_ = function (exp) {
	var msg = this._new();
	msg._receiver = exp;
	return msg;
};
jst.MessageSend._class.addMethod("receiver:", "anObject", "instance creation");

jst.MessageSend.receiver_selector_isBinary_ = function (anObject, aSymbol, aBoolean) {
	var msg = this.receiver_(anObject);
	msg._selector = aSymbol;
	if (aBoolean == true)
		msg._isBinary = true;
	return msg;
};
jst.MessageSend._class.addMethod("receiver:selector:isBinary:", "anObject aSymbol aBoolean", "instance creation");

jst.MessageSend.constructor.prototype.selector = function () {
	return this._selector;
};
jst.MessageSend.addMethod("selector", "", "accessing");

jst.MessageSend.constructor.prototype.receiver = function () {
	return this._receiver;
};
jst.MessageSend.addMethod("receiver", "", "accessing");

jst.MessageSend.constructor.prototype.asMessage = function() { 
	return this;
};
jst.MessageSend.addMethod("asMessage", "", "converting");

jst.MessageSend.constructor.prototype.isMessageSend = function() {
	return true; 
};
jst.MessageSend.addMethod("isMessageSend", "", "testing");

jst.MessageSend.constructor.prototype.arguments = function() {
	return this._args;
};
jst.MessageSend.addMethod("arguments", "", "accessing");

jst.MessageSend.constructor.prototype.needsArgument = function() {
	if (this._inParentheses)
		return false;
	//pro keyword musim posledni dvojtecku odmazat, bez dvojtecky tj. i pro binary dava 1 :)  
	return (this._selector.notNil() && !this.isUnaryMessage() && this._args.length < this._selector.slice(0, -1).split(/:/).length) 
		|| (this._args.length > 0 && this._args.last().needsArgument());
};
jst.MessageSend.addMethod("needsArgument", "", "testing");

jst.MessageSend.constructor.prototype.addArgument_ = function(anExpression) {
	//predpoklada predchozi pouziti #needsArgument
	if (this._args.length > 0 && this._args.last().needsArgument())
		this._args.last().addArgument_(anExpression);
	else {
		this._args.add_(anExpression);
		if (anExpression.asMessage() != jst.nil) {
			var ix = this._sendIndex;
			this._sendIndex = anExpression.asMessage()._sendIndex;
			anExpression.asMessage()._sendIndex = ix;
		};
	};
	return anExpression;
};
jst.MessageSend.addMethod("addArgument:", "anExpression", "accessing");

jst.MessageSend.constructor.prototype.needsSelector = function() {
	//pokud je ozavorkovany, je urcite cely a selektor nepotrebuje
	return !this._inParentheses && this._receiver.notNil() && this._selector.isNil();
};
jst.MessageSend.addMethod("needsSelector", "", "testing");

jst.MessageSend.constructor.prototype.addSelector_binary_ = function(aSymbol, aBoolean) { 
	if (this._selector.isNil()) {
		this._selector = aSymbol;
		this._isBinary = aBoolean;
	}
	else if (this.isKeywordMessage())
		this._selector += aSymbol;
	else
		this.error_("Message selector is already set to: " + this._selector);
	return this;
};
jst.MessageSend.addMethod("addSelector:binary:", "aSymbol aBoolean", "accessing");

jst.MessageSend.constructor.prototype.isBinaryMessage = function() {
	return this._isBinary;
};
jst.MessageSend.addMethod("isBinaryMessage", "", "testing");

jst.MessageSend.constructor.prototype.isUnaryMessage = function() { 
	return !this.isBinaryMessage() && this._selector.notNil() && this._selector.indexOf(":") < 0;
};
jst.MessageSend.addMethod("isUnaryMessage", "", "testing");

jst.MessageSend.constructor.prototype.isKeywordMessage = function() { 
	return !this.isBinaryMessage() && this._selector.notNil() && this._selector.indexOf(":") > 0;
};
jst.MessageSend.addMethod("isKeywordMessage", "", "testing");

jst.MessageSend.constructor.prototype.preference = function() { 
	return (this._inParentheses || this.isUnaryMessage()) ? 1 : ((this.isBinaryMessage()) ? 2 : 3);
};
jst.MessageSend.addMethod("preference", "", "accessing");

jst.MessageSend.constructor.prototype.asJavascript = function() {
	/*if (this._selector == "valueWithPossibleArgs:") {
		// mp 5.11.2013 10:39
		return "jst.send(" + this._receiver.asJavascript() + ", '" + this._selector.asFunctionName() 
			+ "', " +  this._args[0].asJavascript() + ((jst.deploying) ? "" : ", " + this._sendIndex) + ")";
	}
	else */if (this._args.length <= 3 && (!this._receiver.isVariable() || !this._receiver.isSuper())) {
		//pouziji optimalizovanou verzi sendTo...
		var result = "(" + this._receiver.asJavascript() + ", '" + this._selector.asFunctionName() + "'";
		//argumenty
		for (var i = 0; i < this._args.length; i++)
			result = "w" + result + ", " + this._args[i].asJavascript();
		return "jst.snd" + result + ((jst.deploying) ? "" : ", " + this._sendIndex) + ")";
	};
	var result = "(";
	result += (this._receiver.isVariable() && this._receiver.isSuper()) ? "self" : this._receiver.asJavascript();
	result += ", '" + this._selector.asFunctionName() + "', [";
	//argumenty
	for (var i = 0; i < this._args.length; i++) {
		//argumenty funkce oddelene carkami
		if (i > 0)
			result += ", ";
		/* zbytecna zavorka
		if (this._args[i].isInParentheses())
			result += "(" + this._args[i].asJavascript() + ")";
		else*/ 
			result += this._args[i].asJavascript();
	};
	result += "]";
	if (this._receiver.isVariable() && this._receiver.isSuper()) {
		result = "superSend" + result + ", jst." + this._receiver._targetClass.theNonMetaClass().name();
		if (this._receiver._targetClass.isMeta())
			result += ".klass()";
	}
	else
		result = "send" + result;
	return "jst." + result + ((jst.deploying) ? "" : ", " + this._sendIndex) + ")";
};
jst.MessageSend.addMethod("asJavascript", "", "converting");

jst.MessageSend.constructor.prototype.do_withOwner_andRoot_ = function(aBlock, ownerExp, rootExp) {
	aBlock.valueWithPossibleArgs_([this, ownerExp, rootExp]);
	this._receiver.do_withOwner_andRoot_(aBlock, this, rootExp);
	var self = this;
	this._args.do_(function(arg){
		arg.do_withOwner_andRoot_(aBlock, self, rootExp);}
	);
	return this;
};
jst.MessageSend.addMethod("do:withOwner:andRoot:", "aBlock ownerExp rootExp", "enumerating");

jst.MessageSend.constructor.prototype.needsSelf = function() {
	return this._receiver.needsSelf() || this._args.anySatisfy_(function(arg){return arg.needsSelf();});
};
jst.MessageSend.addMethod("needsSelf", "", "testing");

jst.MessageSend.constructor.prototype.usesSymbol_ = function (aSymbol){
	return this._selector == aSymbol ||
		this._receiver.usesSymbol_(aSymbol) ||
		this._args.anySatisfy_(function(arg){return arg.usesSymbol_(aSymbol);});
}; 
jst.MessageSend.addMethod("usesSymbol:", "aSymbol", "testing");

jst.MessageSend.constructor.prototype.setStart = function () {
	this.setStartFrom_(this._receiver);
	return this;
};
jst.MessageSend.addMethod("setStart", "", "private");

jst.MessageSend.constructor.prototype.setStop = function () {
	if (this._args.length > 0)
		this.setStopFrom_(this._args.last());
	return this;
};
jst.MessageSend.addMethod("setStop", "", "private");

//*** MessageSequence ***

jst.Expression.subclass("MessageSequence", "messages receiver", "", "", "Kernel-Parser");

jst.MessageSequence.level_ = function (aNumber) {
	//kvuli zapozdreni potrebuji promennou ocislovat
	var seq = this._new();
	seq._receiver = jst.Assignment.variable_(jst.Variable.name_("_seq"+aNumber.toString()));
	return seq;
};
jst.MessageSequence._class.addMethod("level:", "aNumber", "instance creation");

/*
jst.MessageSequence.receiver_ = function (anExpression) {
	var seq = this._new();
	seq._receiver = anExpression;
	return seq;
};
jst.MessageSequence._class.addMethod("receiver:", "anExpression", "instance creation");
*/

jst.MessageSequence.constructor.prototype.initialize = function () {
	//this.super().initialize.call(this);
	jst.superSend(this, "initialize", []);
	//this._receiver = jst.Assignment.variable_(jst.Variable.name_("_seq"));
	this._messages = jst.OrderedCollection._new();
};
jst.MessageSequence.addMethod("initialize", "", "initialization");

jst.MessageSequence.constructor.prototype.do_withOwner_andRoot_ = function(aBlock, ownerExp, rootExp) {
	var self = this;
	this._receiver.do_withOwner_andRoot_(aBlock, self, rootExp); //added 17.9.2012
	this._messages.do_(function(msg){
		msg.do_withOwner_andRoot_(aBlock, self, rootExp);}
	);
	return this;
};
jst.MessageSequence.addMethod("do:withOwner:andRoot:", "aBlock ownerExp rootExp", "enumerating");

jst.MessageSequence.constructor.prototype.addMessage_ = function(aMessageSend) {
	if (this._messages.length == 0) {
		this._receiver.addArgument_(aMessageSend._receiver);
		aMessageSend._receiver = this._receiver._variable;
	};
	return this._messages.add_(aMessageSend);
};
jst.MessageSequence.addMethod("addMessage:", "aMessageSend", "accessing");

jst.MessageSequence.constructor.prototype.last = function() {
	return (this._messages.length > 0) ? this._messages.last() : jst.nil;
};
jst.MessageSequence.addMethod("last", "", "accessing");

jst.MessageSequence.constructor.prototype.needsSelf = function() {
	return this._receiver.needsSelf() || this._messages.anySatisfy_(function(msg){return msg.needsSelf();});
};
jst.MessageSequence.addMethod("needsSelf", "", "testing");

jst.MessageSequence.constructor.prototype.usesSymbol_ = function (aSymbol){
	return this._receiver.usesSymbol_(aSymbol) || 
		this._messages.anySatisfy_(function(msg){return msg.usesSymbol_(aSymbol);});
}; 
jst.MessageSequence.addMethod("usesSymbol:", "aSymbol", "testing");

jst.MessageSequence.constructor.prototype.asJavascript = function() {
	var result = "(function(){var " + this._receiver.asJavascript() + "; ";
	for (var i = 0; i < this._messages.length-1; i++)
		result += this._messages[i].asJavascript() + "; ";
	return result + "return " + ((this._messages.last()._selector == "yourself") ? 
		this._messages.last()._receiver.asJavascript() : this._messages.last().asJavascript()) + ";})()";
};
jst.MessageSequence.addMethod("asJavascript", "", "converting");

jst.MessageSequence.constructor.prototype.setStart = function () {
	this.setStartFrom_(this._messages.first());
	return this;
};
jst.MessageSequence.addMethod("setStart", "", "private");

jst.MessageSequence.constructor.prototype.setStop = function () {
	this.setStopFrom_(this._messages.last());
	return this;
};
jst.MessageSequence.addMethod("setStop", "", "private");

// *** Parser ***

jst.Parser = jst.Object.subclass("Parser", 
	"parent src i iStart iStop line lineStart isLiteralArray params tempVars targetClass autoTempVars level targetMethod isBlock prevExp", 
	"AlphanumRex BinarySelRex ForbiddenRex", "", "Kernel-Parser");

//class side
jst.Parser.source_from_to_ = function (src, iStart, iStop) {
	return this._new().setSource_from_to_(src, iStart, iStop);
};
jst.Parser._class.addMethod("source:from:to:", "src iStart iStop", "instance creation");

jst.Parser.on_ = function (aString) {
	return this._new().setSource_from_to_(aString);
};
jst.Parser._class.addMethod("on:", "aString", "instance creation");

jst.Parser.initialize = function(){
	this.__AlphanumRex = /[A-Za-z0-9]/;
	this.__BinarySelRex = /[\[\]\+-\/\\~\*<>=@%\|&\?,]/;
	this.__ForbiddenRex = /[!_]/;
};
jst.Parser._class.addMethod("initialize", "", "class initialization");

jst.Parser.initialize();

jst.Parser.parseLiteralArray_ = function(aString) {
	return this.source_from_to_(aString, 2, aString.length-1).parseLiteralArray();
};
jst.Parser._class.addMethod("parseLiteralArray:", "aString", "processing");

jst.Parser.parseDynamicArray_ = function(aString) {
	return this.source_from_to_(aString, 1, aString.length-1).parseDynamicArray();
};
jst.Parser._class.addMethod("parseDynamicArray:", "aString", "processing");

jst.Parser.parseBlock_ = function (aString) {
	return this.source_from_to_(aString, 1, aString.length-1).parseBlock();
};
jst.Parser._class.addMethod("parseBlock:", "aString", "processing");

jst.Parser.parseMethod_of_ = function (aString, targetClass) {
	var p = this.on_(aString);
	p._targetClass = targetClass;
	return p.parseMethod();
};
jst.Parser._class.addMethod("parseMethod:of:", "aString targetClass", "processing");

jst.Parser.parseCode_ = function (aString) {
	var p = this.on_(aString);
	p._autoTempVars = true;
	return p.parseCode();
};
jst.Parser._class.addMethod("parseCode:", "aString", "processing");

//instance side

jst.Parser.constructor.prototype.initialize = function(){
	this._level = 1; //vychozi uroven
	this._isLiteralArray = false; //true jen pokud parsuji literarni pole
	this._autoTempVars = false; //true jen pokud parsuji obsah workspace 
	this._isBlock = false;  //true jen pokud parsuji blok
	this._line = 1;
	this._lineStart = 1;
};
jst.Parser.addMethod("initialize", "", "initialization");

jst.Parser.constructor.prototype.setSource_from_to_ = function (src,iStart,iStop){
	this._src = src;
	this._iStart = iStart || 0;
	this._i = this._iStart;
	this._iStop = iStop || src.length;
	if (this._iStop > src.length)
		//kdyby iStop bylo vetsi
		this._iStop = src.length;
	return this;
};
jst.Parser.addMethod("setSource:from:to:", "src iStart iStop", "initialization");

jst.Parser.constructor.prototype.setParent_ = function(aParser) {
	this._parent = aParser;
	this._targetClass = aParser._targetClass;
	this._autoTempVars = aParser._autoTempVars;
	this._level = aParser._level + 1;
	return this; 
};
jst.Parser.addMethod("setParent:", "aParser", "accessing");

jst.Parser.constructor.prototype.currentLine = function() {
	return (this._parent != jst.nil) ? this._parent.currentLine() : this._line;
};
jst.Parser.addMethod("currentLine", "", "accessing");

jst.Parser.constructor.prototype.currentLineStart = function() {
	return (this._parent != jst.nil) ? this._parent.currentLineStart() : this._lineStart;
};
jst.Parser.addMethod("currentLineStart", "", "accessing");

jst.Parser.constructor.prototype.nextLineAt_ = function(pos) {
	if (this._parent != jst.nil) 
		this._parent.nextLineAt_(pos);
	else {
		this._line++;
		this._lineStart = pos + 1;
	};
	return this;
};
jst.Parser.addMethod("nextLineAt:", "pos", "accessing");

/*
jst.Parser.constructor.prototype.nextBlockId = function() { 
	return (this._parent == jst.nil) ? (this._blockId++) : this._parent.nextBlockId(); 
};
jst.Parser.addMethod("nextBlockId", "", "private");
*/

jst.Parser.constructor.prototype.targetMethod = function() { 
	return (this._parent == jst.nil) ? this._targetMethod : this._parent.targetMethod();
};
jst.Parser.addMethod("targetMethod", "", "accessing");

jst.Parser.constructor.prototype.targetMethod_ = function (m){ 
	this._targetMethod = m;
	this._params = m.arguments();
	this._targetClass = m.receiver();
	this._autoTempVars = m.selector() == "DoIt";
	this._line = 2; //skip the method signature
	return this;
};
jst.Parser.addMethod("targetMethod:", "m", "accessing");

jst.Parser.constructor.prototype.hasNext = function() { 
	return this._i < this._iStop; 
};
jst.Parser.addMethod("hasNext", "", "testing");

jst.Parser.constructor.prototype.current = function() {
	//vola se v navaznosti na hasNext()
	return this._src[this._i]; 
};
jst.Parser.addMethod("current", "", "accessing");

jst.Parser.constructor.prototype.previous = function() {
	return (this._i > 0) ? this._src[this._i-1] : ""; 
};
jst.Parser.addMethod("previous", "", "accessing");

jst.Parser.constructor.prototype.skip_ = function(n) {
	this._i += n;
	return this;
};
jst.Parser.addMethod("skip:", "n", "read/write position");

jst.Parser.constructor.prototype.next = function() {
	//vola se samostatne, volani hasNext() nepredpoklada - malinky zmatek v nazvoslovi :/ 
	return (this._i+1 < this._iStop) ? this._src[this._i+1] : "";
};
jst.Parser.addMethod("next", "", "accessing");

jst.Parser.constructor.prototype.nextCommentOrString = function() {
	//vrati retez a posune index na nasledujici znak
	var ch = this.current();
	this._i++;
	var result = "";
	while (this.hasNext() && (this.current() != ch || this.next() == ch)) {
		if (this.current() == ch)
			//pokud ma byt soucasti stringu, musim predradit zpetne lomitko
			result += "\\";
		result += this.current();
		if (this.current() == "\n")
			this.nextLineAt_(this._i);
		this._i++;
		if (this._src[this._i-1] == ch)
			//zdvojena uvozovka
			this._i++;
	};
	if (!this.hasNext() || this.current() != ch)
		this.error_("Unclosed string/comment");
	this._i++;
	return result;
};
jst.Parser.addMethod("nextCommentOrString", "", "processing");

jst.Parser.constructor.prototype.nextMatches_ = function(rex) {
	var i1 = this._i;
	while (this.hasNext() && rex.test(this.current())) {
		if (this.current() == "\n")
			this.nextLineAt_(this._i);
		this._i++;
	};
	return this._src.substring(i1, this._i);
};
jst.Parser.addMethod("nextMatches:", "rex", "processing");

jst.Parser.constructor.prototype.skipWhiteSpaces = function() { 
	return this.nextMatches_(/\s/).length > 0;
};
jst.Parser.addMethod("skipWhiteSpaces", "", "processing");

jst.Parser.constructor.prototype.nextParenthesesParser = function() {
	//vrati iterator pro vyraz uzavreny mezi zavorky, posune 'i' za posledni zavorku
	var p1 = this.current();
	var p2 = "()[]{}";
	p2 = p2[p2.indexOf(p1)+1];
	var c = 1;
	var i1 = ++this._i;
	while (this.hasNext()) {
		if ((this.current() == "'" || this.current() == '"') && this.previous() != "$") {
			//poznamku ci string preskocim - muze obsahovat zavorky, ktere ovsem nepocitam
			this.nextCommentOrString();
			continue;
		} else if (this.current() == p1  && this.previous() != "$")
			c++;
		else if (this.current() == p2 && this.previous() != "$") {
			c--;
			if (c == 0)
				break;
		};
		this._i++;
	};
	if (c > 0)
		this.error_("Nenalezena ukončovací závorka");
	//vcetne odkazu na nadrizeny parser
	return jst.Parser.source_from_to_(this._src, i1, this._i++).setParent_(this);
};
jst.Parser.addMethod("nextParenthesesParser", "", "processing");

jst.Parser.constructor.prototype.nextIdentifier = function() {
	return this.nextMatches_(this._class.__AlphanumRex);
};
jst.Parser.addMethod("nextIdentifier", "", "processing");

jst.Parser.constructor.prototype.nextBinarySelector = function() {
	var s = this.nextMatches_(this._class.__BinarySelRex);
	if (s.length > 1 && /[\+-]/.test(s.last())) {
		//predpokladam, ze znak +- je soucast nasledujicicho cisla, ne selektoru - uvidime...
		this._i--;
		return s.substring(0, s.length-1);
	}
	else
		return s;
};
jst.Parser.addMethod("nextBinarySelector", "", "processing");

jst.Parser.constructor.prototype.nextConstant_ = function(preferSelector) {
	if (/^[\+-]?\d/.test(this.current() + this.next())) {
		if (preferSelector && /[\+-]/.test(this.current()))
			//uvodni +/- neberu jako soucast cisla ale jako selektor zpravy
			return null;
		//cislo
		return jst.Constant.number_(this.nextNumber());
	} else if (this.current() == "$") {
		//znak
		this._i++;
		if (!this.hasNext())
			this.error_("Po $ nenásleduje znak!");
		return jst.Constant.char_(this._src[this._i++]);
	} else if (this.current() == "'") {
		// string literal '...'
		return jst.Constant.string_(this.nextCommentOrString());
	} else if (this.current() == "#" && this.next() == "(") {
		// konstantni pole #(...)
		this._i++;
		return this.nextParenthesesParser().parseLiteralArray();
	} else if (this.current() == "#" && this.next() == "'") {
		// symbol #'...' -> zatim prevedu na string
		this._i++;
		return jst.Constant.symbol_(this.nextCommentOrString());
	} else if (this._src.indexOf("true", this._i) == this._i) {
		//true
		this._i += 4;
		return jst.Constant.boolean_(true);
	}
	else if (this._src.indexOf("false", this._i) == this._i) {
		//false
		this._i += 5;
		return jst.Constant.boolean_(false);
	} else if (this.current() == "#" || (this._isLiteralArray && this.hasNext())) {
		// symbol #... -> zatim prevedu na string
		//beru jako symbol i bez uvozujiciho #
		if (this.current() == "#")
			this._i++;
		var src = this.nextIdentifier();
		if (src.length == 0)
			this.error_("Po # nenásleduje žádný znak!");
		while (this.hasNext() && this.current() == ":") {
			this._i++;
			src += ":" + this.nextIdentifier();
		};
		return jst.Constant.symbol_(src);
	};
	return null;
};
jst.Parser.addMethod("nextConstant:", "preferSelector", "processing");

jst.Parser.constructor.prototype.nextNumber = function() {
	//zatim pouze format cisla kompatibilni s javascriptem
	var i1 = this._i;
	this._i++; //mohu udelat, prvni znak je urcite OK - cislice nebo +/- a pak cislice
	var pocTecek = 0;
	while (this.hasNext()) {
		if (this.current() == ".") {
			if (pocTecek > 0)
				break;
			pocTecek++;
		}
		else if (!/\d/.test(this.current()))
			break;
		this._i++;
	};
  if (this._src[this._i-1] == ".")
  	//tecka na konci neni desetinny oddelovac, ale ukonceni vyrazu
      this._i -= 1;
	return this._src.substring(i1, this._i); 
};
jst.Parser.addMethod("nextNumber", "", "processing");
/*
jst.Parser.constructor.prototype.nextAssignment = function() {
	//preskocim pripadna bila mista a vratim true, najdu-li znak prirazeni :=
	this.skipWhiteSpaces();
	if (this.hasNext() && this.current() == ":" && this.next() == "=") {
		this._i += 2; //i musim posunout
		return true;
	};
	return false;
};
jst.Parser.addMethod("nextAssignment", "", "processing");
*/
jst.Parser.constructor.prototype.error_ = function (aString){
	jst.ParserError._new()
		.receiver_(this)
		.code_(this._src.substring(0, this._i) + " {9} " + this._src.substring(this._i))
		.signal_(aString);
};
jst.Parser.addMethod("error:", "aString", "error handling");

jst.Parser.constructor.prototype.parseLiteralArray = function() {
	this._isLiteralArray = true;
	this.skipWhiteSpaces();
	var poc = 0;
	var result = "[";
	while (this.hasNext()) {
		if (this.current() == '"' && this.previous() != "$")
			this.nextCommentOrString();
		else {
			var item = this.nextConstant_();
			if (item == null || item._source.length == 0)
				this.error_("Nepodařilo se nalézt další prvek pole.");
			if (poc++ > 0)
				result += ",";
			result += item.printSource();	
		};		
	    this.skipWhiteSpaces();
	};
	return jst.Constant.array_(result + "]");
};
jst.Parser.addMethod("parseLiteralArray", "", "processing");

jst.Parser.constructor.prototype.parseDynamicArray = function(){
    var arr = jst.DynamicArray._new();
	var stm = this.nextExpression();
	while (stm) {
		arr._expressions.add_(stm);
		stm = this.nextExpression();
	};
    return arr;
};
jst.Parser.addMethod("parseDynamicArray", "", "processing");

jst.Parser.constructor.prototype.parseBlock = function() {
	this._isBlock = true;
	this._params = jst.OrderedCollection._new();	
	//parsuji parametry
	this.skipWhiteSpaces();
	while (this.hasNext() && this.current() == ":") {
		this.skip_(1);
		var p = this.nextIdentifier();
		if (p.length == 0)
			this.error_("Fatal error: cannot read variable");
		if (this._params.includes_(p))
			this.error_("Name is already defined");
		if (this.varNameExists_(p) || (this._parent.notNil() && this._parent.isParam_(p)))
			this.error_("Name already used in this method");
		var m = this.targetMethod();
		if (m.notNil() && m.selector() != "DoIt") {
			if (m.arguments().notNil() && m.arguments().includes_(p))
				this.error_("Name already used in this method");
			if (m.receiver().hasInstVarNamed_(p))
				this.error_("Name already used in this class");
		};
		this._params.add_(p);
		this.skipWhiteSpaces();
	};
	if (this._params.size() > 0) {
		if (this.hasNext() && this.current() == "|")
			//blok OK
			this.skip_(1);
		else 
			this.error_("Parametry bloku nejsou ukončeny znakem |");
	};
	return jst.Block._new().setCode_params_home_(this.parseCode(), this._params, this.targetMethod());
};
jst.Parser.addMethod("parseBlock", "", "processing");

jst.Parser.constructor.prototype.parseMethod = function() {
	this._iStop =  this._src.indexOf("\n");
	iStart = this._iStop+1; //nasledujici znak po \n
	//this._line = 2;
	//this._lineStart = iStart;
	var args = jst.OrderedCollection._new();
	this.skipWhiteSpaces();
 	var selector = this.nextBinarySelector();
 	var isBinaryMessage = selector.length > 0; 
 	if (isBinaryMessage) {
 		this.skipWhiteSpaces();
 		args.add_(this.nextIdentifier());
 	}
 	else {
 		selector = this.nextIdentifier();
 	   	while (this.hasNext() && this.current() == ":") {
 	   		selector += this.current();
 	   		this.skip_(1);
 	   		this.skipWhiteSpaces();
 	   		args.add_(this.nextIdentifier());
 	   		this.skipWhiteSpaces();
 	   		selector += this.nextIdentifier();
 		};
 	};
	this._iStop = this._src.length;
 	this.skipWhiteSpaces();
 	var result = null;
 	if (this.hasNext() && (this.current() == '{' || this._src.indexOf("function") == this._i)
 		&& selector != "DoIt") {
 		//nativni javascriptova funkce, mimo DoIt
 		while (this.hasNext() && this.current() != '{')
 			this._i++;
 		result = jst.Method.code_(eval("(function(){return function(" + args.join(",") + ")" + this._src.substring(this._i) + ";})()"));
 	}
 	else
 		result = jst.SmalltalkMethod.code_(this._src.substring(iStart));
 	result._selector = selector;
 	result._args = args;
 	result._receiver = this._targetClass;
 	if (result._code.isString())
 		//tj. pouze SmalltalkMethod
 		result.parseCode();
 	return result;
};
jst.Parser.addMethod("parseMethod", "", "processing");

jst.Parser.constructor.prototype.isParam_ = function(aSymbol) {
	return (this._params.notNil() && this._params.includes_(aSymbol)) ||
		(this._parent.notNil() && this._parent.isParam_(aSymbol));
};
jst.Parser.addMethod("isParam:", "aSymbol", "testing");

jst.Parser.constructor.prototype.isTempVar_ = function(aSymbol) {
	return (this._tempVars.notNil() && this._tempVars.includes_(aSymbol)) ||
		(this._parent.notNil() && this._parent.isTempVar_(aSymbol));
};
jst.Parser.addMethod("isTempVar:", "aSymbol", "testing");

jst.Parser.constructor.prototype.createVariable_ = function(aSymbol) {
	var v = jst.Variable.name_(aSymbol);
	if (this.isTempVar_(aSymbol))
		return v;
	if (this.isParam_(aSymbol))
		//parametr ma prednost pred instancnimi/tridnimi promennymi
		v.beParam();
	else if (this._targetClass.notNil() && this._targetClass.hasInstVarNamed_(aSymbol))
		v.beInstVar();
	else if (this._targetClass.notNil() && this._targetClass.hasClassVarNamed_(aSymbol))
		v.beClassVarOf_(this._targetClass);
	else if (/^[A-Z]/.test(aSymbol)) {
		if (jst.Smalltalk.classNamed_(aSymbol).isNil())
			this.error_("Fatal error: třída '" + aSymbol + "' nenalezena!");
		v.beClassName();
	}
	else if (this._autoTempVars)
		//pridam jako lokalni promennou
		this._tempVars.add_(aSymbol);
	else
		//this.error_("Fatal error: symbol '" + aSymbol + "' není proměnná!");
		this.error_("Unknown variable");
	return v;
};
jst.Parser.addMethod("createVariable:", "aSymbol", "private");

jst.Parser.constructor.prototype.parseTempVars = function() {
	this._tempVars = jst.OrderedCollection._new();
	if (this.skipWhiteSpaces() && !this.hasNext())
		return this._tempVars;
	//poznamka "..." - preskakuji
	if (this.current() == '"') {
		this.nextCommentOrString();
		this.skipWhiteSpaces();
	};
	if (this.current() != "|")
		return this._tempVars;
	//lokalni promenne
	this.skip_(1);
	this.skipWhiteSpaces();
	while (this.hasNext() && this.current() != "|") {
		var varName = this.nextIdentifier();
		if (varName.length == 0)
			this.error_("Fatal error: cannot read variable");
		if (this._tempVars.includes_(varName))
			this.error_("Name is already defined");
		if (this.isParam_(varName) || (this._parent.notNil() && this._parent.varNameExists_(varName)))
			this.error_("Name already used in this method");
		var m = this.targetMethod();
		if (m.notNil()) {
			if (m.arguments().notNil() && m.arguments().includes_(varName))
				this.error_("Name already used in this method");
			if (m.receiver().hasInstVarNamed_(varName))
				this.error_("Name already used in this class");
		};
		this._tempVars.add_(varName);
		this.skipWhiteSpaces();
	};
	if (this.hasNext() && this.current() != "|")
		this.error_("Nenalezen znak | ukončující definici proměnných.");
	this.skip_(1);
	return this._tempVars;
};
jst.Parser.addMethod("parseTempVars", "", "processing");

jst.Parser.constructor.prototype.varNameExists_ = function (aSymbol){
	return (this._tempVars.notNil() && this._tempVars.includes_(aSymbol)) ||
		(this._parent.notNil() && this._parent.varNameExists_(aSymbol));
};
jst.Parser.addMethod("varNameExists:", "aSymbol", "testing");

jst.Parser.constructor.prototype.nextExpression = function() {
	var stm = null;
	var seq = null;
	var seqAssign = null;
	var returnExp = null;
	var xStart = this._i;
	var xLine = this.currentLine();
	var xLineStart = this.currentLineStart();
	var cascadeExpected = false;
	while (this.hasNext() && this.current() != ".") {
		if (this.skipWhiteSpaces())
			continue;
		//else if (this.current() == "|") <- tluce se se zpravou | - viz Boolean
		//	this.error_("Definice proměnných smí být jen na začátku výrazu.");
		else if (this.current() == '"' && this.previous() != "$") {
			this.nextCommentOrString();
			continue;
		}
		else if (this._prevExp != jst.nil && this._prevExp.isReturn() && this.hasNext()) {
			this.error_("End of block expected.");
		}
		else if (this.current() == ":" && this.next() == "=") {
			//assignment -> funkci nextAssignment zrusit
			if (!stm)
				this.error_("Symbolu přiřazení nepředchází proměnná.");
			else if (!stm.isVariable())
				this.error_("Neočekávaný objekt na levé straně přiřazení.");
			else if (stm.isParam())
				this.error_("Parametru nelze přiřadit hodnotu.");
			stm = jst.Assignment.variable_(stm);
			this.skip_(2);
			continue;
		} 
		else if (this.current() == "^") {
			//return
			if (cascadeExpected)
				this.error_(cascadeExpected);
			if (stm)
				this.error_("Symbolu ^ nemůže předcházet žádný kód.");
			returnExp = jst.Return._new();
			returnExp.setStart_line_source_(this._i, this.currentLine(), this._src);
			this.skip_(1);
			continue;
		}
		else if (this.current() == ";") {
			if (!stm || stm.asMessage().isNil())
				this.error_("Byla očekávána zpráva.");
			else if (stm.needsArgument() || stm.needsSelector())
				this.error_("Byl očekáván argument nebo selektor zprávy.");
			if (!seq) {
				seq = jst.MessageSequence.level_(this._level);
				seq.setStartFrom_(stm.asMessage());
				if (stm.isAssignment())
					seqAssign = stm;
			} else if (seq._messages.first().receiver() != stm.receiver())
				this.error_("Unexpected message selector");
			seq.addMessage_(stm.asMessage().setStop_line_source_(this._i, this.currentLine(), this._src));
			stm = jst.MessageSend.receiver_(stm.asMessage()._receiver);
			cascadeExpected = "Cascade expected";
			this.skip_(1);
			continue;
		}
		else if ("]})".indexOf(this.current()) >= 0 && this.previous() != "$") {
			this._i++;
			this.error_("Ukončovací závorka nalezena na neočekávaném místě.");
		}
		else if (this._class.__ForbiddenRex.test(this.current())) {
			this._i++;
			this.error_("The forbidden char");
		};
		var receiverOrArg = null;
		xStart = this._i;
		xLine = this.currentLine();
		xLineStart = this.currentLineStart();
		if (this.current() == "$")
			//znak
			receiverOrArg = this.nextConstant_();
		else if (this.current() == "(")
			receiverOrArg = this.nextParenthesesParser().nextExpression().beInParentheses();
		else if (this.current() == "[") {
			receiverOrArg = this.nextParenthesesParser().parseBlock();
			receiverOrArg._id = ++jst.blockIndex; //this.nextBlockId();
		}
		else if (this.current() == "{")
			receiverOrArg = this.nextParenthesesParser().parseDynamicArray();        
		else
			//nejprve zkusim, zda-li nasleduje konstanta, tj. objekt (instance jst.Constant)
			receiverOrArg = this.nextConstant_(stm && !stm.needsArgument());
		if (receiverOrArg) {
			receiverOrArg.setStart_stop_from_to_source_(xStart, this._i, xLine, this.currentLine(), this._src);
			if (!stm)
				//je to receiver nebo je prikaz tvoren samotnou konstantou/blokem/polem/zavorkou (to se ukaze pozdeji)
				stm = receiverOrArg;
			else if (stm.needsArgument())
				//je to argument
				stm.addArgument_(receiverOrArg);
			else {//alert(stm._expression._args[0]._selector);
				this.error_("Výraz se nachází na neočekávaném místě.");}
			continue;
		}; 
		//zde je receiverOrArg urcite null
		//nasleduje tedy selector nebo promenna, coz musim odlisit podle kontextu
		//napred zkusim parsovat binarni selector, ten bezpecne poznam !!!
		var selectorOrVar = this.nextBinarySelector();
		var isBinarySelector = selectorOrVar.length > 0;
		if (!isBinarySelector) {
			//promenna nebo selektor unarni/textove zpravy
			selectorOrVar = this.nextIdentifier();
			if (selectorOrVar == "nil") {
				selectorOrVar = jst.Constant.nil();
				selectorOrVar.setStart_stop_from_to_source_(xStart, this._i, xLine, this.currentLine(), this._src);
				if (!stm)
					stm = selectorOrVar;
				else if (stm.needsArgument())
					stm.addArgument_(selectorOrVar);
				else
					this.error_("Nil se nachází na neočekávaném místě.");				
				continue;
			}
			else if (selectorOrVar == "self" || selectorOrVar == "super") {
				//je to receiver (pripadne argument?)
				if (this._targetClass.isNil())
					this.error_("Proměnnou " + selectorOrVar + " lze použít jen v kontextu metody.");
				var v = jst.Variable.name_(selectorOrVar).targetClass_(this._targetClass);
				v.setStart_stop_from_to_source_(xStart, this._i, xLine, this.currentLine(), this._src);
				if (!stm)
					stm = v;
				//else if (stm.needsArgument() && (v.isSelf() || stm.isAssignment()))
				else if (stm.needsArgument())
					//i super muze byt v argumentu, pokud bude receiverem dalsi zpravy 
					stm.addArgument_(v);
				else
					this.error_("Proměnná " + selectorOrVar + " se nachází na neočekávaném místě.");
				continue;
			};
		};
		//dale keyword selektor, ten taky poznam podle dvojtecky
		var isKeywordSelector = !isBinarySelector && this.hasNext() && this.current() == ":" 
			&& this.next() != "=" && /^[a-z]/.test(selectorOrVar); //a zacina malym pismenem, TODO: nezrusit?
		if (isKeywordSelector) {
			selectorOrVar += ":";
			this.skip_(1);
		};
		if (isBinarySelector || isKeywordSelector) {//if (selectorOrVar == ',') alert(stm.asMessage().isInParentheses());
			if (!stm)
				this.error_("Selektoru zprávy nepředchází receiver.");
			var msg = stm.asMessage();
			if (stm.isInParentheses())
				//test na zavorku musi byt zvlast pred dalsimi testy
				stm = msg = jst.MessageSend.receiver_selector_isBinary_(stm, selectorOrVar, isBinarySelector);
			else if (stm.needsSelector())
				//binarni selektor nebo prvni cast keyword selektoru
				msg = stm.addSelector_binary_(selectorOrVar, isBinarySelector);
			else if (isKeywordSelector && msg.notNil() && !msg.isInParentheses() && msg.isKeywordMessage()) {
				//musi byt pred nasl. testem na prirazeni - stm muze byt prirazeni obsahujici zpravu
				//dalsi cast keyword selectoru zpravy
				msg.addSelector_binary_(selectorOrVar, isBinarySelector);
				msg = jst.nil; //opravdu nemuze byt prvni cast keyword selektoru?
			} else if (stm.needsArgument())
				this.error_("Selektor zprávy se nachází na místě argumentu přiřazení nebo zprávy.");
			else if (isBinarySelector && msg.notNil() && msg.isKeywordMessage() && !msg.isInParentheses())
				//musi byt pred nasl. testem na prirazeni - stm muze byt prirazeni obsahujici zpravu
				//posledni argument nahradim zpravou, jejimz bude receiverem
				stm.asMessage().addArgument_(msg = jst.MessageSend.receiver_selector_isBinary_(
					msg.arguments().pop(), selectorOrVar, isBinarySelector));
			else if (stm.isAssignment())
				//nahradim argument
				stm.addArgument_(msg = jst.MessageSend.receiver_selector_isBinary_(stm.argument(), selectorOrVar, isBinarySelector));
			else
				//stm je tedy konstanta, promenna, pole, blok nebo unarni ci binarni zprava a stava se receiverem,
				//(unarni i binarni zprava je urcite cela a stava se diky preferenci receiverem)
				stm = msg = jst.MessageSend.receiver_selector_isBinary_(stm, selectorOrVar, isBinarySelector);
			if (msg != jst.nil && msg._selStart == jst.nil)
				msg.setSelStart_line_from_source_(xStart, xLine, xLineStart, this._src);
			continue;
		} 
		//selektor unarni zpravy nebo promenna
		else if (stm && stm.needsSelector()) {
			//unarni zprava - dokonceni
			var msg = stm.addSelector_binary_(selectorOrVar, false);
			msg.setSelStart_line_from_source_(xStart, xLine, xLineStart, this._src);
			msg.setStop_line_source_(xStart + selectorOrVar.length, xLine, this._src);
			continue;
		}
		else if (stm && !stm.needsArgument()) {
			//urcite unarni zprava?
			var msg = stm.asMessage();
			if (stm.isInParentheses())
				//test na zavorku musi byt zvlast pred dalsimi testy
				stm = msg = jst.MessageSend.receiver_selector_isBinary_(stm, selectorOrVar, false);
			else if (msg.notNil() && !msg.isInParentheses() && (msg.isBinaryMessage() || msg.isKeywordMessage())) {
				//musi byt pred nasl. testem na prirazeni - stm muze byt prirazeni obsahujici zpravu
				var lastArg = msg.arguments().last().asMessage();
				if (lastArg.notNil() && lastArg.isBinaryMessage() && !lastArg.isInParentheses())
					lastArg.addArgument_(msg = jst.MessageSend.receiver_selector_isBinary_(
						lastArg.arguments().pop(), selectorOrVar, false));
				else
					stm.asMessage().addArgument_(msg = jst.MessageSend.receiver_selector_isBinary_(
						msg.arguments().pop(), selectorOrVar, false));
			}
			else if (stm.isAssignment())
				//nahradim argument
				stm.addArgument_(msg = jst.MessageSend.receiver_selector_isBinary_(stm.argument(), selectorOrVar, false));
			else
				stm = msg = jst.MessageSend.receiver_selector_isBinary_(stm, selectorOrVar, false);
			if (msg != jst.nil) {
				msg.setSelStart_line_from_source_(xStart, xLine, xLineStart, this._src);
				msg.setStop_line_source_(xStart + selectorOrVar.length, xLine, this._src);
			};
			continue;
		}; 
		//mela by to byt promenna - je tedy receiver nebo argument zpravy/prirazeni
		receiverOrArg = this.createVariable_(selectorOrVar);
		receiverOrArg.setStart_stop_from_to_source_(xStart, xStart + selectorOrVar.length, xLine, xLine, this._src);
		if (!stm)
			//je to receiver nebo je prikaz tvoren samotnou promenou (to se ukaze pozdeji)
			stm = receiverOrArg;
		else if (stm.needsArgument())
			//je to argument
			stm.addArgument_(receiverOrArg);
		else
			this.error_("Proměnná se nachází na neočekávaném místě.");
	};
	if (cascadeExpected && stm.isMessageSend() && !stm.needsSelector() && !stm.needsArgument()) {
		//v stm je jen posledni zprava sekvence (sekvence musi obsahovat alespon dve zpravy)
		if (seq._messages.first().receiver() != stm.receiver())
			this.error_("Unexpected message selector");
		seq.addMessage_(stm.setStop_line_source_(this._i, this.currentLine(), this._src));
		if (seqAssign) {
			seqAssign.addArgument_(seq);
			stm = seqAssign;
		}
		else
			stm = seq;
		cascadeExpected = false;
	};
	if (cascadeExpected)
		this.error_(cascadeExpected);
	if (stm && stm.needsArgument())
		this.error_("Neukončený výraz - je očekáván argument zprávy nebo přiřazení.");
	if (this.hasNext() && this.current() == ".")
		this.skip_(1);
	return (returnExp) ? returnExp.expression_(stm) : stm;
};
jst.Parser.addMethod("nextExpression", "", "processing");

jst.Parser.constructor.prototype.parseCode = function() {
	var code = jst.SmalltalkCode._new();
	code.setSource_from_to_vars_(this._src, this._iStart, this._iStop, this.parseTempVars());
	var stm = this.nextExpression();
	while (stm) {
		code.addExpression_(stm);
		this._prevExp = stm;
		stm = this.nextExpression();
	};
	return code;
};
jst.Parser.addMethod("parseCode", "", "processing");

//*** SmalltalkMethod ***

jst.SmalltalkMethod = jst.Method.subclass("SmalltalkMethod", "", "", "", "Kernel-Methods");

jst.SmalltalkMethod.initialize = function() {
	//od ted bude Method.__MethodClass ukazovat na SmalltalkMethod
	this.__MethodClass = this;
	return this;
};
jst.SmalltalkMethod._class.addMethod("initialize", "", "class sinitialization");

jst.SmalltalkMethod.initialize();

jst.SmalltalkMethod.constructor.prototype.isNative = function() {
	return false; 
}; 
jst.SmalltalkMethod.addMethod("isNative", "", "testing");

jst.SmalltalkMethod.constructor.prototype.asJavascript = function() {
	return this._code.asJavascript();
};
jst.SmalltalkMethod.addMethod("asJavascript", "", "converting");

jst.SmalltalkMethod.constructor.prototype.body = function() {
	return (this._code.isString()) ? this._code : this._code._source; 
}; 
jst.SmalltalkMethod.addMethod("body", "", "accessing");

jst.SmalltalkMethod.constructor.prototype.parseCode = function() {
	var p = jst.Parser.on_(this.body());
	p.targetMethod_(this);
	this._code = p.parseCode();
	this._code.owner_(this);
	return this._code;
};
jst.SmalltalkMethod.addMethod("parseCode", "", "compiling");

/* puvodni reseni:
jst.SmalltalkMethod.constructor.prototype.compile = function() {
	if (!this._code.isString()){
		this._receiver.protocol()[this.functionName()] = eval("("+this._code.asJavascript()+")");
		return this;
	};
	//misto cilove funkce nainstaluji pouze zavadec, ktery provede kompilaci pri prvnim zavolani
	var method = this;
	var argsText = this.argumentsSeparatedBy_(","); //(this._args.notNil()) ? this._args.join(",") : "";
	eval("this._receiver.protocol()[this.functionName()] = function(" + argsText + 
		"){var fce = eval('('+method.parseCode().asJavascript()+')'); " +
		"method._receiver.protocol()[method.functionName()] = fce; " +
		"return fce.call(this" + ((argsText.length>0) ? "," : "") + argsText + ");}");
	return this; 
};
*/

jst.SmalltalkMethod.constructor.prototype.compile = function() {
	if (this._code.isString())
		this.parseCode();
	var fn = eval("("+this._code.asJavascript()+")");
	fn._method = this;
	this._receiver.protocol()[this.functionName()] = fn;
	if (this._fnName != jst.nil)
		this._receiver.protocol()[this._fnName] = fn;
	return this;
};
jst.SmalltalkMethod.addMethod("compile", "", "compiling");

jst.SmalltalkMethod.constructor.prototype.printSource = function(){
	if (this._code.isString())
		//this.compile();
  		this.error_("The method is not compiled!");
	return this.printMessagePattern() + "\n" + this._code.printSource(); 
};
jst.SmalltalkMethod.addMethod("printSource", "", "printing");

// *** doIt and printIt

//mp 11.1.2012, puvodni reseni viz jst-kernel
jst.Object.constructor.prototype.doIt_ = function (aString){
	//call as jst.doIt("...") in Javascript code
	var m = jst.Parser.parseMethod_of_("DoIt\n\t" + aString, 
		this.isBehavior() ? this.classSide() : this.klass());
	if (m.code().expressions().size() > 0 && !m.code().expressions().last().isReturn()) {
		var exp = m.code().expressions().pop();
		m.code().expressions().add_(jst.Return._new().expression_(exp));
	};
	return m.parseCode().doIt().call(this.isBehavior() ? this.instanceSide() : this);
};
jst.Object.addMethod("doIt:", "aString", "*kernel-parser");

jst.doIt = function(aString) {
	return jst.nil.doIt_(aString);
};

jst.Object.constructor.prototype.printIt_ = function(aString) {
	//call as jst.printIt("...") in Javascript code
	var result = jst.sndw(this, "doIt_", aString);
	if (result == null) 
		return "nil";
	//result could by a native js object  
	return (result.printString) ? result.printString() : result.toString();
};
jst.Object.addMethod("printIt:", "aString", "*kernel-parser");

jst.printIt = function(aString) {
	return jst.nil.printIt_(aString);
};

