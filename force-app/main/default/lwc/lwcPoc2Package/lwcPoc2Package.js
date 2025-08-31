import { LightningElement, api, track, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import respoc from '@salesforce/resourceUrl/res_poc2';

export default class LwcPoc2Package extends LightningElement {
    @track lg = '';
    parameters = new Map();    
    imagelists= respoc + '/packages.svg';
    @api package;
    @track numpackage = 0;
    @track labelpackage = '';
    @track valuePackage1 = false;
    @track valuePackage2 = false; 
    
    @track lbl_package_title = 'Choose your package';
    @track lbl_package_msg_monthfree = '1 MONTH FREE !';    
    @track lbl_package_choice1_lbl1 = 'Free';
    @track lbl_package_choice1_lbl2 = 'For 12 months then 0.75€/card/month';
    @track lbl_package_choice2_lbl1 = 'Per card per month';
    @track lbl_package_essential_title = 'Essential network';
    @track lbl_package_essential_lbl1 = 'Fueling at <b>7.500</b> inexpensive stations in Germany';
    @track lbl_package_essential_lbl2 = 'Washing and vehicle accessories';
    @track lbl_package_premium_title = 'Premium network';
    @track lbl_package_premium_lbl1 = 'Fueling at <b>5000</b> premium stations in Germany';
    @track lbl_package_premium_lbl2 = 'Washing, vehicles accessories, repairs and more in our partner network';
    @track lbl_package_discount_title = 'Discounts';
    @track lbl_package_discount_lbl1 = '1 ct/L discount (gross) on diesel in all our stations';
    @track lbl_package_discount_lbl2 = 'One <b>preferred station</b> to select, with increased discounts';
    @track lbl_package_discount_lbl5 = '2ct/L on diesel, 1ct/L on petrol (gross)';
    @track lbl_package_manage_title = 'Manage your account';
    @track lbl_package_manage_lbl1 = 'Manage your cards and your account through myUTA portal';
    @track lbl_package_chooseSuperSaver = 'Choose SuperSaver';
    @track lbl_package_chooseSuperFlex = 'Choose SuperFlex';

    connectedCallback() {
        this.putinfoPackage()
    }

    putinfoPackage() {
        if ((this.package).length == 4) {
            this.numpackage = this.package[0];
            this.labelpackage = this.package[1];
            this.valuePackage1 = this.package[2];
            this.valuePackage2 = this.package[3];
        }
    }

    @api loaddata(data) {
        this.package = data[0].package;
        this.putinfoPackage();
    }

    @wire(CurrentPageReference)
    getpageRef(pageRef) {
        for (const key of Object.keys(pageRef.state)) {
            //console.log(key + " -> " + pageRef.state[key])
            if (key == 'lg') { this.lg = pageRef.state[key] }
        }
    }

    renderedCallback() {
        let param = this.template.querySelector('c-lwc-poc2-language').translatedata('package', this.lg);
        this.parameters = param;//'home', 'FR'
        if ( param == null || param == undefined || param.size === 0 ) { 
            const container1 = this.template.querySelector('.msgessential1'); 
            if (container1) {
                container1.innerHTML = this.lbl_package_essential_lbl1;
            }
            const container2 = this.template.querySelector('.msgpremium1'); 
            if (container2) {
                container2.innerHTML = this.lbl_package_premium_lbl1;
            }    
            const container3 = this.template.querySelector('.msgdiscount2'); 
            if (container3) {
                container3.innerHTML = this.lbl_package_discount_lbl2;
            }  
            return; 
        }
        //console.debug( param[0].name);     
        this.lbl_package_title = this.getparamtranslate(param, 'lbl_package_title', this.lbl_package_title);
        this.lbl_package_msg_monthfree = this.getparamtranslate(param, 'lbl_package_msg_monthfree', this.lbl_package_msg_monthfree);        
        this.lbl_package_choice1_lbl1 = this.getparamtranslate(param, 'lbl_package_choice1_lbl1', this.lbl_package_choice1_lbl1);
        this.lbl_package_choice1_lbl2 = this.getparamtranslate(param, 'lbl_package_choice1_lbl2', this.lbl_package_choice1_lbl2);
        this.lbl_package_choice2_lbl1 = this.getparamtranslate(param, 'lbl_package_choice2_lbl1', this.lbl_package_choice2_lbl1);
        this.lbl_package_essential_title = this.getparamtranslate(param, 'lbl_package_essential_title', this.lbl_package_essential_title);
        this.lbl_package_essential_lbl1 = this.getparamtranslate(param, 'lbl_package_essential_lbl1', this.lbl_package_essential_lbl1);
        this.lbl_package_essential_lbl2 = this.getparamtranslate(param, 'lbl_package_essential_lbl2', this.lbl_package_essential_lbl2);
        this.lbl_package_premium_title = this.getparamtranslate(param, 'lbl_package_premium_title', this.lbl_package_premium_title);
        this.lbl_package_premium_lbl1 = this.getparamtranslate(param, 'lbl_package_premium_lbl1', this.lbl_package_premium_lbl1);
        this.lbl_package_premium_lbl2 = this.getparamtranslate(param, 'lbl_package_premium_lbl2', this.lbl_package_premium_lbl2);
        this.lbl_package_discount_title = this.getparamtranslate(param, 'lbl_package_discount_title', this.lbl_package_discount_title);
        this.lbl_package_discount_lbl1 = this.getparamtranslate(param, 'lbl_package_discount_lbl1', this.lbl_package_discount_lbl1);
        this.lbl_package_discount_lbl2 = this.getparamtranslate(param, 'lbl_package_discount_lbl2', this.lbl_package_discount_lbl2);
        this.lbl_package_discount_lbl5 = this.getparamtranslate(param, 'lbl_package_discount_lbl5', this.lbl_package_discount_lbl5);
        this.lbl_package_manage_title = this.getparamtranslate(param, 'lbl_package_manage_title', this.lbl_package_manage_title);
        this.lbl_package_manage_lbl1 = this.getparamtranslate(param, 'lbl_package_manage_lbl1', this.lbl_package_manage_lbl1);
        this.lbl_package_chooseSuperSaver = this.getparamtranslate(param, 'lbl_package_chooseSuperSaver', this.lbl_package_chooseSuperSaver);                 
        this.lbl_package_chooseSuperFlex = this.getparamtranslate(param, 'lbl_package_chooseSuperFlex', this.lbl_package_chooseSuperFlex);                 
        this.initlabelinner()
        /*
        console.log('PASS');
        console.log(this.package);
        console.log(JSON.stringify(this.package));
        console.log(this.valuePackage1);
        console.log(this.valuePackage2);
        console.log(this.package[2]);
        console.log(this.package[3]);*/
        //if (this.package[2]) { console.log('PASS PACKAGE 1'); this.template.querySelector("[name='entryPac1']").checked = true;  }
        //if (this.package[3]) { console.log('PASS PACKAGE 2'); this.template.querySelector("[name='entryPac2']").checked = true;  }
        //if (this.valuePackage1) { this.template.querySelector('.entryPac1').checked = true; }
        //if (this.valuePackage2) { this.template.querySelector('.entryPac2').checked = true; }
    }

    initlabelinner() {
        const container1 = this.template.querySelector('.msgessential1'); 
        if (container1) {
            container1.innerHTML = this.lbl_package_essential_lbl1;
        }
        const container2 = this.template.querySelector('.msgpremium1'); 
        if (container2) {
            container2.innerHTML = this.lbl_package_premium_lbl1;
        }    
        const container3 = this.template.querySelector('.msgdiscount2'); 
        if (container3) {
            container3.innerHTML = this.lbl_package_discount_lbl2;
        }   
    }
    
    getparamtranslate(param, lbl_string , defaulttrad) {
		return param.has(lbl_string) ? param.get(lbl_string) : defaulttrad;
		//return param.has(lbl_string) ? '¤¤¤ ' + param.get(lbl_string) : '???? ';
	}

    entryChange(e) { 
        this.initPackage();
        let inputoptchoice1 = this.template.querySelector('.optchoice1');
        let inputoptchoice2 = this.template.querySelector('.optchoice2');
        
        if ( inputoptchoice1.classList.value.includes('bold')) {
            inputoptchoice1.classList.remove('bold'); 
        }
        if ( inputoptchoice2.classList.value.includes('bold')) {
            inputoptchoice2.classList.remove('bold'); 
        }

        if (e.target.checked) 
        {
            if (e.target.name === 'entryPac1') { 
                this.valuePackage1 = true; this.numpackage = 1; 
                this.labelpackage = 'SuperSaver'; 
                inputoptchoice1.classList.add('bold'); 
            }
            if (e.target.name === 'entryPac2') { 
                this.valuePackage2 = true; this.numpackage = 2; 
                this.labelpackage = 'SuperFlex'; 
                inputoptchoice2.classList.add('bold'); 
            }
        }
        this.activatebtnparentnext();
    }

    initPackage(){
        this.valuePackage1 = false;
        this.valuePackage2 = false;
        this.numpackage = 0; 
        this.labelpackage = '';     
    }

    @api getPackage() {
        let pac = [ this.numpackage, this.labelpackage, this.valuePackage1, this.valuePackage2 ];
        return pac; 
    }

    activatebtnparentnext() {
        let ev = new CustomEvent('parentnext', { detail : { toactivate: (this.valuePackage1 || this.valuePackage2) } } );
        this.dispatchEvent(ev);    
    }
}