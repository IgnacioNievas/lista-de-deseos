import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class ServeService {
listas:Lista[]=[];

  constructor() {
    this.cargarStorage();
   }

   crearLista(titulo:string){
    const agregar= new Lista(titulo);
    this.listas.push( agregar);
    this.guadarStorage();
    return agregar.id;
   };

   borrarlista(lista:Lista){
this.listas = this.listas.filter(listDate => listDate.id !== lista.id);
this.guadarStorage();
   };
   
   obtenerLista(id: string | number){
     id = Number(id);
    return this.listas.find( findList => findList.id === id);
   }
   guadarStorage(){
     const m = this.listas.find(m=>m.items.length >0);
   if(m){localStorage.setItem('data',JSON.stringify(this.listas))}
else{localStorage.clear() }};
   
   cargarStorage(){
     if(localStorage.getItem('data')){
     this.listas= JSON.parse(localStorage.getItem('data'));
   }
  }

}
