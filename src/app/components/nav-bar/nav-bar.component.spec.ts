import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarComponent } from './nav-bar.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BlogSiteServiceService } from 'src/app/services/blog-site-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from '../login/login.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule.withRoutes([{path:'login',component:LoginComponent}]),HttpClientTestingModule],
      declarations: [ NavBarComponent,LoginComponent ],
      providers:[BlogSiteServiceService],
      schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
    })
    .compileComponents();
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should have logout function', () => {
    let myService = TestBed.get(BlogSiteServiceService);
    const spy = spyOn(component, 'onLogoutClick').and.callThrough();
    component.onLogoutClick();
    expect(spy).toHaveBeenCalled();
  } );
});
