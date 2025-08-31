public without sharing class LWC_POC2_EmailValidator {
   
    //project_mse__EmailVerificationValidUntil__c = System.now().addDays(1);
    
    /*
    @auraEnabled
    public static void sendSingleMail(String leadId){
        EmailTemplate emailTemplate = [select Id, Subject, HtmlValue, Body FROM EmailTemplate WHERE developername = 'POC2_Email_Validation' LIMIT 1];
    
        Lead ld = [Select Id, LastName, project_mse__Pin__c FROM Lead WHERE Id=: leadId];
    
        String htmlBody = emailTemplate.HtmlValue;
        htmlBody = htmlBody.replace('{{{Recipient.LastName}}}', ld.LastName);
        htmlBody = htmlBody.replace('{{{Recipient.project_mse__Pin__c}}}', ld.project_mse__Pin__c);
        htmlBody = htmlBody.replace('{{{Recipient.Id}}}', ld.Id);
    
        Messaging.Singleemailmessage email = new Messaging.Singleemailmessage();
    
        email.setReplyTo('noreply@poc2.fk');
        email.setTargetObjectId(leadId);
        email.setSaveAsActivity(true);
        email.setUseSignature(false);
        email.setSubject('POC2 Email Verification');
        email.setHtmlBody(htmlBody);
    
        Messaging.sendEmail(new Messaging.SingleEmailmessage[] {email});
    }
    */
    
    @AuraEnabled
    public static String validatePin(String encryptedId, String passedPin){
        try {

            String decodedEncryptedId = decodeValue(encryptedId);
            String decodedPin = decodeValue(passedPin);

            //List<Individual> ind = [SELECT Email__c, VerificationSentAt__c,Validation_Pin__c FROM Individual where Encrypted_Id__c =:decodedEncryptedId AND Validation_Pin__c =: decodedPin];
            List<Lead> ld = [SELECT Email, project_mse__Pin__c FROM Lead where Id =:decodedEncryptedId AND project_mse__Pin__c =: decodedPin];
            if(ld.size()==0)
            {
                return 'no email found';
            }
            
            return  ld[0].Email;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static boolean approveOrRejectIndividualEmail(String encryptedId, String status){
        try {

            system.debug('im in approve or reject email val controller');
            String decodedEncryptedId = decodeValue(encryptedId);

            //List<Individual> ind = [SELECT Id, ValidUntil__c, Status__c, VerifiedAt__c, VerificationSentAt__c, (SELECT Id, isVerified__c FROM Leads), (SELECT Id, isVerified__c FROM Contacts),(SELECT Id,isVerified__c FROM Contact_Subscriptions__r) FROM Individual WHERE Encrypted_Id__c =: decodedEncryptedId AND Status__c !='Verified' AND Status__c!='Verification Failed'];
            List<Lead> ld = [SELECT Id, project_mse__EmailValidUntil__c, project_mse__EmailStatus__c, project_mse__EmailVerifiedAt__c FROM Lead 
                             WHERE Id =: decodedEncryptedId AND project_mse__EmailStatus__c !='Verified' 
                             AND project_mse__EmailStatus__c!='Verification Failed'];
            if(ld.size()==0)
                return false;

          //  EmailVerificationSettings__c customSettingsExpiration = [SELECT Months_to_Add__c from EmailVerificationSettings__c];
            //EmailVerificationSettings__c customSettingsExpiration = EmailVerificationSettings__c.getOrgDefaults();
           
            Boolean isVerified = decodeValue(status) == 'true' ? true : false;

            ld[0].project_mse__EmailStatus__c = isVerified == true ? 'Verified' : 'Verification Rejected';
            ld[0].project_mse__EmailVerifiedAt__c = System.now();
            //if(customSettingsExpiration!=null)
            ld[0].project_mse__EmailValidUntil__c = isVerified == true ? Date.Today().addMonths(24) : null;
            
            /*
            List<SObject> connectedObjectsForUpdate = new List<SObject>();
            
            for(Lead leadChild:  ind[0].Leads)
            {
                leadChild.IsVerified__c = isVerified;
                connectedObjectsForUpdate.add(leadChild);
            }
            for(Contact contactChild: ind[0].Contacts)
            {
                contactChild.IsVerified__c = isVerified;
                connectedObjectsForUpdate.add(contactChild);
            }
            for(Subscription__c subscriptionChild : ind[0].Contact_Subscriptions__r)
            {
                subscriptionChild.isVerified__c = isVerified;
                connectedObjectsForUpdate.add(subscriptionChild);
            }
            system.debug('im before update ind:');
            system.debug(ind[0]);
			*/
            update ld[0];
            //if(connectedObjectsForUpdate.size()>0) update connectedObjectsForUpdate;   
            return true;
        } catch (Exception e) {
            system.debug(e.getMessage());
            system.debug(e.getCause());
            system.debug(e.getStackTraceString());
            system.debug(e.getLineNumber());
            system.debug(e);
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static String checkExpirationDate(String encryptedId){
        try {
            String decodedEncryptedId = decodeValue(encryptedId);
            system.debug('decoded enc id: ');
            system.debug(decodedEncryptedId);
    
            //List<Individual> ind = [SELECT Id, ValidUntil__c, Email_Verification_Valid_Until__c, Status__c FROM Individual WHERE Encrypted_Id__c =: decodedEncryptedId];
            List<Lead> ld = [SELECT Id, project_mse__EmailValidUntil__c, project_mse__EmailVerificationValidUntil__c, 
                             project_mse__EmailStatus__c FROM Lead WHERE Id =: decodedEncryptedId];
    
            System.debug('found the invididual in check expiration date: ');
            system.debug(ld);
            if(ld.size()>0)
            {
                if(ld[0].project_mse__EmailStatus__c =='Verified' || 
                   ld[0].project_mse__EmailStatus__c =='Verification Failed' || 
                   ld[0].project_mse__EmailStatus__c =='Verification Rejected' || 
                   ld[0].project_mse__EmailVerificationValidUntil__c < System.now())
                //if(checkEmailExpirationConditions(ld[0]))
                {
                    String msgexpired = 'Your email verification link has expired. Please call UTA Edenred on +441737-907850 for re-verification.';
                    system.debug('returning the label: ');
                    system.debug(msgexpired);
                    return msgexpired;
                }
                system.debug('returning true');
                return 'True';
            }
            String msg_notfound = '404 NOT FOUND';
            system.debug('returning the label: ');
            system.debug(msg_notfound);
            return msg_notfound;
        } 
        catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    /*
    public static Boolean checkEmailExpirationConditions(Lead ld)
    {
        if(ld.project_mse__EmailStatus__c =='Verified' || ld.project_mse__EmailStatus__c =='Verification Failed' || ld.project_mse__EmailStatus__c =='Verification Rejected' || ld.project_mse__EmailVerificationValidUntil__c < System.now())
            return true;
        
            return false;
    }
	*/
    public static String decodeValue(String encrypted)
    {
        return EncodingUtil.base64Decode(encrypted).toString();
    }
}