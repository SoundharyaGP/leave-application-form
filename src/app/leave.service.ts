import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { leave } from './leave';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  private _leaveUrl = "http://127.0.0.1:8088/request/SubmitLeaveRequest"
  private apiUrl="http://127.0.0.1:8088/request/generateReportTabular/"
  constructor(private _http: HttpClient) { }

  postLeave(leave:leave):Observable<leave>{
    return this._http.post<leave>(this._leaveUrl,leave);
  }

  // fetchData(selectedMonths: string[]): Observable<any> {
  //   const paramString = selectedMonths.join(',');
  //   const options = {
  //     params: new HttpParams().set('months', paramString)
  //   };
  //   return this._http.get(`${this.apiUrl}/fetch-data`, options);
  // }

  fetchData(obj:any):Observable<leave>{
    return this._http.post<leave>(this.apiUrl,obj);
  }
}


