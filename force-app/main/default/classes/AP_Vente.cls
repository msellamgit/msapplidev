/**
 * Class for ap AP_Vente.
 * @author     Mikael SELLAM
 * @description AP_Contact > getAccreditationOfVente : recupération 
 * @date 30/01/2019
 */

public class AP_Vente {
    Public Id AccreditationId {get; set;}
    Public Id VendeurId {get; set;}
    
    public void getContactIdAddred(String loginVendeur){
        Id returnId = Null;
        System.debug('AP_Vente.getContactIdAddred~~~~> ' + loginVendeur);    
        Contact[] ctc = [SELECT Id, project_mse__Accreditation__c FROM Contact WHERE Email =: loginVendeur LIMIT 1];  
        if (ctc.size() > 0 )
        {
        	VendeurId = ctc[0].Id;        
        	AccreditationId = ctc[0].project_mse__Accreditation__c  ;
    	}
    }
}