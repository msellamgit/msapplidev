import { LightningElement, track, api } from 'lwc';

export default class VntModalFormLead extends LightningElement {
    @api bShowModal = false;
    @track leadId;
    @track retourHandleSubmit;

    @api
    getLeadId(valId)
    {
        this.bShowModal = true;
        this.leadId = valId;
    }
    
    closeModal() {
        this.bShowModal = false;
    }
    handleSubmit(event) {
        event.stopPropagation();
        event.preventDefault(); 
        this.retourHandleSubmit = this.template.querySelector("c-vnt-form-lead").handlModalSubmit();   
        //if ( this.retourHandleSubmit === 'OK' ) { this.bShowModal = false;}     
    }
}