import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CrearProveedorPage } from './crear-proveedor';

@NgModule({
  declarations: [
    CrearProveedorPage,
  ],
  imports: [
    IonicPageModule.forChild(CrearProveedorPage),
  ],
})
export class CrearProveedorPageModule {}
