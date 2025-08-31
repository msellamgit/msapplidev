import { LightningElement, wire, api, track } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
//import PHOTO_FIELD from '@salesforce/schema/Account.PhotoClient__c';
//import ADDRESS_FIELD from '@salesforce/schema/Account.BillingAddress';: ['Account.Name']
const fields = ['Account.Name'];


export default class AccountBanner extends LightningElement {
    @api recordId;
    @track accountObject = ACCOUNT_OBJECT;
    @track testIsNameNull=false;
    @track accountName='';
    @track d;
    @track record;

    @track tst = null;
    @wire(getRecord, { recordId: '$recordId', fields})
    wiredRecord({ error, record }) {        
        if (record) {
            console.log('>>>> pass record ');
            this.accountName = record.fields.Name.value;
            //this.accountAddress = getFieldValue(record, ADDRESS_FIELD);
        } else if (error) {
            this.error = error;
            console.log('>>>> error '+ error.message);
            // Handle error. Details in error.message.
        }
        this.d = record;
        console.log('>>>> test '+JSON.stringify(this.d));
        

    }

   // get name() {
    //    console.log('PASSE 2');                   
    //    return getFieldValue(this.record, NAME_FIELD);
    //}

    //get photo() {
    //    return getFieldValue(this.account.data, PHOTO_FIELD);
    //}
    renderedCallback() {
        console.log('TEST 1: '+this.testIsNameNull)
        this.accountName= this.record ? this.record.fields.Name.value : '';
        this.testINameNull= this.accountName!=='' && this.accountName!==null ? true : false;
        console.log('init : Name '+this.accountName);
        console.log('TEST 2: '+this.testIsNameNull);

    }
    //get address(){
    //    console.log('PASSE 3');           
    //    return this.record.fields.BillingAddress.value;
    //}
    
    handleConsoleLogClick(event) {
       //this.name();
       //this.photo();        
       //this.address();
       this.tst = getFieldValue(this.record, NAME_FIELD);     
        console.log(this.recordId);
        console.log(this.tst);
        console.log(this.recordId);
    }
}