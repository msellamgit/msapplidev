@isTest
public class Report1Controller_Test
{
  static testMethod void testReport1Controller()
  {
      	
      	Account acc1 = new Account (Name = 'Test');
      	insert acc1;
			
      	Opportunity opp1 = new Opportunity(Name = 'Test1', LeadSource = 'Web',  Type = 'New Customer', 
                               StageName = 'Prospecting', CloseDate = System.today() + 3, Amount = 1000 , 
                               AccountId = acc1.Id);
     	insert opp1;
      	Opportunity opp2 = new Opportunity(Name = 'Test2', LeadSource = 'Web',  Type = 'New Customer', 
                               StageName = 'Prospecting', CloseDate = System.today() + 3, Amount = 1000 , 
                               AccountId = acc1.Id);
     	insert opp2;
  
		Report1Controller rp = new Report1Controller();
  }
}