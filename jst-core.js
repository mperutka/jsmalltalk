/**
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
 * This file defines core classes and methods of JSmalltalk system in pure javascript.
 * Classes (27, in order of definition): 
 * Object, Dictionary, ClassBuilder, Behavior, Class, ClassCategory, Metaclass, Collection, 
 * UndefinedObject, MethodCategory, MethodVersion, Method, Error, BlockEvaluatingError, BlockClosure, 
 * SystemDictionary, BlockReturn, SequenceableCollection, Array, OrderedCollection, 
 * SortedCollection, String, Number, Boolean, Message, MessageNotUnderstood, Magnitude, DateAndTime
 */

// jst == JSmalltalk ;)
var jst = {
	currentJsFile: "jst-core",
	runtime: false
};

jst.Object = {
	_name: "Object",
	constructor: function Object(){},
	newFrom_: function(aSimilarObject){
		return this.basicNew().copySameFrom_(aSimilarObject);
	},
	adopt_: function(jsObject) {
		//protokol javascriptoveho objektu rozsiri o protokol teto tridy, neprepisu jiz existujici funkce/promenne
		if (typeof jsObject != "object" || jsObject instanceof jst.Object.constructor)
			//this.error_("Only instances of javascript objects can be adopted.");
			return jsObject; //no adoption
		var p = this.protocol();
		for (var i in p) {
			if (jsObject[i] == null)
				jsObject[i] = p[i];
			else if (i != "toString" && jsObject[i] != p[i])
				console.log(["Warning: '" + i + "' allready exists, could not fully adopt the object:" + jsObject]);
		};
		return jsObject;
	}
};

//instance side protocol
//konstruktor pro vytvareni instanci tridy jst.Object
jst.Object.constructor.prototype = {
	_class: jst.Object,
	klass: function() {
		return this._class;
	},
	printString: function(){
		return ((/[AEIOU]/i.test(this._class.name()[0])) ? "'an " : "'a ") + this._class.name() + "'";
	},
	asString: function(){
		return this.printString();
	},
	toString: function(){
		//usefull for debugging in js console
		return this.asString();
	},
	name: function() {
		return this.printString();
	},
	className: function() {
		return this._class.name();
	},
	isKindOf_: function(aClass){
		return this._class == aClass || (aClass.hasOwnProperty("constructor") 
			&& this instanceof aClass.constructor); // || this._class.inheritsFrom_(aClass);
	},
	error_: function(aString){
		jst.Error.signal_on_(aString, this);
	},
	
	perform_: function(aSymbol) {
		return jst.snd(this, aSymbol.asFunctionName());
	}, //return this[aSymbol.asFunctionName()]();

	perform_with_: function(aSymbol, anObject) {
		return jst.sndw(this, aSymbol.asFunctionName(), anObject);
	}, //return this[aSymbol.asFunctionName()](anObject);
	
	perform_with_with_: function(aSymbol, firstObject, secondObject) {
		return jst.sndww(this, aSymbol.asFunctionName(), firstObject, secondObject);
	}, //return this[aSymbol.asFunctionName()](firstObject, secondObject);
	
	perform_with_with_with_: function(aSymbol, firstObject, secondObject, thirdObject) {
		return jst.sndwww(this, aSymbol.asFunctionName(), firstObject, secondObject, thirdObject);
	}, //return this[aSymbol.asFunctionName()](firstObject, secondObject, thirdObject);

	perform_withArguments_: function(aSymbol, argArray) {
		return jst.send(this, aSymbol.asFunctionName(), argArray);
	}, //return this[aSymbol.asFunctionName()].apply(this, argArray);
	
	subclassResponsibility_: function(methodName) {
		this.error_("The subclass of " + this.className() + " should have overridden #" + methodName);
	},
	shouldNotImplement: function() {
		//Announce that, although the receiver inherits this message, it should not implement it.
		this.error_("This message is not appropriate for this object");
	},
	errorSubscriptBounds_: function(index) { 
		//Create an error notification that an improper integer was used as an index
		this.error_("subscript is out of bounds: " + index);
	},
	errorKeyNotFound: function() {
		return this.error_("key not found");
	},
	as_: function(aSimilarClass){
		return aSimilarClass.newFrom_(this);
	},
	isBehavior: function() {
		return false;
	},
	isBlock: function() {
		return false;
	},
	isString: function() {
		return false;
	},
	isSymbol: function() {
		return false;
	},
	value: function() {
		//because of String
		return this.yourself();
	},
	isNil: function() {
		return false;
	},
	notNil: function() {
		return true;
	},
	ifNil_: function(nilBlock) {
		//because of String
		return this.yourself();
	},
	ifNotNil_: function(notNilBlock) {
		return notNilBlock.value();
	},
	ifNil_ifNotNil_: function(nilBlock, notNilBlock) {
		return notNilBlock.value();
	},
	ifNotNil_ifNil_: function(notNilBlock, nilBlock) {
		return notNilBlock.value();
	},
	ifNotNilDo_: function(aBlock) {
		//because of String
		return aBlock.value_(this.yourself());
	},
	ifNil_ifNotNilDo_: function(nilBlock, aBlock) {
		//because of String
		return aBlock.value_(this.yourself());
	},
	ifNotNilDo_ifNil_: function(aBlock, nilBlock) {
		//because of String
		return aBlock.value_(this.yourself());
	},
	shallowCopy: function() {
		var c = this._class.basicNew();
		var self = this;
		this._class.allInstVarNames().do_(function(n){
			c["_"+n] = self["_"+n];
		});
		return c;
	},
	postCopy: function() {
		//because of String
		return this.yourself();
	},
	copy: function() {
		return this.shallowCopy().postCopy();
	},
	inform_: function(aString) {
		alert(aString);
		return this;
	},
	copySameFrom_: function (otherObject){
		//Copy to myself all instance variables named the same in otherObject
		var self = this;
		//otherObject can be a native object too
		var pref = (otherObject._class) ? "_" : "";
		this._class.allInstVarNames().do_(function(n){
			if (n != "class" && otherObject[pref+n] != null)
				self["_"+n] = otherObject[pref+n];
		});
		return this;
	},
	adopt_: function (jsObject){
		//including values of instance variables
		this._class.adopt_(jsObject);
		var self = this;
		this._class.allInstVarNames().do_(function(n){
			jsObject["_"+n] = self["_"+n];
		});
		return jsObject;
	}
};

jst.Dictionary = {
	_name: "Dictionary"
};

// *** ClassBuilder ***

jst.ClassBuilder = {
	_name: "ClassBuilder",
	createConstructorOn_: function(aClass, superProtocol){
		//constructor pro vyrobu instanci tridy
		aClass.constructor = eval("(function " + aClass._name + "(){})");
		var InstanceProtocol = eval("(function " + aClass._name + "Protocol(){})");
		//dedeni protokolu pro instance
		InstanceProtocol.prototype = superProtocol || aClass.__proto__.constructor.prototype;
		aClass.constructor.prototype = new InstanceProtocol();
		aClass.constructor.prototype._class = aClass;
		return aClass.constructor;
	},
	createMetaclassOn_of_: function(aClass, superMetaclass) {
		var metaConstructor = eval("(function " + aClass._name + "Class(){})");
		metaConstructor.prototype = superMetaclass;
		aClass._class = new metaConstructor();
		var builder = this._new();
		builder._newClass = aClass._class;
		builder.initializeClass();
		aClass._class._thisClass = aClass;
		aClass._class._class = jst.Metaclass;
		//jst.Metaclass.instances.at_put_(metaclass.name(), metaclass);
		return aClass._class;
	}
};

jst.ClassBuilder.__proto__ = jst.Object;

jst.ClassBuilder.createConstructorOn_(jst.ClassBuilder);

jst.ClassBuilder.constructor.prototype.initializeClass = function() {
	if (this._newClass != jst.Behavior) {
		var self = this;
		jst.Behavior._instanceVariables.forEach(function(selector){
			if (!self._newClass.hasOwnProperty("_"+selector)) 
				self._newClass["_"+selector] = jst.nil;
		});
	};
	//zavolam explicitne
	jst.Behavior.constructor.prototype.initialize.call(this._newClass);
	if (this._newClass.hasOwnProperty("initialize"))
		//initialize predku se automaticky volat nebude, v pripade potreby je nutno volat explicitne jako u instanci
		this._newClass.initialize();
    //aplikuje nerekurzivne initialize() teto tridy a vsech predchudcu,
    //avsak pouze pokud trida initialize() implementuje - super!
    /*var initChain = [];
    var c = aClass;
    while (c && c != Object) {
        //puvodne: if (c.initialize != c.superclass().initialize)
    	if (c.hasOwnProperty("initialize"))
            initChain.push(c.initialize);
        c = c.__proto__;
    };
    while (initChain.length > 0) {
    	initChain.pop().apply(aClass);
    };*/
    return this;
};
	
jst.ClassBuilder.constructor.prototype.initializeClassProtocol = function() {
	if (this._newClass != jst.Class) {
		var self = this;
		jst.Class._instanceVariables.forEach(function(selector){
    		if (!self._newClass.hasOwnProperty("_"+selector)) 
    			self._newClass["_"+selector] = jst.nil;
    	});
	};
	return this;
};
	
jst.ClassBuilder.constructor.prototype.createClass_subclassOf_ = function(className, superclass){
	var classConstructor = eval("(function " + className + "(){})");
	classConstructor.prototype = superclass;
	this._newClass = new classConstructor();
	this._newClass._name = className;
	this.initializeClassProtocol();
	this.initializeClass();
	this._class.createMetaclassOn_of_(this._newClass, superclass._class);
	this._class.createConstructorOn_(this._newClass);
	return this;
};

jst.ClassBuilder.constructor.prototype.subclassOf = function(superclass, classOrName, instVars, classVars, poolDict, category){		
	if (typeof classOrName != "string") {
		//dokonceni tridy, ktera je vytvorena staticky - viz zakladni tridy
		this._newClass = classOrName;
		if (!this._newClass.hasOwnProperty("_methodDict")) {
			//test zajisti, ze se initialize() zavola jen poprve, 
			//i kdyz budu subclass() volat opakovane
			this.initializeClassProtocol();
			this.initializeClass();
		};
		if (!this._newClass.hasOwnProperty("_class") || this._newClass._class.isNil())
			this._class.createMetaclassOn_of_(this._newClass, superclass._class);
		if (!this._newClass.hasOwnProperty("constructor"))
			this._class.createConstructorOn_(this._newClass);
	} 
	else {
		if (!/^[A-Z]/.test(classOrName))
			this.error_("Název třídy '"+ classOrName +"' nezačíná velkým písmenem.");
		this._newClass = jst[classOrName]; //trida uz existuje
		if (!this._newClass) {
			this.createClass_subclassOf_(classOrName, superclass);
			jst[classOrName] = this._newClass;
		} else {
			//the class already exists, make sure we don't redefine any dangerous classes
			if (this.tooDangerousClasses().includes_(this._newClass._name))
				this.error_(this._newClass._name + " cannot be changed");
			if (this._newClass.superclass() != superclass) {
				//changing the superclass of an existed class
				this._newClass.superclass()._subclasses.removeKey_(this._newClass._name);
				this._newClass.__proto__ = superclass;
				this._newClass.constructor.prototype.__proto__ = superclass.constructor.prototype; 
				this._newClass._class.__proto__ = superclass._class;
			}
		}
	};
	var catName = category || "Default";
	this._newClass._category = jst.categories.at_ifAbsentPut_(catName, 
		function(){var cat = jst.ClassCategory._new(); cat._name = catName; return cat;});
	if (!superclass.hasOwnProperty("_subclasses") || superclass._subclasses.isNil())
		superclass._subclasses = jst.Dictionary._new();
	superclass._subclasses.at_put_(this._newClass._name, this._newClass);
	//instVars - vzdy znovu prepisi a inicializuji
	if (instVars)
		//mimo Behavior a Class
		this._newClass._instanceVariables = instVars.match(/\w*/g).filter(function(x){return x != "";});
	if (this._newClass._instanceVariables != jst.nil) {
		var self = this;
		this._newClass._instanceVariables.forEach(function(selector){
			self._newClass.protocol()["_"+selector] = jst.nil;
		});
	};
	//classVars
	this.initClassVars_(classVars);
	if (typeof jst.currentJsFile == "string")
		this._newClass.jsFile_(jst.currentJsFile);
	else 
		jst.currentJsFile.classChanged_(this._newClass); //adding to ChangeSet
	return this._newClass;
};

jst.ClassBuilder.constructor.prototype.initClassVars_ = function(aString) {
	var dict = jst.Dictionary._new();
	var arr = aString.match(/\w*/g).filter(function(x){return x != "";});
	for (var i = 0; i < arr.length; i++) {
		if (!/^[A-Z]/.test(arr[i]))
			this.error_("Název třídní proměnné '"+ arr[i] +"' nezačíná velkým písmenem.");    			
		dict.at_put_(arr[i], jst.nil);
	};
	if (this._newClass._classPool.notNil()) {
		//zachovam stare hodnoty, odstranene promenne nastavim na null
		for (var key in this._newClass._classPool._map) {
   			if (dict.includesKey_(key))
   				dict.at_put_(key, this._newClass._classPool._map[key]);
   			else if (this._newClass.hasOwnProperty("__"+key))
   				this._newClass["__"+key] = null;
		}
	};
	for (var i = 0; i < arr.length; i++) {
	if (!this._newClass.hasOwnProperty("__"+arr[i]))
			this._newClass.initClassVarNamed_(arr[i]);
	};
	this._newClass._classPool = dict;
	return this;
};


jst.ClassBuilder.constructor.prototype.tooDangerousClasses = function() { 
	//implemented later in jst-kernel
	return [];
};

// Behavior, part one

jst.Behavior = {
	_name: "Behavior",
	_instanceVariables: ["instanceVariables", "methodDict", "categories"]
};

jst.ClassBuilder.createConstructorOn_(jst.Behavior);
jst.Behavior.constructor.prototype.__proto__ = jst.Object.constructor.prototype;

jst.Behavior.constructor.prototype.printString = function(){
	return this.name();
};

jst.Behavior.constructor.prototype.subclasses = function (){
	//vracim nove pole
	var c = jst.OrderedCollection._new();
	this.subclassesDo_(function(s){c.add_(s);});
	return c;
};

jst.Behavior.constructor.prototype.allSubclasses = function (){
	var scan = this.subclasses();
	var scanTop = 0;
	while (scanTop < scan.length) {
		scan[scanTop].subclassesDo_(
			function(s){scan.add_(s);}
		);
		scanTop += 1;
	};
	return scan;
};

jst.Behavior.constructor.prototype.allSubclassesDo_ = function (aBlock){
	this.subclassesDo_(function(cl){
		aBlock.value_(cl);
		cl.allSubclassesDo_(aBlock);}
	);
	return this;
};

jst.Behavior.constructor.prototype.methodDict = function(){
	return this._methodDict;
};

jst.Behavior.constructor.prototype.instVarNames = function(){
	return this._instanceVariables.notNil() ? this._instanceVariables : jst.Array._new(); 
};	

jst.Behavior.constructor.prototype.allInstVarNames = function(){
	return (this.superclass().notNil()) ? 
		this.superclass().allInstVarNames().concat(this.instVarNames()) : this.instVarNames(); 
};

jst.Behavior.constructor.prototype.hasInstVarNamed_ = function (name){
	return (this._instanceVariables.notNil() && this._instanceVariables.includes_(name)) 
		|| (this.superclass().notNil() && this.superclass().hasInstVarNamed_(name)); 
};

jst.Behavior.constructor.prototype.classVarNames = function(){
	return jst.OrderedCollection._new(); 
};	

jst.Behavior.constructor.prototype.allClassVarNames = function(){
	return this.superclass().allClassVarNames(); 
};	

jst.Behavior.constructor.prototype.hasClassVarNamed_ = function (aSymbol){
	return false;
};

jst.Behavior.constructor.prototype.instanceVariablesString = function() {
	return this.instVarNames().join(" ");
};

jst.Behavior.constructor.prototype.classVariablesString = function() {
	return this.classPool().keys().join(" ");
};

jst.Behavior.constructor.prototype.definitionST80 = function(){
	var result = (this.superclass().notNil()) ? this.superclass().name() : "Object";
	result += " subclass: #" + this.name() + 
		"\n\tinstanceVariableNames: '" + this.instanceVariablesString() + 
		"'\n\tclassVariableNames: '" + this.classVariablesString() + 
		"'\n\tpoolDictionaries: ''\n\tcategory: '" + this._category.name() + "'";
	return result;
};

jst.Behavior.constructor.prototype.superclass = function() {
	if (this == jst.Object)
		return jst.nil;
	else if (this == jst.Object._class)
		return jst.Class;
	else
		return this.__proto__;
};

jst.Behavior.constructor.prototype.inheritsFrom_ = function(aClass) {
	var superclass = this.superclass();
	while (superclass != jst.nil) {
		if (superclass == aClass)
			return true;
		superclass = superclass.superclass();
	};
	return false;
};

jst.Behavior.constructor.prototype.initialize = function(){
	this._methodDict = jst.Dictionary._new();
	this._categories = jst.Dictionary._new();
	return this;
};
	
jst.Behavior.constructor.prototype.basicNew = function(){
	return new this.constructor();
};

jst.Behavior.constructor.prototype._new = function() {
    var obj = this.basicNew();
    if (obj.initialize)
    	obj.initialize();
    return obj;
};

jst.Behavior.constructor.prototype.protocol = function() {
	if (this._thisClass)
		//pro zkompilovane (= javascriptove) metody metatrid
		return this._thisClass;
	else
		//pro zkompilovane (= javascriptove) metody trid
		return this.constructor.prototype;
};

jst.Behavior.constructor.prototype.methodCategories = function(){
	return (this._categories.notNil()) ? this._categories.values() : jst.Array._new();
};

jst.Behavior.constructor.prototype.methodsInCategory_ = function(catName) {
	if (this._categories.isNil())
		return jst.Array._new();
	if (!catName || catName.isNil())
		//vracim vsechny
		return this._methodDict.values();
	var cat = this._categories.at_ifAbsent_(catName);
	return (cat) ? cat.methods() : jst.Array._new();
};

jst.Behavior.constructor.prototype.selectors = function(){
	return this._methodDict.keys();
};

jst.Behavior.constructor.prototype.addMethod = function(selector, args, category, method, name, dateTime, user, versionOnly) {
	//vola se jako funkce addMethod(...) pouze v javascriptu pro doplneni staticky nadefinovane nativni metody,
	//dateTime a user jsou nepovinne  parametry
	//versionOnly oznacuje metodu, ktare se jen ulozi do historie a nebude se kompilovat
	var oldName = jst.Method.__ReservedNames.at_ifAbsent_(selector);
	if (typeof name == "string" && name.length > 0) {
		//if (oldName && oldName != name)
		//	this.error_("Selector #" + selector + " is already mapped to function name '" + oldName + "'.");
		if (!oldName)
			jst.Method.__ReservedNames.at_put_(selector, name);
	};
	if (name && this.canUnderstand_(name))
		this.error_("Cannot use '" + name + "' as alternate name for method #" + selector + ", another method of that name is already defined.");
	var m = method;
	if (method == null)
		m = jst.Method._new();
	else if (typeof method == "string")
		m = jst.Method.__MethodClass.code_(method);
	else if (typeof method == "function") {
		m = jst.Method.code_(method);
	};
	m._receiver = this;
	m._selector = selector;
	m._fnName = name || jst.nil;
	if (args && args.length > 0)
		m._args = args.match(/\w*/g).filter(function(x){return x != "";});
	m.categorize_(category);
	this.installMethod_on_by_(m, dateTime || jst.nil, user || jst.nil);
	if (!versionOnly)
		m.compile();
	return m;
};

jst.Behavior.constructor.prototype.installMethod_on_by_ = function(aMethod, dateTime, user){
	//metoda je prepsana v jst-kernel, zde se dateTime a user ignoruji
	this._methodDict.at_put_(aMethod._selector, aMethod);
	return this;
};

jst.Behavior.constructor.prototype.theMetaClass = function(){
	return this._class;
};

jst.Behavior.constructor.prototype.theNonMetaClass = function(){
	return this;
};

jst.Behavior.constructor.prototype.classSide = function(){
	return this.theMetaClass();
};

jst.Behavior.constructor.prototype.instanceSide = function(){
	return this.theNonMetaClass();
};

jst.Behavior.constructor.prototype.isClassSide = function(){
	return this === this.classSide();
};

jst.Behavior.constructor.prototype.isInstanceSide = function(){
	return !this.isClassSide();
};

jst.Behavior.constructor.prototype.isMeta = function(){
	return this.isClassSide();
};

jst.Behavior.constructor.prototype.isBehavior = function(){
	return true;
};

jst.Behavior.constructor.prototype.includesSelector_ = function (aSymbol){
	return this._methodDict.includesKey_(aSymbol);
};

jst.Behavior.constructor.prototype.canUnderstand_ = function(selector) { 
	return (this.includesSelector_(selector) || 
		(this.superclass() != jst.nil && this.superclass().canUnderstand_(selector)));
};

// Class, part one

jst.Class = {
	_name: "Class",
	_instanceVariables: ["subclasses", "comment", "name", "category", "classPool", "jsFile", "initOrder"]
};

jst.Class.__proto__ = jst.Behavior;

jst.ClassBuilder.createConstructorOn_(jst.Class);

jst.Class.constructor.prototype.name = function() {
	return this._name;
};

jst.Class.constructor.prototype.category = function() {
	return this._category;
};

jst.Class.constructor.prototype.jsFile_ = function(anObject) {
	this._jsFile = anObject;
	return this;
};

jst.Class.constructor.prototype.subclassesDo_ = function (aBlock){
	if (this.hasOwnProperty("_subclasses") && this._subclasses.notNil())
		this._subclasses.valuesDo_(aBlock);
	return this;
};

//nazvy argumentu musi odpovidat smalltalkovske definici metody 
jst.Class.constructor.prototype.subclass = function(t, f, d, s, cat){
	return jst.ClassBuilder._new().subclassOf(this, t, f, d, s, cat);
};

/*
 * navrh samostatne metody , nyni je primo v subclass(...)
jst.Class.constructor.prototype.superclass_ = function (aClass) {
	//changing my superclass
	this.superclass()._subclasses.removeKey_(this._name);
	this.__proto__ = aClass;
	this.constructor.prototype.__proto__ = aClass.constructor.prototype; 
	this._class.__proto__ = aClass._class;
	if (!aClass.hasOwnProperty("_subclasses") || aClass._subclasses.isNil())
		aClass._subclasses = jst.Dictionary._new();
	aClass._subclasses.at_put_(this._name, this);
	return this;
};
jst.Class.addMethod("superclass:", "aClass", "accessing class hierarchy");
*/

jst.Class.constructor.prototype.classPool = function() {
	if (!this.hasOwnProperty("_classPool") || this._classPool.isNil())
		this._classPool = jst.Dictionary._new();
	return this._classPool;
};

jst.Class.constructor.prototype.classVarNames = function() {
	return this.classPool().keys();
};

jst.Class.constructor.prototype.allClassVarNames = function() {
	if (this.superclass().isNil()) 
		return this.classVarNames();
	var names = this.superclass().allClassVarNames();
	names.addAll_(this.classVarNames());
	return names;
};

jst.Class.constructor.prototype.hasClassVarNamed_ = function (aSymbol){
	return (this._classPool && this._classPool.notNil() && this._classPool.includesKey_(aSymbol)) 
		|| (this.superclass().notNil() && this.superclass().hasClassVarNamed_(aSymbol));
};

jst.Class.constructor.prototype.initClassVarNamed_ = function(aSymbol){
	//uzaver bude drzet stale tu tridu, ve ktere je promenna definovana 
	var theClass = this;
	/*this.__defineGetter__("__" + aSymbol, function(){
		return theClass._classPool.at_(aSymbol);
	});
	this.__defineSetter__("__" + aSymbol, function(anObject){
		theClass._classPool.at_put_(aSymbol, anObject);
	});*/
	Object.defineProperty(theClass, "__" + aSymbol, {
		get: function(){
			return theClass._classPool.at_(aSymbol);}, 
		set: function(anObject){
			theClass._classPool.at_put_(aSymbol, anObject);
			return theClass;},
		configurable: true});
	return this;
};

jst.Class.constructor.prototype.classVarNamed_ = function(aString){
	if (this._classPool.notNil() && this._classPool.includesKey_(aString))
		return this._classPool.at_(aString);
	else
		return (this.superclass().notNil()) ? this.superclass().classVarNamed_(aString) : jst.nil; 
};

jst.Class.constructor.prototype.classVarNamed_put_= function(aString, anObject){
	if (this._classPool.notNil() && this._classPool.includesKey_(aString))
		this._classPool.at_put_(aString, anObject);
	else if (this.superclass().notNil())
		this.superclass().classVarNamed_put_(aString, anObject);
	return anObject;
};

jst.Class.constructor.prototype.asJsConstructor = function(){
	//javascript constructor function is used internally, see #basicNew 
	return this.constructor;
};

jst.Class.constructor.prototype.initOrder = function(){
	//order of class initialization in Smalltalk system
	return this._initOrder.ifNil_(0);
};

/*
jst.Class.constructor.prototype.addInstVarName_ = function (aString){
	//Add the argument, aString, as one of the receiver's instance variables
	this.instVarNames().push(aString);
	this.protocol()["_"+aString] = jst.nil;
	return this;
};
*/
jst.Class.constructor.prototype.addInstVarName_ = function (aString){
	//Add the argument, aString, as one of the receiver's instance variables
	this._instanceVariables = this.instVarNames();
	this._instanceVariables.push(aString);
	this.protocol()["_"+aString] = jst.nil;
	return this;
};

jst.Class.templateForSubclassOf_category_ = function(priorClassName, systemCategoryName) {
	return priorClassName + " subclass: #NameOfSubclass" +
		"\n\tinstanceVariableNames: ''" +
		"\n\tclassVariableNames: ''" +
		"\n\tpoolDictionaries: ''" +
		"\n\tcategory: '" + systemCategoryName + "'";
};

jst.Class.template_ = function(aSystemCategoryName) {
	return this.templateForSubclassOf_category_(jst.Object.name(), aSystemCategoryName); 
};

jst.ClassCategory = {
	_name: "ClassCategory"
};

// *** Metaclass ***

jst.Metaclass = {
	_name: "Metaclass",
	allInstances: function() {
		//return this.instances.values();
		var result = jst.OrderedCollection._new();
		jst.Smalltalk.valuesDo_(function(obj){
			if (obj._class && obj._class._thisClass)
				result.add_(obj._class);}
		);
		return result;
	}
	//instances: {}, az dal jako Dictionary
};

jst.Metaclass.__proto__ = jst.Behavior;

jst.ClassBuilder.createConstructorOn_(jst.Metaclass);

//jst.Behavior.__proto__ = jst.Metaclass.constructor.prototype;
jst.Behavior.__proto__ = jst.Object; 

jst.Metaclass.constructor.prototype.name = function() {
	return this._thisClass._name + " class";
};

jst.Metaclass.constructor.prototype.classPool = function(){
	return this._thisClass.classPool();
};

jst.Metaclass.constructor.prototype.instanceVariableNames_ = function(instVarString){
	this._instanceVariables = instVarString.match(/\w*/g).filter(function(x){return x != "";});
	var self = this;
	this._instanceVariables.forEach(function(selector){
		if (!self.protocol()["_"+selector])
			//undefined variables only
			self.protocol()["_"+selector] = jst.nil;
	});	
	if (!jst.currentJsFile.isString())
		//adding to ChangeSet
		jst.currentJsFile.classChanged_(this);
	return this;
}; 

jst.Metaclass.constructor.prototype.definitionST80 = function(){
	return this.name() 
		+ "\n\tinstanceVariableNames: '" 
		+ this.instanceVariablesString() + "'";
};

jst.Metaclass.constructor.prototype.subclassesDo_ = function(aBlock){
	this._thisClass.subclassesDo_(function(c){
		if (!c.isMeta())
			aBlock.value_(c.klass());
	});
	return this;
};

jst.Metaclass.constructor.prototype.classVarNames = function() {
	return this._thisClass.classVarNames();
};

jst.Metaclass.constructor.prototype.allClassVarNames = function() {
	return this._thisClass.allClassVarNames();
};

jst.Metaclass.constructor.prototype.hasClassVarNamed_ = function (aSymbol){
	return this._thisClass.hasClassVarNamed_(aSymbol);
};

jst.Metaclass.constructor.prototype.theMetaClass = function(){
	return this;
};

jst.Metaclass.constructor.prototype.theNonMetaClass = function(){
	return this._thisClass;
};

jst.Metaclass.constructor.prototype.isMeta = function(){
	return true;
};

jst.Metaclass.constructor.prototype.basicNew = function(){
	this.error_("A Metaclass can only have one instance!");
};

//*** Collection ***

jst.Collection = {
	_name: "Collection"
};

jst.Object.__proto__ = jst.Class.constructor.prototype;

jst.ClassBuilder.__proto__ = jst.Object;

jst.ClassCategory.__proto__ = jst.Object;

jst.Collection.__proto__ = jst.Object;  

jst.Dictionary.__proto__ = jst.Collection;

//musi byt prvni
jst.ClassBuilder.createConstructorOn_(jst.Collection, jst.Object._new()); 
//javascriptove pole tedy bude mit vlastnosti kolekce
//Array.prototype.__proto__ = jst.Collection.constructor.prototype;
//bud tady - pak ale Dictionary dedi metody pole - nebo vubec, jinak Dictionary prijde o metody tridy Collection
//jst.Collection.constructor.prototype = Array.prototype; // experimental

jst.ClassBuilder.createConstructorOn_(jst.Dictionary);

//at_put_() se vola jiz v createMetaclass()
jst.Dictionary.constructor.prototype.at_put_ = function(key, anObject) {
	return this._map[key] = anObject;
};

jst.Dictionary.constructor.prototype.initialize = function() {
	this._map = {};
	return this;
};

jst.Dictionary.constructor.prototype.includesKey_ = function(key) {
	return this._map.hasOwnProperty(key);
};

/*
 	if (this._map.hasOwnProperty(key))
		return this._map[key];
	return this.errorKeyNotFound();
 */
jst.Dictionary.constructor.prototype.at_ = function(key) {
	return this.at_ifAbsent_(key, this.errorKeyNotFound);
};

jst.Dictionary.constructor.prototype.at_ifAbsent_ = function(key, aBlock) {
	//in a native javascript code can by used without the second parameter, in that case returns null
	if (this._map.hasOwnProperty(key))
		return this._map[key];
	return (aBlock != null) ? aBlock.value() : null;
};

jst.Dictionary.constructor.prototype.at_ifAbsentPut_ = function(key, aBlock) {
	var self = this;
	return self.at_ifAbsent_(key, function(){
		return self.at_put_(key, aBlock.value());
	});
}; 

jst.Dictionary.constructor.prototype.at_ifPresent_ = function (key,aBlock){
	if (this._map.hasOwnProperty(key))
		return aBlock.value_(this.at_(key));
	return jst.nil;
};

jst.Dictionary.constructor.prototype.removeKey_ifAbsent_ = function(key, aBlock) {
	if (key in this._map) {
		var result = this.at_(key);
		delete this._map[key];
		return result;
	};
	return aBlock.value();
}; 

jst.Dictionary.constructor.prototype.removeKey_ = function(key) {
	return this.removeKey_ifAbsent_(key, this.errorKeyNotFound);
};

//inicializace slovniku

//jst.__proto__ = jst.Dictionary.constructor.prototype;
//jst._map = jst;

jst.categories = jst.Dictionary._new();
//jst.Metaclass.instances = jst.Dictionary._new();

//*** UndefinedObject - part one ***

jst.UndefinedObject = {
	_name: "UndefinedObject"
};
jst.UndefinedObject.__proto__ = jst.Object;
jst.ClassBuilder.createConstructorOn_(jst.UndefinedObject);

jst.UndefinedObject.constructor.prototype.isNil = function() {
	return true;
};

jst.UndefinedObject.constructor.prototype.notNil = function() {
	return false;
};

jst.UndefinedObject.constructor.prototype.ifNil_ = function(nilBlock) {
	return nilBlock.value();
};

jst.UndefinedObject.constructor.prototype.ifNotNil_ = function(notNilBlock) {
	return this;
};

jst.UndefinedObject.constructor.prototype.ifNil_ifNotNil_ = function(nilBlock, notNilBlock) {
	return nilBlock.value();
};

jst.UndefinedObject.constructor.prototype.ifNotNil_ifNil_ = function(notNilBlock, nilBlock) {
	return nilBlock.value();
};

jst.UndefinedObject.constructor.prototype.ifNotNilDo_ = function(aBlock) {
	return this;
};

jst.UndefinedObject.constructor.prototype.ifNil_ifNotNilDo_ = function(nilBlock, aBlock) {
	return nilBlock.value();
};

jst.UndefinedObject.constructor.prototype.ifNotNilDo_ifNil_ = function(aBlock, nilBlock) {
	return nilBlock.value();
};

//jst.nil pouzivam uz v createMetaclassOn_of_(...) a subclass(...)
jst.nil = jst.UndefinedObject._new();

//See jst-debug
jst.thisContext = jst.nil;

//doplnim Metaclass kvuli jst.ClassCategory, ktera teprve nasleduje
jst.ClassBuilder.createMetaclassOn_of_(jst.Object, jst.Metaclass.constructor.prototype);

//zatim kvuli at_ifAbsentPut_ (pouziva #subclass(...)), pozdeji bude nahrazeno prototypem BlockClosure
Function.prototype.__proto__ = {
	value: function() {
		return this.call(this);
	} 	
};

//doplneni zavislosti

jst.Object.subclass(jst.ClassCategory, "name", "", "", "Kernel-Classes");//musi byt prvni

jst.Class.subclass(jst.Object, "", "DependentsFields", "", "Kernel-Objects");
jst.Object.subclass(jst.ClassBuilder, "newClass", "", "", "Kernel-Classes");
jst.Object.subclass(jst.Behavior, null, "", "", "Kernel-Classes");
jst.Behavior.subclass(jst.Class, null, "", "", "Kernel-Classes");
jst.Behavior.subclass(jst.Metaclass, "thisClass", "", "", "Kernel-Classes");

jst.Object.subclass(jst.Collection, "", "", "", "Collections");
jst.Collection.subclass(jst.Dictionary, "map", "", "", "Collections");
jst.Object.subclass(jst.UndefinedObject, "", "", "", "Kernel-Objects");

//mala oprava ;-)
jst.Class._subclasses = jst.Dictionary._new();
jst.Class._subclasses.at_put_(jst.Object._class.name(), jst.Object._class);

// *** MethodCategory ***

jst.MethodCategory = {
	_name: "MethodCategory",
	_classPool: jst.Dictionary._new(),
	initialize: function() {
		//prirazeni do __DefaultName zde jeste nefunguje, musi byt takto
		this._classPool.at_put_("DefaultName", "as yet unclassified");
		return this;
	},
	defaultName: function(){
		return this.__DefaultName;
	}
};

jst.MethodCategory.__proto__ = jst.Object;
//jst.MethodCategory.initialize();

jst.Object.subclass(jst.MethodCategory, "name subject", "DefaultName", "", "Kernel-Methods");

jst.MethodCategory.constructor.prototype.name = function() {
	return this._name;
};

jst.MethodCategory.constructor.prototype.name_ = function(aString) {
	this._name = aString;
	return this;
};

jst.MethodCategory.constructor.prototype.methods = function() {
	//vsechny tridy v dane kategorii
	var self = this;
	var c = jst.OrderedCollection._new();
	this._subject._methodDict.valuesDo_(function(m){
		if (m._category == self)
			c.add_(m);
	});
	return c;
};

// *** MethodVersion ***

jst.Object.subclass("MethodVersion", "code category createdOn createdBy priorVersion jsFile native", "ReservedNames", "", "Kernel-Methods");

jst.MethodVersion.initialize = function() {
	this.__ReservedNames = jst.Dictionary._new();
	return this;
};
jst.MethodVersion.initialize();

jst.MethodVersion.constructor.prototype.jsFile_ = function(anObject) {
	this._jsFile = anObject;
	return this;
};

jst.MethodVersion.constructor.prototype.code = function() {
	return this._code;
};

jst.MethodVersion.constructor.prototype.code_ = function(anObject) {
	this._code = anObject;
	return this;
};

// ***  Method ***

jst.MethodVersion.subclass("Method", "receiver selector fnName args", "MethodClass", "", "Kernel-Methods");

jst.Method.initialize = function() {
	this.__MethodClass = this;
	return this;
};
jst.Method.initialize();

jst.Method.constructor.prototype.categorize_ = function(aString) {
	var catName = (aString || aString != jst.nil) ? aString : jst.MethodCategory.defaultName();
	if (!this._receiver.hasOwnProperty("_categories") || this._receiver._categories.isNil())
		this._receiver._categories = jst.Dictionary._new();
	var oldCat = this._category;
	this._category = this._receiver._categories.at_ifAbsentPut_(catName, 
		function(){return jst.MethodCategory._new();});
	this._category._name = catName;
	this._category._subject = this._receiver;
	//If the method is changed in a browser, jsFile will be set to ChangeSet>>current - see #rebuild
	this.jsFile_(jst.currentJsFile);
	//removing the default category, if it is empty 
	if (oldCat != jst.nil && oldCat._name == jst.MethodCategory.defaultName() && oldCat.methods().isEmpty())
		this._receiver._categories.removeKey_(oldCat._name);
	return this;
};

//compile musi byt definovane pred prvnim volanim addMethod
jst.Method.constructor.prototype.compile = function() {
	if (this._code != jst.nil) {
		this._receiver.protocol()[this.functionName()] = this._code;
		if (this._fnName != jst.nil)
			this._receiver.protocol()[this._fnName] = this._code;
	} 
	else if (this._receiver.protocol()[this.functionName()]) {
		this._code = this._receiver.protocol()[this.functionName()];
		if (this._fnName != jst.nil)
			this._receiver.protocol()[this._fnName] = this._code;
	}
	else if (this._fnName != jst.nil && this._receiver.protocol()[this._fnName]) {
		this._code = this._receiver.protocol()[this._fnName];
		this._receiver.protocol()[this.functionName()] = this._code;
	};
	this._code._method = this;
	return this; 
}; 

jst.Method.selectorToFunctionName_ = function(selector) {
	//var name = this.__ReservedNames.at_ifAbsent_(selector);
	//return (name) ? name : selector.replace(/:/g, "_");
	//return (selector == "new") ? "_new" : selector.replace(/:/g, "_");
	if (selector == "new") 
		return "_new";
	else if (selector == "class")
		return "klass";
	else
		return selector.replace(/:/g, "_");
};

jst.Method.constructor.prototype.functionName = function() {
	return this._class.selectorToFunctionName_(this._selector);
};

// !!! addMethod() cannot be called sooner !!!

jst.MethodVersion.addMethod("code", "", "accessing");
jst.MethodVersion.addMethod("code:", "anObject", "accessing");

jst.Method.addMethod("categorize:", "aString", "accessing");
jst.Method._class.addMethod("selectorToFunctionName:", "selector", "converting");

jst.Method.selectorToJsName_ = function (selector){
	var self = this;
	return this.__ReservedNames.at_ifAbsent_(selector, 
		function(){return self.selectorToFunctionName_(selector);});
};
jst.Method._class.addMethod("selectorToJsName:", "selector", "converting");

jst.Method.addMethod("functionName", "", "accessing");

jst.Method._class.addMethod("initialize", "", "class initialization");
jst.Method.addMethod("compile", "", "compiling");

jst.MethodVersion.addMethod("jsFile:", "anObject", "accessing");

/*
jst.Method.functionNameToSelector_ = function (fnName){
	var name = this.__ReservedNames.keyAtValue_ifAbsent_(fnName, jst.nil);
	return (name != jst.nil) ? name : fnName.replace(/_/g, ":");
}; 
jst.Method._class.addMethod("functionNameToSelector:", "fnName", "converting");
*/
jst.Method.code_ = function(anObject) {
	return this._new().code_(anObject);
};
jst.Method._class.addMethod("code:", "anObject", "instance creation");

/*
jst.Method.reservedNames = function() {
	//musi byt takto, jinak nefunguje v #addMethod volanem v ramci JSTCore
	return jst.Method._classPool.at_("ReservedNames");
};
jst.Method._class.addMethod("reservedNames", "", "accessing");
*/

jst.Method.constructor.prototype.receiver = function (){
	return this._receiver;
};
jst.Method.addMethod("receiver", "", "accessing");

jst.Method.constructor.prototype.selector = function() {
	return this._selector;
};
jst.Method.addMethod("selector", "", "accessing");

jst.Method.constructor.prototype.argumentsSeparatedBy_ = function(sep) {
	return (this._args.notNil()) ? this._args.join(sep) : "";
};
jst.Method.addMethod("argumentsSeparatedBy:", "sep", "printing");

jst.Method.constructor.prototype.asBlock = function (){
	//return this._receiver.protocol()[this.functionName()];
	return this._code;
};
jst.Method.addMethod("asBlock", "", "converting");

jst.Method.constructor.prototype.body = function() {
	return this._code.toString();
}; 
jst.Method.addMethod("body", "", "accessing");

jst.Method.constructor.prototype.printMessagePattern = function() {
	if (!this._args || this._args == jst.nil || this._args.length == 0)
		return this._selector;
	if (this._args.length == 1 && this._selector.indexOf(":") < 0)
		//binary message
		return this._selector + " " + this._args[0];
	var arr = this._selector.split(/:/);
	var result = "";
	for (var i = 0; i < this._args.length; i++)
		result += arr[i] + ": " + this._args[i] + " "; 
	return result;
};
jst.Method.addMethod("printMessagePattern", "", "printing");

jst.Method.constructor.prototype.printSource = function (){
	var fce = this.body();
	//return fce.substring(fce.indexOf("{")+1, fce.lastIndexOf("}"));
	return this.printMessagePattern() + "\nfunction "
		+ ((this._fnName != jst.nil) ? this._fnName : this.functionName())
		+ "(" + ((this._args.isEmptyOrNil()) ? "" : "...") + ") " + fce.substring(fce.indexOf("{")); 
};
jst.Method.addMethod("printSource", "", "printing");

jst.Method.constructor.prototype.isNative = function() {
	return true; 
}; 
jst.Method.addMethod("isNative", "", "testing");

jst.Method.constructor.prototype.isMethod = function() {
	return true; 
};
jst.Method.addMethod("isMethod", "", "testing");

//MethodCategory - metody
jst.MethodCategory.addMethod("name", "", "accessing");
jst.MethodCategory.addMethod("name:", "aString", "accessing");
jst.MethodCategory.addMethod("methods", "", "accessing");

jst.MethodCategory._class.addMethod("initialize", "", "class initialization");
jst.MethodCategory._class.addMethod("defaultName", "", "accessing");

//Object - metody
jst.Object.addMethod("class", "", "accessing", null, "klass");
jst.Object.addMethod("asString", "", "converting");
jst.Object.addMethod("toString", "", "converting");
jst.Object.addMethod("printString", "", "printing");
jst.Object.addMethod("className", "", "system primitives");
jst.Object.addMethod("as:", "aSimilarClass", "converting");
jst.Object.addMethod("value", "", "accessing");
jst.Object.addMethod("adopt:", "jsObject", "converting");

jst.Object.addMethod("name", "", "printing");
jst.Object.addMethod("isKindOf:", "aClass", "testing");
jst.Object.addMethod("isBehavior", "", "testing");
jst.Object.addMethod("isBlock", "", "testing");
jst.Object.addMethod("isString", "", "testing");
jst.Object.addMethod("isSymbol", "", "testing");
jst.Object.addMethod("isNil", "", "testing");
jst.Object.addMethod("notNil", "", "testing");
jst.Object.addMethod("ifNil:", "nilBlock", "testing");
jst.Object.addMethod("ifNotNil:", "notNilBlock", "testing");
jst.Object.addMethod("ifNil:ifNotNil:", "nilBlock notNilBlock", "testing");
jst.Object.addMethod("ifNotNil:ifNil:", "notNilBlock nilBlock", "testing");
jst.Object.addMethod("ifNotNilDo:", "aBlock", "testing");
jst.Object.addMethod("ifNil:ifNotNilDo:", "nilBlock aBlock", "testing");
jst.Object.addMethod("ifNotNilDo:ifNil:", "aBlock nilBlock", "testing");

//jst.Object.addMethod("error", "", "error handling");
jst.Object.addMethod("error:", "aString", "error handling");
jst.Object.addMethod("subclassResponsibility:", "methodName", "error handling");
jst.Object.addMethod("shouldNotImplement", "", "error handling");
jst.Object.addMethod("errorSubscriptBounds:", "index", "error handling");
jst.Object.addMethod("errorKeyNotFound", "", "error handling");

jst.Object.addMethod("perform:", "aSymbol", "message handling");
jst.Object.addMethod("perform:with:", "aSymbol anObject", "message handling");
jst.Object.addMethod("perform:with:with:", "aSymbol firstObject secondObject", "message handling");
jst.Object.addMethod("perform:with:with:with:", "aSymbol firstObject secondObject thirdObject", "message handling");
jst.Object.addMethod("perform:withArguments:", "aSymbol argArray", "message handling");

jst.Object.addMethod("shallowCopy", "", "copying");
jst.Object.addMethod("postCopy", "", "copying");
jst.Object.addMethod("copy", "", "copying");
jst.Object.addMethod("copySameFrom:", "otherObject", "copying");

jst.Object.addMethod("inform:", "aString", "*system");

jst.Object._class.addMethod("newFrom:", "aSimilarObject", "instance creation");
jst.Object._class.addMethod("adopt:", "jsObject", "converting");

jst.Object.constructor.prototype["=="] = function(anObject) {
	//'primitive', do not redefine
	return this === anObject;
};
jst.Object.addMethod("==", "anObject", "comparing");

jst.Object.constructor.prototype["="] = function(anObject) {
	//can be redefined
	return this["=="](anObject);
};
jst.Object.addMethod("=", "anObject", "comparing");

jst.Object.constructor.prototype["~="] = function(anObject) {
	return this["="](anObject) == false;
};
jst.Object.addMethod("~=", "anObject", "comparing");

jst.Object.constructor.prototype.nonlocalReturnOf_ = function(aBlock) {
	//z vnitrku funkce aBlock lze kdykoliv vyskocit zavolanim jst.BlockReturn.result_(...) 
	try {
		return aBlock.call(this);
	} 
	catch (e) {
		if (e.isBlockReturn())
			return e.result();
		//console.log(this);
		throw e;
	};
};
jst.Object.addMethod("nonlocalReturnOf:", "aBlock", "system primitives");

jst.Object.constructor.prototype.yourself = function() {
	return this;
};
jst.Object.addMethod("yourself", "", "accessing");

jst.Object.constructor.prototype.isMethod = function() {
	return false; 
};
jst.Object.addMethod("isMethod", "", "testing");

jst.Object.constructor.prototype.isNumber = function() {
	return false;
};
jst.Object.addMethod("isNumber", "", "testing");
 
jst.Object.constructor.prototype.classOf_ = function (anObject){
	//can be used for testing native objects
	return (anObject != null && anObject._class) ? anObject._class : jst.nil;
};
jst.Object.addMethod("classOf:", "anObject", "system primitives");

jst.Object.constructor.prototype.ifString_ = function () {
	return this;
};
jst.Object.addMethod("ifString:", "aBlock", "testing");

//UndefinedObject - part two

jst.UndefinedObject.addMethod("isNil", "", "testing");
jst.UndefinedObject.addMethod("notNil", "", "testing");
jst.UndefinedObject.addMethod("ifNil:", "nilBlock", "testing");
jst.UndefinedObject.addMethod("ifNotNil:", "notNilBlock", "testing");
jst.UndefinedObject.addMethod("ifNil:ifNotNil:", "nilBlock notNilBlock", "testing");
jst.UndefinedObject.addMethod("ifNotNil:ifNil:", "notNilBlock nilBlock", "testing");
jst.UndefinedObject.addMethod("ifNotNilDo:", "aBlock", "testing");
jst.UndefinedObject.addMethod("ifNil:ifNotNilDo:", "nilBlock aBlock", "testing");
jst.UndefinedObject.addMethod("ifNotNilDo:ifNil:", "aBlock nilBlock", "testing");


jst.UndefinedObject.constructor.prototype["="] = function (anObject){
	//anObject can be a native object too
	return anObject == null || anObject === jst.nil;
};
jst.UndefinedObject.addMethod("=", "anObject", "comparing");

jst.UndefinedObject.constructor.prototype.printString = function(){
	return "nil";
};
jst.UndefinedObject.addMethod("printString", "", "printing");

jst.UndefinedObject.constructor.prototype.shallowCopy = function() {
	//Only one instance of UndefinedObject should ever be made, so answer with self
	return this;
};
jst.UndefinedObject.addMethod("shallowCopy", "", "copying");

jst.UndefinedObject.constructor.prototype.isEmptyOrNil = function() {
	return true;
};
jst.UndefinedObject.addMethod("isEmptyOrNil", "", "testing");

//Behavior - metody
jst.Behavior.addMethod("printString", "", "printing");
jst.Behavior.addMethod("subclasses", "", "accessing class hierarchy");
jst.Behavior.addMethod("allSubclasses", "", "accessing class hierarchy");
jst.Behavior.addMethod("allSubclassesDo:", "aBlock", "enumerating");
jst.Behavior.addMethod("superclass", "", "accessing class hierarchy");
jst.Behavior.addMethod("instVarNames", "", "accessing instances and variables");
jst.Behavior.addMethod("allInstVarNames", "", "accessing instances and variables");
jst.Behavior.addMethod("hasInstVarNamed:", "name", "accessing instances and variables"); 
jst.Behavior.addMethod("classVarNames", "", "accessing instances and variables");
jst.Behavior.addMethod("allClassVarNames", "", "accessing instances and variables");
jst.Behavior.addMethod("hasClassVarNamed:", "aSymbol", "accessing instances and variables"); 
jst.Behavior.addMethod("selectors", "", "accessing method dictionary");
jst.Behavior.addMethod("methodDict", "", "accessing method dictionary");
jst.Behavior.addMethod("instanceVariablesString", "", "printing");
jst.Behavior.addMethod("classVariablesString", "", "printing");
jst.Behavior.addMethod("definitionST80", "", "fileIn/Out");
jst.Behavior.addMethod("methodCategories", "", "accessing");
jst.Behavior.addMethod("methodsInCategory:", "catName", "accessing");
jst.Behavior.addMethod("protocol", "", "accessing");
jst.Behavior.addMethod("initialize", "", "initialize-release");
jst.Behavior.addMethod("basicNew", "", "instance creation");
jst.Behavior.addMethod("new", "", "instance creation"); //, null, "_new");
jst.Behavior.addMethod("addSelector:withArguments:categorize:method:mapTo:on:by:", 
	"selector args category method name dateTime user", "adding/removing methods", null, "addMethod");
jst.Behavior.addMethod("installMethod:on:by:", "aMethod dateTime user", "adding/removing methods");
jst.Behavior.addMethod("theMetaClass", "", "accessing parallel hierarchy");
jst.Behavior.addMethod("theNonMetaClass", "", "accessing parallel hierarchy");
jst.Behavior.addMethod("isBehavior", "", "testing");
jst.Behavior.addMethod("inheritsFrom:", "aClass", "testing");
jst.Behavior.addMethod("isMeta", "", "accessing parallel hierarchy");
jst.Behavior.addMethod("classSide", "", "accessing parallel hierarchy");
jst.Behavior.addMethod("instanceSide", "", "accessing parallel hierarchy");
jst.Behavior.addMethod("isClassSide", "", "accessing parallel hierarchy");
jst.Behavior.addMethod("isInstanceSide", "", "accessing parallel hierarchy");
jst.Behavior.addMethod("includesSelector:", "aSymbol", "testing method dictionary");
jst.Behavior.addMethod("canUnderstand:", "selector", "testing method dictionary");

//Class - metody
jst.Class.addMethod("name", "", "accessing");
jst.Class.addMethod("category", "", "accessing");
jst.Class.addMethod("jsFile:", "anObject", "accessing");
jst.Class.addMethod("classPool", "", "accessing");
jst.Class.addMethod("initClassVarNamed:", "aSymbol", "private");
jst.Class.addMethod("initOrder", "", "private");
jst.Class.addMethod("classVarNames", "", "class variables");
jst.Class.addMethod("allClassVarNames", "", "class variables");
jst.Class.addMethod("hasClassVarNamed:", "aSymbol", "class variables");
jst.Class.addMethod("classVarNamed:", "aString", "class variables");
jst.Class.addMethod("classVarNamed:put:", "aString anObject", "class variables");
jst.Class.addMethod("addInstVarName:", "aString", "instance variables");
jst.Class.addMethod("subclassesDo:", "aBlock", "accessing class hierarchy");
jst.Class.addMethod("asJsConstructor", "", "converting");
jst.Class.addMethod(
	"subclass:instanceVariableNames:classVariableNames:poolDictionaries:category:", 
	"t f d s cat", "subclass creation", null, "subclass");
jst.Class._class.addMethod("templateForSubclassOf:category:", "priorClassName systemCategoryName", "instance creation");
jst.Class._class.addMethod("template:", "aSystemCategoryName", "instance creation");

//Metaclass - metody
jst.Metaclass.addMethod("name", "", "accessing");
jst.Metaclass.addMethod("classPool", "", "accessing");
jst.Metaclass.addMethod("instanceVariableNames:", "instVarString", "accessing");
jst.Metaclass.addMethod("definitionST80", "", "fileIn/Out");
jst.Metaclass.addMethod("subclassesDo:", "aBlock", "class hierarchy");
jst.Metaclass.addMethod("classVarNames", "", "class variables");
jst.Metaclass.addMethod("allClassVarNames", "", "class variables");
jst.Metaclass.addMethod("hasClassVarNamed:", "aSymbol", "class variables");
jst.Metaclass.addMethod("theMetaClass", "", "accessing parallel hierarchy");
jst.Metaclass.addMethod("theNonMetaClass", "", "accessing parallel hierarchy");
jst.Metaclass.addMethod("isMeta", "", "accessing parallel hierarchy");
jst.Metaclass.addMethod("basicNew", "", "instance creation");

jst.Metaclass._class.addMethod("allInstances", "", "accessing");

//ClassCategory

jst.ClassCategory.constructor.prototype.name_ = function(aString) {
	this._name = aString;
	return this;
};
jst.ClassCategory.addMethod("name:", "aString", "accessing");

jst.ClassCategory.constructor.prototype.name = function() {
	return this._name;
};
jst.ClassCategory.addMethod("name", "", "accessing");

jst.ClassCategory.constructor.prototype.classes = function() {
	//vsechny tridy v dane kategorii
	var self = this;
	var c = jst.OrderedCollection._new();
	jst.Smalltalk.valuesDo_(function(cl){
		if (cl._category == self)
			c.add_(cl);
	});
	return c;
};
jst.ClassCategory.addMethod("classes", "", "accessing");

//ClassBuilder
jst.ClassBuilder._class.addMethod("createConstructorOn:", "aClass", "private");
jst.ClassBuilder._class.addMethod("createMetaclassOn:of:", "aClass superMetaclass", "private");

jst.ClassBuilder.addMethod("initializeClass", "", "private");
jst.ClassBuilder.addMethod("initClassVars:", "aString", "private");
jst.ClassBuilder.addMethod("createClass:subclassOf:", "className superclass", "private");
jst.ClassBuilder.addMethod(
	"superclass:subclass:instanceVariableNames:classVariableNames:poolDictionaries:category:", 
	"newSuper t f d s cat", "public", null, "subclassOf");
jst.ClassBuilder.addMethod("tooDangerousClasses", "", "private");

//*** Exception ***

jst.Object.subclass("Error", "messageText receiver", "", "", "Exceptions-Kernel");

Error.prototype.__proto__ = jst.Error.constructor.prototype;
//jst.Error.constructor.prototype = Error.prototype; // nelze pouzit, chybova hlaseni se pak poskodi!!!

jst.Error.signal_on_ = function(signalerText, anObject){
	return this._new().receiver_(anObject).signal_(signalerText);
};
jst.Error._class.addMethod("signal:on:", "signalerText anObject", "exceptionInstantiator");

jst.Error.signalOn_ = function(anObject){
	return this._new().receiver_(anObject).signal();
};
jst.Error._class.addMethod("signalOn:", "anObject", "exceptionInstantiator");

jst.Error.constructor.prototype.signal_ = function(signalerText){
	this._messageText = signalerText;
	this.signal();
};
jst.Error.addMethod("signal:", "signalerText", "signaling");

jst.Error.constructor.prototype.signal = function(){
	//console.log(jst.currentJsFile);
	throw this;
};
jst.Error.addMethod("signal", "", "signaling");

jst.Error.constructor.prototype.description = function(){
	return (this._messageText != jst.nil) ? this.className() + ": " + this._messageText : this.className();
};
jst.Error.addMethod("description", "", "printing");

jst.Error.constructor.prototype.messageText = function(){
	return this._messageText.ifNil_("Error");
};
jst.Error.addMethod("messageText", "", "accessing");

jst.Error.constructor.prototype.messageText_ = function(aString){
	this._messageText = aString;
	return this;
};
jst.Error.addMethod("messageText:", "aString", "accessing");

jst.Error.constructor.prototype.receiver = function(){
	return this._receiver;
};
jst.Error.addMethod("receiver", "", "accessing");

jst.Error.constructor.prototype.receiver_ = function(anObject){
	this._receiver = anObject;
	return this;
};
jst.Error.addMethod("receiver:", "anObject", "accessing");

jst.Error.constructor.prototype.printString = function(){
	return this.description();
};
jst.Error.addMethod("printString", "", "printing");

jst.Error.constructor.prototype.isBlockReturn = function(){
	return false;
};
jst.Error.addMethod("isBlockReturn", "", "testing");

jst.Error.constructor.prototype.wrap_ = function (exception){
	this._messageText = exception.message;
	return this;
};
jst.Error.addMethod("wrap:", "exception", "accessing");

jst.Error.wrap_ = function (exception){
	return this._new().wrap_(exception);
};
jst.Error._class.addMethod("wrap:", "exception", "instance creation");

//*** BlockEvaluatingError ***

jst.Error.subclass("BlockEvaluatingError", "", "", "", "Exceptions-Kernel");
/*
jst.BlockEvaluatingError.block_calledWith_ = function(aBlock, numArgs){
	console.log("Warning: the block accepts {1} argument{2}, but was called with {3}:\n".format_(
		[aBlock.numArgs(), (aBlock.numArgs() == 1) ? "" : "s", numArgs]), aBlock.printString());
};
jst.BlockEvaluatingError._class.addMethod("block:calledWith:", "aBlock numArgs", "instance creation");
*/
jst.BlockEvaluatingError.block_evaluatedBy_with_ = function(aBlock, aSymbol, args){
	console.log("Warning: the block accepts {1} argument{2}, but was called with {3}:\n".format_(
		[aBlock.numArgs(), (aBlock.numArgs() == 1) ? "" : "s", args.length]), aBlock.printString());
	if (args.length > 0) {
		console.log("arguments:");
		console.log(args);
	};
};
jst.BlockEvaluatingError._class.addMethod("block:evaluatedBy:with:", "aBlock aSymbol args", "instance creation");

//*** BlockClosure ***

jst.BlockClosure = {
	_name: "BlockClosure"
};

jst.BlockClosure.__proto__ = jst.Object;

jst.Object.subclass(jst.BlockClosure, "method", "", "", "Kernel-Methods");

Function.prototype.__proto__ = jst.BlockClosure.constructor.prototype;
 jst.BlockClosure.constructor.prototype = Function.prototype; // experimental

jst.BlockClosure.constructor.prototype.value = function() { 
	if (this.length > 0)
		//jst.BlockEvaluatingError.block_calledWith_(this, arguments.length);
		jst.BlockEvaluatingError.block_evaluatedBy_with_(this, "value", []);
	return this.call(this); 
};
jst.BlockClosure.addMethod("value", "", "evaluating");

jst.BlockClosure.constructor.prototype.value_ = function(arg1) { 
	if (this.length != 1)
		//jst.BlockEvaluatingError.block_calledWith_(this, arguments.length);
		jst.BlockEvaluatingError.block_evaluatedBy_with_(this, "value:", [arg1]);
	return this.call(this, arg1); 
};
jst.BlockClosure.addMethod("value:", "arg1", "evaluating");

jst.BlockClosure.constructor.prototype.value_value_ = function(arg1, arg2) { 
	if (this.length != 2)
		//jst.BlockEvaluatingError.block_calledWith_(this, arguments.length);
		jst.BlockEvaluatingError.block_evaluatedBy_with_(this, "value:value:", [arg1, arg2]);
	return this.call(this, arg1, arg2); 
};
jst.BlockClosure.addMethod("value:value:", "arg1 arg2", "evaluating");

jst.BlockClosure.constructor.prototype.value_value_value_ = function(arg1, arg2, arg3) { 
	if (this.length != 3)
		//jst.BlockEvaluatingError.block_calledWith_(this, arguments.length);
		jst.BlockEvaluatingError.block_evaluatedBy_with_(this, "value:value:value:", [arg1, arg2, arg3]);
	return this.call(this, arg1, arg2, arg3); 
};
jst.BlockClosure.addMethod("value:value:value:", "arg1 arg2 arg3", "evaluating");

jst.BlockClosure.constructor.prototype.value_value_value_value_ = function(arg1, arg2, arg3, arg4) { 
	if (this.length != 4)
		//jst.BlockEvaluatingError.block_calledWith_(this, arguments.length);
		jst.BlockEvaluatingError.block_evaluatedBy_with_(this, "value:value:value:value:", [arg1, arg2, arg3, arg4]);
	return this.call(this, arg1, arg2, arg3, arg4); 
};
jst.BlockClosure.addMethod("value:value:value:value:", "arg1 arg2 arg3 arg4", "evaluating");

jst.BlockClosure.constructor.prototype.valueWithPossibleArgs_ = function(anArray) {
	return this.apply(this, anArray);
};
jst.BlockClosure.addMethod("valueWithPossibleArgs:", "anArray", "evaluating");

jst.BlockClosure.constructor.prototype.valueWithPossibleArgument_ = function(anArg) {
	return this.call(this, anArg);
};
jst.BlockClosure.addMethod("valueWithPossibleArgument:", "anArg", "evaluating");

//zajimave - zalezi zde na poradi, jinak se nasledujici kategorie metod neobjevi v browseru 
jst.BlockClosure.basicNew = function() {
	return function(){return jst.nil;};
};
jst.BlockClosure._class.addMethod("basicNew", "", "instance creation");

jst.BlockClosure.constructor.prototype.isBlock = function() { 
	return true; 
};
jst.BlockClosure.addMethod("isBlock", "", "testing");

jst.BlockClosure.constructor.prototype.whileTrue_ = function(aBlock) {
	while (this.call(this) == true)
		aBlock.value();
	return jst.nil;
};
jst.BlockClosure.addMethod("whileTrue:", "aBlock", "controlling");

jst.BlockClosure.constructor.prototype.whileTrue = function() {
	while (this.call(this) == true)
		;
	return jst.nil;
};
jst.BlockClosure.addMethod("whileTrue", "", "controlling");

jst.BlockClosure.constructor.prototype.doWhileTrue_ = function(conditionBlock) {
	var result = this.call(this);
	while (conditionBlock() == true)
		result = this.call(this);
	return result;
};
jst.BlockClosure.addMethod("doWhileTrue:", "conditionBlock", "controlling");

jst.BlockClosure.constructor.prototype.whileFalse_ = function(aBlock) {
	while (this.call(this) == false)
		aBlock.value();
	return jst.nil;
};
jst.BlockClosure.addMethod("whileFalse:", "aBlock", "controlling");

jst.BlockClosure.constructor.prototype.whileFalse = function() {
	while (this.call(this) == false)
		;
	return jst.nil;
};
jst.BlockClosure.addMethod("whileFalse", "", "controlling");

jst.BlockClosure.constructor.prototype.doWhileFalse_ = function(conditionBlock) {
	var result = this.call(this);
	while (conditionBlock() == false)
		result = this.call(this);
	return result;
};
jst.BlockClosure.addMethod("doWhileFalse:", "conditionBlock", "controlling");

jst.BlockClosure.constructor.prototype.numArgs = function() { 
	return this.length; 
};
jst.BlockClosure.addMethod("numArgs", "", "accessing");

jst.BlockClosure.constructor.prototype.asBlock = function() {
	return this;
};
jst.BlockClosure.addMethod("asBlock", "", "converting"); 

jst.BlockClosure.constructor.prototype.shallowCopy = function (){
	//Better implementation?
	return eval("(" + this.toString() + ")");
};
jst.BlockClosure.addMethod("shallowCopy", "", "copying");

jst.BlockClosure.constructor.prototype.on_do_ = function(exception, handlerAction){
	try {
		return this.value();
	}
	catch(ex) {
		if (!ex.message && ex instanceof exception.constructor)
			//JSmalltalk error
			return handlerAction.value_(ex);
		else if (exception == jst.Error  && ex instanceof Error)
			//Javascript error
			return handlerAction.value_(jst.Error.wrap_(ex));
		throw ex;
	}
};
jst.BlockClosure.addMethod("on:do:", "exception handlerAction", "exceptions");
		
//*** Dictionary - part two ***

jst.Dictionary.addMethod("includesKey:", "key", "testing");
jst.Dictionary.addMethod("at:", "key", "accessing");
jst.Dictionary.addMethod("at:ifAbsent:", "key aBlock", "accessing");
jst.Dictionary.addMethod("at:ifAbsentPut:", "key aBlock", "accessing");
jst.Dictionary.addMethod("at:ifPresent:", "key aBlock", "accessing");
jst.Dictionary.addMethod("at:put:", "key anObject", "accessing");
jst.Dictionary.addMethod("removeKey:ifAbsent:", "key aBlock", "removing");
jst.Dictionary.addMethod("removeKey:", "key", "removing");
jst.Dictionary.addMethod("initialize", "", "initialization");

jst.Dictionary.constructor.prototype.keysAndValuesDo_ = function(aBlock) {
	for (var key in this._map) {
		aBlock.value_value_(key, this._map[key]);
	};
	return this;
};
jst.Dictionary.addMethod("keysAndValuesDo:", "aBlock", "enumerating");

jst.Dictionary.constructor.prototype.keyAtValue_ifAbsent_ = function (value,exceptionBlock){
	for (var key in this._map) {
		if (jst.sndw(value, "=", this._map[key])) 
			return key;
	};
	return jst.snd(exceptionBlock,"value");
};
jst.Dictionary.addMethod("keyAtValue:ifAbsent:", "value exceptionBlock", "accessing"); 
/*
jst.Dictionary.constructor.prototype.keysDo_ = function(aBlock) {
	for (var key in this._map) {
		aBlock.value_(key);
	};
	return this;
};
*/
jst.Dictionary.constructor.prototype.keysDo_ = function(aBlock) {
	return this.keysAndValuesDo_(function(key, value){
		aBlock.value_(key);
	});
};
jst.Dictionary.addMethod("keysDo:", "aBlock", "enumerating");

jst.Dictionary.constructor.prototype.keys = function() {
	var c = jst.OrderedCollection._new();
	this.keysAndValuesDo_(function(key, value){c.add_(key);});
	return c;
};
jst.Dictionary.addMethod("keys", "", "accessing");

jst.Dictionary.constructor.prototype.valuesDo_ = function(aBlock) {
	return this.keysAndValuesDo_(function(key, value){
		aBlock.value_(value);
	});
};
jst.Dictionary.addMethod("valuesDo:", "aBlock", "enumerating");

jst.Dictionary.constructor.prototype.values = function() {
	var c = jst.OrderedCollection._new();
	this.keysAndValuesDo_(function(key, value){
		c.add_(value);
	});
	return c;
};
jst.Dictionary.addMethod("values", "", "accessing");

//*** SystemDictionary ***

jst.Dictionary.subclass("SystemDictionary", "", "", "", "System"); //System-Support

//jst.Smalltalk = jst.SystemDictionary._new();
//jst.Smalltalk._map = jst;

//jst.Smalltalk._name = "Smalltalk";

jst.SystemDictionary.initialize = function (){
	jst.Smalltalk = this._new();
	jst.Smalltalk._map = jst;
	return this;
};
jst.SystemDictionary._class.addMethod("initialize", "", "class initialization");

jst.SystemDictionary.initialize();

jst.SystemDictionary.constructor.prototype.classNamed_ = function(className) {
	var meta = (className.length > 6 && className.lastIndexOf(" class") == className.length-6);
	var baseName = (meta) ? className.substring(0, className.length-6) : className;
	var baseClass = jst[baseName];
	if (!baseClass)
		return jst.nil;
	return (meta) ? baseClass.klass() : baseClass;
};

jst.SystemDictionary.addMethod("classNamed:", "className", "class names");

// *** BlockReturn ***

jst.Error.subclass("BlockReturn", "", "", "", "Exceptions-Kernel");

jst.BlockReturn.result_ = function(anObject){
	return this.signalOn_(anObject);
};
jst.BlockReturn._class.addMethod("result:", "anObject", "instance creation");

jst.BlockReturn.constructor.prototype.result = function(){
	return this._receiver;
};
jst.BlockReturn.addMethod("result", "", "accessing");

jst.BlockReturn.constructor.prototype.isBlockReturn = function(){
	return true;
};
jst.BlockReturn.addMethod("isBlockReturn", "", "testing");

// *** Collection - dokonceni ***
/*
//doplneni nativnich Array (mimo sort a tech, ktere modifikuji pole)
["concat", "every", "filter", "forEach", "indexOf", "join", 
 "lastIndexOf", "map", "reduce", "reduceRight", 
 "reverse", "some"].forEach(function(key) {
	jst.Collection.constructor.prototype[key] = Array.prototype[key];
});
*/

jst.Collection.constructor.prototype.copyWith_ = function(newElement) {
	var result = this.copy();
	result.push(newElement); //funguje i pro pole
	return result;
};
jst.Collection.addMethod("copyWith:", "newElement", "copying");

jst.Collection.constructor.prototype.do_ = function(aBlock){
	//A core method #1
	this.subclassResponsibility_("do:");
};
jst.Collection.addMethod("do:", "aBlock", "enumerating");

jst.Collection.constructor.prototype.detect_ifNone_ = function(aBlock, exceptionBlock){
	//A core method #2, is used for implementing anySatisfy, allSatisfy, noneSatisfy 
	this.subclassResponsibility_("detect:ifNone:");
};
jst.Collection.addMethod("detect:ifNone:", "aBlock exceptionBlock", "enumerating");

jst.Collection.constructor.prototype.add_ = function(anObject) {
	this.subclassResponsibility_("add:");
};
jst.Collection.addMethod("add:", "anObject", "adding");

jst.Collection.constructor.prototype.remove_ifAbsent_ = function(oldObject, anExceptionBlock) {
	//neimplementuje, protoze nesmi fungovat pro Array nebo String
	this.subclassResponsibility_("remove:ifAbsent:");	
};
jst.Collection.addMethod("remove:ifAbsent:", "oldObject anExceptionBlock", "removing"); 

jst.Collection.constructor.prototype.addAll_ = function(aCollection){
	var self = this;
	jst.sndw(aCollection, "do_", function(obj){
		self.add_(obj);
	});
	return aCollection;
};
jst.Collection.addMethod("addAll:", "aCollection", "adding");

jst.Collection.constructor.prototype.size = function(){
	var tally = 0;
	this.do_(function(each){tally += 1;});
	return tally;
};
jst.Collection.addMethod("size", "", "accessing");

jst.Collection.constructor.prototype.anySatisfy_ = function(aBlock){
	/*Evaluate aBlock with the elements of the receiver.
	  If aBlock returns true for any element return true.
	  Otherwise return false.*/
	var none = jst.Object.basicNew();
	return this.detect_ifNone_(aBlock, none) !== none;
};
jst.Collection.addMethod("anySatisfy:", "aBlock", "enumerating");

jst.Collection.constructor.prototype.includes_ = function(anObject){
	//pouziva anySatisfy, aby fungovala i v podtridach
	return this.anySatisfy_(function(obj){return jst.sndw(obj, "=", anObject);});
};
jst.Collection.addMethod("includes:", "anObject", "testing");

jst.Collection.constructor.prototype.asSortedCollection = function() {
	//Answer a SortedCollection whose elements are the elements of the receiver. The sort order is the default less than or equal.
	return this.as_(jst.SortedCollection);
};
jst.Collection.addMethod("asSortedCollection", "", "converting");

jst.Collection.constructor.prototype.asSortedCollection_ = function(aSortBlock) {
	var c = jst.SortedCollection.sortBlock_(aSortBlock);
	c.addAll_(this);
	return c;
};
jst.Collection.addMethod("asSortedCollection:", "aSortBlock", "converting");

jst.Collection.constructor.prototype.isEmpty = function() {
	return this.size() == 0;
};
jst.Collection.addMethod("isEmpty", "", "testing");

jst.Collection.constructor.prototype.isEmptyOrNil = function() {
	return this.isEmpty();
};
jst.Collection.addMethod("isEmptyOrNil", "", "testing");

// *** SequenceableCollection ***

jst.Collection.subclass("SequenceableCollection", "", "", "", "Collections");

jst.SequenceableCollection.adopt_ = function(jsArray) {
	//Use it only for javascript arrays
	var proto = this.constructor.prototype;
	var setProto = function(arr) {
		arr.__proto__ = proto;
		arr.do_(function(i){
			if (i instanceof Array)
				setProto(i);
		});
	};
	setProto(jsArray);
	return jsArray;
};
jst.SequenceableCollection._class.addMethod("adopt:", "jsArray", "instance creation");

/*
jst.SequenceableCollection.constructor.prototype.do_ = function(aBlock){
	//mimo String
	this.forEach(aBlock);
	return this;
};
*/
jst.SequenceableCollection.constructor.prototype.do_ = function (aBlock){
	if (this.forEach) {
		this.forEach(aBlock);
		return this;
	};
	for (var i = 1; i <= this.size(); i++)
		aBlock.value_(this.at_(i));
	return this.yourself(); //String needs yourself
};
jst.SequenceableCollection.addMethod("do:", "aBlock", "enumerating");

jst.SequenceableCollection.constructor.prototype.detect_ifNone_ = function(aBlock, exceptionBlock){
	for (var i = 1; i <= this.size(); i++)
		if (aBlock.value_(this.at_(i)) == true)
			return this.at_(i);
	return exceptionBlock.value();
};
jst.SequenceableCollection.addMethod("detect:ifNone:", "aBlock exceptionBlock", "enumerating");

jst.SequenceableCollection.constructor.prototype.withIndexDo_ = function(elementAndIndexBlock){
	for (var i = 1; i <= this.size(); i++)
		elementAndIndexBlock(this.at_(i), i);
	return this.yourself(); //String needs yourself
}; 
jst.SequenceableCollection.addMethod("withIndexDo:", "elementAndIndexBlock", "enumerating");

jst.SequenceableCollection.constructor.prototype.startsWith_ = function(start){
	if (this.size() < start.size() || start.size() == 0) 
		return false;	
	for (var i = 1; i <= start.size(); i++)
		//if (this.at_(i) != start.at_(i))
		if (jst.sndw(this.at_(i), "=", start.at_(i)) == false)
			return false;
	return true;
}; 
jst.SequenceableCollection.addMethod("startsWith:", "start", "testing");

jst.SequenceableCollection.constructor.prototype.size = function(){
	return this.length;
};
jst.SequenceableCollection.addMethod("size", "", "accessing");

jst.SequenceableCollection.constructor.prototype.first = function(){
	return this.at_(1);
};
jst.SequenceableCollection.addMethod("first", "", "accessing");

jst.SequenceableCollection.constructor.prototype.last = function(){
	return this.at_(this.size());
};
jst.SequenceableCollection.addMethod("last", "", "accessing");

jst.SequenceableCollection.constructor.prototype.at_ = function (index){
	//return this[index-1]; 2013-10-14
	return (index > 0 && index <= this.length) ? this[index-1] : this.errorSubscriptBounds_(index);
};
jst.SequenceableCollection.addMethod("at:", "index", "accessing");

jst.SequenceableCollection.constructor.prototype.at_ifAbsent_ = function(index, exceptionBlock) {
	if (index > 0 && index <= this.size())
		return this.at_(index);
	return (exceptionBlock != null) ? exceptionBlock.value() : null;
};
jst.SequenceableCollection.addMethod("at:ifAbsent:", "index exceptionBlock", "accessing");

jst.SequenceableCollection.constructor.prototype.indexOf_startingAt_ifAbsent_ = function(anElement, start, exceptionBlock){
	var i = this.indexOf(anElement, start-1);
	return (i >= 0) ? i+1 : jst.snd(exceptionBlock,"value");
};
jst.SequenceableCollection.addMethod("indexOf:startingAt:ifAbsent:", "anElement start exceptionBlock", "accessing"); 

jst.SequenceableCollection.constructor.prototype.indexOf_ = function(anElement){
	return this.indexOf_startingAt_ifAbsent_(anElement, 1, 0);
};
jst.SequenceableCollection.addMethod("indexOf:", "anElement", "accessing");

//tady nefunguje
//jst.SequenceableCollection.addMethod("reversed", "", "converting", null, "reverse");

// *** Array ***

Array.prototype.toString = jst.Object.constructor.prototype.toString;

Array.prototype.__proto__ = jst.SequenceableCollection.constructor.prototype;

jst.Array = {
	_name: "Array"
};
jst.Array.__proto__ = jst.SequenceableCollection;

jst.ClassBuilder.createConstructorOn_(jst.Array, Array.prototype);

jst.SequenceableCollection.subclass(jst.Array, "", "", "", "Collections");

jst.Array.basicNew = function() {
	return this.adopt_([]);
};
jst.Array._class.addMethod("basicNew", "", "instance creation");

jst.Array.addMethod("reversed", "", "converting", null, "reverse");

jst.Array.constructor.prototype.anySatisfy_ = function(aBlock){
	//uses a native function
	return this.some(aBlock);
};
jst.Array.addMethod("anySatisfy:", "aBlock", "enumerating");

/* 
jst.Array.constructor.prototype.toString = function(){
	//replaces native function as equivakent of asString
	return this.asString();
};
jst.Array.addMethod("toString", "", "converting");
*/

//*** OrderedCollection ***

jst.OrderedCollection = {
	_name: "OrderedCollection"
};
jst.OrderedCollection.__proto__ = jst.SequenceableCollection;

jst.ClassBuilder.createConstructorOn_(jst.OrderedCollection, Array.prototype);

jst.SequenceableCollection.subclass(jst.OrderedCollection, "", "", "", "Collections");

/*
//doplneni nativnich funkci modifikujich kolekci
["pop", "push", "remove", "shift", "slice", "splice", "unshift"].forEach(function(key) {
	jst.OrderedCollection.constructor.prototype[key] = Array.prototype[key];
});
*/
/*
jst.OrderedCollection.constructor.prototype.toString = function(){
	//replaces native function as equivalent of asString
	return this.asString();
};
jst.OrderedCollection.addMethod("toString", "", "converting");
*/
jst.OrderedCollection.basicNew = function() {
	return this.adopt_([]);
};
jst.OrderedCollection._class.addMethod("basicNew", "", "instance creation");

jst.OrderedCollection.newFrom_ = function(aCollection) { 
	//Answer an instance of me containing the same elements as aCollection.
	var c = this._new();
	c.addAll_(aCollection);
	return c;
};
jst.OrderedCollection._class.addMethod("newFrom:", "aCollection", "instance creation");


jst.OrderedCollection.constructor.prototype.addLast_ = function(anObject) {
	this.push(anObject); //push returns the new length of the array instead of an object
	return anObject;
};
jst.OrderedCollection.addMethod("addLast:", "anObject", "adding");

jst.OrderedCollection.constructor.prototype.add_ = function(anObject) {
	return this.addLast_(anObject);
};
jst.OrderedCollection.addMethod("add:", "anObject", "adding");
/*
jst.OrderedCollection.constructor.prototype.removeLast = function() {
	return this.pop();
};*/
jst.OrderedCollection.addMethod("removeLast", "", "removing", null, "pop");

jst.OrderedCollection.addMethod("reversed", "", "converting", null, "reverse");

jst.OrderedCollection.constructor.prototype.anySatisfy_ = function(aBlock){
	//uses a native function
	return this.some(aBlock);
};
jst.OrderedCollection.addMethod("anySatisfy:", "aBlock", "enumerating");


//*** SortedCollection ***

jst.OrderedCollection.subclass("SortedCollection", "sortBlock", "", "", "Collections");
/*
//doplneni nativni funkce sort
["sort"].forEach(function(key) {
	jst.SortedCollection.constructor.prototype[key] = Array.prototype[key];
});
*/
jst.SortedCollection.sortBlock_ = function(aBlock) {
	var c = this._new();
	c._sortBlock = aBlock;
	return c;
};
jst.SortedCollection._class.addMethod("sortBlock:", "aBlock", "instance creation");

jst.SortedCollection.constructor.prototype.reSort = function(){
	//function sort() needs -1, 0 or 1 as the result
	if (this._sortBlock.notNil()) {
		var self = this;
		this.sort(function(a, b) {
			return (self._sortBlock.value_value_(a, b) == true) ? -1 : 1;});
	} else
		this.sort(function(a, b) {
			return (a["<="](b) == true) ? -1 : 1;});
	return this;
};
jst.SortedCollection.addMethod("reSort", "", "private");

jst.SortedCollection.constructor.prototype.add_ = function(anObject) {
	this.addLast_(anObject);
	this.reSort();
	return anObject;
};
jst.SortedCollection.addMethod("add:", "anObject", "adding");

jst.SortedCollection.constructor.prototype.addAll_ = function(aCollection){
	var self = this;
	jst.sndw(aCollection, "do_", function(obj){
		self.addLast_(obj);
	});
	this.reSort();
	return aCollection;
};
jst.SortedCollection.addMethod("addAll:", "aCollection", "adding");

//*** String ***

jst.SequenceableCollection.subclass("String", "", "", "", "Collections");

String.prototype.__proto__ = jst.String.constructor.prototype;
jst.String.constructor.prototype = String.prototype; // experimental

jst.String.basicNew = function() {
	return "";
};
jst.String._class.addMethod("basicNew", "", "instance creation");

jst.String.constructor.prototype.asString = function() { 
	return this.toString(); 
};
jst.String.addMethod("asString", "", "converting");

jst.String.constructor.prototype.isString = function() { 
	return true; 
};
jst.String.addMethod("isString", "", "testing");

jst.String.constructor.prototype.isSymbol = function() { 
	return true; 
};
jst.String.addMethod("isSymbol", "", "testing");

jst.String.constructor.prototype["=="] = function(aString) {
	//'primitive', do not redefine
	return this.toString() === aString;//.toString();
};
jst.String.addMethod("==", "aString", "comparing");

/*
jst.String.constructor.prototype["="] = function(aString) {
	return this.toString() === aString;
}; */
jst.String.constructor.prototype["="] = function(aString) {
	return this.toString() == aString;
};
jst.String.addMethod("=", "aString", "comparing");

jst.String.constructor.prototype.compare_ = function(aString) {
	// 1 - before, 2 - equal, 3 - after
	return (this.localeCompare(aString) < 0) ? 1 : ((this.toString() == aString) ? 2 : 3);
};
jst.String.addMethod("compare:", "aString", "comparing");

jst.String.constructor.prototype["<="] = function(aString) {
	return this.compare_(aString) <= 2;
};
jst.String.addMethod("<=", "aString", "comparing");

jst.String.constructor.prototype["<"] = function(aString) {
	return this.compare_(aString) == 1;
};
jst.String.addMethod("<", "aString", "comparing");

jst.String.constructor.prototype.at_ = function(index) {
	if (!index.isNumber())
		this.error_("Only integers should by used as indices");
	return (index > 0 && index <= this.length) ? this.charAt(index-1) : this.errorSubscriptBounds_(index);
};
jst.String.addMethod("at:", "index", "accessing");

jst.String.constructor.prototype.yourself = function() {
	//jinak nefunguje
	return this.toString();
};
jst.String.addMethod("yourself", "", "accessing");
/*
jst.String.constructor.prototype.do_ = function(aBlock){
	for (var i = 0; i < this.length; i++)
		aBlock.value_(this[i]);
	return this.yourself();
};
jst.String.addMethod("do:", "aBlock", "enumerating");
*/
jst.String.addMethod("withBlanksTrimmed", "", "converting", null, "trim");

jst.String.constructor.prototype.reverse = function(){
	return jst.OrderedCollection.newFrom_(this).reverse().join("");
};
jst.String.addMethod("reversed", "", "converting", null, "reverse");

jst.String.constructor.prototype.asNumber = function(){
	return Number(this);
};
jst.String.addMethod("asNumber", "", "converting");

jst.String.constructor.prototype.format_ = function(aCollection){
	return this.replace(/\{(\d+)\}/g, 
		function(m, i){
        	return aCollection.at_(i);
    	}
	);
};
jst.String.addMethod("format:", "aCollection", "formatting");

jst.String.constructor.prototype.translated = function(){
	return this.yourself();
};
jst.String.addMethod("translated", "", "translating");

jst.String.constructor.prototype.asFunctionName = function(){
	return jst.Method.selectorToFunctionName_(this.toString()); //2013-10-05 pridano toString(), nutne!!!
};
jst.String.addMethod("asFunctionName", "", "converting"); 

jst.String.constructor.prototype.asSelector = function(){
	//return jst.Method.functionNameToSelector_(this);
	//return (this == "_new") ? "new" : this.replace(/_/g, ":");
	if (this == "_new") 
		return "new";
	else if (this == "klass")
		return "class";
	else
		return this.replace(/_/g, ":");
};
jst.String.addMethod("asSelector", "", "converting"); 

/*
jst.String.constructor.prototype.value = function() {
	return this.toString();
};
jst.String.addMethod("value", "", "evaluating");

jst.String.constructor.prototype.ifNil_ = function(nilBlock) {
	return this.toString();
};
jst.String.addMethod("ifNil:", "nilBlock", "testing");

jst.String.constructor.prototype.postCopy = function() {
	return this.toString();
};
jst.String.addMethod("postCopy", "", "copying");
*/

jst.String.constructor.prototype.startsWith_ = function (start){
	return this.indexOf(start) == 0;
};
jst.String.addMethod("startsWith:", "start", "testing"); 

jst.String.constructor.prototype.ifString_ = function (aBlock) {
	return jst.snd(aBlock, "value");
};
jst.String.addMethod("ifString:", "aBlock", "testing");

jst.String.addMethod("paddedRightTo:with:", "length char", "copying", function(length, char){
	var str = "";
	while (length > str.length + this.length)
		str += char.charAt(0);
	return this + str;
});

// *** Number ***

jst.Object.subclass("Number", "", "", "", "Kernel-Objects");

Number.prototype.__proto__ = jst.Number.constructor.prototype;
jst.Number.constructor.prototype = Number.prototype; // experimental

jst.Number.constructor.prototype["=="] = function(aNumber) {
	// jen === nefunguje (viz implementace v jst.Object)
	return this+0 === aNumber;
};
jst.Number.addMethod("==", "aNumber", "comparing"); 

jst.Number.constructor.prototype[">"] = function(aNumber) {
	return this > aNumber;
};
jst.Number.addMethod(">", "aNumber", "comparing");

jst.Number.constructor.prototype["+"] = function(aNumber) {
	return this + aNumber;
};
jst.Number.addMethod("+", "aNumber", "arithmetic");

jst.Number.constructor.prototype["*"] = function(aNumber) {
	return this * aNumber;
};
jst.Number.addMethod("*", "aNumber", "arithmetic");

jst.Number.constructor.prototype["-"] = function(aNumber) {
	return this - aNumber;
};
jst.Number.addMethod("-", "aNumber", "arithmetic");

jst.Number.constructor.prototype["/"] = function(aNumber) {
	return this / aNumber;
};
jst.Number.addMethod("/", "aNumber", "arithmetic");

jst.Number.constructor.prototype.yourself = function() {
	//jinak je cislo nejake poskozene
	return this + 0;
};
jst.Number.addMethod("yourself", "", "accessing");

jst.Number.constructor.prototype.shallowCopy = function (){
	return this;
};
jst.Number.addMethod("shallowCopy", "", "copying");

jst.Number.constructor.prototype.isNumber = function() {
	return true;
};
jst.Number.addMethod("isNumber", "", "testing");

//*** Boolean ***

jst.Object.subclass("Boolean", "", "", "", "Kernel-Objects");

Boolean.prototype.__proto__ = jst.Boolean.constructor.prototype;
jst.Boolean.constructor.prototype = Boolean.prototype; // experimental

jst.Boolean.constructor.prototype["=="] = function (aBoolean){
	// === nefunguje (viz implementace v jst.Object)
	return this == aBoolean;
};
jst.Boolean.addMethod("==", "aBoolean", "comparing");

jst.Boolean.constructor.prototype.yourself = function(){
	return (this == true) ? true : false;
};
jst.Boolean.addMethod("yourself", "", "accessing");

jst.Boolean.constructor.prototype.and_ = function(aBlock) {
	return (this == true) && (aBlock.value() == true);
};
jst.Boolean.addMethod("and:", "aBlock", "controlling");

jst.Boolean.constructor.prototype.and_and_ = function(block1, block2) {
	return (this == true) && (block1.value() == true) && (block2.value() == true);
};
jst.Boolean.addMethod("and:and:", "block1 block2", "controlling");

jst.Boolean.constructor.prototype.and_and_and_ = function(block1, block2, block3) {
	return (this == true) && (block1.value() == true) && (block2.value() == true) && (block3.value() == true);
};
jst.Boolean.addMethod("and:and:and:", "block1 block2 block3", "controlling");

jst.Boolean.constructor.prototype.and_and_and_and_ = function(block1, block2, block3, block4) {
	return (this == true) && (block1.value() == true) && (block2.value() == true) && (block3.value() == true) && (block4.value() == true);
};
jst.Boolean.addMethod("and:and:and:and:", "block1 block2 block3 block4", "controlling");

jst.Boolean.constructor.prototype.or_ = function(aBlock) {
	return (this == true) || (aBlock.value() == true);
};
jst.Boolean.addMethod("or:", "aBlock", "controlling");

jst.Boolean.constructor.prototype.or_or_ = function(block1, block2) {
	return (this == true) || (block1.value() == true) || (block2.value() == true);
};
jst.Boolean.addMethod("or:or:", "block1 block2", "controlling");

jst.Boolean.constructor.prototype.or_or_or_ = function(block1, block2, block3) {
	return (this == true) || (block1.value() == true) || (block2.value() == true) || (block3.value() == true);
};
jst.Boolean.addMethod("or:or:or:", "block1 block2 block3", "controlling");

jst.Boolean.constructor.prototype.or_or_or_or_ = function(block1, block2, block3, block4) {
	return (this == true) || (block1.value() == true) || (block2.value() == true) || (block3.value() == true) || (block4.value() == true);
};
jst.Boolean.addMethod("or:or:or:or:", "block1 block2 block3 block4", "controlling");

jst.Boolean.constructor.prototype["&"] = function(aBoolean) {
	return (this == true) && (aBoolean == true);
};
jst.Boolean.addMethod("&", "aBoolean", "logical operations");

jst.Boolean.constructor.prototype["|"] = function(aBoolean) {
	return (this == true) || (aBoolean == true);
};
jst.Boolean.addMethod("|", "aBoolean", "logical operations");

jst.Boolean.constructor.prototype.not = function() {
	return this == false;
};
jst.Boolean.addMethod("not", "", "logical operations");

jst.Boolean.constructor.prototype.ifTrue_ = function(aBlock) {
	return (this == true) ? aBlock.value() : jst.nil;
};
jst.Boolean.addMethod("ifTrue:", "aBlock", "controlling");

jst.Boolean.constructor.prototype.ifFalse_ = function(aBlock) {
	return (this == false) ? aBlock.value() : jst.nil;
};
jst.Boolean.addMethod("ifFalse:", "aBlock", "controlling");

jst.Boolean.constructor.prototype.ifTrue_ifFalse_ = function(trueBlock, falseBlock) {
	return (this == true) ? trueBlock.value() : falseBlock.value();
};
jst.Boolean.addMethod("ifTrue:ifFalse:", "trueBlock falseBlock", "controlling");

jst.Boolean.constructor.prototype.ifFalse_ifTrue_ = function(falseBlock, trueBlock) {
	return (this == true) ? trueBlock.value() : falseBlock.value();
};
jst.Boolean.addMethod("ifFalse:ifTrue:", "falseBlock trueBlock", "controlling");

jst.Boolean.constructor.prototype.shallowCopy = function (){
	return this;
};
jst.Boolean.addMethod("shallowCopy", "", "copying");

// *** Message ***

jst.Object.subclass("Message", "selector args", "", "", "Kernel-Methods");

jst.Message.selector_arguments_ = function(aSymbol, anArray) {
	var msg = this._new();
	msg._selector = aSymbol;
	msg._args = anArray;
	return msg;
};
jst.Message._class.addMethod("selector:arguments:", "aSymbol anArray", "instance creation");

jst.receiver_doesNotUnderstand_with_ = function(receiver, fnName, args) {
	//selector is in javascript format
	//console.log([receiver, fnName] + args);
	if (!receiver.doesNotUnderstand_with_) {
		//receiver is native js object, it does not understand #doesNotUnderstand:with: ;-)
		var m = jst.MessageNotUnderstood._new();
		m._receiver = receiver;
		m._message = jst.Message.selector_arguments_(fnName.asSelector(), [args]);
		m.signal_(receiver.toString() + ">>" + fnName.asSelector());		
	};
	return receiver.doesNotUnderstand_with_(fnName.asSelector(), args);
};
jst.Message._class.addMethod("receiver:doesNotUnderstand:with:", "receiver fnName args", "system primitives", jst.receiver_doesNotUnderstand_with_);

// jstProxy si defined in jst-core-proxy.js

jst.send = function(receiver, selector, args) {
	if (receiver == null)
		receiver = jst.nil;
	else if (receiver.jstProxy)
		receiver = receiver.jstProxy;
	return (receiver[selector]) ? receiver[selector].apply(receiver, args) : jst.receiver_doesNotUnderstand_with_(receiver, selector, args);
};
jst.Message._class.addMethod("sendTo:selector:withArguments:", "receiver selector args", "system primitives", jst.send);

jst.snd = function(receiver, selector) {
	//optimalized version of a message send without arguments
	if (receiver == null)
		receiver = jst.nil;
	else if (receiver.jstProxy)
		receiver = receiver.jstProxy;
	return (receiver[selector]) ? receiver[selector]() : jst.receiver_doesNotUnderstand_with_(receiver, selector, []);
};
jst.Message._class.addMethod("sendTo:selector:", "receiver selector", "system primitives", jst.snd);

jst.sndw = function(receiver, selector, arg) {
	//optimalized version of a message send with one argument
	if (receiver == null)
		receiver = jst.nil;
	else if (receiver.jstProxy)
		receiver = receiver.jstProxy;
	return (receiver[selector]) ? receiver[selector](arg) : jst.receiver_doesNotUnderstand_with_(receiver, selector, [arg]);
};
jst.Message._class.addMethod("sendTo:selector:with:", "receiver selector arg", "system primitives", jst.sndw);

jst.sndww = function(receiver, selector, arg1, arg2) {
	//optimalized version of a message send with two arguments
	if (receiver == null)
		receiver = jst.nil;
	else if (receiver.jstProxy)
		receiver = receiver.jstProxy;
	return (receiver[selector]) ? receiver[selector](arg1, arg2) : jst.receiver_doesNotUnderstand_with_(receiver, selector, [arg1, arg2]);
};
jst.Message._class.addMethod("sendTo:selector:with:with:", "receiver selector arg1 arg2", "system primitives", jst.sndww);

jst.sndwww = function(receiver, selector, arg1, arg2, arg3) {
	//optimalized version of a message send with three arguments
	if (receiver == null)
		receiver = jst.nil;
	else if (receiver.jstProxy)
		receiver = receiver.jstProxy;
	return (receiver[selector]) ? receiver[selector](arg1, arg2, arg3) : jst.receiver_doesNotUnderstand_with_(receiver, selector, [arg1, arg2, arg3]);
};
jst.Message._class.addMethod("sendTo:selector:with:with:with:", "receiver selector arg1 arg2 arg3", "system primitives", jst.sndwww);

jst.superSend = function(receiver, selector, args, aClass) {
	if (receiver == null)
		receiver = jst.nil;
	//we have to find the superclass protocol
	var protocol = (aClass || receiver.klass()).superclass().protocol(); 
	return (protocol[selector]) ? protocol[selector].apply(receiver, args) : protocol.doesNotUnderstand_with_(selector.asSelector(), args);
};
jst.Message._class.addMethod("superSendTo:selector:with:inClass:", 
	"receiver selector args aClass", "system primitives", jst.superSend);

// *** MessageNotUnderstood ***

jst.Error.subclass("MessageNotUnderstood", "message", "", "", "Exceptions-Kernel");

// *** Object >> doesNotUnderstand ***

jst.Object.constructor.prototype.doesNotUnderstand_with_ = function(selector, args) {
	//Can be redefined to avoid creating instances of Message class - see JSObjectProxy
	return this.doesNotUnderstand_(jst.Message.selector_arguments_(selector, [args]));
};
jst.Object.addMethod("doesNotUnderstand:with:", "selector args", "system primitives");

jst.Object.constructor.prototype.doesNotUnderstand_ = function(aMessage) {
	var m = jst.MessageNotUnderstood._new();
	m._receiver = this;
	m._message = aMessage;
	//m.signal_(this.className() + ">>" + aMessage._selector);
	jst.sndw(m, "signal_", this.className() + ">>" + aMessage._selector);

};
jst.Object.addMethod("doesNotUnderstand:", "aMessage", "system primitives");

// *** Magnitude ***

jst.Object.subclass("Magnitude", "", "", "", "Kernel-Objects");

// *** DateAndTime ***

jst.Magnitude.subclass("DateAndTime", "", "", "", "Kernel-Chronology");

Date.prototype.printNative = Date.prototype.toString; 
Date.prototype.toString = jst.Object.constructor.prototype.toString;

Date.prototype.__proto__ = jst.DateAndTime.constructor.prototype;
jst.DateAndTime.constructor.prototype = Date.prototype; // experimental

jst.DateAndTime.addMethod("printNative", "", "printing");

// Methods required in definition of method #installMethod:on:by:

jst.DateAndTime._class.addMethod("parse:", "aString", "native protocol", function(aString){
	//calls original method, parses ISO format too
	var msc = Date.parse(aString);
	if (isNaN(msc)) {
		if (aString.indexOf("Z")+1 == aString.length) {
			//IE 7 - parsing UTC time in ISO format
			var arr = aString.split(new RegExp("[-T:Z]"));
			msc = Date.UTC(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5]);
		}
		else 
			this.error_("Date cannot be parsed from: '" + aString + "'.");
	};	
	return new Date(msc);
});

jst.MethodCategory.addMethod("isDefault", "", "testing", function (){
	return this._name == this._class.defaultName();
});

jst.MethodVersion.addMethod("createdOn:", "aDateAndTime", "accessing", function(aDateAndTime) {
	this._createdOn = aDateAndTime;
	return this;
});

jst.MethodVersion.addMethod("createdBy:", "aString", "accessing", function(aString) {
	this._createdBy = aString;
	return this;
});

jst.MethodVersion.addMethod("category", "", "accessing", function() {
	return this._category;
});

/*
jst.Behavior.addMethod("installMethod:on:by:", "aMethod dateTime user", "adding/removing methods", 
	"\tmethodDict at: aMethod selector ifPresent: [:old | " +
	"\n\t\taMethod priorVersion: (MethodVersion newFromMethod: old)]." + // UIManager default inform: aMethod receiver name,'>>', aMethod selector
	"\n\taMethod createdOn: (dateTime ifString: [DateAndTime fromString: dateTime]); createdBy: user." +
	"\n\tmethodDict at: aMethod selector put: aMethod");
*/

/*
jst.Behavior.addMethod("installMethod:on:by:", "aMethod dateTime user", "adding/removing methods", 
	"\t| oldCat |" +
	"\n\tmethodDict at: aMethod selector ifPresent: [:old | " +
	"\n\t\toldCat := old category." +
	"\n\t\taMethod priorVersion: old]." +
	"\n\taMethod createdOn: (dateTime ifString: [DateAndTime fromString: dateTime]); createdBy: user." +
	"\n\tmethodDict at: aMethod selector put: aMethod." +
	"\n\t(oldCat notNil and: [oldCat isDefault] and: [oldCat methods isEmpty]) ifTrue: [" +
	"\n\t\tcategories removeKey: oldCat name]",
	null, "2012-04-10T08:56:01Z", "mp");
*/

jst.Behavior.addMethod("installMethod:on:by:", "aMethod dateTime user", "adding/removing methods", 
function(aMethod, dateTime, user) {  
	var oldCat = jst.nil;
	this._methodDict.at_ifPresent_(aMethod.selector(), function(old){
		oldCat = old.category();
		aMethod.priorVersion_(old);
	});
	aMethod.createdOn_(dateTime.ifString_(
		function(){return jst.DateAndTime.parse_(dateTime);}));
	aMethod.createdBy_(user);
	this._methodDict.at_put_(aMethod.selector(), aMethod);
	if (oldCat.notNil() && oldCat.isDefault() && oldCat.methods().isEmpty())
		this._categories.removeKey_(oldCat.name());
});

// From here it is possible to use the timestamp in addMethod

jst.Method.addMethod("sourceCode", "", "printing", function (){
	return this.printMessagePattern() + "\n" + this.body(); 
},
	null, "2013-06-01T11:44:46Z", "mp");

jst.Method.addMethod("priorVersion:", "anObject", "accessing", function (anObject){
	if (anObject.isMethod())
		this._priorVersion = jst.MethodVersion._new().on_(anObject);
	else
		this._priorVersion = anObject;
	return this;
},
	null, "2014-04-27T20:57:08Z", "mp");

jst.MethodVersion.addMethod("sourceCode", "", "accessing", function () {
	return this._code;
},
	null, "2013-06-01T11:47:34Z", "mp");

jst.MethodVersion.addMethod("createdOn", "", "accessing", function () {
	return this._createdOn;
});

jst.MethodVersion.addMethod("createdBy", "", "accessing", function () {
	return this._createdBy;
});

jst.MethodVersion.addMethod("priorVersion", "", "accessing", function(){
	return this._priorVersion;
});

jst.MethodVersion.addMethod("jsFile", "", "accessing", function(){
	return this._jsFile;
});

jst.MethodVersion.addMethod("isNative", "", "testing", function(){
	return this._native == true;
},
	null, "2013-06-01T21:12:02Z", "mp");

jst.MethodVersion.addMethod("on:", "aMethod", "initialization", function (aMethod){
	this._code = aMethod.sourceCode();
	this._category = aMethod.category();
	this._createdOn = aMethod.createdOn();
	this._createdBy = aMethod.createdBy();
	this._priorVersion = aMethod.priorVersion();
	this._jsFile = aMethod.jsFile();
	this._native = aMethod.isNative();
	return this;
},
	null, "2014-04-27T21:50:14Z", "mp"); //jst-core

// *** Console ***

jst.Object.subclass("Console", "", "", "", "System");

jst.Console._class.addMethod("log:", "aString", "logging", function(aString){
	return console.log(aString);
});

// privatni metoda, zaznamenava poradi inicializace trid

jst.initClassOrder = 0;

jst.initializeClass = function(aClass){
	aClass._initOrder = jst.initClassOrder++;
	jst.snd(aClass, "initialize");
};
