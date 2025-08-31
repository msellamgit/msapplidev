public class sampleDetailPageAccount {
private List<Contact> ctc;
private Account accont;
public sampleDetailPageAccount(ApexPages.StandardController controller) {
 this.accont=(Account)controller.getRecord();
 }
 public List<Contact> getCtc()
 {
     ctc = [Select id, FirstName, LastName, Title, Phone from Contact where accountid =: accont.Id];
     return ctc;
 }
 public Pagereference editCtc()
 {
     String ctcid= ApexPages.currentPage().getParameters().get('ctcid'); 
     
    return new PageReference('/003/e?id='+ctcid+'&retURL=/003/');
 }
  public Pagereference deleteCtc()
 {
     String ctcid= ApexPages.currentPage().getParameters().get('ctcid'); 
     
     Contact ctc = [Select id from Contact where id =:ctcid limit 1];
     if(ctc !=null && ctc.id !=null){
      delete ctc;
     }
    return null;
 }
}