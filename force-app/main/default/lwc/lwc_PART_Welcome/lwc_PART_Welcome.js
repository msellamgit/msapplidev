import { LightningElement, track } from 'lwc';
import respart from '@salesforce/resourceUrl/res_part';

export default class Lwc_PART_Welcome extends LightningElement {
    imglocations = respart + '/locations.png';    
    imgnews = respart + '/news.png';    
    imgdocuments = respart + '/documents.png';
    
    @track lstnews = [
        { id : '101', name : 'Card Title 1', date : '01.01.1970', description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },
        { id : '102', name : 'Card Title 2', date : '01.01.1970', description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },
        { id : '103', name : 'Card Title 3', date : '01.01.1970', description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' }
    ];
    @track lstmktacts = [
        { id : '201', name : 'Activity Title 1', date : '01.01.1970', description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },
        { id : '202', name : 'Activity Title 2', date : '01.01.1970', description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },
        { id : '203', name : 'Activity Title 3', date : '01.01.1970', description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' }
    ];
    @track lstlocations = [
        { id : '301', name : 'Location Title 1', address : '11 ALLEE BUFFON', zip : '94700', city : 'MAISONS-ALFORT', services : 'Services : Shop, Restaurant, Toilet ...'},
        { id : '302', name : 'Location Title 2', address : '3 RUE DE LA PAIX', zip : '75001', city : 'PARIS', services : 'Services : Shop, Restaurant, Toilet ...'},
        { id : '303', name : 'Location Title 3', address : '145 boulevard clemenceau', zip : '38000', city : 'GRENOBLE', services : 'Services : Shop, Restaurant, Toilet ...'}
    ];
    
}