import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private httpService: HttpService) { }

  public getBlogs(): Observable<any> {
    return this.httpService.makeRequest('GET', '/posts');
  }
}
