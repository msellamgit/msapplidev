@isTest
public class LWC_POC_Test {
    
  static testMethod void testLwcPoc()
  {
	String strData = '{"Salutation":"Mr.","FirstName":".","LastName":"Unknown","LegalForm":"AG","Street":"DDDDDDDDD","City":"DDDDDD","PostalCode":"DDDDDDDDD","Company":"DDDDDDD","Country":"Deutschland","VATNumber":"DDDDDDDDDD","TaxNumber":"DDDDDDDDDD","BundelPreference":"COMPACT","AdditionalServices":"Papierabrechnung ohne Einzelpostennachweis","NbFuelCardRequired":"11","Estimatedfuelconsmonthlitre":"1"}';
    //strData = '{"Salutation":"Mr."}';
    LWC_POC.createLead(strdata);
  }
}