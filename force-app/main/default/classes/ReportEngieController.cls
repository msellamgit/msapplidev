public with sharing class ReportEngieController {

    String pVision = ApexPages.currentPage().getParameters().get('Vision');
    String pPerimetre = ApexPages.currentPage().getParameters().get('Perimetre');
	public String renderingService { get; private set; }
    public String UserProfileName { get; private set; }
    public String UserRoleName { get; private set; }

    public SumOpportunity[] SumOpportunies { get; set; }
    private EngieDataNational edn { get; set; }
    public AgregOpportunity TotalOpportunies { get; set; }
    public List<PieWedgeData> graphPie { get; set; }
    
    public ReportEngieController () {
        List<Profile> PR = [SELECT Id, Name FROM Profile WHERE Id=:userinfo.getProfileId() LIMIT 1];
        UserProfileName = PR[0].Name;
        List<UserRole> RO = [SELECT Id, Name FROM UserRole WHERE Id=:userinfo.getUserRoleId() LIMIT 1];
        UserRoleName = RO[0].Name;
        
		//system.debug('PASSAGE ReportEngieController');
		system.debug('pVision = ' + pVision);
        system.debug('pPerimetre = ' + pPerimetre);    
        edn = new EngieDataNational(pVision, pPerimetre);
		integer i = 0;
		Integer totNbRASignees = 0;
    	Integer totNbOSRealisee = 0;
    	Integer totObjectifOS = 0;
    	Integer totNbOSRealiseePrec = 0;
    	Integer totObjectifOSPrec = 0;

        SumOpportunies = new List<SumOpportunity>();
    	graphPie = new List<PieWedgeData>();
        
        while (i < edn.SumOpportunies.size()) {
            object[] objaff = new object[]{ edn.SumOpportunies[i].Region,
                edn.SumOpportunies[i].NbRASignees, edn.SumOpportunies[i].NbOSRealisee,
                edn.SumOpportunies[i].ObjectifOS, edn.SumOpportunies[i].Resultat,
                edn.SumOpportunies[i].Objectifs, edn.SumOpportunies[i].NbOSRealiseePrec,
                edn.SumOpportunies[i].ObjectifOSPrec, edn.SumOpportunies[i].ResultatMwhc,
                edn.SumOpportunies[i].ObjectifsMwhc };
                graphPie.add(new PieWedgeData(edn.SumOpportunies[i].Region, edn.SumOpportunies[i].NbOSRealisee));
	            SumOpportunies.add( new SumOpportunity(objaff) ) ; 
                totNbRASignees += edn.SumOpportunies[i].NbRASignees;
                totNbOSRealisee += edn.SumOpportunies[i].NbOSRealisee;
                totObjectifOS += edn.SumOpportunies[i].ObjectifOS;
                totNbOSRealiseePrec += edn.SumOpportunies[i].NbOSRealiseePrec;
                totObjectifOSPrec += edn.SumOpportunies[i].ObjectifOSPrec;
    	        i += 1;
        }
        object[] objMavar = new object[]{totNbRASignees , totNbOSRealisee , totObjectifOS , 0 , 0 , totNbOSRealiseePrec , totObjectifOSPrec , 0 , 0 };
        TotalOpportunies = new AgregOpportunity(objMavar);  
    }
    
    public class AgregOpportunity {
        public Integer NbRASignees { get; private set; }
        public Integer NbOSRealisee { get; private set; }        
        public Integer ObjectifOS { get; private set; }
        public Integer Resultat { get; private set; }
        public Integer Objectifs { get; private set; }
        public Integer NbOSRealiseePrec { get; private set; }
        public Integer ObjectifOSPrec { get; private set; }
        public Integer ResultatMwhc { get; private set; }
        public Integer ObjectifsMwhc { get; private set; }

        public  AgregOpportunity(object[] objMyvar ) {
            NbRASignees = (Integer) objMyvar[0];
            NbOSRealisee = (Integer) objMyvar[1];
            ObjectifOS = (Integer) objMyvar[2];
            Resultat = (Integer) objMyvar[3];
            Objectifs = (Integer) objMyvar[4];
            NbOSRealiseePrec = (Integer) objMyvar[5];
            ObjectifOSPrec = (Integer) objMyvar[6];
            ResultatMwhc = (Integer) objMyvar[7];
            ObjectifsMwhc = (Integer) objMyvar[8];
        }
    }    
    
    public class SumOpportunity {
        public String Region { get; private set; }
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
            NbRASignees = (Integer) objMyvar[1];
            NbOSRealisee = (Integer) objMyvar[2];
            ObjectifOS = (Integer) objMyvar[3];
            Resultat = (Integer) objMyvar[4];
            Objectifs = (Integer) objMyvar[5];
            NbOSRealiseePrec = (Integer) objMyvar[6];
            ObjectifOSPrec = (Integer) objMyvar[7];
            ResultatMwhc = (Integer) objMyvar[8];
            ObjectifsMwhc = (Integer) objMyvar[9];
        }
    }
    
    public class PieWedgeData {
        public String name { get; set; }
        public Double data { get; set; }
        public PieWedgeData(String name, Double data) {
            this.name = name;
            this.data = data;
        }
    }
    public PageReference saveToPdf() {
		renderingService = 'PDF';

        string fileName = 'Portefeuille_'+ datetime.now().format('YYYYMMDD_hhmmss') +'.pdf';
        Apexpages.currentPage().getHeaders().put('content-disposition', 'attachemnt; filename='+fileName);       
        return null;
    }
    
}