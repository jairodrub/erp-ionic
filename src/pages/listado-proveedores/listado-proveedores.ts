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
  desde:number = 0;
  totales:number;
  botones:number[] = [];
  numeroBotones:number
  tramoBotones:number = 0; // Nace como 0

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http: HttpClient,
              public modal: ModalController) {
  }

  ionViewDidLoad() {
    this.cargarProveedores();
  }

  cargarProveedores(){
    this.http.get('http://localhost:3000/proveedor?desde=' + this.desde) //Con esto pasamos el backend de cliente
                .map((resp:any)=>{
                  return resp
                })
                .subscribe((resp:any)=>{
                  this.proveedores = resp.proveedores; // Como en el backend clientes:clientes
                  this.totales = resp.totales;
                  this.numeroBotones = this.totales / 5;
                  this.botones = [];
                  var i;
                  for(i=this.tramoBotones; i< this.tramoBotones + 5; i++){
                    this.botones.push(i+1);
                  }
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

  editarProveedor(proveedor){ // Para poder editarlo, primero tenemos que ir desde aquí
    this.navCtrl.push('EditarProveedorPage',{proveedor: proveedor}) // Entre {} le pasamos la información que queramos
  }

  eliminarProveedor(id){
    this.http.delete('http://localhost:3000/proveedor/'+ id)
                .subscribe((resp:any)=>{
                  this.cargarProveedores(); // Para cuando tengamos éxito
                },(error)=>{
                  console.log(error)
                })
  }

  setDesde(valor) {
    var desde = this.desde + valor;
    if (desde >= this.totales) {
      return; // Con return, lo que está escrito debajo, no hace nada
    } else if (desde < 0) {
      return;
    } else {
      this.desde += valor;
      this.cargarProveedores();
    }

  }

  updateDesde(valor){
    this.desde = valor;
    this.cargarProveedores();
  }

  avanzarBotones(){
    if (this.desde % 25 === 0){
      this.botones = []; // Nace vacío
      this.tramoBotones += 5;
      var i;
      for(i=this.tramoBotones; i< this.tramoBotones + 5; i++){
        this.botones.push(i+1)
      }
    }
  }

  retrocederBotones(){
    if ((this.desde + 5) % 25 === 0){
      this.botones = []; // Nace vacío
      this.tramoBotones -= 5;
      var i;
      for(i=this.tramoBotones; i< this.tramoBotones + 5; i++){
        this.botones.push(i+1)
      }
    }
  }

  avanzarTramoBotones(){
      this.tramoBotones += 5;
      this.desde = this.tramoBotones * 5;
      this.cargarProveedores();
  }

  retrocederTramoBotones(){
    this.tramoBotones -= 5;
    this.desde = this.tramoBotones * 5;
    this.cargarProveedores();
  }
    
}
