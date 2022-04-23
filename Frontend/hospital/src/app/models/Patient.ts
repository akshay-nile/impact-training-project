import { Allergy } from "./Allergy";
import { Demographic } from "./Demographic";
import { Nominee } from "./Nominee";

export class Patient{
    title:string;
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    phone:string;
    patientId:number;
    status:string;
    birthdate:Date;
    demographics:Demographic;
    nominee:Nominee;
    allergy: Allergy;
}