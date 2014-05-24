// zavisi na STCore2.js

jst.currentJsFile = "jst-test-unit";

// *** TestFailure ***

jst.Error.subclass("TestFailure", "", "", "", "JSTUnit");

// *** TestSuite ***

jst.Object.subclass("TestSuite", "name tests", "", "", "JSTUnit");

jst.TestSuite.constructor.prototype.name = function(){
	return this._name;
};
jst.TestSuite.addMethod("name", "", "accessing");

jst.TestSuite.constructor.prototype.initialize = function() {
	this._tests = jst.OrderedCollection._new();
};
jst.TestSuite.addMethod("initialize", "", "initialization");

jst.TestSuite.constructor.prototype.addTest_ = function(aTest) {
	this._tests.add_(aTest);
	return this;
};
jst.TestSuite.addMethod("addTest:", "aTest", "accessing");

jst.TestSuite.constructor.prototype.run = function(aResult) {
	var result = jst.TestResult._new();
	this.run_(result);
	return result;	
};
jst.TestSuite.addMethod("run", "", "running");

jst.TestSuite.constructor.prototype.run_ = function(aResult){
	for (var i = 0; i < this._tests.length; i++)
		this._tests[i].run_(aResult);
	return this;
};
jst.TestSuite.addMethod("run:", "aResult", "accessing");

jst.TestSuite.named_ = function(aString) {
	var t = this._new();
	t._name = aString;
	return t;
};
jst.TestSuite._class.addMethod("named:", "aString", "instance creation");

// *** TestResult ***

jst.Object.subclass("TestResult", "passed failures errors log", "", "", "JSTUnit");

jst.TestResult.constructor.prototype.initialize = function() {
	this._passed = jst.OrderedCollection._new();
	this._failures = jst.OrderedCollection._new();
	this._errors = jst.OrderedCollection._new();
	this._log = "";
};

jst.TestResult.constructor.prototype.runCase_ = function(aTestCase) {
	try {
		aTestCase.runCase();
	} catch (e) {
		this._log += "\n" + aTestCase._class.name() + ">>" + aTestCase._testSelector + ":";
		if (aTestCase._log.length > 0)
			this._log += "\n   " + aTestCase._log;
		if (e.isKindOf_(jst.TestFailure))
			this._failures.add_(aTestCase);
		else {
			this._errors.add_(aTestCase);
			this._log += "\n   " + e.toString();
		};
		return this;
	};
	//test prosel
	this._passed.add_(aTestCase);
	return this;
};
jst.TestResult.addMethod("runCase:", "aTestCase", "running");

jst.TestResult.constructor.prototype.runCount = function() {
	return this._passed.length + this._failures.length + this._errors.length;
};
jst.TestResult.addMethod("runCount", "", "accessing");

jst.TestResult.constructor.prototype.printString = function() {
	return this.runCount() + " run, " + this._passed.length + " passes, " 
		+ this._failures.length + " failures, " + this._errors.length + " errors\n" + this._log;
};
jst.TestResult.addMethod("printString", "", "printing");

// *** TestCase ***

jst.Object.subclass("TestCase", "testSelector log", "", "", "JSTUnit");

jst.TestCase.selector_ = function(aSymbol) {
	var obj = this._new();
	obj._testSelector = aSymbol;
	return obj;
};
jst.TestCase._class.addMethod("selector:", "aSymbol", "instance creation");

jst.TestCase.isAbstract = function() {
	return this.name() == jst.TestCase.name();
};
jst.TestCase._class.addMethod("isAbstract", "", "testing");

jst.TestCase.testSelectors = function() {
	var result = jst.OrderedCollection._new();
	var allSel = this.selectors();
	for (var i = 0; i < allSel.length; i++) {
		if (/^test/.test(allSel[i]))
			result.add_(allSel[i]);
	};
	return result;
};
jst.TestCase._class.addMethod("testSelectors", "", "accessing");

jst.TestCase.addToSuiteFromSelectors_ = function(suite) {
	return this.addToSuite_fromMethods_(suite, this.testSelectors());
};
jst.TestCase._class.addMethod("addToSuiteFromSelectors:", "suite", "building suites");

jst.TestCase.addToSuite_fromMethods_ = function(suite, testMethods) { 
	for (var i = 0; i < testMethods.length; i++) 
       	suite.addTest_(this.selector_(testMethods[i]));
    return suite;
};
jst.TestCase._class.addMethod("addToSuite:fromMethods:", "suite testMethods", "building suites");

jst.TestCase.suite = function() {
	var suite = jst.TestSuite._new();
	if (this.isAbstract()) {
		suite._name = this.name();
		this.allSubclassesDo_(function(cl) {
			if (!cl.isAbstract())
				cl.addToSuiteFromSelectors_(suite);
		});
		return suite;
	} else 
		return this.addToSuiteFromSelectors_(suite);
};
jst.TestCase._class.addMethod("suite", "", "instance creation");

//instance side protocol

jst.TestCase.constructor.prototype.initialize = function() {
	this._log = "";
	return this;
};
jst.TestCase.addMethod("initialize", "", "initializing");

jst.TestCase.constructor.prototype.run_ = function(aResult){
	aResult.runCase_(this);
	return this;
};
jst.TestCase.addMethod("run:", "aResult", "running");

jst.TestCase.constructor.prototype.run = function() {
	var result = jst.TestResult._new();
	this.run_(result);
	return result;	
};
jst.TestCase.addMethod("run", "", "running");

jst.TestCase.constructor.prototype.runCase = function() {
	this.setUp();
	try {
		this.perform_(this._testSelector);
	} finally {
		this.tearDown();
	};
	return this;
};
jst.TestCase.addMethod("runCase", "", "running");

jst.TestCase.constructor.prototype.setUp = function(){};
jst.TestCase.addMethod("setUp", "", "running");

jst.TestCase.constructor.prototype.tearDown = function(){};
jst.TestCase.addMethod("tearDown", "", "running");


jst.TestCase.constructor.prototype.assert_sameAs_ = function(left, right) {
	if (left != right) {
		//javascriptova verze, pouze porovnava objekty
		var msg = "Assertion failed: " + left + " = " + right;
		this._log += msg;
		jst.TestFailure.signal_on_(msg, this);
	};
	return this;
};
jst.TestCase.addMethod("assert:sameAs:", "left right", "accessing");

jst.TestCase.constructor.prototype.assert_ = function(aBooleanOrBlock) {
	if (!aBooleanOrBlock.value()) {
		var msg = "Assertion failed";
		if (aBooleanOrBlock.isBlock()) 
			msg += ": " + aBooleanOrBlock.toString();
		else
			msg += "!";
		this._log += msg;
		jst.TestFailure.signal_on_(msg, this);		
	};
	return this;
};
jst.TestCase.addMethod("assert:", "aBooleanOrBlock", "accessing");

jst.TestCase.constructor.prototype.deny_ = function(aBooleanOrBlock) {
	return this.assert_(!aBooleanOrBlock.value());
};
jst.TestCase.addMethod("deny:", "aBooleanOrBlock", "accessing");
