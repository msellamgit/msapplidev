import { LightningElement, track, api, wire } from 'lwc';
import respoc from '@salesforce/resourceUrl/res_poc2';
import { loadScript } from 'lightning/platformResourceLoader';
import libPhoneNumber from '@salesforce/resourceUrl/res_poc2_checkphone';
import searchAccount from '@salesforce/apex/LWC_POC2.searchAccountFirm';
import checkVATNumber from '@salesforce/apex/LWC_POC2.checkVATNumber';
import { CurrentPageReference } from 'lightning/navigation';

export default class LwcPoc2Account extends LightningElement {
    @api account;
    @track lg = '';
    @track valtrue = true;
    @track dataisloaded = false;
    // listext = [{country: 'fr', num: "33", label: '+33'}, 
    //                 {country: 'gb', num: "44", label: '+44'}, 
    //                 {country: 'de', num: "49", label: '+49'},
    //                 {country: 'dk', num: "45", label: '+45'},
    //                 {country: 'fi', num: "358", label: '+358'},
    //                 {country: 'li', num: "352", label: '+352'},
    //                 {country: 'nl', num: "31", label: '+31'},
    //                 {country: 'no', num: "47", label: '+47'},
    //                 {country: 'es', num: "34", label: '+34'},
    //                 {country: 'se', num: "46", label: '+46'},
    //                 {country: 'ch', num: "41", label: '+41'}
    //             ];
    // listextstyle = [];
    // strlstextstyle = '';
    
    @track isconnected = false;
    phoneUtil;
    @track extentionphone = 'de';
    @track extentionnum = '49';
    parameters = new Map();    
    @track showlistaccount = false;
    @track showinfovat = false;
    @track showbuttonfind = true;
    @track isLoaded = true;
    imagedetail = respoc + '/details.svg';
    flagfr = respoc + '/flagfr.jpg';
    flagdutch = respoc + '/flagdutch.jpg';
    flagblg = respoc + '/flagblg.jpg';
    
    @track flags = 'url(' + respoc + '/flags.png)';
    @track srcflags = respoc + '/flags.png';

    @track entryFirstName = null;
    @track entryAccountName = null;
    @track entryLastName = null;
    @track entryEmailconfirm = null;
    @track entryEmail = null;
    @track entryPhone = null;
    @track entrySalutation = null;
    @track entryStreetName = null;
    @track entryCity = null;   
    @track entryVat = null;   
    @track entryTax = null;   
    @track entryRegistration = null;   
    @track valueCrefo = null;
    
    @track idsvalidvat = true;
    @track selectedAd = false;
    @track showenterdetail = false;
    @track noresult = false;
    @track lstAddress = [];
    @track lstAddresstemp = [
        { id : '101', name : 'Annabell-Mercedes Weyel Thai-Pauli Bistro-', address : 'Neuer Kamp 31', zip: '20359', city: 'Hamburg' },
        { id : '102', name : 'Auto Müller GmbH & Co. KG' , address : 'Zum Mühlenberg 1', zip: '07806', city: 'Neustadt' },
        { id : '103', name : 'Balthazar Mercedesstraße Düsseldorf GmbH', address : 'Süderstr. 30', zip: '20097', city: 'Hamburg'},
        { id : '104', name : 'Carmen Mercedes Ore Castillo -Bistro Mi Barrio-', address : ' Reeperbahn 153', zip: '20359', city: 'Hamburg '},
    ];
    @track choiceid = null;
    @track fulladdress = null;
    @track label_salutation_mr = 'Mr.';
    @track label_salutation_mrs = 'Mrs.';
    

    @track lbl_account_title = 'Your details';
    @track lbl_account_title_contactdetails = 'Contact details';
    @track lbl_account_title_businessdetails = 'Business details';
    @track lbl_account_title_businessid = 'Business IDs (optional)';   
    @track lbl_account_results = 'Results';
    @track lbl_account_contact = 'The contact person must empowered to make decisions on behalf of the company';
    @track lbl_account_business = 'In order to provide a suitable credit limit for your business, we need to find it in our partner credit bureau. This service is only available for companies registered in Germany.';
    @track lbl_account_fld_salutation = 'Salutation';
    @track lbl_account_fld_firstname = 'First name';
    @track lbl_account_fld_lastname = 'Last name';
    @track lbl_account_fld_email = 'Email';
    @track lbl_account_fld_emailconfirm = 'Email confirmation';
    @track lbl_account_fld_phone = 'Phone number';
    @track lbl_account_fld_companyname = 'Company name';
    @track lbl_account_fld_postalcode = 'Postal code';
    @track lbl_account_fld_country = 'Country';    
    @track lbl_account_fld_street = 'Street Name and Number';
    @track lbl_account_fld_city = 'City';
    @track lbl_account_fld_vat = 'VAT number';
    @track lbl_account_fld_tax = 'Tax ID';
    @track lbl_account_fld_registration = 'Company Registration number';
    @track lbl_account_btn_find = 'Find my company';
    @track lbl_account_btn_newsearch = 'Try new search';
    @track lbl_account_btn_filledbusiness = 'Enter your business details';
    @track lbl_account_btn_nonecompany = 'None of these are my company';
    @track lbl_account_btn_confirm = 'Confirm details';
    @track lbl_account_btn_choiceaccount = 'Select this company';
    @track lbl_account_info_enterdetails = 'Please enter your business details manually.';
    @track lbl_account_info_notfoundcompany = "We couldn't find your company. Try a new search or enter your business details by clicking on buttons below.";
    @track lbl_account_info_revieworder = 'We will have to review your order, but you can still sign up to UTA.';
    @track lbl_account_info_tax = "Tax ID: Only if you don't have your company number. You will find your tax ID on your tax notice from the tax office. It is a multi-digit number (only numbers, no country code), if necessary separated by one or more special characters like "/" or "-".";
    @track lbl_account_info_vat = 'VAT ID: You can find your VAT ID on your tax notice from the tax office. It consists of the country code DE and 9 digits (e.g. DE123456789).';
    @track lbl_account_info_country = 'The product is exclusive to German businesses.';
    @track lbl_account_info_registration = 'Company Number: This is your German Trade Register number. It usually has the format of HR_ 12345 format.';
    @track lbl_account_msg_dataprocess1 = 'We only use your data to continue and process your application. More on this in our ';
    @track lbl_account_msg_dataprocess2 = 'privacy policy';
    @track lbl_account_msg_dataprocess3 = 'By continuing I confirm that I am authorized to enter this application on behalf of the company.';
    @track lbl_account_error_required = 'The field is required';
    @track lbl_account_error_emaildiff = 'The emails are different. Please check the email.';
    @track lbl_account_error_3characters = 'This field must be at least 3 characters long.';
    @track lbl_account_error_checkemail = 'Please check the format of the email entered';

    filltestdata(e) {
        e.preventDefault();  
        this.entryFirstName = 'JOHN';
        this.entryAccountName = 'ADIDAS';
        this.entryLastName = 'ALBAN';
        this.entryEmailconfirm = 'miksel@free.fr';
        this.entryEmail = 'miksel@free.fr';
        this.entryPhone = '999999999';
        this.entryCP = '91074';        
        this.entrySalutation = 'Mr.';
        this.entryStreetName = 'RUE DE LA PAIX';
        this.entryCity = 'PARIS';
        this.enterdetails();
        this.buttonactivation();
    }
    // @track choicename = null;
    // @track choiceaddress = null;
    // @track choicezip = null;
    // @track choicecity = null;
    
    //  lstext = [
    //     { label: 'v_01', value: '+01', icon: this.flagfr },
    //     { label: 'v_33', value: '+33', icon: this.flagdutch },
    //     { label: 'v_49', value: '+49', icon: this.flagblg }
    //  ];

    //@track styleflag = "background-position: -1731px 0px; height: 14px;display: inline-block; background-image: "+ this.flags +"; background-size: 5652px 15px; width: 20px; margin-right: 4px;";

    @wire(CurrentPageReference)
    getpageRef(pageRef) {
        for (const key of Object.keys(pageRef.state)) {
            //console.log(key + " -> " + pageRef.state[key])
            if (key == 'lg') { this.lg = pageRef.state[key] }
        }
    }

    @api loaddata(data) {
        this.account = data[0].account;
        this.putinfoAccount();
    }

    connectedCallback() {
        loadScript(this, libPhoneNumber).then(() => {
            this.phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
        });   
        /*
        this.listext.forEach( ext => {
            this.strlstextstyle += '<li onclick={choiceext} data-id="'+ ext.country +'" data-value="'+ ext.num +'"><a class="flagstyle flag-icon flag-icon-'+ ext.country +' flag-icon-squared"></a><a class="flagstyle">+'+ ext.num +'</a></li>';
            this.listextstyle.push({style: '<li onclick={choiceext} data-id="'+ ext.country +'" data-value="'+ ext.num +'"><a class="flagstyle flag-icon flag-icon-'+ ext.country +' flag-icon-squared"></a><a class="flagstyle">+'+ ext.num +'</a></li>'})
        })
        const container = this.template.querySelector('.lstflag'); 
        container.innerHTML = this.strlstextstyle;
        */
        // console.log('retour callback');
        // console.log(this.account);
        // console.log(this.account[0]);
        // console.log(this.account[1]);
        // console.log((this.account).length);

    }

    putinfoAccount() {
        this.dataisloaded = true; 
        
        if ((this.account).length == 14) {
            this.entryFirstName = this.account[0]; 
            this.entryLastName = this.account[1];
            this.entryEmail = this.account[2];
            this.entryPhone = this.account[3]; 
            this.entryCP = this.account[4];
            this.entryAccountName = this.account[5];
            this.entryStreetName = this.account[6];
            this.entrySalutation = this.account[7];
            this.entryCity = this.account[8];
            this.entryVat = this.account[9];
            this.entryTax = this.account[10];
            this.entryRegistration = this.account[11];
            this.valueCrefo = this.account[12];
            this.extentionnum = this.account[13]; 
        }
    }

    @api getAccount() {
        console.log('getAccount');
        let acc = [ this.entryFirstName, 
            this.entryLastName, 
            this.entryEmail, 
            this.entryPhone, 
            this.entryCP, 
            this.entryAccountName, 
            this.entryStreetName, 
            this.entrySalutation, 
            this.entryCity, 
            this.entryVat, 
            this.entryTax, 
            this.entryRegistration, 
            this.valueCrefo,
            this.extentionnum ];        
        return acc; 
    }

    renderedCallback() {
        // this.listext.forEach( ext => {
        //     this.strlstextstyle += '<li onclick={choiceext} data-id="'+ ext.country +'" data-value="'+ ext.num +'"><a class="flagstyle flag-icon flag-icon-'+ ext.country +' flag-icon-squared"></a><a class="flagstyle">+'+ ext.num +'</a></li>';
        // })
        // const container = this.template.querySelector('.lstflag'); 
        // container.innerHTML = this.strlstextstyle;
        this.label_salutation_mr = this.lg === 'de' ? 'Herr' : (this.lg === 'fr' ? 'M.' : 'Mr.');
        this.label_salutation_mrs = this.lg === 'de' ? 'Frau' : (this.lg === 'fr' ? 'Mme' : 'Mrs.');

        let param = this.template.querySelector('c-lwc-poc2-language').translatedata('account', this.lg);
        this.parameters = param;//'home', 'FR'
        if ( param == null || param == undefined || param.size === 0 ) { return; }
        //console.debug( param[0].name);     
        this.lbl_account_title = this.getparamtranslate(param, 'lbl_account_title', this.lbl_account_title);
        this.lbl_account_title_contactdetails = this.getparamtranslate(param, 'lbl_account_title_contactdetails', this.lbl_account_title_contactdetails);
        this.lbl_account_contact = this.getparamtranslate(param, 'lbl_account_contact', this.lbl_account_contact);
        this.lbl_account_fld_salutation = this.getparamtranslate(param, 'lbl_account_fld_salutation', this.lbl_account_fld_salutation);
        this.lbl_account_fld_firstname = this.getparamtranslate(param, 'lbl_account_fld_firstname', this.lbl_account_fld_firstname);
        this.lbl_account_fld_lastname = this.getparamtranslate(param, 'lbl_account_fld_lastname', this.lbl_account_fld_lastname);
        this.lbl_account_fld_email = this.getparamtranslate(param, 'lbl_account_fld_email', this.lbl_account_fld_email);
        this.lbl_account_fld_emailconfirm = this.getparamtranslate(param, 'lbl_account_fld_emailconfirm', this.lbl_account_fld_emailconfirm);
        this.lbl_account_fld_phone = this.getparamtranslate(param, 'lbl_account_fld_phone', this.lbl_account_fld_phone);
        this.lbl_account_title_businessdetails = this.getparamtranslate(param, 'lbl_account_title_businessdetails', this.lbl_account_title_businessdetails);
        this.lbl_account_business = this.getparamtranslate(param, 'lbl_account_business', this.lbl_account_business);
        this.lbl_account_fld_companyname = this.getparamtranslate(param, 'lbl_account_fld_companyname', this.lbl_account_fld_companyname);
        this.lbl_account_fld_postalcode = this.getparamtranslate(param, 'lbl_account_fld_postalcode', this.lbl_account_fld_postalcode);
        this.lbl_account_fld_country = this.getparamtranslate(param, 'lbl_account_fld_country', this.lbl_account_fld_country);
        this.lbl_account_btn_find = this.getparamtranslate(param, 'lbl_account_btn_find', this.lbl_account_btn_find);
        this.lbl_account_info_notfoundcompany = this.getparamtranslate(param, 'lbl_account_info_notfoundcompany', this.lbl_account_info_notfoundcompany);
        this.lbl_account_btn_newsearch = this.getparamtranslate(param, 'lbl_account_btn_newsearch', this.lbl_account_btn_newsearch);
        this.lbl_account_btn_filledbusiness = this.getparamtranslate(param, 'lbl_account_btn_filledbusiness', this.lbl_account_btn_filledbusiness);
        this.lbl_account_info_enterdetails = this.getparamtranslate(param, 'lbl_account_info_enterdetails', this.lbl_account_info_enterdetails);
        this.lbl_account_fld_street = this.getparamtranslate(param, 'lbl_account_fld_street', this.lbl_account_fld_street);
        this.lbl_account_fld_city = this.getparamtranslate(param, 'lbl_account_fld_city', this.lbl_account_fld_city);
        this.lbl_account_info_revieworder = this.getparamtranslate(param, 'lbl_account_info_revieworder', this.lbl_account_info_revieworder);
        this.lbl_account_btn_confirm = this.getparamtranslate(param, 'lbl_account_btn_confirm', this.lbl_account_btn_confirm);
        this.lbl_account_btn_choiceaccount = this.getparamtranslate(param, 'lbl_account_btn_choiceaccount', this.lbl_account_btn_choiceaccount);
        this.lbl_account_results = this.getparamtranslate(param, 'lbl_account_results', this.lbl_account_results);
        this.lbl_account_btn_nonecompany = this.getparamtranslate(param, 'lbl_account_btn_nonecompany', this.lbl_account_btn_nonecompany);
        this.lbl_account_title_businessid = this.getparamtranslate(param, 'lbl_account_title_businessid', this.lbl_account_title_businessid);
        this.lbl_account_fld_vat = this.getparamtranslate(param, 'lbl_account_fld_vat', this.lbl_account_fld_vat);
        this.lbl_account_info_vat = this.getparamtranslate(param, 'lbl_account_info_vat', this.lbl_account_info_vat);
        this.lbl_account_fld_tax = this.getparamtranslate(param, 'lbl_account_fld_tax', this.lbl_account_fld_tax);
        this.lbl_account_info_tax = this.getparamtranslate(param, 'lbl_account_info_tax', this.lbl_account_info_tax);
        this.lbl_account_fld_registration = this.getparamtranslate(param, 'lbl_account_fld_registration', this.lbl_account_fld_registration);
        this.lbl_account_info_registration = this.getparamtranslate(param, 'lbl_account_info_registration', this.lbl_account_info_registration);
        this.lbl_account_info_country = this.getparamtranslate(param, 'lbl_account_info_country', this.lbl_account_info_country);
        this.lbl_account_msg_dataprocess1 = this.getparamtranslate(param, 'lbl_account_msg_dataprocess1', this.lbl_account_msg_dataprocess1);
        this.lbl_account_msg_dataprocess2 = this.getparamtranslate(param, 'lbl_account_msg_dataprocess2', this.lbl_account_msg_dataprocess2);
        this.lbl_account_msg_dataprocess3 = this.getparamtranslate(param, 'lbl_account_msg_dataprocess3', this.lbl_account_msg_dataprocess3);        
        this.lbl_account_error_required = this.getparamtranslate(param, 'lbl_account_error_required', this.lbl_account_error_required);        
        this.lbl_account_error_emaildiff = this.getparamtranslate(param, 'lbl_account_error_emaildiff', this.lbl_account_error_emaildiff);        
        this.lbl_account_error_3characters = this.getparamtranslate(param, 'lbl_account_error_3characters', this.lbl_account_error_3characters);                
        this.lbl_account_error_checkemail = this.getparamtranslate(param, 'lbl_account_error_checkemail', this.lbl_account_error_checkemail);                

        /*
        const containeroptfr = this.template.querySelector('.optfr'); 
        containeroptfr.innerHTML = '<span class="flag-icon xxx flag-icon-fr flag-icon-squared"></span><span class="flagiconfr" project_mse-lwcpoc2account_lwcpoc2account>+33</span>';
        const containeroptgb = this.template.querySelector('.optgb'); 
        containeroptgb.innerHTML = '<span class="flag-icon xxx flag-icon-gb flag-icon-squared"></span><span class="flagicongb" project_mse-lwcpoc2account_lwcpoc2account>+44</span>';
        const containeroptde = this.template.querySelector('.optde'); 
        containeroptde.innerHTML = '<span class="flag-icon xxx flag-icon-de flag-icon-squared"></span><span class="flagiconde" project_mse-lwcpoc2account_lwcpoc2account>+49</span>';
        */
        if (!this.dataisloaded) { this.putinfoAccount(); }
    }

    getparamtranslate(param, lbl_string , defaulttrad) {
		return param.has(lbl_string) ? param.get(lbl_string) : defaulttrad;
		//return param.has(lbl_string) ? '¤¤¤ ' + param.get(lbl_string) : '???? ';
	}

    choiceext(e) {
        this.extentionphone = e.currentTarget.dataset.id;
        this.extentionnum = e.currentTarget.dataset.value;
		this.template.querySelector(".labelcountry").innerHTML = '<a style="margin: 3px 0px; padding: 3px 5px;" class="flagicon flag-icon flag-icon-' + (e.currentTarget.dataset.id).toLowerCase() + ' flag-icon-squared"></a><a style="text-decoration: none;color: black;margin: 3px 0px; padding: 3px 5px;" >+' + e.currentTarget.dataset.value + '<span style= "position: absolute; left: 80px; top: 50%; -webkit-transform: translateY(-50%); transform: translateY(-50%); font-size: 24px; color: black;" class="material-icons material-icons-round">expand_more</span></a></a>';
        this.template.querySelector('.lstflag').classList.add('hidelist');
    }

    openlist() {
        let listhide = this.template.querySelector('.lstflag').classList.value.includes('hidelist');
        if ( listhide ) { this.template.querySelector('.lstflag').classList.remove('hidelist'); } 
        else {  this.template.querySelector('.lstflag').classList.add('hidelist'); }
    }

    hidelist() {
        let listhide = this.template.querySelector('.lstflag').classList.value.includes('hidelist');
        if ( !listhide ) {  this.template.querySelector('.lstflag').classList.add('hidelist'); }
    }

    enterdetails() {
        this.showenterdetail = true;
        this.showlistaccount = false;
        this.showbuttonfind = false;
        this.noresult = false;
        setTimeout(() => this.buttonactivation());
    }

    clicknoresult() {
        this.showenterdetail = false;
        this.showlistaccount = false;
        this.showbuttonfind = false;
        this.noresult = true;
        //event.preventDefault();
    }

    showfindresults() {
        this.showenterdetail = false;
        this.noresult = false;
        this.showlistaccount = true;
        this.showbuttonfind = false;
        //this.lstAddress = result.accounts;
        this.isLoaded = true;        
    }

    trynewsearch() {
        this.showenterdetail = false;
        this.showlistaccount = false;
        this.noresult = false;
        this.showbuttonfind = true;
        setTimeout(() => this.buttonactivation());
    }

    confirmdetails(){
        this.showenterdetail = false;
        this.fulladdress = this.entryStreetName + ', ' + this.entryCP + ', ' + this.entryCity;
        this.showinfovat = true;
    }

    searchcompany(event) {
        let isJSON = true;
        this.lstAddress = [] ; 

        this.isLoaded = false;
        //if ( this.entryAccountName === 'EMPTY' ) { this.lstAddress = [] ; this.clicknoresult(); return; } 
        //else { this.lstAddress = this.lstAddresstemp }
        //if ( this.entryAccountName != 'EMPTY' && isJSON == true ) { this.showlistaccount = true; this.isLoaded = true; return; }
        searchAccount( { s_name : this.entryAccountName, s_zipcode : this.entryCP } ) 
        .then(result => {  
            if (result.code === '200') {
                console.log('searchcompany result');
                console.log(result);
                if (result.firmes.length == 0) {
                    this.lstAddress = [] ; 
                    this.clicknoresult();
                    this.isLoaded = true;
                } else {
                    result.firmes.forEach (r => {
                        this.lstAddress.push(
                            { id : r.ident, 
                            crefo : r.crefo,
                            name : r.name, 
                            address : r.address, 
                            zip: r.zip, 
                            city: r.city }
                        )
                    })
                    this.showfindresults();
                }
            } else {
                console.log('ERREUR searchAccount call');
                console.log(result);
                this.isLoaded = true;
                //this.template.querySelector('c-lwc-poc-toast').showToast('error', result.obj);                
            }
        })
        .catch(error => {
            this.isLoaded = true;
            console.log('searchAccount error');
            console.log('ERROR : ' + this.reduceErrors(error).join(', '));
        });        
    }

    verifVATNumber(vatvalue) {
        this.idsvalidvat = false;
		let inputVat = this.template.querySelector('.inputvat');

        checkVATNumber( { vat : vatvalue } ) 
        .then(result => {  
            if (result.code === '100') {
                console.log(result);
                console.log(result.status);
                if (result.status === 'succeeded') {
                    this.idsvalidvat = true; 
                    inputVat.setCustomValidity('');
                } else {
                    this.idsvalidvat = false; 
                    inputVat.setCustomValidity('VAT Number is not valid.');
                }
                inputVat.reportValidity();
            } else {
                console.log('ERREUR checkVATNumber call');
                console.log(result);
            }
        })
        .catch(error => {
            this.isLoaded = true;
            console.log('verifVATNumber error');
            console.log('ERROR : ' + this.reduceErrors(error).join(', '));
        });        
    }

    entryOnexit(e) {
        e.preventDefault(); 
        console.log('entryOnexit');
		let inputVat = this.template.querySelector('.inputvat');

        if (e.target.name === 'entryVat') { 
                this.entryVat = e.target.value; 
                if (e.target.value == null || e.target.value == '' ) { 
                    this.idsvalidvat = true; 
                    inputVat.setCustomValidity('');
                    inputVat.reportValidity();
                } else {
                    this.verifVATNumber(e.target.value); 
                }
        }

        /*
        let inputCmp = this.template.querySelector('.inputname');
        let inputCp = this.template.querySelector('.inputcp');
        let inputconfirm = this.template.querySelector('.inputconfirm');
        
        if (e.target.name === 'entryAccountName') { 
            if (inputCmp.value == null || inputCmp.value.length < 3) {
                inputCmp.setCustomValidity('This field must be at least 3 characters long.');
            } else {
                inputCmp.setCustomValidity('');
            }
            inputCmp.reportValidity();             
        }
        if (e.target.name === 'entryCP') { 
            if (inputCp.value == null || inputCp.value.length != 5) {
                inputCp.setCustomValidity('This field must be at 5 characters long.');
            } else {
                inputCp.setCustomValidity('');
            }
            inputCp.reportValidity();         
        }  
          
        if (e.target.name === 'entryEmailconfirm') { 
            if (inputconfirm.value != null || inputconfirm.value != this.entryEmail ) {
                inputconfirm.setCustomValidity('The email doesn\'t match.');
            } else {
                inputconfirm.setCustomValidity('');
            }
            inputconfirm.reportValidity();         
        }  
        */  
    }

    clearconfirm(event) {
        event.preventDefault();
    }

    entryChange(e) {
        if (e.target.name === 'entryAccountName') { this.entryAccountName = e.target.value; }
        if (e.target.name === 'entryFirstName') { this.entryFirstName = e.target.value; }
        if (e.target.name === 'entryLastName') { this.entryLastName = e.target.value; }
        if (e.target.name === 'entryEmailconfirm') { this.entryEmailconfirm = e.target.value; }
        if (e.target.name === 'entryEmail') { this.entryEmail = e.target.value; }
        if (e.target.name === 'entryPhone') { this.entryPhone = e.target.value; }
        if (e.target.name === 'entryCP') { this.entryCP = e.target.value; }
        if (e.target.name === 'entrySalutation') { 
            this.entrySalutation = e.target.value;         
            if ( e.target.value == "2") {
                this.entrySalutation = this.lg === 'de' ? 'Frau' : (this.lg === 'fr' ? 'Mme' : 'Mrs.'); 
            } else {
                this.entrySalutation = this.lg === 'de' ? 'Herr' : (this.lg === 'fr' ? 'M.' : 'Mr.');
            }
        }
        if (e.target.name === 'entryAddress') { this.entryStreetName = e.target.value; }
        if (e.target.name === 'entryCity') { this.entryCity = e.target.value; }
        if (e.target.name === 'entryVat') { this.entryVat = e.target.value; }
        if (e.target.name === 'entryTax') { this.entryTax = e.target.value; }
        if (e.target.name === 'entryRegistration') { this.entryRegistration = e.target.value; }

        let inputFirstName = this.template.querySelector('.inputfirstname');
        let inputLastName = this.template.querySelector('.inputlastname');
        let inputPhone = this.template.querySelector('.inputphone');
        let inputEmail = this.template.querySelector('.inputemail');
        let inputCmp = this.template.querySelector('.inputname');
        let inputCp = this.template.querySelector('.inputcp');
        let inputconfirm = this.template.querySelector('.inputconfirm');

        if (e.target.name === 'entryFirstName') { 
            if (inputFirstName.value == null || inputFirstName.value.length == 0) {
                inputFirstName.setCustomValidity(this.lbl_account_error_required);
            } else {
                inputFirstName.setCustomValidity('');
            }
            inputFirstName.reportValidity();             
        }

        if (e.target.name === 'entryLastName') { 
            if (inputLastName.value == null || inputLastName.value.length == 0) {
                inputLastName.setCustomValidity(this.lbl_account_error_required);
            } else {
                inputLastName.setCustomValidity('');
            }
            inputLastName.reportValidity();             
        }

        //pattern="/\d{9}/" message-when-pattern-mismatch="Please enter a valid phone number"
        //var patternphone = new RegExp("^\\d{9}$");
        if (e.target.name === 'entryPhone') { 
            /*if (!inputPhone.checkValidity()) {
                inputPhone.reportValidity();
            }
            console.log('inputPhone');
            console.log(inputPhone.value);
            console.log(patternphone);
            console.log((inputPhone.value).match(patternphone));
            */
            var isvalidnumber = false;
            isvalidnumber = this.checkPoneNumber();
            if (!isvalidnumber) {
                inputPhone.setCustomValidity('Please enter a valid phone number');
            } else {
                inputPhone.setCustomValidity('');
            }
            inputPhone.reportValidity();
        }

        var regExpEmailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;  
        if (e.target.name === 'entryEmail') { 
            //if (!inputEmail.checkValidity()) { inputEmail.reportValidity(); }
            if (inputEmail.value == null || inputEmail.value.length == 0) {
                inputEmail.setCustomValidity(this.lbl_account_error_required);
            } else if (!((inputEmail.value).match(regExpEmailformat))) {
                inputEmail.setCustomValidity(this.lbl_account_error_checkemail);
            } else {
                inputEmail.setCustomValidity('');
            }
            inputEmail.reportValidity();
        }

        if (e.target.name === 'entryAccountName') { 
            if (inputCmp.value == null || inputCmp.value.length < 3) {
                inputCmp.setCustomValidity(this.lbl_account_error_3characters);
            } else {
                inputCmp.setCustomValidity('');
            }
            inputCmp.reportValidity();             
        }
        if (e.target.name === 'entryCP') { 
            if (inputCp.value == null || inputCp.value.length != 5) {
                inputCp.setCustomValidity('This field must be at 5 characters long.');
            } else {
                inputCp.setCustomValidity('');
            }
            inputCp.reportValidity();         
        }  
        if (e.target.name === 'entryEmailconfirm'  || e.target.name === 'entryEmail' ) { 
            if (inputconfirm.value != null && inputconfirm.value != this.entryEmail ) {
                inputconfirm.setCustomValidity(this.lbl_account_error_emaildiff);
            } else {
                inputconfirm.setCustomValidity('');
            }
            inputconfirm.reportValidity();         
        }  

        this.buttonactivation();
    }

    buttonactivation() {
        let search_toactivate = this.checkValidity_cmp_cp();
        console.log(search_toactivate);        
        if (this.showbuttonfind) {  
            let seach_inactive = this.template.querySelector('.searchBtn').classList.value.includes('inactive');
            if ( !seach_inactive && !search_toactivate ) { this.template.querySelector('.searchBtn').classList.add('inactive'); }
            if ( seach_inactive && search_toactivate ) { this.template.querySelector('.searchBtn').classList.remove('inactive'); }
        }
        if (this.showenterdetail) {
            let confirm_inactive = this.template.querySelector('.confirmBtn').classList.value.includes('inactive');
            let confirm_toactivate = search_toactivate && (( this.entryStreetName == null ? '' : this.entryStreetName  ).replaceAll(' ', '').length != 0 && ( this.entryCity == null ? '' : this.entryCity).replaceAll(' ', '').length != 0 );
            console.log((this.entryStreetName == null ? '' : this.entryStreetName  ).replaceAll(' ', '').length != 0);
            console.log(( this.entryCity == null ? '' : this.entryCity).replaceAll(' ', '').length != 0 );

            if ( !confirm_inactive && !confirm_toactivate ) { this.template.querySelector('.confirmBtn').classList.add('inactive'); }
            if ( confirm_inactive && confirm_toactivate ) { this.template.querySelector('.confirmBtn').classList.remove('inactive'); }
        }
        let filled_street_city = ( this.entryStreetName == null ? '' : this.entryStreetName  ).replaceAll(' ', '').length != 0 && ( this.entryCity == null ? '' : this.entryCity).replaceAll(' ', '').length != 0;

        // console.log('buttonactivation');
        // console.log(search_toactivate);
        // console.log(this.checkValidity_contact());
        // console.log(filled_street_city);
        if ( search_toactivate && this.checkValidity_contact() && filled_street_city && this.idsvalidvat) 
            { 
                this.activatebtnparentnext(true); 
            }
        else {
                this.activatebtnparentnext(false); 
            }
    }

    checkValidity_cmp_cp() {
        /*
        let inputCmp = this.template.querySelector('.inputname');
        let inputCp = this.template.querySelector('.inputcp');

        let validity_cp = inputCp.validity.valid && ( this.entryCP == null ? '' : this.entryCP  ).replaceAll(' ', '').length != 0;
        let validity_cmp = inputCmp.validity.valid && ( this.entryAccountName == null ? '' : this.entryAccountName  ).replaceAll(' ', '').length != 0;
        */
        
        let validity_cp = ( this.entryCP == null ? '' : this.entryCP  ).replaceAll(' ', '').length != 0;
        let validity_cmp = ( this.entryAccountName == null ? '' : this.entryAccountName  ).replaceAll(' ', '').length != 0;

        return validity_cp && validity_cmp;
    }

    checkPoneNumber() {
        let inputPhone = this.template.querySelector('.inputphone');
        let valphone = inputPhone.value;
        if (valphone.length < 6 ) { return false;}
        if (valphone.length > 16 ) { return false;}
        if (isNaN(valphone)) { return false;}
        let phoneNumber = this.phoneUtil.parseAndKeepRawInput(valphone, this.extentionphone);
        return this.phoneUtil.isValidNumber(phoneNumber);
    }

    checkValidity_contact() {
        let inputPhone = this.template.querySelector('.inputphone');
        let inputEmail = this.template.querySelector('.inputemail');
        let inputconfirm = this.template.querySelector('.inputconfirm');
        
        let filled_firstname = ( this.entryFirstName == null ? '' : this.entryFirstName  ).replaceAll(' ', '').length != 0;
        let filled_lastname = ( this.entryLastName == null ? '' : this.entryLastName  ).replaceAll(' ', '').length != 0;
        let filled_email = inputEmail.validity.valid && ( this.entryEmail == null ? '' : this.entryEmail  ).replaceAll(' ', '').length != 0;
        let filled_phone = inputPhone.validity.valid && ( this.entryPhone == null ? '' : this.entryPhone  ).replaceAll(' ', '').length != 0;
        let filled_confirmemail = inputconfirm.validity.valid && ( this.entryEmailconfirm == null ? '' : this.entryEmailconfirm  ).replaceAll(' ', '').length != 0;

        return filled_firstname && filled_lastname && filled_email && filled_phone && filled_confirmemail;
    }

    initChoice() {
        this.choiceid = null;
    }

    validAddress() {
        this.showinfovat = true;
        this.showlistaccount = false;    
    }

    selectAddress(event) {
        let liste = this.lstAddress;
        liste.forEach(acc => {
            if (event.target.name == acc.id)
            {   console.log('----------------------------');
                console.log(acc.id);
                console.log(this.template.querySelector("[name='"+ acc.id + "']"));
                
                console.log('----------------------------');
                this.template.querySelector("[name='"+ acc.id + "']").checked = true;
                this.choiceid = acc.id;
                this.entryAccountName = acc.name;
                this.entryStreetName = acc.address;
                this.entryCP = acc.zip;
                this.entryCity = acc.city;
                this.valueCrefo = acc.ident;
                this.fulladdress = acc.address + ', ' + acc.zip + ', ' + acc.city;
                this.buttonactivation();
                /*
                console.log(acc.name);
                console.log(acc.address);
                console.log(JSON.parse(JSON.stringify(acc))); 
                */
            } else {
                this.template.querySelector("[name='"+ acc.id + "']").checked = false;
            }
        });
        
        let btnselection = this.template.querySelector('.btnSelection');
        if (btnselection) {
            if (btnselection.classList.value.includes('selectBtnHide'))
            {
                btnselection.classList.remove('selectBtnHide');
            }
        }

    }

    activatebtnparentnext(isactivate) {
        // console.log('PASS activatebtnparentnext')
        let ev = new CustomEvent('parentnext', { detail:  { toactivate: isactivate } } );
        this.dispatchEvent(ev);    
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
    
    modifyaccount(){
        this.showinfovat = false;
        //this.showenterdetail = true;
        this.showbuttonfind = true;
        setTimeout(() => this.buttonactivation());
    }


}