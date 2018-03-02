import {Injectable} from '@angular/core';


@Injectable()
export class PaymentService {

  userId: string;

  constructor() {
  }


  processPayment(token: any, amount: number) {
    const payment = {token, amount};
    // call php
  }
}
