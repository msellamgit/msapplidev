trigger accredAfterUpdateInsert on Accreditation__c (after update, after insert) {
    for(Accreditation__c accr: Trigger.new){       
          AP_Accreditation.updateContactAccreditation(accr);
    }            
}