/*
 * Class: WS_AttachmentBLOB_TEST
 * Author: Mikael Sellam ~ mikael.sellam@external.engie.com
 * Date:   29/01/2019
 * Description: Web service WS Attachment pour récupérer 
 * 
*/
@isTest(SeeAllData=true)
public class WS_AttachmentBLOB_TEST{
    static testMethod void AttachmentBLOBTEST(){
		Account testAccount = new Account();
		testAccount.Name='Test Account' ;
		insert testAccount;
        Id parentId = testAccount.Id;
        
		Blob b = Blob.valueOf('Test Blob file');    	
    	Attachment attachment = new Attachment();
    	attachment.ParentId = parentId;
    	attachment.Name = 'Test Attachment';
    	attachment.Body = b;
    	insert(attachment);
        Id attId = attachment.Id;
        attId = '00P1o00001XR8rDEAT';
        System.debug('~~ class test ~~~>Id : ' + attId); 
        RestRequest req = new RestRequest(); 
    	RestResponse res = new RestResponse();

    	req.requestURI = 'https:/services/apexrest/AttachmentBLOB';
    	req.httpMethod = 'GET';
        req.params.put('Id', attId);
    	req.addHeader('Content-Type', 'application/json');

    	RestContext.request = req;
    	RestContext.response= res;
   
        WS_AttachmentBLOB.getAttachmentBLOB();        
    }
}