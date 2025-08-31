public with sharing class Site1_NoteDeFrais {   
    public Boolean getIsClassic() {
        return (UserInfo.getUiThemeDisplayed() == 'Theme3');
    }        
    public List<project_mse__Note_de_Frais__c> getNDF() {
        return Database.query('SELECT Name, Id, project_mse__Date__c, project_mse__Type__c, project_mse__MontantTTC__c FROM project_mse__Note_de_Frais__c LIMIT 15');
    }
}