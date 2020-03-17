import { NgModule } from '@angular/core';
import { FiltroPipe } from './pipes.pipe';



@NgModule({
  declarations: [FiltroPipe],
exports:[FiltroPipe],
})
export class PipesModule { }
