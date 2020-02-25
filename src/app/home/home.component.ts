import { Component, OnInit,OnDestroy  } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  products = [];
  constructor(private apiService: ApiService, private router:Router) { }

  public comprar(product){
    //Prepara la URL
    let route = this.router.config.find(r => r.path === "producto/:id");
    route.data =  product;
    //Redirección a
    this.router.navigate(['producto/' + product.id]);
    //Para el debug
    //console.log(product);
  }
  //Botón de primera página
  public firstPage() {
    this.products = [];
    this.apiService.sendGetRequestToUrl(this.apiService.first).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
      //Para el debug
      //console.log(res);
      this.products = res.body;
    })
  }

  //Botón de página anterior
  public previousPage() {
    if (this.apiService.prev !== undefined && this.apiService.prev !== '') {
      this.products = [];
      this.apiService.sendGetRequestToUrl(this.apiService.prev).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
        //Para el debug
        //console.log(res);
        this.products = res.body;
      })
    }

  }

  //Botón para siguiente página
  public nextPage() {
    if (this.apiService.next !== undefined && this.apiService.next !== '') {
      this.products = [];
      this.apiService.sendGetRequestToUrl(this.apiService.next).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
        //Para el debug
        //console.log(res);
        this.products = res.body;
      })
    }
  }

  //Botón última página
  public lastPage() {
    this.products = [];
    this.apiService.sendGetRequestToUrl(this.apiService.last).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
      //Para el debug
      //console.log(res);
      this.products = res.body;
    })
  }
  

  ngOnInit() {
    this.apiService.get().subscribe((data: any[])=>{   
			this.products = data;  
    });
    this.apiService.sendGetRequest().pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>)=>{  
      //Para el debug
      //console.log(res);  
      this.products = res.body;  
    });
  }

}
