
jst.currentJsFile = "jst-parser-tests";

//*** CodeGraphPrinter ***

jst.Object.subclass("CodeGraphPrinter", "level", "", "", "JSTParser-tests");

jst.CodeGraphPrinter.level_ = function(anInteger){
	var p = this._new();
	p._level = anInteger;
	return p;
};
jst.CodeGraphPrinter._class.addMethod("level:", "anInteger", "instance creation");

jst.CodeGraphPrinter.constructor.prototype.initialize = function(){
	this._level = 0;
};
jst.CodeGraphPrinter.addMethod("initialize", "", "initialization");

jst.CodeGraphPrinter.constructor.prototype.levelPrefix = function() {
	if (this._level == 0)
		return "";
	var result = " ";
	for (var i = 0; i < this._level-1; i++)
		result += "-";
	return result + this._level + " ";
};
jst.CodeGraphPrinter.addMethod("levelPrefix", "", "private");

jst.CodeGraphPrinter.constructor.prototype.printExpressionGraph_ = function(aExpression) {
	if (aExpression.isMessageSend())
		return this.printMessageSendGraph_(aExpression.asMessageSend());
	else if (!(aExpression._body.isKindOf_(jst.Expression)))
		return this.levelPrefix() + aExpression.className() + ": (" 
			+ aExpression._body.printGraph_() + ")\n";
	return this.levelPrefix() + aExpression.className() + ": (...)\n" 
		+ aExpression._body.printGraph_(this._level + 1);
};
jst.CodeGraphPrinter.addMethod("printExpressionGraph:", "aExpression", "printing");

jst.CodeGraphPrinter.constructor.prototype.printAssignmentGraph_ = function(anAssignment) {
	var result = this.levelPrefix() + anAssignment.className() + ": " 
		+ anAssignment._variable.name() + " = ";
	if (anAssignment._body.isKindOf_(jst.Expression))
		result += "...\n";
	return anAssignment._body.printGraph_(this._level + 1) + "\n";
};
jst.CodeGraphPrinter.addMethod("printAssignmentGraph:", "anAssignment", "printing");

jst.CodeGraphPrinter.constructor.prototype.printBlockGraph_ = function(aBlock) {
	var result = this.levelPrefix() + aBlock.className() + ": [";
	if (aBlock._params.length > 0) {
		for (var i = 0; i < aBlock._params.length; i++)
			result += ":" + aBlock._params[i] + " ";
		result += "|";
	}; 
	return result + "...]\n" + aBlock._body.printGraph_(this._level + 1);
};
jst.CodeGraphPrinter.addMethod("printBlockGraph:", "aBlock", "printing");

jst.CodeGraphPrinter.constructor.prototype.printMessageSendGraph_ = function(aMessageSend) {
	var result = this.levelPrefix() + aMessageSend.className() + ":\n";
	result += this.levelPrefix() + ".receiver: ";
	if (aMessageSend._receiver.isKindOf_(jst.Expression))
		result += "...\n";
	result += aMessageSend._receiver.printGraph_(this._level + 1) + "\n";
	result += this.levelPrefix() + ".selector: " + aMessageSend._selector + "\n";
	for (var i = 0; i < aMessageSend._args.length; i++) {
		result += this.levelPrefix() + ".argument" + (i+1) + ": ";
		if (aMessageSend._args[i].isKindOf_(jst.Expression))
			result += "...\n" + aMessageSend._args[i].printGraph_(this._level + 1);
		else result += aMessageSend._args[i].printGraph_() + "\n";
	};
	return result;
};
jst.CodeGraphPrinter.addMethod("printMessageSendGraph:", "aMessageSend", "printing");

jst.CodeGraphPrinter.constructor.prototype.printCodeGraph_ = function(aSmalltalkCode) {
	var result = this.levelPrefix() + aSmalltalkCode.className() + ":\n";
	for (var i = 0; i < aSmalltalkCode._expressions.length; i++)
		result += aSmalltalkCode._expressions[i].printGraph_(this._level + 1);
	return result;
};
jst.CodeGraphPrinter.addMethod("printCodeGraph:", "aSmalltalkCode", "printing");

jst.Expression.constructor.prototype.printGraph_ = function(level) {
	this.subclassResponsibility_("printGraph:");
};
jst.Expression.addMethod("printGraph:", "level", "printing");

jst.Expression.constructor.prototype.printGraph = function() {
	return this.printGraph_(0);
};
jst.Expression.addMethod("printGraph", "", "printing");

jst.Variable.constructor.prototype.printGraph_ = function(level) {
	return this._name;
};
jst.Variable.addMethod("printGraph:", "level", "printing");

jst.Constant.constructor.prototype.printGraph_ = function(level) {
	if (this.isChar())
		return "$" + this._source;
	else if (this.isSymbol())
		return "#'" + this._source + "'";
	else 
		return this.printSource();
};
jst.Constant.addMethod("printGraph:", "level", "printing");

jst.Assignment.constructor.prototype.printGraph_ = function(level) {
	return jst.CodeGraphPrinter.level_(level || 0).printAssignmentGraph_(this);
};
jst.Assignment.addMethod("printGraph:", "level", "printing");

jst.SmalltalkCode.constructor.prototype.printGraph_ = function(level) {
	return jst.CodeGraphPrinter.level_(level || 0).printCodeGraph_(this);
};
jst.SmalltalkCode.addMethod("printGraph:", "level", "printing");

jst.Block.constructor.prototype.printGraph_ = function(level) {
	return jst.CodeGraphPrinter.level_(level || 0).printBlockGraph_(this);
};
jst.Block.addMethod("printGraph:", "level", "printing");

jst.MessageSend.constructor.prototype.printGraph_ = function(level) {
	return jst.CodeGraphPrinter.level_(level || 0).printMessageSendGraph_(this);
};
jst.MessageSend.addMethod("printGraph:", "level", "printing");

// *** ParserTest ***

jst.TestCase.subclass("ParserTest", "", "", "", "JSTParser-tests");

jst.ParserTest.constructor.prototype.testArithmetic = function() {
	this.assert_sameAs_(jst.Parser.parseCode_("1+2").asJavascript(), "jst.Message.sndw(1, '+', 2)");
	this.assert_sameAs_(jst.Parser.parseCode_("1++2").asJavascript(), "jst.Message.sndw(1, '+', +2)");
	this.assert_sameAs_(jst.Parser.parseCode_("1+-2").asJavascript(), "jst.Message.sndw(1, '+', -2)");
	this.assert_sameAs_(jst.Parser.parseCode_("1--2").asJavascript(), "jst.Message.sndw(1, '-', -2)");
	this.assert_sameAs_(jst.Parser.parseCode_("1*-2").asJavascript(), "jst.Message.sndw(1, '*', -2)");
	this.assert_sameAs_(jst.Parser.parseCode_("1/-2").asJavascript(), "jst.Message.sndw(1, '/', -2)");
};
jst.ParserTest.addMethod("testArithmetic", "", "testing");

jst.ParserTest.constructor.prototype.testSimpleExpressions = function() {
	this.assert_sameAs_(jst.Parser.parseCode_("x:=1").asJavascript(), "var x = jst.nil; x = 1");
	this.assert_sameAs_(jst.Parser.parseCode_("^'abc'").asJavascript(), "return 'abc'");
	this.assert_sameAs_(jst.Parser.parseCode_("1 asString").asJavascript(), "jst.Message.snd(1, 'asString')");
	this.assert_sameAs_(jst.Parser.parseCode_("' abc ' withBlanksTrimmed").asJavascript(), "jst.Message.snd(' abc ', 'withBlanksTrimmed')");
	this.assert_sameAs_(jst.Parser.parseCode_("'abc' isKindOf: String").asJavascript(), "jst.Message.sndw('abc', 'isKindOf:', jst.String)");
};
jst.ParserTest.addMethod("testSimpleExpressions", "", "testing");

jst.ParserTest.constructor.prototype.testParentheses = function() {
	
	this.assert_sameAs_(jst.Parser.parseCode_("1+2*3").asJavascript(), 
		"jst.Message.sndw(jst.Message.sndw(1, '+', 2), '*', 3)");
	
	this.assert_sameAs_(jst.Parser.parseCode_("1+(2*3)").asJavascript(), 
		"jst.Message.sndw(1, '+', jst.Message.sndw(2, '*', 3))");	
	
	this.assert_sameAs_(jst.Parser.parseCode_("(1+2)*(3-4)").asJavascript(), 
		"jst.Message.sndw(jst.Message.sndw(1, '+', 2), '*', jst.Message.sndw(3, '-', 4))");	
	
	this.assert_sameAs_(jst.Parser.parseCode_("str := (1 + 2) asString").asJavascript(),
		"var str = jst.nil; str = jst.Message.snd(jst.Message.sndw(1, '+', 2), 'asString')");

};
jst.ParserTest.addMethod("testParentheses", "", "testing");

jst.ParserTest.constructor.prototype.testChars = function() {
	this.assert_sameAs_(jst.Parser.parseCode_("$'").asJavascript(), "'\\''");
	this.assert_sameAs_(jst.Parser.parseCode_("$\"").asJavascript(), "'\"'");
};
jst.ParserTest.addMethod("testChars", "", "testing");

/*
jst.ParserTest.prototype.testUnaryMessage = function() {
	var receivers = ["1", "(1+2)", "1+2", "('abc' sub: 0 string: 1)", "x := 1"]; 
	var results = ["1", "(1 + 2)", "1 + 2", "('abc'.substring(0, 1))", "this.x = 1"];
	for (var i = 0; i < receivers.length; i++) {
		this.assert(new STExpression(receivers[i]+" print").convert(), results[i]+".print()");		
	};
};

jst.ParserTest.prototype.testMessages = function() {
	this.assert(new STExpression("123 asString reversed").convert(), "123.asString().reversed()");
	this.assert(new STExpression("1+2*3").convert(), "(1 + 2) * 3");
	this.assert(new STExpression("1+2*3-4").convert(), "((1 + 2) * 3) - 4");

	this.assert(new STExpression("'1' asInteger + 2").convert(), "'1'.asInteger() + 2");
	this.assert(new STExpression("1+'2'asInteger").convert(), "1 + '2'.asInteger()");
	this.assert(new STExpression("'1'asInteger+'2'asInteger").convert(), 
		"'1'.asInteger() + '2'.asInteger()");

	this.assert(new STExpression("123 asString sub: 0 string: 1").convert(), 
		"123.asString().substring(0, 1)");
	this.assert(new STExpression("'123' sub: '0' asInteger string: 1").convert(), 
		"'123'.substring('0'.asInteger(), 1)");
	this.assert(new STExpression("'123' sub: 0 string: '1' asInteger").convert(), 
		"'123'.substring(0, '1'.asInteger())");
	this.assert(new STExpression("123asString sub:'0'asInteger string:'1'asInteger").convert(), 
		"123.asString().substring('0'.asInteger(), '1'.asInteger())");

	this.assert(new STExpression("'123'+'abc' sub: 0 string: 1").convert(), 
		"('123' + 'abc').substring(0, 1)");
};

//STMethodTest

function STMethodTest() {}

STMethodTest.prototype = ST.TestCase.subclass("MethodTest", "Core-Test");

STMethodTest.prototype.setUp = function() {
	this.str = new String("abc123");
	this.str.methods = [];	
};

STMethodTest.prototype.testNewMethod = function() {
	new STMethod("find: x \n $return this.search(x);").compile(this.str);
  new STMethod("find2: x \n ^self search: x").compile(this.str);
  var hledej = "c";
	this.assert(this.str.find_(hledej) == this.str.search(hledej));
  this.assert(this.str.find2_(hledej) == this.str.search(hledej));
};
*/
//document.write("<p><pre>" + jst.TestCase.suite().run().toString() + "</pre>");
