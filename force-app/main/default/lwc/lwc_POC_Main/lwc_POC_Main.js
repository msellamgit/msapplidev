import { LightningElement, track } from 'lwc';
//import { createRecord } from 'lightning/uiRecordApi';
import createLead from '@salesforce/apex/LWC_POC.createLead';

export default class Lwc_POC_Main extends LightningElement {
    @track numEtape = 1;
    @track brValid = false;
    @track isCreateOk = false;
    @track step1 = true;
    @track step2 = false;
    @track step3 = false;
    @track step4 = false;
    @track step5 = false;
    @track step6 = false;
    @track precPossible = false;
    @track suivPossible = true;
    @track valuePackage_1 = false;
    @track valuePackage_2 = false;
    @track valuePackage_3 = false;      
    @track valuePackage = '';
    @track valuePackageLabel;  
    @track valuePeage_1 = false;
    @track valuePeage_2 = false;
    @track valueAvantage_1 = false;
    @track valueAvantage_2 = false;
    @track valueAvantage_3 = false;      
    @track valueAvantage_4 = false;      
    @track valueAvantage;
    @track valueAvantageLabel;  
    @track entryNumSpec1 = null;
    @track entryNumSpec2 = null;
    @track brCheck_Pack = true;
    @track brCheck_NumSpec1 = true;
    @track brCheck_NumSpec2 = true;
    @track classNumSpec1 = '';
    @track classNumSpec2 = '';
    @track classPack = ''; 
    @track infoAccount = [];
    @track __acc_LegalForm = '';        
    @track __acc_Street = '';
    @track __acc_City = '';
    @track __acc_PostalCode = '';
    @track __acc_Company = '';
    @track __acc_Country = '';
    @track __acc_VATNumber = '';
    @track __acc_TaxNumber = '';      
    
    msgError = "Dieses Feld ist ein Pflichtfeld. Bitte treffen Sie einen Auswahl.";

    entryChange(e) { 
        if (e.target.name === 'entryNumSpec1') { this.entryNumSpec1 = e.target.value;}
        if (e.target.name === 'entryNumSpec2') { this.entryNumSpec2 = e.target.value;}
    }

    revaluationStep()
    {    
        if(this.numEtape === 1 ) { this.step1 = true; this.step2 = false; this.step3 = false; this.step4 = false; this.step5 = false; this.step6 = false; }
        if(this.numEtape === 2 ) { this.step1 = false; this.step2 = true; this.step3 = false; this.step4 = false; this.step5 = false; this.step6 = false; }
        if(this.numEtape === 3 ) { this.step1 = false; this.step2 = false; this.step3 = true; this.step4 = false; this.step5 = false; this.step6 = false; }
        if(this.numEtape === 4 ) { this.step1 = false; this.step2 = false; this.step3 = false; this.step4 = true; this.step5 = false; this.step6 = false; }
        if(this.numEtape === 5 ) { this.step1 = false; this.step2 = false; this.step3 = false; this.step4 = false; this.step5 = true; this.step6 = false; }
        if(this.numEtape === 6 ) { this.step1 = false; this.step2 = false; this.step3 = false; this.step4 = false; this.step5 = false; this.step6 = true; }
    }    

    revaluation()
    {
        if (this.numEtape == 1 ) { this.template.querySelector('[name=menu1]').classList.add('menuchoice'); }
        else { this.template.querySelector('[name=menu1]').classList.remove('menuchoice'); }
        if (this.numEtape == 2 ) { this.template.querySelector('[name=menu2]').classList.add('menuchoice'); }
        else { this.template.querySelector('[name=menu2]').classList.remove('menuchoice'); }
        if (this.numEtape == 3 ) { this.template.querySelector('[name=menu3]').classList.add('menuchoice'); }
        else { this.template.querySelector('[name=menu3]').classList.remove('menuchoice'); }
        if (this.numEtape == 4 ) { this.template.querySelector('[name=menu4]').classList.add('menuchoice'); }
        else { this.template.querySelector('[name=menu4]').classList.remove('menuchoice'); }
        if (this.numEtape == 5 ) { this.template.querySelector('[name=menu5]').classList.add('menuchoice'); }
        else { this.template.querySelector('[name=menu5]').classList.remove('menuchoice'); }
        if (this.numEtape == 6 ) { this.template.querySelector('[name=menu6]').classList.add('menuchoice'); }
        else { this.template.querySelector('[name=menu6]').classList.remove('menuchoice'); }

        this.valPourc = (this.numEtape - 1) * this.ecartEtape;
        this.progressValue = "En Cours " + this.valPourc + "% - Etape " + this.numEtape + "/5";
        if (this.numEtape == 1 ) { this.precPossible = false; }
            else { this.precPossible = true; }

        if (this.numEtape == 6) { this.suivPossible = false; this.isCreateOk = true; }
            else { this.suivPossible = true; this.isCreateOk = false; }

        this.revaluationStep();    
    }    

    createLead() {
        this.brVerify();
        if(!this.brValid) { return; }
        // this.entryLegalStatut = this.account[0];
        // this.entryName2 = this.account[2];
        // this.entryCountry = this.account[6];
        // this.entryNumFiscal1 = this.account[7];
        // this.entryNumFiscal2 = this.account[8];        
        const fields = {};
        //fields["Salutation"] = null;
        fields["FirstName"] = 'Experience';
        fields["LastName"] = 'Cloud to Lead';
        fields["LegalForm"] = this.infoAccount[0];        
        fields["Street"] = this.infoAccount[3];
        fields["City"] = this.infoAccount[5];
        fields["PostalCode"] = this.infoAccount[4];
        fields["Company"] = this.infoAccount[1];
        fields["Country"] = this.infoAccount[6];
        fields["VATNumber"] = this.infoAccount[7];
        fields["TaxNumber"] = this.infoAccount[8];
        fields["BundelPreference"] = this.valuePackageLabel;
        fields["AdditionalServices"] = this.valueAvantageLabel;
        fields["NbFuelCardRequired"] = this.entryNumSpec1;
        fields["Estimatedfuelconsmonthlitre"] = this.entryNumSpec2;


        // fields["Phone"] = this.entryPhone;
        // fields["Email"] = this.entryEmail;        

        // fields["project_mse__AssuFoyer__c"] = this.valuePersonneLabel;
        // fields["project_mse__AssuSituationFamiliale__c"] = this.valueSituationLabel;   
        // fields["project_mse__AssuHabitation__c"] = this.valueHabTypeLabel.includes('maison') ? 'Maison' : 'Appartement';         
        // fields["project_mse__AssuOffre__c"] = this.valueOffreLabel.includes('Assurance') && this.valueOffreLabel.includes('Alarme')  ? 'Assurance Hab. & Sécu' : this.valueOffreLabel;                 
        // fields["project_mse__AssuResidence__c"] =  this.valueResidLabel;

        // if (this.valueOffre_1 || this.valueOffre_3)
        // {
        //     fields["project_mse__ProduitAssurance__c"] =  this.valueChoiceAssurance;
        // }
        // if (this.valueOffre_2 || this.valueOffre_3)
        // {
        //     fields["project_mse__ProduitSecurite__c"] =  this.valueChoiceSecurite;
        // }
        
        
        // fields["Status"] = "Open - Not Contacted";
        // fields["LeadSource"] = "Partner Referral";
        
        // //this.showToastError(this.valueHabTypeLabel + '' + fields["project_mse__AssuHabitation__c"] );
        // //this.showToastError(this.valueOffreLabel + '' + fields["project_mse__AssuOffre__c"] );
        //fields[SITE_FIELD.fieldApiName] =this.site;

        //const recordInput = { apiName: 'Lead', JSON.stringify(fields) };
        //console.log('createRecord');
        //console.log(fields);
        //console.log(JSON.stringify(fields));

        createLead ( { leadtocreate : JSON.stringify(fields) } )             
        //searchLeads ({leadName}) 
        .then(result => {
            //console.log(JSON.stringify(result));
            //this.leadList = result;
            //this.noRecordsFound = false;
            //console.log('>>>> test '+JSON.stringify(this.leadList));    
            if (result.code === '100') {
                //console.log('LEAD CREATED');
                this.template.querySelector('c-lwc-poc-toast').showToast('success', 'Lead has been created successuffly.');
                this.cleardata();
            } else {
                console.log('erreur LEAD CREATED');
                console.log(result.obj);
                this.template.querySelector('c-lwc-poc-toast').showToast('error', result.obj);                
            }

        })
        .catch(error => {
            console.log('created error');
            this.template.querySelector('c-lwc-poc-toast').showToast('error', this.reduceErrors(error).join(', '));
            console.log('ERROR : ' + this.reduceErrors(error).join(', '));
        });

    }

    cleardata() {
        this.numEtape = 1;
        this.brValid = false;
        this.isCreateOk = false;
        this.step1 = true;
        this.step2 = false;
        this.step3 = false;
        this.step4 = false;
        this.step5 = false;
        this.step6 = false;
        this.precPossible = false;
        this.suivPossible = true;
        this.initPackage();  
        this.initAvantage(); 
        this.entryNumSpec1 = null;
        this.entryNumSpec2 = null;
        this.brCheck_Pack = true;
        this.brCheck_NumSpec1 = true;
        this.brCheck_NumSpec2 = true;
        this.classNumSpec1 = '';
        this.classNumSpec2 = '';
        this.classPack = ''; 
        this.infoAccount = [];
        this.initPeage();
        window.moveTo(0, 0);
    }

    btnPrec(){
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
        this.revaluation();
    }

    brVerify() {
        if(this.numEtape === 1 ) {
            this.brValid = true;
            this.brCheck_Pack = true;
            this.brCheck_NumSpec1 = true;
            this.brCheck_NumSpec2 = true;
            //console.log(['optPackCompact', 'optPackComfort', 'optPackPremium'].indexOf(this.valuePackage.toString()));
            if ((['optPackCompact', 'optPackComfort', 'optPackPremium'].indexOf(this.valuePackage.toString()) < 0 ))
            {
                this.brCheck_Pack = false;
                this.classPack = 'classerrordataabs';
                this.brValid = false;
            } else { this.classPack = 'classvaliddataabs'; } 
            if ( this.entryNumSpec1 == null || this.entryNumSpec1 === '' )
            {
                this.brCheck_NumSpec1 = false;
                this.classNumSpec1 = 'classerrordataabs';
                this.brValid = false;
            } else { this.classNumSpec1 = 'classvaliddataabs'; }            
            if ( this.entryNumSpec2 == null || this.entryNumSpec2 === '' ) 
            {
                this.classNumSpec2 = 'classerrordataabs';
                this.brCheck_NumSpec2 = false;
                this.brValid = false;
            } else { this.classNumSpec2 = 'classvaliddataabs'; }
        } 
        else if(this.numEtape === 2 ) {
            let acc = this.template.querySelector('c-lwc-poc-info-account').getInfoAcount();
            this.infoAccount = acc;
            this.getinfoAccount();
            
            //console.log(acc);
            let accountValid = this.template.querySelector('c-lwc-poc-info-account').getbrvalid();
            this.brValid = accountValid;
        } else { this.brValid = true; }
    }

    btnRedirect() {
        this.template.querySelector('c-lwc-poc-toast-return').showToast();
    }

    getinfoAccount() {
        this.__acc_LegalForm = this.infoAccount[0];        
        this.__acc_Street = this.infoAccount[3];
        this.__acc_City = this.infoAccount[5];
        this.__acc_PostalCode = this.infoAccount[4];
        this.__acc_Company = this.infoAccount[1];
        this.__acc_Country = this.infoAccount[6];
        this.__acc_VATNumber = this.infoAccount[7];
        this.__acc_TaxNumber = this.infoAccount[8];       
    }

    btnSuiv(){
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
        window.scrollTo(0,0);
    }

    initAvantage() {
        this.valueAvantage_1 = false;
        this.valueAvantage_2 = false;
        this.valueAvantage_3 = false;        
        this.valueAvantage_4 = false;      
        this.valueAvantage = null;
        this.valueAvantageLabel = '';    
    }

    handleAvantage(e) {
        this.initAvantage();     
        if (e.target.checked) 
        {
            if ( e.target.name === 'optAvantage1' ) {this.valueAvantage_1 = true; }
            else if ( e.target.name === 'optAvantage2' ) {this.valueAvantage_2 = true; }
            else if ( e.target.name === 'optAvantage3' ) {this.valueAvantage_3 = true; }
            else {this.valueAvantage_4 = true; }
            this.valueAvantage = e.target.name;
            this.valueAvantageLabel = e.target.label;            
        }   
    }

    initPackage() {
        this.valuePackage_1 = false;
        this.valuePackage_2 = false;
        this.valuePackage_3 = false; 
        this.valuePackage = '';
        this.valuePackageLabel = null;
    }

    handlePackage(e) {
        this.initPackage();     
        if (e.target.checked) 
        {
            if ( e.target.name === 'optPackCompact' ) {this.valuePackage_1 = true; }
            else if ( e.target.name === 'optPackComfort' ) {this.valuePackage_2 = true; }
            else {this.valuePackage_3 = true; }
            this.valuePackage = e.target.name;
            this.valuePackageLabel = e.target.label;            
        }   
    }

    initPeage() {
        this.valuePeage_1 = false;
        this.valuePeage_2 = false;
        // this.valuePackage = '';
        // this.valuePackageLabel = null;
    }

    handlePeage(e) {
        this.initPeage();     
        if (e.target.checked) 
        {
            if ( e.target.name === 'optPeageyes' ) {this.valuePeage_1 = true; }
            else {this.valuePeage_2 = true; }
            // this.valuePackage = e.target.name;
            // this.valuePackageLabel = e.target.label;            
        }   
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

    backto1(){
        this.numEtape = 1;    
        this.revaluation();
        window.scrollTo(0,0);
    }
    backto2(){
        this.numEtape = 2;    
        this.revaluation();
        window.scrollTo(0,0);
    }
    backto3(){
        this.numEtape = 3;    
        this.revaluation();
        window.scrollTo(0,0);
    }
    backto4(){
        this.numEtape = 4;    
        this.revaluation();
        window.scrollTo(0,0);
    }
    backto5(){
        this.numEtape = 5;    
        this.revaluation();
        window.scrollTo(0,0);
    }
                    
}