public with sharing class Report1Controller {

    public SumOpportunity[] SumOpportunies { get; set; }
    public SumOpportunity2[] SumOpportunies2 { get; set; }
    
    public AgregOpportunity TotalOpportunies { get; set; }
    public List<PieWedgeData> graphPie { get; set; }
    
    public Report1Controller () {
        AggregateResult[] results = [select Owner.Profile.Name Profile, Owner.UserRole.Name Role, LeadSource, Type, sum(Amount) Montant , Count(Id) NB , sum(project_mse__Qtt__c) Nb_Lits from Opportunity 
where LeadSource != null and Type != null and OwnerId != Null group by Owner.Profile.Name, Owner.UserRole.Name, LeadSource, Type order by sum(Amount) desc];
        Double totMontant = 0.00;
        Integer totNB = 0;
        Double totNb_Lits = 0.00;
        String Profile = '';
        String Role = '';                
        Double sourceExternalReferral = 0.00;   
        Double sourcePartner = 0.00;
        Double sourceEmployeeReferral = 0.00;
        Double sourceOther = 0.00;
        
        SumOpportunies = new List<SumOpportunity>();
        for (AggregateResult ar : results) {
            SumOpportunies.add(new SumOpportunity(ar));
            totMontant += (Double) ar.get('Montant');
            totNB += (Integer) ar.get('NB');
            
            if (ar.get('Nb_Lits') != null) { totNb_Lits +=  (Double) ar.get('Nb_Lits');  }             
            Profile = (String) ar.get('Profile');
            Role = (String) ar.get('Role');
            
            if (ar.get('LeadSource') == 'External Referral') { sourceExternalReferral += (Double) ar.get('Montant'); }
            else if (ar.get('LeadSource') == 'Partner') { sourcePartner += (Double) ar.get('Montant'); }
            else if (ar.get('LeadSource') == 'Employee Referral') { sourceEmployeeReferral += (Double) ar.get('Montant'); }
            else  { sourceOther += (Double) ar.get('Montant'); }
        }  

        SumOpportunies2 = new List<SumOpportunity2>();        

        for(Integer i=0;i<258;i++) {
            SumOpportunies2.add( new SumOpportunity2 (new object[]{'External Referral 1' , 'Existing Customer - Upgrade' , 1 , 100 , 12 }));        
        }
        
       
        object[] objMavar = new object[]{Profile, Role, totMontant, totNB, totNb_Lits};
        TotalOpportunies = new AgregOpportunity(objMavar);  
        
        graphPie = new List<PieWedgeData>();
        graphPie.add(new PieWedgeData('External Referral', sourceExternalReferral));
        graphPie.add(new PieWedgeData('Partner', sourcePartner));
        graphPie.add(new PieWedgeData('Employee Referral', sourceEmployeeReferral));
        graphPie.add(new PieWedgeData('Other', sourceOther));
    }
    
    public class AgregOpportunity {
        public String Profile { get; private set; }
        public String Role { get; private set; }
        public Double totMontant { get; private set; }
        public Integer totNB { get; private set; }
        public Double totNb_Lits { get; private set; }      

        public  AgregOpportunity(object[] objMyvar ) {
            Profile = (String) objMyvar[0];
            Role = (String) objMyvar[1];
            totMontant = (Double) objMyvar[2];
            totNB = (Integer) objMyvar[3];
            totNb_Lits = (Double) objMyvar[4];            
        }
    }    
    
    public class SumOpportunity {
        public String LeadSource { get; private set; }
        public String Type { get; private set; }
        public Double Montant { get; private set; }
        public Integer NB { get; private set; }
        public Double Nb_Lits { get; private set; }

        public SumOpportunity(AggregateResult ar) {
            LeadSource = (String) ar.get('LeadSource');
            Type = (String) ar.get('Type');
            Montant = (Double) ar.get('Montant');
            NB = (Integer) ar.get('NB');
            Nb_Lits = (Double) ar.get('Nb_Lits');            
        }
    }
    public class SumOpportunity2 {
        public String LeadSource { get; private set; }
        public String Type { get; private set; }
        public Double Montant { get; private set; }
        public Integer NB { get; private set; }
        public Double Nb_Lits { get; private set; }

        public SumOpportunity2(object[] objMyvar) {
            LeadSource = (String) objMyvar[0];
            Type = (String) objMyvar[1];
            Montant = (Integer) objMyvar[2];
            NB = (Integer) objMyvar[3];
            Nb_Lits = (Integer) objMyvar[4];       
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
}