public with sharing class AccountController {
  public static List<Account> getAllActiveAccounts() {
    return [SELECT Id,Name,project_mse__Active__c, Type FROM Account WHERE project_mse__Active__c = 'Yes'];
  }
  @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList() {
        return [SELECT Id, Name FROM Account LIMIT 10];
    }

    @AuraEnabled(cacheable=true)
    public static Account getSingleAccount() {
        return [SELECT Id, Name, Phone, Type FROM Account LIMIT 1];
    }

    @AuraEnabled(cacheable=true)
    public static Account getInfoAccount(String recordId) {
        return [SELECT Id, Name, Phone, Type, BillingStreet,BillingCity,BillingPostalCode,
        project_mse__Logo__c,  project_mse__PhotoClient__c, project_mse__ImageId__c FROM Account where Id = :recordId];
    }    
    
    
}