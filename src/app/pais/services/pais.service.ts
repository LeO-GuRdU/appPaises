import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/pais.interface';
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl:string = 'https://restcountries.com/v3.1/';

  get httpParams(){
    return new HttpParams().set('fields', 'name,capital,cca2,flags,population');
  }

  constructor(private http : HttpClient) { }

  buscarPais(termino:string): Observable<Country[]>{

    const url = `${this.apiUrl}/name/${termino}`;
    return this.http.get<Country[]>(url, { params: this.httpParams });
  }

  buscarCapital(termino:string): Observable<Country[]>{

    const url = `${this.apiUrl}/capital/${termino}`;
    return this.http.get<Country[]>(url, { params: this.httpParams });
  }

  getPaisPorAlpha(id : string): Observable<Country>{

    const url = `${this.apiUrl}/alpha/${id}`
    return this.http.get<Country>(url);
  }

  getPaisPorRegion(termino : string): Observable<Country[]>{

    const url = `${this.apiUrl}/region/${termino}`
    return this.http.get<Country[]>(url, { params: this.httpParams });
  }

  getPaisPorSubRegion(termino : string): Observable<Country[]>{

    const url = `${this.apiUrl}/subregion/${termino}`
    return this.http.get<Country[]>(url, { params: this.httpParams }).pipe(
      tap(console.log)
    );
  }
}
