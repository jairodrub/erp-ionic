import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';


@IonicPage()
@Component({
  selector: 'page-listado-articulos',
  templateUrl: 'listado-articulos.html',
})
export class ListadoArticulosPage {

  articulos:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: HttpClient,
              public modal: ModalController) {
  }

  ionViewDidLoad() {
    this.cargarArticulos()
  }

  cargarArticulos(){
    this.http.get('http://localhost:3000/articulo')
        .map((resp:any)=>{
          return resp
        })
        .subscribe((resp:any)=>{
          this.articulos = resp.articulos
        },(error)=>{
          console.log(error);
        })
}

crearArticulo(){
  let modal = this.modal.create('CrearArticuloPage')
      modal.onDidDismiss(()=>{
      this.cargarArticulos();
  })

  modal.present();
  
}

verArticulo(articulo){
  this.navCtrl.push('VerArticuloPage',{articulo: articulo})
}

editarArticulo(articulo){
  this.navCtrl.push('EditarArticuloPage',{articulo: articulo})
}

eliminarArticulo(id){
  this.http.delete('http://localhost:3000/articulo/'+ id)
              .subscribe((resp:any)=>{
                this.cargarArticulos();
              },(error)=>{
                console.log(error);
              })
}

}
