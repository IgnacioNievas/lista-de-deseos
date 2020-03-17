import { ListaItems } from './lista-item.model';
export class Lista{
    title:string;
    id:number;
    creadaen:Date;
    terminadaen:Date;
    terminada:boolean;
    items:ListaItems[];
   

    constructor(title:string) {
       
        this.title=title;
        this.creadaen= new Date();
        this.items =[];
        this.id=new Date().getTime();
        this.terminada= false;
        
    
}}