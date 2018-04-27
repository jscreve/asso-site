import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {Feed} from './feed-card/model/feed';
import {environment} from '../../environments/environment';

@Injectable()
export class FeedService {
  constructor(
    private _httpClient: HttpClient
  ) {
  }

  private _rest2json = environment.rest2json;

  getFeedContent(url: string): Observable<Feed> {
    return this._httpClient.get(this._rest2json)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
