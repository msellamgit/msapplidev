import { LightningElement, track, api, wire } from 'lwc';
import respoc from '@salesforce/resourceUrl/res_poc2';
import submitBasket from '@salesforce/apex/LWC_POC2.submitBasket';
import { CurrentPageReference } from 'lightning/navigation';
import updateLeadCompanyShortName from '@salesforce/apex/LWC_POC2.updateLeadCompanyShortName';

export default class LwcPoc2Card extends LightningElement {
    @api leadid;
    @api cards;
    @track lg = '';
    parameters = new Map();        
    @track stepnumofcards = true;
    @track stepcompanyname = true;
    @track errorestimation = false;
    @track msgerrorestimate = '';
    
    imageorder = respoc + '/cards.svg';
    imagecreditCard = respoc + '/creditCard.png';
    // @track lstchoicenbcards = [ {label:"1 card", value:"1"}, {label:"2 cards", value:"2"}, {label:"3 cards", value:"3"}, {label:"4 cards", value:"4"}, {label:"5 cards", value:"5"}, {label:"6 cards", value:"6"}, {label:"7 cards", value:"7"}, {label:"8 cards", value:"8"}, {label:"9 cards", value:"9"},
    // {label:"10 card", value:"10"},
    // {label:"11 card", value:"11"}, {label:"12 cards", value:"12"}, {label:"13 cards", value:"13"}, {label:"14 cards", value:"14"}, {label:"15 cards", value:"15"}, {label:"16 cards", value:"16"}, {label:"17 cards", value:"17"}, {label:"18 cards", value:"18"}, {label:"19 cards", value:"19"},
    // {label:"20 card", value:"20"},
    // {label:"More than 20 card", value:"21"}];

    @track dataisloaded = false;
    @track lstchoicenbcards = [];
    @track lstcards = [];
    @track genpin = true;
    @track cuspin = false;
    @track entryCodePin = '';
    @track entryLastName = null;
    @track entryFirstName = null;
    @track entryNameCard = null;
    @track entryCompanyName = null;    
    @track entryRegistration = null;
    @track entryAmount = null;
    @track selectedid = null;
    @track numbercardsfilled = 0;
    @track nocard = true;
    @track valueChoiceCards;
    @track subtitle = "Let's add your first card";
    @track showincrease = false;
    @track askincrease = false;
    @track cardsmore20 = false;
    @track onecardonly = false;
    @track isdrivercard = true;
    @track isvehiclecard = false;
    @track numbercardsok = false;
    @track numbercardstoomuck = false;
    @track isModalDelete = false;
    @track typecarddisable = false;
    @track btnnextstep = '';
    @track lblcardtodelete = '';
    //@track toactivateparentnext = false;
    @track cardidtodelete;
    @track msg_error_pincode = '';

    @track lbl_card_title0 = 'Your cards';
    @track lbl_card_title = 'Order your cards';
    @track lbl_card_subtitle0 = "Let's add your first card";
    @track lbl_card_subtitle1 = "Great! Let's keep going";
    @track lbl_card_subtitle2 = "Congrats";

    @track lbl_card_msg_skip = 'Skip for now';

    @track lbl_card_msg_credit = 'A positive credit check will give you a monthly spend limit of <b>1500€</b>. Once you have been issued cards, you will be also able to set individual spend limits per card.';
    @track lbl_card_msg_increase = ' I want to increase my monthly spend limit';
    @track lbl_card_msg_estimate = 'What is your estimated monthly spend accros all your cards ?';
    @track lbl_card_msg_prefilled = 'We have pre-filled the value based on a industry average spend of 450€ per card. Please adjust this amount according to your needs.';
    @track lbl_card_msg_another = 'We have another offer for you';
    @track lbl_card_msg_telesales = 'Our telesales will advise you on an offer that fits better your needs.';
    @track lbl_card_msg_congratulate = 'Your card configuration is over. You can check and edit your cards, then proceed with your order!';
    @track lbl_card_msg_error_1500 = 'If your estimated spend is less than 1500€, you will be granted a monthly limit of 1500€ subject to a positive credit check';
    @track lbl_card_msg_error_99999 = 'Max input 99999';
    @track lbl_card_msg_deleteextra = 'You updated your card count. Please delete # card(s) to proceed.'
    @track lbl_card_error_required = 'The field is required';
    @track lbl_card_error_plate = 'Invalid plate number format';
    @track lbl_card_error_notgerman = 'This is not a german licence plate format.';
    @track lbl_card_error_more26 = 'Your company name will be printed on the cards. Please enter the name you would like us to use. Consider there is a limit of 26 characters.';
    @track lbl_card_error_existcard = 'A card with this plate number already exist in the basket';
    @track lbl_card_error_pincode = 'The PIN must be 4 numeric characters, 0000 is not allowed';
    @track lbl_card_btn_nocontact = "No, I don't want to be contacted";
    @track lbl_card_btn_contact = 'Yes, I want to be contacted';
    @track lbl_card_btn_addcard = 'Add card to my order';
    @track lbl_card_btn_modifycard = 'Modify card';
    @track lbl_card_btn_companyname = 'Company Name';
    @track lbl_card_btn_back = 'Back';   
    @track lbl_card_btn_confirm = 'Confirm';
    @track lbl_card_btn_next = 'Next';
    @track lbl_card_btn_proceed = 'Proceed with # card(s)';
    @track lbl_card_btn_aborddelete = 'Keep my card';
    @track lbl_card_btn_confirmdelete = 'Delete my card';
    @track lbl_card_promptdelete_title = 'Are you sure that you want to delete this card ?';
    @track lbl_card_promptdelete_label = 'Confirm the deletion. This cannot be undone.';
    @track lbl_card_info_createcard = 'To create your cards, we will process cardholder info on your behalf';
    @track lbl_card_basket_empty = "There's nothing in your basket.";
    @track lbl_card_basket_useform = 'Use the form on the left to add your first card.';
    @track lbl_card_basket_change = 'Change the number of cards.';
    @track lbl_card_basket = 'Your basket';
    @track lbl_card_fld_firstname = 'First Name';
    @track lbl_card_fld_lastname = 'Last Name';
    @track lbl_card_fld_registration = 'Vehicle Registration Number';
    @track lbl_card_fld_namecard = 'Name on the card';
    @track lbl_card_fld_companyname = 'Company name on the card';    
    @track lbl_card_fld_numbercards = 'Number of cards needed';
    @track lbl_card_fld_cardtype = 'Card type';
    @track lbl_card_fld_cardpin = 'Card Pin';
    @track lbl_card_fldopt_driver = 'Driver card';
    @track lbl_card_fldopt_vehicle = 'Vehicle card';
    @track lbl_card_fldopt_generate = 'Generate a PIN for me';
    @track lbl_card_fldopt_choose = 'Choose a custom PIN';
    @track lbl_card_lbl_card = 'Card';
    @track lbl_card_lbl_cards = 'Cards';
    @track lbl_card_info_card = "Driver cards belong to a named driver and can be used in any behicle. Vehicle cards belong to a specific vehicle and can be used by any driver.";
    @track lbl_card_info_name = "Driver name to be printed on card must contain only the following characters: A-Z 0-9 SPACE , . - ' + & / Ü Ö Ä and must be at most 19 characters long";
    @track lbl_card_info_company = "Company name to be printed on card must contain only the following characters: A-Z 0-9 SPACE , . - ' + & / Ü Ö Ä and must be at most 26 characters long";

    connectedCallback() {
        /*
        if(localStorage.getItem('utanbcards')) {
            let utanbcards = localStorage.getItem('utanbcards');
            this.valueChoiceCards = localStorage.getItem('utanbcards');
            this.toactivateparentnext = utanbcards > 0 && utanbcards <= 20 ? true : false;
            const selectnbcard = this.template.querySelector('.selectnbcard');
            if (selectnbcard) {
                selectnbcard.value = localStorage.getItem('utanbcards');
            }
        }
        */
        //this.putinfoCard();
        this.refreshforminfo();
    }

    @api loaddata(data) {
        this.cards = data[0].cards;
        this.putinfoCard();
    }


    putinfoCard(){
        this.dataisloaded = true;
        this.getleadid();
        if ((this.cards).length == 4) {
            let __lstcard = this.cards[1];
            this.entryCompanyName = this.cards[0]; 
            //this.lstcards = this.cards[1];
            this.valueChoiceCards = this.cards[2].toString();
            this.entryAmount = this.cards[3]; 
            for( var i = 0; i < __lstcard.length; i++){
                this.lstcards.push({id: __lstcard[i].id, 
                    lastname : __lstcard[i].lastname, 
                    registration: __lstcard[i].registration, 
                    firstname: __lstcard[i].firstname, 
                    namecard : __lstcard[i].namecard, 
                    name: __lstcard[i].name, 
                    isdrivercard: __lstcard[i].isdrivercard, 
                    type: __lstcard[i].type, 
                    clsdiv: __lstcard[i].clsdiv, 
                    clsbtnedit: __lstcard[i].clsbtnedit});
            }
        }    
        
    }

    refreshforminfo(){
        //this.debug('refreshforminfo');
        setTimeout(() => this.activatebtnparentnext());
        this.refreshclientslist();
        setTimeout(() => this.activationbtnmodify());
        setTimeout(() => this.activationbtnconfirmname());
    }

    @wire(CurrentPageReference)
    getpageRef(pageRef) {
        let language = 'en';
        for (const key of Object.keys(pageRef.state)) {
            //console.log(key + " -> " + pageRef.state[key])
            if (key == 'lg') { 
                this.lg = pageRef.state[key];
                language = pageRef.state[key].toLowerCase();
            }
        }
        let labelcart = 'card';
        let labelcarts = 'cards';
        let labelmore20cards = 'More than 20 cards.';
        if(language == 'de') { labelcart = 'kart'; labelcarts = 'karten'; labelmore20cards = 'Mehr als 20 Karten';}
        else if (language == 'fr') { labelcart = 'carte'; labelcarts = 'cartes'; labelmore20cards = 'Plus de 20 cartes';}
        if (this.lstchoicenbcards.length === 0) {
            this.lstchoicenbcards.push({label: 1 + ' ' + labelcart, value: "1"})
            for (var i = 2; i < 21; i++) {
                    this.lstchoicenbcards.push({label: i + ' ' + labelcarts, value: i.toString()})
                }
            this.lstchoicenbcards.push({label: labelmore20cards, value: "21"});
        }
    }

    renderedCallback() {
    //     this.inittranslation();
    // }

    // inittranslation() {
        let param = this.template.querySelector('c-lwc-poc2-language').translatedata('card', this.lg);
        const container = this.template.querySelector('.msgcredit'); 
        this.parameters = param;//'home', 'FR'
        if ( param == null || param == undefined || param.size === 0 ) { 
            if (container) {
                container.innerHTML = this.lbl_card_msg_credit;
            }
            return; 
        }
        //console.debug( param[0].name);   

        this.lbl_card_title0 = this.getparamtranslate(param, 'lbl_card_title0', this.lbl_card_title0 );
        this.lbl_card_title = this.getparamtranslate(param, 'lbl_card_title', this.lbl_card_title );
        this.lbl_card_subtitle0 = this.getparamtranslate(param, 'lbl_card_subtitle0', this.lbl_card_subtitle0 );
        this.lbl_card_subtitle1 = this.getparamtranslate(param, 'lbl_card_subtitle1', this.lbl_card_subtitle1 );
        this.lbl_card_subtitle2 = this.getparamtranslate(param, 'lbl_card_subtitle2', this.lbl_card_subtitle2 );
        this.lbl_card_msg_skip = this.getparamtranslate(param, 'lbl_card_msg_skip', this.lbl_card_msg_skip );
        this.lbl_card_msg_credit = this.getparamtranslate(param, 'lbl_card_msg_credit', this.lbl_card_msg_credit );
        this.lbl_card_msg_increase = this.getparamtranslate(param, 'lbl_card_msg_increase', this.lbl_card_msg_increase );
        this.lbl_card_msg_estimate = this.getparamtranslate(param, 'lbl_card_msg_estimate', this.lbl_card_msg_estimate );
        this.lbl_card_msg_prefilled = this.getparamtranslate(param, 'lbl_card_msg_prefilled', this.lbl_card_msg_prefilled );
        this.lbl_card_msg_another = this.getparamtranslate(param, 'lbl_card_msg_another', this.lbl_card_msg_another );
        this.lbl_card_msg_telesales = this.getparamtranslate(param, 'lbl_card_msg_telesales', this.lbl_card_msg_telesales );
        this.lbl_card_msg_congratulate = this.getparamtranslate(param, 'lbl_card_msg_congratulate', this.lbl_card_msg_congratulate );
        this.lbl_card_msg_deleteextra = this.getparamtranslate(param, 'lbl_card_msg_deleteextra', this.lbl_card_msg_deleteextra );
        this.lbl_card_btn_nocontact  = this.getparamtranslate(param, 'lbl_card_btn_nocontact', this.lbl_card_btn_nocontact );
        this.lbl_card_btn_contact  = this.getparamtranslate(param, 'lbl_card_btn_contact', this.lbl_card_btn_contact );
        this.lbl_card_btn_addcard  = this.getparamtranslate(param, 'lbl_card_btn_addcard', this.lbl_card_btn_addcard );
        this.lbl_card_btn_modifycard  = this.getparamtranslate(param, 'lbl_card_btn_modifycard', this.lbl_card_btn_modifycard );
        this.lbl_card_btn_companyname  = this.getparamtranslate(param, 'lbl_card_btn_companyname', this.lbl_card_btn_companyname );
        this.lbl_card_btn_back  = this.getparamtranslate(param, 'lbl_card_btn_back', this.lbl_card_btn_back );
        this.lbl_card_btn_confirm  = this.getparamtranslate(param, 'lbl_card_btn_confirm', this.lbl_card_btn_confirm );
        this.lbl_card_btn_next  = this.getparamtranslate(param, 'lbl_card_btn_next', this.lbl_card_btn_next );
        this.lbl_card_btn_proceed  = this.getparamtranslate(param, 'lbl_card_btn_proceed', this.lbl_card_btn_proceed );        
        this.lbl_card_btn_aborddelete  = this.getparamtranslate(param, 'lbl_card_btn_aborddelete', this.lbl_card_btn_aborddelete );
        this.lbl_card_btn_confirmdelete  = this.getparamtranslate(param, 'lbl_card_btn_confirmdelete', this.lbl_card_btn_confirmdelete );
        this.lbl_card_promptdelete_title  = this.getparamtranslate(param, 'lbl_card_promptdelete_title', this.lbl_card_promptdelete_title );
        this.lbl_card_promptdelete_label  = this.getparamtranslate(param, 'lbl_card_promptdelete_label', this.lbl_card_promptdelete_label );
        this.lbl_card_info_createcard  = this.getparamtranslate(param, 'lbl_card_info_createcard', this.lbl_card_info_createcard );
        this.lbl_card_basket_empty  = this.getparamtranslate(param, 'lbl_card_basket_empty', this.lbl_card_basket_empty );
        this.lbl_card_basket_useform  = this.getparamtranslate(param, 'lbl_card_basket_useform', this.lbl_card_basket_useform );
        this.lbl_card_basket_change  = this.getparamtranslate(param, 'lbl_card_basket_change', this.lbl_card_basket_change );
        this.lbl_card_basket  = this.getparamtranslate(param, 'lbl_card_basket', this.lbl_card_basket );
        this.lbl_card_fld_firstname  = this.getparamtranslate(param, 'lbl_card_fld_firstname', this.lbl_card_fld_firstname );
        this.lbl_card_fld_lastname  = this.getparamtranslate(param, 'lbl_card_fld_lastname', this.lbl_card_fld_lastname );
        this.lbl_card_fld_registration  = this.getparamtranslate(param, 'lbl_card_fld_registration', this.lbl_card_fld_registration );
        this.lbl_card_fld_namecard  = this.getparamtranslate(param, 'lbl_card_fld_namecard', this.lbl_card_fld_namecard );
        this.lbl_card_fld_companyname  = this.getparamtranslate(param, 'lbl_card_fld_companyname', this.lbl_card_fld_companyname );
        this.lbl_card_fld_numbercards  = this.getparamtranslate(param, 'lbl_card_fld_numbercards', this.lbl_card_fld_numbercards );
        this.lbl_card_fld_cardtype  = this.getparamtranslate(param, 'lbl_card_fld_cardtype', this.lbl_card_fld_cardtype );
        this.lbl_card_fld_cardpin  = this.getparamtranslate(param, 'lbl_card_fld_cardpin', this.lbl_card_fld_cardpin );
        this.lbl_card_fldopt_driver  = this.getparamtranslate(param, 'lbl_card_fldopt_driver', this.lbl_card_fldopt_driver );
        this.lbl_card_fldopt_vehicle  = this.getparamtranslate(param, 'lbl_card_fldopt_vehicle', this.lbl_card_fldopt_vehicle );
        this.lbl_card_fldopt_generate  = this.getparamtranslate(param, 'lbl_card_fldopt_generate', this.lbl_card_fldopt_generate );
        this.lbl_card_fldopt_choose  = this.getparamtranslate(param, 'lbl_card_fldopt_choose', this.lbl_card_fldopt_choose );
        this.lbl_card_info_card  = this.getparamtranslate(param, 'lbl_card_info_card', this.lbl_card_info_card );
        this.lbl_card_info_name  = this.getparamtranslate(param, 'lbl_card_info_name', this.lbl_card_info_name );
        this.lbl_card_info_company  = this.getparamtranslate(param, 'lbl_card_info_company', this.lbl_card_info_company );        
        this.lbl_card_msg_error_1500 = this.getparamtranslate(param, 'lbl_card_msg_error_1500', this.lbl_card_msg_error_1500 );        
        this.lbl_card_msg_error_99999 = this.getparamtranslate(param, 'lbl_card_msg_error_99999', this.lbl_card_msg_error_99999 );        
        this.lbl_card_error_required = this.getparamtranslate(param, 'lbl_card_error_required', this.lbl_card_error_required );        
        this.lbl_card_error_plate = this.getparamtranslate(param, 'lbl_card_error_plate', this.lbl_card_error_plate );        
        this.lbl_card_error_notgerman = this.getparamtranslate(param, 'lbl_card_error_notgerman', this.lbl_card_error_notgerman );                
        this.lbl_card_error_more26 = this.getparamtranslate(param, 'lbl_card_error_more26', this.lbl_card_error_more26 );                
        this.lbl_card_error_existcard = this.getparamtranslate(param, 'lbl_card_error_existcard', this.lbl_card_error_existcard );                
        this.lbl_card_lbl_card = this.getparamtranslate(param, 'lbl_card_lbl_card', this.lbl_card_lbl_card );
        this.lbl_card_lbl_cards = this.getparamtranslate(param, 'lbl_card_lbl_cards', this.lbl_card_lbl_cards );
                
        if (container) {
            container.innerHTML = this.lbl_card_msg_credit;
        }

        if (!this.dataisloaded) { this.putinfoCard(); }

    //    [ {label:"1 card", value:"1"}, {label:"2 cards", value:"2"}, {label:"3 cards", value:"3"}, {label:"4 cards", value:"4"}, {label:"5 cards", value:"5"}, {label:"6 cards", value:"6"}, {label:"7 cards", value:"7"}, {label:"8 cards", value:"8"}, {label:"9 cards", value:"9"},
    // {label:"10 card", value:"10"},
    // {label:"11 card", value:"11"}, {label:"12 cards", value:"12"}, {label:"13 cards", value:"13"}, {label:"14 cards", value:"14"}, {label:"15 cards", value:"15"}, {label:"16 cards", value:"16"}, {label:"17 cards", value:"17"}, {label:"18 cards", value:"18"}, {label:"19 cards", value:"19"},
    // {label:"20 card", value:"20"},
    // {label:"More than 20 card", value:"21"}];

    }

    getparamtranslate(param, lbl_string , defaulttrad) {
		return param.has(lbl_string) ? param.get(lbl_string) : defaulttrad;
		//return param.has(lbl_string) ? '¤¤¤ ' + param.get(lbl_string) : '???? ';
	}

    @api getCard() {
        let crd = [ this.entryCompanyName, this.lstcards, this.valueChoiceCards, this.entryAmount ];
        return crd; 
    }

    @api ordercard() { 
        this.stepnumofcards = false;
        this.refreshforminfo();
    }

    changenumber() {
        //this.debug('changenumber');
        this.stepnumofcards = true;
        let ev = new CustomEvent('backnumbercard');
        this.dispatchEvent(ev);    
    }

    handleCardtype(e) {
        if (e.target.checked) 
        {
            if ( e.target.name === 'driverCard' ) { this.isdrivercard = true; this.isvehiclecard = false; }
            else if ( e.target.name === 'vehicleCard' ) { this.isvehiclecard = true; this.isdrivercard = false; }
            else {this.valuePackage_3 = true; }
            this.valuePackage = e.target.name;
            this.valuePackageLabel = e.target.label;            
        }   
    }

    @api getStatecard() { return this.stepnumofcards; }

    get optionChoiceCards() { return this.lstchoicenbcards ;}

    entryChange(e) {
        if (e.target.name === 'choicenbcards') { 
            if (e.target.value > 0 && e.target.value <= 20) { 
                this.onecardonly = e.target.value == 1? true: false;
                this.cardsmore20 = false; this.askincrease = true; 
                if (e.target.value < 4) {
                    this.entryAmount = 1500;
                } else {
                    this.entryAmount = e.target.value * 450;
                }
            }
            else if (e.target.value == 21) { 
                this.cardsmore20 = true; this.askincrease = false; 
                this.showincrease = false; 
            }
            this.valueChoiceCards = e.target.value;
            
            //localStorage.setItem('utanbcards', e.target.value);
        }
        if (e.target.name === 'entryFirstName') { this.entryFirstName = e.target.value; }
        if (e.target.name === 'entryLastName') { this.entryLastName = e.target.value; }
        if (e.target.name === 'entryNameCard') {  this.entryNameCard = e.target.value; }
        if (e.target.name === 'entryCompanyName') { this.entryCompanyName = e.target.value.toUpperCase(); }
        if (e.target.name === 'entryRegistration') { 
            this.entryRegistration = e.target.value; 
            this.entryNameCard = e.target.value;            
        }
        if (e.target.name === 'entryAmount') { 
            this.entryAmount = e.target.value; 
            if (e.target.value > 99999) { 
                this.msgerrorestimate = this.lbl_card_msg_error_99999;
                this.errorestimation = true; 
            }
            else if (e.target.value < 1500) { 
                this.msgerrorestimate = this.lbl_card_msg_error_1500;
                this.errorestimation = true; 
            } else {
                this.msgerrorestimate = '';
                this.errorestimation = false;                
            }        
        }

        let inputFirstName = this.template.querySelector('.inputFirstName');
        let inputLastName = this.template.querySelector('.inputLastName');
        let fnvalid = true;
        let lnvalid = true;
        if (e.target.name === 'entryFirstName' || e.target.name === 'entryLastName') {
            if (e.target.name === 'entryFirstName' && this.isdrivercard && (inputFirstName.value == null || inputFirstName.value.length == 0)) {
                inputFirstName.setCustomValidity(this.lbl_card_error_required);
                fnvalid = false;
            }
            if (e.target.name === 'entryLastName' && this.isdrivercard && (inputLastName.value == null || inputLastName.value.length == 0)) {
                inputLastName.setCustomValidity(this.lbl_card_error_required);
                lnvalid = false;
            }
            if (this.isdrivercard && fnvalid && lnvalid && this.duplicatedrivercard(inputFirstName.value, inputLastName.value)) {
                inputLastName.setCustomValidity('A driver with the same first name and last name already exists');
                lnvalid = false;
            }
            if (fnvalid) { inputFirstName.setCustomValidity(''); }
            if (lnvalid) { inputLastName.setCustomValidity(''); }

            inputFirstName.reportValidity();
            inputLastName.reportValidity();
        }

        var regExpentryCompanyName = /^([A-Za-z0-9 ,.'+&/ÜÖÄüöä-]+)$/; 
        let inputNameCard = this.template.querySelector('.inputNameCard');
        if (e.target.name === 'entryNameCard') {
            if (this.isdrivercard && (inputNameCard.value == null || inputNameCard.value.length == 0)) {
                inputNameCard.setCustomValidity(this.lbl_card_error_required);
            } else if (this.isdrivercard && inputNameCard.value.length > 19) {
                inputNameCard.setCustomValidity('Name on the card must contain 19 characters max');
            } else if (this.isdrivercard && !((inputNameCard.value).match(regExpentryCompanyName))) {
                inputNameCard.setCustomValidity("Only the following characters allowed: A-Z 0-9 SPACE , . - ' + & / Ü Ö Ä");
            } else {
                inputNameCard.setCustomValidity('');
            }
            inputNameCard.reportValidity();
        }

        let inputCompanyName = this.template.querySelector('.inputCompanyName');
        if (e.target.name === 'entryCompanyName') { 
            if (this.isdrivercard && (inputCompanyName.value == null || inputCompanyName.value.length == 0)) {
                inputCompanyName.setCustomValidity(this.lbl_card_error_required);
            } else if (this.isdrivercard && inputCompanyName.value.length > 26) {
                inputCompanyName.setCustomValidity(this.lbl_card_error_more26);
            } else if (this.isdrivercard && !((inputCompanyName.value).match(regExpentryCompanyName))) {
                inputCompanyName.setCustomValidity("Only the following characters allowed: A-Z 0-9 SPACE , . - ' + & / Ü Ö Ä");
            }else {
                inputCompanyName.setCustomValidity('');
            }
            inputCompanyName.reportValidity();
        }

        let inputRegistration = this.template.querySelector('.inputRegistration');
        if (e.target.name === 'entryRegistration') {
            if (this.isvehiclecard) {
                if ((inputRegistration.value == null || inputRegistration.value.length == 0)) {
                    inputRegistration.setCustomValidity(this.lbl_card_error_required);
                } else {
                    let ret_checkRegistration = this.checkregistration(inputRegistration.value);
                    if (ret_checkRegistration == 1) {
                        inputRegistration.setCustomValidity(this.lbl_card_error_notgerman);
                    } else if (ret_checkRegistration == 2) {
                        inputRegistration.setCustomValidity(this.lbl_card_error_plate);
                    } else if (this.duplicateregistration(inputRegistration.value)) {
                        inputRegistration.setCustomValidity(this.lbl_card_error_existcard);
                    } else {
                        inputRegistration.setCustomValidity('');
                    }
                }
            } else {
                inputRegistration.setCustomValidity('');
            }
            inputRegistration.reportValidity();
        }
        
        this.activatebtnparentnext();
        this.activationbtnmodify();
        this.activationbtnconfirmname();
        
    }

    entryChangePin(evt) {
        let ASCIICode = (evt.which) ? evt.which : evt.keyCode;
        this.msg_error_pincode = this.lbl_card_error_pincode;
        if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) {
            // Add the class 'error' to the fieldset to display the error message
            this.template.querySelector('.fieldsetpin').classList.add('errorpin');
            evt.preventDefault()
        } else {
            this.msg_error_pincode = '';
            // Remove the class 'error' from the fieldset if it was previously added
            this.template.querySelector('.fieldsetpin').classList.remove('errorpin');
        }
    }

    hideshowcodepin(event) {
        if (event.target.name !== 'show_pincode') return;
        // Get the code pin field
        let inputcodepin = this.template.querySelector('.inputpin');
        if (!inputcodepin) return;
        // Check if the pin code should be shown or hidden
        if (event.target.checked) {
            // Show the code pin
            inputcodepin.type = 'text';
        } else {
            // Hide the code pin
            inputcodepin.type = 'password';
        }
    }

    limitPinCodeLength(evt) {
        var inputpincode = evt.target;
        if (inputpincode.value.length === 0) {
            this.msg_error_pincode = this.lbl_card_error_required;
            this.template.querySelector('.fieldsetpin').classList.add('errorpin');
        } else if (inputpincode.value.length > 4 || inputpincode.value === '0000') {
            this.msg_error_pincode = this.lbl_card_error_pincode;
            // Add the class 'errorLength' to the fieldset to display the error message for length
            this.template.querySelector('.fieldsetpin').classList.add('errorpin');
        } else {
            this.msg_error_pincode = '';
            // Remove the class 'errorLength' from the fieldset if the length is within the limit
            this.template.querySelector('.fieldsetpin').classList.remove('errorpin');
        }
        // Size of code pin limited to 4 characters
        this.entryCodePin = inputpincode.value.slice(0, 4);
        inputpincode.value = inputpincode.value.slice(0, 4);
        this.activationbtnmodify();
    }

    choicepin(e) {
        if (e.target.name === 'genpin') {
            this.genpin = true;
            this.cuspin = false;
            this.entryCodePin = null;
        } else {
            this.genpin = false;
            this.cuspin = true;
        }
        this.activationbtnmodify();
    }

    duplicatedrivercard(fname, lname) {
        let isDupCars = false;
        for (var i = 0; i < this.lstcards.length; i++) {
            if (this.selectedid == null || this.selectedid != this.lstcards[i].id) {
                if (fname === this.lstcards[i].firstname && lname === this.lstcards[i].lastname) {
                    isDupCars = true;
                }
            }
        }
        return isDupCars;
    }

    duplicateregistration(immat) {
        let immatcleanbasket;
        let immatclean = immat.replaceAll(' ', '').replaceAll('-', '');
        let isDupReg = false;
        for (var i = 0; i < this.lstcards.length; i++){ 
            if (this.selectedid == null || this.selectedid != this.lstcards[i].id) {
                immatcleanbasket = this.lstcards[i].registration.replaceAll(' ', '').replaceAll('-', '');
                if (immatclean === immatcleanbasket) { isDupReg = true; }
            }
        }
        return isDupReg;
    }

    checkregistration(immat) {
        let valuecheck = 0; 
        var regExpentryRegistration = /^([A-Za-z0-9 ,.'+&/ÜÖÄüöä-]+)$/; 
        //let immat = 'BB-PPP-23I49';
        let immatsplitdashes = immat.split('-');
        let immatsplitspace = immat.split(' ');

        let immatclean = immat.replaceAll(' ', '').replaceAll('-', '');

        let immatcleannum;
        let immatcleanalpha;

        const firstNumber = immatclean.search(/\d+/);

        // valuecheck = 1 - 'This is not a german licence plate format'
        if (immatclean < 3) {
            valuecheck = 1;
        }
        else if (immatclean > 8) {
            valuecheck = 1;
        }
        else if (immat.startsWith(' ') || immat.startsWith('-') || immat.endsWith(' ') || immat.endsWith('-') ) {
            valuecheck = 2;
        }
        else if (immat.indexOf('  ') !== -1 || immat.indexOf('--') !== -1) {
            valuecheck = 2;
        }        
        else if (immatsplitdashes.length > 1) {
            if( immatsplitdashes.length != 3) {
                valuecheck = 1;
            } else if (!/^[a-zA-Z]+$/.test(immatsplitdashes[0])) {
                valuecheck = 1;
            } else if (immatsplitdashes[0].length > 3) {
                valuecheck = 1;
            } else if (!/^[a-zA-Z]+$/.test(immatsplitdashes[1])) {
                valuecheck = 1;
            } else if (immatsplitdashes[1].length > 2) {
                valuecheck = 1;
            } else if (isNaN(immatsplitdashes[2])) {
                valuecheck = 1;
            } else if (immatsplitdashes[2].length > 4) {
                valuecheck = 1;
            }
        }
        else if (immatsplitspace.length > 1) {
            if( immatsplitspace.length != 3) {
                valuecheck = 1;
            } else if (!/^[a-zA-Z]+$/.test(immatsplitspace[0])) {
                valuecheck = 1;
            } else if (immatsplitspace[0].length > 3) {
                valuecheck = 1;
            } else if (!/^[a-zA-Z]+$/.test(immatsplitspace[1])) {
                valuecheck = 1;
            } else if (immatsplitspace[1].length > 2) {
                    valuecheck = 1;
            } else if (isNaN(immatsplitspace[2])) {
                valuecheck = 1;
            } else if (immatsplitspace[2].length > 4) {
                valuecheck = 1;
            }
        }
        else if (firstNumber === -1) {
            valuecheck = 1;
            } else {
            immatcleannum = immatclean.substring(firstNumber, immatclean.length);
            immatcleanalpha = immatclean.substring(0, firstNumber);
            if (isNaN(immatcleannum)) {
                valuecheck = 1;
            } else if (immatcleannum.length > 4) {
                valuecheck = 1;
            } else if (immatcleanalpha.length > 5) {
                valuecheck = 1;
            } else if (!/^[a-zA-Z]+$/.test(immatcleanalpha)) {
                valuecheck = 1;
            }
        }
        return valuecheck;
    }

    defineincrease() {
        this.showincrease = true;
        this.debug('defineincrease');        
    }

    getleadid() {
        //console.log(this.leadid);
    }

    activatebtnparentnext() {
        let toactivateparentnext = !this.errorestimation && this.valueChoiceCards > 0 && this.valueChoiceCards <= 20;
        let ev = new CustomEvent('parentnext', {detail :{ toactivate: toactivateparentnext, tohide: this.valueChoiceCards == 21 } } );
        this.dispatchEvent(ev);    
    }

    updatecardname(){
        let namecard = '';
        let namefilled = this.entryFirstName != null && this.entryLastName !== null && this.entryFirstName !== '' && this.entryLastName !== '';
        if (this.isdrivercard && ( this.entryNameCard == null || this.entryNameCard.replaceAll(' ', '') == '') && namefilled) {
            namecard = this.entryFirstName + ' ' + this.entryLastName;
            if (namecard.length > 19) {
                namecard = ((this.entryFirstName.substring(0,1) + ' ' + this.entryLastName).substring(0,19)).toUpperCase();
            }
            this.entryNameCard = namecard;
        }

        if (this.isvehiclecard && this.entryNameCard == null && this.entryRegistration != null ) {
            this.entryNameCard = this.entryRegistration;
        }
        //this.debug('updatecardname');        
    }

    activationbtnconfirmname() {
        if (this.template.querySelector('.btnconfirmname') == null) { return ;}
        
        let inputCompanyName = this.template.querySelector('.inputCompanyName');
        let btninactive = this.template.querySelector('.btnconfirmname').classList.value.includes('inactive');
        let namefilled = this.entryCompanyName !== null && this.entryCompanyName !== '';

        if (btninactive && namefilled && inputCompanyName.validity.valid) 
        {
            this.template.querySelector('.btnconfirmname').classList.remove('inactive'); 
        }
        if (!btninactive && (!namefilled || !inputCompanyName.validity.valid)) 
        {
            this.template.querySelector('.btnconfirmname').classList.add('inactive'); 
        }    
        //this.debug('activationbtnconfirmname');        
    }

    activationbtnmodify() {
        if (this.template.querySelector('.btnmodify') == null) { return ;}
        if (this.template.querySelector('.inputFirstName') == null && this.template.querySelector('.inputRegistration') == null) { return; }

        let isValidPin = false;
        if (this.genpin) { isValidPin = true; }
        else if (this.entryCodePin.length == 4 && this.entryCodePin != '0000') { isValidPin = true; }

        let btnmodifyinactive = this.template.querySelector('.btnmodify').classList.value.includes('inactive');
        
        let inputFirstName = this.template.querySelector('.inputFirstName');
        let inputLastName = this.template.querySelector('.inputLastName');
        let inputNameCard = this.template.querySelector('.inputNameCard');
        let inputRegistration = this.template.querySelector('.inputRegistration');

        let drivercardvalid;
        if (this.isdrivercard) {
            drivercardvalid = inputFirstName.validity.valid && inputLastName.validity.valid && inputNameCard.validity.valid;
        }
        //console.log('drivercardvalid : ' + drivercardvalid);
        let namefilled = this.entryFirstName != null && this.entryLastName !== null && this.entryFirstName != '' && this.entryLastName !== '';
        //console.log('namefilled : ' + namefilled);
        //console.log('isValidPin : ' + isValidPin);

        if (this.isdrivercard && btnmodifyinactive && namefilled && drivercardvalid && isValidPin) 
        {
            this.template.querySelector('.btnmodify').classList.remove('inactive'); 
        }
        if (this.isdrivercard && !btnmodifyinactive && ( !namefilled || !drivercardvalid || !isValidPin)  ) 
        {
            this.template.querySelector('.btnmodify').classList.add('inactive'); 
        }
        if (this.isvehiclecard && btnmodifyinactive && this.entryRegistration != null && inputRegistration.validity.valid  && isValidPin ) 
        {
            this.template.querySelector('.btnmodify').classList.remove('inactive'); 
        }
        if (this.isvehiclecard && !btnmodifyinactive && (this.entryRegistration == null || !inputRegistration.validity.valid || !isValidPin) ) 
        {
            this.template.querySelector('.btnmodify').classList.add('inactive'); 
        }     
    }

    refreshclientslist() {
        this.typecarddisable = false;
        this.entryFirstName = null;
        this.entryLastName = null;
        this.entryNameCard = null;
        this.entryRegistration = null;
        this.entryCodePin = null;
        this.selectedid = null;
        this.isdrivercard = true;
        this.isvehiclecard = false;
        this.cuspin = false;
        this.genpin = true;
        this.msg_error_pincode = false;

        //let __lstclient = [];
        let __lstclient = this.lstcards;
        let lblbtnproceed = this.lbl_card_btn_proceed;

        /*
        if(localStorage.getItem('utalstcards')) {
            this.lstcards = JSON.parse(localStorage.getItem('utalstcards'));
            __lstclient = JSON.parse(localStorage.getItem('utalstcards'));
            this.numbercardsfilled = __lstclient.length;
        } */
        //console.log('---- PASSAGE  ----');
        //console.log(__lstclient.length);
        //console.log(this.valueChoiceCards);
        this.subtitle = this.lbl_card_subtitle1;
        this.numbercardsfilled = __lstclient.length;
        if (parseInt(__lstclient.length) > parseInt(this.valueChoiceCards)) 
            { this.numbercardstoomuck = true; this.numbercardsok = true; 
            this.lblcardtodelete = this.lbl_card_msg_deleteextra.replace( '#' , parseInt(__lstclient.length) - parseInt(this.valueChoiceCards) );
            if (parseInt(__lstclient.length) - parseInt(this.valueChoiceCards) === 1) {
                this.lbl_card_msg_deleteextra.replaceAll('(s)', '');
            } else {
                this.lbl_card_msg_deleteextra.replaceAll('(s)', 's');
            }
            this.subtitle = this.lbl_card_subtitle2;
            } 
        else if (parseInt(__lstclient.length) == parseInt(this.valueChoiceCards)) 
            { this.numbercardsok = true; this.numbercardstoomuck = false; 
                this.subtitle = this.lbl_card_subtitle2; 
                lblbtnproceed = this.lbl_card_btn_next;
            } 
        else { this.numbercardsok = false; this.numbercardstoomuck = false; } 
        
        
        //console.log('PASS 1 : ' + lblbtnproceed);
        if (__lstclient.length != 0 && parseInt(__lstclient.length) < parseInt(this.valueChoiceCards)) {
            //console.log('PASS 2 : ' + lblbtnproceed);
            lblbtnproceed = lblbtnproceed.replaceAll('#', __lstclient.length);
            //console.log('PASS 3 : ' + lblbtnproceed);
            if (parseInt(__lstclient.length) == 1) {
                lblbtnproceed = lblbtnproceed.replace('(s)', '');
                //console.log('PASS 4 : ' + lblbtnproceed);
            } else {
                lblbtnproceed = lblbtnproceed.replace('(s)', 's');
                //('PASS 5 : ' + lblbtnproceed);
            }
        }
        this.btnnextstep = lblbtnproceed;

        if ( __lstclient.length == 0 ) { 
            this.subtitle = this.lbl_card_subtitle0; 
            this.nocard = true; 
        } else { 
            this.nocard = false; 
        }
        if (this.stepnumofcards) { this.changenumber(); }
        //this.debug('refreshclientslist');               
    }

    unselectedcard() {
        for( var i = 0; i < this.lstcards.length; i++){ 
            if ( this.template.querySelector('.' + this.lstcards[i].clsdiv).classList.value.includes('divclientselected'))
            {
                this.template.querySelector('.' + this.lstcards[i].clsdiv).classList.remove('divclientselected');
            }
            if ( this.template.querySelector('.' + this.lstcards[i].clsbtnedit).classList.value.includes('spanclientselected'))
            {
                this.template.querySelector('.' + this.lstcards[i].clsbtnedit).classList.remove('spanclientselected');
            }
        }        
    }
    
    abordedit() {
        this.typecarddisable = false;
        this.isdrivercard = true;
        this.isvehiclecard = false;        
        this.entryLastName = null;
        this.entryFirstName = null;
        this.entryNameCard = null;
        this.entryRegistration = null;
        this.selectedid = null;
        this.entryCodePin = null;
        this.cuspin = false;
        this.genpin = true;

        this.unselectedcard();
        this.refreshclientslist();
        this.debug('abordedit');               
    }

    editcard(event) {
        this.unselectedcard();
        this.numbercardsok = false;
        this.typecarddisable = true;
        //let updatelist = [];
        /*
        if ( localStorage.getItem('utalstcards') ) {
            updatelist = JSON.parse(localStorage.getItem('utalstcards'));
            for( var i = 0; i < updatelist.length; i++){ 
                if ( updatelist[i].id === event.target.name || updatelist[i].id === event.target.dataset.name ) { 
                    this.entryFirstName = updatelist[i].firstname; 
                    this.entryLastName = updatelist[i].lastname;
                    this.entryNameCard = updatelist[i].namecard;
                    this.entryRegistration = updatelist[i].registration;       
                    this.isdrivercard = updatelist[i].isdrivercard;
                    this.isvehiclecard = !updatelist[i].isdrivercard;
                    this.selectedid = updatelist[i].id;                    
                } 
            }
        }*/
        for( var i = 0; i < this.lstcards.length; i++){ 
            if ( this.lstcards[i].id === event.target.name || this.lstcards[i].id === event.target.dataset.name ) { 
                this.entryFirstName = this.lstcards[i].firstname; 
                this.entryLastName = this.lstcards[i].lastname;
                this.entryNameCard = this.lstcards[i].namecard;
                this.entryRegistration = this.lstcards[i].registration;       
                this.isdrivercard = this.lstcards[i].isdrivercard;
                this.isvehiclecard = !this.lstcards[i].isdrivercard;
                this.selectedid = this.lstcards[i].id;   
                this.template.querySelector('.' + this.lstcards[i].clsdiv).classList.add('divclientselected');
                this.template.querySelector('.' + this.lstcards[i].clsbtnedit).classList.add('spanclientselected');
            } 
        }
        this.debug('editcard');               
    }

    modifycard() {
        /*let updatelist = [];
        if ( localStorage.getItem('utalstcards') ) {
            updatelist = JSON.parse(localStorage.getItem('utalstcards'));
            for( var i = 0; i < updatelist.length; i++){ 
                if ( updatelist[i].id === this.selectedid ) { 
                    updatelist[i].firstname = this.entryFirstName ; 
                    updatelist[i].lastname = this.entryLastName;
                    updatelist[i].namecard = this.entryNameCard;                    
                    updatelist[i].registration =  this.entryRegistration;                      
                    updatelist[i].name = this.isdrivercard ? this.entryLastName + " " + this.entryFirstName : this.entryRegistration ;
                } 
            }
            localStorage.setItem('utalstcards', JSON.stringify(updatelist));             
        }
        */
        for( var i = 0; i < this.lstcards.length; i++){ 
            if ( this.lstcards[i].id === this.selectedid ) { 
                this.lstcards[i].firstname = this.entryFirstName ; 
                this.lstcards[i].lastname = this.entryLastName;
                this.lstcards[i].namecard = this.entryNameCard;                    
                this.lstcards[i].registration =  this.entryRegistration;                      
                this.lstcards[i].name = this.isdrivercard ? this.entryLastName + " " + this.entryFirstName : this.entryRegistration ;
                this.lstcards[i].ispincode = this.cuspin;
                this.lstcards[i].pincode = this.entryCodePin;
                this.template.querySelector('.' + this.lstcards[i].clsdiv).classList.remove('divclientselected');
                this.template.querySelector('.' + this.lstcards[i].clsbtnedit).classList.remove('spanclientselected');
            } 
        }
        this.typecarddisable = false;
        this.refreshforminfo();
        this.debug('modifycard');               
    }

    addcard() {
        this.unselectedcard();
        if (this.selectedid) {this.modifycard(); return; }
        //let newlist = [];

        /*
        if ( localStorage.getItem('utalstcards') ) {
            newlist = localStorage.getItem('utalstcards');
            newlist = JSON.parse(newlist);
        }
        */
        let idclient = this.generateid();
        if (this.isdrivercard) { this.lstcards.push({ id: idclient, lastname : this.entryLastName, registration: '', firstname: this.entryFirstName, namecard : this.entryNameCard , name: this.entryLastName + " " + this.entryFirstName, isdrivercard: true, type: this.lbl_card_fldopt_driver, ispincode: this.cuspin , pincode: this.entryCodePin , clsdiv: 'div' + idclient, clsbtnedit: 'btnedit' + idclient }); }
        else { this.lstcards.push({ id: idclient, lastname : '', firstname: '',  registration: this.entryRegistration, namecard : this.entryRegistration, name: this.entryRegistration , isdrivercard: false, type: this.lbl_card_fldopt_vehicle, ispincode: this.cuspin , pincode: this.entryCodePin, clsdiv: 'div' + idclient, clsbtnedit: 'btnedit' + idclient }); }
        //newlist = [..., {id: ""} ];
        //localStorage.setItem('utalstcards', JSON.stringify(newlist));     
        //this.refreshclientslist();
        this.refreshforminfo();
        this.debug('addcard');               
    }

    openmodaldelete(event) {
        this.cardidtodelete = event.target.dataset.name;
        this.isModalDelete = true;
        this.debug('openmodaldelete');                      
    }

    closemodaldelete() {
        this.isModalDelete = false;
        this.debug('closemodaldelete');                      
    }

    deletecard() {
        /*
        let newlist = localStorage.getItem('utalstcards');
        newlist = JSON.parse(newlist);
        //|| newlist[i].id === event.target.dataset.name 
        console.log('DELETE ID');
        console.log(this.cardidtodelete);
        for( var i = 0; i < newlist.length; i++){ 
            if ( newlist[i].id === this.cardidtodelete ) { 
                newlist.splice(i, 1); 
            }
        }*/
        for( var i = 0; i < this.lstcards.length; i++){ 
            if ( this.lstcards[i].id === this.cardidtodelete ) { 
                this.lstcards.splice(i, 1); 
            }
        }
        this.isModalDelete = true;
        //newlist = [..., {id: ""} ];
        //localStorage.setItem('utalstcards', JSON.stringify(newlist)); 
        this.refreshclientslist(); 
        this.isModalDelete = false;   
        this.debug('deletecard');                      

    }

    /*
    deletecli(event) {
        let newlist = localStorage.getItem('utalstcards');
        newlist = JSON.parse(newlist);

        for( var i = 0; i < newlist.length; i++){ 
            if ( newlist[i].id === event.target.name || newlist[i].id === event.target.dataset.name ) { 
                newlist.splice(i, 1); 
            }
        }

        //newlist = [..., {id: ""} ];
        localStorage.setItem('utalstcards', JSON.stringify(newlist)); 
        this.refreshclientslist();
        
    }
    */

    confirmname() {
        updateLeadCompanyShortName ( { leadId: this.leadid, companyShortName: this.entryCompanyName } )  
        .then(result => {
            if (result.code === '100') {
                console.log('SUCCESS : update Lead Company Short Name');
            } else {
                console.log('error update Lead Company Short Name');
                console.log(result);          
            }
        })
        .catch(error => {
            console.log('created error');
            console.log('ERROR : ' + this.reduceErrors(error).join(', '));
            return;
        });

        this.stepcompanyname = false;
        this.refreshforminfo();
        //this.debug('confirmname');                      
    }

    backcompanyname() {
        this.stepcompanyname = true;
        this.refreshforminfo();
        //this.debug('backcompanyname');                      
    }

    gotobankdetail() {
        const fields = {};
        fields["LeadId"] = this.leadid;
        fields["Basket"] = this.lstcards;
       
        //console.log(JSON.stringify(fields));

        submitBasket ( { baskettosave: JSON.stringify(fields) } )  
        .then(result => {
            if (result.code === '100') {
                if (result.processcode != 100) {
                    //this.spinnerhide();
                    console.log(result.message);
                    console.log('SUCCESS : BASKET PARTIALLY NOT SAVED');
                }
                //this.spinnerhide();
                console.log('SUCCESS : SUBMIT BASKET');
            } else {
                //this.spinnerhide();
                console.log('erreur SUBMIT BASKET');
                console.log(result);
                //window.open('whoops?lg=' + this.lg,"_self");                
            }
        })
        .catch(error => {
            //this.spinnerhide();
            console.log('created error');
            console.log('ERROR : ' + this.reduceErrors(error).join(', '));
            //window.open('whoops?lg=' + this.lg,"_self");
            return;
        });

        this.stepnumofcards = false;
        let ev = new CustomEvent('gotobankdetail');
        this.dispatchEvent(ev);   
        //this.debug('gotobankdetail');                      
    }

    backnumbercard() {
        this.stepnumofcards = true;
        this.refreshforminfo();        
        let ev = new CustomEvent('backnumbercard');
        this.dispatchEvent(ev);           
    }

    redirectnocontact(){
        window.open('orderfeedbacksorry?lg=' + this.lg,"_self"); 
    }

    redirectcontact(){
        window.open('orderfeedbackrequest?lg=' + this.lg,"_self");
    }

    generateid() {
        var text = "";
        var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
      
        for (var i = 0; i < 6; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));      
        return text;
    }

    debug(fct) {
        console.log(fct);
        //console.log( 'toactivateparentnext : ' + this.toactivateparentnext+ ' - ' +  ' entryLastName : ' + this.entryLastName+ ' - ' + 'entryFirstName : ' + this.entryFirstName+ ' - ' + 'entryNameCard : ' + this.entryNameCard+ ' - ' + 'entryCompanyName : ' + this.entryCompanyName    + ' - ' + 'entryRegistration : ' + this.entryRegistration+ ' - ' + 'entryAmount : ' + this.entryAmount+ ' - ' + 'selectedid : ' + this.selectedid+ ' - ' + 'numbercardsfilled : ' + this.numbercardsfilled+ ' - ' + 'nocard : ' + this.nocard+ ' - ' + 'valueChoiceCards : ' + this.valueChoiceCards+ ' - ' + 'showincrease : ' + this.showincrease+ ' - ' + 'askincrease : ' + this.askincrease+ ' - ' + 'cardsmore20 : ' + this.cardsmore20+ ' - ' + 'isdrivercard : ' + this.isdrivercard+ ' - ' + 'isvehiclecard : ' + this.isvehiclecard+ ' - ' + 'numbercardsok : ' + this.numbercardsok+ ' - ' + 'numbercardstoomuck : ' + this.numbercardstoomuck+ ' - ' + 'isModalDelete : ' + this.isModalDelete+ ' - ' + 'typecarddisable : ' + this.typecarddisable+ ' - ' + 'cardidtodelete : ' + this.cardidtodelete);
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