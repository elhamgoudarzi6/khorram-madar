import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LayoutService {

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

  authUser(data: any): any {
    return this.http.post(this.baseUrl + 'authUser', data);
  }

  uploadFile(data: any): any {
    return this.http.post(this.baseUrl + 'upload', data);
  }

  multiUpload(data: any): any {
    return this.http.post(this.baseUrl + 'multiUpload', data);
  }

  updateUser(token: string, id: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'updateUser/' + id, data, { params });
  }

  getUser(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getUser/' + id, { params });
  }
  getAllFaq(): any {
    return this.http.get(this.baseUrl + 'getAllFaq');
  }
  getAllGallery(): any {
    return this.http.get(this.baseUrl + 'getAllGallery');
  }
  registerOrder(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'registerOrder', data, { params });
  }

  registerContactUs(data: any): any {
    return this.http.post(this.baseUrl + 'registerContactUs', data);
  }

    registerRating(data: any): any {
    //const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'registerRating', data);
  }
  getRating(): any {
    return this.http.get(this.baseUrl + 'getRating');
  }
  getRatingByCode(id: string): any {
    return this.http.get(this.baseUrl + 'getRating/' + id);
  }
}
