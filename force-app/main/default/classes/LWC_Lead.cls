public with sharing class LWC_Lead {
    /*
    Method: searchAccount
    Para: Account Name
    here passing the Account Name to Fetching all the releated Accounts
    */
    @AuraEnabled (cacheable = true)
    public static List<Lead> searchLeadName(String leadName, String leadStatut, String leadPeriode, String leadOffre, String Last10Created) {
        string strLeadName = '\'%'+ leadName + '%\'';
        string q = '';
        string condition = '';

        if ( leadName != '' ) { condition = condition + ' ( FirstName LIKE ' + strLeadName + ' or LastName LIKE ' + strLeadName + ' or Company LIKE  ' + strLeadName + ' ) '; }
        if ( leadStatut != '' ) {
            if ( condition != '' ) { condition = condition + ' AND ' ;}
            condition = condition + ' ( Status = \'' +  leadStatut + '\' ) ' ;
        }
        if ( leadPeriode != '' ) {
            if ( condition != '' ) { condition = condition + ' AND ' ;}
            condition = condition + ' ( CreatedDate = LAST_N_DAYS:' +  leadPeriode + ' ) ' ;
        }
        if ( leadOffre != '' ) {
            if ( condition != '' ) { condition = condition + ' AND ' ;}
            condition = condition + ' ( project_mse__AssuOffre__c = \'' +  leadOffre + '\' ) ' ;
        }

        
        if ( condition != '' ) { condition = ' where ' + condition ;}
 
        q = q + 'Select Id, Name, FirstName, LastName, Company, project_mse__AssuFoyer__c, project_mse__AssuHabitation__c, ';
        q = q + 'project_mse__AssuOffre__c, project_mse__AssuResidence__c, project_mse__AssuSituationFamiliale__c, ';        
        q = q + 'Phone, Status, LeadSource, OwnerId, Email, City, PostalCode, Street, CreatedDate ';
        q = q + 'from Lead ';
        if ( condition != '' ) { q = q + condition ;}
        if (Last10Created == 'Y') { q = q + ' order by createdDate DESC limit 10'; } else { q = q + ' order by Name limit 100'; }
        
        system.debug(q);
        
        return database.query(q);
    }
}