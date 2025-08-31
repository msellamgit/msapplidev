import { LightningElement, track } from 'lwc';

export default class Lwc_PART_Locations extends LightningElement {
    @track lstvisiblelocation;
    @track entrySearch = null;

    @track lstlocation = [
        { id : '301', name : 'Location Title 1', address : '1 RUE DE LA PAIX', zip : '75000', city : 'PARIS', services : 'Services : Shop, Restaurant, Toilet ...'},
        { id : '302', name : 'Location Title 2', address : '1 RUE DE LA PAIX', zip : '75000', city : 'PARIS', services : 'Services : Shop, Restaurant, Toilet ...'},
        { id : '303', name : 'Location Title 3', address : '1 RUE DE LA PAIX', zip : '75000', city : 'PARIS', services : 'Services : Shop, Restaurant, Toilet ...'},
        { id : '304', name : 'Location Title 4', address : '1 RUE DE LA PAIX', zip : '75000', city : 'PARIS', services : 'Services : Shop, Restaurant, Toilet ...'},
        { id : '305', name : 'Location Title 5', address : '1 RUE DE LA PAIX', zip : '75000', city : 'PARIS', services : 'Services : Shop, Restaurant, Toilet ...'},
        { id : '306', name : 'Location Title 6', address : '1 RUE DE LA PAIX', zip : '75000', city : 'PARIS', services : 'Services : Shop, Restaurant, Toilet ...'},
        { id : '307', name : 'Location Title 7', address : '1 RUE DE LA PAIX', zip : '75000', city : 'PARIS', services : 'Services : Shop, Restaurant, Toilet ...'},
        { id : '308', name : 'Location Title 8', address : '1 RUE DE LA PAIX', zip : '75000', city : 'PARIS', services : 'Services : Shop, Restaurant, Toilet ...'},
        { id : '309', name : 'Location Title 9', address : '1 RUE DE LA PAIX', zip : '75000', city : 'PARIS', services : 'Services : Shop, Restaurant, Toilet ...'},
        { id : '310', name : 'Location Title 10', address : '1 RUE DE LA PAIX', zip : '75000', city : 'PARIS', services : 'Services : Shop, Restaurant, Toilet ...'},
        { id : '311', name : 'Location Title 11', address : '1 RUE DE LA PAIX', zip : '75000', city : 'PARIS', services : 'Services : Shop, Restaurant, Toilet ...'},
        { id : '312', name : 'Location Title 12', address : '1 RUE DE LA PAIX', zip : '75000', city : 'PARIS', services : 'Services : Shop, Restaurant, Toilet ...'},
        { id : '313', name : 'Location Title 13', address : '1 RUE DE LA PAIX', zip : '75000', city : 'PARIS', services : 'Services : Shop, Restaurant, Toilet ...'},
        { id : '314', name : 'Location Title 14', address : '1 RUE DE LA PAIX', zip : '75000', city : 'PARIS', services : 'Services : Shop, Restaurant, Toilet ...'},
        { id : '315', name : 'Location Title 15', address : '1 RUE DE LA PAIX', zip : '75000', city : 'PARIS', services : 'Services : Shop, Restaurant, Toilet ...'},
        { id : '316', name : 'Location Title 16', address : '1 RUE DE LA PAIX', zip : '75000', city : 'PARIS', services : 'Services : Shop, Restaurant, Toilet ...'},
        { id : '317', name : 'Location Title 17', address : '1 RUE DE LA PAIX', zip : '75000', city : 'PARIS', services : 'Services : Shop, Restaurant, Toilet ...'},
        { id : '318', name : 'Location Title 18', address : '1 RUE DE LA PAIX', zip : '75000', city : 'PARIS', services : 'Services : Shop, Restaurant, Toilet ...'},
        { id : '319', name : 'Location Title 19', address : '1 RUE DE LA PAIX', zip : '75000', city : 'PARIS', services : 'Services : Shop, Restaurant, Toilet ...'},
        { id : '320', name : 'Location Title 20', address : '1 RUE DE LA PAIX', zip : '75000', city : 'PARIS', services : 'Services : Shop, Restaurant, Toilet ...'}

    ];
        
    updateHandler(event){
        this.lstvisiblelocation=[...event.detail.records]
        //console.log(event.detail.records)
    }
    handleentrySearch(e) {
        console.log(e);
    }   

    addlocation() {
        console.log('on click Add New');
    }

    showlist() {
        console.log('on click Show List');
    }

    showgrid() {
        console.log('on click Show Grid');
    }

}