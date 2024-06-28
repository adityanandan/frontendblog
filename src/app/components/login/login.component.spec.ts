import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BlogSiteServiceService } from 'src/app/services/blog-site-service.service';
import { of, throwError } from 'rxjs';
import { BlogDashboardComponent } from '../blog-dashboard/blog-dashboard.component';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,HttpClientTestingModule],
      declarations: [ LoginComponent ],
      providers:[FormBuilder,BlogSiteServiceService],
      schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
    })
    .compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check invalid form', () => {
    component.UserLogin.controls['username'].setValue('');
    component.UserLogin.controls['password'].setValue('');
    component.OnSubmit();
    expect(component.UserLogin.valid).toBeFalsy();
  });

  it('should check valid form', () => {
    component.UserLogin.controls['username'].setValue('sivapallem');
    component.UserLogin.controls['password'].setValue('password');
    let myService = TestBed.get(BlogSiteServiceService);
    //spyOn(myService,'checkUserCredentials').and.returnValue(of({userName:'siva',password:'password'}));
    //spyOn(myService,"getToken").and.returnValue(of({jwtToken:'token'}));
    component.OnSubmit();
    expect(component.UserLogin.valid).toBeTruthy();
  });

  it('should check for error when subsribe form', () => {
    component.UserLogin.controls['username'].setValue('sivapallem');
    component.UserLogin.controls['password'].setValue('password');
    let myService = TestBed.get(BlogSiteServiceService);
    spyOn(myService,'checkUserCredentials').and.returnValue(throwError({status:400,message:'400'}));
    component.OnSubmit();
    expect(component.UserLogin.valid).toBeTruthy();
  });

  it('should check for error other than 400 when subscribe form', () => {
    component.UserLogin.controls['username'].setValue('sivapallem');
    component.UserLogin.controls['password'].setValue('password');
    let myService = TestBed.get(BlogSiteServiceService);
    spyOn(myService,'checkUserCredentials').and.returnValue(throwError({status:409,message:'409'}));
    component.OnSubmit();
    expect(component.UserLogin.valid).toBeTruthy();
  });
});
