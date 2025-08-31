/**
 * Class for ap AP_contact.
 * @author     Mikael SELLAM
 * @description AP_Contact > getAccreditationOfVente : recupération 
 * @date 30/01/2019
 */

public class AP_Contact {
    public static Id getAccreditationOfVente(Vente__c sdrList){
        Id returnId = Null;
        System.debug('AP_Contact.getAccreditationOfVente~~~~> ' + sdrList);    
        Contact ctc = [SELECT Id FROM Contact WHERE Email =: sdrList.project_mse__LoginVendeur__c LIMIT 1];
        return getAccreditationOfContact(ctc);
    }
    public static Id getAccreditationOfContact(Contact ctcList){
        Id returnId = Null;
        System.debug('AP_Contact.getAccreditationOfContact~~~~> ' + ctcList);    
        Id ctcId = ctcList.Id;
        List<Accreditation__c> accrds = [SELECT Id, Name, project_mse__Statut__c, project_mse__Type__c FROM Accreditation__c WHERE project_mse__Vendeur__c =: ctcId and project_mse__Type__c =: '04 - Accréditation' order by project_mse__DateDeb__c ];
        
        for (Accreditation__c accrd: accrds) 
        {   
			returnId = accrd.Id;
            if (accrd.project_mse__Statut__c == 'Activé' ) {  return returnId ;}
        }
		return returnId;
    }    
}