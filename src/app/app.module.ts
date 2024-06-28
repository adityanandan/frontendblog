import { BrowserModule } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { BlogDashboardComponent } from './components/blog-dashboard/blog-dashboard.component';
import { CommonModule } from '@angular/common';
import { ViewBlogsComponent } from './components/view-blogs/view-blogs.component';
import { DateFormatPipe } from './pipes/date-pipe/date-format.pipe';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ViewMyBlogsComponent } from './components/view-my-blogs/view-my-blogs.component';
import { RouterOutlet } from '@angular/router';
import { AddblogComponent } from './components/addblog/addblog.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    BlogDashboardComponent,
    ViewBlogsComponent,
    DateFormatPipe,
    NavBarComponent,
    ViewMyBlogsComponent,
    AddblogComponent,
  ],
  exports:[AppComponent,
    LoginComponent,
    RegisterComponent,
    BlogDashboardComponent,
    ViewBlogsComponent,
    DateFormatPipe,
    NavBarComponent,
    ViewMyBlogsComponent],
  providers: [HttpClientModule,ReactiveFormsModule,FormsModule,CommonModule,NavBarComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule { }
