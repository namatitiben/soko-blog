import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  blogs: any[] = [];
  comments: any[] = [];

  constructor(private httpService: HttpService) {}

  /**
   * Get blog post
   * @param id
   */
  public getBlog(id: number): Observable<any> {
    return this.httpService.makeRequest('GET', `/posts/${id}`);
  }

  /**
   * Get blog posts
   */
  public getBlogs(): Observable<any> {
    return this.httpService.makeRequest('GET', '/posts');
  }

  /**
   * Get blog posts using user id
   * @param userId
   */
  public getBlogsByUserId(userId: number): Observable<any> {
    return this.httpService.makeRequest('GET', `/posts?userId=${userId}`);
  }

  /**
   * Get blog post photos
   * @param id
   */
  public getBlogPhotos(id: number): Observable<any> {
    return this.httpService.makeRequest('GET', `/photos?albumId=${id}`);
  }

  /**
   * Get blog post comments
   * @param id
   */
  public getBlogComments(id: number): Observable<any> {
    return this.httpService.makeRequest('GET', `/posts/${id}/comments`);
  }

  /**
   * Create comment
   * @param data
   */
  public postComment(data: any): Observable<any> {
    return this.httpService.makeRequest(
      'POST',
      `/posts/${data.postId}/comments`,
      data
    );
  }

  /**
   * Delete post
   * @param blogId
   */
  public deletePost(blogId: number): Observable<any> {
    return this.httpService.makeRequest('DELETE', `/posts/${blogId}`);
  }

  /**
   * Create post
   * @param data
   */
  public createBlog(data: any): Observable<any> {
    return this.httpService.makeRequest('POST', '/posts', data);
  }

  /**
   * Update post
   * @param data
   */
  public updateBlog(data: any): Observable<any> {
    return this.httpService.makeRequest('PUT', `/posts/${data.id}`, data);
  }
}
