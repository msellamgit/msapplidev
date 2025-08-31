import { LightningElement, track, api, wire } from 'lwc';
import respoc from '@salesforce/resourceUrl/res_poc2';
import { CurrentPageReference } from 'lightning/navigation';

export default class LwcPoc2Confirmation extends LightningElement {
    @track lg = '';
    @api account;
    @api package;
    @api cards;
    @api bank;
    
    parameters = new Map();    
    image_formular = respoc + '/formular.svg';
    //@track isshowmore = false;
    @track ckcagreeterm = false;
    @track ckccontactemail = false;
    @track ckcmktcampaign = false;
    @track ckcmktnewsletter = false;
    @track ckcmktsurvey = false;
    @track statuscam = 'PENDING VALIDATION';
    @track lbl_confirm_title = 'Review and confirm your order';
    @track lbl_confirm_info_review = 'We will need to review your application. We will contact you by email as soon as the review is complete.';
    @track lbl_confirm_info_moreinfo = "For more information on the processing of your personal data, please view our <a style='color: black; text-decoration: underline;' href='https://web.uta.com/datenschutzerklaerung' target=''>data protection information</a>.";
    @track lbl_confirm_title_personal = 'Personal & company details';
    @track lbl_confirm_ckc_agreeterm = "I agree to the <a style='color: black; text-decoration: underline;' href='https://web.uta.com/agb' target='_blank'>Terms & Conditions</a> and to the <a  style='color: black; text-decoration: underline;' href='https://web.uta.com/fileadmin/user_upload/pdf-files/avv_uta_mobilitaetsdienstleistungen.pdf' target='_blank'>Data Processing Agreement</a>";
    @track lbl_confirm_ckc_contactemail = "I'm happy for UTA to contact me by email (optional)";
    @track lbl_confirm_title_card = 'Cards & monthly spend';
    @track lbl_confirm_msg_showmore = 'Show more';
    @track lbl_confirm_msg_showLESS = 'Show less'; // GERER TRAD
    @track lbl_confirm_ckc_keepoffers = 'Keep me updated about new UTA products and offers';
    @track lbl_confirm_ckc_sendnews = 'Send me the UTA newsletter';
    @track lbl_confirm_ckc_sendsurveys = 'Send me surveys and feedback opportunities to help improve myUTA services';
    @track lbl_confirm_status_pending = 'PENDING VALIDATION';
    @track lbl_confirm_btn_edit = 'Edit';
    @track lbl_confirm_title_package = 'Package';
    @track lbl_confirm_title_bank = 'Bank details';
    @track lbl_confirm_label_1month = '1 month free';
    @track lbl_confirm_label_299 = 'then 2.99€ per card per month';
    @track lbl_confirm_label_12months = '12 months free';
    @track lbl_confirm_label_075 = 'then 0,75€ per card per month';
    @track lbl_confirm_label_drivercard = 'driver card';
    @track lbl_confirm_label_vehiclecard = 'vehicle card';
    @track lbl_confirm_label_cardordered = 'card ordered today';
    @track lbl_confirm_label_drivercard_pl = 'drivers cards';
    @track lbl_confirm_label_vehiclecard_pl = 'vehicles cards';
    @track lbl_confirm_label_cardordered_pl = 'cards ordered today';

    @track __val_ctc_fullname = '';
    @track __val_ctc_email = '';
    @track __val_ctc_phone = '';
    @track __val_acc_name = '';
    @track __val_acc_adr1 = '';
    @track __val_acc_Adr2 = '';
    @track __val_pck_name = '';
    @track __val_pck_lbl1 = '';
    @track __val_pck_lbl2 = '';
    @track __val_bnk_name = ''; 
    @track __val_bnk_iban = '';
    @track __val_crd_nbcards = '';
    @track __val_crd_details = '';
    @track __val_crd_amount = '';

    @wire(CurrentPageReference)
    getpageRef(pageRef) {
        for (const key of Object.keys(pageRef.state)) {
            //console.log(key + " -> " + pageRef.state[key])
            if (key == 'lg') { this.lg = pageRef.state[key] }
        }
    }

    connectedCallback() {
        // if ((this.bank).length == 4) {
        //     this.entryIban = this.bank[0]; 
        //     this.entryAccountName = this.bank[1]; 
        //     this.entryBankName = this.bank[2]; 
        //     this.entryBic = this.bank[3]; 
        // }
    }

    renderedCallback() {
        let param = this.template.querySelector('c-lwc-poc2-language').translatedata('confirmation', this.lg);
        const container = this.template.querySelector('.clsconfirmckcagreeterm'); 
        const container1 = this.template.querySelector('.clsconfirminfo'); 

        this.parameters = param;
        if ( param == null || param == undefined || param.size === 0 ) { 
            container.innerHTML = this.lbl_confirm_ckc_agreeterm;   
            container1.innerHTML = this.lbl_confirm_info_moreinfo;             
            return; 
        }
        //console.debug( param[0].name);     
        this.lbl_confirm_title  = this.getparamtranslate(param, 'lbl_confirm_title', this.lbl_confirm_title );
        this.lbl_confirm_info_review  = this.getparamtranslate(param, 'lbl_confirm_info_review', this.lbl_confirm_info_review );
        this.lbl_confirm_info_moreinfo  = this.getparamtranslate(param, 'lbl_confirm_info_moreinfo', this.lbl_confirm_info_moreinfo );
        this.lbl_confirm_title_personal  = this.getparamtranslate(param, 'lbl_confirm_title_personal', this.lbl_confirm_title_personal );
        this.lbl_confirm_ckc_agreeterm  = this.getparamtranslate(param, 'lbl_confirm_ckc_agreeterm', this.lbl_confirm_ckc_agreeterm );
        this.lbl_confirm_ckc_contactemail  = this.getparamtranslate(param, 'lbl_confirm_ckc_contactemail', this.lbl_confirm_ckc_contactemail );
        this.lbl_confirm_title_card  = this.getparamtranslate(param, 'lbl_confirm_title_card', this.lbl_confirm_title_card );
        this.lbl_confirm_msg_showmore  = this.getparamtranslate(param, 'lbl_confirm_msg_showmore', this.lbl_confirm_msg_showmore );
        this.lbl_confirm_msg_showless  = this.getparamtranslate(param, 'lbl_confirm_msg_showless', this.lbl_confirm_msg_showless );
        this.lbl_confirm_ckc_keepoffers  = this.getparamtranslate(param, 'lbl_confirm_ckc_keepoffers', this.lbl_confirm_ckc_keepoffers );
        this.lbl_confirm_ckc_sendnews  = this.getparamtranslate(param, 'lbl_confirm_ckc_sendnews', this.lbl_confirm_ckc_sendnews );
        this.lbl_confirm_ckc_sendsurveys  = this.getparamtranslate(param, 'lbl_confirm_ckc_sendsurveys', this.lbl_confirm_ckc_sendsurveys );
        this.lbl_confirm_btn_edit  = this.getparamtranslate(param, 'lbl_confirm_btn_edit', this.lbl_confirm_btn_edit );
        this.lbl_confirm_title_package  = this.getparamtranslate(param, 'lbl_confirm_title_package', this.lbl_confirm_title_package );
        this.lbl_confirm_title_bank  = this.getparamtranslate(param, 'lbl_confirm_title_bank', this.lbl_confirm_title_bank );
        this.lbl_confirm_label_1month  = this.getparamtranslate(param, 'lbl_confirm_label_1month', this.lbl_confirm_label_1month );
        this.lbl_confirm_label_299  = this.getparamtranslate(param, 'lbl_confirm_label_299', this.lbl_confirm_label_299 );
        this.lbl_confirm_label_12months  = this.getparamtranslate(param, 'lbl_confirm_label_12months', this.lbl_confirm_label_12months );
        this.lbl_confirm_label_075  = this.getparamtranslate(param, 'lbl_confirm_label_075', this.lbl_confirm_label_075 );
        this.lbl_confirm_label_requested  = this.getparamtranslate(param, 'lbl_confirm_label_requested', this.lbl_confirm_label_requested );

        let status_pending  = this.getparamtranslate(param, 'lbl_confirm_status_pending', this.lbl_confirm_status_pending );
    
        this.lbl_confirm_status_pending = status_pending;
        this.statuscam = status_pending;

        container.innerHTML = this.getparamtranslate(param, 'lbl_confirm_ckc_agreeterm', this.lbl_confirm_ckc_agreeterm );
        container1.innerHTML = this.getparamtranslate(param, 'lbl_confirm_info_moreinfo', this.lbl_confirm_info_moreinfo );        
        this.updatevaluesform();
    }

    updatevaluesform() {
        //console.log(JSON.stringify(this.account));
        //console.log(JSON.stringify(this.package));
        //console.log(JSON.stringify(this.bank));
        //console.log(JSON.stringify(this.cards));
        
        this.__val_ctc_fullname = this.account[0] + ' ' + this.account[1];
        this.__val_ctc_email = this.account[2];
        this.__val_ctc_phone = this.account[3];
        this.__val_acc_name = this.account[5];
        this.__val_acc_adr1 = this.account[6];
        this.__val_acc_Adr2 = this.account[4] + ' ' + this.account[8];
        this.__val_bnk_name = this.bank[1]; 
        this.__val_bnk_iban = this.bank[0];
        if (!this.cards[1]) { return; }

        this.__val_crd_nbcards = this.cards[1].length + ' ' + ( this.cards[1].length > 1 ? this.lbl_confirm_label_cardordered_pl  : this.lbl_confirm_label_cardordered ); 

        //@track __val_crd_nbcards = '2 cards ordered today';
        //@track __val_crd_details = '1 driver card, 1 vehicle card';

        //console.log('--- CARDS ----');
        //console.log(JSON.stringify(this.cards));
        //console.log(String(this.cards[1]));
        
        this.__val_crd_amount = this.cards[3] + this.lbl_confirm_label_requested;
        let drivercard = true;
        let nbdrivercard = 0;
        let nbvehiclecard = 0;
        for( var i = 0; i < this.cards[1].length; i++){ 
            //console.log(JSON.stringify(this.cards[1][i]));
            drivercard = this.cards[1][i].isdrivercard;
            if (drivercard) { nbdrivercard = nbdrivercard + 1; }
            else { nbvehiclecard = nbvehiclecard + 1; }
        }
        if ( nbdrivercard > 0 && nbvehiclecard > 0 ) {
            this.__val_crd_details = nbdrivercard + ' ' + (nbdrivercard > 1 ? this.lbl_confirm_label_drivercard_pl : this.lbl_confirm_label_drivercard) + ', ' + nbvehiclecard +  ' ' + (nbvehiclecard > 1 ? this.lbl_confirm_label_vehiclecard_pl : this.lbl_confirm_label_vehiclecard);
        } else if ( nbdrivercard > 0 ) {
            this.__val_crd_details = nbdrivercard + ' ' + (nbdrivercard > 1 ? this.lbl_confirm_label_drivercard_pl : this.lbl_confirm_label_drivercard);
        } else if ( nbvehiclecard > 0 ) {
            this.__val_crd_details = nbvehiclecard + ' ' + (nbvehiclecard > 1 ? this.lbl_confirm_label_vehiclecard_pl : this.lbl_confirm_label_vehiclecard);
        } 

        this.__val_pck_name = this.package[1];
        if (this.package[0] === 2) { 
            this.__val_pck_lbl1 = this.lbl_confirm_label_1month;
            this.__val_pck_lbl2 = this.lbl_confirm_label_299;            
        } else if ( this.package[0] === 1 )
        {
            this.__val_pck_lbl1 = this.lbl_confirm_label_12months;
            this.__val_pck_lbl2 = this.lbl_confirm_label_075;  
        } else 
        {
            this.__val_pck_lbl1 = '';
            this.__val_pck_lbl2 = '';  
        }
    }

    getparamtranslate(param, lbl_string , defaulttrad) {
		return param.has(lbl_string) ? param.get(lbl_string) : defaulttrad;
		//return param.has(lbl_string) ? param.get(lbl_string) : '?????????';
	}

    entrychange(e) {
        console.log('PASS ENTRY CHANGE');
        console.log(e.target.name);
        
        if ( e.target.name === 'checkagree' ) {
            console.log('PASS CHECKED');
            this.ckcagreeterm = e.target.checked; 
            this.activatebtnparentnext();    
        }
        else if ( e.target.name === 'checkcontact' ) {
            this.ckccontactemail = e.target.checked;
            this.ckcmktcampaign = e.target.checked;
            this.ckcmktnewsletter = e.target.checked;
            this.ckcmktsurvey = e.target.checked;
        }
        else if ( e.target.name === 'checkmktcampaign' ) {
            this.ckcmktcampaign = e.target.checked;
        }
        else if ( e.target.name === 'checkmktnewsletter' ) {
            this.ckcmktnewsletter = e.target.checked;
        }
        else if ( e.target.name === 'checkmktsurvey' ) {    
            this.ckcmktsurvey = e.target.checked;
        }
    }

    @api loaddata(data) {
        //console.log('pass loaddata');
        //console.log(JSON.stringify(data));
        this.account = data[0].account;
        this.package = data[0].package;
        this.bank = data[0].bank;
        this.cards = data[0].cards;        
        this.updatevaluesform();
    }

    activatebtnparentnext() {
        console.log('PASS activatebtnparentnext');    
        let ev = new CustomEvent('parentnext', {detail :{ toactivate: this.ckcagreeterm } } );
        this.dispatchEvent(ev);    
    }

    /*
    clickshowmore()
    {
        if (this.isshowmore) 
             this.isshowmore = false;
        else
            this.isshowmore = true;
    }
    

    agreeclick(e) {
        this.ckcagreeterm = e.target.checked; 
        this.activatebtnparentnext(); 
    }
    
    confirmcontactclick(e) {
        this.ckccontactemail = e.target.checked; 
        this.ckcmktcampaign = e.target.checked;
        this.ckcmktnewsletter = e.target.checked;
        this.ckcmktsurvey = e.target.checked;
        this.activatebtnparentnext(); 
    }
    */

    @api getConfirmation() {
        let confirm = [ this.ckcagreeterm, this.ckcmktcampaign, this.ckcmktnewsletter, this.ckcmktsurvey ];
        return confirm; 
    }

    editcompany()
    {
        let ev = new CustomEvent('maingotostep', { detail:  { step: 2 } } );
        this.dispatchEvent(ev);            
    }

    editpackage()
    {
        let ev = new CustomEvent('maingotostep', { detail:  { step: 1 } } );
        this.dispatchEvent(ev);
    }

    editbank()
    {
        let ev = new CustomEvent('maingotostep', { detail:  { step: 4 } } );
        this.dispatchEvent(ev);        
    }

    editcard() {
        let ev = new CustomEvent('maingotostep', { detail:  { step: 3 } } );
        this.dispatchEvent(ev);            
    }
}