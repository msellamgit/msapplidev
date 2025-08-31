trigger venteBeforeInsert on Vente__c (before insert) {
    System.debug('~~~~~~~~trigger venteBeforeInsert on Vente__c~~~~~~~~');    
    for(Vente__c sdr : Trigger.new){
        sdr.project_mse__Champs1_del__c = 'X';
      if(!String.isBlank(sdr.project_mse__LoginVendeur__c)){
        //, before update
        //mettre dans la condition le type de vente PàP
        //sdr.project_mse__Accreditation__c = AP_Contact.getAccreditationOfVente(sdr);
        AP_Vente vt = new AP_Vente();
        vt.getContactIdAddred(sdr.project_mse__LoginVendeur__c);
        System.debug('~~~~~~~~trigger venteBeforeInsert on Vente__c~~~AccreditationId~~~~~' + vt.AccreditationId);    
        System.debug('~~~~~~~~trigger venteBeforeInsert on Vente__c~~~VendeurId~~~~~' + vt.VendeurId);    

        sdr.project_mse__Accreditation__c = vt.AccreditationId;
        sdr.project_mse__Vendeur__c = vt.VendeurId;
      }
    }
}