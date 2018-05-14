import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarProveedorPage } from './editar-proveedor';

@NgModule({
  declarations: [
    EditarProveedorPage,
  ],
  imports: [
    IonicPageModule.forChild(EditarProveedorPage),
  ],
})
export class EditarProveedorPageModule {}
