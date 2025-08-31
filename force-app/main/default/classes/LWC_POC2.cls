/*
 * Class for lwc lwc_poc_main
 * @Author : Mikael SELLAM
 * @Date : May 23, 2022
 * @description : Class functions
 * 					1/ save lead
 * 					2/ consume web service CAM.
 * 					3/ consume web service firmenwissen.
 */
public without sharing class LWC_POC2 {

    // ** BEGIN - WEB SERVICE Firmenwissen ** //
    @AuraEnabled
    public static resultsearchFirm searchAccountFirm(String s_name, String s_zipcode) {
        //LWC_POC2.resultsearchFirm r = LWC_POC2.searchAccountFirm('ADIDAS', '910');
        resultsearchFirm rep = new resultsearchFirm();
        //s_name = s_name.replace(' ', '%20');
        rep = callapifirm(s_name, s_zipcode);
        //https://www.firmenwissen.de/search/suggest/companywithaddress/Adidas%209105*?country=DE
        //Authorization = Basic QUZXLVVUQTpzWjUjbkQhQmFQMkU5c2ZfcjM=
        system.debug(rep);
        return rep;
    }

    public static resultsearchFirm callapifirm(String s_name, String s_zipcode) {
        resultsearchFirm ret = new resultsearchFirm();
        Map < String, String > mapResponseMessage = new Map < String, String > ();
        String s_search = '';
        //s_search = EncodingUtil.urlEncode(s_name + '%20' + s_zipcode, 'UTF-8').replaceAll('\\+','%20');
        s_search = EncodingUtil.urlEncode(s_name, 'UTF-8').replaceAll('\\+', '%20') + '%20' + s_zipcode;
        //s_search = EncodingUtil.base64Encode(s_name + '%20' + s_zipcode);
        string urlfirm = 'https://www.firmenwissen.de/search/suggest/companywithaddress/';
        urlfirm = urlfirm + s_search + '*?country=DE';
        system.debug(urlfirm);
        Http httpreq = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint(urlfirm);
        req.setMethod('GET');
        req.setHeader('Content-Type', 'application/json');
        req.setHeader('Accept', '*/*');
        req.setHeader('Connection', 'keep-alive');
        req.setTimeout(120000);
        req.setHeader('Authorization', 'Basic QUZXLVVUQTpzWjUjbkQhQmFQMkU5c2ZfcjM=');

        List < firme > lstaccounts = new List < firme > ();
        integer i = 0;
        if (!Test.isRunningTest()) {
            HttpResponse responsereq = httpreq.send(req);
            system.debug(responsereq);
            ret.code = string.valueOf(responsereq.getStatusCode());
            ret.message = responsereq.getStatus();
            if (responsereq.getStatusCode() == 200) {

                Map < String, Object > resultbody = (Map < String, Object > ) JSON.deserializeUntyped(responsereq.getBody());
                list < Object > results = (list < Object > ) resultbody.get('companyNameSuggestions');
                for (Object res: results) {
                    Map < String, Object > f = (Map < String, Object > )((Map < String, Object > ) res);
                    firme acc = new firme();
                    acc.crefo = (string) f.get('crefonummer');
                    acc.ident = (string) f.get('identnummer');
                    acc.name = (string) f.get('name');
                    acc.namecommercial = (string) f.get('handelsName');
                    acc.country = (string) f.get('land');
                    acc.state = (string) f.get('Bayern');
                    acc.address = (string) f.get('strasseHausnummer');
                    acc.zip = (string) f.get('plz');
                    acc.city = (string) f.get('ort');
                    lstaccounts.add(acc);
                }
                ret.firmes = lstaccounts;
            }
        }
        return ret;
    }

    public class resultsearchFirm {
        @auraEnabled public String code { get; set; }
        @auraEnabled public String message { get; set; }
        @auraEnabled public List < firme > firmes  { get; set; }
    }

    public class firme {
        @auraEnabled public string crefo;
        @auraEnabled public string ident;
        @auraEnabled public string name;
        @auraEnabled public string namecommercial;
        @auraEnabled public string country;
        @auraEnabled public string state;
        @auraEnabled public string address;
        @auraEnabled public string zip;
        @auraEnabled public string city;
        /* "crefonummer": "8190465910", "identnummer": "08198190465910",
            "name": "Franconian International School e.V.", "handelsName": "FIS",
            "land": "DE", "bundesland": "Bayern", "plz": "91052",
            "ort": "Erlangen", "strasseHausnummer": "Marie-Curie-Str. 2" */
    }
    // ** END - WEB SERVICE Firmenwissen ** //

    // ** BEGIN - WEB SERVICE SEARCH CAM BY CREFO ** // 
    public static returnCam searchCAMByCrefo(String crefoid) {
        //String crefoId = '08198190021315';
        returnCam rcam = new returnCam();
        
    	String CAMPATH = '/search/standard';
        String cam_endpoint = 'https://cam.sbx.eu.uta.io/v3';
        String cam_method = 'POST';
        Integer cam_timeout = 20000;
    	String cam_clientid = 'f96042ace21442ab883f2755b2d03e5c';
    	String cam_clientsecret = '385032f80FaB413A9eff5FAaec1A1C98';
    	String cam_correlationid = 'f9c97130-de23-46b1-a0b6-9271e04c2201';
        
        String strRequestBody = '{ "identity": {  "identity_reference": "' + crefoId + '","identity_type": "VC2"} }';
        
        HttpRequest request = new HttpRequest();
        request.setMethod(cam_method);
        request.setEndpoint(cam_endpoint + CAMPATH);
        request.setTimeout((Integer) cam_timeout);
        request.setBody(strRequestBody);
        request.setHeader('x-client-id', cam_clientid);
        request.setHeader('x-client-secret', cam_clientsecret);
        request.setHeader('Content-Type', 'application/json');
        request.setHeader('Accept', 'application/json');
        request.setHeader('x-correlation-id', cam_correlationid);
        request.setHeader('search_hits', '10');
        
        HttpResponse response = new Http().send(request);
        //system.debug(response);
        //system.debug(response.getbody());
        try {
            CAMHttpResponseBody responsecam = new CAMHttpResponseBody();
            responsecam = (CAMHttpResponseBody) JSON.deserialize(response.getbody(), CAMHttpResponseBody.class);
            /*
            system.debug(responsecam.data.search_hits[0]);
            system.debug(responsecam.data.search_hits[1]);
            system.debug(responsecam.data.search_hits.size());
			*/
            rcam.code = '200';
            rcam.message = responsecam.meta.status;
            rcam.status = null;
            rcam.existcam = (responsecam.data.search_hits.size() > 0);
        } catch (Exception e) {
            rcam.code = '200';
            rcam.message = 'KO - ' + e.getMessage();
            rcam.status = null;
            rcam.existcam = false;
            return rcam;            
        }
        return rcam;
    } 
    
    public class returnCam {
        @auraEnabled public String code { get; set; }
        @auraEnabled public String message { get; set; }
        @auraEnabled public boolean existcam { get; set; }
        @auraEnabled public String status { get; set; }
    }
    public class CAMHttpResponseBody {
        public CAMMeta meta;
        public CAMResponseData data;
    }
    public class CAMMeta {
        public String status;
        public List < CAMMessages > messages;
    }
    public class CAMMessages {
        public String code;
        public String level;
        public String text;
    }
    public class CAMResponseData {
        public List<CAMSearchHits> search_hits;
    }
 	public class CAMSearchHits { 
        public CAMSearchHit search_hit;
    }    
    public class CAMSearchHit {
        public CAMAddress address;
        public List<CAMProviders> providers;
        public String cam_id;
        public String parent_cam_id;
        public String vat_id;
        public CAMHierarchy object_hierarchy;
    }
    public class CAMAddress {
        public String name_1;
        public String name_2;
        public String name_3;
        public String street;
        public String zip;
        public String country_code;
        public String city;
    }
    Public class CAMProviders {
        public CAMProvider provider;
    }   
    Public class CAMProvider {
        public String provider_id_code;
        public String provider_number;
    }     
    public class CAMHierarchy {
        public CAMUTAHierarchy uta_hierarchy;
    }
	public class CAMUTAHierarchy {
        public String role_code;
        public String archive;
        public String lead_number;
        public String invoice_partner_number;        
    }    
    // ** END - WEB SERVICE SEARCH CAM BY CREFO ** // 
     
    // ** BEGIN - CHECK VAT NUMBER ** // 
    @AuraEnabled
    public static resultVATcheck checkVATNumber(String vat) {
        resultVATcheck res = new resultVATcheck();
        returnCam retvat = checkAPIVATNumber(vat);
        system.debug(retvat);
        res.code = retvat.code;
        res.message = retvat.message;
        res.status = retvat.status;
        res.response = JSON.serialize(retvat);
        
        Log__c log = new Log__c(
            project_mse__Type__c             = 'WebService',
            project_mse__Request__c          = vat,
            project_mse__Response__c         = JSON.serialize(retvat),
            project_mse__WebserviceType__c   = 'REST',
            project_mse__StatusCode__c       = 'OK',
            project_mse__Flux__c             = 'Function LWC_POC2.checkVATNumber'
        );

        try { 
            Database.SaveResult srLOG = Database.insert(log); 
            } 
        catch(Exception e) { 
            System.debug('keepResponseLog~~WSTemp_RechercheContact~> ' + e.getMessage()); 
        }
        
        
        return res;
    }
    
    public static returnCam checkAPIVATNumber(String crefoid) {
        //https://sfdc.sbx.eu.uta.io/v1/vat-ids/DE132070459/actions/check
        returnCam rcam = new returnCam();
        
        String VATPATH = '/vat-ids/{0}/actions/check';
        String vat_endpoint = 'https://sfdc.sbx.eu.uta.io/v1';
        String vat_method = 'GET';
        Integer vat_timeout = 60000;
    	String vat_clientid = 'dab1d0b1faa34036b4b5ccb721ccfcd6';
    	String vat_clientsecret = 'fC260f1CB9C0484BbEe6034b113EcD2b';
    	String vat_correlationid = 'ef5218ad-b36d-49a9-8989-717f8b70a502';
        
        VATPATH = String.format(VATPATH, new List<String>{ crefoid } );

        HttpRequest request = new HttpRequest();
        request.setMethod(vat_method);
        request.setEndpoint(vat_endpoint + VATPATH);
        request.setTimeout((Integer) vat_timeout);
        request.setHeader('x-client-id', vat_clientid);
        request.setHeader('x-client-secret', vat_clientsecret);
        request.setHeader('Content-Type', 'application/json');
        request.setHeader('Accept', 'application/json');
        request.setHeader('x-correlation-id', vat_correlationid);
        
        system.debug(vat_endpoint + VATPATH);
        
        HttpResponse response = new Http().send(request);
        //system.debug(response);
        system.debug(response.getbody());
        try {
            VATHttpResponseBody responsevat = new VATHttpResponseBody();
            responsevat = (VATHttpResponseBody) JSON.deserialize(response.getbody(), VATHttpResponseBody.class);
            rcam.code = '100';
            rcam.message = String.valueof(responsevat.meta.messages);
            rcam.status = responsevat.meta.status;
        } catch (Exception e) {
            rcam.code = '200';
            rcam.message = 'KO - ' + e.getMessage();
            rcam.status = null;
            return rcam;            
        }
        return rcam;
    }      
    
    public class resultVATcheck {
        @auraEnabled public String code { get; set; }
        @auraEnabled public String message { get; set; }
        @auraEnabled public String status { get; set; }
        @auraEnabled public String response { get; set; }
    }
    
    public class VATHttpResponseBody {
        public VATMeta meta;
        public VATResponseData data;
    }
    public class VATMeta {
        public String status;
        public List < VATMessages > messages;
    }
    public class VATMessages {
        public String code;
        public String level;
        public String text;
        public String ref;
    }
    public class VATResponseData {
        public String country_code;
        public String vat_id;
        public Boolean valid;
    }    
    // ** END - CHECK VAT NUMBER ** // 
         
    // ** BEGIN - WEB SERVICE CAM ** // 
    @AuraEnabled
    public static resultsearchCam searchAccountCam(String s_name) {
        resultsearchCam returncam = callapicam(s_name);
        system.debug(returncam);
        return returncam;
    }

    //@future(callout=true)
    public static resultsearchCam callapicam(string s_name) {
        resultsearchCam ret = new resultsearchCam();
        Map < String, String > mapResponseMessage = new Map < String, String > ();

        string urlcam = 'https://cam.sbx.eu.uta.io/v3/search?first_item=1&last_item=10';
        Http httpreq = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint(urlcam);
        req.setMethod('POST');
        req.setHeader('Content-Type', 'application/json');
        req.setHeader('Accept', '*/*');
        req.setHeader('Connection', 'keep-alive');
        req.setTimeout(120000);
        req.setHeader('x-client-id', 'a999018267ff4ad8a0ec8383e5147a4c');
        req.setHeader('x-client-secret', '186997613e8F407f8e1d93009f90C3f5');
        req.setHeader('x-Correlation-Id', 'ANY-FM-A010687-220524-124334-717-251');

        infoadr ad = new infoadr();
        ad.name_1 = s_name;
        //ad.zip = '20000';
        ad.country_code = 'DEU';

        infoadrobj objadr = new infoadrobj();
        objadr.address = ad;
        //infopattern pat = new infopattern();
        //pat.search_pattern = objadr;

        //string jsonS = JSON.serialize(pat);
        string jsonS = JSON.serialize(objadr);
        req.setBody(jsonS);

        List < accountcam > lstaccounts = new List < accountcam > ();
        integer i = 0;
        if (!Test.isRunningTest()) {
            HttpResponse responsereq = httpreq.send(req);
            system.debug(responsereq);
            ret.code = string.valueOf(responsereq.getStatusCode());
            ret.message = responsereq.getStatus();
            if (responsereq.getStatusCode() == 200) {

                Map < String, Object > resultbody = (Map < String, Object > ) JSON.deserializeUntyped(responsereq.getBody());
                Map < String, Object > dataResults = (Map < String, Object > )(resultbody.get('data'));
                list < Object > results = (list < Object > ) dataResults.get('search_hits');
                for (Object res: results) {
                    accountcam acc = new accountcam();
                    i = i + 1;
                    Map < String, Object > mapsearchhits = (Map < String, Object > )((Map < String, Object > ) res).get('search_hit');
                    Map < String, Object > mapaddress = (Map < String, Object > )((Map < String, Object > ) mapsearchhits.get('address'));
                    //system.debug(mapaddress);
                    acc.id = string.valueOf(i);
                    acc.name = (string) mapaddress.get('name_1');
                    acc.address = (string) mapaddress.get('street');
                    acc.zip = (string) mapaddress.get('zip');
                    acc.city = (string) mapaddress.get('city');
                    //system.debug(acc);                       
                    lstaccounts.add(acc);
                }
                ret.accounts = lstaccounts;
            }
        }
        return ret;
    }

    /*public class infopattern {
         public infoadrobj search_pattern;
    }*/

    public class infoadr {
        public string name_1;
        //public string zip;
        public string country_code;
    }
    public class infoadrobj {
        public infoadr address;
    }
    public class resultsearchCam {
        @auraEnabled
        public String code {
            get;
            set;
        }
        @auraEnabled
        public String message {
            get;
            set;
        }
        @auraEnabled
        public List < accountcam > accounts {
            get;
            set;
        }
    }
    public class accountcam {
        @auraEnabled
        public string id;
        @auraEnabled
        public string name;
        @auraEnabled
        public string address;
        @auraEnabled
        public string zip;
        @auraEnabled
        public string city;
    }
    // ** END - WEB SERVICE CAM ** // 
        
    // ** BEGIN - SUBMIT LEAD ** //
    @AuraEnabled
    public static responsesub submitLead(String leadtocreate) {
        responsesub resp = new responsesub();
        resp.processcode = '100';
        resp.code = '100';
        Map < String, Object > mapLeadtocreate = (Map < String, Object > ) JSON.deserializeUntyped(leadtocreate);
        String value_Email = (String) mapLeadtocreate.get('Email');
        String value_Crefo = (String) mapLeadtocreate.get('Crefo');
        String value_leadid = (String) mapLeadtocreate.get('LeadId');
        String value_Company = (String) mapLeadtocreate.get('Company');
        
        system.debug('PASS 0');
        if (value_leadid != null && value_leadid != '') {
            system.debug('PASS 1');
            Lead ld = [Select Id, Company, Email from Lead where id =: value_leadid limit 1];
            if ( ld != null ) {
                system.debug('PASS 2');
                if (value_Company == ld.Company ) {
                    system.debug('PASS 3');
                    if (value_Email != ld.email ) {
                        system.debug('PASS 4');
                        OSTEdenredIdentity.returnEI checkidentity0 = OSTEdenredIdentity.checkEdenredIdentity(value_Email);
                        system.debug(checkidentity0);
                        if (checkidentity0.code != '200') {
                            resp.code = '301';
                            resp.message = checkidentity0.message;
                            return resp;
                        }
                        system.debug(checkidentity0.status);
                        if (checkidentity0.status == 'REGISTERED') {
                            resp.message = checkidentity0.message;
                            resp.processcode = '300';
                            resp.processmessage = checkidentity0.status;
                            return resp;
                        }
                        else {
                            system.debug('PASS 5');
                            updateLead(value_leadid, leadtocreate, null);
                            return resp;
                        }
                    }
                    else {
                        system.debug('PASS 6');
                        returnUpsert respUpsert = updateLead(value_leadid, leadtocreate, null);
                         resp.code = respUpsert.code;
                         resp.message = respUpsert.message;
                         resp.leadid = value_leadid;
                                Log__c log = new Log__c(
                                project_mse__Type__c             = 'OST>Update',
                                project_mse__Request__c          = JSON.serialize(leadtocreate),
                                project_mse__Response__c         = respUpsert.message,
                                project_mse__WebserviceType__c   = '',
                                project_mse__StatusCode__c       = 'OK',
                                project_mse__Flux__c             = 'Function LWC_POC2.submitLead'
                            );
                        return resp;
                    }
                }
            }
        }
        
        OSTEdenredIdentity.returnEI checkidentity = OSTEdenredIdentity.checkEdenredIdentity(value_Email);
        system.debug(checkidentity);
        if (checkidentity.code != '200') {
            resp.code = '301';
            resp.message = checkidentity.message;
            return resp;
        }
        system.debug(checkidentity.status);
        if (checkidentity.status == 'REGISTERED') {
            createLead(leadtocreate, 'Existing Email');
            resp.message = checkidentity.message;
            resp.processcode = '300';
            resp.processmessage = checkidentity.status;
            return resp;
        } else {
            system.debug('PASS CREFO');
            system.debug('PASS CREFO : ' + value_Crefo);
            if (value_Crefo != '' && value_Crefo != null) {
                system.debug('PASS CREFO 1');
                returnCam rcam = searchCAMByCrefo(value_Crefo);
                if (rcam.existcam) {
                    createLead(leadtocreate, 'Existing Customer');
                	system.debug('PASS CREFO 2');                    
                    resp.message = 'OK';
                    resp.processcode = '300';
                    resp.processmessage = 'SEARCH CAM BY CREFO - Duplicate CAM';    
                    return resp;
                } else {
                system.debug('PASS CREFO 3');                    
                    OSTDuplicate.searchDuplicateCAM(leadtocreate);
                }
            }
            else {
                system.debug('PASS CREFO 4');
                OSTDuplicate.returnDuplicate r = OSTDuplicate.searchDuplicateSF(leadtocreate);
        		resp.processcode = r.code;
        		resp.code = r.code;   
                resp.message = r.message;
                resp.leadid = r.id;
            }
        }
        system.debug(resp);
        return resp;
    }

    @auraEnabled
    public static responsesub submitconfirm(String leadid, boolean agreeterm, boolean mktcampaign, boolean mktnewsletter, boolean mktsurvey) {
        responsesub resp = new responsesub();
        resp.processcode = '100';
        resp.code = '100';
		Id indiv_id = createIndividual(leadid);
        List<Lead> ld = [select id, project_mse__EmailVerificationValidUntil__c from Lead where id =: leadid];
        if(ld.size()==0) {
        	resp.code = '200';
            resp.message = 'UNKNOWNED LEAD LEAD';
            return resp;
        }
        ld[0].project_mse__EmailVerificationValidUntil__c = System.now().addDays(1);
        update ld;
        generateConsents(leadid, agreeterm, mktcampaign, mktnewsletter, mktsurvey);
        //sendSingleMail(leadid);

        return resp;
    }
    
    public static Id createIndividual(Id leadid) {
        id indiv_id = null;
        Lead mylead = [Select Salutation, FirstName, LastName, Email, IndividualId
                from Lead where Id =: leadId];
        if ( myLead.IndividualId != null ) { return myLead.IndividualId; }
        
        try {
            Individual new_indiv = new Individual(  Salutation = mylead.Salutation, FirstName = mylead.FirstName,
                LastName = mylead.LastName, Email__c = mylead.Email);
            insert new_indiv ;
       	    indiv_id = new_indiv.Id;
            mylead.IndividualId = indiv_id;
			update mylead;
        } catch (Exception e) {
            system.debug('ERROR INDIVIDUAL CREATION');
            system.debug(e.getMessage());
        }
        return indiv_id;
     }
    
    public static void sendSingleMail(String leadId){
        List<OrgWideEmailAddress> lstEmailAddress=[select Id from OrgWideEmailAddress limit 1];

        EmailTemplate emailTemplate = [select Id, Subject, HtmlValue, Body FROM EmailTemplate WHERE developername = 'POC2_Email_Validation' LIMIT 1];
    
        Lead ld = [Select Id, LastName, project_mse__Pin__c FROM Lead WHERE Id=: leadId];
    
        String htmlBody = emailTemplate.HtmlValue;
        htmlBody = htmlBody.replace('{{{Recipient.LastName}}}', ld.LastName);
        htmlBody = htmlBody.replace('{{{Recipient.project_mse__Pin__c}}}', ld.project_mse__Pin__c);
        htmlBody = htmlBody.replace('{{{Recipient.Id}}}', ld.Id);
    
        Messaging.Singleemailmessage email = new Messaging.Singleemailmessage();
        email.setTemplateId(emailTemplate.Id);
        email.setReplyTo('noreply@poc2.fk');
        email.setTargetObjectId(leadId);
        email.setOrgWideEmailAddressId(lstEmailAddress[0].Id);
        //email.setWhatId(leadId);
        email.setSaveAsActivity(true);
        email.setUseSignature(false);
        email.setSubject('POC2 Email Verification');
        email.setHtmlBody(htmlBody);
    
        Messaging.sendEmail(new Messaging.SingleEmailmessage[] {email});
    }

    public class responsesub {
        @auraEnabled
        public String code { get; set; }
        @auraEnabled
        public String message { get; set; }
        @auraEnabled
        public String processcode { get; set; }
        @auraEnabled
        public String processmessage { get; set; }
        @auraEnabled
        public Object obj { get; set; }
        @auraEnabled
        public Id leadid { get; set; }
    }
    // ** END - SUBMIT LEAD ** //    

    // ** BEGIN - CREATE LEAD ** //
    @AuraEnabled
    public static returnUpsert createLead(String leadtocreate, string category) {
        system.debug('ENTREE CREATE LEAD');
        //Id rtId = [select Id from RecordType where Name = 'POC' and IsActive=true and SobjectType='Lead' limit 1].Id;
        returnUpsert r = new returnUpsert();
        Map < String, Object > mapLeadtocreate = (Map < String, Object > ) JSON.deserializeUntyped(leadtocreate);
        system.debug(leadtocreate);
        system.debug(mapLeadtocreate.get('NbFuelCardRequired'));

        Id value_Id = mapLeadtocreate.containsKey('LeadId') ? ( mapLeadtocreate.get('LeadId') == null || mapLeadtocreate.get('LeadId') == '' ? null : (Id) mapLeadtocreate.get('LeadId')) : null;
        String value_Salutation = (String) mapLeadtocreate.get('Salutation');
        String value_FirstName = (String) mapLeadtocreate.get('FirstName');
        String value_LastName = (String) mapLeadtocreate.get('LastName');
        String value_Street = (String) mapLeadtocreate.get('Street');
        String value_City = (String) mapLeadtocreate.get('City');
        String value_PostalCode = (String) mapLeadtocreate.get('PostalCode');
        String value_Phone = (String) mapLeadtocreate.get('Phone');
        String value_Email = (String) mapLeadtocreate.get('Email');
        String value_Country = (String) mapLeadtocreate.get('Country');
        String value_Company = (String) mapLeadtocreate.get('Company');
        String value_VATNumber = (String) mapLeadtocreate.get('VATNumber');
        String value_TaxNumber = (String) mapLeadtocreate.get('TaxNumber');
        String value_Bundle = (String) mapLeadtocreate.get('Bundle');
        String value_AdditionalServices = null; //(String) mapLeadtocreate.get('AdditionalServices');
        Decimal value_NbFuelCardRequired = null; //Decimal.valueOf((String) mapLeadtocreate.get('NbFuelCardRequired'));
        Decimal value_Estimatedfuelconsmonthlitre = null; //Decimal.valueOf((String) mapLeadtocreate.get('Estimatedfuelconsmonthlitre'));        
        try {
            Lead new_lead = new Lead( //RecordTypeId = rtId, 
                LeadSource = 'Web', Salutation = value_Salutation, FirstName = value_FirstName,
                LastName = value_LastName, Street = value_Street, City = value_City, PostalCode = value_PostalCode,
                Phone = value_Phone, Email = value_Email, Country = value_Country, Company = value_Company,
                VATNumber__c = value_VATNumber, TaxNumber__c = value_TaxNumber,
                AdditionalServices__c = value_AdditionalServices, NbFuelCardRequired__c = value_NbFuelCardRequired,
                Estimatedfuelconsmonthlitre__c = value_Estimatedfuelconsmonthlitre,
                BundleVariant__c= value_Bundle,
                category__c = category, Description = leadtocreate
            );
            insert new_lead;
            value_Id = new_lead.Id;
        } catch (Exception e) {
            r.code = '200';
            r.message = 'KO - ' + e.getMessage();
            r.obj = null;
            return r;
        }
        r.code = '100';
        r.message = 'OK';
        r.obj = leadtocreate;
        r.leadid = value_Id;
        return r;
    }

    public static returnUpsert updateLead(Id value_Id, String leadtocreate, string category) {
        system.debug('ENTREE UPDATE LEAD');        
        //Id rtId = [select Id from RecordType where Name = 'POC' and IsActive=true and SobjectType='Lead' limit 1].Id;
        returnUpsert r = new returnUpsert();
        Map < String, Object > mapLeadtocreate = (Map < String, Object > ) JSON.deserializeUntyped(leadtocreate);
        system.debug(leadtocreate);
        system.debug(mapLeadtocreate.get('NbFuelCardRequired'));

        //Id value_Id = mapLeadtocreate.containsKey('LeadId') ? (Id) mapLeadtocreate.get('LeadId') : null;
        String value_Salutation = (String) mapLeadtocreate.get('Salutation');
        String value_FirstName = (String) mapLeadtocreate.get('FirstName');
        String value_LastName = (String) mapLeadtocreate.get('LastName');
        String value_Street = (String) mapLeadtocreate.get('Street');
        String value_City = (String) mapLeadtocreate.get('City');
        String value_PostalCode = (String) mapLeadtocreate.get('PostalCode');
        String value_Phone = (String) mapLeadtocreate.get('Phone');
        String value_Email = (String) mapLeadtocreate.get('Email');
        String value_Country = (String) mapLeadtocreate.get('Country');
        String value_Company = (String) mapLeadtocreate.get('Company');
        String value_VATNumber = (String) mapLeadtocreate.get('VATNumber');
        String value_TaxNumber = (String) mapLeadtocreate.get('TaxNumber');
        String value_Bundle = (String) mapLeadtocreate.get('Bundle');

        String value_BundelPreference = null; //(String) mapLeadtocreate.get('BundelPreference');
        String value_AdditionalServices = null; //(String) mapLeadtocreate.get('AdditionalServices');
        Decimal value_NbFuelCardRequired = null; //Decimal.valueOf((String) mapLeadtocreate.get('NbFuelCardRequired'));
        Decimal value_Estimatedfuelconsmonthlitre = null; //Decimal.valueOf((String) mapLeadtocreate.get('Estimatedfuelconsmonthlitre'));        

        try {
            Lead update_lead = [Select LeadSource, Salutation, FirstName, LastName, Street,
                City, PostalCode, Country, Company, VATNumber__c, TaxNumber__c,
                BundelPreference__c, AdditionalServices__c,
                NbFuelCardRequired__c, Estimatedfuelconsmonthlitre__c, BundleVariant__c
                from Lead where Id =: value_Id
            ];
            update_lead.Salutation = value_Salutation;
            update_lead.FirstName = value_FirstName;
            update_lead.LastName = value_LastName;
            update_lead.Street = value_Street;
            update_lead.City = value_City;
            update_lead.PostalCode = value_PostalCode;
            update_lead.Country = value_Country;
            update_lead.Company = value_Company;
            update_lead.VATNumber__c = value_VATNumber;
            update_lead.TaxNumber__c = value_TaxNumber;
            update_lead.BundelPreference__c = value_BundelPreference;
            update_lead.AdditionalServices__c = value_AdditionalServices;
            update_lead.NbFuelCardRequired__c = value_NbFuelCardRequired;
            update_lead.Estimatedfuelconsmonthlitre__c = value_Estimatedfuelconsmonthlitre;
            update_lead.Category__c = category;
            update_lead.BundleVariant__c = value_Bundle;

            //List<User> userAdmin = [SELECT id, profileId, userRoleId FROM User WHERE Id = '00524000001O91C'];
            //System.runAs(userAdmin[0]) {
                update update_lead;
            //}

            
        } catch (Exception e) {
            r.code = '200';
            r.message = 'KO - ' + e.getMessage();
            r.obj = null;
            return r;
        }
        r.code = '100';
        r.message = 'OK';
        r.obj = leadtocreate;
        r.leadid = value_Id;
        return r;
    }
    
    @AuraEnabled
    public static returnUpsert updateLeadBank(id leadid, String bankname, String iban, String bic, String holder, datetime mandatebank) {
        returnUpsert r = new returnUpsert();
        r.code = '100';
        r.message = 'OK';
        r.leadid = leadId;
        try {
            Lead update_lead = [Select Id, BankName__c, Iban__c, bic__c, AccountHolderName__c, BankMandateConfirmed__c, BankMandateConfirmedDate__c from Lead where Id = : leadId ];
            update_lead.BankName__c = bankname;
            update_lead.Iban__c = iban;
            update_lead.bic__c = bic;
            update_lead.AccountHolderName__c = holder;
            update_lead.BankMandateConfirmed__c = true;
            update_lead.BankMandateConfirmedDate__c = mandatebank;
            update update_lead;
        } catch (Exception e) {
               //insertdebugentry('Ost', 'updateLeadBank', e.getMessage(), leadId);
               r.code = '200';
               r.message = 'KO - ' + e.getMessage();
               r.obj = null;
               return r;
        }
        return r;
    }

    @AuraEnabled
    public static returnUpsert updateLeadCompanyShortName(Id leadId, String companyShortName) {
        returnUpsert r = new returnUpsert();
        r.code = '100';
        r.message = 'OK';
        r.leadid = leadId;
        
        try {
            Lead update_lead = [Select Id, CompanyShortName__c from Lead where Id = : leadId ];
            update_lead.CompanyShortName__c = companyShortName;
            update update_lead;
        } catch (Exception e) {
               //insertdebugentry('Ost', 'updateLeadCompanyShortName', e.getMessage(), leadId);
               r.code = '200';
               r.message = 'KO - ' + e.getMessage();
               r.obj = null;
               return r;
        }
        return r;
    }
    
    @AuraEnabled
    public static responsesub submitBasket(string baskettosave) {
    	responsesub r = new responsesub();
        r.message = 'submitBasket';
        r.processcode = '100';
        r.code = '100';
        
		//string basketreceived =  '{"LeadId":"00Q0600000Y1feaEAB","Basket":[{"id":"x64ivh","lastname":"","firstname":"","registration":"BGY9","namecard":"BGY9","name":"BGY9","isdrivercard":false,"type":"Fahrzeugkarte","ispincode":false,"pincode":null,"clsdiv":"divx64ivh","clsbtnedit":"btneditx64ivh"},{"id":"l3twon","lastname":"MIKAEL","registration":"","firstname":"SELLAM","namecard":"SELLAM MIKAEL","name":"MIKAEL SELLAM","isdrivercard":true,"type":"Fahrerkarte","ispincode":true,"pincode":"5566","clsdiv":"divl3twon","clsbtnedit":"btneditl3twon"}]} ';
		Map<String, Object> mapbasket = (Map<String, Object>) JSON.deserializeUntyped(baskettosave);
        String LeadId = (String) mapbasket.get('LeadId');
		system.debug(LeadId);
        
        List<project_mse__Basket_Item__c> lstitemExists = [select Id, project_mse__Basket_Item_Reference__c, 
                    project_mse__Name_on_the_card__c, project_mse__First_Name__c, project_mse__Last_Name__c,
                	project_mse__Vehicle_registration_number__c, project_mse__Auto_Generate_Pin__c,
                	project_mse__Card_PIN__c                                                      
                    from project_mse__Basket_Item__c 
                    where project_mse__Lead__c =: LeadId];
		Map<String, project_mse__Basket_Item__c> mapitemsexists = new Map<String, project_mse__Basket_Item__c>();

        for (project_mse__Basket_Item__c item: lstitemExists) {
            mapitemsexists.put(item.project_mse__Basket_Item_Reference__c, item );
        }
        
        List<Object> mapcards = (List<Object>) JSON.deserializeUntyped( JSON.serialize(mapbasket.get('Basket')));
        
        List<project_mse__Basket_Item__c> lstitemAdd = new List<project_mse__Basket_Item__c>();
        List<project_mse__Basket_Item__c> lstitemUpdate = new List<project_mse__Basket_Item__c>();
        List<project_mse__Basket_Item__c> lstitemDelete = new List<project_mse__Basket_Item__c>();

        List<String> lstidBasket = new List<String>();

        Id rtDriverId = [select Id, name, SobjectType from RecordType where Name = 'Driver Card' and IsActive=true and SobjectType ='project_mse__Basket_Item__c'].Id;
        Id rtVehicleId = [select Id, name, SobjectType from RecordType where Name = 'Vehicle Card' and IsActive=true and SobjectType ='project_mse__Basket_Item__c'].Id;

		for (Object obj : mapcards ) {
            Map < String, Object > card = (Map < String, Object >) JSON.deserializeUntyped(JSON.serialize(obj));
            String idcard = (String) card.get('id');
            String firstname = (String) card.get('firstname');
            String lastname = (String) card.get('lastname');
            String namecard = (String) card.get('namecard');
            String registration = (String) card.get('registration');    
            Boolean isdrivercard = (Boolean) card.get('isdrivercard');
            Boolean ispincode = (Boolean) card.get('ispincode');
            String pincode = (String) card.get('pincode');
			lstidBasket.add(idcard);
            if (mapitemsexists.containsKey(idcard)) {
                project_mse__Basket_Item__c itemexists = mapitemsexists.get(idcard);
                itemexists.project_mse__First_Name__c = firstname;
                itemexists.project_mse__Last_Name__c = lastname;
                itemexists.project_mse__Name_on_the_card__c = namecard;
                itemexists.project_mse__Vehicle_registration_number__c	= registration;	
                itemexists.project_mse__Auto_Generate_Pin__c = ispincode == true ? false : true;
                itemexists.project_mse__Card_PIN__c = pincode;
                lstitemUpdate.add(itemexists);
            } else {            
                project_mse__Basket_Item__c itemAdd = new Basket_Item__c();
                itemadd.RecordTypeId = isdrivercard ? rtDriverId : rtVehicleId;
                itemAdd.project_mse__Lead__c = LeadId;
                itemAdd.project_mse__First_Name__c = firstname;
                itemAdd.project_mse__Last_Name__c = lastname;
                itemAdd.project_mse__Name_on_the_card__c = namecard;
                itemAdd.project_mse__Vehicle_registration_number__c	= registration;	
                itemAdd.project_mse__Basket_Item_Reference__c = idcard;
                itemAdd.project_mse__Auto_Generate_Pin__c = ispincode == true ? false : true;
                itemAdd.project_mse__Card_PIN__c = pincode;
                
                lstitemAdd.add(itemAdd);
            }
            //system.debug(idcard + ', ' + firstname + ', ' + lastname + ', ' + namecard + ', ' + registration + ', ' + isdrivercard);
        }
        
        for (String key : mapitemsexists.keySet()) {
            if (!lstidBasket.contains(key))
            {
                lstitemDelete.add(mapitemsexists.get(key));
            }
        }
        
        system.debug(lstitemAdd);
        
        string errorcode = '100';
        string errormessage = '';
        try { insert lstitemAdd; } 
        catch (Exception e) { errorcode = '200'; errormessage = 'Error - Add Items : ' + e.getMessage() + ' - '; }
        try { update lstitemUpdate; } 
        catch (Exception e) { errorcode = '200'; errormessage += 'Error - Update Items : ' + + e.getMessage(); }
        try { delete lstitemDelete; } 
        catch (Exception e) { errorcode = '200'; errormessage += 'Error - Delete Items : ' + + e.getMessage(); }
        r.processcode = errorcode;
        r.message = errormessage;
        return r;
    }

    public class returnUpsert {
        @auraEnabled
        public String code  {  get; set; }
        @auraEnabled
        public String message  {  get; set; }
        @auraEnabled
        public Object obj  {  get; set; }
        @auraEnabled
        public Id leadid  {  get; set; }
    }
    // ** END - CREATE LEAD ** //    
    
    // ** BEGIN - BASKET SEARCH BY LEAD ID ** //
    @AuraEnabled(cacheable = true)
    public static returnBasketSearch getDataBasket(String leadId) {
        List < project_mse__Basket_Item__c > bk = new List < project_mse__Basket_Item__c > ();
        returnBasketSearch response = new returnBasketSearch();
        system.debug(leadId);
        try { //
            bk = [select Id, project_mse__Basket_Item_Reference__c, 
                    project_mse__Name_on_the_card__c, project_mse__First_Name__c, project_mse__Last_Name__c,
                	project_mse__Vehicle_registration_number__c, project_mse__Auto_Generate_Pin__c,
                	project_mse__Card_PIN__c                                                      
                    from project_mse__Basket_Item__c 
                    where project_mse__Lead__c =: leadId];
        } catch (Exception e) {
            response.code = '200';
            response.message = 'KO';
            response.leadid = leadId;
            response.obj = e.getMessage();
            return response;
        }
        response.code = '100';
        response.message = 'OK';
        response.databasket = bk;
        response.leadid = leadId;
        return response;
    }

    public class returnBasketSearch {
        @auraEnabled
        public String code { get; set; }
        @auraEnabled
        public String message { get; set; }
        @auraEnabled
        public Object obj { get; set; }
        @auraEnabled
        public List < project_mse__Basket_Item__c > databasket { get; set; }
        @auraEnabled
        public Object leadid { get; set; }
    }
    // ** END - BASKET SEARCH BY LEAD ID ** //
    
    // ** BEGIN - LEAD SEARCH BY ID ** //
    @AuraEnabled(cacheable = true)
    public static returnLeadSearch getDataLead(String recordId) {
        List < Lead > ld = new List < Lead > ();
        returnLeadSearch response = new returnLeadSearch();
        system.debug(recordId);
        try { //
            ld = [SELECT LeadSource, Salutation, FirstName, LastName, Phone, Email, Street, City, PostalCode,
                Country, Company, project_mse__VATNumber__c, project_mse__TaxNumber__c,
                project_mse__BundleVariant__c, project_mse__AdditionalServices__c,
                project_mse__NbFuelCardRequired__c, project_mse__Estimatedfuelconsmonthlitre__c,
                  project_mse__iban__c, project_mse__AccountHolderName__c, project_mse__bankname__c,
                  project_mse__bic__c, project_mse__CompanyShortName__c,
                  (select Id, project_mse__Basket_Item_Reference__c, 
                    project_mse__Name_on_the_card__c, project_mse__First_Name__c, project_mse__Last_Name__c,
                	project_mse__Vehicle_registration_number__c, project_mse__Auto_Generate_Pin__c,
                	project_mse__Card_PIN__c                                                      
                    from project_mse__Basket_Items__r )
                FROM Lead where Id =: recordId limit 1
            ];
        } catch (Exception e) {
            response.code = '200';
            response.message = 'KO';
            response.leadid = recordId;
            response.obj = e.getMessage();
            return response;
        }
        response.code = '100';
        response.message = 'OK';
        response.datalead = ld;
        response.leadid = recordId;
        return response;
    }

    public class returnLeadSearch {
        @auraEnabled
        public String code { get; set; }
        @auraEnabled
        public String message { get; set; }
        @auraEnabled
        public Object obj { get; set; }
        @auraEnabled
        public List < Lead > datalead { get; set; }
        @auraEnabled
        public Object leadid { get; set; }
    }
    // ** END - LEAD SEARCH BY ID ** //

    // ** BEGIN - CHECK IBAN ** // 
    @AuraEnabled
    public static returnIban checkIban(String codeiban) {
        messageiban ms = new messageiban();
        returnIban r = new returnIban();
        r.code = '100';
        r.message = 'OK';
        String openibanpath = 'https://openiban.com/validate/{0}?getBIC=true&validateBankCode=true';
        openibanpath = String.format(openibanpath, new List<String>{codeiban});
        HttpRequest request = new HttpRequest();
        request.setEndpoint(openibanpath);
        request.setMethod('GET');
        
        try {     
            HttpResponse response = new Http().send(request);
            
            Map<String, Object> mapreturniban = (Map<String, Object>)JSON.deserializeUntyped(response.getBody());
            //system.debug(mapreturniban);
            Map<String, Object> mapreturnibanbank = (Map<String, Object>)JSON.deserializeUntyped(JSON.serialize(mapreturniban.get('bankData')));
			//system.debug(mapreturnibanbank);
            		
            ms.valid = (Boolean) mapreturniban.get('valid');
			ms.bankname = (String) mapreturnibanbank.get('name');
			ms.bankbic = (String) mapreturnibanbank.get('bic');

            r.ibaninfo = ms;
        } catch (Exception ex) {
            r.code = '200';
        	r.message = ex.getMessage();
        }
        //system.debug(r);
        return r;
    }
    
    public class returnIban {
        @auraEnabled public String code { get; set; }
        @auraEnabled public String message { get; set; }
        @auraEnabled public messageiban ibaninfo { get; set; }
    }
    
    public class messageiban {
        @auraEnabled public Boolean valid { get; set; }
        @auraEnabled public String bankname { get; set; }
        @auraEnabled public String bankbic { get; set; }        
    }
    // ** END - CHECK IBAN ** // 
	
    // ** BEGIN - GENERATE CONSENTS ** // 
    public static string generateConsents(Id leadId, Boolean isConsentData, Boolean isConsentCampaign, Boolean isConsentNewsletter, Boolean isConsentSurvey ) {
        String returnConsent = 'KO';
        Id indivId = null;
        
        List<Lead> lstLead = [select Id, FirstName, LastName, IndividualId From Lead where Id =: leadId];
        if (lstLead.size() > 0) { indivId = lstLead[0].IndividualId; } else { return returnConsent; }
        
        Map<String, Id> mapPurpose = new Map<String, Id>();
        List<DataUsePurpose> lstPurpose = [SELECT Id, Name FROM DataUsePurpose];
        for (DataUsePurpose pp : lstPurpose) { mapPurpose.put(pp.Name, pp.Id); }
        
        String typeConsent = '';
        List<String> lstOfConsents = new List<String>();
        
        if (isConsentData) { lstOfConsents.add('Data'); }
        if (isConsentNewsletter) { lstOfConsents.add('Newsletter'); }
        if (isConsentSurvey) { lstOfConsents.add('Survey'); }
        if (isConsentCampaign) { lstOfConsents.add('Campaign'); }
        List<ContactPointTypeConsent> lstconsent = new List<ContactPointTypeConsent>();

        List<ContactPointTypeConsent> lstConsentExists = [select Id, dataUsePurposeId From ContactPointTypeConsent where Partyid =:indivId and ContactPointType = 'Email'];
        Map<Id, Id> mapConsentExists = new Map<Id, Id>();
        for (ContactPointTypeConsent cs :lstConsentExists) { mapConsentExists.put(cs.dataUsePurposeId, cs.Id) ; }

        if (indivId == null) { return returnConsent; }
        try {
          for (String cons : lstOfConsents) {
            typeConsent = cons;
            if (typeConsent == 'Data') { typeConsent = 'UTA use of CRM data subject data usage'; }
    		if (!mapConsentExists.containsKey(mapPurpose.get(typeConsent))) {
                ContactPointTypeConsent consent = new ContactPointTypeConsent();
                consent.ContactPointType = 'Email';
            	consent.CaptureContactPointType = 'Email';
                consent.PrivacyConsentStatus = 'OptIn';
                consent.PartyId = indivId;
                consent.CaptureDate = DateTime.Now();
            	consent.CaptureSource = 'OST';
                consent.Name = 'Email - ' + typeConsent;
            	consent.dataUsePurposeId = mapPurpose.get(typeConsent);
                lstconsent.add(consent);
            }
          }	
          insert lstconsent;
          returnConsent = 'OK';
        } catch (Exception e) {
                system.debug('ERROR GENERATE CONSENTS');
                system.debug(e.getMessage());
        }
        return returnConsent;
     }
    // ** END - GENERATE CONSENTS ** // 
  
    // ** BEGIN - REPLICATE CONSENTS TO CONTACT ** // 
    public static string replicateConsentstoContact(Id leadId, Id contactId) {
        String returnReplicate = 'KO';
        Id indivId = null;
        Id indivCtcId = null;
        List<ContactPointTypeConsent> lstconsentcontact = new List<ContactPointTypeConsent>();
        
        List<Lead> lstLead = [select Id, FirstName, LastName, IndividualId From Lead where Id =: leadId];
        if (lstLead.size() > 0) { indivId = lstLead[0].IndividualId; } else { return 'KO - NO INDIVIDUAL ON LEAD'; }

        List<Contact> lstContact = [select Id, FirstName, LastName, IndividualId From Contact where Id =: contactId];
        if (lstContact.size() > 0) { indivCtcId = lstContact[0].IndividualId; } else { return 'KO - NO INDIVIDUAL ON CONTACT'; }
        
        List<ContactPointTypeConsent> lstconsent = [select Id, ContactPointType, CaptureContactPointType, PrivacyConsentStatus, 
                                PartyId, CaptureDate, CaptureSource, Name, dataUsePurposeId
 								From ContactPointTypeConsent where PartyId = : indivId];
        if (lstconsent.size() < 1) { return 'KO - NO CONSENT ON LEAD'; }
        
        try {
          for (ContactPointTypeConsent cons : lstconsent) {
                ContactPointTypeConsent newconsent = new ContactPointTypeConsent();
                newconsent.ContactPointType = cons.ContactPointType;
            	newconsent.CaptureContactPointType = cons.CaptureContactPointType;
                newconsent.PrivacyConsentStatus = cons.PrivacyConsentStatus;
                newconsent.PartyId = indivCtcId;
                newconsent.CaptureDate = cons.CaptureDate;
            	newconsent.CaptureSource = cons.CaptureSource;
                newconsent.Name = cons.Name;
            	newconsent.dataUsePurposeId = cons.dataUsePurposeId;
              
                lstconsentcontact.add(newconsent);
          }	
          insert lstconsentcontact;
          returnReplicate = 'OK';
        } catch (Exception e) {
                system.debug('ERROR REPLICATE CONSENTS TO CONTACT');
                system.debug(e.getMessage());
        }
        return returnReplicate;
     }
    // ** END - REPLICATE CONSENTS TO CONTACT ** //     
    
    // ** BEGIN - RANDOM STRING ** //     
    public static String generateRandomString(Integer len) {
    	String chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
        String randStr = '';
        while (randStr.length() < len) {
           Integer idx = Math.mod(Math.abs(Crypto.getRandomInteger()), chars.length());
           randStr += chars.substring(idx, idx+1);
        }
        return randStr; 
	}
    // ** END - RANDOM STRING ** //     
    
    /*
    public static returnCreate callsandbox(Id leadid, string jsonS) {
        String clientId = '3MVG9Rd3qC6oMalVa88jjfgf96A8Czc3wkFPdNDEhfkZNnyyE037ORQ6MoKZKuuclUGeGAwN8ujOsDycjiU1M';
        String clientSecret = '2DDA78E3E3EA436302605D9D405554D271E66CB9FACE41C593D69BABDA76A886';
        String username= 'mikael.sellam@perso.com';
        String password= 'passpass0GipDon9zeS4ADKHQj6aRe956';
        String accesstoken;

        Map<String, String> mapResponseMessage = new Map<String, String>();
        String reqbody = 'grant_type=password&client_id='+clientId+'&client_secret='+clientSecret+'&username='+username+'&password='+password;
        Http httpauth = new Http();
        HttpRequest reqauth = new HttpRequest();
        reqauth.setBody(reqbody);
        reqauth.setMethod('GET');
        reqauth.setEndpoint('https://login.salesforce.com/services/oauth2/token');
        HttpResponse resauth = httpauth.send(reqauth);	
        OAuth2 objAuthenticationInfo = (OAuth2)JSON.deserialize(resauth.getbody(), OAuth2.class); 
        accesstoken = objAuthenticationInfo.access_token;
        string urllead = 'https://ms-appli-dev-ed.my.site.com/services/data/v54.0/sobjects/Lead/' + leadid;
        Http httpreq = new Http();    
        HttpRequest req = new HttpRequest();
        req.setEndpoint(urllead);
        req.setMethod('PATCH');
        req.setHeader('Authorization', 'Bearer ' + accesstoken);   
    	system.debug(jsonS);
        req.setBody(jsonS);         
        req.setHeader('Content-Type', 'application/json');
        req.setHeader('Accept', 'application/xml');
 
        HttpResponse responsereq = httpreq.send(req);
        system.debug(responsereq); 
        returnCreate r = new returnCreate();
        r.code = '100';
    	r.message = 'OK ' + responsereq;
        r.obj = null;
        r.leadid = leadid;
        return r;
    }
    
    public static void callsandbox_test() {
        String clientId = '3MVG9Rd3qC6oMalVa88jjfgf96A8Czc3wkFPdNDEhfkZNnyyE037ORQ6MoKZKuuclUGeGAwN8ujOsDycjiU1M';
        String clientSecret = '2DDA78E3E3EA436302605D9D405554D271E66CB9FACE41C593D69BABDA76A886';
        String username= 'mikael.sellam@perso.com';
        String password= 'passpass0GipDon9zeS4ADKHQj6aRe956';
        String accesstoken;
        Id leadid = '00Q0600000Xx2r8EAB';
        Map<String, String> mapResponseMessage = new Map<String, String>();
        String reqbody = 'grant_type=password&client_id='+clientId+'&client_secret='+clientSecret+'&username='+username+'&password='+password;
        Http httpauth = new Http();
        HttpRequest reqauth = new HttpRequest();
        reqauth.setBody(reqbody);
        reqauth.setMethod('GET');
        reqauth.setEndpoint('https://login.salesforce.com/services/oauth2/token');
        HttpResponse resauth = httpauth.send(reqauth);	
        OAuth2 objAuthenticationInfo = (OAuth2)JSON.deserialize(resauth.getbody(), OAuth2.class); 
        accesstoken = objAuthenticationInfo.access_token;
        string urllead = 'https://ms-appli-dev-ed.my.site.com/services/data/v54.0/sobjects/Lead/' + leadid;
        Http httpreq = new Http();    
        HttpRequest req = new HttpRequest();
        req.setEndpoint(urllead);
        req.setMethod('PATCH');
        req.setHeader('Authorization', 'Bearer ' + accesstoken);   
    	

        Map<String, String> mapjs = new Map<String, String>();
        //Lead ld = [select Id, LastName, FirstName from Lead where Id = :leadid];
        mapjs.put('Company', 'CCCCCCCCCCCC' );
        mapjs.put('FirstName', 'MMMMMMMMMMMMMM' );
        mapjs.put('LastName', 'SSSSSSSSSSSS' );
        string jsonS = JSON.serialize(mapjs);
        system.debug(jsonS);
        req.setBody(jsonS);         
        req.setHeader('Content-Type', 'application/json');
        req.setHeader('Accept', 'application/xml');
 
        HttpResponse responsereq = httpreq.send(req);
        system.debug(responsereq);        
    }
      
    public class OAuth2{
        public String id{get;set;}
        public String issued_at{get;set;}
        public String instance_url{get;set;}
        public String signature{get;set;}
        public String access_token{get;set;}
    }  
*/
}