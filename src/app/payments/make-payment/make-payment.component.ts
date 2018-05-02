import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {PaymentService} from '../payment.service';
import {environment} from '../../../environments/environment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AddressModelRessource, MakePaymentModel, PaymentRessource, UserModelRessource} from './make-payment-model';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.scss']
})
export class MakePaymentComponent implements OnInit {
  private handler: any;
  public myForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public paymentRessource: PaymentRessource;
  public transactionType: string;
  public errorMessage: string;
  public successMessage: string;

  @ViewChild('submit') button: ElementRef;

  constructor(private _fb: FormBuilder, private paymentSvc: PaymentService, private userService: UserService) {
  }

  ngOnInit() {
    this.myForm = this._fb.group({
      transactionType: ['don', [<any>Validators.required]],
      username: ['', []],
      password: ['', []],
      last_name: ['', [<any>Validators.required]],
      names: ['', [<any>Validators.required]],
      address: ['', [<any>Validators.required]],
      postal_code: ['', [<any>Validators.pattern('[0-9]{5}'), <any>Validators.required]],
      city: ['', [<any>Validators.required]],
      country: ['France', [<any>Validators.required]],
      email: ['', [<any>Validators.email]],
      phone: ['', [<any>Validators.pattern('[0-9]{10}')]],
      amount: ['', [<any>Validators.required]]
    });
    this.myForm.get('transactionType').valueChanges.subscribe(
      (transactionType: string) => {
        if (transactionType === 'don') {
          this.myForm.get('username').setValidators([]);
          this.myForm.get('password').setValidators([]);
        } else {
          this.myForm.get('username').setValidators([Validators.required]);
          this.myForm.get('password').setValidators([Validators.required]);
        }
      }
    );

    this.handler = StripeCheckout.configure({
      key: environment.stripeKey,
      image: '/assets/images/logo/logo.png',
      locale: 'auto',
      currency: 'eur',
      token: token => {
        this.paymentRessource.token = token.id;
        if (this.transactionType === 'adhesion') {
          this.paymentSvc.processPaymentAndSignUp(this.paymentRessource).subscribe(
            value => {
              console.log(value);
              this.successMessage = 'Succès !';
              this.button.nativeElement.blur(); // bug
            },
            err => {
              this.errorMessage = err.error.message;
              this.button.nativeElement.blur(); // bug
              console.log('Error occured in payment.' + err);
            });
        } else {
          this.paymentSvc.processPayment(this.paymentRessource).subscribe(
            value => {
              console.log(value);
              this.successMessage = 'Succès !';
              this.button.nativeElement.blur(); // bug
            },
            err => {
              this.errorMessage = err.error.message;
              this.button.nativeElement.blur(); // bug
              console.log('Error occured in payment.' + err);
            }
          );
        }
      }
    });

    // update amount based on transaction type
    this.myForm.controls['transactionType'].valueChanges.subscribe(transactionType => {
      if (transactionType === 'don') {
        this.myForm.controls['amount'].reset();
        this.myForm.controls['amount'].enable();
      } else {
        this.myForm.controls['amount'].setValue(environment.adhesion);
        this.myForm.controls['amount'].disable();
      }
    });
  }

  save(model: MakePaymentModel, isValid: boolean) {
    this.submitted = true; // set form submit to true

    this.errorMessage = '';
    this.successMessage = '';

    this.transactionType = model.transactionType;
    this.paymentRessource = new PaymentRessource();
    this.paymentRessource.user = new UserModelRessource();
    this.paymentRessource.user.last_name = model.last_name;
    this.paymentRessource.user.names = model.names;
    this.paymentRessource.user.email = model.email;
    this.paymentRessource.user.phone = model.phone;
    this.paymentRessource.user.address = new AddressModelRessource();
    this.paymentRessource.user.address.street = model.address;
    this.paymentRessource.user.address.postalCode = model.postal_code;
    this.paymentRessource.user.address.city = model.city;
    this.paymentRessource.user.address.country = model.country;

    if (this.transactionType === 'adhesion') {
      this.paymentRessource.amount = environment.adhesion * 100;
      this.paymentRessource.username = model.username;
      this.paymentRessource.password = model.password;
    } else {
      this.paymentRessource.amount = model.amount * 100;
    }
    // check if model is valid
    // if valid, call API to save customer
    console.log(model, isValid);

    if (isValid) {
      this.handlePayment();
    }
  }

  handlePayment() {
    this.handler.open({
      name: 'Don / Adhésion',
      excerpt: 'Faire un paiement',
      amount: this.paymentRessource.amount,
      email: this.paymentRessource.user.email
    });
  }

  @HostListener('window:popstate')
  onPopstate() {
    this.handler.close();
  }
}
