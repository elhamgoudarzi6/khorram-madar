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

  upload(data: any): any {
    return this.http.post(this.baseUrl + 'upload', data);
  }

  multiUpload(data: any): any {
    return this.http.post(this.baseUrl + 'multiUpload', data);
  }

  editUser(token: string, id: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'editUser/' + id, data, { params });
  }
  getFaqs(): any {
    return this.http.get(this.baseUrl + 'getFaqs');
  }
  getGallery(): any {
    return this.http.get(this.baseUrl + 'getGallery');
  }
  getPlans(): any {
    return this.http.get(this.baseUrl + 'getPlans');
  }
  addReserve(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'addReserve', data, { params });
  }
  addContactMessage(data: any): any {
    return this.http.post(this.baseUrl + 'addContactMessage', data);
  }

  addOrder(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'addOrder', data, { params });
  }

  addRating(data: any): any {
    //const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'addRating', data);
  }
  getRating(): any {
    return this.http.get(this.baseUrl + 'getRating');
  }
  getRatingByCode(id: string): any {
    return this.http.get(this.baseUrl + 'getRatingByCode/' + id);
  }
}


