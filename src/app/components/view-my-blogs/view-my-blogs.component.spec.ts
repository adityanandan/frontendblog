import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyBlogsComponent } from './view-my-blogs.component';
import { BlogSiteServiceService } from 'src/app/services/blog-site-service.service';
import { DateFormatPipe } from 'src/app/pipes/date-pipe/date-format.pipe';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('ViewMyBlogsComponent', () => {
  let component: ViewMyBlogsComponent;
  let fixture: ComponentFixture<ViewMyBlogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,RouterTestingModule],
      declarations: [ ViewMyBlogsComponent,DateFormatPipe ],
      providers:[BlogSiteServiceService]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ViewMyBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should have getBlogs function', () => {
    const spy = spyOn(component, 'ngOnInit').and.callThrough();
    let myService=TestBed.get(BlogSiteServiceService);
    spyOn(myService,"getMyBlogs").and.returnValue(of({}))
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('it should have getBlogs function', () => {
    const spy = spyOn(component, 'deleteBlog').and.callThrough();
    let myService=TestBed.get(BlogSiteServiceService);
    spyOn(myService,"deleteBlog").and.returnValue(of({}))
    component.deleteBlog('blog');
    expect(spy).toHaveBeenCalled();
  } );
});
