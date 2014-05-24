/*
 * Copyright (c) 2012 Michal Perutka <michal.perutka@gmail.com>
 *
 *
 * Depends on jst-fytoportal-core, jst-fytoportal-foto, jst-fytoportal-ior 
 */

jst.currentJsFile = "fytoportal";

// *** CLASSES ***

//Fytoportal class is defined in jst-fytoportal-core.js

jst.Fytoportal.subclass("FYDesktop", "top bottom right left center", "", "", "SRS-Fytoportal");

jst.Object.subclass("FYAppNavigator", "path fotogalerie ior title", "", "", "SRS-Fytoportal");

jst.Object.subclass("FytoportalData", "db eppt por state cache taxony plodiny odrudy skodlOrg fotky metodiky userInfo pouzitiPOR pripravky epptKody ulozVyber", "", "", "SRS-Fytoportal");

jst.ExtContainer.subclass("FYUserInfoPanel", "user login logout", "", "", "SRS-Fytoportal");

// *** FYAppNavigator ***

jst.FYAppNavigator.addMethod("initialize", "", "initialization", 
	"\tpath := AppPathStart new" +
	"\n\t\tonStopChange: [:path | " +
	"\n\t\t\t(Document current elementById: 'path-info')" +
	"\n\t\t\t\tempty; htmlContents: [:html | html text: path printPath]];" +
	"\n\t\taddExit: (fotogalerie := FYFotogalerieNavig new);" +
	"\n\t\taddExit: (ior := FYIORNavig new)",
	null, "2013-01-17T08:11:37Z", "mp", 1);
/*
jst.FYAppNavigator.addMethod("initialize", "", "initialization", 
	"\tpath := AppPathStart new" +
	"\n\t\tonStopChange: [:path | " +
	"\n\t\t\t(Document current elementById: 'path-info')" +
	"\n\t\t\t\tempty; htmlContents: [:html | html text: path printPath]];" +
	"\n\t\tonStopEnter: [:path :obj :changed | changed ifTrue: [" +
	"\n\t\t\tDocument current title: path printPath." +
	"\n\t\t\tExtHistory current addToken: path componentId asString, ':', obj id]];" +
	"\n\t\taddExit: (fotogalerie := FYFotogalerieNavig new);" +
	"\n\t\taddExit: (ior := FYIORNavig new)",
	null, "2013-08-08T09:50:25Z", "mp"); //fytoportal
*/
jst.FYAppNavigator.addMethod("initialize", "", "initialization", 
	"\tpath := AppPathStart new" +
	"\n\t\tonStopChange: [:path |" +
	"\n\t\t\tpath historyToken ifNotNilDo: [:str |" +
	"\n\t\t\t\tExtHistory current addToken: str]." +
	"\n\t\t\tDocument current title: path printPath." +
	"\n\t\t\t(Document current elementById: 'path-info')" +
	"\n\t\t\t\tempty; htmlContents: [:html | html text: Document current title]." +
	"\n\t\t];" +
	"\n\t\taddExit: (fotogalerie := FYFotogalerieNavig new);" +
	"\n\t\taddExit: (ior := FYIORNavig new)",
	null, "2013-08-08T12:19:03Z", "mp", 1);

jst.FYAppNavigator.addMethod("initialize", "", "initialization", 
	"\tpath := AppPathStart new" +
	"\n\t\tonStopChange: [:path |" +
	"\n\t\t\tpath activePathToken ifNotEmptyDo: [:str |" +
	"\n\t\t\t\tExtHistory current addToken: str]." +
	"\n\t\t\tDocument current title: path printPath." +
	"\n\t\t\t(Document current elementById: 'path-info')" +
	"\n\t\t\t\tempty; htmlContents: [:html | html text: Document current title]." +
	"\n\t\t];" +
	"\n\t\taddExit: (fotogalerie := FYFotogalerieNavig new);" +
	"\n\t\taddExit: (ior := FYIORNavig new)",
	null, "2013-08-09T13:42:26Z", "mp", 1);

jst.FYAppNavigator.addMethod("initialize", "", "initialization", 
	"\tpath := AppPathStart new" +
	"\n\t\tonStopChange: [:path |" +
	"\n\t\t\tDocument current title: path printPath." +
	"\n\t\t\t(Document current elementById: 'path-info')" +
	"\n\t\t\t\tempty; htmlContents: [:html | html text: Document current title]." +
	"\n\t\t];" +
	"\n\t\taddExit: (fotogalerie := FYFotogalerieNavig new);" +
	"\n\t\taddExit: (ior := FYIORNavig new)",
	null, "2013-08-09T18:02:04Z", "mp", 1);

jst.FYAppNavigator.addMethod("initialize", "", "initialization", 
	"\ttitle := 'Rostlinolékařský portál'." +
	"\n\tpath := AppPathStart new" +
	"\n\t\tonStopChange: [:path | | p |" +
	"\n\t\t\tp := path printActivePath." +
	"\n\t\t\tDocument current title: p, ' - ', title." +
	"\n\t\t\t(Document current elementById: 'path-info')" +
	"\n\t\t\t\tempty; htmlContents: [:html | html text: p]." +
	"\n\t\t];" +
	"\n\t\taddExit: (fotogalerie := FYFotogalerieNavig new);" +
	"\n\t\taddExit: (ior := FYIORNavig new)",
	null, "2013-08-09T19:09:48Z", "mp", 1);

jst.FYAppNavigator.addMethod("initialize", "", "initialization", 
	"\ttitle := 'Rostlinolékařský portál'." +
	"\n\tpath := AppPathStart new" +
	"\n\t\tonStopChange: [:path | | p |" +
	"\n\t\t\tp := path printActivePath." +
	"\n\t\t\tDocument current title: p, ' - ', title." +
	"\n\t\t\t(Document current elementById: 'path-info')" +
	"\n\t\t\t\tempty; htmlContents: [:html | html text: p]." +
	"\n\t\t];" +
	"\n\t\taddExit: (fotogalerie := FYFotogalerieNavig new);" +
	"\n\t\taddExit: (ior := FYIORNavig new)." +
	"\n\tExtHistory current onChange: [:token |" +
	"\n\t\tpath forcePath: token]",
	null, "2013-08-15T20:32:53Z", "mp", 1);
/*
jst.FYAppNavigator.addMethod("initialize", "", "initialization", 
	"\ttitle := 'Rostlinolékařský portál'." +
	"\n\tpath := AppPathStart new" +
	"\n\t\tonStopChange: [:path | | p |" +
	"\n\t\t\tp := path printActivePath." +
	"\n\t\t\tDocument current title: p, ' - ', title." +
	"\n\t\t\t(Document current elementById: 'path-info')" +
	"\n\t\t\t\tempty; htmlContents: [:html | html text: p]." +
	"\n\t\t];" +
	"\n\t\taddExit: (fotogalerie := FYFotogalerieNavig new);" +
	"\n\t\taddExit: (ior := FYIORNavig new)." +
	"\n\tExtHistory current onChange: [:token |" +
	"\n\t\tpath forcePath: token]." +
	"\n\tior onForceStop: [:p | p toggle]." +
	"\n\tfotogalerie onForceStop: [:p | p toggle].",
	null, "2013-08-17T13:52:01Z", "mp"); //fytoportal
*/

jst.FYAppNavigator.addMethod("initialize", "", "initialization", 
	"\ttitle := 'Rostlinolékařský portál'." +
	"\n\tpath := AppPathStart new" +
	"\n\t\tonStopChange: [ | p |" +
	"\n\t\t\tp := path printActivePath." +
	"\n\t\t\tDocument current title: p, ' | ', title." +
	"\n\t\t\t(Document current elementById: 'path-info')" +
	"\n\t\t\t\tempty; htmlContents: [:html | html text: p]." +
	"\n\t\t];" +
	"\n\t\taddExit: (fotogalerie := FYFotogalerieNavig new);" +
	"\n\t\taddExit: (ior := FYIORNavig new)." +
	"\n\tExtHistory current onChange: [:token | token isEmptyOrNil" + //Console log: 'changed: ', token asString. 
	"\n\t\tifFalse: [path forcePath: token]" +
	"\n\t\tifTrue: [path forcePath: Fytoportal navigator ior id asString]]",
	null, "2013-08-28T08:27:24Z", "mp", 1);

jst.FYAppNavigator.addMethod("initialize", "", "initialization", 
	"\ttitle := 'Rostlinolékařský portál'." +
	"\n\tpath := AppPathStart new" +
	"\n\t\tonStopChange: [ | p |" +
	"\n\t\t\tp := path printActivePath." +
	"\n\t\t\tHTMLDocument current title: p, ' | ', title." +
	"\n\t\t\t(HTMLDocument current elementById: 'path-info')" +
	"\n\t\t\t\tempty; htmlContents: [:html | html text: p]." +
	"\n\t\t];" +
	"\n\t\taddExit: (fotogalerie := FYFotogalerieNavig new);" +
	"\n\t\taddExit: (ior := FYIORNavig new)." +
	"\n\tExtHistory current onChange: [:token | token isEmptyOrNil" +
	"\n\t\tifFalse: [path forcePath: token]" +
	"\n\t\tifTrue: [path forcePath: Fytoportal navigator ior id asString]]",
	null, "2014-01-02T22:43:52Z", "mp"); //fytoportal

jst.FYAppNavigator.addMethod("path", "", "accessing", 
	"\t^ path",
	null, "2012-06-23T08:50:25Z", "mp");

jst.FYAppNavigator.addMethod("reset", "", "initialization", 
	"\tpath reset",
	null, "2012-06-26T11:28:33Z", "mp");

jst.FYAppNavigator.addMethod("fotogalerie", "", "accessing", 
	"\t^ fotogalerie",
	null, "2013-01-17T08:11:53Z", "mp");

jst.FYAppNavigator.addMethod("ior", "", "accessing", 
	"\t^ ior",
	null, "2013-01-17T08:12:05Z", "mp");

/*
jst.FYAppNavigator.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tpath := AppPathStart new" +
	"\n\t\tonStopChange: [:path | " +
	"\n\t\t\t(Document current elementById: 'path-info')" +
	"\n\t\t\t\tempty; htmlContents: [:html | html text: path printPath]];" +
	"\n\t\taddExit: self fotogalerie;" +
	"\n\t\taddExit: self ior",
	null, "2012-06-25T08:55:48Z", "mp");

jst.FYAppNavigator.addMethod("fotogalerie", "", "fotogalerie", 
	"\t^ nodes at: 'fotogalerie' ifAbsentPut: [" +
	"\n\t\tAppCrossroad new label: 'Fotogalerie';" +
	"\n\t\t\taddExit: self plodinySkupina;" +
	"\n\t\t\taddExit: self ostatniSO;" +
	"\n\t\t\taddExit: self hledej;" +
	"\n\t\t\tonEnter: [Fytoportal current aktivujFotogalerii]]", 
	null, "2012-10-03T08:51:42Z", "mp");

jst.FYAppNavigator.addMethod("plodinySkupina", "", "fotogalerie", 
	"\t^ nodes at: 'plodinySkupina' ifAbsentPut: [" +
	"\n\t\tAppPath new addExit: self plodinyPlodina]",
	null, "2012-06-23T08:49:19Z", "mp");

jst.FYAppNavigator.addMethod("plodinyPlodina", "", "fotogalerie", 
	"\t^ nodes at: 'plodinyPlodina' ifAbsentPut: [" +
	"\n\t\tAppCrossroad new addExit: self skodlOrgNaPlodine]",
	null, "2012-06-26T06:39:20Z", "mp");

jst.FYAppNavigator.addMethod("skodlOrgNaPlodine", "", "fotogalerie", 
	"\t^ nodes at: 'skodlOrgNaPlodine' ifAbsentPut: [" +
	"\n\t\tAppCrossroad new]",
	null, "2012-06-26T06:38:46Z", "mp");

jst.FYAppNavigator.addMethod("hledej", "", "fotogalerie", 
	"\t^ nodes at: 'hledej' ifAbsentPut: [" +
	"\n\t\tAppCrossroad new" +
	"\n\t\t\taddExit: self hledejPlodina;" +
	"\n\t\t\taddExit: self hledejSO]",
	null, "2012-06-23T21:03:36Z", "mp");

jst.FYAppNavigator.addMethod("hledejPlodina", "", "fotogalerie", 
	"\t^ nodes at: 'hledejPlodina' ifAbsentPut: [" +
	"\n\t\tAppCrossroad new addExit: self skodlOrgNaPlodine]",
	null, "2012-06-26T06:40:45Z", "mp");

jst.FYAppNavigator.addMethod("hledejSO", "", "fotogalerie", 
	"\t^ nodes at: 'hledejSO' ifAbsentPut: [" +
	"\n\t\tAppCrossroad new]",
	null, "2012-06-23T21:01:30Z", "mp");

jst.FYAppNavigator.addMethod("ostatniSO", "", "fotogalerie", 
	"\t^ nodes at: 'ostatniSO' ifAbsentPut: [" +
	"\n\t\tAppCrossroad new]",
	null, "2012-06-23T20:59:27Z", "mp");

jst.FYAppNavigator.addMethod("hostitelSO", "", "fotogalerie", 
	"\t| id |" +
	"\n\t\"id plodiny muze obsahovat prefix, ktery musim odstranit\"" +
	"\n\tid := Fytoportal navigator skodlOrgNaPlodine activeEntry value." +
	"\n\tid fourth = '-' ifTrue: [" +
	"\n\t\tid := id allButFirst: 4]." +
	"\n\t^ id",
	null, "2012-08-03T15:25:40Z", "mp");

jst.FYAppNavigator.addMethod("ior", "", "IOR", 
	"\t^ nodes at: 'ior' ifAbsentPut: [" +
	"\n\t\tAppCrossroad new label: 'IOR';" +
	"\n\t\t\taddExit: self metodika;" +
	"\n\t\t\taddExit: self editaceIOR;" +
	"\n\t\t\tonEnter: [Fytoportal current aktivujIOR]]",
	null, "2013-01-16T08:31:30Z", "mp");

jst.FYAppNavigator.addMethod("metodika", "", "IOR", 
	"\t^ nodes at: 'metodika' ifAbsentPut: [" +
	"\n\t\tAppCrossroad new addExit: self hlavniKapitolaPM]",
	null, "2012-11-08T08:37:59Z", "mp");

jst.FYAppNavigator.addMethod("hlavniKapitolaPM", "", "IOR", 
	"\t^ nodes at: 'hlavniKapitolaPM' ifAbsentPut: [" +
	"\n\t\tAppCrossroad new addExit: self kapitolaPM]",
	null, "2012-11-08T08:38:29Z", "mp");

jst.FYAppNavigator.addMethod("kapitolaPM", "", "IOR", 
	"\t^ nodes at: 'kapitolaPM' ifAbsentPut: [" +
	"\n\t\tAppCrossroad new]",
	null, "2012-11-08T08:39:17Z", "mp");

jst.FYAppNavigator.addMethod("editaceIOR", "", "IOR", 
	"\t^ nodes at: 'editaceIOR' ifAbsentPut: [" +
	"\n\t\tAppCrossroad new]",
	null, "2013-01-16T08:32:29Z", "mp");
*/

//*** FytoportalData ***

jst.FytoportalData.addMethod("initialize", "", "initialization", 
	"\tdb := ((Browser window location pathname startsWith: '/db/')" +
	"\n\t\tifTrue: [CouchDB current]" +
	"\n\t\tifFalse: [CouchDB new url: (JsonUrl new addToPath: 'db')]) databaseNamed: 'fytoportal'." +
	"\n\teppt := db server databaseNamed: 'eppt'." +
	"\n\tpor := db server databaseNamed: 'por'." +
	"\n\tstate := ApplicationState new " +
	"\n\t\tprefix: 'fyto';" +
	"\n\t\tat: #navigator put: FYAppNavigator new;" +
	"\n\t\tat: #vyberKapitolPM put: Dictionary new;" +
	"\n\t\tyourself." +
	"\n\tcache := Dictionary new." +
	"\n\ttaxony := FYDataTaxony new db: db; domain: 'taxony'." +
	"\n\tplodiny := FYDataPlodiny new db: db; domain: 'plodiny'." +
	"\n\tskodlOrg := FYDataSkodlOrg new db: db; domain: 'skodlorg'." +
	"\n\tfotky := FYDataFotky new db: db; domain: 'fotky'." +
	"\n\tmetodiky := FYDataMetodiky new db: db; domain: 'metodiky'." +
	"\n\tpouzitiPOR := FYDataPouzitiPOR new db: por; domain: 'pouziti'." +
	"\n\tpripravky := FYDataPOR new db: por; domain: 'pripravky'." +
	"\n\tepptKody := FYDataEPPTKody new db: eppt; domain: 'kody'",
	null, "2013-04-17T19:16:19Z", "mp", 1);

jst.FytoportalData.addMethod("initialize", "", "initialization", 
	"\t| srv |" +
	"\n\tsrv := (Browser window location pathname startsWith: '/db/')" +
	"\n\t\tifTrue: [CouchDB current]" +
	"\n\t\tifFalse: [CouchDB new url: (JsonUrl new addToPath: 'db')]." +
	"\n\t(Browser window location pathname includesSubString: 'test')" +
	"\n\t\tifFalse: [db := srv databaseNamed: 'fytoportal']" +
	"\n\t\tifTrue: [db := srv databaseNamed: 'fytoportal-test']." +
	"\n\teppt := db server databaseNamed: 'eppt'." +
	"\n\tpor := db server databaseNamed: 'por'." +
	"\n\tstate := ApplicationState new " +
	"\n\t\tprefix: 'fyto';" +
	"\n\t\tat: #navigator put: FYAppNavigator new;" +
	"\n\t\tat: #vyberKapitolPM put: Dictionary new;" +
	"\n\t\tyourself." +
	"\n\tcache := Dictionary new." +
	"\n\ttaxony := FYDataTaxony new db: db; domain: 'taxony'." +
	"\n\tplodiny := FYDataPlodiny new db: db; domain: 'plodiny'." +
	"\n\tskodlOrg := FYDataSkodlOrg new db: db; domain: 'skodlorg'." +
	"\n\tfotky := FYDataFotky new db: db; domain: 'fotky'." +
	"\n\tmetodiky := FYDataMetodiky new db: db; domain: 'metodiky'." +
	"\n\tpouzitiPOR := FYDataPouzitiPOR new db: por; domain: 'pouziti'." +
	"\n\tpripravky := FYDataPOR new db: por; domain: 'pripravky'." +
	"\n\tepptKody := FYDataEPPTKody new db: eppt; domain: 'kody'",
	null, "2013-07-09T12:50:12Z", "mp", 1);

jst.FytoportalData.addMethod("initialize", "", "initialization", 
	"\t| srv |" +
	"\n\tsrv := (Browser window location pathname startsWith: '/db/')" +
	"\n\t\tifTrue: [CouchDB current]" +
	"\n\t\tifFalse: [CouchDB new url: (JsonUrl new addToPath: 'db')]." +
	"\n\t(Browser window location pathname includesSubString: 'test')" +
	"\n\t\tifFalse: [db := srv databaseNamed: 'fytoportal']" +
	"\n\t\tifTrue: [db := srv databaseNamed: 'fytoportal-test']." +
	"\n\teppt := db server databaseNamed: 'eppt'." +
	"\n\tpor := db server databaseNamed: 'por'." +
	"\n\tstate := ApplicationState new " +
	"\n\t\tprefix: 'fyto';" +
	"\n\t\tat: #navigator put: FYAppNavigator new;" +
	"\n\t\tat: #vyberKapitolPM put: ((WebStorage session at: #'fyto-vyberKapitol' ifPresent: [:v | " +
	"\n\t\t\tJSON default decode: v]) ifNil: [Dictionary new]);" +
	"\n\t\tyourself." +
	"\n\tulozVyber := DelayedTask new delay: 1000; task: [" +
	"\n\t\tWebStorage session at: #'fyto-vyberKapitol' put: (JSON default encode: self vyberKapitolPM)]." +
	"\n\tcache := Dictionary new." +
	"\n\ttaxony := FYDataTaxony new db: db; domain: 'taxony'." +
	"\n\tplodiny := FYDataPlodiny new db: db; domain: 'plodiny'." +
	"\n\tskodlOrg := FYDataSkodlOrg new db: db; domain: 'skodlorg'." +
	"\n\tfotky := FYDataFotky new db: db; domain: 'fotky'." +
	"\n\tmetodiky := FYDataMetodiky new db: db; domain: 'metodiky'." +
	"\n\tpouzitiPOR := FYDataPouzitiPOR new db: por; domain: 'pouziti'." +
	"\n\tpripravky := FYDataPOR new db: por; domain: 'pripravky'." +
	"\n\tepptKody := FYDataEPPTKody new db: eppt; domain: 'kody'",
	null, "2014-01-06T08:14:15Z", "mp", 1);

jst.FytoportalData.addMethod("initialize", "", "initialization", 
	"\t| srv test |" +
	"\n\tsrv := (Browser window location pathname startsWith: '/db/')" +
	"\n\t\tifTrue: [CouchDB current]" +
	"\n\t\tifFalse: [CouchDB new url: (JsonUrl new addToPath: 'db')]." +
	"\n\t(test := Browser window location pathname includesSubString: 'test')" +
	"\n\t\tifFalse: [db := srv databaseNamed: 'fytoportal']" +
	"\n\t\tifTrue: [db := srv databaseNamed: 'fytoportal-test']." +
	"\n\teppt := db server databaseNamed: 'eppt'." +
	"\n\tpor := db server databaseNamed: (test ifFalse: ['por'] ifTrue: ['por-test'])." +
	"\n\tstate := ApplicationState new " +
	"\n\t\tprefix: 'fyto';" +
	"\n\t\tat: #navigator put: FYAppNavigator new;" +
	"\n\t\tat: #vyberKapitolPM put: ((WebStorage session at: #'fyto-vyberKapitol' ifPresent: [:v | " +
	"\n\t\t\tJSON default decode: v]) ifNil: [Dictionary new]);" +
	"\n\t\tyourself." +
	"\n\tulozVyber := DelayedTask new delay: 1000; task: [" +
	"\n\t\tWebStorage session at: #'fyto-vyberKapitol' put: (JSON default encode: self vyberKapitolPM)]." +
	"\n\tcache := Dictionary new." +
	"\n\ttaxony := FYDataTaxony new db: db; domain: 'taxony'." +
	"\n\tplodiny := FYDataPlodiny new db: db; domain: 'plodiny'." +
	"\n\tskodlOrg := FYDataSkodlOrg new db: db; domain: 'skodlorg'." +
	"\n\tfotky := FYDataFotky new db: db; domain: 'fotky'." +
	"\n\tmetodiky := FYDataMetodiky new db: db; domain: 'metodiky'." +
	"\n\tpouzitiPOR := FYDataPouzitiPOR new db: por; domain: 'pouziti'." +
	"\n\tpripravky := FYDataPOR new db: por; domain: 'pripravky'." +
	"\n\tepptKody := FYDataEPPTKody new db: eppt; domain: 'kody'",
	null, "2014-04-07T13:13:34Z", "mp", 1);

jst.FytoportalData.addMethod("initialize", "", "initialization", 
	"\t| srv test |" +
	"\n\tsrv := (Browser window location pathname startsWith: '/db/')" +
	"\n\t\tifTrue: [CouchDB current]" +
	"\n\t\tifFalse: [CouchDB new url: (JsonUrl new addToPath: 'db')]." +
	"\n\t(test := Browser window location pathname includesSubString: 'test')" +
	"\n\t\tifFalse: [db := srv databaseNamed: 'fytoportal']" +
	"\n\t\tifTrue: [db := srv databaseNamed: 'fytoportal-test']." +
	"\n\teppt := db server databaseNamed: 'eppt'." +
	"\n\tpor := db server databaseNamed: (test ifFalse: ['por'] ifTrue: ['por-test'])." +
	"\n\tstate := ApplicationState new " +
	"\n\t\tprefix: 'fyto';" +
	"\n\t\tat: #navigator put: FYAppNavigator new;" +
	"\n\t\tat: #vyberKapitolPM put: ((WebStorage session at: #'fyto-vyberKapitol' ifPresent: [:v | " +
	"\n\t\t\tJSON default decode: v]) ifNil: [Dictionary new]);" +
	"\n\t\tyourself." +
	"\n\tulozVyber := DelayedTask new delay: 1000; task: [" +
	"\n\t\tWebStorage session at: #'fyto-vyberKapitol' put: (JSON default encode: self vyberKapitolPM)]." +
	"\n\tcache := Dictionary new." +
	"\n\ttaxony := FYDataTaxony new db: db; domain: 'taxony'." +
	"\n\tplodiny := FYDataPlodiny new db: db; domain: 'plodiny'." +
	"\n\tskodlOrg := FYDataSkodlOrg new db: db; domain: 'skodlorg'." +
	"\n\tfotky := FYDataFotky new db: db; domain: 'fotky'." +
	"\n\tmetodiky := FYDataMetodiky new db: db; domain: 'metodiky'." +
	"\n\tpouzitiPOR := FYDataPouzitiPOR new db: por; domain: 'pouziti'." +
	"\n\tpripravky := FYDataPOR new db: por; domain: 'pripravky'." +
	"\n\tepptKody := FYDataEPPTKody new db: eppt; domain: 'kody'." +
	"\n\todrudy := FYDataOdrudy new db: db; domain: 'odrudy'",
	null, "2014-05-18T18:41:39Z", "mp"); //fytoportal

jst.FytoportalData.addMethod("taxony", "", "fotogalerie", 
	"\t^ taxony",
	null, "2013-01-28T08:57:33Z", "mp");

jst.FytoportalData.addMethod("vyberKapitolPM", "", "IOR", 
	"\t^ state at: #vyberKapitolPM",
	null, "2012-11-11T20:45:08Z", "mp");

jst.FytoportalData.addMethod("nactiMetodiku:", "id", "IOR", 
	"\t| m |" +
	"\n\tm := db loadObject: id." +
	"\n\tself vyberKapitolPM at: id ifAbsent: [ | dict |" +
	"\n\t\tdict := self vyberKapitolPM at: id put: Dictionary new." +
	"\n\t\tm keysAndValuesDo: [:key :kap |" +
	"\n\t\t\tdict at: ((key = #plodiny and: [kap obsah size = 1]) ifTrue: [kap obsah first linkId] ifFalse: [kap id]) put: true]" +
	"\n\t]." +
	"\n\t^ m",
	null, "2013-04-23T14:17:50Z", "mp", 1);

jst.FytoportalData.addMethod("nactiMetodiku:", "id", "IOR", 
	"\t| m |" +
	"\n\tm := db loadObject: id." +
	"\n\tself vyberKapitolPM at: id ifAbsent: [ | dict |" +
	"\n\t\tdict := self vyberKapitolPM at: id put: FYVyberKapitolPM new." +
	"\n\t\tm keysAndValuesDo: [:key :kap |" +
	"\n\t\t\tdict at: ((key = #plodiny and: [kap obsah size = 1]) ifTrue: [kap obsah first linkId] ifFalse: [kap id]) put: true]" +
	"\n\t]." +
	"\n\t^ m",
	null, "2013-09-27T14:17:38Z", "mp", 1);

jst.FytoportalData.addMethod("nactiMetodiku:", "id", "IOR", 
	"\t| m |" +
	"\n\tm := db loadObject: id." +
	"\n\tself vyberKapitolPM at: id ifAbsent: [ | vyber |" +
	"\n\t\tvyber := self vyberKapitolPM at: id put: FYVyberKapitolPM new." +
	"\n\t\tm keysAndValuesDo: [:key :kap | vyber " +
	"\n\t\t\tkapitola: key " +
	"\n\t\t\tpodkapitola: ((key = #plodiny and: [kap obsah size = 1]) ifTrue: [kap obsah first linkId]) " +
	"\n\t\t\tvyber: true]" +
	"\n\t]." +
	"\n\t^ m",
	null, "2013-10-01T15:06:22Z", "mp", 1);

jst.FytoportalData.addMethod("nactiMetodiku:", "id", "IOR", 
	"\t| m |" +
	"\n\tm := db loadObject: id." +
	"\n\tself vyberKapitolPM at: id ifAbsent: [ | vyber |" +
	"\n\t\tvyber := self vyberKapitolPM at: id put: FYVyberKapitolPM new." +
	"\n\t\tm keysAndValuesDo: [:key :kap | vyber " +
	"\n\t\t\tkapitola: key " +
	"\n\t\t\tpodkapitola: ((key = #plodiny and: [kap obsah size = 1]) ifTrue: [kap obsah first linkId]) " +
	"\n\t\t\tvyber: true]." +
	"\n\t\tself ulozVyberKapitolPM" +
	"\n\t]." +
	"\n\t^ m",
	null, "2014-01-06T08:16:56Z", "mp", 1);

jst.FytoportalData.addMethod("nactiMetodiku:", "id", "IOR", 
	"\t| m |" +
	"\n\tm := db loadObject: id." +
	"\n\tself vyberKapitolPM at: id ifAbsent: [ | vyber |" +
	"\n\t\tvyber := self vyberKapitolPM at: id put: FYVyberKapitolPM new." +
	"\n\t\tm keysAndValuesDo: [:key :kap | " +
	"\n\t\t\tvyber " +
	"\n\t\t\t\tkapitola: key " +
	"\n\t\t\t\tpodkapitola: ((key = #plodiny and: [kap obsah size = 1]) ifTrue: [kap obsah first linkId]) " +
	"\n\t\t\t\tvyber: true." +
	"\n\t\t\tvyber kapitola: key podkapitola: key, '.vse' vyber: true]." +
	"\n\t\tself ulozVyberKapitolPM" +
	"\n\t]." +
	"\n\t^ m",
	null, "2014-02-21T15:11:42Z", "mp"); //fytoportal

jst.FytoportalData.addMethod("ulozVyberKapitolPM", "", "IOR", 
	"\tulozVyber run",
	null, "2014-01-06T08:15:05Z", "mp"); //fytoportal

jst.FytoportalData.addMethod("obecnaMetodikaPro:", "skup", "IOR", 
	"\t\"zatim bez cache\"" +
	"\n\t^ db loadObject: 'obecnaMetodika_', skup",
	null, "2013-12-03T22:49:04Z", "mp", 1);

jst.FytoportalData.addMethod("obecnaMetodikaPro:", "skup", "IOR", 
	"\t| id |" +
	"\n\t^ cache at: (id := 'obecnaMetodika_', skup) ifAbsentPut: [" +
	"\n\t\tdb loadObject: id]",
	null, "2013-12-05T20:19:31Z", "mp", 1);

jst.FytoportalData.addMethod("obecnaMetodikaPro:", "skup", "IOR", 
	"\t| id |" +
	"\n\tid := 'obecnaMetodika_', skup." +
	"\n\t^ cache at: id ifAbsentPut: [" +
	"\n\t\tdb loadObject: id]",
	null, "2014-03-07T21:58:06Z", "mp"); //fytoportal

/*
jst.FytoportalData.addMethod("ulozMetodiku:", "metodika", "IOR", 
	"\tdb storeObject: metodika." +
	"\n\tUIManager default broadcastEvent: #zmenaMetodiky: with: metodika",
	null, "2013-01-11T23:36:56Z", "mp");
*/

jst.FytoportalData.addMethod("navigator", "", "accessing", 
	"\t^ state at: 'navigator'",
	null, "2012-06-23T09:30:15Z", "mp");

jst.FytoportalData.addMethod("plodiny", "", "fotogalerie", 
	"\t^ plodiny",
	null, "2012-06-17T07:19:44Z", "mp");

jst.FytoportalData.addMethod("fotky", "", "fotogalerie", 
	"\t^ fotky",
	null, "2012-06-17T07:19:51Z", "mp");

jst.FytoportalData.addMethod("skodlOrg", "", "fotogalerie", 
	"\t^ skodlOrg",
	null, "2012-06-17T07:20:05Z", "mp");

jst.FytoportalData.addMethod("db", "", "accessing", 
	"\t^ db",
	null, "2012-06-13T12:40:44Z", "mp");

jst.FytoportalData.addMethod("state", "", "accessing", 
	"\t^ state",
	null, "2012-06-13T10:54:05Z", "mp");

jst.FytoportalData.addMethod("skupinyPlodin", "", "fotogalerie", 
	"\t^ db loadObject: 'skupinyPlodin'",
	null, "2012-06-12T12:34:24Z", "mp", 1);

jst.FytoportalData.addMethod("skupinyPlodin", "", "fotogalerie", 
	"\t^ db loadObject: 'skupinyPlodin', plodiny publicSuffix",
	null, "2014-01-19T23:08:53Z", "mp", 1);

jst.FytoportalData.addMethod("skupinyPlodin", "", "fotogalerie", 
	"\t\"vraci rovnou TreeNode\"" +
	"\n\t^ db loadObject: 'skupinyPlodin2', plodiny publicSuffix",
	null, "2014-01-29T08:17:03Z", "mp"); //fytoportal

jst.FytoportalData.addMethod("zarazeniSO", "", "fotogalerie", 
	"\t^ db loadObject: 'zarazeniSO'",
	null, "2012-08-02T12:55:50Z", "mp");

jst.FytoportalData.addMethod("rootDoc", "", "accessing", 
	"\t^ db designDocNamed: 'start'",
	null, "2012-08-03T08:23:27Z", "mp");

jst.FytoportalData.addMethod("emptyView", "", "accessing", 
	"\t\"musi byt takto - #viewNamed: v runtime verzi vraci jen CouchDBObject\"" +
	"\n\t^ CouchDBView new name: 'empty'; owner: self rootDoc",
	null, "2013-05-13T19:32:43Z", "mp");

jst.FytoportalData.addMethod("metodiky", "", "IOR", 
	"\t^ metodiky",
	null, "2012-11-07T10:40:41Z", "mp");

jst.FytoportalData.addMethod("odrudy", "", "IOR", 
	"\t^ odrudy",
	null, "2014-05-18T18:42:09Z", "mp");

/* nahrazeno nasledujici metodou #osnovaMetodiky:
jst.FytoportalData.addMethod("osnovaMetodiky", "", "IOR", 
	"\t^ cache at: 'osnovaMetodiky' ifAbsentPut: [" +
	"\n\t\tdb loadObject: 'osnovaMetodiky']",
	null, "2012-11-14T19:26:11Z", "mp");

jst.FytoportalData.addMethod("osnovaMetodikyKapitoly:", "kapId", "IOR", 
	"\t^ cache at: 'osnovaMetodiky_', kapId ifAbsentPut: [" +
	"\n\t\tdb loadObject: 'osnovaMetodiky_', kapId]",
	null, "2013-01-15T16:14:07Z", "mp");

jst.FytoportalData.addMethod("osnovaMetodiky", "", "IOR", 
	"\t^ cache at: (self nazevOsnovy: '') ifAbsentPut: [" +
	"\n\t\tdb loadObject: (self nazevOsnovy: '')]",
	null, "2013-02-22T17:22:17Z", "mp");
*/

jst.FytoportalData.addMethod("osnovaMetodiky:", "typ", "IOR", 
	"\t| suff |" +
	"\n\tsuff := typ = #metodika ifTrue: '' ifFalse: typ." +
	"\n\t^ cache at: (self nazevOsnovy: suff) ifAbsentPut: [" +
	"\n\t\tdb loadObject: (self nazevOsnovy: suff)]",
	null, "2014-02-09T12:24:08Z", "mp"); //fytoportal

jst.FytoportalData.addMethod("osnovaMetodikyKapitoly:", "kapId", "IOR", 
	"\t^ cache at: (self nazevOsnovy: kapId) ifAbsentPut: [" +
	"\n\t\tdb loadObject: (self nazevOsnovy: kapId)]",
	null, "2013-02-22T17:23:07Z", "mp");

jst.FytoportalData.addMethod("nazevOsnovy:", "suff", "IOR", 
	"\t^ 'osnovaMetodiky', (suff isEmpty ifTrue: suff ifFalse: ['_', suff])",
	null, "2013-02-22T17:20:44Z", "mp");

jst.FytoportalData.addMethod("iorInfo", "", "IOR", 
	"\t^ (self rootDoc attachmentNamed: 'ior-info.html') loadContents",
	null, "2013-08-27T10:03:16Z", "mp");

jst.FytoportalData.addMethod("por", "", "accessing", 
	"\t^ por",
	null, "2013-04-03T18:56:20Z", "mp");

jst.FytoportalData.addMethod("pouzitiPOR", "", "POR", 
	"\t^ pouzitiPOR",
	null, "2013-04-03T12:09:15Z", "mp");

jst.FytoportalData.addMethod("pripravky", "", "POR", 
	"\t^ pripravky",
	null, "2013-04-17T19:16:53Z", "mp");

jst.FytoportalData.addMethod("eppt", "", "accessing", 
	"\t^ eppt",
	null, "2013-04-11T13:22:08Z", "mp");

jst.FytoportalData.addMethod("epptKody", "", "EPPT", 
	"\t^ epptKody",
	null, "2013-04-05T07:39:12Z", "mp");

jst.FytoportalData.addMethod("isAdminIOR", "", "user roles", 
	"\t^ db server userRoles includes: #fyAdminIOR",
	null, "2013-08-23T08:09:48Z", "mp"); //fytoportal-core

jst.FytoportalData.addMethod("isAdminFoto", "", "user roles", 
	"\t^ db server userRoles includes: #fyAdmin",
	null, "2013-08-23T08:12:40Z", "mp"); //fytoportal-core

jst.FytoportalData.addMethod("novaMetodika", "", "IOR", 
	"\t^ FYMetodikaPM newFrom: (db loadObject: #novaMetodika)",
	null, "2013-12-03T22:44:18Z", "mp");

jst.FytoportalData.addMethod("updateCache:", "anObject", "updating", 
	"\tcache at: anObject id ifPresent: [:old |" +
	"\n\t\tcache at: anObject id put: anObject]",
	null, "2014-03-14T14:12:19Z", "mp");

jst.FytoportalData.addMethod("pouzitiVsechnyPlodiny", "", "POR", 
	"\t\"pouziti pro 'vsechny plodiny'\"" +
	"\n\t^ cache at: #pouzitiVsechnyPlodiny ifAbsentPut: [" +
	"\n\t\t((pouzitiPOR mapovaniPro: #plodiny) lookupKeys: #('3CCCC')) collect: [:dict | dict at: #id]]",
	null, "2014-04-24T09:14:13Z", "mp");

// *** Fytoportal ***

jst.Fytoportal._class.instanceVariableNames_("current data");

jst.Fytoportal._class.addMethod("initialize", "", "class initialization", 
	"\tdata := FytoportalData new",
	null, "2012-06-12T12:33:42Z", "mp");

jst.initializeClass(jst.Fytoportal);

/*
jst.Fytoportal.addMethod("initialize", "", "initialization", 
	"\t| desktop toolsBtn |" +
	"\n\ttoolsBtn := (WinMgrAction new label: 'JSmalltalk Tools'; target: SystemBrowser default) asSplitButton" +
	"\n\t\theight: 27; " +
	"\n\t\trenderTo: 'tools-btn'." +
	"\n\tdesktop := ExtViewport new" +
	"\n\t\twithBorderLayout;" +
	"\n\t\tadd: (top := ExtPanel new region: ExtRegion north; height: 50);" +
	"\n\t\tadd: (left := ExtPanel new region: (ExtSplitRegion west minWidth: 200); width: 300);" +
	"\n\t\tadd: (center := ExtPanel new region: ExtRegion center);" +
	"\n\t\tyourself." +
	"\n\tDocument html body htmlContents: [:html | " +
	"\n\t\thtml div " +
	"\n\t\t\tid: 'tools-btn';" +
	"\n\t\t\tstyle: 'left: 5; top: 3; position: fixed']." +
	"\n\ttoolsBtn show." +
	"\n\tdesktop show.",
	null, "2012-06-04T19:30:56Z", "mp");

jst.Fytoportal.addMethod("initialize", "", "initialization", 
	"\t| toolsBtn |" +
	"\n\ttoolsBtn := (WinMgrAction new label: 'JSmalltalk Tools'; target: SystemBrowser default) asSplitButton" +
	"\n\t\theight: 27; " +
	"\n\t\trenderTo: 'tools-btn'." +
	"\n\tExtViewport new" +
	"\n\t\twithBorderLayout;" +
	"\n\t\tadd: (top := ExtPanel new region: ExtRegion north; height: 50);" +
	"\n\t\tadd: (left := ExtPanel new region: (ExtSplitRegion west minWidth: 200); width: 300);" +
	"\n\t\tadd: (center := ExtPanel new region: ExtRegion center);" +
	"\n\t\trenderTo: ExtCore current asJsObject getBody;" +
	"\n\t\tshow." +
	"\n\tDocument html body htmlContents: [:html | " +
	"\n\t\thtml div " +
	"\n\t\t\tid: 'tools-btn';" +
	"\n\t\t\tstyle: 'left: 5; top: 3; position: fixed']." +
	"\n\ttoolsBtn show.",
	null, "2012-06-05T08:46:12Z", "mp");
*/

jst.Fytoportal.addMethod("initialize", "", "initialization", 
	"\ttiskMetodiky := FYTiskMetodiky new",
	null, "2014-02-14T09:08:43Z", "mp");

jst.Fytoportal._class.addMethod("current", "", "accessing", 
	"\t^ current",
	null, "2012-06-05T18:54:17Z", "mp");

/*
jst.Fytoportal._class.addMethod("start", "", "instance creation", 
	"\tcurrent := self new",
	null, "2012-06-07T12:31:34Z", "mp");

jst.Fytoportal._class.addMethod("start", "", "instance creation", 
	"\tFytoportal instVarNamed: #current put: self new." +
	"\n\tFytoportal current aktivujFotogalerii",
	null, "2012-06-11T21:37:07Z", "mp");

jst.Fytoportal._class.addMethod("start", "", "instance creation", 
	"\tFytoportal instVarNamed: #current put: self new." +
	"\n\tFytoportal navigator ior toggle",
	null, "2012-10-03T18:47:06Z", "mp");

jst.Fytoportal._class.addMethod("start", "", "instance creation", 
	"\t| userInfo |" +
	"\n\tFytoportal instVarNamed: #current put: self new." +
	"\n\tFytoportal navigator ior toggle." +
	"\n\tuserInfo := Fytoportal db server userInfo." +
	"\n\t(userInfo at: #name) ifNotNil: [" +
	"\n\t\tUIManager default broadcastEvent: #loggedIn: with: userInfo]",
	null, "2012-12-19T23:02:13Z", "mp");
*/

jst.Fytoportal._class.addMethod("start", "", "instance creation", 
	"\tFytoportal instVarNamed: #current put: self new." +
	"\n\tFytoportal navigator ior toggle." +
	"\n\tFytoportal db server refreshSessionInfo",
	null, "2012-12-21T21:28:44Z", "mp", 1);

jst.Fytoportal._class.addMethod("start", "", "instance creation", 
	"\tFytoportal instVarNamed: #current put: self new." +
	"\n\t(ExtHistory current init; activeToken) " +
	"\n\t\tifEmpty: [Fytoportal navigator ior toggle]" +
	"\n\t\tifNotEmptyDo: [:str |" +
	"\n\t\t\tFytoportal data navigator path forcePath: str]." +
	"\n\tFytoportal db server refreshSessionInfo",
	null, "2013-08-17T13:33:13Z", "mp", 1);
/*
jst.Fytoportal._class.addMethod("start", "", "instance creation", 
	"\tFytoportal instVarNamed: #current put: self new." +
	"\n\tFytoportal navigator ior toggle." +
	"\n\t(ExtHistory current init; activeToken) ifNotEmptyDo: [:str |" +
	"\n\t\tFytoportal data navigator path forcePath: str]." +
	"\n\tFytoportal db server refreshSessionInfo",
	null, "2013-08-19T14:14:02Z", "mp"); //fytoportal
*/

jst.Fytoportal._class.addMethod("start", "", "instance creation", 
	"\tFytoportal instVarNamed: #current put: self new." +
	"\n\tFytoportal db server refreshSessionInfoAsync: false." +
	"\n\t(ExtHistory current init; activeToken) isEmptyOrNil" +
	"\n\t\tifTrue: [Fytoportal navigator ior toggle]" +
	"\n\t\tifFalse: [[Fytoportal data navigator path " +
	"\n\t\t\tforcePath: ExtHistory current activeToken] delayed: 100]",
	null, "2013-08-25T20:50:55Z", "mp", 1);

jst.Fytoportal._class.addMethod("start", "", "instance creation", 
	"\tFytoportal instVarNamed: #current put: self new." +
	"\n\tFytoportal db server refreshSessionInfoAsync: false." +
	"\n\t(ExtHistory current init; activeToken) isEmptyOrNil" +
	"\n\t\tifTrue: [Fytoportal navigator ior switchPath]" +
	"\n\t\tifFalse: [[Fytoportal data navigator path " +
	"\n\t\t\tforcePath: ExtHistory current activeToken] delayed: 100]",
	null, "2013-08-28T12:03:46Z", "mp", 1);

jst.Fytoportal._class.addMethod("start", "", "instance creation", 
	"\tFytoportal instVarNamed: #current put: self new." +
	"\n\tFytoportal db server refreshSessionInfoAsync: false." +
	"\n\t(ExtHistory current init; activeToken) isEmptyOrNil" +
	"\n\t\tifTrue: [Fytoportal navigator ior switchPathOn: #modul]" +
	"\n\t\tifFalse: [[Fytoportal data navigator path " +
	"\n\t\t\tforcePath: ExtHistory current activeToken] delayed: 100]",
	null, "2013-09-02T19:27:43Z", "mp", 1); //fytoportal

jst.Fytoportal._class.addMethod("start", "", "instance creation", 
	"\tFytoportal instVarNamed: #current put: self new." +
	"\n\tFytoportal db server refreshSessionInfoAsync: false." +
	"\n\t(ExtHistory current init; activeToken) isEmptyOrNil" +
	"\n\t\tifTrue: [Fytoportal navigator ior switchPath]" +
	"\n\t\tifFalse: [[Fytoportal data navigator path " +
	"\n\t\t\tforcePath: ExtHistory current activeToken] delayed: 100]",
	null, "2013-09-03T08:10:05Z", "mp"); //fytoportal

jst.Fytoportal._class.addMethod("data", "", "accessing", 
	"\t^ data",
	null, "2012-06-12T12:33:23Z", "mp");

jst.Fytoportal._class.addMethod("db", "", "accessing", 
	"\t^ data db",
	null, "2012-12-19T21:22:13Z", "mp");

jst.Fytoportal._class.addMethod("state", "", "accessing", 
	"\t^ data state",
	null, "2012-06-13T10:55:05Z", "mp");

jst.Fytoportal._class.addMethod("navigator", "", "accessing", 
	"\t^ data navigator",
	null, "2012-06-23T09:30:39Z", "mp");

jst.Fytoportal.addMethod("ior", "", "accessing-modules", 
	"\t^ ior",
	null, "2013-08-27T19:55:18Z", "mp");

jst.Fytoportal.addMethod("fotogalerie", "", "accessing-modules", 
	"\t^ fotogalerie",
	null, "2013-08-27T19:55:58Z", "mp");

jst.Fytoportal._class.addMethod("ior", "", "accessing-modules", 
	"\t^ current ior",
	null, "2013-08-28T09:05:33Z", "mp");

jst.Fytoportal._class.addMethod("fotogalerie", "", "accessing-modules", 
	"\t^ current fotogalerie",
	null, "2013-08-28T09:05:48Z", "mp");

jst.Fytoportal.addMethod("aktivujFotogalerii", "", "navigace", 
	"\tfotogalerie ifNil: [" +
	"\n\t\tfotogalerie := FYFotogalerie new." +
	"\n\t\tmasterNavigPanel add: fotogalerie plodinyPanel." +
	"\n\t\tdetailNavigPanel add: fotogalerie skodlOrgPanel." +
	"\n\t\tmainPanel add: fotogalerie mainPanel]." +
	"\n\tmasterNavigPanel layout activeItem: fotogalerie plodinyPanel id." +
	"\n\tdetailNavigPanel layout activeItem: fotogalerie skodlOrgPanel id." +
	"\n\tmainPanel layout activeItem: fotogalerie mainPanel id",
	null, "2012-06-19T22:00:38Z", "mp", 1);

jst.Fytoportal.addMethod("aktivujFotogalerii", "", "navigace", 
	"\tfotogalerie ifNil: [" +
	"\n\t\tfotogalerie := FYFotogalerie new." +
	"\n\t\tmasterNavigPanel add: fotogalerie plodinyPanel." +
	"\n\t\tdetailNavigPanel add: fotogalerie skodlOrgPanel." +
	"\n\t\tmainPanel add: fotogalerie mainPanel]." +
	"\n\tmasterNavigPanel layout activeItem: fotogalerie plodinyPanel id." +
	"\n\tdetailNavigPanel layout activeItem: fotogalerie skodlOrgPanel id." +
	"\n\tmainPanel layout activeItem: fotogalerie mainPanel id." +
	"\n\ttiskMetodiky beDisabled",
	null, "2014-02-14T09:10:09Z", "mp"); //fytoportal

jst.Fytoportal.addMethod("aktivujIOR", "", "navigace", 
	"\tior ifNil: [" +
	"\n\t\tior := FYIOR new." +
	"\n\t\tmasterNavigPanel add: ior metodikyPanel." +
	"\n\t\tdetailNavigPanel add: ior kapitolaPanel." +
	"\n\t\tmainPanel add: ior obsahPanel]." +
	"\n\tmasterNavigPanel layout activeItem: ior metodikyPanel id." +
	"\n\tdetailNavigPanel layout activeItem: ior kapitolaPanel id." +
	"\n\tmainPanel layout activeItem: ior obsahPanel id",
	null, "2012-11-08T09:34:25Z", "mp", 1);

jst.Fytoportal.addMethod("aktivujIOR", "", "navigace", 
	"\tior ifNil: [" +
	"\n\t\tior := FYIOR new." +
	"\n\t\tmasterNavigPanel add: ior metodikyPanel." +
	"\n\t\tdetailNavigPanel add: ior kapitolaPanel." +
	"\n\t\tmainPanel add: ior obsahPanel]." +
	"\n\tmasterNavigPanel layout activeItem: ior metodikyPanel id." +
	"\n\tdetailNavigPanel layout activeItem: ior kapitolaPanel id." +
	"\n\tmainPanel layout activeItem: ior obsahPanel id." +
	"\n\ttiskMetodiky beEnabled",
	null, "2014-02-14T09:09:44Z", "mp"); //fytoportal

jst.Fytoportal.addMethod("reset", "", "initialization", 
	"\tfotogalerie := nil." +
	"\n\tior := nil." +
	"\n\tself class navigator reset",
	null, "2012-06-26T11:27:48Z", "mp");

jst.Fytoportal._class.addMethod("deploy", "", "deploying", 
	"\t\"Fytoportal deploy\"" +
	"\n\tUIManager default " +
	"\n\t\tinformUser: 'Deploying Fytoportal...' " +
	"\n\t\tduring: [" +
	"\n\t\t\tAppDeployer new " +
	"\n\t\t\t\tpackages: {'SRS-Fytoportal'. 'Ext'. 'CouchDB'}; " +
	"\n\t\t\t\tdeploy; " +
	"\n\t\t\t\topenWindow]",
	null, "2012-11-01T13:04:49Z", "mp");

jst.Fytoportal._class.addMethod("deployToDB", "", "deploying", 
	"\t\"Fytoportal deploy\"" +
	"\n\tAppDeployer new " +
	"\n\t\tpackages: {'SRS-Fytoportal'. 'Ext'. 'CouchDB'}; " +
	"\n\t\tdeployTo: Fytoportal data rootDoc named: 'fytoportal-rtm.js'",
	null, "2013-05-20T16:05:01Z", "mp", 1);

jst.Fytoportal._class.addMethod("deployToDB", "", "deploying", 
	"\t\"Fytoportal deploy\"" +
	"\n\tAppDeployer new " +
	"\n\t\tpackages: {'SRS-Fytoportal'. 'Ext'. 'CouchDB'}; " +
	"\n\t\tdeployTo: Fytoportal data rootDoc load named: 'fytoportal-rtm.js'",
	null, "2013-07-06T21:37:22Z", "mp"); //fytoportal

jst.Fytoportal._class.addMethod("deployPublic", "", "deploying", 
	"\t\"Fytoportal deployPublic\"" +
	"\n\tUIManager default " +
	"\n\t\tinformUser: 'Deploying public Fytoportal...' " +
	"\n\t\tduring: [" +
	"\n\t\t\tAppDeployer new " +
	"\n\t\t\t\tpackages: {'SRS-Fytoportal'. 'Ext'. 'CouchDB'}; " +
	"\n\t\t\t\tskipPackages: {'SRS-Fytoportal-foto-edit'. 'SRS-Fytoportal-IOR-edit'};" +
	"\n\t\t\t\tdeploy; " +
	"\n\t\t\t\topenWindow]",
	null, "2014-01-16T12:32:41Z", "mp");

jst.Fytoportal.addMethod("isTest", "", "testing", 
	"\t^ self class db name endsWith: 'test'",
	null, "2014-04-07T13:16:01Z", "mp");

// *** FYDesktop ***
/*
jst.FYDesktop.addMethod("initialize", "", "initialization", 
	"\tExtViewport new" +
	"\n\t\twithBorderLayout;" +
	"\n\t\tadd: (top := ExtContainer new region: #north; height: 95);" +
	"\n\t\t\"add: (bottom := ExtContainer new region: #south; height: 30);\"" +
	"\n\t\tadd: (left := ExtContainer new region: (ExtSplitRegion west minWidth: 150); width: 250; withBorderLayout;" +
	"\n\t\t\tadd: (masterNavigPanel := ExtPanel new " +
	"\n\t\t\t\tregion: (ExtSplitRegion north minHeight: 100); height: 300; withCardLayout);" +
	"\n\t\t\tadd: (detailNavigPanel := ExtPanel new region: #center; withCardLayout);" +
	"\n\t\t\tyourself);" +
	"\n\t\t\"add: (right := ExtContainer new region: #east; width: 150);\"" +
	"\n\t\tadd: (mainPanel := ExtPanel new border: false; region: #center; withCardLayout);" +
	"\n\t\trenderTo: Document html body;" +
	"\n\t\tshow." +
	"\n\tDocument html body htmlContents: [:html | " +
	"\n\t\thtml img " +
	"\n\t\t\tsrc: 'srslogo.png';" +
	"\n\t\t\tstyle: 'width: 72px; height: 96px; left: 5px; top: 5px; position: fixed'." +
	"\n\t\thtml div" +
	"\n\t\t\tstyle: 'left: 82px; top: 29px; position: fixed; font-size: 28px';" +
	"\n\t\t\twith: 'ROSTLINOLÉKAŘSKÝ PORTÁL'." +
	"\n\t\thtml div" +
	"\n\t\t\tid: 'path-info';" +
	"\n\t\t\tstyle: 'left: 82px; top: 60px; position: fixed; font-size: 12px'." +
	"\n\t\thtml div " +
	"\n\t\t\tid: 'startbtn';" +
	"\n\t\t\tstyle: 'left: 82px; top: 5px; position: fixed'].",
	null, "2012-06-28T11:59:23Z", "mp");

jst.FYDesktop.addMethod("initialize", "", "initialization", 
	"\tExtViewport new " +
	"\n\t\twithBorderLayout;" +
	"\n\t\tadd: (top := ExtContainer new region: #north; height: 95);" +
	"\n\t\tadd: (ExtContainer new region: #center; withFitLayout; autoScroll: true;" +
	"\n\t\t\tadd: (ExtContainer new withBorderLayout; boxMinWidth: 800; boxMinHeight: 600;" +
	"\n\t\t\t\t\"add: (bottom := ExtContainer new region: #south; height: 30);\"" +
	"\n\t\t\t\tadd: (left := ExtContainer new region: (ExtSplitRegion west minWidth: 150); width: 250; withBorderLayout;" +
	"\n\t\t\t\t\tadd: (masterNavigPanel := ExtPanel new " +
	"\n\t\t\t\t\t\tregion: (ExtSplitRegion north minHeight: 100); height: 300; withCardLayout);" +
	"\n\t\t\t\t\tadd: (detailNavigPanel := ExtPanel new region: #center; withCardLayout);" +
	"\n\t\t\t\t\tyourself);" +
	"\n\t\t\t\t\"add: (right := ExtContainer new region: #east; width: 150);\"" +
	"\n\t\t\t\tadd: (mainPanel := ExtPanel new border: false; region: #center; withCardLayout); " +
	"\n\t\t\t\tyourself);" +
	"\n\t\t\tyourself);" +
	"\n\t\trenderTo: Document html body;" +
	"\n\t\tshow." +
	"\n\tDocument html body htmlContents: [:html | " +
	"\n\t\thtml img " +
	"\n\t\t\tsrc: 'srslogo.png';" +
	"\n\t\t\tstyle: 'width: 72px; height: 96px; left: 5px; top: 5px; position: fixed'." +
	"\n\t\thtml div" +
	"\n\t\t\tstyle: 'left: 82px; top: 29px; position: fixed; font-size: 28px';" +
	"\n\t\t\twith: 'ROSTLINOLÉKAŘSKÝ PORTÁL'." +
	"\n\t\thtml div" +
	"\n\t\t\tid: 'path-info';" +
	"\n\t\t\tstyle: 'left: 82px; top: 60px; position: fixed; font-size: 12px'." +
	"\n\t\thtml div " +
	"\n\t\t\tid: 'startbtn';" +
	"\n\t\t\tstyle: 'left: 82px; top: 5px; position: fixed'].",
	null, "2012-07-09T13:21:41Z", "mp");

jst.FYDesktop.addMethod("initialize", "", "initialization", 
	"\tExtViewport new" +
	"\n\t\twithBorderLayout;" +
	"\n\t\tadd: (top := ExtContainer new region: #north; height: 95);" +
	"\n\t\t\"add: (bottom := ExtContainer new region: #south; height: 30);\"" +
	"\n\t\tadd: (left := ExtContainer new region: (ExtSplitRegion west minWidth: 150); width: 250; withBorderLayout;" +
	"\n\t\t\tadd: (masterNavigPanel := ExtPanel new " +
	"\n\t\t\t\tregion: (ExtSplitRegion north minHeight: 100); height: 300; withCardLayout);" +
	"\n\t\t\tadd: (detailNavigPanel := ExtPanel new region: #center; withCardLayout);" +
	"\n\t\t\tyourself);" +
	"\n\t\t\"add: (right := ExtContainer new region: #east; width: 150);\"" +
	"\n\t\tadd: (ExtContainer new region: #center; withFitLayout; autoScroll: true;" +
	"\n\t\t\tadd: (mainPanel := ExtPanel new border: false; withCardLayout; boxMinWidth: 1000; boxMinHeight: 600);" +
	"\n\t\t\tyourself);" +
	"\n\t\trenderTo: Document current body;" +
	"\n\t\tshow." +
	"\n\tDocument current body htmlContents: [:html | " +
	"\n\t\thtml img " +
	"\n\t\t\tsrc: 'srslogo.png';" +
	"\n\t\t\tstyle: 'width: 72px; height: 96px; left: 5px; top: 5px; position: fixed'." +
	"\n\t\thtml div" +
	"\n\t\t\tstyle: 'left: 82px; top: 29px; position: fixed; font-size: 28px';" +
	"\n\t\t\twith: 'ROSTLINOLÉKAŘSKÝ PORTÁL'." +
	"\n\t\thtml div" +
	"\n\t\t\tid: 'path-info';" +
	"\n\t\t\tstyle: 'left: 82px; top: 60px; position: fixed; font-size: 12px'." +
	"\n\t\thtml div " +
	"\n\t\t\tid: 'startbtn';" +
	"\n\t\t\tstyle: 'left: 82px; top: 5px; position: fixed'].",
	null, "2012-09-19T21:20:28Z", "mp");

jst.FYDesktop.addMethod("initialize", "", "initialization", 
	"\tExtViewport new" +
	"\n\t\twithBorderLayout;" +
	"\n\t\tadd: (top := ExtContainer new region: #north; height: 106; " +
	"\n\t\t\tlayout: (ExtTableLayout new columns: 2; tableAttrs: {'width'. '100%'});" +
	"\n\t\t\tadd: (ExtComponent new rowspan: 3; autoEl: {'tag'. 'img'. 'src'. 'srslogo.png'. 'style'. " +
	"\n\t\t\t\t'width: 72px; height: 96px; padding: 5'});" +
	"\n\t\t\tadd: (ExtComponent new id: 'startbtn');" +
	"\n\t\t\tadd: (ExtComponent new contents: 'ROSTLINOLÉKAŘSKÝ PORTÁL');" +
	"\n\t\t\tadd: (ExtComponent new id: 'path-info');" +
	"\n\t\t\tyourself);" +
	"\n\t\t\"add: (bottom := ExtContainer new region: #south; height: 30);\"" +
	"\n\t\tadd: (left := ExtContainer new region: (ExtSplitRegion west minWidth: 150); width: 250; withBorderLayout;" +
	"\n\t\t\tadd: (masterNavigPanel := ExtPanel new " +
	"\n\t\t\t\tregion: (ExtSplitRegion north minHeight: 100); height: 300; withCardLayout);" +
	"\n\t\t\tadd: (detailNavigPanel := ExtPanel new region: #center; withCardLayout);" +
	"\n\t\t\tyourself);" +
	"\n\t\t\"add: (right := ExtContainer new region: #east; width: 150);\"" +
	"\n\t\tadd: (ExtContainer new region: #center; withFitLayout; autoScroll: true;" +
	"\n\t\t\tadd: (mainPanel := ExtPanel new border: false; withCardLayout; boxMinWidth: 1000; boxMinHeight: 600);" +
	"\n\t\t\tyourself);" +
	"\n\t\trenderTo: Document current body;" +
	"\n\t\tshow." +
	"\n\t\"Document current body htmlContents: [:html | " +
	"\n\t\thtml img " +
	"\n\t\t\tsrc: 'srslogo.png';" +
	"\n\t\t\tstyle: 'width: 72px; height: 96px; left: 5px; top: 5px; position: fixed'." +
	"\n\t\thtml div" +
	"\n\t\t\tstyle: 'left: 82px; top: 29px; position: fixed; font-size: 28px';" +
	"\n\t\t\twith: 'ROSTLINOLÉKAŘSKÝ PORTÁL'." +
	"\n\t\thtml div" +
	"\n\t\t\tid: 'path-info';" +
	"\n\t\t\tstyle: 'left: 82px; top: 60px; position: fixed; font-size: 12px'." +
	"\n\t\thtml div " +
	"\n\t\t\tid: 'startbtn';" +
	"\n\t\t\tstyle: 'left: 82px; top: 5px; position: fixed'].\"",
	null, "2012-09-29T21:55:42Z", "mp");

jst.FYDesktop.addMethod("initialize", "", "initialization", 
	"\tExtViewport new" +
	"\n\t\twithBorderLayout;" +
	"\n\t\tadd: self topPanel;" +
	"\n\t\t\"add: (bottom := ExtContainer new region: #south; height: 23);\"" +
	"\n\t\tadd: (left := ExtContainer new region: (ExtSplitRegion west minWidth: 150); width: 250; withBorderLayout;" +
	"\n\t\t\tadd: (masterNavigPanel := ExtPanel new " +
	"\n\t\t\t\tborder: false;" +
	"\n\t\t\t\tregion: (ExtSplitRegion north minHeight: 100); height: 300; withCardLayout);" +
	"\n\t\t\tadd: (detailNavigPanel := ExtPanel new region: #center; withCardLayout);" +
	"\n\t\t\tyourself);" +
	"\n\t\t\"add: (right := ExtContainer new region: #east; width: 150);\"" +
	"\n\t\tadd: (ExtContainer new region: #center; withFitLayout; autoScroll: true;" +
	"\n\t\t\tadd: (mainPanel := ExtPanel new border: false; withCardLayout; minWidth: 1000; minHeight: 600);" +
	"\n\t\t\tyourself);" +
	"\n\t\trenderTo: Document current body;" +
	"\n\t\tshow",
	null, "2013-01-04T15:15:31Z", "mp");
*/

jst.FYDesktop.addMethod("initialize", "", "initialization", 
	"\tExtViewport new" +
	"\n\t\twithBorderLayout;" +
	"\n\t\tadd: self topPanel;" +
	"\n\t\t\"add: (bottom := ExtContainer new region: #south; height: 23);\"" +
	"\n\t\tadd: (left := ExtContainer new region: (ExtSplitRegion west minWidth: 150); width: 250; withBorderLayout;" +
	"\n\t\t\tadd: (masterNavigPanel := ExtPanel new " +
	"\n\t\t\t\tborder: false;" +
	"\n\t\t\t\tregion: (ExtSplitRegion north minHeight: 100); height: 300; withCardLayout);" +
	"\n\t\t\tadd: (detailNavigPanel := ExtPanel new region: #center; withCardLayout);" +
	"\n\t\t\tyourself);" +
	"\n\t\t\"add: (right := ExtContainer new region: #east; width: 150);\"" +
	"\n\t\tadd: (mainPanel := ExtContainer new region: #center; withCardLayout);" +
	"\n\t\trenderTo: Document current body;" +
	"\n\t\tshow",
	null, "2013-02-14T15:43:06Z", "mp", 1);

jst.FYDesktop.addMethod("initialize", "", "initialization", 
	"\tExtQuickTips init." +
	"\n\tExtViewport new" +
	"\n\t\twithBorderLayout;" +
	"\n\t\tadd: self topPanel;" +
	"\n\t\t\"add: (bottom := ExtContainer new region: #south; height: 23);\"" +
	"\n\t\tadd: (left := ExtContainer new region: (ExtSplitRegion west minWidth: 150); width: 250; withBorderLayout;" +
	"\n\t\t\tadd: (masterNavigPanel := ExtPanel new " +
	"\n\t\t\t\tborder: false;" +
	"\n\t\t\t\tregion: (ExtSplitRegion north minHeight: 100); height: 300; withCardLayout);" +
	"\n\t\t\tadd: (detailNavigPanel := ExtPanel new region: #center; withCardLayout);" +
	"\n\t\t\tyourself);" +
	"\n\t\t\"add: (right := ExtContainer new region: #east; width: 150);\"" +
	"\n\t\tadd: (mainPanel := ExtContainer new region: #center; withCardLayout);" +
	"\n\t\trenderTo: Document current body;" +
	"\n\t\tshow",
	null, "2013-06-03T09:26:55Z", "mp", 1);

jst.FYDesktop.addMethod("initialize", "", "initialization", 
	"\tExtQuickTips init." +
	"\n\tExtViewport new" +
	"\n\t\twithBorderLayout;" +
	"\n\t\tadd: self topPanel;" +
	"\n\t\t\"add: (bottom := ExtContainer new region: #south; height: 23);\"" +
	"\n\t\tadd: (left := ExtContainer new region: (ExtSplitRegion west minWidth: 150); width: 250; withBorderLayout;" +
	"\n\t\t\tadd: (masterNavigPanel := ExtPanel new " +
	"\n\t\t\t\tborder: false;" +
	"\n\t\t\t\tregion: (ExtSplitRegion north minHeight: 100); height: 300; withCardLayout);" +
	"\n\t\t\tadd: (detailNavigPanel := ExtPanel new region: #center; withCardLayout);" +
	"\n\t\t\tyourself);" +
	"\n\t\t\"add: (right := ExtContainer new region: #east; width: 150);\"" +
	"\n\t\tadd: (mainPanel := ExtContainer new region: #center; withCardLayout);" +
	"\n\t\trenderTo: HTMLDocument current body;" +
	"\n\t\tshow",
	null, "2014-01-02T22:44:01Z", "mp", 1);

jst.FYDesktop.addMethod("initialize", "", "initialization", 
	"\tExtQuickTips init." +
	"\n\tExtViewport new" +
	"\n\t\twithBorderLayout;" +
	"\n\t\tadd: self topPanel;" +
	"\n\t\t\"add: (bottom := ExtContainer new region: #south; height: 23);\"" +
	"\n\t\tadd: (left := ExtContainer new region: (ExtSplitRegion west minWidth: 150); width: 250; withBorderLayout;" +
	"\n\t\t\tadd: (masterNavigPanel := ExtPanel new " +
	"\n\t\t\t\tborder: false;" +
	"\n\t\t\t\tregion: (ExtSplitRegion north minHeight: 100); height: 350; withCardLayout);" +
	"\n\t\t\tadd: (detailNavigPanel := ExtPanel new region: #center; withCardLayout);" +
	"\n\t\t\tyourself);" +
	"\n\t\t\"add: (right := ExtContainer new region: #east; width: 150);\"" +
	"\n\t\tadd: (mainPanel := ExtContainer new region: #center; withCardLayout);" +
	"\n\t\trenderTo: HTMLDocument current body;" +
	"\n\t\tshow",
	null, "2014-01-30T09:41:09Z", "mp", 1);

jst.FYDesktop.addMethod("initialize", "", "initialization", 
	"\tExtQuickTips init." +
	"\n\tExtViewport new" +
	"\n\t\twithBorderLayout;" +
	"\n\t\tadd: self topPanel;" +
	"\n\t\tadd: (bottom := self createFooter region: #south);" +
	"\n\t\tadd: (left := ExtContainer new region: (ExtSplitRegion west minWidth: 150); width: 250; withBorderLayout;" +
	"\n\t\t\ton: #afterrender do: [:p | \"korekce schovaneho spodku panelu - funguje!!!\"" +
	"\n\t\t\t\t[p width: p width - 1] delayed: 100];" +
	"\n\t\t\tadd: (masterNavigPanel := ExtPanel new " +
	"\n\t\t\t\tborder: false;" +
	"\n\t\t\t\tregion: (ExtSplitRegion north minHeight: 100); height: 300; withCardLayout);" +
	"\n\t\t\tadd: (detailNavigPanel := ExtPanel new region: #center; withCardLayout);" +
	"\n\t\t\tyourself);" +
	"\n\t\t\"add: (right := ExtContainer new region: #east; width: 150);\"" +
	"\n\t\tadd: (mainPanel := ExtContainer new region: #center; withCardLayout);" +
	"\n\t\trenderTo: HTMLDocument current body;" +
	"\n\t\tshow.",
	null, "2014-02-13T22:21:18Z", "mp", 1);

jst.FYDesktop.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tExtQuickTips init." +
	"\n\tExtViewport new" +
	"\n\t\twithBorderLayout;" +
	"\n\t\tadd: self topPanel;" +
	"\n\t\tadd: (bottom := self createFooter region: #south);" +
	"\n\t\tadd: (left := ExtContainer new region: (ExtSplitRegion west minWidth: 150); width: 250; withBorderLayout;" +
	"\n\t\t\ton: #afterrender do: [:p | \"korekce schovaneho spodku panelu - funguje!!!\"" +
	"\n\t\t\t\t[p width: p width - 1] delayed: 100];" +
	"\n\t\t\tadd: (masterNavigPanel := ExtPanel new " +
	"\n\t\t\t\tborder: false;" +
	"\n\t\t\t\tregion: (ExtSplitRegion north minHeight: 100); height: 300; withCardLayout);" +
	"\n\t\t\tadd: (detailNavigPanel := ExtPanel new region: #center; withCardLayout);" +
	"\n\t\t\tyourself);" +
	"\n\t\t\"add: (right := ExtContainer new region: #east; width: 150);\"" +
	"\n\t\tadd: (mainPanel := ExtContainer new region: #center; withCardLayout);" +
	"\n\t\trenderTo: HTMLDocument current body;" +
	"\n\t\tshow.",
	null, "2014-02-14T09:28:01Z", "mp"); //fytoportal

jst.FYDesktop.addMethod("createFooter", "", "private", 
	"\t^ ExtToolbar new" +
	"\n\t\tcls: 'fy-footer';" +
	"\n\t\taddFill;" +
	"\n\t\taddText: ' | ';" +
	"\n\t\tadd: Fytoportal navigator ior tiskMetodiky asButton;" +
	"\n\t\taddText: ' | ';" +
	"\n\t\taddSpace: 10;" +
	"\n\t\taddText: 'Ústřední kontrolní a zkušební ústav zemědělský © 2014';" +
	"\n\t\tyourself",
	null, "2014-02-13T22:21:31Z", "mp", 1); //fytoportal

jst.FYDesktop.addMethod("createFooter", "", "private", 
	"\t^ ExtToolbar new" +
	"\n\t\tcls: 'fy-footer';" +
	"\n\t\taddFill;" +
	"\n\t\taddText: ' | ';" +
	"\n\t\tadd: tiskMetodiky asButton;" +
	"\n\t\taddText: ' | ';" +
	"\n\t\taddSpace: 10;" +
	"\n\t\taddText: 'Ústřední kontrolní a zkušební ústav zemědělský © 2014';" +
	"\n\t\tyourself",
	null, "2014-02-14T09:09:12Z", "mp", 2);

jst.FYDesktop.addMethod("createFooter", "", "private", 
	"\t^ ExtToolbar new" +
	"\n\t\tcls: 'fy-footer';" +
	"\n\t\taddText: 'Publikováno: ', (Smalltalk at: #appVersion ifAbsent: ['probíhá vývoj...']);" +
	"\n\t\taddFill;" +
	"\n\t\taddText: ' | ';" +
	"\n\t\tadd: tiskMetodiky asButton;" +
	"\n\t\taddText: ' | ';" +
	"\n\t\taddSpace: 10;" +
	"\n\t\taddText: 'Ústřední kontrolní a zkušební ústav zemědělský © 2014';" +
	"\n\t\tyourself",
	null, "2014-05-06T13:27:05Z", "mp", 3);

jst.FYDesktop.addMethod("createFooter", "", "private", 
	"\t^ ExtToolbar new" +
	"\n\t\tcls: 'fy-footer';" +
	"\n\t\taddText: 'Publikováno: ', (Smalltalk at: #appVersion ifAbsent: ['(probíhá vývoj...)']);" +
	"\n\t\taddFill;" +
	"\n\t\taddText: ' | ';" +
	"\n\t\tadd: tiskMetodiky asSplitButton;" +
	"\n\t\taddText: ' | ';" +
	"\n\t\taddSpace: 10;" +
	"\n\t\taddText: 'Ústřední kontrolní a zkušební ústav zemědělský © 2014';" +
	"\n\t\tyourself",
	null, "2014-05-12T13:48:42Z", "mp"); //fytoportal

jst.FYDesktop.addMethod("topPanel", "", "accessing", 
	"\t^ top ifNil: [top := ExtContainer new region: #north; cls: 'zahlavi';" +
	"\n\t\tlayout: (ExtTableLayout new columns: 4; tableAttrs: {'width'. '100%'});" +
	"\n\t\tadd: (ExtComponent new rowspan: 3; cellCls: 'srslogo'; autoEl: {'tag'. 'img'. 'src'. 'srslogo.png'});" +
	"\n\t\tadd: (ExtComponent new id: 'startbtn');" +
	"\n\t\tadd: (self createNavigator colspan: 2; cellCls: 'navigace');" +
	"\n\t\tadd: (ExtComponent new colspan: 2; cellCls: 'nadpis'; contents: 'ROSTLINOLÉKAŘSKÝ PORTÁL');" +
	"\n\t\tadd: (FYUserInfoPanel new rowspan: 2; cellCls: 'userInfo');" +
	"\n\t\tadd: (ExtComponent new colspan: 2; cellId: 'path-info');" +
	"\n\t\tyourself]",
	null, "2012-12-11T21:56:49Z", "mp", 1);

jst.FYDesktop.addMethod("topPanel", "", "accessing", 
	"\t^ top ifNil: [top := ExtContainer new region: #north; cls: 'zahlavi';" +
	"\n\t\tlayout: (ExtTableLayout new columns: 4; tableAttrs: {'width'. '100%'});" +
	"\n\t\tadd: (ExtComponent new rowspan: 3; cellCls: 'srslogo'; autoEl: {'tag'. 'img'. 'src'. 'srslogo.png'});" +
	"\n\t\tadd: (ExtComponent new id: 'startbtn');" +
	"\n\t\tadd: (self createNavigator colspan: 2; cellCls: 'navigace');" +
	"\n\t\tadd: (ExtComponent new colspan: 2; cellCls: 'nadpis'; " +
	"\n\t\t\tcontents: 'Rostlinolékařský portál', ((Fytoportal db name endsWith: 'test') ifTrue: [' - TEST'] ifFalse: ''));" +
	"\n\t\tadd: (FYUserInfoPanel new rowspan: 2; cellCls: 'userInfo');" +
	"\n\t\tadd: (ExtComponent new colspan: 2; cellId: 'path-info');" +
	"\n\t\tyourself]",
	null, "2013-07-09T13:07:21Z", "mp", 1);

jst.FYDesktop.addMethod("topPanel", "", "accessing", 
	"\t^ top ifNil: [top := ExtContainer new region: #north; cls: 'zahlavi';" +
	"\n\t\tlayout: (ExtTableLayout new columns: 3; tableAttrs: {'width'. '100%'});" +
	"\n\t\tadd: (ExtComponent new rowspan: 3; cellCls: 'srslogo'; autoEl: {'tag'. 'img'. 'src'. 'srslogo.png'});" +
	"\n\t\tadd: (self createToolbar colspan: 2);" +
	"\n\t\tadd: (ExtComponent new cellCls: 'nadpis'; " +
	"\n\t\t\tcontents: 'Rostlinolékařský portál', ((Fytoportal db name endsWith: 'test') ifTrue: [' - TEST'] ifFalse: ''));" +
	"\n\t\tadd: (FYUserInfoPanel new rowspan: 2; cellCls: 'userInfo');" +
	"\n\t\tadd: (ExtComponent new cellId: 'path-info');" +
	"\n\t\tyourself]",
	null, "2013-08-01T09:39:51Z", "mp", 1);

jst.FYDesktop.addMethod("topPanel", "", "accessing", 
	"\t^ top ifNil: [top := ExtContainer new region: #north; cls: 'zahlavi';" +
	"\n\t\tlayout: (ExtTableLayout new columns: 3; tableAttrs: {'width'. '100%'});" +
	"\n\t\tadd: (ExtComponent new rowspan: 3; cellCls: 'ukzuzlogo'; autoEl: {'tag'. 'img'. 'src'. 'ukzuzlogo.png'});" +
	"\n\t\tadd: (self createToolbar colspan: 2);" +
	"\n\t\tadd: (ExtComponent new cellCls: 'nadpis'; " +
	"\n\t\t\tcontents: 'Rostlinolékařský portál', ((Fytoportal db name endsWith: 'test') ifTrue: [' - TEST'] ifFalse: ''));" +
	"\n\t\tadd: (FYUserInfoPanel new rowspan: 2; cellCls: 'userInfo');" +
	"\n\t\tadd: (ExtComponent new cellId: 'path-info');" +
	"\n\t\tyourself]",
	null, "2013-11-07T15:48:18Z", "mp", 1);

jst.FYDesktop.addMethod("topPanel", "", "accessing", 
	"\t^ top ifNil: [top := ExtContainer new region: #north; cls: 'zahlavi';" +
	"\n\t\tlayout: (ExtTableLayout new columns: 3; tableAttrs: {'width'. '100%'});" +
	"\n\t\tadd: (ExtComponent new rowspan: 3; cellCls: 'ukzuzlogo'; autoEl: {'tag'. 'img'. 'src'. 'ukzuzlogo.png'});" +
	"\n\t\tadd: (self createToolbar colspan: 2);" +
	"\n\t\tadd: (ExtComponent new cellCls: 'nadpis'; " +
	"\n\t\t\tcontents: 'Rostlinolékařský portál', (self isTest ifTrue: [' - TEST'] ifFalse: ''));" +
	"\n\t\tadd: (FYUserInfoPanel new rowspan: 2; cellCls: 'userInfo');" +
	"\n\t\tadd: (ExtComponent new cellId: 'path-info');" +
	"\n\t\tyourself]",
	null, "2014-04-07T13:16:17Z", "mp", 1);

jst.FYDesktop.addMethod("topPanel", "", "accessing", 
	"\t^ top ifNil: [top := ExtContainer new region: #north; " +
	"\n\t\tcls: 'zahlavi zahl-obr', (1 randomIntTo: 3) asString;" +
	"\n\t\tlayout: (ExtTableLayout new columns: 3; tableAttrs: {'width'. '100%'});" +
	"\n\t\tadd: (ExtComponent new rowspan: 3; cellCls: 'ukzuzlogo'; autoEl: {'tag'. 'img'. 'src'. 'ukzuzlogo.png'});" +
	"\n\t\tadd: (self createToolbar colspan: 2);" +
	"\n\t\tadd: (ExtComponent new cellCls: 'nadpis'; " +
	"\n\t\t\tcontents: 'Rostlinolékařský portál', (self isTest ifTrue: [' - TEST'] ifFalse: ''));" +
	"\n\t\tadd: (FYUserInfoPanel new rowspan: 2; cellCls: 'userInfo');" +
	"\n\t\tadd: (ExtComponent new cellId: 'path-info');" +
	"\n\t\tyourself]",
	null, "2014-04-19T21:07:44Z", "mp", 1);

jst.FYDesktop.addMethod("topPanel", "", "accessing", 
	"\t^ top ifNil: [top := ExtContainer new region: #north; " +
	"\n\t\tcls: 'zahlavi zahl-obr', (1 randomIntTo: 10) asString;" +
	"\n\t\tlayout: (ExtTableLayout new columns: 3; tableAttrs: {'width'. '100%'});" +
	"\n\t\tadd: (ExtComponent new rowspan: 3; cellCls: 'ukzuzlogo'; htmlContents: [:html |" +
	"\n\t\t\thtml anchor href: 'http://www.ukzuz.cz'; target: 'ukzuz'; with: [" +
	"\n\t\t\t\thtml  img src: 'ukzuzlogo.png'; title: 'Ústřední kontrolní a zkušební ústav zemědělský']]);" +
	"\n\t\tadd: (self createToolbar colspan: 2);" +
	"\n\t\tadd: (ExtComponent new cellCls: 'nadpis'; " +
	"\n\t\t\tcontents: 'Rostlinolékařský portál', (self isTest ifTrue: [' - TEST'] ifFalse: ''));" +
	"\n\t\tadd: (FYUserInfoPanel new rowspan: 2; cellCls: 'userInfo');" +
	"\n\t\tadd: (ExtComponent new cellId: 'path-info');" +
	"\n\t\tyourself]",
	null, "2014-04-26T20:22:37Z", "mp"); //fytoportal

jst.FYDesktop.addMethod("createToolbar", "", "private", 
	"\t| groupId |" +
	"\n\tgroupId := ExtCore current nextId." +
	"\n\t^ ExtToolbar new" +
	"\n\t\tcls: 'fytoportal-menu';" +
	"\n\t\tadd: (ExtComponent new id: 'startbtn');" +
	"\n\t\taddSeparator;" +
	"\n\t\tadd: (ExtSplitButton new " +
	"\n\t\t\tcls: 'modul';" +
	"\n\t\t\ttext: 'Integrovaná ochrana rostlin (IOR)';" +
	"\n\t\t\t\"toggleGroup: groupId; allowDepress: false; bePressed;\"" +
	"\n\t\t\ton: #click do: [Fytoportal navigator ior toggle];" +
	"\n\t\t\ton: #arrowclick do: [Fytoportal navigator ior toggle];" +
	"\n\t\t\tmenu: (ExtMenu new add: (ExtMenuItem new text: 'Tisk metodiky'); yourself));" +
	"\n\t\taddSeparator;" +
	"\n\t\tadd: (ExtButton new " +
	"\n\t\t\tcls: 'modul';" +
	"\n\t\t\ttext: 'Fotogalerie';" +
	"\n\t\t\t\"toggleGroup: groupId; allowDepress: false;\"" +
	"\n\t\t\ton: #click do: [Fytoportal navigator fotogalerie toggle]);" +
	"\n\t\taddSeparator;" +
	"\n\t\tyourself",
	null, "2013-08-01T14:16:45Z", "mp", 1);

jst.FYDesktop.addMethod("createToolbar", "", "private", 
	"\t^ ExtToolbar new" +
	"\n\t\tcls: 'fytoportal-menu';" +
	"\n\t\tadd: (ExtComponent new id: 'startbtn');" +
	"\n\t\taddSeparator;" +
	"\n\t\tadd: (ExtSplitButton new " +
	"\n\t\t\tcls: 'modul';" +
	"\n\t\t\ttext: 'Integrovaná ochrana rostlin (IOR)';" +
	"\n\t\t\t\"toggleGroup: groupId; allowDepress: false; bePressed;\"" +
	"\n\t\t\ton: #click do: [Fytoportal navigator ior toggle];" +
	"\n\t\t\ton: #arrowclick do: [Fytoportal navigator ior toggle];" +
	"\n\t\t\tmenu: (ExtMenu new add: (ExtMenuItem new text: 'Tisk metodiky'); yourself));" +
	"\n\t\taddSeparator;" +
	"\n\t\tadd: (ExtButton new " +
	"\n\t\t\tcls: 'modul';" +
	"\n\t\t\ttext: 'Fotogalerie';" +
	"\n\t\t\t\"toggleGroup: groupId; allowDepress: false;\"" +
	"\n\t\t\ton: #click do: [Fytoportal navigator fotogalerie toggle]);" +
	"\n\t\taddSeparator;" +
	"\n\t\tyourself",
	null, "2013-08-01T14:47:40Z", "mp", 2);

jst.FYDesktop.addMethod("createToolbar", "", "private", 
	"\t^ ExtToolbar new" +
	"\n\t\tcls: 'fytoportal-menu';" +
	"\n\t\tadd: (ExtComponent new id: 'startbtn');" +
	"\n\t\taddSeparator;" +
	"\n\t\tadd: (ExtSplitButton new " +
	"\n\t\t\tcls: 'modul';" +
	"\n\t\t\ttext: 'Integrovaná ochrana rostlin (IOR)';" +
	"\n\t\t\t\"toggleGroup: groupId; allowDepress: false; bePressed;\"" +
	"\n\t\t\ton: #click do: [Fytoportal navigator ior trackHistory: [:p | p  toggle]];" +
	"\n\t\t\ton: #arrowclick do: [Fytoportal navigator ior trackHistory: [:p | p toggle]];" +
	"\n\t\t\tmenu: (ExtMenu new add: (ExtMenuItem new text: 'Tisk metodiky'); yourself));" +
	"\n\t\taddSeparator;" +
	"\n\t\tadd: (ExtButton new " +
	"\n\t\t\tcls: 'modul';" +
	"\n\t\t\ttext: 'Fotogalerie';" +
	"\n\t\t\t\"toggleGroup: groupId; allowDepress: false;\"" +
	"\n\t\t\ton: #click do: [Fytoportal navigator fotogalerie trackHistory: [:p | p toggle]]);" +
	"\n\t\taddSeparator;" +
	"\n\t\tyourself",
	null, "2013-08-10T14:32:04Z", "mp", 3);

jst.FYDesktop.addMethod("createToolbar", "", "private", 
	"\t^ ExtToolbar new" +
	"\n\t\tcls: 'fytoportal-menu';" +
	"\n\t\tadd: (ExtComponent new id: 'startbtn');" +
	"\n\t\taddSeparator;" +
	"\n\t\tadd: (ExtSplitButton new " +
	"\n\t\t\tcls: 'modul';" +
	"\n\t\t\ttext: 'Integrovaná ochrana rostlin (IOR)';" +
	"\n\t\t\t\"toggleGroup: groupId; allowDepress: false; bePressed;\"" +
	"\n\t\t\ton: #click do: [Fytoportal navigator ior trackHistory: [:p | p  switchPath]];" +
	"\n\t\t\tmenu: Fytoportal navigator ior createMenu);" +
	"\n\t\taddSeparator;" +
	"\n\t\tadd: (ExtButton new " +
	"\n\t\t\tcls: 'modul';" +
	"\n\t\t\ttext: 'Fotogalerie';" +
	"\n\t\t\t\"toggleGroup: groupId; allowDepress: false;\"" +
	"\n\t\t\ton: #click do: [Fytoportal navigator fotogalerie trackHistory: [:p | p switchPath]]);" +
	"\n\t\taddSeparator;" +
	"\n\t\tyourself",
	null, "2013-08-28T12:03:09Z", "mp", 4);

jst.FYDesktop.addMethod("createToolbar", "", "private", 
	"\t^ ExtToolbar new" +
	"\n\t\tcls: 'fytoportal-menu';" +
	"\n\t\tadd: (ExtComponent new id: 'startbtn');" +
	"\n\t\taddSeparator;" +
	"\n\t\tadd: (ExtSplitButton new " +
	"\n\t\t\tcls: 'modul';" +
	"\n\t\t\ttext: 'Integrovaná ochrana rostlin (IOR)';" +
	"\n\t\t\t\"toggleGroup: groupId; allowDepress: false; bePressed;\"" +
	"\n\t\t\ton: #click do: [Fytoportal navigator ior trackHistory: [:p | " +
	"\n\t\t\t\tp  switchPathOn: #modul]];" +
	"\n\t\t\tmenu: Fytoportal navigator ior createMenu);" +
	"\n\t\taddSeparator;" +
	"\n\t\tadd: (ExtButton new " +
	"\n\t\t\tcls: 'modul';" +
	"\n\t\t\ttext: 'Fotogalerie';" +
	"\n\t\t\t\"toggleGroup: groupId; allowDepress: false;\"" +
	"\n\t\t\ton: #click do: [Fytoportal navigator fotogalerie trackHistory: [:p | " +
	"\n\t\t\t\tp switchPathOn: #modul]]);" +
	"\n\t\taddSeparator;" +
	"\n\t\tyourself",
	null, "2013-09-02T19:26:03Z", "mp", 5);

jst.FYDesktop.addMethod("createToolbar", "", "private", 
	"\t^ ExtToolbar new" +
	"\n\t\tcls: 'fytoportal-menu';" +
	"\n\t\tadd: (ExtComponent new id: 'startbtn');" +
	"\n\t\taddSeparator;" +
	"\n\t\tadd: (ExtSplitButton new " +
	"\n\t\t\tcls: 'modul';" +
	"\n\t\t\ttext: 'Integrovaná ochrana rostlin (IOR)';" +
	"\n\t\t\t\"toggleGroup: groupId; allowDepress: false; bePressed;\"" +
	"\n\t\t\ton: #click do: [Fytoportal navigator ior trackHistory: [:p | " +
	"\n\t\t\t\tp  switchPath]];" +
	"\n\t\t\tmenu: Fytoportal navigator ior createMenu);" +
	"\n\t\taddSeparator;" +
	"\n\t\tadd: (ExtButton new " +
	"\n\t\t\tcls: 'modul';" +
	"\n\t\t\ttext: 'Fotogalerie';" +
	"\n\t\t\t\"toggleGroup: groupId; allowDepress: false;\"" +
	"\n\t\t\ton: #click do: [Fytoportal navigator fotogalerie trackHistory: [:p | " +
	"\n\t\t\t\tp switchPath]]);" +
	"\n\t\taddSeparator;" +
	"\n\t\tyourself",
	null, "2013-09-03T08:09:47Z", "mp", 6);

jst.FYDesktop.addMethod("createToolbar", "", "private", 
	"\t^ ExtToolbar new" +
	"\n\t\tcls: 'fytoportal-menu';" +
	"\n\t\tadd: (ExtComponent new id: 'startbtn');" +
	"\n\t\taddSeparator;" +
	"\n\t\tadd: (ExtSplitButton new " +
	"\n\t\t\tcls: 'modul';" +
	"\n\t\t\ttext: 'Integrovaná ochrana rostlin';" +
	"\n\t\t\t\"toggleGroup: groupId; allowDepress: false; bePressed;\"" +
	"\n\t\t\ton: #click do: [Fytoportal navigator ior trackHistory: [:p | " +
	"\n\t\t\t\tp  switchPath]];" +
	"\n\t\t\tmenu: Fytoportal navigator ior createMenu);" +
	"\n\t\taddSeparator;" +
	"\n\t\tadd: (ExtButton new " +
	"\n\t\t\tcls: 'modul';" +
	"\n\t\t\ttext: 'Fotogalerie';" +
	"\n\t\t\t\"toggleGroup: groupId; allowDepress: false;\"" +
	"\n\t\t\ton: #click do: [Fytoportal navigator fotogalerie trackHistory: [:p | " +
	"\n\t\t\t\tp switchPath]]);" +
	"\n\t\taddSeparator;" +
	"\n\t\tyourself",
	null, "2014-01-28T22:40:39Z", "mp", 7);

jst.FYDesktop.addMethod("createToolbar", "", "private", 
	"\t^ ExtToolbar new" +
	"\n\t\tcls: 'fytoportal-menu';" +
	"\n\t\tadd: (ExtComponent new id: 'startbtn');" +
	"\n\t\tadd: (ExtSplitButton new " +
	"\n\t\t\tcls: 'modul';" +
	"\n\t\t\ttext: 'Integrovaná ochrana rostlin';" +
	"\n\t\t\t\"toggleGroup: groupId; allowDepress: false; bePressed;\"" +
	"\n\t\t\ton: #click do: [Fytoportal navigator ior trackHistory: [:p | " +
	"\n\t\t\t\tp  switchPath]];" +
	"\n\t\t\tmenu: Fytoportal navigator ior createMenu);" +
	"\n\t\taddSpace: 5;" +
	"\n\t\tadd: (ExtButton new " +
	"\n\t\t\tcls: 'modul';" +
	"\n\t\t\ttext: 'Fotogalerie';" +
	"\n\t\t\t\"toggleGroup: groupId; allowDepress: false;\"" +
	"\n\t\t\ton: #click do: [Fytoportal navigator fotogalerie trackHistory: [:p | " +
	"\n\t\t\t\tp switchPath]]);" +
	"\n\t\tyourself",
	null, "2014-01-30T08:29:43Z", "mp", 8);

jst.FYDesktop.addMethod("createToolbar", "", "private", 
	"\t^ ExtToolbar new" +
	"\n\t\tcls: 'fytoportal-menu';" +
	"\n\t\tadd: (ExtComponent new id: 'startbtn');" +
	"\n\t\tadd: (ExtButton new " +
	"\n\t\t\tcls: 'modul';" +
	"\n\t\t\ttext: 'Integrovaná ochrana rostlin';" +
	"\n\t\t\t\"toggleGroup: groupId; allowDepress: false; bePressed;\"" +
	"\n\t\t\ton: #click do: [Fytoportal navigator ior trackHistory: [:p | " +
	"\n\t\t\t\tp  switchPath]]);" +
	"\n\t\taddSpace: 5;" +
	"\n\t\tadd: (ExtButton new " +
	"\n\t\t\tcls: 'modul';" +
	"\n\t\t\ttext: 'Fotogalerie';" +
	"\n\t\t\t\"toggleGroup: groupId; allowDepress: false;\"" +
	"\n\t\t\ton: #click do: [Fytoportal navigator fotogalerie trackHistory: [:p | " +
	"\n\t\t\t\tp switchPath]]);" +
	"\n\t\tyourself",
	null, "2014-02-14T09:32:58Z", "mp", 9);

jst.FYDesktop.addMethod("createToolbar", "", "private", 
	"\t^ ExtToolbar new" +
	"\n\t\tcls: 'fytoportal-menu';" +
	"\n\t\tadd: (ExtComponent new id: 'startbtn');" +
	"\n\t\tadd: (ExtButton new " +
	"\n\t\t\tcls: 'modul';" +
	"\n\t\t\ttext: 'Metodiky IOR';" +
	"\n\t\t\t\"toggleGroup: groupId; allowDepress: false; bePressed;\"" +
	"\n\t\t\ton: #click do: [Fytoportal navigator ior trackHistory: [:p | " +
	"\n\t\t\t\tp  switchPath]]);" +
	"\n\t\taddSpace: 5;" +
	"\n\t\tadd: (ExtButton new " +
	"\n\t\t\tcls: 'modul';" +
	"\n\t\t\ttext: 'Fotogalerie';" +
	"\n\t\t\t\"toggleGroup: groupId; allowDepress: false;\"" +
	"\n\t\t\ton: #click do: [Fytoportal navigator fotogalerie trackHistory: [:p | " +
	"\n\t\t\t\tp switchPath]]);" +
	"\n\t\tyourself",
	null, "2014-05-13T13:00:35Z", "mp"); //fytoportal

/*
jst.FYDesktop.addMethod("createNavigator", "", "private", 
	"\t^ ExtContainer new" +
	"\n\t\tadd: (ExtComponent new autoEl: {'tag'. 'a'. 'href'. '#'. 'html'. 'Integrovaná ochrana rostlin (IOR)'};" +
	"\n\t\t\ton: #click do: [Fytoportal navigator ior toggle]);" +
	"\n\t\tadd: (ExtComponent new autoEl: {'tag'. 'span'. 'html'. ' | '});" +
	"\n\t\tadd: (ExtComponent new autoEl: {'tag'. 'a'. 'href'. '#'. 'html'. 'Fotogalerie'};" +
	"\n\t\t\ton: #click do: [Fytoportal navigator fotogalerie toggle]);" +
	"\n\t\tyourself",
	null, "2012-11-08T13:53:48Z", "mp");

jst.FYDesktop.addMethod("createUserInfoPanel", "", "private", 
	"\t| user login logout |" +
	"\n\t^ ExtContainer new" +
	"\n\t\tcls: 'x-panel-mc';" +
	"\n\t\tadd: (user := ExtComponent new);" +
	"\n\t\tadd: (login := ExtComponent new autoEl: {'tag'. 'a'. 'href'. '#'. 'html'. 'Přihlásit'};" +
	"\n\t\t\ton: #click do: [ExtLoginDialog new " +
	"\n\t\t\t\tonLogin: [:name :passwd | | data |" +
	"\n\t\t\t\t\tdata := CouchDB current login: name password: passwd secure: true. " +
	"\n\t\t\t\t\tuser contents: 'Přihlášený uživatel: ', name." +
	"\n\t\t\t\t\tlogin hide. " +
	"\n\t\t\t\t\tlogout show." +
	"\n\t\t\t\t\tmainPanel broadcastEvent: #'loginUser:' with: data];" +
	"\n\t\t\t\tshow]);" +
	"\n\t\tadd: (logout := ExtComponent new autoEl: {'tag'. 'a'. 'href'. '#'. 'html'. 'Odhlásit'}; hide;" +
	"\n\t\t\ton: #click do: [" +
	"\n\t\t\t\tCouchDB current logout. " +
	"\n\t\t\t\tuser contents: ''." +
	"\n\t\t\t\tlogout hide. " +
	"\n\t\t\t\tlogin show." +
	"\n\t\t\t\tmainPanel broadcastEvent: #logout]);" +
	"\n\t\tyourself",
	null, "2012-12-10T13:14:07Z", "mp");

jst.FYDesktop.addMethod("createUserInfoPanel", "", "private", 
	"\t| user login logout |" +
	"\n\t^ ExtContainer new" +
	"\n\t\tcls: 'x-panel-mc';" +
	"\n\t\tadd: (user := ExtComponent new);" +
	"\n\t\tadd: (login := ExtComponent new autoEl: {'tag'. 'a'. 'href'. '#'. 'html'. 'Přihlásit'};" +
	"\n\t\t\ton: #click do: [ExtLoginDialog new " +
	"\n\t\t\t\tonLogin: [:name :passwd | | data |" +
	"\n\t\t\t\t\tdata := CouchDB current login: name password: passwd secure: true. " +
	"\n\t\t\t\t\tuser contents: 'Přihlášený uživatel: ', name." +
	"\n\t\t\t\t\tlogin hide. " +
	"\n\t\t\t\t\tlogout show." +
	"\n\t\t\t\t\tFytoportal data userInfo: data asDictionary." +
	"\n\t\t\t\t\tmainPanel broadcastEvent: #loggedIn];" +
	"\n\t\t\t\tshow]);" +
	"\n\t\tadd: (logout := ExtComponent new autoEl: {'tag'. 'a'. 'href'. '#'. 'html'. 'Odhlásit'}; hide;" +
	"\n\t\t\ton: #click do: [" +
	"\n\t\t\t\tCouchDB current logout. " +
	"\n\t\t\t\tuser contents: ''." +
	"\n\t\t\t\tlogout hide. " +
	"\n\t\t\t\tlogin show." +
	"\n\t\t\t\tFytoportal data userInfo: nil." +
	"\n\t\t\t\tmainPanel broadcastEvent: #loggedOut]);" +
	"\n\t\tyourself",
	null, "2012-12-11T20:22:32Z", "mp"); //jst-fytoportal
*/

//*** FYUserInfoPanel ***

jst.FYUserInfoPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\tcls: 'x-panel-mc';" +
	"\n\t\tadd: (user := ExtComponent new);" +
	"\n\t\tadd: (login := ExtComponent new autoEl: {'tag'. 'a'. 'href'. '#'. 'html'. 'Přihlásit'};" +
	"\n\t\t\ton: #click do: [ExtLoginDialog new " +
	"\n\t\t\t\tonLogin: [:name :passwd | | userInfo |" +
	"\n\t\t\t\t\tuserInfo := Fytoportal db server login: name password: passwd secure: false. " +
	"\n\t\t\t\t\tself broadcastEvent: #loggedIn: with: userInfo];" +
	"\n\t\t\t\tshow]);" +
	"\n\t\tadd: (logout := ExtComponent new autoEl: {'tag'. 'a'. 'href'. '#'. 'html'. 'Odhlásit'}; hide;" +
	"\n\t\t\ton: #click do: [" +
	"\n\t\t\t\tFytoportal db server logout. " +
	"\n\t\t\t\tself broadcastEvent: #loggedOut])",
	null, "2012-12-19T22:58:27Z", "mp", 1);

jst.FYUserInfoPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\tcls: 'x-panel-mc';" +
	"\n\t\tadd: (user := ExtComponent new);" +
	"\n\t\tadd: (login := ExtComponent new autoEl: {'tag'. 'a'. 'href'. '#'. 'html'. 'Přihlásit'};" +
	"\n\t\t\ton: #click do: [ExtLoginDialog new " +
	"\n\t\t\t\tonLogin: [:name :passwd |" +
	"\n\t\t\t\t\tFytoportal db server login: name password: passwd secure: false];" +
	"\n\t\t\t\tshow]);" +
	"\n\t\tadd: (logout := ExtComponent new autoEl: {'tag'. 'a'. 'href'. '#'. 'html'. 'Odhlásit'}; hide;" +
	"\n\t\t\ton: #click do: [Fytoportal db server logout])",
	null, "2012-12-21T21:11:01Z", "mp", 1);

jst.FYUserInfoPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\tcls: 'x-panel-mc';" +
	"\n\t\tadd: (user := ExtComponent new);" +
	"\n\t\tadd: (login := ExtComponent new autoEl: {'tag'. 'a'. 'href'. '#'. 'html'. 'Přihlásit'};" +
	"\n\t\t\ton: #click do: [:ev :elm | " +
	"\n\t\t\t\telm hash: ExtHistory current activeToken." +
	"\n\t\t\t\tExtLoginDialog new onLogin: [:name :passwd |" +
	"\n\t\t\t\t\tFytoportal db server login: name password: passwd secure: false];" +
	"\n\t\t\t\tshow]);" +
	"\n\t\tadd: (logout := ExtComponent new autoEl: {'tag'. 'a'. 'href'. '#'. 'html'. 'Odhlásit'}; hide;" +
	"\n\t\t\ton: #click do: [:ev :elm |" +
	"\n\t\t\t\telm hash: ExtHistory current activeToken." +
	"\n\t\t\t\tFytoportal db server logout])",
	null, "2013-08-19T13:32:32Z", "mp", 1);

jst.FYUserInfoPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\tcls: 'x-panel-mc';" +
	"\n\t\tadd: (user := ExtComponent new);" +
	"\n\t\tadd: (login := ExtComponent new autoEl: {'tag'. 'a'. 'href'. '#'. 'html'. 'Přihlásit'};" +
	"\n\t\t\ton: #click do: [:ev :elm | " +
	"\n\t\t\t\tExtHistory current activeToken ifNotNilDo: [:token | elm hash: token]." +
	"\n\t\t\t\tExtLoginDialog new onLogin: [:name :passwd |" +
	"\n\t\t\t\t\tFytoportal db server login: name password: passwd secure: false];" +
	"\n\t\t\t\tshow]);" +
	"\n\t\tadd: (logout := ExtComponent new autoEl: {'tag'. 'a'. 'href'. '#'. 'html'. 'Odhlásit'}; hide;" +
	"\n\t\t\ton: #click do: [:ev :elm |" +
	"\n\t\t\t\tExtHistory current activeToken ifNotNilDo: [:token | elm hash: token]." +
	"\n\t\t\t\tFytoportal db server logout])",
	null, "2013-09-04T14:10:56Z", "mp", 1);

jst.FYUserInfoPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\tcls: 'x-panel-mc';" +
	"\n\t\tstyle: 'background-color: transparent';" +
	"\n\t\tadd: (user := ExtComponent new);" +
	"\n\t\tadd: (login := ExtComponent new autoEl: {'tag'. 'a'. 'href'. '#'. 'html'. 'Přihlásit'};" +
	"\n\t\t\ton: #click do: [:ev :elm | " +
	"\n\t\t\t\tExtHistory current activeToken ifNotNilDo: [:token | elm hash: token]." +
	"\n\t\t\t\tExtLoginDialog new onLogin: [:name :passwd |" +
	"\n\t\t\t\t\tFytoportal db server login: name password: passwd secure: false];" +
	"\n\t\t\t\tshow]);" +
	"\n\t\tadd: (logout := ExtComponent new autoEl: {'tag'. 'a'. 'href'. '#'. 'html'. 'Odhlásit'}; hide;" +
	"\n\t\t\ton: #click do: [:ev :elm |" +
	"\n\t\t\t\tExtHistory current activeToken ifNotNilDo: [:token | elm hash: token]." +
	"\n\t\t\t\tFytoportal db server logout])",
	null, "2013-12-18T21:44:14Z", "mp", 1);

jst.FYUserInfoPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\tcls: 'x-panel-mc';" +
	"\n\t\tstyle: 'background-color: transparent';" +
	"\n\t\tadd: (user := ExtComponent new);" +
	"\n\t\tadd: (login := ExtComponent new autoEl: {'tag'. 'a'. 'href'. '#'. 'html'. 'Přihlásit'};" +
	"\n\t\t\ton: #click do: [:ev :elm | " +
	"\n\t\t\t\tExtHistory current activeToken ifNotNilDo: [:token | elm hash: token]." +
	"\n\t\t\t\tExtLoginDialog new onLogin: [:name :passwd |" +
	"\n\t\t\t\t\tFytoportal db server login: name password: passwd secure: false];" +
	"\n\t\t\t\tshow]);" +
	"\n\t\tadd: (logout := ExtComponent new autoEl: {'tag'. 'a'. 'href'. '#'. 'html'. 'Odhlásit'}; hide;" +
	"\n\t\t\ton: #click do: [:ev :elm |" +
	"\n\t\t\t\tExtHistory current activeToken ifNotNilDo: [:token | elm hash: token]." +
	"\n\t\t\t\tFytoportal db server logout]);" +
	"\n\t\tisVisible: Browser location isPublic not",
	null, "2014-01-20T21:16:09Z", "mp"); //fytoportal

jst.FYUserInfoPanel.addMethod("loggedIn", "", "events", 
	"\tself loginChanged." +
	"\n\tlogin hide. " +
	"\n\tlogout show",
	null, "2012-12-21T21:29:46Z", "mp");

jst.FYUserInfoPanel.addMethod("loginChanged", "", "events", 
	"\tuser contents: 'Přihlášený uživatel: ', (Fytoportal db server userInfo at: #name)",
	null, "2012-12-21T21:29:59Z", "mp");

jst.FYUserInfoPanel.addMethod("loggedOut", "", "events", 
	"\tuser contents: ''." +
	"\n\tlogout hide. " +
	"\n\tlogin show",
	null, "2012-12-19T21:34:11Z", "mp");

jst.FYUserInfoPanel.addMethod("loginExpired", "", "events", 
	"\tself loggedOut",
	null, "2012-12-21T21:13:19Z", "mp");
