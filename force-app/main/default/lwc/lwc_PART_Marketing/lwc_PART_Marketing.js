import { LightningElement, track } from 'lwc';

export default class Lwc_PART_Marketing extends LightningElement {
    @track lstvisiblemarketing;

    @track lstmarketing = [
        { id : '201', name : 'Activity Title 1', date : '01.01.1970', description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },
        { id : '202', name : 'Activity Title 2', date : '01.01.1970', description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },
        { id : '203', name : 'Activity Title 3', date : '01.01.1970', description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },
        { id : '204', name : 'Activity Title 4', date : '01.01.1970', description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },
        { id : '205', name : 'Activity Title 5', date : '01.01.1970', description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },
        { id : '206', name : 'Activity Title 6', date : '01.01.1970', description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },
        { id : '207', name : 'Activity Title 7', date : '01.01.1970', description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },
        { id : '208', name : 'Activity Title 8', date : '01.01.1970', description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },
        { id : '209', name : 'Activity Title 9', date : '01.01.1970', description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },
        { id : '210', name : 'Activity Title 10', date : '01.01.1970', description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },
        { id : '211', name : 'Activity Title 11', date : '01.01.1970', description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },
        { id : '212', name : 'Activity Title 12', date : '01.01.1970', description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },
        { id : '213', name : 'Activity Title 13', date : '01.01.1970', description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },
        { id : '214', name : 'Activity Title 14', date : '01.01.1970', description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },
        { id : '215', name : 'Activity Title 15', date : '01.01.1970', description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },
        { id : '216', name : 'Activity Title 16', date : '01.01.1970', description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },
        { id : '217', name : 'Activity Title 17', date : '01.01.1970', description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },
        { id : '218', name : 'Activity Title 18', date : '01.01.1970', description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },
        { id : '219', name : 'Activity Title 19', date : '01.01.1970', description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' },
        { id : '220', name : 'Activity Title 20', date : '01.01.1970', description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.' }
        
    ];
        
    updateHandler(event){
        this.lstvisiblemarketing=[...event.detail.records]
        //console.log(event.detail.records)
    }

}