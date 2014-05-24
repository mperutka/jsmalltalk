/*
 * Copyright (c) 2012 Michal Perutka <michal.perutka@gmail.com>
 *
 *
 * Depends on jst-fytoportal-core
 */

jst.currentJsFile = "fytoportal-foto";

// *** CLASSES ***

jst.FYDataViews.subclass("FYDataFotky", "", "", "", "SRS-Fytoportal-foto");
jst.FYDataViews.subclass("FYDataTaxony", "", "", "", "SRS-Fytoportal-foto");

jst.FYDataTaxony.subclass("FYDataPlodiny", "podrizenePocty", "", "", "SRS-Fytoportal-foto");
jst.FYDataTaxony.subclass("FYDataSkodlOrg", "", "", "", "SRS-Fytoportal-foto");

jst.ExtTreeLoader.subclass("FYPodrizenePlodinyLoader", "skupina", "", "", "SRS-Fytoportal-foto");


jst.Object.subclass("FYFotogalerie", "plodinyPanel skodlOrgPanel popisPanel mainPanel", "", "", "SRS-Fytoportal-foto");

jst.ExtPanel.subclass("FYPlodinyPanel", "hledej podleSkupin vyhledane", "", "", "SRS-Fytoportal-foto");

jst.ExtTabPanel.subclass("FYSkodlOrgPanel", "naPlodine bezPlodiny vyhledane", "", "", "SRS-Fytoportal-foto");

jst.ExtDataView.subclass("FYFotoNahledy", "plodina plodiny skodlOrg naPlodine vyber", "", "", "SRS-Fytoportal-foto");
jst.FYFotoNahledy.subclass("FYFotoNahledyRadek", "", "", "", "SRS-Fytoportal-foto");

jst.Object.subclass("FYFotoDetail", "ctx fotka img rect urlSel", "", "", "SRS-Fytoportal-foto");
jst.ExtWindow.subclass("FYFotoWindow", "nahledy detail fotka plodina skodlOrg toolbar editace vyberBtn vyber kapitola", "", "", "SRS-Fytoportal-foto");

//jst.ExtPanel.subclass("FYFotoViewer", "nahledy detail pouzeNahledy plodina plodiny skodlOrg naPlodine", "", "", "SRS-Fytoportal-foto");
jst.ExtPanel.subclass("FYFotoViewer", "nahledy detail detailPanel", "", "", "SRS-Fytoportal-foto");

jst.ExtPanel.subclass("FYTaxonPopisPanel", "taxon", "", "", "SRS-Fytoportal-foto");

jst.ExtFormPanel.subclass("FYHledejPanel", "searchField path", "", "", "SRS-Fytoportal-foto");

/*
jst.ExtDataView.subclass("FYFotoNahledy", "", "", "", "SRS-Fytoportal");
jst.ExtWindow.subclass("FYFotoEditor", "", "", "", "SRS-Fytoportal");
*/

jst.AppCrossroad.subclass("FYFotogalerieNavig", "paths", "", "", "SRS-Fytoportal-foto");

jst.Object.subclass("FYTiskTaxonu", "taxon nahled upravLatinu", "", "", "SRS-Fytoportal-foto");

//*** AppCrossroad ***

jst.FYFotogalerieNavig.addMethod("initialize", "", "initialization", 
	"\tpaths := Dictionary new." +
	"\n\tsuper initialize" +
	"\n\t\tlabel: 'Fotogalerie';" +
	"\n\t\taddExit: self plodinySkupina;" +
	"\n\t\taddExit: self plevele;" +
	"\n\t\taddExit: self hledej;" +
	"\n\t\tonEnter: [Fytoportal current aktivujFotogalerii]",
	null, "2013-01-17T07:24:59Z", "mp", 1);

jst.FYFotogalerieNavig.addMethod("initialize", "", "initialization", 
	"\tpaths := Dictionary new." +
	"\n\tsuper initialize" +
	"\n\t\tlabel: 'Fotogalerie';" +
	"\n\t\taddExit: self plodinySkupina;" +
	"\n\t\taddExit: self plevele;" +
	"\n\t\taddExit: self hledej;" +
	"\n\t\tonEnter: [Fytoportal current aktivujFotogalerii];" +
	"\n\t\tonForceStop: [:p | p toggle]",
	null, "2013-08-27T16:16:51Z", "mp", 1);

jst.FYFotogalerieNavig.addMethod("initialize", "", "initialization", 
	"\tpaths := Dictionary new." +
	"\n\tsuper initialize" +
	"\n\t\tlabel: 'Fotogalerie';" +
	"\n\t\taddExit: self plodinySkupina;" +
	"\n\t\taddExit: self plevele;" +
	"\n\t\taddExit: self hledej;" +
	"\n\t\tonEnter: [Fytoportal current aktivujFotogalerii];" +
	"\n\t\tonForceStop: [:p | p switchPath]",
	null, "2013-08-28T12:03:19Z", "mp", 1);

jst.FYFotogalerieNavig.addMethod("initialize", "", "initialization", 
	"\tpaths := Dictionary new." +
	"\n\tsuper initialize" +
	"\n\t\tlabel: 'Fotogalerie';" +
	"\n\t\taddExit: self plodinySkupina;" +
	"\n\t\taddExit: self plevele;" +
	"\n\t\taddExit: self hledej;" +
	"\n\t\tonEnter: [Fytoportal current aktivujFotogalerii];" +
	"\n\t\tonForceStop: [:p | p switchPathOn: #modul]",
	null, "2013-09-02T19:26:58Z", "mp", 1);

jst.FYFotogalerieNavig.addMethod("initialize", "", "initialization", 
	"\tpaths := Dictionary new." +
	"\n\tsuper initialize" +
	"\n\t\tlabel: 'Fotogalerie';" +
	"\n\t\taddExit: self plodinySkupina;" +
	"\n\t\taddExit: self plevele;" +
	"\n\t\taddExit: self hledej;" +
	"\n\t\tonForceStop: [self switchPath]",
	null, "2013-09-03T08:08:06Z", "mp", 1);

jst.FYFotogalerieNavig.addMethod("initialize", "", "initialization", 
	"\tpaths := Dictionary new." +
	"\n\tsuper initialize" +
	"\n\t\tid: #fotogalerie;" +
	"\n\t\tlabel: 'Fotogalerie';" +
	"\n\t\taddExit: self plodinySkupina;" +
	"\n\t\taddExit: self plevele;" +
	"\n\t\taddExit: self hledej;" +
	"\n\t\tonForceStop: [self switchPath]",
	null, "2013-09-06T19:16:34Z", "mp"); //fytoportal-foto

jst.FYFotogalerieNavig.addMethod("switchPath", "", "processing", 
	"\tFytoportal current aktivujFotogalerii." +
	"\n\tsuper switchPath." +
	"\n\t",
	null, "2013-09-03T08:08:57Z", "mp");

jst.FYFotogalerieNavig.addMethod("hledej", "", "accessing", 
	"\t^ paths at: #hledej ifAbsentPut: [" +
	"\n\t\tAppCrossroad new" +
	"\n\t\t\taddExit: self hledejPlodina;" +
	"\n\t\t\taddExit: self hledejSO]",
	null, "2013-01-17T07:28:19Z", "mp", 1);

jst.FYFotogalerieNavig.addMethod("hledej", "", "accessing", 
	"\t^ paths at: #hledej ifAbsentPut: [" +
	"\n\t\tAppCrossroad new" +
	"\n\t\t\tid: #hledej;" +
	"\n\t\t\taddExit: self hledejPlodina;" +
	"\n\t\t\taddExit: self hledejSO]",
	null, "2013-09-06T19:20:29Z", "mp"); //fytoportal-foto

jst.FYFotogalerieNavig.addMethod("hledejPlodina", "", "accessing", 
	"\t^ paths at: #hledejPlodina ifAbsentPut: [" +
	"\n\t\tAppCrossroad new addExit: self skodlOrgNaPlodine]",
	null, "2013-01-17T07:28:12Z", "mp", 1);

jst.FYFotogalerieNavig.addMethod("hledejPlodina", "", "accessing", 
	"\t^ paths at: #hledejPlodina ifAbsentPut: [" +
	"\n\t\tAppCrossroad new" +
	"\n\t\t\tid: #plod;" +
	"\n\t\t\taddExit: self skodlOrgNaPlodine]",
	null, "2013-09-06T19:20:43Z", "mp"); //fytoportal-foto

jst.FYFotogalerieNavig.addMethod("hledejSO", "", "accessing", 
	"\t^ paths at: #hledejSO ifAbsentPut: [" +
	"\n\t\tAppCrossroad new]",
	null, "2013-01-17T07:28:05Z", "mp", 1);

jst.FYFotogalerieNavig.addMethod("hledejSO", "", "accessing", 
	"\t^ paths at: #hledejSO ifAbsentPut: [" +
	"\n\t\tAppCrossroad new id: #so]",
	null, "2013-09-06T19:21:06Z", "mp"); //fytoportal-foto

/* zruseno
jst.FYFotogalerieNavig.addMethod("hostitelSO", "", "accessing", 
	"\t| soId |" +
	"\n\t\"id plodiny muze obsahovat prefix, ktery musim odstranit\"" +
	"\n\tsoId := self skodlOrgNaPlodine activeEntry value." +
	"\n\tsoId fourth = '-' ifTrue: [" +
	"\n\t\tsoId := soId allButFirst: 4]." +
	"\n\t^ soId",
	null, "2013-01-17T07:27:29Z", "mp", 1);

jst.FYFotogalerieNavig.addMethod("hostitelSO", "", "accessing", 
	"\t| soId |" +
	"\n\t\"id plodiny muze obsahovat prefix, ktery musim odstranit\"" +
	"\n\tsoId := self skodlOrgNaPlodine activeEntry value." +
	"\n\tsoId sixth = '-' ifTrue: [" +
	"\n\t\tsoId := soId allButFirst: 6]." +
	"\n\t^ soId",
	null, "2014-01-31T16:07:13Z", "mp"); //fytoportal-foto
*/

jst.FYFotogalerieNavig.addMethod("plevele", "", "accessing", 
	"\t^ paths at: #plevele ifAbsentPut: [" +
	"\n\t\tAppCrossroad new]",
	null, "2013-01-17T07:27:56Z", "mp", 1);

jst.FYFotogalerieNavig.addMethod("plevele", "", "accessing", 
	"\t^ paths at: #plevele ifAbsentPut: [" +
	"\n\t\tAppCrossroad new id: #plevele]",
	null, "2013-09-06T19:18:49Z", "mp"); //fytoportal-foto

jst.FYFotogalerieNavig.addMethod("plodinyPlodina", "", "accessing", 
	"\t^ paths at: #plodinyPlodina ifAbsentPut: [" +
	"\n\t\tAppCrossroad new addExit: self skodlOrgNaPlodine]",
	null, "2013-01-17T07:28:43Z", "mp", 1);

jst.FYFotogalerieNavig.addMethod("plodinyPlodina", "", "accessing", 
	"\t^ paths at: #plodinyPlodina ifAbsentPut: [" +
	"\n\t\tAppCrossroad new " +
	"\n\t\t\tid: #plod;" +
	"\n\t\t\taddExit: self skodlOrgNaPlodine]",
	null, "2013-09-06T19:18:16Z", "mp"); //fytoportal-foto

jst.FYFotogalerieNavig.addMethod("plodinySkupina", "", "accessing", 
	"\t^ paths at: #plodinySkupina ifAbsentPut: [" +
	"\n\t\tAppPath new addExit: self plodinyPlodina]",
	null, "2013-01-17T07:29:00Z", "mp", 1);

jst.FYFotogalerieNavig.addMethod("plodinySkupina", "", "accessing", 
	"\t^ paths at: #plodinySkupina ifAbsentPut: [" +
	"\n\t\tAppPath new " +
	"\n\t\t\tid: #skup;" +
	"\n\t\t\taddExit: self plodinyPlodina]",
	null, "2013-09-06T19:17:58Z", "mp"); //fytoportal-foto

jst.FYFotogalerieNavig.addMethod("skodlOrgNaPlodine", "", "accessing", 
	"\t^ paths at: #skodlOrgNaPlodine ifAbsentPut: [" +
	"\n\t\tAppCrossroad new]",
	null, "2013-01-17T07:29:15Z", "mp", 1);

jst.FYFotogalerieNavig.addMethod("skodlOrgNaPlodine", "", "accessing", 
	"\t^ paths at: #skodlOrgNaPlodine ifAbsentPut: [" +
	"\n\t\tAppCrossroad new id: #so]",
	null, "2013-09-06T19:18:31Z", "mp"); //fytoportal-foto

//*** FYDataTaxony ***

jst.FYDataTaxony.addMethod("nazvyTaxonu", "", "accessing", 
	"\t^ self doc viewNamed: 'nazvy'",
	null, "2014-03-04T21:14:54Z", "mp");

jst.FYDataTaxony.addMethod("cesky", "", "accessing", 
	"\t^ self doc viewNamed: 'cesky'",
	null, "2013-01-24T10:15:44Z", "mp");

jst.FYDataTaxony.addMethod("podleKodu", "", "accessing", 
	"\t^ self doc viewNamed: 'podleKodu'",
	null, "2013-04-08T09:12:18Z", "mp");

/*
jst.FYDataTaxony.addMethod("hledejNazvy:", "aString", "queries", 
	"\t| node|" +
	"\n\tnode := ExtTreeNode new." +
	"\n\t(self doc viewNamed: 'hledejNazvy') queryData do: [:d |" +
	"\n\t\t((d at: #key) detect: [:n | " +
	"\n\t\t\tn notNil and: [n includesSubString: aString caseSensitive: false]] ifNone: nil) ifNotNilDo: [:n | | nazev |" +
	"\n\t\t\t\tnazev := (d at: #key) first ifNil: [(d at: #key) second]. \"cesky nebo latinsky\"" +
	"\n\t\t\t\tnazev = n ifFalse: [nazev := nazev, ' (', n, ')']." +
	"\n\t\t\t\tnode children add: (ExtTreeNode new " +
	"\n\t\t\t\t\tid: (d at: #id); " +
	"\n\t\t\t\t\tleaf: true; " +
	"\n\t\t\t\t\ttext: nazev;" +
	"\n\t\t\t\t\tlink: (d at: #value ifAbsent: ''))" +
	"\n\t\t]" +
	"\n\t]." +
	"\n\t^ node",
	null, "2012-07-09T15:04:02Z", "mp");
*/
jst.FYDataTaxony.addMethod("hledejNazvy:podle:", "viewName text", "queries", 
	"\t| node vysl proxy |" +
	"\n\tnode := ExtTreeNode new." +
	"\n\tvysl := db server get: (self doc url, '/_list/najdiText', viewName" +
	"\n\t\taddParameter: 'text' value: text)." +
	"\n\tproxy := JSObjectProxy new." +
	"\n\tvysl do: [:obj |" +
	"\n\t\tproxy jsObject: obj." +
	"\n\t\tnode children add: (ExtTreeNode new " +
	"\n\t\t\tid: (proxy at: #id); " +
	"\n\t\t\tleaf: true; " +
	"\n\t\t\ttext: (proxy at: #text);" +
	"\n\t\t\tlink: (proxy at: #link))" +
	"\n\t]." +
	"\n\t^ node",
	null, "2013-01-28T09:27:52Z", "mp", 1);

jst.FYDataTaxony.addMethod("hledejNazvy:podle:", "viewName text", "queries", 
	"\t| node vysl proxy |" +
	"\n\tnode := ExtTreeNode new." +
	"\n\tvysl := self overNazvy: viewName podle: text." +
	"\n\tproxy := JSObjectProxy new." +
	"\n\tvysl do: [:obj |" +
	"\n\t\tproxy jsObject: obj." +
	"\n\t\tnode children add: (ExtTreeNode new " +
	"\n\t\t\tid: (proxy at: #id); " +
	"\n\t\t\tleaf: true; " +
	"\n\t\t\ttext: (proxy at: #text);" +
	"\n\t\t\tlink: (proxy at: #link))" +
	"\n\t]." +
	"\n\t^ node",
	null, "2013-09-16T09:25:22Z", "mp", 1);

jst.FYDataTaxony.addMethod("hledejNazvy:podle:", "viewName text", "queries", 
	"\t| node vysl proxy |" +
	"\n\tnode := ExtTreeNode new." +
	"\n\tvysl := self overNazvy: viewName, self publicSuffix podle: text." +
	"\n\tproxy := JSObjectProxy new." +
	"\n\tvysl do: [:obj |" +
	"\n\t\tproxy jsObject: obj." +
	"\n\t\tnode children add: (ExtTreeNode new " +
	"\n\t\t\tid: (proxy at: #id); " +
	"\n\t\t\tleaf: true; " +
	"\n\t\t\ttext: (proxy at: #text);" +
	"\n\t\t\tlink: (proxy at: #link))" +
	"\n\t]." +
	"\n\t^ node",
	null, "2014-01-19T22:40:07Z", "mp", 1);

jst.FYDataTaxony.addMethod("hledejNazvy:podle:", "viewName text", "queries", 
	"\t| node vysl proxy |" +
	"\n\tnode := ExtTreeNode new." +
	"\n\tvysl := self overNazvy: viewName, self publicSuffix podle: text." +
	"\n\tproxy := JSObjectProxy new." +
	"\n\tvysl do: [:obj |" +
	"\n\t\tproxy jsObject: obj." +
	"\n\t\tnode children add: (ExtTreeNode new " +
	"\n\t\t\tid: (proxy at: #id); " +
	"\n\t\t\tleaf: true; " +
	"\n\t\t\ttext: (proxy at: #text);" +
	"\n\t\t\tlink: (proxy at: #link);" +
	"\n\t\t\ticonCls: (viewName = #nazvyPlodin ifTrue: [#'icon-plodina']))" +
	"\n\t]." +
	"\n\t^ node",
	null, "2014-02-05T21:45:16Z", "mp"); //fytoportal-foto

jst.FYDataTaxony.addMethod("overNazvy:podle:", "viewName text", "queries", 
	"\t^ db server get: (self doc url, '/_list/najdiText', viewName" +
	"\n\t\taddParameter: 'text' value: text)",
	null, "2013-09-16T09:24:49Z", "mp");

jst.FYDataTaxony.addMethod("podleId", "", "accessing", 
	"\t^ (self doc viewNamed: 'podleId')" +
	"\n\t\tincludeDocs: true",
	null, "2013-05-19T21:35:19Z", "mp");

jst.FYDataTaxony.addMethod("podleMetodikSO", "", "accessing", 
	"\t^ self doc viewNamed: 'podleMetodikSO'",
	null, "2013-05-20T07:02:39Z", "mp");

jst.FYDataTaxony.addMethod("nazvyComboBox", "", "accessing", 
	"\t^ ExtComboBox new " +
	"\n\t\ttypeAhead: true;" +
	"\n\t\ttriggerAction: #all;" +
	"\n\t\tforceSelection: true;" +
	"\n\t\tselectOnFocus: true;" +
	"\n\t\tmode: 'local';" +
	"\n\t\tstore: (ExtJsonStore new" +
	"\n\t\t\trestful: true;" +
	"\n\t\t\tautoLoad: true;" +
	"\n\t\t\tautoDestroy: true;" +
	"\n\t\t\turl: self doc url, '_list/store-nazvy/cesky';" +
	"\n\t\t\troot: 'rows';" +
	"\n\t\t\tfields: {'id'. 'nazev'});" +
	"\n\t\tdisplayField: 'nazev';" +
	"\n\t\tvalueField: 'id'",
	null, "2013-06-21T19:37:04Z", "mp");

jst.FYDataTaxony.addMethod("zarazeni:", "nazev", "accessing", 
	"\t\"rise rad trida celed\"" +
	"\n\t^ self doc viewNamed: nazev",
	null, "2013-09-18T21:36:11Z", "mp");

//*** FYDataPlodiny ***

jst.FYDataPlodiny.addMethod("podleSkupiny", "", "accessing", 
	"\t^ self doc viewNamed: 'podleSkupiny'",
	null, "2012-06-16T21:52:22Z", "mp", 1);

jst.FYDataPlodiny.addMethod("podleSkupiny", "", "accessing", 
	"\t^ self doc viewNamed: 'podleSkupiny', self publicSuffix",
	null, "2014-01-19T22:39:40Z", "mp"); //fytoportal-foto

jst.FYDataPlodiny.addMethod("treeLoader", "", "accessing", 
	"\t^ ExtTreeLoader couchdb" +
	"\n\t\tdataUrl: self podleSkupiny url; " +
	"\n\t\tnodeCreator: self nodeCreator;" +
	"\n\t\ton: #beforeload do: [:loader :node | " +
	"\n\t\t\tloader baseParams removeKey: 'key'." +
	"\n\t\t\tloader parameterAt: 'startkey' put: '[\"', node id, '\",\"a\"]'." +
	"\n\t\t\tloader parameterAt: 'endkey' put: '[\"', node id, '\",\"zz\"]'];" +
	"\n\t\tyourself",
	null, "2012-08-25T12:51:44Z", "mp", 1);

jst.FYDataPlodiny.addMethod("treeLoader", "", "accessing", 
	"\t^ ExtTreeLoader couchdb" +
	"\n\t\tdataUrl: self podleSkupiny url; " +
	"\n\t\tnodeCreator: self nodeCreator;" +
	"\n\t\ton: #beforeload do: [:loader :node | " +
	"\n\t\t\tloader baseParams removeKey: 'key'." +
	"\n\t\t\tloader parameterAt: #startkey put: {node id. 'a'}." +
	"\n\t\t\tloader parameterAt: #endkey put: {node id. 'zz'}];" +
	"\n\t\tyourself",
	null, "2013-06-29T10:08:49Z", "mp", 1);

jst.FYDataPlodiny.addMethod("treeLoader", "", "accessing", 
	"\t^ ExtTreeLoader couchdb" +
	"\n\t\tdataUrl: self podleSkupiny url; " +
	"\n\t\tnodeCreator: self nodeCreator;" +
	"\n\t\ton: #beforeload do: [:loader :node | " +
	"\n\t\t\tloader baseParams removeKey: 'key'." +
	"\n\t\t\tloader parameterAt: #startkey put: {node id. 'a'}." +
	"\n\t\t\tloader parameterAt: #endkey put: {node id. 'zz'}];" +
	"\n\t\tresponseDataExtractor: [:loader :node :resp | | data |" +
	"\n\t\t\tdata := (JSON full decode: (resp at: 'responseText')) at: #rows." +
	"\n\t\t\tpodrizenePocty := self podrizenePocty queryDataBy: " +
	"\n\t\t\t\t{'keys'. data collect: [:d | d at: #id]. 'group'. true}." +
	"\n\t\t\tdata];" +
	"\n\t\tyourself",
	null, "2014-01-29T22:01:09Z", "mp"); //fytoportal-foto

jst.FYDataPlodiny.addMethod("nodeCreator", "", "private", 
	"\t^ [:attr | | node |" +
	"\n\t\t\"key obsahuje nazev skupiny a nazev plodiny, z nazvu skupiny pouziji prvni tri znakly jako prefix," +
	"\n\t\tprotoze plodina muze byt ve vice skupinach a pokazde musi mit ve strome jedinecny id" +
	"\n\t\tvalue znaci, zda plodina obsahuje podrizene (sloucene) druhy\"" +
	"\n\t\tnode := (attr at: #value) = true" +
	"\n\t\t\tifTrue: [ExtAsyncTreeNode new " +
	"\n\t\t\t\tloader: (FYPodrizenePlodinyLoader skupina: (attr at: #key) first)] " +
	"\n\t\t\tifFalse: [ExtTreeNode new leaf: true]." +
	"\n\t\tnode " +
	"\n\t\t\tid: ((attr at: #key) first first: 3), '-', (attr at: #id); " +
	"\n\t\t\ttext: (attr at: #key) second;" +
	"\n\t\t\ticonCls: #'icon-plodina']",
	null, "2012-08-30T13:30:23Z", "mp", 1);

jst.FYDataPlodiny.addMethod("nodeCreator", "", "private", 
	"\t^ [:attr | | node |" +
	"\n\t\t\"key obsahuje nazev skupiny a nazev plodiny, z nazvu skupiny pouziji prvnich 5 znaku jako prefix," +
	"\n\t\tprotoze plodina muze byt ve vice skupinach a pokazde musi mit ve strome jedinecny id" +
	"\n\t\tvalue znaci, zda plodina obsahuje podrizene (sloucene) druhy\"" +
	"\n\t\tnode := (attr at: #value) = true" +
	"\n\t\t\tifTrue: [ExtAsyncTreeNode new " +
	"\n\t\t\t\tloader: (FYPodrizenePlodinyLoader skupina: (attr at: #key) first)] " +
	"\n\t\t\tifFalse: [ExtTreeNode new leaf: true]." +
	"\n\t\tnode " +
	"\n\t\t\tid: ((attr at: #key) first first: 5), '-', (attr at: #id); " +
	"\n\t\t\ttext: (attr at: #key) second;" +
	"\n\t\t\ticonCls: #'icon-plodina']",
	null, "2014-01-28T22:10:37Z", "mp", 1);

jst.FYDataPlodiny.addMethod("nodeCreator", "", "private", 
	"\t^ [:attr | | node |" +
	"\n\t\t\"key obsahuje nazev skupiny a nazev plodiny, z nazvu skupiny pouziji prvnich 5 znaku jako prefix," +
	"\n\t\tprotoze plodina muze byt ve vice skupinach a pokazde musi mit ve strome jedinecny id\"" +
	"\n\t\tnode := (podrizenePocty anySatisfy: [:d | d key = (attr at: #id)])" +
	"\n\t\t\tifTrue: [ExtAsyncTreeNode new " +
	"\n\t\t\t\tloader: (FYPodrizenePlodinyLoader skupina: (attr at: #key) first)] " +
	"\n\t\t\tifFalse: [ExtTreeNode new leaf: true]." +
	"\n\t\tnode " +
	"\n\t\t\tid: ((attr at: #key) first first: 5), '-', (attr at: #id); " +
	"\n\t\t\ttext: (attr at: #key) second;" +
	"\n\t\t\ticonCls: #'icon-plodina']",
	null, "2014-01-29T21:40:07Z", "mp"); //fytoportal-foto

jst.FYDataPlodiny.addMethod("podrizenePocty", "", "accessing", 
	"\t^ self doc viewNamed: 'podrizene-pocty'",
	null, "2014-01-29T21:24:15Z", "mp"); //fytoportal-foto

jst.FYDataPlodiny.addMethod("podrizenePlodiny", "", "accessing", 
	"\t^ self doc viewNamed: 'podrizene'",
	null, "2012-08-25T20:03:32Z", "mp");

jst.FYDataPlodiny.addMethod("podrizeneNazvy", "", "accessing", 
	"\t^ self doc viewNamed: 'podrizene-nazvy'",
	null, "2014-01-30T10:46:55Z", "mp"); //fytoportal-foto

/* zruseno
jst.FYDataPlodiny.addMethod("podrizenePlodiny:", "id", "accessing", 
	"\t^ self podrizenePlodiny" +
	"\n\t\tstartKey: {id. 'a'};" +
	"\n\t\tendKey: {id. 'zz'};" +
	"\n\t\tqueryData",
	null, "2012-08-25T20:03:47Z", "mp");
*/

jst.FYDataPlodiny.addMethod("kody", "", "accessing", 
	"\t^ self doc viewNamed: 'kody'",
	null, "2013-10-07T19:17:09Z", "mp");

//*** FYPodrizenePlodinyLoader ***

jst.FYPodrizenePlodinyLoader.addMethod("skupina:", "aString", "accessing", 
	"\tskupina := aString",
	null, "2012-08-25T12:48:57Z", "mp");

jst.FYPodrizenePlodinyLoader.addMethod("createNode:", "attr", "private", 
	"\t^ (ExtTreeNode new " +
	"\n\t\tleaf: true;" +
	"\n\t\tid: (skupina first: 3), '-', (attr at: #id); " +
	"\n\t\ttext: (attr at: #key) second;" +
	"\n\t\ticonCls: #'icon-plodina') asJsObject",
	null, "2012-08-30T13:53:48Z", "mp", 1);

jst.FYPodrizenePlodinyLoader.addMethod("createNode:", "attr", "private", 
	"\t^ (ExtTreeNode new " +
	"\n\t\tleaf: true;" +
	"\n\t\tid: (skupina first: 5), '-', (attr at: #id); " +
	"\n\t\ttext: (attr at: #key) second;" +
	"\n\t\ticonCls: #'icon-plodina') asJsObject",
	null, "2014-01-29T22:02:12Z", "mp"); //fytoportal-foto

jst.FYPodrizenePlodinyLoader._class.addMethod("skupina:", "aString", "instance creation", 
	"\t^ self couchdb" +
	"\n\t\tskupina: aString;" +
	"\n\t\tdataUrl: Fytoportal data plodiny podrizenePlodiny url; " +
	"\n\t\ton: #beforeload do: [:loader :node | | parent |" +
	"\n\t\t\tparent := node id allButFirst: 4." +
	"\n\t\t\tloader baseParams removeKey: 'key'." +
	"\n\t\t\tloader parameterAt: 'startkey' put: '[\"', parent, '\",\"a\"]'." +
	"\n\t\t\tloader parameterAt: 'endkey' put: '[\"', parent, '\",\"zz\"]'];" +
	"\n\t\tyourself",
	null, "2012-08-25T20:29:51Z", "mp", 1);

jst.FYPodrizenePlodinyLoader._class.addMethod("skupina:", "aString", "instance creation", 
	"\t^ self couchdb" +
	"\n\t\tskupina: aString;" +
	"\n\t\tdataUrl: Fytoportal data plodiny podrizenePlodiny url; " +
	"\n\t\ton: #beforeload do: [:loader :node | | parent |" +
	"\n\t\t\tparent := node id allButFirst: 4." +
	"\n\t\t\tloader baseParams removeKey: 'key'." +
	"\n\t\t\tloader parameterAt: 'startkey' put: {parent. 'a'}." +
	"\n\t\t\tloader parameterAt: 'endkey' put: {parent. 'zz'}];" +
	"\n\t\tyourself",
	null, "2013-04-04T21:26:09Z", "mp", 1);

jst.FYPodrizenePlodinyLoader._class.addMethod("skupina:", "aString", "instance creation", 
	"\t^ self couchdb" +
	"\n\t\tskupina: aString;" +
	"\n\t\tdataUrl: Fytoportal data plodiny podrizenePlodiny url; " +
	"\n\t\ton: #beforeload do: [:loader :node | | parent |" +
	"\n\t\t\tparent := node id allButFirst: 6." +
	"\n\t\t\tloader baseParams removeKey: 'key'." +
	"\n\t\t\tloader parameterAt: 'startkey' put: {parent. 'a'}." +
	"\n\t\t\tloader parameterAt: 'endkey' put: {parent. 'zz'}];" +
	"\n\t\tyourself",
	null, "2014-01-29T22:08:02Z", "mp", 1);

jst.FYPodrizenePlodinyLoader._class.addMethod("skupina:", "aString", "instance creation", 
	"\t^ self couchdb" +
	"\n\t\tskupina: aString;" +
	"\n\t\tdataUrl: Fytoportal data plodiny podrizeneNazvy url; " +
	"\n\t\ton: #beforeload do: [:loader :node | | parent |" +
	"\n\t\t\tparent := node id allButFirst: 6." +
	"\n\t\t\tloader baseParams removeKey: 'key'." +
	"\n\t\t\tloader parameterAt: 'startkey' put: {parent. 'a'}." +
	"\n\t\t\tloader parameterAt: 'endkey' put: {parent. 'zz'}];" +
	"\n\t\tyourself",
	null, "2014-01-30T10:46:42Z", "mp"); //fytoportal-foto

//*** FYDataSkodlOrg ***

jst.FYDataSkodlOrg.addMethod("podlePlodiny:", "id", "queries", 
	"\t^ (self doc viewNamed: 'podlePlodiny')" +
	"\n\t\tstartKey: {id. 'a'};" +
	"\n\t\tendKey: {id. 'zz'};" +
	"\n\t\tqueryData",
	null, "2012-07-02T13:23:15Z", "mp", 1);

jst.FYDataSkodlOrg.addMethod("podlePlodiny:", "id", "queries", 
	"\t^ (self doc viewNamed: 'podlePlodiny', self publicSuffix)" +
	"\n\t\tstartKey: {id. 'a'};" +
	"\n\t\tendKey: {id. 'zz'};" +
	"\n\t\tqueryData",
	null, "2014-01-19T22:39:53Z", "mp", 1);

jst.FYDataSkodlOrg.addMethod("podlePlodiny:", "id", "queries", 
	"\t| plodiny |" +
	"\n\tplodiny := OrderedCollection with: id." +
	"\n\t(Fytoportal data plodiny podrizenePlodiny lookupKey: id) do: [:row | " +
	"\n\t\tplodiny add: row id]." +
	"\n\t^ ((self doc viewNamed: 'podlePlodiny2', self publicSuffix)" +
	"\n\t\tlookupKeys: plodiny)  inject: OrderedCollection new into: [:coll :row | " +
	"\n\t\t\tcoll add: row value; yourself]",
	null, "2014-01-30T14:21:39Z", "mp", 1);

jst.FYDataSkodlOrg.addMethod("podlePlodiny:", "id", "queries", 
	"\t| plodiny vysl |" +
	"\n\tplodiny := OrderedCollection with: id." +
	"\n\t(Fytoportal data plodiny podrizenePlodiny lookupKey: id) do: [:row | " +
	"\n\t\tplodiny add: row id]." +
	"\n\tvysl := SortedCollection new." +
	"\n\t((self doc viewNamed: 'podlePlodiny2', self publicSuffix)" +
	"\n\t\tdataClass: ExtTreeNode ;" +
	"\n\t\tlookupKeys: plodiny)  do: [:row | " +
	"\n\t\t\tvysl addUnique: (row value leaf: true)]." +
	"\n\t^ OrderedCollection withAll: vysl",
	null, "2014-01-30T15:32:56Z", "mp"); //fytoportal-foto

jst.FYDataSkodlOrg.addMethod("hostitele", "", "accessing", 
	"\t^ self doc viewNamed: 'hostitele'",
	null, "2013-10-07T21:08:08Z", "mp");

jst.FYDataSkodlOrg.addMethod("kody", "", "accessing", 
	"\t^ self doc viewNamed: 'kody'",
	null, "2014-02-16T21:29:44Z", "mp");

//*** FYDataFotky ***

jst.FYDataFotky.addMethod("autori", "", "accessing", 
	"\t\"Fytoportal data fotky autori queryDataBy: {'group'. true}\"" +
	"\n\t^ self doc viewNamed: 'autori'",
	null, "2013-06-24T13:11:47Z", "mp");

jst.FYDataFotky.addMethod("fotkyPlodiny", "", "accessing", 
	"\t^ self doc viewNamed: 'fotkyPlodiny'",
	null, "2012-06-18T21:23:45Z", "mp", 1);

jst.FYDataFotky.addMethod("fotkyPlodiny", "", "accessing", 
	"\t^ (self doc viewNamed: 'fotkyPlodiny') " +
	"\n\t\tdataClass: FYFotoView",
	null, "2013-11-30T23:35:08Z", "mp"); //fytoportal-foto

jst.FYDataFotky.addMethod("fotkySkodlOrg", "", "accessing", 
	"\t^ self doc viewNamed: 'fotkySkodlOrg'",
	null, "2012-06-21T10:04:18Z", "mp", 1);

jst.FYDataFotky.addMethod("fotkySkodlOrg", "", "accessing", 
	"\t^ (self doc viewNamed: 'fotkySkodlOrg')" +
	"\n\t\tdataClass: FYFotoView",
	null, "2013-11-30T23:35:30Z", "mp", 2);

jst.FYDataFotky.addMethod("fotkySkodlOrg", "", "accessing", 
	"\t^ (self doc viewNamed: 'fotkySkodlOrg2')" +
	"\n\t\tdataClass: FYFotoView",
	null, "2014-03-08T22:02:02Z", "mp"); //fytoportal-foto

/* nepouziva se
jst.FYDataFotky.addMethod("podlePlodiny", "", "accessing", 
	"\t\"fotky vsech SO na plodine, mimo fotky samotne plodiny\"" +
	"\n\t^ self doc viewNamed: 'podlePlodiny'",
	null, "2012-08-29T15:19:48Z", "mp");
*/

jst.FYDataFotky.addMethod("vybraneFotkySkodlOrg", "", "accessing", 
	"\t^ (self doc listNamed: #vybraneFotky) view: #fotkySkodlOrg2",
	null, "2013-05-17T08:20:28Z", "mp");

jst.FYDataFotky.addMethod("vybraneFotkyPlodiny", "", "accessing", 
	"\t^ (self doc listNamed: #vybraneFotky) view: #fotkyPlodiny",
	null, "2013-05-16T22:02:48Z", "mp");

jst.FYDataFotky.addMethod("nahledyFotekSO", "", "accessing", 
	"\t^ (self doc viewNamed: 'nahledyFotekSO')" +
	"\n\t\tdataClass: FYFotoView",
	null, "2014-03-05T14:55:47Z", "mp");

//*** FYPlodinyPanel ***

/* zruseno
jst.FYPlodinyPanel.addMethod("createRoot", "", "private", 
	"\t^ ExtTreeNode new" +
	"\n\t\tchildren: (Fytoportal data skupinyPlodin collect: [:skupina |" +
	"\n\t\t\tExtAsyncTreeNode new" +
	"\n\t\t\t\tid: skupina;" +
	"\n\t\t\t\ttext: skupina;" +
	"\n\t\t\t\tlink: #skupina])",
	null, "2012-08-26T19:04:13Z", "mp");
*/

//titulek zlobi => konec posuvniku se na zacatku schova pod dolni okraj

jst.FYPlodinyPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\twithBorderLayout;" +
	"\n\t\tadd: (self filtrPanel region: #north);" +
	"\n\t\tadd: (ExtTabPanel new" +
	"\n\t\t\tregion: #center;" +
	"\n\t\t\tborder: false;" +
	"\n\t\t\tactiveTab: 1;" +
	"\n\t\t\tadd: (podleSkupin := FYTreePanel new" +
	"\n\t\t\t\ttitle: 'Plodiny podle skupin';" +
	"\n\t\t\t\tloader: Fytoportal data plodiny treeLoader;" +
	"\n\t\t\t\troot: self createRoot);" +
	"\n\t\t\tadd: (vyhledane := FYTreePanel title: 'Vyhledané');" +
	"\n\t\t\tyourself)." +
	"\n\tsearchField " +
	"\n\t\t\"on: #change do: [:field :oldVal :newVal | Fytoportal navigator fotogalerie hledej value: field value];\"" +
	"\n\t\ton: #specialkey do: [:field :ev | ev enterPressed ifTrue: [Fytoportal navigator fotogalerie hledej enter: field value]]",
	null, "2013-01-04T15:18:09Z", "mp", 1);

jst.FYPlodinyPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\twithBorderLayout;" +
	"\n\t\tadd: (self filtrPanel region: #north);" +
	"\n\t\tadd: (ExtTabPanel new" +
	"\n\t\t\tregion: #center;" +
	"\n\t\t\tborder: false;" +
	"\n\t\t\tactiveTab: 1;" +
	"\n\t\t\tadd: (podleSkupin := FYTreePanel new" +
	"\n\t\t\t\ttitle: 'Plodiny podle skupin';" +
	"\n\t\t\t\tloader: Fytoportal data plodiny treeLoader;" +
	"\n\t\t\t\troot: self createRoot);" +
	"\n\t\t\tadd: (vyhledane := FYTreePanel title: 'Vyhledané');" +
	"\n\t\t\tyourself)." +
	"\n\tsearchField " +
	"\n\t\t\"on: #change do: [:field :oldVal :newVal | Fytoportal navigator fotogalerie hledej value: field value];\"" +
	"\n\t\ton: #specialkey do: [:field :ev | ev enterPressed ifTrue: [" +
	"\n\t\t\tFytoportal navigator fotogalerie hledej trackHistory: [:p | " +
	"\n\t\t\t\tp enter: field value]]]",
	null, "2013-08-23T07:16:02Z", "mp", 1);

jst.FYPlodinyPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\twithBorderLayout;" +
	"\n\t\tadd: (self filtrPanel region: #north);" +
	"\n\t\tadd: (ExtTabPanel new" +
	"\n\t\t\tregion: #center;" +
	"\n\t\t\tborder: false;" +
	"\n\t\t\tactiveTab: 1;" +
	"\n\t\t\tadd: (podleSkupin := FYTreePanel new" +
	"\n\t\t\t\ttitle: 'Plodiny podle skupin';" +
	"\n\t\t\t\tloader: Fytoportal data plodiny treeLoader;" +
	"\n\t\t\t\troot: Fytoportal data skupinyPlodin);" +
	"\n\t\t\tadd: (vyhledane := FYTreePanel title: 'Vyhledané');" +
	"\n\t\t\tyourself)." +
	"\n\tsearchField " +
	"\n\t\t\"on: #change do: [:field :oldVal :newVal | Fytoportal navigator fotogalerie hledej value: field value];\"" +
	"\n\t\ton: #specialkey do: [:field :ev | ev enterPressed ifTrue: [" +
	"\n\t\t\tFytoportal navigator fotogalerie hledej trackHistory: [:p | " +
	"\n\t\t\t\tp enter: field value]]]",
	null, "2014-01-29T08:17:54Z", "mp", 1);

jst.FYPlodinyPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\twithBorderLayout;" +
	"\n\t\tadd: (hledej := FYHledejPanel new" +
	"\n\t\t\tregion: #north;" +
	"\n\t\t\tsearchPath: Fytoportal navigator fotogalerie hledej);" +
	"\n\t\tadd: (ExtTabPanel new" +
	"\n\t\t\tregion: #center;" +
	"\n\t\t\tborder: false;" +
	"\n\t\t\tactiveTab: 1;" +
	"\n\t\t\tadd: (podleSkupin := FYTreePanel new" +
	"\n\t\t\t\ttitle: 'Plodiny podle skupin';" +
	"\n\t\t\t\tloader: Fytoportal data plodiny treeLoader;" +
	"\n\t\t\t\troot: Fytoportal data skupinyPlodin);" +
	"\n\t\t\tadd: (vyhledane := FYTreePanel title: 'Vyhledané');" +
	"\n\t\t\tyourself)",
	null, "2014-03-21T22:36:18Z", "mp"); //fytoportal-foto

jst.FYPlodinyPanel.addMethod("installListeners", "", "private", 
	"\tsuper installListeners." +
	"\n\tFytoportal navigator fotogalerie plodinySkupina " +
	"\n\t\tcomponent: podleSkupin." +
	"\n\tFytoportal navigator fotogalerie plodinyPlodina" +
	"\n\t\tinstallStandardTreeListenersWith: [:n | n link ~= #skupina];" +
	"\n\t\tonEnter: [:path :node | " +
	"\n\t\t\tFytoportal navigator fotogalerie plodinySkupina enterNode: " +
	"\n\t\t\t\t(node detectParent: [:n | n link = #skupina])." +
	"\n\t\t\tself changed: #plodina with: node]." +
	"\n\tFytoportal navigator fotogalerie hledej" +
	"\n\t\tcomponent: searchField;" +
	"\n\t\tonEnter: [:path :text |" +
	"\n\t\t\tpath label: 'vyhledáno \"', text, '\"'." +
	"\n\t\t\tUIManager default informUser: 'Hledám názvy, čekejte...' during: [vyhledane " +
	"\n\t\t\t\troot: (Fytoportal data taxony hledejNazvy: #nazvyPlodin podle: text);" +
	"\n\t\t\t\tshow." +
	"\n\t\t\tself changed: 'filtr' with: text]]." +
	"\n\tFytoportal navigator fotogalerie hledejPlodina " +
	"\n\t\tcomponent: vyhledane;" +
	"\n\t\tinstallStandardTreeListeners;" +
	"\n\t\tonEnter: [:path :node | " +
	"\n\t\t\tFytoportal navigator fotogalerie hledej label: nil." +
	"\n\t\t\tself changed: #plodina with: node]",
	null, "2013-01-28T09:28:53Z", "mp", 1);

jst.FYPlodinyPanel.addMethod("installListeners", "", "private", 
	"\tsuper installListeners." +
	"\n\tFytoportal navigator fotogalerie plodinySkupina " +
	"\n\t\tcomponent: podleSkupin." +
	"\n\tFytoportal navigator fotogalerie plodinyPlodina" +
	"\n\t\tinstallStandardTreeListenersWith: [:n | n link ~= #skupina];" +
	"\n\t\tonEnter: [:path :node | " +
	"\n\t\t\tFytoportal navigator fotogalerie plodinySkupina enterNode: " +
	"\n\t\t\t\t(node detectParent: [:n | n link = #skupina])." +
	"\n\t\t\tself changed: #plodina with: node]." +
	"\n\tFytoportal navigator fotogalerie hledej" +
	"\n\t\tcomponent: searchField;" +
	"\n\t\tonEnter: [:path :text |" +
	"\n\t\t\tpath label: 'vyhledáno \"', text, '\"'." +
	"\n\t\t\tUIManager default informUser: 'Hledám názvy, čekejte...' during: [vyhledane " +
	"\n\t\t\t\troot: (Fytoportal data taxony hledejNazvy: #nazvyPlodin podle: text);" +
	"\n\t\t\t\tshow." +
	"\n\t\t\tself changed: #filtr with: text]];" +
	"\n\t\tonForceStop: [:path :text :last :asyncBlock | " +
	"\n\t\t\tsearchField value: text." +
	"\n\t\t\tpath enter: text." +
	"\n\t\t\tlast ifFalse: [" +
	"\n\t\t\t\t\"pokud soucasne aktivuji i vyhledany taxon (last=false), neni v tuto chvili patrne jeste nacten\"" +
	"\n\t\t\t\t[asyncBlock value] delayed: 500]]." +
	"\n\tFytoportal navigator fotogalerie hledejPlodina " +
	"\n\t\tcomponent: vyhledane;" +
	"\n\t\tinstallStandardTreeListeners;" +
	"\n\t\tonEnter: [:path :node | " +
	"\n\t\t\tFytoportal navigator fotogalerie hledej label: nil." +
	"\n\t\t\tself changed: #plodina with: node]",
	null, "2013-08-23T07:58:42Z", "mp", 1);

jst.FYPlodinyPanel.addMethod("installListeners", "", "private", 
	"\tsuper installListeners." +
	"\n\tFytoportal navigator fotogalerie plodinySkupina " +
	"\n\t\tcomponent: podleSkupin." +
	"\n\tFytoportal navigator fotogalerie plodinyPlodina" +
	"\n\t\tinstallStandardTreeListenersWith: [:n | n link ~= #skupina];" +
	"\n\t\tonEnter: [:path :node | " +
	"\n\t\t\tFytoportal navigator fotogalerie plodinySkupina enterNode: " +
	"\n\t\t\t\t(node detectParent: [:n | n link = #skupina])." +
	"\n\t\t\tself changed: #plodina with: node];" +
	"\n\t\tonForceStop: [:path :token :last :asyncBlock | " +
	"\n\t\t\tpodleSkupin forcePathStop: path on: token last: last ifAsync: asyncBlock." +
	"\n\t\t\tpodleSkupin selectedNode ifNil: [ | pl parentId |" +
	"\n\t\t\t\t\"nenasel jsem -> musim rozbalit nadrazenou plodinu\"" +
	"\n\t\t\t\tpl := Fytoportal db loadObject: (token copyAfter: '-')." +
	"\n\t\t\t\t\"pro jednoduchost jen ve stejne skupine plodin, cili pouziji stejny prefix\"" +
	"\n\t\t\t\tparentId := (token copyUpTo: '-'), '-', pl parent asString." +
	"\n\t\t\t\t(podleSkupin selectNodeBy: [:n | n id asString = parentId] silently: true) ifNotNilDo: [:n |" +
	"\n\t\t\t\t\t\"nasel jsem - rozbalim a zavolam asyncBlock\"" +
	"\n\t\t\t\t\tn expandDeep: false anim: false thenDo: asyncBlock]." +
	"\n\t\t\t] ifNotNilDo: [:n |" +
	"\n\t\t\t\t\"podrizene plodiny jsou nactene, nadrazena plodina by ale mohla by zabalena\"" +
	"\n\t\t\t\tn parentNode expand]" +
	"\n\t\t]." +
	"\n\tFytoportal navigator fotogalerie hledej" +
	"\n\t\tcomponent: searchField;" +
	"\n\t\tonEnter: [:path :text |" +
	"\n\t\t\tpath label: 'vyhledáno \"', text, '\"'." +
	"\n\t\t\tUIManager default informUser: 'Hledám názvy, čekejte...' during: [vyhledane " +
	"\n\t\t\t\troot: (Fytoportal data taxony hledejNazvy: #nazvyPlodin podle: text);" +
	"\n\t\t\t\tshow." +
	"\n\t\t\tself changed: #filtr with: text]];" +
	"\n\t\tonForceStop: [:path :text :last :asyncBlock | " +
	"\n\t\t\tsearchField value: text." +
	"\n\t\t\tpath enter: text." +
	"\n\t\t\tlast ifFalse: [" +
	"\n\t\t\t\t\"pokud soucasne aktivuji i vyhledany taxon (last=false), neni v tuto chvili patrne jeste nacten\"" +
	"\n\t\t\t\t[asyncBlock value] delayed: 500]]." +
	"\n\tFytoportal navigator fotogalerie hledejPlodina " +
	"\n\t\tcomponent: vyhledane;" +
	"\n\t\tinstallStandardTreeListeners;" +
	"\n\t\tonEnter: [:path :node | " +
	"\n\t\t\tFytoportal navigator fotogalerie hledej label: nil." +
	"\n\t\t\tself changed: #plodina with: node]",
	null, "2013-09-05T07:30:24Z", "mp", 1);

jst.FYPlodinyPanel.addMethod("installListeners", "", "private", 
	"\tsuper installListeners." +
	"\n\tFytoportal navigator fotogalerie plodinySkupina " +
	"\n\t\tcomponent: podleSkupin." +
	"\n\tFytoportal navigator fotogalerie plodinyPlodina" +
	"\n\t\tinstallStandardTreeListenersWith: [:n | n link ~= #skupina];" +
	"\n\t\tonEnter: [:path :node | " +
	"\n\t\t\tFytoportal navigator fotogalerie plodinySkupina enterNode: " +
	"\n\t\t\t\t(node detectParent: [:n | n link = #skupina])." +
	"\n\t\t\tself changed: #plodina with: node];" +
	"\n\t\tonForceStop: [:path :token :last :asyncBlock | " +
	"\n\t\t\tpodleSkupin forcePathStop: path on: token last: last ifAsync: asyncBlock." +
	"\n\t\t\tpodleSkupin selectedNode ifNil: [ | pl parentId |" +
	"\n\t\t\t\t\"nenasel jsem -> musim rozbalit nadrazenou plodinu\"" +
	"\n\t\t\t\tpl := Fytoportal db loadObject: (token copyAfter: '-')." +
	"\n\t\t\t\t\"pro jednoduchost jen ve stejne skupine plodin, cili pouziji stejny prefix\"" +
	"\n\t\t\t\tparentId := (token copyUpTo: '-'), '-', pl parent asString." +
	"\n\t\t\t\t(podleSkupin selectNodeBy: [:n | n id asString = parentId] silently: true) ifNotNilDo: [:n |" +
	"\n\t\t\t\t\t\"nasel jsem - rozbalim a zavolam asyncBlock\"" +
	"\n\t\t\t\t\tn expandDeep: false anim: false thenDo: asyncBlock]." +
	"\n\t\t\t] ifNotNilDo: [:n |" +
	"\n\t\t\t\t\"podrizene plodiny jsou nactene, nadrazena plodina by ale mohla by zabalena\"" +
	"\n\t\t\t\tn parentNode expand]" +
	"\n\t\t]." +
	"\n\tFytoportal navigator fotogalerie hledej" +
	"\n\t\tonEnter: [:path :text |" +
	"\n\t\t\tpath label: 'vyhledáno \"', (text ifNil: ['']), '\"'." +
	"\n\t\t\tUIManager default informUser: 'Hledám názvy, čekejte...' during: [vyhledane " +
	"\n\t\t\t\troot: (Fytoportal data taxony hledejNazvy: #nazvyPlodin podle: text);" +
	"\n\t\t\t\tshow." +
	"\n\t\t\tself changed: #filtr with: text]];" +
	"\n\t\tonForceStop: [:path :text :last :asyncBlock | " +
	"\n\t\t\thledej value: text." +
	"\n\t\t\tpath enter: text." +
	"\n\t\t\tlast ifFalse: [" +
	"\n\t\t\t\t\"pokud soucasne aktivuji i vyhledany taxon (last=false), neni v tuto chvili patrne jeste nacten\"" +
	"\n\t\t\t\t[asyncBlock value] delayed: 500]]." +
	"\n\tFytoportal navigator fotogalerie hledejPlodina " +
	"\n\t\tcomponent: vyhledane;" +
	"\n\t\tinstallStandardTreeListeners;" +
	"\n\t\tonEnter: [:path :node | " +
	"\n\t\t\tFytoportal navigator fotogalerie hledej label: nil." +
	"\n\t\t\tself changed: #plodina with: node]",
	null, "2014-03-21T22:42:38Z", "mp"); //fytoportal-foto

jst.FYPlodinyPanel.addMethod("afterrenderEvent", "", "events", 
	"\t^ [self doLayout]",
	null, "2012-11-08T20:15:12Z", "mp");

/* presunuto do FYHledejPanel
jst.FYPlodinyPanel.addMethod("filtrPanel", "", "private", 
	"\t^ ExtFormPanel new " +
	"\n\t\tcls: 'x-panel-mc';" +
	"\n\t\tstyle: 'padding-top: 1px';" +
	"\n\t\theight: 30; " +
	"\n\t\tlayout: (ExtHBoxLayout new withStretchAlign; padding: 3); " +
	"\n\t\tborder: false;" +
	"\n\t\tadd: (ExtButton new text: 'Hledej'; flex: 1; margins: '0 3 0 0'; " +
	"\n\t\t\ton: #click do: [:btn :ev | Fytoportal navigator fotogalerie hledej enter: searchField value]);" +
	"\n\t\tadd: (searchField := ExtFormField new flex: 4);" +
	"\n\t\tyourself",
	null, "2012-12-10T23:00:55Z", "mp", 1);

jst.FYPlodinyPanel.addMethod("filtrPanel", "", "private", 
	"\t^ ExtFormPanel new " +
	"\n\t\tcls: 'x-panel-mc';" +
	"\n\t\tstyle: 'padding-top: 1px';" +
	"\n\t\theight: 30; " +
	"\n\t\tlayout: (ExtHBoxLayout new withStretchAlign; padding: 3); " +
	"\n\t\tborder: false;" +
	"\n\t\tadd: (ExtButton new text: 'Hledej'; flex: 1; margins: '0 3 0 0'; " +
	"\n\t\t\ton: #click do: [:btn :ev | " +
	"\n\t\t\t\tFytoportal navigator fotogalerie hledej trackHistory: [:p | " +
	"\n\t\t\t\t\tp enter: searchField value]]);" +
	"\n\t\tadd: (searchField := ExtFormField new flex: 4);" +
	"\n\t\tyourself",
	null, "2013-08-23T07:15:22Z", "mp"); //fytoportal-foto
*/

jst.FYPlodinyPanel.addMethod("changed:with:", "anAspect node", "updating", 
	"\t\"odstranim prefix u polozky v podstromu\"" +
	"\n\t(anAspect = #plodina and: [node id fourth = '-'])" +
	"\n\t\tifTrue: [super changed: anAspect with: (node copy id: (node id allButFirst: 4))]" +
	"\n\t\tifFalse: [super changed: anAspect with: node]",
	null, "2012-08-03T15:35:58Z", "mp", 1);

jst.FYPlodinyPanel.addMethod("changed:with:", "anAspect node", "updating", 
	"\t\"odstranim prefix u polozky v podstromu\"" +
	"\n\t(anAspect = #plodina and: [node id sixth = '-'])" +
	"\n\t\tifTrue: [super changed: anAspect with: (node copy id: (node id allButFirst: 6))]" +
	"\n\t\tifFalse: [super changed: anAspect with: node]",
	null, "2014-01-28T22:20:06Z", "mp"); //fytoportal-foto

//*** FYSkodlOrgPanel ***

jst.FYSkodlOrgPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\tborder: false;" +
	"\n\t\tactiveTab: 1;" +
	"\n\t\tadd: (naPlodine := FYTreePanel title: 'ŚO na plodině');" +
	"\n\t\tadd: (bezPlodiny := FYTreePanel title: 'Plevele');" +
	"\n\t\tadd: (vyhledane := FYTreePanel title: 'Vyhledané')." +
	"\n\tbezPlodiny on: #activate do: [:p | " +
	"\n\t\tp root children ifEmpty: [p root: (self zaradSkodlOrg: self nactiBezPlodiny)]]",
	null, "2012-11-08T09:13:15Z", "mp", 1);

jst.FYSkodlOrgPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\tborder: false;" +
	"\n\t\tactiveTab: 1;" +
	"\n\t\tadd: (naPlodine := FYTreePanel title: 'ŚO na plodině');" +
	"\n\t\tadd: (bezPlodiny := FYTreePanel title: 'Plevele');" +
	"\n\t\tadd: (vyhledane := FYTreePanel title: 'Vyhledané')." +
	"\n\tbezPlodiny on: #activate do: [:p | " +
	"\n\t\tp root children ifEmpty: [" +
	"\n\t\t\tself aktualizujPanel: p]]",
	null, "2013-09-18T14:45:46Z", "mp"); //fytoportal-foto

jst.FYSkodlOrgPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #plodina ifTrue: [" +
	"\n\t\tnaPlodine root id = anObject id ifFalse: [" +
	"\n\t\t\tnaPlodine root: (self zaradSkodlOrg: (self nactiPodlePlodiny: anObject id))]." +
	"\n\t\tnaPlodine show]." +
	"\n\tanAspect = #filtr ifTrue: [" +
	"\n\t\tvyhledane " +
	"\n\t\t\troot: (self zaradSkodlOrg: (Fytoportal data taxony hledejNazvy: #nazvySkodlOrg podle: anObject));" +
	"\n\t\t\tshow]",
	null, "2013-01-28T09:29:27Z", "mp", 1);

jst.FYSkodlOrgPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #plodina ifTrue: [" +
	"\n\t\tself hostitel = anObject id ifFalse: [" +
	"\n\t\t\tself nactiPanel: naPlodine podle: anObject id]." +
	"\n\t\tnaPlodine show]." +
	"\n\tanAspect = #filtr ifTrue: [" +
	"\n\t\tself nactiPanel: vyhledane podle: anObject." +
	"\n\t\tvyhledane show]",
	null, "2013-09-18T14:40:40Z", "mp"); //fytoportal-foto

jst.FYSkodlOrgPanel.addMethod("installListeners", "", "initialization", 
	"\tsuper installListeners." +
	"\n\tFytoportal navigator fotogalerie skodlOrgNaPlodine " +
	"\n\t\tcomponent: naPlodine;" +
	"\n\t\tinstallStandardTreeListeners;" +
	"\n\t\tonEnter: [:path :node | " +
	"\n\t\t\tpath activeEntry component show." +
	"\n\t\t\tself changed: #skodlOrgPlod with: node]." +
	"\n\tFytoportal navigator fotogalerie plevele " +
	"\n\t\tcomponent: bezPlodiny;" +
	"\n\t\tinstallStandardTreeListeners;" +
	"\n\t\tonEnter: [:path :node | self changed: #skodlOrg with: node]." +
	"\n\tFytoportal navigator fotogalerie hledejSO " +
	"\n\t\tcomponent: vyhledane;" +
	"\n\t\tinstallStandardTreeListeners;" +
	"\n\t\tonEnter: [:path :node | " +
	"\n\t\t\tFytoportal navigator fotogalerie hledej label: nil." +
	"\n\t\t\tself changed: #skodlOrg with: node].",
	null, "2012-10-03T08:12:30Z", "mp");

/*
jst.FYSkodlOrgPanel.addMethod("nactiBezPlodiny", "", "private", 
	"\t^ ExtTreeNode new" +
	"\n\t\tchildren: ((Fytoportal data skodlOrg podlePlodiny: 'none') collect: [:dict |" +
	"\n\t\t\tExtTreeNode new " +
	"\n\t\t\t\tid: (dict at: #id); " +
	"\n\t\t\t\tleaf: true; " +
	"\n\t\t\t\ttext: (dict at: #key) second;" +
	"\n\t\t\t\tlink: (dict at: #value ifAbsent: nil)\"=typ\"])",
	null, "2012-06-17T07:25:19Z", "mp");

jst.FYSkodlOrgPanel.addMethod("nactiPodlePlodiny:", "id", "private", 
	"\t| node ch sk |" +
	"\n\tnode := ExtTreeNode new id: id. \"id plodiny si schovam\"" +
	"\n\tnode children " +
	"\n\t\tadd: (ch := ExtTreeNode new text: 'Pouze choroby');" +
	"\n\t\tadd: (sk := ExtTreeNode new text: 'Pouze škůdci')." +
	"\n\t(Fytoportal data skodlOrg podlePlodiny: id) do: [:dict | | so typ |" +
	"\n\t\tso := ExtTreeNode new " +
	"\n\t\t\tid: (dict at: #id); " +
	"\n\t\t\tleaf: true; " +
	"\n\t\t\ttext: (dict at: #key) second." +
	"\n\t\tnode children add: so." +
	"\n\t\ttyp := dict at: #value ifAbsent: nil." +
	"\n\t\t\"polozka v podstromu nesmi mit stejne id\"" +
	"\n\t\ttyp = #choroba ifTrue: [" +
	"\n\t\t\tch children add: (so copy id: '-', so id)]." +
	"\n\t\ttyp = #skudce ifTrue: [" +
	"\n\t\t\tsk children add: (so copy id: '-', so id)]" +
	"\n\t]." +
	"\n\tch children size = 0 ifTrue: [node children remove: ch]." +
	"\n\tsk children size = 0 ifTrue: [node children remove: sk]." +
	"\n\t^ node",
	null, "2012-06-28T13:41:28Z", "mp");

jst.FYSkodlOrgPanel.addMethod("nactiBezPlodiny", "", "private", 
	"\t^ self nactiPodlePlodiny: 'none'",
	null, "2012-07-09T15:21:15Z", "mp");
*/

jst.FYSkodlOrgPanel.addMethod("nactiPodlePlodiny:", "id", "private", 
	"\t| node |" +
	"\n\tnode := ExtTreeNode new id: id. \"id plodiny si schovam\"" +
	"\n\t(Fytoportal data skodlOrg podlePlodiny: id) do: [:dict |" +
	"\n\t\tnode children add: (ExtTreeNode new " +
	"\n\t\t\tid: (dict at: #id); " +
	"\n\t\t\tleaf: true; " +
	"\n\t\t\ttext: (dict at: #key) second;" +
	"\n\t\t\tlink: (dict at: #value ifAbsent: ''))]." +
	"\n\t^ node",
	null, "2012-07-09T15:00:22Z", "mp", 1);

jst.FYSkodlOrgPanel.addMethod("nactiPodlePlodiny:", "id", "private", 
	"\t| node |" +
	"\n\tnode := ExtTreeNode new." +
	"\n\t(Fytoportal data skodlOrg podlePlodiny: id) do: [:dict |" +
	"\n\t\tnode children add: (ExtTreeNode new " +
	"\n\t\t\tid: (dict at: #id); " +
	"\n\t\t\tleaf: true; " +
	"\n\t\t\ttext: (dict at: #key) second;" +
	"\n\t\t\tlink: (dict at: #value ifAbsent: ''))]." +
	"\n\t^ node",
	null, "2013-09-18T15:23:09Z", "mp", 1);

jst.FYSkodlOrgPanel.addMethod("nactiPodlePlodiny:", "id", "private", 
	"\t^ ExtTreeNode new" +
	"\n\t\tchildren: (Fytoportal data skodlOrg podlePlodiny: id)",
	null, "2014-01-30T13:41:05Z", "mp"); //fytoportal-foto

jst.FYSkodlOrgPanel.addMethod("changed:with:", "anAspect node", "updating", 
	"\t\"odstranim uvodni pomlcku u polozky v podstromu\"" +
	"\n\tnode id first = '-' " +
	"\n\t\tifTrue: [super changed: anAspect with: (node copy id: node id allButFirst)]" +
	"\n\t\tifFalse: [super changed: anAspect with: node]",
	null, "2012-06-28T10:01:09Z", "mp", 1);

jst.FYSkodlOrgPanel.addMethod("changed:with:", "anAspect node", "updating", 
	"\t\"odstranim prefix u polozky v podstromu\"" +
	"\n\tnode id third = '-' " +
	"\n\t\tifTrue: [super changed: anAspect with: (node copy id: (node id allButFirst: 3))]" +
	"\n\t\tifFalse: [super changed: anAspect with: node]",
	null, "2012-07-09T15:12:55Z", "mp"); //jst-fytoportal

jst.FYSkodlOrgPanel.addMethod("zaradSkodlOrg:", "node", "private", 
	"\t| dict |" +
	"\n\tdict := Dictionary new." +
	"\n\tnode children do: [:n |" +
	"\n\t\t(dict at: n link ifAbsentPut: [ExtTreeNode new text: n link])" +
	"\n\t\t\tchildren add: (n copy id: (n link first: 2), '-', n id)]." +
	"\n\tdict keys asSortedCollection reverseDo: [:key | | skup |" +
	"\n\t\tskup := dict at: key." +
	"\n\t\tskup text: key, ' (', skup children size asString, ')'." +
	"\n\t\tnode children addFirst: skup]." +
	"\n\t^ node",
	null, "2012-08-01T08:51:31Z", "mp", 1);

jst.FYSkodlOrgPanel.addMethod("zaradSkodlOrg:", "node", "private", 
	"\t| dict |" +
	"\n\tdict := Dictionary new." +
	"\n\tnode children do: [:n | n link ifNotNil: [" +
	"\n\t\t(dict at: n link ifAbsentPut: [ExtTreeNode new text: n link])" +
	"\n\t\t\tchildren add: (n copy id: (n link first: 2), '-', n id)]]." +
	"\n\tdict keys asSortedCollection reverseDo: [:key | | skup |" +
	"\n\t\tskup := dict at: key." +
	"\n\t\tskup text: key, ' (', skup children size asString, ')'." +
	"\n\t\tnode children addFirst: skup]." +
	"\n\t^ node",
	null, "2013-09-18T09:37:32Z", "mp"); //fytoportal-foto

jst.FYSkodlOrgPanel.addMethod("aktivuj:", "tab", "actions", 
	"\tself activeTab: (self instVarNamed: tab) id",
	null, "2012-06-13T08:14:50Z", "mp");

/* ani DelayedTask nechce fungovat :(
jst.FYSkodlOrgPanel.addMethod("showEvent", "", "events", 
	"\t^ [:p | DelayedTask new delay: 900; task: [p doLayout]; run]",
	null, "2012-06-15T06:26:32Z", "mp");
*/

jst.FYSkodlOrgPanel.addMethod("hostitel", "", "accessing", 
	"\t^ naPlodine root link",
	null, "2013-09-18T14:39:16Z", "mp");

jst.FYSkodlOrgPanel.addMethod("nactiPanel:podle:", "p anObject", "private", 
	"\t| link |" +
	"\n\tlink := p == bezPlodiny ifTrue: #none ifFalse: anObject." +
	"\n\tp root: (self zaradSkodlOrg: (p == vyhledane " +
	"\n\t\tifTrue: [Fytoportal data taxony hledejNazvy: #nazvySkodlOrg podle: anObject] " +
	"\n\t\tifFalse: [self nactiPodlePlodiny: link]))." +
	"\n\tp root link: link",
	null, "2013-09-18T14:38:46Z", "mp");

jst.FYSkodlOrgPanel.addMethod("aktualizujPanel:", "p", "private", 
	"\tself nactiPanel: p podle: p root link",
	null, "2013-09-18T14:43:38Z", "mp");

//*** FYFotogalerie ***
/*
jst.FYFotogalerie.addMethod("initialize", "", "initialization", 
	"\tplodinyPanel := FYPlodinyPanel new." +
	"\n\tskodlOrgPanel := FYSkodlOrgPanel new." +
	"\n\tmainPanel := ExtContainer new withBorderLayout;" +
	"\n\t\tadd: (popisPanel := FYTaxonPopis new region: (ExtRegion center minWidth: 300));" +
	"\n\t\tadd: (ExtContainer new region: (ExtSplitRegion east); width: 670; withBorderLayout;" +
	"\n\t\t\t\"add: (fotoPanel := ExtPanel new region: #north; height: 450);\"" +
	"\n\t\t\tadd: (ExtPanel new border: true; region: #center; withFitLayout; cls: 'nahledy'; autoScroll: true;" +
	"\n\t\t\t\ttitle: 'Obrázky (vyberte plodinu/ŠO)';" +
	"\n\t\t\t\tadd: (nahledyPanel := FYFotoNahledy new);" +
	"\n\t\t\t\tyourself);" +
	"\n\t\t\tyourself);" +
	"\n\t\ton: #afterrender do: [:p | p doLayout];" +
	"\n\t\tyourself." +
	"\n\t\"dependencies\"" +
	"\n\tplodinyPanel" +
	"\n\t\taddDependent: skodlOrgPanel;" +
	"\n\t\taddDependent: popisPanel;" +
	"\n\t\taddDependent: nahledyPanel." +
	"\n\tskodlOrgPanel" +
	"\n\t\taddDependent: popisPanel;" +
	"\n\t\taddDependent: nahledyPanel.",
	null, "2012-06-29T06:21:44Z", "mp");

jst.FYFotogalerie.addMethod("initialize", "", "initialization", 
	"\tplodinyPanel := FYPlodinyPanel new." +
	"\n\tskodlOrgPanel := FYSkodlOrgPanel new." +
	"\n\tmainPanel := ExtContainer new withBorderLayout;" +
	"\n\t\tadd: (popisPanel := FYTaxonPopis new region: (ExtRegion center minWidth: 300));" +
	"\n\t\tadd: (nahledyPanel := FYFotoViewer pouzeNahledy region: (ExtSplitRegion east minWidth: 400); width: 670);" +
	"\n\t\ton: #afterrender do: [:p | p doLayout];" +
	"\n\t\tyourself." +
	"\n\t\"dependencies\"" +
	"\n\tplodinyPanel" +
	"\n\t\taddDependent: skodlOrgPanel;" +
	"\n\t\taddDependent: popisPanel;" +
	"\n\t\taddDependent: nahledyPanel." +
	"\n\tskodlOrgPanel" +
	"\n\t\taddDependent: popisPanel;" +
	"\n\t\taddDependent: nahledyPanel.",
	null, "2012-06-29T21:03:00Z", "mp");
*/

jst.FYFotogalerie.addMethod("initialize", "", "initialization", 
	"\tplodinyPanel := FYPlodinyPanel new." +
	"\n\tskodlOrgPanel := FYSkodlOrgPanel new." +
	"\n\tmainPanel := ExtContainer new withBorderLayout;" +
	"\n\t\tadd: (self popisPanel region: (ExtRegion center minWidth: 300));" +
	"\n\t\tadd: (nahledyPanel := FYFotoViewer new region: (ExtSplitRegion east minWidth: 400); width: 670);" +
	"\n\t\ton: #afterrender do: [:p | p doLayout];" +
	"\n\t\tyourself." +
	"\n\t\"dependencies\"" +
	"\n\tplodinyPanel" +
	"\n\t\taddDependent: skodlOrgPanel;" +
	"\n\t\taddDependent: popisPanel popis;" +
	"\n\t\taddDependent: nahledyPanel." +
	"\n\tskodlOrgPanel" +
	"\n\t\taddDependent: popisPanel popis;" +
	"\n\t\taddDependent: nahledyPanel.",
	null, "2012-12-26T20:01:53Z", "mp", 1);

jst.FYFotogalerie.addMethod("initialize", "", "initialization", 
	"\t| fotoPanel |" +
	"\n\tplodinyPanel := FYPlodinyPanel new." +
	"\n\tskodlOrgPanel := FYSkodlOrgPanel new." +
	"\n\tmainPanel := ExtContainer new withBorderLayout;" +
	"\n\t\tadd: (self popisPanel region: (ExtRegion center minWidth: 300));" +
	"\n\t\tadd: (fotoPanel := FYFotoViewer new region: (ExtSplitRegion east minWidth: 400); width: 670);" +
	"\n\t\ton: #afterrender do: [:p | p doLayout];" +
	"\n\t\tyourself." +
	"\n\t\"dependencies\"" +
	"\n\tplodinyPanel" +
	"\n\t\taddDependent: skodlOrgPanel;" +
	"\n\t\taddDependent: popisPanel popis;" +
	"\n\t\taddDependent: fotoPanel." +
	"\n\tskodlOrgPanel" +
	"\n\t\taddDependent: popisPanel popis;" +
	"\n\t\taddDependent: fotoPanel." +
	"\n\t\"kvuli editoru fotek\"" +
	"\n\tfotoPanel" +
	"\n\t\taddDependent: popisPanel",
	null, "2013-06-21T13:47:29Z", "mp", 1);

jst.FYFotogalerie.addMethod("initialize", "", "initialization", 
	"\t| fotoPanel |" +
	"\n\tplodinyPanel := FYPlodinyPanel new." +
	"\n\tskodlOrgPanel := FYSkodlOrgPanel new." +
	"\n\tmainPanel := ExtContainer new withBorderLayout;" +
	"\n\t\tadd: (self popisPanel region: (ExtRegion center minWidth: 300));" +
	"\n\t\tadd: (fotoPanel := FYFotoViewer new region: (ExtSplitRegion east minWidth: 220));" +
	"\n\t\ton: #afterrender do: [:p | p doLayout];" +
	"\n\t\tyourself." +
	"\n\tfotoPanel pouzeNahledy " +
	"\n\t\tifTrue: [fotoPanel width: 250] " +
	"\n\t\tifFalse: [fotoPanel width: 670]." +
	"\n\t\"dependencies\"" +
	"\n\tplodinyPanel" +
	"\n\t\taddDependent: skodlOrgPanel;" +
	"\n\t\taddDependent: popisPanel popis;" +
	"\n\t\taddDependent: fotoPanel." +
	"\n\tskodlOrgPanel" +
	"\n\t\taddDependent: popisPanel popis;" +
	"\n\t\taddDependent: fotoPanel." +
	"\n\t\"kvuli editoru fotek\"" +
	"\n\tfotoPanel" +
	"\n\t\taddDependent: popisPanel",
	null, "2014-01-22T19:49:46Z", "mp", 1);

jst.FYFotogalerie.addMethod("initialize", "", "initialization", 
	"\t| fotoPanel |" +
	"\n\tplodinyPanel := FYPlodinyPanel new." +
	"\n\tskodlOrgPanel := FYSkodlOrgPanel new." +
	"\n\tmainPanel := ExtContainer new withBorderLayout;" +
	"\n\t\tadd: (self popisPanel region: (ExtRegion center minWidth: 300));" +
	"\n\t\tadd: (fotoPanel := FYFotoViewer new region: (ExtSplitRegion east minWidth: 220));" +
	"\n\t\ton: #afterrender do: [:p | p doLayout];" +
	"\n\t\tyourself." +
	"\n\tfotoPanel pouzeNahledy " +
	"\n\t\tifTrue: [fotoPanel width: 250] " +
	"\n\t\tifFalse: [fotoPanel width: 670]." +
	"\n\t\"dependencies\"" +
	"\n\tplodinyPanel" +
	"\n\t\taddDependent: skodlOrgPanel;" +
	"\n\t\taddDependent: popisPanel popis;" +
	"\n\t\taddDependent: fotoPanel." +
	"\n\tskodlOrgPanel" +
	"\n\t\taddDependent: popisPanel popis;" +
	"\n\t\taddDependent: fotoPanel." +
	"\n\t\"kvuli editoru fotek\"" +
	"\n\tfotoPanel nahledy" +
	"\n\t\taddDependent: popisPanel",
	null, "2014-03-03T15:32:18Z", "mp"); //fytoportal-foto

jst.FYFotogalerie.addMethod("skodlOrgPanel", "", "accessing", 
	"\t^ skodlOrgPanel",
	null, "2012-06-13T08:12:51Z", "mp");

jst.FYFotogalerie.addMethod("plodinyPanel", "", "accessing", 
	"\t^ plodinyPanel",
	null, "2012-06-13T08:03:18Z", "mp");

jst.FYFotogalerie.addMethod("popisPanel", "", "accessing", 
	"\t^ popisPanel ifNil: [" +
	"\n\t\tpopisPanel := (Smalltalk at: #FYTaxonPopisTabPanel ifAbsent: FYTaxonPopisPanel) new]",
	null, "2012-12-26T14:03:09Z", "mp");

jst.FYFotogalerie.addMethod("mainPanel", "", "accessing", 
	"\t^ mainPanel",
	null, "2012-06-19T21:58:54Z", "mp");

// *** FYTaxonPopisPanel ***

/*
jst.FYTaxonPopisPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\twithFitLayout; " +
	"\n\t\tpadding: 5; " +
	"\n\t\tadd: (info := ExtDataView new" +
	"\n\t\t\tautoScroll: true;" +
	"\n\t\t\tcls: 'foto-taxon-popis';" +
	"\n\t\t\tstore: self createStore;" +
	"\n\t\t\ttpl: self createTemplate;" +
	"\n\t\t\titemSelector: 'div.popis')",
	null, "2012-12-26T11:36:17Z", "mp");

jst.FYTaxonPopisPanel.addMethod("createStore", "", "private", 
	"\t^ ExtJsonStore new fields: {" +
	"\n\t\tExtField new name: 'cesky'; mapping: 'value'; convert: [:v | v cesky]." +
	"\n\t\tExtField new name: 'latinsky'; mapping: 'value'; convert: [:v | v latinsky]." +
	"\n\t\tExtField new name: 'synonyma'; mapping: 'value'; convert: [:v | v synonyma asTextualList: #yourself separator: ', ']." +
	"\n\t\tExtField new name: 'dalsiNazvy'; mapping: 'value'; convert: [:v | v dalsiNazvy asTextualList: #yourself separator: ', ']." +
	"\n\t\tExtField new name: 'kody'; mapping: 'value'; convert: [:v | v kody asTextualList: #yourself separator: ', ']." +
	"\n\t\tExtField new name: 'popis'; mapping: 'value'; convert: [:v | v popis]." +
	"\n\t\tExtField new name: 'rise'; mapping: 'value'; convert: [:v | v rise]." +
	"\n\t\tExtField new name: 'trida'; mapping: 'value'; convert: [:v | v trida]." +
	"\n\t\tExtField new name: 'rad'; mapping: 'value'; convert: [:v | v rad]." +
	"\n\t\tExtField new name: 'celed'; mapping: 'value'; convert: [:v | v celed]." +
	"\n\t}",
	null, "2012-12-26T11:36:41Z", "mp");

jst.FYTaxonPopisPanel.addMethod("createTemplate", "", "private", 
	"\t^ ExtXTemplate new " +
	"\n\t\tcompiled: true; " +
	"\n\t\thtmlContents: [:html | html tpl: [" +
	"\n\t\t\thtml div class: 'taxon-nazev'; with: [" +
	"\n\t\t\t\thtml tpl if: 'cesky.length > 0'; with: [" +
	"\n\t\t\t\t\thtml span class: 'cesky'; with: '{cesky}'." +
	"\n\t\t\t\t\thtml br]." +
	"\n\t\t\t\thtml tpl if: 'latinsky.length > 0'; with: [" +
	"\n\t\t\t\t\thtml span class: 'latinsky'; with: '{latinsky}'." +
	"\n\t\t\t\t\thtml br]]." +
	"\n\t\t\thtml tpl if: 'rise.length > 0 || trida.length > 0 || rad.length > 0 || celed.length > 0'; with: [html p: [" +
	"\n\t\t\t\thtml tpl if: 'rise.length > 0'; with: [html bold: 'říše '; text: '{rise}   ']." +
	"\n\t\t\t\thtml tpl if: 'rad.length > 0'; with: [html bold: 'řád '; text: '{rad}   ']." +
	"\n\t\t\t\thtml tpl if: 'trida.length > 0'; with: [html bold: 'třída '; text: '{trida}   ']." +
	"\n\t\t\t\thtml tpl if: 'celed.length > 0'; with: [html bold: 'čeleď '; text: '{celed}   ']." +
	"\n\t\t\t]]." +
	"\n\t\t\thtml p: [" +
	"\n\t\t\t\thtml strong: 'Vědecká synonyma: '." +
	"\n\t\t\t\thtml span class: 'latinsky'; with: '{synonyma}'." +
	"\n\t\t\t]." +
	"\n\t\t\thtml p: [\t" +
	"\n\t\t\t\thtml strong: 'Další názvy: '; text: '{dalsiNazvy}']." +
	"\n\t\t\thtml p: [" +
	"\n\t\t\t\thtml strong: 'EPPO kódy: '; text: '{kody}']." +
	"\n\t\t\thtml text: '{popis}'" +
	"\n\t\t]]",
	null, "2012-12-26T11:37:08Z", "mp");
*/

jst.FYTaxonPopisPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\twithFitLayout; " +
	"\n\t\tpadding: 5; " +
	"\n\t\tautoScroll: true",
	null, "2013-04-16T21:15:02Z", "mp");

/* pro nacitani objektu podle id neni potreba vyrabet view 
jst.FYTaxonPopisPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\t| data |" +
	"\n\tanAspect = #plodina ifTrue: [data := Fytoportal data plodiny]." +
	"\n\t(anAspect startsWith: #skodlOrg) ifTrue: [data := Fytoportal data skodlOrg]." +
	"\n\tdata ifNotNil: [" +
	"\n\t\tdata := data podleId lookupKey: anObject id." +
	"\n\t\tinfo store loadData: (data collect: [:d | d asJsObject])." +
	"\n\t\tself changed: #taxon with: (data first at: #value)]",
	null, "2012-12-26T13:57:07Z", "mp");
*/

jst.FYTaxonPopisPanel.addMethod("popis", "", "accessing", 
	"\t^ self",
	null, "2012-12-26T19:58:03Z", "mp");

/*
jst.FYTaxonPopisPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\t(anAspect = #plodina or: [anAspect startsWith: #skodlOrg]) ifTrue: [" +
	"\n\t\t| data |" +
	"\n\t\tdata := Fytoportal db loadObject: anObject id." +
	"\n\t\tinfo store loadData: data asStoreData." +
	"\n\t\tself changed: #taxon with: data]",
	null, "2013-04-07T20:43:01Z", "mp");
*/
jst.FYTaxonPopisPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\t(anAspect = #plodina or: [anAspect startsWith: #skodlOrg]) ifTrue: [" +
	"\n\t\ttaxon := Fytoportal db loadObject: anObject id." +
	"\n\t\tself refreshContent." +
	"\n\t\tself changed: #taxon with: taxon]",
	null, "2013-04-16T14:11:43Z", "mp");

jst.FYTaxonPopisPanel.addMethod("renderContentOn:", "html", "rendering", 
	"\thtml div class: 'foto-taxon-popis'; with: [" +
	"\n\t\ttaxon renderOn: html." +
	"\n\t\thtml div: [ | p |" +
	"\n\t\t\tp := taxon popis." +
	"\n\t\t\tp isString " +
	"\n\t\t\t\tifTrue: [html html: p]" +
	"\n\t\t\t\tifFalse: [p renderOn: html]]]",
	null, "2013-04-16T15:28:43Z", "mp", 1);

jst.FYTaxonPopisPanel.addMethod("renderContentOn:", "html", "rendering", 
	"\thtml div class: 'foto-taxon-popis'; with: [" +
	"\n\t\tFYTiskTaxonu new " +
	"\n\t\t\ttaxon: taxon;" +
	"\n\t\t\trenderOn: html." +
	"\n\t\thtml div: [ | p |" +
	"\n\t\t\tp := taxon popis." +
	"\n\t\t\tp isString " +
	"\n\t\t\t\tifTrue: [html html: p]" +
	"\n\t\t\t\tifFalse: [p renderOn: html]]]",
	null, "2014-03-10T22:38:36Z", "mp"); //fytoportal-foto

// *** FYFotoNahledy ***

jst.FYFotoNahledy.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\tcls: 'nahledy';" +
	"\n\t\tstore: self createStore;" +
	"\n\t\tautoWidth: true;" +
	"\n\t\tautoScroll: true;" +
	"\n\t\tsingleSelect: true;" +
	"\n\t\toverClass: 'x-view-over';" +
	"\n\t\titemSelector: 'div.thumb-wrap';" +
	"\n\t\temptyText: 'Žádné obrázky k zobrazení...';" +
	"\n\t\ttpl: self tplNahledy;" +
	"\n\t\ton: #selectionchange do: [:view :nodes | | rec |" +
	"\n\t\t\trec := #()." +
	"\n\t\t\tnodes isEmpty ifFalse: [ | index |" +
	"\n\t\t\t\tindex := (nodes first asJsObject at: #viewIndex) + 1." +
	"\n\t\t\t\trec := self store recordsFrom: index to: index]." +
	"\n\t\t\tself changed: #foto with: (rec isEmpty ifFalse: [rec first])]",
	null, "2014-02-25T07:32:04Z", "mp", 1);

jst.FYFotoNahledy.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\tcls: 'nahledy';" +
	"\n\t\tstore: self createStore;" +
	"\n\t\tautoWidth: true;" +
	"\n\t\tautoScroll: true;" +
	"\n\t\tsingleSelect: true;" +
	"\n\t\toverClass: 'x-view-over';" +
	"\n\t\titemSelector: 'div.thumb-wrap';" +
	"\n\t\temptyText: 'Žádné obrázky k zobrazení...';" +
	"\n\t\ttpl: self tplNahledy;" +
	"\n\t\ton: #selectionchange do: [:view :nodes | | rec |" +
	"\n\t\t\trec := #()." +
	"\n\t\t\tnodes isEmpty ifFalse: [ | index |" +
	"\n\t\t\t\tindex := (nodes first asJsObject at: #viewIndex) + 1." +
	"\n\t\t\t\trec := self store recordsFrom: index to: index]." +
	"\n\t\t\tself changed: #foto with: (rec isEmpty ifFalse: [rec first])]." +
	"\n\tnaPlodine := false",
	null, "2014-05-01T15:00:20Z", "mp"); //fytoportal-foto

jst.FYFotoNahledy.addMethod("createStore", "", "initialization", 
	"\t^ ExtJsonStore new " +
	"\n\t\tfields: {" +
	"\n\t\t\tExtField new name: 'preview'; mapping: 'value'; convert: [:v | v preview]." +
	"\n\t\t\tExtField new name: 'fotka'; mapping: 'value'; convert: [:v | v yourself]." +
	"\n\t\t\tExtField new name: 'format'; mapping: 'value'; convert: [:v | v format]." +
	"\n\t\t\tExtField new name: 'autor'; mapping: 'value'; convert: [:v | v autor]." +
	"\n\t\t\tExtField new name: 'kratkyPopis'; mapping: 'value'; convert: [:v | v kratkyPopis]." +
	"\n\t\t\tExtField new name: 'popis'; mapping: 'value'; convert: [:v | v popis]}",
	null, "2014-02-25T14:34:29Z", "mp", 1);

jst.FYFotoNahledy.addMethod("createStore", "", "initialization", 
	"\t^ ExtJsonStore new " +
	"\n\t\tfields: {" +
	"\n\t\t\tExtField new name: 'preview'; mapping: 'value'; convert: [:v | v preview]." +
	"\n\t\t\tExtField new name: 'fotka'; mapping: 'value'; convert: [:v | v yourself]." +
	"\n\t\t\tExtField new name: 'format'; mapping: 'value'; convert: [:v | v format]." +
	"\n\t\t\tExtField new name: 'autor'; mapping: 'value'; convert: [:v | v autor]." +
	"\n\t\t\tExtField new name: 'kratkyPopis'; mapping: 'value'; convert: [:v | v kratkyPopis]." +
	"\n\t\t\tExtField new name: 'popis'; mapping: 'value'; convert: [:v | v popis]." +
	"\n\t\t\t\"potrebuje FotoWindow\"" +
	"\n\t\t\tExtField new name: 'skodlOrg'; mapping: 'value'; convert: [:v | v skodlOrg]." +
	"\n\t\t\tExtField new name: 'plodina'; mapping: 'value'; convert: [:v | v plodina]}",
	null, "2014-03-12T10:53:50Z", "mp"); //fytoportal-foto

jst.FYFotoNahledy.addMethod("plodina:", "anObject", "accessing", 
	"\tplodina := anObject",
	null, "2014-02-25T14:10:47Z", "mp", 1);

jst.FYFotoNahledy.addMethod("plodina:", "anObject", "accessing", 
	"\tplodina := anObject asCollection",
	null, "2014-03-09T17:43:12Z", "mp", 2);

jst.FYFotoNahledy.addMethod("plodina:", "anObject", "accessing", 
	"\tplodina := anObject asCollection." +
	"\n\tplodiny := nil",
	null, "2014-03-12T11:08:21Z", "mp"); //fytoportal-foto

jst.FYFotoNahledy.addMethod("tplNahledy", "", "initialization", 
	"\t^ ExtXTemplate new compiled: true; htmlContents: [:html |" +
	"\n\t\t(html tag: 'tpl') attributeAt: 'for' put: '.'; with: [" +
	"\n\t\t\thtml div class: 'thumb-wrap'; with: [" +
	"\n\t\t\t\thtml div class: 'thumb'; with: [" +
	"\n\t\t\t\t\thtml img height: '150'; width: '{format * 150}'; src: '{preview}'; title: '{popis}']." +
	"\n\t\t\t\thtml span: '{kratkyPopis}'; span: 'Autor: {autor}'" +
	"\n\t\t\t]" +
	"\n\t\t]" +
	"\n\t]",
	null, "2014-02-23T21:49:12Z", "mp");

jst.FYFotoNahledy.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #plodina ifTrue: [" +
	"\n\t\tplodina := anObject." +
	"\n\t\tplodiny := nil." +
	"\n\t\tskodlOrg := nil." +
	"\n\t\t[self nactiFotky] delayed: 10]." +
	"\n\t(anAspect startsWith: #skodlOrg) ifTrue: [" +
	"\n\t\t\"plodina je nastavena v predchozim volani\"" +
	"\n\t\tnaPlodine := anAspect = #skodlOrgPlod." +
	"\n\t\tskodlOrg := anObject." +
	"\n\t\t[self nactiFotky] delayed: 10]",
	null, "2014-02-23T21:49:45Z", "mp", 1);

jst.FYFotoNahledy.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #plodina ifTrue: [" +
	"\n\t\tplodina := anObject." +
	"\n\t\tplodiny := nil." +
	"\n\t\tskodlOrg := nil." +
	"\n\t\t[self nactiFotkyVyber: vyber] delayed: 10]." +
	"\n\t(anAspect startsWith: #skodlOrg) ifTrue: [" +
	"\n\t\t\"plodina je nastavena v predchozim volani\"" +
	"\n\t\t(naPlodine := anAspect = #skodlOrgPlod) ifFalse: [" +
	"\n\t\t\tplodina := nil]." +
	"\n\t\tskodlOrg := anObject." +
	"\n\t\t[self nactiFotkyVyber: vyber] delayed: 10]",
	null, "2014-02-26T15:35:10Z", "mp", 2);

jst.FYFotoNahledy.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #plodina ifTrue: [" +
	"\n\t\tplodina := anObject asCollection." +
	"\n\t\tplodiny := nil." +
	"\n\t\tskodlOrg := nil." +
	"\n\t\t[self nactiFotkyVyber: vyber] delayed: 10]." +
	"\n\t(anAspect startsWith: #skodlOrg) ifTrue: [" +
	"\n\t\t\"plodina je nastavena v predchozim volani\"" +
	"\n\t\t(naPlodine := anAspect = #skodlOrgPlod) ifFalse: [" +
	"\n\t\t\tplodina := nil]." +
	"\n\t\tskodlOrg := anObject asCollection." +
	"\n\t\t[self nactiFotkyVyber: vyber] delayed: 10]",
	null, "2014-03-09T17:16:47Z", "mp", 3);

jst.FYFotoNahledy.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #plodina ifTrue: [" +
	"\n\t\tplodina := anObject asCollection." +
	"\n\t\tplodiny := nil." +
	"\n\t\tskodlOrg := nil." +
	"\n\t\t[self nactiFotkyVyber: vyber] delayed: 10]." +
	"\n\t(anAspect startsWith: #skodlOrg) ifTrue: [" +
	"\n\t\t\"plodina je nastavena v predchozim volani, muze byt taky nastavena zvenku pomoci #plodina:\"" +
	"\n\t\tnaPlodine := anAspect = #skodlOrgPlod." +
	"\n\t\tskodlOrg := anObject asCollection." +
	"\n\t\t[self nactiFotkyVyber: vyber] delayed: 10]",
	null, "2014-03-12T11:10:14Z", "mp"); //fytoportal-foto

jst.FYFotoNahledy.addMethod("nactiFotkyVyber:", "fotoId", "updating", 
	"\t| data sortBlock |" +
	"\n\tplodina notNil & plodiny isNil ifTrue: [" +
	"\n\t\t\"doplnim podrizene plodiny, pokud existuji\"" +
	"\n\t\tplodiny := OrderedCollection with: plodina id." +
	"\n\t\t(Fytoportal data plodiny podrizenePlodiny lookupKey: plodiny first) do: [:row | " +
	"\n\t\t\tplodiny add: row id]]." +
	"\n\tskodlOrg ifNotNil: [" +
	"\n\t\t\"plodina je v tomto pripade pouze id\"" +
	"\n\t\tdata := Fytoportal data fotky fotkySkodlOrg" +
	"\n\t\t\tstartKey: {skodlOrg id. nil asJsObject}; \"nil musim prevest na null\"" +
	"\n\t\t\tendKey: {skodlOrg id. 'x'};" +
	"\n\t\t\tqueryData." +
	"\n\t\tnaPlodine ifTrue: [" +
	"\n\t\t\t\"pouze fotky na vybrane plodine a mimo plodinu\"" +
	"\n\t\t\tdata := data select: [:ea | ea key second isNil or: [plodiny includes: ea key second]]." +
	"\n\t\t\tsortBlock := [:a :b | (plodiny includes: a key second) & a value isDefault" +
	"\n\t\t\t\tor: [(plodiny includes: a key second) and: [b key second isNil or: [(a value popis ifNil: 'zz') <= (b value popis ifNil: 'zzz')]]]" +
	"\n\t\t\t\tor: [a value isDefault & b key second isNil] " +
	"\n\t\t\t\tor: [b value isDefault not & b key second isNil and: [(a value popis ifNil: 'zz') <= (b value popis ifNil: 'zzz')]]]" +
	"\n\t\t]" +
	"\n\t] ifNil: [" +
	"\n\t\tdata := Fytoportal data fotky fotkyPlodiny lookupKeys: plodiny" +
	"\n\t]." +
	"\n\t\"vychozi fotka bude prvni, jinak podle popisu\"" +
	"\n\tsortBlock ifNil: [" +
	"\n\t\tsortBlock := [:a :b | a value isDefault or: [b value isDefault not and: [" +
	"\n\t\t\t(a value popis ifNil: 'zz') <= (b value popis ifNil: 'zzz')]]]" +
	"\n\t]." +
	"\n\tdata := data asSortedCollection: sortBlock." +
	"\n\tself store loadData: (data collect: [:d | d asJsObject])." +
	"\n\t\"asCollection zkonvertuje vybrany record na pole, pripadny nil pak na prazdne pole\"" +
	"\n\tself selectNodes: " +
	"\n\t\t((self store recordById: fotoId) ifNil: [self store recordsFrom: 1 to: 1]) asCollection" +
	"\n\t\tsilently: false",
	null, "2014-02-23T21:53:12Z", "mp", 1);

jst.FYFotoNahledy.addMethod("nactiFotkyVyber:", "fotoId", "updating", 
	"\t| data sortBlock |" +
	"\n\tplodina notNil & plodiny isNil ifTrue: [" +
	"\n\t\t\"doplnim podrizene plodiny, pokud existuji\"" +
	"\n\t\tplodiny := OrderedCollection withAll: plodina." +
	"\n\t\t(Fytoportal data plodiny podrizenePlodiny lookupKeys: (plodiny collect: [:pl | pl id])) do: [:row | " +
	"\n\t\t\tplodiny add: (FYPlodina new " +
	"\n\t\t\t\tid: row id; " +
	"\n\t\t\t\tparent: row key;" +
	"\n\t\t\t\tcesky: row value)]]." +
	"\n\tskodlOrg ifNotNil: [" +
	"\n\t\t\"vsechny fotky pro vybrane skodlOrg\"" +
	"\n\t\tdata := Fytoportal data fotky fotkySkodlOrg lookupKeys: (skodlOrg collect: [:sk | sk id])." +
	"\n\t\tnaPlodine ifTrue: [" +
	"\n\t\t\t\"pouze fotky na vybrane plodine a mimo plodinu\"" +
	"\n\t\t\tdata := data select: [:ea | " +
	"\n\t\t\t\tea value plodina isNil or: [plodiny anySatisfy: [:pl | pl id = ea value plodina]]]." +
	"\n\t\t\tsortBlock := [:a :b | (plodiny anySatisfy: [:pl | pl id = a value plodina]) & a value isDefault" +
	"\n\t\t\t\tor: [(plodiny anySatisfy: [:pl | pl id = a value plodina]) " +
	"\n\t\t\t\t\tand: [b value plodina isNil or: [(a value popis ifNil: 'zz') <= (b value popis ifNil: 'zzz')]]]" +
	"\n\t\t\t\tor: [a value isDefault & b value plodina isNil] " +
	"\n\t\t\t\tor: [b value isDefault not & b value plodina isNil " +
	"\n\t\t\t\t\tand: [(a value popis ifNil: 'zz') <= (b value popis ifNil: 'zzz')]]" +
	"\n\t\t\t]" +
	"\n\t\t]" +
	"\n\t] ifNil: [" +
	"\n\t\tdata := Fytoportal data fotky fotkyPlodiny lookupKeys: (plodiny collect: [:pl | pl id])" +
	"\n\t]." +
	"\n\t\"vychozi fotka bude prvni, jinak podle popisu\"" +
	"\n\tsortBlock ifNil: [" +
	"\n\t\tsortBlock := [:a :b | a value isDefault or: [b value isDefault not and: [" +
	"\n\t\t\t(a value popis ifNil: 'zz') <= (b value popis ifNil: 'zzz')]]]" +
	"\n\t]." +
	"\n\tdata := data asSortedCollection: sortBlock." +
	"\n\tself store loadData: (data collect: [:d | d asJsObject])." +
	"\n\t\"asCollection zkonvertuje vybrany record na pole, pripadny nil pak na prazdne pole\"" +
	"\n\tself selectNodes: " +
	"\n\t\t((self store recordById: fotoId) ifNil: [self store recordsFrom: 1 to: 1]) asCollection" +
	"\n\t\tsilently: false",
	null, "2014-03-09T17:37:18Z", "mp", 2);

jst.FYFotoNahledy.addMethod("nactiFotkyVyber:", "fotoId", "updating", 
	"\t| data sortBlock |" +
	"\n\tplodina notNil & plodiny isNil ifTrue: [" +
	"\n\t\t\"doplnim podrizene plodiny, pokud existuji\"" +
	"\n\t\tplodiny := OrderedCollection withAll: plodina." +
	"\n\t\t(Fytoportal data plodiny podrizenePlodiny lookupKeys: (plodiny collect: [:pl | pl id])) do: [:row | " +
	"\n\t\t\tplodiny add: (FYPlodina new " +
	"\n\t\t\t\tid: row id; " +
	"\n\t\t\t\tparent: row key;" +
	"\n\t\t\t\tcesky: row value)]]." +
	"\n\tskodlOrg ifNotNil: [" +
	"\n\t\t\"vsechny fotky pro vybrane skodlOrg\"" +
	"\n\t\tdata := Fytoportal data fotky fotkySkodlOrg lookupKeys: (skodlOrg collect: [:sk | sk id])." +
	"\n\t\tnaPlodine ifTrue: [" +
	"\n\t\t\t\"pouze fotky na vybrane plodine a mimo plodinu\"" +
	"\n\t\t\tdata := data select: [:ea | " +
	"\n\t\t\t\tea value plodina isNil or: [plodiny anySatisfy: [:pl | pl id = ea value plodina]]]." +
	"\n\t\t\tsortBlock := [:a :b | (plodiny anySatisfy: [:pl | pl id = a value plodina]) & a value isDefault" +
	"\n\t\t\t\tor: [(plodiny anySatisfy: [:pl | pl id = a value plodina]) " +
	"\n\t\t\t\t\tand: [b value plodina isNil or: [(a value popis ifNil: 'zz') <= (b value popis ifNil: 'zzz')]]]" +
	"\n\t\t\t\tor: [a value isDefault & b value plodina isNil] " +
	"\n\t\t\t\tor: [b value isDefault not & b value plodina isNil " +
	"\n\t\t\t\t\tand: [(a value popis ifNil: 'zz') <= (b value popis ifNil: 'zzz')]]" +
	"\n\t\t\t]" +
	"\n\t\t] ifFalse: [ | chybi |" +
	"\n\t\t\t\"doplnim chybejici plodiny\"" +
	"\n\t\t\tchybi := SortedCollection new." +
	"\n\t\t\tdata do: [:row | (plodiny isNil or: [plodiny noneSatisfy: [:pl | pl id = row value plodina]]) ifTrue: [" +
	"\n\t\t\t\tchybi addUnique: row value plodina]]." +
	"\n\t\t\tchybi isEmpty ifFalse: [" +
	"\n\t\t\t\tplodiny addAll: ((Fytoportal data taxony nazvyTaxonu lookupKeys: chybi) " +
	"\n\t\t\t\t\tcollect: [:row | FYPlodina new id: row id; cesky: row value])]" +
	"\n\t\t]." +
	"\n\t\tskodlOrg size > 0 ifTrue: [" +
	"\n\t\t\t\"doplnim nazvy skodl. org.\"" +
	"\n\t\t\tdata do: [:row | " +
	"\n\t\t\t\trow value skodlOrg: (skodlOrg detect: [:ea | ea id = row value skodlOrg]) nazev]]." +
	"\n\t] ifNil: [" +
	"\n\t\tdata := Fytoportal data fotky fotkyPlodiny lookupKeys: (plodiny collect: [:pl | pl id])" +
	"\n\t]." +
	"\n\tplodiny asCollection size > 0 ifTrue: [" +
	"\n\t\t\"doplnim nazvy plodiny\"" +
	"\n\t\tdata do: [:row | row value plodina ifNotNil: [" +
	"\n\t\t\trow value plodina: (plodiny detect: [:ea | ea id = row value plodina]) nazev]]]." +
	"\n\t\"vychozi fotka bude prvni, jinak podle popisu\"" +
	"\n\tsortBlock ifNil: [" +
	"\n\t\tsortBlock := [:a :b | a value isDefault or: [b value isDefault not and: [" +
	"\n\t\t\t(a value popis ifNil: 'zz') <= (b value popis ifNil: 'zzz')]]]" +
	"\n\t]." +
	"\n\tdata := data asSortedCollection: sortBlock." +
	"\n\tself store loadData: (data collect: [:d | d asJsObject])." +
	"\n\t\"asCollection zkonvertuje vybrany record na pole, pripadny nil pak na prazdne pole\"" +
	"\n\tself selectNodes: " +
	"\n\t\t((self store recordById: fotoId) ifNil: [self store recordsFrom: 1 to: 1]) asCollection" +
	"\n\t\tsilently: false",
	null, "2014-03-12T17:25:04Z", "mp", 3);

jst.FYFotoNahledy.addMethod("nactiFotkyVyber:", "fotoId", "updating", 
	"\t| data sortBlock |" +
	"\n\tplodina notNil & plodiny isNil ifTrue: [" +
	"\n\t\t\"doplnim podrizene plodiny, pokud existuji\"" +
	"\n\t\tplodiny := OrderedCollection withAll: plodina." +
	"\n\t\t(Fytoportal data plodiny podrizenePlodiny lookupKeys: (plodiny collect: [:pl | pl id])) do: [:row | " +
	"\n\t\t\tplodiny add: (FYPlodina new " +
	"\n\t\t\t\tid: row id; " +
	"\n\t\t\t\tparent: row key;" +
	"\n\t\t\t\tcesky: row value)]]." +
	"\n\tskodlOrg ifNotNil: [" +
	"\n\t\t\"vsechny fotky pro vybrane skodlOrg\"" +
	"\n\t\tdata := Fytoportal data fotky fotkySkodlOrg lookupKeys: (skodlOrg collect: [:sk | sk id])." +
	"\n\t\tnaPlodine ifTrue: [" +
	"\n\t\t\t\"pouze fotky na vybrane plodine a mimo plodinu\"" +
	"\n\t\t\tdata := data select: [:ea | " +
	"\n\t\t\t\tea value plodina isNil or: [plodiny anySatisfy: [:pl | pl id = ea value plodina]]]." +
	"\n\t\t\tsortBlock := [:a :b | (plodiny anySatisfy: [:pl | pl id = a value plodina]) & a value isDefault" +
	"\n\t\t\t\tor: [(plodiny anySatisfy: [:pl | pl id = a value plodina]) " +
	"\n\t\t\t\t\tand: [b value plodina isNil or: [(a value popis ifNil: 'zz') <= (b value popis ifNil: 'zzz')]]]" +
	"\n\t\t\t\tor: [a value isDefault & b value plodina isNil] " +
	"\n\t\t\t\tor: [b value isDefault not & b value plodina isNil " +
	"\n\t\t\t\t\tand: [(a value popis ifNil: 'zz') <= (b value popis ifNil: 'zzz')]]" +
	"\n\t\t\t]" +
	"\n\t\t] ifFalse: [ | chybi |" +
	"\n\t\t\t\"doplnim chybejici plodiny\"" +
	"\n\t\t\tchybi := SortedCollection new." +
	"\n\t\t\tdata do: [:row | (plodiny isNil or: [plodiny noneSatisfy: [:pl | pl id = row value plodina]]) ifTrue: [" +
	"\n\t\t\t\tchybi addUnique: row value plodina]]." +
	"\n\t\t\tchybi isEmpty ifFalse: [" +
	"\n\t\t\t\tplodiny addAll: ((Fytoportal data taxony nazvyTaxonu lookupKeys: chybi) " +
	"\n\t\t\t\t\tcollect: [:row | FYPlodina new id: row id; cesky: row value])]" +
	"\n\t\t]." +
	"\n\t\tskodlOrg size > 0 ifTrue: [" +
	"\n\t\t\t\"doplnim nazvy skodl. org.\"" +
	"\n\t\t\tdata do: [:row | " +
	"\n\t\t\t\trow value skodlOrg: (skodlOrg detect: [:ea | ea id = row value skodlOrg]) text]]." +
	"\n\t] ifNil: [" +
	"\n\t\tdata := Fytoportal data fotky fotkyPlodiny lookupKeys: (plodiny collect: [:pl | pl id])" +
	"\n\t]." +
	"\n\tplodiny asCollection size > 0 ifTrue: [" +
	"\n\t\t\"doplnim nazvy plodiny\"" +
	"\n\t\tdata do: [:row | row value plodina ifNotNil: [" +
	"\n\t\t\trow value plodina: (plodiny detect: [:ea | ea id = row value plodina]) text]]]." +
	"\n\t\"vychozi fotka bude prvni, jinak podle popisu\"" +
	"\n\tsortBlock ifNil: [" +
	"\n\t\tsortBlock := [:a :b | a value isDefault or: [b value isDefault not and: [" +
	"\n\t\t\t(a value popis ifNil: 'zz') <= (b value popis ifNil: 'zzz')]]]" +
	"\n\t]." +
	"\n\tdata := data asSortedCollection: sortBlock." +
	"\n\tself store loadData: (data collect: [:d | d asJsObject])." +
	"\n\t\"asCollection zkonvertuje vybrany record na pole, pripadny nil pak na prazdne pole\"" +
	"\n\tself selectNodes: " +
	"\n\t\t((self store recordById: fotoId) ifNil: [self store recordsFrom: 1 to: 1]) asCollection" +
	"\n\t\tsilently: false",
	null, "2014-03-16T22:34:36Z", "mp", 1);

jst.FYFotoNahledy.addMethod("nactiFotkyVyber:", "fotoId", "updating", 
	"\t| data sortBlock |" +
	"\n\tplodina notNil & plodiny isNil ifTrue: [" +
	"\n\t\t\"doplnim podrizene plodiny, pokud existuji\"" +
	"\n\t\tplodiny := OrderedCollection withAll: plodina." +
	"\n\t\t(Fytoportal data plodiny podrizenePlodiny lookupKeys: (plodiny collect: [:pl | pl id])) do: [:row | " +
	"\n\t\t\tplodiny add: (FYPlodina new " +
	"\n\t\t\t\tid: row id; " +
	"\n\t\t\t\tparent: row key;" +
	"\n\t\t\t\tcesky: row value)]]." +
	"\n\tskodlOrg ifNotNil: [" +
	"\n\t\t\"vsechny fotky pro vybrane skodlOrg\"" +
	"\n\t\tdata := Fytoportal data fotky fotkySkodlOrg lookupKeys: (skodlOrg collect: [:sk | sk id])." +
	"\n\t\tnaPlodine ifTrue: [" +
	"\n\t\t\t\"pouze fotky na vybrane plodine a mimo plodinu\"" +
	"\n\t\t\tdata := data select: [:ea | " +
	"\n\t\t\t\tea value plodina isNil or: [plodiny anySatisfy: [:pl | pl id = ea value plodina]]]." +
	"\n\t\t\tsortBlock := [:a :b | (plodiny anySatisfy: [:pl | pl id = a value plodina]) & a value isDefault" +
	"\n\t\t\t\tor: [(plodiny anySatisfy: [:pl | pl id = a value plodina]) " +
	"\n\t\t\t\t\tand: [b value plodina isNil or: [(a value popis ifNil: 'zz') <= (b value popis ifNil: 'zzz')]]]" +
	"\n\t\t\t\tor: [a value isDefault & b value plodina isNil] " +
	"\n\t\t\t\tor: [b value isDefault not & b value plodina isNil " +
	"\n\t\t\t\t\tand: [(a value popis ifNil: 'zz') <= (b value popis ifNil: 'zzz')]]" +
	"\n\t\t\t]" +
	"\n\t\t] ifFalse: [ | chybi |" +
	"\n\t\t\t\"doplnim chybejici plodiny\"" +
	"\n\t\t\tchybi := SortedCollection new." +
	"\n\t\t\tdata do: [:row | (plodiny isNil or: [plodiny noneSatisfy: [:pl | pl id = row value plodina]]) ifTrue: [" +
	"\n\t\t\t\tchybi addUnique: row value plodina]]." +
	"\n\t\t\tchybi isEmpty ifFalse: [" +
	"\n\t\t\t\tplodiny ifNil: [" +
	"\n\t\t\t\t\tplodiny := OrderedCollection new]." +
	"\n\t\t\t\tplodiny addAll: ((Fytoportal data taxony nazvyTaxonu lookupKeys: chybi) " +
	"\n\t\t\t\t\tcollect: [:row | FYPlodina new id: row id; cesky: row value])]" +
	"\n\t\t]." +
	"\n\t\tskodlOrg size > 0 ifTrue: [" +
	"\n\t\t\t\"doplnim nazvy skodl. org.\"" +
	"\n\t\t\tdata do: [:row | " +
	"\n\t\t\t\trow value skodlOrg: (skodlOrg detect: [:ea | ea id = row value skodlOrg]) text]]." +
	"\n\t] ifNil: [" +
	"\n\t\tdata := Fytoportal data fotky fotkyPlodiny lookupKeys: (plodiny collect: [:pl | pl id])" +
	"\n\t]." +
	"\n\tplodiny asCollection size > 0 ifTrue: [" +
	"\n\t\t\"doplnim nazvy plodiny\"" +
	"\n\t\tdata do: [:row | row value plodina ifNotNil: [" +
	"\n\t\t\trow value plodina: (plodiny detect: [:ea | ea id = row value plodina]) text]]]." +
	"\n\t\"vychozi fotka bude prvni, jinak podle popisu\"" +
	"\n\tsortBlock ifNil: [" +
	"\n\t\tsortBlock := [:a :b | a value isDefault or: [b value isDefault not and: [" +
	"\n\t\t\t(a value popis ifNil: 'zz') <= (b value popis ifNil: 'zzz')]]]" +
	"\n\t]." +
	"\n\tdata := data asSortedCollection: sortBlock." +
	"\n\tself store loadData: (data collect: [:d | d asJsObject])." +
	"\n\t\"asCollection zkonvertuje vybrany record na pole, pripadny nil pak na prazdne pole\"" +
	"\n\tself selectNodes: " +
	"\n\t\t((self store recordById: fotoId) ifNil: [self store recordsFrom: 1 to: 1]) asCollection" +
	"\n\t\tsilently: false",
	null, "2014-03-21T22:51:27Z", "mp", 1);

jst.FYFotoNahledy.addMethod("nactiFotkyVyber:", "fotoId", "updating", 
	"\t| data |" +
	"\n\tplodina notNil & plodiny isNil ifTrue: [" +
	"\n\t\t\"doplnim podrizene plodiny, pokud existuji\"" +
	"\n\t\tplodiny := OrderedCollection withAll: plodina." +
	"\n\t\t(Fytoportal data plodiny podrizenePlodiny lookupKeys: (plodiny collect: [:pl | pl id])) do: [:row | " +
	"\n\t\t\tplodiny add: (FYPlodina new " +
	"\n\t\t\t\tid: row id; " +
	"\n\t\t\t\tparent: row key;" +
	"\n\t\t\t\tcesky: row value)]]." +
	"\n\tskodlOrg ifNotNil: [ | chybi |" +
	"\n\t\t\"vsechny fotky pro vybrane skodlOrg\"" +
	"\n\t\tdata := Fytoportal data fotky fotkySkodlOrg lookupKeys: (skodlOrg collect: [:sk | sk id])." +
	"\n\t\tnaPlodine ifTrue: [" +
	"\n\t\t\t\"pouze fotky na vybranych plodinach a mimo plodinu + vybrana fotka\"" +
	"\n\t\t\tdata := data select: [:ea | " +
	"\n\t\t\t\tea value plodina isNil or: [ea id = fotoId] or: [plodiny anySatisfy: [:pl | pl id = ea value plodina]]]]." +
	"\n\t\t\"doplnim nazvy chybejicich plodin\"" +
	"\n\t\tchybi := SortedCollection new." +
	"\n\t\tdata do: [:row | (plodiny isNil or: [plodiny noneSatisfy: [:pl | pl id = row value plodina]]) ifTrue: [" +
	"\n\t\t\tchybi addUnique: row value plodina]]." +
	"\n\t\tchybi isEmpty ifFalse: [" +
	"\n\t\t\tplodiny ifNil: [" +
	"\n\t\t\t\tplodiny := OrderedCollection new]." +
	"\n\t\t\tplodiny addAll: ((Fytoportal data taxony nazvyTaxonu lookupKeys: chybi) " +
	"\n\t\t\t\tcollect: [:row | FYPlodina new id: row id; cesky: row value])]." +
	"\n\t\tskodlOrg size > 0 ifTrue: [" +
	"\n\t\t\t\"doplnim nazvy skodl. org.\"" +
	"\n\t\t\tdata do: [:row | " +
	"\n\t\t\t\trow value skodlOrg: (skodlOrg detect: [:ea | ea id = row value skodlOrg]) text]]." +
	"\n\t] ifNil: [" +
	"\n\t\tdata := Fytoportal data fotky fotkyPlodiny lookupKeys: (plodiny collect: [:pl | pl id])" +
	"\n\t]." +
	"\n\tplodiny asCollection size > 0 ifTrue: [" +
	"\n\t\t\"doplnim nazvy plodiny\"" +
	"\n\t\tdata do: [:row | row value plodina ifNotNil: [" +
	"\n\t\t\trow value plodina: (plodiny detect: [:ea | ea id = row value plodina]) text]]]." +
	"\n\t\"vychozi fotka bude prvni, jinak podle popisu\"" +
	"\n\tdata := data asSortedCollection: [:a :b | a value isDefault or: [b value isDefault not and: [" +
	"\n\t\t(a value popis ifNil: 'zz') <= (b value popis ifNil: 'zzz')]]]." +
	"\n\tnaPlodine ifTrue: [" +
	"\n\t\t\"fotky na plodine zaradim na zacatek seznamu\"" +
	"\n\t\tdata := OrderedCollection new " +
	"\n\t\t\taddAll: (data select: [:row | row value plodina notNil]);" +
	"\n\t\t\taddAll: (data select: [:row | row value plodina isNil]);" +
	"\n\t\t\tyourself" +
	"\n\t]." +
	"\n\tself store loadData: (data collect: [:d | d asJsObject])." +
	"\n\t\"asCollection zkonvertuje vybrany record na pole, pripadny nil pak na prazdne pole\"" +
	"\n\tself selectNodes: " +
	"\n\t\t((self store recordById: fotoId) ifNil: [self store recordsFrom: 1 to: 1]) asCollection" +
	"\n\t\tsilently: false",
	null, "2014-05-19T13:05:03Z", "mp"); //fytoportal-foto

/*
jst.FYFotoNahledy.addMethod("nactiFotky", "", "updating", 
	"\tself nactiFotkyVyber: nil",
	null, "2014-02-23T21:53:28Z", "mp");
*/

jst.FYFotoNahledy.addMethod("zoomAnimatedFrom:", "id", "utils", 
	"\tFYFotoWindow new " +
	"\n\t\tanimateTarget: id;" +
	"\n\t\tplodina: plodina;" +
	"\n\t\tskodlOrg: skodlOrg;" +
	"\n\t\tvyber: self vyber;" +
	"\n\t\tshow",
	null, "2014-02-26T15:26:28Z", "mp", 1);

jst.FYFotoNahledy.addMethod("zoomAnimatedFrom:", "id", "utils", 
	"\tself vyber ifNotNilDo: [:fotoId |" +
	"\n\t\tFYFotoWindow new " +
	"\n\t\t\tanimateTarget: id;" +
	"\n\t\t\tplodina: plodina;" +
	"\n\t\t\tskodlOrg: skodlOrg;" +
	"\n\t\t\tvyber: fotoId;" +
	"\n\t\t\tshow" +
	"\n\t] ifNil: [" +
	"\n\t\tself inform: 'Žádná fotografie není vybrána']",
	null, "2014-02-26T15:55:15Z", "mp", 1);

jst.FYFotoNahledy.addMethod("zoomAnimatedFrom:", "id", "utils", 
	"\tself vyber ifNotNilDo: [:fotoId |" +
	"\n\t\tFYFotoWindow new " +
	"\n\t\t\tanimateTarget: id;" +
	"\n\t\t\tplodina: (naPlodine ifTrue: [plodina]);" +
	"\n\t\t\tskodlOrg: skodlOrg;" +
	"\n\t\t\tvyber: fotoId;" +
	"\n\t\t\tshow" +
	"\n\t] ifNil: [" +
	"\n\t\tself inform: 'Žádná fotografie není vybrána']",
	null, "2014-04-02T19:45:52Z", "mp", 1);

jst.FYFotoNahledy.addMethod("zoomAnimatedFrom:", "id", "utils", 
	"\tself vyber ifNotNilDo: [:fotoId |" +
	"\n\t\tFYFotoWindow new " +
	"\n\t\t\tanimateTarget: id;" +
	"\n\t\t\tplodina: (skodlOrg isNil | naPlodine ifTrue: [plodina]);" +
	"\n\t\t\tskodlOrg: skodlOrg;" +
	"\n\t\t\tvyber: fotoId;" +
	"\n\t\t\tshow" +
	"\n\t] ifNil: [" +
	"\n\t\tself inform: 'Žádná fotografie není vybrána']",
	null, "2014-05-01T15:58:30Z", "mp"); //fytoportal-foto

jst.FYFotoNahledy.addMethod("zoom", "", "utils", 
	"\t^ self zoomAnimatedFrom: nil",
	null, "2014-02-26T15:08:45Z", "mp");

jst.FYFotoNahledy.addMethod("vyber:", "fotoId", "accessing", 
	"\tvyber := fotoId",
	null, "2014-02-26T15:15:06Z", "mp");

jst.FYFotoNahledy.addMethod("vyber", "", "accessing", 
	"\t^ self selectedNodes ifNotEmptyDo: [:sel | " +
	"\n\t\t(self store recordAt: sel first viewIndex + 1) id" +
	"\n\t] ifEmpty: nil",
	null, "2014-02-26T15:18:22Z", "mp");

jst.FYFotoNahledy.addMethod("vyberPredchozi", "", "accessing", 
	"\tself selectPrevious",
	null, "2014-04-02T21:15:37Z", "mp");

jst.FYFotoNahledy.addMethod("vyberDalsi", "", "accessing", 
	"\tself selectNext",
	null, "2014-04-02T21:15:45Z", "mp");

//*** FYFotoNahledyRadek ***

jst.FYFotoNahledyRadek.addMethod("tplNahledy", "", "initialization", 
	"\t^ ExtXTemplate new compiled: true; htmlContents: [:html | " +
	"\n\t\thtml table: [html tableRow class: 'nahledy'; with: [" +
	"\n\t\t\t(html tag: 'tpl') attributeAt: 'for' put: '.'; with: [" +
	"\n\t\t\t\thtml tableData verticalAlign: #top; with: [" +
	"\n\t\t\t\t\thtml div class: 'thumb-wrap'; with: [" +
	"\n\t\t\t\t\t\thtml div class: 'thumb'; with: [" +
	"\n\t\t\t\t\t\t\thtml img height: '120'; width: '{format * 120}'; src: '{preview}'; title: '{popis}']." +
	"\n\t\t\t\t\t\thtml span: '{kratkyPopis}'; span: 'Autor: {autor}'" +
	"\n\t\t\t\t\t]" +
	"\n\t\t\t\t]" +
	"\n\t\t\t]" +
	"\n\t\t]]" +
	"\n\t]",
	null, "2014-02-26T13:47:17Z", "mp"); //fytoportal-foto

//*** FYFotoDetail ***

jst.FYFotoDetail.addMethod("canvas:", "aHTMLCanvasElement", "accessing", 
	"\tctx := aHTMLCanvasElement context2D." +
	"\n\tself canvasResized",
	null, "2014-02-26T08:56:34Z", "mp");

jst.FYFotoDetail.addMethod("canvas", "", "accessing", 
	"\t^ ctx ifNotNil: [" +
	"\n\t\tctx canvas]",
	null, "2014-02-26T13:18:34Z", "mp");

jst.FYFotoDetail.addMethod("canvasResized", "", "updating", 
	"\t| prevSel |" +
	"\n\tprevSel := urlSel." +
	"\n\turlSel := ctx width <= 880 & (ctx height <= 660) " +
	"\n\t\tifTrue: [#optimal]" +
	"\n\t\tifFalse: [#original]." +
	"\n\timg ifNotNil: [" +
	"\n\t\tprevSel = urlSel ifTrue: [" +
	"\n\t\t\t\"musim nastavit aktualni rect\"" +
	"\n\t\t\trect := (Rectangle extent: img width @ img height) " +
	"\n\t\t\t\tscaleToFit: (Rectangle extent: ctx width @ ctx height) center: true." +
	"\n\t\t\tctx drawImage: img origin: rect origin extent: rect extent]." +
	"\n\t\timg := nil." +
	"\n\t\tprevSel = urlSel ifFalse: [" +
	"\n\t\t\t\"budu nacitat i fotku\"" +
	"\n\t\t\tself drawFoto: fotka]" +
	"\n\t]",
	null, "2014-02-26T09:24:52Z", "mp", 1);

jst.FYFotoDetail.addMethod("canvasResized", "", "updating", 
	"\t| prevSel |" +
	"\n\tprevSel := urlSel." +
	"\n\turlSel := ctx width <= 880 & (ctx height <= 660) " +
	"\n\t\tifTrue: [#optimal]" +
	"\n\t\tifFalse: [#original]." +
	"\n\timg ifNotNil: [" +
	"\n\t\tprevSel = urlSel ifTrue: [" +
	"\n\t\t\t\"musim nastavit aktualni rect\"" +
	"\n\t\t\trect := (Rectangle extent: img width @ img height) " +
	"\n\t\t\t\tscaleToFit: (Rectangle extent: ctx width @ ctx height) center: true." +
	"\n\t\t\tctx drawImage: img origin: rect origin extent: rect extent" +
	"\n\t\t] ifFalse: [" +
	"\n\t\t\timg := nil." +
	"\n\t\t\t\"budu nacitat i fotku\"" +
	"\n\t\t\tself drawFoto: fotka]" +
	"\n\t]",
	null, "2014-02-26T13:54:28Z", "mp", 2);

jst.FYFotoDetail.addMethod("canvasResized", "", "updating", 
	"\t| prevSel |" +
	"\n\tprevSel := urlSel." +
	"\n\turlSel := ctx width <= 880 & (ctx height <= 660) " +
	"\n\t\tifTrue: [#optimal]" +
	"\n\t\tifFalse: [#original]." +
	"\n\timg ifNotNil: [" +
	"\n\t\tprevSel = urlSel ifTrue: [" +
	"\n\t\t\t\"musim nastavit aktualni rect\"" +
	"\n\t\t\tself calcRect." +
	"\n\t\t\tctx drawImage: img origin: rect origin extent: rect extent" +
	"\n\t\t] ifFalse: [" +
	"\n\t\t\timg := nil." +
	"\n\t\t\t\"budu nacitat i fotku\"" +
	"\n\t\t\tself drawFoto: fotka]" +
	"\n\t]",
	null, "2014-02-27T20:08:29Z", "mp"); //fytoportal-foto

jst.FYFotoDetail.addMethod("drawFoto:", "foto", "private", 
	"\tfotka := foto." +
	"\n\tHTMLImageElement new" +
	"\n\t\tsrc: (fotka perform: urlSel);" +
	"\n\t\ton: #load do: [:ev | | prevImg prevRect |" +
	"\n\t\t\tprevImg := img." +
	"\n\t\t\timg := ev target." +
	"\n\t\t\t(prevImg notNil and: [prevImg width <= img width] and: [prevImg height <= img height]) ifTrue: [" +
	"\n\t\t\t\t\"predchozi obrazek neni vetsi, nemusim jej prekreslovat\"" +
	"\n\t\t\t\tprevImg := nil]." +
	"\n\t\t\tprevRect := rect." +
	"\n\t\t\trect := (Rectangle extent: img width @ img height) " +
	"\n\t\t\t\tscaleToFit: (Rectangle extent: ctx width @ ctx height) center: true." +
	"\n\t\t\tAnimation new" +
	"\n\t\t\t\tduration: 500;" +
	"\n\t\t\t\tfadeIn: [:alpha | " +
	"\n\t\t\t\t\tprevImg ifNotNil: [" +
	"\n\t\t\t\t\t\t\"pokud je predchozi obrazek vetsi, budu jej prekreslovat do ztracena\"" +
	"\n\t\t\t\t\t\tctx clear." +
	"\n\t\t\t\t\t\tctx globalAlpha: 1 - alpha." +
	"\n\t\t\t\t\t\tctx drawImage: prevImg origin: prevRect origin extent: prevRect extent]." +
	"\n\t\t\t\t\tctx globalAlpha: alpha." +
	"\n\t\t\t\t\tctx drawImage: img origin: rect origin extent: rect extent]" +
	"\n\t\t]",
	null, "2014-02-26T10:05:42Z", "mp", 1);

jst.FYFotoDetail.addMethod("drawFoto:", "foto", "private", 
	"\tfotka := foto." +
	"\n\tHTMLImageElement new" +
	"\n\t\tsrc: (fotka perform: urlSel);" +
	"\n\t\ton: #load do: [:ev | | prevImg prevRect |" +
	"\n\t\t\tprevImg := img." +
	"\n\t\t\timg := ev target." +
	"\n\t\t\tprevRect := rect." +
	"\n\t\t\trect := (Rectangle extent: img width @ img height) " +
	"\n\t\t\t\tscaleToFit: (Rectangle extent: ctx width @ ctx height) center: true." +
	"\n\t\t\t(prevImg notNil and: [prevRect width <= rect width] and: [prevRect height <= rect height]) ifTrue: [" +
	"\n\t\t\t\t\"predchozi obrazek neni vetsi, nemusim jej prekreslovat\"" +
	"\n\t\t\t\tprevImg := nil]." +
	"\n\t\t\tAnimation new" +
	"\n\t\t\t\tduration: 500;" +
	"\n\t\t\t\tfadeIn: [:alpha | " +
	"\n\t\t\t\t\tprevImg ifNotNil: [" +
	"\n\t\t\t\t\t\t\"pokud je predchozi obrazek vetsi, budu jej prekreslovat do ztracena\"" +
	"\n\t\t\t\t\t\tctx clear." +
	"\n\t\t\t\t\t\tctx globalAlpha: 1 - alpha." +
	"\n\t\t\t\t\t\tctx drawImage: prevImg origin: prevRect origin extent: prevRect extent]." +
	"\n\t\t\t\t\tctx globalAlpha: alpha." +
	"\n\t\t\t\t\tctx drawImage: img origin: rect origin extent: rect extent]" +
	"\n\t\t]",
	null, "2014-02-26T14:00:29Z", "mp", 2);

jst.FYFotoDetail.addMethod("drawFoto:", "foto", "private", 
	"\tfotka := foto." +
	"\n\tHTMLImageElement new" +
	"\n\t\tsrc: (fotka perform: urlSel);" +
	"\n\t\ton: #load do: [:ev | | prevImg prevRect |" +
	"\n\t\t\tprevImg := img." +
	"\n\t\t\timg := ev target." +
	"\n\t\t\tprevRect := rect." +
	"\n\t\t\tself calcRect." +
	"\n\t\t\t(prevImg notNil and: [prevRect width <= rect width] and: [prevRect height <= rect height]) ifTrue: [" +
	"\n\t\t\t\t\"predchozi obrazek neni vetsi, nemusim jej prekreslovat\"" +
	"\n\t\t\t\tprevImg := nil]." +
	"\n\t\t\tAnimation new" +
	"\n\t\t\t\tduration: 500;" +
	"\n\t\t\t\tfadeIn: [:alpha | " +
	"\n\t\t\t\t\tprevImg ifNotNil: [" +
	"\n\t\t\t\t\t\t\"pokud je predchozi obrazek vetsi, budu jej prekreslovat do ztracena\"" +
	"\n\t\t\t\t\t\tctx clear." +
	"\n\t\t\t\t\t\tctx globalAlpha: 1 - alpha." +
	"\n\t\t\t\t\t\tctx drawImage: prevImg origin: prevRect origin extent: prevRect extent]." +
	"\n\t\t\t\t\tctx globalAlpha: alpha." +
	"\n\t\t\t\t\tctx drawImage: img origin: rect origin extent: rect extent]" +
	"\n\t\t]",
	null, "2014-02-27T20:08:41Z", "mp"); //fytoportal-foto

jst.FYFotoDetail.addMethod("calcRect", "", "private", 
	"\trect := (Rectangle extent: img width @ img height) " +
	"\n\t\tscaleToFit: (Rectangle origin: 4 @ 4 extent: (Point x: ctx width - 10 y: ctx height - 10)) " +
	"\n\t\tcenter: true",
	null, "2014-02-27T20:08:09Z", "mp");

jst.FYFotoDetail.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanObject ifNotNil: [" +
	"\n\t\tself drawFoto: (anObject data at: #fotka)" +
	"\n\t] ifNil: [" +
	"\n\t\tfotka := nil." +
	"\n\t\timg := nil." +
	"\n\t\tctx clear]",
	null, "2014-02-26T09:24:42Z", "mp");

//*** FYFotoViewer ***

jst.FYFotoViewer.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\t(Browser screen width >= 1280 and: [Browser screen height >= 768]) ifTrue: [" +
	"\n\t\tself border: false;" +
	"\n\t\t\twithBorderLayout;" +
	"\n\t\t\tadd: (detailPanel := ExtPanel new " +
	"\n\t\t\t\tregion: (ExtRegion center minHeight: 350));" +
	"\n\t\t\tadd: (ExtPanel new " +
	"\n\t\t\t\tregion: (ExtSplitRegion south minHeight: 180); " +
	"\n\t\t\t\theight: 180; \twithFitLayout; " +
	"\n\t\t\t\tadd: (nahledy := FYFotoNahledyRadek new);" +
	"\n\t\t\t\tyourself)." +
	"\n\t\tnahledy " +
	"\n\t\t\taddDependent: (detail := FYFotoDetail new)" +
	"\n\t] ifFalse: [" +
	"\n\t\tself withFitLayout; " +
	"\n\t\t\tcls: 'nahledy'; " +
	"\n\t\t\tadd: (nahledy := FYFotoNahledy new)]",
	null, "2014-02-26T13:02:07Z", "mp", 1);

jst.FYFotoViewer.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\t(Browser screen width >= 1280 and: [Browser screen height >= 768]) ifTrue: [" +
	"\n\t\tself border: false;" +
	"\n\t\t\twithBorderLayout;" +
	"\n\t\t\tadd: (detailPanel := ExtPanel new " +
	"\n\t\t\t\tregion: (ExtRegion center minHeight: 350);" +
	"\n\t\t\t\ton: #click do: [nahledy zoomAnimatedFrom: detailPanel id]);" +
	"\n\t\t\tadd: (ExtPanel new " +
	"\n\t\t\t\tregion: (ExtSplitRegion south minHeight: 160); " +
	"\n\t\t\t\theight: 195; \twithFitLayout; " +
	"\n\t\t\t\tadd: (nahledy := FYFotoNahledyRadek new);" +
	"\n\t\t\t\tyourself)." +
	"\n\t\tnahledy " +
	"\n\t\t\taddDependent: (detail := FYFotoDetail new)" +
	"\n\t] ifFalse: [" +
	"\n\t\tself withFitLayout; " +
	"\n\t\t\tcls: 'nahledy'; " +
	"\n\t\t\tadd: (nahledy := FYFotoNahledy new)]",
	null, "2014-02-26T15:07:56Z", "mp"); //fytoportal-foto

jst.FYFotoViewer.addMethod("pouzeNahledy", "", "accessing", 
	"\t^ detail isNil",
	null, "2014-02-26T12:54:47Z", "mp");

jst.FYFotoViewer.addMethod("nahledy", "", "accessing", 
	"\t^ nahledy",
	null, "2014-02-26T12:58:39Z", "mp");

jst.FYFotoViewer.addMethod("detailbodyresizeEvent", "", "events", 
	"\t^ [:rec :w :h | detail canvas " +
	"\n\t\tifNil: [ | canv |\t" +
	"\n\t\t\tcanv := 'foto-optim'." +
	"\n\t\t\tdetailPanel htmlContents: [:html |" +
	"\n\t\t\t\thtml canvas " +
	"\n\t\t\t\t\tid: canv;" +
	"\n\t\t\t\t\twidth: w; " +
	"\n\t\t\t\t\theight: h]." +
	"\n\t\t\tdetail canvas: (Document current elementById: canv)]" +
	"\n\t\tifNotNil: [detail canvas " +
	"\n\t\t\twidth: w;" +
	"\n\t\t\theight: h." +
	"\n\t\tdetail canvasResized]" +
	"\n\t]",
	null, "2014-02-26T14:04:10Z", "mp");

jst.FYFotoViewer.addMethod("update:with:", "anAspect anObject", "updating", 
	"\t\"pouze deleguji na nahledy\"" +
	"\n\tnahledy update: anAspect with: anObject ",
	null, "2014-02-26T13:15:24Z", "mp");

jst.FYFotoViewer.addMethod("installListeners", "", "initialization", 
	"\tsuper installListeners." +
	"\n\tdetailPanel ifNotNil: [" +
	"\n\t\tself installListenersOn: detailPanel prefix: #detail]",
	null, "2014-02-26T13:44:24Z", "mp");

//*** FYFotoWindow ***

jst.FYFotoWindow.addMethod("initialize", "", "initialization", 
	"\t| h w |" +
	"\n\th := Browser window pageHeight - 30." +
	"\n\tw := (h * 1.333) rounded + 235 min: Browser window pageWidth - 60." +
	"\n\tsuper initialize" +
	"\n\t\tcls: 'foto-win';" +
	"\n\t\tclosable: true;" +
	"\n\t\tresizable: false;" +
	"\n\t\twithoutBorder;" +
	"\n\t\tplain: true;" +
	"\n\t\tmodal: true;" +
	"\n\t\theight: h;" +
	"\n\t\twidth: w;" +
	"\n\t\twithBorderLayout;" +
	"\n\t\tadd: (fotka := ExtPanel new region: #center);" +
	"\n\t\tadd: (ExtContainer new " +
	"\n\t\t\tregion: #east; " +
	"\n\t\t\twidth: 235; " +
	"\n\t\t\twithBorderLayout;" +
	"\n\t\t\tadd: (ExtPanel new " +
	"\n\t\t\t\tregion: #center; " +
	"\n\t\t\t\tautoScroll: true; " +
	"\n\t\t\t\tadd: (nahledy := FYFotoNahledy new); " +
	"\n\t\t\t\tyourself); " +
	"\n\t\t\tadd: (ExtToolbar new " +
	"\n\t\t\t\tregion: #south; " +
	"\n\t\t\t\theight: 27; " +
	"\n\t\t\t\tbuttonAlign: #center;" +
	"\n\t\t\t\tadd: (ExtButton new " +
	"\n\t\t\t\t\ttext: 'Zavřít fotogalerii'; " +
	"\n\t\t\t\t\ton: #click do: [self close]);" +
	"\n\t\t\t\tyourself);" +
	"\n\t\t\tyourself);" +
	"\n\t\tmoveRelativeTo: (Point " +
	"\n\t\t\tx: (Browser window pageWidth - w / 2) rounded" +
	"\n\t\t\ty: (Browser window pageHeight - h / 2) rounded)." +
	"\n\tnahledy" +
	"\n\t\taddDependent: self",
	null, "2014-02-25T15:39:15Z", "mp", 1);

jst.FYFotoWindow.addMethod("initialize", "", "initialization", 
	"\t| h w |" +
	"\n\th := Browser window pageHeight - 30." +
	"\n\tw := (h * 1.333) rounded + 235 min: Browser window pageWidth - 60." +
	"\n\tsuper initialize" +
	"\n\t\tcls: 'foto-win';" +
	"\n\t\tclosable: true;" +
	"\n\t\tresizable: false;" +
	"\n\t\twithoutBorder;" +
	"\n\t\tplain: true;" +
	"\n\t\tmodal: true;" +
	"\n\t\theight: h;" +
	"\n\t\twidth: w;" +
	"\n\t\twithBorderLayout;" +
	"\n\t\tadd: (fotka := ExtPanel new region: #center);" +
	"\n\t\tadd: (ExtContainer new " +
	"\n\t\t\tregion: #east; " +
	"\n\t\t\twidth: 235; " +
	"\n\t\t\twithBorderLayout;" +
	"\n\t\t\tadd: (ExtPanel new " +
	"\n\t\t\t\tregion: #center; " +
	"\n\t\t\t\tautoScroll: true; " +
	"\n\t\t\t\tadd: (nahledy := FYFotoNahledy new); " +
	"\n\t\t\t\tyourself); " +
	"\n\t\t\tadd: (ExtToolbar new " +
	"\n\t\t\t\tregion: #south; " +
	"\n\t\t\t\theight: 27; " +
	"\n\t\t\t\tbuttonAlign: #center;" +
	"\n\t\t\t\tadd: (ExtButton new " +
	"\n\t\t\t\t\ttext: 'Zavřít fotogalerii'; " +
	"\n\t\t\t\t\ton: #click do: [self close]);" +
	"\n\t\t\t\tyourself);" +
	"\n\t\t\tyourself);" +
	"\n\t\tmoveRelativeTo: (Point " +
	"\n\t\t\tx: (Browser window pageWidth - w / 2) rounded" +
	"\n\t\t\ty: (Browser window pageHeight - h / 2) rounded)." +
	"\n\tnahledy" +
	"\n\t\taddDependent: (detail := FYFotoDetail new)",
	null, "2014-02-26T09:28:32Z", "mp", 2);

jst.FYFotoWindow.addMethod("initialize", "", "initialization", 
	"\t| h w |" +
	"\n\th := Browser window pageHeight - 30." +
	"\n\tw := (h * 1.333) rounded + 235 min: Browser window pageWidth - 60." +
	"\n\tsuper initialize" +
	"\n\t\tcls: 'foto-win';" +
	"\n\t\tclosable: true;" +
	"\n\t\tresizable: false;" +
	"\n\t\twithoutBorder;" +
	"\n\t\tplain: true;" +
	"\n\t\tmodal: true;" +
	"\n\t\theight: h;" +
	"\n\t\twidth: w;" +
	"\n\t\twithBorderLayout;" +
	"\n\t\tadd: (fotka := ExtPanel new region: #center);" +
	"\n\t\tadd: (ExtContainer new " +
	"\n\t\t\tregion: #east; " +
	"\n\t\t\twidth: 235; " +
	"\n\t\t\twithBorderLayout;" +
	"\n\t\t\tadd: (ExtPanel new " +
	"\n\t\t\t\tregion: #center; " +
	"\n\t\t\t\tautoScroll: true; " +
	"\n\t\t\t\tadd: (nahledy := FYFotoNahledy new); " +
	"\n\t\t\t\tyourself); " +
	"\n\t\t\tadd: (toolbar := ExtToolbar new " +
	"\n\t\t\t\tregion: #south; " +
	"\n\t\t\t\theight: 27; " +
	"\n\t\t\t\tbuttonAlign: #center;" +
	"\n\t\t\t\tadd: (ExtButton new " +
	"\n\t\t\t\t\ttext: 'Zavřít fotogalerii'; " +
	"\n\t\t\t\t\ton: #click do: [self close]);" +
	"\n\t\t\t\tyourself);" +
	"\n\t\t\tyourself);" +
	"\n\t\tmoveRelativeTo: (Point " +
	"\n\t\t\tx: (Browser window pageWidth - w / 2) rounded" +
	"\n\t\t\ty: (Browser window pageHeight - h / 2) rounded)." +
	"\n\tnahledy" +
	"\n\t\taddDependent: (detail := FYFotoDetail new)." +
	"\n\teditace := false",
	null, "2014-03-09T20:09:45Z", "mp", 3);

jst.FYFotoWindow.addMethod("initialize", "", "initialization", 
	"\t| h w |" +
	"\n\th := Browser window pageHeight - 30." +
	"\n\tw := (h * 1.333) rounded + 235 min: Browser window pageWidth - 60." +
	"\n\tsuper initialize" +
	"\n\t\tcls: 'foto-win';" +
	"\n\t\tclosable: true;" +
	"\n\t\tresizable: false;" +
	"\n\t\twithoutBorder;" +
	"\n\t\tplain: true;" +
	"\n\t\tmodal: true;" +
	"\n\t\theight: h;" +
	"\n\t\twidth: w;" +
	"\n\t\twithBorderLayout;" +
	"\n\t\tadd: (fotka := ExtPanel new region: #center);" +
	"\n\t\tadd: (ExtContainer new " +
	"\n\t\t\tregion: #east; " +
	"\n\t\t\twidth: 235; " +
	"\n\t\t\twithBorderLayout;" +
	"\n\t\t\tadd: (ExtPanel new " +
	"\n\t\t\t\tregion: #center; " +
	"\n\t\t\t\tautoScroll: true; " +
	"\n\t\t\t\tadd: (nahledy := FYFotoNahledy new); " +
	"\n\t\t\t\tyourself); " +
	"\n\t\t\tadd: (toolbar := ExtToolbar new " +
	"\n\t\t\t\tregion: #south; " +
	"\n\t\t\t\theight: 27; " +
	"\n\t\t\t\tbuttonAlign: #center;" +
	"\n\t\t\t\tadd: (ExtButton new " +
	"\n\t\t\t\t\ttext: 'Zavřít fotogalerii'; " +
	"\n\t\t\t\t\ton: #click do: [self close]);" +
	"\n\t\t\t\tyourself);" +
	"\n\t\t\tyourself);" +
	"\n\t\tmoveRelativeTo: (Point " +
	"\n\t\t\tx: (Browser window pageWidth - w / 2) rounded" +
	"\n\t\t\ty: (Browser window pageHeight - h / 2) rounded)." +
	"\n\tnahledy" +
	"\n\t\taddDependent: (detail := FYFotoDetail new);" +
	"\n\t\taddDependent: self." +
	"\n\teditace := false",
	null, "2014-05-21T15:47:14Z", "mp"); //fytoportal-foto

jst.FYFotoWindow.addMethod("plodina:", "anObject", "accessing", 
	"\tplodina := anObject",
	null, "2014-02-25T14:07:31Z", "mp", 1);

jst.FYFotoWindow.addMethod("plodina:", "anObject", "accessing", 
	"\tplodina := anObject asCollection",
	null, "2014-03-09T17:45:37Z", "mp"); //fytoportal-foto

jst.FYFotoWindow.addMethod("skodlOrg:", "anObject", "accessing", 
	"\tskodlOrg := anObject",
	null, "2014-02-25T14:07:42Z", "mp", 2);

jst.FYFotoWindow.addMethod("skodlOrg:", "anObject", "accessing", 
	"\tskodlOrg := anObject asCollection",
	null, "2014-03-09T17:45:43Z", "mp"); //fytoportal-foto

jst.FYFotoWindow.addMethod("afterrenderEvent", "", "events", 
	"\t^ [ | tit |\t" +
	"\n\t\tcanv := 'foto-orig'." +
	"\n\t\tfotka htmlContents: [:html |" +
	"\n\t\t\thtml canvas " +
	"\n\t\t\t\tid: canv;" +
	"\n\t\t\t\twidth: fotka width; " +
	"\n\t\t\t\theight: fotka height]." +
	"\n\t\tcanv := Document current elementById: canv." +
	"\n\t\ttit := 'Fotogalerie: '." +
	"\n\t\tskodlOrg " +
	"\n\t\t\tifNil: [" +
	"\n\t\t\t\tnahledy update: #plodina with: plodina." +
	"\n\t\t\t\ttit := tit, plodina asString]" +
	"\n\t\t\tifNotNil: [ | key |" +
	"\n\t\t\t\ttit := tit, skodlOrg asString." +
	"\n\t\t\t\tkey := #skodlOrg." +
	"\n\t\t\t\tplodina ifNotNil: [" +
	"\n\t\t\t\t\tnahledy plodina: plodina." +
	"\n\t\t\t\t\ttit := tit, ' - ', plodina asString." +
	"\n\t\t\t\t\tkey := key, 'Plod']." +
	"\n\t\t\t\tnahledy update: key with: skodlOrg]." +
	"\n\t\tself title: tit" +
	"\n\t]",
	null, "2014-02-25T15:15:19Z", "mp", 1);

jst.FYFotoWindow.addMethod("afterrenderEvent", "", "events", 
	"\t^ [ | canv tit |\t" +
	"\n\t\tcanv := 'foto-orig'." +
	"\n\t\tfotka htmlContents: [:html |" +
	"\n\t\t\thtml canvas " +
	"\n\t\t\t\tid: canv;" +
	"\n\t\t\t\twidth: fotka width; " +
	"\n\t\t\t\theight: fotka height]." +
	"\n\t\tdetail canvas: (Document current elementById: canv)." +
	"\n\t\ttit := 'Fotogalerie: '." +
	"\n\t\tskodlOrg " +
	"\n\t\t\tifNil: [" +
	"\n\t\t\t\tnahledy update: #plodina with: plodina." +
	"\n\t\t\t\ttit := tit, plodina asString]" +
	"\n\t\t\tifNotNil: [ | key |" +
	"\n\t\t\t\ttit := tit, skodlOrg asString." +
	"\n\t\t\t\tkey := #skodlOrg." +
	"\n\t\t\t\tplodina ifNotNil: [" +
	"\n\t\t\t\t\tnahledy plodina: plodina." +
	"\n\t\t\t\t\ttit := tit, ' - ', plodina asString." +
	"\n\t\t\t\t\tkey := key, 'Plod']." +
	"\n\t\t\t\tnahledy update: key with: skodlOrg]." +
	"\n\t\tself title: tit" +
	"\n\t]",
	null, "2014-02-26T09:54:40Z", "mp", 2);

jst.FYFotoWindow.addMethod("afterrenderEvent", "", "events", 
	"\t^ [ | canv tit key node |\t" +
	"\n\t\tcanv := 'foto-orig'." +
	"\n\t\tfotka htmlContents: [:html |" +
	"\n\t\t\thtml canvas " +
	"\n\t\t\t\tid: canv;" +
	"\n\t\t\t\twidth: fotka width; " +
	"\n\t\t\t\theight: fotka height]." +
	"\n\t\tdetail canvas: (Document current elementById: canv)." +
	"\n\t\ttit := 'Fotogalerie: '." +
	"\n\t\tskodlOrg " +
	"\n\t\t\tifNil: [" +
	"\n\t\t\t\tkey := #plodina." +
	"\n\t\t\t\tnode := plodina." +
	"\n\t\t\t\ttit := tit, plodina text]" +
	"\n\t\t\tifNotNil: [" +
	"\n\t\t\t\tkey := #skodlOrg." +
	"\n\t\t\t\tnode := skodlOrg." +
	"\n\t\t\t\ttit := tit, skodlOrg text." +
	"\n\t\t\t\tplodina ifNotNil: [" +
	"\n\t\t\t\t\tnahledy plodina: plodina." +
	"\n\t\t\t\t\ttit := tit, ' - ', plodina text." +
	"\n\t\t\t\t\tkey := key, 'Plod']]." +
	"\n\t\tself animateTarget " +
	"\n\t\t\tifNil: [nahledy update: key with: node]" +
	"\n\t\t\tifNotNil: [\"kvuli animaci okna spustim animaci vykresleni fotky se zpozdenim\"" +
	"\n\t\t\t\t[nahledy update: key with: node] delayed: 100]." +
	"\n\t\tself title: tit" +
	"\n\t]",
	null, "2014-02-26T15:43:51Z", "mp", 3);

jst.FYFotoWindow.addMethod("afterrenderEvent", "", "events", 
	"\t^ [ | canv tit key node |\t" +
	"\n\t\tcanv := 'foto-orig'." +
	"\n\t\tfotka htmlContents: [:html |" +
	"\n\t\t\thtml canvas " +
	"\n\t\t\t\tid: canv;" +
	"\n\t\t\t\twidth: fotka width; " +
	"\n\t\t\t\theight: fotka height]." +
	"\n\t\tdetail canvas: (Document current elementById: canv)." +
	"\n\t\ttit := 'Fotogalerie: '." +
	"\n\t\tskodlOrg isEmptyOrNil" +
	"\n\t\t\tifTrue: [" +
	"\n\t\t\t\tkey := #plodina." +
	"\n\t\t\t\tnode := plodina." +
	"\n\t\t\t\ttit := tit, plodina first text]" +
	"\n\t\t\tifFalse: [" +
	"\n\t\t\t\tkey := #skodlOrg." +
	"\n\t\t\t\tnode := skodlOrg." +
	"\n\t\t\t\ttit := tit, (skodlOrg asTextualList: #text separator: ', ')." +
	"\n\t\t\t\t(plodina notNil and: [plodina size = 1]) ifTrue: [" +
	"\n\t\t\t\t\tnahledy plodina: plodina." +
	"\n\t\t\t\t\ttit := tit, ' - ', plodina first text." +
	"\n\t\t\t\t\tkey := key, 'Plod']]." +
	"\n\t\tself animateTarget " +
	"\n\t\t\tifNil: [nahledy update: key with: node]" +
	"\n\t\t\tifNotNil: [\"kvuli animaci okna spustim animaci vykresleni fotky se zpozdenim\"" +
	"\n\t\t\t\t[nahledy update: key with: node] delayed: 100]." +
	"\n\t\tself title: tit." +
	"\n\t\teditace ifTrue: [" +
	"\n\t\t\tnahledy addDependent: self." +
	"\n\t\t\ttoolbar insertAt: 1 button: (vyberBtn := ExtButton new" +
	"\n\t\t\t\ttext: 'Vybrat fotku';" +
	"\n\t\t\t\tbeDisabled;" +
	"\n\t\t\t\ton: #click do: [" +
	"\n\t\t\t\t\tkapitola fotka: vyber." +
	"\n\t\t\t\t\tself broadcastEvent: #zmenaFotkyKapitoly: with: kapitola." +
	"\n\t\t\t\t\tself close])" +
	"\n\t\t]" +
	"\n\t]",
	null, "2014-03-09T21:27:41Z", "mp", 1);

jst.FYFotoWindow.addMethod("afterrenderEvent", "", "events", 
	"\t^ [ | canv tit key node |\t" +
	"\n\t\tcanv := 'foto-orig'." +
	"\n\t\tfotka htmlContents: [:html |" +
	"\n\t\t\thtml canvas " +
	"\n\t\t\t\tid: canv;" +
	"\n\t\t\t\twidth: fotka width; " +
	"\n\t\t\t\theight: fotka height]." +
	"\n\t\tdetail canvas: (Document current elementById: canv)." +
	"\n\t\ttit := 'Fotogalerie: '." +
	"\n\t\tskodlOrg isEmptyOrNil" +
	"\n\t\t\tifTrue: [" +
	"\n\t\t\t\tkey := #plodina." +
	"\n\t\t\t\tnode := plodina." +
	"\n\t\t\t\tkapitola " +
	"\n\t\t\t\t\tifNotNil: [tit := tit, kapitola nazev] " +
	"\n\t\t\t\t\tifNil: [tit := tit, (plodina asTextualList: #text separator: ', ')]]" +
	"\n\t\t\tifFalse: [" +
	"\n\t\t\t\tkey := #skodlOrg." +
	"\n\t\t\t\tnode := skodlOrg." +
	"\n\t\t\t\tkapitola" +
	"\n\t\t\t\t\tifNotNil: [tit := tit, kapitola nazev] " +
	"\n\t\t\t\t\tifNil: [tit := tit, (skodlOrg asTextualList: #text separator: ', ')]." +
	"\n\t\t\t\t(plodina notNil and: [plodina size = 1]) ifTrue: [" +
	"\n\t\t\t\t\tnahledy plodina: plodina." +
	"\n\t\t\t\t\ttit := tit, ' - ', plodina first text." +
	"\n\t\t\t\t\tkey := key, 'Plod']]." +
	"\n\t\tself animateTarget " +
	"\n\t\t\tifNil: [nahledy update: key with: node]" +
	"\n\t\t\tifNotNil: [\"kvuli animaci okna spustim animaci vykresleni fotky se zpozdenim\"" +
	"\n\t\t\t\t[nahledy update: key with: node] delayed: 100]." +
	"\n\t\tself title: tit." +
	"\n\t\teditace ifTrue: [" +
	"\n\t\t\tself perform: #zapniEditaci]" +
	"\n\t]",
	null, "2014-03-10T16:40:02Z", "mp", 2);

jst.FYFotoWindow.addMethod("afterrenderEvent", "", "events", 
	"\t^ [ | canv tit key node |\t" +
	"\n\t\tcanv := 'foto-orig'." +
	"\n\t\tfotka htmlContents: [:html |" +
	"\n\t\t\thtml canvas " +
	"\n\t\t\t\tid: canv;" +
	"\n\t\t\t\twidth: fotka width; " +
	"\n\t\t\t\theight: fotka height]." +
	"\n\t\tdetail canvas: (Document current elementById: canv)." +
	"\n\t\ttit := 'Fotogalerie: '." +
	"\n\t\tskodlOrg isEmptyOrNil ifTrue: [" +
	"\n\t\t\tkey := #plodina." +
	"\n\t\t\tnode := plodina." +
	"\n\t\t\tkapitola " +
	"\n\t\t\t\tifNotNil: [tit := tit, kapitola nazev] " +
	"\n\t\t\t\tifNil: [tit := tit, (plodina asTextualList: #text separator: ', ')]" +
	"\n\t\t] ifFalse: [" +
	"\n\t\t\tkey := #skodlOrg." +
	"\n\t\t\tnode := skodlOrg." +
	"\n\t\t\tkapitola" +
	"\n\t\t\t\tifNotNil: [tit := tit, kapitola nazev] " +
	"\n\t\t\t\tifNil: [tit := tit, (skodlOrg asTextualList: #text separator: ', ')]." +
	"\n\t\t\tself naPlodine ifTrue: [" +
	"\n\t\t\t\ttit := tit, ' - ', plodina first text." +
	"\n\t\t\t\tkey := key, 'Plod']." +
	"\n\t\t\tnahledy plodina: plodina." +
	"\n\t\t]." +
	"\n\t\tself animateTarget " +
	"\n\t\t\tifNil: [nahledy update: key with: node]" +
	"\n\t\t\tifNotNil: [\"kvuli animaci okna spustim animaci vykresleni fotky se zpozdenim\"" +
	"\n\t\t\t\t[nahledy update: key with: node] delayed: 100]." +
	"\n\t\tself title: tit." +
	"\n\t\teditace ifTrue: [" +
	"\n\t\t\tself perform: #zapniEditaci]" +
	"\n\t]",
	null, "2014-03-12T16:53:38Z", "mp", 3);

jst.FYFotoWindow.addMethod("afterrenderEvent", "", "events", 
	"\t^ [ | canv tit key node |\t" +
	"\n\t\tcanv := 'foto-orig'." +
	"\n\t\tfotka htmlContents: [:html |" +
	"\n\t\t\thtml canvas " +
	"\n\t\t\t\tid: canv;" +
	"\n\t\t\t\twidth: fotka width; " +
	"\n\t\t\t\theight: fotka height;" +
	"\n\t\t\t\ton: #click do: self posunFotku]." +
	"\n\t\tdetail canvas: (Document current elementById: canv)." +
	"\n\t\ttit := 'Fotogalerie: '." +
	"\n\t\tskodlOrg isEmptyOrNil ifTrue: [" +
	"\n\t\t\tkey := #plodina." +
	"\n\t\t\tnode := plodina." +
	"\n\t\t\tkapitola " +
	"\n\t\t\t\tifNotNil: [tit := tit, kapitola nazev] " +
	"\n\t\t\t\tifNil: [tit := tit, (plodina asTextualList: #text separator: ', ')]" +
	"\n\t\t] ifFalse: [" +
	"\n\t\t\tkey := #skodlOrg." +
	"\n\t\t\tnode := skodlOrg." +
	"\n\t\t\tkapitola" +
	"\n\t\t\t\tifNotNil: [tit := tit, kapitola nazev] " +
	"\n\t\t\t\tifNil: [tit := tit, (skodlOrg asTextualList: #text separator: ', ')]." +
	"\n\t\t\tself naPlodine ifTrue: [" +
	"\n\t\t\t\ttit := tit, ' - ', plodina first text." +
	"\n\t\t\t\tkey := key, 'Plod']." +
	"\n\t\t\tnahledy plodina: plodina." +
	"\n\t\t]." +
	"\n\t\tself animateTarget " +
	"\n\t\t\tifNil: [nahledy update: key with: node]" +
	"\n\t\t\tifNotNil: [\"kvuli animaci okna spustim animaci vykresleni fotky se zpozdenim\"" +
	"\n\t\t\t\t[nahledy update: key with: node] delayed: 100]." +
	"\n\t\tself title: tit." +
	"\n\t\teditace ifTrue: [" +
	"\n\t\t\tself perform: #zapniEditaci]" +
	"\n\t]",
	null, "2014-04-02T21:13:59Z", "mp", 4);

jst.FYFotoWindow.addMethod("afterrenderEvent", "", "events", 
	"\t^ [ | canv tit key node |\t" +
	"\n\t\tcanv := 'foto-orig'." +
	"\n\t\tfotka htmlContents: [:html |" +
	"\n\t\t\thtml canvas " +
	"\n\t\t\t\tid: canv;" +
	"\n\t\t\t\twidth: fotka width; " +
	"\n\t\t\t\theight: fotka height;" +
	"\n\t\t\t\ton: #click do: self posunFotku]." +
	"\n\t\tdetail canvas: (Document current elementById: canv)." +
	"\n\t\ttit := 'Fotogalerie: '." +
	"\n\t\tskodlOrg isEmptyOrNil ifTrue: [" +
	"\n\t\t\tkey := #plodina." +
	"\n\t\t\tnode := plodina." +
	"\n\t\t\tkapitola " +
	"\n\t\t\t\tifNotNil: [tit := tit, kapitola nazev] " +
	"\n\t\t\t\tifNil: [tit := tit, (plodina asTextualList: #text separator: ', ')]" +
	"\n\t\t] ifFalse: [" +
	"\n\t\t\tkey := #skodlOrg." +
	"\n\t\t\tnode := skodlOrg." +
	"\n\t\t\tkapitola" +
	"\n\t\t\t\tifNotNil: [tit := tit, kapitola nazev] " +
	"\n\t\t\t\tifNil: [tit := tit, (skodlOrg asTextualList: #text separator: ', ')]." +
	"\n\t\t\t(editace not and: [plodina isEmptyOrNil not]) ifTrue: [" +
	"\n\t\t\t\tself naPlodine ifTrue: [" +
	"\n\t\t\t\t\ttit := tit, ' - ', plodina first text]." +
	"\n\t\t\t\tkey := key, 'Plod']." +
	"\n\t\t\tnahledy plodina: plodina." +
	"\n\t\t]." +
	"\n\t\tself animateTarget " +
	"\n\t\t\tifNil: [nahledy update: key with: node]" +
	"\n\t\t\tifNotNil: [\"kvuli animaci okna spustim animaci vykresleni fotky se zpozdenim\"" +
	"\n\t\t\t\t[nahledy update: key with: node] delayed: 100]." +
	"\n\t\tself title: tit." +
	"\n\t\teditace ifTrue: [" +
	"\n\t\t\tself perform: #zapniEditaci]" +
	"\n\t]",
	null, "2014-05-19T20:55:31Z", "mp"); //fytoportal-foto

jst.FYFotoWindow.addMethod("posunFotku", "", "events", 
	"\t^ [:ev | ev layerX > (fotka width / 2) " +
	"\n\t\tifTrue: [nahledy vyberDalsi]" +
	"\n\t\tifFalse: [nahledy vyberPredchozi]]",
	null, "2014-04-02T21:23:39Z", "mp");

jst.FYFotoWindow.addMethod("vyber:", "fotoId", "accessing", 
	"\tnahledy vyber: fotoId",
	null, "2014-02-26T15:15:31Z", "mp");

/*
jst.FYFotoWindow.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tcanv context2D clear." +
	"\n\tanObject ifNotNil: [" +
	"\n\t\tHTMLImageElement new" +
	"\n\t\t\tsrc: (anObject data at: #fotka) original;" +
	"\n\t\t\ton: #load do: [:ev |" +
	"\n\t\t\t\tcanv context2D drawImage: ev target]]",
	null, "2014-02-25T15:15:38Z", "mp", 1);

jst.FYFotoWindow.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanObject ifNotNil: [" +
	"\n\t\tHTMLImageElement new" +
	"\n\t\t\tsrc: (anObject data at: #fotka) original;" +
	"\n\t\t\ton: #load do: [:ev | | img |" +
	"\n\t\t\t\timg := ev target." +
	"\n\t\t\t\tAnimation new" +
	"\n\t\t\t\t\tduration: 500;" +
	"\n\t\t\t\t\tfadeIn: [:alpha | " +
	"\n\t\t\t\t\t\tcanv context2D globalAlpha: alpha." +
	"\n\t\t\t\t\t\talpha = 1 ifTrue: [" +
	"\n\t\t\t\t\t\t\tcanv context2D clear]." +
	"\n\t\t\t\t\t\tcanv context2D drawImage: img]]" +
	"\n\t] ifNil: [" +
	"\n\t\tcanv context2D clear]",
	null, "2014-02-25T22:12:23Z", "mp"); //fytoportal-foto
*/

jst.FYFotoWindow.addMethod("kapitola:", "kap", "accessing", 
	"\tkapitola := kap." +
	"\n\tplodina := kap jePlodina " +
	"\n\t\tifTrue: [kap taxony] " +
	"\n\t\tifFalse: [kap jeMetodikaSO " +
	"\n\t\t\tifFalse: [kap metodika plodiny kapitolyTiskVyber]" +
	"\n\t\t\tifTrue: [ | hostitele |" +
	"\n\t\t\t\t\"k taxonum metodiky nactu vsechny hostitelske plodiny\"" +
	"\n\t\t\t\thostitele := SortedCollection new." +
	"\n\t\t\t\t(Fytoportal data skodlOrg hostitele lookupKeys: kap taxonyId) do: [:row |" +
	"\n\t\t\t\t\trow value do: [:pl | hostitele addUnique: pl]]." +
	"\n\t\t\t\t(Fytoportal data taxony nazvyTaxonu lookupKeys: hostitele) collect: [:row |" +
	"\n\t\t\t\t\tFYPlodina new id: row id; cesky: row value]]]." +
	"\n\tskodlOrg := kap jePlodina ifFalse: [" +
	"\n\t\tkap taxony]." +
	"\n\tkap fotka ifNotNil: [" +
	"\n\t\tnahledy vyber: kap fotka id" +
	"\n\t] ifNil: [kap vychoziFotka ifNotNilDo: [:f |" +
	"\n\t\tnahledy vyber: f id]]",
	null, "2014-03-09T21:31:00Z", "mp", 1);

jst.FYFotoWindow.addMethod("kapitola:", "kap", "accessing", 
	"\tkapitola := kap." +
	"\n\tplodina := kap jePlodina " +
	"\n\t\tifTrue: [kap taxony] " +
	"\n\t\tifFalse: [kap jeMetodikaSO " +
	"\n\t\t\tifFalse: [kap metodika plodiny kapitolyTiskVyber]" +
	"\n\t\t\tifTrue: [ | hostitele |" +
	"\n\t\t\t\t\"k taxonum metodiky nactu vsechny hostitelske plodiny\"" +
	"\n\t\t\t\thostitele := SortedCollection new." +
	"\n\t\t\t\t(Fytoportal data skodlOrg hostitele lookupKeys: kap taxonyId) do: [:row |" +
	"\n\t\t\t\t\trow value do: [:pl | hostitele addUnique: pl]]." +
	"\n\t\t\t\t(Fytoportal data taxony nazvyTaxonu lookupKeys: hostitele) collect: [:row |" +
	"\n\t\t\t\t\tFYPlodina new id: row id; cesky: row value]]]." +
	"\n\tskodlOrg := kap jePlodina ifFalse: [" +
	"\n\t\tkap taxony]." +
	"\n\tkap fotka ifNotNil: [" +
	"\n\t\tnahledy vyber: kap fotka id" +
	"\n\t] ifNil: [kap vychoziFotka ifNotNilDo: [:f |" +
	"\n\t\tnahledy vyber: f id]]",
	null, "2014-03-12T10:41:09Z", "mp"); //fytoportal-foto

jst.FYFotoWindow.addMethod("editace:", "aBoolean", "accessing", 
	"\teditace := aBoolean",
	null, "2014-03-09T20:10:06Z", "mp");

jst.FYFotoWindow.addMethod("tplNahledy", "", "private", 
	"\t^ ExtXTemplate new compiled: true; htmlContents: [:html |" +
	"\n\t\t(html tag: 'tpl') attributeAt: 'for' put: '.'; with: [" +
	"\n\t\t\thtml div class: 'thumb-wrap'; with: [" +
	"\n\t\t\t\thtml div class: 'thumb'; with: [" +
	"\n\t\t\t\t\thtml img height: '150'; width: '{format * 150}'; src: '{preview}'; title: '{popis}']." +
	"\n\t\t\t\thtml span: '{kratkyPopis}'." +
	"\n\t\t\t\tskodlOrg asCollection size > 1 ifTrue: [" +
	"\n\t\t\t\t\thtml span: '{skodlOrg}']." +
	"\n\t\t\t\tplodina asCollection size > 1 | self naPlodine not ifTrue: [" +
	"\n\t\t\t\t\thtml span: '{plodina}']." +
	"\n\t\t\t\thtml span: 'Autor: {autor}'" +
	"\n\t\t\t]" +
	"\n\t\t]" +
	"\n\t]",
	null, "2014-03-12T11:47:40Z", "mp", 1);

jst.FYFotoWindow.addMethod("tplNahledy", "", "private", 
	"\t^ ExtXTemplate new compiled: true; htmlContents: [:html |" +
	"\n\t\t(html tag: 'tpl') attributeAt: 'for' put: '.'; with: [" +
	"\n\t\t\thtml div class: 'thumb-wrap'; with: [" +
	"\n\t\t\t\thtml div class: 'thumb'; with: [" +
	"\n\t\t\t\t\thtml img height: '150'; width: '{format * 150}'; src: '{preview}'; title: '{popis}']." +
	"\n\t\t\t\thtml span: '{kratkyPopis}'." +
	"\n\t\t\t\tskodlOrg asCollection size > 1 ifTrue: [" +
	"\n\t\t\t\t\thtml span: '{skodlOrg}']." +
	"\n\t\t\t\tself naPlodine ifFalse: [" +
	"\n\t\t\t\t\thtml span: '{plodina}']." +
	"\n\t\t\t\thtml span: 'Autor: {autor}'" +
	"\n\t\t\t]" +
	"\n\t\t]" +
	"\n\t]",
	null, "2014-05-19T13:42:23Z", "mp"); //fytoportal-foto

jst.FYFotoWindow.addMethod("show", "", "rendering", 
	"\t\"nastavim vlastni sablonu, zobrazi i nazev SO/plodiny podle potreby\"" +
	"\n\tnahledy tpl: self tplNahledy." +
	"\n\tsuper show",
	null, "2014-03-12T11:32:45Z", "mp");

jst.FYFotoWindow.addMethod("naPlodine", "", "private", 
	"\t\"plodina se navic musi shodovat s plodinou fotky\"" +
	"\n\t^ plodina notNil and: [plodina size = 1] and: [kapitola fotka notNil] and: [plodina first id = kapitola fotka plodina]",
	null, "2014-03-12T11:47:03Z", "mp", 1);

jst.FYFotoWindow.addMethod("naPlodine", "", "private", 
	"\t\"plodina se navic musi shodovat s plodinou fotky\"" +
	"\n\t^ plodina notNil and: [plodina size = 1] and: [" +
	"\n\t\tkapitola isNil or: [kapitola fotka notNil and: [plodina first id = kapitola fotka plodina]]]",
	null, "2014-04-02T15:02:41Z", "mp", 2);

jst.FYFotoWindow.addMethod("naPlodine", "", "private", 
	"\t^ plodina size = 1 and: [kapitola isNil or: [kapitola fotka notNil and: [kapitola fotka plodina = plodina first id]]]",
	null, "2014-05-19T13:42:05Z", "mp"); //fytoportal-foto

// update:with: se ted vola i pri prohlizeni kvuli osetreni Esc, musi byt tedy tady
jst.FYFotoWindow.addMethod("update:with:", "anAspect anObject", "*srs-fytoportal-ior-edit", 
	"\tvyber := anObject ifNotNil: [" +
	"\n\t\tanObject data at: #fotka]." +
	"\n\tvyberBtn isEnabled: vyber notNil",
	null, "2014-03-09T21:01:55Z", "mp", 1);

jst.FYFotoWindow.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #foto ifTrue: [" +
	"\n\t\t\"aby fungoval Esc\"" +
	"\n\t\t^ self focus]." +
	"\n\tvyber := anObject ifNotNil: [" +
	"\n\t\tanObject data at: #fotka]." +
	"\n\tvyberBtn ifNotNil: [" +
	"\n\t\tvyberBtn isEnabled: vyber notNil]",
	null, "2014-05-21T20:07:46Z", "mp", 1);

jst.FYFotoWindow.addMethod("update:with:", "anAspect anObject", "updating", 
	"\t\"aby fungoval Esc\"" +
	"\n\tself focus." +
	"\n\teditace ifTrue: [" +
	"\n\t\tvyber := anObject ifNotNil: [" +
	"\n\t\t\tanObject data at: #fotka]." +
	"\n\t\tvyberBtn isEnabled: vyber notNil]",
	null, "2014-05-22T08:04:28Z", "mp"); //fytoportal-foto

// *** FYTiskTaxonu ***

jst.FYTiskTaxonu.addMethod("initialize", "", "initialization", 
	"\tnahled := false",
	null, "2014-03-10T19:58:08Z", "mp", 1);

jst.FYTiskTaxonu.addMethod("initialize", "", "initialization", 
	"\tnahled := false." +
	"\n\tupravLatinu := RegExp new" +
	"\n\t\tpattern: '\\\\(|\\\\)|teleom.|anam.|var.|sp.|ssp.|f.';" +
	"\n\t\tglobal: true;" +
	"\n\t\tignoreCase: true;" +
	"\n\t\treplaceWith: [:str | '<span class=\"nolat\">', str, '</span>']",
	null, "2014-04-12T21:15:17Z", "mp", 1);

jst.FYTiskTaxonu.addMethod("initialize", "", "initialization", 
	"\tnahled := false." +
	"\n\tupravLatinu := RegExp new" +
	"\n\t\tsearchPattern: {'('. ')'. 'anam.'. 'cv.'. 'f.'. 'ff.'. 'pv.'. 'sp.'. 'spp.'. 'ssp.'. 'subsp.'. 'teleom.'. 'var.'};" +
	"\n\t\tglobal: true;" +
	"\n\t\tignoreCase: true;" +
	"\n\t\treplaceWith: [:str | '<span class=\"nolat\">', str, '</span>']",
	null, "2014-04-14T12:17:50Z", "mp"); //fytoportal-foto

jst.FYTiskTaxonu.addMethod("taxon:", "anObject", "accessing", 
	"\ttaxon := anObject",
	null, "2014-03-10T22:33:48Z", "mp");

jst.FYTiskTaxonu.addMethod("ref", "", "private", 
	"\t^ nil",
	null, "2014-03-10T22:35:04Z", "mp");

jst.FYTiskTaxonu.addMethod("renderZarazeniOn:", "html", "rendering", 
	"\t| klasif |" +
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
	"\n\t]]",
	null, "2014-03-10T19:47:07Z", "mp");

jst.FYTiskTaxonu.addMethod("renderLatinskyOn:", "html", "rendering", 
	"\ttaxon latinsky ifNotNilDo: [:str |" +
	"\n\t\thtml span class: 'latinsky'; with: [nahled" +
	"\n\t\t\tifFalse: [html text: str]" +
	"\n\t\t\tifTrue: [html text: (str truncateWithElipsisTo: 200)]]." +
	"\n\t\thtml br]",
	null, "2014-03-10T20:01:06Z", "mp", 1);

jst.FYTiskTaxonu.addMethod("renderLatinskyOn:", "html", "rendering", 
	"\ttaxon latinsky ifNotNilDo: [:str |" +
	"\n\t\thtml div class: 'latinsky'; with: [nahled" +
	"\n\t\t\tifFalse: [html text: str]" +
	"\n\t\t\tifTrue: [html text: (str truncateWithElipsisTo: 200)]]]",
	null, "2014-03-17T15:35:39Z", "mp", 2);

jst.FYTiskTaxonu.addMethod("renderLatinskyOn:", "html", "rendering", 
	"\ttaxon latinsky ifNotNilDo: [:str |" +
	"\n\t\thtml div class: 'latinsky'; with: [" +
	"\n\t\t\thtml html: (upravLatinu value: (nahled" +
	"\n\t\t\t\tifFalse: [str]" +
	"\n\t\t\t\tifTrue: [str truncateWithElipsisTo: 200]))]]",
	null, "2014-04-12T20:47:28Z", "mp"); //fytoportal-foto

jst.FYTiskTaxonu.addMethod("renderCeskyOn:", "html", "rendering", 
	"\ttaxon cesky ifNotNilDo: [:str |" +
	"\n\t\thtml span class: 'cesky'; with: [nahled & taxon jePlodina not" +
	"\n\t\t\tifTrue: [html anchor " +
	"\n\t\t\t\thref: self ref asString; " +
	"\n\t\t\t\twith: (str truncateWithElipsisTo: 200)]" +
	"\n\t\t\tifFalse: [html text: str]]." +
	"\n\t\thtml br]",
	null, "2014-03-10T20:22:18Z", "mp", 1);

jst.FYTiskTaxonu.addMethod("renderCeskyOn:", "html", "rendering", 
	"\ttaxon cesky ifNotNilDo: [:str |" +
	"\n\t\thtml div class: 'cesky'; with: [nahled & taxon jePlodina not" +
	"\n\t\t\tifTrue: [html anchor " +
	"\n\t\t\t\thref: self ref asString; " +
	"\n\t\t\t\twith: (str truncateWithElipsisTo: 200)]" +
	"\n\t\t\tifFalse: [html text: str]]]",
	null, "2014-03-17T15:37:51Z", "mp"); //fytoportal-foto

jst.FYTiskTaxonu.addMethod("renderOn:", "html", "rendering", 
	"\thtml div class: 'taxon-nazev'; with: [" +
	"\n\t\tself renderCeskyOn: html." +
	"\n\t\tself renderLatinskyOn: html]." +
	"\n\tself renderZarazeniOn: html." +
	"\n\ttaxon dalsiNazvy isEmpty ifFalse: [html p: [\t" +
	"\n\t\thtml strong: 'další názvy: '; text: taxon dalsiNazvy asCSVString]]." +
	"\n\t(nahled or: [taxon synonyma isEmpty]) ifFalse: [html p: [" +
	"\n\t\thtml strong: 'vědecká synonyma: '." +
	"\n\t\thtml span class: 'latinsky'; with: taxon synonyma asCSVString]]." +
	"\n\t(nahled or: [taxon kody isEmpty]) ifFalse: [html p: [" +
	"\n\t\thtml strong: 'EPPO kódy: '; text: taxon kody asCSVString]]",
	null, "2014-03-10T22:09:13Z", "mp", 1);

jst.FYTiskTaxonu.addMethod("renderOn:", "html", "rendering", 
	"\thtml div class: 'taxon-nazev'; with: [" +
	"\n\t\tself renderCeskyOn: html." +
	"\n\t\tself renderLatinskyOn: html]." +
	"\n\tself renderZarazeniOn: html." +
	"\n\ttaxon dalsiNazvy isEmptyOrNil ifFalse: [html p: [\t" +
	"\n\t\thtml strong: 'další názvy: '; text: taxon dalsiNazvy asCSVString]]." +
	"\n\t(nahled or: [taxon synonyma isEmptyOrNil]) ifFalse: [html p: [" +
	"\n\t\thtml strong: 'vědecká synonyma: '." +
	"\n\t\thtml span class: 'latinsky'; with: taxon synonyma asCSVString]]." +
	"\n\t(nahled or: [taxon kody isEmptyOrNil]) ifFalse: [html p: [" +
	"\n\t\thtml strong: 'EPPO kódy: '; text: taxon kody asCSVString]]",
	null, "2014-03-16T22:34:01Z", "mp", 2);

jst.FYTiskTaxonu.addMethod("renderOn:", "html", "rendering", 
	"\thtml div class: 'taxon-nazev'; with: [" +
	"\n\t\tself renderCeskyOn: html." +
	"\n\t\tself renderLatinskyOn: html]." +
	"\n\tself renderZarazeniOn: html." +
	"\n\ttaxon dalsiNazvy isEmptyOrNil ifFalse: [html p: [\t" +
	"\n\t\thtml strong: 'další názvy: '; text: taxon dalsiNazvy asCSVString]]." +
	"\n\t(nahled or: [taxon synonyma isEmptyOrNil]) ifFalse: [html p: [" +
	"\n\t\thtml strong: 'vědecká synonyma: '." +
	"\n\t\thtml span class: 'latinsky'; with: [" +
	"\n\t\t\thtml html: (upravLatinu value: taxon synonyma asCSVString)]]]." +
	"\n\t(nahled or: [taxon kody isEmptyOrNil]) ifFalse: [html p: [" +
	"\n\t\thtml strong: 'EPPO kódy: '; text: taxon kody asCSVString]]",
	null, "2014-04-12T20:43:53Z", "mp"); //fytoportal-foto

// *** FYHledejPanel ***

jst.FYHledejPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize " +
	"\n\t\tcls: 'x-panel-mc';" +
	"\n\t\tstyle: 'padding-top: 1px';" +
	"\n\t\theight: 30; " +
	"\n\t\tlayout: (ExtHBoxLayout new withStretchAlign; padding: 3); " +
	"\n\t\tborder: false;" +
	"\n\t\tadd: (ExtButton new text: 'Hledej'; flex: 1; margins: '0 3 0 0'; " +
	"\n\t\t\ton: #click do: [:btn :ev | " +
	"\n\t\t\t\tself hledej]);" +
	"\n\t\tadd: (searchField := ExtFormField new flex: 4)." +
	"\n\tsearchField on: #specialkey do: [:field :ev | " +
	"\n\t\tev enterPressed ifTrue: [self hledej]]",
	null, "2014-03-21T22:11:55Z", "mp");

jst.FYHledejPanel.addMethod("hledej", "", "private", 
	"\tpath trackHistory: [:p | " +
	"\n\t\tp enter: searchField value]",
	null, "2014-03-21T22:11:04Z", "mp", 1);

jst.FYHledejPanel.addMethod("hledej", "", "private", 
	"\tsearchField value size < 2 ifTrue: [" +
	"\n\t\tself inform: 'Zadejte alespoň dva znaky, na velikosti nezáleží.'" +
	"\n\t] ifFalse: [" +
	"\n\t\tpath trackHistory: [:p | " +
	"\n\t\t\tp enter: searchField value]]",
	null, "2014-03-26T10:16:31Z", "mp"); //fytoportal-foto

jst.FYHledejPanel.addMethod("searchPath:", "aPath", "accessing", 
	"\tpath := aPath component: searchField",
	null, "2014-03-21T22:12:57Z", "mp");

jst.FYHledejPanel.addMethod("value:", "aString", "accessing", 
	"\tsearchField value: aString",
	null, "2014-03-21T22:38:17Z", "mp");
