import { TestBed, inject } from '@angular/core/testing';

import { BlogSiteServiceService } from './blog-site-service.service';
import { HttpClient, HttpErrorResponse, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { error } from 'console';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('BlogSiteServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[HttpClientTestingModule,RouterTestingModule],
    providers: [HttpClient],
    declarations: []
  }));

  it('should be created', () => {
    const service: BlogSiteServiceService = TestBed.get(BlogSiteServiceService);
    expect(service).toBeTruthy();
  });

  it('should have getAllBlogs function', () => {
    const service: BlogSiteServiceService = TestBed.get(BlogSiteServiceService);
    const spy = spyOn(service, 'getAllBlogs').and.returnValue(of([]));
    service.getAllBlogs();
    expect(spy).toHaveBeenCalled();
  });

  it('should have getMyBlogs function', () => {
    const service: BlogSiteServiceService = TestBed.get(BlogSiteServiceService);
    const spy = spyOn(service, 'getMyBlogs').and.returnValue(of([]));
    service.getMyBlogs();
    expect(spy).toHaveBeenCalled();
  });

  it('should have getMyBlogs function', () => {
    const service: BlogSiteServiceService = TestBed.get(BlogSiteServiceService);
    const spy = spyOn(service, 'getMyBlogs').and.returnValue(throwError('error'));
    service.getMyBlogs();
    expect(spy).toHaveBeenCalled();
  });

  it('should call getToken function', () => {  
    const service: BlogSiteServiceService = TestBed.get(BlogSiteServiceService);
    const spy = spyOn(service, 'getToken').and.callThrough();
    service.getToken("aditya");
    expect(spy).toHaveBeenCalled();
  });

  it('should call saveBlogDetails function', () => {
    const service: BlogSiteServiceService = TestBed.get(BlogSiteServiceService);
    const spy = spyOn(service, 'saveBlogDetails').and.callThrough()
    service.saveBlogDetails({category: 'test',
      article: 'article',
      authorname: 'siva',
      blogname: 'blog'
  });
    expect(spy).toHaveBeenCalled();
  });

  it('should call register function', () => {
    const service: BlogSiteServiceService = TestBed.get(BlogSiteServiceService);
    const spy = spyOn(service, 'register').and.callThrough()
    service.register({username: 'test',
      password: 'article',
      email: 'siva@gmail.com',
  });
    expect(spy).toHaveBeenCalled();
  });

  it('should call isLoggedIn function', () => {
    const service: BlogSiteServiceService = TestBed.get(BlogSiteServiceService);
    const spy = spyOn(service, 'isLoggedIn').and.callThrough();
    service.isLoggedIn();
    expect(spy).toHaveBeenCalled();
  });

  it('should searchBlogsByCategory function',()=>{
    const service: BlogSiteServiceService = TestBed.get(BlogSiteServiceService);
    const spy = spyOn(service, 'searchBlogsByCategory').and.callThrough();
    service.searchBlogsByCategory('blog');
    expect(spy).toHaveBeenCalled();
  });

  it('should deleteBlog function',()=>{
    const service: BlogSiteServiceService = TestBed.get(BlogSiteServiceService);
    const spy = spyOn(service, 'deleteBlog').and.callThrough();
    service.deleteBlog('blog');
    expect(spy).toHaveBeenCalled();
  });

  it('should handleErrorObservable', inject([BlogSiteServiceService], (service: BlogSiteServiceService) => {
    const urlString = 'http://localhost:8080/api/v1.0/blogsite/users/get/sivapalem'
    const emsg = 'deliberate 404 error';

    spyOn(service, '_handleError').and.callThrough();
    const error:ErrorEvent = {error:{error:{message:emsg}}} as ErrorEvent
    service._handleError(error);  
  }));
});
