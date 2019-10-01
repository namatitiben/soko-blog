import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { tap, catchError } from 'rxjs/operators';

import { BlogService } from 'src/app/services/blog.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  userId: number;
  modalRef: BsModalRef;

  selectedBlog: any;
  postForm: FormGroup;

  constructor(
    private modalService: BsModalService,
    public blogService: BlogService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    //get logged user
    const user: any = JSON.parse(localStorage.getItem('user'));
    this.userId = user.id;
    this.initPostForm();
    //get blogs
    this.getBlogs();
  }

  /**
   * Create/update initialization form function
   */
  initPostForm() {
    this.postForm = this.fb.group({
      id: [(this.selectedBlog && this.selectedBlog.id) || null],
      userId: [(this.selectedBlog && this.selectedBlog.userId) || this.userId],
      title: [
        (this.selectedBlog && this.selectedBlog.title) || '',
        Validators.required
      ],
      body: [
        (this.selectedBlog && this.selectedBlog.body) || '',
        Validators.required
      ]
    });
  }

  /**
   * Get list of blogs from
   */
  getBlogs() {
    const sub = this.blogService
      .getBlogsByUserId(this.userId)
      .pipe(
        tap(blogs => {
          this.blogService.blogs = blogs;
          if (sub) {
            sub.unsubscribe();
          }
        })
      )
      .subscribe();
  }

  /**
   * Create / Update post api integration
   */
  postBlog() {
    if (this.postForm.valid) {
      if (this.selectedBlog) {
        // update blog

        // deep copy the form value, esp for new records that user adds
        const updatedValue = JSON.parse(JSON.stringify(this.postForm.value));

        const index = this.blogService.blogs.findIndex(
          item => item.id === this.selectedBlog.id
        );
        const sub = this.blogService
          .updateBlog(this.postForm.value)
          .pipe(
            tap(blog => {
              // add new blog to the list

              this.blogService.blogs[index] = blog;

              if (sub) {
                sub.unsubscribe();
              }
            }),

            catchError(err => {
              // you see, the api is fake and our changes are not persisted
              // this just takes care of that
              this.blogService.blogs[index] = updatedValue;

              return of(err);
            })
          )
          .subscribe();
      } else {
        delete this.postForm.value.id;

        // create
        const sub = this.blogService
          .createBlog(this.postForm.value)
          .pipe(
            tap(blog => {
              // add new blog to the list
              this.blogService.blogs = [blog, ...this.blogService.blogs];
              if (sub) {
                sub.unsubscribe();
              }
            })
          )
          .subscribe();
      }
    }

    this.onPostModalClose();
  }

  /**
   * Delete post api integration function
   */
  deleteBlog() {
    const sub = this.blogService
      .deletePost(this.selectedBlog.id)
      .pipe(
        tap(_ => {
          // remove blog from the list
          const index = this.blogService.blogs.findIndex(
            item => item.id === this.selectedBlog.id
          );
          if (index >= 0) {
            this.blogService.blogs.splice(index, 1);
          }

          // close the modal
          this.modalRef.hide();
          this.selectedBlog = null;

          // unsubscribe
          if (sub) {
            sub.unsubscribe();
          }
        })
      )
      .subscribe();
  }

  /**
   * Opens the delete confirmation modal
   * @param template
   */
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  /**
   * Open the post creation/updating form modal and reinitilizes the form
   * @param post
   */
  openPostModal(post: TemplateRef<any>) {
    this.initPostForm();
    this.modalRef = this.modalService.show(post);
  }

  /**
   * Close modal and reset the form
   */
  onPostModalClose() {
    this.selectedBlog = null;
    this.modalRef.hide();
    this.initPostForm();
  }
}
