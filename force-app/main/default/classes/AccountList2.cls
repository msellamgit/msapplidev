/*
    @Description: Class to get 20 Account where BillingCountry is not null
    --AND BillingCity = 'PARIS'
with sharing 
*/
public class AccountList2 {
    public list<Account> objAccounts {get;set;}

    public string ma_ville = 'paris';

    Public string nom_ville {get;set;}
    
    Public void MyMethode(){
        ma_ville = nom_ville ;
    }
    
    Public AccountList2(){ 
        try{
            objAccounts = new list<Account>();  
            objAccounts.addAll([SELECT Id, Name,BillingStreet,BillingCity,BillingPostalCode,
                                BillingCountry, Geoloc_Latitute__c, Geoloc_Longitute__c , Chiffre_d_Affaire__c
                                FROM Account 
                                Where OwnerId = :UserInfo.getUserId() and BillingCountry <> null 
                                AND ( BillingCity = :ma_ville  )
                                AND ( BillingCountry <> '%state0%' )
                                limit 10]);
        }catch(Exception ex ){
            ApexPages.addMessage(new ApexPages.message(ApexPages.severity.ERROR,'Error:'
                                                        +ex.getMessage()));
        }
    }  
}