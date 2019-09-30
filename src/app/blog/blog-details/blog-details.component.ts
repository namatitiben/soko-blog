import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {
  blog$:Observable<any>;
  blogPhotos$: Observable<any>;
  blogComnments$: Observable<any>;

  constructor(private activatedRoute: ActivatedRoute, private blogService: BlogService) { }

  ngOnInit() {
    const blogId = this.activatedRoute.snapshot.params['id'];
    this.getBlog(blogId);
    this.getBlogPhotos(+blogId)
    this.getBlogComments(+blogId);
  }

  private getBlog(id){
    this.blog$ = this.blogService.getBlog(id);
  }

  private getBlogPhotos(id: number) {
    this.blogPhotos$ = this.blogService.getBlogPhotos(id);
  }

  private getBlogComments(id: number) {
    this.blogComnments$ = this.blogService.getBlogComments(id);
  }

}
