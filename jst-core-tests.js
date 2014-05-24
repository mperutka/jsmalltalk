
// *** BasicTest

jst.currentJsFile = "jst-core-tests";

jst.TestCase.subclass("BasicTest", "", "", "", "Kernel-Tests");

jst.BasicTest.constructor.prototype.testIsKindOf = function() {
	//Object
	this.assert_(jst.Object.isKindOf_(jst.Class));
	this.assert_(jst.Object.isKindOf_(jst.Behavior));
	this.assert_(jst.Object.isKindOf_(jst.Object._class));
	this.assert_(function(){return !jst.Object.isKindOf_(jst.Class._class);});
	this.assert_(function(){return !jst.Object.isKindOf_(jst.Metaclass);});
	//Behavior
	this.assert_(jst.Behavior.isKindOf_(jst.Object));
	this.assert_(jst.Behavior.isKindOf_(jst.Class));
	this.assert_(jst.Behavior.isKindOf_(jst.Behavior._class));
	this.assert_(function(){return !jst.Behavior.isKindOf_(jst.Class._class);});
	this.assert_(function(){return !jst.Behavior.isKindOf_(jst.Metaclass);});
	//Class
	this.assert_(jst.Class.isKindOf_(jst.Object));
	this.assert_(jst.Class.isKindOf_(jst.Behavior));
	this.assert_(function(){return jst.Class.isKindOf_(jst.Class._class);});
	this.assert_(function(){return !jst.Class.isKindOf_(jst.Metaclass);});
	//Metaclass
	this.assert_(jst.Metaclass.isKindOf_(jst.Object));
	this.assert_(jst.Metaclass.isKindOf_(jst.Behavior));
	this.assert_(jst.Metaclass.isKindOf_(jst.Class));
	this.assert_(function(){return !jst.Metaclass.isKindOf_(jst.Class._class);});
	this.assert_(jst.Metaclass.isKindOf_(jst.Metaclass._class));
};
jst.BasicTest.addMethod("testIsKindOf", "", "testing");

jst.BasicTest.constructor.prototype.testSuperclassChain = function() {
	this.assert_sameAs_(jst.Class.superclass(), jst.Behavior);
	this.assert_sameAs_(jst.Metaclass.superclass(), jst.Behavior);
	this.assert_sameAs_(jst.Behavior.superclass(), jst.Object);
	this.assert_sameAs_(jst.Object.superclass(), jst.nil);
	//metaclasses
	this.assert_sameAs_(jst.Class._class.superclass(), jst.Behavior._class);
	this.assert_sameAs_(jst.Metaclass._class.superclass(), jst.Behavior._class);
	this.assert_sameAs_(jst.Behavior._class.superclass(), jst.Object._class);
	this.assert_sameAs_(jst.Object._class.superclass(), jst.Class);
};
jst.BasicTest.addMethod("testSuperclassChain", "", "testing");

jst.BasicTest.constructor.prototype.testClassChain = function() {
	var self = this;
	[jst.Object, jst.Behavior, jst.Class].do_(function(cl){
		self.assert_sameAs_(cl._class, jst.Smalltalk.classNamed_(cl._name + " class"));
		self.assert_sameAs_(cl._class._class, jst.Metaclass);
		self.assert_sameAs_(cl._class._class._class, jst.Metaclass._class);
		self.assert_sameAs_(cl._class._class._class._class, jst.Metaclass);
	});
};
jst.BasicTest.addMethod("testClassChain", "", "testing");

//Tridy pro testy

jst.Object.subclass("MockAParent", "initialized", "", "", "Kernel-Tests");

jst.MockAParent.constructor.prototype.initialize = function() { 
	this._initialized = "parent"; 
};
jst.MockAParent.addMethod("initialize", "", "initializing");

jst.MockAParent.subclass("MockBChild", "", "", "", "Kernel-Tests");

jst.MockBChild.subclass("MockCGrandchild", "", "", "", "Kernel-Tests");

jst.MockCGrandchild.constructor.prototype.initialize = function() {
	//this.super().initialize.call(this);
	jst.Message.superSend(this, "initialize", []);
	this._initialized += "grandchild";
};
jst.MockCGrandchild.addMethod("initialize", "", "initializing");

// *** InheritanceTest

jst.TestCase.subclass("InheritanceTest", "parent child grandchild", "", "", "Kernel-Tests");

jst.InheritanceTest.constructor.prototype.setUp = function() {
	this._parent = jst.MockAParent._new();
	this._child = jst.MockBChild._new();
	this._grandchild = jst.MockCGrandchild._new();
};
jst.InheritanceTest.addMethod("setUp", "", "running");

jst.InheritanceTest.constructor.prototype.testIsKindOf = function() {
	this.assert_(this._parent.isKindOf_(jst.Object));
	this.assert_(this._child.isKindOf_(jst.Object));
	this.assert_(this._child.isKindOf_(jst.MockAParent));
	this.assert_(this._grandchild.isKindOf_(jst.Object));
	this.assert_(this._grandchild.isKindOf_(jst.MockAParent));
	this.assert_(this._grandchild.isKindOf_(jst.MockBChild));
};
jst.InheritanceTest.addMethod("testIsKindOf", "", "testing");

jst.InheritanceTest.constructor.prototype.testClassChain = function() {
	this.assert_sameAs_(jst.MockBChild.klass(), jst.Smalltalk.classNamed_("MockBChild class"));
	this.assert_sameAs_(jst.MockBChild.klass().klass(), jst.Metaclass);
	this.assert_sameAs_(jst.MockBChild.klass().klass().klass(), jst.Metaclass.klass());
	this.assert_sameAs_(jst.MockBChild.klass().klass().klass().klass(), jst.Metaclass);
	//this.assert();
	//this.assert();
};
jst.InheritanceTest.addMethod("testClassChain", "", "testing");

jst.InheritanceTest.constructor.prototype.testInitialize = function() {
	this.assert_sameAs_(this._parent._initialized, "parent");
	this.assert_sameAs_(this._child._initialized, "parent");
	this.assert_sameAs_(this._grandchild._initialized, "parentgrandchild");
};
jst.InheritanceTest.addMethod("testInitialize", "", "testing");

//document.write("<p><pre>" + jst.TestCase.suite().run().print() + "</pre>");
//jst.TestCase.suite().run();
