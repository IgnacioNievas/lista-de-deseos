import { Component, Input, ViewChild} from '@angular/core';
import { ServeService } from '../../servi/serve.service';
import { Router } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent  {
@Input () terminados :boolean ;

 @ViewChild (IonList, {static:false}) listas:IonList;
  constructor(public deseoServi:ServeService , private rou:Router,private alertCtrl:AlertController ) { }
  
  borrarlista(lista:Lista){
    this.deseoServi.borrarlista(lista);
  }

  listSeleccion(lista:Lista){

    if( this.terminados ){
    this.rou.navigateByUrl(`tabs/tab2/agregar/${lista.id}`)}
    else {
      this.rou.navigateByUrl(`tabs/tab1/agregar/${lista.id}`)}
  }
  
 async  editarList(lista:Lista){
    const alert = await this.alertCtrl.create({
      header: 'Editar lista',

      // el inputs  me deja escribir como si fuera un formulario 
      inputs: [
        {
        name: 'titulo',
        type: 'text',
        value:lista.title,
        placeholder: 'Modificar Lista..'
      }],
      
    buttons:[
      { text:'Modificar',
    handler:(data)=>{
 if(data.titulo.lenght === 0){
   return;
 } 
lista.title = data.titulo;
this.deseoServi.guadarStorage();
this.listas.closeSlidingItems();

    }},
        {
          text:'Cancelar',
          role:'cancel',
          handler:()=>{
            this.listas.closeSlidingItems();
          }
        }
              ]
      });
      alert.present();
    }
  }

