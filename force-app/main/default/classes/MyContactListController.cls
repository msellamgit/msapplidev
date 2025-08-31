public with sharing class MyContactListController {
    @AuraEnabled
	public static List<Contact> getContacts() {
		return [SELECT Id, Name, Email, Title, Phone FROM Contact];
	}
}