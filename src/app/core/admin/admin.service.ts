import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl = 'https://api.khorram-madar.com/admin/';

  constructor(private http: HttpClient) { }

  sendSms(data: any): any {
    const headers = {
      'X-API-KEY': 'OEib74WVGhsSmthSz121cpOPdvMCnbfabHKdGRUh6ACQwY9II4kTBksqVIPlneEz',
      'Content-Type': 'application/json',
      'ACCEPT': 'text/plain'
    };
    return this.http.post('https://api.sms.ir/v1/send/verify', data, { 'headers': headers });
  }
  uploadFile(data: any): any {
    return this.http.post(this.baseUrl + 'upload', data);
  }
  multiUpload(data: any): any {
    return this.http.post(this.baseUrl + 'multiUpload', data);
  }


  login(data: any): any {
    return this.http.post(this.baseUrl + 'loginAdmin', data);
  }

  getAllUsers(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAllUser', { params });
  }
  getAllOrder(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAllOrder', { params });
  }

  registerFaq(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'registerFaq', data, { params });
  }

  updateFaq(token: string, id: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'updateFaq/' + id, data, { params });
  }
  deleteFaq(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.delete(this.baseUrl + 'deleteFaq/' + id, { params });
  }
  getAllFaq(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAllFaq', { params });
  }
  getAllContactUs(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAllContactUs', { params });
  }
  deleteContactUs(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.delete(this.baseUrl + 'deleteContactUs/' + id, { params });
  }
  registerUser(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'registerUser', data, { params });
  }
  registerOrder(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'registerOrder', data, { params });
  }

  registerGallery(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'registerGallery', data, { params });
  }
  deleteGallery(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.delete(this.baseUrl + 'deleteGallery/' + id, { params });
  }
  getAllGallery(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAllGallery', { params });
  }


  updateUser(token: string, id: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'updateUser/' + id, data, { params });
  }
  updateOrder(token: string, id: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'updateOrder/' + id, data, { params });
  }

  deleteUser(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.delete(this.baseUrl + 'deleteUser/' + id, { params });
  }
  deleteOrder(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.delete(this.baseUrl + 'deleteOrder/' + id, { params });
  }

  deleteFile(data: any): any {
    return this.http.post(this.baseUrl + 'deleteFile', data);
  }


  //#region Admins
  getAllAdmins(token: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'getAllAdmin', { params });
  }
  addAdmin(token: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.post(this.baseUrl + 'registerAdmin', data, { params });
  }
  updateAdmin(token: string, id: string, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'updateAdmin/' + id, data, { params });
  }
  deleteAdmin(token: string, id: string): any {
    const params = new HttpParams().set('token', token);
    return this.http.delete(this.baseUrl + 'deleteAdmin/' + id, { params });
  }
  changePassword(token: string, id: any, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'changePassword/' + id, data, { params });
  }
  changeUsername(token: string, id: any, data: any): any {
    const params = new HttpParams().set('token', token);
    return this.http.put(this.baseUrl + 'changeUsername/' + id, data, { params });
  }

  //#endregion



}
