export class ListaItems{
    descripcion:string;
    completado:boolean;
    constructor(descr:string){
        this.completado=false;
        this.descripcion=descr;
    }
}