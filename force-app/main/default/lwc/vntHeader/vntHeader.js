import { LightningElement, wire, track } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import IDSEL_LOGO from '@salesforce/resourceUrl/logoIDsel';
import userId from '@salesforce/user/Id';
import NAME_FIELD from '@salesforce/schema/User.Name';
import SMALLPHOTO_FIELD from '@salesforce/schema/User.SmallPhotoUrl';


export default class VntHeader extends LightningElement {
    idselLogoUrl = IDSEL_LOGO;
    //@track venteUserId = userId;

    @wire(getRecord, { recordId: userId, fields: [NAME_FIELD,SMALLPHOTO_FIELD] }) 
    user;

    get infouserName()
    {
        return this.user.data ? getFieldValue(this.user.data, NAME_FIELD) : '';
    }

    get smallphoto()
    {
        return this.user.data ? getFieldValue(this.user.data, SMALLPHOTO_FIELD) : '';
    }

    showHideMenu(){
        if (this.template.querySelector('.my-menu').classList.value.includes('slds-is-open'))
        {
            this.template.querySelector('.my-menu').classList.remove('slds-is-open');
        }
        else
        {
            this.template.querySelector('.my-menu').classList.add('slds-is-open');
        }

    }
    onLogout()
    {
        window.location = '/vente/secur/logout.jsp';
    }

}