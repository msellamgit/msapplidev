import { LightningElement, track, wire } from 'lwc';
import respoc2 from '@salesforce/resourceUrl/res_poc2';
import { CurrentPageReference } from 'lightning/navigation';

export default class Lwc_POC2_FeedbackRequest extends LightningElement {
    @track lg;
    parameters = new Map();
    image_phone = respoc2 + '/phone.svg';

    @track lbl_feedbackrequest_title = 'Your request has been received';
    @track lbl_feedbackrequest_label1 = 'You will be contacted by our sales team to find the right offer for your needs.';
    @track lbl_feedbackrequest_label2 = 'View our offer for more larger fleet here';

    @wire(CurrentPageReference)
    getpageRef(pageRef) {
        for (const key of Object.keys(pageRef.state)) {
            //console.log(key + " -> " + pageRef.state[key])
            if (key == 'lg') { this.lg = pageRef.state[key] }
        }
        //
    }

    renderedCallback() {
        let param = this.template.querySelector('c-lwc-poc2-language').translatedata('feedback', this.lg);
        this.parameters = param;//'home', 'FR'
        if ( param == null || param == undefined || param.size === 0 ) { return; }

        //console.debug( param[0].name);
        this.lbl_feedbackrequest_title = param.has('lbl_feedbackrequest_title') ? param.get('lbl_feedbackrequest_title') : this.lbl_feedbackrequest_title; 
        this.lbl_feedbackrequest_label1 = param.has('lbl_feedbackrequest_label1') ? param.get('lbl_feedbackrequest_label1') : this.lbl_feedbackrequest_label1; 
        this.lbl_feedbackrequest_label2 = param.has('lbl_feedbackrequest_label2') ? param.get('lbl_feedbackrequest_label2') : this.lbl_feedbackrequest_label2; 
    }    
}