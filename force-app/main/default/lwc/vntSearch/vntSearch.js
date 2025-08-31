import { LightningElement, track, api, wire } from 'lwc';
import searchLeads from '@salesforce/apex/LWC_Lead.searchLeadName';
import { CurrentPageReference } from 'lightning/navigation';

const columnList = [{
    label: '',
    type: 'button-icon',
    initialWidth: 40,
    typeAttributes: {
        iconName: 'action:preview',
        title: 'Preview',
        variant: 'border-filled',
        alternativeText: 'View'
        }
    },
    {label: 'Nom', fieldName: 'Name'},
    {label: 'Offre', fieldName: 'project_mse__AssuOffre__c'},
    {label: 'Statut', fieldName: 'Status'},
    {label: 'Créé le', fieldName: 'CreatedDate', type: "date"}    
];

export default class VntSearch extends LightningElement {
    @track valuePeriode = 'optPerAll';
    @track valuePeriodeLabel = ''; 
    @track valueStatus = 'All';
    @track valueStatusLabel = '';    
    @track valueOffre = 'optOfAll';
    @track valueOffreLabel = '';    
    @api valueNom = '';    
    @track leadList;
    @track columnList = columnList;
    @track noRecordsFound = true;
    @track LeadSelected = {};
    @track showForm = false;
    @track showForm0 = true;
    @track LeadSelected;
    @track leadSelectedId;

    @wire(CurrentPageReference) currentPageReference; 


    get optionsPeriode() {
        return [
            { label: 'Tous', value: 'optPerAll' },
            { label: '1 jour', value: 'optPer1' },
            { label: '3 jours', value: 'optPer3' },
            { label: '7 jours', value: 'optPer7' },
            { label: '15 jours', value: 'optPer15' },
            { label: '1 mois', value: 'optPer30' },            
        ];
    }

     get optionsStatus() {
        return [
            { label: '--Tous--', value: 'All' },
            { label: 'Open - Not Contacted', value: 'OpenNotContacted' },
            { label: 'Working - Contacted', value: 'WorkingContacted' },
            { label: 'Closed - Converted', value: 'ClosedConverted' },
            { label: 'Closed - Not Converted', value: 'ClosedNotConverted' },            
        ];
    } 

    get optionsOffre() {
        return [
            { label: '...', value: 'optOfAll' },
            { label: 'Assurance', value: 'optOfAssu' },
            { label: 'Sécurité', value: 'optOfSecu' },
            { label: 'Assurance & Sécurité', value: 'optOfAssuSecu' },
        ];
    }

    connectedCallback() {
        const search10 = this.currentPageReference.state.last10;

        //console.log(JSON.stringify(this.currentPageReference));

        //if (this.currentPageReference.state.last10 ) { this.currentPageReference.state.last10 = '';}

        if ( search10 === 'yes')
        {
            searchLeads ( {Last10Created: 'Y', leadName: '', leadStatut: '', leadPeriode: '', leadOffre: ''} ) 
            .then(result => {
                this.leadList = result;
                this.noRecordsFound = false;
                //console.log('>>>> test '+JSON.stringify(this.leadList));                
            })
        } else {
            this.leadList = undefined;
            this.noRecordsFound = true;
        }            
    }

    findLeadResult() {        
        const paramStatus = ( this.valueStatus === 'All' ) ? '' : this.valueStatusLabel ;
        
        if(this.valueNom || paramStatus || this.valuePeriode || this.valueOffre) {
            searchLeads ( {leadName: this.valueNom, leadStatut: paramStatus, leadPeriode: this.valuePeriodeLabel, leadOffre: this.valueOffreLabel, Last10Created: ''} ) 
            .then(result => {
                this.leadList = result;
                this.noRecordsFound = false;
                //console.log('>>>> test '+JSON.stringify(this.leadList));                
            })
        } else {
            this.leadList = undefined;
            this.noRecordsFound = true;
        }
    }

    handleNameChange(event) {
        this.valueNom = event.target.value;
        this.findLeadResult();
    }

    handleStatusChange(event) {
        this.valueStatus = event.target.value;
        this.valueStatusLabel = event.target.options.find(opt => opt.value === event.detail.value).label;
        this.findLeadResult();
    }

    handlePeriodeChange(event) {
        this.valuePeriode = event.target.value;
        this.valuePeriodeLabel = ''
        if ( this.valuePeriode === 'optPer1' ) { this.valuePeriodeLabel = 1;}
        else if ( this.valuePeriode === 'optPer3' ) { this.valuePeriodeLabel = 3;}
        else if ( this.valuePeriode === 'optPer5' ) { this.valuePeriodeLabel = 5;}
        else if ( this.valuePeriode === 'optPer7' ) { this.valuePeriodeLabel = 7;}
        else if ( this.valuePeriode === 'optPer15' ) { this.valuePeriodeLabel = 15;}
        else if ( this.valuePeriode === 'optPer30' ) { this.valuePeriodeLabel = 30;}

        this.findLeadResult();
    }

    handleOffreChange(event) {
        this.valueOffre = event.target.value;
        this.valueOffreLabel = ''
        if ( this.valueOffre === 'optOfAssuSecu' ) { this.valueOffreLabel = 'Assurance Hab. & Sécu';}
        else if ( this.valueOffre === 'optOfSecu' ) { this.valueOffreLabel = 'Alarme Sécurité';}
        else if ( this.valueOffre === 'optOfAssu' ) { this.valueOffreLabel = 'Assurance Habitation';}
        this.findLeadResult();
    }

    handleRowAction(event) {
        const row = event.detail.row;
        this.LeadSelected = row; 
        //console.log('>>>> test '+JSON.stringify(row));  
        this.leadSelectedId = this.LeadSelected.Id;
        this.showForm = true;
        //this.template.querySelector('c-vnt-modal-form-lead').getLeadId(this.leadSelectedId);

        //this.showToastError(this.LeadSelected.Id);
        
    }

    handleSubmit(event) {
        event.stopPropagation();
        event.preventDefault(); 
        this.retourHandleSubmit = this.template.querySelector("c-vnt-form-lead").handlModalSubmit();
        //this.closeForm(event);   
        //if ( this.retourHandleSubmit === 'OK' ) { this.bShowModal = false;}     
    }
    closeForm(event)
    {
        event.stopPropagation();
        event.preventDefault(); 
        this.showForm = false;
    }
}