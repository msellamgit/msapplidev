import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import userId from '@salesforce/user/Id';
import SMALLPHOTO_FIELD from '@salesforce/schema/User.SmallPhotoUrl';
import FULLPHOTO_FIELD from '@salesforce/schema/User.FullPhotoUrl';

export default class VntProfile extends LightningElement {
    @api getuserId = userId;

    @wire(getRecord, { recordId: userId, fields: [SMALLPHOTO_FIELD, FULLPHOTO_FIELD] }) 
    user;

    get smallphoto()
    {
        return this.user.data ? getFieldValue(this.user.data, SMALLPHOTO_FIELD) : '';
    }

    get fullphoto()
    {
        return this.user.data ? getFieldValue(this.user.data, FULLPHOTO_FIELD) : '';
    }
}