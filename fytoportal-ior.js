/*
 * Copyright (c) 2012 Michal Perutka <michal.perutka@gmail.com>
 *
 *
 * Depends on jst-core, jst-core-proxy, jst-parser, jst-kernel, jst-dom, jst-applications, jst-couchdb, jst-ext, jst-fytoportal-core
 */

jst.currentJsFile = "fytoportal-ior";

// *** CLASSES ***

jst.Dictionary.subclass("FYKapitola", "id nazev parent modifiedOn modifiedBy", "", "", "SRS-Fytoportal-model");

jst.FYKapitola.subclass("FYMetodika", "obdobi", "", "", "SRS-Fytoportal-model");

jst.FYMetodika.subclass("FYObecnaMetodikaPM", "zmenena publikovat", "", "", "SRS-Fytoportal-model");
jst.FYObecnaMetodikaPM.subclass("FYMetodikaPM", "skupina samostatna", "", "", "SRS-Fytoportal-model");

jst.FYKapitola.subclass("FYKapitolaPM", "link poradi poznamka obsah zmeny vyrazena pridana", "", "", "SRS-Fytoportal-model");

jst.FYKapitolaPM.subclass("FYKapitolaTaxony", "fotky taxony nazvyNacteny kapitolyTisk", "", "", "SRS-Fytoportal-model");
jst.FYKapitolaTaxony.subclass("FYKapitolaPlodiny", "kody", "", "", "SRS-Fytoportal-model");
jst.FYKapitolaTaxony.subclass("FYKapitolaSO", "taxonyId", "", "", "SRS-Fytoportal-model");

jst.FYKapitolaPM.subclass("FYKapitolaPOR", "", "", "", "SRS-Fytoportal-model");

jst.FYKapitolaPOR.subclass("FYKapitolaHerbicidy", "", "", "", "SRS-Fytoportal-model");
jst.FYKapitolaPOR.subclass("FYKapitolaDalsiPOR", "", "", "", "SRS-Fytoportal-model");

jst.FYMetodika.subclass("FYOsnovaMetodiky", "metodika", "", "", "SRS-Fytoportal-model");

jst.FYMetodika.subclass("FYMetodikaSO", "taxony fotka vychoziFotka zmeny", "", "", "SRS-Fytoportal-model");
jst.FYMetodikaSO.subclass("FYMetodikaChoroba", "", "", "", "SRS-Fytoportal-model");
jst.FYMetodikaSO.subclass("FYMetodikaSkudce", "", "", "", "SRS-Fytoportal-model");
jst.FYMetodikaSO.subclass("FYMetodikaAbionoza", "", "", "", "SRS-Fytoportal-model");

jst.Object.subclass("FYPlodinaPM", "nazev link fotka taxony", "", "", "SRS-Fytoportal-model");
jst.FYKapitolaPM.subclass("FYSkodlOrgPM", "fotka vychoziFotka zmenaFotky taxony", "", "", "SRS-Fytoportal-model");

jst.FYDataViews.subclass("FYDataMetodiky", "", "", "", "SRS-Fytoportal-IOR");
jst.FYDataViews.subclass("FYDataOdrudy", "", "", "", "SRS-Fytoportal-IOR");

jst.Object.subclass("FYIOR", "metodikyPanel kapitolaPanel obsahPanel", "", "", "SRS-Fytoportal-IOR");

jst.ExtPanel.subclass("FYMetodikyPanel", "metodiky hledej", "", "", "SRS-Fytoportal-IOR");

jst.FYTreePanel.subclass("FYKapitolaPanel", "kapitola vyberKapitol oznacKapitolu zmenVyberKapitol prevNode", "", "", "SRS-Fytoportal-IOR");

jst.ExtContainer.subclass("FYIORObsahPanel", "metodika panely obsah editor nalezenyText", "", "", "SRS-Fytoportal-IOR");

jst.ExtPanel.subclass("FYTextKapitolyPanel", "id kapitola metodikaSO page semaforIds semaforData loading prekresli", "", "", "SRS-Fytoportal-IOR");
jst.FYTextKapitolyPanel.subclass("FYTextKapPlodinyPanel", "plodina", "", "", "SRS-Fytoportal-IOR");
jst.FYTextKapitolyPanel.subclass("FYTextKapSOPanel", "kapitola1 skocinId", "", "", "SRS-Fytoportal-IOR");

jst.AppCrossroad.subclass("FYIORNavig", "paths tiskMetodiky", "", "", "SRS-Fytoportal-IOR");

jst.PORPripravek.subclass("FYSemaforPOR", "semafor", "", "", "SRS-Fytoportal-model");

jst.ExtAction.subclass("FYTiskMetodiky", "metodika semaforParams dataPOR bezFotek", "", "", "SRS-Fytoportal-IOR");

jst.Object.subclass("FYVyberKapitolPM", "kapitoly kodyPlodin plodinyVcetneNadraz", "", "", "SRS-Fytoportal-IOR");
jst.Dictionary.subclass("FYVyberKapitol", "value", "", "", "SRS-Fytoportal-IOR");

jst.FYTiskTaxonu.subclass("FYTiskTaxonuIOR", "kapitola foto height width editace bezFotek", "FotoChybi", "", "SRS-Fytoportal-IOR");

jst.Object.subclass("FYNalezenaKapitolaPM", "id nazev obsah metId metodika refs typ skupina kapitolaSO skipRefs poradi oznacText taxon", "", "", "SRS-Fytoportal-IOR");

//extensions

jst.FYSkodlOrg.addMethod("popis", "", "*srs-fytoportal-ior", 
	"\t^ popis ifNil: [popis := (Fytoportal data metodiky popisySO lookupKey: id) ifNotEmptyDo: [:vysl |" +
	"\n\t\t(vysl first at: #value)" +
	"\n\t\t\t\"id kapitoly musim nastavit rucne - aby fungovala metoda FYKapitolaPM>>id\"" +
	"\n\t\t\tid: #charakteristika;" +
	"\n\t\t\t\"nastavim alespon neuplnou metodiku - aby fungovala metoda FYKapitolaPM>>metodika\"" +
	"\n\t\t\tparent: (FYMetodikaSO new id: (vysl first at: #key))" +
	"\n\t\t] ifEmpty: '' \"zkusim nacist jen jednou\"]",
	null, "2013-04-27T18:09:24Z", "mp");

jst.FYSkodlOrg.addMethod("jsonKeys", "", "*srs-fytoportal-ior", 
	"\t^ super jsonKeys copyWithout: #popis",
	null, "2013-04-27T18:06:18Z", "mp");


jst.FYOdruda.addMethod("renderOn:", "html", "*srs-fytoportal-ior", 
	"\thtml div class: 'kapitola'; with: [" +
	"\n\t\thtml div class: 'nazev3'; with: [" +
	"\n\t\t\thtml text: nazev." +
	"\n\t\t\thtml span style: 'font-weight: normal;'; with: [" +
	"\n\t\t\t\thtml text: ' ('." +
	"\n\t\t\t\thtml anchor" +
	"\n\t\t\t\t\thref: 'odrudy-hledej.html?odr=', kod;" +
	"\n\t\t\t\t\ttarget: 'nou_ukzuz';" +
	"\n\t\t\t\t\twith: kod." +
	"\n\t\t\t\thtml text: ')'" +
	"\n\t\t\t]" +
	"\n\t\t]." +
	"\n\t\thtml div class: 'obsah'; with: [" +
	"\n\t\t\thtml html: (popis ifNil: ['<p class=\"separator\">(bez popisu)</p>'])]" +
	"\n\t]",
	null, "2014-05-19T09:03:13Z", "mp");

//*** FYIORNavig ***

jst.FYIORNavig.addMethod("initialize", "", "initialization", 
	"\tpaths := Dictionary new." +
	"\n\tsuper initialize" +
	"\n\t\tlabel: 'IOR';" +
	"\n\t\taddExit: self metodika;" +
	"\n\t\tonEnter: [Fytoportal current aktivujIOR]." +
	"\n\t(self respondsTo: #editace) ifTrue: [" +
	"\n\t\tself addExit: (self perform: #editace)]",
	null, "2013-01-19T21:41:01Z", "mp", 1);

jst.FYIORNavig.addMethod("initialize", "", "initialization", 
	"\tpaths := Dictionary new." +
	"\n\tsuper initialize" +
	"\n\t\tlabel: 'IOR';" +
	"\n\t\taddExit: self metodika;" +
	"\n\t\tonEnter: [:path :obj |" +
	"\n\t\t\tFytoportal current aktivujIOR." +
	"\n\t\t\tobj = #info ifTrue: [" +
	"\n\t\t\t\tFytoportal navigator ior metodika component clearSelectionsSilently: false]];" +
	"\n\t\tonForceStop: [:path :val :last |" +
	"\n\t\t\tlast ifFalse: [path toggle] ifTrue: [" +
	"\n\t\t\t\tpath enter: #info value: nil label: nil]]." +
	"\n\t(self respondsTo: #editace) ifTrue: [" +
	"\n\t\tself addExit: (self perform: #editace)]",
	null, "2013-08-27T19:57:45Z", "mp", 1);

jst.FYIORNavig.addMethod("initialize", "", "initialization", 
	"\tpaths := Dictionary new." +
	"\n\tsuper initialize" +
	"\n\t\tlabel: 'IOR';" +
	"\n\t\taddExit: self metodika;" +
	"\n\t\tonEnter: [:path :obj |" +
	"\n\t\t\tFytoportal current aktivujIOR." +
	"\n\t\t\tobj = #info ifTrue: [" +
	"\n\t\t\t\tFytoportal navigator ior metodika component clearSelectionsSilently: false]];" +
	"\n\t\tonForceStop: [:path :val :last |" +
	"\n\t\t\tlast ifFalse: [path switchPath] ifTrue: [" +
	"\n\t\t\t\tpath enter: #info value: nil label: nil]]." +
	"\n\t(self respondsTo: #editace) ifTrue: [" +
	"\n\t\tself addExit: (self perform: #editace)]",
	null, "2013-08-28T12:03:35Z", "mp", 1);

jst.FYIORNavig.addMethod("initialize", "", "initialization", 
	"\tpaths := Dictionary new." +
	"\n\tsuper initialize" +
	"\n\t\tlabel: 'IOR';" +
	"\n\t\taddExit: self metodika;" +
	"\n\t\tonEnter: [:path :obj |" +
	"\n\t\t\tFytoportal current aktivujIOR." +
	"\n\t\t\tobj = #info ifTrue: [" +
	"\n\t\t\t\tFytoportal ior metodikyPanel metodikaVybrana: nil]];" +
	"\n\t\tonForceStop: [:path :val :last |" +
	"\n\t\t\tlast ifFalse: [path switchPath] ifTrue: [" +
	"\n\t\t\t\tpath enter: #info value: nil label: nil]]." +
	"\n\t(self respondsTo: #editace) ifTrue: [" +
	"\n\t\tself addExit: (self perform: #editace)]",
	null, "2013-08-28T20:20:27Z", "mp", 1); //fytoportal-ior

jst.FYIORNavig.addMethod("initialize", "", "initialization", 
	"\tpaths := Dictionary new." +
	"\n\tsuper initialize" +
	"\n\t\tlabel: 'IOR';" +
	"\n\t\taddExit: self metodika;" +
	"\n\t\tonEnter: [:path :obj |" +
	"\n\t\t\tFytoportal current aktivujIOR." +
	"\n\t\t\tobj = #info ifTrue: [" +
	"\n\t\t\t\tFytoportal ior metodikyPanel metodikaVybrana: nil]];" +
	"\n\t\tonForceStop: [:path :val :last |" +
	"\n\t\t\tlast ifFalse: [path switchPathOn: #modul] ifTrue: [" +
	"\n\t\t\t\tpath enter: #info value: nil label: nil]]." +
	"\n\t(self respondsTo: #editace) ifTrue: [" +
	"\n\t\tself addExit: (self perform: #editace)]",
	null, "2013-09-02T19:27:11Z", "mp", 1);

jst.FYIORNavig.addMethod("initialize", "", "initialization", 
	"\tpaths := Dictionary new." +
	"\n\tsuper initialize" +
	"\n\t\tlabel: 'IOR';" +
	"\n\t\taddExit: self metodika;" +
	"\n\t\tonForceStop: [:p :val :last | last " +
	"\n\t\t\tifFalse: [p switchPath] " +
	"\n\t\t\tifTrue: [p switchInfo]]." +
	"\n\t(self respondsTo: #editace) ifTrue: [" +
	"\n\t\tself addExit: (self perform: #editace)]",
	null, "2013-09-03T08:15:49Z", "mp", 1);

jst.FYIORNavig.addMethod("initialize", "", "initialization", 
	"\tpaths := Dictionary new." +
	"\n\tsuper initialize" +
	"\n\t\tid: #ior;" +
	"\n\t\tlabel: 'IOR';" +
	"\n\t\taddExit: self metodika;" +
	"\n\t\tonForceStop: [:p :val :last | last " +
	"\n\t\t\tifFalse: [p switchPath] " +
	"\n\t\t\tifTrue: [p switchInfo]]." +
	"\n\t(self respondsTo: #editace) ifTrue: [" +
	"\n\t\tself addExit: (self perform: #editace)]",
	null, "2013-09-06T15:16:31Z", "mp", 1);

jst.FYIORNavig.addMethod("initialize", "", "initialization", 
	"\tpaths := Dictionary new." +
	"\n\tsuper initialize" +
	"\n\t\tid: #ior;" +
	"\n\t\tlabel: 'IOR';" +
	"\n\t\taddExit: self metodika;" +
	"\n\t\tonForceStop: [self switchPath]." +
	"\n\t(self respondsTo: #editace) ifTrue: [" +
	"\n\t\tself addExit: (self perform: #editace)]",
	null, "2014-02-09T19:51:34Z", "mp", 1);

jst.FYIORNavig.addMethod("initialize", "", "initialization", 
	"\tpaths := Dictionary new." +
	"\n\ttiskMetodiky := FYTiskMetodiky new." +
	"\n\tsuper initialize" +
	"\n\t\tid: #ior;" +
	"\n\t\tlabel: 'IOR';" +
	"\n\t\taddExit: self metodika;" +
	"\n\t\tonForceStop: [self switchPath]." +
	"\n\t(self respondsTo: #editace) ifTrue: [" +
	"\n\t\tself addExit: (self perform: #editace)]",
	null, "2014-02-13T20:38:30Z", "mp", 1);

jst.FYIORNavig.addMethod("initialize", "", "initialization", 
	"\tpaths := Dictionary new." +
	"\n\ttiskMetodiky := FYTiskMetodiky new." +
	"\n\tsuper initialize" +
	"\n\t\tid: #ior;" +
	"\n\t\tlabel: 'IOR';" +
	"\n\t\taddExit: self metodika;" +
	"\n\t\taddExit: self hledej;" +
	"\n\t\tonForceStop: [self switchPath]." +
	"\n\t(self respondsTo: #editace) ifTrue: [" +
	"\n\t\tself addExit: (self perform: #editace)]",
	null, "2014-03-21T23:02:06Z", "mp"); //fytoportal-ior

jst.FYIORNavig.addMethod("hledej", "", "accessing", 
	"\t^ paths at: #hledej ifAbsentPut: [" +
	"\n\t\tAppCrossroad new" +
	"\n\t\t\tid: #hledej]",
	null, "2014-03-21T23:02:33Z", "mp");

jst.FYIORNavig.addMethod("switchPath", "", "processing", 
	"\tFytoportal current aktivujIOR." +
	"\n\tsuper switchPath",
	null, "2013-09-03T08:11:23Z", "mp", 1);

jst.FYIORNavig.addMethod("switchPath", "", "processing", 
	"\tFytoportal current aktivujIOR." +
	"\n\tsuper switchPath." +
	"\n\t[Fytoportal navigator ior metodika link ifNil: [" +
	"\n\t\tFytoportal ior metodikyPanel tree selectNodeBy: [:n |" +
	"\n\t\t\tn id = 'obecne_informace'] silently: false]] delayed: 100",
	null, "2014-02-09T20:08:24Z", "mp", 2);

jst.FYIORNavig.addMethod("switchPath", "", "processing", 
	"\tFytoportal current aktivujIOR." +
	"\n\tFytoportal ior metodikyPanel tree selectedNode " +
	"\n\t\tifNil: [Fytoportal ior metodikyPanel tree root children first select]" +
	"\n\t\tifNotNilDo: [:n | self switchPathOn: n]" +
	"\n\t\t",
	null, "2014-03-03T20:33:34Z", "mp"); //fytoportal-ior

/*
jst.FYIORNavig.addMethod("switchInfo", "", "processing", 
	"\tFytoportal current aktivujIOR." +
	"\n\tFytoportal ior metodikyPanel metodikaVybrana: nil",
	null, "2013-09-03T08:13:44Z", "mp", 1);

jst.FYIORNavig.addMethod("switchInfo", "", "processing", 
	"\tFytoportal current aktivujIOR." +
	"\n\tself enter: nil." +
	"\n\tFytoportal ior metodikyPanel metodikaVybrana: nil",
	null, "2013-09-03T08:44:02Z", "mp"); //fytoportal-ior
*/

jst.FYIORNavig.addMethod("hlavniKapitolaPM", "", "accessing", 
	"\t^ paths at: #hlavniKapitolaPM ifAbsentPut: [" +
	"\n\t\tAppCrossroad new addExit: self kapitolaPM]",
	null, "2013-01-17T08:05:43Z", "mp", 1);

jst.FYIORNavig.addMethod("hlavniKapitolaPM", "", "accessing", 
	"\t^ paths at: #hlavniKapitolaPM ifAbsentPut: [" +
	"\n\t\tAppCrossroad new " +
	"\n\t\t\tid: #kap1;" +
	"\n\t\t\taddExit: self kapitolaPM]",
	null, "2013-09-06T18:46:32Z", "mp"); //fytoportal-ior

jst.FYIORNavig.addMethod("kapitolaPM", "", "accessing", 
	"\t^ paths at: #kapitolaPM ifAbsentPut: [" +
	"\n\t\tAppCrossroad new]",
	null, "2013-01-17T08:06:01Z", "mp", 1);

jst.FYIORNavig.addMethod("kapitolaPM", "", "accessing", 
	"\t^ paths at: #kapitolaPM ifAbsentPut: [" +
	"\n\t\tAppCrossroad new id: #kap]",
	null, "2013-09-06T18:48:21Z", "mp", 2);

jst.FYIORNavig.addMethod("kapitolaPM", "", "accessing", 
	"\t^ paths at: #kapitolaPM ifAbsentPut: [" +
	"\n\t\tAppCrossroad new " +
	"\n\t\t\tid: #kap;" +
	"\n\t\t\tsuppressLabel: (RegExp new searchPattern: '(')]",
	null, "2014-04-17T12:20:20Z", "mp"); //fytoportal-ior

jst.FYIORNavig.addMethod("metodika", "", "accessing", 
	"\t^ paths at: #metodika ifAbsentPut: [" +
	"\n\t\tAppCrossroad new addExit: self hlavniKapitolaPM]",
	null, "2013-01-17T08:06:24Z", "mp", 1);

jst.FYIORNavig.addMethod("metodika", "", "accessing", 
	"\t^ paths at: #metodika ifAbsentPut: [" +
	"\n\t\tAppCrossroad new " +
	"\n\t\t\tid: #met; " +
	"\n\t\t\taddExit: self hlavniKapitolaPM]",
	null, "2013-09-06T15:18:01Z", "mp"); //fytoportal-ior

jst.FYIORNavig.addMethod("createMenu", "", "initialization", 
	"\ttiskMetodiky := FYTiskMetodiky new beDisabled." +
	"\n\t^ ExtMenu new " +
	"\n\t\tadd: tiskMetodiky asMenuItem; " +
	"\n\t\taddSeparator;" +
	"\n\t\tadd: (ExtMenuItem new " +
	"\n\t\t\ttext: 'O integrované ochraně'; " +
	"\n\t\t\ton: #click do: [self trackHistory: [:p | " +
	"\n\t\t\t\tp enter: #info value: nil label: nil]]);" +
	"\n\t\tyourself",
	null, "2013-08-28T09:44:50Z", "mp", 1);

jst.FYIORNavig.addMethod("createMenu", "", "initialization", 
	"\ttiskMetodiky := FYTiskMetodiky new beDisabled." +
	"\n\t^ ExtMenu new " +
	"\n\t\tadd: tiskMetodiky asMenuItem; " +
	"\n\t\taddSeparator;" +
	"\n\t\tadd: (ExtMenuItem new " +
	"\n\t\t\ttext: 'O integrované ochraně'; " +
	"\n\t\t\ton: #click do: [self trackHistory: [self switchInfo]]);" +
	"\n\t\tyourself",
	null, "2013-09-03T08:46:31Z", "mp", 1);

jst.FYIORNavig.addMethod("createMenu", "", "initialization", 
	"\ttiskMetodiky := FYTiskMetodiky new beDisabled." +
	"\n\t^ ExtMenu new " +
	"\n\t\tadd: tiskMetodiky asMenuItem; " +
	"\n\t\tyourself",
	null, "2014-02-09T19:14:40Z", "mp", 1);

jst.FYIORNavig.addMethod("createMenu", "", "initialization", 
	"\t^ ExtMenu new " +
	"\n\t\tadd: tiskMetodiky asMenuItem; " +
	"\n\t\tyourself",
	null, "2014-02-13T20:38:43Z", "mp"); //fytoportal-ior

jst.FYIORNavig.addMethod("tiskMetodiky", "", "actions", 
	"\t^ tiskMetodiky",
	null, "2013-08-28T09:48:56Z", "mp");

//*** FYKapitola ***

jst.FYKapitola.addMethod("=", "anObject", "comparing", 
	"\t^ self == anObject",
	null, "2012-11-09T18:49:58Z", "mp");

jst.FYKapitola.addMethod("<=", "kap", "comparing", 
	"\t^ nazev <= kap nazev",
	null, "2014-03-05T22:05:39Z", "mp");

jst.FYKapitola.addMethod("id", "", "accessing", 
	"\t^ id",
	null, "2012-11-12T15:04:49Z", "mp");

jst.FYKapitola.addMethod("id:", "aString", "accessing", 
	"\tid := aString",
	null, "2012-11-13T15:20:53Z", "mp");

jst.FYKapitola.addMethod("nazev", "", "accessing", 
	"\t^ nazev",
	null, "2013-01-09T16:06:08Z", "mp");

jst.FYKapitola.addMethod("nazev:", "aString", "accessing", 
	"\tnazev := aString",
	null, "2012-11-05T10:12:59Z", "mp");

jst.FYKapitola.addMethod("parent:", "aFYKapitola", "accessing", 
	"\tparent := aFYKapitola",
	null, "2012-11-05T20:56:59Z", "mp");

jst.FYKapitola.addMethod("parent", "", "accessing", 
	"\t^ parent",
	null, "2012-11-05T20:57:12Z", "mp");

jst.FYKapitola.addMethod("root", "", "accessing", 
	"\t^ parent root",
	null, "2012-11-14T15:33:23Z", "mp");

jst.FYKapitola.addMethod("jeMetodikaSO", "", "testing", 
	"\t^ false",
	null, "2013-01-29T09:34:49Z", "mp");

jst.FYKapitola.addMethod("jeMetodikaPM", "", "testing", 
	"\t^ false",
	null, "2013-12-07T18:12:28Z", "mp");

jst.FYKapitola.addMethod("jePlodina", "", "testing", 
	"\t^ false",
	null, "2014-03-09T19:38:10Z", "mp");

jst.FYKapitola.addMethod("najdiKapitolu:", "podleId", "enumerating", 
	"\t| s dalsi |" +
	"\n\tdalsi := self." +
	"\n\ts := podleId readStream." +
	"\n\t[(dalsi := dalsi at: (s upTo: '.') ifAbsent: nil) notNil and: [s atEnd not]] whileTrue." +
	"\n\t^ dalsi",
	null, "2012-11-14T15:59:36Z", "mp");

jst.FYKapitola.addMethod("sortedKeys", "", "accessing", 
	"\t^ self keys asSortedCollection: [:k1 :k2 | (self at: k1) poradi <= (self at: k2) poradi]",
	null, "2012-11-09T22:36:40Z", "mp");

jst.FYKapitola.addMethod("kapitoly", "", "enumerating", 
	"\t^ self sortedKeys inject: OrderedCollection new into: [:coll :key | " +
	"\n\t\tcoll add: (self at: key)." +
	"\n\t\tcoll addAll: (self at: key) kapitoly; yourself]",
	null, "2012-11-14T11:07:01Z", "mp");

jst.FYKapitola.addMethod("convertFromJson:atKey:", "jsonObject aString", "private", 
	"\t^ (self convertFromJson: jsonObject)" +
	"\n\t\tparent: self;" +
	"\n\t\tid: aString",
	null, "2012-11-13T15:19:21Z", "mp");

jst.FYKapitola.addMethod("printOn:", "aStream", "printing", 
	"\taStream nextPutAll: nazev",
	null, "2012-11-12T21:48:15Z", "mp", 1);

jst.FYKapitola.addMethod("printOn:", "aStream", "printing", 
	"\t\"volam self nazev, viz napr. FYMetodikaSO>>nazev\"" +
	"\n\taStream nextPutAll: self nazev",
	null, "2014-03-11T15:08:29Z", "mp"); //fytoportal-ior

jst.FYKapitola.addMethod("printPathOn:", "aStream", "printing", 
	"\tparent ifNotNil: [" +
	"\n\t\tparent printPathOn: aStream." +
	"\n\t\taStream isEmpty ifFalse: [" +
	"\n\t\t\taStream nextPutAll: ' > ']]." +
	"\n\taStream " +
	"\n\t\tnextPutAll: nazev",
	null, "2013-01-22T21:55:16Z", "mp", 1);

jst.FYKapitola.addMethod("printPathOn:", "aStream", "printing", 
	"\tparent ifNotNil: [" +
	"\n\t\tparent printPathOn: aStream." +
	"\n\t\taStream isEmpty ifFalse: [" +
	"\n\t\t\taStream nextPutAll: ' > ']]." +
	"\n\taStream " +
	"\n\t\tnextPutAll: self nazev",
	null, "2014-03-11T15:07:45Z", "mp"); //fytoportal-ior

jst.FYKapitola.addMethod("printPath", "", "printing", 
	"\t^ String streamContents: [:s | " +
	"\n\t\tself printPathOn: s]",
	null, "2013-01-22T21:41:23Z", "mp");

jst.FYKapitola.addMethod("jsonKeys", "", "private", 
	"\t^ super jsonKeys copyWithout: #parent",
	null, "2013-02-27T12:42:15Z", "mp");

/*
jst.FYKapitola.addMethod("renderOn:", "html", "rendering", 
	"\tself kapitoly do: [:kap |" +
	"\n\t\tkap renderContentOn: html]",
	null, "2013-04-15T14:34:39Z", "mp");
*/

jst.FYKapitola.addMethod("jeKapitolaSO", "", "testing", 
	"\t^ false",
	null, "2013-10-01T14:25:26Z", "mp");

jst.FYKapitola.addMethod("jeKapitolaTaxony", "", "testing", 
	"\t^ false",
	null, "2013-10-03T11:29:01Z", "mp");

jst.FYKapitola.addMethod("modifiedOn:", "dt", "accessing", 
	"\tmodifiedOn := dt",
	null, "2013-11-14T13:47:08Z", "mp");

jst.FYKapitola.addMethod("modifiedOn", "", "accessing", 
	"\t^ modifiedOn",
	null, "2013-11-14T16:08:18Z", "mp");

jst.FYKapitola.addMethod("modifiedBy:", "aString", "accessing", 
	"\tmodifiedBy := aString",
	null, "2013-11-14T13:47:32Z", "mp");

jst.FYKapitola.addMethod("modifiedBy", "", "accessing", 
	"\t^ modifiedBy",
	null, "2013-11-14T16:08:09Z", "mp");

jst.FYKapitola.addMethod("isReadonly", "", "testing", 
	"\t^ false",
	null, "2013-04-12T22:00:15Z", "mp");

jst.FYKapitola.addMethod("jeKapitola", "", "testing", 
	"\t\"toto je pouze abstraktni predek\"" +
	"\n\t^ false",
	null, "2013-12-12T22:15:46Z", "mp");

jst.FYKapitola.addMethod("jeKapitola1", "", "testing", 
	"\t^ false",
	null, "2014-01-01T15:13:07Z", "mp");

jst.FYKapitola.addMethod("jeKapitolaPOR", "", "testing", 
	"\t^ false",
	null, "2014-04-23T20:33:20Z", "mp");

jst.FYKapitola.addMethod("do:", "aBlock", "enumerating", 
	"\t\"prochazi vsechny podkapitoly\"" +
	"\n\tself valuesDo: [:kap |" +
	"\n\t\taBlock value: kap." +
	"\n\t\tkap do: aBlock]",
	null, "2013-12-12T22:09:23Z", "mp");

jst.FYKapitola.addMethod("prepisKapitolu:", "cilovaKap", "private", 
	"\tself do: [:kap | (kap jeVyrazena not and: [kap obsah isEmptyOrNil not]) ifTrue: [ | kapId prepis |" +
	"\n\t\tkapId := kap id." +
	"\n\t\tself metodika jeMetodikaPM ifTrue: [" +
	"\n\t\t\t\"ze slozeneho id kapitoly odstranim pocatecni id prvni urovne nebo id taxonu\"" +
	"\n\t\t\tkapId := kapId copyAfter: $.]." +
	"\n\t\tprepis := cilovaKap najdiKapitolu: kapId." +
	"\n\t\tprepis obsah: kap obsah." +
	"\n\t\t[\tprepis vyrazena: false." +
	"\n\t\t\t(prepis := prepis parent) notNil and: [prepis jeKapitola]" +
	"\n\t\t] whileTrue" +
	"\n\t]]",
	null, "2013-12-12T22:12:31Z", "mp", 1);

jst.FYKapitola.addMethod("prepisKapitolu:", "cilovaKap", "private", 
	"\tself do: [:kap | (kap jeVyrazena not and: [kap obsah isEmptyOrNil not]) ifTrue: [ | kapId prepis |" +
	"\n\t\tkapId := kap id." +
	"\n\t\tself metodika jeMetodikaPM ifTrue: [" +
	"\n\t\t\t\"ze slozeneho id kapitoly odstranim pocatecni id prvni urovne nebo id taxonu\"" +
	"\n\t\t\tkapId := kapId copyAfter: $.]." +
	"\n\t\tprepis := cilovaKap najdiKapitolu: kapId." +
	"\n\t\tprepis ifNotNil: [" +
	"\n\t\t\t\"muze byt nil, kdyz v metodice zustala ulozena kapitola, ktera uz neni v osnove " +
	"\n\t\t\t(nebo ma jiny id, tj. mohla byt jen presunuta - pak ji uz bohuzel nenajdu)\"" +
	"\n\t\t\tprepis obsah: kap obsah." +
	"\n\t\t\t[\tprepis vyrazena: false." +
	"\n\t\t\t\t(prepis := prepis parent) notNil and: [prepis jeKapitola]" +
	"\n\t\t\t] whileTrue" +
	"\n\t\t]" +
	"\n\t]]",
	null, "2014-04-25T12:33:26Z", "mp"); //fytoportal-ior

jst.FYKapitola.addMethod("copy", "", "copying", 
	"\t| c tmp |" +
	"\n\tc := self shallowCopy." +
	"\n\ttmp := Dictionary new." +
	"\n\tself keysAndValuesDo: [:k :v |" +
	"\n\t\ttmp at: k put: (v copy parent: c)]." +
	"\n\t^ c" +
	"\n\t\tinstVarNamed: #map put: (tmp instVarNamed: #map);" +
	"\n\t\tyourself",
	null, "2013-12-14T12:49:33Z", "mp");

jst.FYKapitola.addMethod("jeChoroba", "", "testing", 
	"\t^ false",
	null, "2014-03-10T20:31:55Z", "mp");

jst.FYKapitola.addMethod("pripravSemaforData:", "data", "semafor POR", 
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
	null, "2014-04-24T09:33:54Z", "mp");

jst.FYKapitola.addMethod("semaforViewName", "", "semafor POR", 
	"\t^ #semafor",
	null, "2014-04-24T09:54:05Z", "mp");

jst.FYKapitola.addMethod("nactiSemaforPro:pak:", "params aBlock", "semafor POR", 
	"\t| list |" +
	"\n\tlist := Fytoportal data pripravky semaforList: self semaforViewName." +
	"\n\tlist urlParams: params." +
	"\n\t^ aBlock " +
	"\n\t\tifNotNil: [" +
	"\n\t\t\tlist asyncQueryDo:  [:data :req | " +
	"\n\t\t\t\taBlock value: (self pripravSemaforData: data)]]" +
	"\n\t\tifNil: [\"do tisku - klasicky vraci data\"" +
	"\n\t\t\tself pripravSemaforData: list queryData]",
	null, "2014-04-24T09:57:23Z", "mp");

//*** FYKapitolaPM ***

jst.FYKapitolaPM.addMethod("poradi:", "aNumber", "accessing", 
	"\tporadi := aNumber",
	null, "2012-11-05T10:13:14Z", "mp");

jst.FYKapitolaPM.addMethod("printElementsOn:", "aStream", "printing", 
	"\t| empty |" +
	"\n\tempty := true." +
	"\n\t(self values asSortedCollection: [:a :b | a poradi <= b poradi]) " +
	"\n\t\tdo: [:kap | " +
	"\n\t\t\tempty ifTrue: [" +
	"\n\t\t\t\taStream nextPutAll: ' ['." +
	"\n\t\t\t\tempty := false]." +
	"\n\t\t\tkap printOn: aStream] " +
	"\n\t\tseparatedBy: [aStream space]." +
	"\n\tempty ifFalse: [" +
	"\n\t\taStream nextPut: $] ]",
	null, "2012-11-05T13:45:02Z", "mp");

jst.FYKapitolaPM.addMethod("poradi", "", "accessing", 
	"\t^ poradi",
	null, "2012-11-05T13:30:03Z", "mp");

jst.FYKapitolaPM.addMethod("printOn:", "aStream", "printing", 
	"\taStream " +
	"\n\t\tnextPutAll: self cislo;" +
	"\n\t\tspace;" +
	"\n\t\tnextPutAll: nazev." +
	"\n\tself printElementsOn: aStream",
	null, "2012-11-12T22:33:15Z", "mp");
/*
jst.FYKapitolaPM.addMethod("convertFromJson:", "jsonObject", "private", 
	"\t| obj |" +
	"\n\tobj := super convertFromJson: jsonObject." +
	"\n\t(obj isKindOf: FYKapitolaPM) ifTrue: [" +
	"\n\t\tobj parent: self]." +
	"\n\t^ obj",
	null, "2012-11-12T21:45:10Z", "mp");

jst.FYKapitolaPM.addMethod("convertFromJson:atKey:", "jsonObject aString", "private", 
	"\t^ (self convertFromJson: jsonObject)" +
	"\n\t\tid: aString",
	null, "2012-11-13T20:19:55Z", "mp");
*/

jst.FYKapitolaPM.addMethod("jsonKeys", "", "private", 
	"\t^ super jsonKeys copyWithoutAll: #(id zmeny vyrazena)",
	null, "2013-03-01T14:09:05Z", "mp", 1);

jst.FYKapitolaPM.addMethod("jsonKeys", "", "private", 
	"\t^ super jsonKeys copyWithoutAll: #(id zmeny vyrazena pridana)",
	null, "2013-11-08T10:23:12Z", "mp"); //fytoportal-ior

jst.FYKapitolaPM.addMethod("convertToJson:atKey:", "anObject aString", "private", 
	"\t^ aString = #link " +
	"\n\t\tifTrue: [self linkId]" +
	"\n\t\tifFalse: [aString = #poznamka ifFalse: [" +
	"\n\t\t\tsuper convertToJson: anObject atKey: aString]]",
	null, "2013-02-19T13:44:50Z", "mp");

/* experiment
jst.FYKapitolaPM.addMethod("obsah", "", "accessing", 
	"\t^ obsah ifNil: [" +
	"\n\t\tself root link ifNotNilDo: [:kap |" +
	"\n\t\t\t(kap najdiKapitolu: self id) ifNotNilDo: [:obs | " +
	"\n\t\t\t\tobs]]]",
	null, "2012-11-14T16:03:06Z", "mp"); //jst-fytoportal-ior
*/
jst.FYKapitolaPM.addMethod("obsah", "", "accessing", 
	"\t^ zmeny ifNil: obsah",
	null, "2013-01-30T21:17:51Z", "mp");

jst.FYKapitolaPM.addMethod("obsah:", "anObject", "accessing", 
	"\tobsah := anObject ifNotString: [" +
	"\n\t\tanObject asArray]",
	null, "2013-01-30T15:29:03Z", "mp");

/*
jst.FYKapitolaPM.addMethod("cislo", "", "accessing", 
	"\t| cis p |" +
	"\n\tcis := poradi asString." +
	"\n\tp := parent." +
	"\n\t[p isKindOf: FYKapitolaPM] whileTrue: [" +
	"\n\t\tcis := p poradi asString, '.', cis." +
	"\n\t\tp := p parent]." +
	"\n\t^ cis",
	null, "2012-11-05T21:15:34Z", "mp");

jst.FYKapitolaPM.addMethod("cislo", "", "accessing", 
	"\t^ (parent isKindOf: FYKapitolaPM)" +
	"\n\t\tifTrue: [parent cislo, '.', poradi asString] " +
	"\n\t\tifFalse: [poradi asString]",
	null, "2012-11-12T15:18:54Z", "mp");
*/

jst.FYKapitolaPM.addMethod("cislo", "", "accessing", 
	"\t| cis |" +
	"\n\tcis := poradi ifNil: '' ifNotNil: [poradi asString, '.']." +
	"\n\t^ (parent isKindOf: FYKapitolaPM)" +
	"\n\t\tifTrue: [parent cislo, cis] " +
	"\n\t\tifFalse: cis",
	null, "2012-11-12T22:31:39Z", "mp");

/*
jst.FYKapitolaPM.addMethod("uroven", "", "accessing", 
	"\t| cis p |" +
	"\n\tcis := 1." +
	"\n\tp := self." +
	"\n\t[(p := (p parent isKindOf: FYKapitolaPM ) ifTrue: [" +
	"\n\t\tcis := cis + 1. " +
	"\n\t\tp parent]) notNil] whileTrue." +
	"\n\t^ cis",
	null, "2013-01-31T20:15:14Z", "mp");
*/
jst.FYKapitolaPM.addMethod("uroven", "", "accessing", 
	"\t| cis p |" +
	"\n\tcis := 1." +
	"\n\tp := self." +
	"\n\t[(p := ((p parent isKindOf: FYKapitolaPM ) and: [p parent linkId isNil]) ifTrue: [" +
	"\n\t\tcis := cis + 1. " +
	"\n\t\tp parent]) notNil] whileTrue." +
	"\n\t^ cis",
	null, "2013-05-15T20:57:05Z", "mp");

/*
jst.FYKapitolaPM.addMethod("id", "", "accessing", 
	"\t^ parent " +
	"\n\t\tifNotNil: [parent id, '.', poradi asString] " +
	"\n\t\tifNil: [poradi asString]",
	null, "2012-11-12T15:10:38Z", "mp");

jst.FYKapitolaPM.addMethod("id", "", "accessing", 
	"\t\"id funguje pouze v ramci metodiky, id plodinove metodiky se nepridava, id choroby nebo skudce ano\"" +
	"\n\t^ (parent isKindOf: FYKapitolaPM)" +
	"\n\t\tifTrue: [parent id, '.', poradi asString] " +
	"\n\t\tifFalse: [poradi asString]",
	null, "2012-11-12T16:04:26Z", "mp");

jst.FYKapitolaPM.addMethod("id", "", "accessing", 
	"\t\"id funguje pouze v ramci metodiky, id plodinove metodiky se nepridava, id choroby nebo skudce ano\"" +
	"\n\t^ id ifNil: [self linkId] ifNotNil: [" +
	"\n\t\t(parent isKindOf: FYKapitolaPM)" +
	"\n\t\t\tifTrue: [parent id, '.', id] " +
	"\n\t\t\tifFalse: id]",
	null, "2012-11-13T20:48:13Z", "mp");
*/

jst.FYKapitolaPM.addMethod("id", "", "accessing", 
	"\t\"id se sklada pouze v ramci metodiky, id plodinove metodiky ani metodiky skudce/choroby se nepridava\"" +
	"\n\t^ id ifNil: [self linkId] ifNotNil: [" +
	"\n\t\t(parent class == FYKapitolaPM)" +
	"\n\t\t\tifTrue: [parent id, '.', id] " +
	"\n\t\t\tifFalse: id]",
	null, "2012-11-14T15:30:39Z", "mp", 1);

jst.FYKapitolaPM.addMethod("id", "", "accessing", 
	"\t\"parent totiz vi, jestli ma pridat svoje id\"" +
	"\n\t^ parent " +
	"\n\t\tifNotNil: [parent slozeneId: id]" +
	"\n\t\tifNil: [id ifNil: [self linkId]]",
	null, "2014-03-12T21:55:54Z", "mp"); //fytoportal-ior

jst.FYKapitolaPM.addMethod("slozeneId:", "podkapId", "private", 
	"\t\"skladani id podkapitoly\"" +
	"\n\t^ self id, '.', podkapId",
	null, "2014-03-12T20:39:29Z", "mp");

jst.FYKapitolaPM.addMethod("link", "", "accessing", 
	"\t^ link ifString: [" +
	"\n\t\tlink := Fytoportal db loadObject: link]",
	null, "2013-04-23T12:29:23Z", "mp");

jst.FYKapitolaPM.addMethod("link:", "anObject", "accessing", 
	"\tlink := anObject",
	null, "2013-01-14T09:57:58Z", "mp");

jst.FYKapitolaPM.addMethod("linkId", "", "accessing", 
	"\t^ link ifNotNil: [" +
	"\n\t\tlink ifNotString: [link id]]",
	null, "2013-02-21T22:01:01Z", "mp");

jst.FYKapitolaPM.addMethod("odkazNacten", "", "testing", 
	"\t^ link notNil & link isString not",
	null, "2013-05-02T09:43:43Z", "mp");

jst.FYKapitolaPM.addMethod("poznamka", "", "accessing", 
	"\t^ poznamka",
	null, "2013-02-19T13:11:30Z", "mp");

jst.FYKapitolaPM.addMethod("metodika", "", "accessing", 
	"\t^ parent metodika",
	null, "2013-01-09T13:43:30Z", "mp");

jst.FYKapitolaPM.addMethod("jeVyrazena", "", "testing", 
	"\t^ vyrazena == true",
	null, "2013-03-01T14:10:31Z", "mp");

jst.FYKapitolaPM.addMethod("vyrazena:", "aBoolean", "accessing", 
	"\tvyrazena := aBoolean",
	null, "2013-03-01T14:10:55Z", "mp");

/*
jst.FYKapitolaPM.addMethod("seznamSO", "", "accessing", 
	"\t\"skudci, choroby, abionozy\"" +
	"\n\t^ zmeny " +
	"\n\t\tifNil: [obsah asCollection]" +
	"\n\t\tifNotNil: [\"priznak #vyrazena se uplatni jen u zmen\"" +
	"\n\t\t\tzmeny asCollection select: [:kap | kap jeVyrazena not]]",
	null, "2013-03-01T14:42:32Z", "mp");
*/

jst.FYKapitolaPM.addMethod("isEmpty", "", "testing", 
	"\t^ self isReadonly not and: [self obsah isEmptyOrNil] and: [self size = 0]",
	null, "2013-09-25T10:09:53Z", "mp", 1);

jst.FYKapitolaPM.addMethod("isEmpty", "", "testing", 
	"\t^ self isReadonly not " +
	"\n\t\tand: [self obsah isEmptyOrNil] " +
	"\n\t\tand: [(self detect: [:kap | " +
	"\n\t\t\tkap jeVyrazena not] ifNone: []) isNil]",
	null, "2013-11-08T20:11:24Z", "mp"); //fytoportal-ior

/*
jst.FYKapitolaPM.addMethod("renderContentOn:", "html", "rendering", 
	"\thtml div " +
	"\n\t\tclass: 'kapitola'; " +
	"\n\t\twith: [" +
	"\n\t\t\thtml div " +
	"\n\t\t\t\tclass: 'nazev', self uroven asString;  " +
	"\n\t\t\t\twith: self nazev." +
	"\n\t\t\thtml div " +
	"\n\t\t\t\tclass: 'obsah'; " +
	"\n\t\t\t\twith: [html html: self obsah]]",
	null, "2013-04-15T14:33:14Z", "mp");

jst.FYKapitolaPM.addMethod("renderContentOn:", "html", "rendering", 
	"\thtml div " +
	"\n\t\tclass: 'kapitola'; " +
	"\n\t\twith: [" +
	"\n\t\t\thtml anchor" +
	"\n\t\t\t\thref: '#', self id." +
	"\n\t\t\thtml div " +
	"\n\t\t\t\tclass: 'nazev', self uroven asString;  " +
	"\n\t\t\t\twith: self nazev." +
	"\n\t\t\tself renderTextOn: html]",
	null, "2013-04-23T08:01:36Z", "mp");

jst.FYKapitolaPM.addMethod("renderTextOn:", "html", "rendering", 
	"\thtml div " +
	"\n\t\tclass: 'obsah'; " +
	"\n\t\twith: [html html: self obsah]",
	null, "2013-04-23T07:58:57Z", "mp");
*/
jst.FYKapitolaPM.addMethod("renderOn:", "html", "rendering", 
	"\tself kapitoly do: [:kap |" +
	"\n\t\tkap renderTextOn: html of: kap]",
	null, "2013-05-02T07:48:04Z", "mp");

jst.FYKapitolaPM.addMethod("renderTextOn:of:", "html component", "rendering", 
	"\thtml div class: 'kapitola'; with: [" +
	"\n\t\thtml div " +
	"\n\t\t\tclass: 'nazev', self uroven asString;  " +
	"\n\t\t\twith: nazev." +
	"\n\t\tself class == FYKapitolaPOR " +
	"\n\t\t\tifTrue: [component renderKapitolaPOR: self on: html]" +
	"\n\t\t\tifFalse: [html div " +
	"\n\t\t\t\tclass: 'obsah'; " +
	"\n\t\t\t\twith: [html html: self obsah]] " +
	"\n\t]",
	null, "2013-05-02T07:46:57Z", "mp", 1);

jst.FYKapitolaPM.addMethod("renderTextOn:of:", "html component", "rendering", 
	"\thtml div class: 'kapitola'; with: [" +
	"\n\t\thtml div " +
	"\n\t\t\tid: self id;" +
	"\n\t\t\tclass: 'nazev', self uroven asString;  " +
	"\n\t\t\twith: nazev." +
	"\n\t\tself class == FYKapitolaPOR " +
	"\n\t\t\tifTrue: [component renderKapitolaPOR: self on: html]" +
	"\n\t\t\tifFalse: [html div " +
	"\n\t\t\t\tclass: 'obsah'; " +
	"\n\t\t\t\twith: [html html: self obsah]] " +
	"\n\t]",
	null, "2013-06-23T17:12:34Z", "mp", 1);

jst.FYKapitolaPM.addMethod("renderTextOn:of:", "html component", "rendering", 
	"\thtml div class: 'kapitola'; with: [" +
	"\n\t\thtml div " +
	"\n\t\t\tid: self id;" +
	"\n\t\t\tclass: 'nazev', self uroven asString;  " +
	"\n\t\t\twith: nazev." +
	"\n\t\tself class == FYKapitolaPOR " +
	"\n\t\t\tifTrue: [component renderKapitolaPOR: self on: html]" +
	"\n\t\t\tifFalse: [ | str |" +
	"\n\t\t\t\tstr := self obsah." +
	"\n\t\t\t\t(str notNil and: [str isEmpty not]) ifTrue: [html div " +
	"\n\t\t\t\t\tclass: 'obsah'; " +
	"\n\t\t\t\t\twith: [html html: str]]]" +
	"\n\t]",
	null, "2014-01-09T18:30:01Z", "mp", 1);

jst.FYKapitolaPM.addMethod("renderTextOn:of:", "html component", "rendering", 
	"\thtml div class: 'kapitola'; with: [ | str |" +
	"\n\t\thtml div " +
	"\n\t\t\tid: self id;" +
	"\n\t\t\tclass: 'nazev', self uroven asString;  " +
	"\n\t\t\twith: nazev." +
	"\n\t\tstr := self obsah." +
	"\n\t\t(str notNil and: [str isEmpty not]) ifTrue: [html div " +
	"\n\t\t\tclass: 'obsah'; " +
	"\n\t\t\twith: [html html: str]]." +
	"\n\t\tself jeKapitolaPOR ifTrue: [" +
	"\n\t\t\tcomponent renderKapitolaPOR: self on: html]" +
	"\n\t]",
	null, "2014-04-23T20:40:50Z", "mp"); //fytoportal-ior

jst.FYKapitolaPM.addMethod("jeKapitolaPOR", "", "testing", 
	"\t\"vyjimka pro monitorovaci pomucky\"" +
	"\n\t^ id = #primeMetody",
	null, "2014-04-24T10:30:42Z", "mp");

/*
jst.FYKapitolaPM.addMethod("kapitolaMetodikySO", "", "accessing", 
	"\t^ link ifNotNil: [self] ifNil: [parent kapitolaMetodikySO]",
	null, "2013-05-03T15:35:20Z", "mp");
*/

jst.FYKapitolaPM.addMethod("jeKapitola", "", "testing", 
	"\t^ true",
	null, "2013-11-05T12:49:29Z", "mp");

jst.FYKapitolaPM.addMethod("jeKapitola1", "", "testing", 
	"\t\"test na kapitolu prvni urovne, tj. plodiny, pestebniOpatreni atd.\"" +
	"\n\t^ parent notNil and: [parent == self metodika]",
	null, "2014-01-01T15:15:04Z", "mp");

jst.FYKapitolaPM.addMethod("kapitolyTisk", "", "accessing", 
	"\t| vysl |" +
	"\n\tvysl := self kapitoly select: [:kap | kap jeVyrazena not]." +
	"\n\tparent jeKapitolaSO ifTrue: [" +
	"\n\t\t\"kapitoly vybraneho SO, choroby, abionozy\"" +
	"\n\t\tself metodika obecnaMetodika ifNotNilDo: [:met |" +
	"\n\t\t\t\"nejdrive zkusim doplnit z obecne metodiky - i v ni mohu prepsat nektere kapitoly SO\"" +
	"\n\t\t\t((met at: id) obsah detect: [:kap | kap linkId = self linkId] ifNone: []) ifNotNilDo: [" +
	"\n\t\t\t\tvysl := self doplnKapitoly: (met at: id) do: vysl]]." +
	"\n\t\t\"doplnim z metodiky SO, vetsinou tedy vse\"" +
	"\n\t\tvysl := self doplnKapitoly: self link do: vysl." +
	"\n\t] ifFalse: [parent jeMetodikaPM ifTrue: [" +
	"\n\t\t\"pouze na prvni urovni - pestebni opatreni, regulace plevelu, osetreni rostlin a rizika rezistence\"" +
	"\n\t\tself metodika obecnaMetodika ifNotNilDo: [:met |" +
	"\n\t\t\tvysl := self doplnKapitoly: (met at: id) do: vysl" +
	"\n\t\t]" +
	"\n\t]]." +
	"\n\t^ vysl",
	null, "2013-12-07T22:42:47Z", "mp", 1);

jst.FYKapitolaPM.addMethod("kapitolyTisk", "", "accessing", 
	"\t| vysl |" +
	"\n\tvysl := self kapitoly select: [:kap | kap jeVyrazena not]." +
	"\n\tparent jeKapitolaSO ifTrue: [" +
	"\n\t\t\"kapitoly vybraneho SO, choroby, abionozy\"" +
	"\n\t\tself metodika obecnaMetodika ifNotNilDo: [:met |" +
	"\n\t\t\t\"nejdrive zkusim doplnit z obecne metodiky - i v ni mohu prepsat nektere kapitoly SO\"" +
	"\n\t\t\t((met at: parent id) obsah detect: [:kap | kap linkId = self linkId] ifNone: []) ifNotNilDo: [:kap |" +
	"\n\t\t\t\tvysl := self doplnKapitoly: kap do: vysl]]." +
	"\n\t\t\"doplnim z metodiky SO, vetsinou tedy vse\"" +
	"\n\t\tvysl := self doplnKapitoly: self link do: vysl." +
	"\n\t] ifFalse: [parent jeMetodikaPM ifTrue: [" +
	"\n\t\t\"pouze na prvni urovni - pestebni opatreni, regulace plevelu, osetreni rostlin a rizika rezistence\"" +
	"\n\t\tself metodika obecnaMetodika ifNotNilDo: [:met |" +
	"\n\t\t\tvysl := self doplnKapitoly: (met at: id) do: vysl" +
	"\n\t\t]" +
	"\n\t]]." +
	"\n\t^ vysl",
	null, "2013-12-09T16:18:01Z", "mp", 1);

jst.FYKapitolaPM.addMethod("kapitolyTisk", "", "accessing", 
	"\t| cilovaKap |" +
	"\n\tcilovaKap := parent jeKapitolaSO " +
	"\n\t\tifTrue: [Fytoportal data osnovaMetodikyKapitoly: parent id] " +
	"\n\t\tifFalse: [Fytoportal data osnovaMetodiky at: id]." +
	"\n\tcilovaKap :=cilovaKap copy do: [:kap |" +
	"\n\t\t\"az pri prepisovani zrusim vyrazeni\"" +
	"\n\t\tkap isReadonly " +
	"\n\t\t\tifFalse: [kap vyrazena: true]" +
	"\n\t\t\tifTrue: [ | p | " +
	"\n\t\t\t\tp := kap parent." +
	"\n\t\t\t\t[p notNil and: [p jeKapitola]] " +
	"\n\t\t\t\t\twhileTrue: [p vyrazena: false. " +
	"\n\t\t\t\t\t\tp := p parent]]" +
	"\n\t]." +
	"\n\tparent jeKapitolaSO ifTrue: [" +
	"\n\t\t\"kapitoly vybraneho SO, choroby, abionozy " +
	"\n\t\t\t- nejdrive z metodiky SO\"" +
	"\n\t\tself link prepisKapitolu: cilovaKap." +
	"\n\t\tself metodika obecnaMetodika ifNotNilDo: [:met |" +
	"\n\t\t\t\"pak z obecne metodiky - i v ni mohu prepsat nektere kapitoly SO\"" +
	"\n\t\t\t((met at: parent id) obsah detect: [:kap | kap linkId = self linkId] ifNone: []) ifNotNilDo: [:kap |" +
	"\n\t\t\t\tkap prepisKapitolu: cilovaKap]]." +
	"\n\t] ifFalse: [parent jeMetodikaPM ifTrue: [" +
	"\n\t\t\"pouze na prvni urovni - pestebni opatreni, regulace plevelu, osetreni rostlin a rizika rezistence\"" +
	"\n\t\tself metodika obecnaMetodika ifNotNilDo: [:met |" +
	"\n\t\t\t(met at: id) prepisKapitolu: cilovaKap]" +
	"\n\t]]." +
	"\n\t\"nakonec prepsane podkapitoly v teto kapitole - maji nejvyssi prioritu\"" +
	"\n\tself prepisKapitolu: cilovaKap." +
	"\n\t^ cilovaKap kapitoly select: [:kap | kap jeVyrazena not]",
	null, "2013-12-13T12:43:53Z", "mp", 1);

jst.FYKapitolaPM.addMethod("kapitolyTisk", "", "accessing", 
	"\t| cilovaKap |" +
	"\n\tcilovaKap := parent jeKapitolaSO " +
	"\n\t\tifTrue: [Fytoportal data osnovaMetodikyKapitoly: parent id] " +
	"\n\t\tifFalse: [(Fytoportal data osnovaMetodiky: self metodika typ) at: id]." +
	"\n\tcilovaKap :=cilovaKap copy do: [:kap |" +
	"\n\t\t\"az pri prepisovani zrusim vyrazeni\"" +
	"\n\t\tkap isReadonly " +
	"\n\t\t\tifFalse: [kap vyrazena: true]" +
	"\n\t\t\tifTrue: [ | p | " +
	"\n\t\t\t\tp := kap parent." +
	"\n\t\t\t\t[p notNil and: [p jeKapitola]] " +
	"\n\t\t\t\t\twhileTrue: [p vyrazena: false. " +
	"\n\t\t\t\t\t\tp := p parent]]" +
	"\n\t]." +
	"\n\tparent jeKapitolaSO ifTrue: [" +
	"\n\t\t\"kapitoly vybraneho SO, choroby, abionozy " +
	"\n\t\t\t- nejdrive z metodiky SO\"" +
	"\n\t\tself link prepisKapitolu: cilovaKap." +
	"\n\t\tself metodika obecnaMetodika ifNotNilDo: [:met |" +
	"\n\t\t\t\"pak z obecne metodiky - i v ni mohu prepsat nektere kapitoly SO\"" +
	"\n\t\t\t((met at: parent id) obsah detect: [:kap | kap linkId = self linkId] ifNone: []) ifNotNilDo: [:kap |" +
	"\n\t\t\t\tkap prepisKapitolu: cilovaKap]]." +
	"\n\t] ifFalse: [parent jeMetodikaPM ifTrue: [" +
	"\n\t\t\"pouze na prvni urovni - pestebni opatreni, regulace plevelu, osetreni rostlin a rizika rezistence\"" +
	"\n\t\tself metodika obecnaMetodika ifNotNilDo: [:met |" +
	"\n\t\t\t(met at: id) prepisKapitolu: cilovaKap]" +
	"\n\t]]." +
	"\n\t\"nakonec prepsane podkapitoly v teto kapitole - maji nejvyssi prioritu\"" +
	"\n\tself prepisKapitolu: cilovaKap." +
	"\n\t^ cilovaKap kapitoly select: [:kap | kap jeVyrazena not]",
	null, "2014-02-09T16:30:03Z", "mp"); //fytoportal-ior

/*
jst.FYKapitolaPM.addMethod("doplnKapitoly:do:", "jinaKap vysl", "private", 
	"\t| pos |" +
	"\n\t\"jinaKap je odpovidajici kapitola z metodiky SO nebo z obecne metodiky\"" +
	"\n\tpos := 1." +
	"\n\tjinaKap kapitoly do: [:kap | | kap1 |" +
	"\n\t\tkap1 := self najdiKapitolu: (kap id copyAfter: $.)." +
	"\n\t\t(kap1 isNil or: [kap obsah isEmptyOrNil not and: [kap1 jeVyrazena not] and: [kap1 obsah isEmptyOrNil]]) ifTrue: [" +
	"\n\t\t\t| kapId |" +
	"\n\t\t\t\"zaradim kapitolu do vysledku\"" +
	"\n\t\t\tkapId := kap id copyAfter: $.." +
	"\n\t\t\t[pos <= vysl size and: [kapId startsWith: ((vysl at: pos) id copyAfter: $.)]] whileTrue: [" +
	"\n\t\t\t\tpos := pos + 1]." +
	"\n\t\t\t(pos > 1 and: [(vysl at: pos - 1) id = kap id])" +
	"\n\t\t\t\tifTrue: [vysl at: pos - 1 put: kap] " +
	"\n\t\t\t\tifFalse: [" +
	"\n\t\t\t\t\tvysl insert: kap before: pos." +
	"\n\t\t\t\t\tpos := pos + 1]" +
	"\n\t\t]" +
	"\n\t]." +
	"\n\t^ vysl",
	null, "2013-12-07T22:26:37Z", "mp");

jst.FYKapitolaPM.addMethod("doplnKapitoly:do:", "jinaKap vysl", "private", 
	"\t| pos |" +
	"\n\t\"jinaKap je odpovidajici kapitola z metodiky SO nebo z obecne metodiky\"" +
	"\n\tpos := 1." +
	"\n\tjinaKap kapitoly do: [:kap | | kapId kap1 |" +
	"\n\t\tkapId := kap id." +
	"\n\t\tjinaKap metodika jeMetodikaSO ifFalse: [" +
	"\n\t\t\t\"u metodiky SO doplnuji nejvyssi uroven, jinak doplnuji podkapitoly kapitoly prvni urovne\"" +
	"\n\t\t\tkapId := kapId copyAfter: $.]." +
	"\n\t\tkap1 := self najdiKapitolu: kapId." +
	"\n\t\t(kap1 isNil or: [kap obsah isEmptyOrNil not and: [kap1 jeVyrazena not] and: [kap1 obsah isEmptyOrNil]]) ifTrue: [" +
	"\n\t\t\t\"zaradim kapitolu do vysledku\"" +
	"\n\t\t\t[pos <= vysl size and: [kapId startsWith: ((vysl at: pos) id copyAfter: $.)]] whileTrue: [" +
	"\n\t\t\t\tpos := pos + 1]." +
	"\n\t\t\t(pos > 1 and: [((vysl at: pos - 1) id copyAfter: $.) = kapId])" +
	"\n\t\t\t\tifTrue: [vysl at: pos - 1 put: kap] " +
	"\n\t\t\t\tifFalse: [" +
	"\n\t\t\t\t\tvysl insert: kap before: pos." +
	"\n\t\t\t\t\tpos := pos + 1]" +
	"\n\t\t]" +
	"\n\t]." +
	"\n\t^ vysl",
	null, "2013-12-11T18:14:25Z", "mp"); //fytoportal-ior
*/

jst.FYKapitolaPM.addMethod("osnovaTisk", "", "accessing", 
	"\t| fronta |" +
	"\n\t\"slozim osnovu, tj. strom z plocheho seznamu, struktury jednotlivych kapitol si nevsimam" +
	"\n\t- kapitoly totiz pochazeji z teto nebo z obecne metodiky\"" +
	"\n\tfronta := OrderedCollection new." +
	"\n\tfronta add: (FYKapitolaPM new" +
	"\n\t\tid: id;" +
	"\n\t\tnazev: nazev)." +
	"\n\tself kapitolyTisk do: [:kap | | keys |" +
	"\n\t\tkeys := kap id findTokens: '.'." +
	"\n\t\t[keys size <= fronta size] whileTrue: [" +
	"\n\t\t\tfronta removeLast]." +
	"\n\t\tfronta add: (fronta last at: keys last put: (" +
	"\n\t\t\tFYKapitolaPM new" +
	"\n\t\t\t\tid: kap id;" +
	"\n\t\t\t\tnazev: kap nazev;" +
	"\n\t\t\t\tporadi: kap poradi;" +
	"\n\t\t\t\tparent: fronta last))" +
	"\n\t]." +
	"\n\t^ fronta first",
	null, "2013-12-06T11:02:53Z", "mp", 1);

jst.FYKapitolaPM.addMethod("osnovaTisk", "", "accessing", 
	"\t^ parent jeKapitolaSO | parent jeMetodikaPM ifTrue: [" +
	"\n\t\t| fronta |" +
	"\n\t\t\"slozim osnovu, tj. strom z plocheho seznamu, struktury jednotlivych kapitol si nevsimam" +
	"\n\t\t- kapitoly totiz pochazeji z teto nebo z obecne metodiky\"" +
	"\n\t\tfronta := OrderedCollection new." +
	"\n\t\tfronta add: (FYKapitolaPM new" +
	"\n\t\t\tid: id;" +
	"\n\t\t\tnazev: nazev)." +
	"\n\t\tself kapitolyTisk do: [:kap | | keys |" +
	"\n\t\t\tkeys := kap id findTokens: '.'." +
	"\n\t\t\t[keys size <= fronta size] whileTrue: [" +
	"\n\t\t\t\tfronta removeLast]." +
	"\n\t\t\tfronta add: (fronta last at: keys last put: (" +
	"\n\t\t\t\tFYKapitolaPM new" +
	"\n\t\t\t\t\tid: kap id;" +
	"\n\t\t\t\t\tnazev: kap nazev;" +
	"\n\t\t\t\t\tporadi: kap poradi;" +
	"\n\t\t\t\t\tparent: fronta last))" +
	"\n\t\t]." +
	"\n\t\tfronta first" +
	"\n\t] ifFalse: [" +
	"\n\t\t\"obyčejný seznam podkapitol, např. u osnovy\"" +
	"\n\t\tself sortedKeys collect: [:key | self at: key]]",
	null, "2013-12-08T16:45:29Z", "mp", 1);

jst.FYKapitolaPM.addMethod("osnovaTisk", "", "accessing", 
	"\t^ parent jeKapitolaSO | parent jeMetodikaPM ifTrue: [" +
	"\n\t\t| fronta |" +
	"\n\t\t\"slozim osnovu, tj. strom z plocheho seznamu, struktury jednotlivych kapitol si nevsimam" +
	"\n\t\t- kapitoly totiz pochazeji z teto nebo z obecne metodiky\"" +
	"\n\t\tfronta := OrderedCollection new." +
	"\n\t\tfronta add: (FYKapitolaPM new" +
	"\n\t\t\tid: id;" +
	"\n\t\t\tnazev: nazev)." +
	"\n\t\tself kapitolyTisk do: [:kap | | keys |" +
	"\n\t\t\tkeys := kap id findTokens: '.'." +
	"\n\t\t\t[keys size <= fronta size] whileTrue: [" +
	"\n\t\t\t\tfronta removeLast]." +
	"\n\t\t\tfronta add: (fronta last at: keys last put: (" +
	"\n\t\t\t\tFYKapitolaPM new" +
	"\n\t\t\t\t\tid: (kap instVarNamed: #id);" +
	"\n\t\t\t\t\tnazev: kap nazev;" +
	"\n\t\t\t\t\tporadi: kap poradi;" +
	"\n\t\t\t\t\tparent: fronta last))" +
	"\n\t\t]." +
	"\n\t\tfronta first" +
	"\n\t] ifFalse: [" +
	"\n\t\t\"obyčejný seznam podkapitol, např. u osnovy\"" +
	"\n\t\tself sortedKeys collect: [:key | self at: key]]",
	null, "2013-12-30T12:40:55Z", "mp", 1);

jst.FYKapitolaPM.addMethod("osnovaTisk", "", "accessing", 
	"\t^ parent jeKapitolaSO | parent jeMetodikaPM ifTrue: [" +
	"\n\t\t| fronta |" +
	"\n\t\t\"slozim osnovu, tj. strom z plocheho seznamu, struktury jednotlivych kapitol si nevsimam" +
	"\n\t\t- kapitoly totiz pochazeji z teto nebo z obecne metodiky\"" +
	"\n\t\tfronta := OrderedCollection new." +
	"\n\t\tfronta add: (FYKapitolaPM new" +
	"\n\t\t\tid: id;" +
	"\n\t\t\tnazev: nazev;" +
	"\n\t\t\tparent: parent)." +
	"\n\t\tself kapitolyTisk do: [:kap | | keys |" +
	"\n\t\t\tkeys := kap id findTokens: '.'." +
	"\n\t\t\t[keys size <= fronta size] whileTrue: [" +
	"\n\t\t\t\tfronta removeLast]." +
	"\n\t\t\tfronta add: (fronta last at: keys last put: (" +
	"\n\t\t\t\tFYKapitolaPM new" +
	"\n\t\t\t\t\tid: (kap instVarNamed: #id);" +
	"\n\t\t\t\t\tnazev: kap nazev;" +
	"\n\t\t\t\t\tporadi: kap poradi;" +
	"\n\t\t\t\t\tparent: fronta last))" +
	"\n\t\t]." +
	"\n\t\tfronta first" +
	"\n\t] ifFalse: [" +
	"\n\t\t\"obyčejný seznam podkapitol, např. u osnovy\"" +
	"\n\t\tself sortedKeys collect: [:key | self at: key]]",
	null, "2014-01-02T10:39:15Z", "mp"); //fytoportal-ior

jst.FYKapitolaPM.addMethod("kapitolyTiskVyber", "", "accessing", 
	"\t| vyber result kapitoly |" +
	"\n\t\"pouze na prvni urovni\"" +
	"\n\tvyber := OrderedCollection new." +
	"\n\tvyber add: ((Fytoportal data vyberKapitolPM at: self metodika id) at: id ifAbsent: [true])." +
	"\n\tvyber first value ifTrue: [" +
	"\n\t\t\"vse\"" +
	"\n\t\t^ self kapitolyTisk]." +
	"\n\tresult := OrderedCollection new." +
	"\n\tkapitoly := OrderedCollection new." +
	"\n\tself kapitolyTisk do: [:kap | | keys |" +
	"\n\t\tkeys := kap id findTokens: '.'." +
	"\n\t\t[keys size <= vyber size] whileTrue: [" +
	"\n\t\t\tvyber removeLast]." +
	"\n\t\t[keys size <= (kapitoly size + 1)] whileTrue: [" +
	"\n\t\t\t\"v kapitolach neni prvni uroven, proto prictu 1\"" +
	"\n\t\t\tkapitoly removeLast]." +
	"\n\t\t(vyber anySatisfy: [:vyb | vyb value]) " +
	"\n\t\t\tifTrue: [result add: kap]" +
	"\n\t\t\tifFalse: [keys size - 1 = vyber size ifTrue: [" +
	"\n\t\t\t\t\"nadrazenou kapitolu musim pridat, i kdyz neni zaskrtnuta\"" +
	"\n\t\t\t\tkapitoly add: kap." +
	"\n\t\t\t\tvyber last at: keys last ifPresent: [:vyb |" +
	"\n\t\t\t\t\tvyber add: vyb." +
	"\n\t\t\t\t\tvyb value ifTrue: [" +
	"\n\t\t\t\t\t\t[result add: kapitoly removeFirst. " +
	"\n\t\t\t\t\t\t\tkapitoly isEmpty] whileFalse]" +
	"\n\t\t\t\t]" +
	"\n\t\t\t]]" +
	"\n\t]." +
	"\n\t^ result",
	null, "2013-12-30T16:36:48Z", "mp", 1);

jst.FYKapitolaPM.addMethod("kapitolyTiskVyber", "", "accessing", 
	"\t| vyber fronta vyberSO frontaSO result kapitoly plus |" +
	"\n\t\"pouze prvni uroven nebo kapitola SO\"" +
	"\n\tvyber := Fytoportal data vyberKapitolPM at: self metodika id." +
	"\n\tfronta := OrderedCollection new." +
	"\n\tfrontaSO := OrderedCollection new." +
	"\n\tparent jeKapitolaSO ifFalse: [" +
	"\n\t\tvyber := vyber at: id ifAbsent: [true]." +
	"\n\t\tvyber value ifTrue: [" +
	"\n\t\t\t^ self kapitolyTisk]." +
	"\n\t\t\"delka fronty musi odpovidat poctu casti id\"" +
	"\n\t\tfronta add: vyber." +
	"\n\t] ifTrue: [" +
	"\n\t\tvyber := vyber at: parent id ifAbsent: [true]." +
	"\n\t\tvyber at: #vse ifPresent: [:vse |" +
	"\n\t\t\tvse value ifTrue: [" +
	"\n\t\t\t\t^ self kapitolyTisk]]." +
	"\n\t\tvyber at: self linkId ifPresent: [:vyb |" +
	"\n\t\t\tvyberSO := vyb]." +
	"\n\t\t(vyberSO isNil or: [(vyberSO at: #vse ifAbsent: [true]) value]) ifTrue: [" +
	"\n\t\t\t\"defaultne tisknu vsechny kapitoly vybraneho SO\"" +
	"\n\t\t\t^ self kapitolyTisk]" +
	"\n\t]." +
	"\n\tresult := OrderedCollection new." +
	"\n\tkapitoly := OrderedCollection new." +
	"\n\t\"v kapitolach neni prvni uroven, proto prictu 1, je-li prvni uroven ve fronte\"" +
	"\n\tplus := fronta size." +
	"\n\tself kapitolyTisk do: [:kap | | keys |" +
	"\n\t\tkeys := kap id findTokens: '.'." +
	"\n\t\t[keys size <= fronta size] whileTrue: [" +
	"\n\t\t\tfronta removeLast]." +
	"\n\t\t[keys size <= frontaSO size] whileTrue: [" +
	"\n\t\t\tfrontaSO removeLast]." +
	"\n\t\t[kapitoly size > 0 and: [keys size <= (kapitoly size + plus)]] whileTrue: [" +
	"\n\t\t\tkapitoly removeLast]." +
	"\n\t\t((fronta anySatisfy: [:vyb | vyb value]) or: [frontaSO anySatisfy: [:vyb | vyb value]])" +
	"\n\t\t\tifTrue: [result add: kap]" +
	"\n\t\t\tifFalse: [(keys size - 1 = fronta size or: [keys size - 1 = frontaSO size]) ifTrue: [ | vyb |" +
	"\n\t\t\t\t\"nadrazenou kapitolu musim pridat, i kdyz neni zaskrtnuta\"" +
	"\n\t\t\t\tkapitoly add: kap." +
	"\n\t\t\t\tkeys size - 1 = fronta size ifTrue: [" +
	"\n\t\t\t\t\t(fronta size > 0 ifTrue: [fronta last] ifFalse: [vyber]) at: keys last ifPresent: [:v | " +
	"\n\t\t\t\t\t\tvyb := fronta add: v]]." +
	"\n\t\t\t\t(vyberSO notNil and: [keys size - 1 = frontaSO size]) ifTrue: [" +
	"\n\t\t\t\t\t(frontaSO size > 0 ifTrue: [frontaSO last] ifFalse: [vyberSO]) at: keys last ifPresent: [:v | " +
	"\n\t\t\t\t\t\tfrontaSO add: v." +
	"\n\t\t\t\t\t\t(vyb isNil or: [vyb value not]) ifTrue: [" +
	"\n\t\t\t\t\t\t\tvyb := v]]]." +
	"\n\t\t\t\t(vyb notNil and: [vyb value]) ifTrue: [" +
	"\n\t\t\t\t\t[result add: kapitoly removeFirst. " +
	"\n\t\t\t\t\t\tkapitoly isEmpty] whileFalse]" +
	"\n\t\t\t]]" +
	"\n\t]." +
	"\n\t^ result",
	null, "2013-12-30T22:54:42Z", "mp", 1);

jst.FYKapitolaPM.addMethod("kapitolyTiskVyber", "", "accessing", 
	"\t| vyber fronta vyberSO frontaSO result kapitoly plus |" +
	"\n\t\"pouze prvni uroven nebo kapitola SO\"" +
	"\n\tvyber := Fytoportal data vyberKapitolPM at: self metodika id." +
	"\n\tfronta := OrderedCollection new." +
	"\n\tfrontaSO := OrderedCollection new." +
	"\n\tparent jeKapitolaSO ifFalse: [" +
	"\n\t\tvyber := vyber at: id ifAbsent: [true]." +
	"\n\t\tvyber value ifTrue: [" +
	"\n\t\t\t^ self kapitolyTisk]." +
	"\n\t\t\"delka fronty musi odpovidat poctu casti id\"" +
	"\n\t\tfronta add: vyber." +
	"\n\t] ifTrue: [" +
	"\n\t\t\"abionozy, choroby, skudci\"" +
	"\n\t\tvyber := vyber at: parent id ifAbsent: [Dictionary new]." +
	"\n\t\t(vyber at: #vse ifAbsent: [true]) value ifTrue: [" +
	"\n\t\t\t\"defaultne tisknu vsechny kapitoly vsech SO\"" +
	"\n\t\t\t^ self kapitolyTisk]." +
	"\n\t\tvyber at: self linkId ifPresent: [:vyb |" +
	"\n\t\t\tvyberSO := vyb]." +
	"\n\t\t(vyberSO notNil and: [(vyberSO at: #vse ifAbsent: [false]) value]) ifTrue: [" +
	"\n\t\t\t\"defaultne NEtisknu vsechny kapitoly vybraneho SO\"" +
	"\n\t\t\t^ self kapitolyTisk]" +
	"\n\t]." +
	"\n\tresult := OrderedCollection new." +
	"\n\tkapitoly := OrderedCollection new." +
	"\n\t\"v kapitolach neni prvni uroven, proto prictu 1, je-li prvni uroven ve fronte\"" +
	"\n\tplus := fronta size." +
	"\n\tself kapitolyTisk do: [:kap | | keys |" +
	"\n\t\tkeys := kap id findTokens: '.'." +
	"\n\t\t[keys size <= fronta size] whileTrue: [" +
	"\n\t\t\tfronta removeLast]." +
	"\n\t\t[keys size <= frontaSO size] whileTrue: [" +
	"\n\t\t\tfrontaSO removeLast]." +
	"\n\t\t[kapitoly size > 0 and: [keys size <= (kapitoly size + plus)]] whileTrue: [" +
	"\n\t\t\tkapitoly removeLast]." +
	"\n\t\t((fronta anySatisfy: [:vyb | vyb value]) or: [frontaSO anySatisfy: [:vyb | vyb value]])" +
	"\n\t\t\tifTrue: [result add: kap]" +
	"\n\t\t\tifFalse: [(keys size - 1 = fronta size or: [keys size - 1 = frontaSO size]) ifTrue: [ | vyb |" +
	"\n\t\t\t\t\"nadrazenou kapitolu musim pridat, i kdyz neni zaskrtnuta\"" +
	"\n\t\t\t\tkapitoly add: kap." +
	"\n\t\t\t\tkeys size - 1 = fronta size ifTrue: [" +
	"\n\t\t\t\t\t(fronta size > 0 ifTrue: [fronta last] ifFalse: [vyber]) at: keys last ifPresent: [:v | " +
	"\n\t\t\t\t\t\tvyb := fronta add: v]]." +
	"\n\t\t\t\t(vyberSO notNil and: [keys size - 1 = frontaSO size]) ifTrue: [" +
	"\n\t\t\t\t\t(frontaSO size > 0 ifTrue: [frontaSO last] ifFalse: [vyberSO]) at: keys last ifPresent: [:v | " +
	"\n\t\t\t\t\t\tfrontaSO add: v." +
	"\n\t\t\t\t\t\t(vyb isNil or: [vyb value not]) ifTrue: [" +
	"\n\t\t\t\t\t\t\tvyb := v]]]." +
	"\n\t\t\t\t(vyb notNil and: [vyb value]) ifTrue: [" +
	"\n\t\t\t\t\t[result add: kapitoly removeFirst. " +
	"\n\t\t\t\t\t\tkapitoly isEmpty] whileFalse]" +
	"\n\t\t\t]]" +
	"\n\t]." +
	"\n\t^ result",
	null, "2014-01-06T09:34:31Z", "mp"); //fytoportal-ior

jst.FYKapitolaPM.addMethod("vyberKapitolPM", "", "private", 
	"\t^ self metodika vyberKapitolPM",
	null, "2014-03-06T10:14:21Z", "mp");

jst.FYKapitolaPM.addMethod("metodikaSO", "", "accessing", 
	"\t^ parent metodikaSO",
	null, "2014-04-22T14:16:21Z", "mp");

//*** FYKapitolaTaxony ***

jst.FYKapitolaTaxony.addMethod("initialize", "", "initialization", 
	"\t\"Nemelo by byt potreba, pokud prazdna metodika v DB bude mit obsah jako prazdne pole.\"" +
	"\n\tsuper initialize." +
	"\n\tobsah := OrderedCollection new",
	null, "2013-10-08T07:37:39Z", "mp", 1);

jst.FYKapitolaTaxony.addMethod("initialize", "", "initialization", 
	"\t\"Nemelo by byt potreba, pokud prazdna metodika v DB bude mit obsah jako prazdne pole.\"" +
	"\n\tsuper initialize." +
	"\n\tobsah := OrderedCollection new." +
	"\n\tnazvyNacteny := false",
	null, "2014-03-04T20:50:44Z", "mp"); //fytoportal-ior

jst.FYKapitolaTaxony.addMethod("doplnNazvySO:", "view", "private", 
	"\t| sezn |" +
	"\n\tsezn := self obsah." +
	"\n\tnazvyNacteny ifFalse: [" +
	"\n\t\tnazvyNacteny := true." +
	"\n\t\t(view lookupKeys: (sezn collect: [:kap | kap linkId])) ifNotEmptyDo: [:nazvy |" +
	"\n\t\t\tnazvy do: [:row | (sezn detect: [:kap | kap linkId = row id]) nazev: row value]]]." +
	"\n\t^ sezn",
	null, "2014-03-04T21:07:33Z", "mp");

/*
jst.FYKapitolaTaxony.addMethod("resetujNazvy", "", "initialization", 
	"\tnazvyNacteny := false",
	null, "2014-03-04T21:10:06Z", "mp", 1);

jst.FYKapitolaTaxony.addMethod("resetujNazvy", "", "initialization", 
	"\tnazvyNacteny := false." +
	"\n\tkapitolyTisk := nil",
	null, "2014-03-11T16:26:39Z", "mp"); //fytoportal-ior
*/

jst.FYKapitolaTaxony.addMethod("jsonKeys", "", "private", 
	"\t^ super jsonKeys copyWithoutAll: #(fotky taxony)",
	null, "2013-05-19T21:22:43Z", "mp", 1);

jst.FYKapitolaTaxony.addMethod("jsonKeys", "", "private", 
	"\t^ super jsonKeys copyWithoutAll: #(fotky taxony nazvyNacteny kapitolyTisk)",
	null, "2014-03-05T13:49:42Z", "mp"); //fytoportal-ior

jst.FYKapitolaTaxony.addMethod("taxony", "", "accessing", 
	"\t^ taxony ifNil: [" +
	"\n\t\ttaxony := ((Fytoportal data taxony podleId lookupKeys: self taxonyId) collect: [:dict | dict at: #doc])" +
	"\n\t\t\tasSortedCollection: [:a :b | a cesky <= b cesky]]",
	null, "2013-05-20T08:24:10Z", "mp", 1);

jst.FYKapitolaTaxony.addMethod("taxony", "", "accessing", 
	"\t^ taxony ifNil: [" +
	"\n\t\ttaxony := ((Fytoportal data taxony podleId lookupKeys: self taxonyId) collect: [:dict | dict at: #doc])" +
	"\n\t\t\tasSortedCollection: [:a :b | a nazev <= b nazev]]",
	null, "2013-11-13T14:11:21Z", "mp", 2);

jst.FYKapitolaTaxony.addMethod("taxony", "", "accessing", 
	"\ttaxony ifNil: [" +
	"\n\t\ttaxony := ((Fytoportal data taxony podleId lookupKeys: self taxonyId) collect: [:dict | dict at: #doc])" +
	"\n\t\t\tasSortedCollection: [:a :b | a nazev <= b nazev]]." +
	"\n\t^ self filtrujVybraneSO: taxony pomoci: [:tax | tax id]",
	null, "2014-02-21T21:07:33Z", "mp", 3);

jst.FYKapitolaTaxony.addMethod("taxony", "", "accessing", 
	"\t^ taxony ifNil: [" +
	"\n\t\ttaxony := (Fytoportal data taxony podleId lookupKeys: self taxonyId) collect: [:dict | dict at: #doc]]",
	null, "2014-03-05T23:01:15Z", "mp"); //fytoportal-ior

jst.FYKapitolaTaxony.addMethod("taxonyId", "", "private", 
	"\t\"funguje pouze pro plodiny\"" +
	"\n\t^ self obsah collect: [:kap | kap linkId]",
	null, "2013-05-20T06:54:01Z", "mp", 1);

jst.FYKapitolaTaxony.addMethod("taxonyId", "", "private", 
	"\t| vyberKapitol |" +
	"\n\t\"funguje pouze pro plodiny, pro skodl. org. vraci seznam id metodik SO\"" +
	"\n\tvyberKapitol := Fytoportal data vyberKapitolPM at: self metodika id." +
	"\n\t^ self obsah inject: OrderedCollection new into: [:coll :kap |" +
	"\n\t\t((vyberKapitol jeVybrana: id) or: [vyberKapitol jeVybrana: kap linkId]) ifTrue: [" +
	"\n\t\t\tcoll add: kap linkId]. " +
	"\n\t\tcoll]",
	null, "2013-09-27T14:30:25Z", "mp", 1);

jst.FYKapitolaTaxony.addMethod("taxonyId", "", "private", 
	"\t| vyberKapitol podkap |" +
	"\n\t\"funguje pouze pro plodiny, pro skodl. org. vraci seznam id metodik SO\"" +
	"\n\tvyberKapitol := (Fytoportal data vyberKapitolPM at: self metodika id) at: id ifAbsent: true." +
	"\n\tpodkap := '' readStream." +
	"\n\t^ self obsah inject: OrderedCollection new into: [:coll :kap |" +
	"\n\t\t(vyberKapitol value or: [vyberKapitol jeVybrana: kap linkId podkap: podkap]) ifTrue: [" +
	"\n\t\t\tcoll add: kap linkId]. " +
	"\n\t\tcoll]",
	null, "2013-10-01T19:56:12Z", "mp", 1);

jst.FYKapitolaTaxony.addMethod("taxonyId", "", "private", 
	"\t| vyberKapitol podkap |" +
	"\n\t\"funguje pouze pro plodiny, pro skodl. org. vraci seznam id metodik SO\"" +
	"\n\tvyberKapitol := (Fytoportal data vyberKapitolPM at: self metodika id) at: id ifAbsent: true." +
	"\n\tpodkap := '' readStream." +
	"\n\t^ self seznamSO inject: OrderedCollection new into: [:coll :kap |" +
	"\n\t\t(vyberKapitol value or: [vyberKapitol jeVybrana: kap linkId podkap: podkap]) ifTrue: [" +
	"\n\t\t\tcoll add: kap linkId]. " +
	"\n\t\tcoll]",
	null, "2013-12-09T07:53:21Z", "mp", 1);

jst.FYKapitolaTaxony.addMethod("taxonyId", "", "private", 
	"\t\"funguje pouze pro plodiny, pro skodl. org. vraci seznam id metodik SO\"" +
	"\n\t^ self seznamSO collect: [:kap | kap linkId]",
	null, "2014-02-21T20:39:25Z", "mp"); //fytoportal-ior

jst.FYKapitolaTaxony.addMethod("filtrujVybraneSO:pomoci:", "sezn itemBlock", "private", 
	"\t| vyberKapitol podkap |" +
	"\n\tvyberKapitol := (Fytoportal data vyberKapitolPM at: self metodika id) at: id ifAbsent: true." +
	"\n\tpodkap := '' readStream." +
	"\n\t^ sezn select: [:item |" +
	"\n\t\tvyberKapitol value or: [vyberKapitol jeVybrana: (itemBlock value: item) podkap: podkap]]",
	null, "2014-02-21T20:35:56Z", "mp", 1);

jst.FYKapitolaTaxony.addMethod("filtrujVybraneSO:pomoci:", "sezn itemBlock", "private", 
	"\t| vyberKapitol podkap |" +
	"\n\tvyberKapitol := self vyberKapitolPM at: id ifAbsent: true." +
	"\n\tpodkap := '' readStream." +
	"\n\t^ sezn select: [:item |" +
	"\n\t\tvyberKapitol value or: [vyberKapitol jeVybrana: (itemBlock value: item) podkap: podkap]]",
	null, "2014-03-12T23:21:33Z", "mp"); //fytoportal-ior

jst.FYKapitolaTaxony.addMethod("seznamSO", "", "accessing", 
	"\t^ self obsah",
	null, "2013-12-09T07:52:55Z", "mp");

jst.FYKapitolaTaxony.addMethod("resetujTaxony", "", "initialization", 
	"\ttaxony := nil",
	null, "2013-09-27T07:22:15Z", "mp", 1);

jst.FYKapitolaTaxony.addMethod("resetujTaxony", "", "initialization", 
	"\ttaxony := nil." +
	"\n\tfotky := nil.",
	null, "2013-11-11T16:49:34Z", "mp", 2); //fytoportal-ior

jst.FYKapitolaTaxony.addMethod("resetujTaxony", "", "initialization", 
	"\ttaxony := nil." +
	"\n\tfotky := nil." +
	"\n\tkapitolyTisk := nil",
	null, "2014-03-05T09:21:45Z", "mp"); //fytoportal-ior

jst.FYKapitolaTaxony.addMethod("taxonyNacteny", "", "testing", 
	"\t^ taxony notNil",
	null, "2013-10-08T22:04:51Z", "mp");

jst.FYKapitolaTaxony.addMethod("jeKapitolaTaxony", "", "testing", 
	"\t^ true",
	null, "2013-10-03T11:29:14Z", "mp");

jst.FYKapitolaTaxony.addMethod("fotky", "", "accessing", 
	"\t^ fotky ifNil: [fotky:= (self fotkyList " +
	"\n\t\turlParams: {#keys. self taxonyId}; " +
	"\n\t\tqueryData) inject: Dictionary new into: [:vysl :dict | " +
	"\n\t\t\tvysl at: (dict at: #taxon) put: (dict at: #foto); yourself]]",
	null, "2013-07-05T18:55:15Z", "mp");

jst.FYKapitolaTaxony.addMethod("resetujFotky", "", "initialization", 
	"\tfotky := nil",
	null, "2013-07-05T18:57:40Z", "mp", 1);

jst.FYKapitolaTaxony.addMethod("resetujFotky", "", "initialization", 
	"\tfotky := nil." +
	"\n\tkapitolyTisk := nil",
	null, "2014-03-10T12:26:49Z", "mp"); //fytoportal-ior

jst.FYKapitolaTaxony.addMethod("fotkyNacteny", "", "testing", 
	"\t^ fotky notNil",
	null, "2013-12-17T11:17:34Z", "mp");

//*** FYKapitolaPlodiny ***

jst.FYKapitolaPlodiny.addMethod("obsah", "", "accessing", 
	"\t(self metodika jeObecnaMetodika and: [super obsah isEmpty]) ifTrue: [" +
	"\n\t\tobsah := Fytoportal data metodiky plodinySkupiny: self metodika skupina]." +
	"\n\t^ super obsah",
	null, "2013-12-10T10:19:45Z", "mp");

jst.FYKapitolaPlodiny.addMethod("seznamSO", "", "accessing", 
	"\t^ self doplnNazvySO: Fytoportal data taxony nazvyTaxonu",
	null, "2014-03-04T21:16:48Z", "mp");

jst.FYKapitolaPlodiny.addMethod("kody", "", "accessing", 
	"\t| kody |" +
	"\n\tkody := SortedCollection new." +
	"\n\tself obsah do: [:pl |" +
	"\n\t\tpl taxon kody do: [:k |" +
	"\n\t\t\tkody addUnique: k]]." +
	"\n\t^ kody",
	null, "2013-04-23T13:08:00Z", "mp", 1);

jst.FYKapitolaPlodiny.addMethod("kody", "", "accessing", 
	"\t\"vsechny kody plodin\"" +
	"\n\t^ kody ifNil: [" +
	"\n\t\tkody := (Fytoportal data plodiny kody lookupKeys: (self seznamSO collect: [:kap | kap linkId]))" +
	"\n\t\t\tinject: SortedCollection new" +
	"\n\t\t\tinto: [:coll :row | " +
	"\n\t\t\t\tcoll addUnique: row value; yourself]]",
	null, "2014-03-06T09:02:26Z", "mp"); //fytoportal-ior

jst.FYKapitolaPlodiny.addMethod("kodyVyber", "", "accessing", 
	"\t| kody vyber |" +
	"\n\tkody := SortedCollection new." +
	"\n\tvyber := (Fytoportal data vyberKapitolPM at: self metodika id) plodiny." +
	"\n\tself obsah do: [:pl | " +
	"\n\t\t(vyber value or: [(vyber at: pl linkId ifAbsent: [false]) value]) ifTrue: [" +
	"\n\t\t\tpl taxon kody do: [:k |" +
	"\n\t\t\t\tkody addUnique: k]]]." +
	"\n\t^ kody",
	null, "2014-01-11T17:53:54Z", "mp", 1);

jst.FYKapitolaPlodiny.addMethod("kodyVyber", "", "accessing", 
	"\t^ self vyberKapitolPM plodiny value " +
	"\n\t\tifTrue: [" +
	"\n\t\t\t\"kody vsech plodin\"" +
	"\n\t\t\tself kody] " +
	"\n\t\tifFalse: [" +
	"\n\t\t\t\"kody vybranych plodin\"" +
	"\n\t\t\tself vyberKapitolPM kodyPlodin]",
	null, "2014-03-06T10:09:57Z", "mp"); //fytoportal-ior

jst.FYKapitolaPlodiny.addMethod("fotkyList", "", "private", 
	"\t^ Fytoportal data fotky vybraneFotkyPlodiny",
	null, "2013-05-20T08:11:25Z", "mp");

jst.FYKapitolaPlodiny.addMethod("kapitolyTisk", "", "accessing", 
	"\t\"vsechny plodiny bez ohledu na zaklikane\"" +
	"\n\tkapitolyTisk ifNil: [" +
	"\n\t\tself taxony. \"nactu taxony, pokud jeste nebyly nacteny\"" +
	"\n\t\tself fotky. \"nactu i fotky\"" +
	"\n\t\tkapitolyTisk := self seznamSO collect: [:plod | | kap |" +
	"\n\t\t\tkap := FYKapitolaSOTisk new " +
	"\n\t\t\t\tnazev: plod nazev;" +
	"\n\t\t\t\tlink: plod linkId." +
	"\n\t\t\tkap taxony: (taxony select: [:tax | tax id = kap linkId])." +
	"\n\t\t\tfotky at: kap linkId ifPresent: [:f |" +
	"\n\t\t\t\tkap fotka: f]." +
	"\n\t\t\tkap]." +
	"\n\t\tBrowser location isPublic ifTrue: [" +
	"\n\t\t\t\"vyberu jen plodiny k publikaci, pseudo-plodiny typu 'zemedelska puda' musim skryt\"" +
	"\n\t\t\tkapitolyTisk := kapitolyTisk select: [:kap | kap taxony first publikovat]]." +
	"\n\t\tkapitolyTisk := kapitolyTisk asSortedCollection" +
	"\n\t]." +
	"\n\t^ kapitolyTisk",
	null, "2014-03-06T08:43:02Z", "mp", 1);

jst.FYKapitolaPlodiny.addMethod("kapitolyTisk", "", "accessing", 
	"\t\"vsechny plodiny bez ohledu na zaklikane\"" +
	"\n\tkapitolyTisk ifNil: [" +
	"\n\t\tself taxony. \"nactu taxony, pokud jeste nebyly nacteny\"" +
	"\n\t\tself fotky. \"nactu i fotky\"" +
	"\n\t\tkapitolyTisk := self seznamSO collect: [:kap |" +
	"\n\t\t\tkap taxony: (taxony select: [:tax | tax id = kap linkId])." +
	"\n\t\t\tfotky at: kap linkId ifPresent: [:f |" +
	"\n\t\t\t\tkap fotka: f]." +
	"\n\t\t\tkap]." +
	"\n\t\tBrowser location isPublic ifTrue: [" +
	"\n\t\t\t\"vyberu jen plodiny k publikaci, pseudo-plodiny typu 'zemedelska puda' musim skryt\"" +
	"\n\t\t\tkapitolyTisk := kapitolyTisk select: [:kap | kap taxony first publikovat]]." +
	"\n\t\tkapitolyTisk := kapitolyTisk asSortedCollection" +
	"\n\t]." +
	"\n\t^ kapitolyTisk",
	null, "2014-03-07T15:09:05Z", "mp", 1);

jst.FYKapitolaPlodiny.addMethod("kapitolyTisk", "", "accessing", 
	"\t\"vsechny plodiny bez ohledu na zaklikane\"" +
	"\n\tkapitolyTisk ifNil: [" +
	"\n\t\tself taxony. \"nactu taxony, pokud jeste nebyly nacteny\"" +
	"\n\t\tself fotky. \"nactu i fotky\"" +
	"\n\t\tkapitolyTisk := self seznamSO collect: [:kap |" +
	"\n\t\t\tkap taxony: (taxony select: [:tax | tax id = kap linkId])." +
	"\n\t\t\tfotky at: kap linkId ifPresent: [:f |" +
	"\n\t\t\t\tkap zobrazFotku: f]." +
	"\n\t\t\tkap]." +
	"\n\t\tBrowser location isPublic ifTrue: [" +
	"\n\t\t\t\"vyberu jen plodiny k publikaci, pseudo-plodiny typu 'zemedelska puda' musim skryt\"" +
	"\n\t\t\tkapitolyTisk := kapitolyTisk select: [:kap | kap taxony first publikovat]]." +
	"\n\t\tkapitolyTisk := kapitolyTisk asSortedCollection" +
	"\n\t]." +
	"\n\t^ kapitolyTisk",
	null, "2014-03-10T12:44:16Z", "mp"); //fytoportal-ior

jst.FYKapitolaPlodiny.addMethod("kapitolyTiskVyber", "", "accessing", 
	"\t\"cilovy seznam plodin, musi byt jen zaklikane\"" +
	"\n\t^ self filtrujVybraneSO: self kapitolyTisk pomoci: [:kap | kap linkId]",
	null, "2014-03-05T14:06:23Z", "mp");

jst.FYKapitolaPlodiny.addMethod("jsonKeys", "", "private", 
	"\t^ super jsonKeys copyWithout: #kody",
	null, "2014-03-06T09:00:43Z", "mp");

jst.FYKapitolaPlodiny.addMethod("pouzitiPlodiny", "", "semafor POR", 
	"\t| doplneneKody pouziti |" +
	"\n\t\"pouziti podle plodin jako parametry do semaforu, " +
	"\n\tpro vyhledani herbicidu a dalsich POR je nutno pridat pouziti pro vsechny plodiny\"" +
	"\n\tpouziti := SortedCollection new." +
	"\n\tdoplneneKody := Fytoportal data epptKody pridejNadrazene: self kodyVyber." +
	"\n\t((Fytoportal data pouzitiPOR mapovaniPro: #plodiny) lookupKeys: doplneneKody) do: [:dict |" +
	"\n\t\tpouziti addUnique: (dict at: #id)]." +
	"\n\t^ pouziti asArray",
	null, "2014-04-24T10:13:51Z", "mp");

//*** FYKapitolaSO ***

jst.FYKapitolaSO._class.addMethod("constructFromJson:", "jsonObject", "instance creation", 
	"\t| kap |" +
	"\n\tkap := super constructFromJson: jsonObject." +
	"\n\tkap obsah do: [:ea |" +
	"\n\t\tea parent: kap]." +
	"\n\t^ kap",
	null, "2013-04-23T12:43:28Z", "mp");

jst.FYKapitolaSO.addMethod("convertFromJson:instVar:", "jsonObject aString", "private", 
	"\taString = #obsah " +
	"\n\t\tifTrue: [obsah := jsonObject collect: [:ea | FYSkodlOrgPM new " +
	"\n\t\t\tcopySameFrom: (self convertFromJson: ea)]]" +
	"\n\t\tifFalse: [super convertFromJson: jsonObject instVar: aString]",
	null, "2014-03-07T12:45:41Z", "mp"); //fytoportal-ior

jst.FYKapitolaSO.addMethod("jsonKeys", "", "private", 
	"\t^ super jsonKeys copyWithout: #taxonyId",
	null, "2014-03-06T09:32:40Z", "mp");

jst.FYKapitolaSO.addMethod("obsah", "", "accessing", 
	"\t^ zmeny " +
	"\n\t\tifNil: [obsah asCollection]" +
	"\n\t\tifNotNil: [\"priznak #vyrazena se uplatni jen u zmen\"" +
	"\n\t\t\tzmeny asCollection select: [:kap | kap jeVyrazena not]]",
	null, "2013-03-05T08:40:29Z", "mp");

jst.FYKapitolaSO.addMethod("seznamSO", "", "accessing", 
	"\t^ self doplnNazvySO: Fytoportal data metodiky nazvyMetodik",
	null, "2014-03-04T21:04:55Z", "mp");

jst.FYKapitolaSO.addMethod("taxonyId", "", "private", 
	"\t\"super taxonyId totiz vraci odkazy na metodiky SO\"" +
	"\n\t^ (Fytoportal data taxony podleMetodikSO lookupKeys: super taxonyId) collect: [:dict | dict at: #value]",
	null, "2013-05-20T07:07:34Z", "mp", 1);

jst.FYKapitolaSO.addMethod("taxonyId", "", "private", 
	"\t| vyberSO vyberPlod kodyPlod |" +
	"\n\t\"super taxonyId vraci odkazy na metodiky SO, nejdrive musim zjistit id odpovidajicich taxonu\"" +
	"\n\tvyberSO := (Fytoportal data taxony podleMetodikSO lookupKeys: super taxonyId) collect: [:dict | dict at: #value]." +
	"\n\tvyberPlod := (Fytoportal data vyberKapitolPM at: self metodika id) at: #plodiny ifAbsent: nil." +
	"\n\tvyberPlod value ifTrue: [" +
	"\n\t\t\"pro vsechny plodiny vracim vsechny SO\"" +
	"\n\t\t^ vyberSO]." +
	"\n\tself metodika plodiny obsah size = 1 ifTrue: [" +
	"\n\t\t\"jedina plodina\"" +
	"\n\t\t^ (vyberPlod at: (self metodika plodiny obsah first linkId) ifAbsent: [false]) value " +
	"\n\t\t\tifTrue: [vyberSO] " +
	"\n\t\t\tifFalse: #()]." +
	"\n\t\"kody vybranych plodin vcetne nadrazenych\"" +
	"\n\tvyberPlod := vyberPlod keys select: [:id | (vyberPlod at: id) value]." +
	"\n\tkodyPlod := (Fytoportal data plodiny kody lookupKeys: vyberPlod) collect: [:dict | dict at: #value]." +
	"\n\tkodyPlod := Fytoportal data epptKody pridejNadrazene: kodyPlod." +
	"\n\t\"kody hostitelu vybranych SO\"" +
	"\n\t^ (Fytoportal data skodlOrg hostitele lookupKeys: vyberSO) " +
	"\n\t\tselect: [:dict |" +
	"\n\t\t\t\"kody hostitelskych plodin pro dany SO\"" +
	"\n\t\t\t(Fytoportal data plodiny kody lookupKeys: (dict at: #value)) anySatisfy: [:kod | " +
	"\n\t\t\t\tkodyPlod includes: kod]]" +
	"\n\t\tthenCollect: [:dict | " +
	"\n\t\t\tdict at: #id]",
	null, "2013-10-08T06:46:02Z", "mp", 1);

jst.FYKapitolaSO.addMethod("taxonyId", "", "accessing", 
	"\t| vyberSO vyberPlod kodyPlod |" +
	"\n\t\"zavisi navic i na vyberu plodin\"" +
	"\n\ttaxonyId ifNotNil: [" +
	"\n\t\t^ taxonyId]." +
	"\n\t\"super taxonyId vraci odkazy na metodiky SO, nejdrive musim zjistit id odpovidajicich taxonu\"" +
	"\n\tvyberSO := (Fytoportal data taxony podleMetodikSO lookupKeys: super taxonyId) collect: [:dict | dict at: #value]." +
	"\n\tvyberPlod := (Fytoportal data vyberKapitolPM at: self metodika id) at: #plodiny ifAbsent: nil." +
	"\n\tvyberPlod value ifTrue: [" +
	"\n\t\t\"pro vsechny plodiny vracim vsechny SO\"" +
	"\n\t\t^ taxonyId := vyberSO]." +
	"\n\tself metodika plodiny obsah size = 1 ifTrue: [" +
	"\n\t\t\"jedina plodina\"" +
	"\n\t\t^ taxonyId := (vyberPlod at: (self metodika plodiny obsah first linkId) ifAbsent: [false]) value " +
	"\n\t\t\tifTrue: [vyberSO] " +
	"\n\t\t\tifFalse: #()]." +
	"\n\t\"kody vybranych plodin vcetne nadrazenych\"" +
	"\n\tvyberPlod := vyberPlod keys select: [:pl | (vyberPlod at: pl) value]." +
	"\n\tkodyPlod := (Fytoportal data plodiny kody lookupKeys: vyberPlod) collect: [:dict | dict at: #value]." +
	"\n\tkodyPlod := Fytoportal data epptKody pridejNadrazene: kodyPlod." +
	"\n\t\"nactu id vybranych plodin znovu (pro jednoduchost), tentokrat vcetne nadrazenych\"" +
	"\n\tvyberPlod := (Fytoportal data plodiny podleKodu lookupKeys: kodyPlod) collect: [:dict | dict at: #id]." +
	"\n\t\"kody hostitelu vybranych SO\"" +
	"\n\t^ taxonyId := (Fytoportal data skodlOrg hostitele lookupKeys: vyberSO) " +
	"\n\t\tselect: [:dict |" +
	"\n\t\t\t(dict at: #value) anySatisfy: [:pl | vyberPlod includes: pl]]" +
	"\n\t\tthenCollect: [:dict | " +
	"\n\t\t\tdict at: #id]",
	null, "2013-10-09T09:19:27Z", "mp", 1);

jst.FYKapitolaSO.addMethod("taxonyId", "", "accessing", 
	"\t^ self metodikyTaxonyId collect: [:asc | asc value]",
	null, "2014-02-17T14:48:56Z", "mp", 1);

jst.FYKapitolaSO.addMethod("taxonyId", "", "accessing", 
	"\t\"metoda ponechana z duvodu zpetne kompatibility\"" +
	"\n\t^ self metodikyTaxonyId collect: [:asc | asc value]",
	null, "2014-02-21T12:11:00Z", "mp", 1);

jst.FYKapitolaSO.addMethod("taxonyId", "", "accessing", 
	"\ttaxonyId ifNil: [" +
	"\n\t\t\"nactu taxony, stejne je budu potrebovat\"" +
	"\n\t\tself taxony]." +
	"\n\t^ taxonyId",
	null, "2014-03-05T22:52:31Z", "mp"); //fytoportal-ior

jst.FYKapitolaSO.addMethod("taxony", "", "accessing", 
	"\t^ self metodikyTaxony collect: [:asc | asc value]",
	null, "2014-02-17T16:11:20Z", "mp", 1);

jst.FYKapitolaSO.addMethod("taxony", "", "accessing", 
	"\ttaxony ifNil: [" +
	"\n\t\t\"taxony podle metodik, jeden taxon se muze opakovat, zatim jen id\"" +
	"\n\t\ttaxony := (Fytoportal data taxony podleMetodikSO lookupKeys: super taxonyId) collect: [:row | " +
	"\n\t\t\trow key -> row value]." +
	"\n\t\t\"distinct seznam id taxonu\"" +
	"\n\t\ttaxonyId := taxony inject: SortedCollection new into: [:coll :asc |" +
	"\n\t\t\tcoll addUnique: asc value; yourself]." +
	"\n\t\t\"nactu taxony podle taxonyId a doplnim je namisto id\"" +
	"\n\t\t(Fytoportal data taxony podleId lookupKeys: taxonyId) do: [:row |" +
	"\n\t\t\t(taxony select: [:asc | " +
	"\n\t\t\t\tasc value isString and: [asc value = row id]]) do: [:asc | " +
	"\n\t\t\t\t\tasc value: row doc]]]." +
	"\n\t^ taxony",
	null, "2014-03-06T14:16:03Z", "mp"); //fytoportal-ior

jst.FYKapitolaSO.addMethod("fotkyList", "", "private", 
	"\t^ Fytoportal data fotky vybraneFotkySkodlOrg",
	null, "2013-05-20T08:12:12Z", "mp");

jst.FYKapitolaSO.addMethod("jeKapitolaSO", "", "testing", 
	"\t^ true",
	null, "2013-10-01T14:25:41Z", "mp");

jst.FYKapitolaSO.addMethod("resetujTaxony", "", "initialization", 
	"\tsuper resetujTaxony." +
	"\n\ttaxonyId := nil",
	null, "2013-10-09T09:20:27Z", "mp");

/*
jst.FYKapitolaSO.addMethod("seznamSO", "", "accessing", 
	"\t^ self metodika obecnaMetodika " +
	"\n\t\tifNotNilDo: [:met | (met at: id) obsah ifNotEmptyDo: [:sezn |" +
	"\n\t\t\t\"pridam SO z obecne metodiky, zatim nehlidam duplicity\"" +
	"\n\t\t\tsezn copyWithAll: self obsah]]" +
	"\n\t\tifNil: [self obsah]",
	null, "2013-12-09T08:05:45Z", "mp", 1);

jst.FYKapitolaSO.addMethod("seznamSO", "", "accessing", 
	"\t^ self metodika obecnaMetodika " +
	"\n\t\tifNotNilDo: [:met | (met at: id) obsah ifNotEmptyDo: [:sezn | | vysl |" +
	"\n\t\t\t\"pridam SO z obecne metodiky\"" +
	"\n\t\t\tvysl := OrderedCollection withAll: self obsah." +
	"\n\t\t\tsezn do: [:kap |" +
	"\n\t\t\t\t(vysl noneSatisfy: [:k | k linkId = kap linkId]) ifTrue: [" +
	"\n\t\t\t\t\t\"kapitolu z obecne metodiky preradim do teto metodiky\"" +
	"\n\t\t\t\t\tvysl add: (kap copy parent: self)]]." +
	"\n\t\t\tvysl]]" +
	"\n\t\tifNil: [self obsah]",
	null, "2013-12-09T16:38:35Z", "mp", 1);

jst.FYKapitolaSO.addMethod("seznamSO", "", "accessing", 
	"\t^ self metodika obecnaMetodika " +
	"\n\t\tifNotNilDo: [:met | (met at: id) obsah ifNotEmptyDo: [:sezn | | vysl |" +
	"\n\t\t\t\"pridam SO z obecne metodiky\"" +
	"\n\t\t\tvysl := OrderedCollection withAll: self obsah." +
	"\n\t\t\tsezn do: [:kap |" +
	"\n\t\t\t\t(vysl noneSatisfy: [:k | k linkId = kap linkId]) ifTrue: [" +
	"\n\t\t\t\t\t\"kapitolu z obecne metodiky preradim do teto metodiky\"" +
	"\n\t\t\t\t\tvysl add: (kap copy parent: self)]]." +
	"\n\t\t\tvysl] ifEmpty: [self obsah]]" +
	"\n\t\tifNil: [self obsah]",
	null, "2013-12-10T16:08:42Z", "mp", 1);

jst.FYKapitolaSO.addMethod("seznamSO", "", "accessing", 
	"\t| sezn |" +
	"\n\t\"obsah kapitoly prebije obsah obecne metodiky\"" +
	"\n\tsezn := self obsah." +
	"\n\tsezn ifEmpty: [" +
	"\n\t\tself metodika obecnaMetodika ifNotNilDo: [:met | " +
	"\n\t\t\tsezn := (met at: id) obsah]]." +
	"\n\t^ sezn",
	null, "2014-02-21T22:18:16Z", "mp"); //fytoportal-ior
*/

jst.FYKapitolaSO.addMethod("najdiKapitoluSO:", "soId", "accessing", 
	"\t^ self obsah detect: [:kap | kap id = soId] ifNone: [" +
	"\n\t\tself metodika obecnaMetodika ifNotNilDo: [:met | " +
	"\n\t\t\t(met at: id) obsah detect: [:kap | kap id = soId] ifNone: nil]]",
	null, "2013-12-09T08:08:42Z", "mp", 1);

jst.FYKapitolaSO.addMethod("najdiKapitoluSO:", "soId", "accessing", 
	"\t^ self obsah detect: [:kap | kap id = soId] ifNone: [" +
	"\n\t\tself metodika obecnaMetodika ifNotNilDo: [:met | " +
	"\n\t\t\t((met at: id) obsah detect: [:kap | kap id = soId] ifNone: nil) ifNotNilDo: [:kap |" +
	"\n\t\t\t\tkap copy parent: self]]]",
	null, "2013-12-09T16:12:33Z", "mp", 1);

jst.FYKapitolaSO.addMethod("najdiKapitoluSO:", "soId", "accessing", 
	"\t^ self kapitolyTisk detect: [:kap | kap id = soId] ifNone: [" +
	"\n\t\tself metodika obecnaMetodika ifNotNilDo: [:met | " +
	"\n\t\t\t((met at: id) kapitolyTisk detect: [:kap | kap id = soId] ifNone: nil) ifNotNilDo: [:kap |" +
	"\n\t\t\t\tkap copy parent: self]]]",
	null, "2014-03-06T21:18:38Z", "mp"); //fytoportal-ior

jst.FYKapitolaSO.addMethod("fotky", "", "private", 
	"\t^ fotky ifNil: [ | fotkySO nahledy |" +
	"\n\t\t\"nejprve id fotek podle id metodikSO\"" +
	"\n\t\tfotkySO := Fytoportal data metodiky fotky lookupKeys: (self obsah collect: [:ea | ea linkId])." +
	"\n\t\t\"pouze fotky s nejvyssi prioritou, klicem je id metodiky (row id), hodnotou row value\"" +
	"\n\t\tfotkySO := fotkySO inject: Dictionary new" +
	"\n\t\t\tinto: [:dict :row | " +
	"\n\t\t\t\t(row value at: #priorita) < ((dict at: row id ifAbsentPut: [row value]) at: #priorita) ifTrue: [" +
	"\n\t\t\t\t\tdict at: row id put: row value]." +
	"\n\t\t\t\tdict]." +
	"\n\t\t\"nactu nahledy fotek podle nalezenych id\"" +
	"\n\t\tnahledy := (Fytoportal data fotky nahledyFotekSO lookupKeys: " +
	"\n\t\t\t(fotkySO values collect: [:dict | dict at: #fotka])) inject: Dictionary new into: [:dict :row |" +
	"\n\t\t\t\tdict at: row id put: row value; yourself]." +
	"\n\t\t\"dosadim nahledy fotek \"" +
	"\n\t\tfotkySO keysAndValuesDo: [:key :dict |" +
	"\n\t\t\tfotkySO at: key put: (nahledy at: (dict at: #fotka))]." +
	"\n\t\tfotkySO size < self obsah size ifTrue: [" +
	"\n\t\t\t\"doplnim fotky nalezene starou metodou, tj. podle taxonu\"" +
	"\n\t\t\tsuper fotky." +
	"\n\t\t\tself obsah do: [:kap | fotkySO at: kap linkId ifAbsent: [" +
	"\n\t\t\t\t(taxony detect: [:asc | asc key =kap linkId] ifNone: nil) ifNotNilDo: [:asc |" +
	"\n\t\t\t\t\tfotky at: asc value id ifPresent: [:f |" +
	"\n\t\t\t\t\t\tfotkySO at: kap linkId put: f]]]]" +
	"\n\t\t]." +
	"\n\t\t\"hotovo\"" +
	"\n\t\tfotky := fotkySO." +
	"\n\t]",
	null, "2014-03-06T14:28:53Z", "mp", 1);

jst.FYKapitolaSO.addMethod("fotky", "", "private", 
	"\t^ fotky ifNil: [ | fotkySO nahledy met fotkaOk |" +
	"\n\t\t\"nejprve id fotek podle id metodikSO\"" +
	"\n\t\tfotkySO := Fytoportal data metodiky fotky lookupKeys: (self obsah collect: [:ea | ea linkId])." +
	"\n\t\tmet := self metodika." +
	"\n\t\tfotkaOk := [:dict | | pr m |" +
	"\n\t\t\tpr := dict at: #priorita." +
	"\n\t\t\tm := dict at: #metodika." +
	"\n\t\t\t\"fotky s prioritou 1 se tykaji jen dane metodiky, s prioritou 2 jen dane skupiny metodik\"" +
	"\n\t\t\t(pr = 1 and: [met id = m]) or: [pr = 2 and: [met maObecnouMetodiku: m]] or: [pr = 3]" +
	"\n\t\t]." +
	"\n\t\t\"pouze fotky s nejvyssi prioritou, klicem je id metodiky SO (row key), hodnotou row value\"" +
	"\n\t\tfotkySO := fotkySO inject: Dictionary new" +
	"\n\t\t\tinto: [:dict :row | | tmp |" +
	"\n\t\t\t\ttmp := dict at: row key ifAbsent: nil." +
	"\n\t\t\t\t(tmp isNil and: [fotkaOk value: row value]) ifTrue: [" +
	"\n\t\t\t\t\t\"vlozim poprve\"" +
	"\n\t\t\t\t\tdict at: row key put: row value]." +
	"\n\t\t\t\t\"prebiju existujici fotku\"" +
	"\n\t\t\t\t(tmp notNil and: [fotkaOk value: row value] and: [(row value at: #priorita) < (tmp at: #priorita)]) ifTrue: [" +
	"\n\t\t\t\t\tdict at: row key put: row value]." +
	"\n\t\t\t\tdict]." +
	"\n\t\t\"nactu nahledy fotek podle nalezenych id\"" +
	"\n\t\tnahledy := (Fytoportal data fotky nahledyFotekSO lookupKeys: " +
	"\n\t\t\t(fotkySO values collect: [:dict | dict at: #fotka])) inject: Dictionary new into: [:dict :row |" +
	"\n\t\t\t\tdict at: row id put: row value; yourself]." +
	"\n\t\t\"dosadim nahledy fotek \"" +
	"\n\t\tfotkySO keysAndValuesDo: [:key :dict |" +
	"\n\t\t\tfotkySO at: key put: (nahledy at: (dict at: #fotka))]." +
	"\n\t\tfotkySO size < self obsah size ifTrue: [" +
	"\n\t\t\t\"doplnim fotky nalezene starou metodou, tj. podle taxonu\"" +
	"\n\t\t\tsuper fotky." +
	"\n\t\t\tself obsah do: [:kap | fotkySO at: kap linkId ifAbsent: [" +
	"\n\t\t\t\t(taxony detect: [:asc | asc key =kap linkId] ifNone: nil) ifNotNilDo: [:asc |" +
	"\n\t\t\t\t\tfotky at: asc value id ifPresent: [:f |" +
	"\n\t\t\t\t\t\tfotkySO at: kap linkId put: f]]]]" +
	"\n\t\t]." +
	"\n\t\t\"hotovo\"" +
	"\n\t\tfotky := fotkySO." +
	"\n\t]",
	null, "2014-03-14T14:30:35Z", "mp", 2);

jst.FYKapitolaSO.addMethod("fotky", "", "private", 
	"\t^ fotky ifNil: [ | fotkySO nahledy met fotkaOk |" +
	"\n\t\t\"nejprve id fotek podle id metodikSO\"" +
	"\n\t\tfotkySO := Fytoportal data metodiky fotky lookupKeys: (self obsah collect: [:ea | ea linkId])." +
	"\n\t\tmet := self metodika." +
	"\n\t\tfotkaOk := [:dict | | pr m |" +
	"\n\t\t\tpr := dict at: #priorita." +
	"\n\t\t\tm := dict at: #metodika ifAbsent: 'xxx'." +
	"\n\t\t\t\"fotky s prioritou 1 se tykaji jen dane metodiky, s prioritou 2 jen dane skupiny metodik\"" +
	"\n\t\t\t(pr = 1 and: [met id = m]) or: [pr = 2 and: [met maObecnouMetodiku: m]] or: [pr = 3]" +
	"\n\t\t]." +
	"\n\t\t\"pouze fotky s nejvyssi prioritou, klicem je id metodiky SO (row key), hodnotou row value\"" +
	"\n\t\tfotkySO := fotkySO inject: Dictionary new" +
	"\n\t\t\tinto: [:dict :row | | tmp |" +
	"\n\t\t\t\ttmp := dict at: row key ifAbsent: nil." +
	"\n\t\t\t\t(tmp isNil and: [fotkaOk value: row value]) ifTrue: [" +
	"\n\t\t\t\t\t\"vlozim poprve\"" +
	"\n\t\t\t\t\tdict at: row key put: row value]." +
	"\n\t\t\t\t\"prebiju existujici fotku\"" +
	"\n\t\t\t\t(tmp notNil and: [fotkaOk value: row value] and: [(row value at: #priorita) < (tmp at: #priorita)]) ifTrue: [" +
	"\n\t\t\t\t\tdict at: row key put: row value]." +
	"\n\t\t\t\tdict]." +
	"\n\t\t\"nactu nahledy fotek podle nalezenych id\"" +
	"\n\t\tnahledy := (Fytoportal data fotky nahledyFotekSO lookupKeys: " +
	"\n\t\t\t(fotkySO values collect: [:dict | dict at: #fotka])) inject: Dictionary new into: [:dict :row |" +
	"\n\t\t\t\tdict at: row id put: row value; yourself]." +
	"\n\t\t\"dosadim nahledy fotek \"" +
	"\n\t\tfotkySO keysAndValuesDo: [:key :dict |" +
	"\n\t\t\tfotkySO at: key put: (nahledy at: (dict at: #fotka))]." +
	"\n\t\tfotkySO size < self obsah size ifTrue: [" +
	"\n\t\t\t\"doplnim fotky nalezene starou metodou, tj. podle taxonu\"" +
	"\n\t\t\tsuper fotky." +
	"\n\t\t\tself obsah do: [:kap | fotkySO at: kap linkId ifAbsent: [" +
	"\n\t\t\t\t(taxony detect: [:asc | asc key =kap linkId] ifNone: nil) ifNotNilDo: [:asc |" +
	"\n\t\t\t\t\tfotky at: asc value id ifPresent: [:f |" +
	"\n\t\t\t\t\t\tfotkySO at: kap linkId put: f]]]]" +
	"\n\t\t]." +
	"\n\t\t\"hotovo\"" +
	"\n\t\tfotky := fotkySO." +
	"\n\t]",
	null, "2014-03-16T20:51:45Z", "mp"); //fytoportal-ior

jst.FYKapitolaSO.addMethod("kapitolyTisk", "", "accessing", 
	"\t\"vsechny SO, bez ohledu na zaklikane nebo na vybrane plodiny\"" +
	"\n\t^ kapitolyTisk ifNil: [" +
	"\n\t\tself taxony. \"nactu taxony, pokud jeste nebyly nacteny\"" +
	"\n\t\tself fotky. \"nactu i fotky\"" +
	"\n\t\tkapitolyTisk := self seznamSO collect: [:ea | | kap |" +
	"\n\t\t\tkap := FYKapitolaSOTisk new copySameFrom: ea." +
	"\n\t\t\tkap taxony: (taxony select: [:asc | asc key = kap linkId] thenCollect: [:asc | asc value])." +
	"\n\t\t\tfotky at: kap linkId ifPresent: [:f |" +
	"\n\t\t\t\tkap fotka: f]." +
	"\n\t\t\tkap]." +
	"\n\t\tkapitolyTisk := kapitolyTisk asSortedCollection" +
	"\n\t]",
	null, "2014-03-05T23:04:07Z", "mp", 1);

jst.FYKapitolaSO.addMethod("kapitolyTisk", "", "accessing", 
	"\t\"vsechny SO, bez ohledu na zaklikane nebo na vybrane plodiny\"" +
	"\n\t^ kapitolyTisk ifNil: [" +
	"\n\t\tself taxony. \"nactu taxony, pokud jeste nebyly nacteny\"" +
	"\n\t\tself fotky. \"nactu i fotky\"" +
	"\n\t\tkapitolyTisk := self seznamSO collect: [:kap |" +
	"\n\t\t\tkap taxony: (taxony select: [:asc | asc key = kap linkId] thenCollect: [:asc | asc value])." +
	"\n\t\t\tfotky at: kap linkId ifPresent: [:f |" +
	"\n\t\t\t\tkap fotka: f]." +
	"\n\t\t\tkap]." +
	"\n\t\tkapitolyTisk := kapitolyTisk asSortedCollection" +
	"\n\t]",
	null, "2014-03-07T15:01:43Z", "mp", 2);

jst.FYKapitolaSO.addMethod("kapitolyTisk", "", "accessing", 
	"\t\"vsechny SO, bez ohledu na zaklikane nebo na vybrane plodiny\"" +
	"\n\t^ kapitolyTisk ifNil: [" +
	"\n\t\tself taxony. \"nactu taxony, pokud jeste nebyly nacteny\"" +
	"\n\t\tself fotky. \"nactu i fotky\"" +
	"\n\t\tkapitolyTisk := self seznamSO collect: [:kap |" +
	"\n\t\t\tkap taxony: (taxony select: [:asc | asc key = kap linkId] thenCollect: [:asc | asc value])." +
	"\n\t\t\tfotky at: kap linkId ifPresent: [:f |" +
	"\n\t\t\t\tkap zobrazFotku: f]." +
	"\n\t\t\tkap]." +
	"\n\t\tkapitolyTisk := kapitolyTisk asSortedCollection" +
	"\n\t]",
	null, "2014-03-10T12:44:41Z", "mp"); //fytoportal-ior

jst.FYKapitolaSO.addMethod("kapitolyTiskPodlePlodin", "", "accessing", 
	"\t| sezn vyber |" +
	"\n\t\"seznam SO bude dynamicky filtrovan podle vyberu plodin\"" +
	"\n\tsezn := self kapitolyTisk." +
	"\n\tvyber := self vyberKapitolPM." +
	"\n\t(vyber plodiny value not and: [self metodika plodiny obsah size > 1]) ifTrue: [" +
	"\n\t\t| vyberPlod |" +
	"\n\t\t\"filtruji podle zaklikanych plodin vcetne nadrazenych\"" +
	"\n\t\tvyberPlod := vyber plodinyVcetneNadraz." +
	"\n\t\tsezn := sezn select: [:kap | kap taxony anySatisfy: [:tax |" +
	"\n\t\t\ttax hostitele anySatisfy: [:pl | vyberPlod includes: pl]]]" +
	"\n\t]." +
	"\n\t^ sezn",
	null, "2014-03-06T13:36:28Z", "mp");

jst.FYKapitolaSO.addMethod("kapitolyTiskVyber", "", "accessing", 
	"\t\"cilovy seznam, musi byt podle vyberu plodin a jen zaklikane\"" +
	"\n\t^ self filtrujVybraneSO: self kapitolyTiskPodlePlodin pomoci: [:kap | kap linkId]",
	null, "2014-03-06T13:37:47Z", "mp");

//*** FYKapitolaPOR ***

/*
jst.FYKapitolaPOR.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tgridHeight := 300",
	null, "2013-04-22T21:16:29Z", "mp");
*/

jst.FYKapitolaPOR.addMethod("isReadonly", "", "testing", 
	"\t^ true",
	null, "2013-04-12T22:00:29Z", "mp");

jst.FYKapitolaPOR.addMethod("jeKapitolaPOR", "", "testing", 
	"\t^ true",
	null, "2014-04-23T20:33:33Z", "mp");

/*
jst.FYKapitolaPOR.addMethod("createGrid", "", "private", 
	"\t^ ExtGridPanel new" +
	"\n\t\tstore: (ExtArrayStore new" +
	"\n\t\t\tautoDestroy: true;" +
	"\n\t\t\tfields: self storeFields);" +
	"\n\t\tcolumns: self gridColumns;" +
	"\n\t\tanchor: '100%';" +
	"\n\t\theight: gridHeight",
	null, "2013-04-22T21:22:48Z", "mp");

jst.FYKapitolaPOR.addMethod("createGrid", "", "accessing", 
	"\t^ ExtGridPanel new" +
	"\n\t\tstore: (ExtArrayStore new" +
	"\n\t\t\tautoDestroy: true;" +
	"\n\t\t\tfields: self storeFields);" +
	"\n\t\tcolumns: self gridColumns;" +
	"\n\t\tanchor: '100%';" +
	"\n\t\theight: 300",
	null, "2013-04-29T09:11:12Z", "mp");

jst.FYKapitolaPOR.addMethod("storeFields", "", "private", 
	"\t^  { " +
	"\n\t\tExtField new name: #obchJmeno; convert: [:v :prip | prip obchJmeno]." +
	"\n\t\tExtField new name: #ucinneLatky; convert: [:v :prip | prip ucinneLatky]" +
	"\n\t}",
	null, "2013-04-20T22:25:31Z", "mp");

jst.FYKapitolaPOR.addMethod("gridColumns", "", "private", 
	"\t^ {" +
	"\n\t\tExtColumn new header: 'Přípravek'; dataIndex: #obchJmeno; width: 180; isSortable: true." +
	"\n\t\tExtColumn new header: 'Účinná látka'; dataIndex: #ucinneLatky; width: 180; isSortable: true." +
	"\n\t}",
	null, "2013-04-20T22:27:18Z", "mp");


jst.FYKapitolaPOR.addMethod("renderContentOn:", "html", "rendering", 
	"\thtml div " +
	"\n\t\tclass: 'kapitola'; " +
	"\n\t\twith: [" +
	"\n\t\t\thtml div " +
	"\n\t\t\t\tclass: 'nazev', self uroven asString;  " +
	"\n\t\t\t\twith: self nazev." +
	"\n\t\t\thtml div " +
	"\n\t\t\t\tclass: 'obsah'; " +
	"\n\t\t\t\tid: (gridId := ExtCore current nextId);" +
	"\n\t\t\t\tstyle: ('height: {1}px; background: url(''images/loader-flower-blue.gif'') no-repeat center center' " +
	"\n\t\t\t\t\tformat: {gridHeight})" +
	"\n\t\t]." +
	"\n\tself nactiSemafor",
	null, "2013-04-22T21:17:46Z", "mp");

jst.FYKapitolaPOR.addMethod("renderTextOn:", "html", "rendering", 
	"\thtml div " +
	"\n\t\tclass: 'obsah'; " +
	"\n\t\tid: (gridId := ExtCore current nextId);" +
	"\n\t\tstyle: ('height: {1}px; background: url(''images/loader-flower-blue.gif'') no-repeat center center' format: {gridHeight})." +
	"\n\tself nactiSemafor",
	null, "2013-04-23T08:04:02Z", "mp");

jst.FYKapitolaPOR.addMethod("renderTextOn:", "html", "rendering", 
	"\thtml div " +
	"\n\t\tclass: 'obsah'; " +
	"\n\t\tid: (gridId ifNil: [gridId := ExtCore current nextId]);" +
	"\n\t\tstyle: ('height: {1}px; background: url(''images/loader-flower-blue.gif'') no-repeat center center' format: {gridHeight})." +
	"\n\tself metodika semaforPOR" +
	"\n\t\tifNotNilDo: [:data |" +
	"\n\t\t\t[self renderSemafor: data] delayed: 100]" +
	"\n\t\tifNil: [self nactiSemafor]",
	null, "2013-04-29T07:18:40Z", "mp");

jst.FYKapitolaPOR.addMethod("renderSemafor:", "data", "rendering", 
	"\t| gr |" +
	"\n\tgr := self createGrid." +
	"\n\tgr store loadData: data." +
	"\n\tgr renderTo: gridId; show",
	null, "2013-04-28T21:40:31Z", "mp");

jst.FYKapitolaPOR.addMethod("nactiSemafor", "", "private", 
	"\t| params |" +
	"\n\tparams := Dictionary new" +
	"\n\t\tat: #skodlorg put: self metodika taxon kody;" +
	"\n\t\tyourself." +
	"\n\tself metodika plodiny ifNotNilDo: [:pl | " +
	"\n\t\tparams at: #plodiny put: pl kody]." +
	"\n\t^ Fytoportal data pripravky nactiSemaforPro: params pak: [:data | " +
	"\n\t\t| gr |" +
	"\n\t\tgr := self createGrid." +
	"\n\t\tgr store loadData: data." +
	"\n\t\tgr renderTo: gridId; show]",
	null, "2013-04-23T13:47:14Z", "mp");

jst.FYKapitolaPOR.addMethod("nactiSemafor", "", "private", 
	"\t| params |" +
	"\n\tparams := Dictionary new" +
	"\n\t\tat: #skodlorg put: self metodika taxon kody;" +
	"\n\t\tyourself." +
	"\n\tself metodika plodiny ifNotNilDo: [:pl | " +
	"\n\t\tparams at: #plodiny put: pl kody]." +
	"\n\t^ Fytoportal data pripravky nactiSemaforPro: params pak: [:data | " +
	"\n\t\tself metodika semaforPOR: data." +
	"\n\t\tself renderSemafor: data]",
	null, "2013-04-28T21:40:48Z", "mp");
*/

/*
jst.FYKapitolaPOR.addMethod("nactiSemaforPro:pak:", "params aBlock", "accessing", 
	"\t| mapovani list ochrana viewName |" +
	"\n\t\"novy pristup - seznam skod.lorg. se preda do view semafor jako keys, " +
	"\n\tv listu vyber-plodiny se uz jen vybira podle plodin, pokud jsou zadany \"" +
	"\n\tmapovani := Dictionary new." +
	"\n\tochrana := params includesKey: #skodlorg." +
	"\n\tparams pairsDo: [:typ :kody | | sezn |" +
	"\n\t\tsezn := SortedCollection new." +
	"\n\t\t((Fytoportal data pouzitiPOR mapovaniPro: typ)" +
	"\n\t \t\tlookupKeys: (Fytoportal data epptKody pridejNadrazene: kody asCollection)) do: [:dict |" +
	"\n\t\t\t\tsezn addUnique: (dict at: #id)]." +
	"\n\t\tmapovani " +
	"\n\t\t\tat: (typ = #skodlorg | ochrana not ifTrue: #keys ifFalse: typ) " +
	"\n\t\t\tput: sezn asArray" +
	"\n\t]." +
	"\n\tviewName := #semafor." +
	"\n\tochrana ifFalse: [viewName := viewName, " +
	"\n\t\t((self id startsWith: #plevele) ifTrue: ['-herbicidy'] ifFalse: ['-mimoPrip'])]." +
	"\n\tlist := (Fytoportal data pripravky doc viewNamed: viewName) listNamed: 'vyber-plodiny'." +
	"\n\tlist urlParams: mapovani." +
	"\n\t^ aBlock " +
	"\n\t\tifNotNil: [" +
	"\n\t\t\tlist asyncQueryDo:  [:data :req | " +
	"\n\t\t\t\taBlock value: (self pripravSemaforData: data)]]" +
	"\n\t\tifNil: [\"do tisku - klasicky vraci data\"" +
	"\n\t\t\tself pripravSemaforData: list queryData]",
	null, "2014-03-18T21:17:08Z", "mp", 1);

jst.FYKapitolaPOR.addMethod("nactiSemaforPro:pak:", "params aBlock", "accessing", 
	"\t| mapovani list ochrana viewName |" +
	"\n\t\"novy pristup - seznam skod.lorg. se preda do view semafor jako keys, " +
	"\n\tv listu vyber-plodiny se uz jen vybira podle plodin, pokud jsou zadany \"" +
	"\n\tmapovani := Dictionary new." +
	"\n\tochrana := params includesKey: #skodlorg." +
	"\n\tparams pairsDo: [:typ :kody | | sezn doplneneKody |" +
	"\n\t\tsezn := SortedCollection new." +
	"\n\t\tdoplneneKody := Fytoportal data epptKody pridejNadrazene: kody asCollection." +
	"\n\t\tochrana not & (typ = #plodiny) ifTrue: [" +
	"\n\t\t\t\"najde pouziti 'vsechny plodiny'\"" +
	"\n\t\t\tdoplneneKody := doplneneKody copyWith: '3CCCC']." +
	"\n\t\t((Fytoportal data pouzitiPOR mapovaniPro: typ) lookupKeys: doplneneKody) do: [:dict |" +
	"\n\t\t\tsezn addUnique: (dict at: #id)]." +
	"\n\t\tmapovani " +
	"\n\t\t\tat: (typ = #skodlorg | ochrana not ifTrue: #keys ifFalse: typ) " +
	"\n\t\t\tput: sezn asArray" +
	"\n\t]." +
	"\n\tviewName := #semafor." +
	"\n\tochrana ifFalse: [viewName := viewName, " +
	"\n\t\t((self id startsWith: #plevele) ifTrue: ['-herbicidy'] ifFalse: ['-mimoPrip'])]." +
	"\n\tlist := (Fytoportal data pripravky doc viewNamed: viewName) listNamed: 'vyber-plodiny'." +
	"\n\tlist urlParams: mapovani." +
	"\n\t^ aBlock " +
	"\n\t\tifNotNil: [" +
	"\n\t\t\tlist asyncQueryDo:  [:data :req | " +
	"\n\t\t\t\taBlock value: (self pripravSemaforData: data)]]" +
	"\n\t\tifNil: [\"do tisku - klasicky vraci data\"" +
	"\n\t\t\tself pripravSemaforData: list queryData]",
	null, "2014-03-19T10:49:21Z", "mp", 1);

jst.FYKapitolaPOR.addMethod("nactiSemaforPro:pak:", "params aBlock", "accessing", 
	"\t| mapovani list ochrana viewName filtr |" +
	"\n\t\"novy pristup - seznam skod.lorg. se preda do view semafor jako keys, " +
	"\n\tv listu vyber-plodiny se uz jen vybira podle plodin, pokud jsou zadany \"" +
	"\n\tmapovani := Dictionary new." +
	"\n\tochrana := params includesKey: #skodlorg." +
	"\n\tparams pairsDo: [:typ :kody | | sezn doplneneKody |" +
	"\n\t\tsezn := SortedCollection new." +
	"\n\t\tdoplneneKody := Fytoportal data epptKody pridejNadrazene: kody asCollection." +
	"\n\t\tochrana not & (typ = #plodiny) ifTrue: [" +
	"\n\t\t\t\"najde pouziti 'vsechny plodiny'\"" +
	"\n\t\t\tdoplneneKody := doplneneKody copyWith: '3CCCC']." +
	"\n\t\t((Fytoportal data pouzitiPOR mapovaniPro: typ) lookupKeys: doplneneKody) do: [:dict |" +
	"\n\t\t\tsezn addUnique: (dict at: #id)]." +
	"\n\t\tmapovani " +
	"\n\t\t\tat: (typ = #skodlorg | ochrana not ifTrue: #keys ifFalse: typ) " +
	"\n\t\t\tput: sezn asArray" +
	"\n\t]." +
	"\n\tviewName := #semafor." +
	"\n\tochrana ifFalse: [viewName := viewName, ((self id startsWith: #plevele) " +
	"\n\t\tifTrue: [filtr := [:prip | prip herbicid]. '-herbicidy'] " +
	"\n\t\tifFalse: [filtr := [:prip | prip mimoPrip]. '-mimoPrip'])]." +
	"\n\tfiltr ifNil: [filtr := [:p | true]]." +
	"\n\tlist := (Fytoportal data pripravky doc viewNamed: viewName) listNamed: 'vyber-plodiny'." +
	"\n\tlist urlParams: mapovani." +
	"\n\t^ aBlock " +
	"\n\t\tifNotNil: [" +
	"\n\t\t\tlist asyncQueryDo:  [:data :req | " +
	"\n\t\t\t\taBlock value: ((self pripravSemaforData: data) select: filtr)]]" +
	"\n\t\tifNil: [\"do tisku - klasicky vraci data\"" +
	"\n\t\t\t(self pripravSemaforData: list queryData) select: filtr]",
	null, "2014-04-02T10:53:18Z", "mp"); //fytoportal-ior

jst.FYKapitolaPOR.addMethod("pripravSemaforData:", "data", "private", 
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
	null, "2014-03-18T21:15:18Z", "mp");
*/

//*** FYKapitolaHerbicidy ***

jst.FYKapitolaHerbicidy.addMethod("semaforViewName", "", "semafor POR", 
	"\t^ 'semafor-herbicidy'",
	null, "2014-04-24T14:34:25Z", "mp");

jst.FYKapitolaHerbicidy.addMethod("pripravSemaforData:", "data", "semafor POR", 
	"\t\"musim odfiltrovat desikanty, view pro herbicidy nereflektuje vybrane plodiny metodiky\"" +
	"\n\t^ Dictionary new" +
	"\n\t\tat: self id put: ((super pripravSemaforData: data) select: [:prip | prip neniDesikant]);" +
	"\n\t\tyourself",
	null, "2014-04-25T09:22:35Z", "mp", 1);

jst.FYKapitolaHerbicidy.addMethod("pripravSemaforData:", "data", "semafor POR", 
	"\t^ Dictionary new" +
	"\n\t\tat: self id put: (super pripravSemaforData: data);" +
	"\n\t\tyourself",
	null, "2014-05-06T12:03:38Z", "mp"); //fytoportal-ior

//*** FYKapitolaDalsiPOR ***

jst.FYKapitolaDalsiPOR.addMethod("isReadonly", "", "testing", 
	"\t^ false",
	null, "2014-04-20T19:38:33Z", "mp", 1);

jst.FYKapitolaDalsiPOR.addMethod("isReadonly", "", "testing", 
	"\t^ id = #dalsiPOR",
	null, "2014-04-24T19:04:10Z", "mp"); //fytoportal-ior

jst.FYKapitolaDalsiPOR.addMethod("semaforViewName", "", "semafor POR", 
	"\t^ 'semafor-mimoPrip'",
	null, "2014-04-24T19:06:14Z", "mp");

jst.FYKapitolaDalsiPOR.addMethod("pripravSemaforData:", "data", "semafor POR", 
	"\t| dict regul desik dalsi |" +
	"\n\tdict := Dictionary new" +
	"\n\t\tat: 'ostatni.rust' put: (regul := OrderedCollection new);" +
	"\n\t\tat: 'ostatni.dozravani' put: (desik := OrderedCollection new);" +
	"\n\t\tat: 'ostatni.dalsiPOR' put: (dalsi := OrderedCollection new);" +
	"\n\t\tyourself." +
	"\n\t\"pripravky vyfiltruji do jednotlivych kapitol\"" +
	"\n\t(super pripravSemaforData: data) do: [:prip |" +
	"\n\t\t(prip jeRegulatorRustu) " +
	"\n\t\t\tifTrue: [regul add: prip]" +
	"\n\t\t\tifFalse: [prip jeDesikant" +
	"\n\t\t\t\tifTrue: [desik add: prip]" +
	"\n\t\t\t\tifFalse: [prip neniHerbicid" +
	"\n\t\t\t\t\tifTrue: [dalsi add: prip]]]" +
	"\n\t]." +
	"\n\t^ dict",
	null, "2014-04-25T09:37:46Z", "mp", 1);

jst.FYKapitolaDalsiPOR.addMethod("pripravSemaforData:", "data", "semafor POR", 
	"\t| dict regul desik dalsi |" +
	"\n\tdict := Dictionary new" +
	"\n\t\tat: 'ostatni.rust' put: (regul := OrderedCollection new);" +
	"\n\t\tat: 'ostatni.dozravani' put: (desik := OrderedCollection new);" +
	"\n\t\tat: 'ostatni.dalsiPOR' put: (dalsi := OrderedCollection new);" +
	"\n\t\tyourself." +
	"\n\t\"pripravky vyfiltruji do jednotlivych kapitol\"" +
	"\n\t(super pripravSemaforData: data) do: [:prip |" +
	"\n\t\t(prip jeRegulatorRustu) " +
	"\n\t\t\tifTrue: [regul add: prip]" +
	"\n\t\t\tifFalse: [prip jeDesikant" +
	"\n\t\t\t\tifTrue: [desik add: prip]" +
	"\n\t\t\t\tifFalse: [dalsi add: prip]]" +
	"\n\t]." +
	"\n\t^ dict",
	null, "2014-05-06T12:27:47Z", "mp"); //fytoportal-ior

//*** FYMetodika ***

jst.FYMetodika.addMethod("=", "jinaMet", "comparing", 
	"\t\"na rozdil od kapitoly ma metodika globalni id, mohu tedy podle nej porovnavat\"" +
	"\n\t^ self species = jinaMet species and: [id = jinaMet id]",
	null, "2014-03-12T09:38:04Z", "mp");

jst.FYMetodika.addMethod("root", "", "accessing", 
	"\t^ self",
	null, "2013-02-27T12:32:46Z", "mp");

jst.FYMetodika.addMethod("metodika", "", "accessing", 
	"\t^ self",
	null, "2013-01-09T12:48:38Z", "mp");

jst.FYMetodika.addMethod("obecnaMetodika", "", "accessing", 
	"\t^ nil",
	null, "2013-12-07T22:37:02Z", "mp");

jst.FYMetodika.addMethod("slozeneId:", "podkapId", "private", 
	"\t\"id se sklada pouze v ramci metodiky, id plodinove metodiky ani metodiky skudce/choroby se nepridava\"" +
	"\n\t^ '', podkapId",
	null, "2014-03-12T20:52:03Z", "mp");

jst.FYMetodika.addMethod("semaforParams", "", "accessing", 
	"\t| params |" +
	"\n\tparams := Dictionary new." +
	"\n\t(nazev asString includesSubString: 'jarní') ifTrue: [" +
	"\n\t\tparams at: #obdobi put: 'jaro'" +
	"\n\t] ifFalse: [(nazev asString includesSubString: 'ozim') ifTrue: [" +
	"\n\t\tparams at: #obdobi put: 'ozim']]." +
	"\n\t^ params",
	null, "2014-05-22T12:05:31Z", "mp", 1);

jst.FYMetodika.addMethod("semaforParams", "", "accessing", 
	"\t| params |" +
	"\n\tparams := Dictionary new." +
	"\n\tobdobi ifNotNil: [" +
	"\n\t\tparams at: #obdobi put: obdobi]." +
	"\n\t^ params",
	null, "2014-05-22T12:37:12Z", "mp"); //fytoportal-ior

//*** FYOsnovaMetodiky ***

jst.FYOsnovaMetodiky.addMethod("metodika", "", "accessing", 
	"\t^ metodika",
	null, "2013-04-25T09:49:26Z", "mp");

jst.FYOsnovaMetodiky.addMethod("metodika:", "met", "accessing", 
	"\t\"odkaz na metodiku, ze ktere je osnova vytvorena - pokud nejde o obecnou osnovu\"" +
	"\n\tmetodika := met",
	null, "2013-04-25T09:49:14Z", "mp");

/*
jst.FYOsnovaMetodiky.addMethod("printPathOn:", "aStream", "printing", 
	"\t\"nazev osnovy netisknu\"",
	null, "2013-01-22T21:53:07Z", "mp");
*/

jst.FYOsnovaMetodiky.addMethod("printOn:", "aStream", "printing", 
	"\taStream nextPutAll: id",
	null, "2013-11-20T14:52:37Z", "mp");

jst.FYOsnovaMetodiky.addMethod("osnovaTisk", "", "accessing", 
	"\t^ self sortedKeys collect: [:key | self at: key]",
	null, "2013-12-08T16:56:14Z", "mp");

// *** FYObecnaMetodikaPM ***

jst.FYObecnaMetodikaPM.addMethod("nazev", "", "accessing", 
	"\t^ 'Obecná metodika ', nazev",
	null, "2013-12-04T09:25:12Z", "mp", 1);

jst.FYObecnaMetodikaPM.addMethod("nazev", "", "accessing", 
	"\t^ nazev, ' (společné texty)'",
	null, "2014-02-10T09:34:40Z", "mp"); //fytoportal-ior

jst.FYObecnaMetodikaPM.addMethod("skupina", "", "accessing", 
	"\t^ nazev",
	null, "2013-12-10T10:21:58Z", "mp", 1);

jst.FYObecnaMetodikaPM.addMethod("skupina", "", "accessing", 
	"\t^ id copyAfter: $_",
	null, "2014-04-15T09:10:49Z", "mp"); //fytoportal-ior

jst.FYObecnaMetodikaPM.addMethod("jeObecnaMetodika", "", "testing", 
	"\t^ true",
	null, "2013-12-04T10:48:12Z", "mp");

jst.FYObecnaMetodikaPM.addMethod("maObecnouMetodiku:", "metId", "testing", 
	"\t^ false",
	null, "2014-03-14T14:38:34Z", "mp");

jst.FYObecnaMetodikaPM.addMethod("jeMetodikaPM", "", "testing", 
	"\t^ true",
	null, "2013-12-07T18:12:53Z", "mp");

/* vyni viz FYMetodika>>=
jst.FYObecnaMetodikaPM.addMethod("=", "met", "comparing", 
	"\t^ self species = met species and: [id = met id]",
	null, "2013-08-22T13:22:20Z", "mp");
*/

jst.FYObecnaMetodikaPM.addMethod("printPathOn:", "aStream", "printing", 
	"\t\"nazev metodiky mi v ceste prekazi\"",
	null, "2013-02-23T21:18:58Z", "mp");

jst.FYObecnaMetodikaPM.addMethod("plodiny", "", "accessing", 
	"\t^ self at: #plodiny",
	null, "2012-11-13T13:15:54Z", "mp");

jst.FYObecnaMetodikaPM.addMethod("skudci", "", "accessing", 
	"\t^ self at: #skudci",
	null, "2012-11-13T13:15:54Z", "mp");

jst.FYObecnaMetodikaPM.addMethod("choroby", "", "accessing", 
	"\t^ self at: #choroby",
	null, "2012-11-13T13:15:54Z", "mp");

jst.FYObecnaMetodikaPM.addMethod("abionozy", "", "accessing", 
	"\t^ self at: #abionozy",
	null, "2013-01-03T16:08:16Z", "mp");

jst.FYObecnaMetodikaPM.addMethod("jsonKeys", "", "private", 
	"\t^ super jsonKeys copyWithout: #zmenena",
	null, "2013-03-01T21:31:13Z", "mp");

jst.FYObecnaMetodikaPM.addMethod("publikovat", "", "accessing", 
	"\t^ publikovat ~= false",
	null, "2014-01-15T20:08:12Z", "mp");

jst.FYObecnaMetodikaPM.addMethod("publikovat:", "aBoolean", "accessing", 
	"\tpublikovat := aBoolean",
	null, "2014-01-15T20:08:24Z", "mp");

jst.FYObecnaMetodikaPM.addMethod("typ", "", "accessing", 
	"\t^ (nazev endsWith: #informace) " +
	"\n\t\tifTrue: [#prirucka]" +
	"\n\t\tifFalse: [#metodika]",
	null, "2014-02-08T21:58:19Z", "mp", 1);

jst.FYObecnaMetodikaPM.addMethod("typ", "", "accessing", 
	"\t^ (id endsWith: #prirucky) " +
	"\n\t\tifTrue: [#prirucka]" +
	"\n\t\tifFalse: [#metodika]",
	null, "2014-02-10T08:26:59Z", "mp");

jst.FYObecnaMetodikaPM.addMethod("vyberKapitolPM", "", "accessing", 
	"\t\"pro obecnou metodiku nema vyznam\"" +
	"\n\t^ Dictionary new",
	null, "2014-03-12T23:21:56Z", "mp");

jst.FYObecnaMetodikaPM.addMethod("projdiKapSO:", "aBlock", "enumerating", 
	"\t#(abionozy choroby skudci) do: [:k |" +
	"\n\t\tself at: k ifPresent: [:kapSO | " +
	"\n\t\t\tkapSO obsah do: aBlock]]",
	null, "2014-04-18T14:52:42Z", "mp");

jst.FYObecnaMetodikaPM.addMethod("metodikaSO", "", "accessing", 
	"\t^ nil",
	null, "2014-04-22T14:17:10Z", "mp");

//*** FYMetodikaPM ***

jst.FYMetodikaPM.addMethod("nazev", "", "accessing", 
	"\t^ nazev",
	null, "2013-12-04T09:25:12Z", "mp");

jst.FYMetodikaPM.addMethod("skupina", "", "accessing", 
	"\t^ skupina",
	null, "2013-12-03T15:08:15Z", "mp");

jst.FYMetodikaPM.addMethod("skupina:", "aString", "accessing", 
	"\tskupina := aString",
	null, "2013-12-03T15:08:28Z", "mp");

jst.FYMetodikaPM.addMethod("jeObecnaMetodika", "", "testing", 
	"\t^ false",
	null, "2013-12-04T10:47:38Z", "mp");

jst.FYMetodikaPM.addMethod("maObecnouMetodiku:", "metId", "testing", 
	"\t^ samostatna ~= true & skupina notNil and: [metId endsWith: skupina]",
	null, "2014-03-14T14:29:31Z", "mp");

jst.FYMetodikaPM.addMethod("obecnaMetodika", "", "accessing", 
	"\t^ samostatna ~= true & skupina notNil ifTrue: [" +
	"\n\t\tFytoportal data obecnaMetodikaPro: skupina]",
	null, "2013-12-07T17:24:02Z", "mp", 1);

jst.FYMetodikaPM.addMethod("obecnaMetodika", "", "accessing", 
	"\t^ (self maObecnouMetodiku: skupina) ifTrue: [" +
	"\n\t\tFytoportal data obecnaMetodikaPro: skupina]",
	null, "2014-03-15T22:16:03Z", "mp"); //fytoportal-ior

jst.FYMetodikaPM.addMethod("typ", "", "accessing", 
	"\t^ (nazev endsWith: #informace) " +
	"\n\t\tifTrue: [#obecneInfo]" +
	"\n\t\tifFalse: [(skupina notNil and: [skupina endsWith: #informace])" +
	"\n\t\t\tifTrue: [#prirucka]" +
	"\n\t\t\tifFalse: [#metodika]]",
	null, "2014-02-08T22:19:09Z", "mp", 1);

jst.FYMetodikaPM.addMethod("typ", "", "accessing", 
	"\t^ (id = #'obecne_informace') " +
	"\n\t\tifTrue: [#obecneInfo]" +
	"\n\t\tifFalse: [skupina = #prirucky" +
	"\n\t\t\tifTrue: [#prirucka]" +
	"\n\t\t\tifFalse: [#metodika]]",
	null, "2014-02-10T08:28:48Z", "mp"); //fytoportal-ior

jst.FYMetodikaPM.addMethod("plodiny", "", "accessing", 
	"\t\"pro obecne info nebo prirucku vraci nil\"" +
	"\n\t^ self typ = #metodika ifTrue: [" +
	"\n\t\tsuper plodiny]",
	null, "2014-02-10T09:40:13Z", "mp");

jst.FYMetodikaPM.addMethod("vyberKapitolPM", "", "accessing", 
	"\t^ Fytoportal data vyberKapitolPM at: id",
	null, "2014-03-06T10:13:58Z", "mp"); //fytoportal-ior

jst.FYMetodikaPM.addMethod("resetujFotky", "", "updating", 
	"\tself valuesDo: [:kap | kap jeKapitolaSO ifTrue: [" +
	"\n\t\tkap resetujFotky]]",
	null, "2014-03-14T14:28:01Z", "mp");

// *** FYMetodikaSO ***

jst.FYMetodikaSO.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\ttaxony := #()",
	null, "2014-03-01T17:48:11Z", "mp", 1);

jst.FYMetodikaSO.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\ttaxony := #()." +
	"\n\tzmeny := Dictionary new",
	null, "2014-03-01T21:45:15Z", "mp"); //fytoportal-ior

jst.FYMetodikaSO.addMethod("jsonKeys", "", "private", 
	"\t\"jen kvuli zpetne kompatibilite - pri nacitani ulozim do #taxony, pri ukladani ignoruji, bude nil\"" +
	"\n\t^ super jsonKeys copyWith: #taxon",
	null, "2014-02-28T11:50:47Z", "mp", 1);

jst.FYMetodikaSO.addMethod("jsonKeys", "", "private", 
	"\t\"jen kvuli zpetne kompatibilite - pri nacitani ulozim do #taxony, pri ukladani ignoruji, bude nil\"" +
	"\n\t^ super jsonKeys inject: (OrderedCollection with: #taxon) into: [:coll :key |" +
	"\n\t\tkey = #zmeny ifFalse: [" +
	"\n\t\t\tcoll add: key]." +
	"\n\t\tcoll]",
	null, "2014-03-01T21:52:56Z", "mp", 2);

jst.FYMetodikaSO.addMethod("jsonKeys", "", "private", 
	"\t\"jen kvuli zpetne kompatibilite - pri nacitani ulozim do #taxony, pri ukladani ignoruji, bude nil\"" +
	"\n\t^ super jsonKeys inject: (OrderedCollection with: #taxon) into: [:coll :key |" +
	"\n\t\tkey = #zmeny | (key = #vychoziFotka) ifFalse: [" +
	"\n\t\t\tcoll add: key]." +
	"\n\t\tcoll]",
	null, "2014-03-10T12:31:31Z", "mp"); //fytoportal-ior

/*
jst.FYMetodikaSO.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\t\"semafor budeme nacitat az pri vizualni aktivaci prislusne komponenty\"" +
	"\n\tsemaforPOR := #()",
	null, "2013-04-29T06:31:17Z", "mp");

jst.FYMetodikaSO.addMethod("jsonKeys", "", "private", 
	"\t^ super jsonKeys copyWithoutAll: #(kapitolaPM semaforPOR)",
	null, "2013-04-28T21:43:13Z", "mp");

jst.FYMetodikaSO.addMethod("semaforPOR", "", "accessing", 
	"\t^ semaforPOR",
	null, "2013-04-28T21:43:38Z", "mp");

jst.FYMetodikaSO.addMethod("semaforPOR:", "data", "accessing", 
	"\tsemaforPOR := data",
	null, "2013-04-28T21:43:54Z", "mp");
*/

jst.FYMetodikaSO.addMethod("taxony", "", "accessing", 
	"\t^ taxon asCollection",
	null, "2014-02-28T09:59:37Z", "mp", 1);

jst.FYMetodikaSO.addMethod("taxony", "", "accessing", 
	"\t(taxony size > 0 and: [taxony first isString]) ifTrue: [" +
	"\n\t\ttaxony := taxony collect: [:taxId |" +
	"\n\t\t\tFytoportal db loadObject: taxId]]." +
	"\n\t^ taxony",
	null, "2014-02-28T10:46:43Z", "mp", 2);

jst.FYMetodikaSO.addMethod("taxony", "", "accessing", 
	"\tzmeny at: #taxony ifPresent: [:zmenene |" +
	"\n\t\t| doplnene |" +
	"\n\t\tdoplnene := zmenene." +
	"\n\t\t(zmenene size > 0 and: [zmenene first isString]) ifTrue: [" +
	"\n\t\t\t\"poprve doplnim\"" +
	"\n\t\t\tdoplnene := zmenene collect: [:taxId | \ttaxony " +
	"\n\t\t\t\tdetect: [:tax | tax isString not and: [tax id = taxId]] " +
	"\n\t\t\t\tifNone: [Fytoportal db loadObject: taxId]]." +
	"\n\t\t\tzmeny at: #taxony put: doplnene." +
	"\n\t\t]." +
	"\n\t\t^ doplnene" +
	"\n\t].\t\t" +
	"\n\t(taxony size > 0 and: [taxony first isString]) ifTrue: [" +
	"\n\t\ttaxony := taxony collect: [:taxId |" +
	"\n\t\t\tFytoportal db loadObject: taxId]]." +
	"\n\t^ taxony",
	null, "2014-03-11T13:43:52Z", "mp"); //fytoportal-ior

jst.FYMetodikaSO.addMethod("taxonyId", "", "accessing", 
	"\t^ taxony collect: [:tax |" +
	"\n\t\ttax ifNotString: [tax id]]",
	null, "2014-03-01T17:47:04Z", "mp", 1);

jst.FYMetodikaSO.addMethod("taxonyId", "", "accessing", 
	"\t^ (zmeny at: #taxony ifAbsent: [taxony]) collect: [:tax |" +
	"\n\t\ttax ifNotString: [tax id]]",
	null, "2014-03-01T22:17:17Z", "mp"); //fytoportal-ior

jst.FYMetodikaSO.addMethod("taxony:", "aCollection", "accessing", 
	"\ttaxon := aCollection asArray",
	null, "2014-02-28T10:00:43Z", "mp", 1);

jst.FYMetodikaSO.addMethod("taxony:", "aCollection", "accessing", 
	"\ttaxony := aCollection asArray",
	null, "2014-02-28T11:48:35Z", "mp", 1);

jst.FYMetodikaSO.addMethod("taxony:", "aCollection", "accessing", 
	"\tzmeny at: #taxony put: aCollection asArray",
	null, "2014-03-01T22:24:07Z", "mp"); //fytoportal-ior

jst.FYMetodikaSO.addMethod("fotka", "", "accessing", 
	"\t^ zmeny at: #fotka ifAbsent: [fotka]",
	null, "2014-03-07T21:38:00Z", "mp", 1);

jst.FYMetodikaSO.addMethod("fotka", "", "accessing", 
	"\t^ zmeny at: #fotka ifAbsent: [fotka ifString: [" +
	"\n\t\tfotka := Fytoportal db loadObject: fotka]]",
	null, "2014-03-10T12:35:42Z", "mp"); //fytoportal-ior

jst.FYMetodikaSO.addMethod("fotka:", "anObject", "accessing", 
	"\tzmeny at: #fotka put: anObject",
	null, "2014-03-07T21:39:02Z", "mp", 1);

jst.FYMetodikaSO.addMethod("fotka:", "anObject", "accessing", 
	"\t\"editace fotky\"" +
	"\n\tzmeny at: #fotka put: anObject",
	null, "2014-03-10T12:29:55Z", "mp", 2);

jst.FYMetodikaSO.addMethod("fotka:", "anObject", "accessing", 
	"\t\"editace fotky\"" +
	"\n\t(zmeny at: #fotka put: anObject) ifNil: [" +
	"\n\t\tvychoziFotka := nil]",
	null, "2014-03-11T20:13:04Z", "mp"); //fytoportal-ior

jst.FYMetodikaSO.addMethod("vychoziFotka", "", "accessing", 
	"\t^ (Fytoportal data fotky vybraneFotkySkodlOrg " +
	"\n\t\turlParams: {#keys. self taxonyId}; " +
	"\n\t\tqueryData) ifNotEmptyDo: [:sezn |" +
	"\n\t\t\tsezn first at: #foto]",
	null, "2014-03-07T22:36:27Z", "mp", 1);

jst.FYMetodikaSO.addMethod("vychoziFotka", "", "accessing", 
	"\t^ vychoziFotka ifNil: [" +
	"\n\t\tvychoziFotka := (Fytoportal data fotky vybraneFotkySkodlOrg " +
	"\n\t\t\turlParams: {#keys. self taxonyId}; " +
	"\n\t\t\tqueryData) ifNotEmptyDo: [:sezn |" +
	"\n\t\t\t\tsezn first at: #foto]]",
	null, "2014-03-10T12:33:54Z", "mp", 2);

jst.FYMetodikaSO.addMethod("vychoziFotka", "", "accessing", 
	"\t^ vychoziFotka ifNil: [self taxonyId size = 1 ifTrue: [" +
	"\n\t\t\"pro vice taxonu se musi fotka urcit explicitne\"" +
	"\n\t\tvychoziFotka := (Fytoportal data fotky vybraneFotkySkodlOrg " +
	"\n\t\t\turlParams: {#keys. self taxonyId}; " +
	"\n\t\t\tqueryData) ifNotEmptyDo: [:sezn |" +
	"\n\t\t\t\tsezn first at: #foto]]]",
	null, "2014-03-11T10:12:22Z", "mp"); //fytoportal-ior

/*
jst.FYMetodikaSO.addMethod("taxon", "", "accessing", 
	"\t^ taxon ifString: [" +
	"\n\t\ttaxon := Fytoportal db loadObject: taxon]",
	null, "2012-11-13T13:00:04Z", "mp");

jst.FYMetodikaSO.addMethod("taxonId", "", "accessing", 
	"\t^ taxon ifNotString: [taxon id]",
	null, "2013-01-29T16:06:55Z", "mp");

jst.FYMetodikaSO.addMethod("taxon:", "anObject", "accessing", 
	"\ttaxon := anObject",
	null, "2013-02-04T20:41:17Z", "mp");
*/

jst.FYMetodikaSO.addMethod("novyTaxon", "", "vazby", 
	"\t^ FYSkodlOrg new",
	null, "2013-01-25T10:25:57Z", "mp");

jst.FYMetodikaSO.addMethod("jeMetodikaSO", "", "testing", 
	"\t^ true",
	null, "2013-01-29T09:35:06Z", "mp");

jst.FYMetodikaSO.addMethod("convertToJson:atKey:", "anObject aString", "private", 
	"\t^ aString = #taxon " +
	"\n\t\tifTrue: [self taxonId]" +
	"\n\t\tifFalse: [super convertToJson: anObject atKey: aString]",
	null, "2013-01-30T14:46:16Z", "mp", 1);

jst.FYMetodikaSO.addMethod("convertToJson:atKey:", "anObject aString", "private", 
	"\t\"#taxon muzu ignorovat, bude nil a neulozi se\"" +
	"\n\t^ aString = #taxony " +
	"\n\t\tifTrue: [taxony collect: [:tax | tax ifNotString: [tax id]]]" +
	"\n\t\tifFalse: [super convertToJson: anObject atKey: aString]",
	null, "2014-02-28T11:57:14Z", "mp", 2);

jst.FYMetodikaSO.addMethod("convertToJson:atKey:", "anObject aString", "private", 
	"\t\"#taxon muzu ignorovat, bude nil a neulozi se\"" +
	"\n\t^ aString = #taxony " +
	"\n\t\tifTrue: [taxony collect: [:tax | tax ifNotString: [tax id]]]" +
	"\n\t\tifFalse: [aString = #fotka & fotka notNil" +
	"\n\t\t\tifTrue: [fotka ifNotString: [fotka id]]" +
	"\n\t\t\tifFalse: [super convertToJson: anObject atKey: aString]]",
	null, "2014-03-11T22:27:23Z", "mp"); //fytoportal-ior

jst.FYMetodikaSO.addMethod("convertFromJson:instVar:", "jsonObject aString", "private", 
	"\t^ aString = #taxon " +
	"\n\t\tifTrue: [taxony := {jsonObject}]" +
	"\n\t\tifFalse: [super convertFromJson: jsonObject instVar: aString]",
	null, "2014-02-28T11:38:15Z", "mp", 1);

jst.FYMetodikaSO.addMethod("convertFromJson:instVar:", "jsonObject aString", "private", 
	"\taString = #taxon " +
	"\n\t\tifTrue: [taxony := {jsonObject}]" +
	"\n\t\tifFalse: [super convertFromJson: jsonObject instVar: aString]",
	null, "2014-03-07T09:16:12Z", "mp"); //fytoportal-ior

/*
jst.FYMetodikaSO.addMethod("renderOn:", "html", "rendering", 
	"\thtml div " +
	"\n\t\tclass: 'kapitola-taxon'; " +
	"\n\t\twith: [self taxon renderOn: html]." +
	"\n\tsuper renderOn: html",
	null, "2013-04-15T13:54:12Z", "mp");
*/

jst.FYMetodikaSO.addMethod("plodiny", "", "accessing", 
	"\t^ nil",
	null, "2013-05-03T10:08:52Z", "mp", 1);

jst.FYMetodikaSO.addMethod("plodiny", "", "accessing", 
	"\t^ FYKapitolaPlodiny new" +
	"\n\t\tobsah: ((Fytoportal data taxony podleId lookupKeys: self taxon hostitele) collect: [:dict | dict at: #doc])",
	null, "2013-09-04T21:16:15Z", "mp", 1);

jst.FYMetodikaSO.addMethod("plodiny", "", "accessing", 
	"\t\"^ FYKapitolaPlodiny new" +
	"\n\t\tobsah: ((Fytoportal data taxony podleId lookupKeys: self taxon hostitele) collect: [:dict | dict at: #doc])" +
	"\n\t* vazba na na hostitelské plodiny definované ve fotogalerii byla blbost - v rámci metodiky ŠO nechť se zobrazí všechny přípravky, " +
	"\n\t* plodinová metodika má vlastní seznam hostitelů, který se uplatní pro všechny ŠO v rámci dané metodiky\"" +
	"\n\t^ nil",
	null, "2013-09-17T08:16:26Z", "mp"); //fytoportal-ior

jst.FYMetodikaSO.addMethod("kapitolyTisk", "", "accessing", 
	"\t^ self kapitoly",
	null, "2013-12-08T16:58:39Z", "mp", 1);

jst.FYMetodikaSO.addMethod("kapitolyTisk", "", "accessing", 
	"\t^ self kapitoly select: [:kap | kap jeVyrazena not]",
	null, "2013-12-17T10:58:42Z", "mp"); //fytoportal-ior

jst.FYMetodikaSO.addMethod("kody", "", "accessing", 
	"\t| kody |" +
	"\n\tkody := SortedCollection new." +
	"\n\tself taxony do: [:tax |" +
	"\n\t\ttax kody do: [:k |" +
	"\n\t\t\tkody addUnique: k]]." +
	"\n\t^ kody",
	null, "2014-02-28T12:11:38Z", "mp");

jst.FYMetodikaSO.addMethod("taxon:", "taxon", "accessing", 
	"\t(taxony isEmpty not and: [taxony first isString not] and: [taxony anySatisfy: [:ea | ea id = taxon id]]) ifTrue: [" +
	"\n\t\t\"taxony jsou nacteny, aktualizuji nalezeny taxon\"" +
	"\n\t\ttaxony := {taxon} copyWithAll: (taxony select: [:ea | ea id ~= taxon id])]",
	null, "2014-03-04T15:21:43Z", "mp");

jst.FYMetodikaSO.addMethod("metodikaSO", "", "accessing", 
	"\t^ self",
	null, "2014-04-22T14:16:56Z", "mp");

jst.FYMetodikaSO.addMethod("pouzitiSO", "", "semafor POR", 
	"\t| kody pouziti |" +
	"\n\t\"pouziti podle SO jako parametry do semaforu\"" +
	"\n\tpouziti := SortedCollection new." +
	"\n\tkody := Fytoportal data epptKody pridejNadrazene: self kody." +
	"\n\t((Fytoportal data pouzitiPOR mapovaniPro: #skodlorg) lookupKeys: kody) do: [:dict |" +
	"\n\t\tpouziti addUnique: (dict at: #id)]." +
	"\n\t^ pouziti asArray",
	null, "2014-04-24T09:23:05Z", "mp");

jst.FYMetodikaSO.addMethod("pripravSemaforData:", "data", "semafor POR", 
	"\t| dict bio chem pomucky jePomucka |" +
	"\n\tdict := Dictionary new" +
	"\n\t\tat: 'monitoring.primeMetody' put: (pomucky := OrderedCollection new);" +
	"\n\t\tat: 'ochrana.nechemickeMetody.bioPripravky' put: (bio := OrderedCollection new);" +
	"\n\t\tat: 'ochrana.chemickaOchrana.pripravky' put: (chem := OrderedCollection new);" +
	"\n\t\tyourself." +
	"\n\t\"pripravky vyfiltruji do jednotlivych kapitol\"" +
	"\n\tjePomucka := [:fce | (fce startsWith: 'Pasivní') or: [fce startsWith: 'Semio']]." +
	"\n\t(super pripravSemaforData: data) do: [:prip |" +
	"\n\t\t(prip biologFunkce anySatisfy: jePomucka) " +
	"\n\t\t\tifTrue: [pomucky add: prip]" +
	"\n\t\t\tifFalse: [prip jeEKO " +
	"\n\t\t\t\tifTrue: [bio add: prip]" +
	"\n\t\t\t\tifFalse: [chem add: prip]]" +
	"\n\t]." +
	"\n\t^ dict",
	null, "2014-04-24T14:09:47Z", "mp");

//*** FYMetodikaChoroba ***

jst.FYMetodikaChoroba._class.addMethod("kapitola", "", "vazby", 
	"\t^ #choroby",
	null, "2013-01-25T10:20:32Z", "mp");

//*** FYMetodikaSkudce ***

jst.FYMetodikaSkudce._class.addMethod("kapitola", "", "vazby", 
	"\t^ #skudci",
	null, "2013-01-25T10:20:09Z", "mp");

jst.FYMetodikaSkudce.addMethod("novyTaxon", "", "vazby", 
	"\t^ FYSkodlOrg new zarazeni: 'živočišný škůdce'",
	null, "2013-01-25T10:29:00Z", "mp");

//*** FYMetodikaAbionoza ***

jst.FYMetodikaAbionoza._class.addMethod("kapitola", "", "vazby", 
	"\t^ #abionozy",
	null, "2013-01-25T10:20:46Z", "mp");

jst.FYMetodikaAbionoza.addMethod("novyTaxon", "", "vazby", 
	"\t^ FYSkodlOrg new zarazeni: 'abionóza'",
	null, "2013-01-25T10:29:40Z", "mp");

//*** FYDataMetodiky ***

jst.FYDataMetodiky.addMethod("nazvyMetodik", "", "accessing", 
	"\t^ self doc viewNamed: 'nazvy'",
	null, "2014-03-04T20:07:32Z", "mp");

jst.FYDataMetodiky.addMethod("metodikySO:", "aSymbol", "accessing", 
	"\t^ (self doc viewNamed: aSymbol) queryData",
	null, "2013-01-17T10:09:45Z", "mp");

jst.FYDataMetodiky.addMethod("metodikyPlodin", "", "accessing", 
	"\t^ (self doc viewNamed: 'seznam') queryData",
	null, "2013-01-17T10:12:00Z", "mp", 1);

jst.FYDataMetodiky.addMethod("metodikyPlodin", "", "accessing", 
	"\t^ (self doc viewNamed: 'seznam', self publicSuffix) queryData",
	null, "2014-01-19T22:39:30Z", "mp", 1);

jst.FYDataMetodiky.addMethod("metodikyPlodin", "", "accessing", 
	"\t^ (self doc viewNamed: 'seznam', self publicSuffix)" +
	"\n\t\tdataClass: Association;" +
	"\n\t\tqueryData",
	null, "2014-02-10T10:16:07Z", "mp", 1);

jst.FYDataMetodiky.addMethod("metodikyPlodin", "", "accessing", 
	"\t^ (self doc viewNamed: 'seznam', self publicSuffix) queryData",
	null, "2014-04-15T12:44:36Z", "mp"); //fytoportal-ior

jst.FYDataMetodiky.addMethod("nazvySkupin", "", "accessing", 
	"\t^ (self doc viewNamed: 'skupiny') queryData inject: Dictionary new into: [:dict :row |" +
	"\n\t\tdict at: row key put: row value; yourself]",
	null, "2014-04-15T11:24:05Z", "mp"); //fytoportal-ior

jst.FYDataMetodiky.addMethod("osnovyMetodik", "", "accessing", 
	"\t^ self doc viewNamed: 'osnovy'",
	null, "2013-01-08T14:56:59Z", "mp");

jst.FYDataMetodiky.addMethod("taxony", "", "accessing", 
	"\t\"seznam taxonu - plodin a skudcu - na ktere se metodiky odkazuji\"" +
	"\n\t^ self doc viewNamed: 'taxony'",
	null, "2013-04-11T15:26:45Z", "mp");

jst.FYDataMetodiky.addMethod("popisySO", "", "accessing", 
	"\t\"seznam taxonu SO a jejich charakteristik z prislusnych metodik\"" +
	"\n\t^ self doc viewNamed: 'skodlorg-popisy'",
	null, "2013-04-17T07:02:28Z", "mp");

jst.FYDataMetodiky.addMethod("podleTaxonu", "", "accessing", 
	"\t\"seznam metodik SO podle odkazovanych taxonu\"" +
	"\n\t^ self doc viewNamed: 'podleTaxonu'",
	null, "2013-11-13T13:23:52Z", "mp", 1);

jst.FYDataMetodiky.addMethod("podleTaxonu", "", "accessing", 
	"\t\"seznam metodik SO podle odkazovanych taxonu\"" +
	"\n\t^ self doc viewNamed: 'podleTaxonu', self publicSuffix",
	null, "2014-05-12T08:48:49Z", "mp"); //fytoportal-ior

jst.FYDataMetodiky.addMethod("podleMetodikSO", "", "accessing", 
	"\t\"seznam metodik PM podle id metodik SO, na ktere se odkazuji\"" +
	"\n\t^ self doc viewNamed: 'podleMetodikSO'",
	null, "2014-05-10T15:40:08Z", "mp", 1);

jst.FYDataMetodiky.addMethod("podleMetodikSO", "", "accessing", 
	"\t\"seznam metodik PM podle id metodik SO, na ktere se odkazuji\"" +
	"\n\t^ self doc viewNamed: 'podleMetodikSO', self publicSuffix",
	null, "2014-05-12T09:55:32Z", "mp"); //fytoportal-ior

jst.FYDataMetodiky.addMethod("plodinySkupiny:", "aString", "accessing", 
	"\t\"seznam plodin metodik v dane skupine - potřebuje obecná metodika\"" +
	"\n\t^ ((self doc viewNamed: 'skupiny-plodiny') lookupKey: aString) collect: [:row | row value]",
	null, "2013-12-10T10:07:51Z", "mp", 1);

jst.FYDataMetodiky.addMethod("plodinySkupiny:", "aString", "accessing", 
	"\t\"seznam plodin metodik v dane skupine - potřebuje obecná metodika\"" +
	"\n\t^ ((self doc viewNamed: 'skupiny-plodiny') lookupKey: aString) " +
	"\n\t\tinject: SortedCollection new" +
	"\n\t\tinto: [:sezn :row | sezn addUnique: row value; yourself]",
	null, "2014-01-28T13:54:15Z", "mp"); //fytoportal-ior

jst.FYDataMetodiky.addMethod("fotky", "", "accessing", 
	"\t\"seznam id fotek zadanych primo do metodik - fotka v metodice SO muze byt prekryta fotkou " +
	"\n\tv prislusne kapitole SO v obecne metodice  a jeste i v metodice PM\"" +
	"\n\t^ self doc viewNamed: 'fotky'",
	null, "2014-03-05T13:10:33Z", "mp");

jst.FYDataMetodiky.addMethod("texty", "", "accessing", 
	"\t\"kapitoly/nazvy metodik pripravene k hledani textu\"" +
	"\n\t^ self doc viewNamed: #texty",
	null, "2014-03-26T20:36:04Z", "mp", 1);

jst.FYDataMetodiky.addMethod("texty", "", "accessing", 
	"\t\"kapitoly/nazvy metodik pripravene k hledani textu\"" +
	"\n\t^ self doc viewNamed: 'texty', self publicSuffix",
	null, "2014-03-27T09:42:22Z", "mp"); //fytoportal-ior

jst.FYDataMetodiky.addMethod("podleFotek", "", "accessing", 
	"\t\"k zadanemu id fotky lze zjistit metodiky, ve kterych je fotka primo pouzita\"" +
	"\n\t^ self doc viewNamed: 'podleFotek'",
	null, "2014-04-17T14:27:41Z", "mp");

// *** FYDataOdrudy ***

jst.FYDataOdrudy.addMethod("popisyOdrud", "", "accessing", 
	"\t^ (self doc viewNamed: 'popisy')" +
	"\n\t\tdataClass: FYOdruda",
	null, "2014-05-19T08:28:37Z", "mp");

// *** FYIOR ***

jst.FYIOR.addMethod("initialize", "", "initialization", 
	"\tmetodikyPanel := FYMetodikyPanel concreteClass new." +
	"\n\tkapitolaPanel := FYKapitolaPanel new." +
	"\n\tobsahPanel := FYIORObsahPanel new." +
	"\n\t\"dependecies\"" +
	"\n\tmetodikyPanel" +
	"\n\t\taddDependent: kapitolaPanel;" +
	"\n\t\taddDependent: obsahPanel." +
	"\n\tkapitolaPanel" +
	"\n\t\taddDependent: obsahPanel." +
	"\n\tobsahPanel" +
	"\n\t\taddDependent: kapitolaPanel",
	null, "2013-01-18T14:36:15Z", "mp");

jst.FYIOR.addMethod("metodikyPanel", "", "accessing", 
	"\t^ metodikyPanel",
	null, "2012-11-08T09:29:49Z", "mp");

jst.FYIOR.addMethod("kapitolaPanel", "", "accessing", 
	"\t^ kapitolaPanel",
	null, "2012-11-08T09:30:09Z", "mp");

jst.FYIOR.addMethod("obsahPanel", "", "accessing", 
	"\t^ obsahPanel",
	null, "2012-11-08T09:30:18Z", "mp");
/*
jst.FYIOR.addMethod("dependents", "", "dependent access", 
	"\t^ {metodikyPanel. kapitolaPanel. obsahPanel}",
	null, "2013-08-27T21:35:36Z", "mp");
*/

// *** FYMetodikyPanel ***

/*
jst.FYMetodikyPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\tborder: false;" +
	"\n\t\twithBorderLayout;" +
	"\n\t\tadd: (metodiky := FYTreePanel new" +
	"\n\t\t\tborder: true;" +
	"\n\t\t\tregion: #center;" +
	"\n\t\t\ttitle: 'Plodinové metodiky';" +
	"\n\t\t\troot: self createRoot)." +
	"\n\tSmalltalk at: #FYIOREditNavig ifPresent: [:cls |" +
	"\n\t\tself addDependent: (self add: (cls new " +
	"\n\t\t\tregion: #south; " +
	"\n\t\t\taddDependent: self; " +
	"\n\t\t\tyourself))]",
	null, "2013-01-07T09:40:35Z", "mp");
*/

jst.FYMetodikyPanel._class.addMethod("concreteClass", "", "instance creation", 
	"\t| cls |" +
	"\n\tcls := self subclasses." +
	"\n\t^ cls size = 1 " +
	"\n\t\tifTrue: [cls first]" +
	"\n\t\tifFalse: self",
	null, "2013-01-18T14:34:56Z", "mp");

jst.FYMetodikyPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\tborder: false;" +
	"\n\t\twithBorderLayout;" +
	"\n\t\tadd: (metodiky := FYTreePanel new" +
	"\n\t\t\tborder: true;" +
	"\n\t\t\tregion: #center;" +
	"\n\t\t\ttitle: 'Plodinové metodiky';" +
	"\n\t\t\troot: self createRoot)",
	null, "2013-01-18T14:37:21Z", "mp", 1);

jst.FYMetodikyPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\tborder: false;" +
	"\n\t\twithBorderLayout;" +
	"\n\t\tadd: (hledej := FYHledejPanel new " +
	"\n\t\t\tregion: #north;" +
	"\n\t\t\tsearchPath: Fytoportal navigator ior hledej);" +
	"\n\t\tadd: (metodiky := FYTreePanel new" +
	"\n\t\t\tborder: true;" +
	"\n\t\t\tregion: #center;" +
	"\n\t\t\ttitle: 'Plodinové metodiky';" +
	"\n\t\t\troot: self createRoot)",
	null, "2014-03-21T23:03:37Z", "mp"); //fytoportal-ior

jst.FYMetodikyPanel.addMethod("afterrenderEvent", "", "events", 
	"\t^ [self doLayout]",
	null, "2012-11-08T20:03:21Z", "mp");

jst.FYMetodikyPanel.addMethod("createRoot", "", "private", 
	"\t^ ExtTreeNode new" +
	"\n\t\tchildren: (Fytoportal data metodiky metodikyPlodin collect: [:dict |" +
	"\n\t\t\tExtTreeNode new" +
	"\n\t\t\t\tid: (dict at: #id);" +
	"\n\t\t\t\ttext: (dict at: #key);" +
	"\n\t\t\t\tleaf: true])",
	null, "2013-01-17T10:12:09Z", "mp", 1);

jst.FYMetodikyPanel.addMethod("createRoot", "", "private", 
	"\t| skupiny data nodes |" +
	"\n\tskupiny := Dictionary new." +
	"\n\tnodes := SortedCollection sortBlock: [:a :b | a text <= b text]." +
	"\n\tdata := Fytoportal data metodiky metodikyPlodin." +
	"\n\t\"nejdříve skupiny\"" +
	"\n\tdata do: [:row | row value ifNotNil: [" +
	"\n\t\tskupiny at: row value ifAbsentPut: [" +
	"\n\t\t\tnodes add: (ExtTreeNode new" +
	"\n\t\t\t\tid: #skup, row value;" +
	"\n\t\t\t\ttext: row value;" +
	"\n\t\t\t\tleaf: false)" +
	"\n\t\t]" +
	"\n\t]]." +
	"\n\t\"metodiky\"" +
	"\n\tFytoportal data metodiky metodikyPlodin do: [:row |" +
	"\n\t\t(skupiny at: row key ifPresent: [:sk |" +
	"\n\t\t\t\"metodika je současně skupinou\"" +
	"\n\t\t\tsk id: row id]" +
	"\n\t\t) ifNil: [ | n |" +
	"\n\t\t\tn := ExtTreeNode new" +
	"\n\t\t\t\tid: row id;" +
	"\n\t\t\t\ttext: row key;" +
	"\n\t\t\t\tleaf: true." +
	"\n\t\t\trow value ifNotNil: [" +
	"\n\t\t\t\t(skupiny at: row value) children add: n" +
	"\n\t\t\t] ifNil: [\t\t\t" +
	"\n\t\t\t\tnodes add: n]." +
	"\n\t\t]\t\t\t\t" +
	"\n\t]." +
	"\n\t^ ExtTreeNode new children: nodes",
	null, "2013-12-03T21:18:44Z", "mp", 1);

jst.FYMetodikyPanel.addMethod("createRoot", "", "private", 
	"\t| skupiny data nodes |" +
	"\n\tskupiny := Dictionary new." +
	"\n\tnodes := SortedCollection sortBlock: [:a :b | a text <= b text]." +
	"\n\tdata := Fytoportal data metodiky metodikyPlodin." +
	"\n\t\"nejdříve skupiny\"" +
	"\n\tdata do: [:row | row value ifNotNil: [" +
	"\n\t\tskupiny at: row value ifAbsentPut: [" +
	"\n\t\t\tnodes add: (ExtTreeNode new" +
	"\n\t\t\t\tid: #skup, row value;" +
	"\n\t\t\t\ttext: row value;" +
	"\n\t\t\t\tleaf: false)" +
	"\n\t\t]" +
	"\n\t]]." +
	"\n\t\"metodiky\"" +
	"\n\tdata do: [:row |" +
	"\n\t\t(skupiny at: row key ifPresent: [:sk |" +
	"\n\t\t\t\"metodika je současně skupinou\"" +
	"\n\t\t\tsk id: row id]" +
	"\n\t\t) ifNil: [ | n |" +
	"\n\t\t\tn := ExtTreeNode new" +
	"\n\t\t\t\tid: row id;" +
	"\n\t\t\t\ttext: row key;" +
	"\n\t\t\t\tleaf: true." +
	"\n\t\t\trow value ifNotNil: [" +
	"\n\t\t\t\t(skupiny at: row value) children add: n" +
	"\n\t\t\t] ifNil: [\t\t\t" +
	"\n\t\t\t\tnodes add: n]." +
	"\n\t\t]\t\t\t\t" +
	"\n\t]." +
	"\n\t^ ExtTreeNode new children: nodes",
	null, "2014-01-18T21:43:17Z", "mp", 1);

jst.FYMetodikyPanel.addMethod("createRoot", "", "private", 
	"\t| skupiny data nodes |" +
	"\n\tskupiny := Dictionary new." +
	"\n\tnodes := SortedCollection sortBlock: [:a :b | a text <= b text]." +
	"\n\tdata := Fytoportal data metodiky metodikyPlodin." +
	"\n\t\"nejdříve skupiny\"" +
	"\n\tdata do: [:row | row value ifNotNil: [" +
	"\n\t\tskupiny at: row value ifAbsentPut: [" +
	"\n\t\t\tnodes add: (ExtTreeNode new" +
	"\n\t\t\t\tid: #skup, row value;" +
	"\n\t\t\t\ttext: row value;" +
	"\n\t\t\t\tleaf: false)" +
	"\n\t\t]" +
	"\n\t]]." +
	"\n\t\"metodiky\"" +
	"\n\tdata do: [:row |" +
	"\n\t\t(skupiny at: row key ifPresent: [:sk |" +
	"\n\t\t\t\"metodika je současně skupinou\"" +
	"\n\t\t\tsk id: row id]" +
	"\n\t\t) ifNil: [ | n |" +
	"\n\t\t\tn := ExtTreeNode new" +
	"\n\t\t\t\tid: row id;" +
	"\n\t\t\t\ttext: row key;" +
	"\n\t\t\t\ticonCls: #'icon-plodina';" +
	"\n\t\t\t\tleaf: true." +
	"\n\t\t\trow value ifNotNil: [" +
	"\n\t\t\t\t(skupiny at: row value) children add: n" +
	"\n\t\t\t] ifNil: [\t\t\t" +
	"\n\t\t\t\tnodes add: n]." +
	"\n\t\t]\t\t\t\t" +
	"\n\t]." +
	"\n\t^ ExtTreeNode new children: nodes",
	null, "2014-01-22T20:45:31Z", "mp", 1);

jst.FYMetodikyPanel.addMethod("createRoot", "", "private", 
	"\t| skupiny data nodes |" +
	"\n\tskupiny := Dictionary new." +
	"\n\tnodes := SortedCollection sortBlock: [:a :b | a text <= b text]." +
	"\n\tdata := Fytoportal data metodiky metodikyPlodin." +
	"\n\t\"nejdříve skupiny\"" +
	"\n\tdata do: [:row | row value ifNotNil: [" +
	"\n\t\tskupiny at: row value value ifAbsentPut: [" +
	"\n\t\t\tnodes add: (ExtTreeNode new" +
	"\n\t\t\t\tid: #skup, row value key;" +
	"\n\t\t\t\ttext: row value value;" +
	"\n\t\t\t\tcls: ((row value value includesSubString: 'Obecné') ifTrue: 'obecne-info' ifFalse: 'skupina-metodik');" +
	"\n\t\t\t\tleaf: false)" +
	"\n\t\t]" +
	"\n\t]]." +
	"\n\t\"metodiky\"" +
	"\n\tdata do: [:row |" +
	"\n\t\t(skupiny at: row key ifPresent: [:sk |" +
	"\n\t\t\t\"metodika je současně skupinou\"" +
	"\n\t\t\tsk id: row id]" +
	"\n\t\t) ifNil: [ | n |" +
	"\n\t\t\tn := ExtTreeNode new" +
	"\n\t\t\t\tid: row id;" +
	"\n\t\t\t\ttext: row key;" +
	"\n\t\t\t\ticonCls: ((row id = #'obecne_informace' " +
	"\n\t\t\t\t\tor: [row value notNil and: [row value key  = #prirucky]]) ifTrue: #prirucka ifFalse: #metodika);" +
	"\n\t\t\t\tleaf: true." +
	"\n\t\t\trow value ifNotNil: [" +
	"\n\t\t\t\t(skupiny at: row value value) children add: n" +
	"\n\t\t\t] ifNil: [\t\t\t" +
	"\n\t\t\t\tnodes add: n]." +
	"\n\t\t]\t\t\t\t" +
	"\n\t]." +
	"\n\t^ ExtTreeNode new children: nodes",
	null, "2014-02-10T14:47:16Z", "mp", 1);

jst.FYMetodikyPanel.addMethod("createRoot", "", "private", 
	"\t| skupiny data nodes root |" +
	"\n\tskupiny := Dictionary new." +
	"\n\tnodes := SortedCollection sortBlock: [:a :b | a text <= b text]." +
	"\n\tdata := Fytoportal data metodiky metodikyPlodin." +
	"\n\t\"nejdříve skupiny\"" +
	"\n\tdata do: [:row | row value ifNotNil: [" +
	"\n\t\tskupiny at: row value value ifAbsentPut: [" +
	"\n\t\t\tnodes add: (ExtTreeNode new" +
	"\n\t\t\t\tid: #skup, row value key;" +
	"\n\t\t\t\ttext: row value value;" +
	"\n\t\t\t\tcls: ((row value value includesSubString: 'Obecné') ifTrue: 'obecne-info' ifFalse: 'skupina-metodik');" +
	"\n\t\t\t\tleaf: false)" +
	"\n\t\t]" +
	"\n\t]]." +
	"\n\t\"metodiky\"" +
	"\n\tdata do: [:row |" +
	"\n\t\t(skupiny at: row key ifPresent: [:sk |" +
	"\n\t\t\t\"metodika je současně skupinou\"" +
	"\n\t\t\tsk id: row id]" +
	"\n\t\t) ifNil: [ | n |" +
	"\n\t\t\tn := ExtTreeNode new" +
	"\n\t\t\t\tid: row id;" +
	"\n\t\t\t\ttext: row key;" +
	"\n\t\t\t\ticonCls: ((row id = #'obecne_informace' " +
	"\n\t\t\t\t\tor: [row value notNil and: [row value key  = #prirucky]]) ifTrue: #prirucka ifFalse: #metodika);" +
	"\n\t\t\t\tleaf: true." +
	"\n\t\t\trow value ifNotNil: [" +
	"\n\t\t\t\t(skupiny at: row value value) children add: n" +
	"\n\t\t\t] ifNil: [\t\t\t" +
	"\n\t\t\t\tnodes add: n]." +
	"\n\t\t]\t\t\t\t" +
	"\n\t]." +
	"\n\troot := ExtTreeNode new." +
	"\n\tnodes select: [:n | n text startsWith: 'Obecné'] thenDo: [:n |" +
	"\n\t\troot children add: (nodes remove: n)]." +
	"\n\troot children addAll: nodes." +
	"\n\t^ root",
	null, "2014-02-10T21:46:46Z", "mp", 1);

jst.FYMetodikyPanel.addMethod("createRoot", "", "private", 
	"\t| skupiny nodes root |" +
	"\n\tnodes := SortedCollection sortBlock: [:a :b | a text <= b text]." +
	"\n\t\"nejdříve skupiny\"" +
	"\n\tskupiny := Dictionary new." +
	"\n\tFytoportal data metodiky nazvySkupin keysAndValuesDo: [:sk :nazev | " +
	"\n\t\tskupiny at: sk put: (nodes add: (ExtTreeNode new" +
	"\n\t\t\tid: #skup, sk;" +
	"\n\t\t\ttext: nazev;" +
	"\n\t\t\tcls: (sk = #prirucky ifTrue: ['obecne-info'] ifFalse: ['skupina-metodik']);" +
	"\n\t\t\tleaf: false))" +
	"\n\t]." +
	"\n\t\"metodiky\"" +
	"\n\tFytoportal data metodiky metodikyPlodin do: [:row |" +
	"\n\t\t(Browser location isPublic and: [row id = #'obecne_informace']) ifTrue: [" +
	"\n\t\t\t\"obecne informace nebudeme pridavat\"" +
	"\n\t\t\t(skupiny at: #prirucky)" +
	"\n\t\t\t\tid: row id;" +
	"\n\t\t\t\ttext: row key" +
	"\n\t\t] ifFalse: [" +
	"\n\t\t\t| n | " +
	"\n\t\t\tn := ExtTreeNode new" +
	"\n\t\t\t\tid: row id;" +
	"\n\t\t\t\ttext: row key;" +
	"\n\t\t\t\ticonCls: ((row id = #'obecne_informace' or: [row value = #prirucky]) " +
	"\n\t\t\t\t\tifTrue: [#prirucka] ifFalse: [#metodika]);" +
	"\n\t\t\t\tleaf: true." +
	"\n\t\t\trow value " +
	"\n\t\t\t\tifNotNil: [(skupiny at: row value) children add: n] " +
	"\n\t\t\t\tifNil: [nodes add: n]." +
	"\n\t\t]" +
	"\n\t]." +
	"\n\t\"prazdne skupiny vyradim\"" +
	"\n\tBrowser location isPublic ifTrue: [" +
	"\n\t\tskupiny keysAndValuesDo: [:sk :n |" +
	"\n\t\t\tn children isEmpty ifTrue: [" +
	"\n\t\t\t\tnodes remove: n]]]." +
	"\n\t\"obecne na zacatek seznamu\"" +
	"\n\troot := ExtTreeNode new." +
	"\n\tnodes select: [:n | n text startsWith: 'Obecné'] thenDo: [:n |" +
	"\n\t\troot children add: (nodes remove: n)]." +
	"\n\troot children addAll: nodes." +
	"\n\t^ root",
	null, "2014-04-15T13:10:27Z", "mp", 1);

jst.FYMetodikyPanel.addMethod("createRoot", "", "private", 
	"\t| skupiny root nodes |" +
	"\n\troot := Fytoportal db loadObject: #skupinyPM." +
	"\n\t\"nejdříve skupiny\"" +
	"\n\tskupiny := Dictionary new." +
	"\n\troot allChildrenDo: [:n | (n id startsWith: #skup) " +
	"\n\t\tifTrue: [skupiny at: (n id allButFirst: 4) put: n]" +
	"\n\t\tifFalse: [skupiny at: n id  put: n]]." +
	"\n\t\"metodiky\"" +
	"\n\tFytoportal data metodiky metodikyPlodin do: [:row |" +
	"\n\t\t(Browser location isPublic and: [row id = #'obecne_informace']) ifTrue: [" +
	"\n\t\t\t\"obecne informace nebudeme pridavat\"" +
	"\n\t\t\t(skupiny at: #prirucky)" +
	"\n\t\t\t\tid: row id;" +
	"\n\t\t\t\ttext: row key" +
	"\n\t\t] ifFalse: [ | n | " +
	"\n\t\t\t\"hledam podle skupiny nebo podle id metodiky\"" +
	"\n\t\t\tn := skupiny at: (row value ifNil: [row id]) ifAbsent: [root]." +
	"\n\t\t\tn id = row id ifFalse: [" +
	"\n\t\t\t\t\"skupina nebo root\"" +
	"\n\t\t\t\tn := n children add: (ExtTreeNode new id: row id; text: row key)]." +
	"\n\t\t\tn " +
	"\n\t\t\t\ticonCls: ((row id = #'obecne_informace' or: [row value = #prirucky]) " +
	"\n\t\t\t\t\tifTrue: [#prirucka] ifFalse: [#metodika]);" +
	"\n\t\t\t\tleaf: true" +
	"\n\t\t]" +
	"\n\t]." +
	"\n\t\"obecne na zacatek seznamu\"" +
	"\n\tnodes := OrderedCollection new." +
	"\n\troot  children select: [:n | n text startsWith: 'Obecné'] thenDo: [:n |" +
	"\n\t\tnodes add: (root children remove: n)]." +
	"\n\tnodes addAll: root children." +
	"\n\t^ root children: nodes",
	null, "2014-04-16T22:00:43Z", "mp"); //fytoportal-ior

jst.FYMetodikyPanel.addMethod("installListeners", "", "initialization", 
	"\tsuper installListeners." +
	"\n\tFytoportal navigator ior metodika" +
	"\n\t\tcomponent: metodiky;" +
	"\n\t\tinstallStandardTreeListeners;" +
	"\n\t\tonEnter: [:path :node | " +
	"\n\t\t\tnode link ifNil: [\"poprve nactu metodiku z databaze\"" +
	"\n\t\t\t\tnode link: (Fytoportal data nactiMetodiku: node id)]." +
	"\n\t\t\tself changed: #metodika with: node].",
	null, "2012-11-11T21:02:45Z", "mp", 1);

jst.FYMetodikyPanel.addMethod("installListeners", "", "initialization", 
	"\tsuper installListeners." +
	"\n\tFytoportal navigator ior metodika" +
	"\n\t\tcomponent: metodiky;" +
	"\n\t\tinstallStandardTreeListeners;" +
	"\n\t\tonEnter: [:path :node | " +
	"\n\t\t\t(node notNil and: [node link isNil]) ifTrue: [" +
	"\n\t\t\t\t\"poprve nactu metodiku z databaze\"" +
	"\n\t\t\t\tnode link: (Fytoportal data nactiMetodiku: node id)]." +
	"\n\t\t\tself changed: #metodika with: node].",
	null, "2013-08-27T21:57:40Z", "mp", 1);

jst.FYMetodikyPanel.addMethod("installListeners", "", "initialization", 
	"\tsuper installListeners." +
	"\n\tFytoportal navigator ior metodika" +
	"\n\t\tcomponent: metodiky;" +
	"\n\t\tinstallStandardTreeListeners;" +
	"\n\t\tonEnter: [:path :node | " +
	"\n\t\t\t(node notNil and: [node link isNil]) ifTrue: [" +
	"\n\t\t\t\t\"poprve nactu metodiku z databaze\"" +
	"\n\t\t\t\tnode link: (Fytoportal data nactiMetodiku: node id)]." +
	"\n\t\t\tFytoportal navigator ior tiskMetodiky isEnabled: node notNil." +
	"\n\t\t\tself changed: #metodika with: node].",
	null, "2013-08-28T09:54:50Z", "mp", 1);

jst.FYMetodikyPanel.addMethod("installListeners", "", "initialization", 
	"\tsuper installListeners." +
	"\n\tFytoportal navigator ior metodika" +
	"\n\t\tcomponent: metodiky;" +
	"\n\t\tinstallStandardTreeListeners;" +
	"\n\t\tonEnter: [:path :node | " +
	"\n\t\t\tnode link ifNil: [\"poprve nactu metodiku z databaze\"" +
	"\n\t\t\t\tnode link: (Fytoportal data nactiMetodiku: node id)]." +
	"\n\t\t\tself metodikaVybrana: node].",
	null, "2013-08-28T20:21:05Z", "mp", 1);

jst.FYMetodikyPanel.addMethod("installListeners", "", "initialization", 
	"\tsuper installListeners." +
	"\n\tFytoportal navigator ior metodika" +
	"\n\t\tcomponent: metodiky;" +
	"\n\t\tinstallStandardTreeListenersWith: [:n | " +
	"\n\t\t\t\"id pouhe skupiny začíná prefixem #skup\"" +
	"\n\t\t\tn isLeaf or: [(n id startsWith: #skup) not]];" +
	"\n\t\tonEnter: [:path :node | " +
	"\n\t\t\tnode link ifNil: [\"poprve nactu metodiku z databaze\"" +
	"\n\t\t\t\tnode link: (Fytoportal data nactiMetodiku: node id)]." +
	"\n\t\t\tself metodikaVybrana: node].",
	null, "2013-12-03T21:18:26Z", "mp", 1);

jst.FYMetodikyPanel.addMethod("installListeners", "", "initialization", 
	"\tsuper installListeners." +
	"\n\tFytoportal navigator ior metodika" +
	"\n\t\tcomponent: metodiky;" +
	"\n\t\tinstallStandardTreeListenersWith: [:n | " +
	"\n\t\t\t\"id pouhe skupiny začíná prefixem #skup\"" +
	"\n\t\t\tn isLeaf or: [(n id startsWith: #skup) not]];" +
	"\n\t\tonEnter: [:path :node | " +
	"\n\t\t\tnode link ifNil: [\"poprve nactu metodiku z databaze\"" +
	"\n\t\t\t\tnode link: (Fytoportal data nactiMetodiku: node id)]." +
	"\n\t\t\tself metodikaVybrana: node]." +
	"\n\tFytoportal navigator ior hledej" +
	"\n\t\tonEnter: [:path :text |" +
	"\n\t\t\tpath label: 'vyhledáno \"', text, '\"'." +
	"\n\t\t\tself hledejText: text];" +
	"\n\t\tonForceStop: [:path :text :last :asyncBlock | " +
	"\n\t\t\thledej value: text." +
	"\n\t\t\tpath enter: text].",
	null, "2014-03-26T20:43:14Z", "mp", 1);

jst.FYMetodikyPanel.addMethod("installListeners", "", "initialization", 
	"\tsuper installListeners." +
	"\n\tFytoportal navigator ior metodika" +
	"\n\t\tcomponent: metodiky;" +
	"\n\t\tinstallStandardTreeListenersWith: [:n | " +
	"\n\t\t\tself lzeVybrat: n];" +
	"\n\t\tonEnter: [:path :node | " +
	"\n\t\t\tnode link ifNil: [\"poprve nactu metodiku z databaze\"" +
	"\n\t\t\t\tnode link: (Fytoportal data nactiMetodiku: node id)]." +
	"\n\t\t\tself metodikaVybrana: node]." +
	"\n\tFytoportal navigator ior hledej" +
	"\n\t\tonEnter: [:path :text |" +
	"\n\t\t\tpath label: 'vyhledáno \"', text, '\"'." +
	"\n\t\t\tself hledejText: text];" +
	"\n\t\tonForceStop: [:path :text :last :asyncBlock | " +
	"\n\t\t\thledej value: text." +
	"\n\t\t\tpath enter: text].",
	null, "2014-04-17T09:35:18Z", "mp", 1);

jst.FYMetodikyPanel.addMethod("installListeners", "", "initialization", 
	"\tsuper installListeners." +
	"\n\tFytoportal navigator ior metodika" +
	"\n\t\tcomponent: metodiky;" +
	"\n\t\tinstallStandardTreeListenersWith: [:n | " +
	"\n\t\t\tself lzeVybrat: n];" +
	"\n\t\tonEnter: [:path :node | | p |" +
	"\n\t\t\tnode link ifNil: [\"poprve nactu metodiku z databaze\"" +
	"\n\t\t\t\tnode link: (Fytoportal data nactiMetodiku: node id)]." +
	"\n\t\t\tp := node parentNode." +
	"\n\t\t\t[p = metodiky root] whileFalse: [" +
	"\n\t\t\t\tpath label: p text, ' > ', path label." +
	"\n\t\t\t\tp := p parentNode]." +
	"\n\t\t\tself metodikaVybrana: node]." +
	"\n\tFytoportal navigator ior hledej" +
	"\n\t\tonEnter: [:path :text |" +
	"\n\t\t\tpath label: 'vyhledáno \"', text, '\"'." +
	"\n\t\t\tself hledejText: text];" +
	"\n\t\tonForceStop: [:path :text :last :asyncBlock | " +
	"\n\t\t\thledej value: text." +
	"\n\t\t\tpath enter: text].",
	null, "2014-04-17T10:02:09Z", "mp", 1);

jst.FYMetodikyPanel.addMethod("installListeners", "", "initialization", 
	"\tsuper installListeners." +
	"\n\tFytoportal navigator ior metodika" +
	"\n\t\tcomponent: metodiky;" +
	"\n\t\tinstallStandardTreeListenersWith: [:n | " +
	"\n\t\t\tself lzeVybrat: n];" +
	"\n\t\tonEnter: [:path :node | | p |" +
	"\n\t\t\tnode link ifNil: [\"poprve nactu metodiku z databaze\"" +
	"\n\t\t\t\tnode link: (Fytoportal data nactiMetodiku: node id)]." +
	"\n\t\t\tp := node parentNode." +
	"\n\t\t\tpath label: node text." +
	"\n\t\t\t[p = metodiky root] whileFalse: [" +
	"\n\t\t\t\tpath label: p text, ' > ', path label." +
	"\n\t\t\t\tp := p parentNode]." +
	"\n\t\t\tself metodikaVybrana: node]." +
	"\n\tFytoportal navigator ior hledej" +
	"\n\t\tonEnter: [:path :text |" +
	"\n\t\t\tpath label: 'vyhledáno \"', text, '\"'." +
	"\n\t\t\tself hledejText: text];" +
	"\n\t\tonForceStop: [:path :text :last :asyncBlock | " +
	"\n\t\t\thledej value: text." +
	"\n\t\t\tpath enter: text].",
	null, "2014-05-12T12:11:34Z", "mp"); //fytoportal-ior

jst.FYMetodikyPanel.addMethod("lzeVybrat:", "n", "private", 
	"\t\"id pouhe skupiny začíná prefixem #skup\"" +
	"\n\t^ n isLeaf or: [(n id startsWith: #skup) not]",
	null, "2014-04-17T09:35:50Z", "mp");

jst.FYMetodikyPanel.addMethod("metodikaVybrana:", "node", "updating", 
	"\tFytoportal navigator ior tiskMetodiky isEnabled: node notNil." +
	"\n\tnode ifNil: [" +
	"\n\t\tmetodiky clearSelectionsSilently: true]." +
	"\n\tself changed: #metodika with: node",
	null, "2013-08-28T20:19:08Z", "mp", 1);

jst.FYMetodikyPanel.addMethod("metodikaVybrana:", "node", "updating", 
	"\tFytoportal navigator ior tiskMetodiky isEnabled: node notNil." +
	"\n\tFytoportal navigator ior metodika link: node link." +
	"\n\tnode ifNil: [" +
	"\n\t\tmetodiky clearSelectionsSilently: true]." +
	"\n\tself changed: #metodika with: node",
	null, "2014-01-02T20:47:26Z", "mp", 2);

jst.FYMetodikyPanel.addMethod("metodikaVybrana:", "node", "updating", 
	"\tFytoportal navigator ior tiskMetodiky isEnabled: node notNil." +
	"\n\tFytoportal navigator ior metodika link: (node ifNotNil: [node link])." +
	"\n\tnode ifNil: [" +
	"\n\t\tmetodiky clearSelectionsSilently: true]." +
	"\n\tself changed: #metodika with: node",
	null, "2014-01-06T08:40:51Z", "mp", 3);

jst.FYMetodikyPanel.addMethod("metodikaVybrana:", "node", "updating", 
	"\tFytoportal navigator ior tiskMetodiky isEnabled: node notNil." +
	"\n\tFytoportal navigator ior metodika link: (node ifNotNil: [node link])." +
	"\n\tnode ifNil: [" +
	"\n\t\tmetodiky clearSelectionsSilently: true]." +
	"\n\tself changed: node link typ with: node",
	null, "2014-02-08T22:15:55Z", "mp", 4);

jst.FYMetodikyPanel.addMethod("metodikaVybrana:", "node", "updating", 
	"\tFytoportal navigator ior metodika link: (node ifNotNil: [node link])." +
	"\n\tnode ifNil: [" +
	"\n\t\tmetodiky clearSelectionsSilently: true]." +
	"\n\tself changed: node link typ with: node",
	null, "2014-02-14T09:31:50Z", "mp"); //fytoportal-ior

jst.FYMetodikyPanel.addMethod("tree", "", "accessing", 
	"\t^ metodiky",
	null, "2014-02-09T20:00:30Z", "mp");

jst.FYMetodikyPanel.addMethod("hledejText:", "aString", "private", 
	"\tself sendEvent: #hledejText: with: aString",
	null, "2014-03-26T13:29:26Z", "mp");

// *** FYIORObsahPanel ***

jst.FYIORObsahPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\twithCardLayout;" +
	"\n\t\tadd: (info := ExtPanel new);" +
	"\n\t\tadd: (obsah := ExtTabPanel new)." +
	"\n\tosnova := Fytoportal data osnovaMetodiky." +
	"\n\tosnova sortedKeys do: [:key |" +
	"\n\t\tobsah add: ((FYTextKapitolyPanel kapitolaId: key) title: (osnova at: key) nazev)].",
	null, "2012-11-15T10:32:16Z", "mp", 1);

jst.FYIORObsahPanel.addMethod("initialize", "", "initialization", 
	"\t| page |" +
	"\n\tsuper initialize" +
	"\n\t\twithCardLayout;" +
	"\n\t\tadd: (info := ExtPanel new" +
	"\n\t\t\twithCenterLayout;" +
	"\n\t\t\tadd: (page := ExtBoxComponent new width: 900; style: 'padding: 5px; background-color: white');" +
	"\n\t\t\tyourself);" +
	"\n\t\tadd: (obsah := ExtTabPanel new)." +
	"\n\tosnova := Fytoportal data osnovaMetodiky." +
	"\n\tosnova sortedKeys do: [:key |" +
	"\n\t\tobsah add: ((FYTextKapitolyPanel kapitolaId: key) title: (osnova at: key) nazev)]." +
	"\n\tpage contents: Fytoportal data iorInfo",
	null, "2013-08-27T10:11:54Z", "mp", 1);

jst.FYIORObsahPanel.addMethod("initialize", "", "initialization", 
	"\t| page |" +
	"\n\tsuper initialize" +
	"\n\t\twithCardLayout;" +
	"\n\t\tadd: (info := ExtTabPanel new" +
	"\n\t\t\tadd: (ExtPanel new" +
	"\n\t\t\t\ttitle: 'O integrované ochraně';" +
	"\n\t\t\t\twithCenterLayout;" +
	"\n\t\t\t\tadd: (page := ExtBoxComponent new cls: 'ior-page ior-info');" +
	"\n\t\t\t\tyourself);" +
	"\n\t\t\tactiveTab:1;" +
	"\n\t\t\tyourself);" +
	"\n\t\tadd: (obsah := ExtTabPanel new)." +
	"\n\tosnova := Fytoportal data osnovaMetodiky." +
	"\n\tosnova sortedKeys do: [:key |" +
	"\n\t\tobsah add: ((FYTextKapitolyPanel kapitolaId: key) title: (osnova at: key) nazev)]." +
	"\n\tpage contents: Fytoportal data iorInfo",
	null, "2013-08-30T15:03:31Z", "mp", 1);

jst.FYIORObsahPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\twithCardLayout." +
	"\n\tpanely := Dictionary new." +
	"\n\t#(obecneInfo prirucka metodika) do: [:typ | | osnova tab |" +
	"\n\t\tosnova := Fytoportal data osnovaMetodiky: typ." +
	"\n\t\ttab := panely at: typ put: ExtTabPanel new." +
	"\n\t\tself add: tab." +
	"\n\t\tosnova sortedKeys do: [:key |" +
	"\n\t\t\ttab add: ((FYTextKapitolyPanel kapitolaId: key) title: (osnova at: key) nazev)]" +
	"\n\t]." +
	"\n\tobsah := panely at: #obecneInfo",
	null, "2014-02-09T16:16:16Z", "mp", 1);

jst.FYIORObsahPanel.addMethod("initialize", "", "initialization", 
	"\t| osnova tab |" +
	"\n\tsuper initialize" +
	"\n\t\twithCardLayout." +
	"\n\tpanely := Dictionary new." +
	"\n\t#(obecneInfo prirucka metodika) do: [:typ |" +
	"\n\t\tosnova := Fytoportal data osnovaMetodiky: typ." +
	"\n\t\ttab := panely at: typ put: ExtTabPanel new." +
	"\n\t\tself add: tab." +
	"\n\t\tosnova sortedKeys do: [:key |" +
	"\n\t\t\ttab add: ((FYTextKapitolyPanel kapitolaId: key) title: (osnova at: key) nazev)]" +
	"\n\t]." +
	"\n\ttab := ExtTabPanel new" +
	"\n\t\tadd: (ExtPanel new " +
	"\n\t\t\ttitle: 'Výsledky hledání';" +
	"\n\t\t\twithCenterLayout;" +
	"\n\t\t\tadd: (ExtBoxComponent new cls: 'ior-page');" +
	"\n\t\t\tyourself);" +
	"\n\t\tactiveTab: 1;" +
	"\n\t\tyourself." +
	"\n\tpanely at: #vyhledano put: (self add: tab)." +
	"\n\tobsah := panely at: #obecneInfo",
	null, "2014-03-26T10:45:28Z", "mp"); //fytoportal-ior

jst.FYIORObsahPanel.addMethod("installListeners", "", "initialization", 
	"\tsuper installListeners." +
	"\n\tobsah on: #tabchange do: [:tp :p | " +
	"\n\t\tFytoportal navigator ior hlavniKapitolaPM enter: p value: p kapitolaId label: p title]." +
	"\n\tFytoportal navigator ior hlavniKapitolaPM" +
	"\n\t\tcomponent: obsah;" +
	"\n\t\tonEnter: [:path :panel | " +
	"\n\t\t\tpanel nactiKapitolu: metodika." +
	"\n\t\t\tself changed: #kapitola1 with: panel kapitola." +
	"\n\t\t\tself changed: #kapitola with: panel podkapitolaId].",
	null, "2013-01-31T10:00:40Z", "mp", 1);

jst.FYIORObsahPanel.addMethod("installListeners", "", "initialization", 
	"\tsuper installListeners." +
	"\n\tobsah on: #tabchange do: [:tp :p | " +
	"\n\t\tFytoportal navigator ior hlavniKapitolaPM enter: p value: p kapitolaId label: p title]." +
	"\n\tFytoportal navigator ior hlavniKapitolaPM" +
	"\n\t\tcomponent: obsah;" +
	"\n\t\tonEnter: [:path :panel | " +
	"\n\t\t\tpanel nactiKapitolu: (metodika at: panel kapitolaId)." +
	"\n\t\t\tself changed: #kapitola1 with: panel kapitola." +
	"\n\t\t\tself changed: #kapitola with: panel podkapitolaId].",
	null, "2013-05-03T09:15:01Z", "mp", 1);

jst.FYIORObsahPanel.addMethod("installListeners", "", "initialization", 
	"\tsuper installListeners." +
	"\n\tobsah on: #tabchange do: [:tp :p | " +
	"\n\t\tFytoportal navigator ior hlavniKapitolaPM enter: p value: p kapitolaId label: p title]." +
	"\n\tFytoportal navigator ior hlavniKapitolaPM" +
	"\n\t\tcomponent: obsah;" +
	"\n\t\tonEnter: [:path :panel | | tree |" +
	"\n\t\t\tpanel nactiKapitolu: (metodika at: panel kapitolaId)." +
	"\n\t\t\tself changed: #kapitola1 with: panel kapitola." +
	"\n\t\t\tself changed: #kapitola with: panel podkapitolaId." +
	"\n\t\t\ttree := Fytoportal navigator ior kapitolaPM component." +
	"\n\t\t\t(tree selectedNode isNil and: [tree root hasChildNodes]) ifTrue: [" +
	"\n\t\t\t\ttree selectionModel selectNode: tree root children first]].",
	null, "2013-05-16T08:31:28Z", "mp", 1);

jst.FYIORObsahPanel.addMethod("installListeners", "", "initialization", 
	"\tsuper installListeners." +
	"\n\tobsah on: #tabchange do: [:tp :p | " +
	"\n\t\tFytoportal navigator ior hlavniKapitolaPM enter: p value: p kapitolaId label: p title]." +
	"\n\tFytoportal navigator ior hlavniKapitolaPM" +
	"\n\t\tcomponent: obsah;" +
	"\n\t\tonEnter: [:path :panel | | tree |" +
	"\n\t\t\tpanel nactiKapitolu: (metodika at: panel kapitolaId)." +
	"\n\t\t\tself changed: #kapitola1 with: panel kapitola." +
	"\n\t\t\tself changed: #kapitola with: panel podkapitolaId." +
	"\n\t\t\ttree := Fytoportal navigator ior kapitolaPM component." +
	"\n\t\t\t(tree selectedNode isNil and: [tree root hasChildNodes]) ifTrue: [" +
	"\n\t\t\t\ttree selectionModel selectNode: tree root children first]];" +
	"\n\t\tonForceStop: [:path :token |" +
	"\n\t\t\t\"najdu panel a aktivuji jej, coz vyvola udalost #tabchange\"" +
	"\n\t\t\t(obsah items asCollection detect: [:ea | ea jstWrapper kapitolaId = token] ifNone: nil) ifNotNilDo: [:p |" +
	"\n\t\t\t\tp jstWrapper activate]].",
	null, "2013-08-19T16:07:39Z", "mp", 1);

jst.FYIORObsahPanel.addMethod("installListeners", "", "initialization", 
	"\tsuper installListeners." +
	"\n\tobsah on: #tabchange do: [:tp :p | p ifNotNil: [" +
	"\n\t\tFytoportal navigator ior hlavniKapitolaPM enter: p value: p kapitolaId label: p title]]." +
	"\n\tFytoportal navigator ior hlavniKapitolaPM" +
	"\n\t\tcomponent: obsah;" +
	"\n\t\tonEnter: [:path :panel | | tree |" +
	"\n\t\t\tpanel nactiKapitolu: (metodika at: panel kapitolaId)." +
	"\n\t\t\tself changed: #kapitola1 with: panel kapitola." +
	"\n\t\t\tself changed: #kapitola with: panel podkapitolaId." +
	"\n\t\t\ttree := Fytoportal navigator ior kapitolaPM component." +
	"\n\t\t\t(tree selectedNode isNil and: [tree root hasChildNodes]) ifTrue: [" +
	"\n\t\t\t\ttree selectionModel selectNode: tree root children first]];" +
	"\n\t\tonForceStop: [:path :token |" +
	"\n\t\t\t\"najdu panel a aktivuji jej, coz vyvola udalost #tabchange\"" +
	"\n\t\t\t(obsah items asCollection detect: [:ea | ea jstWrapper kapitolaId = token] ifNone: nil) ifNotNilDo: [:p |" +
	"\n\t\t\t\tobsah activeItem: 0." +
	"\n\t\t\t\tp jstWrapper activate]].",
	null, "2013-08-20T16:09:58Z", "mp", 1);

jst.FYIORObsahPanel.addMethod("installListeners", "", "initialization", 
	"\tsuper installListeners." +
	"\n\tpanely values do: [:tab | tab on: #tabchange do: [:tp :p | p ifNotNil: [" +
	"\n\t\tFytoportal navigator ior hlavniKapitolaPM enter: p value: p kapitolaId label: p title]]]." +
	"\n\tFytoportal navigator ior hlavniKapitolaPM" +
	"\n\t\tcomponent: self;" +
	"\n\t\tonEnter: [:path :panel | | tree |" +
	"\n\t\t\tpanel nactiKapitolu: (metodika at: panel kapitolaId)." +
	"\n\t\t\tself changed: #kapitola1 with: panel kapitola." +
	"\n\t\t\tself changed: #kapitola with: panel podkapitolaId." +
	"\n\t\t\ttree := Fytoportal navigator ior kapitolaPM component." +
	"\n\t\t\t(tree selectedNode isNil and: [tree root hasChildNodes]) ifTrue: [" +
	"\n\t\t\t\ttree selectionModel selectNode: tree root children first]];" +
	"\n\t\tonForceStop: [:path :token |" +
	"\n\t\t\t\"najdu panel a aktivuji jej, coz vyvola udalost #tabchange\"" +
	"\n\t\t\t(obsah items asCollection detect: [:ea | ea jstWrapper kapitolaId = token] ifNone: nil) ifNotNilDo: [:p |" +
	"\n\t\t\t\tobsah activeItem: 0." +
	"\n\t\t\t\tp jstWrapper activate]].",
	null, "2014-02-09T16:27:09Z", "mp", 1);

jst.FYIORObsahPanel.addMethod("installListeners", "", "initialization", 
	"\tsuper installListeners." +
	"\n\tpanely values do: [:tab | tab on: #tabchange do: [:tp :p | p ifNotNil: [" +
	"\n\t\t\"zde bez zaznamu do historie, to az po zaslani #kapitola\"" +
	"\n\t\tFytoportal navigator ior hlavniKapitolaPM enter: p value: p kapitolaId label: p title]]]." +
	"\n\tFytoportal navigator ior hlavniKapitolaPM" +
	"\n\t\tcomponent: self;" +
	"\n\t\tonEnter: [:path :panel |" +
	"\n\t\t\tpanel nactiKapitolu: (metodika at: panel kapitolaId)." +
	"\n\t\t\tself changed: #kapitola1 with: panel kapitola." +
	"\n\t\t\tself changed: #kapitola with: panel podkapitolaId];" +
	"\n\t\tonForceStop: [:path :token |" +
	"\n\t\t\t\"najdu panel a aktivuji jej, coz vyvola udalost #tabchange\"" +
	"\n\t\t\t(obsah items asCollection detect: [:ea | ea jstWrapper kapitolaId = token] ifNone: nil) ifNotNilDo: [:p |" +
	"\n\t\t\t\tobsah activeItem: 0." +
	"\n\t\t\t\tp jstWrapper activate]].",
	null, "2014-02-11T22:20:28Z", "mp", 1);

jst.FYIORObsahPanel.addMethod("installListeners", "", "initialization", 
	"\tsuper installListeners." +
	"\n\tpanely values allButLast do: [:tab | \"mimo panel hledani, ktery je posledni\"" +
	"\n\t\ttab on: #tabchange do: [:tp :p | p ifNotNil: [" +
	"\n\t\t\t\"zde bez zaznamu do historie, to az po zaslani #kapitola\"" +
	"\n\t\t\tFytoportal navigator ior hlavniKapitolaPM enter: p value: p kapitolaId label: p title]]]." +
	"\n\tFytoportal navigator ior hlavniKapitolaPM" +
	"\n\t\tcomponent: self;" +
	"\n\t\tonEnter: [:path :panel |" +
	"\n\t\t\tpanel nactiKapitolu: (metodika at: panel kapitolaId)." +
	"\n\t\t\tself changed: #kapitola1 with: panel kapitola." +
	"\n\t\t\tself changed: #kapitola with: panel podkapitolaId];" +
	"\n\t\tonForceStop: [:path :token |" +
	"\n\t\t\t\"najdu panel a aktivuji jej, coz vyvola udalost #tabchange\"" +
	"\n\t\t\t(obsah items asCollection detect: [:ea | ea jstWrapper kapitolaId = token] ifNone: nil) ifNotNilDo: [:p |" +
	"\n\t\t\t\tobsah activeItem: 0." +
	"\n\t\t\t\tp jstWrapper activate]].",
	null, "2014-03-26T10:37:23Z", "mp"); //fytoportal-ior

jst.FYIORObsahPanel.addMethod("afterrenderEvent", "", "events", 
	"\t^ [self layout activeItem: 1]",
	null, "2012-11-09T09:12:45Z", "mp", 1);

jst.FYIORObsahPanel.addMethod("afterrenderEvent", "", "events", 
	"\t^ [info activate." +
	"\n\t\tself doLayout]",
	null, "2013-08-27T10:19:11Z", "mp", 1);

jst.FYIORObsahPanel.addMethod("afterrenderEvent", "", "events", 
	"\t^ [obsah activate." +
	"\n\t\tself doLayout]",
	null, "2014-02-09T16:16:24Z", "mp"); //fytoportal-ior

jst.FYIORObsahPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\t(anAspect = #metodika and: [metodika ~= anObject link]) ifTrue: [" +
	"\n\t\tmetodika := anObject link." +
	"\n\t\tself layout activeItem: 2." +
	"\n\t\tobsah activeTab ifNotNilDo: [:p |" +
	"\n\t\t\tFytoportal navigator ior hlavniKapitolaPM " +
	"\n\t\t\t\tvalue: nil; \"je potreba?\"" +
	"\n\t\t\t\tenter: p value: p kapitolaId label: p title]" +
	"\n\t]." +
	"\n\t(anAspect = #kapitola and: [obsah activeTab notNil]) ifTrue: [" +
	"\n\t\tobsah activeTab update: anAspect with: anObject]",
	null, "2013-01-31T09:11:48Z", "mp", 1);

jst.FYIORObsahPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #metodika ifTrue: [anObject " +
	"\n\t\tifNil: [" +
	"\n\t\t\tmetodika := nil." +
	"\n\t\t\tinfo activate]" +
	"\n\t\tifNotNil: [" +
	"\n\t\t\tmetodika := anObject link." +
	"\n\t\t\tobsah activate." +
	"\n\t\t\tobsah activeTab ifNotNilDo: [:p |" +
	"\n\t\t\t\tFytoportal navigator ior hlavniKapitolaPM " +
	"\n\t\t\t\t\tvalue: nil; \"je potreba, aby se prepla stejna kapitola u ruznych metodik\"" +
	"\n\t\t\t\t\tenter: p value: p kapitolaId label: p title]" +
	"\n\t\t]" +
	"\n\t]." +
	"\n\t(anAspect = #kapitola and: [obsah activeTab notNil]) ifTrue: [" +
	"\n\t\tobsah activeTab update: anAspect with: anObject]",
	null, "2013-08-28T07:45:41Z", "mp", 1);

jst.FYIORObsahPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #metodika ifTrue: [anObject " +
	"\n\t\tifNil: [" +
	"\n\t\t\tmetodika := nil." +
	"\n\t\t\tinfo activate]" +
	"\n\t\tifNotNil: [ | tab |" +
	"\n\t\t\tmetodika := anObject link." +
	"\n\t\t\t\"vyvolam #tabchange i na aktivnim panelu\"" +
	"\n\t\t\ttab := obsah activeTab ifNil: [1]." +
	"\n\t\t\tobsah activeTab: 0; activeTab: tab." +
	"\n\t\t\tobsah activate" +
	"\n\t\t]" +
	"\n\t]." +
	"\n\t(anAspect = #kapitola and: [obsah activeTab notNil]) ifTrue: [" +
	"\n\t\tobsah activeTab update: anAspect with: anObject]",
	null, "2013-09-03T12:40:33Z", "mp", 1);

jst.FYIORObsahPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #metodika ifTrue: [anObject " +
	"\n\t\tifNil: [" +
	"\n\t\t\tmetodika := nil." +
	"\n\t\t\tinfo activate]" +
	"\n\t\tifNotNil: [ | tab |" +
	"\n\t\t\tmetodika := anObject link." +
	"\n\t\t\t\"vyvolam #tabchange i na aktivnim panelu\"" +
	"\n\t\t\ttab := obsah activeTab ifNil: [1]." +
	"\n\t\t\tobsah activeTab: 0; activeTab: tab." +
	"\n\t\t\tobsah activate" +
	"\n\t\t]" +
	"\n\t]." +
	"\n\t(anAspect = #kapitola | (anAspect = #zmenaVyberuKapitol) and: [obsah activeTab notNil]) ifTrue: [" +
	"\n\t\tobsah activeTab update: anAspect with: anObject]",
	null, "2013-09-27T08:11:29Z", "mp", 1);

jst.FYIORObsahPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #metodika ifTrue: [anObject " +
	"\n\t\tifNil: [" +
	"\n\t\t\tmetodika := nil." +
	"\n\t\t\tinfo activate]" +
	"\n\t\tifNotNil: [ | tab |" +
	"\n\t\t\tmetodika := anObject link." +
	"\n\t\t\t\"vyvolam #tabchange i na aktivnim panelu\"" +
	"\n\t\t\ttab := obsah activeTab ifNil: [1]." +
	"\n\t\t\tobsah activeTab: 0; activeTab: tab." +
	"\n\t\t\tobsah activate" +
	"\n\t\t]" +
	"\n\t]." +
	"\n\t(anAspect = #kapitola and: [obsah activeTab notNil]) ifTrue: [" +
	"\n\t\tobsah activeTab update: anAspect with: anObject]." +
	"\n\tanAspect = #zmenaVyberuKapitol ifTrue: [" +
	"\n\t\tobsah activeTab update: anAspect with: anObject." +
	"\n\t\tanObject = #plodiny ifTrue: [obsah items do: [:p |" +
	"\n\t\t\tp jeKapitolaSO ifTrue: [" +
	"\n\t\t\t\tp update: anAspect with: anObject]]]]",
	null, "2013-10-08T20:51:56Z", "mp", 1);

jst.FYIORObsahPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tpanely at: anAspect ifPresent: [:p | | tab |" +
	"\n\t\tobsah := p." +
	"\n\t\tmetodika := anObject link." +
	"\n\t\t\"vyvolam #tabchange i na aktivnim panelu\"" +
	"\n\t\ttab := obsah activeTab ifNil: [1]." +
	"\n\t\tobsah activeTab: 0; activeTab: tab." +
	"\n\t\tobsah activate" +
	"\n\t]." +
	"\n\t(anAspect = #kapitola and: [obsah activeTab notNil]) ifTrue: [" +
	"\n\t\tobsah activeTab update: anAspect with: anObject]." +
	"\n\tanAspect = #zmenaVyberuKapitol ifTrue: [" +
	"\n\t\tobsah activeTab update: anAspect with: anObject." +
	"\n\t\tanObject = #plodiny ifTrue: [obsah items do: [:p |" +
	"\n\t\t\tp jeKapitolaSO ifTrue: [" +
	"\n\t\t\t\tp update: anAspect with: anObject]]]]",
	null, "2014-02-09T16:20:12Z", "mp", 1);

jst.FYIORObsahPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tpanely at: anAspect ifPresent: [:p | | tab |" +
	"\n\t\tobsah := p." +
	"\n\t\tmetodika := anObject link." +
	"\n\t\t\"vyvolam #tabchange i na aktivnim panelu\"" +
	"\n\t\ttab := obsah activeTab ifNil: [1]." +
	"\n\t\tobsah activeTab: 0; activeTab: tab." +
	"\n\t\tobsah activate" +
	"\n\t]." +
	"\n\t(anAspect = #kapitola and: [obsah activeTab notNil]) ifTrue: [" +
	"\n\t\tobsah activeTab update: anAspect with: anObject]." +
	"\n\tanAspect = #zmenaVyberuKapitol ifTrue: [" +
	"\n\t\t\"aktivni panel dostane zpravu vzdy\"" +
	"\n\t\tobsah activeTab update: anAspect with: anObject." +
	"\n\t\t\"pokud se zmeni plodiny, zpravu dostane taky panel abionoz, chorob a skudcu\"" +
	"\n\t\tanObject = #plodiny ifTrue: [obsah items do: [:p |" +
	"\n\t\t\tp jeKapitolaSO ifTrue: [" +
	"\n\t\t\t\tp update: anAspect with: anObject]]]]",
	null, "2014-02-21T13:44:10Z", "mp", 1);

jst.FYIORObsahPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tpanely at: anAspect ifPresent: [:p | | tab |" +
	"\n\t\tobsah := p." +
	"\n\t\tmetodika := anObject link." +
	"\n\t\t\"vyvolam #tabchange i na aktivnim panelu\"" +
	"\n\t\ttab := obsah activeTab ifNil: [1]." +
	"\n\t\tobsah activeTab: 0; activeTab: tab." +
	"\n\t\tobsah activate" +
	"\n\t]." +
	"\n\t(anAspect = #kapitola and: [obsah activeTab notNil]) ifTrue: [" +
	"\n\t\tobsah activeTab update: anAspect with: anObject]." +
	"\n\tanAspect = #zmenaVyberuKapitol ifTrue: [" +
	"\n\t\t\"aktivni panel dostane zpravu vzdy\"" +
	"\n\t\tobsah activeTab update: anAspect with: anObject." +
	"\n\t\t\"pokud se zmeni plodiny, zpravu dostanou i ostatni panely\"" +
	"\n\t\tanObject = #plodiny ifTrue: [obsah items do: [:p |" +
	"\n\t\t\tp = obsah activeTab ifFalse: [" +
	"\n\t\t\t\tp update: anAspect with: anObject]]]]",
	null, "2014-03-18T16:26:44Z", "mp"); //fytoportal-ior

jst.FYIORObsahPanel.addMethod("hledejText:", "aString", "events", 
	"\tnalezenyText = aString ifFalse: [" +
	"\n\t\t| p |" +
	"\n\t\tp := (panely at: #vyhledano) items first activeItem." +
	"\n\t\tp htmlContents: [:html | html div" +
	"\n\t\t\tclass: 'hledejTextIOR';" +
	"\n\t\t\twith: 'Prohledávám metodiky, čekejte...']." +
	"\n\t\t(Fytoportal data metodiky texty listNamed: #najdiText)" +
	"\n\t\t\tdataClass: FYNalezenaKapitolaPM;" +
	"\n\t\t\turlParams: 'text' -> aString; " +
	"\n\t\t\tasyncQueryDo: [:data | " +
	"\n\t\t\t\tnalezenyText := aString." +
	"\n\t\t\t\tp htmlContents: [:html | data withIndexDo: [:ea :i | " +
	"\n\t\t\t\t\tea poradi: i." +
	"\n\t\t\t\t\tea renderOn: html]]]" +
	"\n\t]." +
	"\n\t\"hledam jen pri zmene, aktivuji vzdy\"" +
	"\n\t(panely at: #vyhledano) activate",
	null, "2014-03-26T22:18:48Z", "mp", 1);

jst.FYIORObsahPanel.addMethod("hledejText:", "aString", "events", 
	"\tnalezenyText = aString ifFalse: [" +
	"\n\t\t| p |" +
	"\n\t\tp := (panely at: #vyhledano) items first activeItem." +
	"\n\t\tp htmlContents: [:html | html div" +
	"\n\t\t\tclass: 'hledejTextIOR';" +
	"\n\t\t\twith: 'Prohledávám metodiky, čekejte...']." +
	"\n\t\t(Fytoportal data metodiky texty listNamed: #najdiText)" +
	"\n\t\t\tdataClass: FYNalezenaKapitolaPM;" +
	"\n\t\t\turlParams: 'text' -> aString; " +
	"\n\t\t\tasyncQueryDo: [:data | " +
	"\n\t\t\t\tnalezenyText := aString." +
	"\n\t\t\t\tp htmlContents: [:html | " +
	"\n\t\t\t\t\tdata ifEmpty: [html div class: 'kapitola'; with: [html span class: 'obsah'; " +
	"\n\t\t\t\t\t\twith: 'Nebyla nalezena žádná kapitola obsahující zadaný text \"', aString, '\"...']]." +
	"\n\t\t\t\t\tdata withIndexDo: [:ea :i | ea " +
	"\n\t\t\t\t\t\tporadi: i;" +
	"\n\t\t\t\t\t\toznacText: aString;" +
	"\n\t\t\t\t\t\trenderOn: html]" +
	"\n\t\t\t\t]" +
	"\n\t\t\t]" +
	"\n\t]." +
	"\n\t\"hledam jen pri zmene, aktivuji vzdy\"" +
	"\n\t(panely at: #vyhledano) activate",
	null, "2014-03-27T15:17:23Z", "mp", 1);

jst.FYIORObsahPanel.addMethod("hledejText:", "aString", "events", 
	"\t\"hledam jen pri zmene, aktivuji vzdy\"" +
	"\n\tnalezenyText = aString ifFalse: [" +
	"\n\t\tself vysledkyHledaniPanel htmlContents: [:html | " +
	"\n\t\t\thtml div" +
	"\n\t\t\t\tclass: 'hledejTextIOR';" +
	"\n\t\t\t\twith: 'Prohledávám metodiky, čekejte...']." +
	"\n\t\t(Fytoportal data metodiky texty listNamed: #najdiText)" +
	"\n\t\t\tdataClass: FYNalezenaKapitolaPM;" +
	"\n\t\t\turlParams: 'text' -> aString; " +
	"\n\t\t\tasyncQueryDo: [:data |" +
	"\n\t\t\t\tnalezenyText := aString." +
	"\n\t\t\t\tself renderujVysledkyHledani: data" +
	"\n\t\t\t]" +
	"\n\t]." +
	"\n\t(panely at: #vyhledano) activate",
	null, "2014-03-27T21:21:06Z", "mp", 1);

jst.FYIORObsahPanel.addMethod("hledejText:", "aString", "events", 
	"\t\"hledam jen pri zmene, aktivuji vzdy\"" +
	"\n\tnalezenyText = aString ifFalse: [" +
	"\n\t\tself vysledkyHledaniPanel htmlContents: [:html | " +
	"\n\t\t\thtml div" +
	"\n\t\t\t\tclass: 'hledejTextIOR';" +
	"\n\t\t\t\twith: 'Prohledávám metodiky, čekejte...']." +
	"\n\t\t(Fytoportal data metodiky texty listNamed: #najdiText)" +
	"\n\t\t\tdataClass: FYNalezenaKapitolaPM;" +
	"\n\t\t\turlParams: 'text' -> aString; " +
	"\n\t\t\tasyncQueryDo: [:data |" +
	"\n\t\t\t\tnalezenyText := aString." +
	"\n\t\t\t\tself renderujVysledkyHledani: (self pripravVysledkyHledani: data)" +
	"\n\t\t\t]" +
	"\n\t]." +
	"\n\t(panely at: #vyhledano) activate",
	null, "2014-05-10T08:51:00Z", "mp"); //fytoportal-ior

jst.FYIORObsahPanel.addMethod("pripravVysledkyHledani:", "data", "private", 
	"\t| taxony metodiky odstranDupl |" +
	"\n\t\"blok pro odstraneni duplicitnich taxonu\"" +
	"\n\todstranDupl := [:ea | ea taxon ifNil: [(taxony detect: [:tax | " +
	"\n\t\ttax nazev startsWith: ea nazev] ifNone: nil) ifNotNilDo: [:tax | " +
	"\n\t\t\ttaxony := taxony copyWithout: tax]]]." +
	"\n\t\"plodiny\"" +
	"\n\ttaxony := data select: [:ea | ea taxon notNil and: [ea typ = #FYPlodina]]." +
	"\n\ttaxony isEmpty ifFalse: [" +
	"\n\t\tdata do: odstranDupl]." +
	"\n\ttaxony isEmpty ifFalse: [" +
	"\n\t\tmetodiky := Fytoportal data metodiky podleTaxonu lookupKeys: (taxony collect: [:ea | ea taxon])." +
	"\n\t\ttaxony do: [:ea | " +
	"\n\t\t\tea id: 'plodiny.', ea taxon." +
	"\n\t\t\tmetodiky select: [:row | ea taxon = row key] thenDo: [:row | " +
	"\n\t\t\t\tea refs addUnique: row value -> row id]" +
	"\n\t\t]" +
	"\n\t]." +
	"\n\t\"skodl.org.\"" +
	"\n\ttaxony := data select: [:ea | ea taxon notNil and: [ea typ = #FYSkodlOrg]]." +
	"\n\ttaxony isEmpty ifFalse: [" +
	"\n\t\tdata do: odstranDupl]." +
	"\n\ttaxony isEmpty ifFalse: [" +
	"\n\t\t\"nejdrive najdu id metodik SO podle taxonu...\"" +
	"\n\t\tmetodiky := Fytoportal data metodiky podleTaxonu lookupKeys: (taxony collect: [:ea | ea taxon])." +
	"\n\t\tmetodiky isEmpty ifFalse: [" +
	"\n\t\t\ttaxony := metodiky collect: [:m | " +
	"\n\t\t\t\t(taxony detect: [:ea | ea taxon = m key]) id: m id]." +
	"\n\t\t\t\"pak metodiky PM podle id metodik SO\"" +
	"\n\t\t\tmetodiky := Fytoportal data metodiky podleMetodikSO lookupKeys: (taxony collect: [:ea | ea id])." +
	"\n\t\t\ttaxony do: [:ea | (metodiky select: [:row | ea id = row key]) ifNotEmptyDo: [:rows |" +
	"\n\t\t\t\tea id: (rows first value at: #kapitola), '.', ea id." +
	"\n\t\t\t\trows do: [:row | " +
	"\n\t\t\t\t\tea refs addUnique: (row value at: #metodika) -> row id]]" +
	"\n\t\t\t]" +
	"\n\t\t]" +
	"\n\t]." +
	"\n\t^ data select: [:ea | " +
	"\n\t\tea metodika notNil or: [ea refs isEmpty not]]",
	null, "2014-05-12T09:05:55Z", "mp");

jst.FYIORObsahPanel.addMethod("vysledkyHledaniPanel", "", "private", 
	"\t^  (panely at: #vyhledano) items first activeItem",
	null, "2014-03-27T21:15:48Z", "mp");

jst.FYIORObsahPanel.addMethod("renderujVysledkyHledani:", "data", "private", 
	"\t | oznac |" +
	"\n\toznac := RegExp new" +
	"\n\t\tpattern: nalezenyText asSearchPattern;" +
	"\n\t\tglobal: true;" +
	"\n\t\tignoreCase: true;" +
	"\n\t\treplaceWith: [:str | '<mark>', str, '</mark>']." +
	"\n\tself vysledkyHledaniPanel htmlContents: [:html | " +
	"\n\t\tdata ifEmpty: [html div class: 'kapitola'; with: [html span class: 'obsah'; " +
	"\n\t\t\twith: 'Nebyla nalezena žádná kapitola obsahující zadaný text \"', nalezenyText, '\"...']]." +
	"\n\t\tdata withIndexDo: [:ea :i | ea " +
	"\n\t\t\tporadi: i;" +
	"\n\t\t\toznacText: oznac;" +
	"\n\t\t\trenderOn: html]" +
	"\n\t]" +
	"\n\t",
	null, "2014-03-27T21:18:09Z", "mp", 1);

jst.FYIORObsahPanel.addMethod("renderujVysledkyHledani:", "data", "private", 
	"\t | oznac |" +
	"\n\toznac := RegExp new" +
	"\n\t\tpattern: nalezenyText asSearchPattern;" +
	"\n\t\tglobal: true;" +
	"\n\t\tignoreCase: true;" +
	"\n\t\treplaceWith: [:str | '<mark>', str, '</mark>']." +
	"\n\tself vysledkyHledaniPanel htmlContents: [:html | " +
	"\n\t\thtml div class: 'kapitola'; with: [html div class: 'obsah'; with: (" +
	"\n\t\t\t'Výsledky hledání pro zadaný text \"{1}\" (počet nalezených kapitol: {2}):' " +
	"\n\t\t\t\tformat: {nalezenyText. data size})]." +
	"\n\t\tdata withIndexDo: [:ea :i | ea " +
	"\n\t\t\tporadi: i;" +
	"\n\t\t\toznacText: oznac;" +
	"\n\t\t\trenderOn: html]" +
	"\n\t]" +
	"\n\t",
	null, "2014-03-28T08:11:51Z", "mp"); //fytoportal-ior

// *** FYKapitolaPanel ***

jst.FYKapitolaPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\tsingleExpand: false;" +
	"\n\t\ttitle: 'Kapitola metodiky'." +
	"\n\toznacKapitolu := [:node :checked | vyberKapitol at: node link id put: checked]." +
	"\n\toznacPolozku :=  [:node :checked | vyberKapitol at: node id put: checked]." +
	"\n\t",
	null, "2012-11-12T16:15:19Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\tsingleExpand: false;" +
	"\n\t\ttitle: 'Kapitola metodiky'." +
	"\n\toznacKapitolu := [:node :checked | vyberKapitol at: node id put: checked]",
	null, "2013-05-30T09:18:56Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\tsingleExpand: false;" +
	"\n\t\ttitle: 'Kapitola metodiky'." +
	"\n\toznacKapitolu := [:node :checked | | skocinId |" +
	"\n\t\tvyberKapitol at: node id put: checked." +
	"\n\t\t(skocinId := node id copyUpTo: #'@') = node id ifTrue: [" +
	"\n\t\t\tskocinId := nil]." +
	"\n\t\t(node id = kapitola id or: [skocinId isNil and: [(vyberKapitol jeVybrana: kapitola id) not]] or: [" +
	"\n\t\t\tskocinId notNil and: [(node id endsWith: #vse) " +
	"\n\t\t\t\tor: [(vyberKapitol jeVybrana: skocinId, #'@', #vse) not]]]) ifTrue: [" +
	"\n\t\t\t\"klikam na 'vsechny kapitoly' nebo na konkretni kapitolu/taxon, pak ale nesmi byt 'vse' zaskrtnuto\"" +
	"\n\t\t\t[self changed: #zmenaVyberuKapitol with: node id] delayed: 10]]",
	null, "2013-09-27T14:59:37Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\tsingleExpand: false;" +
	"\n\t\ttitle: 'Kapitola metodiky'." +
	"\n\toznacKapitolu := [:node :checked | | skocinId |" +
	"\n\t\tvyberKapitol at: node id put: checked." +
	"\n\t\t((self selectedNode id startsWith: kapitola id)" +
	"\n\t\t\tifTrue: [vyberKapitol zmenenTiskKap: kapitola vyberem: node id]" +
	"\n\t\t\tifFalse: [ | soId | \"dohledam vybranou kapitolu skudce/choroby/abionozy\"" +
	"\n\t\t\t\tsoId := self selectedNode id copyUpTo: #'@'." +
	"\n\t\t\t\t\"nesmim klikat na jiny SO, jen do kapitol obecne casti nebo daneho SO\"" +
	"\n\t\t\t\t((node id startsWith: kapitola id, '.') or: [node id startsWith: soId, #'@']) and: [" +
	"\n\t\t\t\tvyberKapitol zmenenTiskKapSO: " +
	"\n\t\t\t\t\t(kapitola obsah detect: [:k | k id = soId]) vyberem: node id]]" +
	"\n\t\t) ifTrue: [self inform: 'zmena'." +
	"\n\t\t\t[self changed: #zmenaVyberuKapitol with: node id] delayed: 10]" +
	"\n\t]",
	null, "2013-09-30T08:54:13Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\tsingleExpand: false;" +
	"\n\t\ttitle: 'Kapitola metodiky'." +
	"\n\toznacKapitolu := [:node :checked | | skocinId |" +
	"\n\t\tvyberKapitol kapitola: kapitola id podkapitola: node id vyber: checked." +
	"\n\t\t((self selectedNode id startsWith: kapitola id)" +
	"\n\t\t\tifTrue: [vyberKapitol zmenenTextKap: kapitola vyberem: node id]" +
	"\n\t\t\tifFalse: [ | kapSO | \"dohledam vybranou kapitolu skudce/choroby/abionozy\"" +
	"\n\t\t\t\tkapSO := self selectedNode id copyUpTo: #'@'." +
	"\n\t\t\t\tkapSO := kapitola obsah detect: [:k | k id = kapSO]." +
	"\n\t\t\t\tvyberKapitol zmenenTextKapSO: kapSO vyberem: node id]" +
	"\n\t\t) ifTrue: [self inform: 'zmena'." +
	"\n\t\t\t[self changed: #zmenaVyberuKapitol with: node id] delayed: 10]" +
	"\n\t]",
	null, "2013-10-03T19:52:35Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\tsingleExpand: false;" +
	"\n\t\ttitle: 'Kapitola metodiky'." +
	"\n\toznacKapitolu := [:node :checked | | skocinId |" +
	"\n\t\tvyberKapitol kapitola: kapitola id podkapitola: node id vyber: checked." +
	"\n\t\t((kapitola id = #plodiny or: [self selectedNode id startsWith: kapitola id])" +
	"\n\t\t\tifTrue: [vyberKapitol zmenenTextKap: kapitola vyberem: node id]" +
	"\n\t\t\tifFalse: [ | kapSO | \"dohledam vybranou kapitolu skudce/choroby/abionozy\"" +
	"\n\t\t\t\tkapSO := self selectedNode id copyUpTo: #'@'." +
	"\n\t\t\t\tkapSO := kapitola obsah detect: [:k | k id = kapSO]." +
	"\n\t\t\t\tvyberKapitol zmenenTextKapSO: kapSO vyberem: node id]" +
	"\n\t\t) ifTrue: [" +
	"\n\t\t\t[self changed: #zmenaVyberuKapitol with: node id] delayed: 10]" +
	"\n\t]",
	null, "2013-10-08T06:56:29Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\tsingleExpand: false;" +
	"\n\t\ttitle: 'Kapitola metodiky'." +
	"\n\toznacKapitolu := [:node :checked | | skocinId |" +
	"\n\t\tvyberKapitol kapitola: kapitola id podkapitola: node id vyber: checked." +
	"\n\t\t((kapitola id = #plodiny or: [self selectedNode id startsWith: kapitola id])" +
	"\n\t\t\tifTrue: [vyberKapitol zmenenTextKap: kapitola vyberem: node id]" +
	"\n\t\t\tifFalse: [ | kapSO | \"dohledam vybranou kapitolu skudce/choroby/abionozy\"" +
	"\n\t\t\t\tkapSO := self selectedNode id copyUpTo: #'@'." +
	"\n\t\t\t\tkapSO := kapitola obsah detect: [:k | k id = kapSO]." +
	"\n\t\t\t\tvyberKapitol zmenenTextKapSO: kapSO vyberem: node id]" +
	"\n\t\t) ifTrue: [" +
	"\n\t\t\t[self changed: #zmenaVyberuKapitol with: kapitola id] delayed: 10]" +
	"\n\t]",
	null, "2013-10-08T20:31:53Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\tsingleExpand: false;" +
	"\n\t\ttitle: 'Kapitola metodiky'." +
	"\n\tzmenVyberKapitol := DelayedTask new " +
	"\n\t\tdelay: 500; " +
	"\n\t\ttask: [self changed: #zmenaVyberuKapitol with: kapitola id]." +
	"\n\toznacKapitolu := [:node :checked | | skocinId |" +
	"\n\t\tvyberKapitol kapitola: kapitola id podkapitola: node id vyber: checked." +
	"\n\t\t((kapitola id = #plodiny or: [self selectedNode id startsWith: kapitola id])" +
	"\n\t\t\tifTrue: [vyberKapitol zmenenTextKap: kapitola vyberem: node id]" +
	"\n\t\t\tifFalse: [ | kapSO | \"dohledam vybranou kapitolu skudce/choroby/abionozy\"" +
	"\n\t\t\t\tkapSO := self selectedNode id copyUpTo: #'@'." +
	"\n\t\t\t\tkapSO := kapitola obsah detect: [:k | k id = kapSO] ifNone: [" +
	"\n\t\t\t\t\t(kapitola metodika obecnaMetodika at: kapitola id) obsah detect: [:k | k id = kapSO]]." +
	"\n\t\t\t\tvyberKapitol zmenenTextKapSO: kapSO vyberem: node id]" +
	"\n\t\t) ifTrue: [" +
	"\n\t\t\tzmenVyberKapitol run]" +
	"\n\t]",
	null, "2013-12-29T22:46:57Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\tsingleExpand: false;" +
	"\n\t\ttitle: 'Kapitola metodiky'." +
	"\n\tzmenVyberKapitol := DelayedTask new " +
	"\n\t\tdelay: 500; " +
	"\n\t\ttask: [self changed: #zmenaVyberuKapitol with: kapitola id]." +
	"\n\toznacKapitolu := [:node :checked | | skocinId |" +
	"\n\t\tvyberKapitol kapitola: kapitola id podkapitola: node id vyber: checked." +
	"\n\t\t((kapitola id = #plodiny or: [self selectedNode isNil] or: [self selectedNode id startsWith: kapitola id])" +
	"\n\t\t\tifTrue: [vyberKapitol zmenenTextKap: kapitola vyberem: node id]" +
	"\n\t\t\tifFalse: [ | kapSO | \"dohledam vybranou kapitolu skudce/choroby/abionozy\"" +
	"\n\t\t\t\tkapSO := self selectedNode id copyUpTo: #'@'." +
	"\n\t\t\t\tkapSO := kapitola obsah detect: [:k | k id = kapSO] ifNone: [" +
	"\n\t\t\t\t\t(kapitola metodika obecnaMetodika at: kapitola id) obsah detect: [:k | k id = kapSO]]." +
	"\n\t\t\t\tvyberKapitol zmenenTextKapSO: kapSO vyberem: node id]" +
	"\n\t\t) ifTrue: [" +
	"\n\t\t\tzmenVyberKapitol run]" +
	"\n\t]",
	null, "2013-12-30T12:49:08Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\tsingleExpand: false;" +
	"\n\t\ttitle: 'Kapitola metodiky'." +
	"\n\tzmenVyberKapitol := DelayedTask new " +
	"\n\t\tdelay: 500; " +
	"\n\t\ttask: [self changed: #zmenaVyberuKapitol with: kapitola id]." +
	"\n\toznacKapitolu := [:node :checked | | skocinId |" +
	"\n\t\tvyberKapitol kapitola: kapitola id podkapitola: node id vyber: checked." +
	"\n\t\tFytoportal data ulozVyberKapitolPM." +
	"\n\t\t((kapitola id = #plodiny or: [self selectedNode isNil] or: [self selectedNode id startsWith: kapitola id])" +
	"\n\t\t\tifTrue: [vyberKapitol zmenenTextKap: kapitola vyberem: node id]" +
	"\n\t\t\tifFalse: [ | kapSO | \"dohledam vybranou kapitolu skudce/choroby/abionozy\"" +
	"\n\t\t\t\tkapSO := self selectedNode id copyUpTo: #'@'." +
	"\n\t\t\t\tkapSO := kapitola obsah detect: [:k | k id = kapSO] ifNone: [" +
	"\n\t\t\t\t\t(kapitola metodika obecnaMetodika at: kapitola id) obsah detect: [:k | k id = kapSO]]." +
	"\n\t\t\t\tvyberKapitol zmenenTextKapSO: kapSO vyberem: node id]" +
	"\n\t\t) ifTrue: [" +
	"\n\t\t\tzmenVyberKapitol run]" +
	"\n\t]",
	null, "2014-01-06T08:17:58Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\tsingleExpand: false;" +
	"\n\t\ttitle: 'Kapitola metodiky'." +
	"\n\tzmenVyberKapitol := DelayedTask new " +
	"\n\t\tdelay: 500; " +
	"\n\t\ttask: [self changed: #zmenaVyberuKapitol with: kapitola id]." +
	"\n\toznacKapitolu := [:node :checked | | skocinId |" +
	"\n\t\tvyberKapitol kapitola: kapitola id podkapitola: node id vyber: checked." +
	"\n\t\tkapitola jeKapitolaSO ifFalse: [" +
	"\n\t\t\tvyberKapitol kapitola: kapitola id podkapitola: node id, '.vse' vyber: checked]." +
	"\n\t\tFytoportal data ulozVyberKapitolPM." +
	"\n\t\t((kapitola id = #plodiny or: [self selectedNode isNil] or: [self selectedNode id startsWith: kapitola id])" +
	"\n\t\t\tifTrue: [vyberKapitol zmenenTextKap: kapitola vyberem: node id]" +
	"\n\t\t\tifFalse: [ | kapSO | \"dohledam vybranou kapitolu skudce/choroby/abionozy\"" +
	"\n\t\t\t\tkapSO := self selectedNode id copyUpTo: #'@'." +
	"\n\t\t\t\tkapSO := kapitola obsah detect: [:k | k id = kapSO]." +
	"\n\t\t\t\tvyberKapitol zmenenTextKapSO: kapSO vyberem: node id]" +
	"\n\t\t) ifTrue: [" +
	"\n\t\t\tzmenVyberKapitol run]" +
	"\n\t]",
	null, "2014-03-13T22:28:21Z", "mp"); //fytoportal-ior

jst.FYKapitolaPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #metodika ifTrue: [" +
	"\n\t\tmetodika := anObject link." +
	"\n\t\tvyberKapitol := (Fytoportal data vyberKapitolPM at: anObject id)." +
	"\n\t\t^ self]." +
	"\n\t(anAspect = #kapitola1 and: [kapitola ~= anObject]) ifTrue: [" +
	"\n\t\tself kapitola: anObject]",
	null, "2013-01-11T23:30:17Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\t(anAspect = #kapitola1 and: [kapitola ~= anObject]) ifTrue: [" +
	"\n\t\t(kapitola isNil or: [kapitola metodika ~= anObject metodika]) ifTrue: [" +
	"\n\t\t\tvyberKapitol := (Fytoportal data vyberKapitolPM at: anObject metodika id).]." +
	"\n\t\tself kapitola: anObject]",
	null, "2013-01-15T23:13:45Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\t(anAspect = #kapitola1 and: [kapitola ~= anObject]) ifTrue: [" +
	"\n\t\t(kapitola isNil or: [kapitola metodika ~= anObject metodika]) ifTrue: [" +
	"\n\t\t\tvyberKapitol := (Fytoportal data vyberKapitolPM at: anObject metodika id).]." +
	"\n\t\tself kapitola: anObject]." +
	"\n\t(anAspect = #kapitola and: [anObject notNil]) ifTrue: [" +
	"\n\t\tself selectNodeBy: [:n | n id = anObject] silently: false]",
	null, "2013-01-31T11:02:45Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\t(anAspect = #kapitola1 and: [kapitola ~= anObject]) ifTrue: [" +
	"\n\t\t(kapitola isNil or: [kapitola metodika ~= anObject metodika]) ifTrue: [" +
	"\n\t\t\tvyberKapitol := (Fytoportal data vyberKapitolPM at: anObject metodika id).]." +
	"\n\t\tself kapitola: anObject]." +
	"\n\t(anAspect = #kapitola and: [anObject notNil]) ifTrue: [" +
	"\n\t\t(self selectNodeBy: [:n | n id = anObject] silently: false) expand]",
	null, "2013-05-16T07:52:08Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #metodika ifTrue: [" +
	"\n\t\tself isEnabled: anObject notNil]." +
	"\n\t(anAspect = #kapitola1 and: [kapitola ~= anObject]) ifTrue: [" +
	"\n\t\t(kapitola isNil or: [kapitola metodika ~= anObject metodika]) ifTrue: [" +
	"\n\t\t\tvyberKapitol := (Fytoportal data vyberKapitolPM at: anObject metodika id).]." +
	"\n\t\tself kapitola: anObject]." +
	"\n\t(anAspect = #kapitola and: [anObject notNil]) ifTrue: [" +
	"\n\t\t(self selectNodeBy: [:n | n id = anObject] silently: false) expand]",
	null, "2013-08-28T07:53:24Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #metodika ifTrue: [" +
	"\n\t\t\"je-li metodika nil, nemazu obsah ale jednoduse jen nastavim disabled\"" +
	"\n\t\tself isDisabled: (anObject isNil and: [self root hasChildNodes])]." +
	"\n\t(anAspect = #kapitola1 and: [kapitola ~= anObject]) ifTrue: [" +
	"\n\t\t(kapitola isNil or: [kapitola metodika ~= anObject metodika]) ifTrue: [" +
	"\n\t\t\tvyberKapitol := (Fytoportal data vyberKapitolPM at: anObject metodika id).]." +
	"\n\t\tself kapitola: anObject]." +
	"\n\t(anAspect = #kapitola and: [anObject notNil]) ifTrue: [" +
	"\n\t\t(self selectNodeBy: [:n | n id = anObject] silently: false) expand]",
	null, "2013-09-04T14:23:43Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #metodika ifTrue: [" +
	"\n\t\t\"je-li metodika nil, nemazu obsah ale jednoduse jen nastavim disabled\"" +
	"\n\t\tself isDisabled: (anObject isNil and: [self root hasChildNodes])]." +
	"\n\t(anAspect = #kapitola1 and: [kapitola ~= anObject]) ifTrue: [" +
	"\n\t\t(kapitola isNil or: [kapitola metodika ~= anObject metodika]) ifTrue: [" +
	"\n\t\t\tvyberKapitol := (Fytoportal data vyberKapitolPM at: anObject metodika id).]." +
	"\n\t\tself kapitola: anObject]." +
	"\n\t(anAspect = #kapitola and: [anObject notNil]) ifTrue: [" +
	"\n\t\t(self selectNodeBy: [:n | n id = anObject] silently: false) " +
	"\n\t\t\tifNotNilDo: [:n | self root children size > 1 ifTrue: [" +
	"\n\t\t\t\t\"v pripade jedine polozky 'vse' je totiz seznam taxonu prazdny\"" +
	"\n\t\t\t\tn expand]]" +
	"\n\t\t\tifNil: [\"pokud se nepodari kapitolu vybrat, napr. jde o skudce, ktereho jsem vyberem plodin odfiltroval\"" +
	"\n\t\t\t\tself selectionModel selectNode: (self root children first)]]",
	null, "2013-10-09T09:56:03Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #metodika ifTrue: [" +
	"\n\t\t\"je-li metodika nil, nemazu obsah ale jednoduse jen nastavim disabled\"" +
	"\n\t\tself isDisabled: (anObject isNil and: [self root hasChildNodes])]." +
	"\n\t(anAspect = #kapitola1 and: [kapitola ~= anObject]) ifTrue: [" +
	"\n\t\tprevNode := nil." +
	"\n\t\t(kapitola isNil or: [kapitola metodika ~= anObject metodika]) ifTrue: [" +
	"\n\t\t\tvyberKapitol := (Fytoportal data vyberKapitolPM at: anObject metodika id).]." +
	"\n\t\tself kapitola: anObject]." +
	"\n\tanAspect = #kapitola & anObject isNil ifTrue: [" +
	"\n\t\t\"textove kapitoly - pestebni opatreni, regulace plevelu...\"" +
	"\n\t\tself selectNode: self root children first]." +
	"\n\tanAspect = #kapitola & anObject notNil ifTrue: [" +
	"\n\t\t\"vybrany taxon nebo seznam taxon u\"" +
	"\n\t\t(self selectNodeBy: [:n | n id = anObject] silently: false) " +
	"\n\t\t\tifNotNilDo: [:n | self root children size > 1 ifTrue: [" +
	"\n\t\t\t\t\"v pripade jedine polozky 'vse' je totiz seznam taxonu prazdny\"" +
	"\n\t\t\t\tn expand]]" +
	"\n\t\t\tifNil: [\"pokud se nepodari kapitolu vybrat, napr. jde o skudce, ktereho jsem vyberem plodin odfiltroval\"" +
	"\n\t\t\t\tself selectNode: (self root children first)]]",
	null, "2014-02-11T22:31:41Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #metodika ifTrue: [" +
	"\n\t\tprevNode := nil." +
	"\n\t\tself clearSelections." +
	"\n\t\t\"je-li metodika nil, nemazu obsah ale jednoduse jen nastavim disabled\"" +
	"\n\t\tself isDisabled: (anObject isNil and: [self root hasChildNodes])]." +
	"\n\t(anAspect = #kapitola1 and: [kapitola ~= anObject]) ifTrue: [" +
	"\n\t\tprevNode := nil." +
	"\n\t\t(kapitola isNil or: [kapitola metodika ~= anObject metodika]) ifTrue: [" +
	"\n\t\t\tvyberKapitol := (Fytoportal data vyberKapitolPM at: anObject metodika id).]." +
	"\n\t\tself kapitola: anObject]." +
	"\n\tanAspect = #kapitola & anObject isNil ifTrue: [" +
	"\n\t\t\"textove kapitoly - pestebni opatreni, regulace plevelu...\"" +
	"\n\t\tself selectNode: self root children first]." +
	"\n\tanAspect = #kapitola & anObject notNil ifTrue: [" +
	"\n\t\t\"vybrany taxon nebo seznam taxon u\"" +
	"\n\t\t(self selectNodeBy: [:n | n id = anObject] silently: false) " +
	"\n\t\t\tifNotNilDo: [:n | self root children size > 1 ifTrue: [" +
	"\n\t\t\t\t\"v pripade jedine polozky 'vse' je totiz seznam taxonu prazdny\"" +
	"\n\t\t\t\tn expand]]" +
	"\n\t\t\tifNil: [\"pokud se nepodari kapitolu vybrat, napr. jde o skudce, ktereho jsem vyberem plodin odfiltroval\"" +
	"\n\t\t\t\tself selectNode: self root children first]]",
	null, "2014-03-26T21:34:42Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #metodika ifTrue: [" +
	"\n\t\tprevNode := nil." +
	"\n\t\tself clearSelections." +
	"\n\t\t\"je-li metodika nil, nemazu obsah ale jednoduse jen nastavim disabled\"" +
	"\n\t\tself isDisabled: (anObject isNil and: [self root hasChildNodes])]." +
	"\n\t(anAspect = #kapitola1 and: [kapitola ~= anObject]) ifTrue: [" +
	"\n\t\tprevNode := nil." +
	"\n\t\t(kapitola isNil or: [kapitola metodika ~= anObject metodika]) ifTrue: [" +
	"\n\t\t\tvyberKapitol := (Fytoportal data vyberKapitolPM at: anObject metodika id).]." +
	"\n\t\tself kapitola: anObject]." +
	"\n\tanAspect = #kapitola & anObject isNil ifTrue: [" +
	"\n\t\t\"textove kapitoly - pestebni opatreni, regulace plevelu...\"" +
	"\n\t\tself selectNode: self root children first]." +
	"\n\tanAspect = #kapitola & anObject notNil ifTrue: [" +
	"\n\t\t\"vybrany taxon nebo seznam taxon u\"" +
	"\n\t\t(self selectNodeBy: [:n | n id = anObject] silently: false) " +
	"\n\t\t\tifNotNilDo: [:n | self root children size > 1 ifTrue: [" +
	"\n\t\t\t\t\"v pripade jedine polozky 'vse' je totiz seznam taxonu prazdny\"" +
	"\n\t\t\t\tn expand]]" +
	"\n\t\t\tifNil: [\"pokud se nepodari kapitolu vybrat, napr. jde o skudce, ktereho jsem vyberem plodin odfiltroval\"" +
	"\n\t\t\t\tself root children isEmpty ifFalse: [" +
	"\n\t\t\t\t\tself selectNode: self root children first]]]",
	null, "2014-04-15T08:52:15Z", "mp"); //fytoportal-ior

jst.FYKapitolaPanel.addMethod("kapitola:", "anObject", "private", 
	"\tkapitola := anObject." +
	"\n\tself title: kapitola nazev." +
	"\n\tself root: ((self respondsTo: kapitola id) " +
	"\n\t\tifTrue: [self perform: kapitola id]" +
	"\n\t\tifFalse: [self jinaKapitola])",
	null, "2013-01-11T23:02:27Z", "mp");

/*
jst.FYKapitolaPanel.addMethod("createNodeOn:withId:prefixed:", "kap aString prefix", "private", 
	"\t| node |" +
	"\n\t\"id uzlu je jiny, nez id kapitoly - tvori jej prefix (obsahuje napr. uuid SO nebo choroby) a identifikator kapitoly\"" +
	"\n\tnode := ExtTreeNode new " +
	"\n\t\tid: prefix, aString; " +
	"\n\t\ttext: kap nazev;" +
	"\n\t\tlink: kap;" +
	"\n\t\tchecked: (vyberKapitol at: kap id ifAbsent: false);" +
	"\n\t\ton: #checkchange do: oznacKapitolu." +
	"\n\tkap sortedKeys do: [:key |" +
	"\n\t\tnode children add: (self createNodeOn: (kap at: key) withId: key prefixed: prefix)]." +
	"\n\t^ node",
	null, "2012-11-13T13:59:47Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("createNodeOn:withId:prefixed:", "kap aString prefix", "private", 
	"\t| node |" +
	"\n\t\"id uzlu je jiny, nez id kapitoly - tvori jej prefix (obsahuje napr. uuid SO nebo choroby) a identifikator kapitoly\"" +
	"\n\tnode := ExtTreeNode new " +
	"\n\t\tid: prefix, aString; " +
	"\n\t\ttext: kap nazev;" +
	"\n\t\tlink: kap." +
	"\n\toznacKapitolu ifNotNil: [" +
	"\n\t\tnode" +
	"\n\t\t\tchecked: (vyberKapitol at: kap id ifAbsent: false);" +
	"\n\t\t\ton: #checkchange do: oznacKapitolu]." +
	"\n\tkap sortedKeys do: [:key |" +
	"\n\t\tnode children add: (self createNodeOn: (kap at: key) withId: key prefixed: prefix)]." +
	"\n\t^ node",
	null, "2013-01-08T21:23:44Z", "mp");
*/
jst.FYKapitolaPanel.addMethod("createNodeOn:prefixed:", "kap prefix", "private", 
	"\t| node |" +
	"\n\t\"id uzlu je jiny, nez id kapitoly - tvori jej prefix (obsahuje napr. uuid SO nebo choroby) a identifikator kapitoly\"" +
	"\n\tnode := ExtTreeNode new " +
	"\n\t\tid: prefix, kap id; " +
	"\n\t\ttext: kap nazev;" +
	"\n\t\tlink: kap." +
	"\n\toznacKapitolu ifNotNil: [" +
	"\n\t\tnode" +
	"\n\t\t\tchecked: (vyberKapitol at: node id ifAbsent: false);" +
	"\n\t\t\ton: #checkchange do: oznacKapitolu]." +
	"\n\tkap sortedKeys do: [:key |" +
	"\n\t\tnode children add: (self createNodeOn: (kap at: key) prefixed: prefix)]." +
	"\n\t^ node",
	null, "2013-05-30T09:21:04Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("createNodeOn:prefixed:", "kap prefix", "private", 
	"\t| node |" +
	"\n\t\"id uzlu je jiny, nez id kapitoly - tvori jej prefix (obsahuje napr. uuid SO nebo choroby) a identifikator kapitoly\"" +
	"\n\tnode := ExtTreeNode new " +
	"\n\t\tid: prefix, kap id; " +
	"\n\t\ttext: kap nazev;" +
	"\n\t\tlink: kap." +
	"\n\toznacKapitolu ifNotNil: [" +
	"\n\t\tnode" +
	"\n\t\t\tchecked: (vyberKapitol jeVybrana: node id);" +
	"\n\t\t\ton: #checkchange do: oznacKapitolu]." +
	"\n\tkap sortedKeys do: [:key |" +
	"\n\t\tnode children add: (self createNodeOn: (kap at: key) prefixed: prefix)]." +
	"\n\t^ node",
	null, "2013-09-27T14:44:19Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("createNodeOn:prefixed:", "kap prefix", "private", 
	"\t| node |" +
	"\n\t\"id uzlu je jiny, nez id kapitoly - tvori jej prefix (obsahuje napr. uuid SO nebo choroby) a identifikator kapitoly\"" +
	"\n\tnode := ExtTreeNode new " +
	"\n\t\tid: prefix, kap id; " +
	"\n\t\ttext: kap nazev;" +
	"\n\t\tlink: kap." +
	"\n\toznacKapitolu ifNotNil: [" +
	"\n\t\tnode" +
	"\n\t\t\tchecked: (vyberKapitol kapitola: kapitola id jeVybrana: node id);" +
	"\n\t\t\ton: #checkchange do: oznacKapitolu]." +
	"\n\tkap sortedKeys do: [:key |" +
	"\n\t\tnode children add: (self createNodeOn: (kap at: key) prefixed: prefix)]." +
	"\n\t^ node",
	null, "2013-10-01T19:59:43Z", "mp"); //fytoportal-ior

jst.FYKapitolaPanel.addMethod("createDefaultNode", "", "private", 
	"\t^ ExtTreeNode new " +
	"\n\t\tid: #tisk; " +
	"\n\t\ttext: '(všechny kapitoly)';" +
	"\n\t\tlink: kapitola;" +
	"\n\t\tchecked: (vyberKapitol at: kapitola id);" +
	"\n\t\ton: #checkchange do: oznacKapitolu",
	null, "2012-11-13T14:53:35Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("createDefaultNode", "", "private", 
	"\t^ ExtTreeNode new " +
	"\n\t\tid: #tisk; " +
	"\n\t\ttext: '(všechny kapitoly)';" +
	"\n\t\tlink: kapitola;" +
	"\n\t\tchecked: (vyberKapitol at: kapitola id ifAbsent: true);" +
	"\n\t\ton: #checkchange do: oznacKapitolu",
	null, "2013-01-09T16:28:44Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("createDefaultNode", "", "private", 
	"\t^ ExtTreeNode new " +
	"\n\t\tid: kapitola id; " +
	"\n\t\ttext: '(všechny kapitoly)';" +
	"\n\t\tlink: kapitola;" +
	"\n\t\tchecked: (vyberKapitol at: kapitola id ifAbsent: true);" +
	"\n\t\ton: #checkchange do: oznacKapitolu",
	null, "2013-05-30T08:24:34Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("createDefaultNode", "", "private", 
	"\t^ ExtTreeNode new " +
	"\n\t\tid: kapitola id; " +
	"\n\t\ttext: '(všechny kapitoly)';" +
	"\n\t\tlink: kapitola;" +
	"\n\t\tchecked: (vyberKapitol at: kapitola id ifAbsentPut: true);" +
	"\n\t\ton: #checkchange do: oznacKapitolu",
	null, "2013-09-27T14:56:56Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("createDefaultNode", "", "private", 
	"\t^ ExtTreeNode new " +
	"\n\t\tid: kapitola id; " +
	"\n\t\ttext: '(všechny kapitoly)';" +
	"\n\t\tlink: kapitola;" +
	"\n\t\tchecked: (vyberKapitol kapitola: kapitola id jeVybrana: '');" +
	"\n\t\ton: #checkchange do: oznacKapitolu",
	null, "2013-10-01T20:09:23Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("createDefaultNode", "", "private", 
	"\t^ ExtTreeNode new " +
	"\n\t\tid: kapitola id; " +
	"\n\t\ttext: '(všechny kapitoly)';" +
	"\n\t\tcls: 'vsechnyKap';" +
	"\n\t\tlink: kapitola;" +
	"\n\t\tchecked: (vyberKapitol kapitola: kapitola id jeVybrana: '');" +
	"\n\t\ton: #checkchange do: oznacKapitolu",
	null, "2014-05-20T20:32:51Z", "mp"); //fytoportal-ior

jst.FYKapitolaPanel.addMethod("jinaKapitola", "", "private-root", 
	"\t| root |" +
	"\n\troot := ExtTreeNode new." +
	"\n\troot children add: self createDefaultNode." +
	"\n\tkapitola sortedKeys do: [:key |" +
	"\n\t\troot children add: (self createNodeOn: (kapitola at: key) withId: key prefixed: '')]." +
	"\n\t^ root",
	null, "2012-11-13T14:53:58Z", "mp",1);

jst.FYKapitolaPanel.addMethod("jinaKapitola", "", "private-root", 
	"\t| root |" +
	"\n\troot := ExtTreeNode new." +
	"\n\tself createDefaultNode ifNotNilDo: [:n |" +
	"\n\t\troot children add: n]." +
	"\n\tkapitola sortedKeys do: [:key |" +
	"\n\t\troot children add: (self createNodeOn: (kapitola at: key) withId: key prefixed: '')]." +
	"\n\t^ root",
	null, "2013-01-08T22:01:56Z", "mp",1);

jst.FYKapitolaPanel.addMethod("jinaKapitola", "", "private-root", 
	"\t| root |" +
	"\n\troot := ExtTreeNode new." +
	"\n\tself createDefaultNode ifNotNilDo: [:n |" +
	"\n\t\troot children add: n]." +
	"\n\tkapitola sortedKeys do: [:key |" +
	"\n\t\troot children add: (self createNodeOn: (kapitola at: key) prefixed: '')]." +
	"\n\t^ root",
	null, "2013-05-30T09:14:13Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("jinaKapitola", "", "private-root", 
	"\t| root |" +
	"\n\troot := ExtTreeNode new." +
	"\n\tself createDefaultNode ifNotNilDo: [:n |" +
	"\n\t\troot children add: n]." +
	"\n\tkapitola osnovaTisk do: [:kap |" +
	"\n\t\troot children add: (self createNodeOn: kap prefixed: '')]." +
	"\n\t^ root",
	null, "2013-12-06T11:03:38Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("jinaKapitola", "", "private-root", 
	"\t| root |" +
	"\n\troot := ExtTreeNode new." +
	"\n\tself createDefaultNode ifNotNilDo: [:n |" +
	"\n\t\troot children add: n]." +
	"\n\tkapitola osnovaTisk valuesDo: [:kap |" +
	"\n\t\troot children add: (self createNodeOn: kap prefixed: '')]." +
	"\n\t^ root",
	null, "2013-12-28T22:08:04Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("jinaKapitola", "", "private-root", 
	"\t| root |" +
	"\n\troot := ExtTreeNode new." +
	"\n\tself createDefaultNode ifNotNilDo: [:n |" +
	"\n\t\troot children add: n]." +
	"\n\tkapitola osnovaTisk valuesDo: [:kap |" +
	"\n\t\t\"do: totiz prochazi vsechny podkapitoly\"" +
	"\n\t\troot children add: (self createNodeOn: kap prefixed: '')]." +
	"\n\t^ root",
	null, "2013-12-28T22:24:46Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("jinaKapitola", "", "private-root", 
	"\t| root |" +
	"\n\troot := ExtTreeNode new." +
	"\n\tself createDefaultNode ifNotNilDo: [:n |" +
	"\n\t\troot children add: n]." +
	"\n\tkapitola osnovaTisk asCollection do: [:kap |" +
	"\n\t\t\"do: nelze pouzit primo, u kapitoly totiz prochazi vsechny podkapitoly\"" +
	"\n\t\troot children add: (self createNodeOn: kap prefixed: '')]." +
	"\n\t^ root",
	null, "2013-12-31T16:41:51Z", "mp"); //fytoportal-ior

jst.FYKapitolaPanel.addMethod("plodiny", "", "private-root", 
	"\t| root |" +
	"\n\troot := ExtTreeNode new." +
	"\n\tkapitola obsah size > 1 ifTrue: [" +
	"\n\t\troot children add: (self createDefaultNode text: '(všechny plodiny)')]." +
	"\n\t(kapitola obsah asSortedCollection: [:a :b | a value <= b value]) do: [:plod |" +
	"\n\t\troot children add: (ExtTreeNode new" +
	"\n\t\t\tid: plod key;" +
	"\n\t\t\ttext: plod value;" +
	"\n\t\t\tchecked: (vyberKapitol at: plod key ifAbsent: false);" +
	"\n\t\t\ton: #checkchange do: oznacPolozku)]." +
	"\n\t^ root",
	null, "2012-11-13T14:54:49Z", "mp",1);

jst.FYKapitolaPanel.addMethod("plodiny", "", "private-root", 
	"\t| root |" +
	"\n\troot := ExtTreeNode new." +
	"\n\tself createDefaultNode ifNotNilDo: [:n |" +
	"\n\t\tkapitola obsah size > 1 ifTrue: [" +
	"\n\t\t\tn text: '(všechny plodiny)'." +
	"\n\t\t\troot children add: n]" +
	"\n\t]." +
	"\n\t(kapitola obsah asCollection asSortedCollection: [:a :b | a value <= b value]) do: [:plod | | node |" +
	"\n\t\tnode := root children add: (ExtTreeNode new" +
	"\n\t\t\tid: plod key;" +
	"\n\t\t\ttext: plod value)." +
	"\n\t\tvyberKapitol ifNotNil: [" +
	"\n\t\t\tnode" +
	"\n\t\t\t\tchecked: (vyberKapitol at: plod key ifAbsent: false);" +
	"\n\t\t\t\ton: #checkchange do: oznacPolozku]" +
	"\n\t]." +
	"\n\t^ root",
	null, "2013-01-09T07:51:55Z", "mp",1);

jst.FYKapitolaPanel.addMethod("plodiny", "", "private-root", 
	"\t| root |" +
	"\n\troot := ExtTreeNode new." +
	"\n\tself createDefaultNode ifNotNilDo: [:n |" +
	"\n\t\tkapitola obsah size > 1 ifTrue: [" +
	"\n\t\t\tn text: '(všechny plodiny)'." +
	"\n\t\t\troot children add: n]" +
	"\n\t]." +
	"\n\tkapitola obsah asCollection asSortedCollection do: [:plod | | node |" +
	"\n\t\tnode := root children add: (ExtTreeNode new" +
	"\n\t\t\tid: plod linkId;" +
	"\n\t\t\ttext: plod nazev)." +
	"\n\t\tvyberKapitol ifNotNil: [" +
	"\n\t\t\tnode" +
	"\n\t\t\t\tchecked: (vyberKapitol at: plod linkId ifAbsent: false);" +
	"\n\t\t\t\ton: #checkchange do: oznacPolozku]" +
	"\n\t]." +
	"\n\t^ root",
	null, "2013-04-23T13:58:18Z", "mp",1);

jst.FYKapitolaPanel.addMethod("plodiny", "", "private-root", 
	"\t| root |" +
	"\n\troot := ExtTreeNode new." +
	"\n\tself createDefaultNode ifNotNilDo: [:n |" +
	"\n\t\tkapitola obsah size > 1 ifTrue: [" +
	"\n\t\t\tn text: '(všechny plodiny)'." +
	"\n\t\t\troot children add: n]" +
	"\n\t]." +
	"\n\tkapitola obsah asCollection asSortedCollection do: [:plod | | node |" +
	"\n\t\t\"jednotlive plodiny\"" +
	"\n\t\tnode := root children add: (ExtTreeNode new" +
	"\n\t\t\tid: plod id;" +
	"\n\t\t\ttext: plod nazev;" +
	"\n\t\t\tlink: plod)." +
	"\n\t\tvyberKapitol ifNotNil: [" +
	"\n\t\t\tnode" +
	"\n\t\t\t\tchecked: (vyberKapitol at: plod id ifAbsent: false);" +
	"\n\t\t\t\ton: #checkchange do: oznacKapitolu]" +
	"\n\t]." +
	"\n\t^ root",
	null, "2013-05-30T06:55:53Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("plodiny", "", "private-root", 
	"\t| root |" +
	"\n\troot := ExtTreeNode new." +
	"\n\tself createDefaultNode ifNotNilDo: [:n |" +
	"\n\t\tkapitola obsah size > 1 ifTrue: [" +
	"\n\t\t\tn text: '(všechny plodiny)'." +
	"\n\t\t\troot children add: n]" +
	"\n\t]." +
	"\n\tkapitola obsah asCollection asSortedCollection do: [:plod | | node |" +
	"\n\t\t\"jednotlive plodiny\"" +
	"\n\t\tnode := root children add: (ExtTreeNode new" +
	"\n\t\t\tid: plod id;" +
	"\n\t\t\ttext: plod nazev;" +
	"\n\t\t\ticonCls: #'icon-plodina';" +
	"\n\t\t\tlink: plod)." +
	"\n\t\tvyberKapitol ifNotNil: [" +
	"\n\t\t\tnode" +
	"\n\t\t\t\tchecked: (vyberKapitol at: plod id ifAbsent: false);" +
	"\n\t\t\t\ton: #checkchange do: oznacKapitolu]" +
	"\n\t]." +
	"\n\t^ root",
	null, "2013-05-31T07:17:25Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("plodiny", "", "private-root", 
	"\t| root |" +
	"\n\troot := ExtTreeNode new." +
	"\n\tself createDefaultNode ifNotNilDo: [:n |" +
	"\n\t\tkapitola obsah size > 1 ifTrue: [" +
	"\n\t\t\tn text: '(všechny plodiny)'." +
	"\n\t\t\troot children add: n]" +
	"\n\t]." +
	"\n\tkapitola obsah asCollection asSortedCollection do: [:plod | | node |" +
	"\n\t\t\"jednotlive plodiny\"" +
	"\n\t\tnode := root children add: (ExtTreeNode new" +
	"\n\t\t\tid: plod id;" +
	"\n\t\t\ttext: plod nazev;" +
	"\n\t\t\ticonCls: #'icon-plodina';" +
	"\n\t\t\tlink: plod)." +
	"\n\t\tvyberKapitol ifNotNil: [" +
	"\n\t\t\tnode" +
	"\n\t\t\t\tchecked: (vyberKapitol jeVybrana: plod id);" +
	"\n\t\t\t\ton: #checkchange do: oznacKapitolu]" +
	"\n\t]." +
	"\n\t^ root",
	null, "2013-09-30T12:36:51Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("plodiny", "", "private-root", 
	"\t| root |" +
	"\n\troot := ExtTreeNode new." +
	"\n\tself createDefaultNode ifNotNilDo: [:n |" +
	"\n\t\tkapitola obsah size > 1 ifTrue: [" +
	"\n\t\t\tn text: '(všechny plodiny)'." +
	"\n\t\t\troot children add: n]" +
	"\n\t]." +
	"\n\tkapitola obsah asCollection asSortedCollection do: [:plod | | node |" +
	"\n\t\t\"jednotlive plodiny\"" +
	"\n\t\tnode := root children add: (ExtTreeNode new" +
	"\n\t\t\tid: plod id;" +
	"\n\t\t\ttext: plod nazev;" +
	"\n\t\t\ticonCls: #'icon-plodina';" +
	"\n\t\t\tlink: plod)." +
	"\n\t\tvyberKapitol ifNotNil: [" +
	"\n\t\t\tnode" +
	"\n\t\t\t\tchecked: (vyberKapitol kapitola: kapitola id jeVybrana: plod id);" +
	"\n\t\t\t\ton: #checkchange do: oznacKapitolu]" +
	"\n\t]." +
	"\n\t^ root",
	null, "2013-10-01T20:00:15Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("plodiny", "", "private-root", 
	"\t| root plodiny vyber |" +
	"\n\troot := ExtTreeNode new." +
	"\n\tplodiny := kapitola obsah asCollection." +
	"\n\tvyber := plodiny size > 1 and: [vyberKapitol notNil]." +
	"\n\tvyber ifTrue: [root children add: (" +
	"\n\t\tself createDefaultNode" +
	"\n\t\t\ttext: '(všechny plodiny)')]." +
	"\n\tplodiny asSortedCollection do: [:plod | | node |" +
	"\n\t\t\"jednotlive plodiny\"" +
	"\n\t\tnode := root children add: (ExtTreeNode new" +
	"\n\t\t\tid: plod id;" +
	"\n\t\t\ttext: plod nazev;" +
	"\n\t\t\ticonCls: #'icon-plodina';" +
	"\n\t\t\tlink: plod)." +
	"\n\t\tvyber ifTrue: [node" +
	"\n\t\t\tchecked: (vyberKapitol kapitola: kapitola id jeVybrana: plod id);" +
	"\n\t\t\ton: #checkchange do: oznacKapitolu]" +
	"\n\t]." +
	"\n\t^ root",
	null, "2013-12-09T22:07:56Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("plodiny", "", "private-root", 
	"\t| root plodiny vyber |" +
	"\n\troot := ExtTreeNode new." +
	"\n\tplodiny := OrderedCollection withAll: kapitola obsah asCollection." +
	"\n\tBrowser location isPublic ifTrue: [" +
	"\n\t\tkapitola taxony do: [:tx | tx publikovat ifFalse: [" +
	"\n\t\t\tplodiny remove: (plodiny detect: [:pl | pl linkId = tx id])]]]." +
	"\n\tvyber := plodiny size > 1 and: [vyberKapitol notNil]." +
	"\n\tvyber ifTrue: [root children add: (" +
	"\n\t\tself createDefaultNode" +
	"\n\t\t\ttext: '(všechny plodiny)')]." +
	"\n\tplodiny asSortedCollection do: [:plod | | node |" +
	"\n\t\t\"jednotlive plodiny\"" +
	"\n\t\tnode := root children add: (ExtTreeNode new" +
	"\n\t\t\tid: plod id;" +
	"\n\t\t\ttext: plod nazev;" +
	"\n\t\t\ticonCls: #'icon-plodina';" +
	"\n\t\t\tlink: plod)." +
	"\n\t\tvyber ifTrue: [node" +
	"\n\t\t\tchecked: (vyberKapitol kapitola: kapitola id jeVybrana: plod id);" +
	"\n\t\t\ton: #checkchange do: oznacKapitolu]" +
	"\n\t]." +
	"\n\t^ root",
	null, "2014-02-01T22:49:55Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("plodiny", "", "private-root", 
	"\t| root plodiny vyber |" +
	"\n\troot := ExtTreeNode new." +
	"\n\tplodiny := kapitola kapitolyTisk." +
	"\n\tvyber := plodiny size > 1 and: [vyberKapitol notNil]." +
	"\n\tvyber ifTrue: [root children add: (" +
	"\n\t\tself createDefaultNode" +
	"\n\t\t\ttext: '(všechny plodiny)')]." +
	"\n\tplodiny do: [:plod | | node |" +
	"\n\t\t\"jednotlive plodiny\"" +
	"\n\t\tnode := root children add: (ExtTreeNode new" +
	"\n\t\t\tid: plod id;" +
	"\n\t\t\ttext: plod nazev;" +
	"\n\t\t\ticonCls: #'icon-plodina';" +
	"\n\t\t\tlink: plod)." +
	"\n\t\tvyber ifTrue: [node" +
	"\n\t\t\tchecked: (vyberKapitol kapitola: kapitola id jeVybrana: plod id);" +
	"\n\t\t\ton: #checkchange do: oznacKapitolu]" +
	"\n\t]." +
	"\n\t^ root",
	null, "2014-03-06T14:04:57Z", "mp"); //fytoportal-ior

jst.FYKapitolaPanel.addMethod("skudciChorobyAbionozy:text:", "osnova aString", "private", 
	"\t| root node |" +
	"\n\troot := ExtTreeNode new." +
	"\n\tnode := root children add: (self createDefaultNode text: aString)." +
	"\n\tosnova sortedKeys do: [:key |" +
	"\n\t\tnode children add: (self createNodeOn: (osnova at: key) withId: key prefixed: node id)]." +
	"\n\t(kapitola obsah asCollection asSortedCollection: [:a :b | a nazev <= b nazev]) do: [:kap | | node |" +
	"\n\t\tnode := ExtTreeNode new" +
	"\n\t\t\tid: kap linkId;" +
	"\n\t\t\ttext: kap nazev;" +
	"\n\t\t\tchecked: (vyberKapitol at: kap linkId ifAbsent: false);" +
	"\n\t\t\ton: #checkchange do: oznacPolozku." +
	"\n\t\troot children add: node." +
	"\n\t\tkap link sortedKeys do: [:key |" +
	"\n\t\t\tnode children add: (self createNodeOn: (kap link at: key) withId: key prefixed: node id, '-')]." +
	"\n\t]." +
	"\n\t^ root",
	null, "2013-01-04T08:59:05Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("skudciChorobyAbionozy:text:", "kapId aString", "private", 
	"\t| root node |" +
	"\n\troot := ExtTreeNode new." +
	"\n\tself createDefaultNode ifNotNilDo: [:n | | osnova |" +
	"\n\t\tn text: aString." +
	"\n\t\troot children add: n." +
	"\n\t\tosnova := Fytoportal data osnovaMetodikyKapitoly: kapId." +
	"\n\t\tosnova sortedKeys do: [:key |" +
	"\n\t\t\tn children add: (self createNodeOn: (osnova at: key) withId: key prefixed: n id)]" +
	"\n\t]." +
	"\n\t(kapitola seznamSO asSortedCollection: [:a :b | a nazev <= b nazev]) do: [:kap |" +
	"\n\t\tnode := root children add: (ExtAsyncTreeNode new" +
	"\n\t\t\tid: kap linkId;" +
	"\n\t\t\tlink: kap;" +
	"\n\t\t\tloader: self treeLoader;" +
	"\n\t\t\ttext: kap nazev)." +
	"\n\t\toznacPolozku ifNotNil: [" +
	"\n\t\t\tnode " +
	"\n\t\t\t\tchecked: (vyberKapitol at: kap linkId ifAbsent: false);" +
	"\n\t\t\t\ton: #checkchange do: oznacPolozku]" +
	"\n\t]." +
	"\n\t^ root",
	null, "2013-03-01T14:52:00Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("skudciChorobyAbionozy:text:", "kapId aString", "private", 
	"\t| root node |" +
	"\n\troot := ExtTreeNode new." +
	"\n\tself createDefaultNode ifNotNilDo: [:n | | osnova |" +
	"\n\t\tn text: aString." +
	"\n\t\troot children add: n." +
	"\n\t\tosnova := Fytoportal data osnovaMetodikyKapitoly: kapId." +
	"\n\t\tosnova sortedKeys do: [:key |" +
	"\n\t\t\tn children add: (self createNodeOn: (osnova at: key) withId: key prefixed: n id)]" +
	"\n\t]." +
	"\n\t(kapitola obsah asSortedCollection: [:a :b | a nazev <= b nazev]) do: [:kap |" +
	"\n\t\tnode := root children add: (ExtAsyncTreeNode new" +
	"\n\t\t\tid: kap linkId;" +
	"\n\t\t\tlink: kap;" +
	"\n\t\t\tloader: self treeLoader;" +
	"\n\t\t\ttext: kap nazev)." +
	"\n\t\toznacPolozku ifNotNil: [" +
	"\n\t\t\tnode " +
	"\n\t\t\t\tchecked: (vyberKapitol at: kap linkId ifAbsent: false);" +
	"\n\t\t\t\ton: #checkchange do: oznacPolozku]" +
	"\n\t]." +
	"\n\t^ root",
	null, "2013-03-05T08:41:04Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("skudciChorobyAbionozy:text:", "kapId aString", "private", 
	"\t| root node |" +
	"\n\troot := ExtTreeNode new." +
	"\n\tself createDefaultNode ifNotNilDo: [:n | | osnova |" +
	"\n\t\t\"polozka 'vsechny choroby, skudci, abionozy'\"" +
	"\n\t\tn text: aString." +
	"\n\t\troot children add: n." +
	"\n\t\tosnova := Fytoportal data osnovaMetodikyKapitoly: kapId." +
	"\n\t\tosnova sortedKeys do: [:key |" +
	"\n\t\t\tn children add: (self createNodeOn: (osnova at: key) prefixed: kapId, '.')]" +
	"\n\t]." +
	"\n\t(kapitola obsah asSortedCollection: [:a :b | a nazev <= b nazev]) do: [:kap |" +
	"\n\t\t\"jednotlive choroby, skudci, abionozy\"" +
	"\n\t\tnode := root children add: (ExtAsyncTreeNode new" +
	"\n\t\t\tid: kap id;" +
	"\n\t\t\tlink: kap;" +
	"\n\t\t\tloader: self treeLoader;" +
	"\n\t\t\ttext: kap nazev)." +
	"\n\t\toznacKapitolu ifNotNil: [" +
	"\n\t\t\tnode " +
	"\n\t\t\t\tchecked: (vyberKapitol at: node id ifAbsent: false);" +
	"\n\t\t\t\ton: #checkchange do: oznacKapitolu]" +
	"\n\t]." +
	"\n\t^ root",
	null, "2013-05-30T09:21:31Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("skudciChorobyAbionozy:text:", "kapId aString", "private", 
	"\t| root node |" +
	"\n\troot := ExtTreeNode new." +
	"\n\tself createDefaultNode ifNotNilDo: [:n | | osnova |" +
	"\n\t\t\"polozka 'vsechny choroby, skudci, abionozy'\"" +
	"\n\t\tn text: aString." +
	"\n\t\troot children add: n." +
	"\n\t\toznacKapitolu ifNotNil: [" +
	"\n\t\t\tself addPrintSelectionNodeTo: n]." +
	"\n\t\tosnova := Fytoportal data osnovaMetodikyKapitoly: kapId." +
	"\n\t\tosnova sortedKeys do: [:key |" +
	"\n\t\t\tn children add: (self createNodeOn: (osnova at: key) prefixed: kapId, '.')]" +
	"\n\t]." +
	"\n\t(kapitola obsah asSortedCollection: [:a :b | a nazev <= b nazev]) do: [:kap |" +
	"\n\t\t\"jednotlive choroby, skudci, abionozy\"" +
	"\n\t\tnode := root children add: (ExtAsyncTreeNode new" +
	"\n\t\t\tid: kap id;" +
	"\n\t\t\tlink: kap;" +
	"\n\t\t\tloader: self treeLoader;" +
	"\n\t\t\ttext: kap nazev)." +
	"\n\t\toznacKapitolu ifNotNil: [" +
	"\n\t\t\tnode " +
	"\n\t\t\t\tchecked: (vyberKapitol at: node id ifAbsent: false);" +
	"\n\t\t\t\ton: #checkchange do: oznacKapitolu." +
	"\n\t\t]" +
	"\n\t]." +
	"\n\t^ root",
	null, "2013-09-26T15:42:52Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("skudciChorobyAbionozy:text:", "kapId aString", "private", 
	"\t| root node |" +
	"\n\troot := ExtTreeNode new." +
	"\n\tself createDefaultNode ifNotNilDo: [:n | | osnova |" +
	"\n\t\t\"polozka 'vsechny choroby, skudci, abionozy'\"" +
	"\n\t\tn text: aString." +
	"\n\t\troot children add: n." +
	"\n\t\toznacKapitolu ifNotNil: [" +
	"\n\t\t\tself addPrintSelectionNodeTo: n]." +
	"\n\t\tosnova := Fytoportal data osnovaMetodikyKapitoly: kapId." +
	"\n\t\tosnova sortedKeys do: [:key |" +
	"\n\t\t\tn children add: (self createNodeOn: (osnova at: key) prefixed: kapId, '.')]" +
	"\n\t]." +
	"\n\t(kapitola obsah asSortedCollection: [:a :b | a nazev <= b nazev]) do: [:kap |" +
	"\n\t\t\"jednotlive choroby, skudci, abionozy\"" +
	"\n\t\tnode := root children add: (ExtAsyncTreeNode new" +
	"\n\t\t\tid: kap id;" +
	"\n\t\t\tlink: kap;" +
	"\n\t\t\tloader: self treeLoader;" +
	"\n\t\t\ttext: kap nazev)." +
	"\n\t\toznacKapitolu ifNotNil: [" +
	"\n\t\t\tnode " +
	"\n\t\t\t\tchecked: (vyberKapitol jeVybrana: node id);" +
	"\n\t\t\t\ton: #checkchange do: oznacKapitolu." +
	"\n\t\t]" +
	"\n\t]." +
	"\n\t^ root",
	null, "2013-09-30T12:37:09Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("skudciChorobyAbionozy:text:", "kapId aString", "private", 
	"\t| root node |" +
	"\n\troot := ExtTreeNode new." +
	"\n\tself createDefaultNode ifNotNilDo: [:n | | osnova |" +
	"\n\t\t\"polozka 'vsechny choroby, skudci, abionozy'\"" +
	"\n\t\tn text: aString." +
	"\n\t\troot children add: n." +
	"\n\t\toznacKapitolu ifNotNil: [" +
	"\n\t\t\tself addPrintSelectionNodeTo: n]." +
	"\n\t\tosnova := Fytoportal data osnovaMetodikyKapitoly: kapId." +
	"\n\t\tosnova sortedKeys do: [:key |" +
	"\n\t\t\tn children add: (self createNodeOn: (osnova at: key) prefixed: kapId, '.')]" +
	"\n\t]." +
	"\n\t(kapitola obsah asSortedCollection: [:a :b | a nazev <= b nazev]) do: [:kap |" +
	"\n\t\t\"jednotlive choroby, skudci, abionozy\"" +
	"\n\t\tnode := root children add: (ExtAsyncTreeNode new" +
	"\n\t\t\tid: kap id;" +
	"\n\t\t\tlink: kap;" +
	"\n\t\t\tloader: self treeLoader;" +
	"\n\t\t\ttext: kap nazev)." +
	"\n\t\toznacKapitolu ifNotNil: [" +
	"\n\t\t\tnode " +
	"\n\t\t\t\tchecked: (vyberKapitol kapitola: kapitola id jeVybrana: node id);" +
	"\n\t\t\t\ton: #checkchange do: oznacKapitolu." +
	"\n\t\t]" +
	"\n\t]." +
	"\n\t^ root",
	null, "2013-10-01T20:00:42Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("skudciChorobyAbionozy:text:", "kapId aString", "private", 
	"\t| root node |" +
	"\n\troot := ExtTreeNode new." +
	"\n\tself createDefaultNode ifNotNilDo: [:n | | osnova |" +
	"\n\t\t\"polozka 'vsechny choroby, skudci, abionozy'\"" +
	"\n\t\tn text: aString." +
	"\n\t\troot children add: n." +
	"\n\t\toznacKapitolu ifNotNil: [" +
	"\n\t\t\tself addPrintSelectionNodeTo: n]." +
	"\n\t\tosnova := Fytoportal data osnovaMetodikyKapitoly: kapId." +
	"\n\t\tosnova sortedKeys do: [:key |" +
	"\n\t\t\tn children add: (self createNodeOn: (osnova at: key) prefixed: kapId, '.')]" +
	"\n\t]." +
	"\n\t(self seznamSO asSortedCollection: [:a :b | a nazev <= b nazev]) do: [:kap |" +
	"\n\t\t\"jednotlive choroby, skudci, abionozy\"" +
	"\n\t\tnode := root children add: (ExtAsyncTreeNode new" +
	"\n\t\t\tid: kap id;" +
	"\n\t\t\tlink: kap;" +
	"\n\t\t\tloader: self treeLoader;" +
	"\n\t\t\ttext: kap nazev)." +
	"\n\t\toznacKapitolu ifNotNil: [" +
	"\n\t\t\tnode " +
	"\n\t\t\t\tchecked: (vyberKapitol kapitola: kapitola id jeVybrana: node id);" +
	"\n\t\t\t\ton: #checkchange do: oznacKapitolu." +
	"\n\t\t]" +
	"\n\t]." +
	"\n\t^ root",
	null, "2013-10-09T09:58:50Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("skudciChorobyAbionozy:text:", "kapId aString", "private", 
	"\t| root node |" +
	"\n\troot := ExtTreeNode new." +
	"\n\tself createDefaultNode ifNotNilDo: [:n | | osnova |" +
	"\n\t\t\"polozka 'vsechny choroby, skudci, abionozy'\"" +
	"\n\t\tn text: aString." +
	"\n\t\troot children add: n." +
	"\n\t\toznacKapitolu ifNotNil: [" +
	"\n\t\t\tself addPrintSelectionNodeTo: n]." +
	"\n\t\tosnova := Fytoportal data osnovaMetodikyKapitoly: kapId." +
	"\n\t\tosnova sortedKeys do: [:key |" +
	"\n\t\t\tn children add: (self createNodeOn: (osnova at: key) prefixed: kapId, '.')]" +
	"\n\t]." +
	"\n\tself seznamSOTisk do: [:kap |" +
	"\n\t\t\"jednotlive choroby, skudci, abionozy\"" +
	"\n\t\tnode := root children add: (ExtAsyncTreeNode new" +
	"\n\t\t\tid: kap id;" +
	"\n\t\t\tlink: kap;" +
	"\n\t\t\tloader: self treeLoader;" +
	"\n\t\t\ttext: kap nazev)." +
	"\n\t\toznacKapitolu ifNotNil: [" +
	"\n\t\t\tnode " +
	"\n\t\t\t\tchecked: (vyberKapitol kapitola: kapitola id jeVybrana: node id);" +
	"\n\t\t\t\ton: #checkchange do: oznacKapitolu." +
	"\n\t\t]" +
	"\n\t]." +
	"\n\t^ root",
	null, "2014-03-06T14:01:39Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("skudciChorobyAbionozy:text:", "kapId aString", "private", 
	"\t| root node |" +
	"\n\troot := ExtTreeNode new." +
	"\n\tself createDefaultNode ifNotNilDo: [:n | | osnova |" +
	"\n\t\t\"polozka 'vsechny choroby, skudci, abionozy'\"" +
	"\n\t\tn text: aString." +
	"\n\t\troot children add: n." +
	"\n\t\toznacKapitolu ifNotNil: [" +
	"\n\t\t\tself addPrintSelectionNodeTo: n]." +
	"\n\t\tosnova := Fytoportal data osnovaMetodikyKapitoly: kapId." +
	"\n\t\tosnova sortedKeys do: [:key |" +
	"\n\t\t\tn children add: (self createNodeOn: (osnova at: key) prefixed: kapId, '.')]." +
	"\n\t\tn allChildrenDo: [:nn | " +
	"\n\t\t\tnn cls: 'vsechnyKap']" +
	"\n\t]." +
	"\n\tself seznamSOTisk do: [:kap |" +
	"\n\t\t\"jednotlive choroby, skudci, abionozy\"" +
	"\n\t\tnode := root children add: (ExtAsyncTreeNode new" +
	"\n\t\t\tid: kap id;" +
	"\n\t\t\tlink: kap;" +
	"\n\t\t\tloader: self treeLoader;" +
	"\n\t\t\ttext: kap nazev)." +
	"\n\t\toznacKapitolu ifNotNil: [" +
	"\n\t\t\tnode " +
	"\n\t\t\t\tchecked: (vyberKapitol kapitola: kapitola id jeVybrana: node id);" +
	"\n\t\t\t\ton: #checkchange do: oznacKapitolu." +
	"\n\t\t]" +
	"\n\t]." +
	"\n\t^ root",
	null, "2014-05-20T20:38:20Z", "mp"); //fytoportal-ior

jst.FYKapitolaPanel.addMethod("seznamSOTisk", "", "private", 
	"\t^ kapitola kapitolyTiskPodlePlodin",
	null, "2014-03-06T14:11:17Z", "mp");

jst.FYKapitolaPanel.addMethod("treeLoader", "", "private", 
	"\t| osnova |" +
	"\n\t^ ExtTreeLoader couchdb" +
	"\n\t\tdataUrl: Fytoportal data metodiky osnovyMetodik url;" +
	"\n\t\tresponseDataExtractor: [:loader :node :respDict | " +
	"\n\t\t\tosnova := ((JSON full decode: (respDict at: 'responseText')) at: #rows) first at: #value." +
	"\n\t\t\tosnova sortedKeys];" +
	"\n\t\tnodeCreator: [:key |" +
	"\n\t\t\tself createNodeOn: (osnova at: key) withId: key prefixed: osnova id, #'@'];" +
	"\n\t\tyourself",
	null, "2013-01-31T09:24:13Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("treeLoader", "", "private", 
	"\t| osnova |" +
	"\n\t^ ExtTreeLoader couchdb" +
	"\n\t\tdataUrl: Fytoportal data metodiky osnovyMetodik url;" +
	"\n\t\tresponseDataExtractor: [:loader :node :respDict | " +
	"\n\t\t\tosnova := ((JSON full decode: (respDict at: 'responseText')) at: #rows) first at: #value." +
	"\n\t\t\tosnova " +
	"\n\t\t\t\tid: node id; \"id obecne osnovy prepise idem skudce atd.\"" +
	"\n\t\t\t\tnazev: node text; \"nazev skudce/choroby/abionozy\"" +
	"\n\t\t\t\tparent: node link parent; \"pripojim do hierarchie, aby se cesta zobrazila spravne\"" +
	"\n\t\t\t\tsortedKeys];" +
	"\n\t\tnodeCreator: [:key |" +
	"\n\t\t\tself createNodeOn: (osnova at: key) withId: key prefixed: osnova id, #'@'];" +
	"\n\t\tyourself",
	null, "2013-02-22T19:22:16Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("treeLoader", "", "private", 
	"\t| osnova |" +
	"\n\t^ ExtTreeLoader couchdb" +
	"\n\t\tdataUrl: Fytoportal data metodiky osnovyMetodik url;" +
	"\n\t\tresponseDataExtractor: [:loader :node :respDict | " +
	"\n\t\t\tosnova := ((JSON full decode: (respDict at: 'responseText')) at: #rows) first at: #value." +
	"\n\t\t\tosnova " +
	"\n\t\t\t\tid: node id; \"id obecne osnovy prepise idem skudce atd.\"" +
	"\n\t\t\t\tnazev: node text; \"nazev skudce/choroby/abionozy\"" +
	"\n\t\t\t\tparent: node link parent; \"pripojim do hierarchie, aby se cesta zobrazila spravne\"" +
	"\n\t\t\t\tmetodika: node link link; \"metodika SO\"" +
	"\n\t\t\t\tsortedKeys];" +
	"\n\t\tnodeCreator: [:key |" +
	"\n\t\t\tself createNodeOn: (osnova at: key) withId: key prefixed: osnova id, #'@'];" +
	"\n\t\tyourself",
	null, "2013-04-25T09:48:01Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("treeLoader", "", "private", 
	"\t| osnova |" +
	"\n\t^ ExtTreeLoader couchdb" +
	"\n\t\tdataUrl: Fytoportal data metodiky osnovyMetodik url;" +
	"\n\t\tresponseDataExtractor: [:loader :node :respDict | " +
	"\n\t\t\tosnova := ((JSON full decode: (respDict at: 'responseText')) at: #rows) first at: #value." +
	"\n\t\t\tosnova " +
	"\n\t\t\t\tid: node id; \"id obecne osnovy prepise idem skudce atd.\"" +
	"\n\t\t\t\tnazev: node text; \"nazev skudce/choroby/abionozy\"" +
	"\n\t\t\t\tparent: node link parent; \"pripojim do hierarchie, aby se cesta zobrazila spravne\"" +
	"\n\t\t\t\tmetodika: node link link; \"metodika SO\"" +
	"\n\t\t\t\tsortedKeys];" +
	"\n\t\tnodeCreator: [:key |" +
	"\n\t\t\tself createNodeOn: (osnova at: key) prefixed: osnova id, #'@'];" +
	"\n\t\tyourself",
	null, "2013-05-30T09:14:33Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("treeLoader", "", "private", 
	"\t| osnova |" +
	"\n\t^ ExtTreeLoader couchdb" +
	"\n\t\tdataUrl: Fytoportal data metodiky osnovyMetodik url;" +
	"\n\t\tresponseDataExtractor: [:loader :node :respDict | | keys |" +
	"\n\t\t\tosnova := ((JSON full decode: (respDict at: 'responseText')) at: #rows) first at: #value." +
	"\n\t\t\tkeys := osnova " +
	"\n\t\t\t\tid: node id; \"id obecne osnovy prepise idem skudce atd.\"" +
	"\n\t\t\t\tnazev: node text; \"nazev skudce/choroby/abionozy\"" +
	"\n\t\t\t\tparent: node link parent; \"pripojim do hierarchie, aby se cesta zobrazila spravne\"" +
	"\n\t\t\t\tmetodika: node link link; \"metodika SO\"" +
	"\n\t\t\t\tsortedKeys." +
	"\n\t\t\toznacKapitolu notNil & keys isEmpty not ifTrue: [" +
	"\n\t\t\t\tself addPrintSelectionNodeTo: node]." +
	"\n\t\t\tkeys];" +
	"\n\t\tnodeCreator: [:key |" +
	"\n\t\t\tself createNodeOn: (osnova at: key) prefixed: osnova id, #'@'];" +
	"\n\t\tyourself",
	null, "2013-09-26T15:54:51Z", "mp"); //fytoportal-ior

jst.FYKapitolaPanel.addMethod("addPrintSelectionNodeTo:", "node", "private", 
	"\t| id |" +
	"\n\tid := node id, #'@', #vyber." +
	"\n\tnode children add: (ExtTreeNode new " +
	"\n\t\tid: id; " +
	"\n\t\ttext: '[jen vybrané kapitoly]';" +
	"\n\t\tchecked:  (vyberKapitol at: id ifAbsent: false);" +
	"\n\t\ton: #checkchange do: oznacKapitolu)",
	null, "2013-09-26T15:47:07Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("addPrintSelectionNodeTo:", "node", "private", 
	"\t| id |" +
	"\n\tid := node id, #'@', #vse." +
	"\n\tnode children add: (ExtTreeNode new " +
	"\n\t\tid: id; " +
	"\n\t\ttext: '(všechny kapitoly)';" +
	"\n\t\tchecked:  (vyberKapitol at: id ifAbsentPut: true);" +
	"\n\t\ton: #checkchange do: oznacKapitolu)",
	null, "2013-09-27T14:59:22Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("addPrintSelectionNodeTo:", "node", "private", 
	"\t| id |" +
	"\n\tid := node id, (kapitola id = node id ifTrue: ['.'] ifFalse: [#'@']), #vse." +
	"\n\tnode children add: (ExtTreeNode new " +
	"\n\t\tid: id; " +
	"\n\t\ttext: '(všechny kapitoly)';" +
	"\n\t\tchecked:  (vyberKapitol at: id ifAbsentPut: true);" +
	"\n\t\ton: #checkchange do: oznacKapitolu)",
	null, "2013-09-27T22:30:42Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("addPrintSelectionNodeTo:", "node", "private", 
	"\t| id |" +
	"\n\tid := node id, (kapitola id = node id ifTrue: ['.'] ifFalse: [#'@']), #vse." +
	"\n\tvyberKapitol kapitola: kapitola id podkapitola: id vyber: true." +
	"\n\tnode children add: (ExtTreeNode new " +
	"\n\t\tid: id; " +
	"\n\t\ttext: '(všechny kapitoly)';" +
	"\n\t\tchecked: true;" +
	"\n\t\ton: #checkchange do: oznacKapitolu)",
	null, "2013-10-01T20:44:57Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("addPrintSelectionNodeTo:", "node", "private", 
	"\t| id vyb |" +
	"\n\tid := node id, (kapitola id = node id ifTrue: ['.'] ifFalse: [#'@']), #vse." +
	"\n\t\"vsechny kapitoly SO nebudou defaultne oznacene\"" +
	"\n\tvyb := (id includes: '@') not." +
	"\n\tvyberKapitol kapitola: kapitola id podkapitola: id vyber: vyb." +
	"\n\tnode children add: (ExtTreeNode new " +
	"\n\t\tid: id; " +
	"\n\t\ttext: '(všechny kapitoly)';" +
	"\n\t\tchecked: vyb;" +
	"\n\t\ton: #checkchange do: oznacKapitolu)",
	null, "2014-01-06T08:07:58Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("addPrintSelectionNodeTo:", "node", "private", 
	"\t| id |" +
	"\n\tid := node id, (kapitola id = node id ifTrue: ['.'] ifFalse: [#'@']), #vse." +
	"\n\tnode children add: (ExtTreeNode new " +
	"\n\t\tid: id; " +
	"\n\t\ttext: '(všechny kapitoly)';" +
	"\n\t\tchecked: (vyberKapitol kapitola: kapitola id jeVybrana: id);" +
	"\n\t\ton: #checkchange do: oznacKapitolu)",
	null, "2014-02-21T14:08:04Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("addPrintSelectionNodeTo:", "node", "private", 
	"\t| id |" +
	"\n\tid := node id, (kapitola id = node id ifTrue: ['.'] ifFalse: [#'@']), #vse." +
	"\n\tnode children add: (ExtTreeNode new " +
	"\n\t\tid: id; " +
	"\n\t\ttext: '(všechny kapitoly)';" +
	"\n\t\tcls: 'vsechnyKap';" +
	"\n\t\tchecked: (vyberKapitol kapitola: kapitola id jeVybrana: id);" +
	"\n\t\ton: #checkchange do: oznacKapitolu)",
	null, "2014-05-20T20:35:09Z", "mp"); //fytoportal-ior

jst.FYKapitolaPanel.addMethod("abionozy", "", "private-root", 
	"\t^ self" +
	"\n\t\tskudciChorobyAbionozy: #abionozy" +
	"\n\t\ttext: '(všechny faktory)'",
	null, "2013-01-15T16:18:35Z", "mp");

jst.FYKapitolaPanel.addMethod("choroby", "", "private-root", 
	"\t^ self" +
	"\n\t\tskudciChorobyAbionozy: #choroby " +
	"\n\t\ttext: '(všechny choroby)'",
	null, "2013-01-15T16:18:43Z", "mp");

jst.FYKapitolaPanel.addMethod("skudci", "", "private-root", 
	"\t^ self " +
	"\n\t\tskudciChorobyAbionozy: #skudci" +
	"\n\t\ttext: '(všichni škůdci)'",
	null, "2013-01-15T16:18:52Z", "mp");

jst.FYKapitolaPanel.addMethod("installListeners", "", "initialization", 
	"\tsuper installListeners." +
	"\n\tself initNavigator",
	null, "2013-01-31T22:19:27Z", "mp");

jst.FYKapitolaPanel.addMethod("initNavigator", "", "initialization", 
	"\tFytoportal navigator ior kapitolaPM" +
	"\n\t\tcomponent: self;" +
	"\n\t\tinstallStandardTreeListenersWith: [:n | true];" +
	"\n\t\tonEnter: [:path :node | " +
	"\n\t\t\tnode id = #tisk " +
	"\n\t\t\t\tifTrue: [path label: nil]" +
	"\n\t\t\t\tifFalse: [path label: (self nazevSO: (node id copyUpTo: #'@'))]." +
	"\n\t\t\tself changed: #kapitola with: node]",
	null, "2013-01-31T22:19:47Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("initNavigator", "", "initialization", 
	"\tFytoportal navigator ior kapitolaPM" +
	"\n\t\tcomponent: self;" +
	"\n\t\tinstallStandardTreeListenersWith: [:n | true];" +
	"\n\t\tonEnter: [:path :node | " +
	"\n\t\t\t\"nazev skudce nebo nil\"" +
	"\n\t\t\tpath label: (self nazevSO: (node id copyUpTo: #'@'))." +
	"\n\t\t\tself changed: #kapitola with: node]",
	null, "2013-05-30T08:58:46Z", "mp", 2);

jst.FYKapitolaPanel.addMethod("initNavigator", "", "initialization", 
	"\tFytoportal navigator ior kapitolaPM" +
	"\n\t\tcomponent: self;" +
	"\n\t\tinstallStandardTreeListenersWith: [:n | n link isNil or: [n link jeKapitola]];" +
	"\n\t\tonEnter: [:path :node | " +
	"\n\t\t\t\"nazev skudce nebo nil\"" +
	"\n\t\t\tpath label: (self nazevSO: (node id copyUpTo: #'@'))." +
	"\n\t\t\tself changed: #kapitola with: node]",
	null, "2013-11-05T19:55:06Z", "mp", 3);

jst.FYKapitolaPanel.addMethod("initNavigator", "", "initialization", 
	"\tFytoportal navigator ior kapitolaPM" +
	"\n\t\tcomponent: self;" +
	"\n\t\tinstallStandardTreeListenersWith: [:n | n link notNil and: [n link jeKapitola1 " +
	"\n\t\t\tor: [ | sezn | \"jedna plodina nebo jeden SO, posledni podminka hlida, ze jsem klikl na SO a ne jeho kapitolu\"" +
	"\n\t\t\t\tkapitola jeKapitolaTaxony and: [(sezn := kapitola seznamSO) size = 1] and: [sezn first = n link]]" +
	"\n\t\t\tor: [\"klikl jsem na SO nebo na jeho kapitolu, ovsem jen znamena-li to zmenu SO\" " +
	"\n\t\t\t\tkapitola jeKapitolaSO and: [prevNode isNil or: [(prevNode id copyUpTo: '@') ~= (n id copyUpTo: '@')]]]" +
	"\n\t\t]] delayed: 300;" +
	"\n\t\tonEnter: [:path :node | " +
	"\n\t\t\t\"nazev skudce nebo nil\"" +
	"\n\t\t\tpath label: (self nazevSO: (node id copyUpTo: #'@'))." +
	"\n\t\t\tself changed: #kapitola with: node." +
	"\n\t\t\tprevNode := node]",
	null, "2014-01-01T16:11:43Z", "mp", 4);

jst.FYKapitolaPanel.addMethod("initNavigator", "", "initialization", 
	"\tFytoportal navigator ior kapitolaPM" +
	"\n\t\tcomponent: self;" +
	"\n\t\tinstallStandardTreeListenersWith: [:n | prevNode isNil or: [" +
	"\n\t\t\t\"napoprve vzdy, prevNode je totiz nil\"" +
	"\n\t\t\tkapitola jeKapitolaSO and: [kapitola seznamSO size > 0] and: [" +
	"\n\t\t\t\"klikl jsem na SO nebo na jeho kapitolu, ovsem jen znamena-li to zmenu SO\" " +
	"\n\t\t\t(prevNode id findTokens: '.@') first ~= (n id findTokens: '.@') first]]" +
	"\n\t\t] delayed: 300;" +
	"\n\t\tonEnter: [:path :node |" +
	"\n\t\t\t\"nazev skudce nebo nil\"" +
	"\n\t\t\tpath label: (self nazevSO: (node id copyUpTo: #'@'))." +
	"\n\t\t\tself changed: #kapitola with: node." +
	"\n\t\t\tprevNode := node]",
	null, "2014-02-11T22:25:59Z", "mp", 5);

jst.FYKapitolaPanel.addMethod("initNavigator", "", "initialization", 
	"\tFytoportal navigator ior kapitolaPM" +
	"\n\t\tcomponent: self;" +
	"\n\t\tinstallStandardTreeListenersWith: [:n | prevNode isNil or: [kapitola id = #plodiny] or: [" +
	"\n\t\t\t\"napoprve vzdy, prevNode je totiz nil\"" +
	"\n\t\t\tkapitola jeKapitolaSO and: [kapitola seznamSO size > 0] and: [" +
	"\n\t\t\t\"klikl jsem na SO nebo na jeho kapitolu, ovsem jen znamena-li to zmenu SO\" " +
	"\n\t\t\t(prevNode id findTokens: '.@') first ~= (n id findTokens: '.@') first]]" +
	"\n\t\t] delayed: 300;" +
	"\n\t\tonEnter: [:path :node |" +
	"\n\t\t\t\"nazev skudce nebo nil\"" +
	"\n\t\t\tpath label: (self nazevSO: (node id copyUpTo: #'@'))." +
	"\n\t\t\tself changed: #kapitola with: node." +
	"\n\t\t\tprevNode := node]",
	null, "2014-03-16T22:05:48Z", "mp"); //fytoportal-ior

jst.FYKapitolaPanel.addMethod("nazevSO:", "id", "private", 
	"\t^ (kapitola obsah asCollection detect: [:k | k linkId = id] ifNone: nil) ifNotNilDo: [:k | " +
	"\n\t\tk nazev]",
	null, "2013-01-31T09:20:16Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("nazevSO:", "id", "private", 
	"\t^ (kapitola seznamSO detect: [:k | k linkId = id] ifNone: nil) ifNotNilDo: [:k | " +
	"\n\t\tk nazev]",
	null, "2013-12-30T23:09:21Z", "mp", 2);

jst.FYKapitolaPanel.addMethod("nazevSO:", "id", "private", 
	"\t^ (kapitola jeKapitolaSO and: [id isEmpty not]) " +
	"\n\t\tifTrue: [(kapitola seznamSO detect: [:k | k linkId = id] ifNone: nil) ifNotNilDo: [:k | " +
	"\n\t\t\tk nazev]]" +
	"\n\t\tifFalse: nil",
	null, "2014-01-01T15:22:41Z", "mp", 3);

jst.FYKapitolaPanel.addMethod("nazevSO:", "id", "private", 
	"\t^ (kapitola jeKapitolaSO and: [id isEmpty not]) " +
	"\n\t\tifTrue: [(kapitola seznamSO detect: [:k | k linkId = id] ifNone: nil) ifNotNilDo: [:k | " +
	"\n\t\t\tk nazev truncateWithElipsisTo: 50]]" +
	"\n\t\tifFalse: nil",
	null, "2014-02-17T22:34:20Z", "mp", 4);

//navic i nazev plodiny
jst.FYKapitolaPanel.addMethod("nazevSO:", "id", "private", 
	"\t^ (kapitola jeKapitolaTaxony and: [id isEmpty not]) " +
	"\n\t\tifTrue: [(kapitola seznamSO detect: [:k | k linkId = id] ifNone: nil) ifNotNilDo: [:k | " +
	"\n\t\t\tk nazev truncateWithElipsisTo: 50]]" +
	"\n\t\tifFalse: nil",
	null, "2014-03-27T08:51:24Z", "mp"); //fytoportal-ior

//*** FYTextKapitolyPanel ***

/*
jst.FYTextKapitolyPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\twithFitLayout;" +
	"\n\t\tpadding: 5;" +
	"\n\t\tadd: (view := ExtDataView new" +
	"\n\t\t\tautoScroll: true;" +
	"\n\t\t\tstore: self createStore;" +
	"\n\t\t\ttpl: self createTemplate;" +
	"\n\t\t\titemSelector: 'div.kapitola')",
	null, "2012-11-15T10:38:08Z", "mp");

jst.FYTextKapitolyPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\tautoScroll: true;" +
	"\n\t\tpadding: 5",
	null, "2013-02-04T21:55:13Z", "mp");

jst.FYTextKapitolyPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\twithCenterLayout;" +
	"\n\t\tadd: (page := ExtBoxComponent new width: 900; style: 'padding: 5px; background-color: white')",
	null, "2013-02-17T15:58:38Z", "mp");
*/
jst.FYTextKapitolyPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\twithCenterLayout;" +
	"\n\t\tadd: (page := ExtBoxComponent new width: 900; style: 'padding: 5px; background-color: white')." +
	"\n\tsemaforId := ExtCore current nextId." +
	"\n\t\"semafor budeme nacitat az pri vizualni aktivaci\"" +
	"\n\tsemaforData := #()",
	null, "2013-04-29T09:38:04Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\twithCenterLayout;" +
	"\n\t\tadd: (page := ExtBoxComponent new cls: 'ior-page')." +
	"\n\tsemaforId := ExtCore current nextId." +
	"\n\t\"semafor budeme nacitat az pri vizualni aktivaci\"" +
	"\n\tsemaforData := #()",
	null, "2013-08-30T15:03:36Z", "mp", 2);

jst.FYTextKapitolyPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\twithCenterLayout;" +
	"\n\t\tadd: (page := ExtBoxComponent new cls: 'ior-page')." +
	"\n\tsemaforId := ExtCore current nextId." +
	"\n\t\"semafor budeme nacitat az pri vizualni aktivaci\"" +
	"\n\tsemaforData := #()." +
	"\n\tprekresli := false",
	null, "2014-03-18T16:08:01Z", "mp", 3);

jst.FYTextKapitolyPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\twithCenterLayout;" +
	"\n\t\tadd: (page := ExtBoxComponent new cls: 'ior-page')." +
	"\n\tsemaforIds := Dictionary new." +
	"\n\t\"semafor budeme nacitat az pri vizualni aktivaci\"" +
	"\n\tsemaforData := Dictionary new." +
	"\n\tprekresli := false",
	null, "2014-04-23T20:54:57Z", "mp"); //fytoportal-ior

/* presunuto do FYTiskTaxonu
jst.FYTextKapitolyPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\twithCenterLayout;" +
	"\n\t\tadd: (page := ExtBoxComponent new cls: 'ior-page')." +
	"\n\tsemaforId := ExtCore current nextId." +
	"\n\t\"semafor budeme nacitat az pri vizualni aktivaci\"" +
	"\n\tsemaforData := #()." +
	"\n\tfotoClick := [:ev | (ev target attributeAt: #fotka)" +
	"\n\t\tifNil: [self inform: 'Fotografie taxonu dosud neexistuje']" +
	"\n\t\tifNotNilDo: [:fotoId | FYFotoWindow new " +
	"\n\t\t\tanimateTarget: ev target;" +
	"\n\t\t\tplodina: ((ev target attributeAt: #plodina) ifNotNilDo: [:pl | " +
	"\n\t\t\t\tFYPlodina new id: pl; cesky: ev target alt]);" +
	"\n\t\t\tskodlOrg: ((ev target attributeAt: #skodlOrg) ifNotNilDo: [:sk | " +
	"\n\t\t\t\tFYSkodlOrg new id: sk; cesky: ev target alt]);" +
	"\n\t\t\tvyber: fotoId;" +
	"\n\t\t\tshow]" +
	"\n\t]",
	null, "2014-02-26T22:00:58Z", "mp"); //fytoportal-ior
*/

jst.FYTextKapitolyPanel.addMethod("contents:", "anObject", "rendering", 
	"\tpage contents: anObject",
	null, "2013-02-16T22:01:22Z", "mp");

jst.FYTextKapitolyPanel.addMethod("body", "", "rendering", 
	"\t^ page body",
	null, "2014-02-26T18:46:59Z", "mp");

/*
jst.FYTextKapitolyPanel.addMethod("initialize", "", "initialization", 
	"\t| pw |" +
	"\n\tpw := 900." +
	"\n\tsuper initialize" +
	"\n\t\tcls: 'x-panel-mc';" +
	"\n\t\twithAbsoluteLayout;" +
	"\n\t\tautoScroll: true;" +
	"\n\t\tadd: (page := ExtPanel new border: false; padding: 5; width: pw; bodyStyle: 'background-color: white');" +
	"\n\t\ton: #resize do: [:p :w :h | " +
	"\n\t\t\tpage x: ((w - pw / 2) max: 0)]",
	null, "2013-02-15T14:29:08Z", "mp");

jst.FYTextKapitolyPanel.addMethod("refreshContent", "", "rendering", 
	"\tpage htmlContents: [:html |" +
	"\n\t\tself renderContentOn: html]",
	null, "2013-02-14T12:19:12Z", "mp");
*/

jst.FYTextKapitolyPanel.addMethod("kapitolaId:", "aString", "accessing", 
	"\tid := aString",
	null, "2012-11-09T10:35:31Z", "mp");

jst.FYTextKapitolyPanel.addMethod("kapitolaId", "", "accessing", 
	"\t^ id",
	null, "2012-11-09T10:35:40Z", "mp");

/*
jst.FYTextKapitolyPanel._class.addMethod("kapitola:id:", "aKapitolaPM aString", "instance creation", 
	"\t^ self new" +
	"\n\t\tkapitola: aKapitolaPM;" +
	"\n\t\tkapitolaId: aString;" +
	"\n\t\ttitle: aKapitolaPM nazev",
	null, "2012-11-09T10:34:41Z", "mp");
*/

jst.FYTextKapitolyPanel._class.addMethod("kapitolaId:", "aString", "instance creation", 
	"\taString = #plodiny ifTrue: [" +
	"\n\t\t^ FYTextKapPlodinyPanel new kapitolaId: aString]." +
	"\n\taString = #choroby | (aString = #skudci) | (aString = #abionozy) ifTrue: [" +
	"\n\t\t^ FYTextKapSOPanel new kapitolaId: aString]." +
	"\n\t^ self new kapitolaId: aString",
	null, "2013-01-03T16:07:39Z", "mp");

jst.FYTextKapitolyPanel.addMethod("kapitola", "", "accessing", 
	"\t^ kapitola",
	null, "2012-11-09T16:48:54Z", "mp");

jst.FYTextKapitolyPanel.addMethod("podkapitolaId", "", "accessing", 
	"\t\"id vybrane podkapitoly, pri aktivaci panelu obnovim vyber ve stromecku vlevo dole\"" +
	"\n\t^ nil",
	null, "2013-01-31T09:57:29Z", "mp");

jst.FYTextKapitolyPanel.addMethod("nactiKapitolu:", "metodika", "accessing", 
	"\t| dict |" +
	"\n\tkapitola := metodika jeMetodikaSO" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tdict := Dictionary new." +
	"\n\t\t\tmetodika at: id]" +
	"\n\t\tifTrue: [" +
	"\n\t\t\tdict := metodika taxon asDictionary." +
	"\n\t\t\tmetodika]." +
	"\n\tdict at: #kapitoly put: (kapitola kapitoly collect: [:kap | " +
	"\n\t\tDictionary new " +
	"\n\t\t\tat: #id put: kap id;" +
	"\n\t\t\tat: #uroven put: kap uroven; " +
	"\n\t\t\tat: #nazev put: kap nazev; " +
	"\n\t\t\tat: #obsah put: kap obsah; " +
	"\n\t\t\tasJsObject])." +
	"\n\tself template overwrite: self body with: dict",
	null, "2013-02-04T21:50:48Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("nactiKapitolu:", "metodika", "accessing", 
	"\tkapitola := metodika jeMetodikaSO" +
	"\n\t\tifFalse: [metodika at: id]" +
	"\n\t\tifTrue: metodika." +
	"\n\tself refreshContent",
	null, "2013-02-05T14:18:59Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("nactiKapitolu:", "metodika", "accessing", 
	"\t| kap |" +
	"\n\tkap := metodika jeMetodikaSO" +
	"\n\t\tifFalse: [metodika at: id]" +
	"\n\t\tifTrue: metodika." +
	"\n\t(kapitola notNil and: [kapitola metodika == kap metodika]) ifFalse: [" +
	"\n\t\tkapitola := kap." +
	"\n\t\tself refreshContent]",
	null, "2013-04-24T19:19:28Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("nactiKapitolu:", "kap", "accessing", 
	"\t(kapitola notNil and: [kapitola metodika == kap metodika]) ifFalse: [" +
	"\n\t\tkapitola := kap." +
	"\n\t\tself refreshContent]",
	null, "2013-05-03T09:31:02Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("nactiKapitolu:", "kap", "accessing", 
	"\t(kapitola notNil and: [kapitola metodika == kap metodika]) ifFalse: [" +
	"\n\t\tkapitola := kap." +
	"\n\t\tsemaforData := nil." +
	"\n\t\tself refreshContent]",
	null, "2014-02-16T20:57:02Z", "mp"); //fytoportal-ior

/*
jst.FYTextKapitolyPanel.addMethod("createStore", "", "private", 
	"\t^ ExtJsonStore new fields: {" +
	"\n\t\tExtField new name: 'nazev'." +
	"\n\t\tExtField new name: 'uroven'." +
	"\n\t\tExtField new name: 'obsah'" +
	"\n\t}",
	null, "2013-01-31T15:28:59Z", "mp");

jst.FYTextKapitolyPanel.addMethod("createTemplate", "", "private", 
	"\t^ ExtXTemplate new " +
	"\n\t\tcompiled: true; " +
	"\n\t\thtmlContents: [:html | html tpl: [" +
	"\n\t\t\thtml div class: #kapitola; with: [" +
	"\n\t\t\t\thtml div class: #nazev, '{uroven}';  with: '{nazev}'." +
	"\n\t\t\t\thtml div class: #obsah; with: '{obsah}'" +
	"\n\t\t\t]" +
	"\n\t\t]]",
	null, "2013-01-31T08:38:39Z", "mp");

jst.FYTextKapitolyPanel.addMethod("template", "", "private", 
	"\t^ ExtXTemplate new htmlContents: [:html | " +
	"\n\t\thtml render: FYTaxon." +
	"\n\t\thtml tpl for: #kapitoly; with: [" +
	"\n\t\t\thtml div class: #kapitola; with: [" +
	"\n\t\t\t\thtml div class: #nazev, '{uroven}';  with: '{nazev}'." +
	"\n\t\t\t\thtml div class: #obsah; with: '{obsah}'" +
	"\n\t\t\t]" +
	"\n\t\t]]",
	null, "2013-02-04T22:27:34Z", "mp");
*/

jst.FYTextKapitolyPanel.addMethod("renderContentOn:", "html", "rendering", 
	"\tkapitola jeMetodikaSO ifTrue: [" +
	"\n\t\thtml div class: 'kapitola-taxon'; with: [" +
	"\n\t\t\thtml render: kapitola taxon]]." +
	"\n\tkapitola kapitoly do: [:kap | " +
	"\n\t\thtml div class: 'kapitola'; with: [" +
	"\n\t\t\thtml div class: 'nazev', kap uroven asString;  with: kap nazev." +
	"\n\t\t\thtml div class: 'obsah'; with: [html html: kap obsah]]]",
	null, "2013-02-18T10:10:03Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("renderContentOn:", "html", "rendering", 
	"\tkapitola renderOn: html",
	null, "2013-04-15T13:56:38Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("renderContentOn:", "html", "rendering", 
	"\tkapitola jeMetodikaSO ifTrue: [" +
	"\n\t\thtml div " +
	"\n\t\t\tclass: 'kapitola-taxon'; " +
	"\n\t\t\twith: [kapitola taxon renderOn: html]]." +
	"\n\tkapitola kapitoly do: [:kap | " +
	"\n\t\thtml div class: 'kapitola'; with: [" +
	"\n\t\t\thtml div " +
	"\n\t\t\t\tclass: 'nazev', kap uroven asString;  " +
	"\n\t\t\t\twith: kap nazev." +
	"\n\t\t\tkap class == FYKapitolaPOR " +
	"\n\t\t\t\tifTrue: [self renderKapitolaPOR: kap on: html]" +
	"\n\t\t\t\tifFalse: [html div " +
	"\n\t\t\t\t\tclass: 'obsah'; " +
	"\n\t\t\t\t\twith: [html html: kap obsah]] " +
	"\n\t\t]" +
	"\n\t]",
	null, "2013-04-29T08:35:29Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("renderContentOn:", "html", "rendering", 
	"\tkapitola jeMetodikaSO ifTrue: [" +
	"\n\t\thtml div " +
	"\n\t\t\tclass: 'kapitola-taxon'; " +
	"\n\t\t\twith: [kapitola taxon renderOn: html]]." +
	"\n\tkapitola kapitoly do: [:kap | " +
	"\n\t\tkap renderTextOn: html of: self]",
	null, "2013-05-02T07:50:57Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("renderContentOn:", "html", "rendering", 
	"\tmetodikaSO ifNotNil: [" +
	"\n\t\thtml div " +
	"\n\t\t\tclass: 'kapitola-taxon'; " +
	"\n\t\t\twith: [metodikaSO taxon renderOn: html]]." +
	"\n\t(metodikaSO ifNil: kapitola) kapitoly do: [:kap | " +
	"\n\t\t| prepsanaKap |" +
	"\n\t\t(metodikaSO notNil and: [(prepsanaKap := kapitola najdiKapitolu: kap id) notNil] " +
	"\n\t\t\tand: [prepsanaKap obsah isEmptyOrNil not])" +
	"\n\t\t\t\tifTrue: [prepsanaKap renderTextOn: html of: self]" +
	"\n\t\t\t\tifFalse: [kap renderTextOn: html of: self]" +
	"\n\t]",
	null, "2013-05-03T10:04:11Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("renderContentOn:", "html", "rendering", 
	"\tmetodikaSO ifNotNil: [" +
	"\n\t\thtml div " +
	"\n\t\t\tclass: 'kapitola-taxon'; " +
	"\n\t\t\twith: [metodikaSO taxon renderOn: html]]." +
	"\n\t(metodikaSO ifNil: kapitola) kapitoly select: [:kap | kap jeVyrazena not] thenDo: [:kap | " +
	"\n\t\t| prepsanaKap |" +
	"\n\t\t(metodikaSO notNil and: [(prepsanaKap := kapitola najdiKapitolu: kap id) notNil] " +
	"\n\t\t\tand: [prepsanaKap obsah isEmptyOrNil not] and: [prepsanaKap jeVyrazena not])" +
	"\n\t\t\t\tifTrue: [prepsanaKap renderTextOn: html of: self]" +
	"\n\t\t\t\tifFalse: [kap renderTextOn: html of: self]" +
	"\n\t]",
	null, "2013-11-08T19:41:23Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("renderContentOn:", "html", "rendering", 
	"\tmetodikaSO ifNotNil: [html div " +
	"\n\t\tclass: 'kapitola-taxon'; " +
	"\n\t\twith: [self fotkaSO ifNotNilDo: [:foto | " +
	"\n\t\t\thtml img " +
	"\n\t\t\t\tclass: 'fotka';" +
	"\n\t\t\t\theight: 150; " +
	"\n\t\t\t\twidth: foto format * 150; " +
	"\n\t\t\t\tsrc: foto preview;" +
	"\n\t\t\t\ttitle: foto popis]." +
	"\n\t\t\tmetodikaSO taxon renderOn: html]" +
	"\n\t]." +
	"\n\t(metodikaSO ifNil: kapitola) kapitoly select: [:kap | kap jeVyrazena not] thenDo: [:kap | " +
	"\n\t\t| prepsanaKap |" +
	"\n\t\t(metodikaSO notNil and: [(prepsanaKap := kapitola najdiKapitolu: kap id) notNil] " +
	"\n\t\t\tand: [prepsanaKap obsah isEmptyOrNil not] and: [prepsanaKap jeVyrazena not])" +
	"\n\t\t\t\tifTrue: [prepsanaKap renderTextOn: html of: self]" +
	"\n\t\t\t\tifFalse: [kap renderTextOn: html of: self]" +
	"\n\t]",
	null, "2013-11-28T14:38:33Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("renderContentOn:", "html", "rendering", 
	"\tmetodikaSO ifNotNil: [html div " +
	"\n\t\tclass: 'kapitola-taxon'; " +
	"\n\t\twith: [self fotkaSO ifNotNilDo: [:foto | " +
	"\n\t\t\thtml img " +
	"\n\t\t\t\tclass: 'fotka';" +
	"\n\t\t\t\theight: 150; " +
	"\n\t\t\t\twidth: foto format * 150; " +
	"\n\t\t\t\tsrc: foto preview;" +
	"\n\t\t\t\ttitle: foto popis]." +
	"\n\t\t\tmetodikaSO taxon renderOn: html]." +
	"\n\t]." +
	"\n\tkapitola kapitolyTisk do: [:kap |" +
	"\n\t\tkap renderTextOn: html of: self]",
	null, "2013-12-07T21:48:51Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("renderContentOn:", "html", "rendering", 
	"\tself renderPopisTaxonuOn: html." +
	"\n\tkapitola kapitolyTisk do: [:kap |" +
	"\n\t\tkap renderTextOn: html of: self]",
	null, "2013-12-29T22:14:17Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("renderContentOn:", "html", "rendering", 
	"\tself renderPopisTaxonuOn: html." +
	"\n\tkapitola kapitolyTiskVyber do: [:kap |" +
	"\n\t\tkap renderTextOn: html of: self]",
	null, "2013-12-30T22:13:50Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("renderContentOn:", "html", "rendering", 
	"\tkapitola renderOn: html." +
	"\n\tkapitola kapitolyTiskVyber do: [:kap |" +
	"\n\t\tkap renderTextOn: html of: self]",
	null, "2014-03-06T20:35:15Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("renderContentOn:", "html", "rendering", 
	"\tself renderPopisTaxonuOn: html." +
	"\n\tkapitola kapitolyTiskVyber do: [:kap |" +
	"\n\t\tkap renderTextOn: html of: self]",
	null, "2014-03-07T21:23:42Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("renderContentOn:", "html", "rendering", 
	"\thtml div class: 'kapitola-taxon'; with: [" +
	"\n\t\tmetodikaSO ifNotNil: [" +
	"\n\t\t\tFYTiskTaxonuIOR new " +
	"\n\t\t\t\teditace: self jeNahledKapitoly;" +
	"\n\t\t\t\tkapitola: kapitola; " +
	"\n\t\t\t\trenderOn: html]." +
	"\n\t\tself podkapitolyTisk do: [:kap |" +
	"\n\t\t\tkap renderTextOn: html of: self]]",
	null, "2014-03-08T19:44:06Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("renderContentOn:", "html", "rendering", 
	"\thtml div class: 'kapitola-taxon'; with: [" +
	"\n\t\t(metodikaSO notNil and: [metodikaSO id notNil]) ifTrue: [" +
	"\n\t\t\t\"navic i mimo novou metodiku\"" +
	"\n\t\t\tFYTiskTaxonuIOR new " +
	"\n\t\t\t\teditace: self jeNahledKapitoly;" +
	"\n\t\t\t\tkapitola: kapitola; " +
	"\n\t\t\t\trenderOn: html]." +
	"\n\t\tself podkapitolyTisk do: [:kap |" +
	"\n\t\t\tkap renderTextOn: html of: self]]",
	null, "2014-03-10T13:58:16Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("renderContentOn:", "html", "rendering", 
	"\t| div |" +
	"\n\tdiv := html div." +
	"\n\tmetodikaSO ifNotNil: [" +
	"\n\t\tdiv class: 'kapitola-taxon']." +
	"\n\tdiv with: [" +
	"\n\t\t(metodikaSO notNil and: [metodikaSO id notNil]) ifTrue: [" +
	"\n\t\t\t\"navic i mimo novou metodiku\"" +
	"\n\t\t\tFYTiskTaxonuIOR new " +
	"\n\t\t\t\teditace: self jeNahledKapitoly;" +
	"\n\t\t\t\tkapitola: kapitola; " +
	"\n\t\t\t\trenderOn: html]." +
	"\n\t\tself podkapitolyTisk do: [:kap |" +
	"\n\t\t\tkap renderTextOn: html of: self]]",
	null, "2014-03-17T15:29:33Z", "mp"); //fytoportal-ior

jst.FYTextKapitolyPanel.addMethod("podkapitolyTisk", "", "private", 
	"\t^ kapitola kapitolyTiskVyber",
	null, "2014-03-08T19:42:04Z", "mp");

/*
jst.FYTextKapitolyPanel.addMethod("renderFoto:width:height:taxon:on:", "foto w h tax html", "rendering", 
	"\thtml img " +
	"\n\t\tclass: 'fotka'; " +
	"\n\t\tattributeAt: #plodina put: (tax jePlodina ifTrue: [tax id]);" +
	"\n\t\tattributeAt: #skodlOrg put: (tax jePlodina ifFalse: [tax id]);" +
	"\n\t\tattributeAt: #fotka put: foto id;" +
	"\n\t\talt: tax asString;" +
	"\n\t\theight: h; " +
	"\n\t\twidth: w; " +
	"\n\t\tsrc: foto preview;" +
	"\n\t\ttitle: foto popis;" +
	"\n\t\ton: #click do: fotoClick",
	null, "2014-02-26T21:22:05Z", "mp");

jst.FYTextKapitolyPanel.addMethod("renderPopisTaxonuOn:", "html", "rendering", 
	"\tmetodikaSO ifNotNil: [html div " +
	"\n\t\tclass: 'kapitola-taxon'; " +
	"\n\t\twith: [self fotkaSO ifNotNilDo: [:foto | " +
	"\n\t\t\thtml img " +
	"\n\t\t\t\tclass: 'fotka';" +
	"\n\t\t\t\theight: 150; " +
	"\n\t\t\t\twidth: (foto format * 150) rounded; " +
	"\n\t\t\t\tsrc: foto preview;" +
	"\n\t\t\t\ttitle: foto popis]." +
	"\n\t\t\tmetodikaSO taxon renderOn: html]." +
	"\n\t]",
	null, "2013-12-29T22:11:46Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("renderPopisTaxonuOn:", "html", "rendering", 
	"\tmetodikaSO ifNotNil: [html div " +
	"\n\t\tclass: 'kapitola-taxon'; " +
	"\n\t\twith: [" +
	"\n\t\t\tself fotkaSO ifNotNilDo: [:foto | " +
	"\n\t\t\t\tself renderFoto: foto " +
	"\n\t\t\t\t\twidth: (foto format * 150) rounded" +
	"\n\t\t\t\t\theight: 150 " +
	"\n\t\t\t\t\ttaxon: metodikaSO taxon " +
	"\n\t\t\t\t\ton: html]." +
	"\n\t\t\tmetodikaSO taxon renderOn: html" +
	"\n\t\t]" +
	"\n\t]",
	null, "2014-02-26T21:14:53Z", "mp", 2);

jst.FYTextKapitolyPanel.addMethod("renderPopisTaxonuOn:", "html", "rendering", 
	"\tmetodikaSO ifNotNil: [" +
	"\n\t\tFYTiskTaxonuIOR new " +
	"\n\t\t\teditace: self jeNahledKapitoly;" +
	"\n\t\t\tkapitola: kapitola; " +
	"\n\t\t\trenderOn: html]",
	null, "2014-03-07T21:49:23Z", "mp"); //fytoportal-ior

jst.FYTextKapitolyPanel.addMethod("fotkaSO", "", "private", 
	"\t^ self kapitola fotky at: metodikaSO taxon id ifAbsent: nil",
	null, "2013-11-28T14:36:14Z", "mp");
*/

jst.FYTextKapitolyPanel.addMethod("renderKapitolaPOR:on:", "kap html", "rendering", 
	"\t| gr |" +
	"\n\tgr := kap createGrid." +
	"\n\thtml div " +
	"\n\t\tclass: 'obsah'; " +
	"\n\t\tid: semaforId;" +
	"\n\t\tstyle: ('height: {1}px; background: url(''images/loader-flower-blue.gif'') no-repeat center center' format: {gr height})." +
	"\n\tsemaforData ifNotNil: [" +
	"\n\t\tgr store loadData: semaforData." +
	"\n\t\tgr renderTo: semaforId." +
	"\n\t\t[gr show] delayed: 100" +
	"\n\t] ifNil: [Fytoportal data pripravky nactiSemaforPro: kap semaforParams pak: [:data | " +
	"\n\t\tsemaforData := data." +
	"\n\t\tgr store loadData: data." +
	"\n\t\tgr renderTo: semaforId; show]" +
	"\n\t]",
	null, "2013-04-29T09:12:24Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("renderKapitolaPOR:on:", "kap html", "rendering", 
	"\t| gr dv |" +
	"\n\tgr := kap createGrid." +
	"\n\tdv := html div " +
	"\n\t\tclass: 'obsah'; " +
	"\n\t\tid: semaforId." +
	"\n\tsemaforData ifNotNil: [" +
	"\n\t\tgr store loadData: semaforData." +
	"\n\t\tgr renderTo: semaforId." +
	"\n\t\t[gr show] delayed: 100" +
	"\n\t] ifNil: [" +
	"\n\t\tdv style: ('height: {1}px; background: url(''images/loader-flower-blue.gif'') no-repeat center center' format: {gr height})." +
	"\n\t\tFytoportal data pripravky nactiSemaforPro: kap semaforParams pak: [:data | " +
	"\n\t\t\tsemaforData := data." +
	"\n\t\t\tgr store loadData: data." +
	"\n\t\t\tgr renderTo: semaforId; show]" +
	"\n\t]",
	null, "2013-04-30T09:43:44Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("renderKapitolaPOR:on:", "kap html", "rendering", 
	"\t| gr dv |" +
	"\n\tgr := self createGrid." +
	"\n\tdv := html div " +
	"\n\t\tclass: 'obsah'; " +
	"\n\t\tid: semaforId." +
	"\n\tsemaforData ifNotNil: [" +
	"\n\t\tgr store loadData: semaforData." +
	"\n\t\tgr renderTo: semaforId." +
	"\n\t\t[gr show] delayed: 100" +
	"\n\t] ifNil: [" +
	"\n\t\tdv style: ('height: {1}px; background: url(''images/loader-flower-blue.gif'') no-repeat center center' format: {gr height})." +
	"\n\t\tFytoportal data pripravky nactiSemaforPro: self semaforParams pak: [:data | " +
	"\n\t\t\tsemaforData := data." +
	"\n\t\t\tgr store loadData: data." +
	"\n\t\t\tgr renderTo: semaforId; show]" +
	"\n\t]",
	null, "2013-05-03T10:09:25Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("renderKapitolaPOR:on:", "kap html", "rendering", 
	"\t| dv |" +
	"\n\tdv := html div " +
	"\n\t\tclass: 'obsah'; " +
	"\n\t\tid: semaforId." +
	"\n\tsemaforData ifNotNil: [ | gr |" +
	"\n\t\tgr := self createGrid." +
	"\n\t\tgr store loadData: semaforData." +
	"\n\t\tgr renderTo: semaforId." +
	"\n\t\t[gr show] delayed: 100" +
	"\n\t] ifNil: [" +
	"\n\t\tdv style: 'height: 200px; background: url(''images/loader-flower-blue.gif'') no-repeat center center'." +
	"\n\t\tFytoportal data pripravky nactiSemaforPro: self semaforParams pak: [:data |" +
	"\n\t\t\tsemaforData := SortedCollection sortBlock: [:a :b | a obchJmeno <= b obchJmeno]." +
	"\n\t\t\tdata collect: [:d | | prip |" +
	"\n\t\t\t\t(prip := d at: #value)" +
	"\n\t\t\t\t\tid: (d at: #id)." +
	"\n\t\t\t\tprip pouziti: prip pouziti asSortedCollection] " +
	"\n\t\t\tthenDo: [:prip | | dupl |" +
	"\n\t\t\t\t(dupl := semaforData addUnique: prip) == prip ifFalse: [" +
	"\n\t\t\t\t\tdupl pouziti addAll: prip pouziti]]." +
	"\n\t\t\tself createGrid" +
	"\n\t\t\t\tloadData: semaforData;" +
	"\n\t\t\t\trenderTo: semaforId; " +
	"\n\t\t\t\tshow]" +
	"\n\t]",
	null, "2013-06-10T09:45:25Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("renderKapitolaPOR:on:", "kap html", "rendering", 
	"\t| dv |" +
	"\n\tdv := html div " +
	"\n\t\tclass: 'obsah'; " +
	"\n\t\tid: semaforId." +
	"\n\tsemaforData ifNotNil: [ | gr |" +
	"\n\t\tgr := self createGrid." +
	"\n\t\tgr store loadData: semaforData." +
	"\n\t\tgr renderTo: semaforId." +
	"\n\t\t[gr show] delayed: 100" +
	"\n\t] ifNil: [" +
	"\n\t\tdv style: 'height: 200px; background: url(''images/loader-flower-blue.gif'') no-repeat center center'." +
	"\n\t\tloading ifFalse: [" +
	"\n\t\t\tloading := true." +
	"\n\t\t\tFytoportal data pripravky nactiSemaforPro: self semaforParams pak: [:data |" +
	"\n\t\t\t\tloading := false." +
	"\n\t\t\t\tsemaforData := SortedCollection sortBlock: [:a :b | a obchJmeno <= b obchJmeno]." +
	"\n\t\t\t\tdata collect: [:d | | prip |" +
	"\n\t\t\t\t\t(prip := d at: #value)" +
	"\n\t\t\t\t\t\tid: (d at: #id)." +
	"\n\t\t\t\t\tprip pouziti: prip pouziti asSortedCollection] " +
	"\n\t\t\t\tthenDo: [:prip | | dupl |" +
	"\n\t\t\t\t\t(dupl := semaforData addUnique: prip) == prip ifFalse: [" +
	"\n\t\t\t\t\t\tdupl pouziti addAll: prip pouziti]]." +
	"\n\t\t\t\tself createGrid" +
	"\n\t\t\t\t\tloadData: semaforData;" +
	"\n\t\t\t\t\trenderTo: semaforId; " +
	"\n\t\t\t\t\tshow]" +
	"\n\t\t]" +
	"\n\t]",
	null, "2013-06-10T10:17:16Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("renderKapitolaPOR:on:", "kap html", "rendering", 
	"\t| dv |" +
	"\n\tdv := html div " +
	"\n\t\tclass: 'obsah'; " +
	"\n\t\tid: semaforId." +
	"\n\tsemaforData ifNotNil: [ | gr |" +
	"\n\t\tgr := self createGrid." +
	"\n\t\tgr store loadData: semaforData." +
	"\n\t\tgr renderTo: semaforId." +
	"\n\t\t[gr show] delayed: 100" +
	"\n\t] ifNil: [" +
	"\n\t\tdv style: 'height: 200px; background: url(''images/loader-flower-blue.gif'') no-repeat center center'." +
	"\n\t\tloading ifNotNil: [" +
	"\n\t\t\tloading abort]." +
	"\n\t\tloading := Fytoportal data pripravky nactiSemaforPro: self semaforParams pak: [:data :req |" +
	"\n\t\t\tloading := nil." +
	"\n\t\t\tsemaforData := SortedCollection sortBlock: [:a :b | a obchJmeno <= b obchJmeno]." +
	"\n\t\t\tdata collect: [:d | | prip |" +
	"\n\t\t\t\t(prip := d at: #value)" +
	"\n\t\t\t\t\tid: (d at: #id)." +
	"\n\t\t\t\tprip pouziti: prip pouziti asSortedCollection] " +
	"\n\t\t\tthenDo: [:prip | | dupl |" +
	"\n\t\t\t\t(dupl := semaforData addUnique: prip) == prip ifFalse: [" +
	"\n\t\t\t\t\tdupl pouziti addAll: prip pouziti]]." +
	"\n\t\t\tself createGrid" +
	"\n\t\t\t\tloadData: semaforData;" +
	"\n\t\t\t\trenderTo: semaforId; " +
	"\n\t\t\t\tshow" +
	"\n\t\t]" +
	"\n\t]",
	null, "2013-06-11T06:49:50Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("renderKapitolaPOR:on:", "kap html", "rendering", 
	"\t| dv |" +
	"\n\tdv := html div " +
	"\n\t\tclass: 'obsah semafor-por'; " +
	"\n\t\tid: semaforId." +
	"\n\tsemaforData ifNotNil: [" +
	"\n\t\t[self createGrid show] delayed: 100" +
	"\n\t] ifNil: [" +
	"\n\t\tdv style: ('height: {1}px; background: url(''images/loader-flower-blue.gif'') no-repeat center center' " +
	"\n\t\t\tformat: { self gridHeight})." +
	"\n\t\tloading ifNotNil: [" +
	"\n\t\t\tloading abort]." +
	"\n\t\tloading := Fytoportal data pripravky nactiSemaforPro: self semaforParams pak: [:data :req |" +
	"\n\t\t\tloading := nil." +
	"\n\t\t\tsemaforData := SortedCollection sortBlock: [:a :b | a obchJmeno <= b obchJmeno]." +
	"\n\t\t\tdata collect: [:d | | prip |" +
	"\n\t\t\t\t(prip := d at: #value)" +
	"\n\t\t\t\t\tid: (d at: #id)." +
	"\n\t\t\t\tprip pouziti: prip pouziti asSortedCollection] " +
	"\n\t\t\tthenDo: [:prip | | dupl |" +
	"\n\t\t\t\t(dupl := semaforData addUnique: prip) == prip ifFalse: [" +
	"\n\t\t\t\t\tdupl pouziti addAll: prip pouziti]]." +
	"\n\t\t\tself createGrid show" +
	"\n\t\t]" +
	"\n\t]",
	null, "2013-06-11T10:49:10Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("renderKapitolaPOR:on:", "kap html", "rendering", 
	"\t| dv |" +
	"\n\tdv := html div " +
	"\n\t\tclass: 'obsah semafor-por'; " +
	"\n\t\tid: semaforId." +
	"\n\tsemaforData ifNotNil: [" +
	"\n\t\t[self createGrid show] delayed: 100" +
	"\n\t] ifNil: [" +
	"\n\t\tdv style: ('height: {1}px; background: url(''images/loader-flower-blue.gif'') no-repeat center center' " +
	"\n\t\t\tformat: { self gridHeight})." +
	"\n\t\tloading ifNotNil: [" +
	"\n\t\t\tloading abort]." +
	"\n\t\tloading := Fytoportal data pripravky nactiSemaforPro: self semaforParams pak: [:data :req |" +
	"\n\t\t\tloading := nil." +
	"\n\t\t\tsemaforData := Fytoportal data pripravky pripravSemaforData: data." +
	"\n\t\t\tself createGrid show" +
	"\n\t\t]" +
	"\n\t]",
	null, "2014-01-11T21:41:40Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("renderKapitolaPOR:on:", "kap html", "rendering", 
	"\t| dv |" +
	"\n\tdv := html div " +
	"\n\t\tclass: 'semafor-por'; " +
	"\n\t\tid: semaforId." +
	"\n\tsemaforData ifNotNil: [" +
	"\n\t\t[self createGrid show] delayed: 100" +
	"\n\t] ifNil: [" +
	"\n\t\tdv style: ('height: {1}px; background: url(''images/loader-flower-blue.gif'') no-repeat center center' " +
	"\n\t\t\tformat: { self gridHeight})." +
	"\n\t\tloading ifNotNil: [" +
	"\n\t\t\tloading abort]." +
	"\n\t\tloading := Fytoportal data pripravky nactiSemaforPro: self semaforParams pak: [:data :req |" +
	"\n\t\t\tloading := nil." +
	"\n\t\t\tsemaforData := Fytoportal data pripravky pripravSemaforData: data." +
	"\n\t\t\tself createGrid show" +
	"\n\t\t]" +
	"\n\t]",
	null, "2014-03-08T20:47:52Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("renderKapitolaPOR:on:", "kap html", "rendering", 
	"\t| dv |" +
	"\n\tdv := html div " +
	"\n\t\tclass: 'semafor-por'; " +
	"\n\t\tid: semaforId." +
	"\n\tsemaforData ifNotNil: [" +
	"\n\t\t[self createGrid show] delayed: 100" +
	"\n\t] ifNil: [" +
	"\n\t\tdv style: ('height: {1}px; background: url(''images/loader-green.gif'') no-repeat center center' " +
	"\n\t\t\tformat: { self gridHeight})." +
	"\n\t\tloading ifNotNil: [" +
	"\n\t\t\tloading abort]." +
	"\n\t\tloading := kap nactiSemaforPro: self semaforParams pak: [:data |" +
	"\n\t\t\tloading := nil." +
	"\n\t\t\tsemaforData := data." +
	"\n\t\t\tself createGrid show" +
	"\n\t\t]" +
	"\n\t]",
	null, "2014-03-18T21:18:52Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("renderKapitolaPOR:on:", "kap html", "rendering", 
	"\t| dv |" +
	"\n\tdv := html div" +
	"\n\t\tclass: 'semafor-por'; " +
	"\n\t\tid: (semaforIds at: kap id ifAbsentPut: [ExtCore current nextId])." +
	"\n\tsemaforData ifNotNil: [" +
	"\n\t\t[self zobrazTabulkuPOR: kap id] delayed: 100" +
	"\n\t] ifNil: [" +
	"\n\t\tdv style: 'height: 100px; background: url(''images/loader-green.gif'') no-repeat center center'." +
	"\n\t\tloading ifNotNil: [" +
	"\n\t\t\tloading abort]." +
	"\n\t\tloading := (metodikaSO ifNil: [kap]) nactiSemaforPro: self semaforParams pak: [:data |" +
	"\n\t\t\tloading := nil." +
	"\n\t\t\tsemaforData := data." +
	"\n\t\t\t\"blok by se mel zavolat pouze jednou, vykreslim naraz vsechny tabulky\"" +
	"\n\t\t\tsemaforIds keys do: [:kapId |" +
	"\n\t\t\t\tself zobrazTabulkuPOR: kapId]" +
	"\n\t\t]" +
	"\n\t]",
	null, "2014-04-24T14:12:24Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("renderKapitolaPOR:on:", "kap html", "rendering", 
	"\t| dv |" +
	"\n\tdv := html div" +
	"\n\t\tclass: 'semafor-por'; " +
	"\n\t\tid: (semaforIds at: kap id ifAbsentPut: [ExtCore current nextId])." +
	"\n\tsemaforData ifNotNil: [" +
	"\n\t\t[self zobrazTabulkuPOR: kap id] delayed: 100" +
	"\n\t] ifNil: [" +
	"\n\t\tdv style: 'height: 100px; background: url(''images/loader-green.gif'') no-repeat center center'." +
	"\n\t\tloading ifNil: [" +
	"\n\t\t\t\"jen poprve v ramci vykreslovani stranky\"" +
	"\n\t\t\tloading := (metodikaSO ifNil: [kap]) nactiSemaforPro: self semaforParams pak: [:data |" +
	"\n\t\t\t\tloading := nil." +
	"\n\t\t\t\tsemaforData := data." +
	"\n\t\t\t\t\"blok by se mel zavolat pouze jednou, vykreslim naraz vsechny tabulky\"" +
	"\n\t\t\t\tsemaforIds keys do: [:kapId |" +
	"\n\t\t\t\t\tself zobrazTabulkuPOR: kapId]" +
	"\n\t\t\t]" +
	"\n\t\t]" +
	"\n\t]",
	null, "2014-05-06T20:21:47Z", "mp"); //fytoportal-ior

jst.FYTextKapitolyPanel.addMethod("refreshContent", "", "rendering", 
	"\tloading ifNotNil: [" +
	"\n\t\tloading abort." +
	"\n\t\tloading := nil]." +
	"\n\tsuper refreshContent",
	null, "2014-05-06T20:19:16Z", "mp");

jst.FYTextKapitolyPanel.addMethod("semaforParams", "", "private", 
	"\t| params |" +
	"\n\tparams := Dictionary new" +
	"\n\t\tat: #skodlorg put: metodikaSO taxon kodyZmeny;" +
	"\n\t\tyourself." +
	"\n\tkapitola metodika plodiny ifNotNilDo: [:pl | " +
	"\n\t\tparams at: #plodiny put: pl kody]." +
	"\n\t^ params",
	null, "2013-05-03T10:09:05Z", "mp", 1);
/*
jst.FYTextKapitolyPanel.addMethod("semaforParams", "", "private", 
	"\t| params |" +
	"\n\tparams := Dictionary new" +
	"\n\t\tat: #skodlorg put: metodikaSO taxon kodyZmeny;" +
	"\n\t\tyourself." +
	"\n\tkapitola metodika plodiny ifNotNilDo: [:pl | " +
	"\n\t\tkapitola metodika jeObecnaMetodika ifFalse: [" +
	"\n\t\t\tparams at: #plodiny put: pl kody]]." +
	"\n\t^ params",
	null, "2013-12-09T21:39:26Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("semaforParams", "", "private", 
	"\t| params |" +
	"\n\tparams := Dictionary new" +
	"\n\t\tat: #skodlorg put: metodikaSO taxon kodyZmeny;" +
	"\n\t\tyourself." +
	"\n\tkapitola metodika plodiny ifNotNilDo: [:pl | " +
	"\n\t\t\"pokud do obecne metodiky zadam plodiny, chci, aby semafor podle nich filtroval" +
	"\n\t\tlépe - plodiny bych mohl načítat automaticky podle metodik ve skupině, asi ale ne tady\"" +
	"\n\t\t(pl obsah size > 0 or: [kapitola metodika jeObecnaMetodika not]) ifTrue: [" +
	"\n\t\t\tparams at: #plodiny put: pl kody]]." +
	"\n\t^ params",
	null, "2013-12-10T09:42:40Z", "mp"); //fytoportal-ior
*/
jst.FYTextKapitolyPanel.addMethod("semaforParams", "", "private", 
	"\t| params |" +
	"\n\tparams := Dictionary new" +
	"\n\t\tat: #skodlorg put: metodikaSO taxon kodyZmeny;" +
	"\n\t\tyourself." +
	"\n\tkapitola metodika plodiny ifNotNilDo: [:pl | " +
	"\n\t\tparams at: #plodiny put: pl kodyVyber]." +
	"\n\t^ params",
	null, "2014-01-11T20:31:27Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("semaforParams", "", "private", 
	"\t| params |" +
	"\n\tparams := Dictionary new" +
	"\n\t\tat: #skodlorg put: metodikaSO taxon kodyZmeny;" +
	"\n\t\tyourself." +
	"\n\tkapitola metodika plodiny ifNotNilDo: [:pl | " +
	"\n\t\tparams at: #plodiny put: (self kodyPlodiny: pl)]." +
	"\n\t^ params",
	null, "2014-01-12T14:06:46Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("semaforParams", "", "private", 
	"\t| params |" +
	"\n\tparams := Dictionary new." +
	"\n\tmetodikaSO\tifNotNil: [" +
	"\n\t\t\"jinak plevele\"" +
	"\n\t\tparams at: #skodlorg put: metodikaSO taxon kodyZmeny]." +
	"\n\tkapitola metodika plodiny ifNotNilDo: [:pl | " +
	"\n\t\tparams at: #plodiny put: (self kodyPlodiny: pl)]." +
	"\n\t^ params",
	null, "2014-02-20T20:26:48Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("semaforParams", "", "private", 
	"\t| params |" +
	"\n\tparams := Dictionary new." +
	"\n\tmetodikaSO\tifNotNil: [" +
	"\n\t\t\"jinak plevele\"" +
	"\n\t\tparams at: #skodlorg put: metodikaSO kody]." +
	"\n\tkapitola metodika plodiny ifNotNilDo: [:pl | " +
	"\n\t\tparams at: #plodiny put: (self kodyPlodiny: pl)]." +
	"\n\t^ params",
	null, "2014-02-28T12:11:05Z", "mp", 1);
/*
jst.FYTextKapitolyPanel.addMethod("kodyPlodiny:", "pl", "private", 
	"\t^ pl kodyVyber",
	null, "2014-01-12T14:06:06Z", "mp");
*/

jst.FYTextKapitolyPanel.addMethod("semaforParams", "", "private", 
	"\t| params |" +
	"\n\tparams := Dictionary new." +
	"\n\tmetodikaSO\tifNotNil: [" +
	"\n\t\t\"jinak plevele\"" +
	"\n\t\tparams at: #skodlorg put: metodikaSO kody]." +
	"\n\tkapitola metodika plodiny ifNotNilDo: [:pl | " +
	"\n\t\tparams at: #plodiny put: pl kodyVyber]." +
	"\n\t^ params",
	null, "2014-04-23T19:23:34Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("semaforParams", "", "private", 
	"\t| params |" +
	"\n\tparams := Dictionary new." +
	"\n\tmetodikaSO\tifNotNil: [" +
	"\n\t\tparams at: #keys put: metodikaSO pouzitiSO." +
	"\n\t\tkapitola metodika plodiny ifNotNilDo: [:pl |" +
	"\n\t\t\t\"v nahledu metodiky SO pri editaci nemam plodiny\"" +
	"\n\t\t\tparams at: #plodiny put: pl pouzitiPlodiny]" +
	"\n\t] ifNil: [" +
	"\n\t\t\"jinak plevele nebo ostatni POR\"" +
	"\n\t\tparams at: #keys put: (Fytoportal data pouzitiVsechnyPlodiny " +
	"\n\t\t\tcopyWithAll: kapitola metodika plodiny pouzitiPlodiny)" +
	"\n\t]." +
	"\n\t^ params",
	null, "2014-04-24T10:14:44Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("semaforParams", "", "private", 
	"\t| params |" +
	"\n\tparams := Dictionary new" +
	"\n\t\tat: #metodika put: kapitola metodika nazev;" +
	"\n\t\tyourself." +
	"\n\tmetodikaSO\tifNotNil: [" +
	"\n\t\tparams at: #keys put: metodikaSO pouzitiSO." +
	"\n\t\tkapitola metodika plodiny ifNotNilDo: [:pl |" +
	"\n\t\t\t\"v nahledu metodiky SO pri editaci nemam plodiny\"" +
	"\n\t\t\tparams at: #plodiny put: pl pouzitiPlodiny]" +
	"\n\t] ifNil: [" +
	"\n\t\t\"jinak plevele nebo ostatni POR\"" +
	"\n\t\tparams at: #keys put: (Fytoportal data pouzitiVsechnyPlodiny " +
	"\n\t\t\tcopyWithAll: kapitola metodika plodiny pouzitiPlodiny)" +
	"\n\t]." +
	"\n\t^ params",
	null, "2014-05-07T09:48:34Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("semaforParams", "", "private", 
	"\t| params |" +
	"\n\tparams := kapitola metodika semaforParams." +
	"\n\tmetodikaSO\tifNotNil: [" +
	"\n\t\tparams at: #keys put: metodikaSO pouzitiSO." +
	"\n\t\tkapitola metodika plodiny ifNotNilDo: [:pl |" +
	"\n\t\t\t\"v nahledu metodiky SO pri editaci nemam plodiny\"" +
	"\n\t\t\tparams at: #plodiny put: pl pouzitiPlodiny]" +
	"\n\t] ifNil: [" +
	"\n\t\t\"jinak plevele nebo ostatni POR\"" +
	"\n\t\tparams at: #keys put: (Fytoportal data pouzitiVsechnyPlodiny " +
	"\n\t\t\tcopyWithAll: kapitola metodika plodiny pouzitiPlodiny)" +
	"\n\t]." +
	"\n\t^ params",
	null, "2014-05-22T12:06:25Z", "mp"); //fytoportal-ior

/*
jst.FYTextKapitolyPanel.addMethod("createGrid", "", "private", 
	"\t| expander |" +
	"\n\texpander := ExtRowExpander new " +
	"\n\t\ttpl: (ExtXTemplate new htmlContents: [:html | html div class: 'semafor-pouziti'; with: [" +
	"\n\t\t\thtml table cellspacing: 0; with: [" +
	"\n\t\t\t\thtml tableRow class: 'heading'; with: [html " +
	"\n\t\t\t\t\ttableData: 'plodina'; tableData: 'dávka'; tableData: 'OL (dny)'; tableData: 'poznámka']." +
	"\n\t\t\t\t(html tag: 'tpl') attributeAt: 'for' put: 'pouziti'; with: [" +
	"\n\t\t\t\t\thtml tableRow: [" +
	"\n\t\t\t\t\t\thtml tableData: '{_plodina}'." +
	"\n\t\t\t\t\t\thtml tableData align: 'right'; with: '{_davka}'." +
	"\n\t\t\t\t\t\thtml tableData align: 'right'; with: '{_ochrLhuta}'." +
	"\n\t\t\t\t\t\thtml tableData: '{_poznamka}']]" +
	"\n\t\t\t]]" +
	"\n\t\t])." +
	"\n\t^ ExtGridPanel new" +
	"\n\t\tstore: (ExtArrayStore new" +
	"\n\t\t\tautoDestroy: true;" +
	"\n\t\t\tfields: self storeFields);" +
	"\n\t\tcolumns: ({expander} copyWithAll: self gridColumns);" +
	"\n\t\tplugins: expander;" +
	"\n\t\tanchor: '100%';" +
	"\n\t\theight: 400",
	null, "2013-05-10T12:37:47Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("createGrid", "", "private", 
	"\t| expander |" +
	"\n\texpander := ExtRowExpander new " +
	"\n\t\ttpl: (ExtXTemplate new htmlContents: [:html | html div class: 'semafor-pouziti'; with: [" +
	"\n\t\t\thtml table cellspacing: 0; with: [" +
	"\n\t\t\t\thtml tableRow class: 'heading'; with: [html " +
	"\n\t\t\t\t\ttableData: 'plodina'; tableData: 'dávka'; tableData: 'OL (dny)'; tableData: 'poznámka']." +
	"\n\t\t\t\t(html tag: 'tpl') attributeAt: 'for' put: 'pouziti'; with: [" +
	"\n\t\t\t\t\thtml tableRow: [" +
	"\n\t\t\t\t\t\thtml tableData: '{_plodina}'." +
	"\n\t\t\t\t\t\thtml tableData align: 'right'; with: '{_davka}'." +
	"\n\t\t\t\t\t\thtml tableData align: 'right'; with: '{_ochrLhuta}'." +
	"\n\t\t\t\t\t\thtml tableData: '{_poznamka}']]" +
	"\n\t\t\t]]" +
	"\n\t\t])." +
	"\n\t^ ExtGridPanel new" +
	"\n\t\tstore: (ExtArrayStore new" +
	"\n\t\t\tautoDestroy: true;" +
	"\n\t\t\tfields: self storeFields);" +
	"\n\t\tcolumns: ({expander} copyWithAll: self gridColumns);" +
	"\n\t\tcolumnLines: true;" +
	"\n\t\tplugins: expander;" +
	"\n\t\tanchor: '100%';" +
	"\n\t\theight: 400",
	null, "2013-05-17T09:33:20Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("createGrid", "", "private", 
	"\t| expander |" +
	"\n\texpander := ExtRowExpander new tpl: self tplPouziti." +
	"\n\t^ ExtGridPanel new" +
	"\n\t\tstore: (ExtArrayStore new" +
	"\n\t\t\tautoDestroy: true;" +
	"\n\t\t\tfields: self storeFields);" +
	"\n\t\tcolumns: ({expander} copyWithAll: self gridColumns);" +
	"\n\t\tcolumnLines: true;" +
	"\n\t\tplugins: expander;" +
	"\n\t\tanchor: '100%';" +
	"\n\t\theight: self gridHeight;" +
	"\n\t\tloadData: semaforData;" +
	"\n\t\trenderTo: semaforId",
	null, "2013-06-11T10:45:45Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("createGrid", "", "private", 
	"\t| expander |" +
	"\n\tsemaforData isEmpty ifTrue: [" +
	"\n\t\t(Document current elementById: semaforId)" +
	"\n\t\t\tattributeAt: 'class' put: '';" +
	"\n\t\t\tattributeAt: 'style' put: ''." +
	"\n\t\t^ ExtBoxComponent new" +
	"\n\t\t\trenderTo: semaforId;" +
	"\n\t\t\tcls: 'obsah';" +
	"\n\t\t\tcontents: '<span style=\"white-space:pre\">\t</span>Nebyly nalezeny žádné povolené přípravky.']." +
	"\n\texpander := ExtRowExpander new tpl: self tplPouziti." +
	"\n\t^ ExtGridPanel new" +
	"\n\t\tstore: (ExtArrayStore new" +
	"\n\t\t\tautoDestroy: true;" +
	"\n\t\t\tfields: self storeFields);" +
	"\n\t\tcolumns: ({expander} copyWithAll: self gridColumns);" +
	"\n\t\tcolumnLines: true;" +
	"\n\t\tplugins: expander;" +
	"\n\t\tanchor: '100%';" +
	"\n\t\theight: self gridHeight;" +
	"\n\t\tloadData: semaforData;" +
	"\n\t\trenderTo: semaforId",
	null, "2014-03-03T16:21:48Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("createGrid", "", "private", 
	"\t| expander dv |" +
	"\n\tdv := Document current elementById: semaforId." +
	"\n\tdv attributeAt: 'style' put: ''." +
	"\n\tsemaforData isEmpty ifTrue: [" +
	"\n\t\tdv attributeAt: 'class' put: ''." +
	"\n\t\t^ ExtBoxComponent new" +
	"\n\t\t\trenderTo: semaforId;" +
	"\n\t\t\tcls: 'obsah';" +
	"\n\t\t\tcontents: '<span style=\"white-space:pre\">\t</span>Nebyly nalezeny žádné povolené přípravky.']." +
	"\n\texpander := ExtRowExpander new tpl: self tplPouziti." +
	"\n\t^ ExtGridPanel new" +
	"\n\t\tstore: (ExtArrayStore new" +
	"\n\t\t\tautoDestroy: true;" +
	"\n\t\t\tfields: self storeFields);" +
	"\n\t\tcolumns: ({expander} copyWithAll: self gridColumns);" +
	"\n\t\tcolumnLines: true;" +
	"\n\t\tplugins: expander;" +
	"\n\t\tanchor: '100%';" +
	"\n\t\theight: (semaforData size * 21 + 100 min: self gridHeight);" +
	"\n\t\tloadData: semaforData;" +
	"\n\t\trenderTo: semaforId",
	null, "2014-03-08T20:49:35Z", "mp"); //fytoportal-ior
*/

jst.FYTextKapitolyPanel.addMethod("tplPouziti", "", "private", 
	"\t^ ExtXTemplate new compiled: true; htmlContents: [:html | " +
	"\n\t\thtml div class: 'semafor-pouziti'; with: [" +
	"\n\t\t\thtml table cellspacing: 0; with: [" +
	"\n\t\t\t\thtml tableRow class: 'heading'; with: [html " +
	"\n\t\t\t\t\ttableData: 'plodina'; tableData: 'dávka'; tableData: 'OL (dny)'; tableData: 'poznámka']." +
	"\n\t\t\t\t(html tag: 'tpl') attributeAt: 'for' put: 'pouziti'; with: [" +
	"\n\t\t\t\t\thtml tableRow: [" +
	"\n\t\t\t\t\t\thtml tableData: '{_plodina}'." +
	"\n\t\t\t\t\t\thtml tableData align: 'right'; with: '{_davka}'." +
	"\n\t\t\t\t\t\thtml tableData align: 'right'; with: '{_ochrLhuta}'." +
	"\n\t\t\t\t\t\thtml tableData: '{_poznamka}']]" +
	"\n\t\t\t]" +
	"\n\t\t]" +
	"\n\t]",
	null, "2013-06-11T10:08:27Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("tplPouziti", "", "private", 
	"\t^ ExtXTemplate new compiled: true; htmlContents: [:html | " +
	"\n\t\thtml div class: 'semafor-pouziti'; with: [" +
	"\n\t\t\thtml table cellspacing: 0; with: [" +
	"\n\t\t\t\thtml tableRow class: 'heading'; with: [html " +
	"\n\t\t\t\t\ttableData: 'plodina'; tableData: 'dávka'; tableData: 'OL (dny)'; " +
	"\n\t\t\t\t\ttableData: 'poznámka (další omezení viz etiketa)']." +
	"\n\t\t\t\t(html tag: 'tpl') attributeAt: 'for' put: 'pouziti'; with: [" +
	"\n\t\t\t\t\thtml tableRow: [" +
	"\n\t\t\t\t\t\thtml tableData: '{_plodina}'." +
	"\n\t\t\t\t\t\thtml tableData align: 'right'; with: '{_davka}'." +
	"\n\t\t\t\t\t\thtml tableData align: 'right'; with: '{_ochrLhuta}'." +
	"\n\t\t\t\t\t\thtml tableData: '{_poznamka}']]" +
	"\n\t\t\t]" +
	"\n\t\t]" +
	"\n\t]",
	null, "2014-01-17T08:42:10Z", "mp", 2);

jst.FYTextKapitolyPanel.addMethod("tplPouziti", "", "private", 
	"\t^ ExtXTemplate new compiled: true; htmlContents: [:html | " +
	"\n\t\thtml div class: 'semafor-pouziti'; with: [" +
	"\n\t\t\thtml table cellspacing: 0; with: [" +
	"\n\t\t\t\thtml tableRow class: 'heading'; with: [html " +
	"\n\t\t\t\t\ttableData: 'škodl. org.'; " +
	"\n\t\t\t\t\ttableData: 'plodina'; " +
	"\n\t\t\t\t\ttableData: 'dávka'; " +
	"\n\t\t\t\t\ttableData: 'OL (dny)'; " +
	"\n\t\t\t\t\ttableData: 'poznámka (další omezení viz etiketa)']." +
	"\n\t\t\t\t(html tag: 'tpl') attributeAt: 'for' put: 'pouziti'; with: [" +
	"\n\t\t\t\t\thtml tableRow: [" +
	"\n\t\t\t\t\t\thtml tableData: '{_skodlOrg}'." +
	"\n\t\t\t\t\t\thtml tableData: '{_plodina}'." +
	"\n\t\t\t\t\t\thtml tableData align: 'right'; with: '{_davka}'." +
	"\n\t\t\t\t\t\thtml tableData align: 'right'; with: '{_ochrLhuta}'." +
	"\n\t\t\t\t\t\thtml tableData: '{_poznamka}']]" +
	"\n\t\t\t]" +
	"\n\t\t]" +
	"\n\t]",
	null, "2014-02-17T13:08:21Z", "mp"); //fytoportal-ior

jst.FYTextKapitolyPanel.addMethod("gridHeight", "", "private", 
	"\t^ 403",
	null, "2013-06-11T10:45:27Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("gridHeight", "", "private", 
	"\t^ id = #ostatni " +
	"\n\t\tifTrue: [Browser window pageHeight - 215]" +
	"\n\t\tifFalse: [403]",
	null, "2014-04-02T13:31:02Z", "mp", 2);

jst.FYTextKapitolyPanel.addMethod("gridHeight", "", "private", 
	"\t^ (id = #ostatni | (id = #plevele) and: [kapitola size = 0])" +
	"\n\t\tifTrue: [Browser window pageHeight - 215]" +
	"\n\t\tifFalse: [403]",
	null, "2014-04-28T13:21:08Z", "mp", 3);

jst.FYTextKapitolyPanel.addMethod("gridHeight", "", "private", 
	"\t^ (id = #ostatni | (id = #plevele) and: [kapitola size < 2])" +
	"\n\t\tifTrue: [Browser window pageHeight - 215]" +
	"\n\t\tifFalse: [403]",
	null, "2014-05-06T12:32:04Z", "mp"); //fytoportal-ior

jst.FYTextKapitolyPanel.addMethod("storeFields", "", "private", 
	"\t^  { " +
	"\n\t\tExtField new name: #obchJmeno; convert: [:v :prip | prip obchJmeno]." +
	"\n\t\tExtField new name: #ucinneLatky; convert: [:v :prip | prip ucinneLatky]." +
	"\n\t\tExtField new name: #pouziti; convert: [:v :prip | prip pouziti]." +
	"\n\t\tExtField new name: #clovek; convert: [:v :prip | prip semafor clovek]." +
	"\n\t\tExtField new name: #vodniZdroje; convert: [:v :prip | prip semafor vodniZdroje]." +
	"\n\t\tExtField new name: #vodniOrg; convert: [:v :prip | prip semafor vodniOrg]." +
	"\n\t\tExtField new name: #pudniOrg; convert: [:v :prip | prip semafor pudniOrg]." +
	"\n\t\tExtField new name: #vcely; convert: [:v :prip | prip semafor vcely]." +
	"\n\t\tExtField new name: #necilClenovci; convert: [:v :prip | prip semafor necilClenovci]." +
	"\n\t\tExtField new name: #ptaciSavci; convert: [:v :prip | prip semafor ptaciSavci]." +
	"\n\t\tExtField new name: #necilRostliny; convert: [:v :prip | prip semafor necilRostliny]." +
	"\n\t\tExtField new name: #zivotniProstredi; convert: [:v :prip | prip semafor zivotniProstredi]." +
	"\n\t}",
	null, "2013-05-10T06:23:56Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("storeFields", "", "private", 
	"\t^  { " +
	"\n\t\tExtField new name: #obchJmeno; convert: [:v :prip | prip obchJmeno]." +
	"\n\t\tExtField new name: #ucinneLatky; convert: [:v :prip | prip ucinneLatky]." +
	"\n\t\tExtField new name: #pouziti; convert: [:v :prip | prip pouziti]." +
	"\n\t\tExtField new name: #clovek; convert: [:v :prip | prip semafor clovek]." +
	"\n\t\tExtField new name: #vodniZdroje; convert: [:v :prip | prip semafor vodniZdroje]." +
	"\n\t\tExtField new name: #vodniOrg; convert: [:v :prip | prip semafor vodniOrg]." +
	"\n\t\tExtField new name: #pudniOrg; convert: [:v :prip | prip semafor pudniOrg]." +
	"\n\t\tExtField new name: #vcely; convert: [:v :prip | prip semafor vcely]." +
	"\n\t\tExtField new name: #necilClenovci; convert: [:v :prip | prip semafor necilClenovci]." +
	"\n\t\tExtField new name: #ptaciSavci; convert: [:v :prip | prip semafor ptaciSavci]." +
	"\n\t\tExtField new name: #necilRostliny; convert: [:v :prip | prip semafor necilRostliny]." +
	"\n\t\tExtField new name: #zivotniProstredi; convert: [:v :prip | prip semafor zivotniProstredi]." +
	"\n\t\tExtField new name: #biologFunkce; convert: [:v :prip | prip biologFunkce asCSVString]." +
	"\n\t}",
	null, "2014-04-24T21:07:26Z", "mp"); //fytoportal-ior

/*
jst.FYTextKapitolyPanel.addMethod("gridColumns", "", "private", 
	"\t| arr rend detailBlock |" +
	"\n\tarr := {" +
	"\n\t\tExtColumn new header: 'Člověk'; dataIndex: #clovek; tooltip: 'Vliv na zdraví lidí'." +
	"\n\t\tExtColumn new header: 'Voda'; dataIndex: #vodniZdroje; tooltip: 'Vliv na vodní zdroje'." +
	"\n\t\tExtColumn new header: 'Vod.org.'; dataIndex: #vodniOrg; tooltip: 'Vliv na vodní organismy'." +
	"\n\t\tExtColumn new header: 'Půd.org.'; dataIndex: #pudniOrg; tooltip: 'Vliv na půdní organismy'." +
	"\n\t\tExtColumn new header: 'Včely'; dataIndex: #vcely; tooltip: 'Vliv na včely'." +
	"\n\t\tExtColumn new header: 'N.člen.'; dataIndex: #necilClenovci; tooltip: 'Vliv na necílové členovce'." +
	"\n\t\tExtColumn new header: 'Ptáci...'; dataIndex: #ptaciSavci; tooltip: 'Vliv na suchozemské obratlovce (ptáky a savce)'." +
	"\n\t\tExtColumn new header: 'N.rostl.'; dataIndex: #necilRostliny; tooltip: 'Vliv na necílové rostliny'." +
	"\n\t\tExtColumn new header: 'Ž.prostř.'; dataIndex: #zivotniProstredi; tooltip: 'Vliv na životní prostředí (obecně)'." +
	"\n\t}." +
	"\n\trend := [:cislo :md |" +
	"\n\t\tcislo ifNotNil: [" +
	"\n\t\t\t(Dictionary on: md) at: #css put: 'semafor', cislo asString]. " +
	"\n\t\t'' \"nic nezobrazim - plne kolecko je &#11044; \"]." +
	"\n\tdetailBlock := self semaforDetailBlock." +
	"\n\tarr do: [:col |" +
	"\n\t\tcol width: 51; isSortable: true; renderer: rend; on: #click do: detailBlock]." +
	"\n\t^ {" +
	"\n\t\tExtColumn new header: 'Přípravek'; dataIndex: #obchJmeno; width: 200; isSortable: true." +
	"\n\t\tExtColumn new header: 'Účinná látka'; dataIndex: #ucinneLatky; width: 175; isSortable: true" +
	"\n\t} copyWithAll: arr",
	null, "2013-05-10T07:41:44Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("gridColumns", "", "private", 
	"\t| arr rend detailBlock |" +
	"\n\tarr := {" +
	"\n\t\tExtColumn new header: 'Člověk'; dataIndex: #clovek; tooltip: 'Vliv na zdraví lidí'." +
	"\n\t\tExtColumn new header: 'Voda'; dataIndex: #vodniZdroje; tooltip: 'Vliv na vodní zdroje'." +
	"\n\t\tExtColumn new header: 'Vod.org.'; dataIndex: #vodniOrg; tooltip: 'Vliv na vodní organismy'." +
	"\n\t\tExtColumn new header: 'Půd.org.'; dataIndex: #pudniOrg; tooltip: 'Vliv na půdní organismy'." +
	"\n\t\tExtColumn new header: 'Včely'; dataIndex: #vcely; tooltip: 'Vliv na včely'." +
	"\n\t\tExtColumn new header: 'N.člen.'; dataIndex: #necilClenovci; tooltip: 'Vliv na necílové členovce'." +
	"\n\t\tExtColumn new header: 'Ptáci...'; dataIndex: #ptaciSavci; tooltip: 'Vliv na suchozemské obratlovce (ptáky a savce)'." +
	"\n\t\tExtColumn new header: 'N.rostl.'; dataIndex: #necilRostliny; tooltip: 'Vliv na necílové rostliny'." +
	"\n\t\tExtColumn new header: 'Ž.prostř.'; dataIndex: #zivotniProstredi; tooltip: 'Vliv na životní prostředí (obecně)'." +
	"\n\t}." +
	"\n\trend := [:cislo :md |" +
	"\n\t\tcislo ifNotNil: [" +
	"\n\t\t\t(Dictionary on: md) at: #css put: 'semafor', cislo asNumber asString]. " +
	"\n\t\tcislo isString ifTrue: 'i' ifFalse: ''" +
	"\n\t\t\"plne kolecko je &#11044; mensi je &#9679; i v kolecku je &#9406;\"]." +
	"\n\tdetailBlock := self semaforDetailBlock." +
	"\n\tarr do: [:col |" +
	"\n\t\tcol width: 51; isSortable: true; renderer: rend; on: #click do: detailBlock]." +
	"\n\t^ {" +
	"\n\t\tExtColumn new header: 'Přípravek'; dataIndex: #obchJmeno; width: 200; isSortable: true." +
	"\n\t\tExtColumn new header: 'Účinná látka'; dataIndex: #ucinneLatky; width: 175; isSortable: true" +
	"\n\t} copyWithAll: arr",
	null, "2013-05-28T07:58:44Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("gridColumns", "", "private", 
	"\t| arr rend detailBlock |" +
	"\n\tarr := {" +
	"\n\t\tExtColumn new header: 'Člověk'; dataIndex: #clovek; tooltip: 'Vliv na zdraví lidí'." +
	"\n\t\tExtColumn new header: 'Voda'; dataIndex: #vodniZdroje; tooltip: 'Vliv na vodní zdroje'." +
	"\n\t\tExtColumn new header: 'Vod.org.'; dataIndex: #vodniOrg; tooltip: 'Vliv na vodní organismy'." +
	"\n\t\tExtColumn new header: 'Půd.org.'; dataIndex: #pudniOrg; tooltip: 'Vliv na půdní organismy'." +
	"\n\t\tExtColumn new header: 'Včely'; dataIndex: #vcely; tooltip: 'Vliv na včely'." +
	"\n\t\tExtColumn new header: 'N.člen.'; dataIndex: #necilClenovci; tooltip: 'Vliv na necílové členovce'." +
	"\n\t\tExtColumn new header: 'Ptáci...'; dataIndex: #ptaciSavci; tooltip: 'Vliv na suchozemské obratlovce (ptáky a savce)'." +
	"\n\t\tExtColumn new header: 'N.rostl.'; dataIndex: #necilRostliny; tooltip: 'Vliv na necílové rostliny'." +
	"\n\t\tExtColumn new header: 'Ž.prostř.'; dataIndex: #zivotniProstredi; tooltip: 'Vliv na životní prostředí'." +
	"\n\t}." +
	"\n\trend := [:cislo :md |" +
	"\n\t\tcislo ifNotNil: [" +
	"\n\t\t\t(Dictionary on: md) at: #css put: 'semafor', cislo asNumber asString]. " +
	"\n\t\tcislo isString ifTrue: 'i' ifFalse: ''" +
	"\n\t\t\"plne kolecko je &#11044; mensi je &#9679; i v kolecku je &#9406;\"]." +
	"\n\tdetailBlock := self semaforDetailBlock." +
	"\n\tarr do: [:col |" +
	"\n\t\tcol width: 51; isSortable: true; renderer: rend; on: #click do: detailBlock]." +
	"\n\t^ {" +
	"\n\t\tExtColumn new header: 'Přípravek'; dataIndex: #obchJmeno; width: 200; isSortable: true." +
	"\n\t\tExtColumn new header: 'Účinná látka'; dataIndex: #ucinneLatky; width: 170; isSortable: true" +
	"\n\t} copyWithAll: arr",
	null, "2013-05-29T08:27:09Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("gridColumns", "", "private", 
	"\t| arr rend detailBlock |" +
	"\n\tarr := {" +
	"\n\t\tExtColumn new header: 'Člověk'; dataIndex: #clovek; tooltip: 'Vliv na zdraví lidí'." +
	"\n\t\tExtColumn new header: 'Voda'; dataIndex: #vodniZdroje; tooltip: 'Vliv na vodní zdroje'." +
	"\n\t\tExtColumn new header: 'Vod.org.'; dataIndex: #vodniOrg; tooltip: 'Vliv na vodní organismy'." +
	"\n\t\tExtColumn new header: 'Půd.org.'; dataIndex: #pudniOrg; tooltip: 'Vliv na půdní organismy'." +
	"\n\t\tExtColumn new header: 'Včely'; dataIndex: #vcely; tooltip: 'Vliv na včely'." +
	"\n\t\tExtColumn new header: 'N.člen.'; dataIndex: #necilClenovci; tooltip: 'Vliv na necílové členovce'." +
	"\n\t\tExtColumn new header: 'Ptáci...'; dataIndex: #ptaciSavci; tooltip: 'Vliv na suchozemské obratlovce (ptáky a savce)'." +
	"\n\t\tExtColumn new header: 'N.rostl.'; dataIndex: #necilRostliny; tooltip: 'Vliv na necílové rostliny'." +
	"\n\t\tExtColumn new header: 'Ž.prostř.'; dataIndex: #zivotniProstredi; tooltip: 'Vliv na životní prostředí'." +
	"\n\t}." +
	"\n\trend := [:cislo :md |" +
	"\n\t\tcislo ifNotNil: [" +
	"\n\t\t\tmd at: #css put: 'semafor', cislo asNumber asString]. " +
	"\n\t\tcislo isString ifTrue: 'i' ifFalse: ''" +
	"\n\t\t\"plne kolecko je &#11044; mensi je &#9679; i v kolecku je &#9406;\"]." +
	"\n\tdetailBlock := self semaforDetailBlock." +
	"\n\tarr do: [:col |" +
	"\n\t\tcol width: 51; isSortable: true; renderer: rend; on: #click do: detailBlock]." +
	"\n\t^ {" +
	"\n\t\tExtColumn new header: 'Přípravek'; dataIndex: #obchJmeno; width: 200; isSortable: true; renderer: [:jm | " +
	"\n\t\t\t'<a href=\"por-hledej.html?prip=', jm, '\" target=\"por-hledej\">', jm, '</a>']." +
	"\n\t\tExtColumn new header: 'Účinná látka'; dataIndex: #ucinneLatky; width: 170; isSortable: true" +
	"\n\t} copyWithAll: arr",
	null, "2013-11-26T12:09:48Z", "mp"); //fytoportal-ior
*/

jst.FYTextKapitolyPanel.addMethod("semaforColumns", "", "private", 
	"\t| arr rend detailBlock |" +
	"\n\tarr := {" +
	"\n\t\tExtColumn new header: 'Člověk'; dataIndex: #clovek; tooltip: 'Vliv na zdraví lidí'." +
	"\n\t\tExtColumn new header: 'Voda'; dataIndex: #vodniZdroje; tooltip: 'Vliv na vodní zdroje'." +
	"\n\t\tExtColumn new header: 'Vod.org.'; dataIndex: #vodniOrg; tooltip: 'Vliv na vodní organismy'." +
	"\n\t\tExtColumn new header: 'Půd.org.'; dataIndex: #pudniOrg; tooltip: 'Vliv na půdní organismy'." +
	"\n\t\tExtColumn new header: 'Včely'; dataIndex: #vcely; tooltip: 'Vliv na včely'." +
	"\n\t\tExtColumn new header: 'N.člen.'; dataIndex: #necilClenovci; tooltip: 'Vliv na necílové členovce'." +
	"\n\t\tExtColumn new header: 'Ptáci...'; dataIndex: #ptaciSavci; tooltip: 'Vliv na suchozemské obratlovce (ptáky a savce)'." +
	"\n\t\tExtColumn new header: 'N.rostl.'; dataIndex: #necilRostliny; tooltip: 'Vliv na necílové rostliny'." +
	"\n\t\tExtColumn new header: 'Ž.prostř.'; dataIndex: #zivotniProstredi; tooltip: 'Vliv na životní prostředí'." +
	"\n\t}." +
	"\n\trend := [:cislo :md |" +
	"\n\t\tcislo ifNotNil: [" +
	"\n\t\t\tmd at: #css put: 'semafor', cislo asNumber asString]. " +
	"\n\t\tcislo isString ifTrue: 'i' ifFalse: ''" +
	"\n\t\t\"plne kolecko je &#11044; mensi je &#9679; i v kolecku je &#9406;\"]." +
	"\n\tdetailBlock := self semaforDetailBlock." +
	"\n\tarr allButLast do: [:col |" +
	"\n\t\tcol width: 51; isSortable: true; renderer: rend; on: #click do: detailBlock]." +
	"\n\tarr last width: 51; isSortable: true; renderer: rend." +
	"\n\t^ arr",
	null, "2014-04-24T21:53:55Z", "mp");

jst.FYTextKapitolyPanel.addMethod("pripravekColumn", "", "private", 
	"\t^ ExtColumn new " +
	"\n\t\theader: 'Přípravek'; " +
	"\n\t\tdataIndex: #obchJmeno; " +
	"\n\t\twidth: 200; " +
	"\n\t\tisSortable: true; " +
	"\n\t\trenderer: [:jm | " +
	"\n\t\t\t'<a href=\"por-hledej.html?prip=', jm, '\" target=\"por-hledej\">', jm, '</a>'].",
	null, "2014-04-24T21:45:05Z", "mp");

jst.FYTextKapitolyPanel.addMethod("ucinnaLatkaColumn", "", "private", 
	"\t^ ExtColumn new " +
	"\n\t\theader: 'Účinná látka'; " +
	"\n\t\tdataIndex: #ucinneLatky; " +
	"\n\t\twidth: 170; " +
	"\n\t\tisSortable: true",
	null, "2014-04-24T21:46:04Z", "mp");

jst.FYTextKapitolyPanel.addMethod("biologFunkceColumn", "", "private", 
	"\t^ ExtColumn new " +
	"\n\t\theader: 'Biologická funkce'; " +
	"\n\t\tdataIndex: #biologFunkce; " +
	"\n\t\twidth: 250;" +
	"\n\t\tisSortable: true",
	null, "2014-04-24T21:55:45Z", "mp");

jst.FYTextKapitolyPanel.addMethod("zobrazTabulkuPOR:", "kapId", "private", 
	"\t| data expander cols dv tab |" +
	"\n\tdv := Document current elementById: (semaforIds at: kapId)." +
	"\n\tdv ifNil: [" +
	"\n\t\t\"napr. prime metody monitoringu nemusi byt vzdy vyplneny\"" +
	"\n\t\t^ self]." +
	"\n\tdv attributeAt: 'style' put: ''." +
	"\n\tdata := semaforData at: kapId ifAbsent: [#()]." +
	"\n\tdata isEmpty ifTrue: [" +
	"\n\t\tdv attributeAt: 'class' put: ''." +
	"\n\t\t(kapId startsWith: #monitoring) ifFalse: [ExtBoxComponent new" +
	"\n\t\t\trenderTo: (semaforIds at: kapId);" +
	"\n\t\t\tcls: 'obsah';" +
	"\n\t\t\tcontents: '<span style=\"white-space:pre\">\t</span>Nebyly nalezeny žádné povolené přípravky.';" +
	"\n\t\t\tshow]." +
	"\n\t\t^ self]." +
	"\n\texpander := ExtRowExpander new tpl: self tplPouziti." +
	"\n\tcols := OrderedCollection new" +
	"\n\t\tadd: expander;" +
	"\n\t\tadd: self pripravekColumn;" +
	"\n\t\tadd: self ucinnaLatkaColumn;" +
	"\n\t\tyourself." +
	"\n\t((kapId endsWith: #ripravky) or: [kapId endsWith: #dozravani])" +
	"\n\t\tifTrue: [cols addAll: self semaforColumns]" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tcols last width: 300." +
	"\n\t\t\tcols add: self biologFunkceColumn]." +
	"\n\ttab := ExtGridPanel new" +
	"\n\t\tstore: (ExtArrayStore new" +
	"\n\t\t\tautoDestroy: true;" +
	"\n\t\t\tfields: self storeFields);" +
	"\n\t\tcolumns: cols;" +
	"\n\t\tcolumnLines: true;" +
	"\n\t\tplugins: expander;" +
	"\n\t\tanchor: '100%';" +
	"\n\t\theight: (data size * 21 + 100 min: self gridHeight);" +
	"\n\t\tloadData: data." +
	"\n\t(kapId startsWith: #monitoring) ifTrue: [" +
	"\n\t\tdv attributeAt: 'class' put: ''." +
	"\n\t\ttab cls: 'semafor-por'." +
	"\n\t\ttab := ExtContainer new" +
	"\n\t\t\tadd: (ExtBoxComponent new cls: 'nazev3'; contents: 'Monitorovací pomůcky');" +
	"\n\t\t\tadd: tab;" +
	"\n\t\t\tyourself]." +
	"\n\ttab" +
	"\n\t\trenderTo: (semaforIds at: kapId);" +
	"\n\t\tshow",
	null, "2014-04-25T12:51:30Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("zobrazTabulkuPOR:", "kapId", "private", 
	"\t| data expander cols dv tab |" +
	"\n\tdv := Document current elementById: (semaforIds at: kapId)." +
	"\n\tdv ifNil: [" +
	"\n\t\t\"napr. prime metody monitoringu nemusi byt vzdy vyplneny\"" +
	"\n\t\t^ self]." +
	"\n\tdv attributeAt: 'style' put: ''." +
	"\n\tdata := semaforData at: kapId ifAbsent: [#()]." +
	"\n\tdata isEmpty ifTrue: [" +
	"\n\t\tdv attributeAt: 'class' put: ''." +
	"\n\t\t(kapId startsWith: #monitoring) ifFalse: [ExtBoxComponent new" +
	"\n\t\t\trenderTo: (semaforIds at: kapId);" +
	"\n\t\t\tcls: 'obsah';" +
	"\n\t\t\thtmlContents: [:html | self renderZadnePripOn: html];" +
	"\n\t\t\tshow]." +
	"\n\t\t^ self]." +
	"\n\texpander := ExtRowExpander new tpl: self tplPouziti." +
	"\n\tcols := OrderedCollection new" +
	"\n\t\tadd: expander;" +
	"\n\t\tadd: self pripravekColumn;" +
	"\n\t\tadd: self ucinnaLatkaColumn;" +
	"\n\t\tyourself." +
	"\n\t((kapId endsWith: #ripravky) or: [kapId endsWith: #dozravani])" +
	"\n\t\tifTrue: [cols addAll: self semaforColumns]" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tcols last width: 300." +
	"\n\t\t\tcols add: self biologFunkceColumn]." +
	"\n\ttab := ExtGridPanel new" +
	"\n\t\tstore: (ExtArrayStore new" +
	"\n\t\t\tautoDestroy: true;" +
	"\n\t\t\tfields: self storeFields);" +
	"\n\t\tcolumns: cols;" +
	"\n\t\tcolumnLines: true;" +
	"\n\t\tplugins: expander;" +
	"\n\t\tanchor: '100%';" +
	"\n\t\theight: (data size * 21 + 100 min: self gridHeight);" +
	"\n\t\tloadData: data." +
	"\n\t(kapId startsWith: #monitoring) ifTrue: [" +
	"\n\t\tdv attributeAt: 'class' put: ''." +
	"\n\t\ttab cls: 'semafor-por'." +
	"\n\t\ttab := ExtContainer new" +
	"\n\t\t\tadd: (ExtBoxComponent new cls: 'nazev3'; contents: 'Monitorovací pomůcky');" +
	"\n\t\t\tadd: tab;" +
	"\n\t\t\tyourself]." +
	"\n\ttab" +
	"\n\t\trenderTo: (semaforIds at: kapId);" +
	"\n\t\tshow",
	null, "2014-04-28T14:46:52Z", "mp", 2);

jst.FYTextKapitolyPanel.addMethod("zobrazTabulkuPOR:", "kapId", "private", 
	"\t| data expander cols dv tab |" +
	"\n\tdv := Document current elementById: (semaforIds at: kapId)." +
	"\n\tdv ifNil: [" +
	"\n\t\t\"napr. prime metody monitoringu nemusi byt vzdy vyplneny\"" +
	"\n\t\t^ self]." +
	"\n\tdv attributeAt: 'style' put: ''." +
	"\n\tdata := semaforData at: kapId ifAbsent: [#()]." +
	"\n\tdata isEmpty ifTrue: [" +
	"\n\t\tdv attributeAt: 'class' put: ''." +
	"\n\t\t(kapId startsWith: #monitoring) ifFalse: [ExtBoxComponent new" +
	"\n\t\t\trenderTo: (semaforIds at: kapId);" +
	"\n\t\t\tcls: 'obsah';" +
	"\n\t\t\thtmlContents: [:html | self renderZadnePripOn: html];" +
	"\n\t\t\tshow]." +
	"\n\t\t^ self]." +
	"\n\texpander := ExtRowExpander new tpl: self tplPouziti." +
	"\n\tcols := OrderedCollection new" +
	"\n\t\tadd: expander;" +
	"\n\t\tadd: self pripravekColumn;" +
	"\n\t\tadd: self ucinnaLatkaColumn;" +
	"\n\t\tyourself." +
	"\n\t((kapId endsWith: #ripravky) or: [kapId endsWith: #dozravani])" +
	"\n\t\tifTrue: [cols addAll: self semaforColumns]" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tcols last width: 300." +
	"\n\t\t\tcols add: self biologFunkceColumn]." +
	"\n\ttab := ExtGridPanel new" +
	"\n\t\tstore: (ExtArrayStore new" +
	"\n\t\t\tautoDestroy: true;" +
	"\n\t\t\tfields: self storeFields);" +
	"\n\t\tviewConfig: {" +
	"\n\t\t\t#columnsText. 'Výběr sloupců'. " +
	"\n\t\t\t#sortAscText. 'Uspořádat vzestupně'. " +
	"\n\t\t\t#sortDescText. 'Uspořádat sestupně'};" +
	"\n\t\tcolumns: cols;" +
	"\n\t\tcolumnLines: true;" +
	"\n\t\tplugins: expander;" +
	"\n\t\tanchor: '100%';" +
	"\n\t\theight: (data size * 21 + 100 min: self gridHeight);" +
	"\n\t\tloadData: data." +
	"\n\t(kapId startsWith: #monitoring) ifTrue: [" +
	"\n\t\tdv attributeAt: 'class' put: ''." +
	"\n\t\ttab cls: 'semafor-por'." +
	"\n\t\ttab := ExtContainer new" +
	"\n\t\t\tadd: (ExtBoxComponent new cls: 'nazev3'; contents: 'Monitorovací pomůcky');" +
	"\n\t\t\tadd: tab;" +
	"\n\t\t\tyourself]." +
	"\n\ttab" +
	"\n\t\trenderTo: (semaforIds at: kapId);" +
	"\n\t\tshow",
	null, "2014-05-14T07:49:47Z", "mp", 3);

jst.FYTextKapitolyPanel.addMethod("zobrazTabulkuPOR:", "kapId", "private", 
	"\t| data expander cols dv tab |" +
	"\n\tdv := Document current elementById: (semaforIds at: kapId)." +
	"\n\tdv ifNil: [" +
	"\n\t\t\"napr. prime metody monitoringu nemusi byt vzdy vyplneny\"" +
	"\n\t\t^ self]." +
	"\n\tdv attributeAt: 'style' put: ''." +
	"\n\tdata := semaforData at: kapId ifAbsent: [#()]." +
	"\n\t(data isEmpty and: [kapId startsWith: #monitoring]) ifTrue: [" +
	"\n\t\tdv attributeAt: 'class' put: ''." +
	"\n\t\t^ self]." +
	"\n\texpander := ExtRowExpander new tpl: self tplPouziti." +
	"\n\tcols := OrderedCollection new" +
	"\n\t\tadd: expander;" +
	"\n\t\tadd: self pripravekColumn;" +
	"\n\t\tadd: self ucinnaLatkaColumn;" +
	"\n\t\tyourself." +
	"\n\t((kapId endsWith: #ripravky) or: [kapId endsWith: #dozravani])" +
	"\n\t\tifTrue: [cols addAll: self semaforColumns]" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tcols last width: 300." +
	"\n\t\t\tcols add: self biologFunkceColumn]." +
	"\n\ttab := ExtGridPanel new" +
	"\n\t\tstore: (ExtArrayStore new" +
	"\n\t\t\tautoDestroy: true;" +
	"\n\t\t\tfields: self storeFields);" +
	"\n\t\tviewConfig: {" +
	"\n\t\t\t#columnsText. 'Výběr sloupců'. " +
	"\n\t\t\t#sortAscText. 'Uspořádat vzestupně'. " +
	"\n\t\t\t#sortDescText. 'Uspořádat sestupně'};" +
	"\n\t\tcolumns: cols;" +
	"\n\t\tcolumnLines: true;" +
	"\n\t\tplugins: expander;" +
	"\n\t\tanchor: '100%';" +
	"\n\t\theight: (data size * 21 + 100 min: self gridHeight);" +
	"\n\t\tloadData: data." +
	"\n\tdata isEmpty ifTrue: [tab viewConfig " +
	"\n\t\tat: #deferEmptyText put: false;" +
	"\n\t\tat: #emptyText put: (DocumentFragment htmlContents: [:html | " +
	"\n\t\t\tself renderZadnePripOn: html]) printHtml]." +
	"\n\t(kapId startsWith: #monitoring) ifTrue: [" +
	"\n\t\tdv attributeAt: 'class' put: ''." +
	"\n\t\ttab cls: 'semafor-por'." +
	"\n\t\ttab := ExtContainer new" +
	"\n\t\t\tadd: (ExtBoxComponent new cls: 'nazev3'; contents: 'Monitorovací pomůcky');" +
	"\n\t\t\tadd: tab;" +
	"\n\t\t\tyourself]." +
	"\n\ttab" +
	"\n\t\trenderTo: (semaforIds at: kapId);" +
	"\n\t\tshow",
	null, "2014-05-14T09:47:33Z", "mp"); //fytoportal-ior

jst.FYTextKapitolyPanel.addMethod("renderZadnePripOn:", "html", "rendering", 
	"\thtml span style: 'white-space:pre'; with: String tab." +
	"\n\thtml text: 'Nebyly nalezeny žádné povolené přípravky v '." +
	"\n\thtml anchor " +
	"\n\t\thref: 'http://eagri.cz/public/app/eagriapp/POR/';" +
	"\n\t\ttarget: 'registrPOR';" +
	"\n\t\twith: 'Registru přípravků na ochranu rostlin.'",
	null, "2014-04-28T14:49:47Z", "mp");

jst.FYTextKapitolyPanel.addMethod("semaforDetailBlock", "", "private", 
	"\t^ [:col :grid :ix :ev | | tip x y | " +
	"\n\t\tx := ev x." +
	"\n\t\ty := ev y." +
	"\n\t\ttip := ExtTip new" +
	"\n\t\t\thtmlContents: [:html | " +
	"\n\t\t\t\tself renderSemaforDetail: col of: (grid store recordAt: ix) json on: html];" +
	"\n\t\t\tclosable: true;" +
	"\n\t\t\twidth: 500;" +
	"\n\t\t\ton: #mouseleave do: [tip hide; destroy];" +
	"\n\t\t\ton: #show do: [:c | [" +
	"\n\t\t\t\tx := x + c width >  Browser window pageWidth ifTrue: [c x - c width]." +
	"\n\t\t\t\ty := y + c height >  Browser window pageHeight ifTrue: [c y - c height]." +
	"\n\t\t\t\tx notNil | y notNil ifTrue: [" +
	"\n\t\t\t\t\tc position: (Point x: x y: y)]] delayed: 10];" +
	"\n\t\t\tshowAt: ev getXY" +
	"\n\t]",
	null, "2013-05-10T12:14:28Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("semaforDetailBlock", "", "private", 
	"\t^ [:col :grid :ix :ev | | tip x y | " +
	"\n\t\ttip := ExtTip new" +
	"\n\t\t\thtmlContents: [:html | " +
	"\n\t\t\t\tself renderSemaforDetail: col of: (grid store recordAt: ix) json on: html];" +
	"\n\t\t\tclosable: true;" +
	"\n\t\t\twidth: 500;" +
	"\n\t\t\ton: #mouseleave do: [tip hide; destroy];" +
	"\n\t\t\ton: #show do: [:c | " +
	"\n\t\t\t\t[y + c height >  Browser window pageHeight ifTrue: [" +
	"\n\t\t\t\t\tc y: c y - c height + 1]" +
	"\n\t\t\t\t] delayed: 10" +
	"\n\t\t\t]." +
	"\n\t\tx := ev x." +
	"\n\t\tx + tip width >  Browser window pageWidth ifTrue: [" +
	"\n\t\t\tx := x - tip width + 1]." +
	"\n\t\ty := ev y." +
	"\n\t\ttip showAt: {x. y}" +
	"\n\t]",
	null, "2013-05-13T06:25:19Z", "mp");

jst.FYTextKapitolyPanel.addMethod("renderSemaforDetail:of:on:", "column prip html", "rendering", 
	"\t| skupHU |" +
	"\n\tskupHU := prip udajeSkupiny: column dataIndex." +
	"\n\thtml p: [" +
	"\n\t\thtml bold: column tooltip, ' (', prip obchJmeno, ')']." +
	"\n\thtml table  class: 'semafor-udaje'; cellspacing: 0; with: [" +
	"\n\t\thtml tableRow class: 'heading'; with: [" +
	"\n\t\t\thtml tableData verticalAlign: 'top'; with: 'hodnocený údaj'." +
	"\n\t\t\thtml tableData verticalAlign: 'top'; with: 'význam údaje'." +
	"\n\t\t\tskupHU semafor ifNil: [html tableData: 'semafor']" +
	"\n\t\t]." +
	"\n\t\tskupHU udaje do: [:hu | " +
	"\n\t\t\t(skupHU semafor isNil or: [skupHU semafor = 1] or: [skupHU semafor = hu semafor]) ifTrue: [html tableRow: [" +
	"\n\t\t\t\thtml tableData verticalAlign: 'top'; with: hu veta." +
	"\n\t\t\t\thtml tableData verticalAlign: 'top'; with: hu udaj." +
	"\n\t\t\t\tskupHU semafor ifNil: [" +
	"\n\t\t\t\t\thtml tableData class: 'semafor', hu semafor asString; with: '']" +
	"\n\t\t\t]]" +
	"\n\t\t]" +
	"\n\t]",
	null, "2013-05-10T12:40:42Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("renderSemaforDetail:of:on:", "column prip html", "rendering", 
	"\t| skupHU barva |" +
	"\n\tskupHU := prip udajeSkupiny: column dataIndex." +
	"\n\tbarva := skupHU semafor isNil  or: [skupHU semafor = 1 and: [skupHU udaje anySatisfy: [:hu | hu semafor isNil]]]." +
	"\n\thtml p: [" +
	"\n\t\thtml bold: column tooltip, ' (', prip obchJmeno, ')']." +
	"\n\thtml table  class: 'semafor-udaje'; cellspacing: 0; with: [" +
	"\n\t\thtml tableRow class: 'heading'; with: [" +
	"\n\t\t\thtml tableData verticalAlign: 'top'; with: 'hodnocený údaj'." +
	"\n\t\t\thtml tableData verticalAlign: 'top'; with: 'význam údaje'." +
	"\n\t\t\tbarva ifTrue: [html tableData: 'semafor']" +
	"\n\t\t]." +
	"\n\t\tskupHU udaje do: [:hu | " +
	"\n\t\t\t(skupHU semafor isNil or: [skupHU semafor = 1] or: [skupHU semafor = hu semafor]) ifTrue: [html tableRow: [" +
	"\n\t\t\t\thtml tableData verticalAlign: 'top'; with: hu veta." +
	"\n\t\t\t\thtml tableData verticalAlign: 'top'; with: hu udaj." +
	"\n\t\t\t\tbarva ifTrue: [" +
	"\n\t\t\t\t\thtml tableData class: 'semafor', hu semafor asString; with: '']" +
	"\n\t\t\t]]" +
	"\n\t\t]" +
	"\n\t]",
	null, "2013-05-16T09:34:05Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("renderSemaforDetail:of:on:", "column prip html", "rendering", 
	"\t| skupHU barva |" +
	"\n\tskupHU := prip udajeSkupiny: column dataIndex." +
	"\n\tbarva := skupHU semafor isNil  or: [skupHU semafor = 1 and: [skupHU udaje anySatisfy: [:hu | hu semafor isNil]]]." +
	"\n\thtml p: [" +
	"\n\t\thtml bold: column tooltip, ' (', prip obchJmeno, ')']." +
	"\n\thtml table  class: 'semafor-udaje'; cellspacing: 0; with: [" +
	"\n\t\thtml tableRow class: 'heading'; with: [" +
	"\n\t\t\thtml tableData verticalAlign: 'top'; with: 'hodnocený údaj'." +
	"\n\t\t\thtml tableData verticalAlign: 'top'; with: 'zkratka'." +
	"\n\t\t\thtml tableData verticalAlign: 'top'; with: 'význam údaje'." +
	"\n\t\t\tbarva ifTrue: [html tableData: 'semafor']" +
	"\n\t\t]." +
	"\n\t\tskupHU udaje do: [:hu | " +
	"\n\t\t\t(skupHU semafor isNil or: [skupHU semafor = 1] or: [skupHU semafor = hu semafor]) ifTrue: [html tableRow: [" +
	"\n\t\t\t\thtml tableData verticalAlign: 'top'; with: hu veta." +
	"\n\t\t\t\thtml tableData verticalAlign: 'top'; with: hu alias." +
	"\n\t\t\t\thtml tableData verticalAlign: 'top'; with: [" +
	"\n\t\t\t\t\thtml text: hu udaj." +
	"\n\t\t\t\t\thu poznamka ifNotNil: [html br; bold: 'Upřesnění: '; text: hu poznamka]]." +
	"\n\t\t\t\tbarva ifTrue: [" +
	"\n\t\t\t\t\thtml tableData class: 'semafor', hu semafor asString; with: '']" +
	"\n\t\t\t]]" +
	"\n\t\t]" +
	"\n\t]",
	null, "2013-05-17T15:18:58Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("renderSemaforDetail:of:on:", "column prip html", "rendering", 
	"\t| skupHU |" +
	"\n\tskupHU := prip udajeSkupiny: column dataIndex." +
	"\n\thtml p: [" +
	"\n\t\thtml bold: column tooltip, ' (', prip obchJmeno, ')']." +
	"\n\thtml table  class: 'semafor-udaje'; cellspacing: 0; with: [" +
	"\n\t\thtml tableRow class: 'heading'; with: [" +
	"\n\t\t\thtml tableData verticalAlign: 'top'; with: 'hodnocený údaj'." +
	"\n\t\t\thtml tableData verticalAlign: 'top'; with: 'zkratka'." +
	"\n\t\t\thtml tableData verticalAlign: 'top'; with: 'význam údaje'." +
	"\n\t\t\thtml tableData: ''" +
	"\n\t\t]." +
	"\n\t\tskupHU udaje select: [:hu | hu mimoSemafor not] thenDo: [:hu | " +
	"\n\t\t\t(skupHU semafor isNil or: [skupHU semafor = 1] or: [skupHU semafor = hu semafor]) ifTrue: [html tableRow: [" +
	"\n\t\t\t\thtml tableData verticalAlign: 'top'; with: hu veta." +
	"\n\t\t\t\thtml tableData verticalAlign: 'top'; with: hu alias." +
	"\n\t\t\t\thtml tableData verticalAlign: 'top'; with: [" +
	"\n\t\t\t\t\thtml text: hu udaj." +
	"\n\t\t\t\t\thu poznamka ifNotNil: [html br; bold: 'Upřesnění: '; text: hu poznamka]]." +
	"\n\t\t\t\thtml tableData class: 'semafor', hu semafor asString; with: ''" +
	"\n\t\t\t]]" +
	"\n\t\t]" +
	"\n\t]",
	null, "2013-05-27T09:53:02Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("renderSemaforDetail:of:on:", "column prip html", "rendering", 
	"\t| skupHU |" +
	"\n\tskupHU := prip udajeSkupiny: column dataIndex." +
	"\n\thtml p: [" +
	"\n\t\thtml bold: column tooltip, ' (', prip obchJmeno, ')']." +
	"\n\thtml table  class: 'semafor-udaje'; cellspacing: 0; with: [" +
	"\n\t\thtml tableRow class: 'heading'; with: [" +
	"\n\t\t\thtml tableData verticalAlign: 'top'; with: 'hodnocený údaj'." +
	"\n\t\t\thtml tableData verticalAlign: 'top'; with: 'zkratka'." +
	"\n\t\t\thtml tableData verticalAlign: 'top'; with: 'význam údaje'." +
	"\n\t\t\thtml tableData: ''" +
	"\n\t\t]." +
	"\n\t\tskupHU udaje select: [:hu | hu zobrazDetail] thenDo: [:hu | " +
	"\n\t\t\t(skupHU semafor isNil or: [skupHU semafor = 1] or: [skupHU semafor = hu semafor]) ifTrue: [html tableRow: [" +
	"\n\t\t\t\thtml tableData verticalAlign: 'top'; with: hu veta." +
	"\n\t\t\t\thtml tableData verticalAlign: 'top'; with: hu alias." +
	"\n\t\t\t\thtml tableData verticalAlign: 'top'; with: [" +
	"\n\t\t\t\t\thtml text: hu udaj." +
	"\n\t\t\t\t\thu poznamka ifNotNil: [html br; bold: 'Upřesnění: '; text: hu poznamka]]." +
	"\n\t\t\t\thtml tableData class: 'semafor', hu semafor asString; with: ''" +
	"\n\t\t\t]]" +
	"\n\t\t]" +
	"\n\t]",
	null, "2013-05-29T08:18:17Z", "mp");

/*
jst.FYTextKapitolyPanel.addMethod("resetContent", "", "initialization", 
	"\tself isActive " +
	"\n\t\tifTrue: [self refreshContent]" +
	"\n\t\tifFalse: [kapitola := nil]",
	null, "2013-04-28T13:55:08Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("resetContent", "", "initialization", 
	"\tself isActive " +
	"\n\t\tifTrue: [self refreshContent]" +
	"\n\t\tifFalse: [kapitola := nil]",
	null, "2013-04-29T14:13:01Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("resetContent", "", "initialization", 
	"\tself isActive " +
	"\n\t\tifTrue: [" +
	"\n\t\t\t\"az pri nasledujici aktivaci komponenty\"" +
	"\n\t\t\tprekresli := semaforData notNil." +
	"\n\t\t\tself refreshContent]" +
	"\n\t\tifFalse: [kapitola := nil]",
	null, "2013-04-30T08:17:34Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("resetContent", "", "initialization", 
	"\tself isActive " +
	"\n\t\tifTrue: [" +
	"\n\t\t\tkapitola notNil & semaforData notNil ifTrue: [" +
	"\n\t\t\t\t\"prekreslim az pri nasledujici aktivaci komponenty\"" +
	"\n\t\t\t\tprekresli := kapitola]." +
	"\n\t\t\tself refreshContent]" +
	"\n\t\tifFalse: [kapitola := nil]",
	null, "2013-04-30T19:43:24Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("resetContent", "", "initialization", 
	"\tself isActive " +
	"\n\t\tifTrue: [kapitola ifNotNil: [" +
	"\n\t\t\tprekresli := semaforData ifNotNil: [" +
	"\n\t\t\t\t\"prekreslim az pri nasledujici aktivaci komponenty\"" +
	"\n\t\t\t\tkapitola]." +
	"\n\t\t\tself refreshContent]]" +
	"\n\t\tifFalse: [kapitola := nil]",
	null, "2013-05-06T13:38:34Z", "mp");
*/

jst.FYTextKapitolyPanel.addMethod("renderTaxonyOn:", "html", "rendering", 
	"\t| chybi h max |" +
	"\n\th := 150." +
	"\n\tchybi := FYFotografie new " +
	"\n\t\tformat: 1.333; " +
	"\n\t\tsoubor: 'xxx.jpg'; " +
	"\n\t\tpopis: 'Fotografie zatím chybí'." +
	"\n\tmax := self kapitola fotky values " +
	"\n\t\tinject: chybi format " +
	"\n\t\tinto: [:x :foto | foto format > x ifTrue: [foto format] ifFalse: x]." +
	"\n\tself kapitola taxony do: [:tx | | foto |" +
	"\n\t\tfoto := self kapitola fotky at: tx id ifAbsent: chybi." +
	"\n\t\thtml div class: 'ior-taxon-nahled'; with: [" +
	"\n\t\t\thtml div class: 'fotka'; style: 'width: ', (h * max) asString, 'px;'; with: [html img " +
	"\n\t\t\t\theight: h; " +
	"\n\t\t\t\twidth: foto format * h; " +
	"\n\t\t\t\tsrc: foto preview;" +
	"\n\t\t\t\ttitle: foto popis]." +
	"\n\t\t\thtml div class: 'foto-taxon-popis'; with: [tx renderOn: html]]" +
	"\n\t]",
	null, "2013-06-27T20:32:40Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("renderTaxonyOn:", "html", "rendering", 
	"\t| chybi h max |" +
	"\n\th := 150." +
	"\n\tchybi := FYFotografie new " +
	"\n\t\tformat: 1.333; " +
	"\n\t\tsoubor: 'xxx.jpg'; " +
	"\n\t\tpopis: 'Fotografie zatím chybí'." +
	"\n\tmax := self kapitola fotky values " +
	"\n\t\tinject: chybi format " +
	"\n\t\tinto: [:x :foto | foto format > x ifTrue: [foto format] ifFalse: x]." +
	"\n\tself kapitola taxony do: [:tx | | foto |" +
	"\n\t\tfoto := self kapitola fotky at: tx id ifAbsent: chybi." +
	"\n\t\thtml div class: 'ior-taxon-nahled'; with: [" +
	"\n\t\t\thtml div class: 'fotka'; style: 'width: ', (h * max) asString, 'px;'; with: [html img " +
	"\n\t\t\t\theight: h; " +
	"\n\t\t\t\twidth: foto format * h; " +
	"\n\t\t\t\tsrc: foto preview;" +
	"\n\t\t\t\ttitle: foto popis]." +
	"\n\t\t\thtml div class: 'foto-taxon-popis'; with: [" +
	"\n\t\t\t\ttx renderOn: html without: #(synonyma kody)." +
	"\n\t\t\t\tfoto == chybi ifFalse: [html p: [" +
	"\n\t\t\t\t\thtml text: '(fotografie: ', foto autor, ')']]" +
	"\n\t\t\t]" +
	"\n\t\t]" +
	"\n\t]",
	null, "2013-12-17T15:59:50Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("renderTaxonyOn:", "html", "rendering", 
	"\t| chybi h max |" +
	"\n\th := 150." +
	"\n\tchybi := FYFotografie new " +
	"\n\t\tformat: 1.333; " +
	"\n\t\tsoubor: 'xxx.jpg'; " +
	"\n\t\tpopis: 'Fotografie zatím chybí'." +
	"\n\tmax := self kapitola fotky values " +
	"\n\t\tinject: chybi format " +
	"\n\t\tinto: [:x :foto | foto format > x ifTrue: [foto format] ifFalse: x]." +
	"\n\tself kapitola taxony do: [:tx | | foto |" +
	"\n\t\tfoto := self kapitola fotky at: tx id ifAbsent: chybi." +
	"\n\t\thtml div class: 'ior-taxon-nahled'; with: [" +
	"\n\t\t\thtml div class: 'fotka'; style: 'width: ', (h * max) rounded asString, 'px;'; with: [html img " +
	"\n\t\t\t\theight: h; " +
	"\n\t\t\t\twidth: (foto format * h) rounded; " +
	"\n\t\t\t\tsrc: foto preview;" +
	"\n\t\t\t\ttitle: foto popis]." +
	"\n\t\t\thtml div class: 'foto-taxon-popis'; with: [" +
	"\n\t\t\t\ttx renderOn: html without: #(synonyma kody)." +
	"\n\t\t\t\tfoto == chybi ifFalse: [html p: [" +
	"\n\t\t\t\t\thtml text: '(fotografie: ', foto autor, ')']]" +
	"\n\t\t\t]" +
	"\n\t\t]" +
	"\n\t]",
	null, "2013-12-29T15:12:13Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("renderTaxonyOn:", "html", "rendering", 
	"\t| chybi h max |" +
	"\n\th := 150." +
	"\n\tchybi := FYFotografie new " +
	"\n\t\tformat: 1.333; " +
	"\n\t\tsoubor: 'xxx.jpg'; " +
	"\n\t\tpopis: 'Fotografie zatím chybí'." +
	"\n\tmax := self kapitola fotky values " +
	"\n\t\tinject: chybi format " +
	"\n\t\tinto: [:x :foto | foto format > x ifTrue: [foto format] ifFalse: x]." +
	"\n\tself kapitola taxony do: [:tx | (Browser location isPublic not or: [tx jePlodina not] or: [tx publikovat]) ifTrue: [" +
	"\n\t\t| foto | " +
	"\n\t\tfoto := self kapitola fotky at: tx id ifAbsent: chybi." +
	"\n\t\thtml div class: 'ior-taxon-nahled'; with: [" +
	"\n\t\t\thtml div class: 'fotka'; style: 'width: ', (h * max) rounded asString, 'px;'; with: [html img " +
	"\n\t\t\t\theight: h; " +
	"\n\t\t\t\twidth: (foto format * h) rounded; " +
	"\n\t\t\t\tsrc: foto preview;" +
	"\n\t\t\t\ttitle: foto popis]." +
	"\n\t\t\thtml div class: 'foto-taxon-popis'; with: [" +
	"\n\t\t\t\ttx renderOn: html without: #(synonyma kody)." +
	"\n\t\t\t\tfoto == chybi ifFalse: [html p: [" +
	"\n\t\t\t\t\thtml text: '(fotografie: ', foto autor, ')']]" +
	"\n\t\t\t]" +
	"\n\t\t]" +
	"\n\t]]",
	null, "2014-02-01T22:40:40Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("renderTaxonyOn:", "html", "rendering", 
	"\t| chybi h max |" +
	"\n\th := 150." +
	"\n\tchybi := FYFotografie new " +
	"\n\t\tformat: 1.333; " +
	"\n\t\tsoubor: 'xxx.jpg'; " +
	"\n\t\tpopis: 'Fotografie zatím chybí'." +
	"\n\tmax := self kapitola fotky values " +
	"\n\t\tinject: 0 " +
	"\n\t\tinto: [:x :foto | foto format > x ifTrue: [foto format] ifFalse: x]." +
	"\n\tmax = 0 ifTrue: [" +
	"\n\t\tmax := chybi format]." +
	"\n\tself kapitola taxony do: [:tx | (Browser location isPublic not or: [tx jePlodina not] or: [tx publikovat]) ifTrue: [" +
	"\n\t\t| foto | " +
	"\n\t\tfoto := self kapitola fotky at: tx id ifAbsent: chybi." +
	"\n\t\thtml div class: 'ior-taxon-nahled'; with: [" +
	"\n\t\t\thtml div class: 'fotka'; style: 'width: ', (h * max) rounded asString, 'px;'; with: [html img " +
	"\n\t\t\t\theight: h; " +
	"\n\t\t\t\twidth: (foto format * h) rounded; " +
	"\n\t\t\t\tsrc: foto preview;" +
	"\n\t\t\t\ttitle: foto popis]." +
	"\n\t\t\thtml div class: 'foto-taxon-popis'; with: [" +
	"\n\t\t\t\ttx renderOn: html without: #(synonyma kody)." +
	"\n\t\t\t\tfoto == chybi ifFalse: [html p: [" +
	"\n\t\t\t\t\thtml text: '(fotografie: ', foto autor, ')']]" +
	"\n\t\t\t]" +
	"\n\t\t]" +
	"\n\t]]",
	null, "2014-02-11T13:36:16Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("renderTaxonyOn:", "html", "rendering", 
	"\t| chybi h max |" +
	"\n\th := 150." +
	"\n\tchybi := FYFotografie new " +
	"\n\t\tformat: 1.333; " +
	"\n\t\tsoubor: 'xxx.jpg'; " +
	"\n\t\tpopis: 'Fotografie zatím chybí'." +
	"\n\tmax := self kapitola fotky values " +
	"\n\t\tinject: 0 " +
	"\n\t\tinto: [:x :foto | foto format > x ifTrue: [foto format] ifFalse: x]." +
	"\n\tmax = 0 ifTrue: [" +
	"\n\t\tmax := chybi format]." +
	"\n\tself kapitola taxony size = 1 ifTrue: [" +
	"\n\t\th := 400]." +
	"\n\tself kapitola taxony do: [:tx | (Browser location isPublic not or: [tx jePlodina not] or: [tx publikovat]) ifTrue: [" +
	"\n\t\t| foto | " +
	"\n\t\tfoto := self kapitola fotky at: tx id ifAbsent: chybi." +
	"\n\t\thtml div class: 'ior-taxon-nahled'; with: [" +
	"\n\t\t\thtml div class: 'fotka'; style: 'width: ', (h * max) rounded asString, 'px;'; with: [html img " +
	"\n\t\t\t\theight: h; " +
	"\n\t\t\t\twidth: (foto format * h) rounded; " +
	"\n\t\t\t\tsrc: (h > 150 ifTrue: [foto optimal] ifFalse: [foto preview]);" +
	"\n\t\t\t\ttitle: foto popis]." +
	"\n\t\t\thtml div class: 'foto-taxon-popis'; with: [" +
	"\n\t\t\t\ttx renderOn: html without: #(synonyma kody)." +
	"\n\t\t\t\tfoto == chybi ifFalse: [html p: [" +
	"\n\t\t\t\t\thtml text: '(fotografie: ', foto autor, ')']]" +
	"\n\t\t\t]" +
	"\n\t\t]" +
	"\n\t]]",
	null, "2014-02-11T14:37:21Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("renderTaxonyOn:", "html", "rendering", 
	"\t| chybi h max |" +
	"\n\th := 150." +
	"\n\tchybi := FYFotografie new " +
	"\n\t\tformat: 1.333; " +
	"\n\t\tsoubor: 'xxx.jpg'; " +
	"\n\t\tpopis: 'Fotografie zatím chybí'." +
	"\n\tmax := self kapitola fotky values " +
	"\n\t\tinject: 0 " +
	"\n\t\tinto: [:x :foto | foto format > x ifTrue: [foto format] ifFalse: x]." +
	"\n\tmax = 0 ifTrue: [" +
	"\n\t\tmax := chybi format]." +
	"\n\tself kapitola taxony size = 1 ifTrue: [" +
	"\n\t\th := 400]." +
	"\n\tself kapitola metodikyTaxony do: [:asc | " +
	"\n\t\t(Browser location isPublic not or: [asc value jePlodina not] or: [asc value publikovat]) ifTrue: [" +
	"\n\t\t| foto | " +
	"\n\t\tfoto := self kapitola fotky at: asc value  id ifAbsent: chybi." +
	"\n\t\thtml div class: 'ior-taxon-nahled'; with: [" +
	"\n\t\t\thtml div class: 'fotka'; style: 'width: ', (h * max) rounded asString, 'px;'; with: [html img " +
	"\n\t\t\t\theight: h; " +
	"\n\t\t\t\twidth: (foto format * h) rounded; " +
	"\n\t\t\t\tsrc: (h > 150 ifTrue: [foto optimal] ifFalse: [foto preview]);" +
	"\n\t\t\t\ttitle: foto popis]." +
	"\n\t\t\thtml div class: 'foto-taxon-popis'; with: [" +
	"\n\t\t\t\tasc value renderOn: html without: #(synonyma kody) ref: (self taxonRefOn: asc)." +
	"\n\t\t\t\tfoto == chybi ifFalse: [html p: [" +
	"\n\t\t\t\t\thtml text: '(fotografie: ', foto autor, ')']]" +
	"\n\t\t\t]" +
	"\n\t\t]" +
	"\n\t]]",
	null, "2014-02-17T16:21:44Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("renderTaxonyOn:", "html", "rendering", 
	"\t| chybi h max |" +
	"\n\th := 150." +
	"\n\tchybi := FYFotografie new " +
	"\n\t\tformat: 1.333; " +
	"\n\t\tsoubor: 'xxx.jpg'; " +
	"\n\t\tpopis: 'Fotografie zatím chybí'." +
	"\n\tmax := self kapitola fotky values " +
	"\n\t\tinject: 0 " +
	"\n\t\tinto: [:x :foto | foto format > x ifTrue: [foto format] ifFalse: x]." +
	"\n\tmax = 0 ifTrue: [" +
	"\n\t\tmax := chybi format]." +
	"\n\tself kapitola metodikyTaxony do: [:asc | " +
	"\n\t\t(Browser location isPublic not or: [asc value jePlodina not] or: [asc value publikovat]) ifTrue: [" +
	"\n\t\t| foto | " +
	"\n\t\tfoto := self kapitola fotky at: asc value  id ifAbsent: chybi." +
	"\n\t\thtml div class: 'ior-taxon-nahled'; with: [" +
	"\n\t\t\thtml div class: 'fotka'; style: 'width: ', (h * max) rounded asString, 'px;'; with: [html img " +
	"\n\t\t\t\theight: h; " +
	"\n\t\t\t\twidth: (foto format * h) rounded; " +
	"\n\t\t\t\tsrc: foto preview;" +
	"\n\t\t\t\ttitle: foto popis]." +
	"\n\t\t\thtml div class: 'foto-taxon-popis'; with: [" +
	"\n\t\t\t\tasc value renderOn: html without: #(synonyma kody) ref: (self taxonRefOn: asc)." +
	"\n\t\t\t\tfoto == chybi ifFalse: [html p: [" +
	"\n\t\t\t\t\thtml text: '(fotografie: ', foto autor, ')']]" +
	"\n\t\t\t]" +
	"\n\t\t]" +
	"\n\t]]",
	null, "2014-02-18T08:24:53Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("renderTaxonyOn:", "html", "rendering", 
	"\t| chybi h w str |" +
	"\n\tchybi := FYFotografie new " +
	"\n\t\tformat: 1.333; " +
	"\n\t\tsoubor: 'xxx.jpg'; " +
	"\n\t\tpopis: 'Fotografie zatím chybí'." +
	"\n\tstr := 'width: 200px; height: 150px;'." +
	"\n\tself kapitola metodikyTaxony do: [:asc | " +
	"\n\t\t(Browser location isPublic not or: [asc value jePlodina not] or: [asc value publikovat]) ifTrue: [" +
	"\n\t\t| foto | " +
	"\n\t\tfoto := self kapitola fotky at: asc value  id ifAbsent: chybi." +
	"\n\t\tfoto format > 1 & (foto format < chybi format) " +
	"\n\t\t\tifTrue: [w := 200. h := (w / foto format) rounded]" +
	"\n\t\t\tifFalse: [h := 150. w := (h * foto format) rounded]." +
	"\n\t\thtml div class: 'ior-taxon-nahled'; with: [" +
	"\n\t\t\thtml div class: 'fotka'; style: str; with: [html img " +
	"\n\t\t\t\theight: h; " +
	"\n\t\t\t\twidth: w; " +
	"\n\t\t\t\tsrc: foto preview;" +
	"\n\t\t\t\ttitle: foto popis]." +
	"\n\t\t\thtml div class: 'foto-taxon-popis'; with: [" +
	"\n\t\t\t\tasc value renderOn: html without: #(synonyma kody) ref: (self taxonRefOn: asc)." +
	"\n\t\t\t\tfoto == chybi ifFalse: [html p: [" +
	"\n\t\t\t\t\thtml text: '(fotografie: ', foto autor, ')']]" +
	"\n\t\t\t]" +
	"\n\t\t]" +
	"\n\t]]",
	null, "2014-02-22T19:33:15Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("renderTaxonyOn:", "html", "rendering", 
	"\t| chybi h w str |" +
	"\n\tchybi := FYFotografie new " +
	"\n\t\tformat: 1.333; " +
	"\n\t\tsoubor: 'xxx.jpg'; " +
	"\n\t\tpopis: 'Fotografie zatím chybí'." +
	"\n\tstr := 'width: 200px; height: 150px;'." +
	"\n\tself kapitola metodikyTaxony do: [:asc | " +
	"\n\t\t(Browser location isPublic not or: [asc value jePlodina not] or: [asc value publikovat]) ifTrue: [" +
	"\n\t\t| foto | " +
	"\n\t\tfoto := self kapitola fotky at: asc value  id ifAbsent: chybi." +
	"\n\t\tfoto format > 1 & (foto format < chybi format) " +
	"\n\t\t\tifTrue: [w := 200. h := (w / foto format) rounded]" +
	"\n\t\t\tifFalse: [h := 150. w := (h * foto format) rounded]." +
	"\n\t\thtml div class: 'ior-taxon-nahled'; with: [" +
	"\n\t\t\thtml div class: 'fotka'; style: str; with: [" +
	"\n\t\t\t\tself renderFoto: foto width: w height: h taxon: asc value on: html]." +
	"\n\t\t\thtml div class: 'foto-taxon-popis'; with: [" +
	"\n\t\t\t\tasc value renderOn: html without: #(synonyma kody) ref: (self taxonRefOn: asc)." +
	"\n\t\t\t\tfoto == chybi ifFalse: [html p: [" +
	"\n\t\t\t\t\thtml text: '(fotografie: ', foto autor, ')']]" +
	"\n\t\t\t]" +
	"\n\t\t]" +
	"\n\t]]",
	null, "2014-02-26T21:26:07Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("renderTaxonyOn:", "html", "rendering", 
	"\tself kapitola kapitolyTiskVyber do: [:kap | " +
	"\n\t\tkap renderNahledOn: html]",
	null, "2014-03-06T22:32:59Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("renderTaxonyOn:", "html", "rendering", 
	"\t| tisk |" +
	"\n\ttisk := FYTiskTaxonuIOR new." +
	"\n\tself kapitola kapitolyTiskVyber do: [:kap | " +
	"\n\t\ttisk kapitola: kap; " +
	"\n\t\t\trenderNahledOn: html]",
	null, "2014-03-07T15:06:54Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("renderTaxonyOn:", "html", "rendering", 
	"\t| tisk |" +
	"\n\ttisk := FYTiskTaxonuIOR new." +
	"\n\tself kapitola kapitolyTiskVyber do: [:kap | " +
	"\n\t\ttisk kapitola: kap." +
	"\n\t\tid = #abionozy ifTrue: [" +
	"\n\t\t\thtml div class: 'kapitola-taxon'; with: [" +
	"\n\t\t\t\ttisk renderOn: html." +
	"\n\t\t\t\tkap kapitolyTiskVyber do: [:k |" +
	"\n\t\t\t\t\tk renderTextOn: html of: self]]" +
	"\n\t\t] ifFalse: [" +
	"\n\t\t\ttisk renderNahledOn: html]." +
	"\n\t]",
	null, "2014-03-16T20:39:10Z", "mp"); //fytoportal-ior

jst.FYTextKapitolyPanel.addMethod("jeNahledKapitoly", "", "testing", 
	"\t^ false",
	null, "2014-03-07T21:48:51Z", "mp"); //fytoportal-ior

jst.FYTextKapitolyPanel.addMethod("jeKapitolaSO", "", "testing", 
	"\t^ false",
	null, "2013-10-08T20:47:52Z", "mp");

jst.FYTextKapitolyPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #zmenaVyberuKapitol ifTrue: [" +
	"\n\t\tself refreshContent]",
	null, "2013-12-29T20:18:28Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #zmenaVyberuKapitol & (id ~= #pestebniOpatreni) & self kapitola notNil ifTrue: [" +
	"\n\t\t\"filtrovani podle plodin se tyka vsech panelu krome pestebnich opatreni" +
	"\n\t\tprime zaklikavani se tyka jen dane kapitoly a aktivniho panelu\"" +
	"\n\t\tanObject = #plodiny ifTrue: [" +
	"\n\t\t\t\"muze ovlivnit seznam pripravku, prekresli se pri aktivaci zalozky\"" +
	"\n\t\t\tsemaforData := nil." +
	"\n\t\t\tprekresli := true" +
	"\n\t\t] ifFalse: [" +
	"\n\t\t\tself refreshContent]" +
	"\n\t]",
	null, "2014-03-18T16:25:38Z", "mp"); //fytoportal-ior

jst.FYTextKapitolyPanel.addMethod("activateEvent", "", "events", 
	"\t^ [prekresli ifTrue: [" +
	"\n\t\tprekresli := false." +
	"\n\t\tself refreshContent]]",
	null, "2014-03-18T16:11:47Z", "mp");

//*** FYTextKapPlodinyPanel ***

jst.FYTextKapPlodinyPanel.addMethod("renderContentOn:", "html", "rendering", 
	"\tself renderTaxonyOn: html",
	null, "2013-05-20T08:21:20Z", "mp", 1);

jst.FYTextKapPlodinyPanel.addMethod("renderContentOn:", "html", "rendering", 
	"\tplodina ifNil: [" +
	"\n\t\t\"obrazky plodin\"" +
	"\n\t\tself renderTaxonyOn: html" +
	"\n\t] ifNotNil: [" +
	"\n\t\t\"vybrana plodina\"" +
	"\n\t\thtml div class: 'kapitola-taxon'; with: [" +
	"\n\t\t\tFYTiskTaxonuIOR new " +
	"\n\t\t\t\tkapitola: plodina;" +
	"\n\t\t\t\trenderOn: html." +
	"\n\t\t\thtml div class: 'kapitola'; with: [" +
	"\n\t\t\t\thtml div class: 'obsah'; with: [" +
	"\n\t\t\t\t\thtml html: plodina taxony first popis]]" +
	"\n\t\t]" +
	"\n\t]",
	null, "2014-03-16T23:08:17Z", "mp", 1);

jst.FYTextKapPlodinyPanel.addMethod("renderContentOn:", "html", "rendering", 
	"\t(plodina notNil and: [plodina jePlodina]) ifTrue: [" +
	"\n\t\t\"vybrana plodina\"" +
	"\n\t\thtml div class: 'kapitola-taxon'; with: [" +
	"\n\t\t\tFYTiskTaxonuIOR new " +
	"\n\t\t\t\tkapitola: plodina;" +
	"\n\t\t\t\trenderOn: html." +
	"\n\t\t\thtml div class: 'kapitola'; with: [" +
	"\n\t\t\t\thtml div class: 'obsah'; with: [" +
	"\n\t\t\t\t\thtml html: plodina taxony first popis]]" +
	"\n\t\t]" +
	"\n\t] ifFalse: [" +
	"\n\t\t\"obrazky plodin\"" +
	"\n\t\tself renderTaxonyOn: html" +
	"\n\t]",
	null, "2014-04-15T13:15:16Z", "mp", 1);

jst.FYTextKapPlodinyPanel.addMethod("renderContentOn:", "html", "rendering", 
	"\t(plodina notNil and: [plodina jePlodina]) ifTrue: [" +
	"\n\t\t\"vybrana plodina\"" +
	"\n\t\thtml div class: 'kapitola-taxon'; with: [" +
	"\n\t\t\tFYTiskTaxonuIOR new " +
	"\n\t\t\t\tkapitola: plodina;" +
	"\n\t\t\t\trenderOn: html." +
	"\n\t\t\thtml div class: 'kapitola'; with: [" +
	"\n\t\t\t\thtml div class: 'obsah'; with: [" +
	"\n\t\t\t\t\thtml html: plodina taxony first popis]]" +
	"\n\t\t]." +
	"\n\t\thtml div class: 'kapitola'; with: [" +
	"\n\t\t\thtml div class: 'nazev2'; with: 'Charakteristika vybraných odrůd'." +
	"\n\t\t\thtml div class: 'obsah'; with: [" +
	"\n\t\t\t\thtml text: '(převzato z '." +
	"\n\t\t\t\thtml anchor " +
	"\n\t\t\t\t\thref: 'http://nou.ukzuz.cz/ido'; " +
	"\n\t\t\t\t\ttarget: 'ukzuz_nou';" +
	"\n\t\t\t\t\twith: 'databáze odrůd ÚKZÚZ'." +
	"\n\t\t\t\thtml text: ')']." +
	"\n\t\t\t((Fytoportal data odrudy popisyOdrud lookupKeys: plodina taxony first kody) " +
	"\n\t\t\t\tcollect: [:row | row value]) asSortedCollection do: [:odr |" +
	"\n\t\t\t\t\todr renderOn: html]" +
	"\n\t\t]" +
	"\n\t] ifFalse: [" +
	"\n\t\t\"obrazky plodin\"" +
	"\n\t\tself renderTaxonyOn: html" +
	"\n\t]",
	null, "2014-05-19T08:37:25Z", "mp"); //fytoportal-ior

jst.FYTextKapPlodinyPanel.addMethod("podkapitolaId", "", "accessing", 
	"\t\"id konkretni plodiny nebo #plodiny\"" +
	"\n\t^ plodina ifNotNil: [plodina id] ifNil: id",
	null, "2014-03-16T21:32:53Z", "mp");

jst.FYTextKapPlodinyPanel.addMethod("nactiKapitolu:", "kap", "accessing", 
	"\t(kapitola notNil and: [kapitola metodika == kap metodika]) ifFalse: [" +
	"\n\t\tkapitola := kap." +
	"\n\t\tplodina := kap kapitolyTiskVyber size = 1 ifTrue: [" +
	"\n\t\t\tkap kapitolyTiskVyber first]." +
	"\n\t\tself refreshContent]",
	null, "2014-03-16T21:47:37Z", "mp", 1);

jst.FYTextKapPlodinyPanel.addMethod("nactiKapitolu:", "kap", "accessing", 
	"\t(kapitola notNil and: [kapitola metodika == kap metodika]) ifFalse: [" +
	"\n\t\tkapitola := kap." +
	"\n\t\tplodina := kap kapitolyTisk size = 1 ifTrue: [" +
	"\n\t\t\tkap kapitolyTiskVyber first]." +
	"\n\t\tself refreshContent]",
	null, "2014-03-18T15:49:15Z", "mp"); //fytoportal-ior

jst.FYTextKapPlodinyPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #zmenaVyberuKapitol ifTrue: [" +
	"\n\t\tkapitola resetujTaxony." +
	"\n\t\tself refreshContent]",
	null, "2013-09-27T08:12:01Z", "mp", 1);

jst.FYTextKapPlodinyPanel.addMethod("update:with:", "anAspect node", "updating", 
	"\tanAspect = #kapitola ifTrue: [" +
	"\n\t\tnode id = id ifTrue: [" +
	"\n\t\t\t\"vsechny plodiny\"" +
	"\n\t\t\tplodina ifNotNil: [" +
	"\n\t\t\t\tplodina := nil." +
	"\n\t\t\t\tself refreshContent]" +
	"\n\t\t] ifFalse: [" +
	"\n\t\t\t\"vybrana plodina\"" +
	"\n\t\t\tplodina = node link ifFalse: [" +
	"\n\t\t\t\tplodina := node link." +
	"\n\t\t\t\tself refreshContent]." +
	"\n\t\t]" +
	"\n\t]",
	null, "2014-03-16T23:06:13Z", "mp", 2);

jst.FYTextKapPlodinyPanel.addMethod("update:with:", "anAspect node", "updating", 
	"\tanAspect = #kapitola ifTrue: [" +
	"\n\t\tnode id = id ifTrue: [" +
	"\n\t\t\t\"vsechny plodiny\"" +
	"\n\t\t\tplodina ifNotNil: [" +
	"\n\t\t\t\tplodina := nil." +
	"\n\t\t\t\tself refreshContent]" +
	"\n\t\t] ifFalse: [" +
	"\n\t\t\t\"vybrana plodina\"" +
	"\n\t\t\tplodina = node link ifFalse: [" +
	"\n\t\t\t\tplodina := node link." +
	"\n\t\t\t\tself refreshContent]." +
	"\n\t\t]" +
	"\n\t]." +
	"\n\tanAspect = #zmenaVyberuKapitol ifTrue: [" +
	"\n\t\tself refreshContent]",
	null, "2014-03-18T16:00:17Z", "mp"); //fytoportal-ior

// *** FYTextKapSOPanel ***

jst.FYTextKapSOPanel.addMethod("jeKapitolaSO", "", "testing", 
	"\t^ true",
	null, "2013-10-08T20:48:17Z", "mp");

jst.FYTextKapSOPanel.addMethod("renderTaxonyOn:", "html", "rendering", 
	"\t| vyberPlod |" +
	"\n\tvyberPlod := (Fytoportal data vyberKapitolPM at: self kapitola metodika id) at: #plodiny ifAbsent: nil." +
	"\n\tvyberPlod value ifFalse: [html div class: 'ior-vybrane-plodiny'; with: [" +
	"\n\t\t\"vybrane plodiny\"" +
	"\n\t\thtml span class: 'label'; with: 'Pouze pro vybrané plodiny: '." +
	"\n\t\t((self kapitola metodika plodiny obsah select: [:pl | (vyberPlod at: pl linkId ifAbsent: [false]) value]) " +
	"\n\t\t\tasSortedCollection: [:a :b | a nazev < b nazev]) do: [:pl |" +
	"\n\t\t\t\thtml text: pl nazev" +
	"\n\t\t\t] separatedBy: [" +
	"\n\t\t\t\thtml text: ', ']" +
	"\n\t]]." +
	"\n\tsuper renderTaxonyOn: html",
	null, "2013-11-21T08:53:58Z", "mp", 1);

jst.FYTextKapSOPanel.addMethod("renderTaxonyOn:", "html", "rendering", 
	"\tself kapitola metodika plodiny obsah size > 1 ifTrue: [" +
	"\n\t\t| vyberPlod |" +
	"\n\t\tvyberPlod := (Fytoportal data vyberKapitolPM at: self kapitola metodika id) at: #plodiny ifAbsent: nil." +
	"\n\t\tvyberPlod value ifFalse: [html div class: 'ior-vybrane-plodiny'; with: [" +
	"\n\t\t\t\"vybrane plodiny\"" +
	"\n\t\t\thtml span class: 'label'; with: 'Pouze pro vybrané plodiny: '." +
	"\n\t\t\t((self kapitola metodika plodiny obsah select: [:pl | (vyberPlod at: pl linkId ifAbsent: [false]) value]) " +
	"\n\t\t\t\tasSortedCollection: [:a :b | a nazev < b nazev]) do: [:pl |" +
	"\n\t\t\t\t\thtml text: pl nazev" +
	"\n\t\t\t\t] separatedBy: [" +
	"\n\t\t\t\t\thtml text: ', ']" +
	"\n\t\t]]" +
	"\n\t]." +
	"\n\tsuper renderTaxonyOn: html",
	null, "2013-12-07T17:39:16Z", "mp"); //fytoportal-ior

/* nahrazeno nasledujici metodou renderContentOn
jst.FYTextKapSOPanel.addMethod("refreshContent", "", "rendering", 
	"\tskocinId ifNil: [" +
	"\n\t\t\"obrazky skudcu, chorob, abionoz\"" +
	"\n\t\tkapitola1 resetujTaxony." +
	"\n\t\tself htmlContents: [:html | " +
	"\n\t\t\tself renderTaxonyOn: html]" +
	"\n\t] ifNotNil: [" +
	"\n\t\t\"vybrany skudce, choroba, abionoza\"" +
	"\n\t\tsuper refreshContent]",
	null, "2013-10-08T21:32:24Z", "mp");
*/

jst.FYTextKapSOPanel.addMethod("renderContentOn:", "html", "rendering", 
	"\tskocinId ifNil: [" +
	"\n\t\t\"obrazky skudcu, chorob, abionoz\"" +
	"\n\t\tself renderTaxonyOn: html" +
	"\n\t] ifNotNil: [" +
	"\n\t\t\"vybrany skudce, choroba, abionoza\"" +
	"\n\t\tsuper renderContentOn: html]",
	null, "2013-12-17T14:46:55Z", "mp"); //fytoportal-ior

jst.FYTextKapSOPanel.addMethod("activateEvent", "", "events", 
	"\t^ [(skocinId isNil and: [kapitola1 notNil] and: [kapitola1 taxonyNacteny not]) ifTrue: [" +
	"\n\t\tself refreshContent]]",
	null, "2013-10-08T22:04:16Z", "mp", 1);

jst.FYTextKapSOPanel.addMethod("activateEvent", "", "events", 
	"\t^ [(skocinId isNil and: [kapitola1 notNil] and: [" +
	"\n\t\tkapitola1 taxonyNacteny not | kapitola1 fotkyNacteny not]) ifTrue: [" +
	"\n\t\tself refreshContent]]",
	null, "2013-12-17T22:51:56Z", "mp", 2);

jst.FYTextKapSOPanel.addMethod("activateEvent", "", "events", 
	"\t^ [(skocinId isNil and: [kapitola1 notNil] and: [" +
	"\n\t\tprekresli | kapitola1 taxonyNacteny not | kapitola1 fotkyNacteny not]) ifTrue: [" +
	"\n\t\tprekresli := false." +
	"\n\t\tself refreshContent]]",
	null, "2014-03-13T14:47:04Z", "mp", 3);

jst.FYTextKapSOPanel.addMethod("activateEvent", "", "events", 
	"\t^ [(prekresli or: [kapitola1 notNil " +
	"\n\t\tand: [kapitola1 taxonyNacteny not | kapitola1 fotkyNacteny not]]) ifTrue: [" +
	"\n\t\tprekresli := false." +
	"\n\t\tself refreshContent]]",
	null, "2014-03-18T15:37:39Z", "mp", 4);

jst.FYTextKapSOPanel.addMethod("activateEvent", "", "events", 
	"\t^ [ | url |" +
	"\n\t\turl := 'jst.ExtComponentMgr.default().getById_(\"{1}\").zobrazSeznam()' format: { self id}." +
	"\n\t\tself title: (DocumentFragment htmlContents: [:html |" +
	"\n\t\t\thtml bold class: 'seznamSO'; attributeAt: 'onclick' put: url; with: title]) printHtml." +
	"\n\t\t(prekresli or: [kapitola1 notNil " +
	"\n\t\t\tand: [kapitola1 taxonyNacteny not | kapitola1 fotkyNacteny not]]) ifTrue: [" +
	"\n\t\t\tprekresli := false." +
	"\n\t\t\tself refreshContent]]",
	null, "2014-05-21T15:04:20Z", "mp"); //fytoportal-ior

jst.FYTextKapSOPanel.addMethod("deactivateEvent", "", "events", 
	"\t^ [self title: title]",
	null, "2014-05-21T15:00:13Z", "mp");

jst.FYTextKapSOPanel.addMethod("zobrazSeznam", "", "private", 
	"\tFytoportal ior kapitolaPanel selectNode: Fytoportal ior kapitolaPanel root children first",
	null, "2014-05-21T20:10:07Z", "mp");

jst.FYTextKapSOPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\t(anAspect = #kapitola and: [anObject id = #tisk]) ifTrue: [" +
	"\n\t\tskocinId := anObject id." +
	"\n\t\tview contents: ''." +
	"\n\t\t\"zobrazim obrazky skudcu\"" +
	"\n\t\t^ self]." +
	"\n\tanAspect = #kapitola ifTrue: [ | id |" +
	"\n\t\tid := anObject id copyUpTo: #'@'." +
	"\n\t\tskocinId := id." +
	"\n\t\tsuper nactiKapitolu: (kapitola1 obsah asCollection detect: [:kap | kap id = id]) link." +
	"\n\t\t\"zoom na podkapitolu...\"" +
	"\n\t]",
	null, "2013-01-31T15:15:53Z", "mp", 1);

jst.FYTextKapSOPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\t(anAspect = #kapitola and: [anObject id = #tisk]) ifTrue: [" +
	"\n\t\tskocinId := anObject id." +
	"\n\t\tself contents: ''." +
	"\n\t\t\"zobrazim obrazky skudcu\"" +
	"\n\t\t^ self]." +
	"\n\tanAspect = #kapitola ifTrue: [ | id |" +
	"\n\t\tid := anObject id copyUpTo: #'@'." +
	"\n\t\tskocinId := id." +
	"\n\t\tsuper nactiKapitolu: (kapitola1 obsah asCollection detect: [:kap | kap id = id]) link." +
	"\n\t\t\"zoom na podkapitolu...\"" +
	"\n\t]",
	null, "2013-02-04T22:06:35Z", "mp", 1);

jst.FYTextKapSOPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\t(anAspect = #kapitola and: [anObject id = #tisk]) ifTrue: [" +
	"\n\t\tskocinId := anObject id." +
	"\n\t\tself contents: ''." +
	"\n\t\t\"zobrazim obrazky skudcu\"" +
	"\n\t\t^ self]." +
	"\n\tanAspect = #kapitola ifTrue: [ | id |" +
	"\n\t\tid := anObject id copyUpTo: #'@'." +
	"\n\t\tskocinId = id ifFalse: [" +
	"\n\t\t\tskocinId := id." +
	"\n\t\t\tsuper nactiKapitolu: (kapitola1 obsah asCollection detect: [:kap | kap id = id]) link]." +
	"\n\t\t\"zoom na podkapitolu... - jak to ale udelat? Nasledujici pokus nefunguje\"" +
	"\n\t\t\"Browser location asJsObject perform: 'assign' with: '#', anObject link id\"" +
	"\n\t]",
	null, "2013-04-23T09:40:24Z", "mp", 1);

jst.FYTextKapSOPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\t(anAspect = #kapitola and: [anObject id = #tisk]) ifTrue: [" +
	"\n\t\tskocinId := anObject id." +
	"\n\t\tself contents: 'Zde budou obrázky a popis ŠO...'." +
	"\n\t\t^ self]." +
	"\n\tanAspect = #kapitola ifTrue: [ | id |" +
	"\n\t\tid := anObject id copyUpTo: #'@'." +
	"\n\t\tskocinId = id ifFalse: [" +
	"\n\t\t\tskocinId := id." +
	"\n\t\t\tkapitola := (kapitola1 obsah asCollection detect: [:kap | kap id = id]) link." +
	"\n\t\t\tself refreshContent]." +
	"\n\t\t\"zoom na podkapitolu... - jak to ale udelat? Nasledujici pokus nefunguje\"" +
	"\n\t\t\"Browser location asJsObject perform: 'assign' with: '#', anObject link id\"" +
	"\n\t]",
	null, "2013-04-24T19:14:26Z", "mp", 1);

jst.FYTextKapSOPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\t(anAspect = #kapitola and: [anObject id = #tisk]) ifTrue: [" +
	"\n\t\tskocinId := anObject id." +
	"\n\t\tself contents: 'Zde budou obrázky a popis ŠO...'." +
	"\n\t\t^ self]." +
	"\n\tanAspect = #kapitola ifTrue: [ | id |" +
	"\n\t\tid := anObject id copyUpTo: #'@'." +
	"\n\t\tskocinId ~= id | kapitola isNil ifTrue: [" +
	"\n\t\t\tskocinId := id." +
	"\n\t\t\tkapitola := (kapitola1 obsah asCollection detect: [:kap | kap id = id]) link." +
	"\n\t\t\tself refreshContent]." +
	"\n\t\t\"zoom na podkapitolu... - jak to ale udelat? Nasledujici pokus nefunguje\"" +
	"\n\t\t\"Browser location asJsObject perform: 'assign' with: '#', anObject link id\"" +
	"\n\t]",
	null, "2013-04-27T09:35:29Z", "mp", 1);

jst.FYTextKapSOPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\t(anAspect = #kapitola and: [anObject id = #tisk]) ifTrue: [" +
	"\n\t\tskocinId := anObject id." +
	"\n\t\tself contents: 'Zde budou obrázky a popis ŠO...'." +
	"\n\t\t^ self]." +
	"\n\tanAspect = #kapitola ifTrue: [ | id |" +
	"\n\t\tid := anObject id copyUpTo: #'@'." +
	"\n\t\tskocinId ~= id | kapitola isNil ifTrue: [" +
	"\n\t\t\tskocinId := id." +
	"\n\t\t\tkapitola := (kapitola1 obsah asCollection detect: [:kap | kap id = id]) link." +
	"\n\t\t\tsemaforData := nil." +
	"\n\t\t\tself refreshContent]." +
	"\n\t\t\"zoom na podkapitolu... - jak to ale udelat? Nasledujici pokus nefunguje\"" +
	"\n\t\t\"Browser location asJsObject perform: 'assign' with: '#', anObject link id\"" +
	"\n\t]",
	null, "2013-04-29T08:44:57Z", "mp", 1);

jst.FYTextKapSOPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\t(anAspect = #kapitola and: [anObject id = #tisk]) ifTrue: [" +
	"\n\t\tskocinId := anObject id." +
	"\n\t\tself contents: 'Zde budou obrázky a popis ŠO...'." +
	"\n\t\t^ self]." +
	"\n\tanAspect = #kapitola ifTrue: [ | id |" +
	"\n\t\tid := anObject id copyUpTo: #'@'." +
	"\n\t\tskocinId ~= id | kapitola isNil | prekresliSemafor ifTrue: [" +
	"\n\t\t\tskocinId := id." +
	"\n\t\t\tkapitola := (kapitola1 obsah asCollection detect: [:kap | kap id = id]) link." +
	"\n\t\t\tsemaforData := nil." +
	"\n\t\t\tprekresliSemafor := false." +
	"\n\t\t\tself refreshContent]." +
	"\n\t\t\"zoom na podkapitolu... - jak to ale udelat? Nasledujici pokus nefunguje\"" +
	"\n\t\t\"Browser location asJsObject perform: 'assign' with: '#', anObject link id\"" +
	"\n\t]",
	null, "2013-04-30T07:01:30Z", "mp", 1);

jst.FYTextKapSOPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\t(anAspect = #kapitola and: [anObject id = #tisk]) ifTrue: [" +
	"\n\t\tskocinId := anObject id." +
	"\n\t\tself contents: 'Zde budou obrázky a popis ŠO...'." +
	"\n\t\t^ self]." +
	"\n\tanAspect = #kapitola ifTrue: [ | id |" +
	"\n\t\tid := anObject id copyUpTo: #'@'." +
	"\n\t\tskocinId ~= id | kapitola isNil | (kapitola = prekresli) ifTrue: [" +
	"\n\t\t\tskocinId := id." +
	"\n\t\t\tkapitola := (kapitola1 obsah asCollection detect: [:kap | kap id = id]) link." +
	"\n\t\t\tsemaforData := nil." +
	"\n\t\t\tprekresli := nil." +
	"\n\t\t\tself refreshContent]." +
	"\n\t\t\"zoom na podkapitolu... - jak to ale udelat? Nasledujici pokus nefunguje\"" +
	"\n\t\t\"Browser location asJsObject perform: 'assign' with: '#', anObject link id\"" +
	"\n\t]",
	null, "2013-04-30T19:47:02Z", "mp", 1);

jst.FYTextKapSOPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\t(anAspect = #kapitola and: [anObject id = #tisk]) ifTrue: [" +
	"\n\t\tskocinId := anObject id." +
	"\n\t\tmetodikaSO := nil." +
	"\n\t\tself contents: 'Zde budou obrázky a popis ŠO...'." +
	"\n\t\t^ self]." +
	"\n\tanAspect = #kapitola ifTrue: [ | id |" +
	"\n\t\tid := anObject id copyUpTo: #'@'." +
	"\n\t\tskocinId ~= id | kapitola isNil | (kapitola = prekresli) ifTrue: [" +
	"\n\t\t\tskocinId := id." +
	"\n\t\t\tkapitola := kapitola1 obsah asCollection detect: [:kap | kap id = id]." +
	"\n\t\t\tmetodikaSO := kapitola link." +
	"\n\t\t\tsemaforData := nil." +
	"\n\t\t\tprekresli := nil." +
	"\n\t\t\tself refreshContent]." +
	"\n\t\t\"zoom na podkapitolu... - jak to ale udelat? Nasledujici pokus nefunguje\"" +
	"\n\t\t\"Browser location asJsObject perform: 'assign' with: '#', anObject link id\"" +
	"\n\t]",
	null, "2013-05-03T09:49:58Z", "mp", 1);

jst.FYTextKapSOPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\t(anAspect = #kapitola and: [anObject id = #tisk]) ifTrue: [" +
	"\n\t\tskocinId := anObject id." +
	"\n\t\tmetodikaSO := nil." +
	"\n\t\tself htmlContents: [:html | " +
	"\n\t\t\tself renderTaxonyOn: html]." +
	"\n\t\t^ self]." +
	"\n\tanAspect = #kapitola ifTrue: [ | id |" +
	"\n\t\tid := anObject id copyUpTo: #'@'." +
	"\n\t\tskocinId ~= id | kapitola isNil | (kapitola = prekresli) ifTrue: [" +
	"\n\t\t\tskocinId := id." +
	"\n\t\t\tkapitola := kapitola1 obsah asCollection detect: [:kap | kap id = id]." +
	"\n\t\t\tmetodikaSO := kapitola link." +
	"\n\t\t\tsemaforData := nil." +
	"\n\t\t\tprekresli := nil." +
	"\n\t\t\tself refreshContent]." +
	"\n\t\t\"zoom na podkapitolu... - jak to ale udelat? Nasledujici pokus nefunguje\"" +
	"\n\t\t\"Browser location asJsObject perform: 'assign' with: '#', anObject link id\"" +
	"\n\t]",
	null, "2013-05-20T08:31:01Z", "mp", 1);

jst.FYTextKapSOPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #kapitola ifTrue: [" +
	"\n\t\t(anObject id startsWith: id) ifTrue: [" +
	"\n\t\t\t\"vsichni skudci, choroby, abionozy\"" +
	"\n\t\t\tskocinId ifNotNil: [" +
	"\n\t\t\t\tskocinId := nil." +
	"\n\t\t\t\tmetodikaSO := nil." +
	"\n\t\t\t\tself htmlContents: [:html | " +
	"\n\t\t\t\t\tself renderTaxonyOn: html]]" +
	"\n\t\t] ifFalse: [ | soId |" +
	"\n\t\t\t\"vybrany skudce, choroba, abionoza\"" +
	"\n\t\t\tsoId := anObject id copyUpTo: #'@'." +
	"\n\t\t\tskocinId ~= soId | kapitola isNil | (kapitola = prekresli) ifTrue: [" +
	"\n\t\t\t\tskocinId := soId." +
	"\n\t\t\t\tkapitola := kapitola1 obsah asCollection detect: [:kap | kap id = soId]." +
	"\n\t\t\t\tmetodikaSO := kapitola link." +
	"\n\t\t\t\tsemaforData := nil." +
	"\n\t\t\t\tprekresli := nil." +
	"\n\t\t\t\tself refreshContent]." +
	"\n\t\t\t\"zoom na podkapitolu... - jak to ale udelat? Nasledujici pokus nefunguje\"" +
	"\n\t\t\t\"Browser location asJsObject perform: 'assign' with: '#', anObject link id\"" +
	"\n\t\t]" +
	"\n\t]",
	null, "2013-05-30T08:48:56Z", "mp", 1);

jst.FYTextKapSOPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #kapitola ifTrue: [" +
	"\n\t\t(anObject id startsWith: id) ifTrue: [" +
	"\n\t\t\t\"vsichni skudci, choroby, abionozy\"" +
	"\n\t\t\tskocinId ifNotNil: [" +
	"\n\t\t\t\tskocinId := nil." +
	"\n\t\t\t\tmetodikaSO := nil." +
	"\n\t\t\t\tself htmlContents: [:html | " +
	"\n\t\t\t\t\tself renderTaxonyOn: html]]" +
	"\n\t\t] ifFalse: [ | soId |" +
	"\n\t\t\t\"vybrany skudce, choroba, abionoza\"" +
	"\n\t\t\tsoId := anObject id copyUpTo: #'@'." +
	"\n\t\t\tskocinId ~= soId | kapitola isNil | (kapitola = prekresli) ifTrue: [" +
	"\n\t\t\t\tskocinId := soId." +
	"\n\t\t\t\tkapitola := kapitola1 obsah asCollection detect: [:kap | kap id = soId]." +
	"\n\t\t\t\tmetodikaSO := kapitola link." +
	"\n\t\t\t\tsemaforData := nil." +
	"\n\t\t\t\tprekresli := nil." +
	"\n\t\t\t\tself refreshContent]." +
	"\n\t\t\t\"zoom na podkapitolu... - jak to ale udelat? Nasledujici pokus nefunguje\"" +
	"\n\t\t\t\"Browser location asJsObject perform: 'assign' with: '#', anObject link id\"" +
	"\n\t\t\t\"taky nefunguje: (ExtElement on: anObject link id) scrollIntoView: self element hscroll: true\"" +
	"\n\t\t]" +
	"\n\t]",
	null, "2013-06-23T18:56:43Z", "mp", 1);

jst.FYTextKapSOPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #kapitola ifTrue: [" +
	"\n\t\t(anObject id startsWith: id) ifTrue: [" +
	"\n\t\t\t\"vsichni skudci, choroby, abionozy\"" +
	"\n\t\t\tskocinId ifNotNil: [" +
	"\n\t\t\t\tskocinId := nil." +
	"\n\t\t\t\tmetodikaSO := nil." +
	"\n\t\t\t\tself htmlContents: [:html | " +
	"\n\t\t\t\t\tself renderTaxonyOn: html]]" +
	"\n\t\t] ifFalse: [ | soId |" +
	"\n\t\t\t\"vybrany skudce, choroba, abionoza\"" +
	"\n\t\t\tsoId := anObject id copyUpTo: #'@'." +
	"\n\t\t\tskocinId ~= soId | kapitola isNil | (kapitola = prekresli) ifTrue: [" +
	"\n\t\t\t\tskocinId := soId." +
	"\n\t\t\t\tkapitola := kapitola1 obsah asCollection detect: [:kap | kap id = soId]." +
	"\n\t\t\t\tmetodikaSO := kapitola link." +
	"\n\t\t\t\tsemaforData := nil." +
	"\n\t\t\t\tprekresli := nil." +
	"\n\t\t\t\tself refreshContent]." +
	"\n\t\t\t\"zoom na podkapitolu... - jak to ale udelat? Nasledujici pokus nefunguje\"" +
	"\n\t\t\t\"Browser location asJsObject perform: 'assign' with: '#', anObject link id\"" +
	"\n\t\t\t\"taky nefunguje: (ExtElement on: anObject link id) scrollIntoView: self element hscroll: true\"" +
	"\n\t\t]" +
	"\n\t]." +
	"\n\tanAspect = #zmenaVyberuKapitol & skocinId isNil ifTrue: [" +
	"\n\t\t\"vsichni skudci, choroby, abionozy\"" +
	"\n\t\tkapitola1 resetujTaxony." +
	"\n\t\tself htmlContents: [:html | " +
	"\n\t\t\tself renderTaxonyOn: html]]." +
	"\n\t(anAspect = #zmenaVyberuKapitol & skocinId notNil and: [anObject startsWith: skocinId]) ifTrue: [" +
	"\n\t\t\"vybrany skudce, choroba, abionoza\"" +
	"\n\t\tself inform: anObject]",
	null, "2013-09-27T10:04:54Z", "mp", 1);

jst.FYTextKapSOPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #kapitola ifTrue: [" +
	"\n\t\t(anObject id startsWith: id) ifTrue: [" +
	"\n\t\t\t\"vsichni skudci, choroby, abionozy\"" +
	"\n\t\t\tskocinId ifNotNil: [" +
	"\n\t\t\t\tskocinId := nil." +
	"\n\t\t\t\tmetodikaSO := nil." +
	"\n\t\t\t\tself htmlContents: [:html | " +
	"\n\t\t\t\t\tself renderTaxonyOn: html]]" +
	"\n\t\t] ifFalse: [ | soId |" +
	"\n\t\t\t\"vybrany skudce, choroba, abionoza\"" +
	"\n\t\t\tsoId := anObject id copyUpTo: #'@'." +
	"\n\t\t\tskocinId ~= soId | kapitola isNil | (kapitola = prekresli) ifTrue: [" +
	"\n\t\t\t\tskocinId := soId." +
	"\n\t\t\t\tkapitola := kapitola1 obsah asCollection detect: [:kap | kap id = soId]." +
	"\n\t\t\t\tmetodikaSO := kapitola link." +
	"\n\t\t\t\tsemaforData := nil." +
	"\n\t\t\t\tprekresli := nil." +
	"\n\t\t\t\tself refreshContent]." +
	"\n\t\t\t\"zoom na podkapitolu... - jak to ale udelat? Nasledujici pokus nefunguje\"" +
	"\n\t\t\t\"Browser location asJsObject perform: 'assign' with: '#', anObject link id\"" +
	"\n\t\t\t\"taky nefunguje: (ExtElement on: anObject link id) scrollIntoView: self element hscroll: true\"" +
	"\n\t\t]" +
	"\n\t]." +
	"\n\tanAspect = #zmenaVyberuKapitol ifTrue: [" +
	"\n\t\t(skocinId isNil and: [(anObject endsWith: #vse) not]) ifTrue: [" +
	"\n\t\t\t\"obrazky skudcu, chorob, abionoz\"" +
	"\n\t\t\tkapitola1 resetujTaxony." +
	"\n\t\t\tself htmlContents: [:html | " +
	"\n\t\t\t\tself renderTaxonyOn: html]" +
	"\n\t\t] ifFalse: [skocinId ifNotNil: [" +
	"\n\t\t\t\"vybrany skudce, choroba, abionoza\"" +
	"\n\t\t\tself refreshContent]]" +
	"\n\t]",
	null, "2013-09-27T22:37:34Z", "mp", 1);

jst.FYTextKapSOPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #kapitola ifTrue: [" +
	"\n\t\t(anObject id startsWith: id) ifTrue: [" +
	"\n\t\t\t\"vsichni skudci, choroby, abionozy\"" +
	"\n\t\t\tskocinId ifNotNil: [" +
	"\n\t\t\t\tskocinId := nil." +
	"\n\t\t\t\tmetodikaSO := nil." +
	"\n\t\t\t\tself htmlContents: [:html | " +
	"\n\t\t\t\t\tself renderTaxonyOn: html]]" +
	"\n\t\t] ifFalse: [ | soId |" +
	"\n\t\t\t\"vybrany skudce, choroba, abionoza\"" +
	"\n\t\t\tsoId := anObject id copyUpTo: #'@'." +
	"\n\t\t\tskocinId ~= soId | kapitola isNil | (kapitola = prekresli) ifTrue: [" +
	"\n\t\t\t\tskocinId := soId." +
	"\n\t\t\t\tkapitola := kapitola1 obsah asCollection detect: [:kap | kap id = soId]." +
	"\n\t\t\t\tmetodikaSO := kapitola link." +
	"\n\t\t\t\tsemaforData := nil." +
	"\n\t\t\t\tprekresli := nil." +
	"\n\t\t\t\tself refreshContent]." +
	"\n\t\t\t\"zoom na podkapitolu... - jak to ale udelat? Nasledujici pokus nefunguje\"" +
	"\n\t\t\t\"Browser location asJsObject perform: 'assign' with: '#', anObject link id\"" +
	"\n\t\t\t\"taky nefunguje: (ExtElement on: anObject link id) scrollIntoView: self element hscroll: true\"" +
	"\n\t\t]" +
	"\n\t]." +
	"\n\tanAspect = #zmenaVyberuKapitol ifTrue: [" +
	"\n\t\tanObject = #plodiny ifTrue: [" +
	"\n\t\t\t(skocinId isNil and: [self isActive]) " +
	"\n\t\t\t\tifTrue: [self refreshContent] " +
	"\n\t\t\t\tifFalse: [kapitola1 ifNotNil: [" +
	"\n\t\t\t\t\tkapitola1 resetujTaxony]]" +
	"\n\t\t] ifFalse: [" +
	"\n\t\t\tself refreshContent]" +
	"\n\t]",
	null, "2013-10-08T22:03:06Z", "mp", 1);

jst.FYTextKapSOPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #kapitola ifTrue: [" +
	"\n\t\t(anObject id startsWith: id) ifTrue: [" +
	"\n\t\t\t\"vsichni skudci, choroby, abionozy\"" +
	"\n\t\t\tskocinId ifNotNil: [" +
	"\n\t\t\t\tskocinId := nil." +
	"\n\t\t\t\tmetodikaSO := nil." +
	"\n\t\t\t\tself htmlContents: [:html | " +
	"\n\t\t\t\t\tself renderTaxonyOn: html]]" +
	"\n\t\t] ifFalse: [ | soId |" +
	"\n\t\t\t\"vybrany skudce, choroba, abionoza\"" +
	"\n\t\t\tsoId := anObject id copyUpTo: #'@'." +
	"\n\t\t\tskocinId ~= soId | kapitola isNil | (kapitola = prekresli) ifTrue: [" +
	"\n\t\t\t\tskocinId := soId." +
	"\n\t\t\t\tkapitola := kapitola1 najdiKapitoluSO: soId." +
	"\n\t\t\t\tmetodikaSO := kapitola link." +
	"\n\t\t\t\tsemaforData := nil." +
	"\n\t\t\t\tprekresli := nil." +
	"\n\t\t\t\tself refreshContent]." +
	"\n\t\t\t\"zoom na podkapitolu... - jak to ale udelat? Nasledujici pokus nefunguje\"" +
	"\n\t\t\t\"Browser location asJsObject perform: 'assign' with: '#', anObject link id\"" +
	"\n\t\t\t\"taky nefunguje: (ExtElement on: anObject link id) scrollIntoView: self element hscroll: true\"" +
	"\n\t\t]" +
	"\n\t]." +
	"\n\tanAspect = #zmenaVyberuKapitol ifTrue: [" +
	"\n\t\tanObject = #plodiny ifTrue: [" +
	"\n\t\t\t(skocinId isNil and: [self isActive]) " +
	"\n\t\t\t\tifTrue: [self refreshContent] " +
	"\n\t\t\t\tifFalse: [kapitola1 ifNotNil: [" +
	"\n\t\t\t\t\tkapitola1 resetujTaxony]]" +
	"\n\t\t] ifFalse: [" +
	"\n\t\t\tself refreshContent]" +
	"\n\t]",
	null, "2013-12-09T08:09:09Z", "mp", 1);

jst.FYTextKapSOPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #kapitola ifTrue: [" +
	"\n\t\t(anObject id startsWith: id) ifTrue: [" +
	"\n\t\t\t\"vsichni skudci, choroby, abionozy\"" +
	"\n\t\t\tskocinId ifNotNil: [" +
	"\n\t\t\t\tskocinId := nil." +
	"\n\t\t\t\tmetodikaSO := nil." +
	"\n\t\t\t\tself refreshContent]" +
	"\n\t\t] ifFalse: [ | soId |" +
	"\n\t\t\t\"vybrany skudce, choroba, abionoza\"" +
	"\n\t\t\tsoId := anObject id copyUpTo: #'@'." +
	"\n\t\t\tskocinId ~= soId | kapitola isNil | (kapitola = prekresli) ifTrue: [" +
	"\n\t\t\t\tskocinId := soId." +
	"\n\t\t\t\tkapitola := kapitola1 najdiKapitoluSO: soId." +
	"\n\t\t\t\tmetodikaSO := kapitola link." +
	"\n\t\t\t\tsemaforData := nil." +
	"\n\t\t\t\tprekresli := nil." +
	"\n\t\t\t\tself refreshContent]." +
	"\n\t\t\t\"zoom na podkapitolu... - jak to ale udelat? Nasledujici pokus nefunguje\"" +
	"\n\t\t\t\"Browser location asJsObject perform: 'assign' with: '#', anObject link id\"" +
	"\n\t\t\t\"taky nefunguje: (ExtElement on: anObject link id) scrollIntoView: self element hscroll: true\"" +
	"\n\t\t]" +
	"\n\t]." +
	"\n\tanAspect = #zmenaVyberuKapitol ifTrue: [" +
	"\n\t\tanObject = #plodiny ifTrue: [" +
	"\n\t\t\t\"seznam abionoz, chorob nebo skudcu vyfiltrovany podle oznacenych plodin\"" +
	"\n\t\t\tkapitola1 ifNotNil: [" +
	"\n\t\t\t\tkapitola1 resetujTaxony]." +
	"\n\t\t\t(skocinId isNil and: [self isActive]) ifTrue: [" +
	"\n\t\t\t\tself refreshContent]" +
	"\n\t\t] ifFalse: [" +
	"\n\t\t\t\"kapitoly metodiky vybraneho SO\"" +
	"\n\t\t\tself refreshContent]" +
	"\n\t]",
	null, "2013-12-17T22:45:20Z", "mp", 1);

jst.FYTextKapSOPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #kapitola ifTrue: [" +
	"\n\t\t(anObject id startsWith: id) ifTrue: [" +
	"\n\t\t\t\"vsichni skudci, choroby, abionozy\"" +
	"\n\t\t\tskocinId ifNotNil: [" +
	"\n\t\t\t\tskocinId := nil." +
	"\n\t\t\t\tmetodikaSO := nil." +
	"\n\t\t\t\tself refreshContent]" +
	"\n\t\t] ifFalse: [ | soId |" +
	"\n\t\t\t\"vybrany skudce, choroba, abionoza\"" +
	"\n\t\t\tsoId := anObject id copyUpTo: #'@'." +
	"\n\t\t\tskocinId ~= soId | kapitola isNil ifTrue: [" +
	"\n\t\t\t\tskocinId := soId." +
	"\n\t\t\t\tkapitola := kapitola1 najdiKapitoluSO: soId." +
	"\n\t\t\t\tmetodikaSO := kapitola link." +
	"\n\t\t\t\tsemaforData := nil." +
	"\n\t\t\t\tself refreshContent]." +
	"\n\t\t\t\"zoom na podkapitolu... - jak to ale udelat? Nasledujici pokus nefunguje\"" +
	"\n\t\t\t\"Browser location asJsObject perform: 'assign' with: '#', anObject link id\"" +
	"\n\t\t\t\"taky nefunguje: (ExtElement on: anObject link id) scrollIntoView: self element hscroll: true\"" +
	"\n\t\t]" +
	"\n\t]." +
	"\n\tanAspect = #zmenaVyberuKapitol ifTrue: [" +
	"\n\t\tanObject = #plodiny ifTrue: [" +
	"\n\t\t\t\"seznam abionoz, chorob nebo skudcu vyfiltrovany podle oznacenych plodin\"" +
	"\n\t\t\tkapitola1 ifNotNil: [" +
	"\n\t\t\t\tkapitola1 resetujTaxony]." +
	"\n\t\t\t(skocinId isNil and: [self isActive]) ifTrue: [" +
	"\n\t\t\t\tself refreshContent]" +
	"\n\t\t] ifFalse: [" +
	"\n\t\t\t\"kapitoly metodiky vybraneho SO\"" +
	"\n\t\t\tself refreshContent]" +
	"\n\t]",
	null, "2013-12-18T20:28:22Z", "mp", 1);

jst.FYTextKapSOPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #kapitola ifTrue: [" +
	"\n\t\t(anObject id startsWith: id) ifTrue: [" +
	"\n\t\t\t\"vsichni skudci, choroby, abionozy\"" +
	"\n\t\t\tskocinId ifNotNil: [" +
	"\n\t\t\t\tskocinId := nil." +
	"\n\t\t\t\tmetodikaSO := nil." +
	"\n\t\t\t\tself refreshContent]" +
	"\n\t\t] ifFalse: [ | soId |" +
	"\n\t\t\t\"vybrany skudce, choroba, abionoza\"" +
	"\n\t\t\tsoId := anObject id copyUpTo: #'@'." +
	"\n\t\t\tskocinId ~= soId | kapitola isNil ifTrue: [" +
	"\n\t\t\t\tskocinId := soId." +
	"\n\t\t\t\tkapitola := kapitola1 najdiKapitoluSO: soId." +
	"\n\t\t\t\tmetodikaSO := kapitola link." +
	"\n\t\t\t\tsemaforData := nil." +
	"\n\t\t\t\tself refreshContent]." +
	"\n\t\t\t\"zoom na podkapitolu... - jak to ale udelat? Nasledujici pokus nefunguje\"" +
	"\n\t\t\t\"Browser location asJsObject perform: 'assign' with: '#', anObject link id\"" +
	"\n\t\t\t\"taky nefunguje: (ExtElement on: anObject link id) scrollIntoView: self element hscroll: true\"" +
	"\n\t\t]" +
	"\n\t]." +
	"\n\tanAspect = #zmenaVyberuKapitol ifTrue: [" +
	"\n\t\tanObject = #plodiny ifTrue: [" +
	"\n\t\t\t\"filtrovani podle oznacenych plodin\"" +
	"\n\t\t\tkapitola1 ifNotNil: [" +
	"\n\t\t\t\t\"seznam abionoz, chorob nebo skudcu\"" +
	"\n\t\t\t\tkapitola1 resetujTaxony]." +
	"\n\t\t\t\"pro refresh vybraneho SO by melo stacit - pri aktivaci zalozky se vzdy vola #update:with:\"" +
	"\n\t\t\tkapitola := nil" +
	"\n\t\t] ifFalse: [" +
	"\n\t\t\t\"kapitoly metodiky vybraneho SO\"" +
	"\n\t\t\tself refreshContent]" +
	"\n\t]",
	null, "2014-01-12T13:58:45Z", "mp", 1);

jst.FYTextKapSOPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #kapitola ifTrue: [" +
	"\n\t\t(anObject id startsWith: id) ifTrue: [" +
	"\n\t\t\t\"vsichni skudci, choroby, abionozy\"" +
	"\n\t\t\tskocinId ifNotNil: [" +
	"\n\t\t\t\tskocinId := nil." +
	"\n\t\t\t\tkapitola := nil." +
	"\n\t\t\t\tmetodikaSO := nil." +
	"\n\t\t\t\tself refreshContent]" +
	"\n\t\t] ifFalse: [ | soId |" +
	"\n\t\t\t\"vybrany skudce, choroba, abionoza\"" +
	"\n\t\t\tsoId := anObject id copyUpTo: #'@'." +
	"\n\t\t\tskocinId ~= soId | kapitola isNil ifTrue: [" +
	"\n\t\t\t\tskocinId := soId." +
	"\n\t\t\t\tkapitola := kapitola1 najdiKapitoluSO: soId." +
	"\n\t\t\t\tmetodikaSO := kapitola link." +
	"\n\t\t\t\tsemaforData := nil." +
	"\n\t\t\t\tself refreshContent]." +
	"\n\t\t\t\"zoom na podkapitolu... - jak to ale udelat? Nasledujici pokus nefunguje\"" +
	"\n\t\t\t\"Browser location asJsObject perform: 'assign' with: '#', anObject link id\"" +
	"\n\t\t\t\"taky nefunguje: (ExtElement on: anObject link id) scrollIntoView: self element hscroll: true\"" +
	"\n\t\t]" +
	"\n\t]." +
	"\n\tanAspect = #zmenaVyberuKapitol ifTrue: [" +
	"\n\t\tanObject = #plodiny ifTrue: [" +
	"\n\t\t\t\"filtrovani podle oznacenych plodin\"" +
	"\n\t\t\tkapitola1 ifNotNil: [" +
	"\n\t\t\t\t\"seznam abionoz, chorob nebo skudcu\"" +
	"\n\t\t\t\tkapitola1 resetujTaxony]." +
	"\n\t\t\t\"pro refresh vybraneho SO by melo stacit - pri aktivaci zalozky se vzdy vola #update:with:\"" +
	"\n\t\t\tkapitola := nil" +
	"\n\t\t] ifFalse: [" +
	"\n\t\t\t\"kapitoly metodiky vybraneho SO\"" +
	"\n\t\t\tself refreshContent]" +
	"\n\t]",
	null, "2014-01-28T09:44:41Z", "mp", 1);

jst.FYTextKapSOPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #kapitola ifTrue: [" +
	"\n\t\t(anObject id startsWith: id) ifTrue: [" +
	"\n\t\t\t\"vsichni skudci, choroby, abionozy\"" +
	"\n\t\t\tskocinId ifNotNil: [" +
	"\n\t\t\t\tskocinId := nil." +
	"\n\t\t\t\tkapitola := nil." +
	"\n\t\t\t\tmetodikaSO := nil." +
	"\n\t\t\t\tself refreshContent]" +
	"\n\t\t] ifFalse: [ | soId |" +
	"\n\t\t\t\"vybrany skudce, choroba, abionoza\"" +
	"\n\t\t\tsoId := anObject id copyUpTo: #'@'." +
	"\n\t\t\tskocinId ~= soId | kapitola isNil ifTrue: [" +
	"\n\t\t\t\tskocinId := soId." +
	"\n\t\t\t\tkapitola := kapitola1 najdiKapitoluSO: soId." +
	"\n\t\t\t\tmetodikaSO := kapitola link." +
	"\n\t\t\t\tsemaforData := nil." +
	"\n\t\t\t\tself refreshContent]." +
	"\n\t\t\t\"zoom na podkapitolu... - jak to ale udelat? Nasledujici pokus nefunguje\"" +
	"\n\t\t\t\"Browser location asJsObject perform: 'assign' with: '#', anObject link id\"" +
	"\n\t\t\t\"taky nefunguje: (ExtElement on: anObject link id) scrollIntoView: self element hscroll: true\"" +
	"\n\t\t]" +
	"\n\t]." +
	"\n\tanAspect = #zmenaVyberuKapitol ifTrue: [" +
	"\n\t\t\"filtrovani podle plodin se tyka panelu abionoz, chorob i skudcu, " +
	"\n\t\tprime zaklikavani se tyka jen dane kapitoly a aktivniho panelu\"" +
	"\n\t\t(kapitola1 notNil and: [anObject = #plodiny or: [skocinId isNil]]) ifTrue: [" +
	"\n\t\t\tkapitola1 resetujTaxony]." +
	"\n\t\tanObject = #plodiny ifTrue: [" +
	"\n\t\t\t\"pro refresh vybraneho SO by melo stacit - pri aktivaci zalozky se vzdy vola #update:with:\"" +
	"\n\t\t\tkapitola := nil" +
	"\n\t\t] ifFalse: [" +
	"\n\t\t\t\"zmena seznamu SO nebo kapitol vybraneho SO\"" +
	"\n\t\t\tself refreshContent]" +
	"\n\t]",
	null, "2014-02-21T13:46:25Z", "mp", 1);

jst.FYTextKapSOPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #kapitola ifTrue: [" +
	"\n\t\t(anObject id startsWith: id) ifTrue: [" +
	"\n\t\t\t\"vsichni skudci, choroby, abionozy\"" +
	"\n\t\t\tskocinId ifNotNil: [" +
	"\n\t\t\t\tskocinId := nil." +
	"\n\t\t\t\tkapitola := nil." +
	"\n\t\t\t\tmetodikaSO := nil." +
	"\n\t\t\t\tself refreshContent]" +
	"\n\t\t] ifFalse: [ | soId |" +
	"\n\t\t\t\"vybrany skudce, choroba, abionoza\"" +
	"\n\t\t\tsoId := anObject id copyUpTo: #'@'." +
	"\n\t\t\tskocinId ~= soId | kapitola isNil ifTrue: [" +
	"\n\t\t\t\tskocinId := soId." +
	"\n\t\t\t\tkapitola := kapitola1 najdiKapitoluSO: soId." +
	"\n\t\t\t\tmetodikaSO := kapitola link." +
	"\n\t\t\t\tsemaforData := nil." +
	"\n\t\t\t\tself refreshContent]." +
	"\n\t\t\t\"zoom na podkapitolu... - jak to ale udelat? Nasledujici pokus nefunguje\"" +
	"\n\t\t\t\"Browser location asJsObject perform: 'assign' with: '#', anObject link id\"" +
	"\n\t\t\t\"taky nefunguje: (ExtElement on: anObject link id) scrollIntoView: self element hscroll: true\"" +
	"\n\t\t]" +
	"\n\t]." +
	"\n\tanAspect = #zmenaVyberuKapitol ifTrue: [" +
	"\n\t\t\"filtrovani podle plodin se tyka panelu abionoz, chorob i skudcu, " +
	"\n\t\tprime zaklikavani se tyka jen dane kapitoly a aktivniho panelu\"" +
	"\n\t\tanObject = #plodiny ifTrue: [" +
	"\n\t\t\t\"pro refresh vybraneho SO by melo stacit - pri aktivaci zalozky se vzdy vola #update:with:\"" +
	"\n\t\t\tkapitola1 ifNotNil: [" +
	"\n\t\t\t\tkapitola1 resetujTaxony]." +
	"\n\t\t\tkapitola := nil" +
	"\n\t\t] ifFalse: [" +
	"\n\t\t\t\"zmena seznamu SO nebo kapitol vybraneho SO\"" +
	"\n\t\t\tself refreshContent]" +
	"\n\t]",
	null, "2014-02-21T21:22:18Z", "mp", 1);

jst.FYTextKapSOPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #kapitola ifTrue: [" +
	"\n\t\t(anObject id startsWith: id) ifTrue: [" +
	"\n\t\t\t\"vsichni skudci, choroby, abionozy\"" +
	"\n\t\t\tskocinId ifNotNil: [" +
	"\n\t\t\t\tskocinId := nil." +
	"\n\t\t\t\tkapitola := nil." +
	"\n\t\t\t\tmetodikaSO := nil." +
	"\n\t\t\t\tself refreshContent]" +
	"\n\t\t] ifFalse: [ | soId |" +
	"\n\t\t\t\"vybrany skudce, choroba, abionoza\"" +
	"\n\t\t\tsoId := anObject id copyUpTo: #'@'." +
	"\n\t\t\tskocinId ~= soId | kapitola isNil ifTrue: [" +
	"\n\t\t\t\tskocinId := soId." +
	"\n\t\t\t\tkapitola := kapitola1 najdiKapitoluSO: soId." +
	"\n\t\t\t\tmetodikaSO := kapitola link." +
	"\n\t\t\t\tsemaforData := nil." +
	"\n\t\t\t\tself refreshContent]." +
	"\n\t\t\t\"zoom na podkapitolu... - jak to ale udelat? Nasledujici pokus nefunguje\"" +
	"\n\t\t\t\"Browser location asJsObject perform: 'assign' with: '#', anObject link id\"" +
	"\n\t\t\t\"taky nefunguje: (ExtElement on: anObject link id) scrollIntoView: self element hscroll: true\"" +
	"\n\t\t]" +
	"\n\t]." +
	"\n\tanAspect = #zmenaVyberuKapitol ifTrue: [" +
	"\n\t\t\"filtrovani podle plodin se tyka panelu abionoz, chorob i skudcu, " +
	"\n\t\tprime zaklikavani se tyka jen dane kapitoly a aktivniho panelu\"" +
	"\n\t\tanObject = #plodiny ifTrue: [" +
	"\n\t\t\t\"pro refresh vybraneho SO by melo stacit - pri aktivaci zalozky se vzdy vola #update:with:\"" +
	"\n\t\t\tkapitola := nil" +
	"\n\t\t] ifFalse: [" +
	"\n\t\t\t\"zmena seznamu SO nebo kapitol vybraneho SO\"" +
	"\n\t\t\tself refreshContent]" +
	"\n\t]",
	null, "2014-03-06T13:13:49Z", "mp", 1);

jst.FYTextKapSOPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #kapitola ifTrue: [" +
	"\n\t\t(anObject id startsWith: id) ifTrue: [" +
	"\n\t\t\t\"vsichni skudci, choroby, abionozy\"" +
	"\n\t\t\tskocinId ifNotNil: [" +
	"\n\t\t\t\tskocinId := nil." +
	"\n\t\t\t\tkapitola := nil." +
	"\n\t\t\t\tmetodikaSO := nil." +
	"\n\t\t\t\tself refreshContent]" +
	"\n\t\t] ifFalse: [ | soId |" +
	"\n\t\t\t\"vybrany skudce, choroba, abionoza\"" +
	"\n\t\t\tsoId := anObject id copyUpTo: #'@'." +
	"\n\t\t\tskocinId ~= soId | kapitola isNil ifTrue: [" +
	"\n\t\t\t\tskocinId := soId." +
	"\n\t\t\t\tkapitola := kapitola1 najdiKapitoluSO: soId." +
	"\n\t\t\t\tmetodikaSO := kapitola link." +
	"\n\t\t\t\tsemaforData := nil." +
	"\n\t\t\t\tself refreshContent]." +
	"\n\t\t\t\"zoom na podkapitolu... - jak to ale udelat? Nasledujici pokus nefunguje\"" +
	"\n\t\t\t\"Browser location asJsObject perform: 'assign' with: '#', anObject link id\"" +
	"\n\t\t\t\"taky nefunguje: (ExtElement on: anObject link id) scrollIntoView: self element hscroll: true\"" +
	"\n\t\t]" +
	"\n\t]." +
	"\n\tanAspect = #zmenaVyberuKapitol ifTrue: [" +
	"\n\t\t\"filtrovani podle plodin se tyka panelu abionoz, chorob i skudcu, " +
	"\n\t\tprime zaklikavani se tyka jen dane kapitoly a aktivniho panelu\"" +
	"\n\t\tanObject = #plodiny ifTrue: [" +
	"\n\t\t\t\"ovlivnuje jen seznamSO, prekresli se pri aktivaci zalozky\"" +
	"\n\t\t\t(skocinId isNil and: [kapitola1 notNil]) ifTrue: [" +
	"\n\t\t\t\tprekresli := true]" +
	"\n\t\t] ifFalse: [" +
	"\n\t\t\t\"zmena seznamu SO nebo kapitol vybraneho SO zakliknutim ve stromecku vlevo dole\"" +
	"\n\t\t\tself refreshContent]" +
	"\n\t]",
	null, "2014-03-13T14:48:50Z", "mp", 1);

jst.FYTextKapSOPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tsuper update: anAspect with: anObject." +
	"\n\tanAspect = #kapitola ifTrue: [" +
	"\n\t\t(anObject id startsWith: id) ifTrue: [" +
	"\n\t\t\t\"vsichni skudci, choroby, abionozy\"" +
	"\n\t\t\tskocinId ifNotNil: [" +
	"\n\t\t\t\tskocinId := nil." +
	"\n\t\t\t\tkapitola := nil." +
	"\n\t\t\t\tmetodikaSO := nil." +
	"\n\t\t\t\tself refreshContent]" +
	"\n\t\t] ifFalse: [ | soId |" +
	"\n\t\t\t\"vybrany skudce, choroba, abionoza\"" +
	"\n\t\t\tsoId := anObject id copyUpTo: #'@'." +
	"\n\t\t\tskocinId ~= soId | kapitola isNil ifTrue: [" +
	"\n\t\t\t\tskocinId := soId." +
	"\n\t\t\t\tkapitola := kapitola1 najdiKapitoluSO: soId." +
	"\n\t\t\t\tmetodikaSO := kapitola link." +
	"\n\t\t\t\tsemaforData := nil." +
	"\n\t\t\t\tself refreshContent]." +
	"\n\t\t\t\"zoom na podkapitolu... - jak to ale udelat? Nasledujici pokus nefunguje\"" +
	"\n\t\t\t\"Browser location asJsObject perform: 'assign' with: '#', anObject link id\"" +
	"\n\t\t\t\"taky nefunguje: (ExtElement on: anObject link id) scrollIntoView: self element hscroll: true\"" +
	"\n\t\t]" +
	"\n\t]",
	null, "2014-03-18T16:12:24Z", "mp"); //fytoportal-ior

jst.FYTextKapSOPanel.addMethod("podkapitolaId", "", "accessing", 
	"\t^ skocinId",
	null, "2013-01-31T10:15:18Z", "mp", 1);

jst.FYTextKapSOPanel.addMethod("podkapitolaId", "", "accessing", 
	"\t\"id konkretniho SO nebo #skudci, #choroby, #abionozy\"" +
	"\n\t^ skocinId ifNil: id",
	null, "2013-05-30T08:49:08Z", "mp"); //fytoportal-ior

jst.FYTextKapSOPanel.addMethod("nactiKapitolu:", "metodika", "accessing", 
	"\tkapitola1 := metodika at: id." +
	"\n\tkapitola := nil." +
	"\n\tview contents: ''",
	null, "2013-01-31T15:14:03Z", "mp", 1);

jst.FYTextKapSOPanel.addMethod("nactiKapitolu:", "metodika", "accessing", 
	"\tkapitola1 := metodika at: id." +
	"\n\tkapitola := nil." +
	"\n\tself contents: ''",
	null, "2013-02-04T22:06:41Z", "mp", 1);

jst.FYTextKapSOPanel.addMethod("nactiKapitolu:", "metodika", "accessing", 
	"\t(kapitola1 notNil and: [kapitola1 metodika == metodika]) ifFalse: [" +
	"\n\t\tkapitola1 := metodika at: id." +
	"\n\t\tkapitola := nil." +
	"\n\t\tskocinId := nil." +
	"\n\t\tself contents: '']",
	null, "2013-04-24T16:22:02Z", "mp", 1);

jst.FYTextKapSOPanel.addMethod("nactiKapitolu:", "metodika", "accessing", 
	"\t(kapitola1 isNil or: [(kapitola1 metodika == metodika) not] or: [prekresliSemafor]) ifTrue: [" +
	"\n\t\tkapitola1 := metodika at: id." +
	"\n\t\tkapitola := nil." +
	"\n\t\tskocinId := nil." +
	"\n\t\tprekresliSemafor := false." +
	"\n\t\tself contents: '']",
	null, "2013-04-30T06:59:35Z", "mp", 1);

jst.FYTextKapSOPanel.addMethod("nactiKapitolu:", "metodika", "accessing", 
	"\t(kapitola1 isNil or: [(kapitola1 metodika == metodika) not] or: [kapitola = prekresli]) ifTrue: [" +
	"\n\t\tkapitola1 := metodika at: id." +
	"\n\t\tkapitola := nil." +
	"\n\t\tskocinId := nil." +
	"\n\t\tprekresli := nil." +
	"\n\t\tself contents: '']",
	null, "2013-04-30T19:53:06Z", "mp", 1);

jst.FYTextKapSOPanel.addMethod("nactiKapitolu:", "kap", "accessing", 
	"\t(kapitola1 notNil and: [kapitola1 metodika == kap metodika]) ifFalse: [" +
	"\n\t\tkapitola1 := kap." +
	"\n\t\tkapitola := nil." +
	"\n\t\tskocinId := nil." +
	"\n\t\tmetodikaSO := nil." +
	"\n\t\tself contents: '']",
	null, "2013-05-03T09:34:58Z", "mp", 1);

jst.FYTextKapSOPanel.addMethod("nactiKapitolu:", "kap", "accessing", 
	"\t(kapitola1 notNil and: [kapitola1 metodika == kap metodika]) ifFalse: [" +
	"\n\t\tkapitola1 := kap." +
	"\n\t\tkapitola := nil." +
	"\n\t\tskocinId := id. \"nesmi byt nil, jinak nedojde k vykresleni taxonu - viz #update:with:\"" +
	"\n\t\tmetodikaSO := nil." +
	"\n\t\tself contents: '']",
	null, "2013-05-30T09:04:33Z", "mp"); //fytoportal-ior

jst.FYTextKapSOPanel.addMethod("kapitola", "", "accessing", 
	"\t^ kapitola1",
	null, "2013-01-31T11:04:11Z", "mp");

// *** FYPlodinaPM ***

jst.FYPlodinaPM.addMethod("id", "", "accessing", 
	"\t^ link",
	null, "2013-05-30T06:52:45Z", "mp");

jst.FYPlodinaPM.addMethod("jsonKeys", "", "private", 
	"\t^ super jsonKeys copyWithout: #taxon",
	null, "2013-04-23T13:04:29Z", "mp", 1);

jst.FYPlodinaPM.addMethod("jsonKeys", "", "private", 
	"\t^ super jsonKeys copyWithoutAll: #(fotka taxony)",
	null, "2014-03-07T15:02:22Z", "mp"); //fytoportal-ior

/*
jst.FYPlodinaPM.addMethod("taxon", "", "accessing", 
	"\t^ taxon ifNil: [" +
	"\n\t\ttaxon := Fytoportal db loadObject: link]",
	null, "2013-04-23T13:05:46Z", "mp", 1);

jst.FYPlodinaPM.addMethod("taxon", "", "accessing", 
	"\t^ taxony ifNil: [" +
	"\n\t\ttaxony := { Fytoportal db loadObject: link}]",
	null, "2014-03-07T15:04:28Z", "mp"); //fytoportal-ior
*/

jst.FYPlodinaPM.addMethod("taxony:", "aCollection", "accessing", 
	"\ttaxony := aCollection",
	null, "2014-03-07T15:03:17Z", "mp");

jst.FYPlodinaPM.addMethod("taxony", "", "accessing", 
	"\t^ taxony",
	null, "2014-03-07T15:03:43Z", "mp");

jst.FYPlodinaPM.addMethod("fotka", "", "accessing", 
	"\t^ fotka",
	null, "2014-03-07T15:04:45Z", "mp", 1);

jst.FYPlodinaPM.addMethod("fotka", "", "accessing", 
	"\t\"needituje se, dohledava se pres taxon\"" +
	"\n\t^ fotka",
	null, "2014-03-10T12:28:45Z", "mp");

jst.FYPlodinaPM.addMethod("vychoziFotka", "", "accessing", 
	"\t^ nil",
	null, "2014-03-10T16:52:01Z", "mp");

jst.FYPlodinaPM.addMethod("zobrazFotku:", "anObject", "accessing", 
	"\t\"fotka se dohleda podle taxonu (vychozi pro dany taxon) a nastavi se zvenci\"" +
	"\n\tfotka := anObject",
	null, "2014-03-10T12:28:19Z", "mp");

jst.FYPlodinaPM.addMethod("<=", "plod", "comparing", 
	"\t^ nazev <= plod nazev",
	null, "2013-04-23T13:55:42Z", "mp");

jst.FYPlodinaPM.addMethod("nazev", "", "accessing", 
	"\t^ nazev",
	null, "2013-04-23T13:55:52Z", "mp");

jst.FYPlodinaPM.addMethod("link", "", "accessing", 
	"\t^ link",
	null, "2013-04-23T13:56:59Z", "mp");

jst.FYPlodinaPM.addMethod("linkId", "", "accessing", 
	"\t^ link",
	null, "2013-04-23T14:02:28Z", "mp");

jst.FYPlodinaPM.addMethod("link:", "aString", "accessing", 
	"\tlink := aString",
	null, "2013-04-23T14:10:46Z", "mp");

jst.FYPlodinaPM.addMethod("nazev:", "aString", "accessing", 
	"\tnazev := aString",
	null, "2013-04-23T14:11:04Z", "mp");

jst.FYPlodinaPM.addMethod("jeKapitola", "", "testing", 
	"\t^ false",
	null, "2013-11-05T12:49:46Z", "mp");

jst.FYPlodinaPM.addMethod("jeKapitola1", "", "testing", 
	"\t^ false",
	null, "2014-01-01T15:16:30Z", "mp");

jst.FYPlodinaPM.addMethod("printOn:", "aStream", "printing", 
	"\taStream nextPutAll: nazev",
	null, "2014-01-28T13:14:24Z", "mp");

jst.FYPlodinaPM.addMethod("=", "pl", "comparing", 
	"\t^ self id = pl id",
	null, "2014-01-28T13:49:47Z", "mp");

jst.FYPlodinaPM.addMethod("jePlodina", "", "testing", 
	"\t^ true",
	null, "2014-03-09T19:37:45Z", "mp");

jst.FYPlodinaPM.addMethod("text", "", "accessing", 
	"\t^ nazev",
	null, "2014-03-09T19:42:18Z", "mp");

//*** FYSemaforPOR ***

jst.FYSemaforPOR.addMethod("initialize", "", "initialization", 
	"\thodnUdaje := Dictionary new",
	null, "2013-05-10T11:18:42Z", "mp");

jst.FYSemaforPOR.addMethod("udajeSkupiny:", "skup", "accessing", 
	"\t^ hodnUdaje at: skup ifAbsentPut: [" +
	"\n\t\t(Fytoportal data pripravky semaforUdaje lookupKey: {id. skup}) " +
	"\n\t\t\tifNotEmptyDo: [:vysl | vysl first at: #value]" +
	"\n\t\t\tifEmpty: [PORSkupHU new udaje: #()]]",
	null, "2013-05-10T12:21:45Z", "mp");

jst.FYSemaforPOR.addMethod("semafor", "", "accessing", 
	"\t^ semafor",
	null, "2013-05-10T06:21:17Z", "mp");

/*
jst.FYSemaforPOR.addMethod("herbicid", "", "testing", 
	"\t^ pouziti noneSatisfy: [:p | p skodlOrg = 'desikace']",
	null, "2014-04-02T10:51:08Z", "mp");

jst.FYSemaforPOR.addMethod("mimoPrip", "", "testing", 
	"\t^ (biologFunkce includes: 'Herbicid') not" +
	"\n\t\tor: [pouziti anySatisfy: [:p | p skodlOrg = 'desikace']]",
	null, "2014-04-02T10:52:21Z", "mp");
*/

jst.FYSemaforPOR.addMethod("jeDesikant", "", "testing", 
	"\t^ (biologFunkce includes: 'Desikant') or: [" +
	"\n\t\t(biologFunkce includes: 'Herbicid') and: [pouziti anySatisfy: [:p | p skodlOrg = 'desikace']]]",
	null, "2014-04-24T19:19:40Z", "mp");

jst.FYSemaforPOR.addMethod("jeRegulatorRustu", "", "testing", 
	"\t^ biologFunkce anySatisfy: [:fce | fce startsWith: 'Regul']",
	null, "2014-04-24T19:21:09Z", "mp");

/* zruseno, resi se primo ve views v databazi
jst.FYSemaforPOR.addMethod("neniDesikant", "", "testing", 
	"\t\"pouzivam jen v ramci herbicidu, test na herbicid tdy neni potreba\"" +
	"\n\t^ pouziti noneSatisfy: [:p | p skodlOrg = 'desikace']",
	null, "2014-04-25T10:47:59Z", "mp");

jst.FYSemaforPOR.addMethod("neniHerbicid", "", "testing", 
	"\t^ (biologFunkce includes: 'Herbicid') not",
	null, "2014-04-25T09:37:19Z", "mp");
*/

// *** FYTiskMetodiky ***

jst.FYTiskMetodiky.addMethod("initialize", "", "initialization", 
	"\tlabel := 'Tisk metodiky'",
	null, "2013-08-28T08:53:21Z", "mp", 1);

jst.FYTiskMetodiky.addMethod("initialize", "", "initialization", 
	"\tlabel := 'Tisk metodiky'." +
	"\n\tbezFotek := false." +
	"\n\ticonCls := #'btn-print'",
	null, "2014-05-12T14:17:36Z", "mp"); //fytoportal-ior

jst.FYTiskMetodiky.addMethod("bezFotek:", "aBoolean", "accessing", 
	"\tbezFotek := aBoolean",
	null, "2014-05-12T12:51:38Z", "mp");

jst.FYTiskMetodiky.addMethod("asSplitButton", "", "converting", 
	"\tmenu := ExtMenu new " +
	"\n\t\tadd: (self class new " +
	"\n\t\t\tbezFotek: true; " +
	"\n\t\t\tlabel: 'Tisk bez obrázků';" +
	"\n\t\t\tasMenuItem) beEnabled;" +
	"\n\t\tyourself." +
	"\n\t^ super asSplitButton",
	null, "2014-05-12T14:17:25Z", "mp");

jst.FYTiskMetodiky.addMethod("execute", "", "executing", 
	"\t| w m url |" +
	"\n\tm := Fytoportal navigator ior metodika link." +
	"\n\tw := Window new open." +
	"\n\tw document title: m nazev, ' - tisk metodiky'." +
	"\n\turl := Browser location asUrl removeParameters; fragment: nil." +
	"\n\turl path removeLast." +
	"\n\tw document head appendChild: (HTMLLinkElement new" +
	"\n\t\thref: (url with: 'fytoportal-tisk.css');" +
	"\n\t\trel: 'stylesheet';" +
	"\n\t\ttype: 'text/css')." +
	"\n\t[" +
	"\n\t\tUIManager default informUser: 'Připravuji tisk, čekejte...' during: [" +
	"\n\t\t\tw document body htmlContents: [:html | " +
	"\n\t\t\t\tself renderTiskMetodikyOn: html]" +
	"\n\t\t]" +
	"\n\t] delayed: 100",
	null, "2014-01-04T19:26:29Z", "mp", 1);

jst.FYTiskMetodiky.addMethod("execute", "", "executing", 
	"\t| w m url |" +
	"\n\tm := Fytoportal navigator ior metodika link." +
	"\n\turl := Browser location asUrl removeParameters; fragment: nil." +
	"\n\turl path removeLast." +
	"\n\turl " +
	"\n\t\taddToPath: 'metodika-tisk.html';" +
	"\n\t\taddParameter: 'metodika' value: m id;" +
	"\n\t\taddParameter: 'vyber' value: (JSON default encode: Fytoportal data vyberKapitolPM)." +
	"\n\tWindow new " +
	"\n\t\turl: url;" +
	"\n\t\topen;" +
	"\n\t\tresetProxy" +
	"\n\t\"w document title: m nazev, ' - tisk metodiky'.\"" +
	"\n\t\"[ | ft |" +
	"\n\t\tw := Dictionary on: w asJsObject." +
	"\n\t\tft := (Dictionary on: (w at: 'jst')) at: #Fytoportal." +
	"\n\t\tft navigator ior metodika link: m." +
	"\n\t\tft state  at: #vyberKapitolPM put: (Fytoportal data vyberKapitolPM)." +
	"\n\t] delayed: 100\"",
	null, "2014-01-04T23:25:14Z", "mp", 1);

jst.FYTiskMetodiky.addMethod("execute", "", "executing", 
	"\t| w m url |" +
	"\n\tm := Fytoportal navigator ior metodika link." +
	"\n\turl := Browser location asUrl removeParameters; fragment: nil." +
	"\n\turl path removeLast." +
	"\n\turl addToPath: 'metodika-tisk1.html'." +
	"\n\tw := Window new " +
	"\n\t\turl: url;" +
	"\n\t\topen." +
	"\n\tw document title: m nazev, ' - tisk metodiky IOR'." +
	"\n\tw document body htmlContents: [:html | " +
	"\n\t\tself renderTiskMetodikyOn: html]." +
	"\n\tw document body removeChild: (w document elementById: 'loader')",
	null, "2014-01-05T20:35:15Z", "mp", 1);

jst.FYTiskMetodiky.addMethod("execute", "", "executing", 
	"\t| m url |" +
	"\n\tWebStorage local at: #'fyto-vyberKapitol' put: (JSON default encode: Fytoportal data vyberKapitolPM)." +
	"\n\tm := Fytoportal navigator ior metodika link." +
	"\n\turl := Browser location asUrl removeParameters; fragment: nil." +
	"\n\turl path removeLast." +
	"\n\tSmalltalk isRuntime ifFalse: [ | w |" +
	"\n\t\t\"pokud ladim, generuji tisk primo z tohoto okna\"" +
	"\n\t\tw := Window new " +
	"\n\t\t\turl: (url addToPath: 'metodika-tisk-sablona.html');" +
	"\n\t\t\topen." +
	"\n\t\tw document title: m nazev, ' - tisk metodiky IOR'." +
	"\n\t\t[w document body htmlContents: [:html | " +
	"\n\t\t\tself renderTiskMetodikyOn: html]." +
	"\n\t\tw document body removeChild: (w document elementById: 'loader')] delayed: 100" +
	"\n\t] ifTrue: [" +
	"\n\t\t\"samostatny tisk, nelze ladit\"" +
	"\n\t\turl " +
	"\n\t\t\taddToPath: 'metodika-tisk.html';" +
	"\n\t\t\taddParameter: 'metodika' value: m id." +
	"\n\t\tWindow new " +
	"\n\t\t\turl: url;" +
	"\n\t\t\topen;" +
	"\n\t\t\tresetProxy." +
	"\n\t]\t\t\t",
	null, "2014-01-06T10:38:00Z", "mp", 1);

jst.FYTiskMetodiky.addMethod("execute", "", "executing", 
	"\t| m url |" +
	"\n\tWebStorage local at: #'fyto-vyberKapitol' put: (JSON default encode: Fytoportal data vyberKapitolPM)." +
	"\n\tm := Fytoportal navigator ior metodika link." +
	"\n\turl := Browser location asUrl removeParameters; fragment: nil." +
	"\n\t(url path last includes: $.) ifTrue: [" +
	"\n\t\t\"index.html totiz neni v ceste\"" +
	"\n\t\turl path removeLast]." +
	"\n\tSmalltalk isRuntime ifFalse: [ | w |" +
	"\n\t\t\"pokud ladim, generuji tisk primo z tohoto okna\"" +
	"\n\t\tw := Window new " +
	"\n\t\t\turl: (url addToPath: 'metodika-tisk-sablona.html');" +
	"\n\t\t\topen." +
	"\n\t\tw document title: m nazev, ' - tisk metodiky IOR'." +
	"\n\t\t[w document body htmlContents: [:html | " +
	"\n\t\t\tself renderTiskMetodikyOn: html]." +
	"\n\t\tw document body removeChild: (w document elementById: 'loader')] delayed: 100" +
	"\n\t] ifTrue: [" +
	"\n\t\t\"samostatny tisk, nelze ladit\"" +
	"\n\t\turl " +
	"\n\t\t\taddToPath: 'metodika-tisk.html';" +
	"\n\t\t\taddParameter: 'metodika' value: m id." +
	"\n\t\tWindow new " +
	"\n\t\t\turl: url;" +
	"\n\t\t\topen;" +
	"\n\t\t\tresetProxy." +
	"\n\t]\t\t\t",
	null, "2014-01-17T08:37:14Z", "mp", 1);

jst.FYTiskMetodiky.addMethod("execute", "", "executing", 
	"\t| m url |" +
	"\n\tWebStorage local at: #'fyto-vyberKapitol' put: (JSON default encode: Fytoportal data vyberKapitolPM)." +
	"\n\tm := Fytoportal navigator ior metodika link." +
	"\n\turl := Browser location asUrl removeParameters; fragment: nil." +
	"\n\t(url path last includes: $.) ifTrue: [" +
	"\n\t\t\"index.html totiz neni v ceste\"" +
	"\n\t\turl path removeLast]." +
	"\n\tSmalltalk isRuntime ifFalse: [ | w |" +
	"\n\t\t\"pokud ladim, generuji tisk primo z tohoto okna\"" +
	"\n\t\tw := Window new " +
	"\n\t\t\turl: (url addToPath: 'metodika-tisk-sablona.html');" +
	"\n\t\t\topen." +
	"\n\t\tw document title: m nazev, ' - tisk metodiky IOR'." +
	"\n\t\t[w document body htmlContents: [:html | " +
	"\n\t\t\tself renderTiskMetodikyOn: html]." +
	"\n\t\tw document body removeChild: (w document elementById: 'loader')." +
	"\n\t\tw print] delayed: 100" +
	"\n\t] ifTrue: [" +
	"\n\t\t\"samostatny tisk, nelze ladit\"" +
	"\n\t\turl " +
	"\n\t\t\taddToPath: 'metodika-tisk.html';" +
	"\n\t\t\taddParameter: 'metodika' value: m id." +
	"\n\t\tWindow new " +
	"\n\t\t\turl: url;" +
	"\n\t\t\topen;" +
	"\n\t\t\tresetProxy" +
	"\n\t]\t\t\t",
	null, "2014-05-12T15:29:53Z", "mp"); //fytoportal-ior

jst.FYTiskMetodiky.addMethod("renderTiskMetodikyOn:", "html", "rendering", 
	"\t| m |" +
	"\n\tm := Fytoportal navigator ior metodika link." +
	"\n\thtml div class: 'metodika-nazev'; with: m nazev." +
	"\n\tm sortedKeys select: [:k | k ~= #plodiny] thenDo: [:k | " +
	"\n\t\t(m at: k) kapitolyTiskVyber ifNotEmptyDo: [:kapitoly | " +
	"\n\t\t\t\"pestebni opatreni, abionozy, choroby, skludci, plevele, osetreni rostlin\"" +
	"\n\t\t\thtml div " +
	"\n\t\t\t\tclass: 'nazev1';  " +
	"\n\t\t\t\twith: (m at: k) nazev." +
	"\n\t\t\tkapitoly do: [:kap | (m at: k) jeKapitolaSO " +
	"\n\t\t\t\tifFalse: [kap renderTextOn: html of: nil]" +
	"\n\t\t\t\tifTrue: [ | taxon |" +
	"\n\t\t\t\t\ttaxon := Fytoportal data taxony podleMetodikSO lookupKey: kap linkId." +
	"\n\t\t\t\t\ttaxon := Fytoportal db loadObject: taxon first value." +
	"\n\t\t\t\t\thtml div class: 'kapitola-taxon'; with: [" +
	"\n\t\t\t\t\t\t(m at: k) fotky at: taxon id ifPresent: [:foto |" +
	"\n\t\t\t\t\t\t\thtml img " +
	"\n\t\t\t\t\t\t\t\tclass: 'fotka';" +
	"\n\t\t\t\t\t\t\t\theight: 150; " +
	"\n\t\t\t\t\t\t\t\twidth: (foto format * 150) rounded; " +
	"\n\t\t\t\t\t\t\t\tsrc:  (Browser location asUrl resetPath addToPath: foto preview);" +
	"\n\t\t\t\t\t\t\t\ttitle: foto popis]." +
	"\n\t\t\t\t\t\ttaxon renderOn: html." +
	"\n\t\t\t\t\t\tkap kapitolyTiskVyber do: [:k1 |" +
	"\n\t\t\t\t\t\t\tk1 renderTextOn: html of: self]" +
	"\n\t\t\t\t\t]" +
	"\n\t\t\t\t]" +
	"\n\t\t\t]" +
	"\n\t\t]" +
	"\n\t]",
	null, "2014-01-04T19:26:05Z", "mp", 1);

jst.FYTiskMetodiky.addMethod("renderTiskMetodikyOn:", "html", "rendering", 
	"\t| m |" +
	"\n\tm := Fytoportal navigator ior metodika link." +
	"\n\thtml div class: 'metodika-nazev'; with: m nazev." +
	"\n\tm sortedKeys select: [:k | k ~= #plodiny] thenDo: [:k | " +
	"\n\t\t(m at: k) kapitolyTiskVyber ifNotEmptyDo: [:kapitoly | " +
	"\n\t\t\t\"pestebni opatreni, abionozy, choroby, skludci, plevele, osetreni rostlin\"" +
	"\n\t\t\thtml div " +
	"\n\t\t\t\tclass: 'nazev1';  " +
	"\n\t\t\t\twith: (m at: k) nazev." +
	"\n\t\t\tkapitoly do: [:kap | (m at: k) jeKapitolaSO " +
	"\n\t\t\t\tifFalse: [kap renderTextOn: html of: nil]" +
	"\n\t\t\t\tifTrue: [ | taxon |" +
	"\n\t\t\t\t\ttaxon := Fytoportal data taxony podleMetodikSO lookupKey: kap linkId." +
	"\n\t\t\t\t\ttaxon := Fytoportal db loadObject: taxon first value." +
	"\n\t\t\t\t\thtml div class: 'kapitola-taxon'; with: [" +
	"\n\t\t\t\t\t\t(m at: k) fotky at: taxon id ifPresent: [:foto |" +
	"\n\t\t\t\t\t\t\thtml img " +
	"\n\t\t\t\t\t\t\t\tclass: 'fotka';" +
	"\n\t\t\t\t\t\t\t\theight: 150; " +
	"\n\t\t\t\t\t\t\t\twidth: (foto format * 150) rounded; " +
	"\n\t\t\t\t\t\t\t\tsrc:  (Browser location asUrl resetPath removeParameters addToPath: foto preview);" +
	"\n\t\t\t\t\t\t\t\ttitle: foto popis]." +
	"\n\t\t\t\t\t\ttaxon renderOn: html." +
	"\n\t\t\t\t\t\tkap kapitolyTiskVyber do: [:k1 |" +
	"\n\t\t\t\t\t\t\tk1 renderTextOn: html of: self]" +
	"\n\t\t\t\t\t]" +
	"\n\t\t\t\t]" +
	"\n\t\t\t]" +
	"\n\t\t]" +
	"\n\t]",
	null, "2014-01-05T22:14:43Z", "mp", 1);

jst.FYTiskMetodiky.addMethod("renderTiskMetodikyOn:", "html", "rendering", 
	"\t| m |" +
	"\n\tm := Fytoportal navigator ior metodika link." +
	"\n\thtml div class: 'metodika-nazev'; with: m nazev." +
	"\n\tm sortedKeys select: [:k | k ~= #plodiny] thenDo: [:k | " +
	"\n\t\t(m at: k) kapitolyTiskVyber ifNotEmptyDo: [:kapitoly | " +
	"\n\t\t\t\"pestebni opatreni, abionozy, choroby, skludci, plevele, osetreni rostlin\"" +
	"\n\t\t\thtml div " +
	"\n\t\t\t\tclass: 'nazev1';  " +
	"\n\t\t\t\twith: (m at: k) nazev." +
	"\n\t\t\tkapitoly do: [:kap | (m at: k) jeKapitolaSO " +
	"\n\t\t\t\tifFalse: [kap renderTextOn: html of: nil]" +
	"\n\t\t\t\tifTrue: [ | taxon |" +
	"\n\t\t\t\t\ttaxon := Fytoportal data taxony podleMetodikSO lookupKey: kap linkId." +
	"\n\t\t\t\t\ttaxon := Fytoportal db loadObject: taxon first value." +
	"\n\t\t\t\t\thtml div class: 'kapitola-taxon'; with: [" +
	"\n\t\t\t\t\t\t(m at: k) fotky at: taxon id ifPresent: [:foto |" +
	"\n\t\t\t\t\t\t\thtml img " +
	"\n\t\t\t\t\t\t\t\tclass: 'fotka';" +
	"\n\t\t\t\t\t\t\t\theight: 150; " +
	"\n\t\t\t\t\t\t\t\twidth: (foto format * 150) rounded; " +
	"\n\t\t\t\t\t\t\t\tsrc:  foto preview;" +
	"\n\t\t\t\t\t\t\t\ttitle: foto popis]." +
	"\n\t\t\t\t\t\thtml div class: 'taxon-popis'; with: [" +
	"\n\t\t\t\t\t\t\ttaxon renderOn: html]." +
	"\n\t\t\t\t\t\tkap kapitolyTiskVyber do: [:k1 |" +
	"\n\t\t\t\t\t\t\tk1 renderTextOn: html of: self]" +
	"\n\t\t\t\t\t]" +
	"\n\t\t\t\t]" +
	"\n\t\t\t]" +
	"\n\t\t]" +
	"\n\t]",
	null, "2014-01-06T11:21:13Z", "mp", 1);

jst.FYTiskMetodiky.addMethod("renderTiskMetodikyOn:", "html", "rendering", 
	"\tmetodika := Fytoportal navigator ior metodika link." +
	"\n\tsemaforParams := Dictionary new." +
	"\n\tmetodika plodiny ifNotNilDo: [:pl | " +
	"\n\t\tsemaforParams at: #plodiny put: pl kodyVyber]." +
	"\n\thtml div class: 'metodika-nazev'; with: metodika nazev." +
	"\n\tmetodika sortedKeys select: [:k | k ~= #plodiny] thenDo: [:k | " +
	"\n\t\t(metodika at: k) kapitolyTiskVyber ifNotEmptyDo: [:kapitoly | " +
	"\n\t\t\t\"pestebni opatreni, abionozy, choroby, skludci, plevele, osetreni rostlin\"" +
	"\n\t\t\thtml div " +
	"\n\t\t\t\tclass: 'nazev1';  " +
	"\n\t\t\t\twith: (metodika at: k) nazev." +
	"\n\t\t\tkapitoly do: [:kap | (metodika at: k) jeKapitolaSO " +
	"\n\t\t\t\tifFalse: [kap renderTextOn: html of: nil]" +
	"\n\t\t\t\tifTrue: [" +
	"\n\t\t\t\t\ttaxon := Fytoportal data taxony podleMetodikSO lookupKey: kap linkId." +
	"\n\t\t\t\t\ttaxon := Fytoportal db loadObject: taxon first value." +
	"\n\t\t\t\t\thtml div class: 'kapitola-taxon'; with: [" +
	"\n\t\t\t\t\t\t(metodika at: k) fotky at: taxon id ifPresent: [:foto |" +
	"\n\t\t\t\t\t\t\thtml img " +
	"\n\t\t\t\t\t\t\t\tclass: 'fotka';" +
	"\n\t\t\t\t\t\t\t\theight: 150; " +
	"\n\t\t\t\t\t\t\t\twidth: (foto format * 150) rounded; " +
	"\n\t\t\t\t\t\t\t\tsrc:  foto preview;" +
	"\n\t\t\t\t\t\t\t\ttitle: foto popis]." +
	"\n\t\t\t\t\t\thtml div class: 'taxon-popis'; with: [" +
	"\n\t\t\t\t\t\t\ttaxon renderOn: html]." +
	"\n\t\t\t\t\t\tkap kapitolyTiskVyber do: [:k1 |" +
	"\n\t\t\t\t\t\t\tk1 renderTextOn: html of: self]" +
	"\n\t\t\t\t\t]" +
	"\n\t\t\t\t]" +
	"\n\t\t\t]" +
	"\n\t\t]" +
	"\n\t]",
	null, "2014-01-10T22:54:17Z", "mp", 1);

jst.FYTiskMetodiky.addMethod("renderTiskMetodikyOn:", "html", "rendering", 
	"\tmetodika := Fytoportal navigator ior metodika link." +
	"\n\tsemaforParams := Dictionary new." +
	"\n\tmetodika plodiny ifNotNilDo: [:pl | " +
	"\n\t\tsemaforParams at: #plodiny put: pl kodyVyber]." +
	"\n\thtml div class: 'metodika-nazev'; with: metodika nazev." +
	"\n\tmetodika sortedKeys select: [:k | k ~= #plodiny] thenDo: [:k | " +
	"\n\t\t(metodika at: k) kapitolyTiskVyber ifNotEmptyDo: [:kapitoly | " +
	"\n\t\t\t\"pestebni opatreni, abionozy, choroby, skludci, plevele, osetreni rostlin\"" +
	"\n\t\t\thtml div " +
	"\n\t\t\t\tclass: 'nazev1';  " +
	"\n\t\t\t\twith: (metodika at: k) nazev." +
	"\n\t\t\tkapitoly do: [:kap | (metodika at: k) jeKapitolaSO " +
	"\n\t\t\t\tifFalse: [" +
	"\n\t\t\t\t\ttaxon := nil." +
	"\n\t\t\t\t\tkap renderTextOn: html of: self]" +
	"\n\t\t\t\tifTrue: [" +
	"\n\t\t\t\t\ttaxon := Fytoportal data taxony podleMetodikSO lookupKey: kap linkId." +
	"\n\t\t\t\t\ttaxon := Fytoportal db loadObject: taxon first value." +
	"\n\t\t\t\t\thtml div class: 'kapitola-taxon'; with: [" +
	"\n\t\t\t\t\t\t(metodika at: k) fotky at: taxon id ifPresent: [:foto |" +
	"\n\t\t\t\t\t\t\thtml img " +
	"\n\t\t\t\t\t\t\t\tclass: 'fotka';" +
	"\n\t\t\t\t\t\t\t\theight: 150; " +
	"\n\t\t\t\t\t\t\t\twidth: (foto format * 150) rounded; " +
	"\n\t\t\t\t\t\t\t\tsrc:  foto preview;" +
	"\n\t\t\t\t\t\t\t\ttitle: foto popis]." +
	"\n\t\t\t\t\t\thtml div class: 'taxon-popis'; with: [" +
	"\n\t\t\t\t\t\t\ttaxon renderOn: html]." +
	"\n\t\t\t\t\t\tkap kapitolyTiskVyber do: [:k1 |" +
	"\n\t\t\t\t\t\t\tk1 renderTextOn: html of: self]" +
	"\n\t\t\t\t\t]" +
	"\n\t\t\t\t]" +
	"\n\t\t\t]" +
	"\n\t\t]" +
	"\n\t]",
	null, "2014-02-17T13:04:04Z", "mp", 1);

jst.FYTiskMetodiky.addMethod("renderTiskMetodikyOn:", "html", "rendering", 
	"\tmetodika := Fytoportal navigator ior metodika link." +
	"\n\tsemaforParams := Dictionary new." +
	"\n\tmetodika plodiny ifNotNilDo: [:pl | " +
	"\n\t\tsemaforParams at: #plodiny put: pl kodyVyber]." +
	"\n\thtml div class: 'metodika-nazev'; with: metodika nazev." +
	"\n\tmetodika sortedKeys select: [:k | k ~= #plodiny] thenDo: [:k | " +
	"\n\t\t(metodika at: k) kapitolyTiskVyber ifNotEmptyDo: [:kapitoly | " +
	"\n\t\t\t\"pestebni opatreni, abionozy, choroby, skludci, plevele, osetreni rostlin\"" +
	"\n\t\t\thtml div " +
	"\n\t\t\t\tclass: 'nazev1';  " +
	"\n\t\t\t\twith: (metodika at: k) nazev." +
	"\n\t\t\tkapitoly do: [:kap | (metodika at: k) jeKapitolaSO " +
	"\n\t\t\t\tifFalse: [" +
	"\n\t\t\t\t\t\"mimo skodl. org. tj. pouze plevele\"" +
	"\n\t\t\t\t\tsemaforParams removeKey: #skodlorg ifAbsent: nil." +
	"\n\t\t\t\t\tkap renderTextOn: html of: self]" +
	"\n\t\t\t\tifTrue: [" +
	"\n\t\t\t\t\tsemaforParams at: #skodlorg put: kap kody." +
	"\n\t\t\t\t\thtml div class: 'kapitola-taxon'; with: [" +
	"\n\t\t\t\t\t\tFYTiskTaxonuIOR new " +
	"\n\t\t\t\t\t\t\tkapitola: kap; " +
	"\n\t\t\t\t\t\t\trenderOn: html." +
	"\n\t\t\t\t\t\tkap kapitolyTiskVyber do: [:k1 |" +
	"\n\t\t\t\t\t\t\tk1 renderTextOn: html of: self]" +
	"\n\t\t\t\t\t]" +
	"\n\t\t\t\t]" +
	"\n\t\t\t]" +
	"\n\t\t]" +
	"\n\t]",
	null, "2014-03-07T16:15:00Z", "mp", 1);

jst.FYTiskMetodiky.addMethod("renderTiskMetodikyOn:", "html", "rendering", 
	"\tmetodika := Fytoportal navigator ior metodika link." +
	"\n\tsemaforParams := Dictionary new" +
	"\n\t\tat: #plodiny put: metodika plodiny pouzitiPlodiny;" +
	"\n\t\tyourself." +
	"\n\thtml div class: 'metodika-nazev'; with: metodika nazev." +
	"\n\tmetodika sortedKeys select: [:k | k ~= #plodiny] thenDo: [:k | | kapitola1 |" +
	"\n\t\t\"pestebni opatreni, abionozy, choroby, skludci, plevele, dalsi POR\"" +
	"\n\t\tkapitola1 := metodika at: k." +
	"\n\t\tdataPOR := nil." +
	"\n\t\tkapitola1 id = #plevele ifTrue: [" +
	"\n\t\t\t\"pripravim parametry pro plevele a jine POR, vyuzivam daneho usporadani kapitol\"" +
	"\n\t\t\tsemaforParams := Dictionary new" +
	"\n\t\t\t\tat: #keys put: ((semaforParams at: #plodiny) " +
	"\n\t\t\t\t\tcopyWithAll: Fytoportal data pouzitiVsechnyPlodiny);" +
	"\n\t\t\t\tyourself]." +
	"\n\t\tkapitola1 kapitolyTiskVyber ifNotEmptyDo: [:kapitoly | " +
	"\n\t\t\thtml div " +
	"\n\t\t\t\tclass: 'nazev1';  " +
	"\n\t\t\t\twith: kapitola1 nazev." +
	"\n\t\t\tkapitoly do: [:kap | kapitola1 jeKapitolaSO " +
	"\n\t\t\t\tifFalse: [" +
	"\n\t\t\t\t\t\"mimo skodl. org. tj. pouze plevele\"" +
	"\n\t\t\t\t\tkap renderTextOn: html of: self]" +
	"\n\t\t\t\tifTrue: [" +
	"\n\t\t\t\t\tsemaforParams at: #keys put: kap metodikaSO pouzitiSO." +
	"\n\t\t\t\t\tdataPOR :=  kap metodikaSO nactiSemaforPro: semaforParams pak: nil." +
	"\n\t\t\t\t\thtml div class: 'kapitola-taxon'; with: [" +
	"\n\t\t\t\t\t\tFYTiskTaxonuIOR new " +
	"\n\t\t\t\t\t\t\tkapitola: kap; " +
	"\n\t\t\t\t\t\t\trenderOn: html." +
	"\n\t\t\t\t\t\tkap kapitolyTiskVyber do: [:k1 |" +
	"\n\t\t\t\t\t\t\tk1 renderTextOn: html of: self]" +
	"\n\t\t\t\t\t]" +
	"\n\t\t\t\t]" +
	"\n\t\t\t]" +
	"\n\t\t]" +
	"\n\t]",
	null, "2014-04-25T12:47:23Z", "mp", 1);

jst.FYTiskMetodiky.addMethod("renderTiskMetodikyOn:", "html", "rendering", 
	"\tmetodika := Fytoportal navigator ior metodika link." +
	"\n\tsemaforParams := Dictionary new." +
	"\n\tmetodika plodiny ifNotNilDo: [:pl |" +
	"\n\t\tsemaforParams at: #plodiny put: pl pouzitiPlodiny]." +
	"\n\thtml div class: 'metodika-nazev'; with: metodika nazev." +
	"\n\tmetodika sortedKeys select: [:k | k ~= #plodiny] thenDo: [:k | | kapitola1 |" +
	"\n\t\t\"pestebni opatreni, abionozy, choroby, skludci, plevele, dalsi POR\"" +
	"\n\t\tkapitola1 := metodika at: k." +
	"\n\t\tdataPOR := nil." +
	"\n\t\tkapitola1 id = #plevele ifTrue: [" +
	"\n\t\t\t\"pripravim parametry pro plevele a jine POR, vyuzivam daneho usporadani kapitol\"" +
	"\n\t\t\tsemaforParams := Dictionary new" +
	"\n\t\t\t\tat: #keys put: ((semaforParams at: #plodiny) " +
	"\n\t\t\t\t\tcopyWithAll: Fytoportal data pouzitiVsechnyPlodiny);" +
	"\n\t\t\t\tyourself]." +
	"\n\t\tkapitola1 kapitolyTiskVyber ifNotEmptyDo: [:kapitoly | " +
	"\n\t\t\thtml div " +
	"\n\t\t\t\tclass: 'nazev1';  " +
	"\n\t\t\t\twith: kapitola1 nazev." +
	"\n\t\t\tkapitoly do: [:kap | kapitola1 jeKapitolaSO " +
	"\n\t\t\t\tifFalse: [" +
	"\n\t\t\t\t\t\"mimo skodl. org. tj. pouze plevele\"" +
	"\n\t\t\t\t\tkap renderTextOn: html of: self]" +
	"\n\t\t\t\tifTrue: [" +
	"\n\t\t\t\t\tsemaforParams at: #keys put: kap metodikaSO pouzitiSO." +
	"\n\t\t\t\t\tdataPOR :=  kap metodikaSO nactiSemaforPro: semaforParams pak: nil." +
	"\n\t\t\t\t\thtml div class: 'kapitola-taxon'; with: [" +
	"\n\t\t\t\t\t\tFYTiskTaxonuIOR new " +
	"\n\t\t\t\t\t\t\tkapitola: kap; " +
	"\n\t\t\t\t\t\t\trenderOn: html." +
	"\n\t\t\t\t\t\tkap kapitolyTiskVyber do: [:k1 |" +
	"\n\t\t\t\t\t\t\tk1 renderTextOn: html of: self]" +
	"\n\t\t\t\t\t]" +
	"\n\t\t\t\t]" +
	"\n\t\t\t]" +
	"\n\t\t]" +
	"\n\t]",
	null, "2014-04-30T14:50:30Z", "mp", 1);

jst.FYTiskMetodiky.addMethod("renderTiskMetodikyOn:", "html", "rendering", 
	"\tmetodika := Fytoportal navigator ior metodika link." +
	"\n\tsemaforParams := Dictionary new" +
	"\n\t\tat: #metodika put: metodika nazev;" +
	"\n\t\tyourself." +
	"\n\tmetodika plodiny ifNotNilDo: [:pl |" +
	"\n\t\tsemaforParams at: #plodiny put: pl pouzitiPlodiny]." +
	"\n\thtml div class: 'metodika-nazev'; with: metodika nazev." +
	"\n\tmetodika sortedKeys select: [:k | k ~= #plodiny] thenDo: [:k | | kapitola1 |" +
	"\n\t\t\"pestebni opatreni, abionozy, choroby, skludci, plevele, dalsi POR\"" +
	"\n\t\tkapitola1 := metodika at: k." +
	"\n\t\tdataPOR := nil." +
	"\n\t\tkapitola1 id = #plevele ifTrue: [" +
	"\n\t\t\t\"pripravim parametry pro plevele a jine POR, vyuzivam daneho usporadani kapitol\"" +
	"\n\t\t\tsemaforParams := Dictionary new" +
	"\n\t\t\t\tat: #metodika put: metodika nazev;" +
	"\n\t\t\t\tat: #keys put: ((semaforParams at: #plodiny) " +
	"\n\t\t\t\t\tcopyWithAll: Fytoportal data pouzitiVsechnyPlodiny);" +
	"\n\t\t\t\tyourself]." +
	"\n\t\tkapitola1 kapitolyTiskVyber ifNotEmptyDo: [:kapitoly | " +
	"\n\t\t\thtml div " +
	"\n\t\t\t\tclass: 'nazev1';  " +
	"\n\t\t\t\twith: kapitola1 nazev." +
	"\n\t\t\tkapitoly do: [:kap | kapitola1 jeKapitolaSO " +
	"\n\t\t\t\tifFalse: [" +
	"\n\t\t\t\t\t\"mimo skodl. org. tj. pouze plevele\"" +
	"\n\t\t\t\t\tkap renderTextOn: html of: self]" +
	"\n\t\t\t\tifTrue: [" +
	"\n\t\t\t\t\tsemaforParams at: #keys put: kap metodikaSO pouzitiSO." +
	"\n\t\t\t\t\tdataPOR :=  kap metodikaSO nactiSemaforPro: semaforParams pak: nil." +
	"\n\t\t\t\t\thtml div class: 'kapitola-taxon'; with: [" +
	"\n\t\t\t\t\t\tFYTiskTaxonuIOR new " +
	"\n\t\t\t\t\t\t\tkapitola: kap; " +
	"\n\t\t\t\t\t\t\trenderOn: html." +
	"\n\t\t\t\t\t\tkap kapitolyTiskVyber do: [:k1 |" +
	"\n\t\t\t\t\t\t\tk1 renderTextOn: html of: self]" +
	"\n\t\t\t\t\t]" +
	"\n\t\t\t\t]" +
	"\n\t\t\t]" +
	"\n\t\t]" +
	"\n\t]",
	null, "2014-05-07T14:41:02Z", "mp", 1);

jst.FYTiskMetodiky.addMethod("renderTiskMetodikyOn:", "html", "rendering", 
	"\tmetodika := Fytoportal navigator ior metodika link." +
	"\n\tsemaforParams := Dictionary new" +
	"\n\t\tat: #metodika put: metodika nazev;" +
	"\n\t\tyourself." +
	"\n\tmetodika plodiny ifNotNilDo: [:pl |" +
	"\n\t\tsemaforParams at: #plodiny put: pl pouzitiPlodiny]." +
	"\n\thtml div class: 'metodika-nazev'; with: metodika nazev." +
	"\n\tmetodika sortedKeys select: [:k | k ~= #plodiny] thenDo: [:k | | kapitola1 |" +
	"\n\t\t\"pestebni opatreni, abionozy, choroby, skludci, plevele, dalsi POR\"" +
	"\n\t\tkapitola1 := metodika at: k." +
	"\n\t\tdataPOR := nil." +
	"\n\t\tkapitola1 id = #plevele ifTrue: [" +
	"\n\t\t\t\"pripravim parametry pro plevele a jine POR, vyuzivam daneho usporadani kapitol\"" +
	"\n\t\t\tsemaforParams := Dictionary new" +
	"\n\t\t\t\tat: #metodika put: metodika nazev;" +
	"\n\t\t\t\tat: #keys put: ((semaforParams at: #plodiny) " +
	"\n\t\t\t\t\tcopyWithAll: Fytoportal data pouzitiVsechnyPlodiny);" +
	"\n\t\t\t\tyourself]." +
	"\n\t\tkapitola1 kapitolyTiskVyber ifNotEmptyDo: [:kapitoly | " +
	"\n\t\t\thtml div " +
	"\n\t\t\t\tclass: 'nazev1';  " +
	"\n\t\t\t\twith: kapitola1 nazev." +
	"\n\t\t\tkapitoly do: [:kap | kapitola1 jeKapitolaSO " +
	"\n\t\t\t\tifFalse: [" +
	"\n\t\t\t\t\t\"mimo skodl. org. tj. pouze plevele\"" +
	"\n\t\t\t\t\tkap renderTextOn: html of: self]" +
	"\n\t\t\t\tifTrue: [" +
	"\n\t\t\t\t\tsemaforParams at: #keys put: kap metodikaSO pouzitiSO." +
	"\n\t\t\t\t\tdataPOR :=  kap metodikaSO nactiSemaforPro: semaforParams pak: nil." +
	"\n\t\t\t\t\thtml div class: 'kapitola-taxon'; with: [" +
	"\n\t\t\t\t\t\tFYTiskTaxonuIOR new " +
	"\n\t\t\t\t\t\t\tkapitola: kap; " +
	"\n\t\t\t\t\t\t\tbezFotek: bezFotek;" +
	"\n\t\t\t\t\t\t\trenderOn: html." +
	"\n\t\t\t\t\t\tkap kapitolyTiskVyber do: [:k1 |" +
	"\n\t\t\t\t\t\t\tk1 renderTextOn: html of: self]" +
	"\n\t\t\t\t\t]" +
	"\n\t\t\t\t]" +
	"\n\t\t\t]" +
	"\n\t\t]" +
	"\n\t]",
	null, "2014-05-12T12:39:15Z", "mp", 1);

jst.FYTiskMetodiky.addMethod("renderTiskMetodikyOn:", "html", "rendering", 
	"\tmetodika := Fytoportal navigator ior metodika link." +
	"\n\tsemaforParams := metodika semaforParams." +
	"\n\tmetodika plodiny ifNotNilDo: [:pl |" +
	"\n\t\tsemaforParams at: #plodiny put: pl pouzitiPlodiny]." +
	"\n\thtml div class: 'metodika-nazev'; with: metodika nazev." +
	"\n\tmetodika sortedKeys select: [:k | k ~= #plodiny] thenDo: [:k | | kapitola1 |" +
	"\n\t\t\"pestebni opatreni, abionozy, choroby, skludci, plevele, dalsi POR\"" +
	"\n\t\tkapitola1 := metodika at: k." +
	"\n\t\tdataPOR := nil." +
	"\n\t\tkapitola1 id = #plevele ifTrue: [" +
	"\n\t\t\t\"pripravim parametry pro plevele a jine POR, vyuzivam daneho usporadani kapitol\"" +
	"\n\t\t\tsemaforParams := Dictionary new" +
	"\n\t\t\t\tat: #metodika put: metodika nazev;" +
	"\n\t\t\t\tat: #keys put: ((semaforParams at: #plodiny) " +
	"\n\t\t\t\t\tcopyWithAll: Fytoportal data pouzitiVsechnyPlodiny);" +
	"\n\t\t\t\tyourself]." +
	"\n\t\tkapitola1 kapitolyTiskVyber ifNotEmptyDo: [:kapitoly | " +
	"\n\t\t\thtml div " +
	"\n\t\t\t\tclass: 'nazev1';  " +
	"\n\t\t\t\twith: kapitola1 nazev." +
	"\n\t\t\tkapitoly do: [:kap | kapitola1 jeKapitolaSO " +
	"\n\t\t\t\tifFalse: [" +
	"\n\t\t\t\t\t\"mimo skodl. org. tj. pouze plevele\"" +
	"\n\t\t\t\t\tkap renderTextOn: html of: self]" +
	"\n\t\t\t\tifTrue: [" +
	"\n\t\t\t\t\tsemaforParams at: #keys put: kap metodikaSO pouzitiSO." +
	"\n\t\t\t\t\tdataPOR :=  kap metodikaSO nactiSemaforPro: semaforParams pak: nil." +
	"\n\t\t\t\t\thtml div class: 'kapitola-taxon'; with: [" +
	"\n\t\t\t\t\t\tFYTiskTaxonuIOR new " +
	"\n\t\t\t\t\t\t\tkapitola: kap; " +
	"\n\t\t\t\t\t\t\tbezFotek: bezFotek;" +
	"\n\t\t\t\t\t\t\trenderOn: html." +
	"\n\t\t\t\t\t\tkap kapitolyTiskVyber do: [:k1 |" +
	"\n\t\t\t\t\t\t\tk1 renderTextOn: html of: self]" +
	"\n\t\t\t\t\t]" +
	"\n\t\t\t\t]" +
	"\n\t\t\t]" +
	"\n\t\t]" +
	"\n\t]",
	null, "2014-05-22T12:05:54Z", "mp"); //fytoportal-ior

jst.FYTiskMetodiky.addMethod("renderKapitolaPOR:on:", "kap html", "rendering", 
	"\t| data |" +
	"\n\tsemaforParams at: #skodlorg put: taxon kodyZmeny." +
	"\n\tdata := Fytoportal data pripravky nactiSemaforPro: semaforParams pak: nil." +
	"\n\tdata := Fytoportal data pripravky pripravSemaforData: data." +
	"\n\tdata isEmpty ifTrue: [" +
	"\n\t \thtml div class: 'obsah'; with: 'Nebyly nalezeny žádné povolené přípravky.'." +
	"\n\t\t^ self]." +
	"\n\t html table  class: 'obsah semafor'; with: [" +
	"\n\t \thtml tableHead: [html" +
	"\n\t\t\ttableHeading: 'Obchodní název přípravku';" +
	"\n\t\t\ttableHeading: 'Účinná látka';" +
	"\n\t\t\ttableHeading: 'Člověk';" +
	"\n\t\t\ttableHeading: 'Voda';" +
	"\n\t\t\ttableHeading: 'Vodní org.';" +
	"\n\t\t\ttableHeading: 'Půdní org.';" +
	"\n\t\t\ttableHeading: 'Včely';" +
	"\n\t\t\ttableHeading: 'Necil. člen.';" +
	"\n\t\t\ttableHeading: 'Ptáci, savci';" +
	"\n\t\t\ttableHeading: 'Necíl. rostl.';" +
	"\n\t\t\ttableHeading: 'Život. prostř.']." +
	"\n\t\thtml tableBody: [data do: [:prip | " +
	"\n\t\t\thtml tableRow: [" +
	"\n\t\t\t\thtml" +
	"\n\t\t\t\t\ttableData: prip obchJmeno;" +
	"\n\t\t\t\t\ttableData: prip ucinneLatky." +
	"\n\t\t\t\tself renderUdajSemaforu: prip semafor clovek on: html." +
	"\n\t\t\t\tself renderUdajSemaforu: prip semafor vodniZdroje on: html." +
	"\n\t\t\t\tself renderUdajSemaforu: prip semafor vodniOrg on: html." +
	"\n\t\t\t\tself renderUdajSemaforu: prip semafor pudniOrg on: html." +
	"\n\t\t\t\tself renderUdajSemaforu: prip semafor vcely on: html." +
	"\n\t\t\t\tself renderUdajSemaforu: prip semafor necilClenovci on: html." +
	"\n\t\t\t\tself renderUdajSemaforu: prip semafor ptaciSavci on: html." +
	"\n\t\t\t\tself renderUdajSemaforu: prip semafor necilRostliny on: html." +
	"\n\t\t\t\tself renderUdajSemaforu: prip semafor zivotniProstredi on: html" +
	"\n\t\t\t]" +
	"\n\t\t]]" +
	"\n\t ]",
	null, "2014-01-11T23:19:37Z", "mp", 1);

jst.FYTiskMetodiky.addMethod("renderKapitolaPOR:on:", "kap html", "rendering", 
	"\t| data |" +
	"\n\tsemaforParams at: #skodlorg put: taxon kodyZmeny." +
	"\n\tdata := Fytoportal data pripravky nactiSemaforPro: semaforParams pak: nil." +
	"\n\tdata := Fytoportal data pripravky pripravSemaforData: data." +
	"\n\tdata isEmpty ifTrue: [" +
	"\n\t \thtml div class: 'obsah'; with: 'Nebyly nalezeny žádné povolené přípravky.'." +
	"\n\t\t^ self]." +
	"\n\t html table  class: 'obsah semafor'; with: [" +
	"\n\t \thtml tableHead: [html" +
	"\n\t\t\ttableHeading: 'Obchodní název přípravku';" +
	"\n\t\t\ttableHeading: 'Účinná látka';" +
	"\n\t\t\ttableHeading: 'Člověk';" +
	"\n\t\t\ttableHeading: 'Voda';" +
	"\n\t\t\ttableHeading: 'Vodní org.';" +
	"\n\t\t\ttableHeading: 'Půdní org.';" +
	"\n\t\t\ttableHeading: 'Včely';" +
	"\n\t\t\ttableHeading: 'Necil. člen.';" +
	"\n\t\t\ttableHeading: 'Ptáci, savci';" +
	"\n\t\t\ttableHeading: 'Necíl. rostl.';" +
	"\n\t\t\ttableHeading: 'Život. prostř.']." +
	"\n\t\thtml tableBody: [data do: [:prip | " +
	"\n\t\t\thtml tableRow: [" +
	"\n\t\t\t\thtml tableData rowspan: 2; with: prip obchJmeno." +
	"\n\t\t\t\thtml tableData: [html italic: prip ucinneLatky]." +
	"\n\t\t\t\tself renderUdajSemaforu: prip semafor clovek on: html." +
	"\n\t\t\t\tself renderUdajSemaforu: prip semafor vodniZdroje on: html." +
	"\n\t\t\t\tself renderUdajSemaforu: prip semafor vodniOrg on: html." +
	"\n\t\t\t\tself renderUdajSemaforu: prip semafor pudniOrg on: html." +
	"\n\t\t\t\tself renderUdajSemaforu: prip semafor vcely on: html." +
	"\n\t\t\t\tself renderUdajSemaforu: prip semafor necilClenovci on: html." +
	"\n\t\t\t\tself renderUdajSemaforu: prip semafor ptaciSavci on: html." +
	"\n\t\t\t\tself renderUdajSemaforu: prip semafor necilRostliny on: html." +
	"\n\t\t\t\tself renderUdajSemaforu: prip semafor zivotniProstredi on: html" +
	"\n\t\t\t]." +
	"\n\t\t\thtml tableRow: [html tableData colspan: 10; with: [prip pouziti " +
	"\n\t\t\t\tdo: [:pouz | html text: " +
	"\n\t\t\t\t\t('{1}, dávka: {2}, OL: {3}' format: {pouz plodina. pouz davka. pouz ochrLhuta})] " +
	"\n\t\t\t\tseparatedBy: [html br]]]" +
	"\n\t\t]]" +
	"\n\t ]",
	null, "2014-01-16T22:46:59Z", "mp", 1);

jst.FYTiskMetodiky.addMethod("renderKapitolaPOR:on:", "kap html", "rendering", 
	"\t| data |" +
	"\n\ttaxon " +
	"\n\t\tifNotNil: [semaforParams at: #skodlorg put: taxon kodyZmeny]" +
	"\n\t\tifNil: [\"plevele\"" +
	"\n\t\t\tsemaforParams removeKey: #skodlorg ifAbsent: nil]." +
	"\n\tdata := Fytoportal data pripravky nactiSemaforPro: semaforParams pak: nil." +
	"\n\tdata := Fytoportal data pripravky pripravSemaforData: data." +
	"\n\tdata isEmpty ifTrue: [" +
	"\n\t \thtml div class: 'obsah'; with: 'Nebyly nalezeny žádné povolené přípravky.'." +
	"\n\t\t^ self]." +
	"\n\t html table  class: 'obsah semafor'; with: [" +
	"\n\t \thtml tableHead: [html" +
	"\n\t\t\ttableHeading: 'Obchodní název přípravku';" +
	"\n\t\t\ttableHeading: 'Účinná látka';" +
	"\n\t\t\ttableHeading: 'Člověk';" +
	"\n\t\t\ttableHeading: 'Voda';" +
	"\n\t\t\ttableHeading: 'Vodní org.';" +
	"\n\t\t\ttableHeading: 'Půdní org.';" +
	"\n\t\t\ttableHeading: 'Včely';" +
	"\n\t\t\ttableHeading: 'Necil. člen.';" +
	"\n\t\t\ttableHeading: 'Ptáci, savci';" +
	"\n\t\t\ttableHeading: 'Necíl. rostl.';" +
	"\n\t\t\ttableHeading: 'Život. prostř.']." +
	"\n\t\thtml tableBody: [data do: [:prip | " +
	"\n\t\t\thtml tableRow: [" +
	"\n\t\t\t\thtml tableData rowspan: 2; with: prip obchJmeno." +
	"\n\t\t\t\thtml tableData: [html italic: prip ucinneLatky]." +
	"\n\t\t\t\tself renderUdajSemaforu: prip semafor clovek on: html." +
	"\n\t\t\t\tself renderUdajSemaforu: prip semafor vodniZdroje on: html." +
	"\n\t\t\t\tself renderUdajSemaforu: prip semafor vodniOrg on: html." +
	"\n\t\t\t\tself renderUdajSemaforu: prip semafor pudniOrg on: html." +
	"\n\t\t\t\tself renderUdajSemaforu: prip semafor vcely on: html." +
	"\n\t\t\t\tself renderUdajSemaforu: prip semafor necilClenovci on: html." +
	"\n\t\t\t\tself renderUdajSemaforu: prip semafor ptaciSavci on: html." +
	"\n\t\t\t\tself renderUdajSemaforu: prip semafor necilRostliny on: html." +
	"\n\t\t\t\tself renderUdajSemaforu: prip semafor zivotniProstredi on: html" +
	"\n\t\t\t]." +
	"\n\t\t\thtml tableRow: [html tableData colspan: 10; with: [prip pouziti " +
	"\n\t\t\t\tdo: [:pouz | html text: " +
	"\n\t\t\t\t\t('{4} - {1}, dávka: {2}, OL: {3}' format: {pouz plodina. pouz davka. pouz ochrLhuta. pouz skodlOrg})] " +
	"\n\t\t\t\tseparatedBy: [html br]]]" +
	"\n\t\t]]" +
	"\n\t ]",
	null, "2014-02-20T21:47:07Z", "mp", 1);

jst.FYTiskMetodiky.addMethod("renderKapitolaPOR:on:", "kap html", "rendering", 
	"\t| data |" +
	"\n\tdata := Fytoportal data pripravky nactiSemaforPro: semaforParams pak: nil." +
	"\n\tdata := Fytoportal data pripravky pripravSemaforData: data." +
	"\n\tdata isEmpty ifTrue: [" +
	"\n\t \thtml div class: 'obsah'; with: 'Nebyly nalezeny žádné povolené přípravky.'." +
	"\n\t\t^ self]." +
	"\n\t html table  class: 'obsah semafor'; with: [" +
	"\n\t \thtml tableHead: [html" +
	"\n\t\t\ttableHeading: 'Obchodní název přípravku';" +
	"\n\t\t\ttableHeading: 'Účinná látka';" +
	"\n\t\t\ttableHeading: 'Člověk';" +
	"\n\t\t\ttableHeading: 'Voda';" +
	"\n\t\t\ttableHeading: 'Vodní org.';" +
	"\n\t\t\ttableHeading: 'Půdní org.';" +
	"\n\t\t\ttableHeading: 'Včely';" +
	"\n\t\t\ttableHeading: 'Necil. člen.';" +
	"\n\t\t\ttableHeading: 'Ptáci, savci';" +
	"\n\t\t\ttableHeading: 'Necíl. rostl.';" +
	"\n\t\t\ttableHeading: 'Život. prostř.']." +
	"\n\t\thtml tableBody: [data do: [:prip | " +
	"\n\t\t\thtml tableRow: [" +
	"\n\t\t\t\thtml tableData rowspan: 2; with: prip obchJmeno." +
	"\n\t\t\t\thtml tableData: [html italic: prip ucinneLatky]." +
	"\n\t\t\t\tself renderUdajSemaforu: prip semafor clovek on: html." +
	"\n\t\t\t\tself renderUdajSemaforu: prip semafor vodniZdroje on: html." +
	"\n\t\t\t\tself renderUdajSemaforu: prip semafor vodniOrg on: html." +
	"\n\t\t\t\tself renderUdajSemaforu: prip semafor pudniOrg on: html." +
	"\n\t\t\t\tself renderUdajSemaforu: prip semafor vcely on: html." +
	"\n\t\t\t\tself renderUdajSemaforu: prip semafor necilClenovci on: html." +
	"\n\t\t\t\tself renderUdajSemaforu: prip semafor ptaciSavci on: html." +
	"\n\t\t\t\tself renderUdajSemaforu: prip semafor necilRostliny on: html." +
	"\n\t\t\t\tself renderUdajSemaforu: prip semafor zivotniProstredi on: html" +
	"\n\t\t\t]." +
	"\n\t\t\thtml tableRow: [html tableData colspan: 10; with: [prip pouziti " +
	"\n\t\t\t\tdo: [:pouz | html text: " +
	"\n\t\t\t\t\t('{4} - {1}, dávka: {2}, OL: {3}' format: {pouz plodina. pouz davka. pouz ochrLhuta. pouz skodlOrg})] " +
	"\n\t\t\t\tseparatedBy: [html br]]]" +
	"\n\t\t]]" +
	"\n\t ]",
	null, "2014-03-07T16:07:50Z", "mp", 1);

jst.FYTiskMetodiky.addMethod("renderKapitolaPOR:on:", "kap html", "rendering", 
	"\t| data |" +
	"\n\tdata := kap nactiSemaforPro: semaforParams pak: nil." +
	"\n\tdata isEmpty ifTrue: [" +
	"\n\t \thtml div class: 'obsah'; with: 'Nebyly nalezeny žádné povolené přípravky.'." +
	"\n\t\t^ self]." +
	"\n\t html table  class: 'obsah semafor'; with: [" +
	"\n\t \thtml tableHead: [html" +
	"\n\t\t\ttableHeading: 'Obchodní název přípravku';" +
	"\n\t\t\ttableHeading: 'Účinná látka';" +
	"\n\t\t\ttableHeading: 'Člověk';" +
	"\n\t\t\ttableHeading: 'Voda';" +
	"\n\t\t\ttableHeading: 'Vodní org.';" +
	"\n\t\t\ttableHeading: 'Půdní org.';" +
	"\n\t\t\ttableHeading: 'Včely';" +
	"\n\t\t\ttableHeading: 'Necil. člen.';" +
	"\n\t\t\ttableHeading: 'Ptáci, savci';" +
	"\n\t\t\ttableHeading: 'Necíl. rostl.';" +
	"\n\t\t\ttableHeading: 'Život. prostř.']." +
	"\n\t\thtml tableBody: [data do: [:prip | " +
	"\n\t\t\thtml tableRow: [" +
	"\n\t\t\t\thtml tableData rowspan: 2; with: prip obchJmeno." +
	"\n\t\t\t\thtml tableData: [html italic: prip ucinneLatky]." +
	"\n\t\t\t\tself renderUdajSemaforu: prip semafor clovek on: html." +
	"\n\t\t\t\tself renderUdajSemaforu: prip semafor vodniZdroje on: html." +
	"\n\t\t\t\tself renderUdajSemaforu: prip semafor vodniOrg on: html." +
	"\n\t\t\t\tself renderUdajSemaforu: prip semafor pudniOrg on: html." +
	"\n\t\t\t\tself renderUdajSemaforu: prip semafor vcely on: html." +
	"\n\t\t\t\tself renderUdajSemaforu: prip semafor necilClenovci on: html." +
	"\n\t\t\t\tself renderUdajSemaforu: prip semafor ptaciSavci on: html." +
	"\n\t\t\t\tself renderUdajSemaforu: prip semafor necilRostliny on: html." +
	"\n\t\t\t\tself renderUdajSemaforu: prip semafor zivotniProstredi on: html" +
	"\n\t\t\t]." +
	"\n\t\t\thtml tableRow: [html tableData colspan: 10; with: [prip pouziti " +
	"\n\t\t\t\tdo: [:pouz | html text: " +
	"\n\t\t\t\t\t('{4} - {1}, dávka: {2}, OL: {3}' format: {pouz plodina. pouz davka. pouz ochrLhuta. pouz skodlOrg})] " +
	"\n\t\t\t\tseparatedBy: [html br]]]" +
	"\n\t\t]]" +
	"\n\t ]",
	null, "2014-03-18T21:17:46Z", "mp", 1);

jst.FYTiskMetodiky.addMethod("renderKapitolaPOR:on:", "kap html", "rendering", 
	"\t| data kapId semafor |" +
	"\n\tkapId := kap id." +
	"\n\tsemafor := (kapId endsWith: #ripravky) or: [kapId endsWith: #dozravani]." +
	"\n\tdataPOR ifNil: [" +
	"\n\t\t\"pouze pro plevele a ostatni POR, pouze jednou\"" +
	"\n\t\tdataPOR :=  kap nactiSemaforPro: semaforParams pak: nil]." +
	"\n\tdata := dataPOR at: kapId." +
	"\n\tdata isEmpty ifTrue: [" +
	"\n\t\t(kapId startsWith: #monitoring) ifFalse: [" +
	"\n\t \t\thtml div class: 'obsah'; with: 'Nebyly nalezeny žádné povolené přípravky.']." +
	"\n\t\t^ self]." +
	"\n\t(kapId startsWith: #monitoring) ifTrue: [" +
	"\n\t\thtml div class: 'nazev3'; with: 'Monitorovací pomůcky']." +
	"\n\t html table  class: 'obsah semafor'; with: [" +
	"\n\t \thtml tableHead: [" +
	"\n\t\t\thtml" +
	"\n\t\t\t\ttableHeading: 'Obchodní název přípravku';" +
	"\n\t\t\t\ttableHeading: 'Účinná látka'." +
	"\n\t\t\tsemafor ifFalse: [" +
	"\n\t\t\t\thtml tableHeading colspan: 9; with: 'Biologická funkce'" +
	"\n\t\t\t] ifTrue: [html" +
	"\n\t\t\t\ttableHeading: 'Člověk';" +
	"\n\t\t\t\ttableHeading: 'Voda';" +
	"\n\t\t\t\ttableHeading: 'Vodní org.';" +
	"\n\t\t\t\ttableHeading: 'Půdní org.';" +
	"\n\t\t\t\ttableHeading: 'Včely';" +
	"\n\t\t\t\ttableHeading: 'Necil. člen.';" +
	"\n\t\t\t\ttableHeading: 'Ptáci, savci';" +
	"\n\t\t\t\ttableHeading: 'Necíl. rostl.';" +
	"\n\t\t\t\ttableHeading: 'Život. prostř.']" +
	"\n\t\t]." +
	"\n\t\thtml tableBody: [data do: [:prip | " +
	"\n\t\t\thtml tableRow: [" +
	"\n\t\t\t\thtml tableData rowspan: 2; with: prip obchJmeno." +
	"\n\t\t\t\thtml tableData: [html italic: prip ucinneLatky]." +
	"\n\t\t\t\tsemafor ifFalse: [" +
	"\n\t\t\t\t\thtml tableData colspan: 9; with: prip biologFunkce asCSVString" +
	"\n\t\t\t\t] ifTrue: [" +
	"\n\t\t\t\t\tself renderUdajSemaforu: prip semafor clovek on: html." +
	"\n\t\t\t\t\tself renderUdajSemaforu: prip semafor vodniZdroje on: html." +
	"\n\t\t\t\t\tself renderUdajSemaforu: prip semafor vodniOrg on: html." +
	"\n\t\t\t\t\tself renderUdajSemaforu: prip semafor pudniOrg on: html." +
	"\n\t\t\t\t\tself renderUdajSemaforu: prip semafor vcely on: html." +
	"\n\t\t\t\t\tself renderUdajSemaforu: prip semafor necilClenovci on: html." +
	"\n\t\t\t\t\tself renderUdajSemaforu: prip semafor ptaciSavci on: html." +
	"\n\t\t\t\t\tself renderUdajSemaforu: prip semafor necilRostliny on: html." +
	"\n\t\t\t\t\tself renderUdajSemaforu: prip semafor zivotniProstredi on: html" +
	"\n\t\t\t\t]\t" +
	"\n\t\t\t]." +
	"\n\t\t\thtml tableRow: [html tableData colspan: 10; with: [" +
	"\n\t\t\t\tprip pouziti do: [:pouz | " +
	"\n\t\t\t\t\thtml text: pouz skodlOrg asString, ' - ', pouz plodina asString." +
	"\n\t\t\t\t\tpouz davka isEmptyOrNil ifFalse: [" +
	"\n\t\t\t\t\t\thtml text: ', dávka: ', pouz davka]." +
	"\n\t\t\t\t\tpouz ochrLhuta isEmptyOrNil ifFalse: [" +
	"\n\t\t\t\t\t\thtml text: ', OL: ', pouz ochrLhuta]." +
	"\n\t\t\t\t] separatedBy: [html br]]]" +
	"\n\t\t]]" +
	"\n\t ]",
	null, "2014-04-25T13:05:56Z", "mp", 1);

jst.FYTiskMetodiky.addMethod("renderKapitolaPOR:on:", "kap html", "rendering", 
	"\t| data kapId semafor |" +
	"\n\tkapId := kap id." +
	"\n\tsemafor := (kapId endsWith: #ripravky) or: [kapId endsWith: #dozravani]." +
	"\n\tdataPOR ifNil: [" +
	"\n\t\t\"pouze pro plevele a ostatni POR, pouze jednou\"" +
	"\n\t\tdataPOR :=  kap nactiSemaforPro: semaforParams pak: nil]." +
	"\n\tdata := dataPOR at: kapId." +
	"\n\tdata isEmpty ifTrue: [" +
	"\n\t\t(kapId startsWith: #monitoring) ifFalse: [" +
	"\n\t \t\thtml div class: 'obsah'; with: 'Nebyly nalezeny žádné povolené přípravky v Registru přípravků na ochranu rostlin.']." +
	"\n\t\t^ self]." +
	"\n\t(kapId startsWith: #monitoring) ifTrue: [" +
	"\n\t\thtml div class: 'nazev3'; with: 'Monitorovací pomůcky']." +
	"\n\t html table  class: 'obsah semafor'; with: [" +
	"\n\t \thtml tableHead: [" +
	"\n\t\t\thtml" +
	"\n\t\t\t\ttableHeading: 'Obchodní název přípravku';" +
	"\n\t\t\t\ttableHeading: 'Účinná látka'." +
	"\n\t\t\tsemafor ifFalse: [" +
	"\n\t\t\t\thtml tableHeading colspan: 9; with: 'Biologická funkce'" +
	"\n\t\t\t] ifTrue: [html" +
	"\n\t\t\t\ttableHeading: 'Člověk';" +
	"\n\t\t\t\ttableHeading: 'Voda';" +
	"\n\t\t\t\ttableHeading: 'Vodní org.';" +
	"\n\t\t\t\ttableHeading: 'Půdní org.';" +
	"\n\t\t\t\ttableHeading: 'Včely';" +
	"\n\t\t\t\ttableHeading: 'Necil. člen.';" +
	"\n\t\t\t\ttableHeading: 'Ptáci, savci';" +
	"\n\t\t\t\ttableHeading: 'Necíl. rostl.';" +
	"\n\t\t\t\ttableHeading: 'Život. prostř.']" +
	"\n\t\t]." +
	"\n\t\thtml tableBody: [data do: [:prip | " +
	"\n\t\t\thtml tableRow: [" +
	"\n\t\t\t\thtml tableData rowspan: 2; with: prip obchJmeno." +
	"\n\t\t\t\thtml tableData: [html italic: prip ucinneLatky]." +
	"\n\t\t\t\tsemafor ifFalse: [" +
	"\n\t\t\t\t\thtml tableData colspan: 9; with: prip biologFunkce asCSVString" +
	"\n\t\t\t\t] ifTrue: [" +
	"\n\t\t\t\t\tself renderUdajSemaforu: prip semafor clovek on: html." +
	"\n\t\t\t\t\tself renderUdajSemaforu: prip semafor vodniZdroje on: html." +
	"\n\t\t\t\t\tself renderUdajSemaforu: prip semafor vodniOrg on: html." +
	"\n\t\t\t\t\tself renderUdajSemaforu: prip semafor pudniOrg on: html." +
	"\n\t\t\t\t\tself renderUdajSemaforu: prip semafor vcely on: html." +
	"\n\t\t\t\t\tself renderUdajSemaforu: prip semafor necilClenovci on: html." +
	"\n\t\t\t\t\tself renderUdajSemaforu: prip semafor ptaciSavci on: html." +
	"\n\t\t\t\t\tself renderUdajSemaforu: prip semafor necilRostliny on: html." +
	"\n\t\t\t\t\tself renderUdajSemaforu: prip semafor zivotniProstredi on: html" +
	"\n\t\t\t\t]\t" +
	"\n\t\t\t]." +
	"\n\t\t\thtml tableRow: [html tableData colspan: 10; with: [" +
	"\n\t\t\t\tprip pouziti do: [:pouz | " +
	"\n\t\t\t\t\thtml text: pouz skodlOrg asString, ' - ', pouz plodina asString." +
	"\n\t\t\t\t\tpouz davka isEmptyOrNil ifFalse: [" +
	"\n\t\t\t\t\t\thtml text: ', dávka: ', pouz davka]." +
	"\n\t\t\t\t\tpouz ochrLhuta isEmptyOrNil ifFalse: [" +
	"\n\t\t\t\t\t\thtml text: ', OL: ', pouz ochrLhuta]." +
	"\n\t\t\t\t] separatedBy: [html br]]]" +
	"\n\t\t]]" +
	"\n\t ]",
	null, "2014-04-28T14:48:41Z", "mp", 1);

jst.FYTiskMetodiky.addMethod("renderKapitolaPOR:on:", "kap html", "rendering", 
	"\t| data kapId semafor |" +
	"\n\tkapId := kap id." +
	"\n\tsemafor := (kapId endsWith: #ripravky) or: [kapId endsWith: #dozravani]." +
	"\n\tdataPOR ifNil: [" +
	"\n\t\t\"pouze pro plevele a ostatni POR, pouze jednou\"" +
	"\n\t\tdataPOR :=  kap nactiSemaforPro: semaforParams pak: nil]." +
	"\n\tdata := dataPOR at: kapId." +
	"\n\tdata isEmpty ifTrue: [" +
	"\n\t\t(kapId startsWith: #monitoring) ifFalse: [" +
	"\n\t \t\thtml div class: 'obsah Apple-tab-span'; " +
	"\n\t\t\t\twith: 'Nebyly nalezeny žádné povolené přípravky v Registru přípravků na ochranu rostlin.']." +
	"\n\t\t^ self]." +
	"\n\t(kapId startsWith: #monitoring) ifTrue: [" +
	"\n\t\thtml div class: 'nazev3'; with: 'Monitorovací pomůcky']." +
	"\n\t html table  class: 'obsah semafor'; with: [" +
	"\n\t \thtml tableHead: [" +
	"\n\t\t\thtml" +
	"\n\t\t\t\ttableHeading: 'Obchodní název přípravku';" +
	"\n\t\t\t\ttableHeading: 'Účinná látka'." +
	"\n\t\t\tsemafor ifFalse: [" +
	"\n\t\t\t\thtml tableHeading colspan: 9; with: 'Biologická funkce'" +
	"\n\t\t\t] ifTrue: [html" +
	"\n\t\t\t\ttableHeading: 'Člověk';" +
	"\n\t\t\t\ttableHeading: 'Voda';" +
	"\n\t\t\t\ttableHeading: 'Vodní org.';" +
	"\n\t\t\t\ttableHeading: 'Půdní org.';" +
	"\n\t\t\t\ttableHeading: 'Včely';" +
	"\n\t\t\t\ttableHeading: 'Necil. člen.';" +
	"\n\t\t\t\ttableHeading: 'Ptáci, savci';" +
	"\n\t\t\t\ttableHeading: 'Necíl. rostl.';" +
	"\n\t\t\t\ttableHeading: 'Život. prostř.']" +
	"\n\t\t]." +
	"\n\t\thtml tableBody: [data do: [:prip | " +
	"\n\t\t\thtml tableRow: [" +
	"\n\t\t\t\thtml tableData rowspan: 2; with: prip obchJmeno." +
	"\n\t\t\t\thtml tableData: [html italic: prip ucinneLatky]." +
	"\n\t\t\t\tsemafor ifFalse: [" +
	"\n\t\t\t\t\thtml tableData colspan: 9; with: prip biologFunkce asCSVString" +
	"\n\t\t\t\t] ifTrue: [" +
	"\n\t\t\t\t\tself renderUdajSemaforu: prip semafor clovek on: html." +
	"\n\t\t\t\t\tself renderUdajSemaforu: prip semafor vodniZdroje on: html." +
	"\n\t\t\t\t\tself renderUdajSemaforu: prip semafor vodniOrg on: html." +
	"\n\t\t\t\t\tself renderUdajSemaforu: prip semafor pudniOrg on: html." +
	"\n\t\t\t\t\tself renderUdajSemaforu: prip semafor vcely on: html." +
	"\n\t\t\t\t\tself renderUdajSemaforu: prip semafor necilClenovci on: html." +
	"\n\t\t\t\t\tself renderUdajSemaforu: prip semafor ptaciSavci on: html." +
	"\n\t\t\t\t\tself renderUdajSemaforu: prip semafor necilRostliny on: html." +
	"\n\t\t\t\t\tself renderUdajSemaforu: prip semafor zivotniProstredi on: html" +
	"\n\t\t\t\t]\t" +
	"\n\t\t\t]." +
	"\n\t\t\thtml tableRow: [html tableData colspan: 10; with: [" +
	"\n\t\t\t\tprip pouziti do: [:pouz | " +
	"\n\t\t\t\t\thtml text: pouz skodlOrg asString, ' - ', pouz plodina asString." +
	"\n\t\t\t\t\tpouz davka isEmptyOrNil ifFalse: [" +
	"\n\t\t\t\t\t\thtml text: ', dávka: ', pouz davka]." +
	"\n\t\t\t\t\tpouz ochrLhuta isEmptyOrNil ifFalse: [" +
	"\n\t\t\t\t\t\thtml text: ', OL: ', pouz ochrLhuta]." +
	"\n\t\t\t\t] separatedBy: [html br]]]" +
	"\n\t\t]]" +
	"\n\t ]",
	null, "2014-05-14T09:57:37Z", "mp"); //fytoportal-ior

jst.FYTiskMetodiky.addMethod("renderUdajSemaforu:on:", "hodn html", "rendering", 
	"\thtml tableData class: 'udaj'; with:  (" +
	"\n\t\thodn = 0 | hodn isNil " +
	"\n\t\t\tifTrue: ['-']" +
	"\n\t\t\tifFalse: [#ABC at: hodn asNumber])" +
	"\n\t\t",
	null, "2014-01-11T23:24:58Z", "mp");

// *** FYVyberKapitolPM ***

jst.FYVyberKapitol.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tvalue := false",
	null, "2013-10-01T07:53:51Z", "mp");

jst.FYVyberKapitol.addMethod("value", "", "accessing", 
	"\t^ value",
	null, "2013-10-01T07:53:26Z", "mp");

jst.FYVyberKapitol.addMethod("value:", "aBoolean", "accessing", 
	"\tvalue := aBoolean",
	null, "2013-10-01T09:09:43Z", "mp");

jst.FYVyberKapitol.addMethod("printOn:", "aStream", "printing", 
	"\tself isEmpty ifTrue: [" +
	"\n\t\taStream print: value" +
	"\n\t] ifFalse: [" +
	"\n\t\taStream nextPut: $[; " +
	"\n\t\t\tprint: value; " +
	"\n\t\t\tnextPutAll: ', '." +
	"\n\t\tself keysSortedSafely do: [:key | " +
	"\n\t\t\taStream print: key;" +
	"\n\t\t\t\t nextPutAll: ': ';" +
	"\n\t\t\t\t print: (self at: key)" +
	"\n\t\t\t] separatedBy: [aStream space]." +
	"\n\t\taStream nextPut: $]" +
	"\n\t]",
	null, "2013-10-01T20:40:27Z", "mp");

jst.FYVyberKapitol.addMethod("jeVybrana:", "stream", "testing", 
	"\t^ stream atEnd " +
	"\n\t\tifTrue: value" +
	"\n\t\tifFalse: [self jeVybrana: (stream upTo: '.') podkap: stream]",
	null, "2013-10-01T19:16:11Z", "mp");

jst.FYVyberKapitol.addMethod("jeVybrana:podkap:", "kap stream", "testing", 
	"\t^ (self at: kap ifPresent: [:vyb | vyb jeVybrana: stream]) ifNil: [false]",
	null, "2013-10-01T19:15:05Z", "mp");

jst.FYVyberKapitol.addMethod("textZmenenVyberem:", "kapId", "testing", 
	"\t^ kapId = #vse or: ((self jeVybrana: 'vse' readStream) not and: [" +
	"\n\t\t\"klikl jsem na 'vsechny kapitoly' nebo zadna nadrazena kapitola neni vybrana\"" +
	"\n\t\t| podkap nadraz |" +
	"\n\t\tpodkap := kapId readStream." +
	"\n\t\tnadraz := self." +
	"\n\t\t[\tnadraz := nadraz at: (podkap upTo: '.')." +
	"\n\t\t\tnadraz value not and: [podkap atEnd not]" +
	"\n\t\t] whileTrue." +
	"\n\t\t\"cili kdyz jsem klikl na posledni kapitolu v dane casti stromu a zadna nadrazena kapitola nebyla vybrana\"" +
	"\n\t\tpodkap atEnd" +
	"\n\t])",
	null, "2013-10-03T16:05:42Z", "mp");

// *** FYVyberKapitolPM ***

jst.FYVyberKapitolPM.addMethod("initialize", "", "initialization", 
	"\tkapitoly := FYVyberKapitol new",
	null, "2013-10-01T14:03:27Z", "mp");

jst.FYVyberKapitolPM.addMethod("keys", "", "accessing", 
	"\t^ kapitoly keys",
	null, "2013-10-01T14:57:57Z", "mp");

jst.FYVyberKapitolPM.addMethod("at:ifAbsent:", "key aBlock", "accessing", 
	"\t^ kapitoly at: key ifAbsent: aBlock",
	null, "2013-10-01T14:59:35Z", "mp");

jst.FYVyberKapitolPM.addMethod("kapitola:podkapitola:vyber:", "kap podkap aBoolean", "accessing", 
	"\t| vyb |" +
	"\n\t\"kap je vzdy kapitola prvni urovne\"" +
	"\n\tvyb := kapitoly at: kap ifAbsentPut: [FYVyberKapitol new]." +
	"\n\tpodkap ifNotNil: [ | str |" +
	"\n\t\tstr := (podkap findTokens: '@.') readStream." +
	"\n\t\t(podkap startsWith: kap) ifTrue: [" +
	"\n\t\t\tstr next]." +
	"\n\t\t[str atEnd] whileFalse: [" +
	"\n\t\t\tvyb := vyb at: str next ifAbsentPut:  [FYVyberKapitol new]]" +
	"\n\t]." +
	"\n\tvyb value: aBoolean." +
	"\n\t^ aBoolean",
	null, "2013-10-01T15:05:07Z", "mp");

jst.FYVyberKapitolPM.addMethod("kapitola:jeVybrana:", "kap podkap", "testing", 
	"\t| str |" +
	"\n\tstr := podkap readStream." +
	"\n\t^ (podkap startsWith: kap) " +
	"\n\t\tifTrue: [" +
	"\n\t\t\tstr skipTo: '.'." +
	"\n\t\t\t(kapitoly at: kap) jeVybrana: str" +
	"\n\t\t] ifFalse: [(podkap includes: #'@') " +
	"\n\t\t\tifFalse: [(kapitoly at: kap) jeVybrana: str] " +
	"\n\t\t\tifTrue: [(kapitoly at: kap) jeVybrana: (str upTo: '@') podkap: str]]",
	null, "2013-10-01T19:18:03Z", "mp");

jst.FYVyberKapitolPM.addMethod("inspectorClass", "", "private", 
	"\t\"pouzivam jen pri vyvoji, v runtime nebude trida dostupna\"" +
	"\n\t^ Smalltalk classNamed: #DictionaryInspector",
	null, "2013-10-01T20:38:13Z", "mp");

jst.FYVyberKapitolPM.addMethod("kodyPlodin", "", "accessing", 
	"\t\"kody vybranych plodin dane metodiky, pouze pokud neni vse\"" +
	"\n\t^ self plodiny value ifFalse: [kodyPlodin ifNil: [" +
	"\n\t\t| vyber |" +
	"\n\t\tvyber := self plodiny." +
	"\n\t\tvyber := vyber keys select: [:pl | (vyber at: pl) value]." +
	"\n\t\tkodyPlodin := (Fytoportal data plodiny kody lookupKeys: vyber) " +
	"\n\t\t\tinject: SortedCollection new " +
	"\n\t\t\tinto: [:coll :row | " +
	"\n\t\t\t\tcoll addUnique: row value; yourself]" +
	"\n\t]]",
	null, "2014-03-06T10:20:49Z", "mp");

jst.FYVyberKapitolPM.addMethod("plodinyVcetneNadraz", "", "accessing", 
	"\t^ plodinyVcetneNadraz ifNil: [" +
	"\n\t\t| kodyVcetneNadraz |" +
	"\n\t\t\"ke kodum vybranych plodin pridam nadrazene kody\"" +
	"\n\t\tkodyVcetneNadraz := Fytoportal data epptKody pridejNadrazene: self kodyPlodin." +
	"\n\t\t\"nactu id vybranych plodin znovu (pro jednoduchost), tentokrat vcetne nadrazenych\"" +
	"\n\t\tplodinyVcetneNadraz := (Fytoportal data plodiny podleKodu lookupKeys: kodyVcetneNadraz) collect: [:row | row id]]",
	null, "2014-03-06T11:39:43Z", "mp");

jst.FYVyberKapitolPM.addMethod("zmenenTextKap:vyberem:", "kapitola kapId", "testing", 
	"\t| vyb |" +
	"\n\t\"pouze obsah kapitoly 1. urovne; u plodin, skudcu atd. zmena seznamu taxonu" +
	"\n\t\tkapId je id uzlu, na ktery jsem klikl\"" +
	"\n\t(kapId endsWith: #vse) ifTrue: [" +
	"\n\t\t\"uplatni se jen pri zmene textu vybraneho SO\"" +
	"\n\t\t^ false]." +
	"\n\tkapitola id = kapId ifTrue: [" +
	"\n\t\t\"klikl jsem na 'vsechny kapitoly'\"" +
	"\n\t\t^ true]." +
	"\n\tvyb := kapitoly at: kapitola id." +
	"\n\t^ kapitola jeKapitolaTaxony ifTrue: [" +
	"\n\t\t\"vse neni vybrano a klikl jsem na nazev SO, tj. kapId jsem nasel na prvni urovni ve vyb\"" +
	"\n\t\tvyb value not and: [(vyb at: kapId ifAbsent: nil) notNil]" +
	"\n\t] ifFalse: [" +
	"\n\t\t\"klikl jsem na jinou kapitolu\"" +
	"\n\t\tvyb textZmenenVyberem: (kapId copyAfter: '.')]",
	null, "2013-10-03T11:58:01Z", "mp", 1);

jst.FYVyberKapitolPM.addMethod("zmenenTextKap:vyberem:", "kapitola kapId", "testing", 
	"\t| vyb zmenen |" +
	"\n\t\"pouze obsah kapitoly 1. urovne; u plodin, skudcu atd. zmena seznamu taxonu" +
	"\n\t\tkapId je id uzlu, na ktery jsem klikl\"" +
	"\n\t(kapId endsWith: #vse) ifTrue: [" +
	"\n\t\t\"uplatni se jen pri zmene textu vybraneho SO\"" +
	"\n\t\t^ false]." +
	"\n\tkapitola id = kapId ifTrue: [" +
	"\n\t\t\"klikl jsem na 'vsechny kapitoly'\"" +
	"\n\t\t^ true]." +
	"\n\tvyb := kapitoly at: kapitola id." +
	"\n\tzmenen := kapitola jeKapitolaTaxony ifTrue: [" +
	"\n\t\t\"vse neni vybrano a klikl jsem na nazev SO, tj. kapId jsem nasel na prvni urovni ve vyb\"" +
	"\n\t\tvyb value not and: [(vyb at: kapId ifAbsent: nil) notNil]" +
	"\n\t] ifFalse: [" +
	"\n\t\t\"klikl jsem na jinou kapitolu\"" +
	"\n\t\tvyb textZmenenVyberem: (kapId copyAfter: '.')]." +
	"\n\t(kapitola id = #plodiny and: [zmenen | vyb value]) ifTrue: [" +
	"\n\t\t\"reset vybranych kodu i plodin, nactou se, az bude potreba\"" +
	"\n\t\tkodyPlodin := nil." +
	"\n\t\tplodinyVcetneNadraz := nil]." +
	"\n\t^ zmenen",
	null, "2014-03-06T11:45:00Z", "mp"); //fytoportal-ior

jst.FYVyberKapitolPM.addMethod("zmenenTextKapSO:vyberem:", "kapitola kapId", "testing", 
	"\t\"kapitola skudce/choroby/abionozy\"" +
	"\n\t(kapId size > kapitola id and: [kapId startsWith: kapitola id]) ifTrue: [ | podkap |" +
	"\n\t\t\"klikam do kapitol vybraneho SO\"" +
	"\n\t\tpodkap := kapId copyAfter: #'@'." +
	"\n\t\t^  ((kapitoly at: kapitola parent id) jeVybrana: podkap readStream) not and: [" +
	"\n\t\t\t((kapitoly at: kapitola parent id) at: kapitola id) textZmenenVyberem: podkap]]." +
	"\n\t(kapitola parent id = kapId and: [kapId startsWith: kapitola parent id]) ifTrue: [" +
	"\n\t\t\"klikam do kapitol obecne casti\"" +
	"\n\t\t^ (kapitoly at: kapitola parent id) textZmenenVyberem: (kapId copyAfter: '.')]." +
	"\n\t^ false",
	null, "2013-10-03T15:45:42Z", "mp", 1);

jst.FYVyberKapitolPM.addMethod("zmenenTextKapSO:vyberem:", "kapitola kapId", "testing", 
	"\t\"kapitola skudce/choroby/abionozy\"" +
	"\n\t(kapId size > kapitola id size and: [kapId startsWith: kapitola id]) ifTrue: [ | podkap |" +
	"\n\t\t\"klikam do kapitol vybraneho SO\"" +
	"\n\t\tpodkap := kapId copyAfter: #'@'." +
	"\n\t\t^  ((kapitoly at: kapitola parent id) jeVybrana: podkap readStream) not and: [" +
	"\n\t\t\t((kapitoly at: kapitola parent id) at: kapitola id) textZmenenVyberem: podkap]]." +
	"\n\t(kapId size > kapitola parent id size and: [kapId startsWith: kapitola parent id]) ifTrue: [" +
	"\n\t\t\"klikam do kapitol obecne casti\"" +
	"\n\t\t^ (kapitoly at: kapitola parent id) textZmenenVyberem: (kapId copyAfter: '.')]." +
	"\n\t^ false",
	null, "2013-10-04T12:46:30Z", "mp");

/* k nicemu
jst.FYVyberKapitolPM.addMethod("tisknoutPodkapitolu:kapitolySO:", "kapId kapitola", "testing", 
	"\t\"vybrana kapitola skudce/choroby/abionozy" +
	"\n\tnejdrive testuji, zda je vybran dany skudce\"" +
	"\n\t^ ((self jeVybrana: kapitola parent id) or: [self jeVybrana: kapitola id]) and: [" +
	"\n\t\t(self tisknoutPodkapitolu: kapId kapitoly: kapitola parent id, '.') or: [" +
	"\n\t\tself tisknoutPodkapitolu: kapId kapitoly: kapitola id, #'@']]",
	null, "2013-09-30T13:10:07Z", "mp"); //fytoportal-ior

jst.FYVyberKapitolPM.addMethod("tisknoutPodkapitolu:kapitoly:", "kapId kapitola", "testing", 
	"\t| vse |" +
	"\n\tvse := kapitola isString " +
	"\n\t\tifFalse: [kapitola id] " +
	"\n\t\tifTrue: [kapitola, #vse]." +
	"\n\t^ (self jeVybrana: vse) or: [" +
	"\n\t\t| casti nadraz |" +
	"\n\t\tcasti := kapId findTokens: '.'." +
	"\n\t\tnadraz := casti removeFirst." +
	"\n\t\t(vse startsWith: nadraz) & (casti size > 0) ifTrue: [" +
	"\n\t\t\t\"nejvyssi uroven uz znovu nekontroluji\"" +
	"\n\t\t\tnadraz := nadraz, '.', casti removeFirst]." +
	"\n\t\t[casti size > 0 and: [(self jeVybrana: nadraz) not]] " +
	"\n\t\t\twhileTrue: [nadraz := nadraz, '.', casti removeFirst]." +
	"\n\t\tcasti size > 0 or: [self jeVybrana: nadraz]]",
	null, "2013-09-30T13:21:10Z", "mp"); //fytoportal-ior
*/

jst.FYVyberKapitolPM.addMethod("plodiny", "", "accessing", 
	"\t^ kapitoly at: #plodiny",
	null, "2014-01-11T17:48:32Z", "mp");

// *** FYSkodlOrgPM ***

jst.FYSkodlOrgPM.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tzmenaFotky := Dictionary new",
	null, "2014-03-14T13:28:06Z", "mp");

jst.FYSkodlOrgPM.addMethod("id", "", "accessing", 
	"\t^ self linkId",
	null, "2014-03-12T20:05:04Z", "mp");

jst.FYSkodlOrgPM.addMethod("jsonKeys", "", "private", 
	"\t^ super jsonKeys copyWithout: #taxony",
	null, "2014-03-07T14:33:38Z", "mp", 1);

jst.FYSkodlOrgPM.addMethod("jsonKeys", "", "private", 
	"\t^ super jsonKeys copyWithoutAll: #(taxony vychoziFotka zmenaFotky)",
	null, "2014-03-10T12:42:17Z", "mp"); //fytoportal-ior

jst.FYSkodlOrgPM.addMethod("fotka", "", "accessing", 
	"\t^ fotka",
	null, "2014-03-06T15:02:17Z", "mp", 1);

jst.FYSkodlOrgPM.addMethod("fotka", "", "accessing", 
	"\t^ zmenaFotky ifNil: [fotka ifString: [" +
	"\n\t\tfotka := Fytoportal db loadObject: fotka]]",
	null, "2014-03-10T12:38:28Z", "mp", 2);

jst.FYSkodlOrgPM.addMethod("fotka", "", "accessing", 
	"\t^ zmenaFotky at: #fotka ifAbsent: [fotka ifString: [" +
	"\n\t\tfotka := Fytoportal db loadObject: fotka]]",
	null, "2014-03-14T13:29:38Z", "mp"); //fytoportal-ior

jst.FYSkodlOrgPM.addMethod("fotkaId", "", "accessing", 
	"\t^ (zmenaFotky at: #fotka ifAbsent: [fotka]) ifNotNilDo: [:f |" +
	"\n\t\tf ifNotString: [f id]]",
	null, "2014-04-17T14:49:49Z", "mp");

jst.FYSkodlOrgPM.addMethod("vychoziFotka", "", "accessing", 
	"\t\"v tuto chvili stejne vykresluji obsah, odkazovanou metodiku SO tedy musim nacit\"" +
	"\n\t^ self link vychoziFotka",
	null, "2014-03-07T22:44:19Z", "mp", 1);

jst.FYSkodlOrgPM.addMethod("vychoziFotka", "", "accessing", 
	"\t^ vychoziFotka ifNil: [" +
	"\n\t\t\"v tuto chvil;i stejne vykresluji obsah, odkazovanou metodiku SO tedy musim nacit\"" +
	"\n\t\tself link vychoziFotka]",
	null, "2014-03-10T12:42:02Z", "mp", 2);

jst.FYSkodlOrgPM.addMethod("vychoziFotka", "", "accessing", 
	"\t^ vychoziFotka ifNil: [taxony size = 1 ifTrue: [" +
	"\n\t\t\"v pripade vice taxonu se musi fotka explicitne nastavit" +
	"\n\t\tv tuto chvili stejne vykresluji obsah, odkazovanou metodiku SO tedy musim nacit\"" +
	"\n\t\tself link vychoziFotka]]",
	null, "2014-03-11T08:48:42Z", "mp", 3);

jst.FYSkodlOrgPM.addMethod("vychoziFotka", "", "accessing", 
	"\t\"v pripade vice taxonu se musi fotka explicitne nastavit" +
	"\n\tv tuto chvili stejne vykresluji obsah, odkazovanou metodiku SO tedy musim nacit\"" +
	"\n\t^ vychoziFotka ifNil: [self link fotka ifNil: [" +
	"\n\t\ttaxony size = 1 ifTrue: [" +
	"\n\t\t\tself link vychoziFotka]]]",
	null, "2014-03-11T22:48:19Z", "mp", 4);

jst.FYSkodlOrgPM.addMethod("vychoziFotka", "", "accessing", 
	"\t\"1. v ramci cilove PM se vychoziFotka nastavuje zvenci pres #zobrazFotku:\"" +
	"\n\t\"2. v ramci obecne metodiky dotahnu dynamicky zde, pouziva se jen v editaci a jednotlive," +
	"\n\tv tuto chvili stejne vykresluji obsah, odkazovanou metodiku SO tedy musim nacist\"" +
	"\n\t^ vychoziFotka ifNil: [" +
	"\n\t\tself metodika jeObecnaMetodika ifTrue: [" +
	"\n\t\t\tself link fotka ifNil: [" +
	"\n\t\t\t\tself link vychoziFotka]]]",
	null, "2014-03-14T09:33:34Z", "mp"); //fytoportal-ior

jst.FYSkodlOrgPM.addMethod("zobrazFotku:", "anObject", "accessing", 
	"\t\"fotku nactu pohledem naraz pro vice taxonu a nastavim zvenku touto metodou\"" +
	"\n\t(fotka notNil and: [anObject id = (fotka ifNotString: [fotka id])])" +
	"\n\t\tifTrue: [fotka := anObject]" +
	"\n\t\tifFalse: [vychoziFotka := anObject]",
	null, "2014-03-10T13:09:18Z", "mp", 1);

jst.FYSkodlOrgPM.addMethod("zobrazFotku:", "anObject", "accessing", 
	"\t\"fotku nactu pohledem naraz pro vice taxonu a nastavim zvenku touto metodou\"" +
	"\n\t(fotka notNil and: [anObject id = (fotka ifNotString: [fotka id])])" +
	"\n\t\tifTrue: [fotka := anObject]" +
	"\n\t\tifFalse: [taxony size = 1 ifTrue: [" +
	"\n\t\t\t\"pro vice taxonu vychozi fotku nenastavim, musi se urcit explicitne\"" +
	"\n\t\t\tvychoziFotka := anObject]]",
	null, "2014-03-11T08:50:48Z", "mp", 2);

jst.FYSkodlOrgPM.addMethod("zobrazFotku:", "anObject", "accessing", 
	"\t\"fotku nactu pohledem naraz pro vice taxonu a nastavim zvenku touto metodou\"" +
	"\n\t(fotka notNil and: [anObject id = (fotka ifNotString: [fotka id])])" +
	"\n\t\tifTrue: [fotka := anObject]" +
	"\n\t\tifFalse: [(taxony size = 1 and: [self metodika jeObecnaMetodika not]) ifTrue: [" +
	"\n\t\t\t\"pro vice taxonu vychozi fotku nenastavim, musi se urcit explicitne" +
	"\n\t\t\tv ramci obecne metodiky radeji dotahnu dynamicky" +
	"\n\t\t\t(tady by se mi pletla fotka z cilove PM, pokud by byla nastavena)\"" +
	"\n\t\t\tvychoziFotka := anObject]]",
	null, "2014-03-14T09:34:59Z", "mp"); //fytoportal-ior

jst.FYSkodlOrgPM.addMethod("taxony:", "aCollection", "accessing", 
	"\ttaxony := aCollection",
	null, "2014-03-05T14:01:27Z", "mp");

jst.FYSkodlOrgPM.addMethod("taxony", "", "accessing", 
	"\t^ taxony",
	null, "2014-03-06T15:16:33Z", "mp");

jst.FYSkodlOrgPM.addMethod("kody", "", "accessing", 
	"\t\"kody metodiky SO\"" +
	"\n\t^ self link kody",
	null, "2014-03-08T17:08:15Z", "mp");

jst.FYSkodlOrgPM.addMethod("jeChoroba", "", "testing", 
	"\t^ parent id = #choroby",
	null, "2014-03-10T20:31:33Z", "mp");

jst.FYSkodlOrgPM.addMethod("convertToJson:atKey:", "anObject aString", "private", 
	"\t^ aString = #fotka & fotka notNil" +
	"\n\t\tifTrue: [fotka ifNotString: [fotka id]]" +
	"\n\t\tifFalse: [super convertToJson: anObject atKey: aString]",
	null, "2014-03-12T17:44:39Z", "mp");

jst.FYSkodlOrgPM.addMethod("metodikaSO", "", "accessing", 
	"\t^ self link",
	null, "2014-04-22T14:16:02Z", "mp");

// *** FYTiskTaxonuIOR ***

jst.FYTiskTaxonuIOR._class.addMethod("initialize", "", "class initialization", 
	"\tFotoChybi := FYFotografie new " +
	"\n\t\tformat: 1.333; " +
	"\n\t\tsoubor: 'xxx.jpg'; " +
	"\n\t\tpopis: 'Fotografie zatím chybí'",
	null, "2014-03-07T14:40:07Z", "mp");

jst.initializeClass(jst.FYTiskTaxonuIOR);

jst.FYTiskTaxonuIOR.addMethod("initialize", "", "initialization", 
	"\teditace := false",
	null, "2014-03-07T21:46:55Z", "mp", 1);

jst.FYTiskTaxonuIOR.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\teditace := false",
	null, "2014-03-10T22:40:36Z", "mp", 1);

jst.FYTiskTaxonuIOR.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\teditace := false." +
	"\n\tbezFotek := false",
	null, "2014-05-12T12:34:49Z", "mp"); //fytoportal-ior

jst.FYTiskTaxonuIOR.addMethod("bezFotek:", "aBoolean", "accessing", 
	"\tbezFotek := aBoolean",
	null, "2014-05-12T12:35:20Z", "mp");

jst.FYTiskTaxonuIOR.addMethod("fotoClick", "", "private", 
	"\t| kap | " +
	"\n\tkap := kapitola. " +
	"\n\t^  [:ev | kap fotka" +
	"\n\t\tifNil: [self inform: 'Fotografie taxonu dosud neexistuje']" +
	"\n\t\tifNotNil: [FYFotoWindow new " +
	"\n\t\t\tanimateTarget: ev target;" +
	"\n\t\t\tplodina: (kap fotka fotkaPlodiny ifTrue: [" +
	"\n\t\t\t\tFYPlodina new id: kap fotka plodina; cesky: kap nazev]);" +
	"\n\t\t\tskodlOrg: (kap fotka fotkaPlodiny ifFalse: [" +
	"\n\t\t\t\tFYSkodlOrg new id: kap fotka skodlOrg; cesky: kap nazev]);" +
	"\n\t\t\tvyber: kap fotka id;" +
	"\n\t\t\tshow]]",
	null, "2014-03-07T15:14:50Z", "mp", 1);

jst.FYTiskTaxonuIOR.addMethod("fotoClick", "", "private", 
	"\t| kap | " +
	"\n\tkap := kapitola. " +
	"\n\t^  [:ev | kap fotka isNil & editace not" +
	"\n\t\tifTrue: [self inform: 'Fotografie taxonu dosud neexistuje']" +
	"\n\t\tifFalse: [FYFotoWindow new " +
	"\n\t\t\tanimateTarget: ev target;" +
	"\n\t\t\teditace: editace;" +
	"\n\t\t\tkapitola: kap;" +
	"\n\t\t\tshow]]",
	null, "2014-03-09T19:52:25Z", "mp", 2);

jst.FYTiskTaxonuIOR.addMethod("fotoClick", "", "private", 
	"\t| kap | " +
	"\n\tkap := kapitola. " +
	"\n\t^  [:ev | (kap fotka isNil and: [kap vychoziFotka isNil] and: [editace not])" +
	"\n\t\tifTrue: [self inform: 'Fotografie taxonu dosud neexistuje']" +
	"\n\t\tifFalse: [FYFotoWindow new " +
	"\n\t\t\tanimateTarget: ev target;" +
	"\n\t\t\teditace: editace;" +
	"\n\t\t\tkapitola: kap;" +
	"\n\t\t\tshow]]",
	null, "2014-03-10T16:28:09Z", "mp"); //fytoportal-ior

jst.FYTiskTaxonuIOR.addMethod("ref", "", "private", 
	"\t^ kapitola class == FYSkodlOrgPM ifTrue: [" +
	"\n\t\t'#', (Fytoportal navigator path activePathToken copyUpToLast: $:), ':', kapitola id]",
	null, "2014-03-07T16:19:33Z", "mp", 1);

jst.FYTiskTaxonuIOR.addMethod("ref", "", "private", 
	"\t^ '#', (AppPathToken new" +
	"\n\t\taddPath: Fytoportal navigator ior;" +
	"\n\t\taddPath: Fytoportal navigator ior metodika;" +
	"\n\t\taddPath: Fytoportal navigator ior hlavniKapitolaPM;" +
	"\n\t\taddPath: Fytoportal navigator ior kapitolaPM with: kapitola id) asString",
	null, "2014-03-17T13:31:38Z", "mp"); //fytoportal-ior

jst.FYTiskTaxonuIOR.addMethod("renderPopisOn:", "html", "rendering", 
	"\thtml div class: 'taxon-nazev'; with: [" +
	"\n\t\thtml span class: 'cesky'; with: kapitola nazev]",
	null, "2014-03-07T14:47:49Z", "mp", 1);

jst.FYTiskTaxonuIOR.addMethod("renderPopisOn:", "html", "rendering", 
	"\thtml div class: 'taxon-nazev'; with: [" +
	"\n\t\thtml span class: 'cesky'; with: kapitola nazev]." +
	"\n\thtml table class: 'taxony'; with: [" +
	"\n\t\thtml tableRow: [html " +
	"\n\t\t\ttableHeading: (kapitola jeChoroba ifTrue: ['choroba'] ifFalse: ['taxon']);" +
	"\n\t\t\ttableHeading: (kapitola jeChoroba ifTrue: ['původce'] ifFalse: ['vědecký název']);" +
	"\n\t\t\ttableHeading: 'zařazení';" +
	"\n\t\t\ttableHeading: 'další názvy';" +
	"\n\t\t\ttableHeading: 'vědecká synonyma';" +
	"\n\t\t\ttableHeading: 'EPPO kód']." +
	"\n\t\tkapitola taxony do: [:tax |" +
	"\n\t\t\ttaxon := tax." +
	"\n\t\t\thtml tableRow: [html" +
	"\n\t\t\t\ttableData: [self renderCeskyOn: html];" +
	"\n\t\t\t\ttableData: [self renderLatinskyOn: html];" +
	"\n\t\t\t\ttableData: [self renderZarazeniOn: html];" +
	"\n\t\t\t\ttableData: taxon dalsiNazvy asCSVString;" +
	"\n\t\t\t\ttableData: taxon synonyma asCSVString;" +
	"\n\t\t\t\ttableData: taxon kody asCSVString" +
	"\n\t\t\t]" +
	"\n\t\t]" +
	"\n\t]",
	null, "2014-03-10T21:10:29Z", "mp", 2);

jst.FYTiskTaxonuIOR.addMethod("renderPopisOn:", "html", "rendering", 
	"\tself renderCeskyOn: html." +
	"\n\thtml table class: 'taxony'; with: [" +
	"\n\t\thtml tableRow: [html " +
	"\n\t\t\ttableHeading: (kapitola jeChoroba ifTrue: ['choroba'] ifFalse: ['taxon']);" +
	"\n\t\t\ttableHeading: (kapitola jeChoroba ifTrue: ['původce'] ifFalse: ['vědecký název']);" +
	"\n\t\t\ttableHeading: 'zařazení';" +
	"\n\t\t\ttableHeading: 'další názvy';" +
	"\n\t\t\ttableHeading: 'vědecká synonyma';" +
	"\n\t\t\ttableHeading: 'EPPO kód']." +
	"\n\t\tkapitola taxony do: [:tax |" +
	"\n\t\t\ttaxon := tax." +
	"\n\t\t\thtml tableRow: [html" +
	"\n\t\t\t\ttableData: [\"metoda je zde prekryta, nazev taxonu vykresli jeji super verze\"" +
	"\n\t\t\t\t\tsuper renderCeskyOn: html];" +
	"\n\t\t\t\ttableData: [self renderLatinskyOn: html];" +
	"\n\t\t\t\ttableData: [self renderZarazeniOn: html];" +
	"\n\t\t\t\ttableData: taxon dalsiNazvy asCSVString;" +
	"\n\t\t\t\ttableData: taxon synonyma asCSVString;" +
	"\n\t\t\t\ttableData: taxon kody asCSVString" +
	"\n\t\t\t]" +
	"\n\t\t]" +
	"\n\t]",
	null, "2014-03-11T16:16:04Z", "mp", 3);

jst.FYTiskTaxonuIOR.addMethod("renderPopisOn:", "html", "rendering", 
	"\tself renderCeskyOn: html." +
	"\n\thtml table class: 'taxony'; with: [" +
	"\n\t\thtml tableRow: [html " +
	"\n\t\t\ttableHeading: (kapitola jeChoroba ifTrue: ['choroba'] ifFalse: ['taxon']);" +
	"\n\t\t\ttableHeading: (kapitola jeChoroba ifTrue: ['původce'] ifFalse: ['vědecký název']);" +
	"\n\t\t\ttableHeading: 'zařazení';" +
	"\n\t\t\ttableHeading: 'další názvy';" +
	"\n\t\t\ttableHeading: 'vědecká synonyma';" +
	"\n\t\t\ttableHeading: 'EPPO kód']." +
	"\n\t\tkapitola taxony do: [:tax |" +
	"\n\t\t\ttaxon := tax." +
	"\n\t\t\thtml tableRow: [html" +
	"\n\t\t\t\ttableData: [\"metoda je zde prekryta, nazev taxonu vykresli jeji super verze\"" +
	"\n\t\t\t\t\tsuper renderCeskyOn: html];" +
	"\n\t\t\t\ttableData: [self renderLatinskyOn: html];" +
	"\n\t\t\t\ttableData: [self renderZarazeniOn: html];" +
	"\n\t\t\t\ttableData: taxon dalsiNazvy asCSVString;" +
	"\n\t\t\t\ttableData: [html span class: 'latinsky'; with: [" +
	"\n\t\t\t\t\thtml html: (upravLatinu value: taxon synonyma asCSVString)]];" +
	"\n\t\t\t\ttableData: taxon kody asCSVString" +
	"\n\t\t\t]" +
	"\n\t\t]" +
	"\n\t]",
	null, "2014-04-12T20:44:58Z", "mp", 4);

jst.FYTiskTaxonuIOR.addMethod("renderPopisOn:", "html", "rendering", 
	"\t(foto notNil and: [(kapitola includesKey: #charakteristika) not " +
	"\n\t\tand: [(kapitola link includesKey: #charakteristika) not]]) ifTrue: [" +
	"\n\t\tself renderFotoOn: html." +
	"\n\t\tfoto := nil]." +
	"\n\thtml div class: 'taxon-nazev'; with: [" +
	"\n\t\tself renderCeskyOn: html]." +
	"\n\thtml table class: 'taxony'; with: [" +
	"\n\t\thtml tableRow: [html " +
	"\n\t\t\ttableHeading: (kapitola jeChoroba ifTrue: ['choroba'] ifFalse: ['taxon']);" +
	"\n\t\t\ttableHeading: (kapitola jeChoroba ifTrue: ['původce'] ifFalse: ['vědecký název']);" +
	"\n\t\t\ttableHeading: 'zařazení';" +
	"\n\t\t\ttableHeading: 'další názvy';" +
	"\n\t\t\ttableHeading: 'vědecká synonyma';" +
	"\n\t\t\ttableHeading: 'EPPO kód']." +
	"\n\t\tkapitola taxony do: [:tax |" +
	"\n\t\t\ttaxon := tax." +
	"\n\t\t\thtml tableRow: [html" +
	"\n\t\t\t\ttableData: [\"metoda je zde prekryta, nazev taxonu vykresli jeji super verze\"" +
	"\n\t\t\t\t\tsuper renderCeskyOn: html];" +
	"\n\t\t\t\ttableData: [self renderLatinskyOn: html];" +
	"\n\t\t\t\ttableData: [self renderZarazeniOn: html];" +
	"\n\t\t\t\ttableData: taxon dalsiNazvy asCSVString;" +
	"\n\t\t\t\ttableData: [html span class: 'latinsky'; with: [" +
	"\n\t\t\t\t\thtml html: (upravLatinu value: taxon synonyma asCSVString)]];" +
	"\n\t\t\t\ttableData: taxon kody asCSVString" +
	"\n\t\t\t]" +
	"\n\t\t]" +
	"\n\t]." +
	"\n\tfoto ifNotNil: [" +
	"\n\t\tself renderFotoOn: html]",
	null, "2014-04-18T14:38:34Z", "mp"); //fytoportal-ior

jst.FYTiskTaxonuIOR.addMethod("renderFotoOn:", "html", "rendering", 
	"\thtml img " +
	"\n\t\tclass: 'fotka'; " +
	"\n\t\talt: kapitola nazev;" +
	"\n\t\theight: height; " +
	"\n\t\twidth: width; " +
	"\n\t\tsrc: foto preview;" +
	"\n\t\ttitle: foto popis;" +
	"\n\t\ton: #click do: self fotoClick",
	null, "2014-03-07T14:56:24Z", "mp", 1);

jst.FYTiskTaxonuIOR.addMethod("renderFotoOn:", "html", "rendering", 
	"\thtml img " +
	"\n\t\tclass: 'fotka'; " +
	"\n\t\talt: kapitola nazev;" +
	"\n\t\theight: height; " +
	"\n\t\twidth: width; " +
	"\n\t\tsrc: (kapitola jePlodina " +
	"\n\t\t\tifTrue: [foto optimal] " +
	"\n\t\t\tifFalse: [foto preview]);" +
	"\n\t\ttitle: foto popis;" +
	"\n\t\ton: #click do: self fotoClick",
	null, "2014-03-17T19:57:05Z", "mp"); //fytoportal-ior

jst.FYTiskTaxonuIOR.addMethod("kapitola:", "kap", "accessing", 
	"\t\"kap je instance FYPlodinaPM, FYSkodlOrgPM nebo FYMetodikaSO," +
	"\n\tnutno nastavit pred renderovanim\"" +
	"\n\tkapitola := kap",
	null, "2014-03-07T14:53:51Z", "mp");

jst.FYTiskTaxonuIOR.addMethod("renderOn:", "html", "rendering", 
	"\thtml div " +
	"\n\t\tclass: 'kapitola-taxon'; " +
	"\n\t\twith: [" +
	"\n\t\t\tkapitola fotka notNil | editace ifTrue: [" +
	"\n\t\t\t\tfoto := kapitola fotka ifNil: [kapitola vychoziFotka ifNil: FotoChybi]." +
	"\n\t\t\t\theight := 150." +
	"\n\t\t\t\twidth := (foto format * height) rounded." +
	"\n\t\t\t\tself renderFotoOn: html]." +
	"\n\t\t\thtml div class: 'taxon-popis'; with: [kapitola taxony size = 1 " +
	"\n\t\t\t\tifTrue: [kapitola taxony first renderOn: html] " +
	"\n\t\t\t\tifFalse: [self renderPopisOn: html]]" +
	"\n\t\t]",
	null, "2014-03-07T22:40:12Z", "mp", 1);

jst.FYTiskTaxonuIOR.addMethod("renderOn:", "html", "rendering", 
	"\thtml div with: [" +
	"\n\t\tkapitola fotka notNil | editace ifTrue: [" +
	"\n\t\t\tfoto := kapitola fotka ifNil: [kapitola vychoziFotka ifNil: FotoChybi]." +
	"\n\t\t\theight := 150." +
	"\n\t\t\twidth := (foto format * height) rounded." +
	"\n\t\t\tself renderFotoOn: html]." +
	"\n\t\thtml div class: 'taxon-popis'; with: [kapitola taxony size = 1 " +
	"\n\t\t\tifTrue: [kapitola taxony first renderOn: html] " +
	"\n\t\t\tifFalse: [self renderPopisOn: html]]" +
	"\n\t]",
	null, "2014-03-08T17:13:30Z", "mp", 2);

jst.FYTiskTaxonuIOR.addMethod("renderOn:", "html", "rendering", 
	"\thtml div with: [" +
	"\n\t\tfoto := kapitola fotka ifNil: [kapitola vychoziFotka]." +
	"\n\t\tfoto notNil | editace ifTrue: [" +
	"\n\t\t\tfoto ifNil: [" +
	"\n\t\t\t\tfoto := FotoChybi ]." +
	"\n\t\t\theight := 150." +
	"\n\t\t\twidth := (foto format * height) rounded." +
	"\n\t\t\tself renderFotoOn: html]." +
	"\n\t\thtml div class: 'taxon-popis'; with: [kapitola taxony size = 1 " +
	"\n\t\t\tifTrue: [kapitola taxony first renderOn: html] " +
	"\n\t\t\tifFalse: [self renderPopisOn: html]]" +
	"\n\t]",
	null, "2014-03-10T16:30:44Z", "mp", 3);

jst.FYTiskTaxonuIOR.addMethod("renderOn:", "html", "rendering", 
	"\thtml div with: [" +
	"\n\t\tfoto := kapitola fotka ifNil: [kapitola vychoziFotka]." +
	"\n\t\tfoto notNil | editace ifTrue: [" +
	"\n\t\t\tfoto ifNil: [" +
	"\n\t\t\t\tfoto := FotoChybi ]." +
	"\n\t\t\theight := 150." +
	"\n\t\t\twidth := (foto format * height) rounded." +
	"\n\t\t\tself renderFotoOn: html]." +
	"\n\t\thtml div class: 'taxon-popis'; with: [kapitola taxony size = 1 " +
	"\n\t\t\tifTrue: [" +
	"\n\t\t\t\ttaxon := kapitola taxony first." +
	"\n\t\t\t\tsuper renderOn: html] " +
	"\n\t\t\tifFalse: [self renderPopisOn: html]]" +
	"\n\t]",
	null, "2014-03-10T22:09:02Z", "mp", 4);

jst.FYTiskTaxonuIOR.addMethod("renderOn:", "html", "rendering", 
	"\thtml div with: [ | fotoOk |" +
	"\n\t\tfoto := kapitola fotka ifNil: [kapitola vychoziFotka ifNil: [" +
	"\n\t\t\teditace ifTrue: [foto := FotoChybi ]]]." +
	"\n\t\tfoto ifNotNil: [" +
	"\n\t\t\theight := 150." +
	"\n\t\t\twidth := (foto format * height) rounded." +
	"\n\t\t\tkapitola taxony size = 1 ifTrue: [" +
	"\n\t\t\t\tself renderFotoOn: html]]." +
	"\n\t\thtml div class: 'taxon-popis'; with: [kapitola taxony size = 1 " +
	"\n\t\t\tifTrue: [" +
	"\n\t\t\t\ttaxon := kapitola taxony first." +
	"\n\t\t\t\tsuper renderOn: html] " +
	"\n\t\t\tifFalse: [" +
	"\n\t\t\t\tself renderPopisOn: html." +
	"\n\t\t\t\tfoto ifNotNil: [" +
	"\n\t\t\t\t\tself renderFotoOn: html]]]" +
	"\n\t]",
	null, "2014-03-11T15:47:15Z", "mp", 5);

jst.FYTiskTaxonuIOR.addMethod("renderOn:", "html", "rendering", 
	"\thtml div with: [ | fotoOk |" +
	"\n\t\tfoto := kapitola fotka ifNil: [kapitola vychoziFotka ifNil: [" +
	"\n\t\t\teditace ifTrue: [foto := FotoChybi ]]]." +
	"\n\t\tfoto ifNotNil: [" +
	"\n\t\t\theight := (kapitola jePlodina ifTrue: [300] ifFalse: [150])." +
	"\n\t\t\twidth := (foto format * height) rounded." +
	"\n\t\t\tkapitola taxony size = 1 ifTrue: [" +
	"\n\t\t\t\tself renderFotoOn: html]]." +
	"\n\t\thtml div class: 'taxon-popis'; with: [kapitola taxony size = 1 " +
	"\n\t\t\tifTrue: [" +
	"\n\t\t\t\ttaxon := kapitola taxony first." +
	"\n\t\t\t\tsuper renderOn: html] " +
	"\n\t\t\tifFalse: [" +
	"\n\t\t\t\tself renderPopisOn: html." +
	"\n\t\t\t\tfoto ifNotNil: [" +
	"\n\t\t\t\t\tself renderFotoOn: html]]]" +
	"\n\t]",
	null, "2014-03-17T16:29:49Z", "mp", 6);

jst.FYTiskTaxonuIOR.addMethod("renderOn:", "html", "rendering", 
	"\thtml div with: [ | fotoOk |" +
	"\n\t\tfoto := kapitola fotka ifNil: [kapitola vychoziFotka ifNil: [" +
	"\n\t\t\teditace ifTrue: [foto := FotoChybi ]]]." +
	"\n\t\tfoto ifNotNil: [" +
	"\n\t\t\theight := (kapitola jePlodina ifTrue: [300] ifFalse: [150])." +
	"\n\t\t\twidth := (foto format * height) rounded." +
	"\n\t\t\tkapitola taxony size = 1 ifTrue: [" +
	"\n\t\t\t\tself renderFotoOn: html]]." +
	"\n\t\thtml div class: 'taxon-popis'; with: [kapitola taxony size = 1 " +
	"\n\t\t\tifTrue: [" +
	"\n\t\t\t\ttaxon := kapitola taxony first." +
	"\n\t\t\t\tsuper renderOn: html] " +
	"\n\t\t\tifFalse: [" +
	"\n\t\t\t\tself renderPopisOn: html]" +
	"\n\t\t]" +
	"\n\t]",
	null, "2014-04-18T14:24:32Z", "mp", 7);

jst.FYTiskTaxonuIOR.addMethod("renderOn:", "html", "rendering", 
	"\thtml div with: [ | fotoOk |" +
	"\n\t\tfoto := bezFotek ifFalse: [" +
	"\n\t\t\tkapitola fotka ifNil: [kapitola vychoziFotka ifNil: [" +
	"\n\t\t\t\teditace ifTrue: [foto := FotoChybi ]]]]." +
	"\n\t\tfoto ifNotNil: [" +
	"\n\t\t\theight := (kapitola jePlodina ifTrue: [300] ifFalse: [150])." +
	"\n\t\t\twidth := (foto format * height) rounded." +
	"\n\t\t\tkapitola taxony size = 1 ifTrue: [" +
	"\n\t\t\t\tself renderFotoOn: html]]." +
	"\n\t\thtml div class: 'taxon-popis'; with: [kapitola taxony size = 1 " +
	"\n\t\t\tifTrue: [" +
	"\n\t\t\t\ttaxon := kapitola taxony first." +
	"\n\t\t\t\tsuper renderOn: html] " +
	"\n\t\t\tifFalse: [" +
	"\n\t\t\t\tself renderPopisOn: html]" +
	"\n\t\t]" +
	"\n\t]",
	null, "2014-05-12T12:38:45Z", "mp"); //fytoportal-ior

jst.FYTiskTaxonuIOR.addMethod("renderNahledOn:", "html", "rendering", 
	"\tfoto := kapitola fotka ifNil: [ FotoChybi ]." +
	"\n\tfoto format > 1 & (foto format < FotoChybi format) " +
	"\n\t\tifTrue: [width := 200. height := (width / foto format) rounded]" +
	"\n\t\tifFalse: [height := 150. width := (height * foto format) rounded]." +
	"\n\thtml div class: 'ior-taxon-nahled'; with: [" +
	"\n\t\thtml div class: 'fotka'; style:  'width: 200px; height: 150px;'; with: [" +
	"\n\t\t\tself renderFotoOn: html]." +
	"\n\t\thtml div class: 'foto-taxon-popis'; with: [" +
	"\n\t\t\tkapitola taxony size = 1" +
	"\n\t\t\t\tifTrue: [kapitola taxony first renderOn: html without: #(synonyma kody) ref: self ref]" +
	"\n\t\t\t\tifFalse: [self renderPopisNahleduOn: html]." +
	"\n\t\t\tfoto == FotoChybi ifFalse: [html p: [" +
	"\n\t\t\t\thtml text: '(fotografie: ', foto autor, ')']]" +
	"\n\t\t]" +
	"\n\t]",
	null, "2014-03-07T14:58:04Z", "mp", 1);

jst.FYTiskTaxonuIOR.addMethod("renderNahledOn:", "html", "rendering", 
	"\tfoto := kapitola fotka ifNil: [" +
	"\n\t\tkapitola vychoziFotka ifNil: [" +
	"\n\t\t\tFotoChybi ]]." +
	"\n\tfoto format > 1 & (foto format < FotoChybi format) " +
	"\n\t\tifTrue: [width := 200. height := (width / foto format) rounded]" +
	"\n\t\tifFalse: [height := 150. width := (height * foto format) rounded]." +
	"\n\thtml div class: 'ior-taxon-nahled'; with: [" +
	"\n\t\thtml div class: 'fotka'; style:  'width: 200px; height: 150px;'; with: [" +
	"\n\t\t\tself renderFotoOn: html]." +
	"\n\t\thtml div class: 'foto-taxon-popis'; with: [" +
	"\n\t\t\tkapitola taxony size = 1" +
	"\n\t\t\t\tifTrue: [kapitola taxony first renderOn: html without: #(synonyma kody) ref: self ref]" +
	"\n\t\t\t\tifFalse: [self renderPopisNahleduOn: html]." +
	"\n\t\t\tfoto == FotoChybi ifFalse: [html p: [" +
	"\n\t\t\t\thtml text: '(fotografie: ', foto autor, ')']]" +
	"\n\t\t]" +
	"\n\t]",
	null, "2014-03-10T16:25:44Z", "mp", 1);

jst.FYTiskTaxonuIOR.addMethod("renderNahledOn:", "html", "rendering", 
	"\tnahled := true." +
	"\n\tfoto := kapitola fotka ifNil: [" +
	"\n\t\tkapitola vychoziFotka ifNil: [" +
	"\n\t\t\tFotoChybi ]]." +
	"\n\tfoto format > 1 & (foto format < FotoChybi format) " +
	"\n\t\tifTrue: [width := 200. height := (width / foto format) rounded]" +
	"\n\t\tifFalse: [height := 150. width := (height * foto format) rounded]." +
	"\n\thtml div class: 'ior-taxon-nahled'; with: [" +
	"\n\t\thtml div class: 'fotka'; style:  'width: 200px; height: 150px;'; with: [" +
	"\n\t\t\tself renderFotoOn: html]." +
	"\n\t\thtml div class: 'foto-taxon-popis'; with: [" +
	"\n\t\t\tkapitola taxony size = 1" +
	"\n\t\t\t\tifTrue: [" +
	"\n\t\t\t\t\ttaxon := kapitola taxony first." +
	"\n\t\t\t\t\tsuper renderOn: html]" +
	"\n\t\t\t\tifFalse: [self renderPopisNahleduOn: html]." +
	"\n\t\t\tfoto == FotoChybi ifFalse: [html p: [" +
	"\n\t\t\t\thtml text: '(fotografie: ', foto autor, ')']]" +
	"\n\t\t]" +
	"\n\t]",
	null, "2014-03-10T22:07:05Z", "mp"); //fytoportal-ior

jst.FYTiskTaxonuIOR.addMethod("renderPopisNahleduOn:", "html", "rendering", 
	"\thtml div class: 'taxon-nazev'; with: [" +
	"\n\t\thtml span class: 'cesky'; with: [" +
	"\n\t\t\thtml anchor " +
	"\n\t\t\t\thref: self ref; " +
	"\n\t\t\t\twith: (kapitola nazev truncateWithElipsisTo: 200)]." +
	"\n\t\thtml div with: [kapitola taxony do: [:tax |" +
	"\n\t\t\thtml text: tax nazev] separatedBy: [html text: ', ']]" +
	"\n\t]",
	null, "2014-03-07T14:58:27Z", "mp", 1);

jst.FYTiskTaxonuIOR.addMethod("renderPopisNahleduOn:", "html", "rendering", 
	"\thtml div class: 'taxon-nazev'; with: [" +
	"\n\t\tself renderCeskyOn: html." +
	"\n\t\thtml div with: [kapitola taxony do: [:tax |" +
	"\n\t\t\thtml text: tax nazev] separatedBy: [html text: ', ']]" +
	"\n\t]",
	null, "2014-03-11T16:15:43Z", "mp"); //fytoportal-ior

jst.FYTiskTaxonuIOR.addMethod("renderCeskyOn:", "html", "rendering", 
	"\t\"nazev taxonu prebiju nazvem metodiky\"" +
	"\n\thtml span class: 'cesky'; with: [nahled" +
	"\n\t\tifTrue: [html anchor " +
	"\n\t\t\thref: self ref asString; " +
	"\n\t\t\twith: (kapitola nazev truncateWithElipsisTo: 200)]" +
	"\n\t\tifFalse: [html text: kapitola nazev]]." +
	"\n\thtml br",
	null, "2014-03-11T16:19:47Z", "mp", 1);

jst.FYTiskTaxonuIOR.addMethod("renderCeskyOn:", "html", "rendering", 
	"\t\"nazev taxonu prebiju nazvem metodiky\"" +
	"\n\thtml div class: 'cesky'; with: [nahled" +
	"\n\t\tifTrue: [html anchor " +
	"\n\t\t\thref: self ref asString; " +
	"\n\t\t\twith: (kapitola nazev truncateWithElipsisTo: 200)]" +
	"\n\t\tifFalse: [html text: kapitola nazev]]",
	null, "2014-03-17T15:34:15Z", "mp"); //fytoportal-ior

jst.FYTiskTaxonuIOR.addMethod("editace:", "aBoolean", "accessing", 
	"\t\"nastavim, pokud budu editovat fotku\"" +
	"\n\teditace := aBoolean",
	null, "2014-03-07T21:44:25Z", "mp");

// *** FYNalezenaKapitolaPM ***

jst.FYNalezenaKapitolaPM.addMethod("convertFromJson:instVar:", "jsonObject aString", "private", 
	"\taString = #refs " +
	"\n\t\tifTrue: [refs := (self convertFromJson: jsonObject) asSortedCollection]" +
	"\n\t\tifFalse: [super convertFromJson: jsonObject instVar: aString]",
	null, "2014-05-12T09:10:14Z", "mp");

jst.FYNalezenaKapitolaPM.addMethod("taxon", "", "accessing", 
	"\t^ taxon",
	null, "2014-05-10T08:52:07Z", "mp");

jst.FYNalezenaKapitolaPM.addMethod("typ", "", "accessing", 
	"\t^ typ",
	null, "2014-05-10T09:14:28Z", "mp");

jst.FYNalezenaKapitolaPM.addMethod("id:", "aString", "accessing", 
	"\tid := aString",
	null, "2014-05-10T11:29:42Z", "mp");

jst.FYNalezenaKapitolaPM.addMethod("id", "", "accessing", 
	"\t^ id",
	null, "2014-05-10T17:16:01Z", "mp");

jst.FYNalezenaKapitolaPM.addMethod("refs", "", "accessing", 
	"\t^ refs ifNil: [" +
	"\n\t\trefs := SortedCollection new]",
	null, "2014-05-12T09:07:06Z", "mp");

jst.FYNalezenaKapitolaPM.addMethod("metodika", "", "accessing", 
	"\t^ metodika",
	null, "2014-05-10T19:23:56Z", "mp");

jst.FYNalezenaKapitolaPM.addMethod("nazev", "", "accessing", 
	"\t^ nazev",
	null, "2014-05-12T07:30:32Z", "mp");

jst.FYNalezenaKapitolaPM.addMethod("poradi:", "int", "accessing", 
	"\tporadi := int",
	null, "2014-03-26T15:08:28Z", "mp");

jst.FYNalezenaKapitolaPM.addMethod("oznacText:", "aString", "accessing", 
	"\toznacText := aString",
	null, "2014-03-27T13:25:35Z", "mp", 1);

jst.FYNalezenaKapitolaPM.addMethod("oznacText:", "aRegExp", "accessing", 
	"\toznacText := aRegExp",
	null, "2014-03-27T20:52:43Z", "mp"); //fytoportal-ior

jst.FYNalezenaKapitolaPM.addMethod("printOn:", "s", "printing", 
	"\ts nextPutAll: nazev",
	null, "2014-03-25T16:16:33Z", "mp");

jst.FYNalezenaKapitolaPM.addMethod("renderOn:", "html", "rendering", 
	"\thtml div class: #kapitola; with: [" +
	"\n\t\thtml div class: 'nazev3'; with: [" +
	"\n\t\t\thtml text: poradi; text: '. '; text: nazev]." +
	"\n\t\thtml div class: 'odkazy'; with: [" +
	"\n\t\t\thtml text: 'metodika: '." +
	"\n\t\t\tmetodika ifNotNil: [" +
	"\n\t\t\t\tself renderLink: metId -> metodika on: html" +
	"\n\t\t\t] ifNil: [" +
	"\n\t\t\t\trefs do: [:asc |" +
	"\n\t\t\t\t\tself renderLink: asc on: html" +
	"\n\t\t\t\t] separatedBy: [html text: ', ']" +
	"\n\t\t\t]" +
	"\n\t\t]." +
	"\n\t\thtml div class: 'obsah'; with: [" +
	"\n\t\t\thtml html: (obsah ifNil: [''])]" +
	"\n\t]",
	null, "2014-03-26T15:10:35Z", "mp", 1);

jst.FYNalezenaKapitolaPM.addMethod("renderOn:", "html", "rendering", 
	"\thtml div class: #kapitola; with: [" +
	"\n\t\thtml div class: 'nazev3'; with: [" +
	"\n\t\t\thtml html: self oznacenyNazev]." +
	"\n\t\thtml div class: 'odkazy'; with: [" +
	"\n\t\t\thtml text: 'metodika: '." +
	"\n\t\t\tmetodika ifNotNil: [" +
	"\n\t\t\t\tself renderLink: metId -> metodika on: html" +
	"\n\t\t\t] ifNil: [" +
	"\n\t\t\t\trefs do: [:asc |" +
	"\n\t\t\t\t\tself renderLink: asc on: html" +
	"\n\t\t\t\t] separatedBy: [html text: ', ']" +
	"\n\t\t\t]" +
	"\n\t\t]." +
	"\n\t\thtml div class: 'obsah'; with: [" +
	"\n\t\t\thtml html: self oznacenyObsah]" +
	"\n\t]",
	null, "2014-03-27T14:27:01Z", "mp", 1);

jst.FYNalezenaKapitolaPM.addMethod("renderOn:", "html", "rendering", 
	"\thtml div class: #kapitola; with: [" +
	"\n\t\thtml div class: 'nazev3'; with: [" +
	"\n\t\t\thtml html: self oznacenyNazev]." +
	"\n\t\thtml div class: 'odkazy'; with: [" +
	"\n\t\t\thtml text: 'metodika: '." +
	"\n\t\t\tmetodika ifNotNil: [" +
	"\n\t\t\t\tself renderLink: metodika -> metId on: html" +
	"\n\t\t\t] ifNil: [" +
	"\n\t\t\t\trefs do: [:asc |" +
	"\n\t\t\t\t\tself renderLink: asc on: html" +
	"\n\t\t\t\t] separatedBy: [html text: ', ']" +
	"\n\t\t\t]" +
	"\n\t\t]." +
	"\n\t\thtml div class: 'obsah'; with: [" +
	"\n\t\t\thtml html: self oznacenyObsah]" +
	"\n\t]",
	null, "2014-05-12T09:16:56Z", "mp"); //fytoportal-ior

jst.FYNalezenaKapitolaPM.addMethod("oznacenyNazev", "", "private", 
	"\t| i str |" +
	"\n\ti := nazev lastIndexOf: '>' ifAbsent: [0]." +
	"\n\tstr := i > 0 ifTrue: [nazev copyFrom: 1 to: i] ifFalse: ['']." +
	"\n\t^ '<span class=\"poradi\">[', poradi asString, ']</span> ', str, " +
	"\n\t\t((nazev allButFirst: i) copyReplaceAll: oznacText with: '<mark>', oznacText, '</mark>')",
	null, "2014-03-27T14:31:51Z", "mp", 1);

jst.FYNalezenaKapitolaPM.addMethod("oznacenyNazev", "", "private", 
	"\t| i str |" +
	"\n\ti := nazev lastIndexOf: '>' ifAbsent: [0]." +
	"\n\tstr := i > 0 ifTrue: [nazev copyFrom: 1 to: i] ifFalse: ['']." +
	"\n\t^ '<span class=\"poradi\">[', poradi asString, ']</span> ', str, " +
	"\n\t\t(oznacText execOn: (nazev allButFirst: i))",
	null, "2014-03-27T20:54:57Z", "mp"); //fytoportal-ior

jst.FYNalezenaKapitolaPM.addMethod("oznacenyObsah", "", "private", 
	"\t^ obsah ifNil: [''] ifNotNil: [" +
	"\n\t\tobsah copyReplaceAll: oznacText with: '<mark>', oznacText, '</mark>']",
	null, "2014-03-27T14:12:41Z", "mp", 1);

jst.FYNalezenaKapitolaPM.addMethod("oznacenyObsah", "", "private", 
	"\t^ obsah " +
	"\n\t\tifNil: [''] " +
	"\n\t\tifNotNil: [oznacText execOn: obsah]",
	null, "2014-03-27T20:55:35Z", "mp"); //fytoportal-ior

jst.FYNalezenaKapitolaPM.addMethod("renderLink:on:", "asc html", "rendering", 
	"\t| token ids |" +
	"\n\ttoken := AppPathToken new" +
	"\n\t\taddPath: Fytoportal navigator ior;" +
	"\n\t\tyourself." +
	"\n\ttoken addPath: Fytoportal navigator ior metodika with: asc key." +
	"\n\tids := id findTokens: '.'." +
	"\n\tids first = asc key ifTrue: [" +
	"\n\t\tids := ids allButFirst]." +
	"\n\tself kapitolaSO ifNotNilDo: [:kapSO | token " +
	"\n\t\taddPath: Fytoportal navigator ior hlavniKapitolaPM with: kapSO;" +
	"\n\t\taddPath: Fytoportal navigator ior kapitolaPM with: ids first" +
	"\n\t] ifNil: [" +
	"\n\t\tids size > 0 ifTrue: [" +
	"\n\t\t\ttoken addPath: Fytoportal navigator ior hlavniKapitolaPM with: ids first]." +
	"\n\t\tids size > 1 ifTrue: [" +
	"\n\t\t\ttoken addPath: Fytoportal navigator ior kapitolaPM with: ids second]" +
	"\n\t]." +
	"\n\thtml anchor " +
	"\n\t\thref: '#', token asString;" +
	"\n\t\twith: asc value",
	null, "2014-03-26T18:56:32Z", "mp", 1);

jst.FYNalezenaKapitolaPM.addMethod("renderLink:on:", "asc html", "rendering", 
	"\t| token ids |" +
	"\n\ttoken := AppPathToken new" +
	"\n\t\taddPath: Fytoportal navigator ior;" +
	"\n\t\tyourself." +
	"\n\ttoken addPath: Fytoportal navigator ior metodika with: asc value." +
	"\n\tids := id findTokens: '.'." +
	"\n\tids first = asc value ifTrue: [" +
	"\n\t\tids := ids allButFirst]." +
	"\n\tself kapitolaSO ifNotNilDo: [:kapSO | token " +
	"\n\t\taddPath: Fytoportal navigator ior hlavniKapitolaPM with: kapSO;" +
	"\n\t\taddPath: Fytoportal navigator ior kapitolaPM with: ids first" +
	"\n\t] ifNil: [" +
	"\n\t\tids size > 0 ifTrue: [" +
	"\n\t\t\ttoken addPath: Fytoportal navigator ior hlavniKapitolaPM with: ids first]." +
	"\n\t\tids size > 1 ifTrue: [" +
	"\n\t\t\ttoken addPath: Fytoportal navigator ior kapitolaPM with: ids second]" +
	"\n\t]." +
	"\n\thtml anchor " +
	"\n\t\thref: '#', token asString;" +
	"\n\t\twith: asc key",
	null, "2014-05-12T09:13:20Z", "mp"); //fytoportal-ior

jst.FYNalezenaKapitolaPM.addMethod("kapitolaSO", "", "accessing", 
	"\t^ kapitolaSO ifNil: [" +
	"\n\t\t(FYMetodikaSO subclasses detect: [:cls | cls name = typ] ifNone: nil) ifNotNilDo: [:cls |" +
	"\n\t\t\tcls kapitola]]",
	null, "2014-03-26T18:54:53Z", "mp", 1);

jst.FYNalezenaKapitolaPM.addMethod("kapitolaSO", "", "accessing", 
	"\t^ kapitolaSO ifNil: [" +
	"\n\t\t(FYMetodikaSO subclasses detect: [:cls | cls name = typ] ifNone: nil) ifNotNilDo: [:cls |" +
	"\n\t\t\tkapitolaSO := cls kapitola]]",
	null, "2014-05-09T19:26:27Z", "mp"); //fytoportal-ior
