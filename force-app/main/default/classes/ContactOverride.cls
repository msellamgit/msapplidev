public with sharing class ContactOverride {

    private final ApexPages.StandardController stdController;
    Contact ctc {get; set;}
    
    // Constructor – controller extension
    public ContactOverride(ApexPages.StandardController stdController) {
        this.stdController = stdController;
        ctc = (Contact)stdController.getRecord();
        system.debug('PASS PASS PASS PASS');
    }
    
    public PageReference showContactPage() {    
        Id rtId = [select Id from RecordType where Name = 'External' and IsActive=true and SobjectType='Contact' limit 1].Id;
        // Redirect to New page with preselect record type
        PageReference p = new PageReference('/003/e');
        
        Map<String, String> mapParams = p.getParameters();
        
        mapParams.putAll(ApexPages.currentPage().getParameters());
        if (rtId != null) mapParams.put('RecordType', rtId);
        mapParams.put('nooverride', '1');
        mapParams.remove('save_new'); // Prevent the page from trying to save the opp and create a new one
        mapParams.remove('sfdc.override');
        return p;        
    }    
}