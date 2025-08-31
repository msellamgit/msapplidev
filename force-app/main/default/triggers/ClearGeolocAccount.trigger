trigger ClearGeolocAccount on Account (Before Update) {
        for (Account a : Trigger.new) {
            if( ( Trigger.oldMap.get(a.Id).BillingStreet !=  Trigger.newMap.get(a.Id).BillingStreet) ||
                  ( Trigger.oldMap.get(a.Id).BillingCity!=  Trigger.newMap.get(a.Id).BillingCity) ||
                  ( Trigger.oldMap.get(a.Id).BillingPostalCode!=  Trigger.newMap.get(a.Id).BillingPostalCode) ||
                  ( Trigger.oldMap.get(a.Id).BillingCountry!=  Trigger.newMap.get(a.Id).BillingCountry)
              )
            {
                a.Geoloc_Latitute__c = '';
                a.Geoloc_Longitute__c= '';
            }
        }
}