import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogSiteServiceService } from '../../services/blog-site-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  UserRegister: FormGroup;
  submitted = false;
  message: string;
  constructor(private fb: FormBuilder, private blogSiteServiceService: BlogSiteServiceService, private _router: Router) { }

  ngOnInit(): void {
    this.UserRegister = this.fb.group(
      {
        username: [
          '',
          [Validators.required, Validators.pattern('[a-zA-Z ]*')],
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          ],
        ],
        password: ['', [Validators.required, Validators.minLength(5)]],
      },
    );
  }

  onSubmit() {
    this.submitted = true;
    if (this.UserRegister.invalid) {
      return;
    }

    this.blogSiteServiceService.register(this.UserRegister.value).subscribe(
      (data) => {
        this._router.navigateByUrl('/login', { state: { message: "User details saved successfully, please login to continue" } });
      },
      (error) => {
        if (error.status == 409) {
          this.message = "User already exists with user name";
        }
      }
    );
  }

}
