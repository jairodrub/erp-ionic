import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListadoProveedoresPage } from './listado-proveedores';

@NgModule({
  declarations: [
    ListadoProveedoresPage,
  ],
  imports: [
    IonicPageModule.forChild(ListadoProveedoresPage),
  ],
})
export class ListadoProveedoresPageModule {}
