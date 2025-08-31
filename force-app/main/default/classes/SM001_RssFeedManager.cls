public with sharing class SM001_RssFeedManager {

    public static List<FeedMooncard> getRssFeed(string url) {
        Http h = new Http();
        HttpRequest req = new HttpRequest();
    
        req.setEndpoint(url);
        req.setMethod('GET');
        HttpResponse res = h.send(req);
        Dom.Document doc = res.getBodyDocument();
		System.debug('@' + doc.toXmlString());

        List<FeedMooncard> rssList = new List<FeedMooncard>();

        for(Dom.XmlNode fluxNode: doc.getRootElement().getChildElements()) {
            for(Dom.XmlNode fluxChildNode: fluxNode.getChildElements()) {

				if(fluxChildNode.getName() == 'item') {
					FeedMooncard element = new FeedMooncard();
					for(Dom.XmlNode ce : fluxChildNode.getChildElements()){
						if(ce.getName() == 'title'){
							System.debug('@@@@' + ce.getText());
							element.title = ce.getText();
						}
						if(ce.getName() == 'link'){
							System.debug('@@@@' + ce.getText());
							element.link = ce.getText();
						}
						if(ce.getName() == 'description'){
							System.debug('@@@@' + ce.getText());
							element.description = ce.getText();
							element.image = element.description.substringBetween('<img src="','" alt=');
							element.text = element.description.substringAfter('</div>').stripHtmlTags();
						}
						if(ce.getName() == 'pubDate'){
							System.debug('@@@@' + ce.getText());
							element.pubDate = ce.getText();
						}
					}
					rssList.add(element);
				}
            }
		}

        System.debug('@@@@' + rssList.size());
        return rssList;
    }

	public class FeedMooncard {
		@AuraEnabled
        public String title;
		@AuraEnabled
		public String link;
		@AuraEnabled
		public String description;
		@AuraEnabled
		public String image;
		@AuraEnabled
		public String text;
		@AuraEnabled
		public String pubDate;
    }
}