/**
 * Class for ap AP_Accreditation.
 * @author     Mikael SELLAM
 * @description AP_Contact > getAccreditationOfVente : recupération 
 * @date 30/01/2019
 */
public class AP_Accreditation {

    public static void updateContactAccreditation(Accreditation__c accr){
        Contact ctc = [SELECT Id, project_mse__Accreditation__c FROM Contact WHERE Id =: accr.project_mse__Vendeur__c LIMIT 1];
        ctc.project_mse__Accreditation__c = AP_Contact.getAccreditationOfContact(ctc);
        Database.update(ctc);
    }
    
}