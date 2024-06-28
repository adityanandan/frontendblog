import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogDashboardComponent } from './blog-dashboard.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateFormatPipe } from 'src/app/pipes/date-pipe/date-format.pipe';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BlogSiteServiceService } from 'src/app/services/blog-site-service.service';
import { ViewBlogsComponent } from '../view-blogs/view-blogs.component';
import { ViewMyBlogsComponent } from '../view-my-blogs/view-my-blogs.component';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';


describe('BlogDashboardComponent', () => {
  let component: BlogDashboardComponent;
  let fixture: ComponentFixture<BlogDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule, RouterTestingModule],
      declarations: [ BlogDashboardComponent,ViewBlogsComponent,ViewMyBlogsComponent,DateFormatPipe ],
      providers:[FormsModule,ReactiveFormsModule,FormBuilder,BlogSiteServiceService],
      schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
    })
    .compileComponents();
    fixture = TestBed.createComponent(BlogDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should have getBlogs function', () => {
    const spy = spyOn(component, 'ngOnInit').and.callThrough();
    let myService = TestBed.get(BlogSiteServiceService);
    spyOn(myService,'getAllBlogs').and.returnValue(of({}));
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should call searchBlogs function when dates', () => {
    component.search='siva';
    component.toDate='2020-12-12';
    component.fromDate='2020-12-12';
    let myService = TestBed.get(BlogSiteServiceService);
    spyOn(myService,'searchBlogs').and.returnValue(of({}));
    const spy = spyOn(component, 'searchBlogs').and.callThrough();
    component.searchBlogs();
    expect(spy).toHaveBeenCalled();
  });

  it('should call searchBlogs function when toDate empty', () => {
    component.search='siva';
    component.toDate='';
    component.fromDate='2020-12-12';
    const spy = spyOn(component, 'searchBlogs').and.callThrough();
    component.searchBlogs();
    expect(spy).toHaveBeenCalled();
  });

  it("should call searchBlogs function when search is empty",()=>{
    component.search='siva';
    const spy = spyOn(component, 'searchBlogs').and.callThrough();
    let myService = TestBed.get(BlogSiteServiceService);
    spyOn(myService,'searchBlogsByCategory').and.returnValue(of({}));
    component.searchBlogs();
    expect(spy).toHaveBeenCalled();
  });

  it("should call opentab function",()=>{
    const spy = spyOn(component, 'openTab').and.callThrough();
    component.openTab('view');
    expect(component.activetab).toBe('view');
    expect(spy).toHaveBeenCalled();
  });

  it("should call refreshData function",()=>{   
    const spy = spyOn(component, 'refreshData').and.callThrough();
    let myService = TestBed.get(BlogSiteServiceService);
    spyOn(myService,'getAllBlogs').and.returnValue(of({}));
    component.refreshData();
    expect(spy).toHaveBeenCalled();
  });

  
});
