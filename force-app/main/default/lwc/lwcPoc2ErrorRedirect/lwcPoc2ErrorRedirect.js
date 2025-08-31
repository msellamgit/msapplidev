import { LightningElement } from 'lwc';

export default class LwcPoc2ErrorRedirect extends LightningElement {

    renderedCallback() {
        window.open('./',"_self");
    }
}