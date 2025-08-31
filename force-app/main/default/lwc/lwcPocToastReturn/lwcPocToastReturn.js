import { LightningElement, track, api } from 'lwc';
export default class ModalPopupLWC extends LightningElement {
    //Boolean tracked variable to indicate if modal is open or not default value is false as modal is closed when page is loaded 
    @api isModalOpen = false;

    @api
    showToast() {
       this.isModalOpen = true;
    }

    openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
    }
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        try {
            this.isModalOpen = false;
        } 
        catch {

        }
    }
    submitDetails() {
        // to close modal set isModalOpen tarck value as false
        //Add your code to call apex method or do some processing
        this.isModalOpen = false;
    }
    redirect() {
        this.isModalOpen = false;
        window.location.href = "https://web.uta.com/";
    }
}