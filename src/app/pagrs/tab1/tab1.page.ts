import { Component } from '@angular/core';
import { ServeService } from '../../servi/serve.service';
import { Router } from '@angular/router';

import{AlertController} from '@ionic/angular'
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public  deseoServi: ServeService , private rou:Router, 
    private alertCtrl:AlertController ) { }

     
    //async transforma mi funcion en una promesa
      async agregarList(){

    //await  dice que espere que todo esta promesa se ejecute y que la guarde en la const

    const alert = await this.alertCtrl.create({
      header: 'Agregar lista',

      // el inputs  me deja escribir como si fuera un formulario 
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nueva Lista..'
        }],
        
      buttons:[
        { text:'Crear',
      handler:(data)=>{
   if(data.titulo.length === 0){
    return;
  }
   //crea la lista 

   const ListId = this.deseoServi.crearLista(data.titulo);
   this.rou.navigateByUrl(`tabs/tab1/agregar/${ListId}`)}},
        {
          text:'Cancelar',
          role:'cancel',
        }
              ]
      });
      alert.present();
    }

   
   
  
}
