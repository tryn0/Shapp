import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';

/*Aquí se crea el servicio de paginación*/
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //URL de la base de datos, en mi caso un json
  public SERVER_URL = "https://my-json-server.typicode.com/tryn0/Shapp/products";

  constructor(private httpClient: HttpClient) { }

  public get(){  
    //Limitación de 5 objetos al entrar en la app
		return this.httpClient.get(this.SERVER_URL, {params: new HttpParams({fromString: "_page=1&_limit=5"})});  
  } 
  public first: string = "";  
  public prev: string = "";  
  public next: string = "";  
  public last: string = "";

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error desconocido';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = "Error: ${error.error.name}";
    } else {
      // Server-side errors
      errorMessage = 'Código del error: ${error.status}\nMensaje: ${error.message}';
    }
    window.alert(errorMessage);
    console.log(error);
    return throwError(errorMessage);
  }

  obtener(url:string): Observable<any>{
    return this.httpClient.get(this.SERVER_URL+url);
  }

  parseLinkHeader(header) {
    if (header.length == 0) {
      return ;
    }

    let parts = header.split(',');
    var links = {};
    parts.forEach( p => {
      let section = p.split(';');
      var url = section[0].replace(/<(.*)>/, '$1').trim();
      var name = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name] = url;

    });

    this.first  = links["first"];
    this.last   = links["last"];
    this.prev   = links["prev"];
    this.next   = links["next"]; 
  }

  public sendGetRequest(){
    // Limitación de 5 objetos, pero al pulsar en los botones
    return this.httpClient.get(this.SERVER_URL, {  params: new HttpParams({fromString: "_page=1&_limit=5"}), observe: "response"}).pipe(retry(3), catchError(this.handleError), tap(res => {
      this.parseLinkHeader(res.headers.get('Link'));
    }));
  }

  public sendGetRequestToUrl(url: string){  
    return this.httpClient.get(url, { observe: "response"}).pipe(retry(3), 			
    catchError(this.handleError), tap(res => {  
      //Para el debug
      //console.log(res.headers.get('Link'));  
      this.parseLinkHeader(res.headers.get('Link'));
    }));  
  }
}