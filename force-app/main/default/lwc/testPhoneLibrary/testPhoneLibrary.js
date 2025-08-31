import { LightningElement, track } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import libPhoneNumber from "@salesforce/resourceUrl/res_poc2_checkphone";
export default class TestPhoneLibrary extends LightningElement {
    
    @track isValidPhone = false;

    phone = '';

    // connectedCallback() {
    //     console.log('inside connectedCallback');
    //     loadScript(this, libPhoneNumber).then(() => {
    //         //helloWorld();
    //         //const phoneNumber = libPhoneNumber.parsePhoneNumber(' 8 (800) 555-35-35 ', 'RU');
    //         var phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
    //         var PNF = libphonenumber.PhoneNumberFormat;
    //         var phoneNumber = phoneUtil.parseAndKeepRawInput('689361610', 'FR');
    //         console.log('is valid = ' + phoneUtil.isValidNumber(phoneNumber));
            

    //     });
    // }

    checkPoneNumber() {
        //let inputPhone = this.template.querySelector('.inputphone');
        let valphone = this.phone;
        console.log(valphone);
        loadScript(this, libPhoneNumber).then(() => {
            var phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
            var phoneNumber = phoneUtil.parseAndKeepRawInput(valphone, 'FR');
            console.log('>>>' + JSON.stringify(phoneNumber));
            this.isValidPhone = phoneUtil.isValidNumber(phoneNumber);
            console.log('is valid = ' + phoneUtil.isValidNumber(phoneNumber));
        })
        .catch((error) => {
            console.log(error);
        });
    }

    handlePhone(event){

        this.phone = event.detail.value;
        console.log('inside click ' + event.detail.value);
        if ((event.detail.value).length < 5 ) { this.isValidPhone = false; return;}
        this.checkPoneNumber();
        /* 
        loadScript(this, libPhoneNumber).then(() => {
            var phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
            var phoneNumber = phoneUtil.parseAndKeepRawInput(event.detail.value, 'FR');
            console.log('>>>' + JSON.stringify(phoneNumber));
            this.isValidPhone = phoneUtil.isValidNumber(phoneNumber);
            console.log('is valid = ' + phoneUtil.isValidNumber(phoneNumber));
        });*/
    }

    /*
    checkPhoneValid(){
        console.log('inside checkPhoneValid');
        loadScript(this, libPhoneNumber).then(() => {
            var phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
            var PNF = libphonenumber.PhoneNumberFormat;
            var phoneNumber = phoneUtil.parseAndKeepRawInput(this.phone, 'FR');
            console.log('>>>' + JSON.stringify(phoneNumber));

            console.log('is valid = ' + phoneUtil.isValidNumber(phoneNumber));
                //console.log(phoneUtil.formatInOriginalFormat(phoneNumber, 'FR'));

               // this.phone = phoneUtil.formatInOriginalFormat(phoneNumber, 'FR');
             this.phone = phoneUtil.format(phoneNumber, PNF.INTERNATIONAL);
            console.log(phoneUtil.format(phoneNumber, PNF.INTERNATIONAL));
            console.log(phoneNumber.getCountryCode());
            console.log(phoneNumber.getExtension());
        });
    }
    */
}