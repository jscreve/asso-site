import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {SimplePaymentRessource} from '../payments/make-payment/make-payment-model';
import {environment} from '../../environments/environment';
import {PaymentService} from '../payments/payment.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MembershipCharge} from './member-payment-model';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  private handler: any;
  public myForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public paymentRessource: SimplePaymentRessource;
  public errorMessage: string;
  public successMessage: string;

  @ViewChild('submit') button: ElementRef;

  constructor(private _fb: FormBuilder, private paymentSvc: PaymentService) {
  }

  ngOnInit() {
    this.myForm = this._fb.group({
      email: ['', [<any>Validators.required]],
      amount: ['', [<any>Validators.required]]
    });
    this.handler = StripeCheckout.configure({
      key: environment.stripeKey,
      image: '/assets/images/logo/logo.png',
      locale: 'auto',
      currency: 'eur',
      token: token => {
        this.paymentRessource.token = token.id;
        this.paymentSvc.processPaymentExistingMember(this.paymentRessource).subscribe(
          value => {
            console.log(value);
            this.successMessage = 'Succès !';
            this.errorMessage = null;
            this.button.nativeElement.blur(); // bug
          },
          err => {
            console.log('Error occured in payment.' + err);
            this.errorMessage = err.error.message;
            this.successMessage = null;
            this.button.nativeElement.blur(); // bug
          }
        );
      }
    });
    this.myForm.controls['amount'].setValue(environment.adhesion);
    this.myForm.controls['amount'].disable();
  }

  save(model: MembershipCharge, isValid: boolean) {
    this.submitted = true; // set form submit to true
    this.paymentRessource = new SimplePaymentRessource();
    this.paymentRessource.amount = environment.adhesion * 100;
    this.paymentRessource.email = model.email;
    // check if model is valid
    // if valid, call API to save customer
    console.log(model, isValid);

    if (isValid) {
      this.handlePayment();
    }
  }

  handlePayment() {
    this.handler.open({
      name: 'Adhésion',
      excerpt: 'Faire un paiement',
      amount: this.paymentRessource.amount,
      email: this.paymentRessource.email
    });
  }

  @HostListener('window:popstate')
  onPopstate() {
    this.handler.close();
  }
}
