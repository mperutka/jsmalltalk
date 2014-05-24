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
 * Depends on jst-core, jst-core-proxy, jst-parser, jst-kernel, jst-dom
 */

jst.currentJsFile = "jst-couchdb";

jst.Object.subclass("CouchDB", "url request urlFixed responseObject error sessionInfo userInfo onResponse", "", "", "CouchDB");

jst.Object.subclass("CouchDBDatabase", "name server", "", "", "CouchDB");

jst.Dictionary.subclass("CouchDBObject", "owner valueWrapper", "", "", "CouchDB");

jst.CouchDBObject.subclass("CouchDBDocument", "parsedObject", "", "", "CouchDB");
jst.CouchDBDocument.subclass("CouchDBDesignDoc", "", "", "", "CouchDB");

jst.CouchDBObject.subclass("CouchDBView", "name data urlParams queryParams json addId", "", "", "CouchDB");
jst.CouchDBObject.subclass("CouchDBAttachment", "name", "", "", "CouchDB");

jst.Dictionary.subclass("CouchDBViewRow", "", "", "", "CouchDB");

jst.Object.subclass("CouchDBList", "doc name fce view urlParams queryParams json", "", "", "CouchDB");

jst.CouchDBView.subclass("CouchDBTempView", "", "", "", "CouchDB");

jst.Error.subclass("CouchDBError", "key", "", "", "CouchDB");
jst.CouchDBError.subclass("CouchDBLoginError", "", "", "", "CouchDB");

jst.Url.subclass("JsonUrl", "", "", "", "CouchDB");

//*** JsonUrl ***

jst.JsonUrl._class.addMethod("encodeParameter:on:", "anObject aStream", "encoding", 
	"\tanObject isString ifTrue: [" +
	"\n\t\taStream " +
	"\n\t\t\tnextPut: '\"'; " +
	"\n\t\t\tnextPutAll: anObject; " +
	"\n\t\t\tnextPut: '\"'" +
	"\n\t] ifFalse: [" +
	"\n\t\t(anObject class canUnderstand: #do:) ifTrue: [" +
	"\n\t\t\taStream nextPut: '['." +
	"\n\t\t\tanObject do: [:ea | self encodeParameter: ea on: aStream] " +
	"\n\t\t\t\tseparatedBy: [aStream nextPut: $,]." +
	"\n\t\t\taStream nextPut: ']'" +
	"\n\t\t] ifFalse: [" +
	"\n\t\t\tself encode: anObject on: aStream]" +
	"\n\t]",
	null, "2013-07-04T12:19:54Z", "mp");

// *** CouchDB ***

jst.CouchDB._class.instanceVariableNames_("current");

jst.CouchDB._class.addMethod("completeObject:fromDoc:", "obj doc", "util", 
	"\tobj" +
	"\n\t\tinstVarNamed: #id put: (doc at: '_id');" +
	"\n\t\tinstVarNamed: #rev put: (doc at: '_rev')." +
	"\n\t(doc includesKey: '_attachments') ifTrue: [" +
	"\n\t\tobj" +
	"\n\t\t\tinstVarNamed: #attachments " +
	"\n\t\t\tput: (doc at: '_attachments')]." +
	"\n\t^ obj",
	null, "2014-04-18T09:29:55Z", "mp");

jst.CouchDB.addMethod("initialize", "", "initialization", 
	"\turl := Url new addToPath: '/'." +
	"\n\turlFixed := false." +
	"\n\trequest := XMLHttpRequest new onLoad: [:ev |" +
	"\n\t\tresponseObject := JSON default decode: ev target responseText." +
	"\n\t\terror := nil." +
	"\n\t\t(JSObjectProxy isNeededOn: responseObject) ifTrue: [" +
	"\n\t\t\tresponseObject := CouchDBObject on: responseObject." +
	"\n\t\t\tresponseObject at: #error ifPresent: [:err | " +
	"\n\t\t\t\terror := err]]]",
	null, "2012-12-06T10:02:48Z", "mp", 1);

jst.CouchDB.addMethod("initialize", "", "initialization", 
	"\turl := Url new addToPath: '/'." +
	"\n\turlFixed := false." +
	"\n\trequest := XMLHttpRequest new onLoad: [:ev |" +
	"\n\t\tresponseObject := JSON default decode: ev target responseText." +
	"\n\t\terror := nil." +
	"\n\t\t(JSObjectProxy isNeededOn: responseObject) ifTrue: [" +
	"\n\t\t\tresponseObject := CouchDBObject on: responseObject." +
	"\n\t\t\tresponseObject at: #error ifPresent: [:err | " +
	"\n\t\t\t\terror := err]]." +
	"\n\t\tonResponse ifNotNilDo: [:aBlock |" +
	"\n\t\t\tonResponse := nil." +
	"\n\t\t\trequest async: false." +
	"\n\t\t\tself checkError." +
	"\n\t\t\taBlock value: responseObject]]",
	null, "2013-04-21T22:31:32Z", "mp", 1);

jst.CouchDB.addMethod("initialize", "", "initialization", 
	"\turl := Url new addToPath: '/'." +
	"\n\turlFixed := false." +
	"\n\trequest := XMLHttpRequest new onLoad: [:ev |" +
	"\n\t\tresponseObject := JSON default decode: ev target responseText." +
	"\n\t\terror := nil." +
	"\n\t\t(JSObjectProxy isNeededOn: responseObject) ifTrue: [" +
	"\n\t\t\tresponseObject := CouchDBObject on: responseObject." +
	"\n\t\t\tresponseObject at: #error ifPresent: [:err | " +
	"\n\t\t\t\terror := err]]." +
	"\n\t\tonResponse ifNotNilDo: [:aBlock |" +
	"\n\t\t\tonResponse := nil." +
	"\n\t\t\trequest async: false." +
	"\n\t\t\tself checkError." +
	"\n\t\t\taBlock valueWithPossibleArgs: {responseObject. request}]]",
	null, "2013-06-10T14:57:58Z", "mp", 1);

jst.CouchDB.addMethod("initialize", "", "initialization", 
	"\turl := JsonUrl new addToPath: '/'." +
	"\n\turlFixed := false." +
	"\n\trequest := XMLHttpRequest new onLoad: [:ev |" +
	"\n\t\tresponseObject := JSON default decode: ev target responseText." +
	"\n\t\terror := nil." +
	"\n\t\t(JSObjectProxy isNeededOn: responseObject) ifTrue: [" +
	"\n\t\t\tresponseObject := CouchDBObject on: responseObject." +
	"\n\t\t\tresponseObject at: #error ifPresent: [:err | " +
	"\n\t\t\t\terror := err]]." +
	"\n\t\tonResponse ifNotNilDo: [:aBlock |" +
	"\n\t\t\tonResponse := nil." +
	"\n\t\t\trequest async: false." +
	"\n\t\t\tself checkError." +
	"\n\t\t\taBlock valueWithPossibleArgs: {responseObject. request}]]",
	null, "2013-07-04T12:23:11Z", "mp"); //jst-couchdb

jst.CouchDB.addMethod("postCopy", "", "copying", 
	"\tself initialize",
	null, "2013-06-10T08:32:34Z", "mp");

jst.CouchDB.addMethod("host:port:", "aString aNumber", "initialization", 
	"\turl hostname: aString." +
	"\n\turl port: aNumber",
	null, "2012-05-29T18:41:13Z", "mp");

jst.CouchDB.addMethod("errorClass", "", "private", 
	"\t^ (request url isString not and: [request url path last = '_session'])" +
	"\n\t\tifTrue: CouchDBLoginError " +
	"\n\t\tifFalse: CouchDBError",
	null, "2013-06-10T06:21:39Z", "mp");

jst.CouchDB.addMethod("checkError", "", "private", 
	"\terror ifNotNil: [" +
	"\n\t\tself errorClass signal: responseObject on: self]",
	null, "2012-12-19T10:34:08Z", "mp", 1);

jst.CouchDB.addMethod("checkError", "", "private", 
	"\trequest async not & error notNil ifTrue: [" +
	"\n\t\tself errorClass signal: responseObject on: self]",
	null, "2013-04-21T21:12:12Z", "mp");

jst.CouchDB.addMethod("showErrorInfo:", "err", "private", 
	"\tself inform: err",
	null, "2013-04-11T14:28:59Z", "mp");

jst.CouchDB.addMethod("post:data:", "anUrl anObject", "private", 
	"\t| data |" +
	"\n\tdata := String streamContents: [:s | | first |" +
	"\n\t\tfirst := true." +
	"\n\t\tanObject pairsDo: [:key :value |" +
	"\n\t\t\tfirst ifTrue: [first := false] ifFalse: [s nextPut: $&]." +
	"\n\t\t\ts nextPutAll: key asString; " +
	"\n\t\t\t\tnextPut: $=; " +
	"\n\t\t\t\tnextPutAll: value asString]]." +
	"\n\t^ self send: 'POST' url: anUrl header: {" +
	"\n\t\t'Content-type'. 'application/x-www-form-urlencoded'." +
	"\n\t\t'Content-length'. data size} data: data",
	null, "2012-05-20T09:55:18Z", "mp", 1);

jst.CouchDB.addMethod("post:data:", "anUrl anObject", "processing", 
	"\t\"withCredentials has to be true when we make cross-origin login request\"" +
	"\n\trequest " +
	"\n\t\turl: (anUrl ifString: [url with: anUrl]);" +
	"\n\t\tmethod: 'POST';" +
	"\n\t\topen;" +
	"\n\t\twithCredentials: (anUrl isString not and: [anUrl path includes: '_session']);" +
	"\n\t\tsendFormData: anObject." +
	"\n\tself checkError." +
	"\n\t^ responseObject",
	null, "2012-12-10T08:49:54Z", "mp", 2);

jst.CouchDB.addMethod("post:data:", "anUrl anObject", "processing", 
	"\t\"withCredentials has to be true when we make cross-origin login request\"" +
	"\n\trequest " +
	"\n\t\turl: (anUrl ifString: [url with: anUrl]);" +
	"\n\t\tmethod: 'POST';" +
	"\n\t\topen;" +
	"\n\t\twithCredentials: (anUrl isString not and: [anUrl path includes: '_session'])." +
	"\n\tanObject isString " +
	"\n\t\tifTrue: [request sendData: anObject]" +
	"\n\t\tifFalse: [request sendFormData: anObject]." +
	"\n\tself checkError." +
	"\n\t^ responseObject",
	null, "2013-06-10T15:42:52Z", "mp", 3);

jst.CouchDB.addMethod("post:data:", "anUrl anObject", "processing", 
	"\t\"withCredentials has to be true when we make cross-origin login request\"" +
	"\n\trequest " +
	"\n\t\turl: (anUrl ifString: [url with: anUrl]);" +
	"\n\t\tmethod: 'POST';" +
	"\n\t\topen;" +
	"\n\t\twithCredentials: (anUrl isString not and: [anUrl path includes: '_session'])." +
	"\n\tanObject isString " +
	"\n\t\tifTrue: [request " +
	"\n\t\t\theaderAt: 'Content-type' put: 'application/json; charset=utf-8'; " +
	"\n\t\t\tsendData: anObject;" +
	"\n\t\t\tremoveHeader: 'Content-type']" +
	"\n\t\tifFalse: [request sendFormData: anObject]." +
	"\n\tself checkError." +
	"\n\t^ responseObject",
	null, "2014-03-21T11:44:21Z", "mp"); //jst-couchdb

/* 
jst.CouchDB.addMethod("send:url:header:data:", "method anUrl headerDict anObject", "private", 
	"\t| result |" +
	"\n\trequest perform: #open with: method with: (anUrl ifString: [url with: anUrl]) asString with: false." +
	"\n\theaderDict ifNotNil: [" +
	"\n\t\theaderDict pairsDo: [:key :val |" +
	"\n\t\t\trequest perform: #setRequestHeader with: key with: val]]." +
	"\n\trequest perform: #send with: anObject asJsObject." +
	"\n\tresult := JSON default decode: request responseText." +
	"\n\t(JSObjectProxy isNeededOn: result) ifTrue: [" +
	"\n\t\tresult := CouchDBObject on: result." +
	"\n\t\tresult at: #error ifPresent: [:err |" +
	"\n\t\t\tCouchDBError signal: result on: self]]." +
	"\n\t^ result",
	null, "2012-05-29T18:42:38Z", "mp");
*/
jst.CouchDB.addMethod("send:url:data:", "method anUrl anObject", "processing", 
	"\trequest " +
	"\n\t\turl: (anUrl ifString: [url with: anUrl]);" +
	"\n\t\tmethod: method;" +
	"\n\t\topen;" +
	"\n\t\tsendData: anObject." +
	"\n\tself checkError." +
	"\n\t^ responseObject",
	null, "2012-12-06T13:51:56Z", "mp", 1);

jst.CouchDB.addMethod("send:url:data:", "method anUrl anObject", "processing", 
	"\trequest " +
	"\n\t\turl: ((anUrl isString and: [(anUrl includes: $?) not]) " +
	"\n\t\t\tifTrue: [url with: anUrl] " +
	"\n\t\t\tifFalse: anUrl);" +
	"\n\t\tmethod: method;" +
	"\n\t\topen;" +
	"\n\t\tsendData: anObject." +
	"\n\tself checkError." +
	"\n\t^ responseObject",
	null, "2013-05-20T20:48:51Z", "mp");

jst.CouchDB.addMethod("put:data:", "anUrl anObject", "processing", 
	"\t^ self send: 'PUT' url: anUrl data: anObject",
	null, "2012-12-06T13:52:19Z", "mp");

jst.CouchDB.addMethod("get:", "anUrl", "processing", 
	"\t^ self send: 'GET' url: anUrl data: nil",
	null, "2012-12-06T13:53:10Z", "mp");

jst.CouchDB.addMethod("send:url:", "method anUrl", "private", 
	"\t^ self send: method url: anUrl data: nil",
	null, "2012-12-06T13:54:14Z", "mp");

jst.CouchDB._class.addMethod("initialize", "", "class initialization", 
	"\tcurrent := self new",
	null, "2012-05-09T18:54:01Z", "mp");

jst.initializeClass(jst.CouchDB);

jst.CouchDB._class.addMethod("current", "", "accessing", 
	"\t^ current",
	null, "2012-05-09T18:54:14Z", "mp");

jst.CouchDB.addMethod("version", "", "accessing", 
	"\t^ (self get: '') at: #version",
	null, "2012-05-15T09:11:33Z", "mp");

jst.CouchDB.addMethod("uuids:", "aNumber", "accessing", 
	"\t^ (self get: (url copy addToPath: '_uuids'; addParameter: 'count' value: aNumber)) at: #uuids",
	null, "2012-05-29T18:47:13Z", "mp");

jst.CouchDB.addMethod("uuid", "", "accessing", 
	"\t^ (self uuids: 1) first",
	null, "2012-05-13T16:48:40Z", "mp");

jst.CouchDB.addMethod("databaseNames", "", "accessing", 
	"\t^ (self get: '_all_dbs') asArray",
	null, "2012-05-14T19:14:49Z", "mp");

jst.CouchDB.addMethod("databaseNamed:", "aString", "accessing", 
	"\t^ CouchDBDatabase new name: aString; on: self",
	null, "2012-05-15T09:42:57Z", "mp");

jst.CouchDB.addMethod("databaseNamed:", "aString", "accessing", 
	"\turlFixed ifFalse: [ | path |" +
	"\n\t\tpath := Browser window location pathname findTokens: '/'." +
	"\n\t\t(path includes: aString) ifTrue: [" +
	"\n\t\t\t[path first = aString] whileFalse: [" +
	"\n\t\t\t\turl addToPath: path first." +
	"\n\t\t\t\tpath := path allButFirst]" +
	"\n\t\t]." +
	"\n\t\turlFixed := true" +
	"\n\t]." +
	"\n\t^ CouchDBDatabase new name: aString; on: self",
	null, "2012-11-02T10:53:30Z", "mp");

jst.CouchDB.addMethod("configuration", "", "accessing", 
	"\t^ self get: '_config'",
	null, "2012-05-15T14:28:57Z", "mp");

jst.CouchDB.addMethod("url", "", "accessing", 
	"\t^ url",
	null, "2012-05-17T14:08:25Z", "mp");

jst.CouchDB.addMethod("url:", "anUrl", "accessing", 
	"\turl := anUrl",
	null, "2012-12-05T11:08:10Z", "mp");

/*
jst.CouchDB.addMethod("loadObject:", "anUrl", "processing", 
	"\t| dict |" +
	"\n\tself get: anUrl." +
	"\n\tdict := JSON default decodeDict: request responseText." +
	"\n\tresponseObject" +
	"\n\t\tinstVarNamed: 'id' put: (dict at: '_id');" +
	"\n\t\tinstVarNamed: 'rev' put: (dict at: '_rev')." +
	"\n\t^ responseObject",
	null, "2012-12-06T09:25:40Z", "mp");

--- timhle zpusobem neslo do dokumentu nastavit odkaz na databazi
jst.CouchDB.addMethod("loadObject:", "anUrl", "processing", 
	"\t| dict |" +
	"\n\tself get: anUrl." +
	"\n\tdict := JSON default decodeDict: request responseText." +
	"\n\tresponseObject" +
	"\n\t\tinstVarNamed: #id put: (dict at: '_id');" +
	"\n\t\tinstVarNamed: #rev put: (dict at: '_rev')." +
	"\n\t(dict includesKey: '_attachments') ifTrue: [" +
	"\n\t\tresponseObject " +
	"\n\t\t\tinstVarNamed: #attachments " +
	"\n\t\t\tput: (CouchDBDocument on: dict asJsObject) attachments]." +
	"\n\t^ responseObject",
	null, "2013-06-27T12:31:35Z", "mp");
*/

jst.CouchDB.addMethod("loadDocument:", "anUrl", "processing", 
	"\t| dict |" +
	"\n\tself get: anUrl." +
	"\n\tdict := JSON default decodeDict: request responseText." +
	"\n\t^ (CouchDBDocument on: dict asJsObject)" +
	"\n\t\tparsedObject: responseObject",
	null, "2013-06-27T10:24:05Z", "mp");

jst.CouchDB.addMethod("sessionUrl", "", "session", 
	"\t^ url with: '_session'",
	null, "2012-12-09T17:09:11Z", "mp");

/*
jst.CouchDB.addMethod("login:password:", "user passwd", "session", 
	"\t^ self post: '_session' data: {'name'. user. 'password'. passwd}",
	null, "2012-12-09T17:02:49Z", "mp");

jst.CouchDB.addMethod("login:password:secure:", "user passwd aBoolean", "session", 
	"\t| result |" +
	"\n\tresult := self " +
	"\n\t\tpost: (aBoolean ifTrue: [self sessionUrl beSecure] ifFalse: '_session') " +
	"\n\t\tdata: {'name'. user. 'password'. passwd}." +
	"\n\t(result at: #name) ifNil: [" +
	"\n\t\tresult at: #name put: user]." +
	"\n\t^ result",
	null, "2012-12-10T11:07:50Z", "mp");

jst.CouchDB.addMethod("logout", "", "session", 
	"\t^ self send: 'DELETE' url: self sessionUrl",
	null, "2012-05-20T10:11:07Z", "mp");

jst.CouchDB.addMethod("sessionInfo", "", "session", 
	"\t^ self get: self sessionUrl",
	null, "2012-12-19T20:25:41Z", "mp");

jst.CouchDB.addMethod("userInfo", "", "session", 
	"\t^ self sessionInfo at: #userCtx",
	null, "2012-12-19T20:26:09Z", "mp");
*/

jst.CouchDB.addMethod("login:password:secure:", "user passwd aBoolean", "session", 
	"\tself " +
	"\n\t\tpost: (aBoolean ifTrue: [self sessionUrl beSecure] ifFalse: '_session') " +
	"\n\t\tdata: {'name'. user. 'password'. passwd}." +
	"\n\tuserInfo := nil." +
	"\n\tself refreshSessionInfo",
	null, "2012-12-21T21:07:04Z", "mp", 1);

jst.CouchDB.addMethod("login:password:secure:", "user passwd aBoolean", "session", 
	"\tself login: user password: passwd secure: aBoolean async: true",
	null, "2013-09-05T14:01:15Z", "mp"); //jst-couchdb

jst.CouchDB.addMethod("login:password:secure:async:", "user passwd aBoolean asyncBoolean", "session", 
	"\tself " +
	"\n\t\tpost: (aBoolean ifTrue: [self sessionUrl beSecure] ifFalse: '_session') " +
	"\n\t\tdata: {'name'. user. 'password'. passwd}." +
	"\n\tuserInfo := nil." +
	"\n\tself refreshSessionInfoAsync: asyncBoolean",
	null, "2013-09-05T14:00:36Z", "mp");

jst.CouchDB.addMethod("logout", "", "session", 
	"\tself send: 'DELETE' url: self sessionUrl." +
	"\n\tuserInfo := nil." +
	"\n\tself refreshSessionInfo." +
	"\n\tself broadcastEvent: #loggedOut",
	null, "2013-04-12T06:47:50Z", "mp");

jst.CouchDB.addMethod("sessionInfo", "", "session", 
	"\t^ sessionInfo",
	null, "2012-12-21T21:31:53Z", "mp");

jst.CouchDB.addMethod("userInfo", "", "session", 
	"\t^ userInfo",
	null, "2012-12-21T21:31:28Z", "mp");

jst.CouchDB.addMethod("userRoles", "", "session", 
	"\t^ userInfo " +
	"\n\t\tifNotNil: [userInfo at: #roles]" +
	"\n\t\tifNil: #()",
	null, "2013-01-02T13:00:37Z", "mp");

jst.CouchDB.addMethod("refreshSessionInfo", "", "session", 
	"\t| dict old |" +
	"\n\tdict := self get: self sessionUrl." +
	"\n\tsessionInfo := dict at: #info." +
	"\n\told := userInfo." +
	"\n\tuserInfo := dict at: #userCtx." +
	"\n\told ifNil: [" +
	"\n\t\t(userInfo at: #name) ifNotNil: [" +
	"\n\t\t\tself broadcastEvent: #loggedIn]" +
	"\n\t] ifNotNil: [" +
	"\n\t\t(userInfo at: #name) ifNil: [" +
	"\n\t\t\tuserInfo := nil." +
	"\n\t\t\tself broadcastEvent: #loginExpired" +
	"\n\t\t] ifNotNil: [" +
	"\n\t\t\t(userInfo at: #name) = (old at: #name) ifFalse: [" +
	"\n\t\t\t\tself broadcastEvent: #loginChanged]" +
	"\n\t\t]\t" +
	"\n\t]" +
	"\n\t",
	null, "2013-04-12T06:48:07Z", "mp", 1);

jst.CouchDB.addMethod("refreshSessionInfo", "", "session", 
	"\tself refreshSessionInfoAsync: true",
	null, "2013-08-21T12:44:07Z", "mp"); //jst-couchdb

jst.CouchDB.addMethod("refreshSessionInfoAsync:", "aBoolean", "session", 
	"\t| dict old |" +
	"\n\tdict := self get: self sessionUrl." +
	"\n\tsessionInfo := dict at: #info." +
	"\n\told := userInfo." +
	"\n\tuserInfo := dict at: #userCtx." +
	"\n\told ifNil: [" +
	"\n\t\t(userInfo at: #name) ifNotNil: [" +
	"\n\t\t\tself broadcastEvent: #loggedIn with: nil async: aBoolean]" +
	"\n\t] ifNotNil: [" +
	"\n\t\t(userInfo at: #name) ifNil: [" +
	"\n\t\t\tuserInfo := nil." +
	"\n\t\t\tself broadcastEvent: #loginExpired with: nil async: aBoolean" +
	"\n\t\t] ifNotNil: [" +
	"\n\t\t\t(userInfo at: #name) = (old at: #name) ifFalse: [" +
	"\n\t\t\t\tself broadcastEvent: #loginChanged with: nil async: aBoolean]" +
	"\n\t\t]\t" +
	"\n\t]" +
	"\n\t",
	null, "2013-08-21T12:43:37Z", "mp");

jst.CouchDB.addMethod("runAsync:onResponseDo:", "runBlock responseBlock", "private", 
	"\trequest async: true." +
	"\n\tonResponse := responseBlock." +
	"\n\trunBlock valueWithPossibleArgument: self",
	null, "2013-04-21T22:09:39Z", "mp");

jst.CouchDB.addMethod("attachData:to:name:type:", "anObject doc aString mimeType", "processing", 
	"\trequest " +
	"\n\t\theaderAt: 'Content-type' put: mimeType." +
	"\n\t[self put: ((doc url with: aString) asString, '?rev=', doc revision) data: anObject] ensure: [" +
	"\n\t\trequest resetHeader]." +
	"\n\trequest status = 201 ifFalse: [" +
	"\n\t\tself error: request responseText]",
	null, "2013-05-20T21:25:08Z", "mp");

jst.CouchDB.addMethod("abort", "", "processing", 
	"\trequest abort",
	null, "2013-06-11T06:36:24Z", "mp");

jst.CouchDB.addMethod("documentExists:", "anUrl", "processing", 
	"\t^ (XMLHttpRequest new " +
	"\n\t\turl: (anUrl ifString: [url with: anUrl]);" +
	"\n\t\tmethod: 'HEAD';" +
	"\n\t\topen;" +
	"\n\t\tsend;" +
	"\n\t\tstatus) = 200",
	null, "2013-04-11T14:46:11Z", "mp");

// *** CouchDBError ***

jst.CouchDBError.addMethod("key:", "aString", "accessing", 
	"\tkey := aString",
	null, "2012-05-10T14:33:15Z", "mp");

jst.CouchDBError.addMethod("key", "", "accessing", 
	"\t^ key",
	null, "2012-05-10T14:33:23Z", "mp");

jst.CouchDBError.addMethod("description", "", "printing", 
	"\t^ self className, ' [', key, ']: ', messageText",
	null, "2012-05-10T14:38:02Z", "mp", 1);

jst.CouchDBError.addMethod("description", "", "printing", 
	"\t^ self className, ' [', key, ']: ', (messageText truncateWithElipsisTo:  200)",
	null, "2014-03-21T08:43:17Z", "mp"); //jst-couchdb

jst.CouchDBError.addMethod("type", "", "accessing", 
	"\t^ self className, ' [', key, ']'",
	null, "2012-12-19T09:44:07Z", "mp");

jst.CouchDBError.addMethod("informUser", "", "private", 
	"\tkey = #unauthorized ifTrue: [" +
	"\n\t\tUIManager default broadcastEvent: #loggedOut]." +
	"\n\tUIManager default showErrorInfo: self",
	null, "2012-12-19T14:29:40Z", "mp", 1);

jst.CouchDBError.addMethod("informUser", "", "private", 
	"\tkey = #unauthorized ifTrue: [" +
	"\n\t\treceiver refreshSessionInfo]." +
	"\n\tUIManager default showErrorInfo: self",
	null, "2012-12-21T21:16:27Z", "mp", 2);

jst.CouchDBError.addMethod("informUser", "", "private", 
	"\tkey = #unauthorized ifTrue: [" +
	"\n\t\treceiver refreshSessionInfo]." +
	"\n\treceiver showErrorInfo: self",
	null, "2013-04-11T14:20:09Z", "mp");

jst.CouchDBError.addMethod("signal", "", "signaling", 
	"\tself informUser." +
	"\n\tsuper signal",
	null, "2012-12-19T10:59:35Z", "mp");

jst.CouchDBError._class.addMethod("signal:on:", "response anObject", "instance creation", 
	"\t^ self new" +
	"\n\t\tkey: (response at: #error);" +
	"\n\t\tmessageText: (response at: #reason);" +
	"\n\t\treceiver: anObject;" +
	"\n\t\tsignal" +
	"\n\t\t",
	null, "2012-05-10T14:32:54Z", "mp", 1);

jst.CouchDBError._class.addMethod("signal:on:", "response anObject", "instance creation", 
	"\t^ self new" +
	"\n\t\tkey: (response at: #error);" +
	"\n\t\tmessageText: (response at: #reason) asString;" +
	"\n\t\treceiver: anObject;" +
	"\n\t\tsignal" +
	"\n\t\t",
	null, "2014-03-21T08:28:32Z", "mp"); //jst-couchdb

// *** CouchDBLoginError ***

jst.CouchDBLoginError.addMethod("informUser", "", "private", 
	"",
	null, "2012-12-19T10:59:46Z", "mp");

// *** CouchDBDatabase ***

jst.CouchDBDatabase.addMethod("on:", "aCouchDB", "accessing", 
	"\tserver := aCouchDB",
	null, "2012-05-15T09:40:20Z", "mp");

jst.CouchDBDatabase.addMethod("name:", "aString", "accessing", 
	"\tname := aString",
	null, "2012-05-15T09:43:39Z", "mp");

jst.CouchDBDatabase.addMethod("name", "", "accessing", 
	"\t^ name",
	null, "2012-05-15T09:43:50Z", "mp");

jst.CouchDBDatabase.addMethod("url", "", "accessing", 
	"\t^ server url with: name",
	null, "2012-05-29T19:00:23Z", "mp");

jst.CouchDBDatabase.addMethod("create", "", "administration", 
	"\t^ server put: self url data: nil",
	null, "2012-05-15T13:45:56Z", "mp");

jst.CouchDBDatabase.addMethod("delete", "", "administration", 
	"\t^ server send: 'DELETE' url: self url",
	null, "2012-05-15T14:22:13Z", "mp");

jst.CouchDBDatabase.addMethod("storeObject:", "anObject", "documents", 
	"\t| id dict result |" +
	"\n\tid := (anObject instVarNamed: 'id') ifNil: [" +
	"\n\t\tanObject instVarNamed: 'id' put: server uuid]." +
	"\n\tdict := Dictionary on: anObject asJsonObject." +
	"\n\tdict removeKey: 'id' ifAbsent: nil." +
	"\n\t(anObject instVarNamed: 'rev') ifNotNilDo: [:rev |" +
	"\n\t\tdict at: '_rev' put: rev]." +
	"\n\tresult := server put: (self url addToPath: id) data: (JSON default encode: dict asJsObject)." +
	"\n\tanObject instVarNamed: 'rev' put: (result at: 'rev')." +
	"\n\t^ anObject" +
	"\n\t",
	null, "2012-08-01T15:40:30Z", "mp", 1);

jst.CouchDBDatabase.addMethod("storeObject:", "anObject", "documents", 
	"\t| id dict result |" +
	"\n\tid := (anObject instVarNamed: 'id') ifNil: [" +
	"\n\t\tanObject instVarNamed: 'id' put: server uuid]." +
	"\n\tdict := Dictionary on: anObject asJsonObject." +
	"\n\tdict removeKey: 'id' ifAbsent: nil." +
	"\n\t(anObject instVarNamed: 'rev') ifNotNilDo: [:rev |" +
	"\n\t\tdict removeKey: 'rev' ifAbsent: nil." +
	"\n\t\tdict at: '_rev' put: rev]." +
	"\n\t(dict includesKey: 'attachments') ifTrue: [" +
	"\n\t\tdict at: '_attachments' put: (dict removeKey: 'attachments')]." +
	"\n\tresult := server put: (self url addToPath: id) data: (JSON default encode: dict asJsObject)." +
	"\n\tanObject instVarNamed: 'rev' put: (result at: 'rev')." +
	"\n\t^ anObject" +
	"\n\t",
	null, "2013-06-28T12:18:40Z", "mp"); //jst-couchdb

jst.CouchDBDatabase.addMethod("loadObject:", "id", "documents", 
	"\t^ server loadObject: (self url addToPath: id)",
	null, "2012-05-29T19:04:07Z", "mp", 1);

jst.CouchDBDatabase.addMethod("loadObject:", "id", "documents", 
	"\t| doc |" +
	"\n\tdoc := self docNamed: id." +
	"\n\t^ doc parsedObject ifNotNilDo: [:obj |" +
	"\n\t\tobj" +
	"\n\t\t\tinstVarNamed: #id put: (doc at: '_id');" +
	"\n\t\t\tinstVarNamed: #rev put: (doc at: '_rev')." +
	"\n\t\t(doc includesKey: '_attachments') ifTrue: [" +
	"\n\t\t\tobj" +
	"\n\t\t\t\tinstVarNamed: #attachments " +
	"\n\t\t\t\tput: doc attachments]." +
	"\n\t\tobj]",
	null, "2013-06-27T12:57:27Z", "mp", 2);

jst.CouchDBDatabase.addMethod("loadObject:", "id", "documents", 
	"\t| doc |" +
	"\n\tdoc := self docNamed: id." +
	"\n\t^ doc parsedObject ifNotNilDo: [:obj |" +
	"\n\t\tCouchDB completeObject: obj fromDoc: doc]",
	null, "2014-04-18T09:30:58Z", "mp"); //jst-couchdb

jst.CouchDBDatabase.addMethod("deleteObject:", "anObject", "documents", 
	"\tself server send: 'DELETE' url: (self url" +
	"\n\t\taddToPath: (anObject instVarNamed: 'id');" +
	"\n\t\taddParameter: 'rev' value: (anObject instVarNamed: 'rev'))." +
	"\n\tanObject  instVarNamed: 'rev' put: nil." +
	"\n\t^ anObject",
	null, "2012-05-29T19:03:45Z", "mp", 1);

jst.CouchDBDatabase.addMethod("deleteObject:", "anObject", "documents", 
	"\tself server send: 'DELETE' url: (Url new" +
	"\n\t\tcopySameFrom: self url;" +
	"\n\t\taddToPath: (anObject instVarNamed: 'id');" +
	"\n\t\taddParameter: 'rev' value: (anObject instVarNamed: 'rev'))." +
	"\n\tanObject  instVarNamed: 'rev' put: nil." +
	"\n\t^ anObject",
	null, "2013-07-04T12:54:07Z", "mp"); //jst-couchdb

jst.CouchDBDatabase.addMethod("server", "", "accessing", 
	"\t^ server",
	null, "2012-05-16T14:31:18Z", "mp");

jst.CouchDBDatabase.addMethod("database", "", "accessing", 
	"\t^ self",
	null, "2012-05-17T13:58:41Z", "mp");

jst.CouchDBDatabase.addMethod("designDocNamed:", "aString", "documents", 
	"\t^ CouchDBDesignDoc new name: aString; owner: self; load",
	null, "2012-05-16T14:32:05Z", "mp");

jst.CouchDBDatabase.addMethod("docNamed:", "aString", "documents", 
	"\t^ (server loadDocument: (self url with: aString))" +
	"\n\t\towner: self",
	null, "2013-06-26T20:13:40Z", "mp");

jst.CouchDBDatabase.addMethod("createDesignDoc:", "aString", "administration", 
	"\t^ CouchDBDesignDoc new name: aString; owner: self; save",
	null, "2012-05-17T20:53:47Z", "mp");

jst.CouchDBDatabase.addMethod("deleteDesignDoc:", "aString", "administration", 
	"\t(self designDocNamed: aString) delete",
	null, "2012-05-16T15:05:01Z", "mp");

jst.CouchDBDatabase.addMethod("documentExists:", "id", "documents", 
	"\t^ server documentExists: (self url addToPath: id)",
	null, "2013-04-11T14:36:14Z", "mp");

//*** CouchDBObject ***

jst.CouchDBObject.addMethod("owner:", "anObject", "accessing", 
	"\towner := anObject",
	null, "2012-05-16T14:13:07Z", "mp");

jst.CouchDBObject.addMethod("asJsonObject", "", "converting", 
	"\t^ map",
	null, "2012-05-16T14:21:33Z", "mp");

jst.CouchDBObject._class.addMethod("constructFromJson:", "jsonObject", "instance creation", 
	"\t^ self on: jsonObject",
	null, "2012-11-07T13:55:29Z", "mp");

jst.CouchDBObject.addMethod("database", "", "accessing", 
	"\t^ owner database",
	null, "2012-05-17T13:58:27Z", "mp");

jst.CouchDBObject.addMethod("server", "", "accessing", 
	"\t^ owner server",
	null, "2012-05-17T13:59:59Z", "mp");

jst.CouchDBObject.addMethod("valueWrapper:", "aBlock", "accessing", 
	"\tvalueWrapper := aBlock",
	null, "2012-05-18T06:35:48Z", "mp");

jst.CouchDBObject.addMethod("at:ifAbsent:", "key aBlock", "accessing", 
	function (key,aBlock){
	var value = jst.Dictionary.constructor.prototype.at_ifAbsent_.call(this, key, aBlock);
	if (jst.JSObjectProxy.isNeededOn_(value))
		return (this._valueWrapper.notNil()) ? 
			this._valueWrapper.value_value_(key, value) : 
			jst.CouchDBObject.on_(value);
	return value;
},
	null, "2012-05-18T06:39:18Z", "mp", 1);

jst.CouchDBObject.addMethod("at:ifAbsent:", "key aBlock", "accessing", 
	function (key,aBlock){
	var value = jst.Dictionary.constructor.prototype.at_ifAbsent_.call(this, key, aBlock);
	if (jst.JSObjectProxy.isNeededOn_(value) || (value && value.isString() && value.startsWith_("function")))
		return (this._valueWrapper.notNil()) ? 
			this._valueWrapper.value_value_(key, value) : 
			jst.CouchDBObject.on_(value);
	return value;
},
	null, "2013-04-04T13:11:29Z", "mp", 2);

jst.CouchDBObject.addMethod("at:ifAbsent:", "key aBlock", "accessing", 
	function (key,aBlock){
	var value = jst.Dictionary.constructor.prototype.at_ifAbsent_.call(this, key, aBlock);
	if (jst.JSObjectProxy.isNeededOn_(value) || (value && value.isString() && value.startsWith_("function")))
		return (this._valueWrapper.notNil()) ? 
			this._valueWrapper.value_value_(key, value) : 
			((typeof value == "string") ? value : jst.CouchDBObject.on_(value));
	return value;
},
	null, "2014-03-21T08:38:36Z", "mp"); //jst-couchdb

jst.CouchDBObject.addMethod("at:put:", "key anObject", "accessing", 
	"\tsuper at: key put: anObject asJsObject." +
	"\n\t^ self at: key",
	null, "2012-05-17T20:12:38Z", "mp");

jst.CouchDBObject.addMethod("printElementsOn:", "aStream", "printing", 
	"\taStream nextPut: $(." +
	"\n\tself size > 100" +
	"\n\t\tifTrue: [aStream nextPutAll: 'size '." +
	"\n\t\t\tself size printOn: aStream]" +
	"\n\t\tifFalse: [self keysSortedSafely do: [:key | " +
	"\n\t\t\t\taStream print: key" +
	"\n\t\t\t] separatedBy: [aStream lf]" +
	"\n\t\t]." +
	"\n\taStream nextPut: $)",
	null, "2012-05-17T20:35:55Z", "mp");

jst.CouchDBObject.addMethod("asDictionary", "", "converting", 
	"\t^ Dictionary on: self copy asJsObject",
	null, "2012-12-11T20:22:16Z", "mp");

//*** CouchDBDocument ***

jst.CouchDBDocument.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tvalueWrapper := [:key :value | | msg |" +
	"\n\t\tmsg := ((key startsWith: $_) ifTrue: [key allButFirst] ifFalse: key), 'Wrapper'." +
	"\n\t\t(self respondsTo: msg)" +
	"\n\t\t\tifTrue: [(CouchDBObject on: value) " +
	"\n\t\t\t\tvalueWrapper: (self perform: msg)] " +
	"\n\t\t\tifFalse: [CouchDBObject on: value]]",
	null, "2013-06-27T10:16:14Z", "mp");

jst.CouchDBDocument.addMethod("parsedObject", "", "accessing", 
	"\t^ parsedObject",
	null, "2013-06-27T10:23:12Z", "mp");

jst.CouchDBDocument.addMethod("parsedObject:", "anObject", "accessing", 
	"\tparsedObject := anObject",
	null, "2013-06-27T10:23:27Z", "mp");

jst.CouchDBDocument.addMethod("id", "", "accessing", 
	"\t^ self at: '_id'",
	null, "2012-05-16T14:26:53Z", "mp");

jst.CouchDBDocument.addMethod("id:", "aString", "accessing", 
	"\tself at: '_id' put: aString",
	null, "2012-05-18T13:22:28Z", "mp");

jst.CouchDBDocument.addMethod("revision", "", "accessing", 
	"\t^ self at: '_rev' ifAbsent: nil",
	null, "2012-05-16T15:07:27Z", "mp");

jst.CouchDBDocument.addMethod("url", "", "accessing", 
	"\t^ owner url addToPath: self id",
	null, "2012-05-29T19:40:18Z", "mp");

jst.CouchDBDocument.addMethod("save", "", "management", 
	"\t| result |" +
	"\n\tresult := self server put: self url data: (JSON default encode: self)." +
	"\n\tself at: '_rev' put: (result at: 'rev')",
	null, "2012-05-17T20:54:51Z", "mp");

jst.CouchDBDocument.addMethod("delete", "", "management", 
	"\tself server send: 'DELETE' url: (self url addParameter: 'rev' value: self revision)." +
	"\n\tself removeKey: '_rev'",
	null, "2012-05-29T19:40:53Z", "mp");

jst.CouchDBDocument.addMethod("attachments", "", "accessing", 
	"\t^ self at: '_attachments' ifPresent: [:dict | dict keys]",
	null, "2012-05-17T19:55:19Z", "mp", 1);

jst.CouchDBDocument.addMethod("attachments", "", "accessing", 
	"\t^ self at: '_attachments' ifAbsent: nil",
	null, "2013-06-27T12:26:03Z", "mp");

jst.CouchDBDocument.addMethod("attachData:name:type:", "anObject aString mimeType", "management", 
	"\tself server attachData: anObject to: self name: aString type: mimeType",
	null, "2013-05-20T21:25:16Z", "mp");

jst.CouchDBDocument.addMethod("attachmentsWrapper", "", "private", 
	"\t^ [:key :value | " +
	"\n\t\t(CouchDBAttachment on: value) " +
	"\n\t\t\tname: key; " +
	"\n\t\t\towner: self]",
	null, "2013-06-27T09:51:13Z", "mp");

jst.CouchDBDocument.addMethod("attachmentNamed:", "aString", "accessing", 
	"\t^ self at: '_attachments' ifPresent: [:dict |" +
	"\n\t\tdict at: aString ifPresent: [:v | " +
	"\n\t\t\tv]]",
	null, "2013-08-27T09:25:34Z", "mp");

//*** CouchDBDesignDoc ***

jst.CouchDBDesignDoc.addMethod("name:", "aString", "accessing", 
	"\tself at: '_id' put: '_design/', aString",
	null, "2012-05-16T14:11:01Z", "mp");

jst.CouchDBDesignDoc.addMethod("name", "", "accessing", 
	"\t^ (self at: '_id') copyAfter: $/",
	null, "2012-05-16T14:28:31Z", "mp");

jst.CouchDBDesignDoc.addMethod("load", "", "management", 
	"\tmap := (self server get: self url) asJsObject",
	null, "2012-05-17T14:20:16Z", "mp");

jst.CouchDBDesignDoc.addMethod("views", "", "accessing", 
	"\t^ self at: 'views' ifPresent: [:dict | dict keys]",
	null, "2012-05-17T19:54:25Z", "mp");

jst.CouchDBDesignDoc.addMethod("viewsWrapper", "", "private", 
	"\t^ [:key :value | " +
	"\n\t\t(CouchDBView on: value) " +
	"\n\t\t\tname: key; " +
	"\n\t\t\towner: self]",
	null, "2012-05-18T06:49:59Z", "mp");
/*
jst.CouchDBDesignDoc.addMethod("viewNamed:", "aString", "accessing", 
	"\t| views dict |" +
	"\n\tviews := self at: #views ifAbsentPut: [Dictionary new]." +
	"\n\tdict := views at: aString ifAbsentPut: [Dictionary new]." +
	"\n\t^ (CouchDBView on: dict asJsObject) " +
	"\n\t\tname: aString; " +
	"\n\t\towner: self",
	null, "2012-05-17T20:16:46Z", "mp");

jst.CouchDBDesignDoc.addMethod("viewNamed:", "aString", "accessing", 
	"\t^ (self at: #views ifAbsentPut: [Dictionary new])" +
	"\n\t\tat: aString ifAbsentPut: [Dictionary new]",
	null, "2012-05-18T07:14:19Z", "mp");
*/

jst.CouchDBDesignDoc.addMethod("viewNamed:", "aString", "accessing", 
	"\tself at: #views ifPresent: [:dict |" +
	"\n\t\tdict at: aString ifPresent: [:v | " +
	"\n\t\t\t^ v]]." +
	"\n\t^ CouchDBTempView new name: aString; owner: self",
	null, "2012-05-25T15:11:14Z", "mp");

jst.CouchDBDesignDoc.addMethod("listsWrapper", "", "private", 
	"\t^ [:key :value | " +
	"\n\t\tCouchDBList new" +
	"\n\t\t\tdoc: self" +
	"\n\t\t\tname: key" +
	"\n\t\t\tfunction: value]",
	null, "2013-04-04T13:18:56Z", "mp");

jst.CouchDBDesignDoc.addMethod("listNamed:", "aString", "accessing", 
	"\tself at: #lists ifPresent: [:dict |" +
	"\n\t\tdict at: aString ifPresent: [:v | " +
	"\n\t\t\t^ v]]." +
	"\n\t^ CouchDBList new doc: self name: aString function: nil",
	null, "2013-04-04T13:30:09Z", "mp");

//*** CouchDBAttachment ***

jst.CouchDBAttachment.addMethod("name:", "aString", "accessing", 
	"\tname := aString",
	null, "2013-06-27T09:50:28Z", "mp");

jst.CouchDBAttachment.addMethod("name", "", "accessing", 
	"\t^ name",
	null, "2013-06-27T09:50:35Z", "mp");

jst.CouchDBAttachment.addMethod("size", "", "accessing", 
	"\t^ self at: #length" +
	"\n\t",
	null, "2013-06-27T10:18:26Z", "mp");

jst.CouchDBAttachment.addMethod("printOn:", "s", "printing", 
	"\ts nextPutAll: 'an Attachment('; print: name." +
	"\n\ts nextPutAll: ' ', self size printFileSize, ')'",
	null, "2013-06-27T10:21:55Z", "mp");

jst.CouchDBAttachment.addMethod("contentType", "", "accessing", 
	"\t^ self at: 'content_type'",
	null, "2013-06-27T10:26:17Z", "mp");

jst.CouchDBAttachment.addMethod("isStub", "", "accessing", 
	"\t^ self at: #stub",
	null, "2013-06-27T10:26:35Z", "mp");

jst.CouchDBAttachment.addMethod("url", "", "accessing", 
	"\t^ owner url with: name",
	null, "2013-06-27T10:27:56Z", "mp");

jst.CouchDBAttachment.addMethod("loadContents", "", "accessing", 
	"\t(self contentType startsWith: 'text') ifTrue: [ | xhr |" +
	"\n\t\txhr := XMLHttpRequest new " +
	"\n\t\t\turl: self url;" +
	"\n\t\t\tmethod: 'GET';" +
	"\n\t\t\topen;" +
	"\n\t\t\tsend." +
	"\n\t\t^ xhr responseText" +
	"\n\t]." +
	"\n\t(self contentType startsWith: 'image') ifTrue: [" +
	"\n\t\t^ HTMLImageElement new src: self url]." +
	"\n\t^ nil",
	null, "2013-08-27T09:50:29Z", "mp"); //jst-couchdb

// *** CouchDBViewRow ***

jst.CouchDBViewRow.addMethod("id", "", "accessing", 
	"\t^ self at: #id",
	null, "2013-11-30T21:47:47Z", "mp");

jst.CouchDBViewRow.addMethod("key", "", "accessing", 
	"\t^ self at: #key",
	null, "2013-11-30T21:47:55Z", "mp");

jst.CouchDBViewRow.addMethod("value", "", "accessing", 
	"\t^ self at: #value",
	null, "2013-11-30T21:47:19Z", "mp");

jst.CouchDBViewRow.addMethod("value:", "anObject", "accessing", 
	"\tself at: #value put: anObject",
	null, "2013-11-30T21:47:06Z", "mp");

jst.CouchDBViewRow.addMethod("doc", "", "accessing", 
	"\t^ self at: #doc",
	null, "2013-12-01T14:12:16Z", "mp");

// *** CouchDBView ***

/*
jst.CouchDBView.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tjson := JSON new rawObjectClass: Dictionary",
	null, "2012-06-15T21:25:23Z", "mp");
*/
jst.CouchDBView.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tjson := JSON full." +
	"\n\taddId := false",
	null, "2013-11-30T22:40:14Z", "mp");

jst.CouchDBView.addMethod("dataClass:", "aClass", "accessing", 
	"\tjson := JSON new rawObjectClass: aClass." +
	"\n\taddId := aClass canUnderstand: #id:",
	null, "2013-11-30T22:41:22Z", "mp"); //jst-couchdb

jst.CouchDBView.addMethod("urlParams", "", "accessing", 
	"\t^ urlParams ifNil: [" +
	"\n\t\turlParams := Dictionary new]",
	null, "2012-05-27T20:47:07Z", "mp");

jst.CouchDBView.addMethod("setParameter:value:", "aString anObject", "private", 
	"\tanObject = false | anObject isNil " +
	"\n\t\tifFalse: [self urlParams at: aString put: anObject]" +
	"\n\t\tifTrue: [self urlParams removeKey: aString ifAbsent: nil]",
	null, "2012-05-30T19:30:52Z", "mp");

jst.CouchDBView.addMethod("includeDocs:", "aBoolean", "parameters", 
	"\tself setParameter: 'include_docs' value: aBoolean",
	null, "2012-05-30T19:35:32Z", "mp");

jst.CouchDBView.addMethod("includeDocs", "", "parameters", 
	"\t^ self urlParams at: 'include_docs' ifAbsent: false",
	null, "2014-04-18T09:15:51Z", "mp");

jst.CouchDBView.addMethod("descending:", "aBoolean", "parameters", 
	"\tself setParameter: 'descending' value: aBoolean",
	null, "2012-05-30T19:36:01Z", "mp");

jst.CouchDBView.addMethod("startKey:", "anObject", "parameters", 
	"\tself setParameter: #startkey value: anObject",
	null, "2012-05-30T19:37:00Z", "mp");

jst.CouchDBView.addMethod("endKey:", "anObject", "parameters", 
	"\tself setParameter: #endkey value: anObject",
	null, "2012-05-30T19:37:21Z", "mp");

jst.CouchDBView.addMethod("removeParameters", "", "accessing", 
	"\turlParams := nil",
	null, "2012-05-30T19:43:17Z", "mp");

jst.CouchDBView.addMethod("url", "", "accessing", 
	"\t^ owner url " +
	"\n\t\taddToPath: '_view'; " +
	"\n\t\taddToPath: name;" +
	"\n\t\tparameters: urlParams",
	null, "2012-05-29T19:44:28Z", "mp");

jst.CouchDBView.addMethod("name", "", "accessing", 
	"\t^ name",
	null, "2012-05-17T14:18:58Z", "mp");

jst.CouchDBView.addMethod("name:", "aString", "accessing", 
	"\tname := aString",
	null, "2012-05-17T14:19:10Z", "mp");

jst.CouchDBView.addMethod("data", "", "accessing", 
	"\t^ data",
	null, "2012-05-18T07:24:17Z", "mp");

/*
jst.CouchDBView.addMethod("queryData", "", "processing", 
	"\t^ ((self server get: self url) at: 'rows') collect: [:ea | json convertFromJson: ea]",
	null, "2012-06-13T18:04:49Z", "mp");

jst.CouchDBView.addMethod("queryData", "", "processing", 
	"\t^ ((self server get: self url) at: 'rows') collect: [:ea | " +
	"\n\t\tDictionary constructFromJson: ea]",
	null, "2012-11-07T20:19:08Z", "mp");
*/
jst.CouchDBView.addMethod("queryData", "", "processing", 
	"\t^ ((self server get: self url) at: 'rows') collect: [:ea | " +
	"\n\t\tJSON full convertFromJson: ea]",
	null, "2013-04-04T14:19:36Z", "mp", 1);

jst.CouchDBView.addMethod("queryData", "", "processing", 
	"\t^ ((self server get: self url) at: 'rows') collect: [:ea | | row |" +
	"\n\t\trow := CouchDBViewRow on: ea." +
	"\n\t\trow value: (json convertFromJson: row value)." +
	"\n\t\taddId ifTrue: [" +
	"\n\t\t\trow value id: row id]." +
	"\n\t\trow]",
	null, "2013-11-30T23:02:30Z", "mp", 1);

jst.CouchDBView.addMethod("queryData", "", "processing", 
	"\t^ ((self server get: self url) at: 'rows') collect: [:ea | | row |" +
	"\n\t\trow := CouchDBViewRow on: ea." +
	"\n\t\trow value: (json convertFromJson: row value)." +
	"\n\t\taddId ifTrue: [" +
	"\n\t\t\trow value id: row id]." +
	"\n\t\trow at: #doc ifPresent: [:doc |" +
	"\n\t\t\trow at: #doc put: (json convertFromJson: doc)]." +
	"\n\t\trow]",
	null, "2013-12-01T14:16:05Z", "mp", 1);

jst.CouchDBView.addMethod("queryData", "", "processing", 
	"\t| proxy |" +
	"\n\tself includeDocs ifTrue: [" +
	"\n\t\tproxy := JSObjectProxy new]." +
	"\n\t^ ((self server get: self url) at: 'rows') collect: [:ea | | row |" +
	"\n\t\trow := CouchDBViewRow on: ea." +
	"\n\t\trow value: (json convertFromJson: row value)." +
	"\n\t\taddId ifTrue: [" +
	"\n\t\t\trow value id: row id]." +
	"\n\t\trow at: #doc ifPresent: [:doc |" +
	"\n\t\t\trow at: #doc put: (CouchDB " +
	"\n\t\t\t\tcompleteObject: (json convertFromJson: doc) " +
	"\n\t\t\t\tfromDoc: (proxy jsObject: doc))]." +
	"\n\t\trow]",
	null, "2014-04-18T09:32:51Z", "mp", 1);

jst.CouchDBView.addMethod("queryData", "", "processing", 
	"\t| proxy result |" +
	"\n\tself includeDocs ifTrue: [" +
	"\n\t\tproxy := JSObjectProxy new]." +
	"\n\tresult := queryParams ifNil: [self server get: self url] ifNotNil: [" +
	"\n\t\tself server post: self url data: (JSON default encode: queryParams asJsObject)]." +
	"\n\t^ (result at: 'rows') collect: [:ea | | row |" +
	"\n\t\trow := CouchDBViewRow on: ea." +
	"\n\t\trow value: (json convertFromJson: row value)." +
	"\n\t\taddId ifTrue: [" +
	"\n\t\t\trow value id: row id]." +
	"\n\t\trow at: #doc ifPresent: [:doc |" +
	"\n\t\t\trow at: #doc put: (CouchDB " +
	"\n\t\t\t\tcompleteObject: (json convertFromJson: doc) " +
	"\n\t\t\t\tfromDoc: (proxy jsObject: doc))]." +
	"\n\t\trow]",
	null, "2014-05-16T21:16:53Z", "mp"); //jst-couchdb

jst.CouchDBView.addMethod("run", "", "processing", 
	"\tdata:= self queryData",
	null, "2012-05-30T19:56:27Z", "mp");
/*
jst.CouchDBView.addMethod("convertFromJson:", "jsonObject", "private", 
	function (jsonObject){
	//return jst.superSend(this, "convertFromJson_", [jsonObject.value], jst.CouchDBView);
	//return jst.Object.convertFromJson_.call(this, jsonObject.value);
	var obj = jst.Object.convertFromJson_(jsonObject.value);
	if (obj === jsonObject.value && jst.JSObjectProxy.isNeededOn_(obj))
		return jst.Dictionary.constructFromJson_(obj);
	return obj;
},
	null, "2012-05-29T20:34:32Z", "mp");

jst.CouchDBView.addMethod("convertFromJson:", "jsonObject", "private", function (jsonObject){
	if (!jsonObject.value && !jsonObject.doc)
		return jsonObject.id;
	var srcObj = jsonObject.doc || jsonObject.value;
	var obj = jst.Object.convertFromJson_(srcObj);
	if (obj === srcObj && jst.JSObjectProxy.isNeededOn_(obj))
		return jst.Dictionary.constructFromJson_(obj);
	if (srcObj._rev)
		obj._rev = srcObj._rev;
	return obj;
},
	null, "2012-06-07T09:22:13Z", "mp");

jst.CouchDBView.addMethod("convertFromJson:", "jsonObject", "private", 
	function (jsonObject){
	if (!jsonObject.value && !jsonObject.doc)
		return jsonObject.id;
	var srcObj = jsonObject.value || jsonObject.doc;
	var obj = jst.Object.convertFromJson_(srcObj);
	if (obj === srcObj && jst.JSObjectProxy.isNeededOn_(obj)) {
		obj = jst.Dictionary.constructFromJson_(obj);
		if (jsonObject.doc) {
			obj.removeKey_ifAbsent_("_id", jst.nil);
			obj.at_put_("doc", jst.Object.convertFromJson_(jsonObject.doc))._rev = jsonObject.doc._rev;
			return obj;			
		};
	}
	else if (srcObj._rev)
		obj._rev = srcObj._rev;
	return obj;
},
	null, "2012-06-12T15:35:47Z", "mp");
*/
jst.CouchDBView.addMethod("designDoc", "", "accessing", 
	"\t^ owner",
	null, "2012-05-25T08:52:00Z", "mp");

/*
jst.CouchDBView.addMethod("lookupKey:", "anObject", "querying", 
	"\tself urlParams at: 'key' put: anObject asJsObject." +
	"\n\tself run." +
	"\n\turlParams removeKey: 'key'",
	null, "2012-05-29T21:46:07Z", "mp");

jst.CouchDBView.addMethod("lookupKeyFrom:to:", "obj1 obj2", "processing", 
	"\tobj1 ifNotNil: [" +
	"\n\t\tself urlParams at: 'startkey' put: obj1 asJsObject]." +
	"\n\tobj2 ifNotNil: [" +
	"\n\t\tself urlParams at: 'endkey' put: obj2 asJsObject]." +
	"\n\t[self run] ensure: [" +
	"\n\t\turlParams removeKey: 'startkey' ifAbsent: nil." +
	"\n\t\turlParams removeKey: 'endkey' ifAbsent: nil]." +
	"\n\t^ data",
	null, "2012-05-30T10:15:33Z", "mp");

jst.CouchDBView.addMethod("lookupKey:", "anObject", "processing", 
	"\t| params result |" +
	"\n\tparams := urlParams." +
	"\n\turlParams := nil." +
	"\n\tself urlParams at: 'key' put: anObject asJsObject." +
	"\n\t(params notNil and: [params includesKey: 'include_docs']) ifTrue: [" +
	"\n\t\tself includeDocs: true]." +
	"\n\tresult := #()." +
	"\n\t[result := self queryData] ensure: [" +
	"\n\t\turlParams := params]." +
	"\n\t^ result",
	null, "2012-05-30T21:01:55Z", "mp");
*/

jst.CouchDBView.addMethod("lookupKey:", "anObject", "processing", 
	"\t^ self queryDataBy: {'key'. anObject asJsObject}",
	null, "2013-05-17T09:21:05Z", "mp");

jst.CouchDBView.addMethod("lookupKeys:", "aCollection", "processing", 
	"\t^ self queryDataBy: {'keys'. aCollection asCollection asJsObject}",
	null, "2013-05-17T09:20:28Z", "mp", 1);

jst.CouchDBView.addMethod("lookupKeys:", "aCollection", "processing", 
	"\t^ aCollection size > 20 ifTrue: [ | tmp |" +
	"\n\t\tqueryParams := Dictionary new" +
	"\n\t\t\tat: 'keys' put: aCollection asCollection;" +
	"\n\t\t\tyourself." +
	"\n\t\t(urlParams notNil and: [urlParams includesKey: #'include_docs']) ifTrue: [" +
	"\n\t\t\tqueryParams at: #'include_docs' put: (urlParams at: #'include_docs')]." +
	"\n\t\ttmp := urlParams." +
	"\n\t\turlParams := nil." +
	"\n\t\t[self queryData] ensure: [" +
	"\n\t\t\turlParams := tmp]" +
	"\n\t] ifFalse: [" +
	"\n\t\tqueryParams := nil." +
	"\n\t\tself queryDataBy: {'keys'. aCollection asCollection asJsObject}]",
	null, "2014-05-16T21:16:06Z", "mp", 1); //jst-couchdb

//include_docs se musi predat v url, ponecham jej tedy v urlParams
jst.CouchDBView.addMethod("lookupKeys:", "aCollection", "processing", 
	"\t^ aCollection size > 20 ifTrue: [" +
	"\n\t\tqueryParams := Dictionary new" +
	"\n\t\t\tat: 'keys' put: aCollection asCollection;" +
	"\n\t\t\tyourself." +
	"\n\t\tself queryData" +
	"\n\t] ifFalse: [" +
	"\n\t\tqueryParams := nil." +
	"\n\t\tself queryDataBy: {'keys'. aCollection asCollection asJsObject}]",
	null, "2014-05-21T09:23:42Z", "mp"); //jst-couchdb

jst.CouchDBView.addMethod("queryDataBy:", "params", "processing", 
	"\t| tmp result |" +
	"\n\ttmp := urlParams." +
	"\n\turlParams := params asDictionary." +
	"\n\t(tmp notNil and: [(urlParams includesKey: #'include_docs') not]) ifTrue: [" +
	"\n\t\ttmp at: #'include_docs' ifPresent: [:bool |" +
	"\n\t\t\tself includeDocs: bool]]." +
	"\n\tresult := #()." +
	"\n\t[result := self queryData] ensure: [" +
	"\n\t\turlParams := tmp]." +
	"\n\t^ result",
	null, "2013-05-17T09:18:58Z", "mp");

jst.CouchDBView.addMethod("listNamed:", "aString", "lists", 
	"\t^ (self designDoc listNamed: aString) view: name",
	null, "2013-04-04T13:32:57Z", "mp");

// *** CouchDBTempView ***

jst.CouchDBTempView.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tsuper at: 'map' put: (self class lookupSelector: #'map:') asBlock asString", //'function (doc) {\\n\\temit(null, doc);\\n}'
	null, "2012-09-17T11:30:32Z", "mp");

jst.CouchDBTempView.addMethod("map:", "doc", "map-reduce", function (doc){
	emit(null, doc);
},
	null, "2012-05-25T12:35:56Z", "mp");

jst.CouchDBTempView.addMethod("reduceKeys:values:rereduce:", "keys values aBoolean", "map-reduce", 
	function (keys,values,aBoolean)
{},
	null, "2012-05-25T19:40:56Z", "mp");

jst.CouchDBTempView._class.addMethod("load:from:", "name designDoc", "as yet unclassified", function (name,designDoc){
	var view = designDoc.viewNamed_(name);
	if (view.includesKey_("map")) {
		var m = this.addMethod("map:", "doc", "map-reduce", eval("(" + view.at_("map") + ")"), 
			null, jst.DateAndTime.now(), jst.Smalltalk.at_ifAbsent_("user", jst.nil));
		if (jst.ExtComponentMgr)
			jst.snd(jst.ExtComponentMgr, "default").sendEvent_with_("methodModified:usingEditor:", [m, jst.nil]);
	};
	return view.as_(this);
},
	null, "2012-05-25T14:08:01Z", "mp");

jst.CouchDBTempView.addMethod("save", "", "processing", 
	"\t(self class methodsInCategory: 'map-reduce') do: [:m |" +
	"\n\t\tm priorVersion ifNotNil: [ | fce |" +
	"\n\t\t\tfce := (m selector startsWith: 'map') " +
	"\n\t\t\t\tifTrue: 'map' " +
	"\n\t\t\t\tifFalse: [(m asBlock asString includesSubString: '{}') ifFalse: 'reduce']." +
	"\n\t\t\tfce ifNotNil: [" +
	"\n\t\t\t\tself at: fce put: m asBlock asString]]]." +
	"\n\t(owner at: #views ifAbsentPut: [Dictionary new])" +
	"\n\t\tat: name ifAbsentPut: [self]." +
	"\n\towner save",
	null, "2012-06-01T06:57:56Z", "mp");

// *** CouchDBList ***

jst.CouchDBList.addMethod("initialize", "", "initialization", 
	"\tjson := JSON full",
	null, "2013-11-30T17:46:54Z", "mp");

jst.CouchDBList.addMethod("dataClass:", "aClass", "accessing", 
	"\tjson := JSON new rawObjectClass: aClass",
	null, "2013-11-30T17:50:43Z", "mp");

jst.CouchDBList.addMethod("doc:name:function:", "designDoc aString fceString", "accessing", 
	"\tdoc:= designDoc." +
	"\n\tname := aString." +
	"\n\tfce := fceString ifNil: ['function(head, req) {}']",
	null, "2013-04-04T13:18:32Z", "mp");

jst.CouchDBList.addMethod("printOn:", "s", "printing", 
	"\tsuper printOn: s." +
	"\n\ts nextPut: $(; " +
	"\n\t\tprint: name; " +
	"\n\t\tnextPut: $)",
	null, "2013-04-04T13:20:34Z", "mp");

jst.CouchDBList.addMethod("url", "", "accessing", 
	"\t^ doc url " +
	"\n\t\taddToPath: '_list'; " +
	"\n\t\taddToPath: name;" +
	"\n\t\taddToPath: view;" +
	"\n\t\tparameters: urlParams",
	null, "2013-04-04T13:26:44Z", "mp");

jst.CouchDBList.addMethod("view:", "aString", "accessing", 
	"\tview := aString",
	null, "2013-04-04T13:31:04Z", "mp");

jst.CouchDBList.addMethod("urlParams:", "aDictionary", "accessing", 
	"\turlParams := aDictionary asDictionary",
	null, "2013-04-04T13:41:36Z", "mp");

jst.CouchDBList.addMethod("queryParams:", "anObject", "accessing", 
	"\tqueryParams := anObject",
	null, "2013-06-10T15:21:15Z", "mp", 1);

jst.CouchDBList.addMethod("queryParams:", "anObject", "accessing", 
	"\t\"If set, POST will be send instead of GET\"" +
	"\n\tqueryParams := anObject",
	null, "2014-03-21T09:07:18Z", "mp"); //jst-couchdb

jst.CouchDBList.addMethod("queryData", "", "processing", 
	"\t| data |" +
	"\n\tdata := doc server get: self url." +
	"\n\tdata at: #rows ifPresent: [:rows |" +
	"\n\t\tdata := rows collect: [:ea | JSON full convertFromJson: ea]]." +
	"\n\t^ data",
	null, "2013-04-04T14:18:07Z", "mp", 1);

jst.CouchDBList.addMethod("queryData", "", "processing", 
	"\t| data |" +
	"\n\tdata := doc server get: self url." +
	"\n\tdata at: #rows ifPresent: [:rows |" +
	"\n\t\tdata := rows collect: [:ea | json convertFromJson: ea]]." +
	"\n\t^ data",
	null, "2013-11-30T17:47:10Z", "mp", 2);

jst.CouchDBList.addMethod("queryData", "", "processing", 
	"\t| data |" +
	"\n\tdata := queryParams ifNil: [doc server get: self url] ifNotNil: [" +
	"\n\t\tdoc server post: self url data: (JSON default encode: queryParams asDictionary asJsObject)]." +
	"\n\tdata at: #rows ifPresent: [:rows |" +
	"\n\t\tdata := rows collect: [:ea | json convertFromJson: ea]]." +
	"\n\t^ data",
	null, "2014-03-21T09:11:57Z", "mp"); //jst-couchdb

jst.CouchDBList.addMethod("asyncQueryDo:", "aBlock", "processing", 
	"\tdoc server runAsync: [:db | db get: self url] onResponseDo: [:data | | converted |" +
	"\n\t\tdata at: #rows ifPresent: [:rows |" +
	"\n\t\t\tconverted := rows collect: [:ea | JSON full convertFromJson: ea]]." +
	"\n\t\taBlock value: (converted ifNil: data)]",
	null, "2013-04-21T21:55:29Z", "mp", 1);

jst.CouchDBList.addMethod("asyncQueryDo:", "aBlock", "processing", 
	"\tdoc server copy runAsync: [:db | db get: self url] onResponseDo: [:data | | converted |" +
	"\n\t\tdata at: #rows ifPresent: [:rows |" +
	"\n\t\t\tconverted := rows collect: [:ea | JSON full convertFromJson: ea]]." +
	"\n\t\taBlock value: (converted ifNil: data)]",
	null, "2013-06-10T08:34:26Z", "mp", 1);

jst.CouchDBList.addMethod("asyncQueryDo:", "aBlock", "processing", 
	"\t^ doc server copy " +
	"\n\t\trunAsync: [:db | queryParams " +
	"\n\t\t\tifNil: [db get: self url]" +
	"\n\t\t\tifNotNil: [" +
	"\n\t\t\t\tdb post: self url data: (JSON default encode: queryParams asDictionary asJsObject)]" +
	"\n\t\t] onResponseDo: [:data :req | " +
	"\n\t\t\t| converted |" +
	"\n\t\t\tdata at: #rows ifPresent: [:rows |" +
	"\n\t\t\t\tconverted := rows collect: [:ea | JSON full convertFromJson: ea]]." +
	"\n\t\t\taBlock valueWithPossibleArgs: {converted ifNil: data. req}" +
	"\n\t\t]",
	null, "2013-06-11T06:37:29Z", "mp", 1);

jst.CouchDBList.addMethod("asyncQueryDo:", "aBlock", "processing", 
	"\t^ doc server copy " +
	"\n\t\trunAsync: [:db | queryParams " +
	"\n\t\t\tifNil: [db get: self url]" +
	"\n\t\t\tifNotNil: [" +
	"\n\t\t\t\tdb post: self url data: (JSON default encode: queryParams asDictionary asJsObject)]" +
	"\n\t\t] onResponseDo: [:data :req | " +
	"\n\t\t\t| converted |" +
	"\n\t\t\tdata at: #rows ifPresent: [:rows |" +
	"\n\t\t\t\tconverted := rows collect: [:ea | json convertFromJson: ea]]." +
	"\n\t\t\taBlock valueWithPossibleArgs: {converted ifNil: data. req}" +
	"\n\t\t]",
	null, "2013-11-30T18:02:51Z", "mp"); //jst-couchdb
