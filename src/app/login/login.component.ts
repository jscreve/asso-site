import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Login} from './model/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public myForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public loginSuccess = true;

  constructor(private _fb: FormBuilder, private router: Router,
              private authService: AuthService, private _router: Router) {
  }

  ngOnInit() {
    this.myForm = this._fb.group({
      username: ['', [<any>Validators.required]],
      password: ['', [<any>Validators.required]],
    });
  }

  save(model: Login, isValid: boolean) {
    this.submitted = true;
    if (isValid) {
      this.authService.attemptAuth(model.username, model.password).subscribe(
        data => {
          this.authService.saveToken(data.token, data.expiresAt, model.username, data.authorities);
          this.loginSuccess = true;
          this._router.navigate(['/home']);
        },
        error => {
          this.loginSuccess = false;
          console.log(error);
        }
      );
    }
  }

  logout() {
    this.submitted = false;
    this.authService.signOut();
    this._router.navigate(['/home']);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
