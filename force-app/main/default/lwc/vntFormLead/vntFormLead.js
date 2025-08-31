import { LightningElement, track, wire, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import getProductAssu from '@salesforce/apex/LWC_Product.getProductFamily';
import getProductSecu from '@salesforce/apex/LWC_Product.getProductFamily';

const fieldsedit ="FirstName, LastName, project_mse__AssuOffre__c, project_mse__ProduitAssurance__c,  project_mse__ProduitSecurite__c, Phone, Status, Email, Company, project_mse__AssuFoyer__c, project_mse__AssuHabitation__c, project_mse__AssuResidence__c,  project_mse__AssuSituationFamiliale__c, LeadSource, OwnerId ";

export default class VntFormLead extends LightningElement {
    @track fieldsedit = fieldsedit;
    @track itemsChoiceSecurite = [];
    @track valueChoiceSecurite = '';
    @track itemsChoiceAssurance = [];
    @track valueChoiceAssurance = '';    
    @api leadId;
    @api hideButton = false;
    @api isModal = false;
    //@track paramLeadId = '';
    @track valeurCheckFields = true;
    @track msgerror;
    //@track ProduitSecuriteId;
    @track newProductSecu;
    @track newProductAssu;
    @track comboVariant = '';
    @track comboDisableSecurite = false;
    @track comboDisableAssurance = false;
    

    @api
    getLeadId(valId)
    {
        //this.bShowModal = true;
        this.leadId = valId;
    }
    connectedCallback() {
        if (this.hideButton ==="false") { this.hideButton = false; }
        if (this.hideButton ==="true") { this.hideButton = true; }
        if (this.isModal ==="false") { this.isModal = false; }
        if (this.isModal ==="true") { this.isModal = true; }

        if (!this.isModal) { this.comboVariant = 'label-inline'; }        
    }

    /* render()
    {
        this.template.querySelectorAll('lightning-input-field').forEach(field => {
            if (field.fieldName === "project_mse__ProduitSecurite__c") { this.valueChoiceSecurite = field.value ;}
            if (field.fieldName === "project_mse__ProduitAssurance__c") { this.valueChoiceAssurance = field.value ;} 
        });         
    }    */

    formLoadHandler(event){
        let assuOffre;
        this.template.querySelectorAll('lightning-input-field').forEach(field => {
            if (field.fieldName === "project_mse__ProduitSecurite__c") { this.newProductSecu = field.value;}
            if (field.fieldName === "project_mse__ProduitAssurance__c") { this.newProductAssu = field.value;}
            if (field.fieldName === "project_mse__AssuOffre__c") {assuOffre = field.value ;}       
        });          
        this.template.querySelectorAll('lightning-combobox').forEach(field => {
            if (field.name === "ProductSecu") { field.value = this.newProductSecu ;}
            if (field.name === "ProductAssu") { field.value = this.newProductAssu ;}            
        });   
        console.log('assuOffre', assuOffre)
        if ( assuOffre === 'Assurance Habitation' ) {
            this.comboDisableSecurite = true;
            this.comboDisableAssurance = false;   
        }
        else if ( assuOffre === 'Alarme Sécurité' ) {
            this.comboDisableSecurite = false;
            this.comboDisableAssurance = true;   
        }
    }
    
    closeModal() {
        //this.bShowModal = false;
    }

    showToastError(message) {
        const event = new ShowToastEvent({ title: 'VENTE', message: message, variant: 'info'});
        this.dispatchEvent(event);
    }

    handleSubmit(event) {
        event.stopPropagation();
        event.preventDefault();
        this.template.querySelectorAll('lightning-combobox').forEach(field => {
            if (field.name === "ProductSecu") { this.newProductSecu = field.value ;}
            if (field.name === "ProductAssu") { this.newProductAssu = field.value ;} 
        });   
        this.template.querySelectorAll('lightning-input-field').forEach(field => {
            if (field.fieldName === "project_mse__ProduitSecurite__c") { field.value = this.newProductSecu ;}
            if (field.fieldName === "project_mse__ProduitAssurance__c") { field.value = this.newProductAssu ;}
        });        
        try {
            let fields = event.detail.fields;
            if (this.checkFields()) {this.template.querySelector('lightning-record-edit-form').submit(fields);}
        }
        catch(err)
        {
            const e = new ShowToastEvent({ title: 'VENTE', message: 'ERREUR : ' + err.message, variant: 'error'});
            this.dispatchEvent(e);
        }         
    }

    @api
    handlModalSubmit() {
        this.template.querySelectorAll('lightning-combobox').forEach(field => {
            if (field.name === "ProductSecu") { this.newProductSecu = field.value ;}
            if (field.name === "ProductAssu") { this.newProductAssu = field.value ;}            
        });   
        this.template.querySelectorAll('lightning-input-field').forEach(field => {
            if (field.fieldName === "project_mse__ProduitSecurite__c") { field.value = this.newProductSecu ;}
            if (field.fieldName === "project_mse__ProduitAssurance__c") { field.value = this.newProductAssu ;}
        });    
        //console.log('onsubmit: '+ event.detail.fields);
        try {
            if (this.checkFields()) {this.template.querySelector('lightning-record-edit-form').submit();}
        }
        catch(err)
        {
            const e = new ShowToastEvent({ title: 'VENTE', message: 'ERREUR : ' + err.message, variant: 'error'});
            this.dispatchEvent(e);
        }         
    }

    checkFields(){
        this.valeurCheckFields = true;        

        this.template.querySelectorAll('lightning-input-field').forEach(field => {
               if ( field.required && ( field.value == null || field.value === '' ) ) {                    
                   this.valeurCheckFields = false 
                   this.msgerror = 'CHAMPS OBLIGATOIRES NON SALISIE';
                }
                if (this.valeurCheckFields && field.fieldName === 'Email' )                
                {
                    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(field.value)))
                    {
                        this.valeurCheckFields = false;
                        this.msgerror = 'EMAIL INVALIDE';
                    }
                    //const e = new ShowToastEvent({ title: 'VENTE', message: 'Email : ' + field.value , variant: 'info'});
                    //this.dispatchEvent(e);
                }
        });
    
        const event = new ShowToastEvent({ title: 'VENTE', message: this.msgerror, variant: 'error'});
        if (!this.valeurCheckFields) {this.dispatchEvent(event);}

        return this.valeurCheckFields;
    }

    handleSuccess(event) {
        const updatedRecord = event.detail.id;
        const e = new ShowToastEvent({ title: 'VENTE', message: 'Prospect Enregistré', variant: 'success'});
        this.dispatchEvent(e);
        this.closeModal();
    }
    handleFormError(event) {   
        event.preventDefault();
        event.stopImmediatePropagation();             
        const e = new ShowToastEvent({ title: 'VENTE', message: JSON.stringify(event.detail.message), variant: 'error'});
        this.dispatchEvent(e);
        //this.closeModal();
    }
    handleOffre(e){
        if ( e.detail.value === 'Assurance Habitation' ) {
            this.comboDisableSecurite = true;
            this.comboDisableAssurance = false;   
            this.valueChoiceSecurite = null;
        }
        else if ( e.detail.value === 'Alarme Sécurité' ) {
            this.comboDisableSecurite = false;
            this.comboDisableAssurance = true;   
            this.valueChoiceAssurance = null;                
        }
        else {
            this.comboDisableSecurite = false;
            this.comboDisableAssurance = false;   
        }
          
    }

    // + ' (' + list.project_mse__Price__c + ' ' + list.project_mse__Unit__c + ')'
    @wire(getProductSecu, { productType: 'Sécurité' }) 
    wiredListSecu ({ error, data }) {
        if (data) {  
            for(const list of data){
                const option = {
                    label: list.Name ,
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

    @wire(getProductAssu, { productType: 'Assurance' }) 
    wiredListAssu ({ error, data }) {
        if (data) {  
            for(const list of data){
                const option = {
                    label: list.Name ,
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
    
    /*
    handleChoixSecurite(e)
    {
        //this.ShowToastEvent('PASSE EVENT 2');
        //this.valueChoiceSecurite = e.detail.value;
        console.log('PASSAGE COMBO')
        //this.template.querySelector('lightning-record-edit-form.project_mse__ProduitSecurite__c').value = this.valueChoiceSecurite;
        //this.template.querySelector('lightning-input[data-formfield="project_mse__ProduitSecurite__c"]').value = this.valueChoiceSecurite;

        //this.valueChoiceSecuriteLabel = e.target.options.find(opt => opt.value === e.detail.value).label;        
    }
    */
    get optionChoiceSecurite() { return this.itemsChoiceSecurite;}    

    // handleChoixAssurance(e)
    // {
    //     this.valueChoiceAssurance = e.detail.value;
    // }
    get optionChoiceAssurance() { return this.itemsChoiceAssurance;} 

}