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
    // the short way
    this.myForm = this._fb.group({
      amount: ['', [<any>Validators.required]],
    });
    this.handler = StripeCheckout.configure({
      key: environment.stripeKey,
      image: '/assets/images/logo/logo.jpeg',
      locale: 'auto',
      country: 'FR',
      currency: 'eur',
      token: token => {
        this.paymentSvc.processPayment(token, this.amount);
      }
    });
  }

  save(model: MakePaymentModel, isValid: boolean) {
    this.submitted = true; // set form submit to true
    this.amount = model.amount * 100;
    // check if model is valid
    // if valid, call API to save customer
    console.log(model, isValid);

    this.handlePayment();
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
