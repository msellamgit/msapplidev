public with sharing class LWC_Product {

    @AuraEnabled(cacheable=true)
    public static List<Product2> getProductFamily(String productType) {
        return [SELECT Id, Name, project_mse__Price__c, project_mse__Unit__c FROM Product2 where isactive = true and Family = :productType order by project_mse__Price__c];
    }  
      
}