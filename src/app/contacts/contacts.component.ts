import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EnergyUseModel} from '../energy-use/energy-use-model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  public myContactForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  public _contactUrl = 'https://enr-solidr.000webhostapp.com/mail.php';

  constructor(private _fb: FormBuilder, private _http: HttpClient) {
  } // form builder simplify form initialization

  ngOnInit() {
    // the short way
    this.myContactForm = this._fb.group({
      name: ['', [<any>Validators.required]],
      email: ['', [<any>Validators.required]],
      subject: ['', [<any>Validators.required]],
      message: ['', [<any>Validators.required]],
    });

    this.subcribeToFormChanges();

  }

  save(model: EnergyUseModel, isValid: boolean) {
    this.submitted = true;
    console.log(model, isValid);
    this.sendMail(model).subscribe();
  }

  sendMail(value: any): Observable<any> {

    const urlSearchParams = new URLSearchParams(value);
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
      .catch(this.handleError);
  }

  subcribeToFormChanges() {
    // initialize stream
    const myFormValueChanges$ = this.myContactForm.valueChanges;

    // subscribe to the stream
    myFormValueChanges$.subscribe(x => this.events
      .push({event: 'STATUS CHANGED', object: x}));
  }

  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
