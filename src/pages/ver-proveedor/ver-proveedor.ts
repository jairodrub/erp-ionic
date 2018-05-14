import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-ver-proveedor',
  templateUrl: 'ver-proveedor.html',
})
export class VerProveedorPage {

  proveedor:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {
                this.proveedor = navParams.get('proveedor');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerProveedorPage');
  }

}
