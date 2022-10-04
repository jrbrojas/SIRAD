import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class FileService {

    public showLoader: boolean = false;
    private readonly urlFile: string;

    constructor(private _httpClient: HttpClient){
        this.urlFile = environment.urlApiv1File;
    }

    
  createFile(data: any): Observable<any> {
    this.showLoader = true;
    return this._httpClient.post<any>(`${this.urlFile}`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    );
  }

  removeFileMany(archivos: any[]): Observable<any> {
    this.showLoader = true;
    return this._httpClient.post<any>(`${this.urlFile}/delete-many`, archivos).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    )
  }

  removeFile(archivo: string, ruta: string): Observable<any> {
    const data: any = {
      file: archivo,
      path: ruta
    }
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    this.showLoader = true;
    return this._httpClient.post<any>(`${this.urlFile}/delete`, data).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        return new Observable<any>();
      })
    )
  }
}