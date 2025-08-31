import { LightningElement, track, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import respoc from '@salesforce/resourceUrl/res_poc2';
import submitLead from '@salesforce/apex/LWC_POC2.submitLead';
import getDataLead from '@salesforce/apex/LWC_POC2.getDataLead';
import updateLeadBank from '@salesforce/apex/LWC_POC2.updateLeadBank';
import submitconfirm from '@salesforce/apex/LWC_POC2.submitconfirm';


export default class Lwc_POC2_Main0 extends LightningElement {
    imagelogo = respoc + '/uta_logo.png';
    @track isLoaded = true;
    @track leadid = '';// '00Q0600000Y1feaEAB';
    @track idleadfilled = false;
    @track modedemo = false;
    @track numEtape = 1;
    @track nextbtnlabel = 'Your Details';
    @track previousbtnlabel = '';
    @track showbarbutton = true;
    @track step1 = true;
    @track step2 = false;
    @track step3 = false;
    @track step4 = false;
    @track step5 = false;
    @track step4_issepamandate = false;
    @track infoAccount = [];
    @track infoCards = [];
    @track infoPackage = [];
    @track infoBank = [];
    @track infoConfirmation = [];
    @track lblnbcard = '';
    @track __pac_label = '';
    @track __pac_num = 0;
    @track __pac_isnum1 = false;
    @track __pac_isnum2 = false;
    @track __acc_FirstName = '';
    @track __acc_LastName = '';
    @track __acc_Email = '';
    @track __acc_Phone = '';
    @track __acc_CP = '';
    @track __acc_AccountName = '';
    @track __acc_StreetName = '';
    @track __acc_Salutation = '';
    @track __acc_CP = '';
    @track __acc_City = '';   
    @track __acc_Vat = '';   
    @track __acc_Tax = '';   
    @track __acc_Crefo = '';
    @track __acc_Registration = '';
    @track __acc_Extention = '';
    @track __crd_CompanyName = '';
    @track __crd_ListCard = [];
    @track __crd_NumberCards = 0;
    @track __crd_Amount = 0;
    @track __bnk_AccountName = '';
    @track __bnk_Iban = '';
    @track __bnk_BankName = '';
    @track __bnk_Bic = '';
    @track __bnk_Mandate = null;
    @track __bnk_Ibanvalid = false;
    @track __conf_agreeterm = false;
    @track __conf_mktcampaign = false;
    @track __conf_mktnewsletter = false;
    @track __conf_mktsurvey = false;

    @track lg = '';
    parameters = new Map();
    dataalreadyload = false;
    @track lbl_main_menu_package = 'Package';
    @track lbl_main_menu_details = 'Your details';
    @track lbl_main_menu_cards = 'Cards';
    @track lbl_main_lbl_card = 'Card';
    @track lbl_main_menu_bank = 'Bank details';
    @track lbl_main_menu_confirm = 'Confirm order';
    @track lbl_main_link_terms = 'Terms & Conditions';
    @track lbl_main_link_data = 'Data protection';
    @track lbl_main_link_imprint = 'Imprint';
    @track lbl_main_btn_previous = 'Previous';
    
    @track lbl_main_btn_yourdetails = 'Your Details';
    @track lbl_main_btn_yourpackage = 'Your package';
    @track lbl_main_btn_yourcards = 'Your Cards';
    @track lbl_main_btn_ordercards = 'Order your cards';
    @track lbl_main_btn_bankdetails = 'Bank Details';
    @track lbl_main_btn_bkcards = 'Back to cards';
    @track lbl_main_btn_confirm = 'Confirm';
    @track lbl_main_btn_review = 'Review and confirm order';
    @track lbl_main_btn_bkbankdetails = 'Back to bank details';
    @track lbl_main_btn_next = 'Next';
    @track lbl_main_btn_back = 'Back';
    @track lbl_main_btn_confirmorder = 'Confirm your order';

    @wire(CurrentPageReference)
    getpageRef(pageRef) {
        for (const key of Object.keys(pageRef.state)) {
            if (key == 'lg') { this.lg = pageRef.state[key]; }
            if (key == 'step') { 
                this.numEtape = parseInt(pageRef.state[key]);    
            } 
            if (key == 'leadid') { 
                this.leadid = pageRef.state[key]; 
                this.idleadfilled = true;
                //this.getleaddata();
            }
            if (key == 'mode' && pageRef.state[key] == 'prod' ) {             
                this.modedemo = false;
            }
        }
    }

    /*
    @wire(getDataLead, {recordId: '$leadid'}) details({error,data}) {
        if(data) {
            console.log('wire getdatalead');
            let dt = data.datalead[0];
            this.dataalreadyload = true;
            console.log('dt');
            console.log(dt);
            if (dt != undefined) {
                let numphone = dt.Phone;
                let extension = numphone.startsWith("+") ? numphone.split(' ')[0] : null;
                this.infoAccount[0] = dt.FirstName;
                this.infoAccount[1] = dt.LastName;
                this.infoAccount[2] = dt.Email;//email
                this.infoAccount[3] = numphone.startsWith("+") ? numphone.substring(extension.length + 1, numphone.length) : numphone;//phone
                this.infoAccount[4] = dt.PostalCode;
                this.infoAccount[5] = dt.Company;
                this.infoAccount[6] = dt.Street;
                this.infoAccount[7] = dt.Salutation;//
                this.infoAccount[8] = dt.City;
                this.infoAccount[9] = dt.project_mse__VATNumber__c;
                this.infoAccount[10] = dt.project_mse__TaxNumber__c;
                this.infoAccount[11] = null;//registration
                this.infoAccount[12] = null;//registration
                this.infoAccount[13] = extension == null ? null : extension.replace('+', '');
            
                this.infoPackage[0] = dt.project_mse__BundleVariant__c === 'Plus' ? 2 : (dt.project_mse__BundleVariant__c === 'Basic' ? 1 : 0);
                this.infoPackage[1] = dt.project_mse__BundleVariant__c === 'Plus' ? 'SuperFlex' : (dt.project_mse__BundleVariant__c === 'Basic' ? 'SuperSaver' : '');
                this.infoPackage[2] = dt.project_mse__BundleVariant__c === 'Basic' ? true : false;
                this.infoPackage[3] = dt.project_mse__BundleVariant__c === 'Plus' ? true : false;
    
                var drivercard = true;
                var varname;
                var vartype;

                let listofcards = [];
                for( var i = 0; i < dt.project_mse__Basket_Items__r.length; i++){ 
                    drivercard = dt.project_mse__Basket_Items__r[i].project_mse__Vehicle_registration_number__c == null;
                    if (drivercard) {
                        varname = dt.project_mse__Basket_Items__r[i].project_mse__First_Name__c + ' ' + dt.project_mse__Basket_Items__r[i].project_mse__Last_Name__c;
                    } else {
                        varname = dt.project_mse__Basket_Items__r[i].project_mse__Vehicle_registration_number__c;
                    }

                    vartype = drivercard ? 'Driver card' : 'Vehicle card';
                                
                    listofcards.push({id: dt.project_mse__Basket_Items__r[i].project_mse__Basket_Item_Reference__c,
                    firstname: dt.project_mse__Basket_Items__r[i].project_mse__First_Name__c,
                    lastname : dt.project_mse__Basket_Items__r[i].project_mse__Last_Name__c,
                    namecard : dt.project_mse__Basket_Items__r[i].project_mse__Name_on_the_card__c,               
                    registration : dt.project_mse__Basket_Items__r[i].project_mse__Vehicle_registration_number__c,
                    ispincode : dt.project_mse__Basket_Items__r[i].project_mse__Auto_Generate_Pin__c,
                    isdrivercard: drivercard,
                    name: varname,
                    type: vartype,
                    clsdiv : 'div' + dt.project_mse__Basket_Items__r[i].project_mse__Basket_Item_Reference__c, 
                    clsbtnedit: 'btnedit' + dt.project_mse__Basket_Items__r[i].project_mse__Basket_Item_Reference__c
                }); 
                this.infoCards[1] = listofcards;
                this.infoCards[2] = 0;
                this.infoCards[3] = 0;
                
                this.getInfoAccount();
                this.getInfoPackage();
                this.getInfoCard();
                console.log('wire getdatalead end');
        }
            
            }
        } else {
            console.log('ERROR wire getdatalead : '+error);
            console.log(error);
        }
    }
    */

    getleaddata() {
        if (this.dataalreadyload) { return; }
        getDataLead({ recordId: this.leadid })
        .then(result => {
            let dt = result.datalead[0];
            this.dataalreadyload = true;
            let numphone = dt.Phone;
            let extension = numphone.startsWith("+") ? numphone.split(' ')[0] : null;
            this.infoAccount[0] = dt.FirstName;
            this.infoAccount[1] = dt.LastName;
            this.infoAccount[2] = dt.Email;//email
            this.infoAccount[3] = numphone.startsWith("+") ? numphone.substring(extension.length + 1, numphone.length) : numphone;//phone
            this.infoAccount[4] = dt.PostalCode;
            this.infoAccount[5] = dt.Company;
            this.infoAccount[6] = dt.Street;
            this.infoAccount[7] = dt.Salutation;//
            this.infoAccount[8] = dt.City;
            this.infoAccount[9] = dt.project_mse__VATNumber__c;
            this.infoAccount[10] = dt.project_mse__TaxNumber__c;
            this.infoAccount[11] = null;//registration
            this.infoAccount[12] = null;//registration
            this.infoAccount[13] = extension == null ? null : extension.replace('+', '');

            this.infoPackage[0] = dt.project_mse__BundleVariant__c === 'Plus' ? 2 : (dt.project_mse__BundleVariant__c === 'Basic' ? 1 : 0);
            this.infoPackage[1] = dt.project_mse__BundleVariant__c === 'Plus' ? 'SuperFlex' : (dt.project_mse__BundleVariant__c === 'Basic' ? 'SuperSaver' : '');
            this.infoPackage[2] = dt.project_mse__BundleVariant__c === 'Basic' ? true : false;
            this.infoPackage[3] = dt.project_mse__BundleVariant__c === 'Plus' ? true : false;

            this.infoBank[0] = dt.project_mse__IBAN__c;
            this.infoBank[1] = dt.project_mse__AccountHolderName__c;
            this.infoBank[2] = dt.project_mse__BankName__c;
            this.infoBank[3] = dt.project_mse__BIC__c;
            this.infoBank[4] = null;
            this.infoBank[5] = null;
            
            var drivercard = true;
            var varname;
            var vartype;

            let listofcards = [];
            
            //console.log('dt.project_mse__Basket_Items__r');
            //console.log(dt.project_mse__Basket_Items__r);
            if (dt.project_mse__Basket_Items__r) {
            for( var i = 0; i < dt.project_mse__Basket_Items__r.length; i++){ 
                drivercard = dt.project_mse__Basket_Items__r[i].project_mse__Vehicle_registration_number__c == null;
                if (drivercard) {
                    varname = dt.project_mse__Basket_Items__r[i].project_mse__First_Name__c + ' ' + dt.project_mse__Basket_Items__r[i].project_mse__Last_Name__c;
                } else {
                    varname = dt.project_mse__Basket_Items__r[i].project_mse__Vehicle_registration_number__c;
                }

                vartype = drivercard ? 'Driver card' : 'Vehicle card';
                            
                listofcards.push({id: dt.project_mse__Basket_Items__r[i].project_mse__Basket_Item_Reference__c,
                firstname: dt.project_mse__Basket_Items__r[i].project_mse__First_Name__c,
                lastname : dt.project_mse__Basket_Items__r[i].project_mse__Last_Name__c,
                namecard : dt.project_mse__Basket_Items__r[i].project_mse__Name_on_the_card__c,               
                registration : dt.project_mse__Basket_Items__r[i].project_mse__Vehicle_registration_number__c,
                ispincode : dt.project_mse__Basket_Items__r[i].project_mse__Auto_Generate_Pin__c,
                isdrivercard: drivercard,
                name: varname,
                type: vartype,
                clsdiv : 'div' + dt.project_mse__Basket_Items__r[i].project_mse__Basket_Item_Reference__c, 
                clsbtnedit: 'btnedit' + dt.project_mse__Basket_Items__r[i].project_mse__Basket_Item_Reference__c
            });
                //this.lstcards[i].pincode = this.entryCodePin;
            }                
            }

            /* this.lstcards.push({
                --id: __lstcard[i].id, 
                --lastname : __lstcard[i].lastname, 
                --registration: __lstcard[i].registration, 
                --firstname: __lstcard[i].firstname, 
                --namecard : __lstcard[i].namecard, 
                --name: __lstcard[i].name, 
                --isdrivercard: __lstcard[i].isdrivercard, 
                --type: __lstcard[i].type, 
                clsdiv: __lstcard[i].clsdiv, 
                clsbtnedit: __lstcard[i].clsbtnedit});*/

            this.infoCards[0] = dt.project_mse__CompanyShortName__c;
            this.infoCards[1] = listofcards;
            this.infoCards[2] = dt.project_mse__Basket_Items__r.length;
            this.infoCards[3] = 1500;

            this.getInfoAccount();
            this.getInfoPackage();
            this.getInfoBank();
            this.getInfoCard();
            this.diffusedata();
        })
        .catch(error => {
            console.log('ERROR getLeaddata : ' + error);
            console.log(error);
        });
        
    }

    diffusedata(){
        let datainfo = [{account: this.infoAccount, package: this.infoPackage, cards: this.infoCards, bank: this.infoBank}];
        if (this.template.querySelector('c-lwc-poc2-confirmation')) {
        this.template.querySelector('c-lwc-poc2-confirmation').loaddata(datainfo);
        }
        if (this.template.querySelector('c-lwc-poc2-account')) {
            this.template.querySelector('c-lwc-poc2-account').loaddata([{account: this.infoAccount}]);
        }
        if (this.template.querySelector('c-lwc-poc2-package')) {
            this.template.querySelector('c-lwc-poc2-package').loaddata([{package: this.infoPackage}]);
        }
        if (this.template.querySelector('c-lwc-poc2-card')) {
            this.template.querySelector('c-lwc-poc2-card').loaddata([{cards: this.infoCards}]);
        }
        if (this.template.querySelector('c-lwc-poc2-bank')) {
            this.template.querySelector('c-lwc-poc2-bank').loaddata([{bank: this.infoBank}]);
        }
    }

    connectedCallback() {
        if ( this.idleadfilled ) { this.getleaddata(); }
    }

    renderedCallback() {
        //console.log('pass renderedCallback');
        let param = this.template.querySelector('c-lwc-poc2-language').translatedata('main', this.lg);
        if ( param == null || param == undefined || param.size === 0 ) { 
            this.revaluationStep();
            return; 
        }
        this.parameters = param;
        this.lbl_main_menu_package = this.getparamtranslate(param, 'lbl_main_menu_package', this.lbl_main_menu_package);        
        this.lbl_main_menu_details = this.getparamtranslate(param, 'lbl_main_menu_details', this.lbl_main_menu_details);
        this.lbl_main_menu_cards = this.getparamtranslate(param, 'lbl_main_menu_cards', this.lbl_main_menu_cards);
        this.lbl_main_lbl_card = this.getparamtranslate(param, 'lbl_main_lbl_card', this.lbl_main_lbl_card);
        this.lbl_main_menu_bank = this.getparamtranslate(param, 'lbl_main_menu_bank', this.lbl_main_menu_bank);
        this.lbl_main_menu_confirm = this.getparamtranslate(param, 'lbl_main_menu_confirm', this.lbl_main_menu_confirm);
        this.lbl_main_link_terms = this.getparamtranslate(param, 'lbl_main_link_terms', this.lbl_main_link_terms);
        this.lbl_main_link_data = this.getparamtranslate(param, 'lbl_main_link_data', this.lbl_main_link_data);
        this.lbl_main_link_imprint = this.getparamtranslate(param, 'lbl_main_link_imprint', this.lbl_main_link_imprint);
        this.lbl_main_btn_previous = this.getparamtranslate(param, 'lbl_main_btn_previous', this.lbl_main_btn_previous);
        this.lbl_main_btn_yourdetails = this.getparamtranslate(param, 'lbl_main_btn_yourdetails', this.lbl_main_btn_yourdetails);
        this.lbl_main_btn_yourpackage = this.getparamtranslate(param, 'lbl_main_btn_yourpackage', this.lbl_main_btn_yourpackage);
        this.lbl_main_btn_yourcards = this.getparamtranslate(param, 'lbl_main_btn_yourcards', this.lbl_main_btn_yourcards);
        this.lbl_main_btn_ordercards = this.getparamtranslate(param, 'lbl_main_btn_ordercards', this.lbl_main_btn_ordercards);        
        this.lbl_main_btn_bankdetails = this.getparamtranslate(param, 'lbl_main_btn_bankdetails', this.lbl_main_btn_bankdetails);
        this.lbl_main_btn_bkcards = this.getparamtranslate(param, 'lbl_main_btn_bkcards', this.lbl_main_btn_bkcards);
        this.lbl_main_btn_confirm = this.getparamtranslate(param, 'lbl_main_btn_confirm', this.lbl_main_btn_confirm);
        this.lbl_main_btn_review = this.getparamtranslate(param, 'lbl_main_btn_review', this.lbl_main_btn_review);        
        this.lbl_main_btn_bkbankdetails = this.getparamtranslate(param, 'lbl_main_btn_bkbankdetails', this.lbl_main_btn_bkbankdetails);
        this.lbl_main_btn_next = this.getparamtranslate(param, 'lbl_main_btn_next', this.lbl_main_btn_next);        
        this.lbl_main_btn_back  = this.getparamtranslate(param, 'lbl_main_btn_back', this.lbl_main_btn_back);        
        this.lbl_main_btn_confirmorder = this.getparamtranslate(param, 'lbl_main_btn_confirmorder', this.lbl_main_btn_confirmorder);
        //return;
        this.revaluationStep();
        
    }
    
    getparamtranslate(param, lbl_string , defaulttrad) {
		return param.has(lbl_string) ? param.get(lbl_string) : defaulttrad;
		//return param.has(lbl_string) ? '¤¤¤ ' + param.get(lbl_string) : '???? ';
	}

    spinnershow() { this.isLoaded = false; }
    spinnerhide() { this.isLoaded = true; }

    revaluationStep()
    {   
        if(this.numEtape === 1 ) { this.step1 = true; this.step2 = false; this.step3 = false; this.step4 = false; this.step5 = false; this.previousbtnlabel = this.lbl_main_btn_previous; this.nextbtnlabel = this.lbl_main_btn_yourdetails; }
        if(this.numEtape === 2 ) { this.step1 = false; this.step2 = true; this.step3 = false; this.step4 = false; this.step5 = false; this.previousbtnlabel = this.lbl_main_btn_yourpackage; this.nextbtnlabel = this.lbl_main_btn_yourcards; }
        if(this.numEtape === 3 ) { 
            this.step1 = false; this.step2 = false; 
            this.step3 = true; this.step4 = false; 
            this.step5 = false; this.previousbtnlabel = this.lbl_main_btn_yourdetails; 
            this.nextbtnlabel = this.lbl_main_btn_ordercards; 
        }
        if(this.numEtape === 4 ) { 
            this.step1 = false; this.step2 = false; this.step3 = false; this.step4 = true; this.step5 = false; 
            this.previousbtnlabel = this.step4_issepamandate ? this.lbl_main_btn_back : this.lbl_main_btn_bkcards; 
            this.nextbtnlabel = this.step4_issepamandate ? this.lbl_main_btn_review : this.lbl_main_btn_confirm;
        }
        if(this.numEtape === 5 ) { this.step1 = false; this.step2 = false; this.step3 = false; this.step4 = false; this.step5 = true; this.previousbtnlabel = this.lbl_main_btn_bankdetails; this.nextbtnlabel = this.lbl_main_btn_confirmorder; }

        let thesection = this.template.querySelector('.section');
        if ((this.numEtape === 2 || this.numEtape === 4 ) && !thesection.classList.value.includes('section17'))
        {
            thesection.classList.add('section17');
        }
        if (this.numEtape != 2 && this.numEtape != 4 && thesection.classList.value.includes('section17'))
        {
            thesection.classList.remove('section17');
        }

        var nextBtn = this.template.querySelector('.nextBtn');
        if (nextBtn == null) { return; }

        let nextbtn_inactive = this.template.querySelector('.nextBtn').classList.value.includes('inactive');
        let nextbtn_toactivate = false;
        if( this.numEtape === 1 ) { nextbtn_toactivate = this.__pac_num > 0 ; }
        if( this.numEtape != 1 ) { nextbtn_toactivate = false ; }
        if ( this.numEtape === 4 ) {
            if (!this.step4_issepamandate) { 
                nextbtn_toactivate = this.__bnk_Ibanvalid; 
            } else {
                nextbtn_toactivate = ( this.__bnk_Mandate != null) ; 
            } 
        }
        if( this.numEtape === 5 ) { nextbtn_toactivate = this.__conf_agreeterm ; }
        if ( !nextbtn_inactive && !nextbtn_toactivate ) { this.template.querySelector('.nextBtn').classList.add('inactive'); }
        if ( nextbtn_inactive && nextbtn_toactivate ) { this.template.querySelector('.nextBtn').classList.remove('inactive'); }        
        //if (this.numEtape === 4 && !this.step4_issepamandate) { this.previousbtnlabel = this.lbl_main_btn_back; }
         
        this.refreshmenu();
    }    

    refreshmenu()
    {
        if (this.template.querySelector('.mymenu1').classList.value.includes('done')) { this.template.querySelector('.mymenu1').classList.remove('done'); }
        if (this.template.querySelector('.mymenu1').classList.value.includes('current')) { this.template.querySelector('.mymenu1').classList.remove('current'); }
        if (this.template.querySelector('.mymenu1').classList.value.includes('noclass')) { this.template.querySelector('.mymenu1').classList.remove('noclass'); }
        if (this.template.querySelector('.mymenu2').classList.value.includes('done')) { this.template.querySelector('.mymenu2').classList.remove('done'); }
        if (this.template.querySelector('.mymenu2').classList.value.includes('current')) { this.template.querySelector('.mymenu2').classList.remove('current'); }
        if (this.template.querySelector('.mymenu2').classList.value.includes('noclass')) { this.template.querySelector('.mymenu2').classList.remove('noclass'); }
        if (this.template.querySelector('.mymenu3').classList.value.includes('done')) { this.template.querySelector('.mymenu3').classList.remove('done'); }
        if (this.template.querySelector('.mymenu3').classList.value.includes('current')) { this.template.querySelector('.mymenu3').classList.remove('current'); }
        if (this.template.querySelector('.mymenu3').classList.value.includes('noclass')) { this.template.querySelector('.mymenu3').classList.remove('noclass'); } 
        if (this.template.querySelector('.mymenu4').classList.value.includes('done')) { this.template.querySelector('.mymenu4').classList.remove('done'); }
        if (this.template.querySelector('.mymenu4').classList.value.includes('current')) { this.template.querySelector('.mymenu4').classList.remove('current'); }
        if (this.template.querySelector('.mymenu4').classList.value.includes('noclass')) { this.template.querySelector('.mymenu4').classList.remove('noclass'); }
        if (this.template.querySelector('.mymenu5').classList.value.includes('done')) { this.template.querySelector('.mymenu5').classList.remove('done'); }
        if (this.template.querySelector('.mymenu5').classList.value.includes('current')) { this.template.querySelector('.mymenu5').classList.remove('current'); }
        if (this.template.querySelector('.mymenu5').classList.value.includes('noclass')) { this.template.querySelector('.mymenu5').classList.remove('noclass'); }

        if (this.template.querySelector('.mymenu1').classList.value.includes('menudone')) { this.template.querySelector('.mymenu1').classList.remove('menudone'); }
        if (this.template.querySelector('.mymenu1').classList.value.includes('menutodo')) { this.template.querySelector('.mymenu1').classList.remove('menutodo'); }
        if (this.template.querySelector('.mymenu2').classList.value.includes('menudone')) { this.template.querySelector('.mymenu2').classList.remove('menudone'); }
        if (this.template.querySelector('.mymenu2').classList.value.includes('menutodo')) { this.template.querySelector('.mymenu2').classList.remove('menutodo'); }
        if (this.template.querySelector('.mymenu3').classList.value.includes('menudone')) { this.template.querySelector('.mymenu3').classList.remove('menudone'); }
        if (this.template.querySelector('.mymenu3').classList.value.includes('menutodo')) { this.template.querySelector('.mymenu3').classList.remove('menutodo'); }
        if (this.template.querySelector('.mymenu4').classList.value.includes('menudone')) { this.template.querySelector('.mymenu4').classList.remove('menudone'); }
        if (this.template.querySelector('.mymenu4').classList.value.includes('menutodo')) { this.template.querySelector('.mymenu4').classList.remove('menutodo'); }
        
        if (this.template.querySelector('.mymenu1hor').classList.value.includes('menudonehor')) { this.template.querySelector('.mymenu1hor').classList.remove('menudonehor'); }
        if (this.template.querySelector('.mymenu1hor').classList.value.includes('menutodohor')) { this.template.querySelector('.mymenu1hor').classList.remove('menutodohor'); }
        if (this.template.querySelector('.mymenu2hor').classList.value.includes('menudonehor')) { this.template.querySelector('.mymenu2hor').classList.remove('menudonehor'); }
        if (this.template.querySelector('.mymenu2hor').classList.value.includes('menutodohor')) { this.template.querySelector('.mymenu2hor').classList.remove('menutodohor'); }
        if (this.template.querySelector('.mymenu3hor').classList.value.includes('menudonehor')) { this.template.querySelector('.mymenu3hor').classList.remove('menudonehor'); }
        if (this.template.querySelector('.mymenu3hor').classList.value.includes('menutodohor')) { this.template.querySelector('.mymenu3hor').classList.remove('menutodohor'); }
        if (this.template.querySelector('.mymenu4hor').classList.value.includes('menudonehor')) { this.template.querySelector('.mymenu4hor').classList.remove('menudonehor'); }
        if (this.template.querySelector('.mymenu4hor').classList.value.includes('menutodohor')) { this.template.querySelector('.mymenu4hor').classList.remove('menutodohor'); }

        let cl1_add = this.numEtape === 1 ? 'current' : (this.numEtape > 1 ? 'done' : 'noclass');
        this.template.querySelector('.mymenu1').classList.add(cl1_add);
        let cl2_add = this.numEtape === 2 ? 'current' : (this.numEtape > 2 ? 'done' : 'noclass');
        this.template.querySelector('.mymenu2').classList.add(cl2_add);
        let cl3_add = this.numEtape === 3 ? 'current' : (this.numEtape > 3 ? 'done' : 'noclass');
        this.template.querySelector('.mymenu3').classList.add(cl3_add);
        let cl4_add = this.numEtape === 4 ? 'current' : (this.numEtape > 4 ? 'done' : 'noclass');
        this.template.querySelector('.mymenu4').classList.add(cl4_add);
        let cl5_add = this.numEtape === 5 ? 'current' : (this.numEtape > 5 ? 'done' : 'noclass');
        this.template.querySelector('.mymenu5').classList.add(cl5_add);

        this.template.querySelector('.mymenu1').classList.add(this.numEtape > 1 ? 'menudone' : 'menutodo' );
        this.template.querySelector('.mymenu2').classList.add(this.numEtape > 2 ? 'menudone' : 'menutodo' );
        this.template.querySelector('.mymenu3').classList.add(this.numEtape > 3 ? 'menudone' : 'menutodo' );
        this.template.querySelector('.mymenu4').classList.add(this.numEtape > 4 ? 'menudone' : 'menutodo' );
        
        this.template.querySelector('.mymenu1hor').classList.add(this.numEtape > 1 ? 'menudonehor' : 'menutodohor' );
        this.template.querySelector('.mymenu2hor').classList.add(this.numEtape > 2 ? 'menudonehor' : 'menutodohor' );
        this.template.querySelector('.mymenu3hor').classList.add(this.numEtape > 3 ? 'menudonehor' : 'menutodohor' );
        this.template.querySelector('.mymenu4hor').classList.add(this.numEtape > 4 ? 'menudonehor' : 'menutodohor' );
    }  

    refreshlabelbtnsuiv(){
        this.showbarbutton = true;
    }

    getInfoPackage(){
        this.__pac_num = this.infoPackage[0];
        this.__pac_label = this.infoPackage[1];
        this.__pac_isnum1 = this.infoPackage[2];
        this.__pac_isnum2 = this.infoPackage[3];
    }

    getInfoAccount(){
        //console.log('getInfoAccount');
        //console.log(JSON.stringify(this.infoAccount));
        this.__acc_FirstName = this.infoAccount[0];
        this.__acc_LastName = this.infoAccount[1];
        this.__acc_Email = this.infoAccount[2];
        this.__acc_Phone = this.infoAccount[3];
        this.__acc_CP = this.infoAccount[4];
        this.__acc_AccountName = this.infoAccount[5];
        this.__acc_StreetName = this.infoAccount[6];
        this.__acc_Salutation = this.infoAccount[7];
        this.__acc_City = this.infoAccount[8];
        this.__acc_Vat = this.infoAccount[9];
        this.__acc_Tax = this.infoAccount[10];
        this.__acc_Registration = this.infoAccount[11];
        this.__acc_Crefo = this.infoAccount[12];
        this.__acc_Extention = this.infoAccount[13];
    }

    getInfoCard(){
        this.__crd_CompanyName = this.infoCards[0];
        this.__crd_ListCard = this.infoCards[1];
        this.__crd_NumberCards = this.infoCards[2];
        this.__crd_Amount = this.infoCards[3];

        this.lblnbcard = this.infoCards[2] == 0 ? '' : (this.infoCards[2] == 1 ? this.infoCards[2] + ' ' + this.lbl_main_lbl_card : this.infoCards[2] + ' ' + this.lbl_main_menu_cards);
    }  
    
    getInfoConfirmation(){
        this.__conf_agreeterm = this.infoConfirmation[0];
        this.__conf_mktcampaign = this.infoConfirmation[1];
        this.__conf_mktnewsletter = this.infoConfirmation[2];
        this.__conf_mktsurvey = this.infoConfirmation[3];
    }
    
    getInfoBank(){
        this.__bnk_Iban = this.infoBank[0];
        this.__bnk_AccountName = this.infoBank[1];
        this.__bnk_BankName = this.infoBank[2];
        this.__bnk_Bic = this.infoBank[3];
        this.__bnk_Mandate = this.infoBank[4];
        this.__bnk_Ibanvalid = this.infoBank[5];
    } 

    submitLeadData() {
        if (this.modedemo) { return; }
        // this.__acc_Email = this.infoAccount[2];
        // this.__acc_Phone = this.infoAccount[3];
        // this.__acc_Salutation = this.infoAccount[7];
        // this.__acc_Registration = this.infoAccount[11];

        // this.brVerify();
        // if(!this.brValid) { return; }      
        const fields = {};
        fields["LeadId"] = this.leadid;
        fields["Salutation"] = this.infoAccount[7];
        fields["FirstName"] = this.infoAccount[0];
        fields["LastName"] = this.infoAccount[1];
        fields["Email"] = this.infoAccount[2];
        fields["Phone"] = '+' + this.infoAccount[13] + ' ' + this.infoAccount[3];
        fields["PostalCode"] = this.infoAccount[4];
        fields["Company"] = this.infoAccount[5];
        fields["Country"] = 'Germany';
        fields["Street"] = this.infoAccount[6];
        fields["City"] = this.infoAccount[8];
        fields["VATNumber"] = this.infoAccount[9];
        fields["TaxNumber"] = this.infoAccount[10];
        fields["Crefo"] = this.infoAccount[12];
        fields["Bundle"] = this.infoPackage[0] == 2 ? 'Plus' : 'Basic';

        // fields["BundelPreference"] = '';
        // fields["AdditionalServices"] = '';
        // fields["NbFuelCardRequired"] = 0;
        // fields["Estimatedfuelconsmonthlitre"] = 0;

        console.log(JSON.stringify(fields));
        this.spinnershow();
        submitLead ( { leadtocreate : JSON.stringify(fields) } )             
        .then(result => {
            if (result.code === '100') {
                if (result.processcode != 100) {
                    this.spinnerhide();
                    //fonction effacement toutes les données et step = 0
                    //window.open('stopprocess?lg=' + this.lg,"_self");
                    return;
                }

                this.spinnerhide();

                this.leadid = result.leadid;
                console.log('SUCCESS : LEAD CREATED');
                this.numEtape += 1;
                this.revaluationStep();
            } else {
                this.spinnerhide();
                console.log('erreur LEAD SUBMIT');
                console.log(result);
                //window.open('whoops?lg=' + this.lg,"_self");                
            }
        })
        .catch(error => {
            this.spinnerhide();
            console.log('created error');
            console.log('ERROR : ' + this.reduceErrors(error).join(', '));
            window.open('whoops?lg=' + this.lg,"_self");
            return;
        });
        //this.spinnerhide();
    }
    
    submitConfirmation(){   

        this.spinnershow();
        submitconfirm ( { leadid : this.leadid, agreeterm: this.__conf_agreeterm, mktcampaign : this.__conf_mktcampaign, mktnewsletter: this.__conf_mktnewsletter, mktsurvey: this.__conf_mktsurvey } )             
        .then(result => {
            if (result.code === '100') {
                if (result.processcode != 100) {
                    console.log('Error : SUBMIT CONFIRMATION');
                    console.log(result.message);
                    return;
                }
                console.log('SUCCESS : SUBMIT CONFIRMATION');
                window.open('orderfeedbackvalidate?lg=' + this.lg + '&e=' + window.btoa(this.infoAccount[2]) ,"_self"); 
            } else {
                console.log('Error SUBMIT CONFIRMATION');
                console.log(result);
                //window.open('whoops?lg=' + this.lg,"_self");                
            }
        })
        .catch(error => {
            console.log('submit conformation error');
            console.log('ERROR : ' + this.reduceErrors(error).join(', '));
            return;
        });
        this.spinnershow();
    }

    updatebankdata() {
        updateLeadBank ( { leadid: this.leadid ,bankname : this.__bnk_BankName, iban: this.__bnk_Iban, bic: this.__bnk_Bic, holder: this.__bnk_AccountName, mandatebank: this.__bnk_Mandate} )             
        .then(result => {
            if (result.code === '100') {
                if (result.processcode != 100) {
                    return;
                }
            } else {
                console.log('erreur updateLeadBank ');
                console.log(result);           
            }
        })
        .catch(error => {
            this.spinnerhide();
            console.log('updateLeadBank  error');
            console.log('ERROR : ' + this.reduceErrors(error).join(', '));
            window.open('whoops?lg=' + this.lg,"_self");
            return;
        });
    }
    
    activatebtnnext(event) 
    {
        var nextBtn = this.template.querySelector('.nextBtn');
        if (nextBtn == null) { return; }
        let btninactive = this.template.querySelector('.nextBtn').classList.value.includes('inactive');
        let btnhide = this.template.querySelector('.nextBtn').classList.value.includes('hide');
        let toactivate = event.detail.toactivate;
        let tohide = event.detail.tohide;
        
        if (tohide) {
            if (!btnhide) { 
                this.template.querySelector('.nextBtn').classList.add('hide'); 
            }            
        } else {
            if (btnhide) { 
                this.template.querySelector('.nextBtn').classList.remove('hide'); 
            }
        }

        if (toactivate) { 
            if (btninactive) { 
                this.template.querySelector('.nextBtn').classList.remove('inactive'); 
            }
        } else { 
            if (!btninactive) { this.template.querySelector('.nextBtn').classList.add('inactive'); }            
        }
    }

    gotostep(event) {
        let tostep = event.detail.step;
        this.numEtape = tostep;
        this.revaluationStep();
    }

    /*
    fillpackage(ispackage) {
        if (ispackage) { 
            if (this.template.querySelector('.nextBtn').classList.value.includes('inactive')) { this.template.querySelector('.nextBtn').classList.remove('inactive'); }
        } 
        //disable/enable btn next
    }
    */

    btnNext(e) 
    {
        if (e) { e.preventDefault(); }
        if (this.numEtape === 1) {
            let pac = this.template.querySelector('c-lwc-poc2-package').getPackage();
            this.infoPackage = pac;
            this.getInfoPackage();
        } else if (this.numEtape === 2) {
            let acc = this.template.querySelector('c-lwc-poc2-account').getAccount();
            this.infoAccount = acc;
            //console.log(acc);
            this.getInfoAccount();
            this.spinnershow();
            this.submitLeadData();
            return;
        } else if (this.numEtape === 3) {
            let crd = this.template.querySelector('c-lwc-poc2-card').getCard();
            this.infoCards = crd;
            this.getInfoCard();
            let stateCard = this.template.querySelector('c-lwc-poc2-card').getStatecard();
            //console.log('stateCard : '+ stateCard);
            if (stateCard) { 
                this.nextbtnlabel = 'Bank details'
                this.template.querySelector('c-lwc-poc2-card').ordercard() ; 
                this.hidebarbutton(); 
                return;
            } 
        } else if (this.numEtape === 4) {
            let bnk = this.template.querySelector('c-lwc-poc2-bank').getBank();
            this.infoBank = bnk;
            this.getInfoBank();
            let issepamandate = this.template.querySelector('c-lwc-poc2-bank').getsepamandate();
            this.step4_issepamandate = issepamandate;
            if (!issepamandate) {
                this.step4_issepamandate = true;
                this.template.querySelector('c-lwc-poc2-bank').setsepamandatetrue();
                return;
            } else {
                this.step4_issepamandate = false;
                this.template.querySelector('c-lwc-poc2-bank').setsepamandatefalse();
                this.updatebankdata();
            }
        } else if (this.numEtape === 5) {
            let cnf = this.template.querySelector('c-lwc-poc2-confirmation').getConfirmation();
            this.infoConfirmation = cnf;
            this.getInfoConfirmation();
            this.submitConfirmation();
            //window.open('orderfeedbackvalidate?lg=' + this.lg + '&e=' + window.btoa(this.infoAccount[2]) ,"_self"); 
            return;
        }
                
        this.numEtape += 1;
        this.revaluationStep();
        /*
        this.brVerify();
        if (this.brValid === true)
        {
            if ( this.numEtape == 2 ) {
                this.numEtape = 6;
            } else { 
                this.numEtape += 1; 
            }       
            this.revaluation();
        }
        */
        window.scrollTo(0,0);
    }

    btnPrevious(){
        if (this.numEtape === 4) {
            let bnk = this.template.querySelector('c-lwc-poc2-bank').getBank();
            this.infoBank = bnk;
            this.getInfoBank();
            let issepamandate = this.template.querySelector('c-lwc-poc2-bank').getsepamandate();
            if (issepamandate) {
                this.step4_issepamandate = false;
                this.template.querySelector('c-lwc-poc2-bank').setsepamandatefalse();
                return;
            }
        } else if (this.numEtape === 2) {
            let acc = this.template.querySelector('c-lwc-poc2-account').getAccount();
            this.infoAccount = acc;
            //console.log(acc);
            this.getInfoAccount();
        } else if (this.numEtape === 3) {
            let crd = this.template.querySelector('c-lwc-poc2-card').getCard();
            this.infoCards = crd;
            this.getInfoCard();
        } else if (this.numEtape === 5) {
            let cnf = this.template.querySelector('c-lwc-poc2-confirmation').getConfirmation();
            this.infoConfirmation = cnf;
            this.getInfoConfirmation();
        }
        /*
        if(this.numEtape === 2 ) {
            let acc = this.template.querySelector('c-lwc-poc-info-account').getInfoAcount();
            this.infoAccount = acc;
            let accountValid = this.template.querySelector('c-lwc-poc-info-account').getbrvalid();            
        }    
        if(this.numEtape === 6 ) {
            this.numEtape = 2;
        } else {
            this.numEtape -= 1;
        }
        */
        this.numEtape -= 1;
        this.revaluationStep();
    }

    handlecard(event) {
        console.log(event.detail);
    }

    hidebarbutton(){
        this.showbarbutton = false;
    }

    gotobankdetail(){
        this.showbarbutton = true;
        this.btnNext();
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