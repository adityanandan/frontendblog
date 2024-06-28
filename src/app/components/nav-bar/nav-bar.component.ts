import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogSiteServiceService } from 'src/app/services/blog-site-service.service';

@Component({
  selector: 'nav-bar-component',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private blogSiteService: BlogSiteServiceService, private router: Router) { }

  ngOnInit() {
  }

  onLogoutClick() {

    this.router.navigate(['/login']).then(() => { this.blogSiteService.logout(); });

  }

}
