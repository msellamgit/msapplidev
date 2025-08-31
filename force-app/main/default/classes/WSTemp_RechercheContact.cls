//    https://workbench.developerforce.com
//    Rest Explorer
//    GET
//    /services/apexrest/project_mse/RechercheContact?login=m.a@gg.com2
//	  Header
//		Content-Type: application/json; charset=UTF-8
//		Accept: application/json
//
@RestResource(urlMapping='/RechercheContact/*')

global with sharing class WSTemp_RechercheContact {
    global class ReponseWS{
        webservice Boolean authentification;
        webservice InfoCtcOBJ informationContact; //contact details
        webservice InfoCpnOBJ informationAccount; //accountDetails
        webservice List<String> lstProductOpp; // liked opp product name
        webservice InfoOppOBJ informationOpp; //contract info
        webservice String message;
    }

    global class InfoCtcOBJ{ public List<Map<String, String>> value; }
    global class InfoCpnOBJ { public List<Map<String, String>> value; }
    global class InfoOppOBJ{ public List<List<Map<String, String>>> value; }

    @HttpGet
    webservice static ReponseWS getValidationUtilisateur(){
        String param0 = (new list<string>(RestContext.request.params.keySet()) )[0];
        String value0 = RestContext.request.params.get(param0);
        
        String loginCheck = value0;
        system.debug('RestContext.request.params : ' + loginCheck);
        if(!String.isBlank(loginCheck)){
            APTemp_RechercheContact resp = new APTemp_RechercheContact(loginCheck);
            return resp.getRechercheContact();
        } else {
            ReponseWS rnull = new ReponseWS();
            rnull.authentification = False;
            rnull.message = 'PARAMETRE NON RENSEIGNER ' + loginCheck;            
            return rnull;
        }
    }
}