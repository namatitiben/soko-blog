import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  blogs: any[] = [];
  comments: any[] = [];
  
  constructor(private httpService: HttpService) { }

  public getBlog(id:number): Observable<any> {
    return this.httpService.makeRequest('GET', `/posts/${id}`);
  }

  public getBlogs(): Observable<any> {
    return this.httpService.makeRequest('GET', '/posts');
  }

  public getBlogsByUserId(userId:number): Observable<any> {
    return this.httpService.makeRequest('GET', `/posts?userId=${userId}`);
  }

  public getBlogPhotos(id: number): Observable<any> {
    return this.httpService.makeRequest('GET', `/photos?albumId=${id}`);
  }

  public getBlogComments(id: number): Observable<any> {
    return this.httpService.makeRequest('GET', `/posts/${id}/comments`);
  }

  public postComment(data:any): Observable<any> {
    return this.httpService.makeRequest('POST', `/posts/${data.postId}/comments`, data);
  }

  public deletePost(blogId:number): Observable<any>{
    return this.httpService.makeRequest('DELETE', `/posts/${blogId}`);
  }

  public createBlog(data:any): Observable<any> {
    return this.httpService.makeRequest('POST', "/posts", data);
  }

  public updateBlog(data:any): Observable<any> {
    return this.httpService.makeRequest('PUT', `/posts/${data.id}`, data);
  }
}
