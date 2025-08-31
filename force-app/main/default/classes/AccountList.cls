/*
    @Description: Class to get 20 Account where BillingCountry is not null
    --AND BillingCity = 'PARIS'
     WHERE DISTANCE(My_Location_Field__c, GEOLOCATION(10,10), :units) < 10];
			query += 'and ( Type like ''%partner%'' )';  AND ( BillingCity = ''  ) 

query = 'SELECT Id, Name,BillingStreet,BillingCity,BillingPostalCode, BillingCountry, Geoloc_Latitute__c, 
Geoloc_Longitute__c , Chiffre_d_Affaire__c FROM Account Where BillingCity = \'PARIS\' AND 
OwnerId = \'' + UserInfo.getUserId() + '\' limit 15' ;      

with sharing 
*/
public class AccountList {

	
    //public String loc { get; set; }
    public list<Account> objAccounts {get;set;}
    public string query = ' ';
    public string query_select = 'SELECT Id, Name,BillingStreet,BillingCity,BillingPostalCode, BillingCountry,  project_mse__Geoloc_Latitute__c, project_mse__Geoloc_Longitute__c, project_mse__Chiffre_d_Affaire__c FROM Account Where OwnerId = \'' + UserInfo.getUserId() + '\' and BillingCountry <> null ';
	public string query_condition = ' ';
	public string query_limit = ' limit 15';
    
    public string ma_ville = 'paris';
    
    Public string nom_ville {get;set;}
    Public boolean statut_partner {get;set;}
    Public boolean statut_prospect {get;set;}
    Public boolean statut_custdirect {get;set;}
    Public boolean statut_custchannel {get;set;}
    Public boolean statut_others {get;set;}
    
    Public void refreshmap(){
        ma_ville = nom_ville ;       
        query_condition = ' and  BillingCity = \'' + ma_ville + '\''; 
        if (statut_prospect || statut_custdirect || statut_custchannel || statut_partner || statut_others ) {
            query_condition += ' and Type in ( \'x\'' ;
            if (statut_prospect) { query_condition += ', \'Prospect\'' ;}
            if (statut_custdirect) { query_condition += ', \'Customer - Direct\'' ;}
            if (statut_custchannel) { query_condition += ', \'Customer - Channel\'' ;}
            if (statut_partner) { query_condition += ', \'Channel Partner / Reseller\' , \'Installation Partner\' , \'Technology Partner\' ' ;}
            if (statut_others) { query_condition += ', \'Other\'' ;}
                        
            query_condition += ' )' ;
        }
        query = query_select + query_condition + query_limit;             
            
        AccountList_map();
    }
    
    Public AccountList(){
        query_condition = 'and  BillingCity = \'' + ma_ville + '\''; 
        query = query_select + query_condition + query_limit;     
        AccountList_map();
    }
    Public void AccountList_map(){ 
        try{
            objAccounts = new list<Account>();  
            /*objAccounts.addAll([SELECT Id, Name,BillingStreet,BillingCity,BillingPostalCode,
                                BillingCountry, Geoloc_Latitute__c, Geoloc_Longitute__c , Chiffre_d_Affaire__c
                                FROM Account 
                                Where OwnerId = :UserInfo.getUserId() and BillingCountry <> null 
                                AND ( BillingCity = :ma_ville  )
								and ( Type like '%partner%' )                                
                                limit 15]); */		
            /* test = UserInfo.getUserId() ;            
			query = 'SELECT Id, Name,BillingStreet,BillingCity,BillingPostalCode, BillingCountry, Geoloc_Latitute__c, Geoloc_Longitute__c , Chiffre_d_Affaire__c FROM Account Where BillingCity = \'PARIS\' AND OwnerId = \'' + UserInfo.getUserId() + '\' limit 15' ;      
            */
            objAccounts = Database.query(query);			
        }catch(Exception ex ){
            ApexPages.addMessage(new ApexPages.message(ApexPages.severity.ERROR,'Error:'
                                                        +ex.getMessage()));
        }
    }  
}