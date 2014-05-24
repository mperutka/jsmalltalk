/*
 * Copyright (c) 2012 Michal Perutka <michal.perutka@gmail.com>
 *
 *
 * Depends on jst-core, jst-core-proxy, jst-parser, jst-kernel, jst-dom, jst-applications, jst-couchdb, jst-ext
 */

jst.currentJsFile = "fytoportal-core";

// *** CLASSES ***

//Fytoportal class is implemented in fytoportal.js
jst.Object.subclass("Fytoportal", "fotogalerie ior masterNavigPanel detailNavigPanel mainPanel tiskMetodiky", "", "", "SRS-Fytoportal");

jst.Object.subclass("FYFotografie", "id rev default format soubor autor popis plodina skodlOrg attachments", "", "", "SRS-Fytoportal-model");
//jst.FYFotografie.subclass("FYFotoSoubory", "preview optimal original", "", "", "SRS-Fytoportal-model");
jst.FYFotografie.subclass("FYFotoView", "inDB", "", "", "SRS-Fytoportal-model");

jst.Object.subclass("FYTaxon", "id cesky latinsky kody synonyma dalsiNazvy rise trida rad celed zmeny publikovat", "", "", "SRS-Fytoportal-model");

jst.FYTaxon.subclass("FYPlodina", "parent isParent skupiny popis", "PopisRastr", "", "SRS-Fytoportal-model");

jst.Object.subclass("FYOdruda", "id kod nazev popis kodyPlodiny nazevPlodiny", "", "", "SRS-Fytoportal-model");

jst.FYTaxon.subclass("FYSkodlOrg", "plodiny zarazeni typ popis puvodciChoroby", "", "", "SRS-Fytoportal-model");

jst.ExtTreePanel.subclass("FYTreePanel", "", "", "", "SRS-Fytoportal");

jst.Object.subclass("FYDataViews", "db domain", "", "", "SRS-Fytoportal");

//EPPT
jst.FYDataViews.subclass("FYDataEPPTKody", "", "", "", "SRS-Fytoportal-EPPT");

//POR
jst.Object.subclass("PORPouzitiPrip", "createdOn modifiedOn bayerKody mapovani mimo mimoZmena text neplatne", "", "", "SRS-Fytoportal-POR");

jst.PORPouzitiPrip.subclass("PORPouzitiPlodina", "", "", "", "SRS-Fytoportal-POR");
jst.PORPouzitiPrip.subclass("PORPouzitiSO", "", "", "", "SRS-Fytoportal-POR");

jst.FYDataViews.subclass("FYDataPouzitiPOR", "", "", "", "SRS-Fytoportal-POR");
jst.FYDataViews.subclass("FYDataPOR", "semaforVahy", "", "", "SRS-Fytoportal-POR");

jst.Object.subclass("PORPripravek", "id obchJmeno obchJmId pouzitelnyDo pouziti hodnUdaje rozhodnuti ucinneLatky soubeznyDovoz biologFunkce pozn eko createdOn modifiedOn", "", "", "SRS-Fytoportal-POR");
jst.Object.subclass("PORPouziti", "plodina plodinaLink skodlOrg skodlOrgLink davka prpId ind poznamka ochrLhuta", "", "", "SRS-Fytoportal-POR");
jst.Object.subclass("PORRozhodnuti", "id baleni stav prpId drzitelRozh regCislo refId minoritniPouziti", "", "", "SRS-Fytoportal-POR");
jst.PORRozhodnuti.subclass("PORRozhSoubDovoz", "obchJmRef stat", "", "", "SRS-Fytoportal-POR");
jst.Object.subclass("PORUcinnaLatka", "id cesky anglicky mnozstvi", "", "", "SRS-Fytoportal-POR");

jst.Object.subclass("PORHodnUdaj", "prpId kod veta alias udaj poznamka semafor mimoSemafor", "", "", "SRS-Fytoportal-POR");
jst.Object.subclass("PORHodnUdaje", "clovek vcely ptaciSavci vodniZdroje vodniOrg necilClenovci necilRostliny pudniOrg zivotniProstredi ostatni", "", "", "SRS-Fytoportal-POR");
jst.Object.subclass("PORSkupHU", "udaje semafor upresneni", "", "", "SRS-Fytoportal-POR");

//*** FYTaxon ***

jst.FYTaxon.addMethod("=", "otherTaxon", "comparing", 
	"\t^ id = otherTaxon id",
	null, "2012-06-13T11:37:24Z", "mp");

jst.FYTaxon.addMethod("id", "", "accessing", 
	"\t^ id",
	null, "2012-06-06T21:40:22Z", "mp");

jst.FYTaxon.addMethod("id:", "aString", "accessing", 
	"\tid := aString",
	null, "2013-04-11T20:07:57Z", "mp");

jst.FYTaxon.addMethod("printOn:", "aStream", "printing", 
	"\tcesky " +
	"\n\t\tifNotNil: [aStream nextPutAll: cesky]" +
	"\n\t\tifNil: [latinsky " +
	"\n\t\t\tifNotNil: [aStream nextPutAll: latinsky]" +
	"\n\t\t\tifNil: [super printOn: aStream]]",
	null, "2013-02-06T16:03:41Z", "mp");

jst.FYTaxon.addMethod("text", "", "accessing", 
	"\t\"potrebuje FYFotoWindow pro zobrazeni nazvu\"" +
	"\n\t^ self asString",
	null, "2014-02-26T16:29:25Z", "mp");

jst.FYTaxon.addMethod("nazevKody", "", "printing", 
	"\t^ String streamContents: [:s |" +
	"\n\t\tself printOn: s." +
	"\n\t\tkody isEmptyOrNil ifFalse: [" +
	"\n\t\t\ts nextPutAll: ' ('." +
	"\n\t\t\tkody do: [:k | s nextPutAll: k] separatedBy: [s nextPutAll: ', ']." +
	"\n\t\t\ts nextPutAll: ')'" +
	"\n\t\t]" +
	"\n\t]",
	null, "2013-04-11T19:46:25Z", "mp");

jst.FYTaxon.addMethod("cesky", "", "accessing", 
	"\t^ cesky ifNil: latinsky",
	null, "2012-05-30T21:18:14Z", "mp", 1);

jst.FYTaxon.addMethod("cesky", "", "accessing", 
	"\t^ cesky",
	null, "2013-11-13T14:16:10Z", "mp"); //fytoportal-core

jst.FYTaxon.addMethod("cesky:", "aString", "accessing", 
	"\tcesky := aString",
	null, "2012-08-01T14:20:37Z", "mp");

jst.FYTaxon.addMethod("latinsky", "", "accessing", 
	"\t^ latinsky",
	null, "2012-06-28T15:01:56Z", "mp");

jst.FYTaxon.addMethod("latinsky:", "aString", "accessing", 
	"\tlatinsky := aString",
	null, "2012-08-01T14:20:51Z", "mp");

jst.FYTaxon.addMethod("synonyma", "", "accessing", 
	"\t^ synonyma",
	null, "2012-07-31T14:48:09Z", "mp");

jst.FYTaxon.addMethod("synonyma:", "anObject", "accessing", 
	"\tsynonyma := self convertList: anObject",
	null, "2012-08-01T14:51:45Z", "mp");

jst.FYTaxon.addMethod("kody", "", "accessing", 
	"\t^ kody",
	null, "2012-07-31T15:12:40Z", "mp");

jst.FYTaxon.addMethod("kody:", "anObject", "accessing", 
	"\tkody := self convertList: anObject",
	null, "2012-08-01T14:51:52Z", "mp");

jst.FYTaxon.addMethod("dalsiNazvy", "", "accessing", 
	"\t^ dalsiNazvy",
	null, "2012-08-01T13:42:37Z", "mp");

jst.FYTaxon.addMethod("dalsiNazvy:", "anObject", "accessing", 
	"\tdalsiNazvy := self convertList: anObject",
	null, "2012-08-01T14:51:37Z", "mp");
/*
jst.FYTaxon.addMethod("convertList:", "anObject", "private", 
	"\t^ (anObject ifString: [(anObject findTokens: ',') collect: [:s | s withBlanksTrimmed]]) asJsArray",
	null, "2012-08-01T15:48:47Z", "mp");
*/
jst.FYTaxon.addMethod("convertList:", "anObject", "private", 
	"\t^ self convertList: anObject prefix: ''",
	null, "2012-08-02T14:19:37Z", "mp");

jst.FYTaxon.addMethod("convertList:prefix:", "anObject pref", "private", 
	"\t^ (anObject ifString: [" +
	"\n\t\t(anObject findTokens: ',') collect: [:s | " +
	"\n\t\t\t(s allButFirst: pref size) withBlanksTrimmed]]" +
	"\n\t) asArray",
	null, "2012-08-03T12:00:44Z", "mp", 1);

jst.FYTaxon.addMethod("convertList:prefix:", "anObject pref", "private", 
	"\t^ (anObject ifString: [" +
	"\n\t\t(anObject findTokens: ';,') collect: [:s | " +
	"\n\t\t\t(s allButFirst: pref size) withBlanksTrimmed]]" +
	"\n\t) asArray",
	null, "2013-11-11T13:21:45Z", "mp"); //fytoportal-core

jst.FYTaxon.addMethod("parseList:prefix:", "aDictionary aString", "private", 
	"\t| list |" +
	"\n\tlist := OrderedCollection new." +
	"\n\taDictionary keysAndValuesDo: [:key :value |" +
	"\n\t\t(key startsWith: aString) ifTrue: [" +
	"\n\t\t\tlist add: (key allButFirst: aString size)]]." +
	"\n\t^ list",
	null, "2012-08-02T12:18:50Z", "mp");

jst.FYTaxon.addMethod("asDictionary", "", "converting", 
	"\t| dict |" +
	"\n\tdict := super asDictionary." +
	"\n\t#(synonyma dalsiNazvy kody) do: [:key |" +
	"\n\t\tdict at: key put: ((dict at: key) asTextualList: #yourself separator: ', ')]." +
	"\n\t^ dict",
	null, "2012-08-01T14:06:10Z", "mp");

/*
jst.FYTaxon.addMethod("values:", "aDictionary", "accessing", 
	"\t\"viz #asDictionary\"" +
	"\n\taDictionary keysAndValuesDo: [:key :value |" +
	"\n\t\t(self class canUnderstand: key, ':') ifTrue: [" +
	"\n\t\t\tself perform: key, ':' with: value]].",
	null, "2012-08-02T12:05:49Z", "mp");

jst.FYTaxon.addMethod("values:", "aDictionary", "accessing", 
	"\t\"viz #asDictionary\"" +
	"\n\taDictionary keysAndValuesDo: [:key :value |" +
	"\n\t\t(self respondsTo: key asMutator) ifTrue: [" +
	"\n\t\t\tself perform: key asMutator with: value]].",
	null, "2013-01-23T22:05:49Z", "mp");
*/

jst.FYTaxon.addMethod("asStoreData", "", "converting", 
	"\t^ {Dictionary new " +
	"\n\t\tat: 'value' put: self;" +
	"\n\t\tasJsObject}",
	null, "2012-08-15T14:08:37Z", "mp");

jst.FYTaxon.addMethod("jePlodina", "", "testing", 
	"\t^ false",
	null, "2012-08-15T13:56:35Z", "mp");

jst.FYTaxon.addMethod("rise", "", "accessing", 
	"\t^ rise",
	null, "2012-08-17T12:35:10Z", "mp");

jst.FYTaxon.addMethod("rise:", "aString", "accessing", 
	"\trise := aString",
	null, "2012-08-17T12:36:09Z", "mp");

jst.FYTaxon.addMethod("trida:", "aString", "accessing", 
	"\ttrida := aString",
	null, "2012-08-17T12:35:28Z", "mp");

jst.FYTaxon.addMethod("trida", "", "accessing", 
	"\t^ trida",
	null, "2012-08-17T12:35:42Z", "mp");

jst.FYTaxon.addMethod("rad", "", "accessing", 
	"\t^ rad",
	null, "2012-08-17T12:35:48Z", "mp");

jst.FYTaxon.addMethod("rad:", "aString", "accessing", 
	"\trad := aString",
	null, "2012-08-17T12:36:15Z", "mp");

jst.FYTaxon.addMethod("celed", "", "accessing", 
	"\t^ celed",
	null, "2012-08-17T12:35:54Z", "mp");

jst.FYTaxon.addMethod("celed:", "aString", "accessing", 
	"\tceled := aString",
	null, "2012-08-17T12:36:23Z", "mp");

jst.FYTaxon.addMethod("taxon", "", "accessing", 
	"\t^ self",
	null, "2013-01-29T15:28:57Z", "mp");

jst.FYTaxon.addMethod("taxon", "", "accessing", 
	"\t^ (zmeny isKindOf: FYTaxon) " +
	"\n\t\tifTrue: zmeny " +
	"\n\t\tifFalse: self",
	null, "2013-02-03T22:47:55Z", "mp");

jst.FYTaxon.addMethod("zmeny", "", "accessing", 
	"\t^ zmeny",
	null, "2013-02-02T19:30:44Z", "mp");

jst.FYTaxon.addMethod("zmeny:", "anObject", "accessing", 
	"\t\"a FYTaxon or a dictionary\"" +
	"\n\tzmeny := anObject",
	null, "2013-02-03T21:59:02Z", "mp");

jst.FYTaxon.addMethod("jsonKeys", "", "private", 
	"\t^ super jsonKeys copyWithout: #zmeny",
	null, "2013-02-03T21:46:07Z", "mp");

jst.FYTaxon.addMethod("formValues", "", "accessing", 
	"\t| values |" +
	"\n\t(zmeny isKindOf: FYTaxon) ifTrue: [" +
	"\n\t\t^ zmeny formValues]." +
	"\n\tvalues := self asDictionary." +
	"\n\tzmeny ifNotNil: [" +
	"\n\t\tzmeny keysAndValuesDo: [:k :v |" +
	"\n\t\t\tvalues at: k put: v]]." +
	"\n\t^ values",
	null, "2013-02-03T22:38:02Z", "mp", 1);

jst.FYTaxon.addMethod("formValues", "", "accessing", 
	"\t| values |" +
	"\n\t(zmeny isKindOf: FYTaxon) ifTrue: [" +
	"\n\t\t^ zmeny formValues]." +
	"\n\tvalues := self asDictionary." +
	"\n\tzmeny ifNotNil: [" +
	"\n\t\tzmeny keysAndValuesDo: [:k :v |" +
	"\n\t\t\tvalues at: k put: v]]." +
	"\n\tpublikovat ifNil: [" +
	"\n\t\tvalues at: #publikovat put: true]." +
	"\n\t^ values",
	null, "2014-01-15T10:18:49Z", "mp"); //fytoportal-core

jst.FYTaxon.addMethod("publikovat", "", "accessing", 
	"\t^ publikovat ~= false",
	null, "2014-01-15T08:18:21Z", "mp");

jst.FYTaxon.addMethod("publikovat:", "aBoolean", "accessing", 
	"\tpublikovat := aBoolean",
	null, "2014-01-15T10:26:43Z", "mp");

jst.FYTaxon.addMethod("popis", "", "accessing", 
	"\t^ ''",
	null, "2013-04-17T07:06:32Z", "mp");

jst.FYTaxon.addMethod("jeMetodikaSO", "", "testing", 
	"\t^ false",
	null, "2013-04-23T12:22:46Z", "mp");

jst.FYTaxon.addMethod("kodyZmeny", "", "accessing", 
	"\t\"vraci i zmenene kody, potrebuji do semaforu\"" +
	"\n\t^ (zmeny isKindOf: FYTaxon) " +
	"\n\t\tifTrue: [zmeny kody]" +
	"\n\t\tifFalse: [zmeny " +
	"\n\t\t\tifNotNil: [self convertList: (zmeny at: #kody ifAbsent: nil)]" +
	"\n\t\t\tifNil: kody]",
	null, "2013-04-29T14:59:07Z", "mp");

/*
jst.FYTaxon._class.addMethod("renderOn:", "html", "rendering", 
	"\thtml div class: 'taxon-nazev'; with: [" +
	"\n\t\thtml tpl if: 'cesky.length > 0'; with: [" +
	"\n\t\t\thtml span class: 'cesky'; with: '{cesky}'." +
	"\n\t\t\thtml br]." +
	"\n\t\thtml tpl if: 'latinsky.length > 0'; with: [" +
	"\n\t\t\thtml span class: 'latinsky'; with: '{latinsky}'." +
	"\n\t\t\thtml br]]." +
	"\n\thtml tpl if: 'rise.length > 0 || trida.length > 0 || rad.length > 0 || celed.length > 0'; with: [html p: [" +
	"\n\t\thtml tpl if: 'rise.length > 0'; with: [html bold: 'říše '; text: '{rise}   ']." +
	"\n\t\thtml tpl if: 'rad.length > 0'; with: [html bold: 'řád '; text: '{rad}   ']." +
	"\n\t\thtml tpl if: 'trida.length > 0'; with: [html bold: 'třída '; text: '{trida}   ']." +
	"\n\t\thtml tpl if: 'celed.length > 0'; with: [html bold: 'čeleď '; text: '{celed}   ']." +
	"\n\t]]." +
	"\n\thtml p: [" +
	"\n\t\thtml strong: 'Vědecká synonyma: '." +
	"\n\t\thtml span class: 'latinsky'; with: '{synonyma}'." +
	"\n\t]." +
	"\n\thtml p: [\t" +
	"\n\t\thtml strong: 'Další názvy: '; text: '{dalsiNazvy}']." +
	"\n\thtml p: [" +
	"\n\t\thtml strong: 'EPPO kódy: '; text: '{kody}']",
	null, "2013-02-04T22:26:59Z", "mp");

presunuto do FYTiskTaxonu
jst.FYTaxon.addMethod("renderOn:", "html", "rendering", 
	"\thtml div class: 'taxon-nazev'; with: [" +
	"\n\t\tcesky ifNotNil: [" +
	"\n\t\t\thtml span class: 'cesky'; with: cesky." +
	"\n\t\t\thtml br]." +
	"\n\t\tlatinsky ifNotNil: [" +
	"\n\t\t\thtml span class: 'latinsky'; with: latinsky." +
	"\n\t\t\thtml br]" +
	"\n\t]." +
	"\n\trise notNil | trida notNil | rad notNil | celed notNil ifTrue: [html p: [" +
	"\n\t\trise ifNotNil: [html bold: 'říše '; text: rise, '   ']." +
	"\n\t\trad ifNotNil: [html bold: 'řád '; text: rad, '   ']." +
	"\n\t\ttrida ifNotNil: [html bold: 'třída '; text: trida, '   ']." +
	"\n\t\tceled ifNotNil: [html bold: 'čeleď '; text: celed, '   ']." +
	"\n\t]]." +
	"\n\thtml p: [" +
	"\n\t\thtml strong: 'Vědecká synonyma: '." +
	"\n\t\thtml span class: 'latinsky'; with: (synonyma asTextualList: #yourself separator: ', ')]." +
	"\n\thtml p: [\t" +
	"\n\t\thtml strong: 'Další názvy: '; text: (dalsiNazvy asTextualList: #yourself separator: ', ')]." +
	"\n\thtml p: [" +
	"\n\t\thtml strong: 'EPPO kódy: '; text: (kody asTextualList: #yourself separator: ', ')]",
	null, "2013-02-05T14:37:08Z", "mp", 1);

jst.FYTaxon.addMethod("renderOn:", "html", "rendering", 
	"\t| dict klasif |" +
	"\n\tdict := Dictionary new." +
	"\n\tself formValues keysAndValuesDo: [:k :v |" +
	"\n\t\tv isEmptyOrNil ifFalse: [" +
	"\n\t\t\tdict at: k put: v]]." +
	"\n\thtml div class: 'taxon-nazev'; with: [" +
	"\n\t\tdict at: #cesky ifPresent: [:str |" +
	"\n\t\t\thtml span class: 'cesky'; with: str." +
	"\n\t\t\thtml br]." +
	"\n\t\tdict at: #latinsky ifPresent: [:str |" +
	"\n\t\t\thtml span class: 'latinsky'; with: str." +
	"\n\t\t\thtml br]" +
	"\n\t]." +
	"\n\tklasif := #(rise trida rad celed)." +
	"\n\t(klasif anySatisfy: [:k | dict includesKey: k]) ifTrue: [html p: [ | nazvy |" +
	"\n\t\tnazvy := {'říše'. 'třída'. 'řád'. 'čeleď'}." +
	"\n\t\tklasif withIndexDo: [:k :i |" +
	"\n\t\t\tdict at: k ifPresent: [:str | " +
	"\n\t\t\t\thtml strong: (nazvy at: i), ' '; text: str, '   ']" +
	"\n\t\t]" +
	"\n\t]]." +
	"\n\thtml p: [" +
	"\n\t\thtml strong: 'Vědecká synonyma: '." +
	"\n\t\thtml span class: 'latinsky'; with: (dict at: #synonyma ifAbsent: '')]." +
	"\n\thtml p: [\t" +
	"\n\t\thtml strong: 'Další názvy: '; text: (dict at: #dalsiNazvy ifAbsent: '')]." +
	"\n\thtml p: [" +
	"\n\t\thtml strong: 'EPPO kódy: '; text: (dict at: #kody ifAbsent: '')]",
	null, "2013-02-05T15:49:15Z", "mp", 1);

jst.FYTaxon.addMethod("renderOn:", "html", "rendering", 
	"\t| taxon klasif |" +
	"\n\ttaxon := FYTaxon newFrom: self formValues asJsObject." +
	"\n\thtml div class: 'taxon-nazev'; with: [" +
	"\n\t\ttaxon cesky ifNotNilDo: [:str |" +
	"\n\t\t\thtml span class: 'cesky'; with: str." +
	"\n\t\t\thtml br]." +
	"\n\t\ttaxon latinsky ifNotNilDo: [:str |" +
	"\n\t\t\thtml span class: 'latinsky'; with: str." +
	"\n\t\t\thtml br]" +
	"\n\t]." +
	"\n\tklasif := #(rise trida rad celed)." +
	"\n\t(klasif anySatisfy: [:k | (taxon perform: k) notNil]) ifTrue: [html p: [ | nazvy |" +
	"\n\t\tnazvy := {'říše'. 'třída'. 'řád'. 'čeleď'}." +
	"\n\t\tklasif withIndexDo: [:k :i |" +
	"\n\t\t\t(taxon perform: k) ifNotNilDo: [:str | | casti |" +
	"\n\t\t\t\tcasti := str findTokens: '()'." +
	"\n\t\t\t\thtml strong: (nazvy at: i), ': '." +
	"\n\t\t\t\tcasti size = 2 " +
	"\n\t\t\t\t\tifTrue: [html text: casti first, ' ('." +
	"\n\t\t\t\t\t\thtml span class: 'latinsky'; with: casti second." +
	"\n\t\t\t\t\t\thtml text: ')']" +
	"\n\t\t\t\t\tifFalse: [\thtml text: str]." +
	"\n\t\t\t\thtml text: '   ']" +
	"\n\t\t]" +
	"\n\t]]." +
	"\n\thtml p: [" +
	"\n\t\thtml strong: 'Vědecká synonyma: '." +
	"\n\t\thtml span class: 'latinsky'; with: taxon synonyma]." +
	"\n\thtml p: [\t" +
	"\n\t\thtml strong: 'Další názvy: '; text: taxon dalsiNazvy]." +
	"\n\thtml p: [" +
	"\n\t\thtml strong: 'EPPO kódy: '; text: taxon kody]",
	null, "2013-04-17T08:27:03Z", "mp", 1);

jst.FYTaxon.addMethod("renderOn:", "html", "rendering", 
	"\t| taxon klasif |" +
	"\n\ttaxon := FYTaxon newFrom: self formValues asJsObject." +
	"\n\thtml div class: 'taxon-nazev'; with: [" +
	"\n\t\ttaxon cesky ifNotNilDo: [:str |" +
	"\n\t\t\thtml span class: 'cesky'; with: str." +
	"\n\t\t\thtml br]." +
	"\n\t\ttaxon latinsky ifNotNilDo: [:str |" +
	"\n\t\t\thtml span class: 'latinsky'; with: str." +
	"\n\t\t\thtml br]" +
	"\n\t]." +
	"\n\tklasif := #(rise trida rad celed)." +
	"\n\t(klasif anySatisfy: [:k | (taxon perform: k) isEmptyOrNil not]) ifTrue: [html p: [ | nazvy |" +
	"\n\t\tnazvy := {'říše'. 'třída'. 'řád'. 'čeleď'}." +
	"\n\t\tklasif withIndexDo: [:k :i | | str |" +
	"\n\t\t\t(str := taxon perform: k) isEmptyOrNil ifFalse: [ | casti |" +
	"\n\t\t\t\tcasti := str findTokens: '()'." +
	"\n\t\t\t\thtml strong: (nazvy at: i), ': '." +
	"\n\t\t\t\tcasti size = 2 " +
	"\n\t\t\t\t\tifTrue: [html text: casti first, ' ('." +
	"\n\t\t\t\t\t\thtml span class: 'latinsky'; with: casti second." +
	"\n\t\t\t\t\t\thtml text: ')']" +
	"\n\t\t\t\t\tifFalse: [\thtml text: str]." +
	"\n\t\t\t\thtml text: '   ']" +
	"\n\t\t]" +
	"\n\t]]." +
	"\n\thtml p: [" +
	"\n\t\thtml strong: 'Vědecká synonyma: '." +
	"\n\t\thtml span class: 'latinsky'; with: taxon synonyma]." +
	"\n\thtml p: [\t" +
	"\n\t\thtml strong: 'Další názvy: '; text: taxon dalsiNazvy]." +
	"\n\thtml p: [" +
	"\n\t\thtml strong: 'EPPO kódy: '; text: taxon kody]",
	null, "2013-04-25T15:45:59Z", "mp", 1);

jst.FYTaxon.addMethod("renderOn:", "html", "rendering", 
	"\t| taxon klasif |" +
	"\n\ttaxon := FYTaxon newFrom: self formValues asJsObject." +
	"\n\thtml div class: 'taxon-nazev'; with: [" +
	"\n\t\ttaxon cesky ifNotNilDo: [:str |" +
	"\n\t\t\thtml span class: 'cesky'; with: (str truncateWithElipsisTo: 200)." +
	"\n\t\t\thtml br]." +
	"\n\t\ttaxon latinsky ifNotNilDo: [:str |" +
	"\n\t\t\thtml span class: 'latinsky'; with: (str truncateWithElipsisTo: 200)." +
	"\n\t\t\thtml br]" +
	"\n\t]." +
	"\n\tklasif := #(rise trida rad celed)." +
	"\n\t(klasif anySatisfy: [:k | (taxon perform: k) isEmptyOrNil not]) ifTrue: [html p: [ | nazvy |" +
	"\n\t\tnazvy := {'říše'. 'třída'. 'řád'. 'čeleď'}." +
	"\n\t\tklasif withIndexDo: [:k :i | | str |" +
	"\n\t\t\t(str := taxon perform: k) isEmptyOrNil ifFalse: [ | casti |" +
	"\n\t\t\t\tcasti := str findTokens: '()'." +
	"\n\t\t\t\thtml strong: (nazvy at: i), ': '." +
	"\n\t\t\t\tcasti size = 2 " +
	"\n\t\t\t\t\tifTrue: [html text: casti first, ' ('." +
	"\n\t\t\t\t\t\thtml span class: 'latinsky'; with: casti second." +
	"\n\t\t\t\t\t\thtml text: ')']" +
	"\n\t\t\t\t\tifFalse: [\thtml text: str]." +
	"\n\t\t\t\thtml text: '   ']" +
	"\n\t\t]" +
	"\n\t]]." +
	"\n\thtml p: [" +
	"\n\t\thtml strong: 'Vědecká synonyma: '." +
	"\n\t\thtml span class: 'latinsky'; with: taxon synonyma]." +
	"\n\thtml p: [\t" +
	"\n\t\thtml strong: 'Další názvy: '; text: taxon dalsiNazvy]." +
	"\n\thtml p: [" +
	"\n\t\thtml strong: 'EPPO kódy: '; text: taxon kody]",
	null, "2013-11-14T09:17:17Z", "mp", 1);

jst.FYTaxon.addMethod("renderOn:", "html", "rendering", 
	"\tself renderOn: html without: #()",
	null, "2013-12-17T08:52:25Z", "mp", 1);

jst.FYTaxon.addMethod("renderOn:", "html", "rendering", 
	"\tself renderOn: html without: #() ref: nil",
	null, "2014-02-17T13:22:45Z", "mp"); //fytoportal-core

jst.FYTaxon.addMethod("renderOn:without:ref:", "html list anUrl", "rendering", 
	"\t| taxon klasif |" +
	"\n\ttaxon := FYTaxon newFrom: self formValues asJsObject." +
	"\n\thtml div class: 'taxon-nazev'; with: [" +
	"\n\t\ttaxon cesky ifNotNilDo: [:str |" +
	"\n\t\t\thtml span class: 'cesky'; with: [anUrl " +
	"\n\t\t\t\tifNil: [html text: (str truncateWithElipsisTo: 200)]" +
	"\n\t\t\t\tifNotNil: [html anchor " +
	"\n\t\t\t\t\thref: (anUrl asString format: {id} \"musim doplnit id taxonu\"); " +
	"\n\t\t\t\t\twith: (str truncateWithElipsisTo: 200)]]." +
	"\n\t\t\thtml br]." +
	"\n\t\ttaxon latinsky ifNotNilDo: [:str |" +
	"\n\t\t\thtml span class: 'latinsky'; with: (str truncateWithElipsisTo: 200)." +
	"\n\t\t\thtml br]" +
	"\n\t]." +
	"\n\tklasif := #(rise trida rad celed)." +
	"\n\t(klasif anySatisfy: [:k | (taxon perform: k) isEmptyOrNil not]) ifTrue: [html p: [ | nazvy |" +
	"\n\t\tnazvy := {'říše'. 'třída'. 'řád'. 'čeleď'}." +
	"\n\t\tklasif withIndexDo: [:k :i | | str |" +
	"\n\t\t\t(str := taxon perform: k) isEmptyOrNil ifFalse: [ | casti |" +
	"\n\t\t\t\tcasti := str findTokens: '()'." +
	"\n\t\t\t\thtml strong: (nazvy at: i), ': '." +
	"\n\t\t\t\tcasti size = 2 " +
	"\n\t\t\t\t\tifTrue: [html text: casti first, ' ('." +
	"\n\t\t\t\t\t\thtml span class: 'latinsky'; with: casti second." +
	"\n\t\t\t\t\t\thtml text: ')']" +
	"\n\t\t\t\t\tifFalse: [\thtml text: str]." +
	"\n\t\t\t\thtml text: '   ']" +
	"\n\t\t]" +
	"\n\t]]." +
	"\n\ttaxon dalsiNazvy isEmpty ifFalse: [html p: [\t" +
	"\n\t\thtml strong: 'další názvy: '; text: taxon dalsiNazvy]]." +
	"\n\t((list includes: #synonyma) or: [taxon synonyma isEmpty]) ifFalse: [html p: [" +
	"\n\t\thtml strong: 'vědecká synonyma: '." +
	"\n\t\thtml span class: 'latinsky'; with: taxon synonyma]]." +
	"\n\t((list includes: #kody) or: [taxon kody isEmpty]) ifFalse: [html p: [" +
	"\n\t\thtml strong: 'EPPO kódy: '; text: taxon kody]]",
	null, "2014-02-17T13:30:54Z", "mp", 1);

jst.FYTaxon.addMethod("renderOn:without:ref:", "html list anUrl", "rendering", 
	"\t| taxon klasif |" +
	"\n\ttaxon := FYTaxon newFrom: self formValues asJsObject." +
	"\n\thtml div class: 'taxon-nazev'; with: [" +
	"\n\t\ttaxon cesky ifNotNilDo: [:str |" +
	"\n\t\t\thtml span class: 'cesky'; with: [anUrl " +
	"\n\t\t\t\tifNil: [html text: str]" +
	"\n\t\t\t\tifNotNil: [html anchor " +
	"\n\t\t\t\t\thref: (anUrl asString format: {id} \"musim doplnit id taxonu\"); " +
	"\n\t\t\t\t\twith: (str truncateWithElipsisTo: 200)]]." +
	"\n\t\t\thtml br]." +
	"\n\t\ttaxon latinsky ifNotNilDo: [:str |" +
	"\n\t\t\thtml span class: 'latinsky'; with: [anUrl " +
	"\n\t\t\t\tifNil: [html text: str]" +
	"\n\t\t\t\tifNotNil: [html text: (str truncateWithElipsisTo: 200)]]." +
	"\n\t\t\thtml br]" +
	"\n\t]." +
	"\n\tklasif := #(rise trida rad celed)." +
	"\n\t(klasif anySatisfy: [:k | (taxon perform: k) isEmptyOrNil not]) ifTrue: [html p: [ | nazvy |" +
	"\n\t\tnazvy := {'říše'. 'třída'. 'řád'. 'čeleď'}." +
	"\n\t\tklasif withIndexDo: [:k :i | | str |" +
	"\n\t\t\t(str := taxon perform: k) isEmptyOrNil ifFalse: [ | casti |" +
	"\n\t\t\t\tcasti := str findTokens: '()'." +
	"\n\t\t\t\thtml strong: (nazvy at: i), ': '." +
	"\n\t\t\t\tcasti size = 2 " +
	"\n\t\t\t\t\tifTrue: [html text: casti first, ' ('." +
	"\n\t\t\t\t\t\thtml span class: 'latinsky'; with: casti second." +
	"\n\t\t\t\t\t\thtml text: ')']" +
	"\n\t\t\t\t\tifFalse: [\thtml text: str]." +
	"\n\t\t\t\thtml text: '   ']" +
	"\n\t\t]" +
	"\n\t]]." +
	"\n\ttaxon dalsiNazvy isEmpty ifFalse: [html p: [\t" +
	"\n\t\thtml strong: 'další názvy: '; text: taxon dalsiNazvy]]." +
	"\n\t((list includes: #synonyma) or: [taxon synonyma isEmpty]) ifFalse: [html p: [" +
	"\n\t\thtml strong: 'vědecká synonyma: '." +
	"\n\t\thtml span class: 'latinsky'; with: taxon synonyma]]." +
	"\n\t((list includes: #kody) or: [taxon kody isEmpty]) ifFalse: [html p: [" +
	"\n\t\thtml strong: 'EPPO kódy: '; text: taxon kody]]",
	null, "2014-02-26T16:34:46Z", "mp"); //fytoportal-core
*/

jst.FYTaxon.addMethod("asTreeNode", "", "converting", 
	"\t^ ExtTreeNode new" +
	"\n\t\tid: id;" +
	"\n\t\tleaf: true;" +
	"\n\t\ttext: self cesky",
	null, "2013-07-01T20:11:52Z", "mp", 1);

jst.FYTaxon.addMethod("asTreeNode", "", "converting", 
	"\t^ ExtTreeNode new" +
	"\n\t\tid: id;" +
	"\n\t\tleaf: true;" +
	"\n\t\ttext: self nazev",
	null, "2013-11-13T14:15:27Z", "mp"); //fytoportal-core

jst.FYTaxon.addMethod("postCopy", "", "copying", 
	"\tid := nil",
	null, "2013-11-13T11:04:50Z", "mp");

jst.FYTaxon.addMethod("nazev", "", "accessing", 
	"\t^ cesky ifNil: latinsky",
	null, "2013-11-13T11:26:55Z", "mp");

jst.FYTaxon.addMethod("hostitele", "", "accessing", 
	"\t^ nil",
	null, "2013-09-04T20:59:31Z", "mp");

//*** FYPlodina ***

/*
jst.FYPlodina.addMethod("asDictionary", "", "converting", 
	"\t| dict |" +
	"\n\tdict := super asDictionary." +
	"\n\t\"uprava pro checkbox\"" +
	"\n\tdict at: 'skupiny' put: ((self skupiny collect: [:sk | 'sk-', sk]) asTextualList: #yourself separator: ',')." +
	"\n\t^ dict",
	null, "2012-08-02T14:16:51Z", "mp");

jst.FYPlodina.addMethod("asDictionary", "", "converting", 
	"\t| dict |" +
	"\n\tdict := super asDictionary." +
	"\n\t\"uprava pro checkbox\"" +
	"\n\tdict at: 'skupiny' put: (self skupiny inject: Dictionary new into: [:dict :sk | dict at: 'sk-', sk put: true; yourself]) asJsObject." +
	"\n\t^ dict",
	null, "2012-08-02T14:41:30Z", "mp"); //jst-fytoportal

jst.FYPlodina.addMethod("skupiny:", "anObject", "accessing", 
	"\tskupiny := self convertList: anObject prefix: 'sk-'",
	null, "2012-08-02T14:20:27Z", "mp");
*/

jst.FYPlodina._class.addMethod("initialize", "", "class initialization", 
	"\tPopisRastr := '<b>Popis:</b><br><br><br><b>Nároky na stanoviště:</b><br><br><br><b>Zaplevelení:</b><br><br><br><b>Literatura:</b><br><br>'.",
	null, "2012-08-17T12:18:23Z", "mp");

jst.initializeClass(jst.FYPlodina);

jst.FYPlodina._class.addMethod("constructFromJson:", "jsonObject", "instance creation", 
	"\t| plod |" +
	"\n\tplod := super constructFromJson: jsonObject." +
	"\n\tplod skupiny isEmptyOrNil ifTrue: [" +
	"\n\t\t\"nactu skupinu z puvodniho  atributu\"" +
	"\n\t\t(Dictionary on: jsonObject) at: #skupina ifPresent: [:sk |" +
	"\n\t\t\tplod skupiny: sk asCollection]]." +
	"\n\t^ plod",
	null, "2013-09-09T09:28:05Z", "mp");

jst.FYPlodina.addMethod("asDictionary", "", "converting", 
	"\t| dict |" +
	"\n\tdict := super asDictionary." +
	"\n\tpopis isEmptyOrNil ifTrue: [" +
	"\n\t\tdict at: 'popis' put: PopisRastr]." +
	"\n\t\"pridam skupiny pro checkboxy\"" +
	"\n\tskupiny asCollection do: [:sk |" +
	"\n\t\tdict at: #'sk-', sk put: true]." +
	"\n\tdict removeKey: #skupiny." +
	"\n\t^ dict",
	null, "2012-09-24T06:18:18Z", "mp");

jst.FYPlodina.addMethod("popis:", "aString", "accessing", 
	"\tpopis := aString = PopisRastr ifFalse: aString",
	null, "2012-08-17T12:20:30Z", "mp");

jst.FYPlodina.addMethod("popis", "", "accessing", 
	"\t^ popis",
	null, "2012-08-14T20:40:04Z", "mp");

jst.FYPlodina.addMethod("skupiny", "", "accessing", 
	"\t^ skupiny",
	null, "2012-09-07T14:29:00Z", "mp", 1);

jst.FYPlodina.addMethod("skupiny", "", "accessing", 
	"\t^ skupiny ifNil: #()",
	null, "2013-12-03T07:49:12Z", "mp"); //fytoportal-core

jst.FYPlodina.addMethod("skupiny:", "anObject", "accessing", 
	"\tskupiny := self convertList: anObject",
	null, "2012-08-02T14:20:27Z", "mp");

jst.FYPlodina.addMethod("values:", "aDictionary", "accessing", 
	"\tsuper values: aDictionary." +
	"\n\t(self parseList: aDictionary prefix: #'sk-') asArray ifNotEmptyDo: [:arr |" +
	"\n\t\t\"zajisti, ze nevymazu skupiny pri editaci popisu - form values totiz nevraci zadne polozky sk-\"" +
	"\n\t\tskupiny := arr]",
	null, "2012-09-07T14:32:14Z", "mp");

jst.FYPlodina.addMethod("jePlodina", "", "testing", 
	"\t^ true",
	null, "2012-08-15T13:56:51Z", "mp");

jst.FYPlodina.addMethod("parent", "", "accessing", 
	"\t^ parent",
	null, "2012-08-22T19:36:50Z", "mp");

jst.FYPlodina.addMethod("parent:", "plodinaId", "accessing", 
	"\tparent := plodinaId",
	null, "2012-08-22T19:37:15Z", "mp");

jst.FYPlodina.addMethod("isParent", "", "accessing", 
	"\t\"urcuje, zda ma plodina podrizene druhy\"" +
	"\n\t^ isParent ifNil: false",
	null, "2012-08-25T11:58:22Z", "mp");

jst.FYPlodina.addMethod("isParent:", "aBoolean", "accessing", 
	"\tisParent := aBoolean",
	null, "2012-08-25T11:33:24Z", "mp");

//*** FYSkodlOrg ***

jst.FYSkodlOrg.addMethod("asDictionary", "", "converting", 
	"\t| dict |" +
	"\n\tdict := super asDictionary." +
	"\n\tdict at: #plodiny put: (plodiny asTextualList: #yourself separator: $,)." +
	"\n\t^ dict",
	null, "2012-08-28T07:52:24Z", "mp");

jst.FYSkodlOrg.addMethod("plodiny", "", "accessing", 
	"\t^ plodiny ifNil: #()",
	null, "2012-06-13T13:30:12Z", "mp");

jst.FYSkodlOrg.addMethod("plodiny:", "anObject", "accessing", 
	"\tplodiny := self convertList: anObject",
	null, "2012-08-03T11:28:07Z", "mp");

jst.FYSkodlOrg.addMethod("jePlevel", "", "testing", 
	"\t^ zarazeni = #plevel or: [zarazeni includesSubString: 'parazit']",
	null, "2014-02-14T14:00:10Z", "mp"); //fytoportal-core

/* zruseno
jst.FYSkodlOrg.addMethod("nadrazenePlodiny", "", "accessing", 
	"\t^ nadrazenePlodiny ifNil: #()",
	null, "2012-08-27T20:46:02Z", "mp");

jst.FYSkodlOrg.addMethod("nadrazenePlodiny:", "aCollection", "accessing", 
	"\tnadrazenePlodiny := aCollection",
	null, "2012-08-27T20:46:20Z", "mp");
*/

jst.FYSkodlOrg.addMethod("zarazeni", "", "accessing", 
	"\t^ zarazeni",
	null, "2012-06-13T13:30:27Z", "mp");

jst.FYSkodlOrg.addMethod("zarazeni:", "aString", "accessing", 
	"\tzarazeni := aString",
	null, "2012-08-02T13:33:26Z", "mp");

jst.FYSkodlOrg.addMethod("typ", "", "accessing", 
	"\t^ typ",
	null, "2012-06-13T13:30:40Z", "mp");

jst.FYSkodlOrg.addMethod("hostitele", "", "accessing", 
	"\t^ plodiny",
	null, "2013-09-04T21:00:55Z", "mp", 1);

jst.FYSkodlOrg.addMethod("hostitele", "", "accessing", 
	"\t^ self plodiny",
	null, "2014-03-04T15:01:35Z", "mp"); //fytoportal-core

jst.FYSkodlOrg.addMethod("puvodciChoroby", "", "accessing", 
	"\t^ puvodciChoroby ifNil: #()",
	null, "2014-02-22T21:09:08Z", "mp");

jst.FYSkodlOrg.addMethod("puvodciChoroby:", "aCollection", "accessing", 
	"\tpuvodciChoroby := aCollection",
	null, "2014-02-22T21:07:28Z", "mp");

//*** FYOdruda ***

jst.FYOdruda.addMethod("printOn:", "aStream", "printing", 
	"\taStream " +
	"\n\t\tnextPutAll: nazev;" +
	"\n\t\tspace;" +
	"\n\t\tnextPutAll: kod",
	null, "2014-05-18T19:20:25Z", "mp");

jst.FYOdruda.addMethod("<=", "odr", "comparing", 
	"\t^ nazev <= odr nazev",
	null, "2014-05-18T19:41:33Z", "mp");

jst.FYOdruda.addMethod("nazev", "", "accessing", 
	"\t^ nazev",
	null, "2014-05-18T19:41:47Z", "mp");

jst.FYOdruda.addMethod("kod", "", "accessing", 
	"\t^ kod",
	null, "2014-05-19T06:27:52Z", "mp");

jst.FYOdruda.addMethod("popis", "", "accessing", 
	"\t^ popis",
	null, "2014-05-19T06:27:59Z", "mp");

//*** FYFotografie ***

jst.FYFotografie.addMethod("=", "jinaFotka", "comparing", 
	"\t^ id = jinaFotka id",
	null, "2014-03-10T12:46:53Z", "mp", 1);

jst.FYFotografie.addMethod("=", "jinaFotka", "comparing", 
	"\t^ jinaFotka notNil and: [id = jinaFotka id]",
	null, "2014-03-11T21:17:22Z", "mp"); //fytoportal-core

jst.FYFotografie.addMethod("id", "", "accessing", 
	"\t^ id",
	null, "2013-06-24T22:16:40Z", "mp");

jst.FYFotografie.addMethod("id:", "anObject", "accessing", 
	"\tid := anObject",
	null, "2013-11-30T23:04:29Z", "mp");

jst.FYFotografie.addMethod("autor", "", "accessing", 
	"\t^ autor",
	null, "2013-06-27T16:10:52Z", "mp");

jst.FYFotografie.addMethod("autor:", "aString", "accessing", 
	"\tautor := aString",
	null, "2013-06-27T16:11:04Z", "mp");

jst.FYFotografie.addMethod("plodina:", "aString", "accessing", 
	"\tplodina := aString",
	null, "2013-06-24T21:34:20Z", "mp", 1);

jst.FYFotografie.addMethod("plodina:", "aString", "accessing", 
	"\taString isEmptyOrNil ifFalse: [" +
	"\n\t\tplodina := aString" +
	"\n\t] ifTrue: [" +
	"\n\t\t\"nesmi byt prazdny text\"" +
	"\n\t\tplodina := nil]",
	null, "2013-12-02T08:53:45Z", "mp"); //fytoportal-core

jst.FYFotografie.addMethod("skodlOrg:", "aString", "accessing", 
	"\tskodlOrg := aString",
	null, "2013-06-24T21:34:35Z", "mp", 1);

jst.FYFotografie.addMethod("skodlOrg:", "aString", "accessing", 
	"\taString isEmptyOrNil ifFalse: [" +
	"\n\t\tskodlOrg := aString" +
	"\n\t] ifTrue: [" +
	"\n\t\t\"nesmi byt prazdny text\"" +
	"\n\t\tskodlOrg := nil]",
	null, "2013-12-02T08:53:27Z", "mp"); //fytoportal-core

jst.FYFotografie.addMethod("plodina", "", "accessing", 
	"\t^ plodina",
	null, "2013-06-25T14:53:28Z", "mp");

jst.FYFotografie.addMethod("skodlOrg", "", "accessing", 
	"\t^ skodlOrg",
	null, "2013-06-25T14:53:38Z", "mp");

jst.FYFotografie.addMethod("isDefault", "", "testing", 
	"\t^ default ifNil: false",
	null, "2013-06-25T15:07:11Z", "mp");

jst.FYFotografie.addMethod("default:", "anObject", "accessing", 
	"\tdefault := anObject = true or: [anObject = #on]",
	null, "2013-07-03T20:00:43Z", "mp");

jst.FYFotografie.addMethod("resetDefault", "", "accessing", 
	"\tdefault := nil",
	null, "2013-07-03T21:09:45Z", "mp");

jst.FYFotografie.addMethod("printOn:", "s", "printing", 
	"\tpopis " +
	"\n\t\tifNotNil: [s nextPutAll: 'Fotografie '; print: popis]" +
	"\n\t\tifNil: [super printOn: s]",
	null, "2013-06-27T10:25:05Z", "mp");

jst.FYFotografie.addMethod("format:", "aNumber", "accessing", 
	"\tformat := aNumber",
	null, "2013-05-20T08:42:34Z", "mp", 1);

jst.FYFotografie.addMethod("format:", "aNumber", "accessing", 
	"\tformat := (aNumber * 1000) rounded / 1000",
	null, "2013-12-02T08:41:15Z", "mp"); //fytoportal-core

jst.FYFotografie.addMethod("soubor:", "aString", "accessing", 
	"\tsoubor := aString",
	null, "2013-05-20T08:42:59Z", "mp");

jst.FYFotografie.addMethod("soubor", "", "accessing", 
	"\t^ soubor",
	null, "2013-05-20T08:43:09Z", "mp");

jst.FYFotografie.addMethod("soubory", "", "accessing", 
	"\t^ attachments",
	null, "2013-06-27T13:16:28Z", "mp");

jst.FYFotografie.addMethod("format", "", "accessing", 
	"\t^ format",
	null, "2013-05-20T08:43:18Z", "mp");

jst.FYFotografie.addMethod("popis", "", "accessing", 
	"\t^ popis",
	null, "2013-05-20T08:44:22Z", "mp");

jst.FYFotografie.addMethod("popis:", "aString", "accessing", 
	"\tpopis := aString",
	null, "2013-05-20T08:44:32Z", "mp");

/* zruseno
jst.FYFotografie.addMethod("nadrazenaPlodina", "", "accessing", 
	"\t^ nadrazenaPlodina",
	null, "2012-08-29T15:26:17Z", "mp");

jst.FYFotografie.addMethod("nadrazenaPlodina:", "id", "accessing", 
	"\tnadrazenaPlodina := id",
	null, "2012-08-29T15:26:26Z", "mp");
*/

jst.FYFotografie.addMethod("fotoUrl:", "name", "private", 
	"\t^ attachments " +
	"\n\t\tifNotNil: [(attachments at: name) url]" +
	"\n\t\tifNil: [soubor ifNotNil: [" +
	"\n\t\t\t'/fotogalerie/', name, '/', soubor]]",
	null, "2013-06-27T19:46:48Z", "mp");

jst.FYFotografie.addMethod("preview", "", "accessing", 
	"\t^ self fotoUrl: #preview",
	null, "2013-06-27T20:34:06Z", "mp");

jst.FYFotografie.addMethod("optimal", "", "accessing", 
	"\t^ self fotoUrl: #optimal",
	null, "2013-06-27T20:35:04Z", "mp");

jst.FYFotografie.addMethod("original", "", "accessing", 
	"\t^ self fotoUrl: #original",
	null, "2013-06-27T20:35:15Z", "mp");

jst.FYFotografie.addMethod("novaFotka", "", "testing", 
	"\t^ rev isNil or: [rev startsWith: '1-']",
	null, "2013-06-28T12:50:51Z", "mp");

jst.FYFotografie.addMethod("fotkaPlodiny", "", "testing", 
	"\t^ plodina notNil & skodlOrg isNil",
	null, "2013-07-04T14:39:22Z", "mp");

//*** FYFotoView ***

jst.FYFotoView.addMethod("initialize", "", "initialization", 
	"\tinDB := false",
	null, "2013-11-30T23:17:09Z", "mp");

jst.FYFotoView.addMethod("fotoUrl:", "name", "private", 
	"\t^ inDB" +
	"\n\t\tifTrue: [Fytoportal db url addToPath: id; addToPath: name]" +
	"\n\t\tifFalse: [super fotoUrl: name]",
	null, "2013-11-30T23:14:41Z", "mp");

jst.FYFotoView.addMethod("kratkyPopis", "", "accessing", 
	"\t^ popis ifNotNil: [popis truncateWithElipsisTo: 30] ifNil: ''",
	null, "2013-12-01T14:18:23Z", "mp");

jst.FYFotoView.addMethod("popis", "", "accessing", 
	"\t^ popis ifNil: ''",
	null, "2013-12-01T14:19:12Z", "mp");

//*** FYFotoSoubory ***
/*
jst.FYFotoSoubory.addMethod("preview", "", "accessing", 
	"\t^ preview",
	null, "2013-06-27T20:07:16Z", "mp");

jst.FYFotoSoubory.addMethod("optimal", "", "accessing", 
	"\t^ optimal",
	null, "2013-06-27T20:07:28Z", "mp");

jst.FYFotoSoubory.addMethod("original", "", "accessing", 
	"\t^ original",
	null, "2013-06-27T20:07:35Z", "mp");
*/
//*** PORPouzitiPrip ***

jst.PORPouzitiPrip.addMethod("bayerKody", "", "accessing", 
	"\t\"Bayer kody prirazene v databazi POR\"" +
	"\n\t^ bayerKody",
	null, "2013-04-11T13:18:04Z", "mp");

jst.PORPouzitiPrip.addMethod("mimo", "", "accessing", 
	"\t\"Bayer kody prirazene v databazi POR avsak vyrazene z pouziti\"" +
	"\n\t^ mimo ifNil: #()",
	null, "2013-04-11T13:19:38Z", "mp");

jst.PORPouzitiPrip.addMethod("text", "", "accessing", 
	"\t^ text",
	null, "2013-04-03T19:48:34Z", "mp");

jst.PORPouzitiPrip.addMethod("mapovani", "", "accessing", 
	"\t^ mapovani ifNil: #()",
	null, "2013-04-03T20:03:08Z", "mp");

jst.PORPouzitiPrip.addMethod("mapovani:", "anArray", "accessing", 
	"\t\"EPPO kody pridane v ramci Fytoportalu\"" +
	"\n\tmapovani := anArray asArray",
	null, "2013-04-03T20:38:14Z", "mp");

jst.PORPouzitiPrip.addMethod("mimoZmena", "", "accessing", 
	"\t\"i prazdne pole ma vyznam - rusi vse v mimo\"" +
	"\n\t^ mimoZmena",
	null, "2013-04-09T11:25:17Z", "mp");

jst.PORPouzitiPrip.addMethod("mimoZmena:", "anArrayOrNil", "accessing", 
	"\t\"Bayer kody, ktere se maji ignorovat - prazdne pole prekryje #mimo\"" +
	"\n\tmimoZmena := anArrayOrNil ifNotNil: [anArrayOrNil asArray]",
	null, "2013-04-09T11:26:39Z", "mp");

jst.PORPouzitiPrip.addMethod("mimoKody", "", "accessing", 
	"\t^ mimoZmena ifNil: self mimo",
	null, "2013-04-09T12:44:26Z", "mp");

jst.PORPouzitiPrip.addMethod("kodyZmeneny:", "node", "testing", 
	"\t| m |" +
	"\n\tm := self mimoKody." +
	"\n\t^ node children anySatisfy: [:ch | " +
	"\n\t\t(ch checked and: [m includes: ch text]) or: [" +
	"\n\t\tch checked not and: [(m includes: ch text) not]]]",
	null, "2013-04-09T19:53:43Z", "mp");

jst.PORPouzitiPrip.addMethod("obsahujeKod:", "aString", "testing", 
	"\t^ (bayerKody includes: aString) or: [self mapovani includes: aString]",
	null, "2013-04-11T13:21:27Z", "mp");

//*** FYDataViews ***

jst.FYDataViews.addMethod("db:", "aCouchDB", "accessing", 
	"\tdb := aCouchDB",
	null, "2012-06-16T21:46:22Z", "mp");

jst.FYDataViews.addMethod("domain:", "aString", "accessing", 
	"\tdomain := aString",
	null, "2012-06-16T21:46:43Z", "mp");

jst.FYDataViews.addMethod("doc", "", "accessing", 
	"\t^ CouchDBDesignDoc new name: domain; owner: db",
	null, "2012-06-16T21:48:44Z", "mp");

jst.FYDataViews.addMethod("publicSuffix", "", "private", 
	"\t^ Browser location isPublic " +
	"\n\t\tifTrue: ['-public']" +
	"\n\t\tifFalse: ['']",
	null, "2014-01-19T23:08:20Z", "mp");

//*** FYTreePanel ***

/*
jst.FYTreePanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tself" +
	"\n\t\tborder: false;" +
	"\n\t\tautoScroll: true;" +
	"\n\t\tanimate: false;" +
	"\n\t\tcontainerScroll: true;" +
	"\n\t\trootVisible: false;" +
	"\n\t\tsingleExpand: true;" +
	"\n\t\troot: #()",
	null, "2012-11-09T21:14:02Z", "mp");
*/
jst.FYTreePanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tself" +
	"\n\t\tborder: false;" +
	"\n\t\tautoScroll: true;" +
	"\n\t\tanimate: false;" +
	"\n\t\tcontainerScroll: true;" +
	"\n\t\trootVisible: false;" +
	"\n\t\tsingleExpand: true;" +
	"\n\t\troot: ExtTreeNode new",
	null, "2013-04-11T21:28:51Z", "mp");

jst.FYTreePanel._class.addMethod("title:", "aString", "instance creation", 
	"\t^ self title: aString root: ExtTreeNode new",
	null, "2012-06-14T14:06:42Z", "mp");

jst.FYTreePanel._class.addMethod("title:root:", "aString aNode", "instance creation", 
	"\t^ self new" +
	"\n\t\ttitle: aString;" +
	"\n\t\troot: aNode",
	null, "2012-06-14T14:07:01Z", "mp");

//*** FYDataEPPTKody ***

jst.FYDataEPPTKody.addMethod("skupiny", "", "accessing", 
	"\t\"k danemu kodu vrati vsechny platne bezprostredne podrizene kody\"" +
	"\n\t^ self doc viewNamed: 'skupiny'",
	null, "2013-04-05T07:46:27Z", "mp");

jst.FYDataEPPTKody.addMethod("nadrazene", "", "accessing", 
	"\t\"k danemu kodu vrati vsechny platne bezprostredne nadrazene kody\"" +
	"\n\t^ self doc viewNamed: 'nadrazene'",
	null, "2013-04-05T07:46:21Z", "mp");

/*
jst.FYDataEPPTKody.addMethod("pridejNadrazene:", "kody", "accessing", 
	"\t | vsechny |" +
	"\n\t\"zatim vcetne pripadnych duplicit\"" +
	"\n\tvsechny := OrderedCollection withAll: kody." +
	"\n\tkody do: [:kod | kod first = $1 ifFalse: [" +
	"\n\t\t\"pridam nadrazeny kod\"" +
	"\n\t\t(self nadrazene lookupKey: kod) do: [:dict |" +
	"\n\t\t\tvsechny add: (dict at: #value)]" +
	"\n\t]]." +
	"\n\t^ vsechny",
	null, "2013-04-05T09:46:13Z", "mp");
*/
jst.FYDataEPPTKody.addMethod("pridejNadrazene:", "kody", "accessing", 
	"\t| vsechny |" +
	"\n\tvsechny := SortedCollection new." +
	"\n\tkody do: [:kod |" +
	"\n\t\tvsechny addUnique: kod]." +
	"\n\t(self nadrazene lookupKeys: (vsechny select: [:kod | kod first ~= $1])) do: [:dict | | kod |" +
	"\n\t\tvsechny addUnique: (dict at: #value)]." +
	"\n\t^ vsechny asArray",
	null, "2013-05-17T10:02:05Z", "mp");

jst.FYDataEPPTKody.addMethod("nazvy", "", "accessing", 
	"\t\"k danemu kodu vraci ceske a latinske nzavy, preferovane jsou na zacatku\"" +
	"\n\t^ self doc viewNamed: 'nazvy'",
	null, "2013-04-12T13:34:30Z", "mp");

//*** FYDataPouzitiPOR ***

jst.FYDataPouzitiPOR.addMethod("plodiny", "", "accessing", 
	"\t^ self doc viewNamed: 'plodiny'",
	null, "2013-04-03T12:11:01Z", "mp");

jst.FYDataPouzitiPOR.addMethod("skodlOrg", "", "accessing", 
	"\t^ self doc viewNamed: 'skodlorg'",
	null, "2013-04-03T12:11:21Z", "mp");

jst.FYDataPouzitiPOR.addMethod("mapovaniPro:", "id", "accessing", 
	"\t^ self doc viewNamed: 'mapovani-', id asLowercase",
	null, "2013-04-05T07:02:15Z", "mp");

//*** FYDataPOR ***

jst.FYDataPOR.addMethod("semaforUdaje", "", "accessing", 
	"\t^ self doc viewNamed: 'semafor-udaje'",
	null, "2013-05-10T07:24:53Z", "mp");

/* presunuto do FYKapitolaPOR
jst.FYDataPOR.addMethod("nactiSemaforPro:pak:", "params aBlock", "accessing", 
	"\t| mapovani |" +
	"\n\t(semaforZamek notNil and: [DateAndTime now - semaforZamek < 1 minutes]) ifTrue: [" +
	"\n\t\t\"nacitani probiha\"" +
	"\n\t\tsemaforFronta add: params -> aBlock." +
	"\n\t\t^ self]." +
	"\n\tsemaforZamek := DateAndTime now." +
	"\n\tmapovani := Dictionary new." +
	"\n\tparams pairsDo: [:typ :kody | | sezn |" +
	"\n\t\tsezn := SortedCollection new." +
	"\n\t\t((Fytoportal data pouzitiPOR mapovaniPro: typ)" +
	"\n\t \t\tlookupKeys: (Fytoportal data epptKody pridejNadrazene: kody asCollection)) do: [:dict |" +
	"\n\t\t\t\tsezn addUnique: (dict at: #id)]." +
	"\n\t\tmapovani at: typ put: sezn]." +
	"\n\t(self semafor listNamed: 'plodiny-skodlorg') urlParams: mapovani; asyncQueryDo: [:data | | vysl |" +
	"\n\t\tvysl := SortedCollection sortBlock: [:a :b | a obchJmeno <= b obchJmeno]." +
	"\n\t\tdata collect: [:d | | prip |" +
	"\n\t\t\t(prip := d at: #value)" +
	"\n\t\t\t\tid: (d at: #id)." +
	"\n\t\t\tprip pouziti: prip pouziti asSortedCollection] " +
	"\n\t\tthenDo: [:prip | | dupl |" +
	"\n\t\t\t(dupl := vysl addUnique: prip) == prip ifFalse: [" +
	"\n\t\t\t\tdupl pouziti addAll: prip pouziti]]." +
	"\n\t\taBlock value: vysl." +
	"\n\t\tsemaforZamek := nil." +
	"\n\t\tsemaforFronta isEmpty ifFalse: [ | dalsi |" +
	"\n\t\t\tdalsi := semaforFronta removeFirst." +
	"\n\t\t\tself nactiSemaforPro: dalsi key pak: dalsi value]" +
	"\n\t]",
	null, "2013-05-17T08:56:37Z", "mp", 1);

jst.FYDataPOR.addMethod("nactiSemaforPro:pak:", "params aBlock", "accessing", 
	"\t| mapovani |" +
	"\n\tmapovani := Dictionary new." +
	"\n\tparams pairsDo: [:typ :kody | | sezn |" +
	"\n\t\tsezn := SortedCollection new." +
	"\n\t\t((Fytoportal data pouzitiPOR mapovaniPro: typ)" +
	"\n\t \t\tlookupKeys: (Fytoportal data epptKody pridejNadrazene: kody asCollection)) do: [:dict |" +
	"\n\t\t\t\tsezn addUnique: (dict at: #id)]." +
	"\n\t\tmapovani at: typ put: sezn]." +
	"\n\t(self semafor listNamed: 'plodiny-skodlorg') urlParams: mapovani; asyncQueryDo: aBlock",
	null, "2013-06-10T09:25:39Z", "mp", 1);

jst.FYDataPOR.addMethod("nactiSemaforPro:pak:", "params aBlock", "accessing", 
	"\t| mapovani |" +
	"\n\tmapovani := Dictionary new." +
	"\n\tparams pairsDo: [:typ :kody | | sezn |" +
	"\n\t\tsezn := SortedCollection new." +
	"\n\t\t((Fytoportal data pouzitiPOR mapovaniPro: typ)" +
	"\n\t \t\tlookupKeys: (Fytoportal data epptKody pridejNadrazene: kody asCollection)) do: [:dict |" +
	"\n\t\t\t\tsezn addUnique: (dict at: #id)]." +
	"\n\t\tmapovani at: typ put: sezn asArray]." +
	"\n\t^ (self semafor listNamed: 'plodiny-skodlorg') " +
	"\n\t\tqueryParams: mapovani; " +
	"\n\t\tasyncQueryDo: aBlock",
	null, "2013-06-11T06:38:40Z", "mp", 1);

jst.FYDataPOR.addMethod("nactiSemaforPro:pak:", "params aBlock", "accessing", 
	"\t| mapovani |" +
	"\n\tmapovani := Dictionary new." +
	"\n\tparams pairsDo: [:typ :kody | | sezn |" +
	"\n\t\tsezn := SortedCollection new." +
	"\n\t\t((Fytoportal data pouzitiPOR mapovaniPro: typ)" +
	"\n\t \t\tlookupKeys: (Fytoportal data epptKody pridejNadrazene: kody asCollection)) do: [:dict |" +
	"\n\t\t\t\tsezn addUnique: (dict at: #id)]." +
	"\n\t\tmapovani at: typ put: sezn asArray]." +
	"\n\t^ (self semafor listNamed: 'plodiny-skodlorg2') " +
	"\n\t\turlParams: mapovani; " +
	"\n\t\tasyncQueryDo: aBlock",
	null, "2013-06-11T09:36:30Z", "mp", 1);

jst.FYDataPOR.addMethod("nactiSemaforPro:pak:", "params aBlock", "accessing", 
	"\t| mapovani |" +
	"\n\t\"novy pristup - seznam skod.lorg. se preda do view semafor2 jako keys, " +
	"\n\tv listu vyber-plodiny se uz jen vybira podle plodin, pokud jsou zadany \"" +
	"\n\tmapovani := Dictionary new." +
	"\n\tparams pairsDo: [:typ :kody | | sezn |" +
	"\n\t\tsezn := SortedCollection new." +
	"\n\t\t((Fytoportal data pouzitiPOR mapovaniPro: typ)" +
	"\n\t \t\tlookupKeys: (Fytoportal data epptKody pridejNadrazene: kody asCollection)) do: [:dict |" +
	"\n\t\t\t\tsezn addUnique: (dict at: #id)]." +
	"\n\t\tmapovani at: (typ = #skodlorg ifTrue: #keys ifFalse: typ) put: sezn asArray]." +
	"\n\t^ (self semafor2 listNamed: 'vyber-plodiny') " +
	"\n\t\turlParams: mapovani; " +
	"\n\t\tasyncQueryDo: aBlock",
	null, "2013-07-12T22:04:13Z", "mp", 1);

jst.FYDataPOR.addMethod("nactiSemaforPro:pak:", "params aBlock", "accessing", 
	"\t| mapovani list |" +
	"\n\t\"novy pristup - seznam skod.lorg. se preda do view semafor2 jako keys, " +
	"\n\tv listu vyber-plodiny se uz jen vybira podle plodin, pokud jsou zadany \"" +
	"\n\tmapovani := Dictionary new." +
	"\n\tparams pairsDo: [:typ :kody | | sezn |" +
	"\n\t\tsezn := SortedCollection new." +
	"\n\t\t((Fytoportal data pouzitiPOR mapovaniPro: typ)" +
	"\n\t \t\tlookupKeys: (Fytoportal data epptKody pridejNadrazene: kody asCollection)) do: [:dict |" +
	"\n\t\t\t\tsezn addUnique: (dict at: #id)]." +
	"\n\t\tmapovani at: (typ = #skodlorg ifTrue: #keys ifFalse: typ) put: sezn asArray]." +
	"\n\tlist := self semafor2 listNamed: 'vyber-plodiny'." +
	"\n\tlist urlParams: mapovani." +
	"\n\t^ aBlock " +
	"\n\t\tifNotNil: [list asyncQueryDo: aBlock]" +
	"\n\t\tifNil: [\"do tisku - klasicky vraci data\"" +
	"\n\t\t\tlist queryData]",
	null, "2014-01-10T22:20:30Z", "mp", 1);

jst.FYDataPOR.addMethod("nactiSemaforPro:pak:", "params aBlock", "accessing", 
	"\t| mapovani list plevele |" +
	"\n\t\"novy pristup - seznam skod.lorg. se preda do view semafor jako keys, " +
	"\n\tv listu vyber-plodiny se uz jen vybira podle plodin, pokud jsou zadany \"" +
	"\n\tmapovani := Dictionary new." +
	"\n\tplevele := (params includesKey: #skodlorg) not." +
	"\n\tparams pairsDo: [:typ :kody | | sezn |" +
	"\n\t\tsezn := SortedCollection new." +
	"\n\t\t((Fytoportal data pouzitiPOR mapovaniPro: typ)" +
	"\n\t \t\tlookupKeys: (Fytoportal data epptKody pridejNadrazene: kody asCollection)) do: [:dict |" +
	"\n\t\t\t\tsezn addUnique: (dict at: #id)]." +
	"\n\t\tmapovani " +
	"\n\t\t\tat: (typ = #skodlorg | plevele ifTrue: #keys ifFalse: typ) " +
	"\n\t\t\tput: sezn asArray" +
	"\n\t]." +
	"\n\tlist := (plevele " +
	"\n\t\tifFalse: [self doc viewNamed: #semafor]" +
	"\n\t\tifTrue: [self doc viewNamed: 'semafor-herbicidy'])  listNamed: 'vyber-plodiny'." +
	"\n\tlist urlParams: mapovani." +
	"\n\t^ aBlock " +
	"\n\t\tifNotNil: [list asyncQueryDo: aBlock]" +
	"\n\t\tifNil: [\"do tisku - klasicky vraci data\"" +
	"\n\t\t\tlist queryData]",
	null, "2014-02-20T21:49:03Z", "mp"); //fytoportal-core

jst.FYDataPOR.addMethod("pripravSemaforData:", "data", "util", 
	"\t| semaforData |" +
	"\n\tsemaforData := SortedCollection sortBlock: [:a :b | a obchJmeno <= b obchJmeno]." +
	"\n\tdata collect: [:d | | prip |" +
	"\n\t\t(prip := d at: #value)" +
	"\n\t\t\tid: (d at: #id)." +
	"\n\t\tprip pouziti: prip pouziti asSortedCollection] " +
	"\n\tthenDo: [:prip | | dupl |" +
	"\n\t\t(dupl := semaforData addUnique: prip) == prip ifFalse: [" +
	"\n\t\t\tdupl pouziti addAll: prip pouziti]]." +
	"\n\t^ semaforData",
	null, "2014-01-11T21:39:14Z", "mp");
*/

jst.FYDataPOR.addMethod("semaforVahy", "", "accessing", 
	"\t^ semaforVahy ifNil: [" +
	"\n\t\tsemaforVahy := db loadObject: 'semafor_vahy']",
	null, "2013-06-26T06:48:31Z", "mp");

jst.FYDataPOR.addMethod("semaforList:", "viewName", "accessing", 
	"\t^ (self doc viewNamed: viewName) listNamed: 'vyber-plodiny'.",
	null, "2014-04-24T09:55:02Z", "mp", 1);

jst.FYDataPOR.addMethod("semaforList:", "viewName", "accessing", 
	"\t^ (self doc viewNamed: viewName) listNamed: 'semafor-vyber'.",
	null, "2014-05-07T10:26:16Z", "mp"); //fytoportal-core

//*** PORPripravek ***

jst.PORPripravek.addMethod("=", "prip", "comparing", 
	"\t^ id = prip id",
	null, "2013-04-18T19:29:31Z", "mp");

jst.PORPripravek.addMethod("id", "", "accessing", 
	"\t^ id",
	null, "2013-04-18T19:29:46Z", "mp");

jst.PORPripravek.addMethod("id:", "anObject", "accessing", 
	"\tid := anObject",
	null, "2013-04-18T19:30:07Z", "mp");

jst.PORPripravek.addMethod("obchJmeno", "", "accessing", 
	"\t^ obchJmeno",
	null, "2013-04-18T19:32:04Z", "mp");

jst.PORPripravek.addMethod("ucinneLatky", "", "accessing", 
	"\t^ ucinneLatky",
	null, "2013-04-20T22:21:38Z", "mp");

jst.PORPripravek.addMethod("<=", "prip", "comparing", 
	"\t^ obchJmeno <= prip obchJmeno",
	null, "2013-04-18T19:33:04Z", "mp");

jst.PORPripravek.addMethod("pouziti", "", "accessing", 
	"\t^ pouziti",
	null, "2013-04-18T19:40:15Z", "mp");

jst.PORPripravek.addMethod("pouziti:", "aCollection", "accessing", 
	"\tpouziti := aCollection",
	null, "2013-04-18T19:47:20Z", "mp");

jst.PORPripravek.addMethod("hodnUdaje", "", "accessing", 
	"\t^ hodnUdaje",
	null, "2013-05-09T08:17:01Z", "mp");

jst.PORPripravek.addMethod("printOn:", "aStream", "printing", 
	"\tsuper printOn: aStream." +
	"\n\taStream nextPutAll: ' ';" +
	"\n\t\tprint: obchJmeno",
	null, "2013-04-18T19:49:26Z", "mp");

jst.PORPripravek.addMethod("jeEKO", "", "testing", 
	"\t^ eko == true",
	null, "2014-04-24T10:34:11Z", "mp");

jst.PORPripravek.addMethod("biologFunkce", "", "accessing", 
	"\t^ biologFunkce",
	null, "2014-04-24T14:11:09Z", "mp");

//*** PORPouziti ***

jst.PORPouziti.addMethod("plodina:", "anObject", "accessing", 
	"\tplodina := anObject",
	null, "2013-04-18T19:40:37Z", "mp");

jst.PORPouziti.addMethod("skodlOrg:", "anObject", "accessing", 
	"\tskodlOrg := anObject",
	null, "2013-04-18T19:40:48Z", "mp");

jst.PORPouziti.addMethod("printOn:", "aStream", "printing", 
	"\tsuper printOn: aStream." +
	"\n\t#(plodina skodlOrg davka) do: [:ea |" +
	"\n\t\t(self instVarNamed: ea) ifNotNil: [" +
	"\n\t\t\taStream nextPutAll: ' ';" +
	"\n\t\t\t\tprint: (self instVarNamed: ea)]].",
	null, "2013-04-18T19:55:27Z", "mp");

jst.PORPouziti.addMethod("<=", "pouz", "comparing", 
	"\t| x |" +
	"\n\t^ (x := plodina compare: pouz plodina) = 2 " +
	"\n\t\tifFalse: [x = 1]" +
	"\n\t\tifTrue: [skodlOrg <= pouz skodlOrg]",
	null, "2013-04-18T20:03:03Z", "mp");

jst.PORPouziti.addMethod("plodina", "", "accessing", 
	"\t^ plodina",
	null, "2013-04-18T20:05:28Z", "mp");

jst.PORPouziti.addMethod("skodlOrg", "", "accessing", 
	"\t^ skodlOrg",
	null, "2013-04-18T20:05:37Z", "mp");

jst.PORPouziti.addMethod("davka", "", "accessing", 
	"\t^ davka",
	null, "2014-01-16T22:01:19Z", "mp");

jst.PORPouziti.addMethod("ochrLhuta", "", "accessing", 
	"\t^ ochrLhuta",
	null, "2014-01-16T22:01:27Z", "mp");

//*** PORHodnUdaje ***

jst.PORHodnUdaje.addMethod("clovek", "", "accessing", 
	"\t^ clovek",
	null, "2013-05-09T08:17:43Z", "mp");

jst.PORHodnUdaje.addMethod("vcely", "", "accessing", 
	"\t^ vcely",
	null, "2013-05-09T08:18:00Z", "mp");

jst.PORHodnUdaje.addMethod("ptaciSavci", "", "accessing", 
	"\t^ ptaciSavci",
	null, "2013-05-09T08:18:13Z", "mp");

jst.PORHodnUdaje.addMethod("vodniOrg", "", "accessing", 
	"\t^ vodniOrg",
	null, "2013-05-09T08:18:29Z", "mp");

jst.PORHodnUdaje.addMethod("pudniOrg", "", "accessing", 
	"\t^ pudniOrg",
	null, "2013-05-09T08:18:39Z", "mp");

jst.PORHodnUdaje.addMethod("necilClenovci", "", "accessing", 
	"\t^ necilClenovci",
	null, "2013-05-09T08:19:02Z", "mp");

jst.PORHodnUdaje.addMethod("vodniZdroje", "", "accessing", 
	"\t^ vodniZdroje",
	null, "2013-05-09T08:19:20Z", "mp");

jst.PORHodnUdaje.addMethod("necilRostliny", "", "accessing", 
	"\t^ necilRostliny",
	null, "2013-05-09T09:03:01Z", "mp");

jst.PORHodnUdaje.addMethod("zivotniProstredi", "", "accessing", 
	"\tzivotniProstredi ifNil: [" +
	"\n\t\t| sum poc chybi prum |" +
	"\n\t\tsum := 0." +
	"\n\t\tpoc := 0." +
	"\n\t\tchybi := 0." +
	"\n\t\tFytoportal data pripravky semaforVahy keysAndValuesDo: [:kat :vahy |" +
	"\n\t\t\t(self instVarNamed: kat) ifNotNilDo: [:hodn | | h |" +
	"\n\t\t\t\th := hodn asNumber." +
	"\n\t\t\t\tsum := sum + (h * (vahy at: h))." +
	"\n\t\t\t\tpoc := poc + (vahy at: h)" +
	"\n\t\t\t] ifNil: [chybi := chybi + 1]" +
	"\n\t\t]." +
	"\n\t\tchybi > 0 ifTrue: [zivotniProstredi := 0] ifFalse: [" +
	"\n\t\t\tprum := sum / poc." +
	"\n\t\t\tprum < 1.4 ifTrue: [" +
	"\n\t\t\t\tzivotniProstredi := 1] ifFalse: [prum < 2.11 ifTrue: [" +
	"\n\t\t\t\t\tzivotniProstredi := 2] ifFalse: [" +
	"\n\t\t\t\t\t\tzivotniProstredi := 3]]." +
	"\n\t\t]" +
	"\n\t]." +
	"\n\t^ zivotniProstredi",
	null, "2013-06-26T07:25:29Z", "mp");

//*** PORSkupHU ***

jst.PORSkupHU.addMethod("semafor", "", "accessing", 
	"\t^ semafor",
	null, "2013-05-09T09:01:33Z", "mp");

jst.PORSkupHU.addMethod("udaje", "", "accessing", 
	"\t^ udaje",
	null, "2013-05-09T09:01:45Z", "mp");

jst.PORSkupHU.addMethod("udaje:", "anArray", "accessing", 
	"\tudaje := anArray",
	null, "2013-05-10T12:21:27Z", "mp");

jst.PORSkupHU.addMethod("upresneni", "", "accessing", 
	"\t\"dat uzivateli v semaforu najevo, ze by mel  rozkliknout detail?\"" +
	"\n\t^ upresneni",
	null, "2013-05-27T07:38:54Z", "mp");

//*** PORHodnUdaj ***

jst.PORHodnUdaj.addMethod("mimoSemafor", "", "accessing", 
	"\t\"oznacuje udaj, ktery se v semaforu nehodnoti\"" +
	"\n\t^ mimoSemafor ifNil: false",
	null, "2013-05-27T09:54:06Z", "mp");

jst.PORHodnUdaj.addMethod("zobrazDetail", "", "accessing", 
	"\t^ mimoSemafor ~= true",
	null, "2013-05-29T08:25:19Z", "mp");

jst.PORHodnUdaj.addMethod("kodVety", "", "accessing", 
	"\t^ kod",
	null, "2013-05-27T09:52:00Z", "mp");

jst.PORHodnUdaj.addMethod("semafor", "", "accessing", 
	"\t^ semafor",
	null, "2013-05-09T08:29:02Z", "mp");

jst.PORHodnUdaj.addMethod("veta", "", "accessing", 
	"\t^ veta",
	null, "2013-05-09T08:29:25Z", "mp");

jst.PORHodnUdaj.addMethod("udaj", "", "accessing", 
	"\t^ udaj",
	null, "2013-05-17T15:00:53Z", "mp");

jst.PORHodnUdaj.addMethod("poznamka", "", "accessing", 
	"\t^ poznamka",
	null, "2013-05-17T15:01:06Z", "mp");

jst.PORHodnUdaj.addMethod("alias", "", "accessing", 
	"\t^ alias",
	null, "2013-05-17T15:14:53Z", "mp");
