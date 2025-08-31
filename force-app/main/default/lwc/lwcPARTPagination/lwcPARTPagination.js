import { LightningElement, api } from 'lwc';

export default class LwcPARTPagination extends LightningElement {
    lstpage = [];
    currentPage = 1
    totalRecords
    visiblepagination = true;
    @api recordSize = 6
    totalPage = 0

    get records(){
        return this.visibleRecords
    }
    
    @api 
    set records(data){
        if(data){ 
            this.totalRecords = data
            this.recordSize = Number(this.recordSize)
            this.totalPage = Math.ceil(data.length/this.recordSize)
            for (let i = 1; i <= Math.ceil(data.length/this.recordSize); i++) { this.lstpage.push(i); }
            if (Math.ceil(data.length/this.recordSize) == 1) { this.visiblepagination = false; }
            this.updateRecords()
        }
    }

    get disablePrevious(){ 
        return this.currentPage<=1
    }
    get disableNext(){ 
        return this.currentPage>=this.totalPage
    }
    previousHandler(){ 
        if(this.currentPage>1){
            this.currentPage = this.currentPage-1
            this.updateRecords()
        }
    }
    nextHandler(){
        if(this.currentPage < this.totalPage){
            this.currentPage = this.currentPage + 1;
            this.updateRecords()
        }
    }
    firstHandler(){
        this.currentPage = 1;
        this.updateRecords();
    }
    lastHandler(){
        this.currentPage = this.totalPage;
        this.updateRecords();
    }
    gotopage(e) {
        let pg = e.currentTarget.dataset.id;
        this.currentPage = pg;
        console.log(e);
        console.log(e.detail);
        this.updateRecords();
    }
    updateRecords(){ 
        const start = (this.currentPage-1)*this.recordSize
        const end = this.recordSize*this.currentPage
        this.visibleRecords = this.totalRecords.slice(start, end)
        this.dispatchEvent(new CustomEvent('update',{ 
            detail:{ 
                records:this.visibleRecords
            }
        }))
    }
}