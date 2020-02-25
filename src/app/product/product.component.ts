import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Producto } from './product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'producto',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public producto : Producto;
  public productos: Array<Producto> = [];
  //Creo errorMessage para tratar el tema del cargado, etiqueta <mat-spinner>
  public errorMessage: any;
  
  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    //res es el producto que se ha clicado lo mete en producto, definido arriba como public producto:Producto;
    //Si no se le pasa el producto por http, sease entra por url directamente sin clicar en el botón de comprar producto de inicio, se crea el producto y se muestra
    if(!this.route.snapshot.data.id){
      //console.log('entra por URL');
      this.apiService.obtener('/'+this.route.snapshot.url[1].path).subscribe(data=>{this.producto = new Producto(data.id,data.name,data.description,data.price,data.imageUrl,data.quantity); this.productos.push(this.producto);},
        error=>{
          this.errorMessage = error;
          console.log(this.errorMessage);
        });
      //Para el debug  
      //console.log('ID: '+this.route.snapshot.url[1].path);
    }else{//En cambio si entra por http se crea el objeto producto para mostrarlo
      this.route.data.subscribe((res) => {this.producto = new Producto(res.id,res.name,res.description,res.price,res.imageUrl,res.quantity); this.productos.push(this.producto);},error => {console.log('ERROR', error);});
    }
  }
}
