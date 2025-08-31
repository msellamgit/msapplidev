public with sharing class EngieDataNational {

    public list <SumOpportunity> SumOpportunies { get; set; }
	EngieDataNational edn;

    public EngieDataNational (String pVision, String pPerimetre) {
	system.debug('SumOpportunies pVision : ' + pVision);        
	system.debug('SumOpportunies pPerimetre : ' + pPerimetre);        
         //system.assertEquals(pVision, 'National');
        SumOpportunies = new List<SumOpportunity>();
        if ( pVision == null ) { pVision = 'National'; }
		if ( pVision == 'National' ) 
        {    
            SumOpportunies.add( new SumOpportunity (new object[]{'Est', null, 59 , 1711 , 3395 , 1711 , 383663 , 8 , 22 , 8 , 7207}));        
            SumOpportunies.add( new SumOpportunity (new object[]{'IDF', null , 100 , 2621 , 12561 , 2621 , 1430446 , 125 , 972 , 125 , 337530}));
            SumOpportunies.add( new SumOpportunity (new object[]{'Nord', null , 128 , 5237 , 13909 , 5237 , 816408 , 486 , 3526 , 486 , 240071}));
            SumOpportunies.add( new SumOpportunity (new object[]{'Ouest', null , 161 , 2258 , 8455 , 2258 , 857849 , 389 , 1325 , 389 , 173700}));
            SumOpportunies.add( new SumOpportunity (new object[]{'Rhône Alpes Auvergne', null , 112 , 2555 , 9846 , 2555 , 1530200 , 875 , 4007 , 875 , 777805}));
            SumOpportunies.add( new SumOpportunity (new object[]{'Sud', null , 69 , 1052 , 3542 , 1052 , 321117 , 334 , 595 , 334 , 89730}));
            SumOpportunies.add( new SumOpportunity (new object[]{'Sud Ouest', null , 74 , 3384 , 10116 , 3384 , 1626076 , 2213 , 7499 , 2213 , 1088993}));
        }
        else if (pVision == 'Regional' && pPerimetre == 'EST' ) 
        {	system.debug('PASSAGE CONDITION');        
            SumOpportunies.add( new SumOpportunity (new object[]{ 'Aurelie SERVAN' , '0052000000499hdAAA', 7 , 30, 1045 , 30 , 168500 , 4, 0 , 4 , 0}));
            SumOpportunies.add( new SumOpportunity (new object[]{ 'Cedric BOYON' , '0052000000499fEAAQ', 6 , 185, 445 , 185 , 32363 , 1, 7 , 1 , 1207}));
            SumOpportunies.add( new SumOpportunity (new object[]{ 'Patrice EHRET' , '0052000000499fkAAA', 7 , 188, 450 , 188 , 57700 , 2, 10 , 2 , 5000}));
            SumOpportunies.add( new SumOpportunity (new object[]{ 'Philippe CLEMENTZ' , '0052000000499fRAAQ', 10 , 160, 510 , 160 , 35000 , 0, 0 , 0 , 0}));
            SumOpportunies.add( new SumOpportunity (new object[]{ 'Raoul BOSSUETTE' , '0052000000499f7AAA', 18 , 611, 940 , 611 , 89600 , 1, 5 , 1 , 1000}));
        }
        else if (pVision == 'Regional' && pPerimetre == 'IDF' ) 
        {    
	    	SumOpportunies.add( new SumOpportunity (new object[]{ 'Arnaud ZYLA' , '0052000000499hwAAA', 16 , 127, 1010 , 127 , 108180 , 14, 100 , 14 , 11500}));
            SumOpportunies.add( new SumOpportunity (new object[]{ 'Fabien MEDIAMOLLE' , '00520000003m26KAAQ', 1 , 0, 3515 , 0 , 90000 , 0, 0 , 0 , 0}));
            SumOpportunies.add( new SumOpportunity (new object[]{ 'Florence Plas' , '0050J000006Tm2jQAC', 12 , 109, 510 , 109 , 63800 , 0, 0 , 0 , 0}));
            SumOpportunies.add( new SumOpportunity (new object[]{ 'Jacques GUENVER' , '0052000000499g9AAA', 15 , 324, 3630 , 324 , 729139 , 38, 430 , 38 , 200234}));
            SumOpportunies.add( new SumOpportunity (new object[]{ 'Natacha Riodin' , '0050J000006Tm2ZQAS', 12 , 198, 677 , 198 , 52630 , 19, 5 , 19 , 234}));
            SumOpportunies.add( new SumOpportunity (new object[]{ 'Philippe BORNE' , '0052000000499f6AAA', 11 , 111, 1379 , 111 , 271584 , 11, 300 , 11 , 75000}));
            SumOpportunies.add( new SumOpportunity (new object[]{ 'Thierry FRISCH' , '0052000000499fuAAA', 19 , 804, 1840 , 804 , 115113 , 0, 137 , 0 , 50562}));
        }
        else if (pVision == 'Regional' && pPerimetre == 'NORD' ) 
        {            
			SumOpportunies.add( new SumOpportunity (new object[]{ 'David ABRAHAM' , '0052000000499ejAAA', 13 , 616, 1080 , 616 , 105200 , 20, 194 , 20 , 17300}));
            SumOpportunies.add( new SumOpportunity (new object[]{ 'Didier GOBERT' , '0052000000499g6AAA', 12 , 124, 573 , 124 , 35120 , 7, 213 , 7 , 14184}));
            SumOpportunies.add( new SumOpportunity (new object[]{ 'Emilie HAUDRECHY' , '0050J00000718IYQAY', 19 , 130, 684 , 130 , 35883 , 8, 56 , 8 , 2676}));
            SumOpportunies.add( new SumOpportunity (new object[]{ 'Gregory PICQUE' , '0052000000499hCAAQ', 19 , 834, 3518 , 834 , 240350 , 312, 985 , 312 , 97450}));
            SumOpportunies.add( new SumOpportunity (new object[]{ 'Hervé GALLET' , '0052000000499fwAAA', 12 , 510, 1210 , 510 , 86200 , 113, 550 , 113 , 61500}));
            SumOpportunies.add( new SumOpportunity (new object[]{ 'Laurent VANHUYSSE' , '0052000000499hnAAA', 15 , 1381, 5720 , 1381 , 245200 , 3, 1320 , 3 , 35200}));
            SumOpportunies.add( new SumOpportunity (new object[]{ 'Séverine SOBOLEWSKI' , '0052000000499hfAAA', 20 , 219, 1289 , 219 , 80142 , 22, 238 , 22 , 16761}));
        }
        else if (pVision == 'Regional' && pPerimetre == 'Ouest' ) 
        {       
            SumOpportunies.add( new SumOpportunity (new object[]{ 'Christophe POMMIER' , '0052000000499hFAAQ', 7 , 50, 180 , 50 , 10000 , 0, 0 , 0 ,0 }));
            SumOpportunies.add( new SumOpportunity (new object[]{ 'Dominique CADU' , '0052000000499fHAAQ', 8 , 49, 195 , 49 , 18400 , 1, 0 , 1 ,0 }));
            SumOpportunies.add( new SumOpportunity (new object[]{ 'Etienne Ripoche' , '0052000000499hRAAQ', 17 , 101, 330 , 101 , 31715 , 0, 0 , 0 , 0}));
            SumOpportunies.add( new SumOpportunity (new object[]{ 'Hervé CRESPEL' , '00520000003m27cAAA', 54 , 574, 3920 , 574 , 411800 , 224, 650 , 224 , 90000}));
            SumOpportunies.add( new SumOpportunity (new object[]{ 'Karl TICHANNE' , '0052000000499hmAAA', 49 , 419, 2810 , 419 , 321800 , 161, 600 , 161 , 80000}));
            SumOpportunies.add( new SumOpportunity (new object[]{ 'Nathalie MESSAGER' , '0052000000499hbAAA', 8 , 459, 1020 , 459 , 64134 , 1, 75 , 1 , 3700}));
        }
        else if (pVision == 'Regional' && pPerimetre == 'Rhône Alpes Auvergne' ) 
        {                        
			SumOpportunies.add( new SumOpportunity (new object[]{ 'Emilio FERNANDEZ' , '0052000000499fmAAA', 23 , 1108, 3842 , 1108 , 558000 , 635, 2580 , 635 , 417850}));
            SumOpportunies.add( new SumOpportunity (new object[]{ 'Ludivine MELOTTO' , '0050J000006Tg03QAC', 8 , 113, 439 , 113 , 60200 , 8, 125 , 8 , 24155}));
            SumOpportunies.add( new SumOpportunity (new object[]{ 'Ouafaa BOULILA' , '00520000004m4OKAAY', 11 , 46, 309 , 46 , 19400 , 0, 49 , 0 , 3350}));
            SumOpportunies.add( new SumOpportunity (new object[]{ 'Patrick RABY' , '0052000000499hLAAQ', 9 , 71, 387 , 71 , 33100 , 13, 64 , 13 , 6850}));
            SumOpportunies.add( new SumOpportunity (new object[]{ 'Vincent CHARON' , '00520000003m257AAA', 25 , 367, 3080 , 367 , 544500 , 98, 667 , 98 , 137100}));
            SumOpportunies.add( new SumOpportunity (new object[]{ 'Yves GESSELLE' , '0052000000499g1AAA', 24 , 290, 1789 , 290 , 315000 , 121, 522 , 121 , 188500}));
        }
        else if (pVision == 'Regional' && pPerimetre == 'SUD' ) 
        {                        
                SumOpportunies.add( new SumOpportunity (new object[]{ 'Claude GIORDANENGO' , '0052000000499g4AAA', 9 , 82, 206 , 82 , 10571 , 11, 15 , 11 , 1000}));
                SumOpportunies.add( new SumOpportunity (new object[]{ 'Franck BARTOLOMEI' , '0052000000499evAAA', 32 , 758, 2485 , 758 , 275840 , 320, 580 , 320 , 88730}));
                SumOpportunies.add( new SumOpportunity (new object[]{ 'Richard HURAUX' , '0052000000499gJAAQ', 3 , 17, 50 , 17 , 1606 , 0, 0 , 0 , 0}));
                SumOpportunies.add( new SumOpportunity (new object[]{ 'Serge VOLTE' , '0052000000499htAAA', 14 , 108, 500 , 108 , 18650 , 0, 0 , 0 , 0}));
                SumOpportunies.add( new SumOpportunity (new object[]{ 'Sonia Duboc' , '00520000005LMokAAG', 10 , 55, 301 , 55 , 14450 , 3, 0 , 3 , 0}));
        }
        else if (pVision == 'Regional' && pPerimetre == 'SUD OUEST' ) 
        {                                            
        		SumOpportunies.add( new SumOpportunity (new object[]{ 'Bruno RODRIGUEZ' , '0052000000499hTAAQ', 9 , 278, 648 , 278 , 84509 , 155, 322 , 155 , 47320}));
                SumOpportunies.add( new SumOpportunity (new object[]{ 'Frederic POUVILLON' , '0052000000499hKAAQ', 11 , 249, 1230 , 249 , 131720 , 44, 200 , 44 , 16848}));
                SumOpportunies.add( new SumOpportunity (new object[]{ 'Jerome BERTONE' , '0052000000499eyAAA', 10 , 1081, 5410 , 1081 , 894640 , 1705, 6190 , 1705 , 889945}));
                SumOpportunies.add( new SumOpportunity (new object[]{ 'Séverine VILLATE' , '0052000000499hsAAA', 20 , 585, 2148 , 585 , 443307 , 270, 473 , 270 , 95380}));
                SumOpportunies.add( new SumOpportunity (new object[]{ 'Stéphane MUCCIN' , '0052000000499gwAAA', 6 , 67, 680 , 67 , 71900 , 39, 314 , 39 , 39500}));
        }
    }
    public EngieDataNational () {	
	    String pVision1 = 'National';
   		String pPerimetre1 = '';
        system.debug('pVision1 : ' + pVision1);
        edn = new EngieDataNational (pVision1, pPerimetre1);
        SumOpportunies = edn.SumOpportunies;
    }
        public class SumOpportunity {
        public String Region { get; private set; }
        public Id iduser { get; private set; }
        public Integer NbRASignees { get; private set; }
        public Integer NbOSRealisee { get; private set; }        
        public Integer ObjectifOS { get; private set; }
        public Integer Resultat { get; private set; }
        public Integer Objectifs { get; private set; }
        public Integer NbOSRealiseePrec { get; private set; }
        public Integer ObjectifOSPrec { get; private set; }
        public Integer ResultatMwhc { get; private set; }
        public Integer ObjectifsMwhc { get; private set; }

        public SumOpportunity(object[] objMyvar) {
            Region = (String) objMyvar[0];
            iduser = (Id)  objMyvar[1];
            NbRASignees = (Integer) objMyvar[2];
            NbOSRealisee = (Integer) objMyvar[3];
            ObjectifOS = (Integer) objMyvar[4];
            Resultat = (Integer) objMyvar[5];
            Objectifs = (Integer) objMyvar[6];
            NbOSRealiseePrec = (Integer) objMyvar[7];
            ObjectifOSPrec = (Integer) objMyvar[8];
            ResultatMwhc = (Integer) objMyvar[9];
            ObjectifsMwhc = (Integer) objMyvar[10];
        }
    }
}