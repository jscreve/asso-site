import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable()
export class PaymentService {

  userId: string;

  constructor(@Inject(HttpClient) private httpClient: HttpClient) {
  }

  processPayment(token: string, amount: number) {
    const payment = {token, amount};
    return this.httpClient.post<any>(API_URL + '/payment/charge', payment);
  }
}
