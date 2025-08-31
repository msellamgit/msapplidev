/*
 * Class for lwc OSTEdenredIdentity
 * @Author : Mikael SELLAM
 * @Date : May 23, 2022
 * @description : Class functions to consume web service Edenred Identity.
 */

public with sharing class OSTEdenredIdentity {
    
	private static final String PATH = '/edenred-identity/verify-email';
    private static final String ei_endpoint = 'https://sfdc.sbx.eu.uta.io/v1';
    private static final Integer ei_timeout = 20000;
    private static final String ei_clientid = 'dab1d0b1faa34036b4b5ccb721ccfcd6';
    private static final String ei_clientsecret = 'fC260f1CB9C0484BbEe6034b113EcD2b';
    private static final String ei_correlationid = 'ef5218ad-b36d-49a9-8989-717f8b70a502';
    
    	//00Q0600000Xx3MuEAJ
    	//000000000000000000
    public static returnEI checkEdenredIdentity(String s_email) {
        returnEI rei = new returnEI();
        List < Map < String, String >> requestList = new List < Map < String, String >> ();
        requestList.add(New Map < String, String > { 'id' => '1', 'email' => s_email });

        String request = JSON.serialize(requestList);
        OSTEdenredIdentity.returnCallOut responseBody = OSTEdenredIdentity.verificationCallout(request);
        //if (true) { system.debug(responseBody); return null; }

        rei.code = responseBody.code;
        rei.message = responseBody.message;

        HttpResponseBody response = new HttpResponseBody();
        if (rei.code == '200') {
            response = (HttpResponseBody) JSON.deserialize(responseBody.returnboby, HttpResponseBody.class);
            //rei.status = (String) response.data[0].identity_account_status;
        }


        //rei.code = response.meta.messages[0].code;

        //system.debug('-----------------------');
        //system.debug(response);
        //system.debug(rei);        
        //system.debug('-----------------------');
        return rei;
    }
    
    public static returnCallOut verificationCallout(String requestBody){
        
    returnCallOut responseCallOut = new returnCallOut();
        
        String returnData;
        HttpRequest request = new HttpRequest();
        request.setMethod('POST');
        
        request.setEndpoint(ei_endpoint + PATH);
        request.setTimeout(ei_timeout);
        request.setBody(requestBody);
        //System.debug('request: '+requestBody);
        request.setHeader('x-client-id', ei_clientid);
        request.setHeader('x-client-secret', ei_clientsecret);
        request.setHeader('Content-Type', 'application/json');
        request.setHeader('Accept', 'application/json');
        request.setHeader('x-correlation-id', 'ef5218ad-b36d-49a9-8989-717f8b70a502');

        try{
        	HttpResponse response = new Http().send(request);
            responseCallOut.code =  String.valueOf(response.getStatusCode());
            responseCallOut.message = response.getStatus();
            
            if(response.getStatusCode() == 200) {
                responseCallOut.returnboby = response.getBody();
                //System.debug('response'+returnData);
            }
            else{
                system.debug('Error has occured. ');
            }
    	}
        catch(Exception e){
            system.debug('Error has occured in Callout '+ e.getMessage());
        }
            return responseCallOut; 
    }    
    
    public static Map<Id,IDENTITY_STATUS> verifyEmailSync(Map<Id,String> recordIdEmail){
        system.debug('Sending request to sfdc XP api v1 - INFO');

        List<RequestData> requestDataList = mapTorequestDataList(recordIdEmail);
        Map<Id,IDENTITY_STATUS> returnData = new Map<Id,IDENTITY_STATUS>();

        HttpRequest request = new HttpRequest();
        request.setMethod('POST');
        system.debug('verifyEmailSync 2');
        request.setEndpoint('https://sfdc.sbx.eu.uta.io/v1' + PATH);
        request.setTimeout(20000);
        request.setBody(JSON.serialize(requestDataList));
        System.debug('request: '+JSON.serialize(requestDataList));
        request.setHeader('x-client-id', 'dab1d0b1faa34036b4b5ccb721ccfcd6');
        request.setHeader('x-client-secret', 'fC260f1CB9C0484BbEe6034b113EcD2b');
        request.setHeader('Content-Type', 'application/json');
        request.setHeader('Accept', 'application/json');
        request.setHeader('x-correlation-id', 'ef5218ad-b36d-49a9-8989-717f8b70a502');

        HttpResponse response = new Http().send(request);
        system.debug('verifyEmailSync 4');
        System.debug('response body '+response.getBody());

        if(response.getStatusCode() == 200) {
            try{
                HttpResponseBody httpResponseBody = (HttpResponseBody) JSON.deserialize(response.getBody() , HttpResponseBody.class);
                returnData = responseDataListtoMap(httpResponseBody.data);
                System.debug('response'+returnData);
                system.debug('Successful response: '+ returnData + '  INFO');
            }
            catch(Exception e){
                system.debug('Error has occured in parsing (status code 200). '+ e.getMessage());
            }
        }
        else{
            system.debug('Error has occured. ');
        }

        return returnData; 
    }
        
    public static List<RequestData> mapTorequestDataList(Map<Id,String> recordIdEmail){
        List<RequestData> requestDataList = new List<RequestData>();
        for (Id key : recordIdEmail.keySet()) {
            RequestData temp = new RequestData();
            temp.id = key;
            temp.email = recordIdEmail.get(key);
            requestDataList.add(temp);
        }
        return requestDataList;
    }
    
    public static Map<Id,IDENTITY_STATUS> responseDataListtoMap(List<ResponseData> responseDataList){
        Map<Id,IDENTITY_STATUS> emailVerification = new Map<Id,IDENTITY_STATUS>();
        for (ResponseData data: responseDataList) {
            emailVerification.put(data.id,data.identity_account_status);
        }
        return emailVerification;
    }
    
    public class returnCallOut { public String code; public String message; public String returnboby; } 
   
    public class returnEI {
        @auraEnabled public String code { get; set; }
        @auraEnabled public String message { get; set; }
        @auraEnabled public String status { get; set; }
    }
    public enum IDENTITY_STATUS {
        REGISTERED,
        UNREGISTERED,
        ERROR,
        PENDING
    }  
    public class RequestData {
        //public Id id;
        public String id;
        public String email;
    }
    public class HttpResponseBody {
        public Meta meta;
        public List<ResponseData> data;
    }
    public class Meta {
        public String status;
        public List<Messages> messages;
    }
    public class ResponseData{
        public String id;
        public String email;
        IDENTITY_STATUS identity_account_status;
    }
    public class Messages {
        public String code;
        public String level;
        public String text;
    }
}