export class Period {

    public key: string;
    public name: string;
    public status:boolean;
    public date: number;

    constructor(key: string = null,name: string, status: boolean, date: number){
        this.key = key;
        this.name = name;
        this.status = status;
        this.date = date;
    }

    

}