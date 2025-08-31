import { LightningElement, api, track } from 'lwc';

export default class LwcPocToast extends LightningElement {
    @track type='';
    @track message = '';
    @track showToastBar = false;
    @api autoCloseTime = 4000;

    @api
    showToast(type, message) {
        this.type = type;
        this.message = message;
        this.showToastBar = true;
        setTimeout(() => {
            this.closeModel();
        }, this.autoCloseTime);
    }

    closeModel() {
        this.showToastBar = false;
        this.type = '';
        this.message = '';
	}

    get signetype() {
        if ( this.type == 'success' ) { return '✔'  ;}
        else if ( this.type == 'error' ) { return 'X' ;}
        else { return '!' ;}        
    }

    get notifytoastcolor() {
        let cls = 'notifytoast ';
        if ( this.type == 'success' ) { return cls = cls + 'bgcolorgreen' ;}
        else if ( this.type == 'error' ) { return cls = cls + 'bgcolorred' ;}
        else { return cls = cls + 'bgcolorother' ;}        
    }

    get getdoccolor(){
        let cls = 'dot ';
        if ( this.type == 'success' ) { return cls = cls + 'colorgreen' ;}
        else if ( this.type == 'error' ) { return cls = cls + 'colorred' ;}
        else { return cls = cls + 'colorother' ;}            
    }
    /*
    get getIconName() {
        return 'utility:' + this.type;
    }

    get innerClass() {
        return 'slds-icon_container slds-icon-utility-' + this.type + ' slds-icon-utility-success slds-m-right_small slds-no-flex slds-align-top';
    }

    get outerClass() {
        return 'slds-notify slds-notify_toast slds-theme_' + this.type;
    }
    */

}