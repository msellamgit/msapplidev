public class APTemp_RechercheContact {
    private Id accID {get;set;}
    private String userLogin {get;set;}
    private Id userID {get;set;}
    private String userDepartment {get;set;}
    private String accOwnerDirection {get;set;}
    public List<String> lstProductOpp {get;set;}
    public WSTemp_RechercheContact.ReponseWS reponse {get;set;}

    final String activeMatch = 'Actif';
 
 private class CompEvent{
        public String Id;
        public String Type;
        public String Subject;
        public Date ActivityDate;
    }

    public APTemp_RechercheContact (String user){
        userLogin = user;
        userDepartment = getUserDepartment(UserInfo.getUserId()); 

        reponse						= new WSTemp_RechercheContact.ReponseWS();
        reponse.authentification	= userDepartment == null ? false : getUserExistance();
        reponse.informationContact  = reponse.authentification ? getUserDetails() : null;
        reponse.informationAccount	= reponse.authentification ? getAccountDetails() : null;
        reponse.informationOpp		= reponse.authentification ? getInformationsOpp() : null;
        reponse.lstProductOpp		= reponse.authentification ? lstProductOpp : null;

        keepResponseLog(reponse, userLogin);
    }

    public WSTemp_RechercheContact.ReponseWS getRechercheContact (){ return reponse; }

    private Boolean getUserExistance(){
        List<Contact> cntList = [SELECT Id, project_mse__Statut__c, AccountId FROM Contact WHERE Email =: userLogin AND Department =: userDepartment LIMIT 1];

        if(cntList.size() > 0){ 
        userID = cntList[0].Id;
        accID = cntList[0].AccountId;
        return cntList[0].project_mse__Statut__c == activeMatch;            
        }
    else
    {
            return false;
        }
    }

    private String getUserDepartment(id aConcernedUserId){
        try{
            String returnedDirection;
            List<String> directionList = new List<String>{'Juridique', 'CDV'};
            List<GroupMember> targetGroupMemberList = [SELECT Group.DeveloperName FROM GroupMember 
                                                        WHERE UserOrGroupId =: aConcernedUserId AND Group.DeveloperName IN: directionList 
                                                        LIMIT 2 ];

            if(targetGroupMemberList.size() > 1){
                returnedDirection = null; 
            } else {
                returnedDirection = targetGroupMemberList[0].Group.DeveloperName;
            }

            return returnedDirection;
        } catch (Exception e){
            return null;
        }
    }

    private WSTemp_RechercheContact.InfoCtcOBJ getUserDetails(){

        WSTemp_RechercheContact.InfoCtcOBJ ret = new WSTemp_RechercheContact.InfoCtcOBJ();

        Contact con = [SELECT LastName, FirstName, Email, Phone, Salutation,
                        project_mse__Statut__c, Department, AccountId,
                        Account.OwnerId, Account.Owner.IsActive, Account.Owner.Email, Account.Owner.FirstName,
                        Account.Owner.LastName, Account.Owner.Username, Account.Owner.Profile.Name,
                        Account.Owner.UserRole.Name
                        FROM Contact
                        WHERE Id =: userID LIMIT 1];
                        
        accOwnerDirection = getUserDepartment(con.Account.OwnerId);              

        ret.value = new List<Map<String, String>>{
            new Map<String,String>{ 'USR_Direction'                 => accOwnerDirection}, 
            new Map<String,String>{ 'USR_IsActive'                  => String.valueOf(con.Account.Owner.IsActive) },
            new Map<String,String>{ 'USR_Email'                     => con.Account.Owner.Email },
            new Map<String,String>{ 'USR_FirstName'                 => con.Account.Owner.FirstName },
            new Map<String,String>{ 'USR_LastName'                  => con.Account.Owner.LastName },
            new Map<String,String>{ 'USR_Username'                  => con.Account.Owner.Username },
            new Map<String,String>{ 'USR_ProfileName'               => con.Account.Owner.Profile.Name },
            new Map<String,String>{ 'USR_UserRoleName'              => con.Account.Owner.UserRole.Name },
            new Map<String,String>{ 'CNT_LastName'                  => con.LastName },
            new Map<String,String>{ 'CNT_FirstName'                 => con.FirstName },
            new Map<String,String>{ 'CNT_Email'                     => con.Email },
            new Map<String,String>{ 'CNT_Phone'                     => con.Phone },
            new Map<String,String>{ 'CNT_Salutation'                => con.Salutation },
            new Map<String,String>{ 'USR_Statut'                => con.project_mse__Statut__c },
            new Map<String,String>{ 'CNT_Account_IdExterne'         => con.AccountId }
        };
        return ret;
    }

    private WSTemp_RechercheContact.InfoCpnOBJ getAccountDetails(){

        WSTemp_RechercheContact.InfoCpnOBJ ret = new WSTemp_RechercheContact.InfoCpnOBJ();
        CompEvent comEvent = new CompEvent();

        Account acc = [SELECT BillingPostalCode, BillingStreet, BillingCity, Name, 
                        Phone,
                            (SELECT Id, Type, Subject, ActivityDate FROM Events)
                        FROM Account WHERE Id =: accID LIMIT 1];

        for(Event ev : acc.Events){
            comEvent.Id           = ev.Id;
            comEvent.Type         = ev.Type;
            comEvent.Subject      = ev.Subject;
            comEvent.ActivityDate = ev.ActivityDate;
        }

        ret.value = new List<Map<String, String>>{
            new Map<String,String>{ 'ACC_CodePostal'            => acc.BillingPostalCode },
            new Map<String,String>{ 'ACC_Voie'                  => acc.BillingStreet },
            new Map<String,String>{ 'ACC_Ville'                 => acc.BillingCity },
            new Map<String,String>{ 'ACC_NomCompte'             => acc.Name },
            //new Map<String,String>{ 'ACC_SIRET'                 => acc.SIRET__c.deleteWhitespace() },
            new Map<String,String>{ 'ACC_IdCompte'              => acc.Id },
            new Map<String,String>{ 'ACC_Phone'                 => acc.Phone },
            new Map<String,String>{ 'EVT_Id'                    => comEvent.Id },
            new Map<String,String>{ 'EVT_Type'                  => comEvent.Type },
            new Map<String,String>{ 'EVT_Subject'               => comEvent.Subject },
            new Map<String,String>{ 'EVT_ActivityDate'          => String.valueOf(comEvent.ActivityDate) }
        };

        return ret;
    }

    private WSTemp_RechercheContact.InfoOppOBJ getInformationsOpp(){

        WSTemp_RechercheContact.InfoOppOBJ ret = new WSTemp_RechercheContact.InfoOppOBJ();
        ret.value = new List<List<Map<String, String>>>();
        lstProductOpp = new List<String>();

        List<Opportunity> opportunities = [SELECT Account.Name, Amount, Id, CloseDate, StageName, IsPrivate, 
                                    Type, IqScore, TotalOpportunityQuantity, LeadSource
                                    FROM Opportunity 
                                    WHERE AccountId =: accID 
                                    AND ( (StageName =: 'Closed Won') )
                                    LIMIT 50000];

        for(Opportunity o : opportunities){
            //lstProductOpp.add(c.RecordType.Name);
            ret.value.add(new List<Map<String, String>>{
                new Map<String,String>{ 'OPP_AccountName'               => o.Account.Name },
                new Map<String,String>{ 'OPP_Id'                        => String.valueOf(o.Id).left(15) },
                new Map<String,String>{ 'OPP_Amount'                    => String.valueOf(o.Amount) },
                new Map<String,String>{ 'OPP_CloseDate'                 => String.valueOf(o.CloseDate) },
                new Map<String,String>{ 'OPP_StageName'                 => o.StageName },
                new Map<String,String>{ 'OPP_IsPrivate'                 => String.valueOf(o.IsPrivate) },
                new Map<String,String>{ 'OPP_Type'                      => o.Type },
                new Map<String,String>{ 'OPP_IqScore'                   => String.valueOf(o.IqScore) },
                //new Map<String,String>{ 'OPP_TotalOppQtt'               => String.valueOf(o.TotalOpportunityQuantity) },
                new Map<String,String>{ 'OPP_LeadSource'                  => o.LeadSource }                
            });
            
            //SELECT Product2.Name from OpportunityLineItem where OpportunityId = '0061o00000lL38P'
                
            list<opportunityLineItem> oplis = new list<opportunityLineItem>([select product2.name from opportunitylineitem where opportunityId =: O.Id]);
            for(opportunityLineItem opli : oplis){
	             lstProductOpp.add(opli.product2.name);
            }
        }
        return ret;
    }

    private void keepResponseLog(WSTemp_RechercheContact.ReponseWS resp, String req){
        String respJSON = JSON.serialize(resp);

        Log__c log = new Log__c(
            project_mse__Type__c             = 'WebService',
            project_mse__Request__c          = req,
            project_mse__Response__c         = respJSON,
            project_mse__WebserviceType__c   = 'REST',
            project_mse__StatusCode__c       = 'OK',
            project_mse__Flux__c             = 'classe WSTemp_RechercheContact'
        );

        try { 
            Database.SaveResult srLOG = Database.insert(log); 
            } 
        catch(Exception e) { 
            System.debug('keepResponseLog~~WSTemp_RechercheContact~> ' + e.getMessage()); 
            }
    }
}