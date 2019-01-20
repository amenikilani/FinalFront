import { User } from "./user";
import { Hebergement } from "./hebergement";

export class Reservation {
    id: number;
    user: number ;
    vol : number ;
    hebergement : number ;
    transport : number ;
    nbre_personne : number ; 


      
constructor(id: number , user: number , vol : number , hebergement : number , transport : number , nbre_personne : number){
    id: this.id ;
    user: this.user; 
    vol: this.vol ;
    hebergement: this.hebergement;
    transport: this.transport;
    nbre_personne: this.nbre_personne;

}
}