import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaymentService} from '../payment.service';
import {MakePaymentComponent} from '../make-payment/make-payment.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MyCommonModule} from '../../my-common.module';

@NgModule({
  imports: [
    CommonModule,
    MyCommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [MakePaymentComponent],
  exports: [MakePaymentComponent],
  providers: [PaymentService]
})
export class PaymentModule {
}
