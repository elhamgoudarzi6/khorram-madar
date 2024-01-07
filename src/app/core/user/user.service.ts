import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  baseUrl = 'https://api.khorram-madar.com/user/';
  
  sendSms(data: any): any {
    const headers = {
      'X-API-KEY': 'OEib74WVGhsSmthSz121cpOPdvMCnbfabHKdGRUh6ACQwY9II4kTBksqVIPlneEz',
      'Content-Type': 'application/json',
      'ACCEPT': 'text/plain'
    };
    return this.http.post('https://api.sms.ir/v1/send/verify', data, { 'headers': headers });
  }
  updateUser(token: string, id: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'updateUser/' + id, data, { params });
  }
  multiUpload(data: any): any {
    return this.http.post(this.baseUrl + 'multiUpload', data);
  }

  getAllOrderByUser(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAllOrderByUser/' + id, { params });
  }

  getUser(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getUser/' + id, { params });
  }

  uploadFile(data: any): any {
    return this.http.post(this.baseUrl + 'upload', data);
  }

  registerOrder(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'registerOrder', data, { params });
  }
  updateOrder(token: string, id: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'updateOrder/' + id, data, { params });
  }
}

