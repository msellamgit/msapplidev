import { LightningElement, track, wire } from 'lwc';
import respoc2 from '@salesforce/resourceUrl/res_poc2';
import { CurrentPageReference } from 'lightning/navigation';

export default class Lwc_POC2_Presentation extends LightningElement {
    @track lg;
    parameters = new Map();

    imagelogo = respoc2 + '/uta_logo.png';    
    image_detail = respoc2 + '/details.svg';
    image_cards = respoc2 + '/cards.svg';
    image_packages = respoc2 + '/packages.svg';
    image_formular = respoc2 + '/formular.svg';
    imageearth = respoc2 + '/icon-earth.svg';
    @track lbl_presentation_title = 'Join UTA in 5 minutes!';
    @track lbl_presentation_select = 'Select your package';
    @track lbl_presentation_tellus = 'Tell us some details about you and your business';
    @track lbl_presentation_ordertitle = 'Order your cards';
    @track lbl_presentation_order = 'You will also be able to order cards later';
    @track lbl_presentation_banktitle = 'Enter the bank details';
    @track lbl_presentation_bank = 'You will need your company’s IBAN for this step';

    @wire(CurrentPageReference)
    getpageRef(pageRef) {
        for (const key of Object.keys(pageRef.state)) {
            //console.log(key + " -> " + pageRef.state[key])
            if (key == 'lg') { this.lg = pageRef.state[key] }
        }
        //
    }

    renderedCallback() {
        let param = this.template.querySelector('c-lwc-poc2-language').translatedata('presentation', this.lg);
        this.parameters = param;//'home', 'FR'
        if ( param == null || param == undefined || param.size === 0 ) { return; }

        //console.debug( param[0].name);     
        this.lbl_presentation_title = param.get('lbl_presentation_title'); 
        this.lbl_presentation_select = param.get('lbl_presentation_select'); 
        this.lbl_presentation_tellus = param.get('lbl_presentation_tellus'); 
        this.lbl_presentation_ordertitle = param.get('lbl_presentation_ordertitle'); 
        this.lbl_presentation_order = param.get('lbl_presentation_order'); 
        this.lbl_presentation_banktitle = param.get('lbl_presentation_banktitle'); 
        this.lbl_presentation_bank =  param.get('lbl_presentation_bank'); 
    }    

    changelanguage() {        
        this.template.querySelector('c-lwc-poc2-choice-lg').openlanguage();
    }    
}