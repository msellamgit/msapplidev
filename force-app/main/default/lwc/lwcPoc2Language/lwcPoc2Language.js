import { LightningElement, track, api } from 'lwc';
import respoc2json from '@salesforce/resourceUrl/res_poc2_json';

export default class LwcPoc2Language extends LightningElement {
    @track tradall = null;

    connectedCallback() {
        //let restranslate = respoc2;// + '/ost_translatation.json';
        let body;
        //var xmlHttp= null;
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.open('GET', respoc2json, false);
        xmlHttp.send(null);



        // body = xmlHttp.responseText;
        //PageReference pg = new PageReference(srPath);
        //let pg = 'https://ms-appli-dev-ed.my.site.com/' + restranslate;
        // body = xmlHttp.responseText;   //get the content as string
        //console.log(restranslate);
        //console.log(xmlHttp.responseText);
        
        let trad = JSON.parse(xmlHttp.responseText);
        //console.log(trad)
        this.tradall = JSON.parse(xmlHttp.responseText);
        //console.log(trad.FR.main);

    }

    @api translatedata(group, language) {

        if ( language == null || language === '' ) { language = 'EN';} 
        let retourtranslat = new Map();
        language = language.toUpperCase()
        
        if ( !this.tradall.hasOwnProperty(language) ) { return retourtranslat; }

        let tradlangue = this.tradall[language];
        let tradgroup = JSON.parse(JSON.stringify(tradlangue))[group];
        
        for(var key in tradgroup){
            retourtranslat.set(key, tradgroup[key]);
            //console.log(key, tradgroup[key]);
        }
        return retourtranslat;
    }
}