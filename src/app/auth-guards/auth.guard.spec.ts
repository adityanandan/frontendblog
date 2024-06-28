import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../components/login/login.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BlogSiteServiceService } from '../services/blog-site-service.service';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule.withRoutes([{path:'login',component:LoginComponent}])],
      declarations: [LoginComponent],
      providers: [AuthGuard, HttpClient,HttpHandler,BlogSiteServiceService],
      schemas:[NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should have canActivate function if logged in user', inject([AuthGuard], (guard: AuthGuard) => {
    const spy = spyOn(guard, 'canActivate').and.callThrough();
    let myService = TestBed.get(BlogSiteServiceService);
    spyOn(myService,'isLoggedIn').and.returnValue(true);
    guard.canActivate();
    expect(spy).toHaveBeenCalled();
  }));

  it('should have canActivate function if not logged in user', inject([AuthGuard], (guard: AuthGuard) => {
    const spy = spyOn(guard, 'canActivate').and.callThrough();
    let myService = TestBed.get(BlogSiteServiceService);
    spyOn(myService,'isLoggedIn').and.returnValue(false);
    guard.canActivate();
    expect(spy).toHaveBeenCalled();
  }));
});
