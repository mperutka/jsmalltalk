/*
 * Copyright (c) 2012 Michal Perutka <michal.perutka@gmail.com>
 *
 * Depends on jst-core, jst-core-proxy, jst-parser, jst-kernel, jst-dom
 */

jst.currentJsFile = "jst-srs-ppp";

jst.Object.subclass("PPPEtiketa", "oid nazev", "", "", "SRS-PPP");

jst.Object.subclass("PPPRozhodnuti", "oid drzitel pripravek regCislo etikety", "", "", "SRS-PPP");

jst.Widget.subclass("PPPSeznamEtiket", "", "", "", "SRS-PPP");

// *** PPPEtiketa ***

jst.PPPEtiketa.addMethod("url", "", "accessing", 
	"\t^ 'http://eagri.cz/public/app/srs_pub/pp_public/rpg10a_util.download_ii?xid=', oid asString",
	null, "2012-11-26T08:58:46Z", "mp");

/*
jst.PPPEtiketa._class.addMethod("seznam", "", "accessing", 
	"\t\"PPPEtiketa seznam\"" +
	"\n\t^ JSON default decode: ((JSObjectProxy on: 'new XMLHttpRequest()' eval)" +
	"\n\t\tperform: #open with: 'GET' with: '/seaside-files/ppp/etikety.json' with: false;" +
	"\n\t\tperform: #send;" +
	"\n\t\tresponseText)",
	null, "2012-11-01T09:09:11Z", "mp");

jst.PPPEtiketa._class.addMethod("seznam", "", "accessing", 
	"\t\"PPPEtiketa seznam\"" +
	"\n\t^ JSON default decode: (XMLHttpRequest new get: 'etikety.json')",
	null, "2012-11-24T15:50:33Z", "mp");
*/

jst.PPPEtiketa.addMethod("nazev", "", "accessing", 
	"\t^ nazev ifNil: 'etiketa'",
	null, "2012-11-26T09:06:37Z", "mp");

// *** PPPRozhodnuti ***

jst.PPPRozhodnuti.addMethod("drzitel", "", "accessing", 
	"\t^ drzitel",
	null, "2012-10-10T12:34:56Z", "mp");

jst.PPPRozhodnuti.addMethod("pripravek", "", "accessing", 
	"\t^ pripravek",
	null, "2012-10-10T12:35:04Z", "mp");

jst.PPPRozhodnuti.addMethod("regCislo", "", "accessing", 
	"\t^ regCislo",
	null, "2012-11-23T09:51:50Z", "mp");

jst.PPPRozhodnuti.addMethod("url", "", "accessing", 
	"\t^ 'http://eagri.cz/public/app/eagriapp/POR/Detail.aspx?id=', oid asString",
	null, "2012-11-26T08:59:22Z", "mp");

jst.PPPRozhodnuti.addMethod("etikety", "", "accessing", 
	"\t^ etikety",
	null, "2012-11-26T09:05:30Z", "mp");

// *** PPPSeznamEtiket ***

jst.PPPSeznamEtiket._class.addMethod("deploy", "", "deploying", 
	"\t\"PPPSeznamEtiket deploy\"" +
	"\n\tUIManager default " +
	"\n\t\tinformUser: 'Deploying PPP...' " +
	"\n\t\tduring: [" +
	"\n\t\t\tAppDeployer new " +
	"\n\t\t\t\tpackages: {'SRS-PPP'}; " +
	"\n\t\t\t\tdeploy; " +
	"\n\t\t\t\topenWindow]",
	null, "2012-11-23T13:59:53Z", "mp");

jst.PPPSeznamEtiket.addMethod("data", "", "accessing", 
	"\t\"PPPSeznamEtiket new data\"" +
	"\n\t^ JSON default decode: (XMLHttpRequest new get: 'etikety.json'; responseText)",
	null, "2012-11-27T08:36:55Z", "mp");

/*
jst.PPPSeznamEtiket.addMethod("renderContentOn:", "html", "rendering", 
	"\t| i rowClass |" +
	"\n\ti := 0." +
	"\n\trowClass := #(even odd)." +
	"\n\thtml table id: #t1; class: 'jst-dt1 report grid-view etikety'; class: ''; with: [" +
	"\n\t\thtml tableHead: [html" +
	"\n\t\t\ttableHeading: 'Obchodní název přípravku';" +
	"\n\t\t\ttableHeading: 'Držitel rozhodnutí';" +
	"\n\t\t\ttableHeading: 'Regist. číslo';" +
	"\n\t\t\ttableHeading]." +
	"\n\t\thtml tableBody: [PPPEtiketa seznam do: [:ea |" +
	"\n\t\t\thtml tableRow class: (rowClass at: (i := i+1) \\\\ 2 + 1); with: [html" +
	"\n\t\t\t\ttableData: ea pripravek;" +
	"\n\t\t\t\ttableData: ea drzitel;" +
	"\n\t\t\t\ttableData: [html anchor href: ea rozhodnutiUrl; target: 'por_detail'; with: ea regCislo];" +
	"\n\t\t\t\ttableData: [html anchor href: ea etiketaUrl; with: 'etiketa']" +
	"\n\t\t\t]" +
	"\n\t\t]]" +
	"\n\t]." +
	"\n\tDynamicTable new colTypes: #(alpha alpha alpha none); rowsCount: 20; renderTo: #t1",
	null, "2012-11-23T14:59:04Z", "mp");

jst.PPPSeznamEtiket.addMethod("renderContentOn:", "html", "rendering", 
	"\t| i rowClass |" +
	"\n\ti := 0." +
	"\n\trowClass := #(even odd)." +
	"\n\thtml table id: #t1; class: 'jst-dt1 report grid-view etikety'; class: ''; with: [" +
	"\n\t\thtml tableHead: [html" +
	"\n\t\t\ttableHeading: 'Obchodní název přípravku';" +
	"\n\t\t\ttableHeading: 'Držitel rozhodnutí';" +
	"\n\t\t\ttableHeading: 'Regist. číslo';" +
	"\n\t\t\ttableHeading]." +
	"\n\t\thtml tableBody: [PPPEtiketa seznam do: [:ea |" +
	"\n\t\t\thtml tableRow: [html" +
	"\n\t\t\t\ttableData: ea pripravek;" +
	"\n\t\t\t\ttableData: ea drzitel;" +
	"\n\t\t\t\ttableData: [html anchor href: ea rozhodnutiUrl; target: 'por_detail'; with: ea regCislo];" +
	"\n\t\t\t\ttableData: [html anchor href: ea etiketaUrl; with: 'etiketa']" +
	"\n\t\t\t]" +
	"\n\t\t]]" +
	"\n\t]." +
	"\n\tDynamicTable new " +
	"\n\t\tcolTypes: #(alpha alpha alpha none); " +
	"\n\t\trowClass: #(odd even);" +
	"\n\t\trowsCount: 20; " +
	"\n\t\trenderTo: #t1",
	null, "2012-11-23T21:50:34Z", "mp");
*/

jst.PPPSeznamEtiket.addMethod("renderContentOn:", "html", "rendering", 
	"\t| i rowClass |" +
	"\n\ti := 0." +
	"\n\trowClass := #(even odd)." +
	"\n\thtml table id: #t1; class: 'jst-dt1 report grid-view etikety'; class: ''; with: [" +
	"\n\t\thtml tableHead: [html" +
	"\n\t\t\ttableHeading: 'Obchodní název přípravku';" +
	"\n\t\t\ttableHeading: 'Držitel rozhodnutí';" +
	"\n\t\t\ttableHeading: 'Regist. číslo';" +
	"\n\t\t\ttableHeading: 'Etikety ke stažení']." +
	"\n\t\thtml tableBody: [self data do: [:rozh |" +
	"\n\t\t\thtml tableRow: [html" +
	"\n\t\t\t\ttableData: rozh pripravek;" +
	"\n\t\t\t\ttableData: rozh drzitel;" +
	"\n\t\t\t\ttableData: [html anchor href: rozh url; target: 'por_detail'; with: rozh regCislo];" +
	"\n\t\t\t\ttableData: [rozh etikety do: [:etik |" +
	"\n\t\t\t\t\thtml anchor href: etik url; with: etik nazev] separatedBy: [html br]]" +
	"\n\t\t\t]" +
	"\n\t\t]]" +
	"\n\t]." +
	"\n\tDynamicTable new " +
	"\n\t\tcolTypes: #(alpha alpha alpha none); " +
	"\n\t\trowClass: #(odd even);" +
	"\n\t\trowsCount: 20; " +
	"\n\t\trenderTo: #t1",
	null, "2012-11-26T09:31:08Z", "mp");
