import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { leave } from './leave';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  private _leaveUrl = ""
  constructor(private _http: HttpClient) { }

  postLeave(leave:leave):Observable<leave>{
    return this._http.post<leave>(this._leaveUrl,leave);
  }
}
