import { LightningElement, track} from 'lwc';
import getRssFeed from '@salesforce/apex/VFC001_RssFeedController.getRssFeed';

export default class Lwc003_RssFeed extends LightningElement {
    mooncardUrl = 'https://blog.mooncard.co/rss.xml';
    @track mooncardRssFeeds;
    @track error;

    connectedCallback(){
        getRssFeed({ url: this.mooncardUrl })
            .then((result) => {
                this.mooncardRssFeeds = result;
                this.error = undefined;
            })
            .catch((error) => {
                this.error = error;
                this.mooncardRssFeeds = undefined;
            });
    } 
}