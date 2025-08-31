import { LightningElement, track } from 'lwc';
import searchLeads from '@salesforce/apex/LWC_Lead.searchLeadName';
import IMG_LEQUIPE from '@salesforce/resourceUrl/vntImageLequipe';
import IMG_PROSPECT from '@salesforce/resourceUrl/vntImageProspect';
import IMG_CUSTOMER from '@salesforce/resourceUrl/vntImageCustomer';

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
    {label: 'Statut', fieldName: 'Status'}
];

export default class LightningDataTable extends LightningElement {
    resLequipe = IMG_LEQUIPE;
    resProspect = IMG_PROSPECT;
    resCustomer = IMG_CUSTOMER;
    @track leadList;
    @track columnList = columnList;
    @track noRecordsFound = true;
    @track LeadSelected = {};
    //@track bShowModal = false;
    @track leadSelectedId;

    findLastCreated()
    {
        window.open("/vente/s/vente-search?last10=yes","_self"); 
    }

    openLequipe()
    {
        window.open("https://www.lequipe.fr");         
    }

    findLeadResult(event) {
        const leadName = event.target.value;
        if(leadName) {
            searchLeads ( {leadName: leadName, leadStatut: '', leadPeriode: '', leadOffre: '', Last10Created: ''} )             
            //searchLeads ({leadName}) 
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

    handleRowAction(event) {
        const row = event.detail.row;
        this.LeadSelected = row; 
        //console.log('>>>> test '+JSON.stringify(row));  
        this.leadSelectedId = this.LeadSelected.Id;
        //this.bShowModal = true;
        this.template.querySelector('c-vnt-modal-form-lead').getLeadId(this.leadSelectedId);

        //this.showToastError(this.LeadSelected.Id);
        
    }
    
}