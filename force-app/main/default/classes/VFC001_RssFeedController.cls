public with sharing class VFC001_RssFeedController {

    @AuraEnabled(cacheable=true)
    public static List<SM001_RssFeedManager.FeedMooncard> getRssFeed(string url) {
        return SM001_RssFeedManager.getRssFeed(url);
    }
}