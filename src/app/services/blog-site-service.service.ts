import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from "rxjs/operators";
import { LoginCredentials } from '../modals/login-credentials.interface';
import { RegisterUser } from '../modals/register-user.interface';
import { Blogs, CreateBlog } from '../modals/blogs.interface';
import { Router } from '@angular/router';

const httpOptions1 = {
  headers: new HttpHeaders({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers": "",
  }),
};

@Injectable({
  providedIn: 'root'
})
export class BlogSiteServiceService {
  private readonly baseUrl = 'http://localhost:8082/api/v1.0/userauth';
  private readonly blogUrl = 'http://localhost:8081/api/v1.0/blogsite';
  loggedIn: boolean;
  constructor(private httpClient: HttpClient,private router: Router) { }

  checkUserCredentials(value: LoginCredentials): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/login`, value)
      .pipe(catchError(this._handleError));;
  }

  public storeUserData(
    username: string,
    authorization: string
  ) {
    localStorage.setItem("loginId", username);
    localStorage.setItem("authorization", authorization);
  }

  public logout() {
    localStorage.removeItem("loginId");
    localStorage.removeItem("authorization");
  }

  public getToken(username: string):Observable<string> {
    return this.httpClient
      .get(`${this.baseUrl}/jwt/authentication/${username}`,{responseType: 'text'})
      .pipe(catchError(this._handleError));;
  }

  public register(userInfo: RegisterUser): Observable<any> {
    return this.httpClient
      .post(this.baseUrl + "/user/register", userInfo, httpOptions1)
      .pipe(catchError(this._handleError));
  }

  public isLoggedIn() {
    if (localStorage.getItem("loginId")) {
      return true;
    } else {
      return false;
    }

  }

  public saveBlogDetails(blogDetails: CreateBlog): Observable<string> {
    const blog = {
      blogname:blogDetails.blogname,
      article: blogDetails.article,
      authorname: localStorage.getItem("loginId"),
      category: blogDetails.category,
    }
    const token = localStorage.getItem("authorization");
    return this.httpClient.post(`${this.blogUrl}/user/blogs/add/`, blog, {responseType: 'text',
      headers: {
        Authorization: token,
      },
    }).pipe(catchError(this._handleError));;
  }

  public getAllBlogs(): Observable<Blogs[]> {
    return this.httpClient.get<Blogs[]>(`${this.blogUrl}/blogs/getall`);
  }

  public searchBlogs(category: string, fromDate: string, toDate: string): Observable<Blogs[]> {
    return this.httpClient.get<Blogs[]>(`${this.blogUrl}/blogs/get/${category}/${fromDate}/${toDate}`)
      .pipe(catchError(this._handleError));;
  }

  public searchBlogsByCategory(category: string): Observable<Blogs[]> {
    return this.httpClient.get<Blogs[]>(`${this.blogUrl}/blogs/info/${category}`)
      .pipe(catchError(this._handleError));;
  }

  public getMyBlogs(): Observable<Blogs[]> {
    const token = localStorage.getItem("authorization");
    return this.httpClient.get<Blogs[]>(`${this.blogUrl}/user/getMyBlogs`,{
      headers: {
        Authorization: token,
      },
    }).pipe(catchError(this._handleError));;
  }

  public deleteBlog(blogName: string): Observable<string> {
    const token = localStorage.getItem("authorization");
    return this.httpClient.delete(`${this.blogUrl}/user/delete/${blogName}`, {responseType: 'text',
      headers: {
        Authorization: token,
      },
    }).pipe(catchError(this._handleError),
    tap(() => {
      // Navigate to home after successful deletion
      this.router.navigate(['/home']);
    })
    );
    
  }

  public _handleError(error: any) {
    const err = {} as any;
    if (error.error instanceof ErrorEvent) {
      err.message = error.error.message;
      err.type = error.error.type;
      err.status = error.error.status;
    } else {
      err.message = error.message;
      err.status = error.response ? error.response.status : error.status;
      const { data } = error.response ? error.response : error;
      if (data) {
        err.data = data;
      }
    }
    return throwError(err);
  }
}
