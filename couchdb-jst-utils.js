/**
 * 
 */

Array.prototype.detect_ = function(aBlock) { 
	for (var i = 0; i < this.length; i++) {
  		if (aBlock(this[i]) == true)
  			return this[i];
	};
  	return null;
};

String.prototype.asJsRegExp_ = function (flags) {
	//Special characters \^$*+?.():=!|{},[] have to be interpreted literally
	var spec = /[\\\^\$\*\+\?\.\(\)\:\=\!\|\{\}\,\[\]]/;
	var pattern = "";
	for (var i = 0; i < this.length; i++) {
		if (spec.test(this.charAt(i)))
			pattern += "\\";
		pattern += this.charAt(i);
	};
	return new RegExp(pattern, flags);
};

String.prototype.includesSubString_caseSensitive_ = function(subString, caseSensitive) {
	if (!caseSensitive)
		return this.search(subString.asJsRegExp_("i")) >= 0;
	return this.indexOf(subString) >= 0;
};