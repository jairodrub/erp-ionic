import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-crear-proveedor',
  templateUrl: 'crear-proveedor.html',
})
export class CrearProveedorPage {

  provincias:string[] = [ // Lo cogemos del otro erp
    'Alava','Albacete','Alicante','Almería','Asturias','Avila','Badajoz','Barcelona','Burgos','Cáceres',
    'Cádiz','Cantabria','Castellón','Ceuta','Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Gibraltar español','Granada','Guadalajara',
    'Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Melilla','Murcia','Navarra',
    'Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona',
    'Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza'
  ]

  proveedor:any = {
    nombre: null,
    cif: null,
    domicilio: null,
    cp: null,
    localidad: null,
    provincia: null,
    telefono: null,
    email: null,
    contacto: null
  }

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http: HttpClient,
              public viewController: ViewController) {
  }

  ionViewDidLoad() {

  }

  crearProveedor(){
    let proveedor = {
      nombre: this.proveedor.nombre,
      cif: this.proveedor.cif,
      domicilio: this.proveedor.domicilio,
      cp: this.proveedor.cp,
      localidad: this.proveedor.localidad,
      provincia: this.proveedor.provincia,
      telefono: this.proveedor.telefono,
      email: this.proveedor.email,
      contacto: this.proveedor.contacto, 
    }
    
    this.http.post('http://localhost:3000/proveedor', proveedor)
             .subscribe(()=>{
              // this.viewController.dismiss(proveedor) // Destruye la página
              this.viewController.dismiss(); // No necesitamos parámetro porque carga directamente
             },(error)=>{
               console.log(error)
             })

  }

  cancelar(){
    this.viewController.dismiss(); // Para que pase de una página a otra y se cancele bien
  }

}
