import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {MakePaymentRessource} from './make-payment/make-payment-model';

const API_URL = environment.apiUrl;

@Injectable()
export class PaymentService {

  userId: string;

  constructor(@Inject(HttpClient) private httpClient: HttpClient) {
  }

  processPayment(payment: MakePaymentRessource) {
    return this.httpClient.post<any>(API_URL + '/payment/charge', payment);
  }
}
