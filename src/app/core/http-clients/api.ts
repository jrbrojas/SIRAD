import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class Api {

  private readonly urlBase: string;

  constructor(private httpClient: HttpClient) {
    //this.urlBase = environment.urlApi;
    this.urlBase = environment.urlApiV1ListEmergencies;
  }

  public get(context: string, params: any | {}) {
    let httpParams = new HttpParams();
    Object.keys(params).forEach((key) => {
      httpParams = httpParams.append(key, params[key] instanceof Array ? params[key].join() : params[key]); params[key]
    });
    const options = { params: httpParams };
    return this.httpClient.get<any>(`${this.urlBase}${context}`, options);
  }

  public post(context: string, body: any | {}): Observable<any> {
    return this.httpClient.post<any>(`${this.urlBase}${context}`, body);
  }

  public put(context: string, body: any | {}): Observable<any> {
    return this.httpClient.put<any>(`${this.urlBase}${context}`, body);
  }

  public delete(context: string, id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.urlBase}${context}/${id}`);
  }
}
