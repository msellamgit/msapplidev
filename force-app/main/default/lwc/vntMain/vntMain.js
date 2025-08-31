import { LightningElement , track , wire} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import getProductAssu from '@salesforce/apex/LWC_Product.getProductFamily';
import getProductSecu from '@salesforce/apex/LWC_Product.getProductFamily';

import { createRecord } from 'lightning/uiRecordApi';

export default class VntMain extends LightningElement {    
    @track valPourc = 0;
    @track progressValue = 'Début';
    @track precPossible = true;
    @track suivPossible = true;
    @track ecartEtape = 25;
    @track numEtape = 1;
    @track step1 = true;
    @track step2 = false;
    @track step3 = false;
    @track step4 = false;
    @track step5 = false;
    @track valueOffre = [''];
    @track valueOffreLabel;
    @track valueOffre_1 = false;
    @track valueOffre_2 = false;
    @track valueOffre_3 = false;    
    @track valueHabType = [''];
    @track valueHabTypeLabel;
    @track valueHabType_1 = false;
    @track valueHabType_2 = false;    
    @track valueResid = [''];
    @track valueResidLabel;
    @track valueResid_1 = false;
    @track valueResid_2 = false;     
    @track valueSituation = [''];
    @track valueSituationLabel;
    @track valueSituation_1 = false;
    @track valueSituation_2 = false;
    @track valueSituation_3 = false;
    @track valueSituation_4 = false;
    @track valueSituation_5 = false;
    @track valueSituation_6 = false;    
    @track valuePersonne = [''];
    @track valuePersonneLabel;      
    @track valuePersonne_1 = false;
    @track valuePersonne_2 = false;
    @track valuePersonne_3 = false;
    @track valuePersonne_4 = false;
    @track brMessage = '';    
    @track brVisible = false;
    @track messageError;
    getCivilite = [
        { label: 'Mr', value: 'Mr' },
        { label: 'Mme', value: 'Mme' },
        { label: 'Mlle', value: 'Mlle' }
    ];
    @track entryCivilite;
    @track entryLastName = '';
    @track entryFirstName = '';
    @track entryAddress = '';
    @track entryCompAddress = '';
    @track entryZip = '';
    @track entryCity = '';
    @track entryPhone = '';
    @track entryEmail = '';
    
    @track itemsChoiceAssurance = [];
    @track valueChoiceAssurance = '';
    @track itemsChoiceSecurite = [];
    @track valueChoiceSecurite = '';
    @track disableListSec = true;
    @track disableListAss = true;
    @track valueChoiceAssuranceLabel;
    @track valueChoiceSecuriteLabel;
    
    @track leadId;

    @wire(getProductAssu, { productType: 'Assurance' }) 
    wiredListAssu ({ error, data }) {
        if (data) {         
            for(const list of data){
                const option = {
                    label: list.Name + ' (' + list.project_mse__Price__c + ' ' + list.project_mse__Unit__c + ')',
                    value: list.Id
                };
                // this.selectOptions.push(option);
                this.itemsChoiceAssurance = [ ...this.itemsChoiceAssurance, option ];
            }                            
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.itemsChoiceAssurance = undefined;
            this.showToastError(error);
        }
    }

    @wire(getProductSecu, { productType: 'Sécurité' }) 
    wiredListSecu ({ error, data }) {
        if (data) {  
            for(const list of data){
                const option = {
                    label: list.Name + ' (' + list.project_mse__Price__c + ' ' + list.project_mse__Unit__c + ')',
                    value: list.Id
                };
                // this.selectOptions.push(option);
                this.itemsChoiceSecurite = [ ...this.itemsChoiceSecurite, option ];
            }                            
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.itemsChoiceSecurite = undefined;
            this.showToastError(error);
        }
    }

    // showToast() {
    //     const event = new ShowToastEvent({
    //         title: 'Get Help',
    //         message: 'Salesforce documentation is available in the app. Click ? in the upper-right corner.',
    //     });
    //     this.dispatchEvent(event);
    // }

    showToastError(messageError) {
        const event = new ShowToastEvent({ 
            title: 'VENTE', 
            message: messageError, 
            variant: 'error'});
        this.dispatchEvent(event);
    }
    revaluationStep()
    {
        if(this.numEtape ===1 ) { this.step1 = true; this.step2 = false; this.step3 = false; this.step4 = false; this.step5 = false; }
        if(this.numEtape ===2 ) { this.step1 = false; this.step2 = true; this.step3 = false; this.step4 = false; this.step5 = false; }
        if(this.numEtape ===3 ) { this.step1 = false; this.step2 = false; this.step3 = true; this.step4 = false; this.step5 = false; }
        if(this.numEtape ===4 ) { this.step1 = false; this.step2 = false; this.step3 = false; this.step4 = true; this.step5 = false; }
        if(this.numEtape ===5 ) { this.step1 = false; this.step2 = false; this.step3 = false; this.step4 = false; this.step5 = true; }
    }

    revaluation()
    {
        this.valPourc = (this.numEtape - 1) * this.ecartEtape;
        this.progressValue = "En Cours " + this.valPourc + "% - Etape " + this.numEtape + "/5";
        if (this.valPourc < this.ecartEtape)
        { this.precPossible = false; }
        else { this.precPossible = true; }

        if (this.valPourc > this.ecartEtape * 3)
        { this.suivPossible = false; }
        else { this.suivPossible = true;}

        this.revaluationStep();
    }

    btnPrec(){
        this.numEtape -= 1;
        this.revaluation();
    }

    btnSuiv(){
        this.brVerify();
        if (this.brVisible === false)
        {
            this.numEtape += 1;        
            this.revaluation();
        }
    }
    
    brVerify(){                 
        if(this.numEtape === 1 ) {
            this.brVisible = false;
            if ((['optOffAss', 'optOffSecu', 'optOffAssurSecu'].indexOf(this.valueOffre.toString())<0 ))
            {
                this.brVisible = true;
                this.brMessage = "VEUILLEZ INDIQUEZ L'OFFRE DESIREE AVANT DE PASSER A L'ETAPE SUIVANTE.";
            }     
            if (!this.brVisible && (this.valueOffre === 'optOffAss' ) && 
                ( ( this.valueChoiceAssurance === '') || this.valueChoiceAssurance == null ) )
            {
                this.brVisible = true;
                this.brMessage = "VEUILLEZ INDIQUEZ VOTRE CHOIX D'ASSURANCE AVANT DE PASSER A L'ETAPE SUIVANTE.";
            }     
            if (!this.brVisible && (this.valueOffre === 'optOffSecu' ) && 
                ( ( this.valueChoiceSecurite === '') || this.valueChoiceSecurite == null ) )
            {
                this.brVisible = true;
                this.brMessage = "VEUILLEZ INDIQUEZ VOTRE CHOIX SECURITE AVANT DE PASSER A L'ETAPE SUIVANTE.";
            } 
            if (!this.brVisible && (this.valueOffre === 'optOffAssurSecu' ) && 
                ( ( this.valueChoiceSecurite === '') || this.valueChoiceSecurite == null  || 
                 ( this.valueChoiceAssurance === '') || this.valueChoiceAssurance == null ))
            {
                this.brVisible = true;
                this.brMessage = "VEUILLEZ INDIQUEZ VOS CHOIX ASSURANCE ET SECURITE AVANT DE PASSER A L'ETAPE SUIVANTE.";
            }             
        } 
        else if(this.numEtape === 2 ) {
            this.brVisible = false;  
            if ((['optHabTypeMais', 'optHabTypeApp'].indexOf(this.valueHabType.toString())<0 ))
            {
                this.brVisible = true;
                this.brMessage = "VEUILLEZ INDIQUEZ VOTRE TYPE D'HABITATION AVANT DE PASSER A L'ETAPE SUIVANTE.";
            }
            else if ((['optResidPrinc', 'optResidSec'].indexOf(this.valueResid.toString())<0 ))
            {
                this.brVisible = true;
                this.brMessage = "VEUILLEZ INDIQUEZ VOTRE TYPE DE RESIDENCE AVANT DE PASSER A L'ETAPE SUIVANTE.";
            }
        }   
        else if(this.numEtape === 3 ) {
            this.brVisible = false;  
            if ((['optSitVeuf', 'optSitConc', 'optSitSep', 'optSitDiv', 'optSitMar', 'optSitCel'].indexOf(this.valueSituation.toString())<0 ))
            {
                this.brVisible = true;
                this.brMessage = "VEUILLEZ INDIQUEZ VOTRE SITUATION FAMILIALE AVANT DE PASSER A L'ETAPE SUIVANTE.";
            }
            else if ((['optPers1', 'optPers2', 'optPers3', 'optPers4'].indexOf(this.valuePersonne.toString())<0 ))
            {
                this.brVisible = true;
                this.brMessage = "VEUILLEZ INDIQUEZ LE NOMBRE DE PERSONNES DE VOTRE FOYER AVANT DE PASSER A L'ETAPE SUIVANTE.";
            }            
        }   
        else if(this.numEtape === 4 ) {
            this.brVisible = false;
            if ( this.entryLastName == null || this.entryLastName === '' || 
            this.entryFirstName == null || this.entryFirstName === '' || 
            this.entryAddress == null || this.entryAddress === '' || 
            this.entryZip == null || this.entryZip === '' || 
            this.entryCity == null || this.entryCity === '' || 
            this.entryEmail == null || this.entryEmail === '' || 
            this.entryPhone == null || this.entryPhone === '' ) {
                this.brVisible = true;
                this.brMessage = "INFORMATIONS NON RENSEIGNES.";
            }
        }   
        if (this.brVisible) { this.showToastError(this.brMessage); }                    
    }

    //get getOffSecu() { return [ { label: 'Alarme Securité', value: 'optOffSecu' }, ]; }
    //get getOffAssurSecu() { return [ { label: 'Assurance Habitation & Alarme Securité', value: 'optOffAssurSecu' }, ]; }
    //get getOffreAssur() { return [ { label: 'Assurance Habitation', value: 'optOffAss' }, ]; }
    handleOffre(e){
        this.initvalueOffre();
        if (e.target.checked) 
        {
            if ( e.target.name === 'optOffAss' ) {
                this.valueOffre_1 = true; this.disableListAss = false;
                this.valueChoiceSecurite = null;
                this.valueChoiceSecuriteLabel = null;                
            }
            else if ( e.target.name === 'optOffSecu' ) {
                this.valueOffre_2 = true; this.disableListSec = false;
                this.valueChoiceAssurance = null;
                this.valueChoiceAssuranceLabel = null;                
            }
            else {this.valueOffre_3 = true; this.disableListAss = false; 
                this.disableListSec = false;}
                this.valueOffre = e.target.name;
                this.valueOffreLabel = e.target.label;            
        }
    }
    initvalueOffre()
    {
        this.disableListSec = true;
        this.disableListAss = true;
        this.valueOffre_1 = false;
        this.valueOffre_2 = false;
        this.valueOffre_3 = false;
        this.valueOffre = '';
        this.valueOffreLabel = null;  
    }

    handleChoixAssurance(e)
    {
        //this.ShowToastEvent('PASSE EVENT 1');
        this.valueChoiceAssurance = e.detail.value;
        this.valueChoiceAssuranceLabel = e.target.options.find(opt => opt.value === e.detail.value).label;        
        //this.ShowToastEvent('this.valueChoiceAssurance : ' + this.valueChoiceAssurance);
    }
    get optionChoiceAssurance() { return this.itemsChoiceAssurance;}
    
    handleChoixSecurite(e)
    {
        //this.ShowToastEvent('PASSE EVENT 2');
        this.valueChoiceSecurite = e.detail.value;
        this.valueChoiceSecuriteLabel = e.target.options.find(opt => opt.value === e.detail.value).label;        
    }
    get optionChoiceSecurite() { return this.itemsChoiceSecurite;}


    handleTypeHab(e) {
        this.initvalueHabType();
        if (e.target.checked) 
        {
            if ( e.target.name === 'optHabTypeApp' ) {this.valueHabType_1 = true; }            
            else {this.valueHabType_2 = true; }            
            this.valueHabType = e.target.name;
            this.valueHabTypeLabel = e.target.label;            
        }        
    }
    initvalueHabType()
    {
        this.valueHabType_1 = false;
        this.valueHabType_2 = false;        
        this.valueHabType = '';
        this.valueHabTypeLabel = null;
    }
    //get getResidPrinc() { return [ { label: 'Résidence Principal', value: 'optResidPrinc' }, ]; }
    //get getResidSec() { return [ { label: 'Résidence Secondaire', value: 'optResidSec' },]; }
    handleResidence(e) { 
        this.initvalueResid();
        if (e.target.checked) 
        {
            if ( e.target.name === 'optResidPrinc' ) {this.valueResid_1 = true; }            
            else {this.valueResid_2 = true; }            
            this.valueResid = e.target.name;
            this.valueResidLabel = e.target.label;            
        }          
    }
    initvalueResid()
    {
        this.valueResid_1 = false;
        this.valueResid_2 = false;        
        this.valueResid = '';
        this.valueResidLabel = null;
    }

     handleSituation(e) {
        this.initvalueSituation();     
        if (e.target.checked) 
        {
            if ( e.target.name === 'optSitCel' ) {this.valueSituation_1 = true; }
            else if ( e.target.name === 'optSitMar' ) {this.valueSituation_2 = true; }
            else if ( e.target.name === 'optSitDiv' ) {this.valueSituation_3 = true; }
            else if ( e.target.name === 'optSitSep' ) {this.valueSituation_4 = true; }
            else if ( e.target.name === 'optSitConc' ) {this.valueSituation_5 = true; }            
            else {this.valueSituation_6 = true; }
            this.valueSituation = e.target.name;
            this.valueSituationLabel = e.target.label;            
        }   
    } 
    initvalueSituation()
    {
        this.valueSituation_1 = false;
        this.valueSituation_2 = false;
        this.valueSituation_3 = false;
        this.valueSituation_4 = false;
        this.valueSituation_5 = false;
        this.valueSituation_6 = false;        
        this.valueSituation = '';
        this.valueSituationLabel = null;
    }

    handlePersonne(e) {
        this.initvaluePersonne();
        if (e.target.checked) 
        {
            if ( e.target.name === 'optPers1' ) {this.valuePersonne_1 = true; }
            else if ( e.target.name === 'optPers2' ) {this.valuePersonne_2 = true; }
            else if ( e.target.name === 'optPers3' ) {this.valuePersonne_3 = true; }
            else {this.valuePersonne_4 = true; }
            this.valuePersonne = e.target.name;
            this.valuePersonneLabel = e.target.label;            
        }               
    }  
    initvaluePersonne()
    {
        this.valuePersonne_1 = false;
        this.valuePersonne_2 = false;
        this.valuePersonne_3 = false;
        this.valuePersonne_4 = false;
        this.valuePersonne = '';
        this.valuePersonneLabel = null;   
    }

    initvalueCoordonnes()
    {
        this.entryCivilite = null;
        this.entryLastName = null;
        this.entryFirstName = null;
        this.entryAddress = null;
        this.entryCompAddress = null;
        this.entryZip = null;
        this.entryCity = null;
    }

    initAllvalues()
    {
        this.valueChoiceAssurance = null;
        this.valueChoiceAssuranceLabel = null;
        this.valueChoiceSecurite = null;
        this.valueChoiceSecuriteLabel = null;
        this.initvalueOffre();
        this.initvalueHabType();
        this.initvaluePersonne();
        this.initvalueResid();
        this.initvalueSituation();   
        this.numEtape = 0;
        this.btnSuiv();                     
    }

    entryChange(e) {       
        if (e.target.name === 'entryCivilite') { this.entryCivilite = e.target.value;}
        if (e.target.name === 'entryFirstName') { this.entryFirstName = e.target.value;}
        if (e.target.name === 'entryLastName') { this.entryLastName = e.target.value;}
        if (e.target.name === 'entryAddress') { this.entryAddress = e.target.value;}
        if (e.target.name === 'entryCompAddress') { this.entryCompAddress = e.target.value;}
        if (e.target.name === 'entryZip') { this.entryZip = e.target.value;}
        if (e.target.name === 'entryCity') { this.entryCity = e.target.value;}
        if (e.target.name === 'entryPhone') { this.entryPhone = e.target.value;}
        if (e.target.name === 'entryEmail') { this.entryEmail = e.target.value;}
         
        //console.log("entryChange > e.target.name : " + e.target.name);
        //console.log("entryChange >  e.target.value : " + e.target.value);
        //console.log("entryChange > this.testValue : " + this.testValue );
    } 

    createLead() {
        const fields = {};
        fields["Salutation"] = this.entryCivilite;
        fields["FirstName"] = this.entryFirstName;
        fields["LastName"] = this.entryLastName;
        fields["Street"] = this.entryAddress;
        fields["City"] = this.entryCity;
        fields["PostalCode"] = this.entryZip;
        fields["Phone"] = this.entryPhone;
        fields["Email"] = this.entryEmail;        

        fields["project_mse__AssuFoyer__c"] = this.valuePersonneLabel;
        fields["project_mse__AssuSituationFamiliale__c"] = this.valueSituationLabel;   
        fields["project_mse__AssuHabitation__c"] = this.valueHabTypeLabel.includes('maison') ? 'Maison' : 'Appartement';         
        fields["project_mse__AssuOffre__c"] = this.valueOffreLabel.includes('Assurance') && this.valueOffreLabel.includes('Alarme')  ? 'Assurance Hab. & Sécu' : this.valueOffreLabel;                 
        fields["project_mse__AssuResidence__c"] =  this.valueResidLabel;

        if (this.valueOffre_1 || this.valueOffre_3)
        {
            fields["project_mse__ProduitAssurance__c"] =  this.valueChoiceAssurance;
        }
        if (this.valueOffre_2 || this.valueOffre_3)
        {
            fields["project_mse__ProduitSecurite__c"] =  this.valueChoiceSecurite;
        }
        
        fields["Company"] = "NO COMPANY";
        fields["Status"] = "Open - Not Contacted";
        fields["LeadSource"] = "Partner Referral";
        
        //this.showToastError(this.valueHabTypeLabel + '' + fields["project_mse__AssuHabitation__c"] );
        //this.showToastError(this.valueOffreLabel + '' + fields["project_mse__AssuOffre__c"] );

        //fields[SITE_FIELD.fieldApiName] =this.site;
        const recordInput = { apiName: 'Lead', fields };
        createRecord(recordInput)
            .then(lead => {
                this.leadId = lead.id;                
                //this.showToastError('this.leadId : ' + this.leadId);
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Lead created',
                        variant: 'success'
                    })
                );
                this.initAllvalues();
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: this.reduceErrors(error).join(', '),
                        variant: 'error'
                    })
                );
                console.log('ERROR : ' + this.reduceErrors(error).join(', '));
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