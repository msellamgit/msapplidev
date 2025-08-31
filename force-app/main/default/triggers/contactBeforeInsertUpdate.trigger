trigger contactBeforeInsertUpdate on Contact (before insert, before update) {
    for(Contact ctc : Trigger.new){
        ctc.project_mse__Accreditation__c = AP_Contact.getAccreditationOfContact(ctc);
    }
}