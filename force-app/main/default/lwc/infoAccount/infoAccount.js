import { LightningElement, wire, api, track } from 'lwc';
import { getFieldValue } from 'lightning/uiRecordApi';
import getInfoAccount from '@salesforce/apex/AccountController.getInfoAccount';
import NAME_FIELD from '@salesforce/schema/Account.Name';

export default class InfoAccount extends LightningElement  {
    @api recordId;              
    @track imageUrl;
    @track showname;
    @track account;
    @track vName;
    @track vType;
    @track vBillingStreet;
    @track vBillingPostalCode;
    @track vBillingCity;
    @track vPhone;

    @wire(getInfoAccount, {recordId: '$recordId'}) 
    wireAccount({ error, data }) { 
        if (data) {
            this.account = data;
            this.vName = this.account.Name;
            this.vType = this.account.Type;
            this.vPhone = this.account.Phone;            
            this.vBillingStreet = this.account.BillingStreet;
            this.vBillingPostalCode = this.account.BillingPostalCode;
            this.vBillingCity = this.account.BillingCity;
            this.imageUrl = 'https://ms-appli-dev-ed--c.eu14.content.force.com/servlet/servlet.FileDownload?file=' + this.account.project_mse__ImageId__c;
            console.log('DATA ====> '+ JSON.stringify(data));
            console.log('this.account ====> '+ JSON.stringify(this.account));
            console.log('this.imageUrl ====> '+ this.imageUrl);
            const lat = '';
            const long = '';
            this.mapMarkers = [{
                location: {
                    Street: this.account.BillingStreet,
                    City: this.vBillingCity,
                    State: '',
                    Country: 'France',
                    Latitude: lat,
                    Longitude:long
                },
                    title: 'test',
                    description: 'LIEUX DU RDV'
                }];  

        } else if (error) {
            this.error = error;
        }
    }
    //wiredAccount(account){
    //    this.dt = account.data;
    //    this.imageUrl = '/servlet/servlet.FileDownload?file=01524000003TcMd'  ;       
    //}
    @track isOpenModal = false;

    @track mapMarkers ;

    handleOpenModal() {      
        this.isOpenModal = true;
    }
   
    handleCloseModal() {
        this.isOpenModal = false;
    }

    connectedCallback() {
        //console.log('TEST 1: '+this.testIsNameNull)+ account.data.Name
        //this.accountName= this.record ? this.record.fields.Name.value : '';
        //this.testINameNull= this.accountName!=='' && this.accountName!==null ? true : false;
        //console.log('init : Name '+this.accountName);/sfc/servlet.shepherd/document/download/<YOUR FILE ID>
        //this.dt = this.account.data;
        //this.urlImage="/servlet/servlet.FileDownload?file=01524000003TcMd";project_mse__
        //this.urlImage="/servlet/servlet.FileDownload?file=" + this.account.data.fields.Name.value ;
        console.log('DATA => ' +  JSON.stringify(this.account));
        console.log('TEST IMAGE ');
        //this.imageUrl = '/servlet/servlet.FileDownload?file=' + this.dt.Name.value ;
    }
    handleClick() {
        this.showname = getFieldValue(this.account.data, NAME_FIELD);
        console.log(this.showname);
        console.log(JSON.stringify(this.account));
        console.log(this.showname);
    }
}