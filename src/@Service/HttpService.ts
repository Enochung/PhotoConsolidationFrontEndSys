import { Injectable } from "@angular/core";
import { IHttpService } from "./IHttpService";
import { lastValueFrom } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService implements IHttpService {
  constructor(private httpClient: HttpClient) { }

  private baseUrl: string = 
  'https://rep.cgsh.tc.edu.tw/flaskapi/api/';
  //'http://127.0.0.1:5000/';

  async getRequest<T>(urlstr: string): Promise<T> {
    const observable = this.httpClient.get<T>(this.baseUrl + urlstr);
    return await lastValueFrom(observable);
  }
  
  async postRequest<T>(data: any, urlstr: string): Promise<T> {
    const observable = this.httpClient.post<T>(this.baseUrl + urlstr, data);
    return await lastValueFrom(observable);
  }

  async postRequestForBlob(data: any, urlstr: string): Promise<Blob> {
    const observable = this.httpClient.post(this.baseUrl + urlstr, data, { responseType: 'blob' });
    return await lastValueFrom(observable);
  }

  async putRequest<T>(data: any, urlstr: string): Promise<T> {
    const observable = this.httpClient.put<T>(this.baseUrl + urlstr, data);
    return await lastValueFrom(observable);
  }

  async delRequest<T>(data: any, urlstr: string): Promise<T> {
    const observable = this.httpClient.post<T>(this.baseUrl + urlstr, data);
    return await lastValueFrom(observable);
  }
}
