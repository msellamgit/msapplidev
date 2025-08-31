import { LightningElement, track, wire } from 'lwc';
import respoc2 from '@salesforce/resourceUrl/res_poc2';
import { CurrentPageReference } from 'lightning/navigation';

export default class Lwc_POC2_StopProcess extends LightningElement {
    @track lg;
    parameters = new Map();
    image_stop = respoc2 + '/roadblock.svg';

    @track lbl_stopprocess_title = 'We can\'t process your application right now ';
    @track lbl_stopprocess_label1 = 'Apologies for the inconvenience, but we are unable to proceed with your application.';

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
        this.lbl_stopprocess_title = param.has('lbl_stopprocess_title') ? param.get('lbl_stopprocess_title') : this.lbl_stopprocess_title; 
        this.lbl_stopprocess_label1 = param.has('lbl_stopprocess_label1') ? param.get('lbl_stopprocess_label1') : this.lbl_stopprocess_label1; 
    }    

}