import { LightningElement, track, wire } from 'lwc';
import respoc2 from '@salesforce/resourceUrl/res_poc2';
import { CurrentPageReference } from 'lightning/navigation';

export default class Lwc_POC2_FeedbackValidate extends LightningElement {
    @track lg;
    parameters = new Map();
    image_email = respoc2 + '/email.svg';
    @track email = '';

    @track lbl_feedbackvalidate_title = 'Nearly there!';
    @track lbl_feedbackvalidate_label1 = 'We have sent an email to {email}.';
    @track lbl_feedbackvalidate_label2 = 'Use the link in the email to confirm your email address.';
    @track lbl_feedbackvalidate_label3 = "Don't forget to check your spam and junk folder.";

    @wire(CurrentPageReference)
    getpageRef(pageRef) {
        for (const key of Object.keys(pageRef.state)) {
            //console.log(key + " -> " + pageRef.state[key])
            if (key == 'lg') { this.lg = pageRef.state[key]; }
            if (key == 'e') { 
                this.email = window.atob(pageRef.state[key]);
            }
        }
        //
    }

    renderedCallback() {
        let param = this.template.querySelector('c-lwc-poc2-language').translatedata('feedback', this.lg);
        this.parameters = param;//'home', 'FR'
        if ( param == null || param == undefined || param.size === 0 ) { return; }

        //console.debug( param[0].name);
        this.lbl_feedbackvalidate_title = this.getparamtranslate(param, 'lbl_feedbackvalidate_title', this.lbl_feedbackvalidate_title );
        let label1 = this.getparamtranslate(param, 'lbl_feedbackvalidate_label1', this.lbl_feedbackvalidate_label1 );
        this.lbl_feedbackvalidate_label2 = this.getparamtranslate(param, 'lbl_feedbackvalidate_label2', this.lbl_feedbackvalidate_label2 );
        this.lbl_feedbackvalidate_label3 = this.getparamtranslate(param, 'lbl_feedbackvalidate_label3', this.lbl_feedbackvalidate_label3 );
        
        this.lbl_feedbackvalidate_label1 = label1.replace('{email}', this.email);
    }  

    getparamtranslate(param, lbl_string , defaulttrad) {
		return param.has(lbl_string) ? param.get(lbl_string) : defaulttrad;
		//return param.has(lbl_string) ? '¤¤¤ ' + param.get(lbl_string) : '???? ';
	}
}