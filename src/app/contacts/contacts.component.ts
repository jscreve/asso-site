import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {HttpClient} from '@angular/common/http';
import {EmailService} from './email.service';
import {EmailDataModel} from './data/email-data-model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  public myContactForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  // public _contactUrl = 'https://enr-solidr.000webhostapp.com/mail.php';
  public errorMessage: string;
  public successMessage: string;
  private data: any;

  constructor(private _fb: FormBuilder, private _http: HttpClient, private _emailService: EmailService) {
  } // form builder simplify form initialization

  ngOnInit() {
    // the short way
    this.myContactForm = this._fb.group({
      name: ['', [<any>Validators.required]],
      email: ['', [<any>Validators.required]],
      subject: ['', [<any>Validators.required]],
      message: ['', [<any>Validators.required]],
    });
  }

  save(model: any, isValid: boolean) {
    this.submitted = true;
    console.log(model, isValid);
    this.sendMail(model);
  }

  sendMail(email: EmailDataModel): Observable<any> {
    this.data = this._emailService.create(email);
    return this.data.subscribe(
      value => {
        this.successMessage = 'Message envoyé !';
      },
      err => {
        console.log('Error occured.' + err);
        this.errorMessage = 'Erreur d\'envoi';
      }
    );
    /*const urlSearchParams = new URLSearchParams(value);
    urlSearchParams.set('submit', 'true');
    urlSearchParams.set('name', value.name);
    urlSearchParams.set('email', value.email);
    urlSearchParams.set('subject', value.subject);
    urlSearchParams.set('message', value.message);
    const body = urlSearchParams.toString();

    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    return this._http.post(this._contactUrl, body, {
      headers: headers
    }).do(data => console.log('server data:', data))  // debug
      .catch(this.handleError);*/
  }

  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
