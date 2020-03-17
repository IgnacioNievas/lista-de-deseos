import { Pipe, PipeTransform } from '@angular/core';
import{Lista} from '../models/lista.model'

@Pipe({
  name: 'filtro',
  pure:false,
})
export class FiltroPipe implements PipeTransform {

  transform(listas: Lista[], completa:boolean=true , ):Lista[] {

    return listas.filter(data => data.terminada === completa );
  }

}

