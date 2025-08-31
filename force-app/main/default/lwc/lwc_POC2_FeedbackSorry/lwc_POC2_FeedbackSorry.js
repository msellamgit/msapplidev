import { LightningElement, track, wire } from 'lwc';
import respoc2 from '@salesforce/resourceUrl/res_poc2';
import { CurrentPageReference } from 'lightning/navigation';

export default class Lwc_POC2_FeedbackSorry extends LightningElement {
    @track lg;
    parameters = new Map();
    image_cards = respoc2 + '/cards.svg';

    @track lbl_feedbacksorry_title = 'Thanks for your interest';
    @track lbl_feedbacksorry_label = 'Click on the button below to discover other UTA solutions that could fit your needs';

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
        this.lbl_feedbacksorry_title = param.has('lbl_feedbacksorry_title') ? param.get('lbl_feedbacksorry_title') : this.lbl_feedbacksorry_title; 
        this.lbl_feedbacksorry_label = param.has('lbl_feedbacksorry_label') ? param.get('lbl_feedbacksorry_label') : this.lbl_feedbacksorry_label;         
    }    
}