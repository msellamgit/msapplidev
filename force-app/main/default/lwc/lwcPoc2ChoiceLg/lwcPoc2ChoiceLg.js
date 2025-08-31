import { LightningElement, track, api } from 'lwc';
import respoc from '@salesforce/resourceUrl/res_poc2';

export default class LwcPoc2ChoiceLg extends LightningElement {
    @track message = 'Please select your language of preference.';
    @track showToastBar = false;
    imagelogo = respoc + '/uta_logo.png';
    @track entryLegalStatut = '?';
    @track lstLanguage = [{value: 'de', label: 'Deutsch'}, 
            {value: 'en', label: 'English'}, 
            {value: 'fr', label: 'Français'}/*, 
            {value: 'it', label: 'Italiano'}, 
            {value: 'nl', label: 'Nederlands'}, 
            {value: 'es', label: 'Español'}, 
            {value: 'hu', label: 'Magyar'}, 
            {value: 'cz', label: 'Čeština'}, 
            {value: 'et', label: 'Eesti keel'}, 
            {value: 'lv', label: 'Latviešu'}, 
            {value: 'lt', label: 'Lietuvių k.'}, 
            {value: 'uk', label: 'Українська'}, 
            {value: 'pl', label: 'Polski'}, 
            {value: 'ro', label: 'Română'}, 
            {value: 'bg', label: 'Български'}, 
            {value: 'sk', label: 'Slovenčina'}*/
        ];

    @api
    openlanguage() {
        this.showToastBar = true;
    }

    entryChange(e) { 
        if (e.target.name === 'entryLanguage') { this.entryLanguage = e.target.value;}
    }

    changelanguage() {
        window.open("?lg="+this.entryLanguage,"_self"); 
    }

    closeModel() {
        this.showToastBar = false;
        this.message = '';
	}
}