//    https://workbench.developerforce.com
//    Rest Explorer
//    GET
//    /services/apexrest/project_mse/AttachmentBLOB?Id=00P2400000Fl0vI
//    Header
//    Content-Type: application/json; charset=UTF-8
//    Accept: application/json
//
@RestResource(urlMapping='/AttachmentBLOB/*')

global with sharing class WS_AttachmentBLOB {    
    global class ReponseWS{
        webservice String attBlob;
    }

    @HttpGet
    webservice static ReponseWS getAttachmentBLOB(){
        System.debug('~~~~~>WS_AttachmentBLOB'); 

        String attId = RestContext.request.params.get('Id');
        System.debug('~~~~~>Id : ' + attId); 
        if(!String.isBlank(attId)){
            blob b = [select body from Attachment where Id = :attId LIMIT 1].body;
            String s = EncodingUtil.base64Encode(b);
            WS_AttachmentBLOB.ReponseWS response = new WS_AttachmentBLOB.ReponseWS();
            response.attBlob = s;
            return response;
        } else {
            return null;
        }
    }
}