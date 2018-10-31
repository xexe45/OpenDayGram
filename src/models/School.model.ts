export class School 
{    
    public key: string;
    public period_key: string;
    public name: string;

    constructor(key: string = null, period_key: string, name: string)
    {
        this.key = key;
        this.period_key = period_key;
        this.name = name;
    }
}