import { LightningElement, api, track } from 'lwc';

export default class LwcPARTCardLocation extends LightningElement {
    @api location;
    @track mapMarkers;
    @track mapOptions;

    connectedCallback() {
        this.mapMarkers = [
            {
                location: {
                    City: this.location.city,
                    Country: 'FRANCE',
                    PostalCode: this.location.zip,
                    State: '',
                    Street: this.location.address
                },
                value: 'location001',
                title: this.location.name,
                description: this.location.address + ' ' + this.location.city,
                icon: this.imgmktact//,'standard:account'
            },
        ];
        this.mapOptions = {
            draggable: false,
            disableDefaultUI: true,
        };
    }

}