import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BlogSiteServiceService } from '../services/blog-site-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private blogSiteService: BlogSiteServiceService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.blogSiteService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
