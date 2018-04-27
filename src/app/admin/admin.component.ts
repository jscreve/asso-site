import {Component, OnInit} from '@angular/core';
import {PaymentService} from '../payments/payment.service';
import {MemberService} from './member.service';
import {OutputPaymentRessource} from '../payments/make-payment/make-payment-model';
import {MemberResource} from './member.resource.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public receiptYear: number;
  public members: MemberResource[];
  public transactions: OutputPaymentRessource[];

  constructor(private _paymentService: PaymentService,
              private _memberService: MemberService) {
  }

  ngOnInit() {
  }

  public getMembers() {
    this._memberService.getMembers().subscribe(data => {
      console.log(data);
      this.members = data;
    }, error => {
      console.log(error);
    });
  }

  public getTransactions() {
    this._paymentService.getPayments().subscribe(data => {
      console.log(data);
      this.transactions = data;
    }, error => {
      console.log(error);
    });
  }

  public generateReceipt() {
    console.log(this.receiptYear);
    this._paymentService.get(this.receiptYear).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
}
