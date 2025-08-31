/*
 * Class for lwc OSTDuplicate
 * @Author : Mikael SELLAM
 * @Date : May 23, 2022
 * @description : Class functions to consume web service Edenred Identity.
 * 					Case 1-0 : Not from SMART SIGN UP ----> searchDuplicateSF
 * 					case 2-0 : From SMART SIGN UP AND Not exist in CAM with Crefo ID ----> searchDuplicateCAM
 */

public class OSTDuplicate {

  public static returnDuplicate searchDuplicateSF(String leadtocreate) {
      returnDuplicate resp = new returnDuplicate();
      resp.code = '100';
      resp.message = 'OK';
      resp.processcode = '100';
      
      Map < String, Object > mapLeadtocreate = (Map < String, Object > ) JSON.deserializeUntyped(leadtocreate);     
      String value_Company = (String) mapLeadtocreate.get('Company');
      String value_Email = (String) mapLeadtocreate.get('Email');
	   
	  Boolean isdupprospect = false;
      Boolean isduplead = false;
      Boolean isdupopportunity = false;
      Id accountid = null;
      Id leadid = null;
       
       isdupprospect = false;
       returnDuplicate duppropect = searchProspect(value_Company, value_Email);
       isdupprospect = duppropect.isduplicate;
       accountid = duppropect.id;
       system.debug('PASS 0');
       if (isdupprospect)
       {
           resp.id = duppropect.id;
           resp.isduplicate = true;
           resp.objduplicate = 'Prospect';
           returnDuplicate dupopp = searchOpportunity(accountid);
           isdupopportunity = dupopp.isduplicate;
           if (isdupopportunity) {
               	resp.processcode = '300';
               	
               	LWC_POC2.returnUpsert rlead0 = LWC_POC2.createLead(leadtocreate, 'Preclosed');
				//resp.code = rlead0.code;
				//resp.message = rlead0.message;
				resp.message = 'Opportunity exists ! - ' + rlead0.message;
           		resp.id = rlead0.leadid;
		        resp.isduplicate = false;
        		resp.objduplicate = null;
                system.debug(resp);
           } 
           else {
               	LWC_POC2.returnUpsert rlead1 = LWC_POC2.createLead(leadtocreate, null);
				resp.code = rlead1.code;
				resp.message = rlead1.message;
           		resp.id = rlead1.leadid;
		        resp.isduplicate = false;
        		resp.objduplicate = null;
                system.debug(resp);
              }              
           }
       else {
           system.debug('PASS 1');
           returnDuplicate duplead = searchLead(value_company, value_Email);
           isduplead = duplead.isduplicate;
       	   leadid = duplead.id;
           if (isduplead) {
                system.debug('PASS 2');
                resp.id = duplead.id;
           		resp.objduplicate = 'Lead';
                LWC_POC2.updateLead(duplead.id, leadtocreate, null);
           } 
           else {
                system.debug('PASS 3');
                LWC_POC2.returnUpsert rlead2 = LWC_POC2.createLead(leadtocreate, null);
				resp.code = rlead2.code;
				resp.message = rlead2.message;
           		resp.id = rlead2.leadid;
		        resp.isduplicate = false;
        		resp.objduplicate = null;
                system.debug(resp);
           }
       }
       return resp;
    }

  public static returnDuplicate searchDuplicateCAM(String leadtocreate) {
      returnDuplicate resp = new returnDuplicate();
      resp.code = '100';
      resp.message = 'OK';
      
      Map < String, Object > mapLeadtocreate = (Map < String, Object > ) JSON.deserializeUntyped(leadtocreate);     
      String value_Cam = (String) mapLeadtocreate.get('Company');
      String value_Email = (String) mapLeadtocreate.get('Email');
      
	   Boolean isdupprospect = false;
       Boolean isduplead = false;
       Boolean isdupopportunity = false;
      Id accountid = null;
      Id leadid = null;
      
       isdupprospect = false;
       returnDuplicate duppropect = searchProspectCam(value_Cam);
       isdupprospect = duppropect.isduplicate;
       accountid = duppropect.id;      

      if (isdupprospect)
       {
           resp.id = duppropect.id;
           resp.isduplicate = true;
           resp.objduplicate = 'Prospect';
           returnDuplicate dupopp = searchOpportunity(accountid);
           isdupopportunity = dupopp.isduplicate;
           if (isdupopportunity) {
               resp.processcode = '300';
               resp.message = 'Opportunity exists !';
               LWC_POC2.createLead(leadtocreate, 'Preclosed');
           } 
           else {
               
               returnDuplicate dupleadcamemail = searchLeadCamParentEmail(value_cam, value_Email);
               
			   Boolean isOSTWebsale = (dupleadcamemail.stage == 'OST Websale');//Si statut OST Websale 
               if (isOSTWebsale) {
                   LWC_POC2.updateLead(dupleadcamemail.id, leadtocreate, null);
               } 
               else {
                   LWC_POC2.returnUpsert rlead0 = LWC_POC2.createLead(leadtocreate, 'Normal');
                   resp.code = rlead0.code;
				   resp.message = rlead0.message;
           		   resp.id = rlead0.leadid;
		           resp.isduplicate = false;
        		   resp.objduplicate = null;
                   system.debug('CREATE CAM FILE');
                   system.debug('GET CREDIT SCORING');                   
               }
           }
       }
       else {
           returnDuplicate duplead = searchLeadCam(value_cam);
           isduplead = duplead.isduplicate;
       	   leadid = duplead.id;
           if (isduplead) {
                resp.id = duplead.id;
           		resp.objduplicate = 'Lead';
 				Boolean isOSTWebsale = (duplead.stage == 'OST Websale');//Si statut OST Websale 
               if (isOSTWebsale) {
                   LWC_POC2.updateLead(duplead.id,leadtocreate, null);
               } 
               else {
                   LWC_POC2.returnUpsert rlead1 = LWC_POC2.createLead(leadtocreate, 'Normal');
                   resp.code = rlead1.code;
				   resp.message = rlead1.message;
           		   resp.id = rlead1.leadid;
		           resp.isduplicate = false;
        		   resp.objduplicate = null;
                   system.debug(resp);

                   system.debug('CREATE CAM FILE');
                   system.debug('GET CREDIT SCORING');                   
               }
           } 
           else {
               	LWC_POC2.returnUpsert rlead2 = LWC_POC2.createLead(leadtocreate, 'Normal');
               	resp.code = rlead2.code;
				resp.message = rlead2.message;
           		resp.id = rlead2.leadid;
		        resp.isduplicate = false;
        		resp.objduplicate = null;
                                
               system.debug(resp);
               system.debug('CREATE CAM FILE');
               system.debug('GET CREDIT SCORING');   
           }
       }
       
       return resp;
    }
    
  public static returnDuplicate searchProspect(String companyname, String email) {
    	returnDuplicate r = new returnDuplicate();
		List<Account> lstaccount = [select id, CleanStatus, Name, project_mse__Email__c from Account where Name =: companyname and project_mse__Email__c =: email];        
      	r.id = null;
        r.isduplicate = false;
        if (lstaccount.size() > 0) { r.id = lstaccount[0].id; r.isduplicate = true; }
        return r;
    } 

    private static returnDuplicate searchProspectCam(String camId) {
    	returnDuplicate r = new returnDuplicate();
        r.id = null;
        r.isduplicate = false;
        return r;
    } 
    
    public static returnDuplicate searchLead(String companyname, String email) {
    	returnDuplicate r = new returnDuplicate();
		List<Lead> lstlead = [select id, Status, Name, email from Lead where Company =: companyname and email =: email];                        
        r.id = null;
        r.isduplicate = false;
        if (lstlead.size() > 0) { r.id = lstlead[0].id; r.isduplicate = true; }        
        return r;
    } 

    private static returnDuplicate searchLeadCam(String camId) {
    	returnDuplicate r = new returnDuplicate();
        
        r.id = null;
        r.isduplicate = false;
        return r;
    } 
    
    private static returnDuplicate searchLeadCamParentEmail(String camParentId, String email) {
    	returnDuplicate r = new returnDuplicate();
        
        r.id = null;
        r.isduplicate = false;
        return r;
    } 
    
  private static returnDuplicate searchOpportunity(Id accountid) {
    	returnDuplicate r = new returnDuplicate();
        
        r.id = null;
        r.isduplicate = false;
        r.stage = 'Open';
        return r;
    }     
    
    public class returnDuplicate {
        //public Id id;
        public String code;
        public String processcode;
        public String message;        
        public String id;
        public boolean isduplicate;
        public String objduplicate;
        public String stage;        
    }
}