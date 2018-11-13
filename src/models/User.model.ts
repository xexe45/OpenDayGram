export class User {
    constructor(public key:string, 
                public name: string, 
                public picture: string,
                public isAdmin: boolean,
                public isStudent: boolean,
                public email: string,
                public password: string){

    }
}