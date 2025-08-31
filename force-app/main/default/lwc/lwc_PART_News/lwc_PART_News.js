import { LightningElement, track } from 'lwc';

export default class Lwc_PART_News extends LightningElement {
    @track lstvisiblenews;

    @track lstnews = [
        { id : '101', name : 'Card Title 1', date : '01.01.1970', description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },
        { id : '102', name : 'Card Title 2', date : '01.01.1970', description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },
        { id : '103', name : 'Card Title 3', date : '01.01.1970', description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },
        { id : '104', name : 'Card Title 4', date : '01.01.1970', description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },
        { id : '105', name : 'Card Title 5', date : '01.01.1970', description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },
        { id : '106', name : 'Card Title 6', date : '01.01.1970', description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },
        { id : '107', name : 'Card Title 7', date : '01.01.1970', description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },
        { id : '108', name : 'Card Title 8', date : '01.01.1970', description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },
        { id : '109', name : 'Card Title 9', date : '01.01.1970', description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },
        { id : '110', name : 'Card Title 10', date : '01.01.1970', description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },
        { id : '111', name : 'Card Title 11', date : '01.01.1970', description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },
        { id : '112', name : 'Card Title 12', date : '01.01.1970', description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },
        { id : '113', name : 'Card Title 13', date : '01.01.1970', description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },
        { id : '114', name : 'Card Title 14', date : '01.01.1970', description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },
        { id : '115', name : 'Card Title 15', date : '01.01.1970', description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },
        { id : '116', name : 'Card Title 16', date : '01.01.1970', description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },
        { id : '117', name : 'Card Title 17', date : '01.01.1970', description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },
        { id : '118', name : 'Card Title 18', date : '01.01.1970', description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },
        { id : '119', name : 'Card Title 19', date : '01.01.1970', description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },
        { id : '120', name : 'Card Title 20', date : '01.01.1970', description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' }
        
    ];
        
    updateHandler(event){
        this.lstvisiblenews=[...event.detail.records]
        //console.log(event.detail.records)
    }
}