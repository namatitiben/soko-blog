import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  public blogs$: Observable<any>;

  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.getBlogs();
  }

  public getBlogs() {
    this.blogs$ = this.blogService.getBlogs();
  }

}
