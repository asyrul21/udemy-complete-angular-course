import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// model
import { Post } from './post.model'
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts = [];
  isFetching = false;
  error = null;

  private errorSub: Subscription;

  constructor(private http: HttpClient, private postService: PostsService) { }

  ngOnInit() {
    // subscribe to error
    this.errorSub = this.postService.error.subscribe(errorMessage => {
      this.error = errorMessage
    })


    this.isFetching = true;
    this.postService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts
    }, error => {
      this.isFetching = false;
      this.error = error.message;
    })
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe()
  }

  onCreatePost(postData: Post) {
    // console.log(postData);
    this.postService.createAndStorePost(postData.title, postData.content)
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts
    }, error => {
      this.isFetching = false;
      this.error = error.message;
    })
  }

  onClearPosts() {
    // Send Http request
    console.log(this.loadedPosts);

    this.postService.deletePost().subscribe(() => {
      this.loadedPosts = []
    })
  }

  onHandleError() {
    this.error = null
  }
}

// add HttpClientModule in imports of app.module
