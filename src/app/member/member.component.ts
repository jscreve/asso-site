import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {SimplePaymentRessource} from '../payments/make-payment/make-payment-model';
import {environment} from '../../environments/environment';
import {PaymentService} from '../payments/payment.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LinkyRegister, MembershipCharge} from './member-payment-model';
import {UserService} from '../services/user.service';
import {MemberResourceUpdate} from '../resources/member.resource.update.component';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  private handler: any;
  public registerForm: FormGroup; // our model driven form
  public linkyForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public paymentRessource: SimplePaymentRessource;
  public errorMessage: string;
  public successMessage: string;
  public errorLinkyMessage: string;
  public successLinkyMessage: string;
  public linkyActivated: string;
  public energyYesterday = 0;
  public lowestPowerYesterday = 0;
  public threshold = 0;

  @ViewChild('submit') button: ElementRef;
  @ViewChild('linkySubmit') linkyButton: ElementRef;

  constructor(private _fb: FormBuilder, private paymentSvc: PaymentService, private userService: UserService) {
  }

  ngOnInit() {
    this.linkyActivated = 'Non activé';
    this.registerForm = this._fb.group({
      email: ['', [<any>Validators.required]],
      amount: ['', [<any>Validators.required]]
    });
    this.linkyForm = this._fb.group({
      login: ['', [<any>Validators.required]],
      password: ['', [<any>Validators.required]],
      threshold: ['0', [<any>Validators.required]]
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
    this.registerForm.controls['amount'].setValue(environment.adhesion);
    this.registerForm.controls['amount'].disable();
    this.userService.get().subscribe(memberResource => {
        this.linkyActivated = 'Non activé';
        if (memberResource.linky.activated === true) {
          this.linkyActivated = 'Activé';
          this.linkyForm.controls['threshold'].setValue(memberResource.linky.threshold);
          this.threshold = memberResource.linky.threshold;
          this.energyYesterday = memberResource.linky.energyYesterday;
          this.lowestPowerYesterday = memberResource.linky.lowestPowerYesterday;
        } else {
          this.linkyForm.controls['threshold'].setValue(0);
        }
      },
      err => {
        console.log('Error occured in retrieve member resource.' + err);
      });
  }

  linkyRegister(model: LinkyRegister, isValid: boolean) {
    this.submitted = true; // set form submit to true
    // check if model is valid
    // if valid, call API to save customer
    console.log(model, isValid);

    if (isValid) {
      const memberResourceUpdate = new MemberResourceUpdate();
      memberResourceUpdate.linkyUsername = model.login;
      memberResourceUpdate.linkyPassword = model.password;
      memberResourceUpdate.linkyActivated = true;
      memberResourceUpdate.threshold = model.threshold;
      if (memberResourceUpdate.threshold === 0) {
        memberResourceUpdate.linkyActivated = false;
      }
      this.userService.update(memberResourceUpdate).subscribe(
        value => {
          console.log('linky register successful');
          this.successLinkyMessage = 'Succès !';
          this.errorLinkyMessage = null;
          this.linkyButton.nativeElement.blur(); // bug
        }, err => {
          console.log('Error occured in linky register.' + err);
          this.successLinkyMessage = null;
          this.errorLinkyMessage = 'Une erreur est survenue';
          this.linkyButton.nativeElement.blur(); // bug
        });
    }
  }

  register(model: MembershipCharge, isValid: boolean) {
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

  update(model: any, isValid: boolean) {
    this.submitted = true; // set form submit to true

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
