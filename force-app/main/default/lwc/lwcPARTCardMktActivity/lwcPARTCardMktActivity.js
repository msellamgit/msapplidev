import { LightningElement, api } from 'lwc';
import respart from '@salesforce/resourceUrl/res_part';

export default class LwcPARTCardMktActivity extends LightningElement {
    @api activity;
    imgmktact = respart + '/img_service.jpg';
}