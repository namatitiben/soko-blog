import { Component, OnInit, TemplateRef } from "@angular/core";

import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

import { tap } from "rxjs/operators";

import { BlogService } from "src/app/services/blog.service";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-blog-list",
  templateUrl: "./blog-list.component.html",
  styleUrls: ["./blog-list.component.scss"]
})
export class BlogListComponent implements OnInit {
  userId = 1;
  modalRef: BsModalRef;

  selectedBlog: any;
  postForm: FormGroup;

  constructor(
    private modalService: BsModalService,
    private blogService: BlogService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initPostForm();
    //get blogs
    this.getBlogs();
  }

  /**
   * Create/update initialization form function
   */
  initPostForm() {
    this.postForm = this.fb.group({
      id: [
        (this.selectedBlog && this.selectedBlog.id ) || null
      ],
      userId: [
        (this.selectedBlog && this.selectedBlog.userId) || this.userId
      ],
      title: [
        (this.selectedBlog && this.selectedBlog.title) || "",
        Validators.required
      ],
      body: [
        (this.selectedBlog && this.selectedBlog.body) || "",
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
        // update
        const sub = this.blogService
        .updateBlog(this.postForm.value )
        .pipe(
          tap(blog => {
            // add new blog to the list
            const index = this.blogService.blogs.findIndex(item => item.id === blog.id);
            this.blogService.blogs[index] = blog;

            if(sub){
              sub.unsubscribe();
            }
          })
        )
        .subscribe();
      } else {
        delete this.postForm.value.id;

        // create
        const sub = this.blogService
          .createBlog(this.postForm.value )
          .pipe(
            tap(blog => {
              // add new blog to the list
              this.blogService.blogs = [blog, ...this.blogService.blogs];
              if(sub){
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
        tap(data => {
          console.log(data);
          this.modalRef.hide();
          this.selectedBlog = null;
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
