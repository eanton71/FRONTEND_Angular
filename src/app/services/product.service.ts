import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Product } from '../products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = 'http://localhost:8000/api/get_products';
  private urlpost = 'http://localhost:8000/api/add_product';
  private urldelete = 'http://localhost:8000/api/delete_product';
  private urlput = 'http://localhost:8000/api/put_product';
  constructor(private httpClient:HttpClient) { }

  getProducts():Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.url).pipe(catchError(this.handleError<any>('getProducts')));
  }

  addNewProduct(name:string,price:number,description:string):Observable<object>{

    const data = { name: name, price: price, description: description };
    console.log(data);
    //CORRECCION {data} en windows,    {info:data} en MAC
    return this.httpClient.post(this.urlpost,{info:data},{observe:'body'}).pipe(catchError(this.handleError<any>('addNewProduct')));
  }

  deleteProduct(id:string):Observable<object>{
    console.log("src/app/services/product.service.ts, deleteProduct(id: string, name: string, price: number, description: string) ",id);
    console.log("HTTP DELETE: ", this.httpClient.delete(this.urldelete + '/' + id, { observe: 'body' }).pipe(catchError(this.handleError<any>('deleteProduct'))));
    return this.httpClient.delete(this.urldelete+'/'+id,{observe:'body'}).pipe(catchError(this.handleError<any>('deleteProduct')))
  }
  updateProduct(id: string, name: string, price: number, description: string): Observable<object> {
    const data = { name: name, price: price, description: description };
    console.log("src/app/services/product.service.ts, updateProduct(id: string, name: string, price: number, description: string)", data);
    console.log("HTTP PUT: ",this.httpClient.put(this.urlput + '/' + id, { observe: 'body' }).pipe(catchError(this.handleError<any>('updateProduct'))));
    return this.httpClient.put(this.urlput + '/' + id, { observe: 'body' }).pipe(catchError(this.handleError<any>('updateProduct')))
  }
  private handleError<T>(operation = 'opearation',result?:T){
    return (error:any):Observable<T>=>{
      // TODO: send the error to remote logging infrastructure
      console.error(error);// log to console instead
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    }
  }
}
