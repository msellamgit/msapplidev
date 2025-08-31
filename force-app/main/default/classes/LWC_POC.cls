/*
 * Class for lwc lwc_poc_main
 * @Author : Mikael SELLAM
 * @Date : April 11, 2022
 * @description : Class to create Lead from lwc_poc_main in community cloud site. 
 */
public class LWC_POC {
    @AuraEnabled
    public static retourCreate createLead(String leadtocreate) {
		//Id rtId = [select Id from RecordType where Name = 'POC' and IsActive=true and SobjectType='Lead' limit 1].Id;
        retourCreate r = new retourCreate();
        Map<String, Object> mapLeadtocreate = (Map<String, Object>)JSON.deserializeUntyped(leadtocreate);

        system.debug(leadtocreate);
        
        system.debug(mapLeadtocreate.get('NbFuelCardRequired'));        
        
        Lead l = new Lead( //RecordTypeId = rtId, 
            LeadSource = 'Web', 
            Salutation = (String) mapLeadtocreate.get('Salutation'),
            FirstName = (String) mapLeadtocreate.get('FirstName'), 
            LastName = (String) mapLeadtocreate.get('LastName'),
            Street = (String) mapLeadtocreate.get('Street'),
            City = (String) mapLeadtocreate.get('City'),
            PostalCode = (String) mapLeadtocreate.get('PostalCode'),
            Country = (String) mapLeadtocreate.get('Country'),
            Company = (String) mapLeadtocreate.get('Company'),
            VATNumber__c = (String) mapLeadtocreate.get('VATNumber'),
            TaxNumber__c = (String) mapLeadtocreate.get('TaxNumber'),
            BundelPreference__c = (String) mapLeadtocreate.get('BundelPreference'),
            AdditionalServices__c = (String) mapLeadtocreate.get('AdditionalServices'),
            LegalForm__c = (String) mapLeadtocreate.get('LegalForm'),
            NbFuelCardRequired__c = Decimal.valueOf((String) mapLeadtocreate.get('NbFuelCardRequired')),
            Estimatedfuelconsmonthlitre__c = Decimal.valueOf((String) mapLeadtocreate.get('Estimatedfuelconsmonthlitre'))
            // Estimatedfuelconsmonthlitre__c = (Decimal) mapLeadtocreate.get('Estimatedfuelconsmonthlitre')
        );
        try {
            insert l;
        } catch (Exception e) {
            r.code = '200';
    		r.message = 'KO';
        	r.obj = e.getMessage();
        	return r;
        } 
        callsandbox(l.Id);
        r.code = '100';
    	r.message = 'OK';
        r.obj = leadtocreate;
        return r;
    }
    
    public class retourCreate {
        @auraEnabled
        public String code { get; set; }
        @auraEnabled
        public String message { get; set; }
        @auraEnabled
        public Object obj { get; set; }
    }
    
    public static void sendMailtProspect() {
        //String primaryEmail = 'mikael.sellam@gmail.com';
        string emailTemplateName = 'Lead_email_new_from_website';
        Id primaryContact = '00Q24000004AMO5EAO';
        EmailTemplate et = [SELECT Id, HtmlValue FROM EmailTemplate WHERE DeveloperName =:emailTemplateName];
        string body = et.HtmlValue;

        system.debug(et);
        List<string> toAddress = new List<string>();
        //toAddress.add(primaryEmail);
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
            mail.setTemplateId(et.Id);
            //mail.setToAddresses(toAddress);
            mail.setSubject('Welcome to UTA');
            mail.setTargetObjectId(primaryContact);
            mail.setWhatId(primaryContact);
            mail.setSaveAsActivity(false);
            mail.setUseSignature(false);
         	//mail.setPlainTextBody(body);
        	mail.setHtmlBody(body);
        system.debug(mail);        
        List<Messaging.SingleEmailMessage> allmsg = new List<Messaging.SingleEmailMessage>();
        allmsg.add(mail);
        
        try {
            Messaging.sendEmail(allmsg,false);
            return;
        } catch (Exception e) {
            System.debug(e.getMessage());
        }
    } 
    
    @future(callout=true)
    public static void callsandbox(Id leadid) {
        String clientId = '3MVG9llQY5kM9T6fZVM0rmFLHqy7L3aVKM5tevnDzrasX8lNxEec8sgYJnbYm5sAisWZEmjTV6nYMUcirmWNX';
        String clientSecret = '0075081D16D73B084E3F7024E5DB6F6DA769DBC85DE277925E536A898C64054A';
        String username= 'experiencecloudpocuser2@uta.com';
        String password= 'Passpass0!yCcyfPhxmgblSjbihtW3IPw6p';
        String accesstoken;
        Map<String, String> mapResponseMessage = new Map<String, String>();
        
        String reqbody = 'grant_type=password&client_id='+clientId+'&client_secret='+clientSecret+'&username='+username+'&password='+password;
        
        Http httpauth = new Http();
        HttpRequest reqauth = new HttpRequest();
        reqauth.setBody(reqbody);
        reqauth.setMethod('GET');
        reqauth.setEndpoint('https://test.salesforce.com/services/oauth2/token');            
        if(!Test.isRunningTest()){ 
            HttpResponse resauth = httpauth.send(reqauth);	
            OAuth2 objAuthenticationInfo = (OAuth2)JSON.deserialize(resauth.getbody(), OAuth2.class);        
            accesstoken = objAuthenticationInfo.access_token;
        }        
        //String strData = '{"Salutation":"Mr.","FirstName":".","LastName":"Unknown","LegalForm":"AG","Street":"DDDDDDDDD","City":"DDDDDD","PostalCode":"DDDDDDDDD","Company":"DDDDDDD","Country":"Deutschland","VATNumber":"DDDDDDDDDD","TaxNumber":"DDDDDDDDDD","BundelPreference":"COMPACT","AdditionalServices":"Papierabrechnung ohne Einzelpostennachweis","NbFuelCardRequired":"11","Estimatedfuelconsmonthlitre":"1"}';
        string urllead = 'https://er-uta--uat.my.salesforce.com/services/data/v53.0/sobjects/Lead/';
        Http httpreq = new Http();    
        HttpRequest req = new HttpRequest();
        req.setEndpoint(urllead);
        req.setMethod('POST');
        req.setHeader('Authorization', 'Bearer ' + accesstoken);   

        Map<String, String> mapjs = new Map<String, String>();
        Lead ld = [select LeadSource, Salutation, FirstName, LastName, Street, City, PostalCode, Country, Company, VATNumber__c, TaxNumber__c, BundelPreference__c, AdditionalServices__c, LegalForm__c, NbFuelCardRequired__c, Estimatedfuelconsmonthlitre__c from Lead where Id = :leadid];
        mapjs.put('LeadSource', ld.LeadSource );
        mapjs.put('Salutation', ld.Salutation );
        mapjs.put('FirstName', ld.FirstName );
        mapjs.put('LastName', ld.LastName );
        mapjs.put('Street', ld.Street );
        mapjs.put('City', ld.City );
        mapjs.put('PostalCode', ld.PostalCode );
        mapjs.put('Country', 'Germany' );//ld.Country
        mapjs.put('CountryCode', 'DE' );//ld.Country        
        mapjs.put('Company', ld.Company );
        mapjs.put('VATNumber__c', 'DE123456789'); // ld.VATNumber__c 
        mapjs.put('TaxNumber__c', ld.TaxNumber__c);
        //BundlePreference__c pas de droits
        mapjs.put('BundlePreference__c', ld.BundelPreference__c == 'COMPACT' ? 'Compact' : (ld.BundelPreference__c == 'COMFORT' ? 'Comfort' : 'Premium' ) );
        //mapjs.put('AdditionalServices__c ', ld.AdditionalServices__c );
        mapjs.put('CompanyLegalForm__c', ld.LegalForm__c );
        //mapjs.put('NbFuelCardRequired__c', String.valueOf(ld.NbFuelCardRequired__c) );
        mapjs.put('EstimatedVolume__c', String.valueOf(ld.Estimatedfuelconsmonthlitre__c) );        
        string jsonS = JSON.serialize(mapjs);
        system.debug(jsonS);
        req.setBody(jsonS);         
        req.setHeader('Content-Type', 'application/json');
        req.setHeader('Accept', 'application/xml');
 
        if(!Test.isRunningTest()){ 
            HttpResponse responsereq = httpreq.send(req);
        	system.debug(responsereq);
	    }
		
    }
    
    public class OAuth2{
        public String id{get;set;}
        public String issued_at{get;set;}
        public String instance_url{get;set;}
        public String signature{get;set;}
        public String access_token{get;set;}
    }    
    
}