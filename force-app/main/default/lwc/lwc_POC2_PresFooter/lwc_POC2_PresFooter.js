import { LightningElement, track, wire, api } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';

export default class Lwc_POC2_PresFooter extends LightningElement {
    @api typeAction = 0;
    @track istypeAction0 = true;
    @track lg = '';
    parameters = new Map();

    @track btnlabel = 'Get started'; 
    @track lbl_presfoot_getstarted = 'Get started';
    @track lbl_presfoot_backuta = 'Back to UTA Website';
    @track lbl_presfoot_resendemail = 'Resend email';

    // connectedCallback() {
    //     if (this.startButton === "true") { this.startButton = true; } 
    //     if (this.startButton ==="false") { this.startButton = false; } 
    // }

    @wire(CurrentPageReference)
    getpageRef(pageRef) {
        for (const key of Object.keys(pageRef.state)) {
            //console.log(key + " -> " + pageRef.state[key])
            if (key == 'lg') { this.lg = pageRef.state[key] }
        }
        //
    }

    renderedCallback() {
        let param = this.template.querySelector('c-lwc-poc2-language').translatedata('presfoot', this.lg);
        this.parameters = param;//'home', 'FR'

        if ( param == null || param == undefined || param.size === 0 ) { return; }
        //console.debug( param[0].name);    
        this.lbl_presfoot_getstarted = this.getparamtranslate(param, 'lbl_presfoot_getstarted', this.lbl_presfoot_getstarted );
        this.lbl_presfoot_backuta = this.getparamtranslate(param, 'lbl_presfoot_backuta', this.lbl_presfoot_backuta );
        this.lbl_presfoot_resendemail = this.getparamtranslate(param, 'lbl_presfoot_resendemail', this.lbl_presfoot_resendemail );

        this.getbtnlabel();
    }

    getparamtranslate(param, lbl_string , defaulttrad) {
		return param.has(lbl_string) ? param.get(lbl_string) : defaulttrad;
		//return param.has(lbl_string) ? '¤¤¤ ' + param.get(lbl_string) : '???? ';
	}

    getbtnlabel() {
        if (this.typeAction == 0) { this.istypeAction0 = true; this.btnlabel = this.lbl_presfoot_getstarted;}
        else if (this.typeAction == 1) { this.istypeAction0 = false; this.btnlabel = this.lbl_presfoot_backuta;}
        else if (this.typeAction == 2) { this.istypeAction0 = false; this.btnlabel = this.lbl_presfoot_resendemail;}
        else { this.istypeAction0 = true; this.btnlabel = this.lbl_presfoot_getstarted;}
    }

    gotosubscription()
    {
        if ( this.typeAction == 2 ) { console.log("resend email"); return; }
        let url = this.typeAction == 0 ? "subscription" + (this.lg != null ? '?lg=' + this.lg : '') : 'https://web.uta.com/';
        //if (this.lg != null) { url = url + '?lg=' + this.lg; }
        window.open(url,"_self"); 
    }

}