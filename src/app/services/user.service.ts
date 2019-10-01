import { Injectable } from '@angular/core';

import { HttpService } from './http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpService: HttpService) {}

  /**
   * Get user api integration function
   */
  public getUsers(): Observable<any> {
    return this.httpService.makeRequest('GET', '/users');
  }
}
