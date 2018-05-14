import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';

@IonicPage()
@Component({
  selector: 'page-listado-clientes',
  templateUrl: 'listado-clientes.html',
})
export class ListadoClientesPage {

  clientes:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: HttpClient,
              public modal: ModalController) {
  }

  ionViewDidLoad() {
    this.cargarClientes();
  }

  cargarClientes(){ // Le decimos que cuando se cargue la página, que haga algo
    this.http.get('http://localhost:3000/cliente') //Con esto pasamos el backend de cliente
             .map((resp:any)=>{
               return resp
             })
             .subscribe((resp:any)=>{
              this.clientes = resp.clientes // Como en el backend clientes:clientes
             },(error)=>{
               console.log(error)
             })
    
  }

  crearCliente(){ // Para crear una ventana modal
    let modal = this.modal.create('CrearClientePage') // export class crear-cliente.ts
    // Sobre esta ventana que se creado...

    // modal.onDidDismiss(cliente=>{ // Cuando el usuario cierre esa ventana, recibe un cliente
    //   if(cliente){// Cuando se ejecute ese método, hubiera cliente... 
    //     this.clientes.push(cliente); // ...se lo añades a la vista clientes
    //   }
    // })
    modal.onDidDismiss(()=>{
      this.cargarClientes();
    })

    modal.present();
  }

  verCliente(cliente){ // Desde la página de listado clientes, vamos a la página de ver-cliente
    this.navCtrl.push('VerClientePage',{cliente: cliente}) // Entre {} le pasamos la información que queramos
  }

  editarCliente(cliente){ // Para poder editarlo, primero tenemos que ir desde aquí
    this.navCtrl.push('EditarClientePage',{cliente: cliente}) // Entre {} le pasamos la información que queramos
  }

  eliminarCliente(id){
    this.http.delete('http://localhost:3000/cliente/'+ id)
                .subscribe((resp:any)=>{
                  this.cargarClientes(); // Para cuando tengamos éxito
                },(error)=>{
                  console.log(error)
                })
  }
}