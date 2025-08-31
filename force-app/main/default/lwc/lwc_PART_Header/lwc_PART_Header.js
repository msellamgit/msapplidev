import { LightningElement, track } from 'lwc';
import respart from '@salesforce/resourceUrl/res_part';


export default class Lwc_PART_Header extends LightningElement {
    imagelogo = respart + '/uta_logo.png';    
    imageearth = respart + '/icon-earth.svg';
    @track labelmenu = 'TO DEFINE';
    @track ismenu0 = false;
    @track ismenu1 = false;
    @track ismenu2 = false;
    @track ismenu3 = false;
    @track ismenu4 = false;
    @track ismenu5 = false;
    @track ismenu10 = true;
    @track ismenu11 = false;
    @track ismenu12 = false;
    @track ismenu13 = false;
    @track ismenu21 = false;
    @track ismenu22 = false;
    @track ismenu23 = false;
    
    initmenu() {
        this.ismenu0 = false;
        this.ismenu1 = false;
        this.ismenu2 = false;
        this.ismenu3 = false;
        this.ismenu4 = false;
        this.ismenu5 = false;
        this.ismenu10 = false;
        this.ismenu11 = false;
        this.ismenu12 = false;
        this.ismenu13 = false;
        this.ismenu21 = false;
        this.ismenu22 = false;
        this.ismenu23 = false;
    }

    showHideMenu() {
        if (this.template.querySelector('.my-menu').classList.value.includes('slds-is-open'))
        {
            this.template.querySelector('.my-menu').classList.remove('slds-is-open');
            this.template.querySelector('.imgexpand').classList.remove('rotateexpand');
            this.template.querySelector('.matpersonn').classList.remove('clrred');
            this.template.querySelector('.lblaccount').classList.remove('clrred');
            this.template.querySelector('.my-menu').classList.remove('clrred');
        }
        else
        {
            this.template.querySelector('.my-menu').classList.add('slds-is-open');
            this.template.querySelector('.imgexpand').classList.add('rotateexpand'); 
            this.template.querySelector('.matpersonn').classList.add('clrred');
            this.template.querySelector('.lblaccount').classList.add('clrred');
            this.template.querySelector('.my-menu').classList.add('clrred');           
        }

    }

    gotomenu(e) {
        let nummenu = e.currentTarget.dataset.id;
        this.initmenu();

        if (nummenu === '0') { this.ismenu0 = true; this.labelmenu = 'SE DECONNECTER'; this.showHideMenu(); }
        else if (nummenu === '1') { this.ismenu1 = true; this.labelmenu = 'MY COMPANY'; this.showHideMenu(); } 
        else if (nummenu === '2') { this.ismenu2 = true; this.labelmenu = 'DOCUMENTS'; this.showHideMenu(); } 
        else if (nummenu === '3') { this.ismenu3 = true; this.labelmenu = 'LOCATIONS'; this.showHideMenu(); } 
        else if (nummenu === '4') { this.ismenu4 = true; this.labelmenu = 'MARKETING ACTIVITIES'; this.showHideMenu(); } 
        else if (nummenu === '5') { this.ismenu5 = true; this.labelmenu = 'ORDERS'; this.showHideMenu(); } 
        else if (nummenu === '10') { this.ismenu10 = true; this.labelmenu = 'HOME'; } 
        else if (nummenu === '11') { this.ismenu11 = true; this.labelmenu = 'NEWS'; } 
        else if (nummenu === '12') { this.ismenu12 = true; this.labelmenu = 'MARKETING'; } 
        else if (nummenu === '13') { this.ismenu23 = true; this.labelmenu = 'FAQ'; } 
        else if (nummenu === '21') { this.ismenu21 = true; this.labelmenu = ''; } 
        else if (nummenu === '22') { this.ismenu22 = true; this.labelmenu = ''; } 
        else if (nummenu === '23') { this.ismenu23 = true; this.labelmenu = ''; } 
    }

    changelanguage() {
        console.log('function changelanguage');
    }

}