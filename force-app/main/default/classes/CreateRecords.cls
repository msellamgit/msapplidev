global class CreateRecords {

    public static string retValue = '';
   
    webservice static String ContactsCreateEvent(List<Id> aContactList) {
      
      
      DateTime beginDateTime = DateTime.newInstance(System.TODAY().YEAR(), System.TODAY().MONTH(), System.TODAY().DAY(), 14, 0, 0);
      DateTime endDateTime = DateTime.newInstance(System.TODAY().YEAR(), System.TODAY().MONTH(), System.TODAY().DAY(), 15, 0, 0);

      String retValueError = 'Error Creation Action :';
      retValue = 'TERMINE';
      integer numberAction = 0;
   
      try {
      
          for(Id c : aContactList){
              Event objEvent = new Event();
                objEvent.WhoId = c;
                objEvent.StartDateTime = beginDateTime ;
                objEvent.EndDateTime = endDateTime ;
                objEvent.Subject = 'Meeting 14-15';
                insert objEvent;
                numberAction = numberAction + 1;
         }
         retValue = retValue + ' - ' + numberAction + ' actions créées.';
         return retValue ;   

        } catch (Exception e) {
           return retValueError + e.getMessage();
        }
    }
}