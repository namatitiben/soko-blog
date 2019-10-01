import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {}

  /**
   * Make Http request
   * @param method
   * @param endPoint
   */
  public makeRequest(method: string, endPoint: string, body?: any) {
    return this.http.request(method, `${environment.baseUrl}${endPoint}`, {
      body: body
    });
  }
}
