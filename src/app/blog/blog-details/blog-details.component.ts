import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Observable } from "rxjs";
import { tap, catchError } from "rxjs/operators";

import { BlogService } from "src/app/services/blog.service";
import { Comment } from "src/app/models/comment";

@Component({
  selector: "app-blog-details",
  templateUrl: "./blog-details.component.html",
  styleUrls: ["./blog-details.component.scss"]
})
export class BlogDetailsComponent implements OnInit {
  dismissible = true;
  blogId: string;
  blog$: Observable<any>;
  blogPhotos$: Observable<any>;
  blogComnments$: Observable<any>;
  postBlogComment$: Observable<any>;
  commentForm: FormGroup;
  submitted: boolean = false;
  commentResp: any = {
    success: false,
    fail: false,
    message: ""
  };

  formErrors: any = {
    required: "This field is required",
    invalidEmail: "Invalid email address"
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    public blogService: BlogService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.blogId = this.activatedRoute.snapshot.params["id"];
    this.getBlog(this.blogId);
    this.getBlogPhotos(+this.blogId);
    this.getBlogComments(+this.blogId);
    this.initForm();
  }

  /**
   * Form initialization
   */
  initForm() {
    this.commentForm = this.fb.group({
      name: ["", Validators.required],
      emailAddress: ["", [Validators.required, Validators.email]],
      comment: ["", Validators.required]
    });
  }

  private getBlog(id) {
    this.blog$ = this.blogService.getBlog(id);
  }

  private getBlogPhotos(id: number) {
    this.blogPhotos$ = this.blogService.getBlogPhotos(id);
  }

  private getBlogComments(id: number) {
    const sub = this.blogService.getBlogComments(id).pipe(tap(comments => {
      this.blogService.comments = comments;

      if (sub) {
        sub.unsubscribe();
      }
    })).subscribe();
  }

  postComment() {
    this.submitted = true;
    this.commentResp.success = false;
    if (this.commentForm.invalid) {
      return;
    }

    //format data for posting

    const data: Comment = {
      postId: +this.blogId,
      name: this.commentForm.value.name,
      email: this.commentForm.value.emailAddress,
      body: this.commentForm.value.comment
    };

    const sub = this.blogService
      .postComment(data)
      .pipe(
        tap(comment => {
          this.updateComments(comment);          

          this.submitted = false;
          this.commentResp.success = true;
          this.commentResp.message = "Comment successfully posted";
          this.commentForm.reset();
          //unsubscribe from the subscription
          if (sub) {
            sub.unsubscribe();
          }
        })
      )
      .subscribe();
  }

  private updateComments(newComment) {
    this.blogService.comments = [newComment, ...this.blogService.comments]
  }
}
