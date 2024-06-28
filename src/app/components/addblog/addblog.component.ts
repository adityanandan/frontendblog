import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogSiteServiceService } from 'src/app/services/blog-site-service.service';

@Component({
  selector: 'app-addblog',
  templateUrl: './addblog.component.html',
  styleUrls: ['./addblog.component.css']
})
export class AddblogComponent implements OnInit {
  blog: FormGroup;

  constructor(private fb: FormBuilder, private blogSiteService: BlogSiteServiceService,private router: Router) { }

  ngOnInit() {
    this.blog = this.fb.group(
      {
        category: [
          '',
          [Validators.required, Validators.maxLength(50)],
        ],
        article: [
          '',
          [
            Validators.required,
            Validators.maxLength(1000),
          ],
        ],
        blogname: ['', [Validators.required, Validators.maxLength(50)]],
      },
    );
  }

  onSubmit() {
    console.log(this.blog.value);
    this.blogSiteService.saveBlogDetails(this.blog.value).subscribe(() => { 
      this.router.navigate(['/home']);
    });
    setTimeout(()=>{
      window.location.reload();
     },200);
  }

}
