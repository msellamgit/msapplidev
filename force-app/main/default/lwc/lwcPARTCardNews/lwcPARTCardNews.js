import { LightningElement, api } from 'lwc';
import respart from '@salesforce/resourceUrl/res_part';

export default class LwcPARTCardNews extends LightningElement {
    @api news;
    imgnewscard = respart + '/img_woman_card.jpg';
}