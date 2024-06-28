import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Blogs } from 'src/app/modals/blogs.interface';
import { BlogSiteServiceService } from 'src/app/services/blog-site-service.service';

@Component({
  selector: 'app-blog-dashboard',
  templateUrl: './blog-dashboard.component.html',
  styleUrls: ['./blog-dashboard.component.css']
})
export class BlogDashboardComponent implements OnInit {

  blog: FormGroup;
  displayStyle = "none";
  allBlogs: Blogs[] = [];
  search: string;
  toDate: string;
  fromDate: string;
  activetab = 'all-blogs';
  previousTabName: string;
  showSearch: boolean = false;

  constructor(private fb: FormBuilder, private blogSiteService: BlogSiteServiceService) { }

  ngOnInit() {
    this.blogSiteService.getAllBlogs().subscribe((data) => {
      this.allBlogs = data;
    })
  }
  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

  onSubmit() {
    console.log(this.blog.value);
    this.blogSiteService.saveBlogDetails(this.blog.value).subscribe(() => {
      this.closePopup();
      this.activetab = this.previousTabName;
    })
  }

  openPopup(tabName: string) {
    this.displayStyle = "block";
    this.blog.reset();
    this.previousTabName = this.activetab;
    this.activetab = tabName;
    this.showSearch=false;
  }

  closePopup() {
    this.activetab = this.previousTabName
    this.displayStyle = "none";
  }

  searchBlogs() {
    if (this.search && this.fromDate) {
      if (!this.toDate) {
        this.toDate = new Date().toISOString().split('T')[0];
      }
      this.blogSiteService.searchBlogs(this.search, this.fromDate, this.toDate).subscribe((data) => {
        this.allBlogs = data;
      })
    }
    else {
      this.blogSiteService.searchBlogsByCategory(this.search).subscribe((data) => {
        this.allBlogs = data;
      })
    }
  }

  openTab(tabName: string) {
    this.activetab = tabName;
  }

  refreshData() {
    this.blogSiteService.getAllBlogs().subscribe((data) => {
      this.allBlogs = data;
    })
  }

}
