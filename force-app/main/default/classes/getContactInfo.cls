global class getContactInfo {

    WebService Static Contact getContactAdresseByEmail(string ContactEmail) {
        Contact c = [select mailingStreet, mailingCity, mailingPostalCode from COntact where Email = :ContactEmail]; 
        Contact l = new Contact(mailingStreet= c.mailingStreet, mailingCity= c.mailingCity, mailingPostalCode = c.mailingPostalCode );   
        Return l;

    }

}