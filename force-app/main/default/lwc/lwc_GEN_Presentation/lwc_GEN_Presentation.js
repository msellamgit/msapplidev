import { LightningElement, track, wire } from 'lwc';
import res_gen from '@salesforce/resourceUrl/res_gen';
import { CurrentPageReference } from 'lightning/navigation';

export default class Lwc_POC2_Presentation extends LightningElement {
    @track lg;
    parameters = new Map();

    imagelogo = res_gen + '/uta_logo.png';    
    image_detail = res_gen + '/details.svg';
    image_cards = res_gen + '/cards.svg';
    image_packages = res_gen + '/packages.svg';
    image_formular = res_gen + '/formular.svg';
    imageearth = res_gen + '/icon-earth.svg';
    @track lbl_presentation_title = 'Join UTA in 5 minutes!';
    @track lbl_presentation_select = 'Select your package';
    @track lbl_presentation_tellus = 'Tell us some details about you and your business';
    @track lbl_presentation_ordertitle = 'Order your Cards';
    @track lbl_presentation_order = 'You will also be able to order cards later';
    @track lbl_presentation_banktitle = 'Enter the bank details';
    @track lbl_presentation_bank = 'You will need your company’s IBAN for this step';
    
    @wire(CurrentPageReference)
    getpageRef(pageRef) {
        for (const key of Object.keys(pageRef.state)) {
            console.log(key + " -> " + pageRef.state[key])
            if (key == 'lg') { this.lg = pageRef.state[key] }
        }
    }

    renderedCallback() {
        let param = this.template.querySelector('c-lwc-poc2-language').translatedata('presentation', this.lg);
        this.parameters = param;//'home', 'FR'
        if ( param == null || param == undefined || param.size === 0 ) { return; }
        console.log(param);
        let labelTranslation = ['lbl_presentation_title','lbl_presentation_select', 
                    'lbl_presentation_tellus', 'lbl_presentation_ordertitle', 
                    'lbl_presentation_order', 'lbl_presentation_banktitle', 
                    'lbl_presentation_bank'];

        try {
            for (let i = 0; i < labelTranslation.length; i++) {
                eval('this.' + labelTranslation[i] + " = " + "`" + this.getparamtranslate(param, labelTranslation[i]) + "`");
            }
        } catch (error) {
            console.log(error);
        }
    }

    getparamtranslate(param, lbl_string) {
		return param.has(lbl_string) ? param.get(lbl_string) : eval('this.' + lbl_string);
	}

    changelanguage() {        
        this.template.querySelector('c-lwc-poc2-choice-lg').openlanguage();
    }    
}