import {Component, HostListener, OnInit} from '@angular/core';
import {PaymentService} from '../payment.service';
import {environment} from '../../../environments/environment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MakePaymentModel} from './make-payment-model';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.scss']
})
export class MakePaymentComponent implements OnInit {
  private handler: any;
  public myForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public amount: number;

  constructor(private _fb: FormBuilder, private paymentSvc: PaymentService) {
  }
  ngOnInit() {
    this.myForm = this._fb.group({
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
    this.handler = StripeCheckout.configure({
      key: environment.stripeKey,
      image: '/assets/images/logo/logo.jpeg',
      locale: 'auto',
      currency: 'eur',
      token: token => {
        this.paymentSvc.processPayment(token.id, this.amount).subscribe(
          value => {
            console.log(value);
          },
          err => {
            console.log('Error occured in payment.' + err);
          }
        );
      }
    });
  }

  save(model: MakePaymentModel, isValid: boolean) {
    this.submitted = true; // set form submit to true
    this.amount = model.amount * 100;
    // check if model is valid
    // if valid, call API to save customer
    console.log(model, isValid);

    if (isValid) {
      this.handlePayment();
    }
  }

  handlePayment() {
    this.handler.open({
      name: 'Don',
      excerpt: 'Faire un paiement',
      amount: this.amount
    });
  }

  @HostListener('window:popstate')
  onPopstate() {
    this.handler.close();
  }
}
