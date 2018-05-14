import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';

@IonicPage()
@Component({
  selector: 'page-listado-proveedores',
  templateUrl: 'listado-proveedores.html',
})
export class ListadoProveedoresPage {

  proveedores:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http: HttpClient,
              public modal: ModalController) {
  }

  ionViewDidLoad() {
    this.cargarProveedores();
  }

  cargarProveedores(){
    this.http.get('http://localhost:3000/proveedor') //Con esto pasamos el backend de cliente
                .map((resp:any)=>{
                  return resp
                })
                .subscribe((resp:any)=>{
                  this.proveedores = resp.proveedores // Como en el backend clientes:clientes
                },(error)=>{
                  console.log(error)
                })
  }
  
  crearProveedor(){ // Para crear una ventana modal
    let modal = this.modal.create('CrearProveedorPage')
    // modal.onDidDismiss(proveedor=>{ // Cuando el usuario cierre esa ventana, recibe un proveedor
    //   if(proveedor){// Cuando se ejecute ese método, hubiera proveedor... 
    //     this.proveedores.push(proveedor); // ...se lo añades a la vista proveedores
    //   }
    // })
    modal.onDidDismiss(()=>{
      this.cargarProveedores();
    })

    modal.present();
  }

  verProveedor(proveedor){ // Desde la página de listado proveedores, vamos a la página de ver-proveedor
    this.navCtrl.push('VerProveedorPage',{proveedor: proveedor}) // Entre {} le pasamos la información que queramos
  }
    
}
