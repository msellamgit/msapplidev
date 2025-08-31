global class JSONTest {
	string test;
    global JSONTest ()
    {
    }
    
    public sdrInput ConvertString (string dataToParse)
    {    
        sdrInput r = (sdrInput) JSON.deserializeStrict( dataToParse, sdrInput.class);
        
    	return r;           
    }
        
    public static Map<Integer, String> convertSingleStringIntoMultipartString(String inputString){
        Map<Integer, String> resultingList = new Map<Integer, String>();
        String jsonMultiDelimiter = '},';
        String jsonMultiJoiner = '}';
        String jsonMultiStarter = '{';

        String inputStringCleaned;
        inputStringCleaned = cleanJSON(inputString);

        if(!String.isBlank(inputStringCleaned)){

            List<String> initialStringA = inputStringCleaned.split(jsonMultiDelimiter);

            List<String> tempListHldr = new List<String>();
            List<String> tempList2Hldr = new List<String>();

            for(String s1 : initialStringA){
                tempListHldr.add(s1 += jsonMultiDelimiter);
            }

            for(String s2 : tempListHldr){
                tempList2Hldr.add(jsonMultiStarter + s2.substringBetween(jsonMultiStarter, jsonMultiJoiner) + jsonMultiJoiner);
            }

            Integer ind = 0;
            for(String s3 : tempList2Hldr){
                resultingList.put(ind, s3);
                ind++;
            }

            //System.debug('step2 ~~~~> ' + step2);

        } else {
            resultingList = null;
        }

 

        System.debug('resultingList ~~~~> ' + resultingList);

        return resultingList;

    }
    
    
   public static String cleanJSON(String inputJSONString){
        //do clean here to convert into good json

        //we escape single quotes if need be
        inputJSONString = String.escapeSingleQuotes(inputJSONString);

        //we filter out newlines and replace them with nothing
        inputJSONString = inputJSONString.replace('\r\n','');
 
        return inputJSONString;
    }    
    
    global class sdrInput {
        global  String  Adresse                     { get; set; }
        global  String  Campagne                    { get; set; }
        global  String  Civilite                    { get; set; }
        global  String  CompteEnLigne               { get; set; }
    }
}