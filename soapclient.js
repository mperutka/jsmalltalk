/*****************************************************************************\

 Javascript "SOAP Client" library
 
 @version: 2.4 - 2007.12.21
 @author: Matteo Casati - http://www.guru4.net/
 
\*****************************************************************************/

SOAPClientParameters = function()
{
	this._pl = {}; //new Array();
};

SOAPClientParameters.prototype = 
{
	add: function(name, value) 
	{
		this._pl[name] = value; 
		return this; 
	},
	toXml: function()
	{
		var xml = "";
		for(var p in this._pl)
		{
			switch(typeof(this._pl[p])) 
			{
                case "string":
                case "number":
                case "boolean":
                case "object":
                    xml += "<" + p + ">" + SOAPClientParameters._serialize(this._pl[p]) + "</" + p + ">";
                    break;
                default:
                    break;
            }
		}
		return xml;	
	}
};

SOAPClientParameters._serialize = function(o)
{
    var s = "";
    switch(typeof(o))
    {
        case "string":
            s += o.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); break;
        case "number":
        case "boolean":
            s += o.toString(); break;
        case "object":
            // Date
            if(o.constructor.toString().indexOf("function Date()") > -1)
            {
        
                var year = o.getFullYear().toString();
                var month = (o.getMonth() + 1).toString(); month = (month.length == 1) ? "0" + month : month;
                var date = o.getDate().toString(); date = (date.length == 1) ? "0" + date : date;
                var hours = o.getHours().toString(); hours = (hours.length == 1) ? "0" + hours : hours;
                var minutes = o.getMinutes().toString(); minutes = (minutes.length == 1) ? "0" + minutes : minutes;
                var seconds = o.getSeconds().toString(); seconds = (seconds.length == 1) ? "0" + seconds : seconds;
                var milliseconds = o.getMilliseconds().toString();
                var tzminutes = Math.abs(o.getTimezoneOffset());
                var tzhours = 0;
                while(tzminutes >= 60)
                {
                    tzhours++;
                    tzminutes -= 60;
                }
                tzminutes = (tzminutes.toString().length == 1) ? "0" + tzminutes.toString() : tzminutes.toString();
                tzhours = (tzhours.toString().length == 1) ? "0" + tzhours.toString() : tzhours.toString();
                var timezone = ((o.getTimezoneOffset() < 0) ? "+" : "-") + tzhours + ":" + tzminutes;
                s += year + "-" + month + "-" + date + "T" + hours + ":" + minutes + ":" + seconds + "." + milliseconds + timezone;
            }
            // Array
            else if(o.constructor.toString().indexOf("function Array()") > -1)
            {
                for(var p = 0; p < o.length; p++)
                {
                    if(!isNaN(p))   // linear array
                    {
                        (/function\s+(\w*)\s*\(/ig).exec(o[p].constructor.toString());
                        var type = RegExp.$1;
                        switch(type)
                        {
                            case "":
                                type = typeof(o[p]);
                            case "String":
                                type = "string"; break;
                            case "Number":
                                type = "int"; break;
                            case "Boolean":
                                type = "bool"; break;
                            case "Date":
                                type = "DateTime"; break;
                        }
                        s += "<" + type + ">" + SOAPClientParameters._serialize(o[p]) + "</" + type + ">";
                    }
                    else    // associative array
                        s += "<" + p + ">" + SOAPClientParameters._serialize(o[p]) + "</" + p + ">";
                }
            }
            // Object or custom function
            else
                for(var p in o)
                    s += "<" + p + ">" + SOAPClientParameters._serialize(o[p]) + "</" + p + ">";
            break;
        default:
            break; // throw new Error(500, "SOAPClientParameters: type '" + typeof(o) + "' is not supported");
    }
    return s;
};

SOAPClient = function(url, method, parameters, async, callback) {
	this.url = url;
	this.method = method;
	this.parameters = parameters || new SOAPClientParameters();
	this.async = async == true; 
	this.callback = callback;
};

SOAPClient.prototype.username = null;
SOAPClient.prototype.password = null;

SOAPClient.prototype.invoke = function()
{
	if(this.async)
		this._loadWsdl;
	else
		return this._loadWsdl();
};

SOAPClient.invoke = function(url, method, parameters, async, callback){
	return (new SOAPClient(url, method, parameters, async, callback)).invoke();
};

// private: wsdl cache
SOAPClient._cacheWsdl = {};//new Array();
SOAPClient._cacheWsdlTypes = {};

// private: invoke async
SOAPClient.prototype._loadWsdl = function()
{
	// load from cache?
	var wsdl = SOAPClient._cacheWsdl[this.url];
	if(wsdl + "" != "" && wsdl + "" != "undefined")
		return this._sendSoapRequest(wsdl);
	// get wsdl
	var xmlHttp = this._getXmlHttp();
	xmlHttp.open("GET", this.url + "?wsdl", this.async);
	if(this.async) 
	{
		xmlHttp.onreadystatechange = function() 
		{
			if(xmlHttp.readyState == 4)
				this._onLoadWsdl(xmlHttp);
		};
	}
	xmlHttp.send(null);
	if (!this.async)
		return this._onLoadWsdl(xmlHttp);
};

SOAPClient.prototype._onLoadWsdl = function(req)
{
	var wsdl = req.responseXML;
	SOAPClient._cacheWsdl[this.url] = wsdl;	// save a copy in cache
	SOAPClient._cacheWsdlTypes[this.url] = this._getTypesFromWsdl(wsdl); // save a copy in cache
	return this._sendSoapRequest(wsdl);
};

SOAPClient.prototype._sendSoapRequest = function(wsdl)
{
	// get namespace
	var ns = (wsdl.documentElement.attributes["targetNamespace"] + "" == "undefined") 
		? wsdl.documentElement.attributes.getNamedItem("targetNamespace").nodeValue 
		: wsdl.documentElement.attributes["targetNamespace"].value;
	// build SOAP request
	var sr = 
				"<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
				"<soap:Envelope " +
				"xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" " +
				"xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" " +
				"xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">" +
				"<soap:Body>" +
				"<" + this.method + " xmlns=\"" + ns + "\">" +
				this.parameters.toXml() +
				"</" + this.method + "></soap:Body></soap:Envelope>";
	// send request
	var xmlHttp = this._getXmlHttp();
	if (this.userName && this.password){
		xmlHttp.open("POST", this.url, this.async, this.userName, this.password);
		// Some WS implementations (i.e. BEA WebLogic Server 10.0 JAX-WS) don't support Challenge/Response HTTP BASIC, so we send authorization headers in the first request
		xmlHttp.setRequestHeader("Authorization", "Basic " + SOAPClient._toBase64(this.userName + ":" + this.password));
	}
	else
		xmlHttp.open("POST", this.url, this.async);
	var soapaction = ((ns.lastIndexOf("/") != ns.length - 1) ? ns + "/" : ns) + this.method;
	xmlHttp.setRequestHeader("SOAPAction", soapaction);
	xmlHttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	if(this.async) 
	{
		xmlHttp.onreadystatechange = function() 
		{
			if(xmlHttp.readyState == 4)
				this._onSendSoapRequest(xmlHttp);
		};
	}
	xmlHttp.send(sr);
	if (!this.async)
		return this._onSendSoapRequest(xmlHttp);
};

SOAPClient.prototype._onSendSoapRequest = function(req) 
{
	this.xmlData = req.responseXML;
	var o = null;
	var nd = this._getElementsByTagName(req.responseXML, this.method + "Response"); //Axis services
	if(nd.length == 0)
		nd = this._getElementsByTagName(req.responseXML, this.method + "Result");
	if(nd.length == 0)
		nd = this._getElementsByTagName(req.responseXML, "return");	// PHP web Service?
	if(nd.length == 0)
	{
		if(req.responseXML.getElementsByTagName("faultcode").length > 0)
		{
		    if(this.async || this.callback)
		        o = new Error(500, req.responseXML.getElementsByTagName("faultstring")[0].childNodes[0].nodeValue);
			else
			    throw new Error(500, req.responseXML.getElementsByTagName("faultstring")[0].childNodes[0].nodeValue);			
		}
	}
	else if (nd.length == 1)
		o = this._soapresult2object(nd[0]);
	else {
		o = [];
		for (var i = 0; i < nd.length; i++)
			o.push(this._soapresult2object(nd[i]));
	} 
	if(this.callback)
		this.callback(o, req.responseXML);
	if(!this.async)
		return o;
};

SOAPClient._getObjectConverter = function(type) {
	return function(obj){return obj;};
};

SOAPClient.prototype._getObjectConverter = function(type) {
	return SOAPClient._getObjectConverter(type);
};

SOAPClient.prototype._soapresult2object = function(node)
{
	var obj = this._node2object(node, SOAPClient._cacheWsdlTypes[this.url]);
	if (obj["return"])
		return obj["return"];
    return this._getObjectConverter(node.localName)(obj);
};

SOAPClient.prototype._node2object = function(node, wsdlTypes)
{
	// null node
	if(node == null)
		return null;
	// text node
	if(node.nodeType == 3 || node.nodeType == 4)
		return this._extractValue(node, wsdlTypes);
	// leaf node
	if (node.childNodes.length == 1 && (node.childNodes[0].nodeType == 3 || node.childNodes[0].nodeType == 4))
		return this._extractValue(node.childNodes[0], wsdlTypes);
	var type = this._getTypeFromWsdl(node.localName, wsdlTypes) || wsdlTypes;
	var isarray = typeof type == "string" && type.toLowerCase().indexOf("arrayof") != -1;
	// object node
	if(isarray) {
		// create node ref
		var l = new Array();
		for(var i = 0; i < node.childNodes.length; i++)
			l.push(this._node2object(node.childNodes[i], wsdlTypes));
		return l;
	}
	else if (node.hasChildNodes() && typeof type == "object") {
		//Axis2
		var obj = new Object();
		for (var tag in type) {
			var convert = null;
			var elltypes = type[tag];
			//type[tag] can be the name of another type or a primitive type
			if (typeof elltypes == "string" && wsdlTypes[elltypes]) {
				//type[tag] is the name of another type
				convert = this._getObjectConverter(elltypes);
				elltypes = wsdlTypes[elltypes];
			}
			else
				convert = function(obj){return obj;};
			var ell = node.getElementsByTagName(tag);
			if (ell.length == 1)
				obj[tag] = convert(this._node2object(ell[0], elltypes));
			else if (ell.length > 1) {
				var arr = [];
				for (var i = 0; i < ell.length; i++)
					arr.push(convert(this._node2object(ell[i], elltypes)));
				obj[tag] = arr;
			}
		}
		return obj;
	}
	else if (node.hasAttributes() && typeof type == "object") {
		//Axis2 - node has atributes instead of child elements
		var obj = new Object();
		for (var tag in type) {
			if (node.hasAttribute(tag))
				obj[tag] = this._parseValue(node.getAttribute(tag), type[tag]);
		}
		return obj;
	}
	// list node
	else {
		var obj = null;
		if(node.hasChildNodes())
			obj = new Object();
		for(var i = 0; i < node.childNodes.length; i++)
		{
			var p = this._node2object(node.childNodes[i], wsdlTypes);
			obj[node.childNodes[i].nodeName] = p;
		}
		return obj;
	}
	return null;
};

SOAPClient.prototype._parseValue = function(nodeValue, nodeType) {
	var value = nodeValue;
	switch(nodeType.toLowerCase())
	{
		default:
		case "string":			
			return (value != null) ? value + "" : "";
		case "boolean":
			return value + "" == "true";
		case "int":
		case "long":
			return (value != null) ? parseInt(value + "", 10) : 0;
		case "double":
			return (value != null) ? parseFloat(value + "") : 0;
		case "datetime":
			if(value == null)
				return null;
			else
			{
				value = value + "";
				value = value.substring(0, (value.lastIndexOf(".") == -1 ? value.length : value.lastIndexOf(".")));
				value = value.replace(/T/gi," ");
				value = value.replace(/-/gi,"/");
				var d = new Date();
				d.setTime(Date.parse(value));										
				return d;				
			}
	}	
	return null;
};

SOAPClient.prototype._extractValue = function(node, wsdlTypes) {
	return this._parseValue(node.nodeValue, 
		this._getTypeFromWsdl(node.parentNode.nodeName, wsdlTypes));
};

SOAPClient.prototype._parseComplexType = function(node) {
	var tp = {};
	var ell = node.getElementsByTagName("element");
	for(var i = 0; i < ell.length; i++) {
		var val = ell[i].attributes["type"].value;
		tp[ell[i].attributes["name"].value] = val.substr(val.indexOf(":")+1);
	}
	return tp;
};

SOAPClient.prototype._getTypesFromWsdl = function(wsdl)
{
	var wsdlTypes = {};
	// IE
	var ell = wsdl.getElementsByTagName("s:element");	
	var useNamedItem = true;
	// Axis2
	if(ell.length == 0) {
		ctp = wsdl.getElementsByTagName("complexType");	     
		for(var i = 0; i < ctp.length; i++) {
			if (ctp[i].attributes["name"] != null)
				wsdlTypes[ctp[i].attributes["name"].value] = this._parseComplexType(ctp[i]); 
			else if (ctp[i].parentNode.attributes["name"].value.indexOf("Response") > 0)
				wsdlTypes[ctp[i].parentNode.attributes["name"].value] = this._parseComplexType(ctp[i]); 				
		}
		return wsdlTypes;
	}
	for(var i = 0; i < ell.length; i++)
	{
		if(useNamedItem)
		{
			if(ell[i].attributes.getNamedItem("name") != null && ell[i].attributes.getNamedItem("type") != null) 
				wsdlTypes[ell[i].attributes.getNamedItem("name").nodeValue] = ell[i].attributes.getNamedItem("type").nodeValue;
		}	
		else
		{
			if(ell[i].attributes["name"] != null && ell[i].attributes["type"] != null)
				wsdlTypes[ell[i].attributes["name"].value] = ell[i].attributes["type"].value;
		}
	}
	return wsdlTypes;
};

SOAPClient.prototype._getTypeFromWsdl = function(elementname, wsdlTypes)
{
    var type = wsdlTypes[elementname];
    return (type+"" == "undefined") ? "" : type;
};

// private: utils
SOAPClient.prototype._getElementsByTagName = function(document, tagName)
{
	try
	{
		// trying to get node omitting any namespaces (latest versions of MSXML.XMLDocument)
		return document.selectNodes(".//*[local-name()=\""+ tagName +"\"]");
	}
	catch (ex) {}
	// old XML parser support
	return document.getElementsByTagName(tagName);
};

// private: xmlhttp factory
SOAPClient.prototype._getXmlHttp = function() 
{
	try
	{
		if(window.XMLHttpRequest) 
		{
			var req = new XMLHttpRequest();
			// some versions of Moz do not support the readyState property and the onreadystate event so we patch it!
			if(req.readyState == null) 
			{
				req.readyState = 1;
				req.addEventListener("load", 
									function() 
									{
										req.readyState = 4;
										if(typeof req.onreadystatechange == "function")
											req.onreadystatechange();
									},
									false);
			}
			return req;
		}
		if(window.ActiveXObject) 
			return new ActiveXObject(SOAPClient._getXmlHttpProgID());
	}
	catch (ex) {}
	throw new Error("Your browser does not support XmlHttp objects");
};

SOAPClient._getXmlHttpProgID = function()
{
	if(SOAPClient._getXmlHttpProgID.progid)
		return SOAPClient._getXmlHttpProgID.progid;
	var progids = ["Msxml2.XMLHTTP.5.0", "Msxml2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"];
	for(var i = 0; i < progids.length; i++)
	{
		try
		{
			new ActiveXObject(progids[i]);
			return SOAPClient._getXmlHttpProgID.progid = progids[i];
		}
		catch (ex) {};
	}
	throw new Error("Could not find an installed XML parser");
};

SOAPClient._toBase64 = function(input)
{
	var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var output = "";
	var chr1, chr2, chr3;
	var enc1, enc2, enc3, enc4;
	var i = 0;

	do {
		chr1 = input.charCodeAt(i++);
		chr2 = input.charCodeAt(i++);
		chr3 = input.charCodeAt(i++);

		enc1 = chr1 >> 2;
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		enc4 = chr3 & 63;

		if (isNaN(chr2)) {
			enc3 = enc4 = 64;
		} else if (isNaN(chr3)) {
			enc4 = 64;
		}

		output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) +
		keyStr.charAt(enc3) + keyStr.charAt(enc4);
	} while (i < input.length);

	return output;
};
