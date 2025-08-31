import { LightningElement, track, api, wire } from 'lwc';
//import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';

export default class LwcPocInfoAccount extends LightningElement {
    @track brValid = true;
    @track classfieldOK = 'classvaliddataabs';
    @track classfieldKO = 'classerrordataabs';
    @track classLegalStatut = '';
    @track className = '';
    @track classCity = '';
    @track classAdresse = '';
    @track brCheckLegalStatut = true;
    @track brCheckName = true;
    @track brCheckAdresse = true;
    @track brCheckCity = true;
    @track entryLegalStatut = '- bitte auswählen -';
    @track entryName = null;
    @track entryName2 = null;
    @track entryAdresse = null;
    @track entryCP = null;    
    @track entryCity = null;
    @track entryCountry = 'Germany';
    @track entryNumFiscal1 = null;
    @track entryNumFiscal2 = null;
    @track classLegalStatut = '';
    @track lstLegalForm = [{label: '- bitte auswählen -', value: '- bitte auswählen -'}, 
        {label: 'AG', value: 'AG'}, {label: 'Behörde', value: 'Behörde'}, 
        {label: 'e. V.', value: 'e. V.'}, {label: 'eG', value: 'eG'}, 
        {label: 'Einzelfirma (e. K.)', value: 'Einzelfirma (e. K.)'}, 
        {label: 'Freie Berufe', value: 'Freie Berufe'}, 
        {label: 'gAG', value: 'gAG'}, {label: 'GbR (BGB-Gesellschaft)', value: 'GbR (BGB-Gesellschaft)'}, 
        {label: 'Gewerbebetrieb', value: 'Gewerbebetrieb'}, {label: 'gGmbH', value: 'gGmbH'}, 
        {label: 'GmbH', value: 'GmbH'}, {label: 'GmbH & Co. KG', value: 'GmbH & Co. KG'}, 
        {label: 'KG', value: 'KG'}, {label: 'KGaA', value: 'KGaA'}, 
        {label: 'Limited (Ltd.)', value: 'Limited (Ltd.)'}, {label: 'OHG', value: 'OHG'}, 
        {label: 'Societas Europaea (SE)', value: 'Societas Europaea (SE)'}, {label: 'Sonstiges', value: 'Sonstiges'}, 
        {label: 'UG (haftungsbeschränkt)', value: 'UG (haftungsbeschränkt)'}] ;

    @api account;
    //https://salesforce.stackexchange.com/questions/291680/value-not-retaining-when-showing-a-different-template
    msgError = "Dieses Feld ist ein Pflichtfeld. Bitte füllen Sie es aus.";
    msgErrorList = "Dieses Feld ist ein Pflichtfeld. Bitte wählen Sie einen Eintrag aus der Liste aus.";
    

    connectedCallback() {
        // console.log('retour callback');
        // console.log(this.account);
        // console.log(this.account[0]);
        // console.log(this.account[1]);
        // console.log((this.account).length);
        if ((this.account).length == 9) {
            this.entryLegalStatut = this.account[0];
            this.entryName = this.account[1];
            this.entryName2 = this.account[2];
            this.entryAdresse = this.account[3];
            this.entryCP = this.account[4];
            this.entryCity = this.account[5];
            this.entryCountry = this.account[6];
            this.entryNumFiscal1 = this.account[7];
            this.entryNumFiscal2 = this.account[8];
        }
    }

    /*
    @wire(getObjectInfo, { objectApiName: 'Lead' })
    objectInfo;

    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: 'LegalForm__c'})
    wiredFiscaliteValues({ data, error }){
        if(data){
            console.log(` Picklist values are `, data.values);
            this.lstLegalForm = data.values;
            //this.error = undefined;
        }
        if(error){
            let errormessage = JSON.stringify(error);
            console.log(` Error while fetching Picklist values  ${errormessage}`);
            //this.error = error;
            this.lstLegalForm = undefined;
        }
    }   
    */

    @api getbrvalid() { this.brVerify(); return this.brValid ; }
    @api getInfoAcount() {
        let acc = [this.entryLegalStatut, this.entryName, this.entryName2, this.entryAdresse, 
            this.entryCP, this.entryCity, this.entryCountry, this.entryNumFiscal1, this.entryNumFiscal2 ];
        return acc; 
    }

    entryChange(e) { 
        if (e.target.name === 'entryLegalStatut') { this.entryLegalStatut = e.target.value;}
        if (e.target.name === 'entryName') { this.entryName = e.target.value;}
        if (e.target.name === 'entryName2') { this.entryName2 = e.target.value;}
        if (e.target.name === 'entryAdresse') { this.entryAdresse = e.target.value;}
        if (e.target.name === 'entryCP') { this.entryCP = e.target.value;}
        if (e.target.name === 'entryCity') { this.entryCity = e.target.value;}
        if (e.target.name === 'entryCountry') { this.entryCountry = e.target.value;}
        if (e.target.name === 'entryNumFiscal1') { this.entryNumFiscal1 = e.target.value;}
        if (e.target.name === 'entryNumFiscal2') { this.entryNumFiscal2 = e.target.value;}
    }

    brVerify() {
        this.brValid = true;
        this.brCheckLegalStatut = true;
        this.brCheckName = true;
        this.brCheckCity = true;
        this.brCheckAdresse = true;        

        if ( this.entryLegalStatut == null || this.entryLegalStatut === '' || 
            this.entryLegalStatut === '- bitte auswählen -')
        {
            this.brCheckLegalStatut = false;
            this.classLegalStatut = 'classerrordataabs';
            this.brValid = false;
        } else { this.classLegalStatut = 'classvaliddataabs'; }
        if ( this.entryName == null || this.entryName === '' )
        {
            this.brCheckName = false;
            this.className = 'classerrordataabs';
            this.brValid = false;
        } else { this.className = 'classvaliddataabs'; }
        if ( this.entryCP == null || this.entryCP === '' || this.entryCity == null || this.entryCity === '' )
        {
            this.brCheckCity = false;
            this.classCity = 'classerrordataabs';
            this.brValid = false;
        } else { this.classCity = 'classvaliddataabs'; }
        if ( this.entryAdresse == null || this.entryAdresse === '' )
        {
            this.brCheckAdresse = false;
            this.classAdresse = 'classerrordataabs';
            this.brValid = false;
        } else { this.classAdresse = 'classvaliddataabs'; }        
    }

}