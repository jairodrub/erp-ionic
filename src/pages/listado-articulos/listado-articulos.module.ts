import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListadoArticulosPage } from './listado-articulos';

@NgModule({
  declarations: [
    ListadoArticulosPage,
  ],
  imports: [
    IonicPageModule.forChild(ListadoArticulosPage),
  ],
})
export class ListadoArticulosPageModule {}
