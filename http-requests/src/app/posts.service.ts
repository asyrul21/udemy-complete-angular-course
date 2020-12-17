import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { Post } from './post.model';
// for piping
import { map, catchError, tap } from 'rxjs/operators'
import { Subject, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PostsService {
    error = new Subject<string>()

    constructor(private http: HttpClient) { }

    createAndStorePost(title: string, content: string) {
        const postData: Post = { title: title, content: content }
        // Send Http request
        this.http
            .post<{ name: string }>(
                'https://udemy-angular-http-758c8.firebaseio.com/posts.json',
                postData,
                {
                    // optional
                    // observe: 'body'
                    observe: 'response'
                }
            )
            .subscribe(responseData => {
                console.log(responseData);
            }, error => {
                this.error.next(error.message);
            });
    }

    fetchPosts() {
        let searchParams = new HttpParams()
        searchParams = searchParams.append('print', 'pretty')
        searchParams = searchParams.append('name', 'ahmad')
        searchParams = searchParams.append('custom', 'key')

        return this.http.get<{ [key: string]: Post }>('https://udemy-angular-http-758c8.firebaseio.com/posts.json', {
            // optional configuration
            headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
            // params: new HttpParams().set('print', 'pretty')
            params: searchParams,
            responseType: 'json'
        })
            .pipe(
                map((responseData) => {
                    // firebase data transformation
                    const postArray: Post[] = [];

                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            postArray.push({ ...responseData[key], id: key })
                        }
                    }
                    return postArray
                }),
                // optional
                catchError(errorRes => {
                    // send to analytics server
                    return throwError(errorRes);
                })
            )
    }

    deletePost() {
        return this.http.delete('https://udemy-angular-http-758c8.firebaseio.com/posts.json', {
            observe: 'events',
            responseType: 'text'
            // responseType: 'blob'
            // responseType: 'json'
        }).pipe(
            tap(event => {
                console.log(event);
                if (event.type === HttpEventType.Sent) {
                    // ...
                }
                if (event.type === HttpEventType.Response) {
                    console.log(event.body);

                }
            })
        )
    }
}

// add HttpClientModule in imports of app.module