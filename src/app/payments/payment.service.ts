import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {OutputPaymentRessource, PaymentRessource, SimplePaymentRessource} from './make-payment/make-payment-model';
import {Observable} from 'rxjs/Observable';

const API_URL = environment.apiUrl;

@Injectable()
export class PaymentService {
  constructor(@Inject(HttpClient) private httpClient: HttpClient) {
  }

  public processPayment(payment: PaymentRessource) {
    return this.httpClient.post<any>(API_URL + '/payment/charge', payment);
  }

  public processPaymentExistingMember(payment: SimplePaymentRessource) {
    return this.httpClient.post<any>(API_URL + '/payment/charge/existingmember', payment);
  }

  public processNewMembershipPayment(payment: PaymentRessource) {
    return this.httpClient.post<any>(API_URL + '/payment/charge/newmember', payment);
  }

  public getPayments() {
    return this.httpClient.get<OutputPaymentRessource[]>(API_URL + '/payment/fetch');
  }

  public get(year: number): Observable<any> {
    return this.httpClient.get<any>(API_URL + '/payment/receipt?year=' + year);
  }
}
