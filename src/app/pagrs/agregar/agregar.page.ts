import { Component,  ViewChild } from '@angular/core';
import { ServeService } from '../../servi/serve.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { ListaItems } from '../../models/lista-item.model';
import { AlertController, IonList } from '@ionic/angular';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage  {
lista: Lista;
nombreItem ='';
@ViewChild('listas' ,{static:false}) lita:IonList;

  constructor(private servi:ServeService, private route:ActivatedRoute , private alertCtrl:AlertController ) {
    const listId = this.route.snapshot.paramMap.get('ListId');
this.lista= this.servi.obtenerLista(listId);
   }

  
agregarItem(){
  if(this.nombreItem.length === 0){
    return;
  }
  const nuevoItem = new ListaItems(this.nombreItem);
  this.lista.items.unshift(nuevoItem);
  this.nombreItem='';
  this.servi.guadarStorage();

}
cambiarCheck(){
  // se uso ! para que me devuelva un array con todos los items pendientes , seria los que estan en falso
  // que metome como pendientes los que estan en verdadero ,pero cuando cambia a check a verdadero como el filter 
  //no  cumple con esta funcion por eso va a 0 sino toma los cumple con esa funcion
  
  const pendientes = this.lista.items.filter(dataFilter=> !dataFilter.completado ).length;
  if(pendientes === 0){
    this.lista.terminadaen= new Date();
    this.lista.terminada = true;
  }else{
    this.lista.terminadaen= null;
    this.lista.terminada = false;
  }
  this.servi.guadarStorage();
 
}
borrar(i:number){
  this.lista.items.splice(i,1);
  this.servi.guadarStorage();
}
async cambiar(lista:Lista , i:number){
  const items = lista.items.map(m=> m.descripcion );
  const alert = await this.alertCtrl.create({
    
    header: 'Editar item',
    inputs: [
      {
      name: 'titulo',
      type: 'text',
      value:items[i],
      placeholder: 'Editar items..',
    } ],
  
  buttons:[
    { text:'Editar',
  handler:(data)=>{
    if(data.titulo.length === 0){
      return;
    }
const newItem = new ListaItems( data.titulo);
this.lista.items.splice(i,1,newItem);
this.servi.guadarStorage();


  }},
      {
        text:'Cancelar',
        role:'cancel',
        handler:()=>{
          this.lita.closeSlidingItems();
        }
      }
            ]
    });
    alert.present();
  }



}
