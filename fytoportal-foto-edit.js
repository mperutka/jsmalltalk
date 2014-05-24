/*
 * Copyright (c) 2012 Michal Perutka <michal.perutka@gmail.com>
 *
 *
 * Depends on jst-fytoportal-foto
 */

jst.currentJsFile = "fytoportal-foto-edit";

// *** CLASSES ***

jst.ExtPanel.subclass("FYTaxonEditor", "editor taxon jinyTaxon dialog", "", "", "SRS-Fytoportal-foto-edit");

jst.ExtGridPanel.subclass("FYVyberTaxonu", "", "", "", "SRS-Fytoportal-foto-edit");

jst.FYTaxonEditor.subclass("FYTaxonPopisEditor", "addBtn deleteBtn popisPlodiny zarazeniSO vazby puvodciChoroby", "", "", "SRS-Fytoportal-foto-edit");
jst.FYTaxonEditor.subclass("FYVazbyEditor", "skupinyPlodin hostitele plodiny nadrazenaPlodina addBtn", "", "", "SRS-Fytoportal-foto-edit");
jst.FYTaxonEditor.subclass("FYFotoEditor", "plodina skodlOrg fotka jinaFotka novaFotka info fieldSO upload preview deleteBtn", "", "", "SRS-Fytoportal-foto-edit");

jst.ExtTabPanel.subclass("FYTaxonPopisTabPanel", "popis editor editorVazeb editorFoto", "", "", "SRS-Fytoportal-foto-edit");

jst.ExtComboBox.subclass("FYTaxonZarazeni", "", "", "", "SRS-Fytoportal-foto-edit");

//extensions

//FYSkodlOrg

jst.FYSkodlOrg.addMethod("abionozy", "", "*srs-fytoportal-foto-edit", 
	"\t\"viz /fytoportal/_design/skodlorg/_view/abionozy\"" +
	"\n\t^ zarazeni = 'abionóza'",
	null, "2013-11-01T14:09:28Z", "mp");

jst.FYSkodlOrg.addMethod("skudci", "", "*srs-fytoportal-foto-edit", 
	"\t\"viz /fytoportal/_design/skodlorg/_view/skudci\"" +
	"\n\t^ zarazeni asString includesSubString: 'škůdce'",
	null, "2013-11-01T14:09:32Z", "mp");

jst.FYSkodlOrg.addMethod("choroby", "", "*srs-fytoportal-foto-edit", 
	"\t\"viz /fytoportal/_design/skodlorg/_view/choroby\"" +
	"\n\t^ zarazeni notNil and: [self abionozy not] and: [self skudci not]",
	null, "2013-11-01T14:09:38Z", "mp");

//FYFotogalerie

jst.FYFotografie.addMethod("formValues", "", "*srs-fytoportal-foto-edit", 
	"\t| dict |" +
	"\n\tdict := self asDictionary." +
	"\n\t(soubor isNil and: [attachments notNil]) ifTrue: [" +
	"\n\t\tdict at: #soubor put: '(v databázi)']." +
	"\n\t^ dict",
	null, "2013-07-03T14:57:14Z", "mp");

//FYPlodinyPanel

jst.FYPlodinyPanel.addMethod("zmenaPopisuTaxonu:", "taxon", "*srs-fytoportal-foto-edit", 
	"\t| updateNode |" +
	"\n\tupdateNode := [:n | n isLeaf " +
	"\n\t\tifTrue: [(n id includesSubString: taxon id) ifTrue: [n text: taxon cesky]]" +
	"\n\t\tifFalse: [n children do: [:nn | updateNode value: nn]]]." +
	"\n\tupdateNode value: podleSkupin root",
	null, "2012-08-17T19:44:33Z", "mp", 1);

jst.FYPlodinyPanel.addMethod("zmenaPopisuTaxonu:", "taxon", "*srs-fytoportal-foto-edit", 
	"\ttaxon jePlodina ifTrue: [" +
	"\n\t\t| upd |" +
	"\n\t\tupd := [:n | (n id includesSubString: taxon id) ifTrue: [n text: taxon cesky]]." +
	"\n\t\tpodleSkupin root allChildrenDo: upd." +
	"\n\t\tvyhledane root children do: upd]",
	null, "2013-09-18T10:05:48Z", "mp", 1);

jst.FYPlodinyPanel.addMethod("zmenaPopisuTaxonu:", "taxon", "*srs-fytoportal-foto-edit", 
	"\ttaxon jePlodina ifTrue: [" +
	"\n\t\t| upd |" +
	"\n\t\tupd := [:n | (n id includesSubString: taxon id) ifTrue: [n text: taxon nazev]]." +
	"\n\t\tpodleSkupin root allChildrenDo: upd." +
	"\n\t\tvyhledane root children do: upd]",
	null, "2013-11-13T14:14:24Z", "mp"); //fytoportal-foto-edit

jst.FYPlodinyPanel.addMethod("fotkaZmenena:", "fotka", "*srs-fytoportal-foto-edit", 
	"\t(podleSkupin root detectChild: [:n | (n id allButFirst: 4) = fotka plodina]) ifNotNilDo: [:n | " +
	"\n\t\t\"uzly musi byt nactene, jinak plodinu nenajdu\"" +
	"\n\t\tpodleSkupin expandPath: n path thenDo: [:uspech :node | " +
	"\n\t\t\tuspech ifTrue: [" +
	"\n\t\t\t\t\"pokud je skodlOrg nil vim, ze jde o plodinu a poslu standardni zmenu - aktualizuje popis, editory a fotky\"" +
	"\n\t\t\t\tpodleSkupin selectionModel selectNode: node silently: fotka skodlOrg notNil." +
	"\n\t\t\t\tpodleSkupin show." +
	"\n\t\t\t\t\"obeslu skodlOrgPanel a fotoPanel odsud, abych zajistil aktualizaci ve spravnem poradi\"" +
	"\n\t\t\t\tself sendEvent: #'nastavPodleFotky:' with: fotka]]" +
	"\n\t] ifNil: [" +
	"\n\t\t| nodes n |" +
	"\n\t\t\"nahradni reseni - odpovidajici plodinu pridam do vyhledanych\"" +
	"\n\t\tnodes := SortedCollection sortBlock: [:a :b | a text <= b text]." +
	"\n\t\tnodes addAll: vyhledane root children." +
	"\n\t\tn := nodes add: (Fytoportal db loadObject: fotka plodina) asTreeNode." +
	"\n\t\tvyhledane " +
	"\n\t\t\troot: (ExtTreeNode new children: nodes);" +
	"\n\t\t\tshow." +
	"\n\t\tvyhledane selectionModel selectNode: n silently: fotka skodlOrg notNil." +
	"\n\t\tself sendEvent: #'nastavPodleFotky:' with: fotka" +
	"\n\t]",
	null, "2013-07-02T22:44:29Z", "mp", 1);

jst.FYPlodinyPanel.addMethod("fotkaZmenena:", "fotka", "*srs-fytoportal-foto-edit", 
	"\tfotka plodina ifNil: [" +
	"\n\t\t^ self]." +
	"\n\tvyhledane isActive ifTrue: [" +
	"\n\t\t^ self fotkaZmenenaVyhledane: fotka]." +
	"\n\t(podleSkupin root detectChild: [:n | (n id allButFirst: 4) = fotka plodina]) ifNotNilDo: [:n | " +
	"\n\t\t\"uzly musi byt nactene, jinak plodinu nenajdu\"" +
	"\n\t\tpodleSkupin expandPath: n path thenDo: [:uspech :node | " +
	"\n\t\t\tuspech ifTrue: [" +
	"\n\t\t\t\tpodleSkupin selectionModel selectNode: node." +
	"\n\t\t\t\tpodleSkupin show." +
	"\n\t\t\t\t\"obeslu skodlOrgPanel a fotoPanel odsud, abych zajistil aktualizaci ve spravnem poradi\"" +
	"\n\t\t\t\tself sendEvent: #'nastavPodleFotky:' with: fotka" +
	"\n\t\t\t] ifFalse: [" +
	"\n\t\t\t\tself fotkaZmenenaVyhledane: fotka]" +
	"\n\t\t]" +
	"\n\t] ifNil: [" +
	"\n\t\tself fotkaZmenenaVyhledane: fotka]",
	null, "2013-07-04T19:02:59Z", "mp"); //fytoportal-foto-edit

jst.FYPlodinyPanel.addMethod("fotkaZmenenaVyhledane:", "fotka", "*srs-fytoportal-foto-edit", 
	"\t\"jsem ve vyhledanych nebo nahradni reseni - odpovidajici plodinu pridam do vyhledanych\"" +
	"\n\tvyhledane show." +
	"\n\t(vyhledane root detectChild: [:n | n id = fotka plodina]) " +
	"\n\t\tifNotNilDo: [:n | " +
	"\n\t\t\tvyhledane selectionModel selectNode: n]" +
	"\n\t\tifNil: [ | nodes n |" +
	"\n\t\t\tnodes := SortedCollection sortBlock: [:a :b | a text <= b text]." +
	"\n\t\t\tvyhledane root children do: [:n |" +
	"\n\t\t\t\tnodes add: n copy]." +
	"\n\t\t\tn := nodes add: (Fytoportal db loadObject: fotka plodina) asTreeNode." +
	"\n\t\t\tvyhledane root: (ExtTreeNode new children: nodes asArray)." +
	"\n\t\t\tvyhledane selectionModel selectNode: n]." +
	"\n\tself sendEvent: #'nastavPodleFotky:' with: fotka",
	null, "2013-07-03T10:09:11Z", "mp", 1);

jst.FYPlodinyPanel.addMethod("fotkaZmenenaVyhledane:", "fotka", "*srs-fytoportal-foto-edit", 
	"\t\"jsem ve vyhledanych nebo nahradni reseni - odpovidajici plodinu pridam do vyhledanych\"" +
	"\n\tvyhledane show." +
	"\n\t(vyhledane root detectChild: [:n | n id = fotka plodina]) " +
	"\n\t\tifNotNilDo: [:n | " +
	"\n\t\t\tvyhledane selectionModel selectNode: n]" +
	"\n\t\tifNil: [ | nodes n |" +
	"\n\t\t\tnodes := SortedCollection sortBlock: [:a :b | a text <= b text]." +
	"\n\t\t\tvyhledane root children do: [:ch |" +
	"\n\t\t\t\tnodes add: ch copy]." +
	"\n\t\t\tn := nodes add: (Fytoportal db loadObject: fotka plodina) asTreeNode." +
	"\n\t\t\tvyhledane root: (ExtTreeNode new children: nodes asArray)." +
	"\n\t\t\tvyhledane selectionModel selectNode: n]." +
	"\n\tself sendEvent: #'nastavPodleFotky:' with: fotka",
	null, "2013-10-11T23:16:34Z", "mp"); //fytoportal-foto-edit

jst.FYPlodinyPanel.addMethod("zmenaZarazeniPlodiny:", "plod", "*srs-fytoportal-foto-edit", 
	"\t| vybPlod stareSkup noveSkup zobrazSkup nadraz |" +
	"\n\t\"stareSkup <= nactene (rozbalene) skupiny (uzly) obsahujici zmenenou plodinu - budou se aktualizovat\"" +
	"\n\tstareSkup := OrderedCollection new." +
	"\n\tpodleSkupin root children do: [:skup | skup allChildrenDo: [:n | " +
	"\n\t\t(n notNil and: [(n id copyAfter: '-') = plod id]) ifTrue: [" +
	"\n\t\t\tstareSkup add: skup]]]." +
	"\n\t\"musim pridat i rozbalene skupiny, do kterych mohla byt plodina nove zarazena\"" +
	"\n\tpodleSkupin root children do: [:skup | skup hasChildNodes ifTrue: [" +
	"\n\t\tnoveSkup ifNil: [" +
	"\n\t\t\tnoveSkup := plod parent isEmptyOrNil " +
	"\n\t\t\t\tifFalse: [(nadraz := Fytoportal db loadObject: plod parent) skupiny]" +
	"\n\t\t\t\tifTrue: [plod skupiny]]." +
	"\n\t\t((noveSkup includes: skup id) and: [(stareSkup includes: skup) not]) ifTrue: [" +
	"\n\t\t\tstareSkup add: skup]]]." +
	"\n\t\"jakou plodinu se budu snazit po aktualizaci vybrat?\"" +
	"\n\tpodleSkupin selectedNode ifNotNilDo: [:n | (n id copyAfter: '-') ifNotEmptyDo: [:id | plod id = id " +
	"\n\t\tifTrue: [vybPlod := plod] " +
	"\n\t\tifFalse: [\"vybrana je jina plodina\"" +
	"\n\t\t\tvybPlod := Fytoportal db loadObject: id]." +
	"\n\t\t\"zkusim nastavit zobrazSkup - zatim jen kandidat\"" +
	"\n\t\tzobrazSkup := n parentNode." +
	"\n\t\tzobrazSkup parentNode == podleSkupin root ifFalse: [" +
	"\n\t\t\tzobrazSkup := zobrazSkup parentNode]." +
	"\n\t\t\"noveSkup <= aktualni skupiny (jejich idcka) nadrazene plodiny (maji prednost) nebo plodiny (vybrane)\"" +
	"\n\t\t(noveSkup isNil or: [vybPlod ~= plod]) ifTrue: [" +
	"\n\t\t\t\"od ted musi byt nadraz i noveSkup podle vybPlod\"" +
	"\n\t\t\tnoveSkup := vybPlod parent isEmptyOrNil " +
	"\n\t\t\t\tifTrue: [vybPlod skupiny]" +
	"\n\t\t\t\tifFalse: [nadraz = vybPlod parent ifFalse: [" +
	"\n\t\t\t\t\t\tnadraz := Fytoportal db loadObject: vybPlod parent]." +
	"\n\t\t\t\t\tnadraz skupiny]" +
	"\n\t\t]." +
	"\n\t\t\"zobrazSkup <= skupina, kterou nakonec rozbalim - mohla se zmenit, je-li vybPlod = plod\"" +
	"\n\t\t(noveSkup includes: zobrazSkup id) ifFalse: [" +
	"\n\t\t\tzobrazSkup := stareSkup detect: [:skup | skup isExpanded and: [noveSkup includes: skup id]] ifNone: [" +
	"\n\t\t\t\tstareSkup detect: [:skup | noveSkup includes: skup id] ifNone: nil]." +
	"\n\t\t\tzobrazSkup ifNil: [" +
	"\n\t\t\t\tzobrazSkup := podleSkupin root children detect: [:skup | skup id = noveSkup first] ifNone: nil]]." +
	"\n\t\tzobrazSkup ifNotNil: [" +
	"\n\t\t\t\"#zobrazSkup bude nezavisla na #stareSkup, takze se reloady neovlivni\"" +
	"\n\t\t\tstareSkup remove: zobrazSkup ifAbsent: nil]" +
	"\n\t]]." +
	"\n\tstareSkup isEmpty not | zobrazSkup notNil ifTrue: [" +
	"\n\t\tpodleSkupin clearSelectionsSilently: true.]." +
	"\n\t\"aktualizuji stare skupiny, \"" +
	"\n\tstareSkup do: [:skup | skup reload]." +
	"\n\t\"nactu a rozbalim cilovou skupinu\"" +
	"\n\tzobrazSkup ifNotNil: [[zobrazSkup reloadThenDo: [nadraz " +
	"\n\t\tifNotNil: [(zobrazSkup detectChild: [:n | (n id copyAfter: '-') = nadraz id]) ifNotNilDo: [:node |" +
	"\n\t\t\t\"jeste musim rozbalit nadrazenou plodinu\"" +
	"\n\t\t\tnode expandDeep: false anim: false thenDo: [" +
	"\n\t\t\t\t(node detectChild: [:n | (n id copyAfter: '-') = vybPlod id]) ifNotNilDo: [:n | " +
	"\n\t\t\t\t\tn select]]]] " +
	"\n\t\tifNil: [(zobrazSkup detectChild: [:n | (n id copyAfter: '-') = vybPlod id]) ifNotNilDo: [:n | " +
	"\n\t\t\tn select]]" +
	"\n\t]] delayed: 200 \"musi jit az po reloadu starych skupin\"]",
	null, "2013-09-10T12:24:53Z", "mp", 1);

jst.FYPlodinyPanel.addMethod("zmenaZarazeniPlodiny:", "plod", "*srs-fytoportal-foto-edit", 
	"\t| vybPlod stareSkup noveSkup zobrazSkup nadraz |" +
	"\n\t\"stareSkup = nactene (rozbalene) skupiny (uzly) obsahujici zmenenou plodinu - budou se aktualizovat\"" +
	"\n\tstareSkup := OrderedCollection new." +
	"\n\tpodleSkupin root allChildrenDo: [:n | " +
	"\n\t\t(n link ~= #skupina and: [(n id copyAfter: '-') = plod id]) ifTrue: [ | skup |" +
	"\n\t\t\tskup := n parentNode." +
	"\n\t\t\tskup link = #skupina ifFalse: [" +
	"\n\t\t\t\t\"preskocim nadrazenou plodinu\"" +
	"\n\t\t\t\tskup := skup parentNode]." +
	"\n\t\t\tstareSkup add: skup]" +
	"\n\t]." +
	"\n\t\"musim pridat i rozbalene skupiny, do kterych mohla byt plodina nove zarazena\"" +
	"\n\tpodleSkupin root allChildrenDo: [:skup | (skup link = #skupina and: [skup hasChildNodes]) ifTrue: [" +
	"\n\t\t\"prochazim jen skupiny, nevadi, ze ne jen koncove (cili napr. i ovocne dreviny, do nich ale nemuze byt plodina zarazena)\"" +
	"\n\t\tnoveSkup ifNil: [" +
	"\n\t\t\tnoveSkup := plod parent isEmptyOrNil " +
	"\n\t\t\t\tifFalse: [(nadraz := Fytoportal db loadObject: plod parent) skupiny]" +
	"\n\t\t\t\tifTrue: [plod skupiny]]." +
	"\n\t\t((noveSkup includes: skup id) and: [(stareSkup includes: skup) not]) ifTrue: [" +
	"\n\t\t\tstareSkup add: skup]" +
	"\n\t]]." +
	"\n\t\"jakou plodinu se budu snazit po aktualizaci vybrat?\"" +
	"\n\tpodleSkupin selectedNode ifNotNilDo: [:n | (n id copyAfter: '-') ifNotEmptyDo: [:id | plod id = id " +
	"\n\t\tifTrue: [vybPlod := plod] " +
	"\n\t\tifFalse: [\"vybrana je jina plodina\"" +
	"\n\t\t\tvybPlod := Fytoportal db loadObject: id]." +
	"\n\t\t\"zkusim nastavit zobrazSkup - zatim jen kandidat\"" +
	"\n\t\tzobrazSkup := n parentNode." +
	"\n\t\tzobrazSkup link = #skupina ifFalse: [" +
	"\n\t\t\t\"preskocim nadrazenou plodinu\"" +
	"\n\t\t\tzobrazSkup := zobrazSkup parentNode]." +
	"\n\t\t\"noveSkup = aktualni skupiny (jejich idcka) nadrazene plodiny (maji prednost) nebo plodiny (vybrane)\"" +
	"\n\t\t(noveSkup isNil or: [vybPlod ~= plod]) ifTrue: [" +
	"\n\t\t\t\"od ted musi byt nadraz i noveSkup podle vybPlod\"" +
	"\n\t\t\tnoveSkup := vybPlod parent isEmptyOrNil " +
	"\n\t\t\t\tifTrue: [vybPlod skupiny]" +
	"\n\t\t\t\tifFalse: [nadraz = vybPlod parent ifFalse: [" +
	"\n\t\t\t\t\t\tnadraz := Fytoportal db loadObject: vybPlod parent]." +
	"\n\t\t\t\t\tnadraz skupiny]" +
	"\n\t\t]." +
	"\n\t\t\"zobrazSkup = skupina, kterou nakonec rozbalim - mohla se zmenit, je-li vybPlod = plod\"" +
	"\n\t\t(noveSkup includes: zobrazSkup id) ifFalse: [" +
	"\n\t\t\tzobrazSkup := stareSkup detect: [:skup | skup isExpanded and: [noveSkup includes: skup id]] ifNone: [" +
	"\n\t\t\t\tstareSkup detect: [:skup | noveSkup includes: skup id] ifNone: nil]." +
	"\n\t\t\t(zobrazSkup isNil and: [noveSkup isEmpty not]) ifTrue: [" +
	"\n\t\t\t\tzobrazSkup := podleSkupin root detectChild: [:skup | skup id = noveSkup first]]" +
	"\n\t\t]." +
	"\n\t\tzobrazSkup ifNotNil: [" +
	"\n\t\t\t\"#zobrazSkup bude nezavisla na #stareSkup, takze se reloady neovlivni\"" +
	"\n\t\t\tstareSkup remove: zobrazSkup ifAbsent: nil]" +
	"\n\t]]." +
	"\n\tstareSkup isEmpty not | zobrazSkup notNil ifTrue: [" +
	"\n\t\tpodleSkupin clearSelectionsSilently: true.]." +
	"\n\t\"aktualizuji stare skupiny, \"" +
	"\n\tstareSkup do: [:skup | skup reload]." +
	"\n\t\"nactu a rozbalim cilovou skupinu\"" +
	"\n\tzobrazSkup ifNotNil: [[" +
	"\n\t\tzobrazSkup parentNode link = #skupina ifTrue: [" +
	"\n\t\t\tzobrazSkup parentNode expand]." +
	"\n\t\tzobrazSkup reloadThenDo: [nadraz " +
	"\n\t\t\tifNotNil: [(zobrazSkup detectChild: [:n | (n id copyAfter: '-') = nadraz id]) ifNotNilDo: [:node |" +
	"\n\t\t\t\t\"jeste musim rozbalit nadrazenou plodinu\"" +
	"\n\t\t\t\tnode expandDeep: false anim: false thenDo: [" +
	"\n\t\t\t\t\t(node detectChild: [:n | (n id copyAfter: '-') = vybPlod id]) ifNotNilDo: [:n | " +
	"\n\t\t\t\t\t\tn select]]]] " +
	"\n\t\t\tifNil: [(zobrazSkup detectChild: [:n | (n id copyAfter: '-') = vybPlod id]) ifNotNilDo: [:n | " +
	"\n\t\t\t\tn select]]" +
	"\n\t\t]" +
	"\n\t] delayed: 200 \"musi jit az po reloadu starych skupin\"]",
	null, "2014-01-29T22:14:42Z", "mp"); //fytoportal-foto-edit

jst.FYPlodinyPanel.addMethod("novyTaxon:", "taxon", "*srs-fytoportal-foto-edit", 
	"\ttaxon jePlodina ifTrue: [" +
	"\n\t\tself zmenaZarazeniPlodiny: taxon]",
	null, "2013-09-16T08:45:21Z", "mp");

//FYSkodlOrgPanel

jst.FYSkodlOrgPanel.addMethod("novyTaxon:", "taxon", "*srs-fytoportal-foto-edit", 
	"\ttaxon jePlodina ifFalse: [" +
	"\n\t\tself zmenaHostiteluSO: taxon]",
	null, "2013-09-16T08:47:49Z", "mp");

/*
jst.FYSkodlOrgPanel.addMethod("nastavPodleFotky:", "fotka", "*srs-fytoportal-foto-edit", 
	"\tfotka skodlOrg ifNotNil: [" +
	"\n\t\t\"nactu seznam SO podle plodiny\"" +
	"\n\t\tnaPlodine root id = fotka plodina ifFalse: [" +
	"\n\t\t\tnaPlodine root: (self zaradSkodlOrg: (self nactiPodlePlodiny: fotka plodina))]." +
	"\n\t\t\"vyberu SO\"" +
	"\n\t\tself selectTaxon: fotka skodlOrg]",
	null, "2013-07-02T20:54:41Z", "mp");

jst.FYSkodlOrgPanel.addMethod("selectTaxon:", "id", "*srs-fytoportal-foto-edit", 
	"\t(naPlodine root detectChild: [:n | n id = id]) ifNotNilDo: [:n | " +
	"\n\t\t\"uzly musi byt nactene, jinak SO nenajdu\"" +
	"\n\t\tnaPlodine expandPath: n path thenDo: [:uspech :node | " +
	"\n\t\t\tuspech ifTrue: [" +
	"\n\t\t\t\tnaPlodine selectionModel selectNode: node." +
	"\n\t\t\t\tnaPlodine show]]" +
	"\n\t] ifNil: [" +
	"\n\t\t| nodes n |" +
	"\n\t\t\"nahradni reseni - odpovidajici SO pridam do vyhledanych\"" +
	"\n\t\tnodes := SortedCollection sortBlock: [:a :b | a text <= b text]." +
	"\n\t\tnodes addAll: vyhledane root children." +
	"\n\t\tn := nodes add: (Fytoportal db loadObject: id) asTreeNode." +
	"\n\t\tvyhledane " +
	"\n\t\t\troot: (ExtTreeNode new children: nodes);" +
	"\n\t\t\tshow." +
	"\n\t\tvyhledane selectionModel selectNode: n" +
	"\n\t]",
	null, "2013-07-02T20:53:22Z", "mp");
*/

jst.FYSkodlOrgPanel.addMethod("fotkaZmenena:", "fotka", "*srs-fytoportal-foto-edit", 
	"\tfotka plodina ifNil: [" +
	"\n\t\tself nastavPodleFotky: fotka." +
	"\n\t\t\"obeslu fotoPanel\"" +
	"\n\t\tself sendEvent: #'nastavPodleFotky:' with: fotka]",
	null, "2013-12-02T15:20:22Z", "mp"); //fytoportal-foto

jst.FYSkodlOrgPanel.addMethod("nastavPodleFotky:", "fotka", "*srs-fytoportal-foto-edit", 
	"\t| tree |" +
	"\n\tfotka skodlOrg ifNil: [" +
	"\n\t\t^ self]." +
	"\n\tvyhledane isActive ifTrue: [" +
	"\n\t\t^ self nastavPodleFotkyVyhledane: fotka]." +
	"\n\ttree := fotka plodina " +
	"\n\t\tifNotNil: naPlodine " +
	"\n\t\tifNil: bezPlodiny." +
	"\n\t(tree root detectChild: [:n | n id = fotka skodlOrg]) ifNotNilDo: [:n | " +
	"\n\t\ttree selectionModel selectNode: n." +
	"\n\t\ttree show" +
	"\n\t] ifNil: [" +
	"\n\t\tself nastavPodleFotkyVyhledane: fotka]",
	null, "2013-07-04T19:06:02Z", "mp", 1);

jst.FYSkodlOrgPanel.addMethod("nastavPodleFotky:", "fotka", "*srs-fytoportal-foto-edit", 
	"\t| tree node |" +
	"\n\tfotka skodlOrg ifNil: [" +
	"\n\t\t^ self]." +
	"\n\tvyhledane isActive ifTrue: [" +
	"\n\t\t^ self nastavPodleFotkyVyhledane: fotka]." +
	"\n\t\"fotka bez plodiny muze byt nove i ve strome naPlodine\"" +
	"\n\tnode := ((tree := naPlodine) root detectChild: [:n | n id = fotka skodlOrg]) ifNil: [" +
	"\n\t\t(tree := bezPlodiny) root detectChild: [:n | n id = fotka skodlOrg]]." +
	"\n\tnode ifNotNil: [" +
	"\n\t\ttree selectionModel selectNode: node." +
	"\n\t\ttree show" +
	"\n\t] ifNil: [" +
	"\n\t\tself nastavPodleFotkyVyhledane: fotka]",
	null, "2013-12-02T15:31:43Z", "mp"); //fytoportal-foto-edit

jst.FYSkodlOrgPanel.addMethod("nastavPodleFotkyVyhledane:", "fotka", "*srs-fytoportal-foto-edit", 
	"\t\"jsem ve vyhledanych nebo nahradni reseni - odpovidajici SO pridam do vyhledanych\"" +
	"\n\tvyhledane show." +
	"\n\t(vyhledane root detectChild: [:n | n id = fotka skodlOrg]) " +
	"\n\t\tifNotNilDo: [:n | " +
	"\n\t\t\tvyhledane selectionModel selectNode: n]" +
	"\n\t\tifNil: [ | nodes n |" +
	"\n\t\t\tnodes := SortedCollection sortBlock: [:a :b | a text <= b text]." +
	"\n\t\t\tvyhledane root children do: [:ch |" +
	"\n\t\t\t\tnodes add: ch copy]." +
	"\n\t\t\tn := nodes add: (Fytoportal db loadObject: fotka skodlOrg) asTreeNode." +
	"\n\t\t\tvyhledane root: (ExtTreeNode new children: nodes asArray)." +
	"\n\t\t\tvyhledane selectionModel selectNode: n]",
	null, "2013-07-03T15:38:46Z", "mp");

jst.FYSkodlOrgPanel.addMethod("zmenaHostiteluSO:", "taxon", "*srs-fytoportal-foto-edit", 
	"\t| zobrazen mimoPlodinu |" +
	"\n\tzobrazen := (naPlodine root children detect: [:n | n id = taxon id] ifNone: nil) notNil." +
	"\n\tmimoPlodinu := (taxon hostitele includes: naPlodine root id) not." +
	"\n\t(zobrazen & mimoPlodinu or: [zobrazen not & mimoPlodinu not]) ifTrue: [" +
	"\n\t\tnaPlodine keepSelectedDuring: [" +
	"\n\t\t\tnaPlodine root: (self zaradSkodlOrg: (self nactiPodlePlodiny: naPlodine root id))]." +
	"\n\t\tnaPlodine selectedNode isNil & mimoPlodinu not ifTrue: [" +
	"\n\t\t\tnaPlodine selectNodeBy: [:n | n id = taxon id] silently: true]" +
	"\n\t]",
	null, "2013-09-11T15:30:17Z", "mp", 1);

jst.FYSkodlOrgPanel.addMethod("zmenaHostiteluSO:", "taxon", "*srs-fytoportal-foto-edit", 
	"\t| zobrazen mimoPlodinu |" +
	"\n\tzobrazen := (naPlodine root children detect: [:n | n id = taxon id] ifNone: nil) notNil." +
	"\n\tmimoPlodinu := (taxon hostitele includes: self hostitel) not." +
	"\n\t(zobrazen & mimoPlodinu or: [zobrazen not & mimoPlodinu not]) ifTrue: [" +
	"\n\t\tnaPlodine keepSelectedDuring: [self aktualizujPanel: naPlodine] silently: true " +
	"\n\t\t\tifFail: [mimoPlodinu ifFalse: [" +
	"\n\t\t\t\tnaPlodine selectNodeBy: [:n | n id = taxon id] silently: true]]" +
	"\n\t]." +
	"\n\tzobrazen := (bezPlodiny root children detect: [:n | n id = taxon id] ifNone: nil) notNil." +
	"\n\tmimoPlodinu := taxon hostitele isEmptyOrNil." +
	"\n\t(zobrazen & mimoPlodinu not or: [zobrazen not & mimoPlodinu]) ifTrue: [" +
	"\n\t\tbezPlodiny keepSelectedDuring: [self aktualizujPanel: bezPlodiny] silently: true " +
	"\n\t\t\tifFail: [mimoPlodinu ifTrue: [" +
	"\n\t\t\t\tbezPlodiny selectNodeBy: [:n | n id = taxon id] silently: true]]" +
	"\n\t]",
	null, "2013-09-18T15:22:16Z", "mp"); //fytoportal-foto-edit

jst.FYSkodlOrgPanel.addMethod("zmenaPopisuTaxonu:", "taxon", "*srs-fytoportal-foto-edit", 
	"\ttaxon jePlodina ifFalse: [" +
	"\n\t\t| upd |" +
	"\n\t\tupd := [:n | (n id includesSubString: taxon id) ifTrue: [n text: taxon cesky]]." +
	"\n\t\t{naPlodine. bezPlodiny. vyhledane} do: [:p |" +
	"\n\t\t\t(p root detectChild: [:n | n isLeaf and: [n id includesSubString: taxon id] " +
	"\n\t\t\t\tand: [n id size > taxon id size] and: [(taxon zarazeni startsWith: (n id copyUpTo: $-)) not]]) " +
	"\n\t\t\t\tifNotNil: [\"zmenilo se zarazeni, nactu znovu cely strom\"" +
	"\n\t\t\t\t\tp keepSelectedDuring: [self aktualizujPanel: p] silently: true ifFail: [" +
	"\n\t\t\t\t\t\tp selectNodeBy: [:n | n id = taxon id] silently: true]" +
	"\n\t\t\t\t] " +
	"\n\t\t\t\tifNil: [\"staci zmenit nazev\"" +
	"\n\t\t\t\t\tp root allChildrenDo: upd]" +
	"\n\t\t]" +
	"\n\t]",
	null, "2013-09-18T15:08:25Z", "mp", 1);

jst.FYSkodlOrgPanel.addMethod("zmenaPopisuTaxonu:", "taxon", "*srs-fytoportal-foto-edit", 
	"\ttaxon jePlodina ifFalse: [" +
	"\n\t\t| upd |" +
	"\n\t\tupd := [:n | (n id includesSubString: taxon id) ifTrue: [n text: taxon nazev]]." +
	"\n\t\t{naPlodine. bezPlodiny. vyhledane} do: [:p |" +
	"\n\t\t\t(p root detectChild: [:n | n isLeaf and: [n id includesSubString: taxon id] " +
	"\n\t\t\t\tand: [n id size > taxon id size] and: [(taxon zarazeni startsWith: (n id copyUpTo: $-)) not]]) " +
	"\n\t\t\t\tifNotNil: [\"zmenilo se zarazeni, nactu znovu cely strom\"" +
	"\n\t\t\t\t\tp keepSelectedDuring: [self aktualizujPanel: p] silently: true ifFail: [" +
	"\n\t\t\t\t\t\tp selectNodeBy: [:n | n id = taxon id] silently: true]" +
	"\n\t\t\t\t] " +
	"\n\t\t\t\tifNil: [\"staci zmenit nazev\"" +
	"\n\t\t\t\t\tp root allChildrenDo: upd]" +
	"\n\t\t]" +
	"\n\t]",
	null, "2013-11-13T14:15:13Z", "mp"); //fytoportal-foto-edit

jst.FYSkodlOrgPanel.addMethod("taxonSmazan:", "taxon", "*srs-fytoportal-foto-edit", 
	"\ttaxon jePlodina ifFalse: [" +
	"\n\t\t{naPlodine. bezPlodiny. vyhledane} do: [:p | | n |" +
	"\n\t\t\tn := p selectedNode." +
	"\n\t\t\tn ifNotNil: [" +
	"\n\t\t\t\tn := n nextLeaf ifNil: [" +
	"\n\t\t\t\t\tn previousLeaf]]." +
	"\n\t\t\tp keepSelectedDuring: [self aktualizujPanel: p] silently: p isActive not ifFail: [" +
	"\n\t\t\t\t\"vybrany taxon byl smazan, vyberu nasledujici nebo predchozi, byl-li posledni\"" +
	"\n\t\t\t\tn ifNotNil: [" +
	"\n\t\t\t\t\tp selectNodeBy: [:nd | nd id = n id] silently: p isActive not]]" +
	"\n\t\t]" +
	"\n\t]",
	null, "2014-02-24T20:53:33Z", "mp"); //fytoportal-foto

//FYFotoViewer

jst.FYFotoViewer.addMethod("nastavPodleFotky:", "fotka", "*srs-fytoportal-foto-edit", 
	"\tnahledy nactiFotkyVyber: fotka id",
	null, "2014-02-26T12:53:56Z", "mp");

//FYFotoNahledy

jst.FYFotoNahledy.addMethod("fotkaSmazana:", "fotka", "*srs-fytoportal-foto-edit", 
	"\tself selectedNodes ifNotEmptyDo: [:nahl | " +
	"\n\t\t\"zachovam vybranou fotku, pokud nebyla smazana\"" +
	"\n\t\tself nactiFotkyVyber: (self store recordAt: nahl first viewIndex + 1) id" +
	"\n\t] ifEmpty: [" +
	"\n\t\tself nactiFotky]",
	null, "2014-02-26T12:53:17Z", "mp", 1);

jst.FYFotoNahledy.addMethod("fotkaSmazana:", "fotka", "*srs-fytoportal-foto-edit", 
	"\t\"zachovam vybranou fotku, pokud nebyla smazana\"" +
	"\n\tself nactiFotkyVyber: self vyber",
	null, "2014-02-26T15:18:58Z", "mp"); //fytoportal-foto-edit

/*
jst.FYTaxonPopisPanel.addMethod("nastavPodleFotky:", "fotka", "*srs-fytoportal-foto-edit", 
	"\ttaxon := Fytoportal db loadObject: (fotka skodlOrg ifNil: [fotka plodina])." +
	"\n\tself refreshContent." +
	"\n\t\"zajisti aktualizaci editoru, foto editor jeste musim 'dodelat' - viz FYFotoEditor>>fotkaZmenena:\"" +
	"\n\tself changed: #taxon with: taxon",
	null, "2013-07-01T07:39:57Z", "mp"); //fytoportal-foto-edit
*/

//FYTextKapitolyPanel

jst.FYTextKapitolyPanel.addMethod("zmenaPopisuTaxonu:", "taxon", "*srs-fytoportal-foto-edit", 
	"\t\"posila Fotogalerie\"" +
	"\n\t(kapitola notNil and: [kapitola jeMetodikaSO] and: [kapitola taxon = taxon]) ifTrue: [" +
	"\n\t\tself isActive ifTrue: [" +
	"\n\t\t\tkapitola taxon: taxon." +
	"\n\t\t\tself refreshContent" +
	"\n\t\t] ifFalse: [" +
	"\n\t\t\tkapitola := nil]" +
	"\n\t]",
	null, "2013-04-26T14:40:57Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("zmenaPopisuTaxonu:", "taxon", "*srs-fytoportal-foto-edit", 
	"\t\"posila Fotogalerie\"" +
	"\n\t(kapitola notNil and: [kapitola jeMetodikaSO] and: [kapitola taxon = taxon]) ifTrue: [" +
	"\n\t\tkapitola taxon: taxon." +
	"\n\t\tself resetContent]",
	null, "2013-04-29T11:16:12Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("zmenaPopisuTaxonu:", "taxon", "*srs-fytoportal-foto-edit", 
	"\t\"posila Fotogalerie\"" +
	"\n\t(metodikaSO notNil and: [metodikaSO taxonId = taxon id]) ifTrue: [" +
	"\n\t\tmetodikaSO taxon: taxon." +
	"\n\t\tself resetContent]",
	null, "2013-05-03T10:11:18Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("zmenaPopisuTaxonu:", "taxon", "*srs-fytoportal-foto-edit", 
	"\t\"posila Fotogalerie\"" +
	"\n\t(metodikaSO notNil and: [metodikaSO taxonId = taxon id]) ifTrue: [" +
	"\n\t\tmetodikaSO taxon: taxon." +
	"\n\t\tself refreshContent]",
	null, "2013-12-17T15:50:39Z", "mp", 1);

jst.FYTextKapitolyPanel.addMethod("zmenaPopisuTaxonu:", "taxon", "*srs-fytoportal-foto-edit", 
	"\t\"posila Fotogalerie\"" +
	"\n\t(metodikaSO notNil and: [metodikaSO taxonyId includes: taxon id]) ifTrue: [" +
	"\n\t\tmetodikaSO taxon: taxon." +
	"\n\t\tself refreshContent]",
	null, "2014-03-04T15:11:32Z", "mp"); //fytoportal-foto-edit

/* vazba metodiky SO na hostitele ve fotogalerii byla vyrazena
jst.FYTextKapitolyPanel.addMethod("zmenaHostiteluSO:", "taxon", "*srs-fytoportal-foto-edit", 
	"\t\"reakce je stejna\"" +
	"\n\tself zmenaPopisuTaxonu: taxon",
	null, "2013-09-04T21:58:32Z", "mp");
*/

//FYTextKapPlodinyPanel

jst.FYTextKapPlodinyPanel.addMethod("fotkaZmenena:", "fotka", "*srs-fytoportal-foto-edit", 
	"\t(kapitola notNil and: [fotka fotkaPlodiny] and: [kapitola taxony anySatisfy: [:ea | ea id = fotka plodina]]) ifTrue: [" +
	"\n\t\tkapitola resetujFotky." +
	"\n\t\tself resetContent]",
	null, "2013-07-05T19:02:56Z", "mp", 1);

jst.FYTextKapPlodinyPanel.addMethod("fotkaZmenena:", "fotka", "*srs-fytoportal-foto-edit", 
	"\t(kapitola notNil and: [fotka fotkaPlodiny] and: [kapitola taxony anySatisfy: [:ea | ea id = fotka plodina]]) ifTrue: [" +
	"\n\t\tkapitola resetujFotky." +
	"\n\t\tself refreshContent]",
	null, "2013-12-17T15:16:27Z", "mp"); //fytoportal-foto-edit

jst.FYTextKapPlodinyPanel.addMethod("fotkaSmazana:", "fotka", "*srs-fytoportal-foto-edit", 
	"\tself fotkaZmenena: fotka",
	null, "2013-07-04T14:43:32Z", "mp");

//FYTextKapSOPanel

jst.FYTextKapSOPanel.addMethod("zmenaPopisuTaxonu:", "taxon", "*srs-fytoportal-foto-edit", 
	"\tmetodikaSO " +
	"\n\t\tifNil: [\"reakce je stejna\"" +
	"\n\t\t\tself zmenaHostiteluSO: taxon]" +
	"\n\t\tifNotNil: [\"pro vybrany SO\"" +
	"\n\t\t\tsuper zmenaPopisuTaxonu: taxon]",
	null, "2013-12-17T20:17:34Z", "mp"); //fytoportal-ior

jst.FYTextKapSOPanel.addMethod("fotkaZmenena:", "fotka", "*srs-fytoportal-foto-edit", 
	"\t(fotka skodlOrg notNil and: [self kapitola notNil] and: [self kapitola taxony anySatisfy: [:ea | ea id = fotka skodlOrg]]) ifTrue: [" +
	"\n\t\tself kapitola resetujFotky." +
	"\n\t\tself resetContent]",
	null, "2013-07-05T19:03:09Z", "mp", 1);

jst.FYTextKapSOPanel.addMethod("fotkaZmenena:", "fotka", "*srs-fytoportal-foto-edit", 
	"\t(metodikaSO notNil and: [metodikaSO taxonId = fotka skodlOrg]) ifTrue: [" +
	"\n\t\tself refreshContent" +
	"\n\t] ifFalse: [(fotka skodlOrg notNil and: [kapitola1 notNil] " +
	"\n\t\tand: [kapitola1 vsechnyTaxonyId includes: fotka skodlOrg]) ifTrue: [" +
	"\n\t\tkapitola1 resetujFotky." +
	"\n\t\tself refreshContent]" +
	"\n\t]",
	null, "2013-12-17T22:01:57Z", "mp", 1);

jst.FYTextKapSOPanel.addMethod("fotkaZmenena:", "fotka", "*srs-fytoportal-foto-edit", 
	"\t(metodikaSO notNil and: [metodikaSO taxonyId includes: fotka skodlOrg]) ifTrue: [" +
	"\n\t\tself refreshContent" +
	"\n\t] ifFalse: [(fotka skodlOrg notNil and: [kapitola1 notNil] " +
	"\n\t\tand: [kapitola1 vsechnyTaxonyId includes: fotka skodlOrg]) ifTrue: [" +
	"\n\t\tkapitola1 resetujFotky." +
	"\n\t\tself refreshContent]" +
	"\n\t]",
	null, "2014-03-04T15:09:07Z", "mp"); //fytoportal-foto-edit

jst.FYTextKapSOPanel.addMethod("fotkaSmazana:", "fotka", "*srs-fytoportal-foto-edit", 
	"\tself fotkaZmenena: fotka",
	null, "2013-07-04T14:43:40Z", "mp");

//*** FYTaxonEditor ***

/*
jst.FYTaxonEditor.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\tbuttonAlign: #left;" +
	"\n\t\tbuttons: {" +
	"\n\t\t\tExtButton new text: 'Uložit změny'; formBind: true; on: #click do: [" +
	"\n\t\t\t\tself isModified " +
	"\n\t\t\t\t\tifTrue: [self ulozZmeny]" +
	"\n\t\t\t\t\tifFalse: [self inform: 'Nebyly zaznamenány žádné změny.']" +
	"\n\t\t\t]. " +
	"\n\t\t\tExtButton new text: 'Zahodit změny'; on: #click do: [self zahodZmeny]}." +
	"\n\taktivni := false",
	null, "2013-01-24T12:50:53Z", "mp");
*/
/*
jst.FYTaxonEditor.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\tbuttonAlign: #left;" +
	"\n\t\tbuttons: {" +
	"\n\t\t\tExtButton new text: 'Uložit změny'; formBind: true; on: #click do: [" +
	"\n\t\t\t\tself isModified " +
	"\n\t\t\t\t\tifTrue: [self ulozZmeny]" +
	"\n\t\t\t\t\tifFalse: [self inform: 'Nebyly zaznamenány žádné změny.']" +
	"\n\t\t\t]. " +
	"\n\t\t\tExtButton new text: 'Zahodit změny'; on: #click do: [self zahodZmeny]}",
	null, "2013-02-05T22:13:50Z", "mp");

jst.FYTaxonEditor.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tself initButtons",
	null, "2013-02-17T22:06:54Z", "mp");

jst.FYTaxonEditor.addMethod("initButtons", "", "initialization", 
	"\tself" +
	"\n\t\tbuttonAlign: #left;" +
	"\n\t\tbuttons: {" +
	"\n\t\t\tExtButton new text: 'Uložit změny'; formBind: true; on: #click do: [" +
	"\n\t\t\t\tself isModified " +
	"\n\t\t\t\t\tifTrue: [self ulozZmeny]" +
	"\n\t\t\t\t\tifFalse: [self inform: 'Nebyly zaznamenány žádné změny.']" +
	"\n\t\t\t]. " +
	"\n\t\t\tExtButton new text: 'Zahodit změny'; on: #click do: [self zahodZmeny]}",
	null, "2013-02-17T22:06:31Z", "mp");
*/
jst.FYTaxonEditor.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\twithCenterLayout;" +
	"\n\t\tadd: (editor := ExtFormPanel new" +
	"\n\t\t\tpadding: 5;" +
	"\n\t\t\twidth: 700;" +
	"\n\t\t\theight: 700;" +
	"\n\t\t\ty: 25)." +
	"\n\tself initButtons",
	null, "2013-02-20T12:42:51Z", "mp");

jst.FYTaxonEditor.addMethod("initButtons", "", "initialization", 
	"\teditor" +
	"\n\t\tbuttonAlign: #left;" +
	"\n\t\tbuttons: {" +
	"\n\t\t\tExtButton new text: 'Uložit změny'; formBind: true; on: #click do: [" +
	"\n\t\t\t\tself isModified " +
	"\n\t\t\t\t\tifTrue: [self ulozZmeny]" +
	"\n\t\t\t\t\tifFalse: [self inform: taxon asString->'Beze změn.']" +
	"\n\t\t\t]. " +
	"\n\t\t\tExtButton new text: 'Zahodit změny'; on: #click do: [self zahodZmeny]}",
	null, "2013-03-04T07:41:42Z", "mp", 1);

jst.FYTaxonEditor.addMethod("initButtons", "", "initialization", 
	"\teditor" +
	"\n\t\tbuttonAlign: #left;" +
	"\n\t\tbuttons: {" +
	"\n\t\t\tExtButton new text: 'Uložit změny'; formBind: true; on: #click do: [" +
	"\n\t\t\t\tself isModified " +
	"\n\t\t\t\t\tifTrue: [self ulozZmeny]" +
	"\n\t\t\t\t\tifFalse: [self bezeZmen]" +
	"\n\t\t\t]. " +
	"\n\t\t\tExtButton new text: 'Zahodit změny'; on: #click do: [self zahodZmeny]}",
	null, "2013-06-24T21:45:05Z", "mp", 1);

jst.FYTaxonEditor.addMethod("initButtons", "", "initialization", 
	"\teditor" +
	"\n\t\tbuttonAlign: #left;" +
	"\n\t\tbuttons: {" +
	"\n\t\t\tExtButton new " +
	"\n\t\t\t\ttext: 'Uložit změny'; " +
	"\n\t\t\t\ticonCls: #'btn-save';" +
	"\n\t\t\t\tformBind: true; " +
	"\n\t\t\t\ton: #click do: [self isModified " +
	"\n\t\t\t\t\tifTrue: [self ulozZmeny]" +
	"\n\t\t\t\t\tifFalse: [self bezeZmen]" +
	"\n\t\t\t]. " +
	"\n\t\t\tExtButton new " +
	"\n\t\t\t\ttext: 'Zahodit změny'; " +
	"\n\t\t\t\ticonCls: #'btn-cancel';" +
	"\n\t\t\t\ton: #click do: [self zahodZmeny]}",
	null, "2013-09-12T20:17:54Z", "mp", 1);

jst.FYTaxonEditor.addMethod("initButtons", "", "initialization", 
	"\teditor" +
	"\n\t\tbuttonAlign: #left;" +
	"\n\t\tbuttons: {" +
	"\n\t\t\tExtButton new " +
	"\n\t\t\t\ttext: 'Uložit změny'; " +
	"\n\t\t\t\ticonCls: #'btn-save';" +
	"\n\t\t\t\tformBind: true; " +
	"\n\t\t\t\ton: #click do: [self isModified " +
	"\n\t\t\t\t\tifTrue: [self ulozZmeny]" +
	"\n\t\t\t\t\tifFalse: [self bezeZmen]" +
	"\n\t\t\t]. " +
	"\n\t\t\tExtButton new " +
	"\n\t\t\t\ttext: 'Zahodit změny'; " +
	"\n\t\t\t\ticonCls: #'btn-cancel';" +
	"\n\t\t\t\ton: #click do: [" +
	"\n\t\t\t\t\tself zahodZmeny." +
	"\n\t\t\t\t\tdialog ifNotNil: [dialog close]]}",
	null, "2013-09-16T09:10:17Z", "mp"); //fytoportal-foto-edit

jst.FYTaxonEditor.addMethod("bezeZmen", "", "private", 
	"\tself inform: taxon asString->'Beze změn.'",
	null, "2013-06-24T21:45:22Z", "mp", 1);

jst.FYTaxonEditor.addMethod("bezeZmen", "", "private", 
	"\tself inform: taxon asString->'Beze změn.'." +
	"\n\tdialog ifNotNil: [dialog close]",
	null, "2013-09-16T09:11:08Z", "mp"); //fytoportal-foto-edit

jst.FYTaxonEditor.addMethod("form", "", "private", 
	"\t^ editor form",
	null, "2013-02-20T12:26:52Z", "mp");

jst.FYTaxonEditor.addMethod("isModified", "", "private", 
	"\t^ taxon notNil and: [self form isDirty]",
	null, "2013-01-24T13:39:50Z", "mp");

/*
jst.FYTaxonEditor.addMethod("activateEvent", "", "events", 
	"\t^ [aktivni ifFalse: [" +
	"\n\t\taktivni := true." +
	"\n\t\ttaxon ifNotNil: [" +
	"\n\t\t\tself taxon: taxon]]]",
	null, "2012-08-15T17:53:45Z", "mp");

jst.FYTaxonEditor.addMethod("deactivateEvent", "", "events", 
	"\t^ [aktivni ifTrue: [" +
	"\n\t\taktivni := false." +
	"\n\t\tself stopMonitoring]]",
	null, "2012-08-15T17:54:25Z", "mp");

jst.FYTaxonEditor.addMethod("activateEvent", "", "events", 
	"\t^ [taxon ifNotNil: [" +
	"\n\t\tself taxon: taxon]]",
	null, "2013-02-05T22:06:48Z", "mp");

jst.FYTaxonEditor.addMethod("activateEvent", "", "events", 
	"\t^ [jinyTaxon ifNotNil: [" +
	"\n\t\tself taxon: jinyTaxon]]",
	null, "2013-04-27T21:44:36Z", "mp");
*/
jst.FYTaxonEditor.addMethod("activateEvent", "", "events", 
	"\t^ [jinyTaxon " +
	"\n\t\tifNotNil: [self taxon: jinyTaxon]" +
	"\n\t\tifNil: [editor startMonitoring]]",
	null, "2013-04-27T22:08:20Z", "mp");

jst.FYTaxonEditor.addMethod("deactivateEvent", "", "events", 
	"\t^ [editor stopMonitoring]",
	null, "2013-02-20T12:24:56Z", "mp");

/*
jst.FYTaxonEditor.addMethod("y:", "aNumber", "accessing", 
	"\teditor y: aNumber",
	null, "2013-02-20T12:25:19Z", "mp");
*/

jst.FYTaxonEditor.addMethod("isActive", "", "testing", 
	"\t^ dialog notNil or: [super isActive]",
	null, "2013-09-13T13:38:06Z", "mp");

jst.FYTaxonEditor.addMethod("editor", "", "private", 
	"\t^ editor",
	null, "2013-09-15T20:58:31Z", "mp");

// *** FYVyberTaxonu ***

jst.FYVyberTaxonu._class.addMethod("url:title:", "anUrl aString", "instance creation", 
	"\t| vyb |" +
	"\n\tvyb := self new " +
	"\n\t\ttitle: aString." +
	"\n\tvyb store url: anUrl." +
	"\n\tvyb keypressFilter: [:ev | vyb store filterBy: [:rec | | fld |" +
	"\n\t\tfld := ev keyChar isUppercase ifTrue: [#latinsky] ifFalse: [#cesky]." +
	"\n\t\t((rec data at: fld) asString startsWith: ev keyChar) or: [(rec data at: #vyber) = true]]]." +
	"\n\t^ vyb",
	null, "2014-02-22T22:17:38Z", "mp");

jst.FYVyberTaxonu.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\tstore: (ExtJsonStore new" +
	"\n\t\t\trestful: true;" +
	"\n\t\t\tautoDestroy: true;" +
	"\n\t\t\troot: 'rows';" +
	"\n\t\t\tfields: {'id'. (ExtField new name: 'vyber'; type: #boolean). 'cesky'. 'latinsky'};" +
	"\n\t\t\tdefaultSortBy: 'vyber' asc: false);" +
	"\n\t\tcolumns: {" +
	"\n\t\t\tExtCheckColumn new header: 'A/N'; dataIndex: #vyber; width: 50; isSortable: true." +
	"\n\t\t\tExtColumn new header: 'Český název'; dataIndex: #cesky; width: 180; isSortable: true." +
	"\n\t\t\tExtColumn new header: 'Vědecký název'; dataIndex: #latinsky; width: 180; isSortable: true};" +
	"\n\t\tanchor: '100%'",
	null, "2014-02-22T21:00:52Z", "mp", 1);

jst.FYVyberTaxonu.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\tstore: (ExtJsonStore new" +
	"\n\t\t\trestful: true;" +
	"\n\t\t\tautoDestroy: true;" +
	"\n\t\t\troot: 'rows';" +
	"\n\t\t\tfields: {'id'. (ExtField new name: 'vyber'; type: #boolean). 'cesky'. 'latinsky'};" +
	"\n\t\t\tdefaultSortBy: 'vyber' asc: false);" +
	"\n\t\tcolumns: {" +
	"\n\t\t\tExtCheckColumn new header: 'A/N'; dataIndex: #vyber; width: 50; isSortable: true." +
	"\n\t\t\tExtColumn new header: 'Český název'; dataIndex: #cesky; width: 300; isSortable: true." +
	"\n\t\t\tExtColumn new header: 'Vědecký název'; dataIndex: #latinsky; width: 300; isSortable: true};" +
	"\n\t\tanchor: '100%'",
	null, "2014-02-25T16:42:55Z", "mp"); //fytoportal-foto-edit

jst.FYVyberTaxonu.addMethod("novyVyberPro:", "aCollection", "accessing", 
	"\t| vyber |" +
	"\n\tvyber := OrderedCollection withAll: aCollection." +
	"\n\tself store modifiedRecords do: [:rec | (rec data at: #vyber) " +
	"\n\t\tifTrue: [(vyber includes: rec id) ifFalse: [vyber add: rec id]]" +
	"\n\t\tifFalse: [(vyber includes: rec id) ifTrue: [vyber remove: rec id]]]." +
	"\n\t^ vyber",
	null, "2014-02-22T20:41:58Z", "mp");

//*** FYTaxonPopisEditor ***

jst.FYTaxonPopisEditor.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\ttrackResetOnLoad: true;" +
	"\n\t\tadd: (ExtTextField new name: 'cesky'; fieldLabel: 'Český název'; allowBlank: false; anchor: '100%');" +
	"\n\t\tadd: (ExtTextField new name: 'latinsky'; fieldLabel: 'Vědecký název'; anchor: '100%');" +
	"\n\t\tadd: (ExtTextArea new name: 'synonyma'; fieldLabel: 'Vědecká synonyma'; anchor: '100%');" +
	"\n\t\tadd: (ExtTextArea new name: 'dalsiNazvy'; fieldLabel: 'Další názvy'; anchor: '100%');" +
	"\n\t\tadd: (ExtTextField new name: 'kody'; fieldLabel: 'EPPO kódy'; anchor: '100%');" +
	"\n\t\tadd: self popisPlodiny;" +
	"\n\t\tbuttons: {" +
	"\n\t\t\tExtButton new text: 'Uložit změny'; formBind: true; on: #click do: [self form isDirty ifTrue: [self ulozZmeny]]. " +
	"\n\t\t\tExtButton new text: 'Zahodit změny'; on: #click do: [self zahodZmeny]}",
	null, "2012-08-14T20:54:02Z", "mp", 1);

jst.FYTaxonPopisEditor.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\teditor" +
	"\n\t\ttrackResetOnLoad: true;" +
	"\n\t\tadd: (self poleCesky allowBlank: false; anchor: '100%');" +
	"\n\t\tadd: (ExtTextField new name: 'latinsky'; fieldLabel: 'Vědecký název'; anchor: '100%');" +
	"\n\t\tadd: (ExtTextArea new name: 'synonyma'; fieldLabel: 'Vědecká synonyma'; anchor: '100%');" +
	"\n\t\tadd: (ExtTextArea new name: 'dalsiNazvy'; fieldLabel: 'Další názvy'; anchor: '100%');" +
	"\n\t\tadd: (ExtTextField new name: 'kody'; fieldLabel: 'EPPO kódy'; anchor: '100%');" +
	"\n\t\tadd: (ExtFieldSet new title: 'Taxonomické zařazení';" +
	"\n\t\t\tadd: (ExtCompositeField new hideLabel: true; defaultAt: #width put: 35; items: {" +
	"\n\t\t\t\tExtDisplayField new value: 'Říše'. ExtTextField new name: 'rise'; width: 180." +
	"\n\t\t\t\tExtDisplayField new value: 'Třída'. ExtTextField new name: 'trida'; width: 180});" +
	"\n\t\t\tadd: (ExtCompositeField new hideLabel: true; defaultAt: #width put: 35; items: {" +
	"\n\t\t\t\tExtDisplayField new value: 'Řád'. ExtTextField new name: 'rad'; width: 180." +
	"\n\t\t\t\tExtDisplayField new value: 'Čeleď'. ExtTextField new name: 'celed'; width: 180});" +
	"\n\t\t\tyourself);" +
	"\n\t\tadd: self zarazeniSO;" +
	"\n\t\tadd: self popisPlodiny",
	null, "2013-02-20T12:25:29Z", "mp", 1);

jst.FYTaxonPopisEditor.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\teditor" +
	"\n\t\ttrackResetOnLoad: true;" +
	"\n\t\tadd: (self poleCesky allowBlank: false; anchor: '100%');" +
	"\n\t\tadd: (ExtTextField new name: 'latinsky'; fieldLabel: 'Vědecký název'; anchor: '100%');" +
	"\n\t\tadd: (ExtTextArea new name: 'synonyma'; fieldLabel: 'Vědecká synonyma'; anchor: '100%');" +
	"\n\t\tadd: (ExtTextArea new name: 'dalsiNazvy'; fieldLabel: 'Další názvy'; anchor: '100%');" +
	"\n\t\tadd: (ExtTextField new name: 'kody'; fieldLabel: 'EPPO kódy'; anchor: '100%');" +
	"\n\t\tadd: (ExtFieldSet new title: 'Taxonomické zařazení';" +
	"\n\t\t\tadd: (ExtCompositeField new hideLabel: true; defaultAt: #width put: 35; items: {" +
	"\n\t\t\t\tExtDisplayField new value: 'Říše'. self cboxZarazeni: 'rise'." +
	"\n\t\t\t\tExtDisplayField new value: 'Třída'. self cboxZarazeni: 'trida'});" +
	"\n\t\t\tadd: (ExtCompositeField new hideLabel: true; defaultAt: #width put: 35; items: {" +
	"\n\t\t\t\tExtDisplayField new value: 'Řád'. self cboxZarazeni: 'rad'." +
	"\n\t\t\t\tExtDisplayField new value: 'Čeleď'. self cboxZarazeni: 'celed'});" +
	"\n\t\t\tyourself);" +
	"\n\t\tadd: self zarazeniSO;" +
	"\n\t\tadd: self popisPlodiny",
	null, "2013-09-18T21:42:06Z", "mp", 1);

jst.FYTaxonPopisEditor.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\teditor" +
	"\n\t\ttrackResetOnLoad: true;" +
	"\n\t\tadd: (self poleCesky allowBlank: false; anchor: '100%');" +
	"\n\t\tadd: (ExtTextField new name: 'latinsky'; fieldLabel: 'Vědecký název'; anchor: '100%');" +
	"\n\t\tadd: (ExtTextArea new name: 'synonyma'; fieldLabel: 'Vědecká synonyma'; anchor: '100%');" +
	"\n\t\tadd: (ExtTextArea new name: 'dalsiNazvy'; fieldLabel: 'Další názvy'; anchor: '100%');" +
	"\n\t\tadd: (ExtTextField new name: 'kody'; fieldLabel: 'EPPO kódy'; anchor: '100%');" +
	"\n\t\tadd: (ExtFieldSet new title: 'Taxonomické zařazení';" +
	"\n\t\t\tadd: (ExtCompositeField new hideLabel: true; defaultAt: #width put: 35; items: {" +
	"\n\t\t\t\tExtDisplayField new value: 'Říše'. FYTaxonZarazeni new skupina: #rise." +
	"\n\t\t\t\tExtDisplayField new value: 'Třída'. FYTaxonZarazeni new skupina: #trida});" +
	"\n\t\t\tadd: (ExtCompositeField new hideLabel: true; defaultAt: #width put: 35; items: {" +
	"\n\t\t\t\tExtDisplayField new value: 'Řád'. FYTaxonZarazeni new skupina: #rad." +
	"\n\t\t\t\tExtDisplayField new value: 'Čeleď'. FYTaxonZarazeni new skupina: #celed});" +
	"\n\t\t\tyourself);" +
	"\n\t\tadd: self zarazeniSO;" +
	"\n\t\tadd: self popisPlodiny",
	null, "2013-10-23T11:31:20Z", "mp", 1);

jst.FYTaxonPopisEditor.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\teditor" +
	"\n\t\ttrackResetOnLoad: true;" +
	"\n\t\tadd: (self poleCesky anchor: '100%');" +
	"\n\t\tadd: (ExtTextField new name: 'latinsky'; fieldLabel: 'Vědecký název'; anchor: '100%');" +
	"\n\t\tadd: (ExtTextArea new name: 'synonyma'; fieldLabel: 'Vědecká synonyma'; anchor: '100%');" +
	"\n\t\tadd: (ExtTextArea new name: 'dalsiNazvy'; fieldLabel: 'Další názvy'; anchor: '100%');" +
	"\n\t\tadd: (ExtTextField new name: 'kody'; fieldLabel: 'EPPO kódy'; anchor: '100%');" +
	"\n\t\tadd: (ExtFieldSet new title: 'Taxonomické zařazení';" +
	"\n\t\t\tadd: (ExtCompositeField new hideLabel: true; defaultAt: #width put: 35; items: {" +
	"\n\t\t\t\tExtDisplayField new value: 'Říše'. FYTaxonZarazeni new skupina: #rise." +
	"\n\t\t\t\tExtDisplayField new value: 'Třída'. FYTaxonZarazeni new skupina: #trida});" +
	"\n\t\t\tadd: (ExtCompositeField new hideLabel: true; defaultAt: #width put: 35; items: {" +
	"\n\t\t\t\tExtDisplayField new value: 'Řád'. FYTaxonZarazeni new skupina: #rad." +
	"\n\t\t\t\tExtDisplayField new value: 'Čeleď'. FYTaxonZarazeni new skupina: #celed});" +
	"\n\t\t\tyourself);" +
	"\n\t\tadd: self zarazeniSO;" +
	"\n\t\tadd: self popisPlodiny",
	null, "2014-01-15T08:35:42Z", "mp", 1);

jst.FYTaxonPopisEditor.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\teditor" +
	"\n\t\ttrackResetOnLoad: true;" +
	"\n\t\tadd: (self poleCesky anchor: '100%');" +
	"\n\t\tadd: (ExtTextField new name: 'latinsky'; fieldLabel: 'Vědecký název'; anchor: '100%');" +
	"\n\t\tadd: (ExtTextArea new name: 'synonyma'; fieldLabel: 'Vědecká synonyma'; anchor: '100%');" +
	"\n\t\tadd: (ExtTextArea new name: 'dalsiNazvy'; fieldLabel: 'Další názvy'; anchor: '100%');" +
	"\n\t\tadd: (ExtTextField new name: 'kody'; fieldLabel: 'EPPO kódy'; anchor: '100%');" +
	"\n\t\tadd: (ExtFieldSet new title: 'Taxonomické zařazení';" +
	"\n\t\t\tadd: (ExtCompositeField new hideLabel: true; defaultAt: #width put: 35; items: {" +
	"\n\t\t\t\tExtDisplayField new value: 'Říše'. FYTaxonZarazeni new skupina: #rise." +
	"\n\t\t\t\tExtDisplayField new value: 'Třída'. FYTaxonZarazeni new skupina: #trida});" +
	"\n\t\t\tadd: (ExtCompositeField new hideLabel: true; defaultAt: #width put: 35; items: {" +
	"\n\t\t\t\tExtDisplayField new value: 'Řád'. FYTaxonZarazeni new skupina: #rad." +
	"\n\t\t\t\tExtDisplayField new value: 'Čeleď'. FYTaxonZarazeni new skupina: #celed});" +
	"\n\t\t\tyourself);" +
	"\n\t\tadd: self zarazeniSO;" +
	"\n\t\tadd: self popisPlodiny;" +
	"\n\t\tadd: ((puvodciChoroby := FYVyberTaxonu" +
	"\n\t\t\turl: Fytoportal data skodlOrg doc url, '_list/store-vyber/puvodciChorob'" +
	"\n\t\t\ttitle: 'Původci choroby') height: 303; hide)",
	null, "2014-02-22T21:33:36Z", "mp"); //fytoportal-foto-edit

jst.FYTaxonPopisEditor.addMethod("initButtons", "", "initialization", 
	"\tsuper initButtons." +
	"\n\teditor buttons: (editor buttons copyWith: (" +
	"\n\t\tdeleteBtn := ExtButton new " +
	"\n\t\t\ttext: 'Smazat taxon'; " +
	"\n\t\t\ticonCls: #'btn-delete'; " +
	"\n\t\t\tbeDisabled; " +
	"\n\t\t\ton: #click do: [self taxonLzeSmazat ifTrue: [UIManager default " +
	"\n\t\t\t\tconfirm: 'Vybraný taxon bude odstraněn z databáze. Chcete pokračovat?' " +
	"\n\t\t\t\tthenDo: [self smazTaxon]]]" +
	"\n\t))." +
	"\n\t\"zatim tlacitko nepublikuji, protoze neni doresena aktualizace komponent\"" +
	"\n\tdeleteBtn isVisible: Smalltalk isRuntime not",
	null, "2014-02-24T20:01:52Z", "mp", 1);

jst.FYTaxonPopisEditor.addMethod("initButtons", "", "initialization", 
	"\tsuper initButtons." +
	"\n\teditor buttons: (editor buttons copyWithAll: {" +
	"\n\t\taddBtn := ExtButton new " +
	"\n\t\t\ttext: 'Přidat taxon';" +
	"\n\t\t\tbeDisabled;" +
	"\n\t\t\ttooltip: 'Přidejte původce choroby, pokud chybí v seznamu...';" +
	"\n\t\t\ticonCls: #'btn-add'; " +
	"\n\t\t\ton: #click do: [ | so |" +
	"\n\t\t\t\tso := FYSkodlOrg new." +
	"\n\t\t\t\ttaxon ifNotNil: [so " +
	"\n\t\t\t\t\tplodiny: taxon plodiny; " +
	"\n\t\t\t\t\tzarazeni: taxon zarazeni]." +
	"\n\t\t\t\t(FYTaxonPopisEditor new asDialogOn: so) show]." +
	"\n\t\tdeleteBtn := ExtButton new " +
	"\n\t\t\ttext: 'Smazat taxon'; " +
	"\n\t\t\ticonCls: #'btn-delete'; " +
	"\n\t\t\tbeDisabled; " +
	"\n\t\t\ton: #click do: [self taxonLzeSmazat ifTrue: [UIManager default " +
	"\n\t\t\t\tconfirm: 'Vybraný taxon bude odstraněn z databáze. Chcete pokračovat?' " +
	"\n\t\t\t\tthenDo: [self smazTaxon]]]" +
	"\n\t})." +
	"\n\t\"zatim tlacitko nepublikuji, protoze neni doresena aktualizace komponent\"" +
	"\n\tdeleteBtn isVisible: Smalltalk isRuntime not",
	null, "2014-02-27T16:50:52Z", "mp"); //fytoportal-foto-edit

/* presunuto do samostatne tridy FYTaxonZarazeni
jst.FYTaxonPopisEditor.addMethod("cboxZarazeni:", "nazev", "private", 
	"\t^ ExtComboBox new " +
	"\n\t\ttypeAhead: true;" +
	"\n\t\ttriggerAction: #all;" +
	"\n\t\tselectOnFocus: true;" +
	"\n\t\tmode: 'local';" +
	"\n\t\tstore: (ExtJsonStore new" +
	"\n\t\t\trestful: true;" +
	"\n\t\t\tautoLoad: true;" +
	"\n\t\t\tautoDestroy: true;" +
	"\n\t\t\turl: (Fytoportal data taxony zarazeni: nazev) url asString, '?group=true';" +
	"\n\t\t\troot: 'rows';" +
	"\n\t\t\tfields: {'key'. 'value'});" +
	"\n\t\tdisplayField: 'key';" +
	"\n\t\tvalueField: 'key';" +
	"\n\t\tname: nazev;" +
	"\n\t\thiddenName: nazev;" +
	"\n\t\twidth: 220",
	null, "2013-09-18T21:44:24Z", "mp");
*/

jst.FYTaxonPopisEditor.addMethod("poleCesky", "", "private", 
	"\t^ ExtTextField new name: 'cesky'; fieldLabel: 'Český název'",
	null, "2013-01-18T21:43:26Z", "mp", 1);

jst.FYTaxonPopisEditor.addMethod("poleCesky", "", "private", 
	"\t^ ExtCompositeField new items: {" +
	"\n\t\tExtTextField new name: #cesky; fieldLabel: 'Český název'; allowBlank: false; width: 500." +
	"\n\t\tExtCheckbox new name: #publikovat; boxLabel: 'publikovat'; checked: true}",
	null, "2014-01-15T08:52:42Z", "mp");

jst.FYTaxonPopisEditor.addMethod("taxon:", "anObject", "accessing", 
	"\ttaxon := anObject." +
	"\n\taktivni ifFalse: [" +
	"\n\t\t^ self]." +
	"\n\tself stopMonitoring." +
	"\n\ttaxon jePlodina" +
	"\n\t\tifTrue: [" +
	"\n\t\t\tzarazeniSO beDisabled; hide." +
	"\n\t\t\tpopisPlodiny beEnabled; reset; show];" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tzarazeniSO beEnabled; reset; show." +
	"\n\t\t\tpopisPlodiny beDisabled; hide]." +
	"\n\tself form values: taxon formValues." +
	"\n\tself startMonitoring.",
	null, "2013-02-02T22:36:24Z", "mp", 1);

jst.FYTaxonPopisEditor.addMethod("taxon:", "anObject", "accessing", 
	"\ttaxon := anObject." +
	"\n\tself isActive ifFalse: [" +
	"\n\t\t^ self]." +
	"\n\teditor stopMonitoring." +
	"\n\ttaxon jePlodina" +
	"\n\t\tifTrue: [" +
	"\n\t\t\tzarazeniSO beDisabled; hide." +
	"\n\t\t\tpopisPlodiny beEnabled; reset; show];" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tzarazeniSO beEnabled; reset; show." +
	"\n\t\t\tpopisPlodiny beDisabled; hide]." +
	"\n\teditor form values: taxon formValues." +
	"\n\teditor startMonitoring.",
	null, "2013-02-20T12:25:50Z", "mp", 2);

jst.FYTaxonPopisEditor.addMethod("taxon:", "anObject", "accessing", 
	"\tjinyTaxon := anObject." +
	"\n\tself isActive ifFalse: [" +
	"\n\t\t^ self]." +
	"\n\ttaxon := jinyTaxon." +
	"\n\tjinyTaxon := nil." +
	"\n\teditor stopMonitoring." +
	"\n\ttaxon jePlodina" +
	"\n\t\tifTrue: [" +
	"\n\t\t\tzarazeniSO beDisabled; hide." +
	"\n\t\t\tpopisPlodiny beEnabled; reset; show];" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tzarazeniSO beEnabled; reset; show." +
	"\n\t\t\tpopisPlodiny beDisabled; hide]." +
	"\n\teditor form values: taxon formValues." +
	"\n\teditor startMonitoring.",
	null, "2013-04-27T21:44:06Z", "mp", 3);

jst.FYTaxonPopisEditor.addMethod("taxon:", "anObject", "accessing", 
	"\tjinyTaxon := anObject." +
	"\n\tself isActive ifFalse: [" +
	"\n\t\t^ self]." +
	"\n\ttaxon := jinyTaxon." +
	"\n\tjinyTaxon := nil." +
	"\n\teditor stopMonitoring." +
	"\n\ttaxon jePlodina" +
	"\n\t\tifTrue: [" +
	"\n\t\t\tzarazeniSO beDisabled; hide." +
	"\n\t\t\tpuvodciChoroby hide." +
	"\n\t\t\tpopisPlodiny beEnabled; reset; show];" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tzarazeniSO beEnabled; reset; show." +
	"\n\t\t\tpopisPlodiny beDisabled; hide." +
	"\n\t\t\tpuvodciChoroby store " +
	"\n\t\t\t\tparameterAt: #vyber put: (taxon puvodciChoroby asTextualList: #yourself separator: ','); " +
	"\n\t\t\t\tload." +
	"\n\t\t\tpuvodciChoroby show]." +
	"\n\teditor form values: taxon formValues." +
	"\n\teditor startMonitoring.",
	null, "2014-02-22T21:13:03Z", "mp", 1);

jst.FYTaxonPopisEditor.addMethod("taxon:", "anObject", "accessing", 
	"\tjinyTaxon := anObject." +
	"\n\tself isActive ifFalse: [" +
	"\n\t\t^ self]." +
	"\n\ttaxon := jinyTaxon." +
	"\n\tjinyTaxon := nil." +
	"\n\teditor stopMonitoring." +
	"\n\ttaxon jePlodina" +
	"\n\t\tifTrue: [" +
	"\n\t\t\tzarazeniSO beDisabled; hide." +
	"\n\t\t\tpuvodciChoroby hide." +
	"\n\t\t\tpopisPlodiny beEnabled; reset; show];" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tzarazeniSO beEnabled; reset; show." +
	"\n\t\t\tpopisPlodiny beDisabled; hide." +
	"\n\t\t\tpuvodciChoroby store " +
	"\n\t\t\t\tparameterAt: #vyber put: (taxon puvodciChoroby asTextualList: #yourself separator: ','); " +
	"\n\t\t\t\tload." +
	"\n\t\t\tpuvodciChoroby show]." +
	"\n\tdeleteBtn isVisible ifTrue: [" +
	"\n\t\tdeleteBtn isDisabled: taxon jePlodina]." +
	"\n\teditor form values: taxon formValues." +
	"\n\teditor startMonitoring.",
	null, "2014-02-24T16:45:04Z", "mp", 1);

jst.FYTaxonPopisEditor.addMethod("taxon:", "anObject", "accessing", 
	"\tjinyTaxon := anObject." +
	"\n\tself isActive ifFalse: [" +
	"\n\t\t^ self]." +
	"\n\ttaxon := jinyTaxon." +
	"\n\tjinyTaxon := nil." +
	"\n\teditor stopMonitoring." +
	"\n\ttaxon jePlodina" +
	"\n\t\tifTrue: [" +
	"\n\t\t\tzarazeniSO beDisabled; hide." +
	"\n\t\t\tpuvodciChoroby hide." +
	"\n\t\t\tpopisPlodiny beEnabled; reset; show];" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tzarazeniSO beEnabled; reset; show." +
	"\n\t\t\tpopisPlodiny beDisabled; hide." +
	"\n\t\t\tpuvodciChoroby store " +
	"\n\t\t\t\tparameterAt: #vyber put: (taxon puvodciChoroby asTextualList: #yourself separator: ','); " +
	"\n\t\t\t\tload." +
	"\n\t\t\tpuvodciChoroby show]." +
	"\n\t(deleteBtn notNil and: [deleteBtn isVisible]) ifTrue: [" +
	"\n\t\tdeleteBtn isDisabled: taxon jePlodina]." +
	"\n\teditor form values: taxon formValues." +
	"\n\teditor startMonitoring.",
	null, "2014-02-25T16:18:44Z", "mp", 1);

jst.FYTaxonPopisEditor.addMethod("taxon:", "anObject", "accessing", 
	"\tjinyTaxon := anObject." +
	"\n\tself isActive ifFalse: [" +
	"\n\t\t^ self]." +
	"\n\ttaxon := jinyTaxon." +
	"\n\tjinyTaxon := nil." +
	"\n\teditor stopMonitoring." +
	"\n\ttaxon jePlodina" +
	"\n\t\tifTrue: [" +
	"\n\t\t\tzarazeniSO beDisabled; hide." +
	"\n\t\t\tpuvodciChoroby hide." +
	"\n\t\t\tpopisPlodiny beEnabled; reset; show];" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tzarazeniSO beEnabled; reset; show." +
	"\n\t\t\tpopisPlodiny beDisabled; hide." +
	"\n\t\t\tpuvodciChoroby store " +
	"\n\t\t\t\tparameterAt: #vyber put: (taxon puvodciChoroby asTextualList: #yourself separator: ','); " +
	"\n\t\t\t\tload." +
	"\n\t\t\tpuvodciChoroby show]." +
	"\n\taddBtn isDisabled: taxon jePlodina." +
	"\n\t(deleteBtn notNil and: [deleteBtn isVisible]) ifTrue: [" +
	"\n\t\tdeleteBtn isDisabled: taxon jePlodina]." +
	"\n\teditor form values: taxon formValues." +
	"\n\teditor startMonitoring.",
	null, "2014-02-27T14:05:27Z", "mp"); //fytoportal-foto-edit

jst.FYTaxonPopisEditor.addMethod("popisPlodiny", "", "accessing", 
	"\t^ popisPlodiny ifNil: [popisPlodiny := ExtHtmlEditor new " +
	"\n\t\tname: 'popis'; " +
	"\n\t\thideLabel: true; " +
	"\n\t\tenableFont: false;" +
	"\n\t\tenableFontSize: false;" +
	"\n\t\tanchor: '100%'; " +
	"\n\t\theight: 340; " +
	"\n\t\thide]",
	null, "2013-02-20T12:52:16Z", "mp");

jst.FYTaxonPopisEditor.addMethod("zarazeniSO", "", "private", 
	"\t^ zarazeniSO ifNil: [zarazeniSO := ExtComboBox new " +
	"\n\t\tname: 'zarazeni'; " +
	"\n\t\tfieldLabel: 'Zařazení dle etiologie'; " +
	"\n\t\ttypeAhead: true;" +
	"\n\t\ttriggerAction: #all;" +
	"\n\t\tforceSelection: true;" +
	"\n\t\tstore: Fytoportal data zarazeniSO;" +
	"\n\t\thide]",
	null, "2013-01-18T15:49:26Z", "mp", 1);

jst.FYTaxonPopisEditor.addMethod("zarazeniSO", "", "private", 
	"\t^ zarazeniSO ifNil: [zarazeniSO := ExtComboBox new " +
	"\n\t\tname: 'zarazeni'; " +
	"\n\t\tfieldLabel: 'Zařazení dle etiologie'; " +
	"\n\t\ttypeAhead: true;" +
	"\n\t\ttriggerAction: #all;" +
	"\n\t\tforceSelection: true;" +
	"\n\t\tstore: Fytoportal data zarazeniSO;" +
	"\n\t\tallowBlank: false; " +
	"\n\t\thide]",
	null, "2013-11-01T14:18:44Z", "mp"); //fytoportal-foto-edit

jst.FYTaxonPopisEditor.addMethod("isModified", "", "testing", 
	"\t^ super isModified or: [puvodciChoroby isVisible and: [" +
	"\n\t\tpuvodciChoroby store modifiedRecords anySatisfy: [:rec |" +
	"\n\t\t\t(rec data at: #vyber) ~= (taxon puvodciChoroby includes: rec id)]]]",
	null, "2014-02-22T21:38:34Z", "mp");

jst.FYTaxonPopisEditor.addMethod("zahodZmeny", "", "actions", 
	"\tself form reset",
	null, "2012-08-14T14:46:51Z", "mp", 1);

jst.FYTaxonPopisEditor.addMethod("zahodZmeny", "", "actions", 
	"\tself form reset." +
	"\n\ttaxon jePlodina ifFalse: [" +
	"\n\t\tpuvodciChoroby store rejectChanges]",
	null, "2014-02-22T21:39:49Z", "mp"); //fytoportal-foto-edit

jst.FYTaxonPopisEditor.addMethod("ulozZmeny", "", "actions", 
	"\ttaxon := Fytoportal db loadObject: taxon id." +
	"\n\ttaxon values: self form values." +
	"\n\tFytoportal db storeObject: taxon." +
	"\n\tself taxon: taxon." +
	"\n\tself broadcastEvent: #zmenaPopisuTaxonu: with: taxon",
	null, "2012-08-17T09:45:01Z", "mp", 1);

jst.FYTaxonPopisEditor.addMethod("ulozZmeny", "", "actions", 
	"\t| novyNazev |" +
	"\n\tnovyNazev := self form values at: #cesky." +
	"\n\t\"nejprve kontrola na duplicitu\"" +
	"\n\ttaxon cesky = novyNazev ifFalse: [ | data |" +
	"\n\t\tdata := Fytoportal data perform: (taxon jePlodina ifTrue: #plodiny ifFalse: #skodlOrg)." +
	"\n\t\t(data cesky lookupKey: novyNazev) ifNotEmptyDo: [:vysl |" +
	"\n\t\t\t(vysl first at: #id) = taxon id ifFalse: [" +
	"\n\t\t\t\t^ UIManager default " +
	"\n\t\t\t\t\tshowErrorInfo: 'Taxon se stejným českým názvem již existuje!']]" +
	"\n\t]." +
	"\n\tnovyNazev = taxon cesky ifFalse: [" +
	"\n\t\t^ UIManager default " +
	"\n\t\t\tconfirm: 'Opravdu chcete změnit název taxonu? Přepsání taxonu jiným taxonem by totiž mělo fatální následky...' " +
	"\n\t\t\tthenDo: [self ulozTaxon]]." +
	"\n\tself ulozTaxon",
	null, "2013-01-24T12:32:23Z", "mp", 1);

jst.FYTaxonPopisEditor.addMethod("ulozZmeny", "", "actions", 
	"\t| novyNazev |" +
	"\n\tnovyNazev := (self form findField: #cesky) value." +
	"\n\ttaxon cesky = novyNazev ifFalse: [" +
	"\n\t\t| view proxy |" +
	"\n\t\t\"nejprve kontrola na duplicitu\"" +
	"\n\t\tview := taxon jePlodina ifTrue: [#nazvyPlodin] ifFalse: [#nazvySkodlOrg]." +
	"\n\t\tproxy := JSObjectProxy new." +
	"\n\t\t((Fytoportal data taxony overNazvy: view podle: novyNazev) anySatisfy: [:obj | " +
	"\n\t\t\tproxy jsObject: obj. " +
	"\n\t\t\t(proxy at: #id) ~= taxon id]) ifTrue: [" +
	"\n\t\t\t^ UIManager default " +
	"\n\t\t\t\tshowErrorInfo: 'Taxon se stejným českým názvem již existuje!']." +
	"\n\t\t^ UIManager default " +
	"\n\t\t\tconfirm: 'Opravdu chcete změnit název taxonu? Přepsání taxonu jiným taxonem by totiž mělo fatální následky...' " +
	"\n\t\t\tthenDo: [self ulozTaxon]." +
	"\n\t]." +
	"\n\tself ulozTaxon",
	null, "2013-09-16T09:42:48Z", "mp", 1);

jst.FYTaxonPopisEditor.addMethod("ulozZmeny", "", "actions", 
	"\t| novyNazev |" +
	"\n\t(vazby notNil and: [vazby editor isRendered not or: [vazby isValid not]]) ifTrue: [" +
	"\n\t\tvazby editor activate." +
	"\n\t\t^ self].\t" +
	"\n\tnovyNazev := (self form findField: #cesky) value." +
	"\n\ttaxon cesky = novyNazev ifFalse: [" +
	"\n\t\t| view proxy |" +
	"\n\t\t\"nejprve kontrola na duplicitu\"" +
	"\n\t\tview := taxon jePlodina ifTrue: [#nazvyPlodin] ifFalse: [#nazvySkodlOrg]." +
	"\n\t\tproxy := JSObjectProxy new." +
	"\n\t\t((Fytoportal data taxony overNazvy: view podle: novyNazev) anySatisfy: [:obj | " +
	"\n\t\t\tproxy jsObject: obj. " +
	"\n\t\t\t(proxy at: #id) ~= taxon id]) ifTrue: [" +
	"\n\t\t\t^ UIManager default " +
	"\n\t\t\t\tshowErrorInfo: 'Taxon se stejným českým názvem již existuje!']." +
	"\n\t\ttaxon cesky isEmptyOrNil ifFalse: [" +
	"\n\t\t\t^ UIManager default " +
	"\n\t\t\t\tconfirm: 'Opravdu chcete změnit název taxonu? Přepsání taxonu jiným taxonem by totiž mělo fatální následky...' " +
	"\n\t\t\t\tthenDo: [self ulozTaxon]]." +
	"\n\t]." +
	"\n\tself ulozTaxon",
	null, "2013-09-16T20:02:39Z", "mp", 1);

jst.FYTaxonPopisEditor.addMethod("ulozZmeny", "", "actions", 
	"\t| novyNazev |" +
	"\n\t(vazby notNil and: [vazby editor isRendered not or: [vazby isValid not]]) ifTrue: [" +
	"\n\t\tvazby editor activate." +
	"\n\t\t^ self].\t" +
	"\n\tnovyNazev := (self form findField: #cesky) value." +
	"\n\ttaxon cesky = novyNazev ifFalse: [" +
	"\n\t\t| view proxy |" +
	"\n\t\t\"nejprve kontrola na duplicitu\"" +
	"\n\t\tview := taxon jePlodina ifTrue: [#nazvyPlodin] ifFalse: [#nazvySkodlOrg]." +
	"\n\t\tproxy := JSObjectProxy new." +
	"\n\t\t((Fytoportal data taxony overNazvy: view podle: novyNazev) anySatisfy: [:obj | " +
	"\n\t\t\tproxy jsObject: obj. (proxy at: #id) ~= taxon id]) ifTrue: [" +
	"\n\t\t\t\t^ ((proxy at: #nalezy) includes: novyNazev) ifTrue: [UIManager default " +
	"\n\t\t\t\t\tshowErrorInfo: 'Taxon se stejným českým názvem již existuje: <b>', (proxy at: #text), '</b>!'" +
	"\n\t\t\t\t] ifFalse: [UIManager default " +
	"\n\t\t\t\t\tconfirm: 'Taxon s podobným názvem již existuje: <b>', (proxy at: #text), " +
	"\n\t\t\t\t\t\t'</b><br>Opravdu chcete do systému přidat nový taxon <b>', novyNazev, '</b>?'" +
	"\n\t\t\t\t\tthenDo: [self ulozTaxon]]" +
	"\n\t\t]." +
	"\n\t\ttaxon cesky isEmptyOrNil ifFalse: [" +
	"\n\t\t\t^ UIManager default " +
	"\n\t\t\t\tconfirm: 'Opravdu chcete změnit název taxonu? Přepsání taxonu jiným taxonem by totiž mělo fatální následky...' " +
	"\n\t\t\t\tthenDo: [self ulozTaxon]]." +
	"\n\t]." +
	"\n\tself ulozTaxon",
	null, "2013-11-04T10:28:03Z", "mp", 1);

jst.FYTaxonPopisEditor.addMethod("ulozZmeny", "", "actions", 
	"\t| novyNazev |" +
	"\n\t(vazby notNil and: [vazby editor isRendered not or: [vazby isValid not]]) ifTrue: [" +
	"\n\t\tself inform: 'Zkontrolujte/upravte vazby.'." +
	"\n\t\tvazby editor activate." +
	"\n\t\t^ self].\t" +
	"\n\tnovyNazev := (self form findField: #cesky) value." +
	"\n\ttaxon cesky = novyNazev ifFalse: [" +
	"\n\t\t| view proxy |" +
	"\n\t\t\"nejprve kontrola na duplicitu\"" +
	"\n\t\tview := taxon jePlodina ifTrue: [#nazvyPlodin] ifFalse: [#nazvySkodlOrg]." +
	"\n\t\tproxy := JSObjectProxy new." +
	"\n\t\t((Fytoportal data taxony overNazvy: view podle: novyNazev) anySatisfy: [:o | " +
	"\n\t\t\tproxy jsObject: o. (proxy at: #id) ~= taxon id]) ifTrue: [" +
	"\n\t\t\t\t^ ((proxy at: #nalezy) includes: novyNazev) ifTrue: [UIManager default " +
	"\n\t\t\t\t\tshowErrorInfo: 'Taxon se stejným českým názvem již existuje: <b>', (proxy at: #text), '</b>!'" +
	"\n\t\t\t\t] ifFalse: [UIManager default " +
	"\n\t\t\t\t\tconfirm: 'Taxon s podobným názvem již existuje: <b>', (proxy at: #text), " +
	"\n\t\t\t\t\t\t'</b><br>Opravdu chcete do systému přidat nový taxon <b>', novyNazev, '</b>?'" +
	"\n\t\t\t\t\tthenDo: [self ulozTaxon]]" +
	"\n\t\t]." +
	"\n\t\ttaxon cesky isEmptyOrNil ifFalse: [" +
	"\n\t\t\t^ UIManager default " +
	"\n\t\t\t\tconfirm: 'Opravdu chcete změnit název taxonu? Přepsání taxonu jiným taxonem by totiž mělo fatální následky...' " +
	"\n\t\t\t\tthenDo: [self ulozTaxon]]." +
	"\n\t]." +
	"\n\tself ulozTaxon",
	null, "2013-11-13T11:24:26Z", "mp"); //fytoportal-foto-edit

jst.FYTaxonPopisEditor.addMethod("ulozTaxon", "", "private", 
	"\t| novyTaxon |" +
	"\n\ttaxon id ifNotNil: [" +
	"\n\t\ttaxon := Fytoportal db loadObject: taxon id" +
	"\n\t] ifNil: [" +
	"\n\t\tnovyTaxon := #novyTaxon:]." +
	"\n\ttaxon values: self form values." +
	"\n\tFytoportal db storeObject: taxon." +
	"\n\tself taxon: taxon." +
	"\n\tself broadcastEvent: (novyTaxon ifNil: #zmenaPopisuTaxonu:) with: taxon",
	null, "2013-01-24T12:41:45Z", "mp", 1);

jst.FYTaxonPopisEditor.addMethod("ulozTaxon", "", "private", 
	"\t| novyTaxon |" +
	"\n\ttaxon id ifNotNil: [" +
	"\n\t\ttaxon := Fytoportal db loadObject: taxon id" +
	"\n\t] ifNil: [" +
	"\n\t\tnovyTaxon := #novyTaxon:]." +
	"\n\ttaxon values: self values." +
	"\n\tFytoportal db storeObject: taxon." +
	"\n\tself taxon: taxon." +
	"\n\tself broadcastEvent: (novyTaxon ifNil: #zmenaPopisuTaxonu:) with: taxon." +
	"\n\tdialog ifNotNil: [dialog close]",
	null, "2013-09-16T09:12:04Z", "mp", 2);

jst.FYTaxonPopisEditor.addMethod("ulozTaxon", "", "private", 
	"\t| novyTaxon |" +
	"\n\ttaxon id ifNotNil: [" +
	"\n\t\ttaxon := Fytoportal db loadObject: taxon id" +
	"\n\t] ifNil: [" +
	"\n\t\tnovyTaxon := #novyTaxon:]." +
	"\n\ttaxon values: self values." +
	"\n\t(self form findField: #publikovat) ifNotNilDo: [:fld |" +
	"\n\t\ttaxon publikovat: fld value]." +
	"\n\tFytoportal db storeObject: taxon." +
	"\n\tself taxon: taxon." +
	"\n\tself broadcastEvent: (novyTaxon ifNil: #zmenaPopisuTaxonu:) with: taxon." +
	"\n\tdialog ifNotNil: [dialog close]",
	null, "2014-01-15T14:21:59Z", "mp", 3);

jst.FYTaxonPopisEditor.addMethod("ulozTaxon", "", "private", 
	"\t| novyTaxon |" +
	"\n\ttaxon id ifNotNil: [" +
	"\n\t\ttaxon := Fytoportal db loadObject: taxon id" +
	"\n\t] ifNil: [" +
	"\n\t\tnovyTaxon := #novyTaxon:]." +
	"\n\ttaxon values: self values." +
	"\n\t(self form findField: #publikovat) ifNotNilDo: [:fld |" +
	"\n\t\ttaxon publikovat: fld value]." +
	"\n\ttaxon jePlodina ifFalse: [" +
	"\n\t\ttaxon puvodciChoroby: (puvodciChoroby novyVyberPro: taxon puvodciChoroby)]." +
	"\n\tFytoportal db storeObject: taxon." +
	"\n\tself taxon: taxon." +
	"\n\tself broadcastEvent: (novyTaxon ifNil: #zmenaPopisuTaxonu:) with: taxon." +
	"\n\tdialog ifNotNil: [dialog close]",
	null, "2014-02-22T21:44:40Z", "mp", 1);

jst.FYTaxonPopisEditor.addMethod("ulozTaxon", "", "private", 
	"\t| novyTaxon |" +
	"\n\ttaxon id ifNotNil: [" +
	"\n\t\ttaxon := Fytoportal db loadObject: taxon id" +
	"\n\t] ifNil: [" +
	"\n\t\tnovyTaxon := #novyTaxon:]." +
	"\n\ttaxon values: self values." +
	"\n\t(self form findField: #publikovat) ifNotNilDo: [:fld |" +
	"\n\t\ttaxon publikovat: fld value]." +
	"\n\ttaxon jePlodina ifFalse: [" +
	"\n\t\ttaxon puvodciChoroby: (puvodciChoroby novyVyberPro: taxon puvodciChoroby)." +
	"\n\t\tvazby ifNotNil: [\"jen v dialogu\"" +
	"\n\t\t\ttaxon plodiny: (vazby hostitele novyVyberPro: taxon plodiny)]]." +
	"\n\tFytoportal db storeObject: taxon." +
	"\n\tself taxon: taxon." +
	"\n\tself broadcastEvent: (novyTaxon ifNil: #zmenaPopisuTaxonu:) with: taxon." +
	"\n\tdialog ifNotNil: [dialog close]",
	null, "2014-03-04T15:35:21Z", "mp"); //fytoportal-foto-edit

jst.FYTaxonPopisEditor.addMethod("smazTaxon", "", "actions", 
	"\tFytoportal db deleteObject: taxon." +
	"\n\tself broadcastEvent: #'taxonSmazan:' with: taxon." +
	"\n\ttaxon := nil",
	null, "2014-02-24T16:49:26Z", "mp");

jst.FYTaxonPopisEditor.addMethod("taxonLzeSmazat", "", "private", 
	"\ttaxon isNil ifTrue: [" +
	"\n\t\tself inform: 'Nejdříve vyberte taxon, který chcete smazat.'." +
	"\n\t\t^ false]." +
	"\n\tself isModified ifTrue: [" +
	"\n\t\tself inform: 'Nejdříve ukončete editaci.'." +
	"\n\t\t^ false]." +
	"\n\t(Fytoportal data fotky vybraneFotkySkodlOrg urlParams: {#key. taxon id}; queryData) ifNotEmptyDo: [:sezn |" +
	"\n\t\tself inform: 'Taxon nelze smazat, jsou k němu připojeny fotky.'." +
	"\n\t\t^ false]." +
	"\n\t(Fytoportal data metodiky podleTaxonu lookupKey: taxon id) ifNotEmptyDo: [:sezn | " +
	"\n\t\tself inform: 'Taxon nelze smazat, je připojen k metodice \"', sezn first value, '\".'." +
	"\n\t\t^ false]." +
	"\n\t^ true",
	null, "2014-02-24T21:39:27Z", "mp");

jst.FYTaxonPopisEditor.addMethod("values", "", "private", 
	"\t| dict |" +
	"\n\t\"v dialogu u noveho taxonu ulozim naraz i vazby\"" +
	"\n\tdict := self form values." +
	"\n\tvazby ifNotNil: [" +
	"\n\t\tvazby form values keysAndValuesDo: [:k :v |" +
	"\n\t\t\tdict at: k ifAbsentPut: v]]." +
	"\n\t^ dict",
	null, "2013-09-16T08:42:43Z", "mp");

jst.FYTaxonPopisEditor.addMethod("asDialogOn:", "anObject", "converting", 
	"\t| vazby |" +
	"\n\t^ dialog ifNil: [dialog := ExtWindow new. dialog" +
	"\n\t\ttitle: (anObject id " +
	"\n\t\t\tifNil: [anObject jePlodina ifTrue: ['Nová plodina'] ifFalse: ['Nový škodlivý organismus']]" +
	"\n\t\t\tifNotNil: ['Editace ', (anObject jePlodina ifTrue: ['plodiny'] ifFalse: ['škodlivého organismu'])]);" +
	"\n\t\tmodal: true;" +
	"\n\t\twidth: 550;" +
	"\n\t\theight: (anObject jePlodina ifTrue: [755] ifFalse: [732]);" +
	"\n\t\twithFitLayout;" +
	"\n\t\tadd: (ExtTabPanel new" +
	"\n\t\t\tborder: false;" +
	"\n\t\t\tadd: (editor title: 'Popis');" +
	"\n\t\t\tadd: ((vazby := FYVazbyEditor new " +
	"\n\t\t\t\tinstVarNamed: #dialog put: dialog;" +
	"\n\t\t\t\tyourself) editor title: 'Vazby');" +
	"\n\t\t\tactiveTab: 1;" +
	"\n\t\t\tyourself);" +
	"\n\t\ton: #show do: [:w |" +
	"\n\t\t\tself taxon: anObject." +
	"\n\t\t\tvazby taxon: anObject]" +
	"\n\t]",
	null, "2013-09-15T21:33:53Z", "mp", 1);

jst.FYTaxonPopisEditor.addMethod("asDialogOn:", "anObject", "converting", 
	"\tdialog ifNil: [dialog := ExtWindow new. dialog" +
	"\n\t\ttitle: (anObject id " +
	"\n\t\t\tifNil: [anObject jePlodina ifTrue: ['Nová plodina'] ifFalse: ['Nový škodlivý organismus']]" +
	"\n\t\t\tifNotNil: ['Editace ', (anObject jePlodina ifTrue: ['plodiny'] ifFalse: ['škodlivého organismu'])]);" +
	"\n\t\tmodal: true;" +
	"\n\t\twidth: 550;" +
	"\n\t\theight: (anObject jePlodina ifTrue: [755] ifFalse: [732]);" +
	"\n\t\twithFitLayout;" +
	"\n\t\tadd: (ExtTabPanel new" +
	"\n\t\t\tborder: false;" +
	"\n\t\t\tadd: (editor title: 'Popis');" +
	"\n\t\t\tadd: ((vazby := FYVazbyEditor new " +
	"\n\t\t\t\tinstVarNamed: #dialog put: dialog;" +
	"\n\t\t\t\tyourself) editor " +
	"\n\t\t\t\t\ttitle: 'Vazby';" +
	"\n\t\t\t\t\ton: #activate do: [ | dict |" +
	"\n\t\t\t\t\t\tdict := editor form dirtyValues." +
	"\n\t\t\t\t\t\t#(cesky latinsky) do: [:n | dict at: n ifPresent: [:str |" +
	"\n\t\t\t\t\t\t\t(vazby editor form findField: n) value: str]]]);" +
	"\n\t\t\tactiveTab: 1;" +
	"\n\t\t\tyourself);" +
	"\n\t\ton: #show do: [:w |" +
	"\n\t\t\tself taxon: anObject." +
	"\n\t\t\tvazby taxon: anObject]." +
	"\n\t\tanObject id ifNil: [" +
	"\n\t\t\tvazby editor buttons: #()]" +
	"\n\t]." +
	"\n\t^ dialog",
	null, "2013-09-16T08:33:44Z", "mp", 1);

jst.FYTaxonPopisEditor.addMethod("asDialogOn:", "anObject", "converting", 
	"\tdialog ifNil: [dialog := ExtWindow new. dialog" +
	"\n\t\ttitle: (anObject id " +
	"\n\t\t\tifNil: [anObject jePlodina ifTrue: ['Nová plodina'] ifFalse: ['Nový škodlivý organismus']]" +
	"\n\t\t\tifNotNil: ['Editace ', (anObject jePlodina ifTrue: ['plodiny'] ifFalse: ['škodlivého organismu'])]);" +
	"\n\t\tmodal: true;" +
	"\n\t\twidth: 580;" +
	"\n\t\theight: (anObject jePlodina ifTrue: [755] ifFalse: [732]);" +
	"\n\t\twithFitLayout;" +
	"\n\t\tadd: (ExtTabPanel new" +
	"\n\t\t\tborder: false;" +
	"\n\t\t\tadd: (editor title: 'Popis');" +
	"\n\t\t\tadd: ((vazby := FYVazbyEditor new " +
	"\n\t\t\t\tinstVarNamed: #dialog put: dialog;" +
	"\n\t\t\t\tyourself) editor " +
	"\n\t\t\t\t\ttitle: 'Vazby';" +
	"\n\t\t\t\t\ton: #activate do: [ | dict |" +
	"\n\t\t\t\t\t\tdict := editor form dirtyValues." +
	"\n\t\t\t\t\t\t#(cesky latinsky) do: [:n | dict at: n ifPresent: [:str |" +
	"\n\t\t\t\t\t\t\t(vazby editor form findField: n) value: str]]];" +
	"\n\t\t\t\t\ton: #afterrender do: [" +
	"\n\t\t\t\t\t\t\"poprve - isValid obarvi nevalidni pole\"" +
	"\n\t\t\t\t\t\tvazby taxon: anObject." +
	"\n\t\t\t\t\t\t[vazby isValid] delayed: 100]);" +
	"\n\t\t\tactiveTab: 1;" +
	"\n\t\t\tyourself);" +
	"\n\t\ton: #show do: [:w |" +
	"\n\t\t\tself taxon: anObject]." +
	"\n\t\tanObject id ifNil: [" +
	"\n\t\t\tvazby editor buttons: #()]" +
	"\n\t]." +
	"\n\t^ dialog",
	null, "2013-09-16T20:05:32Z", "mp", 1);

jst.FYTaxonPopisEditor.addMethod("asDialogOn:", "anObject", "converting", 
	"\tdialog ifNil: [dialog := ExtWindow new. dialog" +
	"\n\t\ttitle: (anObject id " +
	"\n\t\t\tifNil: [anObject jePlodina ifTrue: ['Nová plodina'] ifFalse: ['Nový škodlivý organismus']]" +
	"\n\t\t\tifNotNil: ['Editace ', (anObject jePlodina ifTrue: ['plodiny'] ifFalse: ['škodlivého organismu'])]);" +
	"\n\t\tmodal: true;" +
	"\n\t\twidth: 715;" +
	"\n\t\theight: (anObject jePlodina ifTrue: [760] ifFalse: [732]);" +
	"\n\t\twithFitLayout;" +
	"\n\t\tadd: (ExtTabPanel new" +
	"\n\t\t\tborder: false;" +
	"\n\t\t\tadd: (editor title: 'Popis');" +
	"\n\t\t\tadd: ((vazby := FYVazbyEditor new " +
	"\n\t\t\t\tinstVarNamed: #dialog put: dialog;" +
	"\n\t\t\t\tyourself) editor " +
	"\n\t\t\t\t\ttitle: 'Vazby';" +
	"\n\t\t\t\t\ton: #activate do: [ | dict |" +
	"\n\t\t\t\t\t\tdict := editor form dirtyValues." +
	"\n\t\t\t\t\t\t#(cesky latinsky) do: [:n | dict at: n ifPresent: [:str |" +
	"\n\t\t\t\t\t\t\t(vazby editor form findField: n) value: str]]];" +
	"\n\t\t\t\t\ton: #afterrender do: [" +
	"\n\t\t\t\t\t\t\"poprve - isValid obarvi nevalidni pole\"" +
	"\n\t\t\t\t\t\tvazby taxon: anObject." +
	"\n\t\t\t\t\t\t[vazby isValid] delayed: 100]);" +
	"\n\t\t\tactiveTab: 1;" +
	"\n\t\t\tyourself);" +
	"\n\t\ton: #show do: [:w |" +
	"\n\t\t\tself taxon: anObject]." +
	"\n\t\tanObject id ifNil: [" +
	"\n\t\t\tvazby editor buttons: #()]" +
	"\n\t]." +
	"\n\t^ dialog",
	null, "2014-01-28T15:52:16Z", "mp", 1);

jst.FYTaxonPopisEditor.addMethod("asDialogOn:", "anObject", "converting", 
	"\tdialog ifNil: [dialog := ExtWindow new. dialog" +
	"\n\t\ttitle: (anObject id " +
	"\n\t\t\tifNil: [anObject jePlodina ifTrue: ['Nová plodina'] ifFalse: ['Nový škodlivý organismus']]" +
	"\n\t\t\tifNotNil: ['Editace ', (anObject jePlodina ifTrue: ['plodiny'] ifFalse: ['škodlivého organismu'])]);" +
	"\n\t\tmodal: true;" +
	"\n\t\twidth: 715;" +
	"\n\t\theight: (anObject jePlodina ifTrue: [760] ifFalse: [732]);" +
	"\n\t\twithFitLayout;" +
	"\n\t\tadd: (ExtTabPanel new" +
	"\n\t\t\tborder: false;" +
	"\n\t\t\tadd: (editor title: 'Popis');" +
	"\n\t\t\tadd: ((vazby := FYVazbyEditor new " +
	"\n\t\t\t\tinstVarNamed: #dialog put: dialog;" +
	"\n\t\t\t\tyourself) editor " +
	"\n\t\t\t\t\ttitle: 'Vazby';" +
	"\n\t\t\t\t\ton: #activate do: [ | dict |" +
	"\n\t\t\t\t\t\tdict := editor form dirtyValues." +
	"\n\t\t\t\t\t\t#(cesky latinsky) do: [:n | dict at: n ifPresent: [:str |" +
	"\n\t\t\t\t\t\t\t(vazby editor form findField: n) value: str]]];" +
	"\n\t\t\t\t\ton: #afterrender do: [" +
	"\n\t\t\t\t\t\t\"poprve - isValid obarvi nevalidni pole\"" +
	"\n\t\t\t\t\t\tvazby taxon: anObject." +
	"\n\t\t\t\t\t\t[vazby isValid] delayed: 100]);" +
	"\n\t\t\tactiveTab: 1;" +
	"\n\t\t\tyourself);" +
	"\n\t\ton: #show do: [:w |" +
	"\n\t\t\tself taxon: anObject]." +
	"\n\t\tanObject id ifNil: [" +
	"\n\t\t\tvazby editor buttons: #()]." +
	"\n\t\tdeleteBtn hide." +
	"\n\t]." +
	"\n\t^ dialog",
	null, "2014-02-24T16:00:25Z", "mp", 1);

jst.FYTaxonPopisEditor.addMethod("asDialogOn:", "anObject", "converting", 
	"\tdialog ifNil: [dialog := ExtWindow new. dialog" +
	"\n\t\ttitle: (anObject id " +
	"\n\t\t\tifNil: [anObject jePlodina ifTrue: ['Nová plodina'] ifFalse: ['Nový škodlivý organismus']]" +
	"\n\t\t\tifNotNil: ['Editace ', (anObject jePlodina ifTrue: ['plodiny'] ifFalse: ['škodlivého organismu'])]);" +
	"\n\t\tmodal: true;" +
	"\n\t\twidth: 715;" +
	"\n\t\theight: 760;" +
	"\n\t\twithFitLayout;" +
	"\n\t\tadd: (ExtTabPanel new" +
	"\n\t\t\tborder: false;" +
	"\n\t\t\tadd: (editor title: 'Popis');" +
	"\n\t\t\tadd: ((vazby := FYVazbyEditor new " +
	"\n\t\t\t\tinstVarNamed: #dialog put: dialog;" +
	"\n\t\t\t\tyourself) editor " +
	"\n\t\t\t\t\ttitle: 'Vazby';" +
	"\n\t\t\t\t\ton: #activate do: [ | dict |" +
	"\n\t\t\t\t\t\tdict := editor form dirtyValues." +
	"\n\t\t\t\t\t\t#(cesky latinsky) do: [:n | dict at: n ifPresent: [:str |" +
	"\n\t\t\t\t\t\t\t(vazby editor form findField: n) value: str]]];" +
	"\n\t\t\t\t\ton: #afterrender do: [" +
	"\n\t\t\t\t\t\t\"poprve - isValid obarvi nevalidni pole\"" +
	"\n\t\t\t\t\t\tvazby taxon: anObject." +
	"\n\t\t\t\t\t\t[vazby isValid] delayed: 100]);" +
	"\n\t\t\tactiveTab: 1;" +
	"\n\t\t\tyourself);" +
	"\n\t\ton: #show do: [:w |" +
	"\n\t\t\tself taxon: anObject]." +
	"\n\t\tanObject id ifNil: [" +
	"\n\t\t\tvazby editor buttons: #()]." +
	"\n\t\tdeleteBtn hide." +
	"\n\t]." +
	"\n\t^ dialog",
	null, "2014-02-25T16:28:06Z", "mp", 1);

jst.FYTaxonPopisEditor.addMethod("asDialogOn:", "anObject", "converting", 
	"\tdialog ifNil: [dialog := ExtWindow new. dialog" +
	"\n\t\ttitle: (anObject id " +
	"\n\t\t\tifNil: [anObject jePlodina ifTrue: ['Nová plodina'] ifFalse: ['Nový škodlivý organismus']]" +
	"\n\t\t\tifNotNil: ['Editace ', (anObject jePlodina ifTrue: ['plodiny'] ifFalse: ['škodlivého organismu'])]);" +
	"\n\t\tmodal: true;" +
	"\n\t\twidth: 715;" +
	"\n\t\theight: 760;" +
	"\n\t\twithFitLayout;" +
	"\n\t\tadd: (ExtTabPanel new" +
	"\n\t\t\tborder: false;" +
	"\n\t\t\tadd: (editor title: 'Popis');" +
	"\n\t\t\tadd: ((vazby := FYVazbyEditor new " +
	"\n\t\t\t\tinstVarNamed: #dialog put: dialog;" +
	"\n\t\t\t\tyourself) editor " +
	"\n\t\t\t\t\ttitle: 'Vazby';" +
	"\n\t\t\t\t\ton: #activate do: [ | dict |" +
	"\n\t\t\t\t\t\tdict := editor form dirtyValues." +
	"\n\t\t\t\t\t\t#(cesky latinsky) do: [:n | dict at: n ifPresent: [:str |" +
	"\n\t\t\t\t\t\t\t(vazby editor form findField: n) value: str]]];" +
	"\n\t\t\t\t\ton: #afterrender do: [" +
	"\n\t\t\t\t\t\t\"poprve - isValid obarvi nevalidni pole\"" +
	"\n\t\t\t\t\t\tvazby taxon: anObject." +
	"\n\t\t\t\t\t\t[vazby isValid] delayed: 100]);" +
	"\n\t\t\tactiveTab: 1;" +
	"\n\t\t\tyourself);" +
	"\n\t\ton: #show do: [:w |" +
	"\n\t\t\tself taxon: anObject]." +
	"\n\t\tanObject id ifNil: [" +
	"\n\t\t\tvazby editor buttons: #()]." +
	"\n\t\taddBtn hide." +
	"\n\t\tdeleteBtn hide." +
	"\n\t]." +
	"\n\t^ dialog",
	null, "2014-02-27T14:04:29Z", "mp"); //fytoportal-foto-edit

jst.FYTaxonPopisEditor.addMethod("novyTaxon:", "anObject", "updating", 
	"\tanObject jePlodina not & puvodciChoroby isVisible ifTrue: [" +
	"\n\t\t\"pouze aktualizuji seznam puvodcu\"" +
	"\n\t\tpuvodciChoroby store reload]",
	null, "2014-02-27T19:49:39Z", "mp");

//*** FYVazbyEditor ***

jst.FYVazbyEditor.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\teditor" +
	"\n\t\ttrackResetOnLoad: true;" +
	"\n\t\tadd: (ExtDisplayField new name: 'cesky'; fieldLabel: 'Český název');" +
	"\n\t\tadd: (ExtDisplayField new name: 'latinsky'; fieldLabel: 'Vědecký název');" +
	"\n\t\tadd: (plodiny := ExtHidden new name: 'plodiny'; beDisabled);" +
	"\n\t\tadd: self skupinyPlodin;" +
	"\n\t\tadd: self nadrazenaPlodina;" +
//	"\n\t\tadd: self zarazeniSO;" +
	"\n\t\tadd: self hostitele",
	null, "2013-02-20T12:32:11Z", "mp", 1);

jst.FYVazbyEditor.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\teditor" +
	"\n\t\ttrackResetOnLoad: true;" +
	"\n\t\tadd: (ExtDisplayField new name: 'cesky'; fieldLabel: 'Český název');" +
	"\n\t\tadd: (ExtDisplayField new name: 'latinsky'; fieldLabel: 'Vědecký název');" +
	"\n\t\tadd: self skupinyPlodin;" +
	"\n\t\tadd: self nadrazenaPlodina;" +
	"\n\t\tadd: self hostitele",
	null, "2014-02-15T20:42:55Z", "mp", 2);

jst.FYVazbyEditor.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\teditor" +
	"\n\t\ttrackResetOnLoad: true;" +
	"\n\t\tadd: (ExtDisplayField new name: 'cesky'; fieldLabel: 'Český název');" +
	"\n\t\tadd: (ExtDisplayField new name: 'latinsky'; fieldLabel: 'Vědecký název');" +
	"\n\t\tadd: self skupinyPlodin;" +
	"\n\t\tadd: self nadrazenaPlodina;" +
	"\n\t\tadd: ((hostitele := FYVyberTaxonu " +
	"\n\t\t\turl: self hostiteleUrl" +
	"\n\t\t\ttitle: self hostiteleTitle)" +
	"\n\t\t\t\t height: 575; hide)",
	null, "2014-02-23T10:23:25Z", "mp", 3);

jst.FYVazbyEditor.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\teditor" +
	"\n\t\ttrackResetOnLoad: true;" +
	"\n\t\tadd: (ExtDisplayField new name: 'cesky'; fieldLabel: 'Český název');" +
	"\n\t\tadd: (ExtDisplayField new name: 'latinsky'; fieldLabel: 'Vědecký název');" +
	"\n\t\tadd: self skupinyPlodin;" +
	"\n\t\tadd: self nadrazenaPlodina;" +
	"\n\t\tadd: ((hostitele := FYVyberTaxonu " +
	"\n\t\t\turl: self hostiteleUrl" +
	"\n\t\t\ttitle: self hostiteleTitle)" +
	"\n\t\t\t\t height: 600; hide)",
	null, "2014-02-25T16:45:46Z", "mp"); //fytoportal-foto-edit

jst.FYVazbyEditor.addMethod("initButtons", "", "initialization", 
	"\tsuper initButtons." +
	"\n\teditor buttons: (editor buttons copyWithAll: {" +
	"\n\t\taddBtn := ExtButton new " +
	"\n\t\t\ttext: 'Přidat taxon';" +
	"\n\t\t\tbeDisabled;" +
	"\n\t\t\ttooltip: 'Přidejte novou plodinu, pokud chybí v seznamu.';" +
	"\n\t\t\ticonCls: #'btn-add'; " +
	"\n\t\t\ton: #click do: [" +
	"\n\t\t\t\t(FYTaxonPopisEditor new asDialogOn: FYPlodina new) show]" +
	"\n\t})",
	null, "2014-02-27T20:14:57Z", "mp");

jst.FYVazbyEditor.addMethod("taxon:", "anObject", "accessing", 
	"\ttaxon := anObject." +
	"\n\taktivni ifFalse: [" +
	"\n\t\t^ self]." +
	"\n\tself stopMonitoring." +
	"\n\ttaxon jePlodina" +
	"\n\t\tifTrue: [" +
	"\n\t\t\tskupinyPlodin isRendered ifTrue: [" +
	"\n\t\t\t\tskupinyPlodin beEnabled; reset; show]." +
	"\n\t\t\tnadrazenaPlodina beEnabled; show." +
//	"\n\t\t\tzarazeniSO beDisabled; hide." +
	"\n\t\t\tself zobrazHostitele: false];" +
	"\n\t\tifFalse: [" +
//	"\n\t\t\tzarazeniSO beEnabled; reset; show." +
	"\n\t\t\tskupinyPlodin beDisabled; hide." +
	"\n\t\t\tnadrazenaPlodina beDisabled; hide." +
	"\n\t\t\tself zobrazHostitele: true]." +
	"\n\tself form values: anObject asDictionary." +
	"\n\tself startMonitoring.",
	null, "2012-08-22T20:31:30Z", "mp", 1);

jst.FYVazbyEditor.addMethod("taxon:", "anObject", "accessing", 
	"\ttaxon := anObject." +
	"\n\tself isActive ifFalse: [" +
	"\n\t\t^ self]." +
	"\n\teditor stopMonitoring." +
	"\n\ttaxon jePlodina" +
	"\n\t\tifTrue: [" +
	"\n\t\t\tskupinyPlodin isRendered ifTrue: [" +
	"\n\t\t\t\tskupinyPlodin beEnabled; reset; show]." +
	"\n\t\t\tnadrazenaPlodina beEnabled; show." +
	"\n\t\t\tself zobrazHostitele: false];" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tskupinyPlodin beDisabled; hide." +
	"\n\t\t\tnadrazenaPlodina beDisabled; hide." +
	"\n\t\t\tself zobrazHostitele: true]." +
	"\n\teditor form values: anObject asDictionary." +
	"\n\teditor startMonitoring.",
	null, "2013-02-20T12:32:50Z", "mp", 1);

jst.FYVazbyEditor.addMethod("taxon:", "anObject", "accessing", 
	"\tjinyTaxon := anObject." +
	"\n\tself isActive ifFalse: [" +
	"\n\t\t^ self]." +
	"\n\ttaxon := jinyTaxon." +
	"\n\tjinyTaxon := nil." +
	"\n\teditor stopMonitoring." +
	"\n\ttaxon jePlodina" +
	"\n\t\tifTrue: [" +
	"\n\t\t\tskupinyPlodin isRendered ifTrue: [" +
	"\n\t\t\t\tskupinyPlodin beEnabled; reset; show]." +
	"\n\t\t\tnadrazenaPlodina beEnabled; show." +
	"\n\t\t\tself zobrazHostitele: false];" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tskupinyPlodin beDisabled; hide." +
	"\n\t\t\tnadrazenaPlodina beDisabled; hide." +
	"\n\t\t\tself zobrazHostitele: true]." +
	"\n\teditor form values: taxon asDictionary." +
	"\n\teditor startMonitoring.",
	null, "2013-04-27T21:46:54Z", "mp", 1);

jst.FYVazbyEditor.addMethod("taxon:", "anObject", "accessing", 
	"\tjinyTaxon := anObject." +
	"\n\tself isActive ifFalse: [" +
	"\n\t\t^ self]." +
	"\n\ttaxon := jinyTaxon." +
	"\n\tjinyTaxon := nil." +
	"\n\teditor stopMonitoring." +
	"\n\ttaxon jePlodina" +
	"\n\t\tifTrue: [" +
	"\n\t\t\tskupinyPlodin isRendered ifTrue: [" +
	"\n\t\t\t\tskupinyPlodin beEnabled; reset; show]." +
	"\n\t\t\tnadrazenaPlodina " +
	"\n\t\t\t\tisEnabled: taxon isParent not;" +
	"\n\t\t\t\tshow." +
	"\n\t\t\tself zobrazHostitele: false];" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tskupinyPlodin beDisabled; hide." +
	"\n\t\t\tnadrazenaPlodina beDisabled; hide." +
	"\n\t\t\tself zobrazHostitele: true]." +
	"\n\teditor form values: taxon asDictionary." +
	"\n\teditor startMonitoring.",
	null, "2013-09-10T12:37:41Z", "mp", 1);

jst.FYVazbyEditor.addMethod("taxon:", "anObject", "accessing", 
	"\tjinyTaxon := anObject." +
	"\n\tself isActive ifFalse: [" +
	"\n\t\t^ self]." +
	"\n\ttaxon := jinyTaxon." +
	"\n\tjinyTaxon := nil." +
	"\n\teditor stopMonitoring." +
	"\n\ttaxon jePlodina" +
	"\n\t\tifTrue: [" +
	"\n\t\t\tskupinyPlodin isRendered ifTrue: [" +
	"\n\t\t\t\tskupinyPlodin beEnabled; reset; show]." +
	"\n\t\t\tnadrazenaPlodina " +
	"\n\t\t\t\tisEnabled: taxon isParent not;" +
	"\n\t\t\t\tshow." +
	"\n\t\t\tself zobrazHostitele: false];" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tskupinyPlodin beDisabled; hide." +
	"\n\t\t\tnadrazenaPlodina beDisabled; hide." +
	"\n\t\t\tself zobrazHostitele: true]." +
	"\n\taddBtn isDisabled: taxon jePlodina." +
	"\n\teditor form values: taxon asDictionary." +
	"\n\teditor startMonitoring.",
	null, "2014-02-27T20:16:07Z", "mp"); //fytoportal-foto-edit

jst.FYVazbyEditor.addMethod("nadrazenaPlodina", "", "private", 
	"\t^ nadrazenaPlodina ifNil: [nadrazenaPlodina := Fytoportal data plodiny nazvyComboBox" +
	"\n\t\tname: 'nadrazenaPlodina'; " +
	"\n\t\thiddenName: 'parent';" +
	"\n\t\tfieldLabel: 'Zařadit pod';" +
	"\n\t\thide]",
	null, "2013-06-21T19:38:22Z", "mp");

jst.FYVazbyEditor.addMethod("hostitele", "", "accessing", 
	"\t^ hostitele",
	null, "2014-03-04T15:35:35Z", "mp");

jst.FYVazbyEditor.addMethod("ulozZmeny", "", "actions", 
	"\tUIManager default informUser: 'Ukládám změny, čekejte...' during: [" +
	"\n\t\t| oldParent newParent |" +
	"\n\t\ttaxon := Fytoportal db loadObject: taxon id." +
	"\n\t\toldParent := (taxon jePlodina and: [taxon parent isEmptyOrNil not]) ifTrue: [taxon parent]." +
	"\n\t\ttaxon values: self form values." +
	"\n\t\tnewParent := (taxon jePlodina and: [taxon parent isEmptyOrNil not]) ifTrue: [taxon parent]." +
	"\n\t\tFytoportal db storeObject: taxon." +
	"\n\t\toldParent = newParent ifFalse: [ | parent podrizene |" +
	"\n\t\t\t\"synchronizace atributu isParent\"" +
	"\n\t\t\tparent := Fytoportal db loadObject: (oldParent ifNil: newParent)." +
	"\n\t\t\tpodrizene := Fytoportal data plodiny podrizenePlodiny: parent id." +
	"\n\t\t\tparent isParent = podrizene isEmpty ifTrue: [" +
	"\n\t\t\t\tparent isParent: podrizene isEmpty not." +
	"\n\t\t\t\tFytoportal db storeObject: parent]." +
	"\n\t\t\t\"doplnim/odeberu nadrazenou plodinu ze skodl. org.\"" +
	"\n\t\t\t(Fytoportal data skodlOrg podlePlodiny: taxon id) do: [:dict | | so |" +
	"\n\t\t\t\tso := Fytoportal db loadObject: (dict at: 'id')." +
	"\n\t\t\t\toldParent ifNotNil: [" +
	"\n\t\t\t\t\tso nadrazenePlodiny: (so nadrazenePlodiny copyWithout: oldParent)]." +
	"\n\t\t\t\t(newParent notNil and: [(so nadrazenePlodiny includes: newParent) not]) ifTrue: [" +
	"\n\t\t\t\t\tso nadrazenePlodiny: (so nadrazenePlodiny copyWith: newParent)]." +
	"\n\t\t\t\tFytoportal db storeObject: so" +
	"\n\t\t\t]." +
	"\n\t\t\t\"doplnim/odeberu nadrazenou plodinu z fotek SO\"" +
	"\n\t\t\t(Fytoportal data fotky podlePlodiny lookupKey: taxon id) do: [:dict | | f |" +
	"\n\t\t\t\tf := Fytoportal db loadObject: (dict at: 'id')." +
	"\n\t\t\t\tf nadrazenaPlodina: newParent." +
	"\n\t\t\t\tFytoportal db storeObject: f" +
	"\n\t\t\t]" +
	"\n\t\t]." +
	"\n\t\thostitele isVisible ifTrue: [" +
	"\n\t\t\thostitele store commitChanges]." +
	"\n\t]",
	null, "2012-08-30T14:03:20Z", "mp", 1);

jst.FYVazbyEditor.addMethod("ulozZmeny", "", "actions", 
	"\tUIManager default informUser: 'Ukládám změny, čekejte...' during: [" +
	"\n\t\t| oldParent newParent |" +
	"\n\t\ttaxon := Fytoportal db loadObject: taxon id." +
	"\n\t\toldParent := (taxon jePlodina and: [taxon parent isEmptyOrNil not]) ifTrue: [taxon parent]." +
	"\n\t\ttaxon values: self form values." +
	"\n\t\tnewParent := (taxon jePlodina and: [taxon parent isEmptyOrNil not]) ifTrue: [taxon parent]." +
	"\n\t\tFytoportal db storeObject: taxon." +
	"\n\t\toldParent = newParent ifFalse: [ | parent podrizene |" +
	"\n\t\t\t\"synchronizace atributu isParent\"" +
	"\n\t\t\tparent := Fytoportal db loadObject: (oldParent ifNil: newParent)." +
	"\n\t\t\tpodrizene := Fytoportal data plodiny podrizenePlodiny: parent id." +
	"\n\t\t\tparent isParent = podrizene isEmpty ifTrue: [" +
	"\n\t\t\t\tparent isParent: podrizene isEmpty not." +
	"\n\t\t\t\tFytoportal db storeObject: parent]." +
	"\n\t\t\t\"doplnim/odeberu nadrazenou plodinu ze skodl. org.\"" +
	"\n\t\t\t(Fytoportal data skodlOrg podlePlodiny: taxon id) do: [:dict | | so |" +
	"\n\t\t\t\tso := Fytoportal db loadObject: (dict at: 'id')." +
	"\n\t\t\t\toldParent ifNotNil: [" +
	"\n\t\t\t\t\tso nadrazenePlodiny: (so nadrazenePlodiny copyWithout: oldParent)]." +
	"\n\t\t\t\t(newParent notNil and: [(so nadrazenePlodiny includes: newParent) not]) ifTrue: [" +
	"\n\t\t\t\t\tso nadrazenePlodiny: (so nadrazenePlodiny copyWith: newParent)]." +
	"\n\t\t\t\tFytoportal db storeObject: so" +
	"\n\t\t\t]." +
	"\n\t\t\t\"doplnim/odeberu nadrazenou plodinu z fotek SO\"" +
	"\n\t\t\t(Fytoportal data fotky podlePlodiny lookupKey: taxon id) do: [:dict | | f |" +
	"\n\t\t\t\tf := Fytoportal db loadObject: (dict at: 'id')." +
	"\n\t\t\t\tf nadrazenaPlodina: newParent." +
	"\n\t\t\t\tFytoportal db storeObject: f" +
	"\n\t\t\t]" +
	"\n\t\t]." +
	"\n\t\thostitele isVisible ifTrue: [" +
	"\n\t\t\thostitele store commitChanges." +
	"\n\t\t\tself broadcastEvent: #zmenaHostiteluSO: with: taxon]" +
	"\n\t]",
	null, "2013-09-04T21:50:01Z", "mp", 2);

jst.FYVazbyEditor.addMethod("ulozZmeny", "", "actions", 
	"\tUIManager default informUser: 'Ukládám změny, čekejte...' during: [" +
	"\n\t\t| oldParent newParent skupiny |" +
	"\n\t\ttaxon := Fytoportal db loadObject: taxon id." +
	"\n\t\ttaxon jePlodina ifTrue: [" +
	"\n\t\t\tskupiny := taxon skupiny asSortedCollection]." +
	"\n\t\toldParent := (taxon jePlodina and: [taxon parent isEmptyOrNil not]) ifTrue: [taxon parent]." +
	"\n\t\ttaxon values: self form values." +
	"\n\t\tnewParent := (taxon jePlodina and: [taxon parent isEmptyOrNil not]) ifTrue: [taxon parent]." +
	"\n\t\tFytoportal db storeObject: taxon." +
	"\n\t\toldParent = newParent ifFalse: [ | parent podrizene |" +
	"\n\t\t\t\"synchronizace atributu isParent\"" +
	"\n\t\t\tparent := Fytoportal db loadObject: (oldParent ifNil: newParent)." +
	"\n\t\t\tpodrizene := Fytoportal data plodiny podrizenePlodiny: parent id." +
	"\n\t\t\tparent isParent = podrizene isEmpty ifTrue: [" +
	"\n\t\t\t\tparent isParent: podrizene isEmpty not." +
	"\n\t\t\t\tFytoportal db storeObject: parent]." +
	"\n\t\t\t\"doplnim/odeberu nadrazenou plodinu ze skodl. org.\"" +
	"\n\t\t\t(Fytoportal data skodlOrg podlePlodiny: taxon id) do: [:dict | | so |" +
	"\n\t\t\t\tso := Fytoportal db loadObject: (dict at: 'id')." +
	"\n\t\t\t\toldParent ifNotNil: [" +
	"\n\t\t\t\t\tso nadrazenePlodiny: (so nadrazenePlodiny copyWithout: oldParent)]." +
	"\n\t\t\t\t(newParent notNil and: [(so nadrazenePlodiny includes: newParent) not]) ifTrue: [" +
	"\n\t\t\t\t\tso nadrazenePlodiny: (so nadrazenePlodiny copyWith: newParent)]." +
	"\n\t\t\t\tFytoportal db storeObject: so" +
	"\n\t\t\t]." +
	"\n\t\t\t\"doplnim/odeberu nadrazenou plodinu z fotek SO\"" +
	"\n\t\t\t(Fytoportal data fotky podlePlodiny lookupKey: taxon id) do: [:dict | | f |" +
	"\n\t\t\t\tf := Fytoportal db loadObject: (dict at: 'id')." +
	"\n\t\t\t\tf nadrazenaPlodina: newParent." +
	"\n\t\t\t\tFytoportal db storeObject: f" +
	"\n\t\t\t]" +
	"\n\t\t]." +
	"\n\t\t(oldParent ~= newParent or: [taxon jePlodina and: [skupiny ~= taxon skupiny asSortedCollection]]) ifTrue: [" +
	"\n\t\t\tself broadcastEvent: #zmenaZarazeniPlodiny: with: taxon]." +
	"\n\t\thostitele isVisible ifTrue: [" +
	"\n\t\t\thostitele store commitChanges." +
	"\n\t\t\tself broadcastEvent: #zmenaHostiteluSO: with: taxon]" +
	"\n\t]",
	null, "2013-09-05T20:58:44Z", "mp", 3);

jst.FYVazbyEditor.addMethod("ulozZmeny", "", "actions", 
	"\tself isValid ifTrue: [UIManager default informUser: 'Ukládám změny, čekejte...' during: [" +
	"\n\t\t| oldParent newParent skupiny |" +
	"\n\t\ttaxon := Fytoportal db loadObject: taxon id." +
	"\n\t\ttaxon jePlodina ifTrue: [" +
	"\n\t\t\tskupiny := taxon skupiny asSortedCollection]." +
	"\n\t\toldParent := (taxon jePlodina and: [taxon parent isEmptyOrNil not]) ifTrue: [taxon parent]." +
	"\n\t\ttaxon values: self form values." +
	"\n\t\tnewParent := (taxon jePlodina and: [taxon parent isEmptyOrNil not]) ifTrue: [taxon parent]." +
	"\n\t\tFytoportal db storeObject: taxon." +
	"\n\t\toldParent = newParent ifFalse: [" +
	"\n\t\t\t\"synchronizace atributu isParent\"" +
	"\n\t\t\toldParent ifNotNil: [" +
	"\n\t\t\t\tself synchronizujNadrazPlod: oldParent]." +
	"\n\t\t\tnewParent ifNotNil: [" +
	"\n\t\t\t\tself synchronizujNadrazPlod: newParent]." +
	"\n\t\t\t\"doplnim/odeberu nadrazenou plodinu ze skodl. org.\"" +
	"\n\t\t\t(Fytoportal data skodlOrg podlePlodiny: taxon id) do: [:dict | | so |" +
	"\n\t\t\t\tso := Fytoportal db loadObject: (dict at: 'id')." +
	"\n\t\t\t\toldParent ifNotNil: [" +
	"\n\t\t\t\t\tso nadrazenePlodiny: (so nadrazenePlodiny copyWithout: oldParent)]." +
	"\n\t\t\t\t(newParent notNil and: [(so nadrazenePlodiny includes: newParent) not]) ifTrue: [" +
	"\n\t\t\t\t\tso nadrazenePlodiny: (so nadrazenePlodiny copyWith: newParent)]." +
	"\n\t\t\t\tFytoportal db storeObject: so" +
	"\n\t\t\t]." +
	"\n\t\t\t\"doplnim/odeberu nadrazenou plodinu z fotek SO\"" +
	"\n\t\t\t(Fytoportal data fotky podlePlodiny lookupKey: taxon id) do: [:dict | | f |" +
	"\n\t\t\t\tf := Fytoportal db loadObject: (dict at: 'id')." +
	"\n\t\t\t\tf nadrazenaPlodina: newParent." +
	"\n\t\t\t\tFytoportal db storeObject: f" +
	"\n\t\t\t]" +
	"\n\t\t]." +
	"\n\t\t(oldParent ~= newParent or: [taxon jePlodina and: [skupiny ~= taxon skupiny asSortedCollection]]) ifTrue: [" +
	"\n\t\t\tself taxon: taxon." +
	"\n\t\t\tself broadcastEvent: #zmenaZarazeniPlodiny: with: taxon]." +
	"\n\t\thostitele isVisible ifTrue: [" +
	"\n\t\t\thostitele store commitChanges." +
	"\n\t\t\tself broadcastEvent: #zmenaHostiteluSO: with: taxon]" +
	"\n\t]]",
	null, "2013-09-10T15:29:28Z", "mp", 4);

jst.FYVazbyEditor.addMethod("ulozZmeny", "", "actions", 
	"\tself isValid ifTrue: [UIManager default informUser: 'Ukládám změny, čekejte...' during: [" +
	"\n\t\t| oldParent newParent skupiny |" +
	"\n\t\ttaxon := Fytoportal db loadObject: taxon id." +
	"\n\t\ttaxon jePlodina ifTrue: [" +
	"\n\t\t\tskupiny := taxon skupiny asSortedCollection]." +
	"\n\t\toldParent := (taxon jePlodina and: [taxon parent isEmptyOrNil not]) ifTrue: [taxon parent]." +
	"\n\t\ttaxon values: self form values." +
	"\n\t\tnewParent := (taxon jePlodina and: [taxon parent isEmptyOrNil not]) ifTrue: [taxon parent]." +
	"\n\t\tFytoportal db storeObject: taxon." +
	"\n\t\toldParent = newParent ifFalse: [" +
	"\n\t\t\t\"synchronizace atributu isParent\"" +
	"\n\t\t\toldParent ifNotNil: [" +
	"\n\t\t\t\tself synchronizujNadrazPlod: oldParent]." +
	"\n\t\t\tnewParent ifNotNil: [" +
	"\n\t\t\t\tself synchronizujNadrazPlod: newParent]." +
	"\n\t\t\t\"doplnim/odeberu nadrazenou plodinu ze skodl. org.\"" +
	"\n\t\t\t(Fytoportal data skodlOrg podlePlodiny: taxon id) do: [:dict | | so |" +
	"\n\t\t\t\tso := Fytoportal db loadObject: (dict at: 'id')." +
	"\n\t\t\t\toldParent ifNotNil: [" +
	"\n\t\t\t\t\tso nadrazenePlodiny: (so nadrazenePlodiny copyWithout: oldParent)]." +
	"\n\t\t\t\t(newParent notNil and: [(so nadrazenePlodiny includes: newParent) not]) ifTrue: [" +
	"\n\t\t\t\t\tso nadrazenePlodiny: (so nadrazenePlodiny copyWith: newParent)]." +
	"\n\t\t\t\tFytoportal db storeObject: so" +
	"\n\t\t\t]." +
	"\n\t\t\t\"doplnim/odeberu nadrazenou plodinu z fotek SO\"" +
	"\n\t\t\t(Fytoportal data fotky podlePlodiny lookupKey: taxon id) do: [:dict | | f |" +
	"\n\t\t\t\tf := Fytoportal db loadObject: (dict at: 'id')." +
	"\n\t\t\t\tf nadrazenaPlodina: newParent." +
	"\n\t\t\t\tFytoportal db storeObject: f" +
	"\n\t\t\t]" +
	"\n\t\t]." +
	"\n\t\t(oldParent ~= newParent or: [taxon jePlodina and: [skupiny ~= taxon skupiny asSortedCollection]]) ifTrue: [" +
	"\n\t\t\tself broadcastEvent: #zmenaZarazeniPlodiny: with: taxon]." +
	"\n\t\thostitele isVisible ifTrue: [" +
	"\n\t\t\thostitele store commitChanges." +
	"\n\t\t\tself broadcastEvent: #zmenaHostiteluSO: with: taxon]." +
	"\n\t\tself taxon: taxon" +
	"\n\t]]",
	null, "2013-09-10T20:37:51Z", "mp", 5);

jst.FYVazbyEditor.addMethod("ulozZmeny", "", "actions", 
	"\tself isValid ifTrue: [UIManager default informUser: 'Ukládám změny, čekejte...' during: [" +
	"\n\t\t| oldParent newParent skupiny |" +
	"\n\t\ttaxon := Fytoportal db loadObject: taxon id." +
	"\n\t\ttaxon jePlodina ifTrue: [" +
	"\n\t\t\tskupiny := taxon skupiny asSortedCollection]." +
	"\n\t\toldParent := (taxon jePlodina and: [taxon parent isEmptyOrNil not]) ifTrue: [taxon parent]." +
	"\n\t\ttaxon values: self form values." +
	"\n\t\tnewParent := (taxon jePlodina and: [taxon parent isEmptyOrNil not]) ifTrue: [taxon parent]." +
	"\n\t\tFytoportal db storeObject: taxon." +
	"\n\t\toldParent = newParent ifFalse: [" +
	"\n\t\t\t\"synchronizace atributu isParent\"" +
	"\n\t\t\toldParent ifNotNil: [" +
	"\n\t\t\t\tself synchronizujNadrazPlod: oldParent]." +
	"\n\t\t\tnewParent ifNotNil: [" +
	"\n\t\t\t\tself synchronizujNadrazPlod: newParent]." +
	"\n\t\t\t\"doplnim/odeberu nadrazenou plodinu ze skodl. org.\"" +
	"\n\t\t\t(Fytoportal data skodlOrg podlePlodiny: taxon id) do: [:dict | | so |" +
	"\n\t\t\t\tso := Fytoportal db loadObject: (dict at: 'id')." +
	"\n\t\t\t\toldParent ifNotNil: [" +
	"\n\t\t\t\t\tso nadrazenePlodiny: (so nadrazenePlodiny copyWithout: oldParent)]." +
	"\n\t\t\t\t(newParent notNil and: [(so nadrazenePlodiny includes: newParent) not]) ifTrue: [" +
	"\n\t\t\t\t\tso nadrazenePlodiny: (so nadrazenePlodiny copyWith: newParent)]." +
	"\n\t\t\t\tFytoportal db storeObject: so" +
	"\n\t\t\t]." +
	"\n\t\t\t\"doplnim/odeberu nadrazenou plodinu z fotek SO\"" +
	"\n\t\t\t(Fytoportal data fotky podlePlodiny lookupKey: taxon id) do: [:dict | | f |" +
	"\n\t\t\t\tf := Fytoportal db loadObject: (dict at: 'id')." +
	"\n\t\t\t\tf nadrazenaPlodina: newParent." +
	"\n\t\t\t\tFytoportal db storeObject: f" +
	"\n\t\t\t]" +
	"\n\t\t]." +
	"\n\t\t(oldParent ~= newParent or: [taxon jePlodina and: [skupiny ~= taxon skupiny asSortedCollection]]) ifTrue: [" +
	"\n\t\t\tself broadcastEvent: #zmenaZarazeniPlodiny: with: taxon]." +
	"\n\t\thostitele isVisible ifTrue: [" +
	"\n\t\t\thostitele store commitChanges." +
	"\n\t\t\tself broadcastEvent: #zmenaHostiteluSO: with: taxon]." +
	"\n\t\tself taxon: taxon." +
	"\n\t\tdialog ifNotNil: [dialog close]" +
	"\n\t]]",
	null, "2013-09-16T09:12:41Z", "mp", 6);

jst.FYVazbyEditor.addMethod("ulozZmeny", "", "actions", 
	"\tself isValid ifTrue: [UIManager default informUser: 'Ukládám změny, čekejte...' during: [" +
	"\n\t\t| oldParent newParent skupiny |" +
	"\n\t\ttaxon := Fytoportal db loadObject: taxon id." +
	"\n\t\ttaxon jePlodina ifTrue: [" +
	"\n\t\t\tskupiny := taxon skupiny asSortedCollection]." +
	"\n\t\toldParent := (taxon jePlodina and: [taxon parent isEmptyOrNil not]) ifTrue: [taxon parent]." +
	"\n\t\ttaxon values: self form values." +
	"\n\t\tnewParent := (taxon jePlodina and: [taxon parent isEmptyOrNil not]) ifTrue: [taxon parent]." +
	"\n\t\tFytoportal db storeObject: taxon." +
	"\n\t\t(oldParent ~= newParent or: [taxon jePlodina and: [skupiny ~= taxon skupiny asSortedCollection]]) ifTrue: [" +
	"\n\t\t\tself broadcastEvent: #zmenaZarazeniPlodiny: with: taxon]." +
	"\n\t\thostitele isVisible ifTrue: [" +
	"\n\t\t\thostitele store commitChanges." +
	"\n\t\t\tself broadcastEvent: #zmenaHostiteluSO: with: taxon]." +
	"\n\t\tself taxon: taxon." +
	"\n\t\tdialog ifNotNil: [dialog close]" +
	"\n\t]]",
	null, "2014-01-30T10:56:53Z", "mp", 7);

jst.FYVazbyEditor.addMethod("ulozZmeny", "", "actions", 
	"\tself isValid ifTrue: [UIManager default informUser: 'Ukládám změny, čekejte...' during: [" +
	"\n\t\t| oldParent newParent skupiny |" +
	"\n\t\ttaxon := Fytoportal db loadObject: taxon id." +
	"\n\t\ttaxon jePlodina " +
	"\n\t\t\tifTrue: [skupiny := taxon skupiny asSortedCollection]" +
	"\n\t\t\tifFalse: [taxon plodiny: self vyberPlodin]." +
	"\n\t\toldParent := (taxon jePlodina and: [taxon parent isEmptyOrNil not]) ifTrue: [taxon parent]." +
	"\n\t\ttaxon values: self form values." +
	"\n\t\tnewParent := (taxon jePlodina and: [taxon parent isEmptyOrNil not]) ifTrue: [taxon parent]." +
	"\n\t\tFytoportal db storeObject: taxon." +
	"\n\t\t(oldParent ~= newParent or: [taxon jePlodina and: [skupiny ~= taxon skupiny asSortedCollection]]) ifTrue: [" +
	"\n\t\t\tself broadcastEvent: #zmenaZarazeniPlodiny: with: taxon]." +
	"\n\t\thostitele isVisible ifTrue: [" +
	"\n\t\t\thostitele store commitChanges." +
	"\n\t\t\tself broadcastEvent: #zmenaHostiteluSO: with: taxon]." +
	"\n\t\tself taxon: taxon." +
	"\n\t\tdialog ifNotNil: [dialog close]" +
	"\n\t]]",
	null, "2014-02-15T21:16:50Z", "mp", 8);

jst.FYVazbyEditor.addMethod("ulozZmeny", "", "actions", 
	"\tself isValid ifTrue: [UIManager default informUser: 'Ukládám změny, čekejte...' during: [" +
	"\n\t\t| oldParent newParent skupiny |" +
	"\n\t\ttaxon := Fytoportal db loadObject: taxon id." +
	"\n\t\ttaxon jePlodina " +
	"\n\t\t\tifTrue: [skupiny := taxon skupiny asSortedCollection]" +
	"\n\t\t\tifFalse: [taxon plodiny: (hostitele novyVyberPro: taxon plodiny)]." +
	"\n\t\toldParent := (taxon jePlodina and: [taxon parent isEmptyOrNil not]) ifTrue: [taxon parent]." +
	"\n\t\ttaxon values: self form values." +
	"\n\t\tnewParent := (taxon jePlodina and: [taxon parent isEmptyOrNil not]) ifTrue: [taxon parent]." +
	"\n\t\tFytoportal db storeObject: taxon." +
	"\n\t\t(oldParent ~= newParent or: [taxon jePlodina and: [skupiny ~= taxon skupiny asSortedCollection]]) ifTrue: [" +
	"\n\t\t\tself broadcastEvent: #zmenaZarazeniPlodiny: with: taxon]." +
	"\n\t\thostitele isVisible ifTrue: [" +
	"\n\t\t\thostitele store commitChanges." +
	"\n\t\t\tself broadcastEvent: #zmenaHostiteluSO: with: taxon]." +
	"\n\t\tself taxon: taxon." +
	"\n\t\tdialog ifNotNil: [dialog close]" +
	"\n\t]]",
	null, "2014-02-23T10:26:47Z", "mp"); //fytoportal-foto-edit

jst.FYVazbyEditor.addMethod("isValid", "", "private", 
	"\t (taxon jePlodina and: [nadrazenaPlodina value isEmptyOrNil not] and: [nadrazenaPlodina value ~= taxon parent]) ifTrue: [" +
	"\n\t \tnadrazenaPlodina value = taxon id ifTrue: [" +
	"\n\t\t\tnadrazenaPlodina markInvalid: 'Plodinu nelze zařadit pod sebe sama'." +
	"\n\t\t\t^ false]." +
	"\n\t \t\"pri zmene nadraz. plodiny kontroluji, zda uz sama nema nadrazenou plodinu\"" +
	"\n\t \t(Fytoportal db loadObject: nadrazenaPlodina value) parent ifNotNilDo: [:id | | nadraz |" +
	"\n\t\t\tnadraz := Fytoportal db loadObject: id." +
	"\n\t\t\tnadrazenaPlodina markInvalid: 'Pod tuto plodinu nelze zařadit, sama je už zařazena pod ', nadraz asString." +
	"\n\t\t\t^ false]" +
	"\n\t]." +
	"\n\t^ self form isValid",
	null, "2013-09-10T15:29:13Z", "mp");

/* zruseno
jst.FYVazbyEditor.addMethod("synchronizujNadrazPlod:", "parentId", "private", 
	"\t| parent podrizene |" +
	"\n\t\"synchronizace atributu isParent\"" +
	"\n\tparent := Fytoportal db loadObject: parentId." +
	"\n\tpodrizene := Fytoportal data plodiny podrizenePlodiny: parent id." +
	"\n\tparent isParent = podrizene isEmpty ifTrue: [" +
	"\n\t\tparent isParent: podrizene isEmpty not." +
	"\n\t\tFytoportal db storeObject: parent]",
	null, "2013-09-10T09:35:30Z", "mp");
*/

jst.FYVazbyEditor.addMethod("zahodZmeny", "", "actions", 
	"\tself form reset." +
	"\n\ttaxon jePlodina " +
	"\n\t\tifTrue: [" +
	"\n\t\t\t\"kvuli checkboxum\"" +
	"\n\t\t\tself form values: taxon asDictionary]" +
	"\n\t\tifFalse: [" +
	"\n\t\t\thostitele store rejectChanges]",
	null, "2012-08-28T08:08:13Z", "mp", 1);

jst.FYVazbyEditor.addMethod("zahodZmeny", "", "actions", 
	"\tself form reset." +
	"\n\ttaxon jePlodina " +
	"\n\t\tifTrue: [" +
	"\n\t\t\t\"kvuli checkboxum\"" +
	"\n\t\t\tself form values: taxon asDictionary." +
	"\n\t\t\tnadrazenaPlodina clearInvalid]" +
	"\n\t\tifFalse: [" +
	"\n\t\t\thostitele store rejectChanges]",
	null, "2013-09-10T13:07:59Z", "mp"); //fytoportal-foto-edit

jst.FYVazbyEditor.addMethod("skupinyPlodin", "", "private", 
	"\t^ skupinyPlodin ifNil: [skupinyPlodin := ExtCheckboxGroup new " +
	"\n\t\tfieldLabel: 'Skupiny plodin'; " +
	"\n\t\tvertical: true; " +
	"\n\t\tcolumns: 2; " +
	"\n\t\tallowBlank: false; " +
	"\n\t\tbeDisabled;" +
	"\n\t\thide;" +
	"\n\t\titems: (Fytoportal data skupinyPlodin allButFirst collect: [:n | ExtCheckbox new name: #'sk-', n; boxLabel: n])]",
	null, "2012-08-15T17:15:29Z", "mp", 1);

jst.FYVazbyEditor.addMethod("skupinyPlodin", "", "private", 
	"\t^ skupinyPlodin ifNil: [skupinyPlodin := ExtCheckboxGroup new " +
	"\n\t\tfieldLabel: 'Skupiny plodin'; " +
	"\n\t\tvertical: true; " +
	"\n\t\twidth: 400;" +
	"\n\t\tcolumns: 2; " +
	"\n\t\tallowBlank: false; " +
	"\n\t\tbeDisabled;" +
	"\n\t\thide;" +
	"\n\t\titems: (Fytoportal data skupinyPlodin allButFirst collect: [:n | ExtCheckbox new name: #'sk-', n; boxLabel: n])]",
	null, "2013-09-19T07:29:05Z", "mp", 1);

jst.FYVazbyEditor.addMethod("skupinyPlodin", "", "private", 
	"\tskupinyPlodin ifNil: [ | items |" +
	"\n\t\titems := OrderedCollection new." +
	"\n\t\tFytoportal data skupinyPlodin allChildrenDo: [:n |" +
	"\n\t\t\t(n hasChildNodes not and: [(n id startsWith: 'nezaraz') not]) ifTrue: [" +
	"\n\t\t\t\t\"pouze koncové položky a mimo nezarazene\"" +
	"\n\t\t\t\titems add: (ExtCheckbox new name: #'sk-', n id; boxLabel: n text)]]." +
	"\n\t\tskupinyPlodin := ExtCheckboxGroup new " +
	"\n\t\t\tfieldLabel: 'Skupiny plodin'; " +
	"\n\t\t\tvertical: true; " +
	"\n\t\t\twidth: 400;" +
	"\n\t\t\tcolumns: 3; " +
	"\n\t\t\tallowBlank: false; " +
	"\n\t\t\tbeDisabled;" +
	"\n\t\t\thide;" +
	"\n\t\t\titems: items" +
	"\n\t]." +
	"\n\t^ skupinyPlodin",
	null, "2014-01-29T09:19:22Z", "mp", 1);

jst.FYVazbyEditor.addMethod("skupinyPlodin", "", "private", 
	"\tskupinyPlodin ifNil: [ | items |" +
	"\n\t\titems := OrderedCollection new." +
	"\n\t\tFytoportal data skupinyPlodin allChildrenDo: [:n |" +
	"\n\t\t\t(n hasChildNodes not and: [(n id startsWith: 'nezaraz') not]) ifTrue: [" +
	"\n\t\t\t\t\"pouze koncové položky a mimo nezarazene\"" +
	"\n\t\t\t\titems add: (ExtCheckbox new name: #'sk-', n id; boxLabel: n text)]]." +
	"\n\t\tskupinyPlodin := ExtCheckboxGroup new " +
	"\n\t\t\tfieldLabel: 'Skupiny plodin'; " +
	"\n\t\t\tvertical: true; " +
	"\n\t\t\twidth: 400;" +
	"\n\t\t\tcolumns: 3; " +
	"\n\t\t\tbeDisabled;" +
	"\n\t\t\thide;" +
	"\n\t\t\titems: items" +
	"\n\t]." +
	"\n\t^ skupinyPlodin",
	null, "2014-01-29T22:16:03Z", "mp"); //fytoportal-foto-edit

/*
jst.FYVazbyEditor.addMethod("zarazeniSO", "", "private", 
	"\t^ zarazeniSO ifNil: [zarazeniSO := ExtComboBox new " +
	"\n\t\tname: 'zarazeni'; " +
	"\n\t\tfieldLabel: 'Zařazení dle etiologie'; " +
	"\n\t\ttypeAhead: true;" +
	"\n\t\ttriggerAction: #all;" +
	"\n\t\tvalueField: 'text';" +
	"\n\t\tdisplayField: 'text';" +
	"\n\t\tstore: (ExtJsonStore new" +
	"\n\t\t\troot: 'rows';" +
	"\n\t\t\tidProperty: 'text';" +
	"\n\t\t\tfields: #(text);" +
	"\n\t\t\turl: Fytoportal data rootDoc url, '_show/store-text-list/zarazeniSO');" +
	"\n\t\thide]",
	null, "2012-08-03T09:20:23Z", "mp");

jst.FYVazbyEditor.addMethod("zarazeniSO", "", "private", 
	"\t^ zarazeniSO ifNil: [zarazeniSO := ExtComboBox new " +
	"\n\t\tname: 'zarazeni'; " +
	"\n\t\tfieldLabel: 'Zařazení dle etiologie'; " +
	"\n\t\ttypeAhead: true;" +
	"\n\t\ttriggerAction: #all;" +
	"\n\t\tforceSelection: true;" +
	"\n\t\tstore: Fytoportal data zarazeniSO;" +
	"\n\t\thide]",
	null, "2012-08-03T21:36:01Z", "mp");
*/

/*
jst.FYVazbyEditor.addMethod("hostiteleUpdate", "", "actions", 
	"\t^ [:grid :record :operation | operation = #edit ifTrue: [ " +
	"\n\t\t| coll |" +
	"\n\t\tcoll := (record data at: #vyber)" +
	"\n\t\t\tifTrue: [taxon plodiny copyWith: (record data at: #id)]" +
	"\n\t\t\tifFalse: [taxon plodiny copyWithout: (record data at: #id)]." +
	"\n\t\tplodiny value: (coll asTextualList: #yourself separator: $,.)]" +
	"\n\t]",
	null, "2013-01-17T14:00:12Z", "mp");
*/

/*
jst.FYVazbyEditor.addMethod("hostitele", "", "private", 
	"\t^ hostitele ifNil: [hostitele := ExtGridPanel new" +
	"\n\t\t\"loadMask: true;\"" +
	"\n\t\tstore: (ExtJsonStore new" +
	"\n\t\t\trestful: true;" +
	"\n\t\t\tautoDestroy: true;" +
	"\n\t\t\turl: Fytoportal data plodiny doc url, '_list/store-vyber/cesky';" +
	"\n\t\t\troot: 'rows';" +
	"\n\t\t\tfields: {'id'. (ExtField new name: 'vyber'; type: #boolean). 'cesky'. 'latinsky'};" +
	"\n\t\t\ton: #update do: self hostiteleUpdate;" +
	"\n\t\t\tdefaultSortBy: 'vyber' asc: false);" +
	"\n\t\tcolumns: {" +
	"\n\t\t\tExtCheckColumn new header: 'A/N'; dataIndex: #vyber; width: 50; isSortable: true." +
	"\n\t\t\tExtColumn new header: 'Český název'; dataIndex: #cesky; width: 180; isSortable: true." +
	"\n\t\t\tExtColumn new header: 'Vědecký název'; dataIndex: #latinsky; width: 180; isSortable: true};" +
	"\n\t\tanchor: '100%'; height: 575; hide;" +
	"\n\t\ttitle: 'Hostitelské spektrum']",
	null, "2013-02-20T12:51:25Z", "mp", 1);

jst.FYVazbyEditor.addMethod("hostitele", "", "private", 
	"\t^ hostitele ifNil: [hostitele := ExtGridPanel new" +
	"\n\t\t\"loadMask: true;\"" +
	"\n\t\tstore: (ExtJsonStore new" +
	"\n\t\t\trestful: true;" +
	"\n\t\t\tautoDestroy: true;" +
	"\n\t\t\turl: Fytoportal data plodiny doc url, '_list/store-vyber/cesky';" +
	"\n\t\t\troot: 'rows';" +
	"\n\t\t\tfields: {'id'. (ExtField new name: 'vyber'; type: #boolean). 'cesky'. 'latinsky'};" +
	"\n\t\t\ton: #update do: self hostiteleUpdate;" +
	"\n\t\t\tdefaultSortBy: 'vyber' asc: false);" +
	"\n\t\tcolumns: {" +
	"\n\t\t\tExtCheckColumn new header: 'A/N'; dataIndex: #vyber; width: 50; isSortable: true." +
	"\n\t\t\tExtColumn new header: 'Český název'; dataIndex: #cesky; width: 180; isSortable: true." +
	"\n\t\t\tExtColumn new header: 'Vědecký název'; dataIndex: #latinsky; width: 180; isSortable: true};" +
	"\n\t\tanchor: '100%'; height: 575; hide;" +
	"\n\t\ttitle: 'Hostitelské spektrum';" +
	"\n\t\tkeypressFilter: [:ev | hostitele store filterBy: [:rec | | fld |" +
	"\n\t\t\tfld := ev keyChar isUppercase ifTrue: [#latinsky] ifFalse: [#cesky]." +
	"\n\t\t\t((rec data at: fld) startsWith: ev keyChar) or: [(rec data at: #vyber) = true]]]" +
	"\n\t]",
	null, "2013-09-12T15:32:52Z", "mp", 1);

jst.FYVazbyEditor.addMethod("hostitele", "", "private", 
	"\t^ hostitele ifNil: [hostitele := ExtGridPanel new" +
	"\n\t\t\"loadMask: true;\"" +
	"\n\t\tstore: (ExtJsonStore new" +
	"\n\t\t\trestful: true;" +
	"\n\t\t\tautoDestroy: true;" +
	"\n\t\t\turl: self hostiteleUrl;" +
	"\n\t\t\troot: 'rows';" +
	"\n\t\t\tfields: {'id'. (ExtField new name: 'vyber'; type: #boolean). 'cesky'. 'latinsky'};" +
	"\n\t\t\ton: #update do: self hostiteleUpdate;" +
	"\n\t\t\tdefaultSortBy: 'vyber' asc: false);" +
	"\n\t\tcolumns: {" +
	"\n\t\t\tExtCheckColumn new header: 'A/N'; dataIndex: #vyber; width: 50; isSortable: true." +
	"\n\t\t\tExtColumn new header: 'Český název'; dataIndex: #cesky; width: 180; isSortable: true." +
	"\n\t\t\tExtColumn new header: 'Vědecký název'; dataIndex: #latinsky; width: 180; isSortable: true};" +
	"\n\t\tanchor: '100%'; height: 575; hide;" +
	"\n\t\ttitle: self hostiteleTitle;" +
	"\n\t\tkeypressFilter: [:ev | hostitele store filterBy: [:rec | | fld |" +
	"\n\t\t\tfld := ev keyChar isUppercase ifTrue: [#latinsky] ifFalse: [#cesky]." +
	"\n\t\t\t((rec data at: fld) startsWith: ev keyChar) or: [(rec data at: #vyber) = true]]]" +
	"\n\t]",
	null, "2014-02-14T13:50:23Z", "mp", 1);

jst.FYVazbyEditor.addMethod("hostitele", "", "private", 
	"\t^ hostitele ifNil: [hostitele := ExtGridPanel new" +
	"\n\t\t\"loadMask: true;\"" +
	"\n\t\tstore: (ExtJsonStore new" +
	"\n\t\t\trestful: true;" +
	"\n\t\t\tautoDestroy: true;" +
	"\n\t\t\turl: self hostiteleUrl;" +
	"\n\t\t\troot: 'rows';" +
	"\n\t\t\tfields: {'id'. (ExtField new name: 'vyber'; type: #boolean). 'cesky'. 'latinsky'};" +
	"\n\t\t\tdefaultSortBy: 'vyber' asc: false);" +
	"\n\t\tcolumns: {" +
	"\n\t\t\tExtCheckColumn new header: 'A/N'; dataIndex: #vyber; width: 50; isSortable: true." +
	"\n\t\t\tExtColumn new header: 'Český název'; dataIndex: #cesky; width: 180; isSortable: true." +
	"\n\t\t\tExtColumn new header: 'Vědecký název'; dataIndex: #latinsky; width: 180; isSortable: true};" +
	"\n\t\tanchor: '100%'; height: 575; hide;" +
	"\n\t\ttitle: self hostiteleTitle;" +
	"\n\t\tkeypressFilter: [:ev | hostitele store filterBy: [:rec | | fld |" +
	"\n\t\t\tfld := ev keyChar isUppercase ifTrue: [#latinsky] ifFalse: [#cesky]." +
	"\n\t\t\t((rec data at: fld) startsWith: ev keyChar) or: [(rec data at: #vyber) = true]]]" +
	"\n\t]",
	null, "2014-02-15T20:55:51Z", "mp"); //fytoportal-foto-edit
*/

jst.FYVazbyEditor.addMethod("hostiteleUrl", "", "private", 
	"\t^ Fytoportal data plodiny doc url, '_list/store-vyber/cesky'",
	null, "2014-02-14T13:14:46Z", "mp");

jst.FYVazbyEditor.addMethod("hostiteleTitle", "", "private", 
	"\t^ 'Hostitelské spektrum'",
	null, "2014-02-14T13:50:36Z", "mp");

jst.FYVazbyEditor.addMethod("zobrazHostitele:", "aBoolean", "private", 
	"\tplodiny isEnabled: aBoolean." +
	"\n\taBoolean " +
	"\n\t\tifTrue: [ " +
	"\n\t\t\thostitele store " +
	"\n\t\t\t\tparameterAt: #vyber put: (taxon plodiny asTextualList: #yourself separator: ','); " +
	"\n\t\t\t\tload." +
	"\n\t\t\thostitele show] " +
	"\n\t\tifFalse: [hostitele hide]",
	null, "2012-08-12T18:07:30Z", "mp", 1);

jst.FYVazbyEditor.addMethod("zobrazHostitele:", "aBoolean", "private", 
	"\taBoolean " +
	"\n\t\tifTrue: [ " +
	"\n\t\t\thostitele store " +
	"\n\t\t\t\tparameterAt: #vyber put: (taxon plodiny asTextualList: #yourself separator: ','); " +
	"\n\t\t\t\tload." +
	"\n\t\t\thostitele show] " +
	"\n\t\tifFalse: [hostitele hide]",
	null, "2014-02-15T20:43:05Z", "mp"); //fytoportal-foto-edit


//* zruseno - vazba metodiky SO na hostitele ve fotogalerii byla vyrazena
jst.FYVazbyEditor.addMethod("asDialogOn:", "anObject", "converting", 
	"\t^ dialog ifNil: [dialog := ExtWindow new" +
	"\n\t\tmodal: true;" +
	"\n\t\twidth: 500;" +
	"\n\t\theight: 710;" +
	"\n\t\twithFitLayout;" +
	"\n\t\tadd: editor;" +
	"\n\t\ton: #show do: [:w |" +
	"\n\t\t\tself taxon: anObject]" +
	"\n\t]",
	null, "2013-09-13T13:37:47Z", "mp", 1);

jst.FYVazbyEditor.addMethod("asDialogOn:", "anObject", "converting", 
	"\tdialog ifNil: [" +
	"\n\t\tdialog := ExtWindow new" +
	"\n\t\t\tmodal: true;" +
	"\n\t\t\twidth: 500;" +
	"\n\t\t\theight: 710;" +
	"\n\t\t\twithFitLayout;" +
	"\n\t\t\tadd: editor;" +
	"\n\t\t\ton: #show do: [:w |" +
	"\n\t\t\t\tself taxon: anObject]." +
	"\n\t\teditor buttons: (editor buttons copyWith: (ExtButton new " +
	"\n\t\t\ttext: (anObject jePlodina ifTrue: ['Nový škodl. org.'] ifFalse: ['Nová plodina']); " +
	"\n\t\t\ticonCls: #'btn-add';" +
	"\n\t\t\ton: #click do: [(FYTaxonPopisEditor new " +
	"\n\t\t\t\tasDialogOn: (anObject jePlodina ifTrue: [FYSkodlOrg new] ifFalse: [FYPlodina new]))" +
	"\n\t\t\t\t\tmoveRelativeTo: dialog position; " +
	"\n\t\t\t\t\tshow]))." +
	"\n\t]." +
	"\n\t^ dialog",
	null, "2013-09-15T21:52:31Z", "mp", 1);

jst.FYVazbyEditor.addMethod("asDialogOn:", "anObject", "converting", 
	"\tdialog ifNil: [" +
	"\n\t\tdialog := ExtWindow new" +
	"\n\t\t\tmodal: true;" +
	"\n\t\t\twidth: 500;" +
	"\n\t\t\theight: 710;" +
	"\n\t\t\twithFitLayout;" +
	"\n\t\t\tadd: (editor border: false);" +
	"\n\t\t\tadd: self hide; \"musi byt v hierarchii kvuli odchyceni #novyTaxon:\"" +
	"\n\t\t\ton: #show do: [:w |" +
	"\n\t\t\t\tself taxon: anObject]." +
	"\n\t\teditor buttons: (editor buttons copyWith: (ExtButton new " +
	"\n\t\t\ttext: (anObject jePlodina ifTrue: ['Nový škodl. org.'] ifFalse: ['Nová plodina']); " +
	"\n\t\t\ticonCls: #'btn-add';" +
	"\n\t\t\ton: #click do: [(FYTaxonPopisEditor new " +
	"\n\t\t\t\tasDialogOn: (anObject jePlodina ifTrue: [FYSkodlOrg new] ifFalse: [FYPlodina new]))" +
	"\n\t\t\t\t\tmoveRelativeTo: dialog position; " +
	"\n\t\t\t\t\tshow]))." +
	"\n\t]." +
	"\n\t^ dialog",
	null, "2013-09-16T20:22:03Z", "mp"); //fytoportal-foto-edit

jst.FYVazbyEditor.addMethod("novyTaxon:", "anObject", "updating", 
	"\tanObject jePlodina & hostitele isVisible ifTrue: [" +
	"\n\t\t\"pouze aktualizuji seznam plodin\"" +
	"\n\t\thostitele store reload]",
	null, "2013-09-16T20:23:06Z", "mp", 1);

jst.FYVazbyEditor.addMethod("novyTaxon:", "anObject", "updating", 
	"\tanObject jePlodina ifTrue: [" +
	"\n\t\t\"pouze aktualizuji seznamy plodin\"" +
	"\n\t\thostitele isVisible ifTrue: [" +
	"\n\t\t\thostitele store reload]." +
	"\n\t\tnadrazenaPlodina store reload" +
	"\n\t]",
	null, "2013-12-03T08:03:27Z", "mp"); //fytoportal-foto-edit

jst.FYVazbyEditor.addMethod("zmenaPopisuTaxonu:", "taxon", "updating", 
	"\t\"pro jednoduchost je reakce stejna\"" +
	"\n\tself novyTaxon: taxon",
	null, "2013-12-03T08:00:33Z", "mp");

/*
jst.FYVazbyEditor.addMethod("vyberPlodin", "", "private", 
	"\t| vyber |" +
	"\n\tvyber := OrderedCollection withAll: taxon plodiny." +
	"\n\thostitele store modifiedRecords do: [:rec | (rec data at: #vyber) " +
	"\n\t\tifTrue: [(vyber includes: rec id) ifFalse: [vyber add: rec id]]" +
	"\n\t\tifFalse: [(vyber includes: rec id) ifTrue: [vyber remove: rec id]]]." +
	"\n\t^ vyber",
	null, "2014-02-14T22:02:57Z", "mp");
*/

jst.FYVazbyEditor.addMethod("isModified", "", "testing", 
	"\t^ super isModified or: [hostitele isVisible and: [" +
	"\n\t\thostitele store modifiedRecords anySatisfy: [:rec |" +
	"\n\t\t\t(rec data at: #vyber) ~= (taxon plodiny includes: rec id)]]]",
	null, "2014-02-15T21:00:48Z", "mp"); //fytoportal-foto-edit

// FYTaxonPopisPanel extension

jst.FYTaxonPopisPanel.addMethod("zmenaPopisuTaxonu:", "anObject", "*srs-fytoportal-foto-edit", 
	"\ttaxon = anObject ifTrue: [" +
	"\n\t\ttaxon := anObject." +
	"\n\t\tself refreshContent]",
	null, "2013-04-16T21:31:04Z", "mp");

// *** FYTaxonPopisTabPanel ***

jst.FYTaxonPopisTabPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\tactiveTab: 1;" +
	"\n\t\tadd: (popis := FYTaxonPopisPanel new " +
	"\n\t\t\ttitle: 'Vybraná plodina/ŠO)');" +
	"\n\t\tadd: (editor := FYTaxonPopisEditor new" +
	"\n\t\t\ttitle: 'Editace popisu');" +
	"\n\t\tadd: (editorVazeb := FYVazbyEditor new" +
	"\n\t\t\ttitle: 'Editace vazeb');" +
	"\n\t\thideTabStripItem: 2;" +
	"\n\t\thideTabStripItem: 3." +
	"\n\tpopis" +
	"\n\t\taddDependent: self",
	null, "2013-02-20T12:37:08Z", "mp", 1);

jst.FYTaxonPopisTabPanel.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\tactiveTab: 1;" +
	"\n\t\tadd: (popis := FYTaxonPopisPanel new " +
	"\n\t\t\ttitle: 'Vybraná plodina/ŠO)');" +
	"\n\t\tadd: (editor := FYTaxonPopisEditor new" +
	"\n\t\t\ttitle: 'Editace popisu');" +
	"\n\t\tadd: (editorVazeb := FYVazbyEditor new" +
	"\n\t\t\ttitle: 'Editace vazeb');" +
	"\n\t\tadd: (editorFoto := FYFotoEditor new" +
	"\n\t\t\ttitle: 'Editace fotografie');" +
	"\n\t\thideTabStripItem: 2;" +
	"\n\t\thideTabStripItem: 3;" +
	"\n\t\thideTabStripItem: 4." +
	"\n\tpopis" +
	"\n\t\taddDependent: self",
	null, "2013-06-21T13:18:39Z", "mp"); //fytoportal-foto-edit

jst.FYTaxonPopisTabPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #taxon ifTrue: [" +
	"\n\t\teditor taxon: anObject." +
	"\n\t\teditorVazeb taxon: anObject]",
	null, "2012-12-26T20:00:18Z", "mp", 1);

jst.FYTaxonPopisTabPanel.addMethod("update:with:", "anAspect anObject", "updating", 
	"\tanAspect = #taxon ifTrue: [" +
	"\n\t\teditor taxon: anObject." +
	"\n\t\teditorVazeb taxon: anObject." +
	"\n\t\teditorFoto taxon: anObject]." +
	"\n\tanAspect = #foto ifTrue: [" +
	"\n\t\teditorFoto foto: anObject]",
	null, "2013-06-21T14:24:32Z", "mp"); //fytoportal-foto-edit

jst.FYTaxonPopisTabPanel.addMethod("popis", "", "accessing", 
	"\t^ popis",
	null, "2012-12-26T19:58:32Z", "mp");

jst.FYTaxonPopisTabPanel.addMethod("loggedIn", "", "events", 
	"\t(Fytoportal db server userRoles includes: #fyAdmin) ifTrue: [" +
	"\n\t\tself \"unhideTabStrip;\"" +
	"\n\t\t\tunhideTabStripItem: 2;" +
	"\n\t\t\tunhideTabStripItem: 3]",
	null, "2013-01-02T13:03:00Z", "mp", 1);

jst.FYTaxonPopisTabPanel.addMethod("loggedIn", "", "events", 
	"\t(Fytoportal db server userRoles includes: #fyAdmin) ifTrue: [" +
	"\n\t\tself \"unhideTabStrip;\"" +
	"\n\t\t\tunhideTabStripItem: 2;" +
	"\n\t\t\tunhideTabStripItem: 3;" +
	"\n\t\t\tunhideTabStripItem: 4]",
	null, "2013-06-21T13:19:57Z", "mp", 1);

jst.FYTaxonPopisTabPanel.addMethod("loggedIn", "", "events", 
	"\tFytoportal data isAdminFoto ifTrue: [" +
	"\n\t\tself \"unhideTabStrip;\"" +
	"\n\t\t\tunhideTabStripItem: 2;" +
	"\n\t\t\tunhideTabStripItem: 3;" +
	"\n\t\t\tunhideTabStripItem: 4]",
	null, "2013-08-23T08:12:58Z", "mp"); //fytoportal-foto-edit

jst.FYTaxonPopisTabPanel.addMethod("loggedOut", "", "events", 
	"\tself activeTab: 1;" +
	"\n\t\t\"hideTabStrip\"" +
	"\n\t\thideTabStripItem: 2;" +
	"\n\t\thideTabStripItem: 3",
	null, "2012-12-12T15:31:30Z", "mp", 1);

jst.FYTaxonPopisTabPanel.addMethod("loggedOut", "", "events", 
	"\tself activeTab: 1;" +
	"\n\t\t\"hideTabStrip\"" +
	"\n\t\thideTabStripItem: 2;" +
	"\n\t\thideTabStripItem: 3;" +
	"\n\t\thideTabStripItem: 4",
	null, "2013-06-21T13:20:05Z", "mp"); //fytoportal-foto-edit

jst.FYTaxonPopisTabPanel.addMethod("renderEvent", "", "events", 
	"\t^ [self loggedIn]",
	null, "2013-01-02T13:34:09Z", "mp");

//*** FYFotoEditor ***

jst.FYFotoEditor.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tnovaFotka := true." +
	"\n\teditor" +
	"\n\t\ttrackResetOnLoad: true;" +
	"\n\t\tadd: (info := ExtDisplayField new" +
	"\n\t\t\tstyle: 'font-size: 200%';" +
	"\n\t\t\tvalue: self editorTitle;" +
	"\n\t\t\thideLabel: true);" +
	"\n\t\tadd: (ExtTextField new" +
	"\n\t\t\tname: #popis;" +
	"\n\t\t\tfieldLabel: 'Popis';" +
	"\n\t\t\tallowBlank: false;" +
	"\n\t\t\tanchor: '75%');" +
	"\n\t\tadd: self autoriComboBox;" +
	"\n\t\tadd: (Fytoportal data plodiny nazvyComboBox" +
	"\n\t\t\tallowBlank: false;" +
	"\n\t\t\tname: #plodina;" +
	"\n\t\t\thiddenName: #plodina;" +
	"\n\t\t\tfieldLabel: 'Vazba na plodinu');" +
	"\n\t\tadd: (fieldSO := Fytoportal data skodlOrg nazvyComboBox" +
	"\n\t\t\tallowBlank: false;" +
	"\n\t\t\tname: #skodlOrg;" +
	"\n\t\t\thiddenName: #skodlOrg;" +
	"\n\t\t\tfieldLabel: 'Vazba na šk. org.');" +
	"\n\t\tadd: (upload := ExtFileUploadField new" +
	"\n\t\t\tname: 'soubor';" +
	"\n\t\t\tfieldLabel: 'Soubor';" +
	"\n\t\t\tanchor: '75%';" +
	"\n\t\t\tbutton: (ExtButton new text: 'Vyber');" +
	"\n\t\t\ton: #valid do: [self renderPreview]);" +
	"\n\t\tadd: (ExtCheckbox new" +
	"\n\t\t\tname: #default;" +
	"\n\t\t\tboxLabel: 'Výchozí fotografie (IOR)');" +
	"\n\t\tadd: (ExtFieldSet new title: 'Náhled (vybraného souboru)'; " +
	"\n\t\t\tadd: (preview := ExtBoxComponent new" +
	"\n\t\t\t\thideLabel: true;" +
	"\n\t\t\t\tanchor: '100%';" +
	"\n\t\t\t\theight: 400); " +
	"\n\t\t\tyourself)." +
	"\n\tExtCore current isGecko ifFalse: [" +
	"\n\t\teditor add: (ExtDisplayField new" +
	"\n\t\t\tstyle: 'color: red';" +
	"\n\t\t\thideLabel: true;" +
	"\n\t\t\tvalue: 'Pozor: Přidávat fotografie lze zatím jen ve Firefoxu!')]",
	null, "2013-06-28T07:28:23Z", "mp", 1);

jst.FYFotoEditor.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tnovaFotka := true." +
	"\n\teditor" +
	"\n\t\ttrackResetOnLoad: true;" +
	"\n\t\tadd: (info := ExtDisplayField new" +
	"\n\t\t\tstyle: 'font-size: 200%';" +
	"\n\t\t\tvalue: self editorTitle;" +
	"\n\t\t\thideLabel: true);" +
	"\n\t\tadd: (ExtTextField new" +
	"\n\t\t\tname: #popis;" +
	"\n\t\t\tfieldLabel: 'Popis';" +
	"\n\t\t\tallowBlank: false;" +
	"\n\t\t\tanchor: '75%');" +
	"\n\t\tadd: self autoriComboBox;" +
	"\n\t\tadd: (Fytoportal data plodiny nazvyComboBox" +
	"\n\t\t\tname: #plodina;" +
	"\n\t\t\thiddenName: #plodina;" +
	"\n\t\t\tfieldLabel: 'Vazba na plodinu';" +
	"\n\t\t\ton: #select do: [:cmb :rec | fieldSO isEnabled ifTrue: [" +
	"\n\t\t\t\tself nactiSkodlOrg: rec id]]);" +
	"\n\t\tadd: (fieldSO := Fytoportal data skodlOrg nazvyComboBox" +
	"\n\t\t\tallowBlank: false;" +
	"\n\t\t\tname: #skodlOrg;" +
	"\n\t\t\thiddenName: #skodlOrg;" +
	"\n\t\t\tfieldLabel: 'Vazba na šk. org.');" +
	"\n\t\tadd: (upload := ExtFileUploadField new" +
	"\n\t\t\tname: 'soubor';" +
	"\n\t\t\tfieldLabel: 'Soubor';" +
	"\n\t\t\tanchor: '75%';" +
	"\n\t\t\tbutton: (ExtButton new text: 'Vyber');" +
	"\n\t\t\ton: #valid do: [self renderPreview]);" +
	"\n\t\tadd: (ExtCheckbox new" +
	"\n\t\t\tname: #default;" +
	"\n\t\t\tboxLabel: 'Výchozí fotografie (IOR)');" +
	"\n\t\tadd: (ExtFieldSet new title: 'Náhled (vybraného souboru)'; " +
	"\n\t\t\tadd: (preview := ExtBoxComponent new" +
	"\n\t\t\t\thideLabel: true;" +
	"\n\t\t\t\tanchor: '100%';" +
	"\n\t\t\t\theight: 400); " +
	"\n\t\t\tyourself)." +
	"\n\tExtCore current isGecko ifFalse: [" +
	"\n\t\teditor add: (ExtDisplayField new" +
	"\n\t\t\tstyle: 'color: red';" +
	"\n\t\t\thideLabel: true;" +
	"\n\t\t\tvalue: 'Pozor: Přidávat fotografie lze zatím jen ve Firefoxu!')]." +
	"\n\tfieldSO store" +
	"\n\t\tautoLoad: false;" +
	"\n\t\turl: Fytoportal data skodlOrg doc url, '_list/store-nazvy/ceskyPodlePlodiny'",
	null, "2013-06-28T21:46:59Z", "mp", 1);

jst.FYFotoEditor.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tnovaFotka := true." +
	"\n\teditor" +
	"\n\t\ttrackResetOnLoad: true;" +
	"\n\t\tadd: (info := ExtDisplayField new" +
	"\n\t\t\tstyle: 'font-size: 200%';" +
	"\n\t\t\tvalue: self editorTitle;" +
	"\n\t\t\thideLabel: true);" +
	"\n\t\tadd: (ExtTextField new" +
	"\n\t\t\tname: #popis;" +
	"\n\t\t\tfieldLabel: 'Popis';" +
	"\n\t\t\tallowBlank: false;" +
	"\n\t\t\tanchor: '75%');" +
	"\n\t\tadd: self autoriComboBox;" +
	"\n\t\tadd: (Fytoportal data plodiny nazvyComboBox" +
	"\n\t\t\tname: #plodina;" +
	"\n\t\t\thiddenName: #plodina;" +
	"\n\t\t\tfieldLabel: 'Vazba na plodinu';" +
	"\n\t\t\ton: #select do: [:cmb :rec | fieldSO isEnabled ifTrue: [" +
	"\n\t\t\t\tself nactiSkodlOrg: rec id]]);" +
	"\n\t\tadd: (fieldSO := Fytoportal data skodlOrg nazvyComboBox" +
	"\n\t\t\tallowBlank: false;" +
	"\n\t\t\tname: #skodlOrg;" +
	"\n\t\t\thiddenName: #skodlOrg;" +
	"\n\t\t\tfieldLabel: 'Vazba na šk. org.');" +
	"\n\t\tadd: (upload := ExtFileUploadField new" +
	"\n\t\t\tname: 'soubor';" +
	"\n\t\t\tfieldLabel: 'Soubor';" +
	"\n\t\t\tanchor: '75%';" +
	"\n\t\t\tbutton: (ExtButton new text: 'Vyber');" +
	"\n\t\t\ton: #valid do: [self renderPreview]);" +
	"\n\t\tadd: (ExtCheckbox new" +
	"\n\t\t\tname: #default;" +
	"\n\t\t\tboxLabel: 'Výchozí fotografie (IOR)');" +
	"\n\t\tadd: (ExtFieldSet new title: 'Náhled (vybraného souboru)'; " +
	"\n\t\t\tadd: (preview := ExtBoxComponent new" +
	"\n\t\t\t\thideLabel: true;" +
	"\n\t\t\t\tanchor: '100%';" +
	"\n\t\t\t\theight: 400); " +
	"\n\t\t\tyourself)." +
	"\n\tExtCore current isGecko ifFalse: [" +
	"\n\t\teditor add: (ExtDisplayField new" +
	"\n\t\t\tstyle: 'color: red';" +
	"\n\t\t\thideLabel: true;" +
	"\n\t\t\tvalue: 'Pozor: Přidávat fotografie lze zatím jen ve Firefoxu!')]." +
	"\n\tfieldSO store" +
	"\n\t\tautoLoad: false;" +
	"\n\t\turl: Fytoportal data skodlOrg doc url, '_list/store-nazvy/ceskyPodlePlodiny';" +
	"\n\t\ton: #load do: [:st :rec | | so |" +
	"\n\t\t\tso := fieldSO value." +
	"\n\t\t\t(rec anySatisfy: [:ea | ea id = so]) ifFalse: [so := '']." +
	"\n\t\t\tfieldSO value: so]",
	null, "2013-07-03T14:23:21Z", "mp", 1);

jst.FYFotoEditor.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tnovaFotka := true." +
	"\n\teditor" +
	"\n\t\ttrackResetOnLoad: true;" +
	"\n\t\tadd: (info := ExtDisplayField new" +
	"\n\t\t\tstyle: 'font-size: 200%';" +
	"\n\t\t\tvalue: self editorTitle;" +
	"\n\t\t\thideLabel: true);" +
	"\n\t\tadd: (ExtTextField new" +
	"\n\t\t\tname: #popis;" +
	"\n\t\t\tfieldLabel: 'Popis';" +
	"\n\t\t\tallowBlank: false;" +
	"\n\t\t\tanchor: '75%');" +
	"\n\t\tadd: self autoriComboBox;" +
	"\n\t\tadd: (Fytoportal data plodiny nazvyComboBox" +
	"\n\t\t\tname: #plodina;" +
	"\n\t\t\thiddenName: #plodina;" +
	"\n\t\t\tfieldLabel: 'Vazba na plodinu';" +
	"\n\t\t\ton: #select do: [:cmb :rec | fieldSO isEnabled ifTrue: [" +
	"\n\t\t\t\tself nactiSkodlOrg: rec id]]);" +
	"\n\t\tadd: (fieldSO := Fytoportal data skodlOrg nazvyComboBox" +
	"\n\t\t\tallowBlank: false;" +
	"\n\t\t\tname: #skodlOrg;" +
	"\n\t\t\thiddenName: #skodlOrg;" +
	"\n\t\t\tfieldLabel: 'Vazba na šk. org.');" +
	"\n\t\tadd: (upload := ExtFileUploadField new" +
	"\n\t\t\tname: 'soubor';" +
	"\n\t\t\tfieldLabel: 'Soubor';" +
	"\n\t\t\tanchor: '75%';" +
	"\n\t\t\tbutton: (ExtButton new text: 'Vyber');" +
	"\n\t\t\ton: #valid do: [self renderPreview]);" +
	"\n\t\tadd: (ExtCheckbox new" +
	"\n\t\t\tname: #default;" +
	"\n\t\t\tboxLabel: 'Výchozí fotografie (IOR)');" +
	"\n\t\tadd: (ExtFieldSet new title: 'Náhled (vybraného souboru)'; " +
	"\n\t\t\tadd: (preview := ExtBoxComponent new" +
	"\n\t\t\t\thideLabel: true;" +
	"\n\t\t\t\tanchor: '100%';" +
	"\n\t\t\t\theight: 400); " +
	"\n\t\t\tyourself)." +
	"\n\t(HTMLCanvasElement new asJsObject at: #toBlob) ifNil: [" +
	"\n\t\teditor add: (ExtDisplayField new" +
	"\n\t\t\tstyle: 'color: red';" +
	"\n\t\t\thideLabel: true;" +
	"\n\t\t\tvalue: 'Pozor: V tomto prohlížeči zatím nelze přidávat nové fotografie - použijte Firefox!')]." +
	"\n\tfieldSO store" +
	"\n\t\tautoLoad: false;" +
	"\n\t\turl: Fytoportal data skodlOrg doc url, '_list/store-nazvy/ceskyPodlePlodiny';" +
	"\n\t\ton: #load do: [:st :rec | | so |" +
	"\n\t\t\tso := fieldSO value." +
	"\n\t\t\t(rec anySatisfy: [:ea | ea id = so]) ifFalse: [so := '']." +
	"\n\t\t\tfieldSO value: so]",
	null, "2013-09-04T08:22:16Z", "mp", 1);

jst.FYFotoEditor.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tnovaFotka := true." +
	"\n\teditor" +
	"\n\t\ttrackResetOnLoad: true;" +
	"\n\t\tadd: (info := ExtDisplayField new" +
	"\n\t\t\tstyle: 'font-size: 200%';" +
	"\n\t\t\tvalue: self editorTitle;" +
	"\n\t\t\thideLabel: true);" +
	"\n\t\tadd: (ExtTextField new" +
	"\n\t\t\tname: #popis;" +
	"\n\t\t\tfieldLabel: 'Popis';" +
	"\n\t\t\tallowBlank: false;" +
	"\n\t\t\tanchor: '75%');" +
	"\n\t\tadd: self autoriComboBox;" +
	"\n\t\tadd: self plodinaField;" +
	"\n\t\tadd: self skodlOrgField;" +
	"\n\t\tadd: (upload := ExtFileUploadField new" +
	"\n\t\t\tname: 'soubor';" +
	"\n\t\t\tfieldLabel: 'Soubor';" +
	"\n\t\t\tanchor: '75%';" +
	"\n\t\t\tbutton: (ExtButton new text: 'Vyber');" +
	"\n\t\t\ton: #valid do: [self renderPreview]);" +
	"\n\t\tadd: (ExtCheckbox new" +
	"\n\t\t\tname: #default;" +
	"\n\t\t\tboxLabel: 'Výchozí fotografie (IOR)');" +
	"\n\t\tadd: (ExtFieldSet new title: 'Náhled (vybraného souboru)'; " +
	"\n\t\t\tadd: (preview := ExtBoxComponent new" +
	"\n\t\t\t\thideLabel: true;" +
	"\n\t\t\t\tanchor: '100%';" +
	"\n\t\t\t\theight: 400); " +
	"\n\t\t\tyourself)." +
	"\n\t(HTMLCanvasElement new asJsObject at: #toBlob) ifNil: [" +
	"\n\t\teditor add: (ExtDisplayField new" +
	"\n\t\t\tstyle: 'color: red';" +
	"\n\t\t\thideLabel: true;" +
	"\n\t\t\tvalue: 'Pozor: V tomto prohlížeči zatím nelze přidávat nové fotografie - použijte Firefox!')]",
	null, "2013-09-17T09:40:23Z", "mp", 1);

jst.FYFotoEditor.addMethod("initialize", "", "initialization", 
	"\tsuper initialize." +
	"\n\tnovaFotka := true." +
	"\n\teditor" +
	"\n\t\ttrackResetOnLoad: true;" +
	"\n\t\tadd: (info := ExtDisplayField new" +
	"\n\t\t\tstyle: 'font-size: 200%';" +
	"\n\t\t\tvalue: self editorTitle;" +
	"\n\t\t\thideLabel: true);" +
	"\n\t\tadd: (ExtTextField new" +
	"\n\t\t\tname: #popis;" +
	"\n\t\t\tfieldLabel: 'Popis';" +
	"\n\t\t\tallowBlank: false;" +
	"\n\t\t\tanchor: '75%');" +
	"\n\t\tadd: self autoriComboBox;" +
	"\n\t\tadd: self plodinaField;" +
	"\n\t\tadd: self skodlOrgField;" +
	"\n\t\tadd: (upload := ExtFileUploadField new" +
	"\n\t\t\tname: 'soubor';" +
	"\n\t\t\tfieldLabel: 'Soubor s fotkou';" +
	"\n\t\t\tanchor: '75%';" +
	"\n\t\t\tbutton: (ExtButton new text: 'Najít...');" +
	"\n\t\t\ton: #valid do: [self renderPreview]);" +
	"\n\t\tadd: (ExtCheckbox new" +
	"\n\t\t\tname: #default;" +
	"\n\t\t\tboxLabel: 'Výchozí fotografie (IOR)');" +
	"\n\t\tadd: (ExtFieldSet new title: 'Náhled (vybraného souboru)'; " +
	"\n\t\t\tadd: (preview := ExtBoxComponent new" +
	"\n\t\t\t\thideLabel: true;" +
	"\n\t\t\t\tanchor: '100%';" +
	"\n\t\t\t\theight: 400); " +
	"\n\t\t\tyourself)." +
	"\n\t(HTMLCanvasElement new asJsObject at: #toBlob) ifNil: [" +
	"\n\t\tupload beDisabled." +
	"\n\t\teditor add: (ExtDisplayField new" +
	"\n\t\t\tstyle: 'color: red';" +
	"\n\t\t\thideLabel: true;" +
	"\n\t\t\tvalue: 'Pozor: V tomto prohlížeči zatím nelze ukládat obrázky do databáze - použijte Firefox!')]",
	null, "2013-09-19T07:16:48Z", "mp"); //fytoportal-foto-edit

jst.FYFotoEditor.addMethod("plodinaField", "", "initialization", 
	"\t^ ExtCompositeField new items: {" +
	"\n\t\tFytoportal data plodiny nazvyComboBox" +
	"\n\t\t\tname: #plodina;" +
	"\n\t\t\thiddenName: #plodina;" +
	"\n\t\t\tfieldLabel: 'Vazba na plodinu';" +
	"\n\t\t\ton: #select do: [:cmb :rec | fieldSO isEnabled ifTrue: [" +
	"\n\t\t\t\tself nactiSkodlOrg: rec id]]." +
	"\n\t\tExtButton new " +
	"\n\t\t\ttooltip: 'Přidejte novou plodinu, pokud chybí v seznamu...';" +
	"\n\t\t\ticonCls: #'btn-add'; " +
	"\n\t\t\ton: #click do: [" +
	"\n\t\t\t\t(FYTaxonPopisEditor new asDialogOn: FYPlodina new) show]" +
	"\n\t}",
	null, "2013-09-17T12:28:24Z", "mp", 1);

jst.FYFotoEditor.addMethod("plodinaField", "", "initialization", 
	"\t^ ExtCompositeField new items: {" +
	"\n\t\tFytoportal data plodiny nazvyComboBox" +
	"\n\t\t\tname: #plodina;" +
	"\n\t\t\thiddenName: #plodina;" +
	"\n\t\t\tfieldLabel: 'Vazba na plodinu'." +
	"\n\t\tExtButton new " +
	"\n\t\t\ttooltip: 'Přidejte novou plodinu, pokud chybí v seznamu...';" +
	"\n\t\t\ticonCls: #'btn-add'; " +
	"\n\t\t\ton: #click do: [" +
	"\n\t\t\t\t(FYTaxonPopisEditor new asDialogOn: FYPlodina new) show]" +
	"\n\t}",
	null, "2013-11-29T09:59:06Z", "mp"); //fytoportal-foto-edit

jst.FYFotoEditor.addMethod("skodlOrgField", "", "initialization", 
	"\tfieldSO := Fytoportal data skodlOrg nazvyComboBox" +
	"\n\t\tallowBlank: false;" +
	"\n\t\tname: #skodlOrg;" +
	"\n\t\thiddenName: #skodlOrg;" +
	"\n\t\tfieldLabel: 'Vazba na šk. org.'." +
	"\n\tfieldSO store" +
	"\n\t\tautoLoad: false;" +
	"\n\t\turl: Fytoportal data skodlOrg doc url, '_list/store-nazvy/ceskyPodlePlodiny';" +
	"\n\t\ton: #load do: [:st :rec | | so |" +
	"\n\t\t\tso := fieldSO value." +
	"\n\t\t\t(rec anySatisfy: [:ea | ea id = so]) ifFalse: [so := '']." +
	"\n\t\t\tfieldSO value: so]." +
	"\n\t^ ExtCompositeField new items: {" +
	"\n\t\tfieldSO." +
	"\n\t\tExtButton new " +
	"\n\t\t\ttooltip: 'Přidejte nový škodl. org., pokud chybí v seznamu...';" +
	"\n\t\t\ticonCls: #'btn-add'; " +
	"\n\t\t\ton: #click do: [ | so |" +
	"\n\t\t\t\tso := FYSkodlOrg new." +
	"\n\t\t\t\t(editor form findField: #plodina) value ifNotEmptyDo: [:id |" +
	"\n\t\t\t\t\tso plodiny: id]." +
	"\n\t\t\t\t(FYTaxonPopisEditor new asDialogOn: so) show]" +
	"\n\t}",
	null, "2013-09-17T14:45:58Z", "mp", 1);

jst.FYFotoEditor.addMethod("skodlOrgField", "", "initialization", 
	"\tcboxSO := Fytoportal data skodlOrg nazvyComboBox" +
	"\n\t\tname: #skodlOrg;" +
	"\n\t\thiddenName: #skodlOrg;" +
	"\n\t\tfieldLabel: 'Vazba na šk. org.'." +
	"\n\tcboxSO store" +
	"\n\t\tautoLoad: false;" +
	"\n\t\turl: Fytoportal data skodlOrg doc url, '_list/store-nazvy/ceskyPodlePlodiny';" +
	"\n\t\ton: #load do: [:st :rec | | so |" +
	"\n\t\t\tso := cboxSO value." +
	"\n\t\t\t(rec anySatisfy: [:ea | ea id = so]) ifFalse: [so := '']." +
	"\n\t\t\tcboxSO value: so]." +
	"\n\t^ fieldSO := ExtCompositeField new items: {" +
	"\n\t\tcboxSO." +
	"\n\t\tExtButton new " +
	"\n\t\t\ttooltip: 'Přidejte nový škodl. org., pokud chybí v seznamu...';" +
	"\n\t\t\ticonCls: #'btn-add'; " +
	"\n\t\t\ton: #click do: [ | so |" +
	"\n\t\t\t\tso := FYSkodlOrg new." +
	"\n\t\t\t\t(editor form findField: #plodina) value ifNotEmptyDo: [:id |" +
	"\n\t\t\t\t\tso plodiny: id]." +
	"\n\t\t\t\t(FYTaxonPopisEditor new asDialogOn: so) show]" +
	"\n\t}",
	null, "2013-09-17T21:09:12Z", "mp", 1);

jst.FYFotoEditor.addMethod("skodlOrgField", "", "initialization", 
	"\t^ fieldSO := ExtCompositeField new items: {" +
	"\n\t\tFytoportal data skodlOrg nazvyComboBox" +
	"\n\t\t\tname: #skodlOrg;" +
	"\n\t\t\thiddenName: #skodlOrg;" +
	"\n\t\t\tfieldLabel: 'Vazba na šk. org.'." +
	"\n\t\tExtButton new " +
	"\n\t\t\ttooltip: 'Přidejte nový škodl. org., pokud chybí v seznamu...';" +
	"\n\t\t\ticonCls: #'btn-add'; " +
	"\n\t\t\ton: #click do: [ | so |" +
	"\n\t\t\t\tso := FYSkodlOrg new." +
	"\n\t\t\t\t(editor form findField: #plodina) value ifNotNilDo: [:id | id isEmpty ifFalse: [" +
	"\n\t\t\t\t\tso plodiny: {id}]]." +
	"\n\t\t\t\t(FYTaxonPopisEditor new asDialogOn: so) show]" +
	"\n\t}",
	null, "2013-11-29T09:58:29Z", "mp"); //fytoportal-foto-edit

/*
jst.FYFotoEditor.addMethod("nactiSkodlOrg:", "plodId", "private", 
	"\tfieldSO store" +
	"\n\t\tparameterAt: #startkey put: {plodId. 'a'};" +
	"\n\t\tparameterAt: #endkey put: {plodId. 'zz'};" +
	"\n\t\tload",
	null, "2013-06-28T21:48:17Z", "mp", 1);

jst.FYFotoEditor.addMethod("nactiSkodlOrg:", "plodId", "private", 
	"\t^ (plodId = predchPlod ifFalse: [" +
	"\n\t\tfieldSO store" +
	"\n\t\t\tparameterAt: #startkey put: {plodId. 'a'};" +
	"\n\t\t\tparameterAt: #endkey put: {plodId. 'zz'};" +
	"\n\t\t\tload." +
	"\n\t\tpredchPlod := plodId]) notNil",
	null, "2013-07-03T13:55:56Z", "mp", 1);

jst.FYFotoEditor.addMethod("nactiSkodlOrg:", "plodId", "private", 
	"\t^ (plodId = predchPlod ifFalse: [" +
	"\n\t\tcboxSO store" +
	"\n\t\t\tparameterAt: #startkey put: {plodId. 'a'};" +
	"\n\t\t\tparameterAt: #endkey put: {plodId. 'zz'};" +
	"\n\t\t\tload." +
	"\n\t\tpredchPlod := plodId]) notNil",
	null, "2013-09-17T21:09:26Z", "mp"); //fytoportal-foto-edit
*/

jst.FYFotoEditor.addMethod("initButtons", "", "initialization", 
	"\tsuper initButtons." +
	"\n\teditor buttons: (editor buttons copyWith: (" +
	"\n\t\tExtButton new text: 'Nová fotografie'; on: #click do: [" +
	"\n\t\t\teditor form values: self novaFotka asDictionary." +
	"\n\t\t\tself renderPreview]))",
	null, "2013-06-24T22:07:50Z", "mp", 1);

jst.FYFotoEditor.addMethod("initButtons", "", "initialization", 
	"\tsuper initButtons." +
	"\n\teditor buttons: (editor buttons copyWith: (" +
	"\n\t\tExtButton new text: 'Nová fotografie'; on: #click do: [" +
	"\n\t\t\teditor form values: self novaFotka asDictionary." +
	"\n\t\t\tfieldSO isDisabled ifTrue: [" +
	"\n\t\t\t\tfieldSO beEnabled; reset; show]." +
	"\n\t\t\tself renderPreview]))",
	null, "2013-06-26T14:04:23Z", "mp", 1);

jst.FYFotoEditor.addMethod("initButtons", "", "initialization", 
	"\tsuper initButtons." +
	"\n\teditor buttons: (editor buttons copyWith: (" +
	"\n\t\tExtButton new text: 'Nová fotografie'; on: #click do: [" +
	"\n\t\t\teditor form " +
	"\n\t\t\t\treset;" +
	"\n\t\t\t\tvalues: self novaFotka asDictionary." +
	"\n\t\t\tself renderPreview]))",
	null, "2013-06-28T07:26:41Z", "mp", 1);

jst.FYFotoEditor.addMethod("initButtons", "", "initialization", 
	"\tsuper initButtons." +
	"\n\teditor buttons: (editor buttons copyWithAll: {" +
	"\n\t\tExtButton new text: 'Nová fotografie'; on: #click do: [" +
	"\n\t\t\tself resetEditor." +
	"\n\t\t\teditor form values: self novaFotka asDictionary." +
	"\n\t\t\tself renderPreview]." +
	"\n\t\tExtButton new text: 'Smazat fotografii'; on: #click do: [" +
	"\n\t\t\tnovaFotka | fotka isNil ifTrue: [" +
	"\n\t\t\t\tself inform: 'Vyberte fotografii, kterou chcete smazat.'" +
	"\n\t\t\t] ifFalse: [UIManager default " +
	"\n\t\t\t\tconfirm: 'Vybraná fotografie bude odstraněna z databáze. Chcete pokračovat?' " +
	"\n\t\t\t\tthenDo: [self smazFotku]]]" +
	"\n\t})",
	null, "2013-07-04T09:46:53Z", "mp", 1);

jst.FYFotoEditor.addMethod("initButtons", "", "initialization", 
	"\tsuper initButtons." +
	"\n\teditor buttons: (editor buttons copyWithAll: {" +
	"\n\t\tExtButton new text: 'Nová fotografie'; on: #click do: [" +
	"\n\t\t\tself resetEditor." +
	"\n\t\t\teditor form values: self novaFotka asDictionary." +
	"\n\t\t\tself renderPreview]." +
	"\n\t\tdeleteBtn := ExtButton new text: 'Smazat fotografii'; beDisabled; on: #click do: [" +
	"\n\t\t\tnovaFotka | fotka isNil ifTrue: [" +
	"\n\t\t\t\tself inform: 'Vyberte fotografii, kterou chcete smazat.'" +
	"\n\t\t\t] ifFalse: [UIManager default " +
	"\n\t\t\t\tconfirm: 'Vybraná fotografie bude odstraněna z databáze. Chcete pokračovat?' " +
	"\n\t\t\t\tthenDo: [self smazFotku]]]" +
	"\n\t})",
	null, "2013-07-05T19:42:20Z", "mp", 1);

jst.FYFotoEditor.addMethod("initButtons", "", "initialization", 
	"\tsuper initButtons." +
	"\n\teditor buttons: (editor buttons copyWithAll: {" +
	"\n\t\tExtButton new " +
	"\n\t\t\ttext: 'Nová fotografie'; " +
	"\n\t\t\ticonCls: #'btn-add'; " +
	"\n\t\t\ton: #click do: [" +
	"\n\t\t\t\tself resetEditor." +
	"\n\t\t\t\teditor form values: self novaFotka asDictionary." +
	"\n\t\t\t\tself renderPreview]." +
	"\n\t\tdeleteBtn := ExtButton new " +
	"\n\t\t\ttext: 'Smazat fotografii'; " +
	"\n\t\t\ticonCls: #'btn-delete'; " +
	"\n\t\t\tbeDisabled; " +
	"\n\t\t\ton: #click do: [" +
	"\n\t\t\t\tnovaFotka | fotka isNil ifTrue: [" +
	"\n\t\t\t\t\tself inform: 'Vyberte fotografii, kterou chcete smazat.'" +
	"\n\t\t\t\t] ifFalse: [UIManager default " +
	"\n\t\t\t\t\tconfirm: 'Vybraná fotografie bude odstraněna z databáze. Chcete pokračovat?' " +
	"\n\t\t\t\t\tthenDo: [self smazFotku]]]" +
	"\n\t})",
	null, "2014-02-27T19:54:10Z", "mp"); //fytoportal-foto-edit

jst.FYFotoEditor.addMethod("renderPreview", "", "private", 
	"\tpreview htmlContents: [:html | html text: (" +
	"\n\t\t(novaFotka not and: [fotka notNil] and: [fotka soubor notNil]) " +
	"\n\t\t\tifTrue: 'Viz obrázek vpravo...' " +
	"\n\t\t\tifFalse: '')]",
	null, "2013-06-24T22:36:12Z", "mp", 1);

jst.FYFotoEditor.addMethod("renderPreview", "", "private", 
	"\tpreview contents: (novaFotka ifTrue: '' ifFalse: 'Viz obrázek vpravo...')",
	null, "2013-06-27T20:43:56Z", "mp", 1);

jst.FYFotoEditor.addMethod("renderPreview", "", "private", 
	"\tupload files size > 0 ifTrue: [upload files first asImageDo: [:img | " +
	"\n\t\t| rect |" +
	"\n\t\trect := img extent scaleToFit: preview extent center: false." +
	"\n\t\tpreview htmlContents: [:html | " +
	"\n\t\t\thtml img src: upload files first asUrl; height: rect height; width: rect width]]" +
	"\n\t] ifFalse: [" +
	"\n\t\tpreview contents: (novaFotka ifTrue: '' ifFalse: 'Viz obrázek vpravo...')]",
	null, "2013-06-28T07:41:57Z", "mp"); //fytoportal-foto-edit

jst.FYFotoEditor.addMethod("foto:", "aRecord", "accessing", 
	"\tjinaFotka := aRecord ifNotNil: [" +
	"\n\t\taRecord ifNotString: [aRecord id]]." +
	"\n\tself isActive ifFalse: [" +
	"\n\t\t^ self]." +
	"\n\tfotka := jinaFotka ifString: [Fytoportal db loadObject: jinaFotka]." +
	"\n\tjinaFotka := nil." +
	"\n\teditor stopMonitoring." +
	"\n\tfotka " +
	"\n\t\tifNotNil: [novaFotka := false." +
	"\n\t\t\tinfo contents:  'Vybraná fotografie'." +
	"\n\t\t\teditor form values: fotka asDictionary]" +
	"\n\t\tifNil: [editor form values: self novaFotka asDictionary]." +
	"\n\tself renderPreview." +
	"\n\teditor startMonitoring",
	null, "2013-06-25T12:02:35Z", "mp", 1);

jst.FYFotoEditor.addMethod("foto:", "aRecord", "accessing", 
	"\tjinaFotka := aRecord ifNotNil: [" +
	"\n\t\taRecord ifNotString: [aRecord id]]." +
	"\n\tself isActive ifFalse: [" +
	"\n\t\t^ self]." +
	"\n\tfotka := jinaFotka ifString: [Fytoportal db loadObject: jinaFotka]." +
	"\n\tjinaFotka := nil." +
	"\n\teditor stopMonitoring." +
	"\n\teditor form reset." +
	"\n\tfotka " +
	"\n\t\tifNotNil: [ | dict |" +
	"\n\t\t\tnovaFotka := false." +
	"\n\t\t\tinfo contents:  'Vybraná fotografie'." +
	"\n\t\t\tdict := fotka asDictionary." +
	"\n\t\t\t(fotka soubor isNil and: [fotka soubory notNil]) ifTrue: [" +
	"\n\t\t\t\tdict at: #soubor put: '(v databázi)']." +
	"\n\t\t\teditor form values: dict]" +
	"\n\t\tifNil: [editor form values: self novaFotka asDictionary]." +
	"\n\tself renderPreview." +
	"\n\teditor startMonitoring",
	null, "2013-06-27T22:17:57Z", "mp", 1);

jst.FYFotoEditor.addMethod("foto:", "aRecord", "accessing", 
	"\tjinaFotka := aRecord ifNotNil: [" +
	"\n\t\taRecord ifNotString: [aRecord id]]." +
	"\n\tself isActive ifFalse: [" +
	"\n\t\t^ self]." +
	"\n\tfotka := jinaFotka ifString: [Fytoportal db loadObject: jinaFotka]." +
	"\n\tjinaFotka := nil." +
	"\n\teditor stopMonitoring." +
	"\n\teditor form reset." +
	"\n\tfotka " +
	"\n\t\tifNotNil: [ | dict |" +
	"\n\t\t\tnovaFotka := false." +
	"\n\t\t\tinfo contents:  'Vybraná fotografie'." +
	"\n\t\t\tdict := fotka asDictionary." +
	"\n\t\t\t(fotka soubor isNil and: [fotka soubory notNil]) ifTrue: [" +
	"\n\t\t\t\tdict at: #soubor put: '(v databázi)']." +
	"\n\t\t\teditor form values: dict." +
	"\n\t\t\tdict at: #plodina ifPresent: [:id |" +
	"\n\t\t\t\tself nactiSkodlOrg: id]]" +
	"\n\t\tifNil: [" +
	"\n\t\t\teditor form values: self novaFotka asDictionary." +
	"\n\t\t\tplodina ifNotNil: [" +
	"\n\t\t\t\tself nactiSkodlOrg: plodina id]\t]." +
	"\n\tself renderPreview." +
	"\n\teditor startMonitoring",
	null, "2013-06-28T22:00:27Z", "mp", 1);

jst.FYFotoEditor.addMethod("foto:", "aRecord", "accessing", 
	"\tjinaFotka := aRecord ifNotNil: [" +
	"\n\t\taRecord ifNotString: [aRecord id]]." +
	"\n\tself isActive ifFalse: [" +
	"\n\t\t^ self]." +
	"\n\tfotka := jinaFotka ifString: [Fytoportal db loadObject: jinaFotka]." +
	"\n\tjinaFotka := nil." +
	"\n\teditor stopMonitoring." +
	"\n\teditor form reset." +
	"\n\tfotka ifNotNil: [ | dict |" +
	"\n\t\tnovaFotka := false." +
	"\n\t\tinfo contents:  'Vybraná fotografie'." +
	"\n\t\tdict := fotka formValues." +
	"\n\t\tplodina := fotka plodina." +
	"\n\t\teditor form values: dict." +
	"\n\t\tdeleteBtn beEnabled" +
	"\n\t] ifNil: [" +
	"\n\t\teditor form values: self novaFotka formValues]." +
	"\n\tself nactiSkodlOrg: (plodina ifNil: '')." +
	"\n\tself renderPreview." +
	"\n\teditor startMonitoring",
	null, "2013-07-05T20:57:10Z", "mp", 1);

jst.FYFotoEditor.addMethod("foto:", "aRecord", "accessing", 
	"\tjinaFotka := aRecord ifNotNil: [" +
	"\n\t\taRecord ifNotString: [aRecord id]]." +
	"\n\tself isActive ifFalse: [" +
	"\n\t\t^ self]." +
	"\n\tfotka := jinaFotka ifString: [Fytoportal db loadObject: jinaFotka]." +
	"\n\tjinaFotka := nil." +
	"\n\teditor stopMonitoring." +
	"\n\teditor form reset." +
	"\n\tfotka ifNotNil: [ | dict |" +
	"\n\t\tnovaFotka := false." +
	"\n\t\tinfo contents:  'Vybraná fotografie'." +
	"\n\t\tdict := fotka formValues." +
	"\n\t\tplodina := fotka plodina." +
	"\n\t\teditor form values: dict." +
	"\n\t\tdeleteBtn beEnabled." +
	"\n\t\tfieldSO " +
	"\n\t\t\tisEnabled: fotka skodlOrg notNil;" +
	"\n\t\t\tisVisible: fotka skodlOrg notNil" +
	"\n\t] ifNil: [" +
	"\n\t\teditor form values: self novaFotka formValues]." +
	"\n\tself renderPreview." +
	"\n\teditor startMonitoring",
	null, "2013-11-29T15:01:38Z", "mp"); //fytoportal-foto-edit

jst.FYFotoEditor.addMethod("activateEvent", "", "events", 
	"\t^ [jinaFotka " +
	"\n\t\tifNotNil: [self foto: jinaFotka]" +
	"\n\t\tifNil: [editor startMonitoring]]",
	null, "2013-06-21T15:07:34Z", "mp");

jst.FYFotoEditor.addMethod("autoriComboBox", "", "initialization", 
	"\t^ ExtComboBox new " +
	"\n\t\ttypeAhead: true;" +
	"\n\t\ttriggerAction: #all;" +
	"\n\t\tselectOnFocus: true;" +
	"\n\t\tmode: 'local';" +
	"\n\t\tstore: (ExtJsonStore new" +
	"\n\t\t\trestful: true;" +
	"\n\t\t\tautoLoad: true;" +
	"\n\t\t\tautoDestroy: true;" +
	"\n\t\t\turl: Fytoportal data fotky autori url asString, '?group=true';" +
	"\n\t\t\troot: 'rows';" +
	"\n\t\t\tfields: {'key'. 'value'});" +
	"\n\t\tdisplayField: 'key';" +
	"\n\t\tvalueField: 'key';" +
	"\n\t\tname: #autor;" +
	"\n\t\thiddenName: #autor;" +
	"\n\t\tallowBlank: false;" +
	"\n\t\tfieldLabel: 'Autor'",
	null, "2013-06-27T15:54:55Z", "mp");

jst.FYFotoEditor.addMethod("taxon:", "anObject", "accessing", 
	"\ttaxon := anObject." +
	"\n\tjinaFotka := nil." +
	"\n\ttaxon jePlodina" +
	"\n\t\tifTrue: [" +
	"\n\t\t\tplodina := anObject." +
	"\n\t\t\tskodlOrg := nil." +
	"\n\t\t\tfieldSO beDisabled; hide]" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tskodlOrg := anObject." +
	"\n\t\t\tfieldSO beEnabled; reset; show]",
	null, "2013-06-24T21:30:07Z", "mp", 1);

jst.FYFotoEditor.addMethod("taxon:", "anObject", "accessing", 
	"\ttaxon := anObject id." +
	"\n\tjinaFotka := nil." +
	"\n\tanObject jePlodina" +
	"\n\t\tifTrue: [" +
	"\n\t\t\tplodina := taxon." +
	"\n\t\t\tskodlOrg := nil." +
	"\n\t\t\tfieldSO beDisabled; hide]" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tskodlOrg := taxon." +
	"\n\t\t\tfieldSO beEnabled; reset; show]",
	null, "2013-07-03T13:25:11Z", "mp", 1);

jst.FYFotoEditor.addMethod("taxon:", "anObject", "accessing", 
	"\ttaxon := anObject id." +
	"\n\tjinaFotka := nil." +
	"\n\tanObject jePlodina" +
	"\n\t\tifTrue: [" +
	"\n\t\t\tplodina := taxon." +
	"\n\t\t\tskodlOrg := nil." +
	"\n\t\t\tfieldSO beDisabled; hide]" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tskodlOrg := taxon." +
	"\n\t\t\tfieldSO beEnabled; show." +
	"\n\t\t\tcboxSO reset]",
	null, "2013-09-17T21:11:48Z", "mp", 1);

jst.FYFotoEditor.addMethod("taxon:", "anObject", "accessing", 
	"\ttaxon := anObject id." +
	"\n\tjinaFotka := nil." +
	"\n\tanObject jePlodina" +
	"\n\t\tifTrue: [" +
	"\n\t\t\tplodina := taxon." +
	"\n\t\t\tskodlOrg := nil." +
	"\n\t\t\tfieldSO beDisabled; hide]" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tskodlOrg := taxon." +
	"\n\t\t\tfieldSO beEnabled; show]",
	null, "2013-11-29T09:48:29Z", "mp", 1);

jst.FYFotoEditor.addMethod("taxon:", "anObject", "accessing", 
	"\ttaxon := anObject id." +
	"\n\tjinaFotka := nil." +
	"\n\tanObject jePlodina" +
	"\n\t\tifTrue: [" +
	"\n\t\t\tplodina := taxon." +
	"\n\t\t\tskodlOrg := nil]" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tskodlOrg := taxon]." +
	"\n\tfieldSO beEnabled; show",
	null, "2013-12-04T15:37:27Z", "mp"); //fytoportal-foto-edit

jst.FYFotoEditor.addMethod("bezeZmen", "", "actions", 
	"\tself inform: (fotka ifNil: ['Fotografie']) asString->'Beze změn.'",
	null, "2013-06-24T21:47:18Z", "mp");

jst.FYFotoEditor.addMethod("editorTitle", "", "accessing", 
	"\t^ (novaFotka not and: [fotka notNil]) " +
	"\n\t\tifTrue: 'Vybraná fotografie'" +
	"\n\t\tifFalse: 'Nová fotografie'",
	null, "2013-06-25T07:17:26Z", "mp");

jst.FYFotoEditor.addMethod("zahodZmeny", "", "actions", 
	"\t(novaFotka and: [fotka notNil])" +
	"\n\t\tifTrue: [\"vratim puvodni fotku\"" +
	"\n\t\t\tself foto: fotka]" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tself form reset." +
	"\n\t\t\tinfo contents: self editorTitle." +
	"\n\t\t\tself renderPreview]",
	null, "2013-06-25T12:02:43Z", "mp", 1);
/*
jst.FYFotoEditor.addMethod("zahodZmeny", "", "actions", 
	"\t(novaFotka and: [fotka notNil])" +
	"\n\t\tifTrue: [\"vratim puvodni fotku\"" +
	"\n\t\t\tself foto: fotka." +
	"\n\t\t\ttaxon jePlodina & fieldSO isEnabled ifTrue: [" +
	"\n\t\t\t\tfieldSO beDisabled; hide]]" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tself form reset." +
	"\n\t\t\tinfo contents: self editorTitle." +
	"\n\t\t\tself renderPreview]",
	null, "2013-06-26T14:08:02Z", "mp"); //fytoportal-foto-edit
*/
jst.FYFotoEditor.addMethod("zahodZmeny", "", "actions", 
	"\t(novaFotka and: [fotka notNil])" +
	"\n\t\tifTrue: [\"vratim puvodni fotku\"" +
	"\n\t\t\tself foto: fotka]" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tpredchPlod := nil." +
	"\n\t\t\tself nactiSkodlOrg: (plodina ifNil: '')." +
	"\n\t\t\tself form reset." +
	"\n\t\t\tinfo contents: self editorTitle." +
	"\n\t\t\tself renderPreview]",
	null, "2013-07-03T14:40:21Z", "mp", 1);

jst.FYFotoEditor.addMethod("zahodZmeny", "", "actions", 
	"\t(novaFotka and: [fotka notNil])" +
	"\n\t\tifTrue: [\"vratim puvodni fotku\"" +
	"\n\t\t\tself foto: fotka]" +
	"\n\t\tifFalse: [" +
	"\n\t\t\tself resetEditor." +
	"\n\t\t\tinfo contents: self editorTitle." +
	"\n\t\t\tself renderPreview]",
	null, "2013-07-04T08:59:21Z", "mp"); //fytoportal-foto-edit

jst.FYFotoEditor.addMethod("resetEditor", "", "private", 
	"\tpredchPlod := nil." +
	"\n\tself nactiSkodlOrg: (plodina ifNil: '')." +
	"\n\tself form reset",
	null, "2013-07-04T08:58:57Z", "mp", 1);

jst.FYFotoEditor.addMethod("resetEditor", "", "private", 
	"\tself form reset",
	null, "2013-11-29T13:45:59Z", "mp"); //fytoportal-foto-edit

jst.FYFotoEditor.addMethod("smazFotku", "", "actions", 
	"\tFytoportal db deleteObject: fotka." +
	"\n\tself broadcastEvent: #'fotkaSmazana:' with: fotka." +
	"\n\tfotka := nil",
	null, "2013-07-04T09:48:54Z", "mp");

jst.FYFotoEditor.addMethod("novaFotka", "", "private", 
	"\tnovaFotka := true." +
	"\n\tinfo contents: self editorTitle." +
	"\n\t^ FYFotografie new" +
	"\n\t\tplodina: (plodina ifNotNil: [plodina id]);" +
	"\n\t\tskodlOrg: (skodlOrg ifNotNil: [skodlOrg id])",
	null, "2013-06-25T12:02:51Z", "mp", 1);

jst.FYFotoEditor.addMethod("novaFotka", "", "private", 
	"\tnovaFotka := true." +
	"\n\tinfo contents: self editorTitle." +
	"\n\tdeleteBtn beDisabled." +
	"\n\t^ FYFotografie new" +
	"\n\t\tplodina: plodina;" +
	"\n\t\tskodlOrg: skodlOrg",
	null, "2013-07-05T20:57:37Z", "mp", 1);

jst.FYFotoEditor.addMethod("novaFotka", "", "private", 
	"\tnovaFotka := true." +
	"\n\tinfo contents: self editorTitle." +
	"\n\tdeleteBtn beDisabled." +
	"\n\tfieldSO beEnabled; show." +
	"\n\t^ FYFotografie new" +
	"\n\t\tplodina: plodina;" +
	"\n\t\tskodlOrg: skodlOrg",
	null, "2013-11-29T14:33:25Z", "mp"); //fytoportal-foto-edit

jst.FYFotoEditor.addMethod("isModified", "", "testing", 
	"\t^ self form isDirty or: [upload files size > 0]",
	null, "2013-06-25T11:25:53Z", "mp");

jst.FYFotoEditor.addMethod("image", "", "accessing", 
	"\t^ upload files size > 0 ifTrue: [preview element dom firstChild]",
	null, "2013-06-26T13:22:35Z", "mp");

jst.FYFotoEditor.addMethod("ulozZmeny", "", "actions", 
	"\t| img |" +
	"\n\timg := self image." +
	"\n\t(img isNil and: [upload value isEmpty]) ifTrue: [" +
	"\n\t\tpreview htmlContents: [:html | html text: '']. \"odstraneni 'osireleho' obrazku\"" +
	"\n\t\t^ self inform: 'Fotografie chybí'->'Vyberte soubor s fotografií, kterou chcete nahrát do databáze!']." +
	"\n\t(img notNil and: [img naturalWidth < 1440] and: [img naturalHeight < 1080]) ifTrue: [" +
	"\n\t\t^ self inform: 'Malá fotografie'->('Vybraná fotografie má velikost {1}x{2} bodů, musí mít ale minimálně 1440x1080 bodů!' " +
	"\n\t\t\tformat: {img naturalWidth. img naturalHeight})]." +
	"\n\tnovaFotka ifFalse: [UIManager default" +
	"\n\t\tconfirm: 'Vybraná fotografie bude přepsána. Pokračovat?' " +
	"\n\t\tthenDo: [self ulozFotku]" +
	"\n\t] ifTrue: [" +
	"\n\t\tself ulozFotku]",
	null, "2013-06-27T08:59:00Z", "mp", 1);

jst.FYFotoEditor.addMethod("ulozZmeny", "", "actions", 
	"\t| img |" +
	"\n\timg := self image." +
	"\n\t(img isNil and: [upload value isEmpty]) ifTrue: [" +
	"\n\t\tpreview contents: ''. \"odstraneni 'osireleho' obrazku\"" +
	"\n\t\tnovaFotka ifTrue: [" +
	"\n\t\t\t^ self inform: 'Fotografie chybí'->'Vyberte soubor s fotografií, kterou chcete nahrát do databáze!']" +
	"\n\t]." +
	"\n\t(img notNil and: [img naturalWidth < 1440] and: [img naturalHeight < 1080]) ifTrue: [" +
	"\n\t\t^ self inform: 'Malá fotografie'->('Vybraná fotografie má velikost {1}x{2} bodů, musí mít ale minimálně 1440x1080 bodů!' " +
	"\n\t\t\tformat: {img naturalWidth. img naturalHeight})]." +
	"\n\tnovaFotka ifFalse: [UIManager default" +
	"\n\t\tconfirm: 'Vybraná fotografie bude přepsána. Pokračovat?' " +
	"\n\t\tthenDo: [self ulozFotku]" +
	"\n\t] ifTrue: [" +
	"\n\t\tself ulozFotku]",
	null, "2013-06-27T20:46:19Z", "mp", 1);

jst.FYFotoEditor.addMethod("ulozZmeny", "", "actions", 
	"\t| img |" +
	"\n\timg := self image." +
	"\n\t(img isNil and: [upload value isEmpty]) ifTrue: [" +
	"\n\t\tpreview contents: ''. \"odstraneni 'osireleho' obrazku\"" +
	"\n\t\tnovaFotka ifTrue: [" +
	"\n\t\t\t^ self inform: 'Fotografie chybí'->'Vyberte soubor s fotografií, kterou chcete nahrát do databáze!']" +
	"\n\t]." +
	"\n\t(img notNil and: [img naturalWidth < 1440] and: [img naturalHeight < 1080]) ifTrue: [" +
	"\n\t\tUIManager default confirm: 'Malá fotografie'->(" +
	"\n\t\t\t'Vybraná fotografie má velikost {1}x{2} bodů, měla by mít ale minimálně 1440x1080 bodů. Chcete ji přesto uložit?' " +
	"\n\t\t\tformat: {img naturalWidth. img naturalHeight}) thenDo: [" +
	"\n\t\t\t\tself ulozFotku]" +
	"\n\t] ifFalse: [" +
	"\n\t\tself ulozFotku]",
	null, "2013-06-28T06:45:17Z", "mp"); //fytoportal-foto-edit

jst.FYFotoEditor.addMethod("ulozFotku", "", "private", 
	"\t| nf event |" +
	"\n\tExtMessageBox new" +
	"\n\t\tclosable: true; \"kdyby se ulozeni nepodarilo, aby slo dialog zavrit\"" +
	"\n\t\ticon: 'mbox-loading';" +
	"\n\t\ttext: 'Ukládám změny, čekejte...';" +
	"\n\t\tshow." +
	"\n\tnf := novaFotka" +
	"\n\t\tifTrue: [FYFotografie new]" +
	"\n\t\tifFalse: [fotka copy]." +
	"\n\tnf values: self form values." +
	"\n\tnf isDefault ifTrue: [" +
	"\n\t\t\"zmena vychozi fotky\"" +
	"\n\t\tself zrusVybraneMimo: nf]." +
	"\n\t(nf skodlOrg notNil and: [plodina notNil] and: [plodina parent notNil] and: [plodina id = nf plodina]) ifTrue: [" +
	"\n\t\t\"fotka SO, musim doplnit nadrazenou plodinu\"" +
	"\n\t\tnf nadrazenaPlodina: (plodina parent ifNotString: [:p | p id])]." +
	"\n\tevent := novaFotka ifTrue: #'fotkaPridana:' ifFalse: #'fotkaZmenena:'." +
	"\n\tself image ifNotNilDo: [:img |" +
	"\n\t\tnf format: img naturalWidth / img naturalHeight." +
	"\n\t\tFytoportal db storeObject: nf." +
	"\n\t\t\"ulozim prilohy\"" +
	"\n\t\tself attachFoto: 'preview' size: 200 @ 150 to: nf id thenDo: [" +
	"\n\t\t\tself attachFoto: 'optimal' size: 880 @ 660 to: nf id thenDo: [" +
	"\n\t\t\t\tself attachFoto: 'original' size: 1440 @ 1080 to: nf id thenDo: [" +
	"\n\t\t\t\t\tExtMessageBox hide." +
	"\n\t\t\t\t\tself broadcastEvent: event with: nf]]]" +
	"\n\t] ifNil: [" +
	"\n\t\tFytoportal db storeObject: nf." +
	"\n\t\tExtMessageBox hide." +
	"\n\t\tself broadcastEvent: event with: nf]",
	null, "2013-06-27T15:53:20Z", "mp", 1);

jst.FYFotoEditor.addMethod("ulozFotku", "", "private", 
	"\t| nf |" +
	"\n\tExtMessageBox new" +
	"\n\t\tclosable: true; \"kdyby se ulozeni nepodarilo, aby slo dialog zavrit\"" +
	"\n\t\ticon: 'mbox-loading';" +
	"\n\t\ttext: 'Ukládám změny, čekejte...';" +
	"\n\t\tshow." +
	"\n\tnf := novaFotka" +
	"\n\t\tifTrue: [FYFotografie new]" +
	"\n\t\tifFalse: [fotka copy]." +
	"\n\tnf values: self form values." +
	"\n\tnf isDefault ifTrue: [" +
	"\n\t\t\"zmena vychozi fotky\"" +
	"\n\t\tself zrusVybraneMimo: nf]." +
	"\n\t(nf skodlOrg notNil and: [plodina notNil] and: [plodina parent notNil] and: [plodina id = nf plodina]) ifTrue: [" +
	"\n\t\t\"fotka SO, musim doplnit nadrazenou plodinu\"" +
	"\n\t\tnf nadrazenaPlodina: (plodina parent ifNotString: [:p | p id])]." +
	"\n\tself image ifNotNilDo: [:img |" +
	"\n\t\tnf format: img naturalWidth / img naturalHeight." +
	"\n\t\tFytoportal db storeObject: nf." +
	"\n\t\t\"ulozim prilohy\"" +
	"\n\t\tself attachFoto: 'preview' size: 200 @ 150 to: nf id thenDo: [" +
	"\n\t\t\tself attachFoto: 'optimal' size: 880 @ 660 to: nf id thenDo: [" +
	"\n\t\t\t\tself attachFoto: 'original' size: 1440 @ 1080 to: nf id thenDo: [" +
	"\n\t\t\t\t\tExtMessageBox hide." +
	"\n\t\t\t\t\tself broadcastEvent: #'fotkaZmenena:' with: nf]]]" +
	"\n\t] ifNil: [" +
	"\n\t\tFytoportal db storeObject: nf." +
	"\n\t\tExtMessageBox hide." +
	"\n\t\tself broadcastEvent: #'fotkaZmenena:' with: nf]",
	null, "2013-06-28T12:57:04Z", "mp", 1);

jst.FYFotoEditor.addMethod("ulozFotku", "", "private", 
	"\t| nf |" +
	"\n\tExtMessageBox new" +
	"\n\t\tclosable: true; \"kdyby se ulozeni nepodarilo, aby slo dialog zavrit\"" +
	"\n\t\ticon: 'mbox-loading';" +
	"\n\t\ttext: 'Ukládám změny, čekejte...';" +
	"\n\t\tshow." +
	"\n\tnf := novaFotka" +
	"\n\t\tifTrue: [FYFotografie new]" +
	"\n\t\tifFalse: [fotka copy]." +
	"\n\tnf values: self form values." +
	"\n\tnf isDefault ifTrue: [" +
	"\n\t\t\"zmena vychozi fotky\"" +
	"\n\t\tself zrusVybraneMimo: nf]." +
	"\n\t(nf skodlOrg notNil and: [nf plodina notNil]) ifTrue: [ | pl |" +
	"\n\t\t\"fotka SO, musim doplnit nadrazenou plodinu\"" +
	"\n\t\tpl := Fytoportal db loadObject: nf plodina." +
	"\n\t\tnf nadrazenaPlodina: pl parent]." +
	"\n\tself image ifNotNilDo: [:img |" +
	"\n\t\tnf format: img naturalWidth / img naturalHeight." +
	"\n\t\tFytoportal db storeObject: nf." +
	"\n\t\t\"ulozim prilohy\"" +
	"\n\t\tself attachFoto: 'preview' size: 200 @ 150 to: nf id thenDo: [" +
	"\n\t\t\tself attachFoto: 'optimal' size: 880 @ 660 to: nf id thenDo: [" +
	"\n\t\t\t\tself attachFoto: 'original' size: 1440 @ 1080 to: nf id thenDo: [" +
	"\n\t\t\t\t\tExtMessageBox hide." +
	"\n\t\t\t\t\tself broadcastEvent: #'fotkaZmenena:' with: nf]]]" +
	"\n\t] ifNil: [" +
	"\n\t\tFytoportal db storeObject: nf." +
	"\n\t\tExtMessageBox hide." +
	"\n\t\tself broadcastEvent: #'fotkaZmenena:' with: nf]",
	null, "2013-07-03T13:32:24Z", "mp", 1);

jst.FYFotoEditor.addMethod("ulozFotku", "", "private", 
	"\t| nf |" +
	"\n\tExtMessageBox new" +
	"\n\t\tclosable: true; \"kdyby se ulozeni nepodarilo, aby slo dialog zavrit\"" +
	"\n\t\ticon: 'mbox-loading';" +
	"\n\t\ttext: 'Ukládám změny, čekejte...';" +
	"\n\t\tshow." +
	"\n\tnf := novaFotka" +
	"\n\t\tifTrue: [FYFotografie new]" +
	"\n\t\tifFalse: [fotka copy resetDefault]." +
	"\n\tnf values: self form values." +
	"\n\tnf isDefault ifTrue: [" +
	"\n\t\t\"zmena vychozi fotky\"" +
	"\n\t\tself zrusVybraneMimo: nf]." +
	"\n\t(nf skodlOrg notNil and: [nf plodina notNil]) ifTrue: [ | pl |" +
	"\n\t\t\"fotka SO, musim doplnit nadrazenou plodinu\"" +
	"\n\t\tpl := Fytoportal db loadObject: nf plodina." +
	"\n\t\tnf nadrazenaPlodina: pl parent]." +
	"\n\tself image ifNotNilDo: [:img |" +
	"\n\t\tnf format: img naturalWidth / img naturalHeight." +
	"\n\t\tFytoportal db storeObject: nf." +
	"\n\t\t\"ulozim prilohy\"" +
	"\n\t\tself attachFoto: 'preview' size: 200 @ 150 to: nf id thenDo: [" +
	"\n\t\t\tself attachFoto: 'optimal' size: 880 @ 660 to: nf id thenDo: [" +
	"\n\t\t\t\tself attachFoto: 'original' size: 1440 @ 1080 to: nf id thenDo: [" +
	"\n\t\t\t\t\tExtMessageBox hide." +
	"\n\t\t\t\t\tself broadcastEvent: #'fotkaZmenena:' with: nf]]]" +
	"\n\t] ifNil: [" +
	"\n\t\tFytoportal db storeObject: nf." +
	"\n\t\tExtMessageBox hide." +
	"\n\t\tself broadcastEvent: #'fotkaZmenena:' with: nf]",
	null, "2013-07-03T22:33:45Z", "mp", 1);

jst.FYFotoEditor.addMethod("ulozFotku", "", "private", 
	"\t| nf auth |" +
	"\n\tExtMessageBox new" +
	"\n\t\tclosable: true; \"kdyby se ulozeni nepodarilo, aby slo dialog zavrit\"" +
	"\n\t\ticon: 'mbox-loading';" +
	"\n\t\ttext: 'Ukládám změny, čekejte...';" +
	"\n\t\tshow." +
	"\n\tnf := novaFotka" +
	"\n\t\tifTrue: [FYFotografie new]" +
	"\n\t\tifFalse: [(Fytoportal db loadObject: fotka id) resetDefault]." +
	"\n\tnf values: self form values." +
	"\n\tnf isDefault ifTrue: [" +
	"\n\t\t\"zmena vychozi fotky\"" +
	"\n\t\tself zrusVybraneMimo: nf]." +
	"\n\t(nf skodlOrg notNil and: [nf plodina notNil]) ifTrue: [ | pl so |" +
	"\n\t\t\"fotka SO, musim doplnit nadrazenou plodinu\"" +
	"\n\t\tpl := Fytoportal db loadObject: nf plodina." +
	"\n\t\tnf nadrazenaPlodina: pl parent." +
	"\n\t\t\"doplnim vazbu na plodinu, pokud dosud neexistuje\"" +
	"\n\t\tso := Fytoportal db loadObject: nf skodlOrg." +
	"\n\t\t((so plodiny includes: nf plodina) or: [so nadrazenePlodiny includes: nf plodina]) ifFalse: [" +
	"\n\t\t\tso plodiny: (so plodiny copyWith: nf plodina)." +
	"\n\t\t\tFytoportal db storeObject: so." +
	"\n\t\t\tself broadcastEvent: #zmenaHostiteluSO: with: so]." +
	"\n\t]." +
	"\n\tself image ifNotNilDo: [:img |" +
	"\n\t\tnf format: img naturalWidth / img naturalHeight." +
	"\n\t\tFytoportal db storeObject: nf." +
	"\n\t\t\"ulozim prilohy\"" +
	"\n\t\tself attachFoto: 'preview' size: 200 @ 150 to: nf id thenDo: [" +
	"\n\t\t\tself attachFoto: 'optimal' size: 880 @ 660 to: nf id thenDo: [" +
	"\n\t\t\t\tself attachFoto: 'original' size: 1440 @ 1080 to: nf id thenDo: [" +
	"\n\t\t\t\t\tExtMessageBox hide." +
	"\n\t\t\t\t\tself broadcastEvent: #'fotkaZmenena:' with: nf]]]" +
	"\n\t] ifNil: [" +
	"\n\t\tFytoportal db storeObject: nf." +
	"\n\t\tExtMessageBox hide." +
	"\n\t\tself broadcastEvent: #'fotkaZmenena:' with: nf]." +
	"\n\t\"doplnim chybejiciho autora\"" +
	"\n\t(auth := editor form findField: #autor) store detect: [:rec |" +
	"\n\t\t(rec data at: #key) = nf autor] ifNone: [auth store reload]",
	null, "2013-12-02T09:34:53Z", "mp", 1);

jst.FYFotoEditor.addMethod("ulozFotku", "", "private", 
	"\t| nf auth |" +
	"\n\tExtMessageBox new" +
	"\n\t\tclosable: true; \"kdyby se ulozeni nepodarilo, aby slo dialog zavrit\"" +
	"\n\t\ticon: 'mbox-loading';" +
	"\n\t\ttext: 'Ukládám změny, čekejte...';" +
	"\n\t\tshow." +
	"\n\tnf := novaFotka" +
	"\n\t\tifTrue: [FYFotografie new]" +
	"\n\t\tifFalse: [(Fytoportal db loadObject: fotka id) resetDefault]." +
	"\n\tnf values: self form values." +
	"\n\tnf isDefault ifTrue: [" +
	"\n\t\t\"zmena vychozi fotky\"" +
	"\n\t\tself zrusVybraneMimo: nf]." +
	"\n\t(nf skodlOrg notNil and: [nf plodina notNil]) ifTrue: [ | so |" +
	"\n\t\t\"doplnim vazbu na plodinu, pokud dosud neexistuje\"" +
	"\n\t\tso := Fytoportal db loadObject: nf skodlOrg." +
	"\n\t\t(so plodiny includes: nf plodina) ifFalse: [" +
	"\n\t\t\tso plodiny: (so plodiny copyWith: nf plodina)." +
	"\n\t\t\tFytoportal db storeObject: so." +
	"\n\t\t\tself broadcastEvent: #zmenaHostiteluSO: with: so]." +
	"\n\t]." +
	"\n\tself image ifNotNilDo: [:img |" +
	"\n\t\tnf format: img naturalWidth / img naturalHeight." +
	"\n\t\tFytoportal db storeObject: nf." +
	"\n\t\t\"ulozim prilohy\"" +
	"\n\t\tself attachFoto: 'preview' size: 200 @ 150 to: nf id thenDo: [" +
	"\n\t\t\tself attachFoto: 'optimal' size: 880 @ 660 to: nf id thenDo: [" +
	"\n\t\t\t\tself attachFoto: 'original' size: 1440 @ 1080 to: nf id thenDo: [" +
	"\n\t\t\t\t\tExtMessageBox hide." +
	"\n\t\t\t\t\tself broadcastEvent: #'fotkaZmenena:' with: nf]]]" +
	"\n\t] ifNil: [" +
	"\n\t\tFytoportal db storeObject: nf." +
	"\n\t\tExtMessageBox hide." +
	"\n\t\tself broadcastEvent: #'fotkaZmenena:' with: nf]." +
	"\n\t\"doplnim chybejiciho autora\"" +
	"\n\t(auth := editor form findField: #autor) store detect: [:rec |" +
	"\n\t\t(rec data at: #key) = nf autor] ifNone: [auth store reload]",
	null, "2014-01-30T11:04:52Z", "mp"); //fytoportal-foto-edit

jst.FYFotoEditor.addMethod("attachFoto:size:to:thenDo:", "name rectSize doc aBlock", "private", 
	"\t| canv dstRect |" +
	"\n\tdstRect := self image extent scaleToFit: (Rectangle extent: rectSize) center: false." +
	"\n\tcanv := HTMLCanvasElement new " +
	"\n\t\tbeJPEG;" +
	"\n\t\twidth: dstRect width; " +
	"\n\t\theight: dstRect height." +
	"\n\tupload files first asImageDo: [:img |" +
	"\n\t\tcanv context2D drawImage: img." +
	"\n\t\tcanv asBlobDo: [:bl | " +
	"\n\t\t\t(Fytoportal db docNamed: doc)" +
	"\n\t\t\t\tattachData: bl name: name type: bl type." +
	"\n\t\t\taBlock value]]",
	null, "2013-06-28T07:13:20Z", "mp", 1);

jst.FYFotoEditor.addMethod("attachFoto:size:to:thenDo:", "name rectSize doc aBlock", "private", 
	"\t| canv dstRect |" +
	"\n\tdstRect := self image extent scaleToFit: (Rectangle extent: rectSize) center: false." +
	"\n\tcanv := HTMLCanvasElement new " +
	"\n\t\tbeJPEGWithQuality: 0.85;" +
	"\n\t\twidth: dstRect width; " +
	"\n\t\theight: dstRect height." +
	"\n\tupload files first asImageDo: [:img |" +
	"\n\t\tcanv context2D drawImage: img." +
	"\n\t\tcanv asBlobDo: [:bl | " +
	"\n\t\t\t(Fytoportal db docNamed: doc)" +
	"\n\t\t\t\tattachData: bl name: name type: bl type." +
	"\n\t\t\taBlock value]]",
	null, "2013-11-29T08:52:38Z", "mp"); //fytoportal-foto-edit

jst.FYFotoEditor.addMethod("zrusVybraneMimo:", "f", "private", 
	"\t| vybrane |" +
	"\n\t\"zruseni priznaku #default u stavajici vybrane fotky\"" +
	"\n\tvybrane := (fieldSO isEnabled " +
	"\n\t\tifTrue: [Fytoportal data fotky vybraneFotkySkodlOrg urlParams: {#key. f skodlOrg}; queryData] " +
	"\n\t\tifFalse: [Fytoportal data fotky vybraneFotkyPlodiny urlParams: {#key. f plodina}; queryData])" +
	"\n\t\t\tcollect: [:dict | dict at: #foto]." +
	"\n\tvybrane do: [:jina | " +
	"\n\t\t(jina isDefault and: [f id ~= jina id]) ifTrue: [ | vyb |" +
	"\n\t\t\t\"jina fotka je vybrana\"" +
	"\n\t\t\tvyb := Fytoportal db loadObject: jina id." +
	"\n\t\t\tFytoportal db storeObject: vyb resetDefault]]",
	null, "2013-07-03T21:10:39Z", "mp", 1);

jst.FYFotoEditor.addMethod("zrusVybraneMimo:", "f", "private", 
	"\t| vybrane |" +
	"\n\t\"zruseni priznaku #default u stavajici vybrane fotky\"" +
	"\n\tvybrane := (f skodlOrg isEmptyOrNil" +
	"\n\t\tifTrue: [Fytoportal data fotky vybraneFotkyPlodiny urlParams: {#key. f plodina}; queryData] " +
	"\n\t\tifFalse: [Fytoportal data fotky vybraneFotkySkodlOrg urlParams: {#key. f skodlOrg}; queryData])" +
	"\n\t\t\tcollect: [:dict | dict at: #foto]." +
	"\n\tvybrane do: [:jina | " +
	"\n\t\t(jina isDefault and: [f id ~= jina id]) ifTrue: [ | vyb |" +
	"\n\t\t\t\"jina fotka je vybrana\"" +
	"\n\t\t\tvyb := Fytoportal db loadObject: jina id." +
	"\n\t\t\tFytoportal db storeObject: vyb resetDefault]]",
	null, "2014-01-23T14:34:50Z", "mp"); //fytoportal-foto-edit

jst.FYFotoEditor.addMethod("novyTaxon:", "tax", "updating", 
	"\t| pl so fieldPlod |" +
	"\n\tso := cboxSO value." +
	"\n\ttax jePlodina ifTrue: [" +
	"\n\t\tfieldPlod := editor form findField: #plodina." +
	"\n\t\tpl := fieldPlod value." +
	"\n\t\tfieldPlod store reload." +
	"\n\t\tfieldPlod value: pl" +
	"\n\t] ifFalse: [" +
	"\n\t\tcboxSO store reload]." +
	"\n\tcboxSO value: so",
	null, "2013-09-17T21:12:18Z", "mp", 1);

jst.FYFotoEditor.addMethod("novyTaxon:", "tax", "updating", 
	"\t| v fld |" +
	"\n\tfld := editor form findField: (tax jePlodina ifTrue: #plodina ifFalse: #skodlOrg)." +
	"\n\tv := fld value." +
	"\n\tfld store reload." +
	"\n\tfld value: v",
	null, "2013-11-29T11:12:28Z", "mp"); //fytoportal-foto-edit

jst.FYFotoEditor.addMethod("zmenaPopisuTaxonu:", "tax", "updating", 
	"\t\"pro jednoduchost je reakce stejná\"" +
	"\n\tself novyTaxon: tax",
	null, "2013-12-03T08:00:00Z", "mp");

// *** FYTaxonZarazeni ***

jst.FYTaxonZarazeni.addMethod("initialize", "", "initialization", 
	"\tsuper initialize" +
	"\n\t\ttypeAhead: true;" +
	"\n\t\ttriggerAction: #all;" +
	"\n\t\tselectOnFocus: true;" +
	"\n\t\tmode: 'local';" +
	"\n\t\tstore: (ExtJsonStore new" +
	"\n\t\t\trestful: true;" +
	"\n\t\t\tautoLoad: true;" +
	"\n\t\t\tautoDestroy: true;" +
	"\n\t\t\troot: 'rows';" +
	"\n\t\t\tfields: {'key'. 'value'});" +
	"\n\t\tdisplayField: 'key';" +
	"\n\t\tvalueField: 'key';" +
	"\n\t\twidth: 220",
	null, "2013-10-23T11:25:02Z", "mp");

jst.FYTaxonZarazeni.addMethod("skupina:", "aString", "accessing", 
	"\tself store url: (Fytoportal data taxony zarazeni: aString) url asString, '?group=true'." +
	"\n\tself" +
	"\n\t\tname: aString;" +
	"\n\t\thiddenName: aString",
	null, "2013-10-23T11:29:43Z", "mp");

jst.FYTaxonZarazeni.addMethod("skupina", "", "accessing", 
	"\t^ self name",
	null, "2013-10-23T11:29:56Z", "mp");

jst.FYTaxonZarazeni.addMethod("zmenaPopisuTaxonu:", "taxon", "updating", 
	"\t(taxon perform: self skupina) ifNotEmptyDo: [:skup |" +
	"\n\t\tself store detect: [:rec | (rec data at: #key) = skup ] ifNone: [" +
	"\n\t\t\tself store reload]]",
	null, "2013-10-23T12:00:30Z", "mp", 1);

jst.FYTaxonZarazeni.addMethod("zmenaPopisuTaxonu:", "taxon", "updating", 
	"\t| skup |" +
	"\n\t\"i pokud je skup prazdna, musim aktualizovat - nazev mohl zmizet ze seznamu\"" +
	"\n\tskup := taxon perform: self skupina." +
	"\n\tself store detect: [:rec | (rec data at: #key) = skup ] ifNone: [" +
	"\n\t\tself store reload]",
	null, "2013-10-24T15:19:50Z", "mp"); //fytoportal-foto-edit

jst.FYTaxonZarazeni.addMethod("novyTaxon:", "taxon", "updating", 
	"\tself zmenaPopisuTaxonu: taxon",
	null, "2013-10-23T11:29:10Z", "mp");
