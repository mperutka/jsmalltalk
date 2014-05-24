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

jst.currentJsFile = "jst-files";

// CLASSES

jst.WrapperObject.subclass("FileSystem", "temporary size errors onError", "Request ErrorCodes", "", "Files-File System");

jst.WrapperObject.subclass("FSEntry", "", "", "", "Files-File System");

jst.FSEntry.subclass("FSDirectoryEntry", "", "", "", "Files-File System");

jst.FSEntry.subclass("FSFileEntry", "", "", "", "Files-File System");

jst.WrapperObject.subclass("FSDirectoryReader", "", "", "", "Files-File System");

//Deprecated: jst.WrapperObject.subclass("FSBlobBuilder", "", "", "", "Files-File System");

jst.WrapperObject.subclass("FSFileSaver", "", "", "", "Files-File System");

jst.FSFileSaver.subclass("FSFileWriter", "", "", "", "Files-File System");

jst.WrapperObject.subclass("FSFileReader", "file encoding", "", "", "Files-File System");

jst.WrapperObject.subclass("FSBlob", "", "", "", "Files-File System");

jst.FSBlob.subclass("FSFile", "", "", "", "Files-File System");

jst.WrapperObject.subclass("FSFileList", "", "", "", "Files-File System");

//errors
//jst.WrapperObject.subclass("FSFileError", "", "", "", "Files-File System");
//jst.Error.subclass("FSNotFoundError", "", "", "", "Files-File System");

jst.Object.subclass("FileDirectory", "parent path", "", "", "Files");

jst.Object.subclass("FileStream", "dir stream name handler isBinary forceNew loaded", "", "", "Files");

jst.Object.subclass("FileHandler", "fileStream buffer task prev next state", "", "", "Files");

// extensions

jst.HTMLCanvasElement.addMethod("asBlobDo:", "aBlock", "*files", 
	"\tobj perform: #toBlob with: [:bl | aBlock value: (FSBlob wrap: bl)] with: self type with: quality asJsObject",
	null, "2013-06-20T09:43:48Z", "mp");


// METHODS

// *** FSFileError ***
/*
jst.snd(jst.FSFileError, 'class').instanceVariableNames_("default");

jst.FSFileError._class.addMethod("initialize", "", "class initialization", function (){
	this._default = this.wrap_(FileError);
	return this;
},
	null, "2012-03-26T12:22:27Z", "mp");

jst.FSFileError.initialize();

jst.FSFileError._class.addMethod("default", "", "accessing", 
	"\t^ default",
	 "__default", "2012-03-26T12:22:44Z", "mp");
*/
// *** FileSystem ***

jst.FileSystem._class.addMethod("initialize", "", "class initialization", 
	"\t| map |" +
	"\n\tRequest := #(requestFileSystem webkitRequestFileSystem mozzRequestFileSystem) " +
	"\n\t\tdetect: [:k | Browser window asJsObject includesKey: k] ifNone: [" +
	"\n\t\t\tConsole log: 'File system is not available'." +
	"\n\t\t\tnil]." +
	"\n\tmap := Browser window at: 'FileError'." +
	"\n\tnil = map ifFalse: [" +
	"\n\t\tErrorCodes := Dictionary on: map]",
	null, "2012-11-02T10:59:34Z", "mp", 1);

jst.FileSystem._class.addMethod("initialize", "", "class initialization", 
	"\t| map |" +
	"\n\tRequest := #(requestFileSystem webkitRequestFileSystem mozzRequestFileSystem) " +
	"\n\t\tdetect: [:k | Browser window asJsObject includesKey: k] ifNone: [" +
	"\n\t\t\tConsole log: 'File system is not available'." +
	"\n\t\t\tnil]." +
	"\n\tmap := Browser window at: 'FileError'." +
	"\n\tnil = map ifFalse: [" +
	"\n\t\t\"FileError can be a function (new in Chrome 29)\"" +
	"\n\t\tErrorCodes := Dictionary new " +
	"\n\t\t\tinstVarNamed: #map put: map;" +
	"\n\t\t\tyourself]",
	null, "2013-08-21T07:35:30Z", "mp"); //jst-files

jst.initializeClass(jst.FileSystem);

jst.FileSystem.addMethod("isAvailable", "", "testing", 
	"\t^ self class isAvailable",
	null, "2012-04-07T17:05:52Z", "mp");

jst.FileSystem._class.addMethod("isAvailable", "", "testing", 
	"\t^ Request notNil",
	null, "2012-04-07T16:49:56Z", "mp");

jst.FileSystem.addMethod("onError:", "aBlock", "errors", 
	"\tonError := aBlock",
	null, "2012-04-05T14:01:08Z", "mp");

jst.FileSystem.addMethod("errorHandler", "", "errors", function (){
	var context = jst.thisContext;
	var self = this;
	return function(e) {
		jst.thisContext = context;
		var key = (self._class.__ErrorCodes)
			? self._class.__ErrorCodes.keyAtValue_ifAbsent_(e.code, jst.nil)
			: self._class.classVarNamed_("ErrorCodes").keyAtValue_ifAbsent_(e.code, jst.nil);
		if (self._onError != jst.nil)
			self._onError.valueWithPossibleArgs_([key, jst.thisContext]);
		if (key == jst.nil)
			jst.Error.signal_on_('File system: Unknown error', self);
		var handler = self._errors.at_ifAbsent_(key, jst.nil);
		if (handler != jst.nil)
			handler.valueWithPossibleArgs_([jst.thisContext]);
		else
			jst.Error.signal_on_('File system: ' + key, self);
		jst.thisContext = jst.nil;		
	};
},
	null, "2012-05-02T13:23:34Z", "mp");

jst.FileSystem._class.addMethod("do:", "aBlock", "processing", 
	"\tself new do: aBlock",
	null, "2012-03-26T08:35:20Z", "mp");

jst.FileSystem.addMethod("do:", "aBlock", "processing", 
	"\tobj " +
	"\n\t\tifNotNil: [aBlock value: self]" +
	"\n\t\tifNil: [Request ifNotNil: [" +
	"\n\t\t\tBrowser window asJsObject perform: Request withArguments: {" +
	"\n\t\t\t\tself type. " +
	"\n\t\t\t\tsize." +
	"\n\t\t\t\t[:fs | self wrap: fs. aBlock value: self]." +
	"\n\t\t\t\tself errorHandler}]" +
	"\n\t\t]",
	null, "2012-11-02T10:56:35Z", "mp"); //jst-files

jst.FileSystem.addMethod("initialize", "", "initialization", 
	"\ttemporary := true.\"persistent zatim zda se nefunguje\"" +
	"\n\tsize := 5*1024*1024." +
	"\n\terrors := Dictionary new",
	null, "2012-03-26T12:58:34Z", "mp");

jst.FileSystem.addMethod("isTemporary", "", "testing", 
	"\t^ temporary",
	null, "2012-03-26T08:09:42Z", "mp");

jst.FileSystem.addMethod("isTemporary:", "aBoolean", "accessing", 
	"\ttemporary = aBoolean ifFalse: [" +
	"\n\t\tobj := nil]." +
	"\n\ttemporary := aBoolean",
	null, "2012-04-03T09:51:10Z", "mp");

jst.FileSystem.addMethod("isPersistent", "", "testing", 
	"\t^ temporary not",
	null, "2012-03-26T08:09:59Z", "mp");

jst.FileSystem.addMethod("size", "", "accessing", 
	"\t^ size",
	null, "2012-03-26T08:11:17Z", "mp");

jst.FileSystem.addMethod("size:", "aNumber", "accessing", 
	"\tsize = aNumber ifFalse: [" +
	"\n\t\tobj := nil]." +
	"\n\tsize := aNumber",
	null, "2012-04-03T09:51:38Z", "mp");

jst.FileSystem.addMethod("name", "", "accessing", 
	"\t^ obj name",
	null, "2012-03-26T08:33:38Z", "mp");

jst.FileSystem.addMethod("root", "", "accessing", 
	"\t^ FSDirectoryEntry wrap: obj root",
	null, "2012-03-26T08:34:16Z", "mp");

jst.FileSystem.addMethod("type", "", "accessing", 
	"\t^ Browser window asJsObject at: (temporary ifTrue: #TEMPORARY ifFalse: #PERSISTENT)",
	null, "2012-11-02T10:56:51Z", "mp");

jst.FileSystem.addMethod("fileSystem", "", "accessing", 
	"\t\"see FileDirectory\"" +
	"\n\t^ self",
	null, "2012-04-05T09:26:17Z", "mp");

jst.FileSystem.addMethod("handleError:with:", "id aBlock", "errors", 
	"\taBlock " +
	"\n\t\tifNotNil: [errors at: id put: aBlock]" +
	"\n\t\tifNil: [errors removeKey: id]" +
	"\n\t",
	null, "2012-04-05T10:57:59Z", "mp");

jst.FileSystem.addMethod("notFoundErrorHandler:", "aBlock", "errors", 
	"\tself handleError: 'NOT_FOUND_ERR' with: aBlock",
	null, "2012-04-05T10:58:51Z", "mp");

jst.FileSystem.addMethod("url", "", "accessing", 
	"\t^ String streamContents: [:s |" +
	"\n\t\ts nextPutAll: 'filesystem:';" +
	"\n\t\t\tnextPutAll: Browser window location protocol;" +
	"\n\t\t\tnextPutAll: '//';" +
	"\n\t\t\tnextPutAll: Browser window location host;" +
	"\n\t\t\tnextPut: $/." +
	"\n\t\ttemporary " +
	"\n\t\t\tifTrue: [s nextPutAll: 'temporary']" +
	"\n\t\t\tifFalse: [s nextPutAll: 'persistent']" +
	"\n\t]",
	null, "2012-11-02T10:57:38Z", "mp");

jst.FileSystem.addMethod("path", "", "accessing", 
	"\t^ ''",
	null, "2012-11-01T14:52:35Z", "mp");

// *** FSEntry ***

jst.FSEntry._class.addMethod("wrap:", "jsObject", "instance creation", 
	"\tJSObjectProxy on: jsObject." +
	"\n\tjsObject isFile ifTrue: [" +
	"\n\t\t^ FSFileEntry new wrap: jsObject]." +
	"\n\tjsObject isDirectory ifTrue: [" +
	"\n\t\t^ FSDirectoryEntry new wrap: jsObject]." +
	"\n\t^ super wrap: jsObject",
	null, "2012-03-26T10:48:37Z", "mp");

jst.FSEntry.addMethod("isFile", "", "testing", 
	"\t^ obj at: #isFile",
	null, "2012-03-27T13:39:37Z", "mp");

jst.FSEntry.addMethod("isDirectory", "", "testing", 
	"\t^ obj at: #isDirectory",
	null, "2012-03-27T13:40:00Z", "mp");

jst.FSEntry.addMethod("name", "", "accessing", 
	"\t\"The name of the entry, excluding the path leading to it.\"" +
	"\n\t^ obj at: #name",
	null, "2012-03-27T13:40:46Z", "mp");

jst.FSEntry.addMethod("path", "", "accessing", 
	"\t\"The full absolute path from the root to the entry.\"" +
	"\n\t^ obj at: #fullPath",
	null, "2012-03-27T13:40:59Z", "mp");

jst.FSEntry.addMethod("fileSystem", "", "accessing", 
	"\t\"The file system on which the entry resides.\"" +
	"\n\t^ (obj at: #filesystem) jstWrapper",
	null, "2012-03-27T13:41:16Z", "mp");

jst.FSEntry.addMethod("url", "", "accessing", 
	"\t^ obj perform: #toURL",
	null, "2012-03-27T20:38:46Z", "mp");

// *** FSDirectoryEntry ***

jst.FSDirectoryEntry.addMethod("get:path:with:andDo:", "actionName aString options aBlock", "private", 
	"\tobj perform: actionName withArguments: {" +
	"\n\t\taString. " +
	"\n\t\toptions asJsObject." +
	"\n\t\t[:entry | aBlock value: (FSEntry wrap: entry)]." +
	"\n\t\tself fileSystem errorHandler}",
	null, "2012-03-27T16:23:55Z", "mp");

jst.FSDirectoryEntry.addMethod("forceNewFileNamed:do:", "aString aBlock", "processing", 
	"\tself get: #getFile " +
	"\n\t\tpath: aString" +
	"\n\t\twith: (Dictionary new  at: #create put: true; yourself)" +
	"\n\t\tandDo: aBlock",
	null, "2012-03-27T16:27:00Z", "mp");

jst.FSDirectoryEntry.addMethod("fileNamed:do:", "aString aBlock", "processing", 
	"\tself get: #getFile " +
	"\n\t\tpath: aString " +
	"\n\t\twith: Dictionary new " +
	"\n\t\tandDo: aBlock",
	null, "2012-03-27T16:27:23Z", "mp");

jst.FSDirectoryEntry.addMethod("directoryNamed:do:", "aString aBlock", "processing", 
	"\tself get: #getDirectory " +
	"\n\t\tpath: aString " +
	"\n\t\twith: Dictionary new " +
	"\n\t\tandDo: aBlock",
	null, "2012-03-27T16:27:50Z", "mp");

jst.FSDirectoryEntry.addMethod("forceNewDirectoryNamed:do:", "aString aBlock", "processing", 
	"\tself get: #getDirectory" +
	"\n\t\tpath: aString" +
	"\n\t\twith: (Dictionary new  at: #create put: true; yourself)" +
	"\n\t\tandDo: aBlock",
	null, "2012-03-27T16:31:54Z", "mp");

// *** FSFileEntry ***

jst.FSFileEntry.addMethod("fileDo:", "aBlock", "processing", 
	"\tobj perform: #file " +
	"\n\t\twith: [:file | aBlock value: (FSFile wrap: file)]" +
	"\n\t\twith: self fileSystem errorHandler",
	null, "2012-03-26T15:08:49Z", "mp");

jst.FSFileEntry.addMethod("readerDo:", "aBlock", "processing", 
	"\tobj perform: #file " +
	"\n\t\twith: [:file | aBlock value: (FSFileReader on: (FSFile wrap: file))]" +
	"\n\t\twith: self fileSystem errorHandler",
	null, "2012-03-27T10:35:16Z", "mp");

jst.FSFileEntry.addMethod("writerDo:", "aBlock", "processing", 
	"\tobj perform: #createWriter" +
	"\n\t\twith: [:writer | aBlock value: (FSFileWriter wrap: writer)]" +
	"\n\t\twith: self fileSystem errorHandler",
	null, "2012-03-28T09:39:38Z", "mp");

// *** FSBlob ***

jst.FSBlob._class.addMethod("on:", "aCollection", "instance creation", function (aCollection){
	return this.wrap_(new Blob(aCollection.asCollection()));
},
	null, "2013-01-12T17:37:09Z", "mp");

jst.FSBlob.addMethod("size", "", "accessing", 
	"\t\"Returns the size of the Blob object in bytes.\"" +
	"\n\t^ obj at: #size",
	null, "2012-03-27T20:14:51Z", "mp");

jst.FSBlob.addMethod("type", "", "accessing", 
	"\t\"The ASCII-encoded string in lower case representing the media type of the Blob, expressed as an RFC2046 MIME type" +
	"\n\t(see http://tools.ietf.org/html/rfc2046)\" " +
	"\n\t^ obj at: #type",
	null, "2012-03-27T20:16:44Z", "mp");

jst.FSBlob.addMethod("asUrl", "", "converting", function (){
	//Returns a unique Blob URI each time it is called
	return window.URL.createObjectURL(this.asJsObject());
},
	null, "2013-06-18T11:13:24Z", "mp");

/*
jst.FSBlob.addMethod("asImage", "", "converting", 
	"\t^ HTMLImageElement new src: self asUrl",
	null, "2013-06-18T11:21:17Z", "mp");
*/
jst.FSBlob.addMethod("asImageDo:", "aBlock", "converting", 
	"\tHTMLImageElement new " +
	"\n\t\tsrc: self asUrl;" +
	"\n\t\ton: #load do: [:ev | aBlock value: ev target]",
	null, "2013-06-20T12:14:26Z", "mp");

// *** FSFile ***

jst.FSFile.addMethod("name", "", "accessing", 
	"\t\"The name of the file. There are numerous file name variations on different systems; " +
	"\n\tthis is merely the name of the file, without path information.\"" +
	"\n\t^ obj at: #name",
	null, "2012-03-27T19:42:28Z", "mp");

jst.FSFile.addMethod("lastModifiedDate", "", "accessing", 
	"\t\"The last modified date of the file.\"" +
	"\n\t^ obj at: #lastModifiedDate",
	null, "2012-03-27T19:43:40Z", "mp");

jst.FSFile.addMethod("printOn:", "s", "printing", 
	"\t(obj notNil and: [self name notNil]) ifTrue: [" +
	"\n\t\ts nextPutAll: 'File '; " +
	"\n\t\t\tprint: self name;" +
	"\n\t\t\tnextPutAll: ' (';" +
	"\n\t\t\tnextPutAll: self size printFileSize;" +
	"\n\t\t\tnextPutAll: ')'" +
	"\n\t] ifFalse: [" +
	"\n\t\tsuper printOn: s]",
	null, "2013-06-06T20:51:56Z", "mp");

// *** FSFileList ***

jst.FSFileList.addMethod("size", "", "accessing", 
	"\t^ obj at: #length",
	null, "2013-06-06T20:17:28Z", "mp");

jst.FSFileList.addMethod("at:", "index", "accessing", 
	"\tindex <= 0 | (index > self size) ifTrue: [" +
	"\n\t\tself error: 'Attempt to index non-existent file']." +
	"\n\t^ FSFile wrap: (obj perform: #item with: index - 1)",
	null, "2013-06-18T11:26:36Z", "mp");

jst.FSFileList.addMethod("first", "", "accessing", 
	"\t^ self at: 1",
	null, "2013-06-06T20:20:03Z", "mp");

// *** FSFileReader ***

jst.FSFileReader.addMethod("initialize", "", "initialization", function (){
	if (window.FileReader)
		this.wrap_(new FileReader());
	return this;
},
	null, "2012-03-26T15:21:14Z", "mp");

jst.FSFileReader.addMethod("isEmpty", "", "testing", 
	"\t\"The FileReader object has been constructed, and there are no pending reads. " +
	"\n\tNone of the read methods have been called. This is the default state of a newly minted FileReader object, " +
	"\n\tuntil one of the read methods have been called on it.\"" +
	"\n\t^ obj readyState = (obj at: 'EMPTY')",
	null, "2012-03-27T13:27:37Z", "mp");

jst.FSFileReader.addMethod("isLoading", "", "testing", 
	"\t\"A File or Blob is being read. One of the read methods is being processed, and no error has occurred during the read.\"" +
	"\n\t^ obj readyState = (obj at: 'LOADING')",
	null, "2012-03-27T13:27:59Z", "mp");

jst.FSFileReader.addMethod("isDone", "", "testing", 
	"\t\"The entire File or Blob has been read into memory, OR a file error occurred during read, " +
	"\n\tOR the read was aborted using #abort. The FileReader is no longer reading a File or Blob. " +
	"\n\tIf readyState is set to DONE it means at least one of the read methods have been called on this FileReader.\"" +
	"\n\t^ obj readyState = (obj at: 'DONE')",
	null, "2012-03-27T13:28:54Z", "mp");

jst.FSFileReader.addMethod("encoding:", "aString", "accessing", 
	"\tencoding := aString",
	null, "2012-03-26T15:26:12Z", "mp");

jst.FSFileReader.addMethod("encoding", "", "accessing", 
	"\t^ encoding",
	null, "2012-03-26T15:26:26Z", "mp");

jst.FSFileReader.addMethod("file:", "aFSBlob", "accessing", 
	"\tfile := aFSBlob",
	null, "2012-03-27T10:32:02Z", "mp");

jst.FSFileReader.addMethod("file", "", "accessing", 
	"\t^ file",
	null, "2012-03-27T10:50:48Z", "mp");

jst.FSFileReader.addMethod("result", "", "accessing", 
	"\t^ obj result",
	null, "2012-03-26T15:35:28Z", "mp");

jst.FSFileReader.addMethod("abort", "", "reading", 
	"\tobj abort",
	null, "2012-03-27T10:51:49Z", "mp");

jst.FSFileReader._class.addMethod("on:", "aFSBlob", "instance creation", 
	"\t^ self new file: aFSBlob",
	null, "2012-03-27T10:32:35Z", "mp");

jst.FSFileReader.addMethod("readAsText", "", "reading", 
	"\tencoding " +
	"\n\t\tifNil: [obj perform: #readAsText with: file asJsObject]" +
	"\n\t\tifNotNil: [obj perform: #readAsText with: file asJsObject with: encoding]",
	null, "2012-03-27T10:33:07Z", "mp");

jst.FSFileReader.addMethod("readAsArrayBuffer", "", "reading", 
	"\tobj perform: #readAsArrayBuffer with: file asJsObject",
	null, "2012-03-27T10:49:30Z", "mp");

jst.FSFileReader.addMethod("readAsDataURL", "", "reading", 
	"\tobj perform: #readAsDataURL with: file asJsObject",
	null, "2012-03-27T10:50:13Z", "mp");

//events
jst.FSFileReader.addMethod("onLoad:", "aBlock", "events", 
	"\tobj at: #onload put: [:ev | aBlock value: (DOMProgressEvent wrap: ev)]",
	null, "2012-03-26T20:24:31Z", "mp");

jst.FSFileReader.addMethod("onLoadStart:", "aBlock", "events", 
	"\tobj at: #onloadstart put: [:ev | aBlock value: (DOMProgressEvent wrap: ev)]",
	null, "2012-03-27T13:03:24Z", "mp");

jst.FSFileReader.addMethod("onLoadEnd:", "aBlock", "events", 
	"\tobj at: #onloadend put: [:ev | aBlock value: (DOMProgressEvent wrap: ev)]",
	null, "2012-03-27T13:13:23Z", "mp");

jst.FSFileReader.addMethod("onProgress:", "aBlock", "events", 
	"\tobj at: #onprogress put: [:ev | aBlock value: (DOMProgressEvent wrap: ev)]",
	null, "2012-03-27T13:14:12Z", "mp");

jst.FSFileReader.addMethod("onAbort:", "aBlock", "events", 
	"\tobj at: #onabort put: [:ev | aBlock value: (DOMProgressEvent wrap: ev)]",
	null, "2012-03-27T13:14:21Z", "mp");

jst.FSFileReader.addMethod("onError:", "aBlock", "events", 
	"\tobj at: #onerror put: [:ev | aBlock value: (DOMProgressEvent wrap: ev)]",
	null, "2012-03-27T13:14:35Z", "mp");

/* Deprecated
   *** FSBlobBuilder ***

jst.FSBlobBuilder.addMethod("initialize", "", "initialization", 
	function (){
	if (window.BlobBuilder)
		this.wrap_(new BlobBuilder());
	else if (window.WebKitBlobBuilder)
		this.wrap_(new WebKitBlobBuilder());
	return this;
},
	null, "2012-03-28T08:41:11Z", "mp");

jst.FSBlobBuilder.addMethod("createBlob", "", "processing", 
	"\t\"Returns the current contents of the BlobBuilder as a new Blob.\"" +
	"\n\t^ FSBlob wrap: (obj perform: #getBlob)",
	null, "2012-03-28T09:05:14Z", "mp");

jst.FSBlobBuilder.addMethod("append:endings:", "aString aSymbol", "processing", 
	"\t\"Appends the supplied text to the current contents of the BlobBuilder, writing it as UTF-8, " +
	"\n\tconverting newlines as specified in endings:" +
	"\n\t\t#transparent: Code points from the string must remain unchanged." +
	"\n\t\t#native: Newlines must be transformed to the default line-ending representation of the underlying host filesystem.\"" +
	"\n\tobj perform: #append with: aString with: aSymbol",
	null, "2012-03-28T08:51:01Z", "mp");

jst.FSBlobBuilder.addMethod("append:", "anObject", "processing", 
	"\t\"Appends the supplied String/Blob/Array to the current contents of the BlobBuilder.\"" +
	"\n\tanObject isString " +
	"\n\t\tifTrue: [self append: anObject endings: #transparent]" +
	"\n\t\tifFalse: [obj perform: #append with: anObject asJsObject]",
	null, "2012-03-28T08:53:08Z", "mp");
*/

// *** FSFileSaver ***

jst.FSFileSaver.addMethod("isDone", "", "testing", 
	"\t\"The entire Blob has been written to the file, a file error occurred during the write, or the write was aborted using #abort. " +
	"\n\tThe FileSaver is no longer writing the blob.\"" +
	"\n\t^ (obj at: #readyState) = (obj at: 'DONE')",
	null, "2012-03-28T09:10:45Z", "mp");

jst.FSFileSaver.addMethod("isInit", "", "testing", 
	"\t\"The object has been constructed, but there is no pending write.\"" +
	"\n\t^ (obj at: #readyState) = (obj at: 'INIT')",
	null, "2012-03-28T09:11:30Z", "mp");

jst.FSFileSaver.addMethod("isWriting", "", "testing", 
	"\t\"The blob is being written.\"" +
	"\n\t^ (obj at: #readyState) = (obj at: 'WRITING')",
	null, "2012-03-28T09:12:00Z", "mp");

jst.FSFileSaver.addMethod("abort", "", "processing", 
	"\tobj perform: #abort",
	null, "2012-03-28T09:16:05Z", "mp");

jst.FSFileSaver.addMethod("onAbort:", "aBlock", "events", 
	"\tobj at: #onabort put: [:ev | aBlock value: (DOMProgressEvent wrap: ev)]",
	null, "2012-03-28T09:17:13Z", "mp");

jst.FSFileSaver.addMethod("onError:", "aBlock", "events", 
	"\tobj at: #onerror put: [:ev | aBlock value: (DOMProgressEvent wrap: ev)]",
	null, "2012-03-28T09:19:19Z", "mp");

jst.FSFileSaver.addMethod("onProgress:", "aBlock", "events", 
	"\tobj at: #onprogress put: [:ev | aBlock value: (DOMProgressEvent wrap: ev)]",
	null, "2012-03-28T09:20:28Z", "mp");

jst.FSFileSaver.addMethod("onWrite:", "aBlock", "events", 
	"\tobj at: #onwrite put: [:ev | aBlock value: (DOMProgressEvent wrap: ev)]",
	null, "2012-03-28T09:20:39Z", "mp");

jst.FSFileSaver.addMethod("onWriteStart:", "aBlock", "events", 
	"\tobj at: #onwritestart put: [:ev | aBlock value: (DOMProgressEvent wrap: ev)]",
	null, "2012-03-28T09:20:46Z", "mp");

jst.FSFileSaver.addMethod("onWriteEnd:", "aBlock", "events", 
	"\tobj at: #onwriteend put: [:ev | aBlock value: (DOMProgressEvent wrap: ev)]",
	null, "2012-03-28T09:20:56Z", "mp");

// *** FSFileWriter ***

jst.FSFileWriter.addMethod("size", "", "accessing", 
	"\t\"The length of the file. If the user does not have read access to the file, this is the highest byte offset " +
	"\n\tat which the user has written.\"" +
	"\n\t^ obj at: #length",
	null, "2012-03-28T09:24:14Z", "mp");

jst.FSFileWriter.addMethod("position", "", "accessing", 
	"\t\"The byte offset (no greater than size) at which the next write to the file will occur.\"" +
	"\n\t^ obj at: #position",
	null, "2012-03-28T09:26:03Z", "mp");

jst.FSFileWriter.addMethod("write:", "aBlob", "processing", 
	"\t\"Write the supplied data to the file at #position.\"" +
	"\n\tobj perform: #write with: aBlob asJsObject",
	null, "2012-03-28T09:28:11Z", "mp");
/*
jst.FSFileWriter.addMethod("append:", "anObject", "processing", 
	"\t\"Appends the supplied String/Blob/Array to the file.\"" +
	"\n\tself seek: self size." +
	"\n\t(anObject isKindOf: FSBlob)" +
	"\n\t\tifTrue: [self write: anObject]" +
	"\n\t\tifFalse: [self write: (FSBlobBuilder new append: anObject; createBlob)]",
	null, "2012-03-28T09:55:58Z", "mp");
*/
jst.FSFileWriter.addMethod("seek:", "offset", "processing", 
	"\t\"Seek sets the file position at which the next write will occur." +
	"\n\tSeek may not be called while the FileWriter is in the WRITING state." +
	"\n\tIf offset is greater than #size, #size is used instead. If offset is less than zero, #size is added to it," +
	"\n\tso that it is treated as an offset back from the end of the file. If it is still less than zero, zero is used.\"" +
	"\n\tobj perform: #seek with: offset",
	null, "2012-03-28T09:31:35Z", "mp");

jst.FSFileWriter.addMethod("truncate:", "aNumber", "processing", 
	"\t\"Changes the length of the file to that specified. If shortening the file, data beyond the new length must be discarded. " +
	"\n\tIf extending the file, the existing data must be zero-padded up to the new length.\"" +
	"\n\tobj perform: #truncate with: aNumber",
	null, "2012-03-28T09:33:56Z", "mp");

// *** FileDirectory ***

jst.FileDirectory.addMethod("on:", "anObject", "accessing", 
	"\t\"An instance of FileSystem or FSDirectoryEntry\"" +
	"\n\tparent := anObject",
	null, "2012-04-04T09:57:17Z", "mp");

/*
jst.FileDirectory.addMethod("path", "", "accessing", 
	"\t^ (parent isKindOf: FileSystem) " +
	"\n\t\tifTrue: ['/', path]" +
	"\n\t\tifFalse: [parent fullPath, '/', path]",
	null, "2012-04-04T10:36:55Z", "mp");
*/

jst.FileDirectory.addMethod("path", "", "accessing", 
	"\t^ parent path, '/', path",
	null, "2012-11-01T14:52:23Z", "mp");

jst.FileDirectory.addMethod("path:", "aString", "accessing", 
	"\tpath := (aString size > 0 and: [aString first = '/']) " +
	"\n\t\tifFalse: aString" +
	"\n\t\tifTrue: [aString allButFirst]",
	null, "2012-04-04T10:39:26Z", "mp");

jst.FileDirectory.addMethod("url", "", "accessing", 
	"\t^ parent url, '/', path",
	null, "2012-11-01T14:16:47Z", "mp");

jst.FileDirectory._class.addMethod("default", "", "accessing", 
	"\t^ self new on: FileSystem new; path: '/'",
	 "__default", "2012-04-04T08:11:28Z", "mp");

jst.FileDirectory.addMethod("fileNamed:", "localFileName", "file stream creation", 
	"\t^ FileStream fileNamed: localFileName on: self",
	null, "2012-04-04T08:28:06Z", "mp");

jst.FileDirectory.addMethod("forceNewFileNamed:", "localFileName", "file stream creation", 
	"\t^ FileStream forceNewFileNamed: localFileName on: self",
	null, "2012-04-04T08:28:20Z", "mp");

jst.FileDirectory.addMethod("entryDo:", "aBlock", "private", 
	"\t| s  p1 p2 nextDir |" +
	"\n\ts := path readStream." +
	"\n\tp1 := s upTo: '/'." +
	"\n\tp2 := s upToEnd." +
	"\n\tnextDir := [:dir | dir forceNewDirectoryNamed: p1 do: [:entry | " +
	"\n\t\tp2 isEmpty " +
	"\n\t\t\tifTrue: [aBlock value: entry] " +
	"\n\t\t\tifFalse: [FileDirectory new on: entry; path: p2; entryDo: aBlock]]]." +
	"\n\t(parent isKindOf: FileSystem) ifTrue: [\t" +
	"\n\t\tparent do: [:fs | p1 isEmpty" +
	"\n\t\t\tifTrue: [aBlock value: fs root]" +
	"\n\t\t\tifFalse: [nextDir value: fs root]" +
	"\n\t\t]" +
	"\n\t] ifFalse: [" +
	"\n\t\tnextDir value: parent]",
	null, "2012-04-04T11:12:15Z", "mp");

jst.FileDirectory.addMethod("fileSystem", "", "accessing", 
	"\t^ parent fileSystem",
	null, "2012-04-05T09:25:04Z", "mp");

// *** FileStream ***

jst.FileStream.addMethod("on:", "aFileDirectory", "accessing", 
	"\tdir := aFileDirectory",
	null, "2012-04-04T08:34:28Z", "mp");

jst.FileStream.addMethod("name:", "aString", "accessing", 
	"\tname := aString",
	null, "2012-04-04T08:34:45Z", "mp");

jst.FileStream.addMethod("isBinary", "", "testing", 
	"\t^ isBinary",
	null, "2012-04-05T21:25:59Z", "mp");

jst.FileStream.addMethod("forceNew:", "aBoolean", "accessing", 
	"\tforceNew := aBoolean",
	null, "2012-04-04T08:35:11Z", "mp");

jst.FileStream.addMethod("initialize", "", "initialization", 
	"\thandler := FileHandler new on: self." +
	"\n\tisBinary := false." +
	"\n\tforceNew := false." +
	"\n\tloaded := false",
	null, "2012-04-04T14:56:30Z", "mp");

jst.FileStream.addMethod("initStream", "", "initialization", 
	"\tstream := isBinary " +
	"\n\t\tifTrue: [Array new writeStream] " +
	"\n\t\tifFalse: ['' writeStream]",
	null, "2012-04-04T15:05:37Z", "mp");

jst.FileStream._class.addMethod("forceNewFileNamed:on:", "localFileName aFileDirectory", "instance creation", 
	"\t^ self new " +
	"\n\t\tname: localFileName; " +
	"\n\t\ton: aFileDirectory; " +
	"\n\t\tforceNew: true",
	null, "2012-04-04T08:40:40Z", "mp");

jst.FileStream._class.addMethod("fileNamed:on:", "localFileName aFileDirectory", "instance creation", 
	"\t^ self new " +
	"\n\t\tname: localFileName; " +
	"\n\t\ton: aFileDirectory",
	null, "2012-04-04T08:41:00Z", "mp");

jst.FileStream.addMethod("writerDo:ifError:", "aBlock errorBlock", "private", 
	"\tdir fileSystem onError: errorBlock." +
	"\n\tdir entryDo: [:fsdir | | fsfileBlock |" +
	"\n\t\tfsfileBlock := [:fsfile | fsfile writerDo: aBlock]." +
	"\n\t\tforceNew " +
	"\n\t\t\tifTrue: [fsdir forceNewFileNamed: name do: fsfileBlock]" +
	"\n\t\t\tifFalse: [fsdir fileNamed: name do: fsfileBlock]" +
	"\n\t]",
	null, "2012-05-02T13:21:13Z", "mp");

jst.FileStream.addMethod("readerDo:ifError:", "aBlock errorBlock", "private", 
	"\tdir fileSystem onError: errorBlock." +
	"\n\tdir entryDo: [:fsdir | " +
	"\n\t\tfsdir fileNamed: name do: [:fsfile |" +
	"\n\t\t\tfsfile readerDo: [:reader |" +
	"\n\t\t\t\taBlock value: reader]]]",
	null, "2012-05-02T13:20:51Z", "mp");

jst.FileStream.addMethod("nextHandler", "", "private", 
	"\t[handler isDone & handler next notNil] whileTrue: [" +
	"\n\t\thandler := handler next." +
	"\n\t\thandler previous: nil]." +
	"\n\t^ handler",
	null, "2012-04-05T06:54:27Z", "mp");

jst.FileStream.addMethod("append:", "anObject", "accessing", 
	"\tself fileSystem isAvailable ifTrue: [" +
	"\n\t\tstream ifNil: [" +
	"\n\t\t\tself initStream]." +
	"\n\t\tself nextHandler append: (isBinary " +
	"\n\t\t\tifTrue: [stream nextPut: anObject] " +
	"\n\t\t\tifFalse: [stream nextPutAll: anObject asString])" +
	"\n\t]",
	null, "2012-05-02T19:44:50Z", "mp");

jst.FileStream.addMethod("contentsDo:", "aBlock", "accessing", 
	"\tloaded | self fileSystem isAvailable not ifTrue: [" +
	"\n\t\tstream ifNil: [" +
	"\n\t\t\tself initStream]." +
	"\n\t\taBlock value: stream contents" +
	"\n\t] ifFalse: [" +
	"\n\t\tself nextHandler loaded: [:result |" +
	"\n\t\t\tloaded := true." +
	"\n\t\t\tself initStream." +
	"\n\t\t\tstream nextPut: result." +
	"\n\t\t\taBlock value: stream contents]]",
	null, "2012-05-02T20:18:02Z", "mp");

jst.FileStream.addMethod("resetContents:", "anObject", "accessing", 
	"\tself fileSystem isAvailable ifTrue: [" +
	"\n\t\tloaded := false." +
	"\n\t\tself nextHandler " +
	"\n\t\t\tresetContents: anObject;" +
	"\n\t\t\tloaded: [:result |" +
	"\n\t\t\t\tloaded := true." +
	"\n\t\t\t\tself initStream." +
	"\n\t\t\t\tstream nextPut: result]" +
	"\n\t] ifFalse: [" +
	"\n\t\tself initStream." +
	"\n\t\tstream nextPut: anObject]",
	null, "2012-05-03T06:58:31Z", "mp");

jst.FileStream.addMethod("fileSystem", "", "accessing", 
	"\t^ dir fileSystem",
	null, "2012-04-05T10:47:11Z", "mp");

jst.FileStream.addMethod("url", "", "accessing", 
	"\t^ dir url, '/', name",
	null, "2012-11-01T13:00:36Z", "mp");

// *** FileHandler ***

jst.FileHandler.addMethod("initialize", "", "initialization", 
	"\tbuffer := OrderedCollection new",
	null, "2013-01-12T17:47:14Z", "mp");

jst.FileHandler.addMethod("fileSystem", "", "accessing", 
	"\t^ fileStream fileSystem",
	null, "2012-04-06T13:49:26Z", "mp");

jst.FileHandler.addMethod("on:", "aFileStream", "accessing", 
	"\tfileStream := aFileStream",
	null, "2012-04-04T08:36:05Z", "mp");

jst.FileHandler.addMethod("previous:", "anObject", "accessing", 
	"\tprev := anObject",
	null, "2012-04-04T12:57:34Z", "mp");

jst.FileHandler.addMethod("fileStream:", "aFileStream", "accessing", 
	"\tfileStream := aFileStream",
	null, "2012-04-04T12:57:57Z", "mp");

jst.FileHandler.addMethod("createNext", "", "initialization", 
	"\t^ next := self class new" +
	"\n\t\tprevious: self; " +
	"\n\t\tfileStream: fileStream;" +
	"\n\t\tyourself",
	null, "2012-04-04T12:12:58Z", "mp");

jst.FileHandler.addMethod("append:", "anObject", "accessing", 
	"\tstate notNil & (state ~= #append) | next notNil ifTrue: [" +
	"\n\t\t^ (next ifNil: [self createNext]) append: anObject]." +
	"\n\tbuffer add: anObject." +
	"\n\tstate := #append." +
	"\n\tself save",
	null, "2013-01-12T17:47:21Z", "mp");

jst.FileHandler.addMethod("resetContents:", "anObject", "private", 
	"\tstate notNil & (state ~= #reset) | next notNil ifTrue: [" +
	"\n\t\t^ (next ifNil: [self createNext]) resetContents: anObject]." +
	"\n\tstate := #reset." +
	"\n\tbuffer := OrderedCollection new." +
	"\n\tself save." +
	"\n\tanObject isEmptyOrNil ifFalse: [" +
	"\n\t\tself append: anObject]",
	null, "2013-01-12T17:47:33Z", "mp");

jst.FileHandler.addMethod("save", "", "private", 
	"\ttask ifNil: [ | empty |" +
	"\n\t\tempty := state = #reset." +
	"\n\t\ttask := DelayedTask new delay: 100; task: [" +
	"\n\t\t\tstate := #saving." +
	"\n\t\t\tfileStream writerDo: [:writer | " +
	"\n\t\t\t\tempty ifTrue: [" +
	"\n\t\t\t\t\twriter truncate: 0. " +
	"\n\t\t\t\t] ifFalse: [" +
	"\n\t\t\t\t\twriter seek: writer size. " +
	"\n\t\t\t\t\twriter write: (FSBlob on: buffer)]." +
	"\n\t\t\t\tstate := #done." +
	"\n\t\t\t\tnext ifNotNil: [next continue]" +
	"\n\t\t\t] ifError: [self abort]" +
	"\n\t\t]" +
	"\n\t]." +
	"\n\t(prev isNil or: [prev isDone]) ifTrue: [" +
	"\n\t\ttask run]",
	null, "2013-01-12T17:50:31Z", "mp");

jst.FileHandler.addMethod("loaded:", "aBlock", "private", 
	"\tstate notNil | next notNil ifTrue: [" +
	"\n\t\t^ (next ifNil: [self createNext]) loaded: aBlock]." +
	"\n\tstate := #load." +
	"\n\ttask := DelayedTask new delay: 100; task: [" +
	"\n\t\tstate := #loading." +
	"\n\t\tfileStream readerDo: [:reader |" +
	"\n\t\t\treader onError: [:ev | " +
	"\n\t\t\t\tself abort]." +
	"\n\t\t\treader onLoad: [:ev |" +
	"\n\t\t\t\tstate := #done." +
	"\n\t\t\t\tnext ifNotNil: [next continue]." +
	"\n\t\t\t\taBlock value: reader result]." +
	"\n\t\t\tfileStream isBinary " +
	"\n\t\t\t\tifTrue: [reader readAsArrayBuffer] " +
	"\n\t\t\t\tifFalse: [reader readAsText]" +
	"\n\t\t] ifError: [self abort]" +
	"\n\t]." +
	"\n\t(prev isNil or: [prev isDone]) ifTrue: [" +
	"\n\t\ttask run]",
	null, "2012-05-03T09:03:39Z", "mp");

jst.FileHandler.addMethod("next", "", "accessing", 
	"\t^ next",
	null, "2012-04-05T06:51:02Z", "mp");

jst.FileHandler.addMethod("isDone", "", "testing", 
	"\t^ state = #done | (state = #error)",
	null, "2012-05-02T13:58:28Z", "mp");

jst.FileHandler.addMethod("continue", "", "private", 
	"\ttask run",
	null, "2012-05-02T13:57:39Z", "mp");

jst.FileHandler.addMethod("abort", "", "private", 
	"\tstate := #error." +
	"\n\tnext := nil",
	null, "2012-05-03T09:02:51Z", "mp");
