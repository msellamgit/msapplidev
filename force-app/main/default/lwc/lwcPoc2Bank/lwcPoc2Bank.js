import { LightningElement, track, api, wire } from 'lwc';
import respoc from '@salesforce/resourceUrl/res_poc2';
import checkIban from '@salesforce/apex/LWC_POC2.checkIban';
import { CurrentPageReference } from 'lightning/navigation';

export default class LwcPoc2Bank extends LightningElement {
    @api bank;
    @api account;
    @track lg = '';
    parameters = new Map();    
    image_formular = respoc + '/formular.svg';
    isrenderdone = false;
    @track ibanvalid = false;
    @track confirmationdatelabel = null;
    @track confirmationdatevalue = null;
    @track issepamandate = false;
    @track toactivateparentnext = false;
    @track entryIban = null;
    @track entryAccountName = null;
    @track entryBankName = null;
    @track entryBic = null;
    @track checkautoedit = false;
    @track lbl_bank_title = 'Bank details';
    @track lbl_bank_title_sepa = 'SEPA direct debit mandate';
    @track lbl_bank_subtitle_company = 'DEBITOR COMPANY INFORMATION';
    @track lbl_bank_subtitle_bank = 'DEBITOR BANKING DETAILS';
    @track lbl_bank_subtitle_creditor = 'CREDITOR INFORMATION';
    @track lbl_bank_msg_sepa = 'In order to create your SEPA mandate and set up a direct debit mandate, we need your bank details.';
    @track lbl_bank_fld_iban = 'IBAN';
    @track lbl_bank_fld_bankname = 'Bank Name';
    @track lbl_bank_fld_accountiban = 'Account number (IBAN)';
    @track lbl_bank_fld_bic = 'BIC';
    @track lbl_bank_fld_accountname = 'Account Name';
    @track lbl_bank_info_invoice = 'You will receive the invoices twice a month.';
    @track lbl_bank_msg_sepa1 = 'By signing this mandate form you authorise (A) UNION TANK Eckstein GmbH & Co. KG to send instructions to your bank to debit your account and (B) your bank to debit your account in accordance with the instructions from UNION TANK Eckstein GmbH & Co. KG.';
    @track lbl_bank_msg_sepa2 = 'As part of your rights, you are entitled to a refund under the terms and conditions of your agreement with your bank. A refund must be claimed within 8 weeks starting from the date on which your account was debited.';
    @track lbl_bank_fld_creditname = 'Creditor name';
    @track lbl_bank_fld_creditidentifier = 'Credit identifier';
    @track lbl_bank_fld_creditaddress = 'Credit address';
    @track lbl_bank_fld_typepayement = 'Type of payment';    
    @track lbl_bank_fld_mandatref = 'Mandate reference';    
    @track lbl_bank_lbl_busname = 'Business Name';
    @track lbl_bank_lbl_busaddress = 'Business Address';
    @track lbl_bank_ckc_authorisepayement = "I authorise UTA to collect payments from my account by direct debit."; 
    //I declare that I have the legal authority to act on behalf of my company and to enter into this agreement.
    @track lbl_bank_plh_namebank = 'Your bank name'; 
    @track lbl_bank_msg_checkiban = 'Please check the IBAN'; 
    @track valcompanyname = '';
    @track valcompanyad1 = '';
    @track valcompanyad2 = '';
    @track valcompanycity = '';
    @track valcreditorname = 'UNION TANK Eckstein GmbH & Co. K';
    @track valcreditoridentifier = 'DE06UTA00000010046';
    @track valcreditorad1 = 'Heinrich-Eckstein-Str. 1';
    @track valcreditorad2 = '63801 Kleinostheim / Main, Germany';
    
    @track valtypepayement = 'Recurrent';
    @track valmandatref = 'We will provide you with mandate reference by email';

    @wire(CurrentPageReference)
    getpageRef(pageRef) {
        for (const key of Object.keys(pageRef.state)) {
            //console.log(key + " -> " + pageRef.state[key])
            if (key == 'lg') { this.lg = pageRef.state[key] }
        }
    }

    connectedCallback() {
        this.putinfoBank();
    }

    putinfoBank() {
        if ((this.bank).length == 6) {
            this.entryIban = this.bank[0]; 
            this.entryAccountName = this.bank[1]; 
            this.entryBankName = this.bank[2]; 
            this.entryBic = this.bank[3];
            this.confirmationdatevalue = this.bank[4];
            this.ibanvalid = this.bank[5];
        }
        if (this.confirmationdatevalue != null) { 
            this.checkautoedit = true; 
                let confirmationdate = this.confirmationdatevalue; 
                this.confirmationdatevalue = confirmationdate;
                this.confirmationdatelabel = this.account[8] + ", " + confirmationdate.getDate() + "/"
                                + (confirmationdate.getMonth()+1)  + "/" 
                                + confirmationdate.getFullYear() + ", "  
                                + confirmationdate.getHours() + ":"  
                                + confirmationdate.getMinutes();
        }
    }

    renderedCallback() {

        let param = this.template.querySelector('c-lwc-poc2-language').translatedata('bank', this.lg);
        this.parameters = param;//'home', 'FR'
        if ( param == null || param == undefined || param.size === 0 ) { return; }
        //console.debug( param[0].name);
        this.lbl_bank_title  = this.getparamtranslate(param, 'lbl_bank_title', this.lbl_bank_title );
        this.lbl_bank_title_sepa  = this.getparamtranslate(param, 'lbl_bank_title_sepa', this.lbl_bank_title_sepa );
        this.lbl_bank_subtitle_company  = this.getparamtranslate(param, 'lbl_bank_subtitle_company', this.lbl_bank_subtitle_company );
        this.lbl_bank_subtitle_bank  = this.getparamtranslate(param, 'lbl_bank_subtitle_bank', this.lbl_bank_subtitle_bank );
        this.lbl_bank_subtitle_creditor  = this.getparamtranslate(param, 'lbl_bank_subtitle_creditor', this.lbl_bank_subtitle_creditor );
        this.lbl_bank_msg_sepa  = this.getparamtranslate(param, 'lbl_bank_msg_sepa', this.lbl_bank_msg_sepa );
        this.lbl_bank_fld_iban  = this.getparamtranslate(param, 'lbl_bank_fld_iban', this.lbl_bank_fld_iban );
        this.lbl_bank_fld_bankname  = this.getparamtranslate(param, 'lbl_bank_fld_bankname', this.lbl_bank_fld_bankname );
        this.lbl_bank_fld_accountiban  = this.getparamtranslate(param, 'lbl_bank_fld_accountiban', this.lbl_bank_fld_accountiban );
        this.lbl_bank_fld_bic  = this.getparamtranslate(param, 'lbl_bank_fld_bic', this.lbl_bank_fld_bic );
        this.lbl_bank_fld_accountname  = this.getparamtranslate(param, 'lbl_bank_fld_accountname', this.lbl_bank_fld_accountname );
        this.lbl_bank_info_invoice  = this.getparamtranslate(param, 'lbl_bank_info_invoice', this.lbl_bank_info_invoice );
        this.lbl_bank_msg_sepa1  = this.getparamtranslate(param, 'lbl_bank_msg_sepa1', this.lbl_bank_msg_sepa1 );
        this.lbl_bank_msg_sepa2  = this.getparamtranslate(param, 'lbl_bank_msg_sepa2', this.lbl_bank_msg_sepa2 );
        this.lbl_bank_fld_creditname  = this.getparamtranslate(param, 'lbl_bank_fld_creditname', this.lbl_bank_fld_creditname );
        this.lbl_bank_fld_creditidentifier  = this.getparamtranslate(param, 'lbl_bank_fld_creditidentifier', this.lbl_bank_fld_creditidentifier );
        this.lbl_bank_fld_creditaddress  = this.getparamtranslate(param, 'lbl_bank_fld_creditaddress', this.lbl_bank_fld_creditaddress );
        this.lbl_bank_fld_typepayement  = this.getparamtranslate(param, 'lbl_bank_fld_typepayement', this.lbl_bank_fld_typepayement );
        this.lbl_bank_fld_mandatref  = this.getparamtranslate(param, 'lbl_bank_fld_mandatref', this.lbl_bank_fld_mandatref );
        this.lbl_bank_lbl_busname  = this.getparamtranslate(param, 'lbl_bank_lbl_busname', this.lbl_bank_lbl_busname );
        this.lbl_bank_lbl_busaddress  = this.getparamtranslate(param, 'lbl_bank_lbl_busaddress', this.lbl_bank_lbl_busaddress );
        this.lbl_bank_ckc_authorisepayement  = this.getparamtranslate(param, 'lbl_bank_ckc_authorisepayement', this.lbl_bank_ckc_authorisepayement );
        this.lbl_bank_plh_namebank = this.getparamtranslate(param, 'lbl_bank_plh_namebank', this.lbl_bank_plh_namebank );
        this.lbl_bank_msg_checkiban = this.getparamtranslate(param, 'lbl_bank_msg_checkiban', this.lbl_bank_msg_checkiban ); 

        if ((this.account).length != 0) {
            this.valcompanyname = this.account[5]; 
            this.valcompanyad1 = this.account[6]; 
            this.valcompanyad2 = this.account[4] + ' ' + this.account[8]; 
            this.valcompanycity = this.account[8];
        }

        /*
        if (!this.isrenderdone) { 
            this.entryBic = 'XXXXXXXXXX';
            this.entryBankName = this.getparamtranslate(param, 'lbl_bank_plh_namebank', this.lbl_bank_plh_namebank );
        }
        this.isrenderdone = true;
        */
        if (this.entryBic == null || this.entryBic == '') { this.entryBic = 'XXXXXXXXXX'; }
        if (this.entryBankName == null || this.entryBankName == '') { this.entryBankName = this.getparamtranslate(param, 'lbl_bank_plh_namebank', this.lbl_bank_plh_namebank ); }
    }

    @api loaddata(data) {
        this.bank = data[0].bank;
        this.putinfoBank();
    }
    getparamtranslate(param, lbl_string , defaulttrad) {
		return param.has(lbl_string) ? param.get(lbl_string) : defaulttrad;
		//return param.has(lbl_string) ? param.get(lbl_string) : '?????????';
	}

    entryChange(e) {
        if (e.target.name === 'entryIban') { 
            this.entryIban = (e.target.value).toUpperCase();
            if ((e.target.value).length > 17) { this.checkibanvalidity() };
        }
        if (e.target.name === 'entryAccountName') { 
            this.entryAccountName = e.target.value; 
            this.buttonactivation();
        }
    }

    buttonactivation() {
        if (!this.issepamandate) {
            this.toactivateparentnext = this.ibanvalid && ( this.entryIban == null ? '' : this.entryIban  ).replaceAll('', '').length != 0 && ( this.entryAccountName == null ? '' : this.entryAccountName).replaceAll('', '').length != 0;
        }
        this.activatebtnparentnext();    
    }

    selectautodebit(event) {
        //console.log(event);
        this.checkautoedit = event.target.checked;
        this.toactivateparentnext = event.target.checked;

        this.confirmationdatelabel = null;
        this.confirmationdatevalue = null;
        
        if (event.target.checked) {
            let currentdate = new Date(); 
            this.confirmationdatevalue = currentdate;
            this.confirmationdatelabel = this.valcompanycity + ", " + currentdate.getDate() + "/"
                            + (currentdate.getMonth()+1)  + "/" 
                            + currentdate.getFullYear() + ", "  
                            + currentdate.getHours() + ":"  
                            + currentdate.getMinutes();
        }

        this.activatebtnparentnext();           
    }

    selectAthpayement(e) {
        this.toactivateparentnext = e.target.checked;
        this.activatebtnparentnext();   
    }

    @api getBank() {
        let bank = [ this.entryIban, this.entryAccountName, this.entryBankName, this.entryBic, this.confirmationdatevalue, this.ibanvalid ];
        return bank;
    }

    @api getsepamandate() {
        return this.issepamandate;
    }

    @api setsepamandatetrue() {
        this.issepamandate = true;
    }

    @api setsepamandatefalse() {
        this.issepamandate = false;
    }

    activatebtnparentnext() {
        let ev = new CustomEvent('parentnext', {detail :{ toactivate: this.toactivateparentnext } } );
        this.dispatchEvent(ev);    
    }

    checkibanvalidity() {

        checkIban ( { codeiban: this.entryIban } )  
        .then(result => {
            let inputIban = this.template.querySelector('.inputIban');
            if (result.code === '100') {
                this.ibanvalid = result.ibaninfo.valid;
                if (result.ibaninfo.valid) {
                    console.log(result.ibaninfo)
                    inputIban.setCustomValidity('');
                    this.entryBankName = result.ibaninfo.bankname;
                    console.log('BANK NAME');
                    console.log(result.ibaninfo.bankname);
                    console.log((result.ibaninfo.bankname).length);
                    if((result.ibaninfo.bankname).length > 50) this.entryBankName = (result.ibaninfo.bankname).substring(0,50);
                    this.entryBic = result.ibaninfo.bankbic;
                    inputIban.reportValidity();
                } else {
                    inputIban.setCustomValidity(this.lbl_bank_msg_checkiban);
                    this.entryBankName = this.lbl_bank_plh_namebank;
                    this.entryBic = 'XXXXXXXXXX';
                    inputIban.reportValidity();
                }
                this.buttonactivation();
                console.log('SUCCESS : CHECK IBAN');
            } else {
                //this.spinnerhide();
                console.log('error 200 - CHECK IBAN - ' + result.message);
                console.log(result);
                              
            }
        })
        .catch(error => {
            console.log('error - CHECK IBAN');
            console.log('ERROR : ' + this.reduceErrors(error).join(', '));
            return;
        });        
    }

    reduceErrors(errors) {
        if (!Array.isArray(errors)) {
            errors = [errors];
        }
    
        return (
            errors
                // Remove null/undefined items
                .filter(error => !!error)
                // Extract an error message
                .map(error => {
                    // UI API read errors
                    if (Array.isArray(error.body)) {
                        return error.body.map(e => e.message);
                    }
                    // UI API DML, Apex and network errors
                    else if (error.body && typeof error.body.message === 'string') {
                        return error.body.message;
                    }
                    // JS errors
                    else if (typeof error.message === 'string') {
                        return error.message;
                    }
                    // Unknown error shape so try HTTP status text
                    return error.statusText;
                })
                // Flatten
                .reduce((prev, curr) => prev.concat(curr), [])
                // Remove empty strings
                .filter(message => !!message)
        );
    }

}