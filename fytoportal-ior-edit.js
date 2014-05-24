/*
 * Copyright (c) 2013 Michal Perutka <michal.perutka@gmail.com>
 *
 *
 * Depends on jst-core, jst-core-proxy, jst-parser, jst-kernel, jst-dom, jst-applications, jst-couchdb, jst-ext, 
 *   fytoportal-core, fytoportal-ior
 */

jst.currentJsFile = "fytoportal-ior-edit";

// *** CLASSES ***

//potomci trid z IOR

jst.FYMetodikyPanel.subclass("FYMetodikyEditPanel", "navig editCheck", "", "", "SRS-Fytoportal-IOR-edit");

jst.FYKapitolaPanel.subclass("FYKapitolaEditPanel", "", "", "", "SRS-Fytoportal-IOR-edit");

jst.ExtPanel.subclass("FYMetodikaSOPopisEditor", "data editor taxony metodika", "", "", "SRS-Fytoportal-IOR-edit");

jst.FYTextKapitolyPanel.subclass("FYTextKapitolyNahled", "", "", "", "SRS-Fytoportal-IOR-edit");

//nove tridy

//jst.ExtFormPanel.subclass("FYIOREditNavig", "editCheck", "", "", "SRS-Fytoportal-IOR-edit");

jst.ExtTabPanel.subclass("FYIOREditor", "editorPM", "", "", "SRS-Fytoportal-IOR-edit");

jst.ExtPanel.subclass("FYMetodikaEditor", "masterNavig detailNavig toolbar obsah", "", "", "SRS-Fytoportal-IOR-edit");

jst.FYMetodikaEditor.subclass("FYMetodikaSOEditor", "typ data editorPopisu editorKapitoly nahledKapitoly", "", "", "SRS-Fytoportal-IOR-edit");

jst.FYMetodikaEditor.subclass("FYPMEditor", "publicBox", "", "", "SRS-Fytoportal-IOR-edit");

jst.ExtPanel.subclass("FYPMObsahEditor", "metodika panely nahledKap", "", "", "SRS-Fytoportal-IOR-edit");

jst.ExtContainer.subclass("FYPMVyberPolozek", "kapId grid vyber novyVyber saveBtn cancelBtn nazvy kapitola", "", "", "SRS-Fytoportal-IOR-edit");

jst.FYPMVyberPolozek.subclass("FYPMVyberPlodin", "", "", "", "SRS-Fytoportal-IOR-edit");

jst.FYKapitolaEditPanel.subclass("FYKapitolaSOEditPanel", "", "", "", "SRS-Fytoportal-IOR-edit");

jst.ExtContainer.subclass("FYTextKapitolyEditor", "title info editor osnova kapitola kapitolaSO metodika metodikaSO", "", "", "SRS-Fytoportal-IOR-edit");

jst.ExtPanel.subclass("FYMapovaniPouzitiPOR", "typ taxony pouziti taxonyDetail pouzitiDetail ulozitBtn stornoBtn checkchange filtr", "", "", "SRS-Fytoportal-IOR-edit");

//extensions

//FYDataMetodiky

jst.FYDataMetodiky.addMethod("doplnKapitolu:", "kapId", "*srs-fytoportal-ior-edit", 
	"\t| kap |" +
	"\n\t\"doplnim zadanou kapitolu prvni urovne podle osnovy do vsech metodik a pridruzenych obecnych metodik\"" +
	"\n\tkap := (Fytoportal data osnovaMetodiky: #metodika) at: kapId." +
	"\n\tself metodikyPlodin do: [:row | " +
	"\n\t\t| met |" +
	"\n\t\tmet := OrderedCollection with: (db loadObject: row id)." +
	"\n\t\tmet first obecnaMetodika ifNotNilDo: [:m | " +
	"\n\t\t\tmet add: m]." +
	"\n\t\tmet do: [:m | m at: kapId ifAbsent: [" +
	"\n\t\t\tm at: kapId put: kap." +
	"\n\t\t\tdb storeObject: m]]" +
	"\n\t]",
	null, "2014-03-18T15:05:02Z", "mp");

jst.FYDataMetodiky.addMethod("zrusKapitolu:", "kapId", "*srs-fytoportal-ior-edit", 
	"\t\"zrusim zadanou kapitolu prvni urovne ve vsech metodikach i pridruzenych obecnych metodikach\"" +
	"\n\tself metodikyPlodin do: [:row | " +
	"\n\t\t| met |" +
	"\n\t\tmet := OrderedCollection with: (db loadObject: row id)." +
	"\n\t\tmet first obecnaMetodika ifNotNilDo: [:m | " +
	"\n\t\t\tmet add: m]." +
	"\n\t\tmet do: [:m | " +
	"\n\t\t\t(m removeKey: kapId ifAbsent: nil) ifNotNil: [" +
	"\n\t\t\t\tdb storeObject: m]]" +
	"\n\t]",
	null, "2014-03-18T15:11:23Z", "mp");

//FYTaxon

jst.FYTaxon.addMethod("jeZmenen", "", "*srs-fytoportal-ior-edit", 
	"\t^ zmeny notNil and: [zmeny asDictionary ~= self asDictionary]",
	null, "2013-02-03T22:03:05Z", "mp");

//FYKapitola

jst.FYKapitola.addMethod("jeZmenena", "", "*srs-fytoportal-ior-edit", 
	"\t^ self anySatisfy: [:kap | kap jeZmenena]",
	null, "2013-02-02T19:42:15Z", "mp");

jst.FYKapitola.addMethod("zmenKapitolu:podle:", "aString kapOsnovy", "*srs-fytoportal-ior-edit", 
	"\t| s kap kapId osnova |" +
	"\n\tosnova := kapOsnovy root." +
	"\n\tkap := self." +
	"\n\ts := kapOsnovy id readStream." +
	"\n\t[s atEnd] whileFalse: [" +
	"\n\t\tosnova := osnova at: (kapId := s upTo: '.')." +
	"\n\t\tkap := kap " +
	"\n\t\t\tat: kapId " +
	"\n\t\t\tifAbsentPut: [osnova copyEmpty parent: kap]]." +
	"\n\t^ kap zmeny: aString",
	null, "2013-02-05T22:40:16Z", "mp", 1);

jst.FYKapitola.addMethod("zmenKapitolu:podle:", "aString kapOsnovy", "*srs-fytoportal-ior-edit", 
	"\t| s kap kapId osnova |" +
	"\n\tosnova := kapOsnovy root." +
	"\n\tkap := self." +
	"\n\ts := kapOsnovy id readStream." +
	"\n\t[s atEnd] whileFalse: [" +
	"\n\t\tosnova := osnova at: (kapId := s upTo: '.')." +
	"\n\t\tkap := kap " +
	"\n\t\t\tat: kapId " +
	"\n\t\t\tifAbsentPut: [osnova copyEmpty parent: kap]]." +
	"\n\tkap zmeny: aString." +
	"\n\tkap isEmpty ifTrue: [ | p k |" +
	"\n\t\t\"prazdnou kapitolu musim vyjmout, vcetne nadrazenych, pokud budou taky prazdne\"" +
	"\n\t\tp := kap parent." +
	"\n\t\tk := kap." +
	"\n\t\t[p removeKey: ((k id copyAfterLast: '.') ifEmpty: [k id])." +
	"\n\t\t\tk := p." +
	"\n\t\t\tp := k parent." +
	"\n\t\t\tp notNil and: [k isEmpty]] whileTrue." +
	"\n\t]." +
	"\n\t^ kap",
	null, "2013-09-25T10:02:32Z", "mp", 1);

jst.FYKapitola.addMethod("zmenKapitolu:podle:", "aString kapOsnovy", "*srs-fytoportal-ior-edit", 
	"\t| s kap kapId osnova |" +
	"\n\tosnova := kapOsnovy root." +
	"\n\tkap := self." +
	"\n\ts := kapOsnovy id readStream." +
	"\n\t[s atEnd] whileFalse: [" +
	"\n\t\tosnova := osnova at: (kapId := s upTo: '.')." +
	"\n\t\tkap := kap " +
	"\n\t\t\tat: kapId " +
	"\n\t\t\tifAbsentPut: [osnova copyEmpty parent: kap]]." +
	"\n\tkap zmeny: aString." +
	"\n\tkap lzeVyjmout ifTrue: [ | p k |" +
	"\n\t\t\"prazdnou kapitolu musim vyjmout, vcetne nadrazenych, pokud budou taky prazdne\"" +
	"\n\t\tp := kap parent." +
	"\n\t\tk := kap." +
	"\n\t\t[p removeKey: ((k id copyAfterLast: '.') ifEmpty: [k id])." +
	"\n\t\t\tk := p." +
	"\n\t\t\tp := k parent." +
	"\n\t\t\tp notNil and: [k lzeVyjmout]] whileTrue." +
	"\n\t]." +
	"\n\t^ kap",
	null, "2013-10-31T10:35:18Z", "mp", 1);

jst.FYKapitola.addMethod("zmenKapitolu:podle:", "aString kapOsnovy", "*srs-fytoportal-ior-edit", 
	"\t| s kap kapId osnova |" +
	"\n\tosnova := kapOsnovy root." +
	"\n\tkap := self." +
	"\n\ts := kapOsnovy id readStream." +
	"\n\t[s atEnd] whileFalse: [" +
	"\n\t\tosnova := osnova at: (kapId := s upTo: '.')." +
	"\n\t\tkap := kap at: kapId ifAbsentPut: [" +
	"\n\t\t\tosnova copyEmpty " +
	"\n\t\t\t\tparent: kap;" +
	"\n\t\t\t\tpridana: true]." +
	"\n\t\t\"pokud uz existovala, mohla byt vyrazena\"" +
	"\n\t\tkap vyrazena: false" +
	"\n\t]." +
	"\n\tkap zmeny: aString." +
	"\n\tkap lzeVyjmout ifTrue: [ | p k |" +
	"\n\t\t\"prazdnou kapitolu musim vyjmout, vcetne nadrazenych, pokud budou taky prazdne\"" +
	"\n\t\tp := kap parent." +
	"\n\t\tk := kap." +
	"\n\t\t[\tp at: ((k id copyAfterLast: '.') ifEmpty: [k id]) ifPresent: [:kp | " +
	"\n\t\t\t\t\"misto odstraneni jen oznacim\"" +
	"\n\t\t\t\tkp vyrazena: true]." +
	"\n\t\t\tk := p." +
	"\n\t\t\tp := k parent." +
	"\n\t\t\tp notNil and: [k lzeVyjmout]" +
	"\n\t\t] whileTrue." +
	"\n\t]." +
	"\n\t^ kap",
	null, "2013-11-08T20:16:01Z", "mp", 1);

jst.FYKapitola.addMethod("zmenKapitolu:podle:", "aString jinaKapitola", "*srs-fytoportal-ior-edit", 
	"\t| s kap kapId jinaKap |" +
	"\n\tjinaKap := jinaKapitola root." +
	"\n\tkap := self." +
	"\n\ts := jinaKapitola id readStream." +
	"\n\t[s atEnd] whileFalse: [" +
	"\n\t\tjinaKap := jinaKap at: (kapId := s upTo: '.')." +
	"\n\t\tkap := kap at: kapId ifAbsentPut: [" +
	"\n\t\t\tjinaKap class new" +
	"\n\t\t\t\tid: kapId;" +
	"\n\t\t\t\tnazev: jinaKap nazev;" +
	"\n\t\t\t\tporadi: jinaKap poradi;" +
	"\n\t\t\t\tzmeny: jinaKap obsah;" +
	"\n\t\t\t\tparent: kap;" +
	"\n\t\t\t\tpridana: true]." +
	"\n\t\t\"pokud uz existovala, mohla byt vyrazena\"" +
	"\n\t\tkap vyrazena: false" +
	"\n\t]." +
	"\n\tkap zmeny: aString." +
	"\n\tkap lzeVyjmout ifTrue: [ | p k |" +
	"\n\t\t\"prazdnou kapitolu musim vyjmout, vcetne nadrazenych, pokud budou taky prazdne\"" +
	"\n\t\tp := kap parent." +
	"\n\t\tk := kap." +
	"\n\t\t[\tp at: ((k id copyAfterLast: '.') ifEmpty: [k id]) ifPresent: [:kp | " +
	"\n\t\t\t\t\"misto odstraneni jen oznacim\"" +
	"\n\t\t\t\tkp vyrazena: true]." +
	"\n\t\t\tk := p." +
	"\n\t\t\tp := k parent." +
	"\n\t\t\tp notNil and: [k lzeVyjmout]" +
	"\n\t\t] whileTrue." +
	"\n\t]." +
	"\n\t^ kap",
	null, "2013-11-20T14:27:49Z", "mp", 1);

jst.FYKapitola.addMethod("zmenKapitolu:podle:", "aString jinaKapitola", "*srs-fytoportal-ior-edit", 
	"\t| s kap kapId jinaKap |" +
	"\n\tjinaKap := jinaKapitola root." +
	"\n\tkap := self." +
	"\n\ts := jinaKapitola id readStream." +
	"\n\t[s atEnd] whileFalse: [" +
	"\n\t\tjinaKap := jinaKap at: (kapId := s upTo: '.')." +
	"\n\t\tkap := kap at: kapId ifAbsentPut: [" +
	"\n\t\t\tjinaKap class new" +
	"\n\t\t\t\tid: kapId;" +
	"\n\t\t\t\tnazev: jinaKap nazev;" +
	"\n\t\t\t\tporadi: jinaKap poradi;" +
	"\n\t\t\t\tzmeny: jinaKap obsah;" +
	"\n\t\t\t\tparent: kap;" +
	"\n\t\t\t\tpridana: jinaKapitola isReadonly not]." +
	"\n\t\t\"pokud uz existovala, mohla byt vyrazena\"" +
	"\n\t\tkap vyrazena: false" +
	"\n\t]." +
	"\n\tkap zmeny: aString." +
	"\n\tkap lzeVyjmout ifTrue: [ | p k |" +
	"\n\t\t\"prazdnou kapitolu musim vyjmout, vcetne nadrazenych, pokud budou taky prazdne\"" +
	"\n\t\tp := kap parent." +
	"\n\t\tk := kap." +
	"\n\t\t[\tp at: ((k id copyAfterLast: '.') ifEmpty: [k id]) ifPresent: [:kp | " +
	"\n\t\t\t\t\"misto odstraneni jen oznacim\"" +
	"\n\t\t\t\tkp vyrazena: true]." +
	"\n\t\t\tk := p." +
	"\n\t\t\tp := k parent." +
	"\n\t\t\tp notNil and: [k lzeVyjmout]" +
	"\n\t\t] whileTrue." +
	"\n\t]." +
	"\n\t^ kap",
	null, "2014-03-03T14:20:06Z", "mp"); //fytoportal-ior-edit

jst.FYKapitola.addMethod("zahodZmeny", "", "*srs-fytoportal-ior-edit", 
	"\tself associations do: [:ea | ea value jePridana " +
	"\n\t\tifTrue: [self removeKey: ea key]" +
	"\n\t\tifFalse: [ea value zahodZmeny]]",
	null, "2013-11-08T10:54:13Z", "mp");

jst.FYKapitola.addMethod("odstranVyrazene", "", "*srs-fytoportal-ior-edit", 
	"\tself associations do: [:ea | ea value jeVyrazena " +
	"\n\t\tifTrue: [self removeKey: ea key]" +
	"\n\t\tifFalse: [ea value odstranVyrazene]]",
	null, "2013-11-10T22:11:41Z", "mp");

//FYKapitolaPM

jst.FYKapitolaPM.addMethod("zmeny", "", "*srs-fytoportal-ior-edit", 
	"\t^ zmeny",
	null, "2013-01-30T15:16:35Z", "mp");

jst.FYKapitolaPM.addMethod("zmeny:", "aString", "*srs-fytoportal-ior-edit", 
	"\tzmeny := aString",
	null, "2013-01-30T21:18:53Z", "mp");

jst.FYKapitolaPM.addMethod("jeZmenena", "", "*srs-fytoportal-ior-edit", 
	"\t^ self obsahZmenen or: [self anySatisfy: [:kap | kap jeZmenena]]",
	null, "2013-02-18T20:28:29Z", "mp");

jst.FYKapitolaPM.addMethod("obsahZmenen", "", "*srs-fytoportal-ior-edit", 
	"\t^ zmeny notNil & (zmeny == obsah) not",
	null, "2013-02-28T15:12:19Z", "mp", 1);

jst.FYKapitolaPM.addMethod("obsahZmenen", "", "*srs-fytoportal-ior-edit", 
	"\t^ self jePridana ~= self jeVyrazena " +
	"\n\t\tor: [zmeny notNil & (zmeny == obsah) not]",
	null, "2013-11-08T19:56:09Z", "mp", 1);

jst.FYKapitolaPM.addMethod("obsahZmenen", "", "*srs-fytoportal-ior-edit", 
	"\t^ self jePridana ~= self jeVyrazena or: [zmeny notNil & (zmeny ~= obsah)]",
	null, "2013-11-20T14:44:58Z", "mp"); //fytoportal-ior-edit

jst.FYKapitolaPM.addMethod("potvrdZmeny", "", "*srs-fytoportal-ior-edit", 
	"\tobsah := zmeny." +
	"\n\tzmeny := nil",
	null, "2013-03-04T13:13:06Z", "mp", 1);
/*
jst.FYKapitolaPM.addMethod("potvrdZmeny", "", "*srs-fytoportal-ior-edit", 
	"\tobsah := zmeny." +
	"\n\tzmeny := nil." +
	"\n\t\"pred ulozenim musim odstranit kapitoly oznacene jako vyrazene\"" +
	"\n\tself associations do: [:ea | " +
	"\n\t\tea value jeVyrazena ifTrue: [" +
	"\n\t\t\tself removeKey: ea key]]",
	null, "2013-11-08T20:24:34Z", "mp"); //fytoportal-ior-edit
*/
jst.FYKapitolaPM.addMethod("potvrdZmeny", "", "*srs-fytoportal-ior-edit", 
	"\tobsah := zmeny." +
	"\n\tzmeny := nil." +
	"\n\t\"dulezite - nesmi se prenest do modifikovane kapitoly, protoze pak #obsahZmenen " +
	"\n\tvraci true i v pripade, kdy obsah nebyl zmenen a zmeny = nil\"" +
	"\n\tpridana := nil",
	null, "2013-11-20T14:14:54Z", "mp"); //fytoportal-ior-edit

jst.FYKapitolaPM.addMethod("lzeVyjmout", "", "*srs-fytoportal-ior-edit", 
	"\t\"nesmi jit navic o kapitolu prvni urovne\"" +
	"\n\t^ self isEmpty and: [parent ~= self metodika]",
	null, "2013-10-31T10:37:26Z", "mp", 1);

jst.FYKapitolaPM.addMethod("lzeVyjmout", "", "*srs-fytoportal-ior-edit", 
	"\t\"nesmi jit navic o kapitolu prvni urovne plodinove metodiky\"" +
	"\n\t^ self isEmpty and: [parent ~= self metodika or: [parent jeMetodikaSO]]",
	null, "2013-11-08T11:04:38Z", "mp");

jst.FYKapitolaPM.addMethod("pridana:", "aBoolean", "*srs-fytoportal-ior-edit", 
	"\t\"pridani kapitoly bylo vynuceno editaci podkapitoly\"" +
	"\n\tpridana := aBoolean",
	null, "2013-11-08T10:16:17Z", "mp");

jst.FYKapitolaPM.addMethod("jePridana", "", "*srs-fytoportal-ior-edit", 
	"\t^ pridana == true",
	null, "2013-11-08T10:28:44Z", "mp");

jst.FYKapitolaPM.addMethod("zahodZmeny", "", "*srs-fytoportal-ior-edit", 
	"\tsuper zahodZmeny." +
	"\n\tzmeny := nil",
	null, "2013-11-08T10:50:08Z", "mp");

//FYKapitolaPlodiny

jst.FYKapitolaPlodiny.addMethod("potvrdZmeny", "", "*srs-fytoportal-ior-edit", 
	"\tobsah := zmeny asArray." +
	"\n\tzmeny := nil",
	null, "2013-05-16T08:36:01Z", "mp");

jst.FYKapitolaPlodiny.addMethod("resetujKody", "", "*srs-fytoportal-ior-edit", 
	"\t\"musi se zavolat, kdyz v ramci editace metodiky zmenim seznam plodin\"" +
	"\n\tkody := nil",
	null, "2014-03-06T11:14:50Z", "mp");

//FYKapitolaSO

jst.FYKapitolaSO.addMethod("obsahZmenen", "", "*srs-fytoportal-ior-edit", 
	"\t| zm |" +
	"\n\tzm := self obsah." +
	"\n\t^ (zmeny notNil and: [obsah ~= zm]) or: [zm anySatisfy: [:kap | kap jeZmenena]]",
	null, "2013-05-15T08:30:12Z", "mp", 1);

jst.FYKapitolaSO.addMethod("obsahZmenen", "", "*srs-fytoportal-ior-edit", 
	"\t| zm kapSO |" +
	"\n\tkapSO := self metodika obecnaMetodika ifNotNilDo: [:met |" +
	"\n\t\tmet at: id]." +
	"\n\tzm := zmeny ifNotNil: [zmeny asCollection select: [:kap |" +
	"\n\t\tkap jeVyrazena not and: [kapSO isNil " +
	"\n\t\t\tor: [kapSO noneSatisfy: [:k | k id = kap id]] " +
	"\n\t\t\tor: [kap jeZmenena]]" +
	"\n\t]] ifNil: [obsah asCollection]." +
	"\n\t^ (zmeny notNil and: [obsah ~= zm]) or: [zm anySatisfy: [:kap | kap jeZmenena]]",
	null, "2013-12-13T22:19:36Z", "mp", 1);

jst.FYKapitolaSO.addMethod("obsahZmenen", "", "*srs-fytoportal-ior-edit", 
	"\t^ zmeny ifNotNil: [ | zm kapSO |" +
	"\n\t\tkapSO := self metodika obecnaMetodika ifNotNilDo: [:met |" +
	"\n\t\t\tmet at: id]." +
	"\n\t\tzm := zmeny asCollection select: [:kap |" +
	"\n\t\t\tkap jeVyrazena not and: [kapSO isNil " +
	"\n\t\t\t\tor: [kapSO noneSatisfy: [:k | k id = kap id]] " +
	"\n\t\t\t\tor: [kap jeZmenena]]." +
	"\n\t\t]." +
	"\n\t\tobsah ~= zm" +
	"\n\t] ifNil: [" +
	"\n\t\tobsah asCollection anySatisfy: [:kap | kap jeZmenena]]",
	null, "2014-05-21T10:23:54Z", "mp"); //fytoportal-ior-edit

jst.FYKapitolaSO.addMethod("zmeny", "", "*srs-fytoportal-ior-edit", 
	"\t^ zmeny ifNil: [" +
	"\n\t\t\"byla prepsana nektera kapitola metodiky SO\"" +
	"\n\t\tself obsahZmenen ifTrue: obsah]",
	null, "2013-05-15T12:00:21Z", "mp");

jst.FYKapitolaSO.addMethod("potvrdZmeny", "", "*srs-fytoportal-ior-edit", 
	"\t| novyObsah osnova |" +
	"\n\tosnova := Fytoportal data osnovaMetodikyKapitoly: id." +
	"\n\tnovyObsah := OrderedCollection new." +
	"\n\tzmeny do: [:kapSO | kapSO jeVyrazena ifFalse: [ | novaKap |" +
	"\n\t\tnovaKap := obsah detect: [:kap | kap linkId = kapSO linkId] ifNone: [" +
	"\n\t\t\tFYKapitolaPM new" +
	"\n\t\t\t\tnazev: kapSO nazev;" +
	"\n\t\t\t\tlink: kapSO linkId;" +
	"\n\t\t\t\tparent: self]." +
	"\n\t\tkapSO jeZmenena ifTrue: [kapSO kapitoly do: [:kap | kap obsahZmenen ifTrue: [" +
	"\n\t\t\t\"id kapitoly zacina idem metodiky SO, musim jej odstranit\"" +
	"\n\t\t\t(novaKap zmenKapitolu: kap zmeny podle: (osnova najdiKapitolu: (kap id copyAfter: $.))) potvrdZmeny" +
	"\n\t\t]]]." +
	"\n\t\tnovyObsah add: novaKap." +
	"\n\t]]." +
	"\n\tobsah := novyObsah asArray." +
	"\n\tzmeny := nil",
	null, "2013-05-15T12:42:42Z", "mp", 1);

jst.FYKapitolaSO.addMethod("potvrdZmeny", "", "*srs-fytoportal-ior-edit", 
	"\t| novyObsah osnova |" +
	"\n\tosnova := Fytoportal data osnovaMetodikyKapitoly: id." +
	"\n\tnovyObsah := OrderedCollection new." +
	"\n\tzmeny do: [:kapSO | kapSO jeVyrazena ifFalse: [ | novaKap |" +
	"\n\t\tnovaKap := obsah detect: [:kap | kap linkId = kapSO linkId] ifNone: [" +
	"\n\t\t\tFYKapitolaPM new" +
	"\n\t\t\t\tnazev: kapSO nazev;" +
	"\n\t\t\t\tlink: kapSO linkId;" +
	"\n\t\t\t\tparent: self]." +
	"\n\t\tkapSO jeZmenena ifTrue: [kapSO kapitoly do: [:kap | kap obsahZmenen ifTrue: [" +
	"\n\t\t\t\"id kapitoly zacina idem metodiky SO, musim jej odstranit\"" +
	"\n\t\t\t(novaKap zmenKapitolu: kap zmeny podle: (osnova najdiKapitolu: (kap id copyAfter: $.))) potvrdZmeny" +
	"\n\t\t\t\tmodifiedOn: self metodika modifiedOn;" +
	"\n\t\t\t\tmodifiedBy: self metodika modifiedBy" +
	"\n\t\t]]]." +
	"\n\t\tnovyObsah add: novaKap." +
	"\n\t]]." +
	"\n\tobsah := novyObsah asArray." +
	"\n\tzmeny := nil",
	null, "2013-11-14T16:19:52Z", "mp", 1);

jst.FYKapitolaSO.addMethod("potvrdZmeny", "", "*srs-fytoportal-ior-edit", 
	"\t| novyObsah osnova |" +
	"\n\tosnova := Fytoportal data osnovaMetodikyKapitoly: id." +
	"\n\tnovyObsah := OrderedCollection new." +
	"\n\tzmeny do: [:kapSO | kapSO jeVyrazena ifFalse: [ | novaKap |" +
	"\n\t\tnovaKap := obsah detect: [:kap | kap linkId = kapSO linkId] ifNone: [" +
	"\n\t\t\tFYSkodlOrgPM new" +
	"\n\t\t\t\tnazev: kapSO nazev;" +
	"\n\t\t\t\tlink: kapSO linkId;" +
	"\n\t\t\t\tparent: self]." +
	"\n\t\t\"pripadna zmena fotky\"" +
	"\n\t\tnovaKap " +
	"\n\t\t\tfotka: kapSO fotka; " +
	"\n\t\t\tpotvrdZmeny." +
	"\n\t\tkapSO jeZmenena ifTrue: [kapSO kapitoly do: [:kap | kap obsahZmenen ifTrue: [" +
	"\n\t\t\t\"id kapitoly zacina idem metodiky SO, musim jej odstranit\"" +
	"\n\t\t\t(novaKap zmenKapitolu: kap zmeny podle: (osnova najdiKapitolu: (kap id copyAfter: $.))) potvrdZmeny" +
	"\n\t\t\t\tmodifiedOn: self metodika modifiedOn;" +
	"\n\t\t\t\tmodifiedBy: self metodika modifiedBy" +
	"\n\t\t]]]." +
	"\n\t\tnovyObsah add: novaKap." +
	"\n\t]]." +
	"\n\tobsah := novyObsah asArray." +
	"\n\tzmeny := nil",
	null, "2014-03-10T15:21:37Z", "mp"); //fytoportal-ior-edit

//FYMetodika

jst.FYMetodika.addMethod("zmenPodle:", "met", "*srs-fytoportal-ior-edit", 
	"\tmet kapitoly do: [:kap |" +
	"\n\t\tkap obsahZmenen ifTrue: [" +
	"\n\t\t\t(self zmenKapitolu: kap zmeny podle: kap) potvrdZmeny]]." +
	"\n\tself odstranVyrazene",
	null, "2013-11-10T22:11:00Z", "mp", 1);

jst.FYMetodika.addMethod("zmenPodle:", "met", "*srs-fytoportal-ior-edit", 
	"\tmodifiedBy := Fytoportal db server userInfo at: #name." +
	"\n\tmodifiedOn := DateAndTime now asISOString." +
	"\n\tmet kapitoly do: [:kap |" +
	"\n\t\tkap obsahZmenen ifTrue: [" +
	"\n\t\t\t(self zmenKapitolu: kap zmeny podle: kap) potvrdZmeny" +
	"\n\t\t\t\tmodifiedOn: modifiedOn;" +
	"\n\t\t\t\tmodifiedBy: modifiedBy]]." +
	"\n\tself odstranVyrazene",
	null, "2013-11-14T13:53:30Z", "mp"); //fytoportal-ior-edit

//FYObecnaMetodikaPM

jst.FYObecnaMetodikaPM.addMethod("zmenena", "", "*srs-fytoportal-ior-edit", 
	"\t^ zmenena",
	null, "2013-03-01T21:31:35Z", "mp");

jst.FYObecnaMetodikaPM.addMethod("zmenena:", "aMetodika", "*srs-fytoportal-ior-edit", 
	"\tzmenena := aMetodika",
	null, "2013-03-01T21:32:21Z", "mp");

jst.FYObecnaMetodikaPM.addMethod("jeZmenena", "", "*srs-fytoportal-ior-edit", 
	"\t^ (zmenena notNil and: [zmenena jeZmenena]) or: [super jeZmenena]",
	null, "2013-03-01T22:34:21Z", "mp", 1);

jst.FYObecnaMetodikaPM.addMethod("jeZmenena", "", "*srs-fytoportal-ior-edit", 
	"\t^ (zmenena notNil and: [zmenena jeZmenena or: [self publikovat ~= zmenena publikovat]]) " +
	"\n\t\tor: [super jeZmenena]",
	null, "2014-01-15T20:53:21Z", "mp"); //fytoportal-ior-edit

jst.FYObecnaMetodikaPM.addMethod("zmenPodle:", "met", "*srs-fytoportal-ior-edit", 
	"\tsuper zmenPodle: met." +
	"\n\tpublikovat := met publikovat",
	null, "2014-01-15T20:57:04Z", "mp");

jst.FYObecnaMetodikaPM.addMethod("zmenMetodikuSO:", "met", "*srs-fytoportal-ior-edit", 
	"\t#(skudci choroby abionozy) do: [:key |" +
	"\n\t\t(self at: key) obsah do: [:kap |" +
	"\n\t\t\t(kap odkazNacten and: [kap link id = met id]) ifTrue: [" +
	"\n\t\t\t\tkap link: met]]]",
	null, "2013-05-02T13:12:34Z", "mp", 1);

jst.FYObecnaMetodikaPM.addMethod("zmenMetodikuSO:", "met", "*srs-fytoportal-ior-edit", 
	"\t#(skudci choroby abionozy) do: [:key |" +
	"\n\t\t(self at: key) obsah do: [:kap |" +
	"\n\t\t\t(kap odkazNacten and: [kap link id = met id]) ifTrue: [" +
	"\n\t\t\t\tkap link: met]]]." +
	"\n\tzmenena ifNotNil: [" +
	"\n\t\tzmenena zmenMetodikuSO: met]",
	null, "2013-05-03T13:48:51Z", "mp", 1);

jst.FYObecnaMetodikaPM.addMethod("zmenMetodikuSO:", "met", "*srs-fytoportal-ior-edit", 
	"\t#(skudci choroby abionozy) do: [:key | self at: key ifPresent: [:kap1 | " +
	"\n\t\tkap1 obsah do: [:kap |" +
	"\n\t\t\t(kap odkazNacten and: [kap link id = met id]) ifTrue: [" +
	"\n\t\t\t\tkap link: met]]]]." +
	"\n\tzmenena ifNotNil: [" +
	"\n\t\tzmenena zmenMetodikuSO: met]",
	null, "2014-03-04T14:56:52Z", "mp"); //fytoportal-ior-edit

//FYMetodikaSO

/* zruseno, taxony uz v ramci editace metodiky nelze menit
jst.FYMetodikaSO.addMethod("jeZmenena", "", "*srs-fytoportal-ior-edit", 
	"\t^ super jeZmenena or: [(taxon isKindOf: FYTaxon ) and: [taxon jeZmenen]]",
	null, "2013-02-02T19:40:58Z", "mp");
*/

jst.FYMetodikaSO._class.addMethod("novaMetodika", "", "*srs-fytoportal-ior-edit", 
	"\t| osnova met |" +
	"\n\tosnova := Fytoportal data osnovaMetodikyKapitoly: self kapitola." +
	"\n\tmet := self new." +
	"\n\tosnova kapitoly do: [:kap | kap isReadonly ifTrue: [" +
	"\n\t\tmet zmenKapitolu: kap obsah podle: kap]]." +
	"\n\t^ met",
	null, "2013-04-12T21:57:23Z", "mp");

jst.FYMetodikaSO.addMethod("nazev:", "aString", "*srs-fytoportal-ior-edit", 
	"\tzmeny at: #nazev put: aString",
	null, "2014-03-01T22:25:08Z", "mp");

jst.FYMetodikaSO.addMethod("nazev", "", "*srs-fytoportal-ior-edit", 
	"\t^ zmeny at: #nazev ifAbsent: [nazev]",
	null, "2014-03-01T23:06:08Z", "mp");

jst.FYMetodikaSO.addMethod("jeZmenena", "", "*srs-fytoportal-ior-edit", 
	"\t^ nazev ~= self nazev " +
	"\n\t\tor: [(taxony collect: [:tax | tax ifNotString: [tax id]]) ~= self taxonyId]" +
	"\n\t\tor: [super jeZmenena]",
	null, "2014-03-02T11:31:04Z", "mp", 1);

jst.FYMetodikaSO.addMethod("jeZmenena", "", "*srs-fytoportal-ior-edit", 
	"\t^ nazev ~= self nazev " +
	"\n\t\tor: [fotka ~= self fotka]" +
	"\n\t\tor: [(taxony collect: [:tax | tax ifNotString: [tax id]]) ~= self taxonyId]" +
	"\n\t\tor: [super jeZmenena]",
	null, "2014-03-07T21:39:42Z", "mp", 2);

jst.FYMetodikaSO.addMethod("jeZmenena", "", "*srs-fytoportal-ior-edit", 
	"\t^ nazev ~= self nazev " +
	"\n\t\tor: [(zmeny includesKey: #fotka) and: [fotka ~= self fotka]]" +
	"\n\t\tor: [(taxony collect: [:tax | tax ifNotString: [tax id]]) ~= self taxonyId]" +
	"\n\t\tor: [super jeZmenena]",
	null, "2014-05-21T12:14:00Z", "mp"); //fytoportal-ior-edit

jst.FYMetodikaSO.addMethod("zmenPodle:", "met", "*srs-fytoportal-ior-edit", 
	"\tnazev := met nazev." +
	"\n\ttaxony := met taxonyId." +
	"\n\tsuper zmenPodle: met",
	null, "2014-03-02T22:47:02Z", "mp", 1);

jst.FYMetodikaSO.addMethod("zmenPodle:", "met", "*srs-fytoportal-ior-edit", 
	"\tnazev := met nazev." +
	"\n\ttaxony := met taxonyId." +
	"\n\tfotka := met fotka." +
	"\n\tsuper zmenPodle: met",
	null, "2014-03-07T21:40:00Z", "mp", 2);

jst.FYMetodikaSO.addMethod("zmenPodle:", "met", "*srs-fytoportal-ior-edit", 
	"\tnazev := met nazev." +
	"\n\ttaxony := met taxonyId." +
	"\n\tmet fotka ifNotNilDo: [:f | " +
	"\n\t\tfotka := f id]." +
	"\n\tsuper zmenPodle: met",
	null, "2014-03-10T15:06:01Z", "mp", 3);

jst.FYMetodikaSO.addMethod("zmenPodle:", "met", "*srs-fytoportal-ior-edit", 
	"\tnazev := met nazev." +
	"\n\ttaxony := met taxonyId." +
	"\n\tfotka := met fotka." +
	"\n\tvychoziFotka := nil." +
	"\n\tsuper zmenPodle: met",
	null, "2014-03-11T22:01:52Z", "mp"); //fytoportal-ior-edit

jst.FYMetodikaSO.addMethod("zahodZmeny", "", "*srs-fytoportal-ior-edit", 
	"\tzmeny := Dictionary new." +
	"\n\tsuper zahodZmeny",
	null, "2014-03-03T08:27:01Z", "mp");

//FYSkodlOrgPM

jst.FYSkodlOrgPM.addMethod("fotka:", "anObject", "accessing", 
	"\tfotka := anObject",
	null, "2014-03-05T14:00:52Z", "mp", 1);

jst.FYSkodlOrgPM.addMethod("fotka:", "anObject", "accessing", 
	"\t\"editace fotky\"" +
	"\n\tzmenaFotky := anObject",
	null, "2014-03-10T12:37:35Z", "mp", 2);

jst.FYSkodlOrgPM.addMethod("fotka:", "anObject", "accessing", 
	"\t\"editace fotky\"" +
	"\n\t(zmenaFotky := anObject) ifNil: [" +
	"\n\t\tvychoziFotka := nil]",
	null, "2014-03-11T20:12:38Z", "mp", 3);

jst.FYSkodlOrgPM.addMethod("fotka:", "anObject", "*srs-fytoportal-ior-edit", 
	"\t\"editace fotky\"" +
	"\n\t(zmenaFotky at: #fotka put: anObject) ifNil: [" +
	"\n\t\tself nactiVychoziFotku]",
	null, "2014-03-14T13:44:49Z", "mp"); //fytoportal-ior

jst.FYSkodlOrgPM.addMethod("obsahZmenen", "", "*srs-fytoportal-ior-edit", 
	"\t^ fotka ~= self fotka or: [super obsahZmenen]",
	null, "2014-03-10T12:46:23Z", "mp", 1);

jst.FYSkodlOrgPM.addMethod("obsahZmenen", "", "*srs-fytoportal-ior-edit", 
	"\t^ ((zmenaFotky includesKey: #fotka) and: [fotka ~= self fotka]) " +
	"\n\t\tor: [super obsahZmenen]",
	null, "2014-05-21T12:15:37Z", "mp"); //fytoportal-ior-edit

jst.FYSkodlOrgPM.addMethod("potvrdZmeny", "", "*srs-fytoportal-ior-edit", 
	"\tzmenaFotky ifNotNil: [" +
	"\n\t\tfotka := zmenaFotky id." +
	"\n\t\tzmenaFotky := nil]",
	null, "2014-03-10T15:19:29Z", "mp", 1);

jst.FYSkodlOrgPM.addMethod("potvrdZmeny", "", "*srs-fytoportal-ior-edit", 
	"\tzmenaFotky at: #fotka ifPresent: [:f |" +
	"\n\t\tfotka := f ifNotNil: [f id]." +
	"\n\t\tzmenaFotky := Dictionary new]",
	null, "2014-03-14T14:57:18Z", "mp"); //fytoportal-ior-edit

jst.FYSkodlOrgPM.addMethod("zahodZmeny", "", "*srs-fytoportal-ior-edit", 
	"\tsuper zahodZmeny." +
	"\n\tzmenaFotky := Dictionary new",
	null, "2014-03-14T13:31:43Z", "mp");

jst.FYSkodlOrgPM.addMethod("zmenMetodikuSO:", "met", "*srs-fytoportal-ior-edit", 
	"\tsuper link: met." +
	"\n\ttaxony := met taxony." +
	"\n\tvychoziFotka := nil",
	null, "2014-03-11T22:17:06Z", "mp");

jst.FYSkodlOrgPM.addMethod("nactiVychoziFotku", "", "*srs-fytoportal-ior-edit", 
	"\t\"pouze v editaci\"" +
	"\n\tvychoziFotka := nil." +
	"\n\tself metodika obecnaMetodika ifNotNilDo: [:met |" +
	"\n\t\t((met at: parent id) obsah detect: [:kap | kap linkId = self linkId] ifNone: nil) ifNotNilDo: [:kap |" +
	"\n\t\t\tvychoziFotka := kap fotka]]." +
	"\n\t\"nema obecnou metodiku nebo jsem v obecne metodice\"" +
	"\n\tvychoziFotka ifNil: [" +
	"\n\t\tvychoziFotka := self link fotka ifNil: [" +
	"\n\t\t\tself link vychoziFotka]]",
	null, "2014-03-14T13:55:00Z", "mp"); //fytoportal-ior

//FYFotoWindow

jst.FYFotoWindow.addMethod("zapniEditaci", "", "*srs-fytoportal-ior-edit", 
	"\tnahledy addDependent: self." +
	"\n\ttoolbar insertAt: 1 button: (vyberBtn := ExtButton new" +
	"\n\t\ttext: 'Vybrat fotku';" +
	"\n\t\tbeDisabled;" +
	"\n\t\ton: #click do: [" +
	"\n\t\t\tkapitola fotka: vyber." +
	"\n\t\t\tself broadcastEvent: #zmenaFotkyKapitoly: with: kapitola." +
	"\n\t\t\tself close])",
	null, "2014-03-10T15:38:00Z", "mp", 1);

jst.FYFotoWindow.addMethod("zapniEditaci", "", "*srs-fytoportal-ior-edit", 
	"\tnahledy addDependent: self." +
	"\n\ttoolbar " +
	"\n\t\tinsertAt: 1 item: '-';" +
	"\n\t\tinsertAt: 1 item: (ExtButton new" +
	"\n\t\t\ttext: 'Bez fotky';" +
	"\n\t\t\ton: #click do: [" +
	"\n\t\t\t\tkapitola fotka ifNotNil: [" +
	"\n\t\t\t\t\tkapitola fotka: nil." +
	"\n\t\t\t\t\tself broadcastEvent: #zmenaFotkyKapitoly: with: kapitola]." +
	"\n\t\t\t\tself close]);" +
	"\n\t\tinsertAt: 1 item: '-';" +
	"\n\t\tinsertAt: 1 item: (vyberBtn := ExtButton new" +
	"\n\t\t\ttext: 'Vybrat fotku';" +
	"\n\t\t\tbeDisabled;" +
	"\n\t\t\ton: #click do: [" +
	"\n\t\t\t\tkapitola fotka = vyber ifFalse: [" +
	"\n\t\t\t\t\tkapitola fotka: vyber." +
	"\n\t\t\t\t\tself broadcastEvent: #zmenaFotkyKapitoly: with: kapitola]." +
	"\n\t\t\t\tself close])",
	null, "2014-03-11T10:24:15Z", "mp", 2);

jst.FYFotoWindow.addMethod("zapniEditaci", "", "*srs-fytoportal-ior-edit", 
	"\ttoolbar " +
	"\n\t\tinsertAt: 1 item: '-';" +
	"\n\t\tinsertAt: 1 item: (ExtButton new" +
	"\n\t\t\ttext: 'Bez fotky';" +
	"\n\t\t\ton: #click do: [" +
	"\n\t\t\t\tkapitola fotka ifNotNil: [" +
	"\n\t\t\t\t\tkapitola fotka: nil." +
	"\n\t\t\t\t\tself broadcastEvent: #zmenaFotkyKapitoly: with: kapitola]." +
	"\n\t\t\t\tself close]);" +
	"\n\t\tinsertAt: 1 item: '-';" +
	"\n\t\tinsertAt: 1 item: (vyberBtn := ExtButton new" +
	"\n\t\t\ttext: 'Vybrat fotku';" +
	"\n\t\t\tbeDisabled;" +
	"\n\t\t\ton: #click do: [" +
	"\n\t\t\t\tkapitola fotka = vyber ifFalse: [" +
	"\n\t\t\t\t\tkapitola fotka: vyber." +
	"\n\t\t\t\t\tself broadcastEvent: #zmenaFotkyKapitoly: with: kapitola]." +
	"\n\t\t\t\tself close])",
	null, "2014-05-22T07:37:23Z", "mp"); //fytoportal-ior-edit

//FYKapitolaPanel

jst.FYKapitolaPanel.addMethod("toggleEditing:", "aBoolean", "*srs-fytoportal-ior-edit", 
	"\tself isDisabled: aBoolean.",
	null, "2013-01-04T22:28:39Z", "mp");

/*
jst.FYKapitolaPanel.addMethod("zmenaMetodiky:", "met", "*srs-fytoportal-ior-edit", 
	"\t(metodika notNil and: [metodika id = met id]) ifTrue: [" +
	"\n\t\t| vyber |" +
	"\n\t\tmetodika := met." +
	"\n\t\tvyber := self selectionModel selectedNode ifNotNilDo: [:n | n id]." +
	"\n\t\tself selectionModel clearSelections." +
	"\n\t\tself kapitola: (metodika at: kapitola id)." +
	"\n\t\tself selectNodeBy: [:n | n id = vyber] silently: true]",
	null, "2013-01-12T21:03:48Z", "mp");

jst.FYKapitolaPanel.addMethod("zmenaMetodiky:", "met", "*srs-fytoportal-ior-edit", 
	"\t(kapitola notNil and: [kapitola metodika notNil] and: [kapitola metodika id = met id]) ifTrue: [" +
	"\n\t\t| vyber |" +
	"\n\t\tvyber := self selectionModel selectedNode ifNotNilDo: [:n | n id]." +
	"\n\t\tself selectionModel clearSelections." +
	"\n\t\tself kapitola: (met at: kapitola id)." +
	"\n\t\tself selectNodeBy: [:n | n id = vyber] silently: true]",
	null, "2013-01-15T23:09:35Z", "mp");

jst.FYKapitolaPanel.addMethod("zmenaMetodiky:", "met", "*srs-fytoportal-ior-edit", 
	"\t(kapitola notNil and: [kapitola metodika notNil] and: [kapitola metodika id = met id]) ifTrue: [" +
	"\n\t\tself keepSelectedDuring: [" +
	"\n\t\t\tself kapitola: (met at: kapitola id)]]",
	null, "2013-04-27T10:46:01Z", "mp");

jst.FYKapitolaPanel.addMethod("zmenaMetodiky:", "met", "*srs-fytoportal-ior-edit", 
	"\tkapitola ifNotNil: [" +
	"\n\t\tself keepSelectedDuring: [" +
	"\n\t\t\tself kapitola: (met at: kapitola id)]]",
	null, "2013-05-15T15:45:14Z", "mp");
*/
jst.FYKapitolaPanel.addMethod("zmenaMetodiky:", "met", "*srs-fytoportal-ior-edit", 
	"\tself class == FYKapitolaPanel & kapitola notNil ifTrue: [" +
	"\n\t\t\"Jen mimo editor! V ramci editoru se resi jinak - viz FYPMEditor>>ulozZmeny\"" +
	"\n\t\tself keepSelectedDuring: [" +
	"\n\t\t\tself kapitola: (met at: kapitola id)]]",
	null, "2013-05-15T15:21:26Z", "mp");

/*
jst.FYKapitolaPanel.addMethod("zmenaMetodikySO:", "met", "*srs-fytoportal-ior-edit", 
	"\t(kapitola class == FYKapitolaSO) ifTrue: [" +
	"\n\t\tself keepSelectedDuring: [" +
	"\n\t\t\tself clearSelections." +
	"\n\t\t\t(self root children detect: [:n | n link linkId = met id] ifNone: nil) ifNotNilDo: [:node |" +
	"\n\t\t\t\tnode link link: met id." +
	"\n\t\t\t\tnode reload]." +
	"\n\t\t] silently: true." +
	"\n\t]",
	null, "2013-04-25T14:21:55Z", "mp");

jst.FYKapitolaPanel.addMethod("zmenaMetodikySO:", "met", "*srs-fytoportal-ior-edit", 
	"\t(kapitola class == FYKapitolaSO) ifTrue: [ | node |" +
	"\n\t\tself keepSelectedDuring: [" +
	"\n\t\t\tnode := self root children detect: [:n | n link linkId = met id] ifNone: nil." +
	"\n\t\t\tnode ifNotNil: [" +
	"\n\t\t\t\tnode link link: met id." +
	"\n\t\t\t\tnode reload]" +
	"\n\t\t] silently: true ifFail: [" +
	"\n\t\t\t\"zobrazim nahled, pokud se nepodari zustat na vybrane kapitole\"" +
	"\n\t\t\tself selectionModel selectNode: node]" +
	"\n\t]",
	null, "2013-04-28T15:15:57Z", "mp");

jst.FYKapitolaPanel.addMethod("zmenaMetodikySO:", "met", "*srs-fytoportal-ior-edit", 
	"\t(kapitola class == FYKapitolaSO) ifTrue: [ | node |" +
	"\n\t\tself keepSelectedDuring: [" +
	"\n\t\t\tnode := self root children detect: [:n | n link linkId = met id] ifNone: nil." +
	"\n\t\t\tnode ifNotNil: [" +
	"\n\t\t\t\tnode := self root replaceChild: node  with: node copy." +
	"\n\t\t\t\tnode link link: met]" +
	"\n\t\t] silently: true ifFail: [" +
	"\n\t\t\t\"zobrazim nahled, pokud se nepodari zustat na vybrane kapitole\"" +
	"\n\t\t\tself selectionModel selectNode: node]" +
	"\n\t]",
	null, "2013-04-29T13:48:06Z", "mp");

jst.FYKapitolaPanel.addMethod("zmenaMetodikySO:", "met", "*srs-fytoportal-ior-edit", 
	"\t(kapitola class == FYKapitolaSO) ifTrue: [ | node |" +
	"\n\t\tself keepSelectedDuring: [" +
	"\n\t\t\tnode := self root children detect: [:n | n link linkId = met id] ifNone: nil." +
	"\n\t\t\tnode ifNotNil: [" +
	"\n\t\t\t\tmet kapitolaPM: node link link kapitolaPM." +
	"\n\t\t\t\tnode := self root replaceChild: node  with: node copy." +
	"\n\t\t\t\tnode link link: met]" +
	"\n\t\t] silently: true ifFail: [" +
	"\n\t\t\t\"zobrazim nahled, pokud se nepodari zustat na vybrane kapitole\"" +
	"\n\t\t\tself selectionModel selectNode: node]" +
	"\n\t]",
	null, "2013-05-02T08:23:25Z", "mp");

jst.FYKapitolaPanel.addMethod("zmenaMetodikySO:", "met", "*srs-fytoportal-ior-edit", 
	"\t(kapitola class == FYKapitolaSO) ifTrue: [ | node |" +
	"\n\t\tself keepSelectedDuring: [" +
	"\n\t\t\tnode := self root children detect: [:n | n link linkId = met id] ifNone: nil." +
	"\n\t\t\tnode ifNotNil: [" +
	"\n\t\t\t\tnode := self root replaceChild: node  with: node copy." +
	"\n\t\t\t\tnode link link: met]" +
	"\n\t\t] silently: true ifFail: [" +
	"\n\t\t\t\"zobrazim co ???, pokud se nepodari zustat na vybrane kapitole\"" +
	"\n\t\t\tself inspect]" +
	"\n\t]",
	null, "2013-05-02T13:15:32Z", "mp");

jst.FYKapitolaPanel.addMethod("zmenMetodikuSO:", "met", "*srs-fytoportal-ior-edit", 
	"\t(kapitola class == FYKapitolaSO) ifTrue: [ | node |" +
	"\n\t\tself keepSelectedDuring: [" +
	"\n\t\t\tnode := self root children detect: [:n | n link linkId = met id] ifNone: nil." +
	"\n\t\t\tnode ifNotNil: [" +
	"\n\t\t\t\tnode := self root replaceChild: node  with: node copy." +
	"\n\t\t\t\tnode link link: met]" +
	"\n\t\t] silently: true ifFail: [" +
	"\n\t\t\t\"zobrazim nahled, pokud se nepodari zustat na vybrane kapitole\"" +
	"\n\t\t\tself selectionModel selectNode: node]" +
	"\n\t]",
	null, "2013-04-29T13:48:06Z", "mp");
*/

jst.FYKapitolaPanel.addMethod("zmenaMetodikySO:", "met", "*srs-fytoportal-ior-edit", 
	"\t(kapitola class == FYKapitolaSO) ifTrue: [ | node |" +
	"\n\t\tself keepSelectedDuring: [" +
	"\n\t\t\tnode := self root children detect: [:n | n link linkId = met id] ifNone: nil." +
	"\n\t\t\tnode ifNotNil: [" +
	"\n\t\t\t\tnode := self root replaceChild: node  with: node copy." +
	"\n\t\t\t\tnode link link: met]" +
	"\n\t\t] silently: true ifFail: [" +
	"\n\t\t\t\"zobrazim nahled, pokud se nepodari zustat na vybrane kapitole\"" +
	"\n\t\t\tself selectionModel selectNode: node]" +
	"\n\t]",
	null, "2013-05-03T12:53:24Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("zmenaMetodikySO:", "met", "*srs-fytoportal-ior-edit", 
	"\t(kapitola class == FYKapitolaSO) ifTrue: [ | node |" +
	"\n\t\tself keepSelectedDuring: [" +
	"\n\t\t\tnode := self root children detect: [:n | n link linkId = met id] ifNone: nil." +
	"\n\t\t\tnode ifNotNil: [" +
	"\n\t\t\t\tnode := self root replaceChild: node  with: node copy." +
	"\n\t\t\t\tnode link link: met." +
	"\n\t\t\t\tnode text = met nazev ifFalse: [" +
	"\n\t\t\t\t\tkapitola resetujNazvy." +
	"\n\t\t\t\t\tnode text: met nazev]]" +
	"\n\t\t] silently: true ifFail: [" +
	"\n\t\t\t\"zobrazim nahled, pokud se nepodari zustat na vybrane kapitole\"" +
	"\n\t\t\tself selectionModel selectNode: node]" +
	"\n\t]",
	null, "2014-03-04T21:32:59Z", "mp", 2);

jst.FYKapitolaPanel.addMethod("zmenaMetodikySO:", "met", "*srs-fytoportal-ior-edit", 
	"\t(kapitola notNil and: [kapitola jeKapitolaSO]) ifTrue: [" +
	"\n\t\t| node |" +
	"\n\t\tnode := self root children detect: [:n | n link linkId = met id] ifNone: nil." +
	"\n\t\tnode ifNotNil: [" +
	"\n\t\t\tself keepSelectedDuring: [" +
	"\n\t\t\t\tnode := self root replaceChild: node  with: node copy." +
	"\n\t\t\t\tnode link link: met." +
	"\n\t\t\t\tkapitola resetujTaxony." +
	"\n\t\t\t\tnode text = met nazev ifFalse: [" +
	"\n\t\t\t\t\tnode text: met nazev]" +
	"\n\t\t\t] silently: true ifFail: [" +
	"\n\t\t\t\t\"zobrazim nahled, pokud se nepodari zustat na vybrane kapitole\"" +
	"\n\t\t\t\tself selectionModel selectNode: node]" +
	"\n\t\t]" +
	"\n\t]",
	null, "2014-03-11T16:34:31Z", "mp", 3);

jst.FYKapitolaPanel.addMethod("zmenaMetodikySO:", "met", "*srs-fytoportal-ior-edit", 
	"\t(kapitola notNil and: [kapitola jeKapitolaSO]) ifTrue: [" +
	"\n\t\t| node |" +
	"\n\t\tnode := self root children detect: [:n | n link linkId = met id] ifNone: nil." +
	"\n\t\tnode ifNotNil: [" +
	"\n\t\t\tself keepSelectedDuring: [" +
	"\n\t\t\t\tnode := self root replaceChild: node  with: node copy." +
	"\n\t\t\t\tnode link zmenMetodikuSO: met." +
	"\n\t\t\t\tnode text = met nazev ifFalse: [" +
	"\n\t\t\t\t\tnode text: met nazev]" +
	"\n\t\t\t] silently: true ifFail: [" +
	"\n\t\t\t\t\"zobrazim nahled, pokud se nepodari zustat na vybrane kapitole\"" +
	"\n\t\t\t\tself selectionModel selectNode: node]" +
	"\n\t\t]" +
	"\n\t]",
	null, "2014-03-11T22:16:57Z", "mp"); //fytoportal-ior-edit

jst.FYKapitolaPanel.addMethod("zmenaHostiteluSO:", "taxon", "*srs-fytoportal-ior-edit", 
	"\t(self class == FYKapitolaPanel & kapitola notNil and: [kapitola vsechnyTaxonyId includes: taxon id]) ifTrue: [" +
	"\n\t\t\"Ma smysl jen mimo editor\"" +
	"\n\t\tkapitola \tresetujTaxony." +
	"\n\t\tself keepSelectedDuring: [" +
	"\n\t\t\tself kapitola: kapitola]]",
	null, "2013-11-11T16:55:46Z", "mp", 1);

jst.FYKapitolaPanel.addMethod("zmenaHostiteluSO:", "taxon", "*srs-fytoportal-ior-edit", 
	"\t(self class == FYKapitolaPanel & kapitola notNil and: [kapitola taxonyId includes: taxon id]) ifTrue: [" +
	"\n\t\t\"Ma smysl jen mimo editor\"" +
	"\n\t\tkapitola \tresetujTaxony." +
	"\n\t\tself keepSelectedDuring: [" +
	"\n\t\t\tself kapitola: kapitola]]",
	null, "2014-03-06T08:28:25Z", "mp"); //fytoportal-ior-edit

//FYIORObsahPanel

jst.FYIORObsahPanel.addMethod("toggleEditing:", "aBoolean", "*srs-fytoportal-ior-edit", 
	"\teditor ifNil: [" +
	"\n\t\teditor := self add: FYIOREditor new]." +
	"\n\t\"editor editorPM toggleEditing: aBoolean.\"" +
	"\n\tself activeItem: (aBoolean ifTrue: 3 ifFalse: 2)." +
	"\n\taBoolean ifTrue: [" +
	"\n\t\teditor editorPM edituj: (obsah activeTab ifNotNilDo: [:tab | tab kapitola ] ifNil: metodika)]",
	null, "2013-01-10T16:12:16Z", "mp", 1);
/*
jst.FYIORObsahPanel.addMethod("toggleEditing:", "aBoolean", "*srs-fytoportal-ior-edit", 
	"\teditor ifNil: [" +
	"\n\t\teditor := self add: FYIOREditor new]." +
	"\n\t\"editor editorPM toggleEditing: aBoolean.\"" +
	"\n\tself activeItem: (aBoolean ifTrue: 3 ifFalse: 2)." +
	"\n\taBoolean ifTrue: [" +
	"\n\t\t\"pokud nacitam cestu po spusteni, musim odlozit - viz editacePM>>onForceStop:\"" +
	"\n\t\t(obsah activeTab ifNotNilDo: [:tab | tab kapitola ] ifNil: metodika) ifNotNilDo: [:m |" +
	"\n\t\t\teditor editorPM edituj: m]]",
	null, "2013-08-21T13:14:57Z", "mp"); //fytoportal-ior-edit
*/
jst.FYIORObsahPanel.addMethod("toggleEditing:", "aBoolean", "*srs-fytoportal-ior-edit", 
	"\teditor ifNil: [Fytoportal navigator path skipHistoryDuring: [" +
	"\n\t\teditor := self add: FYIOREditor new]]." +
	"\n\t\"editor editorPM toggleEditing: aBoolean.\"" +
	"\n\tself activeItem: (aBoolean ifTrue: 3 ifFalse: 2)." +
	"\n\taBoolean ifTrue: [" +
	"\n\t\teditor editorPM edituj: (obsah activeTab ifNotNilDo: [:tab | tab kapitola ] ifNil: metodika)]",
	null, "2013-08-22T22:05:00Z", "mp", 1);

jst.FYIORObsahPanel.addMethod("toggleEditing:", "aBoolean", "*srs-fytoportal-ior-edit", 
	"\teditor ifNil: [Fytoportal navigator path skipHistoryDuring: [" +
	"\n\t\teditor := self add: FYIOREditor new]]." +
	"\n\t\"editor editorPM toggleEditing: aBoolean.\"" +
	"\n\tself activeItem: (aBoolean ifTrue: 3 ifFalse: 2)." +
	"\n\taBoolean ifTrue: [ | met |" +
	"\n\t\tmet := (Fytoportal navigator ior editace value startsWith: #skup) " +
	"\n\t\t\tifTrue: [Fytoportal data obecnaMetodikaPro: (Fytoportal navigator ior editace value allButFirst: 4)] " +
	"\n\t\t\tifFalse: [obsah activeTab ifNotNilDo: [:tab | tab kapitola ] ifNil: metodika]." +
	"\n\t\teditor editorPM edituj: met]",
	null, "2013-12-03T22:29:58Z", "mp", 1);

jst.FYIORObsahPanel.addMethod("toggleEditing:", "aBoolean", "*srs-fytoportal-ior-edit", 
	"\teditor ifNil: [Fytoportal navigator path skipHistoryDuring: [" +
	"\n\t\teditor := self add: FYIOREditor new]]." +
	"\n\t\"editor editorPM toggleEditing: aBoolean.\"" +
	"\n\tself activeItem: (aBoolean ifTrue: [self items last jstWrapper] ifFalse: [obsah])." +
	"\n\taBoolean ifTrue: [ | met |" +
	"\n\t\tmet := (Fytoportal navigator ior editace value startsWith: #skup) " +
	"\n\t\t\tifTrue: [Fytoportal data obecnaMetodikaPro: (Fytoportal navigator ior editace value allButFirst: 4)] " +
	"\n\t\t\tifFalse: [obsah activeTab ifNotNilDo: [:tab | tab kapitola ] ifNil: metodika]." +
	"\n\t\teditor editorPM edituj: met]",
	null, "2014-02-09T21:39:42Z", "mp"); //fytoportal-ior-edit

jst.FYIORObsahPanel.addMethod("zmenaMetodiky:", "met", "*srs-fytoportal-ior-edit", 
	"\tmetodika := met",
	null, "2013-01-26T21:51:46Z", "mp");

jst.FYIORObsahPanel.addMethod("editor", "", "*srs-fytoportal-ior-edit", 
	"\t^ editor",
	null, "2013-09-04T15:13:44Z", "mp");

//FYIORNavig

jst.FYIORNavig.addMethod("editace", "", "*srs-fytoportal-ior-edit", 
	"\t^ paths at: #editace ifAbsentPut: [" +
	"\n\t\tAppCrossroad new " +
	"\n\t\t\taddExit: self editacePM;" +
	"\n\t\t\taddExit: (self editaceMetodik: #abionozy);" +
	"\n\t\t\taddExit: (self editaceMetodik: #choroby);" +
	"\n\t\t\taddExit: (self editaceMetodik: #skudci);" +
	"\n\t\t\taddExit: (self editacePouziti: #plodiny);" +
	"\n\t\t\taddExit: (self editacePouziti: #skodlOrg)]",
	null, "2013-04-02T15:32:17Z", "mp", 1);

jst.FYIORNavig.addMethod("editace", "", "*srs-fytoportal-ior-edit", 
	"\t^ paths at: #editace ifAbsentPut: [" +
	"\n\t\tAppCrossroad new " +
	"\n\t\t\tskipHistory: true;" +
	"\n\t\t\taddExit: self editacePM;" +
	"\n\t\t\taddExit: (self editaceMetodik: #abionozy);" +
	"\n\t\t\taddExit: (self editaceMetodik: #choroby);" +
	"\n\t\t\taddExit: (self editaceMetodik: #skudci);" +
	"\n\t\t\taddExit: (self editacePouziti: #plodiny);" +
	"\n\t\t\taddExit: (self editacePouziti: #skodlOrg)]",
	null, "2013-08-22T15:11:29Z", "mp", 1);

jst.FYIORNavig.addMethod("editace", "", "*srs-fytoportal-ior-edit", 
	"\t^ paths at: #editace ifAbsentPut: [" +
	"\n\t\tAppCrossroad new " +
	"\n\t\t\tid: #edit;" +
	"\n\t\t\tskipHistory: true;" +
	"\n\t\t\taddExit: self editacePM;" +
	"\n\t\t\taddExit: (self editaceMetodik: #abionozy);" +
	"\n\t\t\taddExit: (self editaceMetodik: #choroby);" +
	"\n\t\t\taddExit: (self editaceMetodik: #skudci);" +
	"\n\t\t\taddExit: (self editacePouziti: #plodiny);" +
	"\n\t\t\taddExit: (self editacePouziti: #skodlOrg)]",
	null, "2013-09-06T18:49:10Z", "mp", 1);

jst.FYIORNavig.addMethod("editace", "", "*srs-fytoportal-ior-edit", 
	"\t^ paths at: #editace ifAbsentPut: [" +
	"\n\t\tAppCrossroad new " +
	"\n\t\t\tid: #edit;" +
	"\n\t\t\taddExit: self editacePM;" +
	"\n\t\t\taddExit: (self editaceMetodik: #abionozy);" +
	"\n\t\t\taddExit: (self editaceMetodik: #choroby);" +
	"\n\t\t\taddExit: (self editaceMetodik: #skudci);" +
	"\n\t\t\taddExit: (self editacePouziti: #plodiny);" +
	"\n\t\t\taddExit: (self editacePouziti: #skodlOrg)]",
	null, "2014-02-12T20:44:16Z", "mp"); //fytoportal-ior-edit

jst.FYIORNavig.addMethod("editacePM", "", "*srs-fytoportal-ior-edit", 
	"\t^ paths at: #editacePM ifAbsentPut: [" +
	"\n\t\tAppPath new addExit: self editaceHlavniKapPM]",
	null, "2013-01-19T22:24:01Z", "mp", 1);

jst.FYIORNavig.addMethod("editacePM", "", "*srs-fytoportal-ior-edit", 
	"\t^ paths at: #editacePM ifAbsentPut: [" +
	"\n\t\tAppCrossroad new addExit: self editaceHlavniKapPM]",
	null, "2013-09-02T15:08:22Z", "mp", 1);

jst.FYIORNavig.addMethod("editacePM", "", "*srs-fytoportal-ior-edit", 
	"\t^ paths at: #editacePM ifAbsentPut: [" +
	"\n\t\tAppCrossroad new " +
	"\n\t\t\tid: #met; " +
	"\n\t\t\taddExit: self editaceHlavniKapPM]",
	null, "2013-09-06T18:52:39Z", "mp"); //fytoportal-ior-edit

jst.FYIORNavig.addMethod("editaceHlavniKapPM", "", "*srs-fytoportal-ior-edit", 
	"\t^ paths at: #editaceHlavniKapPM ifAbsentPut: [" +
	"\n\t\tAppCrossroad new addExit: self editaceKapPM]",
	null, "2013-01-19T22:26:52Z", "mp", 1);

jst.FYIORNavig.addMethod("editaceHlavniKapPM", "", "*srs-fytoportal-ior-edit", 
	"\t^ paths at: #editaceHlavniKapPM ifAbsentPut: [" +
	"\n\t\tAppCrossroad new " +
	"\n\t\t\tid: #kap1;" +
	"\n\t\t\taddExit: self editaceKapPM]",
	null, "2013-09-06T18:49:53Z", "mp"); //fytoportal-ior-edit

jst.FYIORNavig.addMethod("editaceKapPM", "", "*srs-fytoportal-ior-edit", 
	"\t^ paths at: #editaceKapPM ifAbsentPut: [" +
	"\n\t\tAppCrossroad new]",
	null, "2013-01-19T22:27:14Z", "mp", 1);

jst.FYIORNavig.addMethod("editaceKapPM", "", "*srs-fytoportal-ior-edit", 
	"\t^ paths at: #editaceKapPM ifAbsentPut: [" +
	"\n\t\tAppCrossroad new id: #kap]",
	null, "2013-09-06T18:50:08Z", "mp"); //fytoportal-ior-edit

jst.FYIORNavig.addMethod("editaceMetodik:", "id", "*srs-fytoportal-ior-edit", 
	"\t^ paths at: 'editace', id ifAbsentPut: [" +
	"\n\t\tAppCrossroad new addExit: AppCrossroad new]",
	null, "2013-01-19T22:29:36Z", "mp", 1);

jst.FYIORNavig.addMethod("editaceMetodik:", "id", "*srs-fytoportal-ior-edit", 
	"\t^ paths at: 'editace', id ifAbsentPut: [" +
	"\n\t\tAppCrossroad new " +
	"\n\t\t\tid: id;" +
	"\n\t\t\taddExit: (AppCrossroad new id: #kap)]",
	null, "2013-09-06T18:52:05Z", "mp"); //fytoportal-ior-edit

jst.FYIORNavig.addMethod("editacePouziti:", "id", "*srs-fytoportal-ior-edit", 
	"\t^ paths at: #editacePouziti, id ifAbsentPut: [" +
	"\n\t\tAppCrossroad new]",
	null, "2013-04-02T15:31:49Z", "mp", 1);

jst.FYIORNavig.addMethod("editacePouziti:", "id", "*srs-fytoportal-ior-edit", 
	"\t^ paths at: #editacePouziti, id ifAbsentPut: [" +
	"\n\t\tAppCrossroad new id: id]",
	null, "2013-09-06T18:53:11Z", "mp"); //fytoportal-ior-edit

/* zruseno - taxon se edituje zvlast
jst.FYTaxonPopisPanel.addMethod("zmenaMetodikySO:", "met", "*srs-fytoportal-ior-edit", 
	"\tself zmenaPopisuTaxonu: met taxon",
	null, "2013-04-26T06:29:51Z", "mp");

jst.FYTaxonEditor.addMethod("zmenaMetodikySO:", "met", "*srs-fytoportal-ior-edit", 
	"\t\"posila IOR - texon se mohl zmenit - pro jednoduchost jen zahodim zmeny\"" +
	"\n\t(jinyTaxon = met taxon or: [taxon = met taxon]) ifTrue: [" +
	"\n\t\ttaxon ifNotNil: [" +
	"\n\t\t\tself zahodZmeny]." +
	"\n\t\tself taxon: met taxon]",
	null, "2013-05-03T12:37:53Z", "mp");

jst.FYTaxonPopisEditor.addMethod("broadcastEvent:with:", "eventName anObject", "*srs-fytoportal-ior-edit", 
	"\teventName = #zmenaPopisuTaxonu: " +
	"\n\t\tifFalse: [super broadcastEvent: eventName with: anObject]" +
	"\n\t\tifTrue: [" +
	"\n\t\t\t\"posilam jen z fotogalerie - superclass posila #zmenaMetodikySO:\"" +
	"\n\t\t\tself class == FYTaxonPopisEditor ifTrue: [" +
	"\n\t\t\t\tanObject popis. \"nactu popis z metodiky driv, nez poslu zpravu\"" +
	"\n\t\t\t\tsuper broadcastEvent: eventName with: anObject" +
	"\n\t\t\t]" +
	"\n\t\t]",
	null, "2013-04-27T20:22:57Z", "mp");
*/
jst.FYTaxonPopisEditor.addMethod("broadcastEvent:with:async:", "eventName anObject aBoolean", "*srs-fytoportal-ior-edit", 
	"\teventName = #zmenaPopisuTaxonu: " +
	"\n\t\tifFalse: [super broadcastEvent: eventName with: anObject async: aBoolean]" +
	"\n\t\tifTrue: [" +
	"\n\t\t\t\"posilam jen z fotogalerie - superclass posila #zmenaMetodikySO:\"" +
	"\n\t\t\tself class == FYTaxonPopisEditor ifTrue: [" +
	"\n\t\t\t\tanObject popis. \"nactu popis z metodiky driv, nez poslu zpravu\"" +
	"\n\t\t\t\tsuper broadcastEvent: eventName with: anObject async: aBoolean" +
	"\n\t\t\t]" +
	"\n\t\t]",
	null, "2013-06-23T21:26:11Z", "mp");

/*
jst.FYTextKapitolyPanel.addMethod("zmenaMetodikySO:", "met", "*srs-fytoportal-ior-edit", 
	"\t(kapitola notNil and: [kapitola id = met id]) ifTrue: [" +
	"\n\t\tself isActive ifTrue: [" +
	"\n\t\t\tkapitola := met." +
	"\n\t\t\tself refreshContent" +
	"\n\t\t] ifFalse: [" +
	"\n\t\t\tkapitola := nil]" +
	"\n\t]",
	null, "2013-04-26T14:44:50Z", "mp");

jst.FYTextKapitolyPanel.addMethod("zmenaMetodikySO:", "met", "*srs-fytoportal-ior-edit", 
	"\t(kapitola notNil and: [kapitola id = met id]) ifTrue: [" +
	"\n\t\tself isActive ifTrue: [" +
	"\n\t\t\t\"semfor se nesmi nacist - zobrazim stary semafor, v nejhorsim prazdnou tabulku" +
	"\n\t\t\tsemaforData ifNil: [semaforData := #()]. ???\"" +
	"\n\t\t\tkapitola := met." +
	"\n\t\t\tself refreshContent" +
	"\n\t\t] ifFalse: [" +
	"\n\t\t\tkapitola := nil]" +
	"\n\t]",
	null, "2013-04-29T08:46:47Z", "mp");

jst.FYTextKapitolyPanel.addMethod("zmenaMetodikySO:", "met", "*srs-fytoportal-ior-edit", 
	"\t(kapitola notNil and: [kapitola id = met id]) ifTrue: [" +
	"\n\t\tkapitola := met." +
	"\n\t\tself resetContent]",
	null, "2013-04-29T11:15:30Z", "mp");

jst.FYTextKapitolyPanel.addMethod("zmenaMetodikySO:", "met", "*srs-fytoportal-ior-edit", 
	"\t(kapitola notNil and: [kapitola id = met id]) ifTrue: [" +
	"\n\t\tmet kapitolaPM: kapitola kapitolaPM." +
	"\n\t\tkapitola := met." +
	"\n\t\tself resetContent]",
	null, "2013-05-02T08:19:53Z", "mp");

jst.FYTextKapitolyPanel.addMethod("zmenaMetodikySO:", "met", "*srs-fytoportal-ior-edit", 
	"\t(kapitola notNil and: [kapitola id = met id]) ifTrue: [" +
	"\n\t\tkapitola := met." +
	"\n\t\tself resetContent]",
	null, "2013-05-02T13:12:45Z", "mp");

jst.FYTextKapitolyPanel.addMethod("zmenMetodikuSO:", "met", "*srs-fytoportal-ior-edit", 
	"\t(kapitola notNil and: [kapitola id = met id]) ifTrue: [" +
	"\n\t\tkapitola := met." +
	"\n\t\tself resetContent]",
	null, "2013-05-02T21:21:57Z", "mp");

jst.FYTextKapitolyPanel.addMethod("zmenMetodikuSO:", "met", "*srs-fytoportal-ior-edit", 
	"\t(metodikaSO notNil and: [metodikaSO id = met id]) ifTrue: [" +
	"\n\t\tmetodikaSO := met." +
	"\n\t\tkapitola link: met. \"tady??? - melo by se zajistit na jednom miste, napr. v FYMetodikyPanel\"" +
	"\n\t\tself resetContent]",
	null, "2013-05-03T10:20:23Z", "mp");

jst.FYTextKapitolyPanel.addMethod("zmenaMetodikySO:", "met", "*srs-fytoportal-ior-edit", 
	"\t(metodikaSO notNil and: [metodikaSO id = met id]) ifTrue: [" +
	"\n\t\tmetodikaSO := met." +
	"\n\t\tself resetContent]",
	null, "2013-05-03T12:54:18Z", "mp");
*/

/* cely koncept prekresli zrusen jako moc slozity a neprehledny
jst.FYTextKapitolyPanel.addMethod("pathActivated:", "path", "*srs-fytoportal-ior-edit", 
	"\tkapitola = prekresli & kapitola notNil ifTrue: [" +
	"\n\t\tprekresli := nil." +
	"\n\t\tsemaforData := nil." +
	"\n\t\tself refreshContent]",
	null, "2013-05-01T19:57:06Z", "mp");
*/

jst.FYTextKapitolyPanel.addMethod("zmenaMetodiky:", "met", "*srs-fytoportal-ior-edit", 
	"\tkapitola ifNotNil: [" +
	"\n\t\tkapitola := met at: id." +
	"\n\t\tself resetContent]",
	null, "2013-05-15T14:32:04Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("zmenaMetodiky:", "met", "*srs-fytoportal-ior-edit", 
	"\tkapitola ifNotNil: [" +
	"\n\t\tkapitola := met at: id." +
	"\n\t\tself refreshContent]",
	null, "2013-12-17T15:50:46Z", "mp", 2);

jst.FYTextKapitolyPanel.addMethod("zmenaMetodiky:", "met", "*srs-fytoportal-ior-edit", 
	"\t(kapitola notNil and: [kapitola metodika typ = met typ]) ifTrue: [" +
	"\n\t\tkapitola := met at: id." +
	"\n\t\tself refreshContent]",
	null, "2014-02-09T21:52:02Z", "mp", 3);

jst.FYTextKapitolyPanel.addMethod("zmenaMetodiky:", "met", "*srs-fytoportal-ior-edit", 
	"\t(kapitola notNil and: [kapitola metodika typ = met typ]) ifTrue: [" +
	"\n\t\tkapitola := met at: id." +
	"\n\t\tsemaforData := nil." +
	"\n\t\tself refreshContent]",
	null, "2014-02-16T23:00:51Z", "mp"); //fytoportal-ior-edit

jst.FYTextKapitolyPanel.addMethod("zmenaMapovaniPOR", "", "*srs-fytoportal-ior-edit", 
	"\tself resetContent",
	null, "2013-05-06T12:43:14Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("zmenaMapovaniPOR", "", "*srs-fytoportal-ior-edit", 
	"\tself refreshContent",
	null, "2013-12-17T15:50:52Z", "mp", 2);

jst.FYTextKapitolyPanel.addMethod("zmenaMapovaniPOR", "", "*srs-fytoportal-ior-edit", 
	"\tkapitola ifNotNil: [" +
	"\n\t\tself refreshContent]",
	null, "2014-01-28T08:50:39Z", "mp", 3);

jst.FYTextKapitolyPanel.addMethod("zmenaMapovaniPOR", "", "*srs-fytoportal-ior-edit", 
	"\tkapitola ifNotNil: [" +
	"\n\t\tsemaforData := nil." +
	"\n\t\tself refreshContent]",
	null, "2014-02-20T15:30:56Z", "mp");

jst.FYTextKapitolyPanel.addMethod("zmenaFotkyKapitoly:", "kap", "*srs-fytoportal-ior-edit", 
	"\tkapitola == kap ifTrue: [" +
	"\n\t\tself refreshContent]",
	null, "2014-03-09T21:36:53Z", "mp");

jst.FYTextKapitolyPanel.addMethod("zmenaObecneMetodiky:", "met", "*srs-fytoportal-ior-edit", 
	"\t\"mimo editor - test na obecnou metodiku to vylucuje\"" +
	"\n\t(kapitola notNil and: [kapitola metodika maObecnouMetodiku: met id]) ifTrue: [" +
	"\n\t\tself refreshContent]",
	null, "2014-03-15T21:21:01Z", "mp");

//FYTextKapSOPanel

jst.FYTextKapSOPanel.addMethod("zmenaMetodiky:", "met", "*srs-fytoportal-ior-edit", 
	"\tkapitola1 ifNotNil: [" +
	"\n\t\tkapitola1 := met at: id." +
	"\n\t\t(kapitola1 obsah asCollection detect: [:kap | kap linkId = skocinId] ifNone: nil) " +
	"\n\t\t\tifNotNilDo: [:kap | " +
	"\n\t\t\t\tkapitola := kap." +
	"\n\t\t\t\tprekresli := kap]" +
	"\n\t\t\tifNil: [skocinId := #tisk]." +
	"\n\t\tself resetContent]",
	null, "2013-05-15T14:52:13Z", "mp", 1);

jst.FYTextKapSOPanel.addMethod("zmenaMetodiky:", "met", "*srs-fytoportal-ior-edit", 
	"\tkapitola1 ifNotNil: [" +
	"\n\t\tkapitola1 := met at: id." +
	"\n\t\t(kapitola1 obsah asCollection detect: [:kap | kap linkId = skocinId] ifNone: nil) " +
	"\n\t\t\tifNotNilDo: [:kap | " +
	"\n\t\t\t\tkapitola := kap." +
	"\n\t\t\t\tprekresli := kap]" +
	"\n\t\t\tifNil: [skocinId := id]." +
	"\n\t\tself resetContent]",
	null, "2013-05-30T09:09:41Z", "mp", 1);

jst.FYTextKapSOPanel.addMethod("zmenaMetodiky:", "met", "*srs-fytoportal-ior-edit", 
	"\tkapitola1 ifNotNil: [" +
	"\n\t\tkapitola1 := met at: id." +
	"\n\t\t(kapitola1 obsah asCollection detect: [:kap | kap linkId = skocinId] ifNone: nil) " +
	"\n\t\t\tifNotNilDo: [:kap | " +
	"\n\t\t\t\tkapitola := kap]" +
	"\n\t\t\tifNil: [skocinId := id]." +
	"\n\t\tself refreshContent]",
	null, "2013-12-18T20:28:45Z", "mp", 1);

jst.FYTextKapSOPanel.addMethod("zmenaMetodiky:", "met", "*srs-fytoportal-ior-edit", 
	"\tkapitola1 ifNotNil: [" +
	"\n\t\tkapitola1 := met at: id." +
	"\n\t\t(kapitola1 obsah asCollection detect: [:kap | kap linkId = skocinId] ifNone: nil) " +
	"\n\t\t\tifNotNilDo: [:kap | " +
	"\n\t\t\t\tkapitola := kap]" +
	"\n\t\t\tifNil: [\"skocin byl odstranen z metodiky\"" +
	"\n\t\t\t\tskocinId := nil." +
	"\n\t\t\t\tkapitola := nil." +
	"\n\t\t\t\tmetodikaSO := nil]." +
	"\n\t\tself refreshContent]",
	null, "2014-01-28T09:08:09Z", "mp", 1);

jst.FYTextKapSOPanel.addMethod("zmenaMetodiky:", "met", "*srs-fytoportal-ior-edit", 
	"\t(kapitola1 notNil and: [kapitola1 metodika typ = met typ]) ifTrue: [" +
	"\n\t\tkapitola1 := met at: id." +
	"\n\t\t(kapitola1 obsah asCollection detect: [:kap | kap linkId = skocinId] ifNone: nil) " +
	"\n\t\t\tifNotNilDo: [:kap | " +
	"\n\t\t\t\tkapitola := kap]" +
	"\n\t\t\tifNil: [\"skocin byl odstranen z metodiky\"" +
	"\n\t\t\t\tskocinId := nil." +
	"\n\t\t\t\tkapitola := nil." +
	"\n\t\t\t\tmetodikaSO := nil]." +
	"\n\t\tself refreshContent]",
	null, "2014-02-09T21:53:14Z", "mp", 1);

jst.FYTextKapSOPanel.addMethod("zmenaMetodiky:", "met", "*srs-fytoportal-ior-edit", 
	"\t(kapitola1 notNil and: [kapitola1 metodika typ = met typ]) ifTrue: [" +
	"\n\t\tkapitola1 := met at: id." +
	"\n\t\t(kapitola1 kapitolyTisk detect: [:kap | kap linkId = skocinId] ifNone: nil) " +
	"\n\t\t\tifNotNilDo: [:kap | " +
	"\n\t\t\t\tkapitola := kap]" +
	"\n\t\t\tifNil: [\"skocin byl odstranen z metodiky\"" +
	"\n\t\t\t\tskocinId := nil." +
	"\n\t\t\t\tkapitola := nil." +
	"\n\t\t\t\tmetodikaSO := nil]." +
	"\n\t\tself refreshContent]",
	null, "2014-05-06T20:03:33Z", "mp"); //fytoportal-ior-edit

jst.FYTextKapSOPanel.addMethod("zmenaMetodikySO:", "met", "*srs-fytoportal-ior-edit", 
	"\tskocinId = met id ifTrue: [" +
	"\n\t\t\"vybrany SO\"" +
	"\n\t\tkapitola zmenMetodikuSO: met." +
	"\n\t\tself refreshContent" +
	"\n\t] ifFalse: [(skocinId isNil & kapitola1 notNil and: [kapitola1 id = met class kapitola]) ifTrue: [" +
	"\n\t\t| kap |" +
	"\n\t\t\"seznam SO\"" +
	"\n\t\tkap := kapitola1 kapitolyTiskVyber detect: [:k | k linkId = met id] ifNone: nil." +
	"\n\t\tkap ifNotNil: [" +
	"\n\t\t\tkap zmenMetodikuSO: met." +
	"\n\t\t\tself refreshContent]" +
	"\n\t]]",
	null, "2014-03-12T09:29:40Z", "mp");

jst.FYTextKapSOPanel.addMethod("zmenaHostiteluSO:", "tax", "*srs-fytoportal-ior-edit", 
	"\t\"taxon je pres sve hostitele navazan na vyber plodin metodiky\"" +
	"\n\t(kapitola1 notNil and: [kapitola1 vsechnyTaxonyId includes: tax id]) ifTrue: [" +
	"\n\t\t(skocinId isNil and: [self isActive]) " +
	"\n\t\t\tifTrue: [self refreshContent] " +
	"\n\t\t\tifFalse: [\tkapitola1 resetujTaxony]]",
	null, "2013-11-11T15:42:49Z", "mp", 1);

jst.FYTextKapSOPanel.addMethod("zmenaHostiteluSO:", "tax", "*srs-fytoportal-ior-edit", 
	"\t\"taxon je pres sve hostitele navazan na vyber plodin metodiky\"" +
	"\n\t(kapitola1 notNil and: [kapitola1 vsechnyTaxonyId includes: tax id]) ifTrue: [" +
	"\n\t\t\"aktualizuji seznam taxonu - pro jednoduchost udelam refresh hned, " +
	"\n\t\tprotoze pri prekliknuti z fotogalerie se activateEvent nezavola\"" +
	"\n\t\tkapitola1 resetujTaxony." +
	"\n\t\tskocinId ifNil: [" +
	"\n\t\t\tself refreshContent]]",
	null, "2013-12-17T22:48:45Z", "mp", 1);

jst.FYTextKapSOPanel.addMethod("zmenaHostiteluSO:", "tax", "*srs-fytoportal-ior-edit", 
	"\t\"taxon je pres sve hostitele navazan na vyber plodin metodiky\"" +
	"\n\t(kapitola1 notNil and: [kapitola1 taxonyId includes: tax id]) ifTrue: [" +
	"\n\t\t\"aktualizuji seznam taxonu - pro jednoduchost udelam refresh hned, " +
	"\n\t\tprotoze pri prekliknuti z fotogalerie se activateEvent nezavola\"" +
	"\n\t\tkapitola1 resetujTaxony." +
	"\n\t\tskocinId ifNil: [" +
	"\n\t\t\tself refreshContent]]",
	null, "2014-03-06T08:30:12Z", "mp"); //fytoportal-ior-edit

jst.FYTextKapSOPanel.addMethod("fotkaZmenena:", "fotka", "*srs-fytoportal-foto-edit", 
	"\t(metodikaSO notNil and: [metodikaSO taxonyId includes: fotka skodlOrg]) ifTrue: [" +
	"\n\t\tself refreshContent" +
	"\n\t] ifFalse: [(fotka skodlOrg notNil and: [kapitola1 notNil] " +
	"\n\t\tand: [kapitola1 taxonyId includes: fotka skodlOrg]) ifTrue: [" +
	"\n\t\tkapitola1 resetujFotky." +
	"\n\t\tself refreshContent]" +
	"\n\t]",
	null, "2014-03-06T08:28:52Z", "mp"); //fytoportal-foto-edit

jst.FYTextKapSOPanel.addMethod("zmenaObecneMetodiky:", "met", "*srs-fytoportal-ior-edit", 
	"\t\"mimo editor - test na obecnou metodiku to vylucuje\"" +
	"\n\t(kapitola1 notNil and: [kapitola1 metodika maObecnouMetodiku: met id]) ifTrue: [" +
	"\n\t\t(kapitola notNil and: [kapitola fotka isNil]) ifTrue: [" +
	"\n\t\t\t\"vychozi fotka se mohla zmenit\"" +
	"\n\t\t\t((met at: kapitola1 id) obsah detect: [:k | k linkId = skocinId] ifNone: nil) ifNotNilDo: [:kap |" +
	"\n\t\t\t\tkapitola zobrazFotku: kap vychoziFotka]]." +
	"\n\t\tself refreshContent]",
	null, "2014-03-15T21:31:11Z", "mp"); //fytoportal-ior

//FYVazbyEditor

jst.FYVazbyEditor.addMethod("zmenaHostiteluSO:", "tax", "*srs-fytoportal-ior-edit", 
	"\t\"posila IOR do fotogalerie - zmena hostitelu v metodice SO\"" +
	"\n\t(taxon = tax and: [(taxon == tax) not]) ifTrue: [" +
	"\n\t\t\"mimo tento editor - pro jednoduchost zahodim zmeny\"" +
	"\n\t\tself " +
	"\n\t\t\tzahodZmeny;" +
	"\n\t\t\ttaxon: tax]",
	null, "2013-11-11T14:09:35Z", "mp");


/* ** FYIOREditNavig ***

jst.FYIOREditNavig.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\theight: 21;" +
	"\n\t\tborder: false;" +
	"\n\t\tbodyStyle: 'padding: 2px 5px; font-size: 11px; background-color: transparent';" +
	"\n\t\twithHBoxLayout;" +
	"\n\t\thide;" +
	"\n\t\tadd: (editCheck := ExtCheckbox new " +
	"\n\t\t\tboxLabel: 'editace')",
	null, "2013-01-16T08:33:10Z", "mp");

jst.FYIOREditNavig.addMethod("installListeners", "", "initialization", 
	"\tsuper installListeners." +
	"\n\teditCheck on: #check do: [:chbox :checked | checked " +
	"\n\t\tifTrue: [Fytoportal navigator path savePath." +
	"\n\t\t\tFytoportal navigator ior editace enter: checked labeled: 'Editace']" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tFytoportal navigator path restorePath." +
	"\n\t\t\tself sendEvent: #toggleEditing: with: checked]]." +
	"\n\tFytoportal navigator ior editace" +
	"\n\t\tcomponent: editCheck;" +
	"\n\t\tonEnter: [:path :checked |" +
	"\n\t\t\tself sendEvent: #toggleEditing: with: checked]",
	null, "2013-01-16T09:58:47Z", "mp");

jst.FYIOREditNavig.addMethod("loggedIn", "", "events", 
	"\tFytoportal navigator ior isActivePath & (Fytoportal db server userRoles includes: #fyAdminIOR) ifTrue: [" +
	"\n\t\t\"nefunguje, pokud neni IOR aktivni - panel aktivuji tedy pozdeji\"" +
	"\n\t\tself show." +
	"\n\t\teditCheck isEnabled: Fytoportal navigator ior metodika isActivePath." +
	"\n\t\tself ownerContainer doLayout]",
	null, "2013-01-18T10:52:47Z", "mp"); //fytoportal-ior-edit

jst.FYIOREditNavig.addMethod("loggedOut", "", "events", 
	"\teditCheck value ifFalse: [" +
	"\n\t\tself hide." +
	"\n\t\tself ownerContainer doLayout]",
	null, "2013-01-07T10:17:20Z", "mp");

jst.FYIOREditNavig.addMethod("renderEvent", "", "events", 
	"\t^ [self loggedIn]",
	null, "2013-01-07T10:02:20Z", "mp");

jst.FYIOREditNavig.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #metodika ifTrue: [" +
	"\n\t\teditCheck isEnabled: true]",
	null, "2013-01-07T10:06:27Z", "mp");
*/

//*** FYMetodikyEditPanel ***

jst.FYMetodikyEditPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\tadd: (navig := ExtFormPanel new" +
	"\n\t\t\tregion: #south; " +
	"\n\t\t\theight: 21;" +
	"\n\t\t\tborder: false;" +
	"\n\t\t\tbodyStyle: 'padding: 2px 5px; font-size: 11px; background-color: transparent';" +
	"\n\t\t\twithHBoxLayout;" +
	"\n\t\t\thide;" +
	"\n\t\t\tadd: (editCheck := ExtCheckbox new " +
	"\n\t\t\t\tboxLabel: 'editace';" +
	"\n\t\t\t\tbeDisabled);" +
	"\n\t\t\tyourself)." +
	"\n\tself on: #activate do: [" +
	"\n\t\tnavig isVisible ifFalse: [self loggedIn]]",
	null, "2013-01-29T08:57:37Z", "mp", 1);

jst.FYMetodikyEditPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\tadd: (navig := ExtPanel new" +
	"\n\t\t\tregion: #south; " +
	"\n\t\t\theight: 21;" +
	"\n\t\t\tborder: false;" +
	"\n\t\t\tbodyStyle: 'padding: 2px 5px; font-size: 11px; background-color: transparent';" +
	"\n\t\t\twithHBoxLayout;" +
	"\n\t\t\thide;" +
	"\n\t\t\tadd: (editCheck := ExtCheckbox new " +
	"\n\t\t\t\tboxLabel: 'editace';" +
	"\n\t\t\t\tbeDisabled);" +
	"\n\t\t\tyourself)." +
	"\n\tself on: #activate do: [" +
	"\n\t\tnavig isVisible ifFalse: [self loggedIn]]",
	null, "2013-08-19T15:06:51Z", "mp", 1);

jst.FYMetodikyEditPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\tadd: (navig := ExtPanel new" +
	"\n\t\t\tregion: #south; " +
	"\n\t\t\theight: 21;" +
	"\n\t\t\tborder: false;" +
	"\n\t\t\tbodyStyle: 'padding: 2px 5px; font-size: 11px; background-color: transparent';" +
	"\n\t\t\twithHBoxLayout;" +
	"\n\t\t\thide;" +
	"\n\t\t\tadd: (editCheck := ExtCheckbox new " +
	"\n\t\t\t\tboxLabel: 'editace';" +
	"\n\t\t\t\tbeDisabled);" +
	"\n\t\t\tyourself)." +
	"\n\tself on: #activate do: [" +
	"\n\t\tnavig isVisible = Fytoportal data isAdminIOR ifFalse: [" +
	"\n\t\t\tnavig isVisible " +
	"\n\t\t\t\tifFalse: [self loggedIn] " +
	"\n\t\t\t\tifTrue: [self loggedOut]]]",
	null, "2013-09-04T09:18:13Z", "mp"); //fytoportal-ior-edit

jst.FYMetodikyEditPanel.addMethod("installListeners", "", "initialization", 
	"\tsuper installListeners." +
	"\n\teditCheck on: #check do: [:chbox :checked | checked " +
	"\n\t\tifTrue: [Fytoportal navigator path savePath." +
	"\n\t\t\tFytoportal navigator ior editace enter: checked labeled: 'Editace']" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tFytoportal navigator path restorePath." +
	"\n\t\t\tself toggleEditing: checked]]." +
	"\n\tFytoportal navigator ior editace" +
	"\n\t\tcomponent: editCheck;" +
	"\n\t\tonEnter: [:path :checked |" +
	"\n\t\t\tself toggleEditing: checked]",
	null, "2013-01-18T14:47:30Z", "mp", 1);

jst.FYMetodikyEditPanel.addMethod("installListeners", "", "initialization", 
	"\tsuper installListeners." +
	"\n\teditCheck on: #check do: [:chbox :checked | checked " +
	"\n\t\tifTrue: [Fytoportal navigator path savePath." +
	"\n\t\t\tFytoportal navigator ior editace trackHistory: [:path | " +
	"\n\t\t\t\tpath enter: checked labeled: 'Editace']]" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tFytoportal navigator path trackHistory: [:path | " +
	"\n\t\t\t\tpath restorePath]." +
	"\n\t\t\tself toggleEditing: checked]]." +
	"\n\tFytoportal navigator ior editace" +
	"\n\t\tcomponent: editCheck;" +
	"\n\t\tonEnter: [:path :checked |" +
	"\n\t\t\tself toggleEditing: checked]",
	null, "2013-08-12T20:35:26Z", "mp", 1);

jst.FYMetodikyEditPanel.addMethod("installListeners", "", "initialization", 
	"\tsuper installListeners." +
	"\n\teditCheck on: #check do: [:chbox :checked | checked " +
	"\n\t\tifTrue: [Fytoportal navigator path savePath." +
	"\n\t\t\tFytoportal navigator ior editace trackHistory: [:path | " +
	"\n\t\t\t\tpath enter: checked labeled: 'Editace']]" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tFytoportal navigator path trackHistory: [:path | " +
	"\n\t\t\t\tpath restorePath]." +
	"\n\t\t\tself toggleEditing: checked]]." +
	"\n\tFytoportal navigator ior editace" +
	"\n\t\tcomponent: editCheck;" +
	"\n\t\tonEnter: [:path :checked |" +
	"\n\t\t\tself toggleEditing: checked];" +
	"\n\t\tonForceStop: [:p | editCheck value ifFalse: [" +
	"\n\t\t\teditCheck value: true]]." +
	"\n\tFytoportal navigator ior metodika" +
	"\n\t\tonForceStop: [:p :token | " +
	"\n\t\t\teditCheck value ifTrue: [" +
	"\n\t\t\t\teditCheck value: false]." +
	"\n\t\t\t\"musim zavolat standardni akci na komponente\"" +
	"\n\t\t\tp component forcePathStop: p on: token]",
	null, "2013-08-20T15:53:47Z", "mp", 1);

jst.FYMetodikyEditPanel.addMethod("installListeners", "", "initialization", 
	"\tsuper installListeners." +
	"\n\teditCheck on: #check do: [:chbox :checked | checked " +
	"\n\t\tifTrue: [Fytoportal navigator path savePath." +
	"\n\t\t\tFytoportal navigator ior editace trackHistory: [:path | " +
	"\n\t\t\t\tpath enter: checked labeled: 'Editace']]" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tFytoportal navigator path trackHistory: [:path | " +
	"\n\t\t\t\tpath restorePath]." +
	"\n\t\t\tself toggleEditing: checked]]." +
	"\n\tFytoportal navigator ior editace" +
	"\n\t\tcomponent: editCheck;" +
	"\n\t\tonEnter: [:path :checked |" +
	"\n\t\t\tself toggleEditing: checked];" +
	"\n\t\tonForceStop: [:p | " +
	"\n\t\t\t(navig isVisible and: [editCheck isEnabled] and: [editCheck value not]) ifTrue: [" +
	"\n\t\t\t\teditCheck value: true]]." +
	"\n\tFytoportal navigator ior metodika" +
	"\n\t\tonForceStop: [:p :token | " +
	"\n\t\t\teditCheck value ifTrue: [" +
	"\n\t\t\t\teditCheck value: false]." +
	"\n\t\t\t\"musim zavolat standardni akci na komponente\"" +
	"\n\t\t\tp component forcePathStop: p on: token]",
	null, "2013-08-21T09:13:50Z", "mp", 1);

jst.FYMetodikyEditPanel.addMethod("installListeners", "", "initialization", 
	"\tsuper installListeners." +
	"\n\teditCheck on: #check do: [:chbox :checked | checked " +
	"\n\t\tifTrue: [Fytoportal navigator path savePath." +
	"\n\t\t\tFytoportal navigator ior editace trackHistory: [:path | " +
	"\n\t\t\t\tpath enter: metodiky selectedNode id]]" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tFytoportal navigator path trackHistory: [:path | " +
	"\n\t\t\t\tpath restorePath]]." +
	"\n\t\tself toggleEditing: checked" +
	"\n\t]." +
	"\n\tFytoportal navigator ior editace" +
	"\n\t\tcomponent: editCheck;" +
	"\n\t\tonForceStop: [:p :id | " +
	"\n\t\t\t(navig isVisible and: [editCheck value not]) ifTrue: [" +
	"\n\t\t\t\tmetodiky selectedNode ifNil: [" +
	"\n\t\t\t\t\t\"pouze po spusteni aplikace\"" +
	"\n\t\t\t\t\tFytoportal data navigator path skipHistoryDuring: [" +
	"\n\t\t\t\t\t\tmetodiky selectNodeBy: [:n | n id = id] silently: false]]." +
	"\n\t\t\t\teditCheck beEnabled; value: true]]." +
	"\n\tFytoportal navigator ior metodika" +
	"\n\t\tonForceStop: [:p :token | " +
	"\n\t\t\teditCheck value ifTrue: [" +
	"\n\t\t\t\teditCheck value: false]." +
	"\n\t\t\t\"musim zavolat standardni akci na komponente\"" +
	"\n\t\t\tp component forcePathStop: p on: token]",
	null, "2013-08-21T14:54:16Z", "mp", 1);

jst.FYMetodikyEditPanel.addMethod("installListeners", "", "initialization", 
	"\tsuper installListeners." +
	"\n\teditCheck on: #check do: [:chbox :checked | checked " +
	"\n\t\tifTrue: [Fytoportal navigator path savePath." +
	"\n\t\t\tFytoportal navigator ior editace enter: metodiky selectedNode id]" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tFytoportal navigator path trackHistory: [:path | " +
	"\n\t\t\t\tpath restorePath]]." +
	"\n\t\tself toggleEditing: checked" +
	"\n\t]." +
	"\n\tFytoportal navigator ior editace" +
	"\n\t\tcomponent: editCheck;" +
	"\n\t\tonForceStop: [:p :id | " +
	"\n\t\t\t(navig isVisible and: [editCheck value not]) ifTrue: [" +
	"\n\t\t\t\tmetodiky selectedNode ifNil: [" +
	"\n\t\t\t\t\t\"pouze po spusteni aplikace\"" +
	"\n\t\t\t\t\tFytoportal data navigator path skipHistoryDuring: [" +
	"\n\t\t\t\t\t\tmetodiky selectNodeBy: [:n | n id = id] silently: false]]." +
	"\n\t\t\t\teditCheck beEnabled; value: true]]." +
	"\n\tFytoportal navigator ior metodika" +
	"\n\t\tonForceStop: [:p :token | " +
	"\n\t\t\teditCheck value ifTrue: [" +
	"\n\t\t\t\teditCheck value: false]." +
	"\n\t\t\t\"musim zavolat standardni akci na komponente\"" +
	"\n\t\t\tp component forcePathStop: p on: token]",
	null, "2013-08-22T10:07:25Z", "mp", 1);

jst.FYMetodikyEditPanel.addMethod("installListeners", "", "initialization", 
	"\tsuper installListeners." +
	"\n\teditCheck on: #check do: [:chbox :checked | checked " +
	"\n\t\tifTrue: [Fytoportal navigator path savePath." +
	"\n\t\t\tFytoportal navigator ior editace enter: metodiky selectedNode id]" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tFytoportal navigator path trackHistory: [:path | " +
	"\n\t\t\t\tpath restorePath]." +
	"\n\t\t\tFytoportal data isAdminIOR ifFalse: [" +
	"\n\t\t\t\t\"v prubehu editace doslo k odhlaseni\"" +
	"\n\t\t\t\tnavig hide." +
	"\n\t\t\t\tself doLayout." +
	"\n\t\t\t\tself inform: 'Uživatel odhlášen'->'V průběhu editace jste se odhlásili nebo Vaše přihlášení vyexpirovalo.']" +
	"\n\t\t]." +
	"\n\t\tself toggleEditing: checked" +
	"\n\t]." +
	"\n\tFytoportal navigator ior editace" +
	"\n\t\tcomponent: editCheck;" +
	"\n\t\tonForceStop: [:p :id | " +
	"\n\t\t\t(navig isVisible and: [editCheck value not]) ifTrue: [" +
	"\n\t\t\t\tmetodiky selectedNode ifNil: [" +
	"\n\t\t\t\t\t\"pouze po spusteni aplikace\"" +
	"\n\t\t\t\t\tFytoportal data navigator path skipHistoryDuring: [" +
	"\n\t\t\t\t\t\tmetodiky selectNodeBy: [:n | n id = id] silently: false]]." +
	"\n\t\t\t\teditCheck beEnabled; value: true]]." +
	"\n\tFytoportal navigator ior metodika" +
	"\n\t\tonForceStop: [:p :token | " +
	"\n\t\t\teditCheck value ifTrue: [" +
	"\n\t\t\t\teditCheck value: false]." +
	"\n\t\t\t\"musim zavolat standardni akci na komponente\"" +
	"\n\t\t\tp component forcePathStop: p on: token]",
	null, "2013-08-23T08:18:54Z", "mp", 1);

jst.FYMetodikyEditPanel.addMethod("installListeners", "", "initialization", 
	"\tsuper installListeners." +
	"\n\teditCheck on: #check do: [:chbox :checked | checked " +
	"\n\t\tifTrue: [Fytoportal navigator path savePath." +
	"\n\t\t\tFytoportal navigator ior editace enter: metodiky selectedNode id]" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tFytoportal navigator path trackHistory: [:path | " +
	"\n\t\t\t\tpath restorePath]." +
	"\n\t\t\tFytoportal data isAdminIOR ifFalse: [" +
	"\n\t\t\t\t\"v prubehu editace doslo k odhlaseni\"" +
	"\n\t\t\t\tnavig hide." +
	"\n\t\t\t\tself doLayout." +
	"\n\t\t\t\tself inform: 'Uživatel odhlášen'->'V průběhu editace jste se odhlásili nebo Vaše přihlášení vyexpirovalo.']" +
	"\n\t\t]." +
	"\n\t\tself toggleEditing: checked" +
	"\n\t]." +
	"\n\tFytoportal navigator ior editace" +
	"\n\t\tcomponent: editCheck;" +
	"\n\t\tonForceStop: [:p :id | " +
	"\n\t\t\t(navig isVisible and: [editCheck value not]) ifTrue: [" +
	"\n\t\t\t\tmetodiky selectedNode ifNil: [" +
	"\n\t\t\t\t\t\"pouze po spusteni aplikace\"" +
	"\n\t\t\t\t\tFytoportal data navigator path skipHistoryDuring: [" +
	"\n\t\t\t\t\t\tmetodiky selectNodeBy: [:n | n id = id] silently: false]]." +
	"\n\t\t\t\teditCheck beEnabled; value: true" +
	"\n\t\t\t] ifFalse: [navig isVisible & editCheck isDisabled ifTrue: [" +
	"\n\t\t\t\t\"editor je aktivni ale skryty - napr. kdyz v prubehu editace zobrazim info\"" +
	"\n\t\t\t\teditCheck beEnabled." +
	"\n\t\t\t\tFytoportal ior obsahPanel editor activate]]]." +
	"\n\tFytoportal navigator ior metodika" +
	"\n\t\tonForceStop: [:p :token | " +
	"\n\t\t\teditCheck value ifTrue: [" +
	"\n\t\t\t\teditCheck value: false]." +
	"\n\t\t\t\"musim zavolat standardni akci na komponente\"" +
	"\n\t\t\tp component forcePathStop: p on: token]",
	null, "2013-09-04T15:16:53Z", "mp", 1);

jst.FYMetodikyEditPanel.addMethod("installListeners", "", "initialization", 
	"\tsuper installListeners." +
	"\n\teditCheck on: #check do: [:chbox :checked | checked " +
	"\n\t\tifTrue: [Fytoportal navigator path savePath." +
	"\n\t\t\tFytoportal navigator ior editace enter: metodiky selectedNode id]" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tFytoportal navigator path trackHistory: [:path | " +
	"\n\t\t\t\tpath restorePath]." +
	"\n\t\t\tFytoportal data isAdminIOR ifFalse: [" +
	"\n\t\t\t\t\"v prubehu editace doslo k odhlaseni\"" +
	"\n\t\t\t\tnavig hide." +
	"\n\t\t\t\tself doLayout." +
	"\n\t\t\t\tself inform: 'Uživatel odhlášen'->'V průběhu editace jste se odhlásili nebo Vaše přihlášení vyexpirovalo.']" +
	"\n\t\t]." +
	"\n\t\tself toggleEditing: checked" +
	"\n\t]." +
	"\n\tFytoportal navigator ior editace" +
	"\n\t\tcomponent: editCheck;" +
	"\n\t\tonForceStop: [:p :id :last :asyncBlock | " +
	"\n\t\t\tFytoportal data isAdminIOR ifTrue: [" +
	"\n\t\t\t\tself zapniEditaciMetodiky: id" +
	"\n\t\t\t] ifFalse: [ExtLoginDialog new " +
	"\n\t\t\t\ttitle: 'Přihlášení (návrat na editační obrazovku)';" +
	"\n\t\t\t\tonLogin: [:name :passwd |" +
	"\n\t\t\t\t\tFytoportal db server login: name password: passwd secure: false async: false." +
	"\n\t\t\t\t\tself zapniEditaciMetodiky: id." +
	"\n\t\t\t\t\tasyncBlock value];" +
	"\n\t\t\t\tshow" +
	"\n\t\t\t]" +
	"\n\t\t]." +
	"\n\tFytoportal navigator ior metodika" +
	"\n\t\tonForceStop: [:p :token | " +
	"\n\t\t\teditCheck value ifTrue: [" +
	"\n\t\t\t\teditCheck value: false]." +
	"\n\t\t\t\"musim zavolat standardni akci na komponente\"" +
	"\n\t\t\tp component forcePathStop: p on: token]",
	null, "2013-09-05T19:16:25Z", "mp", 1);

jst.FYMetodikyEditPanel.addMethod("installListeners", "", "initialization", 
	"\tsuper installListeners." +
	"\n\teditCheck on: #check do: [:chbox :checked | checked " +
	"\n\t\tifTrue: [Fytoportal navigator path savePath." +
	"\n\t\t\tFytoportal navigator ior editace enter: metodiky selectedNode id]" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tFytoportal navigator path trackHistory: [:path | " +
	"\n\t\t\t\tpath restorePath]." +
	"\n\t\t\tFytoportal data isAdminIOR ifFalse: [" +
	"\n\t\t\t\t\"v prubehu editace doslo k odhlaseni\"" +
	"\n\t\t\t\tnavig hide." +
	"\n\t\t\t\tself doLayout." +
	"\n\t\t\t\tself inform: 'Uživatel odhlášen'->'V průběhu editace jste se odhlásili nebo Vaše přihlášení vyexpirovalo.']" +
	"\n\t\t]." +
	"\n\t\tself toggleEditing: checked" +
	"\n\t]." +
	"\n\tFytoportal navigator ior editace" +
	"\n\t\tcomponent: editCheck;" +
	"\n\t\tonForceStop: [:p :id :last :asyncBlock | " +
	"\n\t\t\tFytoportal data isAdminIOR ifTrue: [" +
	"\n\t\t\t\tself zapniEditaciMetodiky: id" +
	"\n\t\t\t] ifFalse: [ExtLoginDialog new " +
	"\n\t\t\t\ttitle: 'Přihlášení (návrat na editační obrazovku)';" +
	"\n\t\t\t\tonLogin: [:name :passwd |" +
	"\n\t\t\t\t\tFytoportal db server login: name password: passwd secure: false." +
	"\n\t\t\t\t\tFytoportal data isAdminIOR ifTrue: [" +
	"\n\t\t\t\t\t\tself zapniEditaciMetodiky: id]." +
	"\n\t\t\t\t\tasyncBlock value];" +
	"\n\t\t\t\tshow" +
	"\n\t\t\t]" +
	"\n\t\t]." +
	"\n\tFytoportal navigator ior metodika" +
	"\n\t\tonForceStop: [:p :token | " +
	"\n\t\t\teditCheck value ifTrue: [" +
	"\n\t\t\t\teditCheck value: false]." +
	"\n\t\t\t\"musim zavolat standardni akci na komponente\"" +
	"\n\t\t\tp component forcePathStop: p on: token]",
	null, "2013-09-19T09:46:16Z", "mp", 1);

jst.FYMetodikyEditPanel.addMethod("installListeners", "", "initialization", 
	"\tsuper installListeners." +
	"\n\teditCheck on: #check do: [:chbox :checked | checked " +
	"\n\t\tifTrue: [Fytoportal navigator path savePath." +
	"\n\t\t\tFytoportal navigator ior editace enter: metodiky selectedNode id]" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tFytoportal navigator path trackHistory: [:path | " +
	"\n\t\t\t\tpath restorePath]." +
	"\n\t\t\tFytoportal data isAdminIOR ifFalse: [" +
	"\n\t\t\t\t\"v prubehu editace doslo k odhlaseni\"" +
	"\n\t\t\t\tnavig hide." +
	"\n\t\t\t\tself doLayout." +
	"\n\t\t\t\tself inform: 'Uživatel odhlášen'->'V průběhu editace jste se odhlásili nebo Vaše přihlášení vyexpirovalo.']" +
	"\n\t\t]." +
	"\n\t\tself toggleEditing: checked" +
	"\n\t]." +
	"\n\tFytoportal navigator ior editace" +
	"\n\t\tcomponent: editCheck;" +
	"\n\t\tonForceStop: [:p :id :last :asyncBlock | " +
	"\n\t\t\tFytoportal data isAdminIOR ifTrue: [" +
	"\n\t\t\t\tself zapniEditaciMetodiky: id" +
	"\n\t\t\t] ifFalse: [[ExtLoginDialog new " +
	"\n\t\t\t\ttitle: 'Přihlášení (návrat na editační obrazovku)';" +
	"\n\t\t\t\tonLogin: [:name :passwd |" +
	"\n\t\t\t\t\tFytoportal db server login: name password: passwd secure: false." +
	"\n\t\t\t\t\tFytoportal data isAdminIOR ifTrue: [" +
	"\n\t\t\t\t\t\tself zapniEditaciMetodiky: id]." +
	"\n\t\t\t\t\tasyncBlock value];" +
	"\n\t\t\t\tshow] delayed: 100" +
	"\n\t\t\t]" +
	"\n\t\t]." +
	"\n\tFytoportal navigator ior metodika" +
	"\n\t\tonForceStop: [:p :token | " +
	"\n\t\t\teditCheck value ifTrue: [" +
	"\n\t\t\t\teditCheck value: false]." +
	"\n\t\t\t\"musim zavolat standardni akci na komponente\"" +
	"\n\t\t\tp component forcePathStop: p on: token]",
	null, "2013-11-21T08:20:14Z", "mp", 1);

jst.FYMetodikyEditPanel.addMethod("installListeners", "", "initialization", 
	"\tsuper installListeners." +
	"\n\teditCheck on: #check do: [:chbox :checked | checked " +
	"\n\t\tifTrue: [Fytoportal navigator path savePath." +
	"\n\t\t\tFytoportal navigator ior editace enter: metodiky selectedNode id]" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tFytoportal navigator path trackHistory: [:path | | met |" +
	"\n\t\t\t\tpath restorePath." +
	"\n\t\t\t\t(met := Fytoportal navigator ior metodika value) ifNil: [" +
	"\n\t\t\t\t\t\"metodika nebyla dosud vybrana\"" +
	"\n\t\t\t\t\tmetodiky selectedNode expand." +
	"\n\t\t\t\t\tmetodiky selectNode: (metodiky selectedNode children first)" +
	"\n\t\t\t\t] ifNotNil: [metodiky selectedNode id ~= met ifTrue: [ | node |" +
	"\n\t\t\t\t\t\"oprava - při návratu z editace obecné metodiky musím vybrat uzel vybrané metodiky \"" +
	"\n\t\t\t\t\tnode := metodiky selectNodeBy: [:n | n id = Fytoportal navigator ior metodika value] silently: true." +
	"\n\t\t\t\t\tnode isLeaf ifFalse: [node expand]" +
	"\n\t\t\t\t]]" +
	"\n\t\t\t]." +
	"\n\t\t\tFytoportal data isAdminIOR ifFalse: [" +
	"\n\t\t\t\t\"v prubehu editace doslo k odhlaseni\"" +
	"\n\t\t\t\tnavig hide." +
	"\n\t\t\t\tself doLayout." +
	"\n\t\t\t\tself inform: 'Uživatel odhlášen'->'V průběhu editace jste se odhlásili nebo Vaše přihlášení vyexpirovalo.']" +
	"\n\t\t]." +
	"\n\t\tself toggleEditing: checked" +
	"\n\t]." +
	"\n\tFytoportal navigator ior editace" +
	"\n\t\tcomponent: editCheck;" +
	"\n\t\tonForceStop: [:p :id :last :asyncBlock | " +
	"\n\t\t\tFytoportal data isAdminIOR ifTrue: [" +
	"\n\t\t\t\tself zapniEditaciMetodiky: id" +
	"\n\t\t\t] ifFalse: [[ExtLoginDialog new " +
	"\n\t\t\t\ttitle: 'Přihlášení (návrat na editační obrazovku)';" +
	"\n\t\t\t\tonLogin: [:name :passwd |" +
	"\n\t\t\t\t\tFytoportal db server login: name password: passwd secure: false." +
	"\n\t\t\t\t\tFytoportal data isAdminIOR ifTrue: [" +
	"\n\t\t\t\t\t\tself zapniEditaciMetodiky: id]." +
	"\n\t\t\t\t\tasyncBlock value];" +
	"\n\t\t\t\tshow] delayed: 100" +
	"\n\t\t\t]" +
	"\n\t\t]." +
	"\n\tFytoportal navigator ior metodika" +
	"\n\t\tonForceStop: [:p :token | " +
	"\n\t\t\teditCheck value ifTrue: [" +
	"\n\t\t\t\teditCheck value: false]." +
	"\n\t\t\t\"musim zavolat standardni akci na komponente\"" +
	"\n\t\t\tp component forcePathStop: p on: token]",
	null, "2013-12-04T10:27:01Z", "mp"); //fytoportal-ior-edit

jst.FYMetodikyEditPanel.addMethod("zapniEditaciMetodiky:", "id", "private", 
	"\t(navig isVisible and: [editCheck value not]) ifTrue: [" +
	"\n\t\tmetodiky selectedNode ifNil: [" +
	"\n\t\t\t\"pouze po spusteni aplikace\"" +
	"\n\t\t\tFytoportal data navigator path skipHistoryDuring: [" +
	"\n\t\t\t\tmetodiky selectNodeBy: [:n | n id = id] silently: false]]." +
	"\n\t\teditCheck beEnabled; value: true" +
	"\n\t] ifFalse: [navig isVisible & editCheck isDisabled ifTrue: [" +
	"\n\t\t\"editor je aktivni ale skryty - napr. kdyz v prubehu editace zobrazim info\"" +
	"\n\t\teditCheck beEnabled." +
	"\n\t\tFytoportal ior obsahPanel editor activate]" +
	"\n\t]",
	null, "2013-09-05T19:06:22Z", "mp", 1);

jst.FYMetodikyEditPanel.addMethod("zapniEditaciMetodiky:", "id", "private", 
	"\tnavig isVisible ifFalse: [" +
	"\n\t\t\"editacni panel se z nejakeho nepodarilo aktivovat\"" +
	"\n\t\t^ self]." +
	"\n\teditCheck value ifFalse: [" +
	"\n\t\tmetodiky selectedNode ifNil: [" +
	"\n\t\t\t\"pouze po spusteni aplikace\"" +
	"\n\t\t\tFytoportal data navigator path skipHistoryDuring: [" +
	"\n\t\t\t\tmetodiky selectNodeBy: [:n | n id = id] silently: false]]." +
	"\n\t\teditCheck beEnabled; value: true" +
	"\n\t] ifTrue: [" +
	"\n\t\t\"editor je aktivni ale skryty - napr. kdyz v prubehu editace zobrazim info\"" +
	"\n\t\teditCheck beEnabled." +
	"\n\t\tFytoportal ior obsahPanel editor activate" +
	"\n\t]",
	null, "2013-09-19T09:16:12Z", "mp", 1);

jst.FYMetodikyEditPanel.addMethod("zapniEditaciMetodiky:", "id", "private", 
	"\teditCheck value ifFalse: [" +
	"\n\t\tmetodiky selectedNode ifNil: [" +
	"\n\t\t\t\"pouze po spusteni aplikace\"" +
	"\n\t\t\tFytoportal data navigator path skipHistoryDuring: [" +
	"\n\t\t\t\tmetodiky selectNodeBy: [:n | n id = id] silently: false]]." +
	"\n\t\teditCheck beEnabled; value: true" +
	"\n\t] ifTrue: [" +
	"\n\t\t\"editor je aktivni ale skryty - napr. kdyz v prubehu editace zobrazim info\"" +
	"\n\t\teditCheck beEnabled." +
	"\n\t\tFytoportal ior obsahPanel editor activate" +
	"\n\t]",
	null, "2013-09-19T09:43:01Z", "mp", 1);

jst.FYMetodikyEditPanel.addMethod("zapniEditaciMetodiky:", "id", "private", 
	"\t\"editCheck beEnabled.\"" +
	"\n\teditCheck value ifFalse: [" +
	"\n\t\tmetodiky selectedNode ifNil: [" +
	"\n\t\t\t\"pouze po spusteni aplikace\"" +
	"\n\t\t\tFytoportal data navigator path skipHistoryDuring: [" +
	"\n\t\t\t\tmetodiky selectNodeBy: [:n | n id = id] silently: false]]." +
	"\n\t\teditCheck value: true" +
	"\n\t] ifTrue: [" +
	"\n\t\t\"editor je aktivni ale skryty - napr. kdyz v prubehu editace zobrazim info\"" +
	"\n\t\tFytoportal navigator ior editace enter: metodiky selectedNode id." +
	"\n\t\tself toggleEditing: true" +
	"\n\t]",
	null, "2013-09-20T08:27:23Z", "mp", 1);

jst.FYMetodikyEditPanel.addMethod("zapniEditaciMetodiky:", "id", "private", 
	"\teditCheck beEnabled." +
	"\n\teditCheck value ifFalse: [" +
	"\n\t\tmetodiky selectedNode ifNil: [" +
	"\n\t\t\t\"pouze po spusteni aplikace\"" +
	"\n\t\t\tFytoportal data navigator path skipHistoryDuring: [" +
	"\n\t\t\t\tmetodiky selectNodeBy: [:n | n id = id] silently: false]]." +
	"\n\t\teditCheck value: true" +
	"\n\t] ifTrue: [" +
	"\n\t\t\"editor je aktivni ale skryty - napr. kdyz v prubehu editace zobrazim info\"" +
	"\n\t\tFytoportal navigator ior editace enter: metodiky selectedNode id." +
	"\n\t\tself toggleEditing: true" +
	"\n\t]",
	null, "2013-12-04T10:14:10Z", "mp", 1);

jst.FYMetodikyEditPanel.addMethod("zapniEditaciMetodiky:", "id", "private", 
	"\teditCheck beEnabled." +
	"\n\teditCheck value ifFalse: [" +
	"\n\t\tmetodiky selectedNode ifNil: [" +
	"\n\t\t\t\"pouze po spusteni aplikace\"" +
	"\n\t\t\tFytoportal data navigator path skipHistoryDuring: [" +
	"\n\t\t\t\t(metodiky root detectChild: [:n | n id = id]) ifNotNilDo: [:n |" +
	"\n\t\t\t\t\t\"metodika muze byt ve skupine, tu musim jedrive rozbalit, select jinak hlasi error\"" +
	"\n\t\t\t\t\t(n parentNode id startsWith: #skup) ifTrue: [" +
	"\n\t\t\t\t\t\tn parentNode expand]." +
	"\n\t\t\t\t\tmetodiky selectNode: n]" +
	"\n\t\t\t]" +
	"\n\t\t]." +
	"\n\t\teditCheck value: true" +
	"\n\t] ifTrue: [" +
	"\n\t\t\"editor je aktivni ale skryty - napr. kdyz v prubehu editace zobrazim info\"" +
	"\n\t\tFytoportal navigator ior editace enter: metodiky selectedNode id." +
	"\n\t\tself toggleEditing: true" +
	"\n\t]",
	null, "2013-12-19T22:03:27Z", "mp", 1);

jst.FYMetodikyEditPanel.addMethod("zapniEditaciMetodiky:", "id", "private", 
	"\teditCheck beEnabled." +
	"\n\teditCheck value ifFalse: [" +
	"\n\t\t(metodiky selectedNode isNil or: [metodiky selectedNode id ~= id]) ifTrue: [" +
	"\n\t\t\t\"pouze po spusteni aplikace\"" +
	"\n\t\t\tFytoportal data navigator path skipHistoryDuring: [" +
	"\n\t\t\t\t(metodiky root detectChild: [:n | n id = id]) ifNotNilDo: [:n |" +
	"\n\t\t\t\t\t\"metodika muze byt ve skupine, tu musim jedrive rozbalit, select jinak hlasi error\"" +
	"\n\t\t\t\t\t(n parentNode id startsWith: #skup) ifTrue: [" +
	"\n\t\t\t\t\t\tn parentNode expand]." +
	"\n\t\t\t\t\tmetodiky selectNode: n]" +
	"\n\t\t\t]" +
	"\n\t\t]." +
	"\n\t\teditCheck value: true" +
	"\n\t] ifTrue: [" +
	"\n\t\t\"editor je aktivni ale skryty - napr. kdyz v prubehu editace zobrazim info\"" +
	"\n\t\tFytoportal navigator ior editace enter: metodiky selectedNode id." +
	"\n\t\tself toggleEditing: true" +
	"\n\t]",
	null, "2014-03-09T22:36:19Z", "mp", 1);

jst.FYMetodikyEditPanel.addMethod("zapniEditaciMetodiky:", "id", "private", 
	"\teditCheck beEnabled." +
	"\n\teditCheck value ifFalse: [" +
	"\n\t\t(metodiky selectedNode isNil or: [metodiky selectedNode id ~= id]) ifTrue: [" +
	"\n\t\t\t\"pouze po spusteni aplikace\"" +
	"\n\t\t\tFytoportal data navigator path skipHistoryDuring: [" +
	"\n\t\t\t\t(metodiky root detectChild: [:n | n id = id]) ifNotNilDo: [:n |" +
	"\n\t\t\t\t\t\"metodika muze byt ve skupine, tu musim jedrive rozbalit, select jinak hlasi error\"" +
	"\n\t\t\t\t\tn parentNode = metodiky root ifFalse: [" +
	"\n\t\t\t\t\t\tn ensureVisible]." +
	"\n\t\t\t\t\tmetodiky selectNode: n]" +
	"\n\t\t\t]" +
	"\n\t\t]." +
	"\n\t\teditCheck value: true" +
	"\n\t] ifTrue: [" +
	"\n\t\t\"editor je aktivni ale skryty - napr. kdyz v prubehu editace zobrazim info\"" +
	"\n\t\tFytoportal navigator ior editace enter: metodiky selectedNode id." +
	"\n\t\tself toggleEditing: true" +
	"\n\t]",
	null, "2014-04-17T09:08:41Z", "mp"); //fytoportal-ior-edit

jst.FYMetodikyEditPanel.addMethod("toggleEditing:", "aBoolean", "events", 
	"\tmetodiky isDisabled: aBoolean." +
	"\n\tself sendEvent: #toggleEditing: with: aBoolean",
	null, "2013-01-18T14:49:04Z", "mp", 1);

jst.FYMetodikyEditPanel.addMethod("toggleEditing:", "aBoolean", "events", 
	"\tmetodiky isDisabled: aBoolean." +
	"\n\thledej isDisabled: aBoolean." +
	"\n\tself sendEvent: #toggleEditing: with: aBoolean",
	null, "2014-03-26T10:56:30Z", "mp"); //fytoportal-ior-edit

jst.FYMetodikyEditPanel.addMethod("loggedIn", "", "events", 
	"\tFytoportal navigator ior isActivePath & (Fytoportal db server userRoles includes: #fyAdminIOR) ifTrue: [" +
	"\n\t\t\"nefunguje, pokud neni IOR aktivni - panel aktivuji tedy pozdeji\"" +
	"\n\t\tnavig show." +
	"\n\t\teditCheck isDisabled ifTrue: [" +
	"\n\t\t\teditCheck isEnabled: Fytoportal navigator ior metodika isActivePath]." +
	"\n\t\tself doLayout]",
	null, "2013-01-25T14:41:58Z", "mp", 1);

jst.FYMetodikyEditPanel.addMethod("loggedIn", "", "events", 
	"\t(Fytoportal navigator ior isActivePath and: [Fytoportal data isAdminIOR]) ifTrue: [" +
	"\n\t\t\"nefunguje, pokud neni IOR aktivni - panel aktivuji tedy pozdeji\"" +
	"\n\t\tnavig show." +
	"\n\t\teditCheck isDisabled ifTrue: [" +
	"\n\t\t\teditCheck isEnabled: Fytoportal navigator ior metodika isActivePath]." +
	"\n\t\tself doLayout]",
	null, "2013-08-23T08:10:42Z", "mp", 1);

jst.FYMetodikyEditPanel.addMethod("loggedIn", "", "events", 
	"\tFytoportal data isAdminIOR ifTrue: [" +
	"\n\t\teditCheck isDisabled ifTrue: [" +
	"\n\t\t\teditCheck isEnabled: Fytoportal navigator ior metodika isActivePath]." +
	"\n\t\t(self isActive and: [navig isVisible not]) ifTrue: [" +
	"\n\t\t\tnavig show." +
	"\n\t\t\tself doLayout]" +
	"\n\t]",
	null, "2013-09-04T09:16:04Z", "mp"); //fytoportal-ior-edit

jst.FYMetodikyEditPanel.addMethod("loggedOut", "", "events", 
	"\teditCheck value ifFalse: [" +
	"\n\t\tnavig hide." +
	"\n\t\tself doLayout]",
	null, "2013-01-18T14:50:45Z", "mp", 1);

jst.FYMetodikyEditPanel.addMethod("loggedOut", "", "events", 
	"\t(self isActive and: [editCheck value not]) ifTrue: [" +
	"\n\t\tnavig hide." +
	"\n\t\tself doLayout]",
	null, "2013-09-04T09:09:13Z", "mp"); //fytoportal-ior-edit

/*
jst.FYMetodikyEditPanel.addMethod("renderEvent", "", "events", 
	"\t^ [self loggedIn]",
	null, "2013-01-18T14:50:57Z", "mp");
	
nahrazeno metodou metodikaVybrana
jst.FYMetodikyEditPanel.addMethod("changed:with:", "anAspect anObject", "updating", 
	"\tanAspect = #metodika ifTrue: [" +
	"\n\t\teditCheck isEnabled: true]." +
	"\n\tsuper changed: anAspect with: anObject",
	null, "2013-01-18T14:51:26Z", "mp", 1);

jst.FYMetodikyEditPanel.addMethod("changed:with:", "anAspect anObject", "updating", 
	"\tanAspect = #metodika ifTrue: [" +
	"\n\t\teditCheck isEnabled: anObject notNil]." +
	"\n\tsuper changed: anAspect with: anObject",
	null, "2013-09-04T14:51:35Z", "mp"); //fytoportal-ior-edit
*/

jst.FYMetodikyEditPanel.addMethod("metodikaVybrana:", "node", "updating", 
	"\tFytoportal navigator ior tiskMetodiky isEnabled: node notNil." +
	"\n\tnode isNil & editCheck value not ifTrue: [" +
	"\n\t\tmetodiky clearSelectionsSilently: true]." +
	"\n\teditCheck isEnabled: node notNil | editCheck value." +
	"\n\tself changed: #metodika with: node",
	null, "2013-09-19T09:21:43Z", "mp", 1);

jst.FYMetodikyEditPanel.addMethod("metodikaVybrana:", "node", "updating", 
	"\tFytoportal navigator ior tiskMetodiky isEnabled: node notNil." +
	"\n\tFytoportal navigator ior metodika link: node link." +
	"\n\tnode isNil & editCheck value not ifTrue: [" +
	"\n\t\tmetodiky clearSelectionsSilently: true]." +
	"\n\teditCheck isEnabled: node notNil | editCheck value." +
	"\n\tself changed: #metodika with: node",
	null, "2014-01-02T20:50:38Z", "mp", 2);

jst.FYMetodikyEditPanel.addMethod("metodikaVybrana:", "node", "updating", 
	"\tFytoportal navigator ior tiskMetodiky isEnabled: node notNil." +
	"\n\tFytoportal navigator ior metodika link: (node ifNotNil: [node link])." +
	"\n\tnode isNil & editCheck value not ifTrue: [" +
	"\n\t\tmetodiky clearSelectionsSilently: true]." +
	"\n\teditCheck isEnabled: node notNil | editCheck value." +
	"\n\tself changed: #metodika with: node",
	null, "2014-01-06T08:38:27Z", "mp", 3);

jst.FYMetodikyEditPanel.addMethod("metodikaVybrana:", "node", "updating", 
	"\tFytoportal navigator ior tiskMetodiky isEnabled: node notNil." +
	"\n\tFytoportal navigator ior metodika link: (node ifNotNil: [node link])." +
	"\n\tnode isNil & editCheck value not ifTrue: [" +
	"\n\t\tmetodiky clearSelectionsSilently: true]." +
	"\n\teditCheck isEnabled: node notNil | editCheck value." +
	"\n\tself changed: node link typ with: node",
	null, "2014-02-08T22:18:15Z", "mp", 4);

jst.FYMetodikyEditPanel.addMethod("metodikaVybrana:", "node", "updating", 
	"\tFytoportal navigator ior metodika link: (node ifNotNil: [node link])." +
	"\n\tnode isNil & editCheck value not ifTrue: [" +
	"\n\t\tmetodiky clearSelectionsSilently: true]." +
	"\n\teditCheck isEnabled: node notNil | editCheck value." +
	"\n\tself changed: node link typ with: node",
	null, "2014-02-14T09:31:45Z", "mp"); //fytoportal-ior-edit

jst.FYMetodikyEditPanel.addMethod("zmenaMetodikySO:", "met", "updating", 
	"\t\"aktualizuji linky na zmenenou metodiku SO ve vsech relevantnich PM\"" +
	"\n\tmetodiky root children do: [:n | " +
	"\n\t\t(n link notNil and: [n link isString not]) ifTrue: [" +
	"\n\t\t\tn link zmenMetodikuSO: met]]",
	null, "2014-03-03T09:12:17Z", "mp");

jst.FYMetodikyEditPanel.addMethod("zmenaMetodiky:", "met", "updating", 
	"\t\"odkaz na novou metodiku\"" +
	"\n\tmetodiky selectedNode link: met",
	null, "2013-05-15T14:12:21Z", "mp", 1);

jst.FYMetodikyEditPanel.addMethod("zmenaMetodiky:", "met", "updating", 
	"\t\"odkaz na novou metodiku\"" +
	"\n\tmetodiky selectedNode link: met." +
	"\n\tFytoportal navigator ior metodika link: met",
	null, "2014-01-02T20:40:46Z", "mp"); //fytoportal-ior-edit

jst.FYMetodikyEditPanel.addMethod("zmenaObecneMetodiky:", "met", "updating", 
	"\t\"resetuji fotky ve vsech nactenych metodika v ramci zaslane obecne metodiky\"" +
	"\n\tmetodiky root allChildrenDo: [:n |" +
	"\n\t\t(n link notNil and: [n link isString not] and: [n link maObecnouMetodiku: met id]) ifTrue: [" +
	"\n\t\t\tn link resetujFotky]]",
	null, "2014-03-15T20:06:44Z", "mp"); //fytoportal-ior-edit

jst.FYMetodikyEditPanel.addMethod("hledejText:", "aString", "private", 
	"\tsuper hledejText: aString." +
	"\n\teditCheck beDisabled",
	null, "2014-03-26T13:31:40Z", "mp");

jst.FYMetodikyEditPanel.addMethod("lzeVybrat:", "n", "private", 
	"\teditCheck isDisabled: (n id startsWith: #skup, '-')." +
	"\n\t^ super lzeVybrat: n",
	null, "2014-04-17T09:39:00Z", "mp");

jst.FYMetodikyEditPanel.addMethod("fotkaSmazana:", "fotka", "updating", 
	"\t\"fotku musim vymazat ze vsech metodik, ktere se na ni odkazuji\"" +
	"\n\t(Fytoportal data metodiky podleFotek includeDocs: true; lookupKey: fotka id) do: [:row |" +
	"\n\t\trow doc jeMetodikaSO " +
	"\n\t\t\tifTrue: [row doc instVarNamed: #fotka put: nil]" +
	"\n\t\t\tifFalse: [\t\"fotku smazu ve vsech kapitolach plodinove metodiky, ktere na ni odkazuji\"" +
	"\n\t\t\t\trow doc projdiKapSO: [:kapSO | kapSO fotkaId = fotka id ifTrue: [" +
	"\n\t\t\t\t\tkapSO instVarNamed: #fotka put: nil]]]." +
	"\n\t\tFytoportal db storeObject: row doc." +
	"\n\t\t\"aktrualizuji vsechny nactene metodiky\"" +
	"\n\t\trow doc jeMetodikaPM " +
	"\n\t\t\tifTrue: [(metodiky root detectChild: [:n | n id = row id]) link: row doc]" +
	"\n\t\t\tifFalse: [metodiky root allChildrenDo: [:n | (n link notNil and: [n link jeMetodikaPM]) ifTrue: [" +
	"\n\t\t\t\tn link projdiKapSO: [:kapSO | kapSO linkId = row id ifTrue: [" +
	"\n\t\t\t\t\t\"link, tj. metodika SO se nacte, az bude potreba - nechci nastavit rovnou row doc, " +
	"\n\t\t\t\t\tmohlo by se na nej odkazovat vice PM, coz by mohlo delat problemy, treba pri editaci\"" +
	"\n\t\t\t\t\tkapSO link: row id." +
	"\n\t\t\t\t\tkapSO parent resetujFotky" +
	"\n\t\t\t\t]]" +
	"\n\t\t\t]]]" +
	"\n\t]",
	null, "2014-04-18T14:53:21Z", "mp");

//*** FYMetodikaEditor ***

jst.FYMetodikaEditor.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\twithBorderLayout;" +
	"\n\t\tadd: (toolbar := ExtFormPanel new " +
	"\n\t\t\twithHBoxLayout;" +
	"\n\t\t\tpadding: '3 5';" +
	"\n\t\t\tborder: false;" +
	"\n\t\t\tbodyStyle: 'background-color: transparent';" +
	"\n\t\t\tregion: #north;" +
	"\n\t\t\theight: 29);" +
	"\n\t\tadd: (ExtContainer new region: (ExtSplitRegion west minWidth: 150); width: 250; withBorderLayout;" +
	"\n\t\t\tadd: (masterNavig := FYTreePanel new " +
	"\n\t\t\t\troot: self createRoot;" +
	"\n\t\t\t\tborder: true;" +
	"\n\t\t\t\tsingleExpand: false;" +
	"\n\t\t\t\tregion: (ExtSplitRegion north minHeight: 100); " +
	"\n\t\t\t\theight: 250);" +
	"\n\t\t\tadd: (detailNavig := self detailNavigClass new" +
	"\n\t\t\t\tborder: true;" +
	"\n\t\t\t\tsingleExpand: false;" +
	"\n\t\t\t\tregion: #center);" +
	"\n\t\t\tyourself);" +
	"\n\t\tadd: (obsah := self editorObsahu " +
	"\n\t\t\tregion: #center;" +
	"\n\t\t\tyourself)",
	null, "2013-01-29T15:09:30Z", "mp", 1);

jst.FYMetodikaEditor.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\twithBorderLayout;" +
	"\n\t\tadd: (toolbar := ExtToolbar new " +
	"\n\t\t\tregion: #north;" +
	"\n\t\t\theight: 29);" +
	"\n\t\tadd: (ExtContainer new region: (ExtSplitRegion west minWidth: 150); width: 250; withBorderLayout;" +
	"\n\t\t\tadd: (masterNavig := FYTreePanel new " +
	"\n\t\t\t\troot: self createRoot;" +
	"\n\t\t\t\tborder: true;" +
	"\n\t\t\t\tsingleExpand: false;" +
	"\n\t\t\t\tregion: (ExtSplitRegion north minHeight: 100); " +
	"\n\t\t\t\theight: 250);" +
	"\n\t\t\tadd: (detailNavig := self detailNavigClass new" +
	"\n\t\t\t\tborder: true;" +
	"\n\t\t\t\tsingleExpand: false;" +
	"\n\t\t\t\tregion: #center);" +
	"\n\t\t\tyourself);" +
	"\n\t\tadd: (obsah := self editorObsahu " +
	"\n\t\t\tregion: #center;" +
	"\n\t\t\tyourself)." +
	"\n\ttoolbar" +
	"\n\t\tadd: (ExtButton new text: 'Uložit změny'; on: #click do: [self ulozZmeny]);" +
	"\n\t\taddSpace: 3;" +
	"\n\t\tadd: (ExtButton new text: 'Zahodit změny'; on: #click do: [self zahodZmeny])",
	null, "2013-02-27T22:23:06Z", "mp", 1);

jst.FYMetodikaEditor.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\twithBorderLayout;" +
	"\n\t\tadd: (toolbar := ExtToolbar new " +
	"\n\t\t\tregion: #north;" +
	"\n\t\t\theight: 29);" +
	"\n\t\tadd: (ExtContainer new region: (ExtSplitRegion west minWidth: 150); width: 250; withBorderLayout;" +
	"\n\t\t\tadd: (masterNavig := FYTreePanel new " +
	"\n\t\t\t\troot: self createRoot;" +
	"\n\t\t\t\tborder: true;" +
	"\n\t\t\t\tsingleExpand: false;" +
	"\n\t\t\t\tregion: (ExtSplitRegion north minHeight: 100); " +
	"\n\t\t\t\theight: 250);" +
	"\n\t\t\tadd: (detailNavig := self detailNavigClass new" +
	"\n\t\t\t\tborder: true;" +
	"\n\t\t\t\tsingleExpand: false;" +
	"\n\t\t\t\tregion: #center);" +
	"\n\t\t\tyourself);" +
	"\n\t\tadd: (obsah := self editorObsahu " +
	"\n\t\t\tregion: #center;" +
	"\n\t\t\tyourself)." +
	"\n\ttoolbar" +
	"\n\t\tadd: (ExtButton new " +
	"\n\t\t\ttext: 'Uložit změny'; " +
	"\n\t\t\ticonCls: #'btn-save'; " +
	"\n\t\t\ton: #click do: [self ulozZmeny]);" +
	"\n\t\taddSpace: 3;" +
	"\n\t\tadd: (ExtButton new " +
	"\n\t\t\ttext: 'Zahodit změny'; " +
	"\n\t\t\ticonCls: #'btn-cancel'; " +
	"\n\t\t\ton: #click do: [self zahodZmeny])",
	null, "2013-09-12T20:00:20Z", "mp"); //fytoportal-ior-edit

jst.FYMetodikaEditor.addMethod("detailNavigClass", "", "private", 
	"\t^ FYKapitolaEditPanel",
	null, "2013-01-14T15:12:24Z", "mp");

jst.FYMetodikaEditor.addMethod("editorObsahu", "", "private", 
	"\t^ ExtContainer new",
	null, "2013-01-10T08:18:26Z", "mp");

jst.FYMetodikaEditor.addMethod("createRoot", "", "private", 
	"\t^ ExtTreeNode new",
	null, "2013-01-17T15:47:18Z", "mp");

//*** FYPMEditor ***

jst.FYPMEditor.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\ttitle: 'Editace plodinové metodiky'." +
	"\n\tmasterNavig " +
	"\n\t\ttitle: 'Kapitola metodiky';" +
	"\n\t\taddDependent: detailNavig;" +
	"\n\t\taddDependent: obsah." +
	"\n\tdetailNavig " +
	"\n\t\ttitle: 'Obsah kapitoly (osnova)';" +
	"\n\t\taddDependent: obsah",
	null, "2013-01-29T15:10:33Z", "mp", 1);

jst.FYPMEditor.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\ttitle: 'Editace plodinové metodiky'." +
	"\n\tmasterNavig " +
	"\n\t\ttitle: 'Kapitola metodiky';" +
	"\n\t\taddDependent: detailNavig;" +
	"\n\t\taddDependent: obsah." +
	"\n\tdetailNavig " +
	"\n\t\ttitle: 'Obsah kapitoly (osnova)';" +
	"\n\t\taddDependent: obsah." +
	"\n\ttoolbar items" +
	"\n\t\taddFirst: '-';" +
	"\n\t\taddFirst: (ExtBoxComponent new style: 'font-size: 16px; font-weight:bold; padding: 0 5;')",
	null, "2013-02-28T12:05:29Z", "mp", 1);

jst.FYPMEditor.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\ttitle: 'Editace plodinové metodiky'." +
	"\n\tmasterNavig " +
	"\n\t\ttitle: 'Kapitola metodiky';" +
	"\n\t\taddDependent: detailNavig;" +
	"\n\t\taddDependent: obsah." +
	"\n\tdetailNavig " +
	"\n\t\ttitle: 'Obsah kapitoly (osnova)';" +
	"\n\t\taddDependent: obsah." +
	"\n\ttoolbar items" +
	"\n\t\taddFirst: '-';" +
	"\n\t\taddFirst: (ExtBoxComponent new style: 'font-size: 16px; font-weight:bold; padding: 0 5;')." +
	"\n\tdetailNavig onPathActivated: [:panel :path | (panel selectedNode notNil " +
	"\n\t\tand: [panel selectedNode link link = obsah nahled kapitola]) ifTrue: [" +
	"\n\t\t\tobsah nahled pathActivated: path]]",
	null, "2013-05-01T19:29:44Z", "mp", 1);

jst.FYPMEditor.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\ttitle: 'Editace plodinové metodiky'." +
	"\n\tmasterNavig " +
	"\n\t\ttitle: 'Kapitola metodiky';" +
	"\n\t\taddDependent: detailNavig;" +
	"\n\t\taddDependent: obsah." +
	"\n\tdetailNavig " +
	"\n\t\ttitle: 'Obsah kapitoly (osnova)';" +
	"\n\t\taddDependent: obsah." +
	"\n\ttoolbar items" +
	"\n\t\taddFirst: '-';" +
	"\n\t\taddFirst: (ExtBoxComponent new style: 'font-size: 16px; font-weight:bold; padding: 0 5;')." +
	"\n\tdetailNavig onPathActivated: [:panel :path | (panel selectedNode notNil " +
	"\n\t\tand: [panel selectedNode link = obsah nahled kapitola]) ifTrue: [" +
	"\n\t\t\tobsah nahled pathActivated: path]]",
	null, "2013-05-04T15:32:29Z", "mp", 1);

jst.FYPMEditor.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\ttitle: 'Editace plodinové metodiky'." +
	"\n\tmasterNavig " +
	"\n\t\ttitle: 'Kapitola metodiky';" +
	"\n\t\taddDependent: detailNavig;" +
	"\n\t\taddDependent: obsah." +
	"\n\tdetailNavig " +
	"\n\t\ttitle: 'Obsah kapitoly (osnova)';" +
	"\n\t\taddDependent: obsah." +
	"\n\ttoolbar items" +
	"\n\t\taddFirst: '-';" +
	"\n\t\taddFirst: (publicBox := ExtCheckbox new name: #publikovat; boxLabel: 'publikovat');" +
	"\n\t\taddFirst: '-';" +
	"\n\t\taddFirst: (ExtBoxComponent new style: 'font-size: 16px; font-weight:bold; padding: 0 5;')." +
	"\n\tdetailNavig onPathActivated: [:panel :path | (panel selectedNode notNil " +
	"\n\t\tand: [panel selectedNode link = obsah nahled kapitola]) ifTrue: [" +
	"\n\t\t\tobsah nahled pathActivated: path]]",
	null, "2014-01-15T20:45:19Z", "mp", 1);

jst.FYPMEditor.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\ttitle: 'Editace plodinové metodiky'." +
	"\n\tmasterNavig " +
	"\n\t\ttitle: 'Kapitola metodiky';" +
	"\n\t\taddDependent: detailNavig;" +
	"\n\t\taddDependent: obsah." +
	"\n\tdetailNavig " +
	"\n\t\ttitle: 'Obsah kapitoly (osnova)';" +
	"\n\t\taddDependent: obsah." +
	"\n\ttoolbar items" +
	"\n\t\taddFirst: '-';" +
	"\n\t\taddFirst: (publicBox := ExtCheckbox new name: #publikovat; boxLabel: 'publikovat'; style: 'padding-bottom: 3px;');" +
	"\n\t\taddFirst: '-';" +
	"\n\t\taddFirst: (ExtBoxComponent new style: 'font-size: 16px; font-weight:bold; padding: 0 5;')." +
	"\n\tdetailNavig onPathActivated: [:panel :path | (panel selectedNode notNil " +
	"\n\t\tand: [panel selectedNode link = obsah nahled kapitola]) ifTrue: [" +
	"\n\t\t\tobsah nahled pathActivated: path]]",
	null, "2014-01-16T07:33:43Z", "mp"); //fytoportal-ior-edit

jst.FYPMEditor.addMethod("installListeners", "", "initialization", 
	"\tsuper installListeners." +
	"\n\tFytoportal navigator ior editaceHlavniKapPM" +
	"\n\t\tcomponent: masterNavig;" +
	"\n\t\tinstallStandardTreeListeners;" +
	"\n\t\tonEnter: [:path :node |" +
	"\n\t\t\tself kapitola1Zmenena: node]",
	null, "2013-01-19T23:20:39Z", "mp", 1);

jst.FYPMEditor.addMethod("installListeners", "", "initialization", 
	"\tsuper installListeners." +
	"\n\tFytoportal navigator ior editaceHlavniKapPM" +
	"\n\t\tcomponent: masterNavig;" +
	"\n\t\tinstallStandardTreeListeners;" +
	"\n\t\tonEnter: [:path :node |" +
	"\n\t\t\tpath label: node link nazev." +
	"\n\t\t\tself kapitola1Zmenena: node]." +
	"\n\tFytoportal navigator ior editaceKapPM" +
	"\n\t\tcomponent: detailNavig;" +
	"\n\t\tinstallStandardTreeListenersWith: [:n | n link notNil];" +
	"\n\t\tonEnter: [:path :node |" +
	"\n\t\t\tpath activeEntry label: nil." +
	"\n\t\t\tpath label: node link printPath." +
	"\n\t\t\tdetailNavig changed: #kapitola with: node]",
	null, "2013-01-29T08:08:39Z", "mp", 1);

jst.FYPMEditor.addMethod("installListeners", "", "initialization", 
	"\tsuper installListeners." +
	"\n\tFytoportal navigator ior editaceHlavniKapPM" +
	"\n\t\tcomponent: masterNavig;" +
	"\n\t\tinstallStandardTreeListeners;" +
	"\n\t\tonEnter: [:path :node |" +
	"\n\t\t\tpath label: node link nazev." +
	"\n\t\t\tself kapitola1Zmenena: node]." +
	"\n\tFytoportal navigator ior editaceKapPM" +
	"\n\t\tcomponent: detailNavig;" +
	"\n\t\tinstallStandardTreeListenersWith: [:n | n link notNil];" +
	"\n\t\tonEnter: [:path :node |" +
	"\n\t\t\t(#(abionozy choroby skudci) includes: path activeEntry value) ifFalse: [" +
	"\n\t\t\t\t\"oprava zdvojeni v ceste\"" +
	"\n\t\t\t\tpath activeEntry label: nil]." +
	"\n\t\t\tpath label: node link printPath." +
	"\n\t\t\tdetailNavig changed: #kapitola with: node]",
	null, "2013-02-27T15:07:01Z", "mp", 1);

jst.FYPMEditor.addMethod("installListeners", "", "initialization", 
	"\tsuper installListeners." +
	"\n\tFytoportal navigator ior editaceHlavniKapPM" +
	"\n\t\tcomponent: masterNavig;" +
	"\n\t\tinstallStandardTreeListeners;" +
	"\n\t\tonEnter: [:path :node |" +
	"\n\t\t\tpath label: node link nazev." +
	"\n\t\t\tself kapitola1Zmenena: node]." +
	"\n\tFytoportal navigator ior editaceKapPM" +
	"\n\t\tcomponent: detailNavig;" +
	"\n\t\tinstallStandardTreeListenersWith: [:n | n link notNil];" +
	"\n\t\tonEnter: [:path :node |" +
	"\n\t\t\t\"oprava zdvojeni v ceste\"" +
	"\n\t\t\tpath activeEntry label: nil." +
	"\n\t\t\tpath label: node link printPath." +
	"\n\t\t\tdetailNavig changed: #kapitola with: node]",
	null, "2013-04-24T19:35:54Z", "mp", 1);

jst.FYPMEditor.addMethod("installListeners", "", "initialization", 
	"\tsuper installListeners." +
	"\n\tFytoportal navigator ior editacePM" +
	"\n\t\tonForceStop: [:path | " +
	"\n\t\t\tself activate." +
	"\n\t\t\tpath activatePath]." +
	"\n\tFytoportal navigator ior editaceHlavniKapPM" +
	"\n\t\tcomponent: masterNavig;" +
	"\n\t\tinstallStandardTreeListeners;" +
	"\n\t\tonEnter: [:path :node |" +
	"\n\t\t\tpath label: node link nazev." +
	"\n\t\t\tself kapitola1Zmenena: node]." +
	"\n\tFytoportal navigator ior editaceKapPM" +
	"\n\t\tcomponent: detailNavig;" +
	"\n\t\tinstallStandardTreeListenersWith: [:n | n link notNil];" +
	"\n\t\tonEnter: [:path :node |" +
	"\n\t\t\t\"oprava zdvojeni v ceste\"" +
	"\n\t\t\tpath activeEntry label: nil." +
	"\n\t\t\tpath label: node link printPath." +
	"\n\t\t\tdetailNavig changed: #kapitola with: node]",
	null, "2013-08-21T09:58:31Z", "mp", 1);

jst.FYPMEditor.addMethod("installListeners", "", "initialization", 
	"\tsuper installListeners." +
	"\n\tFytoportal navigator ior editacePM" +
	"\n\t\tonForceStop: [:path | " +
	"\n\t\t\tself activate." +
	"\n\t\t\tpath activatePath]." +
	"\n\tFytoportal navigator ior editaceHlavniKapPM" +
	"\n\t\tcomponent: masterNavig;" +
	"\n\t\tinstallStandardTreeListeners;" +
	"\n\t\tonEnter: [:path :node |" +
	"\n\t\t\tpath label: node link nazev." +
	"\n\t\t\tself kapitola1Zmenena: node]." +
	"\n\tFytoportal navigator ior editaceKapPM" +
	"\n\t\tcomponent: detailNavig;" +
	"\n\t\tinstallStandardTreeListenersWith: [:n | n link notNil];" +
	"\n\t\tonEnter: [:path :node |" +
	"\n\t\t\t\"oprava zdvojeni v ceste\"" +
	"\n\t\t\tpath activeEntry label: nil." +
	"\n\t\t\tpath label: node link printPath." +
	"\n\t\t\tdetailNavig changed: #kapitola with: node];" +
	"\n\t\tonForceStop: [:path :token :last :asyncBlock |" +
	"\n\t\t\t\"napred vyberu SO a nactu jeho kapitoly\"" +
	"\n\t\t\tdetailNavig forcePathStop: path on: (token copyUpTo: #'@') last: (token includes: $@) not ifAsync: [" +
	"\n\t\t\t\t(token includes: $@) ifTrue: [" +
	"\n\t\t\t\t\t\"pak vyberu kapitolu, pro jednoduchost expanduji vše\"" +
	"\n\t\t\t\t\tdetailNavig selectedNode expandAll." +
	"\n\t\t\t\t\tdetailNavig forcePathStop: path on: token]]" +
	"\n\t\t]",
	null, "2013-09-20T21:57:48Z", "mp", 1);

jst.FYPMEditor.addMethod("installListeners", "", "initialization", 
	"\tsuper installListeners." +
	"\n\tFytoportal navigator ior editacePM" +
	"\n\t\tonForceStop: [:path | " +
	"\n\t\t\tself activate." +
	"\n\t\t\tpath activatePath]." +
	"\n\tFytoportal navigator ior editaceHlavniKapPM" +
	"\n\t\tcomponent: masterNavig;" +
	"\n\t\tinstallStandardTreeListeners;" +
	"\n\t\tonEnter: [:path :node |" +
	"\n\t\t\tpath label: node link nazev." +
	"\n\t\t\tself kapitola1Zmenena: node]." +
	"\n\tFytoportal navigator ior editaceKapPM" +
	"\n\t\tcomponent: detailNavig;" +
	"\n\t\tinstallStandardTreeListenersWith: [:n | n link notNil and: [n link jeKapitola]];" +
	"\n\t\tonEnter: [:path :node |" +
	"\n\t\t\t\"oprava zdvojeni v ceste\"" +
	"\n\t\t\tpath activeEntry label: nil." +
	"\n\t\t\tpath label: node link printPath." +
	"\n\t\t\tdetailNavig changed: #kapitola with: node];" +
	"\n\t\tonForceStop: [:path :token :last :asyncBlock |" +
	"\n\t\t\t\"napred vyberu SO a nactu jeho kapitoly\"" +
	"\n\t\t\tdetailNavig forcePathStop: path on: (token copyUpTo: #'@') last: (token includes: $@) not ifAsync: [" +
	"\n\t\t\t\t(token includes: $@) ifTrue: [" +
	"\n\t\t\t\t\t\"pak vyberu kapitolu, pro jednoduchost expanduji vše\"" +
	"\n\t\t\t\t\tdetailNavig selectedNode expandAll." +
	"\n\t\t\t\t\tdetailNavig forcePathStop: path on: token]]" +
	"\n\t\t]",
	null, "2013-11-05T12:51:14Z", "mp"); //fytoportal-ior-edit

jst.FYPMEditor.addMethod("kapitola1Zmenena:", "node", "private", 
	"\tmasterNavig changed: #kapitola1 with: (" +
	"\n\t\t(#(plodiny abionozy choroby skudci) includes: node id)" +
	"\n\t\t\tifTrue: [\"detailNavig potrebuje kapitolu metodiky, osnova nestaci\"" +
	"\n\t\t\t\tobsah zmenenaMetodika at: node id]" +
	"\n\t\t\tifFalse: [\"pro detailNavig staci osnova - viz #createRoot\"" +
	"\n\t\t\t\tnode link])",
	null, "2013-05-14T20:59:43Z", "mp");

jst.FYPMEditor.addMethod("editorObsahu", "", "private", 
	"\t^ FYPMObsahEditor new",
	null, "2013-01-10T08:20:18Z", "mp");

jst.FYPMEditor.addMethod("createRoot", "", "private", 
	"\t| osnova |" +
	"\n\tosnova := Fytoportal data osnovaMetodiky." +
	"\n\tosnova nazev: ''. \"nebude se zobrazovat v ceste\"" +
	"\n\t^ ExtTreeNode new children: (" +
	"\n\t\tosnova sortedKeys collect: [:key |" +
	"\n\t\t\tExtTreeNode new " +
	"\n\t\t\t\tleaf: true; " +
	"\n\t\t\t\tid: key;" +
	"\n\t\t\t\ttext: (osnova at: key) nazev;" +
	"\n\t\t\t\tlink: (osnova at: key)])",
	null, "2013-02-21T22:57:24Z", "mp", 1);

jst.FYPMEditor.addMethod("createRoot", "", "private", 
	"\t| osnova |" +
	"\n\tosnova := Fytoportal data osnovaMetodiky." +
	"\n\tosnova nazev: ''. \"nebude se zobrazovat v ceste\"" +
	"\n\t^ ExtTreeNode new children: (" +
	"\n\t\tosnova sortedKeys collect: [:key | | kap |" +
	"\n\t\t\tkap := osnova at: key." +
	"\n\t\t\tExtTreeNode new " +
	"\n\t\t\t\tleaf: true; " +
	"\n\t\t\t\tid: key;" +
	"\n\t\t\t\ttext: kap cislo, kap nazev;" +
	"\n\t\t\t\tlink: kap])",
	null, "2013-05-26T20:56:00Z", "mp", 1);

jst.FYPMEditor.addMethod("createRoot", "", "private", 
	"\t| osnova |" +
	"\n\tobsah ifNil: [" +
	"\n\t\t\"pri inicializaci jen prazdny root\"" +
	"\n\t\t^ ExtTreeNode new]." +
	"\n\tosnova := Fytoportal data osnovaMetodiky: obsah metodika typ." +
	"\n\tosnova nazev: ''. \"nebude se zobrazovat v ceste\"" +
	"\n\t^ ExtTreeNode new children: (" +
	"\n\t\tosnova sortedKeys collect: [:key | | kap |" +
	"\n\t\t\tkap := osnova at: key." +
	"\n\t\t\tExtTreeNode new " +
	"\n\t\t\t\tleaf: true; " +
	"\n\t\t\t\tid: key;" +
	"\n\t\t\t\ttext: kap cislo, kap nazev;" +
	"\n\t\t\t\tlink: kap])",
	null, "2014-02-09T21:31:07Z", "mp"); //fytoportal-ior-edit

/*
jst.FYPMEditor.addMethod("metodika", "", "private", 
	"\t^ metodika ifString: [" +
	"\n\t\tmetodika := Fytoportal db loadObject: metodika." +
	"\n\t\tdetailNavig metodika: metodika." +
	"\n\t\tobsah update: #metodika with: metodika." +
	"\n\t\tmetodika]",
	null, "2013-01-12T20:38:16Z", "mp");

jst.FYPMEditor.addMethod("metodika", "", "private", 
	"\t^ metodika ifString: [" +
	"\n\t\tmetodika := Fytoportal db loadObject: metodika." +
	"\n\t\tobsah update: #metodika with: metodika." +
	"\n\t\tmetodika]",
	null, "2013-01-16T07:43:39Z", "mp");
*/

jst.FYPMEditor.addMethod("appPath", "", "public", 
	"\t^ Fytoportal navigator ior editacePM",
	null, "2013-01-25T13:06:17Z", "mp");

jst.FYPMEditor.addMethod("activateEvent", "", "events", 
	"\t^ [\tFytoportal navigator ior editace label: self title." +
	"\n\t\tself appPath trackHistory: [:path | " +
	"\n\t\t\tpath switchPath]]",
	null, "2013-08-22T10:42:59Z", "mp");

/*
jst.FYPMEditor.addMethod("edituj:", "kapitola", "public", 
	"\tobsah metodika: kapitola metodika id." +
	"\n\ttoolbar contents: kapitola metodika nazev." +
	"\n\tself appPath label: kapitola metodika nazev." +
	"\n\tmasterNavig selectionModel clearSelections." +
	"\n\t(masterNavig root detectChild: [:node | node id = kapitola id]) " +
	"\n\t\tifNotNilDo: [:node |" +
	"\n\t\t\tself activate." +
	"\n\t\t\t[masterNavig selectionModel selectNode: node] delayed: 100]" +
	"\n\t\tifNil: [detailNavig root: #()].",
	null, "2013-02-20T22:48:35Z", "mp");
*/
jst.FYPMEditor.addMethod("edituj:", "kapitola", "public", 
	"\tobsah metodika: kapitola metodika." +
	"\n\ttoolbar items first contents: kapitola metodika nazev." +
	"\n\tself appPath label: kapitola metodika nazev." +
	"\n\tmasterNavig selectionModel clearSelections." +
	"\n\t(masterNavig root detectChild: [:node | node id = kapitola id]) " +
	"\n\t\tifNotNilDo: [:node |" +
	"\n\t\t\tself activate." +
	"\n\t\t\t[masterNavig selectionModel selectNode: node] delayed: 100]" +
	"\n\t\tifNil: [detailNavig root: #()].",
	null, "2013-03-01T20:44:06Z", "mp", 1);

jst.FYPMEditor.addMethod("edituj:", "kapitola", "public", 
	"\tobsah metodika: kapitola metodika." +
	"\n\ttoolbar items first contents: kapitola metodika nazev." +
	"\n\tFytoportal navigator ior editace label: self title." +
	"\n\tself appPath label: kapitola metodika nazev." +
	"\n\tmasterNavig selectionModel clearSelections." +
	"\n\t(masterNavig root detectChild: [:node | node id = kapitola id]) " +
	"\n\t\tifNotNilDo: [:node |" +
	"\n\t\t\tself activate." +
	"\n\t\t\t[masterNavig selectionModel selectNode: node] delayed: 100]" +
	"\n\t\tifNil: [detailNavig root: #()].",
	null, "2013-08-21T14:22:07Z", "mp", 1);

jst.FYPMEditor.addMethod("edituj:", "kapitola", "public", 
	"\tobsah metodika = kapitola metodika ifFalse: [" +
	"\n\t\t| node |" +
	"\n\t\tobsah metodika: kapitola metodika." +
	"\n\t\ttoolbar items first contents: kapitola metodika nazev." +
	"\n\t\tFytoportal navigator ior editace label: self title." +
	"\n\t\tself appPath label: kapitola metodika nazev." +
	"\n\t\tFytoportal navigator path skipHistoryDuring: [" +
	"\n\t\t\tself activate]." +
	"\n\t\tnode := masterNavig root detectChild: [:n | n id = kapitola id]." +
	"\n\t\tmasterNavig clearSelections." +
	"\n\t\t(node ifNil: [masterNavig root children first]) select." +
	"\n\t]." +
	"\n\tself appPath currentStop == Fytoportal navigator ior editace ifTrue: [" +
	"\n\t\t\"predchozi kod cestu nezmenil, musim aktivovat cestu pro aktualne zobrazeny panel\"" +
	"\n\t\tself ownerContainer activeItem appPath trackHistory: [:p | p switchPath]]",
	null, "2013-08-22T13:37:59Z", "mp", 1);

jst.FYPMEditor.addMethod("edituj:", "kapitola", "public", 
	"\t| node |" +
	"\n\tobsah metodika = kapitola metodika ifFalse: [" +
	"\n\t\tobsah metodika: kapitola metodika." +
	"\n\t\ttoolbar items first contents: kapitola metodika nazev." +
	"\n\t\tFytoportal navigator ior editace label: self title." +
	"\n\t\tself appPath label: kapitola metodika nazev." +
	"\n\t\tFytoportal navigator path skipHistoryDuring: [" +
	"\n\t\t\tself activate]." +
	"\n\t\tnode := masterNavig root detectChild: [:n | n id = kapitola id]." +
	"\n\t] ifTrue: [" +
	"\n\t\tnode := masterNavig selectedNode]." +
	"\n\tmasterNavig clearSelections." +
	"\n\tdetailNavig keepSelectedDuring: [" +
	"\n\t\tdetailNavig clearSelections." +
	"\n\t\t(node ifNil: [masterNavig root children first]) select] silently: false ifFail: []." +
	"\n\tself appPath currentStop == Fytoportal navigator ior editace ifTrue: [" +
	"\n\t\t\"predchozi kod cestu nezmenil, musim aktivovat cestu pro aktualne zobrazeny panel\"" +
	"\n\t\tself ownerContainer activeItem appPath trackHistory: [:p | p switchPath]]",
	null, "2013-10-22T09:38:58Z", "mp", 1);

jst.FYPMEditor.addMethod("edituj:", "kapitola", "public", 
	"\t| node |" +
	"\n\tobsah metodika = kapitola metodika ifFalse: [" +
	"\n\t\tobsah metodika: kapitola metodika." +
	"\n\t\ttoolbar items first contents: kapitola metodika nazev." +
	"\n\t\tpublicBox value: kapitola metodika publikovat." +
	"\n\t\tFytoportal navigator ior editace label: self title." +
	"\n\t\tself appPath label: kapitola metodika nazev." +
	"\n\t\tFytoportal navigator path skipHistoryDuring: [" +
	"\n\t\t\tself activate]." +
	"\n\t\tnode := masterNavig root detectChild: [:n | n id = kapitola id]." +
	"\n\t] ifTrue: [" +
	"\n\t\tnode := masterNavig selectedNode]." +
	"\n\tmasterNavig clearSelections." +
	"\n\tdetailNavig keepSelectedDuring: [" +
	"\n\t\tdetailNavig clearSelections." +
	"\n\t\t(node ifNil: [masterNavig root children first]) select] silently: false ifFail: []." +
	"\n\tself appPath currentStop == Fytoportal navigator ior editace ifTrue: [" +
	"\n\t\t\"predchozi kod cestu nezmenil, musim aktivovat cestu pro aktualne zobrazeny panel\"" +
	"\n\t\tself ownerContainer activeItem appPath trackHistory: [:p | p switchPath]]",
	null, "2014-01-15T20:42:31Z", "mp", 1);

jst.FYPMEditor.addMethod("edituj:", "kapitola", "public", 
	"\t| node zmenaTypu |" +
	"\n\tobsah metodika = kapitola metodika ifFalse: [" +
	"\n\t\tzmenaTypu := obsah metodika isNil or: [obsah metodika typ ~= kapitola metodika typ]." +
	"\n\t\tobsah metodika: kapitola metodika." +
	"\n\t\tzmenaTypu ifTrue: [" +
	"\n\t\t\tmasterNavig root: self createRoot]." +
	"\n\t\ttoolbar items first contents: kapitola metodika nazev." +
	"\n\t\tpublicBox value: kapitola metodika publikovat." +
	"\n\t\tFytoportal navigator ior editace label: self title." +
	"\n\t\tself appPath label: kapitola metodika nazev." +
	"\n\t\tFytoportal navigator path skipHistoryDuring: [" +
	"\n\t\t\tself activate]." +
	"\n\t\tnode := masterNavig root detectChild: [:n | n id = kapitola id]." +
	"\n\t] ifTrue: [" +
	"\n\t\tnode := masterNavig selectedNode]." +
	"\n\tmasterNavig clearSelections." +
	"\n\tdetailNavig keepSelectedDuring: [" +
	"\n\t\tdetailNavig clearSelections." +
	"\n\t\t(node ifNil: [masterNavig root children first]) select] silently: false ifFail: []." +
	"\n\tself appPath currentStop == Fytoportal navigator ior editace ifTrue: [" +
	"\n\t\t\"predchozi kod cestu nezmenil, musim aktivovat cestu pro aktualne zobrazeny panel\"" +
	"\n\t\tself ownerContainer activeItem appPath trackHistory: [:p | p switchPath]]",
	null, "2014-02-09T21:32:18Z", "mp", 1);

jst.FYPMEditor.addMethod("edituj:", "kapitola", "public", 
	"\t| node zmenaTypu |" +
	"\n\tobsah metodika = kapitola metodika ifFalse: [" +
	"\n\t\tzmenaTypu := obsah metodika isNil or: [obsah metodika typ ~= kapitola metodika typ]." +
	"\n\t\tobsah metodika: kapitola metodika." +
	"\n\t\tzmenaTypu ifTrue: [" +
	"\n\t\t\tmasterNavig root: self createRoot]." +
	"\n\t\ttoolbar items first contents: kapitola metodika nazev." +
	"\n\t\tpublicBox value: kapitola metodika publikovat." +
	"\n\t\tpublicBox isEnabled: (obsah metodika jeObecnaMetodika not and: [obsah metodika typ = #metodika])." +
	"\n\t\tFytoportal navigator ior editace label: self title." +
	"\n\t\tself appPath label: kapitola metodika nazev." +
	"\n\t\tFytoportal navigator path skipHistoryDuring: [" +
	"\n\t\t\tself activate]." +
	"\n\t\tnode := masterNavig root detectChild: [:n | n id = kapitola id]." +
	"\n\t] ifTrue: [" +
	"\n\t\tnode := masterNavig selectedNode]." +
	"\n\tmasterNavig clearSelections." +
	"\n\tdetailNavig keepSelectedDuring: [" +
	"\n\t\tdetailNavig clearSelections." +
	"\n\t\t(node ifNil: [masterNavig root children first]) select] silently: false ifFail: []." +
	"\n\tself appPath currentStop == Fytoportal navigator ior editace ifTrue: [" +
	"\n\t\t\"predchozi kod cestu nezmenil, musim aktivovat cestu pro aktualne zobrazeny panel\"" +
	"\n\t\tself ownerContainer activeItem appPath trackHistory: [:p | p switchPath]]",
	null, "2014-02-10T09:36:58Z", "mp"); //fytoportal-ior-edit

/*
jst.FYPMEditor.addMethod("zmenaMetodikySO:", "met", "updating", 
	"\t\"viz taky FYMetodikyPanel>>zmenaMetodikySO:\"" +
	"\n\t(masterNavig selectedItem class == FYKapitolaSO) ifTrue: [" +
	"\n\t\t\"editor kapitoly\"" +
	"\n\t\tobsah jinaMetodika zmenMetodikuSO: met." +
	"\n\t\t\"nahled kapitoly\"" +
	"\n\t\tobsah nahled zmenMetodikuSO: met." +
	"\n\t\t\"ostatni panely obsahu viz FYPMVyberPolozek>>zmenaMetodikySO:\"" +
	"\n\t\t\"viz FYKapitolaPanel - zmenim az naposledy - muze aktivne vybrat nahled, pokud se nepodari zustat v editoru vybrane kapitoly\"" +
	"\n\t\tdetailNavig zmenMetodikuSO: met" +
	"\n\t]",
	null, "2013-05-03T07:30:38Z", "mp");
*/

jst.FYPMEditor.addMethod("zmenaKapitoly:", "kap", "updating", 
	"\tdetailNavig zmenaKapitoly: kap." +
	"\n\tobsah nahled zmenaKapitoly: kap",
	null, "2013-05-14T13:37:57Z", "mp");

jst.FYPMEditor.addMethod("zahodZmeny", "", "actions", 
	"\tobsah metodika jeZmenena " +
	"\n\t\tifTrue: [" +
	"\n\t\t\tobsah zahodZmeny." +
	"\n\t\t\tdetailNavig zmenaMetodiky: obsah metodika]" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tself inform: obsah metodika nazev -> 'Beze změn']",
	null, "2013-05-14T20:44:09Z", "mp", 1);

jst.FYPMEditor.addMethod("zahodZmeny", "", "actions", 
	"\tobsah metodika jeZmenena " +
	"\n\t\tifTrue: [UIManager default" +
	"\n\t\t\tconfirm: obsah metodika nazev -> 'Všechny změny budou ztraceny. Chcete pokračovat?' " +
	"\n\t\t\tthenDo: [" +
	"\n\t\t\t\tobsah zahodZmeny." +
	"\n\t\t\t\tFytoportal navigator ior editaceHlavniKapPM enterNode: masterNavig selectedNode]]" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tself inform: obsah metodika nazev -> 'Beze změn']",
	null, "2013-05-15T08:48:27Z", "mp", 1);

jst.FYPMEditor.addMethod("zahodZmeny", "", "actions", 
	"\t(obsah metodika jeZmenena or: [publicBox value ~= obsah metodika publikovat])" +
	"\n\t\tifTrue: [UIManager default" +
	"\n\t\t\tconfirm: obsah metodika nazev -> 'Všechny změny budou ztraceny. Chcete pokračovat?' " +
	"\n\t\t\tthenDo: [" +
	"\n\t\t\t\tobsah zahodZmeny." +
	"\n\t\t\t\tpublicBox value: obsah metodika publikovat." +
	"\n\t\t\t\tFytoportal navigator ior editaceHlavniKapPM enterNode: masterNavig selectedNode]]" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tself inform: obsah metodika nazev -> 'Beze změn']",
	null, "2014-01-15T20:48:46Z", "mp"); //fytoportal-ior-edit

jst.FYPMEditor.addMethod("ulozZmeny", "", "actions", 
	"\tobsah activeItem schovejZmeny." +
	"\n\tobsah metodika jeZmenena " +
	"\n\t\tifTrue: [ | met |" +
	"\n\t\t\tmet := Fytoportal db loadObject: obsah metodika id." +
	"\n\t\t\tobsah zmenenaMetodika kapitoly do: [:kap |" +
	"\n\t\t\t\tkap obsahZmenen ifTrue: [" +
	"\n\t\t\t\t\t(met zmenKapitolu: kap zmeny podle: kap) potvrdZmeny]]." +
	"\n\t\t\tFytoportal db storeObject: met." +
	"\n\t\t\tself broadcastEvent: #zmenaMetodiky: with: met." +
	"\n\t\t\tFytoportal navigator ior editaceHlavniKapPM enterNode: masterNavig selectedNode." +
	"\n\t\t\tself inform: 'Úspěch!' -> 'Provedené změny byly uloženy do databáze.']" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tself inform: obsah metodika nazev -> 'Beze změn']",
	null, "2013-05-15T21:11:45Z", "mp", 1);

jst.FYPMEditor.addMethod("ulozZmeny", "", "actions", 
	"\tobsah activeItem schovejZmeny." +
	"\n\tobsah metodika jeZmenena " +
	"\n\t\tifTrue: [ | met |" +
	"\n\t\t\tmet := Fytoportal db loadObject: obsah metodika id." +
	"\n\t\t\tmet zmenPodle: \tobsah zmenenaMetodika." +
	"\n\t\t\tFytoportal db storeObject: met." +
	"\n\t\t\tself broadcastEvent: #zmenaMetodiky: with: met." +
	"\n\t\t\tFytoportal navigator ior editaceHlavniKapPM enterNode: masterNavig selectedNode." +
	"\n\t\t\tself inform: 'Úspěch!' -> 'Provedené změny byly uloženy do databáze.']" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tself inform: obsah metodika nazev -> 'Beze změn']",
	null, "2013-11-10T22:14:22Z", "mp", 1);

jst.FYPMEditor.addMethod("ulozZmeny", "", "actions", 
	"\tobsah activeItem schovejZmeny." +
	"\n\tobsah metodika jeZmenena " +
	"\n\t\tifTrue: [ | met |" +
	"\n\t\t\tmet := Fytoportal db loadObject: obsah metodika id." +
	"\n\t\t\tmet zmenPodle: \tobsah zmenenaMetodika." +
	"\n\t\t\tFytoportal db storeObject: met." +
	"\n\t\t\tmet jeObecnaMetodika" +
	"\n\t\t\t\tifFalse: [self broadcastEvent: #zmenaMetodiky: with: met]" +
	"\n\t\t\t\tifTrue: [self broadcastEvent: #zmenaObecneMetodiky: with: met]." +
	"\n\t\t\tFytoportal navigator ior editaceHlavniKapPM enterNode: masterNavig selectedNode." +
	"\n\t\t\tself inform: 'Úspěch!' -> 'Provedené změny byly uloženy do databáze.']" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tself inform: obsah metodika nazev -> 'Beze změn']",
	null, "2013-12-04T10:55:15Z", "mp", 1);

jst.FYPMEditor.addMethod("ulozZmeny", "", "actions", 
	"\tobsah activeItem schovejZmeny." +
	"\n\tpublicBox value = obsah metodika publikovat ifFalse: [" +
	"\n\t\tobsah zmenenaMetodika publikovat: publicBox value]." +
	"\n\tobsah metodika jeZmenena " +
	"\n\t\tifTrue: [ | met |" +
	"\n\t\t\tmet := Fytoportal db loadObject: obsah metodika id." +
	"\n\t\t\tmet zmenPodle: \tobsah zmenenaMetodika." +
	"\n\t\t\tFytoportal db storeObject: met." +
	"\n\t\t\tmet jeObecnaMetodika" +
	"\n\t\t\t\tifFalse: [self broadcastEvent: #zmenaMetodiky: with: met]" +
	"\n\t\t\t\tifTrue: [self broadcastEvent: #zmenaObecneMetodiky: with: met]." +
	"\n\t\t\tFytoportal navigator ior editaceHlavniKapPM enterNode: masterNavig selectedNode." +
	"\n\t\t\tself inform: 'Úspěch!' -> 'Provedené změny byly uloženy do databáze.']" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tself inform: obsah metodika nazev -> 'Beze změn']",
	null, "2014-01-15T20:46:46Z", "mp", 1);

jst.FYPMEditor.addMethod("ulozZmeny", "", "actions", 
	"\tobsah activeItem schovejZmeny." +
	"\n\tpublicBox value = obsah metodika publikovat ifFalse: [" +
	"\n\t\tobsah zmenenaMetodika publikovat: publicBox value]." +
	"\n\tobsah metodika jeZmenena " +
	"\n\t\tifTrue: [ | met |" +
	"\n\t\t\tmet := Fytoportal db loadObject: obsah metodika id." +
	"\n\t\t\tmet zmenPodle: \tobsah zmenenaMetodika." +
	"\n\t\t\tFytoportal db storeObject: met." +
	"\n\t\t\tmet jeObecnaMetodika" +
	"\n\t\t\t\tifFalse: [self broadcastEvent: #zmenaMetodiky: with: met]" +
	"\n\t\t\t\tifTrue: [" +
	"\n\t\t\t\t\tFytoportal data updateCache: met." +
	"\n\t\t\t\t\tself broadcastEvent: #zmenaObecneMetodiky: with: met]." +
	"\n\t\t\tFytoportal navigator ior editaceHlavniKapPM enterNode: masterNavig selectedNode." +
	"\n\t\t\tself inform: 'Úspěch!' -> 'Provedené změny byly uloženy do databáze.']" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tself inform: obsah metodika nazev -> 'Beze změn']",
	null, "2014-03-14T14:13:39Z", "mp"); //fytoportal-ior-edit

//*** FYIOREditor ***

jst.FYIOREditor.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\tborder: true;" +
	"\n\t\tadd: (editorPM := FYPMEditor new);" +
	"\n\t\tadd: (FYMetodikaSOEditor " +
	"\n\t\t\ttyp: FYMetodikaAbionoza " +
	"\n\t\t\ttitulek: 'Editace metodik abionóz');" +
	"\n\t\tadd: (FYMetodikaSOEditor" +
	"\n\t\t\ttyp: FYMetodikaChoroba" +
	"\n\t\t\ttitulek: 'Editace metodik chorob');" +
	"\n\t\tadd: (FYMetodikaSOEditor" +
	"\n\t\t\ttyp: FYMetodikaSkudce" +
	"\n\t\t\ttitulek: 'Editace metodik škůdců');" +
	"\n\t\tadd: (FYMapovaniPouzitiPOR new" +
	"\n\t\t\ttyp: #plodiny;" +
	"\n\t\t\ttitle: 'Použití POR - plodiny');" +
	"\n\t\tadd: (FYMapovaniPouzitiPOR new" +
	"\n\t\t\ttyp: #skodlOrg;" +
	"\n\t\t\ttitle: 'Použití POR - škodl. org.');" +
	"\n\t\tactiveTab: 1",
	null, "2013-04-02T15:36:41Z", "mp");

/* nahrazeno 22.8.2013 pomoci FYPMEditor>>activateEvent a FYMetodikaSOEditor>>activateEvent
jst.FYIOREditor.addMethod("tabchangeEvent", "", "events", 
	"\t^ [:rec :panel | " +
	"\n\t\tFytoportal navigator ior editace label: panel title." +
	"\n\t\tpanel appPath switchPath]",
	null, "2013-01-25T13:21:08Z", "mp", 1);

jst.FYIOREditor.addMethod("tabchangeEvent", "", "events", 
	"\t^ [:rec :panel | " +
	"\n\t\tFytoportal navigator ior editace label: panel title." +
	"\n\t\tpanel appPath trackHistory: [:path | " +
	"\n\t\t\tpath switchPath]]",
	null, "2013-08-10T14:31:05Z", "mp"); //fytoportal-ior-edit
*/

jst.FYIOREditor.addMethod("editorPM", "", "accessing", 
	"\t^ editorPM",
	null, "2013-01-09T12:44:08Z", "mp");

//*** FYKapitolaEditPanel ***

jst.FYKapitolaEditPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\toznacKapitolu := nil." +
	"\n\toznacPolozku :=  nil",
	null, "2013-02-19T21:21:48Z", "mp", 1);

jst.FYKapitolaEditPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\toznacKapitolu := nil",
	null, "2013-05-30T07:04:58Z", "mp"); //fytoportal-ior-edit

jst.FYKapitolaEditPanel.addMethod("createDefaultNode", "", "private", 
	"\t^ nahledKap ifTrue: [" +
	"\n\t\tExtTreeNode new " +
	"\n\t\t\ttext: '(náhled textu kapitoly)';" +
	"\n\t\t\tid: #preview]",
	null, "2013-02-19T21:18:07Z", "mp", 1);

jst.FYKapitolaEditPanel.addMethod("createDefaultNode", "", "private", 
	"\t^ nil",
	null, "2013-02-20T07:44:16Z", "mp"); //fytoportal-ior-edit

jst.FYKapitolaEditPanel.addMethod("jinaKapitola", "", "private", 
	"\t^ super jinaKapitola" +
	"\n\t\texpandAll",
	null, "2013-02-19T21:17:34Z", "mp");

/*
jst.FYKapitolaEditPanel.addMethod("skudciChorobyAbionozy:text:", "kapId aString", "private", 
	"\tnahledKap := false." +
	"\n\t^ super skudciChorobyAbionozy: kapId text: aString",
	null, "2013-02-19T21:18:42Z", "mp");

jst.FYKapitolaEditPanel.addMethod("plodiny", "", "private", 
	"\tnahledKap := false." +
	"\n\t^ super plodiny",
	null, "2013-02-19T21:23:25Z", "mp");
*/

jst.FYKapitolaEditPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\t(anAspect = #kapitola1 and: [kapitola ~= anObject]) ifTrue: [" +
	"\n\t\tself kapitola: anObject].",
	null, "2013-01-15T22:17:20Z", "mp");

jst.FYKapitolaEditPanel.addMethod("initNavigator", "", "initialization", 
	"\t\"See FYPMEditor>>installListeners and FYMetodikaSOEditor>>installListeners\"",
	null, "2013-01-31T22:35:26Z", "mp");

/*
jst.FYKapitolaEditPanel.addMethod("skudci", "", "private-root", 
	"\tosnovaId := #skudci." +
	"\n\t^ super skudci",
	null, "2013-02-22T17:29:59Z", "mp");

jst.FYKapitolaEditPanel.addMethod("abionozy", "", "private-root", 
	"\tosnovaId := #abionozy." +
	"\n\t^ super abionozy",
	null, "2013-02-22T17:31:33Z", "mp");

jst.FYKapitolaEditPanel.addMethod("choroby", "", "private-root", 
	"\tosnovaId := #choroby." +
	"\n\t^ super choroby",
	null, "2013-02-22T17:32:04Z", "mp");

jst.FYKapitolaEditPanel.addMethod("treeLoader", "", "private", 
	"\t^ super treeLoader" +
	"\n\t\ton: #beforeload do: [:loader :node | " +
	"\n\t\t\tloader parameterAt: 'key' put: '\"', (Fytoportal data nazevOsnovy: osnovaId), '\"']",
	null, "2013-02-22T18:41:36Z", "mp");

jst.FYKapitolaEditPanel.addMethod("treeLoader", "", "private", 
	"\t^ super treeLoader" +
	"\n\t\ton: #beforeload do: [:loader :node | " +
	"\n\t\t\tloader parameterAt: 'key' put: '\"', (Fytoportal data nazevOsnovy: kapitola id), '\"']",
	null, "2013-02-27T14:19:31Z", "mp");

jst.FYKapitolaEditPanel.addMethod("treeLoader", "", "private", 
	"\t^ super treeLoader" +
	"\n\t\ton: #beforeload do: [:loader :node | " +
	"\n\t\t\tloader parameterAt: 'key' put: (Fytoportal data nazevOsnovy: kapitola id)]",
	null, "2013-04-04T21:24:36Z", "mp");
*/
jst.FYKapitolaEditPanel.addMethod("treeLoader", "", "private", 
	"\t^ super treeLoader" +
	"\n\t\ton: #beforeload do: [:loader :node | " +
	"\n\t\t\tkapitola class == FYKapitolaSO ifFalse: [" +
	"\n\t\t\t\tloader parameterAt: 'key' put: (Fytoportal data nazevOsnovy: kapitola id)]]",
	null, "2013-04-23T14:46:19Z", "mp", 1);

jst.FYKapitolaEditPanel.addMethod("treeLoader", "", "private", 
	"\t^ super treeLoader" +
	"\n\t\ton: #beforeload do: [:loader :node | " +
	"\n\t\t\tkapitola jeKapitolaSO ifFalse: [" +
	"\n\t\t\t\tloader parameterAt: 'key' put: (Fytoportal data nazevOsnovy: kapitola id)]]",
	null, "2013-12-13T15:31:32Z", "mp"); //fytoportal-ior-edit

jst.FYKapitolaEditPanel.addMethod("zmenaKapitoly:", "kap", "updating", 
	"\tkapitola == kap ifTrue: [" +
	"\n\t\t| vyber |" +
	"\n\t\tvyber := self selectionModel selectedNode ifNotNilDo: [:n | n id]." +
	"\n\t\tself selectionModel clearSelections." +
	"\n\t\tself kapitola: kap." +
	"\n\t\tself selectNodeBy: [:n | n id = vyber] silently: true]",
	null, "2013-03-01T15:23:35Z", "mp", 1);

jst.FYKapitolaEditPanel.addMethod("zmenaKapitoly:", "kap", "updating", 
	"\tkapitola == kap ifTrue: [" +
	"\n\t\tself keepSelectedDuring: [self kapitola: kap]]",
	null, "2013-04-27T10:47:34Z", "mp", 2);

jst.FYKapitolaEditPanel.addMethod("zmenaKapitoly:", "kap", "updating", 
	"\tkapitola == kap ifTrue: [" +
	"\n\t\tself keepSelectedDuring: [" +
	"\n\t\t\tkapitola resetujTaxony." +
	"\n\t\t\tself kapitola: kap]]",
	null, "2014-03-07T23:25:11Z", "mp"); //fytoportal-ior-edit

/*
jst.FYKapitolaEditPanel.addMethod("createNodeOn:withId:prefixed:", "kap aString prefix", "private", 
	"\t| node |" +
	"\n\tnode := super createNodeOn: kap withId: aString prefixed: prefix." +
	"\n\tkap isReadonly ifTrue: [" +
	"\n\t\tnode disable]." +
	"\n\t^ node" +
	"\n\t\t",
	null, "2013-04-19T19:56:43Z", "mp");

jst.FYKapitolaEditPanel.addMethod("createNodeOn:withId:prefixed:", "kap aString prefix", "private", 
	"\t| node |" +
	"\n\tnode := super createNodeOn: kap withId: aString prefixed: prefix." +
	"\n\tnode text: kap cislo, kap nazev." +
	"\n\tkap isReadonly ifTrue: [" +
	"\n\t\tnode disable]." +
	"\n\t^ node" +
	"\n\t\t",
	null, "2013-05-26T20:50:37Z", "mp");
*/

jst.FYKapitolaEditPanel.addMethod("createNodeOn:prefixed:", "kap prefix", "private", 
	"\t| node |" +
	"\n\tnode := super createNodeOn: kap prefixed: prefix." +
	"\n\tnode text: kap cislo, kap nazev." +
	"\n\tkap isReadonly ifTrue: [" +
	"\n\t\tnode disable]." +
	"\n\t^ node" +
	"\n\t\t",
	null, "2013-05-30T09:13:21Z", "mp");

jst.FYKapitolaEditPanel.addMethod("seznamSOTisk", "", "private", 
	"\t\"pri editaci vzdy vsechny SO bez ohledu na vyber plodin\"" +
	"\n\t^ kapitola kapitolyTisk",
	null, "2014-03-06T14:09:07Z", "mp"); //fytoportal-ior-edit

//*** FYPMObsahEditor ***

/*
jst.FYPMObsahEditor.addMethod("initialize", "", "initialization", 
	"\tpanely := Dictionary new." +
	"\n\tsuper initialize" +
	"\n\t\twithCardLayout;" +
	"\n\t\tadd: (ExtContainer new " +
	"\n\t\t\tcls: 'x-panel-mc');" +
	"\n\t\tadd: (nahledKap := FYTextKapitolyNahled new);" +
	"\n\t\tactiveItem: 1",
	null, "2013-02-27T23:02:00Z", "mp");
*/
jst.FYPMObsahEditor.addMethod("initialize", "", "initialization", 
	"\tpanely := Dictionary new." +
	"\n\tsuper initialize" +
	"\n\t\twithCardLayout;" +
	"\n\t\tadd: (nahledKap := FYTextKapitolyNahled new);" +
	"\n\t\tactiveItem: 1",
	null, "2013-04-25T13:50:37Z", "mp");

/*
jst.FYPMObsahEditor.addMethod("metodika:", "id", "accessing", 
	"\t(metodika isString | metodika isNil or: [metodika id ~= id]) ifTrue: [" +
	"\n\t\t\"jina metodika nebo jeste nebyla nactena\"" +
	"\n\t\tmetodika := id]." +
	"\n\tself activeItem: 1",
	null, "2013-02-20T23:16:08Z", "mp");

jst.FYPMObsahEditor.addMethod("metodika", "", "accessing", 
	"\t^ metodika ifString: [" +
	"\n\t\tmetodika := Fytoportal db loadObject: metodika." +
	"\n\t\tself changed: #metodika with: metodika." +
	"\n\t\tmetodika]",
	null, "2013-02-20T22:53:17Z", "mp");

jst.FYPMObsahEditor.addMethod("metodika:", "met", "accessing", 
	"\t(metodika isNil or: [metodika id ~= met id]) ifTrue: [" +
	"\n\t\t\"jina metodika nebo jeste nebyla nactena\"" +
	"\n\t\tmetodika := met." +
	"\n\t\tself changed: #metodika with: metodika]." +
	"\n\tself activeItem: 1",
	null, "2013-03-01T20:40:11Z", "mp");

jst.FYPMObsahEditor.addMethod("metodika", "", "accessing", 
	"\t^ metodika",
	null, "2013-03-01T21:01:27Z", "mp");
*/
jst.FYPMObsahEditor.addMethod("metodika:", "met", "accessing", 
	"\t(metodika isNil or: [metodika id ~= met id]) ifTrue: [" +
	"\n\t\t\"jina metodika nebo jeste nebyla nactena\"" +
	"\n\t\tmetodika := met]." +
	"\n\tself activeItem: 1",
	null, "2013-03-01T21:53:05Z", "mp", 1);

jst.FYPMObsahEditor.addMethod("metodika:", "met", "accessing", 
	"\t(metodika isNil or: [metodika id ~= met id]) ifTrue: [" +
	"\n\t\t\"jina metodika nebo jeste nebyla nactena\"" +
	"\n\t\tmetodika := met." +
	"\n\t\tself activeItem: 1]",
	null, "2013-08-22T10:28:31Z", "mp", 1);

jst.FYPMObsahEditor.addMethod("metodika:", "met", "accessing", 
	"\tmetodika = met ifFalse: [" +
	"\n\t\t\"jina metodika nebo jeste nebyla nactena\"" +
	"\n\t\tmetodika := met." +
	"\n\t\tself activeItem: 1]",
	null, "2013-08-22T13:23:37Z", "mp", 1);

jst.FYPMObsahEditor.addMethod("metodika:", "met", "accessing", 
	"\tmetodika = met ifFalse: [" +
	"\n\t\t\"jina metodika nebo jeste nebyla nactena\"" +
	"\n\t\tmetodika := met." +
	"\n\t\tmetodika zmenena ifNotNil: [" +
	"\n\t\t\t\"uplatni se pri prepinani metodik\"" +
	"\n\t\t\tself changed: #metodika with: metodika zmenena]." +
	"\n\t\tself activeItem: 1]",
	null, "2013-10-08T15:20:41Z", "mp"); //fytoportal-ior-edit

jst.FYPMObsahEditor.addMethod("metodika", "", "accessing", 
	"\t^ metodika",
	null, "2013-05-14T20:29:48Z", "mp");

jst.FYPMObsahEditor.addMethod("zmenenaMetodika", "", "accessing", 
	"\t^ metodika zmenena ifNil: [" +
	"\n\t\tmetodika zmenena: (Fytoportal db loadObject: metodika id)." +
	"\n\t\tself changed: #metodika with: metodika zmenena." +
	"\n\t\tmetodika zmenena]",
	null, "2013-05-04T20:40:50Z", "mp");

jst.FYPMObsahEditor.addMethod("plodiny", "", "private", 
	"\t^ panely at: #plodiny ifAbsentPut: [" +
	"\n\t\tself add: (FYPMVyberPlodin kapitola: #plodiny titulek: 'Výběr plodin')]",
	null, "2013-01-14T09:40:33Z", "mp");

jst.FYPMObsahEditor.addMethod("skudci", "", "private", 
	"\t^ panely at: #skudci ifAbsentPut: [" +
	"\n\t\tself add: (FYPMVyberPolozek kapitola: #skudci titulek: 'Výběr metodik škůdců')]",
	null, "2013-01-14T12:44:11Z", "mp");

jst.FYPMObsahEditor.addMethod("choroby", "", "private", 
	"\t^ panely at: #choroby ifAbsentPut: [" +
	"\n\t\tself add: (FYPMVyberPolozek kapitola: #choroby titulek: 'Výběr metodik chorob')]",
	null, "2013-01-14T12:43:56Z", "mp");

jst.FYPMObsahEditor.addMethod("abionozy", "", "private", 
	"\t^ panely at: #abionozy ifAbsentPut: [" +
	"\n\t\tself add: (FYPMVyberPolozek kapitola: #abionozy titulek: 'Výběr metodik abionóz')]",
	null, "2013-01-14T12:44:47Z", "mp");

jst.FYPMObsahEditor.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #kapitola1 ifTrue: [" +
	"\n\t\t(self respondsTo: anObject id) " +
	"\n\t\t\tifTrue: [(self perform: anObject id) activate]" +
	"\n\t\t\tifFalse: [self activeItem: 1]" +
	"\n\t]." +
	"\n\tself changed: anAspect with: anObject ",
	null, "2013-01-11T10:29:02Z", "mp", 1);

jst.FYPMObsahEditor.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #kapitola1 ifTrue: [" +
	"\n\t\t(self respondsTo: anObject id) " +
	"\n\t\t\tifTrue: [(self perform: anObject id) activate]" +
	"\n\t\t\tifFalse: [nahledKap activate]." +
	"\n\t\t^ self activeItem update: anAspect with: (self metodika at: anObject id)." +
	"\n\t]." +
	"\n\tanAspect = #kapitola ifTrue: [" +
	"\n\t\tanObject id = anObject link linkId ifTrue: [" +
	"\n\t\t\tnahledKap " +
	"\n\t\t\t\tactivate;" +
	"\n\t\t\t\tnactiKapitolu: anObject link link." +
	"\n\t\t] ifFalse: [" +
	"\n\t\t\tself jinaKapitola" +
	"\n\t\t\t\teditujKapitolu: anObject link id metodiky: self metodika;" +
	"\n\t\t\t\tactivate]" +
	"\n\t]",
	null, "2013-02-27T08:38:56Z", "mp", 1);

jst.FYPMObsahEditor.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #kapitola1 ifTrue: [" +
	"\n\t\t(self respondsTo: anObject id) " +
	"\n\t\t\tifTrue: [(self perform: anObject id) activate]" +
	"\n\t\t\tifFalse: [nahledKap activate]." +
	"\n\t\t^ self activeItem update: anAspect with: (self metodika at: anObject id)." +
	"\n\t]." +
	"\n\tanAspect = #kapitola ifTrue: [" +
	"\n\t\tanObject id = anObject link linkId ifTrue: [" +
	"\n\t\t\tnahledKap " +
	"\n\t\t\t\tactivate;" +
	"\n\t\t\t\tnactiKapitolu: anObject link link." +
	"\n\t\t] ifFalse: [" +
	"\n\t\t\tself jinaKapitola" +
	"\n\t\t\t\teditujKapitolu: anObject link id metodiky: (anObject link metodika ifNil: [self metodika]);" +
	"\n\t\t\t\tactivate]" +
	"\n\t]",
	null, "2013-04-25T07:32:07Z", "mp", 1);

jst.FYPMObsahEditor.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #kapitola1 ifTrue: [" +
	"\n\t\tself activeItem schovejZmeny." +
	"\n\t\t(self respondsTo: anObject id) " +
	"\n\t\t\tifTrue: [(self perform: anObject id) activate]" +
	"\n\t\t\tifFalse: [nahledKap activate]." +
	"\n\t\t^ self activeItem update: anAspect with: (self metodika at: anObject id)." +
	"\n\t]." +
	"\n\tanAspect = #kapitola ifTrue: [" +
	"\n\t\tanObject id = anObject link linkId ifTrue: [" +
	"\n\t\t\tself activeItem schovejZmeny." +
	"\n\t\t\tnahledKap " +
	"\n\t\t\t\tactivate;" +
	"\n\t\t\t\tnactiKapitolu: anObject link link." +
	"\n\t\t] ifFalse: [" +
	"\n\t\t\tself jinaKapitola" +
	"\n\t\t\t\teditujKapitolu: anObject link id metodiky: (anObject link metodika ifNil: [self metodika]);" +
	"\n\t\t\t\tactivate]" +
	"\n\t]",
	null, "2013-04-25T12:46:48Z", "mp", 1);

jst.FYPMObsahEditor.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #kapitola1 ifTrue: [" +
	"\n\t\tself activeItem schovejZmeny." +
	"\n\t\t(self respondsTo: anObject id) " +
	"\n\t\t\tifTrue: [(self perform: anObject id) activate]" +
	"\n\t\t\tifFalse: [nahledKap activate]." +
	"\n\t\t^ self activeItem update: anAspect with: (self metodika at: anObject id)." +
	"\n\t]." +
	"\n\tanAspect = #kapitola ifTrue: [" +
	"\n\t\tanObject id = anObject link linkId ifTrue: [" +
	"\n\t\t\tself activeItem schovejZmeny." +
	"\n\t\t\tnahledKap " +
	"\n\t\t\t\tactivate;" +
	"\n\t\t\t\tnactiKapitolu: anObject link." +
	"\n\t\t] ifFalse: [" +
	"\n\t\t\tself jinaKapitola" +
	"\n\t\t\t\teditujKapitolu: anObject link id metodiky: (anObject link metodika ifNil: [self metodika]);" +
	"\n\t\t\t\tactivate]" +
	"\n\t]",
	null, "2013-05-03T09:16:49Z", "mp", 1);

jst.FYPMObsahEditor.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #kapitola1 ifTrue: [" +
	"\n\t\tself activeItem schovejZmeny." +
	"\n\t\t(self respondsTo: anObject id) " +
	"\n\t\t\tifTrue: [(self perform: anObject id) activate]" +
	"\n\t\t\tifFalse: [nahledKap activate]." +
	"\n\t\t^ self activeItem update: anAspect with: (self metodika at: anObject id)." +
	"\n\t]." +
	"\n\tanAspect = #kapitola ifTrue: [" +
	"\n\t\tanObject id = anObject link linkId ifTrue: [" +
	"\n\t\t\tself activeItem schovejZmeny." +
	"\n\t\t\tnahledKap " +
	"\n\t\t\t\tactivate;" +
	"\n\t\t\t\tnactiKapitolu: anObject link." +
	"\n\t\t] ifFalse: [ | met |" +
	"\n\t\t\tmet := self metodika." +
	"\n\t\t\t(anObject id includes: #'@') ifTrue: [ | kap | " +
	"\n\t\t\t\t\"kap je osnova metodiky, id je nastaven na id SO\"" +
	"\n\t\t\t\tkap := anObject link root." +
	"\n\t\t\t\tmet := (met najdiKapitolu: kap parent id) obsah detect: [:k | k linkId = kap id]." +
	"\n\t\t\t\tmet odkazNacten ifFalse: [" +
	"\n\t\t\t\t\t\"metodika SO bude sdilena\"" +
	"\n\t\t\t\t\tmet link: ((metodika najdiKapitolu: kap parent id) obsah detect: [:k | k linkId = kap id]) link]" +
	"\n\t\t\t]." +
	"\n\t\t\tself jinaKapitola" +
	"\n\t\t\t\teditujKapitolu: anObject link id metodiky: met;" +
	"\n\t\t\t\tactivate" +
	"\n\t\t]" +
	"\n\t]",
	null, "2013-05-03T20:02:47Z", "mp", 1);

jst.FYPMObsahEditor.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #kapitola1 ifTrue: [" +
	"\n\t\tself activeItem schovejZmeny." +
	"\n\t\t(self respondsTo: anObject id) " +
	"\n\t\t\tifTrue: [(self perform: anObject id) activate]" +
	"\n\t\t\tifFalse: [nahledKap activate]." +
	"\n\t\t^ self activeItem update: anAspect with: (self zmenenaMetodika at: anObject id)." +
	"\n\t]." +
	"\n\tanAspect = #kapitola ifTrue: [" +
	"\n\t\tanObject id = anObject link linkId ifTrue: [" +
	"\n\t\t\tself activeItem schovejZmeny." +
	"\n\t\t\tnahledKap " +
	"\n\t\t\t\tactivate;" +
	"\n\t\t\t\tnactiKapitolu: anObject link." +
	"\n\t\t] ifFalse: [ | met |" +
	"\n\t\t\tmet := self zmenenaMetodika." +
	"\n\t\t\t(anObject id includes: #'@') ifTrue: [ | kap | " +
	"\n\t\t\t\t\"kap je osnova metodiky, id je nastaven na id SO\"" +
	"\n\t\t\t\tkap := anObject link root." +
	"\n\t\t\t\tmet := (met najdiKapitolu: kap parent id) obsah detect: [:k | k linkId = kap id]." +
	"\n\t\t\t\tmet odkazNacten ifFalse: [" +
	"\n\t\t\t\t\t\"metodika SO bude sdilena\"" +
	"\n\t\t\t\t\tmet link: ((metodika najdiKapitolu: kap parent id) obsah detect: [:k | k linkId = kap id]) link]" +
	"\n\t\t\t]." +
	"\n\t\t\tself jinaKapitola" +
	"\n\t\t\t\teditujKapitolu: anObject link id metodiky: met;" +
	"\n\t\t\t\tactivate" +
	"\n\t\t]" +
	"\n\t]",
	null, "2013-05-04T20:41:28Z", "mp", 1);

jst.FYPMObsahEditor.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #kapitola1 ifTrue: [" +
	"\n\t\tself activeItem schovejZmeny." +
	"\n\t\t(self respondsTo: anObject id) " +
	"\n\t\t\tifTrue: [(self perform: anObject id) activate]" +
	"\n\t\t\tifFalse: [nahledKap activate]." +
	"\n\t\t^ self activeItem update: anAspect with: (self zmenenaMetodika at: anObject id)." +
	"\n\t]." +
	"\n\tanAspect = #kapitola ifTrue: [" +
	"\n\t\tanObject id = anObject link linkId ifTrue: [" +
	"\n\t\t\tself activeItem schovejZmeny." +
	"\n\t\t\tnahledKap " +
	"\n\t\t\t\tactivate;" +
	"\n\t\t\t\tnactiKapitolu: anObject link." +
	"\n\t\t] ifFalse: [ | met |" +
	"\n\t\t\tmet := self zmenenaMetodika." +
	"\n\t\t\t(anObject id includes: #'@') ifTrue: [ | kap kapSO | " +
	"\n\t\t\t\t\"kap je osnova metodiky, id je nastaven na id SO\"" +
	"\n\t\t\t\tkap := anObject link root." +
	"\n\t\t\t\tkapSO := met najdiKapitolu: kap parent id." +
	"\n\t\t\t\tmet := kapSO obsah detect: [:k | k linkId = kap id] ifNone: [ | nova |" +
	"\n\t\t\t\t\t\"kapitola SO existuje v obecne metodice, zatim pridam do zmen\"" +
	"\n\t\t\t\t\tnova := FYKapitolaPM new" +
	"\n\t\t\t\t\t\tlink: kap id;" +
	"\n\t\t\t\t\t\tnazev: kap nazev;" +
	"\n\t\t\t\t\t\tparent: kapSO." +
	"\n\t\t\t\t\tkapSO zmeny:  (kapSO obsah copyWith: nova)." +
	"\n\t\t\t\t\tnova]." +
	"\n\t\t\t\tmet odkazNacten ifFalse: [" +
	"\n\t\t\t\t\t\"metodika SO bude sdilena\"" +
	"\n\t\t\t\t\tmet link: ((metodika najdiKapitolu: kap parent id) seznamSO detect: [:k | k linkId = kap id]) link]" +
	"\n\t\t\t]." +
	"\n\t\t\tself jinaKapitola" +
	"\n\t\t\t\teditujKapitolu: anObject link id metodiky: met;" +
	"\n\t\t\t\tactivate" +
	"\n\t\t]" +
	"\n\t]",
	null, "2013-12-13T18:36:38Z", "mp", 1);

jst.FYPMObsahEditor.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #kapitola1 ifTrue: [" +
	"\n\t\tself activeItem schovejZmeny." +
	"\n\t\t(self respondsTo: anObject id) " +
	"\n\t\t\tifTrue: [(self perform: anObject id) activate]" +
	"\n\t\t\tifFalse: [nahledKap activate]." +
	"\n\t\t^ self activeItem update: anAspect with: (self zmenenaMetodika at: anObject id)." +
	"\n\t]." +
	"\n\tanAspect = #kapitola ifTrue: [" +
	"\n\t\tanObject id = anObject link linkId ifTrue: [ | kap |" +
	"\n\t\t\tself activeItem schovejZmeny." +
	"\n\t\t\tkap := anObject link." +
	"\n\t\t\t(kap metodika at: (kap parent id)) zmeny ifNotNilDo: [:zm |" +
	"\n\t\t\t\t\"pokud jsem kapitolu SO pridal do zmen - viz nize - zobrazim v nahledu tuto kapitolu\"" +
	"\n\t\t\t\t(zm select: [:k | k linkId = kap linkId]) ifNotEmptyDo: [:k |" +
	"\n\t\t\t\t\tkap := k first]]." +
	"\n\t\t\tnahledKap " +
	"\n\t\t\t\tactivate;" +
	"\n\t\t\t\tnactiKapitolu: kap." +
	"\n\t\t] ifFalse: [ | met |" +
	"\n\t\t\tmet := self zmenenaMetodika." +
	"\n\t\t\t(anObject id includes: #'@') ifTrue: [ | kap kapSO | " +
	"\n\t\t\t\t\"kap je osnova metodiky, id je nastaven na id SO\"" +
	"\n\t\t\t\tkap := anObject link root." +
	"\n\t\t\t\tkapSO := met najdiKapitolu: kap parent id." +
	"\n\t\t\t\tmet := kapSO obsah detect: [:k | k linkId = kap id] ifNone: [ | nova |" +
	"\n\t\t\t\t\t\"kapitola SO existuje jen v obecne metodice, zatim pridam do zmen\"" +
	"\n\t\t\t\t\tnova := FYKapitolaPM new" +
	"\n\t\t\t\t\t\tlink: kap id;" +
	"\n\t\t\t\t\t\tnazev: kap nazev;" +
	"\n\t\t\t\t\t\tparent: kapSO." +
	"\n\t\t\t\t\tkapSO zmeny:  (kapSO obsah copyWith: nova)." +
	"\n\t\t\t\t\tnova]." +
	"\n\t\t\t\tmet odkazNacten ifFalse: [" +
	"\n\t\t\t\t\t\"metodika SO bude sdilena\"" +
	"\n\t\t\t\t\tmet link: ((metodika najdiKapitolu: kap parent id) seznamSO detect: [:k | k linkId = kap id]) link]" +
	"\n\t\t\t]." +
	"\n\t\t\tself jinaKapitola" +
	"\n\t\t\t\teditujKapitolu: anObject link id metodiky: met;" +
	"\n\t\t\t\tactivate" +
	"\n\t\t]" +
	"\n\t]",
	null, "2013-12-16T07:27:26Z", "mp", 1);

jst.FYPMObsahEditor.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #kapitola1 ifTrue: [" +
	"\n\t\tself activeItem schovejZmeny." +
	"\n\t\t(self respondsTo: anObject id) " +
	"\n\t\t\tifTrue: [(self perform: anObject id) activate]" +
	"\n\t\t\tifFalse: [nahledKap activate]." +
	"\n\t\t^ self activeItem update: anAspect with: (self zmenenaMetodika at: anObject id)." +
	"\n\t]." +
	"\n\tanAspect = #kapitola ifTrue: [" +
	"\n\t\tanObject id = anObject link linkId ifTrue: [ | kap |" +
	"\n\t\t\tself activeItem schovejZmeny." +
	"\n\t\t\tkap := anObject link." +
	"\n\t\t\t(kap metodika at: (kap parent id)) zmeny ifNotNilDo: [:zm |" +
	"\n\t\t\t\t\"pokud jsem kapitolu SO pridal do zmen - viz nize - zobrazim v nahledu tuto kapitolu\"" +
	"\n\t\t\t\t(zm select: [:k | k linkId = kap linkId]) ifNotEmptyDo: [:k |" +
	"\n\t\t\t\t\tkap := k first]]." +
	"\n\t\t\tnahledKap " +
	"\n\t\t\t\tactivate;" +
	"\n\t\t\t\tnactiKapitolu: kap." +
	"\n\t\t] ifFalse: [ | met |" +
	"\n\t\t\tmet := self zmenenaMetodika." +
	"\n\t\t\t(anObject id includes: #'@') ifTrue: [ | kap kapSO | " +
	"\n\t\t\t\t\"kap je osnova metodiky, id je nastaven na id SO\"" +
	"\n\t\t\t\tkap := anObject link root." +
	"\n\t\t\t\tkapSO := met najdiKapitolu: kap parent id." +
	"\n\t\t\t\tmet := kapSO obsah detect: [:k | k linkId = kap id] ifNone: [ | nova |" +
	"\n\t\t\t\t\t\"kapitola SO existuje jen v obecne metodice, zatim pridam do zmen\"" +
	"\n\t\t\t\t\tnova := FYSkodlOrgPM new" +
	"\n\t\t\t\t\t\tlink: kap id;" +
	"\n\t\t\t\t\t\tnazev: kap nazev;" +
	"\n\t\t\t\t\t\tparent: kapSO." +
	"\n\t\t\t\t\tkapSO zmeny:  (kapSO obsah copyWith: nova)." +
	"\n\t\t\t\t\tnova]." +
	"\n\t\t\t\tmet odkazNacten ifFalse: [" +
	"\n\t\t\t\t\t\"metodika SO bude sdilena\"" +
	"\n\t\t\t\t\tmet link: ((metodika najdiKapitolu: kap parent id) seznamSO detect: [:k | k linkId = kap id]) link]" +
	"\n\t\t\t]." +
	"\n\t\t\tself jinaKapitola" +
	"\n\t\t\t\teditujKapitolu: anObject link id metodiky: met;" +
	"\n\t\t\t\tactivate" +
	"\n\t\t]" +
	"\n\t]",
	null, "2014-03-12T19:44:08Z", "mp"); //fytoportal-ior-edit

jst.FYPMObsahEditor.addMethod("jinaKapitola", "", "private", 
	"\t^ panely at: #jinaKapitola ifAbsentPut: [" +
	"\n\t\t(self add: FYTextKapitolyEditor new)" +
	"\n\t\t\taddDependent: nahledKap;" +
	"\n\t\t\tyourself]",
	null, "2013-05-14T08:36:00Z", "mp");

jst.FYPMObsahEditor.addMethod("dependents", "", "dependent access", 
	"\t^ panely",
	null, "2013-01-10T22:59:11Z", "mp");

jst.FYPMObsahEditor.addMethod("nahled", "", "accessing", 
	"\t^ nahledKap",
	null, "2013-05-01T13:27:14Z", "mp");

jst.FYPMObsahEditor.addMethod("zmenaMetodikySO:", "met", "updating", 
	"\tmetodika ifNotNil: [" +
	"\n\t\tmetodika zmenMetodikuSO: met]",
	null, "2013-05-03T13:49:28Z", "mp");

jst.FYPMObsahEditor.addMethod("zahodZmeny", "", "actions", 
	"\tmetodika zmenena: nil." +
	"\n\tself changed: #metodika with: metodika." +
	"\n\tnahledKap update: #metodika with: metodika." +
	"\n\tself activeItem zahodZmeny",
	null, "2013-05-14T22:16:34Z", "mp", 1);

jst.FYPMObsahEditor.addMethod("zahodZmeny", "", "actions", 
	"\tnahledKap isActive ifFalse: [" +
	"\n\t\tself activeItem zahodZmeny]." +
	"\n\tmetodika zmenena: nil",
	null, "2013-05-15T08:11:28Z", "mp", 1);

jst.FYPMObsahEditor.addMethod("zahodZmeny", "", "actions", 
	"\tnahledKap isActive" +
	"\n\t\tifTrue: [" +
	"\n\t\t\tmetodika zmenena: nil." +
	"\n\t\t\tnahledKap kapitola link ifNil: [" +
	"\n\t\t\t\tnahledKap nactiKapitolu: (metodika at: nahledKap kapitola id)]]" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tself activeItem zahodZmeny." +
	"\n\t\t\tmetodika zmenena: nil].",
	null, "2013-11-05T07:25:00Z", "mp"); //fytoportal-ior-edit

jst.FYPMObsahEditor.addMethod("zmenaMetodiky:", "met", "updating", 
	"\tmetodika := met",
	null, "2013-05-15T09:47:32Z", "mp");

jst.FYPMObsahEditor.addMethod("zmenaObecneMetodiky:", "met", "updating", 
	"\tmetodika := met",
	null, "2013-12-04T10:58:49Z", "mp");

//*** FYPMVyberPolozek ***

/*
jst.FYPMVyberPolozek.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tnazvy := Dictionary new." +
	"\n\tgrid := ExtGridPanel new" +
	"\n\t\t\"loadMask: true;\"" +
	"\n\t\tstore: (ExtJsonStore new" +
	"\n\t\t\trestful: true;" +
	"\n\t\t\tautoDestroy: true;" +
	"\n\t\t\turl: self storeUrl;" +
	"\n\t\t\troot: 'rows';" +
	"\n\t\t\tfields: self storeFields;" +
	"\n\t\t\ton: #update do: self recordUpdate;" +
	"\n\t\t\tdefaultSortBy: 'vyber' asc: false);" +
	"\n\t\tcolumns: self gridColumns;" +
	"\n\t\twidth: self gridWidth;" +
	"\n\t\theight: 550." +
	"\n\tself " +
	"\n\t\tborder: false;" +
	"\n\t\tadd: grid;" +
	"\n\t\tbuttonAlign: #left;" +
	"\n\t\tbodyStyle: 'background-color: transparent';" +
	"\n\t\tbuttons: {" +
	"\n\t\t\tsaveBtn := ExtButton new text: 'Uložit změny'; on: #click do: [self ulozZmeny]; beDisabled. " +
	"\n\t\t\tcancelBtn := ExtButton new text: 'Zahodit změny'; on: #click do: [self zahodZmeny]; beDisabled}",
	null, "2013-01-14T09:35:27Z", "mp");
*/

jst.FYPMVyberPolozek.addMethod("initialize", "", "initialization", 
	"\tnazvy := Dictionary new." +
	"\n\tgrid := ExtGridPanel new" +
	"\n\t\t\"loadMask: true;\"" +
	"\n\t\tstore: (ExtJsonStore new" +
	"\n\t\t\trestful: true;" +
	"\n\t\t\tautoDestroy: true;" +
	"\n\t\t\turl: self storeUrl;" +
	"\n\t\t\troot: 'rows';" +
	"\n\t\t\tfields: self storeFields;" +
	"\n\t\t\ton: #update do: self recordUpdate;" +
	"\n\t\t\tdefaultSortBy: 'vyber' asc: false);" +
	"\n\t\tcolumns: self gridColumns;" +
	"\n\t\tanchor: '100%';" +
	"\n\t\theight: 550." +
	"\n\tsuper initialize" +
	"\n\t\twithCenterLayout;" +
	"\n\t\tadd: (ExtFormPanel new" +
	"\n\t\t\ty: 25;" +
	"\n\t\t\twidth: 500;" +
	"\n\t\t\theight: 600;" +
	"\n\t\t\tadd: grid;" +
	"\n\t\t\tbuttonAlign: #left;" +
	"\n\t\t\tbodyStyle: 'background-color: transparent';" +
	"\n\t\t\tbuttons: {" +
	"\n\t\t\t\tsaveBtn := ExtButton new text: 'Potvrdit výběr'; on: #click do: [self ulozZmeny]; beDisabled. " +
	"\n\t\t\t\tcancelBtn := ExtButton new text: 'Původní výběr '; on: #click do: [self zahodZmeny]; beDisabled})",
	null, "2013-02-28T07:07:48Z", "mp", 1);

jst.FYPMVyberPolozek.addMethod("initialize", "", "initialization", 
	"\tnazvy := Dictionary new." +
	"\n\tgrid := ExtGridPanel new" +
	"\n\t\t\"loadMask: true;\"" +
	"\n\t\tstore: (ExtJsonStore new" +
	"\n\t\t\trestful: true;" +
	"\n\t\t\tautoDestroy: true;" +
	"\n\t\t\turl: self storeUrl;" +
	"\n\t\t\troot: 'rows';" +
	"\n\t\t\tfields: self storeFields;" +
	"\n\t\t\ton: #update do: self recordUpdate;" +
	"\n\t\t\tdefaultSortBy: 'vyber' asc: false);" +
	"\n\t\tcolumns: self gridColumns;" +
	"\n\t\tanchor: '100%';" +
	"\n\t\theight: 550." +
	"\n\tsuper initialize" +
	"\n\t\twithCenterLayout;" +
	"\n\t\tadd: (ExtFormPanel new" +
	"\n\t\t\ty: 25;" +
	"\n\t\t\twidth: 500;" +
	"\n\t\t\theight: 600;" +
	"\n\t\t\tadd: grid;" +
	"\n\t\t\tbuttonAlign: #left;" +
	"\n\t\t\tbodyStyle: 'background-color: transparent';" +
	"\n\t\t\tbuttons: {" +
	"\n\t\t\t\tsaveBtn := ExtButton new " +
	"\n\t\t\t\t\ttext: 'Potvrdit výběr'; " +
	"\n\t\t\t\t\ticonCls: #'btn-confirm';" +
	"\n\t\t\t\t\ton: #click do: [self ulozZmeny]; " +
	"\n\t\t\t\t\tbeDisabled. " +
	"\n\t\t\t\tcancelBtn := ExtButton new " +
	"\n\t\t\t\t\ttext: 'Původní výběr '; " +
	"\n\t\t\t\t\ticonCls: #'btn-cancel';" +
	"\n\t\t\t\t\ton: #click do: [self zahodZmeny]; " +
	"\n\t\t\t\t\tbeDisabled})",
	null, "2013-09-12T20:30:34Z", "mp", 1);

jst.FYPMVyberPolozek.addMethod("initialize", "", "initialization", 
	"\tnazvy := Dictionary new." +
	"\n\tgrid := ExtGridPanel new" +
	"\n\t\t\"loadMask: true;\"" +
	"\n\t\tstore: (ExtJsonStore new" +
	"\n\t\t\trestful: true;" +
	"\n\t\t\tautoDestroy: true;" +
	"\n\t\t\turl: self storeUrl;" +
	"\n\t\t\troot: 'rows';" +
	"\n\t\t\tfields: self storeFields;" +
	"\n\t\t\ton: #update do: self recordUpdate;" +
	"\n\t\t\tdefaultSortBy: 'vyber' asc: false);" +
	"\n\t\tcolumns: self gridColumns;" +
	"\n\t\tanchor: '100%';" +
	"\n\t\theight: 550." +
	"\n\tsuper initialize" +
	"\n\t\twithCenterLayout;" +
	"\n\t\tadd: (ExtFormPanel new" +
	"\n\t\t\ty: 25;" +
	"\n\t\t\twidth: 500;" +
	"\n\t\t\theight: 600;" +
	"\n\t\t\tadd: grid;" +
	"\n\t\t\tbuttonAlign: #left;" +
	"\n\t\t\tbodyStyle: 'background-color: transparent';" +
	"\n\t\t\tbuttons: self createButtons)",
	null, "2013-11-12T09:33:13Z", "mp"); //fytoportal-ior-edit

jst.FYPMVyberPolozek.addMethod("createButtons", "", "private", 
	"\t^ {\tsaveBtn := ExtButton new " +
	"\n\t\t\ttext: 'Potvrdit výběr'; " +
	"\n\t\t\ticonCls: #'btn-confirm';" +
	"\n\t\t\ton: #click do: [self ulozZmeny]; " +
	"\n\t\t\tbeDisabled. " +
	"\n\t\tcancelBtn := ExtButton new " +
	"\n\t\t\ttext: 'Původní výběr '; " +
	"\n\t\t\ticonCls: #'btn-cancel';" +
	"\n\t\t\ton: #click do: [self zahodZmeny]; " +
	"\n\t\t\tbeDisabled}",
	null, "2013-11-12T09:32:41Z", "mp"); //fytoportal-ior-edit

jst.FYPMVyberPolozek.addMethod("storeFields", "", "private", 
	"\t^ {'id'. (ExtField new name: 'vyber'; type: #boolean). 'cesky'}",
	null, "2013-01-14T09:05:55Z", "mp");

jst.FYPMVyberPolozek.addMethod("kapitola:titulek:", "id aString", "initialization", 
	"\tkapId := id." +
	"\n\tself initialize." +
	"\n\tgrid title: aString",
	null, "2013-01-14T09:15:33Z", "mp", 1);

jst.FYPMVyberPolozek.addMethod("kapitola:titulek:", "id aString", "initialization", 
	"\tkapId := id." +
	"\n\tself initialize." +
	"\n\tgrid " +
	"\n\t\ttitle: aString;" +
	"\n\t\tkeypressFilter: [:ev | grid store filterBy: [:rec | | fld |" +
	"\n\t\t\tfld := ev keyChar isUppercase ifTrue: [#latinsky] ifFalse: [#cesky]." +
	"\n\t\t\t((rec data at: fld) startsWith: ev keyChar) or: [(rec data at: #vyber) = true]]]",
	null, "2013-12-09T20:47:50Z", "mp"); //fytoportal-ior-edit

jst.FYPMVyberPolozek.addMethod("storeUrl", "", "private", 
	"\t^ Fytoportal data metodiky doc url, '_list/store-vyber/', kapId",
	null, "2013-01-14T09:42:20Z", "mp");

jst.FYPMVyberPolozek.addMethod("gridColumns", "", "private", 
	"\t^ {\tExtCheckColumn new header: 'A/N'; dataIndex: #vyber; width: 50; isSortable: true." +
	"\n\t\tExtColumn new header: 'Název metodiky'; dataIndex: #cesky; width: 200; isSortable: true}",
	null, "2013-01-14T09:44:32Z", "mp");
/*
jst.FYPMVyberPolozek.addMethod("gridWidth", "", "private", 
	"\t^ 300",
	null, "2013-01-14T09:46:34Z", "mp");
*/
jst.FYPMVyberPolozek._class.addMethod("kapitola:titulek:", "id aString", "instance creation", 
	"\t^ self basicNew" +
	"\n\t\tkapitola: id titulek: aString",
	null, "2013-01-14T09:15:54Z", "mp");

jst.FYPMVyberPolozek.addMethod("recordUpdate", "", "private", 
	"\t^ [:gr :record :operation | operation = #edit ifTrue: [" +
	"\n\t\t(record data at: #vyber)" +
	"\n\t\t\tifTrue: [novyVyber addUnique: (record data at: #id)." +
	"\n\t\t\t\tnazvy at: (record data at: #id) put: (record data at: #cesky)]" +
	"\n\t\t\tifFalse: [novyVyber remove: (record data at: #id)]." +
	"\n\t\tsaveBtn isDisabled: vyber = novyVyber." +
	"\n\t\tsaveBtn isEnabled ifTrue: [\"jen poprve\"" +
	"\n\t\t\tcancelBtn isEnabled: true]]" +
	"\n\t]",
	null, "2013-01-17T13:53:29Z", "mp");

jst.FYPMVyberPolozek.addMethod("novyObsah", "", "private", 
	"\t^ novyVyber collect: [:ea | FYKapitolaPM new" +
	"\n\t\tlink: ea;" +
	"\n\t\tnazev: (nazvy at: ea);" +
	"\n\t\tparent: kapitola]",
	null, "2013-01-14T09:58:50Z", "mp", 1);

jst.FYPMVyberPolozek.addMethod("novyObsah", "", "private", 
	"\t| list |" +
	"\n\t\"Neni-li kapitola (taxon) ve vyberu, pouze se oznaci jako vyrazena. Obsah by totiz mohl byt zmenen\"" +
	"\n\tlist := OrderedCollection new." +
	"\n\tkapitola obsah asCollection do: [:kap |" +
	"\n\t\tkap vyrazena: (novyVyber includes: kap linkId) not." +
	"\n\t\tkap jeVyrazena ifFalse: [" +
	"\n\t\t\tlist add: kap]]." +
	"\n\tnovyVyber do: [:ea | " +
	"\n\t\tlist detect: [:kap | kap linkId = ea] ifNone: [list add: (" +
	"\n\t\t\tFYKapitolaPM new" +
	"\n\t\t\t\tlink: ea;" +
	"\n\t\t\t\tnazev: (nazvy at: ea);" +
	"\n\t\t\t\tparent: kapitola)]]." +
	"\n\t^ list",
	null, "2013-03-01T15:06:10Z", "mp", 2);

jst.FYPMVyberPolozek.addMethod("novyObsah", "", "private", 
	"\t| list |" +
	"\n\t\"Neni-li kapitola (taxon) ve vyberu, pouze se oznaci jako vyrazena. Obsah by totiz mohl byt zmenen\"" +
	"\n\tlist := OrderedCollection new." +
	"\n\tkapitola obsah asCollection do: [:kap |" +
	"\n\t\tkap vyrazena: (novyVyber includes: kap linkId) not." +
	"\n\t\tkap jeVyrazena ifFalse: [" +
	"\n\t\t\tlist add: kap]]." +
	"\n\tnovyVyber do: [:ea | " +
	"\n\t\tlist detect: [:kap | kap linkId = ea] ifNone: [list add: (" +
	"\n\t\t\tFYSkodlOrgPM new" +
	"\n\t\t\t\tlink: ea;" +
	"\n\t\t\t\tnazev: (nazvy at: ea);" +
	"\n\t\t\t\tparent: kapitola)]]." +
	"\n\t^ list",
	null, "2014-03-12T19:42:34Z", "mp"); //fytoportal-ior-edit

jst.FYPMVyberPolozek.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #metodika ifTrue: [" +
	"\n\t\t\"zmena metodiky\"" +
	"\n\t\tvyber := nil]." +
	"\n\t(anAspect = #kapitola1 & vyber isNil and: [kapId = anObject id]) ifTrue: [" +
	"\n\t\tkapitola := anObject." +
	"\n\t\tvyber := self sestavVyber." +
	"\n\t\tnovyVyber := vyber copy." +
	"\n\t\tgrid store " +
	"\n\t\t\tparameterAt: #vyber put: (vyber asTextualList: #yourself separator: ','); " +
	"\n\t\t\tload." +
	"\n\t]",
	null, "2013-01-14T14:00:05Z", "mp", 1);

jst.FYPMVyberPolozek.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #metodika ifTrue: [" +
	"\n\t\t\"zmena metodiky\"" +
	"\n\t\tvyber := nil]." +
	"\n\t(anAspect = #kapitola1 & vyber isNil and: [kapId = anObject id]) ifTrue: [" +
	"\n\t\tkapitola := anObject." +
	"\n\t\tself nactiVyber." +
	"\n\t\tcancelBtn isEnabled: kapitola zmeny notNil" +
	"\n\t]",
	null, "2013-03-01T15:46:36Z", "mp", 1);

jst.FYPMVyberPolozek.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #metodika ifTrue: [" +
	"\n\t\t\"zmena metodiky\"" +
	"\n\t\tvyber := nil]." +
	"\n\t(anAspect = #kapitola1 & vyber isNil and: [kapId = anObject id]) ifTrue: [" +
	"\n\t\tkapitola := anObject." +
	"\n\t\tself nactiVyber." +
	"\n\t\tcancelBtn isEnabled: kapitola zmeny notNil." +
	"\n\t\t\"u obecné metodiky nesmí jít plodiny zaškrtávat\"" +
	"\n\t\tgrid columns first isHidden: kapitola metodika jeObecnaMetodika & kapitola jeKapitolaSO not]",
	null, "2013-12-10T14:12:45Z", "mp"); //fytoportal-ior-edit

jst.FYPMVyberPolozek.addMethod("ulozZmeny", "", "actions", 
	"\t| puvodni |" +
	"\n\tpuvodni := kapitola obsah." +
	"\n\tkapitola obsah: self novyObsah." +
	"\n\t[" +
	"\n\t\tFytoportal data ulozMetodiku: kapitola metodika." +
	"\n\t\tvyber := novyVyber copy." +
	"\n\t\tgrid store commitChanges." +
	"\n\t\tgrid store sortBy: 'vyber' asc: false." +
	"\n\t\tsaveBtn beDisabled." +
	"\n\t\tcancelBtn beDisabled" +
	"\n\t] ifError: [" +
	"\n\t\tkapitola obsah: puvodni]",
	null, "2013-01-26T21:49:26Z", "mp", 1);

jst.FYPMVyberPolozek.addMethod("ulozZmeny", "", "actions", 
	"\tkapitola zmeny: self novyObsah." +
	"\n\tvyber := novyVyber copy." +
	"\n\tgrid store commitChanges." +
	"\n\tgrid store sortBy: 'vyber' asc: false." +
	"\n\tsaveBtn beDisabled." +
	"\n\tUIManager default broadcastEvent: #zmenaKapitoly: with: kapitola",
	null, "2013-03-01T15:30:01Z", "mp", 1);

jst.FYPMVyberPolozek.addMethod("ulozZmeny", "", "actions", 
	"\tkapitola zmeny: self novyObsah." +
	"\n\tvyber := novyVyber copy." +
	"\n\tgrid store commitChanges." +
	"\n\tgrid store sortBy: 'vyber' asc: false." +
	"\n\tsaveBtn beDisabled." +
	"\n\tself broadcastEvent: #zmenaKapitoly: with: kapitola",
	null, "2013-05-14T07:37:06Z", "mp", 1);

jst.FYPMVyberPolozek.addMethod("ulozZmeny", "", "actions", 
	"\tkapitola zmeny: self novyObsah." +
	"\n\tvyber := novyVyber copy." +
	"\n\tgrid store commitChanges." +
	"\n\tgrid store sortBy: 'vyber' asc: false." +
	"\n\tsaveBtn beDisabled." +
	"\n\tself editorPM zmenaKapitoly: kapitola",
	null, "2013-05-14T09:05:57Z", "mp", 1);

jst.FYPMVyberPolozek.addMethod("ulozZmeny", "", "actions", 
	"\tkapitola zmeny: self novyObsah." +
	"\n\tvyber := novyVyber copy." +
	"\n\tself potvrdVyber." +
	"\n\tsaveBtn beDisabled." +
	"\n\tself editorPM zmenaKapitoly: kapitola",
	null, "2013-11-12T10:25:28Z", "mp"); //fytoportal-ior-edit

jst.FYPMVyberPolozek.addMethod("potvrdVyber", "", "private", 
	"\tgrid store " +
	"\n\t\tcommitChanges;" +
	"\n\t\tsortBy: 'vyber' asc: false",
	null, "2013-11-12T10:25:59Z", "mp");

jst.FYPMVyberPolozek.addMethod("zahodZmeny", "", "actions", 
	"\tnovyVyber := vyber copy." +
	"\n\tgrid store rejectChanges." +
	"\n\tsaveBtn beDisabled." +
	"\n\tcancelBtn beDisabled",
	null, "2013-01-11T11:22:17Z", "mp", 1);

jst.FYPMVyberPolozek.addMethod("zahodZmeny", "", "actions", 
	"\t\"zmeny mohly byt provedene drive\"" +
	"\n\tgrid store rejectChanges." +
	"\n\tsaveBtn beDisabled." +
	"\n\tcancelBtn beDisabled." +
	"\n\tkapitola zmeny: nil." +
	"\n\tself nactiVyber." +
	"\n\tUIManager default broadcastEvent: #zmenaKapitoly: with: kapitola",
	null, "2013-03-01T15:47:36Z", "mp", 1);

jst.FYPMVyberPolozek.addMethod("zahodZmeny", "", "actions", 
	"\t\"zmeny mohly byt provedene drive\"" +
	"\n\tgrid store rejectChanges." +
	"\n\tsaveBtn beDisabled." +
	"\n\tcancelBtn beDisabled." +
	"\n\tkapitola zmeny: nil." +
	"\n\tself nactiVyber." +
	"\n\tself broadcastEvent: #zmenaKapitoly: with: kapitola",
	null, "2013-05-14T07:37:22Z", "mp", 1);

jst.FYPMVyberPolozek.addMethod("zahodZmeny", "", "actions", 
	"\t\"zmeny mohly byt provedene drive\"" +
	"\n\tgrid store rejectChanges." +
	"\n\tsaveBtn beDisabled." +
	"\n\tcancelBtn beDisabled." +
	"\n\tkapitola zmeny: nil." +
	"\n\tself nactiVyber." +
	"\n\tself editorPM zmenaKapitoly: kapitola",
	null, "2013-05-14T09:06:16Z", "mp"); //fytoportal-ior-edit

jst.FYPMVyberPolozek.addMethod("editorPM", "", "private", 
	"\t^ self ownerContainer ownerContainer",
	null, "2013-05-14T09:05:20Z", "mp");

jst.FYPMVyberPolozek.addMethod("sestavVyber", "", "private", 
	"\t\"vyber a novyVyber jsou usporadane, aby je bylo mozno porovnat\"" +
	"\n\t^ (kapitola obsah asCollection collect: [:ea | " +
	"\n\t\tnazvy at: ea linkId put: ea nazev. " +
	"\n\t\tea linkId]) asSortedCollection",
	null, "2013-01-14T13:46:51Z", "mp", 1);
	
jst.FYPMVyberPolozek.addMethod("sestavVyber", "", "private", 
	"\t\"vyber a novyVyber jsou usporadane, aby je bylo mozno porovnat\"" +
	"\n\t^ (kapitola seznamSO collect: [:ea | " +
	"\n\t\tnazvy at: ea linkId put: ea nazev. " +
	"\n\t\tea linkId]) asSortedCollection",
	null, "2013-03-01T14:49:23Z", "mp", 1);

jst.FYPMVyberPolozek.addMethod("sestavVyber", "", "private", 
	"\t\"vyber a novyVyber jsou usporadane, aby je bylo mozno porovnat\"" +
	"\n\t^ (kapitola obsah collect: [:ea | " +
	"\n\t\tnazvy at: ea linkId put: ea nazev. " +
	"\n\t\tea linkId]) asSortedCollection",
	null, "2013-03-05T08:41:14Z", "mp");

jst.FYPMVyberPolozek.addMethod("nactiVyber", "", "private", 
	"\tvyber := self sestavVyber." +
	"\n\tnovyVyber := vyber copy." +
	"\n\tgrid store " +
	"\n\t\tparameterAt: #vyber put: (vyber asTextualList: #yourself separator: ','); " +
	"\n\t\tload.",
	null, "2013-03-01T21:06:32Z", "mp");

jst.FYPMVyberPolozek.addMethod("novaMetodikaSO:", "met", "updating", 
	"\t(kapId = met class kapitola and: [kapitola notNil]) ifTrue: [" +
	"\n\t\t[grid store " +
	"\n\t\t\tparameterAt: #vyber put: (novyVyber asTextualList: #yourself separator: ','); " +
	"\n\t\t\tload] delayed: 10" +
	"\n\t]",
	null, "2013-01-25T13:43:45Z", "mp");

jst.FYPMVyberPolozek.addMethod("zmenaMetodikySO:", "met", "updating", 
	"\tkapId = met class kapitola ifTrue: [ | rec |" +
	"\n\t\trec := grid store detect: [:r | r id = met id] ifNone: nil." +
	"\n\t\trec ifNotNil: [" +
	"\n\t\t\trec data at: #cesky put: met nazev." +
	"\n\t\t\trec commit]" +
	"\n\t]",
	null, "2013-01-25T15:44:13Z", "mp");

jst.FYPMVyberPolozek.addMethod("schovejZmeny", "", "actions", 
	"\t\"musi se rucne potvrdit\"",
	null, "2013-04-25T12:49:18Z", "mp");

//*** FYPMVyberPlodin ***

/*
jst.FYPMVyberPlodin.addMethod("kapitola:titulek:", "id aString", "initialization", 
	"\tsuper kapitola: id titulek: aString." +
	"\n\tgrid keypressFilter: [:ev | grid store filterBy: [:rec | | fld |" +
	"\n\t\tfld := ev keyChar isUppercase ifTrue: [#latinsky] ifFalse: [#cesky]." +
	"\n\t\t((rec data at: fld) startsWith: ev keyChar) or: [(rec data at: #vyber) = true]]]",
	null, "2013-09-12T19:18:45Z", "mp");
*/

jst.FYPMVyberPlodin.addMethod("storeFields", "", "private", 
	"\t^ super storeFields copyWith: 'latinsky'",
	null, "2013-01-14T09:41:34Z", "mp");

jst.FYPMVyberPlodin.addMethod("storeUrl", "", "private", 
	"\t^ Fytoportal data plodiny doc url, '_list/store-vyber/cesky'",
	null, "2013-01-18T22:11:56Z", "mp");

jst.FYPMVyberPlodin.addMethod("gridColumns", "", "private", 
	"\t| cls |" +
	"\n\tcls := super gridColumns." +
	"\n\tcls last header: 'Český název plodiny'." +
	"\n\t^ cls copyWith: (ExtColumn new header: 'Vědecký název plodiny'; dataIndex: #latinsky; width: 200; isSortable: true)",
	null, "2013-01-14T09:46:00Z", "mp");
/*
jst.FYPMVyberPlodin.addMethod("gridWidth", "", "private", 
	"\t^ 500",
	null, "2013-01-14T09:46:18Z", "mp");

jst.FYPMVyberPlodin.addMethod("sestavVyber", "", "private", 
	"\t^ (kapitola obsah asCollection collect: [:ea | " +
	"\n\t\tnazvy at: ea key put: ea value. " +
	"\n\t\tea key]) asSortedCollection",
	null, "2013-01-14T09:50:28Z", "mp");
*/

jst.FYPMVyberPlodin.addMethod("novyObsah", "", "private", 
	"\t^ novyVyber collect: [:ea | Association key: ea value: (nazvy at: ea)]",
	null, "2013-01-14T09:55:44Z", "mp", 1);

jst.FYPMVyberPlodin.addMethod("novyObsah", "", "private", 
	"\t^ novyVyber collect: [:ea | " +
	"\n\t\tFYPlodinaPM new " +
	"\n\t\t\tlink: ea; " +
	"\n\t\t\tnazev: (nazvy at: ea)]",
	null, "2013-04-23T14:03:35Z", "mp");

jst.FYPMVyberPlodin.addMethod("createButtons", "", "private", 
	"\t^ super createButtons copyWith: (ExtButton new " +
	"\n\t\ttext: 'Nová plodina'; " +
	"\n\t\ticonCls: #'btn-add';" +
	"\n\t\ton: #click do: [" +
	"\n\t\t\t(FYTaxonPopisEditor new asDialogOn: FYPlodina new) show])",
	null, "2013-11-12T09:36:26Z", "mp");

jst.FYPMVyberPlodin.addMethod("novyTaxon:", "anObject", "updating", 
	"\tanObject jePlodina ifTrue: [" +
	"\n\t\tgrid store reload]",
	null, "2013-11-12T09:49:15Z", "mp");

jst.FYPMVyberPlodin.addMethod("potvrdVyber", "", "private", 
	"\tgrid store commitChanges." +
	"\n\tgrid clearKeypressFilter." +
	"\n\tgrid store sortBy: 'vyber' asc: false",
	null, "2013-11-12T10:26:16Z", "mp");

jst.FYPMVyberPlodin.addMethod("zahodZmeny", "", "actions", 
	"\tgrid clearKeypressFilter." +
	"\n\tsuper zahodZmeny",
	null, "2013-11-12T10:37:56Z", "mp");

//*** FYMetodikaSOEditor ***

/*
jst.FYMetodikaSOEditor.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tmasterNavig title: 'Dostupné metodiky'." +
	"\n\ttoolbar hide",
	null, "2013-01-17T13:39:39Z", "mp");

jst.FYMetodikaSOEditor.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tmasterNavig title: 'Dostupné metodiky'",
	null, "2013-02-27T19:47:05Z", "mp");
*/
jst.FYMetodikaSOEditor.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tmasterNavig title: 'Dostupné metodiky'." +
	"\n\tdetailNavig onPathActivated: [:panel :aPath | " +
	"\n\t\t(panel selectedNode notNil and: [panel selectedNode id = #preview]) ifTrue: [" +
	"\n\t\t\tnahledKapitoly pathActivated: aPath]]",
	null, "2013-05-01T10:04:34Z", "mp");

jst.FYMetodikaSOEditor.addMethod("activateEvent", "", "events", 
	"\t^ [\tmasterNavig root hasChildNodes ifFalse: [" +
	"\n\t\t\tmasterNavig root: self metodikyRoot." +
	"\n\t\t\tmasterNavig root children first select]." +
	"\n\t\tdetailNavig kapitola: data]",
	null, "2013-01-23T15:27:40Z", "mp", 1);

jst.FYMetodikaSOEditor.addMethod("activateEvent", "", "events", 
	"\t^ [\tFytoportal navigator ior editace label: self title." +
	"\n\t\tmasterNavig root hasChildNodes ifFalse: [" +
	"\n\t\t\t\"pouze poprve\"" +
	"\n\t\t\tmasterNavig root: self metodikyRoot." +
	"\n\t\t\tmasterNavig root children first select." +
	"\n\t\t\tdetailNavig kapitola: data" +
	"\n\t\t] ifTrue: [" +
	"\n\t\t\tself appPath trackHistory: [:path | " +
	"\n\t\t\t\tpath switchPath]]]",
	null, "2013-08-22T10:43:13Z", "mp");

/* zda se, ze neni potreba, je spis kontraproduktivni
jst.FYMetodikaSOEditor.addMethod("activateEvent", "", "events", 
	"\t^ [\tFytoportal navigator ior editace label: self title." +
	"\n\t\tmasterNavig root hasChildNodes ifFalse: [" +
	"\n\t\t\t\"pouze poprve\"" +
	"\n\t\t\tmasterNavig root: self metodikyRoot." +
	"\n\t\t\tdetailNavig kapitola: data." +
	"\n\t\t\t[masterNavig selectedNode ifNil: [" +
	"\n\t\t\t\t\"defaultne vyberu prvni polozku, pokud mezitim nebyla vybrana jina\"" +
	"\n\t\t\t\tmasterNavig root children first select]] delayed: 100." +
	"\n\t\t] ifTrue: [" +
	"\n\t\t\tself appPath trackHistory: [:path | " +
	"\n\t\t\t\tpath switchPath]]]",
	null, "2013-09-19T14:10:43Z", "mp"); //fytoportal-ior-edit
*/

jst.FYMetodikaSOEditor.addMethod("detailNavigClass", "", "private", 
	"\t^ FYKapitolaSOEditPanel",
	null, "2013-01-14T20:28:44Z", "mp");

jst.FYMetodikaSOEditor.addMethod("typ:", "aClass", "accessing", 
	"\ttyp := aClass." +
	"\n\tdata := aClass kapitola",
	null, "2013-01-25T13:00:26Z", "mp");

jst.FYMetodikaSOEditor.addMethod("appPath", "", "accessing", 
	"\t^ Fytoportal navigator ior editaceMetodik: data",
	null, "2013-01-25T13:07:59Z", "mp");

jst.FYMetodikaSOEditor._class.addMethod("typ:titulek:", "aClass aString", "instance creation", 
	"\t^ self basicNew" +
	"\n\t\ttyp: aClass;" +
	"\n\t\tinitialize;" +
	"\n\t\ttitle: aString",
	null, "2013-01-25T12:59:19Z", "mp");

/*
jst.FYMetodikaSOEditor.addMethod("editorObsahu", "", "private", 
	"\teditorPopisu := (FYMetodikaSOTaxonEditor data: data) border: true; padding: 10; width: 700; height: 500; y: 25." +
	"\n\teditorPopisu ulozObsah: [:met :ev | self ulozObsah: met posli: ev]." +
	"\n\t^ ExtPanel new" +
	"\n\t\twithCardLayout;" +
	"\n\t\tborder: true;" +
	"\n\t\tadd: ExtContainer new;" +
	"\n\t\tadd: (ExtPanel new withCenterLayout; add: editorPopisu; yourself);" +
	"\n\t\tadd: (editorKapitoly := FYTextKapitolyEditor new osnova: data; y: 25);" +
	"\n\t\tadd: (nahledKapitoly := FYTextKapitolyPanel new);" +
	"\n\t\tbuttonAlign: #center;" +
	"\n\t\tbuttons: {" +
	"\n\t\t\tExtButton new text: 'Uložit změny'; on: #click do: [self ulozZmeny]. " +
	"\n\t\t\tExtButton new text: 'Zahodit změny'; on: #click do: [self zahodZmeny]};" +
	"\n\t\tactiveItem: 1",
	null, "2013-02-19T16:01:43Z", "mp");

jst.FYMetodikaSOEditor.addMethod("editorObsahu", "", "private", 
	"\teditorPopisu := FYMetodikaSOTaxonEditor data: data." +
	"\n\teditorPopisu ulozObsah: [:met :ev | self ulozObsah: met posli: ev]." +
	"\n\t^ ExtPanel new" +
	"\n\t\twithCardLayout;" +
	"\n\t\tborder: true;" +
	"\n\t\tadd: ExtContainer new;" +
	"\n\t\tadd: editorPopisu;" +
	"\n\t\tadd: (editorKapitoly := FYTextKapitolyEditor new osnova: data; y: 25);" +
	"\n\t\tadd: (nahledKapitoly := FYTextKapitolyNahled new);" +
	"\n\t\tbuttonAlign: #center;" +
	"\n\t\tbuttons: {" +
	"\n\t\t\tExtButton new text: 'Uložit změny'; on: #click do: [self ulozZmeny]. " +
	"\n\t\t\tExtButton new text: 'Zahodit změny'; on: #click do: [self zahodZmeny]};" +
	"\n\t\tactiveItem: 1",
	null, "2013-02-21T14:44:19Z", "mp");

jst.FYMetodikaSOEditor.addMethod("editorObsahu", "", "private", 
	"\teditorPopisu := FYMetodikaSOTaxonEditor data: data." +
	"\n\teditorPopisu ulozObsah: [:met :ev | self ulozObsah: met posli: ev]." +
	"\n\t^ ExtPanel new" +
	"\n\t\twithCardLayout;" +
	"\n\t\tborder: true;" +
	"\n\t\tadd: ExtContainer new;" +
	"\n\t\tadd: editorPopisu;" +
	"\n\t\tadd: (editorKapitoly := FYTextKapitolyEditor new osnova: data);" +
	"\n\t\tadd: (nahledKapitoly := FYTextKapitolyNahled new);" +
	"\n\t\tactiveItem: 1",
	null, "2013-02-28T07:08:32Z", "mp");
*/
jst.FYMetodikaSOEditor.addMethod("editorObsahu", "", "private", 
	"\teditorPopisu := FYMetodikaSOTaxonEditor data: data." +
	"\n\teditorPopisu ulozObsah: [:met :ev | self ulozObsah: met posli: ev]." +
	"\n\teditorKapitoly := FYTextKapitolyEditor new osnova: data." +
	"\n\tnahledKapitoly := FYTextKapitolyNahled new." +
	"\n\teditorKapitoly " +
	"\n\t\taddDependent: nahledKapitoly." +
	"\n\t^ ExtPanel new" +
	"\n\t\twithCardLayout;" +
	"\n\t\tborder: true;" +
	"\n\t\tadd: ExtContainer new;" +
	"\n\t\tadd: editorPopisu;" +
	"\n\t\tadd: editorKapitoly;" +
	"\n\t\tadd: nahledKapitoly;" +
	"\n\t\tactiveItem: 1",
	null, "2013-05-14T08:37:43Z", "mp", 1);

jst.FYMetodikaSOEditor.addMethod("editorObsahu", "", "private", 
	"\teditorPopisu := FYMetodikaSOPopisEditor data: data." +
	"\n\teditorKapitoly := FYTextKapitolyEditor new osnova: data." +
	"\n\tnahledKapitoly := FYTextKapitolyNahled new." +
	"\n\teditorKapitoly " +
	"\n\t\taddDependent: nahledKapitoly." +
	"\n\t^ ExtPanel new" +
	"\n\t\twithCardLayout;" +
	"\n\t\tborder: true;" +
	"\n\t\tadd: ExtContainer new;" +
	"\n\t\tadd: editorPopisu;" +
	"\n\t\tadd: editorKapitoly;" +
	"\n\t\tadd: nahledKapitoly;" +
	"\n\t\tactiveItem: 1",
	null, "2014-03-01T17:09:00Z", "mp", 2);

jst.FYMetodikaSOEditor.addMethod("editorObsahu", "", "private", 
	"\teditorPopisu := FYMetodikaSOPopisEditor data: data." +
	"\n\teditorKapitoly := FYTextKapitolyEditor new osnova: data." +
	"\n\tnahledKapitoly := FYTextKapitolyNahled new." +
	"\n\teditorPopisu" +
	"\n\t\taddDependent: nahledKapitoly;" +
	"\n\t\taddDependent: self." +
	"\n\teditorKapitoly " +
	"\n\t\taddDependent: nahledKapitoly;" +
	"\n\t\taddDependent: self." +
	"\n\t^ ExtPanel new" +
	"\n\t\twithCardLayout;" +
	"\n\t\tborder: true;" +
	"\n\t\tadd: ExtContainer new;" +
	"\n\t\tadd: editorPopisu;" +
	"\n\t\tadd: editorKapitoly;" +
	"\n\t\tadd: nahledKapitoly;" +
	"\n\t\tactiveItem: 1",
	null, "2014-03-11T14:28:45Z", "mp"); //fytoportal-ior-edit

/*
jst.FYMetodikaSOEditor.addMethod("initDependents", "", "initialization", 
	"\tmasterNavig " +
	"\n\t\taddDependent: self." +
	"\n\tdetailNavig" +
	"\n\t\taddDependent: self",
	null, "2013-01-19T20:35:40Z", "mp");
*/

jst.FYMetodikaSOEditor.addMethod("metodikyRoot", "", "private", 
	"\t| root |" +
	"\n\t(root := ExtTreeNode new) children" +
	"\n\t\tadd: (ExtTreeNode new" +
	"\n\t\t\tid: typ name;" +
	"\n\t\t\ttext: '(nová metodika)';" +
	"\n\t\t\tlink: typ novyTaxon;" +
	"\n\t\t\tleaf: true);" +
	"\n\t\taddAll: ((Fytoportal data metodiky metodikySO: data) collect: [:dict |" +
	"\n\t\t\tExtTreeNode new" +
	"\n\t\t\t\tid: (dict at: #id);" +
	"\n\t\t\t\ttext: (dict at: #key);" +
	"\n\t\t\t\tlink: ((dict at: #value) ifNotNilDo: [:d | d at: #taxon ifAbsent: [typ novyTaxon]]);" +
	"\n\t\t\t\tleaf: true])." +
	"\n\t^ root",
	null, "2013-01-25T13:22:28Z", "mp", 1);

jst.FYMetodikaSOEditor.addMethod("metodikyRoot", "", "private", 
	"\t| root |" +
	"\n\t(root := ExtTreeNode new) children" +
	"\n\t\tadd: (ExtTreeNode new" +
	"\n\t\t\tid: typ name;" +
	"\n\t\t\ttext: '(nová metodika)';" +
	"\n\t\t\tlink: typ novaMetodika;" +
	"\n\t\t\tleaf: true);" +
	"\n\t\taddAll: ((Fytoportal data metodiky metodikySO: data) collect: [:dict |" +
	"\n\t\t\tExtTreeNode new" +
	"\n\t\t\t\tid: (dict at: #id);" +
	"\n\t\t\t\ttext: (dict at: #key);" +
	"\n\t\t\t\tleaf: true])." +
	"\n\t^ root",
	null, "2014-03-03T08:52:40Z", "mp"); //fytoportal-ior-edit

jst.FYMetodikaSOEditor.addMethod("installListeners", "", "initialization", 
	"\tsuper installListeners." +
	"\n\t(Fytoportal navigator ior editaceMetodik: data)" +
	"\n\t\tcomponent: masterNavig;" +
	"\n\t\tinstallStandardTreeListeners;" +
	"\n\t\tonEnter: [:path :node |" +
	"\n\t\t\teditorKapitoly schovejZmeny." +
	"\n\t\t\teditorPopisu metodika: node." +
	"\n\t\t\tdetailNavig isDisabled: node id = typ name]." +
	"\n\t(Fytoportal navigator ior editaceMetodik: data) exits first" +
	"\n\t\tcomponent: detailNavig;" +
	"\n\t\tinstallStandardTreeListenersWith: [:n | true];" +
	"\n\t\tonEnter: [:path :node | " +
	"\n\t\t\teditorPopisu schovejZmeny." +
	"\n\t\t\tnode id = #preview " +
	"\n\t\t\t\tifFalse: [path label: node link printPath. " +
	"\n\t\t\t\t\teditorKapitoly " +
	"\n\t\t\t\t\t\teditujKapitolu: node link id metodiky: self metodika;" +
	"\n\t\t\t\t\t\tactivate]" +
	"\n\t\t\t\tifTrue: [path label: nil." +
	"\n\t\t\t\t\teditorKapitoly schovejZmeny." +
	"\n\t\t\t\t\tnahledKapitoly " +
	"\n\t\t\t\t\t\tnactiKapitolu: self metodika; " +
	"\n\t\t\t\t\t\tactivate]" +
	"\n\t\t]",
	null, "2013-02-05T22:25:48Z", "mp", 1);

jst.FYMetodikaSOEditor.addMethod("installListeners", "", "initialization", 
	"\tsuper installListeners." +
	"\n\t(Fytoportal navigator ior editaceMetodik: data)" +
	"\n\t\tcomponent: masterNavig;" +
	"\n\t\tinstallStandardTreeListeners;" +
	"\n\t\tonEnter: [:path :node |" +
	"\n\t\t\teditorKapitoly schovejZmeny." +
	"\n\t\t\teditorPopisu metodika: node." +
	"\n\t\t\tdetailNavig isDisabled: node id = typ name];" +
	"\n\t\tonForceStop: [:p :token | " +
	"\n\t\t\t\"aktivuji panel a zavolam standardni akci na komponente\"" +
	"\n\t\t\tself activate." +
	"\n\t\t\tp component forcePathStop: p on: token]." +
	"\n\t(Fytoportal navigator ior editaceMetodik: data) exits first" +
	"\n\t\tcomponent: detailNavig;" +
	"\n\t\tinstallStandardTreeListenersWith: [:n | true];" +
	"\n\t\tonEnter: [:path :node | " +
	"\n\t\t\teditorPopisu schovejZmeny." +
	"\n\t\t\tnode id = #preview " +
	"\n\t\t\t\tifFalse: [path label: node link printPath. " +
	"\n\t\t\t\t\teditorKapitoly " +
	"\n\t\t\t\t\t\teditujKapitolu: node link id metodiky: self metodika;" +
	"\n\t\t\t\t\t\tactivate]" +
	"\n\t\t\t\tifTrue: [path label: nil." +
	"\n\t\t\t\t\teditorKapitoly schovejZmeny." +
	"\n\t\t\t\t\tnahledKapitoly " +
	"\n\t\t\t\t\t\tnactiKapitolu: self metodika; " +
	"\n\t\t\t\t\t\tactivate]" +
	"\n\t\t]",
	null, "2013-08-21T09:31:49Z", "mp", 2);

jst.FYMetodikaSOEditor.addMethod("installListeners", "", "initialization", 
	"\tsuper installListeners." +
	"\n\t(Fytoportal navigator ior editaceMetodik: data)" +
	"\n\t\tcomponent: masterNavig;" +
	"\n\t\tinstallStandardTreeListeners;" +
	"\n\t\tonEnter: [:path :node |" +
	"\n\t\t\teditorKapitoly schovejZmeny." +
	"\n\t\t\teditorPopisu metodika: node." +
	"\n\t\t\tdetailNavig isDisabled: node id = typ name];" +
	"\n\t\tonForceStop: [:p :token | " +
	"\n\t\t\t\"aktivuji panel a zavolam standardni akci na komponente\"" +
	"\n\t\t\tself activate." +
	"\n\t\t\tp component forcePathStop: p on: token]." +
	"\n\t(Fytoportal navigator ior editaceMetodik: data) exits first" +
	"\n\t\tcomponent: detailNavig;" +
	"\n\t\tinstallStandardTreeListenersWith: [:n | true];" +
	"\n\t\tonEnter: [:path :node | " +
	"\n\t\t\teditorPopisu schovejZmeny." +
	"\n\t\t\tnode id = #preview " +
	"\n\t\t\t\tifFalse: [path label: node link printPath. " +
	"\n\t\t\t\t\teditorKapitoly " +
	"\n\t\t\t\t\t\tactivate;" +
	"\n\t\t\t\t\t\teditujKapitolu: node link id metodiky: editorPopisu metodika]" +
	"\n\t\t\t\tifTrue: [path label: nil." +
	"\n\t\t\t\t\teditorKapitoly schovejZmeny." +
	"\n\t\t\t\t\tnahledKapitoly " +
	"\n\t\t\t\t\t\tactivate;" +
	"\n\t\t\t\t\t\tnactiKapitolu: editorPopisu metodika." +
	"\n\t\t\t\t\teditorPopisu oznacZmenenouMetodiku]." +
	"\n\t\t]",
	null, "2014-03-02T22:09:10Z", "mp", 1);

jst.FYMetodikaSOEditor.addMethod("installListeners", "", "initialization", 
	"\tsuper installListeners." +
	"\n\t(Fytoportal navigator ior editaceMetodik: data)" +
	"\n\t\tcomponent: masterNavig;" +
	"\n\t\tinstallStandardTreeListeners;" +
	"\n\t\tonEnter: [:path :node |" +
	"\n\t\t\teditorKapitoly schovejZmeny." +
	"\n\t\t\teditorPopisu metodika: node];" +
	"\n\t\tonForceStop: [:p :token | " +
	"\n\t\t\t\"aktivuji panel a zavolam standardni akci na komponente\"" +
	"\n\t\t\tself activate." +
	"\n\t\t\tp component forcePathStop: p on: token]." +
	"\n\t(Fytoportal navigator ior editaceMetodik: data) exits first" +
	"\n\t\tcomponent: detailNavig;" +
	"\n\t\tinstallStandardTreeListenersWith: [:n | true];" +
	"\n\t\tonEnter: [:path :node | " +
	"\n\t\t\teditorPopisu schovejZmeny." +
	"\n\t\t\tnode id = #preview " +
	"\n\t\t\t\tifFalse: [path label: node link printPath. " +
	"\n\t\t\t\t\teditorKapitoly " +
	"\n\t\t\t\t\t\tactivate;" +
	"\n\t\t\t\t\t\teditujKapitolu: node link id metodiky: editorPopisu metodika]" +
	"\n\t\t\t\tifTrue: [path label: nil." +
	"\n\t\t\t\t\teditorKapitoly schovejZmeny." +
	"\n\t\t\t\t\tnahledKapitoly " +
	"\n\t\t\t\t\t\tactivate;" +
	"\n\t\t\t\t\t\tnactiKapitolu: editorPopisu metodika." +
	"\n\t\t\t\t\teditorPopisu oznacZmenenouMetodiku]." +
	"\n\t\t]",
	null, "2014-03-03T10:58:09Z", "mp", 1);

jst.FYMetodikaSOEditor.addMethod("installListeners", "", "initialization", 
	"\tsuper installListeners." +
	"\n\t(Fytoportal navigator ior editaceMetodik: data)" +
	"\n\t\tcomponent: masterNavig;" +
	"\n\t\tinstallStandardTreeListeners;" +
	"\n\t\tonEnter: [:path :node |" +
	"\n\t\t\teditorKapitoly schovejZmeny." +
	"\n\t\t\teditorPopisu metodika: node];" +
	"\n\t\tonForceStop: [:p :token | " +
	"\n\t\t\t\"aktivuji panel a zavolam standardni akci na komponente\"" +
	"\n\t\t\tself activate." +
	"\n\t\t\tp component forcePathStop: p on: token]." +
	"\n\t(Fytoportal navigator ior editaceMetodik: data) exits first" +
	"\n\t\tcomponent: detailNavig;" +
	"\n\t\tinstallStandardTreeListenersWith: [:n | true];" +
	"\n\t\tonEnter: [:path :node | " +
	"\n\t\t\teditorPopisu schovejZmeny." +
	"\n\t\t\tnode id = #preview " +
	"\n\t\t\t\tifFalse: [path label: node link printPath. " +
	"\n\t\t\t\t\teditorKapitoly " +
	"\n\t\t\t\t\t\tactivate;" +
	"\n\t\t\t\t\t\teditujKapitolu: node link id metodiky: editorPopisu metodika]" +
	"\n\t\t\t\tifTrue: [path label: nil." +
	"\n\t\t\t\t\teditorKapitoly schovejZmeny." +
	"\n\t\t\t\t\tnahledKapitoly " +
	"\n\t\t\t\t\t\tactivate;" +
	"\n\t\t\t\t\t\tnactiKapitolu: editorPopisu metodika]." +
	"\n\t\t]",
	null, "2014-03-11T15:03:25Z", "mp"); //fytoportal-ior-edit

/* nahrazeno volanim editorPopisu metodika
jst.FYMetodikaSOEditor.addMethod("metodika", "", "accessing", 
	"\t| node |" +
	"\n\t((node := masterNavig selectionModel selectedNode) link isString or: [node id ~= node link id]) ifTrue: [ | tax |" +
	"\n\t\t\"link je id taxonu nebo taxon, nahradim jej metodikou SO\"" +
	"\n\t\ttax := node link." +
	"\n\t\t\"v taxonu mohou byt zmeny provedene v editoru popisu, nesmim jej zahodit\"" +
	"\n\t\tnode link: (Fytoportal db loadObject: node id)." +
	"\n\t\ttax ifNotString: [" +
	"\n\t\t\tnode link taxon: tax]" +
	"\n\t]." +
	"\n\t^ node link",
	null, "2013-05-03T14:38:53Z", "mp");

zruseno - metodika ted odkazuje na vice taxonu, viz FYMetodikaSOPopisEditor
jst.FYMetodikaSOEditor.addMethod("zmenaPopisuTaxonu:", "taxon", "updating", 
	"\t\"posila fotogalerie\"" +
	"\n\t(masterNavig root detectChild: [:n | " +
	"\n\t\tn link isString not and: [n link taxonId = taxon id]]) ifNotNilDo: [:n |" +
	"\n\t\t\t\"taxon se nacte, az bude potreba\"" +
	"\n\t\t\tn link: taxon id]",
	null, "2013-05-03T12:33:25Z", "mp");
*/

jst.FYMetodikaSOEditor.addMethod("novaMetodikaSO:", "met", "updating", 
	"\ttyp == met class ifTrue: [" +
	"\n\t\tmasterNavig " +
	"\n\t\t\tclearSelections;" +
	"\n\t\t\troot: self metodikyRoot." +
	"\n\t\t(masterNavig selectNodeBy: [:n | n id = met id] silently: false) ifNotNilDo: [:n |" +
	"\n\t\t\tn link: met]" +
	"\n\t]",
	null, "2013-01-29T15:52:46Z", "mp", 1);

jst.FYMetodikaSOEditor.addMethod("novaMetodikaSO:", "met", "updating", 
	"\ttyp == met class ifTrue: [" +
	"\n\t\tmasterNavig " +
	"\n\t\t\tclearSelections;" +
	"\n\t\t\troot: self metodikyRoot." +
	"\n\t\t(masterNavig detectChild: [:n | n id = met id]) ifNotNilDo: [:n |" +
	"\n\t\t\tn link: met; select]" +
	"\n\t]",
	null, "2014-03-03T09:45:31Z", "mp", 2);

jst.FYMetodikaSOEditor.addMethod("novaMetodikaSO:", "met", "updating", 
	"\ttyp == met class ifTrue: [" +
	"\n\t\tmasterNavig " +
	"\n\t\t\tclearSelections;" +
	"\n\t\t\troot: self metodikyRoot." +
	"\n\t\t(masterNavig root detectChild: [:n | n id = met id]) ifNotNilDo: [:n |" +
	"\n\t\t\tn link: met; select]" +
	"\n\t]",
	null, "2014-03-03T13:34:01Z", "mp"); //fytoportal-ior-edit

/* zruseno, resi se primo v ulozZmeny
jst.FYMetodikaSOEditor.addMethod("zmenaMetodikySO:", "met", "updating", 
	"\ttyp == met class ifTrue: [" +
	"\n\t\t(masterNavig root detectChild: [:n | n id = met id]) ifNotNilDo: [:node |" +
	"\n\t\t\tnode" +
	"\n\t\t\t\ttext: met nazev;" +
	"\n\t\t\t\tlink: met]" +
	"\n\t]",
	null, "2013-01-29T15:59:43Z", "mp", 1);

jst.FYMetodikaSOEditor.addMethod("zmenaMetodikySO:", "met", "updating", 
	"\t\"metodiku jsem editoval v tomto editoru\"" +
	"\n\ttyp == met class ifTrue: [ | m |" +
	"\n\t\t\"aktualizuji odkaz ve stromecku vlevo nahore\"" +
	"\n\t\tmasterNavig selectedNode" +
	"\n\t\t\ttext: m nazev;" +
	"\n\t\t\tlink: m." +
	"\n\t\t\"detailNavig obsahuje pouze osnovu, aktualizace netreba\"" +
	"\n\t\teditorKapitoly zmenMetodikuSO: m." +
	"\n\t\tnahledKapitoly zmenMetodikuSO: m]",
	null, "2013-05-03T10:32:49Z", "mp", 1);

jst.FYMetodikaSOEditor.addMethod("zmenaMetodikySO:", "met", "updating", 
	"\ttyp == met class ifTrue: [" +
	"\n\t\t\"zde pouze aktualizuji odkaz ve stromecku vlevo nahore\"" +
	"\n\t\tmasterNavig selectedNode" +
	"\n\t\t\ttext: met nazev;" +
	"\n\t\t\tlink: met]",
	null, "2013-05-03T12:36:10Z", "mp"); //fytoportal-ior-edit
*/

jst.FYMetodikaSOEditor.addMethod("ulozZmeny", "", "private", 
	"\teditorPopisu schovejZmeny." +
	"\n\teditorKapitoly schovejZmeny." +
	"\n\teditorPopisu isModified " +
	"\n\t\tifTrue: [editorPopisu ulozZmeny]" +
	"\n\t\tifFalse: [self ulozObsah: nil posli: nil]",
	null, "2013-02-18T15:23:31Z", "mp", 1);

jst.FYMetodikaSOEditor.addMethod("ulozZmeny", "", "private", 
	"\teditorPopisu form isValid ifFalse: [ | n |" +
	"\n\t\tn := masterNavig selectionModel selectedNode." +
	"\n\t\tmasterNavig selectionModel " +
	"\n\t\t\tclearSelections;" +
	"\n\t\t\tselectNode: n." +
	"\n\t\t^ self inform: 'Chyba!'->'Doplňte chybějící údaje']." +
	"\n\teditorPopisu schovejZmeny." +
	"\n\teditorKapitoly schovejZmeny." +
	"\n\teditorPopisu isModified " +
	"\n\t\tifTrue: [editorPopisu ulozZmeny]" +
	"\n\t\tifFalse: [self ulozObsah: nil posli: nil]",
	null, "2013-03-04T08:06:19Z", "mp", 2);

jst.FYMetodikaSOEditor.addMethod("ulozZmeny", "", "private", 
	"\t| met ev |" +
	"\n\teditorPopisu schovejZmeny." +
	"\n\teditorKapitoly schovejZmeny." +
	"\n\teditorPopisu validate." +
	"\n\t(met := editorPopisu metodika) jeZmenena ifTrue: [" +
	"\n\t\tmet := met id " +
	"\n\t\t\tifNil: [" +
	"\n\t\t\t\tev := #novaMetodikaSO:. " +
	"\n\t\t\t\ttyp novaMetodika]" +
	"\n\t\t\tifNotNil: [" +
	"\n\t\t\t\tev := #zmenaMetodikySO:." +
	"\n\t\t\t\tFytoportal db loadObject: met id]." +
	"\n\t\tmet zmenPodle: editorPopisu metodika." +
	"\n\t\tFytoportal db storeObject: met." +
	"\n\t\tmet id " +
	"\n\t\t\tifNil: [" +
	"\n\t\t\t\t\"v sablone nove metodiky zahodim zmeny, instanci ponecham\"" +
	"\n\t\t\t\teditorPopisu metodika zahodZmeny]" +
	"\n\t\t\tifNotNil: [" +
	"\n\t\t\t\t\"aktualizuji odkaz ve stromecku hned, editorPopisu odkazuje na metodiku v node\"" +
	"\n\t\t\t\tmasterNavig selectedNode" +
	"\n\t\t\t\t\ttext: met nazev;" +
	"\n\t\t\t\t\tlink: met]." +
	"\n\t\tself broadcastEvent: ev with: met." +
	"\n\t\tself inform: 'Úspěch!' -> 'Provedené změny byly uloženy do databáze.'" +
	"\n\t] ifFalse: [" +
	"\n\t\tself inform: editorPopisu metodika nazev->'Beze změn.']",
	null, "2014-03-03T10:08:33Z", "mp", 3);

jst.FYMetodikaSOEditor.addMethod("ulozZmeny", "", "private", 
	"\t| met ev |" +
	"\n\teditorPopisu schovejZmeny." +
	"\n\teditorKapitoly schovejZmeny." +
	"\n\teditorPopisu isValid ifFalse: [" +
	"\n\t\t^ self]." +
	"\n\t(met := editorPopisu metodika) jeZmenena ifTrue: [" +
	"\n\t\tmet := met id " +
	"\n\t\t\tifNil: [" +
	"\n\t\t\t\tev := #novaMetodikaSO:. " +
	"\n\t\t\t\ttyp novaMetodika]" +
	"\n\t\t\tifNotNil: [" +
	"\n\t\t\t\tev := #zmenaMetodikySO:." +
	"\n\t\t\t\tFytoportal db loadObject: met id]." +
	"\n\t\tmet zmenPodle: editorPopisu metodika." +
	"\n\t\tFytoportal db storeObject: met." +
	"\n\t\teditorPopisu metodika id " +
	"\n\t\t\tifNil: [" +
	"\n\t\t\t\t\"v sablone nove metodiky zahodim zmeny, instanci ponecham\"" +
	"\n\t\t\t\teditorPopisu metodika zahodZmeny." +
	"\n\t\t\t\t\"nasledne vybiram novou metodiku, v editoru se nesmi volat schovejZmeny, nastavim tedy nil\"" +
	"\n\t\t\t\teditorPopisu metodika: nil]" +
	"\n\t\t\tifNotNil: [" +
	"\n\t\t\t\t\"aktualizuji odkaz ve stromecku\"" +
	"\n\t\t\t\tmasterNavig selectedNode" +
	"\n\t\t\t\t\ttext: met nazev;" +
	"\n\t\t\t\t\tlink: met]." +
	"\n\t\tself broadcastEvent: ev with: met." +
	"\n\t\tself inform: 'Úspěch!' -> 'Provedené změny byly uloženy do databáze.'" +
	"\n\t] ifFalse: [" +
	"\n\t\tself inform: editorPopisu metodika nazev->'Beze změn.']",
	null, "2014-03-03T14:22:26Z", "mp"); //fytoportal-ior-edit

/*
jst.FYMetodikaSOEditor.addMethod("obsahZmenen", "", "testing", 
	"\t| node |" +
	"\n\tnode := masterNavig selectionModel selectedNode." +
	"\n\t^ node link isString not and: [node id = node link id] and: [node link jeZmenena]",
	null, "2013-02-18T20:11:17Z", "mp");

jst.FYMetodikaSOEditor.addMethod("ulozObsah:posli:", "met eventName", "private", 
	"\t| jinaMet |" +
	"\n\tjinaMet := met." +
	"\n\tself obsahZmenen ifTrue: [" +
	"\n\t\tjinaMet ifNil: [" +
	"\n\t\t\tjinaMet := Fytoportal db loadObject: masterNavig selectionModel selectedNode id]." +
	"\n\t\tmasterNavig selectionModel selectedNode link kapitoly do: [:kap |" +
	"\n\t\t\tkap obsahZmenen ifTrue: [" +
	"\n\t\t\t\t(jinaMet zmenKapitolu: kap zmeny podle: kap) obsah: kap zmeny]." +
	"\n\t\t]" +
	"\n\t]." +
	"\n\tjinaMet " +
	"\n\t\tifNotNil: [" +
	"\n\t\t\tFytoportal db storeObject: jinaMet." +
	"\n\t\t\tself broadcastEvent: (eventName ifNil: #zmenaMetodikySO:) with: jinaMet." +
	"\n\t\t\tself inform: 'Úspěch!' -> 'Provedené změny byly uloženy do databáze.']" +
	"\n\t\tifNil: [self inform: 'Nebyly zaznamenány žádné změny.']",
	null, "2013-02-19T10:32:10Z", "mp", 1);

jst.FYMetodikaSOEditor.addMethod("ulozObsah:posli:", "met eventName", "private", 
	"\t| jinaMet |" +
	"\n\tjinaMet := met." +
	"\n\tself obsahZmenen ifTrue: [" +
	"\n\t\tjinaMet ifNil: [" +
	"\n\t\t\tjinaMet := Fytoportal db loadObject: masterNavig selectionModel selectedNode id]." +
	"\n\t\tmasterNavig selectionModel selectedNode link kapitoly do: [:kap |" +
	"\n\t\t\tkap obsahZmenen ifTrue: [" +
	"\n\t\t\t\t(jinaMet zmenKapitolu: kap zmeny podle: kap) potvrdZmeny]." +
	"\n\t\t]" +
	"\n\t]." +
	"\n\tjinaMet " +
	"\n\t\tifNotNil: [" +
	"\n\t\t\tFytoportal db storeObject: jinaMet." +
	"\n\t\t\tjinaMet taxon popis. \"nactu popis pred rozeslanim zpravy\"" +
	"\n\t\t\tself broadcastEvent: (eventName ifNil: #zmenaMetodikySO:) with: jinaMet." +
	"\n\t\t\tself inform: 'Úspěch!' -> 'Provedené změny byly uloženy do databáze.']" +
	"\n\t\tifNil: [self inform: masterNavig selectionModel selectedNode text->'Beze změn.']",
	null, "2013-04-27T18:29:04Z", "mp", 1);

jst.FYMetodikaSOEditor.addMethod("ulozObsah:posli:", "met eventName", "private", 
	"\t| jinaMet |" +
	"\n\tjinaMet := met." +
	"\n\tself obsahZmenen ifTrue: [" +
	"\n\t\tjinaMet ifNil: [" +
	"\n\t\t\tjinaMet := Fytoportal db loadObject: masterNavig selectionModel selectedNode id]." +
	"\n\t\tmasterNavig selectionModel selectedNode link kapitoly do: [:kap |" +
	"\n\t\t\tkap obsahZmenen ifTrue: [" +
	"\n\t\t\t\t(jinaMet zmenKapitolu: kap zmeny podle: kap) potvrdZmeny]." +
	"\n\t\t]" +
	"\n\t]." +
	"\n\tjinaMet " +
	"\n\t\tifNotNil: [" +
	"\n\t\t\tFytoportal db storeObject: jinaMet." +
	"\n\t\t\tjinaMet taxon popis. \"nactu popis pred rozeslanim zpravy\"" +
	"\n\t\t\teventName ifNil: [" +
	"\n\t\t\t\tnahledKapitoly resetSemafor]." +
	"\n\t\t\tself broadcastEvent: (eventName ifNil: #zmenaMetodikySO:) with: jinaMet." +
	"\n\t\t\tself inform: 'Úspěch!' -> 'Provedené změny byly uloženy do databáze.']" +
	"\n\t\tifNil: [self inform: masterNavig selectionModel selectedNode text->'Beze změn.']",
	null, "2013-04-29T14:37:55Z", "mp", 1);

jst.FYMetodikaSOEditor.addMethod("ulozObsah:posli:", "met eventName", "private", 
	"\t| jinaMet |" +
	"\n\tjinaMet := met." +
	"\n\tself obsahZmenen ifTrue: [" +
	"\n\t\tjinaMet ifNil: [" +
	"\n\t\t\tjinaMet := Fytoportal db loadObject: masterNavig selectionModel selectedNode id]." +
	"\n\t\tmasterNavig selectionModel selectedNode link kapitoly do: [:kap |" +
	"\n\t\t\tkap obsahZmenen ifTrue: [" +
	"\n\t\t\t\t(jinaMet zmenKapitolu: kap zmeny podle: kap) potvrdZmeny]." +
	"\n\t\t]" +
	"\n\t]." +
	"\n\tjinaMet ifNotNil: [" +
	"\n\t\tFytoportal db storeObject: jinaMet." +
	"\n\t\tjinaMet taxon popis. \"nactu popis pred rozeslanim zpravy\"" +
	"\n\t\teventName ifNil: [" +
	"\n\t\t\t\"zmena metodiky SO\"" +
	"\n\t\t\tnahledKapitoly resetSemafor." +
	"\n\t\t\t\"aktualizuji linky na zmenenou metodiku ve vsech relevantnich PM\"" +
	"\n\t\t\tFytoportal navigator ior metodika component root children do: [:n | " +
	"\n\t\t\t\t(n link notNil and: [n link isString not]) ifTrue: [" +
	"\n\t\t\t\t\tn link zmenMetodikuSO: jinaMet]]" +
	"\n\t\t]." +
	"\n\t\tself broadcastEvent: (eventName ifNil: #zmenaMetodikySO:) with: jinaMet." +
	"\n\t\tself inform: 'Úspěch!' -> 'Provedené změny byly uloženy do databáze.'" +
	"\n\t] ifNil: [" +
	"\n\t\tself inform: masterNavig selectionModel selectedNode text->'Beze změn.']",
	null, "2013-05-04T14:10:28Z", "mp", 1);

jst.FYMetodikaSOEditor.addMethod("ulozObsah:posli:", "met eventName", "private", 
	"\t| jinaMet |" +
	"\n\tjinaMet := met." +
	"\n\tself obsahZmenen ifTrue: [" +
	"\n\t\tjinaMet ifNil: [" +
	"\n\t\t\tjinaMet := Fytoportal db loadObject: masterNavig selectionModel selectedNode id]." +
	"\n\t\tjinaMet zmenPodle: masterNavig selectionModel selectedNode link]." +
	"\n\tjinaMet ifNotNil: [" +
	"\n\t\tFytoportal db storeObject: jinaMet." +
	"\n\t\tjinaMet taxon popis. \"nactu popis pred rozeslanim zpravy\"" +
	"\n\t\teventName ifNil: [" +
	"\n\t\t\t\"zmena metodiky SO\"" +
	"\n\t\t\tnahledKapitoly resetSemafor." +
	"\n\t\t\t\"aktualizuji linky na zmenenou metodiku ve vsech relevantnich PM\"" +
	"\n\t\t\tFytoportal navigator ior metodika component root children do: [:n | " +
	"\n\t\t\t\t(n link notNil and: [n link isString not]) ifTrue: [" +
	"\n\t\t\t\t\tn link zmenMetodikuSO: jinaMet]]" +
	"\n\t\t]." +
	"\n\t\tself broadcastEvent: (eventName ifNil: #zmenaMetodikySO:) with: jinaMet." +
	"\n\t\tself inform: 'Úspěch!' -> 'Provedené změny byly uloženy do databáze.'" +
	"\n\t] ifNil: [" +
	"\n\t\tself inform: masterNavig selectionModel selectedNode text->'Beze změn.']",
	null, "2013-11-10T22:13:27Z", "mp"); //fytoportal-ior-edit
*/

jst.FYMetodikaSOEditor.addMethod("zahodZmeny", "", "private", 
	"\teditorPopisu isActive ifTrue: [" +
	"\n\t\t^ editorPopisu zahodZmeny]." +
	"\n\teditorKapitoly isActive ifTrue: [" +
	"\n\t\t^ editorKapitoly zahodZmeny]." +
	"\n\t(nahledKapitoly isActive and: [self obsahZmenen]) ifTrue: [" +
	"\n\t\t\"zahodim vsechny zmeny kapitol\"" +
	"\n\t\tmasterNavig selectionModel selectedNode link kapitoly do: [:kap |" +
	"\n\t\t\tkap zmeny: nil]." +
	"\n\t\tnahledKapitoly refreshContent]",
	null, "2013-02-18T17:17:00Z", "mp", 1);

jst.FYMetodikaSOEditor.addMethod("zahodZmeny", "", "private", 
	"\tself obsahZmenen " +
	"\n\t\tifFalse: [(obsah activeItem respondsTo: #zahodZmeny) " +
	"\n\t\t\tifTrue: [obsah activeItem zahodZmeny]" +
	"\n\t\t\tifFalse: [self inform: 'Beze změn']]" +
	"\n\t\tifTrue: [UIManager default confirm: 'Všechny změny v metodice budou ztraceny. Pokračovat?' thenDo: [" +
	"\n\t\t\t\"zahodim vsechny zmeny kapitol\"" +
	"\n\t\t\tmasterNavig selectionModel selectedNode link kapitoly do: [:kap |" +
	"\n\t\t\t\tkap zmeny: nil]." +
	"\n\t\t\teditorPopisu zahodZmeny." +
	"\n\t\t\teditorKapitoly isActive ifTrue: [" +
	"\n\t\t\t\teditorKapitoly resetEditor]." +
	"\n\t\t\tnahledKapitoly isActive ifTrue: [" +
	"\n\t\t\t\tnahledKapitoly refreshContent]" +
	"\n\t\t]]",
	null, "2013-03-03T23:03:03Z", "mp", 1);

jst.FYMetodikaSOEditor.addMethod("zahodZmeny", "", "private", 
	"\tself obsahZmenen " +
	"\n\t\tifFalse: [((obsah activeItem respondsTo: #isModified) and: [obsah activeItem isModified]) " +
	"\n\t\t\tifTrue: [obsah activeItem zahodZmeny]" +
	"\n\t\t\tifFalse: [self inform: masterNavig selectionModel selectedNode text->'Beze změn']]" +
	"\n\t\tifTrue: [UIManager default confirm: 'Všechny změny v metodice budou ztraceny. Pokračovat?' thenDo: [" +
	"\n\t\t\t\"zahodim vsechny zmeny kapitol\"" +
	"\n\t\t\tmasterNavig selectionModel selectedNode link kapitoly do: [:kap |" +
	"\n\t\t\t\tkap zmeny: nil]." +
	"\n\t\t\teditorPopisu zahodZmeny." +
	"\n\t\t\teditorKapitoly isActive ifTrue: [" +
	"\n\t\t\t\teditorKapitoly resetEditor]." +
	"\n\t\t\tnahledKapitoly isActive ifTrue: [" +
	"\n\t\t\t\tnahledKapitoly refreshContent]" +
	"\n\t\t]]",
	null, "2013-03-04T07:47:28Z", "mp", 1);

jst.FYMetodikaSOEditor.addMethod("zahodZmeny", "", "private", 
	"\tself obsahZmenen " +
	"\n\t\tifFalse: [((obsah activeItem respondsTo: #isModified) and: [obsah activeItem isModified]) " +
	"\n\t\t\tifTrue: [obsah activeItem zahodZmeny]" +
	"\n\t\t\tifFalse: [self inform: masterNavig selectionModel selectedNode text->'Beze změn']]" +
	"\n\t\tifTrue: [UIManager default confirm: 'Všechny změny v metodice budou ztraceny. Pokračovat?' thenDo: [" +
	"\n\t\t\t\"zahodim vsechny zmeny kapitol\"" +
	"\n\t\t\tmasterNavig selectionModel selectedNode link kapitoly do: [:kap |" +
	"\n\t\t\t\tkap zmeny: nil]." +
	"\n\t\t\teditorPopisu zahodZmeny." +
	"\n\t\t\teditorKapitoly isActive ifTrue: [" +
	"\n\t\t\t\teditorKapitoly resetEditor]." +
	"\n\t\t\tnahledKapitoly resetContent" +
	"\n\t\t]]",
	null, "2013-04-28T13:56:59Z", "mp", 1);

jst.FYMetodikaSOEditor.addMethod("zahodZmeny", "", "private", 
	"\tself obsahZmenen " +
	"\n\t\tifFalse: [((obsah activeItem respondsTo: #isModified) and: [obsah activeItem isModified]) " +
	"\n\t\t\tifTrue: [obsah activeItem zahodZmeny]" +
	"\n\t\t\tifFalse: [self inform: masterNavig selectionModel selectedNode text->'Beze změn']]" +
	"\n\t\tifTrue: [UIManager default confirm: 'Všechny změny v metodice budou ztraceny. Pokračovat?' thenDo: [" +
	"\n\t\t\t\"zahodim vsechny zmeny kapitol\"" +
	"\n\t\t\tmasterNavig selectionModel selectedNode link kapitoly do: [:kap |" +
	"\n\t\t\t\tkap zmeny: nil]." +
	"\n\t\t\teditorPopisu zahodZmeny." +
	"\n\t\t\teditorKapitoly isActive ifTrue: [" +
	"\n\t\t\t\teditorKapitoly resetEditor]." +
	"\n\t\t\tnahledKapitoly " +
	"\n\t\t\t\tresetSemafor; " +
	"\n\t\t\t\tresetContent" +
	"\n\t\t]]",
	null, "2013-04-29T14:33:46Z", "mp", 1);

jst.FYMetodikaSOEditor.addMethod("zahodZmeny", "", "private", 
	"\tself obsahZmenen " +
	"\n\t\tifFalse: [((obsah activeItem respondsTo: #isModified) and: [obsah activeItem isModified]) " +
	"\n\t\t\tifTrue: [obsah activeItem zahodZmeny]" +
	"\n\t\t\tifFalse: [self inform: masterNavig selectionModel selectedNode text->'Beze změn']]" +
	"\n\t\tifTrue: [UIManager default confirm: 'Všechny změny v metodice budou ztraceny. Pokračovat?' thenDo: [" +
	"\n\t\t\t\"zahodim vsechny zmeny kapitol\"" +
	"\n\t\t\tmasterNavig selectionModel selectedNode link zahodZmeny." +
	"\n\t\t\teditorPopisu zahodZmeny." +
	"\n\t\t\teditorKapitoly isActive ifTrue: [" +
	"\n\t\t\t\teditorKapitoly resetEditor]." +
	"\n\t\t\tnahledKapitoly " +
	"\n\t\t\t\tresetSemafor; " +
	"\n\t\t\t\tresetContent" +
	"\n\t\t]]",
	null, "2013-11-08T10:51:49Z", "mp", 1);

jst.FYMetodikaSOEditor.addMethod("zahodZmeny", "", "private", 
	"\tself obsahZmenen " +
	"\n\t\tifFalse: [((obsah activeItem respondsTo: #isModified) and: [obsah activeItem isModified]) " +
	"\n\t\t\tifTrue: [obsah activeItem zahodZmeny]" +
	"\n\t\t\tifFalse: [self inform: masterNavig selectionModel selectedNode text->'Beze změn']]" +
	"\n\t\tifTrue: [UIManager default confirm: 'Všechny změny v metodice budou ztraceny. Pokračovat?' thenDo: [" +
	"\n\t\t\t\"zahodim vsechny zmeny kapitol\"" +
	"\n\t\t\tmasterNavig selectionModel selectedNode link zahodZmeny." +
	"\n\t\t\teditorPopisu zahodZmeny." +
	"\n\t\t\teditorKapitoly isActive ifTrue: [" +
	"\n\t\t\t\teditorKapitoly resetEditor]." +
	"\n\t\t\tnahledKapitoly resetSemafor" +
	"\n\t\t]]",
	null, "2013-12-18T20:02:46Z", "mp", 1);

jst.FYMetodikaSOEditor.addMethod("zahodZmeny", "", "private", 
	"\teditorPopisu metodika jeZmenena" +
	"\n\t\tifFalse: [((obsah activeItem respondsTo: #isModified) and: [obsah activeItem isModified]) " +
	"\n\t\t\tifTrue: [obsah activeItem zahodZmeny]" +
	"\n\t\t\tifFalse: [self inform: masterNavig selectionModel selectedNode text->'Beze změn']]" +
	"\n\t\tifTrue: [UIManager default confirm: 'Všechny změny v metodice budou ztraceny. Pokračovat?' thenDo: [" +
	"\n\t\t\t\"zahodim vsechny zmeny kapitol\"" +
	"\n\t\t\teditorPopisu zahodZmeny." +
	"\n\t\t\teditorKapitoly isActive ifTrue: [" +
	"\n\t\t\t\teditorKapitoly resetEditor]." +
	"\n\t\t\tnahledKapitoly resetSemafor" +
	"\n\t\t]]",
	null, "2014-03-03T08:43:05Z", "mp", 1);

jst.FYMetodikaSOEditor.addMethod("zahodZmeny", "", "private", 
	"\teditorPopisu metodika jeZmenena" +
	"\n\t\tifFalse: [((obsah activeItem respondsTo: #isModified) and: [obsah activeItem isModified]) " +
	"\n\t\t\tifTrue: [obsah activeItem zahodZmeny]" +
	"\n\t\t\tifFalse: [self inform: masterNavig selectionModel selectedNode text->'Beze změn']]" +
	"\n\t\tifTrue: [UIManager default confirm: 'Všechny změny v metodice budou ztraceny. Pokračovat?' thenDo: [" +
	"\n\t\t\t\"zahodim vsechny zmeny kapitol\"" +
	"\n\t\t\teditorPopisu zahodZmeny." +
	"\n\t\t\teditorKapitoly isActive ifTrue: [" +
	"\n\t\t\t\teditorKapitoly resetEditor]" +
	"\n\t\t]]",
	null, "2014-03-11T15:37:12Z", "mp"); //fytoportal-ior-edit

jst.FYMetodikaSOEditor.addMethod("zmenaKapitoly:", "kap", "updating", 
	"\t| node met empty |" +
	"\n\t\"posílá editor popisu nebo editor textu kapitoly\"" +
	"\n\tmet := kap metodika." +
	"\n\tmet id ifNil: [" +
	"\n\t\tnode := masterNavig root children first." +
	"\n\t\tempty := '(nová metodika)'" +
	"\n\t] ifNotNil: [" +
	"\n\t\tnode := masterNavig selectedNode." +
	"\n\t\tmet id = node id ifFalse: [ | metId |" +
	"\n\t\t\t\"kdyz prekliknu na jiny uzel, musim metodiku dohledat\"" +
	"\n\t\t\tnode := masterNavig root detectChild: [:ch | ch id = met id]]." +
	"\n\t\tempty := '(doplňte název)'" +
	"\n\t]." +
	"\n\tnode text: met nazev." +
	"\n\tnode text isEmptyOrNil ifTrue: [" +
	"\n\t\tnode text: empty]." +
	"\n\tmet jeZmenena ifTrue: [" +
	"\n\t\tnode text: node text, '*']",
	null, "2014-03-11T15:22:33Z", "mp"); //fytoportal-ior-edit

jst.FYMetodikaSOEditor.addMethod("zmenaFotkyKapitoly:", "kap", "updating", 
	"\t\"zmenil jsem fotku metodiky SO\"" +
	"\n\teditorPopisu metodika == kap ifTrue: [" +
	"\n\t\tself zmenaKapitoly: kap]",
	null, "2014-03-14T11:25:16Z", "mp");

//*** FYKapitolaSOEditPanel ***

/*
jst.FYKapitolaSOEditPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\trootVisible: true",
	null, "2013-01-29T08:36:23Z", "mp");

jst.FYKapitolaSOEditPanel.addMethod("jinaKapitola", "", "private", 
	"\t^ super jinaKapitola" +
	"\n\t\ttext: '(náhled textu metodiky)';" +
	"\n\t\tid: #preview",
	null, "2013-01-29T09:40:56Z", "mp");
*/

jst.FYKapitolaSOEditPanel.addMethod("createDefaultNode", "", "private", 
	"\t^ ExtTreeNode new " +
	"\n\t\ttext: '(náhled textu metodiky)';" +
	"\n\t\tid: #preview",
	null, "2013-02-19T20:39:41Z", "mp", 1);

jst.FYKapitolaSOEditPanel.addMethod("createDefaultNode", "", "private", 
	"\t^ ExtTreeNode new " +
	"\n\t\ttext: '(náhled textu metodiky)';" +
	"\n\t\tcls: #nahledMetodikySO;" +
	"\n\t\tid: #preview",
	null, "2014-05-21T09:28:42Z", "mp"); //fytoportal-ior-edit

jst.FYKapitolaSOEditPanel.addMethod("kapitola:", "kapId", "accessing", 
	"\tkapitola ifNil: [" +
	"\n\t\t\"zobrazim osnovu kapitoly, pouze poprve\"" +
	"\n\t\tsuper kapitola: (Fytoportal data osnovaMetodikyKapitoly: kapId)." +
	"\n\t\tkapitola nazev: '']",
	null, "2013-02-21T23:10:48Z", "mp"); //fytoportal-ior-edit

/*
jst.FYKapitolaSOEditPanel.addMethod("kapitola", "", "accessing", 
	"\t^ kapitola",
	null, "2013-01-14T20:33:07Z", "mp");

jst.FYKapitolaSOEditPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #metodika ifTrue: [" +
	"\n\t\tmetodika := anObject link]",
	null, "2013-01-14T20:22:37Z", "mp");
*/

//*** FYTextKapitolyEditor ***

jst.FYTextKapitolyEditor.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\tborder: false;" +
	"\n\t\twithFitLayout;" +
	"\n\t\tadd: (editor := ExtHtmlEditor new " +
	"\n\t\t\tname: 'text'; " +
	"\n\t\t\thideLabel: true; " +
	"\n\t\t\tenableFont: false;" +
	"\n\t\t\tenableFontSize: false);" +
	"\n\t\tbuttonAlign: #left;" +
	"\n\t\tbuttons: {" +
	"\n\t\t\tExtButton new text: 'Uložit změny'; formBind: true; on: #click do: [self ulozZmeny]. " +
	"\n\t\t\tExtButton new text: 'Zahodit změny'; on: #click do: [self zahodZmeny]}",
	null, "2013-01-28T15:39:05Z", "mp", 1);

jst.FYTextKapitolyEditor.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\tborder: false;" +
	"\n\t\twithCenterLayout;" +
	"\n\t\tadd: (editor := ExtHtmlEditor new " +
	"\n\t\t\tname: 'text'; " +
	"\n\t\t\thideLabel: true; " +
	"\n\t\t\tenableFont: false;" +
	"\n\t\t\tenableFontSize: false;" +
	"\n\t\t\twidth: 700; " +
	"\n\t\t\theight: 500; " +
	"\n\t\t\ty: 0)",
	null, "2013-02-17T22:57:11Z", "mp", 1);

jst.FYTextKapitolyEditor.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\twithCenterLayout;" +
	"\n\t\tadd: (ExtFormPanel new" +
	"\n\t\t\twidth: 700; " +
	"\n\t\t\theight: 550;" +
	"\n\t\t\tadd: (info := ExtDisplayField new " +
	"\n\t\t\t\tfieldLabel: 'Poznámka';" +
	"\n\t\t\t\tanchor: '100%');" +
	"\n\t\t\tadd: (editor := ExtHtmlEditor new " +
	"\n\t\t\t\tanchor: '100%';" +
	"\n\t\t\t\tname: 'text'; " +
	"\n\t\t\t\thideLabel: true; " +
	"\n\t\t\t\tenableFont: false;" +
	"\n\t\t\t\tenableFontSize: false);" +
	"\n\t\t\tyourself)",
	null, "2013-02-19T13:19:31Z", "mp", 1);

jst.FYTextKapitolyEditor.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\twithCenterLayout;" +
	"\n\t\tadd: (ExtContainer new" +
	"\n\t\t\twidth: 700; " +
	"\n\t\t\theight: 550;" +
	"\n\t\t\twithBorderLayout;" +
	"\n\t\t\tadd: (ExtFormPanel new" +
	"\n\t\t\t\tregion: #south;" +
	"\n\t\t\t\tadd: (info := ExtDisplayField new fieldLabel: 'Poznámky k editaci');" +
	"\n\t\t\t\theight: 50);" +
	"\n\t\t\tadd: (editor := ExtHtmlEditor new " +
	"\n\t\t\t\tregion: #center;" +
	"\n\t\t\t\tname: 'text'; " +
	"\n\t\t\t\thideLabel: true; " +
	"\n\t\t\t\tenableFont: false;" +
	"\n\t\t\t\tenableFontSize: false);" +
	"\n\t\t\tyourself)",
	null, "2013-02-19T14:46:07Z", "mp", 1);

jst.FYTextKapitolyEditor.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\twithCenterLayout;" +
	"\n\t\tadd: (ExtContainer new" +
	"\n\t\t\ty: 25;" +
	"\n\t\t\twidth: 700; " +
	"\n\t\t\theight: 550;" +
	"\n\t\t\twithBorderLayout;" +
	"\n\t\t\tadd: (ExtFormPanel new" +
	"\n\t\t\t\tregion: #south;" +
	"\n\t\t\t\tlabelWidth: 65;" +
	"\n\t\t\t\tadd: (info := ExtDisplayField new " +
	"\n\t\t\t\t\tfieldLabel: 'Poznámky'; " +
	"\n\t\t\t\t\tlabelStyle: 'font-weight:bold;');" +
	"\n\t\t\t\theight: 50);" +
	"\n\t\t\tadd: (editor := ExtHtmlEditor new " +
	"\n\t\t\t\tregion: #center;" +
	"\n\t\t\t\tname: 'text'; " +
	"\n\t\t\t\thideLabel: true; " +
	"\n\t\t\t\tenableFont: false;" +
	"\n\t\t\t\tenableFontSize: false;" +
	"\n\t\t\t\ton: #afterrender do: [editor toolbar " +
	"\n\t\t\t\t\taddSeparator; " +
	"\n\t\t\t\t\tadd: (ExtButton new text: 'Zahodit změny'; cls: 'html-editor-btn'; " +
	"\n\t\t\t\t\t\ton: #click do: [self zahodZmeny])]);" +
	"\n\t\t\tyourself)",
	null, "2013-03-03T21:59:23Z", "mp", 1);

jst.FYTextKapitolyEditor.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\twithCenterLayout;" +
	"\n\t\tadd: (ExtContainer new" +
	"\n\t\t\ty: 25;" +
	"\n\t\t\twidth: 700; " +
	"\n\t\t\theight: 550;" +
	"\n\t\t\twithBorderLayout;" +
	"\n\t\t\tadd: (title := ExtBoxComponent new" +
	"\n\t\t\t\tregion: #north;" +
	"\n\t\t\t\tstyle: 'font-size: 120%';" +
	"\n\t\t\t\theight: 20);" +
	"\n\t\t\tadd: (ExtFormPanel new" +
	"\n\t\t\t\tregion: #south;" +
	"\n\t\t\t\tlabelWidth: 65;" +
	"\n\t\t\t\tadd: (info := ExtDisplayField new " +
	"\n\t\t\t\t\tfieldLabel: 'Poznámky'; " +
	"\n\t\t\t\t\tlabelStyle: 'font-weight:bold;');" +
	"\n\t\t\t\theight: 50);" +
	"\n\t\t\tadd: (editor := ExtHtmlEditor new " +
	"\n\t\t\t\tregion: #center;" +
	"\n\t\t\t\tname: 'text'; " +
	"\n\t\t\t\thideLabel: true; " +
	"\n\t\t\t\tenableFont: false;" +
	"\n\t\t\t\tenableFontSize: false;" +
	"\n\t\t\t\ton: #afterrender do: [editor toolbar " +
	"\n\t\t\t\t\taddSeparator; " +
	"\n\t\t\t\t\tadd: (ExtButton new text: 'Zahodit změny'; cls: 'html-editor-btn'; " +
	"\n\t\t\t\t\t\ton: #click do: [self zahodZmeny])]);" +
	"\n\t\t\tyourself)",
	null, "2013-04-02T14:51:48Z", "mp", 1);

jst.FYTextKapitolyEditor.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\twithCenterLayout;" +
	"\n\t\tadd: (ExtContainer new" +
	"\n\t\t\ty: 25;" +
	"\n\t\t\twidth: 700; " +
	"\n\t\t\theight: 550;" +
	"\n\t\t\twithBorderLayout;" +
	"\n\t\t\tadd: (title := ExtBoxComponent new" +
	"\n\t\t\t\tregion: #north;" +
	"\n\t\t\t\tstyle: 'font-size: 120%';" +
	"\n\t\t\t\theight: 20);" +
	"\n\t\t\tadd: (ExtFormPanel new" +
	"\n\t\t\t\tregion: #south;" +
	"\n\t\t\t\tlabelWidth: 65;" +
	"\n\t\t\t\tadd: (info := ExtDisplayField new " +
	"\n\t\t\t\t\tfieldLabel: 'Poznámky'; " +
	"\n\t\t\t\t\tlabelStyle: 'font-weight:bold;');" +
	"\n\t\t\t\theight: 50);" +
	"\n\t\t\tadd: (editor := ExtHtmlEditor new " +
	"\n\t\t\t\tregion: #center;" +
	"\n\t\t\t\tname: 'text'; " +
	"\n\t\t\t\thideLabel: true; " +
	"\n\t\t\t\tenableFont: false;" +
	"\n\t\t\t\tenableFontSize: false;" +
	"\n\t\t\t\ton: #afterrender do: [editor toolbar " +
	"\n\t\t\t\t\taddSeparator; " +
	"\n\t\t\t\t\tadd: (ExtButton new " +
	"\n\t\t\t\t\t\ttext: 'Zahodit změny';" +
	"\n\t\t\t\t\t\ticonCls:#'btn-cancel';" +
	"\n\t\t\t\t\t\ton: #click do: [self zahodZmeny])]);" +
	"\n\t\t\tyourself)",
	null, "2013-09-12T20:14:36Z", "mp", 1);

jst.FYTextKapitolyEditor.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\twithCenterLayout;" +
	"\n\t\tcls: 'x-panel-mc kapitola-editor';" +
	"\n\t\tadd: (ExtContainer new" +
	"\n\t\t\ty: 25;" +
	"\n\t\t\twidth: 700; " +
	"\n\t\t\theight: 550;" +
	"\n\t\t\twithBorderLayout;" +
	"\n\t\t\tadd: (title := ExtBoxComponent new" +
	"\n\t\t\t\tregion: #north;" +
	"\n\t\t\t\tstyle: 'font-size: 120%;';" +
	"\n\t\t\t\theight: 20);" +
	"\n\t\t\tadd: (ExtFormPanel new" +
	"\n\t\t\t\tregion: #south;" +
	"\n\t\t\t\tlabelWidth: 65;" +
	"\n\t\t\t\tadd: (info := ExtDisplayField new " +
	"\n\t\t\t\t\tfieldLabel: 'Poznámky'; " +
	"\n\t\t\t\t\tlabelStyle: 'font-weight: bold;');" +
	"\n\t\t\t\theight: 50);" +
	"\n\t\t\tadd: (editor := ExtHtmlEditor new " +
	"\n\t\t\t\tregion: #center;" +
	"\n\t\t\t\tname: 'text'; " +
	"\n\t\t\t\thideLabel: true; " +
	"\n\t\t\t\tenableFont: false;" +
	"\n\t\t\t\tenableFontSize: false;" +
	"\n\t\t\t\ton: #afterrender do: [editor toolbar " +
	"\n\t\t\t\t\taddSeparator; " +
	"\n\t\t\t\t\tadd: (ExtButton new " +
	"\n\t\t\t\t\t\ttext: 'Zahodit změny';" +
	"\n\t\t\t\t\t\ticonCls:#'btn-cancel';" +
	"\n\t\t\t\t\t\ton: #click do: [self zahodZmeny])]);" +
	"\n\t\t\tyourself)",
	null, "2014-03-03T20:39:56Z", "mp", 1);

jst.FYTextKapitolyEditor.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\twithCenterLayout;" +
	"\n\t\tcls: 'x-panel-mc kapitola-editor';" +
	"\n\t\tadd: (ExtContainer new" +
	"\n\t\t\ty: 25;" +
	"\n\t\t\twidth: 700; " +
	"\n\t\t\theight: 550;" +
	"\n\t\t\twithBorderLayout;" +
	"\n\t\t\tadd: (title := ExtBoxComponent new" +
	"\n\t\t\t\tregion: #north;" +
	"\n\t\t\t\tstyle: 'font-size: 120%;';" +
	"\n\t\t\t\theight: 20);" +
	"\n\t\t\tadd: (ExtFormPanel new" +
	"\n\t\t\t\tregion: #south;" +
	"\n\t\t\t\tlabelWidth: 65;" +
	"\n\t\t\t\tadd: (info := ExtDisplayField new " +
	"\n\t\t\t\t\tfieldLabel: 'Poznámky'; " +
	"\n\t\t\t\t\tlabelStyle: 'font-weight: bold;');" +
	"\n\t\t\t\theight: 50);" +
	"\n\t\t\tadd: (editor := ExtHtmlEditor new " +
	"\n\t\t\t\tregion: #center;" +
	"\n\t\t\t\tname: 'text'; " +
	"\n\t\t\t\thideLabel: true; " +
	"\n\t\t\t\tenableFont: false;" +
	"\n\t\t\t\tenableFontSize: false;" +
	"\n\t\t\t\ton: #afterrender do: [editor toolbar " +
	"\n\t\t\t\t\taddSeparator; " +
	"\n\t\t\t\t\tadd: (ExtButton new " +
	"\n\t\t\t\t\t\ttooltip: 'Vložit tabulku';" +
	"\n\t\t\t\t\t\ticonCls:#'btn-table-edit';" +
	"\n\t\t\t\t\t\ttext: 'Tabulka';" +
	"\n\t\t\t\t\t\ton: #click do: [self vlozTabulku]);" +
	"\n\t\t\t\t\taddSeparator; " +
	"\n\t\t\t\t\tadd: (ExtButton new " +
	"\n\t\t\t\t\t\ttext: 'Zahodit změny';" +
	"\n\t\t\t\t\t\ticonCls:#'btn-cancel';" +
	"\n\t\t\t\t\t\ton: #click do: [self zahodZmeny])]);" +
	"\n\t\t\tyourself)",
	null, "2014-04-30T08:11:01Z", "mp"); //fytoportal-ior-edit

jst.FYTextKapitolyEditor.addMethod("vlozTabulku", "", "private", 
	"\t| win cols rows validate |" +
	"\n\tvalidate := [:num :max :txt | (num > 0 and: [num <= max]) " +
	"\n\t\tifTrue: [true] " +
	"\n\t\tifFalse: ('Počet {1} musí být v rozmezí 1 až {2}' format: {txt. max})]." +
	"\n\twin := ExtWindow new" +
	"\n\t\ttitle: 'Vložit tabulku';" +
	"\n\t\twidth: 340;" +
	"\n\t\theight: 140;" +
	"\n\t\tresizable: false;" +
	"\n\t\tmodal: true;" +
	"\n\t\tborder: false;" +
	"\n\t\tadd: (ExtFormPanel new" +
	"\n\t\t\tborder: false;" +
	"\n\t\t\tpadding: 5;" +
	"\n\t\t\tcls: 'x-panel-mc';" +
	"\n\t\t\tadd: (cols := ExtTextField new name: 'cols'; fieldLabel: 'Počet sloupců'; allowBlank: false; " +
	"\n\t\t\t\tvalidator: [:val | validate value: val asNumber value: 10 value: 'sloupců']);" +
	"\n\t\t\tadd: (rows := ExtTextField new name: 'rows'; fieldLabel: 'Počet řádků'; allowBlank: false;" +
	"\n\t\t\t\tvalidator: [:val | validate value: val asNumber value: 50 value: 'řádků']);" +
	"\n\t\t\tbuttons: {" +
	"\n\t\t\t\tExtButton new text: 'Ok'; formBind: true; on: #click do: [" +
	"\n\t\t\t\t\tself insertTableCols: cols value asNumber rows: rows value asNumber." +
	"\n\t\t\t\t\twin close]. " +
	"\n\t\t\t\tExtButton new text: 'Storno'; on: #click do: [win close]};" +
	"\n\t\t\tmonitorValid: true);" +
	"\n\t\tshow",
	null, "2014-04-30T09:34:06Z", "mp", 1);

jst.FYTextKapitolyEditor.addMethod("vlozTabulku", "", "private", 
	"\t| win cols rows validate |" +
	"\n\tvalidate := [:num :max :txt | (num > 0 and: [num <= max]) " +
	"\n\t\tifTrue: [true] " +
	"\n\t\tifFalse: ('Počet {1} musí být v rozmezí 1 až {2}' format: {txt. max})]." +
	"\n\twin := ExtWindow new" +
	"\n\t\ttitle: 'Vložit tabulku';" +
	"\n\t\twidth: 340;" +
	"\n\t\theight: 140;" +
	"\n\t\tresizable: false;" +
	"\n\t\tmodal: true;" +
	"\n\t\tborder: false;" +
	"\n\t\tadd: (ExtFormPanel new" +
	"\n\t\t\tborder: false;" +
	"\n\t\t\tpadding: 5;" +
	"\n\t\t\tcls: 'x-panel-mc';" +
	"\n\t\t\tadd: (cols := ExtTextField new name: 'cols'; fieldLabel: 'Počet sloupců'; allowBlank: false;" +
	"\n\t\t\t\tvalidator: [:val | validate value: val asNumber value: 10 value: 'sloupců']);" +
	"\n\t\t\tadd: (rows := ExtTextField new name: 'rows'; fieldLabel: 'Počet řádků'; allowBlank: false;" +
	"\n\t\t\t\tvalidator: [:val | validate value: val asNumber value: 50 value: 'řádků']);" +
	"\n\t\t\tbuttons: {" +
	"\n\t\t\t\tExtButton new text: 'Ok'; formBind: true; on: #click do: [" +
	"\n\t\t\t\t\tself insertTableCols: cols value asNumber rows: rows value asNumber." +
	"\n\t\t\t\t\twin close]. " +
	"\n\t\t\t\tExtButton new text: 'Storno'; on: #click do: [win close]};" +
	"\n\t\t\tmonitorValid: true);" +
	"\n\t\ton: #show do: [cols focus];" +
	"\n\t\tshow",
	null, "2014-05-01T21:08:47Z", "mp"); //fytoportal-ior-edit

jst.FYTextKapitolyEditor.addMethod("insertTableCols:rows:", "cols rows", "private", 
	"\teditor insertAtCursor: (DocumentFragment htmlContents: [:html |" +
	"\n\t\thtml table class: 'tab-text'; border: '1px solid gray'; width: '100%'; with: [" +
	"\n\t\t\thtml tableRow class: 'tab-head'; with: [cols timesRepeat: [" +
	"\n\t\t\t\thtml tableHeading: [html br]]]." +
	"\n\t\t\t1 to: rows do: [:i | html tableRow " +
	"\n\t\t\t\tclass: (i even ifTrue: ['even'] ifFalse: ['odd']); " +
	"\n\t\t\t\twith: [cols timesRepeat: [" +
	"\n\t\t\t\t\thtml tableData: [html br]]]]" +
	"\n\t\t]]) printHtml",
	null, "2014-04-30T15:17:19Z", "mp");

jst.FYTextKapitolyEditor.addMethod("upravenaKapitola", "", "accessing", 
	"\t\"objekt, ktery se edituje - bud plodinova metodika nebo jeji kapitola s odkazem na metodiku SO\"" +
	"\n\t^ (metodika jeMetodikaSO and: [metodika kapitolaPM notNil])" +
	"\n\t\tifTrue: [metodika kapitolaPM] " +
	"\n\t\tifFalse: metodika.",
	null, "2013-04-25T13:26:05Z", "mp", 1);

jst.FYTextKapitolyEditor.addMethod("upravenaKapitola", "", "accessing", 
	"\t\"objekt, ktery se edituje:" +
	"\n\t\t- plodinova metodika " +
	"\n\t\t- nebo jeji kapitola s odkazem na metodiku SO" +
	"\n\t\t- nebo primo metodika SO\"" +
	"\n\t^ kapitolaSO ifNil: [metodika]",
	null, "2013-05-03T14:49:56Z", "mp");

jst.FYTextKapitolyEditor.addMethod("resetEditor", "", "editing", 
	"\teditor contents:  ((metodika najdiKapitolu: kapitola) ifNotNilDo: [:kap | kap obsah] ifNil: '')",
	null, "2013-02-18T16:58:28Z", "mp", 1);

jst.FYTextKapitolyEditor.addMethod("resetEditor", "", "editing", 
	"\t| kap |" +
	"\n\teditor contents: (((kapitolaSO notNil " +
	"\n\t\tand: [(kap := kapitolaSO najdiKapitolu: kapitola) notNil]) ifTrue: [kap obsah]) " +
	"\n\t\t\tifNil: [((metodikaSO ifNil: [metodika]) najdiKapitolu: kapitola) ifNotNilDo: [:kap | kap obsah] ifNil: ''])",
	null, "2013-05-03T15:42:40Z", "mp", 1);

jst.FYTextKapitolyEditor.addMethod("resetEditor", "", "editing", 
	"\t| kap |" +
	"\n\teditor contents: (((kapitolaSO notNil " +
	"\n\t\tand: [(kap := kapitolaSO najdiKapitolu: kapitola) notNil]) ifTrue: [kap obsah]) " +
	"\n\t\t\tifNil: [((metodikaSO ifNil: [metodika]) najdiKapitolu: kapitola) ifNotNilDo: [:k | k obsah] ifNil: ''])",
	null, "2013-10-11T23:08:30Z", "mp", 1);

jst.FYTextKapitolyEditor.addMethod("resetEditor", "", "editing", 
	"\t| kap |" +
	"\n\tkapitolaSO ifNotNil: [" +
	"\n\t\t\"kapitola vybraneho skudce, choroby, abionozy\"" +
	"\n\t\tkap := (kapitolaSO najdiKapitolu: kapitola) ifNil: [" +
	"\n\t\t\t(kapitolaSO metodika obecnaMetodika ifNotNilDo: [:met | " +
	"\n\t\t\t\t\"existuje-li obecna metodika, najdu nejdrive kapitolu daneho SO\"" +
	"\n\t\t\t\t(met at: kapitolaSO parent id) obsah detect: [:k | " +
	"\n\t\t\t\t\tk id = kapitolaSO id] ifNone: nil]) ifNotNilDo: [:kapSO | " +
	"\n\t\t\t\t\t\t\"najdu-li kapitolu SO v obecne metodice, hledam podkapitolu\"" +
	"\n\t\t\t\t\t\tkapSO najdiKapitolu: kapitola]]." +
	"\n\t\tkap ifNil: [" +
	"\n\t\t\t\"nakonec dohledavam kaitolu v metodice SO\"" +
	"\n\t\t\tkap := metodikaSO najdiKapitolu: kapitola]" +
	"\n\t] ifNil: [" +
	"\n\t\t\"pestebni opatreni, zapleveleni atd.\"" +
	"\n\t\tkap := (metodika najdiKapitolu: kapitola) ifNil: [" +
	"\n\t\t\tmetodika obecnaMetodika ifNotNilDo: [:met | " +
	"\n\t\t\t\t\"existuje-li obecna metodika, dohledavam kapitolu v ni\"" +
	"\n\t\t\t\tmet najdiKapitolu: kapitola]]" +
	"\n\t]." +
	"\n\teditor contents: (kap ifNotNil: [kap obsah])",
	null, "2013-12-13T19:39:24Z", "mp", 1);

jst.FYTextKapitolyEditor.addMethod("resetEditor", "", "editing", 
	"\t| kap |" +
	"\n\tkapitolaSO ifNotNil: [" +
	"\n\t\t\"kapitola vybraneho skudce, choroby, abionozy\"" +
	"\n\t\tkap := kapitolaSO najdiKapitolu: kapitola." +
	"\n\t\t(kap isNil or: [kap jeVyrazena]) ifTrue: [" +
	"\n\t\t\tkap := (kapitolaSO metodika obecnaMetodika ifNotNilDo: [:met | " +
	"\n\t\t\t\t\"existuje-li obecna metodika, najdu nejdrive kapitolu daneho SO\"" +
	"\n\t\t\t\t(met at: kapitolaSO parent id) obsah detect: [:k | " +
	"\n\t\t\t\t\tk id = kapitolaSO id] ifNone: nil]) ifNotNilDo: [:kapSO | " +
	"\n\t\t\t\t\t\t\"najdu-li kapitolu SO v obecne metodice, hledam podkapitolu\"" +
	"\n\t\t\t\t\t\tkapSO najdiKapitolu: kapitola]]." +
	"\n\t\tkap ifNil: [" +
	"\n\t\t\t\"nakonec dohledavam kapitolu v metodice SO\"" +
	"\n\t\t\tkap := metodikaSO najdiKapitolu: kapitola]." +
	"\n\t] ifNil: [" +
	"\n\t\t\"pestebni opatreni, zapleveleni atd.\"" +
	"\n\t\tkap := metodika najdiKapitolu: kapitola." +
	"\n\t\t(kap isNil or: [kap jeVyrazena]) ifTrue: [" +
	"\n\t\t\tkap := metodika obecnaMetodika ifNotNilDo: [:met | " +
	"\n\t\t\t\t\"existuje-li obecna metodika, dohledavam kapitolu v ni\"" +
	"\n\t\t\t\tmet najdiKapitolu: kapitola]]" +
	"\n\t]." +
	"\n\teditor contents: (kap ifNotNil: [kap obsah])",
	null, "2013-12-15T22:36:32Z", "mp", 1);

jst.FYTextKapitolyEditor.addMethod("resetEditor", "", "editing", 
	"\t| kap |" +
	"\n\tkapitolaSO ifNotNil: [" +
	"\n\t\t\"kapitola vybraneho skudce, choroby, abionozy\"" +
	"\n\t\tkap := kapitolaSO najdiKapitolu: kapitola." +
	"\n\t\t(kap isNil or: [kap jeVyrazena]) ifTrue: [" +
	"\n\t\t\tkap := (kapitolaSO metodika obecnaMetodika ifNotNilDo: [:met | " +
	"\n\t\t\t\t\"existuje-li obecna metodika, najdu nejdrive kapitolu daneho SO\"" +
	"\n\t\t\t\t(met at: kapitolaSO parent id) obsah detect: [:k | " +
	"\n\t\t\t\t\tk linkId = kapitolaSO linkId] ifNone: nil]) ifNotNilDo: [:kapSO | " +
	"\n\t\t\t\t\t\t\"najdu-li kapitolu SO v obecne metodice, hledam podkapitolu\"" +
	"\n\t\t\t\t\t\tkapSO najdiKapitolu: kapitola]]." +
	"\n\t\t(kap isNil or: [kap obsah isEmptyOrNil]) ifTrue: [" +
	"\n\t\t\t\"nakonec dohledavam kapitolu v metodice SO\"" +
	"\n\t\t\tkap := metodikaSO najdiKapitolu: kapitola]." +
	"\n\t] ifNil: [" +
	"\n\t\t\"pestebni opatreni, zapleveleni atd.\"" +
	"\n\t\tkap := metodika najdiKapitolu: kapitola." +
	"\n\t\t(kap isNil or: [kap jeVyrazena]) ifTrue: [" +
	"\n\t\t\tkap := metodika obecnaMetodika ifNotNilDo: [:met | " +
	"\n\t\t\t\t\"existuje-li obecna metodika, dohledavam kapitolu v ni\"" +
	"\n\t\t\t\tmet najdiKapitolu: kapitola]]" +
	"\n\t]." +
	"\n\teditor contents: (kap ifNotNil: [kap obsah])",
	null, "2013-12-16T22:49:27Z", "mp"); //fytoportal-ior-edit

jst.FYTextKapitolyEditor.addMethod("osnova:", "anObject", "accessing", 
	"\tosnova := anObject",
	null, "2013-02-01T22:21:12Z", "mp");

jst.FYTextKapitolyEditor.addMethod("osnova", "", "accessing", 
	"\t^ osnova " +
	"\n\t\tifNil: [osnova := Fytoportal data osnovaMetodiky]" +
	"\n\t\tifNotNil: [osnova ifString: [" +
	"\n\t\t\tosnova := Fytoportal data osnovaMetodikyKapitoly: osnova]]",
	null, "2013-02-01T22:30:17Z", "mp", 1);

jst.FYTextKapitolyEditor.addMethod("osnova", "", "accessing", 
	"\t^ osnova " +
	"\n\t\tifNil: [metodika jeMetodikaSO \"osnova se dynamicky meni podle kapitoly PM\"" +
	"\n\t\t\tifTrue: [ Fytoportal data osnovaMetodikyKapitoly: metodika class kapitola]" +
	"\n\t\t\tifFalse: [Fytoportal data osnovaMetodiky]]" +
	"\n\t\tifNotNil: [osnova ifString: [" +
	"\n\t\t\t\"id osnovy je nastaven zvenku, osnovu nactu na vyzadani\"" +
	"\n\t\t\tosnova := Fytoportal data osnovaMetodikyKapitoly: osnova]]",
	null, "2013-04-25T08:20:34Z", "mp", 1);

jst.FYTextKapitolyEditor.addMethod("osnova", "", "accessing", 
	"\t^ osnova " +
	"\n\t\tifNil: [metodikaSO \"osnova se dynamicky meni podle kapitoly PM\"" +
	"\n\t\t\tifNotNil: [Fytoportal data osnovaMetodikyKapitoly: metodikaSO class kapitola]" +
	"\n\t\t\tifNil: [Fytoportal data osnovaMetodiky]]" +
	"\n\t\tifNotNil: [osnova ifString: [" +
	"\n\t\t\t\"id osnovy je nastaven zvenku, osnovu nactu na vyzadani\"" +
	"\n\t\t\tosnova := Fytoportal data osnovaMetodikyKapitoly: osnova]]",
	null, "2013-05-03T15:12:50Z", "mp", 1);

jst.FYTextKapitolyEditor.addMethod("osnova", "", "accessing", 
	"\t^ osnova " +
	"\n\t\tifNil: [metodikaSO \"osnova se dynamicky meni podle kapitoly PM\"" +
	"\n\t\t\tifNotNil: [Fytoportal data osnovaMetodikyKapitoly: metodikaSO class kapitola]" +
	"\n\t\t\tifNil: [Fytoportal data osnovaMetodiky: metodika typ]]" +
	"\n\t\tifNotNil: [osnova ifString: [" +
	"\n\t\t\t\"id osnovy je nastaven zvenku, osnovu nactu na vyzadani\"" +
	"\n\t\t\tosnova := Fytoportal data osnovaMetodikyKapitoly: osnova]]",
	null, "2014-02-09T20:47:28Z", "mp"); //fytoportal-ior-edit

/*
jst.FYTextKapitolyEditor.addMethod("schovejZmeny", "", "editing", 
	"\t(kapitola notNil and: [editor isDirty] and: [self isActive]) ifTrue: [" +
	"\n\t\tmetodika zmenKapitolu: editor value podle: (self osnova najdiKapitolu: kapitola)].",
	null, "2013-02-05T22:24:31Z", "mp");

jst.FYTextKapitolyEditor.addMethod("schovejZmeny", "", "editing", 
	"\t(kapitola notNil and: [editor isDirty] and: [self isActive]) ifTrue: [" +
	"\n\t\tmetodika zmenKapitolu: editor value podle: (self osnova najdiKapitolu: kapitola)." +
	"\n\t\tself resetEditor].",
	null, "2013-03-04T09:07:47Z", "mp");

jst.FYTextKapitolyEditor.addMethod("schovejZmeny", "", "editing", 
	"\t(kapitola notNil and: [editor isDirty] and: [self isActive]) ifTrue: [" +
	"\n\t\tself upravenaKapitola zmenKapitolu: editor value podle: (self osnova najdiKapitolu: kapitola)." +
	"\n\t\tself resetEditor].",
	null, "2013-04-25T12:44:05Z", "mp");
*/
jst.FYTextKapitolyEditor.addMethod("schovejZmeny", "", "editing", 
	"\t(kapitola notNil and: [editor isDirty] and: [self isActive]) ifTrue: [ | kap |" +
	"\n\t\tkap := self upravenaKapitola zmenKapitolu: editor value podle: (self osnova najdiKapitolu: kapitola)." +
	"\n\t\tself resetEditor." +
	"\n\t\tself sendEvent: #zmenaKapitoly: with: kap].",
	null, "2013-05-14T09:37:38Z", "mp", 1);

jst.FYTextKapitolyEditor.addMethod("schovejZmeny", "", "editing", 
	"\t(kapitola notNil and: [editor isDirty] and: [self isActive]) ifTrue: [ | kap str |" +
	"\n\t\tstr := editor value." +
	"\n\t\tstr = '<br>' ifTrue: [" +
	"\n\t\t\t\"i kdyz editor rucne vymazu, obsahuje presto br (v Chrome)\"" +
	"\n\t\t\tstr := '']." +
	"\n\t\tkap := self upravenaKapitola zmenKapitolu: str podle: (self osnova najdiKapitolu: kapitola)." +
	"\n\t\tself resetEditor." +
	"\n\t\tkap obsahZmenen ifTrue: [" +
	"\n\t\t\tself sendEvent: #zmenaKapitoly: with: kap]].",
	null, "2013-09-25T12:22:17Z", "mp"); //fytoportal-ior-edit
	
/*
jst.FYTextKapitolyEditor.addMethod("editujKapitolu:metodiky:", "id met", "editing", 
	"\tself schovejZmeny." +
	"\n\tkapitola := id." +
	"\n\tmetodika := met." +
	"\n\tself resetEditor",
	null, "2013-02-18T16:58:47Z", "mp");

jst.FYTextKapitolyEditor.addMethod("editujKapitolu:metodiky:", "id met", "editing", 
	"\tself schovejZmeny." +
	"\n\tkapitola := id." +
	"\n\tmetodika := met." +
	"\n\tself resetEditor." +
	"\n\tinfo value:  ((self osnova najdiKapitolu: kapitola) ifNotNilDo: [:kap | kap poznamka] ifNil: '')",
	null, "2013-02-19T14:21:46Z", "mp");

jst.FYTextKapitolyEditor.addMethod("editujKapitolu:metodiky:", "id met", "editing", 
	"\tself schovejZmeny." +
	"\n\tkapitola := id." +
	"\n\tmetodika := met." +
	"\n\tself resetEditor." +
	"\n\tinfo value:  ((self osnova najdiKapitolu: kapitola) ifNotNilDo: [:kap | " +
	"\n\t\ttitle htmlContents: [:html | html " +
	"\n\t\t\tbold: metodika nazev, ': ';" +
	"\n\t\t\ttext: kap nazev]." +
	"\n\t\tkap poznamka] ifNil: '')",
	null, "2013-04-02T12:00:40Z", "mp");

jst.FYTextKapitolyEditor.addMethod("editujKapitolu:metodiky:", "id met", "editing", 
	"\tself schovejZmeny." +
	"\n\tkapitola := id." +
	"\n\tmetodika := met." +
	"\n\tself resetEditor." +
	"\n\t(self osnova najdiKapitolu: kapitola) ifNotNilDo: [:kap | " +
	"\n\t\ttitle htmlContents: [:html | html " +
	"\n\t\t\tbold: metodika nazev, ': ';" +
	"\n\t\t\ttext: kap nazev]." +
	"\n\t\tinfo value:  (String streamContents: [:s | " +
	"\n\t\t\tkap poznamka ifNotNil: [s nextPutAll: kap poznamka." +
	"\n\t\t\t\tmetodika jeMetodikaSO ifTrue: [s nextPutAll: '<br>']]." +
	"\n\t\t\tmetodika jeMetodikaSO ifTrue: [s nextPutAll:" +
	"\n\t\t\t\t'POZOR - změny textu se projeví pouze v rámci této plodinové metodiky!']])" +
	"\n\t] ifNil: [info value:  '']",
	null, "2013-04-25T08:13:48Z", "mp");

jst.FYTextKapitolyEditor.addMethod("editujKapitolu:metodiky:", "id met", "editing", 
	"\tself schovejZmeny." +
	"\n\tkapitola := id." +
	"\n\tmetodika := met." +
	"\n\tself resetEditor." +
	"\n\t(self osnova najdiKapitolu: kapitola) ifNotNilDo: [:kap | " +
	"\n\t\ttitle htmlContents: [:html | html " +
	"\n\t\t\tbold: metodika nazev, ': ';" +
	"\n\t\t\ttext: kap nazev]." +
	"\n\t\tinfo value:  (String streamContents: [:s | " +
	"\n\t\t\tkap poznamka ifNotNil: [s nextPutAll: kap poznamka." +
	"\n\t\t\t\tmetodika jeMetodikaSO ifTrue: [s nextPutAll: '<br>']]." +
	"\n\t\t\t(metodika jeMetodikaSO and: [metodika kapitolaPM notNil]) ifTrue: [s nextPutAll:" +
	"\n\t\t\t\t'<font color=red>POZOR - změny textu se projeví pouze v rámci této plodinové metodiky!</font>']])" +
	"\n\t] ifNil: [info value:  '']",
	null, "2013-04-25T13:27:46Z", "mp");

jst.FYTextKapitolyEditor.addMethod("editujKapitolu:metodiky:", "id kap", "editing", 
	"\tself schovejZmeny." +
	"\n\tkapitola := id." +
	"\n\tmetodika := kap metodika." +
	"\n\tkapitolaSO := kap == kap metodika ifFalse: [kap]." +
	"\n\tmetodikaSO := kapitolaSO " +
	"\n\t\tifNotNil: [kapitolaSO link]" +
	"\n\t\tifNil: [metodika jeMetodikaSO ifTrue: [metodika]]." +
	"\n\tself resetEditor." +
	"\n\t(self osnova najdiKapitolu: kapitola) ifNotNilDo: [:kap | " +
	"\n\t\ttitle htmlContents: [:html | html " +
	"\n\t\t\tbold: metodika nazev, ': ';" +
	"\n\t\t\ttext: kap nazev]." +
	"\n\t\tinfo value:  (String streamContents: [:s | " +
	"\n\t\t\tkap poznamka ifNotNil: [s nextPutAll: kap poznamka." +
	"\n\t\t\t\tkapitolaSO ifNotNil: [s nextPutAll: '<br>']]." +
	"\n\t\t\tkapitolaSO ifNotNil: [s nextPutAll:" +
	"\n\t\t\t\t'<font color=red>POZOR - změny textu se projeví pouze v rámci této plodinové metodiky!</font>']])" +
	"\n\t] ifNil: [info value:  '']",
	null, "2013-05-03T14:58:02Z", "mp");
*/
jst.FYTextKapitolyEditor.addMethod("editujKapitolu:metodiky:", "id kap", "editing", 
	"\tself schovejZmeny." +
	"\n\tkapitola := id." +
	"\n\tmetodika := kap metodika." +
	"\n\tkapitolaSO := kap == kap metodika ifFalse: [kap]." +
	"\n\tmetodikaSO := kapitolaSO " +
	"\n\t\tifNotNil: [kapitolaSO link]" +
	"\n\t\tifNil: [metodika jeMetodikaSO ifTrue: [metodika]]." +
	"\n\tself resetEditor." +
	"\n\t(self osnova najdiKapitolu: kapitola) ifNotNilDo: [:kap | " +
	"\n\t\ttitle htmlContents: [:html | " +
	"\n\t\t\thtml bold: metodika nazev." +
	"\n\t\t\tkapitolaSO ifNotNil: [" +
	"\n\t\t\t\thtml bold: ' - '; bold: kapitolaSO nazev]." +
	"\n\t\t\thtml bold: ': ';" +
	"\n\t\t\t\ttext: kap nazev]." +
	"\n\t\tinfo value:  (String streamContents: [:s | " +
	"\n\t\t\tkap poznamka ifNotNil: [s nextPutAll: kap poznamka." +
	"\n\t\t\t\tkapitolaSO ifNotNil: [s nextPutAll: '<br>']]." +
	"\n\t\t\tkapitolaSO ifNotNil: [s nextPutAll:" +
	"\n\t\t\t\t'<font color=red>POZOR - změny textu se projeví pouze v rámci této plodinové metodiky!</font>']])" +
	"\n\t] ifNil: [info value:  '']",
	null, "2013-05-14T14:54:43Z", "mp", 1);

jst.FYTextKapitolyEditor.addMethod("editujKapitolu:metodiky:", "id kap", "editing", 
	"\tself schovejZmeny." +
	"\n\tkapitola := id." +
	"\n\tmetodika := kap metodika." +
	"\n\tkapitolaSO := kap == kap metodika ifFalse: [kap]." +
	"\n\tmetodikaSO := kapitolaSO " +
	"\n\t\tifNotNil: [kapitolaSO link]" +
	"\n\t\tifNil: [metodika jeMetodikaSO ifTrue: [metodika]]." +
	"\n\tself resetEditor." +
	"\n\t(self osnova najdiKapitolu: kapitola) ifNotNilDo: [:kap | " +
	"\n\t\ttitle htmlContents: [:html | " +
	"\n\t\t\thtml bold: metodika nazev." +
	"\n\t\t\tkapitolaSO ifNotNil: [" +
	"\n\t\t\t\thtml bold: ' - '; bold: kapitolaSO nazev]." +
	"\n\t\t\thtml bold: ': ';" +
	"\n\t\t\t\ttext: kap cislo; " +
	"\n\t\t\t\ttext: ' '; " +
	"\n\t\t\t\ttext: kap nazev]." +
	"\n\t\tinfo value:  (String streamContents: [:s | " +
	"\n\t\t\tkap poznamka ifNotNil: [s nextPutAll: kap poznamka." +
	"\n\t\t\t\tkapitolaSO ifNotNil: [s nextPutAll: '<br>']]." +
	"\n\t\t\tkapitolaSO ifNotNil: [s nextPutAll:" +
	"\n\t\t\t\t'<font color=red>POZOR - změny textu se projeví pouze v rámci této plodinové metodiky!</font>']])" +
	"\n\t] ifNil: [info value:  '']",
	null, "2013-05-26T20:52:56Z", "mp", 1);

jst.FYTextKapitolyEditor.addMethod("editujKapitolu:metodiky:", "id kap", "editing", 
	"\tself schovejZmeny." +
	"\n\tkapitola := id." +
	"\n\tmetodika := kap metodika." +
	"\n\tkapitolaSO := kap == kap metodika ifFalse: [kap]." +
	"\n\tmetodikaSO := kapitolaSO " +
	"\n\t\tifNotNil: [kapitolaSO link]" +
	"\n\t\tifNil: [metodika jeMetodikaSO ifTrue: [metodika]]." +
	"\n\tself resetEditor." +
	"\n\tvazbyBtn ifNotNil: [" +
	"\n\t\tvazbyBtn isVisible: id = #'charakteristika.hostitele']." +
	"\n\t(self osnova najdiKapitolu: kapitola) ifNotNilDo: [:kap | " +
	"\n\t\ttitle htmlContents: [:html | " +
	"\n\t\t\thtml bold: metodika nazev." +
	"\n\t\t\tkapitolaSO ifNotNil: [" +
	"\n\t\t\t\thtml bold: ' - '; bold: kapitolaSO nazev]." +
	"\n\t\t\thtml bold: ': ';" +
	"\n\t\t\t\ttext: kap cislo; " +
	"\n\t\t\t\ttext: ' '; " +
	"\n\t\t\t\ttext: kap nazev]." +
	"\n\t\tinfo value:  (String streamContents: [:s | " +
	"\n\t\t\tkap poznamka ifNotNil: [s nextPutAll: kap poznamka." +
	"\n\t\t\t\tkapitolaSO ifNotNil: [s nextPutAll: '<br>']]." +
	"\n\t\t\tkapitolaSO ifNotNil: [s nextPutAll:" +
	"\n\t\t\t\t'<font color=red>POZOR - změny textu se projeví pouze v rámci této plodinové metodiky!</font>']])" +
	"\n\t] ifNil: [info value:  '']",
	null, "2013-09-13T12:32:53Z", "mp", 1);

jst.FYTextKapitolyEditor.addMethod("editujKapitolu:metodiky:", "id kap", "editing", 
	"\tself schovejZmeny." +
	"\n\tkapitola := id." +
	"\n\tmetodika := kap metodika." +
	"\n\tkapitolaSO := kap == kap metodika ifFalse: [kap]." +
	"\n\tmetodikaSO := kapitolaSO " +
	"\n\t\tifNotNil: [kapitolaSO link]" +
	"\n\t\tifNil: [metodika jeMetodikaSO ifTrue: [metodika]]." +
	"\n\tself resetEditor." +
	"\n\tvazbyBtn ifNotNil: [" +
	"\n\t\tvazbyBtn isVisible: id = #'charakteristika.hostitele']." +
	"\n\t(self osnova najdiKapitolu: kapitola) ifNotNilDo: [:k | " +
	"\n\t\ttitle htmlContents: [:html | " +
	"\n\t\t\thtml bold: metodika nazev." +
	"\n\t\t\tkapitolaSO ifNotNil: [" +
	"\n\t\t\t\thtml bold: ' - '; bold: kapitolaSO nazev]." +
	"\n\t\t\thtml bold: ': ';" +
	"\n\t\t\t\ttext: k cislo; " +
	"\n\t\t\t\ttext: ' '; " +
	"\n\t\t\t\ttext: k nazev]." +
	"\n\t\tinfo value:  (String streamContents: [:s | " +
	"\n\t\t\tk poznamka ifNotNil: [s nextPutAll: k poznamka." +
	"\n\t\t\t\tkapitolaSO ifNotNil: [s nextPutAll: '<br>']]." +
	"\n\t\t\tkapitolaSO ifNotNil: [s nextPutAll:" +
	"\n\t\t\t\t'<font color=red>POZOR - změny textu se projeví pouze v rámci této plodinové metodiky!</font>']])" +
	"\n\t] ifNil: [info value:  '']",
	null, "2013-10-11T23:13:59Z", "mp", 1);

jst.FYTextKapitolyEditor.addMethod("editujKapitolu:metodiky:", "id kap", "editing", 
	"\tself schovejZmeny." +
	"\n\tkapitola := id." +
	"\n\tmetodika := kap metodika." +
	"\n\t\"kapitola vybraneho skudce, choroby, abionozy plodinove metodiky, i obecne\"" +
	"\n\tkapitolaSO := kap == kap metodika ifFalse: [kap]." +
	"\n\t\"metodika daneho skudce, choroby, abionozy\"" +
	"\n\tmetodikaSO := kapitolaSO " +
	"\n\t\tifNotNil: [kapitolaSO link]" +
	"\n\t\tifNil: [metodika jeMetodikaSO ifTrue: [metodika]]." +
	"\n\tself resetEditor." +
	"\n\tvazbyBtn ifNotNil: [" +
	"\n\t\tvazbyBtn isVisible: id = #'charakteristika.hostitele']." +
	"\n\t(self osnova najdiKapitolu: kapitola) ifNotNilDo: [:k | " +
	"\n\t\ttitle htmlContents: [:html | " +
	"\n\t\t\thtml bold: metodika nazev." +
	"\n\t\t\tkapitolaSO ifNotNil: [" +
	"\n\t\t\t\thtml bold: ' - '; bold: kapitolaSO nazev]." +
	"\n\t\t\thtml bold: ': ';" +
	"\n\t\t\t\ttext: k cislo; " +
	"\n\t\t\t\ttext: ' '; " +
	"\n\t\t\t\ttext: k nazev]." +
	"\n\t\tinfo value:  (String streamContents: [:s | | lokalniZmeny |" +
	"\n\t\t\tlokalniZmeny := kapitolaSO notNil or: [metodika obecnaMetodika notNil]." +
	"\n\t\t\tk poznamka ifNotNil: [s nextPutAll: k poznamka." +
	"\n\t\t\t\tlokalniZmeny ifTrue: [s nextPutAll: '<br>']]." +
	"\n\t\t\tlokalniZmeny ifTrue: [s nextPutAll:" +
	"\n\t\t\t\t'<font color=red>POZOR - změny textu se projeví pouze v rámci této plodinové metodiky!</font>']])" +
	"\n\t] ifNil: [info value:  '']",
	null, "2013-12-15T22:41:43Z", "mp", 1);

jst.FYTextKapitolyEditor.addMethod("editujKapitolu:metodiky:", "id kap", "editing", 
	"\tself schovejZmeny." +
	"\n\tkapitola := id." +
	"\n\tmetodika := kap metodika." +
	"\n\t\"kapitola vybraneho skudce, choroby, abionozy plodinove metodiky, i obecne\"" +
	"\n\tkapitolaSO := kap == kap metodika ifFalse: [kap]." +
	"\n\t\"metodika daneho skudce, choroby, abionozy\"" +
	"\n\tmetodikaSO := kapitolaSO " +
	"\n\t\tifNotNil: [kapitolaSO link]" +
	"\n\t\tifNil: [metodika jeMetodikaSO ifTrue: [metodika]]." +
	"\n\tself resetEditor." +
	"\n\t(self osnova najdiKapitolu: kapitola) ifNotNilDo: [:k | " +
	"\n\t\ttitle htmlContents: [:html | " +
	"\n\t\t\thtml bold: (metodika nazev ifNil: ['nová metodika'])." +
	"\n\t\t\tkapitolaSO ifNotNil: [" +
	"\n\t\t\t\thtml bold: ' - '; bold: kapitolaSO nazev]." +
	"\n\t\t\thtml bold: ': ';" +
	"\n\t\t\t\ttext: k cislo; " +
	"\n\t\t\t\ttext: ' '; " +
	"\n\t\t\t\ttext: k nazev]." +
	"\n\t\tinfo value:  (String streamContents: [:s | | lokalniZmeny |" +
	"\n\t\t\tlokalniZmeny := kapitolaSO notNil or: [metodika obecnaMetodika notNil]." +
	"\n\t\t\tk poznamka ifNotNil: [s nextPutAll: k poznamka." +
	"\n\t\t\t\tlokalniZmeny ifTrue: [s nextPutAll: '<br>']]." +
	"\n\t\t\tlokalniZmeny ifTrue: [s nextPutAll:" +
	"\n\t\t\t\t'<font color=red>POZOR - změny textu se projeví pouze v rámci této plodinové metodiky!</font>']])" +
	"\n\t] ifNil: [info value:  '']",
	null, "2014-03-03T22:07:17Z", "mp"); //fytoportal-ior-edit

jst.FYTextKapitolyEditor.addMethod("zahodZmeny", "", "editing", 
	"\t\"zahodi pouze zmeny aktualni kapitoly\"" +
	"\n\t(metodika najdiKapitolu: kapitola) ifNotNilDo: [:kap | kap zmeny: nil]." +
	"\n\tself resetEditor",
	null, "2013-02-18T17:02:08Z", "mp", 1);

jst.FYTextKapitolyEditor.addMethod("zahodZmeny", "", "editing", 
	"\t\"zahodi pouze zmeny aktualni kapitoly\"" +
	"\n\t(self upravenaKapitola najdiKapitolu: kapitola) ifNotNilDo: [:kap | kap zmeny: nil]." +
	"\n\tself resetEditor",
	null, "2013-04-25T12:44:27Z", "mp", 1);

jst.FYTextKapitolyEditor.addMethod("zahodZmeny", "", "editing", 
	"\t\"zahodi pouze zmeny aktualni kapitoly\"" +
	"\n\t(self upravenaKapitola najdiKapitolu: kapitola) ifNotNilDo: [:kap | " +
	"\n\t\tkap zmeny: nil." +
	"\n\t\tself sendEvent: #zmenaKapitoly: with: kap]." +
	"\n\tself resetEditor",
	null, "2013-05-14T09:36:13Z", "mp", 1);

jst.FYTextKapitolyEditor.addMethod("zahodZmeny", "", "editing", 
	"\t\"zahodi pouze zmeny aktualni kapitoly\"" +
	"\n\t(self upravenaKapitola najdiKapitolu: kapitola) ifNotNilDo: [:kap | " +
	"\n\t\t\"kapitolu bez textu musim z metodiky vyjmout, vcetne nadrazenych, pokud jsou prazdne\"" +
	"\n\t\tself upravenaKapitola zmenKapitolu: nil podle: (self osnova najdiKapitolu: kapitola)." +
	"\n\t\tself sendEvent: #zmenaKapitoly: with: kap]." +
	"\n\tself resetEditor",
	null, "2013-09-25T09:26:05Z", "mp", 1);

jst.FYTextKapitolyEditor.addMethod("zahodZmeny", "", "editing", 
	"\t\"zahodi pouze zmeny aktualni kapitoly\"" +
	"\n\t(self upravenaKapitola najdiKapitolu: kapitola) ifNotNilDo: [:kap | kap zmeny ifNotNil: [" +
	"\n\t\t\"kapitolu bez textu musim z metodiky vyjmout, vcetne nadrazenych, pokud jsou prazdne\"" +
	"\n\t\tself upravenaKapitola zmenKapitolu: nil podle: (self osnova najdiKapitolu: kapitola)." +
	"\n\t\tself sendEvent: #zmenaKapitoly: with: kap]]." +
	"\n\tself resetEditor",
	null, "2013-09-25T11:49:35Z", "mp"); //fytoportal-ior-edit

/*
jst.FYTextKapitolyEditor.addMethod("y:", "aNumber", "accessing", 
	"\tself activeItem y: aNumber",
	null, "2013-02-19T20:18:56Z", "mp");
*/

jst.FYTextKapitolyEditor.addMethod("isModified", "", "testing", 
	"\t^ editor isDirty",
	null, "2013-03-04T07:46:22Z", "mp");

jst.FYTextKapitolyEditor.addMethod("zmenaMetodikySO:", "met", "updating", 
	"\t(metodika notNil and: [metodika id = met id]) ifTrue: [" +
	"\n\t\tmetodika := met." +
	"\n\t\tself resetEditor]",
	null, "2013-03-05T09:31:09Z", "mp", 1);

jst.FYTextKapitolyEditor.addMethod("zmenaMetodikySO:", "met", "updating", 
	"\t(metodika notNil and: [metodika id = met id]) ifTrue: [" +
	"\n\t\tmet kapitolaPM: metodika kapitolaPM." +
	"\n\t\tmetodika := met." +
	"\n\t\tself resetEditor]",
	null, "2013-05-02T08:19:35Z", "mp", 2);

jst.FYTextKapitolyEditor.addMethod("zmenaMetodikySO:", "met", "updating", 
	"\t(metodika notNil and: [metodika id = met id]) ifTrue: [" +
	"\n\t\tmetodika := met." +
	"\n\t\tself resetEditor]",
	null, "2013-05-02T13:12:40Z", "mp", 3);

jst.FYTextKapitolyEditor.addMethod("zmenaMetodikySO:", "met", "updating", 
	"\t(metodikaSO notNil and: [metodikaSO id = met id]) ifTrue: [" +
	"\n\t\tmetodika == metodikaSO ifTrue: [" +
	"\n\t\t\tmetodika := met]." +
	"\n\t\tmetodikaSO := met." +
	"\n\t\tkapitolaSO ifNotNil: [" +
	"\n\t\t\tkapitolaSO link: met]." +
	"\n\t\tself resetEditor]",
	null, "2013-05-03T15:14:45Z", "mp"); //fytoportal-ior-edit

// *** FYTextKapitolyNahled ***

jst.FYTextKapitolyNahled.addMethod("jeNahledKapitoly", "", "testing", 
	"\t^ true",
	null, "2014-03-07T21:48:59Z", "mp");

jst.FYTextKapitolyNahled.addMethod("zmenaMetodikySO:", "met", "updating", 
	"\t(metodikaSO notNil and: [metodikaSO id = met id]) ifTrue: [" +
	"\n\t\tkapitola := nil." +
	"\n\t\tself nactiKapitolu: met]",
	null, "2014-03-03T10:00:48Z", "mp");

/*
jst.FYTextKapitolyNahled.addMethod("renderContentOn:", "html", "rendering", 
	"\t\"vse bez ohledu na vyber kapitol ve stromecku\"" +
	"\n\tself renderPopisTaxonuOn: html." +
	"\n\tkapitola kapitolyTisk do: [:kap |" +
	"\n\t\tkap renderTextOn: html of: self]",
	null, "2013-12-29T22:13:10Z", "mp", 1);

jst.FYTextKapitolyNahled.addMethod("renderContentOn:", "html", "rendering", 
	"\t\"vse bez ohledu na vyber kapitol ve stromecku\"" +
	"\n\tkapitola renderOn: html." +
	"\n\tkapitola kapitolyTisk do: [:kap |" +
	"\n\t\tkap renderTextOn: html of: self]",
	null, "2014-03-06T20:35:02Z", "mp", 1);

jst.FYTextKapitolyNahled.addMethod("renderContentOn:", "html", "rendering", 
	"\tself renderPopisTaxonuOn: html." +
	"\n\tkapitola kapitolyTisk do: [:kap |" +
	"\n\t\tkap renderTextOn: html of: self]",
	null, "2014-03-07T21:24:30Z", "mp"); //fytoportal-ior-edit
*/

jst.FYTextKapitolyNahled.addMethod("podkapitolyTisk", "", "private", 
	"\t^ kapitola kapitolyTisk",
	null, "2014-03-08T19:42:42Z", "mp");

jst.FYTextKapitolyNahled.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #kapitola1 ifTrue: [" +
	"\n\t\tid := anObject id." +
	"\n\t\tself nactiKapitolu: anObject metodika]." +
	"\n\tanAspect = #kapitola ifTrue: [" +
	"\n\t\t\"skudce, choroba, abionoza\"" +
	"\n\t\tself nactiKapitolu: anObject link].",
	null, "2013-02-20T23:02:11Z", "mp", 1);

jst.FYTextKapitolyNahled.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #kapitola1 ifTrue: [" +
	"\n\t\tid := anObject id." +
	"\n\t\tself nactiKapitolu: anObject metodika]." +
	"\n\tanAspect = #kapitola ifTrue: [" +
	"\n\t\t\"skudce, choroba, abionoza\"" +
	"\n\t\tself nactiKapitolu: anObject link].",
	null, "2013-02-20T23:02:11Z", "mp", 1);

jst.FYTextKapitolyNahled.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #kapitola1 ifTrue: [" +
	"\n\t\tid := anObject id." +
	"\n\t\tmetodikaSO := nil." +
	"\n\t\tself nactiKapitolu: anObject]." +
	"\n\tanAspect = #kapitola ifTrue: [" +
	"\n\t\t\"skudce, choroba, abionoza\"" +
	"\n\t\tmetodikaSO := anObject link." +
	"\n\t\tself nactiKapitolu: anObject].",
	null, "2013-05-03T09:35:55Z", "mp", 1);

jst.FYTextKapitolyNahled.addMethod("update:with:", "anAspect anObject", "updating", 
	"\t(anAspect = #metodika & id notNil and: [self isActive]) ifTrue: [" +
	"\n\t\t\"posila jen FYPMObsahEditor>>zahodZmeny\" self inform: 'OK'." +
	"\n\t\tself nactiKapitolu: (anObject at: id)]." +
	"\n\t\"posila pouze FYPMObsahEditor>>update:with:, jinak se vsude vola primo metoda #nactiKapitolu:\"" +
	"\n\tanAspect = #kapitola1 ifTrue: [" +
	"\n\t\tid := anObject id." +
	"\n\t\tself nactiKapitolu: anObject]",
	null, "2013-05-14T22:14:10Z", "mp", 1);

jst.FYTextKapitolyNahled.addMethod("update:with:", "anAspect anObject", "updating", 
	"\t\"posila pouze FYPMObsahEditor>>update:with:, jinak se vsude vola primo metoda #nactiKapitolu:\"" +
	"\n\tanAspect = #kapitola1 ifTrue: [" +
	"\n\t\tself nactiKapitolu: anObject]",
	null, "2013-05-14T14:51:22Z", "mp"); //fytoportal-ior-edit

jst.FYTextKapitolyNahled.addMethod("nactiKapitolu:", "metodika", "private", 
	"\t| kap |" +
	"\n\tkap := metodika jeMetodikaSO" +
	"\n\t\tifFalse: [metodika at: id]" +
	"\n\t\tifTrue: metodika." +
	"\n\t(kapitola notNil and: [kapitola metodika == kap metodika] and: [kap jeZmenena not]) ifFalse: [" +
	"\n\t\tkapitola := kap." +
	"\n\t\tself refreshContent]",
	null, "2013-04-25T14:45:33Z", "mp", 1);

jst.FYTextKapitolyNahled.addMethod("nactiKapitolu:", "metodika", "private", 
	"\t| kap |" +
	"\n\tkap := metodika jeMetodikaSO" +
	"\n\t\tifFalse: [metodika at: id]" +
	"\n\t\tifTrue: metodika." +
	"\n\t(kapitola isNil or: [(kapitola metodika == kap metodika) not] or: [kap jeZmenena]) ifTrue: [" +
	"\n\t\tkapitola := kap." +
	"\n\t\tself refreshContent]",
	null, "2013-04-28T13:24:18Z", "mp", 1);

jst.FYTextKapitolyNahled.addMethod("nactiKapitolu:", "metodika", "private", 
	"\t| kap |" +
	"\n\tkap := metodika jeMetodikaSO" +
	"\n\t\tifFalse: [metodika at: id]" +
	"\n\t\tifTrue: metodika." +
	"\n\t(kapitola isNil or: [(kapitola metodika == kap metodika) not] or: [kap jeZmenena]) ifTrue: [" +
	"\n\t\tkapitola := kap." +
	"\n\t\tkapitola jeMetodikaSO ifTrue: [" +
	"\n\t\t\tsemaforData := nil]." +
	"\n\t\tself refreshContent]",
	null, "2013-04-29T08:48:04Z", "mp", 1);

jst.FYTextKapitolyNahled.addMethod("nactiKapitolu:", "metodika", "private", 
	"\t| kap |" +
	"\n\tkap := metodika jeMetodikaSO" +
	"\n\t\tifFalse: [metodika at: id]" +
	"\n\t\tifTrue: metodika." +
	"\n\t(kapitola isNil or: [(kapitola metodika == kap metodika) not] or: [prekresli = kap] or: [kap jeZmenena]) ifTrue: [" +
	"\n\t\tkapitola := kap." +
	"\n\t\tprekresli := nil." +
	"\n\t\tkapitola jeMetodikaSO ifTrue: [" +
	"\n\t\t\tsemaforData := nil]." +
	"\n\t\tself refreshContent]",
	null, "2013-04-30T06:55:23Z", "mp", 1);

jst.FYTextKapitolyNahled.addMethod("nactiKapitolu:", "metodika", "private", 
	"\t| kap |" +
	"\n\tkap := metodika jeMetodikaSO" +
	"\n\t\tifFalse: [metodika at: id]" +
	"\n\t\tifTrue: metodika." +
	"\n\t(kapitola isNil or: [(kapitola metodika == kap metodika) not] or: [kap = prekresli] or: [kap jeZmenena]) ifTrue: [" +
	"\n\t\tkapitola := kap." +
	"\n\t\tprekresli := nil." +
	"\n\t\tkapitola jeMetodikaSO ifTrue: [" +
	"\n\t\t\tsemaforData := nil]." +
	"\n\t\tself refreshContent]",
	null, "2013-04-30T19:51:09Z", "mp", 1);

jst.FYTextKapitolyNahled.addMethod("nactiKapitolu:", "kap", "private", 
	"\t(kapitola isNil or: [(kapitola metodika == kap metodika) not] or: [kap = prekresli] or: [kap jeZmenena]) ifTrue: [" +
	"\n\t\tkapitola := kap." +
	"\n\t\tprekresli := nil." +
	"\n\t\tmetodikaSO := kap jeMetodikaSO ifTrue: kap ifFalse: [kap link]." +
	"\n\t\tmetodikaSO ifNotNil: [" +
	"\n\t\t\tsemaforData := nil]." +
	"\n\t\tself refreshContent]",
	null, "2013-05-03T09:45:18Z", "mp", 1);

jst.FYTextKapitolyNahled.addMethod("nactiKapitolu:", "kap", "private", 
	"\t(kapitola isNil or: [(kapitola metodika == kap metodika) not] or: [kap = prekresli]) ifTrue: [" +
	"\n\t\tkapitola := kap." +
	"\n\t\tprekresli := nil." +
	"\n\t\tmetodikaSO := kap jeMetodikaSO ifTrue: kap ifFalse: [kap link]." +
	"\n\t\tmetodikaSO ifNotNil: [" +
	"\n\t\t\tsemaforData := nil]." +
	"\n\t\tself refreshContent]",
	null, "2013-05-14T09:45:19Z", "mp", 1);

jst.FYTextKapitolyNahled.addMethod("nactiKapitolu:", "kap", "private", 
	"\t(kapitola isNil or: [kapitola ~= kap] or: [" +
	"\n\t\t(kapitola metodika == kap metodika) not] or: [kap = prekresli]) ifTrue: [" +
	"\n\t\tkapitola := kap." +
	"\n\t\tprekresli := nil." +
	"\n\t\tmetodikaSO := kap jeMetodikaSO ifTrue: kap ifFalse: [kap link]." +
	"\n\t\tmetodikaSO ifNotNil: [" +
	"\n\t\t\tsemaforData := nil]." +
	"\n\t\tself refreshContent]",
	null, "2013-05-14T14:50:09Z", "mp", 1);

jst.FYTextKapitolyNahled.addMethod("nactiKapitolu:", "kap", "private", 
	"\t(kapitola isNil or: [kapitola ~= kap] or: [(kapitola metodika == kap metodika) not]) ifTrue: [" +
	"\n\t\tkapitola := kap." +
	"\n\t\tmetodikaSO := kap jeMetodikaSO ifTrue: kap ifFalse: [kap link]." +
	"\n\t\tmetodikaSO ifNotNil: [" +
	"\n\t\t\tsemaforData := nil]." +
	"\n\t\tself refreshContent]",
	null, "2013-12-18T20:14:34Z", "mp", 1);

jst.FYTextKapitolyNahled.addMethod("nactiKapitolu:", "kap", "private", 
	"\t(kapitola isNil or: [kapitola ~= kap] or: [(kapitola metodika == kap metodika) not]) ifTrue: [" +
	"\n\t\tkapitola := kap." +
	"\n\t\tmetodikaSO := kap jeMetodikaSO ifTrue: kap ifFalse: [kap link]." +
	"\n\t\tsemaforData := nil." +
	"\n\t\tself refreshContent]",
	null, "2014-02-16T20:54:41Z", "mp"); //fytoportal-ior-edit

jst.FYTextKapitolyNahled.addMethod("schovejZmeny", "", "actions", 
	"\t\"nic\"",
	null, "2013-04-25T12:49:30Z", "mp");

/*
jst.FYTextKapitolyNahled.addMethod("zahodZmeny", "", "actions", 
	"\t\"zde nic - viz update:with: pro #metodika\"",
	null, "2013-05-14T22:18:19Z", "mp");

nahrazeno #zmenaKapitoly
jst.FYTextKapitolyNahled.addMethod("resetSemafor", "", "initialization", 
	"\t\"volam zvenku v situaci, kdy bezpecne vim, ze nasledne mohu semafor prekreslit bez problemu\"" +
	"\n\tsemaforData := nil",
	null, "2013-04-30T07:10:21Z", "mp", 1);

jst.FYTextKapitolyNahled.addMethod("resetSemafor", "", "initialization", 
	"\t\"volam zvenku v situaci, kdy bezpecne vim, ze nasledne mohu semafor prekreslit bez problemu\"" +
	"\n\tsemaforData := nil." +
	"\n\tself isActive " +
	"\n\t\tifTrue: [self refreshContent]" +
	"\n\t\tifFalse: [\"zajistim prekresleni pri aktivaci komponenty\"" +
	"\n\t\t\tkapitola := nil]",
	null, "2013-12-18T20:02:31Z", "mp"); //fytoportal-ior-edit
*/

jst.FYTextKapitolyNahled.addMethod("zmenaKapitoly:", "kap", "updating", 
	"\tkapitola ifNotNil: [" +
	"\n\t\tself resetContent]",
	null, "2013-05-14T07:55:15Z", "mp", 1);

jst.FYTextKapitolyNahled.addMethod("zmenaKapitoly:", "kap", "updating", 
	"\tkapitola ifNotNil: [" +
	"\n\t\tkapitola := nil]",
	null, "2013-05-14T13:40:42Z", "mp", 2);

jst.FYTextKapitolyNahled.addMethod("zmenaKapitoly:", "kap", "updating", 
	"\tself isActive " +
	"\n\t\tifTrue: [" +
	"\n\t\t\tkap metodika jeZmenena ifFalse: [" +
	"\n\t\t\t\t\"zahozeni zmen, semafor musim resetovat\"" +
	"\n\t\t\t\tsemaforData := nil.]." +
	"\n\t\t\tself refreshContent]" +
	"\n\t\tifFalse: [\"zajistim prekresleni pri aktivaci komponenty\"" +
	"\n\t\t\tkapitola := nil]",
	null, "2014-03-11T15:58:38Z", "mp"); //fytoportal-ior-edit

jst.FYTextKapitolyNahled.addMethod("zmenaMetodiky:", "met", "updating", 
	"\t\"Nic! V ramci editoru se resi jinak - viz FYPMEditor>>ulozZmeny\"",
	null, "2013-05-15T15:03:59Z", "mp");

/* zruseno
jst.FYTextKapitolyNahled.addMethod("kodyPlodiny:", "pl", "private", 
	"\t^ pl kody",
	null, "2014-01-12T14:06:20Z", "mp");
*/

// *** FYMapovaniPouzitiPOR ***

jst.FYMapovaniPouzitiPOR.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\twithCenterLayout;" +
	"\n\t\tadd: (self innerPanel " +
	"\n\t\t\ty: 25)." +
	"\n\tself cls: '';" +
	"\n\t\tbodyStyle: 'background-color: #dfe8f6'." +
	"\n\tcheckchange := [:node :checked |" +
	"\n\t\tnode checked: checked]." +
	"\n\tfiltr := {'taxonyText'. ''. 'pouzitiText'. ''. #metodiky. false} asDictionary.",
	null, "2013-04-11T09:30:05Z", "mp", 1);

jst.FYMapovaniPouzitiPOR.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\twithCenterLayout;" +
	"\n\t\tadd: (self innerPanel " +
	"\n\t\t\ty: 25)." +
	"\n\tself cls: '';" +
	"\n\t\tbodyCssClass: 'mapovani-pouziti'." +
	"\n\tcheckchange := [:node :checked |" +
	"\n\t\tnode checked: checked]." +
	"\n\tfiltr := {'taxonyText'. ''. 'pouzitiText'. ''. #metodiky. false} asDictionary.",
	null, "2013-12-20T14:43:29Z", "mp"); //fytoportal-ior-edit

jst.FYMapovaniPouzitiPOR.addMethod("activateEvent", "", "events", 
	"\t^ [\tFytoportal navigator ior editace label: self title." +
	"\n\t\tself appPath trackHistory: [:path | " +
	"\n\t\t\tpath switchPath]]",
	null, "2013-09-04T14:33:42Z", "mp");

jst.FYMapovaniPouzitiPOR.addMethod("buildPanelWith:", "params", "private", 
	"\t^ ExtContainer new " +
	"\n\t\twithBorderLayout;" +
	"\n\t\tadd: (self filtrPanelPro: params first);" +
	"\n\t\tadd: (self instVarNamed: params first put: (FYTreePanel new " +
	"\n\t\t\ttitle: params third;" +
	"\n\t\t\tsingleExpand: false;" +
	"\n\t\t\tborder: true;" +
	"\n\t\t\tregion: (ExtRegion center minHeight: 200)));" +
	"\n\t\tadd: (self instVarNamed: params second put: (FYTreePanel new" +
	"\n\t\t\tborder: true;" +
	"\n\t\t\tregion: (ExtSplitRegion south minHeight: 70); " +
	"\n\t\t\theight: 200));" +
	"\n\t\tyourself",
	null, "2013-04-11T21:28:13Z", "mp", 1);

jst.FYMapovaniPouzitiPOR.addMethod("buildPanelWith:", "params", "private", 
	"\t^ ExtContainer new " +
	"\n\t\twithBorderLayout;" +
	"\n\t\tadd: (self filtrPanelPro: params first);" +
	"\n\t\tadd: (self instVarNamed: params first put: (FYTreePanel new " +
	"\n\t\t\ttitle: params third;" +
	"\n\t\t\tsingleExpand: false;" +
	"\n\t\t\tborder: true;" +
	"\n\t\t\tregion: (ExtRegion center minHeight: 200)));" +
	"\n\t\tadd: (self instVarNamed: params second put: (FYTreePanel new" +
	"\n\t\t\ttitle: params fourth;" +
	"\n\t\t\tborder: true;" +
	"\n\t\t\tregion: (ExtSplitRegion south minHeight: 70); " +
	"\n\t\t\theight: 200));" +
	"\n\t\tyourself",
	null, "2014-02-20T13:33:14Z", "mp"); //fytoportal-ior-edit

jst.FYMapovaniPouzitiPOR.addMethod("innerPanel", "", "private", 
	"\t^ ExtPanel new" +
	"\n\t\tborder: false;" +
	"\n\t\twithBorderLayout;" +
	"\n\t\twidth: 1000;" +
	"\n\t\theight: 650;" +
	"\n\t\tadd: (ExtToolbar new " +
	"\n\t\t\tregion: #north;" +
	"\n\t\t\theight: 29;" +
	"\n\t\t\tstyle: 'border-width: 1px';" +
	"\n\t\t\tadd: (ulozitBtn := ExtButton new text: 'Uložit změny'; on: #click do: [self ulozZmeny]);" +
	"\n\t\t\taddSpace: 3;" +
	"\n\t\t\tadd: (stornoBtn := ExtButton new text: 'Zahodit změny'; on: #click do: [self zahodZmeny]);" +
	"\n\t\t\tyourself);" +
	"\n\t\tadd: ((self buildPanelWith: #(taxony taxonyDetail 'Dostupné taxony'))" +
	"\n\t\t\tregion: (ExtSplitRegion west minWidth: 200); " +
	"\n\t\t\twidth: 495);" +
	"\n\t\tadd: ((self buildPanelWith: #(pouziti pouzitiDetail 'Platná použití přípravků v registru POR'))" +
	"\n\t\t\tregion: (ExtRegion center minWidth: 200));" +
	"\n\t\tyourself",
	null, "2013-04-05T08:36:30Z", "mp", 1);

jst.FYMapovaniPouzitiPOR.addMethod("innerPanel", "", "private", 
	"\t^ ExtPanel new" +
	"\n\t\tborder: false;" +
	"\n\t\twithBorderLayout;" +
	"\n\t\twidth: 1000;" +
	"\n\t\theight: 650;" +
	"\n\t\tadd: (ExtToolbar new " +
	"\n\t\t\tregion: #north;" +
	"\n\t\t\theight: 29;" +
	"\n\t\t\tstyle: 'border-width: 1px';" +
	"\n\t\t\tadd: (ulozitBtn := ExtButton new " +
	"\n\t\t\t\ttext: 'Uložit změny'; " +
	"\n\t\t\t\ticonCls: #'btn-save'; " +
	"\n\t\t\t\ton: #click do: [self ulozZmeny]);" +
	"\n\t\t\taddSpace: 3;" +
	"\n\t\t\tadd: (stornoBtn := ExtButton new " +
	"\n\t\t\t\ttext: 'Zahodit změny'; " +
	"\n\t\t\t\ticonCls: #'btn-cancel'; " +
	"\n\t\t\t\ton: #click do: [self zahodZmeny]);" +
	"\n\t\t\tyourself);" +
	"\n\t\tadd: ((self buildPanelWith: #(taxony taxonyDetail 'Dostupné taxony'))" +
	"\n\t\t\tregion: (ExtSplitRegion west minWidth: 200); " +
	"\n\t\t\twidth: 495);" +
	"\n\t\tadd: ((self buildPanelWith: #(pouziti pouzitiDetail 'Platná použití přípravků v registru POR'))" +
	"\n\t\t\tregion: (ExtRegion center minWidth: 200));" +
	"\n\t\tyourself",
	null, "2013-09-12T20:00:49Z", "mp", 2);

jst.FYMapovaniPouzitiPOR.addMethod("innerPanel", "", "private", 
	"\t^ ExtPanel new" +
	"\n\t\tborder: false;" +
	"\n\t\twithBorderLayout;" +
	"\n\t\twidth: 1000;" +
	"\n\t\theight: 650;" +
	"\n\t\tadd: (ExtToolbar new " +
	"\n\t\t\tregion: #north;" +
	"\n\t\t\theight: 29;" +
	"\n\t\t\tstyle: 'border-width: 1px';" +
	"\n\t\t\tadd: (ulozitBtn := ExtButton new " +
	"\n\t\t\t\ttext: 'Uložit změny'; " +
	"\n\t\t\t\ticonCls: #'btn-save'; " +
	"\n\t\t\t\ton: #click do: [self ulozZmeny]);" +
	"\n\t\t\taddSpace: 3;" +
	"\n\t\t\tadd: (stornoBtn := ExtButton new " +
	"\n\t\t\t\ttext: 'Zahodit změny'; " +
	"\n\t\t\t\ticonCls: #'btn-cancel'; " +
	"\n\t\t\t\ton: #click do: [self zahodZmeny]);" +
	"\n\t\t\tyourself);" +
	"\n\t\tadd: ((self buildPanelWith: #(taxony taxonyDetail " +
	"\n\t\t\t'Dostupné taxony' 'Všechna nalezená použití (k vybranému taxonu)'))" +
	"\n\t\t\tregion: (ExtSplitRegion west minWidth: 200); " +
	"\n\t\t\twidth: 495);" +
	"\n\t\tadd: ((self buildPanelWith: #(pouziti pouzitiDetail " +
	"\n\t\t\t'Platná použití přípravků v registru POR' 'Ručně namapované taxony (k vybranému použití)'))" +
	"\n\t\t\tregion: (ExtRegion center minWidth: 200));" +
	"\n\t\tyourself",
	null, "2014-02-20T16:36:39Z", "mp"); //fytoportal-ior-edit

jst.FYMapovaniPouzitiPOR.addMethod("filtrPanelPro:", "pref", "private", 
	"\t| panel text |" +
	"\n\tpanel := ExtContainer new" +
	"\n\t\tregion: #north;" +
	"\n\t\tcls: 'x-panel-mc';" +
	"\n\t\tstyle: 'padding: 3px 5px';" +
	"\n\t\tlayout: (ExtHBoxLayout new withMiddleAlign);" +
	"\n\t\tadd: (ExtBoxComponent new contents: 'Filtr'; style: 'padding-right: 5px');" +
	"\n\t\tadd: (text := ExtTextField new width: 150; " +
	"\n\t\t\ton: #specialkey do: [:field :ev | ev enterPressed ifTrue: [" +
	"\n\t\t\t\tfiltr at: pref, 'Text' put: field value. " +
	"\n\t\t\t\tself perform: pref, 'Filtruj']]);" +
	"\n\t\theight: 30." +
	"\n\tpref = #taxony ifTrue: [panel " +
	"\n\t\tadd: (ExtBoxComponent new width: 5);" +
	"\n\t\tadd: (ExtCheckbox new boxLabel: 'pouze taxony metodik';" +
	"\n\t\t\ton: #check do: [:rcv :checked | " +
	"\n\t\t\t\tfiltr at: #taxonyText put: text value." +
	"\n\t\t\t\tfiltr at: #metodiky put: checked. " +
	"\n\t\t\t\t[self perform: pref, 'Filtruj'] delayed: 10])" +
	"\n\t] ifFalse: [" +
	"\n\t\tpanel add: (ExtBoxComponent new " +
	"\n\t\t\tcontents: 'EPPO kód je nutno zadat přesně'; " +
	"\n\t\t\tstyle: 'padding-left: 5px; font-style: italic')]." +
	"\n\t^ panel",
	null, "2013-04-11T15:37:11Z", "mp");

jst.FYMapovaniPouzitiPOR.addMethod("typ:", "aString", "accessing", 
	"\ttyp := aString",
	null, "2013-04-02T15:33:54Z", "mp");

jst.FYMapovaniPouzitiPOR.addMethod("appPath", "", "accessing", 
	"\t^ Fytoportal navigator ior editacePouziti: typ",
	null, "2013-04-02T15:34:23Z", "mp");

jst.FYMapovaniPouzitiPOR.addMethod("defaultIconCls", "", "private", 
	"\t^  'icon-', typ asLowercase",
	null, "2013-04-04T14:42:11Z", "mp");

jst.FYMapovaniPouzitiPOR.addMethod("taxonNodeOn:", "taxon", "private", 
	"\t^ ExtTreeNode new " +
	"\n\t\tleaf: true;" +
	"\n\t\tchecked: false;" +
	"\n\t\ticonCls: self defaultIconCls;" +
	"\n\t\ton: #checkchange do: checkchange;" +
	"\n\t\tid: taxon id;" +
	"\n\t\ttext: taxon nazevKody;" +
	"\n\t\tlink: taxon",
	null, "2013-04-11T20:10:42Z", "mp");

jst.FYMapovaniPouzitiPOR.addMethod("taxonyLoader", "", "private", 
	"\t^ ExtTreeLoader couchdb" +
	"\n\t\tdataUrl: (Fytoportal data perform: typ) cesky url;" +
	"\n\t\tnodeCreator: [:attr | | kody taxon |" +
	"\n\t\t\ttaxon := FYTaxon newFrom: (attr at: #value) asJsObject." +
	"\n\t\t\ttaxon " +
	"\n\t\t\t\tid: (attr at: #id);" +
	"\n\t\t\t\tcesky: (attr at: #key)." +
	"\n\t\t\tself taxonNodeOn: taxon]",
	null, "2013-04-11T20:10:06Z", "mp");

/*
jst.FYMapovaniPouzitiPOR.addMethod("taxonyDetailLoader", "", "private", 
	"\t| zmenaPouziti vyrazena |" +
	"\n\t\"do taxon>>zmeny si schovam vyrazena pouziti\"" +
	"\n\tzmenaPouziti := [:node :checked | " +
	"\n\t\tnode checked: checked." +
	"\n\t\ttaxony selectedItem zmeny: (node parentNode children select: [:ch |" +
	"\n\t\t\tch checked not] thenCollect: [:ch | ch id])]." +
	"\n\tvyrazena := #()." +
	"\n\t^ ExtTreeLoader couchdb" +
	"\n\t\tdataUrl: (Fytoportal data pouzitiPOR mapovaniPro: typ) selectKeys url;" +
	"\n\t\ton: #beforeload do: [:loader :node | taxony selectedItem " +
	"\n\t\t\tifNotNilDo: [:taxon |" +
	"\n\t\t\t\tvyrazena := taxon zmeny asCollection." +
	"\n\t\t\t\tloader parameterAt: #keys put: (Fytoportal data epptKody pridejNadrazene: taxon kody)]" +
	"\n\t\t\tifNil: [loader parameterAt: #keys put: #()]];" +
	"\n\t\tnodeCreator: [:attr |" +
	"\n\t\t\tExtAsyncTreeNode new " +
	"\n\t\t\t\tid: (attr at: #id);" +
	"\n\t\t\t\tleaf: true;" +
	"\n\t\t\t\tchecked: (vyrazena includes: (attr at: #id)) not;" +
	"\n\t\t\t\ton: #checkchange do: zmenaPouziti;" +
	"\n\t\t\t\ttext: (attr at: #value)" +
	"\n\t\t]",
	null, "2013-04-18T07:57:21Z", "mp");
*/
jst.FYMapovaniPouzitiPOR.addMethod("taxonyDetailLoader", "", "private", 
	"\t| zmenaPouziti vyrazena |" +
	"\n\t\"do taxon>>zmeny si schovam vyrazena pouziti\"" +
	"\n\tzmenaPouziti := [:node :checked | " +
	"\n\t\tnode checked: checked." +
	"\n\t\ttaxony selectedItem zmeny: (node parentNode children select: [:ch |" +
	"\n\t\t\tch checked not] thenCollect: [:ch | ch id])]." +
	"\n\tvyrazena := #()." +
	"\n\t^ ExtTreeLoader couchdb" +
	"\n\t\tdataUrl: (Fytoportal data pouzitiPOR mapovaniPro: typ) url;" +
	"\n\t\ton: #beforeload do: [:loader :node | taxony selectedItem " +
	"\n\t\t\tifNotNilDo: [:taxon |" +
	"\n\t\t\t\tvyrazena := taxon zmeny asCollection." +
	"\n\t\t\t\tloader parameterAt: #keys put: (Fytoportal data epptKody pridejNadrazene: taxon kody)]" +
	"\n\t\t\tifNil: [loader parameterAt: #keys put: #()]];" +
	"\n\t\tnodeCreator: [:attr |" +
	"\n\t\t\tExtAsyncTreeNode new " +
	"\n\t\t\t\tid: (attr at: #id);" +
	"\n\t\t\t\tleaf: true;" +
	"\n\t\t\t\tchecked: (vyrazena includes: (attr at: #id)) not;" +
	"\n\t\t\t\ton: #checkchange do: zmenaPouziti;" +
	"\n\t\t\t\ttext: (attr at: #value)" +
	"\n\t\t]",
	null, "2013-05-17T08:28:43Z", "mp");

/*
jst.FYMapovaniPouzitiPOR.addMethod("pouzitiLoader", "", "private", 
	"\t| detailLoader |" +
	"\n\tdetailLoader:= ExtTreeLoader new" +
	"\n\t\trequestMethod: 'GET';" +
	"\n\t\tdataUrl: '#';" +
	"\n\t\tresponseDataExtractor: [:loader :node :respDict |" +
	"\n\t\t\tnode link bayerKody collect: [:kod |" +
	"\n\t\t\t\tkod -> (node link mimoKody includes: kod) not]];" +
	"\n\t\tnodeCreator: [:assoc | ExtTreeNode new " +
	"\n\t\t\tleaf: true; " +
	"\n\t\t\tchecked: assoc value;" +
	"\n\t\t\ton: #checkchange do: checkchange;" +
	"\n\t\t\ttext: assoc key]." +
	"\n\t^ ExtTreeLoader couchdb" +
	"\n\t\tdataUrl: (Fytoportal data pouzitiPOR perform: typ) url;" +
	"\n\t\tnodeCreator: [:attr | | pouz |" +
	"\n\t\t\tpouz := PORPouzitiPrip newFrom: (attr at: #value) asJsObject." +
	"\n\t\t\tExtAsyncTreeNode new " +
	"\n\t\t\t\tid: (attr at: #id);" +
	"\n\t\t\t\tleaf: pouz bayerKody isEmptyOrNil;" +
	"\n\t\t\t\tchecked: false;" +
	"\n\t\t\t\ton: #checkchange do: checkchange;" +
	"\n\t\t\t\ttext: (attr at: #key);" +
	"\n\t\t\t\tlink: pouz; \"kody, mapovani,mimo,mimoZmena\"" +
	"\n\t\t\t\tloader: detailLoader" +
	"\n\t\t]",
	null, "2013-04-12T08:40:24Z", "mp");

jst.FYMapovaniPouzitiPOR.addMethod("pouzitiLoader", "", "private", 
	"\t| detailLoader |" +
	"\n\tdetailLoader:= ExtTreeLoader new" +
	"\n\t\trequestMethod: 'GET';" +
	"\n\t\tdataUrl: '#';" +
	"\n\t\tnodeParameter: nil;" +
	"\n\t\tresponseDataExtractor: [:loader :node :respDict |" +
	"\n\t\t\tnode link bayerKody collect: [:kod |" +
	"\n\t\t\t\tkod -> (node link mimoKody includes: kod) not]];" +
	"\n\t\tnodeCreator: [:assoc | ExtTreeNode new " +
	"\n\t\t\tleaf: true; " +
	"\n\t\t\tchecked: assoc value;" +
	"\n\t\t\ton: #checkchange do: checkchange;" +
	"\n\t\t\ttext: assoc key]." +
	"\n\t^ ExtTreeLoader couchdb" +
	"\n\t\tdataUrl: (Fytoportal data pouzitiPOR perform: typ) url;" +
	"\n\t\tnodeCreator: [:attr | | pouz |" +
	"\n\t\t\tpouz := PORPouzitiPrip newFrom: (attr at: #value) asJsObject." +
	"\n\t\t\tExtAsyncTreeNode new " +
	"\n\t\t\t\tid: (attr at: #id);" +
	"\n\t\t\t\tleaf: pouz bayerKody isEmptyOrNil;" +
	"\n\t\t\t\tchecked: false;" +
	"\n\t\t\t\ton: #checkchange do: checkchange;" +
	"\n\t\t\t\ttext: (attr at: #key);" +
	"\n\t\t\t\tlink: pouz; \"kody, mapovani,mimo,mimoZmena\"" +
	"\n\t\t\t\tloader: detailLoader" +
	"\n\t\t]",
	null, "2013-05-13T08:32:20Z", "mp");

jst.FYMapovaniPouzitiPOR.addMethod("pouzitiLoader", "", "private", 
	"\t| detailLoader |" +
	"\n\tdetailLoader:= ExtTreeLoader new" +
	"\n\t\trequestMethod: 'GET';" +
	"\n\t\tdataUrl: '#';" +
	"\n\t\tnodeParameter: nil;" +
	"\n\t\tresponseDataExtractor: [:loader :node :respDict |" +
	"\n\t\t\tnode link bayerKody collect: [:kod |" +
	"\n\t\t\t\tkod -> (node link mimoKody includes: kod) not]];" +
	"\n\t\tnodeCreator: [:assoc | ExtTreeNode new " +
	"\n\t\t\tleaf: true; " +
	"\n\t\t\tchecked: assoc value;" +
	"\n\t\t\ton: #checkchange do: checkchange;" +
	"\n\t\t\ttext: assoc key]." +
	"\n\tExtAjax current disableCaching ifTrue: [" +
	"\n\t\t\"musim docasne vypnout parametr _dc - IE9 nesnese v url parametry za #\"" +
	"\n\t\tdetailLoader" +
	"\n\t\t\ton: #beforeload do: [ExtAjax current disableCaching: false];" +
	"\n\t\t\ton: #load do: [ExtAjax current disableCaching: true];" +
	"\n\t\t\ton: #loadexception do: [ExtAjax current disableCaching: true]" +
	"\n\t]." +
	"\n\t^ ExtTreeLoader couchdb" +
	"\n\t\tdataUrl: (Fytoportal data pouzitiPOR perform: typ) url;" +
	"\n\t\tnodeCreator: [:attr | | pouz |" +
	"\n\t\t\tpouz := PORPouzitiPrip newFrom: (attr at: #value) asJsObject." +
	"\n\t\t\tExtAsyncTreeNode new " +
	"\n\t\t\t\tid: (attr at: #id);" +
	"\n\t\t\t\tleaf: pouz bayerKody isEmptyOrNil;" +
	"\n\t\t\t\tchecked: false;" +
	"\n\t\t\t\ton: #checkchange do: checkchange;" +
	"\n\t\t\t\ttext: (attr at: #key);" +
	"\n\t\t\t\tlink: pouz; \"kody, mapovani,mimo,mimoZmena\"" +
	"\n\t\t\t\tloader: detailLoader" +
	"\n\t\t]",
	null, "2013-05-13T12:45:01Z", "mp");
*/
jst.FYMapovaniPouzitiPOR.addMethod("pouzitiLoader", "", "private", 
	"\t| detailLoader |" +
	"\n\tdetailLoader:= ExtTreeLoader couchdb" +
	"\n\t\tdataUrl: Fytoportal data emptyView url;" +
	"\n\t\tresponseDataExtractor: [:loader :node :respDict |" +
	"\n\t\t\tnode link bayerKody collect: [:kod |" +
	"\n\t\t\t\tkod -> (node link mimoKody includes: kod) not]];" +
	"\n\t\tnodeCreator: [:assoc | ExtTreeNode new " +
	"\n\t\t\tleaf: true; " +
	"\n\t\t\tchecked: assoc value;" +
	"\n\t\t\ton: #checkchange do: checkchange;" +
	"\n\t\t\ttext: assoc key]." +
	"\n\t^ ExtTreeLoader couchdb" +
	"\n\t\tdataUrl: (Fytoportal data pouzitiPOR perform: typ) url;" +
	"\n\t\tnodeCreator: [:attr | | pouz |" +
	"\n\t\t\tpouz := PORPouzitiPrip newFrom: (attr at: #value) asJsObject." +
	"\n\t\t\tExtAsyncTreeNode new " +
	"\n\t\t\t\tid: (attr at: #id);" +
	"\n\t\t\t\tleaf: pouz bayerKody isEmptyOrNil;" +
	"\n\t\t\t\tchecked: false;" +
	"\n\t\t\t\ton: #checkchange do: checkchange;" +
	"\n\t\t\t\ttext: (attr at: #key);" +
	"\n\t\t\t\tlink: pouz; \"kody, mapovani,mimo,mimoZmena\"" +
	"\n\t\t\t\tloader: detailLoader" +
	"\n\t\t]",
	null, "2013-05-13T14:49:31Z", "mp");

/*
jst.FYMapovaniPouzitiPOR.addMethod("pouzitiDetailLoader", "", "private", 
	"\t^ ExtTreeLoader couchdb" +
	"\n\t\tdataUrl: (Fytoportal data perform: typ) podleKodu selectKeys url;" +
	"\n\t\ton: #beforeload do: [:loader :node | | kody |" +
	"\n\t\t\tkody := pouziti selectedItem ifNotNilDo: [:pouz |" +
	"\n\t\t\t\tpouz mapovani] ifNil: #()." +
	"\n\t\t\tloader parameterAt: #keys put: kody];" +
	"\n\t\tnodeCreator: [:attr |" +
	"\n\t\t\tExtAsyncTreeNode new " +
	"\n\t\t\t\tid: (attr at: #id);" +
	"\n\t\t\t\tleaf: true;" +
	"\n\t\t\t\ticonCls: self defaultIconCls;" +
	"\n\t\t\t\t\"checked: true;\"" +
	"\n\t\t\t\ttext: (attr at: #value), ' (', (attr at: #key), ')'" +
	"\n\t\t]",
	null, "2013-04-18T07:56:19Z", "mp");
*/
jst.FYMapovaniPouzitiPOR.addMethod("pouzitiDetailLoader", "", "private", 
	"\t^ ExtTreeLoader couchdb" +
	"\n\t\tdataUrl: (Fytoportal data perform: typ) podleKodu url;" +
	"\n\t\ton: #beforeload do: [:loader :node | | kody |" +
	"\n\t\t\tkody := pouziti selectedItem ifNotNilDo: [:pouz |" +
	"\n\t\t\t\tpouz mapovani] ifNil: #()." +
	"\n\t\t\tloader parameterAt: #keys put: kody];" +
	"\n\t\tnodeCreator: [:attr |" +
	"\n\t\t\tExtAsyncTreeNode new " +
	"\n\t\t\t\tid: (attr at: #id);" +
	"\n\t\t\t\tleaf: true;" +
	"\n\t\t\t\ticonCls: self defaultIconCls;" +
	"\n\t\t\t\t\"checked: true;\"" +
	"\n\t\t\t\ttext: (attr at: #value), ' (', (attr at: #key), ')'" +
	"\n\t\t]",
	null, "2013-05-17T08:31:07Z", "mp");

jst.FYMapovaniPouzitiPOR.addMethod("beforerenderEvent", "", "events", 
	"\t^ [\ttaxony root: (ExtAsyncTreeNode new " +
	"\n\t\t\tloader: self taxonyLoader)." +
	"\n\t\ttaxonyDetail root: (ExtAsyncTreeNode new " +
	"\n\t\t\tloader: self taxonyDetailLoader)." +
	"\n\t\tpouziti root: (ExtAsyncTreeNode new " +
	"\n\t\t\tloader: self pouzitiLoader)." +
	"\n\t\tpouzitiDetail root: (ExtAsyncTreeNode new " +
	"\n\t\t\tloader: self pouzitiDetailLoader)." +
	"\n\t]",
	null, "2013-04-08T09:10:26Z", "mp");

jst.FYMapovaniPouzitiPOR.addMethod("installListeners", "", "initialization", 
	"\tsuper installListeners." +
	"\n\tself installListenersOn: taxony selectionModel prefix: #taxon.\t" +
	"\n\tself installListenersOn: pouziti selectionModel prefix: #pouziti.",
	null, "2013-04-03T21:07:30Z", "mp", 1);

jst.FYMapovaniPouzitiPOR.addMethod("installListeners", "", "initialization", 
	"\tsuper installListeners." +
	"\n\tself installListenersOn: taxony selectionModel prefix: #taxon.\t" +
	"\n\tself installListenersOn: pouziti selectionModel prefix: #pouziti." +
	"\n\t(Fytoportal navigator ior editacePouziti: typ)" +
	"\n\t\tonForceStop: [:path | " +
	"\n\t\t\tself activate." +
	"\n\t\t\tpath activatePath]",
	null, "2013-08-21T10:08:22Z", "mp"); //fytoportal-ior-edit

jst.FYMapovaniPouzitiPOR.addMethod("taxonselectionchangeEvent", "", "events", 
	"\t^ [:m :node | taxonyDetail root reload]",
	null, "2013-04-04T14:53:04Z", "mp");

jst.FYMapovaniPouzitiPOR.addMethod("pouzitiselectionchangeEvent", "", "events", 
	"\t^ [:m :node | pouzitiDetail root reload]",
	null, "2013-04-08T09:10:54Z", "mp");

jst.FYMapovaniPouzitiPOR.addMethod("zahodZmeny", "", "actions", 
	"\t(Array with: taxony with: pouziti) do: [:p |" +
	"\n\t\tp root children do: [:node |" +
	"\n\t\t\t(p == taxony and: [node link zmeny isEmptyOrNil not]) ifTrue: [" +
	"\n\t\t\t\tnode link zmeny: nil." +
	"\n\t\t\t\t(node checked not and: [node == p selectionModel selectedNode]) ifTrue: [" +
	"\n\t\t\t\t\ttaxonyDetail root reload]" +
	"\n\t\t\t]." +
	"\n\t\t\tnode checked ifTrue: [ | select newNode |" +
	"\n\t\t\t\tnode checked: false." +
	"\n\t\t\t\tselect := node == p selectionModel selectedNode." +
	"\n\t\t\t\tselect ifTrue: [" +
	"\n\t\t\t\t\tp selectionModel clearSelections]." +
	"\n\t\t\t\tnewNode := node copy." +
	"\n\t\t\t\tp root replaceChild: node with: newNode." +
	"\n\t\t\t\tselect ifTrue: [" +
	"\n\t\t\t\t\tp selectionModel selectNode: newNode]" +
	"\n\t\t\t]" +
	"\n\t\t]" +
	"\n\t]",
	null, "2013-04-10T15:44:35Z", "mp");

jst.FYMapovaniPouzitiPOR.addMethod("ulozZmeny", "", "actions", 
	"\t| vyberPouziti vyradPouziti kody zmeny |" +
	"\n\tkody := SortedCollection new." +
	"\n\tvyradPouziti := OrderedCollection new." +
	"\n\ttaxony root children do: [:ea | " +
	"\n\t\tea checked ifTrue: [ea link kody do: [:kod |" +
	"\n\t\t\tkody addUnique: kod]]." +
	"\n\t\tea link zmeny isEmptyOrNil ifFalse: [ea link zmeny do: [:id |" +
	"\n\t\t\tvyradPouziti add: id -> ea link]]" +
	"\n\t]." +
	"\n\tvyberPouziti := pouziti root children select: [:n | " +
	"\n\t\tn checked or: [n link kodyZmeneny: n] or: [vyradPouziti anySatisfy: [:ea | ea key = n id]]]." +
	"\n\tvyberPouziti ifEmpty: [" +
	"\n\t\t^ self inform: 'Použití POR nejsou označena!'->'Označte použití POR, jejichž mapování chcete změnit.']." +
	"\n\t((vyberPouziti anySatisfy: [:n | n checked]) and: [kody isEmpty]) ifTrue: [" +
	"\n\t\t\"k zaskrtnutym pouzitim musi existovat zaskrtnute kody\"" +
	"\n\t\t^ self inform: 'Taxony nejsou označeny!'->'Označte taxony, které odpovídají označeným použitím POR.']." +
	"\n\tzmeny := 0." +
	"\n\tvyberPouziti do: [:node | " +
	"\n\t\t| pouz mapovani |" +
	"\n\t\tpouz := node link." +
	"\n\t\tmapovani := pouz mapovani asSortedCollection." +
	"\n\t\tvyradPouziti do: [:ea | \tea key = node id ifTrue: [" +
	"\n\t\t\tea value kody do: [:kod | " +
	"\n\t\t\t\tmapovani remove: kod ifAbsent: nil]]]." +
	"\n\t\t\"nove kody jen pridam do stavajiciho mapovani\"" +
	"\n\t\tkody do: [:kod | mapovani addUnique: kod]." +
	"\n\t\t(mapovani ~= pouz mapovani asSortedCollection or: [pouz kodyZmeneny: node]) ifTrue: [" +
	"\n\t\t\tpouz := Fytoportal data por loadObject: node id." +
	"\n\t\t\tpouz mapovani: mapovani." +
	"\n\t\t\tpouz mimoZmena: (node children select: [:ch | ch checked not] thenCollect: [:ch | ch text])." +
	"\n\t\t\tpouz mimoZmena asSortedCollection = pouz mimo asSortedCollection ifTrue: [" +
	"\n\t\t\t\t\"mimoZmena neni potreba nastavovat, je-li prazdna ci obsahuje-li stejne kody\"" +
	"\n\t\t\t\tpouz mimoZmena: nil]." +
	"\n\t\t\tFytoportal data por storeObject: pouz." +
	"\n\t\t\tnode link: pouz." +
	"\n\t\t\tvyradPouziti do: [:ea | \tea key = node id ifTrue: [" +
	"\n\t\t\t\tea value zmeny: nil]]." +
	"\n\t\t\tzmeny := zmeny + 1]" +
	"\n\t]." +
	"\n\tzmeny > 0 ifTrue: [" +
	"\n\t\tself inform: 'Úspěch'->'Změny mapování byly uloženy do databáze'." +
	"\n\t\t{taxony. pouziti} do: [:ea | | node |" +
	"\n\t\t\tnode := ea selectionModel selectedNode." +
	"\n\t\t\t(node notNil and: [node checked not]) ifTrue: [" +
	"\n\t\t\t\t\"pro checked node zaridi refresh #zahodZmeny\"" +
	"\n\t\t\t\tea selectionModel" +
	"\n\t\t\t\t\tclearSelections;" +
	"\n\t\t\t\t\tselectNode: node" +
	"\n\t\t\t]" +
	"\n\t\t]." +
	"\n\t\tself broadcastEvent: #zmenaMapovaniPOR." +
	"\n\t] ifFalse: [" +
	"\n\t\tself inform: 'Beze změn'->'Uložené mapování nebylo změněno']." +
	"\n\tself zahodZmeny",
	null, "2013-05-06T12:41:33Z", "mp");

/*
jst.FYMapovaniPouzitiPOR.addMethod("filtruj:data:", "treeName data", "actions", 
	"\t| nodes tree |" +
	"\n\tnodes := data." +
	"\n\t(filtr at: treeName, 'Text') ifNotEmptyDo: [:text | | rx |" +
	"\n\t\trx := RegExp new ignoreCase: true; substring: text." +
	"\n\t\tnodes := data select: [:node | rx match: node text]" +
	"\n\t]." +
	"\n\ttree := self instVarNamed: treeName." +
	"\n\ttree " +
	"\n\t\tkeepSelectedDuring: [" +
	"\n\t\t\ttree root: (ExtTreeNode new children: (nodes collect: [:ch | ch copy]))] " +
	"\n\t\tsilently: false." +
	"\n\ttree selectedNode ifNil: [" +
	"\n\t\t(self instVarNamed: treeName, 'Detail') root reload]",
	null, "2013-04-12T07:23:27Z", "mp");
*/
jst.FYMapovaniPouzitiPOR.addMethod("filtruj:data:", "treeName data", "actions", 
	"\t| nodes tree |" +
	"\n\tnodes := data." +
	"\n\t(filtr at: treeName, 'Text') ifNotEmptyDo: [:text | | rx |" +
	"\n\t\trx := RegExp new ignoreCase: true; substring: text." +
	"\n\t\tnodes := data select: [:node | rx match: node text]" +
	"\n\t]." +
	"\n\ttree := self instVarNamed: treeName." +
	"\n\ttree " +
	"\n\t\tkeepSelectedDuring: [" +
	"\n\t\t\ttree root: (ExtTreeNode new children: (nodes collect: [:ch | ch copy]))]" +
	"\n\t\tsilently: false ifFail: [" +
	"\n\t\t\t(self instVarNamed: treeName, 'Detail') root reload]",
	null, "2013-04-27T11:33:41Z", "mp");

jst.FYMapovaniPouzitiPOR.addMethod("pouzitiFiltruj", "", "actions", 
	"\t| data kod |" +
	"\n\tdata := filtr at: #pouziti ifAbsentPut: [pouziti root children collect: [:ch | ch copy]]." +
	"\n\tkod := (filtr at: #pouzitiText) asUppercase." +
	"\n\t(kod size > 4 and: [Fytoportal data eppt documentExists: kod]) ifTrue: [ " +
	"\n\t\t| nodes |" +
	"\n\t\tnodes := data select: [:node | node link obsahujeKod: kod]." +
	"\n\t\tpouziti keepSelectedDuring: [" +
	"\n\t\t\tpouziti root: (ExtTreeNode new children: (nodes collect: [:ch | ch copy]))] silently: false." +
	"\n\t] ifFalse: [" +
	"\n\t\tself filtruj: #pouziti data: data]",
	null, "2013-04-11T14:50:31Z", "mp", 1);

jst.FYMapovaniPouzitiPOR.addMethod("pouzitiFiltruj", "", "actions", 
	"\t| data kod |" +
	"\n\tdata := filtr at: #pouziti ifAbsentPut: [pouziti root children collect: [:ch | ch copy]]." +
	"\n\tkod := (filtr at: #pouzitiText) asUppercase." +
	"\n\t(kod size > 4 and: [Fytoportal data eppt documentExists: kod]) ifTrue: [ " +
	"\n\t\t| nodes |" +
	"\n\t\tnodes := data select: [:node | node link obsahujeKod: kod]." +
	"\n\t\tpouziti " +
	"\n\t\t\tkeepSelectedDuring: [" +
	"\n\t\t\t\tpouziti root: (ExtTreeNode new children: (nodes collect: [:ch | ch copy]))]" +
	"\n\t\t\tsilently: false ifFail: [" +
	"\n\t\t\t\tpouzitiDetail root reload]" +
	"\n\t] ifFalse: [" +
	"\n\t\tself filtruj: #pouziti data: data]",
	null, "2013-04-27T11:40:36Z", "mp", 2);

jst.FYMapovaniPouzitiPOR.addMethod("pouzitiFiltruj", "", "actions", 
	"\t| data kod |" +
	"\n\tdata := filtr at: #pouziti ifAbsentPut: [pouziti root children collect: [:ch | ch copy]]." +
	"\n\tkod := filtr at: #pouzitiText." +
	"\n\t\"pouziti obsahuji kody, ktere neexistuji v EPPT, isUppercase akceptuje i cisla\"" +
	"\n\t(kod size <= 6 and: [kod isUppercase]) ifTrue: [ " +
	"\n\t\t| nodes |" +
	"\n\t\tnodes := data select: [:node | node link obsahujeKod: kod]." +
	"\n\t\tpouziti " +
	"\n\t\t\tkeepSelectedDuring: [" +
	"\n\t\t\t\tpouziti root: (ExtTreeNode new children: (nodes collect: [:ch | ch copy]))]" +
	"\n\t\t\tsilently: false ifFail: [" +
	"\n\t\t\t\tpouzitiDetail root reload]" +
	"\n\t] ifFalse: [" +
	"\n\t\tself filtruj: #pouziti data: data]",
	null, "2014-03-19T10:39:32Z", "mp"); //fytoportal-ior-edit

jst.FYMapovaniPouzitiPOR.addMethod("taxonyFiltruj", "", "actions", 
	"\t| data |" +
	"\n\tdata := filtr at: #taxony ifAbsentPut: [taxony root children collect: [:ch | ch copy]]." +
	"\n\t(filtr at: #metodiky) ifTrue: [ | pouzTaxony |" +
	"\n\t\t\"jen taxony metodik\"" +
	"\n\t\tpouzTaxony := Fytoportal data metodiky taxony queryData collect: [:dict | dict at: #key]." +
	"\n\t\tdata := data select: [:node | pouzTaxony includes: node id]]." +
	"\n\tself filtruj: #taxony data: data\t",
	null, "2013-04-11T15:32:03Z", "mp");

jst.FYMapovaniPouzitiPOR.addMethod("zmenaPopisuTaxonu:", "taxon", "updating", 
	"\t\"taxon najdu a atualizuju ve stromu i v seznamu uzlu, pokud se uz filtrovalo\"" +
	"\n\t(Array with: taxony root children with: (filtr at: #taxony ifAbsent: #())) do: [:nodes |" +
	"\n\t \t(nodes detect: [:n | n id = taxon id] ifNone: nil) ifNotNilDo: [:node |" +
	"\n\t\t\tnode" +
	"\n\t\t\t\ttext: taxon nazevKody; " +
	"\n\t\t\t\tlink: taxon]" +
	"\n\t]." +
	"\n\ttaxony selectionModel selectedNode ifNotNilDo: [:selNode |" +
	"\n\t\tselNode id = taxon id ifTrue: [" +
	"\n\t\t\ttaxonyDetail root reload]]." +
	"\n\t\"taxon by mohl byt zobrazen i zde - vic to 'pitvat' nebudu, staci reload\"" +
	"\n\tpouziti selectionModel selectedNode ifNotNil: [" +
	"\n\t\tpouzitiDetail root reload]",
	null, "2013-04-12T07:55:48Z", "mp");

jst.FYMapovaniPouzitiPOR.addMethod("novyTaxon:", "taxon", "updating", 
	"\t| nazev |" +
	"\n\t\"novy taxon pridam do stromu i do seznamu uzlu, pokud se uz filtrovalo\"" +
	"\n\tnazev := taxon nazevKody." +
	"\n\t(Array with: taxony root children with: (filtr at: #taxony ifAbsent: #())) do: [:nodes | | i |" +
	"\n\t\ti := 1." +
	"\n\t\t[i <= nodes size and: [(nodes at: i) text <= nazev]] whileTrue: [" +
	"\n\t\t\ti := i + 1]." +
	"\n\t\ti <= nodes size" +
	"\n\t\t\tifTrue: [nodes insert: (self taxonNodeOn: taxon) before: (nodes at: i)] " +
	"\n\t\t\tifFalse: [nodes add: (self taxonNodeOn: taxon)]]",
	null, "2013-04-12T07:55:01Z", "mp", 1);

jst.FYMapovaniPouzitiPOR.addMethod("novyTaxon:", "taxon", "updating", 
	"\t| nazev |" +
	"\n\t\"novy taxon pridam do stromu i do seznamu uzlu, pokud se uz filtrovalo\"" +
	"\n\tnazev := taxon nazevKody." +
	"\n\t(Array with: taxony root children with: (filtr at: #taxony ifAbsent: #())) do: [:nodes | | i |" +
	"\n\t\ti := 1." +
	"\n\t\t[i <= nodes size and: [(nodes at: i) text <= nazev]] whileTrue: [" +
	"\n\t\t\ti := i + 1]." +
	"\n\t\ti <= nodes size" +
	"\n\t\t\tifTrue: [nodes insert: (self taxonNodeOn: taxon) before: (nodes at: i)] " +
	"\n\t\t\tifFalse: [nodes isEmpty ifFalse: [" +
	"\n\t\t\t\t\"do prazdneho filtru nepridavam\"" +
	"\n\t\t\t\tnodes add: (self taxonNodeOn: taxon)]]]",
	null, "2013-09-16T14:25:10Z", "mp"); //fytoportal-ior-edit

//*** FYMetodikaSOPopisEditor ***

jst.FYMetodikaSOPopisEditor._class.addMethod("data:", "aSymbol", "instance creation", 
	"\t^ self basicNew" +
	"\n\t\tdata: aSymbol;" +
	"\n\t\tinitialize",
	null, "2014-02-28T19:08:44Z", "mp");

jst.FYMetodikaSOPopisEditor.addMethod("data:", "aSymbol", "private", 
	"\tdata := aSymbol",
	null, "2014-02-28T19:09:17Z", "mp");

jst.FYMetodikaSOPopisEditor.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\twithCenterLayout;" +
	"\n\t\tadd: (editor := ExtFormPanel new" +
	"\n\t\t\tpadding: 5;" +
	"\n\t\t\twidth: 700;" +
	"\n\t\t\theight: 550;" +
	"\n\t\t\ty: 25)." +
	"\n\teditor" +
	"\n\t\ttrackResetOnLoad: true;" +
	"\n\t\tadd: (ExtTextField new " +
	"\n\t\t\tname: #nazev; " +
	"\n\t\t\tfieldLabel: 'Název metodiky'; " +
	"\n\t\t\tallowBlank: false; " +
	"\n\t\t\tanchor: '100%');" +
	"\n\t\tadd: ((taxony := FYVyberTaxonu" +
	"\n\t\t\turl: Fytoportal data skodlOrg doc url, '_list/store-vyber/', data" +
	"\n\t\t\ttitle: 'Taxony metodiky') height: 472)." +
	"\n\tself initButtons." +
	"\n\ttaxony store load",
	null, "2014-03-02T15:51:56Z", "mp");

jst.FYMetodikaSOPopisEditor.addMethod("initButtons", "", "initialization", 
	"\teditor buttons: {" +
	"\n\t\tExtButton new " +
	"\n\t\t\ttext: 'Přidat taxon';" +
	"\n\t\t\tbeDisabled;" +
	"\n\t\t\ttooltip: 'Přidejte taxon, pokud chybí v seznamu...';" +
	"\n\t\t\ticonCls: #'btn-add'; " +
	"\n\t\t\ton: #click do: [" +
	"\n\t\t\t\t(FYTaxonPopisEditor new asDialogOn: FYSkodlOrg new) show]." +
	"\n\t}",
	null, "2014-02-28T20:17:36Z", "mp", 1);

jst.FYMetodikaSOPopisEditor.addMethod("initButtons", "", "initialization", 
	"\teditor buttons: {" +
	"\n\t\tExtButton new " +
	"\n\t\t\ttext: 'Přidat taxon';" +
	"\n\t\t\ttooltip: 'Přidejte taxon, pokud chybí v seznamu...';" +
	"\n\t\t\ticonCls: #'btn-add'; " +
	"\n\t\t\ton: #click do: [" +
	"\n\t\t\t\t(FYTaxonPopisEditor new asDialogOn: self metodika novyTaxon) show]." +
	"\n\t}",
	null, "2014-03-03T14:34:10Z", "mp"); //fytoportal-ior-edit

jst.FYMetodikaSOPopisEditor.addMethod("isModified", "", "testing", 
	"\t^ editor form isDirty  or: [self taxonyZmeneny] or: [metodika jeZmenena]",
	null, "2014-03-02T22:02:13Z", "mp");

jst.FYMetodikaSOPopisEditor.addMethod("metodika:", "node", "accessing", 
	"\tself activate." +
	"\n\t(metNode notNil and: [metNode id = node id]) ifTrue: [" +
	"\n\t\t^ self]." +
	"\n\tself schovejZmeny." +
	"\n\tnode link ifNil: [" +
	"\n\t\tnode link: (Fytoportal db loadObject: node id)]." +
	"\n\tmetNode := node." +
	"\n\tself resetEditor",
	null, "2014-03-02T22:02:40Z", "mp", 1);

jst.FYMetodikaSOPopisEditor.addMethod("metodika:", "node", "accessing", 
	"\tnode ifNil: [" +
	"\n\t\tmetodika := nil." +
	"\n\t\teditor stopMonitoring." +
	"\n\t\ttaxony store rejectChanges." +
	"\n\t\t^ self]." +
	"\n\tself activate." +
	"\n\t(metodika notNil and: [metodika id = node id]) ifTrue: [" +
	"\n\t\ttaxony store modifiedRecords isEmpty ifFalse: [" +
	"\n\t\t\tself nactiTaxony]." +
	"\n\t\t^ self]." +
	"\n\tself schovejZmeny." +
	"\n\tnode link ifNil: [" +
	"\n\t\tnode link: (Fytoportal db loadObject: node id)]." +
	"\n\tmetodika := node link." +
	"\n\tself resetEditor",
	null, "2014-03-03T14:24:18Z", "mp"); //fytoportal-ior-edit

jst.FYMetodikaSOPopisEditor.addMethod("metodika", "", "accessing", 
	"\t^ metodika",
	null, "2014-03-02T22:02:49Z", "mp");

jst.FYMetodikaSOPopisEditor.addMethod("schovejZmeny", "", "private", 
	"\t(metNode isNil or: [self isActive not]) ifTrue: [" +
	"\n\t\t^ self]." +
	"\n\teditor form isDirty ifTrue: [" +
	"\n\t\tmetNode link nazev: (editor form values at: #nazev)]." +
	"\n\tself taxonyZmeneny ifTrue: [" +
	"\n\t\tmetNode link taxony: (taxony novyVyberPro: metNode link taxonyId)]." +
	"\n\tself oznacZmenenouMetodiku",
	null, "2014-03-02T22:06:26Z", "mp", 1);

jst.FYMetodikaSOPopisEditor.addMethod("schovejZmeny", "", "private", 
	"\t| zmeny nazev |" +
	"\n\t(metodika isNil or: [self isActive not]) ifTrue: [" +
	"\n\t\t^ self]." +
	"\n\tnazev := (editor form values at: #nazev) ifEmpty: nil." +
	"\n\t(zmeny := metodika nazev ~= nazev) ifTrue: [" +
	"\n\t\tmetodika nazev: nazev]." +
	"\n\tself taxonyZmeneny ifTrue: [" +
	"\n\t\tmetodika taxony: (taxony novyVyberPro: metodika taxonyId)." +
	"\n\t\tzmeny ifFalse: [" +
	"\n\t\t\tzmeny := true]]." +
	"\n\tzmeny ifTrue: [" +
	"\n\t\tself sendEvent: #zmenaKapitoly: with: metodika]",
	null, "2014-03-11T16:04:39Z", "mp"); //fytoportal-ior-edit

jst.FYMetodikaSOPopisEditor.addMethod("zahodZmeny", "", "private", 
	"\ttaxony store rejectChanges." +
	"\n\tmetNode link zahodZmeny." +
	"\n\tmetNode text: metNode link nazev." +
	"\n\tself resetEditor",
	null, "2014-03-02T22:08:12Z", "mp", 1);

jst.FYMetodikaSOPopisEditor.addMethod("zahodZmeny", "", "private", 
	"\ttaxony store rejectChanges." +
	"\n\tmetNode link zahodZmeny." +
	"\n\tself resetEditor." +
	"\n\tself oznacZmenenouMetodiku",
	null, "2014-03-03T08:28:07Z", "mp", 2);

jst.FYMetodikaSOPopisEditor.addMethod("zahodZmeny", "", "private", 
	"\ttaxony store rejectChanges." +
	"\n\tmetodika zahodZmeny." +
	"\n\tself resetEditor." +
	"\n\tself sendEvent: #zmenaKapitoly: with: metodika",
	null, "2014-03-11T15:02:25Z", "mp"); //fytoportal-ior-edit

jst.FYMetodikaSOPopisEditor.addMethod("resetEditor", "", "private", 
	"\teditor stopMonitoring." +
	"\n\teditor form values: (Dictionary new at: #nazev put: metNode link nazev; yourself)." +
	"\n\ttaxony store " +
	"\n\t\trejectChanges;" +
	"\n\t\tparameterAt: #vyber put: (metNode link taxonyId asTextualList: #yourself separator: ','); " +
	"\n\t\tload." +
	"\n\teditor startMonitoring.",
	null, "2014-03-01T23:37:41Z", "mp", 1);

jst.FYMetodikaSOPopisEditor.addMethod("resetEditor", "", "private", 
	"\teditor stopMonitoring." +
	"\n\teditor form values: (Dictionary new at: #nazev put: metodika nazev; yourself)." +
	"\n\tself nactiTaxony." +
	"\n\teditor startMonitoring.",
	null, "2014-03-03T13:39:17Z", "mp"); //fytoportal-ior-edit

jst.FYMetodikaSOPopisEditor.addMethod("nactiTaxony", "", "private", 
	"\ttaxony store " +
	"\n\t\trejectChanges;" +
	"\n\t\tparameterAt: #vyber put: (metodika taxonyId asTextualList: #yourself separator: ','); " +
	"\n\t\tload",
	null, "2014-03-03T13:39:05Z", "mp");

jst.FYMetodikaSOPopisEditor.addMethod("taxonyZmeneny", "", "testing", 
	"\t^ taxony store modifiedRecords anySatisfy: [:rec |" +
	"\n\t\t(rec data at: #vyber) ~= (metodika taxonyId includes: rec id)]",
	null, "2014-03-02T10:12:18Z", "mp");

/* nahrazeno zpravou #zmenaKapitoly
jst.FYMetodikaSOPopisEditor.addMethod("oznacZmenenouMetodiku", "", "private", 
	"\tmetNode ifNotNil: [" +
	"\n\t\tmetNode text: (metNode link nazev ifEmpty: ['(nová metodika)'])." +
	"\n\t\tmetNode link jeZmenena ifTrue: [" +
	"\n\t\t\tmetNode text: metNode text, '*']" +
	"\n\t]",
	null, "2014-03-02T22:05:05Z", "mp", 1);

jst.FYMetodikaSOPopisEditor.addMethod("oznacZmenenouMetodiku", "", "private", 
	"\tmetNode ifNotNil: [" +
	"\n\t\tmetNode text: (metNode link nazev ifNil: ['(nová metodika)'])." +
	"\n\t\tmetNode text ifEmpty: [" +
	"\n\t\t\tmetNode text: '(doplňte název)']." +
	"\n\t\tmetNode link jeZmenena ifTrue: [" +
	"\n\t\t\tmetNode text: metNode text, '*']" +
	"\n\t]",
	null, "2014-03-03T08:37:58Z", "mp"); //fytoportal-ior-edit
*/

jst.FYMetodikaSOPopisEditor.addMethod("isValid", "", "testing", 
	"\teditor form isValid ifFalse: [" +
	"\n\t\tself activate." +
	"\n\t\tself inform: 'Chyba!'->'Doplňte název metodiky'." +
	"\n\t\t^ false]." +
	"\n\tmetodika taxonyId ifEmpty: [" +
	"\n\t\tself activate." +
	"\n\t\tself inform: 'Chyba!'->'Označte alespoň jeden taxon'." +
	"\n\t\t^ false]." +
	"\n\t^ true",
	null, "2014-03-03T11:04:07Z", "mp");

jst.FYMetodikaSOPopisEditor.addMethod("zmenaMetodikySO:", "met", "updating", 
	"\t(self isActive and: [metodika == met] and: [taxony store modifiedRecords isEmpty not]) ifTrue: [" +
	"\n\t\tself nactiTaxony]",
	null, "2014-03-03T13:48:59Z", "mp", 1);

jst.FYMetodikaSOPopisEditor.addMethod("zmenaMetodikySO:", "met", "updating", 
	"\tmetodika = met ifTrue: [" +
	"\n\t\t\"musim aktualizovat i v pripade, ze neni aktivni\"" +
	"\n\t\tmetodika := met." +
	"\n\t\tself resetEditor]",
	null, "2014-03-12T09:36:21Z", "mp"); //fytoportal-ior-edit

jst.FYMetodikaSOPopisEditor.addMethod("novyTaxon:", "anObject", "updating", 
	"\tanObject jePlodina ifFalse: [" +
	"\n\t\tself schovejZmeny." +
	"\n\t\ttaxony store reload]",
	null, "2014-03-03T14:38:41Z", "mp");

jst.FYMetodikaSOPopisEditor.addMethod("zmenaPopisuTaxonu:", "taxon", "updating", 
	"\t\"pro jednoduchost je reakce stejna\"" +
	"\n\tself novyTaxon: taxon",
	null, "2014-03-03T14:38:49Z", "mp");
