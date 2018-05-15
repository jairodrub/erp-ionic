import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-editar-proveedor',
  templateUrl: 'editar-proveedor.html',
})
export class EditarProveedorPage {

  proveedor:any;

  provincias:string[] = [ // Lo cogemos del otro erp
    'Alava','Albacete','Alicante','Almería','Asturias','Avila','Badajoz','Barcelona','Burgos','Cáceres',
    'Cádiz','Cantabria','Castellón','Ceuta','Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Gibraltar español','Granada','Guadalajara',
    'Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Melilla','Murcia','Navarra',
    'Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona',
    'Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza'
  ]

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http: HttpClient,
              public viewController: ViewController) {
                this.proveedor = navParams.get('proveedor')
  }

  modificarProveedor(){

    let proveedor = {
      id: this.proveedor._id, // Tiene que ser _id porque si no no lo pilla
      nombre: this.proveedor.nombre,
      cif: this.proveedor.cif,
      domicilio: this.proveedor.domicilio,
      cp: this.proveedor.cp,
      localidad: this.proveedor.localidad,
      provincia: this.proveedor.provincia,
      email: this.proveedor.email,
      telefono: this.proveedor.telefono,
      contacto: this.proveedor.contacto,
      
    }

    this.http.put('http://localhost:3000/proveedor/'+ proveedor.id, proveedor)
    // Protesta porque tenemos que enviarle la url y luego proveedor
                  .subscribe((resp:any)=>{
                    this.viewController.dismiss();
                  },(error)=>{
                    console.log(error);
                  })

  }

  cancelar(){
    this.viewController.dismiss();
  }

}
